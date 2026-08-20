import { describe, expect, it } from "vitest";
import { isValidRsin, normalizeRsin } from "../src/rsin.js";

describe("isValidRsin", () => {
  it("accepts known-valid RSINs (same elfproef as BSN)", () => {
    expect(isValidRsin("123456782")).toBe(true);
    expect(isValidRsin("111222333")).toBe(true);
  });

  it("rejects a number that fails the elfproef", () => {
    expect(isValidRsin("123456789")).toBe(false);
  });

  it("rejects wrong lengths and non-digit characters", () => {
    expect(isValidRsin("12345")).toBe(false);
    expect(isValidRsin("12345678A")).toBe(false);
  });
});

describe("normalizeRsin", () => {
  it("returns the 9 digit canonical form", () => {
    expect(normalizeRsin("123456782")).toBe("123456782");
  });

  it("throws for an invalid RSIN", () => {
    expect(() => normalizeRsin("123456789")).toThrow();
  });
});
