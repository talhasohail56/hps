"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

/* ------------------------------------------------------------------ */
/*  Validation schema                                                  */
/* ------------------------------------------------------------------ */

const quoteSchema = z.object({
  photo: z.string().optional(),
  poolSize: z.enum(["10k-20k", "20k-30k", "30k+"]),
  schedule: z.enum(["weekly", "chemical", "premium"]),
  monthlyPrice: z.number().positive(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  address: z.string().min(3, "Address is required"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export interface QuoteRecord {
  id: string;
  photo?: string;
  poolSize: string;
  schedule: string;
  monthlyPrice: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/*  Write mutex (same pattern as blog db)                              */
/* ------------------------------------------------------------------ */

let writeLock: Promise<void> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeLock.then(fn, fn);
  writeLock = next.then(() => {}, () => {});
  return next;
}

/* ------------------------------------------------------------------ */
/*  Formspree email notification (fire-and-forget)                     */
/* ------------------------------------------------------------------ */

async function notifyViaFormspree(record: QuoteRecord) {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return;

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `New Pool Quote — $${record.monthlyPrice}/mo (${record.name})`,
      _replyto: record.email,
      "Quote ID": record.id,
      Name: record.name,
      Email: record.email,
      Phone: record.phone,
      Address: record.address,
      "Pool Size": record.poolSize,
      Schedule: record.schedule,
      "Monthly Price": `$${record.monthlyPrice}`,
      "Submitted At": record.createdAt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Formspree responded with ${res.status}`);
  }
}

/* ------------------------------------------------------------------ */
/*  Customer confirmation email via Gmail SMTP                         */
/* ------------------------------------------------------------------ */

const POOL_LABELS: Record<string, string> = {
  "10k-20k": "10,000 – 20,000 gal",
  "20k-30k": "20,000 – 30,000 gal",
  "30k+": "30,000+ gal",
};

function scheduleLabel(s: string): string {
  if (s === "premium") return "Premium Care";
  if (s === "chemical") return "Chemical Only";
  if (s === "biweekly") return "Bi-weekly"; // legacy records
  return "Weekly";
}

function serviceLabel(s: string): string {
  if (s === "chemical") return "Chemical Only Service";
  return `${scheduleLabel(s)} Pool Cleaning`;
}

/* ------------------------------------------------------------------ */
/*  Lead-capture fallbacks                                             */
/* ------------------------------------------------------------------ */

/*
 * Grep this tag in Vercel logs to recover any lead whose Formspree alert
 * failed. It is the last line of defence: on Vercel the quotes.json write
 * is a no-op (read-only fs), so without this a failed alert loses the lead.
 */
const LEAD_FALLBACK_TAG = "LEAD_CAPTURE_FALLBACK";

function logLeadFallback(record: QuoteRecord, reason: string) {
  // `photo` can be a large base64 blob — omit it so the log stays readable.
  const { photo, ...loggable } = record;
  console.error(
    `${LEAD_FALLBACK_TAG} reason=${reason} hasPhoto=${Boolean(photo)} ${JSON.stringify(loggable)}`
  );
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return {
    user,
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    }),
  };
}

/*
 * Backup owner alert, sent only when the Formspree notification fails.
 * Goes to LEAD_NOTIFY_EMAIL if set, otherwise back to the Gmail account.
 */
async function sendOwnerBackupNotification(record: QuoteRecord) {
  const mailer = getTransporter();
  if (!mailer) return false;

  const { user, transporter } = mailer;
  const to = process.env.LEAD_NOTIFY_EMAIL || user;

  const rows = [
    ["Quote #", record.id],
    ["Name", record.name],
    ["Email", record.email],
    ["Phone", record.phone],
    ["Address", record.address],
    ["Pool Size", POOL_LABELS[record.poolSize] || record.poolSize],
    ["Schedule", scheduleLabel(record.schedule)],
    ["Monthly Price", `$${record.monthlyPrice}`],
    ["Submitted At", record.createdAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 6px 12px 6px 0; color: #64748b;">${label}</td><td style="padding: 6px 0; font-weight: 600;">${value}</td></tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `"Hydra Pool Services" <${user}>`,
    to,
    replyTo: record.email,
    subject: `[BACKUP] New Pool Quote — $${record.monthlyPrice}/mo (${record.name})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
        <p style="font-size: 14px;">
          The Formspree notification for this lead failed, so this backup was
          sent instead. The lead details are below.
        </p>
        <table style="font-size: 13px; border-collapse: collapse;">${rows}</table>
      </div>
    `,
  });

  return true;
}

/*
 * Runs when the Formspree alert fails. Always logs the lead, and also tries
 * the SMTP backup — so the lead survives even if both channels are degraded.
 */
async function handleFormspreeFailure(record: QuoteRecord, err: unknown) {
  console.error(
    `${LEAD_FALLBACK_TAG} Formspree notification failed for ${record.id}:`,
    err
  );

  let backupSent = false;
  try {
    backupSent = await sendOwnerBackupNotification(record);
  } catch (backupErr) {
    console.error(
      `${LEAD_FALLBACK_TAG} SMTP backup notification also failed for ${record.id}:`,
      backupErr
    );
  }

  logLeadFallback(
    record,
    backupSent ? "formspree-failed-smtp-backup-sent" : "formspree-failed-no-backup"
  );
}

async function sendCustomerConfirmation(record: QuoteRecord) {
  const mailer = getTransporter();
  if (!mailer) return;

  const { user, transporter } = mailer;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
      <div style="background: #0c4a6e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px;">Hydra Pool Services</h1>
        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.7); font-size: 13px;">Quote Confirmation</p>
      </div>

      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 28px 32px; border-radius: 0 0 12px 12px;">
        <p style="margin: 0 0 4px; font-size: 15px;">Hi ${record.name},</p>
        <p style="margin: 0 0 20px; font-size: 14px; color: #64748b;">
          Thank you for requesting a quote! Here are your details:
        </p>

        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #64748b;">Estimated Monthly Price</p>
          <p style="margin: 0; font-size: 32px; font-weight: 800; color: #0369a1;">
            $${record.monthlyPrice}<span style="font-size: 14px; font-weight: 500; color: #64748b;">/mo</span>
          </p>
          <p style="margin: 8px 0 0; font-size: 12px; color: #64748b;">
            ${scheduleLabel(record.schedule)} &middot; ${POOL_LABELS[record.poolSize] || record.poolSize}
          </p>
        </div>

        <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Quote #</td>
            <td style="padding: 8px 0; font-weight: 600; text-align: right; border-bottom: 1px solid #f1f5f9; font-family: monospace;">${record.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service</td>
            <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">${serviceLabel(record.schedule)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Pool Size</td>
            <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">${POOL_LABELS[record.poolSize] || record.poolSize}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Address</td>
            <td style="padding: 8px 0; text-align: right;">${record.address}</td>
          </tr>
        </table>

        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 13px; color: #475569;">
            <strong>What happens next?</strong><br/>
            Our team will review your quote and reach out within 24 hours to finalize your service plan. Your first 2 weeks are on us — completely free!
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 20px;">
          <a href="tel:+12142336803" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">
            Call Us: (214) 233-6803
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />

        <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center;">
          Hydra Pool Services &middot; Frisco, TX 75034<br/>
          <a href="https://hydrapoolservices.com" style="color: #0284c7; text-decoration: none;">hydrapoolservices.com</a>
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Hydra Pool Services" <${user}>`,
    to: record.email,
    subject: `Your Pool Service Quote #${record.id}`,
    html,
  });
}

/* ------------------------------------------------------------------ */
/*  Server action                                                      */
/* ------------------------------------------------------------------ */

const DB_PATH = path.join(process.cwd(), "data", "quotes.json");

export async function submitQuote(
  input: QuoteInput
): Promise<{ success: true; quoteId: string } | { success: false; error: string }> {
  const parsed = quoteSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const data = parsed.data;

  try {
    const id = `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const record: QuoteRecord = {
      id,
      ...(data.photo ? { photo: data.photo } : {}),
      poolSize: data.poolSize,
      schedule: data.schedule,
      monthlyPrice: data.monthlyPrice,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      createdAt: new Date().toISOString(),
    };

    // Send both emails in parallel for faster response. Neither may reject:
    // a notification problem must never cost us the lead or block persistence.
    await Promise.all([
      notifyViaFormspree(record).catch((err) =>
        handleFormspreeFailure(record, err)
      ),
      sendCustomerConfirmation(record).catch((err) => {
        // Don't fail the quote if Gmail errors
        console.error(`Customer confirmation failed for ${record.id}:`, err);
      }),
    ]);

    // Try to persist locally (works in dev, fails silently on Vercel)
    try {
      await withLock(async () => {
        const raw = await fs.readFile(DB_PATH, "utf-8");
        const db = JSON.parse(raw) as { quotes: QuoteRecord[] };
        db.quotes.push(record);
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
      });
    } catch (err) {
      // Read-only filesystem on Vercel — expected there, and the alert above
      // has already been delivered (or fallen back). Log it either way so a
      // local write failure never goes unnoticed.
      console.warn(`quotes.json write skipped for ${record.id}:`, err);
    }

    return { success: true as const, quoteId: id };
  } catch {
    return { success: false as const, error: "Failed to submit quote. Please try again." };
  }
}
