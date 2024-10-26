import { useCallback, useState } from "react";

export const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);

  const throttledTypeCheck = useCallback(
    async (initialLoadRef: React.MutableRefObject<boolean>) => {
      if (engine === "monaco") {
        const { editor, languages } = await import("@/external/monaco-editor");
        const model = editor.getModels()[0];
        const worker = await languages.typescript
          .getTypeScriptWorker();
        const client = await worker(model.uri);
        const diagnostics = await client.getSemanticDiagnostics(
          model.uri.toString(),
        );

        if (diagnostics.length > 0 && !initialLoadRef.current) {
          Object.assign(globalThis, { diagnostics });
          console.error("TypeScript error:", diagnostics);
          setErrorType("typescript");
        } else {
          setErrorType((prevErrorType) => prevErrorType === "typescript" ? null : prevErrorType);
        }
      }
      initialLoadRef.current = false;
    },
    [engine],
  );

  return { errorType, setErrorType, throttledTypeCheck };
};

Object.assign(globalThis, { useErrorHandling });
