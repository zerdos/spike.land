(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[14],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _components_utils_babel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46);
/* harmony import */ var _components_utils_renderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(48);
/* harmony import */ var react_diff_viewer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(160);
/* harmony import */ var react_diff_viewer__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_diff_viewer__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var html_format__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(169);
/* harmony import */ var html_format__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(html_format__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1);







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }









var Wrapper = function Wrapper(_ref) {
  var code = _ref.code,
      innerHTML = _ref.innerHTML,
      renderHash = _ref.renderHash,
      message = _ref.message,
      defaultProps = _ref.defaultProps,
      onEvent = _ref.onEvent;

  if (!code || !renderHash) {
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, "Loading");
  } // <Counter
  //   startState={{ counter: 0 }}
  //   events={[]}
  //   onEvent={(e) => {
  //     console.log(e);
  //   }}
  // />;


  var getComponent = function getComponent(code, props) {
    // console.log()''
    try {
      var componentFactory = new Function("props", "React", "try{" + code + "; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement(\"div\", null, \"Error in render\")}");

      var _Component = function _Component(props) {
        return componentFactory(_objectSpread(_objectSpread({}, props), {}, {
          onEvent: onEvent
        }), react__WEBPACK_IMPORTED_MODULE_6__);
      };

      return _Component;
    } catch (e) {
      console.log("ERROR", e);
      return null;
    }
  };

  var Component = getComponent(code, defaultProps);
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, Component && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(Component, {
    events: defaultProps.events,
    onEvent: onEvent
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("pre", null, message));
};

var ContainerFullWidth = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])("div", {
  target: "eh095380"
})( true ? {
  name: "1gm5zi8",
  styles: "width:40%;float:left;"
} : undefined);

var ContainerLeftFloat = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])("div", {
  target: "eh095381"
})( true ? {
  name: "1vm3mq1",
  styles: "width:100;"
} : undefined);

var StyledContainer = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])("div", {
  target: "eh095382"
})( true ? {
  name: "6fcjor",
  styles: "background:white;padding:12px;width:200px;height:100px;margin:auto;display:block;border:2px solid red;"
} : undefined);

var counter = "\nimport * as React from \"react\";\n\nconst defaultState = {\n  counter: 0,\n};\ntype DState = typeof defaultState;\n\nconst actions: {\n  [key: string]: (s: DState) => DState;\n} = {\n  \"reset\": (s) => ({ ...s, ...defaultState }),\n  \"+1\": (s) => ({ ...s, counter: s.counter + 1 }),\n  \"-1\": (s) => ({ ...s, counter: s.counter - 1 }),\n};\n\ntype ActionType = keyof typeof actions;\n\ninterface Props {\n  events: string[];\n  onEvent: (str: string) => void;\n}\n\nexport const Counter: React.FC<Props> = (\n  { events, onEvent },\n) => {\n  const calculatedState = events.reduce(\n    (prevValue, currentValue) => actions[currentValue](prevValue),\n    {} as unknown as DState,\n  ) as DState;\n\n  const [state, setState] = React.useState({ calculatedState, events });\n\n  return <div>\n    <button {...update(\"-1\")}>-</button>\n    {calculatedState.counter}\n    <button {...update(\"+1\")}>+</button>\n  </div>;\n\n  function update(action: ActionType) {\n    return {\n      \"data-onclick\": String(action),\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        onEvent(String(action));\n        setState(\n          { ...state, events: [...state.events, String(action)] },\n        );\n      },\n    };\n  }\n};\n";
var monaco = false;
var defaultProps = {
  events: new Array(8).fill("+1")
};
function Page() {
  if (typeof window === "undefined") return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, "Loading");

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_6__["useState"]({
    isError: false,
    code: counter,
    transformedCode: "",
    mainCode: counter,
    mainCodeHash: "",
    devCodeHash: "",
    defaultProps: defaultProps,
    defaultStateHash: "",
    codeHash: "",
    transformedMainCode: "",
    transformedHash: "",
    transformedMainHash: "",
    renderedHash: "",
    renderedContent: "",
    renderedMainHash: "",
    renderedContentMain: ""
  }),
      renderedComponent = _React$useState[0],
      changeWorkerRenderedComponent = _React$useState[1];

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_6__["useState"](counter),
      code = _React$useState2[0],
      changeCode = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_6__["useEffect"](function () {
    var runner = /*#__PURE__*/function () {
      var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        var _yield$yield$Function, startMonaco, runnerHash, devCodeHash, codeHash, mainCode, mainCodeHash, transformedHash, transformedMainHash, defaultStateHash, transformedCode, transformedMainCode, renderedHash, renderedMainHash, renderedContent, renderedContentMain, runnerHash2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (monaco) {
                  _context.next = 10;
                  break;
                }

                monaco = true;
                _context.next = 4;
                return Function("return import('https://unpkg.com/@zedvision/smart-monaco-editor@6.4.4/lib/editor.js')");

              case 4:
                _context.t0 = _context.sent;
                _context.next = 7;
                return (0, _context.t0)();

              case 7:
                _yield$yield$Function = _context.sent;
                startMonaco = _yield$yield$Function.startMonaco;
                startMonaco({
                  language: "typescript",
                  code: code,
                  onChange: function onChange(code) {
                    return changeCode(code);
                  }
                });

              case 10:
                _context.next = 12;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(renderedComponent);

              case 12:
                runnerHash = _context.sent;
                _context.next = 15;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(code);

              case 15:
                devCodeHash = _context.sent;
                codeHash = devCodeHash;
                mainCode = renderedComponent.mainCode ? renderedComponent.mainCode : code;
                mainCodeHash = renderedComponent.mainCodeHash ? renderedComponent.mainCodeHash : devCodeHash;
                _context.next = 21;
                return Object(_components_utils_babel__WEBPACK_IMPORTED_MODULE_8__[/* transform */ "a"])(codeHash);

              case 21:
                transformedHash = _context.sent;
                _context.next = 24;
                return Object(_components_utils_babel__WEBPACK_IMPORTED_MODULE_8__[/* transform */ "a"])(mainCodeHash);

              case 24:
                transformedMainHash = _context.sent;
                _context.next = 27;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(renderedComponent.defaultProps);

              case 27:
                defaultStateHash = _context.sent;

                if (transformedHash) {
                  _context.next = 31;
                  break;
                }

                changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
                  isError: true
                }));
                return _context.abrupt("return");

              case 31:
                _context.next = 33;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* unHash */ "b"])(transformedHash);

              case 33:
                transformedCode = _context.sent;
                _context.next = 36;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* unHash */ "b"])(transformedMainHash);

              case 36:
                transformedMainCode = _context.sent;
                _context.next = 39;
                return Object(_components_utils_renderer__WEBPACK_IMPORTED_MODULE_9__[/* render */ "a"])(transformedHash, defaultStateHash);

              case 39:
                renderedHash = _context.sent;
                _context.next = 42;
                return Object(_components_utils_renderer__WEBPACK_IMPORTED_MODULE_9__[/* render */ "a"])(transformedMainHash, defaultStateHash);

              case 42:
                renderedMainHash = _context.sent;

                if (!(typeof renderedHash !== "string")) {
                  _context.next = 45;
                  break;
                }

                return _context.abrupt("return");

              case 45:
                _context.next = 47;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* unHash */ "b"])(renderedHash);

              case 47:
                renderedContent = _context.sent;
                _context.next = 50;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* unHash */ "b"])(renderedMainHash);

              case 50:
                renderedContentMain = _context.sent;
                _context.next = 53;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(renderedComponent);

              case 53:
                runnerHash2 = _context.sent;

                if (runnerHash === runnerHash2) {
                  changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
                    code: code,
                    devCodeHash: devCodeHash,
                    mainCode: mainCode,
                    mainCodeHash: mainCodeHash,
                    codeHash: codeHash,
                    transformedHash: transformedHash,
                    transformedMainCode: transformedMainCode,
                    transformedMainHash: transformedMainHash,
                    transformedCode: transformedCode,
                    defaultStateHash: defaultStateHash,
                    renderedHash: renderedHash,
                    renderedContent: renderedContent,
                    renderedMainHash: renderedMainHash,
                    renderedContentMain: renderedContentMain
                  }));
                }

              case 55:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function runner() {
        return _ref2.apply(this, arguments);
      };
    }();

    runner();
  }, [code, renderedComponent.defaultProps]);
  var isChangeAvailable = renderedComponent.renderedContent && renderedComponent.renderedMainHash !== renderedComponent.renderedHash;
  var isError = !renderedComponent.renderedContent; // const highlightSyntax = (str: string) =>
  //   <pre
  //     style={{ display: "inline" }}
  //     dangerouslySetInnerHTML={{
  //       __html: Prism.highlight((str), Prism.languages["html"], "html"),
  //     }}
  //   />;

  var onEvent = function onEvent(action) {
    return changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
      defaultProps: _objectSpread(_objectSpread({}, renderedComponent.defaultProps), {}, {
        events: [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(renderedComponent.defaultProps.events), [action])
      })
    }));
  };

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(ContainerFullWidth, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(ContainerLeftFloat, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", {
    id: "container",
    style: {
      width: "100%",
      height: "100%"
    }
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(ContainerLeftFloat, null, isError && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("h1", null, "Error"), !isChangeAvailable && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("h4", null, "Result"), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(StyledContainer, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(Wrapper, {
    key: renderedComponent.codeHash,
    renderHash: renderedComponent.renderedHash,
    code: renderedComponent.transformedCode,
    innerHTML: renderedComponent.renderedContent,
    defaultProps: _objectSpread({}, renderedComponent.defaultProps),
    onEvent: onEvent
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("pre", null, "\n\n        codeHash      " + renderedComponent.codeHash + "\n        renderedHash      " + renderedComponent.renderedHash + "\n        \n        events        " + renderedComponent.defaultProps.events + "\n        eventsHash   " + renderedComponent.defaultStateHash + "\n                  ")), isChangeAvailable && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(react_diff_viewer__WEBPACK_IMPORTED_MODULE_10___default.a, {
    oldValue: html_format__WEBPACK_IMPORTED_MODULE_11___default()(renderedComponent.renderedContent),
    newValue: html_format__WEBPACK_IMPORTED_MODULE_11___default()(renderedComponent.renderedContentMain),
    showDiffOnly: true,
    useDarkTheme: true // renderContent={highlightSyntax}
    ,
    leftTitle: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(StyledContainer, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(Wrapper, {
      key: renderedComponent.codeHash,
      renderHash: renderedComponent.renderedHash,
      innerHTML: renderedComponent.renderedContent,
      code: renderedComponent.transformedCode,
      defaultProps: _objectSpread({}, renderedComponent.defaultProps),
      onEvent: onEvent
    })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("pre", null, "\n            codeHash         " + renderedComponent.codeHash + "\n            events           " + renderedComponent.defaultProps.events + "\n            eventsHash       " + renderedComponent.defaultStateHash + "\n                      "), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("button", {
      onClick: function onClick() {
        return changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
          mainCodeHash: renderedComponent.codeHash,
          renderedContentMain: renderedComponent.renderedContent,
          renderedMainHash: renderedComponent.renderedHash
        }));
      }
    }, "Save change - as main code")),
    rightTitle: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(StyledContainer, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])(Wrapper, {
      key: renderedComponent.mainCodeHash,
      code: renderedComponent.transformedMainCode,
      innerHTML: renderedComponent.renderedContentMain,
      renderHash: renderedComponent.renderedMainHash,
      defaultProps: renderedComponent.defaultProps,
      onEvent: onEvent
    })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("pre", null, "\n            codeHash      " + renderedComponent.mainCodeHash + "\n            events        " + renderedComponent.defaultProps.events + "\n            eventsHash   " + renderedComponent.defaultStateHash + "\n                      ")), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("button", {
      onClick: function onClick() {
        changeCode(renderedComponent.mainCode);
        changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
          code: renderedComponent.mainCode
        }));
      }
    }, "Restore the the code to this version")),
    hideLineNumbers: true,
    splitView: true
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_12__[/* jsx */ "b"])("div", {
    id: "player",
    style: {
      display: "block",
      width: "200px",
      height: "200px",
      background: "red"
    }
  })));
}

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(0);

var classnames_1 = __webpack_require__(161);

var compute_lines_1 = __webpack_require__(162);

exports.DiffMethod = compute_lines_1.DiffMethod;

var styles_1 = __webpack_require__(167); // eslint-disable-next-line @typescript-eslint/no-var-requires


var m = __webpack_require__(168);

var memoize = m.default || m;
var LineNumberPrefix;

(function (LineNumberPrefix) {
  LineNumberPrefix["LEFT"] = "L";
  LineNumberPrefix["RIGHT"] = "R";
})(LineNumberPrefix = exports.LineNumberPrefix || (exports.LineNumberPrefix = {}));

var DiffViewer =
/** @class */
function (_super) {
  __extends(DiffViewer, _super);

  function DiffViewer(props) {
    var _this = _super.call(this, props) || this;
    /**
     * Resets code block expand to the initial stage. Will be exposed to the parent component via
     * refs.
     */


    _this.resetCodeBlocks = function () {
      if (_this.state.expandedBlocks.length > 0) {
        _this.setState({
          expandedBlocks: []
        });

        return true;
      }

      return false;
    };
    /**
     * Pushes the target expanded code block to the state. During the re-render,
     * this value is used to expand/fold unmodified code.
     */


    _this.onBlockExpand = function (id) {
      var prevState = _this.state.expandedBlocks.slice();

      prevState.push(id);

      _this.setState({
        expandedBlocks: prevState
      });
    };
    /**
     * Computes final styles for the diff viewer. It combines the default styles with the user
     * supplied overrides. The computed styles are cached with performance in mind.
     *
     * @param styles User supplied style overrides.
     */


    _this.computeStyles = memoize(styles_1.default);
    /**
     * Returns a function with clicked line number in the closure. Returns an no-op function when no
     * onLineNumberClick handler is supplied.
     *
     * @param id Line id of a line.
     */

    _this.onLineNumberClickProxy = function (id) {
      if (_this.props.onLineNumberClick) {
        return function (e) {
          return _this.props.onLineNumberClick(id, e);
        };
      }

      return function () {};
    };
    /**
     * Maps over the word diff and constructs the required React elements to show word diff.
     *
     * @param diffArray Word diff information derived from line information.
     * @param renderer Optional renderer to format diff words. Useful for syntax highlighting.
     */


    _this.renderWordDiff = function (diffArray, renderer) {
      return diffArray.map(function (wordDiff, i) {
        var _a;

        return React.createElement("span", {
          key: i,
          className: classnames_1.default(_this.styles.wordDiff, (_a = {}, _a[_this.styles.wordAdded] = wordDiff.type === compute_lines_1.DiffType.ADDED, _a[_this.styles.wordRemoved] = wordDiff.type === compute_lines_1.DiffType.REMOVED, _a))
        }, renderer ? renderer(wordDiff.value) : wordDiff.value);
      });
    };
    /**
     * Maps over the line diff and constructs the required react elements to show line diff. It calls
     * renderWordDiff when encountering word diff. This takes care of both inline and split view line
     * renders.
     *
     * @param lineNumber Line number of the current line.
     * @param type Type of diff of the current line.
     * @param prefix Unique id to prefix with the line numbers.
     * @param value Content of the line. It can be a string or a word diff array.
     * @param additionalLineNumber Additional line number to be shown. Useful for rendering inline
     *  diff view. Right line number will be passed as additionalLineNumber.
     * @param additionalPrefix Similar to prefix but for additional line number.
     */


    _this.renderLine = function (lineNumber, type, prefix, value, additionalLineNumber, additionalPrefix) {
      var _a, _b, _c, _d;

      var lineNumberTemplate = prefix + "-" + lineNumber;
      var additionalLineNumberTemplate = additionalPrefix + "-" + additionalLineNumber;

      var highlightLine = _this.props.highlightLines.includes(lineNumberTemplate) || _this.props.highlightLines.includes(additionalLineNumberTemplate);

      var added = type === compute_lines_1.DiffType.ADDED;
      var removed = type === compute_lines_1.DiffType.REMOVED;
      var content;

      if (Array.isArray(value)) {
        content = _this.renderWordDiff(value, _this.props.renderContent);
      } else if (_this.props.renderContent) {
        content = _this.props.renderContent(value);
      } else {
        content = value;
      }

      return React.createElement(React.Fragment, null, !_this.props.hideLineNumbers && React.createElement("td", {
        onClick: lineNumber && _this.onLineNumberClickProxy(lineNumberTemplate),
        className: classnames_1.default(_this.styles.gutter, (_a = {}, _a[_this.styles.emptyGutter] = !lineNumber, _a[_this.styles.diffAdded] = added, _a[_this.styles.diffRemoved] = removed, _a[_this.styles.highlightedGutter] = highlightLine, _a))
      }, React.createElement("pre", {
        className: _this.styles.lineNumber
      }, lineNumber)), !_this.props.splitView && !_this.props.hideLineNumbers && React.createElement("td", {
        onClick: additionalLineNumber && _this.onLineNumberClickProxy(additionalLineNumberTemplate),
        className: classnames_1.default(_this.styles.gutter, (_b = {}, _b[_this.styles.emptyGutter] = !additionalLineNumber, _b[_this.styles.diffAdded] = added, _b[_this.styles.diffRemoved] = removed, _b[_this.styles.highlightedGutter] = highlightLine, _b))
      }, React.createElement("pre", {
        className: _this.styles.lineNumber
      }, additionalLineNumber)), React.createElement("td", {
        className: classnames_1.default(_this.styles.marker, (_c = {}, _c[_this.styles.emptyLine] = !content, _c[_this.styles.diffAdded] = added, _c[_this.styles.diffRemoved] = removed, _c[_this.styles.highlightedLine] = highlightLine, _c))
      }, React.createElement("pre", null, added && '+', removed && '-')), React.createElement("td", {
        className: classnames_1.default(_this.styles.content, (_d = {}, _d[_this.styles.emptyLine] = !content, _d[_this.styles.diffAdded] = added, _d[_this.styles.diffRemoved] = removed, _d[_this.styles.highlightedLine] = highlightLine, _d))
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, content)));
    };
    /**
     * Generates lines for split view.
     *
     * @param obj Line diff information.
     * @param obj.left Life diff information for the left pane of the split view.
     * @param obj.right Life diff information for the right pane of the split view.
     * @param index React key for the lines.
     */


    _this.renderSplitView = function (_a, index) {
      var left = _a.left,
          right = _a.right;
      return React.createElement("tr", {
        key: index,
        className: _this.styles.line
      }, _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value), _this.renderLine(right.lineNumber, right.type, LineNumberPrefix.RIGHT, right.value));
    };
    /**
     * Generates lines for inline view.
     *
     * @param obj Line diff information.
     * @param obj.left Life diff information for the added section of the inline view.
     * @param obj.right Life diff information for the removed section of the inline view.
     * @param index React key for the lines.
     */


    _this.renderInlineView = function (_a, index) {
      var left = _a.left,
          right = _a.right;
      var content;

      if (left.type === compute_lines_1.DiffType.REMOVED && right.type === compute_lines_1.DiffType.ADDED) {
        return React.createElement(React.Fragment, {
          key: index
        }, React.createElement("tr", {
          className: _this.styles.line
        }, _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null)), React.createElement("tr", {
          className: _this.styles.line
        }, _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber)));
      }

      if (left.type === compute_lines_1.DiffType.REMOVED) {
        content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null);
      }

      if (left.type === compute_lines_1.DiffType.DEFAULT) {
        content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, right.lineNumber, LineNumberPrefix.RIGHT);
      }

      if (right.type === compute_lines_1.DiffType.ADDED) {
        content = _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber);
      }

      return React.createElement("tr", {
        key: index,
        className: _this.styles.line
      }, content);
    };
    /**
     * Returns a function with clicked block number in the closure.
     *
     * @param id Cold fold block id.
     */


    _this.onBlockClickProxy = function (id) {
      return function () {
        return _this.onBlockExpand(id);
      };
    };
    /**
     * Generates cold fold block. It also uses the custom message renderer when available to show
     * cold fold messages.
     *
     * @param num Number of skipped lines between two blocks.
     * @param blockNumber Code fold block id.
     * @param leftBlockLineNumber First left line number after the current code fold block.
     * @param rightBlockLineNumber First right line number after the current code fold block.
     */


    _this.renderSkippedLineIndicator = function (num, blockNumber, leftBlockLineNumber, rightBlockLineNumber) {
      var _a;

      var _b = _this.props,
          hideLineNumbers = _b.hideLineNumbers,
          splitView = _b.splitView;
      var message = _this.props.codeFoldMessageRenderer ? _this.props.codeFoldMessageRenderer(num, leftBlockLineNumber, rightBlockLineNumber) : React.createElement("pre", {
        className: _this.styles.codeFoldContent
      }, "Expand ", num, " lines ...");
      var content = React.createElement("td", null, React.createElement("a", {
        onClick: _this.onBlockClickProxy(blockNumber),
        tabIndex: 0
      }, message));
      var isUnifiedViewWithoutLineNumbers = !splitView && !hideLineNumbers;
      return React.createElement("tr", {
        key: leftBlockLineNumber + "-" + rightBlockLineNumber,
        className: _this.styles.codeFold
      }, !hideLineNumbers && React.createElement("td", {
        className: _this.styles.codeFoldGutter
      }), React.createElement("td", {
        className: classnames_1.default((_a = {}, _a[_this.styles.codeFoldGutter] = isUnifiedViewWithoutLineNumbers, _a))
      }), isUnifiedViewWithoutLineNumbers ? React.createElement(React.Fragment, null, React.createElement("td", null), content) : React.createElement(React.Fragment, null, content, React.createElement("td", null)), React.createElement("td", null), React.createElement("td", null));
    };
    /**
     * Generates the entire diff view.
     */


    _this.renderDiff = function () {
      var _a = _this.props,
          oldValue = _a.oldValue,
          newValue = _a.newValue,
          splitView = _a.splitView,
          disableWordDiff = _a.disableWordDiff,
          compareMethod = _a.compareMethod,
          linesOffset = _a.linesOffset;

      var _b = compute_lines_1.computeLineInformation(oldValue, newValue, disableWordDiff, compareMethod, linesOffset),
          lineInformation = _b.lineInformation,
          diffLines = _b.diffLines;

      var extraLines = _this.props.extraLinesSurroundingDiff < 0 ? 0 : _this.props.extraLinesSurroundingDiff;
      var skippedLines = [];
      return lineInformation.map(function (line, i) {
        var diffBlockStart = diffLines[0];
        var currentPosition = diffBlockStart - i;

        if (_this.props.showDiffOnly) {
          if (currentPosition === -extraLines) {
            skippedLines = [];
            diffLines.shift();
          }

          if (line.left.type === compute_lines_1.DiffType.DEFAULT && (currentPosition > extraLines || typeof diffBlockStart === 'undefined') && !_this.state.expandedBlocks.includes(diffBlockStart)) {
            skippedLines.push(i + 1);

            if (i === lineInformation.length - 1 && skippedLines.length > 1) {
              return _this.renderSkippedLineIndicator(skippedLines.length, diffBlockStart, line.left.lineNumber, line.right.lineNumber);
            }

            return null;
          }
        }

        var diffNodes = splitView ? _this.renderSplitView(line, i) : _this.renderInlineView(line, i);

        if (currentPosition === extraLines && skippedLines.length > 0) {
          var length_1 = skippedLines.length;
          skippedLines = [];
          return React.createElement(React.Fragment, {
            key: i
          }, _this.renderSkippedLineIndicator(length_1, diffBlockStart, line.left.lineNumber, line.right.lineNumber), diffNodes);
        }

        return diffNodes;
      });
    };

    _this.render = function () {
      var _a;

      var _b = _this.props,
          oldValue = _b.oldValue,
          newValue = _b.newValue,
          useDarkTheme = _b.useDarkTheme,
          leftTitle = _b.leftTitle,
          rightTitle = _b.rightTitle,
          splitView = _b.splitView,
          hideLineNumbers = _b.hideLineNumbers;

      if (typeof oldValue !== 'string' || typeof newValue !== 'string') {
        throw Error('"oldValue" and "newValue" should be strings');
      }

      _this.styles = _this.computeStyles(_this.props.styles, useDarkTheme);

      var nodes = _this.renderDiff();

      var colSpanOnSplitView = hideLineNumbers ? 2 : 3;
      var colSpanOnInlineView = hideLineNumbers ? 2 : 4;
      var title = (leftTitle || rightTitle) && React.createElement("tr", null, React.createElement("td", {
        colSpan: splitView ? colSpanOnSplitView : colSpanOnInlineView,
        className: _this.styles.titleBlock
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, leftTitle)), splitView && React.createElement("td", {
        colSpan: colSpanOnSplitView,
        className: _this.styles.titleBlock
      }, React.createElement("pre", {
        className: _this.styles.contentText
      }, rightTitle)));
      return React.createElement("table", {
        className: classnames_1.default(_this.styles.diffContainer, (_a = {}, _a[_this.styles.splitView] = splitView, _a))
      }, React.createElement("tbody", null, title, nodes));
    };

    _this.state = {
      expandedBlocks: []
    };
    return _this;
  }

  DiffViewer.defaultProps = {
    oldValue: '',
    newValue: '',
    splitView: true,
    highlightLines: [],
    disableWordDiff: false,
    compareMethod: compute_lines_1.DiffMethod.CHARS,
    styles: {},
    hideLineNumbers: false,
    extraLinesSurroundingDiff: 3,
    showDiffOnly: true,
    useDarkTheme: false,
    linesOffset: 0
  };
  return DiffViewer;
}(React.Component);

exports.default = DiffViewer;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(163);

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var diff = __webpack_require__(166);

var jsDiff = diff;
var DiffType;

(function (DiffType) {
  DiffType[DiffType["DEFAULT"] = 0] = "DEFAULT";
  DiffType[DiffType["ADDED"] = 1] = "ADDED";
  DiffType[DiffType["REMOVED"] = 2] = "REMOVED";
})(DiffType = exports.DiffType || (exports.DiffType = {})); // See https://github.com/kpdecker/jsdiff/tree/v4.0.1#api for more info on the below JsDiff methods


var DiffMethod;

(function (DiffMethod) {
  DiffMethod["CHARS"] = "diffChars";
  DiffMethod["WORDS"] = "diffWords";
  DiffMethod["WORDS_WITH_SPACE"] = "diffWordsWithSpace";
  DiffMethod["LINES"] = "diffLines";
  DiffMethod["TRIMMED_LINES"] = "diffTrimmedLines";
  DiffMethod["SENTENCES"] = "diffSentences";
  DiffMethod["CSS"] = "diffCss";
})(DiffMethod = exports.DiffMethod || (exports.DiffMethod = {}));
/**
 * Splits diff text by new line and computes final list of diff lines based on
 * conditions.
 *
 * @param value Diff text from the js diff module.
 */


var constructLines = function constructLines(value) {
  var lines = value.split('\n');
  var isAllEmpty = lines.every(function (val) {
    return !val;
  });

  if (isAllEmpty) {
    // This is to avoid added an extra new line in the UI.
    if (lines.length === 2) {
      return [];
    }

    lines.pop();
    return lines;
  }

  var lastLine = lines[lines.length - 1];
  var firstLine = lines[0]; // Remove the first and last element if they are new line character. This is
  // to avoid addition of extra new line in the UI.

  if (!lastLine) {
    lines.pop();
  }

  if (!firstLine) {
    lines.shift();
  }

  return lines;
};
/**
 * Computes word diff information in the line.
 * [TODO]: Consider adding options argument for JsDiff text block comparison
 *
 * @param oldValue Old word in the line.
 * @param newValue New word in the line.
 * @param compareMethod JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
 */


var computeDiff = function computeDiff(oldValue, newValue, compareMethod) {
  if (compareMethod === void 0) {
    compareMethod = DiffMethod.CHARS;
  }

  var diffArray = jsDiff[compareMethod](oldValue, newValue);
  var computedDiff = {
    left: [],
    right: []
  };
  diffArray.forEach(function (_a) {
    var added = _a.added,
        removed = _a.removed,
        value = _a.value;
    var diffInformation = {};

    if (added) {
      diffInformation.type = DiffType.ADDED;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
    }

    if (removed) {
      diffInformation.type = DiffType.REMOVED;
      diffInformation.value = value;
      computedDiff.left.push(diffInformation);
    }

    if (!removed && !added) {
      diffInformation.type = DiffType.DEFAULT;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
      computedDiff.left.push(diffInformation);
    }

    return diffInformation;
  });
  return computedDiff;
};
/**
 * [TODO]: Think about moving common left and right value assignment to a
 * common place. Better readability?
 *
 * Computes line wise information based in the js diff information passed. Each
 * line contains information about left and right section. Left side denotes
 * deletion and right side denotes addition.
 *
 * @param oldString Old string to compare.
 * @param newString New string to compare with old string.
 * @param disableWordDiff Flag to enable/disable word diff.
 * @param compareMethod JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
 * @param linesOffset line number to start counting from
 */


var computeLineInformation = function computeLineInformation(oldString, newString, disableWordDiff, compareMethod, linesOffset) {
  if (disableWordDiff === void 0) {
    disableWordDiff = false;
  }

  if (compareMethod === void 0) {
    compareMethod = DiffMethod.CHARS;
  }

  if (linesOffset === void 0) {
    linesOffset = 0;
  }

  var diffArray = diff.diffLines(oldString.trimRight(), newString.trimRight(), {
    newlineIsToken: true,
    ignoreWhitespace: false,
    ignoreCase: false
  });
  var rightLineNumber = linesOffset;
  var leftLineNumber = linesOffset;
  var lineInformation = [];
  var counter = 0;
  var diffLines = [];
  var ignoreDiffIndexes = [];

  var getLineInformation = function getLineInformation(value, diffIndex, added, removed, evaluateOnlyFirstLine) {
    var lines = constructLines(value);
    return lines.map(function (line, lineIndex) {
      var left = {};
      var right = {};

      if (ignoreDiffIndexes.includes(diffIndex + "-" + lineIndex) || evaluateOnlyFirstLine && lineIndex !== 0) {
        return undefined;
      }

      if (added || removed) {
        if (!diffLines.includes(counter)) {
          diffLines.push(counter);
        }

        if (removed) {
          leftLineNumber += 1;
          left.lineNumber = leftLineNumber;
          left.type = DiffType.REMOVED;
          left.value = line || ' '; // When the current line is of type REMOVED, check the next item in
          // the diff array whether it is of type ADDED. If true, the current
          // diff will be marked as both REMOVED and ADDED. Meaning, the
          // current line is a modification.

          var nextDiff = diffArray[diffIndex + 1];

          if (nextDiff && nextDiff.added) {
            var nextDiffLines = constructLines(nextDiff.value)[lineIndex];

            if (nextDiffLines) {
              var _a = getLineInformation(nextDiff.value, diffIndex, true, false, true)[0].right,
                  rightValue = _a.value,
                  lineNumber = _a.lineNumber,
                  type = _a.type; // When identified as modification, push the next diff to ignore
              // list as the next value will be added in this line computation as
              // right and left values.

              ignoreDiffIndexes.push(diffIndex + 1 + "-" + lineIndex);
              right.lineNumber = lineNumber;
              right.type = type; // Do word level diff and assign the corresponding values to the
              // left and right diff information object.

              if (disableWordDiff) {
                right.value = rightValue;
              } else {
                var computedDiff = computeDiff(line, rightValue, compareMethod);
                right.value = computedDiff.right;
                left.value = computedDiff.left;
              }
            }
          }
        } else {
          rightLineNumber += 1;
          right.lineNumber = rightLineNumber;
          right.type = DiffType.ADDED;
          right.value = line;
        }
      } else {
        leftLineNumber += 1;
        rightLineNumber += 1;
        left.lineNumber = leftLineNumber;
        left.type = DiffType.DEFAULT;
        left.value = line;
        right.lineNumber = rightLineNumber;
        right.type = DiffType.DEFAULT;
        right.value = line;
      }

      counter += 1;
      return {
        right: right,
        left: left
      };
    }).filter(Boolean);
  };

  diffArray.forEach(function (_a, index) {
    var added = _a.added,
        removed = _a.removed,
        value = _a.value;
    lineInformation = __spread(lineInformation, getLineInformation(value, index, added, removed));
  });
  return {
    lineInformation: lineInformation,
    diffLines: diffLines
  };
};

exports.computeLineInformation = computeLineInformation;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(61);
var $trimEnd = __webpack_require__(164).end;
var forcedStringTrimMethod = __webpack_require__(165);

var FORCED = forcedStringTrimMethod('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return $trimEnd(this);
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(38);
var whitespaces = __webpack_require__(87);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(10);
var whitespaces = __webpack_require__(87);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);

/*!

 diff v4.0.1

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
(function (global, factory) {
   true ? factory(exports) : undefined;
})(this, function (exports) {
  'use strict';

  function Diff() {}

  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      this.options = options;
      var self = this;

      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      } // Allow subclasses to massage the input prior to running


      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
          oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      var bestPath = [{
        newPos: -1,
        components: []
      }]; // Seed editLength = 0, i.e. the content starts with the same values

      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      } // Main worker method. checks all permutations of a given edit length for acceptance.


      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;

          var addPath = bestPath[diagonalPath - 1],
              removePath = bestPath[diagonalPath + 1],
              _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }

          var canAdd = addPath && addPath.newPos + 1 < newLen,
              canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          } // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph


          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list

            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }

          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }

        editLength++;
      } // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced.


      if (callback) {
        (function exec() {
          setTimeout(function () {
            // This should not happen, but we want to be safe.

            /* istanbul ignore next */
            if (editLength > maxEditLength) {
              return callback();
            }

            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();

          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];

      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
          oldLen = oldString.length,
          newPos = basePath.newPos,
          oldPos = newPos - diagonalPath,
          commonCount = 0;

      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }

      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }

      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }

      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };

  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
        componentLen = components.length,
        newPos = 0,
        oldPos = 0;

    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];

      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }

        newPos += component.count; // Common case

        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.

        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    } // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.


    var lastComponent = components[componentLen - 1];

    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }

    return components;
  }

  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();

  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  function generateOptions(options, defaults) {
    if (typeof options === 'function') {
      defaults.callback = options;
    } else if (options) {
      for (var name in options) {
        /* istanbul ignore else */
        if (options.hasOwnProperty(name)) {
          defaults[name] = options[name];
        }
      }
    }

    return defaults;
  } //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF


  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();

  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }

    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };

  wordDiff.tokenize = function (value) {
    var tokens = value.split(/(\s+|[()[\]{}'"]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }

    return tokens;
  };

  function diffWords(oldStr, newStr, options) {
    options = generateOptions(options, {
      ignoreWhitespace: true
    });
    return wordDiff.diff(oldStr, newStr, options);
  }

  function diffWordsWithSpace(oldStr, newStr, options) {
    return wordDiff.diff(oldStr, newStr, options);
  }

  var lineDiff = new Diff();

  lineDiff.tokenize = function (value) {
    var retLines = [],
        linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    } // Merge the content and line separators into single tokens


    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];

      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }

        retLines.push(line);
      }
    }

    return retLines;
  };

  function diffLines(oldStr, newStr, callback) {
    return lineDiff.diff(oldStr, newStr, callback);
  }

  function diffTrimmedLines(oldStr, newStr, callback) {
    var options = generateOptions(callback, {
      ignoreWhitespace: true
    });
    return lineDiff.diff(oldStr, newStr, options);
  }

  var sentenceDiff = new Diff();

  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  function diffSentences(oldStr, newStr, callback) {
    return sentenceDiff.diff(oldStr, newStr, callback);
  }

  var cssDiff = new Diff();

  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  function diffCss(oldStr, newStr, callback) {
    return cssDiff.diff(oldStr, newStr, callback);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;

  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
        undefinedReplacement = _this$options.undefinedReplacement,
        _this$options$stringi = _this$options.stringifyReplacer,
        stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
      return typeof v === 'undefined' ? undefinedReplacement : v;
    } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };

  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  function diffJson(oldObj, newObj, options) {
    return jsonDiff.diff(oldObj, newObj, options);
  } // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer


  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];

    if (replacer) {
      obj = replacer(key, obj);
    }

    var i;

    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }

    var canonicalizedObj;

    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);

      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }

      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }

    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }

    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);

      var sortedKeys = [],
          _key;

      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }

      sortedKeys.sort();

      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }

      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }

    return canonicalizedObj;
  }

  var arrayDiff = new Diff();

  arrayDiff.tokenize = function (value) {
    return value.slice();
  };

  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  function diffArrays(oldArr, newArr, callback) {
    return arrayDiff.diff(oldArr, newArr, callback);
  }

  function parsePatch(uniDiff) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        list = [],
        i = 0;

    function parseIndex() {
      var index = {};
      list.push(index); // Parse diff metadata

      while (i < diffstr.length) {
        var line = diffstr[i]; // File header found, end parsing diff metadata

        if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
          break;
        } // Diff index


        var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

        if (header) {
          index.index = header[1];
        }

        i++;
      } // Parse file headers if they are defined. Unified diff requires them, but
      // there's no technical issues to have an isolated hunk without file header


      parseFileHeader(index);
      parseFileHeader(index); // Parse hunks

      index.hunks = [];

      while (i < diffstr.length) {
        var _line = diffstr[i];

        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
          break;
        } else if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else if (_line && options.strict) {
          // Ignore unexpected content unless in strict mode
          throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
        } else {
          i++;
        }
      }
    } // Parses the --- and +++ headers, if none are found, no lines
    // are consumed.


    function parseFileHeader(index) {
      var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

      if (fileHeader) {
        var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
        var data = fileHeader[2].split('\t', 2);
        var fileName = data[0].replace(/\\\\/g, '\\');

        if (/^".*"$/.test(fileName)) {
          fileName = fileName.substr(1, fileName.length - 2);
        }

        index[keyPrefix + 'FileName'] = fileName;
        index[keyPrefix + 'Header'] = (data[1] || '').trim();
        i++;
      }
    } // Parses a hunk
    // This assumes that we are at the start of a hunk.


    function parseHunk() {
      var chunkHeaderIndex = i,
          chunkHeaderLine = diffstr[i++],
          chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      var hunk = {
        oldStart: +chunkHeader[1],
        oldLines: +chunkHeader[2] || 1,
        newStart: +chunkHeader[3],
        newLines: +chunkHeader[4] || 1,
        lines: [],
        linedelimiters: []
      };
      var addCount = 0,
          removeCount = 0;

      for (; i < diffstr.length; i++) {
        // Lines starting with '---' could be mistaken for the "remove line" operation
        // But they could be the header for the next file. Therefore prune such cases out.
        if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
          break;
        }

        var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

        if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
          hunk.lines.push(diffstr[i]);
          hunk.linedelimiters.push(delimiters[i] || '\n');

          if (operation === '+') {
            addCount++;
          } else if (operation === '-') {
            removeCount++;
          } else if (operation === ' ') {
            addCount++;
            removeCount++;
          }
        } else {
          break;
        }
      } // Handle the empty block count case


      if (!addCount && hunk.newLines === 1) {
        hunk.newLines = 0;
      }

      if (!removeCount && hunk.oldLines === 1) {
        hunk.oldLines = 0;
      } // Perform optional sanity checking


      if (options.strict) {
        if (addCount !== hunk.newLines) {
          throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }

        if (removeCount !== hunk.oldLines) {
          throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }
      }

      return hunk;
    }

    while (i < diffstr.length) {
      parseIndex();
    }

    return list;
  } // Iterator that traverses in the range of [min, max], stepping
  // by distance from a given start position. I.e. for [0, 4], with
  // start of 2, this will iterate 2, 3, 1, 4, 0.


  function distanceIterator(start, minLine, maxLine) {
    var wantForward = true,
        backwardExhausted = false,
        forwardExhausted = false,
        localOffset = 1;
    return function iterator() {
      if (wantForward && !forwardExhausted) {
        if (backwardExhausted) {
          localOffset++;
        } else {
          wantForward = false;
        } // Check if trying to fit beyond text length, and if not, check it fits
        // after offset location (or desired location on first iteration)


        if (start + localOffset <= maxLine) {
          return localOffset;
        }

        forwardExhausted = true;
      }

      if (!backwardExhausted) {
        if (!forwardExhausted) {
          wantForward = true;
        } // Check if trying to fit before text beginning, and if not, check it fits
        // before offset location


        if (minLine <= start - localOffset) {
          return -localOffset++;
        }

        backwardExhausted = true;
        return iterator();
      } // We tried to fit hunk before text beginning and beyond text length, then
      // hunk can't fit on the text. Return undefined

    };
  }

  function applyPatch(source, uniDiff) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    if (Array.isArray(uniDiff)) {
      if (uniDiff.length > 1) {
        throw new Error('applyPatch only works with a single input.');
      }

      uniDiff = uniDiff[0];
    } // Apply the diff to the input


    var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        hunks = uniDiff.hunks,
        compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
      return line === patchContent;
    },
        errorCount = 0,
        fuzzFactor = options.fuzzFactor || 0,
        minLine = 0,
        offset = 0,
        removeEOFNL,
        addEOFNL;
    /**
     * Checks if the hunk exactly fits on the provided location
     */


    function hunkFits(hunk, toPos) {
      for (var j = 0; j < hunk.lines.length; j++) {
        var line = hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line;

        if (operation === ' ' || operation === '-') {
          // Context sanity check
          if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
            errorCount++;

            if (errorCount > fuzzFactor) {
              return false;
            }
          }

          toPos++;
        }
      }

      return true;
    } // Search best fit offsets for each hunk based on the previous ones


    for (var i = 0; i < hunks.length; i++) {
      var hunk = hunks[i],
          maxLine = lines.length - hunk.oldLines,
          localOffset = 0,
          toPos = offset + hunk.oldStart - 1;
      var iterator = distanceIterator(toPos, minLine, maxLine);

      for (; localOffset !== undefined; localOffset = iterator()) {
        if (hunkFits(hunk, toPos + localOffset)) {
          hunk.offset = offset += localOffset;
          break;
        }
      }

      if (localOffset === undefined) {
        return false;
      } // Set lower text limit to end of the current hunk, so next ones don't try
      // to fit over already patched text


      minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
    } // Apply patch hunks


    var diffOffset = 0;

    for (var _i = 0; _i < hunks.length; _i++) {
      var _hunk = hunks[_i],
          _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

      diffOffset += _hunk.newLines - _hunk.oldLines;

      if (_toPos < 0) {
        // Creating a new file
        _toPos = 0;
      }

      for (var j = 0; j < _hunk.lines.length; j++) {
        var line = _hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line,
            delimiter = _hunk.linedelimiters[j];

        if (operation === ' ') {
          _toPos++;
        } else if (operation === '-') {
          lines.splice(_toPos, 1);
          delimiters.splice(_toPos, 1);
          /* istanbul ignore else */
        } else if (operation === '+') {
          lines.splice(_toPos, 0, content);
          delimiters.splice(_toPos, 0, delimiter);
          _toPos++;
        } else if (operation === '\\') {
          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

          if (previousOperation === '+') {
            removeEOFNL = true;
          } else if (previousOperation === '-') {
            addEOFNL = true;
          }
        }
      }
    } // Handle EOFNL insertion/removal


    if (removeEOFNL) {
      while (!lines[lines.length - 1]) {
        lines.pop();
        delimiters.pop();
      }
    } else if (addEOFNL) {
      lines.push('');
      delimiters.push('\n');
    }

    for (var _k = 0; _k < lines.length - 1; _k++) {
      lines[_k] = lines[_k] + delimiters[_k];
    }

    return lines.join('');
  } // Wrapper that supports multiple file patches via callbacks.


  function applyPatches(uniDiff, options) {
    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    var currentIndex = 0;

    function processIndex() {
      var index = uniDiff[currentIndex++];

      if (!index) {
        return options.complete();
      }

      options.loadFile(index, function (err, data) {
        if (err) {
          return options.complete(err);
        }

        var updatedContent = applyPatch(data, index, options);
        options.patched(index, updatedContent, function (err) {
          if (err) {
            return options.complete(err);
          }

          processIndex();
        });
      });
    }

    processIndex();
  }

  function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    if (!options) {
      options = {};
    }

    if (typeof options.context === 'undefined') {
      options.context = 4;
    }

    var diff = diffLines(oldStr, newStr, options);
    diff.push({
      value: '',
      lines: []
    }); // Append an empty value to make cleanup easier

    function contextLines(lines) {
      return lines.map(function (entry) {
        return ' ' + entry;
      });
    }

    var hunks = [];
    var oldRangeStart = 0,
        newRangeStart = 0,
        curRange = [],
        oldLine = 1,
        newLine = 1;

    var _loop = function _loop(i) {
      var current = diff[i],
          lines = current.lines || current.value.replace(/\n$/, '').split('\n');
      current.lines = lines;

      if (current.added || current.removed) {
        var _curRange; // If we have previous context, start with that


        if (!oldRangeStart) {
          var prev = diff[i - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;

          if (prev) {
            curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        } // Output our changes


        (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
          return (current.added ? '+' : '-') + entry;
        }))); // Track the updated file position


        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        // Identical context lines. Track line changes
        if (oldRangeStart) {
          // Close out any changes that have been output (or join overlapping)
          if (lines.length <= options.context * 2 && i < diff.length - 2) {
            var _curRange2; // Overlapping


            (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
          } else {
            var _curRange3; // end the range and output


            var contextSize = Math.min(lines.length, options.context);

            (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

            var hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };

            if (i >= diff.length - 2 && lines.length <= options.context) {
              // EOF is inside this hunk
              var oldEOFNewline = /\n$/.test(oldStr);
              var newEOFNewline = /\n$/.test(newStr);
              var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

              if (!oldEOFNewline && noNlBeforeAdds) {
                // special case: old has no eol and no trailing context; no-nl can end up before adds
                curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
              }

              if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                curRange.push('\\ No newline at end of file');
              }
            }

            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }

        oldLine += lines.length;
        newLine += lines.length;
      }
    };

    for (var i = 0; i < diff.length; i++) {
      _loop(i);
    }

    return {
      oldFileName: oldFileName,
      newFileName: newFileName,
      oldHeader: oldHeader,
      newHeader: newHeader,
      hunks: hunks
    };
  }

  function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
    var ret = [];

    if (oldFileName == newFileName) {
      ret.push('Index: ' + oldFileName);
    }

    ret.push('===================================================================');
    ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
    ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

    for (var i = 0; i < diff.hunks.length; i++) {
      var hunk = diff.hunks[i];
      ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
      ret.push.apply(ret, hunk.lines);
    }

    return ret.join('\n') + '\n';
  }

  function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
    return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
  }

  function arrayEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return arrayStartsWith(a, b);
  }

  function arrayStartsWith(array, start) {
    if (start.length > array.length) {
      return false;
    }

    for (var i = 0; i < start.length; i++) {
      if (start[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  function calcLineCount(hunk) {
    var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
        oldLines = _calcOldNewLineCount.oldLines,
        newLines = _calcOldNewLineCount.newLines;

    if (oldLines !== undefined) {
      hunk.oldLines = oldLines;
    } else {
      delete hunk.oldLines;
    }

    if (newLines !== undefined) {
      hunk.newLines = newLines;
    } else {
      delete hunk.newLines;
    }
  }

  function merge(mine, theirs, base) {
    mine = loadPatch(mine, base);
    theirs = loadPatch(theirs, base);
    var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
    // Leaving sanity checks on this to the API consumer that may know more about the
    // meaning in their own context.

    if (mine.index || theirs.index) {
      ret.index = mine.index || theirs.index;
    }

    if (mine.newFileName || theirs.newFileName) {
      if (!fileNameChanged(mine)) {
        // No header or no change in ours, use theirs (and ours if theirs does not exist)
        ret.oldFileName = theirs.oldFileName || mine.oldFileName;
        ret.newFileName = theirs.newFileName || mine.newFileName;
        ret.oldHeader = theirs.oldHeader || mine.oldHeader;
        ret.newHeader = theirs.newHeader || mine.newHeader;
      } else if (!fileNameChanged(theirs)) {
        // No header or no change in theirs, use ours
        ret.oldFileName = mine.oldFileName;
        ret.newFileName = mine.newFileName;
        ret.oldHeader = mine.oldHeader;
        ret.newHeader = mine.newHeader;
      } else {
        // Both changed... figure it out
        ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
        ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
        ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
        ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
      }
    }

    ret.hunks = [];
    var mineIndex = 0,
        theirsIndex = 0,
        mineOffset = 0,
        theirsOffset = 0;

    while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
      var mineCurrent = mine.hunks[mineIndex] || {
        oldStart: Infinity
      },
          theirsCurrent = theirs.hunks[theirsIndex] || {
        oldStart: Infinity
      };

      if (hunkBefore(mineCurrent, theirsCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
        mineIndex++;
        theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
      } else if (hunkBefore(theirsCurrent, mineCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
        theirsIndex++;
        mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
      } else {
        // Overlap, merge as best we can
        var mergedHunk = {
          oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
          oldLines: 0,
          newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
          newLines: 0,
          lines: []
        };
        mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
        theirsIndex++;
        mineIndex++;
        ret.hunks.push(mergedHunk);
      }
    }

    return ret;
  }

  function loadPatch(param, base) {
    if (typeof param === 'string') {
      if (/^@@/m.test(param) || /^Index:/m.test(param)) {
        return parsePatch(param)[0];
      }

      if (!base) {
        throw new Error('Must provide a base reference or pass in a patch');
      }

      return structuredPatch(undefined, undefined, base, param);
    }

    return param;
  }

  function fileNameChanged(patch) {
    return patch.newFileName && patch.newFileName !== patch.oldFileName;
  }

  function selectField(index, mine, theirs) {
    if (mine === theirs) {
      return mine;
    } else {
      index.conflict = true;
      return {
        mine: mine,
        theirs: theirs
      };
    }
  }

  function hunkBefore(test, check) {
    return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
  }

  function cloneHunk(hunk, offset) {
    return {
      oldStart: hunk.oldStart,
      oldLines: hunk.oldLines,
      newStart: hunk.newStart + offset,
      newLines: hunk.newLines,
      lines: hunk.lines
    };
  }

  function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
    // This will generally result in a conflicted hunk, but there are cases where the context
    // is the only overlap where we can successfully merge the content here.
    var mine = {
      offset: mineOffset,
      lines: mineLines,
      index: 0
    },
        their = {
      offset: theirOffset,
      lines: theirLines,
      index: 0
    }; // Handle any leading content

    insertLeading(hunk, mine, their);
    insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

    while (mine.index < mine.lines.length && their.index < their.lines.length) {
      var mineCurrent = mine.lines[mine.index],
          theirCurrent = their.lines[their.index];

      if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
        // Both modified ...
        mutualChange(hunk, mine, their);
      } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
        var _hunk$lines; // Mine inserted


        (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
      } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
        var _hunk$lines2; // Theirs inserted


        (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
      } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
        // Mine removed or edited
        removal(hunk, mine, their);
      } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
        // Their removed or edited
        removal(hunk, their, mine, true);
      } else if (mineCurrent === theirCurrent) {
        // Context identity
        hunk.lines.push(mineCurrent);
        mine.index++;
        their.index++;
      } else {
        // Context mismatch
        conflict(hunk, collectChange(mine), collectChange(their));
      }
    } // Now push anything that may be remaining


    insertTrailing(hunk, mine);
    insertTrailing(hunk, their);
    calcLineCount(hunk);
  }

  function mutualChange(hunk, mine, their) {
    var myChanges = collectChange(mine),
        theirChanges = collectChange(their);

    if (allRemoves(myChanges) && allRemoves(theirChanges)) {
      // Special case for remove changes that are supersets of one another
      if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
        var _hunk$lines3;

        (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

        return;
      } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
        var _hunk$lines4;

        (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

        return;
      }
    } else if (arrayEqual(myChanges, theirChanges)) {
      var _hunk$lines5;

      (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

      return;
    }

    conflict(hunk, myChanges, theirChanges);
  }

  function removal(hunk, mine, their, swap) {
    var myChanges = collectChange(mine),
        theirChanges = collectContext(their, myChanges);

    if (theirChanges.merged) {
      var _hunk$lines6;

      (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
    } else {
      conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
    }
  }

  function conflict(hunk, mine, their) {
    hunk.conflict = true;
    hunk.lines.push({
      conflict: true,
      mine: mine,
      theirs: their
    });
  }

  function insertLeading(hunk, insert, their) {
    while (insert.offset < their.offset && insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
      insert.offset++;
    }
  }

  function insertTrailing(hunk, insert) {
    while (insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
    }
  }

  function collectChange(state) {
    var ret = [],
        operation = state.lines[state.index][0];

    while (state.index < state.lines.length) {
      var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

      if (operation === '-' && line[0] === '+') {
        operation = '+';
      }

      if (operation === line[0]) {
        ret.push(line);
        state.index++;
      } else {
        break;
      }
    }

    return ret;
  }

  function collectContext(state, matchChanges) {
    var changes = [],
        merged = [],
        matchIndex = 0,
        contextChanges = false,
        conflicted = false;

    while (matchIndex < matchChanges.length && state.index < state.lines.length) {
      var change = state.lines[state.index],
          match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

      if (match[0] === '+') {
        break;
      }

      contextChanges = contextChanges || change[0] !== ' ';
      merged.push(match);
      matchIndex++; // Consume any additions in the other block as a conflict to attempt
      // to pull in the remaining context after this

      if (change[0] === '+') {
        conflicted = true;

        while (change[0] === '+') {
          changes.push(change);
          change = state.lines[++state.index];
        }
      }

      if (match.substr(1) === change.substr(1)) {
        changes.push(change);
        state.index++;
      } else {
        conflicted = true;
      }
    }

    if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
      conflicted = true;
    }

    if (conflicted) {
      return changes;
    }

    while (matchIndex < matchChanges.length) {
      merged.push(matchChanges[matchIndex++]);
    }

    return {
      merged: merged,
      changes: changes
    };
  }

  function allRemoves(changes) {
    return changes.reduce(function (prev, change) {
      return prev && change[0] === '-';
    }, true);
  }

  function skipRemoveSuperset(state, removeChanges, delta) {
    for (var i = 0; i < delta; i++) {
      var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

      if (state.lines[state.index + i] !== ' ' + changeContent) {
        return false;
      }
    }

    state.index += delta;
    return true;
  }

  function calcOldNewLineCount(lines) {
    var oldLines = 0;
    var newLines = 0;
    lines.forEach(function (line) {
      if (typeof line !== 'string') {
        var myCount = calcOldNewLineCount(line.mine);
        var theirCount = calcOldNewLineCount(line.theirs);

        if (oldLines !== undefined) {
          if (myCount.oldLines === theirCount.oldLines) {
            oldLines += myCount.oldLines;
          } else {
            oldLines = undefined;
          }
        }

        if (newLines !== undefined) {
          if (myCount.newLines === theirCount.newLines) {
            newLines += myCount.newLines;
          } else {
            newLines = undefined;
          }
        }
      } else {
        if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
          newLines++;
        }

        if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
          oldLines++;
        }
      }
    });
    return {
      oldLines: oldLines,
      newLines: newLines
    };
  } // See: http://code.google.com/p/google-diff-match-patch/wiki/API


  function convertChangesToDMP(changes) {
    var ret = [],
        change,
        operation;

    for (var i = 0; i < changes.length; i++) {
      change = changes[i];

      if (change.added) {
        operation = 1;
      } else if (change.removed) {
        operation = -1;
      } else {
        operation = 0;
      }

      ret.push([operation, change.value]);
    }

    return ret;
  }

  function convertChangesToXML(changes) {
    var ret = [];

    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];

      if (change.added) {
        ret.push('<ins>');
      } else if (change.removed) {
        ret.push('<del>');
      }

      ret.push(escapeHTML(change.value));

      if (change.added) {
        ret.push('</ins>');
      } else if (change.removed) {
        ret.push('</del>');
      }
    }

    return ret.join('');
  }

  function escapeHTML(s) {
    var n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');
    return n;
  }
  /* See LICENSE file for terms of use */


  exports.Diff = Diff;
  exports.diffChars = diffChars;
  exports.diffWords = diffWords;
  exports.diffWordsWithSpace = diffWordsWithSpace;
  exports.diffLines = diffLines;
  exports.diffTrimmedLines = diffTrimmedLines;
  exports.diffSentences = diffSentences;
  exports.diffCss = diffCss;
  exports.diffJson = diffJson;
  exports.diffArrays = diffArrays;
  exports.structuredPatch = structuredPatch;
  exports.createTwoFilesPatch = createTwoFilesPatch;
  exports.createPatch = createPatch;
  exports.applyPatch = applyPatch;
  exports.applyPatches = applyPatches;
  exports.parsePatch = parsePatch;
  exports.merge = merge;
  exports.convertChangesToDMP = convertChangesToDMP;
  exports.convertChangesToXML = convertChangesToXML;
  exports.canonicalize = canonicalize;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var emotion_1 = __webpack_require__(183);

exports.default = function (styleOverride, useDarkTheme) {
  var _a, _b, _c, _d, _e, _f, _g;

  if (useDarkTheme === void 0) {
    useDarkTheme = false;
  }

  var _h = styleOverride.variables,
      overrideVariables = _h === void 0 ? {} : _h,
      styles = __rest(styleOverride, ["variables"]);

  var themeVariables = {
    light: __assign({
      diffViewerBackground: '#fff',
      diffViewerColor: '212529',
      addedBackground: '#e6ffed',
      addedColor: '#24292e',
      removedBackground: '#ffeef0',
      removedColor: '#24292e',
      wordAddedBackground: '#acf2bd',
      wordRemovedBackground: '#fdb8c0',
      addedGutterBackground: '#cdffd8',
      removedGutterBackground: '#ffdce0',
      gutterBackground: '#f7f7f7',
      gutterBackgroundDark: '#f3f1f1',
      highlightBackground: '#fffbdd',
      highlightGutterBackground: '#fff5b1',
      codeFoldGutterBackground: '#dbedff',
      codeFoldBackground: '#f1f8ff',
      emptyLineBackground: '#fafbfc',
      gutterColor: '#212529',
      addedGutterColor: '#212529',
      removedGutterColor: '#212529',
      codeFoldContentColor: '#212529',
      diffViewerTitleBackground: '#fafbfc',
      diffViewerTitleColor: '#212529',
      diffViewerTitleBorderColor: '#eee'
    }, overrideVariables.light || {}),
    dark: __assign({
      diffViewerBackground: '#2e303c',
      diffViewerColor: '#FFF',
      addedBackground: '#044B53',
      addedColor: 'white',
      removedBackground: '#632F34',
      removedColor: 'white',
      wordAddedBackground: '#055d67',
      wordRemovedBackground: '#7d383f',
      addedGutterBackground: '#034148',
      removedGutterBackground: '#632b30',
      gutterBackground: '#2c2f3a',
      gutterBackgroundDark: '#262933',
      highlightBackground: '#2a3967',
      highlightGutterBackground: '#2d4077',
      codeFoldGutterBackground: '#21232b',
      codeFoldBackground: '#262831',
      emptyLineBackground: '#363946',
      gutterColor: '#464c67',
      addedGutterColor: '#8c8c8c',
      removedGutterColor: '#8c8c8c',
      codeFoldContentColor: '#555a7b',
      diffViewerTitleBackground: '#2f323e',
      diffViewerTitleColor: '#555a7b',
      diffViewerTitleBorderColor: '#353846'
    }, overrideVariables.dark || {})
  };
  var variables = useDarkTheme ? themeVariables.dark : themeVariables.light;
  var content = emotion_1.css({
    width: '100%',
    label: 'content'
  });
  var splitView = emotion_1.css((_a = {}, _a["." + content] = {
    width: '50%'
  }, _a.label = 'split-view', _a));
  var diffContainer = emotion_1.css({
    width: '100%',
    background: variables.diffViewerBackground,
    pre: {
      margin: 0,
      whiteSpace: 'pre-wrap',
      lineHeight: '25px'
    },
    label: 'diff-container',
    borderCollapse: 'collapse'
  });
  var codeFoldContent = emotion_1.css({
    color: variables.codeFoldContentColor,
    label: 'code-fold-content'
  });
  var contentText = emotion_1.css({
    color: variables.diffViewerColor,
    label: 'content-text'
  });
  var titleBlock = emotion_1.css((_b = {
    background: variables.diffViewerTitleBackground,
    padding: 10,
    borderBottom: "1px solid " + variables.diffViewerTitleBorderColor,
    label: 'title-block',
    ':last-child': {
      borderLeft: "1px solid " + variables.diffViewerTitleBorderColor
    }
  }, _b["." + contentText] = {
    color: variables.diffViewerTitleColor
  }, _b));
  var lineNumber = emotion_1.css({
    color: variables.gutterColor,
    label: 'line-number'
  });
  var diffRemoved = emotion_1.css((_c = {
    background: variables.removedBackground,
    color: variables.removedColor,
    pre: {
      color: variables.removedColor
    }
  }, _c["." + lineNumber] = {
    color: variables.removedGutterColor
  }, _c.label = 'diff-removed', _c));
  var diffAdded = emotion_1.css((_d = {
    background: variables.addedBackground,
    color: variables.addedColor,
    pre: {
      color: variables.addedColor
    }
  }, _d["." + lineNumber] = {
    color: variables.addedGutterColor
  }, _d.label = 'diff-added', _d));
  var wordDiff = emotion_1.css({
    padding: 2,
    display: 'inline-flex',
    borderRadius: 1,
    label: 'word-diff'
  });
  var wordAdded = emotion_1.css({
    background: variables.wordAddedBackground,
    label: 'word-added'
  });
  var wordRemoved = emotion_1.css({
    background: variables.wordRemovedBackground,
    label: 'word-removed'
  });
  var codeFoldGutter = emotion_1.css({
    backgroundColor: variables.codeFoldGutterBackground,
    label: 'code-fold-gutter'
  });
  var codeFold = emotion_1.css({
    backgroundColor: variables.codeFoldBackground,
    height: 40,
    fontSize: 14,
    fontWeight: 700,
    label: 'code-fold',
    a: {
      textDecoration: 'underline !important',
      cursor: 'pointer',
      pre: {
        display: 'inline'
      }
    }
  });
  var emptyLine = emotion_1.css({
    backgroundColor: variables.emptyLineBackground,
    label: 'empty-line'
  });
  var marker = emotion_1.css((_e = {
    width: 25,
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: 'none',
    label: 'marker'
  }, _e["&." + diffAdded] = {
    pre: {
      color: variables.addedColor
    }
  }, _e["&." + diffRemoved] = {
    pre: {
      color: variables.removedColor
    }
  }, _e));
  var highlightedLine = emotion_1.css((_f = {
    background: variables.highlightBackground,
    label: 'highlighted-line'
  }, _f["." + wordAdded + ", ." + wordRemoved] = {
    backgroundColor: 'initial'
  }, _f));
  var highlightedGutter = emotion_1.css({
    label: 'highlighted-gutter'
  });
  var gutter = emotion_1.css((_g = {
    userSelect: 'none',
    minWidth: 50,
    padding: '0 10px',
    label: 'gutter',
    textAlign: 'right',
    background: variables.gutterBackground,
    '&:hover': {
      cursor: 'pointer',
      background: variables.gutterBackgroundDark,
      pre: {
        opacity: 1
      }
    },
    pre: {
      opacity: 0.5
    }
  }, _g["&." + diffAdded] = {
    background: variables.addedGutterBackground
  }, _g["&." + diffRemoved] = {
    background: variables.removedGutterBackground
  }, _g["&." + highlightedGutter] = {
    background: variables.highlightGutterBackground,
    '&:hover': {
      background: variables.highlightGutterBackground
    }
  }, _g));
  var emptyGutter = emotion_1.css({
    '&:hover': {
      background: variables.gutterBackground,
      cursor: 'initial'
    },
    label: 'empty-gutter'
  });
  var line = emotion_1.css({
    verticalAlign: 'baseline',
    label: 'line'
  });
  var defaultStyles = {
    diffContainer: diffContainer,
    diffRemoved: diffRemoved,
    diffAdded: diffAdded,
    splitView: splitView,
    marker: marker,
    highlightedGutter: highlightedGutter,
    highlightedLine: highlightedLine,
    gutter: gutter,
    line: line,
    wordDiff: wordDiff,
    wordAdded: wordAdded,
    wordRemoved: wordRemoved,
    codeFoldGutter: codeFoldGutter,
    codeFold: codeFold,
    emptyGutter: emptyGutter,
    emptyLine: emptyLine,
    lineNumber: lineNumber,
    contentText: contentText,
    content: content,
    codeFoldContent: codeFoldContent,
    titleBlock: titleBlock
  };
  var computerOverrideStyles = Object.keys(styles).reduce(function (acc, key) {
    var _a;

    return __assign({}, acc, (_a = {}, _a[key] = emotion_1.css(styles[key]), _a));
  }, {});
  return Object.keys(defaultStyles).reduce(function (acc, key) {
    var _a;

    return __assign({}, acc, (_a = {}, _a[key] = computerOverrideStyles[key] ? emotion_1.cx(defaultStyles[key], computerOverrideStyles[key]) : defaultStyles[key], _a));
  }, {});
};

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  function memoized() {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

/* harmony default export */ __webpack_exports__["default"] = (memoizeOne);

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _toConsumableArray = __webpack_require__(54);

var _classCallCheck = __webpack_require__(170);

var _createClass = __webpack_require__(171);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Char = /*#__PURE__*/function () {
  function Char(stream, pos) {
    _classCallCheck(this, Char);

    this.stream = stream;
    this.pos = pos;
  }

  _createClass(Char, [{
    key: "value",
    get: function get() {
      return this.stream[this.pos];
    }
  }]);

  return Char;
}();

var Token = /*#__PURE__*/function () {
  function Token(stream, start, end) {
    _classCallCheck(this, Token);

    this.stream = stream;
    this.start = start;
    this.end = end;
  }

  _createClass(Token, [{
    key: "value",
    get: function get() {
      return this.stream.slice(this.start, this.end);
    }
  }, {
    key: "whitespace",
    get: function get() {
      var i = this.start - 1;

      for (; i >= 0 && /\s/.test(this.stream[i]); i--) {
        ;
      }

      return new Token(this.stream, i + 1, this.start);
    }
  }]);

  return Token;
}();

function nextChar(s, i) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\S/g;
  if (!regex.global) throw new Error('Regexp must be global');
  regex.lastIndex = i;
  var res = regex.exec(s);
  if (!res) return;
  return new Char(s, res.index);
}

function nextToken(s, i) {
  var char = nextChar(s, i);
  if (!char) return;
  var start = char.pos;
  char = nextChar(s, start + 1, /[\s<]|>/g);
  var end = char ? char.pos + Number(char.value == '>') : s.length;
  return new Token(s, start, end);
}

var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr', '!doctype', '--'];

function parseTokenValue(value) {
  var tagName = value.replace(/^<\/?|>$/g, '').toLowerCase();
  if (tagName.startsWith('!--') || tagName.endsWith('--')) tagName = '--';
  var isTagStart = /</.test(value);
  var isTagEnd = />/.test(value);
  var isStartTag = /<([^/]|$)/.test(value);
  var isEndTag = /<\//.test(value) || isStartTag && voidTags.includes(tagName);
  return {
    isTagStart: isTagStart,
    isTagEnd: isTagEnd,
    isStartTag: isStartTag,
    isEndTag: isEndTag,
    tagName: tagName
  };
}

function format(html) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
  var output = [];
  var inStartTag = false;
  var inEndTag = false;
  var inPre = false;
  var inSpecialElement = false;
  var tag = '';
  var indentLevel = 0;
  var prevState = {};
  var token;
  var i = 0;

  while (token = nextToken(html, i)) {
    var tokenValue = token.value;
    var tokenWhitespaceValue = token.whitespace.value;
    var pendingWhitespace = '';

    var _parseTokenValue = parseTokenValue(tokenValue),
        isTagStart = _parseTokenValue.isTagStart,
        isTagEnd = _parseTokenValue.isTagEnd,
        isStartTag = _parseTokenValue.isStartTag,
        isEndTag = _parseTokenValue.isEndTag,
        tagName = _parseTokenValue.tagName; // Token adjustments for edge cases


    if (!inSpecialElement) {
      // Remove space before tag name
      if (isTagStart && !tagName) {
        i = token.end;
        token = nextToken(html, i);
        if (!token) break;
        tokenValue += token.value;

        var _parseTokenValue2 = parseTokenValue(tokenValue);

        isTagStart = _parseTokenValue2.isTagStart;
        isTagEnd = _parseTokenValue2.isTagEnd;
        isStartTag = _parseTokenValue2.isStartTag;
        isEndTag = _parseTokenValue2.isEndTag;
        tagName = _parseTokenValue2.tagName;
      } // Split attributes stuck together


      if (!isTagStart && (inStartTag || inEndTag)) {
        // If attribute has end quote followed by another attribute
        var regex = /[^=]"[^>]/g;
        var res = regex.exec(tokenValue);

        if (res && token.end != token.start + res.index + 2) {
          token.end = token.start + res.index + 2;
          tokenValue = token.value;

          var _parseTokenValue3 = parseTokenValue(tokenValue);

          isTagStart = _parseTokenValue3.isTagStart;
          isTagEnd = _parseTokenValue3.isTagEnd;
          isStartTag = _parseTokenValue3.isStartTag;
          isEndTag = _parseTokenValue3.isEndTag;
          tagName = _parseTokenValue3.tagName;
          pendingWhitespace = indent;
        }
      }
    }

    if (!inSpecialElement && isStartTag) tag = tagName;
    var isEndSpecialTag = (isEndTag && tagName != '--' || isTagEnd && tagName == '--') && tagName == tag; // Ignore any tags inside special elements

    if (inSpecialElement && !isEndSpecialTag) isTagStart = isTagEnd = isStartTag = isEndTag = false; // Current State

    if (isStartTag) inStartTag = true;
    if (isEndTag) inEndTag = true;
    if (isEndTag && !isStartTag) // A void tag will be both
      --indentLevel;
    var isStartSpecialTag = inStartTag && isTagEnd && ['script', 'style'].includes(tag) || isStartTag && tag == '--'; // Convenience

    var inTag = inStartTag || inEndTag; // Whitespace

    var whitespace = tokenWhitespaceValue || prevState.pendingWhitespace;
    var ignoreSpace = inTag && (/^[=">]([^=]|$)/.test(tokenValue) || /(^|=)"$/.test(prevState.tokenValue)); // Preserve whitespace inside special and pre elements

    if (inSpecialElement || inPre) output.push(tokenWhitespaceValue);else if (whitespace && !ignoreSpace) {
      var numNewlines = (whitespace.match(/\n/g) || []).length;
      var lastNewline = Math.max(0, output.lastIndexOf('\n'));
      var lineLength = output.slice(lastNewline).reduce(function (l, s) {
        return l + s.length;
      }, 0);
      var indents = indent.repeat(indentLevel + Number(inTag && !isTagStart));
      if (lineLength + tokenValue.length > width) output.push('\n', indents);else if (numNewlines) output.push.apply(output, _toConsumableArray(Array(numNewlines).fill('\n')).concat([indents]));else output.push(' ');
    }
    output.push(tokenValue);
    prevState = {
      pendingWhitespace: pendingWhitespace,
      tokenValue: tokenValue
    }; // Next state

    if (isStartSpecialTag) inSpecialElement = true;
    if (isEndSpecialTag) inSpecialElement = false;
    if (inStartTag && isTagEnd && tag == 'pre') inPre = true;
    if (isEndTag && tagName == 'pre') inPre = false;
    if (inStartTag && isTagEnd && !inEndTag) // A void tag is both start & end
      ++indentLevel;
    if (isTagEnd) inStartTag = inEndTag = false;
    i = token.end;
  }

  if (html[html.length - 1] == '\n') output.push('\n');
  return output.join('');
}

exports.default = format;
module.exports = Object.assign(exports.default, exports);

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "cache", function() { return /* binding */ emotion_esm_cache; });
__webpack_require__.d(__webpack_exports__, "css", function() { return /* binding */ emotion_esm_css; });
__webpack_require__.d(__webpack_exports__, "cx", function() { return /* binding */ emotion_esm_cx; });
__webpack_require__.d(__webpack_exports__, "flush", function() { return /* binding */ flush; });
__webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return /* binding */ getRegisteredStyles; });
__webpack_require__.d(__webpack_exports__, "hydrate", function() { return /* binding */ hydrate; });
__webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return /* binding */ emotion_esm_injectGlobal; });
__webpack_require__.d(__webpack_exports__, "keyframes", function() { return /* binding */ emotion_esm_keyframes; });
__webpack_require__.d(__webpack_exports__, "merge", function() { return /* binding */ emotion_esm_merge; });
__webpack_require__.d(__webpack_exports__, "sheet", function() { return /* binding */ sheet; });

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/cache/dist/cache.browser.esm.js + 2 modules
var cache_browser_esm = __webpack_require__(59);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/serialize/dist/serialize.browser.esm.js + 2 modules
var serialize_browser_esm = __webpack_require__(19);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/utils/dist/utils.browser.esm.js
var utils_browser_esm = __webpack_require__(23);

// CONCATENATED MODULE: /z/monorepo/node_modules/create-emotion/dist/create-emotion.browser.esm.js




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = Object(utils_browser_esm["a" /* getRegisteredStyles */])(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var create_emotion_browser_esm_createEmotion = function createEmotion(options) {
  var cache = Object(cache_browser_esm["a" /* default */])(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if (false) {}

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = Object(serialize_browser_esm["a" /* serializeStyles */])(args, cache.registered, undefined);
    Object(utils_browser_esm["b" /* insertStyles */])(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = Object(serialize_browser_esm["a" /* serializeStyles */])(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = Object(serialize_browser_esm["a" /* serializeStyles */])(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: utils_browser_esm["a" /* getRegisteredStyles */].bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

/* harmony default export */ var create_emotion_browser_esm = (create_emotion_browser_esm_createEmotion);
// CONCATENATED MODULE: /z/monorepo/node_modules/emotion/dist/emotion.esm.js


var _createEmotion = create_emotion_browser_esm(),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    emotion_esm_cx = _createEmotion.cx,
    emotion_esm_merge = _createEmotion.merge,
    getRegisteredStyles = _createEmotion.getRegisteredStyles,
    emotion_esm_injectGlobal = _createEmotion.injectGlobal,
    emotion_esm_keyframes = _createEmotion.keyframes,
    emotion_esm_css = _createEmotion.css,
    sheet = _createEmotion.sheet,
    emotion_esm_cache = _createEmotion.cache;



/***/ }),

/***/ 27:
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);






var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__["default"];

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme' && key !== 'innerRef';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var createStyled = function createStyled(tag, options) {
  if (false) {}

  var identifierName;
  var shouldForwardProp;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
    shouldForwardProp = tag.__emotion_forwardProp && options.shouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && // $FlowFixMe
      options.shouldForwardProp(propName);
    } : options.shouldForwardProp;
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if (false) {}

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if (false) {}

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* withEmotionCache */ "c"])(function (props, context, ref) {
      return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* ThemeContext */ "a"].Consumer, null, function (theme) {
        var finalTag = shouldUseAs && props.as || baseTag;
        var className = '';
        var classInterpolations = [];
        var mergedProps = props;

        if (props.theme == null) {
          mergedProps = {};

          for (var key in props) {
            mergedProps[key] = props[key];
          }

          mergedProps.theme = theme;
        }

        if (typeof props.className === 'string') {
          className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__[/* getRegisteredStyles */ "a"])(context.registered, classInterpolations, props.className);
        } else if (props.className != null) {
          className = props.className + " ";
        }

        var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__[/* serializeStyles */ "a"])(styles.concat(classInterpolations), context.registered, mergedProps);
        var rules = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__[/* insertStyles */ "b"])(context, serialized, typeof finalTag === 'string');
        className += context.key + "-" + serialized.name;

        if (targetClassName !== undefined) {
          className += " " + targetClassName;
        }

        var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
        var newProps = {};

        for (var _key in props) {
          if (shouldUseAs && _key === 'as') continue;

          if ( // $FlowFixMe
          finalShouldForwardProp(_key)) {
            newProps[_key] = props[_key];
          }
        }

        newProps.className = className;
        newProps.ref = ref || props.innerRef;

        if (false) {}

        var ele = Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(finalTag, newProps);
        return ele;
      });
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, nextOptions !== undefined ? _objectSpread({}, options || {}, {}, nextOptions) : options).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createStyled);

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);
/* harmony default export */ __webpack_exports__["default"] = (index);

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transform; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




var cache = {};
var worker = typeof window !== "undefined" ? new Worker(URL.createObjectURL(new window.Blob(["\nimportScripts('https://unpkg.com/@babel/standalone@7.12.6/babel.min.js');\n\nself.onmessage=(message)=>{\n  const hash = message.data.hash;\n\ntry{\n  const translatedMessage = Babel.transform(message.data.code, {\nplugins: [],\npresets: [\"react\", [\"typescript\", { isTSX: true, allExtensions: true }]],\n}).code.replace(\"export const\", \"const\").replace(\"import \", \"//mport \").replace(\"import \", \"//mport \")\n\n    postMessage({hash, translatedCode: translatedMessage})\n} catch(e){\n  postMessage({hash, translatedCode: \"error\", error: e})\n}\n\n}\n"], {
  type: "application/javascript"
}))) : {
  onmessage: function onmessage() {},
  postMessage: function postMessage() {}
};

worker.onmessage = /*#__PURE__*/function () {
  var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(message) {
    var codeHash, errorHash, transformedCodeHash;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
            return Object(_sha__WEBPACK_IMPORTED_MODULE_3__[/* hash */ "a"])(message.data.error);

          case 7:
            errorHash = _context.sent;
            cache[codeHash].reject(errorHash);
            cache[codeHash] = {
              error: errorHash
            };
            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_3__[/* hash */ "a"])(message.data.translatedCode);

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
  var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(codeHash) {
    var code, returnPromise;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_3__[/* unHash */ "b"])(codeHash);

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

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);






var _ref = typeof window !== "undefined" && _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__(),
    renderWorker = _ref.renderWorker;

var render = /*#__PURE__*/function () {
  var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(transformedCodeHash, defaultPropsHash) {
    var code, defaultProps, renderResult, renderedStringHash;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* unHash */ "b"])(transformedCodeHash);

          case 3:
            code = _context.sent;
            _context.next = 6;
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* unHash */ "b"])(defaultPropsHash);

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
            return Object(_sha__WEBPACK_IMPORTED_MODULE_4__[/* hash */ "a"])(renderResult);

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

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(47)
				var methods = ["renderWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-renderer.b78dcc.worker.js", { name: "built-renderer.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(55);

var iterableToArray = __webpack_require__(56);

var unsupportedIterableToArray = __webpack_require__(57);

var nonIterableSpread = __webpack_require__(58);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(27);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(27);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

}]);