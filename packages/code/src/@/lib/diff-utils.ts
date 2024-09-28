import { extractDiffContent } from "@/lib/diff-utils";

export const isDiffContent = (content: string): boolean => {
  if (content.includes("<<<<<<< SEARCH")) {
    // const {original, modified } = extractDiffContent(content + "\nFoo_bar_baz");
    // if (original && modified && !original.includes('Foo_bar_baz') && !modified.includes('Foo_bar_baz')) {
    //   return true;
    // }
  }
  return false;
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
