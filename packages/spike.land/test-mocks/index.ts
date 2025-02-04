import { vi } from "vitest";
import { setupCodeRateLimiter } from "./code-rate-limiter";
import { setupOpenAIMock } from "./openai-mock";
import { setupR2Mock } from "./r2-mock";
import { setupResponseMock } from "./response-mock";
import { setupUrlMock } from "./url-mock";
import { setupWebSocketPairMock } from "./websocket-mock";

export {
  setupCodeRateLimiter,
  setupOpenAIMock,
  setupR2Mock,
  setupResponseMock,
  setupUrlMock,
  setupWebSocketPairMock,
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

  Object.defineProperty(globalThis, "Date", {
    value: Date,
    writable: true,
    configurable: true,
  });
}
