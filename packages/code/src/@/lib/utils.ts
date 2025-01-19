import type { ClassNameMerger } from "@/workers/tw-merge.worker";

interface GlobalThisWithClassNameMerger {
  cn: ClassNameMerger;
}

export const { cn } = globalThis as unknown as GlobalThisWithClassNameMerger;
