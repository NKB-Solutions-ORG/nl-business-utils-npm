/**
 * Validates the format of a Dutch KVK-nummer (Chamber of Commerce number):
 * exactly 8 digits. The KVK does not publish a checksum algorithm, so this
 * is a format check only — it cannot confirm the number is actually
 * registered. Use the KVK API for definitive verification.
 */
export function isValidKvkNumber(value: string): boolean {
  return /^\d{8}$/.test(value.trim());
}
