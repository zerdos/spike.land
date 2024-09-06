export const isDiffContent = (content: string): boolean => {
  return content.includes("<<<<<<< SEARCH");
};

export const extractDiffContent = (content: string): { original: string; modified: string } => {
  const original = content.split("=======")[0]?.split("<<<<<<< SEARCH")[1]?.trim() || "";
  const modified = content.split("=======")[1]?.split(">>>>>>> REPLACE")[0]?.trim() || "";

  return {
    original,
    modified,
  };
};

export function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string,
) {
  if (replace.startsWith("//")) {
    const firstLine = replace.split("\n")[0];
    if (firstLine.includes(".tsx")) {
      const codeSpace = firstLine.split(".tsx")[0].split(" ")[1];
      const session = {
        code: replace,
        transpiled: "",
        html: "",
        css: "",
      };
      fetch(`/live/${codeSpace}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });
      replace = "";
    }
  }
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `(\\s*)(${escapedSearch.replace(/\s+/g, "\\s+")})([\\s]*)`,
    "g",
  );
  return text.replace(regex, (_, preWhitespace, _match, postWhitespace) => {
    return `${preWhitespace}${replace}${postWhitespace}`;
  });
}
