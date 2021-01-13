export function sendSignal(signal: string, data: string): Promise<{
    success: boolean;
}>;
export function fetchSignal(signal: string, _retry: number): Promise<() => Promise<any>>;
export function getNextChar(signal: string): Promise<any>;
