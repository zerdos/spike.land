import {
  transform
} from "./chunk-chunk-PHRNSAH2.mjs";
import {
  wrap
} from "./chunk-chunk-ZVRNBDGH.mjs";
import {
  LazyMotion,
  domAnimation,
  domMax,
  m,
  motion
} from "./chunk-chunk-4PNSYL62.mjs";
import "./chunk-chunk-ZUJ2BQID.mjs";
import {
  AutoUpdateApp,
  appFactory,
  render,
  renderFromString
} from "./chunk-chunk-HXN7YCZX.mjs";
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
} from "./chunk-chunk-5SOELRIC.mjs";
import "./chunk-chunk-MFQP7JEX.mjs";
import {
  css,
  jsx,
  jsxs
} from "./chunk-chunk-GGEAJ4VZ.mjs";
import {
  $2,
  Children,
  PureComponent,
  Suspense,
  _n,
  cloneElement,
  createRef,
  createRoot,
  h,
  isValidElement,
  lazy,
  p,
  useEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-BYALA4PV.mjs";
import {
  init_define_process
} from "./chunk-chunk-AXJDOV6Y.mjs";
import {
  __toESM
} from "./chunk-chunk-X6R3MEIC.mjs";

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
    return $2(Children.map(children, function(child) {
      if (!isValidElement(child))
        return child;
      return cloneElement(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = createRef();
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
    return h("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/DraggableWindow.tsx
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/md/index.esm.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/index.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconsManifest.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconBase.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconContext.js
init_define_process();
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = _n.createContext && _n.createContext(DefaultContext);

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return _n.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return _n.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return _n.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && _n.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? _n.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/0/global/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/md/index.esm.js
function MdQrCode(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" } }] })(props);
}
function MdPhoneAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" } }] })(props);
}
function MdTabletAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" } }] })(props);
}
function MdTv(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" } }] })(props);
}
function MdFullscreen(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" } }] })(props);
}
function MdShare(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" } }] })(props);
}

// js/Qr.tsx
init_define_process();

// js/icons.tsx
init_define_process();
var Wrap = ({ children }) => jsx("span", {
  css: css`
font-size:20pt;
`,
  children
});
var QrCodeIcon = () => jsx(Wrap, {
  children: jsx(MdQrCode, {})
});
var Phone = () => jsx(Wrap, {
  children: jsx(MdPhoneAndroid, {})
});
var Share = () => jsx(Wrap, {
  children: jsx(MdShare, {})
});
var Tablet = () => jsx(Wrap, {
  children: jsx(MdTabletAndroid, {})
});
var Tv = () => jsx(Wrap, {
  children: jsx(MdTv, {})
});

// js/mui.tsx
init_define_process();
var FabLazy = lazy(async () => import("./chunk-Fab-NDYBCGBS.mjs"));
var Fab = (props) => jsx(Suspense, {
  fallback: jsx("div", {
    css: css`width: 28px; height:28px`
  }),
  children: jsx(FabLazy, {
    ...props
  })
});
var ToggleButtonLazy = lazy(async () => import("./chunk-ToggleButton-DZ7KVOR6.mjs"));
var ToggleButton = (props) => jsx(Suspense, {
  fallback: jsx("div", {
    css: css`width: 28px; height:28px`
  }),
  children: jsx(ToggleButtonLazy, {
    ...props
  })
});
var ToggleButtonGroupLazy = lazy(
  async () => import("./chunk-ToggleButtonGroup-6523OSTC.mjs")
);
var ToggleButtonGroup = (props) => jsx(Suspense, {
  fallback: jsx("div", {
    css: css`width: 28px; height:28px`
  }),
  children: jsx(ToggleButtonGroupLazy, {
    ...props
  })
});

// js/Qr.tsx
var QR = ({ url }) => jsx(QRious, {
  value: { url }
});
var QRiousLazy = _n.lazy(
  () => import("./chunk-lib-N4WZG3LI.mjs").then(({ QRious: QRious2 }) => ({ default: QRious2 }))
);
var QRious = ({ value }) => jsx(Suspense, {
  fallback: jsx("p", {
    children: ".."
  }),
  children: jsx(QRiousLazy, {
    value
  })
});
var QRButton = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return jsx(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: () => {
      setQR(!showQR);
    },
    css: css`
          margin-top: 12px;
          margin-bottom: 12px;
              `,
    children: showQR ? jsx(QR, {
      url: url || "/live/coder/public"
    }, url || origin + url) : jsx(Fab, {
      children: jsx(QrCodeIcon, {})
    })
  });
};

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({
  children,
  room
}) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height2, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const videoRef = useRef(null);
  const scale = scaleRange / 100;
  useEffect(() => {
    const reveal = async () => {
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(100);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      }
      setPositions({
        bottom: 20,
        right: 20
      });
    };
    reveal();
  }, []);
  const c = window.getComputedStyle(
    document.body,
    null
  ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 3).map((x) => Number(x) || "0").join(",");
  const [bgCV, setBG] = useState(c);
  useEffect(() => {
    setInterval(() => {
      const c2 = window.getComputedStyle(
        document.body,
        null
      ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 3).map((x) => Number(x) || "0").join(",");
      if (c2 !== bgCV)
        setBG(c2);
    }, 1e3 / 2);
  }, []);
  const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));
  useEffect(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);
  return jsx(LazyMotion, {
    features: { ...domAnimation, ...domMax },
    children: jsx(m.div, {
      transition: { delay: 0, duration: 0.4 },
      initial: {
        top: 0,
        padding: 0,
        right: 0,
        borderRadius: 0
      },
      animate: {
        top: bottom,
        padding: 8,
        right,
        borderRadius: 16
      },
      css: css`
            touch-action: pinch-zoom;
            background-color: ${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `,
      drag: true,
      dragMomentum: false,
      dragConstraints: {
        left: 0,
        right: width - 20 - width / 6,
        bottom: innerHeight
      },
      dragElastic: 0.5,
      children: jsxs("div", {
        css: css` 
              display: flex;
              
                `,
        children: [
          jsxs("div", {
            css: css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
            children: [
              jsx(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: { height: 0, width: 0 },
                animate: { height: "auto", width: "auto" },
                children: jsx(ToggleButtonGroup, {
                  value: scaleRange,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newScale) => {
                    newScale && changeScaleRange(newScale);
                  },
                  children: sizes.map((size, ind) => jsx(ToggleButton, {
                    value: size,
                    children: jsxs("span", {
                      css: css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `,
                      children: [
                        size,
                        "%"
                      ]
                    })
                  }, ind))
                })
              }),
              jsx(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: 0
                },
                animate: {
                  width: width * scale / devicePixelRatio,
                  height: height2 * scale / devicePixelRatio,
                  borderRadius: 8
                },
                css: css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `,
                children: jsx(m.div, {
                  transition: { delay: 0, duration: 0.4 },
                  initial: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    background: "rgba(0,0,0, 1)",
                    scale: 1
                  },
                  animate: {
                    background: "rgba(" + bgCV + ", 0.5)",
                    transformOrigin: "0px 0px",
                    width: width / devicePixelRatio,
                    height: height2 / devicePixelRatio,
                    scale: scaleRange / 100
                  },
                  "data-test-id": "z-body",
                  css: css`
                  overflow:overlay;
                  overflow-y: hidden;
              `,
                  children
                })
              }),
              jsx(m.div, {
                transition: { delay: 0, duration: 0.4 },
                children: jsx(ToggleButtonGroup, {
                  value: width,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newSize) => {
                    if (newSize) {
                      setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                      setWidth(newSize);
                    }
                  },
                  children: breakPoints.map((size, ind) => jsx(ToggleButton, {
                    value: size,
                    children: size === 680 ? jsx("span", {
                      css: css`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: jsx(Phone, {})
                    }) : size === 768 ? jsx("span", {
                      css: css`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: jsx(Tablet, {})
                    }) : jsx("span", {
                      css: css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `,
                      children: jsx(Tv, {})
                    })
                  }, ind))
                })
              })
            ]
          }),
          jsx(m.div, {
            transition: { delay: 0, duration: 0.4 },
            initial: { height: 0, width: 0 },
            animate: { height: "100%", width: "auto" },
            children: jsxs("div", {
              css: css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
              children: [
                jsx(Fab, {
                  onClick: () => {
                    document.querySelector("#root")?.requestFullscreen();
                  },
                  children: jsx("span", {
                    css: css`
                font-size: 20pt;
              `,
                    children: jsx(MdFullscreen, {}, "fs")
                  })
                }, "fullscreen"),
                jsx(QRButton, {
                  url: location.origin + `/live/${room}/public`
                }),
                false,
                jsx(Fab, {
                  onClick: () => open(`/live/${room}/public`),
                  children: jsx(Share, {})
                }, "Share")
              ]
            })
          })
        ]
      })
    })
  });
};

// js/Editor.tsx
init_define_process();

// js/runner.tsx
init_define_process();

// js/toUmd.ts
init_define_process();
var mod = {
  printr(name) {
    const current = mod.data[mod.hashMap[name]];
    const currentCode = current.code;
    const myDepts = [...current.deps];
    const depts = myDepts.map((n) => mod.printr(n)).join(" \n ");
    return depts + `
    
    ` + currentCode;
  },
  async toJs(name) {
    const js = mod.printr(name);
    const modz = "var modz =  {" + Object.keys(mod.data).map((k) => [`"${mod.hashMap[k]}"`, k.replace(/[^a-f]/g, "")]).map((x) => x[0] + ": " + x[1]).join(", \n ") + "}";
    const res = ` 

     ${js}




    function require(name) {
      ${modz}
      
      var dep  = modz[name];

      return dep;
     }
  
     var mymod = require("${name}").default;

     export default mymod;
    
    `;
    const { transform: transform2 } = await import("./chunk-esbuildEsm-ZKZR64XF.mjs");
    const t = await transform2(res, {
      format: "esm",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    return t.code;
  },
  hashMap: {},
  data: {}
};
var toUmd = async (source, name) => {
  const { transform: transform2 } = await import("./chunk-esbuildEsm-ZKZR64XF.mjs");
  const hash = md5(source);
  mod.hashMap = { ...mod.hashMap, [hash]: name, [name]: hash };
  if (!mod.data[hash]) {
    const transformed = await transform2(source, {
      format: "iife",
      treeShaking: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          jsxImportSource: "@emotion/react"
        }
      },
      target: "es2021",
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
  let m2;
  const deps = [];
  while ((m2 = regex.exec(code)) !== null) {
    if (m2.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    for (const [groupIndex, match] of m2.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }
      console.log(`Found match, group ${groupIndex}: ${match}`);
    }
  }
  return deps;
};

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/runner.tsx
async function runner({ code, counter, codeSpace: codeSpace2 }) {
  const mst = mST();
  console.log(`${mst.i} => ${counter}`);
  if (counter <= mst.i)
    return;
  const umdExp = async () => {
    console.log("to UMD");
    const UMD = await toUmd(code, `${codeSpace2}.tsx`);
    console.log({ UMD });
    download("coder.js", await UMD?.toJs(`${codeSpace2}.tsx`));
    function download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
  Object.assign(globalThis, { umdExp });
  try {
    const transpiled = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      minify: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          module: "ESNext",
          jsxFragmentFactory: "Fragment",
          jsxImportSource: "@emotion/react"
        }
      },
      target: "es2021"
    });
    const codeHash = md5(code).slice(0, 8);
    const transpiledCode = `${transpiled.code}//${codeHash}`;
    const rendered = await render(transpiledCode, codeSpace2);
    if (!rendered)
      return;
    patchSync({ ...mST(), code, i: counter, transpiled: transpiledCode, html: rendered });
    const { html, css: css2 } = renderFromString(codeSpace2, hashCode());
    if (html && css2)
      patchSync({ ...mST(), html, css: css2 });
    else {
      await wait(100);
      const { html: html2, css: css3 } = renderFromString(codeSpace2, hashCode());
      if (html2 && css3)
        patchSync({ ...mST(), html: html2, css: css3 });
    }
    if (transpiled.code.length > 0) {
      try {
        saveCode();
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
      }
    }
  } catch (error) {
    console.error({ error });
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
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-QY74L6O7.mjs")).prettierJs;
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
var mod2 = {
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
var Editor = ({ codeSpace: codeSpace2, assets }) => {
  const ref = useRef(null);
  const { i, code } = mST();
  const [
    mySession,
    changeContent
  ] = _n.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,
    myId: "loading",
    onChange(_cb) {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod2.counter = i;
  const {
    counter,
    myCode,
    started,
    myId,
    engine,
    onChange
  } = mySession;
  mod2.code = myCode;
  const cb = async () => {
    const lastKeydownHappened = Date.now() - mod2.lastKeyDown;
    console.log({ lastKeydownHappened });
    let increment = 0;
    if (lastKeydownHappened < 1e3) {
      increment = 1;
    }
    (async () => {
      const code2 = await mod2.getValue();
      const newCode = await prettierJs(code2);
      if (newCode === myCode) {
        return;
      }
      if (newCode === mST().code) {
        return;
      }
      mod2.counter = mST().i + increment;
      changeContent((x) => ({
        ...x,
        lastKeyDown: 0,
        counter: mod2.counter,
        myCode: newCode
      }));
      runner({ code: newCode, counter: mod2.counter, codeSpace: codeSpace2 });
    })();
  };
  _n.useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.append(link);
      const { startMonaco } = await import("./chunk-startMonaco-N2K3M65V.mjs");
      const { model, getTypeScriptWorker, setValue: setMonValue } = await startMonaco(
        {
          container: ref.current,
          name: codeSpace2,
          code: mST().code
        }
      );
      const getValue = async () => {
        try {
          (async () => {
            const tsWorker = await (await getTypeScriptWorker())(
              model.uri
            );
            const diag = await tsWorker.getSemanticDiagnostics(
              location.origin + "/live/" + codeSpace2 + ".tsx"
            );
            console.log({ diag });
          })();
        } catch {
          console.error("ts diag error");
        }
        return await prettierJs(model.getValue());
      };
      const setValue = async (_code) => {
        const code2 = await prettierJs(_code);
        mod2.codeToSet = code2;
        if (code2.length < `export default ()=><></>`.length)
          return;
        if (code2 === await getValue())
          return;
        if (mST().i === mod2.counter)
          return;
        setTimeout(() => mod2.codeToSet === code2 && setMonValue(code2), 800);
      };
      mod2.getValue = getValue;
      mod2.setValue = setValue;
      changeContent({
        ...mySession,
        started: true,
        onChange: (cb2) => model.onDidChangeContent(cb2).dispose,
        myId: "editor"
      });
    };
    const setAce = async () => {
      const { startAce } = await import("./chunk-startAce-E34X4DTS.mjs");
      const editor = await startAce(mST().code);
      const getValue = async () => await prettierJs(editor.session.getValue());
      const setValue = async (_code) => {
        const code2 = await prettierJs(_code);
        mod2.codeToSet = code2;
        if (code2.length < `export default ()=><></>`.length)
          return;
        if (code2 === await getValue())
          return;
        if (mST().i === mod2.counter)
          return;
        setTimeout(() => {
          if (mod2.codeToSet === code2) {
            editor.session.setValue(code2);
          }
        }, 800);
      };
      mod2.getValue = getValue;
      mod2.setValue = setValue;
      changeContent({
        ...mySession,
        onChange(cb2) {
          editor.session.on("change", cb2);
          return () => {
            editor.session.off("change", cb2);
          };
        },
        started: true,
        myId: "editor"
      });
    };
    const loadEditors = () => engine === "monaco" ? setMonaco() : setAce();
    !started && loadEditors();
  }, [started, ref]);
  _n.useEffect(() => {
    onChange(cb);
  }, [onChange]);
  onSessionUpdate(() => {
    if (counter < mST().i) {
      changeContent({ ...mySession, counter: mST().i, myCode: mST().code });
    }
    mod2.setValue(mST().code);
  }, "editor");
  return jsx("div", {
    onKeyDown: () => mod2.lastKeyDown = Date.now(),
    "data-test-id": myId,
    id: "editor",
    css: css`
        
            max-width: 640px;
            height: 100%;
            
            
        `,
    ref
  });
};

// js/renderPreviewWindow.tsx
var RainbowContainer = ({ children }) => jsx("div", {
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
var AppToRender = ({ codeSpace: codeSpace2, assets }) => {
  const currentHash = hashCode();
  const [hash, setHash] = useState(currentHash);
  const isStandalone = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory(codeSpace2);
          setHash(newHash);
        } catch (error) {
          console.error({ e: error });
        }
      }
    }, "myApp");
  }, [hash, setHash]);
  const portalNode = useMemo(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace2}`, style: "height: 100%" }
  }), []);
  return jsxs(p, {
    children: [
      jsx(InPortal, {
        node: portalNode,
        children: jsx(AutoUpdateApp, {
          hash,
          codeSpace: codeSpace2
        })
      }),
      isStandalone ? jsx(OutPortal, {
        node: portalNode
      }) : jsx(RainbowContainer, {
        children: jsxs(p, {
          children: [
            jsx(Editor, {
              codeSpace: codeSpace2,
              assets
            }),
            jsx(DraggableWindow, {
              hashCode: 0,
              room: codeSpace2,
              children: jsx(OutPortal, {
                node: portalNode
              })
            })
          ]
        })
      })
    ]
  });
};
var singleton = { started: false };
var renderPreviewWindow = ({ codeSpace: codeSpace2, assets }) => {
  if (singleton.started)
    return;
  singleton.started = true;
  const div = document.querySelector("#root");
  const root = createRoot(div);
  root.render(
    jsx(p, {
      children: jsx(AppToRender, {
        codeSpace: codeSpace2,
        assets
      })
    })
  );
};

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
var sendChannel = {
  localStream: null,
  webRtcArray,
  user,
  rtcConns,
  send(data) {
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);
        if (ch.readyState !== "open") {
          return;
        }
        if (!data.target || ch.target === data.target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (error) {
        console.error("Error in broadcasting event", { e: error });
      }
    });
  }
};
Object.assign(globalThis, { sendChannel });
var run = async (startState) => {
  const { assets, mST: mst, address } = startState;
  codeSpace = startState.codeSpace;
  if (location.pathname.endsWith("dehydrated")) {
    return;
  }
  startSession(codeSpace, {
    name: user,
    state: mst
  }, location.origin);
  await appFactory(codeSpace, mst.transpiled);
  renderPreviewWindow({ codeSpace, assets });
  await join();
  bc = new BroadcastChannel(location.origin);
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user) {
      return;
    }
    console.log({ event });
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
      console.log({ wsLastHashCode });
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message) {
        return;
      }
      if (message.newHash !== hashCode()) {
        console.error("NEW hash is not even hashCode", hashCode());
        return;
      }
      const messageString = JSON.stringify({ ...message, name: user });
      sendWS(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (error) {
    console.error("error 2", { e: error });
  }
}
var stopVideo = async () => {
  if (!sendChannel.localStream)
    return;
  sendChannel.localStream.getTracks().map((x) => x.stop());
};
var startVideo2 = async (vidElement) => {
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
      const myStream = new MediaStream();
      sendChannel.rtcConns[k].ontrack = ({ track: track2 }) => myStream.addTrack(track2);
      document.getElementById(`video-${k}`).srcObject = myStream;
      sendChannel.rtcConns[k].addTrack(track);
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
      console.log({ wsLastHashCode });
      const message = webRTCLastSeenHashCode ? await makePatchFrom(
        webRTCLastSeenHashCode,
        sess
      ) : await makePatch(sess);
      if (message && message.patch) {
        console.log("sendRTC");
        sendChannel.send(message);
      }
    }
  } catch (error) {
    console.error("Error sending RTC...", { e: error });
  }
}
async function join() {
  if (ws !== null) {
    return ws;
  }
  rejoined = true;
  console.log("WS connect!");
  if (location.host.includes("localhost")) {
    return;
  }
  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket"
  );
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    console.log("NEW WS CONNECTION");
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
var h2 = {};
async function processWsMessage(event, source, conn) {
  if (ws == null) {
    return;
  }
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  processData(data, source, conn);
}
async function processData(data, source, conn) {
  console.log("ws", data.name, data.oldHash, data.newHash);
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
    if (h2[data.oldHash] && h2[data.oldHash] === data.newHash) {
      return;
    }
    h2[data.oldHash] = data.newHash;
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
        return;
      }
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
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
    console.log("error -sending on sendChannel");
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
    log(`Setting up a connection with ${target}`);
    if (rtcConns[target]) {
      log(`Aborting, since we have connection with this ${target}`);
      return;
    }
    rtcConns[target] = new RTCPeerConnection(
      rcpOptions
    );
    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
        log("*** Outgoing ICE candidate: " + event.candidate);
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
      log(
        "*** rtcConns[target].signalingState  changed to: " + rtcConns[target].signalingState
      );
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = (ev) => {
      console.log(ev);
    };
    rtcConns[target].ondatachannel = (event) => {
      console.log("Receive Channel Callback");
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
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
      console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
      console.log("xxxxxxxx- The Data Channel is Closed");
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      console.log("Receive channel is closed");
      rtcConns[target].close();
      delete rtcConns[target];
      console.log("Closed remote peer connection");
    }
    async function handleNegotiationNeededEvent() {
      log("*** Negotiation needed");
      try {
        log("---> Creating offer");
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          log("The connection isn't stable yet; postponing...");
          return;
        }
        log("---> Setting local description to the offer");
        await rtcConns[target].setLocalDescription(offer);
        log("---> Sending the offer to the remote peer");
        ws?.send(JSON.stringify({
          target,
          name: user,
          type: "video-offer",
          offer: rtcConns[target].localDescription
        }));
      } catch {
        log(
          "*** The following error occurred while handling the negotiationneeded event:"
        );
      }
    }
    function handleICEConnectionStateChangeEvent() {
      log(
        "*** ICE connection state changed to " + rtcConns[target].iceConnectionState
      );
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    function handleICEGatheringStateChangeEvent() {
      log(
        "*** rtcConns[target].iceGatheringState changed to: " + rtcConns[target].iceGatheringState
      );
    }
  }
  async function handleChatAnswerMessage(answer, target) {
    log("*** Call recipient has accepted our call");
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
    log("---> Creating and sending answer to caller");
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
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
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
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(init2)
  );
  const candidate = new RTCIceCandidate(init2);
  console.log(rtcConns[target]);
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
          console.log("Message port request");
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
    console.log("ipfs load error");
  }
}
export {
  join,
  run,
  saveCode,
  sendChannel,
  startVideo2 as startVideo,
  stopVideo,
  sw
};
