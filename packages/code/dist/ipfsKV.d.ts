export function getIpfsClient(): Promise<{
    /**
 * @param {any} data
 * @param {{ onlyHash: boolean; }} options
 */
    add: (data: any, options: {
        onlyHash: boolean;
    }) => any;
    /**
   *
   * @param {*} files
   */
    addAll: (files: any) => any;
    /**
   *
   * @param {string} cid
   * @param {number} timeout
   */
    get: (cid: string, timeout: number) => any;
}>;
