import { describe, expect, it, vi, beforeEach } from "vitest";
import { symlink } from "../../../operations/file/symlink";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("symlink", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(symlink("/target", "/path")).rejects.toThrow("OPFS adapter: symlink is not implemented yet");
  });
});
