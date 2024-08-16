import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type * as Monaco from "monaco-editor";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AutoSaveHistory from "./AutoSaveHistory";

// Mock the useVirtualizer hook
vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: vi.fn().mockReturnValue({
    getVirtualItems: () => [
      { index: 0, key: "0", size: 150, start: 0 },
      { index: 1, key: "1", size: 150, start: 150 },
    ],
    getTotalSize: () => 300,
  }),
}));

describe("AutoSaveHistory", () => {
  const monaco = (globalThis as unknown as { monaco: typeof Monaco }).monaco = {
    editor: {
      createDiffEditor: vi.fn().mockReturnValue({
        setModel: vi.fn(),
        dispose: vi.fn(),
      }),
      createModel: vi.fn(),
    },
  } as unknown as typeof Monaco;

  // Mock the fetch function
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { timestamp: 1625097600000, code: "console.log(\"Version 1\");" },
          { timestamp: 1625184000000, code: "console.log(\"Version 2\");" },
        ]),
    })
  ) as unknown as typeof fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockOnRestore = vi.fn();
  const mockOnClose = vi.fn();

  it("calls onRestore when restore button is clicked", async () => {
    render(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={mockOnClose}
      />,
    );
    await waitFor(() => {
      expect(screen.getByText("Jul 2, 2021, 1:00:00 AM")).toBeInTheDocument();
    });
    const restoreButtons = screen.getAllByText("Restore");
    fireEvent.click(restoreButtons[0]);
    await waitFor(() => {
      expect(mockOnRestore).toHaveBeenCalledWith({
        code: "console.log(\"Version 2\");",
        timestamp: 1625184000000,
      });
    });
  });

  it("calls onClose when close button is clicked", async () => {
    render(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={mockOnClose}
      />,
    );
    const closeButton = await screen.findByText("Close");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
