interface Artifact {
  identifier: string;
  type: string;
  language: string;
  title: string;
  content: string;
}

export const extractArtifacts = (content: string): Artifact[] => {
  const artifactRegex =
    /<antArtifact\s+identifier="([^"]+)"\s+type="([^"]+)"\s+language="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/antArtifact>/g;
  const extractedArtifacts: Artifact[] = [];
  let match;

  while ((match = artifactRegex.exec(content)) !== null) {
    extractedArtifacts.push({
      identifier: match[1]!,
      type: match[2]!,
      language: match[3]!,
      title: match[4]!,
      content: match[5]!.trim(),
    });
  }

  return extractedArtifacts;
};
