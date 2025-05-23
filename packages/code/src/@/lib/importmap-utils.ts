// src/importMapUtils.ts

// Types
export interface ImportMap {
  imports: Record<string, string>;
}

interface ParsedPath {
  basePath: string;
  query: string;
  hash: string;
}

interface TransformOptions {
  exportsParam?: string;
  hasFromClause?: boolean;
  importMapImports?: ImportMap["imports"];
}

// Configuration
const CONFIG = {
  FILE_EXTENSIONS: new Set([
    ".js", ".mjs", ".ts", ".tsx", ".jsx", ".json", ".wasm",
    ".txt", ".svg", ".md", ".html", ".css", ".scss", ".sass",
    ".less", ".styl", ".graphql", ".gql", ".yml", ".toml",
    ".xml", ".csv", ".tsv", ".ini", ".properties",
    ".env", ".env.local", ".env.development", ".env.test",
    ".env.production", ".env.staging",
  ]),
  
  WORKER_PATTERNS: ["/workers/", ".worker"] as const,
  
  COMPONENT_PATTERNS: [
    "@/components/", "@/services/", "@/config/", "@/utils/",
    "@/tools/", "@/workflows/", "/live/", "@/lib",
    "@/external", "@/hooks",
  ] as const,
  
  EXTERNAL_DEPENDENCIES: [
    "react", "react-dom", "framer-motion",
    "@emotion/react", "@emotion/styled",
  ] as const,
  
  SPECIAL_PROTOCOLS: ["data:", "http://", "https://"] as const,
  
  DEFAULT_EXTENSIONS: {
    WORKER: { withFrom: ".mjs", withoutFrom: ".js" },
    COMPONENT: ".mjs",
    DIRECTORY: "index.mjs",
    DEFAULT: ".mjs",
  } as const,
} as const;

// Default Import Map
export const defaultImportMap: ImportMap = {
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
  SIMPLE_IMPORT: /^(\s*import\s+)(['"])([^'"]+)(['"];\s*$)/gm,
  IMPORT_WITH_FROM: /^(\s*import\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
  EXPORT_FROM: /^(\s*export\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
  DYNAMIC_IMPORT: /(\bimport\s*\(\s*['"])([^'"]+)(['"]\s*\))/g,
  NAMED_IMPORTS: /\{([^}]*)\}/s,
  PATH_QUOTE: /['"]([^'"]+)['"]/,
  BUNDLE_PARAM: /\?bundle=true/,
  TEMPLATE_LITERAL: /\$\{/,
  ABSOLUTE_URL: /^https?:\/\//,
  PROCESSED_MARKER: /(?:\/\*\* importMapReplace \*\/|\/\* esm\.sh)/,
} as const;

// Utility Classes
class PathParser {
  /**
   * Parses a path into its components (base, query, hash)
   */
  static parse(path: string): ParsedPath {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    
    let basePath = path;
    let query = "";
    let hash = "";
    
    if (hashIndex !== -1) {
      hash = path.slice(hashIndex);
      basePath = path.slice(0, hashIndex);
    }
    
    if (queryIndex !== -1 && (hashIndex === -1 || queryIndex < hashIndex)) {
      query = basePath.slice(queryIndex);
      basePath = basePath.slice(0, queryIndex);
    }
    
    return { basePath, query, hash };
  }
  
  /**
   * Checks if a path has a known file extension
   */
  static hasKnownExtension(path: string): boolean {
    const lastDotIndex = path.lastIndexOf(".");
    return lastDotIndex !== -1 && CONFIG.FILE_EXTENSIONS.has(path.slice(lastDotIndex));
  }
  
  /**
   * Removes file extension from path
   */
  static removeExtension(path: string): string {
    const lastDotIndex = path.lastIndexOf(".");
    return this.hasKnownExtension(path) ? path.slice(0, lastDotIndex) : path;
  }
}

class PathMatcher {
  /**
   * Checks if path is a worker file
   */
  static isWorkerFile(path: string): boolean {
    return CONFIG.WORKER_PATTERNS.some(pattern => path.includes(pattern));
  }
  
  /**
   * Checks if path is a component file
   */
  static isComponentFile(path: string): boolean {
    return CONFIG.COMPONENT_PATTERNS.some(pattern => path.includes(pattern));
  }
  
  /**
   * Checks if path should be transformed
   */
  static shouldTransform(path: string): boolean {
    if (REGEX_PATTERNS.BUNDLE_PARAM.test(path)) return false;
    if (path.includes("/live/")) return false;
    
    return !CONFIG.SPECIAL_PROTOCOLS.some(protocol => path.startsWith(protocol));
  }
  
  /**
   * Checks if path is relative
   */
  static isRelativePath(path: string): boolean {
    return path.startsWith(".") || path.startsWith("/");
  }
}

class ImportExtractor {
  /**
   * Extracts named imports from import statement
   */
  static extractNamedImports(statement: string): string {
    const match = statement.match(REGEX_PATTERNS.NAMED_IMPORTS);
    if (!match?.[1]) return "";
    
    return match[1]
      .split(",")
      .map(item => item.trim().split(" as ")[0].trim())
      .filter(Boolean)
      .join(",");
  }
  
  /**
   * Extracts import path from statement
   */
  static extractPath(statement: string): string | null {
    const match = statement.match(REGEX_PATTERNS.PATH_QUOTE);
    return match?.[1] || null;
  }
}

class PathTransformer {
  private importMap: ImportMap["imports"];
  
  constructor(importMap: ImportMap["imports"] = defaultImportMap.imports) {
    this.importMap = importMap;
  }
  
  /**
   * Transforms a path according to import map rules
   */
  transform(path: string, options: TransformOptions = {}): string {
    const { exportsParam = "", hasFromClause = false } = options;
    const { basePath, query, hash } = PathParser.parse(path);
    
    // Handle special cases
    if (this.shouldSkipTransform(path, basePath)) {
      return path;
    }
    
    // Check exact match in import map
    if (this.importMap[basePath]) {
      return path;
    }
    
    // Handle different path types
    if (PathMatcher.isWorkerFile(basePath)) {
      return this.transformWorkerPath(basePath, query, hash, hasFromClause);
    }
    
    if (PathMatcher.isComponentFile(basePath)) {
      return this.transformComponentPath(basePath, query, hash);
    }
    
    if (!PathParser.hasKnownExtension(basePath) && PathMatcher.isRelativePath(basePath)) {
      return this.transformDirectoryPath(basePath, query, hash);
    }
    
    if (!PathMatcher.isRelativePath(basePath)) {
      return this.transformExternalPath(basePath, query, hash, exportsParam);
    }
    
    return `${basePath}${query}${hash}`;
  }
  
  private shouldSkipTransform(path: string, basePath: string): boolean {
    return (
      REGEX_PATTERNS.TEMPLATE_LITERAL.test(path) ||
      path.includes("+") ||
      basePath.startsWith("/live/") ||
      REGEX_PATTERNS.ABSOLUTE_URL.test(basePath)
    );
  }
  
  private transformWorkerPath(
    basePath: string,
    query: string,
    hash: string,
    hasFromClause: boolean
  ): string {
    const baseWithoutExt = PathParser.removeExtension(basePath);
    const extension = hasFromClause 
      ? CONFIG.DEFAULT_EXTENSIONS.WORKER.withFrom 
      : CONFIG.DEFAULT_EXTENSIONS.WORKER.withoutFrom;
    
    return this.ensureAbsolutePath(`${baseWithoutExt}${extension}${query}${hash}`);
  }
  
  private transformComponentPath(
    basePath: string,
    query: string,
    hash: string
  ): string {
    const baseWithoutExt = PathParser.removeExtension(basePath);
    const extension = CONFIG.DEFAULT_EXTENSIONS.COMPONENT;
    
    return this.ensureAbsolutePath(`${baseWithoutExt}${extension}${query}${hash}`);
  }
  
  private transformDirectoryPath(
    basePath: string,
    query: string,
    hash: string
  ): string {
    const extension = basePath.endsWith("/") 
      ? CONFIG.DEFAULT_EXTENSIONS.DIRECTORY 
      : CONFIG.DEFAULT_EXTENSIONS.DEFAULT;
    
    return `${basePath}${extension}${query}${hash}`;
  }
  
  private transformExternalPath(
    basePath: string,
    query: string,
    hash: string,
    exportsParam: string
  ): string {
    const params = [
      "bundle=true",
      `external=${CONFIG.EXTERNAL_DEPENDENCIES.join(",")}`,
    ];
    
    if (exportsParam) {
      params.push(`exports=${exportsParam}`);
    }
    
    const queryString = params.join("&");
    const existingQuery = query ? query.slice(1) : "";
    const combinedQuery = existingQuery 
      ? `?${queryString}&${existingQuery}` 
      : `?${queryString}`;
    
    return `/${basePath}${combinedQuery}${hash}`;
  }
  
  private ensureAbsolutePath(path: string): string {
    return !path.startsWith(".") && !path.startsWith("/") ? `/${path}` : path;
  }
}

// Main export function
export function importMapReplace(
  code: string,
  importMap: ImportMap["imports"] = defaultImportMap.imports
): string {
  // Prevent double processing
  if (REGEX_PATTERNS.PROCESSED_MARKER.test(code)) {
    return code;
  }
  
  // Normalize line endings
  code = code.replace(/\r\n/g, "\n");
  
  const transformer = new PathTransformer(importMap);
  
  // Replace simple imports
  code = code.replace(
    REGEX_PATTERNS.SIMPLE_IMPORT,
    (match, pre, q1, path, q2) => {
      if (!PathMatcher.shouldTransform(path)) return match;
      const fullPath = transformer.transform(path);
      return `${pre}${q1}${fullPath}${q2}`;
    }
  );
  
  // Replace imports with from clause
  code = code.replace(
    REGEX_PATTERNS.IMPORT_WITH_FROM,
    (match) => {
      const importPath = ImportExtractor.extractPath(match);
      if (!importPath || !PathMatcher.shouldTransform(importPath)) {
        return match;
      }
      
      const exportsParam = ImportExtractor.extractNamedImports(match);
      const mappedPath = transformer.transform(importPath, { 
        exportsParam, 
        hasFromClause: true 
      });
      
      return match.replace(REGEX_PATTERNS.PATH_QUOTE, `"${mappedPath}"`);
    }
  );
  
  // Replace export from clauses
  code = code.replace(
    REGEX_PATTERNS.EXPORT_FROM,
    (match) => {
      const exportPath = ImportExtractor.extractPath(match);
      if (!exportPath || !PathMatcher.shouldTransform(exportPath)) {
        return match;
      }
      
      const exportsParam = ImportExtractor.extractNamedImports(match);
      const mappedPath = transformer.transform(exportPath, { 
        exportsParam, 
        hasFromClause: true 
      });
      
      return match.replace(REGEX_PATTERNS.PATH_QUOTE, `"${mappedPath}"`);
    }
  );
  
  // Replace dynamic imports
  code = code.replace(
    REGEX_PATTERNS.DYNAMIC_IMPORT,
    (match) => {
      const importPath = ImportExtractor.extractPath(match);
      if (!importPath || !PathMatcher.shouldTransform(importPath)) {
        return match;
      }
      
      const mappedPath = transformer.transform(importPath, { hasFromClause: true });
      return match.replace(REGEX_PATTERNS.PATH_QUOTE, `"${mappedPath}"`);
    }
  );
  
  return `/** importMapReplace */\n${code}`;
}

// Re-export for backward compatibility
export const importMap = defaultImportMap;
export default defaultImportMap;