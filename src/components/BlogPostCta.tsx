import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import {
  TIERED_PLAN_PRICES,
  TIERED_PLAN_KEYS,
} from "@/lib/data/pricing-tiers";

/* ------------------------------------------------------------------ */
/*  End-of-article conversion block                                    */
/*                                                                     */
/*  Blog posts carry most of the site's search impressions but had no  */
/*  route to a commercial page. This sits after the article body as a  */
/*  quiet footer — not a banner, not an interruption.                  */
/* ------------------------------------------------------------------ */

/**
 * Lowest advertised monthly price, derived from the same tier data that
 * drives /plans and the chatbot. Never hardcode a price here: if the
 * tables change, this follows automatically.
 */
function startingPrice(): number {
  return Math.min(
    ...TIERED_PLAN_KEYS.flatMap((plan) =>
      Object.values(TIERED_PLAN_PRICES[plan])
    )
  );
}

export function BlogPostCta() {
  const price = startingPrice();
  const telHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

  return (
    <aside className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border-light bg-surface p-6 sm:p-8">
        <h2 className="text-lg font-bold tracking-tight text-navy sm:text-xl">
          Prefer to hand this off?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-light">
          We handle the testing, the chemicals, and the equipment checks every
          visit &mdash; across Frisco, Plano, McKinney, Allen and North DFW.
          Plans start at{" "}
          <span className="font-semibold text-navy">${price}/mo + tax</span>,
          with no contracts.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all hover:-translate-y-0.5 hover:bg-hydra-600 hover:shadow-xl"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={telHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-light bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
          >
            <Phone className="h-4 w-4 text-hydra-500" />
            {siteConfig.phone}
          </a>
        </div>

        <p className="mt-5 text-sm text-slate-light">
          <Link
            href="/plans"
            className="font-semibold text-hydra-600 underline underline-offset-2 transition-colors hover:text-hydra-700"
          >
            See plans and pricing
          </Link>
          <span className="mx-2 text-hydra-300">&#183;</span>
          <Link
            href="/services"
            className="font-semibold text-hydra-600 underline underline-offset-2 transition-colors hover:text-hydra-700"
          >
            Browse all services
          </Link>
        </p>
      </div>
    </aside>
  );
}
