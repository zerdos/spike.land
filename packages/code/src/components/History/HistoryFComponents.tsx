import { Wrapper } from "@/components/app/wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { HistoryItemProps, ICode, IHistoryItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import React from "react";

const format = (date: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
// HistoryItem component
const HistoryItem: React.FC<HistoryItemProps> = (
  { item, index, totalItems, onRestore, onDelete },
) => (
  <Card className={cn("flex flex-col h-full")}>
    <CardHeader>
      <CardTitle>Version {totalItems - index}</CardTitle>
    </CardHeader>
    <CardContent className={cn("flex-grow flex flex-col")}>
      <p className={cn("text-sm text-gray-500 mb-2")}>
        {format(new Date(item.timestamp))}
      </p>
      <div className={cn("flex-grow mb-4")}>
        <Wrapper code={item.code} />
      </div>
      <div className={cn("space-x-2")}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Source</Button>
          </DialogTrigger>
          <DialogContent
            className={cn("max-w-3xl max-h-[80vh] overflow-y-auto")}
            aria-describedby="dialog-description"
          >
            <DialogTitle>
              Source Code - Version {totalItems - index}
            </DialogTitle>
            <pre className={cn("bg-gray-100 p-4 rounded-md overflow-x-auto")}>
              <code>{item.code}</code>
            </pre>
          </DialogContent>
        </Dialog>
        <Button onClick={() => onRestore(item)}>Restore</Button>
        <Button variant="destructive" onClick={() => onDelete(item.timestamp)}>
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
);

// RestoreStatusAlert component
const RestoreStatusAlert = (
  { status }: { status: { type: string; message: string; }; },
) => (
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
  history: IHistoryItem[];
  onRestore: (item: IHistoryItem) => void;
  onClose: () => void;
  onDelete: (timestamp: number) => void;
  cSess: ICode;
}> = ({ history, onRestore, onClose, onDelete, cSess }) => (
  <div className={cn("fixed inset-0 bg-white z-50")}>
    <ScrollArea className={cn("h-full")}>
      <div className={cn("container mx-auto p-4")}>
        <div className={cn("flex justify-between items-center mb-4")}>
          <h2 className={cn("text-2xl font-bold")}>Code History</h2>
          <Button onClick={onClose}>Close</Button>
        </div>
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6")}
        >
          {history.map((item, index) => (
            <HistoryItem
              key={item.timestamp}
              item={item}
              index={index}
              totalItems={history.length}
              onDelete={async (timestamp) => {
                try {
                  const session = await cSess.getSession();
                  await fetch(
                    `/live/${session.codeSpace}/auto-save/history/delete/${timestamp}`,
                  );
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
              cSess={cSess}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  </div>
);

export { FullScreenHistoryView, HistoryItem, RestoreStatusAlert };
