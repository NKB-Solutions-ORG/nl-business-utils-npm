/** Current Dutch VAT (btw) rate percentages. */
export const VAT_RATES = {
  /** Algemeen tarief. */
  STANDARD: 21,
  /** Verlaagd tarief. */
  REDUCED: 9,
  ZERO: 0,
} as const;

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Calculates the VAT amount over an amount excluding VAT, at the given
 * percentage. Rounds to whole cents, consistent with how invoices are
 * normally rounded.
 */
export function calculateVatAmount(amountExcludingVat: number, ratePercentage: number): number {
  const exclCents = toCents(amountExcludingVat);
  const vatCents = Math.round((exclCents * ratePercentage) / 100);
  return fromCents(vatCents);
}

/** Adds VAT to an amount excluding VAT, returning the amount including VAT. */
export function addVat(amountExcludingVat: number, ratePercentage: number): number {
  const exclCents = toCents(amountExcludingVat);
  const vatCents = Math.round((exclCents * ratePercentage) / 100);
  return fromCents(exclCents + vatCents);
}

/** Removes VAT from an amount including VAT, returning the amount excluding VAT. */
export function removeVat(amountIncludingVat: number, ratePercentage: number): number {
  const inclCents = toCents(amountIncludingVat);
  const exclCents = Math.round(inclCents / (1 + ratePercentage / 100));
  return fromCents(exclCents);
}
