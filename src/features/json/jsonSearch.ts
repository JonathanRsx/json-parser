import type { JsonNode } from "./jsonTypes";

export interface SearchResult {
  path: string;
  key?: string;
  value?: unknown;
  line: number;
}

export type SearchMode = "text" | "keys" | "values" | "path" | "regex";

export function searchInTree(
  node: JsonNode,
  query: string,
  mode: SearchMode = "text",
  caseSensitive: boolean = false,
): SearchResult[] {
  if (!query) return [];

  const results: SearchResult[] = [];
  const normalizedQuery = caseSensitive ? query : query.toLowerCase();

  traverseNode(node, normalizedQuery, mode, caseSensitive, results);
  return results;
}

function traverseNode(
  node: JsonNode,
  query: string,
  mode: SearchMode,
  caseSensitive: boolean,
  results: SearchResult[],
) {
  const matches = doesNodeMatch(node, query, mode, caseSensitive);
  if (matches) {
    results.push({
      path: node.path,
      key: node.key,
      value: node.value,
      line: node.lineStart,
    });
  }

  if (node.children) {
    for (const child of node.children) {
      traverseNode(child, query, mode, caseSensitive, results);
    }
  }
}

function doesNodeMatch(
  node: JsonNode,
  query: string,
  mode: SearchMode,
  caseSensitive: boolean,
): boolean {
  switch (mode) {
    case "keys":
      return matchString(node.key, query, caseSensitive);
    case "values":
      if (node.type === "object" || node.type === "array") return false;
      return matchString(String(node.value ?? ""), query, caseSensitive);
    case "path":
      return matchString(node.path, query, caseSensitive);
    case "regex": {
      try {
        const flags = caseSensitive ? "" : "i";
        const regex = new RegExp(query, flags);
        const keyMatch = node.key ? regex.test(node.key) : false;
        const valueMatch =
          node.value !== undefined ? regex.test(String(node.value)) : false;
        return keyMatch || valueMatch;
      } catch {
        return false;
      }
    }
    case "text":
    default: {
      const keyMatch = matchString(node.key, query, caseSensitive);
      const valueMatch =
        node.value !== undefined
          ? matchString(String(node.value), query, caseSensitive)
          : false;
      return keyMatch || valueMatch;
    }
  }
}

function matchString(
  value: string | undefined,
  query: string,
  caseSensitive: boolean,
): boolean {
  if (value === undefined) return false;
  const normalized = caseSensitive ? value : value.toLowerCase();
  return normalized.includes(query);
}
