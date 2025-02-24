import type { ICode } from "@/lib/interfaces";
import type { IHistoryItem } from "@/lib/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import type { Version } from "../codeHistoryUtils";
import { loadVersionHistory } from "../codeHistoryUtils";
import { FullScreenHistoryView } from "./History/HistoryFComponents";

interface CodeHistoryCarouselProps {
  codeSpace: string;
  onRestore: (item: IHistoryItem) => void;
  onClose: () => void;
  cSess: ICode;
}

export const CodeHistoryCarousel: React.FC<CodeHistoryCarouselProps> = ({
  codeSpace,
  onRestore,
  onClose,
  cSess,
}) => {
  const [history, setHistory] = useState<IHistoryItem[]>([]);
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
    async (item: IHistoryItem) => {
      try {
        const response = await fetch(
          `/live/${codeSpace}/auto-save/restore/${item.timestamp}`,
        );
        if (!response || !response.ok) {
          throw new Error("Failed to restore version");
        }

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
      onDelete={(timestamp: number) =>
        setHistory((h) => h.filter((x) => x.timestamp !== timestamp))}
      onRestore={(item: IHistoryItem) => handleRestore(item)}
      onClose={() => onClose()}
      cSess={cSess}
    />
  );
};

export default CodeHistoryCarousel;
