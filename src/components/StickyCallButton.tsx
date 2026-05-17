"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

const phoneHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

export function StickyCallButton() {
  return (
    <>
      {/* ── Desktop / tablet: floating pill in bottom-right ─��� */}
      <a
        href={phoneHref}
        aria-label="Call Now"
        className="fixed bottom-24 right-4 z-40 hidden items-center gap-2 rounded-full bg-hydra-500/90 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-hydra-600/30 backdrop-blur-sm transition-all duration-200 hover:bg-hydra-500 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 sm:right-6 md:inline-flex"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>

      {/* ── Mobile: full-width sticky bar at bottom ── */}
      <a
        href={phoneHref}
        aria-label="Call Now"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 bg-hydra-500/95 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-colors active:bg-hydra-600 md:hidden"
      >
        <Phone className="h-4 w-4" />
        Call Now &mdash; (214) 233-6803
      </a>
    </>
  );
}
