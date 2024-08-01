import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { CodeHistoryCarousel } from "../components/HistoryItems";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { code: "test code 1", timestamp: 1628000000000 },
        { code: "test code 2", timestamp: 1628000100000 },
      ]),
  })
) as jest.Mock;

describe("CodeHistoryCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CodeHistoryCarousel codeSpace="test" />);
  });

  it("fetches and displays history items", async () => {
    render(<CodeHistoryCarousel codeSpace="test" />);

    await waitFor(() => {
      expect(screen.getByText("Version 2")).toBeInTheDocument();
      expect(screen.getByText("Version 1")).toBeInTheDocument();
    });
  });

  it("displays loading state", () => {
    render(<CodeHistoryCarousel codeSpace="test" />);
    expect(screen.getByText("Loading history...")).toBeInTheDocument();
  });

  // Add more tests as needed
});
