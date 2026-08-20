/**
 * Generic Dutch "elfproef" (eleven-test) checksum used by BSN and RSIN.
 * Weights 9..2 apply to the first eight digits, weight -1 applies to the last digit.
 * A number passes when the weighted sum is a non-zero multiple of 11.
 */
export function passesElfproef(nineDigits: string): boolean {
  if (!/^\d{9}$/.test(nineDigits)) {
    return false;
  }

  const digits = nineDigits.split("").map(Number);
  const weights = [9, 8, 7, 6, 5, 4, 3, 2, -1];

  const sum = digits.reduce((total, digit, index) => total + digit * weights[index]!, 0);

  return sum !== 0 && sum % 11 === 0;
}
