declare function unwrap1(value: any): any;
declare function wrap1(value: any): any;
declare function deleteDB1(name: any, { blocked }?: {
  blocked: any;
}): any;
declare function openDB1(
  name: any,
  version: any,
  { blocked, upgrade, blocking, terminated }?: {
    blocked: any;
    upgrade: any;
    blocking: any;
    terminated: any;
  },
): any;
export {
  deleteDB1 as deleteDB,
  openDB1 as openDB,
  unwrap1 as unwrap,
  wrap1 as wrap,
};
