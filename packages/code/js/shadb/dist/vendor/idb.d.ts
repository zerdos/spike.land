declare function u(value: any): any;
declare function w(value: any): any;
declare function deleteDB1(name: any, { blocked }?: {
    blocked: any;
}): any;
declare function openDB1(name: any, version: any, { blocked, upgrade, blocking, terminated }?: {
    blocked: any;
    upgrade: any;
    blocking: any;
    terminated: any;
}): any;
export { u as unwrap, w as wrap, deleteDB1 as deleteDB, openDB1 as openDB };
