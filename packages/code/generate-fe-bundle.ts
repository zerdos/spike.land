const packageJson = (await Deno.readTextFile("./package.json"));

const { version } = JSON.parse(packageJson);

const regex = /`/gi;

export const html = (await Deno.readTextFile("index.html")).replace(
  "latest",
  version,
).replaceAll(regex, "\\`").replace("!!!", "\\$");
export const sw = (await Deno.readTextFile("sw.js"));

await Deno.writeTextFile(
  "dist/html.js",
  "export const version = `" + version + "`; " +
    "export const html = `" + html + "`; " +
    "export const sw = `" + sw + "`;",
);
