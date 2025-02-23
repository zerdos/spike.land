// src/importMapUtils.ts

import { ImportMap, importMap as defaultImportMap } from "@/lib/import-map";

export const importMap: ImportMap = defaultImportMap;

// Main export function
export function importMapReplace(
  code: string,
  origin: string,
  impMap: ImportMap = defaultImportMap,
): string {
  if (code.includes('/** importMapReplace */')) {
    return code;
  }

  const getExportsString = (match: string) => {
    const namedImports = match.match(/\{([^}]*)\}/)?.[1];
    return namedImports
      ?.split(',')
      .map(s => s.trim().split(' as ')[0])
      .filter(Boolean)
      .join(',') || '';
  };

  const shouldTransformPath = (path: string) => {
    return (
      !path.includes('?bundle=false') &&
      !path.startsWith('data:') &&
      !path.startsWith('http://') &&
      !path.startsWith('https://') &&
      !path.startsWith('/live/') &&
      !/^https?:\/\//.test(path)
    );
  };

  const processQueryAndHash = (path: string) => {
    const [pathPart, hash] = path.split('#');
    const [basePath, query] = pathPart.split('?');
    return {
      basePath: basePath || '',
      query: query ? `?${query}` : '',
      hash: hash ? `#${hash}` : ''
    };
  };

  const combineUrl = (base: string, path: string): string => {
    if (/^https?:\/\//.test(path) || path.startsWith('/live/')) {
      return path;
    }
    if (path.startsWith('/') && Object.values(impMap.imports).some(value => path === value)) {
      return path;
    }
    const cleanedPath = path.startsWith('/') ? path.slice(1) : path;
    return !path.startsWith('.') ? `${base}/${cleanedPath}` : path;
  };

  const getMappedPath = (path: string, exportsParam: string = '', hasFromClause: boolean = false): string => {
    if (path.includes('${') || path.includes('+')) return path;

    const { basePath, query: existingQuery, hash } = processQueryAndHash(path);
    
    // Check exact match
    if (impMap.imports[basePath]) {
      return path;
    }

    // Check prefix matches
    const sortedKeys = Object.keys(impMap.imports).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (basePath.startsWith(key)) {
        const remaining = basePath.slice(key.length);
        return impMap.imports[key] + remaining + existingQuery + hash;
      }
    }

    const hasExtension = basePath.endsWith('.js') || basePath.endsWith('.mjs') || basePath.endsWith('.ts') || basePath.endsWith('.tsx') || basePath.endsWith('.jsx') || basePath.endsWith('.json') || basePath.endsWith('.wasm') 
          || basePath.endsWith('.txt') || basePath.endsWith('.svg') || basePath.endsWith('.md') || basePath.endsWith('.html') || basePath.endsWith('.css') || basePath.endsWith('.scss') || basePath.endsWith('.sass') || basePath.endsWith('.less') || basePath.endsWith('.styl') || basePath.endsWith('.graphql') || basePath.endsWith('.gql') || basePath.endsWith('.yml') || basePath.endsWith('.toml') || basePath.endsWith('.xml') || basePath.endsWith('.csv') || basePath.endsWith('.tsv') || basePath.endsWith('.ini') || basePath.endsWith('.properties') || basePath.endsWith('.env') || basePath.endsWith('.env.local') || basePath.endsWith('.env.development') || basePath.endsWith('.env.test') || basePath.endsWith('.env.production') || basePath.endsWith('.env.staging') || basePath.endsWith('.env.local');
    const isWorkerFile = basePath.includes('workers/') || basePath.includes('.worker');

    // Handle worker files
    if (isWorkerFile) {
      // Always append the correct extension for worker files, removing any existing extension
      const baseWithoutExt = hasExtension ? basePath.substring(0, basePath.lastIndexOf('.')) : basePath;
      const extension = hasFromClause ? '.mjs' : '.js';
      const resultPath = baseWithoutExt + extension;
      return !resultPath.startsWith('.') && !resultPath.startsWith('/') 
        ? `${origin}/${resultPath}` 
        : resultPath;
    }

    // Handle directory imports and paths without extension
    if (!hasExtension && (basePath.startsWith('.') || basePath.startsWith('/'))) {
      const extension = basePath.endsWith('/') ? 'index.mjs' : '.mjs';
      return `${basePath}${extension}${existingQuery}${hash}`;
    }

    if (path.startsWith('/live/') || /^https?:\/\//.test(path)) {
      return path;
    }

    // Handle non-relative paths
    if (!basePath.startsWith('.') && !basePath.startsWith('/')) {
      const fullPath = combineUrl(origin, basePath);
      const params = ['bundle=true', 'external=react,react-dom,framer-motion,@emotion/react,@emotion/styled'];
      if (exportsParam) params.push(`exports=${exportsParam}`);
      return `${fullPath}?${params.join('&')}${existingQuery}${hash}`;
    }

    return basePath + existingQuery + hash;
  };

  const replaceImport = (match: string) => {
    const indent = match.match(/^\s*/)?.[0] || '';
    if (match.includes('/** importMapReplace */')) return match;

    const pathMatch = match.match(/['"]([^'"]+)['"]/);
    if (!pathMatch) return match;

    const importPath = pathMatch[1];
    if (!shouldTransformPath(importPath)) {
      return match;
    }

    const exportsParam = getExportsString(match);
    const mappedPath = getMappedPath(importPath, exportsParam, true);
    const transformed = match.replace(/['"][^'"]+['"]/, `"${mappedPath}"`);
    return transformed;
  };

  const replaceDynamicImport = (match: string) => {
    const indent = match.match(/^\s*/)?.[0] || '';
    const pathMatch = match.match(/['"]([^'"]+)['"]/);
    if (!pathMatch) return match;

    const importPath = pathMatch[1];
    if (!shouldTransformPath(importPath)) {
      return match;
    }

    const mappedPath = getMappedPath(importPath, '', true);
    const transformed = match.replace(/['"][^'"]+['"]/, `"${mappedPath}"`);
    return transformed;
  };

  code = code.replace(/\r\n/g, '\n')
    .replace(/^(\s*import\s+)(['"])([^'"]+)(['"];\s*$)/gm, (match, pre, q1, path, q2) => {
      if (!shouldTransformPath(path)) return match;
      const fullPath = getMappedPath(path, '', false);
      return `${pre}${q1}${fullPath}${q2}`;
    })
    .replace(/^(\s*import\s+.*?from\s+['"])([^'"]+)(['"];?)/gm, replaceImport)
    .replace(/^(\s*export\s+.*?from\s+['"])([^'"]+)(['"];?)/gm, replaceImport)
    .replace(/(\bimport\s*\(\s*['"])([^'"]+)(['"]\s*\))/g, replaceDynamicImport);

  return `/** importMapReplace */\n${code}`;
}

export default importMap;
