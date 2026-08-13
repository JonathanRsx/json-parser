import { describe, it, expect } from "vitest";
import { searchInTree } from "./jsonSearch";
import { analyzeJson } from "./jsonAnalyzer";

function buildTree(json: string) {
  return analyzeJson(json)!;
}

describe("searchInTree", () => {
  const sampleJson = '{"name": "Alice", "age": 30, "city": "Paris"}';

  it("recherche dans les clés", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "name", "keys");
    expect(results.length).toBe(1);
    expect(results[0].path).toBe("$.name");
  });

  it("recherche dans les valeurs", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "alice", "values");
    expect(results.length).toBe(1);
    expect(results[0].path).toBe("$.name");
  });

  it("recherche insensible à la casse par défaut", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "ALICE", "values", false);
    expect(results.length).toBe(1);
  });

  it("recherche sensible à la casse", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "ALICE", "values", true);
    expect(results.length).toBe(0);
  });

  it("recherche par expression régulière", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "^Ali", "regex");
    expect(results.length).toBe(1);
    expect(results[0].path).toBe("$.name");
  });

  it("recherche en mode texte (clés et valeurs)", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "a", "text");
    // "name" key, "Alice" value, "age" key, "Paris" value
    expect(results.length).toBeGreaterThanOrEqual(3);
  });

  it("retourne vide pour une requête vide", () => {
    const tree = buildTree(sampleJson);
    const results = searchInTree(tree, "", "text");
    expect(results.length).toBe(0);
  });

  it("recherche dans un JSON imbriqué", () => {
    const tree = buildTree('{"users": [{"name": "Bob"}]}');
    const results = searchInTree(tree, "bob", "values");
    expect(results.length).toBe(1);
    expect(results[0].path).toBe("$.users[0].name");
  });
});
