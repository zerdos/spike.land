import type { Dirent, Stats } from "node:fs";
import type { FSWatcher, WatchEventType } from "../../types";
import { stat } from "./stat";
import { readdir } from "./readdir";

interface WatchEvent {
  eventType: WatchEventType;
  filename: string | null;
}

interface FileSnapshot {
  size: number;
  mtimeMs: number;
  exists: boolean;
}

/**
 * Watch for changes on a file or directory
 * Node.js signature: watch(filename[, options])
 * Implements polling-based watching since OPFS doesn't have native file watching
 */
export function watch(
  filename: string,
  options?: {
    encoding?: BufferEncoding | null;
    persistent?: boolean;
    recursive?: boolean;
    signal?: AbortSignal;
    pollInterval?: number; // For testing
  },
): FSWatcher {
  const recursive = options?.recursive ?? false;
  const signal = options?.signal;
  const pollInterval = options?.pollInterval ?? 1000; // Poll every 1 second (or custom for testing)

  const eventQueue: WatchEvent[] = [];
  const fileSnapshots = new Map<string, FileSnapshot>();
  let pollTimer: ReturnType<typeof setInterval> | null = null;
  let isClosed = false;

  const createSnapshot = (stats: Stats): FileSnapshot => ({
    size: stats.size,
    mtimeMs: stats.mtimeMs,
    exists: true,
  });

  const getNonExistentSnapshot = (): FileSnapshot => ({
    size: 0,
    mtimeMs: 0,
    exists: false,
  });

  const emitEvent = (eventType: WatchEventType, path: string | null) => {
    eventQueue.push({ eventType, filename: path });
  };

  const checkFile = async (path: string) => {
    const previousSnapshot = fileSnapshots.get(path);

    try {
      const stats = await stat(path);
      const currentSnapshot = createSnapshot(stats);

      if (!previousSnapshot) {
        // First time seeing this file
        fileSnapshots.set(path, currentSnapshot);
        return;
      }

      if (!previousSnapshot.exists) {
        // File was created
        fileSnapshots.set(path, currentSnapshot);
        emitEvent("rename", path);
      } else if (
        currentSnapshot.size !== previousSnapshot.size ||
        currentSnapshot.mtimeMs !== previousSnapshot.mtimeMs
      ) {
        // File was modified
        fileSnapshots.set(path, currentSnapshot);
        emitEvent("change", path);
      }
    } catch (_error) {
      // File doesn't exist or error accessing it
      if (previousSnapshot?.exists) {
        // File was deleted
        fileSnapshots.set(path, getNonExistentSnapshot());
        emitEvent("rename", path);
      } else if (!previousSnapshot) {
        // File never existed, store as non-existent
        fileSnapshots.set(path, getNonExistentSnapshot());
      }
    }
  };

  const checkDirectory = async (dirPath: string) => {
    try {
      const entries = (await readdir(dirPath, { withFileTypes: true })) as unknown as Dirent[];
      const currentFiles = new Set<string>();

      for (const entry of entries) {
        const entryPath = `${dirPath}/${entry.name}`;
        currentFiles.add(entryPath);

        if (entry.isFile()) {
          await checkFile(entryPath);
        } else if (recursive && entry.isDirectory()) {
          await checkDirectory(entryPath);
        }
      }

      // Check for deleted files
      for (const [path, snapshot] of fileSnapshots.entries()) {
        if (path.startsWith(dirPath + "/") && !currentFiles.has(path) && snapshot.exists) {
          fileSnapshots.set(path, getNonExistentSnapshot());
          emitEvent("rename", path);
        }
      }
    } catch (_error) {
      // Directory doesn't exist or can't be read
    }
  };

  const poll = async () => {
    if (isClosed) return;

    try {
      const stats = await stat(filename);

      if (stats.isFile()) {
        await checkFile(filename);
      } else if (stats.isDirectory()) {
        await checkDirectory(filename);
      }
    } catch (_error) {
      // Path doesn't exist, check if it existed before
      const previousSnapshot = fileSnapshots.get(filename);
      if (previousSnapshot?.exists) {
        fileSnapshots.set(filename, getNonExistentSnapshot());
        emitEvent("rename", filename);
      }
    }
  };

  const startPolling = () => {
    // Initial poll to establish baseline
    poll().catch(() => {
      // Ignore errors on initial poll
    });

    pollTimer = setInterval(() => {
      poll().catch(() => {
        // Ignore errors during polling
      });
    }, pollInterval);
  };

  const stopPolling = () => {
    if (pollTimer !== null) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    isClosed = true;
  };

  // Handle abort signal
  if (signal) {
    if (signal.aborted) {
      isClosed = true;
    } else {
      signal.addEventListener("abort", () => {
        stopPolling();
      });
    }
  }

  // Start polling if not aborted
  if (!isClosed) {
    startPolling();
  }

  const watcher: FSWatcher = {
    async close(): Promise<void> {
      stopPolling();
      eventQueue.length = 0;
      fileSnapshots.clear();
    },

    ref(): FSWatcher {
      // In Node.js, ref() keeps the process alive
      // In browser context, this is a no-op but we return the watcher for chaining
      return watcher;
    },

    unref(): FSWatcher {
      // In Node.js, unref() allows the process to exit
      // In browser context, this is a no-op but we return the watcher for chaining
      return watcher;
    },

    async *[Symbol.asyncIterator](): AsyncIterator<WatchEvent> {
      while (!isClosed) {
        if (eventQueue.length > 0) {
          const event = eventQueue.shift();
          if (event) {
            yield event;
          }
        } else {
          // Wait a bit before checking again
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    },
  };

  return watcher;
}
