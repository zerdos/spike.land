import "./chunk-chunk-F6B7BTH4.mjs";
import "./chunk-chunk-ROIRBYOD.mjs";
import "./chunk-chunk-74LQIDSP.mjs";
import "./chunk-chunk-DM5OAIWZ.mjs";
import {
  Uri,
  editor,
  languages
} from "./chunk-chunk-WGJB5WIY.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/global.js"(exports, module) {
    init_define_process();
    var check = /* @__PURE__ */ __name(function(it) {
      return it && it.Math == Math && it;
    }, "check");
    module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof globalThis == "object" && globalThis) || function() {
      return this;
    }() || Function("return this")();
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/fails.js"(exports, module) {
    init_define_process();
    module.exports = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/descriptors.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    module.exports = !fails(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] != 7;
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-bind-native.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    module.exports = !fails(function() {
      var test = function() {
      }.bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-call.js"(exports, module) {
    init_define_process();
    var NATIVE_BIND = require_function_bind_native();
    var call = Function.prototype.call;
    module.exports = NATIVE_BIND ? call.bind(call) : function() {
      return call.apply(call, arguments);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
    "use strict";
    init_define_process();
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
    exports.f = NASHORN_BUG ? /* @__PURE__ */ __name(function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    }, "propertyIsEnumerable") : $propertyIsEnumerable;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
    init_define_process();
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-uncurry-this.js"(exports, module) {
    init_define_process();
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
      return function() {
        return call.apply(fn, arguments);
      };
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/classof-raw.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis("".slice);
    module.exports = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/indexed-object.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var fails = require_fails();
    var classof = require_classof_raw();
    var $Object = Object;
    var split = uncurryThis("".split);
    module.exports = fails(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split(it, "") : $Object(it);
    } : $Object;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-null-or-undefined.js"(exports, module) {
    init_define_process();
    module.exports = function(it) {
      return it === null || it === void 0;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
    init_define_process();
    var isNullOrUndefined = require_is_null_or_undefined();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isNullOrUndefined(it))
        throw $TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
    init_define_process();
    var IndexedObject = require_indexed_object();
    var requireObjectCoercible = require_require_object_coercible();
    module.exports = function(it) {
      return IndexedObject(requireObjectCoercible(it));
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/document-all.js
var require_document_all = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/document-all.js"(exports, module) {
    init_define_process();
    var documentAll = typeof document == "object" && document.all;
    var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== void 0;
    module.exports = {
      all: documentAll,
      IS_HTMLDDA
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-callable.js"(exports, module) {
    init_define_process();
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-object.js"(exports, module) {
    init_define_process();
    var isCallable = require_is_callable();
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(it) {
      return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
    } : function(it) {
      return typeof it == "object" ? it !== null : isCallable(it);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-built-in.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var isCallable = require_is_callable();
    var aFunction = /* @__PURE__ */ __name(function(argument) {
      return isCallable(argument) ? argument : void 0;
    }, "aFunction");
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global2[namespace]) : global2[namespace] && global2[namespace][method];
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-is-prototype-of.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    module.exports = uncurryThis({}.isPrototypeOf);
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/engine-user-agent.js"(exports, module) {
    init_define_process();
    var getBuiltIn = require_get_built_in();
    module.exports = getBuiltIn("navigator", "userAgent") || "";
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/engine-v8-version.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var userAgent = require_engine_user_agent();
    var process = global2.process;
    var Deno = global2.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match;
    var version;
    if (v8) {
      match = v8.split(".");
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match)
          version = +match[1];
      }
    }
    module.exports = version;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
    init_define_process();
    var V8_VERSION = require_engine_v8_version();
    var fails = require_fails();
    module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
    init_define_process();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-symbol.js"(exports, module) {
    init_define_process();
    var getBuiltIn = require_get_built_in();
    var isCallable = require_is_callable();
    var isPrototypeOf = require_object_is_prototype_of();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var $Object = Object;
    module.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn("Symbol");
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/try-to-string.js"(exports, module) {
    init_define_process();
    var $String = String;
    module.exports = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/a-callable.js"(exports, module) {
    init_define_process();
    var isCallable = require_is_callable();
    var tryToString = require_try_to_string();
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isCallable(argument))
        return argument;
      throw $TypeError(tryToString(argument) + " is not a function");
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-method.js"(exports, module) {
    init_define_process();
    var aCallable = require_a_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable(func);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    init_define_process();
    var call = require_function_call();
    var isCallable = require_is_callable();
    var isObject = require_is_object();
    var $TypeError = TypeError;
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)))
        return val;
      if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      throw $TypeError("Can't convert object to primitive value");
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-pure.js"(exports, module) {
    init_define_process();
    module.exports = false;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/define-global-property.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var defineProperty = Object.defineProperty;
    module.exports = function(key, value) {
      try {
        defineProperty(global2, key, { value, configurable: true, writable: true });
      } catch (error) {
        global2[key] = value;
      }
      return value;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared-store.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var defineGlobalProperty = require_define_global_property();
    var SHARED = "__core-js_shared__";
    var store = global2[SHARED] || defineGlobalProperty(SHARED, {});
    module.exports = store;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared.js"(exports, module) {
    init_define_process();
    var IS_PURE = require_is_pure();
    var store = require_shared_store();
    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.26.1",
      mode: IS_PURE ? "pure" : "global",
      copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-object.js"(exports, module) {
    init_define_process();
    var requireObjectCoercible = require_require_object_coercible();
    var $Object = Object;
    module.exports = function(argument) {
      return $Object(requireObjectCoercible(argument));
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/has-own-property.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var toObject = require_to_object();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module.exports = Object.hasOwn || /* @__PURE__ */ __name(function hasOwn(it, key) {
      return hasOwnProperty(toObject(it), key);
    }, "hasOwn");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/uid.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1 .toString);
    module.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var shared = require_shared();
    var hasOwn = require_has_own_property();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var WellKnownSymbolsStore = shared("wks");
    var Symbol2 = global2.Symbol;
    var symbolFor = Symbol2 && Symbol2["for"];
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module.exports = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        if (NATIVE_SYMBOL && hasOwn(Symbol2, name)) {
          WellKnownSymbolsStore[name] = Symbol2[name];
        } else if (USE_SYMBOL_AS_UID && symbolFor) {
          WellKnownSymbolsStore[name] = symbolFor(description);
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
        }
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-primitive.js"(exports, module) {
    init_define_process();
    var call = require_function_call();
    var isObject = require_is_object();
    var isSymbol = require_is_symbol();
    var getMethod = require_get_method();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol = require_well_known_symbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject(input) || isSymbol(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === void 0)
          pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result))
          return result;
        throw $TypeError("Can't convert object to primitive value");
      }
      if (pref === void 0)
        pref = "number";
      return ordinaryToPrimitive(input, pref);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-property-key.js"(exports, module) {
    init_define_process();
    var toPrimitive = require_to_primitive();
    var isSymbol = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol(key) ? key : key + "";
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/document-create-element.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var isObject = require_is_object();
    var document2 = global2.document;
    var EXISTS = isObject(document2) && isObject(document2.createElement);
    module.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS && !fails(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7;
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var call = require_function_call();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var createPropertyDescriptor = require_create_property_descriptor();
    var toIndexedObject = require_to_indexed_object();
    var toPropertyKey = require_to_property_key();
    var hasOwn = require_has_own_property();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : /* @__PURE__ */ __name(function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPropertyKey(P);
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {
        }
      if (hasOwn(O, P))
        return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    }, "getOwnPropertyDescriptor");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/v8-prototype-define-bug.js"(exports, module) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    module.exports = DESCRIPTORS && fails(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: false
      }).prototype != 42;
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/an-object.js"(exports, module) {
    init_define_process();
    var isObject = require_is_object();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isObject(argument))
        return argument;
      throw $TypeError($String(argument) + " is not an object");
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-define-property.js"(exports) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var anObject = require_an_object();
    var toPropertyKey = require_to_property_key();
    var $TypeError = TypeError;
    var $defineProperty = Object.defineProperty;
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = "enumerable";
    var CONFIGURABLE = "configurable";
    var WRITABLE = "writable";
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? /* @__PURE__ */ __name(function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      }
      return $defineProperty(O, P, Attributes);
    }, "defineProperty") : $defineProperty : /* @__PURE__ */ __name(function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
        }
      if ("get" in Attributes || "set" in Attributes)
        throw $TypeError("Accessors not supported");
      if ("value" in Attributes)
        O[P] = Attributes.value;
      return O;
    }, "defineProperty");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = DESCRIPTORS ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      object[key] = value;
      return object;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-name.js"(exports, module) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var hasOwn = require_has_own_property();
    var FunctionPrototype = Function.prototype;
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn(FunctionPrototype, "name");
    var PROPER = EXISTS && (/* @__PURE__ */ __name(function something() {
    }, "something")).name === "something";
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
    module.exports = {
      EXISTS,
      PROPER,
      CONFIGURABLE
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/inspect-source.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var isCallable = require_is_callable();
    var store = require_shared_store();
    var functionToString = uncurryThis(Function.toString);
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function(it) {
        return functionToString(it);
      };
    }
    module.exports = store.inspectSource;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/weak-map-basic-detection.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var isCallable = require_is_callable();
    var WeakMap = global2.WeakMap;
    module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/shared-key.js"(exports, module) {
    init_define_process();
    var shared = require_shared();
    var uid = require_uid();
    var keys = shared("keys");
    module.exports = function(key) {
      return keys[key] || (keys[key] = uid(key));
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/hidden-keys.js"(exports, module) {
    init_define_process();
    module.exports = {};
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/internal-state.js"(exports, module) {
    init_define_process();
    var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
    var global2 = require_global();
    var isObject = require_is_object();
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var hasOwn = require_has_own_property();
    var shared = require_shared_store();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var TypeError2 = global2.TypeError;
    var WeakMap = global2.WeakMap;
    var set;
    var get;
    var has;
    var enforce = /* @__PURE__ */ __name(function(it) {
      return has(it) ? get(it) : set(it, {});
    }, "enforce");
    var getterFor = /* @__PURE__ */ __name(function(TYPE) {
      return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        }
        return state;
      };
    }, "getterFor");
    if (NATIVE_WEAK_MAP || shared.state) {
      store = shared.state || (shared.state = new WeakMap());
      store.get = store.get;
      store.has = store.has;
      store.set = store.set;
      set = /* @__PURE__ */ __name(function(it, metadata) {
        if (store.has(it))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
      }, "set");
      get = /* @__PURE__ */ __name(function(it) {
        return store.get(it) || {};
      }, "get");
      has = /* @__PURE__ */ __name(function(it) {
        return store.has(it);
      }, "has");
    } else {
      STATE = sharedKey("state");
      hiddenKeys[STATE] = true;
      set = /* @__PURE__ */ __name(function(it, metadata) {
        if (hasOwn(it, STATE))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      }, "set");
      get = /* @__PURE__ */ __name(function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
      }, "get");
      has = /* @__PURE__ */ __name(function(it) {
        return hasOwn(it, STATE);
      }, "has");
    }
    var store;
    var STATE;
    module.exports = {
      set,
      get,
      has,
      enforce,
      getterFor
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/make-built-in.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    var isCallable = require_is_callable();
    var hasOwn = require_has_own_property();
    var DESCRIPTORS = require_descriptors();
    var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
    var inspectSource = require_inspect_source();
    var InternalStateModule = require_internal_state();
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var defineProperty = Object.defineProperty;
    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
      return defineProperty(function() {
      }, "length", { value: 8 }).length !== 8;
    });
    var TEMPLATE = String(String).split("String");
    var makeBuiltIn = module.exports = function(value, name, options) {
      if (String(name).slice(0, 7) === "Symbol(") {
        name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
      }
      if (options && options.getter)
        name = "get " + name;
      if (options && options.setter)
        name = "set " + name;
      if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS)
          defineProperty(value, "name", { value: name, configurable: true });
        else
          value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
        defineProperty(value, "length", { value: options.arity });
      }
      try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
          if (DESCRIPTORS)
            defineProperty(value, "prototype", { writable: false });
        } else if (value.prototype)
          value.prototype = void 0;
      } catch (error) {
      }
      var state = enforceInternalState(value);
      if (!hasOwn(state, "source")) {
        state.source = TEMPLATE.join(typeof name == "string" ? name : "");
      }
      return value;
    };
    Function.prototype.toString = makeBuiltIn(/* @__PURE__ */ __name(function toString() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, "toString"), "toString");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/define-built-in.js"(exports, module) {
    init_define_process();
    var isCallable = require_is_callable();
    var definePropertyModule = require_object_define_property();
    var makeBuiltIn = require_make_built_in();
    var defineGlobalProperty = require_define_global_property();
    module.exports = function(O, key, value, options) {
      if (!options)
        options = {};
      var simple = options.enumerable;
      var name = options.name !== void 0 ? options.name : key;
      if (isCallable(value))
        makeBuiltIn(value, name, options);
      if (options.global) {
        if (simple)
          O[key] = value;
        else
          defineGlobalProperty(key, value);
      } else {
        try {
          if (!options.unsafe)
            delete O[key];
          else if (O[key])
            simple = true;
        } catch (error) {
        }
        if (simple)
          O[key] = value;
        else
          definePropertyModule.f(O, key, {
            value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          });
      }
      return O;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/math-trunc.js"(exports, module) {
    init_define_process();
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = Math.trunc || /* @__PURE__ */ __name(function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    }, "trunc");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-integer-or-infinity.js"(exports, module) {
    init_define_process();
    var trunc = require_math_trunc();
    module.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
    init_define_process();
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var max = Math.max;
    var min = Math.min;
    module.exports = function(index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-length.js"(exports, module) {
    init_define_process();
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var min = Math.min;
    module.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/length-of-array-like.js"(exports, module) {
    init_define_process();
    var toLength = require_to_length();
    module.exports = function(obj) {
      return toLength(obj.length);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/array-includes.js"(exports, module) {
    init_define_process();
    var toIndexedObject = require_to_indexed_object();
    var toAbsoluteIndex = require_to_absolute_index();
    var lengthOfArrayLike = require_length_of_array_like();
    var createMethod = /* @__PURE__ */ __name(function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        if (IS_INCLUDES && el != el)
          while (length > index) {
            value = O[index++];
            if (value != value)
              return true;
          }
        else
          for (; length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el)
              return IS_INCLUDES || index || 0;
          }
        return !IS_INCLUDES && -1;
      };
    }, "createMethod");
    module.exports = {
      includes: createMethod(true),
      indexOf: createMethod(false)
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var hasOwn = require_has_own_property();
    var toIndexedObject = require_to_indexed_object();
    var indexOf = require_array_includes().indexOf;
    var hiddenKeys = require_hidden_keys();
    var push = uncurryThis([].push);
    module.exports = function(object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O)
        !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      while (names.length > i)
        if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key);
        }
      return result;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
    init_define_process();
    module.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ];
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
    init_define_process();
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || /* @__PURE__ */ __name(function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    }, "getOwnPropertyNames");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
    init_define_process();
    exports.f = Object.getOwnPropertySymbols;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/own-keys.js"(exports, module) {
    init_define_process();
    var getBuiltIn = require_get_built_in();
    var uncurryThis = require_function_uncurry_this();
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var anObject = require_an_object();
    var concat = uncurryThis([].concat);
    module.exports = getBuiltIn("Reflect", "ownKeys") || /* @__PURE__ */ __name(function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    }, "ownKeys");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
    init_define_process();
    var hasOwn = require_has_own_property();
    var ownKeys = require_own_keys();
    var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
    var definePropertyModule = require_object_define_property();
    module.exports = function(target, source, exceptions) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      }
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-forced.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    var isCallable = require_is_callable();
    var replacement = /#|\.prototype\./;
    var isForced = /* @__PURE__ */ __name(function(feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
    }, "isForced");
    var normalize = isForced.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    };
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = "N";
    var POLYFILL = isForced.POLYFILL = "P";
    module.exports = isForced;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/export.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var defineBuiltIn = require_define_built_in();
    var defineGlobalProperty = require_define_global_property();
    var copyConstructorProperties = require_copy_constructor_properties();
    var isForced = require_is_forced();
    module.exports = function(options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global2;
      } else if (STATIC) {
        target = global2[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global2[TARGET] || {}).prototype;
      }
      if (target)
        for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
          } else
            targetProperty = target[key];
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED && targetProperty !== void 0) {
            if (typeof sourceProperty == typeof targetProperty)
              continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty(sourceProperty, "sham", true);
          }
          defineBuiltIn(target, key, sourceProperty, options);
        }
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
    init_define_process();
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
    var test = {};
    test[TO_STRING_TAG] = "z";
    module.exports = String(test) === "[object z]";
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/classof.js"(exports, module) {
    init_define_process();
    var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
    var isCallable = require_is_callable();
    var classofRaw = require_classof_raw();
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
    var $Object = Object;
    var CORRECT_ARGUMENTS = classofRaw(function() {
      return arguments;
    }()) == "Arguments";
    var tryGet = /* @__PURE__ */ __name(function(it, key) {
      try {
        return it[key];
      } catch (error) {
      }
    }, "tryGet");
    module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable(O.callee) ? "Arguments" : result;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-string.js
var require_to_string = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/to-string.js"(exports, module) {
    init_define_process();
    var classof = require_classof();
    var $String = String;
    module.exports = function(argument) {
      if (classof(argument) === "Symbol")
        throw TypeError("Cannot convert a Symbol value to a string");
      return $String(argument);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-flags.js
var require_regexp_flags = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-flags.js"(exports, module) {
    "use strict";
    init_define_process();
    var anObject = require_an_object();
    module.exports = function() {
      var that = anObject(this);
      var result = "";
      if (that.hasIndices)
        result += "d";
      if (that.global)
        result += "g";
      if (that.ignoreCase)
        result += "i";
      if (that.multiline)
        result += "m";
      if (that.dotAll)
        result += "s";
      if (that.unicode)
        result += "u";
      if (that.unicodeSets)
        result += "v";
      if (that.sticky)
        result += "y";
      return result;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-sticky-helpers.js
var require_regexp_sticky_helpers = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-sticky-helpers.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    var global2 = require_global();
    var $RegExp = global2.RegExp;
    var UNSUPPORTED_Y = fails(function() {
      var re = $RegExp("a", "y");
      re.lastIndex = 2;
      return re.exec("abcd") != null;
    });
    var MISSED_STICKY = UNSUPPORTED_Y || fails(function() {
      return !$RegExp("a", "y").sticky;
    });
    var BROKEN_CARET = UNSUPPORTED_Y || fails(function() {
      var re = $RegExp("^r", "gy");
      re.lastIndex = 2;
      return re.exec("str") != null;
    });
    module.exports = {
      BROKEN_CARET,
      MISSED_STICKY,
      UNSUPPORTED_Y
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-keys.js"(exports, module) {
    init_define_process();
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    module.exports = Object.keys || /* @__PURE__ */ __name(function keys(O) {
      return internalObjectKeys(O, enumBugKeys);
    }, "keys");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-define-properties.js"(exports) {
    init_define_process();
    var DESCRIPTORS = require_descriptors();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var definePropertyModule = require_object_define_property();
    var anObject = require_an_object();
    var toIndexedObject = require_to_indexed_object();
    var objectKeys = require_object_keys();
    exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : /* @__PURE__ */ __name(function defineProperties(O, Properties) {
      anObject(O);
      var props = toIndexedObject(Properties);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index)
        definePropertyModule.f(O, key = keys[index++], props[key]);
      return O;
    }, "defineProperties");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/html.js
var require_html = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/html.js"(exports, module) {
    init_define_process();
    var getBuiltIn = require_get_built_in();
    module.exports = getBuiltIn("document", "documentElement");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/object-create.js"(exports, module) {
    init_define_process();
    var anObject = require_an_object();
    var definePropertiesModule = require_object_define_properties();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = require_hidden_keys();
    var html = require_html();
    var documentCreateElement = require_document_create_element();
    var sharedKey = require_shared_key();
    var GT = ">";
    var LT = "<";
    var PROTOTYPE = "prototype";
    var SCRIPT = "script";
    var IE_PROTO = sharedKey("IE_PROTO");
    var EmptyConstructor = /* @__PURE__ */ __name(function() {
    }, "EmptyConstructor");
    var scriptTag = /* @__PURE__ */ __name(function(content) {
      return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
    }, "scriptTag");
    var NullProtoObjectViaActiveX = /* @__PURE__ */ __name(function(activeXDocument2) {
      activeXDocument2.write(scriptTag(""));
      activeXDocument2.close();
      var temp = activeXDocument2.parentWindow.Object;
      activeXDocument2 = null;
      return temp;
    }, "NullProtoObjectViaActiveX");
    var NullProtoObjectViaIFrame = /* @__PURE__ */ __name(function() {
      var iframe = documentCreateElement("iframe");
      var JS = "java" + SCRIPT + ":";
      var iframeDocument;
      iframe.style.display = "none";
      html.appendChild(iframe);
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag("document.F=Object"));
      iframeDocument.close();
      return iframeDocument.F;
    }, "NullProtoObjectViaIFrame");
    var activeXDocument;
    var NullProtoObject = /* @__PURE__ */ __name(function() {
      try {
        activeXDocument = new ActiveXObject("htmlfile");
      } catch (error) {
      }
      NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
      var length = enumBugKeys.length;
      while (length--)
        delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return NullProtoObject();
    }, "NullProtoObject");
    hiddenKeys[IE_PROTO] = true;
    module.exports = Object.create || /* @__PURE__ */ __name(function create2(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        result[IE_PROTO] = O;
      } else
        result = NullProtoObject();
      return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
    }, "create");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-unsupported-dot-all.js
var require_regexp_unsupported_dot_all = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-unsupported-dot-all.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    var global2 = require_global();
    var $RegExp = global2.RegExp;
    module.exports = fails(function() {
      var re = $RegExp(".", "s");
      return !(re.dotAll && re.exec("\n") && re.flags === "s");
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-unsupported-ncg.js
var require_regexp_unsupported_ncg = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-unsupported-ncg.js"(exports, module) {
    init_define_process();
    var fails = require_fails();
    var global2 = require_global();
    var $RegExp = global2.RegExp;
    module.exports = fails(function() {
      var re = $RegExp("(?<a>b)", "g");
      return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-exec.js
var require_regexp_exec = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-exec.js"(exports, module) {
    "use strict";
    init_define_process();
    var call = require_function_call();
    var uncurryThis = require_function_uncurry_this();
    var toString = require_to_string();
    var regexpFlags = require_regexp_flags();
    var stickyHelpers = require_regexp_sticky_helpers();
    var shared = require_shared();
    var create2 = require_object_create();
    var getInternalState = require_internal_state().get;
    var UNSUPPORTED_DOT_ALL = require_regexp_unsupported_dot_all();
    var UNSUPPORTED_NCG = require_regexp_unsupported_ncg();
    var nativeReplace = shared("native-string-replace", String.prototype.replace);
    var nativeExec = RegExp.prototype.exec;
    var patchedExec = nativeExec;
    var charAt = uncurryThis("".charAt);
    var indexOf = uncurryThis("".indexOf);
    var replace = uncurryThis("".replace);
    var stringSlice = uncurryThis("".slice);
    var UPDATES_LAST_INDEX_WRONG = function() {
      var re1 = /a/;
      var re2 = /b*/g;
      call(nativeExec, re1, "a");
      call(nativeExec, re2, "a");
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    }();
    var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
    var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
    if (PATCH) {
      patchedExec = /* @__PURE__ */ __name(function exec(string) {
        var re = this;
        var state = getInternalState(re);
        var str = toString(string);
        var raw = state.raw;
        var result, reCopy, lastIndex, match, i, object, group;
        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = call(patchedExec, raw, str);
          re.lastIndex = raw.lastIndex;
          return result;
        }
        var groups = state.groups;
        var sticky = UNSUPPORTED_Y && re.sticky;
        var flags = call(regexpFlags, re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;
        if (sticky) {
          flags = replace(flags, "y", "");
          if (indexOf(flags, "g") === -1) {
            flags += "g";
          }
          strCopy = stringSlice(str, re.lastIndex);
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== "\n")) {
            source = "(?: " + source + ")";
            strCopy = " " + strCopy;
            charsAdded++;
          }
          reCopy = new RegExp("^(?:" + source + ")", flags);
        }
        if (NPCG_INCLUDED) {
          reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
        }
        if (UPDATES_LAST_INDEX_WRONG)
          lastIndex = re.lastIndex;
        match = call(nativeExec, sticky ? reCopy : re, strCopy);
        if (sticky) {
          if (match) {
            match.input = stringSlice(match.input, charsAdded);
            match[0] = stringSlice(match[0], charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else
            re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          call(nativeReplace, match[0], reCopy, function() {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === void 0)
                match[i] = void 0;
            }
          });
        }
        if (match && groups) {
          match.groups = object = create2(null);
          for (i = 0; i < groups.length; i++) {
            group = groups[i];
            object[group[0]] = match[group[1]];
          }
        }
        return match;
      }, "exec");
    }
    module.exports = patchedExec;
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.regexp.exec.js
var require_es_regexp_exec = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.regexp.exec.js"() {
    "use strict";
    init_define_process();
    var $ = require_export();
    var exec = require_regexp_exec();
    $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
      exec
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-apply.js
var require_function_apply = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-apply.js"(exports, module) {
    init_define_process();
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype = Function.prototype;
    var apply = FunctionPrototype.apply;
    var call = FunctionPrototype.call;
    module.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
      return call.apply(apply, arguments);
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-uncurry-this-clause.js
var require_function_uncurry_this_clause = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/function-uncurry-this-clause.js"(exports, module) {
    init_define_process();
    var classofRaw = require_classof_raw();
    var uncurryThis = require_function_uncurry_this();
    module.exports = function(fn) {
      if (classofRaw(fn) === "Function")
        return uncurryThis(fn);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
var require_fix_regexp_well_known_symbol_logic = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js"(exports, module) {
    "use strict";
    init_define_process();
    require_es_regexp_exec();
    var uncurryThis = require_function_uncurry_this_clause();
    var defineBuiltIn = require_define_built_in();
    var regexpExec = require_regexp_exec();
    var fails = require_fails();
    var wellKnownSymbol = require_well_known_symbol();
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var SPECIES = wellKnownSymbol("species");
    var RegExpPrototype = RegExp.prototype;
    module.exports = function(KEY, exec, FORCED, SHAM) {
      var SYMBOL = wellKnownSymbol(KEY);
      var DELEGATES_TO_SYMBOL = !fails(function() {
        var O = {};
        O[SYMBOL] = function() {
          return 7;
        };
        return ""[KEY](O) != 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
        var execCalled = false;
        var re = /a/;
        if (KEY === "split") {
          re = {};
          re.constructor = {};
          re.constructor[SPECIES] = function() {
            return re;
          };
          re.flags = "";
          re[SYMBOL] = /./[SYMBOL];
        }
        re.exec = function() {
          execCalled = true;
          return null;
        };
        re[SYMBOL]("");
        return !execCalled;
      });
      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
        var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
        var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
          var uncurriedNativeMethod = uncurryThis(nativeMethod);
          var $exec = regexp.exec;
          if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
            }
            return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
          }
          return { done: false };
        });
        defineBuiltIn(String.prototype, KEY, methods[0]);
        defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
      }
      if (SHAM)
        createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/string-multibyte.js
var require_string_multibyte = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/string-multibyte.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var toString = require_to_string();
    var requireObjectCoercible = require_require_object_coercible();
    var charAt = uncurryThis("".charAt);
    var charCodeAt = uncurryThis("".charCodeAt);
    var stringSlice = uncurryThis("".slice);
    var createMethod = /* @__PURE__ */ __name(function(CONVERT_TO_STRING) {
      return function($this, pos) {
        var S = toString(requireObjectCoercible($this));
        var position = toIntegerOrInfinity(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size)
          return CONVERT_TO_STRING ? "" : void 0;
        first = charCodeAt(S, position);
        return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
      };
    }, "createMethod");
    module.exports = {
      codeAt: createMethod(false),
      charAt: createMethod(true)
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/advance-string-index.js
var require_advance_string_index = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/advance-string-index.js"(exports, module) {
    "use strict";
    init_define_process();
    var charAt = require_string_multibyte().charAt;
    module.exports = function(S, index, unicode) {
      return index + (unicode ? charAt(S, index).length : 1);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-substitution.js
var require_get_substitution = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/get-substitution.js"(exports, module) {
    init_define_process();
    var uncurryThis = require_function_uncurry_this();
    var toObject = require_to_object();
    var floor = Math.floor;
    var charAt = uncurryThis("".charAt);
    var replace = uncurryThis("".replace);
    var stringSlice = uncurryThis("".slice);
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
    module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== void 0) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return replace(replacement, symbols, function(match, ch) {
        var capture;
        switch (charAt(ch, 0)) {
          case "$":
            return "$";
          case "&":
            return matched;
          case "`":
            return stringSlice(str, 0, position);
          case "'":
            return stringSlice(str, tailPos);
          case "<":
            capture = namedCaptures[stringSlice(ch, 1, -1)];
            break;
          default:
            var n = +ch;
            if (n === 0)
              return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0)
                return match;
              if (f <= m)
                return captures[f - 1] === void 0 ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === void 0 ? "" : capture;
      });
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-exec-abstract.js
var require_regexp_exec_abstract = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-exec-abstract.js"(exports, module) {
    init_define_process();
    var call = require_function_call();
    var anObject = require_an_object();
    var isCallable = require_is_callable();
    var classof = require_classof_raw();
    var regexpExec = require_regexp_exec();
    var $TypeError = TypeError;
    module.exports = function(R, S) {
      var exec = R.exec;
      if (isCallable(exec)) {
        var result = call(exec, R, S);
        if (result !== null)
          anObject(result);
        return result;
      }
      if (classof(R) === "RegExp")
        return call(regexpExec, R, S);
      throw $TypeError("RegExp#exec called on incompatible receiver");
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.string.replace.js
var require_es_string_replace = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.string.replace.js"() {
    "use strict";
    init_define_process();
    var apply = require_function_apply();
    var call = require_function_call();
    var uncurryThis = require_function_uncurry_this();
    var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
    var fails = require_fails();
    var anObject = require_an_object();
    var isCallable = require_is_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var toLength = require_to_length();
    var toString = require_to_string();
    var requireObjectCoercible = require_require_object_coercible();
    var advanceStringIndex = require_advance_string_index();
    var getMethod = require_get_method();
    var getSubstitution = require_get_substitution();
    var regExpExec = require_regexp_exec_abstract();
    var wellKnownSymbol = require_well_known_symbol();
    var REPLACE = wellKnownSymbol("replace");
    var max = Math.max;
    var min = Math.min;
    var concat = uncurryThis([].concat);
    var push = uncurryThis([].push);
    var stringIndexOf = uncurryThis("".indexOf);
    var stringSlice = uncurryThis("".slice);
    var maybeToString = /* @__PURE__ */ __name(function(it) {
      return it === void 0 ? it : String(it);
    }, "maybeToString");
    var REPLACE_KEEPS_$0 = function() {
      return "a".replace(/./, "$0") === "$0";
    }();
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
      if (/./[REPLACE]) {
        return /./[REPLACE]("a", "$0") === "";
      }
      return false;
    }();
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
      var re = /./;
      re.exec = function() {
        var result = [];
        result.groups = { a: "7" };
        return result;
      };
      return "".replace(re, "$<a>") !== "7";
    });
    fixRegExpWellKnownSymbolLogic("replace", function(_, nativeReplace, maybeCallNative) {
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
      return [
        /* @__PURE__ */ __name(function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = isNullOrUndefined(searchValue) ? void 0 : getMethod(searchValue, REPLACE);
          return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace, toString(O), searchValue, replaceValue);
        }, "replace"),
        function(string, replaceValue) {
          var rx = anObject(this);
          var S = toString(string);
          if (typeof replaceValue == "string" && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, "$<") === -1) {
            var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
            if (res.done)
              return res.value;
          }
          var functionalReplace = isCallable(replaceValue);
          if (!functionalReplace)
            replaceValue = toString(replaceValue);
          var global2 = rx.global;
          if (global2) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regExpExec(rx, S);
            if (result === null)
              break;
            push(results, result);
            if (!global2)
              break;
            var matchStr = toString(result[0]);
            if (matchStr === "")
              rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }
          var accumulatedResult = "";
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];
            var matched = toString(result[0]);
            var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
            var captures = [];
            for (var j = 1; j < result.length; j++)
              push(captures, maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = concat([matched], captures, position, S);
              if (namedCaptures !== void 0)
                push(replacerArgs, namedCaptures);
              var replacement = toString(apply(replaceValue, void 0, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + stringSlice(S, nextSourcePosition);
        }
      ];
    }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-regexp.js
var require_is_regexp = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/is-regexp.js"(exports, module) {
    init_define_process();
    var isObject = require_is_object();
    var classof = require_classof_raw();
    var wellKnownSymbol = require_well_known_symbol();
    var MATCH = wellKnownSymbol("match");
    module.exports = function(it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-get-flags.js
var require_regexp_get_flags = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/regexp-get-flags.js"(exports, module) {
    init_define_process();
    var call = require_function_call();
    var hasOwn = require_has_own_property();
    var isPrototypeOf = require_object_is_prototype_of();
    var regExpFlags = require_regexp_flags();
    var RegExpPrototype = RegExp.prototype;
    module.exports = function(R) {
      var flags = R.flags;
      return flags === void 0 && !("flags" in RegExpPrototype) && !hasOwn(R, "flags") && isPrototypeOf(RegExpPrototype, R) ? call(regExpFlags, R) : flags;
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.string.replace-all.js
var require_es_string_replace_all = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/modules/es.string.replace-all.js"() {
    "use strict";
    init_define_process();
    var $ = require_export();
    var call = require_function_call();
    var uncurryThis = require_function_uncurry_this();
    var requireObjectCoercible = require_require_object_coercible();
    var isCallable = require_is_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    var isRegExp = require_is_regexp();
    var toString = require_to_string();
    var getMethod = require_get_method();
    var getRegExpFlags = require_regexp_get_flags();
    var getSubstitution = require_get_substitution();
    var wellKnownSymbol = require_well_known_symbol();
    var IS_PURE = require_is_pure();
    var REPLACE = wellKnownSymbol("replace");
    var $TypeError = TypeError;
    var indexOf = uncurryThis("".indexOf);
    var replace = uncurryThis("".replace);
    var stringSlice = uncurryThis("".slice);
    var max = Math.max;
    var stringIndexOf = /* @__PURE__ */ __name(function(string, searchValue, fromIndex) {
      if (fromIndex > string.length)
        return -1;
      if (searchValue === "")
        return fromIndex;
      return indexOf(string, searchValue, fromIndex);
    }, "stringIndexOf");
    $({ target: "String", proto: true }, {
      replaceAll: /* @__PURE__ */ __name(function replaceAll2(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
        var position = 0;
        var endOfLastMatch = 0;
        var result = "";
        if (!isNullOrUndefined(searchValue)) {
          IS_REG_EXP = isRegExp(searchValue);
          if (IS_REG_EXP) {
            flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
            if (!~indexOf(flags, "g"))
              throw $TypeError("`.replaceAll` does not allow non-global regexes");
          }
          replacer = getMethod(searchValue, REPLACE);
          if (replacer) {
            return call(replacer, searchValue, O, replaceValue);
          } else if (IS_PURE && IS_REG_EXP) {
            return replace(toString(O), searchValue, replaceValue);
          }
        }
        string = toString(O);
        searchString = toString(searchValue);
        functionalReplace = isCallable(replaceValue);
        if (!functionalReplace)
          replaceValue = toString(replaceValue);
        searchLength = searchString.length;
        advanceBy = max(1, searchLength);
        position = stringIndexOf(string, searchString, 0);
        while (position !== -1) {
          replacement = functionalReplace ? toString(replaceValue(searchString, position, string)) : getSubstitution(searchString, string, position, [], void 0, replaceValue);
          result += stringSlice(string, endOfLastMatch, position) + replacement;
          endOfLastMatch = position + searchLength;
          position = stringIndexOf(string, searchString, position + advanceBy);
        }
        if (endOfLastMatch < string.length) {
          result += stringSlice(string, endOfLastMatch);
        }
        return result;
      }, "replaceAll")
    });
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/entry-unbind.js
var require_entry_unbind = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/internals/entry-unbind.js"(exports, module) {
    init_define_process();
    var global2 = require_global();
    var uncurryThis = require_function_uncurry_this();
    module.exports = function(CONSTRUCTOR, METHOD) {
      return uncurryThis(global2[CONSTRUCTOR].prototype[METHOD]);
    };
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/es/string/replace-all.js
var require_replace_all = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/es/string/replace-all.js"(exports, module) {
    init_define_process();
    require_es_regexp_exec();
    require_es_string_replace();
    require_es_string_replace_all();
    var entryUnbind = require_entry_unbind();
    module.exports = entryUnbind("String", "replaceAll");
  }
});

// ../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/stable/string/replace-all.js
var require_replace_all2 = __commonJS({
  "../../.yarn/unplugged/core-js-npm-3.26.1-42575888f8/node_modules/core-js/stable/string/replace-all.js"(exports, module) {
    init_define_process();
    var parent = require_replace_all();
    module.exports = parent;
  }
});

// js/startMonaco.ts
init_define_process();

// js/monacoExtra.ts
init_define_process();
var import_replace_all = __toESM(require_replace_all2(), 1);
function extraStuff(code, uri, typescript) {
  const getTsWorker = /* @__PURE__ */ __name(() => typescript.getTypeScriptWorker(), "getTsWorker");
  const addExtraLib = /* @__PURE__ */ __name((content, filePath) => typescript.typescriptDefaults.addExtraLib(content, filePath), "addExtraLib");
  const setExtraLibs = /* @__PURE__ */ __name((libs) => typescript.typescriptDefaults.setExtraLibs(libs), "setExtraLibs");
  const extraModelCache = {};
  const extraModels = {};
  Object.assign(globalThis, { extraModels, extraModelCache });
  const addExtraModels = /* @__PURE__ */ __name(async (code2, url) => {
    try {
      if (extraModels[url])
        return;
      extraModels[url] = [];
      const baSe = new URL(".", url).toString();
      const parent = new URL("..", url).toString();
      const gParent = new URL("../..", url).toString();
      const ggParent = new URL("../../..", url).toString();
      let replaced = removeComments(code2);
      replaced = replaceAll(replaced, ` from '../../`, ` from '${ggParent}`);
      replaced = replaceAll(replaced, ` from "../../`, ` from "${ggParent}`);
      replaced = replaceAll(replaced, ` from '../../`, ` from '${gParent}`);
      replaced = replaceAll(replaced, ` from "../../`, ` from "${gParent}`);
      replaced = replaceAll(replaced, ` from '../`, ` from '${parent}`);
      replaced = replaceAll(replaced, ` from './`, ` from '${baSe}`);
      replaced = replaceAll(replaced, ` from "../`, ` from "${parent}`);
      replaced = replaceAll(replaced, ` from "./`, ` from "${baSe}`);
      extraModelCache[url] = replaced;
      const regex = /((https:\/\/)+[^\s.]+\.[\w][^\s]+)/gm;
      const models = replaced.matchAll(regex);
      for (const match of models) {
        try {
          const dts = match[0].indexOf(".d.ts");
          if (!match[0].includes("spike.land"))
            continue;
          if (dts === -1)
            continue;
          const extraModel = match[0].slice(0, dts + 5);
          if (extraModels[url].includes(extraModel))
            continue;
          extraModels[url].push(extraModel);
          if (extraModels[extraModel])
            continue;
          if (extraModelCache[extraModel])
            continue;
          let extraModelUrl = new URL(extraModel, location.origin).toString();
          const extraModelContent = await fetch(extraModelUrl).then(
            (resp) => resp.status === 307 ? fetch(resp.headers.get("location")) : resp
          ).then((res) => {
            extraModelUrl = res.url;
            return res.text();
          });
          if (extraModelUrl !== extraModel) {
            extraModelCache[url] = replaceAll(
              extraModelCache[url],
              extraModel,
              extraModelUrl
            );
          }
          extraModelCache[extraModelUrl] = extraModelContent;
          await addExtraModels(extraModelCache[extraModelUrl], extraModelUrl);
        } catch (err) {
          console.error("Error in add extra models", code2, url, { err });
        }
      }
    } catch (err) {
      console.log("error in extra lib  mining", url, { err });
      return;
    }
  }, "addExtraModels");
  const replaceMaps = {};
  const ATA = /* @__PURE__ */ __name(async () => {
    console.log("ATA");
    const mappings = (await Promise.all(
      (await (await (await getTsWorker())(uri)).getSemanticDiagnostics(
        uri.toString()
      )).map((x) => {
        return x.messageText;
      }).filter(
        (x) => typeof x === "string" && x.includes(" or its corresponding type declarations.")
      ).map((x) => typeof x === "string" && x.split("'")[1]).map(
        async (mod3) => {
          const retMod = { url: "", mod: mod3, content: "" };
          if (mod3 && mod3.startsWith("https://")) {
            return retMod;
          }
          retMod.content = await fetch("/npm:/" + mod3).then(
            (resp) => resp.status === 307 ? fetch(resp.headers.get("location")) : resp
          ).then((x) => {
            retMod.url = x.headers.get("x-dts");
            console.log(retMod.url);
            return fetch(retMod.url).then(
              (resp) => resp.status === 307 || resp.redirected ? fetch(retMod.url = resp.url) : resp
            ).then((resp) => resp.text());
          }).catch(() => "") || "";
          return retMod;
        }
      )
    )).filter((m) => m.mod && m.content).map(async (m) => {
      console.log(`Aga-Insert: ${m.mod}`);
      await addExtraModels(
        m.content,
        m.url
      );
      return {
        [location.origin + `/node_modules/${m.mod}/index.d.ts`]: m.url
      };
    });
    const maps = await Promise.all(mappings);
    maps.forEach((m) => Object.assign(replaceMaps, m));
    console.log({ replaceMaps });
    const extraLib2 = xxxsetExtraLibs();
    extraLib2.map((lib2) => {
      addExtraLib(
        lib2.content,
        lib2.filePath
      );
    });
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }, "ATA");
  const xxxsetExtraLibs = /* @__PURE__ */ __name(() => {
    const versionNumbers = /@\d+.\d+.\d+/gm;
    const types = /\/types\//gm;
    const extraLibs = Object.keys(extraModelCache).map((filePath) => {
      const url = replaceMappings(filePath, replaceMaps).replaceAll(
        versionNumbers,
        ``
      ).replaceAll(types, `/`);
      const fileDir = new URL(".", url).toString();
      const content = replaceMappings(extraModelCache[filePath], replaceMaps).replaceAll(versionNumbers, ``).replaceAll(types, `/`);
      const fileDirRemoved = replaceAll(content, fileDir, "./");
      const linksRemoved = replaceAll(
        fileDirRemoved,
        location.origin + "/node_modules/",
        ""
      );
      const indexDtsRemoved = replaceAll(linksRemoved, "/index.d.ts", "");
      const dtsRemoved = replaceAll(indexDtsRemoved, ".d.ts", "");
      return {
        filePath: url,
        content: dtsRemoved
      };
    });
    console.log({ extraLibs });
    setExtraLibs(
      extraLibs
    );
    return extraLibs;
  }, "xxxsetExtraLibs");
  const extraLib = xxxsetExtraLibs();
  extraLib.map((lib2) => {
    addExtraLib(
      lib2.content,
      lib2.filePath
    );
  });
  const mod2 = {
    ATA,
    silent: false,
    code
  };
  setTimeout(() => mod2.ATA(), 2e3);
}
__name(extraStuff, "extraStuff");
function replaceAll(input, search, replace) {
  return input.split(search).join(replace);
}
__name(replaceAll, "replaceAll");
function replaceMappings(input, maps) {
  let result = input;
  Object.keys(maps).map((x) => result = replaceAll(result, maps[x], x));
  return result;
}
__name(replaceMappings, "replaceMappings");
function removeComments(str) {
  const regex = /\/\*.*?\*\//gi;
  /\/\*.*?\*\//gi;
  return str.replaceAll(regex, ``).split(`
`).filter(
    (x) => x && x.trim() && (!x.trim().startsWith("//") || x.includes("reference"))
  ).join(`
`);
}
__name(removeComments, "removeComments");

// js/monacoWorkers.mjs
init_define_process();

// js/monaco-workers/editor/editor.workerJs.js
var editor_workerJs_default = "./chunk-editor.workerJs-G3OUBT6S.js";

// js/monaco-workers/language/css/css.workerJs.js
var css_workerJs_default = "./chunk-css.workerJs-XFKEKMBP.js";

// js/monaco-workers/language/html/html.workerJs.js
var html_workerJs_default = "./chunk-html.workerJs-L4HU7DYI.js";

// js/monaco-workers/language/json/json.workerJs.js
var json_workerJs_default = "./chunk-json.workerJs-USJSULMW.js";

// js/monaco-workers/language/typescript/ts.workerJs.js
var ts_workerJs_default = "./chunk-ts.workerJs-FTMRK6M4.js";

// js/monacoWorkers.mjs
var getWorkerUrl = /* @__PURE__ */ __name((_moduleId, label) => {
  if (label === "json") {
    return new URL(json_workerJs_default, location.origin).toString();
  }
  if (label === "css" || label === "scss" || label === "less") {
    return new URL(css_workerJs_default, location.origin).toString();
  }
  if (label === "html" || label === "handlebars" || label === "razor") {
    return new URL(html_workerJs_default, location.origin).toString();
  }
  if (label === "typescript" || label === "javascript") {
    return new URL(ts_workerJs_default, location.origin).toString();
  }
  return new URL(editor_workerJs_default, location.origin).toString();
}, "getWorkerUrl");

// js/startMonaco.ts
var { createModel } = editor;
var create = editor.create;
var originToUse = window.origin.includes("spike") ? location.origin : "https://testing.spike.land/";
var lib = [
  "dom",
  "dom.iterable",
  "es2015.collection",
  "es2015.core",
  "es2015",
  "es2015.generator",
  "es2015.iterable",
  "es2015.promise",
  "es2015.proxy",
  "es2015.reflect",
  "es2015.symbol",
  "es2015.symbol.wellknown",
  "es2016.array.include",
  "es2016",
  "es2016.full",
  "es2017",
  "es2017.full",
  "es2017.intl",
  "es2017.object",
  "es2017.sharedmemory",
  "es2017.string",
  "es2017.typedarrays",
  "es2018.asyncgenerator",
  "es2018.asynciterator",
  "es2018",
  "es2018.full",
  "es2018.intl",
  "es2018.promise",
  "es2018.regexp",
  "es2019.array",
  "es2019",
  "es2019.full",
  "es2019.object",
  "es2019.string",
  "es2019.symbol",
  "es2020.bigint",
  "es2020",
  "es2020.full",
  "es2020.intl",
  "es2020.promise",
  "es2020.sharedmemory",
  "es2020.string",
  "es2020.symbol.wellknown",
  "es2022",
  "es2022.full",
  "es2022.intl",
  "es2022.promise",
  "es2022.string",
  "es2022.weakref",
  "es5",
  "es6",
  "esnext",
  "esnext.full",
  "esnext.intl",
  "esnext.promise",
  "esnext.string",
  "esnext.weakref",
  "scripthost",
  "webworker",
  "webworker.importscripts",
  "webworker.iterable"
];
var monacoContribution = /* @__PURE__ */ __name(async (code) => {
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse + "/",
    target: languages.typescript.ScriptTarget.ES2016,
    importHelpers: false,
    lib,
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    allowNonTsExtensions: true,
    traceResolution: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    moduleSpecifierCompletion: 2,
    declaration: true,
    module: languages.typescript.ModuleKind.CommonJS,
    noEmitOnError: true,
    sourceMap: true,
    mapRoot: originToUse + "/src/sourcemaps",
    maxNodeModuleJsDepth: 10,
    rootDir: originToUse,
    paths: {
      [originToUse + "/live/node_modules/"]: [originToUse + "/*"],
      [originToUse + "/live/*"]: [originToUse + "/live/*"],
      [originToUse + "*"]: [originToUse + "/*"],
      [originToUse + "/node_modules/*"]: [originToUse + "/*"],
      [originToUse + "node_modules/*"]: [originToUse + "/*"],
      [originToUse + "/*"]: [originToUse + "/*"],
      [originToUse + "^/*"]: [originToUse + "/*"]
    },
    typeRoots: [
      originToUse + "/@types/",
      originToUse + "/unpkg/@types/",
      originToUse + "/",
      originToUse + "/unpkg:/"
    ],
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [originToUse + "/node_modules"]
  });
  languages.typescript.typescriptDefaults.setEagerModelSync(true);
  return code;
}, "monacoContribution");
self.MonacoEnvironment = {
  baseUrl: originToUse + "/",
  getWorkerUrl
};
var mod = {};
var startMonaco = /* @__PURE__ */ __name(async ({ code, container, codeSpace, onChange }) => mod[codeSpace] = mod[codeSpace] || await startMonacoPristine({ code, container, codeSpace, onChange }), "startMonaco");
async function startMonacoPristine({ code, container, codeSpace, onChange }) {
  const replaced = await monacoContribution(
    code
  );
  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  const uri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);
  const model = editor.getModel(uri) || createModel(
    replaced,
    "typescript",
    uri
  );
  const addExtraM = /* @__PURE__ */ __name(async () => {
    const search = new RegExp(
      ` from '(${originToUse}/)?live/[a-zA-Z]+`,
      "gm"
    );
    const models = replaced.matchAll(search);
    for (const match of models) {
      console.log("***** EXTRA MODELS *****");
      const codeSpace2 = match[0].split("/live/").pop();
      const extraModel = new URL(
        "/live/" + codeSpace2 + "/index.tsx",
        location.origin
      ).toString();
      const mUri = Uri.parse(`${originToUse}/live/${codeSpace2}/index.tsx`);
      const content = await fetch(extraModel).then((res) => res.text());
      editor.getModel(mUri) || createModel(
        content,
        "typescript",
        mUri
      );
    }
  }, "addExtraM");
  setTimeout(() => addExtraM(), 500);
  const target = container;
  const myEditor = create(target, {
    model,
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false
    },
    scrollBeyondLastLine: true,
    scrollPredominantAxis: false,
    smoothScrolling: true,
    suggest: {
      insertMode: "replace",
      filterGraceful: false,
      snippetsPreventQuickSuggestions: false,
      localityBonus: true,
      shareSuggestSelections: true,
      showIcons: true,
      showStatusBar: true,
      preview: true,
      previewMode: "subwordSmart",
      showInlineDetails: true,
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
      showFields: true,
      showModules: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showIssues: true,
      showUsers: true,
      showSnippets: true
    },
    automaticLayout: true,
    useShadowDOM: false,
    roundedSelection: true,
    bracketPairColorization: {
      independentColorPoolPerBracketType: true,
      enabled: true
    },
    codeLens: true,
    "semanticHighlighting.enabled": true,
    dragAndDrop: true,
    codeActionsOnSaveTimeout: 300,
    dropIntoEditor: { enabled: true },
    mouseStyle: "default",
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "beforeWhitespace"
  });
  languages.typescript.typescriptDefaults.setEagerModelSync(true);
  setTimeout(() => extraStuff(code, uri, languages.typescript), 1e3);
  const mod2 = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      return (await (await languages.typescript.getTypeScriptWorker())(uri)).getSuggestionDiagnostics(uri.toString()).then((diag) => diag.map((d) => d.messageText.toString())).catch(
        (e) => {
          console.log("ts error, will retry", e);
        }
      );
    },
    setValue: (code2) => {
      console.log("setValue! ", code2);
      mod2.silent = true;
      let state = null;
      try {
        console.log("trying to change code");
        try {
          state = myEditor.saveViewState();
        } catch {
          console.error("error while saving monaco state");
        }
        console.log("trying to change code");
        model.setValue(code2);
        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch {
        console.error("error while saving the state");
      } finally {
        mod2.silent = false;
      }
    }
  };
  model.onDidChangeContent((ev) => {
    console.log({ version: model.getVersionId(), ev });
    mod2.silent == false && onChange(model.getValue());
  });
  return mod2;
}
__name(startMonacoPristine, "startMonacoPristine");
export {
  startMonaco
};
