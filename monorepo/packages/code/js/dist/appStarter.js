(() => {
  // ../../node_modules/es-module-shims/dist/es-module-shims.js
  (function() {
    const noop = () => {
    };
    const optionsScript = document.querySelector("script[type=esms-options]");
    const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
    Object.assign(esmsInitOptions, self.esmsInitOptions || {});
    let shimMode = !!esmsInitOptions.shimMode;
    const importHook = globalHook(shimMode && esmsInitOptions.onimport);
    const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
    let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
    const metaHook = esmsInitOptions.meta ? globalHook(shimModule && esmsInitOptions.meta) : noop;
    const skip = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;
    let nonce = esmsInitOptions.nonce;
    const mapOverrides = esmsInitOptions.mapOverrides;
    if (!nonce) {
      const nonceElement = document.querySelector("script[nonce]");
      if (nonceElement)
        nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
    }
    const onerror = globalHook(esmsInitOptions.onerror || noop);
    const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => console.log("%c^^ Module TypeError above is polyfilled and can be ignored ^^", "font-weight:900;color:#391");
    const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
    function globalHook(name) {
      return typeof name === "string" ? self[name] : name;
    }
    const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
    const cssModulesEnabled = enable.includes("css-modules");
    const jsonModulesEnabled = enable.includes("json-modules");
    function setShimMode() {
      shimMode = true;
    }
    const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
    const baseUrl = document.baseURI;
    function createBlob(source, type = "text/javascript") {
      return URL.createObjectURL(new Blob([source], { type }));
    }
    const eoop = (err2) => setTimeout(() => {
      throw err2;
    });
    const throwError = (err2) => {
      (window.reportError || window.safari && console.error || eoop)(err2), void onerror(err2);
    };
    function fromParent(parent) {
      return parent ? ` imported from ${parent}` : "";
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
    function resolveUrl(relUrl, parentUrl2) {
      return resolveIfNotPlainOrUrl(relUrl, parentUrl2) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl2));
    }
    function resolveIfNotPlainOrUrl(relUrl, parentUrl2) {
      const queryHashIndex = parentUrl2.indexOf("?", parentUrl2.indexOf("#") === -1 ? parentUrl2.indexOf("#") : parentUrl2.length);
      if (queryHashIndex !== -1)
        parentUrl2 = parentUrl2.slice(0, queryHashIndex);
      if (relUrl.indexOf("\\") !== -1)
        relUrl = relUrl.replace(backslashRegEx, "/");
      if (relUrl[0] === "/" && relUrl[1] === "/") {
        return parentUrl2.slice(0, parentUrl2.indexOf(":") + 1) + relUrl;
      } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
        const parentProtocol = parentUrl2.slice(0, parentUrl2.indexOf(":") + 1);
        let pathname;
        if (parentUrl2[parentProtocol.length + 1] === "/") {
          if (parentProtocol !== "file:") {
            pathname = parentUrl2.slice(parentProtocol.length + 2);
            pathname = pathname.slice(pathname.indexOf("/") + 1);
          } else {
            pathname = parentUrl2.slice(8);
          }
        } else {
          pathname = parentUrl2.slice(parentProtocol.length + (parentUrl2[parentProtocol.length] === "/"));
        }
        if (relUrl[0] === "/")
          return parentUrl2.slice(0, parentUrl2.length - pathname.length - 1) + relUrl;
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
        return parentUrl2.slice(0, parentUrl2.length - pathname.length) + output.join("");
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
    function applyPackages(id2, packages) {
      const pkgName = getMatch(id2, packages);
      if (pkgName) {
        const pkg = packages[pkgName];
        if (pkg === null)
          return;
        return pkg + id2.slice(pkgName.length);
      }
    }
    function resolveImportMap(importMap2, resolvedOrPlain, parentUrl2) {
      let scopeUrl = parentUrl2 && getMatch(parentUrl2, importMap2.scopes);
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
    let err;
    window.addEventListener("error", (_err) => err = _err);
    function dynamicImportScript(url, { errUrl = url } = {}) {
      err = void 0;
      const src = createBlob(`import*as m from'${url}';self._esmsi=m`);
      const s2 = Object.assign(document.createElement("script"), { type: "module", src });
      s2.setAttribute("nonce", nonce);
      s2.setAttribute("noshim", "");
      const p2 = new Promise((resolve2, reject) => {
        s2.addEventListener("error", cb);
        s2.addEventListener("load", cb);
        function cb(_err) {
          document.head.removeChild(s2);
          if (self._esmsi) {
            resolve2(self._esmsi, baseUrl);
            self._esmsi = void 0;
          } else {
            reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading or executing the graph of ${errUrl} (check the console for ${src}).`));
            err = void 0;
          }
        }
      });
      document.head.appendChild(s2);
      return p2;
    }
    let dynamicImport = dynamicImportScript;
    const supportsDynamicImportCheck = dynamicImportScript(createBlob("export default u=>import(u)")).then((_dynamicImport) => {
      if (_dynamicImport)
        dynamicImport = _dynamicImport.default;
      return !!_dynamicImport;
    }, noop);
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
          iframe.srcdoc = `<script type=importmap nonce="${nonce}">{"imports":{"x":"data:text/javascript,"}}<${""}/script><script nonce="${nonce}">import('x').then(()=>1,()=>0).then(v=>parent._$s(v))<${""}/script>`;
          document.head.appendChild(iframe);
        })
      ]);
    });
    let e, a, r, s = 2 << 19;
    const i = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? function(e2, a2) {
      const r2 = e2.length;
      let s2 = 0;
      for (; s2 < r2; )
        a2[s2] = e2.charCodeAt(s2++);
    } : function(e2, a2) {
      const r2 = e2.length;
      let s2 = 0;
      for (; s2 < r2; ) {
        const r3 = e2.charCodeAt(s2);
        a2[s2++] = (255 & r3) << 8 | r3 >>> 8;
      }
    }, t = "xportmportlassetafromssertvoyiedeleinstantyreturdebuggeawaithrwhileforifcatcfinallels";
    let c$1, f, n;
    function parse(k2, l2 = "@") {
      c$1 = k2, f = l2;
      const u2 = 2 * c$1.length + (2 << 18);
      if (u2 > s || !e) {
        for (; u2 > s; )
          s *= 2;
        a = new ArrayBuffer(s), i(t, new Uint16Array(a, 16, 85)), e = function(e2, a2, r2) {
          ;
          var s2 = new e2.Int8Array(r2), i2 = new e2.Int16Array(r2), t2 = new e2.Int32Array(r2), c2 = new e2.Uint8Array(r2), f2 = new e2.Uint16Array(r2), n2 = 992;
          function b2(e3) {
            e3 = e3 | 0;
            var a3 = 0, r3 = 0, c3 = 0, b3 = 0, u4 = 0, w3 = 0, v2 = 0;
            v2 = n2;
            n2 = n2 + 11520 | 0;
            u4 = v2 + 2048 | 0;
            s2[763] = 1;
            i2[377] = 0;
            i2[378] = 0;
            i2[379] = 0;
            i2[380] = -1;
            t2[57] = t2[2];
            s2[764] = 0;
            t2[56] = 0;
            s2[762] = 0;
            t2[58] = v2 + 10496;
            t2[59] = v2 + 2304;
            t2[60] = v2;
            s2[765] = 0;
            e3 = (t2[3] | 0) + -2 | 0;
            t2[61] = e3;
            a3 = e3 + (t2[54] << 1) | 0;
            t2[62] = a3;
            e:
              while (1) {
                r3 = e3 + 2 | 0;
                t2[61] = r3;
                if (e3 >>> 0 >= a3 >>> 0) {
                  b3 = 18;
                  break;
                }
                a:
                  do {
                    switch (i2[r3 >> 1] | 0) {
                      case 9:
                      case 10:
                      case 11:
                      case 12:
                      case 13:
                      case 32:
                        break;
                      case 101: {
                        if ((((i2[379] | 0) == 0 ? D(r3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (k3(), (s2[763] | 0) == 0) : 0) {
                          b3 = 9;
                          break e;
                        } else
                          b3 = 17;
                        break;
                      }
                      case 105: {
                        if (D(r3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                          l3();
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
                        switch (i2[e3 + 4 >> 1] | 0) {
                          case 47: {
                            j();
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
                  t2[57] = t2[61];
                }
                e3 = t2[61] | 0;
                a3 = t2[62] | 0;
              }
            if ((b3 | 0) == 9) {
              e3 = t2[61] | 0;
              t2[57] = e3;
              b3 = 19;
            } else if ((b3 | 0) == 16) {
              s2[763] = 0;
              t2[61] = e3;
              b3 = 19;
            } else if ((b3 | 0) == 18)
              if (!(s2[762] | 0)) {
                e3 = r3;
                b3 = 19;
              } else
                e3 = 0;
            do {
              if ((b3 | 0) == 19) {
                e:
                  while (1) {
                    a3 = e3 + 2 | 0;
                    t2[61] = a3;
                    c3 = a3;
                    if (e3 >>> 0 >= (t2[62] | 0) >>> 0) {
                      b3 = 75;
                      break;
                    }
                    a:
                      do {
                        switch (i2[a3 >> 1] | 0) {
                          case 9:
                          case 10:
                          case 11:
                          case 12:
                          case 13:
                          case 32:
                            break;
                          case 101: {
                            if (((i2[379] | 0) == 0 ? D(a3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                              k3();
                              b3 = 74;
                            } else
                              b3 = 74;
                            break;
                          }
                          case 105: {
                            if (D(a3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                              l3();
                              b3 = 74;
                            } else
                              b3 = 74;
                            break;
                          }
                          case 99: {
                            if ((D(a3) | 0 ? (m(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? M(i2[e3 + 12 >> 1] | 0) | 0 : 0) {
                              s2[765] = 1;
                              b3 = 74;
                            } else
                              b3 = 74;
                            break;
                          }
                          case 40: {
                            r3 = t2[57] | 0;
                            c3 = t2[59] | 0;
                            b3 = i2[379] | 0;
                            i2[379] = b3 + 1 << 16 >> 16;
                            t2[c3 + ((b3 & 65535) << 2) >> 2] = r3;
                            b3 = 74;
                            break;
                          }
                          case 41: {
                            a3 = i2[379] | 0;
                            if (!(a3 << 16 >> 16)) {
                              b3 = 36;
                              break e;
                            }
                            a3 = a3 + -1 << 16 >> 16;
                            i2[379] = a3;
                            r3 = i2[378] | 0;
                            if (r3 << 16 >> 16 != 0 ? (w3 = t2[(t2[60] | 0) + ((r3 & 65535) + -1 << 2) >> 2] | 0, (t2[w3 + 20 >> 2] | 0) == (t2[(t2[59] | 0) + ((a3 & 65535) << 2) >> 2] | 0)) : 0) {
                              a3 = w3 + 4 | 0;
                              if (!(t2[a3 >> 2] | 0))
                                t2[a3 >> 2] = c3;
                              t2[w3 + 12 >> 2] = e3 + 4;
                              i2[378] = r3 + -1 << 16 >> 16;
                              b3 = 74;
                            } else
                              b3 = 74;
                            break;
                          }
                          case 123: {
                            b3 = t2[57] | 0;
                            c3 = t2[51] | 0;
                            e3 = b3;
                            do {
                              if ((i2[b3 >> 1] | 0) == 41 & (c3 | 0) != 0 ? (t2[c3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                                a3 = t2[52] | 0;
                                t2[51] = a3;
                                if (!a3) {
                                  t2[47] = 0;
                                  break;
                                } else {
                                  t2[a3 + 28 >> 2] = 0;
                                  break;
                                }
                              }
                            } while (0);
                            r3 = i2[379] | 0;
                            b3 = r3 & 65535;
                            s2[u4 + b3 >> 0] = s2[765] | 0;
                            s2[765] = 0;
                            c3 = t2[59] | 0;
                            i2[379] = r3 + 1 << 16 >> 16;
                            t2[c3 + (b3 << 2) >> 2] = e3;
                            b3 = 74;
                            break;
                          }
                          case 125: {
                            e3 = i2[379] | 0;
                            if (!(e3 << 16 >> 16)) {
                              b3 = 49;
                              break e;
                            }
                            r3 = e3 + -1 << 16 >> 16;
                            i2[379] = r3;
                            a3 = i2[380] | 0;
                            if (e3 << 16 >> 16 != a3 << 16 >> 16)
                              if (a3 << 16 >> 16 != -1 & (r3 & 65535) < (a3 & 65535)) {
                                b3 = 53;
                                break e;
                              } else {
                                b3 = 74;
                                break a;
                              }
                            else {
                              c3 = t2[58] | 0;
                              b3 = (i2[377] | 0) + -1 << 16 >> 16;
                              i2[377] = b3;
                              i2[380] = i2[c3 + ((b3 & 65535) << 1) >> 1] | 0;
                              h2();
                              b3 = 74;
                              break a;
                            }
                          }
                          case 39: {
                            d2(39);
                            b3 = 74;
                            break;
                          }
                          case 34: {
                            d2(34);
                            b3 = 74;
                            break;
                          }
                          case 47:
                            switch (i2[e3 + 4 >> 1] | 0) {
                              case 47: {
                                j();
                                break a;
                              }
                              case 42: {
                                y(1);
                                break a;
                              }
                              default: {
                                a3 = t2[57] | 0;
                                r3 = i2[a3 >> 1] | 0;
                                r:
                                  do {
                                    if (!(U(r3) | 0)) {
                                      switch (r3 << 16 >> 16) {
                                        case 41:
                                          if (q(t2[(t2[59] | 0) + (f2[379] << 2) >> 2] | 0) | 0) {
                                            b3 = 71;
                                            break r;
                                          } else {
                                            b3 = 68;
                                            break r;
                                          }
                                        case 125:
                                          break;
                                        default: {
                                          b3 = 68;
                                          break r;
                                        }
                                      }
                                      e3 = f2[379] | 0;
                                      if (!(p2(t2[(t2[59] | 0) + (e3 << 2) >> 2] | 0) | 0) ? (s2[u4 + e3 >> 0] | 0) == 0 : 0)
                                        b3 = 68;
                                      else
                                        b3 = 71;
                                    } else
                                      switch (r3 << 16 >> 16) {
                                        case 46:
                                          if (((i2[a3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                            b3 = 68;
                                            break r;
                                          } else {
                                            b3 = 71;
                                            break r;
                                          }
                                        case 43:
                                          if ((i2[a3 + -2 >> 1] | 0) == 43) {
                                            b3 = 68;
                                            break r;
                                          } else {
                                            b3 = 71;
                                            break r;
                                          }
                                        case 45:
                                          if ((i2[a3 + -2 >> 1] | 0) == 45) {
                                            b3 = 68;
                                            break r;
                                          } else {
                                            b3 = 71;
                                            break r;
                                          }
                                        default: {
                                          b3 = 71;
                                          break r;
                                        }
                                      }
                                  } while (0);
                                r:
                                  do {
                                    if ((b3 | 0) == 68) {
                                      b3 = 0;
                                      if (!(o2(a3) | 0)) {
                                        switch (r3 << 16 >> 16) {
                                          case 0: {
                                            b3 = 71;
                                            break r;
                                          }
                                          case 47:
                                            break;
                                          default: {
                                            e3 = 1;
                                            break r;
                                          }
                                        }
                                        if (!(s2[764] | 0))
                                          e3 = 1;
                                        else
                                          b3 = 71;
                                      } else
                                        b3 = 71;
                                    }
                                  } while (0);
                                if ((b3 | 0) == 71) {
                                  g();
                                  e3 = 0;
                                }
                                s2[764] = e3;
                                b3 = 74;
                                break a;
                              }
                            }
                          case 96: {
                            h2();
                            b3 = 74;
                            break;
                          }
                          default:
                            b3 = 74;
                        }
                      } while (0);
                    if ((b3 | 0) == 74) {
                      b3 = 0;
                      t2[57] = t2[61];
                    }
                    e3 = t2[61] | 0;
                  }
                if ((b3 | 0) == 36) {
                  L();
                  e3 = 0;
                  break;
                } else if ((b3 | 0) == 49) {
                  L();
                  e3 = 0;
                  break;
                } else if ((b3 | 0) == 53) {
                  L();
                  e3 = 0;
                  break;
                } else if ((b3 | 0) == 75) {
                  e3 = (i2[380] | 0) == -1 & (i2[379] | 0) == 0 & (s2[762] | 0) == 0 & (i2[378] | 0) == 0;
                  break;
                }
              }
            } while (0);
            n2 = v2;
            return e3 | 0;
          }
          function k3() {
            var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0, n3 = 0;
            f3 = t2[61] | 0;
            n3 = f3 + 12 | 0;
            t2[61] = n3;
            a3 = w2(1) | 0;
            e3 = t2[61] | 0;
            if (!((e3 | 0) == (n3 | 0) ? !(I(a3) | 0) : 0))
              c3 = 3;
            e:
              do {
                if ((c3 | 0) == 3) {
                  a:
                    do {
                      switch (a3 << 16 >> 16) {
                        case 100: {
                          B(e3, e3 + 14 | 0);
                          break e;
                        }
                        case 97: {
                          t2[61] = e3 + 10;
                          w2(1) | 0;
                          e3 = t2[61] | 0;
                          c3 = 6;
                          break;
                        }
                        case 102: {
                          c3 = 6;
                          break;
                        }
                        case 99: {
                          if ((m(e3 + 2 | 0, 36, 8) | 0) == 0 ? (r3 = e3 + 10 | 0, $(i2[r3 >> 1] | 0) | 0) : 0) {
                            t2[61] = r3;
                            f3 = w2(1) | 0;
                            n3 = t2[61] | 0;
                            E(f3) | 0;
                            B(n3, t2[61] | 0);
                            t2[61] = (t2[61] | 0) + -2;
                            break e;
                          }
                          e3 = e3 + 4 | 0;
                          t2[61] = e3;
                          c3 = 13;
                          break;
                        }
                        case 108:
                        case 118: {
                          c3 = 13;
                          break;
                        }
                        case 123: {
                          t2[61] = e3 + 2;
                          e3 = w2(1) | 0;
                          r3 = t2[61] | 0;
                          while (1) {
                            if (N(e3) | 0) {
                              d2(e3);
                              e3 = (t2[61] | 0) + 2 | 0;
                              t2[61] = e3;
                            } else {
                              E(e3) | 0;
                              e3 = t2[61] | 0;
                            }
                            w2(1) | 0;
                            e3 = C(r3, e3) | 0;
                            if (e3 << 16 >> 16 == 44) {
                              t2[61] = (t2[61] | 0) + 2;
                              e3 = w2(1) | 0;
                            }
                            a3 = r3;
                            r3 = t2[61] | 0;
                            if (e3 << 16 >> 16 == 125) {
                              c3 = 32;
                              break;
                            }
                            if ((r3 | 0) == (a3 | 0)) {
                              c3 = 29;
                              break;
                            }
                            if (r3 >>> 0 > (t2[62] | 0) >>> 0) {
                              c3 = 31;
                              break;
                            }
                          }
                          if ((c3 | 0) == 29) {
                            L();
                            break e;
                          } else if ((c3 | 0) == 31) {
                            L();
                            break e;
                          } else if ((c3 | 0) == 32) {
                            t2[61] = r3 + 2;
                            c3 = 34;
                            break a;
                          }
                          break;
                        }
                        case 42: {
                          t2[61] = e3 + 2;
                          w2(1) | 0;
                          c3 = t2[61] | 0;
                          C(c3, c3) | 0;
                          c3 = 34;
                          break;
                        }
                        default: {
                        }
                      }
                    } while (0);
                  if ((c3 | 0) == 6) {
                    t2[61] = e3 + 16;
                    e3 = w2(1) | 0;
                    if (e3 << 16 >> 16 == 42) {
                      t2[61] = (t2[61] | 0) + 2;
                      e3 = w2(1) | 0;
                    }
                    n3 = t2[61] | 0;
                    E(e3) | 0;
                    B(n3, t2[61] | 0);
                    t2[61] = (t2[61] | 0) + -2;
                    break;
                  } else if ((c3 | 0) == 13) {
                    e3 = e3 + 4 | 0;
                    t2[61] = e3;
                    s2[763] = 0;
                    a:
                      while (1) {
                        t2[61] = e3 + 2;
                        n3 = w2(1) | 0;
                        e3 = t2[61] | 0;
                        switch ((E(n3) | 0) << 16 >> 16) {
                          case 91:
                          case 123: {
                            c3 = 15;
                            break a;
                          }
                          default: {
                          }
                        }
                        a3 = t2[61] | 0;
                        if ((a3 | 0) == (e3 | 0))
                          break e;
                        B(e3, a3);
                        switch ((w2(1) | 0) << 16 >> 16) {
                          case 61: {
                            c3 = 19;
                            break a;
                          }
                          case 44:
                            break;
                          default: {
                            c3 = 20;
                            break a;
                          }
                        }
                        e3 = t2[61] | 0;
                      }
                    if ((c3 | 0) == 15) {
                      t2[61] = (t2[61] | 0) + -2;
                      break;
                    } else if ((c3 | 0) == 19) {
                      t2[61] = (t2[61] | 0) + -2;
                      break;
                    } else if ((c3 | 0) == 20) {
                      t2[61] = (t2[61] | 0) + -2;
                      break;
                    }
                  } else if ((c3 | 0) == 34)
                    a3 = w2(1) | 0;
                  e3 = t2[61] | 0;
                  if (a3 << 16 >> 16 == 102 ? (m(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                    t2[61] = e3 + 8;
                    u3(f3, w2(1) | 0);
                    break;
                  }
                  t2[61] = e3 + -2;
                }
              } while (0);
            return;
          }
          function l3() {
            var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0;
            f3 = t2[61] | 0;
            a3 = f3 + 12 | 0;
            t2[61] = a3;
            e:
              do {
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 40: {
                    e3 = t2[61] | 0;
                    a3 = t2[59] | 0;
                    r3 = i2[379] | 0;
                    i2[379] = r3 + 1 << 16 >> 16;
                    t2[a3 + ((r3 & 65535) << 2) >> 2] = e3;
                    if ((i2[t2[57] >> 1] | 0) != 46) {
                      e3 = t2[61] | 0;
                      t2[61] = e3 + 2;
                      r3 = w2(1) | 0;
                      v(f3, t2[61] | 0, 0, e3);
                      e3 = t2[51] | 0;
                      a3 = t2[60] | 0;
                      f3 = i2[378] | 0;
                      i2[378] = f3 + 1 << 16 >> 16;
                      t2[a3 + ((f3 & 65535) << 2) >> 2] = e3;
                      switch (r3 << 16 >> 16) {
                        case 39: {
                          d2(39);
                          break;
                        }
                        case 34: {
                          d2(34);
                          break;
                        }
                        default: {
                          t2[61] = (t2[61] | 0) + -2;
                          break e;
                        }
                      }
                      e3 = (t2[61] | 0) + 2 | 0;
                      t2[61] = e3;
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 44: {
                          t2[61] = (t2[61] | 0) + 2;
                          w2(1) | 0;
                          r3 = t2[51] | 0;
                          t2[r3 + 4 >> 2] = e3;
                          f3 = t2[61] | 0;
                          t2[r3 + 16 >> 2] = f3;
                          s2[r3 + 24 >> 0] = 1;
                          t2[61] = f3 + -2;
                          break e;
                        }
                        case 41: {
                          i2[379] = (i2[379] | 0) + -1 << 16 >> 16;
                          f3 = t2[51] | 0;
                          t2[f3 + 4 >> 2] = e3;
                          t2[f3 + 12 >> 2] = (t2[61] | 0) + 2;
                          s2[f3 + 24 >> 0] = 1;
                          i2[378] = (i2[378] | 0) + -1 << 16 >> 16;
                          break e;
                        }
                        default: {
                          t2[61] = (t2[61] | 0) + -2;
                          break e;
                        }
                      }
                    }
                    break;
                  }
                  case 46: {
                    t2[61] = (t2[61] | 0) + 2;
                    if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = t2[61] | 0, (m(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (i2[t2[57] >> 1] | 0) != 46 : 0)
                      v(f3, f3, e3 + 8 | 0, 2);
                    break;
                  }
                  case 42:
                  case 39:
                  case 34: {
                    c3 = 16;
                    break;
                  }
                  case 123: {
                    e3 = t2[61] | 0;
                    if (i2[379] | 0) {
                      t2[61] = e3 + -2;
                      break e;
                    }
                    while (1) {
                      if (e3 >>> 0 >= (t2[62] | 0) >>> 0)
                        break;
                      e3 = w2(1) | 0;
                      if (!(N(e3) | 0)) {
                        if (e3 << 16 >> 16 == 125) {
                          c3 = 31;
                          break;
                        }
                      } else
                        d2(e3);
                      e3 = (t2[61] | 0) + 2 | 0;
                      t2[61] = e3;
                    }
                    if ((c3 | 0) == 31)
                      t2[61] = (t2[61] | 0) + 2;
                    w2(1) | 0;
                    e3 = t2[61] | 0;
                    if (m(e3, 50, 8) | 0) {
                      L();
                      break e;
                    }
                    t2[61] = e3 + 8;
                    e3 = w2(1) | 0;
                    if (N(e3) | 0) {
                      u3(f3, e3);
                      break e;
                    } else {
                      L();
                      break e;
                    }
                  }
                  default:
                    if ((t2[61] | 0) != (a3 | 0))
                      c3 = 16;
                }
              } while (0);
            do {
              if ((c3 | 0) == 16) {
                if (i2[379] | 0) {
                  t2[61] = (t2[61] | 0) + -2;
                  break;
                }
                e3 = t2[62] | 0;
                a3 = t2[61] | 0;
                while (1) {
                  if (a3 >>> 0 >= e3 >>> 0) {
                    c3 = 23;
                    break;
                  }
                  r3 = i2[a3 >> 1] | 0;
                  if (N(r3) | 0) {
                    c3 = 21;
                    break;
                  }
                  c3 = a3 + 2 | 0;
                  t2[61] = c3;
                  a3 = c3;
                }
                if ((c3 | 0) == 21) {
                  u3(f3, r3);
                  break;
                } else if ((c3 | 0) == 23) {
                  L();
                  break;
                }
              }
            } while (0);
            return;
          }
          function u3(e3, a3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            var r3 = 0, s3 = 0;
            r3 = (t2[61] | 0) + 2 | 0;
            switch (a3 << 16 >> 16) {
              case 39: {
                d2(39);
                s3 = 5;
                break;
              }
              case 34: {
                d2(34);
                s3 = 5;
                break;
              }
              default:
                L();
            }
            do {
              if ((s3 | 0) == 5) {
                v(e3, r3, t2[61] | 0, 1);
                t2[61] = (t2[61] | 0) + 2;
                s3 = (w2(0) | 0) << 16 >> 16 == 97;
                a3 = t2[61] | 0;
                if (s3 ? (m(a3 + 2 | 0, 58, 10) | 0) == 0 : 0) {
                  t2[61] = a3 + 12;
                  if ((w2(1) | 0) << 16 >> 16 != 123) {
                    t2[61] = a3;
                    break;
                  }
                  e3 = t2[61] | 0;
                  r3 = e3;
                  e:
                    while (1) {
                      t2[61] = r3 + 2;
                      r3 = w2(1) | 0;
                      switch (r3 << 16 >> 16) {
                        case 39: {
                          d2(39);
                          t2[61] = (t2[61] | 0) + 2;
                          r3 = w2(1) | 0;
                          break;
                        }
                        case 34: {
                          d2(34);
                          t2[61] = (t2[61] | 0) + 2;
                          r3 = w2(1) | 0;
                          break;
                        }
                        default:
                          r3 = E(r3) | 0;
                      }
                      if (r3 << 16 >> 16 != 58) {
                        s3 = 16;
                        break;
                      }
                      t2[61] = (t2[61] | 0) + 2;
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
                          s3 = 20;
                          break e;
                        }
                      }
                      t2[61] = (t2[61] | 0) + 2;
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 125: {
                          s3 = 25;
                          break e;
                        }
                        case 44:
                          break;
                        default: {
                          s3 = 24;
                          break e;
                        }
                      }
                      t2[61] = (t2[61] | 0) + 2;
                      if ((w2(1) | 0) << 16 >> 16 == 125) {
                        s3 = 25;
                        break;
                      }
                      r3 = t2[61] | 0;
                    }
                  if ((s3 | 0) == 16) {
                    t2[61] = a3;
                    break;
                  } else if ((s3 | 0) == 20) {
                    t2[61] = a3;
                    break;
                  } else if ((s3 | 0) == 24) {
                    t2[61] = a3;
                    break;
                  } else if ((s3 | 0) == 25) {
                    s3 = t2[51] | 0;
                    t2[s3 + 16 >> 2] = e3;
                    t2[s3 + 12 >> 2] = (t2[61] | 0) + 2;
                    break;
                  }
                }
                t2[61] = a3 + -2;
              }
            } while (0);
            return;
          }
          function o2(e3) {
            e3 = e3 | 0;
            e:
              do {
                switch (i2[e3 >> 1] | 0) {
                  case 100:
                    switch (i2[e3 + -2 >> 1] | 0) {
                      case 105: {
                        e3 = S(e3 + -4 | 0, 68, 2) | 0;
                        break e;
                      }
                      case 108: {
                        e3 = S(e3 + -4 | 0, 72, 3) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  case 101: {
                    switch (i2[e3 + -2 >> 1] | 0) {
                      case 115:
                        break;
                      case 116: {
                        e3 = S(e3 + -4 | 0, 78, 4) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                    switch (i2[e3 + -4 >> 1] | 0) {
                      case 108: {
                        e3 = O(e3 + -6 | 0, 101) | 0;
                        break e;
                      }
                      case 97: {
                        e3 = O(e3 + -6 | 0, 99) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  }
                  case 102: {
                    if ((i2[e3 + -2 >> 1] | 0) == 111 ? (i2[e3 + -4 >> 1] | 0) == 101 : 0)
                      switch (i2[e3 + -6 >> 1] | 0) {
                        case 99: {
                          e3 = S(e3 + -8 | 0, 86, 6) | 0;
                          break e;
                        }
                        case 112: {
                          e3 = S(e3 + -8 | 0, 98, 2) | 0;
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
                  case 110: {
                    e3 = e3 + -2 | 0;
                    if (O(e3, 105) | 0)
                      e3 = 1;
                    else
                      e3 = S(e3, 102, 5) | 0;
                    break;
                  }
                  case 111: {
                    e3 = O(e3 + -2 | 0, 100) | 0;
                    break;
                  }
                  case 114: {
                    e3 = S(e3 + -2 | 0, 112, 7) | 0;
                    break;
                  }
                  case 116: {
                    e3 = S(e3 + -2 | 0, 126, 4) | 0;
                    break;
                  }
                  case 119:
                    switch (i2[e3 + -2 >> 1] | 0) {
                      case 101: {
                        e3 = O(e3 + -4 | 0, 110) | 0;
                        break e;
                      }
                      case 111: {
                        e3 = S(e3 + -4 | 0, 134, 3) | 0;
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
          function h2() {
            var e3 = 0, a3 = 0, r3 = 0;
            a3 = t2[62] | 0;
            r3 = t2[61] | 0;
            e:
              while (1) {
                e3 = r3 + 2 | 0;
                if (r3 >>> 0 >= a3 >>> 0) {
                  a3 = 8;
                  break;
                }
                switch (i2[e3 >> 1] | 0) {
                  case 96: {
                    a3 = 9;
                    break e;
                  }
                  case 36: {
                    if ((i2[r3 + 4 >> 1] | 0) == 123) {
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
              t2[61] = r3 + 4;
              e3 = i2[380] | 0;
              a3 = t2[58] | 0;
              r3 = i2[377] | 0;
              i2[377] = r3 + 1 << 16 >> 16;
              i2[a3 + ((r3 & 65535) << 1) >> 1] = e3;
              r3 = (i2[379] | 0) + 1 << 16 >> 16;
              i2[379] = r3;
              i2[380] = r3;
            } else if ((a3 | 0) == 8) {
              t2[61] = e3;
              L();
            } else if ((a3 | 0) == 9)
              t2[61] = e3;
            return;
          }
          function w2(e3) {
            e3 = e3 | 0;
            var a3 = 0, r3 = 0, s3 = 0;
            r3 = t2[61] | 0;
            e:
              do {
                a3 = i2[r3 >> 1] | 0;
                a:
                  do {
                    if (a3 << 16 >> 16 != 47)
                      if (e3)
                        if (M(a3) | 0)
                          break;
                        else
                          break e;
                      else if (z(a3) | 0)
                        break;
                      else
                        break e;
                    else
                      switch (i2[r3 + 2 >> 1] | 0) {
                        case 47: {
                          j();
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
                s3 = t2[61] | 0;
                r3 = s3 + 2 | 0;
                t2[61] = r3;
              } while (s3 >>> 0 < (t2[62] | 0) >>> 0);
            return a3 | 0;
          }
          function d2(e3) {
            e3 = e3 | 0;
            var a3 = 0, r3 = 0, s3 = 0, c3 = 0;
            c3 = t2[62] | 0;
            a3 = t2[61] | 0;
            while (1) {
              s3 = a3 + 2 | 0;
              if (a3 >>> 0 >= c3 >>> 0) {
                a3 = 9;
                break;
              }
              r3 = i2[s3 >> 1] | 0;
              if (r3 << 16 >> 16 == e3 << 16 >> 16) {
                a3 = 10;
                break;
              }
              if (r3 << 16 >> 16 == 92) {
                r3 = a3 + 4 | 0;
                if ((i2[r3 >> 1] | 0) == 13) {
                  a3 = a3 + 6 | 0;
                  a3 = (i2[a3 >> 1] | 0) == 10 ? a3 : r3;
                } else
                  a3 = r3;
              } else if (T(r3) | 0) {
                a3 = 9;
                break;
              } else
                a3 = s3;
            }
            if ((a3 | 0) == 9) {
              t2[61] = s3;
              L();
            } else if ((a3 | 0) == 10)
              t2[61] = s3;
            return;
          }
          function v(e3, a3, r3, i3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            r3 = r3 | 0;
            i3 = i3 | 0;
            var c3 = 0, f3 = 0;
            c3 = t2[55] | 0;
            t2[55] = c3 + 32;
            f3 = t2[51] | 0;
            t2[((f3 | 0) == 0 ? 188 : f3 + 28 | 0) >> 2] = c3;
            t2[52] = f3;
            t2[51] = c3;
            t2[c3 + 8 >> 2] = e3;
            if ((i3 | 0) == 2)
              e3 = r3;
            else
              e3 = (i3 | 0) == 1 ? r3 + 2 | 0 : 0;
            t2[c3 + 12 >> 2] = e3;
            t2[c3 >> 2] = a3;
            t2[c3 + 4 >> 2] = r3;
            t2[c3 + 16 >> 2] = 0;
            t2[c3 + 20 >> 2] = i3;
            s2[c3 + 24 >> 0] = (i3 | 0) == 1 & 1;
            t2[c3 + 28 >> 2] = 0;
            return;
          }
          function A() {
            var e3 = 0, a3 = 0, r3 = 0;
            r3 = t2[62] | 0;
            a3 = t2[61] | 0;
            e:
              while (1) {
                e3 = a3 + 2 | 0;
                if (a3 >>> 0 >= r3 >>> 0) {
                  a3 = 6;
                  break;
                }
                switch (i2[e3 >> 1] | 0) {
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
              t2[61] = e3;
              L();
              e3 = 0;
            } else if ((a3 | 0) == 7) {
              t2[61] = e3;
              e3 = 93;
            }
            return e3 | 0;
          }
          function C(e3, a3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            var r3 = 0, s3 = 0;
            r3 = t2[61] | 0;
            s3 = i2[r3 >> 1] | 0;
            if (s3 << 16 >> 16 == 97) {
              t2[61] = r3 + 4;
              r3 = w2(1) | 0;
              e3 = t2[61] | 0;
              if (N(r3) | 0) {
                d2(r3);
                a3 = (t2[61] | 0) + 2 | 0;
                t2[61] = a3;
              } else {
                E(r3) | 0;
                a3 = t2[61] | 0;
              }
              s3 = w2(1) | 0;
              r3 = t2[61] | 0;
            }
            if ((r3 | 0) != (e3 | 0))
              B(e3, a3);
            return s3 | 0;
          }
          function g() {
            var e3 = 0, a3 = 0, r3 = 0;
            e:
              while (1) {
                e3 = t2[61] | 0;
                a3 = e3 + 2 | 0;
                t2[61] = a3;
                if (e3 >>> 0 >= (t2[62] | 0) >>> 0) {
                  r3 = 7;
                  break;
                }
                switch (i2[a3 >> 1] | 0) {
                  case 13:
                  case 10: {
                    r3 = 7;
                    break e;
                  }
                  case 47:
                    break e;
                  case 91: {
                    A() | 0;
                    break;
                  }
                  case 92: {
                    t2[61] = e3 + 4;
                    break;
                  }
                  default: {
                  }
                }
              }
            if ((r3 | 0) == 7)
              L();
            return;
          }
          function p2(e3) {
            e3 = e3 | 0;
            switch (i2[e3 >> 1] | 0) {
              case 62: {
                e3 = (i2[e3 + -2 >> 1] | 0) == 61;
                break;
              }
              case 41:
              case 59: {
                e3 = 1;
                break;
              }
              case 104: {
                e3 = S(e3 + -2 | 0, 160, 4) | 0;
                break;
              }
              case 121: {
                e3 = S(e3 + -2 | 0, 168, 6) | 0;
                break;
              }
              case 101: {
                e3 = S(e3 + -2 | 0, 180, 3) | 0;
                break;
              }
              default:
                e3 = 0;
            }
            return e3 | 0;
          }
          function y(e3) {
            e3 = e3 | 0;
            var a3 = 0, r3 = 0, s3 = 0, c3 = 0, f3 = 0;
            c3 = (t2[61] | 0) + 2 | 0;
            t2[61] = c3;
            r3 = t2[62] | 0;
            while (1) {
              a3 = c3 + 2 | 0;
              if (c3 >>> 0 >= r3 >>> 0)
                break;
              s3 = i2[a3 >> 1] | 0;
              if (!e3 ? T(s3) | 0 : 0)
                break;
              if (s3 << 16 >> 16 == 42 ? (i2[c3 + 4 >> 1] | 0) == 47 : 0) {
                f3 = 8;
                break;
              }
              c3 = a3;
            }
            if ((f3 | 0) == 8) {
              t2[61] = a3;
              a3 = c3 + 4 | 0;
            }
            t2[61] = a3;
            return;
          }
          function m(e3, a3, r3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            r3 = r3 | 0;
            var i3 = 0, t3 = 0;
            e:
              do {
                if (!r3)
                  e3 = 0;
                else {
                  while (1) {
                    i3 = s2[e3 >> 0] | 0;
                    t3 = s2[a3 >> 0] | 0;
                    if (i3 << 24 >> 24 != t3 << 24 >> 24)
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
                  e3 = (i3 & 255) - (t3 & 255) | 0;
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
            var a3 = 0, r3 = 0, s3 = 0, c3 = 0;
            r3 = n2;
            n2 = n2 + 16 | 0;
            s3 = r3;
            t2[s3 >> 2] = 0;
            t2[54] = e3;
            a3 = t2[3] | 0;
            c3 = a3 + (e3 << 1) | 0;
            e3 = c3 + 2 | 0;
            i2[c3 >> 1] = 0;
            t2[s3 >> 2] = e3;
            t2[55] = e3;
            t2[47] = 0;
            t2[51] = 0;
            t2[49] = 0;
            t2[48] = 0;
            t2[53] = 0;
            t2[50] = 0;
            n2 = r3;
            return a3 | 0;
          }
          function S(e3, a3, r3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            r3 = r3 | 0;
            var s3 = 0, c3 = 0;
            s3 = e3 + (0 - r3 << 1) | 0;
            c3 = s3 + 2 | 0;
            e3 = t2[3] | 0;
            if (c3 >>> 0 >= e3 >>> 0 ? (m(c3, a3, r3 << 1) | 0) == 0 : 0)
              if ((c3 | 0) == (e3 | 0))
                e3 = 1;
              else
                e3 = $(i2[s3 >> 1] | 0) | 0;
            else
              e3 = 0;
            return e3 | 0;
          }
          function O(e3, a3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            var r3 = 0;
            r3 = t2[3] | 0;
            if (r3 >>> 0 <= e3 >>> 0 ? (i2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
              if ((r3 | 0) == (e3 | 0))
                r3 = 1;
              else
                r3 = $(i2[e3 + -2 >> 1] | 0) | 0;
            else
              r3 = 0;
            return r3 | 0;
          }
          function $(e3) {
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
          function j() {
            var e3 = 0, a3 = 0, r3 = 0;
            e3 = t2[62] | 0;
            r3 = t2[61] | 0;
            e:
              while (1) {
                a3 = r3 + 2 | 0;
                if (r3 >>> 0 >= e3 >>> 0)
                  break;
                switch (i2[a3 >> 1] | 0) {
                  case 13:
                  case 10:
                    break e;
                  default:
                    r3 = a3;
                }
              }
            t2[61] = a3;
            return;
          }
          function B(e3, a3) {
            e3 = e3 | 0;
            a3 = a3 | 0;
            var r3 = 0, s3 = 0;
            r3 = t2[55] | 0;
            t2[55] = r3 + 12;
            s3 = t2[53] | 0;
            t2[((s3 | 0) == 0 ? 192 : s3 + 8 | 0) >> 2] = r3;
            t2[53] = r3;
            t2[r3 >> 2] = e3;
            t2[r3 + 4 >> 2] = a3;
            t2[r3 + 8 >> 2] = 0;
            return;
          }
          function E(e3) {
            e3 = e3 | 0;
            while (1) {
              if (M(e3) | 0)
                break;
              if (I(e3) | 0)
                break;
              e3 = (t2[61] | 0) + 2 | 0;
              t2[61] = e3;
              e3 = i2[e3 >> 1] | 0;
              if (!(e3 << 16 >> 16)) {
                e3 = 0;
                break;
              }
            }
            return e3 | 0;
          }
          function P() {
            var e3 = 0;
            e3 = t2[(t2[49] | 0) + 20 >> 2] | 0;
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
                e3 = e3 - (t2[3] | 0) >> 1;
            }
            return e3 | 0;
          }
          function q(e3) {
            e3 = e3 | 0;
            if (!(S(e3, 140, 5) | 0) ? !(S(e3, 150, 3) | 0) : 0)
              e3 = S(e3, 156, 2) | 0;
            else
              e3 = 1;
            return e3 | 0;
          }
          function z(e3) {
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
          function D(e3) {
            e3 = e3 | 0;
            if ((t2[3] | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = $(i2[e3 + -2 >> 1] | 0) | 0;
            return e3 | 0;
          }
          function F() {
            var e3 = 0;
            e3 = t2[(t2[49] | 0) + 12 >> 2] | 0;
            if (!e3)
              e3 = -1;
            else
              e3 = e3 - (t2[3] | 0) >> 1;
            return e3 | 0;
          }
          function G() {
            var e3 = 0;
            e3 = t2[(t2[49] | 0) + 16 >> 2] | 0;
            if (!e3)
              e3 = -1;
            else
              e3 = e3 - (t2[3] | 0) >> 1;
            return e3 | 0;
          }
          function H() {
            var e3 = 0;
            e3 = t2[(t2[49] | 0) + 4 >> 2] | 0;
            if (!e3)
              e3 = -1;
            else
              e3 = e3 - (t2[3] | 0) >> 1;
            return e3 | 0;
          }
          function J() {
            var e3 = 0;
            e3 = t2[49] | 0;
            e3 = t2[((e3 | 0) == 0 ? 188 : e3 + 28 | 0) >> 2] | 0;
            t2[49] = e3;
            return (e3 | 0) != 0 | 0;
          }
          function K() {
            var e3 = 0;
            e3 = t2[50] | 0;
            e3 = t2[((e3 | 0) == 0 ? 192 : e3 + 8 | 0) >> 2] | 0;
            t2[50] = e3;
            return (e3 | 0) != 0 | 0;
          }
          function L() {
            s2[762] = 1;
            t2[56] = (t2[61] | 0) - (t2[3] | 0) >> 1;
            t2[61] = (t2[62] | 0) + 2;
            return;
          }
          function M(e3) {
            e3 = e3 | 0;
            return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
          }
          function N(e3) {
            e3 = e3 | 0;
            return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
          }
          function Q() {
            return (t2[(t2[49] | 0) + 8 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function R() {
            return (t2[(t2[50] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function T(e3) {
            e3 = e3 | 0;
            return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
          }
          function V() {
            return (t2[t2[49] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function W() {
            return (t2[t2[50] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function X() {
            return c2[(t2[49] | 0) + 24 >> 0] | 0 | 0;
          }
          function Y(e3) {
            e3 = e3 | 0;
            t2[3] = e3;
            return;
          }
          function Z() {
            return (s2[763] | 0) != 0 | 0;
          }
          function _() {
            return t2[56] | 0;
          }
          function ee(e3) {
            e3 = e3 | 0;
            n2 = e3 + 992 + 15 & -16;
            return 992;
          }
          return { su: ee, ai: G, e: _, ee: R, es: W, f: Z, id: P, ie: H, ip: X, is: V, p: b2, re: K, ri: J, sa: x, se: F, ses: Y, ss: Q };
        }(typeof self != "undefined" ? self : global, {}, a), r = e.su(s - (2 << 17));
      }
      const h = c$1.length + 1;
      e.ses(r), e.sa(h - 1), i(c$1, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
      const w = [], d = [];
      for (; e.ri(); ) {
        const a2 = e.is(), r2 = e.ie(), s2 = e.ai(), i2 = e.id(), t2 = e.ss(), f2 = e.se();
        let n2;
        e.ip() && (n2 = b(i2 === -1 ? a2 : a2 + 1, c$1.charCodeAt(i2 === -1 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r2, ss: t2, se: f2, d: i2, a: s2 });
      }
      for (; e.re(); ) {
        const a2 = e.es(), r2 = c$1.charCodeAt(a2);
        d.push(r2 === 34 || r2 === 39 ? b(a2 + 1, r2) : c$1.slice(e.es(), e.ee()));
      }
      return [w, d, !!e.f()];
    }
    function b(e2, a2) {
      n = e2;
      let r2 = "", s2 = n;
      for (; ; ) {
        n >= c$1.length && o();
        const e3 = c$1.charCodeAt(n);
        if (e3 === a2)
          break;
        e3 === 92 ? (r2 += c$1.slice(s2, n), r2 += k(), s2 = n) : (e3 === 8232 || e3 === 8233 || u(e3) && o(), ++n);
      }
      return r2 += c$1.slice(s2, n++), r2;
    }
    function k() {
      let e2 = c$1.charCodeAt(++n);
      switch (++n, e2) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(l(2));
        case 117:
          return function() {
            let e3;
            c$1.charCodeAt(n) === 123 ? (++n, e3 = l(c$1.indexOf("}", n) - n), ++n, e3 > 1114111 && o()) : e3 = l(4);
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
          c$1.charCodeAt(n) === 10 && ++n;
        case 10:
          return "";
        case 56:
        case 57:
          o();
        default:
          if (e2 >= 48 && e2 <= 55) {
            let a2 = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
            return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = c$1.charCodeAt(n), a2 === "0" && e2 !== 56 && e2 !== 57 || o(), String.fromCharCode(r2);
          }
          return u(e2) ? "" : String.fromCharCode(e2);
      }
    }
    function l(e2) {
      const a2 = n;
      let r2 = 0, s2 = 0;
      for (let a3 = 0; a3 < e2; ++a3, ++n) {
        let e3, i2 = c$1.charCodeAt(n);
        if (i2 !== 95) {
          if (i2 >= 97)
            e3 = i2 - 97 + 10;
          else if (i2 >= 65)
            e3 = i2 - 65 + 10;
          else {
            if (!(i2 >= 48 && i2 <= 57))
              break;
            e3 = i2 - 48;
          }
          if (e3 >= 16)
            break;
          s2 = i2, r2 = 16 * r2 + e3;
        } else
          s2 !== 95 && a3 !== 0 || o(), s2 = i2;
      }
      return s2 !== 95 && n - a2 === e2 || o(), r2;
    }
    function u(e2) {
      return e2 === 13 || e2 === 10;
    }
    function o() {
      throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), { idx: n });
    }
    async function _resolve(id2, parentUrl2) {
      const urlResolved = resolveIfNotPlainOrUrl(id2, parentUrl2);
      return {
        r: resolveImportMap(importMap, urlResolved || id2, parentUrl2) || throwUnresolved(id2, parentUrl2),
        b: !urlResolved && !isURL(id2)
      };
    }
    const resolve = resolveHook ? async (id2, parentUrl2) => {
      let result = resolveHook(id2, parentUrl2, defaultResolve);
      if (result && result.then)
        result = await result;
      return result ? { r: result, b: !resolveIfNotPlainOrUrl(id2, parentUrl2) && !isURL(id2) } : _resolve(id2, parentUrl2);
    } : _resolve;
    async function importShim2(id2, ...args2) {
      let parentUrl2 = args2[args2.length - 1];
      if (typeof parentUrl2 !== "string")
        parentUrl2 = baseUrl;
      await initPromise;
      if (importHook)
        await importHook(id2, typeof args2[1] !== "string" ? args2[1] : {}, parentUrl2);
      if (acceptingImportMaps || shimMode || !baselinePassthrough) {
        processImportMaps();
        if (!shimMode)
          acceptingImportMaps = false;
      }
      await importMapPromise;
      return topLevelLoad((await resolve(id2, parentUrl2)).r, { credentials: "same-origin" });
    }
    self.importShim = importShim2;
    function defaultResolve(id2, parentUrl2) {
      return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id2, parentUrl2) || id2, parentUrl2) || throwUnresolved(id2, parentUrl2);
    }
    function throwUnresolved(id2, parentUrl2) {
      throw Error(`Unable to resolve specifier '${id2}'${fromParent(parentUrl2)}`);
    }
    const resolveSync = (id2, parentUrl2 = baseUrl) => {
      parentUrl2 = `${parentUrl2}`;
      const result = resolveHook && resolveHook(id2, parentUrl2, defaultResolve);
      return result && !result.then ? result : defaultResolve(id2, parentUrl2);
    };
    function metaResolve(id2, parentUrl2 = this.url) {
      return resolveSync(id2, parentUrl2);
    }
    importShim2.resolve = resolveSync;
    importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
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
      baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
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
        return void 0;
      }
    });
    let importMapPromise = initPromise;
    let firstPolyfillLoad = true;
    let acceptingImportMaps = true;
    async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
      if (!shimMode)
        acceptingImportMaps = false;
      await importMapPromise;
      if (importHook)
        await importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
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
      const [imports2] = load.a;
      const source = load.S;
      let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
      if (!imports2.length) {
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
        for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports2) {
          if (dynamicImportIndex === -1) {
            let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
            if (cycleShell) {
              if (!(blobUrl = depLoad.s)) {
                blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map((name) => name === "default" ? `d$_=m.default` : `${name}=m.${name}`).join(",")}}${depLoad.a[1].map((name) => name === "default" ? `let d$_;export{d$_ as default}` : `export let ${name}`).join(";")}
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
          if (d >= 0 && !supportsDynamicImport || d === 2 && !supportsImportMeta)
            load.n = true;
          if (d !== -1 || !n2)
            return;
          const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
          if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
            load.n = true;
          if (skip && skip.test(r2))
            return { b: r2 };
          if (childFetchOpts.integrity)
            childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
          return getOrCreateLoad(r2, childFetchOpts, load.r).f;
        }))).filter((l2) => l2);
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
          importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
        }).catch(throwError);
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
      const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, blocks && lastStaticLoadPromise).catch(throwError);
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
      fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
    }
  })();

  // js/mockedMap.json
  var imports = {
    react: "https://spike.land/dist/react.mjs",
    "react-dom": "https://spike.land/dist/react.mjs",
    "framer-motion": "https://spike.land/dist/framer-motion.mjs",
    "@emotion/react": "https://spike.land/dist/emotion.mjs",
    "@emotion/cache": "https://spike.land/dist/emotion.mjs",
    tslib: "https://ga.jspm.io/npm:tslib@2.3.1/tslib.es6.js"
  };
  var mockedMap_default = {
    imports
  };

  // js/appStarter.ts
  self.esmsInitOptions = {
    shimMode: false,
    revokeBlobURLs: true,
    fetch,
    resolve: (id2, parentUrl2) => {
      return parentUrl2 + id2;
    },
    polyfillEnable: ["css-modules", "json-modules"],
    onerror: (error) => console.log(error),
    noLoadEventRetriggers: true,
    skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//
  };
  document.body.appendChild(Object.assign(document.createElement("script"), {
    type: "importmap-shim",
    innerHTML: JSON.stringify(mockedMap_default)
  }));
  var { importShim } = self;
  importShim("/dist/starter.mjs").then(({ run }) => run());
})();
