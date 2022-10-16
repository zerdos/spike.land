import "./chunk-chunk-4MWWRXSO.mjs";
import {
  transform
} from "./chunk-chunk-KVSVLQ6C.mjs";
import {
  wait
} from "./chunk-chunk-XKQSAEYU.mjs";
import {
  wrap
} from "./chunk-chunk-47JOSZAC.mjs";
import {
  AutoUpdateApp,
  DraggableWindow,
  appFactory,
  export_jsx,
  export_jsxs,
  render,
  renderFromString,
  saveCode
} from "./chunk-chunk-DF4VVS6U.mjs";
import {
  hashCode,
  mST,
  md5,
  onSessionUpdate,
  patchSync
} from "./chunk-chunk-FN4A4NOQ.mjs";
import {
  Children,
  PureComponent,
  cloneElement2,
  createElement2,
  createPortal,
  createRef2,
  createRoot,
  export_css,
  isValidElement2,
  p,
  react_preact_default,
  useEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-4VV4U3W2.mjs";
import {
  init_define_process
} from "./chunk-chunk-5VN25EFX.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-chunk-72WFF2DN.mjs";

// js/renderPreviewWindow.tsx
init_define_process();

// ../../.yarn/__virtual__/react-reverse-portal-virtual-1d0f51ed61/0/global/cache/react-reverse-portal-npm-2.1.1-e50ec91de3-9.zip/node_modules/react-reverse-portal/dist/web/index.js
init_define_process();
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (b2.hasOwnProperty(p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ELEMENT_TYPE_HTML = "html";
var ELEMENT_TYPE_SVG = "svg";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var validateElementType = function(domElement, elementType) {
  if (elementType === ELEMENT_TYPE_HTML) {
    return domElement instanceof HTMLElement;
  }
  if (elementType === ELEMENT_TYPE_SVG) {
    return domElement instanceof SVGElement;
  }
  throw new Error('Unrecognized element type "' + elementType + '" for validateElementType.');
};
var createPortalNode = function(elementType, options) {
  var initialProps = {};
  var parent;
  var lastPlaceholder;
  var element;
  if (elementType === ELEMENT_TYPE_HTML) {
    element = document.createElement("div");
  } else if (elementType === ELEMENT_TYPE_SVG) {
    element = document.createElementNS(SVG_NAMESPACE, "g");
  } else {
    throw new Error('Invalid element type "' + elementType + '" for createPortalNode: must be "html" or "svg".');
  }
  if (options && typeof options === "object") {
    for (var _i = 0, _a = Object.entries(options.attributes); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      element.setAttribute(key, value);
    }
  }
  var portalNode = {
    element,
    elementType,
    setPortalProps: function(props) {
      initialProps = props;
    },
    getInitialPortalProps: function() {
      return initialProps;
    },
    mount: function(newParent, newPlaceholder) {
      if (newPlaceholder === lastPlaceholder) {
        return;
      }
      portalNode.unmount();
      if (newParent !== parent) {
        if (!validateElementType(newParent, elementType)) {
          throw new Error('Invalid element type for portal: "' + elementType + '" portalNodes must be used with ' + elementType + " elements, but OutPortal is within <" + newParent.tagName + ">.");
        }
      }
      newParent.replaceChild(portalNode.element, newPlaceholder);
      parent = newParent;
      lastPlaceholder = newPlaceholder;
    },
    unmount: function(expectedPlaceholder) {
      if (expectedPlaceholder && expectedPlaceholder !== lastPlaceholder) {
        return;
      }
      if (parent && lastPlaceholder) {
        parent.replaceChild(lastPlaceholder, portalNode.element);
        parent = void 0;
        lastPlaceholder = void 0;
      }
    }
  };
  return portalNode;
};
var InPortal = function(_super) {
  __extends(InPortal2, _super);
  function InPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.addPropsChannel = function() {
      Object.assign(_this.props.node, {
        setPortalProps: function(props2) {
          _this.setState({ nodeProps: props2 });
        }
      });
    };
    _this.state = {
      nodeProps: _this.props.node.getInitialPortalProps()
    };
    return _this;
  }
  InPortal2.prototype.componentDidMount = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.componentDidUpdate = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.render = function() {
    var _this = this;
    var _a = this.props, children = _a.children, node = _a.node;
    return createPortal(Children.map(children, function(child) {
      if (!isValidElement2(child))
        return child;
      return cloneElement2(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = createRef2();
    _this.passPropsThroughPortal();
    return _this;
  }
  OutPortal2.prototype.passPropsThroughPortal = function() {
    var propsForTarget = Object.assign({}, this.props, { node: void 0 });
    this.props.node.setPortalProps(propsForTarget);
  };
  OutPortal2.prototype.componentDidMount = function() {
    var node = this.props.node;
    this.currentPortalNode = node;
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentDidUpdate = function() {
    var node = this.props.node;
    if (this.currentPortalNode && node !== this.currentPortalNode) {
      this.currentPortalNode.unmount(this.placeholderNode.current);
      this.currentPortalNode.setPortalProps({});
      this.currentPortalNode = node;
    }
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentWillUnmount = function() {
    var node = this.props.node;
    node.unmount(this.placeholderNode.current);
    node.setPortalProps({});
  };
  OutPortal2.prototype.render = function() {
    return createElement2("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/Editor.tsx
init_define_process();

// js/runner.tsx
init_define_process();

// js/toUmd.ts
init_define_process();
var mod = {
  printR(name, included) {
    if (included[name])
      return "";
    included[name] = true;
    const current = mod.data[mod.hashMap[name]];
    const currentCode = current.code;
    if (!current.deps || !current.deps.length) {
      return currentCode;
    }
    const myDepts = [...current.deps];
    const depts = myDepts.map((n) => mod.printR(n, included)).join(" \n ");
    return depts + `
    
    ` + currentCode;
  },
  async toJs(name) {
    const js = mod.printR(name, {});
    const modZ = Object.keys(mod.data).map(
      (k) => [`"${mod.hashMap[k]}"`, k.replace(/[^a-f]/g, "")]
    ).map((x) => x[0] + ": " + x[1]).join(", \n ");
    const res = `
     ${js}
  function require(name){
    return ({${modZ}})[name];
  }
  globalThis.UMD_require = require;
  
     `;
    const { transform: transform2 } = await import("./chunk-esbuildEsm-DKBQXEW2.mjs");
    const t = await transform2(res, {
      format: "esm",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    const c = await transform2(t.code, {
      format: "iife",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    return c.code;
  },
  hashMap: {},
  data: {}
};
var toUmd = async (source, name) => {
  const { transform: transform2 } = await import("./chunk-esbuildEsm-DKBQXEW2.mjs");
  const hash = md5(source);
  mod.hashMap = __spreadProps(__spreadValues({}, mod.hashMap), { [hash]: name, [name]: hash });
  if (!mod.data[hash]) {
    const transformed = await transform2(source, {
      format: "iife",
      keepNames: true,
      treeShaking: true,
      target: "es2018",
      loader: name.includes(".tsx") ? "tsx" : name.includes(".ts") ? "ts" : name.includes(".jsx") ? "jsx" : "js",
      globalName: hash.replace(/[^a-f]/g, "")
    });
    if (!transformed || !transformed.code) {
      console.log("transform result -code is empty");
      return;
    }
    mod.data = __spreadProps(__spreadValues({}, mod.data), {
      [hash]: __spreadProps(__spreadValues({}, transformed), {
        deps: findDeps(transformed.code)
      })
    });
    await Promise.all(mod.data[hash].deps.map(async (dep) => {
      if (mod.hashMap[dep]) {
        return;
      }
      const importMap = importShim.getImportMap();
      let url = "";
      let urlHash = "";
      if (importMap.imports[dep]) {
        url = importMap.imports[dep];
        urlHash = md5(dep);
      } else if (dep.startsWith("./")) {
        url = new URL(dep, location.origin).toString();
        urlHash = md5(dep);
      } else {
        try {
          url = await importShim.resolve(dep, name);
          urlHash = md5(dep);
        } catch (e) {
          console.error(`failed to resolve: ${dep}`);
          return;
        }
      }
      if (mod.hashMap[urlHash]) {
        return;
      }
      mod.hashMap[dep] = url;
      const source2 = await (await fetch(url)).text();
      return toUmd(source2, dep);
    }));
  }
  return mod;
};
var findDeps = (code) => {
  const regex = /require\("(.+?)"\)/gm;
  let m;
  const deps = [];
  while ((m = regex.exec(code)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    for (const [groupIndex, match] of m.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }
      console.log(`Found match, group ${groupIndex}: ${match}`);
    }
  }
  return deps;
};

// js/runner.tsx
var mod2 = {
  code: "",
  olderCode: ""
};
async function runner({ code, counter, codeSpace }) {
  mod2.code = code;
  const mst = mST();
  console.log(`${mst.i} => ${counter}`);
  if (counter < mst.i) {
    return;
  }
  setTimeout(() => {
    if (mod2.code === code && code !== mod2.olderCode) {
      runner({ code, counter, codeSpace });
    }
    mod2.olderCode = code;
  }, 1e3);
  try {
    const transpiled = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      minify: true,
      keepNames: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          module: "ESNext",
          jsxFragmentFactory: "Fragment",
          jsxImportSource: "@emotion/react"
        }
      },
      target: "es2018"
    });
    const umdExp = async () => {
      console.log("to UMD");
      const UMD = await toUmd(transpiled.code, `${codeSpace}.tsx`);
      console.log({ UMD });
      download("coder.js", await (UMD == null ? void 0 : UMD.toJs(`${codeSpace}.tsx`)));
      function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    };
    Object.assign(globalThis, { umdExp });
    const codeHash = md5(code).slice(0, 8);
    const transpiledCode = `${transpiled.code}//${codeHash}`;
    const { html, css } = await render(transpiledCode, codeSpace);
    if (!html) {
      return;
    }
    patchSync(__spreadProps(__spreadValues({}, mST()), {
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css
    }));
    let i = 60;
    while (!mST().css && counter === mST().i) {
      console.log("Oh, NO! Can't extract css, wait:", i);
      const { html: html2, css: css2 } = renderFromString(codeSpace, hashCode());
      if (html2 && css2)
        patchSync(__spreadProps(__spreadValues({}, mST()), { html: html2, css: css2 }));
      else
        await wait(i);
      i = i * 2;
    }
    saveCode();
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

// js/isMobile.mjs
init_define_process();
function isMobile() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.userAgent.indexOf("SAMSUNG") === -1;
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.slice(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && !isIOS;
}

// js/prettierJs.ts
init_define_process();
var prettierJs = async (code) => {
  const prettier = init();
  return prettier.prettierJs(code);
};
var _prettierJs = null;
var fallback = {
  prettierJs: async (code) => {
    const t0 = performance.now();
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-L6G35TMS.mjs")).prettierJs;
    const t1 = performance.now();
    console.log(`importing took ${t1 - t0} milliseconds.`);
    const res = _prettierJs(code);
    const t2 = performance.now();
    console.log(`prettier took ${t2 - t1} milliseconds.`);
    return res;
  }
};
var _prettier = null;
function init() {
  if (_prettier)
    return _prettier;
  if (!supportsWorkerType())
    return _prettier = fallback;
  try {
    const worker = new SharedWorker(
      new URL("prettierWorker.mjs", location.origin),
      { type: "module" }
    );
    const wrapped = wrap(worker.port);
    return _prettier = wrapped;
  } catch (e) {
    return _prettier = fallback;
  }
}
function supportsWorkerType() {
  let supports = false;
  const tester = {
    get type() {
      supports = true;
      return "module";
    }
  };
  try {
    new Worker("blob://", tester);
  } finally {
    return supports;
  }
}

// js/Editor.tsx
var mod3 = {
  CH() {
  },
  getValue: async () => "",
  setValue: async (code) => {
    if (code.length < 10)
      console.log(code);
  },
  code: "",
  counter: 0,
  lastKeyDown: 0,
  codeToSet: ""
};
var Editor = ({ codeSpace }) => {
  const ref = useRef(null);
  const { i, code } = mST();
  const [
    mySession,
    changeContent
  ] = react_preact_default.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,
    myId: "loading",
    onChange(_cb) {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod3.counter = mST().i;
  const {
    myCode,
    started,
    myId,
    engine,
    onChange
  } = mySession;
  mod3.code = myCode;
  react_preact_default.useEffect(() => {
    if (!(ref == null ? void 0 : ref.current)) {
      return;
    }
    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/startMonaco.css";
      document.head.append(link);
      const { startMonaco } = await import("./chunk-startMonaco-NJWEVMHO.mjs");
      const { model, getTypeScriptWorker, setValue: setMonValue } = await startMonaco(
        {
          container: ref.current,
          name: codeSpace,
          code: mST().code
        }
      );
      const getValue = async () => {
        const code2 = await prettierJs(model.getValue());
        if (code2 === mod3.code)
          return code2;
        const counter = ++mod3.counter;
        mod3.code = code2;
        runner({ code: code2, counter, codeSpace });
        try {
          (async () => {
            const tsWorker = await (await getTypeScriptWorker())(
              model.uri
            );
            const diag = await tsWorker.getSemanticDiagnostics(
              location.origin + "/live/" + codeSpace + ".tsx"
            );
            if (diag.length) {
              console.log(diag.map((d) => d.messageText));
            }
          })();
        } catch (e) {
          console.error("ts diag error");
        }
        if (mod3.code !== code2)
          throw new Error("code just changed");
        return code2;
      };
      const setValue = async (_code) => {
        const i2 = mST().i;
        const code2 = await prettierJs(_code);
        if (code2.length < 10)
          return;
        if (code2 === await getValue())
          return;
        if (i2 <= mod3.counter)
          return;
        mod3.code = code2;
        mod3.counter = i2;
        setMonValue(code2);
        changeContent((ct) => __spreadProps(__spreadValues({}, ct), { myCode: mod3.code, counter: i2 }));
      };
      mod3.getValue = getValue;
      mod3.setValue = setValue;
      changeContent(__spreadProps(__spreadValues({}, mySession), {
        started: true,
        onChange: (cb) => model.onDidChangeContent(cb).dispose,
        myId: "editor"
      }));
    };
    const setAce = async () => {
      const { startAce } = await import("./chunk-startAce-2TJVEOC6.mjs");
      const editor = await startAce(mST().code);
      const getValue = async () => {
        const code2 = await prettierJs(editor.session.getValue());
        if (code2 === mod3.code)
          return mod3.code;
        const counter = ++mod3.counter;
        mod3.code = code2;
        runner({ code: code2, counter, codeSpace });
        return mod3.code;
      };
      const setValue = async (_code) => {
        const i2 = mST().i;
        const code2 = await prettierJs(_code);
        mod3.codeToSet = code2;
        if (code2.length < `export default ()=><></>`.length)
          return;
        if (code2 === await getValue())
          return;
        if (i2 == mod3.counter)
          return;
        mod3.code = code2;
        mod3.counter = i2;
        editor.session.setValue(code2);
        changeContent((ct) => __spreadProps(__spreadValues({}, ct), { myCode: mod3.code, counter: i2 }));
      };
      mod3.getValue = getValue;
      mod3.setValue = setValue;
      changeContent(__spreadProps(__spreadValues({}, mySession), {
        onChange(cb) {
          editor.session.on("change", cb);
          return () => {
            editor.session.off("change", cb);
          };
        },
        started: true,
        myId: "editor"
      }));
    };
    const loadEditors = () => engine === "monaco" ? setMonaco() : setAce();
    !started && loadEditors();
  }, [started, ref]);
  react_preact_default.useEffect(
    () => onChange(
      () => mod3.getValue().then(
        () => changeContent((x) => __spreadProps(__spreadValues({}, x), {
          counter: mod3.counter,
          myCode: mod3.code
        }))
      )
    ),
    [onChange, myCode, changeContent]
  );
  onSessionUpdate(() => {
    if (mod3.counter > mST().i) {
      return;
    }
    mod3.counter = mST().i;
    mod3.code = mST().code;
    mod3.setValue(mod3.code);
    changeContent((x) => __spreadProps(__spreadValues({}, x), {
      counter: mod3.counter,
      myCode: mod3.code
    }));
  }, "editor");
  return export_jsx("div", {
    onKeyDown: () => mod3.lastKeyDown = Date.now(),
    "data-test-id": myId,
    id: "editor",
    css: export_css`
        
            max-width: 640px;
            height: 100%;
            
            
        `,
    ref
  });
};

// js/renderPreviewWindow.tsx
var RainbowContainer = ({ css, children }) => export_jsx("div", {
  css: css`
              height: 100%;
              width: 100%;
              background-blend-mode: overlay;
              background:  repeating-radial-gradient(circle at bottom left, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
            #e87f24 0, #e87f24 22.2222222222%, 
            #dd6227 0, #dd6227 27.7777777778%,
             #dc4c27 0, #dc4c27 33.3333333333%, 
            #ca3435 0, #ca3435 38.8888888889%, 
            #b82841 0, #b82841 44.4444444444%, 
            #953751 0, #953751 50%, #364c88 0, 
            #364c88 55.5555555556%, #16599d 0, 
            #16599d 61.1111111111%, #02609e 0, 
            #02609e 66.6666666667%, #0073a9 0, 
            #0073a9 72.2222222222%, #008aa4 0, 
            #008aa4 77.7777777778%, #239a87 0, 
            #239a87 83.3333333333%, #7cba6d 0, 
            #7cba6d 88.8888888889%, #becc2f 0, 
            #becc2f 94.4444444444%, #e0d81d 0, 
            #e0d81d 100%), 
            repeating-radial-gradient(circle at bottom right, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
              #e87f24 0, #e87f24 22.2222222222%, 
              #dd6227 0, #dd6227 27.7777777778%, 
              #dc4c27 0, #dc4c27 33.3333333333%, 
              #ca3435 0, #ca3435 38.8888888889%, 
              #b82841 0, #b82841 44.4444444444%, 
              #953751 0, #953751 50%,
               #364c88 0, #364c88 55.5555555556%, 
               #16599d 0, #16599d 61.1111111111%, 
               #02609e 0, #02609e 66.6666666667%, 
               #0073a9 0, #0073a9 72.2222222222%, 
               #008aa4 0, #008aa4 77.7777777778%,
                #239a87 0, #239a87 83.3333333333%, 
                #7cba6d 0, #7cba6d 88.8888888889%, 
                #becc2f 0, #becc2f 94.4444444444%, 
                #e0d81d 0, #e0d81d 100%);
`,
  children
});
var AppToRender = ({ codeSpace }) => {
  const currentHash = hashCode();
  const [hash, setHash] = useState(currentHash);
  const isStandalone = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (error) {
          console.error({ e: error });
        }
      }
    }, "myApp");
  }, [hash, setHash]);
  const portalNode = useMemo(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace}`, style: "height: 100%" }
  }), []);
  return export_jsxs(p, {
    children: [
      export_jsx(InPortal, {
        node: portalNode,
        children: export_jsx(AutoUpdateApp, {
          hash,
          codeSpace
        })
      }),
      isStandalone ? export_jsx(OutPortal, {
        node: portalNode
      }) : export_jsxs(p, {
        children: [
          export_jsx(Editor, {
            codeSpace
          }),
          export_jsx(DraggableWindow, {
            hashCode: 0,
            room: codeSpace,
            children: export_jsx(OutPortal, {
              node: portalNode
            })
          })
        ]
      })
    ]
  });
};
var singleton = { started: false };
var renderPreviewWindow = ({ codeSpace, CacheProvider, createCache, css }) => {
  if (singleton.started)
    return;
  singleton.started = true;
  const div = document.querySelector("#root");
  const root = createRoot(div);
  const cache = createCache({ key: "w" });
  console.log({ cache });
  root.render(
    export_jsx(CacheProvider, {
      value: cache,
      children: export_jsx(RainbowContainer, {
        css,
        children: export_jsx(AppToRender, {
          codeSpace
        })
      })
    })
  );
};
export {
  renderPreviewWindow
};
