/**
 * @param {any} data
 * @param {any} onlyHash
 */
export function hash(data: any, onlyHash: any): Promise<[any, any, any, any, any, any, any] | null>;
/**
 * @param {string} cid
 * @param {number|undefined} _timeOut
 */
export function getHash(cid: string, _timeOut: number | undefined): Promise<string | any[] | null | undefined>;
