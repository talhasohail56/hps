"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const formReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  poolType: "chlorine" | "saltwater";
  contactMethod: "phone" | "email" | "text";
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

/* ------------------------------------------------------------------ */
/*  Contact info cards data                                            */
/* ------------------------------------------------------------------ */

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    note: "Call us during business hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.address,
    href: undefined,
    note: "Serving Frisco & nearby communities",
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.hours,
    href: undefined,
    note: undefined,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  /* ---- Form state ---- */
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    poolType: "chlorine",
    contactMethod: "phone",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---- Handlers ---- */

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the error for this field as the user types
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FormErrors];
        return next;
      });
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  }

  /* ---- Shared input classes ---- */

  const inputBase = cn(
    "w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-light/60",
    "outline-none transition-all duration-200",
    "focus:border-hydra-400 focus:ring-2 focus:ring-hydra-200"
  );

  const inputError = "border-red-400 focus:border-red-400 focus:ring-red-200";

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                              */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-24 md:py-32"
        aria-label="Contact hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-light sm:text-xl"
          >
            Request a quote, ask a question, or schedule your first service.
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TWO COLUMN — FORM + CONTACT INFO                        */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-20">
            {/* ------------------------------------------------------ */}
            {/*  Left: Contact Form                                     */}
            {/* ------------------------------------------------------ */}
            <motion.div
              variants={formReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    {/* --- Row: Name + Phone --- */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-sm font-medium text-navy"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={cn(inputBase, errors.name && inputError)}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-1.5 block text-sm font-medium text-navy"
                        >
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="(469) 555-0142"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className={cn(inputBase, errors.phone && inputError)}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* --- Email --- */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-navy"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={cn(inputBase, errors.email && inputError)}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* --- Address --- */}
                    <div>
                      <label
                        htmlFor="contact-address"
                        className="mb-1.5 block text-sm font-medium text-navy"
                      >
                        Address
                      </label>
                      <input
                        id="contact-address"
                        type="text"
                        placeholder="123 Pool Lane"
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className={inputBase}
                      />
                    </div>

                    {/* --- Row: City + ZIP --- */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* City */}
                      <div>
                        <label
                          htmlFor="contact-city"
                          className="mb-1.5 block text-sm font-medium text-navy"
                        >
                          City
                        </label>
                        <input
                          id="contact-city"
                          type="text"
                          placeholder="Frisco"
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className={inputBase}
                        />
                      </div>

                      {/* ZIP */}
                      <div>
                        <label
                          htmlFor="contact-zip"
                          className="mb-1.5 block text-sm font-medium text-navy"
                        >
                          ZIP Code
                        </label>
                        <input
                          id="contact-zip"
                          type="text"
                          placeholder="75034"
                          value={form.zip}
                          onChange={(e) => updateField("zip", e.target.value)}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* --- Pool Type toggle --- */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy">
                        Pool Type
                      </label>
                      <div className="inline-flex overflow-hidden rounded-xl border border-border-light">
                        {(
                          [
                            { value: "chlorine", label: "Chlorine" },
                            { value: "saltwater", label: "Saltwater" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => updateField("poolType", opt.value)}
                            className={cn(
                              "px-5 py-2.5 text-sm font-medium transition-all duration-200",
                              form.poolType === opt.value
                                ? "bg-hydra-500 text-white"
                                : "bg-white text-slate hover:bg-hydra-50"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* --- Preferred Contact Method toggle --- */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy">
                        Preferred Contact Method
                      </label>
                      <div className="inline-flex overflow-hidden rounded-xl border border-border-light">
                        {(
                          [
                            { value: "phone", label: "Phone" },
                            { value: "email", label: "Email" },
                            { value: "text", label: "Text" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              updateField("contactMethod", opt.value)
                            }
                            className={cn(
                              "px-5 py-2.5 text-sm font-medium transition-all duration-200",
                              form.contactMethod === opt.value
                                ? "bg-hydra-500 text-white"
                                : "bg-white text-slate hover:bg-hydra-50"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* --- Message --- */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-sm font-medium text-navy"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us about your pool or any questions you have..."
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className={cn(inputBase, "resize-none")}
                      />
                    </div>

                    {/* --- Submit --- */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                        "transition-all duration-200 ease-out",
                        "hover:shadow-xl hover:shadow-hydra-500/30",
                        "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-70"
                      )}
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={2} />
                          Send Request
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  /* ---- Success State ---- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-border-light bg-surface px-8 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.15,
                      }}
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-hydra-100"
                    >
                      <CheckCircle
                        className="h-8 w-8 text-hydra-600"
                        strokeWidth={2}
                      />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-navy">
                      Thank you!
                    </h3>
                    <p className="mt-2 max-w-sm text-base leading-relaxed text-slate-light">
                      We&apos;ll be in touch within 24 hours.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-hydra-50 px-4 py-2.5">
                      <Clock
                        className="h-4 w-4 text-hydra-600"
                        strokeWidth={2}
                      />
                      <span className="text-sm font-medium text-hydra-700">
                        Expected response time: Same business day
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  Right: Contact Info Cards                              */}
            {/* ------------------------------------------------------ */}
            <motion.aside
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-4"
            >
              {contactCards.map((card) => {
                const Icon = card.icon;
                const content = (
                  <motion.div
                    key={card.label}
                    variants={cardReveal}
                    className={cn(
                      "rounded-xl border border-border-light bg-surface p-5",
                      "transition-shadow duration-200 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-hydra-100">
                        <Icon
                          className="h-5 w-5 text-hydra-600"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                          {card.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-navy">
                          {card.value}
                        </p>
                        {card.note && (
                          <p className="mt-0.5 text-xs text-slate-light">
                            {card.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );

                if (card.href) {
                  return (
                    <a
                      key={card.label}
                      href={card.href}
                      className="block outline-none focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2 rounded-xl"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={card.label}>{content}</div>;
              })}
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
