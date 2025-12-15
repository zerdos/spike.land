import { access } from "./access";

/**
 * Check if a path exists
 * Note: This is deprecated in Node.js, use access() instead
 * @param filePath Path to check
 * @returns true if path exists
 */
export async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
