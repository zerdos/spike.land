(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[15],{

/***/ 103:
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);
/* harmony import */ var _components_utils_babel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(55);
/* harmony import */ var _components_utils_renderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(57);
/* harmony import */ var react_diff_viewer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(241);
/* harmony import */ var react_diff_viewer__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_diff_viewer__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var html_format__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(250);
/* harmony import */ var html_format__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(html_format__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _zedvision_smart_monaco_editor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(61);







function _templateObject3() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\n  background: white;\n  padding: 12px;\n  width: 200px;\n  height: 100px;\n  margin: auto;\n  display: block;\n  border: 2px solid red;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\nwidth: 100;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\nwidth: 40%; \nfloat:left;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }










var Wrapper = function Wrapper(_ref) {
  var code = _ref.code,
      innerHTML = _ref.innerHTML,
      renderHash = _ref.renderHash,
      message = _ref.message,
      defaultProps = _ref.defaultProps,
      onEvent = _ref.onEvent;

  if (!code || !renderHash) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, "Loading");
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, Component && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](Component, {
    events: defaultProps.events,
    onEvent: onEvent
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("pre", null, message));
};

var ContainerFullWidth = _emotion_styled__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].div(_templateObject());
var ContainerLeftFloat = _emotion_styled__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].div(_templateObject2());
var StyledContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].div(_templateObject3());
var counter = "\nimport * as React from \"react\";\n\nconst defaultState = {\n  counter: 0,\n};\ntype DState = typeof defaultState;\n\nconst actions: {\n  [key: string]: (s: DState) => DState;\n} = {\n  \"reset\": (s) => ({ ...s, ...defaultState }),\n  \"+1\": (s) => ({ ...s, counter: s.counter + 1 }),\n  \"-1\": (s) => ({ ...s, counter: s.counter - 1 }),\n};\n\ntype ActionType = keyof typeof actions;\n\ninterface Props {\n  events: string[];\n  onEvent: (str: string) => void;\n}\n\nexport const Counter: React.FC<Props> = (\n  { events, onEvent },\n) => {\n  const calculatedState = events.reduce(\n    (prevValue, currentValue) => actions[currentValue](prevValue),\n    {} as unknown as DState,\n  ) as DState;\n\n  const [state, setState] = React.useState({ calculatedState, events });\n\n  return <div>\n    <button {...update(\"-1\")}>-</button>\n    {calculatedState.counter}\n    <button {...update(\"+1\")}>+</button>\n  </div>;\n\n  function update(action: ActionType) {\n    return {\n      \"data-onclick\": String(action),\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        onEvent(String(action));\n        setState(\n          { ...state, events: [...state.events, String(action)] },\n        );\n      },\n    };\n  }\n};\n";
var monaco = false;
var defaultProps = {
  events: new Array(8).fill("+1")
};
function Page() {
  if (typeof window === "undefined") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, "Loading");

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
        var runnerHash, devCodeHash, codeHash, mainCode, mainCodeHash, transformedHash, transformedMainHash, defaultStateHash, transformedCode, transformedMainCode, renderedHash, renderedMainHash, renderedContent, renderedContentMain, runnerHash2;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!monaco) {
                  monaco = true;
                  Object(_zedvision_smart_monaco_editor__WEBPACK_IMPORTED_MODULE_13__[/* startMonaco */ "a"])({
                    language: "typescript",
                    code: code,
                    onChange: function onChange(code) {
                      return changeCode(code);
                    }
                  });
                }

                _context.next = 3;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* hash */ "a"])(renderedComponent);

              case 3:
                runnerHash = _context.sent;
                _context.next = 6;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* hash */ "a"])(code);

              case 6:
                devCodeHash = _context.sent;
                codeHash = devCodeHash;
                mainCode = renderedComponent.mainCode ? renderedComponent.mainCode : code;
                mainCodeHash = renderedComponent.mainCodeHash ? renderedComponent.mainCodeHash : devCodeHash;
                _context.next = 12;
                return Object(_components_utils_babel__WEBPACK_IMPORTED_MODULE_9__[/* transform */ "a"])(codeHash);

              case 12:
                transformedHash = _context.sent;
                _context.next = 15;
                return Object(_components_utils_babel__WEBPACK_IMPORTED_MODULE_9__[/* transform */ "a"])(mainCodeHash);

              case 15:
                transformedMainHash = _context.sent;
                _context.next = 18;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* hash */ "a"])(renderedComponent.defaultProps);

              case 18:
                defaultStateHash = _context.sent;

                if (transformedHash) {
                  _context.next = 22;
                  break;
                }

                changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
                  isError: true
                }));
                return _context.abrupt("return");

              case 22:
                _context.next = 24;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* unHash */ "b"])(transformedHash);

              case 24:
                transformedCode = _context.sent;
                _context.next = 27;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* unHash */ "b"])(transformedMainHash);

              case 27:
                transformedMainCode = _context.sent;
                _context.next = 30;
                return Object(_components_utils_renderer__WEBPACK_IMPORTED_MODULE_10__[/* render */ "a"])(transformedHash, defaultStateHash);

              case 30:
                renderedHash = _context.sent;
                _context.next = 33;
                return Object(_components_utils_renderer__WEBPACK_IMPORTED_MODULE_10__[/* render */ "a"])(transformedMainHash, defaultStateHash);

              case 33:
                renderedMainHash = _context.sent;

                if (!(typeof renderedHash !== "string")) {
                  _context.next = 36;
                  break;
                }

                return _context.abrupt("return");

              case 36:
                _context.next = 38;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* unHash */ "b"])(renderedHash);

              case 38:
                renderedContent = _context.sent;
                _context.next = 41;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* unHash */ "b"])(renderedMainHash);

              case 41:
                renderedContentMain = _context.sent;
                _context.next = 44;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_8__[/* hash */ "a"])(renderedComponent);

              case 44:
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

              case 46:
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](ContainerFullWidth, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](ContainerLeftFloat, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
    id: "container",
    style: {
      width: "100%",
      height: "100%"
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](ContainerLeftFloat, null, isError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h1", null, "Error"), !isChangeAvailable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", null, "Result"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](StyledContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](Wrapper, {
    key: renderedComponent.codeHash,
    renderHash: renderedComponent.renderedHash,
    code: renderedComponent.transformedCode,
    innerHTML: renderedComponent.renderedContent,
    defaultProps: _objectSpread({}, renderedComponent.defaultProps),
    onEvent: onEvent
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("pre", null, "\n\n        codeHash      " + renderedComponent.codeHash + "\n        renderedHash      " + renderedComponent.renderedHash + "\n        \n        events        " + renderedComponent.defaultProps.events + "\n        eventsHash   " + renderedComponent.defaultStateHash + "\n                  ")), isChangeAvailable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react_diff_viewer__WEBPACK_IMPORTED_MODULE_11___default.a, {
    oldValue: html_format__WEBPACK_IMPORTED_MODULE_12___default()(renderedComponent.renderedContent),
    newValue: html_format__WEBPACK_IMPORTED_MODULE_12___default()(renderedComponent.renderedContentMain),
    showDiffOnly: true,
    useDarkTheme: true // renderContent={highlightSyntax}
    ,
    leftTitle: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](StyledContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](Wrapper, {
      key: renderedComponent.codeHash,
      renderHash: renderedComponent.renderedHash,
      innerHTML: renderedComponent.renderedContent,
      code: renderedComponent.transformedCode,
      defaultProps: _objectSpread({}, renderedComponent.defaultProps),
      onEvent: onEvent
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("pre", null, "\n            codeHash         " + renderedComponent.codeHash + "\n            events           " + renderedComponent.defaultProps.events + "\n            eventsHash       " + renderedComponent.defaultStateHash + "\n                      "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("button", {
      onClick: function onClick() {
        return changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
          mainCodeHash: renderedComponent.codeHash,
          renderedContentMain: renderedComponent.renderedContent,
          renderedMainHash: renderedComponent.renderedHash
        }));
      }
    }, "Save change - as main code")),
    rightTitle: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](StyledContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](Wrapper, {
      key: renderedComponent.mainCodeHash,
      code: renderedComponent.transformedMainCode,
      innerHTML: renderedComponent.renderedContentMain,
      renderHash: renderedComponent.renderedMainHash,
      defaultProps: renderedComponent.defaultProps,
      onEvent: onEvent
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("pre", null, "\n            codeHash      " + renderedComponent.mainCodeHash + "\n            events        " + renderedComponent.defaultProps.events + "\n            eventsHash   " + renderedComponent.defaultStateHash + "\n                      ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("button", {
      onClick: function onClick() {
        changeCode(renderedComponent.mainCode);
        changeWorkerRenderedComponent(_objectSpread(_objectSpread({}, renderedComponent), {}, {
          code: renderedComponent.mainCode
        }));
      }
    }, "Restore the the code to this version")),
    hideLineNumbers: true,
    splitView: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
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

/***/ 241:
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

var classnames_1 = __webpack_require__(242);

var compute_lines_1 = __webpack_require__(243);

exports.DiffMethod = compute_lines_1.DiffMethod;

var styles_1 = __webpack_require__(248); // eslint-disable-next-line @typescript-eslint/no-var-requires


var m = __webpack_require__(249);

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

/***/ 242:
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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(244);

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

var diff = __webpack_require__(247);

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

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(38);
var $trimEnd = __webpack_require__(245).end;
var forcedStringTrimMethod = __webpack_require__(246);

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

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(41);
var whitespaces = __webpack_require__(103);

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

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(10);
var whitespaces = __webpack_require__(103);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ 247:
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

/***/ 248:
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

var emotion_1 = __webpack_require__(261);

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

/***/ 249:
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

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _toConsumableArray = __webpack_require__(64);

var _classCallCheck = __webpack_require__(251);

var _createClass = __webpack_require__(252);

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

/***/ 251:
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ 252:
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

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "cache", function() { return /* binding */ emotion_esm_cache; });
__webpack_require__.d(__webpack_exports__, "css", function() { return /* binding */ emotion_esm_css; });
__webpack_require__.d(__webpack_exports__, "cx", function() { return /* binding */ emotion_esm_cx; });
__webpack_require__.d(__webpack_exports__, "flush", function() { return /* binding */ flush; });
__webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return /* binding */ emotion_esm_getRegisteredStyles; });
__webpack_require__.d(__webpack_exports__, "hydrate", function() { return /* binding */ hydrate; });
__webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return /* binding */ emotion_esm_injectGlobal; });
__webpack_require__.d(__webpack_exports__, "keyframes", function() { return /* binding */ emotion_esm_keyframes; });
__webpack_require__.d(__webpack_exports__, "merge", function() { return /* binding */ emotion_esm_merge; });
__webpack_require__.d(__webpack_exports__, "sheet", function() { return /* binding */ sheet; });

// CONCATENATED MODULE: /z/monorepo/node_modules/@emotion/sheet/dist/sheet.browser.esm.js
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (false) {}
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();


// CONCATENATED MODULE: /z/monorepo/node_modules/@emotion/stylis/dist/stylis.browser.esm.js
function stylis_min(W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {}

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ var stylis_browser_esm = (stylis_min);
// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
var weak_memoize_browser_esm = __webpack_require__(37);

// CONCATENATED MODULE: /z/monorepo/node_modules/create-emotion/node_modules/@emotion/cache/dist/cache.browser.esm.js


 // https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler

var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};

var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var cache_browser_esm_createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_browser_esm(stylisOptions);

  if (false) {}

  var inserted = {}; // $FlowFixMe

  var container;
  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if (false) { var map; }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  if (false) { var commentEnd, commentStart; }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* harmony default export */ var cache_browser_esm = (cache_browser_esm_createCache);
// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/hash/dist/hash.browser.esm.js
var hash_browser_esm = __webpack_require__(93);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitless_browser_esm = __webpack_require__(94);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/memoize/dist/memoize.browser.esm.js
var memoize_browser_esm = __webpack_require__(25);

// CONCATENATED MODULE: /z/monorepo/node_modules/create-emotion/node_modules/@emotion/serialize/dist/serialize.browser.esm.js



var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = Object(memoize_browser_esm["a" /* default */])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var serialize_browser_esm_processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitless_browser_esm["a" /* default */][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (false) { var hyphenatedCache, hyphenPattern, msPattern, oldProcessStyleValue, contentValues, contentValuePattern; }

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (false) {}

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (false) {}

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (false) {}

        break;
      }

    case 'string':
      if (false) { var replaced, matched; }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (false) {}

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + serialize_browser_esm_processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + serialize_browser_esm_processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (false) {}

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (false) {} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;

var serialize_browser_esm_serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (false) {}

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (false) {}

      styles += strings[i];
    }
  }

  var sourceMap;

  if (false) {} // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = Object(hash_browser_esm["a" /* default */])(styles) + identifierName;

  if (false) {}

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};


// CONCATENATED MODULE: /z/monorepo/node_modules/create-emotion/node_modules/@emotion/utils/dist/utils.browser.esm.js
var isBrowser = "object" !== 'undefined';

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}

var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);
      current = current.next;
    } while (current !== undefined);
  }
};


// CONCATENATED MODULE: /z/monorepo/node_modules/create-emotion/dist/create-emotion.browser.esm.js




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var create_emotion_browser_esm_createEmotion = function createEmotion(options) {
  var cache = cache_browser_esm(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if (false) {}

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered);
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

    var serialized = serialize_browser_esm_serializeStyles(args, cache.registered);
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
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
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
    emotion_esm_getRegisteredStyles = _createEmotion.getRegisteredStyles,
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

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transform; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);




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

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);






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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(56)
				var methods = ["renderWorker"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "built-renderer.b78dcc.worker.js", { name: "built-renderer.[hash:6].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startMonaco; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
var require;var startMonaco=/*#__PURE__*/function(){var _ref2=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref){var onChange,code,language,container,el,vsPath,_yield$loadScript,require,monaco,modules,importHelper,dts;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:onChange=_ref.onChange,code=_ref.code,language=_ref.language;container=window.document.getElementById("container");if(!container){el=document.getElementById("container");el.id="container";document.body.appendChild(el);}if(!(window["monaco"]===undefined)){_context2.next=12;break;}vsPath="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";_context2.next=7;return loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"+"/loader.min.js");case 7:_yield$loadScript=_context2.sent;require=_yield$loadScript.require;require.config({paths:{"vs":"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"}});_context2.next=12;return new Promise(function(resolve){return require(["vs/editor/editor.main"],function(monaco){resolve(monaco);});});case 12:monaco=window["monaco"];modules={monaco:monaco,editor:monaco.editor.create(window.document.getElementById("container"),{cursorStyle:"block",formatOnType:true,scrollbar:{horizontal:"hidden",verticalHasArrows:true,verticalScrollbarSize:20},minimap:{enabled:true},folding:false,multiCursorModifier:"alt",wordWrap:"on",wordWrapBreakAfterCharacters:">([{]))],;}",mouseWheelZoom:false,wordWrapColumn:80,automaticLayout:true,scrollBeyondLastLine:false,autoIndent:"brackets",autoClosingQuotes:"always",padding:{bottom:300},lineNumbers:"on",autoClosingBrackets:"always",autoClosingOvertype:"always",suggest:{},codeLens:true,autoSurround:"languageDefined",trimAutoWhitespace:true,codeActionsOnSaveTimeout:100,model:monaco.editor.createModel(code,language,monaco.Uri.parse(language==="typescript"?"file:///main.tsx":"file:///main.html")),value:code,language:language,theme:"vs-dark"})};modules.editor.onDidChangeModelContent(function(){return onChange(modules.editor.getValue());});modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSuggestionDiagnostics:true,noSemanticValidation:true,noSyntaxValidation:true});if(!(language==="typescript")){_context2.next=24;break;}importHelper=[{name:"react",url:"https://unpkg.com/@types/react@16.9.56/index.d.ts",depend:["global","csstype","react-dom","prop-types"]},{name:"global",url:"https://unpkg.com/@types/react@16.9.56/global.d.ts",depend:[]},{name:"prop-types",url:"https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",depend:[]},{name:"react-dom",url:"https://unpkg.com/@types/react-dom@16.9.9/index.d.ts",depend:[]},{name:"csstype",url:"https://unpkg.com/csstype@3.0.4/index.d.ts",depend:[]},{name:"@emotion/styled/base.d.ts",url:"https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",depend:["@emotion/react","@emotion/serialize","react"]},{name:"@emotion/styled/index.d.ts",url:"https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",depend:["@emotion/react","@emotion/serialize","react"]},{name:"@emotion/cache/index.d.ts",url:"https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",depend:["@emotion/utils"]},{name:"@emotion/react/index.d.ts",url:"https://unpkg.com/@emotion/react@11.0.0/types/index.d.ts",depend:["@emotion/cache"]},{name:"@emotion/react/jsx-namespace.d.ts",url:"https://unpkg.com/@emotion/react@11.0.0/types/jsx-namespace.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/css-prop.d.ts",url:"https://unpkg.com/@emotion/react@11.0.0/types/css-prop.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/helper.d.ts",url:"https://unpkg.com/@emotion/react@11.0.0/types/helper.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/react/theming.d.ts",url:"https://unpkg.com/@emotion/react@11.0.0/types/theming.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/serialize/index.d.ts",url:"https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",depend:["@emotion/utils","csstype"]},{name:"@emotion/utils/index.d.ts",url:"https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",depend:[]}];dts=importHelper.map(function(_ref3){var name=_ref3.name,url=_ref3.url;return Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(){return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.t0=modules.monaco.languages.typescript.typescriptDefaults;_context.next=3;return fetch(url);case 3:_context.next=5;return _context.sent.text();case 5:_context.t1=_context.sent;_context.t2=name.includes("@emotion")?"file:///node_modules/"+name:"file:///node_modules/@types/"+name+"/index.d.ts";return _context.abrupt("return",_context.t0.addExtraLib.call(_context.t0,_context.t1,_context.t2));case 8:case"end":return _context.stop();}}},_callee);}))();});modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({target:modules.monaco.languages.typescript.ScriptTarget.ESNext,allowNonTsExtensions:true,allowUmdGlobalAccess:true,strict:true,allowJs:true,noEmitOnError:true,allowSyntheticDefaultImports:true,moduleResolution:modules.monaco.languages.typescript.ModuleResolutionKind.NodeJs,module:modules.monaco.languages.typescript.ModuleKind.CommonJS,noEmit:true,typeRoots:["node_modules/@types"],jsx:modules.monaco.languages.typescript.JsxEmit.React,jsxFactory:"React.createElement",jsxFragmentFactory:"React.Fragment",esModuleInterop:true});_context2.next=22;return Promise.all(dts);case 22:modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSuggestionDiagnostics:false,noSemanticValidation:false,noSyntaxValidation:false});return _context2.abrupt("return",modules);case 24:case"end":return _context2.stop();}}},_callee2);}));return function startMonaco(_x){return _ref2.apply(this,arguments);};}();function loadScript(src){return new Promise(function(resolve,reject){var s;s=window.document.createElement("script");s.src=src;s.onload=function(){return resolve(window);};s.onerror=reject;window.document.head.appendChild(s);});}

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(65);

var iterableToArray = __webpack_require__(66);

var unsupportedIterableToArray = __webpack_require__(67);

var nonIterableSpread = __webpack_require__(68);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(27);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 67:
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

/***/ 68:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ })

}]);