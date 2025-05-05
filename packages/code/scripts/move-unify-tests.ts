// Node.js script to unify test files in packages/code/src
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "../src");
const TESTS_DIR = path.join(SRC_DIR, "__tests__");
const TEST_FILE_REGEX = /\.(test|spec)\.tsx?$/;

function walk(dir: string, fileList: string[] = []) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively walk into subdirectories
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function toSpecName(file: string) {
  return file.replace(/\.test\.tsx?$/, ".spec.tsx").replace(/\.test\.ts$/, ".spec.ts");
}

function getRelativeTestPath(file: string) {
  // Remove SRC_DIR prefix
  let rel = path.relative(SRC_DIR, file);
  // Remove __tests__/ if already present
  rel = rel.replace(/^__tests__\//, "");
  // Remove .test. and .spec. from filename for mapping
  return rel.replace(/\.spec\.tsx?$/, "").replace(/\.spec\.ts$/, "")
    .replace(/\.test\.tsx?$/, "").replace(/\.test\.ts$/, "");
}

function getSourceFileForTest(testFile: string) {
  // e.g. __tests__/foo/bar.spec.tsx → foo/bar.tsx
  const rel = getRelativeTestPath(testFile);
  // Try .tsx and .ts
  const tsx = path.join(SRC_DIR, rel + ".tsx");
  const ts = path.join(SRC_DIR, rel + ".ts");
  if (fs.existsSync(tsx)) return tsx;
  if (fs.existsSync(ts)) return ts;
  return null;
}

function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const allFiles = walk(SRC_DIR);
  const testFiles = allFiles.filter(f => TEST_FILE_REGEX.test(f));

  for (const oldPath of testFiles) {
    // 1. Rename .test. to .spec. if needed
    let newPath = oldPath.replace(/\.test\.tsx?$/, ".spec.tsx").replace(/\.test\.ts$/, ".spec.ts");

    if (oldPath !== newPath && fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldPath} → ${newPath}`);
    }

    // 2. Move to __tests__ root, preserving relative path from src/
    const relFromSrc = path.relative(SRC_DIR, newPath);
    // Remove any leading __tests__/ from the relative path
    const relNoTests = relFromSrc.replace(/^__tests__\//, "").replace(/^[^/]+\/__tests__\//, "");
    const destPath = path.join(TESTS_DIR, relNoTests);
    if (path.resolve(newPath) !== path.resolve(destPath)) {
      ensureDirExists(destPath);
      fs.renameSync(newPath, destPath);
      console.log(`Moved: ${newPath} → ${destPath}`);
      newPath = destPath;
    }

    // 3. Check for tested file
    const testedFile = getSourceFileForTest(newPath);
    if (!testedFile) {
      console.warn(`WARNING: No tested file found for test: ${newPath}`);
    }
  }
}

main();
