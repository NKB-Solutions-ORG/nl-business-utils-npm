function toNationalDigits(value: string): string | null {
  let cleaned = value.trim().replace(/[\s().-]/g, "");

  if (cleaned.startsWith("+31")) {
    cleaned = `0${cleaned.slice(3)}`;
  } else if (cleaned.startsWith("0031")) {
    cleaned = `0${cleaned.slice(4)}`;
  }

  return /^0\d{9}$/.test(cleaned) ? cleaned : null;
}

/**
 * Validates a Dutch phone number (mobile or landline): 10 digits in
 * national format (`0...`), or the equivalent with a `+31` / `0031`
 * country-calling-code prefix. This checks structure only — it does not
 * verify the number against an area-code database or confirm the line is
 * in service.
 */
export function isValidDutchPhoneNumber(value: string): boolean {
  return toNationalDigits(value) !== null;
}

/**
 * Returns whether a valid Dutch phone number is a mobile number
 * (national format `06XXXXXXXX`).
 */
export function isDutchMobileNumber(value: string): boolean {
  const digits = toNationalDigits(value);
  return digits !== null && digits.startsWith("06");
}

/**
 * Returns a Dutch phone number formatted in E.164 (`+31...`). Throws if the
 * input does not pass {@link isValidDutchPhoneNumber}.
 */
export function formatDutchPhoneNumber(value: string): string {
  const digits = toNationalDigits(value);

  if (!digits) {
    throw new Error(`Invalid Dutch phone number: ${value}`);
  }

  return `+31${digits.slice(1)}`;
}
