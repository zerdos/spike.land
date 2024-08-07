import React, { useCallback, useEffect, useState } from "react";
import { FullScreenHistoryView, HistoryItem, RestoreStatusAlert } from "./History/HistoryFComponents";

interface HistoryItem {
  code: string;
  timestamp: number;
}

interface RestoreStatus {
  type: "loading" | "success" | "error";
  message: string;
}

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
  const [restoreStatus, setRestoreStatus] = useState<RestoreStatus | null>(
    null,
  );
  const [isFullScreen, setIsFullScreen] = useState(true);

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
    async (timestamp: number, code: string) => {
      try {
        setRestoreStatus({ type: "loading", message: "Restoring..." });
        const response = await fetch(`/live/${codeSpace}/auto-save/restore`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timestamp }),
        });
        if (!response.ok) throw new Error("Failed to restore version");
        setRestoreStatus({
          type: "success",
          message: "Version restored successfully!",
        });
        onRestore({ timestamp, code });
      } catch (err) {
        setRestoreStatus({
          type: "error",
          message: err instanceof Error
            ? err.message
            : "An unknown error occurred",
        });
      }
    },
    [codeSpace, onRestore],
  );

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FullScreenHistoryView
      history={history}
      onRestore={(item: HistoryItem) => restoreVersion(item.timestamp, item.code)}
      onClose={() => onClose()}
    />
  );
};

export default CodeHistoryCarousel;
