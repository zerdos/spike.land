export declare const startMonaco: ({ code, container, codeSpace, onChange }: {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (_code: string) => void;
}) => Promise<{
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (newCode: string) => void;
}>;
