import type { BigIntStats, Stats, StatOptions } from "node:fs";
import { tryCatch } from "../../try-catch";
import type { StatResult } from "../../types";
import { createStats, createBigIntStats } from "../../types";
import {
  getDirectoryHandleAndFileName,
  handleDirectory,
  handleFile,
  normalizePath,
} from "../../utils";

export function stat(
  filePath: string,
  options?: StatOptions & { bigint?: false },
): Promise<Stats>;
export function stat(
  filePath: string,
  options: StatOptions & { bigint: true },
): Promise<BigIntStats>;
export function stat(filePath: string, options?: StatOptions): Promise<Stats | BigIntStats>;
export async function stat(
  filePath: string,
  options?: StatOptions,
): Promise<Stats | BigIntStats | StatResult> {
  const bigint = options?.bigint === true;

  const doStat = async (): Promise<StatResult> => {
    const normalizedPath = normalizePath(filePath);

    if (normalizedPath === "") {
      const rootHandle = await navigator.storage.getDirectory();
      return handleDirectory(rootHandle, "/");
    }

    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);

    if (!fileName) {
      return handleDirectory(dirHandle, filePath);
    }

    const { data: fileHandle, error: fileError } = await tryCatch(
      dirHandle.getFileHandle(fileName),
    );
    if (fileHandle) {
      return handleFile(fileHandle, filePath);
    }

    const { data: subDirHandle, error: dirError } = await tryCatch(
      dirHandle.getDirectoryHandle(fileName),
    );
    if (subDirHandle) {
      return handleDirectory(subDirHandle, filePath);
    }

    console.warn(
      `stat: Could not find ${filePath} as file or directory. File error: ${fileError}, Dir error: ${dirError}`,
    );
    return null;
  };

  const { data, error } = await tryCatch(doStat());
  if (error) {
    console.warn(`Error in stat for ${filePath}:`, error);
    throw error;
  }

  if (data === null) {
    throw new Error(`ENOENT: no such file or directory, stat '${filePath}'`);
  }

  if (bigint) {
    return createBigIntStats(data);
  }

  return createStats(data);
}
