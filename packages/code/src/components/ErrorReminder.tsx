import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createContextManager } from "../contextManager";

export const EditorNode: React.FC<{
  engine: "monaco" | "ace";
  errorType: "typescript" | "prettier" | "transpile" | "render" | null;
  containerRef: React.Ref<HTMLDivElement>;
  codeSpace: string;
}> = ({ errorType, containerRef, codeSpace }) => {
  const [errorHeight, setErrorHeight] = useState(0);

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
          data-testid="editor-container"
          ref={containerRef}
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  );
};

interface ErrorReminderProps {
  errorType: "typescript" | "prettier" | "transpile" | "render" | null;
  onHeightChange: (height: number) => void;
  codeSpace: string;
}

export const ErrorReminder: React.FC<ErrorReminderProps> = ({
  errorType,
  onHeightChange,
  codeSpace,
}) => {
  const [showError, setShowError] = useState(false);
  const contextManager = createContextManager(codeSpace);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorType) {
      timer = setTimeout(() => {
        setShowError(true);
        const currentErrorLog = contextManager.getContext('errorLog');
        const newErrorLog = `${currentErrorLog}\n${new Date().toISOString()}: ${errorType} error occurred`;
        contextManager.updateContext('errorLog', newErrorLog);
      }, 300);
    } else {
      setShowError(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [errorType, codeSpace]);

  const errorMessages = {
    typescript: "There might be a TypeScript error in your code. Check the editor for more details.",
    prettier: "There was an issue formatting your code. It might contain syntax errors.",
    transpile: "Your code couldn't be transpiled. There might be a syntax or compilation error.",
    render: "The code was transpiled, but no HTML output was generated. Check your render function.",
  };

  const errorLog = contextManager.getContext('errorLog');

  return (
    <AnimatePresence initial={false} onExitComplete={() => onHeightChange(0)}>
      {showError && errorType && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onUpdate={(latest) => {
            if (typeof latest.height === "number") {
              onHeightChange(latest.height);
            }
          }}
        >
          <Card className={cn("mb-4", errorType && "border-red-500")}>
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <AlertCircle className="h-5 w-5 mr-2" />
                Code Issue Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>{errorMessages[errorType]}</AlertDescription>
              </Alert>
              {errorLog && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h4 className="font-semibold mb-2 text-sm">Error Log:</h4>
                  <pre className="text-xs whitespace-pre-wrap">{errorLog}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};