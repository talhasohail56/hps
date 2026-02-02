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
    id: "prosper",
    name: "Prosper",
    state: "TX",
    primary: false,
    description:
      "Prosper and surrounding master-planned communities including Windsong Ranch and Star Trail.",
  },
  {
    id: "little-elm",
    name: "Little Elm",
    state: "TX",
    primary: false,
    description:
      "Little Elm lakeside communities and surrounding neighborhoods.",
  },
  {
    id: "the-colony",
    name: "The Colony",
    state: "TX",
    primary: false,
    description:
      "The Colony communities near Lake Lewisville and surrounding areas.",
  },
  {
    id: "allen",
    name: "Allen",
    state: "TX",
    primary: false,
    description: "Allen neighborhoods including Twin Creeks and Montgomery Farm.",
  },
  {
    id: "celina",
    name: "Celina",
    state: "TX",
    primary: false,
    description:
      "Growing Celina communities including Light Farms and surrounding developments.",
  },
];
