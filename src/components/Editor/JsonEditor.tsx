import { useCodeMirror } from "../../hooks/useCodeMirror";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function JsonEditor({ value, onChange }: JsonEditorProps) {
  const { containerRef } = useCodeMirror({ value, onChange });

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 border border-gray-200 rounded-lg overflow-hidden"
    />
  );
}
