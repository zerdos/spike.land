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

  beforeEach(async () => {
    vi.resetAllMocks();

    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
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

    // Initialize Code instance
    cSess = new Code("testCodeSpace");
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
      
      // First set the initial code
      await cSess.setCode(sameCode);

      // Try to set the same code again
      const result = await cSess.setCode(sameCode);

      expect(result).toBe(sameCode);
      expect(await cSess.getCode()).toBe(sameCode);
    });

    it("should return current code if processing fails", async () => {
      const errorCode = "error code";
      const currentCode = "current code";
      
      // Set initial code
      await cSess.setCode(currentCode);
      
      // Mock process to fail
      vi.spyOn(cSess["codeProcessor"], "process").mockResolvedValue(false);

      // Attempt to set error code
      const result = await cSess.setCode(errorCode);

      // Should return current code on failure
      expect(result).toBe(currentCode);
    });
  });
});
