// src/importmap-utils.ts
import * as acorn from "acorn";
import acornJsx from "acorn-jsx";
import * as acornWalk from "acorn-walk";

// Define types for the AST nodes we're working with
interface ImportExportNode {
  type: string;
  source?: {
    value: string;
    start: number;
    end: number;
  };
  specifiers?: Array<{ type: string; imported?: { name: string }; local: { name: string } }>;
}

export interface ImportMap {
  imports: Record<string, string>;
}

// Configuration
const FILE_EXTENSIONS = new Set([
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".json",
  ".wasm",
  ".txt",
  ".svg",
  ".md",
  ".html",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".styl",
  ".graphql",
  ".gql",
  ".yml",
  ".toml",
  ".xml",
  ".csv",
  ".tsv",
  ".ini",
  ".properties",
  ".env",
  ".env.local",
  ".env.development",
  ".env.test",
  ".env.production",
  ".env.staging",
]);

const WORKER_PATTERNS = ["/workers/", ".worker"];
const COMPONENT_PATTERNS = [
  "@/components/",
  "/live/",
  "@/lib",
  "@/external",
  "@/hooks",
];

const EXTERNAL_DEPENDENCIES = [
  "react",
  "react-dom",
  "framer-motion",
  "@emotion/react",
  "@emotion/styled",
];

export const importMap: ImportMap = {
  imports: {
    "/@/": "/@/",
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "@emotion/react/jsx-dev-runtime": "/emotionJsxRuntime.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/server": "/reactDomServer.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "@emotion/react": "/emotion.mjs",
    "react": "/reactMod.mjs",
    "framer-motion": "/@/workers/framer-motion.mjs",
    "react-dom": "/reactDom.mjs",
  },
};

// Path Utilities
function hasKnownExtension(path: string): boolean {
  const lastDotIndex = path.lastIndexOf(".");
  return lastDotIndex !== -1 && FILE_EXTENSIONS.has(path.slice(lastDotIndex));
}

function isWorkerFile(path: string): boolean {
  return WORKER_PATTERNS.some(pattern => path.includes(pattern));
}

function isComponentFile(path: string): boolean {
  return COMPONENT_PATTERNS.some(pattern => path.includes(pattern));
}

function processQueryAndHash(path: string): {
  basePath: string;
  query: string;
  hash: string;
} {
  const [pathPart, hash] = path.split("#");
  const [basePath, query] = pathPart.split("?");

  return {
    basePath: basePath || "",
    query: query ? `?${query}` : "",
    hash: hash ? `#${hash}` : "",
  };
}

function shouldTransformPath(path: string): boolean {
  return (
    !path.includes("?bundle=false") &&
    !path.startsWith("data:") &&
    !path.startsWith("http://") &&
    !path.startsWith("https://") &&
    !path.startsWith("/live/") &&
    !/^https?:\/\//.test(path)
  );
}

function getExportsFromSpecifiers(specifiers: Array<{ type: string; imported?: { name: string }; local: { name: string } }>): string {
  return specifiers
    .filter(spec => spec.type === "ImportSpecifier")
    .map(spec => spec.imported?.name || spec.local.name)
    .filter(Boolean)
    .join(",");
}

function getMappedPath(
  path: string,
  exportsParam = "",
  hasFromClause = false,
  importMapImports: ImportMap["imports"] = importMap["imports"],
): string {
  // Early returns for complex or special paths
  if (path.includes("${") || path.includes("+")) return path;

  const { basePath, query: existingQuery, hash } = processQueryAndHash(path);

  // Exact match in import map
  if (importMapImports[basePath]) return importMapImports[basePath] + existingQuery + hash;

  // Handle worker files
  if (isWorkerFile(basePath)) {
    const baseWithoutExt = hasKnownExtension(basePath)
      ? basePath.substring(0, basePath.lastIndexOf("."))
      : basePath;
    const extension = hasFromClause ? ".mjs" : ".js";
    const resultPath = baseWithoutExt + extension;

    return !resultPath.startsWith(".") && !resultPath.startsWith("/")
      ? `/${resultPath}`
      : resultPath;
  }

  // Handle component and special files
  if (isComponentFile(basePath)) {
    const baseWithoutExt = hasKnownExtension(basePath)
      ? basePath.substring(0, basePath.lastIndexOf("."))
      : basePath;
    const extension = ".mjs";
    const resultPath = baseWithoutExt + extension;

    return !resultPath.startsWith(".") && !resultPath.startsWith("/")
      ? `/${resultPath}`
      : resultPath;
  }

  // Handle directory imports and paths without extension
  if (
    !hasKnownExtension(basePath) &&
    (basePath.startsWith(".") || basePath.startsWith("/"))
  ) {
    const extension = basePath.endsWith("/") ? "index.mjs" : ".mjs";
    return `${basePath}${extension}${existingQuery}${hash}`;
  }

  // Preserve live and absolute URLs
  if (basePath.startsWith("/live/") || /^https?:\/\//.test(basePath)) {
    return basePath + existingQuery + hash;
  }

  // Handle non-relative paths (only if not already mapped)
  if (!basePath.startsWith(".") && !basePath.startsWith("/") && !importMapImports[basePath]) {
    const params = [
      "bundle=true",
      `external=${EXTERNAL_DEPENDENCIES.join(",")}`,
    ];

    if (exportsParam) params.push(`exports=${exportsParam}`);

    const queryString = params.join("&");
    const finalQuery = existingQuery
      ? `${existingQuery}&${queryString}`
      : `?${queryString}`;

    return `/${basePath}${finalQuery}${hash}`;
  }

  return basePath + existingQuery + hash;
}

export function importMapReplace(
  code: string,
  _origin = "",
  impMap: ImportMap = importMap,
): string {
  // Handle binary data - convert to string if needed
  if (typeof code !== "string") {
    try {
      code = (code as unknown as {
        toString(): string;
      }).toString();
    } catch (_e) {
      return code;
    }
  }

  // Normalize line endings
  code = code.replace(/\r\n/g, "\n");

  // Prevent double processing
  if (code.includes("/** importMapReplace */") || code.includes("/* esm.sh")) {
    return code;
  }

  try {
    // Set up AST parser
    const parser = acorn.Parser.extend(acornJsx());
    let ast: acorn.Node;

    try {
      // Parse the code using acorn with JSX plugin
      ast = parser.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        allowAwaitOutsideFunction: true,
        allowImportExportEverywhere: true,
      });
    } catch (_e) {
      // If parsing fails, return the original code
      return code;
    }

    const codeLines = code.split("\n");
    const changes: Array<{ line: number; column: number; length: number; replacement: string; }> =
      [];

    // Process imports, exports, and dynamic imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acornWalk.full(ast, (node: any) => {
      try {
        // Handle import declarations
        if (
          node.type === "ImportDeclaration" && node.source && typeof node.source.value === "string"
        ) {
          const path = node.source.value;
          const exportsParam = getExportsFromSpecifiers(node.specifiers);
          const mappedPath = getMappedPath(path, exportsParam, true, impMap.imports);

          const { start, end } = node.source;

          // Check if path should be transformed
          if (shouldTransformPath(path)) {
            // Extract source text using exact offsets
            const sourceText = code.substring(start.offset, end.offset);
            const originalQuote = sourceText.charAt(0);

            changes.push({
              line: start.line - 1, // Convert to 0-based line index
              column: start.column, // Use raw column value
              length: end.column - start.column, // Length of the string including quotes
              replacement: `${originalQuote}${mappedPath}${originalQuote}`,
            });
          }
        }

        // Handle export from declarations
        if (
          node.type === "ExportNamedDeclaration" && node.source &&
          typeof node.source.value === "string"
        ) {
          const path = node.source.value;
          const exportsParam = getExportsFromSpecifiers(node.specifiers);
          const mappedPath = getMappedPath(path, exportsParam, true, impMap.imports);

          const { start, end } = node.source;
          // Extract source text using exact offsets
          const sourceText = code.substring(start.offset, end.offset);
          const originalQuote = sourceText.charAt(0);

          changes.push({
            line: start.line - 1, // Convert to 0-based line index
            column: start.column, // Use raw column value
            length: end.column - start.column, // Length of the string including quotes
            replacement: `${originalQuote}${mappedPath}${originalQuote}`,
          });
        }

        // Handle export all declarations
        if (
          node.type === "ExportAllDeclaration" && node.source &&
          typeof node.source.value === "string"
        ) {
          const path = node.source.value;
          const mappedPath = getMappedPath(path, "", true, impMap.imports);

          const { start, end } = node.source;
          // Extract source text using exact offsets
          const sourceText = code.substring(start.offset, end.offset);
          const originalQuote = sourceText.charAt(0);

          changes.push({
            line: start.line - 1, // Convert to 0-based line index
            column: start.column, // Use raw column value
            length: end.column - start.column, // Length of the string including quotes
            replacement: `${originalQuote}${mappedPath}${originalQuote}`,
          });
        }

        // Handle dynamic imports
        if (
          node.type === "CallExpression" &&
          node.callee.type === "Import" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          typeof node.arguments[0].value === "string"
        ) {
          const path = node.arguments[0].value;
          const mappedPath = getMappedPath(path, "", true, impMap.imports);

          const { start, end } = node.arguments[0];
          // Extract source text using exact offsets
          const sourceText = code.substring(start.offset, end.offset);
          const originalQuote = sourceText.charAt(0);

          changes.push({
            line: start.line - 1, // Convert to 0-based line index
            column: start.column, // Use raw column value
            length: end.column - start.column, // Length of the string including quotes
            replacement: `${originalQuote}${mappedPath}${originalQuote}`,
          });
        }
      } catch (err) {
        console.error("Error processing node:", err);
      }
    });

    // Apply changes in reverse order to avoid position shifts
    changes.sort((a, b) => {
      if (a.line !== b.line) return b.line - a.line;
      return b.column - a.column;
    });

    // Apply the changes
    for (const change of changes) {
      if (change.line >= 0 && change.line < codeLines.length) {
        const line = codeLines[change.line];
        if (change.column >= 0 && change.column + change.length <= line.length) {
          codeLines[change.line] = line.substring(0, change.column) +
            change.replacement +
            line.substring(change.column + change.length);
        }
      }
    }

    // Based on the tests, the original implementation always adds the header
    // whether or not changes were made
    return `/** importMapReplace */\n${codeLines.join("\n")}`;
  } catch (error) {
    console.error("AST transformation failed, falling back to original code:", error);
    return code;
  }
}

export default importMap;
