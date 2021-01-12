declare const searchRegExp2: RegExp;
declare const replace2: "$&https://cdn.skypack.dev/";
declare const searchRegExp: RegExp;
declare const searchRegExpMotion: RegExp;
declare const replaceWith: "";
/**
 * @param {string} code
 *  @param {boolean} hasToReport
 */
declare function transform(code: string, hasToReport: boolean): any;
declare namespace BabeWorker {
    function transform(code: string): any;
}
