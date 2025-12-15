import { beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp } from "../../../operations/directory/mkdtemp";
import { mockDirectoryHandle, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("mkdtemp", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should create a temporary directory with random suffix", async () => {
    setupTest();
    const result = await mkdtemp("test-");
    expect(result).toMatch(/^test-.{6}$/);
    expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalled();
  });
});
