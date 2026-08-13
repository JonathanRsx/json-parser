import type { ValidationResult, DocumentStats } from "../../features/json";

interface ValidationStatusProps {
  validation: ValidationResult;
  stats: DocumentStats | null;
}

export function ValidationStatus({
  validation,
  stats,
}: ValidationStatusProps) {
  if (validation.isValid) {
    return (
      <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <span
          className="w-3 h-3 rounded-full bg-green-500 shrink-0"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium text-green-800">JSON valide</span>
          {stats && (
            <>
              <span className="text-gray-600">
                Type : <strong>{stats.rootType}</strong>
              </span>
              <span className="text-gray-600">
                Éléments : <strong>{stats.itemCount}</strong>
              </span>
              <span className="text-gray-600">
                Taille : <strong>{formatSize(stats.size)}</strong>
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <span
        className="w-3 h-3 mt-0.5 rounded-full bg-red-500 shrink-0"
        aria-hidden="true"
      />
      <div className="text-sm">
        <span className="font-medium text-red-800">JSON invalide</span>
        {validation.error && (
          <p className="text-red-700 mt-1">
            {validation.error.message}
            {validation.error.line && (
              <span className="ml-2 text-red-500">
                (ligne {validation.error.line}
                {validation.error.column && `, colonne ${validation.error.column}`})
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} octets`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
