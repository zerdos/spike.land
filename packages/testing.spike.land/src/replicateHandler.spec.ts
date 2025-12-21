import { expect, it } from "vitest";
import { parseInputFromUrl } from "../src/replicateHandler";
// const replicatePromise = import('replicate'); // Dynamic import for replicate - not needed here

it("parses input from URL", () => {
  const url =
    "https://example.com/?cfg=4&steps=28&prompt=test&aspect_ratio=16:9&output_format=png&output_quality=80&negative_prompt=&prompt_strength=0.9";

  const input = parseInputFromUrl(url);

  expect(input).toMatchInlineSnapshot(`
    {
      "aspect_ratio": "16:9",
      "cfg": 3.5,
      "negative_prompt": "",
      "output_format": "webp",
      "output_quality": 90,
      "prompt": "a photo of vibrant artistic graffiti on a wall saying "SD3 medium"",
      "prompt_strength": 0.85,
      "steps": 28,
    }
  `);
});
