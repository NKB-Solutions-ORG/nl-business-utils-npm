import { describe, expect, it } from "vitest";
import { formatLoonheffingenNummer, isValidLoonheffingenNummer } from "../src/loonheffingennummer.js";

describe("isValidLoonheffingenNummer", () => {
  it("accepts a well-formed number based on a valid RSIN/BSN", () => {
    expect(isValidLoonheffingenNummer("123456782L01")).toBe(true);
  });

  it("accepts lowercase and loosely formatted input", () => {
    expect(isValidLoonheffingenNummer("123456782 l01")).toBe(true);
  });

  it("accepts higher sequence numbers", () => {
    expect(isValidLoonheffingenNummer("123456782L02")).toBe(true);
  });

  it("rejects a number whose 9 digit part fails the elfproef", () => {
    expect(isValidLoonheffingenNummer("123456789L01")).toBe(false);
  });

  it("rejects a sequence number of 00", () => {
    expect(isValidLoonheffingenNummer("123456782L00")).toBe(false);
  });

  it("rejects the wrong overall structure", () => {
    expect(isValidLoonheffingenNummer("12345678L01")).toBe(false);
    expect(isValidLoonheffingenNummer("123456782B01")).toBe(false);
  });
});

describe("formatLoonheffingenNummer", () => {
  it("returns the canonical uppercase form", () => {
    expect(formatLoonheffingenNummer("123456782l01")).toBe("123456782L01");
  });

  it("throws for an invalid number", () => {
    expect(() => formatLoonheffingenNummer("123456789L01")).toThrow();
  });
});
