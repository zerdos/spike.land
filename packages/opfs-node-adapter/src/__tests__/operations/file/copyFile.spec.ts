import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";
import { copyFile } from "../../../operations/file/copyFile";

vi.stubGlobal("navigator", mockNavigator);

describe("copyFile", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should copy a file", async () => {
    await copyFile("/test.txt", "/copy.txt");

    const sourceFileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
    const sourceFile = await sourceFileHandle.getFile();
    expect(sourceFile.text).toHaveBeenCalled();

    const destFileHandle = await mockDirectoryHandle.getFileHandle("copy.txt");
    const writable = await destFileHandle.createWritable();
    expect(writable.write).toHaveBeenCalled();
    expect(writable.close).toHaveBeenCalled();
  });
});
