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
    env: { NODE_ENV: "production" },
    platform: "browser",
  },
});

async function generateCSS(classNames: string[]) {
  const safeClassNames = classNames
    .map(cls => cls.replace(/[^\w-/:]/g, ""))
    .filter(Boolean);

  const cssString = safeClassNames
    .map(cls => `.${cls} { @apply ${cls}; }`)
    .join("\n");

  try {
    const result = await postcss([
      tailwindcss(TwConfig),
      autoprefixer,
    ]).process(cssString, { from: undefined });

    return result.css;
  } catch (error) {
    throw new Error(`CSS generation failed: ${(error as Error).message}`);
  }
}

Object.assign(globalThis, { generateCSS });
