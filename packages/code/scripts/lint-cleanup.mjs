#!/usr/bin/env node
import { ESLint } from "eslint";
import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src");

async function cleanupLintingIssues() {
  const eslint = new ESLint({
    fix: true,
    extensions: [".ts", ".tsx"],
  });

  // Remove console statements
  function removeConsoleStatements(content) {
    return content.replace(/console\.(log|warn|error)\(.*\);?/g, "");
  }

  // Replace index signatures with Record
  function replaceIndexSignatures(content) {
    return content.replace(/\[key:\s*string\]:\s*any/g, "Record<string, any>");
  }

  // Add missing dependencies to useEffect and useCallback
  function fixHookDependencies(content) {
    // This is a simplistic approach and might need manual review
    return content
      .replace(
        /useEffect\(\(\) => {([^}]+)}, \[\]\)/g,
        "useEffect(() => {$1}, [/* Add dependencies */])",
      )
      .replace(
        /useCallback\(([^,]+), \[\]\)/g,
        "useCallback($1, [/* Add dependencies */])",
      );
  }

  const results = await eslint.lintFiles([srcDir]);

  for (const result of results) {
    if (result.fixableErrorCount > 0 || result.fixableWarningCount > 0) {
      let content = result.source;

      // Apply transformations
      content = removeConsoleStatements(content);
      content = replaceIndexSignatures(content);
      content = fixHookDependencies(content);

      fs.writeFileSync(result.filePath, content);
      console.log(`Processed: ${result.filePath}`);
    }
  }

  console.log("Linting cleanup complete.");
}

cleanupLintingIssues().catch(console.error);
