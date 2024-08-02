import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import * as sharedModule from "../shared";
import { useTranspile, Wrapper } from "../Wrapper";

jest.mock("../shared", () => ({
  transpile: jest.fn(),
}));

jest.mock("../components/AppRenderer", () => ({
  AppRenderer: () => <div data-testid="mock-app-renderer" />,
}));

describe("Wrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Wrapper code="" />);
    expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
  });

  it("calls transpile with correct arguments", async () => {
    const mockTranspile = sharedModule.transpile as jest.MockedFunction<
      typeof sharedModule.transpile
    >;
    mockTranspile.mockResolvedValue("transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />);
    });

    expect(mockTranspile).toHaveBeenCalledWith({
      code: "test code",
      originToUse: window.location.origin,
    });
  });

  it("renders AppRenderer with transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as jest.MockedFunction<
      typeof sharedModule.transpile
    >;
    mockTranspile.mockResolvedValue("transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mock-app-renderer")).toBeInTheDocument();
    });
  });
});

describe("useTranspile", () => {
  it("returns transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as jest.MockedFunction<
      typeof sharedModule.transpile
    >;
    mockTranspile.mockResolvedValue("transpiled code");

    let result: string | undefined;

    function TestComponent() {
      result = useTranspile("test code");
      return null;
    }

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(result).toBe("transpiled code");
    });
  });
});
