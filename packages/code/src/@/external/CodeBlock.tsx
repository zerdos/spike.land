import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "@/external/reactSyntaxHighlighter";
import { tomorrow } from "@/external/reactSyntaxHighlighterPrism";
import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import { Check, Clipboard, Download } from "lucide-react";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";

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

const DiffEditor: FC<{ original: string; modified: string }> = ({ original, modified }) => {
  console.log({ original, modified });
  return (
    <MonacoDiffEditor
      height="200px"
      width="500px"
      language="typescript"
      original={original}
      modified={modified}
      theme="vs-dark"
      options={{
        readOnly: true,
        lineNumbers: "off",
        renderSideBySide: false,
        scrollBeyondLastLine: false,

        minimap: { enabled: false },
        diffWordWrap: "off",
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
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || ".file";
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt(t("Enter file name") || "", suggestedFileName);

    if (!fileName) {
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

  const isDiff = isDiffContent(value);

  return (
    <Card className="mt-5 max-w-[568px] font-sans text-base">
      <CardHeader className="flex flex-row items-center justify-between bg-red-900 py-2">
        <span className="text-xs lowercase text-white">{language}</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-800"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check className="h-4 w-4 mr-1" /> : <Clipboard className="h-4 w-4 mr-1" />}
            {isCopied ? t("Copied!") : t("Copy code")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-800"
            onClick={downloadAsFile}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isDiff
          ? (
            <DiffEditor
              original={extractDiffContent(value).original}
              modified={extractDiffContent(value).modified}
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
      </CardContent>
    </Card>
  );
};

export const CodeTS = ({ code }: { code: string }) => <CodeBlock value={code} language="typescript" />;

export default () => {
  const [code, setCode] = useState("");
  useEffect(() => {
    fetch(`https://testing.spike.land/live/CodeBlock/index.tsx`)
      .then((x) => x.text())
      .then(setCode);
  }, []);
  return <CodeTS code={code} />;
};
