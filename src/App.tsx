import { useRef } from "react";
import { type EditorView } from "@codemirror/view";
import { JsonEditor } from "./components/Editor/JsonEditor";
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
      <main className="flex-1 flex flex-col gap-3 min-h-0 pt-4 pb-2">
        <SearchBar
          query={query}
          caseSensitive={caseSensitive}
          matchCount={matchCount}
          onQueryChange={handleQueryChange}
          onCaseSensitiveChange={handleCaseSensitiveChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onCopy={handleCopy}
          onClear={handleClear}
        />

        <JsonEditor
          value={rawText}
          onChange={setRawText}
          onViewReady={(view) => {
            editorViewRef.current = view;
          }}
          onSelectionChange={notifyChange}
        />

        <ValidationStatus validation={validation} stats={stats} />
      </main>
      <footer className="px-4 pb-2 text-xs text-gray-400 text-center">
        Made by Jororso @{new Date().getFullYear()} - Processing 100% local, no data is sent to any server
      </footer>
    </div>
  );
}
