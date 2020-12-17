"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdentifierDeclarationFile = exports
  .generateModuleDeclarationFile = void 0;
const dom = require("dts-dom");
const dts_dom_1 = require("dts-dom");
const names_1 = require("./names");
const ts = require("typescript");
const builtins = {
  Date,
  RegExp,
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
  return getKeysOfObject(c).some((k) => isClasslike(c[k]));
}
// A function has fundule properties if it has any own properties not belonging to Function.prototype
function hasFunduleProperties(fn) {
  return getKeysOfObject(fn).some((k) => Function[k] === undefined);
}
function generateModuleDeclarationFile(nameHint, root) {
  const localName = forceAsIdentifier(nameHint);
  const decls = getTopLevelDeclarations(localName, root);
  // If we get back just a namespace, we can avoid writing an export=
  if (decls.length === 1 && decls[0].kind === "namespace") {
    // Hoist out all the declarations and export them
    const members = decls[0].members;
    for (const m of members) {
      m.flags = m.flags | dom.DeclarationFlags.Export;
    }
    return members.map((m) => dom.emit(m)).join("");
  } else {
    // Going to have to write an export=
    const result = decls.map((d) => dom.emit(d));
    result.unshift(dom.emit(dom.create.exportEquals(localName)));
    return result.join("");
  }
}
exports.generateModuleDeclarationFile = generateModuleDeclarationFile;
function generateIdentifierDeclarationFile(name, value) {
  const result = getTopLevelDeclarations(name, value);
  return result.map((d) => dom.emit(d)).join("\r\n");
}
exports.generateIdentifierDeclarationFile = generateIdentifierDeclarationFile;
const walkStack = new Set();
const reservedFunctionProperties = Object.getOwnPropertyNames(() => {});
function getKeysOfObject(obj) {
  let keys = [];
  let chain = obj;
  do {
    if (chain == null) {
      break;
    }
    keys = keys.concat(Object.getOwnPropertyNames(chain));
    chain = Object.getPrototypeOf(chain);
  } while (chain !== Object.prototype && chain !== Function.prototype);
  keys = Array.from(new Set(keys));
  keys = keys.filter((s) => isVisitableName(s));
  if (typeof obj === "function") {
    keys = keys.filter((k) => reservedFunctionProperties.indexOf(k) < 0);
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
  for (let i = 1; i < s.length; i++) {
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
const keyStack = [];
function getTopLevelDeclarations(name, obj) {
  if (walkStack.has(obj) || keyStack.length > 4) {
    // Circular or too-deep reference
    const result = dts_dom_1.create.const(name, dom.type.any);
    result.comment = (walkStack.has(obj)
      ? "Circular reference"
      : "Too-deep object hierarchy") +
      ` from ${keyStack.join(".")}`;
    return [result];
  }
  if (!isLegalIdentifier(name)) {
    return [];
  }
  walkStack.add(obj);
  keyStack.push(name);
  const res = getResult();
  keyStack.pop();
  walkStack.delete(obj);
  return res;
  function getResult() {
    if (typeof obj === "function") {
      const funcType = getParameterListAndReturnType(
        obj,
        parseFunctionBody(obj),
      );
      const ns = dom.create.namespace(name);
      let primaryDecl;
      if (isClasslike(obj)) {
        const cls = dom.create.class(name);
        getClassPrototypeMembers(obj).forEach((m) => cls.members.push(m));
        cls.members.push(dom.create.constructor(funcType[0]));
        cls.members.sort(declarationComparer);
        primaryDecl = cls;
      } else {
        const parsedFunction = parseFunctionBody(obj);
        const info = getParameterListAndReturnType(obj, parsedFunction);
        primaryDecl = dom.create.function(name, info[0], info[1]);
      }
      // Get clodule/fundule members
      const keys = getKeysOfObject(obj);
      for (const k of keys) {
        getTopLevelDeclarations(k, obj[k]).forEach((p) => {
          if (primaryDecl.kind === "class") {
            // Transform certain declarations into static members
            switch (p.kind) {
              case "const":
                primaryDecl.members.push(
                  dts_dom_1.create.property(
                    p.name,
                    p.type,
                    dom.DeclarationFlags.Static,
                  ),
                );
                break;
              case "function":
                primaryDecl.members.push(
                  dts_dom_1.create.method(
                    p.name,
                    p.parameters,
                    p.returnType,
                    dom.DeclarationFlags.Static,
                  ),
                );
                break;
              default:
                ns.members.push(p);
                break;
            }
          } else {
            ns.members.push(p);
          }
        });
        ns.members.sort(declarationComparer);
      }
      return ns.members.length > 0 ? [primaryDecl, ns] : [primaryDecl];
    } else if (typeof obj === "object") {
      // If we can immediately resolve this to a simple declaration, just do so
      const simpleType = getTypeOfValue(obj);
      if (
        typeof simpleType === "string" || simpleType.kind === "name" ||
        simpleType.kind === "array"
      ) {
        const result = dom.create.const(name, simpleType);
        if (simpleType === "string") {
          const preview = `"${simpleType.substr(0, 100)}${
            simpleType.length > 100 ? "..." : ""
          }"`;
          result.comment = "Value of string: " + preview;
        }
        return [result];
      }
      // If anything in here is classlike or functionlike, write it as a namespace.
      // Otherwise, write as a 'const'
      const keys = getKeysOfObject(obj);
      let constituentTypes = 0 /* None */;
      for (const k of keys) {
        constituentTypes = constituentTypes | getValueTypes(obj[k]);
      }
      if (constituentTypes & (1 /* Class */ | 2 /* Function */)) {
        const ns = dom.create.namespace(name);
        for (const k of keys) {
          const decls = getTopLevelDeclarations(k, obj[k]);
          decls.forEach((d) => ns.members.push(d));
        }
        ns.members.sort(declarationComparer);
        return [ns];
      } else {
        return [dom.create.const(name, simpleType)];
      }
    } else if (
      typeof obj === "string" || typeof obj === "number" ||
      typeof obj === "boolean"
    ) {
      return [dts_dom_1.create.const(name, (typeof obj))];
    } else {
      return [dts_dom_1.create.const(name, dom.type.any)];
    }
  }
}
function getTypeOfValue(value) {
  for (const k in builtins) {
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
  const type = typeof value;
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
        const members = getPropertyDeclarationsOfObject(value);
        walkStack.delete(value);
        members.sort(declarationComparer);
        const objType = dom.create.objectType(members);
        return objType;
      }
    default:
      return dom.type.any;
  }
}
function getPropertyDeclarationsOfObject(obj) {
  walkStack.add(obj);
  const keys = getKeysOfObject(obj);
  const result = keys.map(getProperty);
  walkStack.delete(obj);
  return result;
  function getProperty(k) {
    if (walkStack.has(obj[k])) {
      return dts_dom_1.create.property(k, dom.type.any);
    }
    return dts_dom_1.create.property(k, getTypeOfValue(obj[k]));
  }
}
function getClassPrototypeMembers(ctor) {
  const names = Object.getOwnPropertyNames(ctor.prototype);
  const members = names
    .filter((n) => !isNameToSkip(n))
    .map((name) =>
      getPrototypeMember(
        name,
        Object.getOwnPropertyDescriptor(ctor.prototype, name).value,
      )
    )
    .filter((m) => m !== undefined);
  members.sort();
  return members;
  function getPrototypeMember(name, obj) {
    // Skip non-function objects on the prototype (not sure what to do with these?)
    if (typeof obj !== "function") {
      return undefined;
    }
    const funcType = getParameterListAndReturnType(obj, parseFunctionBody(obj));
    const result = dts_dom_1.create.method(name, funcType[0], funcType[1]);
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
  let usedArguments = false;
  let hasReturn = false;
  const funcStack = [];
  if (isNativeFunction(obj)) {
    const args = [];
    for (let i = 0; i < obj.length; i++) {
      args.push(dts_dom_1.create.parameter(`p${i}`, dom.type.any));
    }
    return [args, dom.type.any];
  } else {
    ts.forEachChild(fn, visit);
    let params = [
      dts_dom_1.create.parameter(
        "args",
        dom.type.array(dom.type.any),
        dom.ParameterFlags.Rest,
      ),
    ];
    if (fn.parameters) {
      params = fn.parameters.map((p) =>
        dts_dom_1.create.parameter(
          `${p.name.getText()}`,
          inferParameterType(fn, p),
        )
      );
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
    return [params, hasReturn ? dom.type.any : dom.type.void];
  }
  function visit(node) {
    switch (node.kind) {
      case ts.SyntaxKind.Identifier:
        if (node.getText() === "arguments") {
          usedArguments = true;
        }
        break;
      case ts.SyntaxKind.ReturnStatement:
        const ret = node;
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
  const setup = `const myFn = ${fn.toString()};`;
  const srcFile = ts.createSourceFile(
    "test.ts",
    setup,
    ts.ScriptTarget.Latest,
    true,
  );
  const statement = srcFile.statements[0];
  const decl = statement.declarationList.declarations[0];
  const init = decl.initializer;
  return init;
}
function isNativeFunction(fn) {
  return fn.toString().indexOf("{ [native code] }") > 0;
}
