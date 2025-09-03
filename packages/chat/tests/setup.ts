import { beforeAll, afterEach, vi } from "vitest";

beforeAll(() => {
  // Increase max listeners to prevent warnings
  if (typeof process !== "undefined" && process.setMaxListeners) {
    process.setMaxListeners(20);
  }
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();
  vi.clearAllTimers();
  
  // Reset all module mocks
  vi.resetModules();
});