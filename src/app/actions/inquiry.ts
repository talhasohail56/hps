"use server";

import { z } from "zod";

const inquirySchema = z.object({
  serviceType: z.enum(["repair", "question"]),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export async function submitInquiry(
  input: InquiryInput
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = inquirySchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const data = parsed.data;
  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    return { success: false, error: "Contact form is not configured." };
  }

  try {
    const subjectMap: Record<string, string> = {
      repair: "Repair / Equipment Inquiry",
      question: "General Question",
    };

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `${subjectMap[data.serviceType] || "Inquiry"} — ${data.name}`,
        _replyto: data.email,
        Type: subjectMap[data.serviceType] || data.serviceType,
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Message: data.message,
        "Submitted At": new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Formspree responded with ${res.status}`);
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
