/* ------------------------------------------------------------------ */
/*  Pool-size pricing tiers                                            */
/*                                                                     */
/*  The single source of truth for size-tiered monthly prices. The     */
/*  /plans tier table and the chatbot's quote calculator both read     */
/*  from here, so the two can never disagree.                          */
/* ------------------------------------------------------------------ */

export const POOL_SIZE_TIERS = ["0-10k", "10k-20k", "20k+"] as const;
export type PoolSizeTier = (typeof POOL_SIZE_TIERS)[number];

/** Customer-facing wording for each tier key. */
export const POOL_SIZE_TIER_LABELS: Record<PoolSizeTier, string> = {
  "0-10k": "0 – 10,000 gal",
  "10k-20k": "10,000 – 20,000 gal",
  "20k+": "20,000+ gal",
};

/** Plans whose monthly price depends on pool size. */
export type TieredPlanKey = "chemical" | "biweekly" | "weekly";

export const TIERED_PLAN_NAMES: Record<TieredPlanKey, string> = {
  chemical: "Chemical Only",
  biweekly: "Bi-weekly",
  weekly: "Weekly",
};

/** Monthly price by plan and tier, exclusive of tax. Cheapest plan first. */
export const TIERED_PLAN_PRICES: Record<
  TieredPlanKey,
  Record<PoolSizeTier, number>
> = {
  chemical: { "0-10k": 119, "10k-20k": 129, "20k+": 139 },
  biweekly: { "0-10k": 139, "10k-20k": 149, "20k+": 159 },
  weekly: { "0-10k": 179, "10k-20k": 199, "20k+": 209 },
};

export const TIERED_PLAN_KEYS: TieredPlanKey[] = ["chemical", "biweekly", "weekly"];

/** Premium Care is a flat rate — the same price at every pool size. */
export const PREMIUM_CARE_FLAT_PRICE = 299;
