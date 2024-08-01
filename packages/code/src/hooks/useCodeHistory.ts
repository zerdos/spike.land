import { useCallback, useEffect, useState } from "react";

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
      const response = await fetch(`/live/${codeSpace}/auto-save/history`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data: HistoryItem[] = await response.json();
      setHistory(
        data
          .filter((x) => !x.code.includes("History") && !x.code.includes("e/pp"))
          .sort((a, b) => b.timestamp - a.timestamp),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [codeSpace]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error };
};
