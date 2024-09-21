import { beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "./CodeSession";

// Mock dependencies
vi.mock("../lib/make-sess", () => ({
  makeHash: vi.fn().mockReturnValue("mockHash"),
  makeSession: vi.fn().mockImplementation((session) => session),
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
  runCode: vi.fn().mockImplementation(() => Promise.resolve({ html: "<div></div>", css: "body {}" })),
  screenShot: vi.fn().mockResolvedValue({ dataUrl: "data:image/png;base64,..." }),
}));

describe("Code", () => {
  let code: Code;

  beforeEach(() => {
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
          json: () => Promise.resolve({ i: 1, code: "", html: "", css: "" }),
        });
      }
      if (url.includes("/live/extraModel/index.tsx")) {
        return Promise.resolve({
          text: () => Promise.resolve("console.log(\"Extra Model Code\");"),
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
    code = new Code("testCodeSpace");
  });

  describe("currentCodeWithExtraModels", () => {
    it("should return current code when no extra models are present", async () => {
      code.session.code = "console.log(\"Hello, World!\");";
      const result = await code.currentCodeWithExtraModels();

      const expected = `# testCodeSpace.tsx

\`\`\`tsx
console.log("Hello, World!");
\`\`\`
`;

      expect(result.trim()).toBe(expected.trim());
    });

    it("should return current code with extra models", async () => {
      code.session.code = "import extra from \"./extraModel\";\nconsole.log(\"Hello, World!\");";

      const result = await code.currentCodeWithExtraModels();

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
      code.session.code = sameCode;

      const result = await code.setCode(sameCode);

      expect(result).toBe(sameCode);
      expect(code.session.code).toBe(sameCode);
    });

    it("should return current code if processing fails", async () => {
      const errorCode = "error code";
      const currentCode = "current code";
      code.session.code = currentCode;
      vi.spyOn(code["codeProcessor"], "process").mockResolvedValue(false);

      const result = await code.setCode(errorCode);

      expect(result).toBe(currentCode);
    });
  });
});
