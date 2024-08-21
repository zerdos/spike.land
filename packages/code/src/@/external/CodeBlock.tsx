import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import { FC, memo, useCallback, useEffect, useState } from "react";

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
};

interface Props {
  language: string;
  value: string;
}

const CodeBlockHeader: FC<{ language: string }> = memo(({ language }) => {
  return (
    <div className="bg-gray-800 text-gray-200 py-2 px-4 text-sm rounded-t-md">
      <span className="lowercase">{language}</span>
    </div>
  );
});

CodeBlockHeader.displayName = "CodeBlockHeader";

const StreamingSyntaxHighlighter: FC<{ language: string; value: string }> = memo(({ language, value }) => {
  const [renderedValue, setRenderedValue] = useState("");

  useEffect(() => {
    let isMounted = true;
    const renderChunks = async () => {
      const chunkSize = 100;
      for (let i = 0; i < value.length; i += chunkSize) {
        if (!isMounted) break;
        const chunk = value.slice(0, i + chunkSize);
        setRenderedValue(chunk);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      if (isMounted) setRenderedValue(value);
    };
    renderChunks();
    return () => {
      isMounted = false;
    };
  }, [value]);

  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      customStyle={{
        margin: 0,
        padding: "1rem",
        fontSize: "0.875rem",
        lineHeight: 1.5,
      }}
    >
      {renderedValue}
    </SyntaxHighlighter>
  );
});

StreamingSyntaxHighlighter.displayName = "StreamingSyntaxHighlighter";

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  return (
    <div className="mt-5 w-full font-mono text-sm rounded-md overflow-hidden shadow-md">
      <CodeBlockHeader language={language} />

      <div className="max-h-[400px] overflow-y-auto">
        <StreamingSyntaxHighlighter language={language} value={value} />
      </div>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";

export const CodeTS: FC<{ code: string }> = memo(({ code }) => <CodeBlock value={code} language="typescript" />);

CodeTS.displayName = "CodeTS";

export default memo(() => {
  const [code, setCode] = useState("");

  const fetchCode = useCallback(async () => {
    try {
      const response = await fetch(`https://testing.spike.land/live/CodeBlock/index.tsx`);
      const text = await response.text();
      setCode(text);
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  }, []);

  useEffect(() => {
    fetchCode();
  }, [fetchCode]);

  return <CodeTS code={code} />;
});
