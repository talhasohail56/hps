"use client";

import { useRef, useState } from "react";
import { UserCircle, Loader2 } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { ContactDetails } from "../types";

interface DetailsStepProps {
  onSubmit: (details: ContactDetails) => void;
}

export function DetailsStep({ onSubmit }: DetailsStepProps) {
  const [form, setForm] = useState<ContactDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetails, string>>>({});

  /*
   * Local submit guard.
   *
   * The parent advances the chat step as soon as the form is handed over, but
   * AnimatePresence (mode="wait") keeps this component mounted until its exit
   * animation finishes — so the button below stays in the DOM and stays
   * clickable after the step has already moved on. This has to be local
   * state: the step is only rendered while the reducer says "details", so any
   * `submitting` prop the parent could pass is provably always false (the
   * compiler rejects the comparison), and an exiting child keeps its old
   * props anyway. The ref blocks a second click in the same tick, before
   * React re-renders; the state drives the rendered disabled attribute.
   */
  const submittedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7)
      errs.phone = "Valid phone number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittedRef.current) return;
    if (!validate()) return;
    submittedRef.current = true;
    setIsSubmitting(true);
    onSubmit(form);
  }

  const inputClass =
    "w-full rounded-lg border border-border-light bg-white px-3 py-2 text-sm text-navy placeholder:text-slate-light/60 outline-none transition-colors focus:border-hydra-400 focus:ring-1 focus:ring-hydra-200";

  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-1 font-semibold">
          <UserCircle className="h-4 w-4 text-hydra-600" />
          Your Details
        </div>
        <p>Almost done! Just need your contact info to finalize the quote.</p>
      </ChatMessage>

      <form onSubmit={handleSubmit} className="mt-2 space-y-3">
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-0.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-0.5 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Service address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inputClass}
          />
          {errors.address && (
            <p className="mt-0.5 text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        <p className="text-[11px] leading-snug text-slate-light/80 text-center">
          We will never send you any promotional content or marketing messages
          via email or text. Your info is only used to deliver your quote.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-hydra-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hydra-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating Quote…
            </span>
          ) : (
            "Get My Quote"
          )}
        </button>
      </form>
    </>
  );
}
