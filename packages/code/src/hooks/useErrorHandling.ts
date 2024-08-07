import debounce from "lodash/debounce";
import { useCallback, useState } from "react";

export const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);

  const debouncedTypeCheck = useCallback(
    debounce(
      async (initialLoadRef: React.MutableRefObject<boolean>) => {
        if (engine === "monaco") {
          const {editor, languages}  = await import("../monacoEditor");
          const model = editor.getModels()[0];
          const worker = await languages.typescript
            .getTypeScriptWorker();
          const client = await worker(model.uri);
          const diagnostics = await client.getSemanticDiagnostics(
            model.uri.toString(),
          );

          if (diagnostics.length > 0 && !initialLoadRef.current) {
            console.error("TypeScript error:", diagnostics);
            setErrorType("typescript");
          } else {
            setErrorType((prevErrorType) =>
              prevErrorType === "typescript" ? null : prevErrorType
            );
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
