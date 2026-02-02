export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael R.",
    neighborhood: "Phillips Creek Ranch, Frisco",
    quote:
      "We switched to Hydra after two bad experiences with other companies. The difference is night and day — our pool has never looked this good, and the communication is excellent. We always know when they're coming and what was done.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah & Kevin T.",
    neighborhood: "Richwoods, Frisco",
    quote:
      "Consistent, reliable, and easy to work with. They balance our chemicals perfectly every week and the billing is straightforward. No surprises, just a clean pool every single week.",
    rating: 5,
  },
  {
    id: "3",
    name: "David L.",
    neighborhood: "Plantation Resort, Frisco",
    quote:
      "I used to spend my weekends fighting with pool chemistry. Now I just get a text that service is done and enjoy swimming. Hydra handles everything and the visit reports with photos give me total peace of mind.",
    rating: 5,
  },
];
