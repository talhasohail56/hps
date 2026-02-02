"use client";

import { cn } from "@/lib/utils";

/**
 * WaveBackground — Soft gradient wave SVG for section dividers.
 * Renders a gentle, organic curve at the top or bottom of a section.
 */
export function WaveBackground({
  className,
  position = "bottom",
  flip = false,
}: {
  className?: string;
  position?: "top" | "bottom";
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 right-0 overflow-hidden",
        position === "top" ? "top-0" : "bottom-0",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
          fill="url(#wave-gradient)"
          fillOpacity="0.5"
        />
        <path
          d="M0 80C240 50 480 110 720 80C960 50 1200 110 1440 80V120H0V80Z"
          fill="url(#wave-gradient-2)"
          fillOpacity="0.3"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#27B6E6" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#3BC3F1" stopOpacity="0.1" />
            <stop offset="1" stopColor="#27B6E6" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#E8F7FD" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#C8ECFA" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E8F7FD" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
