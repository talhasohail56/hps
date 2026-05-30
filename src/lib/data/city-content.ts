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
      "Pool Cleaning Frisco TX | 4.9 Stars, 47 Reviews | Free Trial",
    metaDescription:
      "Weekly pool cleaning in Frisco starting at $129/mo. All chemicals included, no contract. Serving Starwood, Phillips Creek, Richwoods, and all Frisco. First 2 weeks free.",
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
    nearbyCities: ["plano", "prosper", "mckinney", "the-colony", "parker"],
  },

  plano: {
    id: "plano",
    metaTitle:
      "Pool Cleaning Service in Plano, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Plano pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Willow Bend, Deerfield, Kings Ridge & all Plano neighborhoods. Call 214-233-6803.",
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
    poolChallenges: [
      "Plano's municipal water from NTMWD carries moderate calcium hardness at 150–250 ppm — not as extreme as Parker's well water, but high enough to cause persistent scaling on pool tile, plaster, and salt cell plates over time. Through summer evaporation cycles, calcium concentrates and deposits white scale on the waterline tile that becomes progressively harder to remove. We monitor calcium levels monthly and manage them proactively so the buildup never reaches the point where bead blasting is the only solution.",
      "The Preston Road corridor and neighborhoods east of 75 sit on some of Plano's most active clay soil. Seasonal expansion and contraction cycles stress pool shells, crack decks, and shift coping away from the beam. Pools built in the early 2000s in Deerfield and Kings Ridge are now 20+ years old — the age where soil movement damage becomes visible as hairline cracks in the shell, deck separation, and plumbing joint failures. We inspect for these signs every week and flag them early.",
      "Plano's mature tree canopy — particularly live oaks, pecans, and red oaks — produces heavy leaf loads from October through December and intense pollen through March and April. Pools in West Plano near Willow Bend and the Legacy area get hit hardest because the tree density is greater than in newer developments. We increase filter cleaning frequency and skimming intensity during these seasons.",
      "Energy costs are a real factor for Plano pool owners. A single-speed pump running 10–12 hours per day during summer adds $80–120 per month to your Oncor electricity bill. We help homeowners plan transitions to variable speed pumps that cut electricity consumption by 70–80%, and we can advise on available Oncor rebates that offset the upgrade cost.",
    ],
    visitIncludes: [
      "Every weekly visit starts with water chemistry testing — free chlorine, pH, alkalinity, and cyanuric acid measured and adjusted on the spot. All chemicals are included in your monthly rate. We don't quote a low price and then charge extra for shock, acid, or stabilizer. The number on your invoice is the number you agreed to.",
      "We clean every surface of the pool. Full skim of the surface to catch leaves, insects, and pollen. Brushing the walls, steps, and floor — including behind ladders, under the skimmer lip, and around fittings where algae establishes first. Vacuuming any settled debris so the floor is spotless.",
      "Filter pressure is checked and logged every visit against your pool's specific baseline. When pressure rises to the cleaning threshold, we handle it — cartridge rinse, backwash, or DE recharge depending on your filter type. We also empty the skimmer basket and pump strainer basket every visit without exception.",
      "Equipment inspection is part of every service call. We listen to the pump for bearing wear, check the shaft seal for moisture, verify priming, inspect the salt cell for scale buildup, and note any changes from the previous week. After every visit, you receive a digital report with photos showing what was done and what condition the pool is in.",
    ],
    neighborhoodDetails: [
      {
        name: "Willow Bend",
        description:
          "Willow Bend is one of Plano's most established pool communities — homes built from the 1990s through early 2000s with mature landscaping and pools that are now 20–25 years old. Equipment in these pools is often approaching or past end of life. We track each component's condition and help homeowners plan replacements as scheduled upgrades rather than emergency scrambles.",
      },
      {
        name: "Deerfield & Kings Ridge",
        description:
          "Deerfield and Kings Ridge feature mid-size residential pools with moderate tree coverage. These neighborhoods sit on active clay soil that causes more deck movement than newer subdivisions. We watch for deck separation, coping shifts, and new cracks that signal soil-related stress on the pool structure.",
      },
      {
        name: "Legacy & Preston Area",
        description:
          "The Legacy and Preston area is home to newer construction with modern pool designs — variable speed pumps, salt chlorine generators, LED lighting, and automation systems. These pools need a technician who understands the technology, not just the chemistry. We program pump schedules, optimize salt cell output, and manage automation settings as part of regular service.",
      },
      {
        name: "Preston Hollow & West Plano",
        description:
          "Preston Hollow and surrounding West Plano neighborhoods have some of the largest residential pools in the DFW area. Larger pools mean more water to treat, more surface to clean, and more equipment to maintain — but the fundamentals are the same. Consistent weekly attention prevents problems regardless of pool size.",
      },
    ],
    switchReasons: [
      "The most common reason Plano homeowners switch to us is inconsistency. Their previous service showed up some weeks and didn't others — with no communication either way. We show up on the same day every week, and after every visit you receive a timestamped photo report. You never wonder whether we came or what we did.",
      "The second reason is hidden chemical charges. Plano has no shortage of pool services quoting $99 or $110 per month for weekly service — then adding $30–50 in chemical surcharges every month. We include all chemicals in every plan. No surprise line items.",
      "The third reason is capability. Their previous service could clean but couldn't diagnose why the pump was making noise, why the salt cell kept showing an error, or why the water wouldn't hold chlorine despite regular additions. We troubleshoot and repair — not just clean.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Plano?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan. No separate charges.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you service saltwater pools?",
        answer:
          "Yes, all brands. We clean cells, monitor salt levels, adjust output by season, diagnose errors.",
      },
      {
        question: "What Plano neighborhoods do you serve?",
        answer:
          "All — Willow Bend, Deerfield, Kings Ridge, Legacy, Preston area, and all surrounding communities.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house. Same technician who maintains your pool.",
      },
      {
        question: "Do you offer one-time cleanings?",
        answer:
          "Yes, plus green pool recovery and post-storm cleanups.",
      },
      {
        question: "What makes you different?",
        answer:
          "Photo reports every visit, all chemicals included, we maintain and repair — not just clean.",
      },
    ],
    testimonials: [
      { name: "Kathleen N.", quote: "Their service was amazing and they are super communicative and knowledgeable!!" },
      { name: "Jasmine R.", quote: "Absolutely love! 100% recommend if you need to have your pool cleaned!" },
      { name: "Nadeem S.", quote: "Dedication, commitment to quality, and consistent service. Beats the competition by miles." },
    ],
    nearbyCities: ["frisco", "allen", "mckinney", "murphy", "parker"],
  },

  mckinney: {
    id: "mckinney",
    metaTitle:
      "Pool Cleaning Service in McKinney, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "McKinney pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Craig Ranch, Stonebridge Ranch, Adriatica & all McKinney. Call 214-233-6803.",
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
    poolChallenges: [
      "McKinney's water sits at the higher end of the North Texas hardness range — consistently 200–300 ppm calcium from the tap. Pools in south McKinney near Craig Ranch and Stonebridge Ranch pull from the same NTMWD supply as Plano, but pools in north McKinney near Adriatica and Tucker Hill may experience slightly different mineral profiles. We test each pool's water individually rather than applying a single chemistry template across the city.",
      "McKinney's rapid growth means pool ages vary dramatically by neighborhood. Craig Ranch and Stonebridge Ranch pools are 10–20 years old with equipment approaching or past end of life. Tucker Hill and Adriatica pools are 5–10 years old and entering mid-life. Brand-new developments on the northern fringe have pools still curing. Each age bracket requires a different service approach — from end-of-life equipment monitoring in mature neighborhoods to plaster curing management in new construction.",
      "North McKinney's elevation and open terrain create more wind exposure than the sheltered neighborhoods closer to US-75. Pools in these areas accumulate debris faster, lose water to evaporation more quickly, and require more aggressive skimming and chemical management during windy spring seasons.",
      "McKinney's clay soil is among the most expansive in Collin County. The seasonal swell-and-shrink cycle is pronounced, and pools built on inadequately prepared soil develop deck cracks, coping separation, and shell stress faster than pools in areas with more stable ground. We document and track structural changes at every visit so homeowners see the progression and can act before minor movement becomes major repair.",
    ],
    visitIncludes: [
      "Every weekly visit covers the complete maintenance checklist — water chemistry testing and adjustment, surface cleaning including brushing and vacuuming, basket emptying, filter pressure monitoring, and a full equipment inspection. All chemicals are included. You never receive a separate bill for chlorine, acid, or stabilizer.",
      "We brush the areas where algae hides — behind ladders, under coping lips, around drain covers, and in low-circulation corners. McKinney's hard water promotes calcium-algae combinations on plaster that are harder to remove than standard green algae. Weekly brushing prevents these deposits from forming.",
      "Equipment gets a thorough check every visit. We track pump bearing condition, filter pressure trends, salt cell output, and heater performance week over week. This longitudinal monitoring catches degradation patterns that a monthly or bi-weekly service would miss entirely.",
      "After every visit, you receive a photo report showing what was done and what your pool looks like. If we found anything that needs attention — rising filter pressure, a new deck crack, a pump bearing getting louder — it's documented in the report with our recommendation.",
    ],
    neighborhoodDetails: [
      {
        name: "Craig Ranch",
        description:
          "Craig Ranch is McKinney's flagship master-planned community with some of the area's most impressive pool installations. Custom pools with spas, fire features, and automation systems are common. Many Craig Ranch pools are 10–15 years old, entering the window where equipment replacement planning becomes critical. We track each component and alert homeowners before failures happen.",
      },
      {
        name: "Stonebridge Ranch",
        description:
          "Stonebridge Ranch pools are among the oldest in McKinney — 15–25 years in some sections. These pools often have original plaster showing wear, aging plumbing joints stressed by decades of soil movement, and equipment that's been replaced once and is approaching its second cycle. We provide honest assessments of what needs attention now versus what can wait.",
      },
      {
        name: "Adriatica & Tucker Hill",
        description:
          "Adriatica and Tucker Hill feature mid-age pools with modern equipment configurations. These neighborhoods have moderate tree coverage and well-maintained landscapes. Pool maintenance is straightforward when done consistently — which is where we excel.",
      },
      {
        name: "North McKinney",
        description:
          "North McKinney developments near Prosper and Celina borders have the newest pools. New plaster, new equipment, and curing chemistry that needs careful management during the first year. We adjust our service protocol for new pool startups with more frequent pH management and specific brushing schedules.",
      },
    ],
    switchReasons: [
      "McKinney homeowners switch to us when they realize their previous service was cleaning without maintaining. Skimming and adding chlorine keeps the water blue this week — but it doesn't catch the pump bearings wearing out, the filter cartridge degrading, or the deck crack widening with each rain cycle. We inspect, monitor, and communicate what we find.",
      "The second reason is chemical transparency. We include everything. No surprise charges, no seasonal upcharges, no line items for shock or acid. Your monthly rate covers all chemicals your pool needs.",
      "The third reason is repair capability. When equipment fails, we diagnose and fix it. The same technician who's been watching your pump every week is the one who tells you the bearings need replacement — with full context of how the sound has changed over the past month. That context leads to better decisions.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in McKinney?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you service saltwater pools?",
        answer:
          "Yes, all brands.",
      },
      {
        question: "What McKinney neighborhoods do you serve?",
        answer:
          "All — Craig Ranch, Stonebridge Ranch, Adriatica, Tucker Hill, and all surrounding areas.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house.",
      },
      {
        question: "Do you offer one-time cleanings?",
        answer:
          "Yes, plus green pool recovery and post-storm cleanups.",
      },
      {
        question: "What makes you different?",
        answer:
          "Weekly equipment monitoring, photo reports every visit, all chemicals included, in-house repairs.",
      },
    ],
    testimonials: [
      { name: "Lauren E.", quote: "Best prices, they always reply to any problems and are very honest and straightforward." },
      { name: "Haja M.", quote: "Fantastic pool service for 2 years!" },
      { name: "Mary F.", quote: "They are efficient, knowledgeable, and very kind! 100% recommend!" },
    ],
    nearbyCities: ["frisco", "allen", "prosper", "plano", "parker"],
  },

  prosper: {
    id: "prosper",
    metaTitle:
      "Pool Cleaning Service in Prosper, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Prosper pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Windsong Ranch, Star Trail, Whitley Place & all Prosper. Call 214-233-6803.",
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
      "Whitley Place",
      "Prosper Lakes",
      "Gentle Creek",
      "Light Farms (bordering Celina)",
    ],
    poolChallenges: [
      "Prosper is one of the fastest-growing cities in Collin County, and that growth means a high concentration of newly built pools. New pool plaster goes through a 6–12 month curing period during which the surface releases calcium hydroxide into the water, driving pH upward aggressively and creating a chalky haze that worries homeowners who don't understand the process. We manage new pool chemistry through the entire curing window — daily brushing recommendations for the first month, frequent acid additions to control pH, and careful calcium monitoring as the plaster stabilizes.",
      "Prosper's master-planned communities — Windsong Ranch, Star Trail, Whitley Place, Gentle Creek — feature some of the most sophisticated pool installations in North DFW. Raised spas with spillovers, sheer descent waterfalls, bubblers, fire features, and full automation systems are standard in many new builds. These pools require a technician who can manage the technology — programming pump speed schedules, optimizing heater cycling, adjusting salt cell output, and troubleshooting automation errors.",
      "HOA standards in Prosper's communities are among the strictest in Collin County. Pool landscaping must be completed within 60–90 days of construction, fencing must meet specific design standards, and pool areas must be maintained to community appearance guidelines. A poorly maintained pool with green water or visible algae can trigger HOA violation notices. We keep pools pristine so homeowners never face compliance issues.",
      "Prosper's clay soil is heavily expansive, and the rapid development in the area means much of the soil was recently disturbed during construction. Newly built pools on freshly graded soil are particularly susceptible to settlement and soil movement in the first 3–5 years. We watch for deck cracks, coping separation, and beam shifts that indicate soil-related movement.",
    ],
    visitIncludes: [
      "Every weekly visit covers chemistry testing, surface cleaning, equipment inspection, and filter monitoring. For Prosper's many new pools, we include additional attention during the plaster curing period — more frequent pH testing, specific brushing guidance, and calcium monitoring that prevents scaling during the critical first year.",
      "We clean every surface thoroughly — skim, brush walls and floor, vacuum debris. Prosper pools with water features like spillovers, sheers, and bubblers need attention to the feature plumbing and fixtures that standard cleaning doesn't cover. We check feature operation and clean nozzles as part of regular service.",
      "Equipment inspection includes the automation system, not just the pump and filter. We verify that scheduled programs are running correctly, salt cell output matches the season, and heater cycling is efficient. For Prosper pools with complex systems, this technology management is as important as the chemistry.",
      "After every visit, you receive a photo report showing the pool condition and any notes about equipment or water quality. For new pool owners in Prosper who are learning their pool's behavior during the first year, these reports are especially valuable — they create a documented history of how the pool responds to each season.",
    ],
    neighborhoodDetails: [
      {
        name: "Windsong Ranch",
        description:
          "Windsong Ranch features premium custom pools with advanced automation, spa spillovers, and resort-style finishes. Many pools run Pentair IntelliCenter or Hayward OmniLogic systems that require programming expertise beyond basic pool maintenance. We manage the full technology stack as part of weekly service.",
      },
      {
        name: "Star Trail",
        description:
          "Star Trail pools represent Prosper's newer construction wave — modern designs with salt systems, variable speed pumps, and LED lighting as standard features. These pools benefit most from consistent weekly service during their first 2–3 years as the plaster cures and the homeowner learns the pool's behavior patterns.",
      },
      {
        name: "Whitley Place & Gentle Creek",
        description:
          "Whitley Place and Gentle Creek have a mix of pool ages — some sections built 8–10 years ago with equipment entering mid-life, others still under construction. We service all ages and configurations, adjusting our approach based on each pool's specific needs and equipment vintage.",
      },
      {
        name: "North Prosper",
        description:
          "Prosper developments north of US-380 are the newest — many with pools that are less than a year old. These pools need careful curing management that most pool services don't understand or don't want to deal with because it requires more frequent attention during the first year.",
      },
    ],
    switchReasons: [
      "Prosper homeowners switch to us when their builder's recommended pool service turns out to be a basic cleaning crew that doesn't understand the automation system, doesn't manage plaster curing chemistry correctly, and can't troubleshoot the technology that came with the pool. We handle all of it — chemistry, cleaning, equipment, and technology.",
      "The second reason is communication. Prosper homeowners with new pools have questions constantly during the first year — Is this haze normal? Why does the pH keep rising? Why is the salt cell showing an error? We answer these questions through our photo reports and direct communication. Your pool service should educate, not just clean.",
      "The third reason is chemical transparency. New pool owners in Prosper are often shocked by the chemical costs their first service charges on top of the monthly rate. We include all chemicals in every plan — the price you see is the price you pay.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Prosper?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you handle new pool startup?",
        answer:
          "Yes. We manage the plaster curing period including pH control, brushing schedules, and calcium monitoring.",
      },
      {
        question: "What Prosper neighborhoods do you serve?",
        answer:
          "All — Windsong Ranch, Star Trail, Whitley Place, Gentle Creek, and all surrounding areas.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house.",
      },
      {
        question: "Do you manage pool automation systems?",
        answer:
          "Yes. Pentair IntelliCenter, Hayward OmniLogic, Jandy iAquaLink — we program, troubleshoot, and optimize all major systems.",
      },
      {
        question: "What makes you different?",
        answer:
          "Automation expertise, new pool curing management, photo reports every visit, all chemicals included, in-house repairs.",
      },
    ],
    testimonials: [
      { name: "Aiza M.", quote: "Consistent, helpful people. No regrets! Go with them!" },
      { name: "Taha K.", quote: "One of the best in town. Service was fast and very easy to communicate with." },
      { name: "Zarreen A.", quote: "Very professional and knowledgeable folks with affordability and easy accessibility." },
    ],
    nearbyCities: ["frisco", "mckinney", "parker", "the-colony"],
  },

  "the-colony": {
    id: "the-colony",
    metaTitle:
      "Pool Cleaning Service in The Colony, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "The Colony pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Austin Waters, Stewart Peninsula, The Tribute & all Colony neighborhoods. Call 214-233-6803.",
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
      "The Tribute",
      "The Village at The Colony",
    ],
    poolChallenges: [
      "The Colony's proximity to Lewisville Lake creates a unique microclimate that affects pool maintenance differently than inland cities. Higher ambient humidity slows evaporation but accelerates corrosion on metal equipment components — electrical connections, bonding conductors, pump housings, and heater cabinets degrade faster in The Colony than in drier cities like Prosper or Parker. We inspect electrical and metal components more carefully on Colony pools because corrosion-related failures are more common here.",
      "The lake environment also harbors cyanobacteria (black algae) that become airborne and settle into nearby pools. Pools in Austin Waters, Stewart Peninsula, and The Tribute are more susceptible to black algae introduction than pools 10 miles inland. Black algae is the most difficult pool algae to treat — it has protective caps and roots that penetrate plaster. We know the treatment protocol and watch for the early signs during every visit.",
      "The Colony's established neighborhoods have pools ranging from 10 to 25 years old. Many are running original equipment — single-speed pumps, aging heaters, salt cells past their rated life, and automation systems that predate smartphone control. We help homeowners evaluate whether to repair or replace aging equipment, with honest assessments based on each component's actual condition rather than age alone.",
      "Soil conditions in The Colony vary significantly by neighborhood. Properties closer to the lake sit on different fill material than properties on the inland side. Some areas experience more ground movement than others, and the resulting stress on pool shells and decks shows up as cracks, settlement, and plumbing joint failures over time. We document structural conditions at every visit.",
    ],
    visitIncludes: [
      "Every weekly visit covers the full maintenance checklist — chemistry testing, surface cleaning, filter monitoring, and equipment inspection. For Colony pools, we add specific attention to metal corrosion points and black algae screening that inland pools don't typically need.",
      "We test free chlorine, pH, alkalinity, and cyanuric acid at every visit and adjust on the spot. All chemicals are included in your monthly rate. Colony pools near the lake often need slightly different chemical approaches than inland pools — higher sanitizer maintenance to counteract the lake-environment biological load, and more attention to metal surfaces.",
      "Surface cleaning includes brushing every wall and floor surface — critical in The Colony where black algae establishes in shaded, low-circulation areas first. Weekly brushing disrupts nascent black algae colonies before they can build the protective cap that makes them resistant to chlorine.",
      "Equipment inspection is especially important on Colony pools where humidity accelerates corrosion. We check electrical connections for oxidation, bonding wires for green corrosion, pump housing bolts for rust, and union fittings for mineral buildup. After every visit, you receive a photo report documenting the pool condition and any observations.",
    ],
    neighborhoodDetails: [
      {
        name: "Austin Waters",
        description:
          "Austin Waters features established homes with pools built in the 2000s and early 2010s. The proximity to Lewisville Lake means higher humidity exposure and greater susceptibility to algae introduction. Equipment in these pools is 10–20 years old — we monitor each component and plan replacements before failures occur.",
      },
      {
        name: "Stewart Peninsula",
        description:
          "Stewart Peninsula sits closest to the lake with the highest humidity exposure of any Colony neighborhood. Pools here experience faster equipment corrosion and more frequent black algae challenges. We adjust our service protocol accordingly — more thorough metal inspections and proactive algae screening.",
      },
      {
        name: "The Tribute",
        description:
          "The Tribute is The Colony's premier community with upscale pool installations including automation, water features, and premium finishes. Many Tribute pools have complex systems that require technology management alongside traditional pool chemistry.",
      },
      {
        name: "Main Street & SH-121 Corridor",
        description:
          "Neighborhoods along Main Street and the SH-121 corridor represent The Colony's mid-development period with a mix of pool ages and equipment configurations. These are standard residential pools that benefit most from consistent, reliable weekly attention.",
      },
    ],
    switchReasons: [
      "Colony homeowners switch to us when their previous service doesn't understand the lake-proximity challenges. Standard pool maintenance works fine 10 miles inland — but Colony pools need adjusted corrosion monitoring, black algae awareness, and humidity-adapted equipment maintenance that generic services don't provide.",
      "The second reason is communication. We send photo reports after every visit showing pool condition and any equipment observations. Colony homeowners who've dealt with surprise equipment failures appreciate knowing that someone is actively monitoring their system.",
      "The third reason is the usual — chemical transparency and repair capability. All chemicals included, no surprise charges. When equipment fails, we handle the repair in-house with full context of the pool's history and condition.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in The Colony?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you handle black algae?",
        answer:
          "Yes. We know the full treatment protocol — stainless steel brushing, direct chlorine application, sustained shock, and follow-up monitoring.",
      },
      {
        question: "What Colony neighborhoods do you serve?",
        answer:
          "All — Austin Waters, Stewart Peninsula, The Tribute, and all surrounding areas.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house.",
      },
      {
        question: "Do you handle equipment corrosion issues?",
        answer:
          "Yes. We inspect electrical and metal components for humidity-related corrosion at every visit.",
      },
      {
        question: "What makes you different?",
        answer:
          "Lake-proximity expertise, black algae treatment capability, corrosion monitoring, photo reports every visit, all chemicals included, in-house repairs.",
      },
    ],
    testimonials: [
      { name: "Rajeel R.", quote: "They know what they're doing and have great customer service. Highly recommended!" },
      { name: "Alina", quote: "Service was easy and very helpful. They did a great job!" },
      { name: "Lindsey P.", quote: "Great company! And great people!" },
    ],
    nearbyCities: ["frisco", "plano", "prosper", "allen"],
  },

  allen: {
    id: "allen",
    metaTitle:
      "Pool Cleaning Service in Allen, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Allen pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Twin Creeks, Montgomery Farm, Watters Creek & all Allen. Call 214-233-6803.",
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
      "Watters Creek",
      "The Villages of Allen",
      "The Retreat at Twin Creeks",
      "Allen Station",
    ],
    poolChallenges: [
      "Allen's municipal water carries moderate calcium hardness that sits right at the threshold where scaling begins if left unmanaged. Pools in the western half of Allen near Twin Creeks and The Villages tend to have slightly different water characteristics than pools in eastern Allen near Montgomery Farm — subtle differences that matter when you're fine-tuning chemistry for a specific pool. We calibrate our approach to each pool's actual water rather than applying a citywide average.",
      "Allen has a relatively uniform pool age profile — most residential pools were built between 2005 and 2018 during Allen's major growth phase. This means a large percentage of Allen pools are entering the 8–15 year window where original equipment starts failing. Pumps, heaters, salt cells, and automation controllers installed during construction are reaching end of life simultaneously. We track every component's condition and help homeowners plan replacements strategically.",
      "The tree canopy in Allen's established neighborhoods — particularly Twin Creeks and the areas near Bethany Lakes Park — produces significant leaf loads during fall and pollen during spring. Pools surrounded by mature trees need more aggressive skimming, more frequent filter cleaning, and chemistry adjustments that account for the organic demand from decomposing leaves.",
      "Allen's proximity to major highways (US-75 and SH-121) means some neighborhoods experience elevated dust and particulate matter that settles on pool surfaces. This fine particulate isn't visible individually but creates a hazy appearance in the water over time. Regular brushing and proper filtration eliminate the effect, but pools that are serviced bi-weekly instead of weekly show the difference.",
    ],
    visitIncludes: [
      "Every weekly visit covers complete maintenance — chemistry testing, surface cleaning, filter monitoring, and equipment inspection. We test free chlorine, pH, alkalinity, and stabilizer at every visit and adjust as needed. All chemicals are included. No separate charges, no surprise bills.",
      "Surface cleaning means every surface — not just the visible ones. We brush behind ladders, around light niches, under skimmer lips, and along the main drain where debris settles and algae establishes in low-flow zones. We vacuum settled material so the floor is clean, not just the surface.",
      "We track your filter pressure from week to week. A gradual pressure increase means the filter is loading and approaching cleaning time. A sudden spike means something changed — a broken cartridge pleat, a collapsed lateral, or a debris event that overwhelmed the filter. Both patterns require different responses, and both are only visible with weekly tracking.",
      "Every visit ends with a digital photo report sent to your phone. You see the pool condition, what was done, and any observations about equipment or water quality. If something needs attention, it's in the report with our recommendation and estimated cost.",
    ],
    neighborhoodDetails: [
      {
        name: "Twin Creeks",
        description:
          "Twin Creeks is Allen's largest master-planned community with hundreds of pool homes ranging from standard residential to custom builds. The mature tree canopy creates beautiful settings but heavy seasonal debris. Pool equipment ranges from 8–18 years old depending on the section — we service all ages and configurations.",
      },
      {
        name: "Montgomery Farm",
        description:
          "Montgomery Farm features newer construction with modern pool designs. Many pools include automation systems, variable speed pumps, and salt generators that were standard in the 2015–2020 building period. These systems need a technician who manages the technology, not just the chemistry.",
      },
      {
        name: "Watters Creek & The Villages of Allen",
        description:
          "Watters Creek and The Villages of Allen have mid-size residential pools in established neighborhoods. These are the pools where consistent weekly service delivers the highest value — preventing the slow-building problems that become expensive when they finally become visible.",
      },
      {
        name: "Eastern Allen",
        description:
          "Eastern Allen neighborhoods near Allen Station Park feature a mix of pool ages and styles. Some properties have older equipment approaching replacement age. We help homeowners evaluate repair-versus-replace decisions with honest assessments based on the specific equipment's condition and remaining useful life.",
      },
    ],
    switchReasons: [
      "Allen homeowners switch to us for the same reasons we hear across North DFW — their previous service didn't communicate, charged extra for chemicals, or couldn't handle repairs. We address all three: photo reports every visit, all chemicals included, and in-house repair capability.",
      "The specific Allen pattern we see is equipment neglect. With so many Allen pools in the 8–15 year age range, equipment failures are common. Previous services that only cleaned — without inspecting and monitoring equipment — let problems develop until the pump seized, the heater failed, or the salt cell stopped producing. We catch these issues weeks or months before they become emergencies.",
      "The third reason is expertise with salt systems. Allen has a high percentage of saltwater pools, and salt system maintenance requires specific knowledge — cell cleaning frequency based on local water hardness, output adjustment by season, error code diagnosis, and knowing when a cell is past cleaning and needs replacement. We handle all of it.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Allen?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you service saltwater pools?",
        answer:
          "Yes, all brands. We clean cells, monitor salt levels, adjust output, diagnose errors.",
      },
      {
        question: "What Allen neighborhoods do you serve?",
        answer:
          "All — Twin Creeks, Montgomery Farm, Watters Creek, The Villages, and all surrounding areas.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house.",
      },
      {
        question: "Do you offer one-time cleanings?",
        answer:
          "Yes, plus green pool recovery and post-storm cleanups.",
      },
      {
        question: "What makes you different?",
        answer:
          "Equipment monitoring every visit, photo reports, all chemicals included, salt system expertise, in-house repairs.",
      },
    ],
    testimonials: [
      { name: "Sultan S.", quote: "I have been using their services for 2+ years and am very happy with the quality of service and professionalism." },
      { name: "Ongo G.", quote: "I recently moved into a house with a neglected pool. These guys came and took a look at it for me. Couldn't be happier." },
      { name: "Macy L.", quote: "Incredible, reliable service. Best pool services around. Would highly recommend." },
    ],
    nearbyCities: ["mckinney", "plano", "frisco", "murphy", "parker"],
  },

  parker: {
    id: "parker",
    metaTitle:
      "Pool Cleaning Service in Parker, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Parker's local pool service — weekly cleaning, chemical balancing, and equipment maintenance for well water and municipal water pools. All chemicals included. Free first 2 weeks. Call 214-233-6803.",
    headline: "Pool Service in Parker, TX",
    intro:
      "Parker's larger lots, well water systems, and rural-adjacent properties create pool maintenance challenges you won't find in the surrounding suburbs. Hard well water with elevated calcium and iron, deer browsing your landscaping, and equipment pads exposed to open-field wind require a pool service that understands the specifics — not a company running the same playbook they use in Plano or McKinney.",
    whyChoose:
      "Parker homeowners choose Hydra because we understand well water chemistry, rural property challenges, and the equipment demands that come with larger pool installations. We don't treat your pool like a suburban cookie-cutter — we calibrate our service to your specific water source and property conditions.",
    whyChooseBullets: [
      "Well water chemistry expertise — calcium, iron, and metal management",
      "All chemicals included, including metal sequestrant for well water",
      "Digital photo reports after every visit",
      "In-house equipment repair — no outside contractors",
      "Serving all Parker properties regardless of lot size or location",
    ],
    neighborhoods: [
      "Southfork Ranch area",
      "Mustang Park",
      "Parker Road corridor",
      "Woodlands area",
      "Rural homesteads",
    ],
    poolChallenges: [
      "Many Parker properties rely on private well water instead of municipal supply. Well water in the Parker area carries 200–500 ppm calcium hardness — two to three times what municipal water delivers. That calcium concentrates through evaporation and deposits scale on every surface: tile, plaster, salt cell plates, and heater heat exchangers. We test fill water quality and adjust the chemistry strategy based on what your specific well produces.",
      "Iron is the other well water challenge. Dissolved iron is invisible in fresh well water, but the moment you add chlorine, the iron oxidizes and turns the water brown or orange. We add metal sequestrant before every shock treatment to prevent iron staining on your plaster — a step most services don't take because they've never dealt with well water pools.",
      "Parker's open lots catch more wind than sheltered backyards in Frisco or Allen. Wind accelerates evaporation, blows debris into the pool faster, and stresses landscaping around the pool area. We adjust skimming frequency and filter maintenance to account for the higher debris load that wind-exposed Parker pools experience.",
      "Deer are a reality on Parker properties without solid perimeter fencing. They browse landscaping, leave droppings near the pool area, and introduce organic material that affects water chemistry. We factor this into our maintenance approach and can recommend deer-resistant pool landscaping that reduces the impact on your pool.",
    ],
    visitIncludes: [
      "Every weekly visit follows the same comprehensive routine. We test free chlorine, pH, alkalinity, and cyanuric acid — and for Parker well water pools, we also monitor calcium hardness and iron levels monthly. All chemicals are included in your monthly rate, including the metal sequestrant that well water pools need before every shock treatment.",
      "We clean every surface — full skim, wall and floor brushing, vacuuming settled debris. Parker pools with heavy tree coverage or wind exposure accumulate debris faster, so we adjust our cleaning intensity based on conditions rather than running a fixed checklist.",
      "Equipment inspection happens every visit. We listen to the pump, check filter pressure, inspect the salt cell for scaling, and verify the heater is operating correctly. Parker's well water scales equipment faster than municipal water, so we clean salt cells quarterly instead of the typical twice-yearly schedule.",
      "After every visit, you receive a digital service report with photos. You see what was done, what was found, and the current condition of your pool — every week.",
    ],
    neighborhoodDetails: [
      {
        name: "Southfork Ranch Area",
        description:
          "Southfork Ranch area properties feature larger lots with custom pool installations, often including spas, water features, and premium finishes. Many are on well water, requiring specialized chemistry management that accounts for elevated mineral content.",
      },
      {
        name: "Mustang Park",
        description:
          "Mustang Park and surrounding developments are newer builds with recently constructed pools. New plaster curing in Parker's well water requires extra attention — the high calcium content accelerates scale formation during the curing window, and we adjust acid dosing and brushing schedules accordingly.",
      },
      {
        name: "Parker Road Corridor",
        description:
          "Parker Road corridor properties range from established homes with aging pool equipment to new construction. We help homeowners with older single-speed pumps plan transitions to variable speed — saving $500–800 per year in electricity while improving circulation.",
      },
      {
        name: "Rural Homesteads",
        description:
          "Rural homesteads on larger acreage lots face unique challenges — greater wind exposure, more organic debris from surrounding land, and longer distances between properties that some services won't travel. We serve all of Parker regardless of lot size or location.",
      },
    ],
    switchReasons: [
      "Most Parker pool owners who switch to us had a service that treated their well water pool the same as a municipal water pool in Plano. The chemistry is fundamentally different — higher calcium, dissolved metals, different pH behavior — and a one-size-fits-all approach leads to staining, scaling, and equipment damage that could have been prevented.",
      "The second reason is communication. Parker properties are spread out, and some homeowners aren't home during service visits. Our digital photo reports after every visit mean you always know exactly what happened, even if you weren't there to see it.",
      "The third reason is repair capability. When equipment fails on a Parker property, the last thing you want is to coordinate between a cleaning service and a separate repair company. We handle both — the same technician who maintains your pool diagnoses and fixes equipment issues.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Parker?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you service well water pools?",
        answer:
          "Yes. We test well water quality, manage calcium and iron levels, and use metal sequestrant before every shock to prevent staining.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you service saltwater pools on well water?",
        answer:
          "Yes. Well water pools with salt systems need more frequent cell cleaning due to higher calcium. We clean cells quarterly.",
      },
      {
        question: "What areas in Parker do you serve?",
        answer:
          "All of Parker — Southfork area, Mustang Park, Parker Road corridor, and rural properties.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house. Same technician who maintains your pool.",
      },
      {
        question: "Do you handle green pool recovery?",
        answer:
          "Yes. For well water pools we pre-treat with sequestrant before shocking to prevent iron staining during recovery.",
      },
      {
        question: "What makes you different?",
        answer:
          "We understand well water chemistry, which most DFW pool services don't. Photo reports every visit. All chemicals included. In-house repairs.",
      },
    ],
    testimonials: [
      { name: "Rahim H.", quote: "They came out when my pool pump was acting up and took care of the problem right away." },
      { name: "J. Roscoe", quote: "Awesome workmanship, communicative! Would recommend to anyone in the area!" },
      { name: "Shp G.", quote: "I have been working with this company for several years. They've helped me out with many situations." },
    ],
    nearbyCities: ["frisco", "plano", "mckinney", "allen", "prosper"],
  },

  murphy: {
    id: "murphy",
    metaTitle:
      "Pool Cleaning Service in Murphy, TX | Weekly from $179/mo | Hydra Pool Services",
    metaDescription:
      "Murphy pool service — weekly cleaning, chemical balancing, and equipment maintenance. All chemicals included. Free first 2 weeks. Serving Maxwell Creek, Mustang Park & all Murphy. Call 214-233-6803.",
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
    poolChallenges: [
      "Murphy's compact, family-dense neighborhoods mean pools get heavy use from May through September. A pool that serves a family of five with weekend guests handles a bather load that demands more aggressive chlorine management than a pool that sits unused most weeks. We adjust chemical dosing based on actual usage patterns — not a static formula that assumes every pool sees the same activity.",
      "Murphy sits in eastern Collin County where the clay soil is particularly expansive. The swell-and-shrink cycle with seasonal rainfall and drought stresses pool shells, cracks decks, and shifts equipment pad slabs. Pools built during Murphy's rapid growth in the 2005–2015 period are now entering the age where soil-related structural issues become visible. We document deck conditions and shell integrity at every visit.",
      "The mature tree canopy in Maxwell Creek and older Murphy neighborhoods produces heavy leaf loads during fall and dense pollen during spring. Pools in these areas need more frequent filter cleaning and aggressive skimming during peak seasons. The organic load from decomposing leaves also increases chlorine demand — we increase sanitizer dosing during these periods to prevent algae from exploiting the chemistry gap.",
      "Murphy's location between Allen and Wylie means it draws from the same NTMWD water supply, but mineral content can vary slightly by neighborhood based on distribution system routing. We test each pool's water individually rather than assuming uniform chemistry across the city.",
    ],
    visitIncludes: [
      "Every weekly visit covers the full maintenance routine — chemistry testing, surface cleaning, filter monitoring, and equipment inspection. We measure free chlorine, pH, alkalinity, and cyanuric acid and make adjustments on the spot. All chemicals are included in your monthly rate — no separate invoices for shock, acid, or specialty chemicals.",
      "Surface cleaning is thorough, not cosmetic. We skim the surface, brush every wall and floor surface including behind ladders and under coping lips, and vacuum settled debris. Murphy pools with heavy tree exposure get extra attention during fall when leaf loads can overwhelm a skimmer basket between visits.",
      "Equipment inspection happens at every visit. We track pump performance, filter pressure trends, salt cell output, and heater condition from week to week. Murphy's family-heavy pool usage puts more hours on equipment than a lightly-used pool — bearings wear faster, filters load quicker, and salt cells work harder. Weekly monitoring catches degradation before it becomes failure.",
      "After every visit, you receive a digital service report with photos. You know exactly what was done, what was found, and what your pool looks like — without having to be home during the visit.",
    ],
    neighborhoodDetails: [
      {
        name: "Maxwell Creek",
        description:
          "Maxwell Creek is Murphy's most established pool community with homes dating from the early 2000s. Pools here are 15–20 years old with mature landscaping that creates significant shade and leaf debris. Equipment is approaching or past its expected lifespan — we monitor each component and help homeowners plan replacements proactively.",
      },
      {
        name: "Mustang Park",
        description:
          "Mustang Park features newer construction with modern pool builds. These pools have current-generation equipment — variable speed pumps, salt systems, and LED lighting. Maintenance is straightforward when done consistently, and the newer equipment responds well to proper weekly attention.",
      },
      {
        name: "Murphy Heights",
        description:
          "Murphy Heights and surrounding neighborhoods represent Murphy's mid-development period — pools built between 2008 and 2015 with equipment entering the 10–15 year replacement window. Pump bearings, filter cartridges, and salt cells from this era are reaching end of life simultaneously. We track each component's condition and flag replacement timing.",
      },
      {
        name: "Eastern Murphy",
        description:
          "Eastern Murphy near the Wylie border includes properties with slightly larger lots and more open exposure. These pools experience more wind-driven debris and faster evaporation than the sheltered interior neighborhoods.",
      },
    ],
    switchReasons: [
      "Murphy homeowners switch to us when they realize their pool needs maintenance, not just cleaning. Skimming leaves and adding chlorine keeps the surface clean — but it doesn't monitor the filter pressure trend that indicates a failing cartridge, or the pump sound that signals bearing wear, or the salt cell output that's declining month over month. We track all of this.",
      "The second reason is reliability. Murphy is a tight-knit community where word travels fast. When a pool service skips visits or shows up inconsistently, neighbors notice. We show up on the same day every week with a photo report to prove it.",
      "The third reason is chemical transparency. We include all chemicals in every plan. The monthly rate you see is the rate you pay — no add-ons for shock, acid, algaecide, or seasonal treatments.",
    ],
    faqs: [
      {
        question: "How much does pool service cost in Murphy?",
        answer:
          "Weekly starts at $179/mo, bi-weekly from $139/mo, Premium $229/mo. All chemicals included.",
      },
      {
        question: "Do you include chemicals?",
        answer:
          "Yes, all chemicals in every plan.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "As soon as you fill out the quote form we get you scheduled.",
      },
      {
        question: "Do you service saltwater pools?",
        answer:
          "Yes, all brands. Cell cleaning, salt monitoring, output adjustment, error diagnosis.",
      },
      {
        question: "What Murphy neighborhoods do you serve?",
        answer:
          "All — Maxwell Creek, Mustang Park, Murphy Heights, and all surrounding areas.",
      },
      {
        question: "What if my pool needs a repair?",
        answer:
          "We handle repairs in-house.",
      },
      {
        question: "Do you offer one-time cleanings?",
        answer:
          "Yes, plus green pool recovery.",
      },
      {
        question: "What makes you different?",
        answer:
          "Weekly equipment monitoring, photo reports, all chemicals included, in-house repairs.",
      },
    ],
    testimonials: [
      { name: "Raissa A.", quote: "Super reliable! And their prices are great. 10/10 recommend." },
      { name: "Aaron F.", quote: "They are very knowledgeable on pool systems and were very helpful." },
      { name: "Riya S.", quote: "Super efficient, informative, and helpful." },
    ],
    nearbyCities: ["plano", "allen", "mckinney"],
  },

};
