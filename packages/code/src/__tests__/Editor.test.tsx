import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    const { getByTestId } = render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      expect(editorContainer).toHaveTextContent("initial code");
    });
  });

  test("calls onCodeUpdate when code changes", async () => {
    const { getByTestId } = render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      fireEvent.input(editorContainer, { target: { textContent: "new code" } });
    });
    expect(mockOnCodeUpdate).toHaveBeenCalledWith("new code");
  });

  test("handles errors correctly", async () => {
    const mockPrettierToThrow = require("../shared").prettierToThrow;
    mockPrettierToThrow.mockRejectedValueOnce(new Error("Prettier error"));

    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);
    await waitFor(() => {
      expect(screen.getByText("Prettier error")).toBeInTheDocument();
    });
  });
});
