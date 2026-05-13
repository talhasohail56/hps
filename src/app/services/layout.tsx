import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Pool Services — Weekly Cleaning, Repairs & More",
  description:
    "Pool cleaning, maintenance, repairs, bead blasting & more in Frisco, TX. Residential & commercial pool care from $139/mo. All chemicals included. Free first 2 weeks. Call (214) 233-6803.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Pool Services — Weekly Cleaning, Repairs & More | Hydra Pool Services",
    description:
      "Weekly cleaning from $139/mo, all chemicals included. Plus repairs, filter service, bead blasting, and salt cell maintenance. Serving Frisco, Plano, McKinney, Allen & North DFW.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
