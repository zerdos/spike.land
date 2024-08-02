import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Wrapper } from "../Wrapper";

interface HistoryItem {
  code: string;
  timestamp: number;
}

interface RestoreStatus {
  type: "loading" | "success" | "error";
  message: string;
}

const ScaledWrapper: React.FC<{ code: string }> = React.memo(({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = window.innerWidth / 3;
        setScale(Math.min(0.3, containerWidth / targetWidth));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-0 pb-[56.25%] relative overflow-hidden"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Wrapper code={code} />
      </div>
    </div>
  );
});

ScaledWrapper.displayName = "ScaledWrapper";

const HistoryItem: React.FC<{
  item: HistoryItem;
  index: number;
  totalItems: number;
  onRestore: (timestamp: number) => void;
}> = React.memo(({ item, index, totalItems, onRestore }) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Version {totalItems - index}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-sm text-gray-500 mb-2">
            {format(new Date(item.timestamp), "PPpp")}
          </p>
          <div className="flex-grow mb-4">
            <ScaledWrapper code={item.code} />
          </div>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Source</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Source Code - Version {totalItems - index}
                  </DialogTitle>
                </DialogHeader>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{item.code}</code>
                </pre>
              </DialogContent>
            </Dialog>
            <Button onClick={() => onRestore(item.timestamp)}>Restore</Button>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
});

HistoryItem.displayName = "HistoryItem";

export const CodeHistoryCarousel: React.FC<{ codeSpace: string, onRestore: ()=>void }> = (
  { codeSpace, onRestore },
) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<RestoreStatus | null>(
    null,
  );

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/live/${codeSpace}/auto-save/history`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data: HistoryItem[] = await response.json();
      setHistory(
        data
          .filter((x) =>
            !x.code.includes("History") && !x.code.includes("e/pp")
          )
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

  const restoreVersion = useCallback(async (timestamp: number) => {
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
      onRestore()
    } catch (err) {
      setRestoreStatus({
        type: "error",
        message: err instanceof Error
          ? err.message
          : "An unknown error occurred",
      });
    }
  }, [codeSpace]);

  const memoizedHistory = useMemo(() => history, [history]);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Code History</h2>
      {restoreStatus && (
        <Alert
          variant={restoreStatus.type === "error" ? "destructive" : "default"}
        >
          <AlertTitle>
            {restoreStatus.type === "loading"
              ? "Restoring"
              : restoreStatus.type === "success"
              ? "Success"
              : "Error"}
          </AlertTitle>
          <AlertDescription>{restoreStatus.message}</AlertDescription>
        </Alert>
      )}
      <Carousel opts={{ loop: true }} className="w-full max-w-4xl">
        <CarouselContent>
          {memoizedHistory.map((item, index) => (
            <HistoryItem
              key={item.timestamp}
              item={item}
              index={index}
              totalItems={memoizedHistory.length}
              onRestore={restoreVersion}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default CodeHistoryCarousel;