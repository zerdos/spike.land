import { selectAll, selectOne } from "css-select";
import { parse as parse$1 } from "css-what";
import render from "dom-serializer";
import { AnyNode, ChildNode, Document, Element, Text } from "domhandler";
import { DomUtils, parseDocument } from "htmlparser2";
import path from "path-browserify";
import pc from "picocolors";
import { parse, Root, stringify } from "postcss";

function parseStylesheet(stylesheet: string | { toString(): string; }) {
  return parse(stylesheet);
}
function serializeStylesheet(ast: AnyNode | null, options: { compress: any; }) {
  const cssParts: (string | any[])[] = [];
  stringify(ast, (result, node, type) => {
    if (node?.type === "decl" && node.value.includes("</style>")) {
      return;
    }
    if (!options.compress) {
      cssParts.push(result);
      return;
    }
    if (node?.type === "comment") {
      return;
    }
    if (node?.type === "decl") {
      const prefix = node.prop + node.raws.between;
      cssParts.push(result.replace(prefix, prefix.trim()));
      return;
    }
    if (type === "start") {
      if (node?.type === "rule" && node.selectors) {
        if (node.selectors.length === 1) {
          cssParts.push(node.selectors[0] ?? "", "{");
        } else {
          cssParts.push(node.selectors.join(","), "{");
        }
      } else {
        cssParts.push(result.trim());
      }
      return;
    }
    if (type === "end" && result === "}" && node?.raws?.semicolon) {
      const lastItemIdx = cssParts.length - 2;
      if (lastItemIdx >= 0 && cssParts[lastItemIdx]) {
        cssParts[lastItemIdx] = cssParts[lastItemIdx].slice(0, -1);
      }
    }
    cssParts.push(result.trim());
  });
  return cssParts.join("");
}
function markOnly(predicate: { (rule: any): any; (arg0: any): boolean; }) {
  return (
    rule: {
      selectors: any;
      $$remove: boolean;
      $$markedSelectors: any;
      _other: { $$markedSelectors: any; selectors: any; };
    },
  ) => {
    const sel = "selectors" in rule ? rule.selectors : void 0;
    if (predicate(rule) === false) {
      rule.$$remove = true;
    }
    if ("selectors" in rule) {
      rule.$$markedSelectors = rule.selectors;
      rule.selectors = sel;
    }
    if (rule._other) {
      rule._other.$$markedSelectors = rule._other.selectors;
    }
  };
}
function applyMarkedSelectors(rule: { $$markedSelectors: any; selectors: any; _other: any; }) {
  if (rule.$$markedSelectors) {
    rule.selectors = rule.$$markedSelectors;
  }
  if (rule._other) {
    applyMarkedSelectors(rule._other);
  }
}
function walkStyleRules(node: Root, iterator: { (rule: any): void; (arg0: any): boolean; }) {
  if (!("nodes" in node)) {
    return;
  }
  node.nodes = node.nodes?.filter(
    (rule: { _other: undefined; filterSelectors: (predicate: any) => void; }) => {
      if (hasNestedRules(rule)) {
        walkStyleRules(rule, iterator);
      }
      rule._other = void 0;
      rule.filterSelectors = filterSelectors;
      return iterator(rule) !== false;
    },
  );
}
function walkStyleRulesWithReverseMirror(
  node: Root,
  node2: Root | null,
  iterator: { (rule: any): boolean | undefined; (arg0: any): boolean; },
) {
  if (!node2) {
    return walkStyleRules(node, iterator);
  }
  [node.nodes, node2.nodes] = splitFilter(
    node.nodes,
    node2.nodes,
    (
      rule: { _other: any; filterSelectors: (predicate: any) => void; },
      index: string | number,
      _rules: any,
      rules2: { [x: string]: any; },
    ) => {
      const rule2 = rules2?.[index];
      if (hasNestedRules(rule)) {
        walkStyleRulesWithReverseMirror(rule, rule2, iterator);
      }
      rule._other = rule2;
      rule.filterSelectors = filterSelectors;
      return iterator(rule) !== false;
    },
  );
}
function hasNestedRules(rule: { nodes: any[]; name: string; }) {
  return "nodes" in rule && !!rule.nodes?.length &&
    (!("name" in rule) || rule.name !== "keyframes" && rule.name !== "-webkit-keyframes") &&
    rule.nodes.some((n: { type: string; }) => n.type === "rule" || n.type === "atrule");
}
function splitFilter(
  a: string | any[],
  b: any,
  predicate: {
    (rule: any, index: any, _rules: any, rules2: any): boolean;
    (arg0: any, arg1: number, arg2: any, arg3: any): any;
  },
) {
  const aOut = [];
  const bOut = [];
  for (let index = 0; index < a.length; index++) {
    const item = a[index];
    if (predicate(item, index, a, b)) {
      aOut.push(item);
    } else {
      bOut.push(item);
    }
  }
  return [aOut, bOut];
}
function filterSelectors(predicate: any) {
  if (this._other) {
    const [a, b] = splitFilter(
      this.selectors,
      this._other.selectors,
      predicate,
    );
    this.selectors = a;
    this._other.selectors = b;
  } else {
    this.selectors = this.selectors.filter(predicate);
  }
}
const MEDIA_TYPES = /* @__PURE__ */ new Set(["all", "print", "screen", "speech"]);
const MEDIA_KEYWORDS = /* @__PURE__ */ new Set(["and", "not", ","]);
const MEDIA_FEATURES = new Set(
  [
    "width",
    "aspect-ratio",
    "color",
    "color-index",
    "grid",
    "height",
    "monochrome",
    "orientation",
    "resolution",
    "scan",
  ].flatMap((feature) => [feature, `min-${feature}`, `max-${feature}`]),
);
let classCache: Set<unknown> | null = null;
let idCache: Set<unknown> | null = null;
function buildCache(container: any) {
  classCache = /* @__PURE__ */ new Set();
  idCache = /* @__PURE__ */ new Set();
  const queue = [container];
  while (queue.length) {
    const node = queue.shift();
    if (node.hasAttribute?.("class")) {
      const classList = node.getAttribute("class").trim().split(" ");
      classList.forEach((cls: any) => {
        classCache.add(cls);
      });
    }
    if (node.hasAttribute?.("id")) {
      const id = node.getAttribute("id").trim();
      idCache.add(id);
    }
    if ("children" in node) {
      queue.push(...node.children.filter((child: { type: string; }) => child.type === "tag"));
    }
  }
}
function createDocument(html: string) {
  const document = parseDocument(html, { decodeEntities: false });
  extendDocument(document);
  extendElement(Element.prototype);
  let beastiesContainer = document.querySelector("[data-beasties-container]");
  if (!beastiesContainer) {
    document.documentElement?.setAttribute("data-beasties-container", "");
    beastiesContainer = document.documentElement || document;
  }
  document.beastiesContainer = beastiesContainer;
  buildCache(beastiesContainer);
  return document;
}
function serializeDocument(document: AnyNode | ArrayLike<AnyNode>) {
  return render(document, { decodeEntities: false });
}
let extended = false;
function extendElement(element: Element) {
  if (extended) {
    return;
  }
  extended = true;
  Object.defineProperties(element, {
    nodeName: {
      get() {
        return this.tagName.toUpperCase();
      },
    },
    id: {
      get() {
        return this.getAttribute("id");
      },
      set(value) {
        this.setAttribute("id", value);
      },
    },
    className: {
      get() {
        return this.getAttribute("class");
      },
      set(value) {
        this.setAttribute("class", value);
      },
    },
    insertBefore: {
      value(child: ChildNode, referenceNode: ChildNode) {
        if (!referenceNode) {
          return this.appendChild(child);
        }
        DomUtils.prepend(referenceNode, child);
        return child;
      },
    },
    appendChild: {
      value(child: ChildNode) {
        DomUtils.appendChild(this, child);
        return child;
      },
    },
    removeChild: {
      value(child: ChildNode) {
        DomUtils.removeElement(child);
      },
    },
    remove: {
      value() {
        DomUtils.removeElement(this);
      },
    },
    textContent: {
      get() {
        return DomUtils.getText(this);
      },
      set(text) {
        this.children = [];
        DomUtils.appendChild(this, new Text(text));
      },
    },
    setAttribute: {
      value(name: string | number, value: string | null) {
        if (this.attribs == null) {
          this.attribs = {};
        }
        if (value == null) {
          value = "";
        }
        this.attribs[name] = value;
      },
    },
    removeAttribute: {
      value(name: string | number) {
        if (this.attribs != null) {
          delete this.attribs[name];
        }
      },
    },
    getAttribute: {
      value(name: string | number) {
        return this.attribs != null && this.attribs[name];
      },
    },
    hasAttribute: {
      value(name: string | number) {
        return this.attribs != null && this.attribs[name] != null;
      },
    },
    getAttributeNode: {
      value(name: any) {
        const value = this.getAttribute(name);
        if (value != null) {
          return { specified: true, value };
        }
      },
    },
    exists: {
      value(sel: any) {
        return cachedQuerySelector(sel, this);
      },
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      },
    },
    querySelectorAll: {
      value(sel) {
        return selectAll(sel, this);
      },
    },
  });
}
function extendDocument(document: Document) {
  Object.defineProperties(document, {
    // document is just an Element in htmlparser2, giving it a nodeType of ELEMENT_NODE.
    // TODO: verify if these are needed for css-select
    nodeType: {
      get() {
        return 9;
      },
    },
    contentType: {
      get() {
        return "text/html";
      },
    },
    nodeName: {
      get() {
        return "#document";
      },
    },
    documentElement: {
      get() {
        return this.children.find(
          (child: { tagName: any; }) =>
            "tagName" in child && String(child.tagName).toLowerCase() === "html",
        );
      },
    },
    head: {
      get() {
        return this.querySelector("head");
      },
    },
    body: {
      get() {
        return this.querySelector("body");
      },
    },
    createElement: {
      value(name: string) {
        return new Element(name, {});
      },
    },
    createTextNode: {
      value(text: string) {
        return new Text(text);
      },
    },
    exists: {
      value(sel: any) {
        return cachedQuerySelector(sel, this);
      },
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      },
    },
    querySelectorAll: {
      value(sel) {
        if (sel === ":root") {
          return this;
        }
        return selectAll(sel, this);
      },
    },
  });
}
const selectorTokensCache = /* @__PURE__ */ new Map();
function cachedQuerySelector(sel, node: any) {
  let selectorTokens = selectorTokensCache.get(sel);
  if (selectorTokens === void 0) {
    selectorTokens = parseRelevantSelectors(sel);
    selectorTokensCache.set(sel, selectorTokens);
  }
  if (selectorTokens) {
    for (const token of selectorTokens) {
      if (token.name === "class") {
        return classCache.has(token.value);
      }
      if (token.name === "id") {
        return idCache.has(token.value);
      }
    }
  }
  return !!selectOne(sel, node);
}
function parseRelevantSelectors(sel: string) {
  const tokens = parse$1(sel);
  const relevantTokens = [];
  for (let i = 0; i < tokens.length; i++) {
    const tokenGroup = tokens[i];
    if (tokenGroup?.length !== 1) {
      continue;
    }
    const token = tokenGroup[0];
    if (token?.type === "attribute" && (token.name === "class" || token.name === "id")) {
      relevantTokens.push(token);
    }
  }
  return relevantTokens.length > 0 ? relevantTokens : null;
}

const LOG_LEVELS = ["trace", "debug", "info", "warn", "error", "silent"];
const defaultLogger = {
  trace(msg: any) {
    console.trace(msg);
  },
  debug(msg: any) {
    console.debug(msg);
  },
  warn(msg: string | number | null | undefined) {
    console.warn(pc.yellow(msg));
  },
  error(msg: string | number | null | undefined) {
    console.error(pc.bold(pc.red(msg)));
  },
  info(msg: string | number | null | undefined) {
    console.info(pc.bold(pc.blue(msg)));
  },
  silent() {
  },
};
function createLogger(logLevel: string) {
  const logLevelIdx = LOG_LEVELS.indexOf(logLevel);
  return LOG_LEVELS.reduce((logger, type, index) => {
    if (index >= logLevelIdx) {
      logger[type] = defaultLogger[type];
    } else {
      logger[type] = defaultLogger.silent;
    }
    return logger;
  }, {});
}
function isSubpath(basePath: string, currentPath: string) {
  return !path.relative(basePath, currentPath).startsWith("..");
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj: { [x: string]: any; }, key: PropertyKey, value: any) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : obj[key] = value;
var __publicField = (obj: this, key: string, value: undefined) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj: any, member: { has: (arg0: any) => any; }, msg: string) => {
  if (!member.has(obj)) {
    throw TypeError("Cannot " + msg);
  }
};
var __privateGet = (
  obj: this,
  member: { get: (arg0: any) => any; },
  getter: { call: (arg0: any) => any; } | undefined,
) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (
  obj: object,
  member: { has: (arg0: any) => any; add: (arg0: any) => any; set: (arg0: any, arg1: any) => any; },
  value: Map<any, any>,
) => {
  if (member.has(obj)) {
    throw TypeError("Cannot add the same private member more than once");
  }
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var _selectorCache: WeakMap<object, any>;
const removePseudoClassesAndElementsPattern = /(?<!\\)::?[a-z-]+(?:\(.+\))?/gi;
const removeTrailingCommasPattern = /\(\s*,|,\s*\)/g;
class Beasties {
  constructor(options = {}) {
    __privateAdd(this, _selectorCache, /* @__PURE__ */ new Map());
    __publicField(this, "options");
    __publicField(this, "logger");
    __publicField(this, "fs");
    this.options = Object.assign({
      logLevel: "info",
      path: "",
      publicPath: "",
      reduceInlineStyles: true,
      pruneSource: false,
      additionalStylesheets: [],
      allowRules: [],
    }, options);
    this.logger = this.options.logger || createLogger(this.options.logLevel);
  }

  /**
   * Apply critical CSS processing to the html
   */
  async process(html: any) {
    const start = Date.now();
    const document = createDocument(html);
    if (this.options.additionalStylesheets.length > 0) {
      await this.embedAdditionalStylesheet(document);
    }

    const styles = this.getAffectedStyleTags(document);
    for (const style of styles) {
      this.processStyle(style, document);
    }
    if (this.options.mergeStylesheets !== false && styles.length !== 0) {
      this.mergeStylesheets(document);
    }
    const output = serializeDocument(document);
    const end = Date.now();
    this.logger.info?.(`Time ${end - start}ms`);
    return output;
  }
  /**
   * Get the style tags that need processing
   */
  getAffectedStyleTags(document: Document) {
    const styles = [...document.querySelectorAll("style")];
    if (this.options.reduceInlineStyles === false) {
      return styles.filter((style) => style.$$external);
    }
    return styles;
  }
  mergeStylesheets(document: Document) {
    const styles = this.getAffectedStyleTags(document);
    if (styles.length === 0) {
      this.logger.warn?.(
        "Merging inline stylesheets into a single <style> tag skipped, no inline stylesheets to merge",
      );
      return;
    }
    const first = styles[0];
    let sheet = first.textContent;
    for (let i = 1; i < styles.length; i++) {
      const node = styles[i];
      sheet += node.textContent;
      node.remove();
    }
    first.textContent = sheet;
  }
  /**
   * Given href, find the corresponding CSS asset
   */
  async getCssAsset(href: string, _style: any) {
    const outputPath = this.options.path;
    const publicPath = this.options.publicPath;
    let normalizedPath = href.replace(/^\//, "");
    const pathPrefix = `${(publicPath || "").replace(/(^\/|\/$)/g, "")}/`;
    if (normalizedPath.startsWith(pathPrefix)) {
      normalizedPath = normalizedPath.substring(pathPrefix.length).replace(/^\//, "");
    }
    if (/^https?:\/\//.test(normalizedPath) || href.startsWith("//")) {
      return void 0;
    }
    const filename = path.resolve(outputPath, normalizedPath);
    if (!isSubpath(outputPath, filename)) {
      return void 0;
    }
    let sheet;
    try {
      sheet = await this.readFile(filename);
    } catch {
      this.logger.warn?.(`Unable to locate stylesheet: ${filename}`);
    }
    return sheet;
  }
  checkInlineThreshold(
    link: { remove: () => void; },
    style: { $$name: any; $$reduce: boolean; },
    sheet: string | any[],
  ) {
    if (this.options.inlineThreshold && sheet.length < this.options.inlineThreshold) {
      const href = style.$$name;
      style.$$reduce = false;
      this.logger.info?.(
        `\x1B[32mInlined all of ${href} (${sheet.length} was below the threshold of ${this.options.inlineThreshold})\x1B[39m`,
      );
      link.remove();
      return true;
    }
    return false;
  }
  /**
   * Inline the stylesheets from options.additionalStylesheets (assuming it passes `options.filter`)
   */
  async embedAdditionalStylesheet(document: Document) {
    const styleSheetsIncluded: any[] = [];
    const sources = await Promise.all(
      this.options.additionalStylesheets.map((cssFile: any) => {
        if (styleSheetsIncluded.includes(cssFile)) {
          return [];
        }
        styleSheetsIncluded.push(cssFile);
        const style = document.createElement("style");
        style.$$external = true;
        return this.getCssAsset(cssFile, style).then((sheet) => [sheet, style]);
      }),
    );
    for (const [sheet, style] of sources) {
      if (sheet) {
        style.textContent = sheet;
        document.head.appendChild(style);
      }
    }
  }

  /**
   * Prune the source CSS files
   */
  pruneSource(
    style: { $$name: any; textContent: any; $$links: any; },
    before: any,
    sheetInverse: string | any[],
  ) {
    const minSize = this.options.minimumExternalSize;
    const name = style.$$name;
    if (minSize && sheetInverse.length < minSize) {
      this.logger.info?.(
        `\x1B[32mInlined all of ${name} (non-critical external stylesheet would have been ${sheetInverse.length}b, which was below the threshold of ${minSize})\x1B[39m`,
      );
      style.textContent = before;
      if (style.$$links) {
        for (const link of style.$$links) {
          const parent = link.parentNode;
          if (parent) {
            parent.removeChild(link);
          }
        }
      }
      return true;
    }
    return false;
  }
  /**
   * Parse the stylesheet within a <style> element, then reduce it to contain only rules used by the document.
   */
  processStyle(
    style: {
      $$reduce: boolean;
      $$name: string;
      textContent: any;
      parentNode: any;
      remove: () => void;
    },
    document: Document,
  ) {
    if (style.$$reduce === false) {
      return;
    }
    const name = style.$$name ? style.$$name.replace(/^\//, "") : "inline CSS";
    const options = this.options;
    const beastiesContainer = document.beastiesContainer;
    let keyframesMode = options.keyframes ?? "critical";
    if (keyframesMode === true) {
      keyframesMode = "all";
    }
    if (keyframesMode === false) {
      keyframesMode = "none";
    }
    let sheet = style.textContent;
    const before = sheet;
    if (!sheet) {
      return;
    }
    const ast = parseStylesheet(sheet);
    const astInverse = options.pruneSource ? parseStylesheet(sheet) : null;
    let criticalFonts = "";
    const failedSelectors: string[] = [];
    const criticalKeyframeNames = /* @__PURE__ */ new Set();
    let includeNext = false;
    let includeAll = false;
    let excludeNext = false;
    let excludeAll = false;
    const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
    const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
    walkStyleRules(
      ast,
      markOnly(
        (
          rule: {
            type: string;
            text: string;
            filterSelectors: (arg0: (sel: any) => any) => void;
            selector: any;
            nodes: any[];
            name: string;
          },
        ) => {
          if (rule.type === "comment") {
            const beastiesComment = rule.text.match(/^(?<!! )beasties:(.*)/);
            const command = beastiesComment && beastiesComment[1];
            if (command) {
              switch (command) {
                case "include":
                  includeNext = true;
                  break;
                case "exclude":
                  excludeNext = true;
                  break;
                case "include start":
                  includeAll = true;
                  break;
                case "include end":
                  includeAll = false;
                  break;
                case "exclude start":
                  excludeAll = true;
                  break;
                case "exclude end":
                  excludeAll = false;
                  break;
              }
            }
          }
          if (rule.type === "rule") {
            if (includeNext) {
              includeNext = false;
              return true;
            }
            if (excludeNext) {
              excludeNext = false;
              return false;
            }
            if (includeAll) {
              return true;
            }
            if (excludeAll) {
              return false;
            }
            rule.filterSelectors?.((sel: string | string[]) => {
              const isAllowedRule = options.allowRules.some(
                (exp: { test: (arg0: any) => any; }) => {
                  if (exp instanceof RegExp) {
                    return exp.test(sel);
                  }
                  return exp === sel;
                },
              );
              if (isAllowedRule) {
                return true;
              }
              if (
                sel === ":root" || sel === "html" || sel === "body" ||
                sel[0] === ":" && /^::?(?:before|after)$/.test(sel)
              ) {
                return true;
              }
              sel = this.normalizeCssSelector(sel);
              if (!sel) {
                return false;
              }
              try {
                return beastiesContainer.exists(sel);
              } catch (e) {
                failedSelectors.push(`${sel} -> ${e.message || e.toString()}`);
                return false;
              }
            });
            if (!rule.selector) {
              return false;
            }
            if (rule.nodes) {
              for (const decl of rule.nodes) {
                if (!("prop" in decl)) {
                  continue;
                }
                if (shouldInlineFonts && /\bfont(?:-family)?\b/i.test(decl.prop)) {
                  criticalFonts += ` ${decl.value}`;
                }
                if (decl.prop === "animation" || decl.prop === "animation-name") {
                  for (const name2 of decl.value.split(/\s+/)) {
                    const nameTrimmed = name2.trim();
                    if (nameTrimmed) {
                      criticalKeyframeNames.add(nameTrimmed);
                    }
                  }
                }
              }
            }
          }
          if (rule.type === "atrule" && rule.name === "font-face") {
            return;
          }
          const hasRemainingRules =
            ("nodes" in rule && rule.nodes?.some((rule2: { $$remove: any; }) => !rule2.$$remove)) ??
              true;
          return hasRemainingRules;
        },
      ),
    );
    if (failedSelectors.length !== 0) {
      this.logger.warn?.(
        `${failedSelectors.length} rules skipped due to selector errors:
  ${
          failedSelectors.join(
            "\n  ",
          )
        }`,
      );
    }
    const preloadedFonts = /* @__PURE__ */ new Set();
    walkStyleRulesWithReverseMirror(
      ast,
      astInverse,
      (rule: { $$remove: boolean; type: string; name: string; params: unknown; nodes: any; }) => {
        if (rule.$$remove === true) {
          return false;
        }
        if ("selectors" in rule) {
          applyMarkedSelectors(rule);
        }
        if (rule.type === "atrule" && rule.name === "keyframes") {
          if (keyframesMode === "none") {
            return false;
          }
          if (keyframesMode === "all") {
            return true;
          }
          return criticalKeyframeNames.has(rule.params);
        }
        if (rule.type === "atrule" && rule.name === "font-face") {
          let family, src;
          if (rule.nodes) {
            for (const decl of rule.nodes) {
              if (!("prop" in decl)) {
                continue;
              }
              if (decl.prop === "src") {
                src = (decl.value.match(/url\s*\(\s*(['"]?)(.+?)\1\s*\)/) || [])[2];
              } else if (decl.prop === "font-family") {
                family = decl.value;
              }
            }
            if (src && shouldPreloadFonts && !preloadedFonts.has(src)) {
              preloadedFonts.add(src);
              const preload = document.createElement("link");
              preload.setAttribute("rel", "preload");
              preload.setAttribute("as", "font");
              preload.setAttribute("crossorigin", "anonymous");
              preload.setAttribute("href", src.trim());
              document.head.appendChild(preload);
            }
          }
          if (!shouldInlineFonts || !family || !src || !criticalFonts.includes(family)) {
            return false;
          }
        }
      },
    );
    sheet = serializeStylesheet(ast, {
      compress: this.options.compress !== false,
    });
    if (sheet.trim().length === 0) {
      if (style.parentNode) {
        style.remove();
      }
      return;
    }
    let afterText = "";
    let styleInlinedCompletely = false;
    if (options.pruneSource) {
      const sheetInverse = serializeStylesheet(astInverse, {
        compress: this.options.compress !== false,
      });
      styleInlinedCompletely = this.pruneSource(style, before, sheetInverse);
      if (styleInlinedCompletely) {
        const percent2 = sheetInverse.length / before.length * 100;
        afterText = `, reducing non-inlined size ${percent2 | 0}% to ${
          formatSize(sheetInverse.length)
        }`;
      }
    }
    if (!styleInlinedCompletely) {
      style.textContent = sheet;
    }
    const percent = sheet.length / before.length * 100 | 0;
    this.logger.info?.(
      `\x1B[32mInlined ${formatSize(sheet.length)} (${percent}% of original ${
        formatSize(before.length)
      }) of ${name}${afterText}.\x1B[39m`,
    );
  }
  normalizeCssSelector(sel: string) {
    let normalizedSelector = __privateGet(this, _selectorCache).get(sel);
    if (normalizedSelector !== void 0) {
      return normalizedSelector;
    }
    normalizedSelector = sel.replace(removePseudoClassesAndElementsPattern, "").replace(
      removeTrailingCommasPattern,
      (match: string | string[]) => match.includes("(") ? "(" : ")",
    ).trim();
    __privateGet(this, _selectorCache).set(sel, normalizedSelector);
    return normalizedSelector;
  }
}
_selectorCache = new WeakMap();
function formatSize(size: number) {
  if (size <= 0) {
    return "0 bytes";
  }
  const abbreviations = ["bytes", "kB", "MB", "GB"];
  const index = Math.floor(Math.log(size) / Math.log(1024));
  const roundedSize = size / 1024 ** index;
  const fractionDigits = index === 0 ? 0 : 2;
  return `${roundedSize.toFixed(fractionDigits)} ${abbreviations[index]}`;
}

export { Beasties as default };
