import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileCode, RefreshCw, RotateCcw } from "@/external/lucide-react";
import { DEFAULT_TEMPLATE } from "@/lib/default-template";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";

interface EditorToolbarProps {
  onReplaceAll: (code: string) => void;
  onReset: () => void;
  className?: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onReplaceAll,
  onReset,
  className,
}) => {
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [replaceCode, setReplaceCode] = useState("");

  const handleReplaceSubmit = useCallback(() => {
    if (replaceCode.trim()) {
      onReplaceAll(replaceCode);
      setReplaceCode("");
      setIsReplaceDialogOpen(false);
    }
  }, [replaceCode, onReplaceAll]);

  const handleResetToTemplate = useCallback(() => {
    onReplaceAll(DEFAULT_TEMPLATE);
    onReset();
    setIsResetDialogOpen(false);
  }, [onReplaceAll, onReset]);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex items-center gap-1 p-1 bg-gray-50 border-b border-gray-200",
          className,
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplaceDialogOpen(true)}
              className="h-7 px-2 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Replace All
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Replace all code (Cmd/Ctrl+Shift+R)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsResetDialogOpen(true)}
              className="h-7 px-2 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset to default template</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex-grow" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-gray-500 px-2">
              <FileCode className="h-3.5 w-3.5" />
              <span>export default required</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your component must use &quot;export default&quot;</p>
          </TooltipContent>
        </Tooltip>

        {/* Replace All Dialog */}
        <Dialog open={isReplaceDialogOpen} onOpenChange={setIsReplaceDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Replace All Code</DialogTitle>
              <DialogDescription>
                Paste your new code below. This will replace the entire editor content.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <textarea
                value={replaceCode}
                onChange={(e) => setReplaceCode(e.target.value)}
                placeholder={`Paste your code here...\n\nexport default function App() {\n  return <div>Your component</div>;\n}`}
                className="w-full h-64 p-3 font-mono text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReplaceDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReplaceSubmit} disabled={!replaceCode.trim()}>
                Replace All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reset Confirmation Dialog */}
        <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Editor?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all your code and reset to the default template.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetToTemplate}>
                Reset to Template
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};
