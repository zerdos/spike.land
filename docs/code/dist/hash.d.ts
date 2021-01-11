export function waitForSignal(signal: string): Promise<string | {
    success: boolean;
} | {
    success: boolean;
}>;
export function sendSignal(signal: string, data: string): Promise<{
    success: boolean;
}>;
export function waitForSignalAndJump(url: string): Promise<void>;
export function waitForSignalAndRun({ signal, onSignal, onError, onExpired }: {
    signal: string;
    onSignal: (getData: () => any) => any;
    onError?: (() => any) | undefined;
    onExpired?: (() => any) | undefined;
}): Promise<any>;
export function getNextChar(signal: string): Promise<any>;
