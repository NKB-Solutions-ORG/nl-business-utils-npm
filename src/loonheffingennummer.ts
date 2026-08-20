import { passesElfproef } from "./internal/elfproef.js";

const PATTERN = /^(\d{9})L(\d{2})$/;

function normalizeInput(value: string): string {
  return value.trim().toUpperCase().replace(/[\s.-]/g, "");
}

/**
 * Validates a Dutch loonheffingennummer (payroll tax number): the holder's
 * BSN or RSIN (9 digits, must pass the elfproef) followed by `L` and a
 * 2-digit sequence number (e.g. `123456782L01`).
 */
export function isValidLoonheffingenNummer(value: string): boolean {
  const match = PATTERN.exec(normalizeInput(value));

  if (!match) {
    return false;
  }

  const sequence = Number(match[2]);
  return sequence >= 1 && sequence <= 99 && passesElfproef(match[1]!);
}

/**
 * Returns the canonical uppercase representation of a loonheffingennummer.
 * Throws if the input does not pass {@link isValidLoonheffingenNummer}.
 */
export function formatLoonheffingenNummer(value: string): string {
  const normalized = normalizeInput(value);

  if (!isValidLoonheffingenNummer(normalized)) {
    throw new Error(`Invalid loonheffingennummer: ${value}`);
  }

  return normalized;
}
