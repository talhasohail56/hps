import type { ServiceArea } from "./areas";

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface NeighborhoodDetail {
  name: string;
  description: string;
}

export interface CityTestimonial {
  name: string;
  quote: string;
}

export interface CityContent {
  /** Matches ServiceArea.id */
  id: string;
  /** SEO title tag */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;
  /** H1 for the page */
  headline: string;
  /** Intro paragraph under H1 */
  intro: string;
  /** "Why [City] Residents Choose Hydra" section */
  whyChoose: string;
  /** Bullet points for the why-choose section */
  whyChooseBullets: string[];
  /** Neighborhoods / communities we serve */
  neighborhoods: string[];
  /** City-specific FAQs */
  faqs: CityFAQ[];
  /** Nearby cities to cross-link */
  nearbyCities: string[];
  /** Local pool challenges unique to this city */
  poolChallenges?: string[];
  /** What's included in every visit */
  visitIncludes?: string[];
  /** Neighborhood-specific service notes */
  neighborhoodDetails?: NeighborhoodDetail[];
  /** Reasons homeowners switch to us */
  switchReasons?: string[];
  /** Customer testimonials */
  testimonials?: CityTestimonial[];
}

export const cityContent: Record<string, CityContent> = {
  frisco: {
    id: "frisco",
    metaTitle:
      "Pool Cleaning Service in Frisco, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Frisco's local pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Phillips Creek Ranch, Richwoods, Starwood & all Frisco neighborhoods. Call 214-233-6803.",
    headline: "Pool Service in Frisco, TX",
    intro:
      "Frisco is our home base. As a locally owned pool service company headquartered right here in Frisco, we understand the unique needs of North Texas pools — from the intense summer heat that drives up chlorine demand to the occasional hailstorms that leave debris in your water. Our certified technicians serve neighborhoods across Frisco with weekly pool cleaning, water chemistry management, and equipment inspections that keep your pool swim-ready year-round.",
    whyChoose:
      "Frisco homeowners choose Hydra because we are local, reliable, and transparent. We show up on time every week, include all chemicals in our pricing, and send you a digital report with photos after every visit. No long-term contracts, no hidden fees — just crystal-clear water and peace of mind.",
    whyChooseBullets: [
      "Headquartered in Frisco — fastest response times in the area",
      "All chemicals included in every service plan",
      "Digital visit reports with photos after each service",
      "No long-term contracts — cancel anytime with 30 days notice",
      "Free first 2 weeks for new customers",
    ],
    neighborhoods: [
      "Phillips Creek Ranch",
      "Richwoods",
      "Plantation Resort",
      "Starwood",
      "Newman Village",
      "Hollyhock",
      "Lawler Park",
      "Grayhawk",
      "Lebanon Road area",
      "Frisco Lakes",
    ],
    poolChallenges: [
      "Frisco's pool maintenance challenges are unique to North Texas. The municipal water supply from NTMWD carries 150–250 ppm calcium hardness at the tap, and through summer evaporation cycles, that calcium concentrates in your pool — depositing white scale on tile, roughening plaster surfaces, and coating salt cell plates until they stop producing chlorine. A pool service that doesn't actively monitor and manage calcium is letting your surfaces and equipment degrade week by week.",
      "The sun is the other constant challenge. With 230+ sunny days per year, ultraviolet radiation destroys free chlorine faster than most homeowners realize. A pool that tests at 3 ppm chlorine in the morning can drop to 0.5 ppm by mid-afternoon without adequate cyanuric acid protection. This is why pools in Phillips Creek Ranch and Richwoods turn green seemingly overnight during July — the chlorine disappeared faster than it was being replaced, and algae took the opportunity.",
      "Beneath the surface, Frisco's expansive clay soil creates a slower but more expensive problem. The clay swells when wet and contracts when dry, and this seasonal cycle stresses pool shells, cracks decks, separates coping from the beam, and shifts buried plumbing at the joints. A technician who sees your pool every week notices the early warning signs — a new hairline crack, a slight gap at the coping — before they become structural repairs costing thousands.",
      "Then there's pollen season. From March through May, Frisco's mature oak and pecan trees blanket every outdoor surface with yellow-green pollen. Your skimmer can't keep up, your filter clogs faster, and the organic load from decomposing pollen drives up chlorine demand at exactly the time when UV loss is also increasing. Weekly service during pollen season means aggressive skimming, more frequent filter cleaning, and chemistry adjustments that account for the elevated demand.",
    ],
    visitIncludes: [
      "Every weekly visit follows the same comprehensive routine — no shortcuts, no skipped steps, regardless of whether anyone swam that week. We start by testing the water chemistry: free chlorine, pH, alkalinity, and cyanuric acid. We don't estimate — we measure, calculate the exact dose needed, and add it on the spot. All chemicals are included in your monthly rate, so you never buy a jug of chlorine or a bottle of acid.",
      "We then clean every surface. That means a full skim of the water surface to remove leaves, insects, and pollen. Brushing the walls, steps, floor, and the spots most services skip — behind ladders, around the main drain, under the skimmer lip. Those low-circulation areas are exactly where algae establishes first, and weekly brushing prevents it before it starts. We vacuum any settled debris so the pool floor is clean.",
      "Every visit includes emptying the skimmer basket and pump strainer basket, and checking filter pressure against the baseline we track for your specific filter. When pressure indicates the filter needs cleaning, we handle it — cartridge rinse, backwash, or whatever your filter type requires.",
      "We also inspect your equipment at every visit. We listen to the pump for bearing noise, check for moisture at the shaft seal, verify the pump is priming correctly, and note any changes from the previous week. We check the heater, salt cell output, and automation system. Problems caught at week one cost $100 to fix. The same problems discovered at month six cost $1,500. This weekly inspection is the difference between maintenance and emergency repair.",
      "After every visit, you receive a digital service report with photos showing what was done, what was found, and the current condition of your pool. You never wonder whether we showed up or what state the pool is in.",
    ],
    neighborhoodDetails: [
      {
        name: "Phillips Creek Ranch & Richwoods",
        description: "Phillips Creek Ranch and Richwoods feature some of Frisco's most impressive custom pools — oversized shells with raised spas, water features, fire features, and premium pebble or quartz finishes. Many of these pools run Pentair IntelliCenter or Hayward OmniLogic automation systems that require a technician who understands the programming, not just the chemistry. We manage the full system — pump speed schedules, heater cycling, salt cell output, and lighting programs — as part of weekly service.",
      },
      {
        name: "Starwood & Newman Village",
        description: "Starwood and Newman Village have mature tree canopies that create significant leaf loads, particularly during October through December. Pools in these neighborhoods need more aggressive skimming and filter cleaning during fall than pools in newer developments. Several properties also have equipment that's 10–15 years old, approaching end of life. We track each component's condition and alert homeowners when replacement is coming — so it's a planned expense, not a Saturday emergency.",
      },
      {
        name: "Plantation Resort & Grayhawk",
        description: "Plantation Resort and Grayhawk represent Frisco's established residential core — standard pools that benefit most from consistent, reliable weekly service. The tree coverage is moderate, the equipment is generally mid-life, and the water chemistry responds predictably to regular attention. These are the pools where consistency matters most — showing up every week, maintaining the same chemical balance, and keeping the filter clean prevents 90% of problems.",
      },
      {
        name: "Hollyhock & Lawler Park",
        description: "Hollyhock and Lawler Park are among Frisco's newest communities, with pools that are often less than three years old. New pool plaster goes through a curing period that lasts 6–12 months, during which the surface releases calcium hydroxide into the water, driving pH upward aggressively. We adjust our service protocol for new pools — more frequent acid additions, specific brushing schedules during the first weeks, and careful monitoring of calcium levels during the curing window.",
      },
      {
        name: "Lebanon Road & Frisco Lakes",
        description: "Lebanon Road area and Frisco Lakes include a mix of pool ages and equipment configurations. Some properties still run older single-speed pumps that consume $80–120 per month in electricity. We help homeowners in these neighborhoods plan and execute the transition to variable speed pumps — an upgrade that pays for itself within two years through electricity savings of $500–800 annually.",
      },
    ],
    switchReasons: [
      "Most of our Frisco customers came from another pool service. The reasons they switched follow a pattern. The most common complaint is communication — or the lack of it. Their previous service showed up (sometimes), did something (presumably), and left no evidence of what was done or what condition the pool was in. We send a timestamped digital report with photos after every single visit. You see exactly what happened, what was found, and what your pool looks like — every week, without asking.",
      "The second reason is hidden costs. Some pool services advertise a low monthly rate, then charge separately for every chemical addition — shock, acid, stabilizer, algaecide. By the end of the month, the bill is 40–60% higher than the quoted price. We include all chemicals in every plan. The price on your invoice is the price you agreed to. No surprise line items, no seasonal surcharges, no chemical upcharges.",
      "The third reason is depth of service. Their previous company cleaned — they skimmed, they vacuumed, they added chlorine. But they didn't maintain. They didn't track filter pressure over weeks to spot a declining cartridge. They didn't notice the pump bearings getting louder. They didn't catch the slow leak at the equipment pad fitting. We inspect equipment, monitor trends, and flag issues before they become emergencies. That's the difference between a cleaning service and a maintenance service.",
      "The fourth reason is repair capability. When something broke, their previous service said 'call a repair company.' We handle repairs in-house. The same technician who knows your pool's equipment, its history, and its quirks is the one who diagnoses and fixes the problem. No explaining your setup to a stranger. No waiting for a separate company to schedule a visit. One team, one relationship, complete service.",
    ],
    faqs: [
      {
        question: "How much does weekly pool service cost in Frisco?",
        answer:
          "Weekly service starts at $179/mo, bi-weekly from $139/mo, and Premium Care is $229/mo. All chemicals are included in every plan — no separate charges.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes. Every plan includes all chemicals — chlorine, acid, stabilizer, salt, everything. We never charge separately for chemicals.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled. Since Frisco is our home base, we can typically start within a few days.",
      },
      {
        question: "Do you service saltwater pools?",
        answer:
          "Yes, all brands. We clean cells, monitor salt levels, adjust output by season, and diagnose errors.",
      },
      {
        question: "What areas in Frisco do you serve?",
        answer:
          "Every neighborhood — Phillips Creek Ranch, Richwoods, Starwood, Newman Village, Plantation Resort, Hollyhock, Lawler Park, Grayhawk, and all surrounding communities.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house. The same technician who maintains your pool diagnoses and fixes equipment issues — no outside contractors.",
      },
      {
        question: "Do you offer one-time cleanings?",
        answer:
          "Yes, plus green pool recovery and post-storm cleanups. We recommend weekly service after to keep it clear permanently.",
      },
      {
        question: "What makes you different from other pool services?",
        answer:
          "Communication (photo reports every visit), transparency (all chemicals included), and expertise (we maintain and repair, not just clean).",
      },
    ],
    testimonials: [
      { name: "Taarushi S.", quote: "They communicate so well, which is the best part. Prices haven't increased and they're consistent and good at what they do. I don't have to worry about my pool anymore which is amazing!!" },
      { name: "Sarah K.", quote: "One of the best services in Frisco with reasonable charges." },
      { name: "Zee S.", quote: "Very happy with their service. No ripping off intention - very honest, sincere and timely. Definitely recommend these folks." },
      { name: "Kara P.", quote: "Their team is professional, reliable, and always goes above and beyond." },
      { name: "Essa S.", quote: "These guys are the most reliable and very helpful. I've had a handful of other companies but these guys are easily the best." },
    ],
    nearbyCities: ["plano", "prosper", "mckinney", "little-elm", "the-colony"],
  },

  plano: {
    id: "plano",
    metaTitle:
      "Pool Service in Plano, TX | Weekly Pool Cleaning | Hydra Pool Services",
    metaDescription:
      "Trusted pool service in Plano, TX. Weekly cleaning, water chemistry, and equipment inspections starting at $139/mo. Serving West Plano, Willow Bend & Legacy. Call (214) 233-6803.",
    headline: "Pool Service in Plano, TX",
    intro:
      "Plano homeowners deserve a pool that is always ready for a swim. Hydra Pool Services provides professional weekly pool cleaning and maintenance across West Plano, the Legacy corridor, and surrounding communities. With hot Texas summers pushing pool chemistry to its limits, our technicians ensure your water stays balanced, your equipment runs efficiently, and your pool surfaces stay clean week after week.",
    whyChoose:
      "Plano residents trust Hydra because we combine professionalism with a personal touch. Our technicians know the specific challenges Plano pools face — from high calcium hardness in the local water to heavy tree debris in established neighborhoods. We adjust our service to your pool's unique needs.",
    whyChooseBullets: [
      "Serving West Plano, Willow Bend, Deerfield, and Legacy communities",
      "Weekly chemical testing and professional-grade balancing",
      "Equipment inspections every visit to catch issues early",
      "Flexible plans — bi-weekly, weekly, or Premium Care",
      "No surprise fees — chemicals included in every plan",
    ],
    neighborhoods: [
      "Willow Bend",
      "Deerfield",
      "Legacy area",
      "Kings Ridge",
      "Lakeside on Preston",
      "Glenlake Park",
      "Shaddock Creek Estates",
      "Castle Hills",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Plano, TX?",
        answer:
          "Pool service in Plano starts at $139/month for bi-weekly service and $179/month for weekly cleaning. Our Premium Care plan at $229/month includes priority scheduling and equipment repair support. All chemicals are included.",
      },
      {
        question: "Do you service pools in West Plano?",
        answer:
          "Yes. We serve all of West Plano including Willow Bend, Deerfield, Kings Ridge, and the Legacy corridor. Our Frisco headquarters is just minutes away for fast service.",
      },
      {
        question: "What pool services do you offer in Plano?",
        answer:
          "We offer weekly pool cleaning, water chemistry management, equipment inspections, filter cleaning, bead blasting, pool repairs, and chemical-only service plans throughout Plano, TX.",
      },
      {
        question: "Do you handle pool repairs in Plano?",
        answer:
          "Yes. Our technicians handle pump repairs, filter replacements, heater diagnostics, plumbing fixes, and automation system repairs for Plano pool owners.",
      },
    ],
    testimonials: [
      { name: "Kathleen N.", quote: "Their service was amazing and they are super communicative and knowledgeable!!" },
      { name: "Jasmine R.", quote: "Absolutely love! 100% recommend if you need to have your pool cleaned!" },
      { name: "Nadeem S.", quote: "Dedication, commitment to quality, and consistent service. Beats the competition by miles." },
    ],
    nearbyCities: ["frisco", "allen", "mckinney", "richardson", "murphy"],
  },

  mckinney: {
    id: "mckinney",
    metaTitle:
      "Pool Service in McKinney, TX | Pool Cleaning & Maintenance | Hydra Pool Services",
    metaDescription:
      "Professional pool service in McKinney, TX. Serving Stonebridge Ranch, Craig Ranch & more. Weekly cleaning starting at $139/mo. Call (214) 233-6803 for a free quote.",
    headline: "Pool Service in McKinney, TX",
    intro:
      "McKinney is one of the fastest-growing cities in Texas, and with new homes come new pools that need expert care. Hydra Pool Services brings professional pool maintenance to McKinney's master-planned communities including Stonebridge Ranch, Craig Ranch, and beyond. Whether you have a new build or an established pool, our weekly service keeps your water safe, clean, and crystal clear.",
    whyChoose:
      "McKinney pool owners choose Hydra for consistent, reliable service they can count on. We understand that McKinney's rapid growth means many homeowners are first-time pool owners. Our team takes the time to educate you on your pool system while delivering professional weekly care.",
    whyChooseBullets: [
      "Experienced with new-build pools and established systems alike",
      "Weekly service visits with full chemical testing",
      "Equipment inspections to protect your pool investment",
      "First-time pool owner education through our Pool School program",
      "Free pool assessment before starting service",
    ],
    neighborhoods: [
      "Stonebridge Ranch",
      "Craig Ranch",
      "Adriatica Village",
      "Tucker Hill",
      "Trinity Falls",
      "Erwin Park area",
      "Eldorado Parkway corridor",
    ],
    faqs: [
      {
        question: "How much does pool cleaning cost in McKinney, TX?",
        answer:
          "Pool cleaning in McKinney starts at $139/month for bi-weekly service. Weekly service is $179/month and Premium Care with equipment support is $229/month. All chemicals are included in every plan.",
      },
      {
        question:
          "Do you service pools in Stonebridge Ranch and Craig Ranch?",
        answer:
          "Yes. Stonebridge Ranch and Craig Ranch are two of our most active service areas in McKinney. We provide weekly cleaning, chemical balancing, and maintenance to many homes in both communities.",
      },
      {
        question: "Are you available for new-build pool maintenance?",
        answer:
          "Absolutely. Many McKinney homeowners with newly built pools rely on us for startup care. We handle initial chemical balancing, filter system setup, and ongoing weekly maintenance.",
      },
      {
        question: "Do you offer pool repair services in McKinney?",
        answer:
          "Yes. We handle pump repairs, filter replacements, heater issues, plumbing fixes, and more throughout McKinney, TX. Repairs are available as needed or included in our Premium Care plan.",
      },
    ],
    testimonials: [
      { name: "Lauren E.", quote: "Best prices, they always reply to any problems and are very honest and straightforward." },
      { name: "Haja M.", quote: "Fantastic pool service for 2 years!" },
      { name: "Mary F.", quote: "They are efficient, knowledgeable, and very kind! 100% recommend!" },
    ],
    nearbyCities: ["frisco", "allen", "prosper", "plano", "celina"],
  },

  prosper: {
    id: "prosper",
    metaTitle:
      "Pool Service in Prosper, TX | Pool Cleaning & Care | Hydra Pool Services",
    metaDescription:
      "Professional pool service in Prosper, TX. Serving Windsong Ranch, Star Trail & surrounding communities. Weekly cleaning from $139/mo. Call (214) 233-6803.",
    headline: "Pool Service in Prosper, TX",
    intro:
      "Prosper's master-planned communities feature some of the most beautiful residential pools in North Texas. Hydra Pool Services provides premium pool cleaning and maintenance to Prosper homeowners who want their backyard oasis to stay in perfect condition. From Windsong Ranch to Star Trail, our weekly service ensures your pool water is balanced, your surfaces are clean, and your equipment runs at peak performance.",
    whyChoose:
      "Prosper homeowners expect a higher standard — and that is exactly what Hydra delivers. Our technicians treat every pool with care, providing detailed service reports and proactive equipment checks that prevent costly surprises down the road.",
    whyChooseBullets: [
      "Specialized in premium residential pools in master-planned communities",
      "Proactive equipment monitoring to prevent breakdowns",
      "All chemicals included — no hidden charges",
      "Digital service reports with photos after every visit",
      "Quick response times from our nearby Frisco headquarters",
    ],
    neighborhoods: [
      "Windsong Ranch",
      "Star Trail",
      "Whittler's Ridge",
      "Prosper Lakes",
      "Gentle Creek",
      "Light Farms (bordering Celina)",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Prosper, TX?",
        answer:
          "Pool service in Prosper starts at $139/month for bi-weekly cleaning and $179/month for weekly service. Our Premium Care plan at $229/month includes equipment support and priority scheduling.",
      },
      {
        question: "Do you serve Windsong Ranch in Prosper?",
        answer:
          "Yes. Windsong Ranch is one of our core service areas in Prosper. We provide weekly pool cleaning, chemical balancing, and equipment inspections to numerous homes in the community.",
      },
      {
        question: "Can you maintain a pool with a spa or water features?",
        answer:
          "Absolutely. Many Prosper pools include spas, waterfalls, and other water features. Our technicians are experienced with complex pool systems and ensure all components receive proper care.",
      },
      {
        question: "Do you provide service year-round in Prosper?",
        answer:
          "Yes. Pool care is needed year-round in North Texas. We provide seasonal adjustments to our service including winterization preparation and spring startup to keep your pool protected.",
      },
    ],
    testimonials: [
      { name: "Aiza M.", quote: "Consistent, helpful people. No regrets! Go with them!" },
      { name: "Taha K.", quote: "One of the best in town. Service was fast and very easy to communicate with." },
      { name: "Zarreen A.", quote: "Very professional and knowledgeable folks with affordability and easy accessibility." },
    ],
    nearbyCities: ["frisco", "celina", "mckinney", "little-elm"],
  },

  "little-elm": {
    id: "little-elm",
    metaTitle:
      "Pool Service in Little Elm, TX | Pool Maintenance | Hydra Pool Services",
    metaDescription:
      "Reliable pool service in Little Elm, TX. Weekly cleaning, chemical balancing & equipment care starting at $139/mo. Serving lakeside communities. Call (214) 233-6803.",
    headline: "Pool Service in Little Elm, TX",
    intro:
      "Little Elm's lakeside communities feature pools that face unique challenges — from increased debris due to proximity to Lake Lewisville to the higher humidity that affects water chemistry. Hydra Pool Services understands these local conditions and provides tailored weekly pool maintenance that keeps Little Elm pools clean, balanced, and safe for your family.",
    whyChoose:
      "Little Elm pool owners choose Hydra because we understand the specific challenges of maintaining pools near the lake. Our technicians adjust chemical treatments for local water conditions and manage seasonal debris that lakeside properties experience.",
    whyChooseBullets: [
      "Experience with lakeside pool maintenance and debris management",
      "Chemical adjustments for local water conditions",
      "Weekly or bi-weekly service options",
      "All chemicals included in every plan",
      "Serving all Little Elm neighborhoods",
    ],
    neighborhoods: [
      "Lakewood Village",
      "Sunset Pointe",
      "Eldorado",
      "The Tribute",
      "Paloma Creek",
      "Union Park",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Little Elm, TX?",
        answer:
          "Pool service in Little Elm starts at $139/month for bi-weekly cleaning. Weekly service is $179/month and Premium Care is $229/month. All chemicals are included.",
      },
      {
        question: "Do lakeside pools need more maintenance?",
        answer:
          "Pools near Lake Lewisville can experience more debris, higher humidity, and different water chemistry. We adjust our service to handle these conditions and keep your pool in great shape year-round.",
      },
      {
        question: "Do you service The Tribute in Little Elm?",
        answer:
          "Yes. We provide weekly pool cleaning and maintenance to homeowners in The Tribute and throughout Little Elm, TX.",
      },
      {
        question: "Can you start service this week in Little Elm?",
        answer:
          "Most new customers in Little Elm are scheduled within 3-5 business days. We start with a complimentary pool assessment before beginning regular service.",
      },
    ],
    nearbyCities: ["frisco", "the-colony", "prosper", "celina"],
  },

  "the-colony": {
    id: "the-colony",
    metaTitle:
      "Pool Service in The Colony, TX | Pool Cleaning | Hydra Pool Services",
    metaDescription:
      "Professional pool service in The Colony, TX near Lake Lewisville. Weekly cleaning & chemical balancing starting at $139/mo. Call (214) 233-6803 for a free quote.",
    headline: "Pool Service in The Colony, TX",
    intro:
      "The Colony sits along the shores of Lake Lewisville, and the area's pools benefit from — and are challenged by — the local climate and environment. Hydra Pool Services provides consistent, reliable pool maintenance to The Colony homeowners, handling everything from weekly cleaning and chemical balancing to equipment inspections and repairs. Our goal is simple: keep your pool crystal clear so you can enjoy it without the hassle.",
    whyChoose:
      "The Colony residents choose Hydra for our reliability and attention to detail. We handle the heavy lifting so you can focus on enjoying your pool. Our technicians are trained to spot potential issues during every visit, saving you from expensive repair bills.",
    whyChooseBullets: [
      "Reliable weekly service — we show up rain or shine",
      "Proactive equipment checks to catch problems early",
      "Transparent pricing with no hidden fees",
      "Experienced with both residential and HOA pools",
      "Serving communities near Lake Lewisville",
    ],
    neighborhoods: [
      "Austin Waters",
      "Stewart Peninsula",
      "Cascades at The Colony",
      "Tribute Lakeside",
      "The Village at The Colony",
    ],
    faqs: [
      {
        question: "How much does pool cleaning cost in The Colony, TX?",
        answer:
          "Pool cleaning in The Colony starts at $139/month for bi-weekly service. Weekly cleaning is $179/month and Premium Care with equipment support is $229/month. All chemicals are included.",
      },
      {
        question: "Do you service HOA pools in The Colony?",
        answer:
          "Yes. We provide commercial pool maintenance for HOAs, apartment complexes, and community pools throughout The Colony. Contact us for a custom commercial quote.",
      },
      {
        question: "What areas of The Colony do you serve?",
        answer:
          "We serve all neighborhoods in The Colony including Austin Waters, Stewart Peninsula, Cascades, and communities near Lake Lewisville.",
      },
      {
        question: "Do you offer emergency pool repairs in The Colony?",
        answer:
          "Yes. We offer responsive pool repair services for equipment failures, plumbing issues, and other urgent pool problems throughout The Colony, TX.",
      },
    ],
    testimonials: [
      { name: "Rajeel R.", quote: "They know what they're doing and have great customer service. Highly recommended!" },
      { name: "Alina", quote: "Service was easy and very helpful. They did a great job!" },
      { name: "Lindsey P.", quote: "Great company! And great people!" },
    ],
    nearbyCities: ["frisco", "little-elm", "plano", "richardson"],
  },

  allen: {
    id: "allen",
    metaTitle:
      "Pool Service in Allen, TX | Pool Maintenance & Cleaning | Hydra Pool Services",
    metaDescription:
      "Trusted pool service in Allen, TX. Serving Twin Creeks, Montgomery Farm & more. Weekly cleaning from $139/mo. All chemicals included. Call (214) 233-6803.",
    headline: "Pool Service in Allen, TX",
    intro:
      "Allen is home to established neighborhoods with beautiful pools that deserve expert care. Hydra Pool Services provides weekly pool cleaning and maintenance to Allen homeowners, from Twin Creeks to Montgomery Farm and beyond. Our technicians keep your water chemistry balanced, your pool surfaces clean, and your equipment running smoothly — so your pool is always ready for family and friends.",
    whyChoose:
      "Allen pool owners trust Hydra because we deliver consistent, high-quality service every single week. Our team is familiar with Allen's neighborhoods and the specific pool types common in the area, from basic residential pools to more complex systems with spas and water features.",
    whyChooseBullets: [
      "Consistent weekly service you can count on",
      "Familiar with pool systems common in Allen neighborhoods",
      "Chemicals included in every service plan",
      "Equipment inspections to extend the life of your pool",
      "Flexible scheduling and no long-term contracts",
    ],
    neighborhoods: [
      "Twin Creeks",
      "Montgomery Farm",
      "The Retreat at Twin Creeks",
      "Ridgeview",
      "Waterford Parks",
      "Allen Station",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Allen, TX?",
        answer:
          "Pool service in Allen starts at $139/month for bi-weekly cleaning. Weekly service is $179/month and Premium Care with equipment support is $229/month. All chemicals are included in every plan.",
      },
      {
        question: "Do you serve Twin Creeks and Montgomery Farm?",
        answer:
          "Yes. Twin Creeks and Montgomery Farm are among our most active service areas in Allen. We provide weekly cleaning, chemical balancing, and equipment inspections in both neighborhoods.",
      },
      {
        question: "Can I switch from bi-weekly to weekly service?",
        answer:
          "Absolutely. You can upgrade or downgrade your service plan at any time. Many Allen customers start with bi-weekly and switch to weekly once they see the difference consistent care makes.",
      },
      {
        question: "Do you offer pool school in Allen?",
        answer:
          "Yes. Our Pool School program is available to Allen homeowners. It is a one-hour hands-on class that teaches you pool care basics, water chemistry, and seasonal maintenance.",
      },
    ],
    testimonials: [
      { name: "Sultan S.", quote: "I have been using their services for 2+ years and am very happy with the quality of service and professionalism." },
      { name: "Ongo G.", quote: "I recently moved into a house with a neglected pool. These guys came and took a look at it for me. Couldn't be happier." },
      { name: "Macy L.", quote: "Incredible, reliable service. Best pool services around. Would highly recommend." },
    ],
    nearbyCities: ["mckinney", "plano", "frisco", "murphy", "richardson"],
  },

  celina: {
    id: "celina",
    metaTitle:
      "Pool Service in Celina, TX | Pool Cleaning & Maintenance | Hydra Pool Services",
    metaDescription:
      "Professional pool service in Celina, TX. Serving Light Farms & growing communities. Weekly pool cleaning from $139/mo. Call (214) 233-6803 for a free quote.",
    headline: "Pool Service in Celina, TX",
    intro:
      "Celina is one of the fastest-growing cities in North Texas, with new neighborhoods and pools being built at a rapid pace. Hydra Pool Services brings professional weekly pool maintenance to Celina homeowners, from Light Farms to the newest developments. Whether your pool is brand new or a few years old, our team ensures it stays clean, safe, and perfectly balanced.",
    whyChoose:
      "As Celina grows, so does our presence. Hydra is already serving homeowners throughout Celina's newest communities, and our proximity from Frisco means fast response times and reliable weekly visits. We specialize in new-build pools and help first-time pool owners understand their systems.",
    whyChooseBullets: [
      "Experienced with new construction and startup pool care",
      "Growing presence in Celina's expanding communities",
      "First-time pool owner support and Pool School available",
      "All chemicals included — no hidden costs",
      "Fast service from our nearby Frisco headquarters",
    ],
    neighborhoods: [
      "Light Farms",
      "Cambridge Crossing",
      "Mustang Lakes",
      "Carter Ranch",
      "Legacy Hills",
      "Downtown Celina area",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Celina, TX?",
        answer:
          "Pool service in Celina starts at $139/month for bi-weekly service and $179/month for weekly cleaning. Premium Care with equipment support is $229/month. All chemicals are included.",
      },
      {
        question: "Do you service Light Farms in Celina?",
        answer:
          "Yes. Light Farms is one of our growing service areas in Celina. We provide weekly pool cleaning, chemical balancing, and equipment maintenance to homeowners throughout the community.",
      },
      {
        question: "Can you set up maintenance for a newly built pool?",
        answer:
          "Absolutely. We specialize in new-build pool startups. We handle initial water fill chemistry, filter system setup, and ongoing weekly maintenance from day one.",
      },
      {
        question: "Is Celina too far for regular service?",
        answer:
          "Not at all. Our Frisco headquarters is just minutes from Celina. We provide consistent weekly and bi-weekly service to Celina homeowners with the same reliability as our Frisco customers.",
      },
    ],
    nearbyCities: ["prosper", "frisco", "mckinney"],
  },

  murphy: {
    id: "murphy",
    metaTitle:
      "Pool Service in Murphy, TX | Pool Cleaning & Care | Hydra Pool Services",
    metaDescription:
      "Reliable pool service in Murphy, TX. Weekly pool cleaning, chemical balancing & equipment inspections starting at $139/mo. Call (214) 233-6803 for a free quote.",
    headline: "Pool Service in Murphy, TX",
    intro:
      "Murphy may be one of the smaller cities in Collin County, but its pools deserve the same professional care as any neighborhood in DFW. Hydra Pool Services provides reliable weekly pool maintenance to Murphy homeowners, keeping your water crystal clear, your chemicals perfectly balanced, and your equipment in top condition. We treat every pool like our own.",
    whyChoose:
      "Murphy pool owners appreciate our attention to detail and personal service. In a close-knit community like Murphy, reputation matters — and ours is built on showing up every week, doing the job right, and being transparent about everything we do.",
    whyChooseBullets: [
      "Personal, community-focused service",
      "Consistent weekly visits with no excuses",
      "Full chemical testing and balancing every visit",
      "Equipment inspections to prevent costly repairs",
      "No contracts — flexible month-to-month service",
    ],
    neighborhoods: [
      "Maxwell Creek",
      "Southgate",
      "Murphy Heights",
      "Mustang Park",
      "Murphy Marketplace area",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Murphy, TX?",
        answer:
          "Pool service in Murphy starts at $139/month for bi-weekly cleaning. Weekly service is $179/month and Premium Care with equipment support is $229/month. All chemicals are included in every plan.",
      },
      {
        question: "How often should I have my pool cleaned in Murphy?",
        answer:
          "We recommend weekly service for the best results, especially during the hot Texas summer months. Bi-weekly service works for pools with lower usage or during the cooler season.",
      },
      {
        question: "Do you service both chlorine and saltwater pools in Murphy?",
        answer:
          "Yes. We service both traditional chlorine and saltwater pool systems in Murphy. For saltwater pools, we also monitor salt levels and clean the generator cell.",
      },
      {
        question: "Can you fix pool equipment issues in Murphy?",
        answer:
          "Yes. We handle pump repairs, filter replacements, heater diagnostics, and other equipment repairs for Murphy pool owners. Our Premium Care plan includes equipment repair support.",
      },
    ],
    testimonials: [
      { name: "Raissa A.", quote: "Super reliable! And their prices are great. 10/10 recommend." },
      { name: "Aaron F.", quote: "They are very knowledgeable on pool systems and were very helpful." },
      { name: "Riya S.", quote: "Super efficient, informative, and helpful." },
    ],
    nearbyCities: ["plano", "allen", "richardson"],
  },

  richardson: {
    id: "richardson",
    metaTitle:
      "Pool Service in Richardson, TX | Pool Maintenance | Hydra Pool Services",
    metaDescription:
      "Professional pool service in Richardson, TX. Serving Canyon Creek & North Richardson. Weekly cleaning from $139/mo. All chemicals included. Call (214) 233-6803.",
    headline: "Pool Service in Richardson, TX",
    intro:
      "Richardson has some of the most established neighborhoods in the DFW area, and many homes feature pools that have been enjoyed for years. Hydra Pool Services provides expert weekly pool maintenance to North Richardson homeowners, handling everything from chemical balancing to equipment care. Whether your pool is decades old or newly renovated, we keep it running at its best.",
    whyChoose:
      "Richardson homeowners trust Hydra because we understand older pools just as well as new ones. Many Richardson pools have aging equipment that needs extra attention — our technicians spot wear and tear during routine visits and help you plan repairs before emergencies happen.",
    whyChooseBullets: [
      "Experienced with established and aging pool systems",
      "Proactive equipment monitoring during every visit",
      "Complete chemical testing and balancing included",
      "Repair services available for pumps, heaters, and filters",
      "Flexible plans with no long-term commitments",
    ],
    neighborhoods: [
      "Canyon Creek",
      "Cottonwood Heights",
      "Sherrill Park area",
      "Prairie Creek",
      "Reservation",
      "North Richardson",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Richardson, TX?",
        answer:
          "Pool service in Richardson starts at $139/month for bi-weekly cleaning. Weekly service is $179/month and Premium Care is $229/month. All chemicals are included in every plan.",
      },
      {
        question: "Do you service older pools in Richardson?",
        answer:
          "Yes. Many Richardson pools are well-established, and we have extensive experience maintaining and repairing older pool systems. Our technicians monitor aging equipment and help you plan upgrades when needed.",
      },
      {
        question: "Do you serve Canyon Creek in Richardson?",
        answer:
          "Yes. Canyon Creek is one of our active service areas in Richardson. We provide weekly pool cleaning, chemical balancing, and equipment inspections throughout the neighborhood.",
      },
      {
        question: "Can you renovate or remodel an older pool in Richardson?",
        answer:
          "Yes. We offer pool remodeling services including tile replacement, surface refinishing, and equipment upgrades. Contact us for a free assessment and quote.",
      },
    ],
    nearbyCities: ["plano", "murphy", "allen"],
  },
};
