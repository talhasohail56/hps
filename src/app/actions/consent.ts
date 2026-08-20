"use server";

import { z } from "zod";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { AGREEMENT_VERSION } from "@/lib/data/service-agreement";

/* ------------------------------------------------------------------ */
/*  Validation schema                                                  */
/* ------------------------------------------------------------------ */

const consentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(3, "Service address is required"),
});

export type ConsentInput = z.infer<typeof consentSchema>;

interface ConsentRecord {
  name: string;
  email: string;
  address: string;
  agreementVersion: string;
  acceptedAt: string;
  ip: string;
}

/*
 * The acceptance email is the only durable record — Vercel's filesystem is
 * read-only, so nothing is written to disk. If no channel delivers, the
 * customer is told to retry and the Stripe button stays gated.
 */
const CONSENT_FAILED_TAG = "CONSENT_CAPTURE_FAILED";

const OWNER_EMAIL = "info@hydrapoolservices.com";

/*
 * Dedicated Formspree form for Service Agreement acceptances — deliberately
 * NOT the quote/chatbot form (process.env.FORMSPREE_FORM_ID), so consent
 * records stay in their own dashboard. The form id is public, so it is kept
 * here rather than in env: preview and production deploys work without any
 * extra configuration.
 */
const CONSENT_FORMSPREE_FORM_ID = "myeglbwq";
const CONSENT_FORMSPREE_ENDPOINT = `https://formspree.io/f/${CONSENT_FORMSPREE_FORM_ID}`;

/* ------------------------------------------------------------------ */
/*  Server-side IP (never trust the client for this)                   */
/* ------------------------------------------------------------------ */

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    // May be a comma-separated chain; the first entry is the client.
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

/* ------------------------------------------------------------------ */
/*  Delivery channels                                                  */
/* ------------------------------------------------------------------ */

function subjectFor(record: ConsentRecord): string {
  const date = record.acceptedAt.slice(0, 10);
  return `Service Agreement Accepted — ${record.name} — ${date}`;
}

async function notifyViaFormspree(record: ConsentRecord) {
  // Same server-side POST mechanism the quote flow uses, pointed at the
  // dedicated consent form.
  const res = await fetch(CONSENT_FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: subjectFor(record),
      _replyto: record.email,
      "Submission Type": "Service Agreement Accepted",
      Name: record.name,
      Email: record.email,
      "Service Address": record.address,
      "Agreement Version": record.agreementVersion,
      "Accepted At": record.acceptedAt,
      "IP Address": record.ip,
    }),
  });

  if (!res.ok) {
    throw new Error(`Formspree responded with ${res.status}`);
  }
}

async function notifyViaGmail(record: ConsentRecord) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("Gmail credentials are not set");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const rows = [
    ["Name", record.name],
    ["Email", record.email],
    ["Service Address", record.address],
    ["Agreement Version", record.agreementVersion],
    ["Accepted At", record.acceptedAt],
    ["IP Address", record.ip],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 6px 14px 6px 0; color: #64748b;">${label}</td><td style="padding: 6px 0; font-weight: 600;">${value}</td></tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `"Hydra Pool Services" <${user}>`,
    to: OWNER_EMAIL,
    replyTo: record.email,
    subject: subjectFor(record),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
        <div style="background: #0c4a6e; padding: 20px 28px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #ffffff; font-size: 18px;">Service Agreement Accepted</h1>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px 28px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">
            The customer below accepted the Service Agreement on the payments page.
          </p>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">${rows}</table>
        </div>
      </div>
    `,
  });
}

/* ------------------------------------------------------------------ */
/*  Server action                                                      */
/* ------------------------------------------------------------------ */

/**
 * Records a Service Agreement acceptance. Runs entirely on our own side —
 * it never touches the Stripe flow. The caller only reveals the existing
 * card-on-file button once this resolves successfully.
 */
export async function submitAgreementConsent(
  input: ConsentInput
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = consentSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  const record: ConsentRecord = {
    ...parsed.data,
    agreementVersion: AGREEMENT_VERSION,
    acceptedAt: new Date().toISOString(),
    ip: await clientIp(),
  };

  const results = await Promise.allSettled([
    notifyViaFormspree(record),
    notifyViaGmail(record),
  ]);

  const delivered = results.some((r) => r.status === "fulfilled");

  if (!delivered) {
    // The acceptance is unrecorded, so it did not happen as far as we are
    // concerned. Log everything we have and make the customer retry.
    console.error(
      `${CONSENT_FAILED_TAG} no channel delivered ${JSON.stringify(record)}`
    );
    results.forEach((r) => {
      if (r.status === "rejected") {
        console.error(`${CONSENT_FAILED_TAG} channel error:`, r.reason);
      }
    });

    return {
      success: false,
      error:
        "We could not record your acceptance. Please try again, or call (214) 233-6803 and we'll take it over the phone.",
    };
  }

  // One channel is enough to have a record, but a half-failure is still
  // worth surfacing in the logs.
  results.forEach((r) => {
    if (r.status === "rejected") {
      console.warn("Consent notification channel failed:", r.reason);
    }
  });

  return { success: true };
}
