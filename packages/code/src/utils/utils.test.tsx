import { describe, expect, test } from "vitest";
import { getParts } from "@/lib/get-parts";

describe("getParts", () => {
  test("should handle text without code blocks", () => {
    const input = "This is a simple text message.";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "This is a simple text message.",
      },
    ]);
  });

  test("should handle text with a single code block", () => {
    const input = "Here is some code:\n```typescript\nconst x = 5;\nconsole.log(x);\n```";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Here is some code:",
      },
      {
        type: "code",
        language: "typescript",
        content: "const x = 5;\nconsole.log(x);",
      },
    ]);
  });

  test("should handle text with multiple code blocks", () => {
    const input = "First block:\n```javascript\nlet a = 1;\n```\nSecond block:\n```python\nprint(\"Hello\")\n```";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "First block:",
      },
      {
        type: "code",
        language: "javascript",
        content: "let a = 1;",
      },
      {
        type: "text",
        content: "Second block:",
      },
      {
        type: "code",
        language: "python",
        content: "print(\"Hello\")",
      },
    ]);
  });

  test("should handle code blocks with no language specified", () => {
    const input = "Code without language:\n```\nsome code\n```";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Code without language:",
      },
      {
        type: "code",
        language: "plaintext",
        content: "some code",
      },
    ]);
  });

  test("should handle search and replace markers", () => {
    const input = "Before\n<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE\nAfter";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "Before",
      },
      {
        type: "code",
        language: "diff",
        content: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      },
      {
        type: "text",
        content: "After",
      },
    ]);
  });

  test("should handle this scenario", () => {
    const input = `

    <<<<<<< SEARCH
    ctx.font = "bold " + radius * 0.15 + "px SF Pro Display, Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    =======
    ctx.font = radius * 0.15 + "px SF Pro Display, Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    >>>>>>> REPLACE
    
    This change removes the bold font weight and slightly reduces the opacity of the numbers for a more elegant appearance.
    
    5. Adjust the hour markers:
    
    <<<<<<< SEARCH
    ctx.fillRect(x - 2, y - 2, 4, 4);
    =======
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
    >>>>>>> REPLACE
    
    This modification changes the square hour markers to small circles with reduced opacity, creating a more refined look.
    
    `;

    const result = getParts(input, true);
    expect(result).toMatchSnapshot();
  });

  test("should handle multiple search and replace markers", () => {
    const input = `
    first change:
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
    second change:
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b = 4;
      >>>>>>> REPLACE
    `;

    const result = getParts(input, true);
    expect(result).toMatchSnapshot();
  });

  test("should handle multiple search and replace markers2", () => {
    const input = `
    first change:
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
    second change:
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b =
    `;

    const result = getParts(input, true);
    expect(result).toMatchSnapshot();
  });

  test("should handle multiple search and replace markers2", () => {
    const input = `
    first change:
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      =======
    second change:
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b =
    `;

    const result = getParts(input, true);
    expect(result[0].content.trim()).toEqual("first change:");

    expect(result[1].content.trim()).toEqual(
      "<<<<<<< SEARCH\n      const a = 1;\n      =======\n      const a = 2;\n      >>>>>>> REPLACE",
    );
  });

  test("should handle an incomplete code block at the end", () => {
    const input = "Some text\n```javascript\nlet x = 10;";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Some text",
      },
      {
        type: "code",
        language: "javascript",
        content: "let x = 10;",
        isStreaming: true,
      },
    ]);
  });

  test("e2e-2", () => {
    const message = `
    Certainly! I'll make some changes to enhance the elegance of the Apple Watch Pride Clock component. Here are the modifications I suggest:

1. Enhance the background gradient:

<<<<<<< SEARCH
background: linear-gradient(45deg, #ff0000, #ff8d00, #ffee00, #008e00, #004dff, #750086);
background-size: 400% 400%;
animation: gradientBG 15s ease infinite;
=======
background: linear-gradient(45deg, #ff0000, #ff8d00, #ffee00, #008e00, #004dff, #750086);
background-size: 400% 400%;
animation: gradientBG 30s ease infinite;
filter: blur(10px);
opacity: 0.8;
=======
>>>>>>> REPLACE

This change slows down the gradient animation, adds a blur effect, and reduces the opacity for a more subtle and elegant background.

2. Improve the canvas styling:

<<<<<<< SEARCH
background-color: transparent;
border-radius: 22%;
box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
transition: all 0.3s ease;
:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.2);
}
=======
background-color: rgba(0, 0, 0, 0.8);
border-radius: 50%;
box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
transition: all 0.5s ease;
:hover {
  transform: scale(1.03);
  box-shadow: 0 0 60px rgba(255, 255, 255, 0.3);
}
>>>>>>> REPLACE

These changes make the clock face more circular, add a subtle background color, enhance the shadow effect, and make the hover transition smoother.

3. Adjust the pride rings:

<<<<<<< SEARCH
const ringWidth = radius * 0.1;
const startRadius = radius * 0.95;
=======
const ringWidth = radius * 0.08;
const startRadius = radius * 0.97;
>>>>>>> REPLACE

This modification makes the pride rings slightly thinner and positions them closer to the edge of the clock face for a more refined look.

4. Enhance the number styling:

<<<<<<< SEARCH
ctx.font = "bold " + radius * 0.15 + "px SF Pro Display, Arial";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.fillStyle = "#FFFFFF";
=======
ctx.font = radius * 0.15 + "px SF Pro Display, Arial";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
>>>>>>> REPLACE

This change removes the bold font weight and slightly reduces the opacity of the numbers for a more elegant appearance.

5. Adjust the hour markers:

<<<<<<< SEARCH
ctx.fillRect(x - 2, y - 2, 4, 4);
=======
ctx.beginPath();
ctx.arc(x, y, 2, 0, 2 * Math.PI);
ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
ctx.fill();
>>>>>>> REPLACE

This modification changes the square hour markers to small circles with reduced opacity, creating a more refined look.

These changes will make the Apple Watch Pride Clock look more elegant while maintaining its core functionality. The subtle background, refined clock face, and improved styling elements contribute to a more sophisticated appearance.

`;
    const parts = getParts(message, false);

    expect(parts).toMatchSnapshot();

    parts.map( (x: { type: string; content: string | string[]; }) => {
      if (x.type === "text") {
        expect(x.content.includes("<<<<<<< SEARCH")).toBe(false);
      }
    });
  });

  test("e2e", () => {
    const message = `
  I apologize for the oversight. It seems the colors are not visible due to the way they're being generated and applied. Let's fix this issue by making the colors more vibrant and ensuring they're properly displayed. Here are the changes I suggest:

1. Modify the color generation function to create more vibrant colors:

<<<<<<< SEARCH
  const generateNewColors = () => {
  const newColors = Array.from(
      { length: 8 },
      () => zzz
    );
    setPrideColors(newColors);
  };
=======
  const generateNewColors = () => {
    const newColors = [
      '#FF1B8D', // Pink
      '#FF3F00', // Red
      '#FF8E00', // Orange
      '#FFE500', // Yellow
      '#00ED00', // Green
      '#00B3FF', // Light Blue
      '#3D00FF', // Blue
      '#8F00FF', // Purple
    ].sort(() => Math.random() - 0.5);
    setPrideColors(newColors);
  };
=======

This change creates a set of predefined vibrant colors and shuffles them randomly. This ensures that the colors are always visible and vibrant.

2. Adjust the drawPrideRings function to make the rings more prominent:

<<<<<<< SEARCH
    const drawPrideRings = (ctx: CanvasRenderingContext2D, radius: number) => {
      if (prideColors.length === 0) return; // Skip if colors haven't been generated yet
      const ringWidth = radius * 0.06;
      const startRadius = radius * 0.98;
      prideColors.forEach((color, index) => {
        const currentRadius = startRadius - index * (ringWidth / 1.2);
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = ringWidth;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
        // Add texture to rings
        for (let i = 0; i < 50; i++) {
          const ang = Math.random() * Math.PI * 2;
          const x = Math.cos(ang) * currentRadius;
          const y = Math.sin(ang) * currentRadius;
          ctx.fillStyle = rgba(0, 0, 0, 33 * 0.2);
          ctx.fillRect(x, y, 2, 2);
        }
      });
    };
=======
    const drawPrideRings = (ctx: CanvasRenderingContext2D, radius: number) => {
      if (prideColors.length === 0) return; // Skip if colors haven't been generated yet
      const ringWidth = radius * 0.08;
      const startRadius = radius * 0.95;
      prideColors.forEach((color, index) => {
        const currentRadius = startRadius - index * (ringWidth / 1.1);
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = ringWidth;
        ctx.globalAlpha = 1;
        ctx.stroke();
      });
    };
>>>>>>> REPLACE

This change increases the width of the rings, adjusts their positioning, and removes the texture effect that was making them less visible. It also sets the globalAlpha to 1 for full opacity.

3. Update the updateColorsAndClock function to redraw the entire clock when colors change:

<<<<<<< SEARCH
    const updateColorsAndClock = () => {
      generateNewColors();
      updateClock();
    };
=======
    const updateColorsAndClock = () => {
      generateNewColors();
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
      drawClock();
    };
>>>>>>> REPLACE

This change ensures that the entire clock, including the new colors, is redrawn when the colors are updated.

These modifications should make the pride colors clearly visible and change every second as intended. The clock will now display vibrant, shuffling colors that are easy to see against the dark background.

To further improve this feature, you could consider:

1. Adding a transition effect between color changes for a smoother appearance.
2. Allowing users to choose between different color palettes or themes.
3. Optimizing the redraw process to reduce potential flickering on slower devices.
`;

    const parts = getParts(message, false);

    expect(parts).toMatchSnapshot();

    parts.map(x => {
      if (x.type === "text") {
        expect(x.content.includes(">>>>>>> REPLACE")).toBe(false);
      }
    });
  });
});
