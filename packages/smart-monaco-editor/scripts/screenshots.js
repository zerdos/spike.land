const captureWebsite = require("capture-website");

(async () => {
  await captureWebsite.file(
    "https://unpkg.com/@zedvision/smart-monaco-editor/index.html",
    "screenshot.png",
  );
  await captureWebsite.file(
    "https://unpkg.com/@zedvision/smart-monaco-editor/exampleHtml.html",
    "screenshot-html.png",
  );
  await captureWebsite.file(
    "https://unpkg.com/@zedvision/smart-monaco-editor-example/build/index.html",
    "screenshot-example.png",
  );
})();
