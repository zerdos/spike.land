import React, { useCallback, useEffect, useState } from "react";
import { FullScreenHistoryView, HistoryItem } from "./History/HistoryFComponents";

interface HistoryItem {
  code: string;
  timestamp: number;
}

export const CodeHistoryCarousel: React.FC<
  {
    codeSpace: string;
    onRestore: (timestamp: number) => void;
    onClose: () => void;
    onDelete?: (timestamp: number) => void;
  }
> = ({
  codeSpace,
  onDelete,
  onRestore,
  onClose,
}) => {
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

  const restoreVersion = useCallback(
    async (timestamp: number) => {
      try {
        const response = await fetch(`/live/${codeSpace}/auto-save/restore/${timestamp}`);
        if (!response.ok) throw new Error("Failed to restore version");

        onRestore(timestamp);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      }
    },
    [codeSpace, onRestore],
  );

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FullScreenHistoryView
      history={history}
      onDelete={(timestamp: number) => onDelete && onDelete(timestamp)}
      onRestore={(timestamp: number) => restoreVersion(item.timestamp)}
      onClose={() => onClose()}
    />
  );
};

export default CodeHistoryCarousel;
