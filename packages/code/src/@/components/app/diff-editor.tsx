import { diffLines } from "diff";

interface DiffViewerProps {
  original: string;
  modified: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => (
  <pre className="font-mono whitespace-pre-wrap break-words bg-gray-800 p-4 rounded-md">
    {diffLines(original || "", modified || original).map((part, index) => (
      <span
        key={index}
        className={`
          ${part.added ? "bg-green-100 text-green-700" : ""}
          ${part.removed ? "bg-red-100 text-red-700" : ""}
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
      {part.value}
    </DiffPart>
  ))}
</DiffContainer>
`;

export default () => <DiffViewer original={original} modified={modified} />;
