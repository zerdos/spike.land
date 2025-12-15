import { describe, expect, it, vi, beforeEach } from "vitest";
import { opendir } from "../../../operations/directory/opendir";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("opendir", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(opendir("/")).rejects.toThrow("OPFS adapter: opendir is not implemented yet");
  });
});
