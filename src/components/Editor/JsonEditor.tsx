import { useEffect } from "react";
import { type EditorView } from "@codemirror/view";
import { useCodeMirror } from "../../hooks/useCodeMirror";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onViewReady?: (view: EditorView | null) => void;
  onSelectionChange?: () => void;
}

export function JsonEditor({
  value,
  onChange,
  onViewReady,
  onSelectionChange,
}: JsonEditorProps) {
  const { containerRef, viewRef } = useCodeMirror({
    value,
    onChange,
    onSelectionChange,
  });

  useEffect(() => {
    onViewReady?.(viewRef.current);
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 border border-gray-200 overflow-hidden"
    />
  );
}
