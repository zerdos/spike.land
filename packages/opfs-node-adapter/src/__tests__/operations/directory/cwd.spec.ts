import { describe, it, expect } from "vitest";
import { cwd } from "../../../operations/directory/cwd";

describe("cwd", () => {
  it("should return root directory", async () => {
    const currentDir = await cwd();
    expect(currentDir).toBe("/");
  });
});
