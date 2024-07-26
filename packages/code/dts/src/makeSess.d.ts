import { applyPatch as aPatch, Delta } from "./textDiff";
export { aPatch };
export declare function applyCodePatch(
  sess: ICodeSession,
  mess: CodePatch,
): ICodeSession;
export declare const makeHash: (cx: ICodeSession) => string;
export declare const makeSession: (p?: Partial<ICodeSession>) => ICodeSession;
export type CodePatch = {
  oldHash: string;
  newHash: string;
  patch: Delta[];
  reversePatch: Delta[];
};
export declare const createPatch: (
  oldSess: ICodeSession,
  newSess: ICodeSession,
) => CodePatch;
export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
};
export declare function string_(s: ICodeSession): string;
