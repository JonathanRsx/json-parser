import { describe, it, expect } from "vitest";
import { formatJson, minifyJson } from "./jsonFormatter";

describe("formatJson", () => {
  it("formate avec 2 espaces", () => {
    const input = '{"a":1,"b":2}';
    const result = formatJson(input);
    expect(result).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it("formate un array", () => {
    const input = "[1,2,3]";
    const result = formatJson(input);
    expect(result).toBe("[\n  1,\n  2,\n  3\n]");
  });

  it("retourne null pour un JSON invalide", () => {
    const result = formatJson("{invalid}");
    expect(result).toBeNull();
  });

  it("formate un JSON imbriqué", () => {
    const input = '{"a":{"b":{"c":1}}}';
    const result = formatJson(input);
    expect(result).toContain("    ");
    expect(result).toContain('"c": 1');
  });
});

describe("minifyJson", () => {
  it("minifie un JSON formaté", () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    const result = minifyJson(input);
    expect(result).toBe('{"a":1,"b":2}');
  });

  it("retourne null pour un JSON invalide", () => {
    const result = minifyJson("{invalid}");
    expect(result).toBeNull();
  });

  it("minifie un array", () => {
    const input = "[\n  1,\n  2,\n  3\n]";
    const result = minifyJson(input);
    expect(result).toBe("[1,2,3]");
  });
});
