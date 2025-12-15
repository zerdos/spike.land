import { beforeEach, describe, expect, it, vi } from "vitest";
import { exists } from "../../../operations/directory/exists";
import { mockDirectoryHandle, setupTest } from "../../setup";

// Apply mocks
vi.stubGlobal("navigator", (await import("../../setup")).mockNavigator);

describe("exists", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should return true for existing file", async () => {
    const result = await exists("/test.txt");
    expect(result).toBe(true);
  });

  it("should return false for non-existent file", async () => {
    mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
      new Error("Not found"),
    );
    mockDirectoryHandle.getDirectoryHandle = vi.fn().mockRejectedValue(
      new Error("Not found"),
    );

    const result = await exists("/nonexistent");
    expect(result).toBe(false);

    setupTest();
  });
});
