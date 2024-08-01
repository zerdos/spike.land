import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

export const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);

  const debouncedTypeCheck = useCallback(
    debounce(
      async (initialLoadRef: React.MutableRefObject<boolean>) => {
        if (engine === "monaco") {
          const monaco = await import("monaco-editor");
          const model = monaco.editor.getModels()[0];
          const worker = await monaco.languages.typescript.getTypeScriptWorker();
          const client = await worker(model.uri);
          const diagnostics = await client.getSemanticDiagnostics(
            model.uri.toString(),
          );

          if (diagnostics.length > 0 && !initialLoadRef.current) {
            setErrorType("typescript");
          } else {
            setErrorType((prevErrorType) => prevErrorType === "typescript" ? null : prevErrorType);
          }
        }
        initialLoadRef.current = false;
      },
      1000,
      { leading: true, trailing: true },
    ),
    [engine],
  );

  return { errorType, setErrorType, debouncedTypeCheck };
};
