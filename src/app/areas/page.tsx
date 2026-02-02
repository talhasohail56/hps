"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceAreas } from "@/lib/data/areas";
import { AreaList } from "@/components/AreaList";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { siteConfig } from "@/lib/data/site";

/* ------------------------------------------------------------------ */
/*  SVG Map — city positions (relative within a 600x500 viewBox)       */
/* ------------------------------------------------------------------ */

const cityPositions: Record<string, { x: number; y: number }> = {
  frisco: { x: 300, y: 250 },
  plano: { x: 400, y: 360 },
  mckinney: { x: 430, y: 180 },
  prosper: { x: 220, y: 130 },
  "little-elm": { x: 140, y: 240 },
  "the-colony": { x: 160, y: 360 },
  allen: { x: 460, y: 270 },
  celina: { x: 300, y: 80 },
};

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                   */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ================================================================== */
/*  Page Component                                                      */
/* ================================================================== */

export default function AreasPage() {
  const frisco = cityPositions["frisco"];

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                               */}
      {/* ============================================================ */}
      <section className="relative isolate overflow-hidden bg-navy py-24 md:py-32">
        <AuroraBackground />
        <NoiseOverlay />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-hydra-500/15 px-3.5 py-1 text-xs font-semibold text-hydra-300"
            >
              <MapPin className="h-3.5 w-3.5" />
              DFW Metroplex
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Service Areas
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-hydra-100/80"
            >
              We serve Frisco, TX and nearby communities across the DFW
              metroplex.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. MAP GRAPHIC SECTION                                       */}
      {/* ============================================================ */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Section heading */}
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Where We Operate
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-light">
                Our service network radiates from our Frisco headquarters to
                surrounding cities in the DFW area.
              </p>
            </div>

            {/* SVG map container */}
            <div className="mx-auto max-w-3xl rounded-2xl border border-border-light bg-surface p-4 shadow-sm sm:p-6">
              <svg
                viewBox="0 0 600 500"
                className="h-auto w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Subtle background grid */}
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.3"
                      className="text-border-light"
                    />
                  </pattern>

                  {/* Pulse animation for Frisco */}
                  <radialGradient id="friscoPulse">
                    <stop offset="0%" stopColor="var(--color-hydra-400)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--color-hydra-400)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="600" height="500" fill="url(#grid)" rx="12" />

                {/* Connecting lines from Frisco to each city */}
                {serviceAreas
                  .filter((a) => !a.primary)
                  .map((area) => {
                    const pos = cityPositions[area.id];
                    if (!pos) return null;
                    return (
                      <line
                        key={`line-${area.id}`}
                        x1={frisco.x}
                        y1={frisco.y}
                        x2={pos.x}
                        y2={pos.y}
                        className="stroke-hydra-200"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                      />
                    );
                  })}

                {/* City circles — secondary cities first */}
                {serviceAreas
                  .filter((a) => !a.primary)
                  .map((area) => {
                    const pos = cityPositions[area.id];
                    if (!pos) return null;
                    return (
                      <g key={area.id}>
                        {/* Outer glow */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          className="fill-hydra-100/50"
                        />
                        {/* Solid circle */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="10"
                          className="fill-hydra-200 stroke-hydra-300"
                          strokeWidth="1.5"
                        />
                        {/* Label */}
                        <text
                          x={pos.x}
                          y={pos.y + 26}
                          textAnchor="middle"
                          className="fill-slate text-[11px] font-medium"
                        >
                          {area.name}
                        </text>
                      </g>
                    );
                  })}

                {/* Frisco — primary city, larger with pulse */}
                <g>
                  {/* Animated pulse ring */}
                  <circle cx={frisco.x} cy={frisco.y} r="36" fill="url(#friscoPulse)">
                    <animate
                      attributeName="r"
                      from="28"
                      to="48"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="1"
                      to="0"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Outer glow */}
                  <circle
                    cx={frisco.x}
                    cy={frisco.y}
                    r="24"
                    className="fill-hydra-100"
                  />
                  {/* Solid circle */}
                  <circle
                    cx={frisco.x}
                    cy={frisco.y}
                    r="16"
                    className="fill-hydra-500 stroke-hydra-600"
                    strokeWidth="2"
                  />
                  {/* Inner icon dot */}
                  <circle
                    cx={frisco.x}
                    cy={frisco.y}
                    r="5"
                    className="fill-white/80"
                  />
                  {/* Label */}
                  <text
                    x={frisco.x}
                    y={frisco.y + 36}
                    textAnchor="middle"
                    className="fill-navy text-[13px] font-bold"
                  >
                    Frisco
                  </text>
                  <text
                    x={frisco.x}
                    y={frisco.y + 50}
                    textAnchor="middle"
                    className="fill-hydra-600 text-[10px] font-semibold"
                  >
                    HQ
                  </text>
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. AREA LIST + 4. STICKY SIDEBAR                             */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                All Service Areas
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-light">
                Browse the communities we proudly serve. Search by city name to
                find your neighborhood.
              </p>
            </motion.div>

            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
              {/* Area list */}
              <motion.div variants={fadeUp} custom={1}>
                <AreaList areas={serviceAreas} showSearch={true} />
              </motion.div>

              {/* Sticky CTA sidebar (desktop) */}
              <motion.aside
                variants={fadeUp}
                custom={2}
                className="hidden lg:block"
              >
                <div
                  className={cn(
                    "sticky top-28 rounded-xl border border-border bg-white p-6 shadow-sm",
                  )}
                >
                  <h3 className="text-lg font-semibold text-navy">
                    Ready to get started?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-light">
                    Get a free, no-obligation quote for your pool service
                    today.
                  </p>

                  <Link
                    href="/contact"
                    className={cn(
                      "mt-5 flex w-full items-center justify-center gap-2 rounded-xl",
                      "bg-hydra-500 px-5 py-3 text-sm font-semibold text-white",
                      "transition-colors duration-200 hover:bg-hydra-600",
                    )}
                  >
                    Get a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className={cn(
                      "mt-3 flex w-full items-center justify-center gap-2 rounded-xl",
                      "border border-border bg-white px-5 py-3 text-sm font-semibold text-navy",
                      "transition-colors duration-200 hover:bg-hydra-50",
                    )}
                  >
                    <Phone className="h-4 w-4 text-hydra-500" />
                    {siteConfig.phone}
                  </a>

                  <p className="mt-4 text-center text-xs text-slate-light">
                    {siteConfig.hours}
                  </p>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4b. MOBILE CTA (visible only on mobile/tablet)               */}
      {/* ============================================================ */}
      <section className="bg-hydra-50 py-12 lg:hidden">
        <div className="mx-auto max-w-md px-4 sm:px-6 text-center">
          <h3 className="text-lg font-semibold text-navy">
            Ready to get started?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            Get a free, no-obligation quote for your pool service today.
          </p>

          <Link
            href="/contact"
            className={cn(
              "mt-5 inline-flex items-center justify-center gap-2 rounded-xl",
              "bg-hydra-500 px-6 py-3 text-sm font-semibold text-white",
              "transition-colors duration-200 hover:bg-hydra-600",
            )}
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-3">
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-navy",
                "transition-colors duration-200 hover:text-hydra-600",
              )}
            >
              <Phone className="h-4 w-4 text-hydra-500" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. CTA SECTION — "Don't See Your Area?"                      */}
      {/* ============================================================ */}
      <section className="relative isolate overflow-hidden bg-navy py-20 md:py-28">
        <AuroraBackground />
        <NoiseOverlay />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Don&rsquo;t See Your Area?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-hydra-100/80"
            >
              We&rsquo;re expanding! Contact us to check availability in your
              neighborhood.
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="mt-8">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl",
                  "bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white",
                  "shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 hover:bg-hydra-400 hover:shadow-hydra-400/30",
                )}
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
