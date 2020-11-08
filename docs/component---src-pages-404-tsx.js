(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[8],Array(55).concat([
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _JSONArrow = _interopRequireDefault(__webpack_require__(97));

var _getCollectionEntries = _interopRequireDefault(__webpack_require__(163));

var _JSONNode = _interopRequireDefault(__webpack_require__(96));

var _ItemRange = _interopRequireDefault(__webpack_require__(164));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function isRange(rangeOrEntry) {
  return rangeOrEntry.to !== undefined;
}

function renderChildNodes(props, from, to) {
  var nodeType = props.nodeType,
      data = props.data,
      collectionLimit = props.collectionLimit,
      circularCache = props.circularCache,
      keyPath = props.keyPath,
      postprocessValue = props.postprocessValue,
      sortObjectKeys = props.sortObjectKeys;
  var childNodes = [];
  (0, _getCollectionEntries["default"])(nodeType, data, sortObjectKeys, collectionLimit, from, to).forEach(function (entry) {
    if (isRange(entry)) {
      childNodes.push( /*#__PURE__*/_react["default"].createElement(_ItemRange["default"], _extends({}, props, {
        key: "ItemRange--".concat(entry.from, "-").concat(entry.to),
        from: entry.from,
        to: entry.to,
        renderChildNodes: renderChildNodes
      })));
    } else {
      var key = entry.key,
          value = entry.value;
      var isCircular = circularCache.indexOf(value) !== -1;
      childNodes.push( /*#__PURE__*/_react["default"].createElement(_JSONNode["default"], _extends({}, props, {
        postprocessValue: postprocessValue,
        collectionLimit: collectionLimit
      }, {
        key: "Node--".concat(key),
        keyPath: [key].concat(_toConsumableArray(keyPath)),
        value: postprocessValue(value),
        circularCache: [].concat(_toConsumableArray(circularCache), [value]),
        isCircular: isCircular,
        hideRoot: false
      })));
    }
  });
  return childNodes;
}

function getStateFromProps(props) {
  // calculate individual node expansion if necessary
  var expanded = props.shouldExpandNode && !props.isCircular ? props.shouldExpandNode(props.keyPath, props.data, props.level) : false;
  return {
    expanded: expanded
  };
}

var JSONNestedNode = /*#__PURE__*/function (_React$Component) {
  _inherits(JSONNestedNode, _React$Component);

  var _super = _createSuper(JSONNestedNode);

  function JSONNestedNode(props) {
    var _this;

    _classCallCheck(this, JSONNestedNode);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      if (_this.props.expandable) {
        _this.setState({
          expanded: !_this.state.expanded
        });
      }
    });

    _this.state = getStateFromProps(props);
    return _this;
  }

  _createClass(JSONNestedNode, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextState = getStateFromProps(nextProps);

      if (getStateFromProps(this.props).expanded !== nextState.expanded) {
        this.setState(nextState);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      return !!Object.keys(nextProps).find(function (key) {
        return key !== 'circularCache' && (key === 'keyPath' ? nextProps[key].join('/') !== _this2.props[key].join('/') : nextProps[key] !== _this2.props[key]);
      }) || nextState.expanded !== this.state.expanded;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getItemString = _this$props.getItemString,
          nodeTypeIndicator = _this$props.nodeTypeIndicator,
          nodeType = _this$props.nodeType,
          data = _this$props.data,
          hideRoot = _this$props.hideRoot,
          createItemString = _this$props.createItemString,
          styling = _this$props.styling,
          collectionLimit = _this$props.collectionLimit,
          keyPath = _this$props.keyPath,
          labelRenderer = _this$props.labelRenderer,
          expandable = _this$props.expandable;
      var expanded = this.state.expanded;
      var renderedChildren = expanded || hideRoot && this.props.level === 0 ? renderChildNodes(_objectSpread(_objectSpread({}, this.props), {}, {
        level: this.props.level + 1
      })) : null;

      var itemType = /*#__PURE__*/_react["default"].createElement("span", styling('nestedNodeItemType', expanded), nodeTypeIndicator);

      var renderedItemString = getItemString(nodeType, data, itemType, createItemString(data, collectionLimit));
      var stylingArgs = [keyPath, nodeType, expanded, expandable];
      return hideRoot ? /*#__PURE__*/_react["default"].createElement("li", styling.apply(void 0, ['rootNode'].concat(stylingArgs)), /*#__PURE__*/_react["default"].createElement("ul", styling.apply(void 0, ['rootNodeChildren'].concat(stylingArgs)), renderedChildren)) : /*#__PURE__*/_react["default"].createElement("li", styling.apply(void 0, ['nestedNode'].concat(stylingArgs)), expandable && /*#__PURE__*/_react["default"].createElement(_JSONArrow["default"], {
        styling: styling,
        nodeType: nodeType,
        expanded: expanded,
        onClick: this.handleClick
      }), /*#__PURE__*/_react["default"].createElement("label", _extends({}, styling.apply(void 0, [['label', 'nestedNodeLabel']].concat(stylingArgs)), {
        onClick: this.handleClick
      }), labelRenderer.apply(void 0, stylingArgs)), /*#__PURE__*/_react["default"].createElement("span", _extends({}, styling.apply(void 0, ['nestedNodeItemString'].concat(stylingArgs)), {
        onClick: this.handleClick
      }), renderedItemString), /*#__PURE__*/_react["default"].createElement("ul", styling.apply(void 0, ['nestedNodeChildren'].concat(stylingArgs)), renderedChildren));
    }
  }]);

  return JSONNestedNode;
}(_react["default"].Component);

exports["default"] = JSONNestedNode;

_defineProperty(JSONNestedNode, "propTypes", {
  getItemString: _propTypes["default"].func.isRequired,
  nodeTypeIndicator: _propTypes["default"].any,
  nodeType: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].any,
  hideRoot: _propTypes["default"].bool.isRequired,
  createItemString: _propTypes["default"].func.isRequired,
  styling: _propTypes["default"].func.isRequired,
  collectionLimit: _propTypes["default"].number,
  keyPath: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])).isRequired,
  labelRenderer: _propTypes["default"].func.isRequired,
  shouldExpandNode: _propTypes["default"].func,
  level: _propTypes["default"].number.isRequired,
  sortObjectKeys: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]),
  isCircular: _propTypes["default"].bool,
  expandable: _propTypes["default"].bool
});

_defineProperty(JSONNestedNode, "defaultProps", {
  data: [],
  circularCache: [],
  level: 0,
  expandable: true
});

/***/ }),
/* 56 */
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
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _objType = _interopRequireDefault(__webpack_require__(161));

var _JSONObjectNode = _interopRequireDefault(__webpack_require__(162));

var _JSONArrayNode = _interopRequireDefault(__webpack_require__(165));

var _JSONIterableNode = _interopRequireDefault(__webpack_require__(166));

var _JSONValueNode = _interopRequireDefault(__webpack_require__(167));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var JSONNode = function JSONNode(_ref) {
  var getItemString = _ref.getItemString,
      keyPath = _ref.keyPath,
      labelRenderer = _ref.labelRenderer,
      styling = _ref.styling,
      value = _ref.value,
      valueRenderer = _ref.valueRenderer,
      isCustomNode = _ref.isCustomNode,
      rest = _objectWithoutProperties(_ref, ["getItemString", "keyPath", "labelRenderer", "styling", "value", "valueRenderer", "isCustomNode"]);

  var nodeType = isCustomNode(value) ? 'Custom' : (0, _objType["default"])(value);
  var simpleNodeProps = {
    getItemString: getItemString,
    key: keyPath[0],
    keyPath: keyPath,
    labelRenderer: labelRenderer,
    nodeType: nodeType,
    styling: styling,
    value: value,
    valueRenderer: valueRenderer
  };

  var nestedNodeProps = _objectSpread(_objectSpread(_objectSpread({}, rest), simpleNodeProps), {}, {
    data: value,
    isCustomNode: isCustomNode
  });

  switch (nodeType) {
    case 'Object':
    case 'Error':
    case 'WeakMap':
    case 'WeakSet':
      return /*#__PURE__*/_react["default"].createElement(_JSONObjectNode["default"], nestedNodeProps);

    case 'Array':
      return /*#__PURE__*/_react["default"].createElement(_JSONArrayNode["default"], nestedNodeProps);

    case 'Iterable':
    case 'Map':
    case 'Set':
      return /*#__PURE__*/_react["default"].createElement(_JSONIterableNode["default"], nestedNodeProps);

    case 'String':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter(raw) {
          return "\"".concat(raw, "\"");
        }
      }));

    case 'Number':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], simpleNodeProps);

    case 'Boolean':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter(raw) {
          return raw ? 'true' : 'false';
        }
      }));

    case 'Date':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter(raw) {
          return raw.toISOString();
        }
      }));

    case 'Null':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter() {
          return 'null';
        }
      }));

    case 'Undefined':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter() {
          return 'undefined';
        }
      }));

    case 'Function':
    case 'Symbol':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter(raw) {
          return raw.toString();
        }
      }));

    case 'Custom':
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], simpleNodeProps);

    default:
      return /*#__PURE__*/_react["default"].createElement(_JSONValueNode["default"], _extends({}, simpleNodeProps, {
        valueGetter: function valueGetter() {
          return "<".concat(nodeType, ">");
        }
      }));
  }
};

JSONNode.propTypes = {
  getItemString: _propTypes["default"].func.isRequired,
  keyPath: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired).isRequired,
  labelRenderer: _propTypes["default"].func.isRequired,
  styling: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].any,
  valueRenderer: _propTypes["default"].func.isRequired,
  isCustomNode: _propTypes["default"].func.isRequired
};
var _default = JSONNode;
exports["default"] = _default;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var JSONArrow = function JSONArrow(_ref) {
  var styling = _ref.styling,
      arrowStyle = _ref.arrowStyle,
      expanded = _ref.expanded,
      nodeType = _ref.nodeType,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, styling('arrowContainer', arrowStyle), {
    onClick: onClick
  }), /*#__PURE__*/_react["default"].createElement("div", styling(['arrow', 'arrowSign'], nodeType, expanded, arrowStyle), "\u25B6", arrowStyle === 'double' && /*#__PURE__*/_react["default"].createElement("div", styling(['arrowSign', 'arrowSignInner']), "\u25B6")));
};

JSONArrow.propTypes = {
  styling: _propTypes["default"].func.isRequired,
  arrowStyle: _propTypes["default"].oneOf(['single', 'double']),
  expanded: _propTypes["default"].bool.isRequired,
  nodeType: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired
};
JSONArrow.defaultProps = {
  arrowStyle: 'single'
};
var _default = JSONArrow;
exports["default"] = _default;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  invertBase16Theme: true,
  createStyling: true,
  getBase16Theme: true,
  invertTheme: true,
  Base16Theme: true
};
Object.defineProperty(exports, "Base16Theme", {
  enumerable: true,
  get: function get() {
    return base16.Base16Theme;
  }
});
exports.invertTheme = exports.getBase16Theme = exports.createStyling = exports.invertBase16Theme = void 0;

var base16 = _interopRequireWildcard(__webpack_require__(169));

var _color = _interopRequireDefault(__webpack_require__(218));

var _lodash = _interopRequireDefault(__webpack_require__(226));

var _colorConverters = __webpack_require__(227);

var _types = __webpack_require__(228);

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var DEFAULT_BASE16 = base16["default"];
var BASE16_KEYS = Object.keys(DEFAULT_BASE16); // we need a correcting factor, so that a dark, but not black background color
// converts to bright enough inversed color

var flip = function flip(x) {
  return x < 0.25 ? 1 : x < 0.5 ? 0.9 - x : 1.1 - x;
};

var invertColor = function invertColor(hexString) {
  var color = (0, _color["default"])(hexString);

  var _rgb2yuv = (0, _colorConverters.rgb2yuv)(color.array()),
      _rgb2yuv2 = _slicedToArray(_rgb2yuv, 3),
      y = _rgb2yuv2[0],
      u = _rgb2yuv2[1],
      v = _rgb2yuv2[2];

  var flippedYuv = [flip(y), u, v];
  var rgb = (0, _colorConverters.yuv2rgb)(flippedYuv);
  return _color["default"].rgb(rgb).hex();
};

var merger = function merger(styling) {
  return function (prevStyling) {
    return {
      className: [prevStyling.className, styling.className].filter(Boolean).join(' '),
      style: _objectSpread(_objectSpread({}, prevStyling.style || {}), styling.style || {})
    };
  };
};

var mergeStyling = function mergeStyling(customStyling, defaultStyling) {
  if (customStyling === undefined) {
    return defaultStyling;
  }

  if (defaultStyling === undefined) {
    return customStyling;
  }

  var customType = _typeof(customStyling);

  var defaultType = _typeof(defaultStyling);

  switch (customType) {
    case 'string':
      switch (defaultType) {
        case 'string':
          return [defaultStyling, customStyling].filter(Boolean).join(' ');

        case 'object':
          return merger({
            className: customStyling,
            style: defaultStyling
          });

        case 'function':
          return function (styling) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return merger({
              className: customStyling
            })(defaultStyling.apply(void 0, [styling].concat(args)));
          };
      }

      break;

    case 'object':
      switch (defaultType) {
        case 'string':
          return merger({
            className: defaultStyling,
            style: customStyling
          });

        case 'object':
          return _objectSpread(_objectSpread({}, defaultStyling), customStyling);

        case 'function':
          return function (styling) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return merger({
              style: customStyling
            })(defaultStyling.apply(void 0, [styling].concat(args)));
          };
      }

      break;

    case 'function':
      switch (defaultType) {
        case 'string':
          return function (styling) {
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

            return customStyling.apply(void 0, [merger(styling)({
              className: defaultStyling
            })].concat(args));
          };

        case 'object':
          return function (styling) {
            for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              args[_key4 - 1] = arguments[_key4];
            }

            return customStyling.apply(void 0, [merger(styling)({
              style: defaultStyling
            })].concat(args));
          };

        case 'function':
          return function (styling) {
            for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              args[_key5 - 1] = arguments[_key5];
            }

            return customStyling.apply(void 0, [defaultStyling.apply(void 0, [styling].concat(args))].concat(args));
          };
      }

  }
};

var mergeStylings = function mergeStylings(customStylings, defaultStylings) {
  var keys = Object.keys(defaultStylings);

  for (var key in customStylings) {
    if (keys.indexOf(key) === -1) keys.push(key);
  }

  return keys.reduce(function (mergedStyling, key) {
    return mergedStyling[key] = mergeStyling(customStylings[key], defaultStylings[key]), mergedStyling;
  }, {});
};

var getStylingByKeys = function getStylingByKeys(mergedStyling, keys) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  if (keys === null) {
    return mergedStyling;
  }

  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  var styles = keys.map(function (key) {
    return mergedStyling[key];
  }).filter(Boolean);
  var props = styles.reduce(function (obj, s) {
    if (typeof s === 'string') {
      obj.className = [obj.className, s].filter(Boolean).join(' ');
    } else if (_typeof(s) === 'object') {
      obj.style = _objectSpread(_objectSpread({}, obj.style), s);
    } else if (typeof s === 'function') {
      obj = _objectSpread(_objectSpread({}, obj), s.apply(void 0, [obj].concat(args)));
    }

    return obj;
  }, {
    className: '',
    style: {}
  });

  if (!props.className) {
    delete props.className;
  }

  if (Object.keys(props.style).length === 0) {
    delete props.style;
  }

  return props;
};

var invertBase16Theme = function invertBase16Theme(base16Theme) {
  return Object.keys(base16Theme).reduce(function (t, key) {
    return t[key] = /^base/.test(key) ? invertColor(base16Theme[key]) : key === 'scheme' ? base16Theme[key] + ':inverted' : base16Theme[key], t;
  }, {});
};

exports.invertBase16Theme = invertBase16Theme;
var createStyling = (0, _lodash["default"])(function (getStylingFromBase16) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var themeOrStyling = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$defaultBase = options.defaultBase16,
      defaultBase16 = _options$defaultBase === void 0 ? DEFAULT_BASE16 : _options$defaultBase,
      _options$base16Themes = options.base16Themes,
      base16Themes = _options$base16Themes === void 0 ? null : _options$base16Themes;
  var base16Theme = getBase16Theme(themeOrStyling, base16Themes);

  if (base16Theme) {
    themeOrStyling = _objectSpread(_objectSpread({}, base16Theme), themeOrStyling);
  }

  var theme = BASE16_KEYS.reduce(function (t, key) {
    return t[key] = themeOrStyling[key] || defaultBase16[key], t;
  }, {});
  var customStyling = Object.keys(themeOrStyling).reduce(function (s, key) {
    return BASE16_KEYS.indexOf(key) === -1 ? (s[key] = themeOrStyling[key], s) : s;
  }, {});
  var defaultStyling = getStylingFromBase16(theme);
  var mergedStyling = mergeStylings(customStyling, defaultStyling);

  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key7 = 3; _key7 < _len7; _key7++) {
    args[_key7 - 3] = arguments[_key7];
  }

  return (0, _lodash["default"])(getStylingByKeys, 2).apply(void 0, [mergedStyling].concat(args));
}, 3);
exports.createStyling = createStyling;

var isStylingConfig = function isStylingConfig(theme) {
  return !!theme.extend;
};

var getBase16Theme = function getBase16Theme(theme, base16Themes) {
  if (theme && isStylingConfig(theme) && theme.extend) {
    theme = theme.extend;
  }

  if (typeof theme === 'string') {
    var _theme$split = theme.split(':'),
        _theme$split2 = _slicedToArray(_theme$split, 2),
        _themeName = _theme$split2[0],
        modifier = _theme$split2[1];

    if (base16Themes) {
      theme = base16Themes[_themeName];
    } else {
      theme = base16[_themeName];
    }

    if (modifier === 'inverted') {
      theme = invertBase16Theme(theme);
    }
  }

  return theme && Object.prototype.hasOwnProperty.call(theme, 'base00') ? theme : undefined;
};

exports.getBase16Theme = getBase16Theme;

var invertTheme = function invertTheme(theme) {
  if (typeof theme === 'string') {
    return "".concat(theme, ":inverted");
  }

  if (theme && isStylingConfig(theme) && theme.extend) {
    if (typeof theme.extend === 'string') {
      return _objectSpread(_objectSpread({}, theme), {}, {
        extend: "".concat(theme.extend, ":inverted")
      });
    }

    return _objectSpread(_objectSpread({}, theme), {}, {
      extend: invertBase16Theme(theme.extend)
    });
  }

  if (theme) {
    return invertBase16Theme(theme);
  }

  return theme;
};

exports.invertTheme = invertTheme;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(42);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var shared = __webpack_require__(80);
var has = __webpack_require__(13);
var uid = __webpack_require__(81);
var NATIVE_SYMBOL = __webpack_require__(101);
var USE_SYMBOL_AS_UID = __webpack_require__(174);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(10);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(224); // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


var reverseKeywords = {};

for (var key in cssKeywords) {
  if (cssKeywords.hasOwnProperty(key)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
}

var convert = module.exports = {
  rgb: {
    channels: 3,
    labels: 'rgb'
  },
  hsl: {
    channels: 3,
    labels: 'hsl'
  },
  hsv: {
    channels: 3,
    labels: 'hsv'
  },
  hwb: {
    channels: 3,
    labels: 'hwb'
  },
  cmyk: {
    channels: 4,
    labels: 'cmyk'
  },
  xyz: {
    channels: 3,
    labels: 'xyz'
  },
  lab: {
    channels: 3,
    labels: 'lab'
  },
  lch: {
    channels: 3,
    labels: 'lch'
  },
  hex: {
    channels: 1,
    labels: ['hex']
  },
  keyword: {
    channels: 1,
    labels: ['keyword']
  },
  ansi16: {
    channels: 1,
    labels: ['ansi16']
  },
  ansi256: {
    channels: 1,
    labels: ['ansi256']
  },
  hcg: {
    channels: 3,
    labels: ['h', 'c', 'g']
  },
  apple: {
    channels: 3,
    labels: ['r16', 'g16', 'b16']
  },
  gray: {
    channels: 1,
    labels: ['gray']
  }
}; // hide .channels and .labels properties

for (var model in convert) {
  if (convert.hasOwnProperty(model)) {
    if (!('channels' in convert[model])) {
      throw new Error('missing channels property: ' + model);
    }

    if (!('labels' in convert[model])) {
      throw new Error('missing channel labels property: ' + model);
    }

    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error('channel and label counts mismatch: ' + model);
    }

    var channels = convert[model].channels;
    var labels = convert[model].labels;
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], 'channels', {
      value: channels
    });
    Object.defineProperty(convert[model], 'labels', {
      value: labels
    });
  }
}

convert.rgb.hsl = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h;
  var s;
  var l;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
  var rdif;
  var gdif;
  var bdif;
  var h;
  var s;
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var v = Math.max(r, g, b);
  var diff = v - Math.min(r, g, b);

  var diffc = function diffc(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [h * 360, s * 100, v * 100];
};

convert.rgb.hwb = function (rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var h = convert.rgb.hsl(rgb)[0];
  var w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var c;
  var m;
  var y;
  var k;
  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};
/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */


function comparativeDistance(x, y) {
  return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}

convert.rgb.keyword = function (rgb) {
  var reversed = reverseKeywords[rgb];

  if (reversed) {
    return reversed;
  }

  var currentClosestDistance = Infinity;
  var currentClosestKeyword;

  for (var keyword in cssKeywords) {
    if (cssKeywords.hasOwnProperty(keyword)) {
      var value = cssKeywords[keyword]; // Compute comparative distance

      var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
  }

  return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
  return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255; // assume sRGB

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
  var xyz = convert.rgb.xyz(rgb);
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
  var h = hsl[0] / 360;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var t1;
  var t2;
  var t3;
  var rgb;
  var val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  t1 = 2 * l - t2;
  rgb = [0, 0, 0];

  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);

    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

convert.hsl.hsv = function (hsl) {
  var h = hsl[0];
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var smin = s;
  var lmin = Math.max(l, 0.01);
  var sv;
  var v;
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (l + s) / 2;
  sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;
  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  switch (hi) {
    case 0:
      return [v, t, p];

    case 1:
      return [q, v, p];

    case 2:
      return [p, v, t];

    case 3:
      return [p, q, v];

    case 4:
      return [t, p, v];

    case 5:
      return [v, p, q];
  }
};

convert.hsv.hsl = function (hsv) {
  var h = hsv[0];
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var vmin = Math.max(v, 0.01);
  var lmin;
  var sl;
  var l;
  l = (2 - s) * v;
  lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


convert.hwb.rgb = function (hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1] / 100;
  var bl = hwb[2] / 100;
  var ratio = wh + bl;
  var i;
  var v;
  var f;
  var n; // wh + bl cant be > 1

  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  n = wh + f * (v - wh); // linear interpolation

  var r;
  var g;
  var b;

  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;

    case 1:
      r = n;
      g = v;
      b = wh;
      break;

    case 2:
      r = wh;
      g = v;
      b = n;
      break;

    case 3:
      r = wh;
      g = n;
      b = v;
      break;

    case 4:
      r = n;
      g = wh;
      b = v;
      break;

    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }

  return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
  var c = cmyk[0] / 100;
  var m = cmyk[1] / 100;
  var y = cmyk[2] / 100;
  var k = cmyk[3] / 100;
  var r;
  var g;
  var b;
  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
  var x = xyz[0] / 100;
  var y = xyz[1] / 100;
  var z = xyz[2] / 100;
  var r;
  var g;
  var b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};

convert.lab.xyz = function (lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var x;
  var y;
  var z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  var y2 = Math.pow(y, 3);
  var x2 = Math.pow(x, 3);
  var z2 = Math.pow(z, 3);
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};

convert.lab.lch = function (lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var hr;
  var h;
  var c;
  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};

convert.lch.lab = function (lch) {
  var l = lch[0];
  var c = lch[1];
  var h = lch[2];
  var a;
  var b;
  var hr;
  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
  var r = args[0];
  var g = args[1];
  var b = args[2];
  var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

  value = Math.round(value / 50);

  if (value === 0) {
    return 30;
  }

  var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return ansi;
};

convert.hsv.ansi16 = function (args) {
  // optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
  var r = args[0];
  var g = args[1];
  var b = args[2]; // we use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.

  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round((r - 8) / 247 * 24) + 232;
  }

  var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};

convert.ansi16.rgb = function (args) {
  var color = args % 10; // handle greyscale

  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }

    color = color / 10.5 * 255;
    return [color, color, color];
  }

  var mult = (~~(args > 50) + 1) * 0.5;
  var r = (color & 1) * mult * 255;
  var g = (color >> 1 & 1) * mult * 255;
  var b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};

convert.ansi256.rgb = function (args) {
  // handle greyscale
  if (args >= 232) {
    var c = (args - 232) * 10 + 8;
    return [c, c, c];
  }

  args -= 16;
  var rem;
  var r = Math.floor(args / 36) / 5 * 255;
  var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  var b = rem % 6 / 5 * 255;
  return [r, g, b];
};

convert.rgb.hex = function (args) {
  var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
  var string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

  if (!match) {
    return [0, 0, 0];
  }

  var colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  var integer = parseInt(colorString, 16);
  var r = integer >> 16 & 0xFF;
  var g = integer >> 8 & 0xFF;
  var b = integer & 0xFF;
  return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var max = Math.max(Math.max(r, g), b);
  var min = Math.min(Math.min(r, g), b);
  var chroma = max - min;
  var grayscale;
  var hue;

  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma + 4;
  }

  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var c = 1;
  var f = 0;

  if (l < 0.5) {
    c = 2.0 * s * l;
  } else {
    c = 2.0 * s * (1.0 - l);
  }

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var c = s * v;
  var f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
  var h = hcg[0] / 360;
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255];
  }

  var pure = [0, 0, 0];
  var hi = h % 1 * 6;
  var v = hi % 1;
  var w = 1 - v;
  var mg = 0;

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;

    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;

    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;

    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;

    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;

    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }

  mg = (1.0 - c) * g;
  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
};

convert.hcg.hsv = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1.0 - c);
  var f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var l = g * (1.0 - c) + 0.5 * c;
  var s = 0;

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l));
  }

  return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
  var w = hwb[1] / 100;
  var b = hwb[2] / 100;
  var v = 1 - b;
  var c = v - w;
  var g = 0;

  if (c < 1) {
    g = (v - c) / (1 - c);
  }

  return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert.rgb.apple = function (rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
  return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
  var val = Math.round(gray[0] / 100 * 255) & 0xFF;
  var integer = (val << 16) + (val << 8) + val;
  var string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
  var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};

/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StylingValue", {
  enumerable: true,
  get: function get() {
    return _reactBase16Styling.StylingValue;
  }
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _JSONNode = _interopRequireDefault(__webpack_require__(96));

var _createStylingFromTheme = _interopRequireDefault(__webpack_require__(168));

var _reactBase16Styling = __webpack_require__(98);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var identity = function identity(value) {
  return value;
};

var expandRootNode = function expandRootNode(keyPath, data, level) {
  return level === 0;
};

var defaultItemString = function defaultItemString(type, data, itemType, itemString) {
  return /*#__PURE__*/_react["default"].createElement("span", null, itemType, " ", itemString);
};

var defaultLabelRenderer = function defaultLabelRenderer(_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      label = _ref2[0];

  return /*#__PURE__*/_react["default"].createElement("span", null, label, ":");
};

var noCustomNode = function noCustomNode() {
  return false;
};

function checkLegacyTheming(theme, props) {
  var deprecatedStylingMethodsMap = {
    getArrowStyle: 'arrow',
    getListStyle: 'nestedNodeChildren',
    getItemStringStyle: 'nestedNodeItemString',
    getLabelStyle: 'label',
    getValueStyle: 'valueText'
  };
  var deprecatedStylingMethods = Object.keys(deprecatedStylingMethodsMap).filter(function (name) {
    return props[name];
  });

  if (deprecatedStylingMethods.length > 0) {
    if (typeof theme === 'string') {
      theme = {
        extend: theme
      };
    } else {
      theme = _objectSpread({}, theme);
    }

    deprecatedStylingMethods.forEach(function (name) {
      // eslint-disable-next-line no-console
      console.error("Styling method \"".concat(name, "\" is deprecated, use \"theme\" property instead"));

      theme[deprecatedStylingMethodsMap[name]] = function (_ref3) {
        var style = _ref3.style;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return {
          style: _objectSpread(_objectSpread({}, style), props[name].apply(props, args))
        };
      };
    });
  }

  return theme;
}

function getStateFromProps(props) {
  var theme = checkLegacyTheming(props.theme, props);

  if (props.invertTheme) {
    theme = (0, _reactBase16Styling.invertTheme)(theme);
  }

  return {
    styling: (0, _createStylingFromTheme["default"])(theme)
  };
}

var JSONTree = /*#__PURE__*/function (_React$Component) {
  _inherits(JSONTree, _React$Component);

  var _super = _createSuper(JSONTree);

  function JSONTree(props) {
    var _this;

    _classCallCheck(this, JSONTree);

    _this = _super.call(this, props);
    _this.state = getStateFromProps(props);
    return _this;
  }

  _createClass(JSONTree, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (['theme', 'invertTheme'].find(function (k) {
        return nextProps[k] !== _this2.props[k];
      })) {
        this.setState(getStateFromProps(nextProps));
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this3 = this;

      return !!Object.keys(nextProps).find(function (k) {
        return k === 'keyPath' ? nextProps[k].join('/') !== _this3.props[k].join('/') : nextProps[k] !== _this3.props[k];
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.data,
          keyPath = _this$props.keyPath,
          postprocessValue = _this$props.postprocessValue,
          hideRoot = _this$props.hideRoot,
          theme = _this$props.theme,
          _ = _this$props.invertTheme,
          rest = _objectWithoutProperties(_this$props, ["data", "keyPath", "postprocessValue", "hideRoot", "theme", "invertTheme"]);

      var styling = this.state.styling;
      return /*#__PURE__*/_react["default"].createElement("ul", styling('tree'), /*#__PURE__*/_react["default"].createElement(_JSONNode["default"], _extends({}, _objectSpread({
        postprocessValue: postprocessValue,
        hideRoot: hideRoot,
        styling: styling
      }, rest), {
        keyPath: hideRoot ? [] : keyPath,
        value: postprocessValue(value)
      })));
    }
  }]);

  return JSONTree;
}(_react["default"].Component);

exports["default"] = JSONTree;

_defineProperty(JSONTree, "propTypes", {
  data: _propTypes["default"].any.isRequired,
  hideRoot: _propTypes["default"].bool,
  theme: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]),
  invertTheme: _propTypes["default"].bool,
  keyPath: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
  postprocessValue: _propTypes["default"].func,
  sortObjectKeys: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool])
});

_defineProperty(JSONTree, "defaultProps", {
  shouldExpandNode: expandRootNode,
  hideRoot: false,
  keyPath: ['root'],
  getItemString: defaultItemString,
  labelRenderer: defaultLabelRenderer,
  valueRenderer: identity,
  postprocessValue: identity,
  isCustomNode: noCustomNode,
  collectionLimit: 50,
  invertTheme: true
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = objType;

function objType(obj) {
  var type = Object.prototype.toString.call(obj).slice(8, -1);

  if (type === 'Object' && typeof obj[Symbol.iterator] === 'function') {
    return 'Iterable';
  }

  if (type === 'Custom' && obj.constructor !== Object && obj instanceof Object) {
    // For projects implementing objects overriding `.prototype[Symbol.toStringTag]`
    return 'Object';
  }

  return type;
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _JSONNestedNode = _interopRequireDefault(__webpack_require__(55));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
} // Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.


function createItemString(data) {
  var len = Object.getOwnPropertyNames(data).length;
  return "".concat(len, " ").concat(len !== 1 ? 'keys' : 'key');
} // Configures <JSONNestedNode> to render an Object


var JSONObjectNode = function JSONObjectNode(_ref) {
  var data = _ref.data,
      props = _objectWithoutProperties(_ref, ["data"]);

  return /*#__PURE__*/_react["default"].createElement(_JSONNestedNode["default"], _extends({}, props, {
    data: data,
    nodeType: "Object",
    nodeTypeIndicator: props.nodeType === 'Error' ? 'Error()' : '{}',
    createItemString: createItemString,
    expandable: Object.getOwnPropertyNames(data).length > 0
  }));
};

JSONObjectNode.propTypes = {
  data: _propTypes["default"].object,
  nodeType: _propTypes["default"].string.isRequired
};
var _default = JSONObjectNode;
exports["default"] = _default;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCollectionEntries;

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function getLength(type, collection) {
  if (type === 'Object') {
    return Object.keys(collection).length;
  } else if (type === 'Array') {
    return collection.length;
  }

  return Infinity;
}

function isIterableMap(collection) {
  return typeof collection.set === 'function';
}

function getEntries(type, collection, sortObjectKeys) {
  var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var to = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Infinity;
  var res;

  if (type === 'Object') {
    var keys = Object.getOwnPropertyNames(collection);

    if (sortObjectKeys) {
      keys.sort(sortObjectKeys === true ? undefined : sortObjectKeys);
    }

    keys = keys.slice(from, to + 1);
    res = {
      entries: keys.map(function (key) {
        return {
          key: key,
          value: collection[key]
        };
      })
    };
  } else if (type === 'Array') {
    res = {
      entries: collection.slice(from, to + 1).map(function (val, idx) {
        return {
          key: idx + from,
          value: val
        };
      })
    };
  } else {
    var idx = 0;
    var entries = [];
    var done = true;
    var isMap = isIterableMap(collection);

    var _iterator = _createForOfIteratorHelper(collection),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (idx > to) {
          done = false;
          break;
        }

        if (from <= idx) {
          if (isMap && Array.isArray(item)) {
            if (typeof item[0] === 'string' || typeof item[0] === 'number') {
              entries.push({
                key: item[0],
                value: item[1]
              });
            } else {
              entries.push({
                key: "[entry ".concat(idx, "]"),
                value: {
                  '[key]': item[0],
                  '[value]': item[1]
                }
              });
            }
          } else {
            entries.push({
              key: idx,
              value: item
            });
          }
        }

        idx++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    res = {
      hasMore: !done,
      entries: entries
    };
  }

  return res;
}

function getRanges(from, to, limit) {
  var ranges = [];

  while (to - from > limit * limit) {
    limit = limit * limit;
  }

  for (var i = from; i <= to; i += limit) {
    ranges.push({
      from: i,
      to: Math.min(to, i + limit - 1)
    });
  }

  return ranges;
}

function getCollectionEntries(type, collection, sortObjectKeys, limit) {
  var from = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var to = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Infinity;
  var getEntriesBound = getEntries.bind(null, type, collection, sortObjectKeys);

  if (!limit) {
    return getEntriesBound().entries;
  }

  var isSubset = to < Infinity;
  var length = Math.min(to - from, getLength(type, collection));

  if (type !== 'Iterable') {
    if (length <= limit || limit < 7) {
      return getEntriesBound(from, to).entries;
    }
  } else {
    if (length <= limit && !isSubset) {
      return getEntriesBound(from, to).entries;
    }
  }

  var limitedEntries;

  if (type === 'Iterable') {
    var _getEntriesBound = getEntriesBound(from, from + limit - 1),
        hasMore = _getEntriesBound.hasMore,
        entries = _getEntriesBound.entries;

    limitedEntries = hasMore ? [].concat(_toConsumableArray(entries), _toConsumableArray(getRanges(from + limit, from + 2 * limit - 1, limit))) : entries;
  } else {
    limitedEntries = isSubset ? getRanges(from, to, limit) : [].concat(_toConsumableArray(getEntriesBound(0, limit - 5).entries), _toConsumableArray(getRanges(limit - 4, length - 5, limit)), _toConsumableArray(getEntriesBound(length - 4, length - 1).entries));
  }

  return limitedEntries;
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _JSONArrow = _interopRequireDefault(__webpack_require__(97));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

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

var ItemRange = /*#__PURE__*/function (_React$Component) {
  _inherits(ItemRange, _React$Component);

  var _super = _createSuper(ItemRange);

  function ItemRange(props) {
    var _this;

    _classCallCheck(this, ItemRange);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    });

    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(ItemRange, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styling = _this$props.styling,
          from = _this$props.from,
          to = _this$props.to,
          renderChildNodes = _this$props.renderChildNodes,
          nodeType = _this$props.nodeType;
      return this.state.expanded ? /*#__PURE__*/_react["default"].createElement("div", styling('itemRange', this.state.expanded), renderChildNodes(this.props, from, to)) : /*#__PURE__*/_react["default"].createElement("div", _extends({}, styling('itemRange', this.state.expanded), {
        onClick: this.handleClick
      }), /*#__PURE__*/_react["default"].createElement(_JSONArrow["default"], {
        nodeType: nodeType,
        styling: styling,
        expanded: false,
        onClick: this.handleClick,
        arrowStyle: "double"
      }), "".concat(from, " ... ").concat(to));
    }
  }]);

  return ItemRange;
}(_react["default"].Component);

exports["default"] = ItemRange;

_defineProperty(ItemRange, "propTypes", {
  styling: _propTypes["default"].func.isRequired,
  from: _propTypes["default"].number.isRequired,
  to: _propTypes["default"].number.isRequired,
  renderChildNodes: _propTypes["default"].func.isRequired,
  nodeType: _propTypes["default"].string.isRequired
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _JSONNestedNode = _interopRequireDefault(__webpack_require__(55));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
} // Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.


function createItemString(data) {
  return "".concat(data.length, " ").concat(data.length !== 1 ? 'items' : 'item');
} // Configures <JSONNestedNode> to render an Array


var JSONArrayNode = function JSONArrayNode(_ref) {
  var data = _ref.data,
      props = _objectWithoutProperties(_ref, ["data"]);

  return /*#__PURE__*/_react["default"].createElement(_JSONNestedNode["default"], _extends({}, props, {
    data: data,
    nodeType: "Array",
    nodeTypeIndicator: "[]",
    createItemString: createItemString,
    expandable: data.length > 0
  }));
};

JSONArrayNode.propTypes = {
  data: _propTypes["default"].array
};
var _default = JSONArrayNode;
exports["default"] = _default;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _JSONNestedNode = _interopRequireDefault(__webpack_require__(55));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
} // Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.


function createItemString(data, limit) {
  var count = 0;
  var hasMore = false;

  if (Number.isSafeInteger(data.size)) {
    count = data.size;
  } else {
    // eslint-disable-next-line no-unused-vars
    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;

        if (limit && count + 1 > limit) {
          hasMore = true;
          break;
        }

        count += 1;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return "".concat(hasMore ? '>' : '').concat(count, " ").concat(count !== 1 ? 'entries' : 'entry');
} // Configures <JSONNestedNode> to render an iterable


var JSONIterableNode = function JSONIterableNode(_ref) {
  var props = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_JSONNestedNode["default"], _extends({}, props, {
    nodeType: "Iterable",
    nodeTypeIndicator: "()",
    createItemString: createItemString
  }));
};

var _default = JSONIterableNode;
exports["default"] = _default;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var JSONValueNode = function JSONValueNode(_ref) {
  var nodeType = _ref.nodeType,
      styling = _ref.styling,
      labelRenderer = _ref.labelRenderer,
      keyPath = _ref.keyPath,
      valueRenderer = _ref.valueRenderer,
      value = _ref.value,
      _ref$valueGetter = _ref.valueGetter,
      valueGetter = _ref$valueGetter === void 0 ? function (value) {
    return value;
  } : _ref$valueGetter;
  return /*#__PURE__*/_react["default"].createElement("li", styling('value', nodeType, keyPath), /*#__PURE__*/_react["default"].createElement("label", styling(['label', 'valueLabel'], nodeType, keyPath), labelRenderer(keyPath, nodeType, false, false)), /*#__PURE__*/_react["default"].createElement("span", styling('valueText', nodeType, keyPath), valueRenderer.apply(void 0, [valueGetter(value), value].concat(_toConsumableArray(keyPath)))));
};

JSONValueNode.propTypes = {
  nodeType: _propTypes["default"].string.isRequired,
  styling: _propTypes["default"].func.isRequired,
  labelRenderer: _propTypes["default"].func.isRequired,
  keyPath: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired).isRequired,
  valueRenderer: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].any,
  valueGetter: _propTypes["default"].func
};
var _default = JSONValueNode;
exports["default"] = _default;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactBase16Styling = __webpack_require__(98);

var _solarized = _interopRequireDefault(__webpack_require__(229));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

var colorMap = function colorMap(theme) {
  return {
    BACKGROUND_COLOR: theme.base00,
    TEXT_COLOR: theme.base07,
    STRING_COLOR: theme.base0B,
    DATE_COLOR: theme.base0B,
    NUMBER_COLOR: theme.base09,
    BOOLEAN_COLOR: theme.base09,
    NULL_COLOR: theme.base08,
    UNDEFINED_COLOR: theme.base08,
    FUNCTION_COLOR: theme.base08,
    SYMBOL_COLOR: theme.base08,
    LABEL_COLOR: theme.base0D,
    ARROW_COLOR: theme.base0D,
    ITEM_STRING_COLOR: theme.base0B,
    ITEM_STRING_EXPANDED_COLOR: theme.base03
  };
};

var valueColorMap = function valueColorMap(colors) {
  return {
    String: colors.STRING_COLOR,
    Date: colors.DATE_COLOR,
    Number: colors.NUMBER_COLOR,
    Boolean: colors.BOOLEAN_COLOR,
    Null: colors.NULL_COLOR,
    Undefined: colors.UNDEFINED_COLOR,
    Function: colors.FUNCTION_COLOR,
    Symbol: colors.SYMBOL_COLOR
  };
};

var getDefaultThemeStyling = function getDefaultThemeStyling(theme) {
  var colors = colorMap(theme);
  return {
    tree: {
      border: 0,
      padding: 0,
      marginTop: '0.5em',
      marginBottom: '0.5em',
      marginLeft: '0.125em',
      marginRight: 0,
      listStyle: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      backgroundColor: colors.BACKGROUND_COLOR
    },
    value: function value(_ref, nodeType, keyPath) {
      var style = _ref.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          paddingTop: '0.25em',
          paddingRight: 0,
          marginLeft: '0.875em',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          wordWrap: 'break-word',
          paddingLeft: keyPath.length > 1 ? '2.125em' : '1.25em',
          textIndent: '-0.5em',
          wordBreak: 'break-all'
        })
      };
    },
    label: {
      display: 'inline-block',
      color: colors.LABEL_COLOR
    },
    valueLabel: {
      margin: '0 0.5em 0 0'
    },
    valueText: function valueText(_ref2, nodeType) {
      var style = _ref2.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          color: valueColorMap(colors)[nodeType]
        })
      };
    },
    itemRange: function itemRange(styling, expanded) {
      return {
        style: {
          paddingTop: expanded ? 0 : '0.25em',
          cursor: 'pointer',
          color: colors.LABEL_COLOR
        }
      };
    },
    arrow: function arrow(_ref3, nodeType, expanded) {
      var style = _ref3.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          marginLeft: 0,
          transition: '150ms',
          WebkitTransition: '150ms',
          MozTransition: '150ms',
          WebkitTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          MozTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transformOrigin: '45% 50%',
          WebkitTransformOrigin: '45% 50%',
          MozTransformOrigin: '45% 50%',
          position: 'relative',
          lineHeight: '1.1em',
          fontSize: '0.75em'
        })
      };
    },
    arrowContainer: function arrowContainer(_ref4, arrowStyle) {
      var style = _ref4.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          display: 'inline-block',
          paddingRight: '0.5em',
          paddingLeft: arrowStyle === 'double' ? '1em' : 0,
          cursor: 'pointer'
        })
      };
    },
    arrowSign: {
      color: colors.ARROW_COLOR
    },
    arrowSignInner: {
      position: 'absolute',
      top: 0,
      left: '-0.4em'
    },
    nestedNode: function nestedNode(_ref5, keyPath, nodeType, expanded, expandable) {
      var style = _ref5.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          position: 'relative',
          paddingTop: '0.25em',
          marginLeft: keyPath.length > 1 ? '0.875em' : 0,
          paddingLeft: !expandable ? '1.125em' : 0
        })
      };
    },
    rootNode: {
      padding: 0,
      margin: 0
    },
    nestedNodeLabel: function nestedNodeLabel(_ref6, keyPath, nodeType, expanded, expandable) {
      var style = _ref6.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          margin: 0,
          padding: 0,
          WebkitUserSelect: expandable ? 'inherit' : 'text',
          MozUserSelect: expandable ? 'inherit' : 'text',
          cursor: expandable ? 'pointer' : 'default'
        })
      };
    },
    nestedNodeItemString: function nestedNodeItemString(_ref7, keyPath, nodeType, expanded) {
      var style = _ref7.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          paddingLeft: '0.5em',
          cursor: 'default',
          color: expanded ? colors.ITEM_STRING_EXPANDED_COLOR : colors.ITEM_STRING_COLOR
        })
      };
    },
    nestedNodeItemType: {
      marginLeft: '0.3em',
      marginRight: '0.3em'
    },
    nestedNodeChildren: function nestedNodeChildren(_ref8, nodeType, expanded) {
      var style = _ref8.style;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          padding: 0,
          margin: 0,
          listStyle: 'none',
          display: expanded ? 'block' : 'none'
        })
      };
    },
    rootNodeChildren: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    }
  };
};

var _default = (0, _reactBase16Styling.createStyling)(getDefaultThemeStyling, {
  defaultBase16: _solarized["default"]
});

exports["default"] = _default;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(170);

__webpack_require__(175);

exports.__esModule = true;

function _interopRequire(obj) {
  return obj && obj.__esModule ? obj['default'] : obj;
}

var _threezerotwofour = __webpack_require__(181);

exports.threezerotwofour = _interopRequire(_threezerotwofour);

var _apathy = __webpack_require__(182);

exports.apathy = _interopRequire(_apathy);

var _ashes = __webpack_require__(183);

exports.ashes = _interopRequire(_ashes);

var _atelierDune = __webpack_require__(184);

exports.atelierDune = _interopRequire(_atelierDune);

var _atelierForest = __webpack_require__(185);

exports.atelierForest = _interopRequire(_atelierForest);

var _atelierHeath = __webpack_require__(186);

exports.atelierHeath = _interopRequire(_atelierHeath);

var _atelierLakeside = __webpack_require__(187);

exports.atelierLakeside = _interopRequire(_atelierLakeside);

var _atelierSeaside = __webpack_require__(188);

exports.atelierSeaside = _interopRequire(_atelierSeaside);

var _bespin = __webpack_require__(189);

exports.bespin = _interopRequire(_bespin);

var _brewer = __webpack_require__(190);

exports.brewer = _interopRequire(_brewer);

var _bright = __webpack_require__(191);

exports.bright = _interopRequire(_bright);

var _chalk = __webpack_require__(192);

exports.chalk = _interopRequire(_chalk);

var _codeschool = __webpack_require__(193);

exports.codeschool = _interopRequire(_codeschool);

var _colors = __webpack_require__(194);

exports.colors = _interopRequire(_colors);

var _default = __webpack_require__(195);

exports['default'] = _interopRequire(_default);

var _eighties = __webpack_require__(196);

exports.eighties = _interopRequire(_eighties);

var _embers = __webpack_require__(197);

exports.embers = _interopRequire(_embers);

var _flat = __webpack_require__(198);

exports.flat = _interopRequire(_flat);

var _google = __webpack_require__(199);

exports.google = _interopRequire(_google);

var _grayscale = __webpack_require__(200);

exports.grayscale = _interopRequire(_grayscale);

var _greenscreen = __webpack_require__(201);

exports.greenscreen = _interopRequire(_greenscreen);

var _harmonic = __webpack_require__(202);

exports.harmonic = _interopRequire(_harmonic);

var _hopscotch = __webpack_require__(203);

exports.hopscotch = _interopRequire(_hopscotch);

var _isotope = __webpack_require__(204);

exports.isotope = _interopRequire(_isotope);

var _marrakesh = __webpack_require__(205);

exports.marrakesh = _interopRequire(_marrakesh);

var _mocha = __webpack_require__(206);

exports.mocha = _interopRequire(_mocha);

var _monokai = __webpack_require__(207);

exports.monokai = _interopRequire(_monokai);

var _ocean = __webpack_require__(208);

exports.ocean = _interopRequire(_ocean);

var _paraiso = __webpack_require__(209);

exports.paraiso = _interopRequire(_paraiso);

var _pop = __webpack_require__(210);

exports.pop = _interopRequire(_pop);

var _railscasts = __webpack_require__(211);

exports.railscasts = _interopRequire(_railscasts);

var _shapeshifter = __webpack_require__(212);

exports.shapeshifter = _interopRequire(_shapeshifter);

var _solarized = __webpack_require__(213);

exports.solarized = _interopRequire(_solarized);

var _summerfruit = __webpack_require__(214);

exports.summerfruit = _interopRequire(_summerfruit);

var _tomorrow = __webpack_require__(215);

exports.tomorrow = _interopRequire(_tomorrow);

var _tube = __webpack_require__(216);

exports.tube = _interopRequire(_tube);

var _twilight = __webpack_require__(217);

exports.twilight = _interopRequire(_twilight);

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(40);
var flattenIntoArray = __webpack_require__(171);
var toObject = __webpack_require__(84);
var toLength = __webpack_require__(33);
var toInteger = __webpack_require__(48);
var arraySpeciesCreate = __webpack_require__(173);

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(99);
var toLength = __webpack_require__(33);
var bind = __webpack_require__(172);

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(83);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24);
var isArray = __webpack_require__(99);
var wellKnownSymbol = __webpack_require__(100);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(101);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(176);

addToUnscopables('flat');


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(100);
var create = __webpack_require__(177);
var definePropertyModule = __webpack_require__(31);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(32);
var defineProperties = __webpack_require__(178);
var enumBugKeys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(46);
var html = __webpack_require__(180);
var documentCreateElement = __webpack_require__(77);
var sharedKey = __webpack_require__(79);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(18);
var definePropertyModule = __webpack_require__(31);
var anObject = __webpack_require__(32);
var objectKeys = __webpack_require__(179);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(82);
var enumBugKeys = __webpack_require__(49);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(47);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'threezerotwofour',
  author: 'jan t. sott (http://github.com/idleberg)',
  base00: '#090300',
  base01: '#3a3432',
  base02: '#4a4543',
  base03: '#5c5855',
  base04: '#807d7c',
  base05: '#a5a2a2',
  base06: '#d6d5d4',
  base07: '#f7f7f7',
  base08: '#db2d20',
  base09: '#e8bbd0',
  base0A: '#fded02',
  base0B: '#01a252',
  base0C: '#b5e4f4',
  base0D: '#01a0e4',
  base0E: '#a16a94',
  base0F: '#cdab53'
};
module.exports = exports['default'];

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'apathy',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#031A16',
  base01: '#0B342D',
  base02: '#184E45',
  base03: '#2B685E',
  base04: '#5F9C92',
  base05: '#81B5AC',
  base06: '#A7CEC8',
  base07: '#D2E7E4',
  base08: '#3E9688',
  base09: '#3E7996',
  base0A: '#3E4C96',
  base0B: '#883E96',
  base0C: '#963E4C',
  base0D: '#96883E',
  base0E: '#4C963E',
  base0F: '#3E965B'
};
module.exports = exports['default'];

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'ashes',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#1C2023',
  base01: '#393F45',
  base02: '#565E65',
  base03: '#747C84',
  base04: '#ADB3BA',
  base05: '#C7CCD1',
  base06: '#DFE2E5',
  base07: '#F3F4F5',
  base08: '#C7AE95',
  base09: '#C7C795',
  base0A: '#AEC795',
  base0B: '#95C7AE',
  base0C: '#95AEC7',
  base0D: '#AE95C7',
  base0E: '#C795AE',
  base0F: '#C79595'
};
module.exports = exports['default'];

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier dune',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)',
  base00: '#20201d',
  base01: '#292824',
  base02: '#6e6b5e',
  base03: '#7d7a68',
  base04: '#999580',
  base05: '#a6a28c',
  base06: '#e8e4cf',
  base07: '#fefbec',
  base08: '#d73737',
  base09: '#b65611',
  base0A: '#cfb017',
  base0B: '#60ac39',
  base0C: '#1fad83',
  base0D: '#6684e1',
  base0E: '#b854d4',
  base0F: '#d43552'
};
module.exports = exports['default'];

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier forest',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)',
  base00: '#1b1918',
  base01: '#2c2421',
  base02: '#68615e',
  base03: '#766e6b',
  base04: '#9c9491',
  base05: '#a8a19f',
  base06: '#e6e2e0',
  base07: '#f1efee',
  base08: '#f22c40',
  base09: '#df5320',
  base0A: '#d5911a',
  base0B: '#5ab738',
  base0C: '#00ad9c',
  base0D: '#407ee7',
  base0E: '#6666ea',
  base0F: '#c33ff3'
};
module.exports = exports['default'];

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier heath',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)',
  base00: '#1b181b',
  base01: '#292329',
  base02: '#695d69',
  base03: '#776977',
  base04: '#9e8f9e',
  base05: '#ab9bab',
  base06: '#d8cad8',
  base07: '#f7f3f7',
  base08: '#ca402b',
  base09: '#a65926',
  base0A: '#bb8a35',
  base0B: '#379a37',
  base0C: '#159393',
  base0D: '#516aec',
  base0E: '#7b59c0',
  base0F: '#cc33cc'
};
module.exports = exports['default'];

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier lakeside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)',
  base00: '#161b1d',
  base01: '#1f292e',
  base02: '#516d7b',
  base03: '#5a7b8c',
  base04: '#7195a8',
  base05: '#7ea2b4',
  base06: '#c1e4f6',
  base07: '#ebf8ff',
  base08: '#d22d72',
  base09: '#935c25',
  base0A: '#8a8a0f',
  base0B: '#568c3b',
  base0C: '#2d8f6f',
  base0D: '#257fad',
  base0E: '#5d5db1',
  base0F: '#b72dd2'
};
module.exports = exports['default'];

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier seaside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)',
  base00: '#131513',
  base01: '#242924',
  base02: '#5e6e5e',
  base03: '#687d68',
  base04: '#809980',
  base05: '#8ca68c',
  base06: '#cfe8cf',
  base07: '#f0fff0',
  base08: '#e6193c',
  base09: '#87711d',
  base0A: '#c3c322',
  base0B: '#29a329',
  base0C: '#1999b3',
  base0D: '#3d62f5',
  base0E: '#ad2bee',
  base0F: '#e619c3'
};
module.exports = exports['default'];

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'bespin',
  author: 'jan t. sott',
  base00: '#28211c',
  base01: '#36312e',
  base02: '#5e5d5c',
  base03: '#666666',
  base04: '#797977',
  base05: '#8a8986',
  base06: '#9d9b97',
  base07: '#baae9e',
  base08: '#cf6a4c',
  base09: '#cf7d34',
  base0A: '#f9ee98',
  base0B: '#54be0d',
  base0C: '#afc4db',
  base0D: '#5ea6ea',
  base0E: '#9b859d',
  base0F: '#937121'
};
module.exports = exports['default'];

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'brewer',
  author: 'timothée poisot (http://github.com/tpoisot)',
  base00: '#0c0d0e',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};
module.exports = exports['default'];

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'chalk',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#f5f5f5',
  base08: '#fb9fb1',
  base09: '#eda987',
  base0A: '#ddb26f',
  base0B: '#acc267',
  base0C: '#12cfc0',
  base0D: '#6fc2ef',
  base0E: '#e1a3ee',
  base0F: '#deaf8f'
};
module.exports = exports['default'];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'codeschool',
  author: 'brettof86',
  base00: '#232c31',
  base01: '#1c3657',
  base02: '#2a343a',
  base03: '#3f4944',
  base04: '#84898c',
  base05: '#9ea7a6',
  base06: '#a7cfa3',
  base07: '#b5d8f6',
  base08: '#2a5491',
  base09: '#43820d',
  base0A: '#a03b1e',
  base0B: '#237986',
  base0C: '#b02f30',
  base0D: '#484d79',
  base0E: '#c59820',
  base0F: '#c98344'
};
module.exports = exports['default'];

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'colors',
  author: 'mrmrs (http://clrs.cc)',
  base00: '#111111',
  base01: '#333333',
  base02: '#555555',
  base03: '#777777',
  base04: '#999999',
  base05: '#bbbbbb',
  base06: '#dddddd',
  base07: '#ffffff',
  base08: '#ff4136',
  base09: '#ff851b',
  base0A: '#ffdc00',
  base0B: '#2ecc40',
  base0C: '#7fdbff',
  base0D: '#0074d9',
  base0E: '#b10dc9',
  base0F: '#85144b'
};
module.exports = exports['default'];

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};
module.exports = exports['default'];

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'eighties',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2d2d2d',
  base01: '#393939',
  base02: '#515151',
  base03: '#747369',
  base04: '#a09f93',
  base05: '#d3d0c8',
  base06: '#e8e6df',
  base07: '#f2f0ec',
  base08: '#f2777a',
  base09: '#f99157',
  base0A: '#ffcc66',
  base0B: '#99cc99',
  base0C: '#66cccc',
  base0D: '#6699cc',
  base0E: '#cc99cc',
  base0F: '#d27b53'
};
module.exports = exports['default'];

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'embers',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#16130F',
  base01: '#2C2620',
  base02: '#433B32',
  base03: '#5A5047',
  base04: '#8A8075',
  base05: '#A39A90',
  base06: '#BEB6AE',
  base07: '#DBD6D1',
  base08: '#826D57',
  base09: '#828257',
  base0A: '#6D8257',
  base0B: '#57826D',
  base0C: '#576D82',
  base0D: '#6D5782',
  base0E: '#82576D',
  base0F: '#825757'
};
module.exports = exports['default'];

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'flat',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2C3E50',
  base01: '#34495E',
  base02: '#7F8C8D',
  base03: '#95A5A6',
  base04: '#BDC3C7',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ECF0F1',
  base08: '#E74C3C',
  base09: '#E67E22',
  base0A: '#F1C40F',
  base0B: '#2ECC71',
  base0C: '#1ABC9C',
  base0D: '#3498DB',
  base0E: '#9B59B6',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};
module.exports = exports['default'];

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f7f7f7',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e'
};
module.exports = exports['default'];

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'green screen',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#001100',
  base01: '#003300',
  base02: '#005500',
  base03: '#007700',
  base04: '#009900',
  base05: '#00bb00',
  base06: '#00dd00',
  base07: '#00ff00',
  base08: '#007700',
  base09: '#009900',
  base0A: '#007700',
  base0B: '#00bb00',
  base0C: '#005500',
  base0D: '#009900',
  base0E: '#00bb00',
  base0F: '#005500'
};
module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'harmonic16',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#0b1c2c',
  base01: '#223b54',
  base02: '#405c79',
  base03: '#627e99',
  base04: '#aabcce',
  base05: '#cbd6e2',
  base06: '#e5ebf1',
  base07: '#f7f9fb',
  base08: '#bf8b56',
  base09: '#bfbf56',
  base0A: '#8bbf56',
  base0B: '#56bf8b',
  base0C: '#568bbf',
  base0D: '#8b56bf',
  base0E: '#bf568b',
  base0F: '#bf5656'
};
module.exports = exports['default'];

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'hopscotch',
  author: 'jan t. sott',
  base00: '#322931',
  base01: '#433b42',
  base02: '#5c545b',
  base03: '#797379',
  base04: '#989498',
  base05: '#b9b5b8',
  base06: '#d5d3d5',
  base07: '#ffffff',
  base08: '#dd464c',
  base09: '#fd8b19',
  base0A: '#fdcc59',
  base0B: '#8fc13e',
  base0C: '#149b93',
  base0D: '#1290bf',
  base0E: '#c85e7c',
  base0F: '#b33508'
};
module.exports = exports['default'];

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'isotope',
  author: 'jan t. sott',
  base00: '#000000',
  base01: '#404040',
  base02: '#606060',
  base03: '#808080',
  base04: '#c0c0c0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#ff0000',
  base09: '#ff9900',
  base0A: '#ff0099',
  base0B: '#33ff00',
  base0C: '#00ffff',
  base0D: '#0066ff',
  base0E: '#cc00ff',
  base0F: '#3300ff'
};
module.exports = exports['default'];

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'marrakesh',
  author: 'alexandre gavioli (http://github.com/alexx2/)',
  base00: '#201602',
  base01: '#302e00',
  base02: '#5f5b17',
  base03: '#6c6823',
  base04: '#86813b',
  base05: '#948e48',
  base06: '#ccc37a',
  base07: '#faf0a5',
  base08: '#c35359',
  base09: '#b36144',
  base0A: '#a88339',
  base0B: '#18974e',
  base0C: '#75a738',
  base0D: '#477ca1',
  base0E: '#8868b3',
  base0F: '#b3588e'
};
module.exports = exports['default'];

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'mocha',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#3B3228',
  base01: '#534636',
  base02: '#645240',
  base03: '#7e705a',
  base04: '#b8afad',
  base05: '#d0c8c6',
  base06: '#e9e1dd',
  base07: '#f5eeeb',
  base08: '#cb6077',
  base09: '#d28b71',
  base0A: '#f4bc87',
  base0B: '#beb55b',
  base0C: '#7bbda4',
  base0D: '#8ab3b5',
  base0E: '#a89bb9',
  base0F: '#bb9584'
};
module.exports = exports['default'];

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'ocean',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
};
module.exports = exports['default'];

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'paraiso',
  author: 'jan t. sott',
  base00: '#2f1e2e',
  base01: '#41323f',
  base02: '#4f424c',
  base03: '#776e71',
  base04: '#8d8687',
  base05: '#a39e9b',
  base06: '#b9b6b0',
  base07: '#e7e9db',
  base08: '#ef6155',
  base09: '#f99b15',
  base0A: '#fec418',
  base0B: '#48b685',
  base0C: '#5bc4bf',
  base0D: '#06b6ef',
  base0E: '#815ba4',
  base0F: '#e96ba8'
};
module.exports = exports['default'];

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'pop',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#eb008a',
  base09: '#f29333',
  base0A: '#f8ca12',
  base0B: '#37b349',
  base0C: '#00aabb',
  base0D: '#0e5a94',
  base0E: '#b31e8d',
  base0F: '#7a2d00'
};
module.exports = exports['default'];

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'railscasts',
  author: 'ryan bates (http://railscasts.com)',
  base00: '#2b2b2b',
  base01: '#272935',
  base02: '#3a4055',
  base03: '#5a647e',
  base04: '#d4cfc9',
  base05: '#e6e1dc',
  base06: '#f4f1ed',
  base07: '#f9f7f3',
  base08: '#da4939',
  base09: '#cc7833',
  base0A: '#ffc66d',
  base0B: '#a5c261',
  base0C: '#519f50',
  base0D: '#6d9cbe',
  base0E: '#b6b3eb',
  base0F: '#bc9458'
};
module.exports = exports['default'];

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'shapeshifter',
  author: 'tyler benziger (http://tybenz.com)',
  base00: '#000000',
  base01: '#040404',
  base02: '#102015',
  base03: '#343434',
  base04: '#555555',
  base05: '#ababab',
  base06: '#e0e0e0',
  base07: '#f9f9f9',
  base08: '#e92f2f',
  base09: '#e09448',
  base0A: '#dddd13',
  base0B: '#0ed839',
  base0C: '#23edda',
  base0D: '#3b48e3',
  base0E: '#f996e2',
  base0F: '#69542d'
};
module.exports = exports['default'];

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'summerfruit',
  author: 'christopher corley (http://cscorley.github.io/)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#B0B0B0',
  base05: '#D0D0D0',
  base06: '#E0E0E0',
  base07: '#FFFFFF',
  base08: '#FF0086',
  base09: '#FD8900',
  base0A: '#ABA800',
  base0B: '#00C918',
  base0C: '#1faaaa',
  base0D: '#3777E6',
  base0E: '#AD00A1',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'tomorrow',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a'
};
module.exports = exports['default'];

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'london tube',
  author: 'jan t. sott',
  base00: '#231f20',
  base01: '#1c3f95',
  base02: '#5a5758',
  base03: '#737171',
  base04: '#959ca1',
  base05: '#d9d8d8',
  base06: '#e7e7e8',
  base07: '#ffffff',
  base08: '#ee2e24',
  base09: '#f386a1',
  base0A: '#ffd204',
  base0B: '#00853e',
  base0C: '#85cebc',
  base0D: '#009ddc',
  base0E: '#98005d',
  base0F: '#b06110'
};
module.exports = exports['default'];

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = {
  scheme: 'twilight',
  author: 'david hart (http://hart-dev.com)',
  base00: '#1e1e1e',
  base01: '#323537',
  base02: '#464b50',
  base03: '#5f5a60',
  base04: '#838184',
  base05: '#a7a7a7',
  base06: '#c3c3c3',
  base07: '#ffffff',
  base08: '#cf6a4c',
  base09: '#cda869',
  base0A: '#f9ee98',
  base0B: '#8f9d6a',
  base0C: '#afc4db',
  base0D: '#7587a6',
  base0E: '#9b859d',
  base0F: '#9b703f'
};
module.exports = exports['default'];

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(219);

var convert = __webpack_require__(223);

var _slice = [].slice;
var skippedModels = [// to be honest, I don't really feel like keyword belongs in color convert, but eh.
'keyword', // gray conflicts with some method names, and has its own method defined.
'gray', // shouldn't really be in color-convert either...
'hex'];
var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
  hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});
var limiters = {};

function Color(obj, model) {
  if (!(this instanceof Color)) {
    return new Color(obj, model);
  }

  if (model && model in skippedModels) {
    model = null;
  }

  if (model && !(model in convert)) {
    throw new Error('Unknown model: ' + model);
  }

  var i;
  var channels;

  if (obj == null) {
    // eslint-disable-line no-eq-null,eqeqeq
    this.model = 'rgb';
    this.color = [0, 0, 0];
    this.valpha = 1;
  } else if (obj instanceof Color) {
    this.model = obj.model;
    this.color = obj.color.slice();
    this.valpha = obj.valpha;
  } else if (typeof obj === 'string') {
    var result = colorString.get(obj);

    if (result === null) {
      throw new Error('Unable to parse color from string: ' + obj);
    }

    this.model = result.model;
    channels = convert[this.model].channels;
    this.color = result.value.slice(0, channels);
    this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
  } else if (obj.length) {
    this.model = model || 'rgb';
    channels = convert[this.model].channels;

    var newArr = _slice.call(obj, 0, channels);

    this.color = zeroArray(newArr, channels);
    this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
  } else if (typeof obj === 'number') {
    // this is always RGB - can be converted later on.
    obj &= 0xFFFFFF;
    this.model = 'rgb';
    this.color = [obj >> 16 & 0xFF, obj >> 8 & 0xFF, obj & 0xFF];
    this.valpha = 1;
  } else {
    this.valpha = 1;
    var keys = Object.keys(obj);

    if ('alpha' in obj) {
      keys.splice(keys.indexOf('alpha'), 1);
      this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
    }

    var hashedKeys = keys.sort().join('');

    if (!(hashedKeys in hashedModelKeys)) {
      throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
    }

    this.model = hashedModelKeys[hashedKeys];
    var labels = convert[this.model].labels;
    var color = [];

    for (i = 0; i < labels.length; i++) {
      color.push(obj[labels[i]]);
    }

    this.color = zeroArray(color);
  } // perform limitations (clamping, etc.)


  if (limiters[this.model]) {
    channels = convert[this.model].channels;

    for (i = 0; i < channels; i++) {
      var limit = limiters[this.model][i];

      if (limit) {
        this.color[i] = limit(this.color[i]);
      }
    }
  }

  this.valpha = Math.max(0, Math.min(1, this.valpha));

  if (Object.freeze) {
    Object.freeze(this);
  }
}

Color.prototype = {
  toString: function toString() {
    return this.string();
  },
  toJSON: function toJSON() {
    return this[this.model]();
  },
  string: function string(places) {
    var self = this.model in colorString.to ? this : this.rgb();
    self = self.round(typeof places === 'number' ? places : 1);
    var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
    return colorString.to[self.model](args);
  },
  percentString: function percentString(places) {
    var self = this.rgb().round(typeof places === 'number' ? places : 1);
    var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
    return colorString.to.rgb.percent(args);
  },
  array: function array() {
    return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
  },
  object: function object() {
    var result = {};
    var channels = convert[this.model].channels;
    var labels = convert[this.model].labels;

    for (var i = 0; i < channels; i++) {
      result[labels[i]] = this.color[i];
    }

    if (this.valpha !== 1) {
      result.alpha = this.valpha;
    }

    return result;
  },
  unitArray: function unitArray() {
    var rgb = this.rgb().color;
    rgb[0] /= 255;
    rgb[1] /= 255;
    rgb[2] /= 255;

    if (this.valpha !== 1) {
      rgb.push(this.valpha);
    }

    return rgb;
  },
  unitObject: function unitObject() {
    var rgb = this.rgb().object();
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;

    if (this.valpha !== 1) {
      rgb.alpha = this.valpha;
    }

    return rgb;
  },
  round: function round(places) {
    places = Math.max(places || 0, 0);
    return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
  },
  alpha: function alpha(val) {
    if (arguments.length) {
      return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
    }

    return this.valpha;
  },
  // rgb
  red: getset('rgb', 0, maxfn(255)),
  green: getset('rgb', 1, maxfn(255)),
  blue: getset('rgb', 2, maxfn(255)),
  hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) {
    return (val % 360 + 360) % 360;
  }),
  // eslint-disable-line brace-style
  saturationl: getset('hsl', 1, maxfn(100)),
  lightness: getset('hsl', 2, maxfn(100)),
  saturationv: getset('hsv', 1, maxfn(100)),
  value: getset('hsv', 2, maxfn(100)),
  chroma: getset('hcg', 1, maxfn(100)),
  gray: getset('hcg', 2, maxfn(100)),
  white: getset('hwb', 1, maxfn(100)),
  wblack: getset('hwb', 2, maxfn(100)),
  cyan: getset('cmyk', 0, maxfn(100)),
  magenta: getset('cmyk', 1, maxfn(100)),
  yellow: getset('cmyk', 2, maxfn(100)),
  black: getset('cmyk', 3, maxfn(100)),
  x: getset('xyz', 0, maxfn(100)),
  y: getset('xyz', 1, maxfn(100)),
  z: getset('xyz', 2, maxfn(100)),
  l: getset('lab', 0, maxfn(100)),
  a: getset('lab', 1),
  b: getset('lab', 2),
  keyword: function keyword(val) {
    if (arguments.length) {
      return new Color(val);
    }

    return convert[this.model].keyword(this.color);
  },
  hex: function hex(val) {
    if (arguments.length) {
      return new Color(val);
    }

    return colorString.to.hex(this.rgb().round().color);
  },
  rgbNumber: function rgbNumber() {
    var rgb = this.rgb().color;
    return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF;
  },
  luminosity: function luminosity() {
    // http://www.w3.org/TR/WCAG20/#relativeluminancedef
    var rgb = this.rgb().color;
    var lum = [];

    for (var i = 0; i < rgb.length; i++) {
      var chan = rgb[i] / 255;
      lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
    }

    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },
  contrast: function contrast(color2) {
    // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
    var lum1 = this.luminosity();
    var lum2 = color2.luminosity();

    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05);
    }

    return (lum2 + 0.05) / (lum1 + 0.05);
  },
  level: function level(color2) {
    var contrastRatio = this.contrast(color2);

    if (contrastRatio >= 7.1) {
      return 'AAA';
    }

    return contrastRatio >= 4.5 ? 'AA' : '';
  },
  isDark: function isDark() {
    // YIQ equation from http://24ways.org/2010/calculating-color-contrast
    var rgb = this.rgb().color;
    var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return yiq < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  negate: function negate() {
    var rgb = this.rgb();

    for (var i = 0; i < 3; i++) {
      rgb.color[i] = 255 - rgb.color[i];
    }

    return rgb;
  },
  lighten: function lighten(ratio) {
    var hsl = this.hsl();
    hsl.color[2] += hsl.color[2] * ratio;
    return hsl;
  },
  darken: function darken(ratio) {
    var hsl = this.hsl();
    hsl.color[2] -= hsl.color[2] * ratio;
    return hsl;
  },
  saturate: function saturate(ratio) {
    var hsl = this.hsl();
    hsl.color[1] += hsl.color[1] * ratio;
    return hsl;
  },
  desaturate: function desaturate(ratio) {
    var hsl = this.hsl();
    hsl.color[1] -= hsl.color[1] * ratio;
    return hsl;
  },
  whiten: function whiten(ratio) {
    var hwb = this.hwb();
    hwb.color[1] += hwb.color[1] * ratio;
    return hwb;
  },
  blacken: function blacken(ratio) {
    var hwb = this.hwb();
    hwb.color[2] += hwb.color[2] * ratio;
    return hwb;
  },
  grayscale: function grayscale() {
    // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
    var rgb = this.rgb().color;
    var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
    return Color.rgb(val, val, val);
  },
  fade: function fade(ratio) {
    return this.alpha(this.valpha - this.valpha * ratio);
  },
  opaquer: function opaquer(ratio) {
    return this.alpha(this.valpha + this.valpha * ratio);
  },
  rotate: function rotate(degrees) {
    var hsl = this.hsl();
    var hue = hsl.color[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    hsl.color[0] = hue;
    return hsl;
  },
  mix: function mix(mixinColor, weight) {
    // ported from sass implementation in C
    // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
    if (!mixinColor || !mixinColor.rgb) {
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
    }

    var color1 = mixinColor.rgb();
    var color2 = this.rgb();
    var p = weight === undefined ? 0.5 : weight;
    var w = 2 * p - 1;
    var a = color1.alpha() - color2.alpha();
    var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
    var w2 = 1 - w1;
    return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
  }
}; // model conversion methods and static constructors

Object.keys(convert).forEach(function (model) {
  if (skippedModels.indexOf(model) !== -1) {
    return;
  }

  var channels = convert[model].channels; // conversion methods

  Color.prototype[model] = function () {
    if (this.model === model) {
      return new Color(this);
    }

    if (arguments.length) {
      return new Color(arguments, model);
    }

    var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
    return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
  }; // 'static' construction methods


  Color[model] = function (color) {
    if (typeof color === 'number') {
      color = zeroArray(_slice.call(arguments), channels);
    }

    return new Color(color, model);
  };
});

function roundTo(num, places) {
  return Number(num.toFixed(places));
}

function roundToPlace(places) {
  return function (num) {
    return roundTo(num, places);
  };
}

function getset(model, channel, modifier) {
  model = Array.isArray(model) ? model : [model];
  model.forEach(function (m) {
    (limiters[m] || (limiters[m] = []))[channel] = modifier;
  });
  model = model[0];
  return function (val) {
    var result;

    if (arguments.length) {
      if (modifier) {
        val = modifier(val);
      }

      result = this[model]();
      result.color[channel] = val;
      return result;
    }

    result = this[model]().color[channel];

    if (modifier) {
      result = modifier(result);
    }

    return result;
  };
}

function maxfn(max) {
  return function (v) {
    return Math.max(0, Math.min(max, v));
  };
}

function assertArray(val) {
  return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
  for (var i = 0; i < length; i++) {
    if (typeof arr[i] !== 'number') {
      arr[i] = 0;
    }
  }

  return arr;
}

module.exports = Color;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(220);

var swizzle = __webpack_require__(221);

var reverseNames = {}; // create a list of reverse color names

for (var name in colorNames) {
  if (colorNames.hasOwnProperty(name)) {
    reverseNames[colorNames[name]] = name;
  }
}

var cs = module.exports = {
  to: {},
  get: {}
};

cs.get = function (string) {
  var prefix = string.substring(0, 3).toLowerCase();
  var val;
  var model;

  switch (prefix) {
    case 'hsl':
      val = cs.get.hsl(string);
      model = 'hsl';
      break;

    case 'hwb':
      val = cs.get.hwb(string);
      model = 'hwb';
      break;

    default:
      val = cs.get.rgb(string);
      model = 'rgb';
      break;
  }

  if (!val) {
    return null;
  }

  return {
    model: model,
    value: val
  };
};

cs.get.rgb = function (string) {
  if (!string) {
    return null;
  }

  var abbr = /^#([a-f0-9]{3,4})$/i;
  var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  var keyword = /(\D+)/;
  var rgb = [0, 0, 0, 1];
  var match;
  var i;
  var hexAlpha;

  if (match = string.match(hex)) {
    hexAlpha = match[2];
    match = match[1];

    for (i = 0; i < 3; i++) {
      // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
      var i2 = i * 2;
      rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
    }

    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha, 16) / 255;
    }
  } else if (match = string.match(abbr)) {
    match = match[1];
    hexAlpha = match[3];

    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i] + match[i], 16);
    }

    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
    }
  } else if (match = string.match(rgba)) {
    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i + 1], 0);
    }

    if (match[4]) {
      rgb[3] = parseFloat(match[4]);
    }
  } else if (match = string.match(per)) {
    for (i = 0; i < 3; i++) {
      rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
    }

    if (match[4]) {
      rgb[3] = parseFloat(match[4]);
    }
  } else if (match = string.match(keyword)) {
    if (match[1] === 'transparent') {
      return [0, 0, 0, 0];
    }

    rgb = colorNames[match[1]];

    if (!rgb) {
      return null;
    }

    rgb[3] = 1;
    return rgb;
  } else {
    return null;
  }

  for (i = 0; i < 3; i++) {
    rgb[i] = clamp(rgb[i], 0, 255);
  }

  rgb[3] = clamp(rgb[3], 0, 1);
  return rgb;
};

cs.get.hsl = function (string) {
  if (!string) {
    return null;
  }

  var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  var match = string.match(hsl);

  if (match) {
    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) + 360) % 360;
    var s = clamp(parseFloat(match[2]), 0, 100);
    var l = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h, s, l, a];
  }

  return null;
};

cs.get.hwb = function (string) {
  if (!string) {
    return null;
  }

  var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  var match = string.match(hwb);

  if (match) {
    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) % 360 + 360) % 360;
    var w = clamp(parseFloat(match[2]), 0, 100);
    var b = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h, w, b, a];
  }

  return null;
};

cs.to.hex = function () {
  var rgba = swizzle(arguments);
  return '#' + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '');
};

cs.to.rgb = function () {
  var rgba = swizzle(arguments);
  return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')' : 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
  var rgba = swizzle(arguments);
  var r = Math.round(rgba[0] / 255 * 100);
  var g = Math.round(rgba[1] / 255 * 100);
  var b = Math.round(rgba[2] / 255 * 100);
  return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)' : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
  var hsla = swizzle(arguments);
  return hsla.length < 4 || hsla[3] === 1 ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)' : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
}; // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)


cs.to.hwb = function () {
  var hwba = swizzle(arguments);
  var a = '';

  if (hwba.length >= 4 && hwba[3] !== 1) {
    a = ', ' + hwba[3];
  }

  return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
  return reverseNames[rgb.slice(0, 3)];
}; // helpers


function clamp(num, min, max) {
  return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return str.length < 2 ? '0' + str : str;
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(222);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
  var results = [];

  for (var i = 0, len = args.length; i < len; i++) {
    var arg = args[i];

    if (isArrayish(arg)) {
      // http://jsperf.com/javascript-array-concat-vs-push/98
      results = concat.call(results, slice.call(arg));
    } else {
      results.push(arg);
    }
  }

  return results;
};

swizzle.wrap = function (fn) {
  return function () {
    return fn(swizzle(arguments));
  };
};

/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
  if (!obj || typeof obj === 'string') {
    return false;
  }

  return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== 'String');
};

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(102);

var route = __webpack_require__(225);

var convert = {};
var models = Object.keys(conversions);

function wrapRaw(fn) {
  var wrappedFn = function wrappedFn(args) {
    if (args === undefined || args === null) {
      return args;
    }

    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }

    return fn(args);
  }; // preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

function wrapRounded(fn) {
  var wrappedFn = function wrappedFn(args) {
    if (args === undefined || args === null) {
      return args;
    }

    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }

    var result = fn(args); // we're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.

    if (typeof result === 'object') {
      for (var len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  }; // preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

models.forEach(function (fromModel) {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], 'channels', {
    value: conversions[fromModel].channels
  });
  Object.defineProperty(convert[fromModel], 'labels', {
    value: conversions[fromModel].labels
  });
  var routes = route(fromModel);
  var routeModels = Object.keys(routes);
  routeModels.forEach(function (toModel) {
    var fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
module.exports = convert;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(102);
/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/


function buildGraph() {
  var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

  var models = Object.keys(conversions);

  for (var len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }

  return graph;
} // https://en.wikipedia.org/wiki/Breadth-first_search


function deriveBFS(fromModel) {
  var graph = buildGraph();
  var queue = [fromModel]; // unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    var current = queue.pop();
    var adjacents = Object.keys(conversions[current]);

    for (var len = adjacents.length, i = 0; i < len; i++) {
      var adjacent = adjacents[i];
      var node = graph[adjacent];

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }

  return graph;
}

function link(from, to) {
  return function (args) {
    return to(from(args));
  };
}

function wrapConversion(toModel, graph) {
  var path = [graph[toModel].parent, toModel];
  var fn = conversions[graph[toModel].parent][toModel];
  var cur = graph[toModel].parent;

  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
}

module.exports = function (fromModel) {
  var graph = deriveBFS(fromModel);
  var conversion = {};
  var models = Object.keys(graph);

  for (var len = models.length, i = 0; i < len; i++) {
    var toModel = models[i];
    var node = graph[toModel];

    if (node.parent === null) {
      // no possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion(toModel, graph);
  }

  return conversion;
};

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as the internal argument placeholder. */

var PLACEHOLDER = '__lodash_placeholder__';
/** Used to compose bitmasks for function metadata. */

var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    REARG_FLAG = 256,
    FLIP_FLAG = 512;
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;
/** Used to associate wrap methods with their bit flags. */

var wrapFlags = [['ary', ARY_FLAG], ['bind', BIND_FLAG], ['bindKey', BIND_KEY_FLAG], ['curry', CURRY_FLAG], ['curryRight', CURRY_RIGHT_FLAG], ['flip', FLIP_FLAG], ['partial', PARTIAL_FLAG], ['partialRight', PARTIAL_RIGHT_FLAG], ['rearg', REARG_FLAG]];
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to match wrap detail comments. */

var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */


function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }

  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */


function baseIsNaN(value) {
  return value !== value;
}
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */


function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      result++;
    }
  }

  return result;
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */


function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }

  return result;
}
/** Used for built-in method references. */


var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var objectCreate = Object.create;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/* Used to set `toString` methods. */

var defineProperty = function () {
  var func = getNative(Object, 'defineProperty'),
      name = getNative.name;
  return name && name.length > 2 ? func : undefined;
}();
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */


function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */


function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }

  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }

  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }

  return result;
}
/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */


function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }

  var offset = argsIndex;

  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }

  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }

  return result;
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */


function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}
/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }

  return wrapper;
}
/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */


function createCtor(Ctor) {
  return function () {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;

    switch (args.length) {
      case 0:
        return new Ctor();

      case 1:
        return new Ctor(args[0]);

      case 2:
        return new Ctor(args[0], args[1]);

      case 3:
        return new Ctor(args[0], args[1], args[2]);

      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);

      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);

      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }

    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args); // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.

    return isObject(result) ? result : thisBinding;
  };
}
/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }

    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
    length -= holders.length;

    if (length < arity) {
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
    }

    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }

    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }

    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }

    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }

    length -= holdersCount;

    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
    }

    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;
    length = args.length;

    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }

    if (isAry && ary < length) {
      args.length = ary;
    }

    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }

    return fn.apply(thisBinding, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */


function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }

    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }

    return apply(fn, isBind ? thisArg : this, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;
  bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}
/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 *   512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;

  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var length = partials ? partials.length : 0;

  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }

  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;
    partials = holders = undefined;
  }

  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }

  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }

  return setWrapToString(result, func, bitmask);
}
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */


function getHolder(func) {
  var object = func;
  return object.placeholder;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */


function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}
/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */


function insertWrapDetails(source, details) {
  var length = details.length,
      lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */


function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }

  return array;
}
/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */


var setWrapToString = !defineProperty ? identity : function (wrapper, reference, bitmask) {
  var source = reference + '';
  return defineProperty(wrapper, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
  });
};
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */


function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function (pair) {
    var value = '_.' + pair[0];

    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */


function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */


function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber(value);

  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */


function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */


function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */


function constant(value) {
  return function () {
    return value;
  };
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */


function identity(value) {
  return value;
} // Assign default placeholders.


curry.placeholder = {};
module.exports = curry;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16)))

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yuv2rgb = yuv2rgb;
exports.rgb2yuv = rgb2yuv;

function yuv2rgb(yuv) {
  var y = yuv[0],
      u = yuv[1],
      v = yuv[2];
  var r, g, b;
  r = y * 1 + u * 0 + v * 1.13983;
  g = y * 1 + u * -0.39465 + v * -0.5806;
  b = y * 1 + u * 2.02311 + v * 0;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
}

function rgb2yuv(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;
  var y = r * 0.299 + g * 0.587 + b * 0.114;
  var u = r * -0.14713 + g * -0.28886 + b * 0.436;
  var v = r * 0.615 + g * -0.51499 + b * -0.10001;
  return [y, u, v];
}

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};
exports["default"] = _default;

/***/ }),
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "pageQuery", function() { return /* binding */ pageQuery; });

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(12);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/styled-base/dist/styled-base.browser.esm.js
var styled_base_browser_esm = __webpack_require__(5);

// EXTERNAL MODULE: /z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./src/components/layout.tsx + 1 modules
var layout = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(21);

// CONCATENATED MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/createClass.js
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
// CONCATENATED MODULE: /z/monorepo/node_modules/avl/src/utils.js
/**
 * Prints tree horizontally
 * @param  {Node}                       root
 * @param  {Function(node:Node):String} [printNode]
 * @return {String}
 */
function print(root) {
  var printNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (n) {
    return n.key;
  };
  var out = [];
  row(root, '', true, function (v) {
    return out.push(v);
  }, printNode);
  return out.join('');
}
/**
 * Prints level of the tree
 * @param  {Node}                        root
 * @param  {String}                      prefix
 * @param  {Boolean}                     isTail
 * @param  {Function(in:string):void}    out
 * @param  {Function(node:Node):String}  printNode
 */

function row(root, prefix, isTail, out, printNode) {
  if (root) {
    out("".concat(prefix).concat(isTail ? '└── ' : '├── ').concat(printNode(root), "\n"));
    var indent = prefix + (isTail ? '    ' : '│   ');
    if (root.left) row(root.left, indent, false, out, printNode);
    if (root.right) row(root.right, indent, true, out, printNode);
  }
}
/**
 * Is the tree balanced (none of the subtrees differ in height by more than 1)
 * @param  {Node}    root
 * @return {Boolean}
 */


function utils_isBalanced(root) {
  if (root === null) return true; // If node is empty then return true
  // Get the height of left and right sub trees

  var lh = height(root.left);
  var rh = height(root.right);
  if (Math.abs(lh - rh) <= 1 && utils_isBalanced(root.left) && utils_isBalanced(root.right)) return true; // If we reach here then tree is not height-balanced

  return false;
}
/**
 * The function Compute the 'height' of a tree.
 * Height is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * @param  {Node} node
 * @return {Number}
 */

function height(node) {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
}

function loadRecursive(parent, keys, values, start, end) {
  var size = end - start;

  if (size > 0) {
    var middle = start + Math.floor(size / 2);
    var key = keys[middle];
    var data = values[middle];
    var node = {
      key: key,
      data: data,
      parent: parent
    };
    node.left = loadRecursive(node, keys, values, start, middle);
    node.right = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }

  return null;
}
function markBalance(node) {
  if (node === null) return 0;
  var lh = markBalance(node.left);
  var rh = markBalance(node.right);
  node.balanceFactor = lh - rh;
  return Math.max(lh, rh) + 1;
}
function sort(keys, values, left, right, compare) {
  if (left >= right) return; // eslint-disable-next-line no-bitwise

  var pivot = keys[left + right >> 1];
  var i = left - 1;
  var j = right + 1; // eslint-disable-next-line no-constant-condition

  while (true) {
    do {
      i++;
    } while (compare(keys[i], pivot) < 0);

    do {
      j--;
    } while (compare(keys[j], pivot) > 0);

    if (i >= j) break;
    var tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;
    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }

  sort(keys, values, left, j, compare);
  sort(keys, values, j + 1, right, compare);
}
// CONCATENATED MODULE: /z/monorepo/node_modules/avl/src/index.js


 // function createNode (parent, left, right, height, key, data) {
//   return { parent, left, right, balanceFactor: height, key, data };
// }

/**
 * @typedef {{
 *   parent:        ?Node,
 *   left:          ?Node,
 *   right:         ?Node,
 *   balanceFactor: number,
 *   key:           Key,
 *   data:          Value
 * }} Node
 */

/**
 * @typedef {*} Key
 */

/**
 * @typedef {*} Value
 */

/**
 * Default comparison function
 * @param {Key} a
 * @param {Key} b
 * @returns {number}
 */

function DEFAULT_COMPARE(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Single left rotation
 * @param  {Node} node
 * @return {Node}
 */


function rotateLeft(node) {
  var rightNode = node.right;
  node.right = rightNode.left;
  if (rightNode.left) rightNode.left.parent = node;
  rightNode.parent = node.parent;

  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode;
    } else {
      rightNode.parent.right = rightNode;
    }
  }

  node.parent = rightNode;
  rightNode.left = node;
  node.balanceFactor += 1;

  if (rightNode.balanceFactor < 0) {
    node.balanceFactor -= rightNode.balanceFactor;
  }

  rightNode.balanceFactor += 1;

  if (node.balanceFactor > 0) {
    rightNode.balanceFactor += node.balanceFactor;
  }

  return rightNode;
}

function rotateRight(node) {
  var leftNode = node.left;
  node.left = leftNode.right;
  if (node.left) node.left.parent = node;
  leftNode.parent = node.parent;

  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode;
    } else {
      leftNode.parent.right = leftNode;
    }
  }

  node.parent = leftNode;
  leftNode.right = node;
  node.balanceFactor -= 1;

  if (leftNode.balanceFactor > 0) {
    node.balanceFactor -= leftNode.balanceFactor;
  }

  leftNode.balanceFactor -= 1;

  if (node.balanceFactor < 0) {
    leftNode.balanceFactor += node.balanceFactor;
  }

  return leftNode;
} // function leftBalance (node) {
//   if (node.left.balanceFactor === -1) rotateLeft(node.left);
//   return rotateRight(node);
// }
// function rightBalance (node) {
//   if (node.right.balanceFactor === 1) rotateRight(node.right);
//   return rotateLeft(node);
// }


var src_AVLTree = /*#__PURE__*/function () {
  /**
   * Callback for comparator
   * @callback comparatorCallback
   * @param {Key} a
   * @param {Key} b
   * @returns {number}
   */

  /**
   * @class AVLTree
   * @constructor
   * @param  {comparatorCallback} [comparator]
   * @param  {boolean}            [noDuplicates=false] Disallow duplicates
   */
  function AVLTree(comparator) {
    var noDuplicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, AVLTree);

    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }
  /**
   * Clear the tree
   * @return {AVLTree}
   */


  _createClass(AVLTree, [{
    key: "destroy",
    value: function destroy() {
      return this.clear();
    }
    /**
     * Clear the tree
     * @return {AVLTree}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._root = null;
      this._size = 0;
      return this;
    }
    /**
     * Number of nodes
     * @return {number}
     */

  }, {
    key: "contains",

    /**
     * Whether the tree contains a node with the given key
     * @param  {Key} key
     * @return {boolean} true/false
     */
    value: function contains(key) {
      if (this._root) {
        var node = this._root;
        var comparator = this._comparator;

        while (node) {
          var cmp = comparator(key, node.key);
          if (cmp === 0) return true;else if (cmp < 0) node = node.left;else node = node.right;
        }
      }

      return false;
    }
    /* eslint-disable class-methods-use-this */

    /**
     * Successor node
     * @param  {Node} node
     * @return {?Node}
     */

  }, {
    key: "next",
    value: function next(node) {
      var successor = node;

      if (successor) {
        if (successor.right) {
          successor = successor.right;

          while (successor.left) {
            successor = successor.left;
          }
        } else {
          successor = node.parent;

          while (successor && successor.right === node) {
            node = successor;
            successor = successor.parent;
          }
        }
      }

      return successor;
    }
    /**
     * Predecessor node
     * @param  {Node} node
     * @return {?Node}
     */

  }, {
    key: "prev",
    value: function prev(node) {
      var predecessor = node;

      if (predecessor) {
        if (predecessor.left) {
          predecessor = predecessor.left;

          while (predecessor.right) {
            predecessor = predecessor.right;
          }
        } else {
          predecessor = node.parent;

          while (predecessor && predecessor.left === node) {
            node = predecessor;
            predecessor = predecessor.parent;
          }
        }
      }

      return predecessor;
    }
    /* eslint-enable class-methods-use-this */

    /**
     * Callback for forEach
     * @callback forEachCallback
     * @param {Node} node
     * @param {number} index
     */

    /**
     * @param  {forEachCallback} callback
     * @return {AVLTree}
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      var current = this._root;
      var s = [],
          done = false,
          i = 0;

      while (!done) {
        // Reach the left most Node of the current Node
        if (current) {
          // Place pointer to a tree node on the stack
          // before traversing the node's left subtree
          s.push(current);
          current = current.left;
        } else {
          // BackTrack from the empty subtree and visit the Node
          // at the top of the stack; however, if the stack is
          // empty you are done
          if (s.length > 0) {
            current = s.pop();
            callback(current, i++); // We have visited the node and its left
            // subtree. Now, it's right subtree's turn

            current = current.right;
          } else done = true;
        }
      }

      return this;
    }
    /**
     * Walk key range from `low` to `high`. Stops if `fn` returns a value.
     * @param  {Key}      low
     * @param  {Key}      high
     * @param  {Function} fn
     * @param  {*?}       ctx
     * @return {SplayTree}
     */

  }, {
    key: "range",
    value: function range(low, high, fn, ctx) {
      var Q = [];
      var compare = this._comparator;
      var node = this._root,
          cmp;

      while (Q.length !== 0 || node) {
        if (node) {
          Q.push(node);
          node = node.left;
        } else {
          node = Q.pop();
          cmp = compare(node.key, high);

          if (cmp > 0) {
            break;
          } else if (compare(node.key, low) >= 0) {
            if (fn.call(ctx, node)) return this; // stop if smth is returned
          }

          node = node.right;
        }
      }

      return this;
    }
    /**
     * Returns all keys in order
     * @return {Array<Key>}
     */

  }, {
    key: "keys",
    value: function keys() {
      var current = this._root;
      var s = [],
          r = [],
          done = false;

      while (!done) {
        if (current) {
          s.push(current);
          current = current.left;
        } else {
          if (s.length > 0) {
            current = s.pop();
            r.push(current.key);
            current = current.right;
          } else done = true;
        }
      }

      return r;
    }
    /**
     * Returns `data` fields of all nodes in order.
     * @return {Array<Value>}
     */

  }, {
    key: "values",
    value: function values() {
      var current = this._root;
      var s = [],
          r = [],
          done = false;

      while (!done) {
        if (current) {
          s.push(current);
          current = current.left;
        } else {
          if (s.length > 0) {
            current = s.pop();
            r.push(current.data);
            current = current.right;
          } else done = true;
        }
      }

      return r;
    }
    /**
     * Returns node at given index
     * @param  {number} index
     * @return {?Node}
     */

  }, {
    key: "at",
    value: function at(index) {
      // removed after a consideration, more misleading than useful
      // index = index % this.size;
      // if (index < 0) index = this.size - index;
      var current = this._root;
      var s = [],
          done = false,
          i = 0;

      while (!done) {
        if (current) {
          s.push(current);
          current = current.left;
        } else {
          if (s.length > 0) {
            current = s.pop();
            if (i === index) return current;
            i++;
            current = current.right;
          } else done = true;
        }
      }

      return null;
    }
    /**
     * Returns node with the minimum key
     * @return {?Node}
     */

  }, {
    key: "minNode",
    value: function minNode() {
      var node = this._root;
      if (!node) return null;

      while (node.left) {
        node = node.left;
      }

      return node;
    }
    /**
     * Returns node with the max key
     * @return {?Node}
     */

  }, {
    key: "maxNode",
    value: function maxNode() {
      var node = this._root;
      if (!node) return null;

      while (node.right) {
        node = node.right;
      }

      return node;
    }
    /**
     * Min key
     * @return {?Key}
     */

  }, {
    key: "min",
    value: function min() {
      var node = this._root;
      if (!node) return null;

      while (node.left) {
        node = node.left;
      }

      return node.key;
    }
    /**
     * Max key
     * @return {?Key}
     */

  }, {
    key: "max",
    value: function max() {
      var node = this._root;
      if (!node) return null;

      while (node.right) {
        node = node.right;
      }

      return node.key;
    }
    /**
     * @return {boolean} true/false
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this._root;
    }
    /**
     * Removes and returns the node with smallest key
     * @return {?Node}
     */

  }, {
    key: "pop",
    value: function pop() {
      var node = this._root,
          returnValue = null;

      if (node) {
        while (node.left) {
          node = node.left;
        }

        returnValue = {
          key: node.key,
          data: node.data
        };
        this.remove(node.key);
      }

      return returnValue;
    }
    /**
     * Find node by key
     * @param  {Key} key
     * @return {?Node}
     */

  }, {
    key: "find",
    value: function find(key) {
      var root = this._root; // if (root === null)    return null;
      // if (key === root.key) return root;

      var subtree = root,
          cmp;
      var compare = this._comparator;

      while (subtree) {
        cmp = compare(key, subtree.key);
        if (cmp === 0) return subtree;else if (cmp < 0) subtree = subtree.left;else subtree = subtree.right;
      }

      return null;
    }
    /**
     * Insert a node into the tree
     * @param  {Key} key
     * @param  {Value} [data]
     * @return {?Node}
     */

  }, {
    key: "insert",
    value: function insert(key, data) {
      if (!this._root) {
        this._root = {
          parent: null,
          left: null,
          right: null,
          balanceFactor: 0,
          key: key,
          data: data
        };
        this._size++;
        return this._root;
      }

      var compare = this._comparator;
      var node = this._root;
      var parent = null;
      var cmp = 0;

      if (this._noDuplicates) {
        while (node) {
          cmp = compare(key, node.key);
          parent = node;
          if (cmp === 0) return null;else if (cmp < 0) node = node.left;else node = node.right;
        }
      } else {
        while (node) {
          cmp = compare(key, node.key);
          parent = node;
          if (cmp <= 0) node = node.left; //return null;
          else node = node.right;
        }
      }

      var newNode = {
        left: null,
        right: null,
        balanceFactor: 0,
        parent: parent,
        key: key,
        data: data
      };
      var newRoot;
      if (cmp <= 0) parent.left = newNode;else parent.right = newNode;

      while (parent) {
        cmp = compare(parent.key, key);
        if (cmp < 0) parent.balanceFactor -= 1;else parent.balanceFactor += 1;
        if (parent.balanceFactor === 0) break;else if (parent.balanceFactor < -1) {
          // inlined
          //var newRoot = rightBalance(parent);
          if (parent.right.balanceFactor === 1) rotateRight(parent.right);
          newRoot = rotateLeft(parent);
          if (parent === this._root) this._root = newRoot;
          break;
        } else if (parent.balanceFactor > 1) {
          // inlined
          // var newRoot = leftBalance(parent);
          if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
          newRoot = rotateRight(parent);
          if (parent === this._root) this._root = newRoot;
          break;
        }
        parent = parent.parent;
      }

      this._size++;
      return newNode;
    }
    /**
     * Removes the node from the tree. If not found, returns null.
     * @param  {Key} key
     * @return {?Node}
     */

  }, {
    key: "remove",
    value: function remove(key) {
      if (!this._root) return null;
      var node = this._root;
      var compare = this._comparator;
      var cmp = 0;

      while (node) {
        cmp = compare(key, node.key);
        if (cmp === 0) break;else if (cmp < 0) node = node.left;else node = node.right;
      }

      if (!node) return null;
      var returnValue = node.key;
      var max, min;

      if (node.left) {
        max = node.left;

        while (max.left || max.right) {
          while (max.right) {
            max = max.right;
          }

          node.key = max.key;
          node.data = max.data;

          if (max.left) {
            node = max;
            max = max.left;
          }
        }

        node.key = max.key;
        node.data = max.data;
        node = max;
      }

      if (node.right) {
        min = node.right;

        while (min.left || min.right) {
          while (min.left) {
            min = min.left;
          }

          node.key = min.key;
          node.data = min.data;

          if (min.right) {
            node = min;
            min = min.right;
          }
        }

        node.key = min.key;
        node.data = min.data;
        node = min;
      }

      var parent = node.parent;
      var pp = node;
      var newRoot;

      while (parent) {
        if (parent.left === pp) parent.balanceFactor -= 1;else parent.balanceFactor += 1;

        if (parent.balanceFactor < -1) {
          // inlined
          //var newRoot = rightBalance(parent);
          if (parent.right.balanceFactor === 1) rotateRight(parent.right);
          newRoot = rotateLeft(parent);
          if (parent === this._root) this._root = newRoot;
          parent = newRoot;
        } else if (parent.balanceFactor > 1) {
          // inlined
          // var newRoot = leftBalance(parent);
          if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
          newRoot = rotateRight(parent);
          if (parent === this._root) this._root = newRoot;
          parent = newRoot;
        }

        if (parent.balanceFactor === -1 || parent.balanceFactor === 1) break;
        pp = parent;
        parent = parent.parent;
      }

      if (node.parent) {
        if (node.parent.left === node) node.parent.left = null;else node.parent.right = null;
      }

      if (node === this._root) this._root = null;
      this._size--;
      return returnValue;
    }
    /**
     * Bulk-load items
     * @param  {Array<Key>}  keys
     * @param  {Array<Value>}  [values]
     * @return {AVLTree}
     */

  }, {
    key: "load",
    value: function load() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var presort = arguments.length > 2 ? arguments[2] : undefined;
      if (this._size !== 0) throw new Error('bulk-load: tree is not empty');
      var size = keys.length;
      if (presort) sort(keys, values, 0, size - 1, this._comparator);
      this._root = loadRecursive(null, keys, values, 0, size);
      markBalance(this._root);
      this._size = size;
      return this;
    }
    /**
     * Returns true if the tree is balanced
     * @return {boolean}
     */

  }, {
    key: "isBalanced",
    value: function isBalanced() {
      return utils_isBalanced(this._root);
    }
    /**
     * String representation of the tree - primitive horizontal print-out
     * @param  {Function(Node):string} [printNode]
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString(printNode) {
      return print(this._root, printNode);
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }]);

  return AVLTree;
}();


src_AVLTree.default = src_AVLTree;
// EXTERNAL MODULE: /z/monorepo/node_modules/react-json-tree/lib/index.js
var lib = __webpack_require__(160);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ../code/src-deno/frontend/diff.ts

var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

function diffMain(_ref) {
  var text1 = _ref.text1,
      text2 = _ref.text2,
      cursorPos = _ref.cursorPos;

  // Check for equality
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }

    return [];
  }

  if (cursorPos) {
    var editdiff = findCursorEditDiff(text1, text2, cursorPos);

    if (editdiff) {
      return editdiff;
    }
  } // Trim off common prefix (speedup).


  var commonlength = diffCommonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength); // Trim off common suffix (speedup).

  commonlength = diffCommonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength); // Compute the diff on the middle block.

  var diffs = diffCompute_(text1, text2); // Restore the prefix and suffix.

  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }

  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }

  diffCleanupMerge(diffs);
  return diffs;
}

function diffCompute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);

  if (i !== -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]]; // Swap insertions for deletions if diff is reversed.

    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }

    return diffs;
  }

  if (shorttext.length === 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  } // Check to see if the problem can be split in two.


  var hm = diffHalfMatch_(text1, text2);

  if (hm) {
    // A half-match was found, sort out the return data.
    var text1C = hm[0] || "";
    var text1B = hm[1] || "";
    var text2C = hm[2] || "";
    var text2B = hm[3] || "";
    var midCommon = hm[4] || ""; // Send both pairs off for separate processing.

    var diffsA = diffMain({
      text1: text1C,
      text2: text2C,
      cursorPos: 0
    });
    var diffsB = diffMain({
      text1: text1B,
      text2: text2B,
      cursorPos: 0
    }); // Merge the results.

    return diffsA.concat([[DIFF_EQUAL, midCommon[1]]], diffsB);
  }

  return diffBisect_(text1, text2);
}

function diffBisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1Length = text1.length;
  var text2Length = text2.length;
  var maxD = Math.ceil((text1Length + text2Length) / 2);
  var vOffset = maxD;
  var vLength = 2 * maxD;
  var v1 = new Array(vLength);
  var v2 = new Array(vLength); // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.

  for (var x = 0; x < vLength; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }

  v1[vOffset + 1] = 0;
  v2[vOffset + 1] = 0;
  var delta = text1Length - text2Length; // If the total number of characters is odd, then the front path will collide
  // with the reverse path.

  var front = delta % 2 !== 0; // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.

  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;

  for (var d = 0; d < maxD; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1Offset = vOffset + k1;
      var x1 = void 0;

      if (k1 === -d || k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1]) {
        x1 = v1[k1Offset + 1];
      } else {
        x1 = v1[k1Offset - 1] + 1;
      }

      var y1 = x1 - k1;

      while (x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1)) {
        x1++;
        y1++;
      }

      v1[k1Offset] = x1;

      if (x1 > text1Length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2Length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2Offset = vOffset + delta - k1;

        if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          var _x = text1Length - v2[k2Offset];

          if (x1 >= _x) {
            // Overlap detected.
            return diffBisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    var x2 = void 0; // Walk the reverse path one step.

    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var _k2Offset = vOffset + k2;

      if (k2 === -d || k2 !== d && v2[_k2Offset - 1] < v2[_k2Offset + 1]) {
        x2 = v2[_k2Offset + 1];
      } else {
        x2 = v2[_k2Offset - 1] + 1;
      }

      var y2 = x2 - k2;

      while (x2 < text1Length && y2 < text2Length && text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1)) {
        x2++;
        y2++;
      }

      v2[_k2Offset] = x2;

      if (x2 > text1Length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2Length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var _k1Offset = vOffset + delta - k2;

        if (_k1Offset >= 0 && _k1Offset < vLength && v1[_k1Offset] !== -1) {
          var _x2 = v1[_k1Offset];

          var _y = vOffset + _x2 - _k1Offset; // Mirror x2 onto top-left coordinate system.


          x2 = text1Length - x2;

          if (_x2 >= x2) {
            // Overlap detected.
            return diffBisectSplit_(text1, text2, _x2, _y);
          }
        }
      }
    }
  } // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.


  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
}

function diffBisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y); // Compute both diffs serially.

  var diffs = diffMain({
    text1: text1a,
    text2: text2a,
    cursorPos: 0
  });
  var diffsB = diffMain({
    text1: text1b,
    text2: text2b,
    cursorPos: 0
  });
  return diffs.concat(diffsB);
}

function diffCommonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  } // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/


  var pointerMin = 0;
  var pointerMax = Math.min(text1.length, text2.length);
  var pointerMid = pointerMax;
  var pointerStart = 0;

  while (pointerMin < pointerMid) {
    if (text1.substring(pointerStart, pointerMid) == text2.substring(pointerStart, pointerMid)) {
      pointerMin = pointerMid;
      pointerStart = pointerMin;
    } else {
      pointerMax = pointerMid;
    }

    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }

  if (isSurrogatePairStart(text1.charCodeAt(pointerMid - 1))) {
    pointerMid--;
  }

  return pointerMid;
}

function diffCommonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  } // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/


  var pointerMin = 0;
  var pointerMax = Math.min(text1.length, text2.length);
  var pointerMid = pointerMax;
  var pointerEnd = 0;

  while (pointerMin < pointerMid) {
    if (text1.substring(text1.length - pointerMid, text1.length - pointerEnd) == text2.substring(text2.length - pointerMid, text2.length - pointerEnd)) {
      pointerMin = pointerMid;
      pointerEnd = pointerMin;
    } else {
      pointerMax = pointerMid;
    }

    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }

  if (isSurrogatePairEnd(text1.charCodeAt(text1.length - pointerMid))) {
    pointerMid--;
  }

  return pointerMid;
}

function diffHalfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;

  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null; // Pointless.
  }

  function diffHalfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var bestCommon = "";
    var bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;

    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diffCommonPrefix(longtext.substring(i), shorttext.substring(j));
      var suffixLength = diffCommonSuffix(longtext.substring(0, i), shorttext.substring(0, j));

      if (bestCommon.length < suffixLength + prefixLength) {
        bestCommon = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        bestLongtextA = longtext.substring(0, i - suffixLength);
        bestLongtextB = longtext.substring(i + prefixLength);
        bestShorttextA = shorttext.substring(0, j - suffixLength);
        bestShorttextB = shorttext.substring(j + prefixLength);
      }
    }

    if (bestCommon.length * 2 >= longtext.length) {
      return [bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB, bestCommon];
    } else {
      return null;
    }
  } // First check if the second quarter is the seed for a half-match.


  var hm1 = diffHalfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4)); // Check again based on the third quarter.

  var hm2 = diffHalfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
  var hm;
  if (hm2 === null && hm1 === null) return null;else if (hm2 === null) {
    if (hm1 === null) {
      return null;
    }

    hm = hm1;
  } else if (hm1 === null) {
    if (hm2 === null) {
      return null;
    }

    hm = hm2;
  } else {
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  } // A half-match was found, sort out the return data.

  var text1A, text1B, text2A, text2B;

  if (text1.length > text2.length) {
    text1A = hm[0];
    text1B = hm[1];
    text2A = hm[2];
    text2B = hm[3];
  } else {
    text2A = hm[0];
    text2B = hm[1];
    text1A = hm[2];
    text1B = hm[3];
  }

  var midCommon = hm[4];
  return [text1A, text1B, text2A, text2B, midCommon];
}

function diffCleanupMerge(Diffs) {
  var diffs = Object(toConsumableArray["a" /* default */])(Diffs);

  diffs.push([DIFF_EQUAL, ""]); // Add a dummy entry at the end.

  var pointer = 0;
  var countDelete = 0;
  var countInsert = 0;
  var textDelete = "";
  var textInsert = "";
  var commonlength;
  var previousEquality;

  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }

    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        countInsert++;
        textInsert += diffs[pointer][1];
        pointer++;
        break;

      case DIFF_DELETE:
        countDelete++;
        textDelete += diffs[pointer][1];
        pointer++;
        break;

      case DIFF_EQUAL:
        previousEquality = pointer - countInsert - countDelete - 1;

        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          // for empty equality not at end, wait for next equality
          diffs.splice(pointer, 1);
          break;
        }

        if (textDelete.length > 0 || textInsert.length > 0) {
          // note that diffCommonPrefix and diffCommonSuffix are unicode-aware
          if (textDelete.length > 0 && textInsert.length > 0) {
            // Factor out any common prefixes.
            commonlength = diffCommonPrefix(textInsert, textDelete);

            if (commonlength !== 0) {
              if (previousEquality >= 0) {
                diffs[previousEquality][1] += textInsert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, textInsert.substring(0, commonlength)]);
                pointer++;
              }

              textInsert = textInsert.substring(commonlength);
              textDelete = textDelete.substring(commonlength);
            } // Factor out any common suffixes.


            commonlength = diffCommonSuffix(textInsert, textDelete);

            if (commonlength !== 0) {
              diffs[pointer][1] = textInsert.substring(textInsert.length - commonlength) + diffs[pointer][1];
              textInsert = textInsert.substring(0, textInsert.length - commonlength);
              textDelete = textDelete.substring(0, textDelete.length - commonlength);
            }
          } // Delete the offending records and add the merged ones.


          var n = countInsert + countDelete;

          if (textDelete.length === 0 && textInsert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (textDelete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, textInsert]);
            pointer = pointer - n + 1;
          } else if (textInsert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, textDelete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(pointer - n, n, [DIFF_DELETE, textDelete], [DIFF_INSERT, textInsert]);
            pointer = pointer - n + 2;
          }
        }

        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }

        countInsert = 0;
        countDelete = 0;
        textDelete = "";
        textInsert = "";
        break;
    }
  }

  if (diffs[diffs.length - 1][1] === "") {
    diffs.pop(); // Remove the dummy entry at the end.
  } // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC


  var changes = false;
  pointer = 1; // Intentionally ignore the first and last element (don't need checking).

  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }

    pointer++;
    isSurrogatePairStart;
  } // If shifts were made, the diff needs reordering and another shift sweep.


  if (changes) {
    "";
    return diffCleanupMerge(diffs);
  }

  return diffs;
}

function isSurrogatePairStart(charCode) {
  return charCode >= 0xD800 && charCode <= 0xDBFF;
}

function isSurrogatePairEnd(charCode) {
  return charCode >= 0xDC00 && charCode <= 0xDFFF;
}

function startsWithPairEnd(str) {
  return isSurrogatePairEnd(str.charCodeAt(0));
}

function endsWithPairStart(str) {
  return isSurrogatePairStart(str.charCodeAt(str.length - 1));
}

function removeEmptyTuples(tuples) {
  var ret = [];

  for (var i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }

  return ret;
}

function makeEditSplice(before, oldMiddle, newMiddle, after) {
  if (endsWithPairStart(before) || startsWithPairEnd(after)) {
    return null;
  }

  return removeEmptyTuples([[DIFF_EQUAL, before], [DIFF_DELETE, oldMiddle], [DIFF_INSERT, newMiddle], [DIFF_EQUAL, after]]);
}

function findCursorEditDiff(oldText, newText, cursorPos) {
  // note: this runs after equality check has ruled out exact equality
  var oldRange = typeof cursorPos === "number" ? {
    index: cursorPos,
    length: 0
  } : cursorPos.oldRange;
  var newRange = typeof cursorPos === "number" ? null : cursorPos.newRange; // take into account the old and new selection to generate the best diff
  // possible for a text edit.  for example, a text change from "xxx" to "xx"
  // could be a delete or forwards-delete of any one of the x's, or the
  // result of selecting two of the x's and typing "x".

  var oldLength = oldText.length;
  var newLength = newText.length;

  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    // see if we have an insert or delete before or after cursor
    var oldCursor = oldRange.index;
    var oldBefore = oldText.slice(0, oldCursor);
    var oldAfter = oldText.slice(oldCursor);
    var maybeNewCursor = newRange ? newRange.index : null;

    editBefore: {
      // is this an insert or delete right before oldCursor?
      var newCursor = oldCursor + newLength - oldLength;

      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }

      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }

      var newBefore = newText.slice(0, newCursor);
      var newAfter = newText.slice(newCursor);

      if (newAfter !== oldAfter) {
        break editBefore;
      }

      var prefixLength = Math.min(oldCursor, newCursor);
      var oldPrefix = oldBefore.slice(0, prefixLength);
      var newPrefix = newBefore.slice(0, prefixLength);

      if (oldPrefix !== newPrefix) {
        break editBefore;
      }

      var oldMiddle = oldBefore.slice(prefixLength);
      var newMiddle = newBefore.slice(prefixLength);
      return makeEditSplice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }

    editAfter: {
      // is this an insert or delete right after oldCursor?
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }

      var cursor = oldCursor;

      var _newBefore = newText.slice(0, cursor);

      var _newAfter = newText.slice(cursor);

      if (_newBefore !== oldBefore) {
        break editAfter;
      }

      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);

      var newSuffix = _newAfter.slice(_newAfter.length - suffixLength);

      if (oldSuffix !== newSuffix) {
        break editAfter;
      }

      var _oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);

      var _newMiddle = _newAfter.slice(0, _newAfter.length - suffixLength);

      return makeEditSplice(oldBefore, _oldMiddle, _newMiddle, oldSuffix);
    }
  }

  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      // see if diff could be a splice of the old selection range
      var _oldPrefix = oldText.slice(0, oldRange.index);

      var _oldSuffix = oldText.slice(oldRange.index + oldRange.length);

      var _prefixLength = _oldPrefix.length;
      var _suffixLength = _oldSuffix.length;

      if (newLength < _prefixLength + _suffixLength) {
        break replaceRange;
      }

      var _newPrefix = newText.slice(0, _prefixLength);

      var _newSuffix = newText.slice(newLength - _suffixLength);

      if (_oldPrefix !== _newPrefix || _oldSuffix !== _newSuffix) {
        break replaceRange;
      }

      var _oldMiddle2 = oldText.slice(_prefixLength, oldLength - _suffixLength);

      var _newMiddle2 = newText.slice(_prefixLength, newLength - _suffixLength);

      return makeEditSplice(_oldPrefix, _oldMiddle2, _newMiddle2, _oldSuffix);
    }
  }

  return null;
}

function diff(text1, text2, cursorPos) {
  return diffMain({
    text1: text1,
    text2: text2,
    cursorPos: cursorPos
  });
}
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;
// EXTERNAL MODULE: ./src/components/codeBox/example.ts
var example = __webpack_require__(56);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/core/dist/core.browser.esm.js + 2 modules
var core_browser_esm = __webpack_require__(1);

// CONCATENATED MODULE: ./src/pages/404.tsx



function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }





 // If you're using Immutable.js: `npm i --save immutable`





var Rotated = Object(styled_base_browser_esm["a" /* default */])("div", {
  target: "elo6tnq0"
})( true ? {
  name: "1c8krw0",
  styles: "height:600px;display:block;width:600px;position:relative;border:4px solid black;"
} : undefined);

var _404_NotFoundPage = function NotFoundPage(_ref) {
  var data = _ref.data,
      location = _ref.location;

  var _React$useState = react["useState"]({
    avl: new src_AVLTree(undefined, true)
  }),
      avl = _React$useState[0].avl,
      changeTree = _React$useState[1];

  react["useEffect"](function () {
    changeTree(function (_ref2) {
      var avl = _ref2.avl;
      avl.insert(1);
      avl.insert(2);
      avl.insert(3);
      avl.insert(4);
      avl.insert(5);
      avl.insert(6);
      avl.insert(7);
      avl.insert(8);
      avl.insert(9);
      avl.insert(10);
      avl.insert(11);
      avl.insert(12);
      avl.insert(13);
      avl.insert(14);
      avl.insert(15);
      avl.insert(16);
      return {
        avl: avl
      };
    }); // changeTree((t) => {  const { avl } = t; avl.insert(1); avl.insert(2); avl.insert(4); return {...t, avl };  });
    // const interval =
    // setTimeout(() => {
    //   // const newNum = Math.round(Math.random() * 100000);
    //   // const insert =  ?(avl.maxNode().key! + 10) :2 ;
    //   changeTree((t) => {
    //     const { avl } = t;
    //     // for (let kk = 1; kk<1000; kk++){
    //     // console.log("use the INTERVAL", insert);
    //     avl.insert(4);
    //     avl.insert(Math.round(Math.random() * 100000));
    //     ///}
    //     return { ...t, avl };
    //   });
    // }, 1000);

    return function () {// clearInterval(interval);
      // avl.destroy();
    };
  }, []);
  var res = [];

  if (avl.minNode()) {
    var surface = function surface(minNode, maxNode) {
      return [].concat(Object(toConsumableArray["a" /* default */])(minNode && [minNode.key] || ["-"]), Object(toConsumableArray["a" /* default */])((minNode || maxNode) && minNode !== maxNode && surface(minNode && minNode.parent, maxNode && maxNode.parent) || ["*"]), Object(toConsumableArray["a" /* default */])(maxNode && maxNode !== minNode && [maxNode.key] || ["-"]));
    };

    res = surface(avl.minNode(), avl.maxNode()).filter(function (k) {
      return Number.isInteger(k);
    });
  } //@ts-ignore


  var getRoot = function getRoot(node) {
    return node && node.parent !== null ? getRoot(node.parent) : node || {
      key: 0
    };
  }; // const max = avl.maxNode() && avl.maxNode().key && avl.maxNode().key;
  // console.log(max);

  /* const h1 = res.length>3 : [] */


  //
  //   456
  //   23
  //   1
  var ReqPrint = function ReqPrint(_ref3) {
    var node = _ref3.node,
        topLevel = _ref3.topLevel,
        left = _ref3.left,
        level = _ref3.level;
    return Object(core_browser_esm["b" /* jsx */])(react["Fragment"], null, Object(core_browser_esm["b" /* jsx */])("div", {
      style: {
        position: "absolute",
        top: topLevel * 60,
        left: left
      }
    }, node.key), node.right && Object(core_browser_esm["b" /* jsx */])(ReqPrint, {
      node: node.right,
      left: left + 256 / Math.pow(2, level),
      topLevel: topLevel,
      level: level + 1
    }), node.left && Object(core_browser_esm["b" /* jsx */])(ReqPrint, {
      node: node.left,
      left: left,
      topLevel: topLevel + 1,
      level: level + 1
    }));
  }; // <>


  {
    /* <ItemContainer>{node.key}</ItemContainer> */
  }
  {
    /* {node.right &&<><RedBlock><ReqPrint node={node.right} /></RedBlock></>} */
  }
  {
    /* {node.left &&<><br /><BlueBlock><ReqPrint node={node.left} /></BlueBlock></>} */
  } // </>;

  var root = getRoot(avl.maxNode());

  var _React$useState2 = react["useState"](diff(example["a" /* counterExample */], "", 0)),
      diffArr = _React$useState2[0],
      chDiff = _React$useState2[1];

  return Object(core_browser_esm["b" /* jsx */])(layout["a" /* Layout */], null, Object(core_browser_esm["b" /* jsx */])(seo["a" /* SEO */], {
    title: "404: Not Found"
  }), Object(core_browser_esm["b" /* jsx */])(StyledText, {
    onChange: function onChange(e) {
      return chDiff(diff(e.target.value, example["a" /* counterExample */], 0));
    }
  }, example["a" /* counterExample */]), Object(core_browser_esm["b" /* jsx */])("h1", null, "Not Found"), Object(core_browser_esm["b" /* jsx */])(lib_default.a, {
    data: diffArr
  }), Object(core_browser_esm["b" /* jsx */])(Rotated, {
    key: res.toString()
  }, Object(core_browser_esm["b" /* jsx */])(ReqPrint, {
    node: root,
    topLevel: 0,
    left: 0,
    level: 0
  })), Object(core_browser_esm["b" /* jsx */])("p", null, "You just hit a route that not exist... the sadness."));
};

var StyledText = Object(styled_base_browser_esm["a" /* default */])("textarea", {
  target: "elo6tnq1"
})( true ? {
  name: "4a0w9a",
  styles: "min-width:600px;min-height:400px;"
} : undefined);

/* harmony default export */ var _404 = __webpack_exports__["default"] = (_404_NotFoundPage);
var pageQuery = "3159585216";

/***/ })
])]);