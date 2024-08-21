import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import { FC, memo, useCallback, useMemo, useState } from "react";

import { editor } from "@/external/monacoEditor";
import React, { useEffect, useRef } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

const DiffEditor: React.FC<DiffEditorProps> = memo(({ original, modified, language = "typescript" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const diffEditor = editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        diffAlgorithm: "legacy",
        readOnly: true,
        diffWordWrap: "off",
        lineNumbers: "off",
        diffCodeLens: false,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: true,
      });

      const originalModel = editor.createModel(original, "diff");
      const modifiedModel = editor.createModel(modified, "diff");

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });

      return () => {
        diffEditor.dispose();
        originalModel.dispose();
        modifiedModel.dispose();
      };
    }
  }, [original, modified, language]);

  return <div ref={containerRef} style={{ width: "100%", height: "200px", maxHeight: "400px" }} />;
});

DiffEditor.displayName = "DiffEditor";

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

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

const isDiffContent = (content: string): boolean => {
  return content.includes("<<<<<<< SEARCH");
};

const extractDiffContent = (content: string): { original: string; modified: string } => {
  const [, searchContent, replaceContent] = content.match(
    /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/,
  ) || [];

  return {
    original: (searchContent || " ").trim(),
    modified: (replaceContent || " ").trim(),
  };
};

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
  const isDiff = useMemo(() => isDiffContent(value), [value]);
  const diffContent = useMemo(() => isDiff ? extractDiffContent(value) : null, [isDiff, value]);

  return (
    <div className="mt-5 w-full font-mono text-sm rounded-md overflow-hidden shadow-md">
      <CodeBlockHeader language={language} />

      {isDiff && diffContent
        ? (
          <DiffEditor
            original={diffContent.original || ""}
            modified={diffContent.modified || ""}
            language="typescript"
          />
        )
        : (
          <div className="max-h-[400px] overflow-y-auto">
            <StreamingSyntaxHighlighter language={language} value={value} />
          </div>
        )}
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
