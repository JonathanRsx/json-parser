import { useRef, useEffect } from "react";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  foldGutter,
  codeFolding,
  bracketMatching,
  syntaxTree,
} from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { elementCountPlugin } from "../components/Editor/elementCountPlugin";

interface UseCodeMirrorOptions {
  value: string;
  onChange: (value: string) => void;
}

export function useCodeMirror({ value, onChange }: UseCodeMirrorOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        history(),
        codeFolding({
          placeholderDOM(view, onclick) {
            const placeholder = document.createElement("span");
            placeholder.className = "cm-foldPlaceholder";
            placeholder.onclick = onclick;
            placeholder.title = "Déplier";

            // Try to determine the element count from the syntax tree
            const sel = view.state.selection.main;
            const tree = syntaxTree(view.state);
            let label = "…";
            tree.iterate({
              from: Math.max(0, sel.from - 1),
              to: sel.from + 1,
              enter(node) {
                if (node.name === "Array" || node.name === "Object") {
                  let count = 0;
                  const cursor = node.node.cursor();
                  if (cursor.firstChild()) {
                    do {
                      if (node.name === "Array") {
                        if (
                          cursor.name !== "[" &&
                          cursor.name !== "]" &&
                          cursor.name !== ","
                        ) {
                          count++;
                        }
                      } else {
                        if (cursor.name === "Property") {
                          count++;
                        }
                      }
                    } while (cursor.nextSibling());
                  }
                  label =
                    node.name === "Array"
                      ? `Array[${count}]`
                      : `Object{${count}}`;
                  return false;
                }
              },
            });

            placeholder.textContent = label;
            placeholder.style.cssText =
              "cursor: pointer; color: #6b7280; background: #f3f4f6; padding: 0 4px; border-radius: 3px; font-size: 12px;";
            return placeholder;
          },
        }),
        foldGutter(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle),
        highlightSelectionMatches(),
        json(),
        elementCountPlugin,
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
        updateListener,
        EditorView.lineWrapping,
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-scroller": {
            overflow: "auto",
            fontFamily: "ui-monospace, Consolas, monospace",
          },
          ".cm-gutters": {
            backgroundColor: "var(--color-gray-50)",
            borderRight: "1px solid var(--color-gray-200)",
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Only create the editor once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes into the editor
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
    }
  }, [value]);

  return { containerRef };
}
