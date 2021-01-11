declare const IPFS: any;
/** @type {{ add: (arg0: string, arg1: { onlyHash: boolean; }) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; get: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; }} */
declare let ipfsNode: {
    add: (arg0: string, arg1: {
        onlyHash: boolean;
    }) => PromiseLike<{
        cid: any;
    }> | {
        cid: any;
    };
    addAll: (arg0: any) => any;
    cat: (arg0: string, arg1: {
        offset?: number | undefined;
        length?: number | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }) => any;
    get: (arg0: string, arg1: {
        offset?: number | undefined;
        length?: number | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }) => any;
};
declare namespace ipfsKV {
    function add(data: string, options: {
        onlyHash: boolean;
    }): Promise<any>;
    function addAll(files: any): Promise<{
        path: any;
        CID: any;
    }[] | {
        e: any;
    }>;
    function cat(cid: string, options: {
        offset?: number | undefined;
        length?: number | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<string>;
    function getData(cid: string, options: {
        offset?: number | undefined;
        length?: number | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<string>;
}
