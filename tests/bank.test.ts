import { describe, expect, it } from "vitest";
import { getDutchBankName } from "../src/bank.js";

describe("getDutchBankName", () => {
  it("returns the bank name for a known bank code", () => {
    expect(getDutchBankName("NL91ABNA0417164300")).toBe("ABN AMRO Bank N.V.");
  });

  it("is case- and whitespace-insensitive", () => {
    expect(getDutchBankName("nl91 abna 0417 1643 00")).toBe("ABN AMRO Bank N.V.");
  });

  it("returns null for an invalid IBAN", () => {
    expect(getDutchBankName("NL91ABNA0417164301")).toBeNull();
  });

  it("returns null for a valid IBAN whose bank code is not in the curated list", () => {
    // A synthetic (non-existent) but checksum-valid IBAN using bank code
    // "TEST", which is not a real Dutch bank identifier.
    expect(getDutchBankName("NL80TEST0000000001")).toBeNull();
  });
});
