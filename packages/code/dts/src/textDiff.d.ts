type Diff = [-1 | 0 | 1, string];
export type Delta = Diff | [0 | -1, number];
export declare function createDelta(original: string, revision: string): Delta[];
export declare function applyPatch(original: string, delta: Delta[]): string;
export {};
