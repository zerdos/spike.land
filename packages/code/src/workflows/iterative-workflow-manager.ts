import type { ICode } from "@/lib/interfaces";
import type { AgentState } from "./chat-langchain";
import { createCodeValidator, type ValidationResult } from "./code-validation";
import { telemetry } from "./telemetry";

export interface IterationResult {
  success: boolean;
  finalState: AgentState;
  iterations: number;
  validationResults: ValidationResult[];
  improvements: string[];
  errors: string[];
}

export interface IterativeConfig {
  maxIterations: number;
  maxValidationAttempts: number;
  requireRunnable: boolean;
  enableValidation: boolean;
  stopOnFirstSuccess: boolean;
}

/**
 * Manages iterative workflow execution with validation and feedback loops
 */
export class IterativeWorkflowManager {
  private codeValidator = createCodeValidator({
    maxValidationAttempts: 3,
    validationTimeout: 10000,
    enableTypeChecking: true,
    enableLinting: true,
  });

  private config: IterativeConfig;

  constructor(config: Partial<IterativeConfig> = {}) {
    this.config = {
      maxIterations: 5,
      maxValidationAttempts: 3,
      requireRunnable: true,
      enableValidation: true,
      stopOnFirstSuccess: false,
      ...config,
    };
  }

  /**
   * Executes workflow with iterative improvements until code is runnable
   */
  async executeWithValidation(
    workflow: { invoke: (prompt: string, images: unknown[]) => Promise<AgentState>; },
    initialPrompt: string,
    images: unknown[],
    codeSession: ICode,
    initialState: AgentState,
  ): Promise<IterationResult> {
    const result: IterationResult = {
      success: false,
      finalState: initialState,
      iterations: 0,
      validationResults: [],
      improvements: [],
      errors: [],
    };

    telemetry.startTimer("iterative.execution");

    try {
      let currentState = initialState;
      let currentPrompt = initialPrompt;

      for (let iteration = 0; iteration < this.config.maxIterations; iteration++) {
        result.iterations = iteration + 1;

        telemetry.trackEvent("iterative.iteration.start", {
          iteration: (iteration + 1).toString(),
          promptLength: currentPrompt.length.toString(),
        });

        try {
          // Execute the workflow
          const iterationState = await workflow.invoke(currentPrompt, images);

          if (!iterationState) {
            result.errors.push(`Iteration ${iteration + 1}: Workflow returned null state`);
            continue;
          }

          currentState = iterationState;

          // Validate the code if validation is enabled
          if (this.config.enableValidation && currentState.code) {
            const validationResult = await this.validateIterationCode(
              currentState.code,
              codeSession,
              `/live/${currentState.codeSpace}.tsx`,
            );

            result.validationResults.push(validationResult);

            // Check if code is now runnable
            if (validationResult.isValid) {
              telemetry.trackEvent("iterative.validation.success", {
                iteration: (iteration + 1).toString(),
              });
              result.success = true;
              result.finalState = currentState;

              if (this.config.stopOnFirstSuccess) {
                break;
              }
            } else {
              telemetry.trackEvent("iterative.validation.failed", {
                iteration: (iteration + 1).toString(),
                errorCount: validationResult.errors.length.toString(),
              });

              // Prepare feedback for next iteration
              const feedback = this.prepareFeedbackPrompt(validationResult, iteration + 1);
              result.improvements.push(feedback);

              // Update prompt for next iteration
              currentPrompt = feedback;

              // Continue to next iteration
              continue;
            }
          } else {
            // No validation - consider it successful
            result.success = true;
            result.finalState = currentState;
          }

          // If we reach here and requireRunnable is false, we can stop
          if (!this.config.requireRunnable) {
            result.success = true;
            result.finalState = currentState;
            break;
          }
        } catch (iterationError: unknown) {
          const errorMessage = `Iteration ${iteration + 1} failed: ${
            iterationError instanceof Error ? iterationError.message : String(iterationError)
          }`;

          result.errors.push(errorMessage);

          telemetry.trackError(
            "iterative.iteration",
            iterationError instanceof Error ? iterationError : new Error(String(iterationError)),
            {
              iteration: (iteration + 1).toString(),
            },
          );

          // Prepare recovery prompt for next iteration
          const recoveryPrompt = this.prepareRecoveryPrompt(errorMessage, iteration + 1);
          currentPrompt = recoveryPrompt;
          result.improvements.push(recoveryPrompt);
        }
      }

      // Final validation if we haven't succeeded yet
      if (!result.success && this.config.enableValidation && currentState.code) {
        const finalValidation = await this.validateIterationCode(
          currentState.code,
          codeSession,
          `/live/${currentState.codeSpace}.tsx`,
        );

        result.validationResults.push(finalValidation);
        result.success = finalValidation.isValid;
        result.finalState = currentState;
      }

      telemetry.stopTimer("iterative.execution", {
        success: result.success.toString(),
        iterations: result.iterations.toString(),
        validationAttempts: result.validationResults.length.toString(),
      });

      // Track final result via telemetry
      telemetry.trackEvent("iterative.execution.complete", {
        success: result.success.toString(),
        iterations: result.iterations.toString(),
        errorCount: result.errors.length.toString(),
      });

      return result;
    } catch (error: unknown) {
      telemetry.trackError(
        "iterative.execution.outer",
        error instanceof Error ? error : new Error(String(error)),
        {
          iterations: result.iterations.toString(),
        },
      );

      telemetry.stopTimer("iterative.execution", {
        success: "false",
        iterations: result.iterations.toString(),
      });

      result.errors.push(
        `Workflow execution failed: ${error instanceof Error ? error.message : String(error)}`,
      );

      return result;
    }
  }

  /**
   * Validates code for a specific iteration
   */
  private async validateIterationCode(
    code: string,
    codeSession: ICode,
    filePath: string,
  ): Promise<ValidationResult> {
    try {
      const validation = await this.codeValidator.validateCode(code, codeSession, filePath);

      telemetry.trackEvent("iterative.validation", {
        isValid: validation.isValid.toString(),
        errorCount: validation.errors.length.toString(),
        warningCount: validation.warnings.length.toString(),
      });

      return validation;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      telemetry.trackError(
        "iterative.validation.error",
        error instanceof Error ? error : new Error(errorMessage),
      );
      return {
        isValid: false,
        errors: [`Validation failed: ${errorMessage}`],
        warnings: [],
        suggestions: [],
      };
    }
  }

  /**
   * Prepares feedback prompt for the next iteration based on validation results
   */
  private prepareFeedbackPrompt(validation: ValidationResult, iteration: number): string {
    const errors = validation.errors.slice(0, 3); // Limit to top 3 errors
    const warnings = validation.warnings.slice(0, 2); // Limit to top 2 warnings

    let feedback =
      `The code from iteration ${iteration} has validation issues that need to be fixed:\n\n`;

    if (errors.length > 0) {
      feedback += "**Critical Errors (must fix):**\n";
      errors.forEach((error, i) => {
        feedback += `${i + 1}. ${error}\n`;
      });
      feedback += "\n";
    }

    if (warnings.length > 0) {
      feedback += "**Warnings (should fix):**\n";
      warnings.forEach((warning, i) => {
        feedback += `${i + 1}. ${warning}\n`;
      });
      feedback += "\n";
    }

    if (validation.suggestions.length > 0) {
      feedback += "**Suggestions:**\n";
      validation.suggestions.slice(0, 2).forEach((suggestion, i) => {
        feedback += `${i + 1}. ${suggestion}\n`;
      });
      feedback += "\n";
    }

    feedback += `Please fix these issues by making targeted changes to the code. `;
    feedback += `Use multiple SEARCH/REPLACE blocks if needed to address all the problems. `;
    feedback += `Focus on making the code runnable and error-free.`;

    return feedback;
  }

  /**
   * Prepares recovery prompt for handling workflow errors
   */
  private prepareRecoveryPrompt(errorMessage: string, iteration: number): string {
    let prompt = `An error occurred during iteration ${iteration}: ${errorMessage}\n\n`;

    prompt += "Please analyze the error and make the necessary corrections to fix the issue. ";
    prompt += "Common fixes include:\n";
    prompt += "- Fixing syntax errors (missing brackets, semicolons, etc.)\n";
    prompt += "- Correcting import statements\n";
    prompt += "- Ensuring proper TypeScript types\n";
    prompt += "- Fixing JSX structure and closing tags\n\n";

    prompt += "Make targeted changes using SEARCH/REPLACE blocks to address the specific error.";

    return prompt;
  }

  /**
   * Generates a summary of all iterations and improvements made
   */
  generateIterationSummary(result: IterationResult): string {
    let summary = `## Workflow Execution Summary\n\n`;

    summary += `**Result:** ${result.success ? "Success" : "Failed"}\n`;
    summary += `**Iterations:** ${result.iterations}/${this.config.maxIterations}\n`;
    summary += `**Validations:** ${result.validationResults.length}\n\n`;

    if (result.improvements.length > 0) {
      summary += `### Improvements Made\n`;
      result.improvements.forEach((improvement, i) => {
        summary += `**Iteration ${i + 1}:**\n${improvement.substring(0, 200)}...\n\n`;
      });
    }

    if (result.errors.length > 0) {
      summary += `### Errors Encountered\n`;
      result.errors.forEach((error, i) => {
        summary += `${i + 1}. ${error}\n`;
      });
      summary += "\n";
    }

    const finalValidation = result.validationResults[result.validationResults.length - 1];
    if (finalValidation) {
      summary += `### Final Validation Status\n`;
      summary += `**Valid:** ${finalValidation.isValid ? "Yes" : "No"}\n`;

      if (finalValidation.errors.length > 0) {
        summary += `**Remaining Errors:** ${finalValidation.errors.length}\n`;
        finalValidation.errors.slice(0, 3).forEach((error, i) => {
          summary += `${i + 1}. ${error}\n`;
        });
      }

      if (finalValidation.warnings.length > 0) {
        summary += `**Warnings:** ${finalValidation.warnings.length}\n`;
      }
    }

    return summary;
  }
}

/**
 * Creates a default iterative workflow manager
 */
export function createIterativeWorkflowManager(
  config?: Partial<IterativeConfig>,
): IterativeWorkflowManager {
  return new IterativeWorkflowManager(config);
}
