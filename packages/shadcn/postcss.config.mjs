import tailwindcssPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

export default {
  plugins: [postcssImport, tailwindcssPostcss, autoprefixer],
};
