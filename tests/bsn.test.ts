import { describe, expect, it } from "vitest";
import { isValidBsn, normalizeBsn } from "../src/bsn.js";

describe("isValidBsn", () => {
  it("accepts known-valid 9 digit BSNs", () => {
    expect(isValidBsn("123456782")).toBe(true);
    expect(isValidBsn("111222333")).toBe(true);
  });

  it("accepts a valid 8 digit BSN by zero-padding", () => {
    // "012345672" passes the elfproef; the 8 digit form omits the leading zero.
    expect(isValidBsn("12345672")).toBe(true);
    expect(isValidBsn("012345672")).toBe(true);
  });

  it("rejects a number that fails the elfproef", () => {
    expect(isValidBsn("123456789")).toBe(false);
  });

  it("rejects all-zero input", () => {
    expect(isValidBsn("000000000")).toBe(false);
  });

  it("rejects wrong lengths and non-digit characters", () => {
    expect(isValidBsn("12345")).toBe(false);
    expect(isValidBsn("1234567890")).toBe(false);
    expect(isValidBsn("12345678A")).toBe(false);
  });

  it("tolerates surrounding whitespace", () => {
    expect(isValidBsn("  123456782  ")).toBe(true);
  });
});

describe("normalizeBsn", () => {
  it("returns the 9 digit canonical form", () => {
    expect(normalizeBsn("123456782")).toBe("123456782");
  });

  it("throws for an invalid BSN", () => {
    expect(() => normalizeBsn("123456789")).toThrow();
  });
});
