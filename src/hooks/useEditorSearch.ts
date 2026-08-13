import { useState, useCallback, useMemo, type RefObject } from "react";
import { type EditorView } from "@codemirror/view";
import {
  SearchQuery,
  setSearchQuery,
  findNext,
  findPrevious,
  getSearchQuery,
} from "@codemirror/search";

export function useEditorSearch(viewRef: RefObject<EditorView | null>) {
  const [query, setQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [tick, setTick] = useState(0);

  const notifyChange = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  const applySearch = useCallback(
    (searchText: string, matchCase: boolean) => {
      const view = viewRef.current;
      if (!view) return;

      const searchQuery = new SearchQuery({
        search: searchText,
        caseSensitive: matchCase,
      });
      view.dispatch({ effects: setSearchQuery.of(searchQuery) });
    },
    [viewRef],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      applySearch(newQuery, caseSensitive);
    },
    [applySearch, caseSensitive],
  );

  const handleCaseSensitiveChange = useCallback(
    (value: boolean) => {
      setCaseSensitive(value);
      applySearch(query, value);
    },
    [applySearch, query],
  );

  const handleNext = useCallback(() => {
    const view = viewRef.current;
    if (view) findNext(view);
  }, [viewRef]);

  const handlePrevious = useCallback(() => {
    const view = viewRef.current;
    if (view) findPrevious(view);
  }, [viewRef]);

  const matchCount = useMemo(() => {
    const view = viewRef.current;
    if (!view || !query) return { current: 0, total: 0 };

    const sq = getSearchQuery(view.state);
    const cursor = sq.getCursor(view.state.doc);
    let total = 0;
    let current = 0;
    const selFrom = view.state.selection.main.from;
    let result = cursor.next();

    while (!result.done) {
      total++;
      if (result.value.from <= selFrom && result.value.to >= selFrom) {
        current = total;
      }
      result = cursor.next();
    }
    return { current, total };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, caseSensitive, viewRef, tick]);

  return {
    query,
    caseSensitive,
    matchCount,
    handleQueryChange,
    handleCaseSensitiveChange,
    handleNext,
    handlePrevious,
    notifyChange,
  };
}
