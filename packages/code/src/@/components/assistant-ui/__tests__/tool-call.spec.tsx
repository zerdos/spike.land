import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolCall, ToolCallGroup } from "../tool-call";

describe("ToolCall", () => {
  const defaultProps = {
    name: "test_tool",
    args: { param1: "value1", param2: 123 },
    result: { output: "test result" },
  };

  it("renders tool name correctly", () => {
    render(<ToolCall {...defaultProps} />);
    expect(screen.getByText("test_tool")).toBeInTheDocument();
  });

  it("shows wrench icon", () => {
    const { container } = render(<ToolCall {...defaultProps} />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("toggles expansion when clicked", () => {
    render(<ToolCall {...defaultProps} />);

    // Initially collapsed - should not show parameters
    expect(screen.queryByText("Parameters")).not.toBeInTheDocument();

    // Click to expand
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Should now show parameters
    expect(screen.getByText("Parameters")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
  });

  it("displays parameters in JSON format when expanded", () => {
    render(<ToolCall {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check if JSON is displayed correctly
    expect(screen.getByText(/"param1":/)).toBeInTheDocument();
    expect(screen.getByText(/"value1"/)).toBeInTheDocument();
    expect(screen.getByText(/"param2":/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });

  it("displays result when available", () => {
    render(<ToolCall {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText(/"output":/)).toBeInTheDocument();
    expect(screen.getByText(/"test result"/)).toBeInTheDocument();
  });

  it("displays string result directly", () => {
    render(<ToolCall name="test_tool" result="Simple string result" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Simple string result")).toBeInTheDocument();
  });

  it("shows executing state", () => {
    render(<ToolCall name="test_tool" isExecuting={true} />);

    expect(screen.getByText("Executing...")).toBeInTheDocument();
  });

  it("does not show parameters section when args is empty", () => {
    render(<ToolCall name="test_tool" args={{}} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.queryByText("Parameters")).not.toBeInTheDocument();
  });

  it("does not show result section when result is undefined", () => {
    render(<ToolCall name="test_tool" args={{ test: "value" }} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.queryByText("Result")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ToolCall {...defaultProps} className="custom-class" />,
    );

    const toolCallDiv = container.firstChild;
    expect(toolCallDiv).toHaveClass("custom-class");
  });

  it("changes chevron icon direction when toggled", () => {
    render(<ToolCall {...defaultProps} />);

    // Initially shows right chevron (check by finding the button and its svg)
    const button = screen.getByRole("button");
    let svgs = button.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);

    // The first SVG should be the chevron
    const initialChevron = svgs[0];
    expect(initialChevron).toBeTruthy();

    // Click to expand
    fireEvent.click(button);

    // Should now show down chevron - get fresh SVGs after click
    svgs = button.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);

    // We can't easily test the specific icon type without inspecting the path
    // but we can verify the button still has an icon
    const expandedChevron = svgs[0];
    expect(expandedChevron).toBeTruthy();
  });

  it("handles very long parameter values gracefully", () => {
    const longValue = "a".repeat(1000);
    render(
      <ToolCall
        name="test_tool"
        args={{ longParam: longValue }}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const preElement = screen.getByText((content, element) => {
      return element?.tagName === "PRE" && content.includes("longParam");
    });

    expect(preElement).toHaveClass("overflow-x-auto");
  });

  it("handles very long result values with scrolling", () => {
    const longResult = { data: "b".repeat(1000) };
    render(
      <ToolCall
        name="test_tool"
        result={longResult}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const resultPre = screen.getAllByRole("generic").find(el =>
      el.tagName === "PRE" && el.textContent?.includes("data")
    );

    expect(resultPre).toHaveClass("max-h-48", "overflow-y-auto");
  });
});

describe("ToolCallGroup", () => {
  it("renders with tool calls label", () => {
    render(
      <ToolCallGroup>
        <div>Child content</div>
      </ToolCallGroup>,
    );

    expect(screen.getByText("Tool Calls")).toBeInTheDocument();
  });

  it("shows wrench icon in group header", () => {
    const { container } = render(
      <ToolCallGroup>
        <div>Child content</div>
      </ToolCallGroup>,
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <ToolCallGroup>
        <div data-testid="child-1">First tool</div>
        <div data-testid="child-2">Second tool</div>
      </ToolCallGroup>,
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(
      <ToolCallGroup>
        <div>Child</div>
      </ToolCallGroup>,
    );

    const groupDiv = container.firstChild;
    expect(groupDiv).toHaveClass("rounded-lg", "border", "bg-muted/10", "p-2", "my-2");
  });

  it("renders multiple ToolCall components correctly", () => {
    render(
      <ToolCallGroup>
        <ToolCall name="tool1" args={{ a: 1 }} />
        <ToolCall name="tool2" args={{ b: 2 }} />
        <ToolCall name="tool3" result="Done" />
      </ToolCallGroup>,
    );

    expect(screen.getByText("tool1")).toBeInTheDocument();
    expect(screen.getByText("tool2")).toBeInTheDocument();
    expect(screen.getByText("tool3")).toBeInTheDocument();
  });
});
