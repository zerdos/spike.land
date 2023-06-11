import { importMapReplace } from ".././src/importMapReplace"; // replace with your actual module

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  globalThis.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          "name": "some-module",
          "version": "1.0.0",
          "main": "index.js",
          "browser": "browser.js",
          "module": "module.js",
          "types": "index.d.ts",
          "files": [
            "index.js",
            "browser.js",
            "module.js",
            "index.d.ts",
          ],
        }),
    })
  );

  it("should replace top-level imports", async () => {
    const code = "import React from \"react\";";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace top-level exports", async () => {
    const code = "export { default } from \"react\";";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports", async () => {
    const code = "const React = import(\"react\");";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should ignore relative URLs", async () => {
    const code = "import MyComponent from \"./MyComponent\";";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should ignore absolute URLs", async () => {
    const code = "import MyComponent from \"http://example.com/MyComponent.js\";";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should apply custom mappings", async () => {
    const code = "import CustomPackage from \"custom-package\";";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });
  it("should replace dynamic imports", async () => {
    const code = "const module = import(\"some-module\");";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports with await", async () => {
    const code = "const module = await import(\"some-module\");";
    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports inside a function", async () => {
    const code = `
      async function loadModule() {
        const module = await import("some-module");
        // do something with module
      }
    `;

    const result = await importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });
});
