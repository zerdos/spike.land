import { beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "./CodeSession";

// Mock swVersion
vi.mock("/swVersion.mjs", () => ({
  swVersion: "mocked-version",
}));

// Mock dependencies
vi.mock("../lib/make-sess", () => ({
  computeSessionHash: vi.fn().mockReturnValue("mockHash"),
  sanitizeSession: vi.fn().mockImplementation((session) => session),
}));

vi.mock("../lib/md5", () => ({
  md5: vi.fn().mockReturnValue("mockMd5"),
}));

vi.mock("../lib/shared", () => ({
  connect: vi.fn().mockResolvedValue(() => {}),
}));

vi.mock("../components/editorUtils", () => ({
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
    delete (window as unknown as { frames: Record<number, unknown>; }).frames[0];
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
          text: () => Promise.resolve('console.log("Extra Model Code");'),
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

    // Mock window.frames[0]
    (window as unknown as MockWindow).frames[0] = {
      webSocketManager: mockWebSocketManager,
    };

    // Initialize Code instance
    cSess = new Code("testCodeSpace");

    // Mock sessionManager methods
    const mockSession = {
      code: "",
      codeSpace: "testCodeSpace",
      html: "",
      css: "",
      messages: [],
      transpiled: "",
    };

    vi.spyOn(cSess["sessionManager"], "getSession").mockImplementation(() => mockSession);
    vi.spyOn(cSess["sessionManager"], "updateSession").mockImplementation((session) => {
      Object.assign(mockSession, session);
    });
    vi.spyOn(cSess["sessionManager"], "init").mockImplementation(async (session) => {
      if (session) {
        Object.assign(mockSession, session);
      }
      return mockSession;
    });

    // Mock modelManager methods
    vi.spyOn(cSess["modelManager"], "getCurrentCodeWithExtraModels").mockImplementation(
      async () => {
        const code = mockSession.code;
        if (code.includes("./extraModel")) {
          return `# testCodeSpace.tsx

\`\`\`tsx
${code}
\`\`\`

# extraModel.tsx

\`\`\`tsx
console.log("Extra Model Code");
\`\`\`
`;
        }
        return `# testCodeSpace.tsx

\`\`\`tsx
${code}
\`\`\`
`;
      },
    );

    await cSess.init(); // Wait for initialization to complete
  });

  describe("currentCodeWithExtraModels", () => {
    it("should return current code when no extra models are present", async () => {
      await cSess.setCode('console.log("Hello, World!");', true);
      const result = await cSess.currentCodeWithExtraModels();

      const expected = `# testCodeSpace.tsx

\`\`\`tsx
console.log("Hello, World!");
\`\`\`
`;

      expect(result.trim()).toBe(expected.trim());
    });

    it("should return current code with extra models", async () => {
      await cSess.setCode('import extra from "./extraModel";\nconsole.log("Hello, World!");', true);

      const result = await cSess.currentCodeWithExtraModels();

      const expected = `# testCodeSpace.tsx

\`\`\`tsx
import extra from "./extraModel";
console.log("Hello, World!");
\`\`\`

# extraModel.tsx

\`\`\`tsx
console.log("Extra Model Code");
\`\`\`
`;

      expect(result.trim()).toBe(expected.trim());
    });
  });

  describe("setCode", () => {
    it("should not update session if code is the same", async () => {
      const sameCode = "export default ()=> <>Nothing</>";

      // Mock initial session state
      vi.spyOn(cSess["codeProcessor"], "process").mockImplementation(async (_code) => ({
        code: sameCode,
        codeSpace: "testCodeSpace",
        html: "<div>Test</div>",
        css: "body {}",
        messages: [],
        transpiled: sameCode,
      }));

      // First set the initial code
      await cSess.setCode(sameCode);

      // Try to set the same code again
      const result = await cSess.setCode(sameCode);

      expect(result).toBe(sameCode);
      expect(await cSess.getCode()).toBe(sameCode);
    });

    it("should return current code if processing fails", async () => {
      const currentCode = "current code";
      const errorCode = "error code";

      // Mock initial successful process
      vi.spyOn(cSess["codeProcessor"], "process")
        .mockImplementationOnce(async () => ({
          code: currentCode,
          codeSpace: "testCodeSpace",
          html: "<div>Test</div>",
          css: "body {}",
          messages: [],
          transpiled: currentCode,
        }))
        // Then mock failure
        .mockImplementationOnce(async () => false);

      // Set initial code
      await cSess.setCode(currentCode);

      // Attempt to set error code
      const result = await cSess.setCode(errorCode);

      // Should return current code on failure
      expect(result).toBe(currentCode);
    });
  });
});
