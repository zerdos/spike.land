import { describe, expect, it } from "vitest";
import { realpath } from "../../../operations/file/realpath";
import "../../setup";

describe("realpath", () => {
  it("should normalize path with leading slash", async () => {
    const result = await realpath("/test/file.txt");
    expect(result).toBe("/test/file.txt");
  });

  it("should add leading slash if missing", async () => {
    const result = await realpath("test/file.txt");
    expect(result).toBe("/test/file.txt");
  });

  it("should remove trailing slash", async () => {
    const result = await realpath("/test/dir/");
    expect(result).toBe("/test/dir");
  });

  it("should handle root path", async () => {
    const result = await realpath("/");
    expect(result).toBe("/");
  });

  it("should collapse multiple slashes", async () => {
    const result = await realpath("/test//file.txt");
    expect(result).toBe("/test/file.txt");
  });
});
