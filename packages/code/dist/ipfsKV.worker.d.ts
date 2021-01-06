declare const IPFS: any;
/** @type {{ add: (arg0: any, arg1: any) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (cid: string, options: { offset?: number;  length?: number; timeout?: 	number;         signal?: 	AbortSignal;        } ) => AsyncIterable<Uint8Array> }} */
declare let ipfsNode: {
    add: (arg0: any, arg1: any) => PromiseLike<{
        cid: any;
    }> | {
        cid: any;
    };
    addAll: (arg0: any) => any;
    cat: (cid: string, options: {
        offset?: number;
        length?: number;
        timeout?: number;
        signal?: AbortSignal;
    }) => AsyncIterable<Uint8Array>;
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
    }): Promise<string | {
        e: any;
    }>;
}
