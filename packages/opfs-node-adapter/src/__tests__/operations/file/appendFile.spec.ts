import { describe, it, expect, vi, beforeEach } from "vitest";
import { appendFile } from "../../../operations/file/appendFile";
import { readFile } from "../../../index";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("appendFile", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should append content to existing file", async () => {
    const existingContent = await readFile("/test.txt", "utf8");
    await appendFile("/test.txt", " appended");

    const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
    const writable = await fileHandle.createWritable();
    expect(writable.write).toHaveBeenCalledWith(existingContent + " appended");
  });

  it("should create file if it doesn't exist", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    await appendFile("/new-append.txt", "new content");
    expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
      "new-append.txt",
      { create: true },
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "File /new-append.txt not found or unreadable for append, creating new file.",
    );

    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
});
