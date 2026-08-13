interface SearchBarProps {
  query: string;
  caseSensitive: boolean;
  matchCount: { current: number; total: number };
  onQueryChange: (query: string) => void;
  onCaseSensitiveChange: (value: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function SearchBar({
  query,
  caseSensitive,
  matchCount,
  onQueryChange,
  onCaseSensitiveChange,
  onNext,
  onPrevious,
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
        placeholder="Rechercher…"
        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded bg-white min-w-48"
        aria-label="Rechercher dans le JSON"
      />

      <button
        type="button"
        onClick={onPrevious}
        disabled={matchCount.total === 0}
        className="p-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Occurrence précédente"
      >
        ▲
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={matchCount.total === 0}
        className="p-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Occurrence suivante"
      >
        ▼
      </button>

      <span className="text-xs text-gray-500 min-w-16 text-center">
        {query
          ? matchCount.total > 0
            ? `${matchCount.current} / ${matchCount.total}`
            : "Aucun résultat"
          : ""}
      </span>

      <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => onCaseSensitiveChange(e.target.checked)}
          className="rounded"
        />
        Aa
      </label>
    </div>
  );
}
