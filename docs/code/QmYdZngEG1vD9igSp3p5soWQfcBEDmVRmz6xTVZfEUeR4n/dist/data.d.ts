/**
 * @param {string} hash
 */
export function getZkey(hash: string): Promise<string>;
export function getUserId(): Promise<any>;
export function getCodeToLoad(): Promise<{
    code: any;
    transpiled: any;
    html: any;
    versions: any;
}>;
export function getProjects(): Promise<any>;
export function saveCode(opts: {
    code: string;
    html: string;
    transpiled: string;
    versions: string;
}): void;
