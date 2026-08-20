const POSTCODE_PATTERN = /^([1-9]\d{3})\s*([A-Za-z]{2})$/;

// PostNL never issues these letter combinations, regardless of the digits.
const RESERVED_LETTERS = new Set(["SS", "SA", "SD"]);

function parse(value: string): { digits: string; letters: string } | null {
  const match = POSTCODE_PATTERN.exec(value.trim());

  if (!match) {
    return null;
  }

  const letters = match[2]!.toUpperCase();

  if (RESERVED_LETTERS.has(letters)) {
    return null;
  }

  return { digits: match[1]!, letters };
}

/**
 * Validates a Dutch postcode: 4 digits (1000-9999) followed by 2 letters,
 * with optional whitespace between them. Rejects the letter combinations
 * PostNL never issues (SS, SA, SD).
 */
export function isValidDutchPostcode(value: string): boolean {
  return parse(value) !== null;
}

/**
 * Returns a Dutch postcode formatted as `1234 AB` (digits, single space,
 * uppercase letters). Throws if the input does not pass
 * {@link isValidDutchPostcode}.
 */
export function formatDutchPostcode(value: string): string {
  const parsed = parse(value);

  if (!parsed) {
    throw new Error(`Invalid Dutch postcode: ${value}`);
  }

  return `${parsed.digits} ${parsed.letters}`;
}
