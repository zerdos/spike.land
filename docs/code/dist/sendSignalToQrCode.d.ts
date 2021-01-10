export function sendSignalToQrCode(): Promise<void>;
/**
 * @param {string} hash
 */
export function getZkey(hash: string): Promise<string>;
export function addDataToSignal(signal: string, _data: any): Promise<Response>;
