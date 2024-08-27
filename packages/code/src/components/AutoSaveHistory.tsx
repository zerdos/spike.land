import React, { useCallback, useEffect, useState } from "react";
import { loadVersionHistory, Version } from "../codeHistoryUtils";
import { FullScreenHistoryView, HistoryItem } from "./History/HistoryFComponents";

export const CodeHistoryCarousel: React.FC<
  {
    codeSpace: string;
    onRestore: (item: HistoryItem) => void;
    onClose: () => void;
  }
> = ({
  codeSpace,
  onRestore,
  onClose,
}) => {
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

  const handleRestore = useCallback(
    async (item: HistoryItem) => {
      try {
        const response = await fetch(`/live/${codeSpace}/auto-save/restore/${item.timestamp}`);
        if (!response.ok) throw new Error("Failed to restore version");

        onRestore(item);
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
      onDelete={(timestamp: number) => setHistory(h => h.filter((x) => x.timestamp !== timestamp))}
      onRestore={(item: HistoryItem) => handleRestore(item)}
      onClose={() => onClose()}
    />
  );
};

export default CodeHistoryCarousel;
