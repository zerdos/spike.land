"use strict";
exports.__esModule = true;
exports.generateIdentifierDeclarationFile = exports
  .generateModuleDeclarationFile = void 0;
var dom = require("dts-dom");
var dts_dom_1 = require("dts-dom");
var names_1 = require("./names");
var ts = require("typescript");
var builtins = {
  Date: Date,
  RegExp: RegExp,
  Map: (typeof Map !== "undefined") ? Map : undefined,
  HTMLElement: (typeof HTMLElement !== "undefined") ? HTMLElement : undefined,
};
function forceAsIdentifier(s) {
  // TODO: Make this more comprehensive
  return names_1.getDTName(s.replace(/-/g, "_"));
}
function getValueTypes(value) {
  if (typeof value === "object") {
    // Objects can't be callable, so no need to check for class / function
    return 4 /* Object */;
  } else if (
    typeof value === "string" || typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return 8 /* Primitive */;
  } else if (value === null || value === undefined) {
    return 16 /* NullOrUndefined */;
  } else if (typeof value === "function") {
    if (isClasslike(value)) {
      return 1 /* Class */ |
        (hasCloduleProperties(value) ? 4 /* Object */ : 0 /* None */);
    } else {
      return 2 /* Function */ |
        (hasFunduleProperties(value) ? 4 /* Object */ : 0 /* None */);
    }
  } else {
    return 32 /* Unknown */;
  }
}
// A class has clodule properties if it has any classes. Anything else can be written with 'static'
function hasCloduleProperties(c) {
  return getKeysOfObject(c).some(function (k) {
    return isClasslike(c[k]);
  });
}
// A function has fundule properties if it has any own properties not belonging to Function.prototype
function hasFunduleProperties(fn) {
  return getKeysOfObject(fn).some(function (k) {
    return Function[k] === undefined;
  });
}
function generateModuleDeclarationFile(nameHint, root) {
  var localName = forceAsIdentifier(nameHint);
  var decls = getTopLevelDeclarations(localName, root);
  // If we get back just a namespace, we can avoid writing an export=
  if (decls.length === 1 && decls[0].kind === "namespace") {
    // Hoist out all the declarations and export them
    var members = decls[0].members;
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
      var m = members_1[_i];
      m.flags = m.flags | dom.DeclarationFlags.Export;
    }
    return members.map(function (m) {
      return dom.emit(m);
    }).join("");
  } else {
    // Going to have to write an export=
    var result = decls.map(function (d) {
      return dom.emit(d);
    });
    result.unshift(dom.emit(dom.create.exportEquals(localName)));
    return result.join("");
  }
}
exports.generateModuleDeclarationFile = generateModuleDeclarationFile;
function generateIdentifierDeclarationFile(name, value) {
  var result = getTopLevelDeclarations(name, value);
  return result.map(function (d) {
    return dom.emit(d);
  }).join("\r\n");
}
exports.generateIdentifierDeclarationFile = generateIdentifierDeclarationFile;
var walkStack = new Set();
var reservedFunctionProperties = Object.getOwnPropertyNames(function () {});
function getKeysOfObject(obj) {
  var keys = [];
  var chain = obj;
  do {
    if (chain == null) {
      break;
    }
    keys = keys.concat(Object.getOwnPropertyNames(chain));
    chain = Object.getPrototypeOf(chain);
  } while (chain !== Object.prototype && chain !== Function.prototype);
  keys = Array.from(new Set(keys));
  keys = keys.filter(function (s) {
    return isVisitableName(s);
  });
  if (typeof obj === "function") {
    keys = keys.filter(function (k) {
      return reservedFunctionProperties.indexOf(k) < 0;
    });
  }
  keys.sort();
  return keys;
}
function isVisitableName(s) {
  return (s[0] !== "_") &&
    (["caller", "arguments", "constructor", "super_", "prototype"].indexOf(s) <
      0);
}
function isLegalIdentifier(s) {
  if (s.length === 0) {
    return false;
  }
  if (!ts.isIdentifierStart(s.charCodeAt(0), ts.ScriptTarget.Latest)) {
    return false;
  }
  for (var i = 1; i < s.length; i++) {
    if (!ts.isIdentifierPart(s.charCodeAt(i), ts.ScriptTarget.Latest)) {
      return false;
    }
  }
  return dts_dom_1.reservedWords.indexOf(s) < 0;
}
function isClasslike(obj) {
  return !!(obj.prototype &&
    Object.getOwnPropertyNames(obj.prototype).length > 1);
}
var keyStack = [];
function getTopLevelDeclarations(name, obj) {
  if (walkStack.has(obj) || keyStack.length > 4) {
    // Circular or too-deep reference
    var result = dts_dom_1.create["const"](name, dom.type.any);
    result.comment = (walkStack.has(obj)
      ? "Circular reference"
      : "Too-deep object hierarchy") +
      (" from " + keyStack.join("."));
    return [result];
  }
  if (!isLegalIdentifier(name)) {
    return [];
  }
  walkStack.add(obj);
  keyStack.push(name);
  var res = getResult();
  keyStack.pop();
  walkStack["delete"](obj);
  return res;
  function getResult() {
    if (typeof obj === "function") {
      var funcType = getParameterListAndReturnType(obj, parseFunctionBody(obj));
      var ns_1 = dom.create.namespace(name);
      var primaryDecl_1;
      if (isClasslike(obj)) {
        var cls_1 = dom.create["class"](name);
        getClassPrototypeMembers(obj).forEach(function (m) {
          return cls_1.members.push(m);
        });
        cls_1.members.push(dom.create.constructor(funcType[0]));
        cls_1.members.sort(declarationComparer);
        primaryDecl_1 = cls_1;
      } else {
        var parsedFunction = parseFunctionBody(obj);
        var info = getParameterListAndReturnType(obj, parsedFunction);
        primaryDecl_1 = dom.create["function"](name, info[0], info[1]);
      }
      // Get clodule/fundule members
      var keys = getKeysOfObject(obj);
      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        getTopLevelDeclarations(k, obj[k]).forEach(function (p) {
          if (primaryDecl_1.kind === "class") {
            // Transform certain declarations into static members
            switch (p.kind) {
              case "const":
                primaryDecl_1.members.push(
                  dts_dom_1.create.property(
                    p.name,
                    p.type,
                    dom.DeclarationFlags.Static,
                  ),
                );
                break;
              case "function":
                primaryDecl_1.members.push(
                  dts_dom_1.create.method(
                    p.name,
                    p.parameters,
                    p.returnType,
                    dom.DeclarationFlags.Static,
                  ),
                );
                break;
              default:
                ns_1.members.push(p);
                break;
            }
          } else {
            ns_1.members.push(p);
          }
        });
        ns_1.members.sort(declarationComparer);
      }
      return ns_1.members.length > 0 ? [primaryDecl_1, ns_1] : [primaryDecl_1];
    } else if (typeof obj === "object") {
      // If we can immediately resolve this to a simple declaration, just do so
      var simpleType = getTypeOfValue(obj);
      if (
        typeof simpleType === "string" || simpleType.kind === "name" ||
        simpleType.kind === "array"
      ) {
        var result = dom.create["const"](name, simpleType);
        if (simpleType === "string") {
          var preview = '"' + simpleType.substr(0, 100) +
            (simpleType.length > 100 ? "..." : "") + '"';
          result.comment = "Value of string: " + preview;
        }
        return [result];
      }
      // If anything in here is classlike or functionlike, write it as a namespace.
      // Otherwise, write as a 'const'
      var keys = getKeysOfObject(obj);
      var constituentTypes = 0 /* None */;
      for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
        var k = keys_2[_a];
        constituentTypes = constituentTypes | getValueTypes(obj[k]);
      }
      if (constituentTypes & (1 /* Class */ | 2 /* Function */)) {
        var ns_2 = dom.create.namespace(name);
        for (var _b = 0, keys_3 = keys; _b < keys_3.length; _b++) {
          var k = keys_3[_b];
          var decls = getTopLevelDeclarations(k, obj[k]);
          decls.forEach(function (d) {
            return ns_2.members.push(d);
          });
        }
        ns_2.members.sort(declarationComparer);
        return [ns_2];
      } else {
        return [dom.create["const"](name, simpleType)];
      }
    } else if (
      typeof obj === "string" || typeof obj === "number" ||
      typeof obj === "boolean"
    ) {
      return [dts_dom_1.create["const"](name, (typeof obj))];
    } else {
      return [dts_dom_1.create["const"](name, dom.type.any)];
    }
  }
}
function getTypeOfValue(value) {
  for (var k in builtins) {
    if (builtins[k] && value instanceof builtins[k]) {
      return dts_dom_1.create.namedTypeReference(k);
    }
  }
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return dts_dom_1.create.array(getTypeOfValue(value[0]));
    } else {
      return dts_dom_1.create.array(dom.type.any);
    }
  }
  var type = typeof value;
  switch (type) {
    case "string":
    case "number":
    case "boolean":
      return type;
    case "undefined":
      return dom.type.any;
    case "object":
      if (value === null) {
        return dom.type.any;
      } else {
        walkStack.add(value);
        var members = getPropertyDeclarationsOfObject(value);
        walkStack["delete"](value);
        members.sort(declarationComparer);
        var objType = dom.create.objectType(members);
        return objType;
      }
    default:
      return dom.type.any;
  }
}
function getPropertyDeclarationsOfObject(obj) {
  walkStack.add(obj);
  var keys = getKeysOfObject(obj);
  var result = keys.map(getProperty);
  walkStack["delete"](obj);
  return result;
  function getProperty(k) {
    if (walkStack.has(obj[k])) {
      return dts_dom_1.create.property(k, dom.type.any);
    }
    return dts_dom_1.create.property(k, getTypeOfValue(obj[k]));
  }
}
function getClassPrototypeMembers(ctor) {
  var names = Object.getOwnPropertyNames(ctor.prototype);
  var members = names
    .filter(function (n) {
      return !isNameToSkip(n);
    })
    .map(function (name) {
      return getPrototypeMember(
        name,
        Object.getOwnPropertyDescriptor(ctor.prototype, name).value,
      );
    })
    .filter(function (m) {
      return m !== undefined;
    });
  members.sort();
  return members;
  function getPrototypeMember(name, obj) {
    // Skip non-function objects on the prototype (not sure what to do with these?)
    if (typeof obj !== "function") {
      return undefined;
    }
    var funcType = getParameterListAndReturnType(obj, parseFunctionBody(obj));
    var result = dts_dom_1.create.method(name, funcType[0], funcType[1]);
    if (isNativeFunction(obj)) {
      result.comment =
        "Native method; no parameter or return type inference available";
    }
    return result;
  }
  function isNameToSkip(s) {
    return (s === "constructor") || (s[0] === "_");
  }
}
function declarationComparer(left, right) {
  if (left.kind === right.kind) {
    return left.name > right.name ? 1 : left.name < right.name ? -1 : 0;
  } else {
    return left.kind > right.kind ? 1 : left.kind < right.kind ? -1 : 0;
  }
}
function getParameterListAndReturnType(obj, fn) {
  var usedArguments = false;
  var hasReturn = false;
  var funcStack = [];
  if (isNativeFunction(obj)) {
    var args = [];
    for (var i = 0; i < obj.length; i++) {
      args.push(dts_dom_1.create.parameter("p" + i, dom.type.any));
    }
    return [args, dom.type.any];
  } else {
    ts.forEachChild(fn, visit);
    var params = [
      dts_dom_1.create.parameter(
        "args",
        dom.type.array(dom.type.any),
        dom.ParameterFlags.Rest,
      ),
    ];
    if (fn.parameters) {
      params = fn.parameters.map(function (p) {
        return dts_dom_1.create.parameter(
          "" + p.name.getText(),
          inferParameterType(fn, p),
        );
      });
      if (usedArguments) {
        params.push(
          dts_dom_1.create.parameter(
            "args",
            dom.type.array(dom.type.any),
            dom.ParameterFlags.Rest,
          ),
        );
      }
    }
    return [params, hasReturn ? dom.type.any : dom.type["void"]];
  }
  function visit(node) {
    switch (node.kind) {
      case ts.SyntaxKind.Identifier:
        if (node.getText() === "arguments") {
          usedArguments = true;
        }
        break;
      case ts.SyntaxKind.ReturnStatement:
        var ret = node;
        if (
          funcStack.length === 0 && ret.expression &&
          ret.expression.kind !== ts.SyntaxKind.VoidExpression
        ) {
          hasReturn = true;
        }
    }
    switch (node.kind) {
      case ts.SyntaxKind.FunctionExpression:
      case ts.SyntaxKind.FunctionDeclaration:
        funcStack.push(true);
        ts.forEachChild(node, visit);
        funcStack.pop();
      default:
        ts.forEachChild(node, visit);
        break;
    }
  }
}
function inferParameterType(_fn, _param) {
  // TODO: Inspect function body for clues
  return dom.type.any;
}
function parseFunctionBody(fn) {
  var setup = "const myFn = " + fn.toString() + ";";
  var srcFile = ts.createSourceFile(
    "test.ts",
    setup,
    ts.ScriptTarget.Latest,
    true,
  );
  var statement = srcFile.statements[0];
  var decl = statement.declarationList.declarations[0];
  var init = decl.initializer;
  return init;
}
function isNativeFunction(fn) {
  return fn.toString().indexOf("{ [native code] }") > 0;
}
