import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Stats } from "node:fs";
import type { Dirent } from "../../../types";

// Mock all dependencies before importing cp
vi.mock("../../../operations/directory/stat");
vi.mock("../../../operations/directory/readdir");
vi.mock("../../../operations/directory/mkdir");
vi.mock("../../../operations/file/readFile");
vi.mock("../../../operations/file/writeFile");

import { cp } from "../../../operations/directory/cp";
import { stat } from "../../../operations/directory/stat";
import { readdir } from "../../../operations/directory/readdir";
import { mkdir } from "../../../operations/directory/mkdir";
import { readFile } from "../../../operations/file/readFile";
import { writeFile } from "../../../operations/file/writeFile";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("cp", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setupTest();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.clearAllMocks();
  });

  describe("file copying", () => {
    it("should copy a single file", async () => {
      vi.mocked(stat).mockResolvedValue({
        isFile: () => true,
        isDirectory: () => false,
      } as Stats);
      vi.mocked(readFile).mockResolvedValue("test content" as never);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/source.txt", "/dest.txt");

      expect(stat).toHaveBeenCalledWith("source.txt");
      expect(readFile).toHaveBeenCalledWith("source.txt");
      expect(writeFile).toHaveBeenCalledWith("dest.txt", "test content");
    });

    it("should overwrite existing file when force is true (default)", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats);
      vi.mocked(readFile).mockResolvedValue("new content" as never);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/source.txt", "/dest.txt");

      expect(writeFile).toHaveBeenCalledWith("dest.txt", "new content");
    });

    it("should overwrite existing file when force is explicitly true", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats);
      vi.mocked(readFile).mockResolvedValue("new content" as never);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/source.txt", "/dest.txt", { force: true });

      expect(writeFile).toHaveBeenCalledWith("dest.txt", "new content");
    });

    it("should not overwrite existing file when force is false", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats);

      await cp("/source.txt", "/dest.txt", { force: false });

      expect(readFile).not.toHaveBeenCalled();
      expect(writeFile).not.toHaveBeenCalled();
    });

    it("should throw error when destination exists and errorOnExist is true", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats);

      await expect(cp("/source.txt", "/dest.txt", { errorOnExist: true }))
        .rejects.toThrow("EEXIST: file already exists");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error copying"),
        expect.any(Error),
      );
    });

    it("should throw error when source file does not exist", async () => {
      vi.mocked(stat).mockRejectedValue(new Error("ENOENT"));

      await expect(cp("/nonexistent.txt", "/dest.txt"))
        .rejects.toThrow("ENOENT: no such file or directory");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error copying"),
        expect.any(Error),
      );
    });
  });

  describe("directory copying", () => {
    it("should copy a directory recursively", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir).mockResolvedValue([
        { name: "file1.txt", isFile: () => true, isDirectory: () => false } as Dirent,
        { name: "file2.txt", isFile: () => true, isDirectory: () => false } as Dirent,
      ] as never);
      vi.mocked(readFile).mockResolvedValue("content" as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/src", "/dest", { recursive: true });

      expect(mkdir).toHaveBeenCalledWith("dest", { recursive: true });
      expect(writeFile).toHaveBeenCalledTimes(2);
      expect(writeFile).toHaveBeenCalledWith("dest/file1.txt", "content");
      expect(writeFile).toHaveBeenCalledWith("dest/file2.txt", "content");
    });

    it("should copy nested directories recursively", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir)
        .mockResolvedValueOnce([
          { name: "file1.txt", isFile: () => true, isDirectory: () => false } as Dirent,
          { name: "nested", isFile: () => false, isDirectory: () => true } as Dirent,
        ] as never)
        .mockResolvedValueOnce([
          { name: "file2.txt", isFile: () => true, isDirectory: () => false } as Dirent,
        ] as never);

      vi.mocked(readFile).mockResolvedValue("content" as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/src", "/dest", { recursive: true });

      expect(mkdir).toHaveBeenCalledWith("dest", { recursive: true });
      expect(mkdir).toHaveBeenCalledWith("dest/nested", { recursive: true });
      expect(writeFile).toHaveBeenCalledWith("dest/file1.txt", "content");
      expect(writeFile).toHaveBeenCalledWith("dest/nested/file2.txt", "content");
    });

    it("should throw error when copying directory without recursive flag", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      await expect(cp("/src", "/dest"))
        .rejects.toThrow("EISDIR: illegal operation on a directory");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error copying"),
        expect.any(Error),
      );
    });

    it("should create destination directory if it does not exist", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir).mockResolvedValue([
        { name: "file.txt", isFile: () => true, isDirectory: () => false } as Dirent,
      ] as never);
      vi.mocked(readFile).mockResolvedValue("content" as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/src", "/dest", { recursive: true });

      expect(mkdir).toHaveBeenCalledWith("dest", { recursive: true });
    });
  });

  describe("filter option", () => {
    it("should skip files when filter returns false", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir).mockResolvedValue([
        { name: "file1.txt", isFile: () => true, isDirectory: () => false } as Dirent,
        { name: "file2.log", isFile: () => true, isDirectory: () => false } as Dirent,
      ] as never);
      vi.mocked(readFile).mockResolvedValue("content" as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/src", "/dest", {
        recursive: true,
        filter: (src, _dest) => src.endsWith(".txt") || src === "src",
      });

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith("dest/file1.txt", "content");
      expect(writeFile).not.toHaveBeenCalledWith("dest/file2.log", expect.anything());
    });

    it("should skip entire directory when filter returns false for directory", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"))
        .mockResolvedValue({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats);

      vi.mocked(readdir).mockResolvedValueOnce([
        { name: "include", isFile: () => false, isDirectory: () => true } as Dirent,
        { name: "exclude", isFile: () => false, isDirectory: () => true } as Dirent,
      ] as never).mockResolvedValue([] as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);

      await cp("/src", "/dest", {
        recursive: true,
        filter: (src) => !src.includes("exclude"),
      });

      expect(mkdir).toHaveBeenCalledWith("dest", { recursive: true });
      expect(mkdir).toHaveBeenCalledWith("dest/include", { recursive: true });
      expect(mkdir).not.toHaveBeenCalledWith("dest/exclude", expect.anything());
    });

    it("should support async filter function", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir).mockResolvedValue([
        { name: "file1.txt", isFile: () => true, isDirectory: () => false } as Dirent,
        { name: "file2.txt", isFile: () => true, isDirectory: () => false } as Dirent,
      ] as never);
      vi.mocked(readFile).mockResolvedValue("content" as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/src", "/dest", {
        recursive: true,
        filter: async (src) => {
          await Promise.resolve();
          return src.includes("file1") || src === "src";
        },
      });

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith("dest/file1.txt", "content");
    });

    it("should not copy source when filter returns false for source itself", async () => {
      vi.mocked(stat).mockResolvedValueOnce({
        isFile: () => true,
        isDirectory: () => false,
      } as Stats);

      await cp("/source.txt", "/dest.txt", {
        filter: () => false,
      });

      expect(readFile).not.toHaveBeenCalled();
      expect(writeFile).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle paths with leading and trailing slashes", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => true,
          isDirectory: () => false,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));
      vi.mocked(readFile).mockResolvedValue("test content" as never);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/source.txt/", "dest.txt");

      expect(stat).toHaveBeenCalledWith("source.txt");
    });

    it("should handle empty directory copy", async () => {
      vi.mocked(stat)
        .mockResolvedValueOnce({
          isFile: () => false,
          isDirectory: () => true,
        } as Stats)
        .mockRejectedValueOnce(new Error("ENOENT"));

      vi.mocked(readdir).mockResolvedValue([] as never);
      vi.mocked(mkdir).mockResolvedValue(undefined);

      await cp("/src", "/dest", { recursive: true });

      expect(mkdir).toHaveBeenCalledWith("dest", { recursive: true });
      expect(writeFile).not.toHaveBeenCalled();
    });

    it("should copy binary data correctly", async () => {
      const binaryData = Buffer.from([0x00, 0x01, 0x02, 0xff]);
      vi.mocked(stat).mockResolvedValue({
        isFile: () => true,
        isDirectory: () => false,
      } as Stats);
      vi.mocked(readFile).mockResolvedValue(binaryData as never);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await cp("/source.bin", "/dest.bin");

      expect(writeFile).toHaveBeenCalledWith("dest.bin", binaryData);
    });
  });
});
