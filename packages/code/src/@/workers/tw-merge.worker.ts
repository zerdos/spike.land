import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ClassNameMerger = typeof cn;

Object.assign(globalThis, { cn });
export default twMerge;
