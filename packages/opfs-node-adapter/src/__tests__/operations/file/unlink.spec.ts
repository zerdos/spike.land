import { describe, it, expect, beforeEach, vi } from "vitest";
import { unlink } from "../../../operations/file/unlink";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("unlink", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should delete a file", async () => {
    await unlink("/test.txt");
    expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
  });
});
