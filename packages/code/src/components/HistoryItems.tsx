import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Wrapper } from "../Wrapper";

const ScaledWrapper: FC<{ code: string }> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const updateScale = () => {
      const currentContainer = containerRef.current;
      if (currentContainer !== null) {
        const containerWidth = currentContainer.offsetWidth;
        const targetWidth = window.innerWidth / 3;
        setScale(Math.min(0.3, containerWidth / targetWidth));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-0 pb-[56.25%] relative overflow-hidden">
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
};

export const CodeHistory = ({ codeSpace, onRestore, onClose }: {
  codeSpace: string;
  onRestore: (code: string) => void;
  onClose: () => void;
}) => {
  const [history, setHistory] = useState<{ code: string; timestamp: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restoreStatus, setRestoreStatus] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [codeSpace]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/live/${codeSpace}/auto-save/history`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json<{ code: string; timestamp: number }[]>();
      setHistory(
        data.filter(x => !x.code.includes("History") && !x.code.includes("e/pp")).sort((a, b) =>
          b.timestamp - a.timestamp
        ),
      );
    } catch (err) {
      setError(err && err.message);
    } finally {
      setLoading(false);
    }
  };

  const restoreVersion = async (timestamp) => {
    try {
      setRestoreStatus({ type: "loading", message: "Restoring..." });
      const response = await fetch(`/live/${codeSpace}/auto-save/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });
      if (!response.ok) throw new Error("Failed to restore version");
      setRestoreStatus({ type: "success", message: "Version restored successfully!" });
    } catch (err) {
      setRestoreStatus({ type: "error", message: err.message });
    }
  };

  if (loading) return <div>Loading history...</div>;
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Code History</h2>
      {restoreStatus && (
        <Alert variant={restoreStatus.type === "error" ? "destructive" : "default"}>
          <AlertTitle>
            {restoreStatus.type === "loading" ? "Restoring" : (restoreStatus.type === "success" ? "Success" : "Error")}
          </AlertTitle>
          <AlertDescription>{restoreStatus.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {history.map((item, index) => (
            <Card key={item.timestamp} className="flex flex-col">
              <CardHeader>
                <CardTitle>Version {history.length - index}</CardTitle>
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
                        <DialogTitle>Source Code - Version {history.length - index}</DialogTitle>
                      </DialogHeader>
                      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => restoreVersion(item.timestamp)}>
                    Restore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeHistory;
