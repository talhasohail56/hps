import type { PoolSize, Schedule } from "./types";

/* ------------------------------------------------------------------ */
/*  Pricing lookup                                                     */
/* ------------------------------------------------------------------ */

const PRICES: Record<Schedule, Record<PoolSize, number>> = {
  biweekly: {
    "10k-20k": 119,
    "20k-30k": 129,
    "30k+": 139,
  },
  weekly: {
    "10k-20k": 179,
    "20k-30k": 180,
    "30k+": 199,
  },
};

export function getMonthlyPrice(schedule: Schedule, poolSize: PoolSize): number {
  return PRICES[schedule][poolSize];
}
