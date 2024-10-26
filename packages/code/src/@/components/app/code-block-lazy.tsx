import type { CodeBlockProps } from "@/external/CodeBlock";
import { lazy, Suspense } from "react";
import type { FC } from "react";

const CodeBlockLazy = lazy(() =>
  import("@/external/CodeBlock").then((module) => ({
    default: module.CodeBlock,
  }))
);

export const CodeBlock: FC<CodeBlockProps> = ({ language, value, title }) => (
  <Suspense fallback={<pre>{value}</pre>}>
    <CodeBlockLazy language={language} value={value} title={title} />
  </Suspense>
);
