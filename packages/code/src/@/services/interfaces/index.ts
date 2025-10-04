/**
 * Central export point for all dependency injection interfaces
 */

export type { ILogger, ILogContext } from "./ILogger";
export type {
  IValidator,
  IValidationResult,
  IValidationError,
  IMessageValidator,
} from "./IValidator";
export {
  DependencyError,
  type IStorageWrapper,
  type IWebSocketWrapper,
  type IBroadcastChannelWrapper,
  type IHttpClientWrapper,
} from "./IDependencyWrapper";
