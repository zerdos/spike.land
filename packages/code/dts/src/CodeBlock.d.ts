import { FC } from "react";
export declare const generateRandomString: (
  length: number,
  lowercase?: boolean,
) => string;
interface languageMap {
  [key: string]: string | undefined;
}
export declare const programmingLanguages: languageMap;
interface Props {
  language: string;
  value: string;
}
export declare const CodeBlock: FC<Props>;
export declare const CodeTS: ({ code }: {
  code: string;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: () => import("@emotion/react/jsx-runtime").JSX.Element;
export default _default;
