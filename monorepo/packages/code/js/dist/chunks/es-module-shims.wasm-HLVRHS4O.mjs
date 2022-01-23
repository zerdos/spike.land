// ../../node_modules/es-module-shims/dist/es-module-shims.wasm.js
(function() {
  const uaMatch = navigator.userAgent.match(/(Edge|Safari)\/\d+\.\d+/);
  const edge = uaMatch && uaMatch[1] === "Edge";
  const safari = uaMatch && uaMatch[1] === "Safari";
  let baseUrl;
  function createBlob(source, type = "text/javascript") {
    return URL.createObjectURL(new Blob([source], { type }));
  }
  const noop = () => {
  };
  const baseEl = document.querySelector("base[href]");
  if (baseEl)
    baseUrl = baseEl.href;
  if (!baseUrl && typeof location !== "undefined") {
    baseUrl = location.href.split("#")[0].split("?")[0];
    const lastSepIndex = baseUrl.lastIndexOf("/");
    if (lastSepIndex !== -1)
      baseUrl = baseUrl.slice(0, lastSepIndex + 1);
  }
  function isURL(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
  const backslashRegEx = /\\/g;
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    parentUrl = parentUrl && parentUrl.split("#")[0].split("?")[0];
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i = 0; i < segmented.length; i++) {
        if (segmentIndex !== -1) {
          if (segmented[i] === "/") {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
        } else if (segmented[i] === ".") {
          if (segmented[i + 1] === "." && (segmented[i + 2] === "/" || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
          } else if (segmented[i + 1] === "/" || i + 1 === segmented.length) {
            i += 1;
          } else {
            segmentIndex = i;
          }
        } else {
          segmentIndex = i;
        }
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(":") !== -1 ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p2 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if (outPackages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p2];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p2}" -> "${packages[p2]}" does not resolve`);
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s in json.scopes) {
        const resolvedScope = resolveUrl(s, baseUrl2);
        resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
      }
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id2, packages) {
    const pkgName = getMatch(id2, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id2.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap2.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap2.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), importMap2.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  const optionsScript = document.querySelector("script[type=esms-options]");
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : self.esmsInitOptions ? self.esmsInitOptions : {};
  let shimMode = !!esmsInitOptions.shimMode;
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  const skip = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;
  let nonce = esmsInitOptions.nonce;
  if (!nonce) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => console.info(`OK: "Uncaught TypeError" module failure has been polyfilled`);
  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
  const fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  function setShimMode() {
    shimMode = true;
  }
  let supportsDynamicImportCheck = false;
  let dynamicImport;
  try {
    dynamicImport = (0, eval)("u=>import(u)");
    supportsDynamicImportCheck = true;
  } catch (e) {
  }
  if (!supportsDynamicImportCheck) {
    let err;
    window.addEventListener("error", (_err) => err = _err);
    dynamicImport = (url, { errUrl = url }) => {
      err = void 0;
      const src = createBlob(`import*as m from'${url}';self._esmsi=m;`);
      const s = Object.assign(document.createElement("script"), { type: "module", src });
      s.setAttribute("noshim", "");
      document.head.appendChild(s);
      return new Promise((resolve2, reject) => {
        s.addEventListener("load", () => {
          document.head.removeChild(s);
          if (self._esmsi) {
            resolve2(self._esmsi, baseUrl);
            self._esmsi = null;
          } else {
            reject(err.error || new Error(`Error loading or executing the graph of ${errUrl} (check the console for ${src}).`));
            err = void 0;
          }
        });
      });
    };
  }
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMeta = false;
  let supportsImportMaps = false;
  let supportsDynamicImport = false;
  const featureDetectionPromise = Promise.resolve(supportsDynamicImportCheck).then((_supportsDynamicImport) => {
    if (!_supportsDynamicImport)
      return;
    supportsDynamicImport = true;
    return Promise.all([
      dynamicImport(createBlob("import.meta")).then(() => supportsImportMeta = true, noop),
      cssModulesEnabled && dynamicImport(createBlob('import"data:text/css,{}"assert{type:"css"}')).then(() => supportsCssAssertions = true, noop),
      jsonModulesEnabled && dynamicImport(createBlob('import"data:text/json,{}"assert{type:"json"}')).then(() => supportsJsonAssertions = true, noop),
      new Promise((resolve2) => {
        self._$s = (v) => {
          document.head.removeChild(iframe);
          if (v)
            supportsImportMaps = true;
          delete self._$s;
          resolve2();
        };
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.head.appendChild(iframe);
        iframe.src = createBlob(`<script type=importmap nonce="${nonce}">{"imports":{"x":"data:text/javascript,"}}<${""}/script><script nonce="${nonce}">import('x').then(()=>1,()=>0).then(v=>parent._$s(v))<${""}/script>`, "text/html");
      })
    ]);
  });
  const A = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  function parse(E2, I = "@") {
    if (!B)
      return init.then(() => parse(E2));
    const g = E2.length + 1, D = (B.__heap_base.value || B.__heap_base) + 4 * g - B.memory.buffer.byteLength;
    D > 0 && B.memory.grow(Math.ceil(D / 65536));
    const w = B.sa(g - 1);
    if ((A ? C : Q)(E2, new Uint16Array(B.memory.buffer, w, g)), !B.parse())
      throw Object.assign(new Error(`Parse error ${I}:${E2.slice(0, B.e()).split("\n").length}:${B.e() - E2.lastIndexOf("\n", B.e() - 1)}`), { idx: B.e() });
    const L = [], k = [];
    for (; B.ri(); ) {
      const A2 = B.is(), Q2 = B.ie(), C2 = B.ai(), I2 = B.id(), g2 = B.ss(), D2 = B.se();
      let w2;
      B.ip() && (w2 = J(E2.slice(I2 === -1 ? A2 - 1 : A2, I2 === -1 ? Q2 + 1 : Q2))), L.push({ n: w2, s: A2, e: Q2, ss: g2, se: D2, d: I2, a: C2 });
    }
    for (; B.re(); ) {
      const A2 = E2.slice(B.es(), B.ee()), Q2 = A2[0];
      k.push(Q2 === '"' || Q2 === "'" ? J(A2) : A2);
    }
    function J(A2) {
      try {
        return (0, eval)(A2);
      } catch (A3) {
      }
    }
    return [L, k, !!B.f()];
  }
  function Q(A2, Q2) {
    const C2 = A2.length;
    let B2 = 0;
    for (; B2 < C2; ) {
      const C3 = A2.charCodeAt(B2);
      Q2[B2++] = (255 & C3) << 8 | C3 >>> 8;
    }
  }
  function C(A2, Q2) {
    const C2 = A2.length;
    let B2 = 0;
    for (; B2 < C2; )
      Q2[B2] = A2.charCodeAt(B2++);
  }
  let B;
  const init = WebAssembly.compile((E = "AGFzbQEAAAABXA1gAX8Bf2AEf39/fwBgAn9/AGAAAX9gBn9/f39/fwF/YAAAYAF/AGAEf39/fwF/YAN/f38Bf2AHf39/f39/fwF/YAV/f39/fwF/YAJ/fwF/YAh/f39/f39/fwF/AzEwAAECAwMDAwMDAwMDAwMDAwAABAUFBQYFBgAAAAAFBQAEBwgJCgsMAAIAAAALAwkMBAUBcAEBAQUDAQABBg8CfwFB8PAAC38AQfDwAAsHZBEGbWVtb3J5AgACc2EAAAFlAAMCaXMABAJpZQAFAnNzAAYCc2UABwJhaQAIAmlkAAkCaXAACgJlcwALAmVlAAwCcmkADQJyZQAOAWYADwVwYXJzZQAQC19faGVhcF9iYXNlAwEK8jkwaAEBf0EAIAA2ArgIQQAoApAIIgEgAEEBdGoiAEEAOwEAQQAgAEECaiIANgK8CEEAIAA2AsAIQQBBADYClAhBAEEANgKkCEEAQQA2ApwIQQBBADYCmAhBAEEANgKsCEEAQQA2AqAIIAELsgEBAn9BACgCpAgiBEEcakGUCCAEG0EAKALACCIFNgIAQQAgBTYCpAhBACAENgKoCEEAIAVBIGo2AsAIIAUgADYCCAJAAkBBACgCiAggA0cNACAFIAI2AgwMAQsCQEEAKAKECCADRw0AIAUgAkECajYCDAwBCyAFQQAoApAINgIMCyAFIAE2AgAgBSADNgIUIAVBADYCECAFIAI2AgQgBUEANgIcIAVBACgChAggA0Y6ABgLSAEBf0EAKAKsCCICQQhqQZgIIAIbQQAoAsAIIgI2AgBBACACNgKsCEEAIAJBDGo2AsAIIAJBADYCCCACIAE2AgQgAiAANgIACwgAQQAoAsQICxUAQQAoApwIKAIAQQAoApAIa0EBdQsVAEEAKAKcCCgCBEEAKAKQCGtBAXULFQBBACgCnAgoAghBACgCkAhrQQF1CxUAQQAoApwIKAIMQQAoApAIa0EBdQseAQF/QQAoApwIKAIQIgBBACgCkAhrQQF1QX8gABsLOwEBfwJAQQAoApwIKAIUIgBBACgChAhHDQBBfw8LAkAgAEEAKAKICEcNAEF+DwsgAEEAKAKQCGtBAXULCwBBACgCnAgtABgLFQBBACgCoAgoAgBBACgCkAhrQQF1CxUAQQAoAqAIKAIEQQAoApAIa0EBdQslAQF/QQBBACgCnAgiAEEcakGUCCAAGygCACIANgKcCCAAQQBHCyUBAX9BAEEAKAKgCCIAQQhqQZgIIAAbKAIAIgA2AqAIIABBAEcLCABBAC0AyAgL9gsBBH8jAEGA8ABrIgEkAEEAQQE6AMgIQQBB//8DOwHOCEEAQQAoAowINgLQCEEAQQAoApAIQX5qIgI2AuQIQQAgAkEAKAK4CEEBdGoiAzYC6AhBAEEAOwHKCEEAQQA7AcwIQQBBADoA1AhBAEEANgLECEEAQQA6ALQIQQAgAUGA0ABqNgLYCEEAIAFBgBBqNgLcCEEAQQA6AOAIAkACQAJAAkADQEEAIAJBAmoiBDYC5AggAiADTw0BAkAgBC8BACIDQXdqQQVJDQACQAJAAkACQAJAIANBm39qDgUBCAgIAgALIANBIEYNBCADQS9GDQMgA0E7Rg0CDAcLQQAvAcwIDQEgBBARRQ0BIAJBBGpB+ABB8ABB7wBB8gBB9AAQEkUNARATQQAtAMgIDQFBAEEAKALkCCICNgLQCAwHCyAEEBFFDQAgAkEEakHtAEHwAEHvAEHyAEH0ABASRQ0AEBQLQQBBACgC5Ag2AtAIDAELAkAgAi8BBCIEQSpGDQAgBEEvRw0EEBUMAQtBARAWC0EAKALoCCEDQQAoAuQIIQIMAAsLQQAhAyAEIQJBAC0AtAgNAgwBC0EAIAI2AuQIQQBBADoAyAgLA0BBACACQQJqIgQ2AuQIAkACQAJAAkACQAJAIAJBACgC6AhPDQAgBC8BACIDQXdqQQVJDQUCQAJAAkACQAJAAkACQAJAAkACQCADQWBqDgoPDggODg4OBwECAAsCQAJAAkACQCADQaB/ag4KCBERAxEBERERAgALIANBhX9qDgMFEAYLC0EALwHMCA0PIAQQEUUNDyACQQRqQfgAQfAAQe8AQfIAQfQAEBJFDQ8QEwwPCyAEEBFFDQ4gAkEEakHtAEHwAEHvAEHyAEH0ABASRQ0OEBQMDgsgBBARRQ0NIAIvAQpB8wBHDQ0gAi8BCEHzAEcNDSACLwEGQeEARw0NIAIvAQRB7ABHDQ0gAi8BDCIEQXdqIgJBF0sNC0EBIAJ0QZ+AgARxRQ0LDAwLQQBBAC8BzAgiAkEBajsBzAhBACgC3AggAkECdGpBACgC0Ag2AgAMDAtBAC8BzAgiAkUNCEEAIAJBf2oiAzsBzAhBACgCsAgiAkUNCyACKAIUQQAoAtwIIANB//8DcUECdGooAgBHDQsCQCACKAIEDQAgAiAENgIECyACIAQ2AgxBAEEANgKwCAwLCwJAQQAoAtAIIgQvAQBBKUcNAEEAKAKkCCICRQ0AIAIoAgQgBEcNAEEAQQAoAqgIIgI2AqQIAkAgAkUNACACQQA2AhwMAQtBAEEANgKUCAsgAUEALwHMCCICakEALQDgCDoAAEEAIAJBAWo7AcwIQQAoAtwIIAJBAnRqIAQ2AgBBAEEAOgDgCAwKC0EALwHMCCICRQ0GQQAgAkF/aiIDOwHMCCACQQAvAc4IIgRHDQFBAEEALwHKCEF/aiICOwHKCEEAQQAoAtgIIAJB//8DcUEBdGovAQA7Ac4ICxAXDAgLIARB//8DRg0HIANB//8DcSAESQ0EDAcLQScQGAwGC0EiEBgMBQsgA0EvRw0EAkACQCACLwEEIgJBKkYNACACQS9HDQEQFQwHC0EBEBYMBgsCQAJAAkACQEEAKALQCCIELwEAIgIQGUUNAAJAAkACQCACQVVqDgQBBQIABQsgBEF+ai8BAEFQakH//wNxQQpJDQMMBAsgBEF+ai8BAEErRg0CDAMLIARBfmovAQBBLUYNAQwCCwJAIAJB/QBGDQAgAkEpRw0BQQAoAtwIQQAvAcwIQQJ0aigCABAaRQ0BDAILQQAoAtwIQQAvAcwIIgNBAnRqKAIAEBsNASABIANqLQAADQELIAQQHA0AIAJFDQBBASEEIAJBL0ZBAC0A1AhBAEdxRQ0BCxAdQQAhBAtBACAEOgDUCAwEC0EALwHOCEH//wNGQQAvAcwIRXFBAC0AtAhFcSEDDAYLEB5BACEDDAULIARBoAFHDQELQQBBAToA4AgLQQBBACgC5Ag2AtAIC0EAKALkCCECDAALCyABQYDwAGokACADCx0AAkBBACgCkAggAEcNAEEBDwsgAEF+ai8BABAfCz8BAX9BACEGAkAgAC8BCCAFRw0AIAAvAQYgBEcNACAALwEEIANHDQAgAC8BAiACRw0AIAAvAQAgAUYhBgsgBgvUBgEEf0EAQQAoAuQIIgBBDGoiATYC5AhBARAnIQICQAJAAkACQAJAQQAoAuQIIgMgAUcNACACECtFDQELAkACQAJAAkACQCACQZ9/ag4MBgEDCAEHAQEBAQEEAAsCQAJAIAJBKkYNACACQfYARg0FIAJB+wBHDQJBACADQQJqNgLkCEEBECchA0EAKALkCCEBA0ACQAJAIANB//8DcSICQSJGDQAgAkEnRg0AIAIQKhpBACgC5AghAgwBCyACEBhBAEEAKALkCEECaiICNgLkCAtBARAnGgJAIAEgAhAsIgNBLEcNAEEAQQAoAuQIQQJqNgLkCEEBECchAwtBACgC5AghAgJAIANB/QBGDQAgAiABRg0FIAIhASACQQAoAugITQ0BDAULC0EAIAJBAmo2AuQIDAELQQAgA0ECajYC5AhBARAnGkEAKALkCCICIAIQLBoLQQEQJyECC0EAKALkCCEDAkAgAkHmAEcNACADLwEGQe0ARw0AIAMvAQRB7wBHDQAgAy8BAkHyAEcNAEEAIANBCGo2AuQIIABBARAnECgPC0EAIANBfmo2AuQIDAMLEB4PCwJAIAMvAQhB8wBHDQAgAy8BBkHzAEcNACADLwEEQeEARw0AIAMvAQJB7ABHDQAgAy8BChAfRQ0AQQAgA0EKajYC5AhBARAnIQJBACgC5AghAyACECoaIANBACgC5AgQAkEAQQAoAuQIQX5qNgLkCA8LQQAgA0EEaiIDNgLkCAtBACADQQRqIgI2AuQIQQBBADoAyAgDQEEAIAJBAmo2AuQIQQEQJyEDQQAoAuQIIQICQCADECpBIHJB+wBHDQBBAEEAKALkCEF+ajYC5AgPC0EAKALkCCIDIAJGDQEgAiADEAICQEEBECciAkEsRg0AAkAgAkE9Rw0AQQBBACgC5AhBfmo2AuQIDwtBAEEAKALkCEF+ajYC5AgPC0EAKALkCCECDAALCw8LQQAgA0EKajYC5AhBARAnGkEAKALkCCEDC0EAIANBEGo2AuQIAkBBARAnIgJBKkcNAEEAQQAoAuQIQQJqNgLkCEEBECchAgtBACgC5AghAyACECoaIANBACgC5AgQAkEAQQAoAuQIQX5qNgLkCA8LIAMgA0EOahACC64GAQR/QQBBACgC5AgiAEEMaiIBNgLkCAJAAkACQAJAAkACQAJAAkACQAJAQQEQJyICQVlqDggCCAECAQEBBwALIAJBIkYNASACQfsARg0CC0EAKALkCCABRg0HC0EALwHMCA0BQQAoAuQIIQJBACgC6AghAwNAIAIgA08NBAJAAkAgAi8BACIBQSdGDQAgAUEiRw0BCyAAIAEQKA8LQQAgAkECaiICNgLkCAwACwtBACgC5AghAkEALwHMCA0BAkADQAJAAkACQCACQQAoAugITw0AQQEQJyICQSJGDQEgAkEnRg0BIAJB/QBHDQJBAEEAKALkCEECajYC5AgLQQEQJxpBACgC5AgiAi8BBkHtAEcNBiACLwEEQe8ARw0GIAIvAQJB8gBHDQYgAi8BAEHmAEcNBkEAIAJBCGo2AuQIQQEQJyICQSJGDQMgAkEnRg0DDAYLIAIQGAtBAEEAKALkCEECaiICNgLkCAwACwsgACACECgMBQtBAEEAKALkCEF+ajYC5AgPC0EAIAJBfmo2AuQIDwsQHg8LQQBBACgC5AhBAmo2AuQIQQEQJ0HtAEcNAUEAKALkCCICLwEGQeEARw0BIAIvAQRB9ABHDQEgAi8BAkHlAEcNAUEAKALQCC8BAEEuRg0BIAAgACACQQhqQQAoAogIEAEPC0EAKALcCEEALwHMCCICQQJ0aiAANgIAQQAgAkEBajsBzAhBACgC0AgvAQBBLkYNACAAQQAoAuQIQQJqQQAgABABQQBBACgCpAg2ArAIQQBBACgC5AhBAmo2AuQIAkBBARAnIgJBIkYNACACQSdGDQBBAEEAKALkCEF+ajYC5AgPCyACEBhBAEEAKALkCEECajYC5AgCQAJAAkBBARAnQVdqDgQBAgIAAgtBACgCpAhBACgC5AgiAjYCBEEAIAJBAmo2AuQIQQEQJxpBACgCpAgiAkEBOgAYIAJBACgC5AgiATYCEEEAIAFBfmo2AuQIDwtBACgCpAgiAkEBOgAYIAJBACgC5AgiATYCDCACIAE2AgRBAEEALwHMCEF/ajsBzAgPC0EAQQAoAuQIQX5qNgLkCA8LC0cBA39BACgC5AhBAmohAEEAKALoCCEBAkADQCAAIgJBfmogAU8NASACQQJqIQAgAi8BAEF2ag4EAQAAAQALC0EAIAI2AuQIC5gBAQN/QQBBACgC5AgiAUECajYC5AggAUEGaiEBQQAoAugIIQIDQAJAAkACQCABQXxqIAJPDQAgAUF+ai8BACEDAkACQCAADQAgA0EqRg0BIANBdmoOBAIEBAIECyADQSpHDQMLIAEvAQBBL0cNAkEAIAFBfmo2AuQIDAELIAFBfmohAQtBACABNgLkCA8LIAFBAmohAQwACwu/AQEEf0EAKALkCCEAQQAoAugIIQECQAJAA0AgACICQQJqIQAgAiABTw0BAkACQCAALwEAIgNBpH9qDgUBAgICBAALIANBJEcNASACLwEEQfsARw0BQQBBAC8ByggiAEEBajsByghBACgC2AggAEEBdGpBAC8Bzgg7AQBBACACQQRqNgLkCEEAQQAvAcwIQQFqIgA7Ac4IQQAgADsBzAgPCyACQQRqIQAMAAsLQQAgADYC5AgQHg8LQQAgADYC5AgLiAEBBH9BACgC5AghAUEAKALoCCECAkACQANAIAEiA0ECaiEBIAMgAk8NASABLwEAIgQgAEYNAgJAIARB3ABGDQAgBEF2ag4EAgEBAgELIANBBGohASADLwEEQQ1HDQAgA0EGaiABIAMvAQZBCkYbIQEMAAsLQQAgATYC5AgQHg8LQQAgATYC5AgLbAEBfwJAAkAgAEFfaiIBQQVLDQBBASABdEExcQ0BCyAAQUZqQf//A3FBBkkNACAAQSlHIABBWGpB//8DcUEHSXENAAJAIABBpX9qDgQBAAABAAsgAEH9AEcgAEGFf2pB//8DcUEESXEPC0EBCz0BAX9BASEBAkAgAEH3AEHoAEHpAEHsAEHlABAgDQAgAEHmAEHvAEHyABAhDQAgAEHpAEHmABAiIQELIAELmwEBAn9BASEBAkACQAJAAkACQAJAIAAvAQAiAkFFag4EBQQEAQALAkAgAkGbf2oOBAMEBAIACyACQSlGDQQgAkH5AEcNAyAAQX5qQeYAQekAQe4AQeEAQewAQewAECMPCyAAQX5qLwEAQT1GDwsgAEF+akHjAEHhAEH0AEHjABAkDwsgAEF+akHlAEHsAEHzABAhDwtBACEBCyABC9IDAQJ/QQAhAQJAAkACQAJAAkACQAJAAkACQCAALwEAQZx/ag4UAAECCAgICAgICAMECAgFCAYICAcICwJAAkAgAEF+ai8BAEGXf2oOBAAJCQEJCyAAQXxqQfYAQe8AECIPCyAAQXxqQfkAQekAQeUAECEPCwJAAkAgAEF+ai8BAEGNf2oOAgABCAsCQCAAQXxqLwEAIgJB4QBGDQAgAkHsAEcNCCAAQXpqQeUAECUPCyAAQXpqQeMAECUPCyAAQXxqQeQAQeUAQewAQeUAECQPCyAAQX5qLwEAQe8ARw0FIABBfGovAQBB5QBHDQUCQCAAQXpqLwEAIgJB8ABGDQAgAkHjAEcNBiAAQXhqQekAQe4AQfMAQfQAQeEAQe4AECMPCyAAQXhqQfQAQfkAECIPC0EBIQEgAEF+aiIAQekAECUNBCAAQfIAQeUAQfQAQfUAQfIAECAPCyAAQX5qQeQAECUPCyAAQX5qQeQAQeUAQeIAQfUAQecAQecAQeUAECYPCyAAQX5qQeEAQfcAQeEAQekAECQPCwJAIABBfmovAQAiAkHvAEYNACACQeUARw0BIABBfGpB7gAQJQ8LIABBfGpB9ABB6ABB8gAQISEBCyABC3ABAn8CQAJAA0BBAEEAKALkCCIAQQJqIgE2AuQIIABBACgC6AhPDQECQAJAAkAgAS8BACIBQaV/ag4CAQIACwJAIAFBdmoOBAQDAwQACyABQS9HDQIMBAsQLRoMAQtBACAAQQRqNgLkCAwACwsQHgsLNQEBf0EAQQE6ALQIQQAoAuQIIQBBAEEAKALoCEECajYC5AhBACAAQQAoApAIa0EBdTYCxAgLNAEBf0EBIQECQCAAQXdqQf//A3FBBUkNACAAQYABckGgAUYNACAAQS5HIAAQK3EhAQsgAQtJAQN/QQAhBgJAIABBeGoiB0EAKAKQCCIISQ0AIAcgASACIAMgBCAFEBJFDQACQCAHIAhHDQBBAQ8LIABBdmovAQAQHyEGCyAGC1kBA39BACEEAkAgAEF8aiIFQQAoApAIIgZJDQAgAC8BACADRw0AIABBfmovAQAgAkcNACAFLwEAIAFHDQACQCAFIAZHDQBBAQ8LIABBemovAQAQHyEECyAEC0wBA39BACEDAkAgAEF+aiIEQQAoApAIIgVJDQAgAC8BACACRw0AIAQvAQAgAUcNAAJAIAQgBUcNAEEBDwsgAEF8ai8BABAfIQMLIAMLSwEDf0EAIQcCQCAAQXZqIghBACgCkAgiCUkNACAIIAEgAiADIAQgBSAGEC5FDQACQCAIIAlHDQBBAQ8LIABBdGovAQAQHyEHCyAHC2YBA39BACEFAkAgAEF6aiIGQQAoApAIIgdJDQAgAC8BACAERw0AIABBfmovAQAgA0cNACAAQXxqLwEAIAJHDQAgBi8BACABRw0AAkAgBiAHRw0AQQEPCyAAQXhqLwEAEB8hBQsgBQs9AQJ/QQAhAgJAQQAoApAIIgMgAEsNACAALwEAIAFHDQACQCADIABHDQBBAQ8LIABBfmovAQAQHyECCyACC00BA39BACEIAkAgAEF0aiIJQQAoApAIIgpJDQAgCSABIAIgAyAEIAUgBiAHEC9FDQACQCAJIApHDQBBAQ8LIABBcmovAQAQHyEICyAIC5wBAQN/QQAoAuQIIQECQANAAkACQCABLwEAIgJBL0cNAAJAIAEvAQIiAUEqRg0AIAFBL0cNBBAVDAILIAAQFgwBCwJAAkAgAEUNACACQXdqIgFBF0sNAUEBIAF0QZ+AgARxRQ0BDAILIAIQKUUNAwwBCyACQaABRw0CC0EAQQAoAuQIIgNBAmoiATYC5AggA0EAKALoCEkNAAsLIAILywMBAX8CQCABQSJGDQAgAUEnRg0AEB4PC0EAKALkCCECIAEQGCAAIAJBAmpBACgC5AhBACgChAgQAUEAQQAoAuQIQQJqNgLkCEEAECchAEEAKALkCCEBAkACQCAAQeEARw0AIAFBAmpB8wBB8wBB5QBB8gBB9AAQEg0BC0EAIAFBfmo2AuQIDwtBACABQQxqNgLkCAJAQQEQJ0H7AEYNAEEAIAE2AuQIDwtBACgC5AgiAiEAA0BBACAAQQJqNgLkCAJAAkACQEEBECciAEEiRg0AIABBJ0cNAUEnEBhBAEEAKALkCEECajYC5AhBARAnIQAMAgtBIhAYQQBBACgC5AhBAmo2AuQIQQEQJyEADAELIAAQKiEACwJAIABBOkYNAEEAIAE2AuQIDwtBAEEAKALkCEECajYC5AgCQEEBECciAEEiRg0AIABBJ0YNAEEAIAE2AuQIDwsgABAYQQBBACgC5AhBAmo2AuQIAkACQEEBECciAEEsRg0AIABB/QBGDQFBACABNgLkCA8LQQBBACgC5AhBAmo2AuQIQQEQJ0H9AEYNAEEAKALkCCEADAELC0EAKAKkCCIBIAI2AhAgAUEAKALkCEECajYCDAswAQF/AkACQCAAQXdqIgFBF0sNAEEBIAF0QY2AgARxDQELIABBoAFGDQBBAA8LQQELbQECfwJAAkADQAJAIABB//8DcSIBQXdqIgJBF0sNAEEBIAJ0QZ+AgARxDQILIAFBoAFGDQEgACECIAEQKw0CQQAhAkEAQQAoAuQIIgBBAmo2AuQIIAAvAQIiAA0ADAILCyAAIQILIAJB//8DcQtoAQJ/QQEhAQJAAkAgAEFfaiICQQVLDQBBASACdEExcQ0BCyAAQfj/A3FBKEYNACAAQUZqQf//A3FBBkkNAAJAIABBpX9qIgJBA0sNACACQQFHDQELIABBhX9qQf//A3FBBEkhAQsgAQuLAQECfwJAQQAoAuQIIgIvAQAiA0HhAEcNAEEAIAJBBGo2AuQIQQEQJyECQQAoAuQIIQACQAJAIAJBIkYNACACQSdGDQAgAhAqGkEAKALkCCEBDAELIAIQGEEAQQAoAuQIQQJqIgE2AuQIC0EBECchA0EAKALkCCECCwJAIAIgAEYNACAAIAEQAgsgAwtyAQR/QQAoAuQIIQBBACgC6AghAQJAAkADQCAAQQJqIQIgACABTw0BAkACQCACLwEAIgNBpH9qDgIBBAALIAIhACADQXZqDgQCAQECAQsgAEEEaiEADAALC0EAIAI2AuQIEB5BAA8LQQAgAjYC5AhB3QALSQEBf0EAIQcCQCAALwEKIAZHDQAgAC8BCCAFRw0AIAAvAQYgBEcNACAALwEEIANHDQAgAC8BAiACRw0AIAAvAQAgAUYhBwsgBwtTAQF/QQAhCAJAIAAvAQwgB0cNACAALwEKIAZHDQAgAC8BCCAFRw0AIAAvAQYgBEcNACAALwEEIANHDQAgAC8BAiACRw0AIAAvAQAgAUYhCAsgCAsLHwIAQYAICwIAAABBhAgLEAEAAAACAAAAAAQAAHA4AAA=", typeof Buffer != "undefined" ? Buffer.from(E, "base64") : Uint8Array.from(atob(E), (A2) => A2.charCodeAt(0)))).then(WebAssembly.instantiate).then(({ exports: A2 }) => {
    B = A2;
  });
  var E;
  async function defaultResolve(id2, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id2, parentUrl) || id2, parentUrl);
  }
  async function _resolve(id2, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id2, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id2, parentUrl),
      b: !urlResolved && !isURL(id2)
    };
  }
  const resolve = resolveHook ? async (id2, parentUrl) => ({ r: await resolveHook(id2, parentUrl, defaultResolve), b: false }) : _resolve;
  let id = 0;
  const registry = {};
  async function loadAll(load, seen) {
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map((dep) => loadAll(dep, seen)));
    if (!load.n)
      load.n = load.d.some((dep) => dep.n);
  }
  let importMap = { imports: {}, scopes: {} };
  let importMapSrcOrLazy = false;
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    if (!shimMode) {
      if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
        setShimMode();
      } else {
        let seenScript = false;
        for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
          if (!seenScript) {
            if (script.type === "module")
              seenScript = true;
          } else if (script.type === "importmap") {
            importMapSrcOrLazy = true;
            break;
          }
        }
      }
    }
    baselinePassthrough = supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
    if (shimMode || !baselinePassthrough) {
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList")
            continue;
          for (const node of mutation.addedNodes) {
            if (node.tagName === "SCRIPT") {
              if (node.type === (shimMode ? "module-shim" : "module"))
                processScript(node);
              if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                processImportMap(node);
            } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload"))
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      processImportMaps();
      processScriptsAndPreloads();
      return init;
    }
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
    if (!shimMode)
      acceptingImportMaps = false;
    await importMapPromise;
    if (!shimMode && baselinePassthrough) {
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise2;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = void 0;
    resolveDeps(load, seen);
    await lastStaticLoadPromise2;
    if (source && !shimMode && !load.n && true) {
      const module2 = await dynamicImport(createBlob(source), { errUrl: source });
      if (revokeBlobURLs)
        revokeObjectURLs(Object.keys(seen));
      return module2;
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, { errUrl: load.u });
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs)
      revokeObjectURLs(Object.keys(seen));
    return module;
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength)
        return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load)
          URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  async function importShim(id2, parentUrl = baseUrl, _assertion) {
    await initPromise;
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      processImportMaps();
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id2, parentUrl)).r || throwUnresolved(id2, parentUrl), { credentials: "same-origin" });
  }
  self.importShim = importShim;
  if (shimMode) {
    importShim.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  }
  const meta = {};
  async function importMetaResolve(id2, parentUrl = this.url) {
    return (await resolve(id2, `${parentUrl}`)).r || throwUnresolved(id2, parentUrl);
  }
  self._esmsm = meta;
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;
    for (const dep of load.d)
      resolveDeps(dep, seen);
    const [imports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    if (!imports.length) {
      resolvedSource += source;
    } else {
      let lastIndex = 0, depIndex = 0;
      for (const { s: start, se: end, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          const depLoad = load.d[depIndex++];
          let blobUrl = depLoad.b;
          if (!blobUrl) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map((name) => name === "default" ? `$_default=m.default` : `${name}=m.${name}`).join(",")}}${depLoad.a[1].map((name) => name === "default" ? `let $_default;export{$_default as default}` : `export let ${name}`).join(";")}
//# sourceURL=${depLoad.r}?cycle`);
            }
          } else if (depLoad.s) {
            resolvedSource += `${source.slice(lastIndex, start - 1)}/*${source.slice(start - 1, end)}*/${urlJsString(blobUrl)};import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            lastIndex = end;
            depLoad.s = void 0;
            continue;
          }
          resolvedSource += `${source.slice(lastIndex, start - 1)}/*${source.slice(start - 1, end)}*/${urlJsString(blobUrl)}`;
          lastIndex = end;
        } else if (dynamicImportIndex === -2) {
          meta[load.r] = { url: load.r, resolve: importMetaResolve };
          resolvedSource += `${source.slice(lastIndex, start)}self._esmsm[${urlJsString(load.r)}]`;
          lastIndex = end;
        } else {
          resolvedSource += `${source.slice(lastIndex, dynamicImportIndex + 6)}Shim(${source.slice(start, end)}, ${load.r && urlJsString(load.r)}`;
          lastIndex = end;
        }
      }
      resolvedSource += source.slice(lastIndex);
    }
    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL)
      resolvedSource += "\n//# sourceURL=" + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = void 0;
  }
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r) => p.push(r));
  }
  function popFetchPool() {
    c--;
    if (p.length)
      p.shift()();
  }
  async function doFetch(url, fetchOpts) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}`);
    const contentType = res.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: "json" };
    else if (cssContentType.test(contentType))
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes, relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    else
      throw Error(`Unsupported Content-Type "${contentType}"`);
  }
  function getOrCreateLoad(url, fetchOpts, source) {
    let load = registry[url];
    if (load)
      return load;
    load = registry[url] = {
      u: url,
      r: void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null
    };
    load.f = (async () => {
      if (!source) {
        let t;
        ({ r: load.r, s: source, t } = await (fetchCache[url] || doFetch(url, fetchOpts)));
        if (t && !shimMode) {
          if (t === "css" && !cssModulesEnabled || t === "json" && !jsonModulesEnabled)
            throw Error(`${t}-modules require <script type="esms-options">{ "polyfillEnable": ["${t}-modules"] }<${""}/script>`);
          if (t === "css" && !supportsCssAssertions || t === "json" && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e) {
        console.warn(e);
        load.a = [[], []];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === 2 && !supportsImportMeta)
          load.n = true;
        if (!n)
          return;
        const { r, b } = await resolve(n, load.r || load.u);
        if (b && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (d !== -1)
          return;
        if (!r)
          throwUnresolved(n, load.r || load.u);
        if (skip && skip.test(r))
          return { b: r };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r, childFetchOpts).f;
      }))).filter((l) => l);
    });
    return load;
  }
  function processScriptsAndPreloads() {
    for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
      processScript(script);
    for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
      processPreload(link);
  }
  function processImportMaps() {
    for (const script of document.querySelectorAll(shimMode ? 'script[type="importmap-shim"]' : 'script[type="importmap"]'))
      processImportMap(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  document.addEventListener("DOMContentLoaded", async () => {
    await initPromise;
    domContentLoadedCheck();
    if (shimMode || !baselinePassthrough) {
      processImportMaps();
      processScriptsAndPreloads();
    }
  });
  let readyStateCompleteCnt = 1;
  if (document.readyState === "complete") {
    readyStateCompleteCheck();
  } else {
    document.addEventListener("readystatechange", async () => {
      processImportMaps();
      await initPromise;
      readyStateCompleteCheck();
    });
  }
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("readystatechange"));
  }
  function processImportMap(script) {
    if (script.ep)
      return;
    if (!script.src && !script.innerHTML)
      return;
    script.ep = true;
    if (script.src) {
      if (!shimMode)
        return;
      importMapSrcOrLazy = true;
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await fetchHook(script.src)).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch((error) => setTimeout(() => {
        throw error;
      }));
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script) {
    if (script.ep)
      return;
    if (script.getAttribute("noshim") !== null)
      return;
    if (!script.src && !script.innerHTML)
      return;
    script.ep = true;
    const isReadyScript = readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isReadyScript)
      readyStateCompleteCnt++;
    if (isDomContentLoadedScript)
      domContentLoadedCnt++;
    const blocks = script.getAttribute("async") === null && isReadyScript;
    const loadPromise = topLevelLoad(script.src || `${baseUrl}?${id++}`, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, blocks && lastStaticLoadPromise).catch((e) => {
      if (safari)
        console.error(e);
      else
        setTimeout(() => {
          throw e;
        });
      onerror(e);
    });
    if (blocks)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = doFetch(link.href, getFetchOpts(link));
  }
  function throwUnresolved(id2, parentUrl) {
    throw Error("Unable to resolve specifier '" + id2 + (parentUrl ? "' from " + parentUrl : "'"));
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VzLW1vZHVsZS1zaGltcy9kaXN0L2VzLW1vZHVsZS1zaGltcy53YXNtLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiBFUyBNb2R1bGUgU2hpbXMgV2FzbSAxLjQuMSAqL1xuKGZ1bmN0aW9uICgpIHtcblxuICBjb25zdCB1YU1hdGNoID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKEVkZ2V8U2FmYXJpKVxcL1xcZCtcXC5cXGQrLyk7XHJcbiAgY29uc3QgZWRnZSA9IHVhTWF0Y2ggJiYgdWFNYXRjaFsxXSA9PT0gJ0VkZ2UnO1xyXG4gIGNvbnN0IHNhZmFyaSA9IHVhTWF0Y2ggJiYgdWFNYXRjaFsxXSA9PT0gJ1NhZmFyaSc7XHJcblxyXG4gIGxldCBiYXNlVXJsO1xyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVCbG9iIChzb3VyY2UsIHR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jykge1xyXG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3NvdXJjZV0sIHsgdHlwZSB9KSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBub29wID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0IGJhc2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2VbaHJlZl0nKTtcclxuICBpZiAoYmFzZUVsKVxyXG4gICAgYmFzZVVybCA9IGJhc2VFbC5ocmVmO1xyXG5cclxuICBpZiAoIWJhc2VVcmwgJiYgdHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgYmFzZVVybCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXS5zcGxpdCgnPycpWzBdO1xyXG4gICAgY29uc3QgbGFzdFNlcEluZGV4ID0gYmFzZVVybC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgaWYgKGxhc3RTZXBJbmRleCAhPT0gLTEpXHJcbiAgICAgIGJhc2VVcmwgPSBiYXNlVXJsLnNsaWNlKDAsIGxhc3RTZXBJbmRleCArIDEpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNVUkwgKHVybCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IFVSTCh1cmwpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNhdGNoIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYmFja3NsYXNoUmVnRXggPSAvXFxcXC9nO1xyXG4gIGZ1bmN0aW9uIHJlc29sdmVJZk5vdFBsYWluT3JVcmwgKHJlbFVybCwgcGFyZW50VXJsKSB7XHJcbiAgICAvLyBzdHJpcCBvZmYgYW55IHRyYWlsaW5nIHF1ZXJ5IHBhcmFtcyBvciBoYXNoZXNcclxuICAgIHBhcmVudFVybCA9IHBhcmVudFVybCAmJiBwYXJlbnRVcmwuc3BsaXQoJyMnKVswXS5zcGxpdCgnPycpWzBdO1xyXG4gICAgaWYgKHJlbFVybC5pbmRleE9mKCdcXFxcJykgIT09IC0xKVxyXG4gICAgICByZWxVcmwgPSByZWxVcmwucmVwbGFjZShiYWNrc2xhc2hSZWdFeCwgJy8nKTtcclxuICAgIC8vIHByb3RvY29sLXJlbGF0aXZlXHJcbiAgICBpZiAocmVsVXJsWzBdID09PSAnLycgJiYgcmVsVXJsWzFdID09PSAnLycpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudFVybC5zbGljZSgwLCBwYXJlbnRVcmwuaW5kZXhPZignOicpICsgMSkgKyByZWxVcmw7XHJcbiAgICB9XHJcbiAgICAvLyByZWxhdGl2ZS11cmxcclxuICAgIGVsc2UgaWYgKHJlbFVybFswXSA9PT0gJy4nICYmIChyZWxVcmxbMV0gPT09ICcvJyB8fCByZWxVcmxbMV0gPT09ICcuJyAmJiAocmVsVXJsWzJdID09PSAnLycgfHwgcmVsVXJsLmxlbmd0aCA9PT0gMiAmJiAocmVsVXJsICs9ICcvJykpIHx8XHJcbiAgICAgICAgcmVsVXJsLmxlbmd0aCA9PT0gMSAgJiYgKHJlbFVybCArPSAnLycpKSB8fFxyXG4gICAgICAgIHJlbFVybFswXSA9PT0gJy8nKSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudFByb3RvY29sID0gcGFyZW50VXJsLnNsaWNlKDAsIHBhcmVudFVybC5pbmRleE9mKCc6JykgKyAxKTtcclxuICAgICAgLy8gRGlzYWJsZWQsIGJ1dCB0aGVzZSBjYXNlcyB3aWxsIGdpdmUgaW5jb25zaXN0ZW50IHJlc3VsdHMgZm9yIGRlZXAgYmFja3RyYWNraW5nXHJcbiAgICAgIC8vaWYgKHBhcmVudFVybFtwYXJlbnRQcm90b2NvbC5sZW5ndGhdICE9PSAnLycpXHJcbiAgICAgIC8vICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNvbHZlJyk7XHJcbiAgICAgIC8vIHJlYWQgcGF0aG5hbWUgZnJvbSBwYXJlbnQgVVJMXHJcbiAgICAgIC8vIHBhdGhuYW1lIHRha2VuIHRvIGJlIHBhcnQgYWZ0ZXIgbGVhZGluZyBcIi9cIlxyXG4gICAgICBsZXQgcGF0aG5hbWU7XHJcbiAgICAgIGlmIChwYXJlbnRVcmxbcGFyZW50UHJvdG9jb2wubGVuZ3RoICsgMV0gPT09ICcvJykge1xyXG4gICAgICAgIC8vIHJlc29sdmluZyB0byBhIDovLyBzbyB3ZSBuZWVkIHRvIHJlYWQgb3V0IHRoZSBhdXRoIGFuZCBob3N0XHJcbiAgICAgICAgaWYgKHBhcmVudFByb3RvY29sICE9PSAnZmlsZTonKSB7XHJcbiAgICAgICAgICBwYXRobmFtZSA9IHBhcmVudFVybC5zbGljZShwYXJlbnRQcm90b2NvbC5sZW5ndGggKyAyKTtcclxuICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UocGF0aG5hbWUuaW5kZXhPZignLycpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcGF0aG5hbWUgPSBwYXJlbnRVcmwuc2xpY2UoOCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHJlc29sdmluZyB0byA6LyBzbyBwYXRobmFtZSBpcyB0aGUgLy4uLiBwYXJ0XHJcbiAgICAgICAgcGF0aG5hbWUgPSBwYXJlbnRVcmwuc2xpY2UocGFyZW50UHJvdG9jb2wubGVuZ3RoICsgKHBhcmVudFVybFtwYXJlbnRQcm90b2NvbC5sZW5ndGhdID09PSAnLycpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlbFVybFswXSA9PT0gJy8nKVxyXG4gICAgICAgIHJldHVybiBwYXJlbnRVcmwuc2xpY2UoMCwgcGFyZW50VXJsLmxlbmd0aCAtIHBhdGhuYW1lLmxlbmd0aCAtIDEpICsgcmVsVXJsO1xyXG5cclxuICAgICAgLy8gam9pbiB0b2dldGhlciBhbmQgc3BsaXQgZm9yIHJlbW92YWwgb2YgLi4gYW5kIC4gc2VnbWVudHNcclxuICAgICAgLy8gbG9vcGluZyB0aGUgc3RyaW5nIGluc3RlYWQgb2YgYW55dGhpbmcgZmFuY3kgZm9yIHBlcmYgcmVhc29uc1xyXG4gICAgICAvLyAnLi4vLi4vLi4vLi4vLi4veicgcmVzb2x2ZWQgdG8gJ3gveScgaXMganVzdCAneidcclxuICAgICAgY29uc3Qgc2VnbWVudGVkID0gcGF0aG5hbWUuc2xpY2UoMCwgcGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpICsgcmVsVXJsO1xyXG5cclxuICAgICAgY29uc3Qgb3V0cHV0ID0gW107XHJcbiAgICAgIGxldCBzZWdtZW50SW5kZXggPSAtMTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBidXN5IHJlYWRpbmcgYSBzZWdtZW50IC0gb25seSB0ZXJtaW5hdGUgb24gJy8nXHJcbiAgICAgICAgaWYgKHNlZ21lbnRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgIGlmIChzZWdtZW50ZWRbaV0gPT09ICcvJykge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChzZWdtZW50ZWQuc2xpY2Uoc2VnbWVudEluZGV4LCBpICsgMSkpO1xyXG4gICAgICAgICAgICBzZWdtZW50SW5kZXggPSAtMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5ldyBzZWdtZW50IC0gY2hlY2sgaWYgaXQgaXMgcmVsYXRpdmVcclxuICAgICAgICBlbHNlIGlmIChzZWdtZW50ZWRbaV0gPT09ICcuJykge1xyXG4gICAgICAgICAgLy8gLi4vIHNlZ21lbnRcclxuICAgICAgICAgIGlmIChzZWdtZW50ZWRbaSArIDFdID09PSAnLicgJiYgKHNlZ21lbnRlZFtpICsgMl0gPT09ICcvJyB8fCBpICsgMiA9PT0gc2VnbWVudGVkLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnBvcCgpO1xyXG4gICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyAuLyBzZWdtZW50XHJcbiAgICAgICAgICBlbHNlIGlmIChzZWdtZW50ZWRbaSArIDFdID09PSAnLycgfHwgaSArIDEgPT09IHNlZ21lbnRlZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaSArPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSBzdGFydCBvZiBhIG5ldyBzZWdtZW50IGFzIGJlbG93XHJcbiAgICAgICAgICAgIHNlZ21lbnRJbmRleCA9IGk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGl0IGlzIHRoZSBzdGFydCBvZiBhIG5ldyBzZWdtZW50XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBzZWdtZW50SW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBmaW5pc2ggcmVhZGluZyBvdXQgdGhlIGxhc3Qgc2VnbWVudFxyXG4gICAgICBpZiAoc2VnbWVudEluZGV4ICE9PSAtMSlcclxuICAgICAgICBvdXRwdXQucHVzaChzZWdtZW50ZWQuc2xpY2Uoc2VnbWVudEluZGV4KSk7XHJcbiAgICAgIHJldHVybiBwYXJlbnRVcmwuc2xpY2UoMCwgcGFyZW50VXJsLmxlbmd0aCAtIHBhdGhuYW1lLmxlbmd0aCkgKyBvdXRwdXQuam9pbignJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEltcG9ydCBtYXBzIGltcGxlbWVudGF0aW9uXHJcbiAgICpcclxuICAgKiBUbyBtYWtlIGxvb2t1cHMgZmFzdCB3ZSBwcmUtcmVzb2x2ZSB0aGUgZW50aXJlIGltcG9ydCBtYXBcclxuICAgKiBhbmQgdGhlbiBtYXRjaCBiYXNlZCBvbiBiYWNrdHJhY2tlZCBoYXNoIGxvb2t1cHNcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHJlc29sdmVVcmwgKHJlbFVybCwgcGFyZW50VXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZUlmTm90UGxhaW5PclVybChyZWxVcmwsIHBhcmVudFVybCkgfHwgKHJlbFVybC5pbmRleE9mKCc6JykgIT09IC0xID8gcmVsVXJsIDogcmVzb2x2ZUlmTm90UGxhaW5PclVybCgnLi8nICsgcmVsVXJsLCBwYXJlbnRVcmwpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBbmRDb21wb3NlUGFja2FnZXMgKHBhY2thZ2VzLCBvdXRQYWNrYWdlcywgYmFzZVVybCwgcGFyZW50TWFwKSB7XHJcbiAgICBmb3IgKGxldCBwIGluIHBhY2thZ2VzKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkTGhzID0gcmVzb2x2ZUlmTm90UGxhaW5PclVybChwLCBiYXNlVXJsKSB8fCBwO1xyXG4gICAgICBpZiAob3V0UGFja2FnZXNbcmVzb2x2ZWRMaHNdKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoYFJlamVjdGVkIG1hcCBvdmVycmlkZSBcIiR7cmVzb2x2ZWRMaHN9XCIgZnJvbSAke291dFBhY2thZ2VzW3Jlc29sdmVkTGhzXX0gdG8gJHtwYWNrYWdlc1tyZXNvbHZlZExoc119LmApO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB0YXJnZXQgPSBwYWNrYWdlc1twXTtcclxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICBjb25zdCBtYXBwZWQgPSByZXNvbHZlSW1wb3J0TWFwKHBhcmVudE1hcCwgcmVzb2x2ZUlmTm90UGxhaW5PclVybCh0YXJnZXQsIGJhc2VVcmwpIHx8IHRhcmdldCwgYmFzZVVybCk7XHJcbiAgICAgIGlmIChtYXBwZWQpIHtcclxuICAgICAgICBvdXRQYWNrYWdlc1tyZXNvbHZlZExoc10gPSBtYXBwZWQ7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS53YXJuKGBNYXBwaW5nIFwiJHtwfVwiIC0+IFwiJHtwYWNrYWdlc1twXX1cIiBkb2VzIG5vdCByZXNvbHZlYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNvbHZlQW5kQ29tcG9zZUltcG9ydE1hcCAoanNvbiwgYmFzZVVybCwgcGFyZW50TWFwKSB7XHJcbiAgICBjb25zdCBvdXRNYXAgPSB7IGltcG9ydHM6IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudE1hcC5pbXBvcnRzKSwgc2NvcGVzOiBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnRNYXAuc2NvcGVzKSB9O1xyXG5cclxuICAgIGlmIChqc29uLmltcG9ydHMpXHJcbiAgICAgIHJlc29sdmVBbmRDb21wb3NlUGFja2FnZXMoanNvbi5pbXBvcnRzLCBvdXRNYXAuaW1wb3J0cywgYmFzZVVybCwgcGFyZW50TWFwKTtcclxuXHJcbiAgICBpZiAoanNvbi5zY29wZXMpXHJcbiAgICAgIGZvciAobGV0IHMgaW4ganNvbi5zY29wZXMpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZFNjb3BlID0gcmVzb2x2ZVVybChzLCBiYXNlVXJsKTtcclxuICAgICAgICByZXNvbHZlQW5kQ29tcG9zZVBhY2thZ2VzKGpzb24uc2NvcGVzW3NdLCBvdXRNYXAuc2NvcGVzW3Jlc29sdmVkU2NvcGVdIHx8IChvdXRNYXAuc2NvcGVzW3Jlc29sdmVkU2NvcGVdID0ge30pLCBiYXNlVXJsLCBwYXJlbnRNYXApO1xyXG4gICAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dE1hcDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldE1hdGNoIChwYXRoLCBtYXRjaE9iaikge1xyXG4gICAgaWYgKG1hdGNoT2JqW3BhdGhdKVxyXG4gICAgICByZXR1cm4gcGF0aDtcclxuICAgIGxldCBzZXBJbmRleCA9IHBhdGgubGVuZ3RoO1xyXG4gICAgZG8ge1xyXG4gICAgICBjb25zdCBzZWdtZW50ID0gcGF0aC5zbGljZSgwLCBzZXBJbmRleCArIDEpO1xyXG4gICAgICBpZiAoc2VnbWVudCBpbiBtYXRjaE9iailcclxuICAgICAgICByZXR1cm4gc2VnbWVudDtcclxuICAgIH0gd2hpbGUgKChzZXBJbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nLCBzZXBJbmRleCAtIDEpKSAhPT0gLTEpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBseVBhY2thZ2VzIChpZCwgcGFja2FnZXMpIHtcclxuICAgIGNvbnN0IHBrZ05hbWUgPSBnZXRNYXRjaChpZCwgcGFja2FnZXMpO1xyXG4gICAgaWYgKHBrZ05hbWUpIHtcclxuICAgICAgY29uc3QgcGtnID0gcGFja2FnZXNbcGtnTmFtZV07XHJcbiAgICAgIGlmIChwa2cgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgcmV0dXJuIHBrZyArIGlkLnNsaWNlKHBrZ05hbWUubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVJbXBvcnRNYXAgKGltcG9ydE1hcCwgcmVzb2x2ZWRPclBsYWluLCBwYXJlbnRVcmwpIHtcclxuICAgIGxldCBzY29wZVVybCA9IHBhcmVudFVybCAmJiBnZXRNYXRjaChwYXJlbnRVcmwsIGltcG9ydE1hcC5zY29wZXMpO1xyXG4gICAgd2hpbGUgKHNjb3BlVXJsKSB7XHJcbiAgICAgIGNvbnN0IHBhY2thZ2VSZXNvbHV0aW9uID0gYXBwbHlQYWNrYWdlcyhyZXNvbHZlZE9yUGxhaW4sIGltcG9ydE1hcC5zY29wZXNbc2NvcGVVcmxdKTtcclxuICAgICAgaWYgKHBhY2thZ2VSZXNvbHV0aW9uKVxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlUmVzb2x1dGlvbjtcclxuICAgICAgc2NvcGVVcmwgPSBnZXRNYXRjaChzY29wZVVybC5zbGljZSgwLCBzY29wZVVybC5sYXN0SW5kZXhPZignLycpKSwgaW1wb3J0TWFwLnNjb3Blcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXBwbHlQYWNrYWdlcyhyZXNvbHZlZE9yUGxhaW4sIGltcG9ydE1hcC5pbXBvcnRzKSB8fCByZXNvbHZlZE9yUGxhaW4uaW5kZXhPZignOicpICE9PSAtMSAmJiByZXNvbHZlZE9yUGxhaW47XHJcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnNTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbdHlwZT1lc21zLW9wdGlvbnNdJyk7XHJcblxyXG4gIGNvbnN0IGVzbXNJbml0T3B0aW9ucyA9IG9wdGlvbnNTY3JpcHQgPyBKU09OLnBhcnNlKG9wdGlvbnNTY3JpcHQuaW5uZXJIVE1MKSA6IHNlbGYuZXNtc0luaXRPcHRpb25zID8gc2VsZi5lc21zSW5pdE9wdGlvbnMgOiB7fTtcclxuXHJcbiAgbGV0IHNoaW1Nb2RlID0gISFlc21zSW5pdE9wdGlvbnMuc2hpbU1vZGU7XHJcbiAgY29uc3QgcmVzb2x2ZUhvb2sgPSBnbG9iYWxIb29rKHNoaW1Nb2RlICYmIGVzbXNJbml0T3B0aW9ucy5yZXNvbHZlKTtcclxuXHJcbiAgY29uc3Qgc2tpcCA9IGVzbXNJbml0T3B0aW9ucy5za2lwID8gbmV3IFJlZ0V4cChlc21zSW5pdE9wdGlvbnMuc2tpcCkgOiBudWxsO1xyXG5cclxuICBsZXQgbm9uY2UgPSBlc21zSW5pdE9wdGlvbnMubm9uY2U7XHJcblxyXG4gIGlmICghbm9uY2UpIHtcclxuICAgIGNvbnN0IG5vbmNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtub25jZV0nKTtcclxuICAgIGlmIChub25jZUVsZW1lbnQpXHJcbiAgICAgIG5vbmNlID0gbm9uY2VFbGVtZW50Lm5vbmNlIHx8IG5vbmNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25vbmNlJyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvbmVycm9yID0gZ2xvYmFsSG9vayhlc21zSW5pdE9wdGlvbnMub25lcnJvciB8fCBub29wKTtcclxuICBjb25zdCBvbnBvbHlmaWxsID0gZXNtc0luaXRPcHRpb25zLm9ucG9seWZpbGwgPyBnbG9iYWxIb29rKGVzbXNJbml0T3B0aW9ucy5vbnBvbHlmaWxsKSA6ICgpID0+IGNvbnNvbGUuaW5mbyhgT0s6IFwiVW5jYXVnaHQgVHlwZUVycm9yXCIgbW9kdWxlIGZhaWx1cmUgaGFzIGJlZW4gcG9seWZpbGxlZGApO1xyXG5cclxuICBjb25zdCB7IHJldm9rZUJsb2JVUkxzLCBub0xvYWRFdmVudFJldHJpZ2dlcnMsIGVuZm9yY2VJbnRlZ3JpdHkgfSA9IGVzbXNJbml0T3B0aW9ucztcclxuXHJcbiAgY29uc3QgZmV0Y2hIb29rID0gZXNtc0luaXRPcHRpb25zLmZldGNoID8gZ2xvYmFsSG9vayhlc21zSW5pdE9wdGlvbnMuZmV0Y2gpIDogZmV0Y2g7XHJcblxyXG4gIGZ1bmN0aW9uIGdsb2JhbEhvb2sgKG5hbWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgPyBzZWxmW25hbWVdIDogbmFtZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGVuYWJsZSA9IEFycmF5LmlzQXJyYXkoZXNtc0luaXRPcHRpb25zLnBvbHlmaWxsRW5hYmxlKSA/IGVzbXNJbml0T3B0aW9ucy5wb2x5ZmlsbEVuYWJsZSA6IFtdO1xyXG4gIGNvbnN0IGNzc01vZHVsZXNFbmFibGVkID0gZW5hYmxlLmluY2x1ZGVzKCdjc3MtbW9kdWxlcycpO1xyXG4gIGNvbnN0IGpzb25Nb2R1bGVzRW5hYmxlZCA9IGVuYWJsZS5pbmNsdWRlcygnanNvbi1tb2R1bGVzJyk7XHJcblxyXG4gIGZ1bmN0aW9uIHNldFNoaW1Nb2RlICgpIHtcclxuICAgIHNoaW1Nb2RlID0gdHJ1ZTtcclxuICB9XG5cbiAgbGV0IHN1cHBvcnRzRHluYW1pY0ltcG9ydENoZWNrID0gZmFsc2U7XHJcblxyXG4gIGxldCBkeW5hbWljSW1wb3J0O1xyXG4gIHRyeSB7XHJcbiAgICBkeW5hbWljSW1wb3J0ID0gKDAsIGV2YWwpKCd1PT5pbXBvcnQodSknKTtcclxuICAgIHN1cHBvcnRzRHluYW1pY0ltcG9ydENoZWNrID0gdHJ1ZTtcclxuICB9XHJcbiAgY2F0Y2ggKGUpIHt9XHJcblxyXG4gIGlmICghc3VwcG9ydHNEeW5hbWljSW1wb3J0Q2hlY2spIHtcclxuICAgIGxldCBlcnI7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBfZXJyID0+IGVyciA9IF9lcnIpO1xyXG4gICAgZHluYW1pY0ltcG9ydCA9ICh1cmwsIHsgZXJyVXJsID0gdXJsIH0pID0+IHtcclxuICAgICAgZXJyID0gdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBzcmMgPSBjcmVhdGVCbG9iKGBpbXBvcnQqYXMgbSBmcm9tJyR7dXJsfSc7c2VsZi5fZXNtc2k9bTtgKTtcclxuICAgICAgY29uc3QgcyA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksIHsgdHlwZTogJ21vZHVsZScsIHNyYyB9KTtcclxuICAgICAgcy5zZXRBdHRyaWJ1dGUoJ25vc2hpbScsICcnKTtcclxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHMpO1xyXG4gICAgICAgICAgaWYgKHNlbGYuX2VzbXNpKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZi5fZXNtc2ksIGJhc2VVcmwpO1xyXG4gICAgICAgICAgICBzZWxmLl9lc21zaSA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVyci5lcnJvciB8fCBuZXcgRXJyb3IoYEVycm9yIGxvYWRpbmcgb3IgZXhlY3V0aW5nIHRoZSBncmFwaCBvZiAke2VyclVybH0gKGNoZWNrIHRoZSBjb25zb2xlIGZvciAke3NyY30pLmApKTtcclxuICAgICAgICAgICAgZXJyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxuXG4gIC8vIHN1cHBvcnQgYnJvd3NlcnMgd2l0aG91dCBkeW5hbWljIGltcG9ydCBzdXBwb3J0IChlZyBGaXJlZm94IDZ4KVxyXG4gIGxldCBzdXBwb3J0c0pzb25Bc3NlcnRpb25zID0gZmFsc2U7XHJcbiAgbGV0IHN1cHBvcnRzQ3NzQXNzZXJ0aW9ucyA9IGZhbHNlO1xyXG5cclxuICBsZXQgc3VwcG9ydHNJbXBvcnRNZXRhID0gZmFsc2U7XHJcbiAgbGV0IHN1cHBvcnRzSW1wb3J0TWFwcyA9IGZhbHNlO1xyXG5cclxuICBsZXQgc3VwcG9ydHNEeW5hbWljSW1wb3J0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0IGZlYXR1cmVEZXRlY3Rpb25Qcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHN1cHBvcnRzRHluYW1pY0ltcG9ydENoZWNrKS50aGVuKF9zdXBwb3J0c0R5bmFtaWNJbXBvcnQgPT4ge1xyXG4gICAgaWYgKCFfc3VwcG9ydHNEeW5hbWljSW1wb3J0KVxyXG4gICAgICByZXR1cm47XHJcbiAgICBzdXBwb3J0c0R5bmFtaWNJbXBvcnQgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgIGR5bmFtaWNJbXBvcnQoY3JlYXRlQmxvYignaW1wb3J0Lm1ldGEnKSkudGhlbigoKSA9PiBzdXBwb3J0c0ltcG9ydE1ldGEgPSB0cnVlLCBub29wKSxcclxuICAgICAgY3NzTW9kdWxlc0VuYWJsZWQgJiYgZHluYW1pY0ltcG9ydChjcmVhdGVCbG9iKCdpbXBvcnRcImRhdGE6dGV4dC9jc3Mse31cImFzc2VydHt0eXBlOlwiY3NzXCJ9JykpLnRoZW4oKCkgPT4gc3VwcG9ydHNDc3NBc3NlcnRpb25zID0gdHJ1ZSwgbm9vcCksXHJcbiAgICAgIGpzb25Nb2R1bGVzRW5hYmxlZCAmJiBkeW5hbWljSW1wb3J0KGNyZWF0ZUJsb2IoJ2ltcG9ydFwiZGF0YTp0ZXh0L2pzb24se31cImFzc2VydHt0eXBlOlwianNvblwifScpKS50aGVuKCgpID0+IHN1cHBvcnRzSnNvbkFzc2VydGlvbnMgPSB0cnVlLCBub29wKSxcclxuICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2VsZi5fJHMgPSB2ID0+IHtcclxuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICAgIGlmICh2KSBzdXBwb3J0c0ltcG9ydE1hcHMgPSB0cnVlO1xyXG4gICAgICAgICAgZGVsZXRlIHNlbGYuXyRzO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSBjcmVhdGVCbG9iKGA8c2NyaXB0IHR5cGU9aW1wb3J0bWFwIG5vbmNlPVwiJHtub25jZX1cIj57XCJpbXBvcnRzXCI6e1wieFwiOlwiZGF0YTp0ZXh0L2phdmFzY3JpcHQsXCJ9fTwkeycnfS9zY3JpcHQ+PHNjcmlwdCBub25jZT1cIiR7bm9uY2V9XCI+aW1wb3J0KCd4JykudGhlbigoKT0+MSwoKT0+MCkudGhlbih2PT5wYXJlbnQuXyRzKHYpKTwkeycnfS9zY3JpcHQ+YCwgJ3RleHQvaHRtbCcpO1xyXG4gICAgICB9KVxyXG4gICAgXSk7XHJcbiAgfSk7XG5cbiAgLyogZXMtbW9kdWxlLWxleGVyIDAuOS4zICovXG4gIGNvbnN0IEE9MT09PW5ldyBVaW50OEFycmF5KG5ldyBVaW50MTZBcnJheShbMV0pLmJ1ZmZlcilbMF07ZnVuY3Rpb24gcGFyc2UoRSxJPVwiQFwiKXtpZighQilyZXR1cm4gaW5pdC50aGVuKCgpPT5wYXJzZShFKSk7Y29uc3QgZz1FLmxlbmd0aCsxLEQ9KEIuX19oZWFwX2Jhc2UudmFsdWV8fEIuX19oZWFwX2Jhc2UpKzQqZy1CLm1lbW9yeS5idWZmZXIuYnl0ZUxlbmd0aDtEPjAmJkIubWVtb3J5Lmdyb3coTWF0aC5jZWlsKEQvNjU1MzYpKTtjb25zdCB3PUIuc2EoZy0xKTtpZigoQT9DOlEpKEUsbmV3IFVpbnQxNkFycmF5KEIubWVtb3J5LmJ1ZmZlcix3LGcpKSwhQi5wYXJzZSgpKXRocm93IE9iamVjdC5hc3NpZ24obmV3IEVycm9yKGBQYXJzZSBlcnJvciAke0l9OiR7RS5zbGljZSgwLEIuZSgpKS5zcGxpdChcIlxcblwiKS5sZW5ndGh9OiR7Qi5lKCktRS5sYXN0SW5kZXhPZihcIlxcblwiLEIuZSgpLTEpfWApLHtpZHg6Qi5lKCl9KTtjb25zdCBMPVtdLGs9W107Zm9yKDtCLnJpKCk7KXtjb25zdCBBPUIuaXMoKSxRPUIuaWUoKSxDPUIuYWkoKSxJPUIuaWQoKSxnPUIuc3MoKSxEPUIuc2UoKTtsZXQgdztCLmlwKCkmJih3PUooRS5zbGljZSgtMT09PUk/QS0xOkEsLTE9PT1JP1ErMTpRKSkpLEwucHVzaCh7bjp3LHM6QSxlOlEsc3M6ZyxzZTpELGQ6SSxhOkN9KTt9Zm9yKDtCLnJlKCk7KXtjb25zdCBBPUUuc2xpY2UoQi5lcygpLEIuZWUoKSksUT1BWzBdO2sucHVzaCgnXCInPT09UXx8XCInXCI9PT1RP0ooQSk6QSk7fWZ1bmN0aW9uIEooQSl7dHJ5e3JldHVybiAoMCxldmFsKShBKX1jYXRjaChBKXt9fXJldHVybiBbTCxrLCEhQi5mKCldfWZ1bmN0aW9uIFEoQSxRKXtjb25zdCBDPUEubGVuZ3RoO2xldCBCPTA7Zm9yKDtCPEM7KXtjb25zdCBDPUEuY2hhckNvZGVBdChCKTtRW0IrK109KDI1NSZDKTw8OHxDPj4+ODt9fWZ1bmN0aW9uIEMoQSxRKXtjb25zdCBDPUEubGVuZ3RoO2xldCBCPTA7Zm9yKDtCPEM7KVFbQl09QS5jaGFyQ29kZUF0KEIrKyk7fWxldCBCO2NvbnN0IGluaXQ9V2ViQXNzZW1ibHkuY29tcGlsZSgoRT1cIkFHRnpiUUVBQUFBQlhBMWdBWDhCZjJBRWYzOS9md0JnQW45L0FHQUFBWDlnQm45L2YzOS9md0YvWUFBQVlBRi9BR0FFZjM5L2Z3Ri9ZQU4vZjM4QmYyQUhmMzkvZjM5L2Z3Ri9ZQVYvZjM5L2Z3Ri9ZQUovZndGL1lBaC9mMzkvZjM5L2Z3Ri9BekV3QUFFQ0F3TURBd01EQXdNREF3TURBd0FBQkFVRkJRWUZCZ0FBQUFBRkJRQUVCd2dKQ2dzTUFBSUFBQUFMQXdrTUJBVUJjQUVCQVFVREFRQUJCZzhDZndGQjhQQUFDMzhBUWZEd0FBc0haQkVHYldWdGIzSjVBZ0FDYzJFQUFBRmxBQU1DYVhNQUJBSnBaUUFGQW5OekFBWUNjMlVBQndKaGFRQUlBbWxrQUFrQ2FYQUFDZ0psY3dBTEFtVmxBQXdDY21rQURRSnlaUUFPQVdZQUR3VndZWEp6WlFBUUMxOWZhR1ZoY0Y5aVlYTmxBd0VLOGprd2FBRUJmMEVBSUFBMkFyZ0lRUUFvQXBBSUlnRWdBRUVCZEdvaUFFRUFPd0VBUVFBZ0FFRUNhaUlBTmdLOENFRUFJQUEyQXNBSVFRQkJBRFlDbEFoQkFFRUFOZ0trQ0VFQVFRQTJBcHdJUVFCQkFEWUNtQWhCQUVFQU5nS3NDRUVBUVFBMkFxQUlJQUVMc2dFQkFuOUJBQ2dDcEFnaUJFRWNha0dVQ0NBRUcwRUFLQUxBQ0NJRk5nSUFRUUFnQlRZQ3BBaEJBQ0FFTmdLb0NFRUFJQVZCSUdvMkFzQUlJQVVnQURZQ0NBSkFBa0JCQUNnQ2lBZ2dBMGNOQUNBRklBSTJBZ3dNQVFzQ1FFRUFLQUtFQ0NBRFJ3MEFJQVVnQWtFQ2FqWUNEQXdCQ3lBRlFRQW9BcEFJTmdJTUN5QUZJQUUyQWdBZ0JTQUROZ0lVSUFWQkFEWUNFQ0FGSUFJMkFnUWdCVUVBTmdJY0lBVkJBQ2dDaEFnZ0EwWTZBQmdMU0FFQmYwRUFLQUtzQ0NJQ1FRaHFRWmdJSUFJYlFRQW9Bc0FJSWdJMkFnQkJBQ0FDTmdLc0NFRUFJQUpCREdvMkFzQUlJQUpCQURZQ0NDQUNJQUUyQWdRZ0FpQUFOZ0lBQ3dnQVFRQW9Bc1FJQ3hVQVFRQW9BcHdJS0FJQVFRQW9BcEFJYTBFQmRRc1ZBRUVBS0FLY0NDZ0NCRUVBS0FLUUNHdEJBWFVMRlFCQkFDZ0NuQWdvQWdoQkFDZ0NrQWhyUVFGMUN4VUFRUUFvQXB3SUtBSU1RUUFvQXBBSWEwRUJkUXNlQVFGL1FRQW9BcHdJS0FJUUlnQkJBQ2dDa0FoclFRRjFRWDhnQUJzTE93RUJmd0pBUVFBb0Fwd0lLQUlVSWdCQkFDZ0NoQWhIRFFCQmZ3OExBa0FnQUVFQUtBS0lDRWNOQUVGK0R3c2dBRUVBS0FLUUNHdEJBWFVMQ3dCQkFDZ0NuQWd0QUJnTEZRQkJBQ2dDb0Fnb0FnQkJBQ2dDa0FoclFRRjFDeFVBUVFBb0FxQUlLQUlFUVFBb0FwQUlhMEVCZFFzbEFRRi9RUUJCQUNnQ25BZ2lBRUVjYWtHVUNDQUFHeWdDQUNJQU5nS2NDQ0FBUVFCSEN5VUJBWDlCQUVFQUtBS2dDQ0lBUVFocVFaZ0lJQUFiS0FJQUlnQTJBcUFJSUFCQkFFY0xDQUJCQUMwQXlBZ0w5Z3NCQkg4akFFR0E4QUJySWdFa0FFRUFRUUU2QU1nSVFRQkIvLzhET3dIT0NFRUFRUUFvQW93SU5nTFFDRUVBUVFBb0FwQUlRWDVxSWdJMkF1UUlRUUFnQWtFQUtBSzRDRUVCZEdvaUF6WUM2QWhCQUVFQU93SEtDRUVBUVFBN0Fjd0lRUUJCQURvQTFBaEJBRUVBTmdMRUNFRUFRUUE2QUxRSVFRQWdBVUdBMEFCcU5nTFlDRUVBSUFGQmdCQnFOZ0xjQ0VFQVFRQTZBT0FJQWtBQ1FBSkFBa0FEUUVFQUlBSkJBbW9pQkRZQzVBZ2dBaUFEVHcwQkFrQWdCQzhCQUNJRFFYZHFRUVZKRFFBQ1FBSkFBa0FDUUFKQUlBTkJtMzlxRGdVQkNBZ0lBZ0FMSUFOQklFWU5CQ0FEUVM5R0RRTWdBMEU3UmcwQ0RBY0xRUUF2QWN3SURRRWdCQkFSUlEwQklBSkJCR3BCK0FCQjhBQkI3d0JCOGdCQjlBQVFFa1VOQVJBVFFRQXRBTWdJRFFGQkFFRUFLQUxrQ0NJQ05nTFFDQXdIQ3lBRUVCRkZEUUFnQWtFRWFrSHRBRUh3QUVIdkFFSHlBRUgwQUJBU1JRMEFFQlFMUVFCQkFDZ0M1QWcyQXRBSURBRUxBa0FnQWk4QkJDSUVRU3BHRFFBZ0JFRXZSdzBFRUJVTUFRdEJBUkFXQzBFQUtBTG9DQ0VEUVFBb0F1UUlJUUlNQUFzTFFRQWhBeUFFSVFKQkFDMEF0QWdOQWd3QkMwRUFJQUkyQXVRSVFRQkJBRG9BeUFnTEEwQkJBQ0FDUVFKcUlnUTJBdVFJQWtBQ1FBSkFBa0FDUUFKQUlBSkJBQ2dDNkFoUERRQWdCQzhCQUNJRFFYZHFRUVZKRFFVQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FDQURRV0JxRGdvUERnZ09EZzRPQndFQ0FBc0NRQUpBQWtBQ1FDQURRYUIvYWc0S0NCRVJBeEVCRVJFUkFnQUxJQU5CaFg5cURnTUZFQVlMQzBFQUx3SE1DQTBQSUFRUUVVVU5EeUFDUVFScVFmZ0FRZkFBUWU4QVFmSUFRZlFBRUJKRkRROFFFd3dQQ3lBRUVCRkZEUTRnQWtFRWFrSHRBRUh3QUVIdkFFSHlBRUgwQUJBU1JRME9FQlFNRGdzZ0JCQVJSUTBOSUFJdkFRcEI4d0JIRFEwZ0FpOEJDRUh6QUVjTkRTQUNMd0VHUWVFQVJ3ME5JQUl2QVFSQjdBQkhEUTBnQWk4QkRDSUVRWGRxSWdKQkYwc05DMEVCSUFKMFFaK0FnQVJ4UlEwTERBd0xRUUJCQUM4QnpBZ2lBa0VCYWpzQnpBaEJBQ2dDM0FnZ0FrRUNkR3BCQUNnQzBBZzJBZ0FNREF0QkFDOEJ6QWdpQWtVTkNFRUFJQUpCZjJvaUF6c0J6QWhCQUNnQ3NBZ2lBa1VOQ3lBQ0tBSVVRUUFvQXR3SUlBTkIvLzhEY1VFQ2RHb29BZ0JIRFFzQ1FDQUNLQUlFRFFBZ0FpQUVOZ0lFQ3lBQ0lBUTJBZ3hCQUVFQU5nS3dDQXdMQ3dKQVFRQW9BdEFJSWdRdkFRQkJLVWNOQUVFQUtBS2tDQ0lDUlEwQUlBSW9BZ1FnQkVjTkFFRUFRUUFvQXFnSUlnSTJBcVFJQWtBZ0FrVU5BQ0FDUVFBMkFod01BUXRCQUVFQU5nS1VDQXNnQVVFQUx3SE1DQ0lDYWtFQUxRRGdDRG9BQUVFQUlBSkJBV283QWN3SVFRQW9BdHdJSUFKQkFuUnFJQVEyQWdCQkFFRUFPZ0RnQ0F3S0MwRUFMd0hNQ0NJQ1JRMEdRUUFnQWtGL2FpSURPd0hNQ0NBQ1FRQXZBYzRJSWdSSERRRkJBRUVBTHdIS0NFRi9haUlDT3dIS0NFRUFRUUFvQXRnSUlBSkIvLzhEY1VFQmRHb3ZBUUE3QWM0SUN4QVhEQWdMSUFSQi8vOERSZzBISUFOQi8vOERjU0FFU1EwRURBY0xRU2NRR0F3R0MwRWlFQmdNQlFzZ0EwRXZSdzBFQWtBQ1FDQUNMd0VFSWdKQktrWU5BQ0FDUVM5SERRRVFGUXdIQzBFQkVCWU1CZ3NDUUFKQUFrQUNRRUVBS0FMUUNDSUVMd0VBSWdJUUdVVU5BQUpBQWtBQ1FDQUNRVlZxRGdRQkJRSUFCUXNnQkVGK2FpOEJBRUZRYWtILy93TnhRUXBKRFFNTUJBc2dCRUYrYWk4QkFFRXJSZzBDREFNTElBUkJmbW92QVFCQkxVWU5BUXdDQ3dKQUlBSkIvUUJHRFFBZ0FrRXBSdzBCUVFBb0F0d0lRUUF2QWN3SVFRSjBhaWdDQUJBYVJRMEJEQUlMUVFBb0F0d0lRUUF2QWN3SUlnTkJBblJxS0FJQUVCc05BU0FCSUFOcUxRQUFEUUVMSUFRUUhBMEFJQUpGRFFCQkFTRUVJQUpCTDBaQkFDMEExQWhCQUVkeFJRMEJDeEFkUVFBaEJBdEJBQ0FFT2dEVUNBd0VDMEVBTHdIT0NFSC8vd05HUVFBdkFjd0lSWEZCQUMwQXRBaEZjU0VEREFZTEVCNUJBQ0VEREFVTElBUkJvQUZIRFFFTFFRQkJBVG9BNEFnTFFRQkJBQ2dDNUFnMkF0QUlDMEVBS0FMa0NDRUNEQUFMQ3lBQlFZRHdBR29rQUNBREN4MEFBa0JCQUNnQ2tBZ2dBRWNOQUVFQkR3c2dBRUYrYWk4QkFCQWZDejhCQVg5QkFDRUdBa0FnQUM4QkNDQUZSdzBBSUFBdkFRWWdCRWNOQUNBQUx3RUVJQU5IRFFBZ0FDOEJBaUFDUncwQUlBQXZBUUFnQVVZaEJnc2dCZ3ZVQmdFRWYwRUFRUUFvQXVRSUlnQkJER29pQVRZQzVBaEJBUkFuSVFJQ1FBSkFBa0FDUUFKQVFRQW9BdVFJSWdNZ0FVY05BQ0FDRUN0RkRRRUxBa0FDUUFKQUFrQUNRQ0FDUVo5L2FnNE1CZ0VEQ0FFSEFRRUJBUUVFQUFzQ1FBSkFJQUpCS2tZTkFDQUNRZllBUmcwRklBSkIrd0JIRFFKQkFDQURRUUpxTmdMa0NFRUJFQ2NoQTBFQUtBTGtDQ0VCQTBBQ1FBSkFJQU5CLy84RGNTSUNRU0pHRFFBZ0FrRW5SZzBBSUFJUUtocEJBQ2dDNUFnaEFnd0JDeUFDRUJoQkFFRUFLQUxrQ0VFQ2FpSUNOZ0xrQ0F0QkFSQW5HZ0pBSUFFZ0FoQXNJZ05CTEVjTkFFRUFRUUFvQXVRSVFRSnFOZ0xrQ0VFQkVDY2hBd3RCQUNnQzVBZ2hBZ0pBSUFOQi9RQkdEUUFnQWlBQlJnMEZJQUloQVNBQ1FRQW9BdWdJVFEwQkRBVUxDMEVBSUFKQkFtbzJBdVFJREFFTFFRQWdBMEVDYWpZQzVBaEJBUkFuR2tFQUtBTGtDQ0lDSUFJUUxCb0xRUUVRSnlFQ0MwRUFLQUxrQ0NFREFrQWdBa0htQUVjTkFDQURMd0VHUWUwQVJ3MEFJQU12QVFSQjd3QkhEUUFnQXk4QkFrSHlBRWNOQUVFQUlBTkJDR28yQXVRSUlBQkJBUkFuRUNnUEMwRUFJQU5CZm1vMkF1UUlEQU1MRUI0UEN3SkFJQU12QVFoQjh3QkhEUUFnQXk4QkJrSHpBRWNOQUNBREx3RUVRZUVBUncwQUlBTXZBUUpCN0FCSERRQWdBeThCQ2hBZlJRMEFRUUFnQTBFS2FqWUM1QWhCQVJBbklRSkJBQ2dDNUFnaEF5QUNFQ29hSUFOQkFDZ0M1QWdRQWtFQVFRQW9BdVFJUVg1cU5nTGtDQThMUVFBZ0EwRUVhaUlETmdMa0NBdEJBQ0FEUVFScUlnSTJBdVFJUVFCQkFEb0F5QWdEUUVFQUlBSkJBbW8yQXVRSVFRRVFKeUVEUVFBb0F1UUlJUUlDUUNBREVDcEJJSEpCK3dCSERRQkJBRUVBS0FMa0NFRithallDNUFnUEMwRUFLQUxrQ0NJRElBSkdEUUVnQWlBREVBSUNRRUVCRUNjaUFrRXNSZzBBQWtBZ0FrRTlSdzBBUVFCQkFDZ0M1QWhCZm1vMkF1UUlEd3RCQUVFQUtBTGtDRUYrYWpZQzVBZ1BDMEVBS0FMa0NDRUNEQUFMQ3c4TFFRQWdBMEVLYWpZQzVBaEJBUkFuR2tFQUtBTGtDQ0VEQzBFQUlBTkJFR28yQXVRSUFrQkJBUkFuSWdKQktrY05BRUVBUVFBb0F1UUlRUUpxTmdMa0NFRUJFQ2NoQWd0QkFDZ0M1QWdoQXlBQ0VDb2FJQU5CQUNnQzVBZ1FBa0VBUVFBb0F1UUlRWDVxTmdMa0NBOExJQU1nQTBFT2FoQUNDNjRHQVFSL1FRQkJBQ2dDNUFnaUFFRU1haUlCTmdMa0NBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFRUUVRSnlJQ1FWbHFEZ2dDQ0FFQ0FRRUJCd0FMSUFKQklrWU5BU0FDUWZzQVJnMENDMEVBS0FMa0NDQUJSZzBIQzBFQUx3SE1DQTBCUVFBb0F1UUlJUUpCQUNnQzZBZ2hBd05BSUFJZ0EwOE5CQUpBQWtBZ0FpOEJBQ0lCUVNkR0RRQWdBVUVpUncwQkN5QUFJQUVRS0E4TFFRQWdBa0VDYWlJQ05nTGtDQXdBQ3d0QkFDZ0M1QWdoQWtFQUx3SE1DQTBCQWtBRFFBSkFBa0FDUUNBQ1FRQW9BdWdJVHcwQVFRRVFKeUlDUVNKR0RRRWdBa0VuUmcwQklBSkIvUUJIRFFKQkFFRUFLQUxrQ0VFQ2FqWUM1QWdMUVFFUUp4cEJBQ2dDNUFnaUFpOEJCa0h0QUVjTkJpQUNMd0VFUWU4QVJ3MEdJQUl2QVFKQjhnQkhEUVlnQWk4QkFFSG1BRWNOQmtFQUlBSkJDR28yQXVRSVFRRVFKeUlDUVNKR0RRTWdBa0VuUmcwRERBWUxJQUlRR0F0QkFFRUFLQUxrQ0VFQ2FpSUNOZ0xrQ0F3QUN3c2dBQ0FDRUNnTUJRdEJBRUVBS0FMa0NFRithallDNUFnUEMwRUFJQUpCZm1vMkF1UUlEd3NRSGc4TFFRQkJBQ2dDNUFoQkFtbzJBdVFJUVFFUUowSHRBRWNOQVVFQUtBTGtDQ0lDTHdFR1FlRUFSdzBCSUFJdkFRUkI5QUJIRFFFZ0FpOEJBa0hsQUVjTkFVRUFLQUxRQ0M4QkFFRXVSZzBCSUFBZ0FDQUNRUWhxUVFBb0FvZ0lFQUVQQzBFQUtBTGNDRUVBTHdITUNDSUNRUUowYWlBQU5nSUFRUUFnQWtFQmFqc0J6QWhCQUNnQzBBZ3ZBUUJCTGtZTkFDQUFRUUFvQXVRSVFRSnFRUUFnQUJBQlFRQkJBQ2dDcEFnMkFyQUlRUUJCQUNnQzVBaEJBbW8yQXVRSUFrQkJBUkFuSWdKQklrWU5BQ0FDUVNkR0RRQkJBRUVBS0FMa0NFRithallDNUFnUEN5QUNFQmhCQUVFQUtBTGtDRUVDYWpZQzVBZ0NRQUpBQWtCQkFSQW5RVmRxRGdRQkFnSUFBZ3RCQUNnQ3BBaEJBQ2dDNUFnaUFqWUNCRUVBSUFKQkFtbzJBdVFJUVFFUUp4cEJBQ2dDcEFnaUFrRUJPZ0FZSUFKQkFDZ0M1QWdpQVRZQ0VFRUFJQUZCZm1vMkF1UUlEd3RCQUNnQ3BBZ2lBa0VCT2dBWUlBSkJBQ2dDNUFnaUFUWUNEQ0FDSUFFMkFnUkJBRUVBTHdITUNFRi9hanNCekFnUEMwRUFRUUFvQXVRSVFYNXFOZ0xrQ0E4TEMwY0JBMzlCQUNnQzVBaEJBbW9oQUVFQUtBTG9DQ0VCQWtBRFFDQUFJZ0pCZm1vZ0FVOE5BU0FDUVFKcUlRQWdBaThCQUVGMmFnNEVBUUFBQVFBTEMwRUFJQUkyQXVRSUM1Z0JBUU4vUVFCQkFDZ0M1QWdpQVVFQ2FqWUM1QWdnQVVFR2FpRUJRUUFvQXVnSUlRSURRQUpBQWtBQ1FDQUJRWHhxSUFKUERRQWdBVUYrYWk4QkFDRURBa0FDUUNBQURRQWdBMEVxUmcwQklBTkJkbW9PQkFJRUJBSUVDeUFEUVNwSERRTUxJQUV2QVFCQkwwY05Ba0VBSUFGQmZtbzJBdVFJREFFTElBRkJmbW9oQVF0QkFDQUJOZ0xrQ0E4TElBRkJBbW9oQVF3QUN3dS9BUUVFZjBFQUtBTGtDQ0VBUVFBb0F1Z0lJUUVDUUFKQUEwQWdBQ0lDUVFKcUlRQWdBaUFCVHcwQkFrQUNRQ0FBTHdFQUlnTkJwSDlxRGdVQkFnSUNCQUFMSUFOQkpFY05BU0FDTHdFRVFmc0FSdzBCUVFCQkFDOEJ5Z2dpQUVFQmFqc0J5Z2hCQUNnQzJBZ2dBRUVCZEdwQkFDOEJ6Z2c3QVFCQkFDQUNRUVJxTmdMa0NFRUFRUUF2QWN3SVFRRnFJZ0E3QWM0SVFRQWdBRHNCekFnUEN5QUNRUVJxSVFBTUFBc0xRUUFnQURZQzVBZ1FIZzhMUVFBZ0FEWUM1QWdMaUFFQkJIOUJBQ2dDNUFnaEFVRUFLQUxvQ0NFQ0FrQUNRQU5BSUFFaUEwRUNhaUVCSUFNZ0FrOE5BU0FCTHdFQUlnUWdBRVlOQWdKQUlBUkIzQUJHRFFBZ0JFRjJhZzRFQWdFQkFnRUxJQU5CQkdvaEFTQURMd0VFUVExSERRQWdBMEVHYWlBQklBTXZBUVpCQ2tZYklRRU1BQXNMUVFBZ0FUWUM1QWdRSGc4TFFRQWdBVFlDNUFnTGJBRUJmd0pBQWtBZ0FFRmZhaUlCUVFWTERRQkJBU0FCZEVFeGNRMEJDeUFBUVVacVFmLy9BM0ZCQmtrTkFDQUFRU2xISUFCQldHcEIvLzhEY1VFSFNYRU5BQUpBSUFCQnBYOXFEZ1FCQUFBQkFBc2dBRUg5QUVjZ0FFR0ZmMnBCLy84RGNVRUVTWEVQQzBFQkN6MEJBWDlCQVNFQkFrQWdBRUgzQUVIb0FFSHBBRUhzQUVIbEFCQWdEUUFnQUVIbUFFSHZBRUh5QUJBaERRQWdBRUhwQUVIbUFCQWlJUUVMSUFFTG13RUJBbjlCQVNFQkFrQUNRQUpBQWtBQ1FBSkFJQUF2QVFBaUFrRkZhZzRFQlFRRUFRQUxBa0FnQWtHYmYyb09CQU1FQkFJQUN5QUNRU2xHRFFRZ0FrSDVBRWNOQXlBQVFYNXFRZVlBUWVrQVFlNEFRZUVBUWV3QVFld0FFQ01QQ3lBQVFYNXFMd0VBUVQxR0R3c2dBRUYrYWtIakFFSGhBRUgwQUVIakFCQWtEd3NnQUVGK2FrSGxBRUhzQUVIekFCQWhEd3RCQUNFQkN5QUJDOUlEQVFKL1FRQWhBUUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQ0FBTHdFQVFaeC9hZzRVQUFFQ0NBZ0lDQWdJQ0FNRUNBZ0ZDQVlJQ0FjSUN3SkFBa0FnQUVGK2FpOEJBRUdYZjJvT0JBQUpDUUVKQ3lBQVFYeHFRZllBUWU4QUVDSVBDeUFBUVh4cVFma0FRZWtBUWVVQUVDRVBDd0pBQWtBZ0FFRithaThCQUVHTmYyb09BZ0FCQ0FzQ1FDQUFRWHhxTHdFQUlnSkI0UUJHRFFBZ0FrSHNBRWNOQ0NBQVFYcHFRZVVBRUNVUEN5QUFRWHBxUWVNQUVDVVBDeUFBUVh4cVFlUUFRZVVBUWV3QVFlVUFFQ1FQQ3lBQVFYNXFMd0VBUWU4QVJ3MEZJQUJCZkdvdkFRQkI1UUJIRFFVQ1FDQUFRWHBxTHdFQUlnSkI4QUJHRFFBZ0FrSGpBRWNOQmlBQVFYaHFRZWtBUWU0QVFmTUFRZlFBUWVFQVFlNEFFQ01QQ3lBQVFYaHFRZlFBUWZrQUVDSVBDMEVCSVFFZ0FFRithaUlBUWVrQUVDVU5CQ0FBUWZJQVFlVUFRZlFBUWZVQVFmSUFFQ0FQQ3lBQVFYNXFRZVFBRUNVUEN5QUFRWDVxUWVRQVFlVUFRZUlBUWZVQVFlY0FRZWNBUWVVQUVDWVBDeUFBUVg1cVFlRUFRZmNBUWVFQVFla0FFQ1FQQ3dKQUlBQkJmbW92QVFBaUFrSHZBRVlOQUNBQ1FlVUFSdzBCSUFCQmZHcEI3Z0FRSlE4TElBQkJmR3BCOUFCQjZBQkI4Z0FRSVNFQkN5QUJDM0FCQW44Q1FBSkFBMEJCQUVFQUtBTGtDQ0lBUVFKcUlnRTJBdVFJSUFCQkFDZ0M2QWhQRFFFQ1FBSkFBa0FnQVM4QkFDSUJRYVYvYWc0Q0FRSUFDd0pBSUFGQmRtb09CQVFEQXdRQUN5QUJRUzlIRFFJTUJBc1FMUm9NQVF0QkFDQUFRUVJxTmdMa0NBd0FDd3NRSGdzTE5RRUJmMEVBUVFFNkFMUUlRUUFvQXVRSUlRQkJBRUVBS0FMb0NFRUNhallDNUFoQkFDQUFRUUFvQXBBSWEwRUJkVFlDeEFnTE5BRUJmMEVCSVFFQ1FDQUFRWGRxUWYvL0EzRkJCVWtOQUNBQVFZQUJja0dnQVVZTkFDQUFRUzVISUFBUUszRWhBUXNnQVF0SkFRTi9RUUFoQmdKQUlBQkJlR29pQjBFQUtBS1FDQ0lJU1EwQUlBY2dBU0FDSUFNZ0JDQUZFQkpGRFFBQ1FDQUhJQWhIRFFCQkFROExJQUJCZG1vdkFRQVFIeUVHQ3lBR0Mxa0JBMzlCQUNFRUFrQWdBRUY4YWlJRlFRQW9BcEFJSWdaSkRRQWdBQzhCQUNBRFJ3MEFJQUJCZm1vdkFRQWdBa2NOQUNBRkx3RUFJQUZIRFFBQ1FDQUZJQVpIRFFCQkFROExJQUJCZW1vdkFRQVFIeUVFQ3lBRUMwd0JBMzlCQUNFREFrQWdBRUYrYWlJRVFRQW9BcEFJSWdWSkRRQWdBQzhCQUNBQ1J3MEFJQVF2QVFBZ0FVY05BQUpBSUFRZ0JVY05BRUVCRHdzZ0FFRjhhaThCQUJBZklRTUxJQU1MU3dFRGYwRUFJUWNDUUNBQVFYWnFJZ2hCQUNnQ2tBZ2lDVWtOQUNBSUlBRWdBaUFESUFRZ0JTQUdFQzVGRFFBQ1FDQUlJQWxIRFFCQkFROExJQUJCZEdvdkFRQVFIeUVIQ3lBSEMyWUJBMzlCQUNFRkFrQWdBRUY2YWlJR1FRQW9BcEFJSWdkSkRRQWdBQzhCQUNBRVJ3MEFJQUJCZm1vdkFRQWdBMGNOQUNBQVFYeHFMd0VBSUFKSERRQWdCaThCQUNBQlJ3MEFBa0FnQmlBSFJ3MEFRUUVQQ3lBQVFYaHFMd0VBRUI4aEJRc2dCUXM5QVFKL1FRQWhBZ0pBUVFBb0FwQUlJZ01nQUVzTkFDQUFMd0VBSUFGSERRQUNRQ0FESUFCSERRQkJBUThMSUFCQmZtb3ZBUUFRSHlFQ0N5QUNDMDBCQTM5QkFDRUlBa0FnQUVGMGFpSUpRUUFvQXBBSUlncEpEUUFnQ1NBQklBSWdBeUFFSUFVZ0JpQUhFQzlGRFFBQ1FDQUpJQXBIRFFCQkFROExJQUJCY21vdkFRQVFIeUVJQ3lBSUM1d0JBUU4vUVFBb0F1UUlJUUVDUUFOQUFrQUNRQ0FCTHdFQUlnSkJMMGNOQUFKQUlBRXZBUUlpQVVFcVJnMEFJQUZCTDBjTkJCQVZEQUlMSUFBUUZnd0JDd0pBQWtBZ0FFVU5BQ0FDUVhkcUlnRkJGMHNOQVVFQklBRjBRWitBZ0FSeFJRMEJEQUlMSUFJUUtVVU5Bd3dCQ3lBQ1FhQUJSdzBDQzBFQVFRQW9BdVFJSWdOQkFtb2lBVFlDNUFnZ0EwRUFLQUxvQ0VrTkFBc0xJQUlMeXdNQkFYOENRQ0FCUVNKR0RRQWdBVUVuUmcwQUVCNFBDMEVBS0FMa0NDRUNJQUVRR0NBQUlBSkJBbXBCQUNnQzVBaEJBQ2dDaEFnUUFVRUFRUUFvQXVRSVFRSnFOZ0xrQ0VFQUVDY2hBRUVBS0FMa0NDRUJBa0FDUUNBQVFlRUFSdzBBSUFGQkFtcEI4d0JCOHdCQjVRQkI4Z0JCOUFBUUVnMEJDMEVBSUFGQmZtbzJBdVFJRHd0QkFDQUJRUXhxTmdMa0NBSkFRUUVRSjBIN0FFWU5BRUVBSUFFMkF1UUlEd3RCQUNnQzVBZ2lBaUVBQTBCQkFDQUFRUUpxTmdMa0NBSkFBa0FDUUVFQkVDY2lBRUVpUmcwQUlBQkJKMGNOQVVFbkVCaEJBRUVBS0FMa0NFRUNhallDNUFoQkFSQW5JUUFNQWd0QkloQVlRUUJCQUNnQzVBaEJBbW8yQXVRSVFRRVFKeUVBREFFTElBQVFLaUVBQ3dKQUlBQkJPa1lOQUVFQUlBRTJBdVFJRHd0QkFFRUFLQUxrQ0VFQ2FqWUM1QWdDUUVFQkVDY2lBRUVpUmcwQUlBQkJKMFlOQUVFQUlBRTJBdVFJRHdzZ0FCQVlRUUJCQUNnQzVBaEJBbW8yQXVRSUFrQUNRRUVCRUNjaUFFRXNSZzBBSUFCQi9RQkdEUUZCQUNBQk5nTGtDQThMUVFCQkFDZ0M1QWhCQW1vMkF1UUlRUUVRSjBIOUFFWU5BRUVBS0FMa0NDRUFEQUVMQzBFQUtBS2tDQ0lCSUFJMkFoQWdBVUVBS0FMa0NFRUNhallDREFzd0FRRi9Ba0FDUUNBQVFYZHFJZ0ZCRjBzTkFFRUJJQUYwUVkyQWdBUnhEUUVMSUFCQm9BRkdEUUJCQUE4TFFRRUxiUUVDZndKQUFrQURRQUpBSUFCQi8vOERjU0lCUVhkcUlnSkJGMHNOQUVFQklBSjBRWitBZ0FSeERRSUxJQUZCb0FGR0RRRWdBQ0VDSUFFUUt3MENRUUFoQWtFQVFRQW9BdVFJSWdCQkFtbzJBdVFJSUFBdkFRSWlBQTBBREFJTEN5QUFJUUlMSUFKQi8vOERjUXRvQVFKL1FRRWhBUUpBQWtBZ0FFRmZhaUlDUVFWTERRQkJBU0FDZEVFeGNRMEJDeUFBUWZqL0EzRkJLRVlOQUNBQVFVWnFRZi8vQTNGQkJra05BQUpBSUFCQnBYOXFJZ0pCQTBzTkFDQUNRUUZIRFFFTElBQkJoWDlxUWYvL0EzRkJCRWtoQVFzZ0FRdUxBUUVDZndKQVFRQW9BdVFJSWdJdkFRQWlBMEhoQUVjTkFFRUFJQUpCQkdvMkF1UUlRUUVRSnlFQ1FRQW9BdVFJSVFBQ1FBSkFJQUpCSWtZTkFDQUNRU2RHRFFBZ0FoQXFHa0VBS0FMa0NDRUJEQUVMSUFJUUdFRUFRUUFvQXVRSVFRSnFJZ0UyQXVRSUMwRUJFQ2NoQTBFQUtBTGtDQ0VDQ3dKQUlBSWdBRVlOQUNBQUlBRVFBZ3NnQXd0eUFRUi9RUUFvQXVRSUlRQkJBQ2dDNkFnaEFRSkFBa0FEUUNBQVFRSnFJUUlnQUNBQlR3MEJBa0FDUUNBQ0x3RUFJZ05CcEg5cURnSUJCQUFMSUFJaEFDQURRWFpxRGdRQ0FRRUNBUXNnQUVFRWFpRUFEQUFMQzBFQUlBSTJBdVFJRUI1QkFBOExRUUFnQWpZQzVBaEIzUUFMU1FFQmYwRUFJUWNDUUNBQUx3RUtJQVpIRFFBZ0FDOEJDQ0FGUncwQUlBQXZBUVlnQkVjTkFDQUFMd0VFSUFOSERRQWdBQzhCQWlBQ1J3MEFJQUF2QVFBZ0FVWWhCd3NnQnd0VEFRRi9RUUFoQ0FKQUlBQXZBUXdnQjBjTkFDQUFMd0VLSUFaSERRQWdBQzhCQ0NBRlJ3MEFJQUF2QVFZZ0JFY05BQ0FBTHdFRUlBTkhEUUFnQUM4QkFpQUNSdzBBSUFBdkFRQWdBVVloQ0FzZ0NBc0xId0lBUVlBSUN3SUFBQUJCaEFnTEVBRUFBQUFDQUFBQUFBUUFBSEE0QUFBPVwiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXI/QnVmZmVyLmZyb20oRSxcImJhc2U2NFwiKTpVaW50OEFycmF5LmZyb20oYXRvYihFKSxBPT5BLmNoYXJDb2RlQXQoMCkpKSkudGhlbihXZWJBc3NlbWJseS5pbnN0YW50aWF0ZSkudGhlbigoe2V4cG9ydHM6QX0pPT57Qj1BO30pO3ZhciBFO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRSZXNvbHZlIChpZCwgcGFyZW50VXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZUltcG9ydE1hcChpbXBvcnRNYXAsIHJlc29sdmVJZk5vdFBsYWluT3JVcmwoaWQsIHBhcmVudFVybCkgfHwgaWQsIHBhcmVudFVybCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBfcmVzb2x2ZSAoaWQsIHBhcmVudFVybCkge1xyXG4gICAgY29uc3QgdXJsUmVzb2x2ZWQgPSByZXNvbHZlSWZOb3RQbGFpbk9yVXJsKGlkLCBwYXJlbnRVcmwpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcjogcmVzb2x2ZUltcG9ydE1hcChpbXBvcnRNYXAsIHVybFJlc29sdmVkIHx8IGlkLCBwYXJlbnRVcmwpLFxyXG4gICAgICAvLyBiID0gYmFyZSBzcGVjaWZpZXJcclxuICAgICAgYjogIXVybFJlc29sdmVkICYmICFpc1VSTChpZClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNvbHZlID0gcmVzb2x2ZUhvb2sgPyBhc3luYyAoaWQsIHBhcmVudFVybCkgPT4gKHsgcjogYXdhaXQgcmVzb2x2ZUhvb2soaWQsIHBhcmVudFVybCwgZGVmYXVsdFJlc29sdmUpLCBiOiBmYWxzZSB9KSA6IF9yZXNvbHZlO1xyXG5cclxuICBsZXQgaWQgPSAwO1xyXG4gIGNvbnN0IHJlZ2lzdHJ5ID0ge307XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGxvYWRBbGwgKGxvYWQsIHNlZW4pIHtcclxuICAgIGlmIChsb2FkLmIgfHwgc2Vlbltsb2FkLnVdKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBzZWVuW2xvYWQudV0gPSAxO1xyXG4gICAgYXdhaXQgbG9hZC5MO1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZC5kLm1hcChkZXAgPT4gbG9hZEFsbChkZXAsIHNlZW4pKSk7XHJcbiAgICBpZiAoIWxvYWQubilcclxuICAgICAgbG9hZC5uID0gbG9hZC5kLnNvbWUoZGVwID0+IGRlcC5uKTtcclxuICB9XHJcblxyXG4gIGxldCBpbXBvcnRNYXAgPSB7IGltcG9ydHM6IHt9LCBzY29wZXM6IHt9IH07XHJcbiAgbGV0IGltcG9ydE1hcFNyY09yTGF6eSA9IGZhbHNlO1xyXG4gIGxldCBiYXNlbGluZVBhc3N0aHJvdWdoO1xyXG5cclxuICBjb25zdCBpbml0UHJvbWlzZSA9IGZlYXR1cmVEZXRlY3Rpb25Qcm9taXNlLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gc2hpbSBtb2RlIGlzIGRldGVybWluZWQgb24gaW5pdGlhbGl6YXRpb24sIG5vIGxhdGUgc2hpbSBtb2RlXHJcbiAgICBpZiAoIXNoaW1Nb2RlKSB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1tb2R1bGUtc2hpbV0sc2NyaXB0W3R5cGU9aW1wb3J0bWFwLXNoaW1dLGxpbmtbcmVsPW1vZHVsZXByZWxvYWQtc2hpbV0nKS5sZW5ndGgpIHtcclxuICAgICAgICBzZXRTaGltTW9kZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCBzZWVuU2NyaXB0ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChjb25zdCBzY3JpcHQgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9bW9kdWxlXSxzY3JpcHRbdHlwZT1pbXBvcnRtYXBdJykpIHtcclxuICAgICAgICAgIGlmICghc2VlblNjcmlwdCkge1xyXG4gICAgICAgICAgICBpZiAoc2NyaXB0LnR5cGUgPT09ICdtb2R1bGUnKVxyXG4gICAgICAgICAgICAgIHNlZW5TY3JpcHQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoc2NyaXB0LnR5cGUgPT09ICdpbXBvcnRtYXAnKSB7XHJcbiAgICAgICAgICAgIGltcG9ydE1hcFNyY09yTGF6eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYmFzZWxpbmVQYXNzdGhyb3VnaCA9IHN1cHBvcnRzRHluYW1pY0ltcG9ydCAmJiBzdXBwb3J0c0ltcG9ydE1ldGEgJiYgc3VwcG9ydHNJbXBvcnRNYXBzICYmICghanNvbk1vZHVsZXNFbmFibGVkIHx8IHN1cHBvcnRzSnNvbkFzc2VydGlvbnMpICYmICghY3NzTW9kdWxlc0VuYWJsZWQgfHwgc3VwcG9ydHNDc3NBc3NlcnRpb25zKSAmJiAhaW1wb3J0TWFwU3JjT3JMYXp5ICYmICFmYWxzZTtcclxuICAgIGlmIChzaGltTW9kZSB8fCAhYmFzZWxpbmVQYXNzdGhyb3VnaCkge1xyXG4gICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XHJcbiAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSAhPT0gJ2NoaWxkTGlzdCcpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG11dGF0aW9uLmFkZGVkTm9kZXMpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ1NDUklQVCcpIHtcclxuICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAoc2hpbU1vZGUgPyAnbW9kdWxlLXNoaW0nIDogJ21vZHVsZScpKVxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1NjcmlwdChub2RlKTtcclxuICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAoc2hpbU1vZGUgPyAnaW1wb3J0bWFwLXNoaW0nIDogJ2ltcG9ydG1hcCcpKVxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0ltcG9ydE1hcChub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnRhZ05hbWUgPT09ICdMSU5LJyAmJiBub2RlLnJlbCA9PT0gKHNoaW1Nb2RlID8gJ21vZHVsZXByZWxvYWQtc2hpbScgOiAnbW9kdWxlcHJlbG9hZCcpKVxyXG4gICAgICAgICAgICAgIHByb2Nlc3NQcmVsb2FkKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkub2JzZXJ2ZShkb2N1bWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcbiAgICAgIHByb2Nlc3NJbXBvcnRNYXBzKCk7XHJcbiAgICAgIHByb2Nlc3NTY3JpcHRzQW5kUHJlbG9hZHMoKTtcclxuICAgICAgcmV0dXJuIGluaXQ7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGV0IGltcG9ydE1hcFByb21pc2UgPSBpbml0UHJvbWlzZTtcclxuICBsZXQgZmlyc3RQb2x5ZmlsbExvYWQgPSB0cnVlO1xyXG4gIGxldCBhY2NlcHRpbmdJbXBvcnRNYXBzID0gdHJ1ZTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gdG9wTGV2ZWxMb2FkICh1cmwsIGZldGNoT3B0cywgc291cmNlLCBuYXRpdmVseUxvYWRlZCwgbGFzdFN0YXRpY0xvYWRQcm9taXNlKSB7XHJcbiAgICBpZiAoIXNoaW1Nb2RlKVxyXG4gICAgICBhY2NlcHRpbmdJbXBvcnRNYXBzID0gZmFsc2U7XHJcbiAgICBhd2FpdCBpbXBvcnRNYXBQcm9taXNlO1xyXG4gICAgLy8gZWFybHkgYW5hbHlzaXMgb3B0LW91dCAtIG5vIG5lZWQgdG8gZXZlbiBmZXRjaCBpZiB3ZSBoYXZlIGZlYXR1cmUgc3VwcG9ydFxyXG4gICAgaWYgKCFzaGltTW9kZSAmJiBiYXNlbGluZVBhc3N0aHJvdWdoKSB7XHJcbiAgICAgIC8vIGZvciBwb2x5ZmlsbCBjYXNlLCBvbmx5IGR5bmFtaWMgaW1wb3J0IG5lZWRzIGEgcmV0dXJuIHZhbHVlIGhlcmUsIGFuZCBkeW5hbWljIGltcG9ydCB3aWxsIG5ldmVyIHBhc3MgbmF0aXZlbHlMb2FkZWRcclxuICAgICAgaWYgKG5hdGl2ZWx5TG9hZGVkKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICBhd2FpdCBsYXN0U3RhdGljTG9hZFByb21pc2U7XHJcbiAgICAgIHJldHVybiBkeW5hbWljSW1wb3J0KHNvdXJjZSA/IGNyZWF0ZUJsb2Ioc291cmNlKSA6IHVybCwgeyBlcnJVcmw6IHVybCB8fCBzb3VyY2UgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsb2FkID0gZ2V0T3JDcmVhdGVMb2FkKHVybCwgZmV0Y2hPcHRzLCBzb3VyY2UpO1xyXG4gICAgY29uc3Qgc2VlbiA9IHt9O1xyXG4gICAgYXdhaXQgbG9hZEFsbChsb2FkLCBzZWVuKTtcclxuICAgIGxhc3RMb2FkID0gdW5kZWZpbmVkO1xyXG4gICAgcmVzb2x2ZURlcHMobG9hZCwgc2Vlbik7XHJcbiAgICBhd2FpdCBsYXN0U3RhdGljTG9hZFByb21pc2U7XHJcbiAgICBpZiAoc291cmNlICYmICFzaGltTW9kZSAmJiAhbG9hZC5uICYmICFmYWxzZSkge1xyXG4gICAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBkeW5hbWljSW1wb3J0KGNyZWF0ZUJsb2Ioc291cmNlKSwgeyBlcnJVcmw6IHNvdXJjZSB9KTtcclxuICAgICAgaWYgKHJldm9rZUJsb2JVUkxzKSByZXZva2VPYmplY3RVUkxzKE9iamVjdC5rZXlzKHNlZW4pKTtcclxuICAgICAgcmV0dXJuIG1vZHVsZTtcclxuICAgIH1cclxuICAgIGlmIChmaXJzdFBvbHlmaWxsTG9hZCAmJiAhc2hpbU1vZGUgJiYgbG9hZC5uICYmIG5hdGl2ZWx5TG9hZGVkKSB7XHJcbiAgICAgIG9ucG9seWZpbGwoKTtcclxuICAgICAgZmlyc3RQb2x5ZmlsbExvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGR5bmFtaWNJbXBvcnQoIXNoaW1Nb2RlICYmICFsb2FkLm4gJiYgbmF0aXZlbHlMb2FkZWQgPyBsb2FkLnUgOiBsb2FkLmIsIHsgZXJyVXJsOiBsb2FkLnUgfSk7XHJcbiAgICAvLyBpZiB0aGUgdG9wLWxldmVsIGxvYWQgaXMgYSBzaGVsbCwgcnVuIGl0cyB1cGRhdGUgZnVuY3Rpb25cclxuICAgIGlmIChsb2FkLnMpXHJcbiAgICAgIChhd2FpdCBkeW5hbWljSW1wb3J0KGxvYWQucykpLnUkXyhtb2R1bGUpO1xyXG4gICAgaWYgKHJldm9rZUJsb2JVUkxzKSByZXZva2VPYmplY3RVUkxzKE9iamVjdC5rZXlzKHNlZW4pKTtcclxuICAgIC8vIHdoZW4gdGxhIGlzIHN1cHBvcnRlZCwgdGhpcyBzaG91bGQgcmV0dXJuIHRoZSB0bGEgcHJvbWlzZSBhcyBhbiBhY3R1YWwgaGFuZGxlXHJcbiAgICAvLyBzbyByZWFkeXN0YXRlIGNhbiBzdGlsbCBjb3JyZXNwb25kIHRvIHRoZSBzeW5jIHN1YmdyYXBoIGV4ZWMgY29tcGxldGlvbnNcclxuICAgIHJldHVybiBtb2R1bGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXZva2VPYmplY3RVUkxzKHJlZ2lzdHJ5S2V5cykge1xyXG4gICAgbGV0IGJhdGNoID0gMDtcclxuICAgIGNvbnN0IGtleXNMZW5ndGggPSByZWdpc3RyeUtleXMubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2NoZWR1bGUgPSBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPyBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgOiBzZWxmLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICAgIHNjaGVkdWxlKGNsZWFudXApO1xyXG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcclxuICAgICAgY29uc3QgYmF0Y2hTdGFydEluZGV4ID0gYmF0Y2ggKiAxMDA7XHJcbiAgICAgIGlmIChiYXRjaFN0YXJ0SW5kZXggPiBrZXlzTGVuZ3RoKSByZXR1cm5cclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgcmVnaXN0cnlLZXlzLnNsaWNlKGJhdGNoU3RhcnRJbmRleCwgYmF0Y2hTdGFydEluZGV4ICsgMTAwKSkge1xyXG4gICAgICAgIGNvbnN0IGxvYWQgPSByZWdpc3RyeVtrZXldO1xyXG4gICAgICAgIGlmIChsb2FkKSBVUkwucmV2b2tlT2JqZWN0VVJMKGxvYWQuYik7XHJcbiAgICAgIH1cclxuICAgICAgYmF0Y2grKztcclxuICAgICAgc2NoZWR1bGUoY2xlYW51cCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBpbXBvcnRTaGltIChpZCwgcGFyZW50VXJsID0gYmFzZVVybCwgX2Fzc2VydGlvbikge1xyXG4gICAgLy8gbmVlZGVkIGZvciBzaGltIGNoZWNrXHJcbiAgICBhd2FpdCBpbml0UHJvbWlzZTtcclxuICAgIGlmIChhY2NlcHRpbmdJbXBvcnRNYXBzIHx8IHNoaW1Nb2RlIHx8ICFiYXNlbGluZVBhc3N0aHJvdWdoKSB7XHJcbiAgICAgIHByb2Nlc3NJbXBvcnRNYXBzKCk7XHJcbiAgICAgIGlmICghc2hpbU1vZGUpXHJcbiAgICAgICAgYWNjZXB0aW5nSW1wb3J0TWFwcyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgaW1wb3J0TWFwUHJvbWlzZTtcclxuICAgIHJldHVybiB0b3BMZXZlbExvYWQoKGF3YWl0IHJlc29sdmUoaWQsIHBhcmVudFVybCkpLnIgfHwgdGhyb3dVbnJlc29sdmVkKGlkLCBwYXJlbnRVcmwpLCB7IGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VsZi5pbXBvcnRTaGltID0gaW1wb3J0U2hpbTtcclxuXHJcbiAgaWYgKHNoaW1Nb2RlKSB7XHJcbiAgICBpbXBvcnRTaGltLmdldEltcG9ydE1hcCA9ICgpID0+IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW1wb3J0TWFwKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtZXRhID0ge307XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGltcG9ydE1ldGFSZXNvbHZlIChpZCwgcGFyZW50VXJsID0gdGhpcy51cmwpIHtcclxuICAgIHJldHVybiAoYXdhaXQgcmVzb2x2ZShpZCwgYCR7cGFyZW50VXJsfWApKS5yIHx8IHRocm93VW5yZXNvbHZlZChpZCwgcGFyZW50VXJsKTtcclxuICB9XHJcblxyXG4gIHNlbGYuX2VzbXNtID0gbWV0YTtcclxuXHJcbiAgZnVuY3Rpb24gdXJsSnNTdHJpbmcgKHVybCkge1xyXG4gICAgcmV0dXJuIGAnJHt1cmwucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpfSdgO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxhc3RMb2FkO1xyXG4gIGZ1bmN0aW9uIHJlc29sdmVEZXBzIChsb2FkLCBzZWVuKSB7XHJcbiAgICBpZiAobG9hZC5iIHx8ICFzZWVuW2xvYWQudV0pXHJcbiAgICAgIHJldHVybjtcclxuICAgIHNlZW5bbG9hZC51XSA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBkZXAgb2YgbG9hZC5kKVxyXG4gICAgICByZXNvbHZlRGVwcyhkZXAsIHNlZW4pO1xyXG5cclxuICAgIGNvbnN0IFtpbXBvcnRzXSA9IGxvYWQuYTtcclxuXHJcbiAgICAvLyBcImV4ZWN1dGlvblwiXHJcbiAgICBjb25zdCBzb3VyY2UgPSBsb2FkLlM7XHJcblxyXG4gICAgLy8gZWRnZSBkb2VzbnQgZXhlY3V0ZSBzaWJsaW5nIGluIG9yZGVyLCBzbyB3ZSBmaXggdGhpcyB1cCBieSBlbnN1cmluZyBhbGwgcHJldmlvdXMgZXhlY3V0aW9ucyBhcmUgZXhwbGljaXQgZGVwZW5kZW5jaWVzXHJcbiAgICBsZXQgcmVzb2x2ZWRTb3VyY2UgPSBlZGdlICYmIGxhc3RMb2FkID8gYGltcG9ydCAnJHtsYXN0TG9hZH0nO2AgOiAnJztcclxuXHJcbiAgICBpZiAoIWltcG9ydHMubGVuZ3RoKSB7XHJcbiAgICAgIHJlc29sdmVkU291cmNlICs9IHNvdXJjZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBvbmNlIGFsbCBkZXBzIGhhdmUgbG9hZGVkIHdlIGNhbiBpbmxpbmUgdGhlIGRlcGVuZGVuY3kgcmVzb2x1dGlvbiBibG9ic1xyXG4gICAgICAvLyBhbmQgZGVmaW5lIHRoaXMgYmxvYlxyXG4gICAgICBsZXQgbGFzdEluZGV4ID0gMCwgZGVwSW5kZXggPSAwO1xyXG4gICAgICBmb3IgKGNvbnN0IHsgczogc3RhcnQsIHNlOiBlbmQsIGQ6IGR5bmFtaWNJbXBvcnRJbmRleCB9IG9mIGltcG9ydHMpIHtcclxuICAgICAgICAvLyBkZXBlbmRlbmN5IHNvdXJjZSByZXBsYWNlbWVudHNcclxuICAgICAgICBpZiAoZHluYW1pY0ltcG9ydEluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgY29uc3QgZGVwTG9hZCA9IGxvYWQuZFtkZXBJbmRleCsrXTtcclxuICAgICAgICAgIGxldCBibG9iVXJsID0gZGVwTG9hZC5iO1xyXG4gICAgICAgICAgaWYgKCFibG9iVXJsKSB7XHJcbiAgICAgICAgICAgIC8vIGNpcmN1bGFyIHNoZWxsIGNyZWF0aW9uXHJcbiAgICAgICAgICAgIGlmICghKGJsb2JVcmwgPSBkZXBMb2FkLnMpKSB7XHJcbiAgICAgICAgICAgICAgYmxvYlVybCA9IGRlcExvYWQucyA9IGNyZWF0ZUJsb2IoYGV4cG9ydCBmdW5jdGlvbiB1JF8obSl7JHtcclxuICAgICAgICAgICAgICBkZXBMb2FkLmFbMV0ubWFwKFxyXG4gICAgICAgICAgICAgICAgbmFtZSA9PiBuYW1lID09PSAnZGVmYXVsdCcgPyBgJF9kZWZhdWx0PW0uZGVmYXVsdGAgOiBgJHtuYW1lfT1tLiR7bmFtZX1gXHJcbiAgICAgICAgICAgICAgKS5qb2luKCcsJylcclxuICAgICAgICAgICAgfX0ke1xyXG4gICAgICAgICAgICAgIGRlcExvYWQuYVsxXS5tYXAobmFtZSA9PlxyXG4gICAgICAgICAgICAgICAgbmFtZSA9PT0gJ2RlZmF1bHQnID8gYGxldCAkX2RlZmF1bHQ7ZXhwb3J0eyRfZGVmYXVsdCBhcyBkZWZhdWx0fWAgOiBgZXhwb3J0IGxldCAke25hbWV9YFxyXG4gICAgICAgICAgICAgICkuam9pbignOycpXHJcbiAgICAgICAgICAgIH1cXG4vLyMgc291cmNlVVJMPSR7ZGVwTG9hZC5yfT9jeWNsZWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBjaXJjdWxhciBzaGVsbCBleGVjdXRpb25cclxuICAgICAgICAgIGVsc2UgaWYgKGRlcExvYWQucykge1xyXG4gICAgICAgICAgICByZXNvbHZlZFNvdXJjZSArPSBgJHtzb3VyY2Uuc2xpY2UobGFzdEluZGV4LCBzdGFydCAtIDEpfS8qJHtzb3VyY2Uuc2xpY2Uoc3RhcnQgLSAxLCBlbmQpfSovJHt1cmxKc1N0cmluZyhibG9iVXJsKX07aW1wb3J0KmFzIG0kXyR7ZGVwSW5kZXh9IGZyb20nJHtkZXBMb2FkLmJ9JztpbXBvcnR7dSRfIGFzIHUkXyR7ZGVwSW5kZXh9fWZyb20nJHtkZXBMb2FkLnN9Jzt1JF8ke2RlcEluZGV4fShtJF8ke2RlcEluZGV4fSlgO1xyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBlbmQ7XHJcbiAgICAgICAgICAgIGRlcExvYWQucyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXNvbHZlZFNvdXJjZSArPSBgJHtzb3VyY2Uuc2xpY2UobGFzdEluZGV4LCBzdGFydCAtIDEpfS8qJHtzb3VyY2Uuc2xpY2Uoc3RhcnQgLSAxLCBlbmQpfSovJHt1cmxKc1N0cmluZyhibG9iVXJsKX1gO1xyXG4gICAgICAgICAgbGFzdEluZGV4ID0gZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbXBvcnQubWV0YVxyXG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWNJbXBvcnRJbmRleCA9PT0gLTIpIHtcclxuICAgICAgICAgIG1ldGFbbG9hZC5yXSA9IHsgdXJsOiBsb2FkLnIsIHJlc29sdmU6IGltcG9ydE1ldGFSZXNvbHZlIH07XHJcbiAgICAgICAgICByZXNvbHZlZFNvdXJjZSArPSBgJHtzb3VyY2Uuc2xpY2UobGFzdEluZGV4LCBzdGFydCl9c2VsZi5fZXNtc21bJHt1cmxKc1N0cmluZyhsb2FkLnIpfV1gO1xyXG4gICAgICAgICAgbGFzdEluZGV4ID0gZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkeW5hbWljIGltcG9ydFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZWRTb3VyY2UgKz0gYCR7c291cmNlLnNsaWNlKGxhc3RJbmRleCwgZHluYW1pY0ltcG9ydEluZGV4ICsgNil9U2hpbSgke3NvdXJjZS5zbGljZShzdGFydCwgZW5kKX0sICR7bG9hZC5yICYmIHVybEpzU3RyaW5nKGxvYWQucil9YDtcclxuICAgICAgICAgIGxhc3RJbmRleCA9IGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc29sdmVkU291cmNlICs9IHNvdXJjZS5zbGljZShsYXN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDsgYW5kIC8vIHRyYWlsZXIgc3VwcG9ydCBhZGRlZCBmb3IgUnVieSA3IHNvdXJjZSBtYXBzIGNvbXBhdGliaWxpdHlcclxuICAgIGxldCBoYXNTb3VyY2VVUkwgPSBmYWxzZTtcclxuICAgIHJlc29sdmVkU291cmNlID0gcmVzb2x2ZWRTb3VyY2UucmVwbGFjZShzb3VyY2VNYXBVUkxSZWdFeCwgKG1hdGNoLCBpc01hcHBpbmcsIHVybCkgPT4gKGhhc1NvdXJjZVVSTCA9ICFpc01hcHBpbmcsIG1hdGNoLnJlcGxhY2UodXJsLCAoKSA9PiBuZXcgVVJMKHVybCwgbG9hZC5yKSkpKTtcclxuICAgIGlmICghaGFzU291cmNlVVJMKVxyXG4gICAgICByZXNvbHZlZFNvdXJjZSArPSAnXFxuLy8jIHNvdXJjZVVSTD0nICsgbG9hZC5yO1xyXG5cclxuICAgIGxvYWQuYiA9IGxhc3RMb2FkID0gY3JlYXRlQmxvYihyZXNvbHZlZFNvdXJjZSk7XHJcbiAgICBsb2FkLlMgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzb3VyY2VNYXBVUkxSZWdFeCA9IC9cXG5cXC9cXC8jIHNvdXJjZShNYXBwaW5nKT9VUkw9KFteXFxuXSspXFxzKigoO3xcXC9cXC9bXiNdW15cXG5dKilcXHMqKSokLztcclxuXHJcbiAgY29uc3QganNDb250ZW50VHlwZSA9IC9eKHRleHR8YXBwbGljYXRpb24pXFwvKHgtKT9qYXZhc2NyaXB0KDt8JCkvO1xyXG4gIGNvbnN0IGpzb25Db250ZW50VHlwZSA9IC9eKHRleHR8YXBwbGljYXRpb24pXFwvanNvbig7fCQpLztcclxuICBjb25zdCBjc3NDb250ZW50VHlwZSA9IC9eKHRleHR8YXBwbGljYXRpb24pXFwvY3NzKDt8JCkvO1xyXG5cclxuICBjb25zdCBjc3NVcmxSZWdFeCA9IC91cmxcXChcXHMqKD86KFtcIiddKSgoPzpcXFxcLnxbXlxcblxcXFxcIiddKSspXFwxfCgoPzpcXFxcLnxbXlxccyxcIicoKVxcXFxdKSspKVxccypcXCkvZztcclxuXHJcbiAgLy8gcmVzdHJpY3QgaW4tZmxpZ2h0IGZldGNoZXMgdG8gYSBwb29sIG9mIDEwMFxyXG4gIGxldCBwID0gW107XHJcbiAgbGV0IGMgPSAwO1xyXG4gIGZ1bmN0aW9uIHB1c2hGZXRjaFBvb2wgKCkge1xyXG4gICAgaWYgKCsrYyA+IDEwMClcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHIgPT4gcC5wdXNoKHIpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcG9wRmV0Y2hQb29sICgpIHtcclxuICAgIGMtLTtcclxuICAgIGlmIChwLmxlbmd0aClcclxuICAgICAgcC5zaGlmdCgpKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBkb0ZldGNoICh1cmwsIGZldGNoT3B0cykge1xyXG4gICAgaWYgKGVuZm9yY2VJbnRlZ3JpdHkgJiYgIWZldGNoT3B0cy5pbnRlZ3JpdHkpXHJcbiAgICAgIHRocm93IEVycm9yKGBObyBpbnRlZ3JpdHkgZm9yICR7dXJsfWApO1xyXG4gICAgY29uc3QgcG9vbFF1ZXVlID0gcHVzaEZldGNoUG9vbCgpO1xyXG4gICAgaWYgKHBvb2xRdWV1ZSkgYXdhaXQgcG9vbFF1ZXVlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IGZldGNoSG9vayh1cmwsIGZldGNoT3B0cyk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgcG9wRmV0Y2hQb29sKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXJlcy5vaylcclxuICAgICAgdGhyb3cgRXJyb3IoYCR7cmVzLnN0YXR1c30gJHtyZXMuc3RhdHVzVGV4dH0gJHtyZXMudXJsfWApO1xyXG4gICAgY29uc3QgY29udGVudFR5cGUgPSByZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xyXG4gICAgaWYgKGpzQ29udGVudFR5cGUudGVzdChjb250ZW50VHlwZSkpXHJcbiAgICAgIHJldHVybiB7IHI6IHJlcy51cmwsIHM6IGF3YWl0IHJlcy50ZXh0KCksIHQ6ICdqcycgfTtcclxuICAgIGVsc2UgaWYgKGpzb25Db250ZW50VHlwZS50ZXN0KGNvbnRlbnRUeXBlKSlcclxuICAgICAgcmV0dXJuIHsgcjogcmVzLnVybCwgczogYGV4cG9ydCBkZWZhdWx0ICR7YXdhaXQgcmVzLnRleHQoKX1gLCB0OiAnanNvbicgfTtcclxuICAgIGVsc2UgaWYgKGNzc0NvbnRlbnRUeXBlLnRlc3QoY29udGVudFR5cGUpKVxyXG4gICAgICByZXR1cm4geyByOiByZXMudXJsLCBzOiBgdmFyIHM9bmV3IENTU1N0eWxlU2hlZXQoKTtzLnJlcGxhY2VTeW5jKCR7XHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KChhd2FpdCByZXMudGV4dCgpKS5yZXBsYWNlKGNzc1VybFJlZ0V4LCAoX21hdGNoLCBxdW90ZXMsIHJlbFVybDEsIHJlbFVybDIpID0+IGB1cmwoJHtxdW90ZXN9JHtyZXNvbHZlVXJsKHJlbFVybDEgfHwgcmVsVXJsMiwgdXJsKX0ke3F1b3Rlc30pYCkpXHJcbiAgICB9KTtleHBvcnQgZGVmYXVsdCBzO2AsIHQ6ICdjc3MnIH07XHJcbiAgICBlbHNlXHJcbiAgICAgIHRocm93IEVycm9yKGBVbnN1cHBvcnRlZCBDb250ZW50LVR5cGUgXCIke2NvbnRlbnRUeXBlfVwiYCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRPckNyZWF0ZUxvYWQgKHVybCwgZmV0Y2hPcHRzLCBzb3VyY2UpIHtcclxuICAgIGxldCBsb2FkID0gcmVnaXN0cnlbdXJsXTtcclxuICAgIGlmIChsb2FkKVxyXG4gICAgICByZXR1cm4gbG9hZDtcclxuXHJcbiAgICBsb2FkID0gcmVnaXN0cnlbdXJsXSA9IHtcclxuICAgICAgLy8gdXJsXHJcbiAgICAgIHU6IHVybCxcclxuICAgICAgLy8gcmVzcG9uc2UgdXJsXHJcbiAgICAgIHI6IHVuZGVmaW5lZCxcclxuICAgICAgLy8gZmV0Y2hQcm9taXNlXHJcbiAgICAgIGY6IHVuZGVmaW5lZCxcclxuICAgICAgLy8gc291cmNlXHJcbiAgICAgIFM6IHVuZGVmaW5lZCxcclxuICAgICAgLy8gbGlua1Byb21pc2VcclxuICAgICAgTDogdW5kZWZpbmVkLFxyXG4gICAgICAvLyBhbmFseXNpc1xyXG4gICAgICBhOiB1bmRlZmluZWQsXHJcbiAgICAgIC8vIGRlcHNcclxuICAgICAgZDogdW5kZWZpbmVkLFxyXG4gICAgICAvLyBibG9iVXJsXHJcbiAgICAgIGI6IHVuZGVmaW5lZCxcclxuICAgICAgLy8gc2hlbGxVcmxcclxuICAgICAgczogdW5kZWZpbmVkLFxyXG4gICAgICAvLyBuZWVkc1NoaW1cclxuICAgICAgbjogZmFsc2UsXHJcbiAgICAgIC8vIHR5cGVcclxuICAgICAgdDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBsb2FkLmYgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgIC8vIHByZWxvYWQgZmV0Y2ggb3B0aW9ucyBvdmVycmlkZSBmZXRjaCBvcHRpb25zIChyYWNlKVxyXG4gICAgICAgIGxldCB0O1xyXG4gICAgICAgICh7IHI6IGxvYWQuciwgczogc291cmNlLCB0IH0gPSBhd2FpdCAoZmV0Y2hDYWNoZVt1cmxdIHx8IGRvRmV0Y2godXJsLCBmZXRjaE9wdHMpKSk7XHJcbiAgICAgICAgaWYgKHQgJiYgIXNoaW1Nb2RlKSB7XHJcbiAgICAgICAgICBpZiAodCA9PT0gJ2NzcycgJiYgIWNzc01vZHVsZXNFbmFibGVkIHx8IHQgPT09ICdqc29uJyAmJiAhanNvbk1vZHVsZXNFbmFibGVkKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgJHt0fS1tb2R1bGVzIHJlcXVpcmUgPHNjcmlwdCB0eXBlPVwiZXNtcy1vcHRpb25zXCI+eyBcInBvbHlmaWxsRW5hYmxlXCI6IFtcIiR7dH0tbW9kdWxlc1wiXSB9PCR7Jyd9L3NjcmlwdD5gKTtcclxuICAgICAgICAgIGlmICh0ID09PSAnY3NzJyAmJiAhc3VwcG9ydHNDc3NBc3NlcnRpb25zIHx8IHQgPT09ICdqc29uJyAmJiAhc3VwcG9ydHNKc29uQXNzZXJ0aW9ucylcclxuICAgICAgICAgICAgbG9hZC5uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsb2FkLmEgPSBwYXJzZShzb3VyY2UsIGxvYWQudSk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgICAgICAgbG9hZC5hID0gW1tdLCBbXV07XHJcbiAgICAgIH1cclxuICAgICAgbG9hZC5TID0gc291cmNlO1xyXG4gICAgICByZXR1cm4gbG9hZDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbG9hZC5MID0gbG9hZC5mLnRoZW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2hpbGRGZXRjaE9wdHMgPSBmZXRjaE9wdHM7XHJcbiAgICAgIGxvYWQuZCA9IChhd2FpdCBQcm9taXNlLmFsbChsb2FkLmFbMF0ubWFwKGFzeW5jICh7IG4sIGQgfSkgPT4ge1xyXG4gICAgICAgIGlmIChkID49IDAgJiYgIXN1cHBvcnRzRHluYW1pY0ltcG9ydCB8fCBkID09PSAyICYmICFzdXBwb3J0c0ltcG9ydE1ldGEpXHJcbiAgICAgICAgICBsb2FkLm4gPSB0cnVlO1xyXG4gICAgICAgIGlmICghbikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHsgciwgYiB9ID0gYXdhaXQgcmVzb2x2ZShuLCBsb2FkLnIgfHwgbG9hZC51KTtcclxuICAgICAgICBpZiAoYiAmJiAoIXN1cHBvcnRzSW1wb3J0TWFwcyB8fCBpbXBvcnRNYXBTcmNPckxhenkpKVxyXG4gICAgICAgICAgbG9hZC5uID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZCAhPT0gLTEpIHJldHVybjtcclxuICAgICAgICBpZiAoIXIpXHJcbiAgICAgICAgICB0aHJvd1VucmVzb2x2ZWQobiwgbG9hZC5yIHx8IGxvYWQudSk7XHJcbiAgICAgICAgaWYgKHNraXAgJiYgc2tpcC50ZXN0KHIpKSByZXR1cm4geyBiOiByIH07XHJcbiAgICAgICAgaWYgKGNoaWxkRmV0Y2hPcHRzLmludGVncml0eSlcclxuICAgICAgICAgIGNoaWxkRmV0Y2hPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgY2hpbGRGZXRjaE9wdHMsIHsgaW50ZWdyaXR5OiB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGdldE9yQ3JlYXRlTG9hZChyLCBjaGlsZEZldGNoT3B0cykuZjtcclxuICAgICAgfSkpKS5maWx0ZXIobCA9PiBsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsb2FkO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc1NjcmlwdHNBbmRQcmVsb2FkcyAoKSB7XHJcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNoaW1Nb2RlID8gJ3NjcmlwdFt0eXBlPW1vZHVsZS1zaGltXScgOiAnc2NyaXB0W3R5cGU9bW9kdWxlXScpKVxyXG4gICAgICBwcm9jZXNzU2NyaXB0KHNjcmlwdCk7XHJcbiAgICBmb3IgKGNvbnN0IGxpbmsgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzaGltTW9kZSA/ICdsaW5rW3JlbD1tb2R1bGVwcmVsb2FkLXNoaW1dJyA6ICdsaW5rW3JlbD1tb2R1bGVwcmVsb2FkXScpKVxyXG4gICAgICBwcm9jZXNzUHJlbG9hZChsaW5rKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NJbXBvcnRNYXBzICgpIHtcclxuICAgIGZvciAoY29uc3Qgc2NyaXB0IG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2hpbU1vZGUgPyAnc2NyaXB0W3R5cGU9XCJpbXBvcnRtYXAtc2hpbVwiXScgOiAnc2NyaXB0W3R5cGU9XCJpbXBvcnRtYXBcIl0nKSlcclxuICAgICAgcHJvY2Vzc0ltcG9ydE1hcChzY3JpcHQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0RmV0Y2hPcHRzIChzY3JpcHQpIHtcclxuICAgIGNvbnN0IGZldGNoT3B0cyA9IHt9O1xyXG4gICAgaWYgKHNjcmlwdC5pbnRlZ3JpdHkpXHJcbiAgICAgIGZldGNoT3B0cy5pbnRlZ3JpdHkgPSBzY3JpcHQuaW50ZWdyaXR5O1xyXG4gICAgaWYgKHNjcmlwdC5yZWZlcnJlcnBvbGljeSlcclxuICAgICAgZmV0Y2hPcHRzLnJlZmVycmVyUG9saWN5ID0gc2NyaXB0LnJlZmVycmVycG9saWN5O1xyXG4gICAgaWYgKHNjcmlwdC5jcm9zc29yaWdpbiA9PT0gJ3VzZS1jcmVkZW50aWFscycpXHJcbiAgICAgIGZldGNoT3B0cy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcclxuICAgIGVsc2UgaWYgKHNjcmlwdC5jcm9zc29yaWdpbiA9PT0gJ2Fub255bW91cycpXHJcbiAgICAgIGZldGNoT3B0cy5jcmVkZW50aWFscyA9ICdvbWl0JztcclxuICAgIGVsc2VcclxuICAgICAgZmV0Y2hPcHRzLmNyZWRlbnRpYWxzID0gJ3NhbWUtb3JpZ2luJztcclxuICAgIHJldHVybiBmZXRjaE9wdHM7XHJcbiAgfVxyXG5cclxuICBsZXQgbGFzdFN0YXRpY0xvYWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG4gIGxldCBkb21Db250ZW50TG9hZGVkQ250ID0gMTtcclxuICBmdW5jdGlvbiBkb21Db250ZW50TG9hZGVkQ2hlY2sgKCkge1xyXG4gICAgaWYgKC0tZG9tQ29udGVudExvYWRlZENudCA9PT0gMCAmJiAhbm9Mb2FkRXZlbnRSZXRyaWdnZXJzKVxyXG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnRE9NQ29udGVudExvYWRlZCcpKTtcclxuICB9XHJcbiAgLy8gdGhpcyBzaG91bGQgYWx3YXlzIHRyaWdnZXIgYmVjYXVzZSB3ZSBhc3N1bWUgZXMtbW9kdWxlLXNoaW1zIGlzIGl0c2VsZiBhIGRvbWNvbnRlbnRsb2FkZWQgcmVxdWlyZW1lbnRcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgaW5pdFByb21pc2U7XHJcbiAgICBkb21Db250ZW50TG9hZGVkQ2hlY2soKTtcclxuICAgIGlmIChzaGltTW9kZSB8fCAhYmFzZWxpbmVQYXNzdGhyb3VnaCkge1xyXG4gICAgICBwcm9jZXNzSW1wb3J0TWFwcygpO1xyXG4gICAgICBwcm9jZXNzU2NyaXB0c0FuZFByZWxvYWRzKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGxldCByZWFkeVN0YXRlQ29tcGxldGVDbnQgPSAxO1xyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XHJcbiAgICByZWFkeVN0YXRlQ29tcGxldGVDaGVjaygpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHByb2Nlc3NJbXBvcnRNYXBzKCk7XHJcbiAgICAgIGF3YWl0IGluaXRQcm9taXNlO1xyXG4gICAgICByZWFkeVN0YXRlQ29tcGxldGVDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWR5U3RhdGVDb21wbGV0ZUNoZWNrICgpIHtcclxuICAgIGlmICgtLXJlYWR5U3RhdGVDb21wbGV0ZUNudCA9PT0gMCAmJiAhbm9Mb2FkRXZlbnRSZXRyaWdnZXJzKVxyXG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVhZHlzdGF0ZWNoYW5nZScpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NJbXBvcnRNYXAgKHNjcmlwdCkge1xyXG4gICAgaWYgKHNjcmlwdC5lcCkgLy8gZXAgbWFya2VyID0gc2NyaXB0IHByb2Nlc3NlZFxyXG4gICAgICByZXR1cm47XHJcbiAgICAvLyBlbXB0eSBpbmxpbmUgc2NyaXB0cyBzb21ldGltZXMgc2hvdyBiZWZvcmUgZG9tcmVhZHlcclxuICAgIGlmICghc2NyaXB0LnNyYyAmJiAhc2NyaXB0LmlubmVySFRNTClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgc2NyaXB0LmVwID0gdHJ1ZTtcclxuICAgIC8vIHdlIGRvbnQgY3VycmVudGx5IHN1cHBvcnQgbXVsdGlwbGUsIGV4dGVybmFsIG9yIGR5bmFtaWMgaW1wb3J0cyBtYXBzIGluIHBvbHlmaWxsIG1vZGUgdG8gbWF0Y2ggbmF0aXZlXHJcbiAgICBpZiAoc2NyaXB0LnNyYykge1xyXG4gICAgICBpZiAoIXNoaW1Nb2RlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgaW1wb3J0TWFwU3JjT3JMYXp5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChhY2NlcHRpbmdJbXBvcnRNYXBzKSB7XHJcbiAgICAgIGltcG9ydE1hcFByb21pc2UgPSBpbXBvcnRNYXBQcm9taXNlXHJcbiAgICAgICAgLnRoZW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgaW1wb3J0TWFwID0gcmVzb2x2ZUFuZENvbXBvc2VJbXBvcnRNYXAoc2NyaXB0LnNyYyA/IGF3YWl0IChhd2FpdCBmZXRjaEhvb2soc2NyaXB0LnNyYykpLmpzb24oKSA6IEpTT04ucGFyc2Uoc2NyaXB0LmlubmVySFRNTCksIHNjcmlwdC5zcmMgfHwgYmFzZVVybCwgaW1wb3J0TWFwKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBzZXRUaW1lb3V0KCgpID0+IHsgdGhyb3cgZXJyb3IgfSkpO1xyXG4gICAgICBpZiAoIXNoaW1Nb2RlKVxyXG4gICAgICAgIGFjY2VwdGluZ0ltcG9ydE1hcHMgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NTY3JpcHQgKHNjcmlwdCkge1xyXG4gICAgaWYgKHNjcmlwdC5lcCkgLy8gZXAgbWFya2VyID0gc2NyaXB0IHByb2Nlc3NlZFxyXG4gICAgICByZXR1cm47XHJcbiAgICBpZiAoc2NyaXB0LmdldEF0dHJpYnV0ZSgnbm9zaGltJykgIT09IG51bGwpXHJcbiAgICAgIHJldHVybjtcclxuICAgIC8vIGVtcHR5IGlubGluZSBzY3JpcHRzIHNvbWV0aW1lcyBzaG93IGJlZm9yZSBkb21yZWFkeVxyXG4gICAgaWYgKCFzY3JpcHQuc3JjICYmICFzY3JpcHQuaW5uZXJIVE1MKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBzY3JpcHQuZXAgPSB0cnVlO1xyXG4gICAgLy8gZG9lcyB0aGlzIGxvYWQgYmxvY2sgcmVhZHlzdGF0ZSBjb21wbGV0ZVxyXG4gICAgY29uc3QgaXNSZWFkeVNjcmlwdCA9IHJlYWR5U3RhdGVDb21wbGV0ZUNudCA+IDA7XHJcbiAgICAvLyBkb2VzIHRoaXMgbG9hZCBibG9jayBET01Db250ZW50TG9hZGVkXHJcbiAgICBjb25zdCBpc0RvbUNvbnRlbnRMb2FkZWRTY3JpcHQgPSBkb21Db250ZW50TG9hZGVkQ250ID4gMDtcclxuICAgIGlmIChpc1JlYWR5U2NyaXB0KSByZWFkeVN0YXRlQ29tcGxldGVDbnQrKztcclxuICAgIGlmIChpc0RvbUNvbnRlbnRMb2FkZWRTY3JpcHQpIGRvbUNvbnRlbnRMb2FkZWRDbnQrKztcclxuICAgIGNvbnN0IGJsb2NrcyA9IHNjcmlwdC5nZXRBdHRyaWJ1dGUoJ2FzeW5jJykgPT09IG51bGwgJiYgaXNSZWFkeVNjcmlwdDtcclxuICAgIGNvbnN0IGxvYWRQcm9taXNlID0gdG9wTGV2ZWxMb2FkKHNjcmlwdC5zcmMgfHwgYCR7YmFzZVVybH0/JHtpZCsrfWAsIGdldEZldGNoT3B0cyhzY3JpcHQpLCAhc2NyaXB0LnNyYyAmJiBzY3JpcHQuaW5uZXJIVE1MLCAhc2hpbU1vZGUsIGJsb2NrcyAmJiBsYXN0U3RhdGljTG9hZFByb21pc2UpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAvLyBTYWZhcmkgb25seSBnaXZlcyBlcnJvciB2aWEgY29uc29sZS5lcnJvclxyXG4gICAgICBpZiAoc2FmYXJpKVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgIC8vIEZpcmVmb3ggb25seSBnaXZlcyBlcnJvciBzdGFjayB2aWEgc2V0VGltZW91dFxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGV9KTtcclxuICAgICAgb25lcnJvcihlKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGJsb2NrcylcclxuICAgICAgbGFzdFN0YXRpY0xvYWRQcm9taXNlID0gbG9hZFByb21pc2UudGhlbihyZWFkeVN0YXRlQ29tcGxldGVDaGVjayk7XHJcbiAgICBpZiAoaXNEb21Db250ZW50TG9hZGVkU2NyaXB0KVxyXG4gICAgICBsb2FkUHJvbWlzZS50aGVuKGRvbUNvbnRlbnRMb2FkZWRDaGVjayk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBmZXRjaENhY2hlID0ge307XHJcbiAgZnVuY3Rpb24gcHJvY2Vzc1ByZWxvYWQgKGxpbmspIHtcclxuICAgIGlmIChsaW5rLmVwKSAvLyBlcCBtYXJrZXIgPSBwcm9jZXNzZWRcclxuICAgICAgcmV0dXJuO1xyXG4gICAgbGluay5lcCA9IHRydWU7XHJcbiAgICBpZiAoZmV0Y2hDYWNoZVtsaW5rLmhyZWZdKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBmZXRjaENhY2hlW2xpbmsuaHJlZl0gPSBkb0ZldGNoKGxpbmsuaHJlZiwgZ2V0RmV0Y2hPcHRzKGxpbmspKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRocm93VW5yZXNvbHZlZCAoaWQsIHBhcmVudFVybCkge1xyXG4gICAgdGhyb3cgRXJyb3IoXCJVbmFibGUgdG8gcmVzb2x2ZSBzcGVjaWZpZXIgJ1wiICsgaWQgKyAocGFyZW50VXJsID8gXCInIGZyb20gXCIgKyBwYXJlbnRVcmwgOiBcIidcIikpO1xyXG4gIH1cblxufSkoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxBQUFDLFlBQVk7QUFFWCxRQUFNLFVBQVUsVUFBVSxVQUFVLE1BQU07QUFDMUMsUUFBTSxPQUFPLFdBQVcsUUFBUSxPQUFPO0FBQ3ZDLFFBQU0sU0FBUyxXQUFXLFFBQVEsT0FBTztBQUV6QyxNQUFJO0FBRUosc0JBQXFCLFFBQVEsT0FBTyxtQkFBbUI7QUFDckQsV0FBTyxJQUFJLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFBQTtBQUdsRCxRQUFNLE9BQU8sTUFBTTtBQUFBO0FBRW5CLFFBQU0sU0FBUyxTQUFTLGNBQWM7QUFDdEMsTUFBSTtBQUNGLGNBQVUsT0FBTztBQUVuQixNQUFJLENBQUMsV0FBVyxPQUFPLGFBQWEsYUFBYTtBQUMvQyxjQUFVLFNBQVMsS0FBSyxNQUFNLEtBQUssR0FBRyxNQUFNLEtBQUs7QUFDakQsVUFBTSxlQUFlLFFBQVEsWUFBWTtBQUN6QyxRQUFJLGlCQUFpQjtBQUNuQixnQkFBVSxRQUFRLE1BQU0sR0FBRyxlQUFlO0FBQUE7QUFHOUMsaUJBQWdCLEtBQUs7QUFDbkIsUUFBSTtBQUNGLFVBQUksSUFBSTtBQUNSLGFBQU87QUFBQSxhQUVILEdBQU47QUFDRSxhQUFPO0FBQUE7QUFBQTtBQUlYLFFBQU0saUJBQWlCO0FBQ3ZCLGtDQUFpQyxRQUFRLFdBQVc7QUFFbEQsZ0JBQVksYUFBYSxVQUFVLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSztBQUM1RCxRQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLGVBQVMsT0FBTyxRQUFRLGdCQUFnQjtBQUUxQyxRQUFJLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxLQUFLO0FBQzFDLGFBQU8sVUFBVSxNQUFNLEdBQUcsVUFBVSxRQUFRLE9BQU8sS0FBSztBQUFBLGVBR2pELE9BQU8sT0FBTyxPQUFR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UUFBRSxLQUFHLEVBQUUsT0FBTyxLQUFLLEtBQUssS0FBSyxJQUFFO0FBQVEsVUFBTSxJQUFFLEVBQUUsR0FBRyxJQUFFO0FBQUcsUUFBSSxLQUFFLElBQUUsR0FBRyxJQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sUUFBTyxHQUFFLEtBQUksQ0FBQyxFQUFFO0FBQVEsWUFBTSxPQUFPLE9BQU8sSUFBSSxNQUFNLGVBQWUsS0FBSyxHQUFFLE1BQU0sR0FBRSxFQUFFLEtBQUssTUFBTSxNQUFNLFVBQVUsRUFBRSxNQUFJLEdBQUUsWUFBWSxNQUFLLEVBQUUsTUFBSSxPQUFNLEVBQUMsS0FBSSxFQUFFO0FBQU0sVUFBTSxJQUFFLElBQUcsSUFBRTtBQUFHLFdBQUssRUFBRSxRQUFNO0FBQUMsWUFBTSxLQUFFLEVBQUUsTUFBSyxLQUFFLEVBQUUsTUFBSyxLQUFFLEVBQUUsTUFBSyxLQUFFLEVBQUUsTUFBSyxLQUFFLEVBQUUsTUFBSyxLQUFFLEVBQUU7QUFBSyxVQUFJO0FBQUUsUUFBRSxRQUFPLE1BQUUsRUFBRSxHQUFFLE1BQU0sQUFBSyxPQUFMLEtBQU8sS0FBRSxJQUFFLElBQUUsQUFBSyxPQUFMLEtBQU8sS0FBRSxJQUFFLE9BQUssRUFBRSxLQUFLLEVBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFBO0FBQUssV0FBSyxFQUFFLFFBQU07QUFBQyxZQUFNLEtBQUUsR0FBRSxNQUFNLEVBQUUsTUFBSyxFQUFFLE9BQU0sS0FBRSxHQUFFO0FBQUcsUUFBRSxLQUFLLEFBQU0sT0FBTixPQUFTLEFBQU0sT0FBTixNQUFRLEVBQUUsTUFBRztBQUFBO0FBQUksZUFBVyxJQUFFO0FBQUMsVUFBRztBQUFDLGVBQVEsSUFBRSxNQUFNO0FBQUEsZUFBUyxJQUFOO0FBQUE7QUFBQTtBQUFXLFdBQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUU7QUFBQTtBQUFLLGFBQVcsSUFBRSxJQUFFO0FBQUMsVUFBTSxLQUFFLEdBQUU7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
