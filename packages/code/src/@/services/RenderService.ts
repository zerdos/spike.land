import type { RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { Mutex } from "async-mutex";

export class RenderService {
  private rendered: RenderedApp | null = null;
  private renderedMd5 = "";
  private readonly mutex = new Mutex();
  private readonly codeSpace: string;

  constructor(codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  public async updateRenderedApp(
    { transpiled }: { transpiled: string; },
  ): Promise<RenderedApp | null> {
    let hashed = md5(transpiled);
    if (hashed === this.renderedMd5 && !transpiled.includes(`cn("`)) {
      console.log("Skipping update as md5 is the same");
      return this.rendered;
    } else if (transpiled.includes(`cn("`)) {
      const cnArr = transpiled.split(`cn("`);
      for (let i = 1; i < cnArr.length; i++) {
        cnArr[i] = cnArr[i].split(" ").join("  ");
      }
      transpiled = cnArr.join(`cn( "`);
      hashed = md5(transpiled);
    }

    this.renderedMd5 = hashed;
    // console.log("Updating rendered app...");

    await this.mutex.runExclusive(async () => {
      const myEl = document.createElement("div");
      document.body.appendChild(myEl);

      this.cleanup();

      const { renderApp } = await import("@/external/render-app");
      this.rendered = await renderApp({
        transpiled,
        codeSpace: this.codeSpace,
        rootElement: myEl,
      });

      document.getElementById("embed")?.replaceWith(myEl);
      document.getElementById("embed")?.remove();
      myEl.id = "embed";
    });

    return this.rendered;
  }

  public async handleRender(
    renderedNew: RenderedApp | null,
  ): Promise<{ css: string; html: string; } | false> {
    if (renderedNew === null) {
      return {
        css: "",
        html: "",
      };
    }

    const { cssCache, rootElement } = renderedNew;

    const html = this.htmlDecode(rootElement.innerHTML).split(cssCache.key)
      .join("x");
    const emotionGlobalStyles = [
      ...document.querySelectorAll<HTMLStyleElement>(
        `style[data-emotion='${cssCache.key}-global']`,
      )
        .values(),
    ].map((x) => (Array.from(x.sheet!.cssRules).map((x) => x.cssText)).join("\n"));

    const emotionStyles = [
      ...emotionGlobalStyles,
      ...[...cssCache.sheet.tags].map((
        tag: HTMLStyleElement,
      ) => ([...tag.sheet!.cssRules!].map((x) => x.cssText))).flat(),
    ].join("\n")
      .split(cssCache.key).join("x");

    console.log("Emotion styles:", emotionStyles);

    const tailWindClasses = [
      ...document.querySelectorAll<HTMLStyleElement>("head > style"),
    ].map(
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
