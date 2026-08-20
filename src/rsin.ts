import { passesElfproef } from "./internal/elfproef.js";

function toNineDigits(value: string): string | null {
  const trimmed = value.trim();

  if (!/^\d{8,9}$/.test(trimmed)) {
    return null;
  }

  return trimmed.length === 8 ? `0${trimmed}` : trimmed;
}

/**
 * Validates a Dutch RSIN (Rechtspersonen Samenwerkingsverbanden Informatie
 * Nummer) using the same elfproef checksum as BSN.
 */
export function isValidRsin(value: string): boolean {
  const nineDigits = toNineDigits(value);
  return nineDigits !== null && passesElfproef(nineDigits);
}

/**
 * Returns the canonical 9-digit representation of a valid RSIN.
 * Throws if the input does not pass {@link isValidRsin}.
 */
export function normalizeRsin(value: string): string {
  const nineDigits = toNineDigits(value);

  if (nineDigits === null || !passesElfproef(nineDigits)) {
    throw new Error(`Invalid RSIN: ${value}`);
  }

  return nineDigits;
}
