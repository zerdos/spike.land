import type { ClassNameMerger } from "@/workers/tw-merge.worker";
import tw from "@/workers/tw-merge.worker";
import type { ClassValue } from "class-variance-authority/types";
interface GlobalThisWithClassNameMerger {
  cn: ClassNameMerger;
}

export function cn(...inputs: ClassValue[]) {
  return (globalThis as unknown as GlobalThisWithClassNameMerger).cn(inputs);
}
export default tw;
