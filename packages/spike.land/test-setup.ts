import { vi } from "vitest";

// import {
//   setupCodeRateLimiter,
//   setupOpenAIMock,
//   setupR2Mock,
//   setupUrlMock,
//   setupWebSocketPairMock,
// } from "./test-mocks";

// // Set up all global mocks for testing
// setupWebSocketPairMock();
// setupUrlMock();
// setupOpenAIMock();
// setupR2Mock();

// setupCodeRateLimiter();

// // Global fetch mock
// global.fetch = vi.fn().mockResolvedValue({
//   json: vi.fn().mockResolvedValue({}),
//   text: vi.fn().mockResolvedValue(""),
// });

// Mock console methods
vi.spyOn(console, 'log').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
vi.spyOn(console, 'info').mockImplementation(() => {});
vi.spyOn(console, 'debug').mockImplementation(() => {});

// // Ensure Date is properly defined in the global scope
// Object.defineProperty(globalThis, "Date", {
//   value: Date,
//   writable: true,
//   configurable: true,
// });
