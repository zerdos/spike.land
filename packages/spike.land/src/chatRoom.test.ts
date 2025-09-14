import type { ICodeSession } from "@spike-npm-land/code";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "../src/chatRoom";
import type Env from "../src/env"; // Assuming Env type is exported from env.ts
import { RouteHandler } from "../src/routeHandler";
import { WebSocketHandler } from "../src/websocketHandler";

// Mock external dependencies
vi.mock("../src/routeHandler", () => ({
  RouteHandler: vi.fn().mockImplementation(() => ({
    handleRoute: vi.fn(),
  })),
}));

vi.mock("../src/websocketHandler", () => ({
  WebSocketHandler: vi.fn().mockImplementation(() => ({
    broadcast: vi.fn(),
    handleWebSocket: vi.fn(),
    getWsSessions: vi.fn().mockReturnValue([]), // Add missing method
  })),
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Code Durable Object", () => {
  let mockState: DurableObjectState;
  let mockEnv: Env;
  let codeInstance: Code;

  const mockR2Object = (textData: string) => ({
    text: vi.fn().mockResolvedValue(textData),
    // Add other R2Object properties if needed by the code
    json: vi.fn().mockImplementation(() => {
      try {
        return Promise.resolve(JSON.parse(textData || "{}"));
      } catch {
        // For HTML/CSS content, return an error as JSON.parse would
        return Promise.reject(new SyntaxError(`Unexpected token '${textData[0]}', "${textData}" is not valid JSON`));
      }
    }),
    arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(textData).buffer),
    blob: vi.fn(),
    body: null,
    bodyUsed: false,
    checksums: {},
    etag: "etag",
    httpEtag: "httpEtag",
    key: "key",
    size: textData.length,
    uploaded: new Date(),
    version: "version",
    writeHttpMetadata: vi.fn(),
  });

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test

    mockState = {
      storage: {
        get: vi.fn(),
        put: vi.fn().mockResolvedValue(undefined), // Make put return a promise
        delete: vi.fn(),
        list: vi.fn(),
        deleteAll: vi.fn(),
        transaction: vi.fn((closure: () => Promise<unknown>) => closure()),
        getAlarm: vi.fn(),
        setAlarm: vi.fn(),
        deleteAlarm: vi.fn(),
        blockConcurrencyWhile: vi.fn((callback) => callback()),
        // Add other storage methods if used, or cast to unknown then to DurableObjectStorage
      } as unknown, // Using type assertion for brevity, ideally mock all used methods
      id: { toString: () => "test-id", equals: vi.fn(), name: "test-name" } as DurableObjectId,
      waitUntil: vi.fn(),
      blockConcurrencyWhile: vi.fn(async (callback) => await callback()),
    } as unknown as DurableObjectState;

    mockEnv = {
      R2: {
        get: vi.fn(),
        put: vi.fn().mockResolvedValue(undefined), // Make R2 put return a promise
      },
      // Add other env properties if needed by the Code class
    } as unknown as Env;

    // Re-instantiate mocks for handlers for each test
    (RouteHandler as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      handleRoute: vi.fn().mockResolvedValue(new Response("OK")), // Ensure fetch can complete
    }));
    (WebSocketHandler as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      broadcast: vi.fn(),
      handleWebSocket: vi.fn(),
      getWsSessions: vi.fn().mockReturnValue([]), // Add missing method
    }));

    codeInstance = new Code(mockState, mockEnv);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("initializeSession", () => {
    it("should initialize and save a new session if none exists (e.g., 'x' room)", async () => {
      const roomName = "x";
      const testUrl = new URL(`https://example.com/?room=${roomName}`);
      const request = new Request(testUrl.toString());
      (mockState.storage.get as ReturnType<typeof vi.fn>).mockResolvedValue(undefined); // No session_core

      await codeInstance.fetch(request); // Call fetch to trigger initialization

      // For "x" room initialization, the session is created but not immediately saved
      // The session is only saved when there are changes via updateAndBroadcastSession
      const currentSession = codeInstance.getSession();
      expect(currentSession.codeSpace).toBe(roomName);
      expect(currentSession.code).toContain("Write your code here!");
      expect(currentSession.html).toBe("<div>Write your code here!</div>");
      expect(currentSession.css).toBe("");
    });

    it("should initialize by fetching a backup session if specified and none exists", async () => {
      const roomName = "backup-room";
      const testUrl = new URL(`https://example.com/?room=${roomName}`);
      const request = new Request(testUrl.toString());
      const backupSessionData: ICodeSession = {
        codeSpace: "backup", // This will be overridden by roomName
        code: "backup code",
        transpiled: "transpiled backup",
        html: "<p>backup html</p>",
        css: "backup_css",
        messages: [],
      };
      (mockState.storage.get as ReturnType<typeof vi.fn>).mockResolvedValue(undefined); // No session_core
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(backupSessionData),
      } as unknown as Response);

      await codeInstance.fetch(request); // Call fetch to trigger initialization

      expect(mockFetch).toHaveBeenCalledWith(`https://example.com/live/backup/session.json`);

      // The session is initialized with the backup data but codeSpace is updated
      const currentSession = codeInstance.getSession();
      expect(currentSession.codeSpace).toBe(roomName);
      expect(currentSession.code).toBe("backup code");
      expect(currentSession.html).toBe("<p>backup html</p>");
      expect(currentSession.css).toBe("backup_css");
    });

    it("should load an existing session from storage", async () => {
      const roomName = "existing-room";
      const testUrl = new URL(`https://example.com/?room=${roomName}`);
      const request = new Request(testUrl.toString());
      const storedCore: Partial<ICodeSession> = {
        codeSpace: roomName,
        messages: [{ text: "hi", type: "user" }],
      };
      const storedCode = "console.log('hello');";
      const storedTranspiled = "console.log('hello transpiled');";
      const storedHtml = "<div>Hello</div>";
      const storedCss = "body { color: red; }";

      (mockState.storage.get as ReturnType<typeof vi.fn>)
        .mockImplementation(async (key: string) => {
          if (key === "session_core") return storedCore;
          if (key === "session_code") return storedCode;
          if (key === "session_transpiled") return storedTranspiled;
          return undefined;
        });
      (mockEnv.R2.get as ReturnType<typeof vi.fn>)
        .mockImplementation(async (key: string) => {
          if (key === `r2_html_${roomName}`) return mockR2Object(storedHtml);
          if (key === `r2_css_${roomName}`) return mockR2Object(storedCss);
          return null; // R2 returns null for missing keys, not undefined
        });

      await codeInstance.fetch(request); // Call fetch to trigger initialization

      const session = codeInstance.getSession();
      expect(session.codeSpace).toBe(roomName);
      expect(session.messages).toEqual(storedCore.messages);
      expect(session.code).toBe(storedCode);
      expect(session.transpiled).toBe(storedTranspiled);
      expect(session.html).toBe(storedHtml);
      expect(session.css).toBe(storedCss);

      // The session initialization will trigger a save, so we should expect storage calls
      expect(mockState.storage.put).toHaveBeenCalled();
      expect(mockEnv.R2.put).toHaveBeenCalled();
    });
  });

  describe("updateAndBroadcastSession", () => {
    let initialSession: ICodeSession;

    beforeEach(async () => {
      // Initialize with a basic session first
      const roomName = "update-room";
      initialSession = {
        codeSpace: roomName,
        code: "initial code",
        transpiled: "initial transpiled",
        html: "<p>initial</p>",
        css: "initial_css",
        messages: [],
      };
      // Mock initializeSession's loading part to set this.session
      (mockState.storage.get as ReturnType<typeof vi.fn>)
        .mockImplementation(async (key: string) => {
          if (key === "session_core") return { codeSpace: roomName, messages: [] };
          if (key === "session_code") return initialSession.code;
          if (key === "session_transpiled") return initialSession.transpiled;
          return undefined;
        });
      (mockEnv.R2.get as ReturnType<typeof vi.fn>)
        .mockImplementation(async (key: string) => {
          if (key === `r2_html_${roomName}`) return mockR2Object(initialSession.html!);
          if (key === `r2_css_${roomName}`) return mockR2Object(initialSession.css!);
          return undefined;
        });

      // Initialize by calling fetch
      await codeInstance.fetch(new Request(`https://example.com/?room=${roomName}`));

      // Clear mocks from initialization that happened via fetch
      vi.clearAllMocks();
      // Resetup RouteHandler mock as it might have been called during fetch
      (RouteHandler as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        handleRoute: vi.fn().mockResolvedValue(new Response("OK")),
      }));
      // Resetup WebSocketHandler mock for broadcast
      (WebSocketHandler as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        broadcast: vi.fn(), // This is the important one for this test suite
        handleWebSocket: vi.fn(),
        getWsSessions: vi.fn().mockReturnValue([]), // Add missing method
      }));
      // Create a new instance of Code with the same state and env, but it will have the mocked WebSocketHandler
      codeInstance = new Code(mockState, mockEnv);
      // Manually set the session for this new instance to avoid re-initializing and re-triggering puts
      (codeInstance as unknown as { session: unknown; initialized: boolean; }).session =
        initialSession;
      (codeInstance as unknown as { session: unknown; initialized: boolean; }).initialized = true;
    });

    it("should save updated session parts and broadcast changes", async () => {
      const newSession: ICodeSession = {
        ...initialSession,
        code: "updated code",
        html: "<div>updated html</div>",
        css: "updated_css",
      };

      await codeInstance.updateAndBroadcastSession(newSession);
      const roomName = initialSession.codeSpace;

      expect(mockState.storage.put).toHaveBeenCalledWith(
        "session_core",
        expect.objectContaining({ codeSpace: roomName, messages: [] }),
      );
      expect(mockState.storage.put).toHaveBeenCalledWith("session_code", newSession.code);
      // Transpiled might be recomputed or passed through, check for string
      expect(mockState.storage.put).toHaveBeenCalledWith("session_transpiled", expect.any(String));
      expect(mockEnv.R2.put).toHaveBeenCalledWith(`r2_html_${roomName}`, newSession.html);
      expect(mockEnv.R2.put).toHaveBeenCalledWith(`r2_css_${roomName}`, newSession.css);

      expect(codeInstance.getSession()).toEqual(newSession);
      expect(codeInstance.wsHandler.broadcast).toHaveBeenCalled();
    });

    it("should not save or broadcast if session hash is the same", async () => {
      // Create a session that would result in the same hash (e.g. an identical session)
      // For simplicity, we use the initialSession directly.
      // The computeSessionHash function is complex, so direct comparison is easier here.
      const sessionWithSameHash: ICodeSession = { ...initialSession };

      await codeInstance.updateAndBroadcastSession(sessionWithSameHash);

      expect(mockState.storage.put).not.toHaveBeenCalled();
      expect(mockEnv.R2.put).not.toHaveBeenCalled();
      expect(codeInstance.wsHandler.broadcast).not.toHaveBeenCalled();
    });
  });
});
