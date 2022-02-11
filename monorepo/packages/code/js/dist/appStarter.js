(() => {
  // ../../node_modules/es-module-shims/dist/es-module-shims.js
  (function() {
    const edge = !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
    const safari = !!window.safari;
    const baseUrl = document.baseURI;
    function createBlob(source, type = "text/javascript") {
      return URL.createObjectURL(new Blob([source], { type }));
    }
    const noop = () => {
    };
    function isURL(url) {
      try {
        new URL(url);
        return true;
      } catch (_) {
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
    function resolveUrl(relUrl, parentUrl) {
      return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(":") !== -1 ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
    }
    function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
      for (let p2 in packages) {
        const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
        if (outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
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
    const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => console.info(`OK: ^ TypeError module failure has been polyfilled`);
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
          document.head.appendChild(iframe);
          iframe.src = createBlob(`<script type=importmap nonce="${nonce}">{"imports":{"x":"data:text/javascript,"}}<${""}/script><script nonce="${nonce}">import('x').then(()=>1,()=>0).then(v=>parent._$s(v))<${""}/script>`, "text/html");
        })
      ]);
    });
    let e, r, a, i = 4194304;
    const s = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    let t, f, c$1;
    function parse(k2, l2 = "@") {
      if (t = k2, f = l2, t.length > i || !e) {
        for (; t.length > i; )
          i *= 2;
        r = new ArrayBuffer(4 * i), e = function(e2, r2, a2) {
          ;
          var i2 = new e2.Int8Array(a2), s2 = new e2.Int16Array(a2), t2 = new e2.Int32Array(a2), f2 = new e2.Uint8Array(a2), c2 = new e2.Uint16Array(a2), n2 = 816;
          function b2(e3) {
            e3 = e3 | 0;
            var r3 = 0, a3 = 0, f3 = 0, b3 = 0, l4 = 0;
            l4 = n2;
            n2 = n2 + 14336 | 0;
            b3 = l4;
            i2[589] = 1;
            s2[291] = 0;
            s2[292] = 0;
            s2[293] = -1;
            t2[15] = t2[2];
            i2[590] = 0;
            t2[14] = 0;
            i2[588] = 0;
            t2[16] = l4 + 10240;
            t2[17] = l4 + 2048;
            i2[591] = 0;
            e3 = (t2[3] | 0) + -2 | 0;
            t2[18] = e3;
            r3 = e3 + (t2[12] << 1) | 0;
            t2[19] = r3;
            e:
              while (1) {
                a3 = e3 + 2 | 0;
                t2[18] = a3;
                if (e3 >>> 0 >= r3 >>> 0) {
                  f3 = 18;
                  break;
                }
                r:
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
                        if ((((s2[292] | 0) == 0 ? R(a3) | 0 : 0) ? B(e3 + 4 | 0, 120, 112, 111, 114, 116) | 0 : 0) ? (u2(), (i2[589] | 0) == 0) : 0) {
                          f3 = 9;
                          break e;
                        } else
                          f3 = 17;
                        break;
                      }
                      case 105: {
                        if (R(a3) | 0 ? B(e3 + 4 | 0, 109, 112, 111, 114, 116) | 0 : 0) {
                          k3();
                          f3 = 17;
                        } else
                          f3 = 17;
                        break;
                      }
                      case 59: {
                        f3 = 17;
                        break;
                      }
                      case 47:
                        switch (s2[e3 + 4 >> 1] | 0) {
                          case 47: {
                            G();
                            break r;
                          }
                          case 42: {
                            p2(1);
                            break r;
                          }
                          default: {
                            f3 = 16;
                            break e;
                          }
                        }
                      default: {
                        f3 = 16;
                        break e;
                      }
                    }
                  } while (0);
                if ((f3 | 0) == 17) {
                  f3 = 0;
                  t2[15] = t2[18];
                }
                e3 = t2[18] | 0;
                r3 = t2[19] | 0;
              }
            if ((f3 | 0) == 9) {
              e3 = t2[18] | 0;
              t2[15] = e3;
              f3 = 19;
            } else if ((f3 | 0) == 16) {
              i2[589] = 0;
              t2[18] = e3;
              f3 = 19;
            } else if ((f3 | 0) == 18)
              if (!(i2[588] | 0)) {
                e3 = a3;
                f3 = 19;
              } else
                e3 = 0;
            do {
              if ((f3 | 0) == 19) {
                e:
                  while (1) {
                    r3 = e3 + 2 | 0;
                    t2[18] = r3;
                    a3 = r3;
                    if (e3 >>> 0 >= (t2[19] | 0) >>> 0) {
                      f3 = 75;
                      break;
                    }
                    r:
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
                            if (((s2[292] | 0) == 0 ? R(r3) | 0 : 0) ? B(e3 + 4 | 0, 120, 112, 111, 114, 116) | 0 : 0) {
                              u2();
                              f3 = 74;
                            } else
                              f3 = 74;
                            break;
                          }
                          case 105: {
                            if (R(r3) | 0 ? B(e3 + 4 | 0, 109, 112, 111, 114, 116) | 0 : 0) {
                              k3();
                              f3 = 74;
                            } else
                              f3 = 74;
                            break;
                          }
                          case 99: {
                            if ((R(r3) | 0 ? z(e3 + 4 | 0, 108, 97, 115, 115) | 0 : 0) ? Z(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                              i2[591] = 1;
                              f3 = 74;
                            } else
                              f3 = 74;
                            break;
                          }
                          case 40: {
                            r3 = t2[15] | 0;
                            a3 = t2[17] | 0;
                            f3 = s2[292] | 0;
                            s2[292] = f3 + 1 << 16 >> 16;
                            t2[a3 + ((f3 & 65535) << 2) >> 2] = r3;
                            f3 = 74;
                            break;
                          }
                          case 41: {
                            e3 = s2[292] | 0;
                            if (!(e3 << 16 >> 16)) {
                              f3 = 36;
                              break e;
                            }
                            f3 = e3 + -1 << 16 >> 16;
                            s2[292] = f3;
                            e3 = t2[11] | 0;
                            if ((e3 | 0) != 0 ? (t2[e3 + 20 >> 2] | 0) == (t2[(t2[17] | 0) + ((f3 & 65535) << 2) >> 2] | 0) : 0) {
                              r3 = e3 + 4 | 0;
                              if (!(t2[r3 >> 2] | 0))
                                t2[r3 >> 2] = a3;
                              t2[e3 + 12 >> 2] = a3;
                              t2[11] = 0;
                              f3 = 74;
                            } else
                              f3 = 74;
                            break;
                          }
                          case 123: {
                            f3 = t2[15] | 0;
                            a3 = t2[8] | 0;
                            e3 = f3;
                            do {
                              if ((s2[f3 >> 1] | 0) == 41 & (a3 | 0) != 0 ? (t2[a3 + 4 >> 2] | 0) == (f3 | 0) : 0) {
                                r3 = t2[9] | 0;
                                t2[8] = r3;
                                if (!r3) {
                                  t2[4] = 0;
                                  break;
                                } else {
                                  t2[r3 + 28 >> 2] = 0;
                                  break;
                                }
                              }
                            } while (0);
                            r3 = s2[292] | 0;
                            f3 = r3 & 65535;
                            i2[b3 + f3 >> 0] = i2[591] | 0;
                            i2[591] = 0;
                            a3 = t2[17] | 0;
                            s2[292] = r3 + 1 << 16 >> 16;
                            t2[a3 + (f3 << 2) >> 2] = e3;
                            f3 = 74;
                            break;
                          }
                          case 125: {
                            e3 = s2[292] | 0;
                            if (!(e3 << 16 >> 16)) {
                              f3 = 49;
                              break e;
                            }
                            a3 = e3 + -1 << 16 >> 16;
                            s2[292] = a3;
                            r3 = s2[293] | 0;
                            if (e3 << 16 >> 16 != r3 << 16 >> 16)
                              if (r3 << 16 >> 16 != -1 & (a3 & 65535) < (r3 & 65535)) {
                                f3 = 53;
                                break e;
                              } else {
                                f3 = 74;
                                break r;
                              }
                            else {
                              a3 = t2[16] | 0;
                              f3 = (s2[291] | 0) + -1 << 16 >> 16;
                              s2[291] = f3;
                              s2[293] = s2[a3 + ((f3 & 65535) << 1) >> 1] | 0;
                              h2();
                              f3 = 74;
                              break r;
                            }
                          }
                          case 39: {
                            d2(39);
                            f3 = 74;
                            break;
                          }
                          case 34: {
                            d2(34);
                            f3 = 74;
                            break;
                          }
                          case 47:
                            switch (s2[e3 + 4 >> 1] | 0) {
                              case 47: {
                                G();
                                break r;
                              }
                              case 42: {
                                p2(1);
                                break r;
                              }
                              default: {
                                r3 = t2[15] | 0;
                                a3 = s2[r3 >> 1] | 0;
                                a:
                                  do {
                                    if (!(x(a3) | 0)) {
                                      switch (a3 << 16 >> 16) {
                                        case 41:
                                          if (L(t2[(t2[17] | 0) + (c2[292] << 2) >> 2] | 0) | 0) {
                                            f3 = 71;
                                            break a;
                                          } else {
                                            f3 = 68;
                                            break a;
                                          }
                                        case 125:
                                          break;
                                        default: {
                                          f3 = 68;
                                          break a;
                                        }
                                      }
                                      e3 = c2[292] | 0;
                                      if (!(y(t2[(t2[17] | 0) + (e3 << 2) >> 2] | 0) | 0) ? (i2[b3 + e3 >> 0] | 0) == 0 : 0)
                                        f3 = 68;
                                      else
                                        f3 = 71;
                                    } else
                                      switch (a3 << 16 >> 16) {
                                        case 46:
                                          if (((s2[r3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                            f3 = 68;
                                            break a;
                                          } else {
                                            f3 = 71;
                                            break a;
                                          }
                                        case 43:
                                          if ((s2[r3 + -2 >> 1] | 0) == 43) {
                                            f3 = 68;
                                            break a;
                                          } else {
                                            f3 = 71;
                                            break a;
                                          }
                                        case 45:
                                          if ((s2[r3 + -2 >> 1] | 0) == 45) {
                                            f3 = 68;
                                            break a;
                                          } else {
                                            f3 = 71;
                                            break a;
                                          }
                                        default: {
                                          f3 = 71;
                                          break a;
                                        }
                                      }
                                  } while (0);
                                a:
                                  do {
                                    if ((f3 | 0) == 68) {
                                      f3 = 0;
                                      if (!(o3(r3) | 0)) {
                                        switch (a3 << 16 >> 16) {
                                          case 0: {
                                            f3 = 71;
                                            break a;
                                          }
                                          case 47:
                                            break;
                                          default: {
                                            e3 = 1;
                                            break a;
                                          }
                                        }
                                        if (!(i2[590] | 0))
                                          e3 = 1;
                                        else
                                          f3 = 71;
                                      } else
                                        f3 = 71;
                                    }
                                  } while (0);
                                if ((f3 | 0) == 71) {
                                  I();
                                  e3 = 0;
                                }
                                i2[590] = e3;
                                f3 = 74;
                                break r;
                              }
                            }
                          case 96: {
                            h2();
                            f3 = 74;
                            break;
                          }
                          default:
                            f3 = 74;
                        }
                      } while (0);
                    if ((f3 | 0) == 74) {
                      f3 = 0;
                      t2[15] = t2[18];
                    }
                    e3 = t2[18] | 0;
                  }
                if ((f3 | 0) == 36) {
                  Y();
                  e3 = 0;
                  break;
                } else if ((f3 | 0) == 49) {
                  Y();
                  e3 = 0;
                  break;
                } else if ((f3 | 0) == 53) {
                  Y();
                  e3 = 0;
                  break;
                } else if ((f3 | 0) == 75) {
                  e3 = (s2[293] | 0) == -1 & (s2[292] | 0) == 0 & (i2[588] | 0) == 0;
                  break;
                }
              }
            } while (0);
            n2 = l4;
            return e3 | 0;
          }
          function u2() {
            var e3 = 0, r3 = 0, a3 = 0, f3 = 0, c3 = 0, n3 = 0;
            c3 = t2[18] | 0;
            n3 = c3 + 12 | 0;
            t2[18] = n3;
            r3 = w2(1) | 0;
            e3 = t2[18] | 0;
            if (!((e3 | 0) == (n3 | 0) ? !(S(r3) | 0) : 0))
              f3 = 3;
            e:
              do {
                if ((f3 | 0) == 3) {
                  r:
                    do {
                      switch (r3 << 16 >> 16) {
                        case 100: {
                          J(e3, e3 + 14 | 0);
                          break e;
                        }
                        case 97: {
                          t2[18] = e3 + 10;
                          w2(1) | 0;
                          e3 = t2[18] | 0;
                          f3 = 6;
                          break;
                        }
                        case 102: {
                          f3 = 6;
                          break;
                        }
                        case 99: {
                          if (z(e3 + 2 | 0, 108, 97, 115, 115) | 0 ? (a3 = e3 + 10 | 0, F(s2[a3 >> 1] | 0) | 0) : 0) {
                            t2[18] = a3;
                            c3 = w2(1) | 0;
                            n3 = t2[18] | 0;
                            H(c3) | 0;
                            J(n3, t2[18] | 0);
                            t2[18] = (t2[18] | 0) + -2;
                            break e;
                          }
                          e3 = e3 + 4 | 0;
                          t2[18] = e3;
                          f3 = 13;
                          break;
                        }
                        case 108:
                        case 118: {
                          f3 = 13;
                          break;
                        }
                        case 123: {
                          t2[18] = e3 + 2;
                          e3 = w2(1) | 0;
                          a3 = t2[18] | 0;
                          while (1) {
                            if (_(e3) | 0) {
                              d2(e3);
                              e3 = (t2[18] | 0) + 2 | 0;
                              t2[18] = e3;
                            } else {
                              H(e3) | 0;
                              e3 = t2[18] | 0;
                            }
                            w2(1) | 0;
                            e3 = g(a3, e3) | 0;
                            if (e3 << 16 >> 16 == 44) {
                              t2[18] = (t2[18] | 0) + 2;
                              e3 = w2(1) | 0;
                            }
                            r3 = a3;
                            a3 = t2[18] | 0;
                            if (e3 << 16 >> 16 == 125) {
                              f3 = 32;
                              break;
                            }
                            if ((a3 | 0) == (r3 | 0)) {
                              f3 = 29;
                              break;
                            }
                            if (a3 >>> 0 > (t2[19] | 0) >>> 0) {
                              f3 = 31;
                              break;
                            }
                          }
                          if ((f3 | 0) == 29) {
                            Y();
                            break e;
                          } else if ((f3 | 0) == 31) {
                            Y();
                            break e;
                          } else if ((f3 | 0) == 32) {
                            t2[18] = a3 + 2;
                            f3 = 34;
                            break r;
                          }
                          break;
                        }
                        case 42: {
                          t2[18] = e3 + 2;
                          w2(1) | 0;
                          f3 = t2[18] | 0;
                          g(f3, f3) | 0;
                          f3 = 34;
                          break;
                        }
                        default: {
                        }
                      }
                    } while (0);
                  if ((f3 | 0) == 6) {
                    t2[18] = e3 + 16;
                    e3 = w2(1) | 0;
                    if (e3 << 16 >> 16 == 42) {
                      t2[18] = (t2[18] | 0) + 2;
                      e3 = w2(1) | 0;
                    }
                    n3 = t2[18] | 0;
                    H(e3) | 0;
                    J(n3, t2[18] | 0);
                    t2[18] = (t2[18] | 0) + -2;
                    break;
                  } else if ((f3 | 0) == 13) {
                    e3 = e3 + 4 | 0;
                    t2[18] = e3;
                    i2[589] = 0;
                    r:
                      while (1) {
                        t2[18] = e3 + 2;
                        n3 = w2(1) | 0;
                        e3 = t2[18] | 0;
                        switch ((H(n3) | 0) << 16 >> 16) {
                          case 91:
                          case 123: {
                            f3 = 15;
                            break r;
                          }
                          default: {
                          }
                        }
                        r3 = t2[18] | 0;
                        if ((r3 | 0) == (e3 | 0))
                          break e;
                        J(e3, r3);
                        switch ((w2(1) | 0) << 16 >> 16) {
                          case 61: {
                            f3 = 19;
                            break r;
                          }
                          case 44:
                            break;
                          default: {
                            f3 = 20;
                            break r;
                          }
                        }
                        e3 = t2[18] | 0;
                      }
                    if ((f3 | 0) == 15) {
                      t2[18] = (t2[18] | 0) + -2;
                      break;
                    } else if ((f3 | 0) == 19) {
                      t2[18] = (t2[18] | 0) + -2;
                      break;
                    } else if ((f3 | 0) == 20) {
                      t2[18] = (t2[18] | 0) + -2;
                      break;
                    }
                  } else if ((f3 | 0) == 34)
                    r3 = w2(1) | 0;
                  e3 = t2[18] | 0;
                  if (r3 << 16 >> 16 == 102 ? K(e3 + 2 | 0, 114, 111, 109) | 0 : 0) {
                    t2[18] = e3 + 8;
                    l3(c3, w2(1) | 0);
                    break;
                  }
                  t2[18] = e3 + -2;
                }
              } while (0);
            return;
          }
          function k3() {
            var e3 = 0, r3 = 0, a3 = 0, f3 = 0, c3 = 0;
            c3 = t2[18] | 0;
            r3 = c3 + 12 | 0;
            t2[18] = r3;
            e:
              do {
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 40: {
                    r3 = t2[17] | 0;
                    a3 = s2[292] | 0;
                    s2[292] = a3 + 1 << 16 >> 16;
                    t2[r3 + ((a3 & 65535) << 2) >> 2] = c3;
                    if ((s2[t2[15] >> 1] | 0) != 46) {
                      v(c3, (t2[18] | 0) + 2 | 0, 0, c3);
                      t2[11] = t2[8];
                      t2[18] = (t2[18] | 0) + 2;
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
                          t2[18] = (t2[18] | 0) + -2;
                          break e;
                        }
                      }
                      t2[18] = (t2[18] | 0) + 2;
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 44: {
                          c3 = t2[18] | 0;
                          t2[(t2[8] | 0) + 4 >> 2] = c3;
                          t2[18] = c3 + 2;
                          w2(1) | 0;
                          c3 = t2[18] | 0;
                          a3 = t2[8] | 0;
                          t2[a3 + 16 >> 2] = c3;
                          i2[a3 + 24 >> 0] = 1;
                          t2[18] = c3 + -2;
                          break e;
                        }
                        case 41: {
                          s2[292] = (s2[292] | 0) + -1 << 16 >> 16;
                          a3 = t2[18] | 0;
                          c3 = t2[8] | 0;
                          t2[c3 + 4 >> 2] = a3;
                          t2[c3 + 12 >> 2] = a3;
                          i2[c3 + 24 >> 0] = 1;
                          break e;
                        }
                        default: {
                          t2[18] = (t2[18] | 0) + -2;
                          break e;
                        }
                      }
                    }
                    break;
                  }
                  case 46: {
                    t2[18] = (t2[18] | 0) + 2;
                    if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = t2[18] | 0, K(e3 + 2 | 0, 101, 116, 97) | 0) : 0) ? (s2[t2[15] >> 1] | 0) != 46 : 0)
                      v(c3, c3, e3 + 8 | 0, 2);
                    break;
                  }
                  case 42:
                  case 39:
                  case 34: {
                    f3 = 16;
                    break;
                  }
                  case 123: {
                    e3 = t2[18] | 0;
                    if (s2[292] | 0) {
                      t2[18] = e3 + -2;
                      break e;
                    }
                    while (1) {
                      if (e3 >>> 0 >= (t2[19] | 0) >>> 0)
                        break;
                      e3 = w2(1) | 0;
                      if (!(_(e3) | 0)) {
                        if (e3 << 16 >> 16 == 125) {
                          f3 = 31;
                          break;
                        }
                      } else
                        d2(e3);
                      e3 = (t2[18] | 0) + 2 | 0;
                      t2[18] = e3;
                    }
                    if ((f3 | 0) == 31)
                      t2[18] = (t2[18] | 0) + 2;
                    w2(1) | 0;
                    e3 = t2[18] | 0;
                    if (!(z(e3, 102, 114, 111, 109) | 0)) {
                      Y();
                      break e;
                    }
                    t2[18] = e3 + 8;
                    e3 = w2(1) | 0;
                    if (_(e3) | 0) {
                      l3(c3, e3);
                      break e;
                    } else {
                      Y();
                      break e;
                    }
                  }
                  default:
                    if ((t2[18] | 0) != (r3 | 0))
                      f3 = 16;
                }
              } while (0);
            do {
              if ((f3 | 0) == 16) {
                if (s2[292] | 0) {
                  t2[18] = (t2[18] | 0) + -2;
                  break;
                }
                e3 = t2[19] | 0;
                r3 = t2[18] | 0;
                while (1) {
                  if (r3 >>> 0 >= e3 >>> 0) {
                    f3 = 23;
                    break;
                  }
                  a3 = s2[r3 >> 1] | 0;
                  if (_(a3) | 0) {
                    f3 = 21;
                    break;
                  }
                  f3 = r3 + 2 | 0;
                  t2[18] = f3;
                  r3 = f3;
                }
                if ((f3 | 0) == 21) {
                  l3(c3, a3);
                  break;
                } else if ((f3 | 0) == 23) {
                  Y();
                  break;
                }
              }
            } while (0);
            return;
          }
          function l3(e3, r3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            var a3 = 0, i3 = 0;
            a3 = (t2[18] | 0) + 2 | 0;
            switch (r3 << 16 >> 16) {
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
                Y();
            }
            do {
              if ((i3 | 0) == 5) {
                v(e3, a3, t2[18] | 0, 1);
                t2[18] = (t2[18] | 0) + 2;
                i3 = (w2(0) | 0) << 16 >> 16 == 97;
                r3 = t2[18] | 0;
                if (i3 ? B(r3 + 2 | 0, 115, 115, 101, 114, 116) | 0 : 0) {
                  t2[18] = r3 + 12;
                  if ((w2(1) | 0) << 16 >> 16 != 123) {
                    t2[18] = r3;
                    break;
                  }
                  e3 = t2[18] | 0;
                  a3 = e3;
                  e:
                    while (1) {
                      t2[18] = a3 + 2;
                      a3 = w2(1) | 0;
                      switch (a3 << 16 >> 16) {
                        case 39: {
                          d2(39);
                          t2[18] = (t2[18] | 0) + 2;
                          a3 = w2(1) | 0;
                          break;
                        }
                        case 34: {
                          d2(34);
                          t2[18] = (t2[18] | 0) + 2;
                          a3 = w2(1) | 0;
                          break;
                        }
                        default:
                          a3 = H(a3) | 0;
                      }
                      if (a3 << 16 >> 16 != 58) {
                        i3 = 16;
                        break;
                      }
                      t2[18] = (t2[18] | 0) + 2;
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
                      t2[18] = (t2[18] | 0) + 2;
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
                      t2[18] = (t2[18] | 0) + 2;
                      if ((w2(1) | 0) << 16 >> 16 == 125) {
                        i3 = 25;
                        break;
                      }
                      a3 = t2[18] | 0;
                    }
                  if ((i3 | 0) == 16) {
                    t2[18] = r3;
                    break;
                  } else if ((i3 | 0) == 20) {
                    t2[18] = r3;
                    break;
                  } else if ((i3 | 0) == 24) {
                    t2[18] = r3;
                    break;
                  } else if ((i3 | 0) == 25) {
                    i3 = t2[8] | 0;
                    t2[i3 + 16 >> 2] = e3;
                    t2[i3 + 12 >> 2] = (t2[18] | 0) + 2;
                    break;
                  }
                }
                t2[18] = r3 + -2;
              }
            } while (0);
            return;
          }
          function o3(e3) {
            e3 = e3 | 0;
            e:
              do {
                switch (s2[e3 >> 1] | 0) {
                  case 100:
                    switch (s2[e3 + -2 >> 1] | 0) {
                      case 105: {
                        e3 = q(e3 + -4 | 0, 118, 111) | 0;
                        break e;
                      }
                      case 108: {
                        e3 = P(e3 + -4 | 0, 121, 105, 101) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  case 101: {
                    switch (s2[e3 + -2 >> 1] | 0) {
                      case 115:
                        break;
                      case 116: {
                        e3 = E(e3 + -4 | 0, 100, 101, 108, 101) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                    switch (s2[e3 + -4 >> 1] | 0) {
                      case 108: {
                        e3 = D(e3 + -6 | 0, 101) | 0;
                        break e;
                      }
                      case 97: {
                        e3 = D(e3 + -6 | 0, 99) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  }
                  case 102: {
                    if ((s2[e3 + -2 >> 1] | 0) == 111 ? (s2[e3 + -4 >> 1] | 0) == 101 : 0)
                      switch (s2[e3 + -6 >> 1] | 0) {
                        case 99: {
                          e3 = O(e3 + -8 | 0, 105, 110, 115, 116, 97, 110) | 0;
                          break e;
                        }
                        case 112: {
                          e3 = q(e3 + -8 | 0, 116, 121) | 0;
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
                    if (D(e3, 105) | 0)
                      e3 = 1;
                    else
                      e3 = $(e3, 114, 101, 116, 117, 114) | 0;
                    break;
                  }
                  case 111: {
                    e3 = D(e3 + -2 | 0, 100) | 0;
                    break;
                  }
                  case 114: {
                    e3 = m(e3 + -2 | 0, 100, 101, 98, 117, 103, 103, 101) | 0;
                    break;
                  }
                  case 116: {
                    e3 = E(e3 + -2 | 0, 97, 119, 97, 105) | 0;
                    break;
                  }
                  case 119:
                    switch (s2[e3 + -2 >> 1] | 0) {
                      case 101: {
                        e3 = D(e3 + -4 | 0, 110) | 0;
                        break e;
                      }
                      case 111: {
                        e3 = P(e3 + -4 | 0, 116, 104, 114) | 0;
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
            var e3 = 0, r3 = 0, a3 = 0;
            r3 = t2[19] | 0;
            a3 = t2[18] | 0;
            e:
              while (1) {
                e3 = a3 + 2 | 0;
                if (a3 >>> 0 >= r3 >>> 0) {
                  r3 = 8;
                  break;
                }
                switch (s2[e3 >> 1] | 0) {
                  case 96: {
                    r3 = 9;
                    break e;
                  }
                  case 36: {
                    if ((s2[a3 + 4 >> 1] | 0) == 123) {
                      r3 = 6;
                      break e;
                    }
                    break;
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
            if ((r3 | 0) == 6) {
              t2[18] = a3 + 4;
              e3 = s2[293] | 0;
              r3 = t2[16] | 0;
              a3 = s2[291] | 0;
              s2[291] = a3 + 1 << 16 >> 16;
              s2[r3 + ((a3 & 65535) << 1) >> 1] = e3;
              a3 = (s2[292] | 0) + 1 << 16 >> 16;
              s2[292] = a3;
              s2[293] = a3;
            } else if ((r3 | 0) == 8) {
              t2[18] = e3;
              Y();
            } else if ((r3 | 0) == 9)
              t2[18] = e3;
            return;
          }
          function w2(e3) {
            e3 = e3 | 0;
            var r3 = 0, a3 = 0, i3 = 0;
            a3 = t2[18] | 0;
            e:
              do {
                r3 = s2[a3 >> 1] | 0;
                r:
                  do {
                    if (r3 << 16 >> 16 != 47)
                      if (e3)
                        if (Z(r3) | 0)
                          break;
                        else
                          break e;
                      else if (Q(r3) | 0)
                        break;
                      else
                        break e;
                    else
                      switch (s2[a3 + 2 >> 1] | 0) {
                        case 47: {
                          G();
                          break r;
                        }
                        case 42: {
                          p2(e3);
                          break r;
                        }
                        default: {
                          r3 = 47;
                          break e;
                        }
                      }
                  } while (0);
                i3 = t2[18] | 0;
                a3 = i3 + 2 | 0;
                t2[18] = a3;
              } while (i3 >>> 0 < (t2[19] | 0) >>> 0);
            return r3 | 0;
          }
          function d2(e3) {
            e3 = e3 | 0;
            var r3 = 0, a3 = 0, i3 = 0, f3 = 0;
            f3 = t2[19] | 0;
            r3 = t2[18] | 0;
            while (1) {
              i3 = r3 + 2 | 0;
              if (r3 >>> 0 >= f3 >>> 0) {
                r3 = 9;
                break;
              }
              a3 = s2[i3 >> 1] | 0;
              if (a3 << 16 >> 16 == e3 << 16 >> 16) {
                r3 = 10;
                break;
              }
              if (a3 << 16 >> 16 == 92) {
                a3 = r3 + 4 | 0;
                if ((s2[a3 >> 1] | 0) == 13) {
                  r3 = r3 + 6 | 0;
                  r3 = (s2[r3 >> 1] | 0) == 10 ? r3 : a3;
                } else
                  r3 = a3;
              } else if (ae(a3) | 0) {
                r3 = 9;
                break;
              } else
                r3 = i3;
            }
            if ((r3 | 0) == 9) {
              t2[18] = i3;
              Y();
            } else if ((r3 | 0) == 10)
              t2[18] = i3;
            return;
          }
          function v(e3, r3, a3, s3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            s3 = s3 | 0;
            var f3 = 0, c3 = 0;
            f3 = t2[13] | 0;
            t2[13] = f3 + 32;
            c3 = t2[8] | 0;
            t2[((c3 | 0) == 0 ? 16 : c3 + 28 | 0) >> 2] = f3;
            t2[9] = c3;
            t2[8] = f3;
            t2[f3 + 8 >> 2] = e3;
            do {
              if ((s3 | 0) != 2)
                if ((s3 | 0) == 1) {
                  t2[f3 + 12 >> 2] = a3 + 2;
                  break;
                } else {
                  t2[f3 + 12 >> 2] = t2[3];
                  break;
                }
              else
                t2[f3 + 12 >> 2] = a3;
            } while (0);
            t2[f3 >> 2] = r3;
            t2[f3 + 4 >> 2] = a3;
            t2[f3 + 16 >> 2] = 0;
            t2[f3 + 20 >> 2] = s3;
            i2[f3 + 24 >> 0] = (s3 | 0) == 1 & 1;
            t2[f3 + 28 >> 2] = 0;
            return;
          }
          function A() {
            var e3 = 0, r3 = 0, a3 = 0;
            a3 = t2[19] | 0;
            r3 = t2[18] | 0;
            e:
              while (1) {
                e3 = r3 + 2 | 0;
                if (r3 >>> 0 >= a3 >>> 0) {
                  r3 = 6;
                  break;
                }
                switch (s2[e3 >> 1] | 0) {
                  case 13:
                  case 10: {
                    r3 = 6;
                    break e;
                  }
                  case 93: {
                    r3 = 7;
                    break e;
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
            if ((r3 | 0) == 6) {
              t2[18] = e3;
              Y();
              e3 = 0;
            } else if ((r3 | 0) == 7) {
              t2[18] = e3;
              e3 = 93;
            }
            return e3 | 0;
          }
          function C(e3, r3, a3, i3, t3, f3, c3, n3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            t3 = t3 | 0;
            f3 = f3 | 0;
            c3 = c3 | 0;
            n3 = n3 | 0;
            if ((((((s2[e3 + 12 >> 1] | 0) == n3 << 16 >> 16 ? (s2[e3 + 10 >> 1] | 0) == c3 << 16 >> 16 : 0) ? (s2[e3 + 8 >> 1] | 0) == f3 << 16 >> 16 : 0) ? (s2[e3 + 6 >> 1] | 0) == t3 << 16 >> 16 : 0) ? (s2[e3 + 4 >> 1] | 0) == i3 << 16 >> 16 : 0) ? (s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16 : 0)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function y(e3) {
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
                e3 = E(e3 + -2 | 0, 99, 97, 116, 99) | 0;
                break;
              }
              case 121: {
                e3 = O(e3 + -2 | 0, 102, 105, 110, 97, 108, 108) | 0;
                break;
              }
              case 101: {
                e3 = P(e3 + -2 | 0, 101, 108, 115) | 0;
                break;
              }
              default:
                e3 = 0;
            }
            return e3 | 0;
          }
          function g(e3, r3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            var a3 = 0, i3 = 0;
            a3 = t2[18] | 0;
            i3 = s2[a3 >> 1] | 0;
            if (i3 << 16 >> 16 == 97) {
              t2[18] = a3 + 4;
              a3 = w2(1) | 0;
              e3 = t2[18] | 0;
              if (_(a3) | 0) {
                d2(a3);
                r3 = (t2[18] | 0) + 2 | 0;
                t2[18] = r3;
              } else {
                H(a3) | 0;
                r3 = t2[18] | 0;
              }
              i3 = w2(1) | 0;
              a3 = t2[18] | 0;
            }
            if ((a3 | 0) != (e3 | 0))
              J(e3, r3);
            return i3 | 0;
          }
          function I() {
            var e3 = 0, r3 = 0, a3 = 0;
            e:
              while (1) {
                e3 = t2[18] | 0;
                r3 = e3 + 2 | 0;
                t2[18] = r3;
                if (e3 >>> 0 >= (t2[19] | 0) >>> 0) {
                  a3 = 7;
                  break;
                }
                switch (s2[r3 >> 1] | 0) {
                  case 13:
                  case 10: {
                    a3 = 7;
                    break e;
                  }
                  case 47:
                    break e;
                  case 91: {
                    A() | 0;
                    break;
                  }
                  case 92: {
                    t2[18] = e3 + 4;
                    break;
                  }
                  default: {
                  }
                }
              }
            if ((a3 | 0) == 7)
              Y();
            return;
          }
          function p2(e3) {
            e3 = e3 | 0;
            var r3 = 0, a3 = 0, i3 = 0, f3 = 0, c3 = 0;
            f3 = (t2[18] | 0) + 2 | 0;
            t2[18] = f3;
            a3 = t2[19] | 0;
            while (1) {
              r3 = f3 + 2 | 0;
              if (f3 >>> 0 >= a3 >>> 0)
                break;
              i3 = s2[r3 >> 1] | 0;
              if (!e3 ? ae(i3) | 0 : 0)
                break;
              if (i3 << 16 >> 16 == 42 ? (s2[f3 + 4 >> 1] | 0) == 47 : 0) {
                c3 = 8;
                break;
              }
              f3 = r3;
            }
            if ((c3 | 0) == 8) {
              t2[18] = r3;
              r3 = f3 + 4 | 0;
            }
            t2[18] = r3;
            return;
          }
          function U(e3, r3, a3, i3, t3, f3, c3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            t3 = t3 | 0;
            f3 = f3 | 0;
            c3 = c3 | 0;
            if (((((s2[e3 + 10 >> 1] | 0) == c3 << 16 >> 16 ? (s2[e3 + 8 >> 1] | 0) == f3 << 16 >> 16 : 0) ? (s2[e3 + 6 >> 1] | 0) == t3 << 16 >> 16 : 0) ? (s2[e3 + 4 >> 1] | 0) == i3 << 16 >> 16 : 0) ? (s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16 : 0)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function m(e3, r3, a3, i3, f3, c3, n3, b3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            f3 = f3 | 0;
            c3 = c3 | 0;
            n3 = n3 | 0;
            b3 = b3 | 0;
            var u3 = 0, k4 = 0;
            k4 = e3 + -12 | 0;
            u3 = t2[3] | 0;
            if (k4 >>> 0 >= u3 >>> 0 ? C(k4, r3, a3, i3, f3, c3, n3, b3) | 0 : 0)
              if ((k4 | 0) == (u3 | 0))
                u3 = 1;
              else
                u3 = F(s2[e3 + -14 >> 1] | 0) | 0;
            else
              u3 = 0;
            return u3 | 0;
          }
          function S(e3) {
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
          function x(e3) {
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
          function O(e3, r3, a3, i3, f3, c3, n3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            f3 = f3 | 0;
            c3 = c3 | 0;
            n3 = n3 | 0;
            var b3 = 0, u3 = 0;
            u3 = e3 + -10 | 0;
            b3 = t2[3] | 0;
            if (u3 >>> 0 >= b3 >>> 0 ? U(u3, r3, a3, i3, f3, c3, n3) | 0 : 0)
              if ((u3 | 0) == (b3 | 0))
                b3 = 1;
              else
                b3 = F(s2[e3 + -12 >> 1] | 0) | 0;
            else
              b3 = 0;
            return b3 | 0;
          }
          function $(e3, r3, a3, i3, f3, c3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            f3 = f3 | 0;
            c3 = c3 | 0;
            var n3 = 0, b3 = 0;
            b3 = e3 + -8 | 0;
            n3 = t2[3] | 0;
            if (b3 >>> 0 >= n3 >>> 0 ? B(b3, r3, a3, i3, f3, c3) | 0 : 0)
              if ((b3 | 0) == (n3 | 0))
                n3 = 1;
              else
                n3 = F(s2[e3 + -10 >> 1] | 0) | 0;
            else
              n3 = 0;
            return n3 | 0;
          }
          function j(e3) {
            e3 = e3 | 0;
            var r3 = 0, a3 = 0, i3 = 0, f3 = 0;
            a3 = n2;
            n2 = n2 + 16 | 0;
            i3 = a3;
            t2[i3 >> 2] = 0;
            t2[12] = e3;
            r3 = t2[3] | 0;
            f3 = r3 + (e3 << 1) | 0;
            e3 = f3 + 2 | 0;
            s2[f3 >> 1] = 0;
            t2[i3 >> 2] = e3;
            t2[13] = e3;
            t2[4] = 0;
            t2[8] = 0;
            t2[6] = 0;
            t2[5] = 0;
            t2[10] = 0;
            t2[7] = 0;
            n2 = a3;
            return r3 | 0;
          }
          function B(e3, r3, a3, i3, t3, f3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            t3 = t3 | 0;
            f3 = f3 | 0;
            if ((((s2[e3 + 8 >> 1] | 0) == f3 << 16 >> 16 ? (s2[e3 + 6 >> 1] | 0) == t3 << 16 >> 16 : 0) ? (s2[e3 + 4 >> 1] | 0) == i3 << 16 >> 16 : 0) ? (s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16 : 0)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function E(e3, r3, a3, i3, f3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            f3 = f3 | 0;
            var c3 = 0, n3 = 0;
            n3 = e3 + -6 | 0;
            c3 = t2[3] | 0;
            if (n3 >>> 0 >= c3 >>> 0 ? z(n3, r3, a3, i3, f3) | 0 : 0)
              if ((n3 | 0) == (c3 | 0))
                c3 = 1;
              else
                c3 = F(s2[e3 + -8 >> 1] | 0) | 0;
            else
              c3 = 0;
            return c3 | 0;
          }
          function P(e3, r3, a3, i3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            var f3 = 0, c3 = 0;
            c3 = e3 + -4 | 0;
            f3 = t2[3] | 0;
            if (c3 >>> 0 >= f3 >>> 0 ? K(c3, r3, a3, i3) | 0 : 0)
              if ((c3 | 0) == (f3 | 0))
                f3 = 1;
              else
                f3 = F(s2[e3 + -6 >> 1] | 0) | 0;
            else
              f3 = 0;
            return f3 | 0;
          }
          function q(e3, r3, a3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            var i3 = 0, f3 = 0;
            f3 = e3 + -2 | 0;
            i3 = t2[3] | 0;
            if (f3 >>> 0 >= i3 >>> 0 ? N(f3, r3, a3) | 0 : 0)
              if ((f3 | 0) == (i3 | 0))
                i3 = 1;
              else
                i3 = F(s2[e3 + -4 >> 1] | 0) | 0;
            else
              i3 = 0;
            return i3 | 0;
          }
          function z(e3, r3, a3, i3, t3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            t3 = t3 | 0;
            if (((s2[e3 + 6 >> 1] | 0) == t3 << 16 >> 16 ? (s2[e3 + 4 >> 1] | 0) == i3 << 16 >> 16 : 0) ? (s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16 : 0)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function D(e3, r3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            var a3 = 0;
            a3 = t2[3] | 0;
            if (a3 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == r3 << 16 >> 16 : 0)
              if ((a3 | 0) == (e3 | 0))
                a3 = 1;
              else
                a3 = F(s2[e3 + -2 >> 1] | 0) | 0;
            else
              a3 = 0;
            return a3 | 0;
          }
          function F(e3) {
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
                  e3 = e3 << 16 >> 16 != 46 & (S(e3) | 0);
                }
              } while (0);
            return e3 | 0;
          }
          function G() {
            var e3 = 0, r3 = 0, a3 = 0;
            e3 = t2[19] | 0;
            a3 = t2[18] | 0;
            e:
              while (1) {
                r3 = a3 + 2 | 0;
                if (a3 >>> 0 >= e3 >>> 0)
                  break;
                switch (s2[r3 >> 1] | 0) {
                  case 13:
                  case 10:
                    break e;
                  default:
                    a3 = r3;
                }
              }
            t2[18] = r3;
            return;
          }
          function H(e3) {
            e3 = e3 | 0;
            while (1) {
              if (Z(e3) | 0)
                break;
              if (S(e3) | 0)
                break;
              e3 = (t2[18] | 0) + 2 | 0;
              t2[18] = e3;
              e3 = s2[e3 >> 1] | 0;
              if (!(e3 << 16 >> 16)) {
                e3 = 0;
                break;
              }
            }
            return e3 | 0;
          }
          function J(e3, r3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            var a3 = 0, i3 = 0;
            a3 = t2[13] | 0;
            t2[13] = a3 + 12;
            i3 = t2[10] | 0;
            t2[((i3 | 0) == 0 ? 20 : i3 + 8 | 0) >> 2] = a3;
            t2[10] = a3;
            t2[a3 >> 2] = e3;
            t2[a3 + 4 >> 2] = r3;
            t2[a3 + 8 >> 2] = 0;
            return;
          }
          function K(e3, r3, a3, i3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            i3 = i3 | 0;
            if ((s2[e3 + 4 >> 1] | 0) == i3 << 16 >> 16 ? (s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16 : 0)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function L(e3) {
            e3 = e3 | 0;
            if (!($(e3, 119, 104, 105, 108, 101) | 0) ? !(P(e3, 102, 111, 114) | 0) : 0)
              e3 = q(e3, 105, 102) | 0;
            else
              e3 = 1;
            return e3 | 0;
          }
          function M() {
            var e3 = 0;
            e3 = t2[(t2[6] | 0) + 20 >> 2] | 0;
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
          function N(e3, r3, a3) {
            e3 = e3 | 0;
            r3 = r3 | 0;
            a3 = a3 | 0;
            if ((s2[e3 + 2 >> 1] | 0) == a3 << 16 >> 16)
              r3 = (s2[e3 >> 1] | 0) == r3 << 16 >> 16;
            else
              r3 = 0;
            return r3 | 0;
          }
          function Q(e3) {
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
          function R(e3) {
            e3 = e3 | 0;
            if ((t2[3] | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = F(s2[e3 + -2 >> 1] | 0) | 0;
            return e3 | 0;
          }
          function T() {
            var e3 = 0;
            e3 = t2[(t2[6] | 0) + 16 >> 2] | 0;
            if (!e3)
              e3 = -1;
            else
              e3 = e3 - (t2[3] | 0) >> 1;
            return e3 | 0;
          }
          function V() {
            var e3 = 0;
            e3 = t2[6] | 0;
            e3 = t2[((e3 | 0) == 0 ? 16 : e3 + 28 | 0) >> 2] | 0;
            t2[6] = e3;
            return (e3 | 0) != 0 | 0;
          }
          function W() {
            var e3 = 0;
            e3 = t2[7] | 0;
            e3 = t2[((e3 | 0) == 0 ? 20 : e3 + 8 | 0) >> 2] | 0;
            t2[7] = e3;
            return (e3 | 0) != 0 | 0;
          }
          function X(e3) {
            e3 = e3 | 0;
            var r3 = 0;
            r3 = n2;
            n2 = n2 + e3 | 0;
            n2 = n2 + 15 & -16;
            return r3 | 0;
          }
          function Y() {
            i2[588] = 1;
            t2[14] = (t2[18] | 0) - (t2[3] | 0) >> 1;
            t2[18] = (t2[19] | 0) + 2;
            return;
          }
          function Z(e3) {
            e3 = e3 | 0;
            return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
          }
          function _(e3) {
            e3 = e3 | 0;
            return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
          }
          function ee() {
            return (t2[(t2[6] | 0) + 12 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function re() {
            return (t2[(t2[6] | 0) + 8 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function ae(e3) {
            e3 = e3 | 0;
            return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
          }
          function ie() {
            return (t2[(t2[6] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function se() {
            return (t2[(t2[7] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function te() {
            return (t2[t2[6] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function fe() {
            return (t2[t2[7] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
          }
          function ce() {
            return f2[(t2[6] | 0) + 24 >> 0] | 0 | 0;
          }
          function ne(e3) {
            e3 = e3 | 0;
            t2[3] = e3;
            return;
          }
          function be() {
            return (i2[589] | 0) != 0 | 0;
          }
          function ue() {
            return t2[14] | 0;
          }
          return { ai: T, e: ue, ee: se, es: fe, f: be, id: M, ie, ip: ce, is: te, p: b2, re: W, ri: V, sa: j, se: ee, ses: ne, ss: re, sta: X };
        }({ Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array }, {}, r), a = e.sta(2 * i);
      }
      const o2 = t.length + 1;
      e.ses(a), e.sa(o2 - 1), (s ? b : n)(t, new Uint16Array(r, a, o2)), e.p() || (c$1 = e.e(), h());
      const w = [], d = [];
      for (; e.ri(); ) {
        const r2 = e.is(), a2 = e.ie(), i2 = e.ai(), s2 = e.id(), f2 = e.ss(), c2 = e.se();
        let n2;
        e.ip() && (n2 = u(s2 === -1 ? r2 : r2 + 1, t.charCodeAt(s2 === -1 ? r2 - 1 : r2))), w.push({ n: n2, s: r2, e: a2, ss: f2, se: c2, d: s2, a: i2 });
      }
      for (; e.re(); ) {
        const r2 = e.es(), a2 = t.charCodeAt(r2);
        d.push(a2 === 34 || a2 === 39 ? u(r2 + 1, a2) : t.slice(e.es(), e.ee()));
      }
      return [w, d, !!e.f()];
    }
    function n(e2, r2) {
      const a2 = e2.length;
      let i2 = 0;
      for (; i2 < a2; ) {
        const a3 = e2.charCodeAt(i2);
        r2[i2++] = (255 & a3) << 8 | a3 >>> 8;
      }
    }
    function b(e2, r2) {
      const a2 = e2.length;
      let i2 = 0;
      for (; i2 < a2; )
        r2[i2] = e2.charCodeAt(i2++);
    }
    function u(e2, r2) {
      c$1 = e2;
      let a2 = "", i2 = c$1;
      for (; ; ) {
        c$1 >= t.length && h();
        const e3 = t.charCodeAt(c$1);
        if (e3 === r2)
          break;
        e3 === 92 ? (a2 += t.slice(i2, c$1), a2 += k(), i2 = c$1) : (e3 === 8232 || e3 === 8233 || o(e3) && h(), ++c$1);
      }
      return a2 += t.slice(i2, c$1++), a2;
    }
    function k() {
      let e2 = t.charCodeAt(++c$1);
      switch (++c$1, e2) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(l(2));
        case 117:
          return function() {
            let e3;
            t.charCodeAt(c$1) === 123 ? (++c$1, e3 = l(t.indexOf("}", c$1) - c$1), ++c$1, e3 > 1114111 && h()) : e3 = l(4);
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
          t.charCodeAt(c$1) === 10 && ++c$1;
        case 10:
          return "";
        case 56:
        case 57:
          h();
        default:
          if (e2 >= 48 && e2 <= 55) {
            let r2 = t.substr(c$1 - 1, 3).match(/^[0-7]+/)[0], a2 = parseInt(r2, 8);
            return a2 > 255 && (r2 = r2.slice(0, -1), a2 = parseInt(r2, 8)), c$1 += r2.length - 1, e2 = t.charCodeAt(c$1), r2 === "0" && e2 !== 56 && e2 !== 57 || h(), String.fromCharCode(a2);
          }
          return o(e2) ? "" : String.fromCharCode(e2);
      }
    }
    function l(e2) {
      const r2 = c$1;
      let a2 = 0, i2 = 0;
      for (let r3 = 0; r3 < e2; ++r3, ++c$1) {
        let e3, s2 = t.charCodeAt(c$1);
        if (s2 !== 95) {
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
          i2 = s2, a2 = 16 * a2 + e3;
        } else
          i2 !== 95 && r3 !== 0 || h(), i2 = s2;
      }
      return i2 !== 95 && c$1 - r2 === e2 || h(), a2;
    }
    function o(e2) {
      return e2 === 13 || e2 === 10;
    }
    function h() {
      throw Object.assign(new Error(`Parse error ${f}:${t.slice(0, c$1).split("\n").length}:${c$1 - t.lastIndexOf("\n", c$1 - 1)}`), { idx: c$1 });
    }
    async function defaultResolve(id, parentUrl) {
      return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl);
    }
    async function _resolve(id, parentUrl) {
      const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
      return {
        r: resolveImportMap(importMap, urlResolved || id, parentUrl),
        b: !urlResolved && !isURL(id)
      };
    }
    const resolve = resolveHook ? async (id, parentUrl) => ({ r: await resolveHook(id, parentUrl, defaultResolve), b: false }) : _resolve;
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
    async function importShim2(id, parentUrl = baseUrl, _assertion) {
      await initPromise;
      if (acceptingImportMaps || shimMode || !baselinePassthrough) {
        processImportMaps();
        if (!shimMode)
          acceptingImportMaps = false;
      }
      await importMapPromise;
      return topLevelLoad((await resolve(id, parentUrl)).r || throwUnresolved(id, parentUrl), { credentials: "same-origin" });
    }
    self.importShim = importShim2;
    if (shimMode) {
      importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
    }
    const meta = {};
    async function importMetaResolve(id, parentUrl = this.url) {
      return (await resolve(id, `${parentUrl}`)).r || throwUnresolved(id, parentUrl);
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
        for (const { s: start, e: end, se: statementEnd, d: dynamicImportIndex } of imports) {
          if (dynamicImportIndex === -1) {
            const depLoad = load.d[depIndex++];
            let blobUrl = depLoad.b;
            if (!blobUrl) {
              if (!(blobUrl = depLoad.s)) {
                blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map((name) => name === "default" ? `$_default=m.default` : `${name}=m.${name}`).join(",")}}${depLoad.a[1].map((name) => name === "default" ? `let $_default;export{$_default as default}` : `export let ${name}`).join(";")}
//# sourceURL=${depLoad.r}?cycle`);
              }
            } else if (depLoad.s) {
              resolvedSource += `${source.slice(lastIndex, start - 1)}/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)};import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
              lastIndex = statementEnd;
              depLoad.s = void 0;
              continue;
            }
            resolvedSource += `${source.slice(lastIndex, start - 1)}/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;
            lastIndex = statementEnd;
          } else if (dynamicImportIndex === -2) {
            meta[load.r] = { url: load.r, resolve: importMetaResolve };
            resolvedSource += `${source.slice(lastIndex, start)}self._esmsm[${urlJsString(load.r)}]`;
            lastIndex = statementEnd;
          } else {
            resolvedSource += `${source.slice(lastIndex, dynamicImportIndex + 6)}Shim(${source.slice(start, end)}, ${urlJsString(load.r)}${source.slice(end, statementEnd)}`;
            lastIndex = statementEnd;
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
        return new Promise((r2) => p.push(r2));
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
      else if (cssContentType.test(contentType)) {
        return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
      } else
        throw Error(`Unsupported Content-Type "${contentType}"`);
    }
    function getOrCreateLoad(url, fetchOpts, source) {
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
        t: null
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
          ({ r: load.r, s: source, t: t2 } = await (fetchCache[url] || doFetch(url, fetchOpts)));
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
          console.warn(e2);
          load.a = [[], []];
        }
        load.S = source;
        return load;
      })();
      load.L = load.f.then(async () => {
        let childFetchOpts = fetchOpts;
        load.d = (await Promise.all(load.a[0].map(async ({ n: n2, d }) => {
          if (d >= 0 && !supportsDynamicImport || d === 2 && !supportsImportMeta)
            load.n = true;
          if (!n2)
            return;
          const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
          if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
            load.n = true;
          if (d !== -1)
            return;
          if (!r2)
            throwUnresolved(n2, load.r || load.u);
          if (skip && skip.test(r2))
            return { b: r2 };
          if (childFetchOpts.integrity)
            childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
          return getOrCreateLoad(r2, childFetchOpts).f;
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
      const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, blocks && lastStaticLoadPromise).catch((e2) => {
        if (safari)
          console.error(e2);
        else
          setTimeout(() => {
            throw e2;
          });
        onerror(e2);
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
    function throwUnresolved(id, parentUrl) {
      throw Error("Unable to resolve specifier '" + id + (parentUrl ? "' from " + parentUrl : "'"));
    }
  })();

  // js/appStarter.ts
  (async () => {
    window.esmsInitOptions = {
      shimMode: true,
      revokeBlobURLs: true,
      resolve: (id, parentUrl) => {
        return parentUrl + id;
      },
      polyfillEnable: ["css-modules", "json-modules"],
      onerror: (error) => console.log(error),
      noLoadEventRetriggers: true,
      skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//
    };
    const { run } = await importShim("./starter.mjs");
    run();
  })();
})();
