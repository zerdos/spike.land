import { beforeEach, describe, expect, it, vi } from "vitest";
import { writeFile } from "../../../operations/file/writeFile";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("writeFile", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should write string content to file", async () => {
    await writeFile("/new-file.txt", "new content");
    expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
      "new-file.txt",
      { create: true },
    );

    const fileHandle = await mockDirectoryHandle.getFileHandle("new-file.txt");
    const writable = await fileHandle.createWritable();
    expect(writable.write).toHaveBeenCalledWith("new content");
    expect(writable.close).toHaveBeenCalled();
  });

  it("should write Uint8Array content to file", async () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    await writeFile("/binary-file.txt", data);
    expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
      "binary-file.txt",
      { create: true },
    );
  });
});
