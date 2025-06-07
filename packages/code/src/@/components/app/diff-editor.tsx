// diff-editor.tsx
import { useDarkMode } from "@/hooks/use-dark-mode";
import { cn } from "@/lib/utils";
import { diffLines as d } from "diff";
import type { FC } from "react";

interface DiffViewerProps {
  original: string;
  modified: string;
}

export const DiffViewer: FC<DiffViewerProps> = ({ original, modified }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md shadow-md transition-all duration-300",
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 to-gray-100",
      )}
    >
      <pre
        className={cn(
          "font-mono text-sm whitespace-pre-wrap break-words p-6 overflow-x-auto",
          isDarkMode ? "text-gray-300" : "text-gray-700",
        )}
      >
         {d(original ?? "", ((modified ?? original))).map((part: {
          value: string;
          added?: boolean;
          removed?: boolean;
         }, index: number) => (
           <span
             key={index}
             className={cn("transition-colors duration-200", {
              "bg-emerald-900/50 text-emerald-200": part.added && isDarkMode,
              "bg-emerald-100/50 text-emerald-800": part.added && !isDarkMode,
              "bg-rose-900/50 text-rose-200": part.removed && isDarkMode,
              "bg-rose-100/50 text-rose-800": part.removed && !isDarkMode,
              "hover:bg-gray-200/10": !part.added && !part.removed,
            })}
          >
            {part.value}
          </span>
        ))}
      </pre>
    </div>
  );
};
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
