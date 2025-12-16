import { describe, expect, it, vi, beforeEach } from "vitest";
import { glob } from "../../../operations/directory/glob";
import type { Dirent } from "node:fs";
import {
  mockNavigator,
  setupTest,
  mockFileSystem,
  type MockFileSystemDirectory,
} from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("glob", () => {
  beforeEach(() => {
    setupTest();

    mockFileSystem["src/index.ts"] = {
      kind: "file",
      name: "index.ts",
      getFile: vi.fn().mockResolvedValue({
        size: 100,
        type: "text/typescript",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("export {}"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["src/app.ts"] = {
      kind: "file",
      name: "app.ts",
      getFile: vi.fn().mockResolvedValue({
        size: 200,
        type: "text/typescript",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("export const app = {};"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["src/utils"] = {
      kind: "directory",
      name: "utils",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockImplementation(async (name) => {
        if (mockFileSystem[`src/utils/${name}`]?.kind === "file") {
          return mockFileSystem[`src/utils/${name}`];
        }
        throw new Error("Not a file");
      }),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        for (const [key, value] of Object.entries(mockFileSystem)) {
          if (key.startsWith("src/utils/") && key.split("/").length === 3) {
            yield [key.replace("src/utils/", ""), value];
          }
        }
      }),
    };

    mockFileSystem["src/utils/helper.ts"] = {
      kind: "file",
      name: "helper.ts",
      getFile: vi.fn().mockResolvedValue({
        size: 50,
        type: "text/typescript",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("export function helper() {}"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["readme.txt"] = {
      kind: "file",
      name: "readme.txt",
      getFile: vi.fn().mockResolvedValue({
        size: 20,
        type: "text/plain",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("readme"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["file1.txt"] = {
      kind: "file",
      name: "file1.txt",
      getFile: vi.fn().mockResolvedValue({
        size: 10,
        type: "text/plain",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("file1"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["file2.txt"] = {
      kind: "file",
      name: "file2.txt",
      getFile: vi.fn().mockResolvedValue({
        size: 10,
        type: "text/plain",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("file2"),
      }),
      createWritable: vi.fn().mockResolvedValue({
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      }),
    };

    mockFileSystem["src/utils"] = {
      kind: "directory",
      name: "utils",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockImplementation(async (name) => {
        if (mockFileSystem[`src/utils/${name}`]?.kind === "file") {
          return mockFileSystem[`src/utils/${name}`];
        }
        throw new Error("Not a file");
      }),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        for (const [key, value] of Object.entries(mockFileSystem)) {
          if (key.startsWith("src/utils/") && key.split("/").length === 3) {
            yield [key.replace("src/utils/", ""), value];
          }
        }
      }),
    };

    mockFileSystem["src"] = {
      kind: "directory",
      name: "src",
      getDirectoryHandle: vi.fn().mockImplementation(async (name, options) => {
        if (mockFileSystem[`src/${name}`]?.kind === "directory") {
          return mockFileSystem[`src/${name}`] as MockFileSystemDirectory;
        }
        if (options?.create) {
          const newDir = {
            kind: "directory" as const,
            name,
            getDirectoryHandle: vi.fn().mockResolvedValue({}),
            getFileHandle: vi.fn().mockResolvedValue({}),
            removeEntry: vi.fn().mockResolvedValue(undefined),
            entries: vi.fn().mockReturnValue([]),
          };
          mockFileSystem[`src/${name}`] = newDir;
          return newDir;
        }
        throw new Error("Not a directory");
      }),
      getFileHandle: vi.fn().mockImplementation(async (name, options) => {
        if (mockFileSystem[`src/${name}`]?.kind === "file") {
          return mockFileSystem[`src/${name}`];
        }
        if (options?.create) {
          const newFile = {
            kind: "file" as const,
            name,
            getFile: vi.fn().mockResolvedValue({
              size: 0,
              type: "text/plain",
              lastModified: Date.now(),
              text: vi.fn().mockResolvedValue(""),
            }),
            createWritable: vi.fn().mockResolvedValue({
              write: vi.fn().mockResolvedValue(undefined),
              close: vi.fn().mockResolvedValue(undefined),
            }),
          };
          mockFileSystem[`src/${name}`] = newFile;
          return newFile;
        }
        throw new Error("Not a file");
      }),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        for (const [key, value] of Object.entries(mockFileSystem)) {
          if (key.startsWith("src/") && !key.slice(4).includes("/")) {
            yield [key.replace("src/", ""), value];
          }
        }
      }),
    };
  });

  it("should match simple wildcard patterns", async () => {
    const results = await glob("*.txt");
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).toContain("readme.txt");
    expect(results.some((r) => r.includes(".ts"))).toBe(false);
  });

  it("should match recursive patterns", async () => {
    const results = await glob("**/*.ts");
    expect(results).toContain("src/index.ts");
    expect(results).toContain("src/app.ts");
    expect(results).toContain("src/utils/helper.ts");
  });

  it("should match question mark patterns", async () => {
    const results = await glob("file?.txt");
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).not.toContain("readme.txt");
  });

  it("should match character classes", async () => {
    const results = await glob("file[12].txt");
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).not.toContain("readme.txt");
  });

  it("should support cwd option", async () => {
    const results = await glob("*.txt", { cwd: "/" });
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).toContain("readme.txt");
    expect(results.some((r) => r.includes("/"))).toBe(false);
  });

  it("should support exclude option", async () => {
    const results = await glob("*.txt", {
      exclude: (path) => path.includes("readme"),
    });
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).not.toContain("readme.txt");
  });

  it("should support withFileTypes option", async () => {
    const results = await glob("*.txt", { withFileTypes: true });
    expect(results.length).toBeGreaterThan(0);
    const firstResult = results[0] as unknown as Dirent;
    expect(firstResult.name).toBeDefined();
    expect(typeof firstResult.isFile).toBe("function");
    expect(typeof firstResult.isDirectory).toBe("function");
  });

  it("should return empty array when no matches", async () => {
    const results = await glob("*.nonexistent");
    expect(results).toEqual([]);
  });

  it("should support multiple patterns", async () => {
    const results = await glob(["*.txt", "*.ts"]);
    expect(results).toContain("file1.txt");
    expect(results).toContain("file2.txt");
    expect(results).toContain("readme.txt");
  });

  it("should match directories with recursive glob", async () => {
    const results = await glob("**/utils");
    expect(results).toContain("src/utils");
  });

  it("should return sorted results", async () => {
    const results = await glob("*.txt");
    const sorted = [...results].sort();
    expect(results).toEqual(sorted);
  });

  it("should handle root directory pattern", async () => {
    const results = await glob("*");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r === "test.txt")).toBe(true);
  });

  it("should combine cwd and withFileTypes options", async () => {
    const results = await glob("*.txt", { cwd: "/", withFileTypes: true });
    expect(results.length).toBeGreaterThan(0);
    const firstResult = results[0] as unknown as Dirent;
    expect(firstResult.name).toBeDefined();
    expect(firstResult.isFile()).toBe(true);
  });

  it("should return empty array on error", async () => {
    const mockError = new Error("Test error");
    vi.spyOn(mockNavigator.storage, "getDirectory").mockRejectedValueOnce(mockError);

    const results = await glob("*.txt");
    expect(results).toEqual([]);
  });
});
