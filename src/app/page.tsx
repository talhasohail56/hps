"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle,
  Camera,
  ChevronRight,
  ClipboardList,
  CalendarCheck,
  CameraIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Component imports ── */
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { PlanCard } from "@/components/PlanCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FAQ } from "@/components/FAQ";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { WaveBackground } from "@/components/graphics/WaveBackground";
import { RippleLines } from "@/components/graphics/RippleLines";
import { GradientOrb } from "@/components/graphics/GradientOrb";

/* ── Data imports ── */
import { services } from "@/lib/data/services";
import { plans } from "@/lib/data/plans";
import { testimonials } from "@/lib/data/testimonials";
import { faqs } from "@/lib/data/faqs";
import { serviceAreas } from "@/lib/data/areas";
import { siteConfig } from "@/lib/data/site";

/* ------------------------------------------------------------------ */
/*  Shared animation helpers                                           */
/* ------------------------------------------------------------------ */

const sectionFade = {
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Neighborhood "logos" for social proof                               */
/* ------------------------------------------------------------------ */

const communityLogos = [
  "Phillips Creek",
  "Richwoods",
  "Starwood",
  "Stonebridge",
  "Craig Ranch",
  "Plantation",
  "Windsong Ranch",
] as const;

/* ------------------------------------------------------------------ */
/*  Before & After showcase captions                                   */
/* ------------------------------------------------------------------ */

const showcaseItems = [
  { caption: "Weekly cleaning — Phillips Creek Ranch" },
  { caption: "Green pool recovery — Richwoods" },
  { caption: "Filter clean & chemical balance — Starwood" },
  { caption: "Post-storm cleanup — Craig Ranch" },
  { caption: "Tile scrubbing & wall brushing — Plantation" },
  { caption: "Equipment check & water test — Stonebridge" },
] as const;

/* ------------------------------------------------------------------ */
/*  How It Works steps                                                 */
/* ------------------------------------------------------------------ */

const howItWorksSteps = [
  {
    number: 1,
    title: "Get a Quote",
    description:
      "Tell us about your pool and we\u2019ll send a clear, detailed quote.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "We Schedule Your Day",
    description:
      "Pick a weekly service day that works for your household.",
    icon: CalendarCheck,
  },
  {
    number: 3,
    title: "We Service & Send Updates",
    description:
      "Every visit includes cleaning, chemicals, and a photo report.",
    icon: CameraIcon,
  },
  {
    number: 4,
    title: "Your Pool Stays Swim-Ready",
    description:
      "Consistent care means your pool is always ready to enjoy.",
    icon: Sparkles,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Service area positions for the abstract map graphic                */
/* ------------------------------------------------------------------ */

const areaMapPositions: Record<string, { cx: number; cy: number }> = {
  celina: { cx: 200, cy: 60 },
  prosper: { cx: 260, cy: 110 },
  "little-elm": { cx: 130, cy: 160 },
  frisco: { cx: 250, cy: 190 },
  "the-colony": { cx: 130, cy: 240 },
  mckinney: { cx: 370, cy: 150 },
  allen: { cx: 370, cy: 220 },
  plano: { cx: 310, cy: 280 },
};

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                               */}
      {/* ============================================================ */}
      <Hero />

      {/* ============================================================ */}
      {/* 2. SOCIAL PROOF STRIP                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="flex flex-col items-center gap-8"
          >
            {/* Heading text */}
            <p className="text-center text-sm font-medium tracking-wide text-slate-light uppercase">
              Trusted by pool owners across Frisco and nearby communities
            </p>

            {/* Community "logo" pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {communityLogos.map((name) => (
                <span
                  key={name}
                  className={cn(
                    "inline-flex items-center rounded-full border border-border-light bg-white px-5 py-2",
                    "text-sm font-medium text-gray-400 select-none"
                  )}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* 5.0 average rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-navy">
                5.0 average
              </span>
              <span className="text-sm text-slate-light">
                from local homeowners
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PLANS & PRICING PREVIEW                                    */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Every plan includes weekly cleaning, chemicals, and clear
              communication. No hidden fees.
            </p>
          </motion.div>

          {/* Plan cards grid */}
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Link to full plans page */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mt-12 text-center"
          >
            <Link
              href="/plans"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-hydra-600",
                "transition-colors duration-200 hover:text-hydra-700"
              )}
            >
              See Full Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SERVICES OVERVIEW                                          */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              What We Take Care Of
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              From weekly cleaning to equipment support, we handle it all so you
              don&apos;t have to.
            </p>
          </motion.div>

          {/* Service cards — 2x2 grid (1 col on mobile) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                bullets={service.bullets}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. HOW IT WORKS                                               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* Wave at the top */}
        <WaveBackground position="top" flip />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Getting started is simple.
            </p>
          </motion.div>

          {/* Timeline / steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="relative mx-auto mt-16 max-w-3xl"
          >
            {/* Vertical connecting line */}
            <div
              aria-hidden
              className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-hydra-200 via-hydra-300 to-hydra-200 md:left-8 md:block"
            />

            <div className="flex flex-col gap-12">
              {howItWorksSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={staggerItem}
                    className="relative flex gap-5 md:gap-7"
                  >
                    {/* Number circle */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hydra-500 text-lg font-bold text-white shadow-lg shadow-hydra-500/25 md:h-16 md:w-16 md:text-xl">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="pt-1 md:pt-3">
                      <div className="flex items-center gap-2">
                        <StepIcon className="h-5 w-5 text-hydra-500" />
                        <h3 className="text-lg font-semibold text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SERVICE AREAS                                              */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Serving Frisco &amp; Nearby Communities
            </h2>
          </motion.div>

          {/* Abstract map graphic */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mx-auto mt-14 flex justify-center"
          >
            <svg
              viewBox="0 0 500 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg"
              aria-label="Service area map showing Frisco and nearby cities"
              role="img"
            >
              {/* Connection lines between areas */}
              {serviceAreas
                .filter((a) => !a.primary)
                .map((area) => {
                  const pos = areaMapPositions[area.id];
                  const friscoPos = areaMapPositions.frisco;
                  if (!pos || !friscoPos) return null;
                  return (
                    <line
                      key={`line-${area.id}`}
                      x1={friscoPos.cx}
                      y1={friscoPos.cy}
                      x2={pos.cx}
                      y2={pos.cy}
                      stroke="#B8E8F8"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}

              {/* Area dots */}
              {serviceAreas.map((area) => {
                const pos = areaMapPositions[area.id];
                if (!pos) return null;
                const isPrimary = area.primary;
                return (
                  <g key={area.id}>
                    {/* Outer glow for Frisco */}
                    {isPrimary && (
                      <circle
                        cx={pos.cx}
                        cy={pos.cy}
                        r="28"
                        fill="#27B6E6"
                        fillOpacity="0.1"
                      />
                    )}
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r={isPrimary ? 16 : 8}
                      fill={isPrimary ? "#27B6E6" : "#B8E8F8"}
                      stroke={isPrimary ? "#1A9BC7" : "#8DD8F2"}
                      strokeWidth={isPrimary ? 2 : 1}
                    />
                    <text
                      x={pos.cx}
                      y={pos.cy + (isPrimary ? 30 : 22)}
                      textAnchor="middle"
                      className={cn(
                        "fill-current text-[11px]",
                        isPrimary
                          ? "font-semibold text-navy"
                          : "font-medium text-slate-light"
                      )}
                      style={{
                        fontSize: isPrimary ? 13 : 11,
                        fontWeight: isPrimary ? 600 : 500,
                        fill: isPrimary ? "#0C1D36" : "#6B7B8D",
                      }}
                    >
                      {area.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Area name pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {serviceAreas.map((area) => (
              <motion.span
                key={area.id}
                variants={staggerItem}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium",
                  area.primary
                    ? "bg-hydra-500 text-white shadow-md shadow-hydra-500/20"
                    : "border border-border-light bg-white text-slate"
                )}
              >
                <MapPin className={cn("h-3.5 w-3.5", area.primary ? "text-white" : "text-hydra-400")} />
                {area.name}, {area.state}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mt-10 text-center"
          >
            <Link
              href="/areas"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-hydra-600",
                "transition-colors duration-200 hover:text-hydra-700"
              )}
            >
              Check Your Area
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. BEFORE & AFTER SHOWCASE                                    */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Real Results from Real Pools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Photos from actual service visits.
            </p>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {showcaseItems.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl"
              >
                {/* Placeholder image */}
                <div className="relative aspect-video bg-hydra-50 transition-transform duration-500 group-hover:scale-[1.03]">
                  {/* Camera icon placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Camera className="h-10 w-10 text-hydra-200" />
                    <span className="text-xs font-medium text-hydra-300">
                      Photo coming soon
                    </span>
                  </div>
                </div>

                {/* Hover overlay with caption */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-navy/30 to-transparent p-5",
                    "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  )}
                >
                  <p className="text-sm font-medium text-white">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. TESTIMONIALS                                               */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              What Our Customers Say
            </h2>
          </motion.div>

          {/* Testimonial cards grid */}
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FAQ                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* FAQ accordion — centered, max-w-3xl */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mx-auto mt-12 max-w-3xl"
          >
            <FAQ faqs={faqs} />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FINAL CTA                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        {/* Background effects */}
        <AuroraBackground className="opacity-70" />
        <NoiseOverlay />
        <GradientOrb className="top-[-15%] right-[-10%]" size="lg" />
        <GradientOrb className="bottom-[-10%] left-[-8%]" size="md" />
        <RippleLines className="opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center"
          >
            {/* Headline */}
            <motion.h2
              variants={staggerItem}
              className="text-3xl font-bold text-navy sm:text-4xl md:text-5xl"
            >
              Ready for a Consistently Clean Pool?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-xl text-lg text-slate"
            >
              Join Frisco homeowners who trust Hydra for weekly pool care.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {/* Primary — Get a Quote */}
              <Link
                href="/quote"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Get a Quote
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* Secondary — Call Now */}
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-hydra-500 bg-white px-8 py-4 text-sm font-semibold text-hydra-600 shadow-sm",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-md hover:bg-hydra-50/60",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </motion.div>

            {/* Phone number display */}
            <motion.p
              variants={staggerItem}
              className="mt-6 flex items-center gap-2 text-sm text-slate-light"
            >
              <Phone className="h-3.5 w-3.5 text-hydra-400" />
              {siteConfig.phone}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
