

const packageJson = (await Deno.readTextFile('./package.json'))

const {version} =JSON.parse(packageJson)

export const html = (await Deno.readTextFile("index.html")).replace("latest", version);
export const sw = (await Deno.readTextFile("sw.js"));


await Deno.writeTextFile(
  "src/html.ts",
  "export const version = `"+ version +"`; " +
  "export const html = `" + html + "`; " +
  "export const sw = `"+sw +"`;"
);