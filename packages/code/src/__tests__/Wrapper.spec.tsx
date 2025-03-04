import { Wrapper } from "@/components/app/wrapper";
import type * as WapMod from "@/components/app/wrapper";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/shared", () => {
  const mockRpc = {
    rpc: vi.fn().mockResolvedValue("mocked transpiled code"),
    signal: vi.fn(),
  };

  const mockWorkerWrapper = {
    rpc: mockRpc,
    busy: false,
    tag: "default",
  };

  const mockWorkerPool = {
    getWorker: vi.fn().mockReturnValue(mockWorkerWrapper),
    releaseWorker: vi.fn(),
  };

  return {
    transpile: vi.fn().mockResolvedValue("mocked transpiled code"),
    WorkerPool: vi.fn().mockImplementation(() => mockWorkerPool),
    WorkerWrapper: vi.fn().mockImplementation(() => mockWorkerWrapper),
  };
});

vi.mock("@external/responsive", () => ({
  ParentSize: (
    { children }: {
      children: (props: { width: number; height: number; }) => React.ReactNode;
    },
  ) => children({ width: 100, height: 100 }),
}));

// Mock the useTranspile hook
vi.mock("@/components/app/wrapper", async () => {
  const actualModule = await vi.importActual<typeof WapMod>(
    "@/components/app/wrapper",
  );
  return {
    ...actualModule,
    useTranspile: vi.fn().mockImplementation((code: string | undefined) => {
      if (code === undefined) return null;
      return Promise.resolve("mocked transpiled code");
    }),
  };
});

describe("Wrapper", () => {
  let container: HTMLElement;
  URL.createObjectURL = vi.fn();

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Wrapper code="export default ()=><>Test</>" />, { container });
    });

    await waitFor(() => {
      expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);
});
