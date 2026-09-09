import { cn } from "@/lib/utils";
import {
  POOL_SIZE_TIERS,
  POOL_SIZE_TIER_LABELS,
  TIERED_PLAN_KEYS,
  TIERED_PLAN_NAMES,
  TIERED_PLAN_PRICES,
  PREMIUM_CARE_FLAT_PRICE,
} from "@/lib/data/pricing-tiers";

/* ------------------------------------------------------------------ */
/*  Pricing by pool size                                               */
/*                                                                     */
/*  Rows are plans, columns are size bands, matching how customers     */
/*  compare options. Premium Care is flat, so it gets one merged cell  */
/*  instead of the same number repeated three times.                   */
/* ------------------------------------------------------------------ */

function Price({ amount }: { amount: number }) {
  return (
    <>
      <span className="font-semibold text-navy">${amount}</span>
      <span className="text-slate-light">/mo + tax</span>
    </>
  );
}

function DesktopTable() {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="bg-surface px-4 py-4 text-sm font-medium text-slate-light md:px-6">
              Plan
            </th>
            {POOL_SIZE_TIERS.map((tier) => (
              <th
                key={tier}
                className="bg-surface px-4 py-4 text-center text-sm font-semibold text-navy md:px-6"
              >
                {POOL_SIZE_TIER_LABELS[tier]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIERED_PLAN_KEYS.map((plan, idx) => (
            <tr
              key={plan}
              className={cn(
                idx % 2 === 0 ? "bg-white" : "bg-surface",
                "border-t border-border-light"
              )}
            >
              <td className="px-4 py-3.5 text-sm font-semibold text-navy md:px-6">
                {TIERED_PLAN_NAMES[plan]}
              </td>
              {POOL_SIZE_TIERS.map((tier) => (
                <td key={tier} className="px-4 py-3.5 text-center text-sm md:px-6">
                  <Price amount={TIERED_PLAN_PRICES[plan][tier]} />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-border-light bg-hydra-50/50">
            <td className="px-4 py-3.5 text-sm font-semibold text-navy md:px-6">
              Premium Care
            </td>
            <td
              colSpan={POOL_SIZE_TIERS.length}
              className="px-4 py-3.5 text-center text-sm md:px-6"
            >
              <Price amount={PREMIUM_CARE_FLAT_PRICE} />
              <span className="ml-2 text-slate-light">
                flat &mdash; same price for every pool size
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MobileCards() {
  return (
    <div className="flex flex-col gap-4 sm:hidden">
      {TIERED_PLAN_KEYS.map((plan) => (
        <div
          key={plan}
          className="overflow-hidden rounded-xl border border-border"
        >
          <div className="bg-surface px-5 py-3">
            <h3 className="text-base font-semibold text-navy">
              {TIERED_PLAN_NAMES[plan]}
            </h3>
          </div>
          <ul className="divide-y divide-border-light">
            {POOL_SIZE_TIERS.map((tier) => (
              <li
                key={tier}
                className="flex items-center justify-between px-5 py-3 text-sm"
              >
                <span className="text-slate">{POOL_SIZE_TIER_LABELS[tier]}</span>
                <span>
                  <Price amount={TIERED_PLAN_PRICES[plan][tier]} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="overflow-hidden rounded-xl border border-hydra-200 bg-hydra-50/50">
        <div className="px-5 py-3">
          <h3 className="text-base font-semibold text-navy">Premium Care</h3>
        </div>
        <p className="border-t border-border-light px-5 py-3 text-sm">
          <Price amount={PREMIUM_CARE_FLAT_PRICE} />
          <span className="ml-2 text-slate-light">
            flat &mdash; same price for every pool size
          </span>
        </p>
      </div>
    </div>
  );
}

export function TierTable() {
  return (
    <>
      <DesktopTable />
      <MobileCards />
    </>
  );
}
