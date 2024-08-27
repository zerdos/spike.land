import { useCallback, useEffect, useState } from "react";
import { loadVersionHistory, Version } from "../codeHistoryUtils";

interface HistoryItem {
  code: string;
  timestamp: number;
}

export const useCodeHistory = (codeSpace: string) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data: Version[] = await loadVersionHistory(codeSpace);
      setHistory(
        data
          .filter((x) => !x.code.includes("History") && !x.code.includes("e/pp"))
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((version) => ({ ...version, timestamp: version.timestamp })),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  }, [codeSpace]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};
