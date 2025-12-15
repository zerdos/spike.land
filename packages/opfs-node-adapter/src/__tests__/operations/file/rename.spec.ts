import { describe, it, expect, beforeEach, vi } from "vitest";
import { rename } from "../../../operations/file/rename";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("rename", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should rename a file", async () => {
    await rename("/test.txt", "/renamed.txt");

    const sourceFileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
    const sourceFile = await sourceFileHandle.getFile();
    expect(sourceFile.text).toHaveBeenCalled();

    const destFileHandle = await mockDirectoryHandle.getFileHandle("renamed.txt");
    const writable = await destFileHandle.createWritable();
    expect(writable.write).toHaveBeenCalled();

    expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
  });
});
