import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ICodeSession } from "@/lib/interfaces";
import type { ILogger } from "../interfaces/ILogger";
import type { IStorageWrapper } from "../interfaces/IDependencyWrapper";
import type { SessionManagerDependencies } from "../SessionManager";
import { SessionManager } from "../SessionManager";

vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input: string) => `md5-${input}`),
}));

vi.mock("@/lib/shared", () => ({
  connect: vi.fn().mockResolvedValue(() => {}),
}));

vi.mock("../SessionSynchronizer", () => ({
  SessionSynchronizer: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue({
      codeSpace: "test-space",
      code: "",
      html: "",
      css: "",
      transpiled: "",
      messages: [],
    }),
    subscribe: vi.fn(),
    broadcastSession: vi.fn(),
    close: vi.fn(),
  })),
}));

describe("SessionManager", () => {
  let manager: SessionManager;
  let mockLogger: ILogger;
  let mockStorage: IStorageWrapper;
  let dependencies: SessionManagerDependencies;
  let mockSessionSynchronizer: {
    init: ReturnType<typeof vi.fn>;
    subscribe: ReturnType<typeof vi.fn>;
    broadcastSession: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };

  const testSession: ICodeSession = {
    codeSpace: "test-space",
    code: "const x = 1;",
    html: "<div>test</div>",
    css: "body { margin: 0; }",
    transpiled: "const x = 1;",
    messages: [],
  };

  beforeEach(async () => {
    mockLogger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    mockStorage = {
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined),
    };

    dependencies = {
      logger: mockLogger,
      storage: mockStorage,
    };

    const { SessionSynchronizer } = await import("../SessionSynchronizer");
    mockSessionSynchronizer = new SessionSynchronizer("test-space") as never;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create instance with dependencies", () => {
      manager = new SessionManager("test-space", dependencies);
      expect(manager).toBeInstanceOf(SessionManager);
    });

    it("should initialize session synchronizer", () => {
      manager = new SessionManager("test-space", dependencies);
      expect(manager).toBeDefined();
    });

    it("should subscribe to session synchronizer updates", () => {
      manager = new SessionManager("test-space", dependencies);
      expect(mockSessionSynchronizer.subscribe).toHaveBeenCalled();
    });

    it("should initialize user from storage", async () => {
      mockStorage.getItem = vi.fn().mockResolvedValue("existing-user-123");
      manager = new SessionManager("test-space", dependencies);

      await vi.waitFor(() => {
        expect(mockStorage.getItem).toHaveBeenCalledWith("test-space user");
      });
    });

    it("should create new user if not in storage", async () => {
      mockStorage.getItem = vi.fn().mockResolvedValue(null);
      global.crypto = {
        randomUUID: vi.fn().mockReturnValue("uuid-123"),
      } as never;

      manager = new SessionManager("test-space", dependencies);

      await vi.waitFor(() => {
        expect(mockStorage.setItem).toHaveBeenCalledWith("test-space user", expect.stringContaining("md5-"));
      });
    });

    it("should handle user initialization errors", async () => {
      mockStorage.getItem = vi.fn().mockRejectedValue(new Error("Storage error"));
      manager = new SessionManager("test-space", dependencies);

      await vi.waitFor(() => {
        expect(mockLogger.error).toHaveBeenCalledWith(
          "Failed to initialize user",
          expect.any(Error),
        );
      });
    });
  });

  describe("init", () => {
    beforeEach(() => {
      manager = new SessionManager("test-space", dependencies);
    });

    it("should initialize session successfully", async () => {
      const session = await manager.init();
      expect(session).toBeDefined();
      expect(session.codeSpace).toBe("test-space");
    });

    it("should initialize with provided initial session", async () => {
      const initialSession = { ...testSession };
      mockSessionSynchronizer.init.mockResolvedValueOnce(initialSession);

      const session = await manager.init(initialSession);
      expect(mockSessionSynchronizer.init).toHaveBeenCalledWith(initialSession);
      expect(session).toEqual(initialSession);
    });

    it("should throw StorageError if session initialization fails", async () => {
      mockSessionSynchronizer.init.mockResolvedValueOnce(null);

      await expect(manager.init()).rejects.toThrow();
    });

    it("should connect worker after successful initialization", async () => {
      const { connect } = await import("@/lib/shared");
      await manager.init();

      expect(connect).toHaveBeenCalled();
    });

    it("should return initialized session", async () => {
      const session = await manager.init();
      const retrievedSession = manager.getSession();
      expect(retrievedSession).toEqual(session);
    });
  });

  describe("getSession", () => {
    beforeEach(() => {
      manager = new SessionManager("test-space", dependencies);
    });

    it("should return current session", async () => {
      await manager.init();
      const session = manager.getSession();
      expect(session).toBeDefined();
      expect(session.codeSpace).toBe("test-space");
    });

    it("should throw error if session not initialized", () => {
      expect(() => manager.getSession()).toThrow("Session not initialized");
    });
  });

  describe("updateSession", () => {
    beforeEach(async () => {
      manager = new SessionManager("test-space", dependencies);
      mockSessionSynchronizer.init.mockResolvedValueOnce({ ...testSession });
      await manager.init();
    });

    it("should update session with new data", () => {
      const updates = { code: "const y = 2;" };
      manager.updateSession(updates);

      const session = manager.getSession();
      expect(session.code).toBe("const y = 2;");
    });

    it("should not broadcast if no changes", () => {
      const currentSession = manager.getSession();
      manager.updateSession({ code: currentSession.code });

      expect(mockSessionSynchronizer.broadcastSession).not.toHaveBeenCalled();
    });

    it("should broadcast session changes", () => {
      manager.updateSession({ code: "new code" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalled();
    });

    it("should compute diff and broadcast only changed fields", () => {
      manager.updateSession({ code: "updated code", html: "<div>new</div>" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          code: "updated code",
          html: "<div>new</div>",
          codeSpace: "test-space",
        }),
      );
    });

    it("should handle multiple field updates", () => {
      manager.updateSession({
        code: "new code",
        html: "<p>new html</p>",
        css: "body { color: red; }",
      });

      const session = manager.getSession();
      expect(session.code).toBe("new code");
      expect(session.html).toBe("<p>new html</p>");
      expect(session.css).toBe("body { color: red; }");
    });

    it("should do nothing if session not initialized", () => {
      const uninitManager = new SessionManager("test-space", dependencies);
      expect(() => uninitManager.updateSession({ code: "test" })).not.toThrow();
    });

    it("should sanitize session before comparison", () => {
      const updates = { code: "const z = 3;" };
      manager.updateSession(updates);

      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it("should include sender in broadcast", () => {
      manager.updateSession({ code: "test code" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          sender: expect.any(String),
        }),
      );
    });
  });

  describe("subscribe", () => {
    beforeEach(() => {
      manager = new SessionManager("test-space", dependencies);
    });

    it("should allow subscribing to session updates", () => {
      const callback = vi.fn();
      const unsubscribe = manager.subscribe(callback);

      expect(typeof unsubscribe).toBe("function");
    });

    it("should call callback on session updates", async () => {
      let subscribeCallback: ((session: ICodeSession) => void) | undefined;
      mockSessionSynchronizer.subscribe.mockImplementation((cb: (session: ICodeSession) => void) => {
        subscribeCallback = cb;
        return () => {};
      });

      const callback = vi.fn();
      manager.subscribe(callback);

      const updatedSession = { ...testSession, code: "updated" };
      subscribeCallback?.(updatedSession);

      expect(callback).toHaveBeenCalledWith(expect.objectContaining({ code: "updated" }));
    });

    it("should return unsubscribe function", () => {
      const callback = vi.fn();
      const unsubscribe = manager.subscribe(callback);

      expect(unsubscribe).toBeInstanceOf(Function);
      expect(() => unsubscribe()).not.toThrow();
    });

    it("should handle sender property in session updates", () => {
      let subscribeCallback: ((session: ICodeSession & { sender?: string; }) => void) | undefined;
      mockSessionSynchronizer.subscribe.mockImplementation(
        (cb: (session: ICodeSession & { sender?: string; }) => void) => {
          subscribeCallback = cb;
          return () => {};
        },
      );

      const callback = vi.fn();
      manager.subscribe(callback);

      const updatedSession = { ...testSession, sender: "user-123" };
      subscribeCallback?.(updatedSession);

      expect(callback).toHaveBeenCalled();
    });
  });

  describe("computeSessionDiff", () => {
    beforeEach(async () => {
      manager = new SessionManager("test-space", dependencies);
      await manager.init();
    });

    it("should detect code changes", () => {
      const _oldSession = { ...testSession };
      const _newSession = { ...testSession, code: "new code" };

      manager.updateSession({ code: "new code" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalled();
    });

    it("should detect html changes", () => {
      manager.updateSession({ html: "<div>new html</div>" });
      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalled();
    });

    it("should detect css changes", () => {
      manager.updateSession({ css: "body { color: blue; }" });
      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalled();
    });

    it("should detect transpiled changes", () => {
      manager.updateSession({ transpiled: "new transpiled" });
      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalled();
    });

    it("should detect multiple field changes", () => {
      manager.updateSession({
        code: "new code",
        html: "<div>new</div>",
        css: "new css",
      });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          code: "new code",
          html: "<div>new</div>",
          css: "new css",
        }),
      );
    });

    it("should always include codeSpace in diff", () => {
      manager.updateSession({ code: "test" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          codeSpace: "test-space",
        }),
      );
    });
  });

  describe("release", () => {
    beforeEach(async () => {
      manager = new SessionManager("test-space", dependencies);
      await manager.init();
    });

    it("should release worker", async () => {
      await manager.release();
      expect(manager).toBeDefined();
    });

    it("should close session synchronizer", async () => {
      await manager.release();
      expect(mockSessionSynchronizer.close).toHaveBeenCalled();
    });

    it("should handle release errors gracefully", async () => {
      mockSessionSynchronizer.close.mockImplementation(() => {
        throw new Error("Close failed");
      });

      await expect(manager.release()).rejects.toThrow();
    });
  });

  describe("session synchronization", () => {
    beforeEach(async () => {
      manager = new SessionManager("test-space", dependencies);
      await manager.init();
    });

    it("should update local session when sync updates received", () => {
      let subscribeCallback: ((session: ICodeSession) => void) | undefined;
      mockSessionSynchronizer.subscribe.mockImplementation((cb: (session: ICodeSession) => void) => {
        subscribeCallback = cb;
        return () => {};
      });

      manager = new SessionManager("test-space", dependencies);

      const syncedSession = { ...testSession, code: "synced code" };
      subscribeCallback?.(syncedSession);

      expect(manager.getSession).toBeDefined();
    });

    it("should broadcast changes to other tabs", () => {
      manager.updateSession({ code: "broadcast test" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          code: "broadcast test",
        }),
      );
    });

    it("should include all session fields in broadcast", () => {
      manager.updateSession({ code: "test" });

      expect(mockSessionSynchronizer.broadcastSession).toHaveBeenCalledWith(
        expect.objectContaining({
          code: expect.any(String),
          html: expect.any(String),
          css: expect.any(String),
          codeSpace: "test-space",
          transpiled: expect.any(String),
          messages: expect.any(Array),
          sender: expect.any(String),
        }),
      );
    });

    it("should not broadcast if only codeSpace exists in diff", () => {
      const currentSession = manager.getSession();
      manager.updateSession({ codeSpace: currentSession.codeSpace });

      expect(mockSessionSynchronizer.broadcastSession).not.toHaveBeenCalled();
    });
  });

  describe("error scenarios", () => {
    it("should handle storage errors during user init", async () => {
      mockStorage.getItem = vi.fn().mockRejectedValue(new Error("Storage unavailable"));
      manager = new SessionManager("test-space", dependencies);

      await vi.waitFor(() => {
        expect(mockLogger.error).toHaveBeenCalled();
      });
    });

    it("should handle session synchronizer init failure", async () => {
      mockSessionSynchronizer.init.mockRejectedValueOnce(new Error("Sync failed"));
      manager = new SessionManager("test-space", dependencies);

      await expect(manager.init()).rejects.toThrow();
    });

    it("should throw when getting uninitialized session", () => {
      manager = new SessionManager("test-space", dependencies);
      expect(() => manager.getSession()).toThrow("Session not initialized");
    });
  });

  describe("logging", () => {
    beforeEach(async () => {
      manager = new SessionManager("test-space", dependencies);
      await manager.init();
    });

    it("should log session broadcasts", () => {
      manager.updateSession({ code: "new code" });

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "SessionManager Broadcasting session",
        expect.objectContaining({ session: expect.any(Object) }),
      );
    });

    it("should log broadcast completion", () => {
      manager.updateSession({ code: "test", html: "<div>test</div>" });

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Session broadcast complete",
        expect.objectContaining({ changedFields: expect.any(Number) }),
      );
    });

    it("should log user initialization", async () => {
      await vi.waitFor(() => {
        expect(mockLogger.debug).toHaveBeenCalledWith(
          "User initialized",
          expect.objectContaining({
            user: expect.any(String),
            codeSpace: "test-space",
          }),
        );
      });
    });
  });
});
