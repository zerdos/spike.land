import { describe, expect, it, vi, beforeEach } from "vitest";
import { watch } from "../../../operations/directory/watch";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("watch", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw not implemented error", () => {
    expect(() => watch("/")).toThrow("OPFS adapter: watch is not implemented yet");
  });
});
