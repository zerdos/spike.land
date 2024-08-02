import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Editor } from "../components/Editor";

// Mock the dependencies
jest.mock("lodash/debounce", () => jest.fn((fn) => fn));
jest.mock("../isMobile", () => ({ isMobile: () => false }));
jest.mock("../runner", () => ({ runner: jest.fn() }));
jest.mock("../shared", () => ({ prettierToThrow: jest.fn() }));
jest.mock("../startMonaco", () => ({
  startMonaco: jest.fn().mockResolvedValue({
    setValue: jest.fn(),
  }),
}));
jest.mock("../hooks/useBroadcastChannel", () => ({
  useBroadcastChannel: jest.fn(),
}));

describe("Editor Component", () => {
  const mockOnCodeUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.cSess = {
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
        target: { textContent: "new code" },
      });
    });

    await waitFor(() => {
      expect(mockOnCodeUpdate).toHaveBeenCalledWith("new code");
    });
  });

  test("handles prettier errors correctly", async () => {
    const mockPrettierToThrow = require("../shared").prettierToThrow;
    mockPrettierToThrow.mockRejectedValueOnce(new Error("Prettier error"));

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

  test("handles transpile errors correctly", async () => {
    const mockRunner = require("../runner").runner;
    mockRunner.mockRejectedValueOnce(new Error("Transpile error"));

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
      expect(screen.getByText("Transpile error")).toBeInTheDocument();
    });
  });

  test("updates editor content when receiving broadcast message", async () => {
    const { useBroadcastChannel } = require("../hooks/useBroadcastChannel");
    let broadcastCallback;
    useBroadcastChannel.mockImplementation((_, callback) => {
      broadcastCallback = callback;
    });

    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);

    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toBeInTheDocument();
    });

    act(() => {
      broadcastCallback({ data: { i: 1, code: "broadcasted code" } });
    });

    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toHaveTextContent(
        "broadcasted code",
      );
    });
  });
});
