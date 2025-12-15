import { describe, expect, it, vi, beforeEach } from "vitest";
import { lchown } from "../../../operations/file/lchown";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lchown", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(lchown("/path", 1000, 1000)).rejects.toThrow(
      "OPFS adapter: lchown is not implemented yet",
    );
  });
});
