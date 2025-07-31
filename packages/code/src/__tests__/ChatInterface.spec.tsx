import { ChatInterface } from "../ChatInterface";
import { AssistantUIDrawer } from "@/components/app/assistant-ui-drawer";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useScreenshot } from "../hooks/useScreenshot";
import { useDictation } from "@/hooks/use-dictation";
<<<<<<< HEAD
import { toast } from "@/hooks/use-toast";
=======
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
import type { ICode, ImageData } from "@/lib/interfaces";
import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";

// Mock dependencies
vi.mock("@/hooks/use-dark-mode");
vi.mock("@/hooks/use-local-storage");
vi.mock("../hooks/useScreenshot");
vi.mock("@/hooks/use-dictation");
<<<<<<< HEAD
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));
=======
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
vi.mock("@/components/app/assistant-ui-drawer", () => ({
  AssistantUIDrawer: vi.fn(() => null),
}));

// Mock ICode interface
const mockCodeSession: ICode = {
  getCodeSpace: vi.fn().mockReturnValue("test-space"),
  getSession: vi.fn().mockResolvedValue({}),
} as unknown as ICode;

describe("ChatInterface", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();

    // Setup default mocks
    (useDarkMode as Mock).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: vi.fn(),
    });

    (useLocalStorage as Mock).mockReturnValue([false, vi.fn()]);

    (useScreenshot as Mock).mockReturnValue({
      isScreenshotLoading: false,
      screenshotImage: null,
      handleScreenshotClick: vi.fn(),
      handleCancelScreenshot: vi.fn(),
    });

    (useDictation as Mock).mockReturnValue(["", vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <ChatInterface
        isOpen={false}
        codeSession={mockCodeSession}
        codeSpace="test-space"
        onClose={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render AssistantUIDrawer when isOpen is true", () => {
    render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSession}
        codeSpace="test-space"
        onClose={vi.fn()}
      />
    );

    expect(AssistantUIDrawer).toHaveBeenCalled();
<<<<<<< HEAD
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0]?.[0];
=======
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0][0];
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
    expect(callArgs.isOpen).toBe(true);
    expect(callArgs.isDarkMode).toBe(false);
    expect(callArgs.cSess).toBe(mockCodeSession);
    expect(callArgs.initialPrompt).toBe(null);
  });

  it("should pass initial prompt from sessionStorage when codeSpace contains a key", async () => {
    const mockPrompt = "Create a todo app";
    const mockImages: ImageData[] = [
      {
        src: "data:image/png;base64,test",
        imageName: "test.png",
<<<<<<< HEAD
        url: "http://example.com/test.png",
        mediaType: "image/png",
        data: "test",
        type: "image",
=======
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
      },
    ];

    const testKey = "abc123";
    const codeSpaceWithKey = `x-${testKey}`;

    // Store data in sessionStorage
    sessionStorage.setItem(
      testKey,
      JSON.stringify({ prompt: mockPrompt, images: mockImages })
    );

    // Mock getCodeSpace to return our test code space
    const mockCodeSessionWithKey = {
      ...mockCodeSession,
      getCodeSpace: vi.fn().mockReturnValue(codeSpaceWithKey),
    };

    const { rerender } = render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSessionWithKey}
        codeSpace={codeSpaceWithKey}
        onClose={vi.fn()}
      />
    );

    // Force re-render to trigger effect
    rerender(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSessionWithKey}
        codeSpace={codeSpaceWithKey}
        onClose={vi.fn()}
      />
    );

    await waitFor(() => {
      const calls = (AssistantUIDrawer as Mock).mock.calls;
<<<<<<< HEAD
      const lastCall = calls[calls.length - 1]?.[0];
=======
      const lastCall = calls[calls.length - 1][0];
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
      expect(lastCall.initialPrompt).toEqual({
        prompt: mockPrompt,
        images: mockImages,
      });
    });

    // Verify sessionStorage was cleared
    expect(sessionStorage.getItem(testKey)).toBeNull();
  });

<<<<<<< HEAD
  it("should handle invalid JSON in sessionStorage gracefully and show toast", async () => {
=======
  it("should handle invalid JSON in sessionStorage gracefully", () => {
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
    const testKey = "invalid123";
    const codeSpaceWithKey = `x-${testKey}`;

    // Store invalid JSON
    sessionStorage.setItem(testKey, "invalid json");

    const mockCodeSessionWithKey = {
      ...mockCodeSession,
      getCodeSpace: vi.fn().mockReturnValue(codeSpaceWithKey),
    };

    // Spy on console.error to suppress error output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Should not throw when rendering
    expect(() => {
      render(
        <ChatInterface
          isOpen={true}
          codeSession={mockCodeSessionWithKey}
          codeSpace={codeSpaceWithKey}
          onClose={vi.fn()}
        />
      );
    }).not.toThrow();

<<<<<<< HEAD
    // Should show toast notification
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Failed to load saved prompt",
        description: "The saved prompt data was corrupted and could not be loaded.",
        variant: "destructive",
      });
    });

    // Should still render with null initial prompt
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0]?.[0];
    expect(callArgs.initialPrompt).toBe(null);

    // Verify sessionStorage was cleared
    expect(sessionStorage.getItem(testKey)).toBeNull();

=======
    // Should still render with null initial prompt
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0][0];
    expect(callArgs.initialPrompt).toBe(null);

>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
    consoleSpy.mockRestore();
  });

  it("should not set initial prompt when codeSpace does not contain a key", () => {
    render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSession}
        codeSpace="regular-space"
        onClose={vi.fn()}
      />
    );

<<<<<<< HEAD
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0]?.[0];
=======
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0][0];
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
    expect(callArgs.initialPrompt).toBe(null);
  });

  it("should handle streaming state timeout", async () => {
    vi.useFakeTimers();
    const setIsStreamingMock = vi.fn();
    (useLocalStorage as Mock).mockReturnValue([true, setIsStreamingMock]);

    render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSession}
        codeSpace="test-space"
        onClose={vi.fn()}
      />
    );

    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);

    expect(setIsStreamingMock).toHaveBeenCalledWith(false);

    vi.useRealTimers();
  });

  it("should scroll to bottom when opened", async () => {
    const scrollIntoViewMock = vi.fn();
    const getElementByIdMock = vi.fn().mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    });
    document.getElementById = getElementByIdMock;

    render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSession}
        codeSpace="test-space"
        onClose={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(getElementByIdMock).toHaveBeenCalledWith("after-last-message");
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: "instant",
        block: "end",
      });
    });
  });

  it("should pass through onClose callback", () => {
    const onCloseMock = vi.fn();

    render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSession}
        codeSpace="test-space"
        onClose={onCloseMock}
      />
    );

<<<<<<< HEAD
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0]?.[0];
=======
    const callArgs = (AssistantUIDrawer as Mock).mock.calls[0][0];
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
    expect(callArgs.onClose).toBe(onCloseMock);
  });

  it("should handle empty prompt and images from sessionStorage", async () => {
    const testKey = "empty123";
    const codeSpaceWithKey = `x-${testKey}`;

    // Store empty data
    sessionStorage.setItem(
      testKey,
      JSON.stringify({ prompt: "", images: [] })
    );

    const mockCodeSessionWithKey = {
      ...mockCodeSession,
      getCodeSpace: vi.fn().mockReturnValue(codeSpaceWithKey),
    };

    const { rerender } = render(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSessionWithKey}
        codeSpace={codeSpaceWithKey}
        onClose={vi.fn()}
      />
    );

    // Force re-render to trigger effect
    rerender(
      <ChatInterface
        isOpen={true}
        codeSession={mockCodeSessionWithKey}
        codeSpace={codeSpaceWithKey}
        onClose={vi.fn()}
      />
    );

    await waitFor(() => {
      const calls = (AssistantUIDrawer as Mock).mock.calls;
<<<<<<< HEAD
      const lastCall = calls[calls.length - 1]?.[0];
=======
      const lastCall = calls[calls.length - 1][0];
>>>>>>> 06dcd6226 (feat: integrate start-with-prompt to send first message in chat)
      expect(lastCall.initialPrompt).toEqual({
        prompt: "",
        images: [],
      });
    });
  });
});