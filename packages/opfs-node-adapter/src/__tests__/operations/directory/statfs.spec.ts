import { describe, expect, it, vi, beforeEach } from "vitest";
import { statfs } from "../../../operations/directory/statfs";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("statfs", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(statfs("/")).rejects.toThrow("OPFS adapter: statfs is not implemented yet");
  });
});
