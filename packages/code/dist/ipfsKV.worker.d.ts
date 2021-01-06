/**
 * {
 * create: ()=> Promise<{add: (data: s)=>void }>
 * }
 */
declare const IPFS: any;
/** @type {{ add: (arg0: any, arg1: any) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: any, arg1: { timeout: any; }) => any; }} */
declare let ipfsNode: {
    add: (arg0: any, arg1: any) => PromiseLike<{
        cid: any;
    }> | {
        cid: any;
    };
    addAll: (arg0: any) => any;
    cat: (arg0: any, arg1: {
        timeout: any;
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
    function cat(cid: string, options: any): Promise<{
        path: any;
        CID: any;
    }[]>;
}
