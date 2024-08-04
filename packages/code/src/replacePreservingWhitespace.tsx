// Types
// Utility Functions

export function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string
) {
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(\\s*)${escapedSearch}(\\s*)`, "g");
  return text.replace(regex, (_, preWhitespace, postWhitespace) => {
    return `${preWhitespace}${replace}${postWhitespace}`;
  });
}
