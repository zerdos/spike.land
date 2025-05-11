import { useCallback, useRef, useState } from "react";

const isMobile = (): boolean => {
  // Simple mobile device detection based on user agent
  if (typeof window !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(
        window.navigator.userAgent,
      );
  }
  return false;
};

/**
 * Interface for editor state
 */
export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (value: string) => void;
}

/**
 * Custom hook for managing editor state
 * @returns The editor state and functions to update it
 */
export const useEditorState = () => {
  // Create a ref for the editor container
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine the editor engine based on device type
  const engine = isMobile() ? "ace" : "monaco";

  // Initialize editor state
  const [editorState, setEditorState] = useState<EditorState>({
    started: false,
    sub: false,
    code: "",
    setValue: (value: string) => {
      // Default no-op implementation
      console.warn("Editor not initialized yet, setValue called with:", value);
    },
  });

  // Create a wrapper for setEditorState that preserves the setValue function
  const setEditorStateWrapper = useCallback(
    (newState: EditorState | ((prev: EditorState) => EditorState)) => {
      setEditorState((prevState) => {
        // Handle functional updates
        if (typeof newState === "function") {
          const updatedState = newState(prevState);
          // Preserve setValue if not provided in the update
          return {
            ...updatedState,
            setValue: updatedState.setValue || prevState.setValue,
          };
        }

        // Handle object updates
        return {
          ...newState,
          // Preserve setValue if not provided in the update
          setValue: newState.setValue || prevState.setValue,
        };
      });
    },
    [],
  );

  return {
    containerRef,
    engine,
    editorState,
    setEditorState: setEditorStateWrapper,
  };
};
