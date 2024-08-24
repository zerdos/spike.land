declare global {
  interface Window {
    [TAILWIND_SELECTOR]: typeof tailwindConfig;
  }
}

import autoprefixer from "autoprefixer";
import { Processor } from "postcss";
import tailwindcss from "tailwindcss";

const TAILWIND_SELECTOR = "tailwind";
const TAILWIND_STYLE_TYPE = "text/tailwindcss";
const TEMPLATE_ID = "/template.html";

let styleElement;
let currentHash = 0;
let processedClasses = new Set();
let observer;
let currentStyles = "";

const tailwindConfig = {
  config: {},
  // You'll need to import or define these:
  // defaultTheme: ...,
  // defaultConfig: ...,
  // colors: ...,
  // plugin: ...,
  // resolveConfig: ...
};

window[TAILWIND_SELECTOR] = new Proxy(tailwindConfig, {
  get(target, prop) {
    if (prop === "config" && typeof target[prop] === "object" && target[prop] !== null) {
      return new Proxy(target[prop], {
        set(obj, prop, value) {
          obj[prop] = value;
          processStyles(true);
          return true;
        },
      });
    }
    return target[prop];
  },
});

function observeStyleChanges(element) {
  observer.observe(element, {
    attributes: true,
    attributeFilter: ["type"],
    characterData: true,
    subtree: true,
    childList: true,
  });
}

new MutationObserver(async (mutations) => {
  if (!observer) {
    observer = new MutationObserver(async () => await processStyles(true));
    document.querySelectorAll(`style[type="${TAILWIND_STYLE_TYPE}"]`).forEach(observeStyleChanges);
  }

  let stylesAdded = false;
  for (let mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (node.nodeType === 1 && node.tagName === "STYLE" && node.getAttribute("type") === TAILWIND_STYLE_TYPE) {
        observeStyleChanges(node);
        stylesAdded = true;
      }
    }
  }

  await processStyles(stylesAdded);
}).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
  childList: true,
  subtree: true,
});

export async function processStyles(forceUpdate = false) {
  if (forceUpdate) {
    currentHash++;
    processedClasses.clear();
  }

  let newStyles = "";
  document.querySelectorAll(`style[type="${TAILWIND_STYLE_TYPE}"]`).forEach(style => {
    newStyles += style.textContent;
  });

  let newClasses = new Set();
  document.querySelectorAll("[class]").forEach(element => {
    element.classList.forEach(className => {
      if (!processedClasses.has(className)) {
        newClasses.add(className);
      }
    });
  });

  if (
    document.body
    && (forceUpdate || newClasses.size > 0 || newStyles !== currentStyles || !styleElement || !styleElement.isConnected)
  ) {
    newClasses.forEach(className => processedClasses.add(className));
    currentStyles = newStyles;
    self[TEMPLATE_ID] = Array.from(newClasses).join(" ");

    const { css } = await new Processor([
      tailwindcss({
        ...window[TAILWIND_SELECTOR].config,
        _hash: currentHash,
        content: {
          files: [TEMPLATE_ID],
          extract: {
            html: (content) => content.split(" "),
          },
        },
        // You'll need to define or import this:
        // plugins: [...defaultPlugins, ...Array.isArray(window[TAILWIND_SELECTOR].config.plugins) ? window[TAILWIND_SELECTOR].config.plugins : []]
      }),
      autoprefixer({
        remove: false,
      }),
    ]).process(`@tailwind base;@tailwind components;@tailwind utilities;${newStyles}`);

    if (!styleElement || !styleElement.isConnected) {
      styleElement = document.createElement("style");
      document.head.append(styleElement);
    }
    styleElement.textContent = css;
  }
}
