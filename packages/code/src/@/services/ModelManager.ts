import { Code } from "@/lib/code-session";
import type { IExtraModelsResult, IModelManager } from "@/lib/interfaces";
import { Message } from "@/lib/interfaces";

export class ModelManager implements IModelManager {
  private models = new Map<string, Code>();
  private currentCodeSpace: string;

  constructor(codeSpace: string, initialModel: Code) {
    this.currentCodeSpace = codeSpace;
    this.models.set(codeSpace, initialModel);
  }

  getModel(codeSpace: string): Code | undefined {
    return this.models.get(codeSpace);
  }

  setModel(codeSpace: string, model: Code): void {
    this.models.set(codeSpace, model);
  }

  async updateModelsByCode(newCodes: string): Promise<string> {
    const sections = newCodes.split(/^#\s+/gm).filter(Boolean);
    const errors: string[] = [];

    for (const section of sections) {
      const lines = section.trim().split("\n");
      const codeSpaceLine = lines.shift();
      if (!codeSpaceLine) continue;

      const codeSpaceMatch = codeSpaceLine.match(/^([\w-.]+)\.tsx$/);
      if (!codeSpaceMatch) continue;
      const codeSpace = codeSpaceMatch[1];

      const codeContentMatch = lines.join("\n").match(
        /```tsx\s*([\s\S]*?)\s*```/m,
      );
      if (!codeContentMatch) continue;
      const codeContent = codeContentMatch[1];

      let codeInstance = this.models.get(codeSpace);
      if (!codeInstance) {
    
        
    
        codeInstance = new Code({
          codeSpace,
          code: codeContent,
          html: "",
          css: "",
          messages: [] as Message[],
          transpiled: "",
        }
    
        );
        await codeInstance.init();
        this.models.set(codeSpace, codeInstance);
      }

      const session = await codeInstance.getSession();
      if (session.code !== codeContent) {
        const updatedCode = await codeInstance.setCode(
          codeContent + "\n\n\n",
          codeSpace !== this.currentCodeSpace,
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
      const codeSpace = matchedPath.split("/").pop()?.replace(/"$/, "");
      if (!codeSpace || extraModels[codeSpace]) {
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

  private formatCodeAsSection(codeSpace: string, code: string): string {
    return `# ${codeSpace}.tsx\n\n\`\`\`tsx\n${code.trim()}\n\`\`\`\n`;
  }

  async release(): Promise<void> {
    for (const model of this.models.values()) {
      await model.release();
    }
    this.models.clear();
  }
}
