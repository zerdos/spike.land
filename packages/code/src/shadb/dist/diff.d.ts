export function diff(str1: any, str2: any): Promise<{
  b: string;
  c: any;
}>;
export function isDiff(str: any): boolean;
export function assemble(oldValue: any, instructions: any): string;
