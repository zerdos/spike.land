import { act, renderHook } from "@testing-library/react-hooks";
import localforage from "localforage";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useSyncedStorage } from "./useSyncedStorage";

// Mock localforage
vi.mock("localforage", () => ({
  default: {
    createInstance: vi.fn(() => ({
      getItem: vi.fn(),
      setItem: vi.fn(),
    })),
  },
}));

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
  const originalBroadcastChannel = globalThis.BroadcastChannel;

  beforeEach(() => {
    vi.resetAllMocks();
    (globalThis as any).BroadcastChannel = BroadcastChannelMock;
    BroadcastChannelMock.channels = {};
  });

  afterEach(() => {
    (globalThis as any).BroadcastChannel = originalBroadcastChannel;
  });

  it("should use the initial value when storage is empty", async () => {
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("initialValue");
  });

  it("should update the value and localforage when setValue is called", async () => {
    const mockSetItem = vi.fn().mockResolvedValue(undefined);
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockResolvedValue(null),
      setItem: mockSetItem,
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(mockSetItem).toHaveBeenCalledWith("testKey", "newValue");
  });

  it("should retrieve the value from localforage if it exists", async () => {
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockResolvedValue("storedValue"),
      setItem: vi.fn().mockResolvedValue(undefined),
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("storedValue");
  });

  it("should sync values across instances using BroadcastChannel", async () => {
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
    });

    const { result: result1 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));
    const { result: result2 } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await result1.current[1]("newValue");
      // Wait for the BroadcastChannel message to be processed
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result1.current[0]).toBe("newValue");
    expect(result2.current[0]).toBe("newValue");
  });

  it("should handle function-based state updates correctly", async () => {
    const mockSetItem = vi.fn().mockResolvedValue(undefined);
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockResolvedValue(0),
      setItem: mockSetItem,
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", 0));

    await act(async () => {
      await result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(mockSetItem).toHaveBeenCalledWith("testKey", 1);

    await act(async () => {
      await result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(mockSetItem).toHaveBeenCalledWith("testKey", 2);
  });

  it("should handle errors when reading from storage", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (localforage.createInstance as Mock).mockReturnValue({
      getItem: vi.fn().mockRejectedValue(new Error("Storage error")),
      setItem: vi.fn().mockResolvedValue(undefined),
    });

    const { result } = renderHook(() => useSyncedStorage("testKey", "initialValue"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("initialValue");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error reading from storage:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  // it("should handle errors when setting a value in storage", async () => {
  //   const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  //   const mockGetItem = vi.fn().mockResolvedValue("initialValue");
  //   const mockSetItem = vi.fn().mockRejectedValue(new Error("Storage error"));
  //   (localforage.createInstance as jest.Mock).mockReturnValue({
  //     getItem: mockGetItem,
  //     setItem: mockSetItem,
  //   });

  //   const { result, waitForNextUpdate } = renderHook(() => useSyncedStorage("testKey", "defaultValue"));

  //   // Wait for the initial value to be set
  //   await waitForNextUpdate();

  //   expect(result.current[0]).toBe("initialValue");
  //   expect(mockGetItem).toHaveBeenCalledWith("testKey");

  //   await act(async () => {
  //     await result.current[1]("newValue");
  //   });

  //   expect(result.current[0]).toBe("initialValue"); // The state should not update if there's an error
  //   expect(mockSetItem).toHaveBeenCalledWith("testKey", "newValue");
  //   expect(consoleErrorSpy).toHaveBeenCalledWith("Error writing to storage:", expect.any(Error));

  //   consoleErrorSpy.mockRestore();
  // });
});
