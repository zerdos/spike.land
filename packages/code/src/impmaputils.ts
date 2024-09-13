// src/importMapUtils.ts

import { namedTypes } from "ast-types";
import * as recast from "recast";

export const importMap = {
  imports: {
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/server": "/reactDomServer.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "@emotion/react": "/emotion.mjs",
    "react": "/reactMod.mjs",
    "framer-motion": "/motion.mjs",
    "react-dom": "/reactDom.mjs",
    "foo-bar": "/fooBar.mjs",
    "recharts": "/recharts.mjs",
  },
};

export function importMapReplace(code: string, origin: string): string {
  // Return early if the code already contains "importMapReplace" to avoid double processing
  if (code.slice(0, 30).includes("importMapReplace")) {
    return code;
  }

  const ast = recast.parse(code, {
    parser: require("acorn"),
  });

  recast.visit(ast, {
    visitImportDeclaration(path) {
      const node = path.node;
      if (node.source && node.source.value && typeof node.source.value === "string") {
        node.source.value = resolveModuleSpecifier(
          node.source.value,
          origin,
          node.specifiers as namedTypes.ImportSpecifier[],
        );
      }
      this.traverse(path);
    },
    visitExportNamedDeclaration(path) {
      const node = path.node;
      if (node.source && node.source.value && typeof node.source.value === "string") {
        node.source.value = resolveModuleSpecifier(
          node.source.value,
          origin,
          node.specifiers as namedTypes.ExportSpecifier[],
        );
      }
      this.traverse(path);
    },
    visitCallExpression(path) {
      const node = path.node;
      if (
        node.callee.type === "Import"
        && node.arguments.length === 1
        && node.arguments[0].type === "StringLiteral"
      ) {
        const arg = node.arguments[0];
        arg.value = resolveModuleSpecifier(arg.value, origin);
      }
      this.traverse(path);
    },
  });

  const replacedCode = recast.print(ast).code;

  return `/** importMapReplace${!origin ? new Date().toISOString() : ""} */\n${replacedCode}`;
}

function resolveModuleSpecifier(
  moduleName: string,
  origin: string,
  specifiers?: (namedTypes.ImportSpecifier | namedTypes.ExportSpecifier)[],
): string {
  const { imports } = importMap;

  if (imports[moduleName]) {
    return `${origin}${imports[moduleName]}`;
  }

  // Handle external URLs
  if (moduleName.startsWith("http")) {
    if (!moduleName.startsWith(origin)) {
      const url = new URL(moduleName);
      const queryParams = url.searchParams;
      if (queryParams.get("bundle") === "true" && queryParams.has("exports")) {
        const pkgName = url.pathname.slice(1); // Remove leading '/'
        const exports = queryParams.get("exports");
        return `${origin}/*${pkgName}?bundle=true&exports=${exports}`;
      }
      return moduleName; // Keep external URLs as they are
    }
  }

  // Do not change relative paths
  if (moduleName.startsWith(".") || moduleName.startsWith("/")) {
    return moduleName;
  }

  // Handle data URIs
  if (moduleName.startsWith("data:text")) {
    return `${moduleName}/index.js`;
  }

  // Handle specific origin-based paths
  if (moduleName.startsWith(`${origin}/live`) && !moduleName.includes("index.js")) {
    return `${moduleName}/index.js`;
  }

  if (moduleName.startsWith("./") && !moduleName.slice(2).includes(".")) {
    return `${origin}/live/${moduleName.slice(2)}/index.js`;
  }

  if (moduleName.startsWith("/live")) {
    return `${origin}${moduleName}/index.js`;
  }

  if (moduleName.startsWith("@/")) {
    return `${origin}/${moduleName}.mjs`;
  }

  // Handle file extensions
  const extension = moduleName.split(".").pop()!;
  if (["js", "mjs", "ts", "tsx"].includes(extension)) {
    return `${origin}/${moduleName}`;
  }

  // Handle specific exports
  if (specifiers && specifiers.length > 0) {
    const exportedNames = specifiers
      .filter(
        (specifier) => specifier.type === "ImportSpecifier" || specifier.type === "ExportSpecifier",
      )
      .map((specifier) => {
        if (specifier.imported && specifier.imported.type === "Identifier") {
          return specifier.imported.name;
        } else if (specifier.exported && specifier.exported.type === "Identifier") {
          return specifier.exported.name;
        } else {
          return null;
        }
      })
      .filter((name): name is string => name !== null)
      .join(",");

    return `${origin}/*${moduleName}?bundle=true&exports=${exportedNames}`;
  }

  // Default case
  return `${origin}/*${moduleName}?bundle`;
}

export default importMap;
