import { test } from "uvu";
import * as assert from "uvu/assert";

import {
  applyPatch,
  hashCode,
  makePatch,
  md5,
  mST,
  startSession,
} from "../js/session";

const state1 = {
  code: "export default () => <h1>Hello</h1>",
  transpiled: "//ffcbbaae",
  i: 33,
  css: "",
  html: '<h1 id="1c86ccc0"></h1>',
};
const state2 = {
  code: "export default () => <h1>World</h1>",
  transpiled: "//ffcbbaae",
  i: 33,
  css: "",
  html: '<h1 id="1c86ccc0"></h1>',
};
const state3 = {
  code: "export default () => <h1>World</h1>",
  transpiled: "//ffcbbaae",
  i: 34,
  css: "",
  html: '<h1 id="1c86ccc0"></h1>',
};

let hash1 = "";
let hash2;

test("Then we can start it", () => {
  startSession("z", { name: "z", state: state1 }, "");
  hash1 = md5(state1.transpiled);
});

test("It remembers", () => {
  //     StartSession("z",{name: "z", state1} );

  //     const state2 = {code:"yoo", transpiled: "", i:33, css: "", html:""};
  //     makePatch(state2);
  assert.is(hashCode(), md5(mST().transpiled));
  // //    assert.is(hashCode(),0);
});

test("wont start a new session", () => {
  const hash1 = hashCode();

  startSession("z", { name: "z", state: state2 }, "");

  assert.is(hashCode(), md5(mST().transpiled));
});

// test("do nothing if code change without the i", async () => {
//   const p = await makePatch(state2);
//   assert.is(hashCode(), hash1);
//   assert.is(p.oldHash, hash1);

//   hash2 = p.newHash;
//   let errMessage = "";
//   try {
//     await applyPatch(p);
//   } catch (err) {
//     if (err instanceof Error) errMessage = err.message;
//   }

//   assert.equal(errMessage, "Code update without I update error");

//   assert.not.equal(hashCode(), p.newHash);
// });

// test("applies a patch", async () => {
//   const p = await makePatch(state3);
//   assert.is(hashCode(), hash1);
//   assert.is(p.oldHash, hash1);

//   hash2 = p.newHash;

//   await applyPatch(p);

//   assert.is(hashCode(), p.newHash);
// });

test.run();
