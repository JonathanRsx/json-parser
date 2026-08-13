import { useState, useCallback, useMemo } from "react";
import { validateJson, formatJson, getDocumentStats } from "../features/json";
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

  const handleTextChange = useCallback((text: string) => {
    const formatted = formatJson(text);
    setRawText(formatted ?? text);
  }, []);

  const validation: ValidationResult = useMemo(
    () => validateJson(rawText),
    [rawText],
  );

  const stats: DocumentStats | null = useMemo(
    () => (validation.isValid ? getDocumentStats(rawText) : null),
    [rawText, validation.isValid],
  );

  const handleCopy = useCallback(async () => {
    const formatted = formatJson(rawText);
    const textToCopy = formatted ?? rawText;
    if (formatted !== null) {
      setRawText(formatted);
    }
    await navigator.clipboard.writeText(textToCopy);
  }, [rawText]);

  const handleClear = useCallback(() => {
    setRawText("");
  }, []);

  return {
    rawText,
    setRawText: handleTextChange,
    validation,
    stats,
    handleCopy,
    handleClear,
  };
}
