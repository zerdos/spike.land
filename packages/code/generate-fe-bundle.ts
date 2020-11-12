export const html = (await Deno.readTextFile("index.html"));

await Deno.writeTextFile(
  "src/html.ts",
  "export const html = `" + html + "}`",
);