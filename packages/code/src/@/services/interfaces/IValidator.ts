/**
 * Generic validation result interface
 */
export interface IValidationResult {
  readonly valid: boolean;
  readonly errors?: ReadonlyArray<IValidationError>;
}

/**
 * Validation error details
 */
export interface IValidationError {
  readonly field?: string;
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
}

/**
 * Generic validator interface
 */
export interface IValidator<T> {
  /**
   * Validate data
   * @param data - Data to validate
   * @returns Validation result
   */
  validate(data: unknown): IValidationResult;

  /**
   * Type guard for validated data
   * @param data - Data to validate
   */
  isValid(data: unknown): data is T;
}

/**
 * Message validation interface
 */
export interface IMessageValidator {
  /**
   * Validate message structure
   * @param message - Message to validate
   * @returns Validation result
   */
  validate(message: unknown): IValidationResult;

  /**
   * Type guard for message
   * @param message - Message to validate
   */
  isValidMessage(message: unknown): boolean;
}
