import { act, render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import * as sharedModule from "../shared";
import { useTranspile, Wrapper } from "../Wrapper";

jest.mock("../shared", () => ({
  transpile: jest.fn(),
}));

jest.mock("../components/AppRenderer", () => ({
  AppRenderer: () => <div data-testid="mock-app-renderer" />,
}));

jest.mock("../Wrapper", () => ({
  ...jest.requireActual("../Wrapper"),
  useTranspile: jest.fn(),
}));

describe("Wrapper", () => {
  let container: HTMLElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
    }
    container = null;
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Wrapper code="" />, { container: container as HTMLElement });
    });
    expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
  });

  it("calls transpile with correct arguments", async () => {
    const mockTranspile = sharedModule.transpile as jest.MockedFunction<
      typeof sharedModule.transpile
    >;
    mockTranspile.mockResolvedValue("transpiled code");
    (useTranspile as jest.Mock).mockReturnValue("mocked transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, {
        container: container as HTMLElement,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
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
    (useTranspile as jest.Mock).mockReturnValue("mocked transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, {
        container: container as HTMLElement,
      });
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

    let result: string | undefined | null;

    function TestComponent() {
      result = useTranspile("test code");
      return null;
    }

    await act(async () => {
      render(<TestComponent />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(result).toBe("transpiled code");
    });
  });
});
