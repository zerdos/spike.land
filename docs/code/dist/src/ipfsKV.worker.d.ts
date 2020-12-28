declare let ipfsNode: any;
declare namespace ipfsKV {
    function add(data: any, options: any): Promise<any>;
    function addAll(files: any): Promise<any>;
    function get(cid: any, timeout: any): Promise<string>;
}
