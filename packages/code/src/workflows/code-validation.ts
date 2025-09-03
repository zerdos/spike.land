import type { ICode } from "@/lib/interfaces";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface CodeValidationConfig {
  maxValidationAttempts: number;
  validationTimeout: number;
  enableTypeChecking: boolean;
  enableLinting: boolean;
}

/**
 * Code validation service that checks if generated code is runnable
 */
export class CodeValidator {
  private config: CodeValidationConfig;

  constructor(config: Partial<CodeValidationConfig> = {}) {
    this.config = {
      maxValidationAttempts: 3,
      validationTimeout: 10000, // 10 seconds
      enableTypeChecking: true,
      enableLinting: true,
      ...config,
    };
  }

  /**
   * Validates code for syntax errors, type errors, and basic runtime issues
   */
  async validateCode(
    code: string,
    codeSession: ICode,
    filePath: string,
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // Step 1: Basic syntax validation
      const syntaxResult = await this.validateSyntax(code, filePath);
      if (!syntaxResult.isValid) {
        result.isValid = false;
        result.errors.push(...syntaxResult.errors);
      }

      // Step 2: TypeScript type checking (if enabled and .tsx/.ts file)
      if (this.config.enableTypeChecking && this.isTypeScriptFile(filePath)) {
        const typeResult = await this.validateTypes(code, codeSession, filePath);
        if (!typeResult.isValid) {
          result.isValid = false;
          result.errors.push(...typeResult.errors);
        }
        result.warnings.push(...typeResult.warnings);
      }

      // Step 3: Import/dependency validation
      const importResult = await this.validateImports(code, codeSession);
      if (!importResult.isValid) {
        result.warnings.push(...importResult.errors); // Treat as warnings for now
      }

      // Step 4: Basic runtime validation (for React components)
      if (this.isReactFile(filePath)) {
        const reactResult = await this.validateReactComponent(code);
        if (!reactResult.isValid) {
          result.errors.push(...reactResult.errors);
          result.isValid = false;
        }
        result.suggestions.push(...reactResult.suggestions);
      }

      // Step 5: Code compilation test
      const compileResult = await this.testCompilation(code, codeSession, filePath);
      if (!compileResult.isValid) {
        result.isValid = false;
        result.errors.push(...compileResult.errors);
      }
    } catch (error) {
      result.isValid = false;
      result.errors.push(
        `Validation error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Validates basic JavaScript/TypeScript syntax using simple pattern matching
   */
  private async validateSyntax(code: string, _filePath: string): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // Basic syntax checks
      const brackets = this.checkBracketBalance(code);
      if (!brackets.balanced) {
        result.isValid = false;
        result.errors.push(`Syntax error: ${brackets.error}`);
      }

      const quotes = this.checkQuoteBalance(code);
      if (!quotes.balanced) {
        result.isValid = false;
        result.errors.push(`Syntax error: ${quotes.error}`);
      }

      // Check for common syntax issues
      const syntaxIssues = this.findCommonSyntaxIssues(code);
      if (syntaxIssues.length > 0) {
        result.errors.push(...syntaxIssues);
        result.isValid = false;
      }
    } catch (error) {
      result.errors.push(
        `Could not validate syntax: ${error instanceof Error ? error.message : String(error)}`,
      );
      result.isValid = false;
    }

    return result;
  }

  /**
   * Validates TypeScript types using pattern matching
   */
  private async validateTypes(
    code: string,
    codeSession: ICode,
    filePath: string,
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // Simple type checking - look for obvious type issues
      const typeIssues = this.findCommonTypeIssues(code);
      if (typeIssues.length > 0) {
        result.warnings.push(...typeIssues);
      }

      // Check for missing type annotations in TypeScript files
      if (this.isTypeScriptFile(filePath)) {
        const typeAnnotationIssues = this.checkTypeAnnotations(code);
        result.suggestions.push(...typeAnnotationIssues);
      }
    } catch (error) {
      result.warnings.push(
        `Type checking failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Find common syntax issues using pattern matching
   */
  private findCommonSyntaxIssues(code: string): string[] {
    const issues: string[] = [];

    // Check for missing semicolons in obvious places
    const missingSemicolonPattern = /\w+\s*\n\s*[a-zA-Z]/g;
    if (missingSemicolonPattern.test(code)) {
      issues.push("Possible missing semicolons detected");
    }

    // Check for malformed function declarations
    const malformedFunctionPattern = /function\s*\(/g;
    const functionMatches = code.match(malformedFunctionPattern);
    if (functionMatches) {
      // Check if function name is missing
      const namedFunctionPattern = /function\s+\w+\s*\(/g;
      const namedMatches = code.match(namedFunctionPattern);
      if (!namedMatches || namedMatches.length !== functionMatches.length) {
        issues.push("Possible malformed function declaration");
      }
    }

    // Check for unclosed template literals
    const templateLiteralCount = (code.match(/`/g) || []).length;
    if (templateLiteralCount % 2 !== 0) {
      issues.push("Unclosed template literal detected");
    }

    return issues;
  }

  /**
   * Find common type issues
   */
  private findCommonTypeIssues(code: string): string[] {
    const issues: string[] = [];

    // Check for 'any' usage
    if (code.includes(": any")) {
      issues.push("Usage of 'any' type detected - consider using more specific types");
    }

    // Check for missing return type annotations on functions
    const functionPattern = /function\s+\w+\s*\([^)]*\)\s*\{/g;
    if (functionPattern.test(code)) {
      issues.push("Consider adding return type annotations to functions");
    }

    return issues;
  }

  /**
   * Check for missing type annotations
   */
  private checkTypeAnnotations(code: string): string[] {
    const suggestions: string[] = [];

    // Check for variables without type annotations
    const variablePattern = /(?:let|const|var)\s+\w+\s*=/g;
    if (variablePattern.test(code)) {
      suggestions.push("Consider adding type annotations to variables for better type safety");
    }

    return suggestions;
  }

  /**
   * Validates imports and dependencies
   */
  private async validateImports(code: string, _codeSession: ICode): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // Extract import statements
      const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"`]([^'"`]+)['"`]/g;
      const imports: string[] = [];
      let match;

      while ((match = importRegex.exec(code)) !== null) {
        imports.push(match[1]);
      }

      // Check for common missing dependencies
      const commonDependencies = {
        "react": ["React", "useState", "useEffect", "useCallback", "useMemo"],
        "@types/react": ["React"],
        "typescript": ["ts"],
      };

      for (const [dep, identifiers] of Object.entries(commonDependencies)) {
        const needsDep = identifiers.some(id => code.includes(id));
        const hasDep = imports.some(imp => imp === dep || imp.startsWith(dep + "/"));

        if (needsDep && !hasDep) {
          result.warnings.push(`Consider adding import for ${dep}`);
        }
      }

      // Check for relative imports that might not exist
      const relativeImports = imports.filter(imp => imp.startsWith("./") || imp.startsWith("../"));
      if (relativeImports.length > 0) {
        result.suggestions.push(
          `Verify that relative imports exist: ${relativeImports.join(", ")}`,
        );
      }
    } catch (error) {
      result.warnings.push(
        `Import validation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Validates React component structure and common patterns
   */
  private async validateReactComponent(code: string): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // Check for basic React component structure
      const hasDefaultExport = /export\s+default\s+/.test(code);
      const hasNamedExport = /export\s+(const|function|class)\s+\w+/.test(code);
      const hasReactImport = /import.*React.*from\s+['"`]react['"`]/.test(code);
      const hasJSX = /<[A-Z][^>]*>/.test(code);

      if (hasJSX && !hasReactImport) {
        result.errors.push("JSX found but React is not imported");
        result.isValid = false;
      }

      if (!hasDefaultExport && !hasNamedExport) {
        result.warnings.push("No component export found");
      }

      // Check for common React patterns
      if (code.includes("useState") && !code.includes("import")) {
        result.suggestions.push("Consider importing useState from React");
      }

      // Check for proper JSX syntax
      const unclosedTags = this.findUnclosedJSXTags(code);
      if (unclosedTags.length > 0) {
        result.errors.push(`Unclosed JSX tags found: ${unclosedTags.join(", ")}`);
        result.isValid = false;
      }
    } catch (error) {
      result.warnings.push(
        `React validation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Tests if the code can be compiled/transpiled
   */
  private async testCompilation(
    code: string,
    _codeSession: ICode,
    _filePath: string,
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    try {
      // For now, we'll do a basic check
      // In a real implementation, you might want to use esbuild, swc, or another fast compiler

      // Check for obvious compilation issues
      const brackets = this.checkBracketBalance(code);
      if (!brackets.balanced) {
        result.isValid = false;
        result.errors.push(`Unbalanced brackets: ${brackets.error}`);
      }

      const quotes = this.checkQuoteBalance(code);
      if (!quotes.balanced) {
        result.isValid = false;
        result.errors.push(`Unbalanced quotes: ${quotes.error}`);
      }
    } catch (error) {
      result.errors.push(
        `Compilation test failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      result.isValid = false;
    }

    return result;
  }

  /**
   * Helper methods
   */
  private isTypeScriptFile(filePath: string): boolean {
    return /\.(ts|tsx)$/.test(filePath);
  }

  private isReactFile(filePath: string): boolean {
    return /\.(jsx|tsx)$/.test(filePath);
  }

  private findUnclosedJSXTags(code: string): string[] {
    const unclosed: string[] = [];
    const stack: string[] = [];

    // Simple JSX tag matching (this is a basic implementation)
    const tagRegex = /<(\/?)([\w-]+)[^>]*>/g;
    let match;

    while ((match = tagRegex.exec(code)) !== null) {
      const isClosing = match[1] === "/";
      const tagName = match[2];

      if (isClosing) {
        if (stack.length === 0 || stack.pop() !== tagName) {
          unclosed.push(tagName);
        }
      } else {
        // Check if it's self-closing
        if (!match[0].endsWith("/>")) {
          stack.push(tagName);
        }
      }
    }

    unclosed.push(...stack);
    return unclosed;
  }

  private checkBracketBalance(code: string): { balanced: boolean; error?: string; } {
    const brackets = { "(": ")", "[": "]", "{": "}" };
    const stack: string[] = [];

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (char in brackets) {
        stack.push(char);
      } else if (Object.values(brackets).includes(char)) {
        const last = stack.pop();
        if (!last || brackets[last as keyof typeof brackets] !== char) {
          return { balanced: false, error: `Unexpected ${char} at position ${i}` };
        }
      }
    }

    if (stack.length > 0) {
      return { balanced: false, error: `Unclosed ${stack.join(", ")}` };
    }

    return { balanced: true };
  }

  private checkQuoteBalance(code: string): { balanced: boolean; error?: string; } {
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inTemplate = false;
    let escaped = false;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const _prevChar = i > 0 ? code[i - 1] : "";

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === "'" && !inDoubleQuote && !inTemplate) {
        inSingleQuote = !inSingleQuote;
      } else if (char === '"' && !inSingleQuote && !inTemplate) {
        inDoubleQuote = !inDoubleQuote;
      } else if (char === "`" && !inSingleQuote && !inDoubleQuote) {
        inTemplate = !inTemplate;
      }
    }

    if (inSingleQuote) {
      return { balanced: false, error: "Unclosed single quote" };
    }
    if (inDoubleQuote) {
      return { balanced: false, error: "Unclosed double quote" };
    }
    if (inTemplate) {
      return { balanced: false, error: "Unclosed template literal" };
    }

    return { balanced: true };
  }
}

/**
 * Creates a default code validator instance
 */
export function createCodeValidator(config?: Partial<CodeValidationConfig>): CodeValidator {
  return new CodeValidator(config);
}
