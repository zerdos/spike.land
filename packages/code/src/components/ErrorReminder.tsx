import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "@/external/lucideReact";
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createContextManager } from "../contextManager";

export const EditorNode: React.FC<
  {
    engine: "monaco" | "ace";
    errorType: "typescript" | "prettier" | "transpile" | "render" | null;
    containerRef: React.Ref<HTMLDivElement>;
    codeSpace: string;
  }
> = ({ errorType, containerRef, codeSpace }) => {
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
          css={css`
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            `}
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

export const ErrorReminder: React.FC<ErrorReminderProps> = (
  { errorType, onHeightChange, codeSpace },
) => {
  const [showError, setShowError] = useState(false);
  const contextManager = createContextManager(codeSpace);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorType) {
      timer = setTimeout(() => {
        setShowError(true);
        // Update error log in context
        const currentErrorLog = contextManager.getContext('errorLog');
        const newErrorLog = `${currentErrorLog}\n${new Date().toISOString()}: ${errorType} error occurred`;
        contextManager.updateContext('errorLog', newErrorLog);
      }, 300); // 300ms delay
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
    <AnimatePresence
      initial={false}
      onExitComplete={() => onHeightChange(0)}
    >
      {showError && errorType && (
        <motion.div
          css={css`
            background-color: cornsilk;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 111; 
          `}
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
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Code Issue Detected</AlertTitle>
            <AlertDescription>{errorMessages[errorType]}</AlertDescription>
          </Alert>
          {errorLog && (
            <div className="p-4 bg-gray-100 text-sm">
              <h4 className="font-bold mb-2">Error Log:</h4>
              <pre>{errorLog}</pre>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
