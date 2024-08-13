import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Editor } from "../components/Editor";

vi.mock("lodash/debounce", () => vi.fn((fn) => fn));
vi.mock("../isMobile", () => ({ isMobile: () => false }));
vi.mock("../shared", () => ({ prettierToThrow: vi.fn() }));
vi.mock("../startMonaco", () => ({
  startMonaco: vi.fn().mockResolvedValue({
    setValue: vi.fn(),
  }),
}));
vi.mock("../hooks/useBroadcastChannel", () => ({
  useBroadcastChannel: vi.fn(),
}));

describe("Editor Component", () => {
  const mockOnCodeUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.cSess = {
      session: {
        i: "0",
        code: "initial code",
      },
    };
  });

  test("renders without crashing", async () => {
    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);
    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toBeInTheDocument();
    });
  });

  test("initializes with correct code", async () => {
    const { getByTestId } = render(
      <Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />,
    );
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      expect(editorContainer).toBeInTheDocument();
    });
  });

  test("calls onCodeUpdate when code changes", async () => {
    const { getByTestId } = render(
      <Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />,
    );
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      expect(editorContainer).toBeInTheDocument();
    });

    act(() => {
      fireEvent.input(getByTestId("editor-container"), {
        target: { textContent: "export default ()=><>Yo</>" },
      });
    });

    await waitFor(() => {
      expect(mockOnCodeUpdate).toHaveBeenCalled();
    });
  });

  test("handles prettier errors correctly", async () => {
    const mockPrettierToThrow = vi.fn().mockImplementation(() => {
      throw new Error("Prettier error");
    });
    vi.mocked(import("../shared")).prettierToThrow.mockImplementation(mockPrettierToThrow);

    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);

    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.input(screen.getByTestId("editor-container"), {
        target: { textContent: "invalid code" },
      });
    });

    await waitFor(() => {
      expect(screen.getByText("Prettier error")).toBeInTheDocument();
    });
  });

  test("updates editor content when receiving broadcast message", async () => {
    let broadcastCallback: (event: MessageEvent<any>) => void;

    vi.mocked(import("../hooks/useBroadcastChannel")).useBroadcastChannel.mockImplementation(
      (_, callback: (event: MessageEvent<any>) => void) => {
        broadcastCallback = callback;
      },
    );

    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);

    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toBeInTheDocument();
    });

    act(() => {
      const messageEvent: MessageEvent<any> = { data: { i: 1, code: "broadcasted code" } } as unknown as MessageEvent<
        any
      >;
      broadcastCallback(messageEvent);
    });

    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toHaveTextContent(
        "broadcasted code",
      );
    });
  });
});
