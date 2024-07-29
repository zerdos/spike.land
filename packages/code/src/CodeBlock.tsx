import { IconCheck, IconClipboard, IconDownload } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
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
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

interface Props {
  language: string;
  value: string;
}
// const SyntaxHighlighter = Prism as unknown as FC<SyntaxHighlighterProps>;

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
    const fileExtension = programmingLanguages[language] || ".file";
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt(t("Enter file name") || "", suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div
      css={css`
  max-width: 568px;
    `}
      className="codeblock relative font-sans text-[16px]"
    >
      <div
        css={css`
                background-color: darkred;
                font-size: 2rem;
                :hover{
                  cursor:pointer;
                }
              `}
        className="flex items-center justify-between "
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

      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{ margin: 0, fontSize: 12 }}
      >
        {value}
      </SyntaxHighlighter>
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
