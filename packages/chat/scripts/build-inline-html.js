#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "..", "dist");
const assetsDir = path.join(distDir, "assets");
const outputFile = path.join(__dirname, "..", "src", "worker", "chatHTML.ts");

// Read the built files
const indexJs = fs.readFileSync(path.join(assetsDir, "index.js"), "utf-8");
const indexCss = fs.readFileSync(path.join(assetsDir, "index.css"), "utf-8");

// Escape backticks in the JS code
const escapedJs = indexJs.replace(/`/g, "\\`").replace(/\${/g, "\\${");
const escapedCss = indexCss.replace(/`/g, "\\`").replace(/\${/g, "\\${");

// Create the inline HTML
const htmlContent = `export const chatHTML = \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat AI Assistant - spike.land</title>
    <style>
${escapedCss}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${escapedJs}
    </script>
  </body>
</html>\`;`;

// Write the file
fs.writeFileSync(outputFile, htmlContent);
console.log("Generated inline HTML at:", outputFile);