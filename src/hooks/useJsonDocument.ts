import { useState, useCallback, useMemo } from "react";
import {
  validateJson,
  formatJson,
  minifyJson,
  getDocumentStats,
} from "../features/json";
import type { ValidationResult, DocumentStats } from "../features/json";

const DEFAULT_JSON = `{
  "nom": "JSON Parser",
  "version": "1.0.0",
  "fonctionnalités": [
    "Validation",
    "Formatage",
    "Minification",
    "Coloration syntaxique",
    "Pliage"
  ],
  "local": true
}`;

export function useJsonDocument() {
  const [rawText, setRawText] = useState(DEFAULT_JSON);

  const validation: ValidationResult = useMemo(
    () => validateJson(rawText),
    [rawText],
  );

  const stats: DocumentStats | null = useMemo(
    () => (validation.isValid ? getDocumentStats(rawText) : null),
    [rawText, validation.isValid],
  );

  const handleFormat = useCallback(() => {
    const result = formatJson(rawText);
    if (result !== null) {
      setRawText(result);
    }
  }, [rawText]);

  const handleMinify = useCallback(() => {
    const result = minifyJson(rawText);
    if (result !== null) {
      setRawText(result);
    }
  }, [rawText]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(rawText);
  }, [rawText]);

  const handleClear = useCallback(() => {
    setRawText("");
  }, []);

  return {
    rawText,
    setRawText,
    validation,
    stats,
    handleFormat,
    handleMinify,
    handleCopy,
    handleClear,
  };
}
