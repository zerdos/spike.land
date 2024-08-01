import prettier from "prettier";

export const prettierToThrow = async ({ code, toThrow }: { code: string; toThrow: boolean }): Promise<string> => {
  try {
    const formattedCode = await prettier.format(code, {
      parser: "typescript",
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
    });
    return formattedCode;
  } catch (error) {
    if (toThrow) {
      throw error;
    }
    return code;
  }
};
