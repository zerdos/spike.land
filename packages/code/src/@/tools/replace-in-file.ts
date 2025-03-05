/**
 * Interface for replace-in-file tool options
 */
export interface ReplaceInFileOptions {
  path: string;
  search: string;
  replace: string;
  all?: boolean;
}

/**
 * Interface for replace-in-file tool result
 */
export interface ReplaceInFileResult {
  success: boolean;
  path: string;
  replacements: number;
  error?: string;
  hash?: string;
}

/**
 * Parses a diff string into search and replace parts
 * @param diff The diff string
 * @returns An array of search and replace pairs
 */
function parseDiff(diff: string): { search: string; replace: string; }[] {
  const parts: { search: string; replace: string; }[] = [];
  const regex = /<<<<<<< SEARCH\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> REPLACE/g;

  let match;
  while ((match = regex.exec(diff)) !== null) {
    parts.push({
      search: match[1],
      replace: match[2],
    });
  }

  if (parts.length === 0) {
    throw new Error("Malformed diff string");
  }

  return parts;
}

