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
      } catch (_2) {
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
        for (let i3 = 0; i3 < segmented.length; i3++) {
          if (segmentIndex !== -1) {
            if (segmented[i3] === "/") {
              output.push(segmented.slice(segmentIndex, i3 + 1));
              segmentIndex = -1;
            }
            continue;
          } else if (segmented[i3] === ".") {
            if (segmented[i3 + 1] === "." && (segmented[i3 + 2] === "/" || i3 + 2 === segmented.length)) {
              output.pop();
              i3 += 2;
              continue;
            } else if (segmented[i3 + 1] === "/" || i3 + 1 === segmented.length) {
              i3 += 1;
              continue;
            }
          }
          while (segmented[i3] === "/")
            i3++;
          segmentIndex = i3;
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
        for (let s3 in json.scopes) {
          const resolvedScope = resolveUrl(s3, baseUrl2);
          resolveAndComposePackages(json.scopes[s3], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
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
      const s3 = Object.assign(document.createElement("script"), { type: "module", src });
      s3.setAttribute("nonce", nonce);
      s3.setAttribute("noshim", "");
      const p2 = new Promise((resolve2, reject) => {
        s3.addEventListener("error", cb);
        s3.addEventListener("load", cb);
        function cb(_err) {
          document.head.removeChild(s3);
          if (self._esmsi) {
            resolve2(self._esmsi, baseUrl);
            self._esmsi = void 0;
          } else {
            reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading or executing the graph of ${errUrl} (check the console for ${src}).`));
            err = void 0;
          }
        }
      });
      document.head.appendChild(s3);
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
          self._$s = (v2) => {
            document.head.removeChild(iframe);
            if (v2)
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
    let e2, r2, a2, i2 = 4194304;
    const s2 = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    let t2, f2, c$1;
    function parse(k2, l2 = "@") {
      if (t2 = k2, f2 = l2, t2.length > i2 || !e2) {
        for (; t2.length > i2; )
          i2 *= 2;
        r2 = new ArrayBuffer(4 * i2), e2 = function(e3, r3, a3) {
          ;
          var i3 = new e3.Int8Array(a3), s3 = new e3.Int16Array(a3), t3 = new e3.Int32Array(a3), f3 = new e3.Uint8Array(a3), c3 = new e3.Uint16Array(a3), n3 = 816;
          function b2(e4) {
            e4 = e4 | 0;
            var r4 = 0, a4 = 0, f4 = 0, b3 = 0, l4 = 0;
            l4 = n3;
            n3 = n3 + 14336 | 0;
            b3 = l4;
            i3[589] = 1;
            s3[291] = 0;
            s3[292] = 0;
            s3[293] = -1;
            t3[15] = t3[2];
            i3[590] = 0;
            t3[14] = 0;
            i3[588] = 0;
            t3[16] = l4 + 10240;
            t3[17] = l4 + 2048;
            i3[591] = 0;
            e4 = (t3[3] | 0) + -2 | 0;
            t3[18] = e4;
            r4 = e4 + (t3[12] << 1) | 0;
            t3[19] = r4;
            e:
              while (1) {
                a4 = e4 + 2 | 0;
                t3[18] = a4;
                if (e4 >>> 0 >= r4 >>> 0) {
                  f4 = 18;
                  break;
                }
                r:
                  do {
                    switch (s3[a4 >> 1] | 0) {
                      case 9:
                      case 10:
                      case 11:
                      case 12:
                      case 13:
                      case 32:
                        break;
                      case 101: {
                        if ((((s3[292] | 0) == 0 ? R(a4) | 0 : 0) ? B(e4 + 4 | 0, 120, 112, 111, 114, 116) | 0 : 0) ? (u3(), (i3[589] | 0) == 0) : 0) {
                          f4 = 9;
                          break e;
                        } else
                          f4 = 17;
                        break;
                      }
                      case 105: {
                        if (R(a4) | 0 ? B(e4 + 4 | 0, 109, 112, 111, 114, 116) | 0 : 0) {
                          k3();
                          f4 = 17;
                        } else
                          f4 = 17;
                        break;
                      }
                      case 59: {
                        f4 = 17;
                        break;
                      }
                      case 47:
                        switch (s3[e4 + 4 >> 1] | 0) {
                          case 47: {
                            G();
                            break r;
                          }
                          case 42: {
                            p2(1);
                            break r;
                          }
                          default: {
                            f4 = 16;
                            break e;
                          }
                        }
                      default: {
                        f4 = 16;
                        break e;
                      }
                    }
                  } while (0);
                if ((f4 | 0) == 17) {
                  f4 = 0;
                  t3[15] = t3[18];
                }
                e4 = t3[18] | 0;
                r4 = t3[19] | 0;
              }
            if ((f4 | 0) == 9) {
              e4 = t3[18] | 0;
              t3[15] = e4;
              f4 = 19;
            } else if ((f4 | 0) == 16) {
              i3[589] = 0;
              t3[18] = e4;
              f4 = 19;
            } else if ((f4 | 0) == 18)
              if (!(i3[588] | 0)) {
                e4 = a4;
                f4 = 19;
              } else
                e4 = 0;
            do {
              if ((f4 | 0) == 19) {
                e:
                  while (1) {
                    r4 = e4 + 2 | 0;
                    t3[18] = r4;
                    a4 = r4;
                    if (e4 >>> 0 >= (t3[19] | 0) >>> 0) {
                      f4 = 75;
                      break;
                    }
                    r:
                      do {
                        switch (s3[r4 >> 1] | 0) {
                          case 9:
                          case 10:
                          case 11:
                          case 12:
                          case 13:
                          case 32:
                            break;
                          case 101: {
                            if (((s3[292] | 0) == 0 ? R(r4) | 0 : 0) ? B(e4 + 4 | 0, 120, 112, 111, 114, 116) | 0 : 0) {
                              u3();
                              f4 = 74;
                            } else
                              f4 = 74;
                            break;
                          }
                          case 105: {
                            if (R(r4) | 0 ? B(e4 + 4 | 0, 109, 112, 111, 114, 116) | 0 : 0) {
                              k3();
                              f4 = 74;
                            } else
                              f4 = 74;
                            break;
                          }
                          case 99: {
                            if ((R(r4) | 0 ? z(e4 + 4 | 0, 108, 97, 115, 115) | 0 : 0) ? Z(s3[e4 + 12 >> 1] | 0) | 0 : 0) {
                              i3[591] = 1;
                              f4 = 74;
                            } else
                              f4 = 74;
                            break;
                          }
                          case 40: {
                            r4 = t3[15] | 0;
                            a4 = t3[17] | 0;
                            f4 = s3[292] | 0;
                            s3[292] = f4 + 1 << 16 >> 16;
                            t3[a4 + ((f4 & 65535) << 2) >> 2] = r4;
                            f4 = 74;
                            break;
                          }
                          case 41: {
                            e4 = s3[292] | 0;
                            if (!(e4 << 16 >> 16)) {
                              f4 = 36;
                              break e;
                            }
                            f4 = e4 + -1 << 16 >> 16;
                            s3[292] = f4;
                            e4 = t3[11] | 0;
                            if ((e4 | 0) != 0 ? (t3[e4 + 20 >> 2] | 0) == (t3[(t3[17] | 0) + ((f4 & 65535) << 2) >> 2] | 0) : 0) {
                              r4 = e4 + 4 | 0;
                              if (!(t3[r4 >> 2] | 0))
                                t3[r4 >> 2] = a4;
                              t3[e4 + 12 >> 2] = a4;
                              t3[11] = 0;
                              f4 = 74;
                            } else
                              f4 = 74;
                            break;
                          }
                          case 123: {
                            f4 = t3[15] | 0;
                            a4 = t3[8] | 0;
                            e4 = f4;
                            do {
                              if ((s3[f4 >> 1] | 0) == 41 & (a4 | 0) != 0 ? (t3[a4 + 4 >> 2] | 0) == (f4 | 0) : 0) {
                                r4 = t3[9] | 0;
                                t3[8] = r4;
                                if (!r4) {
                                  t3[4] = 0;
                                  break;
                                } else {
                                  t3[r4 + 28 >> 2] = 0;
                                  break;
                                }
                              }
                            } while (0);
                            r4 = s3[292] | 0;
                            f4 = r4 & 65535;
                            i3[b3 + f4 >> 0] = i3[591] | 0;
                            i3[591] = 0;
                            a4 = t3[17] | 0;
                            s3[292] = r4 + 1 << 16 >> 16;
                            t3[a4 + (f4 << 2) >> 2] = e4;
                            f4 = 74;
                            break;
                          }
                          case 125: {
                            e4 = s3[292] | 0;
                            if (!(e4 << 16 >> 16)) {
                              f4 = 49;
                              break e;
                            }
                            a4 = e4 + -1 << 16 >> 16;
                            s3[292] = a4;
                            r4 = s3[293] | 0;
                            if (e4 << 16 >> 16 != r4 << 16 >> 16)
                              if (r4 << 16 >> 16 != -1 & (a4 & 65535) < (r4 & 65535)) {
                                f4 = 53;
                                break e;
                              } else {
                                f4 = 74;
                                break r;
                              }
                            else {
                              a4 = t3[16] | 0;
                              f4 = (s3[291] | 0) + -1 << 16 >> 16;
                              s3[291] = f4;
                              s3[293] = s3[a4 + ((f4 & 65535) << 1) >> 1] | 0;
                              h2();
                              f4 = 74;
                              break r;
                            }
                          }
                          case 39: {
                            d2(39);
                            f4 = 74;
                            break;
                          }
                          case 34: {
                            d2(34);
                            f4 = 74;
                            break;
                          }
                          case 47:
                            switch (s3[e4 + 4 >> 1] | 0) {
                              case 47: {
                                G();
                                break r;
                              }
                              case 42: {
                                p2(1);
                                break r;
                              }
                              default: {
                                r4 = t3[15] | 0;
                                a4 = s3[r4 >> 1] | 0;
                                a:
                                  do {
                                    if (!(x(a4) | 0)) {
                                      switch (a4 << 16 >> 16) {
                                        case 41:
                                          if (L(t3[(t3[17] | 0) + (c3[292] << 2) >> 2] | 0) | 0) {
                                            f4 = 71;
                                            break a;
                                          } else {
                                            f4 = 68;
                                            break a;
                                          }
                                        case 125:
                                          break;
                                        default: {
                                          f4 = 68;
                                          break a;
                                        }
                                      }
                                      e4 = c3[292] | 0;
                                      if (!(y(t3[(t3[17] | 0) + (e4 << 2) >> 2] | 0) | 0) ? (i3[b3 + e4 >> 0] | 0) == 0 : 0)
                                        f4 = 68;
                                      else
                                        f4 = 71;
                                    } else
                                      switch (a4 << 16 >> 16) {
                                        case 46:
                                          if (((s3[r4 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                            f4 = 68;
                                            break a;
                                          } else {
                                            f4 = 71;
                                            break a;
                                          }
                                        case 43:
                                          if ((s3[r4 + -2 >> 1] | 0) == 43) {
                                            f4 = 68;
                                            break a;
                                          } else {
                                            f4 = 71;
                                            break a;
                                          }
                                        case 45:
                                          if ((s3[r4 + -2 >> 1] | 0) == 45) {
                                            f4 = 68;
                                            break a;
                                          } else {
                                            f4 = 71;
                                            break a;
                                          }
                                        default: {
                                          f4 = 71;
                                          break a;
                                        }
                                      }
                                  } while (0);
                                a:
                                  do {
                                    if ((f4 | 0) == 68) {
                                      f4 = 0;
                                      if (!(o4(r4) | 0)) {
                                        switch (a4 << 16 >> 16) {
                                          case 0: {
                                            f4 = 71;
                                            break a;
                                          }
                                          case 47:
                                            break;
                                          default: {
                                            e4 = 1;
                                            break a;
                                          }
                                        }
                                        if (!(i3[590] | 0))
                                          e4 = 1;
                                        else
                                          f4 = 71;
                                      } else
                                        f4 = 71;
                                    }
                                  } while (0);
                                if ((f4 | 0) == 71) {
                                  I();
                                  e4 = 0;
                                }
                                i3[590] = e4;
                                f4 = 74;
                                break r;
                              }
                            }
                          case 96: {
                            h2();
                            f4 = 74;
                            break;
                          }
                          default:
                            f4 = 74;
                        }
                      } while (0);
                    if ((f4 | 0) == 74) {
                      f4 = 0;
                      t3[15] = t3[18];
                    }
                    e4 = t3[18] | 0;
                  }
                if ((f4 | 0) == 36) {
                  Y();
                  e4 = 0;
                  break;
                } else if ((f4 | 0) == 49) {
                  Y();
                  e4 = 0;
                  break;
                } else if ((f4 | 0) == 53) {
                  Y();
                  e4 = 0;
                  break;
                } else if ((f4 | 0) == 75) {
                  e4 = (s3[293] | 0) == -1 & (s3[292] | 0) == 0 & (i3[588] | 0) == 0;
                  break;
                }
              }
            } while (0);
            n3 = l4;
            return e4 | 0;
          }
          function u3() {
            var e4 = 0, r4 = 0, a4 = 0, f4 = 0, c4 = 0, n4 = 0;
            c4 = t3[18] | 0;
            n4 = c4 + 12 | 0;
            t3[18] = n4;
            r4 = w2(1) | 0;
            e4 = t3[18] | 0;
            if (!((e4 | 0) == (n4 | 0) ? !(S(r4) | 0) : 0))
              f4 = 3;
            e:
              do {
                if ((f4 | 0) == 3) {
                  r:
                    do {
                      switch (r4 << 16 >> 16) {
                        case 100: {
                          J(e4, e4 + 14 | 0);
                          break e;
                        }
                        case 97: {
                          t3[18] = e4 + 10;
                          w2(1) | 0;
                          e4 = t3[18] | 0;
                          f4 = 6;
                          break;
                        }
                        case 102: {
                          f4 = 6;
                          break;
                        }
                        case 99: {
                          if (z(e4 + 2 | 0, 108, 97, 115, 115) | 0 ? (a4 = e4 + 10 | 0, F(s3[a4 >> 1] | 0) | 0) : 0) {
                            t3[18] = a4;
                            c4 = w2(1) | 0;
                            n4 = t3[18] | 0;
                            H(c4) | 0;
                            J(n4, t3[18] | 0);
                            t3[18] = (t3[18] | 0) + -2;
                            break e;
                          }
                          e4 = e4 + 4 | 0;
                          t3[18] = e4;
                          f4 = 13;
                          break;
                        }
                        case 108:
                        case 118: {
                          f4 = 13;
                          break;
                        }
                        case 123: {
                          t3[18] = e4 + 2;
                          e4 = w2(1) | 0;
                          a4 = t3[18] | 0;
                          while (1) {
                            if (_2(e4) | 0) {
                              d2(e4);
                              e4 = (t3[18] | 0) + 2 | 0;
                              t3[18] = e4;
                            } else {
                              H(e4) | 0;
                              e4 = t3[18] | 0;
                            }
                            w2(1) | 0;
                            e4 = g(a4, e4) | 0;
                            if (e4 << 16 >> 16 == 44) {
                              t3[18] = (t3[18] | 0) + 2;
                              e4 = w2(1) | 0;
                            }
                            r4 = a4;
                            a4 = t3[18] | 0;
                            if (e4 << 16 >> 16 == 125) {
                              f4 = 32;
                              break;
                            }
                            if ((a4 | 0) == (r4 | 0)) {
                              f4 = 29;
                              break;
                            }
                            if (a4 >>> 0 > (t3[19] | 0) >>> 0) {
                              f4 = 31;
                              break;
                            }
                          }
                          if ((f4 | 0) == 29) {
                            Y();
                            break e;
                          } else if ((f4 | 0) == 31) {
                            Y();
                            break e;
                          } else if ((f4 | 0) == 32) {
                            t3[18] = a4 + 2;
                            f4 = 34;
                            break r;
                          }
                          break;
                        }
                        case 42: {
                          t3[18] = e4 + 2;
                          w2(1) | 0;
                          f4 = t3[18] | 0;
                          g(f4, f4) | 0;
                          f4 = 34;
                          break;
                        }
                        default: {
                        }
                      }
                    } while (0);
                  if ((f4 | 0) == 6) {
                    t3[18] = e4 + 16;
                    e4 = w2(1) | 0;
                    if (e4 << 16 >> 16 == 42) {
                      t3[18] = (t3[18] | 0) + 2;
                      e4 = w2(1) | 0;
                    }
                    n4 = t3[18] | 0;
                    H(e4) | 0;
                    J(n4, t3[18] | 0);
                    t3[18] = (t3[18] | 0) + -2;
                    break;
                  } else if ((f4 | 0) == 13) {
                    e4 = e4 + 4 | 0;
                    t3[18] = e4;
                    i3[589] = 0;
                    r:
                      while (1) {
                        t3[18] = e4 + 2;
                        n4 = w2(1) | 0;
                        e4 = t3[18] | 0;
                        switch ((H(n4) | 0) << 16 >> 16) {
                          case 91:
                          case 123: {
                            f4 = 15;
                            break r;
                          }
                          default: {
                          }
                        }
                        r4 = t3[18] | 0;
                        if ((r4 | 0) == (e4 | 0))
                          break e;
                        J(e4, r4);
                        switch ((w2(1) | 0) << 16 >> 16) {
                          case 61: {
                            f4 = 19;
                            break r;
                          }
                          case 44:
                            break;
                          default: {
                            f4 = 20;
                            break r;
                          }
                        }
                        e4 = t3[18] | 0;
                      }
                    if ((f4 | 0) == 15) {
                      t3[18] = (t3[18] | 0) + -2;
                      break;
                    } else if ((f4 | 0) == 19) {
                      t3[18] = (t3[18] | 0) + -2;
                      break;
                    } else if ((f4 | 0) == 20) {
                      t3[18] = (t3[18] | 0) + -2;
                      break;
                    }
                  } else if ((f4 | 0) == 34)
                    r4 = w2(1) | 0;
                  e4 = t3[18] | 0;
                  if (r4 << 16 >> 16 == 102 ? K(e4 + 2 | 0, 114, 111, 109) | 0 : 0) {
                    t3[18] = e4 + 8;
                    l3(c4, w2(1) | 0);
                    break;
                  }
                  t3[18] = e4 + -2;
                }
              } while (0);
            return;
          }
          function k3() {
            var e4 = 0, r4 = 0, a4 = 0, f4 = 0, c4 = 0;
            c4 = t3[18] | 0;
            r4 = c4 + 12 | 0;
            t3[18] = r4;
            e:
              do {
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 40: {
                    r4 = t3[17] | 0;
                    a4 = s3[292] | 0;
                    s3[292] = a4 + 1 << 16 >> 16;
                    t3[r4 + ((a4 & 65535) << 2) >> 2] = c4;
                    if ((s3[t3[15] >> 1] | 0) != 46) {
                      v2(c4, (t3[18] | 0) + 2 | 0, 0, c4);
                      t3[11] = t3[8];
                      t3[18] = (t3[18] | 0) + 2;
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
                          t3[18] = (t3[18] | 0) + -2;
                          break e;
                        }
                      }
                      t3[18] = (t3[18] | 0) + 2;
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 44: {
                          c4 = t3[18] | 0;
                          t3[(t3[8] | 0) + 4 >> 2] = c4;
                          t3[18] = c4 + 2;
                          w2(1) | 0;
                          c4 = t3[18] | 0;
                          a4 = t3[8] | 0;
                          t3[a4 + 16 >> 2] = c4;
                          i3[a4 + 24 >> 0] = 1;
                          t3[18] = c4 + -2;
                          break e;
                        }
                        case 41: {
                          s3[292] = (s3[292] | 0) + -1 << 16 >> 16;
                          a4 = t3[18] | 0;
                          c4 = t3[8] | 0;
                          t3[c4 + 4 >> 2] = a4;
                          t3[c4 + 12 >> 2] = a4;
                          i3[c4 + 24 >> 0] = 1;
                          break e;
                        }
                        default: {
                          t3[18] = (t3[18] | 0) + -2;
                          break e;
                        }
                      }
                    }
                    break;
                  }
                  case 46: {
                    t3[18] = (t3[18] | 0) + 2;
                    if (((w2(1) | 0) << 16 >> 16 == 109 ? (e4 = t3[18] | 0, K(e4 + 2 | 0, 101, 116, 97) | 0) : 0) ? (s3[t3[15] >> 1] | 0) != 46 : 0)
                      v2(c4, c4, e4 + 8 | 0, 2);
                    break;
                  }
                  case 42:
                  case 39:
                  case 34: {
                    f4 = 16;
                    break;
                  }
                  case 123: {
                    e4 = t3[18] | 0;
                    if (s3[292] | 0) {
                      t3[18] = e4 + -2;
                      break e;
                    }
                    while (1) {
                      if (e4 >>> 0 >= (t3[19] | 0) >>> 0)
                        break;
                      e4 = w2(1) | 0;
                      if (!(_2(e4) | 0)) {
                        if (e4 << 16 >> 16 == 125) {
                          f4 = 31;
                          break;
                        }
                      } else
                        d2(e4);
                      e4 = (t3[18] | 0) + 2 | 0;
                      t3[18] = e4;
                    }
                    if ((f4 | 0) == 31)
                      t3[18] = (t3[18] | 0) + 2;
                    w2(1) | 0;
                    e4 = t3[18] | 0;
                    if (!(z(e4, 102, 114, 111, 109) | 0)) {
                      Y();
                      break e;
                    }
                    t3[18] = e4 + 8;
                    e4 = w2(1) | 0;
                    if (_2(e4) | 0) {
                      l3(c4, e4);
                      break e;
                    } else {
                      Y();
                      break e;
                    }
                  }
                  default:
                    if ((t3[18] | 0) != (r4 | 0))
                      f4 = 16;
                }
              } while (0);
            do {
              if ((f4 | 0) == 16) {
                if (s3[292] | 0) {
                  t3[18] = (t3[18] | 0) + -2;
                  break;
                }
                e4 = t3[19] | 0;
                r4 = t3[18] | 0;
                while (1) {
                  if (r4 >>> 0 >= e4 >>> 0) {
                    f4 = 23;
                    break;
                  }
                  a4 = s3[r4 >> 1] | 0;
                  if (_2(a4) | 0) {
                    f4 = 21;
                    break;
                  }
                  f4 = r4 + 2 | 0;
                  t3[18] = f4;
                  r4 = f4;
                }
                if ((f4 | 0) == 21) {
                  l3(c4, a4);
                  break;
                } else if ((f4 | 0) == 23) {
                  Y();
                  break;
                }
              }
            } while (0);
            return;
          }
          function l3(e4, r4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0, i4 = 0;
            a4 = (t3[18] | 0) + 2 | 0;
            switch (r4 << 16 >> 16) {
              case 39: {
                d2(39);
                i4 = 5;
                break;
              }
              case 34: {
                d2(34);
                i4 = 5;
                break;
              }
              default:
                Y();
            }
            do {
              if ((i4 | 0) == 5) {
                v2(e4, a4, t3[18] | 0, 1);
                t3[18] = (t3[18] | 0) + 2;
                i4 = (w2(0) | 0) << 16 >> 16 == 97;
                r4 = t3[18] | 0;
                if (i4 ? B(r4 + 2 | 0, 115, 115, 101, 114, 116) | 0 : 0) {
                  t3[18] = r4 + 12;
                  if ((w2(1) | 0) << 16 >> 16 != 123) {
                    t3[18] = r4;
                    break;
                  }
                  e4 = t3[18] | 0;
                  a4 = e4;
                  e:
                    while (1) {
                      t3[18] = a4 + 2;
                      a4 = w2(1) | 0;
                      switch (a4 << 16 >> 16) {
                        case 39: {
                          d2(39);
                          t3[18] = (t3[18] | 0) + 2;
                          a4 = w2(1) | 0;
                          break;
                        }
                        case 34: {
                          d2(34);
                          t3[18] = (t3[18] | 0) + 2;
                          a4 = w2(1) | 0;
                          break;
                        }
                        default:
                          a4 = H(a4) | 0;
                      }
                      if (a4 << 16 >> 16 != 58) {
                        i4 = 16;
                        break;
                      }
                      t3[18] = (t3[18] | 0) + 2;
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
                          i4 = 20;
                          break e;
                        }
                      }
                      t3[18] = (t3[18] | 0) + 2;
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 125: {
                          i4 = 25;
                          break e;
                        }
                        case 44:
                          break;
                        default: {
                          i4 = 24;
                          break e;
                        }
                      }
                      t3[18] = (t3[18] | 0) + 2;
                      if ((w2(1) | 0) << 16 >> 16 == 125) {
                        i4 = 25;
                        break;
                      }
                      a4 = t3[18] | 0;
                    }
                  if ((i4 | 0) == 16) {
                    t3[18] = r4;
                    break;
                  } else if ((i4 | 0) == 20) {
                    t3[18] = r4;
                    break;
                  } else if ((i4 | 0) == 24) {
                    t3[18] = r4;
                    break;
                  } else if ((i4 | 0) == 25) {
                    i4 = t3[8] | 0;
                    t3[i4 + 16 >> 2] = e4;
                    t3[i4 + 12 >> 2] = (t3[18] | 0) + 2;
                    break;
                  }
                }
                t3[18] = r4 + -2;
              }
            } while (0);
            return;
          }
          function o4(e4) {
            e4 = e4 | 0;
            e:
              do {
                switch (s3[e4 >> 1] | 0) {
                  case 100:
                    switch (s3[e4 + -2 >> 1] | 0) {
                      case 105: {
                        e4 = q(e4 + -4 | 0, 118, 111) | 0;
                        break e;
                      }
                      case 108: {
                        e4 = P(e4 + -4 | 0, 121, 105, 101) | 0;
                        break e;
                      }
                      default: {
                        e4 = 0;
                        break e;
                      }
                    }
                  case 101: {
                    switch (s3[e4 + -2 >> 1] | 0) {
                      case 115:
                        break;
                      case 116: {
                        e4 = E(e4 + -4 | 0, 100, 101, 108, 101) | 0;
                        break e;
                      }
                      default: {
                        e4 = 0;
                        break e;
                      }
                    }
                    switch (s3[e4 + -4 >> 1] | 0) {
                      case 108: {
                        e4 = D(e4 + -6 | 0, 101) | 0;
                        break e;
                      }
                      case 97: {
                        e4 = D(e4 + -6 | 0, 99) | 0;
                        break e;
                      }
                      default: {
                        e4 = 0;
                        break e;
                      }
                    }
                  }
                  case 102: {
                    if ((s3[e4 + -2 >> 1] | 0) == 111 ? (s3[e4 + -4 >> 1] | 0) == 101 : 0)
                      switch (s3[e4 + -6 >> 1] | 0) {
                        case 99: {
                          e4 = O(e4 + -8 | 0, 105, 110, 115, 116, 97, 110) | 0;
                          break e;
                        }
                        case 112: {
                          e4 = q(e4 + -8 | 0, 116, 121) | 0;
                          break e;
                        }
                        default: {
                          e4 = 0;
                          break e;
                        }
                      }
                    else
                      e4 = 0;
                    break;
                  }
                  case 110: {
                    e4 = e4 + -2 | 0;
                    if (D(e4, 105) | 0)
                      e4 = 1;
                    else
                      e4 = $(e4, 114, 101, 116, 117, 114) | 0;
                    break;
                  }
                  case 111: {
                    e4 = D(e4 + -2 | 0, 100) | 0;
                    break;
                  }
                  case 114: {
                    e4 = m(e4 + -2 | 0, 100, 101, 98, 117, 103, 103, 101) | 0;
                    break;
                  }
                  case 116: {
                    e4 = E(e4 + -2 | 0, 97, 119, 97, 105) | 0;
                    break;
                  }
                  case 119:
                    switch (s3[e4 + -2 >> 1] | 0) {
                      case 101: {
                        e4 = D(e4 + -4 | 0, 110) | 0;
                        break e;
                      }
                      case 111: {
                        e4 = P(e4 + -4 | 0, 116, 104, 114) | 0;
                        break e;
                      }
                      default: {
                        e4 = 0;
                        break e;
                      }
                    }
                  default:
                    e4 = 0;
                }
              } while (0);
            return e4 | 0;
          }
          function h2() {
            var e4 = 0, r4 = 0, a4 = 0;
            r4 = t3[19] | 0;
            a4 = t3[18] | 0;
            e:
              while (1) {
                e4 = a4 + 2 | 0;
                if (a4 >>> 0 >= r4 >>> 0) {
                  r4 = 8;
                  break;
                }
                switch (s3[e4 >> 1] | 0) {
                  case 96: {
                    r4 = 9;
                    break e;
                  }
                  case 36: {
                    if ((s3[a4 + 4 >> 1] | 0) == 123) {
                      r4 = 6;
                      break e;
                    }
                    break;
                  }
                  case 92: {
                    e4 = a4 + 4 | 0;
                    break;
                  }
                  default: {
                  }
                }
                a4 = e4;
              }
            if ((r4 | 0) == 6) {
              t3[18] = a4 + 4;
              e4 = s3[293] | 0;
              r4 = t3[16] | 0;
              a4 = s3[291] | 0;
              s3[291] = a4 + 1 << 16 >> 16;
              s3[r4 + ((a4 & 65535) << 1) >> 1] = e4;
              a4 = (s3[292] | 0) + 1 << 16 >> 16;
              s3[292] = a4;
              s3[293] = a4;
            } else if ((r4 | 0) == 8) {
              t3[18] = e4;
              Y();
            } else if ((r4 | 0) == 9)
              t3[18] = e4;
            return;
          }
          function w2(e4) {
            e4 = e4 | 0;
            var r4 = 0, a4 = 0, i4 = 0;
            a4 = t3[18] | 0;
            e:
              do {
                r4 = s3[a4 >> 1] | 0;
                r:
                  do {
                    if (r4 << 16 >> 16 != 47)
                      if (e4)
                        if (Z(r4) | 0)
                          break;
                        else
                          break e;
                      else if (Q(r4) | 0)
                        break;
                      else
                        break e;
                    else
                      switch (s3[a4 + 2 >> 1] | 0) {
                        case 47: {
                          G();
                          break r;
                        }
                        case 42: {
                          p2(e4);
                          break r;
                        }
                        default: {
                          r4 = 47;
                          break e;
                        }
                      }
                  } while (0);
                i4 = t3[18] | 0;
                a4 = i4 + 2 | 0;
                t3[18] = a4;
              } while (i4 >>> 0 < (t3[19] | 0) >>> 0);
            return r4 | 0;
          }
          function d2(e4) {
            e4 = e4 | 0;
            var r4 = 0, a4 = 0, i4 = 0, f4 = 0;
            f4 = t3[19] | 0;
            r4 = t3[18] | 0;
            while (1) {
              i4 = r4 + 2 | 0;
              if (r4 >>> 0 >= f4 >>> 0) {
                r4 = 9;
                break;
              }
              a4 = s3[i4 >> 1] | 0;
              if (a4 << 16 >> 16 == e4 << 16 >> 16) {
                r4 = 10;
                break;
              }
              if (a4 << 16 >> 16 == 92) {
                a4 = r4 + 4 | 0;
                if ((s3[a4 >> 1] | 0) == 13) {
                  r4 = r4 + 6 | 0;
                  r4 = (s3[r4 >> 1] | 0) == 10 ? r4 : a4;
                } else
                  r4 = a4;
              } else if (ae(a4) | 0) {
                r4 = 9;
                break;
              } else
                r4 = i4;
            }
            if ((r4 | 0) == 9) {
              t3[18] = i4;
              Y();
            } else if ((r4 | 0) == 10)
              t3[18] = i4;
            return;
          }
          function v2(e4, r4, a4, s4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            s4 = s4 | 0;
            var f4 = 0, c4 = 0;
            f4 = t3[13] | 0;
            t3[13] = f4 + 32;
            c4 = t3[8] | 0;
            t3[((c4 | 0) == 0 ? 16 : c4 + 28 | 0) >> 2] = f4;
            t3[9] = c4;
            t3[8] = f4;
            t3[f4 + 8 >> 2] = e4;
            do {
              if ((s4 | 0) != 2)
                if ((s4 | 0) == 1) {
                  t3[f4 + 12 >> 2] = a4 + 2;
                  break;
                } else {
                  t3[f4 + 12 >> 2] = t3[3];
                  break;
                }
              else
                t3[f4 + 12 >> 2] = a4;
            } while (0);
            t3[f4 >> 2] = r4;
            t3[f4 + 4 >> 2] = a4;
            t3[f4 + 16 >> 2] = 0;
            t3[f4 + 20 >> 2] = s4;
            i3[f4 + 24 >> 0] = (s4 | 0) == 1 & 1;
            t3[f4 + 28 >> 2] = 0;
            return;
          }
          function A() {
            var e4 = 0, r4 = 0, a4 = 0;
            a4 = t3[19] | 0;
            r4 = t3[18] | 0;
            e:
              while (1) {
                e4 = r4 + 2 | 0;
                if (r4 >>> 0 >= a4 >>> 0) {
                  r4 = 6;
                  break;
                }
                switch (s3[e4 >> 1] | 0) {
                  case 13:
                  case 10: {
                    r4 = 6;
                    break e;
                  }
                  case 93: {
                    r4 = 7;
                    break e;
                  }
                  case 92: {
                    e4 = r4 + 4 | 0;
                    break;
                  }
                  default: {
                  }
                }
                r4 = e4;
              }
            if ((r4 | 0) == 6) {
              t3[18] = e4;
              Y();
              e4 = 0;
            } else if ((r4 | 0) == 7) {
              t3[18] = e4;
              e4 = 93;
            }
            return e4 | 0;
          }
          function C(e4, r4, a4, i4, t4, f4, c4, n4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            t4 = t4 | 0;
            f4 = f4 | 0;
            c4 = c4 | 0;
            n4 = n4 | 0;
            if ((((((s3[e4 + 12 >> 1] | 0) == n4 << 16 >> 16 ? (s3[e4 + 10 >> 1] | 0) == c4 << 16 >> 16 : 0) ? (s3[e4 + 8 >> 1] | 0) == f4 << 16 >> 16 : 0) ? (s3[e4 + 6 >> 1] | 0) == t4 << 16 >> 16 : 0) ? (s3[e4 + 4 >> 1] | 0) == i4 << 16 >> 16 : 0) ? (s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16 : 0)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function y(e4) {
            e4 = e4 | 0;
            switch (s3[e4 >> 1] | 0) {
              case 62: {
                e4 = (s3[e4 + -2 >> 1] | 0) == 61;
                break;
              }
              case 41:
              case 59: {
                e4 = 1;
                break;
              }
              case 104: {
                e4 = E(e4 + -2 | 0, 99, 97, 116, 99) | 0;
                break;
              }
              case 121: {
                e4 = O(e4 + -2 | 0, 102, 105, 110, 97, 108, 108) | 0;
                break;
              }
              case 101: {
                e4 = P(e4 + -2 | 0, 101, 108, 115) | 0;
                break;
              }
              default:
                e4 = 0;
            }
            return e4 | 0;
          }
          function g(e4, r4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0, i4 = 0;
            a4 = t3[18] | 0;
            i4 = s3[a4 >> 1] | 0;
            if (i4 << 16 >> 16 == 97) {
              t3[18] = a4 + 4;
              a4 = w2(1) | 0;
              e4 = t3[18] | 0;
              if (_2(a4) | 0) {
                d2(a4);
                r4 = (t3[18] | 0) + 2 | 0;
                t3[18] = r4;
              } else {
                H(a4) | 0;
                r4 = t3[18] | 0;
              }
              i4 = w2(1) | 0;
              a4 = t3[18] | 0;
            }
            if ((a4 | 0) != (e4 | 0))
              J(e4, r4);
            return i4 | 0;
          }
          function I() {
            var e4 = 0, r4 = 0, a4 = 0;
            e:
              while (1) {
                e4 = t3[18] | 0;
                r4 = e4 + 2 | 0;
                t3[18] = r4;
                if (e4 >>> 0 >= (t3[19] | 0) >>> 0) {
                  a4 = 7;
                  break;
                }
                switch (s3[r4 >> 1] | 0) {
                  case 13:
                  case 10: {
                    a4 = 7;
                    break e;
                  }
                  case 47:
                    break e;
                  case 91: {
                    A() | 0;
                    break;
                  }
                  case 92: {
                    t3[18] = e4 + 4;
                    break;
                  }
                  default: {
                  }
                }
              }
            if ((a4 | 0) == 7)
              Y();
            return;
          }
          function p2(e4) {
            e4 = e4 | 0;
            var r4 = 0, a4 = 0, i4 = 0, f4 = 0, c4 = 0;
            f4 = (t3[18] | 0) + 2 | 0;
            t3[18] = f4;
            a4 = t3[19] | 0;
            while (1) {
              r4 = f4 + 2 | 0;
              if (f4 >>> 0 >= a4 >>> 0)
                break;
              i4 = s3[r4 >> 1] | 0;
              if (!e4 ? ae(i4) | 0 : 0)
                break;
              if (i4 << 16 >> 16 == 42 ? (s3[f4 + 4 >> 1] | 0) == 47 : 0) {
                c4 = 8;
                break;
              }
              f4 = r4;
            }
            if ((c4 | 0) == 8) {
              t3[18] = r4;
              r4 = f4 + 4 | 0;
            }
            t3[18] = r4;
            return;
          }
          function U(e4, r4, a4, i4, t4, f4, c4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            t4 = t4 | 0;
            f4 = f4 | 0;
            c4 = c4 | 0;
            if (((((s3[e4 + 10 >> 1] | 0) == c4 << 16 >> 16 ? (s3[e4 + 8 >> 1] | 0) == f4 << 16 >> 16 : 0) ? (s3[e4 + 6 >> 1] | 0) == t4 << 16 >> 16 : 0) ? (s3[e4 + 4 >> 1] | 0) == i4 << 16 >> 16 : 0) ? (s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16 : 0)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function m(e4, r4, a4, i4, f4, c4, n4, b3) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            f4 = f4 | 0;
            c4 = c4 | 0;
            n4 = n4 | 0;
            b3 = b3 | 0;
            var u4 = 0, k4 = 0;
            k4 = e4 + -12 | 0;
            u4 = t3[3] | 0;
            if (k4 >>> 0 >= u4 >>> 0 ? C(k4, r4, a4, i4, f4, c4, n4, b3) | 0 : 0)
              if ((k4 | 0) == (u4 | 0))
                u4 = 1;
              else
                u4 = F(s3[e4 + -14 >> 1] | 0) | 0;
            else
              u4 = 0;
            return u4 | 0;
          }
          function S(e4) {
            e4 = e4 | 0;
            e:
              do {
                switch (e4 << 16 >> 16) {
                  case 38:
                  case 37:
                  case 33: {
                    e4 = 1;
                    break;
                  }
                  default:
                    if ((e4 & -8) << 16 >> 16 == 40 | (e4 + -58 & 65535) < 6)
                      e4 = 1;
                    else {
                      switch (e4 << 16 >> 16) {
                        case 91:
                        case 93:
                        case 94: {
                          e4 = 1;
                          break e;
                        }
                        default: {
                        }
                      }
                      e4 = (e4 + -123 & 65535) < 4;
                    }
                }
              } while (0);
            return e4 | 0;
          }
          function x(e4) {
            e4 = e4 | 0;
            e:
              do {
                switch (e4 << 16 >> 16) {
                  case 38:
                  case 37:
                  case 33:
                    break;
                  default:
                    if (!((e4 + -58 & 65535) < 6 | (e4 + -40 & 65535) < 7 & e4 << 16 >> 16 != 41)) {
                      switch (e4 << 16 >> 16) {
                        case 91:
                        case 94:
                          break e;
                        default: {
                        }
                      }
                      return e4 << 16 >> 16 != 125 & (e4 + -123 & 65535) < 4 | 0;
                    }
                }
              } while (0);
            return 1;
          }
          function O(e4, r4, a4, i4, f4, c4, n4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            f4 = f4 | 0;
            c4 = c4 | 0;
            n4 = n4 | 0;
            var b3 = 0, u4 = 0;
            u4 = e4 + -10 | 0;
            b3 = t3[3] | 0;
            if (u4 >>> 0 >= b3 >>> 0 ? U(u4, r4, a4, i4, f4, c4, n4) | 0 : 0)
              if ((u4 | 0) == (b3 | 0))
                b3 = 1;
              else
                b3 = F(s3[e4 + -12 >> 1] | 0) | 0;
            else
              b3 = 0;
            return b3 | 0;
          }
          function $(e4, r4, a4, i4, f4, c4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            f4 = f4 | 0;
            c4 = c4 | 0;
            var n4 = 0, b3 = 0;
            b3 = e4 + -8 | 0;
            n4 = t3[3] | 0;
            if (b3 >>> 0 >= n4 >>> 0 ? B(b3, r4, a4, i4, f4, c4) | 0 : 0)
              if ((b3 | 0) == (n4 | 0))
                n4 = 1;
              else
                n4 = F(s3[e4 + -10 >> 1] | 0) | 0;
            else
              n4 = 0;
            return n4 | 0;
          }
          function j(e4) {
            e4 = e4 | 0;
            var r4 = 0, a4 = 0, i4 = 0, f4 = 0;
            a4 = n3;
            n3 = n3 + 16 | 0;
            i4 = a4;
            t3[i4 >> 2] = 0;
            t3[12] = e4;
            r4 = t3[3] | 0;
            f4 = r4 + (e4 << 1) | 0;
            e4 = f4 + 2 | 0;
            s3[f4 >> 1] = 0;
            t3[i4 >> 2] = e4;
            t3[13] = e4;
            t3[4] = 0;
            t3[8] = 0;
            t3[6] = 0;
            t3[5] = 0;
            t3[10] = 0;
            t3[7] = 0;
            n3 = a4;
            return r4 | 0;
          }
          function B(e4, r4, a4, i4, t4, f4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            t4 = t4 | 0;
            f4 = f4 | 0;
            if ((((s3[e4 + 8 >> 1] | 0) == f4 << 16 >> 16 ? (s3[e4 + 6 >> 1] | 0) == t4 << 16 >> 16 : 0) ? (s3[e4 + 4 >> 1] | 0) == i4 << 16 >> 16 : 0) ? (s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16 : 0)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function E(e4, r4, a4, i4, f4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            f4 = f4 | 0;
            var c4 = 0, n4 = 0;
            n4 = e4 + -6 | 0;
            c4 = t3[3] | 0;
            if (n4 >>> 0 >= c4 >>> 0 ? z(n4, r4, a4, i4, f4) | 0 : 0)
              if ((n4 | 0) == (c4 | 0))
                c4 = 1;
              else
                c4 = F(s3[e4 + -8 >> 1] | 0) | 0;
            else
              c4 = 0;
            return c4 | 0;
          }
          function P(e4, r4, a4, i4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            var f4 = 0, c4 = 0;
            c4 = e4 + -4 | 0;
            f4 = t3[3] | 0;
            if (c4 >>> 0 >= f4 >>> 0 ? K(c4, r4, a4, i4) | 0 : 0)
              if ((c4 | 0) == (f4 | 0))
                f4 = 1;
              else
                f4 = F(s3[e4 + -6 >> 1] | 0) | 0;
            else
              f4 = 0;
            return f4 | 0;
          }
          function q(e4, r4, a4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            var i4 = 0, f4 = 0;
            f4 = e4 + -2 | 0;
            i4 = t3[3] | 0;
            if (f4 >>> 0 >= i4 >>> 0 ? N(f4, r4, a4) | 0 : 0)
              if ((f4 | 0) == (i4 | 0))
                i4 = 1;
              else
                i4 = F(s3[e4 + -4 >> 1] | 0) | 0;
            else
              i4 = 0;
            return i4 | 0;
          }
          function z(e4, r4, a4, i4, t4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            t4 = t4 | 0;
            if (((s3[e4 + 6 >> 1] | 0) == t4 << 16 >> 16 ? (s3[e4 + 4 >> 1] | 0) == i4 << 16 >> 16 : 0) ? (s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16 : 0)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function D(e4, r4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0;
            a4 = t3[3] | 0;
            if (a4 >>> 0 <= e4 >>> 0 ? (s3[e4 >> 1] | 0) == r4 << 16 >> 16 : 0)
              if ((a4 | 0) == (e4 | 0))
                a4 = 1;
              else
                a4 = F(s3[e4 + -2 >> 1] | 0) | 0;
            else
              a4 = 0;
            return a4 | 0;
          }
          function F(e4) {
            e4 = e4 | 0;
            e:
              do {
                if ((e4 + -9 & 65535) < 5)
                  e4 = 1;
                else {
                  switch (e4 << 16 >> 16) {
                    case 32:
                    case 160: {
                      e4 = 1;
                      break e;
                    }
                    default: {
                    }
                  }
                  e4 = e4 << 16 >> 16 != 46 & (S(e4) | 0);
                }
              } while (0);
            return e4 | 0;
          }
          function G() {
            var e4 = 0, r4 = 0, a4 = 0;
            e4 = t3[19] | 0;
            a4 = t3[18] | 0;
            e:
              while (1) {
                r4 = a4 + 2 | 0;
                if (a4 >>> 0 >= e4 >>> 0)
                  break;
                switch (s3[r4 >> 1] | 0) {
                  case 13:
                  case 10:
                    break e;
                  default:
                    a4 = r4;
                }
              }
            t3[18] = r4;
            return;
          }
          function H(e4) {
            e4 = e4 | 0;
            while (1) {
              if (Z(e4) | 0)
                break;
              if (S(e4) | 0)
                break;
              e4 = (t3[18] | 0) + 2 | 0;
              t3[18] = e4;
              e4 = s3[e4 >> 1] | 0;
              if (!(e4 << 16 >> 16)) {
                e4 = 0;
                break;
              }
            }
            return e4 | 0;
          }
          function J(e4, r4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0, i4 = 0;
            a4 = t3[13] | 0;
            t3[13] = a4 + 12;
            i4 = t3[10] | 0;
            t3[((i4 | 0) == 0 ? 20 : i4 + 8 | 0) >> 2] = a4;
            t3[10] = a4;
            t3[a4 >> 2] = e4;
            t3[a4 + 4 >> 2] = r4;
            t3[a4 + 8 >> 2] = 0;
            return;
          }
          function K(e4, r4, a4, i4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            i4 = i4 | 0;
            if ((s3[e4 + 4 >> 1] | 0) == i4 << 16 >> 16 ? (s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16 : 0)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function L(e4) {
            e4 = e4 | 0;
            if (!($(e4, 119, 104, 105, 108, 101) | 0) ? !(P(e4, 102, 111, 114) | 0) : 0)
              e4 = q(e4, 105, 102) | 0;
            else
              e4 = 1;
            return e4 | 0;
          }
          function M() {
            var e4 = 0;
            e4 = t3[(t3[6] | 0) + 20 >> 2] | 0;
            switch (e4 | 0) {
              case 1: {
                e4 = -1;
                break;
              }
              case 2: {
                e4 = -2;
                break;
              }
              default:
                e4 = e4 - (t3[3] | 0) >> 1;
            }
            return e4 | 0;
          }
          function N(e4, r4, a4) {
            e4 = e4 | 0;
            r4 = r4 | 0;
            a4 = a4 | 0;
            if ((s3[e4 + 2 >> 1] | 0) == a4 << 16 >> 16)
              r4 = (s3[e4 >> 1] | 0) == r4 << 16 >> 16;
            else
              r4 = 0;
            return r4 | 0;
          }
          function Q(e4) {
            e4 = e4 | 0;
            switch (e4 << 16 >> 16) {
              case 160:
              case 32:
              case 12:
              case 11:
              case 9: {
                e4 = 1;
                break;
              }
              default:
                e4 = 0;
            }
            return e4 | 0;
          }
          function R(e4) {
            e4 = e4 | 0;
            if ((t3[3] | 0) == (e4 | 0))
              e4 = 1;
            else
              e4 = F(s3[e4 + -2 >> 1] | 0) | 0;
            return e4 | 0;
          }
          function T() {
            var e4 = 0;
            e4 = t3[(t3[6] | 0) + 16 >> 2] | 0;
            if (!e4)
              e4 = -1;
            else
              e4 = e4 - (t3[3] | 0) >> 1;
            return e4 | 0;
          }
          function V() {
            var e4 = 0;
            e4 = t3[6] | 0;
            e4 = t3[((e4 | 0) == 0 ? 16 : e4 + 28 | 0) >> 2] | 0;
            t3[6] = e4;
            return (e4 | 0) != 0 | 0;
          }
          function W() {
            var e4 = 0;
            e4 = t3[7] | 0;
            e4 = t3[((e4 | 0) == 0 ? 20 : e4 + 8 | 0) >> 2] | 0;
            t3[7] = e4;
            return (e4 | 0) != 0 | 0;
          }
          function X(e4) {
            e4 = e4 | 0;
            var r4 = 0;
            r4 = n3;
            n3 = n3 + e4 | 0;
            n3 = n3 + 15 & -16;
            return r4 | 0;
          }
          function Y() {
            i3[588] = 1;
            t3[14] = (t3[18] | 0) - (t3[3] | 0) >> 1;
            t3[18] = (t3[19] | 0) + 2;
            return;
          }
          function Z(e4) {
            e4 = e4 | 0;
            return (e4 | 128) << 16 >> 16 == 160 | (e4 + -9 & 65535) < 5 | 0;
          }
          function _2(e4) {
            e4 = e4 | 0;
            return e4 << 16 >> 16 == 39 | e4 << 16 >> 16 == 34 | 0;
          }
          function ee() {
            return (t3[(t3[6] | 0) + 12 >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function re() {
            return (t3[(t3[6] | 0) + 8 >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function ae(e4) {
            e4 = e4 | 0;
            return e4 << 16 >> 16 == 13 | e4 << 16 >> 16 == 10 | 0;
          }
          function ie() {
            return (t3[(t3[6] | 0) + 4 >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function se() {
            return (t3[(t3[7] | 0) + 4 >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function te() {
            return (t3[t3[6] >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function fe() {
            return (t3[t3[7] >> 2] | 0) - (t3[3] | 0) >> 1 | 0;
          }
          function ce() {
            return f3[(t3[6] | 0) + 24 >> 0] | 0 | 0;
          }
          function ne(e4) {
            e4 = e4 | 0;
            t3[3] = e4;
            return;
          }
          function be() {
            return (i3[589] | 0) != 0 | 0;
          }
          function ue() {
            return t3[14] | 0;
          }
          return { ai: T, e: ue, ee: se, es: fe, f: be, id: M, ie, ip: ce, is: te, p: b2, re: W, ri: V, sa: j, se: ee, ses: ne, ss: re, sta: X };
        }({ Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array }, {}, r2), a2 = e2.sta(2 * i2);
      }
      const o3 = t2.length + 1;
      e2.ses(a2), e2.sa(o3 - 1), (s2 ? b : n2)(t2, new Uint16Array(r2, a2, o3)), e2.p() || (c$1 = e2.e(), h());
      const w = [], d = [];
      for (; e2.ri(); ) {
        const r3 = e2.is(), a3 = e2.ie(), i3 = e2.ai(), s3 = e2.id(), f3 = e2.ss(), c3 = e2.se();
        let n3;
        e2.ip() && (n3 = u2(s3 === -1 ? r3 : r3 + 1, t2.charCodeAt(s3 === -1 ? r3 - 1 : r3))), w.push({ n: n3, s: r3, e: a3, ss: f3, se: c3, d: s3, a: i3 });
      }
      for (; e2.re(); ) {
        const r3 = e2.es(), a3 = t2.charCodeAt(r3);
        d.push(a3 === 34 || a3 === 39 ? u2(r3 + 1, a3) : t2.slice(e2.es(), e2.ee()));
      }
      return [w, d, !!e2.f()];
    }
    function n2(e3, r3) {
      const a3 = e3.length;
      let i3 = 0;
      for (; i3 < a3; ) {
        const a4 = e3.charCodeAt(i3);
        r3[i3++] = (255 & a4) << 8 | a4 >>> 8;
      }
    }
    function b(e3, r3) {
      const a3 = e3.length;
      let i3 = 0;
      for (; i3 < a3; )
        r3[i3] = e3.charCodeAt(i3++);
    }
    function u2(e3, r3) {
      c$1 = e3;
      let a3 = "", i3 = c$1;
      for (; ; ) {
        c$1 >= t2.length && h();
        const e4 = t2.charCodeAt(c$1);
        if (e4 === r3)
          break;
        e4 === 92 ? (a3 += t2.slice(i3, c$1), a3 += k(), i3 = c$1) : (e4 === 8232 || e4 === 8233 || o2(e4) && h(), ++c$1);
      }
      return a3 += t2.slice(i3, c$1++), a3;
    }
    function k() {
      let e3 = t2.charCodeAt(++c$1);
      switch (++c$1, e3) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(l(2));
        case 117:
          return function() {
            let e4;
            t2.charCodeAt(c$1) === 123 ? (++c$1, e4 = l(t2.indexOf("}", c$1) - c$1), ++c$1, e4 > 1114111 && h()) : e4 = l(4);
            return e4 <= 65535 ? String.fromCharCode(e4) : (e4 -= 65536, String.fromCharCode(55296 + (e4 >> 10), 56320 + (1023 & e4)));
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
          t2.charCodeAt(c$1) === 10 && ++c$1;
        case 10:
          return "";
        case 56:
        case 57:
          h();
        default:
          if (e3 >= 48 && e3 <= 55) {
            let r3 = t2.substr(c$1 - 1, 3).match(/^[0-7]+/)[0], a3 = parseInt(r3, 8);
            return a3 > 255 && (r3 = r3.slice(0, -1), a3 = parseInt(r3, 8)), c$1 += r3.length - 1, e3 = t2.charCodeAt(c$1), r3 === "0" && e3 !== 56 && e3 !== 57 || h(), String.fromCharCode(a3);
          }
          return o2(e3) ? "" : String.fromCharCode(e3);
      }
    }
    function l(e3) {
      const r3 = c$1;
      let a3 = 0, i3 = 0;
      for (let r4 = 0; r4 < e3; ++r4, ++c$1) {
        let e4, s3 = t2.charCodeAt(c$1);
        if (s3 !== 95) {
          if (s3 >= 97)
            e4 = s3 - 97 + 10;
          else if (s3 >= 65)
            e4 = s3 - 65 + 10;
          else {
            if (!(s3 >= 48 && s3 <= 57))
              break;
            e4 = s3 - 48;
          }
          if (e4 >= 16)
            break;
          i3 = s3, a3 = 16 * a3 + e4;
        } else
          i3 !== 95 && r4 !== 0 || h(), i3 = s3;
      }
      return i3 !== 95 && c$1 - r3 === e3 || h(), a3;
    }
    function o2(e3) {
      return e3 === 13 || e3 === 10;
    }
    function h() {
      throw Object.assign(new Error(`Parse error ${f2}:${t2.slice(0, c$1).split("\n").length}:${c$1 - t2.lastIndexOf("\n", c$1 - 1)}`), { idx: c$1 });
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
      const [imports2] = load.a;
      const source = load.S;
      let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
      if (!imports2.length) {
        resolvedSource += source;
      } else {
        let lastIndex = 0, depIndex = 0;
        for (const { s: start, e: end, se: statementEnd, d: dynamicImportIndex } of imports2) {
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
    let c2 = 0;
    function pushFetchPool() {
      if (++c2 > 100)
        return new Promise((r3) => p.push(r3));
    }
    function popFetchPool() {
      c2--;
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
        let i3 = 0;
        while (registry[load.u + ++i3])
          ;
        load.u += i3;
      }
      registry[load.u] = load;
      load.f = (async () => {
        if (!source) {
          let t3;
          ({ r: load.r, s: source, t: t3 } = await (fetchCache[url] || doFetch(url, fetchOpts)));
          if (t3 && !shimMode) {
            if (t3 === "css" && !cssModulesEnabled || t3 === "json" && !jsonModulesEnabled)
              throw Error(`${t3}-modules require <script type="esms-options">{ "polyfillEnable": ["${t3}-modules"] }<${""}/script>`);
            if (t3 === "css" && !supportsCssAssertions || t3 === "json" && !supportsJsonAssertions)
              load.n = true;
          }
        }
        try {
          load.a = parse(source, load.u);
        } catch (e3) {
          console.warn(e3);
          load.a = [[], []];
        }
        load.S = source;
        return load;
      })();
      load.L = load.f.then(async () => {
        let childFetchOpts = fetchOpts;
        load.d = (await Promise.all(load.a[0].map(async ({ n: n3, d }) => {
          if (d >= 0 && !supportsDynamicImport || d === 2 && !supportsImportMeta)
            load.n = true;
          if (!n3)
            return;
          const { r: r3, b: b2 } = await resolve(n3, load.r || load.u);
          if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
            load.n = true;
          if (d !== -1)
            return;
          if (!r3)
            throwUnresolved(n3, load.r || load.u);
          if (skip && skip.test(r3))
            return { b: r3 };
          if (childFetchOpts.integrity)
            childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
          return getOrCreateLoad(r3, childFetchOpts).f;
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
      const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, blocks && lastStaticLoadPromise).catch((e3) => {
        if (safari)
          console.error(e3);
        else
          setTimeout(() => {
            throw e3;
          });
        onerror(e3);
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

  // ../../node_modules/workbox-window/build/workbox-window.prod.es5.mjs
  try {
    self["workbox:window:6.4.1"] && _();
  } catch (n2) {
  }
  function n(n2, t2) {
    return new Promise(function(r2) {
      var e2 = new MessageChannel();
      e2.port1.onmessage = function(n3) {
        r2(n3.data);
      }, n2.postMessage(t2, [e2.port2]);
    });
  }
  function t(n2, t2) {
    for (var r2 = 0; r2 < t2.length; r2++) {
      var e2 = t2[r2];
      e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(n2, e2.key, e2);
    }
  }
  function r(n2, t2) {
    (t2 == null || t2 > n2.length) && (t2 = n2.length);
    for (var r2 = 0, e2 = new Array(t2); r2 < t2; r2++)
      e2[r2] = n2[r2];
    return e2;
  }
  function e(n2, t2) {
    var e2;
    if (typeof Symbol == "undefined" || n2[Symbol.iterator] == null) {
      if (Array.isArray(n2) || (e2 = function(n3, t3) {
        if (n3) {
          if (typeof n3 == "string")
            return r(n3, t3);
          var e3 = Object.prototype.toString.call(n3).slice(8, -1);
          return e3 === "Object" && n3.constructor && (e3 = n3.constructor.name), e3 === "Map" || e3 === "Set" ? Array.from(n3) : e3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3) ? r(n3, t3) : void 0;
        }
      }(n2)) || t2 && n2 && typeof n2.length == "number") {
        e2 && (n2 = e2);
        var i2 = 0;
        return function() {
          return i2 >= n2.length ? { done: true } : { done: false, value: n2[i2++] };
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    return (e2 = n2[Symbol.iterator]()).next.bind(e2);
  }
  try {
    self["workbox:core:6.4.1"] && _();
  } catch (n2) {
  }
  var i = function() {
    var n2 = this;
    this.promise = new Promise(function(t2, r2) {
      n2.resolve = t2, n2.reject = r2;
    });
  };
  function o(n2, t2) {
    var r2 = location.href;
    return new URL(n2, r2).href === new URL(t2, r2).href;
  }
  var u = function(n2, t2) {
    this.type = n2, Object.assign(this, t2);
  };
  function a(n2, t2, r2) {
    return r2 ? t2 ? t2(n2) : n2 : (n2 && n2.then || (n2 = Promise.resolve(n2)), t2 ? n2.then(t2) : n2);
  }
  function c() {
  }
  var f = { type: "SKIP_WAITING" };
  function s(n2, t2) {
    if (!t2)
      return n2 && n2.then ? n2.then(c) : Promise.resolve();
  }
  var v = function(r2) {
    var e2, c2;
    function v2(n2, t2) {
      var e3, c3;
      return t2 === void 0 && (t2 = {}), (e3 = r2.call(this) || this).nn = {}, e3.tn = 0, e3.rn = new i(), e3.en = new i(), e3.on = new i(), e3.un = 0, e3.an = /* @__PURE__ */ new Set(), e3.cn = function() {
        var n3 = e3.fn, t3 = n3.installing;
        e3.tn > 0 || !o(t3.scriptURL, e3.sn.toString()) || performance.now() > e3.un + 6e4 ? (e3.vn = t3, n3.removeEventListener("updatefound", e3.cn)) : (e3.hn = t3, e3.an.add(t3), e3.rn.resolve(t3)), ++e3.tn, t3.addEventListener("statechange", e3.ln);
      }, e3.ln = function(n3) {
        var t3 = e3.fn, r3 = n3.target, i2 = r3.state, o2 = r3 === e3.vn, a2 = { sw: r3, isExternal: o2, originalEvent: n3 };
        !o2 && e3.mn && (a2.isUpdate = true), e3.dispatchEvent(new u(i2, a2)), i2 === "installed" ? e3.wn = self.setTimeout(function() {
          i2 === "installed" && t3.waiting === r3 && e3.dispatchEvent(new u("waiting", a2));
        }, 200) : i2 === "activating" && (clearTimeout(e3.wn), o2 || e3.en.resolve(r3));
      }, e3.dn = function(n3) {
        var t3 = e3.hn, r3 = t3 !== navigator.serviceWorker.controller;
        e3.dispatchEvent(new u("controlling", { isExternal: r3, originalEvent: n3, sw: t3, isUpdate: e3.mn })), r3 || e3.on.resolve(t3);
      }, e3.gn = (c3 = function(n3) {
        var t3 = n3.data, r3 = n3.ports, i2 = n3.source;
        return a(e3.getSW(), function() {
          e3.an.has(i2) && e3.dispatchEvent(new u("message", { data: t3, originalEvent: n3, ports: r3, sw: i2 }));
        });
      }, function() {
        for (var n3 = [], t3 = 0; t3 < arguments.length; t3++)
          n3[t3] = arguments[t3];
        try {
          return Promise.resolve(c3.apply(this, n3));
        } catch (n4) {
          return Promise.reject(n4);
        }
      }), e3.sn = n2, e3.nn = t2, navigator.serviceWorker.addEventListener("message", e3.gn), e3;
    }
    c2 = r2, (e2 = v2).prototype = Object.create(c2.prototype), e2.prototype.constructor = e2, e2.__proto__ = c2;
    var h, l, m, w = v2.prototype;
    return w.register = function(n2) {
      var t2 = (n2 === void 0 ? {} : n2).immediate, r3 = t2 !== void 0 && t2;
      try {
        var e3 = this;
        return function(n3, t3) {
          var r4 = n3();
          if (r4 && r4.then)
            return r4.then(t3);
          return t3(r4);
        }(function() {
          if (!r3 && document.readyState !== "complete")
            return s(new Promise(function(n3) {
              return window.addEventListener("load", n3);
            }));
        }, function() {
          return e3.mn = Boolean(navigator.serviceWorker.controller), e3.yn = e3.pn(), a(e3.bn(), function(n3) {
            e3.fn = n3, e3.yn && (e3.hn = e3.yn, e3.en.resolve(e3.yn), e3.on.resolve(e3.yn), e3.yn.addEventListener("statechange", e3.ln, { once: true }));
            var t3 = e3.fn.waiting;
            return t3 && o(t3.scriptURL, e3.sn.toString()) && (e3.hn = t3, Promise.resolve().then(function() {
              e3.dispatchEvent(new u("waiting", { sw: t3, wasWaitingBeforeRegister: true }));
            }).then(function() {
            })), e3.hn && (e3.rn.resolve(e3.hn), e3.an.add(e3.hn)), e3.fn.addEventListener("updatefound", e3.cn), navigator.serviceWorker.addEventListener("controllerchange", e3.dn), e3.fn;
          });
        });
      } catch (n3) {
        return Promise.reject(n3);
      }
    }, w.update = function() {
      try {
        return this.fn ? s(this.fn.update()) : void 0;
      } catch (n2) {
        return Promise.reject(n2);
      }
    }, w.getSW = function() {
      return this.hn !== void 0 ? Promise.resolve(this.hn) : this.rn.promise;
    }, w.messageSW = function(t2) {
      try {
        return a(this.getSW(), function(r3) {
          return n(r3, t2);
        });
      } catch (n2) {
        return Promise.reject(n2);
      }
    }, w.messageSkipWaiting = function() {
      this.fn && this.fn.waiting && n(this.fn.waiting, f);
    }, w.pn = function() {
      var n2 = navigator.serviceWorker.controller;
      return n2 && o(n2.scriptURL, this.sn.toString()) ? n2 : void 0;
    }, w.bn = function() {
      try {
        var n2 = this;
        return function(n3, t2) {
          try {
            var r3 = n3();
          } catch (n4) {
            return t2(n4);
          }
          if (r3 && r3.then)
            return r3.then(void 0, t2);
          return r3;
        }(function() {
          return a(navigator.serviceWorker.register(n2.sn, n2.nn), function(t2) {
            return n2.un = performance.now(), t2;
          });
        }, function(n3) {
          throw n3;
        });
      } catch (n3) {
        return Promise.reject(n3);
      }
    }, h = v2, (l = [{ key: "active", get: function() {
      return this.en.promise;
    } }, { key: "controlling", get: function() {
      return this.on.promise;
    } }]) && t(h.prototype, l), m && t(h, m), v2;
  }(function() {
    function n2() {
      this.Pn = /* @__PURE__ */ new Map();
    }
    var t2 = n2.prototype;
    return t2.addEventListener = function(n3, t3) {
      this.Sn(n3).add(t3);
    }, t2.removeEventListener = function(n3, t3) {
      this.Sn(n3).delete(t3);
    }, t2.dispatchEvent = function(n3) {
      n3.target = this;
      for (var t3, r2 = e(this.Sn(n3.type)); !(t3 = r2()).done; ) {
        (0, t3.value)(n3);
      }
    }, t2.Sn = function(n3) {
      return this.Pn.has(n3) || this.Pn.set(n3, /* @__PURE__ */ new Set()), this.Pn.get(n3);
    }, n2;
  }());

  // js/importmap.json
  var imports = {
    preact: "https://ga.jspm.io/npm:preact@10.6.5/dist/preact.module.js",
    "preact/compat": "https://ga.jspm.io/npm:preact@10.6.5/compat/dist/compat.module.js",
    react: "https://spike.land/react.mjs",
    "framer-motion": "https://unpkg.com/@spike.land/esm@0.6.218/dist/framer-motion.mjs",
    "react-dom": "https://spike.land/react.mjs",
    "@emotion/react": "https://unpkg.com/@spike.land/esm@0.6.218/dist/emotion-react.mjs"
  };
  var scopes = {
    "https://ga.jspm.io/": {
      "object-assign": "https://ga.jspm.io/npm:object-assign@4.1.1/index.js",
      "preact/hooks": "https://ga.jspm.io/npm:preact@10.6.5/hooks/dist/hooks.module.js"
    }
  };
  var importmap_default = {
    imports,
    scopes
  };

  // js/appStarter.ts
  document.body.appendChild(Object.assign(document.createElement("script"), {
    type: "importmap-shim",
    innerHTML: JSON.stringify(importmap_default)
  }));
  (async (injectedRoom = "") => {
    window.esmsInitOptions = {
      shimMode: true,
      revokeBlobURLs: true,
      fetch: myFetch,
      resolve: (id, parentUrl) => {
        return parentUrl + id;
      },
      polyfillEnable: ["css-modules", "json-modules"],
      onerror: (error) => console.log(error),
      noLoadEventRetriggers: true,
      skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//
    };
    async function myFetch(input, init) {
      const url = input.toString();
      const urlEnd = url.substring(-3);
      if (url.indexOf("monaco") === -1 && ["tsx", ".ts"].indexOf(urlEnd) !== -1) {
        console.log(url);
        const res = await fetch(url, init);
        if (!res.ok)
          return res;
        const source = await res.text();
        return new Response(source, init);
      }
      return fetch(url, init);
    }
    const { run } = await importShim("./dist/starter.mjs");
    run(injectedRoom);
    const wb = new v("./sw.js");
    wb.addEventListener("activated", async (event) => {
      if (!event.isUpdate) {
        console.log("Service worker activated for the first time!");
      }
    });
    wb.register();
  })();
})();
//# sourceMappingURL=appStarter.js.map
