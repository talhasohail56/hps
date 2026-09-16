import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";
import { ENTRY_PRICE, planEntryPrice } from "@/lib/data/pricing-tiers";

/*
 * Sole metadata source for /services.
 *
 * This used to be declared here AND in page.tsx. Page metadata wins in the
 * App Router, so the copy here was dead while still looking authoritative —
 * and the two drifted apart. Everything now lives here; page.tsx declares
 * none. Prices are read from the shared tier data: both numbers below were
 * wrong (weekly was advertised at the bi-weekly price) precisely because they
 * were hand-typed.
 */
const WEEKLY_FROM = planEntryPrice("weekly");

export const metadata: Metadata = {
  title: "Pool Services — Weekly Cleaning, Repairs & More",
  description:
    `Pool cleaning, maintenance, repairs, bead blasting & more in Frisco, TX. Residential & commercial pool care from $${ENTRY_PRICE}/mo. All chemicals included. Free first 2 weeks. Call (214) 233-6803.`,
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Pool Services — Weekly Cleaning, Repairs & More | Hydra Pool Services",
    description:
      `Weekly cleaning from $${WEEKLY_FROM}/mo, all chemicals included. Plus repairs, filter service, bead blasting, and salt cell maintenance. Serving Frisco, Plano, McKinney, Allen & North DFW.`,
    url: `${siteConfig.url}/services`,
    images: [{ url: siteConfig.ogImage, width: 1290, height: 720, alt: siteConfig.ogImageAlt }],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
