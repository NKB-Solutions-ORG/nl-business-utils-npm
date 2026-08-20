import { describe, expect, it } from "vitest";
import { VAT_RATES, addVat, calculateVatAmount, removeVat } from "../src/vat-calculator.js";

describe("VAT_RATES", () => {
  it("exposes the current Dutch rates", () => {
    expect(VAT_RATES.STANDARD).toBe(21);
    expect(VAT_RATES.REDUCED).toBe(9);
    expect(VAT_RATES.ZERO).toBe(0);
  });
});

describe("calculateVatAmount", () => {
  it("calculates the standard rate", () => {
    expect(calculateVatAmount(100, VAT_RATES.STANDARD)).toBe(21);
  });

  it("rounds to whole cents", () => {
    expect(calculateVatAmount(19.99, VAT_RATES.STANDARD)).toBe(4.2);
  });

  it("returns 0 for the zero rate", () => {
    expect(calculateVatAmount(100, VAT_RATES.ZERO)).toBe(0);
  });
});

describe("addVat", () => {
  it("adds the standard rate", () => {
    expect(addVat(100, VAT_RATES.STANDARD)).toBe(121);
  });

  it("adds the reduced rate", () => {
    expect(addVat(100, VAT_RATES.REDUCED)).toBe(109);
  });
});

describe("removeVat", () => {
  it("is the inverse of addVat for round amounts", () => {
    expect(removeVat(121, VAT_RATES.STANDARD)).toBe(100);
  });

  it("rounds to whole cents", () => {
    expect(removeVat(24.19, VAT_RATES.STANDARD)).toBe(19.99);
  });
});
