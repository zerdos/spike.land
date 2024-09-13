// src/importMapUtils.ts

import * as acorn from "acorn";
import * as escodegen from "escodegen";
import * as estraverse from "estraverse";

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

  const ast = acorn.parse(code, { sourceType: "module", ecmaVersion: "latest" });

  estraverse.replace(ast, {
    enter(node) {
      if (node.type === "ImportDeclaration" || node.type === "ExportNamedDeclaration") {
        if (node.source && node.source.type === "Literal") {
          node.source.value = resolveModuleSpecifier(node.source.value, origin, node.specifiers);
        }
      } else if (node.type === "CallExpression" && node.callee.type === "Import") {
        const arg = node.arguments[0];
        if (arg && arg.type === "Literal") {
          arg.value = resolveModuleSpecifier(arg.value, origin);
        }
      }
    },
  });

  const replacedCode = escodegen.generate(ast, { comment: true });

  return `/** importMapReplace${!origin ? new Date().toISOString() : ""} */\n${replacedCode}`;
}

function resolveModuleSpecifier(
  moduleName: string,
  origin: string,
  specifiers?: any[],
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

  // Handle specific exports
  if (specifiers && specifiers.length > 0) {
    const exportedNames = specifiers
      .filter((specifier) => specifier.type === "ImportSpecifier" || specifier.type === "ExportSpecifier")
      .map((specifier) => specifier.imported.name || specifier.exported.name)
      .join(",");

    return `${origin}/*${moduleName}?bundle=true&exports=${exportedNames}`;
  }

  // Default case
  return `${origin}/*${moduleName}?bundle`;
}

export default importMap;
