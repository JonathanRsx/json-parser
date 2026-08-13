import { useRef, useCallback } from "react";
import { JsonEditor } from "./components/Editor/JsonEditor";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { ValidationStatus } from "./components/ValidationStatus/ValidationStatus";
import { useJsonDocument } from "./hooks/useJsonDocument";

export default function App() {
  const {
    rawText,
    setRawText,
    validation,
    stats,
    handleFormat,
    handleMinify,
    handleCopy,
    handleClear,
  } = useJsonDocument();

  const foldAllRef = useRef<() => void>(() => {});
  const unfoldAllRef = useRef<() => void>(() => {});

  const registerFoldAll = useCallback((fn: () => void) => {
    foldAllRef.current = fn;
  }, []);
  const registerUnfoldAll = useCallback((fn: () => void) => {
    unfoldAllRef.current = fn;
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white text-gray-900">
      <header className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">JSON Parser</h1>
          <span className="text-xs text-gray-400">
            Traitement 100 % local — aucune donnée envoyée au serveur
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-3 p-4 min-h-0">
        <Toolbar
          onFormat={handleFormat}
          onMinify={handleMinify}
          onCopy={handleCopy}
          onClear={handleClear}
          onFoldAll={() => foldAllRef.current()}
          onUnfoldAll={() => unfoldAllRef.current()}
          isValid={validation.isValid}
        />

        <JsonEditor
          value={rawText}
          onChange={setRawText}
          onFoldAll={registerFoldAll}
          onUnfoldAll={registerUnfoldAll}
        />

        <ValidationStatus validation={validation} stats={stats} />
      </main>
    </div>
  );
}
