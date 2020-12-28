export function getIpfsClient(): Promise<{
    add: (data: any, options: any) => any;
    addAll: (files: any) => any;
    get: (cid: any, timeout: any) => any;
}>;
