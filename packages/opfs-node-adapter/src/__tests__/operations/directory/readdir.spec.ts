import { describe, expect, it, vi, beforeEach } from "vitest";
import { readdir } from "../../../operations/directory/readdir";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("readdir", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should return array of entries", async () => {
    const entries = await readdir("/");
    expect(Array.isArray(entries)).toBe(true);
  });

  it("should return array of strings by default", async () => {
    const entries = await readdir("/");
    expect(Array.isArray(entries)).toBe(true);
    if (entries.length > 0) {
      expect(typeof entries[0]).toBe("string");
    }
  });

  it("should return array of Dirent objects when withFileTypes is true", async () => {
    const entries = await readdir("/", { withFileTypes: true });
    expect(Array.isArray(entries)).toBe(true);
    if (entries.length > 0) {
      expect(entries[0]).toHaveProperty("name");
      expect(entries[0]).toHaveProperty("isFile");
      expect(entries[0]).toHaveProperty("isDirectory");
    }
  });

  it("should return empty array on error", async () => {
    // Mock an error by making getDirectoryHandleAndFileName fail
    const mockError = new Error("Test error");
    vi.spyOn(mockNavigator.storage, "getDirectory").mockRejectedValueOnce(mockError);

    const entries = await readdir("/nonexistent");
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBe(0);
  });
});
