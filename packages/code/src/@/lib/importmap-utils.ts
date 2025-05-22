// src/importMapUtils.ts

export interface ImportMap {
  imports: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

export interface ImportMapConfig {
  fileExtensions: readonly string[];
  workerPatterns: readonly string[];
  componentPatterns: readonly string[];
  externalDependencies: readonly string[];
  transformParams: {
    bundleParam: string;
    externalParam: string;
  };
}

// Configuration Constants - made readonly for better immutability
const DEFAULT_CONFIG: ImportMapConfig = {
  fileExtensions: [
    ".js", ".mjs", ".ts", ".tsx", ".jsx", ".json", ".wasm",
    ".txt", ".svg", ".md", ".html", ".css", ".scss", ".sass",
    ".less", ".styl", ".graphql", ".gql", ".yml", ".toml",
    ".xml", ".csv", ".tsv", ".ini", ".properties",
    ".env", ".env.local", ".env.development", ".env.test",
    ".env.production", ".env.staging",
  ] as const,
  
  workerPatterns: ["/workers/", ".worker"] as const,
  
  componentPatterns: [
    "@/components/", "@/services/", "@/config/", "@/utils/",
    "@/tools/", "@/workflows/", "/live/", "@/lib", "@/external", "@/hooks",
  ] as const,
  
  externalDependencies: [
    "react", "react-dom", "framer-motion", "@emotion/react", "@emotion/styled",
  ] as const,
  
  transformParams: {
    bundleParam: "bundle=true",
    externalParam: "external",
  },
} as const;

// Create sets for O(1) lookups
const FILE_EXTENSIONS = new Set(DEFAULT_CONFIG.fileExtensions);

// Default Import Map
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

// Compiled regex patterns for better performance
const REGEX_PATTERNS = {
  queryHash: /^([^#?]*?)(\?[^#]*)?(#.*)?$/,
  namedImports: /\{([^}]*)\}/s,
  simpleImport: /^(\s*import\s+)(['"])([^'"]+)(['"];\s*$)/gm,
  fromImport: /^(\s*import\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
  exportFrom: /^(\s*export\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
  dynamicImport: /(\bimport\s*\(\s*['"])([^'"]+)(['"]\s*\))/g,
  pathInQuotes: /['"]([^'"]+)['"]/,
  importAlias: /\s+as\s+\w+/g,
  templateLiteral: /\$\{.*?\}/,
  urlProtocol: /^https?:\/\//,
} as const;

// Skip processing markers
const SKIP_MARKERS = [
  "/** importMapReplace */",
  "/* esm.sh",
  "?bundle=true",
  "data:",
  "http://",
  "https://",
] as const;

interface PathComponents {
  readonly basePath: string;
  readonly query: string;
  readonly hash: string;
}

interface TransformContext {
  readonly config: ImportMapConfig;
  readonly importMapImports: Record<string, string>;
  readonly hasFromClause: boolean;
  readonly exportsParam: string;
}

// Utility class for better organization
class PathUtils {
  static hasKnownExtension(path: string): boolean {
    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex === -1) return false;
    
    const extension = path.slice(lastDotIndex);
    return FILE_EXTENSIONS.has(extension);
  }

  static matchesPatterns(path: string, patterns: readonly string[]): boolean {
    return patterns.some(pattern => path.includes(pattern));
  }

  static isWorkerFile(path: string): boolean {
    return this.matchesPatterns(path, DEFAULT_CONFIG.workerPatterns);
  }

  static isComponentFile(path: string): boolean {
    return this.matchesPatterns(path, DEFAULT_CONFIG.componentPatterns);
  }

  static parsePathComponents(path: string): PathComponents {
    const match = path.match(REGEX_PATTERNS.queryHash);
    if (!match) {
      return { basePath: path, query: "", hash: "" };
    }

    const [, basePath = "", query = "", hash = ""] = match;
    return {
      basePath,
      query: query || "",
      hash: hash || "",
    };
  }

  static shouldTransformPath(path: string): boolean {
    return !SKIP_MARKERS.some(marker => path.includes(marker));
  }

  static removeExtension(path: string): string {
    if (!this.hasKnownExtension(path)) return path;
    return path.substring(0, path.lastIndexOf("."));
  }

  static ensureLeadingSlash(path: string): string {
    return path.startsWith(".") || path.startsWith("/") ? path : `/${path}`;
  }
}

class ImportParser {
  static extractNamedImports(importStatement: string): string {
    const match = importStatement.match(REGEX_PATTERNS.namedImports);
    if (!match?.[1]) return "";

    return match[1]
      .split(",")
      .map(item => item.trim().replace(REGEX_PATTERNS.importAlias, ""))
      .filter(Boolean)
      .join(",");
  }

  static buildExternalUrl(
    basePath: string, 
    exportsParam: string, 
    config: ImportMapConfig
  ): string {
    const params = [config.transformParams.bundleParam];
    
    if (config.externalDependencies.length > 0) {
      params.push(`${config.transformParams.externalParam}=${config.externalDependencies.join(",")}`);
    }
    
    if (exportsParam) {
      params.push(`exports=${exportsParam}`);
    }

    return `/${basePath}?${params.join("&")}`;
  }
}

class PathTransformer {
  static transform(path: string, context: TransformContext): string {
    const { basePath, query, hash } = PathUtils.parsePathComponents(path);

    // Early returns for special cases
    if (this.hasComplexPath(basePath) || context.importMapImports[basePath]) {
      return path;
    }

    const transformedBase = this.transformBasePath(basePath, context);
    return `${transformedBase}${query}${hash}`;
  }

  private static hasComplexPath(path: string): boolean {
    return REGEX_PATTERNS.templateLiteral.test(path) || 
           path.includes("+") || 
           REGEX_PATTERNS.urlProtocol.test(path);
  }

  private static transformBasePath(basePath: string, context: TransformContext): string {
    // Handle worker files
    if (PathUtils.isWorkerFile(basePath)) {
      return this.transformWorkerPath(basePath, context.hasFromClause);
    }

    // Handle component files
    if (PathUtils.isComponentFile(basePath)) {
      return this.transformComponentPath(basePath);
    }

    // Handle directory imports and extensionless files
    if (this.needsExtension(basePath)) {
      return this.addExtension(basePath);
    }

    // Handle external dependencies
    if (this.isExternalDependency(basePath)) {
      return ImportParser.buildExternalUrl(basePath, context.exportsParam, context.config);
    }

    return basePath;
  }

  private static transformWorkerPath(basePath: string, hasFromClause: boolean): string {
    const baseWithoutExt = PathUtils.removeExtension(basePath);
    const extension = hasFromClause ? ".mjs" : ".js";
    return PathUtils.ensureLeadingSlash(baseWithoutExt + extension);
  }

  private static transformComponentPath(basePath: string): string {
    const baseWithoutExt = PathUtils.removeExtension(basePath);
    return PathUtils.ensureLeadingSlash(baseWithoutExt + ".mjs");
  }

  private static needsExtension(basePath: string): boolean {
    return !PathUtils.hasKnownExtension(basePath) && 
           (basePath.startsWith(".") || basePath.startsWith("/"));
  }

  private static addExtension(basePath: string): string {
    const extension = basePath.endsWith("/") ? "index.mjs" : ".mjs";
    return basePath + extension;
  }

  private static isExternalDependency(basePath: string): boolean {
    return !basePath.startsWith(".") && 
           !basePath.startsWith("/") && 
           !basePath.startsWith("/live/");
  }
}

// Main transformation function
function getMappedPath(
  path: string,
  exportsParam = "",
  hasFromClause = false,
  importMapImports: Record<string, string> = importMap.imports,
  config: ImportMapConfig = DEFAULT_CONFIG,
): string {
  const context: TransformContext = {
    config,
    importMapImports,
    hasFromClause,
    exportsParam,
  };

  return PathTransformer.transform(path, context);
}

// Code transformation class
class CodeTransformer {
  private static readonly PROCESSED_MARKER = "/** importMapReplace */";

  static transform(code: string): string {
    if (this.isAlreadyProcessed(code)) {
      return code;
    }

    let transformedCode = this.normalizeLineEndings(code);
    transformedCode = this.transformSimpleImports(transformedCode);
    transformedCode = this.transformFromImports(transformedCode);
    transformedCode = this.transformExportFromClauses(transformedCode);
    transformedCode = this.transformDynamicImports(transformedCode);
    

    return `${this.PROCESSED_MARKER}\n${transformedCode}`;
  }

  private static isAlreadyProcessed(code: string): boolean {
    return SKIP_MARKERS.some(marker => code.includes(marker));
  }

  private static normalizeLineEndings(code: string): string {
    return code.replace(/\r\n/g, "\n");
  }

  private static transformSimpleImports(code: string): string {
    return code.replace(REGEX_PATTERNS.simpleImport, (match, pre, q1, path, q2) => {
      if (!PathUtils.shouldTransformPath(path)) return match;
      const fullPath = getMappedPath(path, "", false);
      return `${pre}${q1}${fullPath}${q2}`;
    });
  }

  private static transformFromImports(code: string): string {
    return this.transformImportExportPattern(code, REGEX_PATTERNS.fromImport);
  }

  private static transformExportFromClauses(code: string): string {
    return this.transformImportExportPattern(code, REGEX_PATTERNS.exportFrom);
  }

  private static transformImportExportPattern(code: string, pattern: RegExp): string {
    return code.replace(pattern, (match) => {
      if (match.includes(this.PROCESSED_MARKER)) return match;

      const pathMatch = match.match(REGEX_PATTERNS.pathInQuotes);
      if (!pathMatch) return match;

      const importPath = pathMatch[1];
      if (!PathUtils.shouldTransformPath(importPath)) return match;

      const exportsParam = ImportParser.extractNamedImports(match);
      const mappedPath = getMappedPath(importPath, exportsParam, true);
      return match.replace(REGEX_PATTERNS.pathInQuotes, `"${mappedPath}"`);
    });
  }

  private static transformDynamicImports(code: string): string {
    return code.replace(REGEX_PATTERNS.dynamicImport, (match) => {
      const pathMatch = match.match(REGEX_PATTERNS.pathInQuotes);
      if (!pathMatch) return match;

      const importPath = pathMatch[1];
      if (!PathUtils.shouldTransformPath(importPath)) return match;

      const mappedPath = getMappedPath(importPath, "", true);
      return match.replace(REGEX_PATTERNS.pathInQuotes, `"${mappedPath}"`);
    });
  }
}

// Main export function with better error handling
export function importMapReplace(code: string): string {
  try {
    return CodeTransformer.transform(code);
  } catch (error) {
    console.error("Error in importMapReplace:", error);
    return code; // Return original code on error
  }
}

// Export utilities for testing and advanced usage
export {
  DEFAULT_CONFIG,
  PathUtils,
  ImportParser,
  getMappedPath,
};

export default importMap;