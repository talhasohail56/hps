export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is included in weekly service?",
    answer:
      "Every weekly visit includes surface skimming, floor vacuuming, wall and tile brushing, basket and skimmer cleaning, full chemical testing and balancing, equipment inspection, and a digital visit report with photos. All chemicals are included — you never have to buy or add anything yourself.",
  },
  {
    id: "2",
    question: "Do you provide chemicals?",
    answer:
      "Yes. All chemicals needed to keep your pool balanced are included in every service plan. We bring professional-grade chlorine, acid, alkalinity adjusters, and stabilizers. You never need to purchase or store pool chemicals.",
  },
  {
    id: "3",
    question: "What happens during storms or bad weather?",
    answer:
      "If severe weather prevents a safe visit, we'll notify you and reschedule within the same week when possible. After major storms, we prioritize clearing debris and rebalancing water chemistry to get your pool back to swim-ready condition quickly.",
  },
  {
    id: "4",
    question: "Can you service saltwater pools?",
    answer:
      "Absolutely. We service both traditional chlorine and saltwater pools. For saltwater systems, we also monitor salt levels, inspect the chlorine generator cell, and perform salt cell cleanings as needed.",
  },
  {
    id: "5",
    question: "How do billing and payments work?",
    answer:
      "We keep billing simple and transparent. You'll receive a monthly invoice with a clear breakdown. We accept credit cards and ACH payments, and there are no hidden fees or long-term contracts. You can cancel anytime with 30 days notice.",
  },
  {
    id: "6",
    question: "How fast can you start service?",
    answer:
      "Most new customers are scheduled within 3 to 5 business days. We'll start with an initial assessment of your pool, set your weekly service day, and begin regular visits right away. If your pool needs extra attention first, we'll let you know during the assessment.",
  },
];
