import { useCallback, useState } from "react";
import type { editor as monacoEditor } from "monaco-editor";

export interface DetailedDiagnostic {
  message: string;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
  severity: "error" | "warning" | "info";
  code?: number;
}

export type ErrorType = "typescript" | "prettier" | "transpile" | "render" | null;

export const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [diagnostics, setDiagnostics] = useState<DetailedDiagnostic[]>([]);

  const throttledTypeCheck = useCallback(
    async (code?: string) => {
      if (engine === "monaco") {
        const { editor } = await import("@/workers/monaco-editor.worker");
        const { typescript, MarkerSeverity } = await import("monaco-editor");
        const model = editor.getModels()[0];
        if (!model) {
          return;
        }

        const worker = await typescript.getTypeScriptWorker();
        const client = await worker(model.uri);

        // Get all diagnostic types
        const [syntacticDiags, semanticDiags, suggestionDiags] = await Promise.all([
          client.getSyntacticDiagnostics(model.uri.toString()),
          client.getSemanticDiagnostics(model.uri.toString()),
          client.getSuggestionDiagnostics(model.uri.toString()),
        ]);

        const allDiagnostics = [...syntacticDiags, ...semanticDiags, ...suggestionDiags];

        // Convert to DetailedDiagnostic format
        const detailedDiagnostics: DetailedDiagnostic[] = allDiagnostics.map((d) => {
          const startPos = d.start !== undefined ? model.getPositionAt(d.start) : { lineNumber: 1, column: 1 };
          const endPos = d.start !== undefined && d.length !== undefined
            ? model.getPositionAt(d.start + d.length)
            : startPos;

          const extractMessageText = (
            message: string | { messageText: string },
          ): string => {
            if (typeof message === "string") {
              return message;
            } else if (message && typeof message.messageText !== "undefined") {
              return extractMessageText(message.messageText);
            }
            return "Unknown diagnostic message";
          };

          // Map TypeScript category to severity
          // 0 = Warning, 1 = Error, 2 = Suggestion, 3 = Message
          let severity: "error" | "warning" | "info" = "info";
          if (d.category === 1) severity = "error";
          else if (d.category === 0) severity = "warning";

          return {
            message: extractMessageText(d.messageText as string | { messageText: string }),
            line: startPos.lineNumber,
            column: startPos.column,
            endLine: endPos.lineNumber,
            endColumn: endPos.column,
            severity,
            code: d.code,
          };
        });

        // Check for missing default export
        const currentCode = code || model.getValue();
        if (!/export\s+default/.test(currentCode)) {
          detailedDiagnostics.push({
            message: 'Missing default export. Use "export default function App() {...}" to define your component.',
            line: 1,
            column: 1,
            endLine: 1,
            endColumn: 1,
            severity: "warning",
            code: 9999,
          });
        }

        setDiagnostics(detailedDiagnostics);

        // Set Monaco markers for inline squiggles
        const markers: monacoEditor.IMarkerData[] = detailedDiagnostics.map((d) => {
          const marker: monacoEditor.IMarkerData = {
            startLineNumber: d.line,
            startColumn: d.column,
            endLineNumber: d.endLine,
            endColumn: d.endColumn,
            message: d.message,
            severity: d.severity === "error"
              ? MarkerSeverity.Error
              : d.severity === "warning"
                ? MarkerSeverity.Warning
                : MarkerSeverity.Info,
          };
          if (d.code !== undefined) {
            marker.code = d.code.toString();
          }
          return marker;
        });

        editor.setModelMarkers(model, "typescript", markers);

        // Set error type based on diagnostics
        const hasErrors = detailedDiagnostics.some((d) => d.severity === "error");
        if (hasErrors) {
          Object.assign(globalThis, { diagnostics: detailedDiagnostics });
          console.error("TypeScript errors:", detailedDiagnostics);
          setErrorType("typescript");
        } else {
          setErrorType((prevErrorType) => prevErrorType === "typescript" ? null : prevErrorType);
        }
      }
    },
    [engine],
  );

  const clearDiagnostics = useCallback(() => {
    setDiagnostics([]);
    setErrorType(null);
  }, []);

  return { errorType, setErrorType, diagnostics, throttledTypeCheck, clearDiagnostics };
};

Object.assign(globalThis, { useErrorHandling });
