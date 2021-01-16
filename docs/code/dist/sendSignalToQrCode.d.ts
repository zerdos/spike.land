/**
 * @param {string} rootUrl
 */
export function sendSignalToQrCode(rootUrl: string): Promise<void>;
/**
 * @param {string} hash
 */
export function getZkey(hash: string): Promise<`${string}${any}${any}${any}`>;
