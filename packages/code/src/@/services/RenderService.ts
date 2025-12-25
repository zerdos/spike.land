import type { RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { Mutex } from "async-mutex";

/**
 * Result structure for rendered HTML and CSS content.
 */
export interface RenderResult {
  css: string;
  html: string;
}

/**
 * Options for updating the rendered application.
 */
export interface UpdateRenderedAppOptions {
  transpiled: string;
}

/**
 * Service responsible for rendering React components and extracting their HTML/CSS output.
 * Manages the render lifecycle including DOM element creation, app rendering, and style extraction.
 */
export class RenderService {
  private rendered: RenderedApp | null = null;
  private renderedMd5: string = "";
  private readonly mutex: Mutex = new Mutex();
  private readonly codeSpace: string;

  /**
   * Creates a new RenderService instance.
   * @param codeSpace - The namespace identifier for the code being rendered
   */
  constructor(codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  /**
   * Updates the rendered application with new transpiled code.
   * Uses mutex to ensure only one render operation occurs at a time.
   * @param options - Options containing the transpiled code
   * @returns The rendered application instance or null if unchanged
   */
  public async updateRenderedApp(
    { transpiled }: UpdateRenderedAppOptions,
  ): Promise<RenderedApp | null> {
    let hashed = md5(transpiled);
    if (hashed === this.renderedMd5 && !transpiled.includes(`cn("`)) {
      console.warn("Skipping update as md5 is the same"); // Changed to console.warn
      return this.rendered;
    } else if (transpiled.includes(`cn("`)) {
      const cnArr = transpiled.split(`cn("`);
      for (let i = 1; i < cnArr.length; i++) {
        if (cnArr[i]) {
          cnArr[i] = cnArr[i]!.split(" ").join("  ");
        }
      }
      transpiled = cnArr.join(`cn( "`);
      hashed = md5(transpiled);
    }

    this.renderedMd5 = hashed;
    // console.warn("Updating rendered app...");

    await this.mutex.runExclusive(async () => {
      const myEl = document.createElement("div");
      document.body.appendChild(myEl);

      this.cleanup();

      const { renderApp } = await import("@/external/render-app");
      this.rendered = await renderApp({
        transpiled,
        codeSpace: this.codeSpace,
        rootElement: myEl,
        App: undefined, // Add missing optional properties
        code: undefined, // Add missing optional properties
      });

      document.getElementById("embed")?.replaceWith(myEl);
      document.getElementById("embed")?.remove();
      myEl.id = "embed";
    });

    return this.rendered;
  }

  /**
   * Processes a rendered application and extracts the HTML content and CSS styles.
   * Collects styles from Emotion cache and Tailwind CSS in the document head.
   * @param renderedNew - The rendered application instance or null
   * @returns The extracted HTML and CSS content, or false on failure
   */
  public async handleRender(
    renderedNew: RenderedApp | null,
  ): Promise<RenderResult | false> {
    if (renderedNew === null) {
      return {
        css: "",
        html: "",
      };
    }

    const { cssCache, rootElement } = renderedNew;

    const html = this.htmlDecode(rootElement.innerHTML).split(cssCache.key)
      .join("x");
    const emotionGlobalStyles = Array.from(
      document.querySelectorAll<HTMLStyleElement>( // Changed to Array.from and removed .values()
        `style[data-emotion='${cssCache.key}-global']`,
      ),
    )
      .map((x) =>
        (x.sheet
          ? Array.from(x.sheet.cssRules).map((rule: CSSRule) => rule.cssText)
          : [])
          .join("\n")
      ); // Added type CSSRule for inner x

    const emotionStyles = [
      ...emotionGlobalStyles,
      ...[...cssCache.sheet.tags].map((
        tag: HTMLStyleElement,
      ) => (tag.sheet
        ? Array.from(tag.sheet.cssRules).map((rule: CSSRule) => rule.cssText)
        : [])
      )
        .flat(), // Changed to Array.from and added type CSSRule
    ].join("\n")
      .split(cssCache.key).join("x");

    // console.warn("Emotion styles:", emotionStyles); // This can be very verbose, changed to a conditional log or removed if not essential for common debugging

    const tailWindClasses = Array.from(
      document.querySelectorAll<HTMLStyleElement>("head > style"),
    ) // Changed to Array.from
      .map(
        (z) => z.innerHTML,
      ).join("\n");

    const tailWindClassesXWithoutComments = tailWindClasses.replace(
      /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,
      "",
    );
    const tailWindClassesX = tailWindClassesXWithoutComments.split(`\\\\[`)
      .join(`\\[`).split(
        `\\\\]`,
      ).join(`\\]`);

    const cssStrings = [emotionStyles, tailWindClassesX].join("\n");

    return {
      css: cssStrings,
      html,
    };
  }

  /**
   * Cleans up the current rendered application and releases resources.
   * Calls the cleanup method on the rendered app and nullifies the reference.
   */
  public cleanup(): void {
    this.rendered?.cleanup();
    this.rendered = null;
  }

  private htmlDecode(input: string): string {
    return input
      .split("><").join(">\n<")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, " ");
  }
}
