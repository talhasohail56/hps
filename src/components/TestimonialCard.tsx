"use client";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/data/testimonials";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill={filled ? "#FACC15" : "none"}
      stroke={filled ? "#FACC15" : "#D1D5DB"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const { name, neighborhood, quote, rating } = testimonial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={cn(
        "group flex flex-col rounded-2xl border border-border-light bg-white p-6",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-md hover:shadow-hydra-100/30"
      )}
    >
      {/* Star rating */}
      <div className="mb-4 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-slate">
        <span className="text-hydra-300 select-none" aria-hidden>
          &ldquo;
        </span>
        {quote}
        <span className="text-hydra-300 select-none" aria-hidden>
          &rdquo;
        </span>
      </blockquote>

      {/* Attribution */}
      <div className="mt-auto border-t border-border-light pt-4">
        <p className="text-sm font-semibold text-navy">{name}</p>
        <p className="mt-0.5 text-xs text-slate-light">{neighborhood}</p>
      </div>
    </motion.div>
  );
}
