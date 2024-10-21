// diff-editor.tsx
import type { FC } from "react";
import { diffLines as d } from "diff";

interface DiffViewerProps {
  original: string;
  modified: string;
}

export const DiffViewer: FC<DiffViewerProps> = ({ original, modified }) => (
  <pre className="font-mono text-xs whitespace-pre-wrap break-words bg-gray-700 p-4 rounded-md">
    {d(original ?? "", modified ?? original).map((part, index) => (
      <span
        key={index}
        className={`text-gray-200
          ${part.added ? "bg-green-200 text-green-800" : ""}
          ${part.removed ? "bg-red-200 text-red-800" : ""}
        `}
      >
        {part.value}
      </span>
    ))}
  </pre>
);
const original = `
<DiffContainer>
  {diff.map((part, index) => (
    <DiffPart key={index} added={part.added} removed={part.removed}>
      {part.value}
    </DiffPart>
  ))}
</DiffContainer>
`;

const modified = `
<DiffContainer>
  {diff.map((part, index) => (
    <DiffPart key={index} added={part.added} removed={part.removed}>

    </DiffPart>
  ))}
</DiffContainer>
`;

const DiffEditor: FC = () => <DiffViewer original={original} modified={modified} />;

export default DiffEditor;
