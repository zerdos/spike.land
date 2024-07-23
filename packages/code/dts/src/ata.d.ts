export declare function ata({ code, originToUse, prettierJs, tsx }: {
  code: string;
  originToUse: string;
  prettierJs: (code: string) => Promise<string>;
  tsx: (code: string) => Promise<string[]>;
}): Promise<({
  filePath: string;
  content: string;
} | undefined)[]>;
