import type { Dirent } from "node:fs";
import type { CpOptions } from "../../types";
import { tryCatch } from "../../try-catch";
import { normalizePath } from "../../utils";
import { stat } from "./stat";
import { readdir } from "./readdir";
import { mkdir } from "./mkdir";
import { readFile } from "../file/readFile";
import { writeFile } from "../file/writeFile";

/**
 * Copy a file or directory recursively
 * Node.js signature: cp(source, destination[, options])
 */
export async function cp(
  source: string,
  destination: string,
  options?: CpOptions,
): Promise<void> {
  const {
    recursive = false,
    force = true,
    errorOnExist = false,
    filter,
  } = options || {};

  const doCp = async (): Promise<void> => {
    const normalizedSource = normalizePath(source);
    const normalizedDest = normalizePath(destination);

    const { data: sourceStat, error: sourceStatError } = await tryCatch(
      stat(normalizedSource),
    );

    if (sourceStatError || !sourceStat) {
      throw new Error(`ENOENT: no such file or directory, cp '${source}'`);
    }

    if (filter) {
      const shouldCopy = await filter(normalizedSource, normalizedDest);
      if (!shouldCopy) {
        return;
      }
    }

    const { data: destStat, error: _destStatError } = await tryCatch(
      stat(normalizedDest),
    );

    if (destStat) {
      if (errorOnExist) {
        throw new Error(`EEXIST: file already exists, cp '${source}' -> '${destination}'`);
      }
      if (!force) {
        return;
      }
    }

    if (sourceStat.isFile()) {
      await copyFile(normalizedSource, normalizedDest);
    } else if (sourceStat.isDirectory()) {
      if (!recursive) {
        throw new Error(
          `EISDIR: illegal operation on a directory, cp '${source}' -> '${destination}'`,
        );
      }
      await copyDirectory(normalizedSource, normalizedDest, filter);
    }
  };

  const { error } = await tryCatch(doCp());
  if (error) {
    console.error(`Error copying ${source} to ${destination}:`, error);
    throw error;
  }
}

/**
 * Copy a single file
 */
async function copyFile(source: string, destination: string): Promise<void> {
  const content = await readFile(source);
  await writeFile(destination, content);
}

/**
 * Copy a directory recursively
 */
async function copyDirectory(
  source: string,
  destination: string,
  filter?: (source: string, destination: string) => boolean | Promise<boolean>,
): Promise<void> {
  await mkdir(destination, { recursive: true });

  const entries = (await readdir(source, { withFileTypes: true })) as unknown as Dirent[];

  for (const entry of entries) {
    const sourcePath = `${source}/${entry.name}`;
    const destPath = `${destination}/${entry.name}`;

    if (filter) {
      const shouldCopy = await filter(sourcePath, destPath);
      if (!shouldCopy) {
        continue;
      }
    }

    if (entry.isFile()) {
      await copyFile(sourcePath, destPath);
    } else if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destPath, filter);
    }
  }
}
