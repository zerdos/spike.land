/** @jsxImportSource @emotion/react */
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { renderFromString } from "./renderToString";
import { mST, codeSpace, saveCode } from "./ws";
import throttle from "lodash/throttle";

export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

let debounceTime = 100;

let runnerDebounced = throttle(runner, debounceTime);

async function startAceWithSession() {

  const aceDom = document.createElement("pre");
  aceDom.id = "editor";
  document.body.appendChild(aceDom);


  const { prettier } = await import("./prettierEsm");

  const {startAce} = await import("./ace");
  startAce(mST().code, (newCode)=>{
    runnerDebounced(
      prettier(newCode),
      // ev.changes,
      mST().i + 1,
    )
  });
  
}

async function startMonacoWithSession() {
  console.log("start monaco with session");
  const monacoEditorDom = document.createElement("div");
  monacoEditorDom.id = "monacoEditor";
  document.body.appendChild(monacoEditorDom);

  const { startMonaco } = await import("./editor");

  const { editor, monaco } = await startMonaco(
    /**
     * @param {any} code
     */
    {
      container: monacoEditorDom,
      name: codeSpace,
      code: mST().code,
    },
  );

  const model = editor.getModel();

  // Object.assign(session, { monaco, editor, model });

  // let inc = 0;

  const { prettier } = await import("./prettierEsm");

  editor.onDidChangeModelContent(() =>
    runnerDebounced(
      prettier(model!.getValue()),
      // ev.changes,
      mST().i + 1,
    )
  );

  Object.assign(globalThis, { monaco, editor, model });

  // monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
  //   autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],

  //   async provideOnTypeFormattingEdits(model) {
  //     const text = await formatter(model.getValue());

  //     return [
  //       {
  //         range: model.getFullModelRange(),

  //         text,
  //       },
  //     ];
  //   },
  // });
}

async function startCMirror() {
  console.log("start monaco with session");
  const monacoEditorDom = document.createElement("div");
  monacoEditorDom.id = "monacoEditor";
  document.body.appendChild(monacoEditorDom);

  const { startCodeMirror } = await import("./codeMirror");

   startCodeMirror(
    mST().code
  );


  // Object.assign(session, { monaco, editor, model });

  // let inc = 0;


  // monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
  //   autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],

  //   async provideOnTypeFormattingEdits(model) {
  //     const text = await formatter(model.getValue());

  //     return [
  //       {
  //         range: model.getFullModelRange(),

  //         text,
  //       },
  //     ];
  //   },
  // });
}
// async function getErrors({ monaco, editor, model }) {
//   if (!monaco) {
//     return [{ messageText: "Error with the error checking. Try to reload!" }];
//   }

//   const worker = await monaco.languages.typescript.getTypeScriptWorker();
//   const client = await worker(model);

//   const filename = model.uri.toString();
//   const diag = client.getSemanticDiagnostics(filename);
//   const comp = client.getCompilerOptionsDiagnostics(filename);
//   const syntax = client.getSyntacticDiagnostics(filename);
//   const fastError = await Promise.race([diag, comp, syntax]);

//   // Model.dispose();
//   console.log(fastError);
//   return [];
// }

// Let getHtmlAndCss;
const r = { counter: 0 };

async function runner(
  code: string,
  // changes: unknown[],
  counter: number,
) {
  if (code === mST().code) return;

  const latest = ++r.counter;
  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const { init } = await import("./esbuildEsm");
  const transform = await init();

  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      if (latest < r.counter) return;

      try {
        const { html, css } = await renderFromString(transpiled);

        await saveCode({
          code,
          transpiled,
          i: counter,
          html,
          css,
        });

        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

export async function quickStart() {
  const { renderPreviewWindow } = await import(
    "./renderPreviewWindow"
  );

  await renderPreviewWindow();

if (isMobile()){
  await startAceWithSession()
} else {
  await startMonacoWithSession();
}
  
}


function isMobile(){
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};