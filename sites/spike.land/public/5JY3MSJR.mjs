import {
  init_define_process
} from "./LC4ALKUC.mjs";

// js/startAce.ts
init_define_process();
async function startAce(code) {
  const ace = (await import("./7YGX46US.mjs")).default;
  var editor = ace.edit("editor");
  var js = ace.createEditSession(code);
  editor.setSession(js);
  await import("./3L3RHSIT.mjs");
  editor.setTheme("ace/theme/monokai");
  await import("./ITTMUSEX.mjs");
  editor.session.setMode("ace/mode/typescript", () => ({ jsx: true }));
  return editor;
}
export {
  startAce
};
