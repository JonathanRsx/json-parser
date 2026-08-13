import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { type EditorState, RangeSetBuilder } from "@codemirror/state";
import { syntaxTree } from "@codemirror/language";

class ElementCountWidget extends WidgetType {
  private count: number;
  private kind: "array" | "object";

  constructor(count: number, kind: "array" | "object") {
    super();
    this.count = count;
    this.kind = kind;
  }

  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-element-count";
    span.textContent =
      this.kind === "array"
        ? ` // Array[${this.count}]`
        : ` // Object{${this.count}}`;
    span.style.cssText =
      "color: #6b7280; font-size: 12px; font-style: italic; margin-left: 4px;";
    return span;
  }

  eq(other: ElementCountWidget) {
    return this.count === other.count && this.kind === other.kind;
  }
}

function buildDecorations(state: EditorState): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  const tree = syntaxTree(state);
  const doc = state.doc;

  const decorations: { pos: number; widget: ElementCountWidget }[] = [];

  tree.iterate({
    enter(node) {
      if (node.name === "Array" || node.name === "Object") {
        const startLine = doc.lineAt(node.from);
        const endLine = doc.lineAt(node.to);

        // Only show count for multi-line arrays/objects
        if (startLine.number === endLine.number) return;

        let count = 0;
        const cursor = node.node.cursor();
        if (cursor.firstChild()) {
          do {
            // In JSON syntax tree, array elements are direct children
            // Object properties are "Property" nodes
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

        if (count > 0) {
          const kind = node.name === "Array" ? "array" : "object";
          decorations.push({
            pos: startLine.to,
            widget: new ElementCountWidget(count, kind),
          });
        }
      }
    },
  });

  // Sort by position (required by RangeSetBuilder)
  decorations.sort((a, b) => a.pos - b.pos);
  for (const { pos, widget } of decorations) {
    builder.add(pos, pos, Decoration.widget({ widget, side: 1 }));
  }

  return builder.finish();
}

export const elementCountPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = buildDecorations(view.state);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildDecorations(update.state);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
