import { describe, expect, it, vi, beforeEach } from "vitest";
import { glob } from "../../../operations/directory/glob";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("glob", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(glob("*.txt")).rejects.toThrow("OPFS adapter: glob is not implemented yet");
  });
});
