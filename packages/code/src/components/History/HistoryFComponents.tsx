import { Wrapper } from "@/components/app/wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCodeSpace } from "@src/hooks/useCodeSpace";
import { format } from "date-fns";
import React from "react";

interface HistoryItem {
  timestamp: number;
  code: string;
}

interface HistoryItemProps {
  item: HistoryItem;
  index: number;
  totalItems: number;
  onRestore: (item: HistoryItem) => void;
  onDelete: (timestamp: number) => void;
  cSess: any; // Add cSess to the props
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
        <Wrapper code={item.code} scale={0.3} />
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
        <Button onClick={() => onRestore(item)}>Restore</Button>
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
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClose: () => void;
  onDelete: (timestamp: number) => void;
  cSess: any; // Add cSess to the props
}> = ({ history, onRestore, onClose, onDelete, cSess }) => (
  <div className="fixed inset-0 bg-white z-50">
    <ScrollArea className="h-full">
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
              onDelete={async (timestamp) => {
                try {
                  await fetch(`/live/${useCodeSpace()}/auto-save/history/delete/${timestamp}`);
                  onDelete(timestamp);
                } catch (error) {
                  console.error(error);
                }
              }}
              onRestore={async () => {
                try {
                  await cSess.setCode(item.code);
                } catch (error) {
                  console.error(error);
                } finally {
                  onRestore(item);
                }
              }}
              cSess={cSess} // Pass cSess to HistoryItem
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  </div>
);

export { FullScreenHistoryView, HistoryItem, RestoreStatusAlert };
