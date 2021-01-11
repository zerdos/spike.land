export function waitForSignal(signal: string): Promise<{
    success: boolean;
} | {
    success: boolean;
}>;
export function sendSignal(signal: string): Promise<{
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
