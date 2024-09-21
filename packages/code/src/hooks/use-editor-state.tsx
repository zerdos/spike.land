import { useCodeSpace } from "@/hooks/use-code-space";
import { createContextManager } from "@/lib/context-manager";
import { EditorState } from "@src/components/editorUtils";
import { ErrorType } from "@src/components/ErrorMessages";
import { useRef, useState } from "react";

export const useEditorState = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorState, setEditorState] = useState<EditorState>({
      started: false,
      sub: false,
      code: "",
      setValue: () => {},
    });
  
    const engine = "monaco"; // Or determine this dynamically
  
    return { containerRef, engine, editorState, setEditorState };
  };
  
  export const useErrorHandling = () => {
    const [error, setError] = useState<ErrorType>(null);
    const contextManager = createContextManager(useCodeSpace());
  
    const handleError = (errorType: ErrorType, errorMessage: string) => {
      setError(errorType);
      contextManager.updateContext("errorLog", errorMessage);
    };
  
    const clearError = () => {
      setError(null);
      contextManager.updateContext("errorLog", "");
    };
  
    return { error, handleError, clearError };
  };
  