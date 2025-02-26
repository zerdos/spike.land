import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import { useLocalStorage } from "@/external/use-local-storage";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the entire module
vi.mock("@/external/use-local-storage", () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn(),
}));

describe("AIBuildingOverlay", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  // test("should render correctly when isStreaming is true", () => {
  //   const { getByTestId } = render(<AIBuildingOverlay codeSpace="aa" />);
  //   expect(getByTestId("ai-building-overlay")).toBeInTheDocument();
  // });

  it("should remember the building state when false", () => {
    const codeSpace = "test";
    vi.mocked(useLocalStorage).mockReturnValue([false, vi.fn()]);
    const { queryByTestId } = render(<AIBuildingOverlay codeSpace="aa" />);
    expect(queryByTestId(`ai-building-overlay-${codeSpace}`)).not
      .toBeInTheDocument();
  });
});
