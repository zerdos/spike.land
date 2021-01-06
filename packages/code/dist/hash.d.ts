export function waitForSignal(signal: string): Promise<{
    success: boolean;
} | null>;
export function sendSignal(signal: string): Promise<{
    success: boolean;
} | null>;
