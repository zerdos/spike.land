import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import {
  ClipboardDocumentIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/20/solid";
import type { FC } from "react";
import { memo, useState } from "react";

export interface CodeBlockProps {
  language: string;
  value: string;
  title: string | undefined;
}

export const CodeBlock: FC<CodeBlockProps> = memo(
  ({ language, value, title }) => {
    const [copied, setCopied] = useState(false);
    const [iconIndex, setIconIndex] = useState(0);
    const icons: React.ElementType[] = [
      ClipboardIcon,
      DocumentDuplicateIcon,
      ClipboardDocumentIcon,
    ];
    const Icon = icons[iconIndex]!;
    return (
      <div className="w-full font-mono text-sm rounded-lg overflow-hidden shadow-lg bg-gray-900 p-4">
        <div className="bg-gray-800 text-gray-200 py-3 px-4 text-sm rounded-t-lg flex justify-between items-center">
          <span className="lowercase">{language}</span>
          {title && <span className="font-semibold">{title}</span>}
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white ml-2 transition-colors duration-200 p-1 rounded-md hover:bg-gray-700"
              onClick={() => {
                navigator.clipboard.writeText(value);
                setCopied(true);
                setTimeout(() => setCopied(false), 200);
                setIconIndex((iconIndex + 1) % icons.length);
              }}
            >
              <Icon className="w-8 h-6" />
            </button>
            {copied && (
              <div className="absolute right-0 mt-2 py-1 px-2 bg-gray-700 text-white text-xs rounded-md shadow-lg">
                Copied!
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-800 rounded-b-lg p-4 mt-[-1px]">
          <SyntaxHighlighter
            language={language}
            style={{
              ...tomorrow,
              'pre[class*="language-"]': {
                ...tomorrow['pre[class*="language-"]'],
                // background: "transparent",
                padding: "12px",
                borderRadius: 8,
                margin: "0",
              },
              'code[class*="language-"]': {
                ...tomorrow['code[class*="language-"]'],
                color: "#e2e8f0",
              },
            }}
            useInlineStyles={true}
            showLineNumbers={false}
            wrapLines={true}
            wrapLongLines={true}
          >
            {value.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  },
);

const ExampleCodeBlock = () => (
  <div className="p-4 bg-gray-950 rounded-xl">
    <CodeBlock
      value={`

`}
      language="typescript"
      title="Example Code"
    />
  </div>
);

export default ExampleCodeBlock;
