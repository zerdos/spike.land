import { cn } from "@/lib/utils";
import {md5} from "@/lib/md5";
import Markdown from "@/external/Markdown";  
import { DiffEditor } from "@src/components/DiffEditor";
import {CodeBlock} from "@/external/CodeBlock";
import {extractDiffContent, isDiffContent} from "@/lib/diff-utils";

export const renderCode = (value: string, language: string, type: string): JSX.Element => {
  if (value.trim().length === 0) {
    return <></>;
  }
  const key = md5(`${value}${language}`);

  if (value.trim().length < 20) {
    return <pre key={key}>{value.trim()}</pre>;
  }

  if (type === "text") {
    return (
      <Markdown
        key={key}
        className={cn(
          "mt-3 mb-3 font-sans text-sm leading-normal tracking-wide",
          // You can add additional classes or dynamic classes here
        )}
      >
        {value}
      </Markdown>
    );
  }

  if (isDiffContent(value)) {
    const { original, modified } = extractDiffContent(value);
    return <DiffEditor key={key} original={original} modified={modified} language={language} />;
  }

  return <CodeBlock key={key} value={value} language={language} />;
};