import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { AppToRenderNew } from "./AppToRenderNew";

// Mock the components and hooks
vi.mock("../components/Editor", () => ({
  Editor: () => <div data-testid="editor">Editor Component</div>,
}));

vi.mock("../ChatInterface", () => ({
  default: () => <div data-testid="chat-interface">Chat Interface Component</div>,
}));

vi.mock("../components/AutoSaveHistory", () => ({
  CodeHistoryCarousel: () => <div data-testid="code-history">Code History Component</div>,
}));

vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: () => false,
}));

vi.mock("react-resizable-panels", () => ({
  PanelGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="panel-group">{children}</div>,
  Panel: ({ children }: { children: React.ReactNode }) => <div data-testid="panel">{children}</div>,
  PanelResizeHandle: () => <div data-testid="resize-handle">Resize Handle</div>,
}));

vi.mock("@clerk/clerk-react", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SignInButton: () => <div>Sign In</div>,
  UserButton: () => <div>User Button</div>,
}));

vi.mock("../components/Rainbow", () => ({
  RainbowWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("AppToRenderNew", () => {
  it("renders without crashing", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    const panelGroups = screen.getAllByTestId("panel-group");
    expect(panelGroups.length).toBeGreaterThan(0);
  });

  it("contains Editor component", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    expect(screen.getByTestId("editor")).toBeDefined();
  });

  it("contains ChatInterface component", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    expect(screen.getByTestId("chat-interface")).toBeDefined();
  });

  it("contains CodeHistoryCarousel component", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    expect(screen.getByTestId("code-history")).toBeDefined();
  });

  it("contains live preview iframe", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    const iframe = screen.getByTitle("Live Preview");
    expect(iframe).toBeDefined();
    expect(iframe.getAttribute("src")).toBe("/live/test-space/iframe");
  });

  it("contains resizable panels", () => {
    render(<AppToRenderNew codeSpace="test-space" />);
    const resizeHandles = screen.getAllByTestId("resize-handle");
    expect(resizeHandles.length).toBeGreaterThan(0);
  });
});
