import { describe, expect, it } from "vitest";
import { isValidVestigingsnummer } from "../src/vestigingsnummer.js";

describe("isValidVestigingsnummer", () => {
  it("accepts a 12 digit number", () => {
    expect(isValidVestigingsnummer("123456789012")).toBe(true);
  });

  it("tolerates surrounding whitespace", () => {
    expect(isValidVestigingsnummer("  123456789012  ")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isValidVestigingsnummer("12345678901")).toBe(false);
    expect(isValidVestigingsnummer("1234567890123")).toBe(false);
  });

  it("rejects non-digit characters", () => {
    expect(isValidVestigingsnummer("12345678901A")).toBe(false);
  });
});
