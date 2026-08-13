interface ToolbarProps {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  onClear: () => void;
  isValid: boolean;
}

export function Toolbar({
  onFormat,
  onMinify,
  onCopy,
  onClear,
  isValid,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={onFormat}
        disabled={!isValid}
        className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Formater le JSON"
      >
        Formater
      </button>

      <button
        type="button"
        onClick={onMinify}
        disabled={!isValid}
        className="px-3 py-1.5 text-sm font-medium bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Minifier le JSON"
      >
        Minifier
      </button>

      <button
        type="button"
        onClick={onCopy}
        className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
        aria-label="Copier le contenu"
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
