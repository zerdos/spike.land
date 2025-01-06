import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { describe, expect, it } from "vitest";

describe("replacePreservingWhitespace", () => {
  it("1. should replace a word in the middle of a sentence", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The slow brown fox");
  });

  it("2. should preserve leading whitespace", () => {
    const result = replacePreservingWhitespace(
      "   The quick brown fox",
      "The",
      "A",
    );
    expect(result).toEqual("   A quick brown fox");
  });

  it("3. should preserve trailing whitespace", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox   ",
      "fox",
      "cat",
    );
    expect(result).toEqual("The quick brown cat   ");
  });

  it("4. should handle multiple occurrences", () => {
    const result = replacePreservingWhitespace(
      "The quick quick brown quick fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The slow slow brown slow fox");
  });

  it("5. should handle special characters in search string", () => {
    const result = replacePreservingWhitespace(
      "The (quick) brown fox",
      "(quick)",
      "[slow]",
    );
    expect(result).toEqual("The [slow] brown fox");
  });

  it("6. should not replace if search string is not found", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "lazy",
      "energetic",
    );
    expect(result).toEqual("The quick brown fox");
  });

  it("8. should handle empty replace string", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "",
    );
    expect(result).toEqual("The  brown fox");
  });

  it("9. should handle search string with varying whitespace", () => {
    const result = replacePreservingWhitespace(
      "The   quick   brown   fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The   slow   brown   fox");
  });

  it("10. should handle replace string longer than search string", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "very slow",
    );
    expect(result).toEqual("The very slow brown fox");
  });

  it("11. should deal with tricky ones", () => {
    const result = replacePreservingWhitespace(
      `The 
        quick 
        brown 
        fox`,
      "quick brown",
      "very slow",
    );
    expect(result).toEqual(`The 
        very slow 
        fox`);
  });

  it("should replace // .. ", () => {
    const result = replacePreservingWhitespace(
      `    let rotation = 0;

    const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
      // Dark, textured background
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#2C3E50";
      ctx.fill();

      // Add texture
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = \`rgba(0, 0, 0, ${Math.random() * 0.1})\`;
        ctx.beginPath();
        ctx.arc((Math.random() - 0.5) * radius * 2, (Math.random() - 0.5) * radius * 2, Math.random() * 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Rugged border
      ctx.lineWidth = radius * 0.05;
      ctx.strokeStyle = "#34495E";
      ctx.stroke();

      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    };
    const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {`,
      `
        const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
      // ... (rest of the canvas drawing code)
    };
      `,
      `    let rotation = 0;

      const hello = 'world';
      const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {`,
    );
    expect(result).toMatchInlineSnapshot(`
      "    let rotation = 0;

            const hello = 'world';
            const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {"
    `);
  });
});
