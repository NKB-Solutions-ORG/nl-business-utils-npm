import { describe, expect, it } from "vitest";
import { formatVatNumber, hasValidVatNumberLegacyChecksum, isValidVatNumberFormat } from "../src/vat.js";

describe("isValidVatNumberFormat", () => {
  it("accepts a well-formed VAT number", () => {
    expect(isValidVatNumberFormat("NL123456782B01")).toBe(true);
  });

  it("accepts lowercase and loosely formatted input", () => {
    expect(isValidVatNumberFormat("nl 123456782 b01")).toBe(true);
  });

  it("rejects the wrong country prefix", () => {
    expect(isValidVatNumberFormat("DE123456782B01")).toBe(false);
  });

  it("rejects a branch number of 00", () => {
    expect(isValidVatNumberFormat("NL123456782B00")).toBe(false);
  });

  it("rejects the wrong overall structure", () => {
    expect(isValidVatNumberFormat("NL12345678B01")).toBe(false);
    expect(isValidVatNumberFormat("NL123456782A01")).toBe(false);
  });
});

describe("hasValidVatNumberLegacyChecksum", () => {
  it("passes for a pre-2020 BSN-derived number", () => {
    expect(hasValidVatNumberLegacyChecksum("NL123456782B01")).toBe(true);
  });

  it("fails for a number whose digits do not satisfy the elfproef", () => {
    // Format-valid, but the 9 digit segment fails the elfproef - this is
    // the expected shape of a post-2020 sole-trader VAT number.
    expect(hasValidVatNumberLegacyChecksum("NL123456789B01")).toBe(false);
  });
});

describe("formatVatNumber", () => {
  it("returns the canonical uppercase form", () => {
    expect(formatVatNumber("nl123456782b01")).toBe("NL123456782B01");
  });

  it("throws for an invalid format", () => {
    expect(() => formatVatNumber("DE123456782B01")).toThrow();
  });
});
