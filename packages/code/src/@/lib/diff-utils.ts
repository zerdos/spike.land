export const isDiffContent = (content: string): boolean => {
  return content.includes("<<<<<<< SEARCH") || content.includes("=======")
    || content.includes(">>>>>>> REPLACE");
};

export function extractDiffContent(
  content: string,
): { original: string; modified: string } {
  const searchMarker = "<<<<<<< SEARCH";
  const separatorMarker = "=======";
  const replaceMarker = ">>>>>>> REPLACE";

  let original = "";
  let modified = "";

  const searchIndex = content.indexOf(searchMarker);
  if (searchIndex !== -1) {
    const separatorIndex = content.indexOf(separatorMarker, searchIndex);
    const replaceIndex = content.indexOf(replaceMarker, separatorIndex);

    if (separatorIndex !== -1) {
      original = content.slice(
        searchIndex + searchMarker.length,
        separatorIndex,
      ).split(separatorMarker).join("").trim();
      if (replaceIndex !== -1) {
        modified = content.slice(
          separatorIndex + separatorMarker.length,
          replaceIndex,
        ).split(separatorMarker).join("").trim();
      } else {
        modified = content.slice(separatorIndex + separatorMarker.length).split(separatorMarker).join("")
          .trim();
      }
    } else {
      original = content.slice(searchIndex + searchMarker.length).split(separatorMarker).join("").trim();
    }
  }

  return { original, modified };
}

export function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string,
) {
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `(\\s*)(${escapedSearch.replace(/\s+/g, "\\s+")})([\\s]*)`,
    "g",
  );
  return text.replace(regex, (_, preWhitespace, _match, postWhitespace) => {
    return `${preWhitespace}${replace}${postWhitespace}`;
  });
}
