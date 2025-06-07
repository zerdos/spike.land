import { QueuedFetch } from "@/lib/queued-fetch";
import { tryCatch } from "@/lib/try-catch";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";

// Keep the globalThis reference style for shared worker compatibility

interface ExtraLib {
  filePath: string;
  content: string;
}

// Consolidated path cleaning logic (remains the same)
function cleanFilePath(filePath: string, originToUse: string): string {
  // Remove potential origins and CDN prefixes
  let cleaned = filePath
    .replace(originToUse, "")
    .replace("https://spike.land", "")
    .replace("https://esm.sh", "");

  // Remove node_modules, @types, version paths (e.g., /v18/)
  cleaned = cleaned
    .replace(/\/node_modules\//g, "/")
    .replace(/@types\//g, "")
    .replace(/dist\//g, "")
    .replace(/types\//g, "")
    .replace(/src\//g, "")
    .replace(/declarations\//g, "")
    .replace(/\/v\d+\//g, "/");
  // Remove specific TS version paths if they appear
  cleaned = cleaned.replace(/ts\d+\.\d+\//g, "");

  // Remove version numbers like @1.2.3
  cleaned = cleaned.replace(/@(\^)?\d+(\.)?\d+(\.)?\d+/g, "");

  // Normalize paths starting with /
  if (!cleaned.startsWith("/")) {
    cleaned = `/${cleaned}`;
  }

  // Remove any double slashes that might have been introduced
  cleaned = cleaned.replace(/\/\//g, "/");

  // Ensure it doesn't end with .d.ts/ - this shouldn't happen with ATA VFS keys but good practice
  cleaned = cleaned.replace(/\.d\.ts\//g, "/");

  return cleaned;
}

// Consolidated content cleaning logic (remains the same)
function cleanFileContent(content: string, originToUse: string): string {
  // Perform similar cleaning on content, focusing on import/reference paths
  let cleaned = content
    .replace(new RegExp(originToUse, "g"), "")
    .replace(/https:\/\/spike\.land/g, "")
    .replace(/https:\/\/esm\.sh/g, "");

  // Clean paths within the content
  cleaned = cleaned
    .replace(/\/node_modules\//g, "/")
    .replace(/@types\//g, "")
    .replace(/dist\//g, "")
    .replace(/types\//g, "")
    .replace(/src\//g, "")
    .replace(/declarations\//g, "");

  // Remove version numbers like @1.2.3
  cleaned = cleaned.replace(/@(\^)?\d+(\.)?\d+(\.)?\d+/g, "");

  // Remove specific TS version paths if they appear
  cleaned = cleaned.replace(/ts\d+\.\d+\//g, "");

  // Fix potentially broken import paths if origin was stripped
  cleaned = cleaned
    .replace(/from "\//g, 'from "')
    .replace(/path="\//g, 'path="');

  // Ensure it doesn't end with .d.ts/
  cleaned = cleaned.replace(/\.d\.ts\//g, "/");

  return cleaned;
}

// Helper to extract import specifiers from code
function extractImportSpecifiers(code: string): string[] {
  const sourceFile = ts.createSourceFile(
    "temp.tsx", // Temporary filename, doesn't matter
    code,
    ts.ScriptTarget.Latest,
    true, // setParentNodes
    ts.ScriptKind.TSX, // Assume TSX for flexibility
  );

  const imports: string[] = [];

  function visit(node: ts.Node) {
    // Check for import declarations: import ... from "specifier";
    if (
      ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    } // Check for dynamic imports: import("specifier")
    else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) {
        imports.push(arg.text);
      }
    } // Check for require calls: require("specifier") - less common in ESM workers but good to have
    else if (
      ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
      node.expression.text === "require"
    ) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) {
        imports.push(arg.text);
      }
    }
    // Triple-slash directives are handled via comment parsing below

    ts.forEachChild(node, visit);
  }

  // Also check for triple-slash references in comments
  ts.forEachLeadingCommentRange(
    sourceFile.text,
    sourceFile.getFullStart(),
    (pos, end, kind) => {
      if (
        kind === ts.SyntaxKind.MultiLineCommentTrivia ||
        kind === ts.SyntaxKind.SingleLineCommentTrivia
      ) {
        const commentText = sourceFile.text.substring(pos, end);
        const match = commentText.match(
          /<reference\s+path=["']([^"']+)["']\s*\/>/,
        );
        if (match && match[1]!) {
          imports.push(match[1]!);
        }
      }
    },
  );

  visit(sourceFile);
  return [...new Set(imports)]; // Return unique specifiers
}

// Main refactored ATA function
export async function ata({
  code,
  originToUse,
}: {
  code: string;
  originToUse: string;
}): Promise<ExtraLib[]> {
  console.warn("[ATA] Starting enhanced ATA process", {
    codeLength: code?.length,
    originToUse,
  }); // Changed to console.warn

  const queuedFetch = new QueuedFetch(4, 10000, 100); // Keep adjusted settings

  // 1. Extract imports from the original code first
  const extCode = `${code}
import "react";
import "@emotion/react";
import * as JSXruntime "@emotion/react/jsx-runtime.d.ts";
import "react/jsx-runtime";
import "react/jsx-dev-runtime";
import "react/jsx-runtime/jsx-dev-runtime";
import "react/jsx-runtime/jsx-dev-runtime.d.ts";
import "react/jsx-dev-runtime/jsx-dev-runtime.d.ts";
import "react/jsx-dev-runtime/jsx-dev-runtime";
import "react/jsx-dev-runtime/jsx-dev-runtime.d.ts";
// Add other common implicit dependencies if necessary
`;
  const importSpecifiers = extractImportSpecifiers(extCode);
  console.warn("[ATA] Extracted import specifiers:", importSpecifiers); // Changed to console.warn

  // 2. Run ATA
  const { data: vfs, error: vfsError } = await tryCatch(
    new Promise<Map<string, string>>((resolve) =>
      setupTypeAcquisition({
        projectName: "MonacoEditorTypes",
        typescript: ts,
        logger: console, // Keep console for ATA's internal logger, or create a more complex adapter
        fetcher: queuedFetch.fetch.bind(queuedFetch) as typeof fetch,
        delegate: {
          started: () => console.warn("[ATA] Type acquisition started."), // Changed to console.warn
          progress: (downloaded, total) => console.warn(`[ATA] Progress: ${downloaded}/${total}`), // Changed to console.warn
          receivedFile: (fileContent, filePath) =>
            console.warn(
              `[ATA] Received: ${filePath} (${fileContent.length} chars)`,
            ), // Changed to console.warn
          errorMessage: (userFacingMessage, error) =>
            console.error(`[ATA] Error: ${userFacingMessage}`, error),
          finished: (vfsMap) => {
            console.warn(
              `[ATA] Type acquisition finished. ${vfsMap.size} files in VFS.`,
            ); // Changed to console.warn
            resolve(vfsMap);
          },
        },
      })(extCode)
    ),
  );

  if (vfsError) {
    console.error("[ATA] Failed to acquire types:", vfsError);
    return [];
  }

  // 3. Process ATA VFS
  const processedLibs: Record<string, string> = {};
  for (const [filePath, content] of vfs.entries()) {
    const cleanedPath = cleanFilePath(filePath, originToUse);
    const cleanedContent = cleanFileContent(content, originToUse);
    if (!processedLibs[cleanedPath]) {
      processedLibs[cleanedPath] = cleanedContent;
    } else {
      console.warn( // Changed to console.warn
        `[ATA] Duplicate cleaned path from VFS: ${cleanedPath}. Keeping first version.`,
      );
    }
  }
  console.warn(
    `[ATA] Processed ${Object.keys(processedLibs).length} libs from initial VFS.`,
  ); // Changed to console.warn

  // 4. Identify & Fetch Missing Aliased Imports
  const aliasPrefix = "@/";
  const aliasFetchPromises: Array<Promise<void>> = [];

  for (const specifier of importSpecifiers) {
    if (specifier.startsWith(aliasPrefix)) {
      const mappedPath = specifier;
      // Construct the expected final path *after* cleaning
      const expectedCleanedPath = cleanFilePath(
        `/${mappedPath}.d.ts`,
        originToUse,
      ); // Assume .d.ts extension

      if (!processedLibs[expectedCleanedPath]) {
        // Construct URL with single quotes around the path as requested
        const fetchUrl = `${originToUse}/${mappedPath}.d.ts`;
        console.warn( // Changed to console.warn
          `[ATA] Alias '${specifier}' mapped to '${expectedCleanedPath}' not found in VFS. Attempting fetch: ${fetchUrl}`,
        );

        aliasFetchPromises.push(
          queuedFetch.fetch(fetchUrl)
            .then(async (response) => {
              if (response.ok) {
                const content = await response.text();
                const finalFilePath = cleanFilePath(fetchUrl, originToUse); // Use the final URL after redirects
                const cleanedContent = cleanFileContent(content, originToUse);

                if (!processedLibs[finalFilePath]) {
                  processedLibs[finalFilePath] = cleanedContent;
                  console.warn( // Changed to console.warn
                    `[ATA] Successfully fetched and added aliased lib: ${finalFilePath}`,
                  );
                } else {
                  console.warn( // Changed to console.warn
                    `[ATA] Fetched aliased lib already exists (possibly due to redirect): ${finalFilePath}`,
                  );
                }

                // Recursively fetch imports from this newly added file?
                // For simplicity, let's assume the initial ATA run + direct alias fetches are sufficient.
                // Adding recursion here would significantly increase complexity.
              } else {
                console.warn(
                  `[ATA] Failed to fetch aliased import ${specifier} from ${fetchUrl}: ${response.status} ${response.statusText}`,
                );
              }
            })
            .catch((error) => {
              console.error(
                `[ATA] Error fetching aliased import ${specifier} from ${fetchUrl}:`,
                error,
              );
            }),
        );
      } else {
        console.warn( // Changed to console.warn
          `[ATA] Alias '${specifier}' mapped to '${expectedCleanedPath}' already processed by ATA.`,
        );
      }
    }
  }

  // Wait for all alias fetches to complete
  const { error: aliasError } = await tryCatch(Promise.all(aliasFetchPromises));
  if (aliasError) {
    console.error("[ATA] Error during alias fetches:", aliasError);
    // Continue, but log the error
  }
  console.warn("[ATA] Finished processing aliased imports."); // Changed to console.warn

  // 5. Finalize
  const extraLibs: ExtraLib[] = Object.entries(processedLibs)
    .map(([filePath, content]) => ({ filePath, content }))
    .sort((a, b) => a.filePath.localeCompare(b.filePath));

  console.warn("[ATA] Enhanced ATA process finished.", {
    finalResultCount: extraLibs.length,
  }); // Changed to console.warn

  // Optimized package.json filtering
  const filePaths = new Set(extraLibs.map((lib) => lib.filePath));
  const filteredLibs = extraLibs.filter((lib) => {
    if (lib.filePath.endsWith("/package.json")) {
      const indexDts = lib.filePath.replace("/package.json", "/index.d.ts");
      return !filePaths.has(indexDts);
    }
    if (lib.filePath.endsWith(".mts")) {
      const mts = lib.filePath.replace(".mts", ".d.ts").replace(".d.d", ".d");
      return !filePaths.has(mts);
    }
    return true;
  });

  return filteredLibs;
}

// Assign to self for SharedWorker context
Object.assign(self, { ata });
