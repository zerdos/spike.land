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
   * @param {{
   *          offset?: number;
   *          length?: number;
   *          timeout?: 	number;
   *         signal?: 	AbortSignal;
    *        }}  options
   */
    cat: (cid: string, { timeout }: {
        offset?: number;
        length?: number;
        timeout?: number;
        signal?: AbortSignal;
    }) => any;
    /**
   *
   * @param {string} cid
   * @param {{
   *          offset?: number;
   *          length?: number;
   *          timeout?: 	number;
   *         signal?: 	AbortSignal;
    *        }}  options
   */
    getData: (cid: string, { timeout }: {
        offset?: number;
        length?: number;
        timeout?: number;
        signal?: AbortSignal;
    }) => any;
    pubsubSubscribe: (topic: string) => any;
}>;
