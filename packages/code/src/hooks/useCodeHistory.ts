import { tryCatch } from "@/lib/try-catch";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Version } from "../codeHistoryUtils";
import { loadVersionHistory } from "../codeHistoryUtils";

interface HistoryItem {
  code: string;
  timestamp: number;
}

export const useCodeHistory = (codeSpace: string) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  // Initialize as true since we'll fetch on mount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  const fetchHistory = useCallback(async (isInitial = false) => {
    // Only set loading if this is not the initial mount (avoid cascading render)
    if (!isInitial) {
      setLoading(true);
    }
    const { data, error: fetchError } = await tryCatch<Version[]>(
      loadVersionHistory(codeSpace),
    );

    if (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "An unknown error occurred",
      );
    } else if (data) {
      setHistory(
        data
          .filter((x) => !x.code.includes("History") && !x.code.includes("e/pp"))
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((version) => ({ ...version, timestamp: version.timestamp })),
      );
    }
    setLoading(false);
  }, [codeSpace]);

  useEffect(() => {
    // On initial mount, loading is already true, so pass isInitial flag
    fetchHistory(isInitialMount.current);
    isInitialMount.current = false;
  }, [fetchHistory]);

  // Expose refetch that sets loading state
  const refetch = useCallback(() => fetchHistory(false), [fetchHistory]);

  return { history, loading, error, refetch };
};
