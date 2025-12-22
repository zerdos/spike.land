import { EditorCommandPalette } from "@/components/app/editor-command-palette";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, X } from "@/external/lucide-react";
import { ContextManager } from "@/lib/context-manager";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useErrorEffect } from "../hooks/useErrorEffect";
import { errorMessages } from "./ErrorMessages";
import type { ErrorType } from "./ErrorMessages";

export const EditorNode: React.FC<{
  engine: "monaco" | "ace";
  errorType: ErrorType;
  containerRef: React.Ref<HTMLDivElement>;
  codeSpace: string;
}> = ({ errorType, containerRef, codeSpace }) => {
  const [errorHeight, setErrorHeight] = useState(0);
  const hasError = !!errorType;

  return (
    <div className="w-full h-full flex flex-col">
      <ErrorReminder
        errorType={errorType}
        onHeightChange={setErrorHeight}
        codeSpace={codeSpace}
      />
      <motion.div
        className="flex-grow relative"
        animate={{ marginTop: errorHeight }}
        transition={{ duration: 0.3 }}
      >
        <div
          id="spike-editor-container"
          data-testid="editor-container"
          ref={containerRef}
          className="absolute inset-0"
          role="application"
          aria-label={`Code editor for ${codeSpace}`}
          aria-describedby="editor-status"
          data-editor-ready="false"
          data-has-error={hasError}
        />
        <div id="editor-status" className="sr-only" aria-live="polite">
          {hasError
            ? `Editor has ${errorType} error. Press Escape to dismiss error and focus editor.`
            : `Code editor ready. Use keyboard shortcuts: Cmd+F to find, Cmd+K to open command palette.`}
        </div>
      </motion.div>
      {/* Command palette - triggered with Cmd+K */}
      <EditorCommandPalette />
    </div>
  );
};

interface ErrorReminderProps {
  errorType: ErrorType;
  onHeightChange: (height: number) => void;
  codeSpace: string;
}

export const ErrorReminder: React.FC<ErrorReminderProps> = ({
  errorType,
  onHeightChange,
  codeSpace,
}) => {
  const [showError, setShowError] = useState(false);
  const contextManager = new ContextManager(codeSpace);
  useErrorEffect(errorType, codeSpace, contextManager, setShowError);

  const errorLog = contextManager.getContext("errorLog");

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => onHeightChange(0)}
    >
      {showError && errorType && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onUpdate={(latest) => {
            if (typeof latest["height"] === "number") {
              onHeightChange(latest["height"]);
            }
          }}
        >
          <Card
            className={cn("mb-4 border-l-4", {
              "border-l-red-500": errorType === "typescript" ||
                errorType === "transpile",
              "border-l-yellow-500": errorType === "prettier",
              "border-l-orange-500": errorType === "render",
            })}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center text-lg font-semibold">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Code Issue Detected
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowError(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Alert
                variant="destructive"
                className="mb-4 bg-red-50 text-red-800 border-red-200"
              >
                <AlertTitle>{errorMessages[errorType]}</AlertTitle>
                {errorLog && (
                  <AlertDescription>
                    <h4 className="font-semibold text-sm">Error Log:</h4>
                    <ScrollArea className="h-[100px]">
                      <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700">
                      {errorLog.split('\n').map((log: string, index: number) => (
                        <div key={index} className="mb-1">
                          {log}
                        </div>
                      ))}
                      </pre>
                    </ScrollArea>
                  </AlertDescription>
                )}
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
