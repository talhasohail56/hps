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
  /** Optional callout, e.g. when a plan already covers this add-on. */
  note?: string;
}

export const plans: Plan[] = [
  {
    id: "biweekly",
    name: "Bi-weekly",
    subtitle: "Essential pool care every two weeks",
    price: 139,
    priceLabel: "starting at",
    featured: false,
    features: [
      { text: "Chemical testing", included: true },
      { text: "Chemical balancing", included: true },
      { text: "Surface skimming", included: true },
      { text: "Tile and walls brushing", included: true },
      { text: "Basket Cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Priority scheduling", included: false },
      { text: "Equipment repair support", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "weekly",
    name: "Weekly",
    subtitle: "Complete weekly service for a swim-ready pool",
    price: 179,
    priceLabel: "starting at",
    featured: true,
    features: [
      { text: "Chemical testing", included: true },
      { text: "Chemical balancing", included: true },
      { text: "Surface skimming", included: true },
      { text: "Tile and walls brushing", included: true },
      { text: "Basket Cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Priority scheduling", included: false },
      { text: "Equipment repair support", included: false },
      { text: "Weekly pool cleaning", included: true },
    ],
    cta: "Get Started",
  },
  {
    id: "premium-care",
    name: "Premium Care",
    subtitle: "Full-service care with equipment support & priority scheduling",
    price: 299,
    priceLabel: "flat rate",
    featured: false,
    features: [
      { text: "Chemical testing", included: true },
      { text: "Chemical balancing", included: true },
      { text: "Surface skimming", included: true },
      { text: "Tile and walls brushing", included: true },
      { text: "Basket Cleaning", included: true },
      { text: "Equipment inspection", included: true },
      { text: "Digital visit reports", included: true },
      { text: "Priority scheduling", included: true },
      { text: "Equipment repair support", included: true },
      { text: "Weekly pool cleaning", included: true },
      { text: "Filter cleaning included", included: true },
    ],
    cta: "Get Started",
  },
];

export const addOns: AddOn[] = [
  {
    id: "filter-clean",
    name: "One-time filter clean",
    description: "Deep clean of your pool filter — cartridge, DE, or sand",
    price: "$129",
    note: "Included free with Premium Care",
  },
  {
    id: "green-to-clean",
    name: "Green-to-Clean",
    description: "Full recovery for neglected or algae-affected pools",
    price: "Starting at $399",
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
