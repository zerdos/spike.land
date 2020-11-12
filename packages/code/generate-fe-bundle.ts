export const html = (await Deno.readTextFile("index.html"));
export const sw = (await Deno.readTextFile("sw.js"));

await Deno.writeTextFile(
  "src/html.ts",
  "export const html = `" + html + "`; " +
  "export const sw = `"+sw +"`;"
);