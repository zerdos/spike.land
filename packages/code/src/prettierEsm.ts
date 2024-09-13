import emotion from "@emotion/css-prettifier";
import type { Options } from "prettier";
import pluginEstree from "prettier/plugins/estree";
import cssParser from "prettier/plugins/postcss";
import pluginTypescript from "prettier/plugins/typescript";
import { format } from "prettier/standalone";

/**
 * Creates a string of spaces of the specified length.
 * @param length - The number of spaces to create.
 * @returns A string of spaces.
 */
const createSpaceString = (length: number): string => " ".repeat(length);

const removeBlockComments = (code) => {
  // Use a regular expression to match block comments
  const blockCommentRegex = /\{\/\*\*([\s\S]*?)\*\/\}/g;

  // Replace all occurrences of block comments with an empty string
  return code.replace(blockCommentRegex, "");
};

/**
 * Processes and formats CSS-in-JS code, specifically dealing with the `css` template literal syntax.
 * @param code - The input code string to process.
 * @returns The processed and formatted code string.
 */
export const addSomeFixesIfNeeded = (_code: string): string => {
  const code = removeBlockComments(_code);
  try {
    let [start, ...rest] = code.split("css`");

    if (rest.length) {
      if (!code.includes("@emotion/react") && !code.includes(" css ")) {
        const [first, ...rest] = start.split("\n");
        // insert the import to the 2nd line
        if (first.startsWith("//")) {
          start = [first, "import { css } from \"@emotion/react\";", ...rest].join("\n");
        } else {
          start = ["import { css } from \"@emotion/react\";", first, ...rest].join("\n");
        }
      }
    }

    let prevIndent = (start.split("\n").pop()?.length ?? 0) + 2;

    const processedParts = rest.map((part) => {
      const [cssContent, afterCss, ...remainingParts] = part.split("`");
      const indent = createSpaceString(prevIndent);
      prevIndent = (afterCss.split("\n").pop()?.length ?? 0) + 2;

      const formattedCssContent = formatCssContent(cssContent, indent);
      return `${formattedCssContent}\n${indent}\`${[afterCss, ...remainingParts].join("`")}`;
    });

    let result = [start, ...processedParts].join("css`\n");
    result = addDefaultExportIfNeeded(result);

    return result;
  } catch (error) {
    console.error("addSomeFixesIfNeeded error", { error, code });
    return code;
  }
};

/**
 * Formats the CSS content within the template literal, preserving interpolations.
 * @param cssContent - The CSS content to format.
 * @param indent - The indentation string to use.
 * @returns The formatted CSS content with preserved interpolations.
 */
const formatCssContent = (cssContent: string, indent: string): string => {
  // Replace interpolations with placeholders
  const placeholderPrefix = "__INTERPOLATION_PLACEHOLDER_";
  let interpolations: string[] = [];
  let placeholderIndex = 0;

  const contentWithPlaceholders = cssContent.replace(/\${(.*?)}/g, (match) => {
    const placeholder = `${placeholderPrefix}${placeholderIndex}`;
    interpolations.push(match);
    placeholderIndex++;
    return placeholder;
  });

  // Format the CSS content
  const formattedContent = emotion(contentWithPlaceholders)
    .split("\n")
    .map((line: string) => line.trim() ? `${indent}  ${line}` : line)
    .join("\n");

  // Restore interpolations
  const finalContent = formattedContent.replace(
    new RegExp(`${placeholderPrefix}\\d+`, "g"),
    (match) => {
      const index = parseInt(match.split("_").pop() || "0", 10);
      return interpolations[index];
    },
  );

  return finalContent;
};

/**
 * Adds a default export if it's missing and there's no named export.
 * @param code - The code to check and potentially modify.
 * @returns The code with a default export added if necessary.
 */
const addDefaultExportIfNeeded = (code: string): string => {
  if (!code.includes("export default") && !code.includes("export const") && !code.includes("const App")) {
    return `${code}\n\nexport default () => <></>; // Empty default export`;
  }
  return code;
};

const prettierConfig: Options = {
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  insertPragma: false,
  bracketSameLine: true,
  jsxSingleQuote: true,
  htmlWhitespaceSensitivity: "strict",
  printWidth: 90,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  parser: "typescript",
  singleAttributePerLine: true,
  plugins: [pluginEstree, pluginTypescript],
};

export const prettierJs = async (
  code: string,
  toThrow = false,
): Promise<string> => {
  try {
    return await format(addSomeFixesIfNeeded(code), prettierConfig);
  } catch (error) {
    const msg = JSON.stringify({
      message: (error as unknown as { message: string })?.message,
      error,
      code,
    });
    console.error("Prettier error", msg);
    if (toThrow) throw Error(msg);
    if (code === "Types not found") return "export {}";
    return code;
  }
};

export const prettierCss = async (inputCSS: string) =>
  format(inputCSS, {
    parser: "css",
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    singleQuote: false,
    trailingComma: "none",
    plugins: [cssParser],
  });

Object.assign(globalThis, { prettierJs, prettierCss });
