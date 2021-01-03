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
    function add(data: any, options: {
        onlyHash: any;
    }): Promise<any>;
    function addAll(files: any): Promise<{
        path: any;
        CID: any;
    }[] | {
        e: any;
    }>;
    function get(cid: string, timeout: number): Promise<string>;
}
