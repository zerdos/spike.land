import { describe, expect, it, vi, beforeEach } from "vitest";
import { cp } from "../../../operations/directory/cp";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("cp", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(cp("/src", "/dest")).rejects.toThrow("OPFS adapter: cp is not implemented yet");
  });
});
