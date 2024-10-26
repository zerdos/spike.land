export default async (url, module = { exports: {} }) =>
  (Function("module", "exports", await (await globalThis.fetch(url)).text())
    .call(
      module,
      module,
      module.exports,
    ),
    module).exports;
