import { setupWebSocketPairMock } from "./websocket-mock";
import { setupUrlMock } from "./url-mock";
import { setupOpenAIMock } from "./openai-mock";
import { setupR2Mock } from "./r2-mock";
import { setupResponseMock } from "./response-mock";
import { setupCodeRateLimiter } from "./code-rate-limiter";
import { vi } from "vitest";

export { 
  setupWebSocketPairMock, 
  setupUrlMock, 
  setupOpenAIMock, 
  setupR2Mock, 
  setupResponseMock, 
  setupCodeRateLimiter 
};

export function setupAllMocks() {
  setupWebSocketPairMock();
  setupUrlMock();
  setupOpenAIMock();
  setupR2Mock();
  setupResponseMock();
  setupCodeRateLimiter();

  // Additional global mocks
  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({}),
    text: vi.fn().mockResolvedValue(""),
  });

  global.console = {
    ...global.console,
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  };

  Object.defineProperty(globalThis, 'Date', {
    value: Date,
    writable: true,
    configurable: true
  });
}
