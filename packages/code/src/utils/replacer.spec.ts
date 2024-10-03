import { updateSearchReplace } from "@/workers/chat-utils.worker";
import { readFile } from "node:fs/promises";
import { expect, test } from "vitest";

test("should update search replace", async () => {
  const original = await readFile(__dirname + "/landing-orig.txt", "utf8");
  const instructions = await readFile(__dirname + "/landing-inst.txt", "utf8");

  const r1 = await updateSearchReplace({ instructions, code: original });
  expect(r1.len).toMatchInlineSnapshot(`910`);

  const v2 = await updateSearchReplace({ instructions: instructions.slice(r1.len), code: r1.result });
  expect(v2.len).toMatchInlineSnapshot(`144`);

  const v3 = await updateSearchReplace({ instructions: instructions.slice(r1.len + v2.len), code: v2.result });
  expect(v3.len).toMatchInlineSnapshot(`170`);

  const v4 = await updateSearchReplace({ instructions: instructions.slice(r1.len + v2.len + v3.len), code: v3.result });
  expect(v4.len).toMatchInlineSnapshot(`4611`);

  const v5 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len),
    code: v4.result,
  });
  expect(v5.len).toMatchInlineSnapshot(`411`);

  const v6 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len + v5.len),
    code: v5.result,
  });
  expect(v6.len).toMatchInlineSnapshot(`732`);

  const v7 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len + v5.len + v6.len),
    code: v6.result,
  });
  expect(v7.len).toMatchInlineSnapshot(`348`);

  const v8 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len + v5.len + v6.len + v7.len),
    code: v7.result,
  });
  expect(v8.len).toMatchInlineSnapshot(`253`);

  const v9 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len + v5.len + v6.len + v7.len + v8.len),
    code: v8.result,
  });
  expect(v9.len).toMatchInlineSnapshot(`342`);

  const v10 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len + v5.len + v6.len + v7.len + v8.len + v9.len),
    code: v9.result,
  });
  expect(v10.len).toMatchInlineSnapshot(`219`);

  const v11 = await updateSearchReplace({
    instructions: instructions.slice(
      r1.len + v2.len + v3.len + v4.len + v5.len + v6.len + v7.len + v8.len + v9.len + v10.len,
    ),
    code: v10.result,
  });
  expect(v11.len).toMatchInlineSnapshot(`873`);

  const v12 = await updateSearchReplace({
    instructions: instructions.slice(
      r1.len + v2.len + v3.len + v4.len + v5.len + v6.len + v7.len + v8.len + v9.len + v10.len + v11.len,
    ),
    code: v11.result,
  });
  expect(v12.len).toMatchInlineSnapshot(`0`);

  expect(v12.result).toMatchSnapshot();
});

test("should update search replace with a single block", async () => {
  const original = await readFile(__dirname + "/aclock-orig.txt", "utf8");
  const instructions = await readFile(__dirname + "/acllock-inst.txt", "utf8");

  const r1 = await updateSearchReplace({ instructions, code: original });
  expect(r1.len).toMatchInlineSnapshot(`2358`);

  const v2 = await updateSearchReplace({ instructions: instructions.slice(r1.len), code: r1.result });
  expect(v2.len).toMatchInlineSnapshot(`541`);

  const v3 = await updateSearchReplace({ instructions: instructions.slice(r1.len + v2.len), code: v2.result });
  expect(v3.len).toMatchInlineSnapshot(`454`);

  const v4 = await updateSearchReplace({ instructions: instructions.slice(r1.len + v2.len + v3.len), code: v3.result });
  expect(v4.len).toMatchInlineSnapshot(`1046`);

  const v5 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len + v3.len + v4.len),
    code: v4.result,
  });
  expect(v5.len).toMatchInlineSnapshot(`0`);

  expect(v5.result).toMatchSnapshot();
});
