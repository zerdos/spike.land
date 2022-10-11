import { useCallback, useRef } from "react";
import { runner } from "./runner";
import React from "react";

// Import type FC from "react"
import { css } from "@emotion/react";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";
import {prettierJs} from "./prettierJs"; 
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
  getValue:  async () => "",
  setValue: async (code: string) => {
    console.log(code);
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
    assets: Record<string, string>;
  }
> = (
  { codeSpace, assets },
) => {
  const ref = useRef<HTMLDivElement>(null) as undefined | {
    current: HTMLDivElement;
  };

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

  mod.counter = i;

  const {
    counter,
    myCode,
    started,
    myId,
    // runner,
    engine,
    // getValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  const cb = useCallback(() => {
    const lastKeydownHappened = Date.now() - mod.lastKeyDown;
    console.log({ lastKeydownHappened });
    let increment = 0;
    if (lastKeydownHappened < 1000) {
      increment = 1;
      //console.log(`last keydown happened:   + ${lastKeydownHappened}, we already handled this event`);
      //		return;
    }

   
    (async()=>{
    const code = await mod.getValue();
    const newCode = await prettierJs(code);

    if (newCode === myCode) {
      return;
    }

    if (newCode === mST().code) {
      return;
    }

    // if (mySession.counter  mST().i) return;

    mod.counter = mST().i + increment;

    changeContent((x) => ({
      ...x,
      lastKeyDown: 0,
      counter: mod.counter,
      myCode: newCode,
    }));
    runner({ code: newCode, counter: mod.counter, codeSpace });

  })();
    


    // Console.log("RUN THE RUNNER AGAIN");

    // Model?.setValue(code);
  }, [mod.lastKeyDown, myCode, counter, changeContent]);

  React.useEffect(() => {
    if (!(ref?.current)) {
      return;
    }

    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.append(link);

      const { startMonaco } = await import("./startMonaco");

      const { model, getTypeScriptWorker, setValue: setMonValue } =
        await startMonaco(
          /**
           * @param {any} code
           */
          {
            container: ref.current,
            name: codeSpace,
            code: mST().code,
          },
        );

      const getValue = async () => {
        try {
          (async () => {
            const tsWorker = await (await getTypeScriptWorker())(
              model.uri,
            );

            const diag = await tsWorker.getSemanticDiagnostics(
              location.origin + "/live/" + codeSpace + ".tsx",
            );
            console.log({ diag });
          })();
        } catch {
          console.error("ts diag error");
        }

        return await prettierJs(model.getValue());
      };

      const setValue = async(_code: string) => {
        const code = await prettierJs(_code);
        mod.codeToSet = code;
        if (code.length < `export default ()=><></>`.length) return;
        if (code === await getValue()) return;
        if (mST().i === mod.counter) return;

        setTimeout(() => mod.codeToSet === code && setMonValue(code), 800); //wait this time before overwriting the value
      };

      mod.getValue = getValue;
      mod.setValue = setValue;

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
      const { startAce } = await import("./startAce");
      const editor = await startAce(mST().code);
      const getValue = async () => await prettierJs(editor.session.getValue());

      const setValue = async(_code: string) => {
        const code = await prettierJs(_code);
        mod.codeToSet = code;

        if (code.length < `export default ()=><></>`.length) return;
        if (code === await getValue()) return;
        if (mST().i === mod.counter) return;

        setTimeout(() => {
          if (mod.codeToSet === code) {
            //	const before = editor.selection.toJSON();

            editor.session.setValue(code);
            //	editor.selection.fromJSON(before)
          }
        }, 800); //wait this time before overwriting the value
      };

      mod.getValue = getValue;
      mod.setValue = setValue;

      changeContent({
        ...mySession,
        onChange(cb: () => void) {
          editor.session.on("change", cb);
          return () => {
            editor.session.off("change", cb);
          };
        },
        started: true,
        myId: "editor",
      });
    };

    const loadEditors = () => (engine === "monaco") ? setMonaco() : setAce();

    !started && loadEditors();
  }, [started, ref]);

  // UseInsertionEffect(()=>{

  // })

  React.useEffect(() => {
    onChange(cb);
  }, [onChange]);

  // React.useEffect(() => {
  // 	if (!started) return;
  // 	setValue(myCode);

  // 	const lastKeydownHappened = (Date.now()-lastKeyDown;

  // 	if (lastKeydownHappened>2000) {

  // 		console.log('last keydown happened: '  + $lastKeydownHappened );

  // 	}
  // 	runner({code: myCode, counter: counter, codeSpace}){
  // 	};

  // }, [setValue, myCode, counter, codeSpace, started]);

  // React.useEffect(() => {
  // 	if (!started) {
  // 		return;
  // 	}

  // 	if (i > counter) {
  // 		changeContent(x => ({...x, myCode: code, counter: i}));
  // 		return;
  // 	}

  // }, [setValue, getValue, counter, prettierJs, runner]);

  onSessionUpdate(() => {
    if (counter < mST().i) {
      changeContent({ ...mySession, counter: mST().i, myCode: mST().code });
    }
    mod.setValue(mST().code);
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
