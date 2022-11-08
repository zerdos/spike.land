"use strict";
(() => {
  // ../../.yarn/global/cache/comlink-npm-4.3.1-45efe1dd36-9.zip/node_modules/comlink/dist/esm/comlink.mjs
  var proxyMarker = Symbol("Comlink.proxy");
  var createEndpoint = Symbol("Comlink.endpoint");
  var releaseProxy = Symbol("Comlink.releaseProxy");
  var throwMarker = Symbol("Comlink.thrown");
  var isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
  var proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
      const { port1, port2 } = new MessageChannel();
      expose(obj, port1);
      return [port2, [port2]];
    },
    deserialize(port) {
      port.start();
      return wrap(port);
    }
  };
  var throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
      let serialized;
      if (value instanceof Error) {
        serialized = {
          isError: true,
          value: {
            message: value.message,
            name: value.name,
            stack: value.stack
          }
        };
      } else {
        serialized = { isError: false, value };
      }
      return [serialized, []];
    },
    deserialize(serialized) {
      if (serialized.isError) {
        throw Object.assign(new Error(serialized.value.message), serialized.value);
      }
      throw serialized.value;
    }
  };
  var transferHandlers = /* @__PURE__ */ new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler]
  ]);
  function expose(obj, ep = self) {
    ep.addEventListener("message", function callback(ev) {
      if (!ev || !ev.data) {
        return;
      }
      const { id, type, path } = Object.assign({ path: [] }, ev.data);
      const argumentList = (ev.data.argumentList || []).map(fromWireValue);
      let returnValue;
      try {
        const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
        const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
        switch (type) {
          case "GET":
            {
              returnValue = rawValue;
            }
            break;
          case "SET":
            {
              parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
              returnValue = true;
            }
            break;
          case "APPLY":
            {
              returnValue = rawValue.apply(parent, argumentList);
            }
            break;
          case "CONSTRUCT":
            {
              const value = new rawValue(...argumentList);
              returnValue = proxy(value);
            }
            break;
          case "ENDPOINT":
            {
              const { port1, port2 } = new MessageChannel();
              expose(obj, port2);
              returnValue = transfer(port1, [port1]);
            }
            break;
          case "RELEASE":
            {
              returnValue = void 0;
            }
            break;
          default:
            return;
        }
      } catch (value) {
        returnValue = { value, [throwMarker]: 0 };
      }
      Promise.resolve(returnValue).catch((value) => {
        return { value, [throwMarker]: 0 };
      }).then((returnValue2) => {
        const [wireValue, transferables] = toWireValue(returnValue2);
        ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
        if (type === "RELEASE") {
          ep.removeEventListener("message", callback);
          closeEndPoint(ep);
        }
      });
    });
    if (ep.start) {
      ep.start();
    }
  }
  function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
  }
  function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
      endpoint.close();
  }
  function wrap(ep, target) {
    return createProxy(ep, [], target);
  }
  function throwIfProxyReleased(isReleased) {
    if (isReleased) {
      throw new Error("Proxy has been released and is not useable");
    }
  }
  function createProxy(ep, path = [], target = function() {
  }) {
    let isProxyReleased = false;
    const proxy2 = new Proxy(target, {
      get(_target, prop) {
        throwIfProxyReleased(isProxyReleased);
        if (prop === releaseProxy) {
          return () => {
            return requestResponseMessage(ep, {
              type: "RELEASE",
              path: path.map((p) => p.toString())
            }).then(() => {
              closeEndPoint(ep);
              isProxyReleased = true;
            });
          };
        }
        if (prop === "then") {
          if (path.length === 0) {
            return { then: () => proxy2 };
          }
          const r = requestResponseMessage(ep, {
            type: "GET",
            path: path.map((p) => p.toString())
          }).then(fromWireValue);
          return r.then.bind(r);
        }
        return createProxy(ep, [...path, prop]);
      },
      set(_target, prop, rawValue) {
        throwIfProxyReleased(isProxyReleased);
        const [value, transferables] = toWireValue(rawValue);
        return requestResponseMessage(ep, {
          type: "SET",
          path: [...path, prop].map((p) => p.toString()),
          value
        }, transferables).then(fromWireValue);
      },
      apply(_target, _thisArg, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const last = path[path.length - 1];
        if (last === createEndpoint) {
          return requestResponseMessage(ep, {
            type: "ENDPOINT"
          }).then(fromWireValue);
        }
        if (last === "bind") {
          return createProxy(ep, path.slice(0, -1));
        }
        const [argumentList, transferables] = processArguments(rawArgumentList);
        return requestResponseMessage(ep, {
          type: "APPLY",
          path: path.map((p) => p.toString()),
          argumentList
        }, transferables).then(fromWireValue);
      },
      construct(_target, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const [argumentList, transferables] = processArguments(rawArgumentList);
        return requestResponseMessage(ep, {
          type: "CONSTRUCT",
          path: path.map((p) => p.toString()),
          argumentList
        }, transferables).then(fromWireValue);
      }
    });
    return proxy2;
  }
  function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
  }
  function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
  }
  var transferCache = /* @__PURE__ */ new WeakMap();
  function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
  }
  function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
  }
  function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
      if (handler.canHandle(value)) {
        const [serializedValue, transferables] = handler.serialize(value);
        return [
          {
            type: "HANDLER",
            name,
            value: serializedValue
          },
          transferables
        ];
      }
    }
    return [
      {
        type: "RAW",
        value
      },
      transferCache.get(value) || []
    ];
  }
  function fromWireValue(value) {
    switch (value.type) {
      case "HANDLER":
        return transferHandlers.get(value.name).deserialize(value.value);
      case "RAW":
        return value.value;
    }
  }
  function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
      const id = generateUUID();
      ep.addEventListener("message", function l(ev) {
        if (!ev.data || !ev.data.id || ev.data.id !== id) {
          return;
        }
        ep.removeEventListener("message", l);
        resolve(ev.data);
      });
      if (ep.start) {
        ep.start();
      }
      ep.postMessage(Object.assign({ id }, msg), transfers);
    });
  }
  function generateUUID() {
    return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
  }

  // js/monacoExtra.ts
  function extraStuff(code, uri, typescript) {
    const getTsWorker = () => typescript.getTypeScriptWorker();
    const addExtraLib = (content, filePath) => typescript.typescriptDefaults.addExtraLib(content, filePath);
    const setExtraLibs = (libs) => typescript.typescriptDefaults.setExtraLibs(libs);
    const extraModelCache = {};
    const extraModels = {};
    Object.assign(globalThis, { extraModels, extraModelCache });
    const addExtraModels = async (code2, url) => {
      try {
        if (extraModels[url])
          return;
        extraModels[url] = [];
        const baSe = new URL(".", url).toString();
        const parent = new URL("..", url).toString();
        const gParent = new URL("../..", url).toString();
        let replaced = removeComments(code2);
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
            let extraModelUrl = extraModel;
            const extraModelContent = await fetch(extraModel).then(
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
            await addExtraModels(extraModelCache[extraModel], extraModel);
          } catch (err) {
            console.error("Error in add extra models", code2, url, { err });
          }
        }
      } catch {
        console.log("error in extra lib  mining", url);
        return;
      }
    };
    const replaceMaps = {};
    const ATA = async () => {
      console.log("ATA");
      const mappings = (await Promise.all(
        (await (await (await getTsWorker())(uri)).getSemanticDiagnostics(uri.toString())).map((x) => {
          return x.messageText;
        }).filter(
          (x) => typeof x === "string" && x.includes(" or its corresponding type declarations.")
        ).map((x) => typeof x === "string" && x.split("'")[1]).map(
          async (mod2) => {
            const retMod = { url: "", mod: mod2, content: "" };
            if (mod2 && mod2.startsWith("https://")) {
              return retMod;
            }
            retMod.content = await fetch("/npm:/" + mod2).then(
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
      )).filter((m2) => m2.mod && m2.content).map(async (m2) => {
        console.log(`Aga-Insert: ${m2.mod}`);
        await addExtraModels(
          m2.content,
          m2.url
        );
        return {
          [location.origin + `/node_modules/${m2.mod}/index.d.ts`]: m2.url
        };
      });
      const maps = await Promise.all(mappings);
      maps.forEach((m2) => Object.assign(replaceMaps, m2));
      console.log({ replaceMaps });
      const extraLib2 = xxxsetExtraLibs();
      extraLib2.map((lib) => {
        addExtraLib(
          lib.content,
          lib.filePath
        );
      });
    };
    const xxxsetExtraLibs = () => {
      replaceMaps["/node_modules/"] = "/npm:/v96/";
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
    };
    const extraLib = xxxsetExtraLibs();
    extraLib.map((lib) => {
      addExtraLib(
        lib.content,
        lib.filePath
      );
    });
    const mod = {
      ATA,
      silent: false,
      code
    };
    setTimeout(() => mod.ATA(), 2e3);
  }
  function replaceAll(input, search, replace) {
    return input.split(search).join(replace);
  }
  function replaceMappings(input, maps) {
    let result = input;
    Object.keys(maps).map((x) => result = replaceAll(result, maps[x], x));
    return result;
  }
  function removeComments(str) {
    const regex = /\/\*.*?\*\//gi;
    /\/\*.*?\*\//gi;
    return str.replaceAll(regex, ``).split(`
`).filter(
      (x) => x && x.trim() && (!x.trim().startsWith("//") || x.includes("reference"))
    ).join(`
`);
  }

  // js/mWorker.mjs
  var m = {
    extraStuff
  };
  expose(m);
})();
