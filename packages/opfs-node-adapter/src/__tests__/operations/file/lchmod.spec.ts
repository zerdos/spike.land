import { describe, expect, it, vi, beforeEach } from "vitest";
import { lchmod } from "../../../operations/file/lchmod";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lchmod", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(lchmod("/path", 0o755)).rejects.toThrow("OPFS adapter: lchmod is not implemented yet");
  });
});
