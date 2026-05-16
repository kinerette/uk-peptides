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
 * Format a dual GBP/EUR price, GBP primary (this is the UK store; billing
 * happens in GBP), EUR shown in parentheses as an approximate reference.
 *
 *   "£80 (≈ €94)"
 *
 * The parenthetical + ≈ wins over the previous "£80 / €94" slash format,
 * which read as two equally-billable prices and tanked conversion.
 */
export function dualPrice(priceEur: number): string {
  return `£${eurToGbp(priceEur)} (≈ €${priceEur})`;
}
