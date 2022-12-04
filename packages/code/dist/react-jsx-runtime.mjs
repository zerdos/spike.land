import {
  run
} from "./chunk-chunk-JDIMLRES.mjs";
import "./chunk-chunk-ERFM3H56.mjs";
import "./chunk-chunk-ZZWIKWD4.mjs";
import "./chunk-chunk-NBK6NTLB.mjs";
import "./chunk-chunk-TIL35SAU.mjs";
import "./chunk-chunk-RNJNNLQS.mjs";
import "./chunk-chunk-NFYMKIWC.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-OH444ZSQ.mjs";
import "./chunk-chunk-ZL6L5B7C.mjs";
import "./chunk-chunk-JQLFMSSW.mjs";
import "./chunk-chunk-FFMS35Y7.mjs";
import "./chunk-chunk-M3XF32XQ.mjs";
import "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/react-jsx-runtime.tsx
init_define_process();

// js/worker-dom/dist/debug/worker/worker.mjs
init_define_process();
var WorkerThread = function(exports) {
  "use strict";
  const toLower = /* @__PURE__ */ __name((value) => value.toLowerCase(), "toLower");
  const toUpper = /* @__PURE__ */ __name((value) => value.toUpperCase(), "toUpper");
  const containsIndexOf = /* @__PURE__ */ __name((pos) => pos !== -1, "containsIndexOf");
  const keyValueString = /* @__PURE__ */ __name((key, value) => `${key}="${value}"`, "keyValueString");
  const tagNameConditionPredicate = /* @__PURE__ */ __name((tagNames) => (element) => {
    return tagNames.includes(element.tagName);
  }, "tagNameConditionPredicate");
  const elementPredicate = /* @__PURE__ */ __name((node) => node.nodeType === 1, "elementPredicate");
  const matchChildrenElements = /* @__PURE__ */ __name((node, conditionPredicate) => {
    const matchingElements = [];
    node.childNodes.forEach((child) => {
      if (elementPredicate(child)) {
        if (conditionPredicate(child)) {
          matchingElements.push(child);
        }
        matchingElements.push(
          ...matchChildrenElements(child, conditionPredicate)
        );
      }
    });
    return matchingElements;
  }, "matchChildrenElements");
  const matchChildElement = /* @__PURE__ */ __name((element, conditionPredicate) => {
    let returnValue = null;
    element.children.some((child) => {
      if (conditionPredicate(child)) {
        returnValue = child;
        return true;
      }
      const grandChildMatch = matchChildElement(child, conditionPredicate);
      if (grandChildMatch !== null) {
        returnValue = grandChildMatch;
        return true;
      }
      return false;
    });
    return returnValue;
  }, "matchChildElement");
  const matchNearestParent = /* @__PURE__ */ __name((element, conditionPredicate) => {
    while (element = element.parentNode) {
      if (conditionPredicate(element)) {
        return element;
      }
    }
    return null;
  }, "matchNearestParent");
  const matchAttrReference = /* @__PURE__ */ __name((attrSelector, element) => {
    if (!attrSelector) {
      return false;
    }
    const equalPos = attrSelector.indexOf("=");
    const selectorLength = attrSelector.length;
    const caseInsensitive = attrSelector.charAt(selectorLength - 2) === "i";
    const endPos = caseInsensitive ? selectorLength - 3 : selectorLength - 1;
    if (equalPos !== -1) {
      const equalSuffix = attrSelector.charAt(equalPos - 1);
      const possibleSuffixes = ["~", "|", "$", "^", "*"];
      const attrString = possibleSuffixes.includes(equalSuffix) ? attrSelector.substring(1, equalPos - 1) : attrSelector.substring(1, equalPos);
      const rawValue = attrSelector.substring(equalPos + 1, endPos);
      const rawAttrValue = element.getAttribute(attrString);
      if (rawAttrValue) {
        const casedValue = caseInsensitive ? toLower(rawValue) : rawValue;
        const casedAttrValue = caseInsensitive ? toLower(rawAttrValue) : rawAttrValue;
        switch (equalSuffix) {
          case "~":
            return casedAttrValue.split(" ").indexOf(casedValue) !== -1;
          case "|":
            return casedAttrValue === casedValue || casedAttrValue === `${casedValue}-`;
          case "^":
            return casedAttrValue.startsWith(casedValue);
          case "$":
            return casedAttrValue.endsWith(casedValue);
          case "*":
            return casedAttrValue.indexOf(casedValue) !== -1;
          default:
            return casedAttrValue === casedValue;
        }
      }
      return false;
    } else {
      return element.hasAttribute(attrSelector.substring(1, endPos));
    }
  }, "matchAttrReference");
  let phase = 0;
  const set = /* @__PURE__ */ __name((newPhase) => phase = newPhase, "set");
  let count$1 = 0;
  let transfer$2 = [];
  const mapping$1 = /* @__PURE__ */ new Map();
  function storeOverride(node, override) {
    if (phase === 0) {
      mapping$1.set(node[7] = override, node);
      count$1 = Math.max(count$1, override);
    }
    return override;
  }
  __name(storeOverride, "storeOverride");
  function store$1(node) {
    if (node[7] !== void 0) {
      return node[7];
    }
    mapping$1.set(node[7] = ++count$1, node);
    if (phase > 0) {
      transfer$2.push(node);
    }
    return count$1;
  }
  __name(store$1, "store$1");
  function get(index) {
    return !!index && mapping$1.get(index) || null;
  }
  __name(get, "get");
  function consume$1() {
    const copy = transfer$2;
    transfer$2 = [];
    return copy;
  }
  __name(consume$1, "consume$1");
  let count = 0;
  let transfer$1 = [];
  const mapping = /* @__PURE__ */ new Map();
  function store(value) {
    if (mapping.has(value)) {
      return mapping.get(value);
    }
    mapping.set(value, count);
    transfer$1.push(value);
    return count++;
  }
  __name(store, "store");
  function consume() {
    const strings = transfer$1;
    transfer$1 = [];
    return strings;
  }
  __name(consume, "consume");
  let pending = false;
  let pendingMutations$1 = [];
  function transfer(document2, mutation) {
    if (phase > 0 && document2[58]) {
      pending = true;
      pendingMutations$1 = pendingMutations$1.concat(mutation);
      Promise.resolve().then((_) => {
        if (pending) {
          const nodes = new Uint16Array(
            consume$1().reduce(
              (acc, node) => acc.concat(node[8]),
              []
            )
          ).buffer;
          const mutations = new Uint16Array(pendingMutations$1).buffer;
          document2.postMessage({
            [54]: phase,
            [12]: phase === 2 ? 3 : 2,
            [37]: nodes,
            [41]: consume(),
            [36]: mutations
          }, [nodes, mutations]);
          pendingMutations$1 = [];
          pending = false;
          set(2);
        }
      });
    }
  }
  __name(transfer, "transfer");
  const observers = [];
  let pendingMutations = false;
  const matchesIndex = /* @__PURE__ */ __name((observerTarget, target) => {
    return !!observerTarget && observerTarget[7] === target[7];
  }, "matchesIndex");
  const pushMutation = /* @__PURE__ */ __name((observer, record) => {
    observer.pushRecord(record);
    if (!pendingMutations) {
      pendingMutations = true;
      Promise.resolve().then(() => {
        pendingMutations = false;
        observers.forEach(
          (observer2) => observer2.callback(observer2.takeRecords())
        );
      });
    }
  }, "pushMutation");
  function mutate(document2, record, transferable) {
    transfer(document2, transferable);
    observers.forEach((observer) => {
      for (let t = record.target; t; t = t.parentNode) {
        if (matchesIndex(observer.target, t)) {
          pushMutation(observer, record);
          break;
        }
      }
    });
  }
  __name(mutate, "mutate");
  class MutationObserver {
    constructor(callback) {
      this.callback = void 0;
      this[42] = [];
      this.target = void 0;
      this.options = void 0;
      this.callback = callback;
    }
    observe(target, options) {
      this.disconnect();
      this.target = target;
      this.options = options || {};
      observers.push(this);
    }
    disconnect() {
      this.target = null;
      const index = observers.indexOf(this);
      if (index >= 0) {
        observers.splice(index, 1);
      }
    }
    takeRecords() {
      const records = this[42];
      return records.splice(0, records.length);
    }
    pushRecord(record) {
      this[42].push(record);
    }
  }
  __name(MutationObserver, "MutationObserver");
  const propagate$3 = /* @__PURE__ */ __name((node, property, value) => {
    node[property] = value;
    node.childNodes.forEach((child) => propagate$3(child, property, value));
  }, "propagate$3");
  class Node {
    constructor(nodeType, nodeName, ownerDocument, overrideIndex) {
      this.ownerDocument = void 0;
      this[45] = void 0;
      this.nodeType = void 0;
      this.nodeName = void 0;
      this.childNodes = [];
      this.parentNode = null;
      this.isConnected = false;
      this[7] = void 0;
      this[9] = void 0;
      this[8] = void 0;
      this[10] = {};
      this.nodeType = nodeType;
      this.nodeName = nodeName;
      this.ownerDocument = ownerDocument || this;
      this[45] = this;
      this[7] = overrideIndex ? storeOverride(this, overrideIndex) : store$1(this);
      this[9] = [this[7]];
    }
    get textContent() {
      return this.getTextContent();
    }
    getTextContent() {
      let textContent = "";
      const childNodes = this.childNodes;
      if (childNodes.length) {
        childNodes.forEach((childNode) => textContent += childNode.textContent);
        return textContent;
      }
      return "";
    }
    get firstChild() {
      return this.childNodes[0] || null;
    }
    get lastChild() {
      return this.childNodes[this.childNodes.length - 1] || null;
    }
    get nextSibling() {
      if (this.parentNode === null) {
        return null;
      }
      const parentChildNodes = this.parentNode.childNodes;
      return parentChildNodes[parentChildNodes.indexOf(this) + 1] || null;
    }
    get previousSibling() {
      if (this.parentNode === null) {
        return null;
      }
      const parentChildNodes = this.parentNode.childNodes;
      return parentChildNodes[parentChildNodes.indexOf(this) - 1] || null;
    }
    hasChildNodes() {
      return this.childNodes.length > 0;
    }
    contains(otherNode) {
      if (otherNode === this) {
        return true;
      }
      if (this.childNodes.length > 0) {
        if (this.childNodes.includes(this)) {
          return true;
        }
        return this.childNodes.some((child) => child.contains(otherNode));
      }
      return false;
    }
    insertBefore(child, referenceNode) {
      if (child === null || child === this) {
        return child;
      }
      if (child.nodeType === 11) {
        child.childNodes.slice().forEach(
          (node) => this.insertBefore(node, referenceNode)
        );
      } else if (referenceNode == null) {
        return this.appendChild(child);
      } else if (this.childNodes.indexOf(referenceNode) >= 0) {
        child.remove();
        this.childNodes.splice(
          this.childNodes.indexOf(referenceNode),
          0,
          child
        );
        this[56](child);
        mutate(this.ownerDocument, {
          addedNodes: [child],
          nextSibling: referenceNode,
          type: 2,
          target: this
        }, [
          2,
          this[7],
          referenceNode[7],
          0,
          1,
          0,
          child[7]
        ]);
        return child;
      }
      return null;
    }
    [56](child) {
      child.parentNode = this;
      propagate$3(child, "isConnected", this.isConnected);
      propagate$3(child, 45, this[45]);
    }
    [57](child) {
      child.parentNode = null;
      propagate$3(child, "isConnected", false);
      propagate$3(child, 45, child);
    }
    appendChild(child) {
      if (child.nodeType === 11) {
        child.childNodes.slice().forEach(this.appendChild, this);
      } else {
        child.remove();
        this.childNodes.push(child);
        this[56](child);
        const previousSibling = this.childNodes[this.childNodes.length - 2];
        mutate(this.ownerDocument, {
          addedNodes: [child],
          previousSibling,
          type: 2,
          target: this
        }, [
          2,
          this[7],
          0,
          previousSibling ? previousSibling[7] : 0,
          1,
          0,
          child[7]
        ]);
      }
      return child;
    }
    removeChild(child) {
      const index = this.childNodes.indexOf(child);
      const exists = index >= 0;
      if (exists) {
        this.childNodes.splice(index, 1);
        this[57](child);
        mutate(this.ownerDocument, {
          removedNodes: [child],
          type: 2,
          target: this
        }, [
          2,
          this[7],
          0,
          0,
          0,
          1,
          child[7]
        ]);
        return child;
      }
      return null;
    }
    replaceChild(newChild, oldChild) {
      if (newChild === oldChild || oldChild.parentNode !== this || newChild.contains(this)) {
        return oldChild;
      }
      newChild.remove();
      const index = this.childNodes.indexOf(oldChild);
      this.childNodes.splice(index, 1, newChild);
      this[57](oldChild);
      this[56](newChild);
      mutate(this.ownerDocument, {
        addedNodes: [newChild],
        removedNodes: [oldChild],
        type: 2,
        nextSibling: this.childNodes[index + 1],
        target: this
      }, [
        2,
        this[7],
        this.childNodes[index + 1] ? this.childNodes[index + 1][7] : 0,
        0,
        1,
        1,
        newChild[7],
        oldChild[7]
      ]);
      return oldChild;
    }
    replaceWith(...nodes) {
      const parent = this.parentNode;
      let nodeIterator = nodes.length;
      let currentNode;
      if (!parent) {
        return;
      }
      if (!nodeIterator) {
        parent.removeChild(this);
      }
      while (nodeIterator--) {
        currentNode = nodes[nodeIterator];
        if (typeof currentNode !== "object") {
          currentNode = this.ownerDocument.createTextNode(currentNode);
        }
        if (!nodeIterator) {
          parent.replaceChild(currentNode, this);
        } else {
          parent.insertBefore(currentNode, this.nextSibling);
        }
      }
    }
    remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
    addEventListener(type, handler, options = {}) {
      const lowerType = toLower(type);
      const storedType = store(lowerType);
      const handlers = this[10][lowerType];
      let index = 0;
      if (handlers) {
        index = handlers.push(handler);
      } else {
        this[10][lowerType] = [handler];
      }
      transfer(this.ownerDocument, [
        4,
        this[7],
        0,
        1,
        storedType,
        index,
        Number(Boolean(options.capture)),
        Number(Boolean(options.once)),
        Number(Boolean(options.passive)),
        Number(Boolean(options.workerDOMPreventDefault))
      ]);
    }
    removeEventListener(type, handler) {
      const lowerType = toLower(type);
      const handlers = this[10][lowerType];
      const index = !!handlers ? handlers.indexOf(handler) : -1;
      if (index >= 0) {
        handlers.splice(index, 1);
        transfer(this.ownerDocument, [
          4,
          this[7],
          1,
          0,
          store(lowerType),
          index
        ]);
      }
    }
    dispatchEvent(event) {
      let target = event.currentTarget = this;
      let handlers;
      let iterator;
      do {
        handlers = target && target[10] && target[10][toLower(event.type)];
        if (handlers) {
          for (iterator = handlers.length; iterator--; ) {
            if ((handlers[iterator].call(target, event) === false || event[51]) && event.cancelable) {
              break;
            }
          }
        }
      } while (event.bubbles && !(event.cancelable && event[50]) && (target = target && target.parentNode));
      return !event.defaultPrevented;
    }
  }
  __name(Node, "Node");
  class ParentNode extends Node {
    get children() {
      return this.childNodes.filter(elementPredicate);
    }
    get childElementCount() {
      return this.children.length;
    }
    get firstElementChild() {
      return this.childNodes.find(elementPredicate) || null;
    }
    get lastElementChild() {
      const children = this.children;
      return children[children.length - 1] || null;
    }
    querySelector(selector) {
      const matches = querySelectorAll(this, selector);
      return matches ? matches[0] : null;
    }
    querySelectorAll(selector) {
      return querySelectorAll(this, selector);
    }
  }
  __name(ParentNode, "ParentNode");
  function querySelectorAll(node, selector) {
    const selectorBracketIndexes = [
      selector.indexOf("["),
      selector.indexOf("]")
    ];
    const selectorHasAttr = containsIndexOf(selectorBracketIndexes[0]) && containsIndexOf(selectorBracketIndexes[1]);
    const elementSelector = selectorHasAttr ? selector.substring(0, selectorBracketIndexes[0]) : selector;
    const attrSelector = selectorHasAttr ? selector.substring(
      selectorBracketIndexes[0],
      selectorBracketIndexes[1] + 1
    ) : null;
    let matcher;
    if (selector[0] === "[") {
      matcher = /* @__PURE__ */ __name((element) => matchAttrReference(selector, element), "matcher");
    } else if (elementSelector[0] === "#") {
      matcher = selectorHasAttr ? (element) => element.id === elementSelector.substr(1) && matchAttrReference(attrSelector, element) : (element) => element.id === elementSelector.substr(1);
    } else if (elementSelector[0] === ".") {
      matcher = selectorHasAttr ? (element) => element.classList.contains(elementSelector.substr(1)) && matchAttrReference(attrSelector, element) : (element) => element.classList.contains(elementSelector.substr(1));
    } else {
      matcher = selectorHasAttr ? (element) => element.localName === toLower(elementSelector) && matchAttrReference(attrSelector, element) : (element) => element.localName === toLower(elementSelector);
    }
    return matcher ? matchChildrenElements(node[45], matcher).filter(
      (element) => node !== element && node.contains(element)
    ) : [];
  }
  __name(querySelectorAll, "querySelectorAll");
  const WHITESPACE_REGEX = /\s/;
  function synchronizedAccessor(defineOn, accessorKey, propertyName) {
    Object.defineProperty(defineOn.prototype, propertyName, {
      enumerable: true,
      configurable: true,
      get() {
        return this[accessorKey].value;
      },
      set(value) {
        this[accessorKey].value = value;
      }
    });
  }
  __name(synchronizedAccessor, "synchronizedAccessor");
  class DOMTokenList {
    constructor(target, attributeName) {
      this[43] = [];
      this[13] = void 0;
      this[18] = void 0;
      this[44] = void 0;
      this[13] = target;
      this[18] = attributeName;
      this[44] = target[44].bind(
        target
      );
    }
    get value() {
      return this[43].join(" ");
    }
    get length() {
      return this[43].length;
    }
    set value(collection) {
      const oldValue = this.value;
      const newValue = collection.trim();
      this[43].splice(
        0,
        this[43].length,
        ...newValue !== "" ? newValue.split(/\s+/) : ""
      );
      this[67](oldValue, newValue);
    }
    item(index) {
      return this[43][index];
    }
    contains(token) {
      return this[43].includes(token);
    }
    add(...tokens) {
      const oldValue = this.value;
      this[43].splice(
        0,
        this[43].length,
        ...Array.from(new Set(this[43].concat(tokens)))
      );
      this[67](oldValue, this.value);
    }
    remove(...tokens) {
      const oldValue = this.value;
      this[43].splice(
        0,
        this[43].length,
        ...Array.from(
          new Set(
            this[43].filter((token) => !tokens.includes(token))
          )
        )
      );
      this[67](oldValue, this.value);
    }
    replace(token, newToken) {
      if (!this[43].includes(token)) {
        return;
      }
      const oldValue = this.value;
      const set2 = new Set(this[43]);
      if (token !== newToken) {
        set2.delete(token);
        if (newToken !== "") {
          set2.add(newToken);
        }
      }
      this[43].splice(
        0,
        this[43].length,
        ...Array.from(set2)
      );
      this[67](oldValue, this.value);
    }
    toggle(token, force) {
      if (WHITESPACE_REGEX.test(token)) {
        throw new TypeError("Uncaught DOMException");
      }
      if (!this[43].includes(token)) {
        if (force === void 0 || !!force) {
          this.add(token);
        }
        return true;
      } else if (!force) {
        this.remove(token);
        return false;
      }
      return true;
    }
    [67](oldValue, value) {
      this[44](
        this[13].namespaceURI,
        this[18],
        value
      );
      mutate(this[13].ownerDocument, {
        type: 0,
        target: this[13],
        attributeName: this[18],
        value,
        oldValue
      }, [
        0,
        this[13][7],
        store(this[18]),
        0,
        value !== null ? store(value) + 1 : 0
      ]);
    }
  }
  __name(DOMTokenList, "DOMTokenList");
  const toString = /* @__PURE__ */ __name((attributes) => attributes.map((attr) => keyValueString(attr.name, attr.value)).join(" "), "toString");
  const matchPredicate = /* @__PURE__ */ __name((namespaceURI, name) => (attr) => attr.namespaceURI === namespaceURI && attr.name === name, "matchPredicate");
  const hyphenateKey = /* @__PURE__ */ __name((key) => toLower(
    key.replace(/(webkit|ms|moz|khtml)/g, "-$1").replace(
      /([a-zA-Z])(?=[A-Z])/g,
      "$1-"
    )
  ), "hyphenateKey");
  const appendKeys = /* @__PURE__ */ __name((keys) => {
    const keysToAppend = keys.filter(
      (key) => isNaN(key) && !CSSStyleDeclaration.prototype.hasOwnProperty(key)
    );
    if (keysToAppend.length <= 0) {
      return;
    }
    const previousPrototypeLength = CSSStyleDeclaration.prototype.length || 0;
    if (previousPrototypeLength !== 0) {
      CSSStyleDeclaration.prototype.length = previousPrototypeLength + keysToAppend.length;
    } else {
      Object.defineProperty(CSSStyleDeclaration.prototype, "length", {
        configurable: true,
        writable: true,
        value: keysToAppend.length
      });
    }
    keysToAppend.forEach((key, index) => {
      const hyphenatedKey = hyphenateKey(key);
      CSSStyleDeclaration.prototype[index + previousPrototypeLength] = hyphenatedKey;
      Object.defineProperties(CSSStyleDeclaration.prototype, {
        [key]: {
          get() {
            return this.getPropertyValue(hyphenatedKey);
          },
          set(value) {
            this.setProperty(hyphenatedKey, value);
          }
        }
      });
    });
  }, "appendKeys");
  class CSSStyleDeclaration {
    constructor(target) {
      this[3] = {};
      this[44] = void 0;
      this[13] = void 0;
      this[44] = target[44].bind(
        target
      );
      this[13] = target;
    }
    getPropertyValue(key) {
      return this[3][key] || "";
    }
    removeProperty(key) {
      const oldValue = this.getPropertyValue(key);
      this[3][key] = null;
      this.mutated(this.cssText);
      return oldValue;
    }
    setProperty(key, value) {
      this[3][key] = value;
      this.mutated(this.cssText);
    }
    get cssText() {
      let value;
      let returnValue = "";
      for (const key in this[3]) {
        if ((value = this.getPropertyValue(key)) !== "") {
          returnValue += `${key}: ${value}; `;
        }
      }
      return returnValue.trim();
    }
    set cssText(value) {
      const stringValue = typeof value === "string" ? value : "";
      this[3] = {};
      const values = stringValue.split(/[:;]/);
      const length = values.length;
      for (let index = 0; index + 1 < length; index += 2) {
        this[3][toLower(values[index].trim())] = values[index + 1].trim();
      }
      this.mutated(this.cssText);
    }
    mutated(value) {
      const oldValue = this[44](
        this[13].namespaceURI,
        "style",
        value
      );
      mutate(this[13].ownerDocument, {
        type: 0,
        target: this[13],
        attributeName: "style",
        value,
        oldValue
      }, [
        0,
        this[13][7],
        store("style"),
        0,
        value !== null ? store(value) + 1 : 0
      ]);
    }
  }
  __name(CSSStyleDeclaration, "CSSStyleDeclaration");
  const reflectProperties = /* @__PURE__ */ __name((properties, defineOn) => {
    properties.forEach((pair) => {
      for (const property in pair) {
        const {
          0: defaultValue,
          1: attributeName = toLower(property),
          2: keywords
        } = pair[property];
        const isBooleanAttribute = typeof defaultValue === "boolean";
        Object.defineProperty(defineOn.prototype, property, {
          enumerable: true,
          get() {
            const element = this;
            const attributeValue = element.getAttribute(attributeName);
            if (keywords) {
              return element.hasAttribute(attributeName) ? attributeValue === keywords[0] : defaultValue;
            }
            if (isBooleanAttribute) {
              return element.hasAttribute(attributeName);
            }
            const castableValue = attributeValue || defaultValue;
            return typeof defaultValue === "number" ? Number(castableValue) : String(castableValue);
          },
          set(value) {
            const element = this;
            if (keywords) {
              element.setAttribute(
                attributeName,
                value ? keywords[0] : keywords[1]
              );
            } else if (isBooleanAttribute) {
              value ? element.setAttribute(attributeName, "") : element.removeAttribute(attributeName);
            } else {
              element.setAttribute(attributeName, String(value));
            }
          }
        });
      }
    });
  }, "reflectProperties");
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  function arr_back(arr) {
    return arr[arr.length - 1];
  }
  __name(arr_back, "arr_back");
  const kMarkupPattern = /<!--([^]*)-->|<(\/?)([a-z][-.0-9_a-z]*)([^>]*?)(\/?)>/gi;
  const kAttributePattern = /(^|\s)([^\s"'>\/=]+)\s*=\s*("([^"]+)"|'([^']+)'|(\S+))/gi;
  const kSelfClosingElements = {
    AREA: true,
    BASE: true,
    BR: true,
    COL: true,
    HR: true,
    IMG: true,
    INPUT: true,
    LINK: true,
    META: true,
    PARAM: true,
    SOURCE: true,
    TRACK: true,
    WBR: true
  };
  const kElementsClosedByOpening = {
    LI: {
      LI: true
    },
    DT: {
      DT: true,
      DD: true
    },
    DD: {
      DD: true,
      DT: true
    },
    P: {
      ADDRESS: true,
      ARTICLE: true,
      ASIDE: true,
      BLOCKQUOTE: true,
      DETAILS: true,
      DIV: true,
      DL: true,
      FIELDSET: true,
      FIGCAPTION: true,
      FIGURE: true,
      FOOTER: true,
      FORM: true,
      H1: true,
      H2: true,
      H3: true,
      H4: true,
      H5: true,
      H6: true,
      HEADER: true,
      HR: true,
      MAIN: true,
      NAV: true,
      OL: true,
      P: true,
      PRE: true,
      SECTION: true,
      TABLE: true,
      UL: true
    },
    RT: {
      RT: true,
      RP: true
    },
    RP: {
      RT: true,
      RP: true
    },
    OPTGROUP: {
      OPTGROUP: true
    },
    OPTION: {
      OPTION: true,
      OPTGROUP: true
    },
    THEAD: {
      TBODY: true,
      TFOOT: true
    },
    TBODY: {
      TBODY: true,
      TFOOT: true
    },
    TR: {
      TR: true
    },
    TD: {
      TD: true,
      TH: true
    },
    TH: {
      TD: true,
      TH: true
    }
  };
  const kElementsClosedByClosing = {
    LI: {
      UL: true,
      OL: true
    },
    A: {
      DIV: true
    },
    B: {
      DIV: true
    },
    I: {
      DIV: true
    },
    P: {
      DIV: true
    },
    TD: {
      TR: true,
      TABLE: true
    },
    TH: {
      TR: true,
      TABLE: true
    }
  };
  const kBlockTextElements = {
    SCRIPT: true,
    NOSCRIPT: true,
    STYLE: true,
    PRE: true
  };
  function parse(data, rootElement) {
    const ownerDocument = rootElement.ownerDocument;
    const root = ownerDocument.createElementNS(
      rootElement.namespaceURI,
      rootElement.localName
    );
    let currentParent = root;
    let currentNamespace = root.namespaceURI;
    const stack = [root];
    let lastTextPos = 0;
    let match;
    data = "<q>" + data + "</q>";
    const tagsClosed = [];
    if (currentNamespace !== SVG_NAMESPACE && currentNamespace !== HTML_NAMESPACE) {
      throw new Error("Namespace not supported: " + currentNamespace);
    }
    while (match = kMarkupPattern.exec(data)) {
      const commentContents = match[1];
      const beginningSlash = match[2];
      const tagName = match[3];
      const matchAttributes = match[4];
      const endSlash = match[5];
      if (lastTextPos < match.index) {
        const text = data.slice(lastTextPos, match.index);
        currentParent.appendChild(
          ownerDocument.createTextNode(decodeEntities(text))
        );
      }
      lastTextPos = kMarkupPattern.lastIndex;
      if (commentContents !== void 0) {
        currentParent.appendChild(ownerDocument.createComment(commentContents));
        continue;
      }
      const normalizedTagName = toUpper(tagName);
      if (normalizedTagName === "SVG") {
        currentNamespace = beginningSlash ? HTML_NAMESPACE : SVG_NAMESPACE;
      }
      if (!beginningSlash) {
        if (!endSlash && kElementsClosedByOpening[currentParent.tagName]) {
          if (kElementsClosedByOpening[currentParent.tagName][normalizedTagName]) {
            stack.pop();
            currentParent = arr_back(stack);
          }
        }
        const childToAppend = ownerDocument.createElementNS(
          currentNamespace,
          currentNamespace === HTML_NAMESPACE ? toLower(tagName) : tagName
        );
        for (let attMatch; attMatch = kAttributePattern.exec(matchAttributes); ) {
          const attrName = attMatch[2];
          const attrValue = attMatch[4] || attMatch[5] || attMatch[6];
          childToAppend.setAttribute(attrName, attrValue);
        }
        currentParent = currentParent.appendChild(childToAppend);
        stack.push(currentParent);
        if (kBlockTextElements[normalizedTagName]) {
          const closeMarkup = "</" + toLower(normalizedTagName) + ">";
          const index = data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
          if (index == -1) {
            throw new Error("Close markup not found.");
          } else {
            kMarkupPattern.lastIndex = index;
          }
        }
      }
      if (tagName === "foreignObject") {
        currentNamespace = beginningSlash ? SVG_NAMESPACE : HTML_NAMESPACE;
      }
      if (beginningSlash || endSlash || kSelfClosingElements[normalizedTagName]) {
        while (true) {
          if (stack.length <= 1) {
            break;
          }
          if (toUpper(currentParent.nodeName) == normalizedTagName) {
            stack.pop();
            currentParent = arr_back(stack);
            break;
          } else {
            if (kElementsClosedByClosing[currentParent.tagName]) {
              if (kElementsClosedByClosing[currentParent.tagName][normalizedTagName]) {
                stack.pop();
                currentParent = arr_back(stack);
                continue;
              }
            }
            break;
          }
        }
      }
    }
    for (const node of stack) {
      if (tagsClosed[tagsClosed.length - 1] == node.nodeName) {
        stack.pop();
        tagsClosed.pop();
        currentParent = arr_back(stack);
      } else
        break;
    }
    const valid = stack.length === 1;
    if (!valid) {
      throw new Error("Attempting to parse invalid HTML content.");
    }
    const wrapper = root.firstChild;
    if (wrapper) {
      wrapper.parentNode = null;
      wrapper.childNodes.forEach((node) => {
        node.parentNode = null;
      });
      return wrapper;
    }
    throw new Error("Attempting to parse invalid HTML.");
  }
  __name(parse, "parse");
  const RESERVED_CHARACTERS = {
    __proto__: null,
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  };
  function decodeEntities(html) {
    return html.replace(
      /&(?:(#x?[\da-f]+)|([\w]+));?/gi,
      function(s, numericEntity, namedEntity) {
        if (numericEntity) {
          let code = numericEntity.charAt(1).toLowerCase() === "x" ? parseInt(numericEntity.substr(2), 16) : parseInt(numericEntity.substr(1), 10);
          if (isNaN(code) || code > 1114111) {
            return s;
          }
          return String.fromCodePoint(code) || s;
        }
        if (namedEntity) {
          return RESERVED_CHARACTERS[namedEntity.toLowerCase()] || s;
        }
        return s;
      }
    );
  }
  __name(decodeEntities, "decodeEntities");
  class Event$1 {
    constructor(type, opts) {
      this.bubbles = void 0;
      this.cancelable = void 0;
      this.cancelBubble = void 0;
      this.currentTarget = void 0;
      this.defaultPrevented = void 0;
      this.eventPhase = void 0;
      this.isTrusted = void 0;
      this.returnValue = void 0;
      this.target = void 0;
      this.timeStamp = void 0;
      this.type = void 0;
      this.scoped = void 0;
      this[50] = false;
      this[51] = false;
      this.pageX = void 0;
      this.pageY = void 0;
      this.offsetX = void 0;
      this.offsetY = void 0;
      this.touches = void 0;
      this.changedTouches = void 0;
      this.type = type;
      this.bubbles = !!opts.bubbles;
      this.cancelable = !!opts.cancelable;
    }
    stopPropagation() {
      this[50] = true;
    }
    stopImmediatePropagation() {
      this[51] = this[50] = true;
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
    initEvent(type, bubbles, cancelable) {
      this.type = type;
      this.bubbles = bubbles;
      this.cancelable = cancelable;
    }
  }
  __name(Event$1, "Event$1");
  const targetFromTransfer = /* @__PURE__ */ __name((document2, event) => {
    if (event[13] !== null) {
      const index = event[13][0];
      return get(index !== 0 ? index : document2[7]);
    }
    return null;
  }, "targetFromTransfer");
  const touchListFromTransfer = /* @__PURE__ */ __name((document2, event, key) => {
    if (event[key] !== void 0) {
      const touchListKeys = Object.keys(event[key]);
      const list = {
        length: touchListKeys.length,
        item(index) {
          return this[index] || null;
        }
      };
      touchListKeys.forEach((touchListKey) => {
        const numericKey = Number(touchListKey);
        const transferredTouch = event[key][numericKey];
        list[numericKey] = {
          identifier: transferredTouch[0],
          screenX: transferredTouch[1],
          screenY: transferredTouch[2],
          clientX: transferredTouch[3],
          clientY: transferredTouch[4],
          pageX: transferredTouch[5],
          pageY: transferredTouch[6],
          target: get(
            transferredTouch[7] !== 0 ? transferredTouch[7] : document2[7]
          )
        };
      });
      return list;
    }
    return void 0;
  }, "touchListFromTransfer");
  function propagate$2(global) {
    const document2 = global.document;
    if (!document2.addGlobalEventListener) {
      return;
    }
    document2.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 1) {
        return;
      }
      const event = data[39];
      const node = get(event[7]);
      if (node !== null) {
        node.dispatchEvent(Object.assign(
          new Event$1(event[12], {
            bubbles: event[25],
            cancelable: event[26]
          }),
          {
            cancelBubble: event[27],
            defaultPrevented: event[29],
            eventPhase: event[30],
            isTrusted: event[31],
            returnValue: event[32],
            target: targetFromTransfer(global.document, event),
            timeStamp: event[33],
            scoped: event[34],
            keyCode: event[35],
            pageX: event[60],
            pageY: event[61],
            offsetX: event[65],
            offsetY: event[66],
            touches: touchListFromTransfer(
              global.document,
              event,
              62
            ),
            changedTouches: touchListFromTransfer(
              global.document,
              event,
              63
            )
          }
        ));
      }
    });
  }
  __name(propagate$2, "propagate$2");
  function getPreviousElementSibling(node) {
    let parentNodes = node.parentNode && node.parentNode.childNodes;
    if (!parentNodes) {
      return null;
    }
    for (let i = parentNodes.indexOf(node) - 1; i >= 0; i--) {
      let _node = parentNodes[i];
      if (_node.nodeType === 1) {
        return _node;
      }
    }
    return null;
  }
  __name(getPreviousElementSibling, "getPreviousElementSibling");
  function getNextElementSibling(node) {
    let parentNodes = node.parentNode && node.parentNode.childNodes;
    if (!parentNodes) {
      return null;
    }
    for (let i = parentNodes.indexOf(node) + 1; i < parentNodes.length; i++) {
      let _node2 = parentNodes[i];
      if (_node2.nodeType === 1) {
        return _node2;
      }
    }
    return null;
  }
  __name(getNextElementSibling, "getNextElementSibling");
  const NS_NAME_TO_CLASS = {};
  const registerSubclass = /* @__PURE__ */ __name((localName, subclass, namespace = HTML_NAMESPACE) => NS_NAME_TO_CLASS[`${namespace}:${localName}`] = subclass, "registerSubclass");
  function definePropertyBackedAttributes(defineOn, attributes) {
    const sub = Object.create(defineOn[46]);
    defineOn[46] = Object.assign(
      sub,
      attributes
    );
  }
  __name(definePropertyBackedAttributes, "definePropertyBackedAttributes");
  var ElementKind;
  (function(ElementKind2) {
    ElementKind2[ElementKind2["NORMAL"] = 0] = "NORMAL";
    ElementKind2[ElementKind2["VOID"] = 1] = "VOID";
  })(ElementKind || (ElementKind = {}));
  const VOID_ELEMENTS = [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ];
  class Element extends ParentNode {
    constructor(nodeType, localName, namespaceURI, ownerDocument, overrideIndex) {
      super(nodeType, toUpper(localName), ownerDocument, overrideIndex);
      this._classList = void 0;
      this.localName = void 0;
      this.attributes = [];
      this.namespaceURI = void 0;
      this.style_ = void 0;
      this.kind = void 0;
      this.namespaceURI = namespaceURI || HTML_NAMESPACE;
      this.localName = localName;
      this.kind = VOID_ELEMENTS.includes(this.tagName) ? ElementKind.VOID : ElementKind.NORMAL;
      this[8] = [
        this[7],
        this.nodeType,
        store(this.localName),
        0,
        this.namespaceURI === null ? 0 : store(this.namespaceURI)
      ];
    }
    get style() {
      if (!this.style_) {
        this.style_ = new CSSStyleDeclaration(this);
      }
      return this.style_;
    }
    get previousElementSibling() {
      return getPreviousElementSibling(this);
    }
    get nextElementSibling() {
      return getNextElementSibling(this);
    }
    get outerHTML() {
      const tag = this.localName || this.tagName;
      const start = `<${[tag, toString(this.attributes)].join(" ").trim()}>`;
      const contents = this.innerHTML;
      if (!contents) {
        if (this.kind === ElementKind.VOID) {
          return start;
        }
      }
      return start + contents + `</${tag}>`;
    }
    get innerHTML() {
      const childNodes = this.childNodes;
      if (childNodes.length) {
        return childNodes.map((child) => {
          switch (child.nodeType) {
            case 3:
              return child.textContent;
            case 8:
              return `<!--${child.textContent}-->`;
            default:
              return child.outerHTML;
          }
        }).join("");
      }
      return "";
    }
    set innerHTML(html) {
      const root = parse(html, this);
      this.childNodes.forEach((n) => {
        propagate$3(n, "isConnected", false);
        propagate$3(n, 45, n);
      });
      mutate(this.ownerDocument, {
        removedNodes: this.childNodes,
        type: 2,
        target: this
      }, [
        2,
        this[7],
        0,
        0,
        0,
        this.childNodes.length,
        ...this.childNodes.map((node) => node[7])
      ]);
      this.childNodes = [];
      root.childNodes.forEach((child) => this.appendChild(child));
    }
    set textContent(text) {
      this.childNodes.slice().forEach((child) => child.remove());
      this.appendChild(this.ownerDocument.createTextNode(text));
    }
    get textContent() {
      return this.getTextContent();
    }
    get tagName() {
      return this.nodeName;
    }
    setAttribute(name, value) {
      this.setAttributeNS(HTML_NAMESPACE, name, value);
    }
    getAttribute(name) {
      return this.getAttributeNS(HTML_NAMESPACE, name);
    }
    removeAttribute(name) {
      this.removeAttributeNS(HTML_NAMESPACE, name);
    }
    hasAttribute(name) {
      return this.hasAttributeNS(HTML_NAMESPACE, name);
    }
    hasAttributes() {
      return this.attributes.length > 0;
    }
    setAttributeNS(namespaceURI, name, value) {
      const valueAsString = String(value);
      const propertyBacked = this.constructor[46][name];
      if (propertyBacked !== void 0) {
        if (!this.attributes.find(matchPredicate(namespaceURI, name))) {
          this.attributes.push({
            namespaceURI,
            name,
            value: valueAsString
          });
        }
        propertyBacked[1](this, valueAsString);
        return;
      }
      const oldValue = this[44](
        namespaceURI,
        name,
        valueAsString
      );
      mutate(this.ownerDocument, {
        type: 0,
        target: this,
        attributeName: name,
        attributeNamespace: namespaceURI,
        value: valueAsString,
        oldValue
      }, [
        0,
        this[7],
        store(name),
        store(namespaceURI),
        value !== null ? store(valueAsString) + 1 : 0
      ]);
    }
    [44](namespaceURI, name, value) {
      const attr = this.attributes.find(matchPredicate(namespaceURI, name));
      const oldValue = attr && attr.value || "";
      if (attr) {
        attr.value = value;
      } else {
        this.attributes.push({
          namespaceURI,
          name,
          value
        });
      }
      return oldValue;
    }
    getAttributeNS(namespaceURI, name) {
      const attr = this.attributes.find(matchPredicate(namespaceURI, name));
      if (attr) {
        const propertyBacked = this.constructor[46][name];
        return propertyBacked !== void 0 ? propertyBacked[0](this) : attr.value;
      }
      return null;
    }
    removeAttributeNS(namespaceURI, name) {
      const index = this.attributes.findIndex(
        matchPredicate(namespaceURI, name)
      );
      if (index >= 0) {
        const oldValue = this.attributes[index].value;
        this.attributes.splice(index, 1);
        mutate(this.ownerDocument, {
          type: 0,
          target: this,
          attributeName: name,
          attributeNamespace: namespaceURI,
          oldValue
        }, [
          0,
          this[7],
          store(name),
          store(namespaceURI),
          0
        ]);
      }
    }
    hasAttributeNS(namespaceURI, name) {
      return this.attributes.some(matchPredicate(namespaceURI, name));
    }
    getElementsByClassName(names) {
      const inputClassList = names.split(" ");
      return matchChildrenElements(
        this,
        (element) => inputClassList.some(
          (inputClassName) => element.classList.contains(inputClassName)
        )
      );
    }
    getElementsByTagName(tagName) {
      const lowerTagName = toLower(tagName);
      return matchChildrenElements(
        this,
        tagName === "*" ? (_) => true : (element) => element.namespaceURI === HTML_NAMESPACE ? element.localName === lowerTagName : element.tagName === tagName
      );
    }
    getElementsByName(name) {
      const stringName = "" + name;
      return matchChildrenElements(
        this,
        (element) => element.getAttribute("name") === stringName
      );
    }
    cloneNode(deep = false) {
      const clone = this.ownerDocument.createElementNS(
        this.namespaceURI,
        this.namespaceURI === HTML_NAMESPACE ? toLower(this.tagName) : this.tagName
      );
      this.attributes.forEach(
        (attr) => clone.setAttribute(attr.name, attr.value)
      );
      if (deep) {
        this.childNodes.forEach(
          (child) => clone.appendChild(child.cloneNode(deep))
        );
      }
      return clone;
    }
    getBoundingClientRectAsync() {
      const defaultValue = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      return new Promise((resolve) => {
        const messageHandler = /* @__PURE__ */ __name(({
          data
        }) => {
          if (data[12] === 6 && data[13][0] === this[7]) {
            this.ownerDocument.removeGlobalEventListener(
              "message",
              messageHandler
            );
            const transferredBoundingClientRect = data[38];
            resolve({
              top: transferredBoundingClientRect[0],
              right: transferredBoundingClientRect[1],
              bottom: transferredBoundingClientRect[2],
              left: transferredBoundingClientRect[3],
              width: transferredBoundingClientRect[4],
              height: transferredBoundingClientRect[5],
              x: transferredBoundingClientRect[0],
              y: transferredBoundingClientRect[3]
            });
          }
        }, "messageHandler");
        if (!this.ownerDocument.addGlobalEventListener || !this.isConnected) {
          resolve(defaultValue);
        } else {
          this.ownerDocument.addGlobalEventListener("message", messageHandler);
          transfer(this.ownerDocument, [
            5,
            this[7]
          ]);
          setTimeout(resolve, 500, defaultValue);
        }
      });
    }
    click() {
      const event = new Event$1("click", {});
      event.target = this;
      this.dispatchEvent(event);
    }
    scrollIntoView() {
      if (this.isConnected) {
        transfer(this.ownerDocument, [
          14,
          this[7]
        ]);
      }
    }
    get classList() {
      return this._classList || (this._classList = new DOMTokenList(this, "class"));
    }
  }
  __name(Element, "Element");
  Element[46] = {
    class: [
      (el) => el.classList.value,
      (el, value) => el.classList.value = value
    ],
    style: [(el) => el.cssText, (el, value) => el.cssText = value]
  };
  synchronizedAccessor(Element, "classList", "className");
  reflectProperties([{
    id: [""]
  }], Element);
  const appendGlobalEventProperties = /* @__PURE__ */ __name((keys) => {
    const keysToAppend = keys.filter(
      (key) => !HTMLElement.prototype.hasOwnProperty(key)
    );
    if (keysToAppend.length <= 0) {
      return;
    }
    keysToAppend.forEach((key) => {
      const normalizedKey = key.replace(/on/, "");
      Object.defineProperty(HTMLElement.prototype, key, {
        enumerable: true,
        get() {
          return this[76][normalizedKey] || null;
        },
        set(value) {
          const stored = this[76][normalizedKey];
          if (stored) {
            this.removeEventListener(normalizedKey, stored);
          }
          this.addEventListener(normalizedKey, value);
          this[76][normalizedKey] = value;
        }
      });
    });
  }, "appendGlobalEventProperties");
  class HTMLElement extends Element {
    constructor(...args) {
      super(...args);
      this[76] = {};
    }
    get form() {
      return matchNearestParent(this, tagNameConditionPredicate(["FORM"]));
    }
    [68]() {
      return [7, this[7]];
    }
  }
  __name(HTMLElement, "HTMLElement");
  reflectProperties([{
    accessKey: [""]
  }, {
    contentEditable: ["inherit"]
  }, {
    dir: [""]
  }, {
    lang: [""]
  }, {
    title: [""]
  }, {
    draggable: [false, void 0, ["true", "false"]]
  }, {
    hidden: [false, void 0]
  }, {
    noModule: [false]
  }, {
    spellcheck: [true, void 0, ["true", "false"]]
  }, {
    translate: [true, void 0, ["yes", "no"]]
  }], HTMLElement);
  class SVGElement extends Element {
    constructor(nodeType, localName, namespaceURI, ownerDocument) {
      super(nodeType, localName, SVG_NAMESPACE, ownerDocument);
      this.nodeName = localName;
    }
  }
  __name(SVGElement, "SVGElement");
  registerSubclass("svg", SVGElement, SVG_NAMESPACE);
  class HTMLAnchorElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._relList = void 0;
    }
    get relList() {
      return this._relList || (this._relList = new DOMTokenList(this, "rel"));
    }
    toString() {
      return this.href;
    }
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
  }
  __name(HTMLAnchorElement, "HTMLAnchorElement");
  registerSubclass("a", HTMLAnchorElement);
  definePropertyBackedAttributes(HTMLAnchorElement, {
    rel: [(el) => el.relList.value, (el, value) => el.relList.value = value]
  });
  synchronizedAccessor(HTMLAnchorElement, "relList", "rel");
  reflectProperties([{
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    target: [""]
  }, {
    type: [""]
  }], HTMLAnchorElement);
  class HTMLButtonElement extends HTMLElement {
  }
  __name(HTMLButtonElement, "HTMLButtonElement");
  registerSubclass("button", HTMLButtonElement);
  reflectProperties([{
    formAction: [""]
  }, {
    formEnctype: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    name: [""]
  }, {
    type: ["submit"]
  }, {
    value: [""]
  }, {
    autofocus: [false]
  }, {
    disabled: [false]
  }], HTMLButtonElement);
  const f32 = new Float32Array(1);
  const u16 = new Uint16Array(f32.buffer);
  function isSmallInt(num) {
    u16[0] = num;
    return u16[0] === num;
  }
  __name(isSmallInt, "isSmallInt");
  function serializeTransferrableObject(args) {
    const serialized = [];
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "number") {
        if (isSmallInt(arg)) {
          serialized.push(1, arg);
        } else {
          f32[0] = arg;
          serialized.push(2, u16[0], u16[1]);
        }
        continue;
      }
      if (typeof arg === "string") {
        serialized.push(3, store(arg));
        continue;
      }
      if (Array.isArray(arg)) {
        serialized.push(4, arg.length);
        const serializedArray = serializeTransferrableObject(arg);
        for (let _i = 0; _i < serializedArray.length; _i++) {
          serialized.push(serializedArray[_i]);
        }
        continue;
      }
      if (typeof arg === "object") {
        const serializedObject = arg[68]();
        for (let _i2 = 0; _i2 < serializedObject.length; _i2++) {
          serialized.push(serializedObject[_i2]);
        }
        continue;
      }
      throw new Error("Cannot serialize argument.");
    }
    return serialized;
  }
  __name(serializeTransferrableObject, "serializeTransferrableObject");
  class CanvasGradient {
    constructor(id2, document2) {
      this.id = void 0;
      this.document = void 0;
      this.document = document2;
      this.id = id2;
    }
    addColorStop(offset, color) {
      transfer(this.document, [
        9,
        store("addColorStop"),
        2,
        ...this[68](),
        ...serializeTransferrableObject([...arguments])
      ]);
    }
    [68]() {
      return [5, this.id];
    }
  }
  __name(CanvasGradient, "CanvasGradient");
  class CanvasPattern {
    constructor(id2) {
      this.id = void 0;
      this.id = id2;
    }
    setTransform() {
    }
    [68]() {
      return [5, this.id];
    }
  }
  __name(CanvasPattern, "CanvasPattern");
  class OffscreenCanvasPolyfill {
    constructor(canvas) {
      this.canvas = void 0;
      this.context = void 0;
      this.canvas = canvas;
    }
    getContext(contextType) {
      if (!this.context) {
        if (toLower(contextType) === "2d") {
          this.context = new OffscreenCanvasRenderingContext2DPolyfill(
            this.canvas
          );
        } else {
          throw new Error("Context type not supported.");
        }
      }
      return this.context;
    }
  }
  __name(OffscreenCanvasPolyfill, "OffscreenCanvasPolyfill");
  class OffscreenCanvasRenderingContext2DPolyfill {
    constructor(canvas) {
      this.canvasElement = void 0;
      this.lineDash = void 0;
      this.objectIndex = 0;
      this.canvasElement = canvas;
      this.lineDash = [];
    }
    [67](fnName, args) {
      transfer(this.canvasElement.ownerDocument, [
        9,
        store(fnName),
        args.length,
        ...this[68](),
        ...serializeTransferrableObject(args)
      ]);
    }
    [68]() {
      return [
        6,
        this.canvasElement[7]
      ];
    }
    createObjectReference(objectId, creationMethod, creationArgs) {
      transfer(this.canvasElement.ownerDocument, [
        10,
        store(creationMethod),
        objectId,
        creationArgs.length,
        ...this[68](),
        ...serializeTransferrableObject(creationArgs)
      ]);
    }
    get canvas() {
      return this.canvasElement;
    }
    clearRect(x, y, w, h) {
      this[67]("clearRect", [...arguments]);
    }
    fillRect(x, y, w, h) {
      this[67]("fillRect", [...arguments]);
    }
    strokeRect(x, y, w, h) {
      this[67]("strokeRect", [...arguments]);
    }
    set lineWidth(value) {
      this[67]("lineWidth", [...arguments]);
    }
    fillText(text, x, y, maxWidth) {
      this[67]("fillText", [...arguments]);
    }
    moveTo(x, y) {
      this[67]("moveTo", [...arguments]);
    }
    lineTo(x, y) {
      this[67]("lineTo", [...arguments]);
    }
    closePath() {
      this[67]("closePath", []);
    }
    stroke() {
      this[67]("stroke", []);
    }
    restore() {
      this[67]("restore", []);
    }
    save() {
      this[67]("save", []);
    }
    resetTransform() {
      this[67]("resetTransform", []);
    }
    rotate(angle) {
      this[67]("rotate", [...arguments]);
    }
    transform(a, b, c, d, e, f) {
      this[67]("transform", [...arguments]);
    }
    translate(x, y) {
      this[67]("translate", [...arguments]);
    }
    scale(x, y) {
      this[67]("scale", [...arguments]);
    }
    set globalAlpha(value) {
      this[67]("globalAlpha", [...arguments]);
    }
    set globalCompositeOperation(value) {
      this[67]("globalCompositeOperation", [...arguments]);
    }
    set imageSmoothingQuality(value) {
      this[67]("imageSmoothingQuality", [...arguments]);
    }
    set fillStyle(value) {
      this[67]("fillStyle", [...arguments]);
    }
    set strokeStyle(value) {
      this[67]("strokeStyle", [...arguments]);
    }
    set shadowBlur(value) {
      this[67]("shadowBlur", [...arguments]);
    }
    set shadowColor(value) {
      this[67]("shadowColor", [...arguments]);
    }
    set shadowOffsetX(value) {
      this[67]("shadowOffsetX", [...arguments]);
    }
    set shadowOffsetY(value) {
      this[67]("shadowOffsetY", [...arguments]);
    }
    set filter(value) {
      this[67]("filter", [...arguments]);
    }
    beginPath() {
      this[67]("beginPath", []);
    }
    strokeText(text, x, y, maxWidth) {
      this[67]("strokeText", [...arguments]);
    }
    set textAlign(value) {
      this[67]("textAlign", [...arguments]);
    }
    set textBaseline(value) {
      this[67]("textBaseline", [...arguments]);
    }
    set lineCap(value) {
      this[67]("lineCap", [...arguments]);
    }
    set lineDashOffset(value) {
      this[67]("lineDashOffset", [...arguments]);
    }
    set lineJoin(value) {
      this[67]("lineJoin", [...arguments]);
    }
    set miterLimit(value) {
      this[67]("miterLimit", [...arguments]);
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
      this[67]("arc", [...arguments]);
    }
    arcTo(x1, y1, x2, y2, radius) {
      this[67]("arcTo", [...arguments]);
    }
    set direction(value) {
      this[67]("direction", [...arguments]);
    }
    set font(value) {
      this[67]("font", [...arguments]);
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
      this[67]("ellipse", [...arguments]);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this[67]("bezierCurveTo", [...arguments]);
    }
    rect(x, y, width, height) {
      this[67]("rect", [...arguments]);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
      this[67]("quadraticCurveTo", [...arguments]);
    }
    set imageSmoothingEnabled(value) {
      this[67]("imageSmoothingEnabled", [...arguments]);
    }
    setLineDash(lineDash) {
      lineDash = [...lineDash];
      if (lineDash.length % 2 !== 0) {
        lineDash = lineDash.concat(lineDash);
      }
      this.lineDash = lineDash;
      this[67]("setLineDash", [...arguments]);
    }
    getLineDash() {
      return [...this.lineDash];
    }
    clip(pathOrFillRule, fillRule) {
      if (typeof pathOrFillRule === "object") {
        throw new Error("clip(Path2D) is currently not supported!");
      }
      this[67]("clip", [...arguments]);
    }
    fill(pathOrFillRule, fillRule) {
      if (typeof pathOrFillRule === "object") {
        throw new Error("fill(Path2D) is currently not supported!");
      }
      this[67]("fill", [...arguments]);
    }
    setTransform(transformOrA, bOrC, cOrD, dOrE, eOrF, f) {
      if (typeof transformOrA === "object") {
        throw new Error(
          "setTransform(DOMMatrix2DInit) is currently not supported!"
        );
      }
      this[67]("setTransform", [...arguments]);
    }
    createLinearGradient(x0, y0, x1, y1) {
      const gradientId = this.objectIndex++;
      this.createObjectReference(gradientId, "createLinearGradient", [
        ...arguments
      ]);
      return new CanvasGradient(gradientId, this.canvasElement.ownerDocument);
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      const gradientId = this.objectIndex++;
      this.createObjectReference(gradientId, "createRadialGradient", [
        ...arguments
      ]);
      return new CanvasGradient(gradientId, this.canvasElement.ownerDocument);
    }
    createPattern(image, repetition) {
      const patternId = this.objectIndex++;
      this.createObjectReference(patternId, "createPattern", [...arguments]);
      return new CanvasPattern(patternId);
    }
    drawImage(image, dx, dy) {
      this[67]("drawImage", [...arguments]);
    }
    createImageData() {
      return {};
    }
    getImageData() {
      return {};
    }
    putImageData() {
    }
    isPointInPath() {
      throw new Error("isPointInPath is not implemented.");
    }
    isPointInStroke() {
      throw new Error("isPointInStroke is not implemented.");
    }
    measureText() {
      throw new Error("measureText is not implemented.");
    }
  }
  __name(OffscreenCanvasRenderingContext2DPolyfill, "OffscreenCanvasRenderingContext2DPolyfill");
  let indexTracker = 0;
  function retrieveImageBitmap(image, canvas) {
    const callIndex = indexTracker++;
    const document2 = canvas.ownerDocument;
    return new Promise((resolve) => {
      const messageHandler = /* @__PURE__ */ __name(({
        data
      }) => {
        if (data[12] === 10 && data[73] === callIndex) {
          document2.removeGlobalEventListener("message", messageHandler);
          const transferredImageBitmap = data[38];
          resolve(transferredImageBitmap);
        }
      }, "messageHandler");
      if (!document2.addGlobalEventListener) {
        throw new Error("addGlobalEventListener is not defined.");
      } else {
        document2.addGlobalEventListener("message", messageHandler);
        transfer(canvas.ownerDocument, [
          11,
          image[7],
          callIndex
        ]);
      }
    });
  }
  __name(retrieveImageBitmap, "retrieveImageBitmap");
  class FakeNativeCanvasPattern {
    constructor() {
      this[70] = {};
      this[71] = false;
      this[72] = void 0;
    }
    [69](canvas, image, repetition) {
      this[72] = retrieveImageBitmap(image, canvas).then((instance) => {
        const pattern = canvas.getContext("2d").createPattern(
          instance,
          repetition
        );
        if (!pattern) {
          throw new Error("Pattern is null!");
        }
        this[70] = pattern;
        this[71] = true;
      });
      return this[72];
    }
    setTransform() {
    }
  }
  __name(FakeNativeCanvasPattern, "FakeNativeCanvasPattern");
  const deferredUpgrades = /* @__PURE__ */ new WeakMap();
  class CanvasRenderingContext2DShim {
    constructor(canvas) {
      this.queue = [];
      this.implementation = void 0;
      this.upgraded = false;
      this.canvasElement = void 0;
      this.polyfillUsed = void 0;
      this.unresolvedCalls = 0;
      this.goodImplementation = void 0;
      this.canvasElement = canvas;
      const OffscreenCanvas = canvas.ownerDocument.defaultView.OffscreenCanvas;
      if (typeof OffscreenCanvas === "undefined") {
        this.implementation = new OffscreenCanvasPolyfill(canvas).getContext(
          "2d"
        );
        this.upgraded = true;
        this.polyfillUsed = true;
      } else {
        this.implementation = new OffscreenCanvas(0, 0).getContext("2d");
        this.getOffscreenCanvasAsync(this.canvasElement);
        this.polyfillUsed = false;
      }
    }
    getOffscreenCanvasAsync(canvas) {
      this.unresolvedCalls++;
      const deferred = {};
      const document2 = this.canvasElement.ownerDocument;
      const isTestMode = !document2.addGlobalEventListener;
      const upgradePromise = new Promise((resolve) => {
        const messageHandler = /* @__PURE__ */ __name(({
          data
        }) => {
          if (data[12] === 9 && data[13][0] === canvas[7]) {
            document2.removeGlobalEventListener("message", messageHandler);
            const transferredOffscreenCanvas = data[38];
            resolve(transferredOffscreenCanvas);
          }
        }, "messageHandler");
        if (!document2.addGlobalEventListener) {
          if (isTestMode) {
            deferred.resolve = resolve;
          } else {
            throw new Error("addGlobalEventListener is not defined.");
          }
        } else {
          document2.addGlobalEventListener("message", messageHandler);
          transfer(canvas.ownerDocument, [
            8,
            canvas[7]
          ]);
        }
      }).then((instance) => {
        this.goodImplementation = instance.getContext("2d");
        this.maybeUpgradeImplementation();
      });
      if (isTestMode) {
        deferred.upgradePromise = upgradePromise;
        deferredUpgrades.set(canvas, deferred);
      }
      return upgradePromise;
    }
    degradeImplementation() {
      this.upgraded = false;
      const OffscreenCanvas = this.canvasElement.ownerDocument.defaultView.OffscreenCanvas;
      this.implementation = new OffscreenCanvas(0, 0).getContext("2d");
      this.unresolvedCalls++;
    }
    maybeUpgradeImplementation() {
      this.unresolvedCalls--;
      if (this.unresolvedCalls === 0) {
        this.implementation = this.goodImplementation;
        this.upgraded = true;
        this.flushQueue();
      }
    }
    flushQueue() {
      for (const call of this.queue) {
        if (call.isSetter) {
          this[call.fnName] = call.args[0];
        } else {
          this[call.fnName](...call.args);
        }
      }
      this.queue.length = 0;
    }
    delegateFunc(name, args) {
      const returnValue = this.implementation[name](...args);
      if (!this.upgraded) {
        this.queue.push({
          fnName: name,
          args,
          isSetter: false
        });
      }
      return returnValue;
    }
    delegateSetter(name, args) {
      this.implementation[name] = args[0];
      if (!this.upgraded) {
        this.queue.push({
          fnName: name,
          args,
          isSetter: true
        });
      }
    }
    delegateGetter(name) {
      return this.implementation[name];
    }
    clearRect(x, y, width, height) {
      this.delegateFunc("clearRect", [...arguments]);
    }
    fillRect(x, y, width, height) {
      this.delegateFunc("fillRect", [...arguments]);
    }
    strokeRect(x, y, width, height) {
      this.delegateFunc("strokeRect", [...arguments]);
    }
    fillText(text, x, y, maxWidth) {
      this.delegateFunc("fillText", [...arguments]);
    }
    strokeText(text, x, y, maxWidth) {
      this.delegateFunc("strokeText", [...arguments]);
    }
    measureText(text) {
      return this.delegateFunc("measureText", [...arguments]);
    }
    set lineWidth(value) {
      this.delegateSetter("lineWidth", [...arguments]);
    }
    get lineWidth() {
      return this.delegateGetter("lineWidth");
    }
    set lineCap(value) {
      this.delegateSetter("lineCap", [...arguments]);
    }
    get lineCap() {
      return this.delegateGetter("lineCap");
    }
    set lineJoin(value) {
      this.delegateSetter("lineJoin", [...arguments]);
    }
    get lineJoin() {
      return this.delegateGetter("lineJoin");
    }
    set miterLimit(value) {
      this.delegateSetter("miterLimit", [...arguments]);
    }
    get miterLimit() {
      return this.delegateGetter("miterLimit");
    }
    getLineDash() {
      return this.delegateFunc("getLineDash", [...arguments]);
    }
    setLineDash(segments) {
      this.delegateFunc("setLineDash", [...arguments]);
    }
    set lineDashOffset(value) {
      this.delegateSetter("lineDashOffset", [...arguments]);
    }
    get lineDashOffset() {
      return this.delegateGetter("lineDashOffset");
    }
    set font(value) {
      this.delegateSetter("font", [...arguments]);
    }
    get font() {
      return this.delegateGetter("font");
    }
    set textAlign(value) {
      this.delegateSetter("textAlign", [...arguments]);
    }
    get textAlign() {
      return this.delegateGetter("textAlign");
    }
    set textBaseline(value) {
      this.delegateSetter("textBaseline", [...arguments]);
    }
    get textBaseline() {
      return this.delegateGetter("textBaseline");
    }
    set direction(value) {
      this.delegateSetter("direction", [...arguments]);
    }
    get direction() {
      return this.delegateGetter("direction");
    }
    set fillStyle(value) {
      if (value instanceof FakeNativeCanvasPattern && this.upgraded) {
        if (!value[71]) {
          this.queue.push({
            fnName: "fillStyle",
            args: [value],
            isSetter: true
          });
          this.degradeImplementation();
          value[72].then(() => {
            this.maybeUpgradeImplementation();
          });
        } else {
          this.delegateSetter("fillStyle", [
            value[70]
          ]);
        }
      } else {
        this.delegateSetter("fillStyle", [...arguments]);
      }
    }
    get fillStyle() {
      return this.delegateGetter("fillStyle");
    }
    set strokeStyle(value) {
      if (value instanceof FakeNativeCanvasPattern && this.upgraded) {
        if (!value[71]) {
          this.queue.push({
            fnName: "strokeStyle",
            args: [value],
            isSetter: true
          });
          this.degradeImplementation();
          value[72].then(() => {
            this.maybeUpgradeImplementation();
          });
        } else {
          this.delegateSetter("strokeStyle", [
            value[70]
          ]);
        }
      } else {
        this.delegateSetter("strokeStyle", [...arguments]);
      }
    }
    get strokeStyle() {
      return this.delegateGetter("strokeStyle");
    }
    createLinearGradient(x0, y0, x1, y1) {
      return this.delegateFunc("createLinearGradient", [...arguments]);
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      return this.delegateFunc("createRadialGradient", [...arguments]);
    }
    createPattern(image, repetition) {
      const ImageBitmap = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
      if (this.polyfillUsed || image instanceof ImageBitmap) {
        return this.delegateFunc("createPattern", [...arguments]);
      } else {
        this.degradeImplementation();
        const fakePattern = new FakeNativeCanvasPattern();
        fakePattern[69](
          this.canvas,
          image,
          repetition
        ).then(() => {
          this.maybeUpgradeImplementation();
        });
        return fakePattern;
      }
    }
    drawImage(image, dx, dy) {
      const ImageBitmap = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
      if (this.polyfillUsed || image instanceof ImageBitmap) {
        this.delegateFunc("drawImage", [...arguments]);
      } else {
        const args = [];
        this.queue.push({
          fnName: "drawImage",
          args,
          isSetter: false
        });
        this.degradeImplementation();
        retrieveImageBitmap(image, this.canvas).then((instance) => {
          args.push(instance, dx, dy);
          this.maybeUpgradeImplementation();
        });
      }
    }
    set shadowBlur(value) {
      this.delegateSetter("shadowBlur", [...arguments]);
    }
    get shadowBlur() {
      return this.delegateGetter("shadowBlur");
    }
    set shadowColor(value) {
      this.delegateSetter("shadowColor", [...arguments]);
    }
    get shadowColor() {
      return this.delegateGetter("shadowColor");
    }
    set shadowOffsetX(value) {
      this.delegateSetter("shadowOffsetX", [...arguments]);
    }
    get shadowOffsetX() {
      return this.delegateGetter("shadowOffsetX");
    }
    set shadowOffsetY(value) {
      this.delegateSetter("shadowOffsetY", [...arguments]);
    }
    get shadowOffsetY() {
      return this.delegateGetter("shadowOffsetY");
    }
    beginPath() {
      this.delegateFunc("beginPath", [...arguments]);
    }
    closePath() {
      this.delegateFunc("closePath", [...arguments]);
    }
    moveTo(x, y) {
      this.delegateFunc("moveTo", [...arguments]);
    }
    lineTo(x, y) {
      this.delegateFunc("lineTo", [...arguments]);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this.delegateFunc("bezierCurveTo", [...arguments]);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
      this.delegateFunc("quadraticCurveTo", [...arguments]);
    }
    arc(x, y, radius, startAngle, endAngle, antiClockwise) {
      this.delegateFunc("arc", [...arguments]);
    }
    arcTo(x1, y1, x2, y2, radius) {
      this.delegateFunc("arcTo", [...arguments]);
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      this.delegateFunc("ellipse", [...arguments]);
    }
    rect(x, y, width, height) {
      this.delegateFunc("rect", [...arguments]);
    }
    fill(pathOrFillRule, fillRule) {
      const args = [...arguments];
      this.delegateFunc("fill", args);
    }
    stroke(path) {
      const args = [...arguments];
      this.delegateFunc("stroke", args);
    }
    clip(pathOrFillRule, fillRule) {
      const args = [...arguments];
      this.delegateFunc("clip", args);
    }
    isPointInPath(pathOrX, xOrY, yOrFillRule, fillRule) {
      const args = [...arguments];
      return this.delegateFunc("isPointInPath", args);
    }
    isPointInStroke(pathOrX, xOrY, y) {
      const args = [...arguments];
      return this.delegateFunc("isPointInStroke", args);
    }
    rotate(angle) {
      this.delegateFunc("rotate", [...arguments]);
    }
    scale(x, y) {
      this.delegateFunc("scale", [...arguments]);
    }
    translate(x, y) {
      this.delegateFunc("translate", [...arguments]);
    }
    transform(a, b, c, d, e, f) {
      this.delegateFunc("transform", [...arguments]);
    }
    setTransform(transformOrA, bOrC, cOrD, dOrE, eOrF, f) {
      const args = [...arguments];
      this.delegateFunc("setTransform", args);
    }
    resetTransform() {
      this.delegateFunc("resetTransform", [...arguments]);
    }
    set globalAlpha(value) {
      this.delegateSetter("globalAlpha", [...arguments]);
    }
    get globalAlpha() {
      return this.delegateGetter("globalAlpha");
    }
    set globalCompositeOperation(value) {
      this.delegateSetter("globalCompositeOperation", [...arguments]);
    }
    get globalCompositeOperation() {
      return this.delegateGetter("globalCompositeOperation");
    }
    createImageData(imagedataOrWidth, height) {
      const args = [...arguments];
      return this.delegateFunc("createImageData", args);
    }
    getImageData(sx, sy, sw, sh) {
      return this.delegateFunc("getImageData", [...arguments]);
    }
    putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
      this.delegateFunc("putImageData", [...arguments]);
    }
    set imageSmoothingEnabled(value) {
      this.delegateSetter("imageSmoothingEnabled", [...arguments]);
    }
    get imageSmoothingEnabled() {
      return this.delegateGetter("imageSmoothingEnabled");
    }
    set imageSmoothingQuality(value) {
      this.delegateSetter("imageSmoothingQuality", [...arguments]);
    }
    get imageSmoothingQuality() {
      return this.delegateGetter("imageSmoothingQuality");
    }
    save() {
      this.delegateFunc("save", [...arguments]);
    }
    restore() {
      this.delegateFunc("restore", [...arguments]);
    }
    get canvas() {
      return this.canvasElement;
    }
    set filter(value) {
      this.delegateSetter("filter", [...arguments]);
    }
    get filter() {
      return this.delegateGetter("filter");
    }
  }
  __name(CanvasRenderingContext2DShim, "CanvasRenderingContext2DShim");
  class HTMLCanvasElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this.context = void 0;
    }
    getContext(contextType) {
      if (!this.context) {
        if (contextType === "2D" || contextType === "2d") {
          this.context = new CanvasRenderingContext2DShim(this);
        } else {
          throw new Error("Context type not supported.");
        }
      }
      return this.context;
    }
  }
  __name(HTMLCanvasElement, "HTMLCanvasElement");
  registerSubclass("canvas", HTMLCanvasElement);
  reflectProperties([{
    height: [0]
  }, {
    width: [0]
  }], HTMLCanvasElement);
  class HTMLDataElement extends HTMLElement {
  }
  __name(HTMLDataElement, "HTMLDataElement");
  registerSubclass("data", HTMLDataElement);
  reflectProperties([{
    value: [""]
  }], HTMLDataElement);
  class HTMLEmbedElement extends HTMLElement {
  }
  __name(HTMLEmbedElement, "HTMLEmbedElement");
  registerSubclass("embed", HTMLEmbedElement);
  reflectProperties([{
    height: [""]
  }, {
    src: [""]
  }, {
    type: [""]
  }, {
    width: [""]
  }], HTMLEmbedElement);
  const MATCHING_CHILD_ELEMENT_TAGNAMES = "BUTTON FIELDSET INPUT OBJECT OUTPUT SELECT TEXTAREA".split(" ");
  const HTMLFormControlsCollectionMixin = /* @__PURE__ */ __name((defineOn) => {
    Object.defineProperty(defineOn.prototype, "elements", {
      get() {
        return matchChildrenElements(
          this,
          tagNameConditionPredicate(MATCHING_CHILD_ELEMENT_TAGNAMES)
        );
      }
    });
  }, "HTMLFormControlsCollectionMixin");
  class HTMLFieldSetElement extends HTMLElement {
    get type() {
      return toLower(this.tagName);
    }
  }
  __name(HTMLFieldSetElement, "HTMLFieldSetElement");
  registerSubclass("fieldset", HTMLFieldSetElement);
  HTMLFormControlsCollectionMixin(HTMLFieldSetElement);
  reflectProperties([{
    name: [""]
  }, {
    disabled: [false]
  }], HTMLFieldSetElement);
  class HTMLFormElement extends HTMLElement {
    get length() {
      return this.elements.length;
    }
  }
  __name(HTMLFormElement, "HTMLFormElement");
  registerSubclass("form", HTMLFormElement);
  HTMLFormControlsCollectionMixin(HTMLFormElement);
  reflectProperties([{
    name: [""]
  }, {
    method: ["get"]
  }, {
    target: [""]
  }, {
    action: [""]
  }, {
    enctype: ["application/x-www-form-urlencoded"]
  }, {
    acceptCharset: ["", "accept-charset"]
  }, {
    autocomplete: ["on"]
  }, {
    autocapitalize: ["sentences"]
  }], HTMLFormElement);
  class HTMLIFrameElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._sandbox = void 0;
    }
    get sandbox() {
      return this._sandbox || (this._sandbox = new DOMTokenList(this, "sandbox"));
    }
  }
  __name(HTMLIFrameElement, "HTMLIFrameElement");
  registerSubclass("iframe", HTMLIFrameElement);
  definePropertyBackedAttributes(HTMLIFrameElement, {
    sandbox: [
      (el) => el.sandbox.value,
      (el, value) => el.sandbox.value = value
    ]
  });
  reflectProperties([{
    allow: [""]
  }, {
    allowFullscreen: [false]
  }, {
    csp: [""]
  }, {
    height: [""]
  }, {
    name: [""]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    srcdoc: [""]
  }, {
    width: [""]
  }], HTMLIFrameElement);
  class HTMLImageElement extends HTMLElement {
  }
  __name(HTMLImageElement, "HTMLImageElement");
  registerSubclass("img", HTMLImageElement);
  reflectProperties([{
    alt: [""]
  }, {
    crossOrigin: [""]
  }, {
    height: [0]
  }, {
    isMap: [false]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    sizes: [""]
  }, {
    srcset: [""]
  }, {
    useMap: [""]
  }, {
    width: [0]
  }], HTMLImageElement);
  const HTMLInputLabelsMixin = /* @__PURE__ */ __name((defineOn) => {
    Object.defineProperty(defineOn.prototype, "labels", {
      get() {
        return matchChildrenElements(
          this.ownerDocument || this,
          (element) => element.tagName === "LABEL" && element.for && element.for === this.id
        );
      }
    });
  }, "HTMLInputLabelsMixin");
  class HTMLInputElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[21] = "";
      this.dirtyValue = false;
      this[47] = false;
    }
    get value() {
      return !this.dirtyValue ? this.getAttribute("value") || "" : this[21];
    }
    set value(value) {
      this[21] = String(value);
      this.dirtyValue = true;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store("value"),
        0,
        store(value)
      ]);
    }
    get valueAsDate() {
      const date = this.stringToDate(this.value);
      const invalid = !date || isNaN(date.getTime());
      return invalid ? null : date;
    }
    set valueAsDate(value) {
      if (!(value instanceof Date)) {
        throw new TypeError("The provided value is not a Date.");
      }
      this.value = this.dateToString(value);
    }
    get valueAsNumber() {
      if (this.value.length === 0) {
        return NaN;
      }
      return Number(this.value);
    }
    set valueAsNumber(value) {
      if (typeof value === "number") {
        this.value = String(value);
      } else {
        this.value = "";
      }
    }
    get checked() {
      return this[47];
    }
    set checked(value) {
      if (this[47] === value) {
        return;
      }
      this[47] = !!value;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store("checked"),
        1,
        value === true ? 1 : 0
      ]);
    }
    dateToString(date) {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${y}-${m > 9 ? "" : "0"}${m}-${d > 9 ? "" : "0"}${d}`;
    }
    stringToDate(str) {
      const components = str.split("-");
      if (components.length !== 3) {
        return null;
      }
      const [y, m, d] = components;
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
  }
  __name(HTMLInputElement, "HTMLInputElement");
  registerSubclass("input", HTMLInputElement);
  HTMLInputLabelsMixin(HTMLInputElement);
  reflectProperties([{
    accept: [""]
  }, {
    alt: [""]
  }, {
    autocapitalize: [""]
  }, {
    autocomplete: [""]
  }, {
    autofocus: [false]
  }, {
    defaultChecked: [false, "checked"]
  }, {
    defaultValue: ["", "value"]
  }, {
    dirName: [""]
  }, {
    disabled: [false]
  }, {
    formAction: [""]
  }, {
    formEncType: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    height: [0]
  }, {
    max: [""]
  }, {
    maxLength: [0]
  }, {
    min: [""]
  }, {
    multiple: [false]
  }, {
    name: [""]
  }, {
    pattern: [""]
  }, {
    placeholder: [""]
  }, {
    readOnly: [false]
  }, {
    required: [false]
  }, {
    size: [0]
  }, {
    src: [""]
  }, {
    step: [""]
  }, {
    type: ["text"]
  }, {
    width: [0]
  }], HTMLInputElement);
  class HTMLLabelElement extends HTMLElement {
    get control() {
      const htmlFor = this.getAttribute("for");
      if (htmlFor !== null) {
        return this.ownerDocument && this.ownerDocument.getElementById(htmlFor);
      }
      return matchChildElement(this, tagNameConditionPredicate(["INPUT"]));
    }
  }
  __name(HTMLLabelElement, "HTMLLabelElement");
  registerSubclass("label", HTMLLabelElement);
  reflectProperties([{
    htmlFor: ["", "for"]
  }], HTMLLabelElement);
  class HTMLLinkElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._relList = void 0;
    }
    get relList() {
      return this._relList || (this._relList = new DOMTokenList(this, "rel"));
    }
  }
  __name(HTMLLinkElement, "HTMLLinkElement");
  registerSubclass("link", HTMLLinkElement);
  definePropertyBackedAttributes(HTMLLinkElement, {
    rel: [(el) => el.relList.value, (el, value) => el.relList.value = value]
  });
  synchronizedAccessor(HTMLLinkElement, "relList", "rel");
  reflectProperties([{
    as: [""]
  }, {
    crossOrigin: [""]
  }, {
    disabled: [false]
  }, {
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    referrerPolicy: [""]
  }, {
    sizes: [""]
  }, {
    type: [""]
  }], HTMLLinkElement);
  class HTMLMapElement extends HTMLElement {
    get areas() {
      return matchChildrenElements(
        this,
        (element) => element.tagName === "AREA"
      );
    }
  }
  __name(HTMLMapElement, "HTMLMapElement");
  registerSubclass("map", HTMLMapElement);
  reflectProperties([{
    name: [""]
  }], HTMLMapElement);
  class HTMLMeterElement extends HTMLElement {
  }
  __name(HTMLMeterElement, "HTMLMeterElement");
  registerSubclass("meter", HTMLMeterElement);
  HTMLInputLabelsMixin(HTMLMeterElement);
  reflectProperties([{
    high: [0]
  }, {
    low: [0]
  }, {
    max: [1]
  }, {
    min: [0]
  }, {
    optimum: [0]
  }, {
    value: [0]
  }], HTMLMeterElement);
  class HTMLModElement extends HTMLElement {
  }
  __name(HTMLModElement, "HTMLModElement");
  registerSubclass("del", HTMLModElement);
  registerSubclass("ins", HTMLModElement);
  reflectProperties([{
    cite: [""]
  }, {
    datetime: [""]
  }], HTMLModElement);
  class HTMLOListElement extends HTMLElement {
  }
  __name(HTMLOListElement, "HTMLOListElement");
  registerSubclass("ol", HTMLOListElement);
  reflectProperties([{
    reversed: [false]
  }, {
    start: [1]
  }, {
    type: [""]
  }], HTMLOListElement);
  class HTMLOptionElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[52] = false;
    }
    get index() {
      return this.parentNode && this.parentNode.children.indexOf(this) || 0;
    }
    get label() {
      return this.getAttribute("label") || this.textContent;
    }
    set label(label) {
      this.setAttribute("label", label);
    }
    get selected() {
      return this[52];
    }
    set selected(value) {
      this[52] = !!value;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store("selected"),
        1,
        this[52] ? 1 : 0
      ]);
    }
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
    get value() {
      return this.getAttribute("value") || this.textContent;
    }
    set value(value) {
      this.setAttribute("value", value);
    }
  }
  __name(HTMLOptionElement, "HTMLOptionElement");
  registerSubclass("option", HTMLOptionElement);
  definePropertyBackedAttributes(HTMLOptionElement, {
    selected: [
      (el) => String(el[52]),
      (el, value) => el.selected = value === "true"
    ]
  });
  reflectProperties([{
    defaultSelected: [false, "selected"]
  }, {
    disabled: [false]
  }, {
    type: [""]
  }], HTMLOptionElement);
  class HTMLProgressElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[48] = true;
      this[21] = 0;
      this.dirtyValue = false;
    }
    get position() {
      return this[48] ? -1 : this.value / this.max;
    }
    get value() {
      return !this.dirtyValue ? Number(this.getAttribute("value")) || 0 : this[21];
    }
    set value(value) {
      this[48] = false;
      this[21] = value;
      this.dirtyValue = true;
    }
  }
  __name(HTMLProgressElement, "HTMLProgressElement");
  registerSubclass("progress", HTMLProgressElement);
  HTMLInputLabelsMixin(HTMLProgressElement);
  reflectProperties([{
    max: [1]
  }], HTMLProgressElement);
  class HTMLQuoteElement extends HTMLElement {
  }
  __name(HTMLQuoteElement, "HTMLQuoteElement");
  registerSubclass("blockquote", HTMLQuoteElement);
  registerSubclass("q", HTMLQuoteElement);
  reflectProperties([{
    cite: [""]
  }], HTMLQuoteElement);
  class HTMLScriptElement extends HTMLElement {
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
  }
  __name(HTMLScriptElement, "HTMLScriptElement");
  registerSubclass("script", HTMLScriptElement);
  reflectProperties([{
    type: [""]
  }, {
    src: [""]
  }, {
    charset: [""]
  }, {
    async: [false]
  }, {
    defer: [false]
  }, {
    crossOrigin: [""]
  }, {
    noModule: [false]
  }], HTMLScriptElement);
  const isOptionPredicate = tagNameConditionPredicate(["OPTION"]);
  const isSelectedOptionPredicate = /* @__PURE__ */ __name((element) => isOptionPredicate(element) && element.selected === true, "isSelectedOptionPredicate");
  class HTMLSelectElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[49] = -1;
    }
    [56](child) {
      super[56](child);
      if (!this.multiple && isOptionPredicate(child) && child.selected || this.value === "") {
        this.value = child.value;
      }
    }
    [57](child) {
      super[57](child);
      if (!this.multiple && child.selected) {
        const options = this.options;
        if (options.length > 0) {
          this.value = options[0].value;
        }
      }
    }
    get length() {
      return this.options.length;
    }
    get options() {
      return this.children.filter(isOptionPredicate);
    }
    get selectedIndex() {
      const firstSelectedChild = matchChildElement(
        this,
        isSelectedOptionPredicate
      );
      return firstSelectedChild ? this.children.indexOf(firstSelectedChild) : -1;
    }
    set selectedIndex(selectedIndex) {
      this.children.forEach(
        (element, index) => element.selected = index === selectedIndex
      );
    }
    get selectedOptions() {
      return matchChildrenElements(this, isSelectedOptionPredicate);
    }
    get size() {
      return this[49] === -1 ? this.multiple ? 4 : 1 : this[49];
    }
    set size(size) {
      this[49] = size > 0 ? size : this.multiple ? 4 : 1;
    }
    get type() {
      return this.multiple ? "select-one" : "select-multiple";
    }
    get value() {
      const firstSelectedChild = matchChildElement(
        this,
        isSelectedOptionPredicate
      );
      return firstSelectedChild ? firstSelectedChild.value : "";
    }
    set value(value) {
      const stringValue = String(value);
      this.children.forEach(
        (element) => isOptionPredicate(element) && (element.selected = element.value === stringValue)
      );
    }
  }
  __name(HTMLSelectElement, "HTMLSelectElement");
  registerSubclass("select", HTMLSelectElement);
  HTMLInputLabelsMixin(HTMLSelectElement);
  reflectProperties([{
    multiple: [false]
  }, {
    name: [""]
  }, {
    required: [false]
  }], HTMLSelectElement);
  class HTMLSourceElement extends HTMLElement {
  }
  __name(HTMLSourceElement, "HTMLSourceElement");
  registerSubclass("source", HTMLSourceElement);
  reflectProperties([{
    media: [""]
  }, {
    sizes: [""]
  }, {
    src: [""]
  }, {
    srcset: [""]
  }, {
    type: [""]
  }], HTMLSourceElement);
  class HTMLStyleElement extends HTMLElement {
  }
  __name(HTMLStyleElement, "HTMLStyleElement");
  registerSubclass("style", HTMLStyleElement);
  reflectProperties([{
    media: [""]
  }, {
    type: [""]
  }], HTMLStyleElement);
  class HTMLTableCellElement extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._headers = void 0;
    }
    get headers() {
      return this._headers || (this._headers = new DOMTokenList(this, "headers"));
    }
    get cellIndex() {
      const parent = matchNearestParent(
        this,
        tagNameConditionPredicate(["TR"])
      );
      return parent !== null ? matchChildrenElements(parent, tagNameConditionPredicate(["TH", "TD"])).indexOf(this) : -1;
    }
  }
  __name(HTMLTableCellElement, "HTMLTableCellElement");
  registerSubclass("th", HTMLTableCellElement);
  registerSubclass("td", HTMLTableCellElement);
  definePropertyBackedAttributes(HTMLTableCellElement, {
    headers: [
      (el) => el.headers.value,
      (el, value) => el.headers.value = value
    ]
  });
  reflectProperties([{
    abbr: [""]
  }, {
    colSpan: [1]
  }, {
    rowSpan: [1]
  }, {
    scope: [""]
  }], HTMLTableCellElement);
  class HTMLTableColElement extends HTMLElement {
  }
  __name(HTMLTableColElement, "HTMLTableColElement");
  registerSubclass("col", HTMLTableColElement);
  reflectProperties([{
    span: [1]
  }], HTMLTableColElement);
  const removeElement = /* @__PURE__ */ __name((element) => element && element.remove(), "removeElement");
  const insertBeforeElementsWithTagName = /* @__PURE__ */ __name((parent, element, tagNames) => {
    const insertBeforeElement = matchChildElement(
      parent,
      (element2) => !tagNames.includes(element2.tagName)
    );
    if (insertBeforeElement) {
      parent.insertBefore(element, insertBeforeElement);
    } else {
      parent.appendChild(element);
    }
  }, "insertBeforeElementsWithTagName");
  class HTMLTableElement extends HTMLElement {
    get caption() {
      return matchChildElement(this, tagNameConditionPredicate(["CAPTION"]));
    }
    set caption(newElement) {
      if (newElement && newElement.tagName === "CAPTION") {
        removeElement(this.caption);
        this.insertBefore(newElement, this.firstElementChild);
      }
    }
    get tHead() {
      return matchChildElement(this, tagNameConditionPredicate(["THEAD"]));
    }
    set tHead(newElement) {
      if (newElement && newElement.tagName === "THEAD") {
        removeElement(this.tHead);
        insertBeforeElementsWithTagName(this, newElement, [
          "CAPTION",
          "COLGROUP"
        ]);
      }
    }
    get tFoot() {
      return matchChildElement(this, tagNameConditionPredicate(["TFOOT"]));
    }
    set tFoot(newElement) {
      if (newElement && newElement.tagName === "TFOOT") {
        removeElement(this.tFoot);
        insertBeforeElementsWithTagName(this, newElement, [
          "CAPTION",
          "COLGROUP",
          "THEAD"
        ]);
      }
    }
    get rows() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TR"]));
    }
    get tBodies() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TBODY"]));
    }
  }
  __name(HTMLTableElement, "HTMLTableElement");
  registerSubclass("table", HTMLTableElement);
  const TABLE_SECTION_TAGNAMES = "TABLE TBODY THEAD TFOOT".split(" ");
  const indexInAncestor = /* @__PURE__ */ __name((element, isValidAncestor) => {
    const parent = matchNearestParent(element, isValidAncestor);
    return parent === null ? -1 : parent.rows.indexOf(element);
  }, "indexInAncestor");
  class HTMLTableRowElement extends HTMLElement {
    get cells() {
      return matchChildrenElements(
        this,
        tagNameConditionPredicate(["TD", "TH"])
      );
    }
    get rowIndex() {
      return indexInAncestor(this, tagNameConditionPredicate(["TABLE"]));
    }
    get sectionRowIndex() {
      return indexInAncestor(
        this,
        tagNameConditionPredicate(TABLE_SECTION_TAGNAMES)
      );
    }
    deleteCell(index) {
      const cell = this.cells[index];
      if (cell) {
        cell.remove();
      }
    }
    insertCell(index) {
      const cells = this.cells;
      const td = this.ownerDocument.createElement("td");
      if (index < 0 || index >= cells.length) {
        this.appendChild(td);
      } else {
        this.insertBefore(td, this.children[index]);
      }
      return td;
    }
  }
  __name(HTMLTableRowElement, "HTMLTableRowElement");
  registerSubclass("tr", HTMLTableRowElement);
  class HTMLTableSectionElement extends HTMLElement {
    get rows() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TR"]));
    }
    deleteRow(index) {
      const rows = this.rows;
      if (index >= 0 || index <= rows.length) {
        rows[index].remove();
      }
    }
    insertRow(index) {
      const rows = this.rows;
      const tr = this.ownerDocument.createElement("tr");
      if (index < 0 || index >= rows.length) {
        this.appendChild(tr);
      } else {
        this.insertBefore(tr, this.children[index]);
      }
      return tr;
    }
  }
  __name(HTMLTableSectionElement, "HTMLTableSectionElement");
  registerSubclass("thead", HTMLTableSectionElement);
  registerSubclass("tfoot", HTMLTableSectionElement);
  registerSubclass("tbody", HTMLTableSectionElement);
  class HTMLTimeElement extends HTMLElement {
  }
  __name(HTMLTimeElement, "HTMLTimeElement");
  registerSubclass("time", HTMLTimeElement);
  reflectProperties([{
    dateTime: [""]
  }], HTMLTimeElement);
  class HTMLDataListElement extends HTMLElement {
    get options() {
      return this.childNodes.filter((node) => node.nodeName === "OPTION");
    }
  }
  __name(HTMLDataListElement, "HTMLDataListElement");
  registerSubclass("datalist", HTMLDataListElement);
  class CharacterData extends Node {
    constructor(data, nodeType, nodeName, ownerDocument, overrideIndex) {
      super(nodeType, nodeName, ownerDocument, overrideIndex);
      this[38] = void 0;
      this[38] = data;
      this[8] = [
        this[7],
        nodeType,
        store(nodeName),
        store(data),
        0
      ];
    }
    get data() {
      return this[38];
    }
    set data(value) {
      const oldValue = this.data;
      this[38] = value;
      mutate(this.ownerDocument, {
        target: this,
        type: 1,
        value,
        oldValue
      }, [1, this[7], store(value)]);
    }
    get length() {
      return this[38].length;
    }
    get nodeValue() {
      return this[38];
    }
    set nodeValue(value) {
      this.data = value;
    }
    get previousElementSibling() {
      return getPreviousElementSibling(this);
    }
    get nextElementSibling() {
      return getNextElementSibling(this);
    }
  }
  __name(CharacterData, "CharacterData");
  class Text extends CharacterData {
    constructor(data, ownerDocument, overrideIndex) {
      super(data, 3, "#text", ownerDocument, overrideIndex);
    }
    get textContent() {
      return this.data;
    }
    set textContent(value) {
      this.nodeValue = value;
    }
    cloneNode() {
      return this.ownerDocument.createTextNode(this.data);
    }
    splitText(offset) {
      const remainderTextNode = new Text(
        this.data.slice(offset, this.data.length),
        this.ownerDocument
      );
      const parentNode = this.parentNode;
      this.nodeValue = this.data.slice(0, offset);
      if (parentNode !== null) {
        const parentChildNodes = parentNode.childNodes;
        const insertBeforePosition = parentChildNodes.indexOf(this) + 1;
        const insertBeforeNode = parentChildNodes.length >= insertBeforePosition ? parentChildNodes[insertBeforePosition] : null;
        return parentNode.insertBefore(remainderTextNode, insertBeforeNode);
      }
      return remainderTextNode;
    }
  }
  __name(Text, "Text");
  class Comment extends CharacterData {
    constructor(data, ownerDocument, overrideIndex) {
      super(
        data,
        8,
        "#comment",
        ownerDocument,
        overrideIndex
      );
    }
    get textContent() {
      return this.data;
    }
    set textContent(value) {
      this.nodeValue = value;
    }
    cloneNode() {
      return this.ownerDocument.createComment(this.data);
    }
  }
  __name(Comment, "Comment");
  class DocumentFragment extends ParentNode {
    constructor(ownerDocument, overrideIndex) {
      super(
        11,
        "#document-fragment",
        ownerDocument,
        overrideIndex
      );
      this[8] = [
        this[7],
        11,
        store(this.nodeName),
        0,
        0
      ];
    }
    cloneNode(deep = false) {
      const clone = this.ownerDocument.createDocumentFragment();
      if (deep) {
        this.childNodes.forEach(
          (child) => clone.appendChild(child.cloneNode(deep))
        );
      }
      return clone;
    }
  }
  __name(DocumentFragment, "DocumentFragment");
  function propagate$1(global) {
    const document2 = global.document;
    if (!document2.addGlobalEventListener) {
      return;
    }
    document2.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 4) {
        return;
      }
      const sync = data[40];
      const node = get(sync[7]);
      if (node) {
        node.ownerDocument[58] = false;
        node.value = sync[21];
        node.ownerDocument[58] = true;
      }
    });
  }
  __name(propagate$1, "propagate$1");
  function propagate(global) {
    const document2 = global.document;
    if (!document2.addGlobalEventListener) {
      return;
    }
    document2.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 5) {
        return;
      }
      const sync = data[40];
      if (sync) {
        global.innerWidth = sync[0];
        global.innerHeight = sync[1];
      }
    });
  }
  __name(propagate, "propagate");
  const DOCUMENT_NAME = "#document";
  class Document extends Element {
    constructor(global) {
      super(9, DOCUMENT_NAME, HTML_NAMESPACE, null);
      this.defaultView = void 0;
      this.documentElement = void 0;
      this.body = void 0;
      this.postMessage = void 0;
      this.addGlobalEventListener = void 0;
      this.removeGlobalEventListener = void 0;
      this[58] = true;
      this.nodeName = DOCUMENT_NAME;
      this.documentElement = this;
      this.defaultView = Object.assign(global, {
        document: this,
        addEventListener: this.addEventListener.bind(this),
        removeEventListener: this.removeEventListener.bind(this)
      });
    }
    [59]() {
      set(1);
      propagate$2(this.defaultView);
      propagate$1(this.defaultView);
      propagate(this.defaultView);
    }
    [64](strings, skeleton) {
      switch (skeleton[0]) {
        case 3:
          return new Text(
            strings[skeleton[5]],
            this,
            skeleton[7]
          );
        case 8:
          return new Comment(
            strings[skeleton[5]],
            this,
            skeleton[7]
          );
        default:
          const namespaceURI = strings[skeleton[6]] || HTML_NAMESPACE;
          const localName = strings[skeleton[1]];
          const constructor = NS_NAME_TO_CLASS[`${namespaceURI}:${localName}`] || HTMLElement;
          const node = new constructor(
            1,
            localName,
            namespaceURI,
            this,
            skeleton[7]
          );
          (skeleton[2] || []).forEach(
            (attribute) => node.setAttributeNS(
              strings[attribute[0]] !== "null" ? strings[attribute[0]] : HTML_NAMESPACE,
              strings[attribute[1]],
              strings[attribute[2]]
            )
          );
          (skeleton[4] || []).forEach(
            (child) => node.appendChild(this[64](strings, child))
          );
          return node;
      }
    }
    createElement(name) {
      return this.createElementNS(HTML_NAMESPACE, toLower(name));
    }
    createElementNS(namespaceURI, localName) {
      const constructor = NS_NAME_TO_CLASS[`${namespaceURI}:${localName}`] || HTMLElement;
      return new constructor(
        1,
        localName,
        namespaceURI,
        this
      );
    }
    createEvent(type) {
      return new Event(type, {
        bubbles: false,
        cancelable: false
      });
    }
    createTextNode(text) {
      return new Text(text, this);
    }
    createComment(text) {
      return new Comment(text, this);
    }
    createDocumentFragment() {
      return new DocumentFragment(this);
    }
    getElementById(id2) {
      return matchChildElement(this.body, (element) => element.id === id2);
    }
  }
  __name(Document, "Document");
  function createStorage(document2, location2, data) {
    const storage = Object.assign(/* @__PURE__ */ Object.create(null), data);
    const define = Object.defineProperty;
    define(storage, "length", {
      get() {
        return Object.keys(this).length;
      }
    });
    define(storage, "key", {
      value(n) {
        const keys = Object.keys(this);
        return n >= 0 && n < keys.length ? keys[n] : null;
      }
    });
    define(storage, "getItem", {
      value(key) {
        const value = this[key];
        return value ? value : null;
      }
    });
    define(storage, "setItem", {
      value(key, value) {
        const stringValue = String(value);
        this[key] = stringValue;
        transfer(document2, [
          12,
          2,
          location2,
          store(key) + 1,
          store(stringValue) + 1
        ]);
      }
    });
    define(storage, "removeItem", {
      value(key) {
        delete this[key];
        transfer(document2, [
          12,
          2,
          location2,
          store(key) + 1,
          0
        ]);
      }
    });
    define(storage, "clear", {
      value() {
        Object.keys(this).forEach((key) => {
          delete this[key];
        });
        transfer(document2, [
          12,
          2,
          location2,
          0,
          0
        ]);
      }
    });
    return storage;
  }
  __name(createStorage, "createStorage");
  function initializeStorage(document2, localStorageInit, sessionStorageInit) {
    const window = document2.defaultView;
    if (localStorageInit.storage) {
      window.localStorage = createStorage(
        document2,
        0,
        localStorageInit.storage
      );
    } else {
      console.warn(localStorageInit.errorMsg);
    }
    if (sessionStorageInit.storage) {
      window.sessionStorage = createStorage(
        document2,
        1,
        sessionStorageInit.storage
      );
    } else {
      console.warn(sessionStorageInit.errorMsg);
    }
  }
  __name(initializeStorage, "initializeStorage");
  function initialize(document2, strings, hydrateableNode, cssKeys, globalEventHandlerKeys, [innerWidth, innerHeight], localStorageInit, sessionStorageInit) {
    appendKeys(cssKeys);
    appendGlobalEventProperties(globalEventHandlerKeys);
    strings.forEach(store);
    (hydrateableNode[4] || []).forEach(
      (child) => document2.body.appendChild(document2[64](strings, child))
    );
    const window = document2.defaultView;
    window.innerWidth = innerWidth;
    window.innerHeight = innerHeight;
    initializeStorage(document2, localStorageInit, sessionStorageInit);
  }
  __name(initialize, "initialize");
  const frameDuration = 1e3 / 60;
  let last = 0;
  let id = 0;
  let queue = [];
  function scheduleNext() {
    const now = Date.now();
    const next = Math.round(Math.max(0, frameDuration - (Date.now() - last)));
    last = now + next;
    setTimeout(function() {
      var cp = queue.slice(0);
      queue.length = 0;
      for (var i = 0; i < cp.length; i++) {
        if (cp[i].cancelled) {
          continue;
        }
        try {
          cp[i].callback(last);
        } catch (e) {
          setTimeout(function() {
            throw e;
          }, 0);
        }
      }
    }, next);
  }
  __name(scheduleNext, "scheduleNext");
  function rafPolyfill(callback) {
    if (queue.length === 0) {
      scheduleNext();
    }
    if (id === Number.MAX_SAFE_INTEGER) {
      id = 0;
    }
    queue.push({
      handle: ++id,
      callback,
      cancelled: false
    });
    return id;
  }
  __name(rafPolyfill, "rafPolyfill");
  function cafPolyfill(handle) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
        return;
      }
    }
  }
  __name(cafPolyfill, "cafPolyfill");
  const globalScope = {
    innerWidth: 0,
    innerHeight: 0,
    CharacterData,
    Comment,
    DOMTokenList,
    Document,
    DocumentFragment,
    Element,
    HTMLAnchorElement,
    HTMLButtonElement,
    HTMLCanvasElement,
    HTMLDataElement,
    HTMLDataListElement,
    HTMLElement,
    HTMLEmbedElement,
    HTMLFieldSetElement,
    HTMLFormElement,
    HTMLIFrameElement,
    HTMLImageElement,
    HTMLInputElement,
    HTMLLabelElement,
    HTMLLinkElement,
    HTMLMapElement,
    HTMLMeterElement,
    HTMLModElement,
    HTMLOListElement,
    HTMLOptionElement,
    HTMLProgressElement,
    HTMLQuoteElement,
    HTMLScriptElement,
    HTMLSelectElement,
    HTMLSourceElement,
    HTMLStyleElement,
    HTMLTableCellElement,
    HTMLTableColElement,
    HTMLTableElement,
    HTMLTableRowElement,
    HTMLTableSectionElement,
    HTMLTimeElement,
    SVGElement,
    Text,
    Event: Event$1,
    MutationObserver,
    requestAnimationFrame: self.requestAnimationFrame || rafPolyfill,
    cancelAnimationFrame: self.cancelAnimationFrame || cafPolyfill
  };
  const noop = /* @__PURE__ */ __name(() => void 0, "noop");
  const workerDOM = function(postMessage2, addEventListener2, removeEventListener2) {
    const document2 = new Document(globalScope);
    document2.postMessage = postMessage2;
    document2.addGlobalEventListener = addEventListener2;
    document2.removeGlobalEventListener = removeEventListener2;
    globalScope.OffscreenCanvas = self["OffscreenCanvas"];
    globalScope.ImageBitmap = self["ImageBitmap"];
    document2.isConnected = true;
    document2.appendChild(document2.body = document2.createElement("body"));
    return document2.defaultView;
  }(
    postMessage.bind(self) || noop,
    addEventListener.bind(self) || noop,
    removeEventListener.bind(self) || noop
  );
  const hydrate2 = initialize;
  exports.hydrate = hydrate2;
  exports.workerDOM = workerDOM;
  Object.defineProperty(exports, "__esModule", { value: true });
  return exports;
}({});

// js/load.ts
init_define_process();
var load_default = /* @__PURE__ */ __name(async () => {
  const codeSpace2 = location.pathname.slice(1).split("/")[1];
  const {
    mST,
    address
  } = await import(`${location.origin}/live/${codeSpace2}/mST.mjs`);
  run({
    mST,
    dry: false,
    codeSpace: codeSpace2,
    address
  });
}, "default");

// js/react-jsx-runtime.tsx
var paths = location.pathname.split("/");
var codeSpace = paths[2];
var rootEl = document.getElementById(`root`);
var bc = new BroadcastChannel(location.origin);
if (location.pathname.includes("hydrated")) {
  (void 0)(codeSpace, 1);
  bc.onmessage = (event) => {
    if (event.data.codeSpace === codeSpace && location.pathname.includes("dehydrated")) {
      const { html, css } = event.data.sess;
      rootEl.innerHTML = `<style>${css}</style>${html}`;
    } else {
      (void 0)(codeSpace, event.data.sess.i);
    }
  };
} else {
  load_default();
}
