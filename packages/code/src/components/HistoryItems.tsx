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
import React from "react";
import { useCodeHistory } from "../hooks/useCodeHistory";
import { useRestoreVersion } from "../hooks/useRestoreVersion";
import { ScaledWrapper } from "./ScaledWrapper";

export const CodeHistoryCarousel: React.FC<{ codeSpace: string }> = (
  { codeSpace },
) => {
  const { history, loading, error } = useCodeHistory(codeSpace);
  const { restoreStatus, restoreVersion } = useRestoreVersion(codeSpace);

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
          {history.map((item, index) => (
            <CarouselItem
              key={item.timestamp}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="flex flex-col h-full">
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
                          <DialogTitle>
                            Source Code - Version {history.length - index}
                          </DialogTitle>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
