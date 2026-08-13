export type JsonNodeType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null";

export interface JsonNode {
  type: JsonNodeType;
  key?: string;
  value?: unknown;
  children?: JsonNode[];
  startOffset: number;
  endOffset: number;
  lineStart: number;
  lineEnd: number;
  path: string;
  itemCount?: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
}

export interface DocumentStats {
  rootType: JsonNodeType | null;
  itemCount: number;
  size: number;
}
