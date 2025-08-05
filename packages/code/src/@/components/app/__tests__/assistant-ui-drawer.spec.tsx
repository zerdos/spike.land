import { AssistantUIChat } from "@/components/app/assistant-ui-chat";
import { AssistantUIDrawer } from "@/components/app/assistant-ui-drawer";
import type { ICode, ImageData } from "@/lib/interfaces";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Message } from "ai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/components/app/assistant-ui-chat", () => ({
  AssistantUIChat: vi.fn(() => <div>Mocked AssistantUIChat</div>),
}));
vi.mock("vaul", () => ({
  Drawer: {
    Root: ({ children, open }: { children: React.ReactNode; open: boolean; }) =>
      open ? <div data-testid="drawer-root">{children}</div> : null,
    Trigger: ({ children, onClick }: { children: React.ReactNode; onClick: () => void; }) => (
      <button onClick={onClick} data-testid="drawer-trigger">
        {children}
      </button>
    ),
    Portal: ({ children }: { children: React.ReactNode; }) => (
      <div data-testid="drawer-portal">{children}</div>
    ),
    Overlay: () => <div data-testid="drawer-overlay" />,
    Content: ({ children, className }: { children: React.ReactNode; className?: string; }) => (
      <div data-testid="drawer-content" className={className}>{children}</div>
    ),
    Title: ({ children }: { children: React.ReactNode; }) => (
      <h2 data-testid="drawer-title">{children}</h2>
    ),
    Description: ({ children }: { children: React.ReactNode; }) => (
      <p data-testid="drawer-description">{children}</p>
    ),
  },
}));

// Mock global fetch
global.fetch = vi.fn();

// Mock ICode interface
const createMockCodeSession = (codeSpace = "test-space"): ICode => ({
  getCodeSpace: vi.fn().mockReturnValue(codeSpace),
  getSession: vi.fn().mockResolvedValue({}),
} as unknown as ICode);

describe("AssistantUIDrawer", () => {
  let mockCodeSession: ICode;

  const getDefaultProps = () => ({
    isOpen: true,
    onClose: vi.fn(),
    isDarkMode: false,
    cSess: mockCodeSession,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockCodeSession = createMockCodeSession();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <AssistantUIDrawer {...getDefaultProps()} isOpen={false} />,
    );

    expect(container.querySelector('[data-testid="drawer-root"]')).toBeNull();
  });

  it("should render drawer when isOpen is true", () => {
    render(<AssistantUIDrawer {...getDefaultProps()} />);

    expect(screen.getByTestId("drawer-root")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("should load messages when drawer opens", async () => {
    const mockMessages: Message[] = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi there!" },
    ];

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: mockMessages }),
    } as Response);

    render(<AssistantUIDrawer {...getDefaultProps()} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/live/test-space/messages");
    });

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.codeSpace).toBe("test-space");
      expect(callArgs.initialMessages).toEqual(mockMessages);
      expect(callArgs.initialPrompt).toBeUndefined();
    });
  });

  it("should pass initial prompt to AssistantUIChat", async () => {
    const mockInitialPrompt = {
      prompt: "Create a calculator app",
      images: [
        {
          src: "data:image/png;base64,test",
          imageName: "mockup.png",
          url: "http://example.com/mockup.png",
          mediaType: "image/png",
          data: "test",
          type: "image",
        },
      ] as ImageData[],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(<AssistantUIDrawer {...getDefaultProps()} initialPrompt={mockInitialPrompt} />);

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialPrompt).toEqual(mockInitialPrompt);
    });
  });

  it("should handle fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    render(<AssistantUIDrawer {...getDefaultProps()} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to load messages:",
        expect.any(Error),
      );
    });

    // Should still render with empty messages
    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialMessages).toEqual([]);
    });

    consoleSpy.mockRestore();
  });

  it("should handle non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    render(<AssistantUIDrawer {...getDefaultProps()} />);

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialMessages).toEqual([]);
    });
  });

  it("should apply dark mode classes correctly", () => {
    render(<AssistantUIDrawer {...getDefaultProps()} isDarkMode={true} />);

    const content = screen.getByTestId("drawer-content");
    expect(content.className).toContain("bg-gray-800");
    expect(content.className).toContain("text-white");
  });

  it("should apply light mode classes correctly", () => {
    render(<AssistantUIDrawer {...getDefaultProps()} isDarkMode={false} />);

    const content = screen.getByTestId("drawer-content");
    expect(content.className).toContain("bg-gray-100");
    expect(content.className).toContain("text-gray-800");
  });

  it("should sync dark mode with document", () => {
    const { rerender } = render(<AssistantUIDrawer {...getDefaultProps()} isDarkMode={false} />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    rerender(<AssistantUIDrawer {...getDefaultProps()} isDarkMode={true} />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should call onClose when close button is clicked", async () => {
    const onCloseMock = vi.fn();
    render(<AssistantUIDrawer {...getDefaultProps()} onClose={onCloseMock} />);

    // Find the close button (the second button in the drawer)
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons.find(button =>
      button.className.includes("p-2 rounded-lg hover:bg-gray-200")
    );

    if (closeButton) {
      await userEvent.click(closeButton);
      expect(onCloseMock).toHaveBeenCalled();
    } else {
      throw new Error("Close button not found");
    }
  });

  it("should render loading state while messages are being fetched", () => {
    vi.mocked(fetch).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(<AssistantUIDrawer {...getDefaultProps()} />);

    expect(screen.getByText("Loading messages...")).toBeInTheDocument();
    expect(AssistantUIChat).not.toHaveBeenCalled();
  });

  it("should only load messages once when drawer is kept open", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    const { rerender } = render(<AssistantUIDrawer {...getDefaultProps()} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Re-render with same props
    rerender(<AssistantUIDrawer {...getDefaultProps()} />);

    // Should not fetch again
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle null initial prompt correctly", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(<AssistantUIDrawer {...getDefaultProps()} initialPrompt={null} />);

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialPrompt).toBeNull();
    });
  });

  it("should handle undefined initial prompt correctly", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(<AssistantUIDrawer {...getDefaultProps()} initialPrompt={undefined} />);

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalled();
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialPrompt).toBeUndefined();
    });
  });

  it("should reload messages when drawer is closed and reopened", async () => {
    const firstMessages: Message[] = [
      { id: "1", role: "user", content: "First message" },
    ];
    const secondMessages: Message[] = [
      { id: "1", role: "user", content: "First message" },
      { id: "2", role: "assistant", content: "Response" },
      { id: "3", role: "user", content: "Second message" },
    ];

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: firstMessages }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: secondMessages }),
      } as Response);

    // First render with drawer open
    const { rerender } = render(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/live/test-space/messages");
    });

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalledTimes(1);
      const callArgs = (AssistantUIChat as any).mock.calls[0][0];
      expect(callArgs.initialMessages).toEqual(firstMessages);
    });

    // Close the drawer
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={false} />);

    // Clear previous mock calls
    vi.mocked(AssistantUIChat).mockClear();

    // Reopen the drawer
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    // Should fetch messages again
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenLastCalledWith("/live/test-space/messages");
    });

    await waitFor(() => {
      // AssistantUIChat might be called more than once due to React's rendering behavior
      expect(AssistantUIChat).toHaveBeenCalled();
      const lastCall =
        (AssistantUIChat as any).mock.calls[(AssistantUIChat as any).mock.calls.length - 1][0];
      expect(lastCall.initialMessages).toEqual(secondMessages);
    });
  });

  it("should show loading state each time drawer reopens", async () => {
    let resolveFirstFetch: (value: Response) => void;
    let resolveSecondFetch: (value: Response) => void;

    const firstFetchPromise = new Promise<Response>((resolve) => {
      resolveFirstFetch = resolve;
    });
    const secondFetchPromise = new Promise<Response>((resolve) => {
      resolveSecondFetch = resolve;
    });

    vi.mocked(fetch)
      .mockReturnValueOnce(firstFetchPromise as Promise<Response>)
      .mockReturnValueOnce(secondFetchPromise as Promise<Response>);

    // First render with drawer open
    const { rerender } = render(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    // Should show loading state
    expect(screen.getByText("Loading messages...")).toBeInTheDocument();

    // Resolve first fetch
    resolveFirstFetch!({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    await waitFor(() => {
      expect(screen.queryByText("Loading messages...")).not.toBeInTheDocument();
      expect(AssistantUIChat).toHaveBeenCalledTimes(1);
    });

    // Close and reopen
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={false} />);
    vi.mocked(AssistantUIChat).mockClear();
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    // Should show loading state again
    expect(screen.getByText("Loading messages...")).toBeInTheDocument();

    // Resolve second fetch
    resolveSecondFetch!({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    await waitFor(() => {
      expect(screen.queryByText("Loading messages...")).not.toBeInTheDocument();
      // AssistantUIChat might be called more than once due to React's rendering behavior
      expect(AssistantUIChat).toHaveBeenCalled();
    });
  });

  it("should remount AssistantUIChat when messages change due to different key", async () => {
    const firstMessages: Message[] = [
      { id: "1", role: "user", content: "First message" },
    ];
    const secondMessages: Message[] = [
      { id: "1", role: "user", content: "First message" },
      { id: "2", role: "assistant", content: "Response" },
    ];

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: firstMessages }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: secondMessages }),
      } as Response);

    const { rerender } = render(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    await waitFor(() => {
      expect(AssistantUIChat).toHaveBeenCalledTimes(1);
    });

    // Store the initial call count
    // const _initialCallCount = vi.mocked(AssistantUIChat).mock.calls.length;

    // Close and reopen with new messages
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={false} />);
    rerender(<AssistantUIDrawer {...getDefaultProps()} isOpen={true} />);

    await waitFor(() => {
      // AssistantUIChat should be called again due to key change
      expect(AssistantUIChat).toHaveBeenCalled();
      const allCalls = (AssistantUIChat as any).mock.calls;
      // Check that the last call has the new messages
      const lastCall = allCalls[allCalls.length - 1][0];
      expect(lastCall.initialMessages).toEqual(secondMessages);
    });
  });
});
