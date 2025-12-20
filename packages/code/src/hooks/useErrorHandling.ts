import { useCallback, useState } from "react";

export const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);

  const throttledTypeCheck = useCallback(
    async () => {
      if (engine === "monaco") {
        const { editor } = await import("@/workers/monaco-editor.worker");
        const { typescript } = await import("monaco-editor");
        const model = editor.getModels()[0];
        if (!model) {
          return;
        }
        const worker = await typescript.getTypeScriptWorker();
        const client = await worker(model.uri);
        const diagnostics = await client.getSemanticDiagnostics(
          model.uri.toString(),
        );

        if (diagnostics.length > 0) {
          Object.assign(globalThis, { diagnostics });
          console.error("TypeScript error:", diagnostics);
          setErrorType("typescript");
        } else {
          setErrorType((prevErrorType) => prevErrorType === "typescript" ? null : prevErrorType);
        }
      }
    },
    [engine],
  );

  return { errorType, setErrorType, throttledTypeCheck };
};

Object.assign(globalThis, { useErrorHandling });
