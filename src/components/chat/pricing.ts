import type { PoolSize, Schedule } from "./types";

/* ------------------------------------------------------------------ */
/*  Pricing lookup                                                     */
/* ------------------------------------------------------------------ */

const PRICES: Record<Schedule, Record<PoolSize, number>> = {
  chemical: {
    "10k-20k": 119,
    "20k-30k": 129,
    "30k+": 139,
  },
  weekly: {
    "10k-20k": 179,
    "20k-30k": 189,
    "30k+": 199,
  },
  premium: {
    // Flat rate — Premium Care is not tiered by pool size.
    "10k-20k": 299,
    "20k-30k": 299,
    "30k+": 299,
  },
};

export function getMonthlyPrice(schedule: Schedule, poolSize: PoolSize): number {
  return PRICES[schedule][poolSize];
}
