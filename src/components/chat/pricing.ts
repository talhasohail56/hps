import type { PoolSize, Schedule } from "./types";
import {
  POOL_SIZE_TIERS,
  POOL_SIZE_TIER_LABELS,
  TIERED_PLAN_PRICES,
  PREMIUM_CARE_FLAT_PRICE,
} from "@/lib/data/pricing-tiers";

/* ------------------------------------------------------------------ */
/*  Pool-size tiers                                                    */
/* ------------------------------------------------------------------ */

/*
 * Keys and labels come from the shared tier data, so the size step, the
 * "Pool size:" chip and the quote card can never drift from the keys that
 * price them — or from the tier table on /plans.
 */
export const POOL_SIZE_LABELS: Record<PoolSize, string> = POOL_SIZE_TIER_LABELS;

export const POOL_SIZES: PoolSize[] = [...POOL_SIZE_TIERS];

export const SCHEDULE_LABELS: Record<Schedule, string> = {
  chemical: "Chemical Only",
  weekly: "Weekly",
  premium: "Premium Care",
};

/* ------------------------------------------------------------------ */
/*  Pricing lookup (monthly, exclusive of tax)                         */
/* ------------------------------------------------------------------ */

const PRICES: Record<Schedule, Record<PoolSize, number>> = {
  chemical: TIERED_PLAN_PRICES.chemical,
  weekly: TIERED_PLAN_PRICES.weekly,
  premium: {
    // Flat rate — Premium Care is not tiered by pool size.
    "0-10k": PREMIUM_CARE_FLAT_PRICE,
    "10k-20k": PREMIUM_CARE_FLAT_PRICE,
    "20k+": PREMIUM_CARE_FLAT_PRICE,
  },
};

export function getMonthlyPrice(schedule: Schedule, poolSize: PoolSize): number {
  return PRICES[schedule][poolSize];
}
