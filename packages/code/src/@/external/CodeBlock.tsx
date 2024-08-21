import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import { FC, memo, useMemo, useState } from "react";

import { editor } from "@/external/monacoEditor";
import React, { useEffect, useRef } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

const DiffEditor: React.FC<DiffEditorProps> = ({ original, modified, language = "typescript" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const diffEditor = editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        diffAlgorithm: "advanced",

        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: true,
      });

      const originalModel = editor.createModel(original, language);
      const modifiedModel = editor.createModel(modified, language);

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
};

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

DiffEditor.displayName = "DiffEditor";

const isDiffContent = (content: string): boolean => {
  const diffPattern = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/;
  return diffPattern.test(content);
};

const extractDiffContent = (content: string): { original: string; modified: string } => {
  const [, searchContent, replaceContent] = content.match(
    /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/,
  ) || [];

  return {
    original: searchContent.trim(),
    modified: replaceContent.trim(),
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

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const isDiff = useMemo(() => isDiffContent(value), [value]);
  const diffContent = useMemo(() => isDiff ? extractDiffContent(value) : null, [isDiff, value]);

  return (
    <div className="mt-5 w-full font-mono text-sm rounded-md overflow-hidden shadow-md">
      <CodeBlockHeader language={language} />

      {isDiff && diffContent
        ? (
          <DiffEditor
            original={diffContent.original}
            modified={diffContent.modified}
            language="typescript"
          />
        )
        : (
          <div className="max-h-[400px] overflow-y-auto">
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
              {value}
            </SyntaxHighlighter>
          </div>
        )}
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";

export const CodeTS = memo(({ code }: { code: string }) => <CodeBlock value={code} language="typescript" />);

CodeTS.displayName = "CodeTS";

export default memo(() => {
  const [code, setCode] = useState(``);
  useEffect(() => {
    fetch(`https://testing.spike.land/live/CodeBlock/index.tsx`)
      .then((x) => x.text())
      .then(setCode);
  }, []);
  return <CodeTS code={code} />;
});
