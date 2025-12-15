import { describe, expect, it, vi, beforeEach } from "vitest";
import { chmod } from "../../../operations/file/chmod";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("chmod", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(chmod("/path", 0o755)).rejects.toThrow("OPFS adapter: chmod is not implemented yet");
  });
});
