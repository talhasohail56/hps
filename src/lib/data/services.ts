export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  bullets: string[];
  checklist: string[];
  frequency: string;
  bestFor: string;
}

export const services: Service[] = [
  {
    id: "weekly-cleaning",
    title: "Weekly Pool Cleaning",
    shortDescription:
      "Thorough weekly cleaning to keep your pool sparkling and swim-ready every day.",
    description:
      "Our weekly cleaning service covers every surface of your pool. We skim debris, vacuum the floor, brush walls and tile, empty baskets, and inspect equipment to catch small issues before they grow.",
    icon: "Waves",
    bullets: [
      "Complete surface skimming and debris removal",
      "Floor vacuuming and wall brushing",
      "Basket and skimmer cleaning",
    ],
    checklist: [
      "Skim surface for debris and leaves",
      "Vacuum pool floor thoroughly",
      "Brush walls, steps, and tile line",
      "Empty pump and skimmer baskets",
      "Check water level and adjust",
      "Inspect equipment for issues",
      "Send visit summary with photos",
    ],
    frequency: "Weekly",
    bestFor:
      "Every pool owner who wants a consistently clean pool without lifting a finger.",
  },
  {
    id: "water-chemistry",
    title: "Water Chemistry & Balancing",
    shortDescription:
      "Precise chemical testing and balancing to keep water safe, clear, and comfortable.",
    description:
      "We test and balance your water chemistry every visit. From chlorine and pH to alkalinity and stabilizer, we keep everything in the optimal range so your water is safe, clear, and gentle on skin and equipment.",
    icon: "FlaskConical",
    bullets: [
      "Full chemical testing every visit",
      "Chlorine, pH, and alkalinity balancing",
      "All chemicals included in service plans",
    ],
    checklist: [
      "Test chlorine / bromine levels",
      "Test and adjust pH",
      "Test and adjust alkalinity",
      "Check stabilizer (CYA) levels",
      "Add chemicals as needed",
      "Log all readings in service report",
      "Flag any unusual readings",
    ],
    frequency: "Every visit (weekly)",
    bestFor:
      "Homeowners who want crystal-clear water without guessing chemical ratios.",
  },
  {
    id: "filter-maintenance",
    title: "Filter Cleans & Maintenance",
    shortDescription:
      "Regular filter cleaning and inspection to keep water flowing and equipment healthy.",
    description:
      "Filters are the lungs of your pool. We perform full filter cleans on a recommended schedule, checking for wear and ensuring your filtration system runs at peak efficiency. Clean filters mean cleaner water and lower energy costs.",
    icon: "Filter",
    bullets: [
      "Cartridge, DE, and sand filter service",
      "Thorough cleaning and inspection",
      "Scheduled based on your pool's needs",
    ],
    checklist: [
      "Remove and inspect filter elements",
      "Deep clean cartridges or grids",
      "Check for tears, cracks, or wear",
      "Reassemble and verify flow rate",
      "Check pressure gauge readings",
      "Log filter condition in report",
    ],
    frequency: "Monthly or as needed",
    bestFor:
      "Pool owners who want optimal filtration and longer equipment life.",
  },
  {
    id: "repairs-equipment",
    title: "Repairs & Equipment Help",
    shortDescription:
      "Troubleshooting and repair support for pumps, heaters, cleaners, and more.",
    description:
      "From a noisy pump to a tripped breaker, we diagnose and help resolve common pool equipment issues. For larger repairs, we coordinate with trusted local specialists and keep you informed every step of the way.",
    icon: "Wrench",
    bullets: [
      "Pump, heater, and cleaner diagnostics",
      "Minor repair and adjustment support",
      "Coordination with trusted specialists",
    ],
    checklist: [
      "Assess and diagnose equipment issue",
      "Perform minor adjustments or repairs",
      "Test equipment after servicing",
      "Provide detailed report and photos",
      "Coordinate specialist referral if needed",
      "Follow up on repair completion",
    ],
    frequency: "As needed",
    bestFor:
      "Homeowners with equipment issues or aging pool systems that need attention.",
  },
];
