import {edit, createEditSession} from "ace-builds/src-min-noconflict/ace"

import "ace-builds/src-min-noconflict/theme-monokai";

import "ace-builds/src-min-noconflict/mode-typescript";

export async function startAce(code: string) {
  // const {ace} = window;
  const editor = edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/typescript",
   ()=> ({ jsx: true }),
  );
  const mode = editor.session.getMode();
  const js = createEditSession(code, mode);
  editor.setSession(js);


  return editor;
}
