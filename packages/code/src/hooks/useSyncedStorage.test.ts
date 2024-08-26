import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSyncedStorage } from "./useSyncedStorage";

// Mock useCodeSpace hook
vi.mock("./useCodeSpace", () => ({
  useCodeSpace: vi.fn(() => "test-codespace"),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Mock IndexedDB
const indexedDBMock = {
  open: vi.fn().mockReturnValue({
    result: {
      transaction: vi.fn().mockReturnValue({
        objectStore: vi.fn().mockReturnValue({
          get: vi.fn().mockReturnValue({
            result: { value: "indexedDBValue" },
            onsuccess: null,
          }),
          put: vi.fn().mockReturnValue({
            onsuccess: null,
          }),
        }),
      }),
    },
    onsuccess: null,
  }),
};

// Mock BroadcastChannel
class BroadcastChannelMock {
  static channels: { [name: string]: BroadcastChannelMock } = {};
  listeners: ((event: MessageEvent) => void)[] = [];

  constructor(public name: string) {
    BroadcastChannelMock.channels[name] = this;
  }

  postMessage(message: any) {
    Object.values(BroadcastChannelMock.channels).forEach((channel) => {
      if (channel !== this) {
        channel.listeners.forEach((listener) => {
          listener({ data: message } as MessageEvent);
        });
      }
    });
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    this.listeners.push(listener);
  }

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  close() {
    delete BroadcastChannelMock.channels[this.name];
  }
}

describe("useSyncedStorage", () => {
  const originalLocalStorage = window.localStorage;
  const originalIndexedDB = window.indexedDB;
  const originalBroadcastChannel = globalThis.BroadcastChannel;

  beforeEach(() => {
    vi.resetAllMocks();
    Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });
    (globalThis as any).indexedDB = indexedDBMock;
    (globalThis as any).BroadcastChannel = BroadcastChannelMock;
    localStorageMock.clear();
    BroadcastChannelMock.channels = {};
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", { value: originalLocalStorage, writable: true });
    (globalThis as any).indexedDB = originalIndexedDB;
    (globalThis as any).BroadcastChannel = originalBroadcastChannel;
  });

  it("should use the initial value when storage is empty", async () => {
    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("initialValue");
  });

  it("should update the value and localStorage when setValue is called", async () => {
    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("testKey", JSON.stringify("newValue"));
  });

  it("should retrieve the value from localStorage if it exists", async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify("storedValue"));

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("storedValue");
  });

  it("should use IndexedDB in worker environments", async () => {
    Object.defineProperty(window, "localStorage", { value: undefined, writable: true });

    const mockGetRequest = {
      result: { value: "indexedDBValue" },
      onsuccess: null as any,
    };

    const mockGet = vi.fn(() => mockGetRequest);
    const mockPut = vi.fn().mockReturnValue({ onsuccess: null });

    const mockObjectStore = {
      get: mockGet,
      put: mockPut,
    };

    const mockTransaction = {
      objectStore: vi.fn().mockReturnValue(mockObjectStore),
    };

    const mockDB = {
      transaction: vi.fn().mockReturnValue(mockTransaction),
    };

    indexedDBMock.open.mockReturnValue({
      result: mockDB,
      onsuccess: null,
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      // Simulate IndexedDB open success
      indexedDBMock.open.mock.results[0].value.onsuccess?.({} as Event);
      // Simulate IndexedDB get success
      mockGetRequest.onsuccess?.({} as Event);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("indexedDBValue");

    await act(async () => {
      await result.current[1]("newIndexedDBValue");
    });

    expect(mockPut).toHaveBeenCalledWith({ key: "testKey", value: "newIndexedDBValue" });
  });

  it("should sync values across instances using BroadcastChannel", async () => {
    const { result: result1 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));
    const { result: result2 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result1.current[1]("newValue");
      // Manually trigger the BroadcastChannel message
      const broadcastChannel = BroadcastChannelMock.channels["storage_sync"];
      broadcastChannel.postMessage({ type: "update_testKey-test-codespace", value: "newValue" });
      await new Promise(resolve => setTimeout(resolve, 100)); // Increased timeout
    });

    expect(result1.current[0]).toBe("newValue");
    expect(result2.current[0]).toBe("newValue");
  });

  it("should handle function-based state updates correctly", async () => {
    const { result } = renderHook(() => useSyncedStorage("testKey", 0));

    await act(async () => {
      await result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(1);

    await act(async () => {
      await result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("should handle errors when reading from storage", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("Storage error");
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("initialValue");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error reading from storage:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it("should integrate with useCodeSpace hook", async () => {
    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");

    // Check if BroadcastChannel message includes the codespace
    const broadcastChannel = BroadcastChannelMock.channels["storage_sync"];
    expect(broadcastChannel).toBeDefined();
    expect(broadcastChannel.listeners.length).toBeGreaterThan(0);

    const mockMessage = { type: "update_testKey-test-codespace", value: "updatedValue" };
    broadcastChannel.listeners[0]({ data: mockMessage } as MessageEvent);

    expect(result.current[0]).toBe("updatedValue");
  });
});
