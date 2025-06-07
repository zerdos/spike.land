import emotionPrettifier from "@emotion/css-prettifier";
import type { Options } from "prettier";
import pluginEstree from "prettier/plugins/estree";
import postCss from "prettier/plugins/postcss";
import pluginTypescript from "prettier/plugins/typescript";
import { format } from "prettier/standalone";
import { tryCatch } from "./try-catch"; // Added import

/* ============================================================================
   Utility Functions
   ========================================================================== */

/**
 * Generates a string of spaces for a given length.
 * @param length - The number of spaces.
 * @returns A string of spaces.
 */
const createSpaceString = (length: number): string => " ".repeat(length);

/**
 * Removes block comments matching the pattern {/** ...
 * @param code - The code to process.
 * @returns The code without the block comments.
 */
const removeBlockComments = (code: string): string => {
  const blockCommentRegex = /\{\/\*\*([\s\S]*?)\*\/\}/g;
  return code.replace(blockCommentRegex, "");
};

/* ============================================================================
   CSS-in-JS Processing Functions
   ========================================================================== */

/**
 * Formats CSS content within a template literal.
 * It replaces interpolations with placeholders, formats the CSS,
 * then restores the interpolations.
 *
 * @param cssContent - The raw CSS content.
 * @param indent - The indentation string.
 * @returns The formatted CSS content with interpolations restored.
 */
const formatCssContent = (cssContent: string, indent: string): string => {
  const placeholderPrefix = "__INTERPOLATION_PLACEHOLDER_";
  const interpolations: string[] = [];
  let placeholderIndex = 0;

  // Replace interpolations with unique placeholders.
  const contentWithPlaceholders = cssContent.replace(/\${(.*?)}/g, (match) => {
    const placeholder = `${placeholderPrefix}${placeholderIndex}`;
    interpolations.push(match);
    placeholderIndex++;
    return placeholder;
  });

  // Format the CSS content using the emotion prettifier.
  const formattedContent = emotionPrettifier(contentWithPlaceholders)
    .split("\n")
    .map((line) => (line.trim() ? `${indent}  ${line}` : line))
    .join("\n");

  // Restore the interpolations.
  return formattedContent.replace(
    new RegExp(`${placeholderPrefix}\\d+`, "g"),
    (match) => {
      const index = parseInt(match.replace(placeholderPrefix, ""), 10);
      return interpolations[index] || "";
    },
  );
};

/**
 * Adds a default export if none is found in the code.
 *
 * @param code - The code to check.
 * @returns The code with a default export appended if necessary.
 */
const addDefaultExportIfNeeded = (code: string): string => {
  if (
    !code.includes("export default") &&
    !code.includes("export const") &&
    !code.includes("const App")
  ) {
    return `${code}\n\nexport default () => <></>; // Empty default export`;
  }
  return code;
};

/**
 * Processes and formats CSS-in-JS code that uses the css template literal.
 * It also inserts an Emotion import if not present.
 *
 * @param rawCode - The original code string.
 * @returns The processed and formatted code.
 */
export const addSomeFixesIfNeeded = (rawCode: string): string => {
  const code = removeBlockComments(rawCode);
  try {
    const parts = code.split("css`");
    let header = parts.shift() || "";

    // Insert Emotion's css import if it's missing.
    if (
      parts.length && !code.includes("@emotion/react") &&
      !code.includes(" css ")
    ) {
      const [firstLine, ...restLines] = header.split("\n");
      header = (firstLine || "").startsWith("//")
        ? [firstLine, 'import { css } from "@emotion/react";', ...restLines].join(
          "\n",
        )
        : ['import { css } from "@emotion/react";', firstLine, ...restLines]
          .join("\n");
    }

    let currentIndent = (header.split("\n").pop()?.length || 0) + 2;

    // Process each css template literal part.
    const processedSections = parts.map((section) => {
      const [cssContent, afterCss, ...remainingParts] = section.split("`");
      const indent = createSpaceString(currentIndent);
      currentIndent = (afterCss?.split("\n").pop()?.length || 0) + 2;

      const formattedCss = formatCssContent(cssContent || "", indent);
      return `${formattedCss}\n${indent}\`${[afterCss, ...remainingParts].join("`")}`;
    });

    let result = [header, ...processedSections].join("css`\n");
    result = addDefaultExportIfNeeded(result);
    return result;
  } catch (error) {
    console.error("addSomeFixesIfNeeded error", { error, code });
    return code;
  }
};

/* ============================================================================
   Prettier Formatting Functions & Configuration
   ========================================================================== */

/**
 * Prettier configuration for JavaScript/TypeScript.
 */
const prettierConfig: Options = {
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "off",
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: "strict",
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  parser: "typescript",
  singleAttributePerLine: false,
  plugins: [pluginEstree, pluginTypescript],
};

/**
 * Formats JavaScript/TypeScript code using Prettier.
 *
 * @param params.code - The code to format.
 * @param params.toThrow - If true, errors are thrown.
 * @returns The formatted code.
 */
export const prettierJs = async ({
  code,
  toThrow,
}: {
  code: string;
  toThrow: boolean;
}): Promise<string> => {
  const formatPromise = format(code, prettierConfig);
  const { data, error } = await tryCatch(formatPromise);

  if (error) {
    if (toThrow) throw error;
    console.warn(
      "Prettier JS formatting failed, returning original code:",
      error,
    );
    return code;
  }
  return data || code; // Return formatted code or original if data is null/undefined (should not happen with format)
};

/**
 * Formats CSS code using Prettier with a CSS parser.
 *
 * @param inputCSS - The CSS code to format.
 * @returns The formatted CSS.
 */
export const prettierCss = async (inputCSS: string): Promise<string> => {
  const formatPromise = format(inputCSS, {
    parser: "css",
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    singleQuote: false,
    trailingComma: "none",
    plugins: [postCss],
  });
  const { data, error } = await tryCatch(formatPromise);

  if (error) {
    console.warn(
      "Prettier CSS formatting failed, returning original CSS:",
      error,
    );
    return inputCSS;
  }
  return data || inputCSS; // Return formatted CSS or original if data is null/undefined
};
