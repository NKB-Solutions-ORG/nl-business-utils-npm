import { describe, expect, it } from "vitest";
import { formatDutchPhoneNumber, isDutchMobileNumber, isValidDutchPhoneNumber } from "../src/phone.js";

describe("isValidDutchPhoneNumber", () => {
  it("accepts a national mobile number", () => {
    expect(isValidDutchPhoneNumber("0612345678")).toBe(true);
  });

  it("accepts a national landline number", () => {
    expect(isValidDutchPhoneNumber("0201234567")).toBe(true);
  });

  it("accepts numbers with common formatting characters", () => {
    expect(isValidDutchPhoneNumber("06-12345678")).toBe(true);
    expect(isValidDutchPhoneNumber("(020) 123 4567")).toBe(true);
  });

  it("accepts international prefixes", () => {
    expect(isValidDutchPhoneNumber("+31612345678")).toBe(true);
    expect(isValidDutchPhoneNumber("0031612345678")).toBe(true);
  });

  it("rejects the wrong number of digits", () => {
    expect(isValidDutchPhoneNumber("061234567")).toBe(false);
    expect(isValidDutchPhoneNumber("06123456789")).toBe(false);
  });

  it("rejects input without the national trunk prefix", () => {
    expect(isValidDutchPhoneNumber("612345678")).toBe(false);
  });
});

describe("isDutchMobileNumber", () => {
  it("distinguishes mobile from landline", () => {
    expect(isDutchMobileNumber("0612345678")).toBe(true);
    expect(isDutchMobileNumber("0201234567")).toBe(false);
  });
});

describe("formatDutchPhoneNumber", () => {
  it("returns E.164 format", () => {
    expect(formatDutchPhoneNumber("06-12345678")).toBe("+31612345678");
    expect(formatDutchPhoneNumber("020 123 4567")).toBe("+31201234567");
  });

  it("throws for an invalid number", () => {
    expect(() => formatDutchPhoneNumber("123")).toThrow();
  });
});
