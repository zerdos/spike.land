import type { RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { RenderService } from "@/services/RenderService";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/lib/md5", () => ({
  md5: vi.fn().mockReturnValue("test-hash"),
}));

vi.mock("@/lib/render-app", () => ({
  renderApp: vi.fn().mockImplementation(async ({ rootElement }) => ({
    rootElement,
    cleanup: vi.fn(),
    cssCache: {
      key: "test-key",
      sheet: {
        tags: [
          {
            sheet: {
              cssRules: [{ cssText: ".test-class { color: red; }" }],
            },
          },
        ],
      },
    },
  })),
}));

describe("RenderService", () => {
  let renderService: RenderService;
  let mockElement: HTMLDivElement;

  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  // Mock console before tests
  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  // Restore console after tests
  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    renderService = new RenderService("test-code-space");
    mockElement = document.createElement("div");
    mockElement.id = "embed";
    document.body.appendChild(mockElement);

    // Mock querySelector for emotion styles
    document.querySelectorAll = vi.fn().mockReturnValue([
      {
        sheet: {
          cssRules: [{ cssText: ".global-style { margin: 0; }" }],
        },
      },
    ]);
  });

  it("should skip update when md5 hash matches", async () => {
    const transpiled = "const x = 1;";
    const firstRender = await renderService.updateRenderedApp({ transpiled });
    vi.mocked(md5).mockReturnValueOnce("test-hash"); // Same hash

    const secondRender = await renderService.updateRenderedApp({ transpiled });
    expect(secondRender).toBe(firstRender);
  });

  it("should handle cn function in transpiled code", async () => {
    const transpiled = 'cn("test class")';
    await renderService.updateRenderedApp({ transpiled });

    expect(md5).toHaveBeenCalledWith('cn( "test  class")');
  });

  it("should properly decode HTML entities", async () => {
    const input = "&amp;test&gt;&lt;&quot;&apos;&nbsp;";
    const decoded = renderService["htmlDecode"](input);

    expect(decoded).toBe("&test><\"' ");
  });

  it("should handle render with null input", async () => {
    const result = await renderService.handleRender(null);

    expect(result).toEqual({
      css: "",
      html: "",
    });
  });

  it("should process CSS and HTML from rendered app", async () => {
    const mockRenderedApp = {
      rootElement: document.createElement("div"),
      cssCache: {
        key: "test-key",
        sheet: {
          tags: [
            {
              sheet: {
                cssRules: [{ cssText: ".test-class { color: blue; }" }],
              },
            },
          ],
        },
      },
      cleanup: vi.fn(),
    } as unknown as RenderedApp;

    mockRenderedApp.rootElement.innerHTML = "<div>Test Content</div>";

    const result = await renderService.handleRender(mockRenderedApp);
    expect(result).toBeTruthy();
    if (result) {
      expect(result.html).toContain("Test Content");
      expect(result.css).toContain("test-class");
    }
  });

  it("should cleanup rendered app", async () => {
    const mockCleanup = vi.fn();
    const transpiled = "const x = 1;";

    const { renderApp } = await import("@/lib/render-app");
    vi.mocked(renderApp).mockResolvedValueOnce({
      rootElement: document.createElement("div"),
      cleanup: mockCleanup,
      cssCache: {
        key: "test-key",
        sheet: { tags: [] },
      },
    } as unknown as RenderedApp);

    await renderService.updateRenderedApp({ transpiled });
    renderService.cleanup();

    expect(mockCleanup).toHaveBeenCalled();
  });
});
