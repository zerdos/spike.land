import { describe, it, expect, beforeEach, vi } from "vitest";
import { truncate } from "../../../operations/file/truncate";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("truncate", () => {
  beforeEach(() => {
    setupTest();
  });
  it("should truncate a file to specified length", async () => {
    await truncate("/test.txt", 4);

    const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
    const writable = await fileHandle.createWritable();
    expect(writable.write).toHaveBeenCalledWith("test");
  });

  it("should truncate a file to zero length by default", async () => {
    await truncate("/test.txt");

    const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
    const writable = await fileHandle.createWritable();
    expect(writable.write).toHaveBeenCalledWith("");
  });
});
