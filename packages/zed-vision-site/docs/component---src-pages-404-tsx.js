(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[8],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "pageQuery", function() { return /* binding */ pageQuery; });

// EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(16);

// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/styled-base/dist/styled-base.browser.esm.js
var styled_base_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: /z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./src/components/layout.tsx + 1 modules
var layout = __webpack_require__(18);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(15);

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
// EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/core/dist/core.browser.esm.js + 2 modules
var core_browser_esm = __webpack_require__(1);

// CONCATENATED MODULE: ./src/pages/404.tsx



function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







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
  return Object(core_browser_esm["b" /* jsx */])(layout["a" /* Layout */], null, Object(core_browser_esm["b" /* jsx */])(seo["a" /* SEO */], {
    title: "404: Not Found"
  }), Object(core_browser_esm["b" /* jsx */])("h1", null, "Not Found"), Object(core_browser_esm["b" /* jsx */])(Rotated, {
    key: res.toString()
  }, Object(core_browser_esm["b" /* jsx */])(ReqPrint, {
    node: root,
    topLevel: 0,
    left: 0,
    level: 0
  })), Object(core_browser_esm["b" /* jsx */])("p", null, "You just hit a route that not exist... the sadness."));
};

/* harmony default export */ var _404 = __webpack_exports__["default"] = (_404_NotFoundPage);
var pageQuery = "3159585216";

/***/ })

}]);