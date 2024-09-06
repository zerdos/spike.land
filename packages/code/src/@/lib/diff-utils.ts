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
