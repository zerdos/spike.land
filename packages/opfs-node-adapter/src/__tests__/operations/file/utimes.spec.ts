import { describe, expect, it, vi, beforeEach } from "vitest";
import { utimes } from "../../../operations/file/utimes";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("utimes", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(utimes("/path", new Date(), new Date())).rejects.toThrow(
      "OPFS adapter: utimes is not implemented yet",
    );
  });
});
