import { renderHook } from "@testing-library/react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";

describe("useBroadcastChannel", () => {
  let mockAddEventListener: jest.Mock;
  let mockRemoveEventListener: jest.Mock;

  beforeEach(() => {
    mockAddEventListener = jest.fn();
    mockRemoveEventListener = jest.fn();

    (globalThis as unknown as {BroadcastChannel: ()=>{}} ).BroadcastChannel = jest.fn().mockImplementation(() => ({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));
  });

  test("creates a BroadcastChannel with the correct name", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = jest.fn();

    renderHook(() => useBroadcastChannel(codeSpace, handleBroadcastMessage));

    expect((globalThis as unknown as {BroadcastChannel: ()=>{}} ).BroadcastChannel).toHaveBeenCalledWith(
      `${location.origin}/live/${codeSpace}/`,
    );
  });

  test("adds event listener for 'message' event", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = jest.fn();

    renderHook(() => useBroadcastChannel(codeSpace, handleBroadcastMessage));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "message",
      handleBroadcastMessage,
    );
  });

  test("removes event listener on cleanup", () => {
    const codeSpace = "test-code-space";
    const handleBroadcastMessage = jest.fn();

    const { unmount } = renderHook(() =>
      useBroadcastChannel(codeSpace, handleBroadcastMessage)
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "message",
      handleBroadcastMessage,
    );
  });
});
