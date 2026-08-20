import { isValidDutchIban } from "./iban.js";

/**
 * Known Dutch bank identifier codes (IBAN positions 5-8) mapped to their
 * official bank name. This is a curated list of major banks, not an
 * exhaustive registry - {@link getDutchBankName} returns `null` for any
 * code not in this list rather than guessing.
 */
const DUTCH_BANKS: Readonly<Record<string, string>> = {
  ABNA: "ABN AMRO Bank N.V.",
  INGB: "ING Bank N.V.",
  RABO: "Rabobank",
  SNSB: "SNS Bank N.V.",
  ASNB: "ASN Bank N.V.",
  TRIO: "Triodos Bank N.V.",
  KNAB: "Knab (Aegon Bank N.V.)",
  BUNQ: "bunq B.V.",
  RBRB: "RegioBank N.V.",
  ARBN: "Achmea Bank N.V.",
};

/**
 * Looks up the bank name for a valid Dutch IBAN, based on its 4-letter bank
 * identifier code. Returns `null` if the IBAN is invalid or belongs to a
 * bank that is not in the curated list of major Dutch banks.
 */
export function getDutchBankName(iban: string): string | null {
  const normalized = iban.trim().toUpperCase().replace(/\s/g, "");

  if (!isValidDutchIban(normalized)) {
    return null;
  }

  const bankCode = normalized.slice(4, 8);
  return DUTCH_BANKS[bankCode] ?? null;
}
