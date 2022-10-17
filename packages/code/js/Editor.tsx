import { useRef } from "react";
import { runner } from "./runner";
import React from "react";

// Import type FC from "react"
import { css } from "@emotion/react";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";
import { prettierJs } from "./prettierJs";
// /Volumes/devX/spike.land/packages/code/js/prettierJs.ts
// import {wrkModuleImport} from "./moduleWorker.mjs"

// const prettierJs = async (code: string) =>{
// console.log({code});
//   const mod = wrkModuleImport("/prettierJs.mjs",['prettierJs']) as unknown as {prettierJs: (code:string)=>Promise<string>};
//   const prettied = await mod.prettierJs(code);
//   console.log({prettied});
//   return prettied

// }

const mod = {
  CH() {},
  getValue: async () => "",

  setValue: async (code: string) => {
    if (code.length < 10) console.log(code);
  },
  code: "",
  counter: 0,
  lastKeyDown: 0,
  codeToSet: "",
};

// Export type IStandaloneCodeEditor = editor.Ist;

export const Editor: React.FC<
  {
    codeSpace: string;
  }
> = (
  { codeSpace },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { i, code } = mST();

  const [
    mySession,
    changeContent,
  ] = React.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,

    myId: "loading",
    onChange(_cb: () => void) {},
    engine: isMobile() ? "ace" : "monaco",
  });

  mod.counter = mST().i;

  const {
    myCode,
    started,
    myId,
    // runner,
    engine,
    // getValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  React.useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/renderPreviewWindow.css";
      document.head.append(link);

      const { startMonaco } = await import("./startMonaco");

      const { model, getTypeScriptWorker, setValue: setMonValue } =
        await startMonaco(
          /**
           * @param {any} code
           */
          {
            container: ref.current!,
            name: codeSpace,
            code: mST().code,
          },
        );

      const getValue = async () => {
        const code = await prettierJs(model.getValue());
        if (code === mod.code) return code;
        const counter = ++mod.counter;
        mod.code = code;
        runner({ code, counter, codeSpace });
        try {
          (async () => {
            const tsWorker = await (await getTypeScriptWorker())(
              model.uri,
            );

            const diag = await tsWorker.getSemanticDiagnostics(
              location.origin + "/live/" + codeSpace + ".tsx",
            );
            if (diag.length) {
              console.log(diag.map((d) => d.messageText));
            }
          })();
        } catch {
          console.error("ts diag error");
        }
        if (mod.code !== code) throw new Error("code just changed");
        return code;
      };


      
      mod.getValue = getValue;

      mod.setValue = async (_code)=> {
        const code = await prettierJs(_code);
        if (await mod.getValue() !== code)
        setMonValue(code);
      }

      changeContent({
        ...mySession,
        started: true,
        onChange: (cb: () => void) => model.onDidChangeContent(cb).dispose,
        myId: "editor",
        // Model: editor.getModel(),
      });

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };

    const setAce = async () => {

     async function onXHA(_code: string){
     

        const code =  await prettierJs(_code);
         
         if (code === mod.code) return;
   
   
         const counter = ++mod.counter;
         mod.code = code;
         runner({ code, counter, codeSpace });
             
         }

      const { startAce } = await import("./startAce");
      const { setValue, getValue} = await startAce(mST().code, onXHA);
    


      mod.getValue = () => prettierJs( getValue());
      mod.setValue = async (_code)=> {
        const code = await prettierJs(_code);
        if (await mod.getValue() !== code)
        setValue(code);
      }

      
      
      changeContent({
        ...mySession, 
        started: true,
        myId: "editor",
      });
    };

    const loadEditors = () => (engine === "monaco") ? setMonaco() : setAce();

    !started && loadEditors();
  }, [started, ref]);

  // UseInsertionEffect(()=>{

  // })

  React.useEffect(
    () =>
      onChange(() =>
        mod.getValue().then(() =>
          changeContent((x) => ({
            ...x,
            counter: mod.counter,
            myCode: mod.code,
          }))
        )
      ),
    [onChange, myCode, changeContent],
  );

  onSessionUpdate(() => {
    if (mod.counter >= mST().i) {
      return;
    }

    mod.counter = mST().i;
    mod.code = mST().code;

    mod.setValue(mod.code);
    changeContent((x) => ({
      ...x,
      counter: mod.counter,
      myCode: mod.code,
    }));
  }, "editor");

  return (
    <div
      onKeyDown={() => mod.lastKeyDown = Date.now()}
      data-test-id={myId}
      id="editor"
      css={css`          
      max-width: 640px;
      height: 100%; 
      `}
      ref={ref}
    />
  );
};
