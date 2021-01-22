/**
 * @typedef {Error|ErrorData} EncodedError
 *
 * Properties added by err-code library
 * @typedef {Object} ErrorExtension
 * @property {string} [code]
 * @property {string} [detail]
 */
/**
 * @typedef {Error & ErrorExtension} ExtendedError
 */
/**
 * @typedef {Object} ErrorData
 * @property {string} name
 * @property {string} message
 * @property {string|undefined} stack
 * @property {string|undefined} code
 * @property {string|undefined} detail
 *
 * @param {ExtendedError} error
 * @returns {EncodedError}
 */
export function encodeError(error: ExtendedError): EncodedError;
/**
 * @param {EncodedError} error
 * @returns {Error}
 */
export function decodeError(error: EncodedError): Error;
/**
 * Properties added by err-code library
 */
export type EncodedError = Error | ErrorData;
export type ErrorExtension = {
  code?: string | undefined;
  detail?: string | undefined;
};
export type ExtendedError = Error & ErrorExtension;
export type ErrorData = {
  name: string;
  message: string;
  stack: string | undefined;
  code: string | undefined;
  detail: string | undefined;
};
//# sourceMappingURL=error.d.ts.map
