import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { getSearchQuery } from "@codemirror/search";

const matchMark = Decoration.mark({ class: "cm-searchMatch" });
const selectedMatchMark = Decoration.mark({
  class: "cm-searchMatch cm-searchMatch-selected",
});

function buildMatchDecorations(view: EditorView): DecorationSet {
  const query = getSearchQuery(view.state);
  if (!query.valid) return Decoration.none;

  const builder = new RangeSetBuilder<Decoration>();
  for (const { from, to } of view.visibleRanges) {
    const cursor = query.getCursor(view.state.doc, from, to);
    let result = cursor.next();
    while (!result.done) {
      const { from: matchFrom, to: matchTo } = result.value;
      const selected = view.state.selection.ranges.some(
        (r) => r.from === matchFrom && r.to === matchTo,
      );
      builder.add(matchFrom, matchTo, selected ? selectedMatchMark : matchMark);
      result = cursor.next();
    }
  }
  return builder.finish();
}

// Highlights search matches even when no CodeMirror search panel is open
export const searchMatchHighlighter = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    private lastQueryKey: string;

    constructor(view: EditorView) {
      this.lastQueryKey = queryKey(view);
      this.decorations = buildMatchDecorations(view);
    }

    update(update: ViewUpdate) {
      const key = queryKey(update.view);
      const queryChanged = key !== this.lastQueryKey;
      if (
        update.docChanged ||
        update.selectionSet ||
        update.viewportChanged ||
        queryChanged
      ) {
        this.lastQueryKey = key;
        this.decorations = buildMatchDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);

function queryKey(view: EditorView): string {
  const query = getSearchQuery(view.state);
  return `${query.search}\u0000${query.caseSensitive}\u0000${query.regexp}`;
}
