import {
  require_textdiff_create
} from "./chunk-47BKKAP6.mjs";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-XHYF4LCB.mjs";

// ../../node_modules/textdiff-patch/index.js
var require_textdiff_patch = __commonJS({
  "../../node_modules/textdiff-patch/index.js"(exports, module) {
    "use strict";
    module.exports = function(original, delta) {
      var result = "", index = 0;
      for (var i = 0; i < delta.length; i++) {
        var item = delta[i], operation = item[0], value = item[1];
        if (operation == -1) {
          index += value;
        } else if (operation == 0) {
          result += original.slice(index, index += value);
        } else {
          result += value;
        }
      }
      return result;
    };
  }
});

// ../../node_modules/immutable/dist/immutable.es.js
var DELETE = "delete";
var SHIFT = 5;
var SIZE = 1 << SHIFT;
var MASK = SIZE - 1;
var NOT_SET = {};
function MakeRef() {
  return { value: false };
}
function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}
function OwnerID() {
}
function ensureSize(iter) {
  if (iter.size === void 0) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}
function wrapIndex(iter, index) {
  if (typeof index !== "number") {
    var uint32Index = index >>> 0;
    if ("" + uint32Index !== index || uint32Index === 4294967295) {
      return NaN;
    }
    index = uint32Index;
  }
  return index < 0 ? ensureSize(iter) + index : index;
}
function returnTrue() {
  return true;
}
function wholeSlice(begin, end, size) {
  return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
}
function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}
function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}
function resolveIndex(index, size, defaultIndex) {
  return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
}
function isNeg(value) {
  return value < 0 || value === 0 && 1 / value === -Infinity;
}
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
var Collection = function Collection2(value) {
  return isCollection(value) ? value : Seq(value);
};
var KeyedCollection = /* @__PURE__ */ function(Collection3) {
  function KeyedCollection2(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }
  if (Collection3)
    KeyedCollection2.__proto__ = Collection3;
  KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  KeyedCollection2.prototype.constructor = KeyedCollection2;
  return KeyedCollection2;
}(Collection);
var IndexedCollection = /* @__PURE__ */ function(Collection3) {
  function IndexedCollection2(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }
  if (Collection3)
    IndexedCollection2.__proto__ = Collection3;
  IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  IndexedCollection2.prototype.constructor = IndexedCollection2;
  return IndexedCollection2;
}(Collection);
var SetCollection = /* @__PURE__ */ function(Collection3) {
  function SetCollection2(value) {
    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
  }
  if (Collection3)
    SetCollection2.__proto__ = Collection3;
  SetCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  SetCollection2.prototype.constructor = SetCollection2;
  return SetCollection2;
}(Collection);
Collection.Keyed = KeyedCollection;
Collection.Indexed = IndexedCollection;
Collection.Set = SetCollection;
var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;
var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
var Iterator = function Iterator2(next) {
  this.next = next;
};
Iterator.prototype.toString = function toString() {
  return "[Iterator]";
};
Iterator.KEYS = ITERATE_KEYS;
Iterator.VALUES = ITERATE_VALUES;
Iterator.ENTRIES = ITERATE_ENTRIES;
Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
  return this.toString();
};
Iterator.prototype[ITERATOR_SYMBOL] = function() {
  return this;
};
function iteratorValue(type, k, v, iteratorResult) {
  var value = type === 0 ? k : type === 1 ? v : [k, v];
  iteratorResult ? iteratorResult.value = value : iteratorResult = {
    value,
    done: false
  };
  return iteratorResult;
}
function iteratorDone() {
  return { value: void 0, done: true };
}
function hasIterator(maybeIterable) {
  if (Array.isArray(maybeIterable)) {
    return true;
  }
  return !!getIteratorFn(maybeIterable);
}
function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === "function";
}
function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}
function getIteratorFn(iterable) {
  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === "function") {
    return iteratorFn;
  }
}
function isEntriesIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.entries;
}
function isKeysIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.keys;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === "string") {
    return true;
  }
  return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? Object.keys(value).length === 1 : value.hasOwnProperty(value.length - 1));
}
var Seq = /* @__PURE__ */ function(Collection3) {
  function Seq2(value) {
    return value === null || value === void 0 ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
  }
  if (Collection3)
    Seq2.__proto__ = Collection3;
  Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
  Seq2.prototype.constructor = Seq2;
  Seq2.prototype.toSeq = function toSeq3() {
    return this;
  };
  Seq2.prototype.toString = function toString5() {
    return this.__toString("Seq {", "}");
  };
  Seq2.prototype.cacheResult = function cacheResult() {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };
  Seq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      while (i !== size) {
        var entry = cache[reverse3 ? size - ++i : i++];
        if (fn(entry[1], entry[0], this) === false) {
          break;
        }
      }
      return i;
    }
    return this.__iterateUncached(fn, reverse3);
  };
  Seq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      return new Iterator(function() {
        if (i === size) {
          return iteratorDone();
        }
        var entry = cache[reverse3 ? size - ++i : i++];
        return iteratorValue(type, entry[0], entry[1]);
      });
    }
    return this.__iteratorUncached(type, reverse3);
  };
  return Seq2;
}(Collection);
var KeyedSeq = /* @__PURE__ */ function(Seq2) {
  function KeyedSeq2(value) {
    return value === null || value === void 0 ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
  }
  if (Seq2)
    KeyedSeq2.__proto__ = Seq2;
  KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  KeyedSeq2.prototype.constructor = KeyedSeq2;
  KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq3() {
    return this;
  };
  return KeyedSeq2;
}(Seq);
var IndexedSeq = /* @__PURE__ */ function(Seq2) {
  function IndexedSeq2(value) {
    return value === null || value === void 0 ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
  }
  if (Seq2)
    IndexedSeq2.__proto__ = Seq2;
  IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  IndexedSeq2.prototype.constructor = IndexedSeq2;
  IndexedSeq2.of = function of() {
    return IndexedSeq2(arguments);
  };
  IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq2() {
    return this;
  };
  IndexedSeq2.prototype.toString = function toString5() {
    return this.__toString("Seq [", "]");
  };
  return IndexedSeq2;
}(Seq);
var SetSeq = /* @__PURE__ */ function(Seq2) {
  function SetSeq2(value) {
    return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
  }
  if (Seq2)
    SetSeq2.__proto__ = Seq2;
  SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  SetSeq2.prototype.constructor = SetSeq2;
  SetSeq2.of = function of() {
    return SetSeq2(arguments);
  };
  SetSeq2.prototype.toSetSeq = function toSetSeq2() {
    return this;
  };
  return SetSeq2;
}(Seq);
Seq.isSeq = isSeq;
Seq.Keyed = KeyedSeq;
Seq.Set = SetSeq;
Seq.Indexed = IndexedSeq;
Seq.prototype[IS_SEQ_SYMBOL] = true;
var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
  function ArraySeq2(array) {
    this._array = array;
    this.size = array.length;
  }
  if (IndexedSeq2)
    ArraySeq2.__proto__ = IndexedSeq2;
  ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ArraySeq2.prototype.constructor = ArraySeq2;
  ArraySeq2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };
  ArraySeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    while (i !== size) {
      var ii = reverse3 ? size - ++i : i++;
      if (fn(array[ii], ii, this) === false) {
        break;
      }
    }
    return i;
  };
  ArraySeq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var ii = reverse3 ? size - ++i : i++;
      return iteratorValue(type, ii, array[ii]);
    });
  };
  return ArraySeq2;
}(IndexedSeq);
var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
  function ObjectSeq2(object) {
    var keys2 = Object.keys(object);
    this._object = object;
    this._keys = keys2;
    this.size = keys2.length;
  }
  if (KeyedSeq2)
    ObjectSeq2.__proto__ = KeyedSeq2;
  ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ObjectSeq2.prototype.constructor = ObjectSeq2;
  ObjectSeq2.prototype.get = function get11(key, notSetValue) {
    if (notSetValue !== void 0 && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };
  ObjectSeq2.prototype.has = function has5(key) {
    return hasOwnProperty.call(this._object, key);
  };
  ObjectSeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    while (i !== size) {
      var key = keys2[reverse3 ? size - ++i : i++];
      if (fn(object[key], key, this) === false) {
        break;
      }
    }
    return i;
  };
  ObjectSeq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var key = keys2[reverse3 ? size - ++i : i++];
      return iteratorValue(type, key, object[key]);
    });
  };
  return ObjectSeq2;
}(KeyedSeq);
ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
  function CollectionSeq2(collection) {
    this._collection = collection;
    this.size = collection.length || collection.size;
  }
  if (IndexedSeq2)
    CollectionSeq2.__proto__ = IndexedSeq2;
  CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  CollectionSeq2.prototype.constructor = CollectionSeq2;
  CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };
  CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };
  return CollectionSeq2;
}(IndexedSeq);
var EMPTY_SEQ;
function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}
function keyedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq.fromEntrySeq();
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + value);
}
function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError("Expected Array or collection object of values: " + value);
}
function seqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + value);
}
function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
}
var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
function isValueObject(maybeValue) {
  return Boolean(maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function");
}
function is(valueA, valueB) {
  if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
}
var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
  a |= 0;
  b |= 0;
  var c = a & 65535;
  var d = b & 65535;
  return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
};
function smi(i32) {
  return i32 >>> 1 & 1073741824 | i32 & 3221225471;
}
var defaultValueOf = Object.prototype.valueOf;
function hash(o) {
  if (o == null) {
    return hashNullish(o);
  }
  if (typeof o.hashCode === "function") {
    return smi(o.hashCode(o));
  }
  var v = valueOf(o);
  if (v == null) {
    return hashNullish(v);
  }
  switch (typeof v) {
    case "boolean":
      return v ? 1108378657 : 1108378656;
    case "number":
      return hashNumber(v);
    case "string":
      return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
    case "object":
    case "function":
      return hashJSObj(v);
    case "symbol":
      return hashSymbol(v);
    default:
      if (typeof v.toString === "function") {
        return hashString(v.toString());
      }
      throw new Error("Value type " + typeof v + " cannot be hashed.");
  }
}
function hashNullish(nullish) {
  return nullish === null ? 1108378658 : 1108378659;
}
function hashNumber(n) {
  if (n !== n || n === Infinity) {
    return 0;
  }
  var hash2 = n | 0;
  if (hash2 !== n) {
    hash2 ^= n * 4294967295;
  }
  while (n > 4294967295) {
    n /= 4294967295;
    hash2 ^= n;
  }
  return smi(hash2);
}
function cachedHashString(string) {
  var hashed = stringHashCache[string];
  if (hashed === void 0) {
    hashed = hashString(string);
    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
      STRING_HASH_CACHE_SIZE = 0;
      stringHashCache = {};
    }
    STRING_HASH_CACHE_SIZE++;
    stringHashCache[string] = hashed;
  }
  return hashed;
}
function hashString(string) {
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
  }
  return smi(hashed);
}
function hashSymbol(sym) {
  var hashed = symbolMap[sym];
  if (hashed !== void 0) {
    return hashed;
  }
  hashed = nextHash();
  symbolMap[sym] = hashed;
  return hashed;
}
function hashJSObj(obj) {
  var hashed;
  if (usingWeakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = obj[UID_HASH_KEY];
  if (hashed !== void 0) {
    return hashed;
  }
  if (!canDefineProperty) {
    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = getIENodeHash(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = nextHash();
  if (usingWeakMap) {
    weakMap.set(obj, hashed);
  } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
    throw new Error("Non-extensible objects are not allowed as keys.");
  } else if (canDefineProperty) {
    Object.defineProperty(obj, UID_HASH_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: hashed
    });
  } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
    obj.propertyIsEnumerable = function() {
      return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
    };
    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
  } else if (obj.nodeType !== void 0) {
    obj[UID_HASH_KEY] = hashed;
  } else {
    throw new Error("Unable to set a non-enumerable property on object.");
  }
  return hashed;
}
var isExtensible = Object.isExtensible;
var canDefineProperty = function() {
  try {
    Object.defineProperty({}, "@", {});
    return true;
  } catch (e) {
    return false;
  }
}();
function getIENodeHash(node) {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1:
        return node.uniqueID;
      case 9:
        return node.documentElement && node.documentElement.uniqueID;
    }
  }
}
function valueOf(obj) {
  return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
}
function nextHash() {
  var nextHash2 = ++_objHashUID;
  if (_objHashUID & 1073741824) {
    _objHashUID = 0;
  }
  return nextHash2;
}
var usingWeakMap = typeof WeakMap === "function";
var weakMap;
if (usingWeakMap) {
  weakMap = /* @__PURE__ */ new WeakMap();
}
var symbolMap = /* @__PURE__ */ Object.create(null);
var _objHashUID = 0;
var UID_HASH_KEY = "__immutablehash__";
if (typeof Symbol === "function") {
  UID_HASH_KEY = Symbol(UID_HASH_KEY);
}
var STRING_HASH_CACHE_MIN_STRLEN = 16;
var STRING_HASH_CACHE_MAX_SIZE = 255;
var STRING_HASH_CACHE_SIZE = 0;
var stringHashCache = {};
var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
  function ToKeyedSequence2(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }
  if (KeyedSeq2)
    ToKeyedSequence2.__proto__ = KeyedSeq2;
  ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
  ToKeyedSequence2.prototype.get = function get11(key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };
  ToKeyedSequence2.prototype.has = function has5(key) {
    return this._iter.has(key);
  };
  ToKeyedSequence2.prototype.valueSeq = function valueSeq2() {
    return this._iter.valueSeq();
  };
  ToKeyedSequence2.prototype.reverse = function reverse3() {
    var this$1$1 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };
  ToKeyedSequence2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };
  ToKeyedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v, k) {
      return fn(v, k, this$1$1);
    }, reverse3);
  };
  ToKeyedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._iter.__iterator(type, reverse3);
  };
  return ToKeyedSequence2;
}(KeyedSeq);
ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
  function ToIndexedSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (IndexedSeq2)
    ToIndexedSequence2.__proto__ = IndexedSeq2;
  ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
  ToIndexedSequence2.prototype.includes = function includes3(value) {
    return this._iter.includes(value);
  };
  ToIndexedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var i = 0;
    reverse3 && ensureSize(this);
    return this._iter.__iterate(function(v) {
      return fn(v, reverse3 ? this$1$1.size - ++i : i++, this$1$1);
    }, reverse3);
  };
  ToIndexedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var this$1$1 = this;
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    var i = 0;
    reverse3 && ensureSize(this);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse3 ? this$1$1.size - ++i : i++, step.value, step);
    });
  };
  return ToIndexedSequence2;
}(IndexedSeq);
var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
  function ToSetSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (SetSeq2)
    ToSetSequence2.__proto__ = SetSeq2;
  ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
  ToSetSequence2.prototype.constructor = ToSetSequence2;
  ToSetSequence2.prototype.has = function has5(key) {
    return this._iter.includes(key);
  };
  ToSetSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v) {
      return fn(v, v, this$1$1);
    }, reverse3);
  };
  ToSetSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };
  return ToSetSequence2;
}(SetSeq);
var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
  function FromEntriesSequence2(entries3) {
    this._iter = entries3;
    this.size = entries3.size;
  }
  if (KeyedSeq2)
    FromEntriesSequence2.__proto__ = KeyedSeq2;
  FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
  FromEntriesSequence2.prototype.entrySeq = function entrySeq2() {
    return this._iter.toSeq();
  };
  FromEntriesSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(entry) {
      if (entry) {
        validateEntry(entry);
        var indexedCollection = isCollection(entry);
        return fn(indexedCollection ? entry.get(1) : entry[1], indexedCollection ? entry.get(0) : entry[0], this$1$1);
      }
    }, reverse3);
  };
  FromEntriesSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return iteratorValue(type, indexedCollection ? entry.get(0) : entry[0], indexedCollection ? entry.get(1) : entry[1], step);
        }
      }
    });
  };
  return FromEntriesSequence2;
}(KeyedSeq);
ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
function flipFactory(collection) {
  var flipSequence = makeSequence(collection);
  flipSequence._iter = collection;
  flipSequence.size = collection.size;
  flipSequence.flip = function() {
    return collection;
  };
  flipSequence.reverse = function() {
    var reversedSequence = collection.reverse.apply(this);
    reversedSequence.flip = function() {
      return collection.reverse();
    };
    return reversedSequence;
  };
  flipSequence.has = function(key) {
    return collection.includes(key);
  };
  flipSequence.includes = function(key) {
    return collection.has(key);
  };
  flipSequence.cacheResult = cacheResultThrough;
  flipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k) {
      return fn(k, v, this$1$1) !== false;
    }, reverse3);
  };
  flipSequence.__iteratorUncached = function(type, reverse3) {
    if (type === ITERATE_ENTRIES) {
      var iterator = collection.__iterator(type, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (!step.done) {
          var k = step.value[0];
          step.value[0] = step.value[1];
          step.value[1] = k;
        }
        return step;
      });
    }
    return collection.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse3);
  };
  return flipSequence;
}
function mapFactory(collection, mapper, context) {
  var mappedSequence = makeSequence(collection);
  mappedSequence.size = collection.size;
  mappedSequence.has = function(key) {
    return collection.has(key);
  };
  mappedSequence.get = function(key, notSetValue) {
    var v = collection.get(key, NOT_SET);
    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
  };
  mappedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k, c) {
      return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
    }, reverse3);
  };
  mappedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var key = entry[0];
      return iteratorValue(type, key, mapper.call(context, entry[1], key, collection), step);
    });
  };
  return mappedSequence;
}
function reverseFactory(collection, useKeys) {
  var this$1$1 = this;
  var reversedSequence = makeSequence(collection);
  reversedSequence._iter = collection;
  reversedSequence.size = collection.size;
  reversedSequence.reverse = function() {
    return collection;
  };
  if (collection.flip) {
    reversedSequence.flip = function() {
      var flipSequence = flipFactory(collection);
      flipSequence.reverse = function() {
        return collection.flip();
      };
      return flipSequence;
    };
  }
  reversedSequence.get = function(key, notSetValue) {
    return collection.get(useKeys ? key : -1 - key, notSetValue);
  };
  reversedSequence.has = function(key) {
    return collection.has(useKeys ? key : -1 - key);
  };
  reversedSequence.includes = function(value) {
    return collection.includes(value);
  };
  reversedSequence.cacheResult = cacheResultThrough;
  reversedSequence.__iterate = function(fn, reverse3) {
    var this$1$12 = this;
    var i = 0;
    reverse3 && ensureSize(collection);
    return collection.__iterate(function(v, k) {
      return fn(v, useKeys ? k : reverse3 ? this$1$12.size - ++i : i++, this$1$12);
    }, !reverse3);
  };
  reversedSequence.__iterator = function(type, reverse3) {
    var i = 0;
    reverse3 && ensureSize(collection);
    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      return iteratorValue(type, useKeys ? entry[0] : reverse3 ? this$1$1.size - ++i : i++, entry[1], step);
    });
  };
  return reversedSequence;
}
function filterFactory(collection, predicate, context, useKeys) {
  var filterSequence = makeSequence(collection);
  if (useKeys) {
    filterSequence.has = function(key) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
    };
    filterSequence.get = function(key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
    };
  }
  filterSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    }, reverse3);
    return iterations;
  };
  filterSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterations = 0;
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        var value = entry[1];
        if (predicate.call(context, value, key, collection)) {
          return iteratorValue(type, useKeys ? key : iterations++, value, step);
        }
      }
    });
  };
  return filterSequence;
}
function countByFactory(collection, grouper, context) {
  var groups = Map().asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function(a) {
      return a + 1;
    });
  });
  return groups.asImmutable();
}
function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), function(a) {
      return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
    });
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  }).asImmutable();
}
function sliceFactory(collection, begin, end, useKeys) {
  var originalSize = collection.size;
  if (wholeSlice(begin, end, originalSize)) {
    return collection;
  }
  var resolvedBegin = resolveBegin(begin, originalSize);
  var resolvedEnd = resolveEnd(end, originalSize);
  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
  }
  var resolvedSize = resolvedEnd - resolvedBegin;
  var sliceSize;
  if (resolvedSize === resolvedSize) {
    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
  }
  var sliceSeq = makeSequence(collection);
  sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
    sliceSeq.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
    };
  }
  sliceSeq.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (sliceSize === 0) {
      return 0;
    }
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var skipped = 0;
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k) {
      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
      }
    });
    return iterations;
  };
  sliceSeq.__iteratorUncached = function(type, reverse3) {
    if (sliceSize !== 0 && reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    if (sliceSize === 0) {
      return new Iterator(iteratorDone);
    }
    var iterator = collection.__iterator(type, reverse3);
    var skipped = 0;
    var iterations = 0;
    return new Iterator(function() {
      while (skipped++ < resolvedBegin) {
        iterator.next();
      }
      if (++iterations > sliceSize) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (useKeys || type === ITERATE_VALUES || step.done) {
        return step;
      }
      if (type === ITERATE_KEYS) {
        return iteratorValue(type, iterations - 1, void 0, step);
      }
      return iteratorValue(type, iterations - 1, step.value[1], step);
    });
  };
  return sliceSeq;
}
function takeWhileFactory(collection, predicate, context) {
  var takeSequence = makeSequence(collection);
  takeSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
    });
    return iterations;
  };
  takeSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterating = true;
    return new Iterator(function() {
      if (!iterating) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var k = entry[0];
      var v = entry[1];
      if (!predicate.call(context, v, k, this$1$1)) {
        iterating = false;
        return iteratorDone();
      }
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return takeSequence;
}
function skipWhileFactory(collection, predicate, context, useKeys) {
  var skipSequence = makeSequence(collection);
  skipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    });
    return iterations;
  };
  skipSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var skipping = true;
    var iterations = 0;
    return new Iterator(function() {
      var step;
      var k;
      var v;
      do {
        step = iterator.next();
        if (step.done) {
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          }
          if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations++, void 0, step);
          }
          return iteratorValue(type, iterations++, step.value[1], step);
        }
        var entry = step.value;
        k = entry[0];
        v = entry[1];
        skipping && (skipping = predicate.call(context, v, k, this$1$1));
      } while (skipping);
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return skipSequence;
}
function concatFactory(collection, values2) {
  var isKeyedCollection = isKeyed(collection);
  var iters = [collection].concat(values2).map(function(v) {
    if (!isCollection(v)) {
      v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
    } else if (isKeyedCollection) {
      v = KeyedCollection(v);
    }
    return v;
  }).filter(function(v) {
    return v.size !== 0;
  });
  if (iters.length === 0) {
    return collection;
  }
  if (iters.length === 1) {
    var singleton = iters[0];
    if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
      return singleton;
    }
  }
  var concatSeq = new ArraySeq(iters);
  if (isKeyedCollection) {
    concatSeq = concatSeq.toKeyedSeq();
  } else if (!isIndexed(collection)) {
    concatSeq = concatSeq.toSetSeq();
  }
  concatSeq = concatSeq.flatten(true);
  concatSeq.size = iters.reduce(function(sum, seq) {
    if (sum !== void 0) {
      var size = seq.size;
      if (size !== void 0) {
        return sum + size;
      }
    }
  }, 0);
  return concatSeq;
}
function flattenFactory(collection, depth, useKeys) {
  var flatSequence = makeSequence(collection);
  flatSequence.__iterateUncached = function(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    var stopped = false;
    function flatDeep(iter, currentDepth) {
      iter.__iterate(function(v, k) {
        if ((!depth || currentDepth < depth) && isCollection(v)) {
          flatDeep(v, currentDepth + 1);
        } else {
          iterations++;
          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
            stopped = true;
          }
        }
        return !stopped;
      }, reverse3);
    }
    flatDeep(collection, 0);
    return iterations;
  };
  flatSequence.__iteratorUncached = function(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(type, reverse3);
    var stack = [];
    var iterations = 0;
    return new Iterator(function() {
      while (iterator) {
        var step = iterator.next();
        if (step.done !== false) {
          iterator = stack.pop();
          continue;
        }
        var v = step.value;
        if (type === ITERATE_ENTRIES) {
          v = v[1];
        }
        if ((!depth || stack.length < depth) && isCollection(v)) {
          stack.push(iterator);
          iterator = v.__iterator(type, reverse3);
        } else {
          return useKeys ? step : iteratorValue(type, iterations++, v, step);
        }
      }
      return iteratorDone();
    });
  };
  return flatSequence;
}
function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection.toSeq().map(function(v, k) {
    return coerce(mapper.call(context, v, k, collection));
  }).flatten(true);
}
function interposeFactory(collection, separator) {
  var interposedSequence = makeSequence(collection);
  interposedSequence.size = collection.size && collection.size * 2 - 1;
  interposedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v) {
      return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
    }, reverse3);
    return iterations;
  };
  interposedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_VALUES, reverse3);
    var iterations = 0;
    var step;
    return new Iterator(function() {
      if (!step || iterations % 2) {
        step = iterator.next();
        if (step.done) {
          return step;
        }
      }
      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
    });
  };
  return interposedSequence;
}
function sortFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  var isKeyedCollection = isKeyed(collection);
  var index = 0;
  var entries3 = collection.toSeq().map(function(v, k) {
    return [k, v, index++, mapper ? mapper(v, k, collection) : v];
  }).valueSeq().toArray();
  entries3.sort(function(a, b) {
    return comparator(a[3], b[3]) || a[2] - b[2];
  }).forEach(isKeyedCollection ? function(v, i) {
    entries3[i].length = 2;
  } : function(v, i) {
    entries3[i] = v[1];
  });
  return isKeyedCollection ? KeyedSeq(entries3) : isIndexed(collection) ? IndexedSeq(entries3) : SetSeq(entries3);
}
function maxFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  if (mapper) {
    var entry = collection.toSeq().map(function(v, k) {
      return [v, mapper(v, k, collection)];
    }).reduce(function(a, b) {
      return maxCompare(comparator, a[1], b[1]) ? b : a;
    });
    return entry && entry[0];
  }
  return collection.reduce(function(a, b) {
    return maxCompare(comparator, a, b) ? b : a;
  });
}
function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
}
function zipWithFactory(keyIter, zipper, iters, zipAll2) {
  var zipSequence = makeSequence(keyIter);
  var sizes = new ArraySeq(iters).map(function(i) {
    return i.size;
  });
  zipSequence.size = zipAll2 ? sizes.max() : sizes.min();
  zipSequence.__iterate = function(fn, reverse3) {
    var iterator = this.__iterator(ITERATE_VALUES, reverse3);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      if (fn(step.value, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };
  zipSequence.__iteratorUncached = function(type, reverse3) {
    var iterators = iters.map(function(i) {
      return i = Collection(i), getIterator(reverse3 ? i.reverse() : i);
    });
    var iterations = 0;
    var isDone = false;
    return new Iterator(function() {
      var steps;
      if (!isDone) {
        steps = iterators.map(function(i) {
          return i.next();
        });
        isDone = zipAll2 ? steps.every(function(s) {
          return s.done;
        }) : steps.some(function(s) {
          return s.done;
        });
      }
      if (isDone) {
        return iteratorDone();
      }
      return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function(s) {
        return s.value;
      })));
    });
  };
  return zipSequence;
}
function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}
function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError("Expected [K, V] tuple: " + entry);
  }
}
function collectionClass(collection) {
  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
}
function makeSequence(collection) {
  return Object.create((isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype);
}
function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}
function defaultComparator(a, b) {
  if (a === void 0 && b === void 0) {
    return 0;
  }
  if (a === void 0) {
    return 1;
  }
  if (b === void 0) {
    return -1;
  }
  return a > b ? 1 : a < b ? -1 : 0;
}
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
function invariant(condition, error) {
  if (!condition) {
    throw new Error(error);
  }
}
function assertNotInfinite(size) {
  invariant(size !== Infinity, "Cannot perform this action with an infinite size.");
}
function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== "string") {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + keyPath);
}
var toString2 = Object.prototype.toString;
function isPlainObject(value) {
  if (!value || typeof value !== "object" || toString2.call(value) !== "[object Object]") {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  var parentProto = proto;
  var nextProto = Object.getPrototypeOf(proto);
  while (nextProto !== null) {
    parentProto = nextProto;
    nextProto = Object.getPrototypeOf(parentProto);
  }
  return parentProto === proto;
}
function isDataStructure(value) {
  return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
}
function quoteString(value) {
  try {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
function has(collection, key) {
  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}
function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
}
function shallowCopy(from) {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  var to = {};
  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}
function remove(collection, key) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot update non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    if (!collection.remove) {
      throw new TypeError("Cannot update immutable value without .remove() method: " + collection);
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) {
    collectionCopy.splice(key, 1);
  } else {
    delete collectionCopy[key];
  }
  return collectionCopy;
}
function set(collection, key, value) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot update non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    if (!collection.set) {
      throw new TypeError("Cannot update immutable value without .set() method: " + collection);
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
}
function updateIn$1(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = void 0;
  }
  var updatedValue = updateInDeeply(isImmutable(collection), collection, coerceKeyPath(keyPath), 0, notSetValue, updater);
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}
function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
  var wasNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    var existingValue = wasNotSet ? notSetValue : existing;
    var newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError("Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing);
  }
  var key = keyPath[i];
  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  var nextUpdated = updateInDeeply(nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting), nextExisting, keyPath, i + 1, notSetValue, updater);
  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(wasNotSet ? inImmutable ? emptyMap() : {} : existing, key, nextUpdated);
}
function setIn$1(collection, keyPath, value) {
  return updateIn$1(collection, keyPath, NOT_SET, function() {
    return value;
  });
}
function setIn(keyPath, v) {
  return setIn$1(this, keyPath, v);
}
function removeIn(collection, keyPath) {
  return updateIn$1(collection, keyPath, function() {
    return NOT_SET;
  });
}
function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}
function update$1(collection, key, notSetValue, updater) {
  return updateIn$1(collection, [key], notSetValue, updater);
}
function update(key, notSetValue, updater) {
  return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
}
function updateIn(keyPath, notSetValue, updater) {
  return updateIn$1(this, keyPath, notSetValue, updater);
}
function merge$1() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeIntoKeyedWith(this, iters);
}
function mergeWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  if (typeof merger !== "function") {
    throw new TypeError("Invalid merger function: " + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}
function mergeIntoKeyedWith(collection, collections, merger) {
  var iters = [];
  for (var ii = 0; ii < collections.length; ii++) {
    var collection$1 = KeyedCollection(collections[ii]);
    if (collection$1.size !== 0) {
      iters.push(collection$1);
    }
  }
  if (iters.length === 0) {
    return collection;
  }
  if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(function(collection2) {
    var mergeIntoCollection = merger ? function(value, key) {
      update$1(collection2, key, NOT_SET, function(oldVal) {
        return oldVal === NOT_SET ? value : merger(oldVal, value, key);
      });
    } : function(value, key) {
      collection2.set(key, value);
    };
    for (var ii2 = 0; ii2 < iters.length; ii2++) {
      iters[ii2].forEach(mergeIntoCollection);
    }
  });
}
function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}
function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot merge into non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
  }
  var isArray = Array.isArray(collection);
  var merged = collection;
  var Collection3 = isArray ? IndexedCollection : KeyedCollection;
  var mergeItem = isArray ? function(value) {
    if (merged === collection) {
      merged = shallowCopy(merged);
    }
    merged.push(value);
  } : function(value, key) {
    var hasVal = hasOwnProperty.call(merged, key);
    var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
    if (!hasVal || nextVal !== merged[key]) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged[key] = nextVal;
    }
  };
  for (var i = 0; i < sources.length; i++) {
    Collection3(sources[i]).forEach(mergeItem);
  }
  return merged;
}
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
  }
  return deepMerger;
}
function areMergeable(oldDataStructure, newDataStructure) {
  var oldSeq = Seq(oldDataStructure);
  var newSeq = Seq(newDataStructure);
  return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
}
function mergeDeep() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeDeepWithSources(this, iters);
}
function mergeDeepWith(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return mergeDeepWithSources(this, iters, merger);
}
function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeWithSources(m, iters);
  });
}
function mergeDeepIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeDeepWithSources(m, iters);
  });
}
function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
function asImmutable() {
  return this.__ensureOwner();
}
function wasAltered() {
  return this.__altered;
}
var Map = /* @__PURE__ */ function(KeyedCollection2) {
  function Map2(value) {
    return value === null || value === void 0 ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
      var iter = KeyedCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (KeyedCollection2)
    Map2.__proto__ = KeyedCollection2;
  Map2.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
  Map2.prototype.constructor = Map2;
  Map2.of = function of() {
    var keyValues = [], len = arguments.length;
    while (len--)
      keyValues[len] = arguments[len];
    return emptyMap().withMutations(function(map2) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error("Missing value for key: " + keyValues[i]);
        }
        map2.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };
  Map2.prototype.toString = function toString5() {
    return this.__toString("Map {", "}");
  };
  Map2.prototype.get = function get11(k, notSetValue) {
    return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
  };
  Map2.prototype.set = function set3(k, v) {
    return updateMap(this, k, v);
  };
  Map2.prototype.remove = function remove3(k) {
    return updateMap(this, k, NOT_SET);
  };
  Map2.prototype.deleteAll = function deleteAll(keys2) {
    var collection = Collection(keys2);
    if (collection.size === 0) {
      return this;
    }
    return this.withMutations(function(map2) {
      collection.forEach(function(key) {
        return map2.remove(key);
      });
    });
  };
  Map2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };
  Map2.prototype.sort = function sort2(comparator) {
    return OrderedMap(sortFactory(this, comparator));
  };
  Map2.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedMap(sortFactory(this, comparator, mapper));
  };
  Map2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(map3) {
      map3.forEach(function(value, key) {
        map3.set(key, mapper.call(context, value, key, this$1$1));
      });
    });
  };
  Map2.prototype.__iterator = function __iterator2(type, reverse3) {
    return new MapIterator(this, type, reverse3);
  };
  Map2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    this._root && this._root.iterate(function(entry) {
      iterations++;
      return fn(entry[1], entry[0], this$1$1);
    }, reverse3);
    return iterations;
  };
  Map2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };
  return Map2;
}(KeyedCollection);
Map.isMap = isMap;
var MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;
MapPrototype[DELETE] = MapPrototype.remove;
MapPrototype.removeAll = MapPrototype.deleteAll;
MapPrototype.setIn = setIn;
MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
MapPrototype.update = update;
MapPrototype.updateIn = updateIn;
MapPrototype.merge = MapPrototype.concat = merge$1;
MapPrototype.mergeWith = mergeWith$1;
MapPrototype.mergeDeep = mergeDeep;
MapPrototype.mergeDeepWith = mergeDeepWith;
MapPrototype.mergeIn = mergeIn;
MapPrototype.mergeDeepIn = mergeDeepIn;
MapPrototype.withMutations = withMutations;
MapPrototype.wasAltered = wasAltered;
MapPrototype.asImmutable = asImmutable;
MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
MapPrototype["@@transducer/step"] = function(result, arr) {
  return result.set(arr[0], arr[1]);
};
MapPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var ArrayMapNode = function ArrayMapNode2(ownerID, entries3) {
  this.ownerID = ownerID;
  this.entries = entries3;
};
ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && entries3.length === 1) {
    return;
  }
  if (!exists && !removed && entries3.length >= MAX_ARRAY_MAP_SIZE) {
    return createNodes(ownerID, entries3, key, value);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new ArrayMapNode(ownerID, newEntries);
};
var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
  this.ownerID = ownerID;
  this.bitmap = bitmap;
  this.nodes = nodes;
};
BitmapIndexedNode.prototype.get = function get3(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
  var bitmap = this.bitmap;
  return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
};
BitmapIndexedNode.prototype.update = function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var bit = 1 << keyHashFrag;
  var bitmap = this.bitmap;
  var exists = (bitmap & bit) !== 0;
  if (!exists && value === NOT_SET) {
    return this;
  }
  var idx = popCount(bitmap & bit - 1);
  var nodes = this.nodes;
  var node = exists ? nodes[idx] : void 0;
  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
  if (newNode === node) {
    return this;
  }
  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
  }
  if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
    return nodes[idx ^ 1];
  }
  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
    return newNode;
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
  var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.bitmap = newBitmap;
    this.nodes = newNodes;
    return this;
  }
  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
};
var HashArrayMapNode = function HashArrayMapNode2(ownerID, count2, nodes) {
  this.ownerID = ownerID;
  this.count = count2;
  this.nodes = nodes;
};
HashArrayMapNode.prototype.get = function get4(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var node = this.nodes[idx];
  return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
};
HashArrayMapNode.prototype.update = function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var removed = value === NOT_SET;
  var nodes = this.nodes;
  var node = nodes[idx];
  if (removed && !node) {
    return this;
  }
  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
  if (newNode === node) {
    return this;
  }
  var newCount = this.count;
  if (!node) {
    newCount++;
  } else if (!newNode) {
    newCount--;
    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
      return packNodes(ownerID, nodes, newCount, idx);
    }
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newNodes = setAt(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.count = newCount;
    this.nodes = newNodes;
    return this;
  }
  return new HashArrayMapNode(ownerID, newCount, newNodes);
};
var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries3) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entries = entries3;
};
HashCollisionNode.prototype.get = function get5(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
HashCollisionNode.prototype.update = function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var removed = value === NOT_SET;
  if (keyHash !== this.keyHash) {
    if (removed) {
      return this;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
  }
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && len === 2) {
    return new ValueNode(ownerID, this.keyHash, entries3[idx ^ 1]);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
};
var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
};
ValueNode.prototype.get = function get6(shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
};
ValueNode.prototype.update = function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var keyMatch = is(key, this.entry[0]);
  if (keyMatch ? value === this.entry[1] : removed) {
    return this;
  }
  SetRef(didAlter);
  if (removed) {
    SetRef(didChangeSize);
    return;
  }
  if (keyMatch) {
    if (ownerID && ownerID === this.ownerID) {
      this.entry[1] = value;
      return this;
    }
    return new ValueNode(ownerID, this.keyHash, [key, value]);
  }
  SetRef(didChangeSize);
  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
};
ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse3) {
  var entries3 = this.entries;
  for (var ii = 0, maxIndex = entries3.length - 1; ii <= maxIndex; ii++) {
    if (fn(entries3[reverse3 ? maxIndex - ii : ii]) === false) {
      return false;
    }
  }
};
BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse3) {
  var nodes = this.nodes;
  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
    var node = nodes[reverse3 ? maxIndex - ii : ii];
    if (node && node.iterate(fn, reverse3) === false) {
      return false;
    }
  }
};
ValueNode.prototype.iterate = function(fn, reverse3) {
  return fn(this.entry);
};
var MapIterator = /* @__PURE__ */ function(Iterator3) {
  function MapIterator2(map2, type, reverse3) {
    this._type = type;
    this._reverse = reverse3;
    this._stack = map2._root && mapIteratorFrame(map2._root);
  }
  if (Iterator3)
    MapIterator2.__proto__ = Iterator3;
  MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
  MapIterator2.prototype.constructor = MapIterator2;
  MapIterator2.prototype.next = function next() {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex = void 0;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };
  return MapIterator2;
}(Iterator);
function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}
function mapIteratorFrame(node, prev) {
  return {
    node,
    index: 0,
    __prev: prev
  };
}
function makeMap(size, root, ownerID, hash2) {
  var map2 = Object.create(MapPrototype);
  map2.size = size;
  map2._root = root;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
var EMPTY_MAP;
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}
function updateMap(map2, k, v) {
  var newRoot;
  var newSize;
  if (!map2._root) {
    if (v === NOT_SET) {
      return map2;
    }
    newSize = 1;
    newRoot = new ArrayMapNode(map2.__ownerID, [[k, v]]);
  } else {
    var didChangeSize = MakeRef();
    var didAlter = MakeRef();
    newRoot = updateNode(map2._root, map2.__ownerID, 0, void 0, k, v, didChangeSize, didAlter);
    if (!didAlter.value) {
      return map2;
    }
    newSize = map2.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
  }
  if (map2.__ownerID) {
    map2.size = newSize;
    map2._root = newRoot;
    map2.__hash = void 0;
    map2.__altered = true;
    return map2;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
}
function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (!node) {
    if (value === NOT_SET) {
      return node;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return new ValueNode(ownerID, keyHash, [key, value]);
  }
  return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
}
function isLeafNode(node) {
  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
}
function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
  if (node.keyHash === keyHash) {
    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
  }
  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var newNode;
  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
  return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
}
function createNodes(ownerID, entries3, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries3.length; ii++) {
    var entry = entries3[ii];
    node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
  }
  return node;
}
function packNodes(ownerID, nodes, count2, excluding) {
  var bitmap = 0;
  var packedII = 0;
  var packedNodes = new Array(count2);
  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
    var node = nodes[ii];
    if (node !== void 0 && ii !== excluding) {
      bitmap |= bit;
      packedNodes[packedII++] = node;
    }
  }
  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
}
function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count2 = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
}
function popCount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}
function spliceIn(array, idx, val, canEdit) {
  var newLen = array.length + 1;
  if (canEdit && idx + 1 === newLen) {
    array[idx] = val;
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      newArray[ii] = val;
      after = -1;
    } else {
      newArray[ii] = array[ii + after];
    }
  }
  return newArray;
}
function spliceOut(array, idx, canEdit) {
  var newLen = array.length - 1;
  if (canEdit && idx === newLen) {
    array.pop();
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      after = 1;
    }
    newArray[ii] = array[ii + after];
  }
  return newArray;
}
var MAX_ARRAY_MAP_SIZE = SIZE / 4;
var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
var List = /* @__PURE__ */ function(IndexedCollection2) {
  function List2(value) {
    var empty = emptyList();
    if (value === null || value === void 0) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedCollection2(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function(list) {
      list.setSize(size);
      iter.forEach(function(v, i) {
        return list.set(i, v);
      });
    });
  }
  if (IndexedCollection2)
    List2.__proto__ = IndexedCollection2;
  List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  List2.prototype.constructor = List2;
  List2.of = function of() {
    return this(arguments);
  };
  List2.prototype.toString = function toString5() {
    return this.__toString("List [", "]");
  };
  List2.prototype.get = function get11(index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };
  List2.prototype.set = function set3(index, value) {
    return updateList(this, index, value);
  };
  List2.prototype.remove = function remove3(index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };
  List2.prototype.insert = function insert(index, value) {
    return this.splice(index, 0, value);
  };
  List2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };
  List2.prototype.push = function push() {
    var values2 = arguments;
    var oldSize = this.size;
    return this.withMutations(function(list) {
      setListBounds(list, 0, oldSize + values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(oldSize + ii, values2[ii]);
      }
    });
  };
  List2.prototype.pop = function pop() {
    return setListBounds(this, 0, -1);
  };
  List2.prototype.unshift = function unshift() {
    var values2 = arguments;
    return this.withMutations(function(list) {
      setListBounds(list, -values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(ii, values2[ii]);
      }
    });
  };
  List2.prototype.shift = function shift() {
    return setListBounds(this, 1);
  };
  List2.prototype.concat = function concat2() {
    var arguments$1 = arguments;
    var seqs = [];
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments$1[i];
      var seq = IndexedCollection2(typeof argument !== "string" && hasIterator(argument) ? argument : [argument]);
      if (seq.size !== 0) {
        seqs.push(seq);
      }
    }
    if (seqs.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
      return this.constructor(seqs[0]);
    }
    return this.withMutations(function(list) {
      seqs.forEach(function(seq2) {
        return seq2.forEach(function(value) {
          return list.push(value);
        });
      });
    });
  };
  List2.prototype.setSize = function setSize(size) {
    return setListBounds(this, 0, size);
  };
  List2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(list) {
      for (var i = 0; i < this$1$1.size; i++) {
        list.set(i, mapper.call(context, list.get(i), i, this$1$1));
      }
    });
  };
  List2.prototype.slice = function slice3(begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };
  List2.prototype.__iterator = function __iterator2(type, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    return new Iterator(function() {
      var value = values2();
      return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index : index++, value);
    });
  };
  List2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    var value;
    while ((value = values2()) !== DONE) {
      if (fn(value, reverse3 ? --index : index++, this) === false) {
        break;
      }
    }
    return index;
  };
  List2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyList();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };
  return List2;
}(IndexedCollection);
List.isList = isList;
var ListPrototype = List.prototype;
ListPrototype[IS_LIST_SYMBOL] = true;
ListPrototype[DELETE] = ListPrototype.remove;
ListPrototype.merge = ListPrototype.concat;
ListPrototype.setIn = setIn;
ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
ListPrototype.update = update;
ListPrototype.updateIn = updateIn;
ListPrototype.mergeIn = mergeIn;
ListPrototype.mergeDeepIn = mergeDeepIn;
ListPrototype.withMutations = withMutations;
ListPrototype.wasAltered = wasAltered;
ListPrototype.asImmutable = asImmutable;
ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
ListPrototype["@@transducer/step"] = function(result, arr) {
  return result.push(arr);
};
ListPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var VNode = function VNode2(array, ownerID) {
  this.array = array;
  this.ownerID = ownerID;
};
VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
  if (index === level ? 1 << level : this.array.length === 0) {
    return this;
  }
  var originIndex = index >>> level & MASK;
  if (originIndex >= this.array.length) {
    return new VNode([], ownerID);
  }
  var removingFirst = originIndex === 0;
  var newChild;
  if (level > 0) {
    var oldChild = this.array[originIndex];
    newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
    if (newChild === oldChild && removingFirst) {
      return this;
    }
  }
  if (removingFirst && !newChild) {
    return this;
  }
  var editable = editableVNode(this, ownerID);
  if (!removingFirst) {
    for (var ii = 0; ii < originIndex; ii++) {
      editable.array[ii] = void 0;
    }
  }
  if (newChild) {
    editable.array[originIndex] = newChild;
  }
  return editable;
};
VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
    return this;
  }
  var sizeIndex = index - 1 >>> level & MASK;
  if (sizeIndex >= this.array.length) {
    return this;
  }
  var newChild;
  if (level > 0) {
    var oldChild = this.array[sizeIndex];
    newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
      return this;
    }
  }
  var editable = editableVNode(this, ownerID);
  editable.array.splice(sizeIndex + 1);
  if (newChild) {
    editable.array[sizeIndex] = newChild;
  }
  return editable;
};
var DONE = {};
function iterateList(list, reverse3) {
  var left = list._origin;
  var right = list._capacity;
  var tailPos = getTailOffset(right);
  var tail = list._tail;
  return iterateNodeOrLeaf(list._root, list._level, 0);
  function iterateNodeOrLeaf(node, level, offset) {
    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
  }
  function iterateLeaf(node, offset) {
    var array = offset === tailPos ? tail && tail.array : node && node.array;
    var from = offset > left ? 0 : left - offset;
    var to = right - offset;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      if (from === to) {
        return DONE;
      }
      var idx = reverse3 ? --to : from++;
      return array && array[idx];
    };
  }
  function iterateNode(node, level, offset) {
    var values2;
    var array = node && node.array;
    var from = offset > left ? 0 : left - offset >> level;
    var to = (right - offset >> level) + 1;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      while (true) {
        if (values2) {
          var value = values2();
          if (value !== DONE) {
            return value;
          }
          values2 = null;
        }
        if (from === to) {
          return DONE;
        }
        var idx = reverse3 ? --to : from++;
        values2 = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
      }
    };
  }
}
function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin;
  list._origin = origin;
  list._capacity = capacity;
  list._level = level;
  list._root = root;
  list._tail = tail;
  list.__ownerID = ownerID;
  list.__hash = hash2;
  list.__altered = false;
  return list;
}
var EMPTY_LIST;
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}
function updateList(list, index, value) {
  index = wrapIndex(list, index);
  if (index !== index) {
    return list;
  }
  if (index >= list.size || index < 0) {
    return list.withMutations(function(list2) {
      index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
    });
  }
  index += list._origin;
  var newTail = list._tail;
  var newRoot = list._root;
  var didAlter = MakeRef();
  if (index >= getTailOffset(list._capacity)) {
    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
  } else {
    newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
  }
  if (!didAlter.value) {
    return list;
  }
  if (list.__ownerID) {
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
}
function updateVNode(node, ownerID, level, index, value, didAlter) {
  var idx = index >>> level & MASK;
  var nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === void 0) {
    return node;
  }
  var newNode;
  if (level > 0) {
    var lowerNode = node && node.array[idx];
    var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }
  if (nodeHas && node.array[idx] === value) {
    return node;
  }
  if (didAlter) {
    SetRef(didAlter);
  }
  newNode = editableVNode(node, ownerID);
  if (value === void 0 && idx === newNode.array.length - 1) {
    newNode.array.pop();
  } else {
    newNode.array[idx] = value;
  }
  return newNode;
}
function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}
function listNodeFor(list, rawIndex) {
  if (rawIndex >= getTailOffset(list._capacity)) {
    return list._tail;
  }
  if (rawIndex < 1 << list._level + SHIFT) {
    var node = list._root;
    var level = list._level;
    while (node && level > 0) {
      node = node.array[rawIndex >>> level & MASK];
      level -= SHIFT;
    }
    return node;
  }
}
function setListBounds(list, begin, end) {
  if (begin !== void 0) {
    begin |= 0;
  }
  if (end !== void 0) {
    end |= 0;
  }
  var owner = list.__ownerID || new OwnerID();
  var oldOrigin = list._origin;
  var oldCapacity = list._capacity;
  var newOrigin = oldOrigin + begin;
  var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
    return list;
  }
  if (newOrigin >= newCapacity) {
    return list.clear();
  }
  var newLevel = list._level;
  var newRoot = list._root;
  var offsetShift = 0;
  while (newOrigin + offsetShift < 0) {
    newRoot = new VNode(newRoot && newRoot.array.length ? [void 0, newRoot] : [], owner);
    newLevel += SHIFT;
    offsetShift += 1 << newLevel;
  }
  if (offsetShift) {
    newOrigin += offsetShift;
    oldOrigin += offsetShift;
    newCapacity += offsetShift;
    oldCapacity += offsetShift;
  }
  var oldTailOffset = getTailOffset(oldCapacity);
  var newTailOffset = getTailOffset(newCapacity);
  while (newTailOffset >= 1 << newLevel + SHIFT) {
    newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
    newLevel += SHIFT;
  }
  var oldTail = list._tail;
  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
    newRoot = editableVNode(newRoot, owner);
    var node = newRoot;
    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
      var idx = oldTailOffset >>> level & MASK;
      node = node.array[idx] = editableVNode(node.array[idx], owner);
    }
    node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
  }
  if (newCapacity < oldCapacity) {
    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
  }
  if (newOrigin >= newTailOffset) {
    newOrigin -= newTailOffset;
    newCapacity -= newTailOffset;
    newLevel = SHIFT;
    newRoot = null;
    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
    offsetShift = 0;
    while (newRoot) {
      var beginIndex = newOrigin >>> newLevel & MASK;
      if (beginIndex !== newTailOffset >>> newLevel & MASK) {
        break;
      }
      if (beginIndex) {
        offsetShift += (1 << newLevel) * beginIndex;
      }
      newLevel -= SHIFT;
      newRoot = newRoot.array[beginIndex];
    }
    if (newRoot && newOrigin > oldOrigin) {
      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
    }
    if (newRoot && newTailOffset < oldTailOffset) {
      newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
    }
    if (offsetShift) {
      newOrigin -= offsetShift;
      newCapacity -= offsetShift;
    }
  }
  if (list.__ownerID) {
    list.size = newCapacity - newOrigin;
    list._origin = newOrigin;
    list._capacity = newCapacity;
    list._level = newLevel;
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
}
function getTailOffset(size) {
  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
}
var OrderedMap = /* @__PURE__ */ function(Map2) {
  function OrderedMap2(value) {
    return value === null || value === void 0 ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
      var iter = KeyedCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (Map2)
    OrderedMap2.__proto__ = Map2;
  OrderedMap2.prototype = Object.create(Map2 && Map2.prototype);
  OrderedMap2.prototype.constructor = OrderedMap2;
  OrderedMap2.of = function of() {
    return this(arguments);
  };
  OrderedMap2.prototype.toString = function toString5() {
    return this.__toString("OrderedMap {", "}");
  };
  OrderedMap2.prototype.get = function get11(k, notSetValue) {
    var index = this._map.get(k);
    return index !== void 0 ? this._list.get(index)[1] : notSetValue;
  };
  OrderedMap2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      this.__altered = true;
      return this;
    }
    return emptyOrderedMap();
  };
  OrderedMap2.prototype.set = function set3(k, v) {
    return updateOrderedMap(this, k, v);
  };
  OrderedMap2.prototype.remove = function remove3(k) {
    return updateOrderedMap(this, k, NOT_SET);
  };
  OrderedMap2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._list.__iterate(function(entry) {
      return entry && fn(entry[1], entry[0], this$1$1);
    }, reverse3);
  };
  OrderedMap2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._list.fromEntrySeq().__iterator(type, reverse3);
  };
  OrderedMap2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return emptyOrderedMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };
  return OrderedMap2;
}(Map);
OrderedMap.isOrderedMap = isOrderedMap;
OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
function makeOrderedMap(map2, list, ownerID, hash2) {
  var omap = Object.create(OrderedMap.prototype);
  omap.size = map2 ? map2.size : 0;
  omap._map = map2;
  omap._list = list;
  omap.__ownerID = ownerID;
  omap.__hash = hash2;
  omap.__altered = false;
  return omap;
}
var EMPTY_ORDERED_MAP;
function emptyOrderedMap() {
  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
}
function updateOrderedMap(omap, k, v) {
  var map2 = omap._map;
  var list = omap._list;
  var i = map2.get(k);
  var has5 = i !== void 0;
  var newMap;
  var newList;
  if (v === NOT_SET) {
    if (!has5) {
      return omap;
    }
    if (list.size >= SIZE && list.size >= map2.size * 2) {
      newList = list.filter(function(entry, idx) {
        return entry !== void 0 && i !== idx;
      });
      newMap = newList.toKeyedSeq().map(function(entry) {
        return entry[0];
      }).flip().toMap();
      if (omap.__ownerID) {
        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
      }
    } else {
      newMap = map2.remove(k);
      newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
    }
  } else if (has5) {
    if (v === list.get(i)[1]) {
      return omap;
    }
    newMap = map2;
    newList = list.set(i, [k, v]);
  } else {
    newMap = map2.set(k, list.size);
    newList = list.set(list.size, [k, v]);
  }
  if (omap.__ownerID) {
    omap.size = newMap.size;
    omap._map = newMap;
    omap._list = newList;
    omap.__hash = void 0;
    omap.__altered = true;
    return omap;
  }
  return makeOrderedMap(newMap, newList);
}
var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
var Stack = /* @__PURE__ */ function(IndexedCollection2) {
  function Stack2(value) {
    return value === null || value === void 0 ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
  }
  if (IndexedCollection2)
    Stack2.__proto__ = IndexedCollection2;
  Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  Stack2.prototype.constructor = Stack2;
  Stack2.of = function of() {
    return this(arguments);
  };
  Stack2.prototype.toString = function toString5() {
    return this.__toString("Stack [", "]");
  };
  Stack2.prototype.get = function get11(index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };
  Stack2.prototype.peek = function peek() {
    return this._head && this._head.value;
  };
  Stack2.prototype.push = function push() {
    var arguments$1 = arguments;
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments$1[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.pushAll = function pushAll(iter) {
    iter = IndexedCollection2(iter);
    if (iter.size === 0) {
      return this;
    }
    if (this.size === 0 && isStack(iter)) {
      return iter;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.__iterate(function(value) {
      newSize++;
      head = {
        value,
        next: head
      };
    }, true);
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.pop = function pop() {
    return this.slice(1);
  };
  Stack2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = void 0;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };
  Stack2.prototype.slice = function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      return IndexedCollection2.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyStack();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };
  Stack2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterate(function(v, k) {
        return fn(v, k, this$1$1);
      }, reverse3);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };
  Stack2.prototype.__iterator = function __iterator2(type, reverse3) {
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterator(type, reverse3);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function() {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };
  return Stack2;
}(IndexedCollection);
Stack.isStack = isStack;
var StackPrototype = Stack.prototype;
StackPrototype[IS_STACK_SYMBOL] = true;
StackPrototype.shift = StackPrototype.pop;
StackPrototype.unshift = StackPrototype.push;
StackPrototype.unshiftAll = StackPrototype.pushAll;
StackPrototype.withMutations = withMutations;
StackPrototype.wasAltered = wasAltered;
StackPrototype.asImmutable = asImmutable;
StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
StackPrototype["@@transducer/step"] = function(result, arr) {
  return result.unshift(arr);
};
StackPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
function makeStack(size, head, ownerID, hash2) {
  var map2 = Object.create(StackPrototype);
  map2.size = size;
  map2._head = head;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
var EMPTY_STACK;
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}
var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
    return false;
  }
  if (a.size === 0 && b.size === 0) {
    return true;
  }
  var notAssociative = !isAssociative(a);
  if (isOrdered(a)) {
    var entries3 = a.entries();
    return b.every(function(v, k) {
      var entry = entries3.next().value;
      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
    }) && entries3.next().done;
  }
  var flipped = false;
  if (a.size === void 0) {
    if (b.size === void 0) {
      if (typeof a.cacheResult === "function") {
        a.cacheResult();
      }
    } else {
      flipped = true;
      var _ = a;
      a = b;
      b = _;
    }
  }
  var allEqual = true;
  var bSize = b.__iterate(function(v, k) {
    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
      allEqual = false;
      return false;
    }
  });
  return allEqual && a.size === bSize;
}
function mixin(ctor, methods) {
  var keyCopier = function(key) {
    ctor.prototype[key] = methods[key];
  };
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}
function toJS(value) {
  if (!value || typeof value !== "object") {
    return value;
  }
  if (!isCollection(value)) {
    if (!isDataStructure(value)) {
      return value;
    }
    value = Seq(value);
  }
  if (isKeyed(value)) {
    var result$1 = {};
    value.__iterate(function(v, k) {
      result$1[k] = toJS(v);
    });
    return result$1;
  }
  var result = [];
  value.__iterate(function(v) {
    result.push(toJS(v));
  });
  return result;
}
var Set = /* @__PURE__ */ function(SetCollection2) {
  function Set2(value) {
    return value === null || value === void 0 ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
      var iter = SetCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  if (SetCollection2)
    Set2.__proto__ = SetCollection2;
  Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
  Set2.prototype.constructor = Set2;
  Set2.of = function of() {
    return this(arguments);
  };
  Set2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  Set2.intersect = function intersect(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.union = function union(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.prototype.toString = function toString5() {
    return this.__toString("Set {", "}");
  };
  Set2.prototype.has = function has5(value) {
    return this._map.has(value);
  };
  Set2.prototype.add = function add(value) {
    return updateSet(this, this._map.set(value, value));
  };
  Set2.prototype.remove = function remove3(value) {
    return updateSet(this, this._map.remove(value));
  };
  Set2.prototype.clear = function clear2() {
    return updateSet(this, this._map.clear());
  };
  Set2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    var didChanges = false;
    var newMap = updateSet(this, this._map.mapEntries(function(ref) {
      var v = ref[1];
      var mapped = mapper.call(context, v, v, this$1$1);
      if (mapped !== v) {
        didChanges = true;
      }
      return [mapped, mapped];
    }, context));
    return didChanges ? newMap : this;
  };
  Set2.prototype.union = function union() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    iters = iters.filter(function(x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function(set3) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetCollection2(iters[ii]).forEach(function(value) {
          return set3.add(value);
        });
      }
    });
  };
  Set2.prototype.intersect = function intersect() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (!iters.every(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  };
  Set2.prototype.subtract = function subtract() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (iters.some(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  };
  Set2.prototype.sort = function sort2(comparator) {
    return OrderedSet(sortFactory(this, comparator));
  };
  Set2.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedSet(sortFactory(this, comparator, mapper));
  };
  Set2.prototype.wasAltered = function wasAltered3() {
    return this._map.wasAltered();
  };
  Set2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._map.__iterate(function(k) {
      return fn(k, k, this$1$1);
    }, reverse3);
  };
  Set2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._map.__iterator(type, reverse3);
  };
  Set2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return this.__empty();
      }
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };
  return Set2;
}(SetCollection);
Set.isSet = isSet;
var SetPrototype = Set.prototype;
SetPrototype[IS_SET_SYMBOL] = true;
SetPrototype[DELETE] = SetPrototype.remove;
SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
SetPrototype.withMutations = withMutations;
SetPrototype.asImmutable = asImmutable;
SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
SetPrototype["@@transducer/step"] = function(result, arr) {
  return result.add(arr);
};
SetPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
SetPrototype.__empty = emptySet;
SetPrototype.__make = makeSet;
function updateSet(set3, newMap) {
  if (set3.__ownerID) {
    set3.size = newMap.size;
    set3._map = newMap;
    return set3;
  }
  return newMap === set3._map ? set3 : newMap.size === 0 ? set3.__empty() : set3.__make(newMap);
}
function makeSet(map2, ownerID) {
  var set3 = Object.create(SetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
var EMPTY_SET;
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}
var Range = /* @__PURE__ */ function(IndexedSeq2) {
  function Range2(start, end, step) {
    if (!(this instanceof Range2)) {
      return new Range2(start, end, step);
    }
    invariant(step !== 0, "Cannot step a Range by 0");
    start = start || 0;
    if (end === void 0) {
      end = Infinity;
    }
    step = step === void 0 ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }
  if (IndexedSeq2)
    Range2.__proto__ = IndexedSeq2;
  Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  Range2.prototype.constructor = Range2;
  Range2.prototype.toString = function toString5() {
    if (this.size === 0) {
      return "Range []";
    }
    return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  };
  Range2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };
  Range2.prototype.includes = function includes3(searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };
  Range2.prototype.slice = function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range2(0, 0);
    }
    return new Range2(this.get(begin, this._end), this.get(end, this._end), this._step);
  };
  Range2.prototype.indexOf = function indexOf2(searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };
  Range2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
    return this.indexOf(searchValue);
  };
  Range2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    while (i !== size) {
      if (fn(value, reverse3 ? size - ++i : i++, this) === false) {
        break;
      }
      value += reverse3 ? -step : step;
    }
    return i;
  };
  Range2.prototype.__iterator = function __iterator2(type, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var v = value;
      value += reverse3 ? -step : step;
      return iteratorValue(type, reverse3 ? size - ++i : i++, v);
    });
  };
  Range2.prototype.equals = function equals3(other) {
    return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };
  return Range2;
}(IndexedSeq);
var EMPTY_RANGE;
function getIn$1(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
function getIn(searchKeyPath, notSetValue) {
  return getIn$1(this, searchKeyPath, notSetValue);
}
function hasIn$1(collection, keyPath) {
  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
}
function hasIn(searchKeyPath) {
  return hasIn$1(this, searchKeyPath);
}
function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function(v, k) {
    object[k] = v;
  });
  return object;
}
Collection.isIterable = isCollection;
Collection.isKeyed = isKeyed;
Collection.isIndexed = isIndexed;
Collection.isAssociative = isAssociative;
Collection.isOrdered = isOrdered;
Collection.Iterator = Iterator;
mixin(Collection, {
  toArray: function toArray() {
    assertNotInfinite(this.size);
    var array = new Array(this.size || 0);
    var useTuples = isKeyed(this);
    var i = 0;
    this.__iterate(function(v, k) {
      array[i++] = useTuples ? [k, v] : v;
    });
    return array;
  },
  toIndexedSeq: function toIndexedSeq() {
    return new ToIndexedSequence(this);
  },
  toJS: function toJS$1() {
    return toJS(this);
  },
  toKeyedSeq: function toKeyedSeq() {
    return new ToKeyedSequence(this, true);
  },
  toMap: function toMap() {
    return Map(this.toKeyedSeq());
  },
  toObject,
  toOrderedMap: function toOrderedMap() {
    return OrderedMap(this.toKeyedSeq());
  },
  toOrderedSet: function toOrderedSet() {
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  },
  toSet: function toSet() {
    return Set(isKeyed(this) ? this.valueSeq() : this);
  },
  toSetSeq: function toSetSeq() {
    return new ToSetSequence(this);
  },
  toSeq: function toSeq() {
    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
  },
  toStack: function toStack() {
    return Stack(isKeyed(this) ? this.valueSeq() : this);
  },
  toList: function toList() {
    return List(isKeyed(this) ? this.valueSeq() : this);
  },
  toString: function toString3() {
    return "[Collection]";
  },
  __toString: function __toString(head, tail) {
    if (this.size === 0) {
      return head + tail;
    }
    return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
  },
  concat: function concat() {
    var values2 = [], len = arguments.length;
    while (len--)
      values2[len] = arguments[len];
    return reify(this, concatFactory(this, values2));
  },
  includes: function includes(searchValue) {
    return this.some(function(value) {
      return is(value, searchValue);
    });
  },
  entries: function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  },
  every: function every(predicate, context) {
    assertNotInfinite(this.size);
    var returnValue = true;
    this.__iterate(function(v, k, c) {
      if (!predicate.call(context, v, k, c)) {
        returnValue = false;
        return false;
      }
    });
    return returnValue;
  },
  filter: function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, true));
  },
  find: function find(predicate, context, notSetValue) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[1] : notSetValue;
  },
  forEach: function forEach(sideEffect, context) {
    assertNotInfinite(this.size);
    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
  },
  join: function join(separator) {
    assertNotInfinite(this.size);
    separator = separator !== void 0 ? "" + separator : ",";
    var joined = "";
    var isFirst = true;
    this.__iterate(function(v) {
      isFirst ? isFirst = false : joined += separator;
      joined += v !== null && v !== void 0 ? v.toString() : "";
    });
    return joined;
  },
  keys: function keys() {
    return this.__iterator(ITERATE_KEYS);
  },
  map: function map(mapper, context) {
    return reify(this, mapFactory(this, mapper, context));
  },
  reduce: function reduce$1(reducer, initialReduction, context) {
    return reduce(this, reducer, initialReduction, context, arguments.length < 2, false);
  },
  reduceRight: function reduceRight(reducer, initialReduction, context) {
    return reduce(this, reducer, initialReduction, context, arguments.length < 2, true);
  },
  reverse: function reverse() {
    return reify(this, reverseFactory(this, true));
  },
  slice: function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, true));
  },
  some: function some(predicate, context) {
    return !this.every(not(predicate), context);
  },
  sort: function sort(comparator) {
    return reify(this, sortFactory(this, comparator));
  },
  values: function values() {
    return this.__iterator(ITERATE_VALUES);
  },
  butLast: function butLast() {
    return this.slice(0, -1);
  },
  isEmpty: function isEmpty() {
    return this.size !== void 0 ? this.size === 0 : !this.some(function() {
      return true;
    });
  },
  count: function count(predicate, context) {
    return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
  },
  countBy: function countBy(grouper, context) {
    return countByFactory(this, grouper, context);
  },
  equals: function equals(other) {
    return deepEqual(this, other);
  },
  entrySeq: function entrySeq() {
    var collection = this;
    if (collection._cache) {
      return new ArraySeq(collection._cache);
    }
    var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
    entriesSequence.fromEntrySeq = function() {
      return collection.toSeq();
    };
    return entriesSequence;
  },
  filterNot: function filterNot(predicate, context) {
    return this.filter(not(predicate), context);
  },
  findEntry: function findEntry(predicate, context, notSetValue) {
    var found = notSetValue;
    this.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        found = [k, v];
        return false;
      }
    });
    return found;
  },
  findKey: function findKey(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry && entry[0];
  },
  findLast: function findLast(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
  },
  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
  },
  findLastKey: function findLastKey(predicate, context) {
    return this.toKeyedSeq().reverse().findKey(predicate, context);
  },
  first: function first(notSetValue) {
    return this.find(returnTrue, null, notSetValue);
  },
  flatMap: function flatMap(mapper, context) {
    return reify(this, flatMapFactory(this, mapper, context));
  },
  flatten: function flatten(depth) {
    return reify(this, flattenFactory(this, depth, true));
  },
  fromEntrySeq: function fromEntrySeq() {
    return new FromEntriesSequence(this);
  },
  get: function get7(searchKey, notSetValue) {
    return this.find(function(_, key) {
      return is(key, searchKey);
    }, void 0, notSetValue);
  },
  getIn,
  groupBy: function groupBy(grouper, context) {
    return groupByFactory(this, grouper, context);
  },
  has: function has2(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  },
  hasIn,
  isSubset: function isSubset(iter) {
    iter = typeof iter.includes === "function" ? iter : Collection(iter);
    return this.every(function(value) {
      return iter.includes(value);
    });
  },
  isSuperset: function isSuperset(iter) {
    iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
    return iter.isSubset(this);
  },
  keyOf: function keyOf(searchValue) {
    return this.findKey(function(value) {
      return is(value, searchValue);
    });
  },
  keySeq: function keySeq() {
    return this.toSeq().map(keyMapper).toIndexedSeq();
  },
  last: function last(notSetValue) {
    return this.toSeq().reverse().first(notSetValue);
  },
  lastKeyOf: function lastKeyOf(searchValue) {
    return this.toKeyedSeq().reverse().keyOf(searchValue);
  },
  max: function max(comparator) {
    return maxFactory(this, comparator);
  },
  maxBy: function maxBy(mapper, comparator) {
    return maxFactory(this, comparator, mapper);
  },
  min: function min(comparator) {
    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
  },
  minBy: function minBy(mapper, comparator) {
    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
  },
  rest: function rest() {
    return this.slice(1);
  },
  skip: function skip(amount) {
    return amount === 0 ? this : this.slice(Math.max(0, amount));
  },
  skipLast: function skipLast(amount) {
    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
  },
  skipWhile: function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, true));
  },
  skipUntil: function skipUntil(predicate, context) {
    return this.skipWhile(not(predicate), context);
  },
  sortBy: function sortBy(mapper, comparator) {
    return reify(this, sortFactory(this, comparator, mapper));
  },
  take: function take(amount) {
    return this.slice(0, Math.max(0, amount));
  },
  takeLast: function takeLast(amount) {
    return this.slice(-Math.max(0, amount));
  },
  takeWhile: function takeWhile(predicate, context) {
    return reify(this, takeWhileFactory(this, predicate, context));
  },
  takeUntil: function takeUntil(predicate, context) {
    return this.takeWhile(not(predicate), context);
  },
  update: function update7(fn) {
    return fn(this);
  },
  valueSeq: function valueSeq() {
    return this.toIndexedSeq();
  },
  hashCode: function hashCode() {
    return this.__hash || (this.__hash = hashCollection(this));
  }
});
var CollectionPrototype = Collection.prototype;
CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
CollectionPrototype.toJSON = CollectionPrototype.toArray;
CollectionPrototype.__toStringMapper = quoteString;
CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
  return this.toString();
};
CollectionPrototype.chain = CollectionPrototype.flatMap;
CollectionPrototype.contains = CollectionPrototype.includes;
mixin(KeyedCollection, {
  flip: function flip() {
    return reify(this, flipFactory(this));
  },
  mapEntries: function mapEntries(mapper, context) {
    var this$1$1 = this;
    var iterations = 0;
    return reify(this, this.toSeq().map(function(v, k) {
      return mapper.call(context, [k, v], iterations++, this$1$1);
    }).fromEntrySeq());
  },
  mapKeys: function mapKeys(mapper, context) {
    var this$1$1 = this;
    return reify(this, this.toSeq().flip().map(function(k, v) {
      return mapper.call(context, k, v, this$1$1);
    }).flip());
  }
});
var KeyedCollectionPrototype = KeyedCollection.prototype;
KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
KeyedCollectionPrototype.toJSON = toObject;
KeyedCollectionPrototype.__toStringMapper = function(v, k) {
  return quoteString(k) + ": " + quoteString(v);
};
mixin(IndexedCollection, {
  toKeyedSeq: function toKeyedSeq2() {
    return new ToKeyedSequence(this, false);
  },
  filter: function filter2(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, false));
  },
  findIndex: function findIndex(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  indexOf: function indexOf(searchValue) {
    var key = this.keyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  lastIndexOf: function lastIndexOf(searchValue) {
    var key = this.lastKeyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  reverse: function reverse2() {
    return reify(this, reverseFactory(this, false));
  },
  slice: function slice2(begin, end) {
    return reify(this, sliceFactory(this, begin, end, false));
  },
  splice: function splice(index, removeNum) {
    var numArgs = arguments.length;
    removeNum = Math.max(removeNum || 0, 0);
    if (numArgs === 0 || numArgs === 2 && !removeNum) {
      return this;
    }
    index = resolveBegin(index, index < 0 ? this.count() : this.size);
    var spliced = this.slice(0, index);
    return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
  },
  findLastIndex: function findLastIndex(predicate, context) {
    var entry = this.findLastEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  first: function first2(notSetValue) {
    return this.get(0, notSetValue);
  },
  flatten: function flatten2(depth) {
    return reify(this, flattenFactory(this, depth, false));
  },
  get: function get8(index, notSetValue) {
    index = wrapIndex(this, index);
    return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
      return key === index;
    }, void 0, notSetValue);
  },
  has: function has3(index) {
    index = wrapIndex(this, index);
    return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
  },
  interpose: function interpose(separator) {
    return reify(this, interposeFactory(this, separator));
  },
  interleave: function interleave() {
    var collections = [this].concat(arrCopy(arguments));
    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
    var interleaved = zipped.flatten(true);
    if (zipped.size) {
      interleaved.size = zipped.size * collections.length;
    }
    return reify(this, interleaved);
  },
  keySeq: function keySeq2() {
    return Range(0, this.size);
  },
  last: function last2(notSetValue) {
    return this.get(-1, notSetValue);
  },
  skipWhile: function skipWhile2(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, false));
  },
  zip: function zip() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections));
  },
  zipAll: function zipAll() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
  },
  zipWith: function zipWith(zipper) {
    var collections = arrCopy(arguments);
    collections[0] = this;
    return reify(this, zipWithFactory(this, zipper, collections));
  }
});
var IndexedCollectionPrototype = IndexedCollection.prototype;
IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
mixin(SetCollection, {
  get: function get9(value, notSetValue) {
    return this.has(value) ? value : notSetValue;
  },
  includes: function includes2(value) {
    return this.has(value);
  },
  keySeq: function keySeq3() {
    return this.valueSeq();
  }
});
var SetCollectionPrototype = SetCollection.prototype;
SetCollectionPrototype.has = CollectionPrototype.includes;
SetCollectionPrototype.contains = SetCollectionPrototype.includes;
SetCollectionPrototype.keys = SetCollectionPrototype.values;
mixin(KeyedSeq, KeyedCollectionPrototype);
mixin(IndexedSeq, IndexedCollectionPrototype);
mixin(SetSeq, SetCollectionPrototype);
function reduce(collection, reducer, reduction, context, useFirst, reverse3) {
  assertNotInfinite(collection.size);
  collection.__iterate(function(v, k, c) {
    if (useFirst) {
      useFirst = false;
      reduction = v;
    } else {
      reduction = reducer.call(context, reduction, v, k, c);
    }
  }, reverse3);
  return reduction;
}
function keyMapper(v, k) {
  return k;
}
function entryMapper(v, k) {
  return [k, v];
}
function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}
function defaultZipper() {
  return arrCopy(arguments);
}
function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
function hashCollection(collection) {
  if (collection.size === Infinity) {
    return 0;
  }
  var ordered = isOrdered(collection);
  var keyed = isKeyed(collection);
  var h = ordered ? 1 : 0;
  var size = collection.__iterate(keyed ? ordered ? function(v, k) {
    h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
  } : function(v, k) {
    h = h + hashMerge(hash(v), hash(k)) | 0;
  } : ordered ? function(v) {
    h = 31 * h + hash(v) | 0;
  } : function(v) {
    h = h + hash(v) | 0;
  });
  return murmurHashOfSize(size, h);
}
function murmurHashOfSize(size, h) {
  h = imul(h, 3432918353);
  h = imul(h << 15 | h >>> -15, 461845907);
  h = imul(h << 13 | h >>> -13, 5);
  h = (h + 3864292196 | 0) ^ size;
  h = imul(h ^ h >>> 16, 2246822507);
  h = imul(h ^ h >>> 13, 3266489909);
  h = smi(h ^ h >>> 16);
  return h;
}
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
var OrderedSet = /* @__PURE__ */ function(Set2) {
  function OrderedSet2(value) {
    return value === null || value === void 0 ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
      var iter = SetCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  if (Set2)
    OrderedSet2.__proto__ = Set2;
  OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
  OrderedSet2.prototype.constructor = OrderedSet2;
  OrderedSet2.of = function of() {
    return this(arguments);
  };
  OrderedSet2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  OrderedSet2.prototype.toString = function toString5() {
    return this.__toString("OrderedSet {", "}");
  };
  return OrderedSet2;
}(Set);
OrderedSet.isOrderedSet = isOrderedSet;
var OrderedSetPrototype = OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
OrderedSetPrototype.__empty = emptyOrderedSet;
OrderedSetPrototype.__make = makeOrderedSet;
function makeOrderedSet(map2, ownerID) {
  var set3 = Object.create(OrderedSetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
var EMPTY_ORDERED_SET;
function emptyOrderedSet() {
  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
}
function throwOnInvalidDefaultValues(defaultValues) {
  if (isRecord(defaultValues)) {
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  }
  if (isImmutable(defaultValues)) {
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  }
  if (defaultValues === null || typeof defaultValues !== "object") {
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
  }
}
var Record = function Record2(defaultValues, name) {
  var hasInitialized;
  throwOnInvalidDefaultValues(defaultValues);
  var RecordType = function Record3(values2) {
    var this$1$1 = this;
    if (values2 instanceof RecordType) {
      return values2;
    }
    if (!(this instanceof RecordType)) {
      return new RecordType(values2);
    }
    if (!hasInitialized) {
      hasInitialized = true;
      var keys2 = Object.keys(defaultValues);
      var indices = RecordTypePrototype._indices = {};
      RecordTypePrototype._name = name;
      RecordTypePrototype._keys = keys2;
      RecordTypePrototype._defaultValues = defaultValues;
      for (var i = 0; i < keys2.length; i++) {
        var propName = keys2[i];
        indices[propName] = i;
        if (RecordTypePrototype[propName]) {
          typeof console === "object" && console.warn && console.warn("Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.');
        } else {
          setProp(RecordTypePrototype, propName);
        }
      }
    }
    this.__ownerID = void 0;
    this._values = List().withMutations(function(l) {
      l.setSize(this$1$1._keys.length);
      KeyedCollection(values2).forEach(function(v, k) {
        l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
      });
    });
    return this;
  };
  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
  RecordTypePrototype.constructor = RecordType;
  if (name) {
    RecordType.displayName = name;
  }
  return RecordType;
};
Record.prototype.toString = function toString4() {
  var str = recordName(this) + " { ";
  var keys2 = this._keys;
  var k;
  for (var i = 0, l = keys2.length; i !== l; i++) {
    k = keys2[i];
    str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
  }
  return str + " }";
};
Record.prototype.equals = function equals2(other) {
  return this === other || other && recordSeq(this).equals(recordSeq(other));
};
Record.prototype.hashCode = function hashCode2() {
  return recordSeq(this).hashCode();
};
Record.prototype.has = function has4(k) {
  return this._indices.hasOwnProperty(k);
};
Record.prototype.get = function get10(k, notSetValue) {
  if (!this.has(k)) {
    return notSetValue;
  }
  var index = this._indices[k];
  var value = this._values.get(index);
  return value === void 0 ? this._defaultValues[k] : value;
};
Record.prototype.set = function set2(k, v) {
  if (this.has(k)) {
    var newValues = this._values.set(this._indices[k], v === this._defaultValues[k] ? void 0 : v);
    if (newValues !== this._values && !this.__ownerID) {
      return makeRecord(this, newValues);
    }
  }
  return this;
};
Record.prototype.remove = function remove2(k) {
  return this.set(k);
};
Record.prototype.clear = function clear() {
  var newValues = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : makeRecord(this, newValues);
};
Record.prototype.wasAltered = function wasAltered2() {
  return this._values.wasAltered();
};
Record.prototype.toSeq = function toSeq2() {
  return recordSeq(this);
};
Record.prototype.toJS = function toJS$12() {
  return toJS(this);
};
Record.prototype.entries = function entries2() {
  return this.__iterator(ITERATE_ENTRIES);
};
Record.prototype.__iterator = function __iterator(type, reverse3) {
  return recordSeq(this).__iterator(type, reverse3);
};
Record.prototype.__iterate = function __iterate(fn, reverse3) {
  return recordSeq(this).__iterate(fn, reverse3);
};
Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
  if (ownerID === this.__ownerID) {
    return this;
  }
  var newValues = this._values.__ensureOwner(ownerID);
  if (!ownerID) {
    this.__ownerID = ownerID;
    this._values = newValues;
    return this;
  }
  return makeRecord(this, newValues, ownerID);
};
Record.isRecord = isRecord;
Record.getDescriptiveName = recordName;
var RecordPrototype = Record.prototype;
RecordPrototype[IS_RECORD_SYMBOL] = true;
RecordPrototype[DELETE] = RecordPrototype.remove;
RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
RecordPrototype.getIn = getIn;
RecordPrototype.hasIn = CollectionPrototype.hasIn;
RecordPrototype.merge = merge$1;
RecordPrototype.mergeWith = mergeWith$1;
RecordPrototype.mergeIn = mergeIn;
RecordPrototype.mergeDeep = mergeDeep;
RecordPrototype.mergeDeepWith = mergeDeepWith;
RecordPrototype.mergeDeepIn = mergeDeepIn;
RecordPrototype.setIn = setIn;
RecordPrototype.update = update;
RecordPrototype.updateIn = updateIn;
RecordPrototype.withMutations = withMutations;
RecordPrototype.asMutable = asMutable;
RecordPrototype.asImmutable = asImmutable;
RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
RecordPrototype.inspect = RecordPrototype.toSource = function() {
  return this.toString();
};
function makeRecord(likeRecord, values2, ownerID) {
  var record = Object.create(Object.getPrototypeOf(likeRecord));
  record._values = values2;
  record.__ownerID = ownerID;
  return record;
}
function recordName(record) {
  return record.constructor.displayName || record.constructor.name || "Record";
}
function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function(k) {
    return [k, record.get(k)];
  }));
}
function setProp(prototype, name) {
  try {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, "Cannot set on an immutable record.");
        this.set(name, value);
      }
    });
  } catch (error) {
  }
}

// js/session.tsx
var import_textdiff_create = __toESM(require_textdiff_create());
var import_textdiff_patch = __toESM(require_textdiff_patch());
function initSession(room, u) {
  return Record({ ...u, room, state: Record(u.state)() });
}
var hashStore = {};
var CodeSession = class {
  constructor(room, user) {
    __publicField(this, "session");
    __publicField(this, "hashCodeSession");
    __publicField(this, "room", "");
    __publicField(this, "created", new Date().toISOString());
    const savedState = null;
    this.room = room;
    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : user.state,
      capabilities: {
        ...user.capabilities,
        sessionStorage: storageAvailable("sessionStorage")
      }
    })();
    this.hashCodeSession = this.session.get("state").hashCode();
    hashStore[this.session.get("state").hashCode()] = this.session.get("state");
  }
  addEvent(e) {
    this.session.get("events").push({
      ...e
    });
    setTimeout(() => this.processEvents);
  }
  hashCode() {
    return this.session.get("state").hashCode();
  }
  processEvents() {
    const events = this.session.get("events");
    const event = events.shift();
    if (event) {
      switch (event.type) {
        case "code-init":
          const { code, transpiled, i, css, errorDiff, html } = event;
          const sess = {
            code,
            transpiled,
            i,
            css,
            errorDiff,
            html
          };
          this.session.set("events", events);
          this.session.set("state", Record(sess)());
      }
    }
  }
  createPatchFromHashCode(oldHash, state) {
    if (hashStore[oldHash]) {
      const oldRec = hashStore[oldHash];
      const oldState = JSON.stringify(oldRec.toJSON());
      const newRec = oldRec.merge(state);
      const newHash = newRec.hashCode();
      hashStore[newHash] = newRec;
      const newState = JSON.stringify(newRec.toJSON());
      const patch = createPatch(oldState, newState);
      return {
        oldHash,
        newHash,
        patch
      };
    }
  }
  createPatch(state) {
    if (state.code === this.session.get("state").get("code")) {
      return {
        oldHash: this.session.get("state").hashCode(),
        newHash: this.session.get("state").hashCode(),
        patch: ""
      };
    }
    const oldState = JSON.stringify(this.session.get("state").toJSON());
    const oldHash = this.session.get("state").hashCode();
    hashStore[oldHash] = this.session.get("state");
    const oldRec = this.session.get("state");
    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;
    const newState = JSON.stringify(newRec.toJSON());
    const patch = createPatch(oldState, newState);
    return {
      oldHash,
      newHash,
      patch
    };
  }
  applyPatch({
    oldHash,
    newHash,
    patch
  }) {
    const oldHashCheck = this.session.get("state").hashCode();
    if (oldHashCheck !== oldHash) {
      console.error("Cant update");
      return;
    }
    const oldST = this.session.get("state").toJSON();
    const oldState = JSON.stringify(oldST);
    const oldCode = oldST.code;
    const newState = JSON.parse((0, import_textdiff_patch.default)(oldState, JSON.parse(patch)));
    const newRec = Record(newState)();
    console.log({ newState });
    console.log(newRec.hashCode());
    const newRecord = this.session.get("state").merge(newRec);
    const newCode = newRecord.get("code");
    if (oldCode === newCode) {
      return;
    }
    console.log(newRecord.hashCode());
    const newHashCheck = newRecord.hashCode();
    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
    } else {
      console.log("WRONG");
      console.log({
        newState
      });
    }
  }
  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }
  setRoom(room) {
    const user = this.session.set("room", room);
    this.session = user;
  }
};
var session = null;
var session_default = (room, u) => session || new CodeSession(room, u);
function storageAvailable(type) {
  try {
    if (!window.hasOwnProperty(type)) {
      return;
    }
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
function createPatch(oldCode, newCode) {
  return JSON.stringify((0, import_textdiff_create.default)(oldCode, newCode));
}
export {
  CodeSession,
  session_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RleHRkaWZmLXBhdGNoL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pbW11dGFibGUvZGlzdC9pbW11dGFibGUuZXMuanMiLCAiLi4vLi4vc2Vzc2lvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGRlbHRhKSB7XG4gIHZhciByZXN1bHQgPSAnJyxcbiAgICAgIGluZGV4ID0gMDtcblxuICAvLyBBY2NvcmRpbmcgdG8gbGF0ZXN0IGpzcGVyZiB0ZXN0cywgdGhlcmUncyBubyBuZWVkIHRvIGNhY2hlIGFycmF5IGxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbHRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBkZWx0YVtpXSxcbiAgICAgICAgb3BlcmF0aW9uID0gaXRlbVswXSxcbiAgICAgICAgdmFsdWUgPSBpdGVtWzFdO1xuXG4gICAgaWYgKG9wZXJhdGlvbiA9PSAtMSkge1xuICAgICAgLy8gREVMRVRFXG4gICAgICBpbmRleCArPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PSAwKSB7XG4gICAgICAvLyBLRUVQXG4gICAgICByZXN1bHQgKz0gb3JpZ2luYWwuc2xpY2UoaW5kZXgsIGluZGV4ICs9IHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSU5TRVJUXG4gICAgICByZXN1bHQgKz0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwgIi8qKlxuICogTUlUIExpY2Vuc2VcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIExlZSBCeXJvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzLlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cbnZhciBERUxFVEUgPSAnZGVsZXRlJztcblxuLy8gQ29uc3RhbnRzIGRlc2NyaWJpbmcgdGhlIHNpemUgb2YgdHJpZSBub2Rlcy5cbnZhciBTSElGVCA9IDU7IC8vIFJlc3VsdGVkIGluIGJlc3QgcGVyZm9ybWFuY2UgYWZ0ZXIgX19fX19fP1xudmFyIFNJWkUgPSAxIDw8IFNISUZUO1xudmFyIE1BU0sgPSBTSVpFIC0gMTtcblxuLy8gQSBjb25zaXN0ZW50IHNoYXJlZCB2YWx1ZSByZXByZXNlbnRpbmcgXCJub3Qgc2V0XCIgd2hpY2ggZXF1YWxzIG5vdGhpbmcgb3RoZXJcbi8vIHRoYW4gaXRzZWxmLCBhbmQgbm90aGluZyB0aGF0IGNvdWxkIGJlIHByb3ZpZGVkIGV4dGVybmFsbHkuXG52YXIgTk9UX1NFVCA9IHt9O1xuXG4vLyBCb29sZWFuIHJlZmVyZW5jZXMsIFJvdWdoIGVxdWl2YWxlbnQgb2YgYGJvb2wgJmAuXG5mdW5jdGlvbiBNYWtlUmVmKCkge1xuICByZXR1cm4geyB2YWx1ZTogZmFsc2UgfTtcbn1cblxuZnVuY3Rpb24gU2V0UmVmKHJlZikge1xuICBpZiAocmVmKSB7XG4gICAgcmVmLnZhbHVlID0gdHJ1ZTtcbiAgfVxufVxuXG4vLyBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSB2YWx1ZSByZXByZXNlbnRpbmcgYW4gXCJvd25lclwiIGZvciB0cmFuc2llbnQgd3JpdGVzXG4vLyB0byB0cmllcy4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIG9ubHkgZXZlciBlcXVhbCBpdHNlbGYsIGFuZCB3aWxsIG5vdCBlcXVhbFxuLy8gdGhlIHJldHVybiBvZiBhbnkgc3Vic2VxdWVudCBjYWxsIG9mIHRoaXMgZnVuY3Rpb24uXG5mdW5jdGlvbiBPd25lcklEKCkge31cblxuZnVuY3Rpb24gZW5zdXJlU2l6ZShpdGVyKSB7XG4gIGlmIChpdGVyLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgIGl0ZXIuc2l6ZSA9IGl0ZXIuX19pdGVyYXRlKHJldHVyblRydWUpO1xuICB9XG4gIHJldHVybiBpdGVyLnNpemU7XG59XG5cbmZ1bmN0aW9uIHdyYXBJbmRleChpdGVyLCBpbmRleCkge1xuICAvLyBUaGlzIGltcGxlbWVudHMgXCJpcyBhcnJheSBpbmRleFwiIHdoaWNoIHRoZSBFQ01BU3RyaW5nIHNwZWMgZGVmaW5lcyBhczpcbiAgLy9cbiAgLy8gICAgIEEgU3RyaW5nIHByb3BlcnR5IG5hbWUgUCBpcyBhbiBhcnJheSBpbmRleCBpZiBhbmQgb25seSBpZlxuICAvLyAgICAgVG9TdHJpbmcoVG9VaW50MzIoUCkpIGlzIGVxdWFsIHRvIFAgYW5kIFRvVWludDMyKFApIGlzIG5vdCBlcXVhbFxuICAvLyAgICAgdG8gMl4zMlx1MjIxMjEuXG4gIC8vXG4gIC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1hcnJheS1leG90aWMtb2JqZWN0c1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgIHZhciB1aW50MzJJbmRleCA9IGluZGV4ID4+PiAwOyAvLyBOID4+PiAwIGlzIHNob3J0aGFuZCBmb3IgVG9VaW50MzJcbiAgICBpZiAoJycgKyB1aW50MzJJbmRleCAhPT0gaW5kZXggfHwgdWludDMySW5kZXggPT09IDQyOTQ5NjcyOTUpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICAgIGluZGV4ID0gdWludDMySW5kZXg7XG4gIH1cbiAgcmV0dXJuIGluZGV4IDwgMCA/IGVuc3VyZVNpemUoaXRlcikgKyBpbmRleCA6IGluZGV4O1xufVxuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gd2hvbGVTbGljZShiZWdpbiwgZW5kLCBzaXplKSB7XG4gIHJldHVybiAoXG4gICAgKChiZWdpbiA9PT0gMCAmJiAhaXNOZWcoYmVnaW4pKSB8fFxuICAgICAgKHNpemUgIT09IHVuZGVmaW5lZCAmJiBiZWdpbiA8PSAtc2l6ZSkpICYmXG4gICAgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IChzaXplICE9PSB1bmRlZmluZWQgJiYgZW5kID49IHNpemUpKVxuICApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQmVnaW4oYmVnaW4sIHNpemUpIHtcbiAgcmV0dXJuIHJlc29sdmVJbmRleChiZWdpbiwgc2l6ZSwgMCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbmQoZW5kLCBzaXplKSB7XG4gIHJldHVybiByZXNvbHZlSW5kZXgoZW5kLCBzaXplLCBzaXplKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUluZGV4KGluZGV4LCBzaXplLCBkZWZhdWx0SW5kZXgpIHtcbiAgLy8gU2FuaXRpemUgaW5kaWNlcyB1c2luZyB0aGlzIHNob3J0aGFuZCBmb3IgVG9JbnQzMihhcmd1bWVudClcbiAgLy8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50MzJcbiAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWRcbiAgICA/IGRlZmF1bHRJbmRleFxuICAgIDogaXNOZWcoaW5kZXgpXG4gICAgPyBzaXplID09PSBJbmZpbml0eVxuICAgICAgPyBzaXplXG4gICAgICA6IE1hdGgubWF4KDAsIHNpemUgKyBpbmRleCkgfCAwXG4gICAgOiBzaXplID09PSB1bmRlZmluZWQgfHwgc2l6ZSA9PT0gaW5kZXhcbiAgICA/IGluZGV4XG4gICAgOiBNYXRoLm1pbihzaXplLCBpbmRleCkgfCAwO1xufVxuXG5mdW5jdGlvbiBpc05lZyh2YWx1ZSkge1xuICAvLyBBY2NvdW50IGZvciAtMCB3aGljaCBpcyBuZWdhdGl2ZSwgYnV0IG5vdCBsZXNzIHRoYW4gMC5cbiAgcmV0dXJuIHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlID09PSAtSW5maW5pdHkpO1xufVxuXG52YXIgSVNfQ09MTEVDVElPTl9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9JVEVSQUJMRV9fQEAnO1xuXG5mdW5jdGlvbiBpc0NvbGxlY3Rpb24obWF5YmVDb2xsZWN0aW9uKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlQ29sbGVjdGlvbiAmJiBtYXliZUNvbGxlY3Rpb25bSVNfQ09MTEVDVElPTl9TWU1CT0xdKTtcbn1cblxudmFyIElTX0tFWUVEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0tFWUVEX19AQCc7XG5cbmZ1bmN0aW9uIGlzS2V5ZWQobWF5YmVLZXllZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUtleWVkICYmIG1heWJlS2V5ZWRbSVNfS0VZRURfU1lNQk9MXSk7XG59XG5cbnZhciBJU19JTkRFWEVEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0lOREVYRURfX0BAJztcblxuZnVuY3Rpb24gaXNJbmRleGVkKG1heWJlSW5kZXhlZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUluZGV4ZWQgJiYgbWF5YmVJbmRleGVkW0lTX0lOREVYRURfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzQXNzb2NpYXRpdmUobWF5YmVBc3NvY2lhdGl2ZSkge1xuICByZXR1cm4gaXNLZXllZChtYXliZUFzc29jaWF0aXZlKSB8fCBpc0luZGV4ZWQobWF5YmVBc3NvY2lhdGl2ZSk7XG59XG5cbnZhciBDb2xsZWN0aW9uID0gZnVuY3Rpb24gQ29sbGVjdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNDb2xsZWN0aW9uKHZhbHVlKSA/IHZhbHVlIDogU2VxKHZhbHVlKTtcbn07XG5cbnZhciBLZXllZENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIEtleWVkQ29sbGVjdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0tleWVkKHZhbHVlKSA/IHZhbHVlIDogS2V5ZWRTZXEodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uICkgS2V5ZWRDb2xsZWN0aW9uLl9fcHJvdG9fXyA9IENvbGxlY3Rpb247XG4gIEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBLZXllZENvbGxlY3Rpb247XG5cbiAgcmV0dXJuIEtleWVkQ29sbGVjdGlvbjtcbn0oQ29sbGVjdGlvbikpO1xuXG52YXIgSW5kZXhlZENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIEluZGV4ZWRDb2xsZWN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzSW5kZXhlZCh2YWx1ZSkgPyB2YWx1ZSA6IEluZGV4ZWRTZXEodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uICkgSW5kZXhlZENvbGxlY3Rpb24uX19wcm90b19fID0gQ29sbGVjdGlvbjtcbiAgSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbmRleGVkQ29sbGVjdGlvbjtcblxuICByZXR1cm4gSW5kZXhlZENvbGxlY3Rpb247XG59KENvbGxlY3Rpb24pKTtcblxudmFyIFNldENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIFNldENvbGxlY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gaXNDb2xsZWN0aW9uKHZhbHVlKSAmJiAhaXNBc3NvY2lhdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IFNldFNlcSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIENvbGxlY3Rpb24gKSBTZXRDb2xsZWN0aW9uLl9fcHJvdG9fXyA9IENvbGxlY3Rpb247XG4gIFNldENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldENvbGxlY3Rpb247XG5cbiAgcmV0dXJuIFNldENvbGxlY3Rpb247XG59KENvbGxlY3Rpb24pKTtcblxuQ29sbGVjdGlvbi5LZXllZCA9IEtleWVkQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24uSW5kZXhlZCA9IEluZGV4ZWRDb2xsZWN0aW9uO1xuQ29sbGVjdGlvbi5TZXQgPSBTZXRDb2xsZWN0aW9uO1xuXG52YXIgSVNfU0VRX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NFUV9fQEAnO1xuXG5mdW5jdGlvbiBpc1NlcShtYXliZVNlcSkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVNlcSAmJiBtYXliZVNlcVtJU19TRVFfU1lNQk9MXSk7XG59XG5cbnZhciBJU19SRUNPUkRfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfUkVDT1JEX19AQCc7XG5cbmZ1bmN0aW9uIGlzUmVjb3JkKG1heWJlUmVjb3JkKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlUmVjb3JkICYmIG1heWJlUmVjb3JkW0lTX1JFQ09SRF9TWU1CT0xdKTtcbn1cblxuZnVuY3Rpb24gaXNJbW11dGFibGUobWF5YmVJbW11dGFibGUpIHtcbiAgcmV0dXJuIGlzQ29sbGVjdGlvbihtYXliZUltbXV0YWJsZSkgfHwgaXNSZWNvcmQobWF5YmVJbW11dGFibGUpO1xufVxuXG52YXIgSVNfT1JERVJFRF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9PUkRFUkVEX19AQCc7XG5cbmZ1bmN0aW9uIGlzT3JkZXJlZChtYXliZU9yZGVyZWQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVPcmRlcmVkICYmIG1heWJlT3JkZXJlZFtJU19PUkRFUkVEX1NZTUJPTF0pO1xufVxuXG52YXIgSVRFUkFURV9LRVlTID0gMDtcbnZhciBJVEVSQVRFX1ZBTFVFUyA9IDE7XG52YXIgSVRFUkFURV9FTlRSSUVTID0gMjtcblxudmFyIFJFQUxfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSBSRUFMX0lURVJBVE9SX1NZTUJPTCB8fCBGQVVYX0lURVJBVE9SX1NZTUJPTDtcblxudmFyIEl0ZXJhdG9yID0gZnVuY3Rpb24gSXRlcmF0b3IobmV4dCkge1xuICB0aGlzLm5leHQgPSBuZXh0O1xufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICByZXR1cm4gJ1tJdGVyYXRvcl0nO1xufTtcblxuSXRlcmF0b3IuS0VZUyA9IElURVJBVEVfS0VZUztcbkl0ZXJhdG9yLlZBTFVFUyA9IElURVJBVEVfVkFMVUVTO1xuSXRlcmF0b3IuRU5UUklFUyA9IElURVJBVEVfRU5UUklFUztcblxuSXRlcmF0b3IucHJvdG90eXBlLmluc3BlY3QgPSBJdGVyYXRvci5wcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuSXRlcmF0b3IucHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gaXRlcmF0b3JWYWx1ZSh0eXBlLCBrLCB2LCBpdGVyYXRvclJlc3VsdCkge1xuICB2YXIgdmFsdWUgPSB0eXBlID09PSAwID8gayA6IHR5cGUgPT09IDEgPyB2IDogW2ssIHZdO1xuICBpdGVyYXRvclJlc3VsdFxuICAgID8gKGl0ZXJhdG9yUmVzdWx0LnZhbHVlID0gdmFsdWUpXG4gICAgOiAoaXRlcmF0b3JSZXN1bHQgPSB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICB9KTtcbiAgcmV0dXJuIGl0ZXJhdG9yUmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpdGVyYXRvckRvbmUoKSB7XG4gIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbn1cblxuZnVuY3Rpb24gaGFzSXRlcmF0b3IobWF5YmVJdGVyYWJsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXliZUl0ZXJhYmxlKSkge1xuICAgIC8vIElFMTEgdHJpY2sgYXMgaXQgZG9lcyBub3Qgc3VwcG9ydCBgU3ltYm9sLml0ZXJhdG9yYFxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuICEhZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKTtcbn1cblxuZnVuY3Rpb24gaXNJdGVyYXRvcihtYXliZUl0ZXJhdG9yKSB7XG4gIHJldHVybiBtYXliZUl0ZXJhdG9yICYmIHR5cGVvZiBtYXliZUl0ZXJhdG9yLm5leHQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yKGl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihpdGVyYWJsZSk7XG4gIHJldHVybiBpdGVyYXRvckZuICYmIGl0ZXJhdG9yRm4uY2FsbChpdGVyYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4oaXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPVxuICAgIGl0ZXJhYmxlICYmXG4gICAgKChSRUFMX0lURVJBVE9SX1NZTUJPTCAmJiBpdGVyYWJsZVtSRUFMX0lURVJBVE9SX1NZTUJPTF0pIHx8XG4gICAgICBpdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0VudHJpZXNJdGVyYWJsZShtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKTtcbiAgcmV0dXJuIGl0ZXJhdG9yRm4gJiYgaXRlcmF0b3JGbiA9PT0gbWF5YmVJdGVyYWJsZS5lbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBpc0tleXNJdGVyYWJsZShtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKTtcbiAgcmV0dXJuIGl0ZXJhdG9yRm4gJiYgaXRlcmF0b3JGbiA9PT0gbWF5YmVJdGVyYWJsZS5rZXlzO1xufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAmJlxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlLmxlbmd0aCkgJiZcbiAgICB2YWx1ZS5sZW5ndGggPj0gMCAmJlxuICAgICh2YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgID8gLy8gT25seSB7bGVuZ3RoOiAwfSBpcyBjb25zaWRlcmVkIEFycmF5LWxpa2UuXG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDFcbiAgICAgIDogLy8gQW4gb2JqZWN0IGlzIG9ubHkgQXJyYXktbGlrZSBpZiBpdCBoYXMgYSBwcm9wZXJ0eSB3aGVyZSB0aGUgbGFzdCB2YWx1ZVxuICAgICAgICAvLyBpbiB0aGUgYXJyYXktbGlrZSBtYXkgYmUgZm91bmQgKHdoaWNoIGNvdWxkIGJlIHVuZGVmaW5lZCkuXG4gICAgICAgIHZhbHVlLmhhc093blByb3BlcnR5KHZhbHVlLmxlbmd0aCAtIDEpKVxuICApO1xufVxuXG52YXIgU2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoQ29sbGVjdGlvbikge1xuICBmdW5jdGlvbiBTZXEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNlcXVlbmNlKClcbiAgICAgIDogaXNJbW11dGFibGUodmFsdWUpXG4gICAgICA/IHZhbHVlLnRvU2VxKClcbiAgICAgIDogc2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggQ29sbGVjdGlvbiApIFNlcS5fX3Byb3RvX18gPSBDb2xsZWN0aW9uO1xuICBTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VxO1xuXG4gIFNlcS5wcm90b3R5cGUudG9TZXEgPSBmdW5jdGlvbiB0b1NlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTZXEgeycsICd9Jyk7XG4gIH07XG5cbiAgU2VxLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IGZ1bmN0aW9uIGNhY2hlUmVzdWx0ICgpIHtcbiAgICBpZiAoIXRoaXMuX2NhY2hlICYmIHRoaXMuX19pdGVyYXRlVW5jYWNoZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy5lbnRyeVNlcSgpLnRvQXJyYXkoKTtcbiAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuX2NhY2hlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRlVW5jYWNoZWQoZm4sIHJldmVyc2UpXG5cbiAgU2VxLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5fY2FjaGU7XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICB2YXIgc2l6ZSA9IGNhY2hlLmxlbmd0aDtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGNhY2hlW3JldmVyc2UgPyBzaXplIC0gKytpIDogaSsrXTtcbiAgICAgICAgaWYgKGZuKGVudHJ5WzFdLCBlbnRyeVswXSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdGVVbmNhY2hlZChmbiwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRvclVuY2FjaGVkKHR5cGUsIHJldmVyc2UpXG5cbiAgU2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlO1xuICAgIGlmIChjYWNoZSkge1xuICAgICAgdmFyIHNpemUgPSBjYWNoZS5sZW5ndGg7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGkgPT09IHNpemUpIHtcbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gY2FjaGVbcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKytdO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBlbnRyeVswXSwgZW50cnlbMV0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3JVbmNhY2hlZCh0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICByZXR1cm4gU2VxO1xufShDb2xsZWN0aW9uKSk7XG5cbnZhciBLZXllZFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlcSkge1xuICBmdW5jdGlvbiBLZXllZFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U2VxdWVuY2UoKS50b0tleWVkU2VxKClcbiAgICAgIDogaXNDb2xsZWN0aW9uKHZhbHVlKVxuICAgICAgPyBpc0tleWVkKHZhbHVlKVxuICAgICAgICA/IHZhbHVlLnRvU2VxKClcbiAgICAgICAgOiB2YWx1ZS5mcm9tRW50cnlTZXEoKVxuICAgICAgOiBpc1JlY29yZCh2YWx1ZSlcbiAgICAgID8gdmFsdWUudG9TZXEoKVxuICAgICAgOiBrZXllZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIFNlcSApIEtleWVkU2VxLl9fcHJvdG9fXyA9IFNlcTtcbiAgS2V5ZWRTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VxICYmIFNlcS5wcm90b3R5cGUgKTtcbiAgS2V5ZWRTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gS2V5ZWRTZXE7XG5cbiAgS2V5ZWRTZXEucHJvdG90eXBlLnRvS2V5ZWRTZXEgPSBmdW5jdGlvbiB0b0tleWVkU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gS2V5ZWRTZXE7XG59KFNlcSkpO1xuXG52YXIgSW5kZXhlZFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlcSkge1xuICBmdW5jdGlvbiBJbmRleGVkU2VxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTZXF1ZW5jZSgpXG4gICAgICA6IGlzQ29sbGVjdGlvbih2YWx1ZSlcbiAgICAgID8gaXNLZXllZCh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZS5lbnRyeVNlcSgpXG4gICAgICAgIDogdmFsdWUudG9JbmRleGVkU2VxKClcbiAgICAgIDogaXNSZWNvcmQodmFsdWUpXG4gICAgICA/IHZhbHVlLnRvU2VxKCkuZW50cnlTZXEoKVxuICAgICAgOiBpbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggU2VxICkgSW5kZXhlZFNlcS5fX3Byb3RvX18gPSBTZXE7XG4gIEluZGV4ZWRTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VxICYmIFNlcS5wcm90b3R5cGUgKTtcbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbmRleGVkU2VxO1xuXG4gIEluZGV4ZWRTZXEub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiBJbmRleGVkU2VxKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUudG9JbmRleGVkU2VxID0gZnVuY3Rpb24gdG9JbmRleGVkU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBJbmRleGVkU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTZXEgWycsICddJyk7XG4gIH07XG5cbiAgcmV0dXJuIEluZGV4ZWRTZXE7XG59KFNlcSkpO1xuXG52YXIgU2V0U2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2VxKSB7XG4gIGZ1bmN0aW9uIFNldFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiAoXG4gICAgICBpc0NvbGxlY3Rpb24odmFsdWUpICYmICFpc0Fzc29jaWF0aXZlKHZhbHVlKSA/IHZhbHVlIDogSW5kZXhlZFNlcSh2YWx1ZSlcbiAgICApLnRvU2V0U2VxKCk7XG4gIH1cblxuICBpZiAoIFNlcSApIFNldFNlcS5fX3Byb3RvX18gPSBTZXE7XG4gIFNldFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXEgJiYgU2VxLnByb3RvdHlwZSApO1xuICBTZXRTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0U2VxO1xuXG4gIFNldFNlcS5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIFNldFNlcShhcmd1bWVudHMpO1xuICB9O1xuXG4gIFNldFNlcS5wcm90b3R5cGUudG9TZXRTZXEgPSBmdW5jdGlvbiB0b1NldFNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIFNldFNlcTtcbn0oU2VxKSk7XG5cblNlcS5pc1NlcSA9IGlzU2VxO1xuU2VxLktleWVkID0gS2V5ZWRTZXE7XG5TZXEuU2V0ID0gU2V0U2VxO1xuU2VxLkluZGV4ZWQgPSBJbmRleGVkU2VxO1xuXG5TZXEucHJvdG90eXBlW0lTX1NFUV9TWU1CT0xdID0gdHJ1ZTtcblxuLy8gI3ByYWdtYSBSb290IFNlcXVlbmNlc1xuXG52YXIgQXJyYXlTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxKSB7XG4gIGZ1bmN0aW9uIEFycmF5U2VxKGFycmF5KSB7XG4gICAgdGhpcy5fYXJyYXkgPSBhcnJheTtcbiAgICB0aGlzLnNpemUgPSBhcnJheS5sZW5ndGg7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEgKSBBcnJheVNlcS5fX3Byb3RvX18gPSBJbmRleGVkU2VxO1xuICBBcnJheVNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxICYmIEluZGV4ZWRTZXEucHJvdG90eXBlICk7XG4gIEFycmF5U2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFycmF5U2VxO1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyhpbmRleCkgPyB0aGlzLl9hcnJheVt3cmFwSW5kZXgodGhpcywgaW5kZXgpXSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGFycmF5ID0gdGhpcy5fYXJyYXk7XG4gICAgdmFyIHNpemUgPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICB2YXIgaWkgPSByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKztcbiAgICAgIGlmIChmbihhcnJheVtpaV0sIGlpLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBhcnJheSA9IHRoaXMuX2FycmF5O1xuICAgIHZhciBzaXplID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBpaSA9IHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaWksIGFycmF5W2lpXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5U2VxO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBPYmplY3RTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZFNlcSkge1xuICBmdW5jdGlvbiBPYmplY3RTZXEob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcbiAgICB0aGlzLl9rZXlzID0ga2V5cztcbiAgICB0aGlzLnNpemUgPSBrZXlzLmxlbmd0aDtcbiAgfVxuXG4gIGlmICggS2V5ZWRTZXEgKSBPYmplY3RTZXEuX19wcm90b19fID0gS2V5ZWRTZXE7XG4gIE9iamVjdFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBLZXllZFNlcSAmJiBLZXllZFNlcS5wcm90b3R5cGUgKTtcbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE9iamVjdFNlcTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoa2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIGlmIChub3RTZXRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vYmplY3Rba2V5XTtcbiAgfTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwodGhpcy5fb2JqZWN0LCBrZXkpO1xuICB9O1xuXG4gIE9iamVjdFNlcS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBvYmplY3QgPSB0aGlzLl9vYmplY3Q7XG4gICAgdmFyIGtleXMgPSB0aGlzLl9rZXlzO1xuICAgIHZhciBzaXplID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICBpZiAoZm4ob2JqZWN0W2tleV0sIGtleSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXMuX29iamVjdDtcbiAgICB2YXIga2V5cyA9IHRoaXMuX2tleXM7XG4gICAgdmFyIHNpemUgPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA9PT0gc2l6ZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIga2V5ID0ga2V5c1tyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBrZXksIG9iamVjdFtrZXldKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0U2VxO1xufShLZXllZFNlcSkpO1xuT2JqZWN0U2VxLnByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuXG52YXIgQ29sbGVjdGlvblNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEpIHtcbiAgZnVuY3Rpb24gQ29sbGVjdGlvblNlcShjb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5zaXplID0gY29sbGVjdGlvbi5sZW5ndGggfHwgY29sbGVjdGlvbi5zaXplO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxICkgQ29sbGVjdGlvblNlcS5fX3Byb3RvX18gPSBJbmRleGVkU2VxO1xuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgQ29sbGVjdGlvblNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2xsZWN0aW9uU2VxO1xuXG4gIENvbGxlY3Rpb25TZXEucHJvdG90eXBlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24gX19pdGVyYXRlVW5jYWNoZWQgKGZuLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uO1xuICAgIHZhciBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKGNvbGxlY3Rpb24pO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBpZiAoaXNJdGVyYXRvcihpdGVyYXRvcikpIHtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBpZiAoZm4oc3RlcC52YWx1ZSwgaXRlcmF0aW9ucysrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcblxuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yVW5jYWNoZWQgKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb247XG4gICAgdmFyIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoY29sbGVjdGlvbik7XG4gICAgaWYgKCFpc0l0ZXJhdG9yKGl0ZXJhdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihpdGVyYXRvckRvbmUpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHJldHVybiBzdGVwLmRvbmUgPyBzdGVwIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHN0ZXAudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDb2xsZWN0aW9uU2VxO1xufShJbmRleGVkU2VxKSk7XG5cbi8vICMgcHJhZ21hIEhlbHBlciBmdW5jdGlvbnNcblxudmFyIEVNUFRZX1NFUTtcblxuZnVuY3Rpb24gZW1wdHlTZXF1ZW5jZSgpIHtcbiAgcmV0dXJuIEVNUFRZX1NFUSB8fCAoRU1QVFlfU0VRID0gbmV3IEFycmF5U2VxKFtdKSk7XG59XG5cbmZ1bmN0aW9uIGtleWVkU2VxRnJvbVZhbHVlKHZhbHVlKSB7XG4gIHZhciBzZXEgPSBtYXliZUluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpO1xuICBpZiAoc2VxKSB7XG4gICAgcmV0dXJuIHNlcS5mcm9tRW50cnlTZXEoKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U2VxKHZhbHVlKTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdFeHBlY3RlZCBBcnJheSBvciBjb2xsZWN0aW9uIG9iamVjdCBvZiBbaywgdl0gZW50cmllcywgb3Iga2V5ZWQgb2JqZWN0OiAnICtcbiAgICAgIHZhbHVlXG4gICk7XG59XG5cbmZ1bmN0aW9uIGluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgdmFyIHNlcSA9IG1heWJlSW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIGlmIChzZXEpIHtcbiAgICByZXR1cm4gc2VxO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ0V4cGVjdGVkIEFycmF5IG9yIGNvbGxlY3Rpb24gb2JqZWN0IG9mIHZhbHVlczogJyArIHZhbHVlXG4gICk7XG59XG5cbmZ1bmN0aW9uIHNlcUZyb21WYWx1ZSh2YWx1ZSkge1xuICB2YXIgc2VxID0gbWF5YmVJbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgaWYgKHNlcSkge1xuICAgIHJldHVybiBpc0VudHJpZXNJdGVyYWJsZSh2YWx1ZSlcbiAgICAgID8gc2VxLmZyb21FbnRyeVNlcSgpXG4gICAgICA6IGlzS2V5c0l0ZXJhYmxlKHZhbHVlKVxuICAgICAgPyBzZXEudG9TZXRTZXEoKVxuICAgICAgOiBzZXE7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFNlcSh2YWx1ZSk7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnRXhwZWN0ZWQgQXJyYXkgb3IgY29sbGVjdGlvbiBvYmplY3Qgb2YgdmFsdWVzLCBvciBrZXllZCBvYmplY3Q6ICcgKyB2YWx1ZVxuICApO1xufVxuXG5mdW5jdGlvbiBtYXliZUluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKHZhbHVlKVxuICAgID8gbmV3IEFycmF5U2VxKHZhbHVlKVxuICAgIDogaGFzSXRlcmF0b3IodmFsdWUpXG4gICAgPyBuZXcgQ29sbGVjdGlvblNlcSh2YWx1ZSlcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxudmFyIElTX01BUF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9NQVBfX0BAJztcblxuZnVuY3Rpb24gaXNNYXAobWF5YmVNYXApIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVNYXAgJiYgbWF5YmVNYXBbSVNfTUFQX1NZTUJPTF0pO1xufVxuXG5mdW5jdGlvbiBpc09yZGVyZWRNYXAobWF5YmVPcmRlcmVkTWFwKSB7XG4gIHJldHVybiBpc01hcChtYXliZU9yZGVyZWRNYXApICYmIGlzT3JkZXJlZChtYXliZU9yZGVyZWRNYXApO1xufVxuXG5mdW5jdGlvbiBpc1ZhbHVlT2JqZWN0KG1heWJlVmFsdWUpIHtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgbWF5YmVWYWx1ZSAmJlxuICAgICAgdHlwZW9mIG1heWJlVmFsdWUuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgbWF5YmVWYWx1ZS5oYXNoQ29kZSA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuXG4vKipcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgXCJzYW1lLXZhbHVlXCIgYWxnb3JpdGhtIGFzIFtkZXNjcmliZWQgZm9yIHVzZSBieSBFUzYgTWFwXG4gKiBhbmQgU2V0XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAjS2V5X2VxdWFsaXR5KVxuICpcbiAqIE5hTiBpcyBjb25zaWRlcmVkIHRoZSBzYW1lIGFzIE5hTiwgaG93ZXZlciAtMCBhbmQgMCBhcmUgY29uc2lkZXJlZCB0aGUgc2FtZVxuICogdmFsdWUsIHdoaWNoIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhbGdvcml0aG0gZGVzY3JpYmVkIGJ5XG4gKiBbYE9iamVjdC5pc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pcykuXG4gKlxuICogVGhpcyBpcyBleHRlbmRlZCBmdXJ0aGVyIHRvIGFsbG93IE9iamVjdHMgdG8gZGVzY3JpYmUgdGhlIHZhbHVlcyB0aGV5XG4gKiByZXByZXNlbnQsIGJ5IHdheSBvZiBgdmFsdWVPZmAgb3IgYGVxdWFsc2AgKGFuZCBgaGFzaENvZGVgKS5cbiAqXG4gKiBOb3RlOiBiZWNhdXNlIG9mIHRoaXMgZXh0ZW5zaW9uLCB0aGUga2V5IGVxdWFsaXR5IG9mIEltbXV0YWJsZS5NYXAgYW5kIHRoZVxuICogdmFsdWUgZXF1YWxpdHkgb2YgSW1tdXRhYmxlLlNldCB3aWxsIGRpZmZlciBmcm9tIEVTNiBNYXAgYW5kIFNldC5cbiAqXG4gKiAjIyMgRGVmaW5pbmcgY3VzdG9tIHZhbHVlc1xuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBkZXNjcmliZSB0aGUgdmFsdWUgYW4gb2JqZWN0IHJlcHJlc2VudHMgaXMgYnkgaW1wbGVtZW50aW5nXG4gKiBgdmFsdWVPZmAuIEZvciBleGFtcGxlLCBgRGF0ZWAgcmVwcmVzZW50cyBhIHZhbHVlIGJ5IHJldHVybmluZyBhIHVuaXhcbiAqIHRpbWVzdGFtcCBmb3IgYHZhbHVlT2ZgOlxuICpcbiAqICAgICB2YXIgZGF0ZTEgPSBuZXcgRGF0ZSgxMjM0NTY3ODkwMDAwKTsgLy8gRnJpIEZlYiAxMyAyMDA5IC4uLlxuICogICAgIHZhciBkYXRlMiA9IG5ldyBEYXRlKDEyMzQ1Njc4OTAwMDApO1xuICogICAgIGRhdGUxLnZhbHVlT2YoKTsgLy8gMTIzNDU2Nzg5MDAwMFxuICogICAgIGFzc2VydCggZGF0ZTEgIT09IGRhdGUyICk7XG4gKiAgICAgYXNzZXJ0KCBJbW11dGFibGUuaXMoIGRhdGUxLCBkYXRlMiApICk7XG4gKlxuICogTm90ZTogb3ZlcnJpZGluZyBgdmFsdWVPZmAgbWF5IGhhdmUgb3RoZXIgaW1wbGljYXRpb25zIGlmIHlvdSB1c2UgdGhpcyBvYmplY3RcbiAqIHdoZXJlIEphdmFTY3JpcHQgZXhwZWN0cyBhIHByaW1pdGl2ZSwgc3VjaCBhcyBpbXBsaWNpdCBzdHJpbmcgY29lcmNpb24uXG4gKlxuICogRm9yIG1vcmUgY29tcGxleCB0eXBlcywgZXNwZWNpYWxseSBjb2xsZWN0aW9ucywgaW1wbGVtZW50aW5nIGB2YWx1ZU9mYCBtYXlcbiAqIG5vdCBiZSBwZXJmb3JtYW50LiBBbiBhbHRlcm5hdGl2ZSBpcyB0byBpbXBsZW1lbnQgYGVxdWFsc2AgYW5kIGBoYXNoQ29kZWAuXG4gKlxuICogYGVxdWFsc2AgdGFrZXMgYW5vdGhlciBvYmplY3QsIHByZXN1bWFibHkgb2Ygc2ltaWxhciB0eXBlLCBhbmQgcmV0dXJucyB0cnVlXG4gKiBpZiBpdCBpcyBlcXVhbC4gRXF1YWxpdHkgaXMgc3ltbWV0cmljYWwsIHNvIHRoZSBzYW1lIHJlc3VsdCBzaG91bGQgYmVcbiAqIHJldHVybmVkIGlmIHRoaXMgYW5kIHRoZSBhcmd1bWVudCBhcmUgZmxpcHBlZC5cbiAqXG4gKiAgICAgYXNzZXJ0KCBhLmVxdWFscyhiKSA9PT0gYi5lcXVhbHMoYSkgKTtcbiAqXG4gKiBgaGFzaENvZGVgIHJldHVybnMgYSAzMmJpdCBpbnRlZ2VyIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG9iamVjdCB3aGljaCB3aWxsXG4gKiBiZSB1c2VkIHRvIGRldGVybWluZSBob3cgdG8gc3RvcmUgdGhlIHZhbHVlIG9iamVjdCBpbiBhIE1hcCBvciBTZXQuIFlvdSBtdXN0XG4gKiBwcm92aWRlIGJvdGggb3IgbmVpdGhlciBtZXRob2RzLCBvbmUgbXVzdCBub3QgZXhpc3Qgd2l0aG91dCB0aGUgb3RoZXIuXG4gKlxuICogQWxzbywgYW4gaW1wb3J0YW50IHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHRoZXNlIG1ldGhvZHMgbXVzdCBiZSB1cGhlbGQ6IGlmIHR3b1xuICogdmFsdWVzIGFyZSBlcXVhbCwgdGhleSAqbXVzdCogcmV0dXJuIHRoZSBzYW1lIGhhc2hDb2RlLiBJZiB0aGUgdmFsdWVzIGFyZSBub3RcbiAqIGVxdWFsLCB0aGV5IG1pZ2h0IGhhdmUgdGhlIHNhbWUgaGFzaENvZGU7IHRoaXMgaXMgY2FsbGVkIGEgaGFzaCBjb2xsaXNpb24sXG4gKiBhbmQgd2hpbGUgdW5kZXNpcmFibGUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIGl0IGlzIGFjY2VwdGFibGUuXG4gKlxuICogICAgIGlmIChhLmVxdWFscyhiKSkge1xuICogICAgICAgYXNzZXJ0KCBhLmhhc2hDb2RlKCkgPT09IGIuaGFzaENvZGUoKSApO1xuICogICAgIH1cbiAqXG4gKiBBbGwgSW1tdXRhYmxlIGNvbGxlY3Rpb25zIGFyZSBWYWx1ZSBPYmplY3RzOiB0aGV5IGltcGxlbWVudCBgZXF1YWxzKClgXG4gKiBhbmQgYGhhc2hDb2RlKClgLlxuICovXG5mdW5jdGlvbiBpcyh2YWx1ZUEsIHZhbHVlQikge1xuICBpZiAodmFsdWVBID09PSB2YWx1ZUIgfHwgKHZhbHVlQSAhPT0gdmFsdWVBICYmIHZhbHVlQiAhPT0gdmFsdWVCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICghdmFsdWVBIHx8ICF2YWx1ZUIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKFxuICAgIHR5cGVvZiB2YWx1ZUEudmFsdWVPZiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiB2YWx1ZUIudmFsdWVPZiA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICB2YWx1ZUEgPSB2YWx1ZUEudmFsdWVPZigpO1xuICAgIHZhbHVlQiA9IHZhbHVlQi52YWx1ZU9mKCk7XG4gICAgaWYgKHZhbHVlQSA9PT0gdmFsdWVCIHx8ICh2YWx1ZUEgIT09IHZhbHVlQSAmJiB2YWx1ZUIgIT09IHZhbHVlQikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXZhbHVlQSB8fCAhdmFsdWVCKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiAhIShcbiAgICBpc1ZhbHVlT2JqZWN0KHZhbHVlQSkgJiZcbiAgICBpc1ZhbHVlT2JqZWN0KHZhbHVlQikgJiZcbiAgICB2YWx1ZUEuZXF1YWxzKHZhbHVlQilcbiAgKTtcbn1cblxudmFyIGltdWwgPVxuICB0eXBlb2YgTWF0aC5pbXVsID09PSAnZnVuY3Rpb24nICYmIE1hdGguaW11bCgweGZmZmZmZmZmLCAyKSA9PT0gLTJcbiAgICA/IE1hdGguaW11bFxuICAgIDogZnVuY3Rpb24gaW11bChhLCBiKSB7XG4gICAgICAgIGEgfD0gMDsgLy8gaW50XG4gICAgICAgIGIgfD0gMDsgLy8gaW50XG4gICAgICAgIHZhciBjID0gYSAmIDB4ZmZmZjtcbiAgICAgICAgdmFyIGQgPSBiICYgMHhmZmZmO1xuICAgICAgICAvLyBTaGlmdCBieSAwIGZpeGVzIHRoZSBzaWduIG9uIHRoZSBoaWdoIHBhcnQuXG4gICAgICAgIHJldHVybiAoYyAqIGQgKyAoKCgoYSA+Pj4gMTYpICogZCArIGMgKiAoYiA+Pj4gMTYpKSA8PCAxNikgPj4+IDApKSB8IDA7IC8vIGludFxuICAgICAgfTtcblxuLy8gdjggaGFzIGFuIG9wdGltaXphdGlvbiBmb3Igc3RvcmluZyAzMS1iaXQgc2lnbmVkIG51bWJlcnMuXG4vLyBWYWx1ZXMgd2hpY2ggaGF2ZSBlaXRoZXIgMDAgb3IgMTEgYXMgdGhlIGhpZ2ggb3JkZXIgYml0cyBxdWFsaWZ5LlxuLy8gVGhpcyBmdW5jdGlvbiBkcm9wcyB0aGUgaGlnaGVzdCBvcmRlciBiaXQgaW4gYSBzaWduZWQgbnVtYmVyLCBtYWludGFpbmluZ1xuLy8gdGhlIHNpZ24gYml0LlxuZnVuY3Rpb24gc21pKGkzMikge1xuICByZXR1cm4gKChpMzIgPj4+IDEpICYgMHg0MDAwMDAwMCkgfCAoaTMyICYgMHhiZmZmZmZmZik7XG59XG5cbnZhciBkZWZhdWx0VmFsdWVPZiA9IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZjtcblxuZnVuY3Rpb24gaGFzaChvKSB7XG4gIGlmIChvID09IG51bGwpIHtcbiAgICByZXR1cm4gaGFzaE51bGxpc2gobyk7XG4gIH1cblxuICBpZiAodHlwZW9mIG8uaGFzaENvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBEcm9wIGFueSBoaWdoIGJpdHMgZnJvbSBhY2NpZGVudGFsbHkgbG9uZyBoYXNoIGNvZGVzLlxuICAgIHJldHVybiBzbWkoby5oYXNoQ29kZShvKSk7XG4gIH1cblxuICB2YXIgdiA9IHZhbHVlT2Yobyk7XG5cbiAgaWYgKHYgPT0gbnVsbCkge1xuICAgIHJldHVybiBoYXNoTnVsbGlzaCh2KTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIC8vIFRoZSBoYXNoIHZhbHVlcyBmb3IgYnVpbHQtaW4gY29uc3RhbnRzIGFyZSBhIDEgdmFsdWUgZm9yIGVhY2ggNS1ieXRlXG4gICAgICAvLyBzaGlmdCByZWdpb24gZXhwZWN0IGZvciB0aGUgZmlyc3QsIHdoaWNoIGVuY29kZXMgdGhlIHZhbHVlLiBUaGlzXG4gICAgICAvLyByZWR1Y2VzIHRoZSBvZGRzIG9mIGEgaGFzaCBjb2xsaXNpb24gZm9yIHRoZXNlIGNvbW1vbiB2YWx1ZXMuXG4gICAgICByZXR1cm4gdiA/IDB4NDIxMDg0MjEgOiAweDQyMTA4NDIwO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaGFzaE51bWJlcih2KTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHYubGVuZ3RoID4gU1RSSU5HX0hBU0hfQ0FDSEVfTUlOX1NUUkxFTlxuICAgICAgICA/IGNhY2hlZEhhc2hTdHJpbmcodilcbiAgICAgICAgOiBoYXNoU3RyaW5nKHYpO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIGhhc2hKU09iaih2KTtcbiAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgcmV0dXJuIGhhc2hTeW1ib2wodik7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2Ygdi50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gaGFzaFN0cmluZyh2LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSB0eXBlICcgKyB0eXBlb2YgdiArICcgY2Fubm90IGJlIGhhc2hlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNoTnVsbGlzaChudWxsaXNoKSB7XG4gIHJldHVybiBudWxsaXNoID09PSBudWxsID8gMHg0MjEwODQyMiA6IC8qIHVuZGVmaW5lZCAqLyAweDQyMTA4NDIzO1xufVxuXG4vLyBDb21wcmVzcyBhcmJpdHJhcmlseSBsYXJnZSBudW1iZXJzIGludG8gc21pIGhhc2hlcy5cbmZ1bmN0aW9uIGhhc2hOdW1iZXIobikge1xuICBpZiAobiAhPT0gbiB8fCBuID09PSBJbmZpbml0eSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBoYXNoID0gbiB8IDA7XG4gIGlmIChoYXNoICE9PSBuKSB7XG4gICAgaGFzaCBePSBuICogMHhmZmZmZmZmZjtcbiAgfVxuICB3aGlsZSAobiA+IDB4ZmZmZmZmZmYpIHtcbiAgICBuIC89IDB4ZmZmZmZmZmY7XG4gICAgaGFzaCBePSBuO1xuICB9XG4gIHJldHVybiBzbWkoaGFzaCk7XG59XG5cbmZ1bmN0aW9uIGNhY2hlZEhhc2hTdHJpbmcoc3RyaW5nKSB7XG4gIHZhciBoYXNoZWQgPSBzdHJpbmdIYXNoQ2FjaGVbc3RyaW5nXTtcbiAgaWYgKGhhc2hlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFzaGVkID0gaGFzaFN0cmluZyhzdHJpbmcpO1xuICAgIGlmIChTVFJJTkdfSEFTSF9DQUNIRV9TSVpFID09PSBTVFJJTkdfSEFTSF9DQUNIRV9NQVhfU0laRSkge1xuICAgICAgU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSA9IDA7XG4gICAgICBzdHJpbmdIYXNoQ2FjaGUgPSB7fTtcbiAgICB9XG4gICAgU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSsrO1xuICAgIHN0cmluZ0hhc2hDYWNoZVtzdHJpbmddID0gaGFzaGVkO1xuICB9XG4gIHJldHVybiBoYXNoZWQ7XG59XG5cbi8vIGh0dHA6Ly9qc3BlcmYuY29tL2hhc2hpbmctc3RyaW5nc1xuZnVuY3Rpb24gaGFzaFN0cmluZyhzdHJpbmcpIHtcbiAgLy8gVGhpcyBpcyB0aGUgaGFzaCBmcm9tIEpWTVxuICAvLyBUaGUgaGFzaCBjb2RlIGZvciBhIHN0cmluZyBpcyBjb21wdXRlZCBhc1xuICAvLyBzWzBdICogMzEgXiAobiAtIDEpICsgc1sxXSAqIDMxIF4gKG4gLSAyKSArIC4uLiArIHNbbiAtIDFdLFxuICAvLyB3aGVyZSBzW2ldIGlzIHRoZSBpdGggY2hhcmFjdGVyIG9mIHRoZSBzdHJpbmcgYW5kIG4gaXMgdGhlIGxlbmd0aCBvZlxuICAvLyB0aGUgc3RyaW5nLiBXZSBcIm1vZFwiIHRoZSByZXN1bHQgdG8gbWFrZSBpdCBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIDJeMzFcbiAgLy8gKGV4Y2x1c2l2ZSkgYnkgZHJvcHBpbmcgaGlnaCBiaXRzLlxuICB2YXIgaGFzaGVkID0gMDtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHN0cmluZy5sZW5ndGg7IGlpKyspIHtcbiAgICBoYXNoZWQgPSAoMzEgKiBoYXNoZWQgKyBzdHJpbmcuY2hhckNvZGVBdChpaSkpIHwgMDtcbiAgfVxuICByZXR1cm4gc21pKGhhc2hlZCk7XG59XG5cbmZ1bmN0aW9uIGhhc2hTeW1ib2woc3ltKSB7XG4gIHZhciBoYXNoZWQgPSBzeW1ib2xNYXBbc3ltXTtcbiAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGhhc2hlZDtcbiAgfVxuXG4gIGhhc2hlZCA9IG5leHRIYXNoKCk7XG5cbiAgc3ltYm9sTWFwW3N5bV0gPSBoYXNoZWQ7XG5cbiAgcmV0dXJuIGhhc2hlZDtcbn1cblxuZnVuY3Rpb24gaGFzaEpTT2JqKG9iaikge1xuICB2YXIgaGFzaGVkO1xuICBpZiAodXNpbmdXZWFrTWFwKSB7XG4gICAgaGFzaGVkID0gd2Vha01hcC5nZXQob2JqKTtcbiAgICBpZiAoaGFzaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBoYXNoZWQ7XG4gICAgfVxuICB9XG5cbiAgaGFzaGVkID0gb2JqW1VJRF9IQVNIX0tFWV07XG4gIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNoZWQ7XG4gIH1cblxuICBpZiAoIWNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgaGFzaGVkID0gb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlICYmIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZVtVSURfSEFTSF9LRVldO1xuICAgIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGhhc2hlZDtcbiAgICB9XG5cbiAgICBoYXNoZWQgPSBnZXRJRU5vZGVIYXNoKG9iaik7XG4gICAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gaGFzaGVkO1xuICAgIH1cbiAgfVxuXG4gIGhhc2hlZCA9IG5leHRIYXNoKCk7XG5cbiAgaWYgKHVzaW5nV2Vha01hcCkge1xuICAgIHdlYWtNYXAuc2V0KG9iaiwgaGFzaGVkKTtcbiAgfSBlbHNlIGlmIChpc0V4dGVuc2libGUgIT09IHVuZGVmaW5lZCAmJiBpc0V4dGVuc2libGUob2JqKSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbi1leHRlbnNpYmxlIG9iamVjdHMgYXJlIG5vdCBhbGxvd2VkIGFzIGtleXMuJyk7XG4gIH0gZWxzZSBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBVSURfSEFTSF9LRVksIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBoYXNoZWQsXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoXG4gICAgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlICE9PSB1bmRlZmluZWQgJiZcbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgPT09IG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVcbiAgKSB7XG4gICAgLy8gU2luY2Ugd2UgY2FuJ3QgZGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgb24gdGhlIG9iamVjdFxuICAgIC8vIHdlJ2xsIGhpamFjayBvbmUgb2YgdGhlIGxlc3MtdXNlZCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIHRvXG4gICAgLy8gc2F2ZSBvdXIgaGFzaCBvbiBpdC4gU2luY2UgdGhpcyBpcyBhIGZ1bmN0aW9uIGl0IHdpbGwgbm90IHNob3cgdXAgaW5cbiAgICAvLyBgSlNPTi5zdHJpbmdpZnlgIHdoaWNoIGlzIHdoYXQgd2Ugd2FudC5cbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuYXBwbHkoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIGFyZ3VtZW50c1xuICAgICAgKTtcbiAgICB9O1xuICAgIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZVtVSURfSEFTSF9LRVldID0gaGFzaGVkO1xuICB9IGVsc2UgaWYgKG9iai5ub2RlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBjb3VsZG4ndCBnZXQgdGhlIElFIGB1bmlxdWVJRGAgdG8gdXNlIGFzIGEgaGFzaFxuICAgIC8vIGFuZCB3ZSBjb3VsZG4ndCB1c2UgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB0byBleHBsb2l0IHRoZVxuICAgIC8vIGRvbnRFbnVtIGJ1ZyBzbyB3ZSBzaW1wbHkgYWRkIHRoZSBgVUlEX0hBU0hfS0VZYCBvbiB0aGUgbm9kZVxuICAgIC8vIGl0c2VsZi5cbiAgICBvYmpbVUlEX0hBU0hfS0VZXSA9IGhhc2hlZDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBzZXQgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBvbiBvYmplY3QuJyk7XG4gIH1cblxuICByZXR1cm4gaGFzaGVkO1xufVxuXG4vLyBHZXQgcmVmZXJlbmNlcyB0byBFUzUgb2JqZWN0IG1ldGhvZHMuXG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcblxuLy8gVHJ1ZSBpZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgd29ya3MgYXMgZXhwZWN0ZWQuIElFOCBmYWlscyB0aGlzIHRlc3QuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ0AnLCB7fSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8vIElFIGhhcyBhIGB1bmlxdWVJRGAgcHJvcGVydHkgb24gRE9NIG5vZGVzLiBXZSBjYW4gY29uc3RydWN0IHRoZSBoYXNoIGZyb20gaXRcbi8vIGFuZCBhdm9pZCBtZW1vcnkgbGVha3MgZnJvbSB0aGUgSUUgY2xvbmVOb2RlIGJ1Zy5cbmZ1bmN0aW9uIGdldElFTm9kZUhhc2gobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID4gMCkge1xuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSAxOiAvLyBFbGVtZW50XG4gICAgICAgIHJldHVybiBub2RlLnVuaXF1ZUlEO1xuICAgICAgY2FzZSA5OiAvLyBEb2N1bWVudFxuICAgICAgICByZXR1cm4gbm9kZS5kb2N1bWVudEVsZW1lbnQgJiYgbm9kZS5kb2N1bWVudEVsZW1lbnQudW5pcXVlSUQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbHVlT2Yob2JqKSB7XG4gIHJldHVybiBvYmoudmFsdWVPZiAhPT0gZGVmYXVsdFZhbHVlT2YgJiYgdHlwZW9mIG9iai52YWx1ZU9mID09PSAnZnVuY3Rpb24nXG4gICAgPyBvYmoudmFsdWVPZihvYmopXG4gICAgOiBvYmo7XG59XG5cbmZ1bmN0aW9uIG5leHRIYXNoKCkge1xuICB2YXIgbmV4dEhhc2ggPSArK19vYmpIYXNoVUlEO1xuICBpZiAoX29iakhhc2hVSUQgJiAweDQwMDAwMDAwKSB7XG4gICAgX29iakhhc2hVSUQgPSAwO1xuICB9XG4gIHJldHVybiBuZXh0SGFzaDtcbn1cblxuLy8gSWYgcG9zc2libGUsIHVzZSBhIFdlYWtNYXAuXG52YXIgdXNpbmdXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbic7XG52YXIgd2Vha01hcDtcbmlmICh1c2luZ1dlYWtNYXApIHtcbiAgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG59XG5cbnZhciBzeW1ib2xNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG52YXIgX29iakhhc2hVSUQgPSAwO1xuXG52YXIgVUlEX0hBU0hfS0VZID0gJ19faW1tdXRhYmxlaGFzaF9fJztcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gIFVJRF9IQVNIX0tFWSA9IFN5bWJvbChVSURfSEFTSF9LRVkpO1xufVxuXG52YXIgU1RSSU5HX0hBU0hfQ0FDSEVfTUlOX1NUUkxFTiA9IDE2O1xudmFyIFNUUklOR19IQVNIX0NBQ0hFX01BWF9TSVpFID0gMjU1O1xudmFyIFNUUklOR19IQVNIX0NBQ0hFX1NJWkUgPSAwO1xudmFyIHN0cmluZ0hhc2hDYWNoZSA9IHt9O1xuXG52YXIgVG9LZXllZFNlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRTZXEpIHtcbiAgZnVuY3Rpb24gVG9LZXllZFNlcXVlbmNlKGluZGV4ZWQsIHVzZUtleXMpIHtcbiAgICB0aGlzLl9pdGVyID0gaW5kZXhlZDtcbiAgICB0aGlzLl91c2VLZXlzID0gdXNlS2V5cztcbiAgICB0aGlzLnNpemUgPSBpbmRleGVkLnNpemU7XG4gIH1cblxuICBpZiAoIEtleWVkU2VxICkgVG9LZXllZFNlcXVlbmNlLl9fcHJvdG9fXyA9IEtleWVkU2VxO1xuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRTZXEgJiYgS2V5ZWRTZXEucHJvdG90eXBlICk7XG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUb0tleWVkU2VxdWVuY2U7XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGtleSwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5nZXQoa2V5LCBub3RTZXRWYWx1ZSk7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLmhhcyhrZXkpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUudmFsdWVTZXEgPSBmdW5jdGlvbiB2YWx1ZVNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIudmFsdWVTZXEoKTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlICgpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgdmFyIHJldmVyc2VkU2VxdWVuY2UgPSByZXZlcnNlRmFjdG9yeSh0aGlzLCB0cnVlKTtcbiAgICBpZiAoIXRoaXMuX3VzZUtleXMpIHtcbiAgICAgIHJldmVyc2VkU2VxdWVuY2UudmFsdWVTZXEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEkMS5faXRlci50b1NlcSgpLnJldmVyc2UoKTsgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJldmVyc2VkU2VxdWVuY2U7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICB2YXIgbWFwcGVkU2VxdWVuY2UgPSBtYXBGYWN0b3J5KHRoaXMsIG1hcHBlciwgY29udGV4dCk7XG4gICAgaWYgKCF0aGlzLl91c2VLZXlzKSB7XG4gICAgICBtYXBwZWRTZXF1ZW5jZS52YWx1ZVNlcSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMSQxLl9pdGVyLnRvU2VxKCkubWFwKG1hcHBlciwgY29udGV4dCk7IH07XG4gICAgfVxuICAgIHJldHVybiBtYXBwZWRTZXF1ZW5jZTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbih2LCBrLCB0aGlzJDEkMSk7IH0sIHJldmVyc2UpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIHJldHVybiBUb0tleWVkU2VxdWVuY2U7XG59KEtleWVkU2VxKSk7XG5Ub0tleWVkU2VxdWVuY2UucHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5cbnZhciBUb0luZGV4ZWRTZXF1ZW5jZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEpIHtcbiAgZnVuY3Rpb24gVG9JbmRleGVkU2VxdWVuY2UoaXRlcikge1xuICAgIHRoaXMuX2l0ZXIgPSBpdGVyO1xuICAgIHRoaXMuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSApIFRvSW5kZXhlZFNlcXVlbmNlLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXE7XG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVG9JbmRleGVkU2VxdWVuY2U7XG5cbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuaW5jbHVkZXModmFsdWUpO1xuICB9O1xuXG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGZuKHYsIHJldmVyc2UgPyB0aGlzJDEkMS5zaXplIC0gKytpIDogaSsrLCB0aGlzJDEkMSk7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcblxuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5faXRlci5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKHRoaXMpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICByZXR1cm4gc3RlcC5kb25lXG4gICAgICAgID8gc3RlcFxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcmV2ZXJzZSA/IHRoaXMkMSQxLnNpemUgLSArK2kgOiBpKyssXG4gICAgICAgICAgICBzdGVwLnZhbHVlLFxuICAgICAgICAgICAgc3RlcFxuICAgICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFRvSW5kZXhlZFNlcXVlbmNlO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBUb1NldFNlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2V0U2VxKSB7XG4gIGZ1bmN0aW9uIFRvU2V0U2VxdWVuY2UoaXRlcikge1xuICAgIHRoaXMuX2l0ZXIgPSBpdGVyO1xuICAgIHRoaXMuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgfVxuXG4gIGlmICggU2V0U2VxICkgVG9TZXRTZXF1ZW5jZS5fX3Byb3RvX18gPSBTZXRTZXE7XG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2V0U2VxICYmIFNldFNlcS5wcm90b3R5cGUgKTtcbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUb1NldFNlcXVlbmNlO1xuXG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuaW5jbHVkZXMoa2V5KTtcbiAgfTtcblxuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodikgeyByZXR1cm4gZm4odiwgdiwgdGhpcyQxJDEpOyB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2l0ZXIuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHJldHVybiBzdGVwLmRvbmVcbiAgICAgICAgPyBzdGVwXG4gICAgICAgIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBzdGVwLnZhbHVlLCBzdGVwLnZhbHVlLCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVG9TZXRTZXF1ZW5jZTtcbn0oU2V0U2VxKSk7XG5cbnZhciBGcm9tRW50cmllc1NlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRTZXEpIHtcbiAgZnVuY3Rpb24gRnJvbUVudHJpZXNTZXF1ZW5jZShlbnRyaWVzKSB7XG4gICAgdGhpcy5faXRlciA9IGVudHJpZXM7XG4gICAgdGhpcy5zaXplID0gZW50cmllcy5zaXplO1xuICB9XG5cbiAgaWYgKCBLZXllZFNlcSApIEZyb21FbnRyaWVzU2VxdWVuY2UuX19wcm90b19fID0gS2V5ZWRTZXE7XG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRTZXEgJiYgS2V5ZWRTZXEucHJvdG90eXBlICk7XG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJvbUVudHJpZXNTZXF1ZW5jZTtcblxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5lbnRyeVNlcSA9IGZ1bmN0aW9uIGVudHJ5U2VxICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci50b1NlcSgpO1xuICB9O1xuXG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgLy8gQ2hlY2sgaWYgZW50cnkgZXhpc3RzIGZpcnN0IHNvIGFycmF5IGFjY2VzcyBkb2Vzbid0IHRocm93IGZvciBob2xlc1xuICAgICAgLy8gaW4gdGhlIHBhcmVudCBpdGVyYXRpb24uXG4gICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgdmFsaWRhdGVFbnRyeShlbnRyeSk7XG4gICAgICAgIHZhciBpbmRleGVkQ29sbGVjdGlvbiA9IGlzQ29sbGVjdGlvbihlbnRyeSk7XG4gICAgICAgIHJldHVybiBmbihcbiAgICAgICAgICBpbmRleGVkQ29sbGVjdGlvbiA/IGVudHJ5LmdldCgxKSA6IGVudHJ5WzFdLFxuICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDApIDogZW50cnlbMF0sXG4gICAgICAgICAgdGhpcyQxJDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2l0ZXIuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgIC8vIENoZWNrIGlmIGVudHJ5IGV4aXN0cyBmaXJzdCBzbyBhcnJheSBhY2Nlc3MgZG9lc24ndCB0aHJvdyBmb3IgaG9sZXNcbiAgICAgICAgLy8gaW4gdGhlIHBhcmVudCBpdGVyYXRpb24uXG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhbGlkYXRlRW50cnkoZW50cnkpO1xuICAgICAgICAgIHZhciBpbmRleGVkQ29sbGVjdGlvbiA9IGlzQ29sbGVjdGlvbihlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgaW5kZXhlZENvbGxlY3Rpb24gPyBlbnRyeS5nZXQoMCkgOiBlbnRyeVswXSxcbiAgICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDEpIDogZW50cnlbMV0sXG4gICAgICAgICAgICBzdGVwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGcm9tRW50cmllc1NlcXVlbmNlO1xufShLZXllZFNlcSkpO1xuXG5Ub0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPVxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLmNhY2hlUmVzdWx0ID1cbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPVxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9XG4gICAgY2FjaGVSZXN1bHRUaHJvdWdoO1xuXG5mdW5jdGlvbiBmbGlwRmFjdG9yeShjb2xsZWN0aW9uKSB7XG4gIHZhciBmbGlwU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGZsaXBTZXF1ZW5jZS5faXRlciA9IGNvbGxlY3Rpb247XG4gIGZsaXBTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplO1xuICBmbGlwU2VxdWVuY2UuZmxpcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb247IH07XG4gIGZsaXBTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXZlcnNlZFNlcXVlbmNlID0gY29sbGVjdGlvbi5yZXZlcnNlLmFwcGx5KHRoaXMpOyAvLyBzdXBlci5yZXZlcnNlKClcbiAgICByZXZlcnNlZFNlcXVlbmNlLmZsaXAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uLnJldmVyc2UoKTsgfTtcbiAgICByZXR1cm4gcmV2ZXJzZWRTZXF1ZW5jZTtcbiAgfTtcbiAgZmxpcFNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaW5jbHVkZXMoa2V5KTsgfTtcbiAgZmxpcFNlcXVlbmNlLmluY2x1ZGVzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5oYXMoa2V5KTsgfTtcbiAgZmxpcFNlcXVlbmNlLmNhY2hlUmVzdWx0ID0gY2FjaGVSZXN1bHRUaHJvdWdoO1xuICBmbGlwU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbihrLCB2LCB0aGlzJDEkMSkgIT09IGZhbHNlOyB9LCByZXZlcnNlKTtcbiAgfTtcbiAgZmxpcFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uICh0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHR5cGUgPT09IElURVJBVEVfRU5UUklFUykge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoIXN0ZXAuZG9uZSkge1xuICAgICAgICAgIHZhciBrID0gc3RlcC52YWx1ZVswXTtcbiAgICAgICAgICBzdGVwLnZhbHVlWzBdID0gc3RlcC52YWx1ZVsxXTtcbiAgICAgICAgICBzdGVwLnZhbHVlWzFdID0gaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKFxuICAgICAgdHlwZSA9PT0gSVRFUkFURV9WQUxVRVMgPyBJVEVSQVRFX0tFWVMgOiBJVEVSQVRFX1ZBTFVFUyxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuICByZXR1cm4gZmxpcFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBtYXBGYWN0b3J5KGNvbGxlY3Rpb24sIG1hcHBlciwgY29udGV4dCkge1xuICB2YXIgbWFwcGVkU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIG1hcHBlZFNlcXVlbmNlLnNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG4gIG1hcHBlZFNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaGFzKGtleSk7IH07XG4gIG1hcHBlZFNlcXVlbmNlLmdldCA9IGZ1bmN0aW9uIChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIHYgPSBjb2xsZWN0aW9uLmdldChrZXksIE5PVF9TRVQpO1xuICAgIHJldHVybiB2ID09PSBOT1RfU0VUXG4gICAgICA/IG5vdFNldFZhbHVlXG4gICAgICA6IG1hcHBlci5jYWxsKGNvbnRleHQsIHYsIGtleSwgY29sbGVjdGlvbik7XG4gIH07XG4gIG1hcHBlZFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24gKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHJldHVybiBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2LCBrLCBjKSB7IHJldHVybiBmbihtYXBwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjKSwgaywgdGhpcyQxJDEpICE9PSBmYWxzZTsgfSxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuICBtYXBwZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKFxuICAgICAgICB0eXBlLFxuICAgICAgICBrZXksXG4gICAgICAgIG1hcHBlci5jYWxsKGNvbnRleHQsIGVudHJ5WzFdLCBrZXksIGNvbGxlY3Rpb24pLFxuICAgICAgICBzdGVwXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gbWFwcGVkU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHJldmVyc2VGYWN0b3J5KGNvbGxlY3Rpb24sIHVzZUtleXMpIHtcbiAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICB2YXIgcmV2ZXJzZWRTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5faXRlciA9IGNvbGxlY3Rpb247XG4gIHJldmVyc2VkU2VxdWVuY2Uuc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbjsgfTtcbiAgaWYgKGNvbGxlY3Rpb24uZmxpcCkge1xuICAgIHJldmVyc2VkU2VxdWVuY2UuZmxpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBmbGlwU2VxdWVuY2UgPSBmbGlwRmFjdG9yeShjb2xsZWN0aW9uKTtcbiAgICAgIGZsaXBTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbi5mbGlwKCk7IH07XG4gICAgICByZXR1cm4gZmxpcFNlcXVlbmNlO1xuICAgIH07XG4gIH1cbiAgcmV2ZXJzZWRTZXF1ZW5jZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBub3RTZXRWYWx1ZSkgeyByZXR1cm4gY29sbGVjdGlvbi5nZXQodXNlS2V5cyA/IGtleSA6IC0xIC0ga2V5LCBub3RTZXRWYWx1ZSk7IH07XG4gIHJldmVyc2VkU2VxdWVuY2UuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5oYXModXNlS2V5cyA/IGtleSA6IC0xIC0ga2V5KTsgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5pbmNsdWRlcyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gY29sbGVjdGlvbi5pbmNsdWRlcyh2YWx1ZSk7IH07XG4gIHJldmVyc2VkU2VxdWVuY2UuY2FjaGVSZXN1bHQgPSBjYWNoZVJlc3VsdFRocm91Z2g7XG4gIHJldmVyc2VkU2VxdWVuY2UuX19pdGVyYXRlID0gZnVuY3Rpb24gKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUoY29sbGVjdGlvbik7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKHYsIHVzZUtleXMgPyBrIDogcmV2ZXJzZSA/IHRoaXMkMSQxLnNpemUgLSArK2kgOiBpKyssIHRoaXMkMSQxKTsgfSxcbiAgICAgICFyZXZlcnNlXG4gICAgKTtcbiAgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKGNvbGxlY3Rpb24pO1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsICFyZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXNlS2V5cyA/IGVudHJ5WzBdIDogcmV2ZXJzZSA/IHRoaXMkMSQxLnNpemUgLSArK2kgOiBpKyssXG4gICAgICAgIGVudHJ5WzFdLFxuICAgICAgICBzdGVwXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gcmV2ZXJzZWRTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyRmFjdG9yeShjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGNvbnRleHQsIHVzZUtleXMpIHtcbiAgdmFyIGZpbHRlclNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBpZiAodXNlS2V5cykge1xuICAgIGZpbHRlclNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB2ID0gY29sbGVjdGlvbi5nZXQoa2V5LCBOT1RfU0VUKTtcbiAgICAgIHJldHVybiB2ICE9PSBOT1RfU0VUICYmICEhcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwga2V5LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGZpbHRlclNlcXVlbmNlLmdldCA9IGZ1bmN0aW9uIChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgICB2YXIgdiA9IGNvbGxlY3Rpb24uZ2V0KGtleSwgTk9UX1NFVCk7XG4gICAgICByZXR1cm4gdiAhPT0gTk9UX1NFVCAmJiBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrZXksIGNvbGxlY3Rpb24pXG4gICAgICAgID8gdlxuICAgICAgICA6IG5vdFNldFZhbHVlO1xuICAgIH07XG4gIH1cbiAgZmlsdGVyU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpIHtcbiAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICByZXR1cm4gZm4odiwgdXNlS2V5cyA/IGsgOiBpdGVyYXRpb25zIC0gMSwgdGhpcyQxJDEpO1xuICAgICAgfVxuICAgIH0sIHJldmVyc2UpO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBmaWx0ZXJTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgdmFyIGtleSA9IGVudHJ5WzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBlbnRyeVsxXTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgdXNlS2V5cyA/IGtleSA6IGl0ZXJhdGlvbnMrKywgdmFsdWUsIHN0ZXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBmaWx0ZXJTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gY291bnRCeUZhY3RvcnkoY29sbGVjdGlvbiwgZ3JvdXBlciwgY29udGV4dCkge1xuICB2YXIgZ3JvdXBzID0gTWFwKCkuYXNNdXRhYmxlKCk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgZ3JvdXBzLnVwZGF0ZShncm91cGVyLmNhbGwoY29udGV4dCwgdiwgaywgY29sbGVjdGlvbiksIDAsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBhICsgMTsgfSk7XG4gIH0pO1xuICByZXR1cm4gZ3JvdXBzLmFzSW1tdXRhYmxlKCk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwQnlGYWN0b3J5KGNvbGxlY3Rpb24sIGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgdmFyIGlzS2V5ZWRJdGVyID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGdyb3VwcyA9IChpc09yZGVyZWQoY29sbGVjdGlvbikgPyBPcmRlcmVkTWFwKCkgOiBNYXAoKSkuYXNNdXRhYmxlKCk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgZ3JvdXBzLnVwZGF0ZShcbiAgICAgIGdyb3VwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjb2xsZWN0aW9uKSxcbiAgICAgIGZ1bmN0aW9uIChhKSB7IHJldHVybiAoKGEgPSBhIHx8IFtdKSwgYS5wdXNoKGlzS2V5ZWRJdGVyID8gW2ssIHZdIDogdiksIGEpOyB9XG4gICAgKTtcbiAgfSk7XG4gIHZhciBjb2VyY2UgPSBjb2xsZWN0aW9uQ2xhc3MoY29sbGVjdGlvbik7XG4gIHJldHVybiBncm91cHMubWFwKGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIHJlaWZ5KGNvbGxlY3Rpb24sIGNvZXJjZShhcnIpKTsgfSkuYXNJbW11dGFibGUoKTtcbn1cblxuZnVuY3Rpb24gc2xpY2VGYWN0b3J5KGNvbGxlY3Rpb24sIGJlZ2luLCBlbmQsIHVzZUtleXMpIHtcbiAgdmFyIG9yaWdpbmFsU2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcblxuICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCBvcmlnaW5hbFNpemUpKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICB2YXIgcmVzb2x2ZWRCZWdpbiA9IHJlc29sdmVCZWdpbihiZWdpbiwgb3JpZ2luYWxTaXplKTtcbiAgdmFyIHJlc29sdmVkRW5kID0gcmVzb2x2ZUVuZChlbmQsIG9yaWdpbmFsU2l6ZSk7XG5cbiAgLy8gYmVnaW4gb3IgZW5kIHdpbGwgYmUgTmFOIGlmIHRoZXkgd2VyZSBwcm92aWRlZCBhcyBuZWdhdGl2ZSBudW1iZXJzIGFuZFxuICAvLyB0aGlzIGNvbGxlY3Rpb24ncyBzaXplIGlzIHVua25vd24uIEluIHRoYXQgY2FzZSwgY2FjaGUgZmlyc3Qgc28gdGhlcmUgaXNcbiAgLy8gYSBrbm93biBzaXplIGFuZCB0aGVzZSBkbyBub3QgcmVzb2x2ZSB0byBOYU4uXG4gIGlmIChyZXNvbHZlZEJlZ2luICE9PSByZXNvbHZlZEJlZ2luIHx8IHJlc29sdmVkRW5kICE9PSByZXNvbHZlZEVuZCkge1xuICAgIHJldHVybiBzbGljZUZhY3RvcnkoY29sbGVjdGlvbi50b1NlcSgpLmNhY2hlUmVzdWx0KCksIGJlZ2luLCBlbmQsIHVzZUtleXMpO1xuICB9XG5cbiAgLy8gTm90ZTogcmVzb2x2ZWRFbmQgaXMgdW5kZWZpbmVkIHdoZW4gdGhlIG9yaWdpbmFsIHNlcXVlbmNlJ3MgbGVuZ3RoIGlzXG4gIC8vIHVua25vd24gYW5kIHRoaXMgc2xpY2UgZGlkIG5vdCBzdXBwbHkgYW4gZW5kIGFuZCBzaG91bGQgY29udGFpbiBhbGxcbiAgLy8gZWxlbWVudHMgYWZ0ZXIgcmVzb2x2ZWRCZWdpbi5cbiAgLy8gSW4gdGhhdCBjYXNlLCByZXNvbHZlZFNpemUgd2lsbCBiZSBOYU4gYW5kIHNsaWNlU2l6ZSB3aWxsIHJlbWFpbiB1bmRlZmluZWQuXG4gIHZhciByZXNvbHZlZFNpemUgPSByZXNvbHZlZEVuZCAtIHJlc29sdmVkQmVnaW47XG4gIHZhciBzbGljZVNpemU7XG4gIGlmIChyZXNvbHZlZFNpemUgPT09IHJlc29sdmVkU2l6ZSkge1xuICAgIHNsaWNlU2l6ZSA9IHJlc29sdmVkU2l6ZSA8IDAgPyAwIDogcmVzb2x2ZWRTaXplO1xuICB9XG5cbiAgdmFyIHNsaWNlU2VxID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuXG4gIC8vIElmIGNvbGxlY3Rpb24uc2l6ZSBpcyB1bmRlZmluZWQsIHRoZSBzaXplIG9mIHRoZSByZWFsaXplZCBzbGljZVNlcSBpc1xuICAvLyB1bmtub3duIGF0IHRoaXMgcG9pbnQgdW5sZXNzIHRoZSBudW1iZXIgb2YgaXRlbXMgdG8gc2xpY2UgaXMgMFxuICBzbGljZVNlcS5zaXplID1cbiAgICBzbGljZVNpemUgPT09IDAgPyBzbGljZVNpemUgOiAoY29sbGVjdGlvbi5zaXplICYmIHNsaWNlU2l6ZSkgfHwgdW5kZWZpbmVkO1xuXG4gIGlmICghdXNlS2V5cyAmJiBpc1NlcShjb2xsZWN0aW9uKSAmJiBzbGljZVNpemUgPj0gMCkge1xuICAgIHNsaWNlU2VxLmdldCA9IGZ1bmN0aW9uIChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgc2xpY2VTaXplXG4gICAgICAgID8gY29sbGVjdGlvbi5nZXQoaW5kZXggKyByZXNvbHZlZEJlZ2luLCBub3RTZXRWYWx1ZSlcbiAgICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgc2xpY2VTZXEuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgaWYgKHNsaWNlU2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBza2lwcGVkID0gMDtcbiAgICB2YXIgaXNTa2lwcGluZyA9IHRydWU7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICBpZiAoIShpc1NraXBwaW5nICYmIChpc1NraXBwaW5nID0gc2tpcHBlZCsrIDwgcmVzb2x2ZWRCZWdpbikpKSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCB0aGlzJDEkMSkgIT09IGZhbHNlICYmXG4gICAgICAgICAgaXRlcmF0aW9ucyAhPT0gc2xpY2VTaXplXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgc2xpY2VTZXEuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24gKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAoc2xpY2VTaXplICE9PSAwICYmIHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGluc3RhbnRpYXRpbmcgcGFyZW50IGl0ZXJhdG9yIGlmIHRha2luZyAwLlxuICAgIGlmIChzbGljZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoaXRlcmF0b3JEb25lKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIHZhciBza2lwcGVkID0gMDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAoc2tpcHBlZCsrIDwgcmVzb2x2ZWRCZWdpbikge1xuICAgICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICB9XG4gICAgICBpZiAoKytpdGVyYXRpb25zID4gc2xpY2VTaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHVzZUtleXMgfHwgdHlwZSA9PT0gSVRFUkFURV9WQUxVRVMgfHwgc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IElURVJBVEVfS0VZUykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zIC0gMSwgdW5kZWZpbmVkLCBzdGVwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMgLSAxLCBzdGVwLnZhbHVlWzFdLCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gc2xpY2VTZXE7XG59XG5cbmZ1bmN0aW9uIHRha2VXaGlsZUZhY3RvcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gIHZhciB0YWtlU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIHRha2VTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodiwgaywgYykgeyByZXR1cm4gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykgJiYgKytpdGVyYXRpb25zICYmIGZuKHYsIGssIHRoaXMkMSQxKTsgfVxuICAgICk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIHRha2VTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaXRlcmF0aW5nID0gdHJ1ZTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaXRlcmF0aW5nKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICB2YXIgayA9IGVudHJ5WzBdO1xuICAgICAgdmFyIHYgPSBlbnRyeVsxXTtcbiAgICAgIGlmICghcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgdGhpcyQxJDEpKSB7XG4gICAgICAgIGl0ZXJhdGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaywgdiwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiB0YWtlU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHNraXBXaGlsZUZhY3RvcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBjb250ZXh0LCB1c2VLZXlzKSB7XG4gIHZhciBza2lwU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIHNraXBTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXNTa2lwcGluZyA9IHRydWU7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAoIShpc1NraXBwaW5nICYmIChpc1NraXBwaW5nID0gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpKSkge1xuICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgIHJldHVybiBmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCB0aGlzJDEkMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIHNraXBTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgc2tpcHBpbmcgPSB0cnVlO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGs7XG4gICAgICB2YXIgdjtcbiAgICAgIGRvIHtcbiAgICAgICAgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIGlmICh1c2VLZXlzIHx8IHR5cGUgPT09IElURVJBVEVfVkFMVUVTKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGUgPT09IElURVJBVEVfS0VZUykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCB1bmRlZmluZWQsIHN0ZXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHN0ZXAudmFsdWVbMV0sIHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgIGsgPSBlbnRyeVswXTtcbiAgICAgICAgdiA9IGVudHJ5WzFdO1xuICAgICAgICBza2lwcGluZyAmJiAoc2tpcHBpbmcgPSBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCB0aGlzJDEkMSkpO1xuICAgICAgfSB3aGlsZSAoc2tpcHBpbmcpO1xuICAgICAgcmV0dXJuIHR5cGUgPT09IElURVJBVEVfRU5UUklFUyA/IHN0ZXAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGssIHYsIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gc2tpcFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBjb25jYXRGYWN0b3J5KGNvbGxlY3Rpb24sIHZhbHVlcykge1xuICB2YXIgaXNLZXllZENvbGxlY3Rpb24gPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgaXRlcnMgPSBbY29sbGVjdGlvbl1cbiAgICAuY29uY2F0KHZhbHVlcylcbiAgICAubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICBpZiAoIWlzQ29sbGVjdGlvbih2KSkge1xuICAgICAgICB2ID0gaXNLZXllZENvbGxlY3Rpb25cbiAgICAgICAgICA/IGtleWVkU2VxRnJvbVZhbHVlKHYpXG4gICAgICAgICAgOiBpbmRleGVkU2VxRnJvbVZhbHVlKEFycmF5LmlzQXJyYXkodikgPyB2IDogW3ZdKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNLZXllZENvbGxlY3Rpb24pIHtcbiAgICAgICAgdiA9IEtleWVkQ29sbGVjdGlvbih2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2O1xuICAgIH0pXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gdi5zaXplICE9PSAwOyB9KTtcblxuICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICBpZiAoaXRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIHNpbmdsZXRvbiA9IGl0ZXJzWzBdO1xuICAgIGlmIChcbiAgICAgIHNpbmdsZXRvbiA9PT0gY29sbGVjdGlvbiB8fFxuICAgICAgKGlzS2V5ZWRDb2xsZWN0aW9uICYmIGlzS2V5ZWQoc2luZ2xldG9uKSkgfHxcbiAgICAgIChpc0luZGV4ZWQoY29sbGVjdGlvbikgJiYgaXNJbmRleGVkKHNpbmdsZXRvbikpXG4gICAgKSB7XG4gICAgICByZXR1cm4gc2luZ2xldG9uO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb25jYXRTZXEgPSBuZXcgQXJyYXlTZXEoaXRlcnMpO1xuICBpZiAoaXNLZXllZENvbGxlY3Rpb24pIHtcbiAgICBjb25jYXRTZXEgPSBjb25jYXRTZXEudG9LZXllZFNlcSgpO1xuICB9IGVsc2UgaWYgKCFpc0luZGV4ZWQoY29sbGVjdGlvbikpIHtcbiAgICBjb25jYXRTZXEgPSBjb25jYXRTZXEudG9TZXRTZXEoKTtcbiAgfVxuICBjb25jYXRTZXEgPSBjb25jYXRTZXEuZmxhdHRlbih0cnVlKTtcbiAgY29uY2F0U2VxLnNpemUgPSBpdGVycy5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgc2VxKSB7XG4gICAgaWYgKHN1bSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgc2l6ZSA9IHNlcS5zaXplO1xuICAgICAgaWYgKHNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gc3VtICsgc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDApO1xuICByZXR1cm4gY29uY2F0U2VxO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuRmFjdG9yeShjb2xsZWN0aW9uLCBkZXB0aCwgdXNlS2V5cykge1xuICB2YXIgZmxhdFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBmbGF0U2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIHN0b3BwZWQgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBmbGF0RGVlcChpdGVyLCBjdXJyZW50RGVwdGgpIHtcbiAgICAgIGl0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIGlmICgoIWRlcHRoIHx8IGN1cnJlbnREZXB0aCA8IGRlcHRoKSAmJiBpc0NvbGxlY3Rpb24odikpIHtcbiAgICAgICAgICBmbGF0RGVlcCh2LCBjdXJyZW50RGVwdGggKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgaWYgKGZuKHYsIHVzZUtleXMgPyBrIDogaXRlcmF0aW9ucyAtIDEsIGZsYXRTZXF1ZW5jZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFzdG9wcGVkO1xuICAgICAgfSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIGZsYXREZWVwKGNvbGxlY3Rpb24sIDApO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBmbGF0U2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24gKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lICE9PSBmYWxzZSkge1xuICAgICAgICAgIGl0ZXJhdG9yID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHYgPSBzdGVwLnZhbHVlO1xuICAgICAgICBpZiAodHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTKSB7XG4gICAgICAgICAgdiA9IHZbMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCghZGVwdGggfHwgc3RhY2subGVuZ3RoIDwgZGVwdGgpICYmIGlzQ29sbGVjdGlvbih2KSkge1xuICAgICAgICAgIHN0YWNrLnB1c2goaXRlcmF0b3IpO1xuICAgICAgICAgIGl0ZXJhdG9yID0gdi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1c2VLZXlzID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCB2LCBzdGVwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gZmxhdFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBmbGF0TWFwRmFjdG9yeShjb2xsZWN0aW9uLCBtYXBwZXIsIGNvbnRleHQpIHtcbiAgdmFyIGNvZXJjZSA9IGNvbGxlY3Rpb25DbGFzcyhjb2xsZWN0aW9uKTtcbiAgcmV0dXJuIGNvbGxlY3Rpb25cbiAgICAudG9TZXEoKVxuICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGNvZXJjZShtYXBwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjb2xsZWN0aW9uKSk7IH0pXG4gICAgLmZsYXR0ZW4odHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGludGVycG9zZUZhY3RvcnkoY29sbGVjdGlvbiwgc2VwYXJhdG9yKSB7XG4gIHZhciBpbnRlcnBvc2VkU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGludGVycG9zZWRTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplICYmIGNvbGxlY3Rpb24uc2l6ZSAqIDIgLSAxO1xuICBpbnRlcnBvc2VkU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYpIHsgcmV0dXJuICghaXRlcmF0aW9ucyB8fCBmbihzZXBhcmF0b3IsIGl0ZXJhdGlvbnMrKywgdGhpcyQxJDEpICE9PSBmYWxzZSkgJiZcbiAgICAgICAgZm4odiwgaXRlcmF0aW9ucysrLCB0aGlzJDEkMSkgIT09IGZhbHNlOyB9LFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIGludGVycG9zZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBzdGVwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzdGVwIHx8IGl0ZXJhdGlvbnMgJSAyKSB7XG4gICAgICAgIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdGlvbnMgJSAyXG4gICAgICAgID8gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHNlcGFyYXRvcilcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgc3RlcC52YWx1ZSwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBpbnRlcnBvc2VkU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHNvcnRGYWN0b3J5KGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IsIG1hcHBlcikge1xuICBpZiAoIWNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gZGVmYXVsdENvbXBhcmF0b3I7XG4gIH1cbiAgdmFyIGlzS2V5ZWRDb2xsZWN0aW9uID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGVudHJpZXMgPSBjb2xsZWN0aW9uXG4gICAgLnRvU2VxKClcbiAgICAubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBbaywgdiwgaW5kZXgrKywgbWFwcGVyID8gbWFwcGVyKHYsIGssIGNvbGxlY3Rpb24pIDogdl07IH0pXG4gICAgLnZhbHVlU2VxKClcbiAgICAudG9BcnJheSgpO1xuICBlbnRyaWVzXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGNvbXBhcmF0b3IoYVszXSwgYlszXSkgfHwgYVsyXSAtIGJbMl07IH0pXG4gICAgLmZvckVhY2goXG4gICAgICBpc0tleWVkQ29sbGVjdGlvblxuICAgICAgICA/IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgICBlbnRyaWVzW2ldLmxlbmd0aCA9IDI7XG4gICAgICAgICAgfVxuICAgICAgICA6IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgICBlbnRyaWVzW2ldID0gdlsxXTtcbiAgICAgICAgICB9XG4gICAgKTtcbiAgcmV0dXJuIGlzS2V5ZWRDb2xsZWN0aW9uXG4gICAgPyBLZXllZFNlcShlbnRyaWVzKVxuICAgIDogaXNJbmRleGVkKGNvbGxlY3Rpb24pXG4gICAgPyBJbmRleGVkU2VxKGVudHJpZXMpXG4gICAgOiBTZXRTZXEoZW50cmllcyk7XG59XG5cbmZ1bmN0aW9uIG1heEZhY3RvcnkoY29sbGVjdGlvbiwgY29tcGFyYXRvciwgbWFwcGVyKSB7XG4gIGlmICghY29tcGFyYXRvcikge1xuICAgIGNvbXBhcmF0b3IgPSBkZWZhdWx0Q29tcGFyYXRvcjtcbiAgfVxuICBpZiAobWFwcGVyKSB7XG4gICAgdmFyIGVudHJ5ID0gY29sbGVjdGlvblxuICAgICAgLnRvU2VxKClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIFt2LCBtYXBwZXIodiwgaywgY29sbGVjdGlvbildOyB9KVxuICAgICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKG1heENvbXBhcmUoY29tcGFyYXRvciwgYVsxXSwgYlsxXSkgPyBiIDogYSk7IH0pO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbi5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChtYXhDb21wYXJlKGNvbXBhcmF0b3IsIGEsIGIpID8gYiA6IGEpOyB9KTtcbn1cblxuZnVuY3Rpb24gbWF4Q29tcGFyZShjb21wYXJhdG9yLCBhLCBiKSB7XG4gIHZhciBjb21wID0gY29tcGFyYXRvcihiLCBhKTtcbiAgLy8gYiBpcyBjb25zaWRlcmVkIHRoZSBuZXcgbWF4IGlmIHRoZSBjb21wYXJhdG9yIGRlY2xhcmVzIHRoZW0gZXF1YWwsIGJ1dFxuICAvLyB0aGV5IGFyZSBub3QgZXF1YWwgYW5kIGIgaXMgaW4gZmFjdCBhIG51bGxpc2ggdmFsdWUuXG4gIHJldHVybiAoXG4gICAgKGNvbXAgPT09IDAgJiYgYiAhPT0gYSAmJiAoYiA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IG51bGwgfHwgYiAhPT0gYikpIHx8XG4gICAgY29tcCA+IDBcbiAgKTtcbn1cblxuZnVuY3Rpb24gemlwV2l0aEZhY3Rvcnkoa2V5SXRlciwgemlwcGVyLCBpdGVycywgemlwQWxsKSB7XG4gIHZhciB6aXBTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShrZXlJdGVyKTtcbiAgdmFyIHNpemVzID0gbmV3IEFycmF5U2VxKGl0ZXJzKS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2l6ZTsgfSk7XG4gIHppcFNlcXVlbmNlLnNpemUgPSB6aXBBbGwgPyBzaXplcy5tYXgoKSA6IHNpemVzLm1pbigpO1xuICAvLyBOb3RlOiB0aGlzIGEgZ2VuZXJpYyBiYXNlIGltcGxlbWVudGF0aW9uIG9mIF9faXRlcmF0ZSBpbiB0ZXJtcyBvZlxuICAvLyBfX2l0ZXJhdG9yIHdoaWNoIG1heSBiZSBtb3JlIGdlbmVyaWNhbGx5IHVzZWZ1bCBpbiB0aGUgZnV0dXJlLlxuICB6aXBTZXF1ZW5jZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiAoZm4sIHJldmVyc2UpIHtcbiAgICAvKiBnZW5lcmljOlxuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBzdGVwO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICBpdGVyYXRpb25zKys7XG4gICAgICBpZiAoZm4oc3RlcC52YWx1ZVsxXSwgc3RlcC52YWx1ZVswXSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgICAqL1xuICAgIC8vIGluZGV4ZWQ6XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICB2YXIgc3RlcDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgaWYgKGZuKHN0ZXAudmFsdWUsIGl0ZXJhdGlvbnMrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgemlwU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24gKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3JzID0gaXRlcnMubWFwKFxuICAgICAgZnVuY3Rpb24gKGkpIHsgcmV0dXJuICgoaSA9IENvbGxlY3Rpb24oaSkpLCBnZXRJdGVyYXRvcihyZXZlcnNlID8gaS5yZXZlcnNlKCkgOiBpKSk7IH1cbiAgICApO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgaXNEb25lID0gZmFsc2U7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcHM7XG4gICAgICBpZiAoIWlzRG9uZSkge1xuICAgICAgICBzdGVwcyA9IGl0ZXJhdG9ycy5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkubmV4dCgpOyB9KTtcbiAgICAgICAgaXNEb25lID0gemlwQWxsID8gc3RlcHMuZXZlcnkoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuZG9uZTsgfSkgOiBzdGVwcy5zb21lKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLmRvbmU7IH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzRG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgdHlwZSxcbiAgICAgICAgaXRlcmF0aW9ucysrLFxuICAgICAgICB6aXBwZXIuYXBwbHkoXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBzdGVwcy5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudmFsdWU7IH0pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiB6aXBTZXF1ZW5jZTtcbn1cblxuLy8gI3ByYWdtYSBIZWxwZXIgRnVuY3Rpb25zXG5cbmZ1bmN0aW9uIHJlaWZ5KGl0ZXIsIHNlcSkge1xuICByZXR1cm4gaXRlciA9PT0gc2VxID8gaXRlciA6IGlzU2VxKGl0ZXIpID8gc2VxIDogaXRlci5jb25zdHJ1Y3RvcihzZXEpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVudHJ5KGVudHJ5KSB7XG4gIGlmIChlbnRyeSAhPT0gT2JqZWN0KGVudHJ5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFtLLCBWXSB0dXBsZTogJyArIGVudHJ5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uQ2xhc3MoY29sbGVjdGlvbikge1xuICByZXR1cm4gaXNLZXllZChjb2xsZWN0aW9uKVxuICAgID8gS2V5ZWRDb2xsZWN0aW9uXG4gICAgOiBpc0luZGV4ZWQoY29sbGVjdGlvbilcbiAgICA/IEluZGV4ZWRDb2xsZWN0aW9uXG4gICAgOiBTZXRDb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbikge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAoaXNLZXllZChjb2xsZWN0aW9uKVxuICAgICAgPyBLZXllZFNlcVxuICAgICAgOiBpc0luZGV4ZWQoY29sbGVjdGlvbilcbiAgICAgID8gSW5kZXhlZFNlcVxuICAgICAgOiBTZXRTZXFcbiAgICApLnByb3RvdHlwZVxuICApO1xufVxuXG5mdW5jdGlvbiBjYWNoZVJlc3VsdFRocm91Z2goKSB7XG4gIGlmICh0aGlzLl9pdGVyLmNhY2hlUmVzdWx0KSB7XG4gICAgdGhpcy5faXRlci5jYWNoZVJlc3VsdCgpO1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMuX2l0ZXIuc2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gU2VxLnByb3RvdHlwZS5jYWNoZVJlc3VsdC5jYWxsKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyYXRvcihhLCBiKSB7XG4gIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xufVxuXG5mdW5jdGlvbiBhcnJDb3B5KGFyciwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICB2YXIgbGVuID0gTWF0aC5tYXgoMCwgYXJyLmxlbmd0aCAtIG9mZnNldCk7XG4gIHZhciBuZXdBcnIgPSBuZXcgQXJyYXkobGVuKTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGxlbjsgaWkrKykge1xuICAgIG5ld0FycltpaV0gPSBhcnJbaWkgKyBvZmZzZXRdO1xuICB9XG4gIHJldHVybiBuZXdBcnI7XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGVycm9yKSB7XG4gIGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihlcnJvcik7IH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0Tm90SW5maW5pdGUoc2l6ZSkge1xuICBpbnZhcmlhbnQoXG4gICAgc2l6ZSAhPT0gSW5maW5pdHksXG4gICAgJ0Nhbm5vdCBwZXJmb3JtIHRoaXMgYWN0aW9uIHdpdGggYW4gaW5maW5pdGUgc2l6ZS4nXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNvZXJjZUtleVBhdGgoa2V5UGF0aCkge1xuICBpZiAoaXNBcnJheUxpa2Uoa2V5UGF0aCkgJiYgdHlwZW9mIGtleVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGtleVBhdGg7XG4gIH1cbiAgaWYgKGlzT3JkZXJlZChrZXlQYXRoKSkge1xuICAgIHJldHVybiBrZXlQYXRoLnRvQXJyYXkoKTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdJbnZhbGlkIGtleVBhdGg6IGV4cGVjdGVkIE9yZGVyZWQgQ29sbGVjdGlvbiBvciBBcnJheTogJyArIGtleVBhdGhcbiAgKTtcbn1cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICAvLyBUaGUgYmFzZSBwcm90b3R5cGUncyB0b1N0cmluZyBkZWFscyB3aXRoIEFyZ3VtZW50IG9iamVjdHMgYW5kIG5hdGl2ZSBuYW1lc3BhY2VzIGxpa2UgTWF0aFxuICBpZiAoXG4gICAgIXZhbHVlIHx8XG4gICAgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyB8fFxuICAgIHRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSAnW29iamVjdCBPYmplY3RdJ1xuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEl0ZXJhdGl2ZWx5IGdvaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4gaXMgbmVlZGVkIGZvciBjcm9zcy1yZWFsbSBlbnZpcm9ubWVudHMgKGRpZmZlcmluZyBjb250ZXh0cywgaWZyYW1lcywgZXRjKVxuICB2YXIgcGFyZW50UHJvdG8gPSBwcm90bztcbiAgdmFyIG5leHRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gIHdoaWxlIChuZXh0UHJvdG8gIT09IG51bGwpIHtcbiAgICBwYXJlbnRQcm90byA9IG5leHRQcm90bztcbiAgICBuZXh0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50UHJvdG8pO1xuICB9XG4gIHJldHVybiBwYXJlbnRQcm90byA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBvdGVudGlhbGx5LXBlcnNpc3RlbnQgZGF0YSBzdHJ1Y3R1cmUsIGVpdGhlclxuICogcHJvdmlkZWQgYnkgSW1tdXRhYmxlLmpzIG9yIGEgcGxhaW4gQXJyYXkgb3IgT2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc0RhdGFTdHJ1Y3R1cmUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgKGlzSW1tdXRhYmxlKHZhbHVlKSB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gcXVvdGVTdHJpbmcodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9pZ25vcmVFcnJvcikge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzKGNvbGxlY3Rpb24sIGtleSkge1xuICByZXR1cm4gaXNJbW11dGFibGUoY29sbGVjdGlvbilcbiAgICA/IGNvbGxlY3Rpb24uaGFzKGtleSlcbiAgICA6IGlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGtleSk7XG59XG5cbmZ1bmN0aW9uIGdldChjb2xsZWN0aW9uLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHJldHVybiBpc0ltbXV0YWJsZShjb2xsZWN0aW9uKVxuICAgID8gY29sbGVjdGlvbi5nZXQoa2V5LCBub3RTZXRWYWx1ZSlcbiAgICA6ICFoYXMoY29sbGVjdGlvbiwga2V5KVxuICAgID8gbm90U2V0VmFsdWVcbiAgICA6IHR5cGVvZiBjb2xsZWN0aW9uLmdldCA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gY29sbGVjdGlvbi5nZXQoa2V5KVxuICAgIDogY29sbGVjdGlvbltrZXldO1xufVxuXG5mdW5jdGlvbiBzaGFsbG93Q29weShmcm9tKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZyb20pKSB7XG4gICAgcmV0dXJuIGFyckNvcHkoZnJvbSk7XG4gIH1cbiAgdmFyIHRvID0ge307XG4gIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoY29sbGVjdGlvbiwga2V5KSB7XG4gIGlmICghaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZTogJyArIGNvbGxlY3Rpb25cbiAgICApO1xuICB9XG4gIGlmIChpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgIGlmICghY29sbGVjdGlvbi5yZW1vdmUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdDYW5ub3QgdXBkYXRlIGltbXV0YWJsZSB2YWx1ZSB3aXRob3V0IC5yZW1vdmUoKSBtZXRob2Q6ICcgKyBjb2xsZWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5yZW1vdmUoa2V5KTtcbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwga2V5KSkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG4gIHZhciBjb2xsZWN0aW9uQ29weSA9IHNoYWxsb3dDb3B5KGNvbGxlY3Rpb24pO1xuICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uQ29weSkpIHtcbiAgICBjb2xsZWN0aW9uQ29weS5zcGxpY2Uoa2V5LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgY29sbGVjdGlvbkNvcHlba2V5XTtcbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbkNvcHk7XG59XG5cbmZ1bmN0aW9uIHNldChjb2xsZWN0aW9uLCBrZXksIHZhbHVlKSB7XG4gIGlmICghaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZTogJyArIGNvbGxlY3Rpb25cbiAgICApO1xuICB9XG4gIGlmIChpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgIGlmICghY29sbGVjdGlvbi5zZXQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdDYW5ub3QgdXBkYXRlIGltbXV0YWJsZSB2YWx1ZSB3aXRob3V0IC5zZXQoKSBtZXRob2Q6ICcgKyBjb2xsZWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5zZXQoa2V5LCB2YWx1ZSk7XG4gIH1cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwga2V5KSAmJiB2YWx1ZSA9PT0gY29sbGVjdGlvbltrZXldKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cbiAgdmFyIGNvbGxlY3Rpb25Db3B5ID0gc2hhbGxvd0NvcHkoY29sbGVjdGlvbik7XG4gIGNvbGxlY3Rpb25Db3B5W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIGNvbGxlY3Rpb25Db3B5O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbiQxKGNvbGxlY3Rpb24sIGtleVBhdGgsIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIGlmICghdXBkYXRlcikge1xuICAgIHVwZGF0ZXIgPSBub3RTZXRWYWx1ZTtcbiAgICBub3RTZXRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgfVxuICB2YXIgdXBkYXRlZFZhbHVlID0gdXBkYXRlSW5EZWVwbHkoXG4gICAgaXNJbW11dGFibGUoY29sbGVjdGlvbiksXG4gICAgY29sbGVjdGlvbixcbiAgICBjb2VyY2VLZXlQYXRoKGtleVBhdGgpLFxuICAgIDAsXG4gICAgbm90U2V0VmFsdWUsXG4gICAgdXBkYXRlclxuICApO1xuICByZXR1cm4gdXBkYXRlZFZhbHVlID09PSBOT1RfU0VUID8gbm90U2V0VmFsdWUgOiB1cGRhdGVkVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluRGVlcGx5KFxuICBpbkltbXV0YWJsZSxcbiAgZXhpc3RpbmcsXG4gIGtleVBhdGgsXG4gIGksXG4gIG5vdFNldFZhbHVlLFxuICB1cGRhdGVyXG4pIHtcbiAgdmFyIHdhc05vdFNldCA9IGV4aXN0aW5nID09PSBOT1RfU0VUO1xuICBpZiAoaSA9PT0ga2V5UGF0aC5sZW5ndGgpIHtcbiAgICB2YXIgZXhpc3RpbmdWYWx1ZSA9IHdhc05vdFNldCA/IG5vdFNldFZhbHVlIDogZXhpc3Rpbmc7XG4gICAgdmFyIG5ld1ZhbHVlID0gdXBkYXRlcihleGlzdGluZ1ZhbHVlKTtcbiAgICByZXR1cm4gbmV3VmFsdWUgPT09IGV4aXN0aW5nVmFsdWUgPyBleGlzdGluZyA6IG5ld1ZhbHVlO1xuICB9XG4gIGlmICghd2FzTm90U2V0ICYmICFpc0RhdGFTdHJ1Y3R1cmUoZXhpc3RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIHdpdGhpbiBub24tZGF0YS1zdHJ1Y3R1cmUgdmFsdWUgaW4gcGF0aCBbJyArXG4gICAgICAgIGtleVBhdGguc2xpY2UoMCwgaSkubWFwKHF1b3RlU3RyaW5nKSArXG4gICAgICAgICddOiAnICtcbiAgICAgICAgZXhpc3RpbmdcbiAgICApO1xuICB9XG4gIHZhciBrZXkgPSBrZXlQYXRoW2ldO1xuICB2YXIgbmV4dEV4aXN0aW5nID0gd2FzTm90U2V0ID8gTk9UX1NFVCA6IGdldChleGlzdGluZywga2V5LCBOT1RfU0VUKTtcbiAgdmFyIG5leHRVcGRhdGVkID0gdXBkYXRlSW5EZWVwbHkoXG4gICAgbmV4dEV4aXN0aW5nID09PSBOT1RfU0VUID8gaW5JbW11dGFibGUgOiBpc0ltbXV0YWJsZShuZXh0RXhpc3RpbmcpLFxuICAgIG5leHRFeGlzdGluZyxcbiAgICBrZXlQYXRoLFxuICAgIGkgKyAxLFxuICAgIG5vdFNldFZhbHVlLFxuICAgIHVwZGF0ZXJcbiAgKTtcbiAgcmV0dXJuIG5leHRVcGRhdGVkID09PSBuZXh0RXhpc3RpbmdcbiAgICA/IGV4aXN0aW5nXG4gICAgOiBuZXh0VXBkYXRlZCA9PT0gTk9UX1NFVFxuICAgID8gcmVtb3ZlKGV4aXN0aW5nLCBrZXkpXG4gICAgOiBzZXQoXG4gICAgICAgIHdhc05vdFNldCA/IChpbkltbXV0YWJsZSA/IGVtcHR5TWFwKCkgOiB7fSkgOiBleGlzdGluZyxcbiAgICAgICAga2V5LFxuICAgICAgICBuZXh0VXBkYXRlZFxuICAgICAgKTtcbn1cblxuZnVuY3Rpb24gc2V0SW4kMShjb2xsZWN0aW9uLCBrZXlQYXRoLCB2YWx1ZSkge1xuICByZXR1cm4gdXBkYXRlSW4kMShjb2xsZWN0aW9uLCBrZXlQYXRoLCBOT1RfU0VULCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEluKGtleVBhdGgsIHYpIHtcbiAgcmV0dXJuIHNldEluJDEodGhpcywga2V5UGF0aCwgdik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUluKGNvbGxlY3Rpb24sIGtleVBhdGgpIHtcbiAgcmV0dXJuIHVwZGF0ZUluJDEoY29sbGVjdGlvbiwga2V5UGF0aCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gTk9UX1NFVDsgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUluKGtleVBhdGgpIHtcbiAgcmV0dXJuIHJlbW92ZUluKHRoaXMsIGtleVBhdGgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUkMShjb2xsZWN0aW9uLCBrZXksIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIHJldHVybiB1cGRhdGVJbiQxKGNvbGxlY3Rpb24sIFtrZXldLCBub3RTZXRWYWx1ZSwgdXBkYXRlcik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxXG4gICAgPyBrZXkodGhpcylcbiAgICA6IHVwZGF0ZSQxKHRoaXMsIGtleSwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbihrZXlQYXRoLCBub3RTZXRWYWx1ZSwgdXBkYXRlcikge1xuICByZXR1cm4gdXBkYXRlSW4kMSh0aGlzLCBrZXlQYXRoLCBub3RTZXRWYWx1ZSwgdXBkYXRlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlJDEoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gbWVyZ2VJbnRvS2V5ZWRXaXRoKHRoaXMsIGl0ZXJzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VXaXRoJDEobWVyZ2VyKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICBpZiAodHlwZW9mIG1lcmdlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWVyZ2VyIGZ1bmN0aW9uOiAnICsgbWVyZ2VyKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VJbnRvS2V5ZWRXaXRoKHRoaXMsIGl0ZXJzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUludG9LZXllZFdpdGgoY29sbGVjdGlvbiwgY29sbGVjdGlvbnMsIG1lcmdlcikge1xuICB2YXIgaXRlcnMgPSBbXTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGNvbGxlY3Rpb25zLmxlbmd0aDsgaWkrKykge1xuICAgIHZhciBjb2xsZWN0aW9uJDEgPSBLZXllZENvbGxlY3Rpb24oY29sbGVjdGlvbnNbaWldKTtcbiAgICBpZiAoY29sbGVjdGlvbiQxLnNpemUgIT09IDApIHtcbiAgICAgIGl0ZXJzLnB1c2goY29sbGVjdGlvbiQxKTtcbiAgICB9XG4gIH1cbiAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG4gIGlmIChcbiAgICBjb2xsZWN0aW9uLnRvU2VxKCkuc2l6ZSA9PT0gMCAmJlxuICAgICFjb2xsZWN0aW9uLl9fb3duZXJJRCAmJlxuICAgIGl0ZXJzLmxlbmd0aCA9PT0gMVxuICApIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5jb25zdHJ1Y3RvcihpdGVyc1swXSk7XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb24ud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoY29sbGVjdGlvbikge1xuICAgIHZhciBtZXJnZUludG9Db2xsZWN0aW9uID0gbWVyZ2VyXG4gICAgICA/IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgdXBkYXRlJDEoY29sbGVjdGlvbiwga2V5LCBOT1RfU0VULCBmdW5jdGlvbiAob2xkVmFsKSB7IHJldHVybiBvbGRWYWwgPT09IE5PVF9TRVQgPyB2YWx1ZSA6IG1lcmdlcihvbGRWYWwsIHZhbHVlLCBrZXkpOyB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgOiBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgIGNvbGxlY3Rpb24uc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBpdGVycy5sZW5ndGg7IGlpKyspIHtcbiAgICAgIGl0ZXJzW2lpXS5mb3JFYWNoKG1lcmdlSW50b0NvbGxlY3Rpb24pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gbWVyZ2VXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VXaXRoKG1lcmdlciwgY29sbGVjdGlvbikge1xuICB2YXIgc291cmNlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBzb3VyY2VzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMiBdO1xuXG4gIHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcCQxKGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcyk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcFdpdGgkMShtZXJnZXIsIGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDIgXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKSB7XG4gIHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIGRlZXBNZXJnZXJXaXRoKG1lcmdlcikpO1xufVxuXG5mdW5jdGlvbiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcikge1xuICBpZiAoIWlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnQ2Fubm90IG1lcmdlIGludG8gbm9uLWRhdGEtc3RydWN0dXJlIHZhbHVlOiAnICsgY29sbGVjdGlvblxuICAgICk7XG4gIH1cbiAgaWYgKGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBtZXJnZXIgPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbi5tZXJnZVdpdGhcbiAgICAgID8gY29sbGVjdGlvbi5tZXJnZVdpdGguYXBwbHkoY29sbGVjdGlvbiwgWyBtZXJnZXIgXS5jb25jYXQoIHNvdXJjZXMgKSlcbiAgICAgIDogY29sbGVjdGlvbi5tZXJnZVxuICAgICAgPyBjb2xsZWN0aW9uLm1lcmdlLmFwcGx5KGNvbGxlY3Rpb24sIHNvdXJjZXMpXG4gICAgICA6IGNvbGxlY3Rpb24uY29uY2F0LmFwcGx5KGNvbGxlY3Rpb24sIHNvdXJjZXMpO1xuICB9XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKTtcbiAgdmFyIG1lcmdlZCA9IGNvbGxlY3Rpb247XG4gIHZhciBDb2xsZWN0aW9uID0gaXNBcnJheSA/IEluZGV4ZWRDb2xsZWN0aW9uIDogS2V5ZWRDb2xsZWN0aW9uO1xuICB2YXIgbWVyZ2VJdGVtID0gaXNBcnJheVxuICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIENvcHkgb24gd3JpdGVcbiAgICAgICAgaWYgKG1lcmdlZCA9PT0gY29sbGVjdGlvbikge1xuICAgICAgICAgIG1lcmdlZCA9IHNoYWxsb3dDb3B5KG1lcmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgbWVyZ2VkLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIDogZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGhhc1ZhbCA9IGhhc093blByb3BlcnR5LmNhbGwobWVyZ2VkLCBrZXkpO1xuICAgICAgICB2YXIgbmV4dFZhbCA9XG4gICAgICAgICAgaGFzVmFsICYmIG1lcmdlciA/IG1lcmdlcihtZXJnZWRba2V5XSwgdmFsdWUsIGtleSkgOiB2YWx1ZTtcbiAgICAgICAgaWYgKCFoYXNWYWwgfHwgbmV4dFZhbCAhPT0gbWVyZ2VkW2tleV0pIHtcbiAgICAgICAgICAvLyBDb3B5IG9uIHdyaXRlXG4gICAgICAgICAgaWYgKG1lcmdlZCA9PT0gY29sbGVjdGlvbikge1xuICAgICAgICAgICAgbWVyZ2VkID0gc2hhbGxvd0NvcHkobWVyZ2VkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVyZ2VkW2tleV0gPSBuZXh0VmFsO1xuICAgICAgICB9XG4gICAgICB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBDb2xsZWN0aW9uKHNvdXJjZXNbaV0pLmZvckVhY2gobWVyZ2VJdGVtKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VkO1xufVxuXG5mdW5jdGlvbiBkZWVwTWVyZ2VyV2l0aChtZXJnZXIpIHtcbiAgZnVuY3Rpb24gZGVlcE1lcmdlcihvbGRWYWx1ZSwgbmV3VmFsdWUsIGtleSkge1xuICAgIHJldHVybiBpc0RhdGFTdHJ1Y3R1cmUob2xkVmFsdWUpICYmXG4gICAgICBpc0RhdGFTdHJ1Y3R1cmUobmV3VmFsdWUpICYmXG4gICAgICBhcmVNZXJnZWFibGUob2xkVmFsdWUsIG5ld1ZhbHVlKVxuICAgICAgPyBtZXJnZVdpdGhTb3VyY2VzKG9sZFZhbHVlLCBbbmV3VmFsdWVdLCBkZWVwTWVyZ2VyKVxuICAgICAgOiBtZXJnZXJcbiAgICAgID8gbWVyZ2VyKG9sZFZhbHVlLCBuZXdWYWx1ZSwga2V5KVxuICAgICAgOiBuZXdWYWx1ZTtcbiAgfVxuICByZXR1cm4gZGVlcE1lcmdlcjtcbn1cblxuLyoqXG4gKiBJdCdzIHVuY2xlYXIgd2hhdCB0aGUgZGVzaXJlZCBiZWhhdmlvciBpcyBmb3IgbWVyZ2luZyB0d28gY29sbGVjdGlvbnMgdGhhdFxuICogZmFsbCBpbnRvIHNlcGFyYXRlIGNhdGVnb3JpZXMgYmV0d2VlbiBrZXllZCwgaW5kZXhlZCwgb3Igc2V0LWxpa2UsIHNvIHdlIG9ubHlcbiAqIGNvbnNpZGVyIHRoZW0gbWVyZ2VhYmxlIGlmIHRoZXkgZmFsbCBpbnRvIHRoZSBzYW1lIGNhdGVnb3J5LlxuICovXG5mdW5jdGlvbiBhcmVNZXJnZWFibGUob2xkRGF0YVN0cnVjdHVyZSwgbmV3RGF0YVN0cnVjdHVyZSkge1xuICB2YXIgb2xkU2VxID0gU2VxKG9sZERhdGFTdHJ1Y3R1cmUpO1xuICB2YXIgbmV3U2VxID0gU2VxKG5ld0RhdGFTdHJ1Y3R1cmUpO1xuICAvLyBUaGlzIGxvZ2ljIGFzc3VtZXMgdGhhdCBhIHNlcXVlbmNlIGNhbiBvbmx5IGZhbGwgaW50byBvbmUgb2YgdGhlIHRocmVlXG4gIC8vIGNhdGVnb3JpZXMgbWVudGlvbmVkIGFib3ZlIChzaW5jZSB0aGVyZSdzIG5vIGBpc1NldExpa2UoKWAgbWV0aG9kKS5cbiAgcmV0dXJuIChcbiAgICBpc0luZGV4ZWQob2xkU2VxKSA9PT0gaXNJbmRleGVkKG5ld1NlcSkgJiZcbiAgICBpc0tleWVkKG9sZFNlcSkgPT09IGlzS2V5ZWQobmV3U2VxKVxuICApO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXAoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXModGhpcywgaXRlcnMpO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXBXaXRoKG1lcmdlcikge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKHRoaXMsIGl0ZXJzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUluKGtleVBhdGgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiB1cGRhdGVJbiQxKHRoaXMsIGtleVBhdGgsIGVtcHR5TWFwKCksIGZ1bmN0aW9uIChtKSB7IHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKG0sIGl0ZXJzKTsgfSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcEluKGtleVBhdGgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiB1cGRhdGVJbiQxKHRoaXMsIGtleVBhdGgsIGVtcHR5TWFwKCksIGZ1bmN0aW9uIChtKSB7IHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyhtLCBpdGVycyk7IH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gd2l0aE11dGF0aW9ucyhmbikge1xuICB2YXIgbXV0YWJsZSA9IHRoaXMuYXNNdXRhYmxlKCk7XG4gIGZuKG11dGFibGUpO1xuICByZXR1cm4gbXV0YWJsZS53YXNBbHRlcmVkKCkgPyBtdXRhYmxlLl9fZW5zdXJlT3duZXIodGhpcy5fX293bmVySUQpIDogdGhpcztcbn1cblxuZnVuY3Rpb24gYXNNdXRhYmxlKCkge1xuICByZXR1cm4gdGhpcy5fX293bmVySUQgPyB0aGlzIDogdGhpcy5fX2Vuc3VyZU93bmVyKG5ldyBPd25lcklEKCkpO1xufVxuXG5mdW5jdGlvbiBhc0ltbXV0YWJsZSgpIHtcbiAgcmV0dXJuIHRoaXMuX19lbnN1cmVPd25lcigpO1xufVxuXG5mdW5jdGlvbiB3YXNBbHRlcmVkKCkge1xuICByZXR1cm4gdGhpcy5fX2FsdGVyZWQ7XG59XG5cbnZhciBNYXAgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZENvbGxlY3Rpb24pIHtcbiAgZnVuY3Rpb24gTWFwKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlNYXAoKVxuICAgICAgOiBpc01hcCh2YWx1ZSkgJiYgIWlzT3JkZXJlZCh2YWx1ZSlcbiAgICAgID8gdmFsdWVcbiAgICAgIDogZW1wdHlNYXAoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICB2YXIgaXRlciA9IEtleWVkQ29sbGVjdGlvbih2YWx1ZSk7XG4gICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIG1hcC5zZXQoaywgdik7IH0pO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggS2V5ZWRDb2xsZWN0aW9uICkgTWFwLl9fcHJvdG9fXyA9IEtleWVkQ29sbGVjdGlvbjtcbiAgTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEtleWVkQ29sbGVjdGlvbiAmJiBLZXllZENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIE1hcC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYXA7XG5cbiAgTWFwLm9mID0gZnVuY3Rpb24gb2YgKCkge1xuICAgIHZhciBrZXlWYWx1ZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkga2V5VmFsdWVzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICByZXR1cm4gZW1wdHlNYXAoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5VmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGlmIChpICsgMSA+PSBrZXlWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHZhbHVlIGZvciBrZXk6ICcgKyBrZXlWYWx1ZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIG1hcC5zZXQoa2V5VmFsdWVzW2ldLCBrZXlWYWx1ZXNbaSArIDFdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ01hcCB7JywgJ30nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrLCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9yb290XG4gICAgICA/IHRoaXMuX3Jvb3QuZ2V0KDAsIHVuZGVmaW5lZCwgaywgbm90U2V0VmFsdWUpXG4gICAgICA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGssIHYpIHtcbiAgICByZXR1cm4gdXBkYXRlTWFwKHRoaXMsIGssIHYpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChrKSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCh0aGlzLCBrLCBOT1RfU0VUKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLmRlbGV0ZUFsbCA9IGZ1bmN0aW9uIGRlbGV0ZUFsbCAoa2V5cykge1xuICAgIHZhciBjb2xsZWN0aW9uID0gQ29sbGVjdGlvbihrZXlzKTtcblxuICAgIGlmIChjb2xsZWN0aW9uLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG1hcC5yZW1vdmUoa2V5KTsgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHlNYXAoKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIENvbXBvc2l0aW9uXG5cbiAgTWFwLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gc29ydCAoY29tcGFyYXRvcikge1xuICAgIC8vIExhdGUgYmluZGluZ1xuICAgIHJldHVybiBPcmRlcmVkTWFwKHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IpKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLnNvcnRCeSA9IGZ1bmN0aW9uIHNvcnRCeSAobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRNYXAoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvciwgbWFwcGVyKSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBtYXBwZXIuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzJDEkMSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNdXRhYmlsaXR5XG5cbiAgTWFwLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcywgdHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB0aGlzLl9yb290ICYmXG4gICAgICB0aGlzLl9yb290Lml0ZXJhdGUoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIGZuKGVudHJ5WzFdLCBlbnRyeVswXSwgdGhpcyQxJDEpO1xuICAgICAgfSwgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlNYXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VNYXAodGhpcy5zaXplLCB0aGlzLl9yb290LCBvd25lcklELCB0aGlzLl9faGFzaCk7XG4gIH07XG5cbiAgcmV0dXJuIE1hcDtcbn0oS2V5ZWRDb2xsZWN0aW9uKSk7XG5cbk1hcC5pc01hcCA9IGlzTWFwO1xuXG52YXIgTWFwUHJvdG90eXBlID0gTWFwLnByb3RvdHlwZTtcbk1hcFByb3RvdHlwZVtJU19NQVBfU1lNQk9MXSA9IHRydWU7XG5NYXBQcm90b3R5cGVbREVMRVRFXSA9IE1hcFByb3RvdHlwZS5yZW1vdmU7XG5NYXBQcm90b3R5cGUucmVtb3ZlQWxsID0gTWFwUHJvdG90eXBlLmRlbGV0ZUFsbDtcbk1hcFByb3RvdHlwZS5zZXRJbiA9IHNldEluO1xuTWFwUHJvdG90eXBlLnJlbW92ZUluID0gTWFwUHJvdG90eXBlLmRlbGV0ZUluID0gZGVsZXRlSW47XG5NYXBQcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xuTWFwUHJvdG90eXBlLnVwZGF0ZUluID0gdXBkYXRlSW47XG5NYXBQcm90b3R5cGUubWVyZ2UgPSBNYXBQcm90b3R5cGUuY29uY2F0ID0gbWVyZ2UkMTtcbk1hcFByb3RvdHlwZS5tZXJnZVdpdGggPSBtZXJnZVdpdGgkMTtcbk1hcFByb3RvdHlwZS5tZXJnZURlZXAgPSBtZXJnZURlZXA7XG5NYXBQcm90b3R5cGUubWVyZ2VEZWVwV2l0aCA9IG1lcmdlRGVlcFdpdGg7XG5NYXBQcm90b3R5cGUubWVyZ2VJbiA9IG1lcmdlSW47XG5NYXBQcm90b3R5cGUubWVyZ2VEZWVwSW4gPSBtZXJnZURlZXBJbjtcbk1hcFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcbk1hcFByb3RvdHlwZS53YXNBbHRlcmVkID0gd2FzQWx0ZXJlZDtcbk1hcFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuTWFwUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gTWFwUHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcbk1hcFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LnNldChhcnJbMF0sIGFyclsxXSk7XG59O1xuTWFwUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmouYXNJbW11dGFibGUoKTtcbn07XG5cbi8vICNwcmFnbWEgVHJpZSBOb2Rlc1xuXG52YXIgQXJyYXlNYXBOb2RlID0gZnVuY3Rpb24gQXJyYXlNYXBOb2RlKG93bmVySUQsIGVudHJpZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcbn07XG5cbkFycmF5TWFwTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgZm9yICh2YXIgaWkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaWkgPCBsZW47IGlpKyspIHtcbiAgICBpZiAoaXMoa2V5LCBlbnRyaWVzW2lpXVswXSkpIHtcbiAgICAgIHJldHVybiBlbnRyaWVzW2lpXVsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vdFNldFZhbHVlO1xufTtcblxuQXJyYXlNYXBOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuXG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoO1xuICBmb3IgKDsgaWR4IDwgbGVuOyBpZHgrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWR4XVswXSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB2YXIgZXhpc3RzID0gaWR4IDwgbGVuO1xuXG4gIGlmIChleGlzdHMgPyBlbnRyaWVzW2lkeF1bMV0gPT09IHZhbHVlIDogcmVtb3ZlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgKHJlbW92ZWQgfHwgIWV4aXN0cykgJiYgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuXG4gIGlmIChyZW1vdmVkICYmIGVudHJpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgfVxuXG4gIGlmICghZXhpc3RzICYmICFyZW1vdmVkICYmIGVudHJpZXMubGVuZ3RoID49IE1BWF9BUlJBWV9NQVBfU0laRSkge1xuICAgIHJldHVybiBjcmVhdGVOb2Rlcyhvd25lcklELCBlbnRyaWVzLCBrZXksIHZhbHVlKTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdFbnRyaWVzID0gaXNFZGl0YWJsZSA/IGVudHJpZXMgOiBhcnJDb3B5KGVudHJpZXMpO1xuXG4gIGlmIChleGlzdHMpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgaWR4ID09PSBsZW4gLSAxXG4gICAgICAgID8gbmV3RW50cmllcy5wb3AoKVxuICAgICAgICA6IChuZXdFbnRyaWVzW2lkeF0gPSBuZXdFbnRyaWVzLnBvcCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3RW50cmllc1tpZHhdID0gW2tleSwgdmFsdWVdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuZXdFbnRyaWVzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3RW50cmllcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgQXJyYXlNYXBOb2RlKG93bmVySUQsIG5ld0VudHJpZXMpO1xufTtcblxudmFyIEJpdG1hcEluZGV4ZWROb2RlID0gZnVuY3Rpb24gQml0bWFwSW5kZXhlZE5vZGUob3duZXJJRCwgYml0bWFwLCBub2Rlcykge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmJpdG1hcCA9IGJpdG1hcDtcbiAgdGhpcy5ub2RlcyA9IG5vZGVzO1xufTtcblxuQml0bWFwSW5kZXhlZE5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cbiAgdmFyIGJpdCA9IDEgPDwgKChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLKTtcbiAgdmFyIGJpdG1hcCA9IHRoaXMuYml0bWFwO1xuICByZXR1cm4gKGJpdG1hcCAmIGJpdCkgPT09IDBcbiAgICA/IG5vdFNldFZhbHVlXG4gICAgOiB0aGlzLm5vZGVzW3BvcENvdW50KGJpdG1hcCAmIChiaXQgLSAxKSldLmdldChcbiAgICAgICAgc2hpZnQgKyBTSElGVCxcbiAgICAgICAga2V5SGFzaCxcbiAgICAgICAga2V5LFxuICAgICAgICBub3RTZXRWYWx1ZVxuICAgICAgKTtcbn07XG5cbkJpdG1hcEluZGV4ZWROb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIga2V5SGFzaEZyYWcgPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIGJpdCA9IDEgPDwga2V5SGFzaEZyYWc7XG4gIHZhciBiaXRtYXAgPSB0aGlzLmJpdG1hcDtcbiAgdmFyIGV4aXN0cyA9IChiaXRtYXAgJiBiaXQpICE9PSAwO1xuXG4gIGlmICghZXhpc3RzICYmIHZhbHVlID09PSBOT1RfU0VUKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgaWR4ID0gcG9wQ291bnQoYml0bWFwICYgKGJpdCAtIDEpKTtcbiAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgdmFyIG5vZGUgPSBleGlzdHMgPyBub2Rlc1tpZHhdIDogdW5kZWZpbmVkO1xuICB2YXIgbmV3Tm9kZSA9IHVwZGF0ZU5vZGUoXG4gICAgbm9kZSxcbiAgICBvd25lcklELFxuICAgIHNoaWZ0ICsgU0hJRlQsXG4gICAga2V5SGFzaCxcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gICAgZGlkQ2hhbmdlU2l6ZSxcbiAgICBkaWRBbHRlclxuICApO1xuXG4gIGlmIChuZXdOb2RlID09PSBub2RlKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoIWV4aXN0cyAmJiBuZXdOb2RlICYmIG5vZGVzLmxlbmd0aCA+PSBNQVhfQklUTUFQX0lOREVYRURfU0laRSkge1xuICAgIHJldHVybiBleHBhbmROb2Rlcyhvd25lcklELCBub2RlcywgYml0bWFwLCBrZXlIYXNoRnJhZywgbmV3Tm9kZSk7XG4gIH1cblxuICBpZiAoXG4gICAgZXhpc3RzICYmXG4gICAgIW5ld05vZGUgJiZcbiAgICBub2Rlcy5sZW5ndGggPT09IDIgJiZcbiAgICBpc0xlYWZOb2RlKG5vZGVzW2lkeCBeIDFdKVxuICApIHtcbiAgICByZXR1cm4gbm9kZXNbaWR4IF4gMV07XG4gIH1cblxuICBpZiAoZXhpc3RzICYmIG5ld05vZGUgJiYgbm9kZXMubGVuZ3RoID09PSAxICYmIGlzTGVhZk5vZGUobmV3Tm9kZSkpIHtcbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdCaXRtYXAgPSBleGlzdHMgPyAobmV3Tm9kZSA/IGJpdG1hcCA6IGJpdG1hcCBeIGJpdCkgOiBiaXRtYXAgfCBiaXQ7XG4gIHZhciBuZXdOb2RlcyA9IGV4aXN0c1xuICAgID8gbmV3Tm9kZVxuICAgICAgPyBzZXRBdChub2RlcywgaWR4LCBuZXdOb2RlLCBpc0VkaXRhYmxlKVxuICAgICAgOiBzcGxpY2VPdXQobm9kZXMsIGlkeCwgaXNFZGl0YWJsZSlcbiAgICA6IHNwbGljZUluKG5vZGVzLCBpZHgsIG5ld05vZGUsIGlzRWRpdGFibGUpO1xuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5iaXRtYXAgPSBuZXdCaXRtYXA7XG4gICAgdGhpcy5ub2RlcyA9IG5ld05vZGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBCaXRtYXBJbmRleGVkTm9kZShvd25lcklELCBuZXdCaXRtYXAsIG5ld05vZGVzKTtcbn07XG5cbnZhciBIYXNoQXJyYXlNYXBOb2RlID0gZnVuY3Rpb24gSGFzaEFycmF5TWFwTm9kZShvd25lcklELCBjb3VudCwgbm9kZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5jb3VudCA9IGNvdW50O1xuICB0aGlzLm5vZGVzID0gbm9kZXM7XG59O1xuXG5IYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG4gIHZhciBpZHggPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzW2lkeF07XG4gIHJldHVybiBub2RlXG4gICAgPyBub2RlLmdldChzaGlmdCArIFNISUZULCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKVxuICAgIDogbm90U2V0VmFsdWU7XG59O1xuXG5IYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIgaWR4ID0gKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG4gIHZhciByZW1vdmVkID0gdmFsdWUgPT09IE5PVF9TRVQ7XG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIHZhciBub2RlID0gbm9kZXNbaWR4XTtcblxuICBpZiAocmVtb3ZlZCAmJiAhbm9kZSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIG5ld05vZGUgPSB1cGRhdGVOb2RlKFxuICAgIG5vZGUsXG4gICAgb3duZXJJRCxcbiAgICBzaGlmdCArIFNISUZULFxuICAgIGtleUhhc2gsXG4gICAga2V5LFxuICAgIHZhbHVlLFxuICAgIGRpZENoYW5nZVNpemUsXG4gICAgZGlkQWx0ZXJcbiAgKTtcbiAgaWYgKG5ld05vZGUgPT09IG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBuZXdDb3VudCA9IHRoaXMuY291bnQ7XG4gIGlmICghbm9kZSkge1xuICAgIG5ld0NvdW50Kys7XG4gIH0gZWxzZSBpZiAoIW5ld05vZGUpIHtcbiAgICBuZXdDb3VudC0tO1xuICAgIGlmIChuZXdDb3VudCA8IE1JTl9IQVNIX0FSUkFZX01BUF9TSVpFKSB7XG4gICAgICByZXR1cm4gcGFja05vZGVzKG93bmVySUQsIG5vZGVzLCBuZXdDb3VudCwgaWR4KTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNFZGl0YWJsZSA9IG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEO1xuICB2YXIgbmV3Tm9kZXMgPSBzZXRBdChub2RlcywgaWR4LCBuZXdOb2RlLCBpc0VkaXRhYmxlKTtcblxuICBpZiAoaXNFZGl0YWJsZSkge1xuICAgIHRoaXMuY291bnQgPSBuZXdDb3VudDtcbiAgICB0aGlzLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEhhc2hBcnJheU1hcE5vZGUob3duZXJJRCwgbmV3Q291bnQsIG5ld05vZGVzKTtcbn07XG5cbnZhciBIYXNoQ29sbGlzaW9uTm9kZSA9IGZ1bmN0aW9uIEhhc2hDb2xsaXNpb25Ob2RlKG93bmVySUQsIGtleUhhc2gsIGVudHJpZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5rZXlIYXNoID0ga2V5SGFzaDtcbiAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcbn07XG5cbkhhc2hDb2xsaXNpb25Ob2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICBmb3IgKHZhciBpaSA9IDAsIGxlbiA9IGVudHJpZXMubGVuZ3RoOyBpaSA8IGxlbjsgaWkrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWldWzBdKSkge1xuICAgICAgcmV0dXJuIGVudHJpZXNbaWldWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm90U2V0VmFsdWU7XG59O1xuXG5IYXNoQ29sbGlzaW9uTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cblxuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuXG4gIGlmIChrZXlIYXNoICE9PSB0aGlzLmtleUhhc2gpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFNldFJlZihkaWRBbHRlcik7XG4gICAgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuICAgIHJldHVybiBtZXJnZUludG9Ob2RlKHRoaXMsIG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBba2V5LCB2YWx1ZV0pO1xuICB9XG5cbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gZW50cmllcy5sZW5ndGg7XG4gIGZvciAoOyBpZHggPCBsZW47IGlkeCsrKSB7XG4gICAgaWYgKGlzKGtleSwgZW50cmllc1tpZHhdWzBdKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHZhciBleGlzdHMgPSBpZHggPCBsZW47XG5cbiAgaWYgKGV4aXN0cyA/IGVudHJpZXNbaWR4XVsxXSA9PT0gdmFsdWUgOiByZW1vdmVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBTZXRSZWYoZGlkQWx0ZXIpO1xuICAocmVtb3ZlZCB8fCAhZXhpc3RzKSAmJiBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG5cbiAgaWYgKHJlbW92ZWQgJiYgbGVuID09PSAyKSB7XG4gICAgcmV0dXJuIG5ldyBWYWx1ZU5vZGUob3duZXJJRCwgdGhpcy5rZXlIYXNoLCBlbnRyaWVzW2lkeCBeIDFdKTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdFbnRyaWVzID0gaXNFZGl0YWJsZSA/IGVudHJpZXMgOiBhcnJDb3B5KGVudHJpZXMpO1xuXG4gIGlmIChleGlzdHMpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgaWR4ID09PSBsZW4gLSAxXG4gICAgICAgID8gbmV3RW50cmllcy5wb3AoKVxuICAgICAgICA6IChuZXdFbnRyaWVzW2lkeF0gPSBuZXdFbnRyaWVzLnBvcCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3RW50cmllc1tpZHhdID0gW2tleSwgdmFsdWVdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuZXdFbnRyaWVzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3RW50cmllcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgSGFzaENvbGxpc2lvbk5vZGUob3duZXJJRCwgdGhpcy5rZXlIYXNoLCBuZXdFbnRyaWVzKTtcbn07XG5cbnZhciBWYWx1ZU5vZGUgPSBmdW5jdGlvbiBWYWx1ZU5vZGUob3duZXJJRCwga2V5SGFzaCwgZW50cnkpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5rZXlIYXNoID0ga2V5SGFzaDtcbiAgdGhpcy5lbnRyeSA9IGVudHJ5O1xufTtcblxuVmFsdWVOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHJldHVybiBpcyhrZXksIHRoaXMuZW50cnlbMF0pID8gdGhpcy5lbnRyeVsxXSA6IG5vdFNldFZhbHVlO1xufTtcblxuVmFsdWVOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuICB2YXIga2V5TWF0Y2ggPSBpcyhrZXksIHRoaXMuZW50cnlbMF0pO1xuICBpZiAoa2V5TWF0Y2ggPyB2YWx1ZSA9PT0gdGhpcy5lbnRyeVsxXSA6IHJlbW92ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFNldFJlZihkaWRBbHRlcik7XG5cbiAgaWYgKHJlbW92ZWQpIHtcbiAgICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gICAgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgfVxuXG4gIGlmIChrZXlNYXRjaCkge1xuICAgIGlmIChvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRCkge1xuICAgICAgdGhpcy5lbnRyeVsxXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVmFsdWVOb2RlKG93bmVySUQsIHRoaXMua2V5SGFzaCwgW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcbiAgcmV0dXJuIG1lcmdlSW50b05vZGUodGhpcywgb3duZXJJRCwgc2hpZnQsIGhhc2goa2V5KSwgW2tleSwgdmFsdWVdKTtcbn07XG5cbi8vICNwcmFnbWEgSXRlcmF0b3JzXG5cbkFycmF5TWFwTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IEhhc2hDb2xsaXNpb25Ob2RlLnByb3RvdHlwZS5pdGVyYXRlID1cbiAgZnVuY3Rpb24gKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gICAgZm9yICh2YXIgaWkgPSAwLCBtYXhJbmRleCA9IGVudHJpZXMubGVuZ3RoIC0gMTsgaWkgPD0gbWF4SW5kZXg7IGlpKyspIHtcbiAgICAgIGlmIChmbihlbnRyaWVzW3JldmVyc2UgPyBtYXhJbmRleCAtIGlpIDogaWldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuQml0bWFwSW5kZXhlZE5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBIYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5pdGVyYXRlID1cbiAgZnVuY3Rpb24gKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgICBmb3IgKHZhciBpaSA9IDAsIG1heEluZGV4ID0gbm9kZXMubGVuZ3RoIC0gMTsgaWkgPD0gbWF4SW5kZXg7IGlpKyspIHtcbiAgICAgIHZhciBub2RlID0gbm9kZXNbcmV2ZXJzZSA/IG1heEluZGV4IC0gaWkgOiBpaV07XG4gICAgICBpZiAobm9kZSAmJiBub2RlLml0ZXJhdGUoZm4sIHJldmVyc2UpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblZhbHVlTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uIChmbiwgcmV2ZXJzZSkge1xuICByZXR1cm4gZm4odGhpcy5lbnRyeSk7XG59O1xuXG52YXIgTWFwSXRlcmF0b3IgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJdGVyYXRvcikge1xuICBmdW5jdGlvbiBNYXBJdGVyYXRvcihtYXAsIHR5cGUsIHJldmVyc2UpIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB0aGlzLl9yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICB0aGlzLl9zdGFjayA9IG1hcC5fcm9vdCAmJiBtYXBJdGVyYXRvckZyYW1lKG1hcC5fcm9vdCk7XG4gIH1cblxuICBpZiAoIEl0ZXJhdG9yICkgTWFwSXRlcmF0b3IuX19wcm90b19fID0gSXRlcmF0b3I7XG4gIE1hcEl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEl0ZXJhdG9yICYmIEl0ZXJhdG9yLnByb3RvdHlwZSApO1xuICBNYXBJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYXBJdGVyYXRvcjtcblxuICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIG5leHQgKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fdHlwZTtcbiAgICB2YXIgc3RhY2sgPSB0aGlzLl9zdGFjaztcbiAgICB3aGlsZSAoc3RhY2spIHtcbiAgICAgIHZhciBub2RlID0gc3RhY2subm9kZTtcbiAgICAgIHZhciBpbmRleCA9IHN0YWNrLmluZGV4Kys7XG4gICAgICB2YXIgbWF4SW5kZXggPSAodm9pZCAwKTtcbiAgICAgIGlmIChub2RlLmVudHJ5KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBtYXBJdGVyYXRvclZhbHVlKHR5cGUsIG5vZGUuZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuZW50cmllcykge1xuICAgICAgICBtYXhJbmRleCA9IG5vZGUuZW50cmllcy5sZW5ndGggLSAxO1xuICAgICAgICBpZiAoaW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbWFwSXRlcmF0b3JWYWx1ZShcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBub2RlLmVudHJpZXNbdGhpcy5fcmV2ZXJzZSA/IG1heEluZGV4IC0gaW5kZXggOiBpbmRleF1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXhJbmRleCA9IG5vZGUubm9kZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgdmFyIHN1Yk5vZGUgPSBub2RlLm5vZGVzW3RoaXMuX3JldmVyc2UgPyBtYXhJbmRleCAtIGluZGV4IDogaW5kZXhdO1xuICAgICAgICAgIGlmIChzdWJOb2RlKSB7XG4gICAgICAgICAgICBpZiAoc3ViTm9kZS5lbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gbWFwSXRlcmF0b3JWYWx1ZSh0eXBlLCBzdWJOb2RlLmVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrID0gdGhpcy5fc3RhY2sgPSBtYXBJdGVyYXRvckZyYW1lKHN1Yk5vZGUsIHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrID0gdGhpcy5fc3RhY2sgPSB0aGlzLl9zdGFjay5fX3ByZXY7XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgfTtcblxuICByZXR1cm4gTWFwSXRlcmF0b3I7XG59KEl0ZXJhdG9yKSk7XG5cbmZ1bmN0aW9uIG1hcEl0ZXJhdG9yVmFsdWUodHlwZSwgZW50cnkpIHtcbiAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgZW50cnlbMF0sIGVudHJ5WzFdKTtcbn1cblxuZnVuY3Rpb24gbWFwSXRlcmF0b3JGcmFtZShub2RlLCBwcmV2KSB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBpbmRleDogMCxcbiAgICBfX3ByZXY6IHByZXYsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VNYXAoc2l6ZSwgcm9vdCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShNYXBQcm90b3R5cGUpO1xuICBtYXAuc2l6ZSA9IHNpemU7XG4gIG1hcC5fcm9vdCA9IHJvb3Q7XG4gIG1hcC5fX293bmVySUQgPSBvd25lcklEO1xuICBtYXAuX19oYXNoID0gaGFzaDtcbiAgbWFwLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICByZXR1cm4gbWFwO1xufVxuXG52YXIgRU1QVFlfTUFQO1xuZnVuY3Rpb24gZW1wdHlNYXAoKSB7XG4gIHJldHVybiBFTVBUWV9NQVAgfHwgKEVNUFRZX01BUCA9IG1ha2VNYXAoMCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNYXAobWFwLCBrLCB2KSB7XG4gIHZhciBuZXdSb290O1xuICB2YXIgbmV3U2l6ZTtcbiAgaWYgKCFtYXAuX3Jvb3QpIHtcbiAgICBpZiAodiA9PT0gTk9UX1NFVCkge1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgbmV3U2l6ZSA9IDE7XG4gICAgbmV3Um9vdCA9IG5ldyBBcnJheU1hcE5vZGUobWFwLl9fb3duZXJJRCwgW1trLCB2XV0pO1xuICB9IGVsc2Uge1xuICAgIHZhciBkaWRDaGFuZ2VTaXplID0gTWFrZVJlZigpO1xuICAgIHZhciBkaWRBbHRlciA9IE1ha2VSZWYoKTtcbiAgICBuZXdSb290ID0gdXBkYXRlTm9kZShcbiAgICAgIG1hcC5fcm9vdCxcbiAgICAgIG1hcC5fX293bmVySUQsXG4gICAgICAwLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgayxcbiAgICAgIHYsXG4gICAgICBkaWRDaGFuZ2VTaXplLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICAgIGlmICghZGlkQWx0ZXIudmFsdWUpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIG5ld1NpemUgPSBtYXAuc2l6ZSArIChkaWRDaGFuZ2VTaXplLnZhbHVlID8gKHYgPT09IE5PVF9TRVQgPyAtMSA6IDEpIDogMCk7XG4gIH1cbiAgaWYgKG1hcC5fX293bmVySUQpIHtcbiAgICBtYXAuc2l6ZSA9IG5ld1NpemU7XG4gICAgbWFwLl9yb290ID0gbmV3Um9vdDtcbiAgICBtYXAuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIG1hcC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBtYXA7XG4gIH1cbiAgcmV0dXJuIG5ld1Jvb3QgPyBtYWtlTWFwKG5ld1NpemUsIG5ld1Jvb3QpIDogZW1wdHlNYXAoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9kZShcbiAgbm9kZSxcbiAgb3duZXJJRCxcbiAgc2hpZnQsXG4gIGtleUhhc2gsXG4gIGtleSxcbiAgdmFsdWUsXG4gIGRpZENoYW5nZVNpemUsXG4gIGRpZEFsdGVyXG4pIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgaWYgKHZhbHVlID09PSBOT1RfU0VUKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gICAgcmV0dXJuIG5ldyBWYWx1ZU5vZGUob3duZXJJRCwga2V5SGFzaCwgW2tleSwgdmFsdWVdKTtcbiAgfVxuICByZXR1cm4gbm9kZS51cGRhdGUoXG4gICAgb3duZXJJRCxcbiAgICBzaGlmdCxcbiAgICBrZXlIYXNoLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBkaWRDaGFuZ2VTaXplLFxuICAgIGRpZEFsdGVyXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzTGVhZk5vZGUobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUuY29uc3RydWN0b3IgPT09IFZhbHVlTm9kZSB8fCBub2RlLmNvbnN0cnVjdG9yID09PSBIYXNoQ29sbGlzaW9uTm9kZVxuICApO1xufVxuXG5mdW5jdGlvbiBtZXJnZUludG9Ob2RlKG5vZGUsIG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBlbnRyeSkge1xuICBpZiAobm9kZS5rZXlIYXNoID09PSBrZXlIYXNoKSB7XG4gICAgcmV0dXJuIG5ldyBIYXNoQ29sbGlzaW9uTm9kZShvd25lcklELCBrZXlIYXNoLCBbbm9kZS5lbnRyeSwgZW50cnldKTtcbiAgfVxuXG4gIHZhciBpZHgxID0gKHNoaWZ0ID09PSAwID8gbm9kZS5rZXlIYXNoIDogbm9kZS5rZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuICB2YXIgaWR4MiA9IChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuXG4gIHZhciBuZXdOb2RlO1xuICB2YXIgbm9kZXMgPVxuICAgIGlkeDEgPT09IGlkeDJcbiAgICAgID8gW21lcmdlSW50b05vZGUobm9kZSwgb3duZXJJRCwgc2hpZnQgKyBTSElGVCwga2V5SGFzaCwgZW50cnkpXVxuICAgICAgOiAoKG5ld05vZGUgPSBuZXcgVmFsdWVOb2RlKG93bmVySUQsIGtleUhhc2gsIGVudHJ5KSksXG4gICAgICAgIGlkeDEgPCBpZHgyID8gW25vZGUsIG5ld05vZGVdIDogW25ld05vZGUsIG5vZGVdKTtcblxuICByZXR1cm4gbmV3IEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsICgxIDw8IGlkeDEpIHwgKDEgPDwgaWR4MiksIG5vZGVzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZXMob3duZXJJRCwgZW50cmllcywga2V5LCB2YWx1ZSkge1xuICBpZiAoIW93bmVySUQpIHtcbiAgICBvd25lcklEID0gbmV3IE93bmVySUQoKTtcbiAgfVxuICB2YXIgbm9kZSA9IG5ldyBWYWx1ZU5vZGUob3duZXJJRCwgaGFzaChrZXkpLCBba2V5LCB2YWx1ZV0pO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgZW50cmllcy5sZW5ndGg7IGlpKyspIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2lpXTtcbiAgICBub2RlID0gbm9kZS51cGRhdGUob3duZXJJRCwgMCwgdW5kZWZpbmVkLCBlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBwYWNrTm9kZXMob3duZXJJRCwgbm9kZXMsIGNvdW50LCBleGNsdWRpbmcpIHtcbiAgdmFyIGJpdG1hcCA9IDA7XG4gIHZhciBwYWNrZWRJSSA9IDA7XG4gIHZhciBwYWNrZWROb2RlcyA9IG5ldyBBcnJheShjb3VudCk7XG4gIGZvciAodmFyIGlpID0gMCwgYml0ID0gMSwgbGVuID0gbm9kZXMubGVuZ3RoOyBpaSA8IGxlbjsgaWkrKywgYml0IDw8PSAxKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1tpaV07XG4gICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCAmJiBpaSAhPT0gZXhjbHVkaW5nKSB7XG4gICAgICBiaXRtYXAgfD0gYml0O1xuICAgICAgcGFja2VkTm9kZXNbcGFja2VkSUkrK10gPSBub2RlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsIGJpdG1hcCwgcGFja2VkTm9kZXMpO1xufVxuXG5mdW5jdGlvbiBleHBhbmROb2Rlcyhvd25lcklELCBub2RlcywgYml0bWFwLCBpbmNsdWRpbmcsIG5vZGUpIHtcbiAgdmFyIGNvdW50ID0gMDtcbiAgdmFyIGV4cGFuZGVkTm9kZXMgPSBuZXcgQXJyYXkoU0laRSk7XG4gIGZvciAodmFyIGlpID0gMDsgYml0bWFwICE9PSAwOyBpaSsrLCBiaXRtYXAgPj4+PSAxKSB7XG4gICAgZXhwYW5kZWROb2Rlc1tpaV0gPSBiaXRtYXAgJiAxID8gbm9kZXNbY291bnQrK10gOiB1bmRlZmluZWQ7XG4gIH1cbiAgZXhwYW5kZWROb2Rlc1tpbmNsdWRpbmddID0gbm9kZTtcbiAgcmV0dXJuIG5ldyBIYXNoQXJyYXlNYXBOb2RlKG93bmVySUQsIGNvdW50ICsgMSwgZXhwYW5kZWROb2Rlcyk7XG59XG5cbmZ1bmN0aW9uIHBvcENvdW50KHgpIHtcbiAgeCAtPSAoeCA+PiAxKSAmIDB4NTU1NTU1NTU7XG4gIHggPSAoeCAmIDB4MzMzMzMzMzMpICsgKCh4ID4+IDIpICYgMHgzMzMzMzMzMyk7XG4gIHggPSAoeCArICh4ID4+IDQpKSAmIDB4MGYwZjBmMGY7XG4gIHggKz0geCA+PiA4O1xuICB4ICs9IHggPj4gMTY7XG4gIHJldHVybiB4ICYgMHg3Zjtcbn1cblxuZnVuY3Rpb24gc2V0QXQoYXJyYXksIGlkeCwgdmFsLCBjYW5FZGl0KSB7XG4gIHZhciBuZXdBcnJheSA9IGNhbkVkaXQgPyBhcnJheSA6IGFyckNvcHkoYXJyYXkpO1xuICBuZXdBcnJheVtpZHhdID0gdmFsO1xuICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZUluKGFycmF5LCBpZHgsIHZhbCwgY2FuRWRpdCkge1xuICB2YXIgbmV3TGVuID0gYXJyYXkubGVuZ3RoICsgMTtcbiAgaWYgKGNhbkVkaXQgJiYgaWR4ICsgMSA9PT0gbmV3TGVuKSB7XG4gICAgYXJyYXlbaWR4XSA9IHZhbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgdmFyIG5ld0FycmF5ID0gbmV3IEFycmF5KG5ld0xlbik7XG4gIHZhciBhZnRlciA9IDA7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBuZXdMZW47IGlpKyspIHtcbiAgICBpZiAoaWkgPT09IGlkeCkge1xuICAgICAgbmV3QXJyYXlbaWldID0gdmFsO1xuICAgICAgYWZ0ZXIgPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3QXJyYXlbaWldID0gYXJyYXlbaWkgKyBhZnRlcl07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT3V0KGFycmF5LCBpZHgsIGNhbkVkaXQpIHtcbiAgdmFyIG5ld0xlbiA9IGFycmF5Lmxlbmd0aCAtIDE7XG4gIGlmIChjYW5FZGl0ICYmIGlkeCA9PT0gbmV3TGVuKSB7XG4gICAgYXJyYXkucG9wKCk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG4gIHZhciBuZXdBcnJheSA9IG5ldyBBcnJheShuZXdMZW4pO1xuICB2YXIgYWZ0ZXIgPSAwO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbmV3TGVuOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpZHgpIHtcbiAgICAgIGFmdGVyID0gMTtcbiAgICB9XG4gICAgbmV3QXJyYXlbaWldID0gYXJyYXlbaWkgKyBhZnRlcl07XG4gIH1cbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG52YXIgTUFYX0FSUkFZX01BUF9TSVpFID0gU0laRSAvIDQ7XG52YXIgTUFYX0JJVE1BUF9JTkRFWEVEX1NJWkUgPSBTSVpFIC8gMjtcbnZhciBNSU5fSEFTSF9BUlJBWV9NQVBfU0laRSA9IFNJWkUgLyA0O1xuXG52YXIgSVNfTElTVF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9MSVNUX19AQCc7XG5cbmZ1bmN0aW9uIGlzTGlzdChtYXliZUxpc3QpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVMaXN0ICYmIG1heWJlTGlzdFtJU19MSVNUX1NZTUJPTF0pO1xufVxuXG52YXIgTGlzdCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIExpc3QodmFsdWUpIHtcbiAgICB2YXIgZW1wdHkgPSBlbXB0eUxpc3QoKTtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH1cbiAgICBpZiAoaXNMaXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB2YXIgaXRlciA9IEluZGV4ZWRDb2xsZWN0aW9uKHZhbHVlKTtcbiAgICB2YXIgc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH1cbiAgICBhc3NlcnROb3RJbmZpbml0ZShzaXplKTtcbiAgICBpZiAoc2l6ZSA+IDAgJiYgc2l6ZSA8IFNJWkUpIHtcbiAgICAgIHJldHVybiBtYWtlTGlzdCgwLCBzaXplLCBTSElGVCwgbnVsbCwgbmV3IFZOb2RlKGl0ZXIudG9BcnJheSgpKSk7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBsaXN0LnNldFNpemUoc2l6ZSk7XG4gICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGxpc3Quc2V0KGksIHYpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZENvbGxlY3Rpb24gKSBMaXN0Ll9fcHJvdG9fXyA9IEluZGV4ZWRDb2xsZWN0aW9uO1xuICBMaXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRDb2xsZWN0aW9uICYmIEluZGV4ZWRDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBMaXN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpc3Q7XG5cbiAgTGlzdC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdMaXN0IFsnLCAnXScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgTGlzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnNpemUpIHtcbiAgICAgIGluZGV4ICs9IHRoaXMuX29yaWdpbjtcbiAgICAgIHZhciBub2RlID0gbGlzdE5vZGVGb3IodGhpcywgaW5kZXgpO1xuICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5hcnJheVtpbmRleCAmIE1BU0tdO1xuICAgIH1cbiAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGluZGV4LCB2YWx1ZSkge1xuICAgIHJldHVybiB1cGRhdGVMaXN0KHRoaXMsIGluZGV4LCB2YWx1ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChpbmRleCkge1xuICAgIHJldHVybiAhdGhpcy5oYXMoaW5kZXgpXG4gICAgICA/IHRoaXNcbiAgICAgIDogaW5kZXggPT09IDBcbiAgICAgID8gdGhpcy5zaGlmdCgpXG4gICAgICA6IGluZGV4ID09PSB0aGlzLnNpemUgLSAxXG4gICAgICA/IHRoaXMucG9wKClcbiAgICAgIDogdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaW5kZXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5fb3JpZ2luID0gdGhpcy5fY2FwYWNpdHkgPSAwO1xuICAgICAgdGhpcy5fbGV2ZWwgPSBTSElGVDtcbiAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLl90YWlsID0gdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5TGlzdCgpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICgvKi4uLnZhbHVlcyovKSB7XG4gICAgdmFyIHZhbHVlcyA9IGFyZ3VtZW50cztcbiAgICB2YXIgb2xkU2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBzZXRMaXN0Qm91bmRzKGxpc3QsIDAsIG9sZFNpemUgKyB2YWx1ZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCB2YWx1ZXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIGxpc3Quc2V0KG9sZFNpemUgKyBpaSwgdmFsdWVzW2lpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gcG9wICgpIHtcbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyh0aGlzLCAwLCAtMSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQgKC8qLi4udmFsdWVzKi8pIHtcbiAgICB2YXIgdmFsdWVzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIHNldExpc3RCb3VuZHMobGlzdCwgLXZhbHVlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHZhbHVlcy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgbGlzdC5zZXQoaWksIHZhbHVlc1tpaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQgKCkge1xuICAgIHJldHVybiBzZXRMaXN0Qm91bmRzKHRoaXMsIDEpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQ29tcG9zaXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKC8qLi4uY29sbGVjdGlvbnMqLykge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIHZhciBzZXFzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3VtZW50cyQxW2ldO1xuICAgICAgdmFyIHNlcSA9IEluZGV4ZWRDb2xsZWN0aW9uKFxuICAgICAgICB0eXBlb2YgYXJndW1lbnQgIT09ICdzdHJpbmcnICYmIGhhc0l0ZXJhdG9yKGFyZ3VtZW50KVxuICAgICAgICAgID8gYXJndW1lbnRcbiAgICAgICAgICA6IFthcmd1bWVudF1cbiAgICAgICk7XG4gICAgICBpZiAoc2VxLnNpemUgIT09IDApIHtcbiAgICAgICAgc2Vxcy5wdXNoKHNlcSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZXFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUgPT09IDAgJiYgIXRoaXMuX19vd25lcklEICYmIHNlcXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihzZXFzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgc2Vxcy5mb3JFYWNoKGZ1bmN0aW9uIChzZXEpIHsgcmV0dXJuIHNlcS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gbGlzdC5wdXNoKHZhbHVlKTsgfSk7IH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplIChzaXplKSB7XG4gICAgcmV0dXJuIHNldExpc3RCb3VuZHModGhpcywgMCwgc2l6ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzJDEkMS5zaXplOyBpKyspIHtcbiAgICAgICAgbGlzdC5zZXQoaSwgbWFwcGVyLmNhbGwoY29udGV4dCwgbGlzdC5nZXQoaSksIGksIHRoaXMkMSQxKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBJdGVyYXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgaWYgKHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgc2l6ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyhcbiAgICAgIHRoaXMsXG4gICAgICByZXNvbHZlQmVnaW4oYmVnaW4sIHNpemUpLFxuICAgICAgcmVzb2x2ZUVuZChlbmQsIHNpemUpXG4gICAgKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpbmRleCA9IHJldmVyc2UgPyB0aGlzLnNpemUgOiAwO1xuICAgIHZhciB2YWx1ZXMgPSBpdGVyYXRlTGlzdCh0aGlzLCByZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlcygpO1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBET05FXG4gICAgICAgID8gaXRlcmF0b3JEb25lKClcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIHJldmVyc2UgPyAtLWluZGV4IDogaW5kZXgrKywgdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgaW5kZXggPSByZXZlcnNlID8gdGhpcy5zaXplIDogMDtcbiAgICB2YXIgdmFsdWVzID0gaXRlcmF0ZUxpc3QodGhpcywgcmV2ZXJzZSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHdoaWxlICgodmFsdWUgPSB2YWx1ZXMoKSkgIT09IERPTkUpIHtcbiAgICAgIGlmIChmbih2YWx1ZSwgcmV2ZXJzZSA/IC0taW5kZXggOiBpbmRleCsrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlMaXN0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlTGlzdChcbiAgICAgIHRoaXMuX29yaWdpbixcbiAgICAgIHRoaXMuX2NhcGFjaXR5LFxuICAgICAgdGhpcy5fbGV2ZWwsXG4gICAgICB0aGlzLl9yb290LFxuICAgICAgdGhpcy5fdGFpbCxcbiAgICAgIG93bmVySUQsXG4gICAgICB0aGlzLl9faGFzaFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIExpc3Q7XG59KEluZGV4ZWRDb2xsZWN0aW9uKSk7XG5cbkxpc3QuaXNMaXN0ID0gaXNMaXN0O1xuXG52YXIgTGlzdFByb3RvdHlwZSA9IExpc3QucHJvdG90eXBlO1xuTGlzdFByb3RvdHlwZVtJU19MSVNUX1NZTUJPTF0gPSB0cnVlO1xuTGlzdFByb3RvdHlwZVtERUxFVEVdID0gTGlzdFByb3RvdHlwZS5yZW1vdmU7XG5MaXN0UHJvdG90eXBlLm1lcmdlID0gTGlzdFByb3RvdHlwZS5jb25jYXQ7XG5MaXN0UHJvdG90eXBlLnNldEluID0gc2V0SW47XG5MaXN0UHJvdG90eXBlLmRlbGV0ZUluID0gTGlzdFByb3RvdHlwZS5yZW1vdmVJbiA9IGRlbGV0ZUluO1xuTGlzdFByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XG5MaXN0UHJvdG90eXBlLnVwZGF0ZUluID0gdXBkYXRlSW47XG5MaXN0UHJvdG90eXBlLm1lcmdlSW4gPSBtZXJnZUluO1xuTGlzdFByb3RvdHlwZS5tZXJnZURlZXBJbiA9IG1lcmdlRGVlcEluO1xuTGlzdFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcbkxpc3RQcm90b3R5cGUud2FzQWx0ZXJlZCA9IHdhc0FsdGVyZWQ7XG5MaXN0UHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5MaXN0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gTGlzdFByb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5MaXN0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgYXJyKSB7XG4gIHJldHVybiByZXN1bHQucHVzaChhcnIpO1xufTtcbkxpc3RQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iai5hc0ltbXV0YWJsZSgpO1xufTtcblxudmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUoYXJyYXksIG93bmVySUQpIHtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xufTtcblxuLy8gVE9ETzogc2VlbXMgbGlrZSB0aGVzZSBtZXRob2RzIGFyZSB2ZXJ5IHNpbWlsYXJcblxuVk5vZGUucHJvdG90eXBlLnJlbW92ZUJlZm9yZSA9IGZ1bmN0aW9uIHJlbW92ZUJlZm9yZSAob3duZXJJRCwgbGV2ZWwsIGluZGV4KSB7XG4gIGlmIChpbmRleCA9PT0gbGV2ZWwgPyAxIDw8IGxldmVsIDogdGhpcy5hcnJheS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgb3JpZ2luSW5kZXggPSAoaW5kZXggPj4+IGxldmVsKSAmIE1BU0s7XG4gIGlmIChvcmlnaW5JbmRleCA+PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgVk5vZGUoW10sIG93bmVySUQpO1xuICB9XG4gIHZhciByZW1vdmluZ0ZpcnN0ID0gb3JpZ2luSW5kZXggPT09IDA7XG4gIHZhciBuZXdDaGlsZDtcbiAgaWYgKGxldmVsID4gMCkge1xuICAgIHZhciBvbGRDaGlsZCA9IHRoaXMuYXJyYXlbb3JpZ2luSW5kZXhdO1xuICAgIG5ld0NoaWxkID1cbiAgICAgIG9sZENoaWxkICYmIG9sZENoaWxkLnJlbW92ZUJlZm9yZShvd25lcklELCBsZXZlbCAtIFNISUZULCBpbmRleCk7XG4gICAgaWYgKG5ld0NoaWxkID09PSBvbGRDaGlsZCAmJiByZW1vdmluZ0ZpcnN0KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaWYgKHJlbW92aW5nRmlyc3QgJiYgIW5ld0NoaWxkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIGVkaXRhYmxlID0gZWRpdGFibGVWTm9kZSh0aGlzLCBvd25lcklEKTtcbiAgaWYgKCFyZW1vdmluZ0ZpcnN0KSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG9yaWdpbkluZGV4OyBpaSsrKSB7XG4gICAgICBlZGl0YWJsZS5hcnJheVtpaV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIGlmIChuZXdDaGlsZCkge1xuICAgIGVkaXRhYmxlLmFycmF5W29yaWdpbkluZGV4XSA9IG5ld0NoaWxkO1xuICB9XG4gIHJldHVybiBlZGl0YWJsZTtcbn07XG5cblZOb2RlLnByb3RvdHlwZS5yZW1vdmVBZnRlciA9IGZ1bmN0aW9uIHJlbW92ZUFmdGVyIChvd25lcklELCBsZXZlbCwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSAobGV2ZWwgPyAxIDw8IGxldmVsIDogMCkgfHwgdGhpcy5hcnJheS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgc2l6ZUluZGV4ID0gKChpbmRleCAtIDEpID4+PiBsZXZlbCkgJiBNQVNLO1xuICBpZiAoc2l6ZUluZGV4ID49IHRoaXMuYXJyYXkubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbmV3Q2hpbGQ7XG4gIGlmIChsZXZlbCA+IDApIHtcbiAgICB2YXIgb2xkQ2hpbGQgPSB0aGlzLmFycmF5W3NpemVJbmRleF07XG4gICAgbmV3Q2hpbGQgPVxuICAgICAgb2xkQ2hpbGQgJiYgb2xkQ2hpbGQucmVtb3ZlQWZ0ZXIob3duZXJJRCwgbGV2ZWwgLSBTSElGVCwgaW5kZXgpO1xuICAgIGlmIChuZXdDaGlsZCA9PT0gb2xkQ2hpbGQgJiYgc2l6ZUluZGV4ID09PSB0aGlzLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBlZGl0YWJsZSA9IGVkaXRhYmxlVk5vZGUodGhpcywgb3duZXJJRCk7XG4gIGVkaXRhYmxlLmFycmF5LnNwbGljZShzaXplSW5kZXggKyAxKTtcbiAgaWYgKG5ld0NoaWxkKSB7XG4gICAgZWRpdGFibGUuYXJyYXlbc2l6ZUluZGV4XSA9IG5ld0NoaWxkO1xuICB9XG4gIHJldHVybiBlZGl0YWJsZTtcbn07XG5cbnZhciBET05FID0ge307XG5cbmZ1bmN0aW9uIGl0ZXJhdGVMaXN0KGxpc3QsIHJldmVyc2UpIHtcbiAgdmFyIGxlZnQgPSBsaXN0Ll9vcmlnaW47XG4gIHZhciByaWdodCA9IGxpc3QuX2NhcGFjaXR5O1xuICB2YXIgdGFpbFBvcyA9IGdldFRhaWxPZmZzZXQocmlnaHQpO1xuICB2YXIgdGFpbCA9IGxpc3QuX3RhaWw7XG5cbiAgcmV0dXJuIGl0ZXJhdGVOb2RlT3JMZWFmKGxpc3QuX3Jvb3QsIGxpc3QuX2xldmVsLCAwKTtcblxuICBmdW5jdGlvbiBpdGVyYXRlTm9kZU9yTGVhZihub2RlLCBsZXZlbCwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIGxldmVsID09PSAwXG4gICAgICA/IGl0ZXJhdGVMZWFmKG5vZGUsIG9mZnNldClcbiAgICAgIDogaXRlcmF0ZU5vZGUobm9kZSwgbGV2ZWwsIG9mZnNldCk7XG4gIH1cblxuICBmdW5jdGlvbiBpdGVyYXRlTGVhZihub2RlLCBvZmZzZXQpIHtcbiAgICB2YXIgYXJyYXkgPSBvZmZzZXQgPT09IHRhaWxQb3MgPyB0YWlsICYmIHRhaWwuYXJyYXkgOiBub2RlICYmIG5vZGUuYXJyYXk7XG4gICAgdmFyIGZyb20gPSBvZmZzZXQgPiBsZWZ0ID8gMCA6IGxlZnQgLSBvZmZzZXQ7XG4gICAgdmFyIHRvID0gcmlnaHQgLSBvZmZzZXQ7XG4gICAgaWYgKHRvID4gU0laRSkge1xuICAgICAgdG8gPSBTSVpFO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZyb20gPT09IHRvKSB7XG4gICAgICAgIHJldHVybiBET05FO1xuICAgICAgfVxuICAgICAgdmFyIGlkeCA9IHJldmVyc2UgPyAtLXRvIDogZnJvbSsrO1xuICAgICAgcmV0dXJuIGFycmF5ICYmIGFycmF5W2lkeF07XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGl0ZXJhdGVOb2RlKG5vZGUsIGxldmVsLCBvZmZzZXQpIHtcbiAgICB2YXIgdmFsdWVzO1xuICAgIHZhciBhcnJheSA9IG5vZGUgJiYgbm9kZS5hcnJheTtcbiAgICB2YXIgZnJvbSA9IG9mZnNldCA+IGxlZnQgPyAwIDogKGxlZnQgLSBvZmZzZXQpID4+IGxldmVsO1xuICAgIHZhciB0byA9ICgocmlnaHQgLSBvZmZzZXQpID4+IGxldmVsKSArIDE7XG4gICAgaWYgKHRvID4gU0laRSkge1xuICAgICAgdG8gPSBTSVpFO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlcygpO1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gRE9ORSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tID09PSB0bykge1xuICAgICAgICAgIHJldHVybiBET05FO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZHggPSByZXZlcnNlID8gLS10byA6IGZyb20rKztcbiAgICAgICAgdmFsdWVzID0gaXRlcmF0ZU5vZGVPckxlYWYoXG4gICAgICAgICAgYXJyYXkgJiYgYXJyYXlbaWR4XSxcbiAgICAgICAgICBsZXZlbCAtIFNISUZULFxuICAgICAgICAgIG9mZnNldCArIChpZHggPDwgbGV2ZWwpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlTGlzdChvcmlnaW4sIGNhcGFjaXR5LCBsZXZlbCwgcm9vdCwgdGFpbCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgbGlzdCA9IE9iamVjdC5jcmVhdGUoTGlzdFByb3RvdHlwZSk7XG4gIGxpc3Quc2l6ZSA9IGNhcGFjaXR5IC0gb3JpZ2luO1xuICBsaXN0Ll9vcmlnaW4gPSBvcmlnaW47XG4gIGxpc3QuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gIGxpc3QuX2xldmVsID0gbGV2ZWw7XG4gIGxpc3QuX3Jvb3QgPSByb290O1xuICBsaXN0Ll90YWlsID0gdGFpbDtcbiAgbGlzdC5fX293bmVySUQgPSBvd25lcklEO1xuICBsaXN0Ll9faGFzaCA9IGhhc2g7XG4gIGxpc3QuX19hbHRlcmVkID0gZmFsc2U7XG4gIHJldHVybiBsaXN0O1xufVxuXG52YXIgRU1QVFlfTElTVDtcbmZ1bmN0aW9uIGVtcHR5TGlzdCgpIHtcbiAgcmV0dXJuIEVNUFRZX0xJU1QgfHwgKEVNUFRZX0xJU1QgPSBtYWtlTGlzdCgwLCAwLCBTSElGVCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0KGxpc3QsIGluZGV4LCB2YWx1ZSkge1xuICBpbmRleCA9IHdyYXBJbmRleChsaXN0LCBpbmRleCk7XG5cbiAgaWYgKGluZGV4ICE9PSBpbmRleCkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgaWYgKGluZGV4ID49IGxpc3Quc2l6ZSB8fCBpbmRleCA8IDApIHtcbiAgICByZXR1cm4gbGlzdC53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBpbmRleCA8IDBcbiAgICAgICAgPyBzZXRMaXN0Qm91bmRzKGxpc3QsIGluZGV4KS5zZXQoMCwgdmFsdWUpXG4gICAgICAgIDogc2V0TGlzdEJvdW5kcyhsaXN0LCAwLCBpbmRleCArIDEpLnNldChpbmRleCwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5kZXggKz0gbGlzdC5fb3JpZ2luO1xuXG4gIHZhciBuZXdUYWlsID0gbGlzdC5fdGFpbDtcbiAgdmFyIG5ld1Jvb3QgPSBsaXN0Ll9yb290O1xuICB2YXIgZGlkQWx0ZXIgPSBNYWtlUmVmKCk7XG4gIGlmIChpbmRleCA+PSBnZXRUYWlsT2Zmc2V0KGxpc3QuX2NhcGFjaXR5KSkge1xuICAgIG5ld1RhaWwgPSB1cGRhdGVWTm9kZShuZXdUYWlsLCBsaXN0Ll9fb3duZXJJRCwgMCwgaW5kZXgsIHZhbHVlLCBkaWRBbHRlcik7XG4gIH0gZWxzZSB7XG4gICAgbmV3Um9vdCA9IHVwZGF0ZVZOb2RlKFxuICAgICAgbmV3Um9vdCxcbiAgICAgIGxpc3QuX19vd25lcklELFxuICAgICAgbGlzdC5fbGV2ZWwsXG4gICAgICBpbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICB9XG5cbiAgaWYgKCFkaWRBbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgaWYgKGxpc3QuX19vd25lcklEKSB7XG4gICAgbGlzdC5fcm9vdCA9IG5ld1Jvb3Q7XG4gICAgbGlzdC5fdGFpbCA9IG5ld1RhaWw7XG4gICAgbGlzdC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgbGlzdC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIHJldHVybiBtYWtlTGlzdChsaXN0Ll9vcmlnaW4sIGxpc3QuX2NhcGFjaXR5LCBsaXN0Ll9sZXZlbCwgbmV3Um9vdCwgbmV3VGFpbCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZOb2RlKG5vZGUsIG93bmVySUQsIGxldmVsLCBpbmRleCwgdmFsdWUsIGRpZEFsdGVyKSB7XG4gIHZhciBpZHggPSAoaW5kZXggPj4+IGxldmVsKSAmIE1BU0s7XG4gIHZhciBub2RlSGFzID0gbm9kZSAmJiBpZHggPCBub2RlLmFycmF5Lmxlbmd0aDtcbiAgaWYgKCFub2RlSGFzICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZhciBuZXdOb2RlO1xuXG4gIGlmIChsZXZlbCA+IDApIHtcbiAgICB2YXIgbG93ZXJOb2RlID0gbm9kZSAmJiBub2RlLmFycmF5W2lkeF07XG4gICAgdmFyIG5ld0xvd2VyTm9kZSA9IHVwZGF0ZVZOb2RlKFxuICAgICAgbG93ZXJOb2RlLFxuICAgICAgb3duZXJJRCxcbiAgICAgIGxldmVsIC0gU0hJRlQsXG4gICAgICBpbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICAgIGlmIChuZXdMb3dlck5vZGUgPT09IGxvd2VyTm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIG5ld05vZGUgPSBlZGl0YWJsZVZOb2RlKG5vZGUsIG93bmVySUQpO1xuICAgIG5ld05vZGUuYXJyYXlbaWR4XSA9IG5ld0xvd2VyTm9kZTtcbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfVxuXG4gIGlmIChub2RlSGFzICYmIG5vZGUuYXJyYXlbaWR4XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGlmIChkaWRBbHRlcikge1xuICAgIFNldFJlZihkaWRBbHRlcik7XG4gIH1cblxuICBuZXdOb2RlID0gZWRpdGFibGVWTm9kZShub2RlLCBvd25lcklEKTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgaWR4ID09PSBuZXdOb2RlLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICBuZXdOb2RlLmFycmF5LnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIG5ld05vZGUuYXJyYXlbaWR4XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG5mdW5jdGlvbiBlZGl0YWJsZVZOb2RlKG5vZGUsIG93bmVySUQpIHtcbiAgaWYgKG93bmVySUQgJiYgbm9kZSAmJiBvd25lcklEID09PSBub2RlLm93bmVySUQpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICByZXR1cm4gbmV3IFZOb2RlKG5vZGUgPyBub2RlLmFycmF5LnNsaWNlKCkgOiBbXSwgb3duZXJJRCk7XG59XG5cbmZ1bmN0aW9uIGxpc3ROb2RlRm9yKGxpc3QsIHJhd0luZGV4KSB7XG4gIGlmIChyYXdJbmRleCA+PSBnZXRUYWlsT2Zmc2V0KGxpc3QuX2NhcGFjaXR5KSkge1xuICAgIHJldHVybiBsaXN0Ll90YWlsO1xuICB9XG4gIGlmIChyYXdJbmRleCA8IDEgPDwgKGxpc3QuX2xldmVsICsgU0hJRlQpKSB7XG4gICAgdmFyIG5vZGUgPSBsaXN0Ll9yb290O1xuICAgIHZhciBsZXZlbCA9IGxpc3QuX2xldmVsO1xuICAgIHdoaWxlIChub2RlICYmIGxldmVsID4gMCkge1xuICAgICAgbm9kZSA9IG5vZGUuYXJyYXlbKHJhd0luZGV4ID4+PiBsZXZlbCkgJiBNQVNLXTtcbiAgICAgIGxldmVsIC09IFNISUZUO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRMaXN0Qm91bmRzKGxpc3QsIGJlZ2luLCBlbmQpIHtcbiAgLy8gU2FuaXRpemUgYmVnaW4gJiBlbmQgdXNpbmcgdGhpcyBzaG9ydGhhbmQgZm9yIFRvSW50MzIoYXJndW1lbnQpXG4gIC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2ludDMyXG4gIGlmIChiZWdpbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYmVnaW4gfD0gMDtcbiAgfVxuICBpZiAoZW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgfD0gMDtcbiAgfVxuICB2YXIgb3duZXIgPSBsaXN0Ll9fb3duZXJJRCB8fCBuZXcgT3duZXJJRCgpO1xuICB2YXIgb2xkT3JpZ2luID0gbGlzdC5fb3JpZ2luO1xuICB2YXIgb2xkQ2FwYWNpdHkgPSBsaXN0Ll9jYXBhY2l0eTtcbiAgdmFyIG5ld09yaWdpbiA9IG9sZE9yaWdpbiArIGJlZ2luO1xuICB2YXIgbmV3Q2FwYWNpdHkgPVxuICAgIGVuZCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IG9sZENhcGFjaXR5XG4gICAgICA6IGVuZCA8IDBcbiAgICAgID8gb2xkQ2FwYWNpdHkgKyBlbmRcbiAgICAgIDogb2xkT3JpZ2luICsgZW5kO1xuICBpZiAobmV3T3JpZ2luID09PSBvbGRPcmlnaW4gJiYgbmV3Q2FwYWNpdHkgPT09IG9sZENhcGFjaXR5KSB7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICAvLyBJZiBpdCdzIGdvaW5nIHRvIGVuZCBhZnRlciBpdCBzdGFydHMsIGl0J3MgZW1wdHkuXG4gIGlmIChuZXdPcmlnaW4gPj0gbmV3Q2FwYWNpdHkpIHtcbiAgICByZXR1cm4gbGlzdC5jbGVhcigpO1xuICB9XG5cbiAgdmFyIG5ld0xldmVsID0gbGlzdC5fbGV2ZWw7XG4gIHZhciBuZXdSb290ID0gbGlzdC5fcm9vdDtcblxuICAvLyBOZXcgb3JpZ2luIG1pZ2h0IG5lZWQgY3JlYXRpbmcgYSBoaWdoZXIgcm9vdC5cbiAgdmFyIG9mZnNldFNoaWZ0ID0gMDtcbiAgd2hpbGUgKG5ld09yaWdpbiArIG9mZnNldFNoaWZ0IDwgMCkge1xuICAgIG5ld1Jvb3QgPSBuZXcgVk5vZGUoXG4gICAgICBuZXdSb290ICYmIG5ld1Jvb3QuYXJyYXkubGVuZ3RoID8gW3VuZGVmaW5lZCwgbmV3Um9vdF0gOiBbXSxcbiAgICAgIG93bmVyXG4gICAgKTtcbiAgICBuZXdMZXZlbCArPSBTSElGVDtcbiAgICBvZmZzZXRTaGlmdCArPSAxIDw8IG5ld0xldmVsO1xuICB9XG4gIGlmIChvZmZzZXRTaGlmdCkge1xuICAgIG5ld09yaWdpbiArPSBvZmZzZXRTaGlmdDtcbiAgICBvbGRPcmlnaW4gKz0gb2Zmc2V0U2hpZnQ7XG4gICAgbmV3Q2FwYWNpdHkgKz0gb2Zmc2V0U2hpZnQ7XG4gICAgb2xkQ2FwYWNpdHkgKz0gb2Zmc2V0U2hpZnQ7XG4gIH1cblxuICB2YXIgb2xkVGFpbE9mZnNldCA9IGdldFRhaWxPZmZzZXQob2xkQ2FwYWNpdHkpO1xuICB2YXIgbmV3VGFpbE9mZnNldCA9IGdldFRhaWxPZmZzZXQobmV3Q2FwYWNpdHkpO1xuXG4gIC8vIE5ldyBzaXplIG1pZ2h0IG5lZWQgY3JlYXRpbmcgYSBoaWdoZXIgcm9vdC5cbiAgd2hpbGUgKG5ld1RhaWxPZmZzZXQgPj0gMSA8PCAobmV3TGV2ZWwgKyBTSElGVCkpIHtcbiAgICBuZXdSb290ID0gbmV3IFZOb2RlKFxuICAgICAgbmV3Um9vdCAmJiBuZXdSb290LmFycmF5Lmxlbmd0aCA/IFtuZXdSb290XSA6IFtdLFxuICAgICAgb3duZXJcbiAgICApO1xuICAgIG5ld0xldmVsICs9IFNISUZUO1xuICB9XG5cbiAgLy8gTG9jYXRlIG9yIGNyZWF0ZSB0aGUgbmV3IHRhaWwuXG4gIHZhciBvbGRUYWlsID0gbGlzdC5fdGFpbDtcbiAgdmFyIG5ld1RhaWwgPVxuICAgIG5ld1RhaWxPZmZzZXQgPCBvbGRUYWlsT2Zmc2V0XG4gICAgICA/IGxpc3ROb2RlRm9yKGxpc3QsIG5ld0NhcGFjaXR5IC0gMSlcbiAgICAgIDogbmV3VGFpbE9mZnNldCA+IG9sZFRhaWxPZmZzZXRcbiAgICAgID8gbmV3IFZOb2RlKFtdLCBvd25lcilcbiAgICAgIDogb2xkVGFpbDtcblxuICAvLyBNZXJnZSBUYWlsIGludG8gdHJlZS5cbiAgaWYgKFxuICAgIG9sZFRhaWwgJiZcbiAgICBuZXdUYWlsT2Zmc2V0ID4gb2xkVGFpbE9mZnNldCAmJlxuICAgIG5ld09yaWdpbiA8IG9sZENhcGFjaXR5ICYmXG4gICAgb2xkVGFpbC5hcnJheS5sZW5ndGhcbiAgKSB7XG4gICAgbmV3Um9vdCA9IGVkaXRhYmxlVk5vZGUobmV3Um9vdCwgb3duZXIpO1xuICAgIHZhciBub2RlID0gbmV3Um9vdDtcbiAgICBmb3IgKHZhciBsZXZlbCA9IG5ld0xldmVsOyBsZXZlbCA+IFNISUZUOyBsZXZlbCAtPSBTSElGVCkge1xuICAgICAgdmFyIGlkeCA9IChvbGRUYWlsT2Zmc2V0ID4+PiBsZXZlbCkgJiBNQVNLO1xuICAgICAgbm9kZSA9IG5vZGUuYXJyYXlbaWR4XSA9IGVkaXRhYmxlVk5vZGUobm9kZS5hcnJheVtpZHhdLCBvd25lcik7XG4gICAgfVxuICAgIG5vZGUuYXJyYXlbKG9sZFRhaWxPZmZzZXQgPj4+IFNISUZUKSAmIE1BU0tdID0gb2xkVGFpbDtcbiAgfVxuXG4gIC8vIElmIHRoZSBzaXplIGhhcyBiZWVuIHJlZHVjZWQsIHRoZXJlJ3MgYSBjaGFuY2UgdGhlIHRhaWwgbmVlZHMgdG8gYmUgdHJpbW1lZC5cbiAgaWYgKG5ld0NhcGFjaXR5IDwgb2xkQ2FwYWNpdHkpIHtcbiAgICBuZXdUYWlsID0gbmV3VGFpbCAmJiBuZXdUYWlsLnJlbW92ZUFmdGVyKG93bmVyLCAwLCBuZXdDYXBhY2l0eSk7XG4gIH1cblxuICAvLyBJZiB0aGUgbmV3IG9yaWdpbiBpcyB3aXRoaW4gdGhlIHRhaWwsIHRoZW4gd2UgZG8gbm90IG5lZWQgYSByb290LlxuICBpZiAobmV3T3JpZ2luID49IG5ld1RhaWxPZmZzZXQpIHtcbiAgICBuZXdPcmlnaW4gLT0gbmV3VGFpbE9mZnNldDtcbiAgICBuZXdDYXBhY2l0eSAtPSBuZXdUYWlsT2Zmc2V0O1xuICAgIG5ld0xldmVsID0gU0hJRlQ7XG4gICAgbmV3Um9vdCA9IG51bGw7XG4gICAgbmV3VGFpbCA9IG5ld1RhaWwgJiYgbmV3VGFpbC5yZW1vdmVCZWZvcmUob3duZXIsIDAsIG5ld09yaWdpbik7XG5cbiAgICAvLyBPdGhlcndpc2UsIGlmIHRoZSByb290IGhhcyBiZWVuIHRyaW1tZWQsIGdhcmJhZ2UgY29sbGVjdC5cbiAgfSBlbHNlIGlmIChuZXdPcmlnaW4gPiBvbGRPcmlnaW4gfHwgbmV3VGFpbE9mZnNldCA8IG9sZFRhaWxPZmZzZXQpIHtcbiAgICBvZmZzZXRTaGlmdCA9IDA7XG5cbiAgICAvLyBJZGVudGlmeSB0aGUgbmV3IHRvcCByb290IG5vZGUgb2YgdGhlIHN1YnRyZWUgb2YgdGhlIG9sZCByb290LlxuICAgIHdoaWxlIChuZXdSb290KSB7XG4gICAgICB2YXIgYmVnaW5JbmRleCA9IChuZXdPcmlnaW4gPj4+IG5ld0xldmVsKSAmIE1BU0s7XG4gICAgICBpZiAoKGJlZ2luSW5kZXggIT09IG5ld1RhaWxPZmZzZXQgPj4+IG5ld0xldmVsKSAmIE1BU0spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoYmVnaW5JbmRleCkge1xuICAgICAgICBvZmZzZXRTaGlmdCArPSAoMSA8PCBuZXdMZXZlbCkgKiBiZWdpbkluZGV4O1xuICAgICAgfVxuICAgICAgbmV3TGV2ZWwgLT0gU0hJRlQ7XG4gICAgICBuZXdSb290ID0gbmV3Um9vdC5hcnJheVtiZWdpbkluZGV4XTtcbiAgICB9XG5cbiAgICAvLyBUcmltIHRoZSBuZXcgc2lkZXMgb2YgdGhlIG5ldyByb290LlxuICAgIGlmIChuZXdSb290ICYmIG5ld09yaWdpbiA+IG9sZE9yaWdpbikge1xuICAgICAgbmV3Um9vdCA9IG5ld1Jvb3QucmVtb3ZlQmVmb3JlKG93bmVyLCBuZXdMZXZlbCwgbmV3T3JpZ2luIC0gb2Zmc2V0U2hpZnQpO1xuICAgIH1cbiAgICBpZiAobmV3Um9vdCAmJiBuZXdUYWlsT2Zmc2V0IDwgb2xkVGFpbE9mZnNldCkge1xuICAgICAgbmV3Um9vdCA9IG5ld1Jvb3QucmVtb3ZlQWZ0ZXIoXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXdMZXZlbCxcbiAgICAgICAgbmV3VGFpbE9mZnNldCAtIG9mZnNldFNoaWZ0XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAob2Zmc2V0U2hpZnQpIHtcbiAgICAgIG5ld09yaWdpbiAtPSBvZmZzZXRTaGlmdDtcbiAgICAgIG5ld0NhcGFjaXR5IC09IG9mZnNldFNoaWZ0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChsaXN0Ll9fb3duZXJJRCkge1xuICAgIGxpc3Quc2l6ZSA9IG5ld0NhcGFjaXR5IC0gbmV3T3JpZ2luO1xuICAgIGxpc3QuX29yaWdpbiA9IG5ld09yaWdpbjtcbiAgICBsaXN0Ll9jYXBhY2l0eSA9IG5ld0NhcGFjaXR5O1xuICAgIGxpc3QuX2xldmVsID0gbmV3TGV2ZWw7XG4gICAgbGlzdC5fcm9vdCA9IG5ld1Jvb3Q7XG4gICAgbGlzdC5fdGFpbCA9IG5ld1RhaWw7XG4gICAgbGlzdC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgbGlzdC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIHJldHVybiBtYWtlTGlzdChuZXdPcmlnaW4sIG5ld0NhcGFjaXR5LCBuZXdMZXZlbCwgbmV3Um9vdCwgbmV3VGFpbCk7XG59XG5cbmZ1bmN0aW9uIGdldFRhaWxPZmZzZXQoc2l6ZSkge1xuICByZXR1cm4gc2l6ZSA8IFNJWkUgPyAwIDogKChzaXplIC0gMSkgPj4+IFNISUZUKSA8PCBTSElGVDtcbn1cblxudmFyIE9yZGVyZWRNYXAgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChNYXApIHtcbiAgZnVuY3Rpb24gT3JkZXJlZE1hcCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5T3JkZXJlZE1hcCgpXG4gICAgICA6IGlzT3JkZXJlZE1hcCh2YWx1ZSlcbiAgICAgID8gdmFsdWVcbiAgICAgIDogZW1wdHlPcmRlcmVkTWFwKCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgdmFyIGl0ZXIgPSBLZXllZENvbGxlY3Rpb24odmFsdWUpO1xuICAgICAgICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBtYXAuc2V0KGssIHYpOyB9KTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBpZiAoIE1hcCApIE9yZGVyZWRNYXAuX19wcm90b19fID0gTWFwO1xuICBPcmRlcmVkTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIE1hcCAmJiBNYXAucHJvdG90eXBlICk7XG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gT3JkZXJlZE1hcDtcblxuICBPcmRlcmVkTWFwLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ09yZGVyZWRNYXAgeycsICd9Jyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGssIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fbWFwLmdldChrKTtcbiAgICByZXR1cm4gaW5kZXggIT09IHVuZGVmaW5lZCA/IHRoaXMuX2xpc3QuZ2V0KGluZGV4KVsxXSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgIHRoaXMuX21hcC5jbGVhcigpO1xuICAgICAgdGhpcy5fbGlzdC5jbGVhcigpO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eU9yZGVyZWRNYXAoKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGssIHYpIHtcbiAgICByZXR1cm4gdXBkYXRlT3JkZXJlZE1hcCh0aGlzLCBrLCB2KTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKGspIHtcbiAgICByZXR1cm4gdXBkYXRlT3JkZXJlZE1hcCh0aGlzLCBrLCBOT1RfU0VUKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9saXN0Ll9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnkgJiYgZm4oZW50cnlbMV0sIGVudHJ5WzBdLCB0aGlzJDEkMSk7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiB0aGlzLl9saXN0LmZyb21FbnRyeVNlcSgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbmV3TWFwID0gdGhpcy5fbWFwLl9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gICAgdmFyIG5ld0xpc3QgPSB0aGlzLl9saXN0Ll9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eU9yZGVyZWRNYXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICB0aGlzLl9saXN0ID0gbmV3TGlzdDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZU9yZGVyZWRNYXAobmV3TWFwLCBuZXdMaXN0LCBvd25lcklELCB0aGlzLl9faGFzaCk7XG4gIH07XG5cbiAgcmV0dXJuIE9yZGVyZWRNYXA7XG59KE1hcCkpO1xuXG5PcmRlcmVkTWFwLmlzT3JkZXJlZE1hcCA9IGlzT3JkZXJlZE1hcDtcblxuT3JkZXJlZE1hcC5wcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcbk9yZGVyZWRNYXAucHJvdG90eXBlW0RFTEVURV0gPSBPcmRlcmVkTWFwLnByb3RvdHlwZS5yZW1vdmU7XG5cbmZ1bmN0aW9uIG1ha2VPcmRlcmVkTWFwKG1hcCwgbGlzdCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgb21hcCA9IE9iamVjdC5jcmVhdGUoT3JkZXJlZE1hcC5wcm90b3R5cGUpO1xuICBvbWFwLnNpemUgPSBtYXAgPyBtYXAuc2l6ZSA6IDA7XG4gIG9tYXAuX21hcCA9IG1hcDtcbiAgb21hcC5fbGlzdCA9IGxpc3Q7XG4gIG9tYXAuX19vd25lcklEID0gb3duZXJJRDtcbiAgb21hcC5fX2hhc2ggPSBoYXNoO1xuICBvbWFwLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICByZXR1cm4gb21hcDtcbn1cblxudmFyIEVNUFRZX09SREVSRURfTUFQO1xuZnVuY3Rpb24gZW1wdHlPcmRlcmVkTWFwKCkge1xuICByZXR1cm4gKFxuICAgIEVNUFRZX09SREVSRURfTUFQIHx8XG4gICAgKEVNUFRZX09SREVSRURfTUFQID0gbWFrZU9yZGVyZWRNYXAoZW1wdHlNYXAoKSwgZW1wdHlMaXN0KCkpKVxuICApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVPcmRlcmVkTWFwKG9tYXAsIGssIHYpIHtcbiAgdmFyIG1hcCA9IG9tYXAuX21hcDtcbiAgdmFyIGxpc3QgPSBvbWFwLl9saXN0O1xuICB2YXIgaSA9IG1hcC5nZXQoayk7XG4gIHZhciBoYXMgPSBpICE9PSB1bmRlZmluZWQ7XG4gIHZhciBuZXdNYXA7XG4gIHZhciBuZXdMaXN0O1xuICBpZiAodiA9PT0gTk9UX1NFVCkge1xuICAgIC8vIHJlbW92ZWRcbiAgICBpZiAoIWhhcykge1xuICAgICAgcmV0dXJuIG9tYXA7XG4gICAgfVxuICAgIGlmIChsaXN0LnNpemUgPj0gU0laRSAmJiBsaXN0LnNpemUgPj0gbWFwLnNpemUgKiAyKSB7XG4gICAgICBuZXdMaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5LCBpZHgpIHsgcmV0dXJuIGVudHJ5ICE9PSB1bmRlZmluZWQgJiYgaSAhPT0gaWR4OyB9KTtcbiAgICAgIG5ld01hcCA9IG5ld0xpc3RcbiAgICAgICAgLnRvS2V5ZWRTZXEoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMF07IH0pXG4gICAgICAgIC5mbGlwKClcbiAgICAgICAgLnRvTWFwKCk7XG4gICAgICBpZiAob21hcC5fX293bmVySUQpIHtcbiAgICAgICAgbmV3TWFwLl9fb3duZXJJRCA9IG5ld0xpc3QuX19vd25lcklEID0gb21hcC5fX293bmVySUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld01hcCA9IG1hcC5yZW1vdmUoayk7XG4gICAgICBuZXdMaXN0ID0gaSA9PT0gbGlzdC5zaXplIC0gMSA/IGxpc3QucG9wKCkgOiBsaXN0LnNldChpLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChoYXMpIHtcbiAgICBpZiAodiA9PT0gbGlzdC5nZXQoaSlbMV0pIHtcbiAgICAgIHJldHVybiBvbWFwO1xuICAgIH1cbiAgICBuZXdNYXAgPSBtYXA7XG4gICAgbmV3TGlzdCA9IGxpc3Quc2V0KGksIFtrLCB2XSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3TWFwID0gbWFwLnNldChrLCBsaXN0LnNpemUpO1xuICAgIG5ld0xpc3QgPSBsaXN0LnNldChsaXN0LnNpemUsIFtrLCB2XSk7XG4gIH1cbiAgaWYgKG9tYXAuX19vd25lcklEKSB7XG4gICAgb21hcC5zaXplID0gbmV3TWFwLnNpemU7XG4gICAgb21hcC5fbWFwID0gbmV3TWFwO1xuICAgIG9tYXAuX2xpc3QgPSBuZXdMaXN0O1xuICAgIG9tYXAuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIG9tYXAuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gb21hcDtcbiAgfVxuICByZXR1cm4gbWFrZU9yZGVyZWRNYXAobmV3TWFwLCBuZXdMaXN0KTtcbn1cblxudmFyIElTX1NUQUNLX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NUQUNLX19AQCc7XG5cbmZ1bmN0aW9uIGlzU3RhY2sobWF5YmVTdGFjaykge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVN0YWNrICYmIG1heWJlU3RhY2tbSVNfU1RBQ0tfU1lNQk9MXSk7XG59XG5cbnZhciBTdGFjayA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIFN0YWNrKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTdGFjaygpXG4gICAgICA6IGlzU3RhY2sodmFsdWUpXG4gICAgICA/IHZhbHVlXG4gICAgICA6IGVtcHR5U3RhY2soKS5wdXNoQWxsKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZENvbGxlY3Rpb24gKSBTdGFjay5fX3Byb3RvX18gPSBJbmRleGVkQ29sbGVjdGlvbjtcbiAgU3RhY2sucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZENvbGxlY3Rpb24gJiYgSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIFN0YWNrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0YWNrO1xuXG4gIFN0YWNrLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTdGFjayBbJywgJ10nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIFN0YWNrLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgd2hpbGUgKGhlYWQgJiYgaW5kZXgtLSkge1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWQgPyBoZWFkLnZhbHVlIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiBwZWVrICgpIHtcbiAgICByZXR1cm4gdGhpcy5faGVhZCAmJiB0aGlzLl9oZWFkLnZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgU3RhY2sucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICgvKi4uLnZhbHVlcyovKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbmV3U2l6ZSA9IHRoaXMuc2l6ZSArIGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICAgIGZvciAodmFyIGlpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGlpID49IDA7IGlpLS0pIHtcbiAgICAgIGhlYWQgPSB7XG4gICAgICAgIHZhbHVlOiBhcmd1bWVudHMkMVtpaV0sXG4gICAgICAgIG5leHQ6IGhlYWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sobmV3U2l6ZSwgaGVhZCk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnB1c2hBbGwgPSBmdW5jdGlvbiBwdXNoQWxsIChpdGVyKSB7XG4gICAgaXRlciA9IEluZGV4ZWRDb2xsZWN0aW9uKGl0ZXIpO1xuICAgIGlmIChpdGVyLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID09PSAwICYmIGlzU3RhY2soaXRlcikpIHtcbiAgICAgIHJldHVybiBpdGVyO1xuICAgIH1cbiAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgIHZhciBuZXdTaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICBpdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIG5ld1NpemUrKztcbiAgICAgIGhlYWQgPSB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmV4dDogaGVhZCxcbiAgICAgIH07XG4gICAgfSwgLyogcmV2ZXJzZSAqLyB0cnVlKTtcbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sobmV3U2l6ZSwgaGVhZCk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uIHBvcCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMSk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICB0aGlzLl9oZWFkID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5U3RhY2soKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoYmVnaW4sIGVuZCkge1xuICAgIGlmICh3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHRoaXMuc2l6ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgcmVzb2x2ZWRCZWdpbiA9IHJlc29sdmVCZWdpbihiZWdpbiwgdGhpcy5zaXplKTtcbiAgICB2YXIgcmVzb2x2ZWRFbmQgPSByZXNvbHZlRW5kKGVuZCwgdGhpcy5zaXplKTtcbiAgICBpZiAocmVzb2x2ZWRFbmQgIT09IHRoaXMuc2l6ZSkge1xuICAgICAgLy8gc3VwZXIuc2xpY2UoYmVnaW4sIGVuZCk7XG4gICAgICByZXR1cm4gSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XG4gICAgfVxuICAgIHZhciBuZXdTaXplID0gdGhpcy5zaXplIC0gcmVzb2x2ZWRCZWdpbjtcbiAgICB2YXIgaGVhZCA9IHRoaXMuX2hlYWQ7XG4gICAgd2hpbGUgKHJlc29sdmVkQmVnaW4tLSkge1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSBuZXdTaXplO1xuICAgICAgdGhpcy5faGVhZCA9IGhlYWQ7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKG5ld1NpemUsIGhlYWQpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTXV0YWJpbGl0eVxuXG4gIFN0YWNrLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlTdGFjaygpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKHRoaXMuc2l6ZSwgdGhpcy5faGVhZCwgb3duZXJJRCwgdGhpcy5fX2hhc2gpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgSXRlcmF0aW9uXG5cbiAgU3RhY2sucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEodGhpcy50b0FycmF5KCkpLl9faXRlcmF0ZShcbiAgICAgICAgZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKHYsIGssIHRoaXMkMSQxKTsgfSxcbiAgICAgICAgcmV2ZXJzZVxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKGZuKG5vZGUudmFsdWUsIGl0ZXJhdGlvbnMrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEodGhpcy50b0FycmF5KCkpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3RhY2s7XG59KEluZGV4ZWRDb2xsZWN0aW9uKSk7XG5cblN0YWNrLmlzU3RhY2sgPSBpc1N0YWNrO1xuXG52YXIgU3RhY2tQcm90b3R5cGUgPSBTdGFjay5wcm90b3R5cGU7XG5TdGFja1Byb3RvdHlwZVtJU19TVEFDS19TWU1CT0xdID0gdHJ1ZTtcblN0YWNrUHJvdG90eXBlLnNoaWZ0ID0gU3RhY2tQcm90b3R5cGUucG9wO1xuU3RhY2tQcm90b3R5cGUudW5zaGlmdCA9IFN0YWNrUHJvdG90eXBlLnB1c2g7XG5TdGFja1Byb3RvdHlwZS51bnNoaWZ0QWxsID0gU3RhY2tQcm90b3R5cGUucHVzaEFsbDtcblN0YWNrUHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuU3RhY2tQcm90b3R5cGUud2FzQWx0ZXJlZCA9IHdhc0FsdGVyZWQ7XG5TdGFja1Byb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuU3RhY2tQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBTdGFja1Byb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5TdGFja1Byb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LnVuc2hpZnQoYXJyKTtcbn07XG5TdGFja1Byb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG5mdW5jdGlvbiBtYWtlU3RhY2soc2l6ZSwgaGVhZCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShTdGFja1Byb3RvdHlwZSk7XG4gIG1hcC5zaXplID0gc2l6ZTtcbiAgbWFwLl9oZWFkID0gaGVhZDtcbiAgbWFwLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIG1hcC5fX2hhc2ggPSBoYXNoO1xuICBtYXAuX19hbHRlcmVkID0gZmFsc2U7XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBFTVBUWV9TVEFDSztcbmZ1bmN0aW9uIGVtcHR5U3RhY2soKSB7XG4gIHJldHVybiBFTVBUWV9TVEFDSyB8fCAoRU1QVFlfU1RBQ0sgPSBtYWtlU3RhY2soMCkpO1xufVxuXG52YXIgSVNfU0VUX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NFVF9fQEAnO1xuXG5mdW5jdGlvbiBpc1NldChtYXliZVNldCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVNldCAmJiBtYXliZVNldFtJU19TRVRfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzT3JkZXJlZFNldChtYXliZU9yZGVyZWRTZXQpIHtcbiAgcmV0dXJuIGlzU2V0KG1heWJlT3JkZXJlZFNldCkgJiYgaXNPcmRlcmVkKG1heWJlT3JkZXJlZFNldCk7XG59XG5cbmZ1bmN0aW9uIGRlZXBFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgIWlzQ29sbGVjdGlvbihiKSB8fFxuICAgIChhLnNpemUgIT09IHVuZGVmaW5lZCAmJiBiLnNpemUgIT09IHVuZGVmaW5lZCAmJiBhLnNpemUgIT09IGIuc2l6ZSkgfHxcbiAgICAoYS5fX2hhc2ggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgYi5fX2hhc2ggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgYS5fX2hhc2ggIT09IGIuX19oYXNoKSB8fFxuICAgIGlzS2V5ZWQoYSkgIT09IGlzS2V5ZWQoYikgfHxcbiAgICBpc0luZGV4ZWQoYSkgIT09IGlzSW5kZXhlZChiKSB8fFxuICAgIGlzT3JkZXJlZChhKSAhPT0gaXNPcmRlcmVkKGIpXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhLnNpemUgPT09IDAgJiYgYi5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgbm90QXNzb2NpYXRpdmUgPSAhaXNBc3NvY2lhdGl2ZShhKTtcblxuICBpZiAoaXNPcmRlcmVkKGEpKSB7XG4gICAgdmFyIGVudHJpZXMgPSBhLmVudHJpZXMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgYi5ldmVyeShmdW5jdGlvbiAodiwgaykge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGlzKGVudHJ5WzFdLCB2KSAmJiAobm90QXNzb2NpYXRpdmUgfHwgaXMoZW50cnlbMF0sIGspKTtcbiAgICAgIH0pICYmIGVudHJpZXMubmV4dCgpLmRvbmVcbiAgICApO1xuICB9XG5cbiAgdmFyIGZsaXBwZWQgPSBmYWxzZTtcblxuICBpZiAoYS5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYi5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgYS5jYWNoZVJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhLmNhY2hlUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsaXBwZWQgPSB0cnVlO1xuICAgICAgdmFyIF8gPSBhO1xuICAgICAgYSA9IGI7XG4gICAgICBiID0gXztcbiAgICB9XG4gIH1cblxuICB2YXIgYWxsRXF1YWwgPSB0cnVlO1xuICB2YXIgYlNpemUgPSBiLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgIGlmIChcbiAgICAgIG5vdEFzc29jaWF0aXZlXG4gICAgICAgID8gIWEuaGFzKHYpXG4gICAgICAgIDogZmxpcHBlZFxuICAgICAgICA/ICFpcyh2LCBhLmdldChrLCBOT1RfU0VUKSlcbiAgICAgICAgOiAhaXMoYS5nZXQoaywgTk9UX1NFVCksIHYpXG4gICAgKSB7XG4gICAgICBhbGxFcXVhbCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFsbEVxdWFsICYmIGEuc2l6ZSA9PT0gYlNpemU7XG59XG5cbmZ1bmN0aW9uIG1peGluKGN0b3IsIG1ldGhvZHMpIHtcbiAgdmFyIGtleUNvcGllciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBjdG9yLnByb3RvdHlwZVtrZXldID0gbWV0aG9kc1trZXldO1xuICB9O1xuICBPYmplY3Qua2V5cyhtZXRob2RzKS5mb3JFYWNoKGtleUNvcGllcik7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiZcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1ldGhvZHMpLmZvckVhY2goa2V5Q29waWVyKTtcbiAgcmV0dXJuIGN0b3I7XG59XG5cbmZ1bmN0aW9uIHRvSlModmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICghaXNDb2xsZWN0aW9uKHZhbHVlKSkge1xuICAgIGlmICghaXNEYXRhU3RydWN0dXJlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB2YWx1ZSA9IFNlcSh2YWx1ZSk7XG4gIH1cbiAgaWYgKGlzS2V5ZWQodmFsdWUpKSB7XG4gICAgdmFyIHJlc3VsdCQxID0ge307XG4gICAgdmFsdWUuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICByZXN1bHQkMVtrXSA9IHRvSlModik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdCQxO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFsdWUuX19pdGVyYXRlKGZ1bmN0aW9uICh2KSB7XG4gICAgcmVzdWx0LnB1c2godG9KUyh2KSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgU2V0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2V0Q29sbGVjdGlvbikge1xuICBmdW5jdGlvbiBTZXQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNldCgpXG4gICAgICA6IGlzU2V0KHZhbHVlKSAmJiAhaXNPcmRlcmVkKHZhbHVlKVxuICAgICAgPyB2YWx1ZVxuICAgICAgOiBlbXB0eVNldCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgICAgIHZhciBpdGVyID0gU2V0Q29sbGVjdGlvbih2YWx1ZSk7XG4gICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHNldC5hZGQodik7IH0pO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggU2V0Q29sbGVjdGlvbiApIFNldC5fX3Byb3RvX18gPSBTZXRDb2xsZWN0aW9uO1xuICBTZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2V0Q29sbGVjdGlvbiAmJiBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBTZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0O1xuXG4gIFNldC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBTZXQuZnJvbUtleXMgPSBmdW5jdGlvbiBmcm9tS2V5cyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcyhLZXllZENvbGxlY3Rpb24odmFsdWUpLmtleVNlcSgpKTtcbiAgfTtcblxuICBTZXQuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0IChzZXRzKSB7XG4gICAgc2V0cyA9IENvbGxlY3Rpb24oc2V0cykudG9BcnJheSgpO1xuICAgIHJldHVybiBzZXRzLmxlbmd0aFxuICAgICAgPyBTZXRQcm90b3R5cGUuaW50ZXJzZWN0LmFwcGx5KFNldChzZXRzLnBvcCgpKSwgc2V0cylcbiAgICAgIDogZW1wdHlTZXQoKTtcbiAgfTtcblxuICBTZXQudW5pb24gPSBmdW5jdGlvbiB1bmlvbiAoc2V0cykge1xuICAgIHNldHMgPSBDb2xsZWN0aW9uKHNldHMpLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gc2V0cy5sZW5ndGhcbiAgICAgID8gU2V0UHJvdG90eXBlLnVuaW9uLmFwcGx5KFNldChzZXRzLnBvcCgpKSwgc2V0cylcbiAgICAgIDogZW1wdHlTZXQoKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ1NldCB7JywgJ30nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKHZhbHVlKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkICh2YWx1ZSkge1xuICAgIHJldHVybiB1cGRhdGVTZXQodGhpcywgdGhpcy5fbWFwLnNldCh2YWx1ZSwgdmFsdWUpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gdXBkYXRlU2V0KHRoaXMsIHRoaXMuX21hcC5yZW1vdmUodmFsdWUpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHJldHVybiB1cGRhdGVTZXQodGhpcywgdGhpcy5fbWFwLmNsZWFyKCkpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQ29tcG9zaXRpb25cblxuICBTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIC8vIGtlZXAgdHJhY2sgaWYgdGhlIHNldCBpcyBhbHRlcmVkIGJ5IHRoZSBtYXAgZnVuY3Rpb25cbiAgICB2YXIgZGlkQ2hhbmdlcyA9IGZhbHNlO1xuXG4gICAgdmFyIG5ld01hcCA9IHVwZGF0ZVNldChcbiAgICAgIHRoaXMsXG4gICAgICB0aGlzLl9tYXAubWFwRW50cmllcyhmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciB2ID0gcmVmWzFdO1xuXG4gICAgICAgIHZhciBtYXBwZWQgPSBtYXBwZXIuY2FsbChjb250ZXh0LCB2LCB2LCB0aGlzJDEkMSk7XG5cbiAgICAgICAgaWYgKG1hcHBlZCAhPT0gdikge1xuICAgICAgICAgIGRpZENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFttYXBwZWQsIG1hcHBlZF07XG4gICAgICB9LCBjb250ZXh0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZGlkQ2hhbmdlcyA/IG5ld01hcCA6IHRoaXM7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIHVuaW9uICgpIHtcbiAgICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIGl0ZXJzID0gaXRlcnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnNpemUgIT09IDA7IH0pO1xuICAgIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID09PSAwICYmICF0aGlzLl9fb3duZXJJRCAmJiBpdGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKGl0ZXJzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaXRlcnMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIFNldENvbGxlY3Rpb24oaXRlcnNbaWldKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc2V0LmFkZCh2YWx1ZSk7IH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0ICgpIHtcbiAgICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpdGVycyA9IGl0ZXJzLm1hcChmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gU2V0Q29sbGVjdGlvbihpdGVyKTsgfSk7XG4gICAgdmFyIHRvUmVtb3ZlID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKCFpdGVycy5ldmVyeShmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pKSB7XG4gICAgICAgIHRvUmVtb3ZlLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgdG9SZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2V0LnJlbW92ZSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3QgKCkge1xuICAgIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZXJzID0gaXRlcnMubWFwKGZ1bmN0aW9uIChpdGVyKSB7IHJldHVybiBTZXRDb2xsZWN0aW9uKGl0ZXIpOyB9KTtcbiAgICB2YXIgdG9SZW1vdmUgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoaXRlcnMuc29tZShmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pKSB7XG4gICAgICAgIHRvUmVtb3ZlLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgdG9SZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2V0LnJlbW92ZSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiBzb3J0IChjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRTZXQoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvcikpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuc29ydEJ5ID0gZnVuY3Rpb24gc29ydEJ5IChtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICAvLyBMYXRlIGJpbmRpbmdcbiAgICByZXR1cm4gT3JkZXJlZFNldChzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLndhc0FsdGVyZWQgPSBmdW5jdGlvbiB3YXNBbHRlcmVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLndhc0FsdGVyZWQoKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX21hcC5fX2l0ZXJhdGUoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGZuKGssIGssIHRoaXMkMSQxKTsgfSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIG5ld01hcCA9IHRoaXMuX21hcC5fX2Vuc3VyZU93bmVyKG93bmVySUQpO1xuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2VtcHR5KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19tYWtlKG5ld01hcCwgb3duZXJJRCk7XG4gIH07XG5cbiAgcmV0dXJuIFNldDtcbn0oU2V0Q29sbGVjdGlvbikpO1xuXG5TZXQuaXNTZXQgPSBpc1NldDtcblxudmFyIFNldFByb3RvdHlwZSA9IFNldC5wcm90b3R5cGU7XG5TZXRQcm90b3R5cGVbSVNfU0VUX1NZTUJPTF0gPSB0cnVlO1xuU2V0UHJvdG90eXBlW0RFTEVURV0gPSBTZXRQcm90b3R5cGUucmVtb3ZlO1xuU2V0UHJvdG90eXBlLm1lcmdlID0gU2V0UHJvdG90eXBlLmNvbmNhdCA9IFNldFByb3RvdHlwZS51bmlvbjtcblNldFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcblNldFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuU2V0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gU2V0UHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcblNldFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LmFkZChhcnIpO1xufTtcblNldFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG5TZXRQcm90b3R5cGUuX19lbXB0eSA9IGVtcHR5U2V0O1xuU2V0UHJvdG90eXBlLl9fbWFrZSA9IG1ha2VTZXQ7XG5cbmZ1bmN0aW9uIHVwZGF0ZVNldChzZXQsIG5ld01hcCkge1xuICBpZiAoc2V0Ll9fb3duZXJJRCkge1xuICAgIHNldC5zaXplID0gbmV3TWFwLnNpemU7XG4gICAgc2V0Ll9tYXAgPSBuZXdNYXA7XG4gICAgcmV0dXJuIHNldDtcbiAgfVxuICByZXR1cm4gbmV3TWFwID09PSBzZXQuX21hcFxuICAgID8gc2V0XG4gICAgOiBuZXdNYXAuc2l6ZSA9PT0gMFxuICAgID8gc2V0Ll9fZW1wdHkoKVxuICAgIDogc2V0Ll9fbWFrZShuZXdNYXApO1xufVxuXG5mdW5jdGlvbiBtYWtlU2V0KG1hcCwgb3duZXJJRCkge1xuICB2YXIgc2V0ID0gT2JqZWN0LmNyZWF0ZShTZXRQcm90b3R5cGUpO1xuICBzZXQuc2l6ZSA9IG1hcCA/IG1hcC5zaXplIDogMDtcbiAgc2V0Ll9tYXAgPSBtYXA7XG4gIHNldC5fX293bmVySUQgPSBvd25lcklEO1xuICByZXR1cm4gc2V0O1xufVxuXG52YXIgRU1QVFlfU0VUO1xuZnVuY3Rpb24gZW1wdHlTZXQoKSB7XG4gIHJldHVybiBFTVBUWV9TRVQgfHwgKEVNUFRZX1NFVCA9IG1ha2VTZXQoZW1wdHlNYXAoKSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBsYXp5IHNlcSBvZiBudW1zIGZyb20gc3RhcnQgKGluY2x1c2l2ZSkgdG8gZW5kXG4gKiAoZXhjbHVzaXZlKSwgYnkgc3RlcCwgd2hlcmUgc3RhcnQgZGVmYXVsdHMgdG8gMCwgc3RlcCB0byAxLCBhbmQgZW5kIHRvXG4gKiBpbmZpbml0eS4gV2hlbiBzdGFydCBpcyBlcXVhbCB0byBlbmQsIHJldHVybnMgZW1wdHkgbGlzdC5cbiAqL1xudmFyIFJhbmdlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSkge1xuICBmdW5jdGlvbiBSYW5nZShzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydCwgZW5kLCBzdGVwKTtcbiAgICB9XG4gICAgaW52YXJpYW50KHN0ZXAgIT09IDAsICdDYW5ub3Qgc3RlcCBhIFJhbmdlIGJ5IDAnKTtcbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbmQgPSBJbmZpbml0eTtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgPT09IHVuZGVmaW5lZCA/IDEgOiBNYXRoLmFicyhzdGVwKTtcbiAgICBpZiAoZW5kIDwgc3RhcnQpIHtcbiAgICAgIHN0ZXAgPSAtc3RlcDtcbiAgICB9XG4gICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLl9lbmQgPSBlbmQ7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwIC0gMSkgKyAxKTtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICBpZiAoRU1QVFlfUkFOR0UpIHtcbiAgICAgICAgcmV0dXJuIEVNUFRZX1JBTkdFO1xuICAgICAgfVxuICAgICAgRU1QVFlfUkFOR0UgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSApIFJhbmdlLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXE7XG4gIFJhbmdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgUmFuZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmFuZ2U7XG5cbiAgUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAnUmFuZ2UgW10nO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgJ1JhbmdlIFsgJyArXG4gICAgICB0aGlzLl9zdGFydCArXG4gICAgICAnLi4uJyArXG4gICAgICB0aGlzLl9lbmQgK1xuICAgICAgKHRoaXMuX3N0ZXAgIT09IDEgPyAnIGJ5ICcgKyB0aGlzLl9zdGVwIDogJycpICtcbiAgICAgICcgXSdcbiAgICApO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyhpbmRleClcbiAgICAgID8gdGhpcy5fc3RhcnQgKyB3cmFwSW5kZXgodGhpcywgaW5kZXgpICogdGhpcy5fc3RlcFxuICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIgcG9zc2libGVJbmRleCA9IChzZWFyY2hWYWx1ZSAtIHRoaXMuX3N0YXJ0KSAvIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIChcbiAgICAgIHBvc3NpYmxlSW5kZXggPj0gMCAmJlxuICAgICAgcG9zc2libGVJbmRleCA8IHRoaXMuc2l6ZSAmJlxuICAgICAgcG9zc2libGVJbmRleCA9PT0gTWF0aC5mbG9vcihwb3NzaWJsZUluZGV4KVxuICAgICk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGJlZ2luLCBlbmQpIHtcbiAgICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCB0aGlzLnNpemUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYmVnaW4gPSByZXNvbHZlQmVnaW4oYmVnaW4sIHRoaXMuc2l6ZSk7XG4gICAgZW5kID0gcmVzb2x2ZUVuZChlbmQsIHRoaXMuc2l6ZSk7XG4gICAgaWYgKGVuZCA8PSBiZWdpbikge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZSgwLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSYW5nZShcbiAgICAgIHRoaXMuZ2V0KGJlZ2luLCB0aGlzLl9lbmQpLFxuICAgICAgdGhpcy5nZXQoZW5kLCB0aGlzLl9lbmQpLFxuICAgICAgdGhpcy5fc3RlcFxuICAgICk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIHZhciBvZmZzZXRWYWx1ZSA9IHNlYXJjaFZhbHVlIC0gdGhpcy5fc3RhcnQ7XG4gICAgaWYgKG9mZnNldFZhbHVlICUgdGhpcy5fc3RlcCA9PT0gMCkge1xuICAgICAgdmFyIGluZGV4ID0gb2Zmc2V0VmFsdWUgLyB0aGlzLl9zdGVwO1xuICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2hWYWx1ZSk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgc3RlcCA9IHRoaXMuX3N0ZXA7XG4gICAgdmFyIHZhbHVlID0gcmV2ZXJzZSA/IHRoaXMuX3N0YXJ0ICsgKHNpemUgLSAxKSAqIHN0ZXAgOiB0aGlzLl9zdGFydDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgIGlmIChmbih2YWx1ZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhbHVlICs9IHJldmVyc2UgPyAtc3RlcCA6IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBzdGVwID0gdGhpcy5fc3RlcDtcbiAgICB2YXIgdmFsdWUgPSByZXZlcnNlID8gdGhpcy5fc3RhcnQgKyAoc2l6ZSAtIDEpICogc3RlcCA6IHRoaXMuX3N0YXJ0O1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciB2ID0gdmFsdWU7XG4gICAgICB2YWx1ZSArPSByZXZlcnNlID8gLXN0ZXAgOiBzdGVwO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHYpO1xuICAgIH0pO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKG90aGVyKSB7XG4gICAgcmV0dXJuIG90aGVyIGluc3RhbmNlb2YgUmFuZ2VcbiAgICAgID8gdGhpcy5fc3RhcnQgPT09IG90aGVyLl9zdGFydCAmJlxuICAgICAgICAgIHRoaXMuX2VuZCA9PT0gb3RoZXIuX2VuZCAmJlxuICAgICAgICAgIHRoaXMuX3N0ZXAgPT09IG90aGVyLl9zdGVwXG4gICAgICA6IGRlZXBFcXVhbCh0aGlzLCBvdGhlcik7XG4gIH07XG5cbiAgcmV0dXJuIFJhbmdlO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBFTVBUWV9SQU5HRTtcblxuZnVuY3Rpb24gZ2V0SW4kMShjb2xsZWN0aW9uLCBzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSkge1xuICB2YXIga2V5UGF0aCA9IGNvZXJjZUtleVBhdGgoc2VhcmNoS2V5UGF0aCk7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKGkgIT09IGtleVBhdGgubGVuZ3RoKSB7XG4gICAgY29sbGVjdGlvbiA9IGdldChjb2xsZWN0aW9uLCBrZXlQYXRoW2krK10sIE5PVF9TRVQpO1xuICAgIGlmIChjb2xsZWN0aW9uID09PSBOT1RfU0VUKSB7XG4gICAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRJbihzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSkge1xuICByZXR1cm4gZ2V0SW4kMSh0aGlzLCBzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGhhc0luJDEoY29sbGVjdGlvbiwga2V5UGF0aCkge1xuICByZXR1cm4gZ2V0SW4kMShjb2xsZWN0aW9uLCBrZXlQYXRoLCBOT1RfU0VUKSAhPT0gTk9UX1NFVDtcbn1cblxuZnVuY3Rpb24gaGFzSW4oc2VhcmNoS2V5UGF0aCkge1xuICByZXR1cm4gaGFzSW4kMSh0aGlzLCBzZWFyY2hLZXlQYXRoKTtcbn1cblxuZnVuY3Rpb24gdG9PYmplY3QoKSB7XG4gIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gIHZhciBvYmplY3QgPSB7fTtcbiAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICBvYmplY3Rba10gPSB2O1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLy8gTm90ZTogYWxsIG9mIHRoZXNlIG1ldGhvZHMgYXJlIGRlcHJlY2F0ZWQuXG5Db2xsZWN0aW9uLmlzSXRlcmFibGUgPSBpc0NvbGxlY3Rpb247XG5Db2xsZWN0aW9uLmlzS2V5ZWQgPSBpc0tleWVkO1xuQ29sbGVjdGlvbi5pc0luZGV4ZWQgPSBpc0luZGV4ZWQ7XG5Db2xsZWN0aW9uLmlzQXNzb2NpYXRpdmUgPSBpc0Fzc29jaWF0aXZlO1xuQ29sbGVjdGlvbi5pc09yZGVyZWQgPSBpc09yZGVyZWQ7XG5cbkNvbGxlY3Rpb24uSXRlcmF0b3IgPSBJdGVyYXRvcjtcblxubWl4aW4oQ29sbGVjdGlvbiwge1xuICAvLyAjIyMgQ29udmVyc2lvbiB0byBvdGhlciB0eXBlc1xuXG4gIHRvQXJyYXk6IGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgICB2YXIgYXJyYXkgPSBuZXcgQXJyYXkodGhpcy5zaXplIHx8IDApO1xuICAgIHZhciB1c2VUdXBsZXMgPSBpc0tleWVkKHRoaXMpO1xuICAgIHZhciBpID0gMDtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgICAgLy8gS2V5ZWQgY29sbGVjdGlvbnMgcHJvZHVjZSBhbiBhcnJheSBvZiB0dXBsZXMuXG4gICAgICBhcnJheVtpKytdID0gdXNlVHVwbGVzID8gW2ssIHZdIDogdjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG5cbiAgdG9JbmRleGVkU2VxOiBmdW5jdGlvbiB0b0luZGV4ZWRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb0luZGV4ZWRTZXF1ZW5jZSh0aGlzKTtcbiAgfSxcblxuICB0b0pTOiBmdW5jdGlvbiB0b0pTJDEoKSB7XG4gICAgcmV0dXJuIHRvSlModGhpcyk7XG4gIH0sXG5cbiAgdG9LZXllZFNlcTogZnVuY3Rpb24gdG9LZXllZFNlcSgpIHtcbiAgICByZXR1cm4gbmV3IFRvS2V5ZWRTZXF1ZW5jZSh0aGlzLCB0cnVlKTtcbiAgfSxcblxuICB0b01hcDogZnVuY3Rpb24gdG9NYXAoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBNYXAodGhpcy50b0tleWVkU2VxKCkpO1xuICB9LFxuXG4gIHRvT2JqZWN0OiB0b09iamVjdCxcblxuICB0b09yZGVyZWRNYXA6IGZ1bmN0aW9uIHRvT3JkZXJlZE1hcCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIE9yZGVyZWRNYXAodGhpcy50b0tleWVkU2VxKCkpO1xuICB9LFxuXG4gIHRvT3JkZXJlZFNldDogZnVuY3Rpb24gdG9PcmRlcmVkU2V0KCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gT3JkZXJlZFNldChpc0tleWVkKHRoaXMpID8gdGhpcy52YWx1ZVNlcSgpIDogdGhpcyk7XG4gIH0sXG5cbiAgdG9TZXQ6IGZ1bmN0aW9uIHRvU2V0KCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gU2V0KGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICB0b1NldFNlcTogZnVuY3Rpb24gdG9TZXRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb1NldFNlcXVlbmNlKHRoaXMpO1xuICB9LFxuXG4gIHRvU2VxOiBmdW5jdGlvbiB0b1NlcSgpIHtcbiAgICByZXR1cm4gaXNJbmRleGVkKHRoaXMpXG4gICAgICA/IHRoaXMudG9JbmRleGVkU2VxKClcbiAgICAgIDogaXNLZXllZCh0aGlzKVxuICAgICAgPyB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgOiB0aGlzLnRvU2V0U2VxKCk7XG4gIH0sXG5cbiAgdG9TdGFjazogZnVuY3Rpb24gdG9TdGFjaygpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIFN0YWNrKGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICB0b0xpc3Q6IGZ1bmN0aW9uIHRvTGlzdCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIExpc3QoaXNLZXllZCh0aGlzKSA/IHRoaXMudmFsdWVTZXEoKSA6IHRoaXMpO1xuICB9LFxuXG4gIC8vICMjIyBDb21tb24gSmF2YVNjcmlwdCBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnW0NvbGxlY3Rpb25dJztcbiAgfSxcblxuICBfX3RvU3RyaW5nOiBmdW5jdGlvbiBfX3RvU3RyaW5nKGhlYWQsIHRhaWwpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gaGVhZCArIHRhaWw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBoZWFkICtcbiAgICAgICcgJyArXG4gICAgICB0aGlzLnRvU2VxKCkubWFwKHRoaXMuX190b1N0cmluZ01hcHBlcikuam9pbignLCAnKSArXG4gICAgICAnICcgK1xuICAgICAgdGFpbFxuICAgICk7XG4gIH0sXG5cbiAgLy8gIyMjIEVTNiBDb2xsZWN0aW9uIG1ldGhvZHMgKEVTNiBBcnJheSBhbmQgTWFwKVxuXG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgdmFsdWVzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICByZXR1cm4gcmVpZnkodGhpcywgY29uY2F0RmFjdG9yeSh0aGlzLCB2YWx1ZXMpKTtcbiAgfSxcblxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXModmFsdWUsIHNlYXJjaFZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUyk7XG4gIH0sXG5cbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gICAgdmFyIHJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgICAgaWYgKCFwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9LFxuXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmaWx0ZXJGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgdHJ1ZSkpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMV0gOiBub3RTZXRWYWx1ZTtcbiAgfSxcblxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKHNpZGVFZmZlY3QsIGNvbnRleHQpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0ZShjb250ZXh0ID8gc2lkZUVmZmVjdC5iaW5kKGNvbnRleHQpIDogc2lkZUVmZmVjdCk7XG4gIH0sXG5cbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHNlcGFyYXRvciA9IHNlcGFyYXRvciAhPT0gdW5kZWZpbmVkID8gJycgKyBzZXBhcmF0b3IgOiAnLCc7XG4gICAgdmFyIGpvaW5lZCA9ICcnO1xuICAgIHZhciBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodikge1xuICAgICAgaXNGaXJzdCA/IChpc0ZpcnN0ID0gZmFsc2UpIDogKGpvaW5lZCArPSBzZXBhcmF0b3IpO1xuICAgICAgam9pbmVkICs9IHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkID8gdi50b1N0cmluZygpIDogJyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIGpvaW5lZDtcbiAgfSxcblxuICBrZXlzOiBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9LRVlTKTtcbiAgfSxcblxuICBtYXA6IGZ1bmN0aW9uIG1hcChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgbWFwRmFjdG9yeSh0aGlzLCBtYXBwZXIsIGNvbnRleHQpKTtcbiAgfSxcblxuICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZSQxKHJlZHVjZXIsIGluaXRpYWxSZWR1Y3Rpb24sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVkdWNlKFxuICAgICAgdGhpcyxcbiAgICAgIHJlZHVjZXIsXG4gICAgICBpbml0aWFsUmVkdWN0aW9uLFxuICAgICAgY29udGV4dCxcbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPCAyLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9LFxuXG4gIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChyZWR1Y2VyLCBpbml0aWFsUmVkdWN0aW9uLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlZHVjZShcbiAgICAgIHRoaXMsXG4gICAgICByZWR1Y2VyLFxuICAgICAgaW5pdGlhbFJlZHVjdGlvbixcbiAgICAgIGNvbnRleHQsXG4gICAgICBhcmd1bWVudHMubGVuZ3RoIDwgMixcbiAgICAgIHRydWVcbiAgICApO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHJldmVyc2VGYWN0b3J5KHRoaXMsIHRydWUpKTtcbiAgfSxcblxuICBzbGljZTogZnVuY3Rpb24gc2xpY2UoYmVnaW4sIGVuZCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzbGljZUZhY3RvcnkodGhpcywgYmVnaW4sIGVuZCwgdHJ1ZSkpO1xuICB9LFxuXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuICF0aGlzLmV2ZXJ5KG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvcikpO1xuICB9LFxuXG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMpO1xuICB9LFxuXG4gIC8vICMjIyBNb3JlIHNlcXVlbnRpYWwgbWV0aG9kc1xuXG4gIGJ1dExhc3Q6IGZ1bmN0aW9uIGJ1dExhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgLTEpO1xuICB9LFxuXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zaXplID09PSAwIDogIXRoaXMuc29tZShmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9KTtcbiAgfSxcblxuICBjb3VudDogZnVuY3Rpb24gY291bnQocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGVuc3VyZVNpemUoXG4gICAgICBwcmVkaWNhdGUgPyB0aGlzLnRvU2VxKCkuZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCkgOiB0aGlzXG4gICAgKTtcbiAgfSxcblxuICBjb3VudEJ5OiBmdW5jdGlvbiBjb3VudEJ5KGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY291bnRCeUZhY3RvcnkodGhpcywgZ3JvdXBlciwgY29udGV4dCk7XG4gIH0sXG5cbiAgZXF1YWxzOiBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gZGVlcEVxdWFsKHRoaXMsIG90aGVyKTtcbiAgfSxcblxuICBlbnRyeVNlcTogZnVuY3Rpb24gZW50cnlTZXEoKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzO1xuICAgIGlmIChjb2xsZWN0aW9uLl9jYWNoZSkge1xuICAgICAgLy8gV2UgY2FjaGUgYXMgYW4gZW50cmllcyBhcnJheSwgc28gd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBjYWNoZSFcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEoY29sbGVjdGlvbi5fY2FjaGUpO1xuICAgIH1cbiAgICB2YXIgZW50cmllc1NlcXVlbmNlID0gY29sbGVjdGlvbi50b1NlcSgpLm1hcChlbnRyeU1hcHBlcikudG9JbmRleGVkU2VxKCk7XG4gICAgZW50cmllc1NlcXVlbmNlLmZyb21FbnRyeVNlcSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb24udG9TZXEoKTsgfTtcbiAgICByZXR1cm4gZW50cmllc1NlcXVlbmNlO1xuICB9LFxuXG4gIGZpbHRlck5vdDogZnVuY3Rpb24gZmlsdGVyTm90KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcihub3QocHJlZGljYXRlKSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZmluZEVudHJ5OiBmdW5jdGlvbiBmaW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBmb3VuZCA9IG5vdFNldFZhbHVlO1xuICAgIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpIHtcbiAgICAgICAgZm91bmQgPSBbaywgdl07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH0sXG5cbiAgZmluZEtleTogZnVuY3Rpb24gZmluZEtleShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgfSxcblxuICBmaW5kTGFzdDogZnVuY3Rpb24gZmluZExhc3QocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKS5yZXZlcnNlKCkuZmluZChwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBmaW5kTGFzdEVudHJ5OiBmdW5jdGlvbiBmaW5kTGFzdEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZmluZExhc3RLZXk6IGZ1bmN0aW9uIGZpbmRMYXN0S2V5KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKS5yZXZlcnNlKCkuZmluZEtleShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICB9LFxuXG4gIGZpcnN0OiBmdW5jdGlvbiBmaXJzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmQocmV0dXJuVHJ1ZSwgbnVsbCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZsYXRNYXBGYWN0b3J5KHRoaXMsIG1hcHBlciwgY29udGV4dCkpO1xuICB9LFxuXG4gIGZsYXR0ZW46IGZ1bmN0aW9uIGZsYXR0ZW4oZGVwdGgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxhdHRlbkZhY3RvcnkodGhpcywgZGVwdGgsIHRydWUpKTtcbiAgfSxcblxuICBmcm9tRW50cnlTZXE6IGZ1bmN0aW9uIGZyb21FbnRyeVNlcSgpIHtcbiAgICByZXR1cm4gbmV3IEZyb21FbnRyaWVzU2VxdWVuY2UodGhpcyk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQoc2VhcmNoS2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmQoZnVuY3Rpb24gKF8sIGtleSkgeyByZXR1cm4gaXMoa2V5LCBzZWFyY2hLZXkpOyB9LCB1bmRlZmluZWQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBnZXRJbjogZ2V0SW4sXG5cbiAgZ3JvdXBCeTogZnVuY3Rpb24gZ3JvdXBCeShncm91cGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGdyb3VwQnlGYWN0b3J5KHRoaXMsIGdyb3VwZXIsIGNvbnRleHQpO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gaGFzKHNlYXJjaEtleSkge1xuICAgIHJldHVybiB0aGlzLmdldChzZWFyY2hLZXksIE5PVF9TRVQpICE9PSBOT1RfU0VUO1xuICB9LFxuXG4gIGhhc0luOiBoYXNJbixcblxuICBpc1N1YnNldDogZnVuY3Rpb24gaXNTdWJzZXQoaXRlcikge1xuICAgIGl0ZXIgPSB0eXBlb2YgaXRlci5pbmNsdWRlcyA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZXIgOiBDb2xsZWN0aW9uKGl0ZXIpO1xuICAgIHJldHVybiB0aGlzLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pO1xuICB9LFxuXG4gIGlzU3VwZXJzZXQ6IGZ1bmN0aW9uIGlzU3VwZXJzZXQoaXRlcikge1xuICAgIGl0ZXIgPSB0eXBlb2YgaXRlci5pc1N1YnNldCA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZXIgOiBDb2xsZWN0aW9uKGl0ZXIpO1xuICAgIHJldHVybiBpdGVyLmlzU3Vic2V0KHRoaXMpO1xuICB9LFxuXG4gIGtleU9mOiBmdW5jdGlvbiBrZXlPZihzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmRLZXkoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBpcyh2YWx1ZSwgc2VhcmNoVmFsdWUpOyB9KTtcbiAgfSxcblxuICBrZXlTZXE6IGZ1bmN0aW9uIGtleVNlcSgpIHtcbiAgICByZXR1cm4gdGhpcy50b1NlcSgpLm1hcChrZXlNYXBwZXIpLnRvSW5kZXhlZFNlcSgpO1xuICB9LFxuXG4gIGxhc3Q6IGZ1bmN0aW9uIGxhc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b1NlcSgpLnJldmVyc2UoKS5maXJzdChub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgbGFzdEtleU9mOiBmdW5jdGlvbiBsYXN0S2V5T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKCkucmV2ZXJzZSgpLmtleU9mKHNlYXJjaFZhbHVlKTtcbiAgfSxcblxuICBtYXg6IGZ1bmN0aW9uIG1heChjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG1heEZhY3RvcnkodGhpcywgY29tcGFyYXRvcik7XG4gIH0sXG5cbiAgbWF4Qnk6IGZ1bmN0aW9uIG1heEJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IsIG1hcHBlcik7XG4gIH0sXG5cbiAgbWluOiBmdW5jdGlvbiBtaW4oY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KFxuICAgICAgdGhpcyxcbiAgICAgIGNvbXBhcmF0b3IgPyBuZWcoY29tcGFyYXRvcikgOiBkZWZhdWx0TmVnQ29tcGFyYXRvclxuICAgICk7XG4gIH0sXG5cbiAgbWluQnk6IGZ1bmN0aW9uIG1pbkJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KFxuICAgICAgdGhpcyxcbiAgICAgIGNvbXBhcmF0b3IgPyBuZWcoY29tcGFyYXRvcikgOiBkZWZhdWx0TmVnQ29tcGFyYXRvcixcbiAgICAgIG1hcHBlclxuICAgICk7XG4gIH0sXG5cbiAgcmVzdDogZnVuY3Rpb24gcmVzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgxKTtcbiAgfSxcblxuICBza2lwOiBmdW5jdGlvbiBza2lwKGFtb3VudCkge1xuICAgIHJldHVybiBhbW91bnQgPT09IDAgPyB0aGlzIDogdGhpcy5zbGljZShNYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICBza2lwTGFzdDogZnVuY3Rpb24gc2tpcExhc3QoYW1vdW50KSB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gMCA/IHRoaXMgOiB0aGlzLnNsaWNlKDAsIC1NYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICBza2lwV2hpbGU6IGZ1bmN0aW9uIHNraXBXaGlsZShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc2tpcFdoaWxlRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIHRydWUpKTtcbiAgfSxcblxuICBza2lwVW50aWw6IGZ1bmN0aW9uIHNraXBVbnRpbChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5za2lwV2hpbGUobm90KHByZWRpY2F0ZSksIGNvbnRleHQpO1xuICB9LFxuXG4gIHNvcnRCeTogZnVuY3Rpb24gc29ydEJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpKTtcbiAgfSxcblxuICB0YWtlOiBmdW5jdGlvbiB0YWtlKGFtb3VudCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIE1hdGgubWF4KDAsIGFtb3VudCkpO1xuICB9LFxuXG4gIHRha2VMYXN0OiBmdW5jdGlvbiB0YWtlTGFzdChhbW91bnQpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgtTWF0aC5tYXgoMCwgYW1vdW50KSk7XG4gIH0sXG5cbiAgdGFrZVdoaWxlOiBmdW5jdGlvbiB0YWtlV2hpbGUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHRha2VXaGlsZUZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0KSk7XG4gIH0sXG5cbiAgdGFrZVVudGlsOiBmdW5jdGlvbiB0YWtlVW50aWwocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGFrZVdoaWxlKG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgIHJldHVybiBmbih0aGlzKTtcbiAgfSxcblxuICB2YWx1ZVNlcTogZnVuY3Rpb24gdmFsdWVTZXEoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9JbmRleGVkU2VxKCk7XG4gIH0sXG5cbiAgLy8gIyMjIEhhc2hhYmxlIE9iamVjdFxuXG4gIGhhc2hDb2RlOiBmdW5jdGlvbiBoYXNoQ29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2hhc2ggfHwgKHRoaXMuX19oYXNoID0gaGFzaENvbGxlY3Rpb24odGhpcykpO1xuICB9LFxuXG4gIC8vICMjIyBJbnRlcm5hbFxuXG4gIC8vIGFic3RyYWN0IF9faXRlcmF0ZShmbiwgcmV2ZXJzZSlcblxuICAvLyBhYnN0cmFjdCBfX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpXG59KTtcblxudmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbkNvbGxlY3Rpb25Qcm90b3R5cGVbSVNfQ09MTEVDVElPTl9TWU1CT0xdID0gdHJ1ZTtcbkNvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IENvbGxlY3Rpb25Qcm90b3R5cGUudmFsdWVzO1xuQ29sbGVjdGlvblByb3RvdHlwZS50b0pTT04gPSBDb2xsZWN0aW9uUHJvdG90eXBlLnRvQXJyYXk7XG5Db2xsZWN0aW9uUHJvdG90eXBlLl9fdG9TdHJpbmdNYXBwZXIgPSBxdW90ZVN0cmluZztcbkNvbGxlY3Rpb25Qcm90b3R5cGUuaW5zcGVjdCA9IENvbGxlY3Rpb25Qcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuQ29sbGVjdGlvblByb3RvdHlwZS5jaGFpbiA9IENvbGxlY3Rpb25Qcm90b3R5cGUuZmxhdE1hcDtcbkNvbGxlY3Rpb25Qcm90b3R5cGUuY29udGFpbnMgPSBDb2xsZWN0aW9uUHJvdG90eXBlLmluY2x1ZGVzO1xuXG5taXhpbihLZXllZENvbGxlY3Rpb24sIHtcbiAgLy8gIyMjIE1vcmUgc2VxdWVudGlhbCBtZXRob2RzXG5cbiAgZmxpcDogZnVuY3Rpb24gZmxpcCgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxpcEZhY3RvcnkodGhpcykpO1xuICB9LFxuXG4gIG1hcEVudHJpZXM6IGZ1bmN0aW9uIG1hcEVudHJpZXMobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gcmVpZnkoXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy50b1NlcSgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIG1hcHBlci5jYWxsKGNvbnRleHQsIFtrLCB2XSwgaXRlcmF0aW9ucysrLCB0aGlzJDEkMSk7IH0pXG4gICAgICAgIC5mcm9tRW50cnlTZXEoKVxuICAgICk7XG4gIH0sXG5cbiAgbWFwS2V5czogZnVuY3Rpb24gbWFwS2V5cyhtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHJlaWZ5KFxuICAgICAgdGhpcyxcbiAgICAgIHRoaXMudG9TZXEoKVxuICAgICAgICAuZmxpcCgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGssIHYpIHsgcmV0dXJuIG1hcHBlci5jYWxsKGNvbnRleHQsIGssIHYsIHRoaXMkMSQxKTsgfSlcbiAgICAgICAgLmZsaXAoKVxuICAgICk7XG4gIH0sXG59KTtcblxudmFyIEtleWVkQ29sbGVjdGlvblByb3RvdHlwZSA9IEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGU7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGVbSVNfS0VZRURfU1lNQk9MXSA9IHRydWU7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IENvbGxlY3Rpb25Qcm90b3R5cGUuZW50cmllcztcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZS50b0pTT04gPSB0b09iamVjdDtcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZS5fX3RvU3RyaW5nTWFwcGVyID0gZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIHF1b3RlU3RyaW5nKGspICsgJzogJyArIHF1b3RlU3RyaW5nKHYpOyB9O1xuXG5taXhpbihJbmRleGVkQ29sbGVjdGlvbiwge1xuICAvLyAjIyMgQ29udmVyc2lvbiB0byBvdGhlciB0eXBlc1xuXG4gIHRvS2V5ZWRTZXE6IGZ1bmN0aW9uIHRvS2V5ZWRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb0tleWVkU2VxdWVuY2UodGhpcywgZmFsc2UpO1xuICB9LFxuXG4gIC8vICMjIyBFUzYgQ29sbGVjdGlvbiBtZXRob2RzIChFUzYgQXJyYXkgYW5kIE1hcClcblxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmlsdGVyRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIGZhbHNlKSk7XG4gIH0sXG5cbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeVswXSA6IC0xO1xuICB9LFxuXG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5rZXlPZihzZWFyY2hWYWx1ZSk7XG4gICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID8gLTEgOiBrZXk7XG4gIH0sXG5cbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaFZhbHVlKSB7XG4gICAgdmFyIGtleSA9IHRoaXMubGFzdEtleU9mKHNlYXJjaFZhbHVlKTtcbiAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgPyAtMSA6IGtleTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCByZXZlcnNlRmFjdG9yeSh0aGlzLCBmYWxzZSkpO1xuICB9LFxuXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNsaWNlRmFjdG9yeSh0aGlzLCBiZWdpbiwgZW5kLCBmYWxzZSkpO1xuICB9LFxuXG4gIHNwbGljZTogZnVuY3Rpb24gc3BsaWNlKGluZGV4LCByZW1vdmVOdW0gLyosIC4uLnZhbHVlcyovKSB7XG4gICAgdmFyIG51bUFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHJlbW92ZU51bSA9IE1hdGgubWF4KHJlbW92ZU51bSB8fCAwLCAwKTtcbiAgICBpZiAobnVtQXJncyA9PT0gMCB8fCAobnVtQXJncyA9PT0gMiAmJiAhcmVtb3ZlTnVtKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIElmIGluZGV4IGlzIG5lZ2F0aXZlLCBpdCBzaG91bGQgcmVzb2x2ZSByZWxhdGl2ZSB0byB0aGUgc2l6ZSBvZiB0aGVcbiAgICAvLyBjb2xsZWN0aW9uLiBIb3dldmVyIHNpemUgbWF5IGJlIGV4cGVuc2l2ZSB0byBjb21wdXRlIGlmIG5vdCBjYWNoZWQsIHNvXG4gICAgLy8gb25seSBjYWxsIGNvdW50KCkgaWYgdGhlIG51bWJlciBpcyBpbiBmYWN0IG5lZ2F0aXZlLlxuICAgIGluZGV4ID0gcmVzb2x2ZUJlZ2luKGluZGV4LCBpbmRleCA8IDAgPyB0aGlzLmNvdW50KCkgOiB0aGlzLnNpemUpO1xuICAgIHZhciBzcGxpY2VkID0gdGhpcy5zbGljZSgwLCBpbmRleCk7XG4gICAgcmV0dXJuIHJlaWZ5KFxuICAgICAgdGhpcyxcbiAgICAgIG51bUFyZ3MgPT09IDFcbiAgICAgICAgPyBzcGxpY2VkXG4gICAgICAgIDogc3BsaWNlZC5jb25jYXQoYXJyQ29weShhcmd1bWVudHMsIDIpLCB0aGlzLnNsaWNlKGluZGV4ICsgcmVtb3ZlTnVtKSlcbiAgICApO1xuICB9LFxuXG4gIC8vICMjIyBNb3JlIGNvbGxlY3Rpb24gbWV0aG9kc1xuXG4gIGZpbmRMYXN0SW5kZXg6IGZ1bmN0aW9uIGZpbmRMYXN0SW5kZXgocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kTGFzdEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMF0gOiAtMTtcbiAgfSxcblxuICBmaXJzdDogZnVuY3Rpb24gZmlyc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoMCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZsYXR0ZW46IGZ1bmN0aW9uIGZsYXR0ZW4oZGVwdGgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxhdHRlbkZhY3RvcnkodGhpcywgZGVwdGgsIGZhbHNlKSk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgfHxcbiAgICAgIHRoaXMuc2l6ZSA9PT0gSW5maW5pdHkgfHxcbiAgICAgICh0aGlzLnNpemUgIT09IHVuZGVmaW5lZCAmJiBpbmRleCA+IHRoaXMuc2l6ZSlcbiAgICAgID8gbm90U2V0VmFsdWVcbiAgICAgIDogdGhpcy5maW5kKGZ1bmN0aW9uIChfLCBrZXkpIHsgcmV0dXJuIGtleSA9PT0gaW5kZXg7IH0sIHVuZGVmaW5lZCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gaGFzKGluZGV4KSB7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIHJldHVybiAoXG4gICAgICBpbmRleCA+PSAwICYmXG4gICAgICAodGhpcy5zaXplICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyB0aGlzLnNpemUgPT09IEluZmluaXR5IHx8IGluZGV4IDwgdGhpcy5zaXplXG4gICAgICAgIDogdGhpcy5pbmRleE9mKGluZGV4KSAhPT0gLTEpXG4gICAgKTtcbiAgfSxcblxuICBpbnRlcnBvc2U6IGZ1bmN0aW9uIGludGVycG9zZShzZXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgaW50ZXJwb3NlRmFjdG9yeSh0aGlzLCBzZXBhcmF0b3IpKTtcbiAgfSxcblxuICBpbnRlcmxlYXZlOiBmdW5jdGlvbiBpbnRlcmxlYXZlKC8qLi4uY29sbGVjdGlvbnMqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IFt0aGlzXS5jb25jYXQoYXJyQ29weShhcmd1bWVudHMpKTtcbiAgICB2YXIgemlwcGVkID0gemlwV2l0aEZhY3RvcnkodGhpcy50b1NlcSgpLCBJbmRleGVkU2VxLm9mLCBjb2xsZWN0aW9ucyk7XG4gICAgdmFyIGludGVybGVhdmVkID0gemlwcGVkLmZsYXR0ZW4odHJ1ZSk7XG4gICAgaWYgKHppcHBlZC5zaXplKSB7XG4gICAgICBpbnRlcmxlYXZlZC5zaXplID0gemlwcGVkLnNpemUgKiBjb2xsZWN0aW9ucy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZWlmeSh0aGlzLCBpbnRlcmxlYXZlZCk7XG4gIH0sXG5cbiAga2V5U2VxOiBmdW5jdGlvbiBrZXlTZXEoKSB7XG4gICAgcmV0dXJuIFJhbmdlKDAsIHRoaXMuc2l6ZSk7XG4gIH0sXG5cbiAgbGFzdDogZnVuY3Rpb24gbGFzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldCgtMSwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIHNraXBXaGlsZTogZnVuY3Rpb24gc2tpcFdoaWxlKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBza2lwV2hpbGVGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgZmFsc2UpKTtcbiAgfSxcblxuICB6aXA6IGZ1bmN0aW9uIHppcCgvKiwgLi4uY29sbGVjdGlvbnMgKi8pIHtcbiAgICB2YXIgY29sbGVjdGlvbnMgPSBbdGhpc10uY29uY2F0KGFyckNvcHkoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHppcFdpdGhGYWN0b3J5KHRoaXMsIGRlZmF1bHRaaXBwZXIsIGNvbGxlY3Rpb25zKSk7XG4gIH0sXG5cbiAgemlwQWxsOiBmdW5jdGlvbiB6aXBBbGwoLyosIC4uLmNvbGxlY3Rpb25zICovKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25zID0gW3RoaXNdLmNvbmNhdChhcnJDb3B5KGFyZ3VtZW50cykpO1xuICAgIHJldHVybiByZWlmeSh0aGlzLCB6aXBXaXRoRmFjdG9yeSh0aGlzLCBkZWZhdWx0WmlwcGVyLCBjb2xsZWN0aW9ucywgdHJ1ZSkpO1xuICB9LFxuXG4gIHppcFdpdGg6IGZ1bmN0aW9uIHppcFdpdGgoemlwcGVyIC8qLCAuLi5jb2xsZWN0aW9ucyAqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IGFyckNvcHkoYXJndW1lbnRzKTtcbiAgICBjb2xsZWN0aW9uc1swXSA9IHRoaXM7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHppcFdpdGhGYWN0b3J5KHRoaXMsIHppcHBlciwgY29sbGVjdGlvbnMpKTtcbiAgfSxcbn0pO1xuXG52YXIgSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGUgPSBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGU7XG5JbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZVtJU19JTkRFWEVEX1NZTUJPTF0gPSB0cnVlO1xuSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcblxubWl4aW4oU2V0Q29sbGVjdGlvbiwge1xuICAvLyAjIyMgRVM2IENvbGxlY3Rpb24gbWV0aG9kcyAoRVM2IEFycmF5IGFuZCBNYXApXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQodmFsdWUsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKHZhbHVlKSA/IHZhbHVlIDogbm90U2V0VmFsdWU7XG4gIH0sXG5cbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKHZhbHVlKTtcbiAgfSxcblxuICAvLyAjIyMgTW9yZSBzZXF1ZW50aWFsIG1ldGhvZHNcblxuICBrZXlTZXE6IGZ1bmN0aW9uIGtleVNlcSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVNlcSgpO1xuICB9LFxufSk7XG5cbnZhciBTZXRDb2xsZWN0aW9uUHJvdG90eXBlID0gU2V0Q29sbGVjdGlvbi5wcm90b3R5cGU7XG5TZXRDb2xsZWN0aW9uUHJvdG90eXBlLmhhcyA9IENvbGxlY3Rpb25Qcm90b3R5cGUuaW5jbHVkZXM7XG5TZXRDb2xsZWN0aW9uUHJvdG90eXBlLmNvbnRhaW5zID0gU2V0Q29sbGVjdGlvblByb3RvdHlwZS5pbmNsdWRlcztcblNldENvbGxlY3Rpb25Qcm90b3R5cGUua2V5cyA9IFNldENvbGxlY3Rpb25Qcm90b3R5cGUudmFsdWVzO1xuXG4vLyBNaXhpbiBzdWJjbGFzc2VzXG5cbm1peGluKEtleWVkU2VxLCBLZXllZENvbGxlY3Rpb25Qcm90b3R5cGUpO1xubWl4aW4oSW5kZXhlZFNlcSwgSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGUpO1xubWl4aW4oU2V0U2VxLCBTZXRDb2xsZWN0aW9uUHJvdG90eXBlKTtcblxuLy8gI3ByYWdtYSBIZWxwZXIgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIHJlZHVjZShjb2xsZWN0aW9uLCByZWR1Y2VyLCByZWR1Y3Rpb24sIGNvbnRleHQsIHVzZUZpcnN0LCByZXZlcnNlKSB7XG4gIGFzc2VydE5vdEluZmluaXRlKGNvbGxlY3Rpb24uc2l6ZSk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgaWYgKHVzZUZpcnN0KSB7XG4gICAgICB1c2VGaXJzdCA9IGZhbHNlO1xuICAgICAgcmVkdWN0aW9uID0gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVkdWN0aW9uID0gcmVkdWNlci5jYWxsKGNvbnRleHQsIHJlZHVjdGlvbiwgdiwgaywgYyk7XG4gICAgfVxuICB9LCByZXZlcnNlKTtcbiAgcmV0dXJuIHJlZHVjdGlvbjtcbn1cblxuZnVuY3Rpb24ga2V5TWFwcGVyKHYsIGspIHtcbiAgcmV0dXJuIGs7XG59XG5cbmZ1bmN0aW9uIGVudHJ5TWFwcGVyKHYsIGspIHtcbiAgcmV0dXJuIFtrLCB2XTtcbn1cblxuZnVuY3Rpb24gbm90KHByZWRpY2F0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5lZyhwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gLXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0WmlwcGVyKCkge1xuICByZXR1cm4gYXJyQ29weShhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TmVnQ29tcGFyYXRvcihhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IDEgOiBhID4gYiA/IC0xIDogMDtcbn1cblxuZnVuY3Rpb24gaGFzaENvbGxlY3Rpb24oY29sbGVjdGlvbikge1xuICBpZiAoY29sbGVjdGlvbi5zaXplID09PSBJbmZpbml0eSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBvcmRlcmVkID0gaXNPcmRlcmVkKGNvbGxlY3Rpb24pO1xuICB2YXIga2V5ZWQgPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgaCA9IG9yZGVyZWQgPyAxIDogMDtcbiAgdmFyIHNpemUgPSBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICBrZXllZFxuICAgICAgPyBvcmRlcmVkXG4gICAgICAgID8gZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgICAgIGggPSAoMzEgKiBoICsgaGFzaE1lcmdlKGhhc2godiksIGhhc2goaykpKSB8IDA7XG4gICAgICAgICAgfVxuICAgICAgICA6IGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgICAgICBoID0gKGggKyBoYXNoTWVyZ2UoaGFzaCh2KSwgaGFzaChrKSkpIHwgMDtcbiAgICAgICAgICB9XG4gICAgICA6IG9yZGVyZWRcbiAgICAgID8gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBoID0gKDMxICogaCArIGhhc2godikpIHwgMDtcbiAgICAgICAgfVxuICAgICAgOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIGggPSAoaCArIGhhc2godikpIHwgMDtcbiAgICAgICAgfVxuICApO1xuICByZXR1cm4gbXVybXVySGFzaE9mU2l6ZShzaXplLCBoKTtcbn1cblxuZnVuY3Rpb24gbXVybXVySGFzaE9mU2l6ZShzaXplLCBoKSB7XG4gIGggPSBpbXVsKGgsIDB4Y2M5ZTJkNTEpO1xuICBoID0gaW11bCgoaCA8PCAxNSkgfCAoaCA+Pj4gLTE1KSwgMHgxYjg3MzU5Myk7XG4gIGggPSBpbXVsKChoIDw8IDEzKSB8IChoID4+PiAtMTMpLCA1KTtcbiAgaCA9ICgoaCArIDB4ZTY1NDZiNjQpIHwgMCkgXiBzaXplO1xuICBoID0gaW11bChoIF4gKGggPj4+IDE2KSwgMHg4NWViY2E2Yik7XG4gIGggPSBpbXVsKGggXiAoaCA+Pj4gMTMpLCAweGMyYjJhZTM1KTtcbiAgaCA9IHNtaShoIF4gKGggPj4+IDE2KSk7XG4gIHJldHVybiBoO1xufVxuXG5mdW5jdGlvbiBoYXNoTWVyZ2UoYSwgYikge1xuICByZXR1cm4gKGEgXiAoYiArIDB4OWUzNzc5YjkgKyAoYSA8PCA2KSArIChhID4+IDIpKSkgfCAwOyAvLyBpbnRcbn1cblxudmFyIE9yZGVyZWRTZXQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXQpIHtcbiAgZnVuY3Rpb24gT3JkZXJlZFNldCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5T3JkZXJlZFNldCgpXG4gICAgICA6IGlzT3JkZXJlZFNldCh2YWx1ZSlcbiAgICAgID8gdmFsdWVcbiAgICAgIDogZW1wdHlPcmRlcmVkU2V0KCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAgICAgdmFyIGl0ZXIgPSBTZXRDb2xsZWN0aW9uKHZhbHVlKTtcbiAgICAgICAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgICAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodikgeyByZXR1cm4gc2V0LmFkZCh2KTsgfSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgaWYgKCBTZXQgKSBPcmRlcmVkU2V0Ll9fcHJvdG9fXyA9IFNldDtcbiAgT3JkZXJlZFNldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXQgJiYgU2V0LnByb3RvdHlwZSApO1xuICBPcmRlcmVkU2V0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE9yZGVyZWRTZXQ7XG5cbiAgT3JkZXJlZFNldC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBPcmRlcmVkU2V0LmZyb21LZXlzID0gZnVuY3Rpb24gZnJvbUtleXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMoS2V5ZWRDb2xsZWN0aW9uKHZhbHVlKS5rZXlTZXEoKSk7XG4gIH07XG5cbiAgT3JkZXJlZFNldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnT3JkZXJlZFNldCB7JywgJ30nKTtcbiAgfTtcblxuICByZXR1cm4gT3JkZXJlZFNldDtcbn0oU2V0KSk7XG5cbk9yZGVyZWRTZXQuaXNPcmRlcmVkU2V0ID0gaXNPcmRlcmVkU2V0O1xuXG52YXIgT3JkZXJlZFNldFByb3RvdHlwZSA9IE9yZGVyZWRTZXQucHJvdG90eXBlO1xuT3JkZXJlZFNldFByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuT3JkZXJlZFNldFByb3RvdHlwZS56aXAgPSBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZS56aXA7XG5PcmRlcmVkU2V0UHJvdG90eXBlLnppcFdpdGggPSBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZS56aXBXaXRoO1xuT3JkZXJlZFNldFByb3RvdHlwZS56aXBBbGwgPSBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZS56aXBBbGw7XG5cbk9yZGVyZWRTZXRQcm90b3R5cGUuX19lbXB0eSA9IGVtcHR5T3JkZXJlZFNldDtcbk9yZGVyZWRTZXRQcm90b3R5cGUuX19tYWtlID0gbWFrZU9yZGVyZWRTZXQ7XG5cbmZ1bmN0aW9uIG1ha2VPcmRlcmVkU2V0KG1hcCwgb3duZXJJRCkge1xuICB2YXIgc2V0ID0gT2JqZWN0LmNyZWF0ZShPcmRlcmVkU2V0UHJvdG90eXBlKTtcbiAgc2V0LnNpemUgPSBtYXAgPyBtYXAuc2l6ZSA6IDA7XG4gIHNldC5fbWFwID0gbWFwO1xuICBzZXQuX19vd25lcklEID0gb3duZXJJRDtcbiAgcmV0dXJuIHNldDtcbn1cblxudmFyIEVNUFRZX09SREVSRURfU0VUO1xuZnVuY3Rpb24gZW1wdHlPcmRlcmVkU2V0KCkge1xuICByZXR1cm4gKFxuICAgIEVNUFRZX09SREVSRURfU0VUIHx8IChFTVBUWV9PUkRFUkVEX1NFVCA9IG1ha2VPcmRlcmVkU2V0KGVtcHR5T3JkZXJlZE1hcCgpKSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dPbkludmFsaWREZWZhdWx0VmFsdWVzKGRlZmF1bHRWYWx1ZXMpIHtcbiAgaWYgKGlzUmVjb3JkKGRlZmF1bHRWYWx1ZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0NhbiBub3QgY2FsbCBgUmVjb3JkYCB3aXRoIGFuIGltbXV0YWJsZSBSZWNvcmQgYXMgZGVmYXVsdCB2YWx1ZXMuIFVzZSBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IGluc3RlYWQuJ1xuICAgICk7XG4gIH1cblxuICBpZiAoaXNJbW11dGFibGUoZGVmYXVsdFZhbHVlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQ2FuIG5vdCBjYWxsIGBSZWNvcmRgIHdpdGggYW4gaW1tdXRhYmxlIENvbGxlY3Rpb24gYXMgZGVmYXVsdCB2YWx1ZXMuIFVzZSBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IGluc3RlYWQuJ1xuICAgICk7XG4gIH1cblxuICBpZiAoZGVmYXVsdFZhbHVlcyA9PT0gbnVsbCB8fCB0eXBlb2YgZGVmYXVsdFZhbHVlcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQ2FuIG5vdCBjYWxsIGBSZWNvcmRgIHdpdGggYSBub24tb2JqZWN0IGFzIGRlZmF1bHQgdmFsdWVzLiBVc2UgYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdCBpbnN0ZWFkLidcbiAgICApO1xuICB9XG59XG5cbnZhciBSZWNvcmQgPSBmdW5jdGlvbiBSZWNvcmQoZGVmYXVsdFZhbHVlcywgbmFtZSkge1xuICB2YXIgaGFzSW5pdGlhbGl6ZWQ7XG5cbiAgdGhyb3dPbkludmFsaWREZWZhdWx0VmFsdWVzKGRlZmF1bHRWYWx1ZXMpO1xuXG4gIHZhciBSZWNvcmRUeXBlID0gZnVuY3Rpb24gUmVjb3JkKHZhbHVlcykge1xuICAgIHZhciB0aGlzJDEkMSA9IHRoaXM7XG5cbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUmVjb3JkVHlwZSkge1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlY29yZFR5cGUpKSB7XG4gICAgICByZXR1cm4gbmV3IFJlY29yZFR5cGUodmFsdWVzKTtcbiAgICB9XG4gICAgaWYgKCFoYXNJbml0aWFsaXplZCkge1xuICAgICAgaGFzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkZWZhdWx0VmFsdWVzKTtcbiAgICAgIHZhciBpbmRpY2VzID0gKFJlY29yZFR5cGVQcm90b3R5cGUuX2luZGljZXMgPSB7fSk7XG4gICAgICAvLyBEZXByZWNhdGVkOiBsZWZ0IHRvIGF0dGVtcHQgbm90IHRvIGJyZWFrIGFueSBleHRlcm5hbCBjb2RlIHdoaWNoXG4gICAgICAvLyByZWxpZXMgb24gYSAuX25hbWUgcHJvcGVydHkgZXhpc3Rpbmcgb24gcmVjb3JkIGluc3RhbmNlcy5cbiAgICAgIC8vIFVzZSBSZWNvcmQuZ2V0RGVzY3JpcHRpdmVOYW1lKCkgaW5zdGVhZFxuICAgICAgUmVjb3JkVHlwZVByb3RvdHlwZS5fbmFtZSA9IG5hbWU7XG4gICAgICBSZWNvcmRUeXBlUHJvdG90eXBlLl9rZXlzID0ga2V5cztcbiAgICAgIFJlY29yZFR5cGVQcm90b3R5cGUuX2RlZmF1bHRWYWx1ZXMgPSBkZWZhdWx0VmFsdWVzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZSA9IGtleXNbaV07XG4gICAgICAgIGluZGljZXNbcHJvcE5hbWVdID0gaTtcbiAgICAgICAgaWYgKFJlY29yZFR5cGVQcm90b3R5cGVbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgICAgIHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgY29uc29sZS53YXJuICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICdDYW5ub3QgZGVmaW5lICcgK1xuICAgICAgICAgICAgICAgIHJlY29yZE5hbWUodGhpcykgK1xuICAgICAgICAgICAgICAgICcgd2l0aCBwcm9wZXJ0eSBcIicgK1xuICAgICAgICAgICAgICAgIHByb3BOYW1lICtcbiAgICAgICAgICAgICAgICAnXCIgc2luY2UgdGhhdCBwcm9wZXJ0eSBuYW1lIGlzIHBhcnQgb2YgdGhlIFJlY29yZCBBUEkuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRQcm9wKFJlY29yZFR5cGVQcm90b3R5cGUsIHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fb3duZXJJRCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl92YWx1ZXMgPSBMaXN0KCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobCkge1xuICAgICAgbC5zZXRTaXplKHRoaXMkMSQxLl9rZXlzLmxlbmd0aCk7XG4gICAgICBLZXllZENvbGxlY3Rpb24odmFsdWVzKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIGwuc2V0KHRoaXMkMSQxLl9pbmRpY2VzW2tdLCB2ID09PSB0aGlzJDEkMS5fZGVmYXVsdFZhbHVlc1trXSA/IHVuZGVmaW5lZCA6IHYpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIFJlY29yZFR5cGVQcm90b3R5cGUgPSAoUmVjb3JkVHlwZS5wcm90b3R5cGUgPVxuICAgIE9iamVjdC5jcmVhdGUoUmVjb3JkUHJvdG90eXBlKSk7XG4gIFJlY29yZFR5cGVQcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWNvcmRUeXBlO1xuXG4gIGlmIChuYW1lKSB7XG4gICAgUmVjb3JkVHlwZS5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gIH1cblxuICByZXR1cm4gUmVjb3JkVHlwZTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBzdHIgPSByZWNvcmROYW1lKHRoaXMpICsgJyB7ICc7XG4gIHZhciBrZXlzID0gdGhpcy5fa2V5cztcbiAgdmFyIGs7XG4gIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgIT09IGw7IGkrKykge1xuICAgIGsgPSBrZXlzW2ldO1xuICAgIHN0ciArPSAoaSA/ICcsICcgOiAnJykgKyBrICsgJzogJyArIHF1b3RlU3RyaW5nKHRoaXMuZ2V0KGspKTtcbiAgfVxuICByZXR1cm4gc3RyICsgJyB9Jztcbn07XG5cblJlY29yZC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChvdGhlcikge1xuICByZXR1cm4gKFxuICAgIHRoaXMgPT09IG90aGVyIHx8IChvdGhlciAmJiByZWNvcmRTZXEodGhpcykuZXF1YWxzKHJlY29yZFNlcShvdGhlcikpKVxuICApO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5oYXNoQ29kZSA9IGZ1bmN0aW9uIGhhc2hDb2RlICgpIHtcbiAgcmV0dXJuIHJlY29yZFNlcSh0aGlzKS5oYXNoQ29kZSgpO1xufTtcblxuLy8gQHByYWdtYSBBY2Nlc3NcblxuUmVjb3JkLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGspIHtcbiAgcmV0dXJuIHRoaXMuX2luZGljZXMuaGFzT3duUHJvcGVydHkoayk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaywgbm90U2V0VmFsdWUpIHtcbiAgaWYgKCF0aGlzLmhhcyhrKSkge1xuICAgIHJldHVybiBub3RTZXRWYWx1ZTtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9pbmRpY2VzW2tdO1xuICB2YXIgdmFsdWUgPSB0aGlzLl92YWx1ZXMuZ2V0KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0VmFsdWVzW2tdIDogdmFsdWU7XG59O1xuXG4vLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG5SZWNvcmQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCAoaywgdikge1xuICBpZiAodGhpcy5oYXMoaykpIHtcbiAgICB2YXIgbmV3VmFsdWVzID0gdGhpcy5fdmFsdWVzLnNldChcbiAgICAgIHRoaXMuX2luZGljZXNba10sXG4gICAgICB2ID09PSB0aGlzLl9kZWZhdWx0VmFsdWVzW2tdID8gdW5kZWZpbmVkIDogdlxuICAgICk7XG4gICAgaWYgKG5ld1ZhbHVlcyAhPT0gdGhpcy5fdmFsdWVzICYmICF0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIG1ha2VSZWNvcmQodGhpcywgbmV3VmFsdWVzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAoaykge1xuICByZXR1cm4gdGhpcy5zZXQoayk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICB2YXIgbmV3VmFsdWVzID0gdGhpcy5fdmFsdWVzLmNsZWFyKCkuc2V0U2l6ZSh0aGlzLl9rZXlzLmxlbmd0aCk7XG5cbiAgcmV0dXJuIHRoaXMuX19vd25lcklEID8gdGhpcyA6IG1ha2VSZWNvcmQodGhpcywgbmV3VmFsdWVzKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUud2FzQWx0ZXJlZCA9IGZ1bmN0aW9uIHdhc0FsdGVyZWQgKCkge1xuICByZXR1cm4gdGhpcy5fdmFsdWVzLndhc0FsdGVyZWQoKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUudG9TZXEgPSBmdW5jdGlvbiB0b1NlcSAoKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnRvSlMgPSBmdW5jdGlvbiB0b0pTJDEgKCkge1xuICByZXR1cm4gdG9KUyh0aGlzKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMgKCkge1xuICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcykuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICByZXR1cm4gcmVjb3JkU2VxKHRoaXMpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBuZXdWYWx1ZXMgPSB0aGlzLl92YWx1ZXMuX19lbnN1cmVPd25lcihvd25lcklEKTtcbiAgaWYgKCFvd25lcklEKSB7XG4gICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgIHRoaXMuX3ZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gbWFrZVJlY29yZCh0aGlzLCBuZXdWYWx1ZXMsIG93bmVySUQpO1xufTtcblxuUmVjb3JkLmlzUmVjb3JkID0gaXNSZWNvcmQ7XG5SZWNvcmQuZ2V0RGVzY3JpcHRpdmVOYW1lID0gcmVjb3JkTmFtZTtcbnZhciBSZWNvcmRQcm90b3R5cGUgPSBSZWNvcmQucHJvdG90eXBlO1xuUmVjb3JkUHJvdG90eXBlW0lTX1JFQ09SRF9TWU1CT0xdID0gdHJ1ZTtcblJlY29yZFByb3RvdHlwZVtERUxFVEVdID0gUmVjb3JkUHJvdG90eXBlLnJlbW92ZTtcblJlY29yZFByb3RvdHlwZS5kZWxldGVJbiA9IFJlY29yZFByb3RvdHlwZS5yZW1vdmVJbiA9IGRlbGV0ZUluO1xuUmVjb3JkUHJvdG90eXBlLmdldEluID0gZ2V0SW47XG5SZWNvcmRQcm90b3R5cGUuaGFzSW4gPSBDb2xsZWN0aW9uUHJvdG90eXBlLmhhc0luO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlID0gbWVyZ2UkMTtcblJlY29yZFByb3RvdHlwZS5tZXJnZVdpdGggPSBtZXJnZVdpdGgkMTtcblJlY29yZFByb3RvdHlwZS5tZXJnZUluID0gbWVyZ2VJbjtcblJlY29yZFByb3RvdHlwZS5tZXJnZURlZXAgPSBtZXJnZURlZXA7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VEZWVwV2l0aCA9IG1lcmdlRGVlcFdpdGg7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VEZWVwSW4gPSBtZXJnZURlZXBJbjtcblJlY29yZFByb3RvdHlwZS5zZXRJbiA9IHNldEluO1xuUmVjb3JkUHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcblJlY29yZFByb3RvdHlwZS51cGRhdGVJbiA9IHVwZGF0ZUluO1xuUmVjb3JkUHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuUmVjb3JkUHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcblJlY29yZFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuUmVjb3JkUHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBSZWNvcmRQcm90b3R5cGUuZW50cmllcztcblJlY29yZFByb3RvdHlwZS50b0pTT04gPSBSZWNvcmRQcm90b3R5cGUudG9PYmplY3QgPVxuICBDb2xsZWN0aW9uUHJvdG90eXBlLnRvT2JqZWN0O1xuUmVjb3JkUHJvdG90eXBlLmluc3BlY3QgPSBSZWNvcmRQcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuXG5mdW5jdGlvbiBtYWtlUmVjb3JkKGxpa2VSZWNvcmQsIHZhbHVlcywgb3duZXJJRCkge1xuICB2YXIgcmVjb3JkID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YobGlrZVJlY29yZCkpO1xuICByZWNvcmQuX3ZhbHVlcyA9IHZhbHVlcztcbiAgcmVjb3JkLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIHJldHVybiByZWNvcmQ7XG59XG5cbmZ1bmN0aW9uIHJlY29yZE5hbWUocmVjb3JkKSB7XG4gIHJldHVybiByZWNvcmQuY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgcmVjb3JkLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ1JlY29yZCc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFNlcShyZWNvcmQpIHtcbiAgcmV0dXJuIGtleWVkU2VxRnJvbVZhbHVlKHJlY29yZC5fa2V5cy5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIFtrLCByZWNvcmQuZ2V0KGspXTsgfSkpO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wKHByb3RvdHlwZSwgbmFtZSkge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIG5hbWUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQobmFtZSk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaW52YXJpYW50KHRoaXMuX19vd25lcklELCAnQ2Fubm90IHNldCBvbiBhbiBpbW11dGFibGUgcmVjb3JkLicpO1xuICAgICAgICB0aGlzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBmYWlsZWQuIFByb2JhYmx5IElFOC5cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBsYXp5IFNlcSBvZiBgdmFsdWVgIHJlcGVhdGVkIGB0aW1lc2AgdGltZXMuIFdoZW4gYHRpbWVzYCBpc1xuICogdW5kZWZpbmVkLCByZXR1cm5zIGFuIGluZmluaXRlIHNlcXVlbmNlIG9mIGB2YWx1ZWAuXG4gKi9cbnZhciBSZXBlYXQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxKSB7XG4gIGZ1bmN0aW9uIFJlcGVhdCh2YWx1ZSwgdGltZXMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwZWF0KSkge1xuICAgICAgcmV0dXJuIG5ldyBSZXBlYXQodmFsdWUsIHRpbWVzKTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnNpemUgPSB0aW1lcyA9PT0gdW5kZWZpbmVkID8gSW5maW5pdHkgOiBNYXRoLm1heCgwLCB0aW1lcyk7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgaWYgKEVNUFRZX1JFUEVBVCkge1xuICAgICAgICByZXR1cm4gRU1QVFlfUkVQRUFUO1xuICAgICAgfVxuICAgICAgRU1QVFlfUkVQRUFUID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEgKSBSZXBlYXQuX19wcm90b19fID0gSW5kZXhlZFNlcTtcbiAgUmVwZWF0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgUmVwZWF0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlcGVhdDtcblxuICBSZXBlYXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAnUmVwZWF0IFtdJztcbiAgICB9XG4gICAgcmV0dXJuICdSZXBlYXQgWyAnICsgdGhpcy5fdmFsdWUgKyAnICcgKyB0aGlzLnNpemUgKyAnIHRpbWVzIF0nO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXMoaW5kZXgpID8gdGhpcy5fdmFsdWUgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIGlzKHRoaXMuX3ZhbHVlLCBzZWFyY2hWYWx1ZSk7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgc2l6ZSlcbiAgICAgID8gdGhpc1xuICAgICAgOiBuZXcgUmVwZWF0KFxuICAgICAgICAgIHRoaXMuX3ZhbHVlLFxuICAgICAgICAgIHJlc29sdmVFbmQoZW5kLCBzaXplKSAtIHJlc29sdmVCZWdpbihiZWdpbiwgc2l6ZSlcbiAgICAgICAgKTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIGlmIChpcyh0aGlzLl92YWx1ZSwgc2VhcmNoVmFsdWUpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAoc2VhcmNoVmFsdWUpIHtcbiAgICBpZiAoaXModGhpcy5fdmFsdWUsIHNlYXJjaFZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgaWYgKGZuKHRoaXMuX3ZhbHVlLCByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSQxID0gdGhpcztcblxuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGkgPT09IHNpemVcbiAgICAgICAgPyBpdGVyYXRvckRvbmUoKVxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHRoaXMkMSQxLl92YWx1ZSk7IH1cbiAgICApO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChvdGhlcikge1xuICAgIHJldHVybiBvdGhlciBpbnN0YW5jZW9mIFJlcGVhdFxuICAgICAgPyBpcyh0aGlzLl92YWx1ZSwgb3RoZXIuX3ZhbHVlKVxuICAgICAgOiBkZWVwRXF1YWwob3RoZXIpO1xuICB9O1xuXG4gIHJldHVybiBSZXBlYXQ7XG59KEluZGV4ZWRTZXEpKTtcblxudmFyIEVNUFRZX1JFUEVBVDtcblxuZnVuY3Rpb24gZnJvbUpTKHZhbHVlLCBjb252ZXJ0ZXIpIHtcbiAgcmV0dXJuIGZyb21KU1dpdGgoXG4gICAgW10sXG4gICAgY29udmVydGVyIHx8IGRlZmF1bHRDb252ZXJ0ZXIsXG4gICAgdmFsdWUsXG4gICAgJycsXG4gICAgY29udmVydGVyICYmIGNvbnZlcnRlci5sZW5ndGggPiAyID8gW10gOiB1bmRlZmluZWQsXG4gICAgeyAnJzogdmFsdWUgfVxuICApO1xufVxuXG5mdW5jdGlvbiBmcm9tSlNXaXRoKHN0YWNrLCBjb252ZXJ0ZXIsIHZhbHVlLCBrZXksIGtleVBhdGgsIHBhcmVudFZhbHVlKSB7XG4gIGlmIChcbiAgICB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAgIWlzSW1tdXRhYmxlKHZhbHVlKSAmJlxuICAgIChpc0FycmF5TGlrZSh2YWx1ZSkgfHwgaGFzSXRlcmF0b3IodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKVxuICApIHtcbiAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSW1tdXRhYmxlJyk7XG4gICAgfVxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgIGtleVBhdGggJiYga2V5ICE9PSAnJyAmJiBrZXlQYXRoLnB1c2goa2V5KTtcbiAgICB2YXIgY29udmVydGVkID0gY29udmVydGVyLmNhbGwoXG4gICAgICBwYXJlbnRWYWx1ZSxcbiAgICAgIGtleSxcbiAgICAgIFNlcSh2YWx1ZSkubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmcm9tSlNXaXRoKHN0YWNrLCBjb252ZXJ0ZXIsIHYsIGssIGtleVBhdGgsIHZhbHVlKTsgfVxuICAgICAgKSxcbiAgICAgIGtleVBhdGggJiYga2V5UGF0aC5zbGljZSgpXG4gICAgKTtcbiAgICBzdGFjay5wb3AoKTtcbiAgICBrZXlQYXRoICYmIGtleVBhdGgucG9wKCk7XG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDb252ZXJ0ZXIoaywgdikge1xuICAvLyBFZmZlY3RpdmVseSB0aGUgb3Bwb3NpdGUgb2YgXCJDb2xsZWN0aW9uLnRvU2VxKClcIlxuICByZXR1cm4gaXNJbmRleGVkKHYpID8gdi50b0xpc3QoKSA6IGlzS2V5ZWQodikgPyB2LnRvTWFwKCkgOiB2LnRvU2V0KCk7XG59XG5cbnZhciB2ZXJzaW9uID0gXCI0LjAuMFwiO1xuXG52YXIgSW1tdXRhYmxlID0ge1xuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuXG4gIENvbGxlY3Rpb246IENvbGxlY3Rpb24sXG4gIC8vIE5vdGU6IEl0ZXJhYmxlIGlzIGRlcHJlY2F0ZWRcbiAgSXRlcmFibGU6IENvbGxlY3Rpb24sXG5cbiAgU2VxOiBTZXEsXG4gIE1hcDogTWFwLFxuICBPcmRlcmVkTWFwOiBPcmRlcmVkTWFwLFxuICBMaXN0OiBMaXN0LFxuICBTdGFjazogU3RhY2ssXG4gIFNldDogU2V0LFxuICBPcmRlcmVkU2V0OiBPcmRlcmVkU2V0LFxuXG4gIFJlY29yZDogUmVjb3JkLFxuICBSYW5nZTogUmFuZ2UsXG4gIFJlcGVhdDogUmVwZWF0LFxuXG4gIGlzOiBpcyxcbiAgZnJvbUpTOiBmcm9tSlMsXG4gIGhhc2g6IGhhc2gsXG5cbiAgaXNJbW11dGFibGU6IGlzSW1tdXRhYmxlLFxuICBpc0NvbGxlY3Rpb246IGlzQ29sbGVjdGlvbixcbiAgaXNLZXllZDogaXNLZXllZCxcbiAgaXNJbmRleGVkOiBpc0luZGV4ZWQsXG4gIGlzQXNzb2NpYXRpdmU6IGlzQXNzb2NpYXRpdmUsXG4gIGlzT3JkZXJlZDogaXNPcmRlcmVkLFxuICBpc1ZhbHVlT2JqZWN0OiBpc1ZhbHVlT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1NlcTogaXNTZXEsXG4gIGlzTGlzdDogaXNMaXN0LFxuICBpc01hcDogaXNNYXAsXG4gIGlzT3JkZXJlZE1hcDogaXNPcmRlcmVkTWFwLFxuICBpc1N0YWNrOiBpc1N0YWNrLFxuICBpc1NldDogaXNTZXQsXG4gIGlzT3JkZXJlZFNldDogaXNPcmRlcmVkU2V0LFxuICBpc1JlY29yZDogaXNSZWNvcmQsXG5cbiAgZ2V0OiBnZXQsXG4gIGdldEluOiBnZXRJbiQxLFxuICBoYXM6IGhhcyxcbiAgaGFzSW46IGhhc0luJDEsXG4gIG1lcmdlOiBtZXJnZSxcbiAgbWVyZ2VEZWVwOiBtZXJnZURlZXAkMSxcbiAgbWVyZ2VXaXRoOiBtZXJnZVdpdGgsXG4gIG1lcmdlRGVlcFdpdGg6IG1lcmdlRGVlcFdpdGgkMSxcbiAgcmVtb3ZlOiByZW1vdmUsXG4gIHJlbW92ZUluOiByZW1vdmVJbixcbiAgc2V0OiBzZXQsXG4gIHNldEluOiBzZXRJbiQxLFxuICB1cGRhdGU6IHVwZGF0ZSQxLFxuICB1cGRhdGVJbjogdXBkYXRlSW4kMSxcbn07XG5cbi8vIE5vdGU6IEl0ZXJhYmxlIGlzIGRlcHJlY2F0ZWRcbnZhciBJdGVyYWJsZSA9IENvbGxlY3Rpb247XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZTtcbmV4cG9ydCB7IENvbGxlY3Rpb24sIEl0ZXJhYmxlLCBMaXN0LCBNYXAsIE9yZGVyZWRNYXAsIE9yZGVyZWRTZXQsIFJhbmdlLCBSZWNvcmQsIFJlcGVhdCwgU2VxLCBTZXQsIFN0YWNrLCBmcm9tSlMsIGdldCwgZ2V0SW4kMSBhcyBnZXRJbiwgaGFzLCBoYXNJbiQxIGFzIGhhc0luLCBoYXNoLCBpcywgaXNBc3NvY2lhdGl2ZSwgaXNDb2xsZWN0aW9uLCBpc0ltbXV0YWJsZSwgaXNJbmRleGVkLCBpc0tleWVkLCBpc0xpc3QsIGlzTWFwLCBpc09yZGVyZWQsIGlzT3JkZXJlZE1hcCwgaXNPcmRlcmVkU2V0LCBpc1BsYWluT2JqZWN0LCBpc1JlY29yZCwgaXNTZXEsIGlzU2V0LCBpc1N0YWNrLCBpc1ZhbHVlT2JqZWN0LCBtZXJnZSwgbWVyZ2VEZWVwJDEgYXMgbWVyZ2VEZWVwLCBtZXJnZURlZXBXaXRoJDEgYXMgbWVyZ2VEZWVwV2l0aCwgbWVyZ2VXaXRoLCByZW1vdmUsIHJlbW92ZUluLCBzZXQsIHNldEluJDEgYXMgc2V0SW4sIHVwZGF0ZSQxIGFzIHVwZGF0ZSwgdXBkYXRlSW4kMSBhcyB1cGRhdGVJbiwgdmVyc2lvbiB9O1xuIiwgImltcG9ydCB7IGZyb21KUywgaXNLZXllZCwgUmVjb3JkIH0gZnJvbSBcImltbXV0YWJsZVwiO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IGNyZWF0ZURlbHRhIGZyb20gXCJ0ZXh0ZGlmZi1jcmVhdGVcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBhcHBseVBhdGNoIGZyb20gXCJ0ZXh0ZGlmZi1wYXRjaFwiO1xuLy8gSW1wb3J0ICogYXMgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxuXG50eXBlIElVc2VybmFtZSA9IHN0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29kZVNlc3Npb24ge1xuICBjb2RlOiBzdHJpbmc7XG4gIGk6IG51bWJlcjtcbiAgZXJyb3JEaWZmOiBzdHJpbmc7XG4gIHRyYW5zcGlsZWQ6IHN0cmluZztcbiAgaHRtbDogc3RyaW5nO1xuICBjc3M6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTmV3V1NDb25uZWN0aW9uIHtcbiAgdXVpZDogc3RyaW5nO1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgaGFzaENvZGU6IG51bWJlcjtcbiAgdHlwZTogXCJuZXctd3MtY29ubmVjdGlvblwiO1xufVxuXG5pbnRlcmZhY2UgSUNvZGVJbml0RXZlbnQgZXh0ZW5kcyBJQ29kZVNlc3Npb24ge1xuICBuYW1lOiBJVXNlcm5hbWU7XG4gIHV1aWQ6IHN0cmluZztcbiAgdHlwZTogXCJjb2RlLWluaXRcIjtcbiAgaGFzaE9mQ29kZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgT3RoZXJFdmVudCB7XG4gIG5hbWU6IElVc2VybmFtZTtcbiAgdXVpZDogc3RyaW5nO1xuICB0YXJnZXQ6IElVc2VybmFtZSB8IFwiYnJvYWRjYXN0XCI7XG4gIHR5cGU6IFwic3RhcnRcIiB8IFwib3BlblwiIHwgXCJxdWl0XCIgfCBcImdldC1jaWRcIiB8IFwicHJvdmlkZS1jaWRcIiB8IFwibmV3LXdzXCI7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJRXZlbnQgPVxuICB8IElOZXdXU0Nvbm5lY3Rpb25cbiAgfCBPdGhlckV2ZW50XG4gIHwgSUNvZGVJbml0RXZlbnQ7XG5cbmludGVyZmFjZSBJQ2FwYWJpbGl0aWVzIHtcbiAgcHJldHRpZXI6IGJvb2xlYW47XG4gIGJhYmVsOiBib29sZWFuO1xuICBzZXNzaW9uU3RvcmFnZT86IGJvb2xlYW47XG4gIHdlYlJSVDogYm9vbGVhbjtcbiAgcHJlcmVuZGVyOiBib29sZWFuO1xuICBJUEZTOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VySlNPTiB7XG4gIG5hbWU6IElVc2VybmFtZTtcbiAgY2FwYWJpbGl0aWVzOiBJQ2FwYWJpbGl0aWVzO1xuICBzdGF0ZTogSUNvZGVTZXNzaW9uO1xuICB1c2VyczogUmVjb3JkPG9iamVjdD47XG4gIGV2ZW50czogSUV2ZW50W107XG59XG5cbmludGVyZmFjZSBJUVRhc2tFdmVudCB7XG4gIHV1aWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBvcGVyYXRpb246IHN0cmluZztcbiAgZGF0YTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIGV4dGVuZHNcbiAgUmVjb3JkPHtcbiAgICBuYW1lOiBJVXNlcm5hbWU7XG4gICAgcm9vbTogc3RyaW5nO1xuICAgIHN0YXRlOiBSZWNvcmQ8SUNvZGVTZXNzaW9uPjtcbiAgICBjYXBhYmlsaXRpZXM6IElDYXBhYmlsaXRpZXM7XG4gICAgdXNlcnM6IFJlY29yZDxvYmplY3Q+O1xuICAgIGV2ZW50czogSUV2ZW50W107XG4gIH0+IHtcbn1cblxuZnVuY3Rpb24gaW5pdFNlc3Npb24ocm9vbTogc3RyaW5nLCB1OiBJVXNlckpTT04pIHtcbiAgcmV0dXJuIFJlY29yZCh7IC4uLnUsIHJvb20sIHN0YXRlOiBSZWNvcmQodS5zdGF0ZSkoKSB9KTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29kZVNlc3Mge1xuICByb29tOiBzdHJpbmc7XG4gIGhhc2hDb2RlU2Vzc2lvbjogbnVtYmVyO1xuICBoYXNoQ29kZTogKCkgPT4gbnVtYmVyO1xuICBhZGRFdmVudDogKGU6IElFdmVudCkgPT4gdm9pZDtcbiAgc2V0Um9vbTogKHJvb206IHN0cmluZykgPT4gdm9pZDtcbiAganNvbjogKCkgPT4gSVVzZXJKU09OO1xuICBwcm9jZXNzRXZlbnRzOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBoYXNoU3RvcmU6IHsgW2tleTogbnVtYmVyXTogUmVjb3JkPElDb2RlU2Vzc2lvbj4gfSA9IHt9O1xuZXhwb3J0IGNsYXNzIENvZGVTZXNzaW9uIGltcGxlbWVudHMgSUNvZGVTZXNzIHtcbiAgc2Vzc2lvbjogSVVzZXI7XG4gIGhhc2hDb2RlU2Vzc2lvbjogbnVtYmVyO1xuICBwdWJsaWMgcm9vbSA9IFwiXCI7XG4gIGNyZWF0ZWQ6IHN0cmluZyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgY29uc3RydWN0b3Iocm9vbTogc3RyaW5nLCB1c2VyOiBJVXNlckpTT04pIHtcbiAgICBjb25zdCBzYXZlZFN0YXRlOiBJQ29kZVNlc3Npb24gfCBudWxsID0gbnVsbDtcbiAgICB0aGlzLnJvb20gPSByb29tO1xuICAgIC8vIElmICh1c2VyLnN0YXRlLmNvZGUgPT09IFwiXCIgJiYgcm9vbSkge1xuICAgIC8vIGNvbnN0IGNhY2hlS2V5ID0gYHN0YXRlLSR7cm9vbX1gO1xuXG4gICAgLy8gaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICAvLyAgIGNvbnN0IHNhdmVkU3RhdGVTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZUtleSk7XG4gICAgLy8gICBpZiAoc2F2ZWRTdGF0ZVN0cikge1xuICAgIC8vICAgICBzYXZlZFN0YXRlID0gSlNPTi5wYXJzZShzYXZlZFN0YXRlU3RyKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGZldGNoKGBodHRwczovL3NwaWtlLmxhbmQvYXBpL3Jvb20vJHtyb29tfS9teVNlc3Npb25gKS50aGVuKFxuICAgIC8vICAgICAgIChyZXNwKSA9PiByZXNwLmpzb24oKSxcbiAgICAvLyAgICAgKS50aGVuKChzZXNzaW9uOiBJVXNlckpTT04pID0+IHtcbiAgICAvLyAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYWNoZUtleSwgSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbi5zdGF0ZSkpO1xuICAgIC8vICAgICAgIHRoaXMuc2Vzc2lvbi5zZXQoXCJzdGF0ZVwiLCBSZWNvcmQoc2Vzc2lvbi5zdGF0ZSkoKSk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyB9XG5cbiAgICB0aGlzLnNlc3Npb24gPSBpbml0U2Vzc2lvbihyb29tLCB7XG4gICAgICAuLi51c2VyLFxuICAgICAgc3RhdGU6IHNhdmVkU3RhdGUgPyBzYXZlZFN0YXRlIDogdXNlci5zdGF0ZSxcblxuICAgICAgY2FwYWJpbGl0aWVzOiB7XG4gICAgICAgIC4uLnVzZXIuY2FwYWJpbGl0aWVzLFxuICAgICAgICBzZXNzaW9uU3RvcmFnZTogc3RvcmFnZUF2YWlsYWJsZShcInNlc3Npb25TdG9yYWdlXCIpLFxuICAgICAgfSxcbiAgICB9KSgpO1xuXG4gICAgdGhpcy5oYXNoQ29kZVNlc3Npb24gPSB0aGlzLnNlc3Npb24uZ2V0KFwic3RhdGVcIikuaGFzaENvZGUoKTtcbiAgICBoYXNoU3RvcmVbdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpLmhhc2hDb2RlKCldID0gdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpO1xuICB9XG5cbiAgcHVibGljIGFkZEV2ZW50KGU6IElFdmVudCkge1xuICAgIHRoaXMuc2Vzc2lvbi5nZXQoXCJldmVudHNcIikucHVzaCh7XG4gICAgICAuLi5lLFxuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzRXZlbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNoQ29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpLmhhc2hDb2RlKCk7XG4gIH1cblxuICBwcm9jZXNzRXZlbnRzKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuc2Vzc2lvbi5nZXQoXCJldmVudHNcIik7XG4gICAgY29uc3QgZXZlbnQgPSBldmVudHMuc2hpZnQoKTtcblxuICAgIGlmIChldmVudCkge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjb2RlLWluaXRcIjpcbiAgICAgICAgICBjb25zdCB7IGNvZGUsIHRyYW5zcGlsZWQsIGksIGNzcywgZXJyb3JEaWZmLCBodG1sIH0gPSBldmVudDtcbiAgICAgICAgICBjb25zdCBzZXNzOiBJQ29kZVNlc3Npb24gPSB7XG4gICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgdHJhbnNwaWxlZCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjc3MsXG4gICAgICAgICAgICBlcnJvckRpZmYsXG4gICAgICAgICAgICBodG1sLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLnNlc3Npb24uc2V0KFwiZXZlbnRzXCIsIGV2ZW50cyk7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uLnNldChcInN0YXRlXCIsIFJlY29yZChzZXNzKSgpKTtcblxuICAgICAgICAgIC8vIENvbnN0IGNhY2hlS2V5ID0gYHN0YXRlLSR7dGhpcy5yb29tfWA7XG5cbiAgICAgICAgICAvLyBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgICAgICAgIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVLZXksIEpTT04uc3RyaW5naWZ5KHNlc3MpKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gdGhpcy5zZXNzaW9uLnNldChcImV2ZW50c1wiLCBldmVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVQYXRjaEZyb21IYXNoQ29kZShvbGRIYXNoOiBudW1iZXIsIHN0YXRlOiBJQ29kZVNlc3Npb24pIHtcbiAgICBpZiAoaGFzaFN0b3JlW29sZEhhc2hdKSB7XG4gICAgICBjb25zdCBvbGRSZWMgPSBoYXNoU3RvcmVbb2xkSGFzaF07XG4gICAgICBjb25zdCBvbGRTdGF0ZSA9IEpTT04uc3RyaW5naWZ5KG9sZFJlYy50b0pTT04oKSk7XG5cbiAgICAgIGNvbnN0IG5ld1JlYyA9IG9sZFJlYy5tZXJnZShzdGF0ZSk7XG4gICAgICBjb25zdCBuZXdIYXNoID0gbmV3UmVjLmhhc2hDb2RlKCk7XG4gICAgICBoYXNoU3RvcmVbbmV3SGFzaF0gPSBuZXdSZWM7XG5cbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gSlNPTi5zdHJpbmdpZnkobmV3UmVjLnRvSlNPTigpKTtcbiAgICAgIGNvbnN0IHBhdGNoID0gY3JlYXRlUGF0Y2gob2xkU3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9sZEhhc2gsXG4gICAgICAgIG5ld0hhc2gsXG4gICAgICAgIHBhdGNoLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUGF0Y2goc3RhdGU6IElDb2RlU2Vzc2lvbikge1xuICAgIGlmIChzdGF0ZS5jb2RlID09PSB0aGlzLnNlc3Npb24uZ2V0KFwic3RhdGVcIikuZ2V0KFwiY29kZVwiKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2xkSGFzaDogdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpLmhhc2hDb2RlKCksXG4gICAgICAgIG5ld0hhc2g6IHRoaXMuc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5oYXNoQ29kZSgpLFxuICAgICAgICBwYXRjaDogXCJcIixcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24uZ2V0KFwic3RhdGVcIikudG9KU09OKCkpO1xuXG4gICAgY29uc3Qgb2xkSGFzaCA9IHRoaXMuc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5oYXNoQ29kZSgpO1xuICAgIGhhc2hTdG9yZVtvbGRIYXNoXSA9IHRoaXMuc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKTtcbiAgICBjb25zdCBvbGRSZWMgPSB0aGlzLnNlc3Npb24uZ2V0KFwic3RhdGVcIik7XG5cbiAgICBjb25zdCBuZXdSZWMgPSBvbGRSZWMubWVyZ2Uoc3RhdGUpO1xuICAgIGNvbnN0IG5ld0hhc2ggPSBuZXdSZWMuaGFzaENvZGUoKTtcblxuICAgIGhhc2hTdG9yZVtuZXdIYXNoXSA9IG5ld1JlYztcblxuICAgIGNvbnN0IG5ld1N0YXRlID0gSlNPTi5zdHJpbmdpZnkobmV3UmVjLnRvSlNPTigpKTtcbiAgICBjb25zdCBwYXRjaCA9IGNyZWF0ZVBhdGNoKG9sZFN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9sZEhhc2gsXG4gICAgICBuZXdIYXNoLFxuICAgICAgcGF0Y2gsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVBhdGNoKHtcbiAgICBvbGRIYXNoLFxuICAgIG5ld0hhc2gsXG4gICAgcGF0Y2gsXG4gIH06IHsgb2xkSGFzaDogbnVtYmVyOyBuZXdIYXNoOiBudW1iZXI7IHBhdGNoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IG9sZEhhc2hDaGVjayA9IHRoaXMuc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5oYXNoQ29kZSgpO1xuXG4gICAgaWYgKG9sZEhhc2hDaGVjayAhPT0gb2xkSGFzaCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkNhbnQgdXBkYXRlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9sZFNUID0gdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpLnRvSlNPTigpO1xuICAgIGNvbnN0IG9sZFN0YXRlID0gSlNPTi5zdHJpbmdpZnkob2xkU1QpO1xuICAgIGNvbnN0IG9sZENvZGUgPSBvbGRTVC5jb2RlO1xuICAgIGNvbnN0IG5ld1N0YXRlID0gSlNPTi5wYXJzZShhcHBseVBhdGNoKG9sZFN0YXRlLCBKU09OLnBhcnNlKHBhdGNoKSkpO1xuICAgIGNvbnN0IG5ld1JlYzogUmVjb3JkPElDb2RlU2Vzc2lvbj4gPSBSZWNvcmQ8SUNvZGVTZXNzaW9uPihuZXdTdGF0ZSkoKTtcblxuICAgIGNvbnNvbGUubG9nKHsgbmV3U3RhdGUgfSk7XG4gICAgY29uc29sZS5sb2cobmV3UmVjLmhhc2hDb2RlKCkpO1xuXG4gICAgY29uc3QgbmV3UmVjb3JkID0gdGhpcy5zZXNzaW9uLmdldChcInN0YXRlXCIpLm1lcmdlKG5ld1JlYyk7XG4gICAgY29uc3QgbmV3Q29kZSA9IG5ld1JlY29yZC5nZXQoXCJjb2RlXCIpO1xuICAgIGlmIChvbGRDb2RlID09PSBuZXdDb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobmV3UmVjb3JkLmhhc2hDb2RlKCkpO1xuICAgIGNvbnN0IG5ld0hhc2hDaGVjayA9IG5ld1JlY29yZC5oYXNoQ29kZSgpO1xuXG4gICAgaWYgKG5ld0hhc2hDaGVjayA9PT0gbmV3SGFzaCkge1xuICAgICAgdGhpcy5zZXNzaW9uID0gdGhpcy5zZXNzaW9uLnNldChcInN0YXRlXCIsIG5ld1JlY29yZCk7XG4gICAgICAvLyAgQ29uc29sZS5lcnJvcihcIldST05HIHVwZGF0ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJXUk9OR1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgbmV3U3RhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMganNvbigpIHtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5zZXNzaW9uLnRvSlNPTigpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlci5zdGF0ZS50b0pTT04oKTtcbiAgICByZXR1cm4geyAuLi51c2VyLCBzdGF0ZSB9O1xuICB9XG5cbiAgcHVibGljIHNldFJvb20ocm9vbTogc3RyaW5nKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuc2Vzc2lvbi5zZXQoXCJyb29tXCIsIHJvb20pO1xuICAgIHRoaXMuc2Vzc2lvbiA9IHVzZXI7XG4gIH1cbn1cblxuY29uc3Qgc2Vzc2lvbjogQ29kZVNlc3Npb24gfCBudWxsID0gbnVsbDtcbmV4cG9ydCBkZWZhdWx0IChyb29tOiBzdHJpbmcsIHU6IElVc2VySlNPTik6IElDb2RlU2VzcyA9PlxuICBzZXNzaW9uIHx8IG5ldyBDb2RlU2Vzc2lvbihyb29tLCB1KTtcblxuZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIXdpbmRvdy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0b3JhZ2UgPSB3aW5kb3dbdHlwZSBhcyBrZXlvZiBXaW5kb3ddO1xuICAgIGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcbiAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF0Y2gob2xkQ29kZTogc3RyaW5nLCBuZXdDb2RlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNyZWF0ZURlbHRhKG9sZENvZGUsIG5ld0NvZGUpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxXQUFPLFVBQVUsU0FBVSxVQUFVLE9BQU87QUFDMUMsVUFBSSxTQUFTLElBQ1QsUUFBUTtBQUdaLGVBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsWUFBSSxPQUFPLE1BQU0sSUFDYixZQUFZLEtBQUssSUFDakIsUUFBUSxL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
