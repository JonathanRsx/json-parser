import type { ValidationResult } from "./jsonTypes";

export function validateJson(text: string): ValidationResult {
  if (text.trim() === "") {
    return { isValid: false, error: { message: "Le document est vide." } };
  }

  try {
    JSON.parse(text);
    return { isValid: true };
  } catch (e) {
    const error = e as SyntaxError;
    const { line, column } = extractPosition(error.message);
    return {
      isValid: false,
      error: {
        message: error.message,
        line,
        column,
      },
    };
  }
}

function extractPosition(message: string): {
  line?: number;
  column?: number;
} {
  // Most engines: "... at position X" or "... at line Y column Z"
  const lineColMatch = message.match(/line (\d+) column (\d+)/i);
  if (lineColMatch) {
    return {
      line: parseInt(lineColMatch[1], 10),
      column: parseInt(lineColMatch[2], 10),
    };
  }

  const posMatch = message.match(/position (\d+)/i);
  if (posMatch) {
    return { column: parseInt(posMatch[1], 10) };
  }

  return {};
}
