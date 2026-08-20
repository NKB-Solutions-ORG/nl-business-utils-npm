function insertThousandSeparators(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Formats an amount as a Dutch-style euro string, e.g. `1234.5` becomes
 * `"€ 1.234,50"` and `-19.99` becomes `"-€ 19,99"`.
 *
 * This is implemented manually rather than via `Intl.NumberFormat` so the
 * output (separators, spacing) is stable across JavaScript engines and
 * ICU/CLDR data versions, instead of depending on locale data that can
 * differ between Node.js versions.
 */
export function formatEuro(amount: number): string {
  const negative = amount < 0;
  const cents = Math.round(Math.abs(amount) * 100);
  const whole = Math.floor(cents / 100).toString();
  const centsPart = (cents % 100).toString().padStart(2, "0");

  return `${negative ? "-" : ""}€ ${insertThousandSeparators(whole)},${centsPart}`;
}

/**
 * Parses a Dutch-style euro string (as produced by {@link formatEuro}, with
 * or without the `€` sign) back into a number. Throws if the input isn't a
 * recognizable Dutch amount.
 */
export function parseEuroAmount(value: string): number {
  const trimmed = value.trim();
  const negative = trimmed.includes("-");
  const cleaned = trimmed.replace(/[€\s-]/g, "").replace(/\./g, "").replace(",", ".");

  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    throw new Error(`Invalid euro amount: ${value}`);
  }

  const amount = Number(cleaned);
  return negative ? -amount : amount;
}
