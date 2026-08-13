import { parseTree, type Node } from "jsonc-parser";
import type { DocumentStats, JsonNode, JsonNodeType } from "./jsonTypes";

export function analyzeJson(text: string): JsonNode | null {
  const tree = parseTree(text);
  if (!tree) return null;
  return convertNode(tree, "$", text);
}

export function getDocumentStats(text: string): DocumentStats | null {
  try {
    const parsed = JSON.parse(text);
    const rootType = getJsonType(parsed);
    const itemCount =
      rootType === "object"
        ? Object.keys(parsed).length
        : rootType === "array"
          ? parsed.length
          : 0;
    return {
      rootType,
      itemCount,
      size: new Blob([text]).size,
    };
  } catch {
    return null;
  }
}

function getJsonType(value: unknown): JsonNodeType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "object";
  }
}

function convertNode(node: Node, path: string, text: string): JsonNode {
  const lines = text.substring(0, node.offset).split("\n");
  const lineStart = lines.length;
  const endLines = text.substring(0, node.offset + node.length).split("\n");
  const lineEnd = endLines.length;

  const type = mapNodeType(node.type);
  const result: JsonNode = {
    type,
    startOffset: node.offset,
    endOffset: node.offset + node.length,
    lineStart,
    lineEnd,
    path,
  };

  if (node.children) {
    if (type === "object") {
      result.itemCount = node.children.length;
      result.children = node.children.map((prop) => {
        const key = prop.children?.[0]?.value as string;
        const valueNode = prop.children?.[1];
        if (valueNode) {
          const child = convertNode(valueNode, `${path}.${key}`, text);
          child.key = key;
          return child;
        }
        return convertNode(prop, `${path}.${key}`, text);
      });
    } else if (type === "array") {
      result.itemCount = node.children.length;
      result.children = node.children.map((child, i) =>
        convertNode(child, `${path}[${i}]`, text),
      );
    }
  }

  if (type !== "object" && type !== "array") {
    result.value = node.value;
  }

  return result;
}

function mapNodeType(type: string): JsonNodeType {
  switch (type) {
    case "object":
      return "object";
    case "array":
      return "array";
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    default:
      return "string";
  }
}
