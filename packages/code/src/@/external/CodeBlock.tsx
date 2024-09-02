import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import { FC, memo } from "react";

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  return (
    <div className="mt-5 w-full font-mono text-sm rounded-md overflow-hidden shadow-md">
      <div className="bg-gray-800 text-gray-200 py-2 px-4 text-sm rounded-t-md">
        <span className="lowercase">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        wrapLines
        useInlineStyles
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
