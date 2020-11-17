const packageJson = (await Deno.readTextFile("./package.json"));

const { version } = JSON.parse(packageJson);

const regex = /`/gi;
const regex2 = /VERSION/gi;

export const html = (await Deno.readTextFile("index.html")).replace(
  "latest",
  version,
).replaceAll(regex, "\\`").replace("!!!", "\\$");

export const sw = (await Deno.readTextFile("sw.js")).replaceAll(
  regex2,
  version,
);

const bundle = "export const version = `" + version + "`; " +
  "export const html = `" + html + "`; " +
  "export const sw = `" + sw + "`; " + `
export function inject(
  html,
  startKey,
  code,
  codeTranspiled,
) {
  const res = html.split("//inject");
  return [
    res[0],
    \`localStorage.setItem("\${startKey}", unescape("\${escape(code)}"));\`,
    \`restartCode(
      unescape("\${escape(codeTranspiled)}")
      );\`,
    res[2],
  ].join("\\n");
}
`;

await Deno.writeTextFile(
  "dist/html.js",
  bundle,
);

const regex3 = /export /gi;

await Deno.writeTextFile(
  "dist/htmlNoModule.js",
  bundle.replaceAll(regex3, ""),
);
