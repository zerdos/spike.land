import type { ICode } from "@/lib/interfaces";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AssistantUIDrawer } from "./assistant-ui-drawer";

// Message interface for tests
interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data" | "tool";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

// Mock fetch
global.fetch = vi.fn();

// Mock AssistantUIChat component
vi.mock("./assistant-ui-chat", () => ({
  AssistantUIChat: vi.fn(({ codeSpace, initialMessages }) => (
    <div data-testid="assistant-ui-chat">
      AssistantUIChat - {codeSpace} - {initialMessages.length} messages
    </div>
  )),
}));

// Mock Drawer from vaul
vi.mock("vaul", () => ({
  Drawer: {
    Root: vi.fn(({ children, open }) => (
      <div data-testid="drawer-root" data-open={open}>
        {children}
      </div>
    )),
    Trigger: vi.fn(({ children, onClick }) => (
      <button data-testid="drawer-trigger" onClick={onClick}>
        {children}
      </button>
    )),
    Portal: vi.fn(({ children }) => <div data-testid="drawer-portal">{children}</div>),
    Overlay: vi.fn(() => <div data-testid="drawer-overlay" />),
    Content: vi.fn(({ children }) => <div data-testid="drawer-content">{children}</div>),
    Title: vi.fn(({ children }) => <h2 data-testid="drawer-title">{children}</h2>),
    Description: vi.fn(({ children }) => <p data-testid="drawer-description">{children}</p>),
  },
}));

describe("AssistantUIDrawer", () => {
  const mockCodeSpace = "test-space";
  const mockCSession: ICode = {
    getCodeSpace: vi.fn(() => mockCodeSpace),
  } as unknown as ICode;

  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as ReturnType<typeof vi.fn>).mockReset();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should render the drawer with trigger button when closed", () => {
    render(
      <AssistantUIDrawer
        isOpen={false}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    expect(screen.getByTestId("drawer-root")).toHaveAttribute("data-open", "false");
    expect(screen.getByTestId("drawer-trigger")).toBeInTheDocument();
  });

  it("should render the drawer content when open", () => {
    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    expect(screen.getByTestId("drawer-root")).toHaveAttribute("data-open", "true");
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("should load messages when drawer opens", async () => {
    const mockMessages: Message[] = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi there" },
    ];

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: mockMessages }),
    } as Response);

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/live/${mockCodeSpace}/messages`);
    });

    await waitFor(() => {
      expect(screen.getByTestId("assistant-ui-chat")).toBeInTheDocument();
      expect(screen.getByTestId("assistant-ui-chat")).toHaveTextContent(
        `AssistantUIChat - ${mockCodeSpace} - 2 messages`,
      );
    });
  });

  it("should show loading state while messages are loading", () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    expect(screen.getByText("Loading messages...")).toBeInTheDocument();
  });

  it("should handle fetch error gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to load messages:",
        expect.any(Error),
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("assistant-ui-chat")).toBeInTheDocument();
      expect(screen.getByTestId("assistant-ui-chat")).toHaveTextContent(
        `AssistantUIChat - ${mockCodeSpace} - 0 messages`,
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should handle non-ok response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("assistant-ui-chat")).toBeInTheDocument();
      expect(screen.getByTestId("assistant-ui-chat")).toHaveTextContent(
        `AssistantUIChat - ${mockCodeSpace} - 0 messages`,
      );
    });
  });

  it("should only load messages once", async () => {
    const mockMessages: Message[] = [
      { id: "1", role: "user", content: "Hello" },
    ];

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ messages: mockMessages }),
    } as Response);

    const { rerender } = render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Rerender with the same props
    rerender(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    // Should not fetch again
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when close button is clicked", async () => {
    const onCloseMock = vi.fn();

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={onCloseMock}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("assistant-ui-chat")).toBeInTheDocument();
    });

    // Find and click the close button (it's the button with the SVG X icon)
    const buttons = screen.getAllByRole("button");
    // The close button is the second button (first is trigger, second is close)
    const closeButton = buttons.find(btn => btn.querySelector('svg path[d*="M12 4L4 12"]'));

    expect(closeButton).toBeDefined();
    if (closeButton) {
      await userEvent.click(closeButton);
    }

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should apply dark mode classes", () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={true}
        cSess={mockCSession}
      />,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should remove dark mode classes when isDarkMode is false", () => {
    document.documentElement.classList.add("dark");

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    } as Response);

    render(
      <AssistantUIDrawer
        isOpen={true}
        onClose={vi.fn()}
        isDarkMode={false}
        cSess={mockCSession}
      />,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("should memoize the component", () => {
    expect(AssistantUIDrawer.displayName).toBe("AssistantUIDrawer");
    expect(typeof AssistantUIDrawer).toBe("object");
    expect("$$typeof" in AssistantUIDrawer).toBe(true);
  });
});
