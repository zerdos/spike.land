import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { runner } from "@src/services/runner";
import { prettierToThrow } from "@src/shared";
import { Wrapper } from "@src/Wrapper";
import { format } from "date-fns";
import React from "react";

// ScaledWrapper component
const ScaledWrapper = ({ code, scale }: { code: string; scale: number }) => (
  <div className="w-full h-0 pb-[56.25%] relative overflow-hidden">
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
      <Wrapper code={code} scale={.6} />
    </div>
  </div>
);

interface Item {
  timestamp: number;
  code: string;
}

interface HistoryItemProps {
  item: Item;
  index: number;
  totalItems: number;
  onRestore: (timestamp: number) => void;
  onDelete: (timestamp: number) => void;
}

// HistoryItem component
const HistoryItem: React.FC<HistoryItemProps> = (
  { item, index, totalItems, onRestore, onDelete }: HistoryItemProps,
) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle>Version {totalItems - index}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      <p className="text-sm text-gray-500 mb-2">
        {format(new Date(item.timestamp), "PPpp")}
      </p>
      <div className="flex-grow mb-4">
        <ScaledWrapper code={item.code} scale={0.3} />
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
        <Button variant="destructive" onClick={() => onDelete(item.timestamp)}>Delete</Button>
      </div>
    </CardContent>
  </Card>
);

// RestoreStatusAlert component
const RestoreStatusAlert = ({ status }: { status: any }) => (
  <Alert variant={status.type === "error" ? "destructive" : "default"}>
    <AlertTitle>
      {status.type === "loading"
        ? "Restoring"
        : status.type === "success"
        ? "Success"
        : "Error"}
    </AlertTitle>
    <AlertDescription>{status.message}</AlertDescription>
  </Alert>
);

// FullScreenHistoryView component
const FullScreenHistoryView: React.FC<{
  history: Item[];
  onRestore: (timestamp: number) => void;
  onClose: () => void;
  onDelete: (timestamp: number) => void;
}> = ({ history, onRestore, onClose, onDelete }) => (
  <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Code History</h2>
        <Button onClick={onClose}>Close</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, index) => (
          <HistoryItem
            key={item.timestamp}
            item={item}
            index={index}
            totalItems={history.length}
            onDelete={() => onDelete(item.timestamp)}
            onRestore={async () => {
              try {
                const formattedCode = await prettierToThrow({ code: item.code, toThrow: true });
                await runner(formattedCode);
              } catch (error) {
                console.error(error);
              } finally {
                onRestore(item.timestamp);
              }
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export { FullScreenHistoryView, HistoryItem, RestoreStatusAlert, ScaledWrapper };
