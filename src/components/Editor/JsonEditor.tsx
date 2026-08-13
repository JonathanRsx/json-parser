import { useCodeMirror } from "../../hooks/useCodeMirror";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onFoldAll: (fn: () => void) => void;
  onUnfoldAll: (fn: () => void) => void;
}

export function JsonEditor({
  value,
  onChange,
  onFoldAll,
  onUnfoldAll,
}: JsonEditorProps) {
  const { containerRef, foldAllNodes, unfoldAllNodes } = useCodeMirror({
    value,
    onChange,
  });

  // Expose fold/unfold to parent
  onFoldAll(foldAllNodes);
  onUnfoldAll(unfoldAllNodes);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 border border-gray-200 rounded-lg overflow-hidden"
    />
  );
}
