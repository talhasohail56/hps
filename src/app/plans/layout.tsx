import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";
import { plans, type Plan } from "@/lib/data/plans";
import {
  ENTRY_PRICE,
  planEntryPrice,
  PREMIUM_CARE_FLAT_PRICE,
} from "@/lib/data/pricing-tiers";

export const metadata: Metadata = {
  title: `Pool Service Plans & Pricing — From $${ENTRY_PRICE}/mo`,
  /*
   * The floor is Chemical Only, not Bi-weekly. This previously opened at $139
   * and omitted Chemical Only entirely, so it read as a $139 floor and
   * undersold the cheapest plan by $20.
   */
  description:
    `Pool service plans in Frisco, TX from $${ENTRY_PRICE}/mo: Chemical Only, Bi-weekly $${planEntryPrice(
      "biweekly"
    )}, Weekly $${planEntryPrice(
      "weekly"
    )}, Premium Care $${PREMIUM_CARE_FLAT_PRICE}. All chemicals included, no contracts. Free first 2 weeks. Call (214) 233-6803.`,
  alternates: {
    canonical: `${siteConfig.url}/plans`,
  },
  openGraph: {
    title: "Pool Service Plans & Pricing | Hydra Pool Services",
    description:
      "Affordable pool service plans in Frisco, TX. All chemicals included. Free first 2 weeks for new customers.",
    url: `${siteConfig.url}/plans`,
    images: [{ url: siteConfig.ogImage, width: 1290, height: 720, alt: siteConfig.ogImageAlt }],
  },
};

/*
 * Long-form offer copy, keyed by plan id. Kept here rather than in the shared
 * data because it is written for search engines, not for the cards.
 */
const OFFER_DESCRIPTIONS: Record<string, string> = {
  "chemical-only":
    "Weekly water care without the full clean: chemical testing and balancing, tile and wall brushing, basket cleaning, equipment inspection, and digital visit reports.",
  biweekly:
    "Essential pool care every two weeks including pool cleaning, chemical testing, surface skimming, equipment inspection, and digital visit reports.",
  weekly:
    "Complete weekly service for a swim-ready pool including cleaning, chemical balancing, surface skimming, equipment inspection, and digital visit reports.",
  "premium-care":
    "Full-service weekly care with equipment support, priority scheduling, filter cleaning, chemical balancing, and digital visit reports.",
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pool Service Plans",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
  },
  areaServed: {
    "@type": "City",
    name: "Frisco, TX",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pool Maintenance Plans",
    /*
     * Generated from the same `plans` array the cards on /plans render. This
     * listed three hardcoded offers and omitted Chemical Only, so the page
     * showed four plans while the markup advertised three.
     *
     * Only the prose below is local to the markup; names and prices come from
     * the shared data. Prices stay bare — the "+ tax" wording belongs in the
     * visible copy, not in structured data.
     */
    itemListElement: plans
      .filter((plan): plan is Plan & { price: number } => plan.price !== null)
      .map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} Pool Service`,
        description: OFFER_DESCRIPTIONS[plan.id] ?? plan.subtitle,
        price: String(plan.price),
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(plan.price),
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/plans`,
      })),
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {children}
    </>
  );
}
