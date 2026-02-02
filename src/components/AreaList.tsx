"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceArea } from "@/lib/data/areas";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface AreaListProps {
  areas: ServiceArea[];
  showSearch?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AreaList({ areas, showSearch = false }: AreaListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return areas;
    const lower = query.toLowerCase();
    return areas.filter((a) => a.name.toLowerCase().includes(lower));
  }, [areas, query]);

  /* Split primary from the rest so the primary card renders first */
  const primary = filtered.find((a) => a.primary);
  const others = filtered.filter((a) => !a.primary);

  return (
    <div className="space-y-8">
      {/* ---- Search input ---- */}
      {showSearch && (
        <div className="mx-auto max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-light" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search service areas..."
              className={cn(
                "w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4",
                "text-sm text-navy placeholder:text-slate-light",
                "transition-shadow duration-200",
                "focus:border-hydra-400 focus:outline-none focus:ring-2 focus:ring-hydra-200",
              )}
            />
          </div>
        </div>
      )}

      {/* ---- Empty state ---- */}
      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-slate-light">
          No service areas match &ldquo;{query}&rdquo;
        </p>
      )}

      {/* ---- Area grid ---- */}
      {filtered.length > 0 && (
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Primary card (full-width on sm, 2-col on lg+) */}
          {primary && (
            <motion.div
              variants={cardVariants}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-2 border-hydra-300 bg-hydra-50 p-6",
                "shadow-sm transition-shadow duration-200 hover:shadow-md",
                "sm:col-span-2",
              )}
            >
              {/* Decorative corner accent */}
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-hydra-100 opacity-60"
              />

              <div className="relative flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-hydra-200 text-hydra-700">
                  <MapPin className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-navy">
                      {primary.name}
                    </h3>
                    <span className="inline-block rounded-full bg-hydra-200 px-2 py-0.5 text-[11px] font-semibold leading-none text-hydra-800">
                      HQ
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-hydra-600">
                    {primary.state}
                  </p>
                  {primary.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {primary.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Other area cards */}
          {others.map((area) => (
            <motion.div
              key={area.id}
              variants={cardVariants}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5",
                "shadow-sm transition-shadow duration-200 hover:shadow-md",
              )}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hydra-50 text-hydra-600">
                  <MapPin className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-navy">
                    {area.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-light">
                    {area.state}
                  </p>
                  {area.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-light">
                      {area.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
