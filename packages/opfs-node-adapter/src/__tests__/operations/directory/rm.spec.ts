import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";
import { rm } from "../../../operations/directory/rm";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("rm", () => {
  beforeEach(() => {
    setupTest();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should remove a file", async () => {
    await rm("/test.txt");
    expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt", {
      recursive: false,
    });
  });

  it("should remove recursively with option", async () => {
    await rm("/test", { recursive: true });
    expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test", {
      recursive: true,
    });
  });

  it("should throw error for root directory", async () => {
    await expect(rm("/")).rejects.toThrow("Cannot remove root directory");
  });

  it("should not throw error when force option is true and file not found", async () => {
    mockDirectoryHandle.removeEntry = vi.fn().mockRejectedValue(
      new Error("NotFoundError: File not found"),
    );
    await expect(rm("/nonexistent.txt", { force: true })).resolves.toBeUndefined();
  });

  it("should throw error when file not found and force option is false", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockDirectoryHandle.removeEntry = vi.fn().mockRejectedValue(
      new Error("File not found"),
    );
    await expect(rm("/nonexistent.txt")).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error removing"),
      expect.any(Error),
    );
  });
});
