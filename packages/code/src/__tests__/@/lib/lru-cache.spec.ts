import { LRUCache } from "@/lib/lru-cache";
import { describe, it, expect } from "vitest";

describe("LRUCache", () => {
  it("should set and get values", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    expect(cache.get("a")?.value).toBe(1);
    expect(cache.get("b")?.value).toBe(2);
  });

  it("should evict least recently used item when max is exceeded", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    cache.set("c", { value: 3 }); // should evict "a"
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")?.value).toBe(2);
    expect(cache.get("c")?.value).toBe(3);
  });

  it("should update recently used order on get", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    cache.get("a"); // "a" becomes most recently used
    cache.set("c", { value: 3 }); // should evict "b"
    expect(cache.get("a")?.value).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")?.value).toBe(3);
  });

  it("should delete values", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    cache.delete("a");
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")?.value).toBe(2);
  });

  it("should clear all values", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    cache.clear();
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
    expect(cache.size).toBe(0);
  });

  it("should respect maxSize and sizeCalculation", () => {
    const cache = new LRUCache<string, { value: number }>({
      maxSize: 3,
      sizeCalculation: (v) => v.value,
    });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    expect(cache.get("a")?.value).toBe(1);
    expect(cache.get("b")?.value).toBe(2);
    cache.set("c", { value: 2 }); // This should evict "a" and "b"
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")?.value).toBe(2);
  });

  it("should allow custom dispose function", () => {
    const disposed: string[] = [];
    const cache = new LRUCache<string, { value: number }>({
      max: 2,
      dispose: (v, k, reason) => {
        disposed.push(`${k}:${v.value}:${reason}`);
      },
    });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    cache.set("c", { value: 3 }); // evicts "a"
    cache.delete("b");
    expect(disposed).toContain("a:1:evict");
    expect(disposed).toContain("b:2:delete");
  });

  it("should support dump and load", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    const dump = cache.dump();
    const cache2 = new LRUCache<string, { value: number }>({ max: 2 });
    cache2.load(dump);
    expect(cache2.get("a")?.value).toBe(1);
    expect(cache2.get("b")?.value).toBe(2);
  });

  it("should support entries, keys, and values iteration", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    cache.set("b", { value: 2 });
    const entries = Array.from(cache.entries());
    expect(entries).toContainEqual(["a", { value: 1 }]);
    expect(entries).toContainEqual(["b", { value: 2 }]);
    const keys = Array.from(cache.keys());
    expect(keys).toContain("a");
    expect(keys).toContain("b");
    const values = Array.from(cache.values());
    expect(values).toContainEqual({ value: 1 });
    expect(values).toContainEqual({ value: 2 });
  });

  it("should support has and peek", () => {
    const cache = new LRUCache<string, { value: number }>({ max: 2 });
    cache.set("a", { value: 1 });
    expect(cache.has("a")).toBe(true);
    expect(cache.has("b")).toBe(false);
    expect(cache.peek("a")).toEqual({ value: 1 });
    expect(cache.peek("b")).toBeUndefined();
  });
});
