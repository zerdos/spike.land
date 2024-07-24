// ArtifactManager.tsx

import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Artifact {
  identifier: string;
  type: string;
  language: string;
  title: string;
  content: string;
}

interface ArtifactManagerProps {
  rawContent: string;
}

const ArtifactManager: React.FC<ArtifactManagerProps> = ({ rawContent }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    const extractedArtifacts = extractArtifacts(rawContent);
    setArtifacts(extractedArtifacts);
  }, [rawContent]);

  const extractArtifacts = (content: string): Artifact[] => {
    const artifactRegex =
      /<antArtifact\s+identifier="([^"]+)"\s+type="([^"]+)"\s+language="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/antArtifact>/g;
    const extractedArtifacts: Artifact[] = [];
    let match;

    while ((match = artifactRegex.exec(content)) !== null) {
      extractedArtifacts.push({
        identifier: match[1],
        type: match[2],
        language: match[3],
        title: match[4],
        content: match[5].trim(),
      });
    }

    return extractedArtifacts;
  };

  return (
    <div>
      {artifacts.map((artifact, index) => (
        <div key={index} className="mb-6 border rounded p-4">
          <h2 className="text-xl font-bold mb-2">{artifact.title}</h2>
          <p>
            <strong>Identifier:</strong> {artifact.identifier}
          </p>
          <p>
            <strong>Type:</strong> {artifact.type}
          </p>
          <p>
            <strong>Language:</strong> {artifact.language}
          </p>
          <SyntaxHighlighter language={artifact.language} style={tomorrow}>
            {artifact.content}
          </SyntaxHighlighter>
        </div>
      ))}
    </div>
  );
};

export default ArtifactManager;
