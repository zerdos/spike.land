export function getZkey(hash: any): Promise<string>;
export function getUserId(): Promise<any>;
export function getCodeToLoad(): Promise<{
    code: any;
}>;
export function getProjects(): Promise<any>;
export function saveCode(code: any): Promise<void>;
