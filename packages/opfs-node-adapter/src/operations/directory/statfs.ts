/**
 * Filesystem statistics interface (regular numbers)
 */
export interface StatsFs {
  type: number;
  bsize: number;
  blocks: number;
  bfree: number;
  bavail: number;
  files: number;
  ffree: number;
}

/**
 * Filesystem statistics interface (bigint)
 */
export interface BigIntStatsFs {
  type: bigint;
  bsize: bigint;
  blocks: bigint;
  bfree: bigint;
  bavail: bigint;
  files: bigint;
  ffree: bigint;
}

/**
 * Get filesystem statistics
 * Node.js signature: statfs(path[, options])
 *
 * Uses navigator.storage.estimate() to get storage quota information.
 * The path parameter is ignored since OPFS is a single filesystem.
 *
 * @param _path - The path to get statistics for (ignored)
 * @param options - Options object with optional bigint flag
 * @returns Promise resolving to filesystem statistics
 * @throws Error if Storage API is not available
 */
export async function statfs(
  _path: string,
  options?: { bigint?: boolean },
): Promise<StatsFs | BigIntStatsFs> {
  if (!navigator?.storage?.estimate) {
    throw new Error("OPFS adapter: Storage API is not available");
  }

  const estimate = await navigator.storage.estimate();
  const quota = estimate.quota ?? 0;
  const usage = estimate.usage ?? 0;

  const BLOCK_SIZE = 4096;
  const blocks = Math.floor(quota / BLOCK_SIZE);
  const bfree = Math.max(0, Math.floor((quota - usage) / BLOCK_SIZE));

  if (options?.bigint) {
    return {
      type: 0n,
      bsize: BigInt(BLOCK_SIZE),
      blocks: BigInt(blocks),
      bfree: BigInt(bfree),
      bavail: BigInt(bfree),
      files: 0n,
      ffree: 0n,
    };
  }

  return {
    type: 0,
    bsize: BLOCK_SIZE,
    blocks,
    bfree,
    bavail: bfree,
    files: 0,
    ffree: 0,
  };
}
