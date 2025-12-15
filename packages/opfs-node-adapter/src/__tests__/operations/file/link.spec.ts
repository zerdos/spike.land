import { describe, expect, it, vi, beforeEach } from "vitest";
import { link } from "../../../operations/file/link";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("link", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", async () => {
    await expect(link("/existing", "/new")).rejects.toThrow("OPFS adapter: link is not implemented yet");
  });
});
