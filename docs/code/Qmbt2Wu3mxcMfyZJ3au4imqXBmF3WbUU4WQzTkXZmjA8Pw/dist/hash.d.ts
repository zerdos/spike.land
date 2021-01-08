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
    onSignal: () => any;
    onError?: () => any;
    onExpired?: () => any;
}): Promise<any>;
