import { useState } from "react";
import { Button, Input, Checkbox } from "../ui";

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "up" ? "rotate-180" : undefined}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

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
  const [copied, setCopied] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        onPrevious();
      } else {
        onNext();
      }
    }
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2 items-center px-4">
      <h1 className="text-lg font-semibold mr-4">JSON Parser</h1>
      <Input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search…"
        className="flex-1 min-w-48 w-full"
        aria-label="Search in JSON"
      />

      <Checkbox
        label="Aa"
        checked={caseSensitive}
        onChange={(e) => onCaseSensitiveChange(e.target.checked)}
      />
      <Button
        variant="secondary"
        size="icon"
        onClick={onPrevious}
        disabled={matchCount.total === 0}
        aria-label="Previous occurrence"
      >
        <ChevronIcon direction="up" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onNext}
        disabled={matchCount.total === 0}
        aria-label="Next occurrence"
      >
        <ChevronIcon direction="down" />
      </Button>

      <span className="text-xs text-gray-500 min-w-16 text-center">
        {query
          ? matchCount.total > 0
            ? `${matchCount.current} / ${matchCount.total}`
            : "No results"
          : ""}
      </span>

      <Button
        variant="primary"
        onClick={handleCopy}
        aria-label="Copy formatted content"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>

      <Button
        variant="secondary"
        onClick={onClear}
        aria-label="Clear content"
      >
        Clear
      </Button>
    </div>
  );
}
