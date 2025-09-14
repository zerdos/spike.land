import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";

export interface MarkdownTextProps extends ComponentPropsWithoutRef<typeof MarkdownTextPrimitive> {
  className?: string;
}

export function MarkdownText({ className, ...props }: MarkdownTextProps) {
  return (
    <MarkdownTextPrimitive
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:font-semibold",
        "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
        "prose-p:leading-relaxed",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-blockquote:border-l-4 prose-blockquote:border-muted-foreground/30",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:marker:text-muted-foreground",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-lg",
        "prose-table:border prose-table:border-border",
        "prose-th:bg-muted prose-th:font-semibold",
        "prose-td:border prose-td:border-border",
        className,
      )}
      {...props}
    />
  );
}
