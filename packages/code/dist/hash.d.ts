export function sendSignal(signal: string, data: string): Promise<{
    success: boolean;
}>;
export function fetchSignal(signal: string, _retry: number): any;
export function getCharAt(signal: string, i: number): Promise<any>;
