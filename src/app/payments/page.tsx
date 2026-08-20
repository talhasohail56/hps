"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Eye,
  Server,
  FileCheck,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AGREEMENT_TEXT,
  AGREEMENT_VERSION,
} from "@/lib/data/service-agreement";
import { submitAgreementConsent } from "@/app/actions/consent";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
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

const cardFadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const securityFeatures = [
  {
    icon: Lock,
    title: "256-bit SSL Encryption",
    description:
      "Every transaction is protected with bank-level SSL encryption. Your data is never exposed.",
  },
  {
    icon: Shield,
    title: "PCI DSS Compliant",
    description:
      "We are fully PCI DSS compliant. Your card information is handled according to the highest industry security standards.",
  },
  {
    icon: Eye,
    title: "We Never See Your Card",
    description:
      "Card details are entered directly on Stripe's secure servers. Our team never has access to your full card number.",
  },
  {
    icon: Server,
    title: "Powered by Stripe",
    description:
      "We use Stripe — the same payment processor trusted by Amazon, Google, and millions of businesses worldwide.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Click the Button Below",
    description: "You'll be redirected to Stripe's secure checkout page.",
  },
  {
    step: "2",
    title: "Enter Your Card Details",
    description:
      "Your information is entered directly on Stripe's PCI-certified platform — we never see it.",
  },
  {
    step: "3",
    title: "You're All Set",
    description:
      "Your card is securely saved on file. We'll only charge for services you've approved.",
  },
];

const trustPoints = [
  "No hidden fees or surprise charges",
  "Cancel anytime — no contracts",
  "Charges only for approved services",
  "Instant email receipts for every transaction",
  "Secure card storage via Stripe vault",
  "24/7 account access through Stripe",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PaymentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------------------------------------------------------- */
  /*  Service Agreement consent gate                                   */
  /*                                                                   */
  /*  Entirely separate from the Stripe flow below: it only decides    */
  /*  whether the existing card-on-file button is enabled. Nothing     */
  /*  here calls, wraps, or alters Stripe.                             */
  /* ---------------------------------------------------------------- */
  const [consentName, setConsentName] = useState("");
  const [consentEmail, setConsentEmail] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [consentSubmitting, setConsentSubmitting] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [consentRecorded, setConsentRecorded] = useState(false);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    if (!consentModalOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !consentSubmitting && !isLoading) {
        setConsentModalOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [consentModalOpen, consentSubmitting, isLoading]);

  const consentFormComplete =
    consentName.trim().length > 0 &&
    consentEmail.trim().length > 0 &&
    agreementChecked;

  async function handleAcceptAgreement(e: React.FormEvent) {
    e.preventDefault();
    if (!consentFormComplete || consentSubmitting) return;

    setConsentSubmitting(true);
    setConsentError(null);
    try {
      const result = await submitAgreementConsent({
        name: consentName.trim(),
        email: consentEmail.trim(),
      });

      if (result.success) {
        // Consent is recorded. Only now do we enter the existing, unmodified
        // Stripe flow — the modal stays up so the customer sees the handoff.
        setConsentRecorded(true);
        await handleCardOnFile();
      } else {
        // Nothing recorded, so nothing is handed to Stripe: stay in the modal.
        setConsentError(result.error);
      }
    } catch {
      setConsentError(
        "We could not record your acceptance. Please try again, or call (214) 233-6803."
      );
    } finally {
      setConsentSubmitting(false);
    }
  }

  /*
   * The gate. Until consent is recorded a click opens the agreement modal
   * and Stripe is never entered; afterwards it hands off to the existing,
   * unmodified handler below.
   */
  function handleCardButtonClick() {
    if (!consentRecorded) {
      setConsentError(null);
      setConsentModalOpen(true);
      return;
    }
    handleCardOnFile();
  }

  async function handleCardOnFile() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again or contact us.");
        setIsLoading(false);
      }
    } catch {
      setError("Unable to connect. Please check your internet and try again.");
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="Payments hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hydra-100">
                <Shield className="h-5 w-5 text-hydra-600" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-hydra-600">
                Secure Payments
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
            >
              Simple & Secure{" "}
              <span className="text-hydra-500">Card on File</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              Save your payment method securely so we can bill for approved
              services. No surprises, no hassle — just seamless pool care.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCardButtonClick}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 hover:brightness-105",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                  isLoading && "opacity-60 cursor-wait"
                )}
              >
                <CreditCard className="h-5 w-5" />
                {isLoading ? "Redirecting to Stripe..." : "Get Your Card on File"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-sm text-slate-light">
                {consentRecorded ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-hydra-700">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Service Agreement accepted &mdash; version{" "}
                    {AGREEMENT_VERSION}
                  </span>
                ) : (
                  <>You&apos;ll review and accept the Service Agreement first.</>
                )}
              </p>
              {error && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-light"
            >
              <Lock className="h-3.5 w-3.5" />
              Secured by Stripe &middot; 256-bit SSL encrypted
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="How it works"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-base text-slate-light sm:text-lg">
              Getting your card on file takes less than 2 minutes.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {howItWorks.map((item) => (
              <motion.div
                key={item.step}
                variants={cardFadeUp}
                className="relative rounded-2xl border border-border-light bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hydra-50">
                  <span className="text-lg font-bold text-hydra-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECURITY & COMPLIANCE                                       */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="Security and compliance"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Your Security Is Our Priority
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-light sm:text-lg">
              We take payment security seriously. Here&apos;s how we protect
              your information at every step.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={cardFadeUp}
                  className={cn(
                    "group rounded-2xl border border-border-light bg-white p-6",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md hover:shadow-hydra-100/30"
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-hydra-50">
                    <Icon
                      className="h-6 w-6 text-hydra-600"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-navy">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PCI COMPLIANCE BANNER                                       */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-hydra-200 bg-gradient-to-br from-hydra-50/80 to-white p-8 md:p-10"
          >
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-hydra-100">
                <FileCheck
                  className="h-8 w-8 text-hydra-600"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">
                  PCI DSS Level 1 Compliant
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-light">
                  All payments are processed through Stripe, a certified{" "}
                  <strong className="text-navy">
                    PCI Service Provider Level 1
                  </strong>{" "}
                  — the most rigorous level of certification in the payments
                  industry. Your card data is tokenized and stored in
                  Stripe&apos;s PCI-compliant vault. We never store, process, or
                  have access to your full card number.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRUST POINTS                                                */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="Our promise"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Promise to You
            </h2>
            <p className="mt-3 text-base text-slate-light sm:text-lg">
              Transparency and trust are the foundation of our service.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {trustPoints.map((point) => (
              <motion.li
                key={point}
                variants={cardFadeUp}
                className="flex items-start gap-3 rounded-xl border border-border-light bg-white p-4"
              >
                <CheckCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                  strokeWidth={2}
                />
                <span className="text-sm font-medium text-navy">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-border-light"
        aria-label="Get your card on file"
      >
        <AuroraBackground className="opacity-50" />
        <NoiseOverlay />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-light">
              Save your card securely in under 2 minutes. No charges until
              you&apos;ve approved a service.
            </p>

            <div className="mt-8">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCardButtonClick}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 hover:brightness-105",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                  isLoading && "opacity-60 cursor-wait"
                )}
              >
                <CreditCard className="h-5 w-5" />
                {isLoading ? "Redirecting to Stripe..." : "Get Your Card on File"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-sm text-slate-light">
                {consentRecorded ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-hydra-700">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Service Agreement accepted &mdash; version{" "}
                    {AGREEMENT_VERSION}
                  </span>
                ) : (
                  <>You&apos;ll review and accept the Service Agreement first.</>
                )}
              </p>
              {error && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-light">
              <Lock className="h-3.5 w-3.5" />
              Secured by Stripe &middot; 256-bit SSL &middot; PCI DSS Compliant
            </p>
          </motion.div>
        </div>
      </section>
      {/* ============================================================ */}
      {/*  SERVICE AGREEMENT MODAL                                     */}
      {/*                                                              */}
      {/*  Opened by either card-on-file button. Presentation only —   */}
      {/*  the consent action, email record and Stripe gate are        */}
      {/*  unchanged, and Stripe is never entered from in here.        */}
      {/* ============================================================ */}
      {consentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-agreement-title"
          onClick={() => {
            if (!consentSubmitting && !isLoading) setConsentModalOpen(false);
          }}
        >
          <div
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setConsentModalOpen(false)}
              disabled={consentSubmitting || isLoading}
              aria-label="Close Service Agreement"
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-light transition-colors hover:bg-surface hover:text-navy disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="shrink-0 px-6 pb-5 pt-6 text-center sm:px-8 sm:pt-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-hydra-50">
                <FileText className="h-6 w-6 text-hydra-600" strokeWidth={1.75} />
              </div>
              <h2
                id="service-agreement-title"
                className="text-3xl font-bold tracking-tight text-navy sm:text-4xl"
              >
                Service Agreement
              </h2>
              <p className="mt-3 text-base text-slate-light sm:text-lg">
                Please read the agreement in full and accept it before saving a
                card. Version {AGREEMENT_VERSION}.
              </p>
            </div>

            {/* Scroll region — the header above it never moves, so the title
            cannot be pushed off the top of the viewport. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8">
              {/* Full agreement — visible and scrollable, never hidden behind a link */}
              <div
                className="max-h-[38vh] min-h-[8rem] overflow-y-auto whitespace-pre-line rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-slate sm:max-h-96 sm:p-6"
                tabIndex={0}
                role="region"
                aria-label="Service Agreement text"
              >
                {/* Rendered verbatim — whitespace-pre-line keeps the numbered
                    clauses and paragraph breaks exactly as written. */}
                {AGREEMENT_TEXT}
              </div>

              {consentRecorded ? (
                <div className="mt-6 rounded-xl border border-hydra-200 bg-hydra-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-hydra-600"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Agreement accepted — thank you, {consentName}.
                      </p>
                      <p className="mt-1 text-sm text-slate-light">
                        We&apos;ve recorded your acceptance of version{" "}
                        {AGREEMENT_VERSION} and emailed a copy to our office.
                        {isLoading
                          ? " Taking you to Stripe's secure checkout now..."
                          : " You're being taken to Stripe's secure checkout."}
                      </p>

                      {/* If the handoff itself fails, the acceptance still
                          stands — offer a retry straight into Stripe. */}
                      {error && (
                        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                          <p className="text-sm font-medium text-red-700">
                            {error}
                          </p>
                          <p className="mt-1 text-xs text-red-600">
                            Your acceptance was recorded. No card has been saved
                            &mdash; retry below, or call (214) 233-6803.
                          </p>
                          <button
                            type="button"
                            onClick={handleCardOnFile}
                            disabled={isLoading}
                            className={cn(
                              "mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-all",
                              "hover:brightness-110",
                              isLoading && "cursor-wait opacity-60"
                            )}
                          >
                            {isLoading && (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            )}
                            {isLoading
                              ? "Redirecting to Stripe..."
                              : "Retry card save"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAcceptAgreement} className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="consent-name"
                        className="block text-sm font-medium text-navy"
                      >
                        Full name
                      </label>
                      <input
                        id="consent-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={consentName}
                        onChange={(e) => setConsentName(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1.5 w-full rounded-lg border border-border-light bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-hydra-400 focus:ring-2 focus:ring-hydra-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="consent-email"
                        className="block text-sm font-medium text-navy"
                      >
                        Email address
                      </label>
                      <input
                        id="consent-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={consentEmail}
                        onChange={(e) => setConsentEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="mt-1.5 w-full rounded-lg border border-border-light bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-hydra-400 focus:ring-2 focus:ring-hydra-100"
                      />
                    </div>
                  </div>

                  <label
                    htmlFor="consent-agree"
                    className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border-light bg-white p-4"
                  >
                    <input
                      id="consent-agree"
                      name="agree"
                      type="checkbox"
                      required
                      checked={agreementChecked}
                      onChange={(e) => setAgreementChecked(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-hydra-600"
                    />
                    <span className="text-sm font-medium text-navy">
                      I have read and agree to the Hydra Pool Services Service
                      Agreement.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={
                      !consentFormComplete || consentSubmitting || isLoading
                    }
                    className={cn(
                      "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 sm:w-auto",
                      "hover:brightness-110 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
                      (!consentFormComplete || consentSubmitting || isLoading) &&
                        "cursor-not-allowed opacity-50"
                    )}
                  >
                    {(consentSubmitting || isLoading) && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {consentSubmitting
                      ? "Recording acceptance..."
                      : isLoading
                        ? "Redirecting to Stripe..."
                        : "Accept & Continue"}
                  </button>

                  {consentError && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-700">
                        {consentError}
                      </p>
                      <p className="mt-1 text-xs text-red-600">
                        Your card has not been saved and nothing was charged. You
                        can retry above.
                      </p>
                    </div>
                  )}

                  {/* Stripe's own error, if the handoff itself fails. The
                      acceptance is already recorded at this point. */}
                  {!consentError && error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-700">{error}</p>
                      <p className="mt-1 text-xs text-red-600">
                        Your acceptance was recorded. No card has been saved
                        &mdash; you can retry, or call (214) 233-6803.
                      </p>
                    </div>
                  )}

                  <p className="mt-4 text-xs leading-relaxed text-slate-light">
                    We record your name, email, the time of acceptance, the
                    agreement version, and your IP address. No
                    payment details are collected on this page — those are entered
                    only on Stripe&apos;s secure checkout in the next step.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
