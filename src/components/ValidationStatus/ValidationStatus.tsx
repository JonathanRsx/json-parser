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
      <div className="flex items-center gap-3 p-3 bg-lime-50 border border-lime-300 mx-2">
        <span
          className="w-2 h-2 rounded-full bg-lime-500 shrink-0"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium text-lime-800">Valid JSON</span>
          {stats && (
            <>
              <span className="text-gray-600">
                Type: <strong>{stats.rootType}</strong>
              </span>
              <span className="text-gray-600">
                Elements: <strong>{stats.itemCount}</strong>
              </span>
              <span className="text-gray-600">
                Size: <strong>{formatSize(stats.size)}</strong>
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 mx-2">
      <span
        className="w-2 h-2 mt-0.5 rounded-full bg-red-500 shrink-0"
        aria-hidden="true"
      />
      <div className="text-sm">
        <span className="font-medium text-red-800">Invalid JSON</span>
        {validation.error && (
          <p className="text-red-700 mt-1">
            {validation.error.message}
            {/* {validation.error.line && (
              <span className="ml-2 text-red-500">
                (line {validation.error.line}
                {validation.error.column && `, column ${validation.error.column}`})
              </span>
            )} */}
          </p>
        )}
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
