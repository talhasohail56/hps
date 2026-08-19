import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, CheckCircle, ChevronRight, ArrowRight, Star } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { serviceAreas } from "@/lib/data/areas";
import { cityContent } from "@/lib/data/city-content";
import { services } from "@/lib/data/services";

/* ------------------------------------------------------------------ */
/*  Static params for all cities                                       */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.id }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const content = cityContent[city];
  if (!content) return { title: "Not Found" };

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/areas/${city}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteConfig.url}/areas/${city}`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  City-specific deep-dive FAQs                                       */
/* ------------------------------------------------------------------ */

const cityDeepFaqs: Record<string, { question: string; answer: string }[]> = {
  frisco: [
    { question: "How much does pool cleaning cost in Frisco?", answer: "Weekly pool service in Frisco starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo. Both plans include water testing, chemical adjustment, surface cleaning, and equipment inspection every visit." },
    { question: "How often should I service my pool in Frisco?", answer: "Weekly service is recommended year-round in Frisco. Bi-weekly can work October through March, but the summer heat, pollen, and UV intensity make weekly service essential from April through September." },
    { question: "What pool problems are most common in Frisco?", answer: "Hard water scaling from Frisco's 150-250 ppm calcium tap water, high CYA from chlorine tab overuse, and heavy pollen loading in spring are the most common issues we treat. Starwood pools also face heavy tree debris and aging equipment." },
    { question: "Do you service pools in Starwood and Phillips Creek Ranch?", answer: "Yes, we service pools throughout Frisco including Starwood, Phillips Creek Ranch, Richwoods, Hollyhock, Lawler Park, Newman Village, and all other Frisco neighborhoods." },
    { question: "Do you include chemicals in your pool service?", answer: "Yes, all chemicals are included in every plan — liquid chlorine, muriatic acid, stabilizer, shock, and any specialty chemicals your pool needs. No hidden chemical fees." },
  ],
  plano: [
    { question: "How much does pool service cost in Plano?", answer: "Weekly pool service in Plano starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "How often should I service my pool in Plano?", answer: "Weekly service year-round is recommended. The combination of Plano's hard water, summer heat, and pollen season makes consistent weekly attention essential for clear water." },
    { question: "What pool problems are common in Plano?", answer: "Hard water scaling, aging equipment in older Plano neighborhoods, and high CYA from years of chlorine tab use are the most common issues. Plano pools also face heavy pollen loading in spring." },
    { question: "Do you offer pool repair in Plano?", answer: "Yes, we handle pump replacement, heater repair, salt cell replacement, filter issues, and leak detection across Plano." },
  ],
  mckinney: [
    { question: "How much does pool cleaning cost in McKinney?", answer: "Weekly pool service in McKinney starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "What makes pool maintenance different in McKinney?", answer: "McKinney's municipal water is harder than many homeowners realize, leading to faster calcium scaling on tile and equipment. Regular acid washing and calcium management are essential." },
    { question: "Do you service pools in all McKinney neighborhoods?", answer: "Yes, we serve pools throughout McKinney including Craig Ranch, Stonebridge Ranch, Tucker Hill, Adriatica, and all surrounding areas." },
    { question: "How do I know if my pool has a leak?", answer: "If your pool loses more than 1/4 inch per day, it may be a leak rather than evaporation. We offer leak detection services across McKinney." },
  ],
  allen: [
    { question: "How much does pool service cost in Allen?", answer: "Weekly pool service in Allen starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "What pool issues are common in Allen?", answer: "Heavy spring pollen, hard water from the NTMWD supply, and aging equipment in Allen's established neighborhoods are the most common issues we address." },
    { question: "How long should I run my pool pump in Allen?", answer: "In summer, run your pump 10-12 hours per day. In winter, 4-6 hours is sufficient. During freezes, run it 24/7 to prevent equipment damage." },
    { question: "Do you offer salt cell cleaning in Allen?", answer: "Yes, we clean salt cells every 3-4 months as part of our service. In Allen's hard water, quarterly cleaning extends cell life by 1-2 years." },
  ],
  murphy: [
    { question: "How much does pool cleaning cost in Murphy?", answer: "Weekly pool service in Murphy starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "What makes Murphy pools different to maintain?", answer: "Murphy's mature neighborhoods have heavy tree coverage, creating more debris, faster filter loading, and increased organic chlorine demand. Shaded pools also see more algae on walls." },
    { question: "Do you handle pool equipment repair in Murphy?", answer: "Yes, we diagnose and repair pumps, heaters, salt cells, filters, and automation systems across Murphy." },
    { question: "How do I prepare my Murphy pool for winter?", answer: "Keep the pump running during freezes, insulate exposed pipes, maintain 1-2 ppm chlorine, and reduce pump runtime to 4-6 hours on non-freeze days." },
  ],
  "the-colony": [
    { question: "How much does pool service cost in The Colony?", answer: "Weekly pool service in The Colony starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "How does living near Lewisville Lake affect my pool?", answer: "The Colony's proximity to Lewisville Lake means higher humidity, more algae pressure, and wind-blown debris. Pools near the lake need more aggressive chlorine management and skimming." },
    { question: "What should I do if my Colony pool overflows after rain?", answer: "Lower the water level using the waste setting on your filter valve or a submersible pump. Check that the equipment pad isn't flooded and verify chemistry after the rain." },
    { question: "Do you service commercial pools in The Colony?", answer: "Yes, we provide commercial pool maintenance for HOA pools, apartment complexes, and community pools across The Colony." },
  ],
  prosper: [
    { question: "How much does pool cleaning cost in Prosper?", answer: "Weekly pool service in Prosper starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "My Prosper pool is brand new — do I still need service?", answer: "Yes, new pools need more attention, not less. Fresh plaster releases calcium hydroxide that spikes pH daily, and new pool chemistry is unstable for the first 6-12 months." },
    { question: "Should I convert my Prosper pool to saltwater?", answer: "Salt systems provide softer water but require more maintenance in North Texas hard water — quarterly cell cleaning, more frequent pH management, and proactive calcium control." },
    { question: "What landscaping works best around a Prosper pool?", answer: "Low-debris, low-root plants like dwarf yaupon holly, gulf muhly grass, and lantana work well. Avoid live oaks and pecans directly over the pool — they drop too much debris." },
  ],
  parker: [
    { question: "How much does pool service cost in Parker?", answer: "Weekly pool service in Parker starts at $179/mo with all chemicals included. Bi-weekly starts at $139/mo." },
    { question: "How does Parker's well water affect my pool?", answer: "Parker properties on well water deal with higher mineral content — especially iron and calcium. This causes faster staining, more scaling, and requires more aggressive chemical management than municipal water." },
    { question: "Do you service pools on large Parker lots?", answer: "Yes, we service pools on Parker's larger acreage properties. The bigger lots often mean more tree coverage and wind exposure, which we account for in our service approach." },
    { question: "What's different about pool maintenance in Parker?", answer: "Well water mineral management, deer-resistant landscaping considerations, larger pools with more water volume, and storm exposure on open lots make Parker pools unique compared to suburban Frisco or Plano." },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = cityContent[city];
  const area = serviceAreas.find((a) => a.id === city);

  if (!content || !area) notFound();

  const nearbyAreas = content.nearbyCities
    .map((id) => serviceAreas.find((a) => a.id === id))
    .filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75034",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Pool Service Plans in ${area.name}, TX`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Bi-weekly Pool Service",
          price: "139",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "139",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Weekly Pool Service",
          price: "179",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "179",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Premium Care Pool Service",
          price: "299",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "299",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
      ],
    },
  };

  const deepFaqs = cityDeepFaqs[city] ?? [];

  const deepFaqJsonLd = deepFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: deepFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${siteConfig.url}/areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.name}, TX`,
        item: `${siteConfig.url}/areas/${city}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {deepFaqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(deepFaqJsonLd) }}
        />
      )}

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-hydra-50/60 to-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-slate-light" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-hydra-600 transition-colors">
                  Home
                </Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/areas" className="hover:text-hydra-600 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="font-medium text-navy">{area.name}, TX</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-hydra-500" />
            <span className="text-sm font-semibold text-hydra-600 uppercase tracking-wide">
              {area.name}, Texas
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {content.headline}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-light max-w-3xl">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-hydra-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all hover:bg-hydra-600 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border-light px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
            >
              <Phone className="h-4 w-4 text-hydra-500" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── What Makes [City] Pools Different ── */}
      {content.poolChallenges && content.poolChallenges.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What Makes {area.name} Pools Different
            </h2>
            <div className="mt-6 space-y-4">
              {content.poolChallenges.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Choose Hydra ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Why {area.name} Residents Choose Hydra
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-light">
            {content.whyChoose}
          </p>
          <ul className="mt-6 space-y-3">
            {content.whyChooseBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm text-navy">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Service Plans in {area.name}, TX
          </h2>
          <p className="mt-3 text-sm text-slate-light">
            All plans include chemicals, equipment inspections, and digital service reports.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { name: "Bi-weekly", price: 139, desc: "Essential bi-weekly cleaning" },
              { name: "Weekly", price: 179, desc: "Complete weekly service", featured: true },
              { name: "Premium Care", price: 299, desc: "Weekly + equipment support" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-5 text-center ${
                  plan.featured
                    ? "border-hydra-400 bg-hydra-50/50 shadow-md"
                    : "border-border-light bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-2 inline-block rounded-full bg-hydra-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-navy">{plan.name}</p>
                <p className="mt-1 text-3xl font-extrabold text-hydra-600">
                  ${plan.price}
                  <span className="text-sm font-medium text-slate-light">/mo</span>
                </p>
                <p className="mt-1 text-xs text-slate-light">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/plans"
              className="text-sm font-semibold text-hydra-600 hover:text-hydra-700 transition-colors"
            >
              View full plan details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's Included in Every Visit ── */}
      {content.visitIncludes && content.visitIncludes.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What&apos;s Included in Every Visit
            </h2>
            <div className="mt-6 space-y-4">
              {content.visitIncludes.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Neighborhoods ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Neighborhoods We Serve in {area.name}
          </h2>
          <p className="mt-3 text-sm text-slate-light">
            We provide pool service throughout {area.name}, TX including these communities:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.neighborhoods.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-white px-4 py-2 text-sm font-medium text-navy"
              >
                <MapPin className="h-3.5 w-3.5 text-hydra-400" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pool Service by Neighborhood ── */}
      {content.neighborhoodDetails && content.neighborhoodDetails.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {area.name} Pool Service by Neighborhood
            </h2>
            <div className="mt-6 space-y-6">
              {content.neighborhoodDetails.map((nd) => (
                <div key={nd.name}>
                  <h3 className="text-base font-semibold text-navy sm:text-lg">
                    {nd.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
                    {nd.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Our Services ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Services Available in {area.name}, TX
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group rounded-xl border border-border-light p-4 transition-all hover:border-hydra-300 hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-navy group-hover:text-hydra-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-light line-clamp-2">
                  {service.shortDescription}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-hydra-600">
                  Learn more <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Google rating badge */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-navy">
                4.9 stars on Google
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-sm text-slate-light">
              Real reviews from {area.name} homeowners we serve every week.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-border-light bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-hydra-100/30"
                >
                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-[18px] w-[18px] fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-slate">
                    <span className="text-hydra-300 select-none">&ldquo;</span>
                    {t.quote}
                    <span className="text-hydra-300 select-none">&rdquo;</span>
                  </blockquote>

                  {/* Name */}
                  <div className="mt-auto border-t border-border-light pt-4">
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="mt-0.5 text-xs text-slate-light">{area.name}, TX</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Homeowners Switch to Us ── */}
      {content.switchReasons && content.switchReasons.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Why {area.name} Homeowners Switch to Us
            </h2>
            <div className="mt-6 space-y-4">
              {content.switchReasons.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Service FAQs for {area.name}, TX
          </h2>
          <div className="mt-8 divide-y divide-border-light">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-navy">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 text-slate-light transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-light pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Areas ── */}
      {nearbyAreas.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Also Serving Nearby Cities
            </h2>
            <p className="mt-3 text-sm text-slate-light">
              We also provide pool service in these nearby communities:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {nearbyAreas.map((a) =>
                a ? (
                  <Link
                    key={a.id}
                    href={`/areas/${a.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2 text-sm font-medium text-navy transition-all hover:border-hydra-300 hover:bg-hydra-50 hover:text-hydra-600"
                  >
                    <MapPin className="h-3.5 w-3.5 text-hydra-400" />
                    {a.name}, TX
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Deep-dive FAQs (city-specific) ── */}
      {deepFaqs.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-light">
              Common questions from {area.name} pool owners.
            </p>
            <div className="mt-8 divide-y divide-border-light rounded-2xl border border-border-light">
              {deepFaqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-navy transition-colors hover:text-hydra-600">
                    {faq.question}
                    <ChevronRight className="h-4 w-4 shrink-0 text-hydra-400 transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 pr-12">
                    <p className="text-sm leading-relaxed text-slate-light">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-gradient-to-b from-white to-hydra-50/40 py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Ready for Crystal-Clear Water in {area.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-light">
            Get a free, no-obligation quote today. Your first 2 weeks are on us
            — completely free. No contracts, no hidden fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all hover:bg-hydra-600 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
            >
              <Phone className="h-4 w-4 text-hydra-500" />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
