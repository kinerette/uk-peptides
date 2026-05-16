/**
 * Currency conversion constants
 * Fix 3 (2026-05-14): Add GBP/EUR dual pricing for UK buyers
 * Rate: 1 GBP = 1.17 EUR → EUR_TO_GBP = 0.855
 * Update this value periodically (monthly is sufficient for static display).
 */
export const EUR_TO_GBP = 0.855;

/**
 * Convert a EUR price to GBP (rounded to nearest integer).
 */
export function eurToGbp(priceEur: number): number {
  return Math.round(priceEur * EUR_TO_GBP);
}

/**
 * Format a dual EUR/GBP price, EUR primary (.eu domain → European audience),
 * GBP shown in parentheses as an approximate reference for UK browsers.
 *
 *   "€94 (≈ £80)"
 *
 * User feedback 2026-05-16: ".eu site qui cible européens — pourquoi GBP
 * primary ?". Inverted to EUR primary; conversion to GBP stays as a
 * reference for visiting UK customers.
 */
export function dualPrice(priceEur: number): string {
  return `€${priceEur} (≈ £${eurToGbp(priceEur)})`;
}
