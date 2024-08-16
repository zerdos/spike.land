import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import type * as Monaco from "monaco-editor";
import AutoSaveHistory from "./AutoSaveHistory";

// Mock the useVirtualizer hook
jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn().mockReturnValue({
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
      createDiffEditor: jest.fn().mockReturnValue({
        setModel: jest.fn(),
        dispose: jest.fn(),
      }),
      createModel: jest.fn(),
    },
  } as unknown as typeof Monaco;

  // Mock the fetch function
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { timestamp: 1625097600000, code: "console.log(\"Version 1\");" },
          { timestamp: 1625184000000, code: "console.log(\"Version 2\");" },
        ]),
    })
  ) as unknown as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <div
        ref={(el) =>
          el
          && (el.getBoundingClientRect = () => ({ height: 1000 } as DOMRect))}
      >
        {ui}
      </div>,
    );
  };

  const mockOnRestore = jest.fn();
  const mockOnClose = (_code: string) => {};

  it("renders loading state initially", async () => {
    renderWithProvider(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={function(): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    await screen.findByText("Loading versions...");
  });

  it("fetches and displays versions", async () => {
    renderWithProvider(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={function(): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    await screen.findByText("Jul 1, 2021, 12:00 AM");
    expect(screen.getByText("Jul 2, 2021, 12:00 AM")).toBeTruthy();
  });

  it("calls onRestore when restore button is clicked", async () => {
    renderWithProvider(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={function(): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    const versionButton = await screen.findByText("Jul 1, 2021, 12:00 AM");
    fireEvent.click(versionButton);
    const restoreButton = await screen.findByText("Restore Selected Version");
    fireEvent.click(restoreButton);
    await waitFor(() => {
      expect(mockOnRestore).toHaveBeenCalledWith("console.log(\"Version 1\");");
    });
  });

  it("calls onClose when close button is clicked", async () => {
    renderWithProvider(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={function(): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    const closeButton = await screen.findByText("Close");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("updates diff editor when a version is selected", async () => {
    renderWithProvider(
      <AutoSaveHistory
        codeSpace="test"
        onRestore={mockOnRestore}
        onClose={function(): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    const versionButton = await screen.findByText("Jul 1, 2021, 12:00 AM");
    fireEvent.click(versionButton);
    await waitFor(() => {
      expect(monaco.editor.createModel).toHaveBeenCalledTimes(2);
      expect(monaco.editor.createDiffEditor).toHaveBeenCalled();
    });
  });
});
