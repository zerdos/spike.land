import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import preflightCss from "tailwindcss/lib/css/preflight.css";
import TwConfig from "../../../tailwind.config";

Object.assign(globalThis, {
  __dirname: "/",
  "/css/preflight.css": preflightCss,
  process: {
    cwd: () => "/",
    emitWarning: () => {},
    env: { NODE_ENV: "development" },
    platform: "browser",
  },
});

async function generateCSS(classNames: string[]) {
  const cssString = classNames.map((cls) => `.${cls} { @apply ${cls}; }`).join("\n").split("/").join(`\\/`);

  const result = await postcss([
    tailwindcss(TwConfig),
    autoprefixer(),
  ]);

  return result.process(cssString, { from: undefined }).then((result) => result.css);
}

Object.assign(globalThis, { generateCSS });
