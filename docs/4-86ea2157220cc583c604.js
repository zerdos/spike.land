(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "/x44":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ipfsClient", function() { return /* binding */ ipfsClient; });
__webpack_require__.d(__webpack_exports__, "ipfsCat", function() { return /* binding */ ipfsCat; });
__webpack_require__.d(__webpack_exports__, "all", function() { return /* reexport */ G0; });
__webpack_require__.d(__webpack_exports__, "uint8ArrayConcat", function() { return /* reexport */ Q0; });
__webpack_require__.d(__webpack_exports__, "uint8ArrayToString", function() { return /* reexport */ P0; });
__webpack_require__.d(__webpack_exports__, "raceToSuccess", function() { return /* reexport */ D0; });
__webpack_require__.d(__webpack_exports__, "fromHexString", function() { return /* reexport */ V0; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("o0o1");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("ls82");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("HaE+");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("E9XD");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("rePB");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("KQm4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("BsWD");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/construct.js


function construct_construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    construct_construct = Reflect.construct;
  } else {
    construct_construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return construct_construct.apply(null, arguments);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js




function wrapNativeSuper_wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  wrapNativeSuper_wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return wrapNativeSuper_wrapNativeSuper(Class);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/AwaitValue.js
function _AwaitValue(value) {
  this.wrapped = value;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/AsyncGenerator.js

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen["return"] !== "function") {
    this["return"] = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype["throw"] = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype["return"] = function (arg) {
  return this._invoke("return", arg);
};
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/wrapAsyncGenerator.js

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/awaitAsyncGenerator.js

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncGeneratorDelegate.js
function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  ;

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner["throw"] === "function") {
    iter["throw"] = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner["return"] === "function") {
    iter["return"] = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("return", value);
    };
  }

  return iter;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncIterator.js
function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol !== "undefined") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}
// CONCATENATED MODULE: ./node_modules/@zedvision/code/src/workers/ipfs/dist/ipfs.client.js


















function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = ipfs_client_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function ipfs_client_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (_e2) { function e(_x14) { return _e2.apply(this, arguments); } e.toString = function () { return _e2.toString(); }; return e; }(function (e) { throw e; }), f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function (_e3) { function e(_x15) { return _e3.apply(this, arguments); } e.toString = function () { return _e3.toString(); }; return e; }(function (e) { didErr = true; err = e; }), f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var lr = Object.create,
    ie = Object.defineProperty,
    dr = Object.getPrototypeOf,
    ur = Object.prototype.hasOwnProperty,
    kr = Object.getOwnPropertyNames,
    fr = Object.getOwnPropertyDescriptor;

var hr = function hr(e) {
  return ie(e, "__esModule", {
    value: !0
  });
};

var o = function o(e, t) {
  return function () {
    return t || (t = {
      exports: {}
    }, e(t.exports, t)), t.exports;
  };
};

var pr = function pr(e, t, s) {
  if (hr(e), t && typeof t == "object" || typeof t == "function") {
    var _iterator2 = _createForOfIteratorHelper(kr(t)),
        _step2;

    try {
      var _loop = function _loop() {
        var r = _step2.value;
        !ur.call(e, r) && r !== "default" && ie(e, r, {
          get: function get() {
            return t[r];
          },
          enumerable: !(s = fr(t, r)) || s.enumerable
        });
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return e;
},
    R = function R(e) {
  return e && e.__esModule ? e : pr(ie(e != null ? lr(dr(e)) : {}, "default", {
    value: e,
    enumerable: !0
  }), e);
};

var Ue = o(function (K0, Te) {
  "use strict";

  var mr = /*#__PURE__*/function () {
    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(e) {
      var t, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, s;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              t = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 3;
              _iterator = _asyncIterator(e);

            case 5:
              _context.next = 7;
              return _iterator.next();

            case 7:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 11;
              return _step.value;

            case 11:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 18;
                break;
              }

              s = _value;
              t.push(s);

            case 15:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 24:
              _context.prev = 24;
              _context.prev = 25;

              if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return _iterator.return();

            case 29:
              _context.prev = 29;

              if (!_didIteratorError) {
                _context.next = 32;
                break;
              }

              throw _iteratorError;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(24);

            case 34:
              return _context.abrupt("return", t);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 20, 24, 34], [25,, 29, 33]]);
    }));

    return function mr(_x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  Te.exports = mr;
});
var P = o(function (oe) {
  "use strict";

  var gr = function gr(e) {
    var t = e.name,
        s = e.message,
        r = e.stack,
        n = e.code,
        i = e.detail;
    return {
      name: t,
      message: s,
      stack: r,
      code: n,
      detail: i
    };
  };

  oe.encodeError = gr;

  var yr = function yr(e) {
    if (e instanceof Error) return e;
    {
      var t = e.name,
          s = e.message,
          r = e.stack,
          n = e.code;
      return Object.assign(wr(t, s), {
        name: t,
        stack: r,
        code: n
      });
    }
  };

  oe.decodeError = yr;

  var wr = function wr(e, t) {
    switch (e) {
      case "RangeError":
        return new RangeError(t);

      case "ReferenceError":
        return ReferenceError(t);

      case "SyntaxError":
        return new SyntaxError(t);

      case "TypeError":
        return new TypeError(t);

      case "URIError":
        return new URIError(t);

      default:
        return new Error(t);
    }
  };
});
var je = o(function (X) {
  "use strict";

  X.TimeoutError = /*#__PURE__*/function (_Error) {
    _inherits(_class, _Error);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "name",
      get: function get() {
        return this.constructor.name;
      }
    }]);

    return _class;
  }( /*#__PURE__*/wrapNativeSuper_wrapNativeSuper(Error));

  X.AbortError = /*#__PURE__*/function (_Error2) {
    _inherits(_class2, _Error2);

    var _super2 = _createSuper(_class2);

    function _class2() {
      _classCallCheck(this, _class2);

      return _super2.apply(this, arguments);
    }

    _createClass(_class2, [{
      key: "name",
      get: function get() {
        return this.constructor.name;
      }
    }]);

    return _class2;
  }( /*#__PURE__*/wrapNativeSuper_wrapNativeSuper(Error));

  X.DisconnectError = /*#__PURE__*/function (_Error3) {
    _inherits(_class3, _Error3);

    var _super3 = _createSuper(_class3);

    function _class3() {
      _classCallCheck(this, _class3);

      return _super3.apply(this, arguments);
    }

    _createClass(_class3, [{
      key: "name",
      get: function get() {
        return this.constructor.name;
      }
    }]);

    return _class3;
  }( /*#__PURE__*/wrapNativeSuper_wrapNativeSuper(Error));
});
var Ne = o(function (eo, Me) {
  "use strict";

  var _P = P(),
      vr = _P.decodeError,
      _je = je(),
      Er = _je.DisconnectError,
      Ar = _je.TimeoutError,
      Cr = _je.AbortError;

  Me.exports = /*#__PURE__*/function () {
    function K(t) {
      _classCallCheck(this, K);

      this.port = null, this.id = Math.random().toString(32).slice(2), this.nextID = 0, this.queries = Object.create(null), t && this.connect(t);
    }

    _createClass(K, [{
      key: "execute",
      value: function execute(t) {
        var _this6 = this;

        var s = "".concat(this.id, "@").concat(this.nextID++);
        return this.queries[s] = t, t.timeout > 0 && t.timeout < Infinity && (t.timerID = setTimeout(K.timeout, t.timeout, this, s)), t.signal && t.signal.addEventListener("abort", function () {
          return _this6.abort(s);
        }, {
          once: !0
        }), this.port && K.postQuery(this.port, s, t), t.result;
      }
    }, {
      key: "connect",
      value: function connect(t) {
        if (this.port) throw new Error("Transport is already open");
        this.port = t, this.port.addEventListener("message", this), this.port.start();

        for (var _i2 = 0, _Object$entries = Object.entries(this.queries); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              s = _Object$entries$_i[0],
              r = _Object$entries$_i[1];

          K.postQuery(t, s, r);
        }
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        var t = new Er();

        for (var _i3 = 0, _Object$entries2 = Object.entries(this.queries); _i3 < _Object$entries2.length; _i3++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
              s = _Object$entries2$_i[0],
              r = _Object$entries2$_i[1];

          r.fail(t), this.abort(s);
        }

        this.port && (this.port.removeEventListener("message", this), this.port.close());
      }
    }, {
      key: "abort",
      value: function abort(t) {
        var s = this.queries,
            r = s[t];
        r && (delete s[t], r.fail(new Cr()), this.port && this.port.postMessage({
          type: "abort",
          id: t
        }), r.timerID != null && clearTimeout(r.timerID));
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(t) {
        var _t$data = t.data,
            s = _t$data.id,
            r = _t$data.result,
            n = this.queries[s];
        n && (delete this.queries[s], r.ok ? n.succeed(r.value) : n.fail(vr(r.error)), n.timerID != null && clearTimeout(n.timerID));
      }
    }], [{
      key: "timeout",
      value: function timeout(t, s) {
        var r = t.queries,
            n = r[s];
        n && (delete r[s], n.fail(new Ar("request timed out")), t.port && t.port.postMessage({
          type: "abort",
          id: s
        }));
      }
    }, {
      key: "postQuery",
      value: function postQuery(t, s, r) {
        t.postMessage({
          type: "query",
          namespace: r.namespace,
          method: r.method,
          id: s,
          input: r.toJSON()
        }, Object(toConsumableArray["a" /* default */])(new Set(r.transfer() || [])));
      }
    }]);

    return K;
  }();
});
var Re = o(function (so, Be) {
  "use strict";

  Be.exports = /*#__PURE__*/function () {
    function _class4(t, s, r) {
      var _this7 = this;

      _classCallCheck(this, _class4);

      this.result = new Promise(function (n, i) {
        _this7.succeed = n, _this7.fail = i, _this7.signal = r.signal, _this7.input = r, _this7.namespace = t, _this7.method = s, _this7.timeout = r.timeout == null ? Infinity : r.timeout, _this7.timerID = null;
      });
    }

    _createClass(_class4, [{
      key: "toJSON",
      value: function toJSON() {
        return this.input;
      }
    }, {
      key: "transfer",
      value: function transfer() {
        return this.input.transfer;
      }
    }]);

    return _class4;
  }();
});
var Oe = o(function (no, ze) {
  "use strict";

  var qr = Re();

  ze.exports = /*#__PURE__*/function () {
    function _class5(t, s, r) {
      var _this8 = this;

      _classCallCheck(this, _class5);

      this.transport = r;
      var n = this;

      var _iterator3 = _createForOfIteratorHelper(s),
          _step3;

      try {
        var _loop2 = function _loop2() {
          var i = _step3.value;

          n[i] = function (b) {
            return _this8.transport.execute(new qr(t, i.toString(), b));
          };
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    return _class5;
  }();
});
var z = o(function (oo, Fe) {
  "use strict";

  var Ir = Oe();

  Fe.exports = /*#__PURE__*/function () {
    function _class6(t, s, r) {
      _classCallCheck(this, _class6);

      this.remote = new Ir(t, s, r);
    }

    return _class6;
  }();
});
var Ve = o(function (bo, Le) {
  "use strict";

  function Sr(e) {
    if (e.length >= 255) throw new TypeError("Alphabet too long");

    for (var t = new Uint8Array(256), s = 0; s < t.length; s++) {
      t[s] = 255;
    }

    for (var r = 0; r < e.length; r++) {
      var n = e.charAt(r),
          i = n.charCodeAt(0);
      if (t[i] !== 255) throw new TypeError(n + " is ambiguous");
      t[i] = r;
    }

    var b = e.length,
        a = e.charAt(0),
        l = Math.log(b) / Math.log(256),
        u = Math.log(256) / Math.log(b);

    function Q(c) {
      if (c instanceof Uint8Array || (ArrayBuffer.isView(c) ? c = new Uint8Array(c.buffer, c.byteOffset, c.byteLength) : Array.isArray(c) && (c = Uint8Array.from(c))), !(c instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
      if (c.length === 0) return "";

      for (var d = 0, I = 0, f = 0, m = c.length; f !== m && c[f] === 0;) {
        f++, d++;
      }

      for (var g = (m - f) * u + 1 >>> 0, k = new Uint8Array(g); f !== m;) {
        for (var w = c[f], C = 0, h = g - 1; (w !== 0 || C < I) && h !== -1; h--, C++) {
          w += 256 * k[h] >>> 0, k[h] = w % b >>> 0, w = w / b >>> 0;
        }

        if (w !== 0) throw new Error("Non-zero carry");
        I = C, f++;
      }

      for (var y = g - I; y !== g && k[y] === 0;) {
        y++;
      }

      for (var J = a.repeat(d); y < g; ++y) {
        J += e.charAt(k[y]);
      }

      return J;
    }

    function De(c) {
      if (typeof c != "string") throw new TypeError("Expected String");
      if (c.length === 0) return new Uint8Array();
      var d = 0;

      if (c[d] !== " ") {
        for (var I = 0, f = 0; c[d] === a;) {
          I++, d++;
        }

        for (var m = (c.length - d) * l + 1 >>> 0, g = new Uint8Array(m); c[d];) {
          var k = t[c.charCodeAt(d)];
          if (k === 255) return;

          for (var w = 0, C = m - 1; (k !== 0 || w < f) && C !== -1; C--, w++) {
            k += b * g[C] >>> 0, g[C] = k % 256 >>> 0, k = k / 256 >>> 0;
          }

          if (k !== 0) throw new Error("Non-zero carry");
          f = w, d++;
        }

        if (c[d] !== " ") {
          for (var h = m - f; h !== m && g[h] === 0;) {
            h++;
          }

          for (var y = new Uint8Array(I + (m - h)), J = I; h !== m;) {
            y[J++] = g[h++];
          }

          return y;
        }
      }
    }

    function xr(c) {
      var d = De(c);
      if (d) return d;
      throw new Error("Non-base" + b + " character");
    }

    return {
      encode: Q,
      decodeUnsafe: De,
      decode: xr
    };
  }

  Le.exports = Sr;
});
var v = o(function (be) {
  "use strict";

  be.TextEncoder = TextEncoder;
  be.TextDecoder = TextDecoder;
});
var $ = o(function (co, _e) {
  "use strict";

  var _v = v(),
      Dr = _v.TextEncoder,
      Tr = _v.TextDecoder,
      Ur = new Tr(),
      jr = function jr(e) {
    return Ur.decode(e);
  },
      Mr = new Dr(),
      Nr = function Nr(e) {
    return Mr.encode(e);
  };

  function Br(e, t) {
    var s = new Uint8Array(t),
        r = 0;

    var _iterator4 = _createForOfIteratorHelper(e),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _n2 = _step4.value;
        s.set(_n2, r), r += _n2.length;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return s;
  }

  _e.exports = {
    decodeText: jr,
    encodeText: Nr,
    concat: Br
  };
});
var Je = o(function (xo, Ge) {
  "use strict";

  var _$ = $(),
      Rr = _$.encodeText,
      Qe = /*#__PURE__*/function () {
    function Qe(t, s, r, n) {
      _classCallCheck(this, Qe);

      this.name = t, this.code = s, this.codeBuf = Rr(this.code), this.alphabet = n, this.codec = r(n);
    }

    _createClass(Qe, [{
      key: "encode",
      value: function encode(t) {
        return this.codec.encode(t);
      }
    }, {
      key: "decode",
      value: function decode(t) {
        var _iterator5 = _createForOfIteratorHelper(t),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var s = _step5.value;
            if (this.alphabet && this.alphabet.indexOf(s) < 0) throw new Error("invalid character '".concat(s, "' in '").concat(t, "'"));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return this.codec.decode(t);
      }
    }]);

    return Qe;
  }();

  Ge.exports = Qe;
});
var Xe = o(function (lo, Pe) {
  "use strict";

  var zr = function zr(e, t, s) {
    var r = {};

    for (var u = 0; u < t.length; ++u) {
      r[t[u]] = u;
    }

    var n = e.length;

    for (; e[n - 1] === "=";) {
      --n;
    }

    var i = new Uint8Array(n * s / 8 | 0),
        b = 0,
        a = 0,
        l = 0;

    for (var _u = 0; _u < n; ++_u) {
      var Q = r[e[_u]];
      if (Q === void 0) throw new SyntaxError("Invalid character " + e[_u]);
      a = a << s | Q, b += s, b >= 8 && (b -= 8, i[l++] = 255 & a >> b);
    }

    if (b >= s || 255 & a << 8 - b) throw new SyntaxError("Unexpected end of data");
    return i;
  },
      Or = function Or(e, t, s) {
    var r = t[t.length - 1] === "=",
        n = (1 << s) - 1,
        i = "",
        b = 0,
        a = 0;

    for (var l = 0; l < e.length; ++l) {
      for (a = a << 8 | e[l], b += 8; b > s;) {
        b -= s, i += t[n & a >> b];
      }
    }

    if (b && (i += t[n & a << s - b]), r) for (; i.length * s & 7;) {
      i += "=";
    }
    return i;
  },
      Fr = function Fr(e) {
    return function (t) {
      return {
        encode: function encode(s) {
          return Or(s, t, e);
        },
        decode: function decode(s) {
          return zr(s, t, e);
        }
      };
    };
  };

  Pe.exports = {
    rfc4648: Fr
  };
});
var H = o(function (uo, Ke) {
  "use strict";

  var O = Ve(),
      Lr = Je(),
      _Xe = Xe(),
      x = _Xe.rfc4648,
      _$2 = $(),
      Vr = _$2.decodeText,
      _r = _$2.encodeText,
      Gr = function Gr() {
    return {
      encode: Vr,
      decode: _r
    };
  },
      $e = [["identity", "\0", Gr, ""], ["base2", "0", x(1), "01"], ["base8", "7", x(3), "01234567"], ["base10", "9", O, "0123456789"], ["base16", "f", x(4), "0123456789abcdef"], ["base16upper", "F", x(4), "0123456789ABCDEF"], ["base32hex", "v", x(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", x(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", x(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", x(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", x(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", x(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", x(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", x(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", x(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", O, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", O, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", O, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", O, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", x(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", x(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", x(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", x(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
      He = $e.reduce(function (e, t) {
    return e[t[0]] = new Lr(t[0], t[1], t[2], t[3]), e;
  }, {}),
      Qr = $e.reduce(function (e, t) {
    return e[t[1]] = He[t[0]], e;
  }, {});

  Ke.exports = {
    names: He,
    codes: Qr
  };
});
var q = o(function (E, Ze) {
  "use strict";

  var T = H(),
      _$3 = $(),
      Jr = _$3.encodeText,
      Z = _$3.decodeText,
      We = _$3.concat;

  function Xr(e, t) {
    if (!t) throw new Error("requires an encoded Uint8Array");

    var _S = S(e),
        s = _S.name,
        r = _S.codeBuf;

    return Pr(s, t), We([r, t], r.length + t.length);
  }

  function Kr(e, t) {
    var s = S(e),
        r = Jr(s.encode(t));
    return We([s.codeBuf, r], s.codeBuf.length + r.length);
  }

  function $r(e) {
    e instanceof Uint8Array && (e = Z(e));
    var t = e[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(t) && (e = e.toLowerCase()), S(e[0]).decode(e.substring(1));
  }

  function Hr(e) {
    if (e instanceof Uint8Array && (e = Z(e)), Object.prototype.toString.call(e) !== "[object String]") return !1;

    try {
      return S(e[0]).name;
    } catch (t) {
      return !1;
    }
  }

  function Pr(e, t) {
    S(e).decode(Z(t));
  }

  function S(e) {
    if (T.names[e]) return T.names[e];
    if (T.codes[e]) return T.codes[e];
    throw new Error("Unsupported encoding: ".concat(e));
  }

  function Zr(e) {
    return e instanceof Uint8Array && (e = Z(e)), S(e[0]);
  }

  E = Ze.exports = Xr;
  E.encode = Kr;
  E.decode = $r;
  E.isEncoded = Hr;
  E.encoding = S;
  E.encodingFromData = Zr;
  E.names = Object.freeze(T.names);
  E.codes = Object.freeze(T.codes);
});
var tt = o(function (ko, Ye) {
  Ye.exports = ae;
  var et = 128,
      Wr = 127,
      Yr = ~Wr,
      en = Math.pow(2, 31);

  function ae(e, t, s) {
    if (Number.MAX_SAFE_INTEGER && e > Number.MAX_SAFE_INTEGER) throw ae.bytes = 0, new RangeError("Could not encode varint");
    t = t || [], s = s || 0;

    for (var r = s; e >= en;) {
      t[s++] = e & 255 | et, e /= 128;
    }

    for (; e & Yr;) {
      t[s++] = e & 255 | et, e >>>= 7;
    }

    return t[s] = e | 0, ae.bytes = s - r + 1, t;
  }
});
var nt = o(function (fo, st) {
  st.exports = ce;
  var tn = 128,
      rt = 127;

  function ce(e, t) {
    var s = 0,
        t = t || 0,
        r = 0,
        n = t,
        i,
        b = e.length;

    do {
      if (n >= b || r > 49) throw ce.bytes = 0, new RangeError("Could not decode varint");
      i = e[n++], s += r < 28 ? (i & rt) << r : (i & rt) * Math.pow(2, r), r += 7;
    } while (i >= tn);

    return ce.bytes = n - t, s;
  }
});
var ot = o(function (ho, it) {
  var sn = Math.pow(2, 7),
      rn = Math.pow(2, 14),
      nn = Math.pow(2, 21),
      on = Math.pow(2, 28),
      bn = Math.pow(2, 35),
      an = Math.pow(2, 42),
      cn = Math.pow(2, 49),
      xn = Math.pow(2, 56),
      ln = Math.pow(2, 63);

  it.exports = function (e) {
    return e < sn ? 1 : e < rn ? 2 : e < nn ? 3 : e < on ? 4 : e < bn ? 5 : e < an ? 6 : e < cn ? 7 : e < xn ? 8 : e < ln ? 9 : 10;
  };
});
var at = o(function (po, bt) {
  bt.exports = {
    encode: tt(),
    decode: nt(),
    encodingLength: ot()
  };
});
var xt = o(function (mo, ct) {
  "use strict";

  var dn = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  ct.exports = {
    names: dn
  };
});
var dt = o(function (go, lt) {
  "use strict";

  var _q = q(),
      un = _q.encoding,
      _v2 = v(),
      kn = _v2.TextDecoder,
      fn = new kn("utf8");

  function hn(e) {
    var t = "";

    for (var s = 0; s < e.length; s++) {
      t += String.fromCharCode(e[s]);
    }

    return t;
  }

  function pn(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    return t === "utf8" || t === "utf-8" ? fn.decode(e) : t === "ascii" ? hn(e) : un(t).encode(e);
  }

  lt.exports = pn;
});
var kt = o(function (wo, ut) {
  "use strict";

  var _q2 = q(),
      mn = _q2.encoding,
      _v3 = v(),
      gn = _v3.TextEncoder,
      wn = new gn();

  function yn(e) {
    var t = new Uint8Array(e.length);

    for (var s = 0; s < e.length; s++) {
      t[s] = e.charCodeAt(s);
    }

    return t;
  }

  function vn(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    return t === "utf8" || t === "utf-8" ? wn.encode(e) : t === "ascii" ? yn(e) : mn(t).decode(e);
  }

  ut.exports = vn;
});
var ht = o(function (yo, ft) {
  "use strict";

  function En(e, t) {
    t || (t = e.reduce(function (n, i) {
      return n + i.length;
    }, 0));
    var s = new Uint8Array(t),
        r = 0;

    var _iterator6 = _createForOfIteratorHelper(e),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _n3 = _step6.value;
        s.set(_n3, r), r += _n3.length;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return s;
  }

  ft.exports = En;
});
var le = o(function (vo, pt) {
  "use strict";

  var mt = q(),
      U = at(),
      _xt = xt(),
      F = _xt.names,
      W = dt(),
      An = kt(),
      Cn = ht(),
      L = {};

  for (var e in F) {
    var t = e;
    L[F[t]] = t;
  }

  function qn(e) {
    if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
    return W(e, "base16");
  }

  function In(e) {
    return An(e, "base16");
  }

  function Sn(e) {
    if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
    return W(mt.encode("base58btc", e)).slice(1);
  }

  function Dn(e) {
    var t = e instanceof Uint8Array ? W(e) : e;
    return mt.decode("z" + t);
  }

  function wt(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    var t = U.decode(e);
    if (!gt(t)) throw new Error("multihash unknown function code: 0x".concat(t.toString(16)));
    e = e.slice(U.decode.bytes);
    var s = U.decode(e);
    if (s < 0) throw new Error("multihash invalid length: ".concat(s));
    if (e = e.slice(U.decode.bytes), e.length !== s) throw new Error("multihash length inconsistent: 0x".concat(W(e, "base16")));
    return {
      code: t,
      name: L[t],
      length: s,
      digest: e
    };
  }

  function Tn(e, t, s) {
    if (!e || t === void 0) throw new Error("multihash encode requires at least two args: digest, code");
    var r = yt(t);
    if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
    if (s == null && (s = e.length), s && e.length !== s) throw new Error("digest length should be equal to specified length.");
    var n = U.encode(r),
        i = U.encode(s);
    return Cn([n, i, e], n.length + i.length + e.length);
  }

  function yt(e) {
    var t = e;

    if (typeof e == "string") {
      if (F[e] === void 0) throw new Error("Unrecognized hash function named: ".concat(e));
      t = F[e];
    }

    if (typeof t != "number") throw new Error("Hash function code should be a number. Got: ".concat(t));
    if (L[t] === void 0 && !xe(t)) throw new Error("Unrecognized function code: ".concat(t));
    return t;
  }

  function xe(e) {
    return e > 0 && e < 16;
  }

  function gt(e) {
    return !!(xe(e) || L[e]);
  }

  function vt(e) {
    wt(e);
  }

  function Un(e) {
    return vt(e), e.subarray(0, 2);
  }

  pt.exports = {
    names: F,
    codes: Object.freeze(L),
    toHexString: qn,
    fromHexString: In,
    toB58String: Sn,
    fromB58String: Dn,
    decode: wt,
    encode: Tn,
    coerceCode: yt,
    isAppCode: xe,
    validate: vt,
    prefix: Un,
    isValidCode: gt
  };
});
var Ct = o(function (Eo, Et) {
  Et.exports = de;
  var At = 128,
      jn = 127,
      Mn = ~jn,
      Nn = Math.pow(2, 31);

  function de(e, t, s) {
    if (Number.MAX_SAFE_INTEGER && e > Number.MAX_SAFE_INTEGER) throw de.bytes = 0, new RangeError("Could not encode varint");
    t = t || [], s = s || 0;

    for (var r = s; e >= Nn;) {
      t[s++] = e & 255 | At, e /= 128;
    }

    for (; e & Mn;) {
      t[s++] = e & 255 | At, e >>>= 7;
    }

    return t[s] = e | 0, de.bytes = s - r + 1, t;
  }
});
var St = o(function (Ao, qt) {
  qt.exports = ue;
  var Bn = 128,
      It = 127;

  function ue(e, t) {
    var s = 0,
        t = t || 0,
        r = 0,
        n = t,
        i,
        b = e.length;

    do {
      if (n >= b || r > 49) throw ue.bytes = 0, new RangeError("Could not decode varint");
      i = e[n++], s += r < 28 ? (i & It) << r : (i & It) * Math.pow(2, r), r += 7;
    } while (i >= Bn);

    return ue.bytes = n - t, s;
  }
});
var Tt = o(function (Co, Dt) {
  var Rn = Math.pow(2, 7),
      zn = Math.pow(2, 14),
      On = Math.pow(2, 21),
      Fn = Math.pow(2, 28),
      Ln = Math.pow(2, 35),
      Vn = Math.pow(2, 42),
      _n = Math.pow(2, 49),
      Gn = Math.pow(2, 56),
      Qn = Math.pow(2, 63);

  Dt.exports = function (e) {
    return e < Rn ? 1 : e < zn ? 2 : e < On ? 3 : e < Fn ? 4 : e < Ln ? 5 : e < Vn ? 6 : e < _n ? 7 : e < Gn ? 8 : e < Qn ? 9 : 10;
  };
});
var ke = o(function (qo, Ut) {
  Ut.exports = {
    encode: Ct(),
    decode: St(),
    encodingLength: Tt()
  };
});
var j = o(function (Io, jt) {
  "use strict";

  var Jn = Object.freeze({
    identity: 0,
    cidv1: 1,
    cidv2: 2,
    cidv3: 3,
    ip4: 4,
    tcp: 6,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    dccp: 33,
    "murmur3-128": 34,
    "murmur3-32": 35,
    ip6: 41,
    ip6zone: 42,
    path: 47,
    multicodec: 48,
    multihash: 49,
    multiaddr: 50,
    multibase: 51,
    dns: 53,
    dns4: 54,
    dns6: 55,
    dnsaddr: 56,
    protobuf: 80,
    cbor: 81,
    raw: 85,
    "dbl-sha2-256": 86,
    rlp: 96,
    bencode: 99,
    "dag-pb": 112,
    "dag-cbor": 113,
    "libp2p-key": 114,
    "git-raw": 120,
    "torrent-info": 123,
    "torrent-file": 124,
    "leofcoin-block": 129,
    "leofcoin-tx": 130,
    "leofcoin-pr": 131,
    sctp: 132,
    "dag-jose": 133,
    "dag-cose": 134,
    "eth-block": 144,
    "eth-block-list": 145,
    "eth-tx-trie": 146,
    "eth-tx": 147,
    "eth-tx-receipt-trie": 148,
    "eth-tx-receipt": 149,
    "eth-state-trie": 150,
    "eth-account-snapshot": 151,
    "eth-storage-trie": 152,
    "bitcoin-block": 176,
    "bitcoin-tx": 177,
    "bitcoin-witness-commitment": 178,
    "zcash-block": 192,
    "zcash-tx": 193,
    docid: 206,
    "stellar-block": 208,
    "stellar-tx": 209,
    md4: 212,
    md5: 213,
    bmt: 214,
    "decred-block": 224,
    "decred-tx": 225,
    "ipld-ns": 226,
    "ipfs-ns": 227,
    "swarm-ns": 228,
    "ipns-ns": 229,
    zeronet: 230,
    "secp256k1-pub": 231,
    "bls12_381-g1-pub": 234,
    "bls12_381-g2-pub": 235,
    "x25519-pub": 236,
    "ed25519-pub": 237,
    "bls12_381-g1g2-pub": 238,
    "dash-block": 240,
    "dash-tx": 241,
    "swarm-manifest": 250,
    "swarm-feed": 251,
    udp: 273,
    "p2p-webrtc-star": 275,
    "p2p-webrtc-direct": 276,
    "p2p-stardust": 277,
    "p2p-circuit": 290,
    "dag-json": 297,
    udt: 301,
    utp: 302,
    unix: 400,
    p2p: 421,
    ipfs: 421,
    https: 443,
    onion: 444,
    onion3: 445,
    garlic64: 446,
    garlic32: 447,
    tls: 448,
    quic: 460,
    ws: 477,
    wss: 478,
    "p2p-websocket-star": 479,
    http: 480,
    json: 512,
    messagepack: 513,
    "libp2p-peer-record": 769,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    "p256-pub": 4608,
    "p384-pub": 4609,
    "p521-pub": 4610,
    "ed448-pub": 4611,
    "x448-pub": 4612,
    "ed25519-priv": 4864,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082,
    "zeroxcert-imprint-256": 52753,
    "fil-commitment-unsealed": 61697,
    "fil-commitment-sealed": 61698,
    "holochain-adr-v0": 8417572,
    "holochain-adr-v1": 8483108,
    "holochain-key-v0": 9728292,
    "holochain-key-v1": 9793828,
    "holochain-sig-v0": 10645796,
    "holochain-sig-v1": 10711332,
    "skynet-ns": 11639056
  });
  jt.exports = {
    baseTable: Jn
  };
});
var Rt = o(function (So, Mt) {
  "use strict";

  var _j = j(),
      Nt = _j.baseTable,
      Bt = new Map();

  for (var e in Nt) {
    var t = Nt[e];
    Bt.set(t, e);
  }

  Mt.exports = Object.freeze(Bt);
});
var Ot = o(function (Do, zt) {
  "use strict";

  var _H = H(),
      Pn = _H.names,
      _v4 = v(),
      Xn = _v4.TextDecoder,
      Kn = new Xn("utf8");

  function $n(e) {
    var t = "";

    for (var s = 0; s < e.length; s++) {
      t += String.fromCharCode(e[s]);
    }

    return t;
  }

  function Hn(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    if (t === "utf8" || t === "utf-8") return Kn.decode(e);
    if (t === "ascii") return $n(e);
    var s = Pn[t];
    if (!s) throw new Error("Unknown base");
    return s.encode(e);
  }

  zt.exports = Hn;
});
var Lt = o(function (To, Ft) {
  "use strict";

  var _H2 = H(),
      Zn = _H2.names,
      _v5 = v(),
      Wn = _v5.TextEncoder,
      Yn = new Wn();

  function ei(e) {
    var t = new Uint8Array(e.length);

    for (var s = 0; s < e.length; s++) {
      t[s] = e.charCodeAt(s);
    }

    return t;
  }

  function ti(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    if (t === "utf8" || t === "utf-8") return Yn.encode(e);
    if (t === "ascii") return ei(e);
    var s = Zn[t];
    if (!s) throw new Error("Unknown base");
    return s.decode(e);
  }

  Ft.exports = ti;
});
var fe = o(function (Uo, Vt) {
  "use strict";

  var _t = ke(),
      si = Ot(),
      ri = Lt();

  Vt.exports = {
    numberToUint8Array: ni,
    uint8ArrayToNumber: Gt,
    varintUint8ArrayEncode: ii,
    varintEncode: oi
  };

  function Gt(e) {
    return parseInt(si(e, "base16"), 16);
  }

  function ni(e) {
    var t = e.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), ri(t, "base16");
  }

  function ii(e) {
    return Uint8Array.from(_t.encode(Gt(e)));
  }

  function oi(e) {
    return Uint8Array.from(_t.encode(e));
  }
});
var Xt = o(function (jo, Qt) {
  "use strict";

  var _j2 = j(),
      Jt = _j2.baseTable,
      bi = fe().varintEncode,
      Pt = {};

  for (var e in Jt) {
    var t = Jt[e];
    Pt[e] = bi(t);
  }

  Qt.exports = Object.freeze(Pt);
});
var $t = o(function (Mo, Kt) {
  "use strict";

  function ai(e, t) {
    t || (t = e.reduce(function (n, i) {
      return n + i.length;
    }, 0));
    var s = new Uint8Array(t),
        r = 0;

    var _iterator7 = _createForOfIteratorHelper(e),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _n4 = _step7.value;
        s.set(_n4, r), r += _n4.length;
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    return s;
  }

  Kt.exports = ai;
});
var Wt = o(function (No, Ht) {
  "use strict";

  var _j3 = j(),
      ci = _j3.baseTable,
      Zt = {};

  for (var _i4 = 0, _Object$entries3 = Object.entries(ci); _i4 < _Object$entries3.length; _i4++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2),
        e = _Object$entries3$_i[0],
        t = _Object$entries3$_i[1];

    var s = e.toUpperCase().replace(/-/g, "_");
    Zt[s] = t;
  }

  Ht.exports = Object.freeze(Zt);
});
var es = o(function (Bo, Yt) {
  "use strict";

  var _j4 = j(),
      xi = _j4.baseTable,
      he = {};

  for (var _i5 = 0, _Object$entries4 = Object.entries(xi); _i5 < _Object$entries4.length; _i5++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i5], 2),
        e = _Object$entries4$_i[0],
        t = _Object$entries4$_i[1];

    he[t] === void 0 && (he[t] = e);
  }

  Yt.exports = Object.freeze(he);
});
var rs = o(function (Ro, ts) {
  "use strict";

  var M = ke(),
      ss = Rt(),
      Y = Xt(),
      li = fe(),
      di = $t();

  function ui(e, t) {
    var s;
    if (e instanceof Uint8Array) s = li.varintUint8ArrayEncode(e);else if (Y[e]) s = Y[e];else throw new Error("multicodec not recognized");
    return di([s, t], s.length + t.length);
  }

  function ki(e) {
    return M.decode(e), e.slice(M.decode.bytes);
  }

  function fi(e) {
    var t = M.decode(e),
        s = ss.get(t);
    if (s === void 0) throw new Error("Code ".concat(t, " not found"));
    return s;
  }

  function hi(e) {
    return ss.get(e);
  }

  function pi(e) {
    var t = Y[e];
    if (t === void 0) throw new Error("Codec `" + e + "` not found");
    return M.decode(t);
  }

  function mi(e) {
    return M.decode(e);
  }

  function gi(e) {
    var t = Y[e];
    if (t === void 0) throw new Error("Codec `" + e + "` not found");
    return t;
  }

  function wi(e) {
    return M.encode(e);
  }

  var yi = Wt(),
      vi = es();
  ts.exports = _objectSpread({
    addPrefix: ui,
    rmPrefix: ki,
    getCodec: fi,
    getName: hi,
    getNumber: pi,
    getCode: mi,
    getCodeVarint: gi,
    getVarint: wi,
    print: vi
  }, yi);
});
var is = o(function (zo, ns) {
  "use strict";

  var Ei = le(),
      Ai = {
    checkCIDComponents: function checkCIDComponents(e) {
      if (e == null) return "null values are not valid CIDs";
      if (!(e.version === 0 || e.version === 1)) return "Invalid version, must be a number equal to 1 or 0";
      if (typeof e.codec != "string") return "codec must be string";

      if (e.version === 0) {
        if (e.codec !== "dag-pb") return "codec must be 'dag-pb' for CIDv0";
        if (e.multibaseName !== "base58btc") return "multibaseName must be 'base58btc' for CIDv0";
      }

      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";

      try {
        Ei.validate(e.multihash);
      } catch (t) {
        var s = t.message;
        return s || (s = "Multihash validation failed"), s;
      }
    }
  };
  ns.exports = Ai;
});
var bs = o(function (Oo, os) {
  "use strict";

  function Ci(e, t) {
    t || (t = e.reduce(function (n, i) {
      return n + i.length;
    }, 0));
    var s = new Uint8Array(t),
        r = 0;

    var _iterator8 = _createForOfIteratorHelper(e),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var _n5 = _step8.value;
        s.set(_n5, r), r += _n5.length;
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    return s;
  }

  os.exports = Ci;
});
var cs = o(function (Fo, as) {
  "use strict";

  var _q3 = q(),
      qi = _q3.encoding,
      _v6 = v(),
      Ii = _v6.TextDecoder,
      Si = new Ii("utf8");

  function Di(e) {
    var t = "";

    for (var s = 0; s < e.length; s++) {
      t += String.fromCharCode(e[s]);
    }

    return t;
  }

  function Ti(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    return t === "utf8" || t === "utf-8" ? Si.decode(e) : t === "ascii" ? Di(e) : qi(t).encode(e);
  }

  as.exports = Ti;
});
var ipfs_client_ls = o(function (Lo, xs) {
  "use strict";

  function Ui(e, t) {
    if (e === t) return !0;
    if (e.byteLength !== t.byteLength) return !1;

    for (var s = 0; s < e.byteLength; s++) {
      if (e[s] !== t[s]) return !1;
    }

    return !0;
  }

  xs.exports = Ui;
});
var me = o(function (Vo, ds) {
  "use strict";

  var ee = le(),
      pe = q(),
      N = rs(),
      _j5 = j(),
      te = _j5.baseTable,
      ji = is(),
      us = bs(),
      Mi = cs(),
      Ni = ipfs_client_ls(),
      Bi = Object.keys(te).reduce(function (e, t) {
    return e[te[t]] = t, e;
  }, {}),
      ks = Symbol.for("@ipld/js-cid/CID"),
      p = /*#__PURE__*/function () {
    function p(t, s, r, n) {
      _classCallCheck(this, p);

      if (this.version, this.codec, this.multihash, Object.defineProperty(this, ks, {
        value: !0
      }), p.isCID(t)) {
        var i = t;
        this.version = i.version, this.codec = i.codec, this.multihash = i.multihash, this.multibaseName = i.multibaseName || (i.version === 0 ? "base58btc" : "base32");
        return;
      }

      if (typeof t == "string") {
        var _i6 = pe.isEncoded(t);

        if (_i6) {
          var b = pe.decode(t);
          this.version = parseInt(b[0].toString(), 16), this.codec = N.getCodec(b.slice(1)), this.multihash = N.rmPrefix(b.slice(1)), this.multibaseName = _i6;
        } else this.version = 0, this.codec = "dag-pb", this.multihash = ee.fromB58String(t), this.multibaseName = "base58btc";

        p.validateCID(this), Object.defineProperty(this, "string", {
          value: t
        });
        return;
      }

      if (t instanceof Uint8Array) {
        var _i7 = parseInt(t[0].toString(), 16);

        if (_i7 === 1) {
          var _b = t;
          this.version = _i7, this.codec = N.getCodec(_b.slice(1)), this.multihash = N.rmPrefix(_b.slice(1)), this.multibaseName = "base32";
        } else this.version = 0, this.codec = "dag-pb", this.multihash = t, this.multibaseName = "base58btc";

        p.validateCID(this);
        return;
      }

      this.version = t, typeof s == "number" && (s = Bi[s]), this.codec = s, this.multihash = r, this.multibaseName = n || (t === 0 ? "base58btc" : "base32"), p.validateCID(this);
    }

    _createClass(p, [{
      key: "toV0",
      value: function toV0() {
        if (this.codec !== "dag-pb") throw new Error("Cannot convert a non dag-pb CID to CIDv0");

        var _ee$decode = ee.decode(this.multihash),
            t = _ee$decode.name,
            s = _ee$decode.length;

        if (t !== "sha2-256") throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        if (s !== 32) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
        return new p(0, this.codec, this.multihash);
      }
    }, {
      key: "toV1",
      value: function toV1() {
        return new p(1, this.codec, this.multihash);
      }
    }, {
      key: "toBaseEncodedString",
      value: function toBaseEncodedString() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.multibaseName;
        if (this.string && this.string.length !== 0 && t === this.multibaseName) return this.string;
        var s;

        if (this.version === 0) {
          if (t !== "base58btc") throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
          s = ee.toB58String(this.multihash);
        } else if (this.version === 1) s = Mi(pe.encode(t, this.bytes));else throw new Error("unsupported version");

        return t === this.multibaseName && Object.defineProperty(this, "string", {
          value: s
        }), s;
      }
    }, {
      key: Symbol.for("nodejs.util.inspect.custom"),
      value: function value() {
        return "CID(" + this.toString() + ")";
      }
    }, {
      key: "toString",
      value: function toString(t) {
        return this.toBaseEncodedString(t);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          codec: this.codec,
          version: this.version,
          hash: this.multihash
        };
      }
    }, {
      key: "equals",
      value: function equals(t) {
        return this.codec === t.codec && this.version === t.version && Ni(this.multihash, t.multihash);
      }
    }, {
      key: "bytes",
      get: function get() {
        var t = this._bytes;

        if (!t) {
          if (this.version === 0) t = this.multihash;else if (this.version === 1) {
            var s = N.getCodeVarint(this.codec);
            t = us([[1], s, this.multihash], 1 + s.byteLength + this.multihash.byteLength);
          } else throw new Error("unsupported version");
          Object.defineProperty(this, "_bytes", {
            value: t
          });
        }

        return t;
      }
    }, {
      key: "prefix",
      get: function get() {
        var t = N.getCodeVarint(this.codec),
            s = ee.prefix(this.multihash);
        return us([[this.version], t, s], 1 + t.byteLength + s.byteLength);
      }
    }, {
      key: "code",
      get: function get() {
        return te[this.codec];
      }
    }], [{
      key: "validateCID",
      value: function validateCID(t) {
        var s = ji.checkCIDComponents(t);
        if (s) throw new Error(s);
      }
    }, {
      key: "isCID",
      value: function isCID(t) {
        return t instanceof p || Boolean(t && t[ks]);
      }
    }]);

    return p;
  }();

  p.codecs = te;
  ds.exports = p;
});
var D = o(function (se) {
  "use strict";

  var fs = me(),
      Ri = function Ri(e, t) {
    return t && t.push(e.multihash.buffer), e;
  };

  se.encodeCID = Ri;

  var zi = function zi(e) {
    var t = e;
    return Object.setPrototypeOf(t.multihash, Uint8Array.prototype), Object.setPrototypeOf(t, fs.prototype), Object.defineProperty(t, Symbol.for("@ipld/js-cid/CID"), {
      value: !0
    }), t;
  };

  se.decodeCID = zi;
  se.CID = fs;
});
var ps = o(function (Go, hs) {
  hs.exports = {
    name: "ipld-block",
    version: "0.11.0",
    description: "JavaScript Implementation of IPLD Block",
    leadMaintainer: "Volker Mische <volker.mische@gmail.com>",
    main: "src/index.js",
    scripts: {
      lint: "aegir lint",
      check: "tsc --noEmit --noErrorTruncation",
      build: "npm run build:js && npm run build:types",
      "build:js": "aegir build",
      "build:types": "tsc --emitDeclarationOnly --declarationDir dist",
      test: "aegir test",
      "test:node": "aegir test --target node",
      "test:browser": "aegir test --target browser",
      release: "aegir release --docs",
      "release-minor": "aegir release --type minor --docs",
      "release-major": "aegir release --type major --docs",
      coverage: "aegir coverage",
      "coverage-publish": "aegir coverage --provider coveralls",
      docs: "aegir docs",
      prepare: "npm run build:types"
    },
    "pre-push": ["lint", "test"],
    repository: {
      type: "git",
      url: "git+https://github.com/ipld/js-ipld-block.git"
    },
    keywords: ["IPLD"],
    license: "MIT",
    bugs: {
      url: "https://github.com/ipld/js-ipld-block/issues"
    },
    homepage: "https://github.com/ipld/js-ipld-block#readme",
    devDependencies: {
      aegir: "^27.0.0",
      uint8arrays: "^1.0.0",
      typescript: "^4.0.3"
    },
    dependencies: {
      cids: "^1.0.0"
    },
    engines: {
      node: ">=6.0.0",
      npm: ">=3.0.0"
    },
    typesVersions: {
      "*": {
        "*": ["dist/*"]
      }
    },
    contributors: ["David Dias <daviddias.p@gmail.com>", "Volker Mische <volker.mische@gmail.com>", "Friedel Ziegelmayer <dignifiedquire@gmail.com>", "Irakli Gozalishvili <contact@gozala.io>", "achingbrain <alex@achingbrain.net>", "\u1D20\u026A\u1D04\u1D1B\u1D0F\u0280 \u0299\u1D0A\u1D07\u029F\u1D0B\u029C\u1D0F\u029F\u1D0D <victorbjelkholm@gmail.com>", "Alan Shaw <alan.shaw@protocol.ai>", "Charlie <the_charlie_daly@hotmail.co.uk>", "Diogo Silva <fsdiogo@gmail.com>", "Hugo Dias <hugomrdias@gmail.com>", "Mikeal Rogers <mikeal.rogers@gmail.com>", "Richard Littauer <richard.littauer@gmail.com>", "Richard Schneider <makaretu@gmail.com>", "Xmader <xmader@outlook.com>"]
  };
});
var Es = o(function (Qo, ms) {
  "use strict";

  var Oi = me(),
      _ps = ps(),
      Fi = _ps.version,
      gs = Symbol.for("@ipld/js-ipld-block/block"),
      ws = {
    writable: !1,
    configurable: !1,
    enumerable: !0
  },
      ys = /*#__PURE__*/function () {
    function ys(t, s) {
      _classCallCheck(this, ys);

      if (!t || !(t instanceof Uint8Array)) throw new Error("first argument  must be a Uint8Array");
      if (!s || !Oi.isCID(s)) throw new Error("second argument must be a CID");
      this.data = t, this.cid = s, Object.defineProperties(this, {
        data: ws,
        cid: ws
      });
    }

    _createClass(ys, [{
      key: "_data",
      get: function get() {
        return Vi(), this.data;
      }
    }, {
      key: "_cid",
      get: function get() {
        return Li(), this.cid;
      }
    }, {
      key: Symbol.toStringTag,
      get: function get() {
        return "Block";
      }
    }, {
      key: gs,
      get: function get() {
        return !0;
      }
    }], [{
      key: "isBlock",
      value: function isBlock(t) {
        return Boolean(t && t[gs]);
      }
    }]);

    return ys;
  }(),
      vs = function vs(e, t) {
    var s = !1;
    return function () {
      if (e.test(Fi)) s || (s = !0, console.warn(t));else throw new Error(t);
    };
  },
      Li = vs(/^0\.10|^0\.11/, "block._cid is deprecated and will be removed in 0.12 release. Please use block.cid instead"),
      Vi = vs(/^0\.10|^0.11/, "block._data is deprecated and will be removed in 0.12 release. Please use block.data instead");

  ms.exports = ys;
});
var Cs = o(function (re) {
  "use strict";

  var _D = D(),
      _i = _D.encodeCID,
      Gi = _D.decodeCID,
      As = Es(),
      Qi = function Qi(_ref3, s) {
    var e = _ref3.cid,
        t = _ref3.data;
    return s && s.push(t.buffer), {
      cid: _i(e, s),
      data: t
    };
  };

  re.encodeBlock = Qi;

  var Ji = function Ji(_ref4) {
    var e = _ref4.cid,
        t = _ref4.data;
    return new As(t, Gi(e));
  };

  re.decodeBlock = Ji;
  re.Block = As;
});
var Ts = o(function (Po, qs) {
  "use strict";

  var Pi = z(),
      _D2 = D(),
      V = _D2.encodeCID,
      Is = _D2.decodeCID,
      _P2 = P(),
      Xi = _P2.decodeError,
      _Cs = Cs(),
      Ki = _Cs.encodeBlock,
      Ss = _Cs.decodeBlock,
      Ds = /*#__PURE__*/function (_Pi) {
    _inherits(Ds, _Pi);

    var _super4 = _createSuper(Ds);

    function Ds(t) {
      _classCallCheck(this, Ds);

      return _super4.call(this, "block", ["put", "get", "rm", "stat"], t);
    }

    _createClass(Ds, [{
      key: "get",
      value: function () {
        var _get = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(t) {
          var s,
              r,
              _yield$this$remote$ge,
              n,
              _args2 = arguments;

          return regenerator_default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  s = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                  r = s.transfer;
                  _context2.next = 4;
                  return this.remote.get(_objectSpread(_objectSpread({}, s), {}, {
                    cid: V(t, r)
                  }));

                case 4:
                  _yield$this$remote$ge = _context2.sent;
                  n = _yield$this$remote$ge.block;
                  return _context2.abrupt("return", Ss(n));

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function get(_x5) {
          return _get.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "put",
      value: function () {
        var _put = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(t) {
          var s,
              r,
              n,
              _args3 = arguments;
          return regenerator_default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  s = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                  r = s.transfer;
                  delete s.progress;
                  _context3.next = 5;
                  return this.remote.put(_objectSpread(_objectSpread({}, s), {}, {
                    cid: s.cid == null ? void 0 : V(s.cid, r),
                    block: t instanceof Uint8Array ? t : Ki(t, r)
                  }));

                case 5:
                  n = _context3.sent;
                  return _context3.abrupt("return", Ss(n.block));

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function put(_x6) {
          return _put.apply(this, arguments);
        }

        return put;
      }()
    }, {
      key: "rm",
      value: function rm(t) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this = this;

        return _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
          var r;
          return regenerator_default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  r = s.transfer;
                  _context4.t0 = _asyncGeneratorDelegate;
                  _context4.t1 = _asyncIterator;
                  _context4.next = 5;
                  return _awaitAsyncGenerator(_this.remote.rm(_objectSpread(_objectSpread({}, s), {}, {
                    cids: Array.isArray(t) ? t.map(function (i) {
                      return V(i, r);
                    }) : [V(t, r)]
                  })));

                case 5:
                  _context4.t2 = _context4.sent.map($i);
                  _context4.t3 = (0, _context4.t1)(_context4.t2);
                  _context4.t4 = _awaitAsyncGenerator;
                  return _context4.delegateYield((0, _context4.t0)(_context4.t3, _context4.t4), "t5", 9);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      }
    }, {
      key: "stat",
      value: function () {
        var _stat = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(t) {
          var s,
              r,
              n,
              _args5 = arguments;
          return regenerator_default.a.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  s = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                  r = s.transfer;
                  _context5.next = 4;
                  return this.remote.stat(_objectSpread(_objectSpread({}, s), {}, {
                    cid: V(t, r)
                  }));

                case 4:
                  n = _context5.sent;
                  return _context5.abrupt("return", _objectSpread(_objectSpread({}, n), {}, {
                    cid: Is(n.cid)
                  }));

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function stat(_x7) {
          return _stat.apply(this, arguments);
        }

        return stat;
      }()
    }]);

    return Ds;
  }(Pi),
      $i = function $i(e) {
    var t = Is(e.cid);
    return e.error ? {
      cid: t,
      error: Xi(e.error)
    } : {
      cid: t
    };
  };

  qs.exports = Ds;
});
var Us = o(function (ge) {
  "use strict";

  var _D3 = D(),
      Hi = _D3.encodeCID,
      Zi = _D3.decodeCID,
      Wi = _D3.CID,
      Yi = function Yi(_ref5) {
    var e = _ref5.dagNode,
        t = _ref5.cids;

    var _iterator9 = _createForOfIteratorHelper(t),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var s = _step9.value;
        Zi(s);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    return e;
  };

  ge.decodeNode = Yi;

  var e0 = function e0(e, t) {
    var s = [];
    return we(e, s, t), {
      dagNode: e,
      cids: s
    };
  };

  ge.encodeNode = e0;

  var we = function we(e, t, s) {
    if (e != null && typeof e == "object") if (Wi.isCID(e)) t.push(e), Hi(e, s);else if (e instanceof ArrayBuffer) s && s.push(e);else if (ArrayBuffer.isView(e)) s && s.push(e.buffer);else if (Array.isArray(e)) {
      var _iterator10 = _createForOfIteratorHelper(e),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var r = _step10.value;
          we(r, t, s);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    } else for (var _i8 = 0, _Object$values = Object.values(e); _i8 < _Object$values.length; _i8++) {
      var _r2 = _Object$values[_i8];
      we(_r2, t, s);
    }
  };
});
var Bs = o(function (Ko, js) {
  "use strict";

  var t0 = z(),
      _D4 = D(),
      ne = _D4.encodeCID,
      Ms = _D4.decodeCID,
      _Us = Us(),
      s0 = _Us.encodeNode,
      r0 = _Us.decodeNode,
      Ns = /*#__PURE__*/function (_t2) {
    _inherits(Ns, _t2);

    var _super5 = _createSuper(Ns);

    function Ns(t) {
      _classCallCheck(this, Ns);

      return _super5.call(this, "dag", ["put", "get", "resolve", "tree"], t);
    }

    _createClass(Ns, [{
      key: "put",
      value: function () {
        var _put2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(t) {
          var s,
              r,
              n,
              _args6 = arguments;
          return regenerator_default.a.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  s = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                  r = s.cid;
                  _context6.next = 4;
                  return this.remote.put(_objectSpread(_objectSpread({}, s), {}, {
                    cid: r != null ? ne(r) : void 0,
                    dagNode: s0(t, s.transfer)
                  }));

                case 4:
                  n = _context6.sent;
                  return _context6.abrupt("return", Ms(n));

                case 6:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function put(_x8) {
          return _put2.apply(this, arguments);
        }

        return put;
      }()
    }, {
      key: "get",
      value: function () {
        var _get2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(t) {
          var s,
              _yield$this$remote$ge2,
              r,
              n,
              _args7 = arguments;

          return regenerator_default.a.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  s = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                  _context7.next = 3;
                  return this.remote.get(_objectSpread(_objectSpread({}, s), {}, {
                    cid: ne(t, s.transfer)
                  }));

                case 3:
                  _yield$this$remote$ge2 = _context7.sent;
                  r = _yield$this$remote$ge2.value;
                  n = _yield$this$remote$ge2.remainderPath;
                  return _context7.abrupt("return", {
                    value: r0(r),
                    remainderPath: n
                  });

                case 7:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function get(_x9) {
          return _get2.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "resolve",
      value: function () {
        var _resolve = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8(t) {
          var s,
              _yield$this$remote$re,
              r,
              n,
              _args8 = arguments;

          return regenerator_default.a.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  s = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                  _context8.next = 3;
                  return this.remote.resolve(_objectSpread(_objectSpread({}, s), {}, {
                    cid: n0(t, s.transfer)
                  }));

                case 3:
                  _yield$this$remote$re = _context8.sent;
                  r = _yield$this$remote$re.cid;
                  n = _yield$this$remote$re.remainderPath;
                  return _context8.abrupt("return", {
                    cid: Ms(r),
                    remainderPath: n
                  });

                case 7:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function resolve(_x10) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    }, {
      key: "tree",
      value: function tree(t) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this2 = this;

        return _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee9() {
          return regenerator_default.a.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.t0 = _asyncGeneratorDelegate;
                  _context9.t1 = _asyncIterator;
                  _context9.next = 4;
                  return _awaitAsyncGenerator(_this2.remote.tree(_objectSpread(_objectSpread({}, s), {}, {
                    cid: ne(t, s.transfer)
                  })));

                case 4:
                  _context9.t2 = _context9.sent;
                  _context9.t3 = (0, _context9.t1)(_context9.t2);
                  _context9.t4 = _awaitAsyncGenerator;
                  return _context9.delegateYield((0, _context9.t0)(_context9.t3, _context9.t4), "t5", 8);

                case 8:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }))();
      }
    }]);

    return Ns;
  }(t0),
      n0 = function n0(e, t) {
    return typeof e == "string" ? e : ne(e, t);
  };

  js.exports = Ns;
});
var Rs = o(function (_) {
  "use strict";

  var _P3 = P(),
      i0 = _P3.encodeError,
      o0 = _P3.decodeError,
      b0 = /*#__PURE__*/function () {
    var _ref = _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee10(_ref6, t) {
      var e, s, r, n, i, _yield$_awaitAsyncGen, b, a, l;

      return regenerator_default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              e = _ref6.port;
              s = function s(b) {}, r = function r() {
                return new Promise(function (b) {
                  return s = b;
                });
              }, n = function n() {
                return e.postMessage({
                  method: "next"
                }), r();
              };

              e.onmessage = function (b) {
                return s(b.data);
              };

              i = !1;
              _context10.prev = 4;

            case 5:
              if (i) {
                _context10.next = 20;
                break;
              }

              _context10.next = 8;
              return _awaitAsyncGenerator(n());

            case 8:
              _yield$_awaitAsyncGen = _context10.sent;
              b = _yield$_awaitAsyncGen.done;
              a = _yield$_awaitAsyncGen.value;
              l = _yield$_awaitAsyncGen.error;

              if (!(i = b, l != null)) {
                _context10.next = 14;
                break;
              }

              throw o0(l);

            case 14:
              _context10.t0 = a != null;

              if (!_context10.t0) {
                _context10.next = 18;
                break;
              }

              _context10.next = 18;
              return t(a);

            case 18:
              _context10.next = 5;
              break;

            case 20:
              _context10.prev = 20;
              i || e.postMessage({
                method: "return"
              }), e.close();
              return _context10.finish(20);

            case 23:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[4,, 20, 23]]);
    }));

    return function b0(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  _.decodeIterable = b0;

  var c0 = function c0(e, t, s) {
    var _MessageChannel = new MessageChannel(),
        r = _MessageChannel.port1,
        n = _MessageChannel.port2,
        i = [],
        b = a0(e);

    return r.onmessage = /*#__PURE__*/function () {
      var _ref8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee11(_ref7) {
        var a, _yield$b$next, l, u;

        return regenerator_default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                a = _ref7.data.method;
                _context11.t0 = a;
                _context11.next = _context11.t0 === "next" ? 4 : _context11.t0 === "return" ? 17 : 19;
                break;

              case 4:
                _context11.prev = 4;
                _context11.next = 7;
                return b.next();

              case 7:
                _yield$b$next = _context11.sent;
                l = _yield$b$next.done;
                u = _yield$b$next.value;
                l ? (r.postMessage({
                  type: "next",
                  done: !0
                }), r.close()) : (i.length = 0, r.postMessage({
                  type: "next",
                  done: !1,
                  value: t(u, i)
                }, i));
                _context11.next = 16;
                break;

              case 13:
                _context11.prev = 13;
                _context11.t1 = _context11["catch"](4);
                r.postMessage({
                  type: "throw",
                  error: i0(_context11.t1)
                }), r.close();

              case 16:
                return _context11.abrupt("break", 20);

              case 17:
                r.close(), b.return && b.return();
                return _context11.abrupt("break", 20);

              case 19:
                return _context11.abrupt("break", 20);

              case 20:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[4, 13]]);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }(), r.start(), s.push(n), {
      type: "RemoteIterable",
      port: n
    };
  };

  _.encodeIterable = c0;

  var a0 = function a0(e) {
    if (e != null) {
      if (typeof e[Symbol.asyncIterator] == "function") return e[Symbol.asyncIterator]();
      if (typeof e[Symbol.iterator] == "function") return e[Symbol.iterator]();
    }

    throw TypeError("Value must be async or sync iterable");
  },
      x0 = function x0(e, t) {
    var _MessageChannel2 = new MessageChannel(),
        s = _MessageChannel2.port1,
        r = _MessageChannel2.port2;

    return s.onmessage = function (_ref9) {
      var n = _ref9.data;
      return e.apply(null, n);
    }, t.push(r), {
      type: "RemoteCallback",
      port: r
    };
  };

  _.encodeCallback = x0;

  var l0 = function l0(_ref10) {
    var e = _ref10.port;
    return function (s) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      e.postMessage(s, Object(toConsumableArray["a" /* default */])(new Set(r)));
    };
  };

  _.decodeCallback = l0;
});
var Os = o(function (Ho, zs) {
  "use strict";

  function d0(_x3) {
    return _d.apply(this, arguments);
  }

  function _d() {
    _d = _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee12(e) {
      var t,
          s,
          _r3,
          _args12 = arguments;

      return regenerator_default.a.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              t = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              s = e.getReader();
              _context12.prev = 2;

            case 3:
              _context12.next = 5;
              return _awaitAsyncGenerator(s.read());

            case 5:
              _r3 = _context12.sent;

              if (!_r3.done) {
                _context12.next = 8;
                break;
              }

              return _context12.abrupt("return");

            case 8:
              _context12.next = 10;
              return _r3.value;

            case 10:
              _context12.next = 3;
              break;

            case 12:
              _context12.prev = 12;
              t.preventCancel !== !0 && s.cancel(), s.releaseLock();
              return _context12.finish(12);

            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[2,, 12, 15]]);
    }));
    return _d.apply(this, arguments);
  }

  zs.exports = d0;
});
var Ps = o(function (Zo, Fs) {
  "use strict";

  var u0 = z(),
      _D5 = D(),
      Ls = _D5.encodeCID,
      Vs = _D5.decodeCID,
      _s = _D5.CID,
      _Rs = Rs(),
      ye = _Rs.decodeIterable,
      A = _Rs.encodeIterable,
      Gs = _Rs.encodeCallback,
      ve = Os(),
      Qs = /*#__PURE__*/function (_u2) {
    _inherits(Qs, _u2);

    var _super6 = _createSuper(Qs);

    function Qs(t) {
      _classCallCheck(this, Qs);

      return _super6.call(this, "core", ["add", "addAll", "cat", "ls"], t);
    }

    _createClass(Qs, [{
      key: "addAll",
      value: function addAll(t) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this3 = this;

        return _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee13() {
          var r, n, i, b, a;
          return regenerator_default.a.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  r = s.timeout;
                  n = s.signal;
                  i = Object(toConsumableArray["a" /* default */])(s.transfer || []);
                  b = s.progress ? Gs(s.progress, i) : void 0;
                  _context13.next = 6;
                  return _awaitAsyncGenerator(_this3.remote.addAll(_objectSpread(_objectSpread({}, s), {}, {
                    input: p0(t, i),
                    progress: b,
                    transfer: i,
                    timeout: r,
                    signal: n
                  })));

                case 6:
                  a = _context13.sent;
                  return _context13.delegateYield(_asyncGeneratorDelegate(_asyncIterator(ye(a.data, Js)), _awaitAsyncGenerator), "t0", 8);

                case 8:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13);
        }))();
      }
    }, {
      key: "add",
      value: function () {
        var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee14(t) {
          var s,
              r,
              n,
              i,
              b,
              a,
              _args14 = arguments;
          return regenerator_default.a.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  s = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
                  r = s.timeout;
                  n = s.signal;
                  i = Object(toConsumableArray["a" /* default */])(s.transfer || []);
                  b = s.progress ? Gs(s.progress, i) : void 0;
                  _context14.next = 7;
                  return this.remote.add(_objectSpread(_objectSpread({}, s), {}, {
                    input: h0(t, i),
                    progress: b,
                    transfer: i,
                    timeout: r,
                    signal: n
                  }));

                case 7:
                  a = _context14.sent;
                  return _context14.abrupt("return", Js(a.data));

                case 9:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14, this);
        }));

        function add(_x12) {
          return _add.apply(this, arguments);
        }

        return add;
      }()
    }, {
      key: "cat",
      value: function cat(t) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this4 = this;

        return _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee15() {
          var r, n;
          return regenerator_default.a.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  r = _s.isCID(t) ? Ls(t) : t;
                  _context15.next = 3;
                  return _awaitAsyncGenerator(_this4.remote.cat(_objectSpread(_objectSpread({}, s), {}, {
                    path: r
                  })));

                case 3:
                  n = _context15.sent;
                  return _context15.delegateYield(_asyncGeneratorDelegate(_asyncIterator(ye(n.data, f0)), _awaitAsyncGenerator), "t0", 5);

                case 5:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee15);
        }))();
      }
    }, {
      key: "ls",
      value: function ls(t) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this5 = this;

        return _wrapAsyncGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee16() {
          var r, n;
          return regenerator_default.a.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  r = _s.isCID(t) ? Ls(t) : t;
                  _context16.next = 3;
                  return _awaitAsyncGenerator(_this5.remote.ls(_objectSpread(_objectSpread({}, s), {}, {
                    path: r
                  })));

                case 3:
                  n = _context16.sent;
                  return _context16.delegateYield(_asyncGeneratorDelegate(_asyncIterator(ye(n.data, k0)), _awaitAsyncGenerator), "t0", 5);

                case 5:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16);
        }))();
      }
    }]);

    return Qs;
  }(u0),
      Js = function Js(_ref11) {
    var e = _ref11.path,
        t = _ref11.cid,
        s = _ref11.mode,
        r = _ref11.mtime,
        n = _ref11.size;
    return {
      path: e,
      cid: Vs(t),
      mode: s,
      mtime: r,
      size: n
    };
  },
      k0 = function k0(_ref12) {
    var e = _ref12.depth,
        t = _ref12.name,
        s = _ref12.path,
        r = _ref12.size,
        n = _ref12.cid,
        i = _ref12.type,
        b = _ref12.mode,
        a = _ref12.mtime;
    return {
      cid: Vs(n),
      type: i,
      name: t,
      path: s,
      mode: b,
      mtime: a,
      size: r,
      depth: e
    };
  },
      f0 = function f0(e) {
    return e;
  },
      h0 = function h0(e, t) {
    if (e instanceof Blob) return e;
    if (typeof e == "string") return e;
    if (e instanceof ArrayBuffer) return e;
    if (ArrayBuffer.isView(e)) return e;
    {
      var _s2 = Ce(e);

      if (_s2) return A(_s2, Ee, t);

      var _r4 = qe(e);

      if (_r4) return A(_r4, B, t);

      var _n6 = Ie(e);

      if (_n6) return A(ve(_n6), B, t);
      var i = Se(e);
      if (i) return Ae(i, t);
      throw TypeError("Unexpected input: " + typeof e);
    }
  },
      p0 = function p0(e, t) {
    var s = Ce(e);
    if (s) return A(s, Ee, t);
    var r = qe(e);
    if (r) return A(r, B, t);
    var n = Ie(e);
    if (n) return A(ve(n), B, t);
    throw TypeError("Unexpected input: " + typeof e);
  },
      B = function B(e, t) {
    if (e instanceof ArrayBuffer) return e;
    if (ArrayBuffer.isView(e)) return e;
    if (e instanceof Blob) return {
      path: "",
      content: e
    };
    if (typeof e == "string") return {
      path: "",
      content: e
    };
    {
      var _s3 = Se(e);

      if (_s3) return Ae(_s3, t);
      throw TypeError("Unexpected input: " + typeof e);
    }
  },
      Ee = function Ee(e, t) {
    if (typeof e == "number") throw TypeError("Iterable of numbers is not supported");
    if (e instanceof ArrayBuffer) return e;
    if (ArrayBuffer.isView(e)) return e;
    if (e instanceof Blob) return {
      path: "",
      content: e
    };
    if (typeof e == "string") return {
      path: "",
      content: e
    };
    {
      var _s4 = Se(e);

      if (_s4) return Ae(_s4, t);
      throw TypeError("Unexpected input: " + typeof e);
    }
  },
      Ae = function Ae(_ref13, n) {
    var e = _ref13.path,
        t = _ref13.mode,
        s = _ref13.mtime,
        r = _ref13.content;
    return {
      path: e,
      mode: t,
      mtime: s,
      content: r ? m0(r, n) : void 0
    };
  },
      m0 = function m0(e, t) {
    if (e == null) return "";
    if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return e;
    if (e instanceof Blob) return e;
    if (typeof e == "string") return e;
    {
      var _s5 = Ce(e);

      if (_s5) return A(_s5, Ee, t);

      var _r5 = qe(e);

      if (_r5) return A(_r5, B, t);

      var _n7 = Ie(e);

      if (_n7) return A(ve(_n7), B, t);
      throw TypeError("Unexpected input: " + typeof e);
    }
  },
      Ce = function Ce(e) {
    var t = e;
    return t && typeof t[Symbol.iterator] == "function" ? t : null;
  },
      qe = function qe(e) {
    var t = e;
    return t && typeof t[Symbol.asyncIterator] == "function" ? t : null;
  },
      Ie = function Ie(e) {
    return e && typeof e.getReader == "function" ? e : null;
  },
      Se = function Se(e) {
    return typeof e == "object" && (e.path || e.content) ? e : null;
  };

  Fs.exports = Qs;
});
var $s = o(function (Wo, Xs) {
  "use strict";

  var g0 = z(),
      _D6 = D(),
      w0 = _D6.decodeCID,
      y0 = _D6.CID,
      Ks = /*#__PURE__*/function (_g) {
    _inherits(Ks, _g);

    var _super7 = _createSuper(Ks);

    function Ks(t) {
      _classCallCheck(this, Ks);

      return _super7.call(this, "files", ["stat"], t);
    }

    _createClass(Ks, [{
      key: "stat",
      value: function () {
        var _stat2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee17(t) {
          var s,
              r,
              n,
              i,
              b,
              a,
              _yield$this$remote$st,
              l,
              _args17 = arguments;

          return regenerator_default.a.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  s = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
                  r = s.size;
                  n = s.hash;
                  i = s.withLocal;
                  b = s.timeout;
                  a = s.signal;
                  _context17.next = 8;
                  return this.remote.stat({
                    path: v0(t),
                    size: r,
                    hash: n,
                    withLocal: i,
                    timeout: b,
                    signal: a
                  });

                case 8:
                  _yield$this$remote$st = _context17.sent;
                  l = _yield$this$remote$st.stat;
                  return _context17.abrupt("return", E0(l));

                case 11:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee17, this);
        }));

        function stat(_x13) {
          return _stat2.apply(this, arguments);
        }

        return stat;
      }()
    }]);

    return Ks;
  }(g0);

  Xs.exports = Ks;

  var v0 = function v0(e) {
    return y0.isCID(e) ? "/ipfs/".concat(e.toString()) : e;
  },
      E0 = function E0(e) {
    return _objectSpread(_objectSpread({}, e), {}, {
      cid: w0(e.cid)
    });
  };
});
var Ws = o(function (Yo, Hs) {
  "use strict";

  var Zs = Ne(),
      A0 = Ts(),
      C0 = Bs(),
      q0 = Ps(),
      I0 = $s(),
      G = /*#__PURE__*/function (_q4) {
    _inherits(G, _q4);

    var _super8 = _createSuper(G);

    function G(t) {
      var _this9;

      _classCallCheck(this, G);

      _this9 = _super8.call(this, t);
      _this9.transport = t, _this9.dag = new C0(_this9.transport), _this9.files = new I0(_this9.transport), _this9.block = new A0(_this9.transport);
      return _this9;
    }

    _createClass(G, null, [{
      key: "attach",
      value: function attach(t, s) {
        t.transport.connect(s);
      }
    }, {
      key: "detached",
      value: function detached() {
        return new G(new Zs(void 0));
      }
    }, {
      key: "from",
      value: function from(t) {
        return new G(new Zs(t));
      }
    }]);

    return G;
  }(q0);

  Hs.exports = G;
});
var er = o(function (t2, Ys) {
  "use strict";

  var _q5 = q(),
      T0 = _q5.encoding,
      _v7 = v(),
      U0 = _v7.TextEncoder,
      j0 = new U0();

  function M0(e) {
    var t = new Uint8Array(e.length);

    for (var _s6 = 0; _s6 < e.length; _s6++) {
      t[_s6] = e.charCodeAt(_s6);
    }

    return t;
  }

  function N0(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    return t === "utf8" || t === "utf-8" ? j0.encode(e) : t === "ascii" ? M0(e) : T0(t).decode(e);
  }

  Ys.exports = N0;
});
var sr = o(function (s2, tr) {
  "use strict";

  var _q6 = q(),
      B0 = _q6.encoding,
      _v8 = v(),
      R0 = _v8.TextDecoder,
      z0 = new R0("utf8");

  function O0(e) {
    var t = "";

    for (var _s7 = 0; _s7 < e.length; _s7++) {
      t += String.fromCharCode(e[_s7]);
    }

    return t;
  }

  function F0(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
    return t === "utf8" || t === "utf-8" ? z0.decode(e) : t === "ascii" ? O0(e) : B0(t).encode(e);
  }

  tr.exports = F0;
});
var nr = o(function (r2, rr) {
  "use strict";

  function L0(e, t) {
    t || (t = e.reduce(function (n, i) {
      return n + i.length;
    }, 0));
    var s = new Uint8Array(t),
        r = 0;

    var _iterator11 = _createForOfIteratorHelper(e),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _n8 = _step11.value;
        s.set(_n8, r), r += _n8.length;
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }

    return s;
  }

  rr.exports = L0;
});
var ir = R(Ue()),
    or = R(Ws());
var S0 = ["https://ipfs.io/ipfs/:hash", "https://dweb.link/ipfs/:hash", "https://gateway.ipfs.io/ipfs/:hash", "https://ipfs.infura.io/ipfs/:hash", "https://ninetailed.ninja/ipfs/:hash", "https://10.via0.com/ipfs/:hash", "https://ipfs.eternum.io/ipfs/:hash", "https://hardbin.com/ipfs/:hash", "https://cloudflare-ipfs.com/ipfs/:hash", "https://cf-ipfs.com/ipfs/:hash", "https://gateway.pinata.cloud/ipfs/:hash", "https://ipfs.sloppyta.co/ipfs/:hash", "https://ipfs.greyh.at/ipfs/:hash", "https://jorropo.ovh/ipfs/:hash", "https://jorropo.net/ipfs/:hash", "https://gateway.temporal.cloud/ipfs/:hash", "https://ipfs.runfission.com/ipfs/:hash", "https://trusti.id/ipfs/:hash", "https://ipfs.overpi.com/ipfs/:hash", "https://ipfs.ink/ipfs/:hash", "https://gateway.ravenland.org/ipfs/:hash", "https://ipfs.smartsignature.io/ipfs/:hash", "https://ipfs.telos.miami/ipfs/:hash", "https://robotizing.net/ipfs/:hash", "https://ipfs.mttk.net/ipfs/:hash", "https://ipfs.fleek.co/ipfs/:hash", "https://ipfs.jbb.one/ipfs/:hash", "https://jacl.tech/ipfs/:hash", "https://ipfs.k1ic.com/ipfs/:hash", "https://ipfs.drink.cafe/ipfs/:hash", "https://ipfs.azurewebsites.net/ipfs/:hash", "https://gw.ipfspin.com/ipfs/:hash", "https://ipfs.denarius.io/ipfs/:hash"];

function D0(e) {
  var t = 0;
  return new Promise(function (s, r) {
    return e.forEach(function (n) {
      return n.then(s).catch(function () {
        ++t === e.length && r();
      });
    });
  });
}

var br = R(er()),
    ar = R(sr()),
    cr = R(nr());

var V0 = function V0(e) {
  return new Uint8Array((e.match(/.{1,2}/g) || []).map(function (t) {
    return parseInt(t, 16);
  }));
};

var _0 = or.default;
var G0 = ir.default;
var Q0 = cr.default;
var J0 = br.default;
var P0 = ar.default;

// CONCATENATED MODULE: ./node_modules/@zedvision/code/src/ipfsClient.js




var workerSrc = "./src/workers/ipfsWorker.js";
/** @type {MessagePort} */

var port;

if (typeof window !== "undefined") {
  if (false) { var ipfsWorker; } else {
    var worker = new Worker(workerSrc);

    var ipfsClient_MessageChannel = new MessageChannel(),
        port1 = ipfsClient_MessageChannel.port1,
        port2 = ipfsClient_MessageChannel.port2;

    var msg = {
      clientInit: true,
      port: port1
    };
    worker.postMessage(msg, [port1]);
    port = port2;
  }
}

var ipfsClient = _0.from(port);
var ipfsCat = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(cid, opts) {
    var options, res, result, resultStr;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = opts || {};
            res = ipfsClient.cat(cid, options);
            _context.t0 = Q0;
            _context.next = 5;
            return G0(res);

          case 5:
            _context.t1 = _context.sent;
            result = (0, _context.t0)(_context.t1);
            resultStr = P0(result);
            return _context.abrupt("return", resultStr);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ipfsCat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();






/***/ })

}]);
//# sourceMappingURL=4-86ea2157220cc583c604.js.map