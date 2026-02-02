"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

/* ------------------------------------------------------------------ */
/*  Validation schema                                                  */
/* ------------------------------------------------------------------ */

const quoteSchema = z.object({
  photo: z.string().optional(),
  poolSize: z.enum(["10k-20k", "20k-30k", "30k+"]),
  schedule: z.enum(["weekly", "biweekly"]),
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

  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Pool Quote — $${record.monthlyPrice}/mo (${record.name})`,
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
  } catch {
    // Don't block the user if the email notification fails
  }
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

  return withLock(async () => {
    try {
      const raw = await fs.readFile(DB_PATH, "utf-8");
      const db = JSON.parse(raw) as { quotes: QuoteRecord[] };

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

      db.quotes.push(record);
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));

      // Fire-and-forget email notification
      notifyViaFormspree(record).catch(() => {});

      return { success: true as const, quoteId: id };
    } catch {
      return { success: false as const, error: "Failed to save quote. Please try again." };
    }
  });
}
