
import { format } from "date-fns";
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
import { Wrapper } from '@src/Wrapper';
import { FC } from "react";

// ScaledWrapper component
const ScaledWrapper = ({ code, scale }: { code: string, scale: number }) => (
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
      <Wrapper code={code}  scale={.6}/>
    </div>
  </div>
);


interface Item {
  timestamp: number; // Assuming timestamp is a number for example purposes
  code: string;
}

// Define a type for the props that HistoryItem component expects
interface HistoryItemProps {
  item: Item;
  index: number;
  totalItems: number;
  onRestore: () => void;
}


// HistoryItem component
const HistoryItem: React.FC<HistoryItemProps>  = ({ item, index, totalItems, onRestore }) => (
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
          <Button onClick={() => onRestore()}>Restore</Button>
        </div>
      </CardContent>
    </Card>
  </CarouselItem>
);

// RestoreStatusAlert component
const RestoreStatusAlert = ({ status }: { status: any }) => (
  <Alert
    variant={status.type === "error" ? "destructive" : "default"}
  >
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

// CodeHistoryCarousel componen//t
const CodeHistoryCarousel: FC<{history: {code: string, timestamp: number }[], onRestore:(code: string)=>void, restoreStatus: boolean}> = ({ history, onRestore, restoreStatus } )=> (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Code History</h2>
    {restoreStatus && <RestoreStatusAlert status={restoreStatus} />}
    <Carousel opts={{ loop: true }} className="w-full max-w-4xl">
      <CarouselContent>
        {history.map((item, index) => (
          <HistoryItem
            key={item.timestamp}
            item={item}
            index={index}
            totalItems={history.length}
            onRestore={()=> onRestore(item.code)} 
          />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export {
  ScaledWrapper,
  HistoryItem,
  RestoreStatusAlert,
  CodeHistoryCarousel
};