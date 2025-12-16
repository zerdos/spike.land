import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { opendir } from "../../../operations/directory/opendir";
import { mockNavigator, setupTest, mockFileSystem } from "../../setup";
import type { MockFileSystemDirectory, MockFileSystemFile } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("opendir", () => {
  const addedKeys: string[] = [];

  beforeEach(() => {
    setupTest();
  });

  afterEach(() => {
    addedKeys.forEach((key) => {
      delete mockFileSystem[key];
    });
    addedKeys.length = 0;
  });

  it("should open directory and return Dir object", async () => {
    const dir = await opendir("/");
    expect(dir).toBeDefined();
    expect(dir.path).toBe("/");
    expect(typeof dir.read).toBe("function");
    expect(typeof dir.close).toBe("function");
    await dir.close();
  });

  it("should read directory entries one by one", async () => {
    const key = "mydir";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "mydir",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        yield ["file1.txt", {
          kind: "file",
          name: "file1.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 10,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("content"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
        yield ["file2.txt", {
          kind: "file",
          name: "file2.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 20,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("content2"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
        yield ["subdir", {
          kind: "directory",
          name: "subdir",
          getDirectoryHandle: vi.fn().mockResolvedValue({}),
          getFileHandle: vi.fn().mockResolvedValue({}),
          removeEntry: vi.fn().mockResolvedValue(undefined),
          entries: vi.fn().mockImplementation(async function*() {}),
        } as MockFileSystemDirectory];
      }),
    } as MockFileSystemDirectory;

    const dir = await opendir("/mydir");

    const entry1 = await dir.read();
    expect(entry1).toBeDefined();
    expect(entry1?.name).toBe("file1.txt");
    expect(entry1?.isFile()).toBe(true);
    expect(entry1?.isDirectory()).toBe(false);

    const entry2 = await dir.read();
    expect(entry2).toBeDefined();
    expect(entry2?.name).toBe("file2.txt");
    expect(entry2?.isFile()).toBe(true);

    const entry3 = await dir.read();
    expect(entry3).toBeDefined();
    expect(entry3?.name).toBe("subdir");
    expect(entry3?.isFile()).toBe(false);
    expect(entry3?.isDirectory()).toBe(true);

    const entry4 = await dir.read();
    expect(entry4).toBeNull();

    await dir.close();
  });

  it("should iterate directory using for await...of", async () => {
    const key = "testdir";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "testdir",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        yield ["a.txt", {
          kind: "file",
          name: "a.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 5,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("a"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
        yield ["b.txt", {
          kind: "file",
          name: "b.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 5,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("b"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
      }),
    } as MockFileSystemDirectory;

    const dir = await opendir("/testdir");
    const entries = [];

    for await (const entry of dir) {
      entries.push(entry);
    }

    expect(entries.length).toBe(2);
    expect(entries[0]?.name).toBe("a.txt");
    expect(entries[1]?.name).toBe("b.txt");
  });

  it("should handle empty directory", async () => {
    const key = "emptydir";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "emptydir",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {}),
    } as MockFileSystemDirectory;

    const dir = await opendir("/emptydir");
    const entry = await dir.read();
    expect(entry).toBeNull();
    await dir.close();
  });

  it("should throw error when reading from closed directory", async () => {
    const key = "closedir";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "closedir",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {}),
    } as MockFileSystemDirectory;

    const dir = await opendir("/closedir");
    await dir.close();

    await expect(dir.read()).rejects.toThrow("Directory handle is closed");
  });

  it("should throw error for readSync", async () => {
    const dir = await opendir("/");
    expect(() => dir.readSync()).toThrow("readSync is not supported in async OPFS context");
    await dir.close();
  });

  it("should throw error for closeSync", async () => {
    const dir = await opendir("/");
    expect(() => dir.closeSync()).toThrow("closeSync is not supported in async OPFS context");
    await dir.close();
  });

  it("should have correct path property", async () => {
    const key = "pathtest";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "pathtest",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {}),
    } as MockFileSystemDirectory;

    const dir = await opendir("/pathtest");
    expect(dir.path).toBe("/pathtest");
    await dir.close();
  });

  it("should throw error for non-existent directory", async () => {
    await expect(opendir("/nonexistent")).rejects.toThrow();
  });

  it("should read null after exhausting all entries", async () => {
    const key = "singlefile";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "singlefile",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        yield ["only.txt", {
          kind: "file",
          name: "only.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 5,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("only"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
      }),
    } as MockFileSystemDirectory;

    const dir = await opendir("/singlefile");

    const entry1 = await dir.read();
    expect(entry1?.name).toBe("only.txt");

    const entry2 = await dir.read();
    expect(entry2).toBeNull();

    const entry3 = await dir.read();
    expect(entry3).toBeNull();

    await dir.close();
  });

  it("should support multiple iterations with for await...of", async () => {
    const key = "multiiter";
    addedKeys.push(key);
    mockFileSystem[key] = {
      kind: "directory",
      name: "multiiter",
      getDirectoryHandle: vi.fn().mockResolvedValue({}),
      getFileHandle: vi.fn().mockResolvedValue({}),
      removeEntry: vi.fn().mockResolvedValue(undefined),
      entries: vi.fn().mockImplementation(async function*() {
        yield ["x.txt", {
          kind: "file",
          name: "x.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 1,
            type: "text/plain",
            lastModified: Date.now(),
            text: vi.fn().mockResolvedValue("x"),
          }),
          createWritable: vi.fn(),
        } as MockFileSystemFile];
      }),
    } as MockFileSystemDirectory;

    const dir = await opendir("/multiiter");
    const entries1 = [];

    for await (const entry of dir) {
      entries1.push(entry.name);
    }

    expect(entries1).toEqual(["x.txt"]);

    const entries2 = [];
    for await (const entry of dir) {
      entries2.push(entry.name);
    }

    expect(entries2).toEqual([]);

    await dir.close();
  });
});
