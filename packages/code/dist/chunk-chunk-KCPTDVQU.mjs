import {
  require_react_dom
} from "./chunk-chunk-PFY3UC77.mjs";
import {
  initAndTransform
} from "./chunk-chunk-ZNHWUEVT.mjs";
import {
  applyPatch,
  hashCode,
  mST,
  makePatch,
  makePatchFrom,
  md5,
  onSessionUpdate,
  patchSync,
  require_lodash,
  startSession
} from "./chunk-chunk-WBSKVTIU.mjs";
import {
  wrap
} from "./chunk-chunk-IACUZN5G.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-CR7O327K.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-CI3CHR6X.mjs";
import {
  require_emotion_cache_cjs
} from "./chunk-chunk-XCNCOID3.mjs";
import {
  require_react
} from "./chunk-chunk-QCM7DYZQ.mjs";
import {
  __commonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-3CLHXR2V.mjs";

// ../../.yarn/__virtual__/react-dom-virtual-b968d4cfd6/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js
var require_client = __commonJS({
  "../../.yarn/__virtual__/react-dom-virtual-b968d4cfd6/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js"(exports) {
    "use strict";
    init_define_process();
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h2, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h2, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// ../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable2(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable2(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// js/ws.ts
init_define_process();
var import_lodash = __toESM(require_lodash(), 1);

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
init_define_process();

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/utils.js
init_define_process();
function print(root, printNode = (n) => n.key) {
  var out = [];
  row(root, "", true, (v) => out.push(v), printNode);
  return out.join("");
}
function row(root, prefix, isTail, out, printNode) {
  if (root) {
    out(`${prefix}${isTail ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 "}${printNode(root)}
`);
    const indent = prefix + (isTail ? "    " : "\u2502   ");
    if (root.left)
      row(root.left, indent, false, out, printNode);
    if (root.right)
      row(root.right, indent, true, out, printNode);
  }
}
function isBalanced(root) {
  if (root === null)
    return true;
  var lh = height(root.left);
  var rh = height(root.right);
  if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right))
    return true;
  return false;
}
function height(node) {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
}
function loadRecursive(parent, keys, values, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys[middle];
    const data = values[middle];
    const node = { key, data, parent };
    node.left = loadRecursive(node, keys, values, start, middle);
    node.right = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }
  return null;
}
function markBalance(node) {
  if (node === null)
    return 0;
  const lh = markBalance(node.left);
  const rh = markBalance(node.right);
  node.balanceFactor = lh - rh;
  return Math.max(lh, rh) + 1;
}
function sort(keys, values, left, right, compare) {
  if (left >= right)
    return;
  const pivot = keys[left + right >> 1];
  let i = left - 1;
  let j = right + 1;
  while (true) {
    do
      i++;
    while (compare(keys[i], pivot) < 0);
    do
      j--;
    while (compare(keys[j], pivot) > 0);
    if (i >= j)
      break;
    let tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;
    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }
  sort(keys, values, left, j, compare);
  sort(keys, values, j + 1, right, compare);
}

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
function DEFAULT_COMPARE(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function rotateLeft(node) {
  var rightNode = node.right;
  node.right = rightNode.left;
  if (rightNode.left)
    rightNode.left.parent = node;
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
  if (node.left)
    node.left.parent = node;
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
}
var AVLTree = class {
  constructor(comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }
  destroy() {
    return this.clear();
  }
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }
  get size() {
    return this._size;
  }
  contains(key) {
    if (this._root) {
      var node = this._root;
      var comparator = this._comparator;
      while (node) {
        var cmp = comparator(key, node.key);
        if (cmp === 0)
          return true;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    return false;
  }
  next(node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor.left)
          successor = successor.left;
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
  prev(node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor.right)
          predecessor = predecessor.right;
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
  forEach(callback) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);
          current = current.right;
        } else
          done = true;
      }
    }
    return this;
  }
  range(low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;
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
          if (fn.call(ctx, node))
            return this;
        }
        node = node.right;
      }
    }
    return this;
  }
  keys() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  values() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  at(index) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index)
            return current;
          i++;
          current = current.right;
        } else
          done = true;
      }
    }
    return null;
  }
  minNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node;
  }
  maxNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node;
  }
  min() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node.key;
  }
  max() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node.key;
  }
  isEmpty() {
    return !this._root;
  }
  pop() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left)
        node = node.left;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  popMax() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.right)
        node = node.right;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  find(key) {
    var root = this._root;
    var subtree = root, cmp;
    var compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if (cmp === 0)
        return subtree;
      else if (cmp < 0)
        subtree = subtree.left;
      else
        subtree = subtree.right;
    }
    return null;
  }
  insert(key, data) {
    if (!this._root) {
      this._root = {
        parent: null,
        left: null,
        right: null,
        balanceFactor: 0,
        key,
        data
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
        if (cmp === 0)
          return null;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if (cmp <= 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    var newNode = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent,
      key,
      data
    };
    var newRoot;
    if (cmp <= 0)
      parent.left = newNode;
    else
      parent.right = newNode;
    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor === 0)
        break;
      else if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      }
      parent = parent.parent;
    }
    this._size++;
    return newNode;
  }
  remove(key) {
    if (!this._root)
      return null;
    var node = this._root;
    var compare = this._comparator;
    var cmp = 0;
    while (node) {
      cmp = compare(key, node.key);
      if (cmp === 0)
        break;
      else if (cmp < 0)
        node = node.left;
      else
        node = node.right;
    }
    if (!node)
      return null;
    var returnValue = node.key;
    var max, min;
    if (node.left) {
      max = node.left;
      while (max.left || max.right) {
        while (max.right)
          max = max.right;
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
        while (min.left)
          min = min.left;
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
      if (parent.left === pp)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      }
      if (parent.balanceFactor === -1 || parent.balanceFactor === 1)
        break;
      pp = parent;
      parent = parent.parent;
    }
    if (node.parent) {
      if (node.parent.left === node)
        node.parent.left = null;
      else
        node.parent.right = null;
    }
    if (node === this._root)
      this._root = null;
    this._size--;
    return returnValue;
  }
  load(keys = [], values = [], presort) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const size = keys.length;
    if (presort)
      sort(keys, values, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys, values, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  }
  isBalanced() {
    return isBalanced(this._root);
  }
  toString(printNode) {
    return print(this._root, printNode);
  }
};
AVLTree.default = AVLTree;

// js/uidV4.mjs
init_define_process();
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }
  return getRandomValues(rnds8);
}
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}

// js/starter.tsx
init_define_process();
var import_react8 = __toESM(require_react(), 1);

// js/ErrorBoundary.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var ErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = { error: void 0, errorInfo: void 0 };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.errorInfo) {
      return (0, import_jsx_runtime.jsxs)("div", {
        children: [
          (0, import_jsx_runtime.jsx)("h2", {
            children: "Something went wrong."
          }),
          (0, import_jsx_runtime.jsxs)("details", {
            style: { whiteSpace: "pre-wrap" },
            children: [
              this.state.error && this.state.error.toString(),
              (0, import_jsx_runtime.jsx)("br", {}),
              this.state.errorInfo.componentStack
            ]
          })
        ]
      });
    }
    return this.props.children;
  }
};
var ErrorBoundary_default = ErrorBoundary;

// js/starter.tsx
var import_react9 = __toESM(require_emotion_react_cjs(), 1);

// js/emotionCache.ts
init_define_process();
var import_cache = __toESM(require_emotion_cache_cjs(), 1);
var createCache = import_cache.default.default || import_cache.default;
var emotionCache_default = createCache;

// js/renderPreviewWindow.tsx
init_define_process();
var import_react6 = __toESM(require_react(), 1);
var import_client2 = __toESM(require_client(), 1);

// ../../.yarn/__virtual__/react-reverse-portal-virtual-1d0f51ed61/0/global/cache/react-reverse-portal-npm-2.1.1-e50ec91de3-9.zip/node_modules/react-reverse-portal/dist/web/index.js
init_define_process();
var React2 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
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
    return ReactDOM.createPortal(React2.Children.map(children, function(child) {
      if (!React2.isValidElement(child))
        return child;
      return React2.cloneElement(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(React2.PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = React2.createRef();
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
    return React2.createElement("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(React2.PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/renderPreviewWindow.tsx
var import_react7 = __toESM(require_emotion_react_cjs(), 1);

// js/Editor.tsx
init_define_process();
var import_react3 = __toESM(require_react(), 1);

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
    const { transform } = await import("./chunk-esbuildEsm-QJZ74HR2.mjs");
    const t = await transform(res, {
      format: "esm",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    const c = await transform(t.code, {
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
  const { transform } = await import("./chunk-esbuildEsm-QJZ74HR2.mjs");
  const hash = md5(source);
  mod.hashMap = { ...mod.hashMap, [hash]: name, [name]: hash };
  if (!mod.data[hash]) {
    const transformed = await transform(source, {
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
    mod.data = {
      ...mod.data,
      [hash]: {
        ...transformed,
        deps: findDeps(transformed.code)
      }
    };
    await Promise.all(mod.data[hash].deps.map(async (dep) => {
      if (mod.hashMap[dep]) {
        return;
      }
      const importMap = JSON.parse(
        document.querySelector("script[type=importmap]").innerHTML
      );
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
          url = await import.meta.resolve(dep, name);
          urlHash = md5(dep);
        } catch {
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

// js/renderToString.tsx
init_define_process();
var import_client = __toESM(require_client(), 1);
var import_react2 = __toESM(require_react(), 1);

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/renderToString.tsx
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod2 = {
  md5Hash: "",
  wait: 1,
  res: null,
  codeSpace: "",
  waitForDiv: async () => {
    const md5Hash = mod2.md5Hash;
    if (!mod2.res?.innerHTML)
      await waitForAnimation();
    if (!mod2.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }
    if (!mod2.res?.innerHTML.includes(md5Hash)) {
      console.log(`waiting ${mod2.wait} for ${mod2.md5Hash} `), await wait(mod2.wait);
    }
    if (mod2.res?.innerHTML.includes(md5Hash))
      return mod2.res.innerHTML;
    mod2.wait = mod2.wait * 2;
    return await mod2.waitForDiv();
  },
  setHash: null,
  setApp: (md5hash) => {
    const rootDiv = document.createElement("div");
    rootDiv.style.visibility = "hidden";
    rootDiv.style.position = "absolute";
    document.body.appendChild(rootDiv);
    const root = (0, import_client.createRoot)(rootDiv);
    root.render(
      (0, import_jsx_runtime2.jsx)(Helper, {
        md5Hash: md5hash
      })
    );
  }
};
var render = async (transpiled, codeSpace2) => {
  mod2.codeSpace = codeSpace2;
  const md5hash = md5(transpiled).slice(0, 8);
  if (!apps[md5hash])
    await appFactory(transpiled);
  mod2.wait = 1;
  if (!mod2.setHash) {
    mod2.setApp(
      md5hash
    );
  } else {
    mod2.setHash(md5hash);
  }
  const html = await mod2.waitForDiv();
  if (!html)
    return { html: null, css: null };
  const css4 = mineFromCaches(eCaches[md5hash]);
  const globalCss = document.querySelector("style[data-emotion=z-global]")?.innerHTML;
  return {
    html,
    css: globalCss + " " + css4
  };
};
function mineFromCaches(cache2) {
  const keys = Object.keys(cache2.inserted).map((x) => `.${cache2.key}-${x}`);
  return Array.from(document.styleSheets).map(
    (x) => x.cssRules[0]
  ).filter((x) => x && keys.includes(x.selectorText)).map((x) => x.cssText).join("\n");
}
var Helper = ({ md5Hash }) => {
  const ref = (0, import_react2.useRef)(null);
  const [hash, setHash] = (0, import_react2.useState)(md5Hash);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      mod2.res = ref.current;
    mod2.md5Hash = hash, mod2.setHash = (hash2) => setHash(hash2);
  }, [ref, hash, setHash]);
  const App = apps[hash];
  return (0, import_jsx_runtime2.jsx)("div", {
    ref,
    children: (0, import_jsx_runtime2.jsx)(App, {
      appId: `${mod2.codeSpace}-${hash}`
    }, hash)
  });
};
var waitForAnimation = () => {
  let animationFrame;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
};

// js/runner.tsx
var mod3 = {
  code: "",
  olderCode: ""
};
async function runner({ code, counter, codeSpace: codeSpace2 }) {
  mod3.code = code;
  const mst = mST();
  console.log(`${mst.i} => ${counter}`);
  if (counter < mst.i) {
    return;
  }
  setTimeout(() => {
    if (mod3.code === code && code !== mod3.olderCode) {
      runner({ code, counter, codeSpace: codeSpace2 });
    }
    mod3.olderCode = code;
  }, 1e3);
  try {
    const transpiled = await initAndTransform(code, {
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
      const UMD = await toUmd(transpiled.code, `${codeSpace2}.tsx`);
      console.log({ UMD });
      download("coder.js", await UMD?.toJs(`${codeSpace2}.tsx`));
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
    const { html, css: css4 } = await render(transpiledCode, codeSpace2);
    console.log({ html, css: css4 });
    if (!html) {
      return;
    }
    patchSync({
      ...mST(),
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css: css4
    });
    saveCode();
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

// js/Editor.tsx
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_emotion_react_cjs(), 1);

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
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-YEBMSAMH.mjs")).prettierJs;
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
  } catch {
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
var import_jsx_runtime3 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod4 = {
  CH() {
  },
  getValue: async () => "",
  setValue: async (code) => {
    if (code.length < 10)
      console.log(code);
  },
  getErrors: async () => [],
  code: "",
  counter: 0,
  codeSpace: "",
  lastKeyDown: 0,
  codeToSet: ""
};
var Editor = ({ codeSpace: codeSpace2 }) => {
  const ref = (0, import_react3.useRef)(null);
  const { i, code } = mST();
  const [
    mySession,
    changeContent
  ] = import_react4.default.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,
    onChange(_cb) {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod4.counter = mST().i;
  mod4.codeSpace = codeSpace2;
  const {
    myCode,
    started: started2,
    engine,
    onChange
  } = mySession;
  mod4.code = myCode;
  import_react4.default.useEffect(() => {
    if (ref.current === null && started2) {
      return;
    }
    (engine === "monaco" ? setMonaco(ref.current) : setAce()).then(
      (res) => Object.assign(mod4, res)
    ).then(() => changeContent((x) => ({ ...x, started: true })));
  }, [started2, ref]);
  import_react4.default.useEffect(
    () => {
      mod4.getErrors().then(console.log);
      onChange(
        () => mod4.getValue().then(
          () => changeContent((x) => ({
            ...x,
            counter: mod4.counter,
            myCode: mod4.code
          }))
        )
      );
    },
    [onChange, myCode, changeContent]
  );
  onSessionUpdate(() => {
    if (mod4.counter >= mST().i) {
      return;
    }
    mod4.counter = mST().i;
    mod4.code = mST().code;
    mod4.setValue(mod4.code);
    changeContent((x) => ({
      ...x,
      counter: mod4.counter,
      myCode: mod4.code
    }));
  }, "editor");
  return (0, import_jsx_runtime3.jsx)("div", {
    onKeyDown: () => mod4.lastKeyDown = Date.now(),
    id: "editor",
    css: import_react5.css`          
      max-width: 640px;
      height: 100%; 
      `,
    ref
  });
};
async function onModChange(_code) {
  const code = await prettierJs(_code);
  if (code === mod4.code)
    return;
  const counter = ++mod4.counter;
  mod4.code = code;
  runner({ code, counter, codeSpace: mod4.codeSpace });
}
async function setMonaco(container) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = location.origin + "/renderPreviewWindow.css";
  document.head.append(link);
  const { startMonaco } = await import("./chunk-startMonaco-YTQS2AD6.mjs");
  return startMonaco({
    container,
    name: mod4.codeSpace,
    code: mST().code,
    onChange: onModChange
  });
}
async function setAce() {
  const { startAce } = await import("./chunk-startAce-PAJE7BY2.mjs");
  return await startAce(mST().code, onModChange);
}

// js/renderPreviewWindow.tsx
var import_jsx_runtime4 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var DraggableWindowLazy = (0, import_react6.lazy)(
  () => wait(1e3).then(() => import("./chunk-DraggableWindow-LSMZUNBO.mjs"))
);
var RainbowContainer = ({ children }) => (0, import_jsx_runtime4.jsx)("div", {
  css: import_react7.css`
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
var AppToRender = ({ codeSpace: codeSpace2 }) => {
  const currentHash = hashCode();
  const [hash, setHash] = (0, import_react6.useState)(currentHash);
  const isStandalone = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
  (0, import_react6.useEffect)(() => {
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
  const portalNode = (0, import_react6.useMemo)(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace2}`, style: "height: 100%" }
  }), []);
  return (0, import_jsx_runtime4.jsxs)(import_react6.Fragment, {
    children: [
      (0, import_jsx_runtime4.jsx)(InPortal, {
        node: portalNode,
        children: (0, import_jsx_runtime4.jsx)(AutoUpdateApp, {
          hash,
          codeSpace: codeSpace2
        })
      }),
      isStandalone ? (0, import_jsx_runtime4.jsx)(OutPortal, {
        node: portalNode
      }) : (0, import_jsx_runtime4.jsx)(import_react6.Suspense, {
        fallback: (0, import_jsx_runtime4.jsx)(OutPortal, {
          node: portalNode
        }),
        children: (0, import_jsx_runtime4.jsx)(RainbowContainer, {
          children: (0, import_jsx_runtime4.jsxs)(import_react6.Fragment, {
            children: [
              (0, import_jsx_runtime4.jsx)(Editor, {
                codeSpace: codeSpace2
              }),
              (0, import_jsx_runtime4.jsx)(DraggableWindowLazy, {
                room: codeSpace2,
                children: (0, import_jsx_runtime4.jsx)(OutPortal, {
                  node: portalNode
                })
              })
            ]
          })
        })
      })
    ]
  });
};
var singleton = { started: false };
var renderPreviewWindow = ({ codeSpace: codeSpace2 }) => {
  if (singleton.started)
    return;
  singleton.started = true;
  const div = document.querySelector("#root");
  const root = (0, import_client2.createRoot)(div);
  const x = emotionCache_default({ key: "root" });
  root.render(
    (0, import_jsx_runtime4.jsx)(import_react7.CacheProvider, {
      value: x,
      children: (0, import_jsx_runtime4.jsx)(AppToRender, {
        codeSpace: codeSpace2
      })
    })
  );
};

// js/starter.tsx
var import_is_callable = __toESM(require_is_callable(), 1);
var import_jsx_runtime5 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var dynamicImport = (src) => window.importShim ? window.importShim(src) : import(src);
Object.assign(globalThis, { apps: {}, eCaches: {} });
var { apps, eCaches } = globalThis || globalThis.apps;
var AutoUpdateApp = ({ hash, codeSpace: codeSpace2 }) => {
  const [md5Hash, setMdHash] = (0, import_react8.useState)(md5(mST().transpiled).slice(0, 8));
  (0, import_react8.useEffect)(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash) {
      setMdHash(newHash);
    }
  }, [hash]);
  const ref = (0, import_react8.useRef)(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled).slice(0, 8)];
  return (0, import_jsx_runtime5.jsx)(ErrorBoundary_default, {
    ref,
    children: (0, import_jsx_runtime5.jsx)(App, {
      appId: `${codeSpace2}-${md5Hash}`
    })
  }, md5Hash);
};
var started = false;
async function appFactory(transpiled = "", codeSpace2) {
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  const hash = md5(trp).slice(0, 8);
  if (!apps[hash]) {
    try {
      console.log(`i: ${mstI}: `);
      const App = (await dynamicImport(createJsBlob(trp))).default;
      if ((0, import_is_callable.default)(App)) {
        eCaches[hash] = emotionCache_default({
          key: "z",
          speedy: false
        });
        eCaches[hash].compat = void 0;
        apps[hash] = ({ appId }) => appId.includes(hash) ? (0, import_jsx_runtime5.jsx)(import_react9.CacheProvider, {
          value: eCaches[hash],
          children: (0, import_jsx_runtime5.jsx)("div", {
            css: import_react9.css`height: 100%;`,
            id: appId,
            children: (0, import_jsx_runtime5.jsx)(App, {})
          })
        }) : null;
      } else
        throw new Error("the default export is not a function!");
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => (0, import_jsx_runtime5.jsxs)("div", {
          css: import_react9.css`background-color: orange;`,
          children: [
            (0, import_jsx_runtime5.jsx)("h1", {
              children: "Syntax Error"
            }),
            (0, import_jsx_runtime5.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            (0, import_jsx_runtime5.jsx)("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => (0, import_jsx_runtime5.jsxs)("div", {
          css: import_react9.css`background-color: orange;`,
          children: [
            (0, import_jsx_runtime5.jsx)("h1", {
              children: "Syntax Error"
            }),
            (0, import_jsx_runtime5.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            (0, import_jsx_runtime5.jsx)("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else {
        apps[hash] = () => (0, import_jsx_runtime5.jsx)("div", {
          css: import_react9.css`background-color: orange;`,
          children: (0, import_jsx_runtime5.jsxs)("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
  }
  if (!started && codeSpace2) {
    started = true;
    await renderPreviewWindow({ codeSpace: codeSpace2 });
  }
  return apps[hash];
}
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/ws.ts
var users = new AVLTree(
  (a, b) => a === b ? 0 : a < b ? 1 : -1,
  true
);
var webRtcArray = [];
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(
  0,
  8
);
users.insert(user);
var rtcConns = {};
var bc;
var codeSpace;
var _hash = "";
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var sendWS;
var rejoined = false;
var tracks = {};
var sendChannel = {
  localStream: null,
  webRtcArray,
  tracks,
  user,
  rtcConns,
  send(data) {
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        if (ch.readyState !== "open") {
          return;
        }
        if (!data.target || ch.target === data.target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (error) {
      }
    });
  }
};
Object.assign(globalThis, { sendChannel });
var run = async (startState) => {
  const { mST: mst, address } = startState;
  codeSpace = startState.codeSpace;
  bc = new BroadcastChannel(location.origin);
  if (location.pathname.endsWith("dehydrated")) {
    if (bc.onmessage = (event) => {
      if (event.data.codeSpace === codeSpace) {
        console.log(event.data);
      }
    }) {
      return;
    }
  }
  startSession(codeSpace, {
    name: user,
    state: mst
  }, location.origin);
  await appFactory(mst.transpiled, codeSpace);
  await join();
  bc = new BroadcastChannel(location.origin);
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user) {
      return;
    }
    if (event.data.codeSpace === codeSpace && event.data.address && !address) {
      ws?.send(JSON.stringify({ codeSpace, address: event.data.address }));
    }
    if (event.data.ignoreUser) {
      !ignoreUsers.includes(event.data.ignoreUser) && ignoreUsers.push(event.data.ignoreUser);
    }
    if (event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code) {
      const messageData = await makePatch(event.data.sess);
      await applyPatch(messageData);
    }
  };
  onSessionUpdate(
    () => {
      const sess = mST();
      const hash = md5(JSON.stringify(sess));
      if (hash === _hash)
        return;
      _hash = hash;
      bc.postMessage({
        ignoreUser: user,
        sess,
        codeSpace,
        address
      });
    },
    "broadcast"
  );
};
var intervalHandler = null;
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    const newWs = await join();
    return newWs;
  }
  return ws;
}
var ignoreUsers = [];
function saveCode() {
  debouncedSyncWs();
  debouncedSyncRTC();
}
var debouncedSyncRTC = (0, import_lodash.default)(syncRTC, 100, {
  trailing: true,
  leading: true,
  maxWait: 500
});
var debouncedSyncWs = (0, import_lodash.default)(syncWS, 1200, {
  trailing: true,
  leading: true,
  maxWait: 2500
});
async function syncWS() {
  try {
    if (ws) {
      if (wsLastHashCode === hashCode()) {
        return;
      }
      const sess = mST();
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message) {
        return;
      }
      if (message.newHash !== hashCode()) {
        return;
      }
      const messageString = JSON.stringify({ ...message, name: user });
      sendWS(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (error) {
  }
}
var stopVideo = async () => {
  if (!sendChannel.localStream)
    return;
  sendChannel.localStream.getTracks().map((x) => x.stop());
};
var startVideo = async (vidElement) => {
  const mediaConstraints = {
    audio: true,
    video: true
  };
  const localStream = await navigator.mediaDevices.getUserMedia(
    mediaConstraints
  );
  vidElement.srcObject = localStream;
  localStream.getTracks().forEach(
    (track) => Object.keys(sendChannel.rtcConns).map((k) => {
      const datachannel = sendChannel.rtcConns[k];
      datachannel.addTrack(track);
      datachannel.ontrack = ({ track: track2, streams }) => tracks[k] = { track: track2, streams };
    })
  );
};
async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode()) {
        return;
      }
      const sess = mST();
      const message = webRTCLastSeenHashCode ? await makePatchFrom(
        webRTCLastSeenHashCode,
        sess
      ) : await makePatch(sess);
      if (message && message.patch) {
        sendChannel.send(message);
      }
    }
  } catch (error) {
  }
}
async function join() {
  if (ws !== null) {
    return ws;
  }
  rejoined = true;
  if (location.origin.includes("localhost")) {
    return;
  }
  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket"
  );
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    ws = wsConnection;
    const mess = (data) => {
      try {
        ws && ws?.send && ws?.send(data);
      } catch {
        ws = null;
        rejoined = false;
        rejoin();
      }
    };
    sendWS = mess;
    const extendedWS = Object.assign(wsConnection, { hashCode: hashCode() });
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws", extendedWS)
    );
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;
      if (diff > 4e4) {
        try {
          if (wsConnection.readyState === wsConnection.OPEN) {
            wsConnection?.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff
              })
            );
            return;
          }
          rejoined = false;
          rejoin();
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 3e4);
    wsConnection.send(JSON.stringify({ name: user }));
    return wsConnection;
  });
  return wsConnection;
}
var h = {};
async function processWsMessage(event, source, conn) {
  if (ws == null) {
    return;
  }
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  processData(data, source, conn);
}
async function processData(data, source, conn) {
  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (data.hashCode || data.newHash && conn) {
    conn.hashCode = data.hashCode || data.newHash;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }
  if (ignoreUsers.includes(data.name)) {
    return;
  }
  if (data.newHash === hashCode()) {
    return;
  }
  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) {
      return;
    }
    h[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode()) {
    return;
  }
  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }
      if (data.type === "video-offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }
      if (data.type === "video-answer") {
        await handleChatAnswerMessage(data.answer, data.name);
        return;
      }
      if (data.name && data.name !== user && !rtcConns[data.name] && !ignoreUsers.includes(data.name)) {
        await createPeerConnection(data.name);
        const users2 = data.users;
        while (users2.length) {
          await wait(2e3);
          const nextToConnect = users2.pop();
          if (nextToConnect && !sendChannel.rtcConns[nextToConnect]) {
            await createPeerConnection(nextToConnect);
          }
        }
        return;
      }
    } catch (error) {
    }
  })();
  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode()) {
      return;
    }
    await applyPatch(data);
    if (data.newHash === hashCode()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }
      return;
    }
    return;
  }
  if (data.patch && data.name === user) {
    wsLastHashCode = data.newHash;
    return;
  }
  if (data.name === user) {
    return;
  }
  if (wsLastHashCode !== hashCode()) {
  }
  function createPeerConnection(target) {
    if (rtcConns[target]) {
      return;
    }
    rtcConns[target] = new RTCPeerConnection(
      rcpOptions
    );
    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
        ws?.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON()
        }));
      }
    };
    rtcConns[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcConns[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcConns[target].onsignalingstatechange = () => {
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = function({ track, streams }) {
      tracks[target] = { track, streams };
    };
    rtcConns[target].ondatachannel = (event) => {
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      if (sendChannel && sendChannel.localStream && sendChannel.localStream.active) {
        sendChannel.localStream.getTracks().forEach((track) => {
          const datachannel = rtcConns[target];
          datachannel.addTrack(track);
          datachannel.ontrack = ({ track: track2, streams }) => tracks[target] = { track: track2, streams };
        });
      }
      rtc2.addEventListener(
        "message",
        async (message) => processWsMessage(
          message,
          "rtc",
          Object.assign(rtc2, { hashCode: hashCode() })
        )
      );
      const rtcWithTarget = Object.assign(rtc2, { target });
      webRtcArray.push(rtcWithTarget);
    };
    const dataChannelOptions = {
      ordered: true,
      reliable: true,
      maxPacketLifeTime: 3e3
    };
    const rtc = Object.assign(
      rtcConns[target].createDataChannel(
        target,
        dataChannelOptions
      ),
      { target }
    );
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });
    rtc.addEventListener("open", () => {
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      rtcConns[target].close();
      delete rtcConns[target];
    }
    async function handleNegotiationNeededEvent() {
      try {
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          return;
        }
        await rtcConns[target].setLocalDescription(offer);
        ws?.send(JSON.stringify({
          target,
          name: user,
          type: "video-offer",
          offer: rtcConns[target].localDescription
        }));
      } catch {
      }
    }
    function handleICEConnectionStateChangeEvent() {
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    function handleICEGatheringStateChangeEvent() {
    }
  }
  async function handleChatAnswerMessage(answer, target) {
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(
        answer
      )
    ).catch(console.error);
  }
  async function handleChatOffer(offer, target) {
    if (!rtcConns[target]) {
      createPeerConnection(target);
    }
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await rtcConns[target].createAnswer();
    await rtcConns[target].setLocalDescription(
      answer
    );
    ws?.send(JSON.stringify({
      target,
      name: user,
      type: "video-answer",
      answer
    }));
  }
}
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function handleNewICECandidateMessage(init2, target) {
  const candidate = new RTCIceCandidate(init2);
  await rtcConns[target].addIceCandidate(candidate);
}
async function sw() {
  try {
    navigator.serviceWorker.onmessage = async (event) => {
      const serviceWorker = event.source;
      if (serviceWorker == null) {
        return;
      }
      switch (event.data.method) {
        case "ipfs-message-port":
          const channel = new MessageChannel();
          {
            serviceWorker.postMessage({
              method: "ipfs-message-port",
              id: event.data.id,
              port: channel.port2
            }, { transfer: [channel.port2] });
          }
      }
    };
    if (document.documentElement.dataset.viewer) {
      const load = async (path) => {
        const paths = path && path.split("/") || [];
        const protocol = paths[0] || "";
        switch (protocol) {
          case "ipfs":
          case "ipns": {
            document.body.innerHTML = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
          }
        }
      };
      await load(location.pathname);
      return;
    }
  } catch {
  }
}

export {
  sendChannel,
  run,
  saveCode,
  stopVideo,
  startVideo,
  join,
  sw,
  renderPreviewWindow,
  render
};
