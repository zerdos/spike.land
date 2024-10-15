import { expect, it } from "vitest";
import { parseInputFromUrl } from "../src/replicateHandler";

it("parses input from URL", () => {
  const url =
    "https://example.com/?cfg=4&steps=30&prompt=test&aspect_ratio=16:9&output_format=png&output_quality=80&negative_prompt=&prompt_strength=0.9";
  const expectedInput = {
    cfg: 4,
    steps: 30,
    prompt: "test",
    aspect_ratio: "16:9",
    output_format: "png",
    output_quality: 80,
    negative_prompt: "",
    prompt_strength: 0.9,
  };

  const input = parseInputFromUrl(url);

  expect(input).toEqual(expectedInput);
});
