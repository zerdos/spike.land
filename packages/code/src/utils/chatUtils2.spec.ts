import { updateSearchReplace } from "@/workers/chat-utils.worker";
import { readFile } from "node:fs/promises";
import { expect, test } from "vitest";

test("should update search replace2", async () => {
  const original = await readFile(__dirname + "/aclock2-orig.txt", "utf8");
  const instructions = await readFile(__dirname + "/inst2.txt", "utf8");

  const r1 = await updateSearchReplace({ instructions, code: original });
  expect(r1.len).toMatchInlineSnapshot(`6663`);

  const v2 = await updateSearchReplace({
    instructions: instructions.slice(r1.len),
    code: r1.result,
  });
  expect(v2.len).toMatchInlineSnapshot(`8154`);

  const v3 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len),
    code: v2.result,
  });
  expect(v3.len).toMatchInlineSnapshot(`1243`);

  expect(v3.result).toMatchSnapshot();
});
