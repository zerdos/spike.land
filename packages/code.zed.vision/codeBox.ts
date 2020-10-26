import { diff } from "./diff.js";

const importScript = async (src: string) =>
  new Promise(function (resolve, reject) {
    ///@ts-ignore
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    ///@ts-ignore
    document.head.appendChild(s);
  });

//@ts-ignore
export const run = async (startMonaco) => {
  ///@ts-ignore
  const localStorage: Storage = window.localStorage;

  await importScript("https://unpkg.com/@babel/standalone@7.12.4/babel.min.js");
  await importScript(
    "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
  );
  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );
  await importScript(
    "https://unpkg.com/interactjs@1.10.0/dist/interact.min.js",
  );

  const searchRegExp = /import/gi;
  const replaceWith = "///";

  setTimeout(() => makeDragabble(), 100);

  let latestGoodCode = "";

  const transpileCode = (code: string) =>
    ///@ts-ignore
    window["Babel"].transform(code, {
      plugins: [],
      presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
    }).code.replace(searchRegExp, replaceWith);

  const restartCode = async (transpileCode: string) => {
    const restart = new Function(
      "transpileCode",
      `return function(){ ${transpileCode} }`,
    )();

    const body = {
      codeTranspiled: transpileCode,
      code: latestGoodCode,
    };

    const stringBody = JSON.stringify(body);
    const request = new Request(
      "https://my-ts-project.zed-vision.workers.dev",
      {
        body: stringBody,
        method: "POST",
        headers: { "content-type": "application/json;charset=UTF-8" },
      },
    );

    const response = await fetch(request);

    const { hash } = await response.json();

    try {
      const prev = localStorage.getItem("codeBoXHash") || "zedCodeSTART";
      localStorage.setItem("codeBoXHash", hash);
      localStorage.setItem(hash, latestGoodCode);
    } catch (e) {
      console.log("no Localstorage");
    }

    restart();
  };

  let keystrokeTillNoError = 0;
  let latestCode = "";
  let errorReported = "";
  let busy = 0;
  let latestBadCode = "";

  (async () => {
    const example = getCodeToLoad();
    latestGoodCode = example;
    latestBadCode = example;
    const editor = await startMonaco({
      language: "typescript",
      code: example,
      onChange: (code: string) => {
        latestCode = code;
        console.log(code);

        const runner = async (cd: string) => {
          if (busy === 1) return;

          busy = 1;
          const err = await getErrors(editor);
          ///@ts-ignore
          const errorDiv = document.getElementById("error");
          try {
            busy = 0;

            if (cd !== latestCode) return;
            if (err && err.length) {
              if (latestCode != cd) return;
              if (errorReported === cd) return;
              ///@ts-ignore

              document.getElementById("root").classList.add("almosthidden");
              const slices = diff(latestGoodCode, cd);
              console.log(slices);

              if (slices.length <= 3) {
                latestBadCode = cd;
                ///@ts-ignore
                window["monaco"].editor.setTheme("hc-black");
                return;
              }

              // const oldSlices = diff(latestBadCode, cd);

              // const unMerge = oldSlices.filter((o) => o[0] !== 0);

              // let filtered = slices.filter((t) =>
              //   t[0] === 0 || t[1] === unMerge[0][1]
              // );

              // if (filtered.length > 4) {
              //   filtered = filtered.filter((t) => t[0] === 0);
              // }

              // diff_cleanupMerge(filtered, false);

              // let newStr = "";
              // let offset = 0;
              // filtered.map((t) => {
              //   newStr = newStr + t[1];
              //   if (t[0] !== 0) {
              //     offset = newStr.length;
              //   }
              // });

              // busy = 0;

              // if (newStr !== cd) {
              //   editor.setValue(newStr);
              //   const model = editor.getModel("file:///Main.tsx");

              //   const position = model.getPositionAt(offset);
              //   //  mosel.getC

              //   const validPos = model.validatePosition(position);
              //   editor.setPosition(validPos);

              //   // model.modifyPosition(position)
              //   return;
              // }
              // const errors = err..map((x) => x.messageText)

              //@ts-ignore
              errorDiv.innerHTML = errors[0].messageText;
              ///@ts-ignore

              document.getElementById("root").style.setProperty(
                "dispay",
                "none",
              );

              errorDiv.style.display = "block";
              errorReported = cd;

              //@ts-ignore
              window["monaco"].editor.setTheme("vs-light");
              setTimeout(() => {
                //@ts-ignore
                window["monaco"].editor.setTheme("hc-black");
              }, keystrokeTillNoError++);

              return;
            }
            latestGoodCode = cd;

            errorDiv!.style!.display = "none";
            //@ts-ignore

            window["monaco"].editor.setTheme("vs-dark");

            //@ts-ignore
            document.getElementById("root").classList.remove("almosthidden");
            keystrokeTillNoError = 0;

            busy = 0;
            restartCode(transpileCode(cd));
          } catch (err) {
            busy = 0;
            if (cd !== latestCode) return;

            ///@ts-ignore
            window["monaco"].editor.setTheme("vs-light");
            setTimeout(() => {
              ///@ts-ignore
              window["monaco"].editor.setTheme("hc-black");
            }, 10);
            console.error(err);
          }
        };
        if (!busy) runner(latestCode);
        else {
          const myCode = code;
          const cl = setInterval(() => {
            if (myCode !== latestCode || !busy) {
              clearInterval(cl);
            }

            if (!busy) runner(latestCode);
          }, 100);
        }
      },
    });
    //
  })();

  restartCode(transpileCode(getCodeToLoad()));
  //@ts-ignore
  document.getElementById("root").setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));

  async function getErrors(editor: any) {
    const model = editor.getModel("file:///main.tsx");

    //@ts-ignore
    const tsWorker = await window["monaco"].languages.typescript
      .getTypeScriptWorker();
    const modelUri = model?.uri;
    if (!modelUri) return;

    const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
      "file:///main.tsx",
    );
    const comp = await (await tsWorker(modelUri))
      .getCompilerOptionsDiagnostics("file:///main.tsx");
    const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics(
      "file:///main.tsx",
    );

    return [...diag, ...comp, ...syntax];
  }

  const makeDragabble = () => {
    ///@ts-ignore
    window.interact(".draggable")
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          ///@ts-ignore
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
        // enable autoScroll
        autoScroll: false,
        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,
          // call this function on every dragend event
        },
      });
  };

  ///@ts-ignore
  function dragMoveListener(event: any) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = "translate(" + x +
      "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  function getCodeToLoad() {
    const latestGoodCodeHash = localStorage.getItem("codeBoXHash");
    return localStorage.getItem(latestGoodCodeHash);
  }
};
