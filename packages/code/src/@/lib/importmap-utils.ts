// src/importMapUtils.ts

export type ImportMap = {
  imports: Record<string, string>;
};

// Comprehensive sets and configurations
const FILE_EXTENSIONS = new Set([
  '.js', '.mjs', '.ts', '.tsx', '.jsx', 
  '.json', '.wasm', '.txt', '.svg', '.md', 
  '.html', '.css', '.scss', '.sass', '.less', 
  '.styl', '.graphql', '.gql', '.yml', '.toml', 
  '.xml', '.csv', '.tsv', '.ini', '.properties', 
  '.env', '.env.local', '.env.development', 
  '.env.test', '.env.production', '.env.staging'
]);

const WORKER_PATTERNS = ['/workers/', '.worker'];
const COMPONENT_PATTERNS = [
  '@/components/', '/live/', '@/lib', 
  '@/external', '@/hooks'
];

const EXTERNAL_DEPENDENCIES = [
  'react', 'react-dom', 'framer-motion', 
  '@emotion/react', '@emotion/styled'
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

// Utility Functions
function hasKnownExtension(path: string): boolean {
  const lastDotIndex = path.lastIndexOf('.');
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
  const [pathPart, hash] = path.split('#');
  const [basePath, query] = pathPart.split('?');
  
  return {
    basePath: basePath || '',
    query: query ? `?${query}` : '',
    hash: hash ? `#${hash}` : '',
  };
}

function shouldTransformPath(path: string): boolean {
  return (
    !path.includes('?bundle=false') &&
    !path.startsWith('data:') &&
    !path.startsWith('http://') &&
    !path.startsWith('https://') &&
    !path.startsWith('/live/') &&
    !/^https?:\/\//.test(path)
  );
}

function getExportsString(match: string): string {
  const namedImports = match.match(/\{([^}]*)\}/s)?.[1];
  return namedImports
    ?.split(',')
    .map((s) => s.trim().split(' as ')[0])
    .filter(Boolean)
    .join(',') || '';
}

function combineUrl(base: string, path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('/live/')) {
    return path;
  }
  
  const cleanedPath = path.startsWith('/') ? path.slice(1) : path;
  return !path.startsWith('.') ? `${base}/${cleanedPath}` : path;
}

function getMappedPath(
  path: string, 
  exportsParam: string = '', 
  hasFromClause: boolean = false,
  importMapImports: ImportMap["imports"] = importMap["imports"]
): string {
  // Early returns for complex or special paths
  if (path.includes('${') || path.includes('+')) return path;

  const { basePath, query: existingQuery, hash } = processQueryAndHash(path);

  // Exact match in import map
  if (importMapImports[basePath]) return path;

  // Handle worker files
  if (isWorkerFile(basePath)) {
    const baseWithoutExt = hasKnownExtension(basePath)
      ? basePath.substring(0, basePath.lastIndexOf('.'))
      : basePath;
    const extension = hasFromClause ? '.mjs' : '.js';
    const resultPath = baseWithoutExt + extension;
    
    return !resultPath.startsWith('.') && !resultPath.startsWith('/')
      ? `/${resultPath}`
      : resultPath;
  }

  // Handle component and special files
  if (isComponentFile(basePath)) {
    const baseWithoutExt = hasKnownExtension(basePath)
      ? basePath.substring(0, basePath.lastIndexOf('.'))
      : basePath;
    const extension = '.mjs';
    const resultPath = baseWithoutExt + extension;
    
    return !resultPath.startsWith('.') && !resultPath.startsWith('/')
      ? `/${resultPath}`
      : resultPath;
  }

  // Handle directory imports and paths without extension
  if (!hasKnownExtension(basePath) && 
      (basePath.startsWith('.') || basePath.startsWith('/'))) {
    const extension = basePath.endsWith('/') ? 'index.mjs' : '.mjs';
    return `${basePath}${extension}${existingQuery}${hash}`;
  }

  // Preserve live and absolute URLs
  if (path.startsWith('/live/') || /^https?:\/\//.test(path)) {
    return path;
  }

  // Handle non-relative paths
  if (!basePath.startsWith('.') && !basePath.startsWith('/')) {
    const params = [
      'bundle=true',
      `external=${EXTERNAL_DEPENDENCIES.join(',')}`,
    ];
    
    if (exportsParam) params.push(`exports=${exportsParam}`);
    
    return `/${basePath}?${params.join('&')}${existingQuery}${hash}`;
  }

  return basePath + existingQuery + hash;
}

export function importMapReplace(
  code: string, 
  origin: string = '', 
  impMap: ImportMap = importMap
): string {
  // Prevent double processing
  if (code.includes('/** importMapReplace */') || code.includes('/* esm.sh')) {
    return code;
  }

  // Normalize line endings
  code = code.replace(/\r\n/g, '\n');

  // Replace simple imports
  code = code.replace(
    /^(\s*import\s+)(['"])([^'"]+)(['"];\s*$)/gm,
    (match, pre, q1, path, q2) => {
      if (!shouldTransformPath(path)) return match;
      const fullPath = getMappedPath(path, '', false);
      return `${pre}${q1}${fullPath}${q2}`;
    }
  );

  // Replace imports with from clause
  code = code.replace(
    /^(\s*import\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
    (match) => {
      if (match.includes('/** importMapReplace */')) return match;

      const pathMatch = match.match(/['"]([^'"]+)['"]/);
      if (!pathMatch) return match;

      const importPath = pathMatch[1];
      if (!shouldTransformPath(importPath)) return match;

      const exportsParam = getExportsString(match);
      const mappedPath = getMappedPath(importPath, exportsParam, true);
      return match.replace(/['"][^'"]+['"]/, `"${mappedPath}"`);
    }
  );

  // Replace export from clauses
  code = code.replace(
    /^(\s*export\s+[\s\S]*?from\s+['"])([^'"]+)(['"];?)/gm,
    (match) => {
      if (match.includes('/** importMapReplace */')) return match;

      const pathMatch = match.match(/['"]([^'"]+)['"]/);
      if (!pathMatch) return match;

      const exportPath = pathMatch[1];
      if (!shouldTransformPath(exportPath)) return match;

      const exportsParam = getExportsString(match);
      const mappedPath = getMappedPath(exportPath, exportsParam, true);
      return match.replace(/['"][^'"]+['"]/, `"${mappedPath}"`);
    }
  );

  // Replace dynamic imports
  code = code.replace(
    /(\bimport\s*\(\s*['"])([^'"]+)(['"]\s*\))/g,
    (match) => {
      const pathMatch = match.match(/['"]([^'"]+)['"]/);
      if (!pathMatch) return match;

      const importPath = pathMatch[1];
      if (!shouldTransformPath(importPath)) return match;

      const mappedPath = getMappedPath(importPath, '', true);
      return match.replace(/['"][^'"]+['"]/, `"${mappedPath}"`);
    }
  );

  return `/** importMapReplace */\n${code}`;
}

export default importMap;