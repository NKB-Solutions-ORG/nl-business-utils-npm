import { passesElfproef } from "./internal/elfproef.js";

/**
 * Normalizes raw input into a 9-digit BSN candidate, or `null` if the input
 * cannot possibly be a BSN (wrong characters or length).
 */
function toNineDigits(value: string): string | null {
  const trimmed = value.trim();

  if (!/^\d{8,9}$/.test(trimmed)) {
    return null;
  }

  return trimmed.length === 8 ? `0${trimmed}` : trimmed;
}

/**
 * Validates a Dutch BSN (burgerservicenummer) using the elfproef checksum.
 * Accepts 8 or 9 digit input (8-digit numbers are zero-padded before checking).
 */
export function isValidBsn(value: string): boolean {
  const nineDigits = toNineDigits(value);
  return nineDigits !== null && passesElfproef(nineDigits);
}

/**
 * Returns the canonical 9-digit representation of a valid BSN.
 * Throws if the input does not pass {@link isValidBsn}.
 */
export function normalizeBsn(value: string): string {
  const nineDigits = toNineDigits(value);

  if (nineDigits === null || !passesElfproef(nineDigits)) {
    throw new Error(`Invalid BSN: ${value}`);
  }

  return nineDigits;
}
