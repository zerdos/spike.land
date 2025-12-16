import type { Dirent } from "node:fs";
import { tryCatch } from "../../try-catch";
import { createDirent } from "../../types";
import { getDirectoryHandleAndFileName } from "../../utils";

/**
 * Convert glob pattern to regex
 * Supports: *, **, ?, [abc], [a-z]
 */
function globToRegex(pattern: string): RegExp {
  let regexStr = "^";
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];
    if (!char) break;

    if (char === "*") {
      if (pattern[i + 1] === "*") {
        if (pattern[i + 2] === "/") {
          regexStr += "(?:.*/)";
          i += 3;
          continue;
        }
        regexStr += ".*";
        i += 2;
        continue;
      }
      regexStr += "[^/]*";
      i++;
    } else if (char === "?") {
      regexStr += "[^/]";
      i++;
    } else if (char === "[") {
      const closeIdx = pattern.indexOf("]", i);
      if (closeIdx === -1) {
        regexStr += "\\[";
        i++;
      } else {
        const charClass = pattern.slice(i + 1, closeIdx);
        regexStr += `[${charClass.replace(/\\/g, "\\\\")}]`;
        i = closeIdx + 1;
      }
    } else if (char === "/") {
      regexStr += "/";
      i++;
    } else {
      regexStr += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
      i++;
    }
  }

  regexStr += "$";
  return new RegExp(regexStr);
}

/**
 * Walk directory tree and collect all file paths
 */
async function walkDirectory(
  dirHandle: FileSystemDirectoryHandle,
  basePath: string,
): Promise<Array<{ path: string; isFile: boolean }>> {
  const results: Array<{ path: string; isFile: boolean }> = [];

  const walk = async (
    handle: FileSystemDirectoryHandle,
    currentPath: string,
  ): Promise<void> => {
    const entries = handle.entries();
    for await (const [name, entry] of entries) {
      const entryPath = currentPath ? `${currentPath}/${name}` : name;

      if (entry.kind === "file") {
        results.push({ path: entryPath, isFile: true });
      } else if (entry.kind === "directory") {
        results.push({ path: entryPath, isFile: false });
        await walk(entry as FileSystemDirectoryHandle, entryPath);
      }
    }
  };

  await walk(dirHandle, basePath);
  return results;
}

/**
 * Glob pattern matching for file discovery
 * @param pattern Glob pattern(s) to match
 * @param options Options for glob matching
 * @returns Array of matching file paths or Dirent objects
 */
export function glob(
  pattern: string | string[],
  options?: {
    cwd?: string;
    exclude?: (path: string) => boolean;
    withFileTypes?: boolean;
  },
): Promise<string[]>;
export function glob(
  pattern: string | string[],
  options: {
    cwd?: string;
    exclude?: (path: string) => boolean;
    withFileTypes: true;
  },
): Promise<Dirent[]>;
export function glob(
  pattern: string | string[],
  options: {
    cwd?: string;
    exclude?: (path: string) => boolean;
    withFileTypes?: false;
  },
): Promise<string[]>;
export async function glob(
  pattern: string | string[],
  options?: {
    cwd?: string;
    exclude?: (path: string) => boolean;
    withFileTypes?: boolean;
  },
): Promise<string[] | Dirent[]> {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const cwd = options?.cwd || "/";
  const exclude = options?.exclude;
  const withFileTypes = options?.withFileTypes === true;

  const doGlob = async () => {
    const { dirHandle } = await getDirectoryHandleAndFileName(cwd);

    const regexes = patterns.map((p) => globToRegex(p));

    const allEntries = await walkDirectory(dirHandle, "");

    const matchedPaths = new Set<string>();

    for (const entry of allEntries) {
      const relativePath = entry.path;

      const shouldMatch = regexes.some((regex) => regex.test(relativePath));

      if (shouldMatch && (!exclude || !exclude(relativePath))) {
        matchedPaths.add(relativePath);
      }
    }

    const sortedPaths = Array.from(matchedPaths).sort();

    if (withFileTypes) {
      const dirents: Dirent[] = [];

      for (const path of sortedPaths) {
        const parts = path.split("/");
        const name = parts[parts.length - 1];
        if (!name) continue;
        const parentPath = parts.slice(0, -1).join("/");
        const parentFullPath = parentPath ? `${cwd}/${parentPath}` : cwd;

        const entry = allEntries.find((e) => e.path === path);

        if (entry) {
          dirents.push(createDirent(name, entry.isFile, parentFullPath));
        }
      }

      return dirents;
    }

    return sortedPaths;
  };

  const { data, error } = await tryCatch(doGlob());
  if (error) {
    console.error(`Error in glob for pattern ${pattern}:`, error);
    return [];
  }
  return data || [];
}
