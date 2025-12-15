import { getDirectoryEntriesRecursive, getDirectoryHandleAndFileName } from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("memfs utility functions", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("getDirectoryEntriesRecursive", () => {
    it("should return all entries in directory", async () => {
      const directoryHandle = await navigator.storage.getDirectory();
      const entries = await getDirectoryEntriesRecursive(directoryHandle);
      expect(Object.keys(entries)).toEqual(["test.txt", "test"]);
    });
  });

  describe("getDirectoryHandleAndFileName", () => {
    it("should return directory handle and file name", async () => {
      const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
        "/test/test.txt",
      );
      expect(fileName).toEqual("test.txt");
      expect(dirHandle).toBeTruthy();
    });

    it("should handle root paths", async () => {
      const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
        "/root.txt",
      );
      expect(fileName).toEqual("root.txt");
      expect(dirHandle).toBeTruthy();
    });

    it("should handle paths without leading slash", async () => {
      const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
        "test/file.txt",
      );
      expect(fileName).toEqual("file.txt");
      expect(dirHandle).toBeTruthy();
    });

    it("should handle directory paths", async () => {
      const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
        "/test/",
      );
      // The implementation returns the directory name as the fileName
      // This is the expected behavior based on the implementation
      expect(fileName).toBe("test");
      expect(dirHandle).toBeTruthy();
    });
  });
});
