const NL_IBAN_PATTERN = /^NL\d{2}[A-Z]{4}\d{10}$/;

function normalizeInput(value: string): string {
  return value.trim().toUpperCase().replace(/\s/g, "");
}

/**
 * ISO 7064 MOD 97-10 check as used by IBAN (ISO 13616): move the first four
 * characters to the end, expand letters to two-digit numbers (A=10..Z=35),
 * then the resulting numeral must be congruent to 1 mod 97.
 */
function mod97Check(iban: string): boolean {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
  return BigInt(numeric) % 97n === 1n;
}

/**
 * Validates a Dutch IBAN: correct structure (`NL` + 2 check digits + 4
 * letter bank code + 10 digit account number) and a passing MOD-97
 * checksum.
 */
export function isValidDutchIban(value: string): boolean {
  const normalized = normalizeInput(value);
  return NL_IBAN_PATTERN.test(normalized) && mod97Check(normalized);
}

/**
 * Returns a Dutch IBAN formatted in groups of four characters
 * (e.g. `NL91 ABNA 0417 1643 00`). Throws if the input does not pass
 * {@link isValidDutchIban}.
 */
export function formatIban(value: string): string {
  const normalized = normalizeInput(value);

  if (!isValidDutchIban(normalized)) {
    throw new Error(`Invalid Dutch IBAN: ${value}`);
  }

  return normalized.replace(/(.{4})(?=.)/g, "$1 ");
}
