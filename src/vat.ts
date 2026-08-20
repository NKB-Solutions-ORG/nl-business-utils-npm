import { passesElfproef } from "./internal/elfproef.js";

const VAT_PATTERN = /^NL(\d{9})B(\d{2})$/;

function normalizeInput(value: string): string {
  return value.trim().toUpperCase().replace(/[\s.-]/g, "");
}

/**
 * Validates the format of a Dutch btw-identificatienummer (VAT number):
 * `NL` + 9 digits + `B` + a 2-digit branch number from 01 to 99.
 *
 * This checks structure only. Use {@link hasValidVatNumberLegacyChecksum}
 * for an additional checksum check on pre-2020 numbers — see that
 * function's documentation for an important limitation.
 */
export function isValidVatNumberFormat(value: string): boolean {
  const match = VAT_PATTERN.exec(normalizeInput(value));

  if (!match) {
    return false;
  }

  const branch = Number(match[2]);
  return branch >= 1 && branch <= 99;
}

/**
 * Checks the legacy elfproef checksum on the 9-digit segment of a Dutch VAT
 * number. This only applies to *pre-2020* VAT numbers, which were derived
 * from the holder's BSN/RSIN and therefore satisfy the elfproef.
 *
 * Since 1 January 2020, VAT numbers issued to natural persons (sole
 * traders / zzp'ers) use a new, privacy-preserving numbering scheme that is
 * *expected* to fail this checksum by design — the Belastingdienst has not
 * published the algorithm used to generate those numbers. A `false` result
 * from this function therefore does **not** prove the number is invalid.
 *
 * For a definitive check, validate the format with
 * {@link isValidVatNumberFormat} and, if certainty is required, verify the
 * number against the EU VIES service or the Dutch tax authority.
 */
export function hasValidVatNumberLegacyChecksum(value: string): boolean {
  const match = VAT_PATTERN.exec(normalizeInput(value));
  return match !== null && passesElfproef(match[1]!);
}

/**
 * Returns the canonical `NLxxxxxxxxxBxx` representation of a VAT number.
 * Throws if the input does not pass {@link isValidVatNumberFormat}.
 */
export function formatVatNumber(value: string): string {
  const normalized = normalizeInput(value);

  if (!isValidVatNumberFormat(normalized)) {
    throw new Error(`Invalid VAT number: ${value}`);
  }

  return normalized;
}
