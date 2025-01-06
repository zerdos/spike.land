import { getCodeSpace } from "@/hooks/use-code-space";
import { useRef, useState } from "react";
import type { EditorState } from "../components/editorUtils";
import type { ErrorType } from "../components/ErrorMessages";
import { isMobile } from "../isMobile";
import { useContext } from "./useContext";

export const useEditorState = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    started: false,
    sub: false,
    code: "",
    setValue: () => {},
  });

  const engine = isMobile() ? "ace" : "monaco";

  return { containerRef, engine, editorState, setEditorState };
};

export const useErrorHandling = () => {
  const [error, setError] = useState<ErrorType>(null);
  const contextManager = useContext(getCodeSpace());

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
