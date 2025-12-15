import { describe, it, expect, beforeEach, vi } from "vitest";
import { lstat } from "../../../operations/directory/lstat";
import { mockDirectoryHandle, setupTest } from "../../setup";

vi.stubGlobal("navigator", {
  storage: {
    getDirectory: vi.fn().mockResolvedValue(mockDirectoryHandle),
  },
});

describe("lstat", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should return Stats object (same as stat since no symlinks in OPFS)", async () => {
    const fileStat = await lstat("/test.txt");
    expect(fileStat.isFile()).toBe(true);
    expect(fileStat.isDirectory()).toBe(false);
  });
});
