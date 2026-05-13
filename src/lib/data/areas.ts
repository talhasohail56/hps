export interface ServiceArea {
  id: string;
  name: string;
  state: string;
  primary: boolean;
  description?: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "frisco",
    name: "Frisco",
    state: "TX",
    primary: true,
    description:
      "Our home base. We serve neighborhoods throughout Frisco including Phillips Creek Ranch, Richwoods, Plantation Resort, Starwood, and more.",
  },
  {
    id: "plano",
    name: "Plano",
    state: "TX",
    primary: false,
    description:
      "West Plano and surrounding communities including Willow Bend, Deerfield, and Legacy area.",
  },
  {
    id: "mckinney",
    name: "McKinney",
    state: "TX",
    primary: false,
    description:
      "South and central McKinney neighborhoods including Stonebridge Ranch and Craig Ranch.",
  },
  {
    id: "allen",
    name: "Allen",
    state: "TX",
    primary: false,
    description: "Allen neighborhoods including Twin Creeks and Montgomery Farm.",
  },
  {
    id: "murphy",
    name: "Murphy",
    state: "TX",
    primary: false,
    description:
      "Murphy neighborhoods and surrounding communities in eastern Collin County.",
  },
  {
    id: "prosper",
    name: "Prosper",
    state: "TX",
    primary: false,
    description:
      "Prosper and surrounding master-planned communities including Windsong Ranch and Star Trail.",
  },
  {
    id: "parker",
    name: "Parker",
    state: "TX",
    primary: false,
    description:
      "Parker properties including Southfork Ranch area, Mustang Park, and rural homesteads.",
  },
  {
    id: "the-colony",
    name: "The Colony",
    state: "TX",
    primary: false,
    description:
      "The Colony communities near Lake Lewisville and surrounding areas.",
  },
];
