import { describe, expect, it } from "vitest";
import { isValidKvkNumber } from "../src/kvk.js";

describe("isValidKvkNumber", () => {
  it("accepts an 8 digit number", () => {
    expect(isValidKvkNumber("12345678")).toBe(true);
  });

  it("tolerates surrounding whitespace", () => {
    expect(isValidKvkNumber("  12345678  ")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isValidKvkNumber("1234567")).toBe(false);
    expect(isValidKvkNumber("123456789")).toBe(false);
  });

  it("rejects non-digit characters", () => {
    expect(isValidKvkNumber("1234567A")).toBe(false);
  });
});
