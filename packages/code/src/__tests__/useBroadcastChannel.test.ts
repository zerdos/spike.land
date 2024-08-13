import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";

describe("useBroadcastChannel", () => {
  let mockAddEventListener: ReturnType<typeof vi.fn>;
  let mockRemoveEventListener: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockAddEventListener = vi.fn();
    mockRemoveEventListener = vi.fn();

    (globalThis as unknown as { BroadcastChannel: () => {} }).BroadcastChannel = vi.fn().mockImplementation(() => ({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));
  });

  it("creates a BroadcastChannel with the correct name", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = vi.fn();

    renderHook(() => useBroadcastChannel(codeSpace, handleBroadcastMessage));

    expect(
      (globalThis as unknown as { BroadcastChannel: () => {} })
        .BroadcastChannel,
    ).toHaveBeenCalledWith(
      `${location.origin}/live/${codeSpace}/`,
    );
  });

  it("adds event listener for 'message' event", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = vi.fn();

    renderHook(() => useBroadcastChannel(codeSpace, handleBroadcastMessage));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "message",
      handleBroadcastMessage,
    );
  });

  it("removes event listener on cleanup", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = vi.fn();

    const { unmount } = renderHook(() => useBroadcastChannel(codeSpace, handleBroadcastMessage));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "message",
      handleBroadcastMessage,
    );
  });
});
