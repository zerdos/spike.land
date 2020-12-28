declare let ipfsNode: any;
declare namespace ipfsKV {
    function add(data: any, options: any): Promise<any>;
    function addAll(files: any): Promise<{
        path: any;
        CID: any;
    }[] | {
        e: any;
    }>;
    function get(cid: any, timeout: any): Promise<string>;
}
