"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, featureOrder } from "@/lib/data/plans";

/**
 * Rows follow the canonical order in plans.ts. Anything a plan lists that
 * isn't in that list still shows up, appended at the end, so a new feature
 * can never silently disappear from the table.
 */
const allFeatures = [
  ...featureOrder,
  ...plans.reduce<string[]>((acc, plan) => {
    plan.features.forEach((f) => {
      if (!featureOrder.includes(f.text) && !acc.includes(f.text)) {
        acc.push(f.text);
      }
    });
    return acc;
  }, []),
];

/** Look up whether a given plan includes a specific feature. */
function planHasFeature(planId: string, featureText: string): boolean {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return false;
  const match = plan.features.find((f) => f.text === featureText);
  return match?.included ?? false;
}

/* ------------------------------------------------------------------ */
/*  Desktop table                                                      */
/* ------------------------------------------------------------------ */

function DesktopTable() {
  return (
    // Four plan columns are tight below ~1100px, so the wrapper scrolls
    // horizontally instead of crushing the columns.
    <div className="hidden overflow-x-auto rounded-xl border border-border lg:block">
      <table className="w-full min-w-[860px] border-collapse text-left">
        {/* Header */}
        <thead>
          <tr>
            <th className="bg-surface px-4 py-4 text-sm font-medium text-slate-light xl:px-6">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={cn(
                  "px-4 py-4 text-center text-sm font-semibold xl:px-6",
                  plan.featured
                    ? "bg-hydra-50 text-hydra-700"
                    : "bg-surface text-navy"
                )}
              >
                <div>{plan.name}</div>
                {plan.price !== null && (
                  <div className="mt-1 text-xs font-normal text-slate-light">
                    {plan.priceLabel}{" "}
                    <span className="font-semibold text-navy">
                      ${plan.price}
                    </span>
                    /mo
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Feature rows */}
        <tbody>
          {allFeatures.map((feature, idx) => (
            <tr
              key={feature}
              className={cn(
                idx % 2 === 0 ? "bg-white" : "bg-surface",
                "border-t border-border-light"
              )}
            >
              <td className="px-4 py-3.5 text-sm text-navy xl:px-6">{feature}</td>
              {plans.map((plan) => {
                const included = planHasFeature(plan.id, feature);
                return (
                  <td
                    key={plan.id}
                    className={cn(
                      "px-4 py-3.5 text-center xl:px-6",
                      plan.featured && (idx % 2 === 0 ? "bg-hydra-50/40" : "bg-hydra-50/60")
                    )}
                  >
                    {included ? (
                      <Check className="mx-auto h-5 w-5 text-hydra-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-light" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile stacked cards                                               */
/* ------------------------------------------------------------------ */

function MobileCards() {
  return (
    <div className="flex flex-col gap-6 lg:hidden">
      {plans.map((plan, planIdx) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: planIdx * 0.1 }}
          className={cn(
            "overflow-hidden rounded-xl border",
            plan.featured
              ? "border-hydra-300 shadow-md shadow-hydra-100/50"
              : "border-border"
          )}
        >
          {/* Card header */}
          <div
            className={cn(
              "px-5 py-4",
              plan.featured ? "bg-hydra-50" : "bg-surface"
            )}
          >
            <h3
              className={cn(
                "text-base font-semibold",
                plan.featured ? "text-hydra-700" : "text-navy"
              )}
            >
              {plan.name}
            </h3>
            {plan.price !== null && (
              <p className="mt-0.5 text-sm text-slate-light">
                {plan.priceLabel}{" "}
                <span className="font-semibold text-navy">${plan.price}</span>
                /mo
              </p>
            )}
          </div>

          {/* Feature list */}
          <ul className="divide-y divide-border-light">
            {allFeatures.map((feature, idx) => {
              const included = planHasFeature(plan.id, feature);
              return (
                <li
                  key={feature}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 text-sm",
                    idx % 2 === 0 ? "bg-white" : "bg-surface"
                  )}
                >
                  {included ? (
                    <Check className="h-4.5 w-4.5 shrink-0 text-hydra-500" />
                  ) : (
                    <X className="h-4.5 w-4.5 shrink-0 text-slate-light" />
                  )}
                  <span
                    className={cn(
                      included ? "text-navy" : "text-slate-light"
                    )}
                  >
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function PricingTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
    >
      <DesktopTable />
      <MobileCards />
    </motion.div>
  );
}
