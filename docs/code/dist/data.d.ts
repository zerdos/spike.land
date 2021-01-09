/**
 * @param {string} hash
 */
export function getZkey(hash: string): Promise<string>;
export function getUserId(): Promise<any>;
/**
 *
 * @param {string} rootURL
 */
export function getIPFSCodeToLoad(rootURL: string): Promise<{
    code: string;
    versions: any;
    transpiled: string;
    html: string;
}>;
export function getCodeToLoad(): Promise<{
    code: any;
    transpiled: any;
    html: any;
    versions: any;
}>;
export function getProjects(): Promise<any>;
export function saveCode(opts: {
    i?: number | undefined;
    unmount?: (() => void) | undefined;
    hydrated?: boolean | undefined;
    preRendered?: boolean | undefined;
    lastErrors?: number | undefined;
    rootElement?: null | undefined;
    div?: HTMLDivElement | undefined;
    html: any;
    versions: any;
    ipfs?: number | undefined;
    transpiled: any;
    code: any;
}, counter: number): void;
