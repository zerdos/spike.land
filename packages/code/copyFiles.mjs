import { copyFile } from "./esbuild-depts.mjs";

export const copyFiles = async () => {
  await copyFile("./src/favicon.ico", "./dist/favicon.ico");
  await copyFile("./lame.mjs", "./dist/lame.mjs");
  await copyFile(
    "./enhanced_dot_digital-7/enhanced_dot_digital-7.ttf",
    "./dist/enhanced_dot_digital-7.ttf",
  );

  await copyFile(
    "./src/assets/manifest.json",
    "./dist/manifest.json",
  );
};
