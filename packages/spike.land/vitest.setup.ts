import { afterAll, beforeAll } from "vitest";

// Immediately increase max listeners to prevent warnings
// This needs to happen before any test setup
if (typeof process !== "undefined" && process.setMaxListeners) {
  process.setMaxListeners(0); // 0 = unlimited
}

// Also increase for EventEmitter if available
if (typeof require !== "undefined") {
  try {
    const EventEmitter = require("events").EventEmitter;
    if (EventEmitter && EventEmitter.defaultMaxListeners) {
      EventEmitter.defaultMaxListeners = 50;
    }
  } catch {
    // Ignore if not available
  }
}

afterAll(() => {
  // Force cleanup of any remaining timers
  if (typeof global.clearInterval === "function") {
    // Clear all intervals from 1 to 10000 (brute force cleanup)
    for (let i = 1; i < 10000; i++) {
      try {
        clearInterval(i);
      } catch {
        // Ignore errors
      }
    }
  }
  
  if (typeof global.clearTimeout === "function") {
    // Clear all timeouts from 1 to 10000 (brute force cleanup)
    for (let i = 1; i < 10000; i++) {
      try {
        clearTimeout(i);
      } catch {
        // Ignore errors
      }
    }
  }
});