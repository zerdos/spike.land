export const isDiffContent = (content: string): boolean => {
  return content.includes("<<<<<<< SEARCH") || content.includes("=======") ||
    content.includes(">>>>>>> REPLACE");
};

export function extractDiffContent(
  content: string,
): { original: string; modified: string; } {
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
        modified = content.slice(separatorIndex + separatorMarker.length).split(
          separatorMarker,
        )
          .join("")
          .trim();
      }
    } else {
      original = content.slice(searchIndex + searchMarker.length).split(
        separatorMarker,
      ).join("")
        .trim();
    }
  }

  return { original, modified };
}
export function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string,
): string {
  // Handle SEARCH/REPLACE comments
  if (search.includes("// ... (")) {
    const lines = search.split("\n");
    const searchStart = lines[0];
    const searchEnd = lines[lines.length - 1];

    const startIndex = text.indexOf(searchStart);
    if (startIndex === -1) return text;

    const endIndex = text.indexOf(searchEnd, startIndex + searchStart.length);
    if (endIndex === -1) return text;

    return replace;
  }

  // For regular text replacement
  if (!search) return text;

  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");

  const regex = new RegExp(`${escapedSearch}`, "g");
  return text.replace(regex, replace);
}
