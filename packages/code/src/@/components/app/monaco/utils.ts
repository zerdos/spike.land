import { wait } from "@/lib/wait";
import { editor, Uri } from "@/workers/monaco-editor.worker";
import { MarkerSeverity, typescript } from "monaco-editor";
import { modelCache, originToUse } from "./config";
import type { ExtraLib } from "./types";

/**
 * Fetch and create extra models for imports
 * @param code The code to analyze for imports
 * @param originToUse The origin URL
 */
export async function fetchAndCreateExtraModels(
  code: string,
  originToUse: string,
): Promise<void> {
  const patterns = [
    new RegExp(` from "(${originToUse})/live/[a-zA-Z0-9\\-_]+`, "gm"),
    new RegExp(` from "\\./(?!@/)[a-zA-Z0-9\\-_]+`, "gm"),
    new RegExp(` from "/live/[a-zA-Z0-9\\-_]+`, "gm"),
  ];

  const matches = patterns.flatMap((pattern) => [...code.matchAll(pattern)]);

  try {
    await Promise.all(matches.map(async (match) => {
      const codeSpace = match[0]!.split("/").pop();
      const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse)
        .toString();
      const mUri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);

      if (!modelCache[mUri.toString()]) {
        const res = await fetch(extraModel);
        if (!res.ok) {
          throw new Error(`Failed to fetch model: ${res.statusText}`);
        }
        const content = await res.text();
        modelCache[mUri.toString()] = editor.createModel(
          content,
          "typescript",
          mUri,
        );
      }
    }));
  } catch (error) {
    console.error("Error fetching extra models:", error);
    throw error;
  }
}

/**
 * Refresh ATA (Auto Type Acquisition) for TypeScript
 * @param code The code to analyze
 * @param ata The ATA function
 */
export async function refreshAta(
  code: string,
  ata: (
    options: { code: string; originToUse: string; },
  ) => Promise<Array<{ filePath: string; content: string; }>>,
): Promise<void> {
  try {
    const extraLibs: ExtraLib[] = (await ata({ code, originToUse })).map(
      ({ filePath, content }) => ({
        filePath: originToUse + filePath,
        content,
      }),
    );

    console.warn("Setting extra libraries:", { extraLibs });
    typescript.typescriptDefaults.setExtraLibs(extraLibs);

    const mjsFiles = extraLibs.filter((lib) => lib.filePath.endsWith(".mjs"));
    for (const lib of mjsFiles) {
      const myUri = Uri.parse(lib.filePath);
      const existingModel = editor.getModel(myUri);

      if (existingModel) {
        existingModel.setValue(lib.content);
      } else {
        editor.createModel(lib.content, "typescript", myUri);
      }
    }

    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      // 2691: An import path cannot end with '.tsx'
      // 17004: Cannot use JSX unless the '--jsx' flag is provided (false positive - jsx IS configured)
      diagnosticCodesToIgnore: [2691, 17004],
    });
    typescript.typescriptDefaults.setEagerModelSync(true);
  } catch (error) {
    console.error("Error refreshing ATA:", error);
    throw new Error(
      `Failed to refresh ATA: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Extract imports from code
 * @param code The code to analyze
 */
export function getImports(code: string): string[] {
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;
  return [...code.matchAll(importRegex)].map((match) => match[1]!);
}

/**
 * Load CSS for Monaco editor
 * @param version The Monaco editor version (defaults to the imported version)
 */
export async function loadMonacoCss(): Promise<void> {
  const link = document.createElement("link");
  const promiseIsResolved = new Promise<void>((resolve) => {
    link.onload = () => resolve();
  });

  link.rel = "stylesheet";
  link.href = `${originToUse}/start.css`;
  document.head.appendChild(link);

  await promiseIsResolved;
}

/**
 * Handle window resize for responsive editor
 * @param editorInstance The Monaco editor instance
 */
export function setupResponsiveEditor(
  editorInstance: editor.IStandaloneCodeEditor,
): () => void {
  const resizeHandler = () => {
    // Debounce resize events
    if (resizeHandler.timeout) {
      clearTimeout(resizeHandler.timeout);
    }

    resizeHandler.timeout = setTimeout(() => {
      editorInstance.layout();

      // Apply different settings based on screen size
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile settings
        editorInstance.updateOptions({
          minimap: { enabled: false },
          wordWrap: "on",
          folding: false,
        });
      } else if (width < 1024) {
        // Tablet settings
        editorInstance.updateOptions({
          minimap: { enabled: true, maxColumn: 60 },
          wordWrap: "on",
          folding: true,
        });
      } else {
        // Desktop settings
        editorInstance.updateOptions({
          minimap: { enabled: true },
          wordWrap: "off",
          folding: true,
        });
      }
    }, 100);
  };

  // Initialize with current size
  resizeHandler();

  // Add event listener
  window.addEventListener("resize", resizeHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", resizeHandler);
    if (resizeHandler.timeout) {
      clearTimeout(resizeHandler.timeout);
    }
  };
}

// Add timeout property to resizeHandler function
declare global {
  interface Function {
    timeout?: ReturnType<typeof setTimeout>;
  }
}

/**
 * Helper function to extract message text from diagnostic objects
 * @param diagnostic The diagnostic object that may have nested messageText
 */
function getMessageText(
  diagnostic: { messageText: string | { messageText: string; }; },
): string {
  return typeof diagnostic.messageText === "string"
    ? diagnostic.messageText
    : diagnostic.messageText.messageText;
}

/**
 * Check for TypeScript errors
 * @param model The Monaco editor model
 * @param uri The URI of the file
 */
export async function checkTypeScriptErrors(
  model: editor.ITextModel,
  uri: Uri,
): Promise<void> {
  try {
    console.warn("Running TypeScript check");
    const currentCode = model.getValue();

    // First, check for import statements that might need type definitions
    const imports = getImports(currentCode);

    if (imports.length > 0) {
      console.warn("Detected imports:", imports);
      // Wait a moment for types to be loaded
      await wait(100);
    }

    // Helper to wait for TypeScript worker with retry logic
    const getWorkerWithRetry = async (maxRetries = 3, delayMs = 100) => {
      let lastError: Error | undefined;
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await typescript.getTypeScriptWorker();
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          if (i === maxRetries - 1) throw lastError;
          await wait(delayMs);
        }
      }
      throw lastError ?? new Error("TypeScript worker not available");
    };

    // Now check for errors - with retry logic for TypeScript worker
    let worker;
    try {
      worker = await getWorkerWithRetry();
    } catch (error) {
      if (error instanceof Error && error.message.includes("TypeScript not registered")) {
        console.debug("TypeScript not yet initialized, skipping type check");
        return;
      }
      throw error;
    }
    const typeScriptWorker = await worker(uri);

    const [syntacticDiagnostics, semanticDiagnostics, suggestionDiagnostics] = await Promise.all([
      typeScriptWorker.getSyntacticDiagnostics(uri.toString()),
      typeScriptWorker.getSemanticDiagnostics(uri.toString()),
      typeScriptWorker.getSuggestionDiagnostics(uri.toString()),
    ]);

    // Log syntactic errors
    if (syntacticDiagnostics.length > 0) {
      console.error("Syntactic diagnostics:", syntacticDiagnostics);
    }

    // Check for missing modules and try to resolve them
    const missingModuleErrors = semanticDiagnostics.filter((
      d: { messageText: string | { messageText: string; }; },
    ) => getMessageText(d).includes("Cannot find module"));

    if (missingModuleErrors.length > 0) {
      console.warn("Missing module errors detected:", missingModuleErrors);

      // Try another refresh with more aggressive settings
      typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
        // 2691: An import path cannot end with '.tsx'
        // 17004: Cannot use JSX unless the '--jsx' flag is provided (false positive - jsx IS configured)
        diagnosticCodesToIgnore: [2691, 17004],
      });

      // Re-check after refreshing types
      const updatedSemanticDiagnostics = await typeScriptWorker
        .getSemanticDiagnostics(
          uri.toString(),
        );

      if (updatedSemanticDiagnostics.length < semanticDiagnostics.length) {
        console.warn("Successfully resolved some type errors");
      } else {
        console.warn(
          "Some modules still missing types:",
          updatedSemanticDiagnostics.filter((
            d: { messageText: string | { messageText: string; }; },
          ) => getMessageText(d).includes("Cannot find module")),
        );
      }
    }

    // Log suggestion diagnostics for debugging
    if (suggestionDiagnostics.length > 0) {
      console.warn("Suggestion diagnostics:", suggestionDiagnostics);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("TypeScript not registered")) {
      // TypeScript worker is not available, but Monaco's built-in validation may still work
      // Try to use marker service as fallback
      console.debug("TypeScript worker not available, using marker service fallback");

      typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
        // 2691: An import path cannot end with '.tsx'
        // 17004: Cannot use JSX unless the '--jsx' flag is provided (false positive - jsx IS configured)
        diagnosticCodesToIgnore: [2691, 17004],
      });

      // Check markers from Monaco's built-in validation
      try {
        const markers = editor.getModelMarkers({ resource: uri });
        const errorMarkers = markers.filter(m => m.severity === MarkerSeverity.Error);
        if (errorMarkers.length > 0) {
          console.warn("TypeScript errors detected via markers:", errorMarkers.map(m => ({
            message: m.message,
            line: m.startLineNumber,
            code: m.code,
          })));
        }
      } catch {
        // Marker service also unavailable, validation will happen when it's ready
      }

      return;
    }
    console.error("Error during TypeScript check:", error);
  }
}
