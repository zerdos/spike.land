import { describe, expect, it, vi, beforeEach } from "vitest";
import { chown } from "../../../operations/file/chown";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("chown", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(chown("/path", 1000, 1000)).rejects.toThrow("OPFS adapter: chown is not implemented yet");
  });
});
