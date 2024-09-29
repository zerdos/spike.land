import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import preflightCss from "tailwindcss/lib/css/preflight.css";

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
  const cssString = classNames.map((cls) => `.${cls} { @apply ${cls}; }`).join("\n");

  const result = await postcss([
    tailwindcss(),
    autoprefixer(),
  ]);

  return result.process(cssString).then((result) => result.css);
}

Object.assign(globalThis, { generateCSS });
