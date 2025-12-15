import { beforeEach, describe, expect, it, vi } from "vitest";
import { mkdir } from "../../../operations/directory/mkdir";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("mkdir", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setupTest();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should create a directory", async () => {
    await mkdir("/newdir");
    expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalledWith(
      "newdir",
      { create: true },
    );
  });

  it("should create nested directories with recursive option", async () => {
    await mkdir("/test/nested", { recursive: true });
    expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalledWith(
      "test",
      { create: false },
    );
  });

  it("should throw error for invalid directory path", async () => {
    await expect(mkdir("/")).rejects.toThrow("Invalid directory path");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error creating directory"),
      expect.any(Error),
    );
  });

  it("should return undefined when not recursive", async () => {
    const result = await mkdir("/newdir");
    expect(result).toBeUndefined();
  });
});
