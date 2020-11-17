(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[5],{

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(87)
				var methods = ["renderWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-renderer.b78dcc.worker.js", { name: "built-renderer.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return counterExample; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

var defaultProps = {
  events: ["reset"].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(new Array(8).fill("+1")))
};
var counterExample = "import React, { FC, useState } from \"react\";\nimport ReactDOM from \"react-dom\";\n\nconst Counter: FC<{ initial?: number }> = (\n  { initial = 0 },\n) => {\n  const [clicks, setClicks] = useState(initial);\n\n  return <div>\n    <p>Clicks: {clicks}</p>\n    <button onClick={() => setClicks(clicks + 1)}>+</button>\n    <button onClick={() => setClicks(clicks - 1)}>-</button>\n  </div>;\n};\n\nconst rootElement = document.createElement(\"div\");\n\nReactDOM.render(<Counter initial={0} />, rootElement);\ndocument.body.appendChild(rootElement);\n\n";

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ CodeBox_CodeBox; });

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(8);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(16);

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(12);

// EXTERNAL MODULE: /z/monorepo/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5);

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9);

// EXTERNAL MODULE: /z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);

// CONCATENATED MODULE: ../smart-monaco-editor/lib/editor.js
var editor_require;var startMonaco=/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(_ref){var onChange,code,language,container,el,modelUri,aceEditor,aceEl,setThemeForAce,vsPath,_yield$loadScript,require,monaco,modules,importHelper,dts;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:onChange=_ref.onChange,code=_ref.code,language=_ref.language;container=window.document.getElementById("container");if(!container){el=document.getElementById("container");el.id="container";document.body.appendChild(el);}modelUri=language==="typescript"?"file:///main.tsx":"file:///main.html";if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)){_context2.next=27;break;}aceEl=window.document.createElement("div");aceEl.id="ace";window.document.body.appendChild(aceEl);_context2.next=10;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js");case 10:if(!(language==="typescript")){_context2.next=15;break;}_context2.next=13;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js");case 13:_context2.next=17;break;case 15:_context2.next=17;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js");case 17:_context2.next=19;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js");case 19:window.document.getElementById("ace").style.setProperty("display","block");container.style.setProperty("display","none");aceEditor=window["ace"].edit("ace");aceEditor.getSession().setMode("ace/mode/typescript");setThemeForAce=function setThemeForAce(wait){return setTimeout(function(){var aceEditor1=window["ace"].edit("ace");var theme=aceEditor1.getTheme();if(theme!=="ace/theme/monokai "){aceEditor1.setOptions({fontSize:"14pt"});aceEditor1.setTheme("ace/theme/monokai");setThemeForAce(2*wait);}},wait);};setThemeForAce(100);aceEditor.setValue(code);aceEditor.blur();case 27:if(!(window["monaco"]===undefined)){_context2.next=36;break;}vsPath="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";_context2.next=31;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"+"/loader.min.js");case 31:_yield$loadScript=_context2.sent;require=_yield$loadScript.require;require.config({paths:{"vs":"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"}});_context2.next=36;return new Promise(function(resolve){return require(["vs/editor/editor.main"],function(monaco){resolve(monaco);});});case 36:monaco=window["monaco"];modules={monaco:monaco,editor:monaco.editor.create(window.document.getElementById("container"),{formatOnType:true,scrollbar:{horizontal:"hidden",verticalHasArrows:true,verticalScrollbarSize:20},minimap:{enabled:false},folding:false,multiCursorModifier:"alt",wordWrap:"on",wordWrapBreakAfterCharacters:">([{]))],;}",mouseWheelZoom:false,wordWrapColumn:80,automaticLayout:true,scrollBeyondLastLine:false,autoIndent:"brackets",autoClosingQuotes:"always",padding:{bottom:300},lineNumbers:"on",autoClosingBrackets:"always",autoClosingOvertype:"always",suggest:{},codeLens:true,autoSurround:"languageDefined",trimAutoWhitespace:true,codeActionsOnSaveTimeout:100,model:monaco.editor.getModel(modelUri)||monaco.editor.createModel(code,language,monaco.Uri.parse(modelUri)),value:code,language:language,theme:"vs-dark"})};modules.editor.onDidChangeModelContent(function(){return onChange(modules.editor.getValue());});aceEditor&&aceEditor.session.on("change",function(){var value=aceEditor.getValue();modules.editor.setValue(value);onChange(value);});aceEditor&&document.getElementById("container").replaceWith(document.getElementById("ace"));modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSuggestionDiagnostics:true,noSemanticValidation:true,noSyntaxValidation:true});if(!(language==="typescript")){_context2.next=50;break;}importHelper=[{name:"react",url:"https://unpkg.com/@types/react@16.9.56/index.d.ts",depend:["global","csstype","react-dom","prop-types"]},{name:"global",url:"https://unpkg.com/@types/react@16.9.56/global.d.ts",depend:[]},{name:"prop-types",url:"https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",depend:[]},{name:"react-dom",url:"https://unpkg.com/@types/react-dom@16.9.9/index.d.ts",depend:[]},{name:"csstype",url:"https://unpkg.com/csstype@3.0.5/index.d.ts",depend:[]},{name:"@emotion/styled/base.d.ts",url:"https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",depend:["@emotion/react","@emotion/serialize","react"]},{name:"@emotion/styled/index.d.ts",url:"https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",depend:["@emotion/react","@emotion/serialize","react"]},{name:"@emotion/cache/index.d.ts",url:"https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",depend:["@emotion/utils"]},{name:"@emotion/react/index.d.ts",url:"https://unpkg.com/@emotion/react@11.1.1/types/index.d.ts",depend:["@emotion/cache"]},{name:"@emotion/react/jsx-namespace.d.ts",url:"https://unpkg.com/@emotion/react@11.1.1/types/jsx-namespace.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/css-prop.d.ts",url:"https://unpkg.com/@emotion/react@11.1.1/types/css-prop.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/helper.d.ts",url:"https://unpkg.com/@emotion/react@11.1.1/types/helper.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/theming.d.ts",url:"https://unpkg.com/@emotion/react@11.1.1/types/theming.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/serialize/index.d.ts",url:"https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/utils/index.d.ts",url:"https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",depend:[]}];dts=importHelper.map(function(_ref3){var name=_ref3.name,url=_ref3.url;return Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.t0=modules.monaco.languages.typescript.typescriptDefaults;_context.next=3;return fetch(url);case 3:_context.next=5;return _context.sent.text();case 5:_context.t1=_context.sent;_context.t2=name.includes("@emotion")?"file:///node_modules/"+name:"file:///node_modules/@types/"+name+"/index.d.ts";return _context.abrupt("return",_context.t0.addExtraLib.call(_context.t0,_context.t1,_context.t2));case 8:case"end":return _context.stop();}}},_callee);}))();});modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({target:modules.monaco.languages.typescript.ScriptTarget.ESNext,allowNonTsExtensions:true,allowUmdGlobalAccess:true,strict:true,allowJs:true,noEmitOnError:true,allowSyntheticDefaultImports:true,moduleResolution:modules.monaco.languages.typescript.ModuleResolutionKind.NodeJs,module:modules.monaco.languages.typescript.ModuleKind.CommonJS,noEmit:true,typeRoots:["node_modules/@types"],jsx:modules.monaco.languages.typescript.JsxEmit.React,jsxFactory:"React.createElement",jsxFragmentFactory:"React.Fragment",esModuleInterop:true});_context2.next=48;return Promise.all(dts);case 48:modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSuggestionDiagnostics:false,noSemanticValidation:false,noSyntaxValidation:false});return _context2.abrupt("return",modules);case 50:case"end":return _context2.stop();}}},_callee2);}));return function startMonaco(_x){return _ref2.apply(this,arguments);};}();function loadScript(src){return new Promise(function(resolve,reject){var s;s=window.document.createElement("script");s.src=src;s.onload=function(){return resolve(window);};s.onerror=reject;window.document.head.appendChild(s);});}
// EXTERNAL MODULE: ./src/components/utils/sha.ts
var sha = __webpack_require__(25);

// CONCATENATED MODULE: ./src/components/utils/babel.ts




var cache = {};
var worker = typeof window !== "undefined" ? new Worker(URL.createObjectURL(new window.Blob(["\nimportScripts('https://unpkg.com/@babel/standalone@7.12.6/babel.min.js');\n\nself.onmessage=(message)=>{\n  const hash = message.data.hash;\n\ntry{\n  const translatedMessage = Babel.transform(message.data.code, {\nplugins: [],\npresets: [\"react\", [\"typescript\", { isTSX: true, allExtensions: true }]],\n}).code.replace(\"export const\", \"const\").replace(\"import \", \"//mport \").replace(\"import \", \"//mport \")\n\n    postMessage({hash, translatedCode: translatedMessage})\n} catch(e){\n  postMessage({hash, translatedCode: \"error\", error: e})\n}\n\n}\n"], {
  type: "application/javascript"
}))) : {
  onmessage: function onmessage() {},
  postMessage: function postMessage() {}
};

worker.onmessage = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(message) {
    var codeHash, errorHash, transformedCodeHash;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            codeHash = message.data.hash;

            if (!(typeof cache[codeHash] === "string")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            if (!(typeof cache[codeHash] === "object")) {
              _context.next = 16;
              break;
            }

            if (!message.data.error) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return Object(sha["a" /* hash */])(message.data.error);

          case 7:
            errorHash = _context.sent;
            cache[codeHash].reject(errorHash);
            cache[codeHash] = {
              error: errorHash
            };
            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return Object(sha["a" /* hash */])(message.data.translatedCode);

          case 13:
            transformedCodeHash = _context.sent;
            cache[codeHash].resolve(transformedCodeHash);
            cache[codeHash] = transformedCodeHash;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var transform = /*#__PURE__*/function () {
  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(codeHash) {
    var code, returnPromise;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(sha["b" /* unHash */])(codeHash);

          case 2:
            code = _context2.sent;

            if (!(typeof cache[codeHash] === "string")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", cache[codeHash]);

          case 5:
            if (!(typeof cache[codeHash] === "undefined")) {
              _context2.next = 9;
              break;
            }

            worker.postMessage({
              hash: codeHash,
              code: code
            });
            returnPromise = new Promise(function (resolve, reject) {
              cache[codeHash] = {
                resolve: resolve,
                reject: reject,
                promise: returnPromise
              };
            });
            return _context2.abrupt("return", returnPromise);

          case 9:
            if (!(cache[codeHash] && cache[codeHash].error)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", Promise.reject(cache[codeHash].error));

          case 11:
            return _context2.abrupt("return", cache[codeHash].promise);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function transform(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
// EXTERNAL MODULE: ./src/components/utils/renderer/renderer.worker.ts
var renderer_worker = __webpack_require__(221);

// CONCATENATED MODULE: ./src/components/utils/renderer.ts






var renderer_ref = typeof window !== "undefined" && renderer_worker(),
    renderWorker = renderer_ref.renderWorker;

var render = /*#__PURE__*/function () {
  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(transformedCodeHash, defaultPropsHash) {
    var code, defaultProps, renderResult, renderedStringHash;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Object(sha["b" /* unHash */])(transformedCodeHash);

          case 3:
            code = _context.sent;
            _context.next = 6;
            return Object(sha["b" /* unHash */])(defaultPropsHash);

          case 6:
            defaultProps = _context.sent;
            _context.next = 9;
            return renderWorker(code, defaultProps);

          case 9:
            renderResult = _context.sent;

            if (!(typeof renderResult != "string")) {
              _context.next = 12;
              break;
            }

            throw renderResult.error;

          case 12:
            _context.next = 14;
            return Object(sha["a" /* hash */])(renderResult);

          case 14:
            renderedStringHash = _context.sent;
            return _context.abrupt("return", renderedStringHash);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              error: _context.t0
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function render(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
// EXTERNAL MODULE: ./src/components/codeBox/example.ts
var example = __webpack_require__(50);

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__(4);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js + 13 modules
var emotion_styled_browser_esm = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/codeBox/styledCodeBoxComps.tsx


function _templateObject6() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    display: block;\n    width: 150px;\n    height: 150px;\n    overflow: hidden;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    text-align: center;\n    border-radius: 12px;\n    width: 200px;\n    height: 200px;\n    display: flex;\n    place-content: center;\n    place-items: center;\n    margin: 0;\n    padding: 0;\n    background: rgb(255, 255, 255) none repeat scroll 0% 0%;\n    user-select: none;\n    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    display: block;\n    width: 100%;\n    padding: 10px;\n    color: white;\n    background: red;\n    height: 220px;\n    pre{\n        font-size: 1em;\n        line-height: 1;\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    display: block;\n    width: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    display: block;\n    width: 100%;\n    height: 70vh;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n    background: #3f51b5;\n    font-family: \"Roboto\";\n    margin: 0;\n    padding: 10px 20px 10px;\n    color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var Header = emotion_styled_browser_esm["a" /* default */].div(_templateObject());
var CodeContainer = emotion_styled_browser_esm["a" /* default */].div(_templateObject2());
var ResultContainer = emotion_styled_browser_esm["a" /* default */].div(_templateObject3());
var ErrorContainer = emotion_styled_browser_esm["a" /* default */].div(_templateObject4());
var ResultBox = emotion_styled_browser_esm["a" /* default */].div(_templateObject5());
var ResultBoxContainer = emotion_styled_browser_esm["a" /* default */].div(_templateObject6());
// EXTERNAL MODULE: /z/monorepo/node_modules/framer-motion/dist/framer-motion.es.js
var framer_motion_es = __webpack_require__(51);

// CONCATENATED MODULE: ./src/components/codeBox/codeboxComponents.tsx



var codeboxComponents_HtmlPlayer = function HtmlPlayer(_ref) {
  var content = _ref.content,
      onEvent = _ref.onEvent;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](ResultBoxContainer, {
    onClick: function onClick(e) {
      var clickedElement = e.target;
      var clickEvent = clickedElement.getAttribute("data-onclick");
      if (clickEvent) onEvent(clickEvent);
    },
    dangerouslySetInnerHTML: {
      __html: String(content)
    }
  }));
};
var codeboxComponents_ResultComponent = function ResultComponent(_ref2) {
  var _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? "100%" : _ref2$height,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? "100%" : _ref2$width,
      transformed = _ref2.transformed,
      onEvent = _ref2.onEvent,
      events = _ref2.events;

  // const x = useMotionValue(0);
  // const background = useTransform(
  //   x,
  //   [0, 300, 600],
  //   ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  // );
  // const [{ xxx, yyy }, setIndexToShow] = React.useSta\te({ xxx: 0, yyy: 0 });
  var _React$useState = react["useState"]({
    content: transformed[0].rendered[transformed[0].rendered.length - 1] || "<p></p>"
  }),
      content = _React$useState[0].content,
      setContent = _React$useState[1];

  react["useEffect"](function () {
    setContent({
      content: transformed[0].rendered[transformed[0].rendered.length - 1] || "<p></p>"
    });
  }, [transformed[0].renderedHash]);

  if (transformed[0].rendered.length === 0) {
    return /*#__PURE__*/react["createElement"]("p", null, "loading ", transformed[0].renderedHash);
  } // function _html(x: number, y: number) {
  //   // console.log(rendered );
  //   return transformed[Number(x)] &&
  //       transformed[Number(x)].rendered[Number(y)] || "<p>uu</p>";
  // }transformed[Number(x)].rendered[Number(y)];


  var divLength = 1000 / (events.length + 1); // const transCopy = [...transformed].map((t)=>{t.rendered=[...t.rendered].reverse(); return t;});

  return /*#__PURE__*/react["createElement"]("div", {
    style: {
      position: "relative",
      textAlign: "right",
      width: width
    }
  }, transformed.map(function (t, k) {
    return /*#__PURE__*/react["createElement"]("div", {
      key: t.renderedHash + k
    }, "ss ", t.renderedHash, "ss", events.map(function (event, renderContentKey) {
      return /*#__PURE__*/react["createElement"]("div", {
        onMouseEnter: function onMouseEnter() {
          return setContent({
            content: t.rendered[renderContentKey]
          });
        },
        style: {
          display: "inline-block",
          textAlign: "center",
          borderLeft: "1px solid red",
          height: "20px",
          width: divLength
        },
        key: t.renderedHash + renderContentKey
      }, event);
    }));
  }), /*#__PURE__*/react["createElement"](framer_motion_es["a" /* motion */].div, {
    // layout
    drag: true,
    dragElastic: 0.1,
    dragMomentum: false,
    dragListener: true // onDrag={(event) => {
    //   const e = event as unknown as { layerX: number; layerY: number };
    //   // const htmlArray = new Array(100).fill(100);
    //   //console.log(event.layerY );
    //   const indexMaxY = transformed[0].rendered.length;
    //   let newIndexY = Math.floor(
    //     (indexMaxY * (e.layerY + 220)) / 200,
    //   );
    //   // console.log(event.layerY, newIndexY );
    //   if (newIndexY < 0) {
    //     newIndexY = 0;
    //   }
    //   if (newIndexY >= indexMaxY) {
    //     newIndexY = indexMaxY - 1;
    //   }
    //   const indexMax = transformed.length;
    //   let newIndex = Math.floor(
    //     (indexMax * (e.layerX + 909)) / 1000,
    //   );
    //   if (newIndex < 0) {
    //     // setIndexToShow({ yyy: newIndexY, xxx: 0 });
    //   }
    //   if (newIndex > indexMax) {
    //     // setIndexToShow({ yyy: newIndexY, xxx: indexMaxY });
    //     return;
    //   }
    //   setIndexToShow({ yyy: newIndexY, xxx: newIndex });
    // }}
    ,
    style: {
      position: "absolute",
      top: -220,
      right: 40
    }
  }, /*#__PURE__*/react["createElement"](ResultBox, null, /*#__PURE__*/react["createElement"](codeboxComponents_HtmlPlayer, {
    key: content,
    content: content,
    onEvent: onEvent
  }))));
};
// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









var monacoEditor;
var CodeBox_CodeBox = function CodeBox(_ref) {
  var title = _ref.title,
      children = _ref.children;
  var starterCode = (children === null || children === void 0 ? void 0 : children.toString().trim()) || example["a" /* counterExample */];
  if (typeof window === "undefined") return /*#__PURE__*/react["createElement"]("pre", null, "Loading");

  var _React$useState = react["useState"]({
    events: example["b" /* defaultProps */].events,
    hashEvents: "",
    hashArr: []
  }),
      _React$useState$ = _React$useState[0],
      events = _React$useState$.events,
      hashArr = _React$useState$.hashArr,
      changeProps = _React$useState[1];

  var _React$useState2 = react["useState"]({
    transformed: [],
    error: ""
  }),
      _React$useState2$ = _React$useState2[0],
      transformed = _React$useState2$.transformed,
      error = _React$useState2$.error,
      changeWorkerRenderedComponent = _React$useState2[1];

  var _React$useState3 = react["useState"](starterCode),
      code = _React$useState3[0],
      changeCode = _React$useState3[1];

  react["useEffect"](function () {
    function transformCode(_x, _x2) {
      return _transformCode.apply(this, arguments);
    }

    function _transformCode() {
      _transformCode = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(codeHash, errorMessage) {
        var _errorMessage;

        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (errorMessage) {
                  changeWorkerRenderedComponent(function (s) {
                    return _objectSpread(_objectSpread({}, s), {}, {
                      error: errorMessage
                    });
                  });
                }

                _context3.prev = 1;
                return _context3.abrupt("return", transform(codeHash));

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](1);
                _context3.next = 9;
                return Object(sha["b" /* unHash */])(_context3.t0);

              case 9:
                _errorMessage = _context3.sent;
                changeWorkerRenderedComponent(function (s) {
                  return _objectSpread(_objectSpread({}, s), {}, {
                    error: _errorMessage
                  });
                });
                return _context3.abrupt("return", false);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 5]]);
      }));
      return _transformCode.apply(this, arguments);
    }

    var runner = /*#__PURE__*/function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(c) {
        var monaco, model, tsWorker, modelUri, diag, comp, syntax, tsErrorMessageArr, tsErrorMessage, codeHash, tHash, hashArrValue, renderedHashContentHash, renderedHashContent, prevIndex, t, rendered, renderedHash;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return startMonaco({
                  language: "typescript",
                  code: c,
                  onChange: function onChange(code) {
                    return changeCode(code);
                  }
                });

              case 2:
                monaco = _context2.sent;
                // await window["monaco"].editor.colorizeElement(document.getElementById("container"))
                // const monaco: typeof Monaco = window["monaco"];
                model = monaco.editor.getModel("file:///main.tsx");
                monacoEditor = model;
                _context2.next = 7;
                return window["monaco"].languages.typescript.getTypeScriptWorker();

              case 7:
                tsWorker = _context2.sent;
                modelUri = model === null || model === void 0 ? void 0 : model.uri;

                if (modelUri) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return");

              case 11:
                _context2.next = 13;
                return tsWorker(modelUri);

              case 13:
                _context2.next = 15;
                return _context2.sent.getSemanticDiagnostics("file:///main.tsx");

              case 15:
                diag = _context2.sent;
                _context2.next = 18;
                return tsWorker(modelUri);

              case 18:
                _context2.next = 20;
                return _context2.sent.getCompilerOptionsDiagnostics("file:///main.tsx");

              case 20:
                comp = _context2.sent;
                _context2.next = 23;
                return tsWorker(modelUri);

              case 23:
                _context2.next = 25;
                return _context2.sent.getSyntacticDiagnostics("file:///main.tsx");

              case 25:
                syntax = _context2.sent;
                tsErrorMessageArr = [].concat(Object(toConsumableArray["a" /* default */])(diag), Object(toConsumableArray["a" /* default */])(comp), Object(toConsumableArray["a" /* default */])(syntax));
                tsErrorMessage = tsErrorMessageArr.length === 0 ? "" : tsErrorMessageArr[0].messageText.toString();
                console.log(monacoEditor); // const model = monacoEditor
                // console.log(fix);
                // model.set

                _context2.next = 31;
                return Object(sha["a" /* hash */])(c);

              case 31:
                codeHash = _context2.sent;
                _context2.next = 34;
                return transformCode(codeHash, tsErrorMessage);

              case 34:
                tHash = _context2.sent;
                _context2.next = 37;
                return Object(sha["a" /* hash */])({
                  events: [example["b" /* defaultProps */].events[0]]
                });

              case 37:
                hashArrValue = _context2.sent;

                if (!(!tHash || tsErrorMessage)) {
                  _context2.next = 40;
                  break;
                }

                return _context2.abrupt("return");

              case 40:
                _context2.next = 42;
                return render(tHash, hashArrValue);

              case 42:
                renderedHashContentHash = _context2.sent;

                if (!(typeof renderedHashContentHash === "string")) {
                  _context2.next = 49;
                  break;
                }

                _context2.next = 46;
                return Object(sha["b" /* unHash */])(renderedHashContentHash);

              case 46:
                _context2.t0 = _context2.sent;
                _context2.next = 50;
                break;

              case 49:
                _context2.t0 = "<p>Error</p>";

              case 50:
                renderedHashContent = _context2.t0;
                prevIndex = transformed.findIndex(function (x) {
                  return x.hash === tHash;
                });

                if (!(prevIndex > 0)) {
                  _context2.next = 57;
                  break;
                }

                t = Object(toConsumableArray["a" /* default */])(transformed.slice(prevIndex, transformed.length));
                if (t[0].code[0] !== codeHash) t[0].code = [codeHash].concat(Object(toConsumableArray["a" /* default */])(t[0].code));

                if (code === c) {
                  changeWorkerRenderedComponent(function (s) {
                    return _objectSpread(_objectSpread({}, s), {}, {
                      error: "",
                      transformed: Object(toConsumableArray["a" /* default */])(transformed.slice(prevIndex))
                    });
                  });
                }

                return _context2.abrupt("return");

              case 57:
                rendered = [typeof renderedHashContent === "string" ? renderedHashContent : "<p>Error</p>"];
                _context2.next = 60;
                return Object(sha["a" /* hash */])(rendered);

              case 60:
                renderedHash = _context2.sent;

                if (code === c) {
                  changeWorkerRenderedComponent(function (s) {
                    return _objectSpread(_objectSpread({}, s), {}, {
                      error: "",
                      transformed: [{
                        hash: tHash,
                        code: [codeHash],
                        renderedHash: renderedHash,
                        rendered: rendered
                      }].concat(Object(toConsumableArray["a" /* default */])(s.transformed))
                    });
                  });
                  hashArr.forEach(function (h, hashI) {
                    if (hashI > rendered.length) {
                      hashArr.forEach( /*#__PURE__*/function () {
                        var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(h, tk) {
                          var renderedHash, renderHtml, renderedHashVal;
                          return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return render(tHash, h);

                                case 2:
                                  renderedHash = _context.sent;

                                  if (!(typeof renderedHash === "string")) {
                                    _context.next = 17;
                                    break;
                                  }

                                  _context.next = 6;
                                  return Object(sha["b" /* unHash */])(renderedHash);

                                case 6:
                                  renderHtml = _context.sent;
                                  rendered[tk] = renderHtml;

                                  if (!(rendered.length === hashArr.length)) {
                                    _context.next = 14;
                                    break;
                                  }

                                  _context.next = 11;
                                  return Object(sha["a" /* hash */])(rendered);

                                case 11:
                                  _context.t0 = _context.sent;
                                  _context.next = 15;
                                  break;

                                case 14:
                                  _context.t0 = "";

                                case 15:
                                  renderedHashVal = _context.t0;
                                  changeWorkerRenderedComponent(function (s) {
                                    s.transformed[0].rendered[tk] = renderHtml;

                                    if (s.transformed[0].rendered.length === hashArr.length) {
                                      s.transformed[0].renderedHash = renderedHashVal;
                                    }

                                    return s;
                                  });

                                case 17:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x4, _x5) {
                          return _ref3.apply(this, arguments);
                        };
                      }());
                    }
                  });
                }

              case 62:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function runner(_x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    runner(code);
  }, [code]);
  react["useEffect"](function () {
    if (events.length !== hashArr.length) return;
    hashArr.forEach(function (h, hashI) {
      if (hashI > transformed[0].rendered.length) {
        transformed.forEach( /*#__PURE__*/function () {
          var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(t, tk) {
            var renderedHash, rendered, renderedCopy, renderedHashVal;
            return regenerator_default.a.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(t.rendered.length < hashI)) {
                      _context4.next = 14;
                      break;
                    }

                    _context4.next = 3;
                    return render(t.hash, h);

                  case 3:
                    renderedHash = _context4.sent;

                    if (!(typeof renderedHash === "string")) {
                      _context4.next = 14;
                      break;
                    }

                    _context4.next = 7;
                    return Object(sha["b" /* unHash */])(renderedHash);

                  case 7:
                    rendered = _context4.sent;
                    renderedCopy = Object(toConsumableArray["a" /* default */])(t.rendered);
                    renderedCopy[tk] = rendered;
                    _context4.next = 12;
                    return Object(sha["a" /* hash */])(renderedCopy);

                  case 12:
                    renderedHashVal = _context4.sent;
                    changeWorkerRenderedComponent(function (s) {
                      s.transformed[tk].rendered[hashI] = rendered;

                      if (s.transformed[tk].rendered.length === hashArr.length) {
                        s.transformed[tk].renderedHash = renderedHashVal;
                      }

                      return s;
                    });

                  case 14:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x6, _x7) {
            return _ref4.apply(this, arguments);
          };
        }());
      }
    });
  }, [transformed.length]);
  react["useEffect"](function () {
    if (events.length > hashArr.length || events.length > transformed[0].rendered.length) {
      events.forEach( /*#__PURE__*/function () {
        var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(v, k) {
          var hashArrValue, hashCopy, hashArrHash;
          return regenerator_default.a.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(k < hashArr.length)) {
                    _context6.next = 2;
                    break;
                  }

                  return _context6.abrupt("return");

                case 2:
                  _context6.next = 4;
                  return Object(sha["a" /* hash */])({
                    events: events.slice(0, k)
                  });

                case 4:
                  hashArrValue = _context6.sent;
                  hashCopy = Object(toConsumableArray["a" /* default */])(hashArrValue);
                  hashCopy[k] = hashArrValue;
                  _context6.next = 9;
                  return Object(sha["a" /* hash */])(hashCopy);

                case 9:
                  hashArrHash = _context6.sent;
                  changeProps(function (p) {
                    p.hashArr[k] = hashArrValue;
                    p.hashEvents = hashArrHash;
                    return p;
                  });
                  transformed.forEach( /*#__PURE__*/function () {
                    var _ref6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(t, tk) {
                      var renderedHash, rendered, renderedCopy, renderedHashVal;
                      return regenerator_default.a.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(t.rendered.length < k)) {
                                _context5.next = 14;
                                break;
                              }

                              _context5.next = 3;
                              return render(t.hash, hashArrValue);

                            case 3:
                              renderedHash = _context5.sent;

                              if (!(typeof renderedHash === "string")) {
                                _context5.next = 14;
                                break;
                              }

                              _context5.next = 7;
                              return Object(sha["b" /* unHash */])(renderedHash);

                            case 7:
                              rendered = _context5.sent;
                              renderedCopy = Object(toConsumableArray["a" /* default */])(t.rendered);
                              renderedCopy[tk] = rendered;
                              _context5.next = 12;
                              return Object(sha["a" /* hash */])(renderedCopy);

                            case 12:
                              renderedHashVal = _context5.sent;
                              changeWorkerRenderedComponent(function (s) {
                                s.transformed[tk].rendered[k] = rendered;
                                s.transformed[tk].renderedHash = renderedHashVal;
                                return s;
                              });

                            case 14:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    return function (_x10, _x11) {
                      return _ref6.apply(this, arguments);
                    };
                  }());

                case 12:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, [events.length]); // React.useEffect(() => {
  //   transformed.forEach(async (t, ind) => {
  //     const hash = t.hash;
  //     hashArr.forEach(async (p, pIndex) => {
  //       const htmlHash = await render(hash, p);
  //       const html = (typeof htmlHash === "string")
  //         ? await unHash(htmlHash)
  //         : "<p>Error</p>";
  //       changeWorkerRenderedComponent((x) => {
  //         const tInd = x.transformed.findIndex((t) => t.hash === hash);
  //         if (tInd === -1) {
  //           return x;
  //         }
  //         x.transformed[tInd].rendered[pIndex] = html;
  //         return x;
  //       });
  //     });
  //     // arr.push(props.hashArr.map((val, ind)=> map[t.hash][ind]));
  //   });
  // }, [hashArr.length]);

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, !!title && /*#__PURE__*/react["createElement"](Header, null, /*#__PURE__*/react["createElement"]("span", null, title), /*#__PURE__*/react["createElement"]("button", {
    onClick: /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7() {
      var hash, dataObj, body, request, response;
      return regenerator_default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              hash = transformed[0].code[0];
              _context7.t0 = hash;
              _context7.t1 = transformed[0].hash;
              _context7.next = 5;
              return Object(sha["b" /* unHash */])(transformed[0].code[0]);

            case 5:
              _context7.t2 = _context7.sent;
              _context7.next = 8;
              return Object(sha["b" /* unHash */])(transformed[0].hash);

            case 8:
              _context7.t3 = _context7.sent;
              dataObj = {
                codeHash: _context7.t0,
                transpiledHash: _context7.t1,
                code: _context7.t2,
                transpiledCode: _context7.t3
              };
              body = {
                results: [dataObj],
                errors: null,
                msg: ""
              };
              request = new Request("https://my-ts-project.zed-vision.workers.dev", {
                body: JSON.stringify(body),
                method: "POST",
                headers: {
                  "content-type": "application/json;charset=UTF-8"
                }
              });
              _context7.next = 14;
              return fetch(request);

            case 14:
              response = _context7.sent;
              console.log(response);

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))
  }, "Save")), /*#__PURE__*/react["createElement"](CodeContainer, {
    id: "container"
  }), /*#__PURE__*/react["createElement"](CodeContainer, {
    style: {
      display: "none"
    },
    id: "ace"
  }), error ? /*#__PURE__*/react["createElement"](ErrorContainer, null, /*#__PURE__*/react["createElement"]("pre", null, error.toString()), /*#__PURE__*/react["createElement"]("button", {
    onClick: /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8() {
      var code;
      return regenerator_default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return Object(sha["b" /* unHash */])(transformed[0].code[0]);

            case 2:
              code = _context8.sent;
              monacoEditor.setValue(code);
              changeCode(code);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))
  }, "Restore to the last working version")) : transformed.length > 0 ? /*#__PURE__*/react["createElement"](ResultContainer, null, /*#__PURE__*/react["createElement"](codeboxComponents_ResultComponent, {
    transformed: transformed,
    key: transformed[0].renderedHash,
    events: events,
    onEvent: function onEvent(ev) {
      changeProps(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          events: [].concat(Object(toConsumableArray["a" /* default */])(p.events), [ev])
        });
      });
    }
  })) : /*#__PURE__*/react["createElement"](react["Fragment"], null));
};

/***/ })

}]);