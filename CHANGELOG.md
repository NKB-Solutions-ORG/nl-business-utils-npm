# Changelog

Alle noemenswaardige wijzigingen in dit project worden hier bijgehouden.
Dit project volgt [Semantic Versioning](https://semver.org/lang/nl/).

## [1.0.0]

### Toegevoegd

- `getDutchBankName` — banknaam-lookup op basis van de bankcode in een geldige Nederlandse IBAN.
- `isValidLoonheffingenNummer` / `formatLoonheffingenNummer` — validatie van het loonheffingennummer.
- `isValidVestigingsnummer` — formaatvalidatie van het KVK-vestigingsnummer (12 cijfers).
- `formatEuro` / `parseEuroAmount` — formatteren en parsen van Nederlandse euro-bedragen.

### Gewijzigd

- Minimale Node.js-versie is nu `>=20.12` (vereist door vitest 4's gebruik van `node:util`'s `styleText`).

## [0.1.0]

### Toegevoegd

- `isValidBsn` / `normalizeBsn` — BSN-validatie met de elfproef.
- `isValidRsin` / `normalizeRsin` — RSIN-validatie met de elfproef.
- `isValidKvkNumber` — formaatvalidatie van het KVK-nummer.
- `isValidVatNumberFormat` / `hasValidVatNumberLegacyChecksum` / `formatVatNumber` — btw-nummer validatie.
- `isValidDutchIban` / `formatIban` — IBAN-validatie (MOD-97) en -formattering.
- `isValidDutchPostcode` / `formatDutchPostcode` — postcode-validatie en -formattering.
- `isValidDutchPhoneNumber` / `isDutchMobileNumber` / `formatDutchPhoneNumber` — telefoonnummer-validatie en -formattering.
- `VAT_RATES` / `calculateVatAmount` / `addVat` / `removeVat` — btw-rekenmodule.
