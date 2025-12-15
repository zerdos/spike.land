import { beforeEach, describe, expect, it, vi } from "vitest";
import { rmdir } from "../../../operations/directory/rmdir";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("rmdir", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setupTest();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should remove a directory", async () => {
    await rmdir("/test");
    expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test", {
      recursive: true,
    });
  });

  it("should throw error for root directory", async () => {
    await expect(rmdir("/")).rejects.toThrow("Cannot remove root directory");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error removing directory"),
      expect.any(Error),
    );
  });
});
