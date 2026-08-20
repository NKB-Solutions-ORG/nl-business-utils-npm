# nl-business-utils

Validatie- en formatteringshulpmiddelen voor Nederlandse zakelijke gegevens: BSN,
RSIN, KVK-nummer, vestigingsnummer, btw-nummer, loonheffingennummer, IBAN
(inclusief bank-lookup), postcode, telefoonnummer en euro-bedragen. Geen
dependencies, volledig getypeerd, werkt zowel als ESM als CommonJS.

Ook beschikbaar voor .NET: [NLBusinessUtils op NuGet](https://www.nuget.org/packages/NLBusinessUtils).

## Installatie

```bash
npm install nl-business-utils
```

## Gebruik

```ts
import {
  isValidBsn,
  isValidKvkNumber,
  isValidVatNumberFormat,
  hasValidVatNumberLegacyChecksum,
  isValidDutchIban,
  formatIban,
  isValidDutchPostcode,
  formatDutchPostcode,
  isValidDutchPhoneNumber,
  formatDutchPhoneNumber,
  VAT_RATES,
  addVat,
  removeVat,
  getDutchBankName,
  isValidLoonheffingenNummer,
  isValidVestigingsnummer,
  formatEuro,
  parseEuroAmount,
} from "nl-business-utils";

isValidBsn("123456782"); // true
isValidKvkNumber("12345678"); // true

isValidDutchIban("NL91ABNA0417164300"); // true
formatIban("nl91abna0417164300"); // "NL91 ABNA 0417 1643 00"
getDutchBankName("NL91ABNA0417164300"); // "ABN AMRO Bank N.V."

isValidDutchPostcode("1234ab"); // true
formatDutchPostcode("1234ab"); // "1234 AB"

isValidDutchPhoneNumber("06-12345678"); // true
formatDutchPhoneNumber("06-12345678"); // "+31612345678"

isValidLoonheffingenNummer("123456782L01"); // true
isValidVestigingsnummer("123456789012"); // true

addVat(100, VAT_RATES.STANDARD); // 121
removeVat(121, VAT_RATES.STANDARD); // 100

formatEuro(1234.5); // "€ 1.234,50"
parseEuroAmount("€ 1.234,50"); // 1234.5
```

## API

### BSN / RSIN

- `isValidBsn(value: string): boolean` — valideert een burgerservicenummer met de elfproef. Accepteert 8 of 9 cijfers.
- `normalizeBsn(value: string): string` — geeft de canonieke 9-cijferige vorm terug, of gooit een error.
- `isValidRsin(value: string): boolean` / `normalizeRsin(value: string): string` — zelfde elfproef, voor rechtspersonen.

### KVK-nummer

- `isValidKvkNumber(value: string): boolean` — controleert of de invoer uit precies 8 cijfers bestaat.
  > De KVK publiceert geen checksum-algoritme voor haar nummers. Dit is dus een
  > formaatcontrole, geen bewijs dat het nummer daadwerkelijk geregistreerd is —
  > gebruik hiervoor de KVK API.

### Btw-nummer (VAT)

- `isValidVatNumberFormat(value: string): boolean` — controleert de structuur `NL` + 9 cijfers + `B` + 2 cijfers (01-99).
- `hasValidVatNumberLegacyChecksum(value: string): boolean` — controleert de elfproef op het 9-cijferige deel.
  > **Let op:** dit werkt alleen voor btw-nummers van vóór 2020, die zijn afgeleid
  > van het BSN/RSIN. Sinds 1 januari 2020 krijgen natuurlijke personen
  > (eenmanszaken/zzp'ers) een nieuw, privacy-vriendelijk nummer dat *per ontwerp*
  > niet aan de elfproef voldoet — de Belastingdienst heeft het algoritme
  > daarachter niet gepubliceerd. Een `false` resultaat betekent dus **niet**
  > automatisch dat het nummer ongeldig is. Gebruik voor zekerheid de
  > [VIES-dienst](https://ec.europa.eu/taxation_customs/vies/) van de EU.
- `formatVatNumber(value: string): string` — canonieke `NLxxxxxxxxxBxx`-vorm, of gooit een error.

### IBAN

- `isValidDutchIban(value: string): boolean` — structuur + MOD-97 checksum (ISO 13616).
- `formatIban(value: string): string` — groepeert in blokken van 4, bv. `NL91 ABNA 0417 1643 00`.
- `getDutchBankName(value: string): string | null` — banknaam op basis van de 4-letterige bankcode in een geldige IBAN. Dekt een handmatig samengestelde en gecontroleerde lijst met grote Nederlandse banken (ABN AMRO, ING, Rabobank, SNS, ASN, Triodos, Knab, bunq, RegioBank, Achmea Bank); geeft `null` terug voor een ongeldige IBAN of een bank die niet in de lijst staat, in plaats van te gokken.

### Vestigingsnummer

- `isValidVestigingsnummer(value: string): boolean` — controleert of de invoer uit precies 12 cijfers bestaat.
  > Ook hiervoor publiceert de KVK geen checksum-algoritme — formaatcontrole only.

### Loonheffingennummer

- `isValidLoonheffingenNummer(value: string): boolean` — controleert de structuur BSN/RSIN (9 cijfers, elfproef) + `L` + 2-cijferig volgnummer (01-99), bv. `123456782L01`.
- `formatLoonheffingenNummer(value: string): string` — canonieke vorm, of gooit een error.

### Postcode

- `isValidDutchPostcode(value: string): boolean` — 4 cijfers (1000-9999) + 2 letters, met of zonder spatie. Sluit de door PostNL nooit uitgegeven combinaties `SS`, `SA`, `SD` uit.
- `formatDutchPostcode(value: string): string` — normaliseert naar `1234 AB`.

### Telefoonnummer

- `isValidDutchPhoneNumber(value: string): boolean` — nationaal (`0...`) of met `+31`/`0031` prefix, 10 cijfers. Formaatcontrole, geen controle tegen een netnummer-database.
- `isDutchMobileNumber(value: string): boolean` — `true` voor mobiele nummers (`06...`).
- `formatDutchPhoneNumber(value: string): string` — E.164-formaat, bv. `+31612345678`.

### Btw-berekening

- `VAT_RATES` — `{ STANDARD: 21, REDUCED: 9, ZERO: 0 }`.
- `calculateVatAmount(bedragExclBtw: number, tarief: number): number`
- `addVat(bedragExclBtw: number, tarief: number): number`
- `removeVat(bedragInclBtw: number, tarief: number): number`

Alle bedragen worden op hele centen afgerond.

### Euro-bedragen

- `formatEuro(bedrag: number): string` — formatteert als Nederlandse euro-string, bv. `1234.5` → `"€ 1.234,50"`, `-19.99` → `"-€ 19,99"`. Bewust handmatig geïmplementeerd (niet via `Intl.NumberFormat`) zodat de opmaak stabiel is, onafhankelijk van ICU/CLDR-versieverschillen tussen Node.js-versies.
- `parseEuroAmount(waarde: string): number` — parseert een Nederlandse euro-string (met of zonder `€`-teken) terug naar een getal. Gooit een error bij onherkenbare invoer.

## Licentie

MIT — gratis te gebruiken, ook commercieel.
