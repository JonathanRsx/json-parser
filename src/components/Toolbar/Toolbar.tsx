interface ToolbarProps {
  onCopy: () => void;
  onClear: () => void;
}

export function Toolbar({ onCopy, onClear }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={onCopy}
        className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Copier le contenu formaté"
      >
        Copier
      </button>

      <button
        type="button"
        onClick={onClear}
        className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
        aria-label="Effacer le contenu"
      >
        Effacer
      </button>
    </div>
  );
}
