import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSyncedStorage } from "./useSyncedStorage";

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
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current[1]("newValue");
      await new Promise(resolve => setTimeout(resolve, 0));
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
      result: "indexedDBValue",
      onsuccess: null as any,
    };

    const mockGet = vi.fn(() => mockGetRequest);
    const mockPut = vi.fn();

    indexedDBMock.open.mockImplementation(() => ({
      result: {
        transaction: vi.fn(() => ({
          objectStore: vi.fn(() => ({
            get: mockGet,
            put: mockPut,
          })),
        })),
      },
      onsuccess: null as any,
    }));

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
      result.current[1]("newIndexedDBValue");
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockPut).toHaveBeenCalledWith({ key: "testKey", value: "newIndexedDBValue" });
  });

  it("should sync values across instances using BroadcastChannel", async () => {
    const { result: result1 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));
    const { result: result2 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      result1.current[1]("newValue");
      await new Promise(resolve => setTimeout(resolve, 100)); // Increase timeout to ensure BroadcastChannel message is processed
    });

    expect(result1.current[0]).toBe("newValue");
    expect(result2.current[0]).toBe("newValue");
  });
});
