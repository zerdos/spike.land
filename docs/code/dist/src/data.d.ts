export function getZkey(hash: any): Promise<string>;
export function getUserId(): Promise<any>;
export function getCodeToLoad(): Promise<{
    code: any;
    transpiled: any;
    html: any;
    versions: any;
} | undefined>;
export function getProjects(): Promise<any>;
export function saveCode({ code, html, transpiled, versions }: {
    code: any;
    html: any;
    transpiled: any;
    versions: any;
}): Promise<void>;
