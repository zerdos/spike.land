import { describe, expect, it, vi, beforeEach } from "vitest";
import { lutimes } from "../../../operations/file/lutimes";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lutimes", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(lutimes("/path", new Date(), new Date())).rejects.toThrow(
      "OPFS adapter: lutimes is not implemented yet",
    );
  });
});
