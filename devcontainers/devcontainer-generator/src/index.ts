import { readFile } from "fs/promises";
import * as softwareVersions from "../versions.json" 

// Define template categories for better organization
export enum TemplateCategory {
  BASE = "base",
  RUNTIME = "runtime",
  TOOL = "tool",
  DESKTOP = "desktop",
  UTILITY = "utility"
}

// Template metadata for better organization and validation
interface TemplateDefinition {
  id: string;
  category: TemplateCategory;
  dependencies?: string[];  // Templates that must be included before this one
  conflicts?: string[];     // Templates that conflict with this one
  requiredVars?: string[];  // Variables that must be provided
  order?: number;           // Order in which templates should be applied
}

// Template registry for easy discovery and management
const templateRegistry: Record<string, TemplateDefinition> = {
  "base": {
    id: "base",
    category: TemplateCategory.BASE,
    order: 0
  },
  "node": {
    id: "node",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["NODE_VERSION", "YARN_VERSION"],
    order: 10
  },
  "node-optimized": {
    id: "node-optimized",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["NODE_VERSION", "YARN_VERSION"],
    conflicts: ["node"],
    order: 10
  },
  "git": {
    id: "git",
    category: TemplateCategory.TOOL,
    requiredVars: ["GIT_VERSION"],
    order: 5
  },
  "gitUbuntu": {
    id: "gitUbuntu",
    category: TemplateCategory.TOOL,
    conflicts: ["git"],
    order: 5
  },
  "xpra": {
    id: "xpra",
    category: TemplateCategory.DESKTOP,
    requiredVars: ["XPRADISTRO"],
    order: 20
  },
  "noVNC": {
    id: "noVNC",
    category: TemplateCategory.DESKTOP,
    conflicts: ["xpra"],
    order: 20
  },
  "chrome": {
    id: "google-chrome",
    category: TemplateCategory.TOOL,
    order: 15
  },
  "chromium": {
    id: "chromium",
    category: TemplateCategory.TOOL,
    conflicts: ["chrome"],
    order: 15
  },
  "xfce": {
    id: "xfce",
    category: TemplateCategory.DESKTOP,
    order: 25
  },
  "docker": {
    id: "docker",
    category: TemplateCategory.TOOL,
    requiredVars: ["DISTRO"],
    order: 30
  },
  "kubernetes": {
    id: "kubernetes",
    category: TemplateCategory.TOOL,
    dependencies: ["docker"],
    requiredVars: ["DISTRO"],
    order: 35
  },
  "dotnet3": {
    id: "dotnet3",
    category: TemplateCategory.RUNTIME,
    conflicts: ["dotnet5", "dotnet6"],
    requiredVars: ["DOTNET_SDK_VERSION", "dotnet_sha512"],
    order: 12
  },
  "dotnet5": {
    id: "dotnet5",
    category: TemplateCategory.RUNTIME,
    conflicts: ["dotnet3", "dotnet6"],
    requiredVars: ["DOTNET_SDK_VERSION", "dotnet_sha512"],
    order: 12
  },
  "dotnet6": {
    id: "dotnet6",
    category: TemplateCategory.RUNTIME,
    conflicts: ["dotnet3", "dotnet5"],
    requiredVars: ["DOTNET_SDK_VERSION", "arm_dotnet_sha512", "amd_dotnet_sha512"],
    order: 12
  },
  "deno": {
    id: "deno",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["DENO_VERSION"],
    order: 11
  },
  "vscode": {
    id: "vscode",
    category: TemplateCategory.TOOL,
    order: 40
  },
  "zsh": {
    id: "zsh",
    category: TemplateCategory.UTILITY,
    order: 45
  },
  "android": {
    id: "android",
    category: TemplateCategory.TOOL,
    order: 35
  },
  "cypress": {
    id: "cypress",
    category: TemplateCategory.TOOL,
    requiredVars: ["CYPRESS_VERSION"],
    order: 15
  },
  "debianBackports": {
    id: "debianBackports",
    category: TemplateCategory.BASE,
    requiredVars: ["DISTRO"],
    order: 1
  },
  "suffix": {
    id: "suffix",
    category: TemplateCategory.UTILITY,
    order: 100 // Always last
  }
};

type Base =
  | "stretch"
  | "buster"
  | "bionic"
  | "disco"
  | "eoan"
  | "groovy"
  | "focal"
  | "lunar"
  | "hirsute"
  | "bullseye"
  | "trixie"
  | "bookworm"
  | "implish"
  | "rolling"
  | "jammy"
  | "gitpod/workspace-full";

type NodeVersion = "lts" | "current";
type RemoteDesktopType = "xpra" | "noVNC";
type DotnetVersion = "3" | "5" | "6";

/**
 * Enhanced DevcontainerGenerator with improved template management and validation
 */
export class DevcontainerGenerator {
  private _dockerfile = "";
  private _readme = "";
  private _dockerTemplates: Record<string, string> = {};
  private _readmeTemplates: Record<string, string> = {};
  private _variables: Record<string, string> = {};
  private _enabledTemplates: Set<string> = new Set();
  
  // Configuration options
  private _features: Record<string, boolean> = {
    xfce: false,
    docker: false,
    android: false,
    vscode: false,
    xpra: false,
    k8s: false,
    deno: false,
    noVNC: false,
    zsh: false,
    chromium: false,
    chrome: false
  };

  /**
   * Creates a new DevcontainerGenerator
   * @param base The base distribution to use for the container
   * @param templateDir Directory containing template files
   */
  constructor(
    private base: Base,
    private templateDir: string = "../devcontainer-generator/templates"
  ) {
    // Always add base template
    this._enabledTemplates.add("base");
    this._enabledTemplates.add("suffix");
    
    // Set base distribution as a variable
    const distro = this.getDistro(base);
    this._variables["DISTRO"] = `${distro}:${base}`;
    this._variables["BASE"] = base;
  }

  /**
   * Gets the distribution type based on the base image
   */
  private getDistro(base: Base): string {
    if (base === "gitpod/workspace-full") {
      return "gitpod/workspace-full";
    }
    
    const debianDistros = ["stretch", "buster", "bullseye", "bookworm", "trixie"];
    return debianDistros.includes(base as string) ? "debian" : "ubuntu";
  }

  /**
   * Initialize the generator by loading template files
   */
  public async init(): Promise<void> {
    // Get all template files
    const templateIds = Object.keys(templateRegistry);
    
    // Load Dockerfile templates
    for (const id of templateIds) {
      try {
        const content = await this.loadTemplate(id, "Dockerfile");
        this._dockerTemplates[id] = content;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.warn(`Warning: Could not load Dockerfile template for ${id}:`, errorMessage);
        this._dockerTemplates[id] = "";
      }
    }
    
    // Load README templates
    for (const id of templateIds) {
      try {
        const content = await this.loadTemplate(id, "README");
        this._readmeTemplates[id] = content;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.warn(`Warning: Could not load README template for ${id}:`, errorMessage);
        this._readmeTemplates[id] = "";
      }
    }
  }

  /**
   * Set the Node.js version to include
   * @param nodeType The Node.js version to use (lts or current)
   * @param optimized Whether to use the optimized multi-stage build template
   */
  public setNodeVersion(nodeType: NodeVersion, optimized = false): this {
    const nodeVersion = softwareVersions.node[nodeType];
    const yarnVersion = softwareVersions.yarn;
    
    this._variables["NODE_VERSION"] = nodeVersion;
    this._variables["YARN_VERSION"] = yarnVersion;
    
    // Use either the standard or optimized Node.js template
    if (optimized) {
      this._enabledTemplates.add("node-optimized");
    } else {
      this._enabledTemplates.add("node");
    }
    
    return this;
  }

  /**
   * Enable VS Code in the container
   */
  public setVscode(): this {
    this._features.vscode = true;
    this._enabledTemplates.add("vscode");
    return this;
  }

  /**
   * Update Git to the latest version or use Ubuntu's package
   */
  public updateGit(forceFromSource = false): this {
    if (this.getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._enabledTemplates.add("gitUbuntu");
    } else {
      this._variables["GIT_VERSION"] = softwareVersions.git;
      this._enabledTemplates.add("git");
    }
    return this;
  }

  /**
   * Enable Debian backports repository
   */
  public setDebianBackports(): this {
    this._enabledTemplates.add("debianBackports");
    return this;
  }

  /**
   * Enable XFCE desktop environment
   */
  public setXfce(): this {
    this._features.xfce = true;
    this._enabledTemplates.add("xfce");
    return this;
  }

  /**
   * Enable Deno runtime
   */
  public setDeno(): this {
    this._features.deno = true;
    this._variables["DENO_VERSION"] = softwareVersions.deno;
    this._enabledTemplates.add("deno");
    return this;
  }

  /**
   * Enable Kubernetes tools
   */
  public setK8s(): this {
    this._features.k8s = true;
    this._enabledTemplates.add("kubernetes");
    this._enabledTemplates.add("docker"); // K8s requires Docker
    return this;
  }

  /**
   * Enable Google Chrome browser
   */
  public setChrome(): this {
    this._features.chrome = true;
    this._enabledTemplates.add("chrome");
    return this;
  }

  /**
   * Enable Chromium browser
   */
  public setChromium(): this {
    this._features.chromium = true;
    this._enabledTemplates.add("chromium");
    return this;
  }

  /**
   * Enable Android development tools
   */
  public setAndroid(): this {
    this._features.android = true;
    this._enabledTemplates.add("android");
    return this;
  }

  /**
   * Enable remote desktop (either xpra or noVNC)
   */
  public setRemoteDesktop(type: RemoteDesktopType = "xpra"): this {
    if (type === "xpra") {
      this._features.xpra = true;
      this._enabledTemplates.add("xpra");
      this._variables["XPRADISTRO"] = this.base;
    } else {
      this._features.noVNC = true;
      this._enabledTemplates.add("noVNC");
    }
    
    return this;
  }

  /**
   * Enable Zsh shell with Oh My Zsh
   */
  public setZsh(): this {
    this._features.zsh = true;
    this._enabledTemplates.add("zsh");
    return this;
  }

  /**
   * Enable Docker in the container
   */
  public setDocker(): this {
    this._features.docker = true;
    this._enabledTemplates.add("docker");
    return this;
  }

  /**
   * Enable .NET SDK
   */
  public setDotnet(version: DotnetVersion = "6"): this {
    // Set appropriate template and variables based on version
    if (version === "6") {
      const dotnetVersion = softwareVersions.dotnet6;
      const shaValues = (softwareVersions.sha.dotnet_sha512 as Record<string, string | { arm: string; amd: string }>)["6.0.400"] as { arm: string; amd: string };
      
      this._variables["DOTNET_SDK_VERSION"] = dotnetVersion;
      this._variables["arm_dotnet_sha512"] = shaValues.arm;
      this._variables["amd_dotnet_sha512"] = shaValues.amd;
      this._enabledTemplates.add("dotnet6");
    }
    else if (version === "3") {
      const dotnetVersion = softwareVersions.dotnet3;
      const shaValue = this.getShaValue(dotnetVersion);
      
      this._variables["DOTNET_SDK_VERSION"] = dotnetVersion;
      this._variables["dotnet_sha512"] = shaValue;
      this._enabledTemplates.add("dotnet3");
    } 
    else {
      const dotnetVersion = softwareVersions.dotnet5;
      const shaRecord = (softwareVersions.sha.dotnet_sha512 as Record<string, string | { amd: string }>)[dotnetVersion];
      const shaValue = typeof shaRecord === 'string' ? shaRecord : shaRecord.amd;
      
      this._variables["DOTNET_SDK_VERSION"] = dotnetVersion;
      this._variables["dotnet_sha512"] = shaValue;
      this._enabledTemplates.add("dotnet5");
    }
    
    return this;
  }

  /**
   * Enable Cypress for end-to-end testing
   */
  public setCypress(): this {
    this._variables["CYPRESS_VERSION"] = softwareVersions.cypress;
    this._enabledTemplates.add("cypress");
    return this;
  }

  /**
   * Validate template configuration
   * - Check for conflicts between templates
   * - Ensure required dependencies are present
   * - Verify all required variables are set
   */
  private validateConfiguration(): string[] {
    const errors: string[] = [];
    
    // Get all enabled templates
    const enabledTemplates = Array.from(this._enabledTemplates);
    
    // Check for conflicts
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template) {
        errors.push(`Unknown template: ${templateId}`);
        continue;
      }
      
      if (template.conflicts) {
        for (const conflictId of template.conflicts) {
          if (this._enabledTemplates.has(conflictId)) {
            errors.push(`Template conflict: ${templateId} conflicts with ${conflictId}`);
          }
        }
      }
    }
    
    // Check for dependencies
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template) continue;
      
      if (template.dependencies) {
        for (const depId of template.dependencies) {
          if (!this._enabledTemplates.has(depId)) {
            errors.push(`Missing dependency: ${templateId} requires ${depId}`);
          }
        }
      }
    }
    
    // Check for required variables
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template) continue;
      
      if (template.requiredVars) {
        for (const varName of template.requiredVars) {
          if (!this._variables[varName]) {
            errors.push(`Missing variable: ${templateId} requires ${varName}`);
          }
        }
      }
    }
    
    return errors;
  }

  /**
   * Process a template by replacing variables
   */
  private processTemplate(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }

  /**
   * Generate Dockerfile and README based on the selected options
   */
  public async generate(): Promise<{ Dockerfile: string; README: string; warnings: string[] }> {
    // Initialize templates if not already loaded
    if (Object.keys(this._dockerTemplates).length === 0) {
      await this.init();
    }
    
    // Validate configuration
    const errors = this.validateConfiguration();
    if (errors.length > 0) {
      throw new Error(`Configuration errors:\n${errors.join('\n')}`);
    }
    
    const warnings: string[] = [];
    
    // Sort templates by order for correct application
    const sortedTemplates = Array.from(this._enabledTemplates)
      .map(id => templateRegistry[id])
      .filter(template => template) // Remove any unknown templates
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Generate Dockerfile content
    for (const template of sortedTemplates) {
      const templateContent = this._dockerTemplates[template.id];
      if (!templateContent) {
        warnings.push(`Missing Dockerfile template: ${template.id}`);
        continue;
      }
      
      const processedContent = this.processTemplate(templateContent, this._variables);
      this._dockerfile += processedContent;
    }
    
    // Generate README content
    for (const template of sortedTemplates) {
      const templateContent = this._readmeTemplates[template.id];
      if (!templateContent) {
        warnings.push(`Missing README template: ${template.id}`);
        continue;
      }
      
      const processedContent = this.processTemplate(templateContent, this._variables);
      this._readme += processedContent;
    }
    
    // Clean up duplicate FROM statements
    this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");
    
    return {
      Dockerfile: this._dockerfile,
      README: this._readme,
      warnings
    };
  }

  /**
   * Load a template file from the filesystem
   */
  private async loadTemplate(
    filename: string,
    extension: "Dockerfile" | "README",
  ): Promise<string> {
    const filePath =  `${this.templateDir}/${filename}.${extension}`;
    try{
    return await readFile(filePath, 'utf8');
  } catch (error) {
    console.error(error);
    throw new Error(`Could not read file: ${filePath}`);
  }
}
}
