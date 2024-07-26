// copyFiles.mjs
import { copyFile } from "./esbuild-depts.mjs";

const filesToCopy = [
  ["./src/favicon.ico", "./dist/favicon.ico"],
  [
    "./enhanced_dot_digital-7/enhanced_dot_digital-7.ttf",
    "./dist/enhanced_dot_digital-7.ttf",
  ],
  ["./src/assets/manifest.json", "./dist/manifest.json"],
];

export const copyFiles = async () => {
  await Promise.all(filesToCopy.map(([src, dest]) => copyFile(src, dest)));
};
