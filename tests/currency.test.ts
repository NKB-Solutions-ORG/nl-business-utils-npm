import { describe, expect, it } from "vitest";
import { formatEuro, parseEuroAmount } from "../src/currency.js";

describe("formatEuro", () => {
  it("formats a plain amount", () => {
    expect(formatEuro(1234.56)).toBe("€ 1.234,56");
  });

  it("formats zero", () => {
    expect(formatEuro(0)).toBe("€ 0,00");
  });

  it("formats negative amounts", () => {
    expect(formatEuro(-19.99)).toBe("-€ 19,99");
  });

  it("inserts multiple thousand separators", () => {
    expect(formatEuro(1000000)).toBe("€ 1.000.000,00");
  });

  it("pads a whole amount to 2 decimals", () => {
    expect(formatEuro(5)).toBe("€ 5,00");
  });

  it("rounds to whole cents", () => {
    expect(formatEuro(19.995)).toBe("€ 20,00");
  });
});

describe("parseEuroAmount", () => {
  it("parses a formatted euro string", () => {
    expect(parseEuroAmount("€ 1.234,56")).toBe(1234.56);
  });

  it("parses a negative amount", () => {
    expect(parseEuroAmount("-€ 19,99")).toBe(-19.99);
  });

  it("parses input without the euro sign or thousand separators", () => {
    expect(parseEuroAmount("1234,56")).toBe(1234.56);
  });

  it("round-trips with formatEuro", () => {
    expect(parseEuroAmount(formatEuro(987654.32))).toBe(987654.32);
  });

  it("throws for unparseable input", () => {
    expect(() => parseEuroAmount("not an amount")).toThrow();
  });
});
