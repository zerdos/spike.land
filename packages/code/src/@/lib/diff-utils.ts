export const isDiffContent = (content: string): boolean => {
  return content.includes("<<<<<<< SEARCH");
};

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
