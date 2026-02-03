"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ServiceArea } from "@/lib/data/areas";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AnimatedServiceMapProps {
  areas: ServiceArea[];
  positions: Record<string, { cx: number; cy: number }>;
  hoveredArea?: string | null;
  onAreaHover?: (areaId: string | null) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* Floating ambient particles */
const particles = [
  { cx: 60, cy: 40, r: 2, delay: 0 },
  { cx: 440, cy: 70, r: 1.5, delay: 0.8 },
  { cx: 90, cy: 300, r: 1.8, delay: 1.6 },
  { cx: 470, cy: 260, r: 1.2, delay: 0.4 },
  { cx: 380, cy: 40, r: 1.5, delay: 1.2 },
  { cx: 160, cy: 80, r: 1, delay: 2.0 },
  { cx: 420, cy: 340, r: 1.8, delay: 0.6 },
  { cx: 50, cy: 180, r: 1.3, delay: 1.4 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AnimatedServiceMap({
  areas,
  positions,
  hoveredArea,
  onAreaHover,
  className,
}: AnimatedServiceMapProps) {
  const primary = areas.find((a) => a.primary);
  const secondary = areas.filter((a) => !a.primary);
  const friscoPos = primary ? positions[primary.id] : undefined;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl",
        "bg-white",
        className,
      )}
    >

      <svg
        viewBox="0 0 500 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full"
        aria-label="Animated service area map showing Frisco and nearby cities"
        role="img"
        onMouseLeave={() => onAreaHover?.(null)}
      >
        <defs>
          {/* Glow filter for primary dot */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for connection lines */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#27B6E6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#27B6E6" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ---- Floating ambient particles ---- */}
        {particles.map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#27B6E6"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.35, 0],
              cy: [p.cy, p.cy - 12, p.cy],
            }}
            transition={{
              duration: 4,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        ))}

        {/* ---- Connection lines (animated draw) ---- */}
        {friscoPos &&
          secondary.map((area, i) => {
            const pos = positions[area.id];
            if (!pos) return null;

            const isHovered = hoveredArea === area.id;

            return (
              <motion.path
                key={`line-${area.id}`}
                d={`M ${friscoPos.cx},${friscoPos.cy} L ${pos.cx},${pos.cy}`}
                stroke={isHovered ? "#27B6E6" : "url(#lineGrad)"}
                strokeWidth={isHovered ? 2.5 : 1.5}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: isHovered ? 1 : 0.8 }}
                viewport={{ once: true }}
                transition={{
                  pathLength: {
                    duration: 0.8,
                    delay: 0.3 + i * 0.08,
                    ease,
                  },
                  opacity: { duration: 0.3, delay: 0.3 + i * 0.08 },
                }}
                style={{
                  transition: "stroke 0.2s, stroke-width 0.2s",
                }}
              />
            );
          })}

        {/* ---- Secondary city dots ---- */}
        {secondary.map((area, i) => {
          const pos = positions[area.id];
          if (!pos) return null;
          const isHovered = hoveredArea === area.id;

          return (
            <g
              key={area.id}
              onMouseEnter={() => onAreaHover?.(area.id)}
              className="cursor-pointer"
            >
              {/* Invisible larger hit area */}
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="22"
                fill="transparent"
              />

              {/* Breathing ring */}
              <motion.circle
                cx={pos.cx}
                cy={pos.cy}
                r="16"
                fill="#27B6E6"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? [0.15, 0.25, 0.15] : [0, 0.06, 0],
                }}
                transition={{
                  duration: isHovered ? 1.5 : 3,
                  delay: isHovered ? 0 : i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />

              {/* Main dot */}
              <motion.circle
                cx={pos.cx}
                cy={pos.cy}
                r="7"
                fill={isHovered ? "#B8E8F8" : "#E0F4FC"}
                stroke={isHovered ? "#27B6E6" : "#8DD8F2"}
                strokeWidth={isHovered ? 2 : 1.5}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: 0.5 + i * 0.08,
                }}
                style={{
                  transition: "fill 0.2s, stroke 0.2s, stroke-width 0.2s",
                }}
              />

              {/* Inner bright dot */}
              <motion.circle
                cx={pos.cx}
                cy={pos.cy}
                r={isHovered ? 4 : 3}
                fill="#27B6E6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6 + i * 0.08,
                }}
                style={{ transition: "r 0.2s" }}
              />

              {/* Label */}
              <motion.text
                x={pos.cx}
                y={pos.cy + 20}
                textAnchor="middle"
                style={{
                  fontSize: isHovered ? 12 : 11,
                  fontWeight: isHovered ? 700 : 500,
                  fill: isHovered ? "#0C1D36" : "#6B7B8D",
                  transition: "font-size 0.2s, font-weight 0.2s, fill 0.2s",
                }}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              >
                {area.name}
              </motion.text>
            </g>
          );
        })}

        {/* ---- Primary dot (Frisco) with pulse rings ---- */}
        {primary && friscoPos && (
          <g
            filter="url(#glow)"
            onMouseEnter={() => onAreaHover?.(primary.id)}
            className="cursor-pointer"
          >
            {/* Invisible larger hit area */}
            <circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="30"
              fill="transparent"
            />

            {/* Expanding pulse ring 1 */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="18"
              fill="none"
              stroke="#27B6E6"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{
                r: [18, 38],
                opacity: [0.5, 0],
                strokeWidth: [1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut" as const,
              }}
            />

            {/* Expanding pulse ring 2 (offset) */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="18"
              fill="none"
              stroke="#27B6E6"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{
                r: [18, 38],
                opacity: [0.35, 0],
                strokeWidth: [1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                delay: 1.25,
                repeat: Infinity,
                ease: "easeOut" as const,
              }}
            />

            {/* Static glow ring */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="24"
              fill="#27B6E6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.07, 0.14, 0.07] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            />

            {/* Outer ring */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="16"
              fill="#27B6E6"
              fillOpacity="0.15"
              stroke="#27B6E6"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            />

            {/* Main primary circle */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="12"
              fill="#27B6E6"
              stroke="#1A9BC7"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: 0.15,
              }}
            />

            {/* Inner white dot */}
            <motion.circle
              cx={friscoPos.cx}
              cy={friscoPos.cy}
              r="4"
              fill="white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.3,
              }}
            />

            {/* Primary label */}
            <motion.text
              x={friscoPos.cx}
              y={friscoPos.cy + 30}
              textAnchor="middle"
              style={{
                fontSize: 13,
                fontWeight: 700,
                fill: "#0C1D36",
              }}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {primary.name}
            </motion.text>
          </g>
        )}
      </svg>
    </div>
  );
}
