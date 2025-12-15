import { describe, expect, it, vi, beforeEach } from "vitest";
import { readlink } from "../../../operations/file/readlink";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("readlink", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(readlink("/path")).rejects.toThrow("OPFS adapter: readlink is not implemented yet");
  });
});
