export declare function runner({ code, counter, signal }: {
    code: string;
    codeSpace: string;
    counter: number;
    signal: AbortSignal;
}): Promise<void>;
