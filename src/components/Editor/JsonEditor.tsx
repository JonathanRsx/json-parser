import { useEffect, type RefObject } from "react";
import { type EditorView } from "@codemirror/view";
import { useCodeMirror } from "../../hooks/useCodeMirror";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  editorViewRef: RefObject<EditorView | null>;
  onSelectionChange?: () => void;
}

export function JsonEditor({
  value,
  onChange,
  editorViewRef,
  onSelectionChange,
}: JsonEditorProps) {
  const { containerRef, viewRef } = useCodeMirror({
    value,
    onChange,
    onSelectionChange,
  });

  useEffect(() => {
    (editorViewRef as { current: EditorView | null }).current = viewRef.current;
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 border border-gray-200 rounded-lg overflow-hidden"
    />
  );
}
