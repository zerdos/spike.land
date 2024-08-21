import { IconCheck, IconClipboard, IconDownload } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";

import { css } from "@emotion/react";
import MonacoEditor from "@monaco-editor/react";
import { useTranslation } from "next-i18next";

// ... (keep the existing imports and helper functions)

interface Props {
  language: string;
  value: string;
}

const DiffEditor: FC<{ original: string; modified: string; language: string }> = ({
  original,
  modified,
  language,
}) => {
  return (
    <MonacoEditor
      height="300px"
      language={language}
      theme="vs-dark"
      original={original}
      modified={modified}
      options={{
        readOnly: true,
        renderSideBySide: false,
        minimap: { enabled: false },
      }}
    />
  );
};

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

export const CodeBlock: FC<Props> = ({ language, value }) => {
  const { t } = useTranslation("markdown");
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const downloadAsFile = () => {
    // ... (keep the existing downloadAsFile function)
  };

  const isDiff = isDiffContent(value);

  return (
    <div
      css={css`
        margin-top: 20px;
        max-width: 568px;
      `}
      className="codeblock relative font-sans text-[16px]"
    >
      <div
        css={css`
          background-color: darkred;
          font-size: 2rem;
          :hover {
            cursor: pointer;
          }
        `}
        className="flex items-center justify-between"
      >
        <span className="text-xs lowercase text-white">{language}</span>
        <div
          css={css`
            background-color: navy;
          `}
          className="flex items-center"
        >
          <button
            className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-white"
            onClick={copyToClipboard}
          >
            {isCopied ? <IconCheck size={18} /> : <IconClipboard size={18} />}
            {isCopied ? t("Copied!") : t("Copy code")}
          </button>
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-white"
            onClick={downloadAsFile}
          >
            <IconDownload size={18} />
          </button>
        </div>
      </div>

      {isDiff
        ? (
          <DiffEditor
            original={extractDiffContent(value).original}
            modified={extractDiffContent(value).modified}
            language={language}
          />
        )
        : (
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{ margin: 0, fontSize: 12 }}
          >
            {value}
          </SyntaxHighlighter>
        )}
    </div>
  );
};

export const CodeTS = ({ code }: { code: string }) => <CodeBlock value={code} language="typescript" />;

export default () => {
  const [code, setCode] = useState(``);
  useEffect(() => {
    fetch(`https://testing.spike.land/live/CodeBlock/index.tsx`)
      .then((x) => x.text())
      .then(setCode);
  });
  return <CodeTS code={code} />;
};
