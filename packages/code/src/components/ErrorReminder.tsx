import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "@/external/lucideReact";
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const EditorNode: React.FC<
  {
    engine: "monaco" | "ace";
    errorType: "typescript" | "prettier" | "transpile" | "render" | null;
    containerRef: React.Ref<HTMLDivElement>;
  }
> = ({ engine, errorType, containerRef }) => {
  const [errorHeight, setErrorHeight] = useState(0);

  return (
    <div className="w-full h-full flex flex-col">
      <ErrorReminder
        errorType={errorType}
        onHeightChange={setErrorHeight}
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
              ${
            engine === "ace" ? "" : `
                border-right: 4px dashed gray;
                border-bottom: 4px dashed gray;
              `
          }
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
}

export const ErrorReminder: React.FC<ErrorReminderProps> = (
  { errorType, onHeightChange },
) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorType) {
      timer = setTimeout(() => {
        setShowError(true);
      }, 1000); // 1 second delay
    } else {
      setShowError(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [errorType]);

  const errorMessages = {
    typescript: "There might be a TypeScript error in your code. Check the editor for more details.",
    prettier: "There was an issue formatting your code. It might contain syntax errors.",
    transpile: "Your code couldn't be transpiled. There might be a syntax or compilation error.",
    render: "The code was transpiled, but no HTML output was generated. Check your render function.",
  };

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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
