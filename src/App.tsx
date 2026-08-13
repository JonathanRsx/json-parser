import { useRef } from "react";
import { type EditorView } from "@codemirror/view";
import { JsonEditor } from "./components/Editor/JsonEditor";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { SearchBar } from "./components/SearchPanel/SearchBar";
import { ValidationStatus } from "./components/ValidationStatus/ValidationStatus";
import { useJsonDocument } from "./hooks/useJsonDocument";
import { useEditorSearch } from "./hooks/useEditorSearch";

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

  const editorViewRef = useRef<EditorView | null>(null);

  const {
    query,
    caseSensitive,
    matchCount,
    handleQueryChange,
    handleCaseSensitiveChange,
    handleNext,
    handlePrevious,
    notifyChange,
  } = useEditorSearch(editorViewRef);

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
          isValid={validation.isValid}
        />

        <SearchBar
          query={query}
          caseSensitive={caseSensitive}
          matchCount={matchCount}
          onQueryChange={handleQueryChange}
          onCaseSensitiveChange={handleCaseSensitiveChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        <JsonEditor
          value={rawText}
          onChange={setRawText}
          editorViewRef={editorViewRef}
          onSelectionChange={notifyChange}
        />

        <ValidationStatus validation={validation} stats={stats} />
      </main>
    </div>
  );
}
