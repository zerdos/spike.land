import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";

export default {
  input: path.resolve(__dirname, "node_modules/snakecase-keys/index.js"),
  output: {
    file: "snakecase-keys.bundle.js",
    format: "cjs", // CommonJS format for compatibility
  },
  plugins: [
    resolve(), // Resolve node_modules imports
    commonjs(), // Convert CommonJS modules to ES modules
  ],
};
