import { describe, expect, it } from "vitest";
import { formatDutchPostcode, isValidDutchPostcode } from "../src/postcode.js";

describe("isValidDutchPostcode", () => {
  it("accepts a well-formed postcode with and without a space", () => {
    expect(isValidDutchPostcode("1234 AB")).toBe(true);
    expect(isValidDutchPostcode("1234AB")).toBe(true);
    expect(isValidDutchPostcode("1234ab")).toBe(true);
  });

  it("rejects a leading zero", () => {
    expect(isValidDutchPostcode("0123 AB")).toBe(false);
  });

  it("rejects reserved letter combinations", () => {
    expect(isValidDutchPostcode("1234 SS")).toBe(false);
    expect(isValidDutchPostcode("1234 SA")).toBe(false);
    expect(isValidDutchPostcode("1234 SD")).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(isValidDutchPostcode("1234 A")).toBe(false);
    expect(isValidDutchPostcode("ABCD EF")).toBe(false);
  });
});

describe("formatDutchPostcode", () => {
  it("normalizes casing and spacing", () => {
    expect(formatDutchPostcode("1234ab")).toBe("1234 AB");
    expect(formatDutchPostcode("1234   ab")).toBe("1234 AB");
  });

  it("throws for an invalid postcode", () => {
    expect(() => formatDutchPostcode("1234 SS")).toThrow();
  });
});
