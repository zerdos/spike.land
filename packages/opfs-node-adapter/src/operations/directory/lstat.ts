import type { BigIntStats, Stats, StatOptions } from "node:fs";
import { stat } from "./stat";

/**
 * Get file or directory information (doesn't follow symlinks)
 * Node.js signature: lstat(path[, options])
 * In OPFS there are no symlinks, so this is identical to stat
 * @param filePath Path to file or directory
 * @param options Stat options
 * @returns Stats object
 */
export function lstat(
  filePath: string,
  options?: StatOptions & { bigint?: false },
): Promise<Stats>;
export function lstat(
  filePath: string,
  options: StatOptions & { bigint: true },
): Promise<BigIntStats>;
export async function lstat(
  filePath: string,
  options?: StatOptions,
): Promise<Stats | BigIntStats> {
  return stat(filePath, options);
}
