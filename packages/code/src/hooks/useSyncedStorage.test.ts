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
const indexedDBMock = (() => {
  let db: { [key: string]: any } = {};
  return {
    open: vi.fn(() => ({
      result: {
        transaction: vi.fn(() => ({
          objectStore: vi.fn(() => ({
            get: vi.fn((key: string) => ({
              result: db[key],
              onsuccess: null,
            })),
            put: vi.fn((value: any) => {
              db[value.key] = value.value;
              return { onsuccess: null };
            }),
          })),
        })),
      },
      onsuccess: null,
      onupgradeneeded: null,
    })),
  };
})();

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

  // it("should use IndexedDB in worker environments", async () => {
  //   Object.defineProperty(window, "localStorage", { value: undefined, writable: true });

  //   const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

  //   await act(async () => {
  //     // Simulate IndexedDB open success
  //     indexedDBMock.open.mock.results[0].value.onsuccess?.({} as Event);
  //     await new Promise(resolve => setTimeout(resolve, 0));
  //   });

  //   expect(result.current[0]).toBe("initialValue");

  //   await act(async () => {
  //     await result.current[1]("newIndexedDBValue");
  //   });

  //   expect(indexedDBMock.open().result.transaction().objectStore().put).toHaveBeenCalledWith({
  //     key: "testKey",
  //     value: "newIndexedDBValue",
  //   });
  // });

  // it("should sync values across instances using BroadcastChannel", async () => {
  //   const { result: result1 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));
  //   const { result: result2 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

  //   await act(async () => {
  //     await result1.current[1]("newValue");
  //     // Wait for the BroadcastChannel message to be processed
  //     await new Promise(resolve => setTimeout(resolve, 100));
  //   });

  //   expect(result1.current[0]).toBe("newValue");
  //   expect(result2.current[0]).toBe("newValue");
  // });

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

  it("should handle errors when setting a value in storage", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("Storage error");
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue"); // The local state should still update
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error writing to storage:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  // it("should handle when no suitable storage backend is available", async () => {
  //   Object.defineProperty(window, "localStorage", { value: undefined, writable: true });
  //   (globalThis as any).indexedDB = undefined;

  //   const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  //   const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

  //   await act(async () => {
  //     await new Promise(resolve => setTimeout(resolve, 0));
  //   });

  //   expect(result.current[0]).toBe("initialValue");
  //   expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to initialize storage backend:", expect.any(Error));

  //   consoleErrorSpy.mockRestore();
  // });
});
