interface SearchBarProps {
  query: string;
  caseSensitive: boolean;
  matchCount: { current: number; total: number };
  onQueryChange: (query: string) => void;
  onCaseSensitiveChange: (value: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onCopy: () => void;
  onClear: () => void;
}

export function SearchBar({
  query,
  caseSensitive,
  matchCount,
  onQueryChange,
  onCaseSensitiveChange,
  onNext,
  onPrevious,
  onCopy,
  onClear,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        onPrevious();
      } else {
        onNext();
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search…"
        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded bg-white min-w-48"
        aria-label="Search in JSON"
      />

      <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => onCaseSensitiveChange(e.target.checked)}
          className="rounded"
        />
        Aa
      </label>
      <button
        type="button"
        onClick={onPrevious}
        disabled={matchCount.total === 0}
        className="p-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous occurrence"
      >
        ▲
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={matchCount.total === 0}
        className="p-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next occurrence"
      >
        ▼
      </button>

      <span className="text-xs text-gray-500 min-w-16 text-center">
        {query
            ? matchCount.total > 0
            ? `${matchCount.current} / ${matchCount.total}`
            : "No results"
          : ""}
      </span>


      <div className="flex-1" />

      <button
        type="button"
        onClick={onCopy}
        className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Copy formatted content"
      >
        Copy
      </button>

      <button
        type="button"
        onClick={onClear}
        className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
        aria-label="Clear content"
      >
        Clear
      </button>
    </div>
  );
}
