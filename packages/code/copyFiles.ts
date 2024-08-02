// copyFiles.mjs
import { copyFile } from "./esbuild-depts.ts";

const filesToCopy = [
  ["./src/favicon.ico", "./dist/favicon.ico"],

  ["./src/assets/manifest.json", "./dist/manifest.json"],
];

export const copyFiles = async () => {
  await Promise.all(filesToCopy.map(([src, dest]) => copyFile(src, dest)));
};
