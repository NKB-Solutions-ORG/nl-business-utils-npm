/**
 * Validates the format of a Dutch vestigingsnummer (KVK branch/location
 * number): exactly 12 digits. Like the KVK-nummer itself, no checksum
 * algorithm is published, so this is a format check only.
 */
export function isValidVestigingsnummer(value: string): boolean {
  return /^\d{12}$/.test(value.trim());
}
