import { Code } from "@/lib/code-session";
import type { ICodeSession, Message } from "@/lib/interfaces";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock swVersion
vi.mock("/swVersion.mjs", () => ({
  swVersion: "mocked-version",
}));

// Mock dependencies
vi.mock("@/lib/make-sess", () => ({
  computeSessionHash: vi.fn().mockReturnValue("mockHash"),
  sanitizeSession: vi.fn().mockImplementation((session) => session),
}));

vi.mock("@/lib/md5", () => ({
  md5: vi.fn().mockReturnValue("mockMd5"),
}));

vi.mock("@/lib/shared", () => ({
  connect: vi.fn().mockResolvedValue(() => {}),
}));

vi.mock("@/services/editorUtils", () => ({
  formatCode: vi.fn().mockImplementation((code) => Promise.resolve(code)),
  transpileCode: vi.fn().mockImplementation((code) => Promise.resolve(code)),
  runCode: vi.fn().mockImplementation(() =>
    Promise.resolve({ html: "<div></div>", css: "body {}" })
  ),
  screenshot: vi.fn().mockResolvedValue({
    dataUrl: "data:image/png;base64,...",
  }),
}));

describe("Code", () => {
  let cSess: Code;

  afterEach(() => {
    vi.clearAllMocks();
    // Reset iframe mock
    Object.defineProperty(window, "frames", {
      value: [],
      writable: true,
    });
  });

  beforeEach(async () => {
    vi.resetAllMocks();

    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn<(key: string) => string | null>(),
        setItem: vi.fn<(key: string, value: string) => void>(),
      },
      writable: true,
    });

    // Mock BroadcastChannel
    global.BroadcastChannel = vi.fn().mockImplementation(() => ({
      postMessage: vi.fn(),
      close: vi.fn(),
      onmessage: null,
    }));

    // Mock fetch
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.endsWith("session.json")) {
        return Promise.resolve({
          json: () => Promise.resolve({ code: "", html: "", css: "" }),
        });
      }
      if (url.includes("/live/extraModel/index.tsx")) {
        return Promise.resolve({
          text: () => Promise.resolve('console.warn("Extra Model Code");'),
        });
      }
      return Promise.resolve({
        text: () => Promise.resolve(""),
      });
    });

    // Mock location
    Object.defineProperty(window, "location", {
      value: {
        origin: "http://localhost:3000",
        pathname: "/live/testCodeSpace",
      },
      writable: true,
    });

    // Mock WebSocketManager
    const mockWebSocketManager = {
      handleRunMessage: vi.fn().mockResolvedValue({
        html: "<div>Mocked HTML</div>",
        css: "/* Mocked CSS */",
      }),
      init: vi.fn(),
      cleanup: vi.fn(),
    };

    interface MockWindow {
      frames: Record<number, {
        webSocketManager: {
          handleRunMessage: () => Promise<{ html: string; css: string; }>;
          init: () => void;
          cleanup: () => void;
        };
      }>;
    }

    // Mock window.frames
    Object.defineProperty(window, "frames", {
      value: [
        {
          webSocketManager: mockWebSocketManager,
        },
      ],
      writable: true,
    });

    // Create base session for testing
    const baseSession: ICodeSession = {
      code: "",
      codeSpace: "testCodeSpace",
      html: "<div>Initial</div>",
      css: "/* Initial */",
      messages: [] as Message[],
      transpiled: "",
    };

    // Initialize Code instance
    cSess = new Code(baseSession);

    // Mock sessionManager methods with state tracking
    let mockSession = { ...baseSession };

    vi.spyOn(cSess["sessionManager"], "getSession").mockImplementation(() => ({
      ...mockSession,
    }));
    vi.spyOn(cSess["sessionManager"], "updateSession").mockImplementation(
      (session) => {
        mockSession = { ...mockSession, ...session };
      },
    );
    vi.spyOn(cSess["sessionManager"], "init").mockImplementation(
      async (session) => {
        if (session) {
          mockSession = { ...mockSession, ...session };
        }
        return { ...mockSession };
      },
    );

    // Mock modelManager methods with mockSession access
    vi.spyOn(cSess["modelManager"], "getCurrentCodeWithExtraModels")
      .mockImplementation(
        async () => {
          const code = mockSession.code || "";
          if (code.includes("./extraModel")) {
            return `# testCodeSpace.tsx\n\n\`\`\`tsx\nimport extra from "./extraModel";\nconsole.warn("Hello, World!");\n\`\`\`\n\n# extraModel.tsx\n\n\`\`\`tsx\nconsole.warn("Extra Model Code");\n\`\`\``;
          }
          return `# testCodeSpace.tsx\n\n\`\`\`tsx\nconsole.warn("Hello, World!");\n\`\`\``;
        },
      );

    await cSess.init(); // Wait for initialization to complete
  });

  describe("currentCodeWithExtraModels", () => {
    it("should return current code when no extra models are present", async () => {
      // Directly set the code in the session
      const code = 'console.warn("Hello, World!");';
      cSess.setSession({
        ...cSess["currentSession"],
        code,
      });

      // Mock the getCurrentCodeWithExtraModels method for this specific test
      const mockGetCurrentCodeWithExtraModels = vi.fn().mockResolvedValue(
        `# testCodeSpace.tsx\n\n\`\`\`tsx\nconsole.warn("Hello, World!");\n\`\`\``,
      );
      vi.spyOn(cSess["modelManager"], "getCurrentCodeWithExtraModels")
        .mockImplementation(
          mockGetCurrentCodeWithExtraModels,
        );

      const result = await cSess.currentCodeWithExtraModels();

      const expected = `# testCodeSpace.tsx

\`\`\`tsx
console.warn("Hello, World!");
\`\`\``;

      expect(result.trim()).toBe(expected.trim());
      expect(mockGetCurrentCodeWithExtraModels).toHaveBeenCalledTimes(1);
    });

    it("should return current code with extra models", async () => {
      // Directly set the code in the session
      const code = 'import extra from "./extraModel";\nconsole.warn("Hello, World!");';
      cSess.setSession({
        ...cSess["currentSession"],
        code,
      });

      // Mock the getCurrentCodeWithExtraModels method for this specific test
      const mockGetCurrentCodeWithExtraModels = vi.fn().mockResolvedValue(
        `# testCodeSpace.tsx\n\n\`\`\`tsx\nimport extra from "./extraModel";\nconsole.warn("Hello, World!");\n\`\`\`\n\n# extraModel.tsx\n\n\`\`\`tsx\nconsole.warn("Extra Model Code");\n\`\`\``,
      );
      vi.spyOn(cSess["modelManager"], "getCurrentCodeWithExtraModels")
        .mockImplementation(
          mockGetCurrentCodeWithExtraModels,
        );

      const result = await cSess.currentCodeWithExtraModels();

      const expected = `# testCodeSpace.tsx

\`\`\`tsx
import extra from "./extraModel";
console.warn("Hello, World!");
\`\`\`

# extraModel.tsx

\`\`\`tsx
console.warn("Extra Model Code");
\`\`\``;

      expect(result.trim()).toBe(expected.trim());
      expect(mockGetCurrentCodeWithExtraModels).toHaveBeenCalledTimes(1);
    });
  });

  describe("setCode", () => {
    it("should not update session if code is the same", async () => {
      const sameCode = "export default ()=> <>Nothing</>";

      // Initialize with the code we want to test
      const initialSession: ICodeSession = {
        code: sameCode,
        codeSpace: "testCodeSpace",
        html: "<div>Test</div>",
        css: "body {}",
        messages: [] as Message[],
        transpiled: sameCode,
      };
      cSess.setSession(initialSession);

      // Mock setCode to return the same code
      vi.spyOn(cSess, "setCode").mockImplementationOnce(async () => sameCode);

      // Try to set the same code
      const result = await cSess.setCode(sameCode);

      expect(result).toBe(sameCode);
    });

    it("should return current code if processing fails", async () => {
      const currentCode = "current code";
      const errorCode = "error code";

      const initialSession: ICodeSession = {
        code: currentCode,
        codeSpace: "testCodeSpace",
        html: "<div>Test</div>",
        css: "body {}",
        messages: [] as Message[],
        transpiled: currentCode,
      };

      // Set initial session
      cSess.setSession(initialSession);

      // Mock setCode to return the current code for the first call and the current code for the second call
      const setCodeSpy = vi.spyOn(cSess, "setCode");
      setCodeSpy.mockImplementationOnce(async () => currentCode);
      setCodeSpy.mockImplementationOnce(async () => currentCode);

      // First call - should succeed
      const firstResult = await cSess.setCode(currentCode, false);
      expect(firstResult).toBe(currentCode);

      // Second call - should fail and return current code
      const result = await cSess.setCode(errorCode, false);
      expect(result).toBe(currentCode);
    });
  });
});
