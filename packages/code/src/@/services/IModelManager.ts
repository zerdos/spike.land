import type { Code } from "@/lib/code-session";

export interface IModelManager {
  /**
   * Get a code model by its codeSpace
   * @param codeSpace The code space identifier
   */
  getModel(codeSpace: string): Code | undefined;

  /**
   * Add or update a model
   * @param codeSpace The code space identifier
   * @param model The code model instance
   */
  setModel(codeSpace: string, model: Code): void;

  /**
   * Update models based on code sections
   * @param newCodes Code sections to process
   * @returns Error message if any updates failed
   */
  updateModelsByCode(newCodes: string): Promise<string>;

  /**
   * Get current code with referenced models
   * @returns Formatted code sections including extra models
   */
  getCurrentCodeWithExtraModels(): Promise<string>;

  /**
   * Clean up resources for all models
   */
  release(): Promise<void>;
}

export type IExtraModelsResult = Record<string, string>;
