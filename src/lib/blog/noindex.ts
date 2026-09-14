/* ------------------------------------------------------------------ */
/*  Noindexed blog posts                                               */
/*                                                                     */
/*  Posts kept live for existing links but deliberately excluded from  */
/*  the index — cannibalized or duplicate topics. Shared so the post   */
/*  page and the sitemap can never disagree: a URL marked noindex must */
/*  not also be submitted for indexing.                                */
/* ------------------------------------------------------------------ */

export const NOINDEX_SLUGS = new Set([
  "how-often-shock-pool-prosper-tx",
  "salt-pool-vs-chlorine-frisco-tx",
  "pool-pump-run-time-per-day-allen-tx",
  "variable-speed-pool-pump-worth-it-texas",
  "pool-leak-detection-signs-north-dfw",
  "pool-replastering-signs-cost-plano-tx",
  "pool-maintenance-cost-texas",
  "monthly-cost-pool-north-texas-prosper-tx",
  "weekly-pool-service-vs-diy-frisco-tx",
  "poor-pool-maintenance-increases-repair-costs",
  "pool-service-little-elm-tx",
]);

export function isNoindexed(slug: string): boolean {
  return NOINDEX_SLUGS.has(slug);
}
