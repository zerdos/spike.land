/**
 * @param {any} data
 * @param {any} onlyHash
 */
export function hash(data: any, onlyHash: any): Promise<[any, any, any, any, any, any, any] | null>;
/**
 * @param {any} cid
 * @param {any} timeout
 */
export function getHash(cid: any, timeout: any): Promise<string | any[] | null | undefined>;
