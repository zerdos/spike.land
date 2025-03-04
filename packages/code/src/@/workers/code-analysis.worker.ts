import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { codeAnalysisCache } from "@/workers/caching";

// Helper type for semantic diff to handle nullable component names
type ComponentMetadata = Omit<CodeAnalysis, "componentName"> & {
  componentName: string;
};

export interface CodeAnalysis {
  componentName: string | null;
  hooks: string[];
  props: string[];
  imports: string[];
  state: {
    variables: string[];
    setters: string[];
  };
  styling: {
    type: "css" | "tailwind" | "styled-components" | "emotion" | "inline" | "unknown";
    classes: string[];
  };
  functions: {
    name: string;
    params: string[];
    isAsync: boolean;
  }[];
}

/**
 * Analyze React component code to extract key information
 */
function createEmptyAnalysis(): CodeAnalysis {
  return {
    componentName: null,
    hooks: [],
    props: [],
    imports: [],
    state: {
      variables: [],
      setters: [],
    },
    styling: {
      type: "unknown",
      classes: [],
    },
    functions: [],
  };
}

export function analyzeReactCode(code: string): CodeAnalysis {
  // Check cache first
  if (!code) return createEmptyAnalysis();

  const cacheKey = code;
  const cached = codeAnalysisCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const analysis = createEmptyAnalysis();

  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    // Visitor for AST traversal
    traverse(ast, {
      // Find imports
      ImportDeclaration(path) {
        analysis.imports.push(path.node.source.value);

        // Detect styling approach
        const importPath = path.node.source.value;
        if (importPath.includes("tailwind")) {
          analysis.styling.type = "tailwind";
        } else if (importPath.includes("styled-components")) {
          analysis.styling.type = "styled-components";
        } else if (importPath.includes("@emotion")) {
          analysis.styling.type = "emotion";
        }
      },

      // Find component declaration
      ExportDefaultDeclaration(path) {
        if (t.isFunctionDeclaration(path.node.declaration) && path.node.declaration.id) {
          analysis.componentName = path.node.declaration.id.name;
        } else if (t.isIdentifier(path.node.declaration)) {
          analysis.componentName = path.node.declaration.name;
        }
      },

      // Find function components
      FunctionDeclaration(path) {
        if (path.node.id) {
          const name = path.node.id.name;
          const params = path.node.params.map(param => {
            if (t.isIdentifier(param)) return param.name;
            if (t.isObjectPattern(param)) {
              return param.properties
                .map(prop => {
                  if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                    analysis.props.push(prop.key.name);
                    return prop.key.name;
                  }
                  return "";
                })
                .filter(Boolean)
                .join(", ");
            }
            return "";
          });

          analysis.functions.push({
            name,
            params,
            isAsync: path.node.async,
          });
        }
      },

      // Find hooks usage
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee) && path.node.callee.name.startsWith("use")) {
          const hookName = path.node.callee.name;
          if (!analysis.hooks.includes(hookName)) {
            analysis.hooks.push(hookName);
          }

          // Extract state variables from useState
          if (hookName === "useState" && t.isArrayPattern(path.parent)) {
            const [stateVar, setterVar] = path.parent.elements;
            if (t.isIdentifier(stateVar) && t.isIdentifier(setterVar)) {
              analysis.state.variables.push(stateVar.name);
              analysis.state.setters.push(setterVar.name);
            }
          }
        }
      },

      // Find JSX class names for styling analysis
      JSXAttribute(path) {
        if (t.isJSXIdentifier(path.node.name)) {
          if (path.node.name.name === "className" && t.isStringLiteral(path.node.value)) {
            const classes = path.node.value.value.split(" ");
            analysis.styling.classes.push(...classes);

            // Detect Tailwind usage
            if (classes.some(cls => /^(bg-|text-|p-|m-|flex|grid|w-|h-)/.test(cls))) {
              analysis.styling.type = "tailwind";
            }
          } else if (path.node.name.name === "css") {
            analysis.styling.type = "emotion";
          } else if (path.node.name.name === "style") {
            analysis.styling.type = "inline";
          }
        }
      },
    });

    // Cache the results
    codeAnalysisCache.set(code, analysis);

    return analysis;
  } catch (error) {
    console.error("Failed to analyze React code:", error);
    return analysis;
  }
}

/**
 * Generate a semantic diff between two versions of a component
 */
export function generateSemanticDiff(originalCode: string, modifiedCode: string) {
  // Get analysis and ensure component names are present
  const original = analyzeReactCode(originalCode);
  const modified = analyzeReactCode(modifiedCode);

  if (!original.componentName || !modified.componentName) {
    throw new Error("Unable to analyze component name");
  }

  // Cast to type without null since we've verified component names
  const originalMeta = original.componentName
    ? {
      ...original,
      componentName: original.componentName,
    }
    : null;

  const modifiedMeta = modified.componentName
    ? {
      ...modified,
      componentName: modified.componentName,
    }
    : null;

  if (!originalMeta || !modifiedMeta) {
    throw new Error("Unable to analyze component name");
  }

  return {
    componentRenamed: originalMeta.componentName !== modifiedMeta.componentName,
    addedHooks: modifiedMeta.hooks.filter(h => !originalMeta.hooks.includes(h)),
    removedHooks: originalMeta.hooks.filter(h => !modifiedMeta.hooks.includes(h)),
    addedProps: modified.props.filter(p => !original.props.includes(p)),
    removedProps: original.props.filter(p => !modified.props.includes(p)),
    addedImports: modified.imports.filter(i => !original.imports.includes(i)),
    removedImports: original.imports.filter(i => !modified.imports.includes(i)),
    stateChanges: {
      added: modified.state.variables.filter(v => !original.state.variables.includes(v)),
      removed: original.state.variables.filter(v => !modified.state.variables.includes(v)),
    },
    stylingChanges: {
      typeChanged: original.styling.type !== modified.styling.type,
      addedClasses: modified.styling.classes.filter(c => !original.styling.classes.includes(c)),
      removedClasses: original.styling.classes.filter(c => !modified.styling.classes.includes(c)),
    },
  };
}

/**
 * Check if code changes maintain semantic integrity
 */
export function verifySemanticIntegrity(originalCode: string, modifiedCode: string): {
  valid: boolean;
  reason?: string;
} {
  try {
    const diff = generateSemanticDiff(originalCode, modifiedCode);

    // Critical changes that could break the component
    if (diff.componentRenamed) {
      return {
        valid: false,
        reason: `Component name changed from ${
          analyzeReactCode(originalCode).componentName || "unknown"
        } to ${analyzeReactCode(modifiedCode).componentName || "unknown"}`,
      };
    }

    const criticalImportsRemoved = diff.removedImports.filter(imp =>
      imp.startsWith(".") || // Internal project imports
      imp.includes("'") || // Aliased internal imports
      /^react(-dom)?$/.test(imp) // React core imports
    );

    if (criticalImportsRemoved.length > 0) {
      return {
        valid: false,
        reason: `Critical imports removed: ${criticalImportsRemoved.join(", ")}`,
      };
    }

    // Check for potentially breaking changes
    const breakingChanges = [];

    if (diff.removedProps.length > 0) {
      breakingChanges.push(`Props removed: ${diff.removedProps.join(", ")}`);
    }

    if (diff.removedHooks.length > 0) {
      breakingChanges.push(`Hooks removed: ${diff.removedHooks.join(", ")}`);
    }

    if (diff.stateChanges.removed.length > 0) {
      breakingChanges.push(`State variables removed: ${diff.stateChanges.removed.join(", ")}`);
    }

    if (breakingChanges.length > 0) {
      return {
        valid: false,
        reason: `Potentially breaking changes detected:\n${breakingChanges.join("\n")}`,
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Error in semantic integrity check:", error);
    return {
      valid: false,
      reason: "Failed to analyze code integrity",
    };
  }
}
