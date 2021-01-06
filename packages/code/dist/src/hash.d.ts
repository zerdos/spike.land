export function waitForSignal(signal: string): Promise<{
    success: boolean;
} | {
    success: boolean;
}>;
export function sendSignal(signal: string): Promise<{
    success: boolean;
}>;
export function waitForSignalAndJump(url: string): Promise<void>;
