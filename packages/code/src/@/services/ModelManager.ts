import { Code } from "@/lib/code-session";
import type { IExtraModelsResult, IModelManager } from "@/lib/interfaces";

/**
 * Manages multiple Code instances (models) representing different code spaces
 * in a collaborative code editing environment.
 *
 * ModelManager maintains a registry of Code models, tracks the currently active
 * code space, and provides functionality to update multiple models from a
 * formatted code string. It also handles fetching and including extra models
 * (dependencies) referenced within code.
 *
 * @example
 * ```typescript
 * const initialModel = new Code({
 *   codeSpace: "main",
 *   code: "export default () => <div>Hello</div>",
 *   html: "",
 *   css: "",
 *   transpiled: "",
 *   messages: [],
 * });
 *
 * const manager = new ModelManager("main", initialModel);
 * const model = manager.getModel("main");
 * ```
 *
 * @implements {IModelManager}
 */
export class ModelManager implements IModelManager {
  /**
   * Map of code space identifiers to their corresponding Code instances.
   * @private
   */
  private models = new Map<string, Code>();

  /**
   * The currently active code space identifier.
   * @private
   */
  private currentCodeSpace: string;

  /**
   * Creates a new ModelManager instance.
   *
   * @param codeSpace - The identifier for the initial code space
   * @param initialModel - The Code instance to associate with the initial code space
   */
  constructor(codeSpace: string, initialModel: Code) {
    this.currentCodeSpace = codeSpace;
    this.models.set(codeSpace, initialModel);
  }

  /**
   * Retrieves a Code model by its code space identifier.
   *
   * @param codeSpace - The identifier of the code space to retrieve
   * @returns The Code instance for the given code space, or undefined if not found
   */
  getModel(codeSpace: string): Code | undefined {
    return this.models.get(codeSpace);
  }

  /**
   * Registers or updates a Code model for a given code space identifier.
   *
   * @param codeSpace - The identifier of the code space
   * @param model - The Code instance to associate with the code space
   */
  setModel(codeSpace: string, model: Code): void {
    this.models.set(codeSpace, model);
  }

  /**
   * Updates one or more Code models from a formatted code string.
   *
   * Parses a multi-section code format where each section begins with a markdown
   * heading (# filename.tsx) followed by a tsx code block. Creates new Code instances
   * as needed and updates existing ones. Also triggers re-transpilation of the
   * currently active model.
   *
   * @param newCodes - Formatted code string containing multiple sections with
   *                   markdown headings and tsx code blocks
   * @returns A string containing any errors encountered during parsing or updating,
   *          or an empty string if all updates succeeded
   * @throws Will not throw, but returns errors as a string instead
   *
   * @example
   * ```typescript
   * const codeString = `# main.tsx
   *
   * \`\`\`tsx
   * export default () => <div>Main</div>
   * \`\`\`
   *
   * # utils.tsx
   *
   * \`\`\`tsx
   * export const helper = () => {}
   * \`\`\`
   * `;
   * const errors = await manager.updateModelsByCode(codeString);
   * ```
   */
  async updateModelsByCode(newCodes: string): Promise<string> {
    const sections = newCodes.split(/^#\s+/gm).filter(Boolean);
    const errors: string[] = [];

    for (const section of sections) {
      const lines = section.trim().split("\n");
      const codeSpaceLine = lines.shift();
      if (!codeSpaceLine) continue;

      const codeSpaceMatch = codeSpaceLine.match(/^([\w-.]+)\.tsx$/);
      if (!codeSpaceMatch) continue;
      if (!codeSpaceMatch || !codeSpaceMatch[1]) continue;
      const codeSpace = codeSpaceMatch[1];

      if (typeof codeSpace !== "string") { // Ensure codeSpace is a string
        errors.push(`Invalid code space derived from line: ${codeSpaceLine}`);
        continue;
      }

      const codeContentMatch = lines.join("\n").match(
        /```tsx\s*([\s\S]*?)\s*```/m,
      );
      if (!codeContentMatch || !codeContentMatch[1]) continue;
      const codeContent = codeContentMatch[1];

      let codeInstance = this.models.get(codeSpace);
      if (!codeInstance) {
        if (typeof codeContent !== "string") { // Ensure codeContent is a string
          errors.push(`Invalid code content for ${codeSpace}`);
          continue;
        }
        codeInstance = new Code({
          codeSpace, // codeSpace is now guaranteed to be a string
          code: codeContent,
          html: "",
          css: "",
          transpiled: "",
          messages: [],
        });
        await codeInstance.init();
        this.models.set(codeSpace, codeInstance); // codeSpace is now guaranteed to be a string
      }

      const session = await codeInstance.getSession();
      if (typeof codeContent === "string" && session.code !== codeContent) { // Ensure codeContent is a string
        const updatedCode = await codeInstance.setCode(
          codeContent + "\n\n\n",
          codeSpace !== this.currentCodeSpace, // codeSpace is now guaranteed to be a string
        );
        if (!updatedCode) {
          errors.push(`Failed to update code for ${codeSpace}`);
        }
      }
    }

    // Re-transpile current model's code to ensure everything is fresh
    const currentModel = this.models.get(this.currentCodeSpace);
    if (currentModel) {
      const currentSession = await currentModel.getSession();
      await currentModel.setCode(currentSession.code, true);
    }

    return errors.join("\n");
  }

  /**
   * Retrieves the current code model along with all referenced extra models.
   *
   * Fetches the code from the currently active model and recursively discovers
   * and fetches all extra models (dependencies) referenced in the code via
   * import statements. Formats all code sections according to the standard
   * markdown format with the current model first, followed by extra models.
   *
   * @returns A formatted string containing the current model's code followed by
   *          any extra models it depends on
   * @throws {Error} If the current model is not found in the registry
   *
   * @example
   * ```typescript
   * const formatted = await manager.getCurrentCodeWithExtraModels();
   * // Returns formatted code string with multiple sections
   * ```
   */
  async getCurrentCodeWithExtraModels(): Promise<string> {
    const currentModel = this.models.get(this.currentCodeSpace);
    if (!currentModel) {
      throw new Error("Current model not found");
    }

    const currentSession = await currentModel.getSession();
    const extraModels = await this.fetchAndCreateExtraModels(
      currentSession.code,
      location.origin,
    );

    const extraCodeSections = Object.entries(extraModels)
      .filter(([codeSpace]) => codeSpace !== this.currentCodeSpace)
      .map(([codeSpace, code]) => this.formatCodeAsSection(codeSpace, code));

    const currentCodeSection = this.formatCodeAsSection(
      this.currentCodeSpace,
      currentSession.code,
    );

    return [currentCodeSection, ...extraCodeSections].join("\n");
  }

  /**
   * Recursively fetches and caches extra models referenced in the given code.
   *
   * Scans the code for import statements matching three patterns:
   * 1. Full origin URLs: `from "https://origin/live/module-name"`
   * 2. Relative imports: `from "./module-name"` (excluding @/ imports)
   * 3. Root imports: `from "/live/module-name"`
   *
   * Each discovered module is fetched from the server and recursively scanned
   * for additional dependencies to build a complete dependency tree.
   *
   * @param code - The source code to scan for import statements
   * @param origin - The base URL origin for resolving relative and root imports
   * @param extraModels - Accumulator object for discovered models (default: empty)
   * @returns A record mapping code space names to their fetched source code
   * @private
   */
  private async fetchAndCreateExtraModels(
    code: string,
    origin: string,
    extraModels: IExtraModelsResult = {},
  ): Promise<IExtraModelsResult> {
    const patterns = [
      ` from "(${origin})/live/[\\w-]+"`,
      ` from "\\./((?!@/)[\\w-]+)"`,
      ` from "/live/[\\w-]+"`,
    ];

    const regex = new RegExp(patterns.join("|"), "gm");
    const matches = code.matchAll(regex);

    for (const match of matches) {
      const matchedPath = match[0];
      const pathParts = matchedPath?.split("/");
      const codeSpace = pathParts?.[pathParts.length - 1]?.replace(/"$/, "");
      if (!codeSpace || extraModels[codeSpace] !== undefined) {
        continue;
      }
      const extraModelUrl = new URL(`/live/${codeSpace}/index.tsx`, origin)
        .toString();
      const response = await fetch(extraModelUrl);
      const fetchedCode = await response.text();

      extraModels[codeSpace] = fetchedCode;
      // Recursive call to find any further references
      await this.fetchAndCreateExtraModels(fetchedCode, origin, extraModels);
    }

    return extraModels;
  }

  /**
   * Formats code into a standard markdown section with a code fence.
   *
   * Creates a markdown section with a heading containing the code space name
   * and a tsx code fence containing the formatted code.
   *
   * @param codeSpace - The code space identifier to use in the heading
   * @param code - The source code to include in the code fence
   * @returns A formatted markdown section string
   * @private
   */
  private formatCodeAsSection(codeSpace: string, code: string): string {
    return `# ${codeSpace}.tsx\n\n\`\`\`tsx\n${code.trim()}\n\`\`\`\n`;
  }

  /**
   * Releases all managed Code models and clears the registry.
   *
   * Calls the release method on each model to clean up resources (event listeners,
   * workers, etc.) and then removes all models from the internal registry.
   * Should be called when the ModelManager is no longer needed.
   *
   * @returns A promise that resolves when all models have been released
   *
   * @example
   * ```typescript
   * await manager.release();
   * // All models cleaned up, registry empty
   * ```
   */
  async release(): Promise<void> {
    for (const model of this.models.values()) {
      await model.release();
    }
    this.models.clear();
  }
}
