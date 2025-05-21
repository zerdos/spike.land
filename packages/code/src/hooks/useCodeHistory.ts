import { tryCatch } from "@/lib/try-catch";
import { useCallback, useEffect, useState } from "react";
import type { Version } from "../codeHistoryUtils";
import { loadVersionHistory } from "../codeHistoryUtils";

interface HistoryItem {
  code: string;
  timestamp: number;
}

export const useCodeHistory = (codeSpace: string) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
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
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};
