import {
  run
} from "./chunk-chunk-CK5SLG45.mjs";
import "./chunk-chunk-XDZEJ6YN.mjs";
import "./chunk-chunk-FHQ7KILY.mjs";
import "./chunk-chunk-L7BA6KDY.mjs";
import "./chunk-chunk-LXQDOYGD.mjs";
import "./chunk-chunk-HGVBTGH6.mjs";
import "./chunk-chunk-3DTRDS5R.mjs";
import "./chunk-chunk-CFF2OAWW.mjs";
import {
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/load.ts
init_define_process();

// ../../.yarn/global/cache/es-module-shims-npm-1.6.2-15ec69049d-9.zip/node_modules/es-module-shims/dist/es-module-shims.js
init_define_process();
(function() {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";
  const noop = () => {
  };
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log("%c^^ Module TypeError above is polyfilled and can be ignored ^^", "font-weight:900;color:#391");
  };
  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  const createBlob = (source, type = "text/javascript") => URL.createObjectURL(new Blob([source], { type }));
  let { skip } = esmsInitOptions;
  if (Array.isArray(skip)) {
    const l2 = skip.map((s2) => new URL(s2, baseUrl).href);
    skip = (s2) => l2.some((i2) => i2[i2.length - 1] === "/" && s2.startsWith(i2) || s2 === i2);
  } else if (typeof skip === "string") {
    const r2 = new RegExp(skip);
    skip = (s2) => r2.test(s2);
  }
  const eoop = (err) => setTimeout(() => {
    throw err;
  });
  const throwError = (err) => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  if (!shimMode) {
    if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
        if (!seenScript) {
          if (script.type === "module" && !script.ep)
            seenScript = true;
        } else if (script.type === "importmap" && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function isURL(url) {
    if (url.indexOf(":") === -1)
      return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf("#"), qIdx = parentUrl.indexOf("?");
    if (hIdx + qIdx > -2)
      parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
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
      for (let i2 = 0; i2 < segmented.length; i2++) {
        if (segmentIndex !== -1) {
          if (segmented[i2] === "/") {
            output.push(segmented.slice(segmentIndex, i2 + 1));
            segmentIndex = -1;
          }
          continue;
        } else if (segmented[i2] === ".") {
          if (segmented[i2 + 1] === "." && (segmented[i2 + 2] === "/" || i2 + 2 === segmented.length)) {
            output.pop();
            i2 += 2;
            continue;
          } else if (segmented[i2 + 1] === "/" || i2 + 1 === segmented.length) {
            i2 += 1;
            continue;
          }
        }
        while (segmented[i2] === "/")
          i2++;
        segmentIndex = i2;
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s2 in json.scopes) {
        const resolvedScope = resolveUrl(s2, baseUrl2);
        resolveAndComposePackages(json.scopes[s2], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
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
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id.slice(pkgName.length);
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
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p2 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
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
  let dynamicImport = !hasDocument && (0, eval)("u=>import(u)");
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise((resolve2) => {
    const s2 = Object.assign(document.createElement("script"), {
      src: createBlob("self._d=u=>import(u)"),
      ep: true
    });
    s2.setAttribute("nonce", nonce);
    s2.addEventListener("load", () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener("error", (_err) => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve3, reject) => {
          const s3 = Object.assign(document.createElement("script"), {
            type: "module",
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = void 0;
          s3.ep = true;
          if (nonce)
            s3.setAttribute("nonce", nonce);
          s3.addEventListener("error", cb);
          s3.addEventListener("load", cb);
          function cb(_err) {
            document.head.removeChild(s3);
            if (self._esmsi) {
              resolve3(self._esmsi, baseUrl);
              self._esmsi = void 0;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s3.src}).`));
              err = void 0;
            }
          }
          document.head.appendChild(s3);
        });
      }
      document.head.removeChild(s2);
      delete self._d;
      resolve2();
    });
    document.head.appendChild(s2);
  });
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports("importmap") : false;
  let supportsImportMeta = supportsImportMaps;
  const importMetaCheck = "import.meta";
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;
  const featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport || supportsImportMaps && !cssModulesEnabled && !jsonModulesEnabled)
      return;
    if (!hasDocument)
      return Promise.all([
        supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop),
        cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace("x", createBlob("", "text/css")))).then(() => supportsCssAssertions = true, noop),
        jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace("x", createBlob("{}", "text/json")))).then(() => supportsJsonAssertions = true, noop)
      ]);
    return new Promise((resolve2) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("nonce", nonce);
      function cb({ data: [a2, b2, c2, d] }) {
        supportsImportMaps = a2;
        supportsImportMeta = b2;
        supportsCssAssertions = c2;
        supportsJsonAssertions = d;
        resolve2();
        document.head.removeChild(iframe);
        window.removeEventListener("message", cb, false);
      }
      window.addEventListener("message", cb, false);
      const importMapTest = `<script nonce=${nonce || ""}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? "true,true" : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : "false"}, ${jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : "false"}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${""}/script>`;
      iframe.onload = () => {
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s2 = doc.createElement("script");
          if (nonce)
            s2.setAttribute("nonce", nonce);
          s2.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s2);
        }
      };
      document.head.appendChild(iframe);
      if ("srcdoc" in iframe)
        iframe.srcdoc = importMapTest;
      else
        iframe.contentDocument.write(importMapTest);
    });
  });
  let e, a, r, i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; )
      a2[i2] = e2.charCodeAt(i2++);
  } : function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; ) {
      const r3 = e2.charCodeAt(i2);
      a2[i2++] = (255 & r3) << 8 | r3 >>> 8;
    }
  }, f = "xportmportlassetafromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let t, c$1, n;
  function parse(l2, k2 = "@") {
    t = l2, c$1 = k2;
    const u2 = 2 * t.length + (2 << 18);
    if (u2 > i || !e) {
      for (; u2 > i; )
        i *= 2;
      a = new ArrayBuffer(i), s(f, new Uint16Array(a, 16, 106)), e = function(e2, a2, r2) {
        ;
        var i2 = new e2.Int8Array(r2), s2 = new e2.Int16Array(r2), f2 = new e2.Int32Array(r2), t2 = new e2.Uint8Array(r2), c2 = new e2.Uint16Array(r2), n2 = 1024;
        function b2() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, b3 = 0, o3 = 0, w3 = 0;
          w3 = n2;
          n2 = n2 + 10240 | 0;
          i2[795] = 1;
          s2[395] = 0;
          s2[396] = 0;
          f2[67] = f2[2];
          i2[796] = 0;
          f2[66] = 0;
          i2[794] = 0;
          f2[68] = w3 + 2048;
          f2[69] = w3;
          i2[797] = 0;
          e3 = (f2[3] | 0) + -2 | 0;
          f2[70] = e3;
          a3 = e3 + (f2[64] << 1) | 0;
          f2[71] = a3;
          e:
            while (1) {
              r3 = e3 + 2 | 0;
              f2[70] = r3;
              if (e3 >>> 0 >= a3 >>> 0) {
                b3 = 18;
                break;
              }
              a:
                do {
                  switch (s2[r3 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if ((((s2[396] | 0) == 0 ? F(r3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l3(), (i2[795] | 0) == 0) : 0) {
                        b3 = 9;
                        break e;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 105: {
                      if (F(r3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                        k3();
                        b3 = 17;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 59: {
                      b3 = 17;
                      break;
                    }
                    case 47:
                      switch (s2[e3 + 4 >> 1] | 0) {
                        case 47: {
                          E();
                          break a;
                        }
                        case 42: {
                          y(1);
                          break a;
                        }
                        default: {
                          b3 = 16;
                          break e;
                        }
                      }
                    default: {
                      b3 = 16;
                      break e;
                    }
                  }
                } while (0);
              if ((b3 | 0) == 17) {
                b3 = 0;
                f2[67] = f2[70];
              }
              e3 = f2[70] | 0;
              a3 = f2[71] | 0;
            }
          if ((b3 | 0) == 9) {
            e3 = f2[70] | 0;
            f2[67] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 16) {
            i2[795] = 0;
            f2[70] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 18)
            if (!(i2[794] | 0)) {
              e3 = r3;
              b3 = 19;
            } else
              e3 = 0;
          do {
            if ((b3 | 0) == 19) {
              e:
                while (1) {
                  a3 = e3 + 2 | 0;
                  f2[70] = a3;
                  t3 = a3;
                  if (e3 >>> 0 >= (f2[71] | 0) >>> 0) {
                    b3 = 82;
                    break;
                  }
                  a:
                    do {
                      switch (s2[a3 >> 1] | 0) {
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 32:
                          break;
                        case 101: {
                          if (((s2[396] | 0) == 0 ? F(a3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                            l3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 105: {
                          if (F(a3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                            k3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 99: {
                          if ((F(a3) | 0 ? (m(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? R(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                            i2[797] = 1;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 40: {
                          t3 = f2[68] | 0;
                          a3 = s2[396] | 0;
                          b3 = a3 & 65535;
                          f2[t3 + (b3 << 3) >> 2] = 1;
                          r3 = f2[67] | 0;
                          s2[396] = a3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) + 4 >> 2] = r3;
                          b3 = 81;
                          break;
                        }
                        case 41: {
                          a3 = s2[396] | 0;
                          if (!(a3 << 16 >> 16)) {
                            b3 = 36;
                            break e;
                          }
                          a3 = a3 + -1 << 16 >> 16;
                          s2[396] = a3;
                          r3 = s2[395] | 0;
                          if (r3 << 16 >> 16 != 0 ? (o3 = f2[(f2[69] | 0) + ((r3 & 65535) + -1 << 2) >> 2] | 0, (f2[o3 + 20 >> 2] | 0) == (f2[(f2[68] | 0) + ((a3 & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                            a3 = o3 + 4 | 0;
                            if (!(f2[a3 >> 2] | 0))
                              f2[a3 >> 2] = t3;
                            f2[o3 + 12 >> 2] = e3 + 4;
                            s2[395] = r3 + -1 << 16 >> 16;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 123: {
                          b3 = f2[67] | 0;
                          t3 = f2[61] | 0;
                          e3 = b3;
                          do {
                            if ((s2[b3 >> 1] | 0) == 41 & (t3 | 0) != 0 ? (f2[t3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                              a3 = f2[62] | 0;
                              f2[61] = a3;
                              if (!a3) {
                                f2[57] = 0;
                                break;
                              } else {
                                f2[a3 + 28 >> 2] = 0;
                                break;
                              }
                            }
                          } while (0);
                          t3 = f2[68] | 0;
                          r3 = s2[396] | 0;
                          b3 = r3 & 65535;
                          f2[t3 + (b3 << 3) >> 2] = (i2[797] | 0) == 0 ? 2 : 6;
                          s2[396] = r3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) + 4 >> 2] = e3;
                          i2[797] = 0;
                          b3 = 81;
                          break;
                        }
                        case 125: {
                          e3 = s2[396] | 0;
                          if (!(e3 << 16 >> 16)) {
                            b3 = 49;
                            break e;
                          }
                          t3 = f2[68] | 0;
                          b3 = e3 + -1 << 16 >> 16;
                          s2[396] = b3;
                          if ((f2[t3 + ((b3 & 65535) << 3) >> 2] | 0) == 4) {
                            h2();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 39: {
                          d2(39);
                          b3 = 81;
                          break;
                        }
                        case 34: {
                          d2(34);
                          b3 = 81;
                          break;
                        }
                        case 47:
                          switch (s2[e3 + 4 >> 1] | 0) {
                            case 47: {
                              E();
                              break a;
                            }
                            case 42: {
                              y(1);
                              break a;
                            }
                            default: {
                              e3 = f2[67] | 0;
                              t3 = s2[e3 >> 1] | 0;
                              r:
                                do {
                                  if (!(U(t3) | 0)) {
                                    switch (t3 << 16 >> 16) {
                                      case 41:
                                        if (z(f2[(f2[68] | 0) + (c2[396] << 3) + 4 >> 2] | 0) | 0) {
                                          b3 = 69;
                                          break r;
                                        } else {
                                          b3 = 66;
                                          break r;
                                        }
                                      case 125:
                                        break;
                                      default: {
                                        b3 = 66;
                                        break r;
                                      }
                                    }
                                    a3 = f2[68] | 0;
                                    r3 = c2[396] | 0;
                                    if (!(p2(f2[a3 + (r3 << 3) + 4 >> 2] | 0) | 0) ? (f2[a3 + (r3 << 3) >> 2] | 0) != 6 : 0)
                                      b3 = 66;
                                    else
                                      b3 = 69;
                                  } else
                                    switch (t3 << 16 >> 16) {
                                      case 46:
                                        if (((s2[e3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 43:
                                        if ((s2[e3 + -2 >> 1] | 0) == 43) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 45:
                                        if ((s2[e3 + -2 >> 1] | 0) == 45) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      default: {
                                        b3 = 69;
                                        break r;
                                      }
                                    }
                                } while (0);
                              r:
                                do {
                                  if ((b3 | 0) == 66) {
                                    b3 = 0;
                                    if (!(u3(e3) | 0)) {
                                      switch (t3 << 16 >> 16) {
                                        case 0: {
                                          b3 = 69;
                                          break r;
                                        }
                                        case 47: {
                                          if (i2[796] | 0) {
                                            b3 = 69;
                                            break r;
                                          }
                                          break;
                                        }
                                        default: {
                                        }
                                      }
                                      r3 = f2[3] | 0;
                                      a3 = t3;
                                      do {
                                        if (e3 >>> 0 <= r3 >>> 0)
                                          break;
                                        e3 = e3 + -2 | 0;
                                        f2[67] = e3;
                                        a3 = s2[e3 >> 1] | 0;
                                      } while (!(B(a3) | 0));
                                      if (D(a3) | 0) {
                                        do {
                                          if (e3 >>> 0 <= r3 >>> 0)
                                            break;
                                          e3 = e3 + -2 | 0;
                                          f2[67] = e3;
                                        } while (D(s2[e3 >> 1] | 0) | 0);
                                        if ($(e3) | 0) {
                                          g();
                                          i2[796] = 0;
                                          b3 = 81;
                                          break a;
                                        } else
                                          e3 = 1;
                                      } else
                                        e3 = 1;
                                    } else
                                      b3 = 69;
                                  }
                                } while (0);
                              if ((b3 | 0) == 69) {
                                g();
                                e3 = 0;
                              }
                              i2[796] = e3;
                              b3 = 81;
                              break a;
                            }
                          }
                        case 96: {
                          t3 = f2[68] | 0;
                          r3 = s2[396] | 0;
                          b3 = r3 & 65535;
                          f2[t3 + (b3 << 3) + 4 >> 2] = f2[67];
                          s2[396] = r3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) >> 2] = 3;
                          h2();
                          b3 = 81;
                          break;
                        }
                        default:
                          b3 = 81;
                      }
                    } while (0);
                  if ((b3 | 0) == 81) {
                    b3 = 0;
                    f2[67] = f2[70];
                  }
                  e3 = f2[70] | 0;
                }
              if ((b3 | 0) == 36) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 49) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 82) {
                e3 = (i2[794] | 0) == 0 ? (s2[395] | s2[396]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n2 = w3;
          return e3 | 0;
        }
        function l3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0, b3 = 0, l4 = 0, k4 = 0;
          c3 = f2[70] | 0;
          n3 = f2[63] | 0;
          k4 = c3 + 12 | 0;
          f2[70] = k4;
          r3 = w2(1) | 0;
          e3 = f2[70] | 0;
          if (!((e3 | 0) == (k4 | 0) ? !(I(r3) | 0) : 0))
            b3 = 3;
          e:
            do {
              if ((b3 | 0) == 3) {
                a:
                  do {
                    switch (r3 << 16 >> 16) {
                      case 123: {
                        f2[70] = e3 + 2;
                        e3 = w2(1) | 0;
                        r3 = f2[70] | 0;
                        while (1) {
                          if (T(e3) | 0) {
                            d2(e3);
                            e3 = (f2[70] | 0) + 2 | 0;
                            f2[70] = e3;
                          } else {
                            P(e3) | 0;
                            e3 = f2[70] | 0;
                          }
                          w2(1) | 0;
                          e3 = v(r3, e3) | 0;
                          if (e3 << 16 >> 16 == 44) {
                            f2[70] = (f2[70] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          a3 = r3;
                          r3 = f2[70] | 0;
                          if (e3 << 16 >> 16 == 125) {
                            b3 = 15;
                            break;
                          }
                          if ((r3 | 0) == (a3 | 0)) {
                            b3 = 12;
                            break;
                          }
                          if (r3 >>> 0 > (f2[71] | 0) >>> 0) {
                            b3 = 14;
                            break;
                          }
                        }
                        if ((b3 | 0) == 12) {
                          Q();
                          break e;
                        } else if ((b3 | 0) == 14) {
                          Q();
                          break e;
                        } else if ((b3 | 0) == 15) {
                          f2[70] = r3 + 2;
                          break a;
                        }
                        break;
                      }
                      case 42: {
                        f2[70] = e3 + 2;
                        w2(1) | 0;
                        k4 = f2[70] | 0;
                        v(k4, k4) | 0;
                        break;
                      }
                      default: {
                        i2[795] = 0;
                        switch (r3 << 16 >> 16) {
                          case 100: {
                            c3 = e3 + 14 | 0;
                            f2[70] = c3;
                            a3 = w2(1) | 0;
                            if (a3 << 16 >> 16 == 97) {
                              a3 = f2[70] | 0;
                              if ((F(a3) | 0 ? (m(a3 + 2 | 0, 58, 8) | 0) == 0 : 0) ? (t3 = a3 + 10 | 0, D(s2[t3 >> 1] | 0) | 0) : 0) {
                                f2[70] = t3;
                                a3 = w2(0) | 0;
                                b3 = 23;
                              } else
                                a3 = 97;
                            } else
                              b3 = 23;
                            r:
                              do {
                                if ((b3 | 0) == 23) {
                                  if (a3 << 16 >> 16 == 102) {
                                    a3 = f2[70] | 0;
                                    if (!(F(a3) | 0)) {
                                      a3 = 102;
                                      break;
                                    }
                                    if (m(a3 + 2 | 0, 66, 14) | 0) {
                                      a3 = 102;
                                      break;
                                    }
                                    r3 = a3 + 16 | 0;
                                    a3 = s2[r3 >> 1] | 0;
                                    if (!(R(a3) | 0))
                                      switch (a3 << 16 >> 16) {
                                        case 40:
                                        case 42:
                                          break;
                                        default: {
                                          a3 = 102;
                                          break r;
                                        }
                                      }
                                    f2[70] = r3;
                                    a3 = w2(1) | 0;
                                    if (a3 << 16 >> 16 == 42) {
                                      f2[70] = (f2[70] | 0) + 2;
                                      a3 = w2(1) | 0;
                                    }
                                    if (a3 << 16 >> 16 == 40) {
                                      O(e3, c3, 0, 0);
                                      f2[70] = c3;
                                      break e;
                                    }
                                  }
                                  if (a3 << 16 >> 16 == 99) {
                                    a3 = f2[70] | 0;
                                    if ((F(a3) | 0 ? (m(a3 + 2 | 0, 36, 8) | 0) == 0 : 0) ? (l4 = a3 + 10 | 0, k4 = s2[l4 >> 1] | 0, R(k4) | 0 | k4 << 16 >> 16 == 123) : 0) {
                                      f2[70] = l4;
                                      a3 = w2(1) | 0;
                                      if (a3 << 16 >> 16 == 123) {
                                        O(e3, c3, 0, 0);
                                        f2[70] = c3;
                                        break e;
                                      }
                                    } else
                                      a3 = 99;
                                  }
                                }
                              } while (0);
                            k4 = f2[70] | 0;
                            P(a3) | 0;
                            O(e3, c3, k4, f2[70] | 0);
                            f2[70] = c3;
                            break e;
                          }
                          case 97: {
                            f2[70] = e3 + 10;
                            w2(1) | 0;
                            e3 = f2[70] | 0;
                            b3 = 40;
                            break;
                          }
                          case 102: {
                            b3 = 40;
                            break;
                          }
                          case 99: {
                            if ((m(e3 + 2 | 0, 36, 8) | 0) == 0 ? (a3 = e3 + 10 | 0, B(s2[a3 >> 1] | 0) | 0) : 0) {
                              f2[70] = a3;
                              k4 = w2(1) | 0;
                              l4 = f2[70] | 0;
                              P(k4) | 0;
                              k4 = f2[70] | 0;
                              O(l4, k4, l4, k4);
                              f2[70] = (f2[70] | 0) + -2;
                              break e;
                            }
                            e3 = e3 + 4 | 0;
                            f2[70] = e3;
                            break;
                          }
                          case 108:
                          case 118:
                            break;
                          default:
                            break e;
                        }
                        if ((b3 | 0) == 40) {
                          f2[70] = e3 + 16;
                          e3 = w2(1) | 0;
                          if (e3 << 16 >> 16 == 42) {
                            f2[70] = (f2[70] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          l4 = f2[70] | 0;
                          P(e3) | 0;
                          k4 = f2[70] | 0;
                          O(l4, k4, l4, k4);
                          f2[70] = (f2[70] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        f2[70] = e3;
                        i2[795] = 0;
                        r:
                          while (1) {
                            f2[70] = e3 + 2;
                            k4 = w2(1) | 0;
                            e3 = f2[70] | 0;
                            switch ((P(k4) | 0) << 16 >> 16) {
                              case 91:
                              case 123:
                                break r;
                              default: {
                              }
                            }
                            a3 = f2[70] | 0;
                            if ((a3 | 0) == (e3 | 0))
                              break e;
                            O(e3, a3, e3, a3);
                            if ((w2(1) | 0) << 16 >> 16 != 44)
                              break;
                            e3 = f2[70] | 0;
                          }
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                  } while (0);
                k4 = (w2(1) | 0) << 16 >> 16 == 102;
                e3 = f2[70] | 0;
                if (k4 ? (m(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                  f2[70] = e3 + 8;
                  o2(c3, w2(1) | 0);
                  e3 = (n3 | 0) == 0 ? 232 : n3 + 16 | 0;
                  while (1) {
                    e3 = f2[e3 >> 2] | 0;
                    if (!e3)
                      break e;
                    f2[e3 + 12 >> 2] = 0;
                    f2[e3 + 8 >> 2] = 0;
                    e3 = e3 + 16 | 0;
                  }
                }
                f2[70] = e3 + -2;
              }
            } while (0);
          return;
        }
        function k3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0;
          c3 = f2[70] | 0;
          a3 = c3 + 12 | 0;
          f2[70] = a3;
          e:
            do {
              switch ((w2(1) | 0) << 16 >> 16) {
                case 40: {
                  a3 = f2[68] | 0;
                  n3 = s2[396] | 0;
                  r3 = n3 & 65535;
                  f2[a3 + (r3 << 3) >> 2] = 5;
                  e3 = f2[70] | 0;
                  s2[396] = n3 + 1 << 16 >> 16;
                  f2[a3 + (r3 << 3) + 4 >> 2] = e3;
                  if ((s2[f2[67] >> 1] | 0) != 46) {
                    f2[70] = e3 + 2;
                    n3 = w2(1) | 0;
                    A(c3, f2[70] | 0, 0, e3);
                    a3 = f2[61] | 0;
                    r3 = f2[69] | 0;
                    c3 = s2[395] | 0;
                    s2[395] = c3 + 1 << 16 >> 16;
                    f2[r3 + ((c3 & 65535) << 2) >> 2] = a3;
                    switch (n3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                    e3 = (f2[70] | 0) + 2 | 0;
                    f2[70] = e3;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 44: {
                        f2[70] = (f2[70] | 0) + 2;
                        w2(1) | 0;
                        c3 = f2[61] | 0;
                        f2[c3 + 4 >> 2] = e3;
                        n3 = f2[70] | 0;
                        f2[c3 + 16 >> 2] = n3;
                        i2[c3 + 24 >> 0] = 1;
                        f2[70] = n3 + -2;
                        break e;
                      }
                      case 41: {
                        s2[396] = (s2[396] | 0) + -1 << 16 >> 16;
                        n3 = f2[61] | 0;
                        f2[n3 + 4 >> 2] = e3;
                        f2[n3 + 12 >> 2] = (f2[70] | 0) + 2;
                        i2[n3 + 24 >> 0] = 1;
                        s2[395] = (s2[395] | 0) + -1 << 16 >> 16;
                        break e;
                      }
                      default: {
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                  }
                  break;
                }
                case 46: {
                  f2[70] = (f2[70] | 0) + 2;
                  if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = f2[70] | 0, (m(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (s2[f2[67] >> 1] | 0) != 46 : 0)
                    A(c3, c3, e3 + 8 | 0, 2);
                  break;
                }
                case 42:
                case 39:
                case 34: {
                  t3 = 17;
                  break;
                }
                case 123: {
                  e3 = f2[70] | 0;
                  if (s2[396] | 0) {
                    f2[70] = e3 + -2;
                    break e;
                  }
                  while (1) {
                    if (e3 >>> 0 >= (f2[71] | 0) >>> 0)
                      break;
                    e3 = w2(1) | 0;
                    if (!(T(e3) | 0)) {
                      if (e3 << 16 >> 16 == 125) {
                        t3 = 32;
                        break;
                      }
                    } else
                      d2(e3);
                    e3 = (f2[70] | 0) + 2 | 0;
                    f2[70] = e3;
                  }
                  if ((t3 | 0) == 32)
                    f2[70] = (f2[70] | 0) + 2;
                  w2(1) | 0;
                  e3 = f2[70] | 0;
                  if (m(e3, 50, 8) | 0) {
                    Q();
                    break e;
                  }
                  f2[70] = e3 + 8;
                  e3 = w2(1) | 0;
                  if (T(e3) | 0) {
                    o2(c3, e3);
                    break e;
                  } else {
                    Q();
                    break e;
                  }
                }
                default:
                  if ((f2[70] | 0) == (a3 | 0))
                    f2[70] = c3 + 10;
                  else
                    t3 = 17;
              }
            } while (0);
          do {
            if ((t3 | 0) == 17) {
              if (s2[396] | 0) {
                f2[70] = (f2[70] | 0) + -2;
                break;
              }
              e3 = f2[71] | 0;
              a3 = f2[70] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  t3 = 24;
                  break;
                }
                r3 = s2[a3 >> 1] | 0;
                if (T(r3) | 0) {
                  t3 = 22;
                  break;
                }
                n3 = a3 + 2 | 0;
                f2[70] = n3;
                a3 = n3;
              }
              if ((t3 | 0) == 22) {
                o2(c3, r3);
                break;
              } else if ((t3 | 0) == 24) {
                Q();
                break;
              }
            }
          } while (0);
          return;
        }
        function u3(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (s2[e3 >> 1] | 0) {
                case 100:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 105: {
                      e3 = S(e3 + -4 | 0, 90, 2) | 0;
                      break e;
                    }
                    case 108: {
                      e3 = S(e3 + -4 | 0, 94, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 101:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 115:
                      switch (s2[e3 + -4 >> 1] | 0) {
                        case 108: {
                          e3 = j(e3 + -6 | 0, 101) | 0;
                          break e;
                        }
                        case 97: {
                          e3 = j(e3 + -6 | 0, 99) | 0;
                          break e;
                        }
                        default: {
                          e3 = 0;
                          break e;
                        }
                      }
                    case 116: {
                      e3 = S(e3 + -4 | 0, 100, 4) | 0;
                      break e;
                    }
                    case 117: {
                      e3 = S(e3 + -4 | 0, 108, 6) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 102: {
                  if ((s2[e3 + -2 >> 1] | 0) == 111 ? (s2[e3 + -4 >> 1] | 0) == 101 : 0)
                    switch (s2[e3 + -6 >> 1] | 0) {
                      case 99: {
                        e3 = S(e3 + -8 | 0, 120, 6) | 0;
                        break e;
                      }
                      case 112: {
                        e3 = S(e3 + -8 | 0, 132, 2) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  else
                    e3 = 0;
                  break;
                }
                case 107: {
                  e3 = S(e3 + -2 | 0, 136, 4) | 0;
                  break;
                }
                case 110: {
                  e3 = e3 + -2 | 0;
                  if (j(e3, 105) | 0)
                    e3 = 1;
                  else
                    e3 = S(e3, 144, 5) | 0;
                  break;
                }
                case 111: {
                  e3 = j(e3 + -2 | 0, 100) | 0;
                  break;
                }
                case 114: {
                  e3 = S(e3 + -2 | 0, 154, 7) | 0;
                  break;
                }
                case 116: {
                  e3 = S(e3 + -2 | 0, 168, 4) | 0;
                  break;
                }
                case 119:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 101: {
                      e3 = j(e3 + -4 | 0, 110) | 0;
                      break e;
                    }
                    case 111: {
                      e3 = S(e3 + -4 | 0, 176, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                default:
                  e3 = 0;
              }
            } while (0);
          return e3 | 0;
        }
        function o2(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0;
          r3 = (f2[70] | 0) + 2 | 0;
          switch (a3 << 16 >> 16) {
            case 39: {
              d2(39);
              i3 = 5;
              break;
            }
            case 34: {
              d2(34);
              i3 = 5;
              break;
            }
            default:
              Q();
          }
          do {
            if ((i3 | 0) == 5) {
              A(e3, r3, f2[70] | 0, 1);
              f2[70] = (f2[70] | 0) + 2;
              i3 = (w2(0) | 0) << 16 >> 16 == 97;
              a3 = f2[70] | 0;
              if (i3 ? (m(a3 + 2 | 0, 80, 10) | 0) == 0 : 0) {
                f2[70] = a3 + 12;
                if ((w2(1) | 0) << 16 >> 16 != 123) {
                  f2[70] = a3;
                  break;
                }
                e3 = f2[70] | 0;
                r3 = e3;
                e:
                  while (1) {
                    f2[70] = r3 + 2;
                    r3 = w2(1) | 0;
                    switch (r3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        f2[70] = (f2[70] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      case 34: {
                        d2(34);
                        f2[70] = (f2[70] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      default:
                        r3 = P(r3) | 0;
                    }
                    if (r3 << 16 >> 16 != 58) {
                      i3 = 16;
                      break;
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        i3 = 20;
                        break e;
                      }
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 125: {
                        i3 = 25;
                        break e;
                      }
                      case 44:
                        break;
                      default: {
                        i3 = 24;
                        break e;
                      }
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    if ((w2(1) | 0) << 16 >> 16 == 125) {
                      i3 = 25;
                      break;
                    }
                    r3 = f2[70] | 0;
                  }
                if ((i3 | 0) == 16) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 20) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 24) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 25) {
                  i3 = f2[61] | 0;
                  f2[i3 + 16 >> 2] = e3;
                  f2[i3 + 12 >> 2] = (f2[70] | 0) + 2;
                  break;
                }
              }
              f2[70] = a3 + -2;
            }
          } while (0);
          return;
        }
        function h2() {
          var e3 = 0, a3 = 0, r3 = 0, i3 = 0;
          a3 = f2[71] | 0;
          r3 = f2[70] | 0;
          e:
            while (1) {
              e3 = r3 + 2 | 0;
              if (r3 >>> 0 >= a3 >>> 0) {
                a3 = 10;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 96: {
                  a3 = 7;
                  break e;
                }
                case 36: {
                  if ((s2[r3 + 4 >> 1] | 0) == 123) {
                    a3 = 6;
                    break e;
                  }
                  break;
                }
                case 92: {
                  e3 = r3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              r3 = e3;
            }
          if ((a3 | 0) == 6) {
            e3 = r3 + 4 | 0;
            f2[70] = e3;
            a3 = f2[68] | 0;
            i3 = s2[396] | 0;
            r3 = i3 & 65535;
            f2[a3 + (r3 << 3) >> 2] = 4;
            s2[396] = i3 + 1 << 16 >> 16;
            f2[a3 + (r3 << 3) + 4 >> 2] = e3;
          } else if ((a3 | 0) == 7) {
            f2[70] = e3;
            r3 = f2[68] | 0;
            i3 = (s2[396] | 0) + -1 << 16 >> 16;
            s2[396] = i3;
            if ((f2[r3 + ((i3 & 65535) << 3) >> 2] | 0) != 3)
              Q();
          } else if ((a3 | 0) == 10) {
            f2[70] = e3;
            Q();
          }
          return;
        }
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0;
          r3 = f2[70] | 0;
          e:
            do {
              a3 = s2[r3 >> 1] | 0;
              a:
                do {
                  if (a3 << 16 >> 16 != 47)
                    if (e3)
                      if (R(a3) | 0)
                        break;
                      else
                        break e;
                    else if (D(a3) | 0)
                      break;
                    else
                      break e;
                  else
                    switch (s2[r3 + 2 >> 1] | 0) {
                      case 47: {
                        E();
                        break a;
                      }
                      case 42: {
                        y(e3);
                        break a;
                      }
                      default: {
                        a3 = 47;
                        break e;
                      }
                    }
                } while (0);
              i3 = f2[70] | 0;
              r3 = i3 + 2 | 0;
              f2[70] = r3;
            } while (i3 >>> 0 < (f2[71] | 0) >>> 0);
          return a3 | 0;
        }
        function d2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          t3 = f2[71] | 0;
          a3 = f2[70] | 0;
          while (1) {
            i3 = a3 + 2 | 0;
            if (a3 >>> 0 >= t3 >>> 0) {
              a3 = 9;
              break;
            }
            r3 = s2[i3 >> 1] | 0;
            if (r3 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r3 << 16 >> 16 == 92) {
              r3 = a3 + 4 | 0;
              if ((s2[r3 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (s2[a3 >> 1] | 0) == 10 ? a3 : r3;
              } else
                a3 = r3;
            } else if (X(r3) | 0) {
              a3 = 9;
              break;
            } else
              a3 = i3;
          }
          if ((a3 | 0) == 9) {
            f2[70] = i3;
            Q();
          } else if ((a3 | 0) == 10)
            f2[70] = i3;
          return;
        }
        function v(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          r3 = f2[70] | 0;
          i3 = s2[r3 >> 1] | 0;
          c3 = (e3 | 0) == (a3 | 0);
          t3 = c3 ? 0 : e3;
          c3 = c3 ? 0 : a3;
          if (i3 << 16 >> 16 == 97) {
            f2[70] = r3 + 4;
            r3 = w2(1) | 0;
            e3 = f2[70] | 0;
            if (T(r3) | 0) {
              d2(r3);
              a3 = (f2[70] | 0) + 2 | 0;
              f2[70] = a3;
            } else {
              P(r3) | 0;
              a3 = f2[70] | 0;
            }
            i3 = w2(1) | 0;
            r3 = f2[70] | 0;
          }
          if ((r3 | 0) != (e3 | 0))
            O(e3, a3, t3, c3);
          return i3 | 0;
        }
        function A(e3, a3, r3, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          s3 = s3 | 0;
          var t3 = 0, c3 = 0;
          t3 = f2[65] | 0;
          f2[65] = t3 + 32;
          c3 = f2[61] | 0;
          f2[((c3 | 0) == 0 ? 228 : c3 + 28 | 0) >> 2] = t3;
          f2[62] = c3;
          f2[61] = t3;
          f2[t3 + 8 >> 2] = e3;
          if (2 == (s3 | 0))
            e3 = r3;
          else
            e3 = 1 == (s3 | 0) ? r3 + 2 | 0 : 0;
          f2[t3 + 12 >> 2] = e3;
          f2[t3 >> 2] = a3;
          f2[t3 + 4 >> 2] = r3;
          f2[t3 + 16 >> 2] = 0;
          f2[t3 + 20 >> 2] = s3;
          i2[t3 + 24 >> 0] = 1 == (s3 | 0) & 1;
          f2[t3 + 28 >> 2] = 0;
          return;
        }
        function C() {
          var e3 = 0, a3 = 0, r3 = 0;
          r3 = f2[71] | 0;
          a3 = f2[70] | 0;
          e:
            while (1) {
              e3 = a3 + 2 | 0;
              if (a3 >>> 0 >= r3 >>> 0) {
                a3 = 6;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 13:
                case 10: {
                  a3 = 6;
                  break e;
                }
                case 93: {
                  a3 = 7;
                  break e;
                }
                case 92: {
                  e3 = a3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              a3 = e3;
            }
          if ((a3 | 0) == 6) {
            f2[70] = e3;
            Q();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            f2[70] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        function g() {
          var e3 = 0, a3 = 0, r3 = 0;
          e:
            while (1) {
              e3 = f2[70] | 0;
              a3 = e3 + 2 | 0;
              f2[70] = a3;
              if (e3 >>> 0 >= (f2[71] | 0) >>> 0) {
                r3 = 7;
                break;
              }
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10: {
                  r3 = 7;
                  break e;
                }
                case 47:
                  break e;
                case 91: {
                  C() | 0;
                  break;
                }
                case 92: {
                  f2[70] = e3 + 4;
                  break;
                }
                default: {
                }
              }
            }
          if ((r3 | 0) == 7)
            Q();
          return;
        }
        function p2(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 62: {
              e3 = (s2[e3 + -2 >> 1] | 0) == 61;
              break;
            }
            case 41:
            case 59: {
              e3 = 1;
              break;
            }
            case 104: {
              e3 = S(e3 + -2 | 0, 202, 4) | 0;
              break;
            }
            case 121: {
              e3 = S(e3 + -2 | 0, 210, 6) | 0;
              break;
            }
            case 101: {
              e3 = S(e3 + -2 | 0, 222, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          t3 = (f2[70] | 0) + 2 | 0;
          f2[70] = t3;
          r3 = f2[71] | 0;
          while (1) {
            a3 = t3 + 2 | 0;
            if (t3 >>> 0 >= r3 >>> 0)
              break;
            i3 = s2[a3 >> 1] | 0;
            if (!e3 ? X(i3) | 0 : 0)
              break;
            if (i3 << 16 >> 16 == 42 ? (s2[t3 + 4 >> 1] | 0) == 47 : 0) {
              c3 = 8;
              break;
            }
            t3 = a3;
          }
          if ((c3 | 0) == 8) {
            f2[70] = a3;
            a3 = t3 + 4 | 0;
          }
          f2[70] = a3;
          return;
        }
        function m(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var s3 = 0, f3 = 0;
          e:
            do {
              if (!r3)
                e3 = 0;
              else {
                while (1) {
                  s3 = i2[e3 >> 0] | 0;
                  f3 = i2[a3 >> 0] | 0;
                  if (s3 << 24 >> 24 != f3 << 24 >> 24)
                    break;
                  r3 = r3 + -1 | 0;
                  if (!r3) {
                    e3 = 0;
                    break e;
                  } else {
                    e3 = e3 + 1 | 0;
                    a3 = a3 + 1 | 0;
                  }
                }
                e3 = (s3 & 255) - (f3 & 255) | 0;
              }
            } while (0);
          return e3 | 0;
        }
        function I(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33: {
                  e3 = 1;
                  break;
                }
                default:
                  if ((e3 & -8) << 16 >> 16 == 40 | (e3 + -58 & 65535) < 6)
                    e3 = 1;
                  else {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 93:
                      case 94: {
                        e3 = 1;
                        break e;
                      }
                      default: {
                      }
                    }
                    e3 = (e3 + -123 & 65535) < 4;
                  }
              }
            } while (0);
          return e3 | 0;
        }
        function U(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33:
                  break;
                default:
                  if (!((e3 + -58 & 65535) < 6 | (e3 + -40 & 65535) < 7 & e3 << 16 >> 16 != 41)) {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 94:
                        break e;
                      default: {
                      }
                    }
                    return e3 << 16 >> 16 != 125 & (e3 + -123 & 65535) < 4 | 0;
                  }
              }
            } while (0);
          return 1;
        }
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          r3 = n2;
          n2 = n2 + 16 | 0;
          i3 = r3;
          f2[i3 >> 2] = 0;
          f2[64] = e3;
          a3 = f2[3] | 0;
          t3 = a3 + (e3 << 1) | 0;
          e3 = t3 + 2 | 0;
          s2[t3 >> 1] = 0;
          f2[i3 >> 2] = e3;
          f2[65] = e3;
          f2[57] = 0;
          f2[61] = 0;
          f2[59] = 0;
          f2[58] = 0;
          f2[63] = 0;
          f2[60] = 0;
          n2 = r3;
          return a3 | 0;
        }
        function S(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, t3 = 0;
          i3 = e3 + (0 - r3 << 1) | 0;
          t3 = i3 + 2 | 0;
          e3 = f2[3] | 0;
          if (t3 >>> 0 >= e3 >>> 0 ? (m(t3, a3, r3 << 1) | 0) == 0 : 0)
            if ((t3 | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = B(s2[i3 >> 1] | 0) | 0;
          else
            e3 = 0;
          return e3 | 0;
        }
        function O(e3, a3, r3, i3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          i3 = i3 | 0;
          var s3 = 0, t3 = 0;
          s3 = f2[65] | 0;
          f2[65] = s3 + 20;
          t3 = f2[63] | 0;
          f2[((t3 | 0) == 0 ? 232 : t3 + 16 | 0) >> 2] = s3;
          f2[63] = s3;
          f2[s3 >> 2] = e3;
          f2[s3 + 4 >> 2] = a3;
          f2[s3 + 8 >> 2] = r3;
          f2[s3 + 12 >> 2] = i3;
          f2[s3 + 16 >> 2] = 0;
          return;
        }
        function $(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 107: {
              e3 = S(e3 + -2 | 0, 136, 4) | 0;
              break;
            }
            case 101: {
              if ((s2[e3 + -2 >> 1] | 0) == 117)
                e3 = S(e3 + -4 | 0, 108, 6) | 0;
              else
                e3 = 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function j(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0;
          r3 = f2[3] | 0;
          if (r3 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
            if ((r3 | 0) == (e3 | 0))
              r3 = 1;
            else
              r3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          else
            r3 = 0;
          return r3 | 0;
        }
        function B(e3) {
          e3 = e3 | 0;
          e:
            do {
              if ((e3 + -9 & 65535) < 5)
                e3 = 1;
              else {
                switch (e3 << 16 >> 16) {
                  case 32:
                  case 160: {
                    e3 = 1;
                    break e;
                  }
                  default: {
                  }
                }
                e3 = e3 << 16 >> 16 != 46 & (I(e3) | 0);
              }
            } while (0);
          return e3 | 0;
        }
        function E() {
          var e3 = 0, a3 = 0, r3 = 0;
          e3 = f2[71] | 0;
          r3 = f2[70] | 0;
          e:
            while (1) {
              a3 = r3 + 2 | 0;
              if (r3 >>> 0 >= e3 >>> 0)
                break;
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10:
                  break e;
                default:
                  r3 = a3;
              }
            }
          f2[70] = a3;
          return;
        }
        function P(e3) {
          e3 = e3 | 0;
          while (1) {
            if (R(e3) | 0)
              break;
            if (I(e3) | 0)
              break;
            e3 = (f2[70] | 0) + 2 | 0;
            f2[70] = e3;
            e3 = s2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        function q() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 20 >> 2] | 0;
          switch (e3 | 0) {
            case 1: {
              e3 = -1;
              break;
            }
            case 2: {
              e3 = -2;
              break;
            }
            default:
              e3 = e3 - (f2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        function z(e3) {
          e3 = e3 | 0;
          if (!(S(e3, 182, 5) | 0) ? !(S(e3, 192, 3) | 0) : 0)
            e3 = S(e3, 198, 2) | 0;
          else
            e3 = 1;
          return e3 | 0;
        }
        function D(e3) {
          e3 = e3 | 0;
          switch (e3 << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9: {
              e3 = 1;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function F(e3) {
          e3 = e3 | 0;
          if ((f2[3] | 0) == (e3 | 0))
            e3 = 1;
          else
            e3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          return e3 | 0;
        }
        function G() {
          var e3 = 0;
          e3 = f2[(f2[60] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function H() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function J() {
          var e3 = 0;
          e3 = f2[(f2[60] | 0) + 8 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function K() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 16 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function L() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 4 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function M() {
          var e3 = 0;
          e3 = f2[59] | 0;
          e3 = f2[((e3 | 0) == 0 ? 228 : e3 + 28 | 0) >> 2] | 0;
          f2[59] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function N() {
          var e3 = 0;
          e3 = f2[60] | 0;
          e3 = f2[((e3 | 0) == 0 ? 232 : e3 + 16 | 0) >> 2] | 0;
          f2[60] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function Q() {
          i2[794] = 1;
          f2[66] = (f2[70] | 0) - (f2[3] | 0) >> 1;
          f2[70] = (f2[71] | 0) + 2;
          return;
        }
        function R(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        function T(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        function V() {
          return (f2[(f2[59] | 0) + 8 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function W() {
          return (f2[(f2[60] | 0) + 4 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function X(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        function Y() {
          return (f2[f2[59] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function Z() {
          return (f2[f2[60] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function _() {
          return t2[(f2[59] | 0) + 24 >> 0] | 0 | 0;
        }
        function ee(e3) {
          e3 = e3 | 0;
          f2[3] = e3;
          return;
        }
        function ae() {
          return (i2[795] | 0) != 0 | 0;
        }
        function re() {
          return f2[66] | 0;
        }
        function ie(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        return { su: ie, ai: K, e: re, ee: W, ele: G, els: J, es: Z, f: ae, id: q, ie: L, ip: _, is: Y, p: b2, re: N, ri: M, sa: x, se: H, ses: ee, ss: V };
      }("undefined" != typeof self ? self : globalThis, {}, a), r = e.su(i - (2 << 17));
    }
    const h = t.length + 1;
    e.ses(r), e.sa(h - 1), s(t, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r2 = e.ie(), i2 = e.ai(), s2 = e.id(), f2 = e.ss(), c2 = e.se();
      let n2;
      e.ip() && (n2 = b(-1 === s2 ? a2 : a2 + 1, t.charCodeAt(-1 === s2 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r2, ss: f2, se: c2, d: s2, a: i2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r2 = e.ee(), i2 = e.els(), s2 = e.ele(), f2 = t.charCodeAt(a2), c2 = i2 >= 0 ? t.charCodeAt(i2) : -1;
      d.push({ s: a2, e: r2, ls: i2, le: s2, n: 34 === f2 || 39 === f2 ? b(a2 + 1, f2) : t.slice(a2, r2), ln: i2 < 0 ? void 0 : 34 === c2 || 39 === c2 ? b(i2 + 1, c2) : t.slice(i2, s2) });
    }
    return [w, d, !!e.f()];
  }
  function b(e2, a2) {
    n = e2;
    let r2 = "", i2 = n;
    for (; ; ) {
      n >= t.length && o();
      const e3 = t.charCodeAt(n);
      if (e3 === a2)
        break;
      92 === e3 ? (r2 += t.slice(i2, n), r2 += l(), i2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o(), ++n);
    }
    return r2 += t.slice(i2, n++), r2;
  }
  function l() {
    let e2 = t.charCodeAt(++n);
    switch (++n, e2) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(k(2));
      case 117:
        return function() {
          let e3;
          123 === t.charCodeAt(n) ? (++n, e3 = k(t.indexOf("}", n) - n), ++n, e3 > 1114111 && o()) : e3 = k(4);
          return e3 <= 65535 ? String.fromCharCode(e3) : (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10), 56320 + (1023 & e3)));
        }();
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === t.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = t.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
          return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = t.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o(), String.fromCharCode(r2);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  function k(e2) {
    const a2 = n;
    let r2 = 0, i2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, s2 = t.charCodeAt(n);
      if (95 !== s2) {
        if (s2 >= 97)
          e3 = s2 - 97 + 10;
        else if (s2 >= 65)
          e3 = s2 - 65 + 10;
        else {
          if (!(s2 >= 48 && s2 <= 57))
            break;
          e3 = s2 - 48;
        }
        if (e3 >= 16)
          break;
        i2 = s2, r2 = 16 * r2 + e3;
      } else
        95 !== i2 && 0 !== a3 || o(), i2 = s2;
    }
    return 95 !== i2 && n - a2 === e2 || o(), r2;
  }
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${c$1}:${t.slice(0, n).split("\n").length}:${n - t.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      b: !urlResolved && !isURL(id)
    };
  }
  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    if (result && result.then)
      result = await result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id) } : _resolve(id, parentUrl);
  } : _resolve;
  async function importShim2(id, ...args) {
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== "string")
      parentUrl = baseUrl;
    await initPromise;
    if (importHook)
      await importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument)
        processScriptsAndPreloads(true);
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, { credentials: "same-origin" });
  }
  self.importShim = importShim2;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim2.resolve = resolveSync;
  importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim2.addImportMap = (importMapIn) => {
    if (!shimMode)
      throw new Error("Unsupported in polyfill mode.");
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim2._r = {};
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
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || ((type) => type === "classic" || type === "module");
        HTMLScriptElement.supports = (type) => type === "importmap" || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type !== "childList")
              continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === "SCRIPT") {
                if (node.type === (shimMode ? "module-shim" : "module"))
                  processScript(node, true);
                if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                  processImportMap(node, true);
              } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload")) {
                processPreload(node);
              }
            }
          }
        }).observe(document, { childList: true, subtree: true });
        processScriptsAndPreloads();
        if (document.readyState === "complete") {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();
            if (document.readyState === "complete") {
              readyStateCompleteCheck();
              document.removeEventListener("readystatechange", readyListener);
            }
          }
          document.addEventListener("readystatechange", readyListener);
        }
      }
    }
    return void 0;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
    if (!shimMode)
      acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook)
      await importHook(url, typeof fetchOpts !== "string" ? fetchOpts : {}, "");
    if (!shimMode && baselinePassthrough) {
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise2;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
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
    const [imports, exports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    if (!imports.length) {
      resolvedSource += source;
    } else {
      let pushStringTo = function(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      };
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => {
                const q = depLoad.S[s2] === '"' || depLoad.S[s2] === "'";
                return `e$_${i2}=m${q ? `[` : "."}${depLoad.S.slice(s2, e2)}${q ? `]` : ""}`;
              }).join(",")}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i2) => `e$_${i2}`).join(",")};` : ""}export {${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => `e$_${i2} as ${depLoad.S.slice(s2, e2)}`).join(",")}}
//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = void 0;
          }
          lastIndex = statementEnd;
        } else if (dynamicImportIndex === -2) {
          load.m = { url: load.r, resolve: metaResolve };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        } else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }
      if (load.s)
        resolvedSource += `
;import{u$_}from'${load.s}';try{u$_({${exports.filter((e2) => e2.ln).map(({ s: s2, e: e2, ln }) => `${source.slice(s2, e2)}: ${ln}`).join(",")}})}catch(_){};
`;
      pushStringTo(source.length);
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
      return new Promise((r2) => p.push(r2));
  }
  function popFetchPool() {
    c--;
    if (p.length)
      p.shift()();
  }
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e2) {
      e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
      throw e2;
    } finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }
  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: "json" };
    else if (cssContentType.test(contentType)) {
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    } else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source)
      return load;
    load = {
      u: url,
      r: source ? url : void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null,
      m: null
    };
    if (registry[url]) {
      let i2 = 0;
      while (registry[load.u + ++i2])
        ;
      load.u += i2;
    }
    registry[load.u] = load;
    load.f = (async () => {
      if (!source) {
        let t2;
        ({ r: load.r, s: source, t: t2 } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t2 && !shimMode) {
          if (t2 === "css" && !cssModulesEnabled || t2 === "json" && !jsonModulesEnabled)
            throw Error(`${t2}-modules require <script type="esms-options">{ "polyfillEnable": ["${t2}-modules"] }<${""}/script>`);
          if (t2 === "css" && !supportsCssAssertions || t2 === "json" && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e2) {
        throwError(e2);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n: n2, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta)
          load.n = true;
        if (d !== -1 || !n2)
          return;
        const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (d !== -1)
          return;
        if (skip && skip(r2))
          return { b: r2 };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r2, childFetchOpts, load.r).f;
      }))).filter((l2) => l2);
    });
    return load;
  }
  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly)
      for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
        processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? "script[type=importmap-shim]" : "script[type=importmap]"))
      processImportMap(script);
    if (!mapsOnly)
      for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
        processScript(script);
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
  if (hasDocument) {
    document.addEventListener("DOMContentLoaded", async () => {
      await initPromise;
      if (shimMode || !baselinePassthrough)
        domContentLoadedCheck();
    });
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("readystatechange"));
  }
  const hasNext = (script) => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute("noshim") !== null || !(script.ep = true);
  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch((e2) => {
        console.log(e2);
        if (e2 instanceof SyntaxError)
          e2 = new Error(`Unable to parse import map ${e2.message} in: ${script.src || script.innerHTML}`);
        throwError(e2);
      });
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    const isBlockingReadyScript = script.getAttribute("async") === null && readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript)
      readyStateCompleteCnt++;
    if (isDomContentLoadedScript)
      domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript)
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
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();

// js/load.ts
importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]")?.innerHTML)
);
var codeSpace = location.pathname.slice(1).split("/")[1];
import(`${location.origin}/live/${codeSpace}/mST.mjs`).then(
  ({
    mST,
    codeSpace: codeSpace2,
    address
  }) => run({
    mST,
    codeSpace: codeSpace2,
    address
  })
);
