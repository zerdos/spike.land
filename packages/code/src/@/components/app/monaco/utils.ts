import { wait } from "@/lib/wait";
import { editor, languages, Uri, version as monacoVersion } from "@/workers/monaco-editor.worker";
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
      const codeSpace = match[0].split("/").pop();
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
    languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

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

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2691],
    });
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
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
  return [...code.matchAll(importRegex)].map((match) => match[1]);
}

/**
 * Load CSS for Monaco editor
 * @param version The Monaco editor version (defaults to the imported version)
 */
export async function loadMonacoCss(
  version: string = monacoVersion,
): Promise<void> {
  const link = document.createElement("link");
  const promiseIsResolved = new Promise<void>((resolve) => {
    link.onload = () => resolve();
  });

  link.rel = "stylesheet";
  link.href = `${originToUse}/monaco-editor@${version}/min/vs/editor/editor.main.css`;
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

    // Now check for errors
    const typeScriptWorker = await (await languages.typescript.getTypeScriptWorker())(uri);

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
    ) =>
      (typeof d.messageText === "string" ? d.messageText : d.messageText.messageText).includes(
        "Cannot find module",
      )
    );

    if (missingModuleErrors.length > 0) {
      console.warn("Missing module errors detected:", missingModuleErrors);

      // Try another refresh with more aggressive settings
      languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
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
          ) =>
            (typeof d.messageText === "string" ? d.messageText : d.messageText.messageText)
              .includes("Cannot find module")
          ),
        );
      }
    }

    // Log suggestion diagnostics for debugging
    if (suggestionDiagnostics.length > 0) {
      console.warn("Suggestion diagnostics:", suggestionDiagnostics);
    }
  } catch (error) {
    console.error("Error during TypeScript check:", error);
  }
}
