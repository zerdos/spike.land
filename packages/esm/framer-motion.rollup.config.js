import dts from "rollup-plugin-dts";

const config = [
  // …
  {
    input: "../../node_modules/framer-motion/types/index.d.ts",
    output: [{ file: "dist/types/framer-motion.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;