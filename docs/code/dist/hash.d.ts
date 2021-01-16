export function sendSignal(signal: string, data: string): Promise<"no webpack please" | {
    success: boolean;
}>;
export function fetchSignal(signal: string, _retry: number): Promise<() => any>;
