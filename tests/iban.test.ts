import { describe, expect, it } from "vitest";
import { formatIban, isValidDutchIban } from "../src/iban.js";

describe("isValidDutchIban", () => {
  it("accepts a well-known valid Dutch IBAN", () => {
    expect(isValidDutchIban("NL91ABNA0417164300")).toBe(true);
  });

  it("accepts the same IBAN with spaces and lowercase letters", () => {
    expect(isValidDutchIban("nl91 abna 0417 1643 00")).toBe(true);
  });

  it("rejects a mistyped checksum digit", () => {
    expect(isValidDutchIban("NL91ABNA0417164301")).toBe(false);
  });

  it("rejects a non-Dutch IBAN", () => {
    expect(isValidDutchIban("DE89370400440532013000")).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(isValidDutchIban("NL91ABNA041716430")).toBe(false);
    expect(isValidDutchIban("not an iban")).toBe(false);
  });
});

describe("formatIban", () => {
  it("groups the IBAN into blocks of four", () => {
    expect(formatIban("nl91abna0417164300")).toBe("NL91 ABNA 0417 1643 00");
  });

  it("throws for an invalid IBAN", () => {
    expect(() => formatIban("NL91ABNA0417164301")).toThrow();
  });
});
