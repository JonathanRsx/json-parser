import { describe, it, expect } from "vitest";
import { validateJson } from "./jsonValidator";

describe("validateJson", () => {
  it("valide un objet JSON correct", () => {
    const result = validateJson('{"name": "test"}');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("valide un array JSON correct", () => {
    const result = validateJson("[1, 2, 3]");
    expect(result.isValid).toBe(true);
  });

  it("valide un objet vide", () => {
    const result = validateJson("{}");
    expect(result.isValid).toBe(true);
  });

  it("valide un array vide", () => {
    const result = validateJson("[]");
    expect(result.isValid).toBe(true);
  });

  it("valide une chaîne comme racine", () => {
    const result = validateJson('"hello"');
    expect(result.isValid).toBe(true);
  });

  it("valide un nombre comme racine", () => {
    const result = validateJson("42");
    expect(result.isValid).toBe(true);
  });

  it("invalide un document vide", () => {
    const result = validateJson("");
    expect(result.isValid).toBe(false);
    expect(result.error?.message).toBe("Le document est vide.");
  });

  it("invalide un JSON mal formé", () => {
    const result = validateJson("{name: test}");
    expect(result.isValid).toBe(false);
    expect(result.error?.message).toBeDefined();
  });

  it("invalide une virgule en trop", () => {
    const result = validateJson('{"a": 1,}');
    expect(result.isValid).toBe(false);
  });

  it("invalide un JSON imbriqué mal fermé", () => {
    const result = validateJson('{"a": {"b": 1}');
    expect(result.isValid).toBe(false);
  });
});
