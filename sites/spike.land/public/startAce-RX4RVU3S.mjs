import {
  init_define_process
} from "./chunk-LVJWQ4UB.mjs";

// js/startAce.ts
init_define_process();
async function startAce(code) {
  const ace = (await import("./ace-W3DISBST.mjs")).default;
  var editor = ace.edit("editor");
  var js = ace.createEditSession(code);
  editor.setSession(js);
  await import("./theme-monokai-Z3ARMWLG.mjs");
  editor.setTheme("ace/theme/monokai");
  await import("./mode-typescript-ZCHAHJOU.mjs");
  editor.session.setMode("ace/mode/typescript", () => ({ jsx: true }));
  return editor;
}
export {
  startAce
};
