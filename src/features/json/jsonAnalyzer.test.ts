import { describe, it, expect } from "vitest";
import { analyzeJson, getDocumentStats } from "./jsonAnalyzer";

describe("analyzeJson", () => {
  it("analyse un objet simple", () => {
    const node = analyzeJson('{"name": "test", "age": 30}');
    expect(node).not.toBeNull();
    expect(node!.type).toBe("object");
    expect(node!.path).toBe("$");
    expect(node!.itemCount).toBe(2);
  });

  it("analyse un array", () => {
    const node = analyzeJson("[1, 2, 3]");
    expect(node).not.toBeNull();
    expect(node!.type).toBe("array");
    expect(node!.itemCount).toBe(3);
  });

  it("génère les chemins corrects", () => {
    const node = analyzeJson('{"users": [{"name": "Alice"}]}');
    expect(node).not.toBeNull();
    const users = node!.children![0];
    expect(users.path).toBe("$.users");
    expect(users.children![0].path).toBe("$.users[0]");
    expect(users.children![0].children![0].path).toBe("$.users[0].name");
  });

  it("compte les éléments d'un array imbriqué", () => {
    const node = analyzeJson('{"items": [1, 2, 3, 4]}');
    const items = node!.children![0];
    expect(items.type).toBe("array");
    expect(items.itemCount).toBe(4);
  });

  it("retourne un arbre partiel pour un JSON invalide (jsonc-parser est tolérant)", () => {
    const node = analyzeJson("{invalid");
    // jsonc-parser is lenient and returns partial trees
    expect(node).not.toBeNull();
  });
});

describe("getDocumentStats", () => {
  it("retourne les stats d'un objet", () => {
    const stats = getDocumentStats('{"a": 1, "b": 2}');
    expect(stats).not.toBeNull();
    expect(stats!.rootType).toBe("object");
    expect(stats!.itemCount).toBe(2);
    expect(stats!.size).toBeGreaterThan(0);
  });

  it("retourne les stats d'un array", () => {
    const stats = getDocumentStats("[1, 2, 3]");
    expect(stats).not.toBeNull();
    expect(stats!.rootType).toBe("array");
    expect(stats!.itemCount).toBe(3);
  });

  it("retourne null pour un JSON invalide", () => {
    const stats = getDocumentStats("{bad}");
    expect(stats).toBeNull();
  });
});
