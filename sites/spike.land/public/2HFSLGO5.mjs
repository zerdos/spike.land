import {
  saveCode
} from "./LSGBBOWN.mjs";
import {
  appFactory,
  mST,
  onSessionUpdate
} from "./5S6SE64O.mjs";
import "./A2CAC27W.mjs";
import {
  css,
  jsx
} from "./D4S3JOF6.mjs";
import {
  wait
} from "./UOSP66EM.mjs";
import {
  init_define_process
} from "./LC4ALKUC.mjs";

// js/Editor.tsx
init_define_process();
import { useEffect, useRef, useState } from "/react.mjs";

// js/runner.tsx
init_define_process();

// js/renderToString.tsx
init_define_process();
import { renderToString } from "/react.mjs";
var renderFromString = (App) => {
  const html = renderToString(jsx(App, null));
  return {
    html,
    css: extractCritical(html)
  };
};
var extractCritical = (html) => {
  const rules = {};
  for (let i2 in document.styleSheets) {
    const styleSheet = document.styleSheets[i2];
    for (let r in styleSheet.cssRules) {
      const rule = styleSheet.cssRules[r];
      if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
        const selector = rule.cssText.slice(1, 11);
        if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
          rules[selector] = rule.cssText;
        }
      }
    }
  }
  return Object.keys(rules).map((r) => rules[r]).join(" ");
};

// js/runner.tsx
var transform = null;
var i = 0;
async function runner({ code, counter }) {
  if (i >= counter) {
    setTimeout(() => i = mST().i, 100);
    return;
  }
  i = counter;
  const { init } = await import("./ZVVITWXQ.mjs");
  transform = transform || await init();
  if (code === mST().code)
    return;
  if (i > counter)
    return;
  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled)
      return;
    let restartError = false;
    if (transpiled.length > 0) {
      try {
        const App = await appFactory(transpiled);
        const { html, css: css2 } = renderFromString(App);
        if (i > counter)
          return;
        await saveCode({
          code,
          transpiled,
          i: counter,
          html,
          css: css2
        });
        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
        return;
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

// js/isMobile.mjs
init_define_process();
function isMobile() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

// js/Editor.tsx
var Editor = ({ code, i: i2, codeSpace }) => {
  const ref = useRef(null);
  const [
    { counter, myCode, myId, engine, prettierJs, getValue, setValue, onChange },
    changeContent
  ] = useState({
    myCode: code,
    counter: i2,
    myId: "loading",
    getValue: () => "",
    setValue: (_code) => {
    },
    onChange: (_cb) => {
    },
    prettierJs: (code2) => code2,
    engine: isMobile() ? "ace" : "monaco"
  });
  const lines = code?.split("\n").length || 0;
  useEffect(() => {
    if (!ref?.current)
      return;
    const setMonaco = async () => {
      const { startMonaco } = await import("./js/startMonaco.mjs");
      const { editor } = await startMonaco({
        container: ref.current,
        name: codeSpace,
        code: mST().code
      });
      changeContent((x) => ({
        ...x,
        setValue: (code2) => {
          const state = editor.saveViewState();
          editor.getModel()?.setValue(code2);
          if (state)
            editor.restoreViewState(state);
        },
        getValue: () => editor.getModel()?.getValue(),
        onChange: (cb) => editor?.onDidChangeModelContent(cb).dispose,
        myId: "editor"
      }));
    };
    const setAce = async () => {
      const { startAce } = await import("./5JY3MSJR.mjs");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange: (cb) => {
          editor?.session.on("change", cb);
          return () => editor?.session.off("change", cb);
        },
        getValue: () => editor.session.getValue(),
        setValue: (code2) => editor.session.setValue(code2),
        myId: "editor"
      }));
    };
    const loadEditors = async () => {
      engine === "monaco" ? await setMonaco() : await setAce();
      const { prettierJs: prettierJs2 } = await import("./32FXNSU7.mjs");
      changeContent((x) => ({ ...x, prettierJs: prettierJs2 }));
      await wait(1e3);
      runner({ code: code + " ", counter });
    };
    loadEditors();
  }, [ref]);
  useEffect(() => {
    if (i2 > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i2 }));
      return;
    }
    const cb = async () => {
      const code2 = getValue();
      const newCode = prettierJs(code2);
      if (code2 === myCode)
        return;
      if (newCode === myCode)
        return;
      if (newCode === mST().code)
        return;
      try {
        changeContent((x) => ({ ...x, counter: counter + 1, myCode: newCode }));
        onSessionUpdate(async () => {
          const sess = mST();
          if (sess.i <= counter + 1) {
            return;
          }
          if (mST().i !== sess.i)
            return;
          changeContent((x) => ({
            ...x,
            myCode: sess.code,
            counter: sess.i
          }));
          setValue(sess.code);
        }, "editor");
        await runner({ code: newCode, counter: counter + 1 });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");
      }
    };
    return onChange(() => cb());
  }, [setValue, getValue, onChange, counter]);
  if (engine === "monaco") {
    return jsx("div", {
      "data-test-id": myId,
      css: css`
  max-width: 640px;
  height: ${60 + lines / 40 * 100}% ;
`,
      ref
    });
  }
  return jsx("div", {
    "data-test-id": myId,
    css: css`
  margin: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`,
    id: "editor",
    ref
  });
};
export {
  Editor
};
