import postcssImport from "postcss-import";
import tailwindcssPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [postcssImport, tailwindcssPostcss, autoprefixer]
};
