import { useCallback, useState } from "react";

// Tracks which routes were visited this session (for the menu checkmarks).
const KEY = "nipun.visited";

function read() {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export function useVisited() {
  const [visited, setVisited] = useState(read);
  const mark = useCallback((path) => {
    setVisited((prev) => {
      if (prev.has(path)) return prev;
      const next = new Set(prev);
      next.add(path);
      try {
        sessionStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);
  return { visited, mark };
}
