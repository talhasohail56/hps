export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: number | null;
  priceLabel: string;
  featured: boolean;
  features: PlanFeature[];
  cta: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: string;
}

export const plans: Plan[] = [
  {
    id: "standard",
    name: "Standard Weekly Service",
    subtitle: "Everything you need for a clean, balanced pool",
    price: 179,
    priceLabel: "starting at",
    featured: false,
    features: [
      { text: "Weekly pool cleaning", included: true },
      { text: "Chemical testing & balancing", included: true },
      { text: "Surface skimming & brushing", included: true },
      { text: "Basket & skimmer cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Filter clean (quarterly)", included: false },
      { text: "Priority scheduling", included: false },
      { text: "Equipment repair support", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "standard-plus",
    name: "Standard Plus",
    subtitle: "Weekly service with added filter care and priority support",
    price: 229,
    priceLabel: "starting at",
    featured: true,
    features: [
      { text: "Weekly pool cleaning", included: true },
      { text: "Chemical testing & balancing", included: true },
      { text: "Surface skimming & brushing", included: true },
      { text: "Basket & skimmer cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Filter clean (quarterly)", included: true },
      { text: "Priority scheduling", included: true },
      { text: "Equipment repair support", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "premium",
    name: "Premium Care",
    subtitle: "Full-service pool care with repairs and top priority",
    price: 299,
    priceLabel: "starting at",
    featured: false,
    features: [
      { text: "Weekly pool cleaning", included: true },
      { text: "Chemical testing & balancing", included: true },
      { text: "Surface skimming & brushing", included: true },
      { text: "Basket & skimmer cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Filter clean (quarterly)", included: true },
      { text: "Priority scheduling", included: true },
      { text: "Equipment repair support", included: true },
    ],
    cta: "Get Started",
  },
];

export const addOns: AddOn[] = [
  {
    id: "filter-clean",
    name: "One-Time Filter Clean",
    description: "Deep clean of your pool filter outside of scheduled cleans",
    price: "$75 – $150",
  },
  {
    id: "green-cleanup",
    name: "Green Pool Cleanup",
    description: "Full recovery for neglected or algae-affected pools",
    price: "Starting at $350",
  },
  {
    id: "acid-wash",
    name: "Acid Wash",
    description: "Surface acid wash to remove stains and buildup",
    price: "Quote required",
  },
  {
    id: "equipment-repair",
    name: "Equipment Repair",
    description: "Diagnosis and repair for pumps, heaters, and cleaners",
    price: "Quote required",
  },
  {
    id: "salt-cell-clean",
    name: "Salt Cell Cleaning",
    description: "Inspection and cleaning of saltwater chlorine generator cells",
    price: "$95",
  },
];
