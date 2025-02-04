import { vi } from "vitest";
import { 
  setupWebSocketPairMock, 
  setupUrlMock, 
  setupOpenAIMock, 
  setupR2Mock, 
  setupResponseMock, 
  setupCodeRateLimiter 
} from "./test-mocks";

// Set up all global mocks for testing
setupWebSocketPairMock();
setupUrlMock();
setupOpenAIMock();
setupR2Mock();
setupResponseMock();
setupCodeRateLimiter();

// Global fetch mock
global.fetch = vi.fn().mockResolvedValue({
  json: vi.fn().mockResolvedValue({}),
  text: vi.fn().mockResolvedValue(""),
});

// Mock console methods
global.console = {
  ...global.console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
};

// Ensure Date is properly defined in the global scope
Object.defineProperty(globalThis, 'Date', {
  value: Date,
  writable: true,
  configurable: true
});
