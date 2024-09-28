import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssJs, { CssInJs } from "postcss-js";
import tailwindcss from "tailwindcss";

async function generateCSS(classNames: string[]) {
  const cssString = classNames.map((cls) => `.${cls} { @apply ${cls}; }`).join("\n");

  const result = await postcss([
    tailwindcss(),
    autoprefixer(),
  ]).process(cssString as unknown as CssInJs, {
    parser: postcssJs.parse,
  });

  return result.css;
}

Object.assign(globalThis, { generateCSS });
