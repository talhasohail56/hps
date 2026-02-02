"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GetQuoteForm } from "@/components/GetQuoteForm";

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

/* ------------------------------------------------------------------ */
/*  Contact info cards data                                            */
/* ------------------------------------------------------------------ */

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    note: "Call us anytime",
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
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <GetQuoteForm />
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
