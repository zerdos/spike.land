import { vi } from "vitest";

export function setupAllMocks() {
  // Additional global mocks
  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({}),
    text: vi.fn().mockResolvedValue(""),
  });

  Object.defineProperty(globalThis, "Date", {
    value: Date,
    writable: true,
    configurable: true,
  });
}
