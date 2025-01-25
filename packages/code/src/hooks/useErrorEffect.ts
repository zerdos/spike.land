import type { ContextManager } from "@/lib/context-manager";
import { useEffect } from "react";
import type { ErrorType } from "../components/ErrorMessages";

export const useErrorEffect = (
  errorType: ErrorType | null,
  codeSpace: string,
  contextManager: ContextManager,
  setShowError: (show: boolean) => void,
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (errorType) {
      timer = setTimeout(() => {
        setShowError(true);
        const currentErrorLog = contextManager.getContext("errorLog") || "";
        const newErrorLog = `${currentErrorLog}\n${
          new Date().toISOString()
        }: ${errorType} error occurred`;
        contextManager.updateContext("errorLog", newErrorLog.trim());
      }, 500);
    } else {
      // Add a small delay before hiding the error to prevent flickering
      timer = setTimeout(() => setShowError(false), 100);
    }

    return () => clearTimeout(timer);
  }, [errorType, codeSpace, contextManager, setShowError]);
};
