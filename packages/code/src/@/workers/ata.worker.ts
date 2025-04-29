import { QueuedFetch } from "@/lib/queued-fetch";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";

// Keep the globalThis reference style for shared worker compatibility
const _self = globalThis;

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
    .replace(/@types\//g, "");

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
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    } // Check for dynamic imports: import("specifier")
    else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
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
  ts.forEachLeadingCommentRange(sourceFile.text, sourceFile.getFullStart(), (pos, end, kind) => {
    if (
      kind === ts.SyntaxKind.MultiLineCommentTrivia ||
      kind === ts.SyntaxKind.SingleLineCommentTrivia
    ) {
      const commentText = sourceFile.text.substring(pos, end);
      const match = commentText.match(/<reference\s+path=["']([^"']+)["']\s*\/>/);
      if (match && match[1]) {
        imports.push(match[1]);
      }
    }
  });

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
  console.log("[ATA] Starting enhanced ATA process", { codeLength: code?.length, originToUse });

  const queuedFetch = new QueuedFetch(4, 10000, 100); // Keep adjusted settings

  // 1. Extract imports from the original code first
  const importSpecifiers = extractImportSpecifiers(code);
  console.log("[ATA] Extracted import specifiers:", importSpecifiers);

  // Add common dependencies that might not be explicitly imported in user code
  const augmentedCode = `${code}
import "react";
import "@emotion/react";
import * as JSXruntime "@emotion/react/jsx-runtime";
// Add other common implicit dependencies if necessary
`;

  try {
    // 2. Run ATA
    const vfs = await new Promise<Map<string, string>>((resolve, reject) => {
      try {
        const ataInstance = setupTypeAcquisition({
          projectName: "MonacoEditorTypes",
          typescript: ts,
          logger: console,
          fetcher: queuedFetch.fetch.bind(queuedFetch) as typeof fetch,
          delegate: {
            started: () => console.log("[ATA] Type acquisition started."),
            progress: (downloaded, total) => console.log(`[ATA] Progress: ${downloaded}/${total}`),
            receivedFile: (fileContent, filePath) =>
              console.log(`[ATA] Received: ${filePath} (${fileContent.length} chars)`),
            errorMessage: (userFacingMessage, error) =>
              console.error(`[ATA] Error: ${userFacingMessage}`, error),
            finished: (vfsMap) => {
              console.log(`[ATA] Type acquisition finished. ${vfsMap.size} files in VFS.`);
              resolve(vfsMap);
            },
          },
        });
        ataInstance(augmentedCode);
      } catch (error) {
        console.error("[ATA] Error initializing setupTypeAcquisition:", error);
        reject(error);
      }
    });

    // 3. Process ATA VFS
    const processedLibs: Record<string, string> = {};
    for (const [filePath, content] of vfs.entries()) {
      const cleanedPath = cleanFilePath(filePath, originToUse);
      const cleanedContent = cleanFileContent(content, originToUse);
      if (!processedLibs[cleanedPath]) {
        processedLibs[cleanedPath] = cleanedContent;
      } else {
        console.log(
          `[ATA] Duplicate cleaned path from VFS: ${cleanedPath}. Keeping first version.`,
        );
      }
    }
    console.log(`[ATA] Processed ${Object.keys(processedLibs).length} libs from initial VFS.`);

    // 4. Identify & Fetch Missing Aliased Imports
    const aliasPrefix = "@/";
    const aliasFetchPromises: Array<Promise<void>> = [];

    for (const specifier of importSpecifiers) {
      if (specifier.startsWith(aliasPrefix)) {
        const mappedPath = specifier;
        // Construct the expected final path *after* cleaning
        const expectedCleanedPath = cleanFilePath(`/${mappedPath}.d.ts`, originToUse); // Assume .d.ts extension

        if (!processedLibs[expectedCleanedPath]) {
          // Construct URL with single quotes around the path as requested
          const fetchUrl = `${originToUse}/${mappedPath}.d.ts`;
          console.log(
            `[ATA] Alias '${specifier}' mapped to '${expectedCleanedPath}' not found in VFS. Attempting fetch: ${fetchUrl}`,
          );

          aliasFetchPromises.push(
            queuedFetch.fetch(fetchUrl)
              .then(async (response) => {
                if (response.ok) {
                  const content = await response.text();
                  const finalFilePath = cleanFilePath(response.url, originToUse); // Use the final URL after redirects
                  const cleanedContent = cleanFileContent(content, originToUse);

                  if (!processedLibs[finalFilePath]) {
                    processedLibs[finalFilePath] = cleanedContent;
                    console.log(
                      `[ATA] Successfully fetched and added aliased lib: ${finalFilePath}`,
                    );
                  } else {
                    console.log(
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
              .catch(error => {
                console.error(
                  `[ATA] Error fetching aliased import ${specifier} from ${fetchUrl}:`,
                  error,
                );
              }),
          );
        } else {
          console.log(
            `[ATA] Alias '${specifier}' mapped to '${expectedCleanedPath}' already processed by ATA.`,
          );
        }
      }
    }

    // Wait for all alias fetches to complete
    await Promise.all(aliasFetchPromises);
    console.log("[ATA] Finished processing aliased imports.");

    // 5. Finalize
    const extraLibs: ExtraLib[] = Object.entries(processedLibs)
      .map(([filePath, content]) => ({ filePath, content }))
      .sort((a, b) => a.filePath.localeCompare(b.filePath));

    console.log("[ATA] Enhanced ATA process finished.", { finalResultCount: extraLibs.length });

    // remove the unnecessary files

    const filteredLibs = extraLibs.filter(lib =>{

      if (lib.filePath.endsWith("/package.json")) {
        const search = lib.filePath.replace("/package.json", "/index.d.ts");
        return !extraLibs.some(lib => lib.filePath === search);
      }
      return true;
    }
    );  
    
    return filteredLibs;
  } catch (error) {
    console.error("[ATA] Failed during enhanced type acquisition process:", error);
    return []; // Return empty array on failure
  }
}

// Assign to self for SharedWorker context
Object.assign(_self, { ata });
