import type { ICode, ICodeSession, Message } from "@/lib/interfaces";
import { vi } from "vitest";

// Define type for global with cSess property (unused, but may be needed for future tests)
// interface _GlobalWithCodeSession {
//   cSess?: ICode;
// }

/**
 * Creates a mock code session for testing
 */
export const createMockCodeSession = (initialCode = "// Test code"): ICode => {
  // Mock session data
  let code = initialCode;
  let messages: Message[] = [];

  // Create the mock session object with extended properties
  const mockSession: ICode & { addMessage?: (message: Message) => boolean; removeMessages?: () => boolean; } = {
    getCode: vi.fn().mockImplementation(() => Promise.resolve(code)),
    setCode: vi.fn().mockImplementation((newCode: string) => {
      code = newCode;
      return Promise.resolve(newCode);
    }),
    addMessage: vi.fn().mockImplementation((message: Message) => {
      messages.push(message);
      return true;
    }),
    removeMessages: vi.fn().mockImplementation(() => {
      messages = [];
      return true;
    }),
    getSession: vi.fn().mockImplementation(() =>
      Promise.resolve({
        code,
        codeSpace: "test-space",
        html: "<div>Test</div>",
        css: ".test { color: red; }",
        messages,
        transpiled: code,
      })
    ),
    setSession: vi.fn().mockImplementation((session: ICodeSession) => {
      code = session.code;
      messages = [...session.messages];
    }),
    init: vi.fn().mockImplementation(() =>
      Promise.resolve({
        code,
        codeSpace: "test-space",
        html: "<div>Test</div>",
        css: ".test { color: red; }",
        messages,
        transpiled: code,
      })
    ),
    screenshot: vi.fn().mockImplementation(() =>
      Promise.resolve({
        imageName: "test.png",
        url: "data:image/png;base64,test",
        src: "data:image/png;base64,test",
        mediaType: "image/png",
        data: "test",
        type: "image",
      })
    ),
    // addMessageChunk removed as it's not part of ICode interface
    getCodeSpace: vi.fn().mockImplementation(() => "test-space"),
    sub: vi.fn().mockImplementation(() => () => {}),
  };

  return mockSession;
};

/**
 * Creates a global mock code session for testing
 */
export const setupGlobalMockSession = (initialCode = "// Test code"): ICode => {
  const mockSession = createMockCodeSession(initialCode);

  // Set up the global cSess object
  (global as { cSess?: ICode; }).cSess = mockSession;

  return mockSession;
};

/**
 * Cleans up the global mock session
 */
export const cleanupGlobalMockSession = (): void => {
  delete (global as { cSess?: ICode; }).cSess;
};

// Create a default mock session for direct import
export const cSessMock = createMockCodeSession();
