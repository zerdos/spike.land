export async function startAce(code: string) {
  const ace = (await import("ace-builds/src/ace")).default;

  // const {ace} = window;
  var editor = ace.edit("editor");
  var js = ace.createEditSession(code);
  editor.setSession(js);

  await import("ace-builds/src/theme-monokai");

  editor.setTheme("ace/theme/monokai");
  await import("ace-builds/src/mode-typescript");
  // await import("ace-builds/src/mode-typescript-highlight-rules");
  editor.session.setMode(
    "ace/mode/typescript",
    () => ({ jsx: true }),
  );

  return editor;
}
