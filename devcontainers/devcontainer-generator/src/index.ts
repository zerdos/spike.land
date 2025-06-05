import { readFile } from "fs/promises";
import * as softwareVersions from "../versions.json" assert { type: "json" };

// Constants for magic numbers and default values
const DEFAULT_TEMPLATE_ORDER = 0;
const MAX_TEMPLATE_ORDER = 100;
const NODE_TEMPLATE_ORDER = 10;
const GIT_TEMPLATE_ORDER = 5;
const DESKTOP_TEMPLATE_ORDER = 20;
const TOOL_TEMPLATE_ORDER = 15;
const DOTNET_TEMPLATE_ORDER = 12;
const DENO_TEMPLATE_ORDER = 11;
const KUBERNETES_ORDER = 35;
const DOCKER_ORDER = 30;
const VSCODE_ORDER = 40;
const ZSH_ORDER = 45;
const DEBIAN_BACKPORTS_ORDER = 1;

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
  readonly id: string;
  readonly category: TemplateCategory;
  readonly dependencies?: readonly string[];  // Templates that must be included before this one
  readonly conflicts?: readonly string[];     // Templates that conflict with this one
  readonly requiredVars?: readonly string[];  // Variables that must be provided
  readonly order?: number;           // Order in which templates should be applied
}

// Template registry for easy discovery and management
const templateRegistry: Readonly<Record<string, TemplateDefinition>> = {
  "base": {
    id: "base",
    category: TemplateCategory.BASE,
    order: DEFAULT_TEMPLATE_ORDER
  },
  "node": {
    id: "node",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["NODE_VERSION", "YARN_VERSION"],
    order: NODE_TEMPLATE_ORDER
  },
  "node-optimized": {
    id: "node-optimized",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["NODE_VERSION", "YARN_VERSION"],
    conflicts: ["node"],
    order: NODE_TEMPLATE_ORDER
  },
  "git": {
    id: "git",
    category: TemplateCategory.TOOL,
    requiredVars: ["GIT_VERSION"],
    order: GIT_TEMPLATE_ORDER
  },
  "gitUbuntu": {
    id: "gitUbuntu",
    category: TemplateCategory.TOOL,
    conflicts: ["git"],
    order: GIT_TEMPLATE_ORDER
  },
  "xpra": {
    id: "xpra",
    category: TemplateCategory.DESKTOP,
    requiredVars: ["XPRADISTRO"],
    order: DESKTOP_TEMPLATE_ORDER
  },
  "noVNC": {
    id: "noVNC",
    category: TemplateCategory.DESKTOP,
    conflicts: ["xpra"],
    order: DESKTOP_TEMPLATE_ORDER
  },
  "chrome": {
    id: "google-chrome",
    category: TemplateCategory.TOOL,
    order: TOOL_TEMPLATE_ORDER
  },
  "chromium": {
    id: "chromium",
    category: TemplateCategory.TOOL,
    conflicts: ["chrome"],
    order: TOOL_TEMPLATE_ORDER
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
    order: DOCKER_ORDER
  },
  "kubernetes": {
    id: "kubernetes",
    category: TemplateCategory.TOOL,
    dependencies: ["docker"],
    requiredVars: ["DISTRO"],
    order: KUBERNETES_ORDER
  },
  "dotnet6": {
    id: "dotnet6",
    category: TemplateCategory.RUNTIME,
    conflicts: ["dotnet3", "dotnet5"],
    requiredVars: ["DOTNET_SDK_VERSION", "arm_dotnet_sha512", "amd_dotnet_sha512"],
    order: DOTNET_TEMPLATE_ORDER
  },
  "deno": {
    id: "deno",
    category: TemplateCategory.RUNTIME,
    requiredVars: ["DENO_VERSION"],
    order: DENO_TEMPLATE_ORDER
  },
  "cloudflare": {
    id: "cloudflare",
    category: TemplateCategory.TOOL, // Or TemplateCategory.RUNTIME if more appropriate
    dependencies: ["node-optimized"], // Assuming 'node-optimized' template is used
    order: 16 // Adjust order as needed, ensure it's unique and logical
  },
  "vscode": {
    id: "vscode",
    category: TemplateCategory.TOOL,
    order: VSCODE_ORDER
  },
  "zsh": {
    id: "zsh",
    category: TemplateCategory.UTILITY,
    order: ZSH_ORDER
  },
  "android": {
    id: "android",
    category: TemplateCategory.TOOL,
    order: KUBERNETES_ORDER
  },
  "cypress": {
    id: "cypress",
    category: TemplateCategory.TOOL,
    requiredVars: ["CYPRESS_VERSION"],
    order: TOOL_TEMPLATE_ORDER
  },
  "debianBackports": {
    id: "debianBackports",
    category: TemplateCategory.BASE,
    requiredVars: ["DISTRO"],
    order: DEBIAN_BACKPORTS_ORDER
  },
  "suffix": {
    id: "suffix",
    category: TemplateCategory.UTILITY,
    order: MAX_TEMPLATE_ORDER // Always last
  }
} as const;

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

// Type for software versions structure
interface SoftwareVersions {
  readonly node: Record<NodeVersion, string>;
  readonly yarn: string;
  readonly git: string;
  readonly deno: string;
  readonly cypress: string;
}

// Interface for generation result
interface GenerationResult {
  readonly Dockerfile: string;
  readonly README: string;
  readonly warnings: readonly string[];
}

// Interface for feature flags
interface FeatureFlags {
  xfce: boolean;
  docker: boolean;
  android: boolean;
  vscode: boolean;
  xpra: boolean;
  k8s: boolean;
  deno: boolean;
  noVNC: boolean;
  zsh: boolean;
  chromium: boolean;
  chrome: boolean;
}

/**
 * Enhanced DevcontainerGenerator with improved template management and validation
 */
export class DevcontainerGenerator {
  private _dockerfile = "";
  private _readme = "";
  private readonly _dockerTemplates: Record<string, string> = {};
  private readonly _readmeTemplates: Record<string, string> = {};
  private readonly _variables: Record<string, string> = {};
  private readonly _enabledTemplates: Set<string> = new Set();
  
  // Configuration options
  private readonly _features: FeatureFlags = {
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
    private readonly base: Base,
    private readonly templateDir: string = "../devcontainer-generator/templates"
  ) {
    this.validateBase(base);
    this.initializeBaseTemplates();
  }

  /**
   * Validates the base distribution parameter
   */
  private validateBase(base: Base): void {
    if (!base || typeof base !== 'string') {
      throw new Error('Base distribution must be a non-empty string');
    }
  }

  /**
   * Initializes base templates and variables
   */
  private initializeBaseTemplates(): void {
    // Always add base template
    this._enabledTemplates.add("base");
    this._enabledTemplates.add("suffix");
    
    // Set base distribution as a variable
    const distro = this.getDistro(this.base);
    this._variables["DISTRO"] = `${distro}:${this.base}`;
    this._variables["BASE"] = this.base;
  }

  /**
   * Gets the distribution type based on the base image
   */
  private getDistro(base: Base): string {
    if (base === "gitpod/workspace-full") {
      return "gitpod/workspace-full";
    }
    
    const debianDistros: readonly string[] = ["stretch", "buster", "bullseye", "bookworm", "trixie"];
    return debianDistros.includes(base) ? "debian" : "ubuntu";
  }

  /**
   * Initialize the generator by loading template files
   */
  public async init(): Promise<void> {
    const templateIds = Object.keys(templateRegistry);
    
    await Promise.all([
      this.loadDockerfileTemplates(templateIds),
      this.loadReadmeTemplates(templateIds)
    ]);
  }

  /**
   * Load all Dockerfile templates
   */
  private async loadDockerfileTemplates(templateIds: string[]): Promise<void> {
    const loadPromises = templateIds.map(async (id) => {
      try {
        const content = await this.loadTemplate(id, "Dockerfile");
        this._dockerTemplates[id] = content;
      } catch (error: unknown) {
        const errorMessage = this.getErrorMessage(error);
        console.warn(`Warning: Could not load Dockerfile template for ${id}:`, errorMessage);
        this._dockerTemplates[id] = "";
      }
    });
    
    await Promise.all(loadPromises);
  }

  /**
   * Load all README templates
   */
  private async loadReadmeTemplates(templateIds: string[]): Promise<void> {
    const loadPromises = templateIds.map(async (id) => {
      try {
        const content = await this.loadTemplate(id, "README");
        this._readmeTemplates[id] = content;
      } catch (error: unknown) {
        const errorMessage = this.getErrorMessage(error);
        console.warn(`Warning: Could not load README template for ${id}:`, errorMessage);
        this._readmeTemplates[id] = "";
      }
    });
    
    await Promise.all(loadPromises);
  }

  /**
   * Safely extracts error message from unknown error
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown error';
  }

  /**
   * Set the Node.js version to include
   * @param nodeType The Node.js version to use (lts or current)
   * @param optimized Whether to use the optimized multi-stage build template
   */
  public setNodeVersion(nodeType: NodeVersion, optimized = false): this {
    const versions = softwareVersions.default as SoftwareVersions;
    const nodeVersion = versions.node[nodeType];
    const yarnVersion = versions.yarn;
    
    if (!nodeVersion) {
      throw new Error(`Invalid Node.js version type: ${nodeType}`);
    }
    
    this._variables["NODE_VERSION"] = nodeVersion;
    this._variables["YARN_VERSION"] = yarnVersion;
    
    // Use either the standard or optimized Node.js template
    this._enabledTemplates.add(optimized ? "node-optimized" : "node");
    
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
    const versions = softwareVersions.default as SoftwareVersions;
    
    if (this.getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._enabledTemplates.add("gitUbuntu");
    } else {
      this._variables["GIT_VERSION"] = versions.git;
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
    const versions = softwareVersions.default as SoftwareVersions;
    this._features.deno = true;
    this._variables["DENO_VERSION"] = versions.deno;
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
  public setDotnet6(): this {    
    this._enabledTemplates.add("dotnet6");

    return this;
  }

  /**
   * Enable Cypress for end-to-end testing
   */
  public setCypress(): this {
    const versions = softwareVersions.default as SoftwareVersions;
    this._variables["CYPRESS_VERSION"] = versions.cypress;
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
    const enabledTemplates = Array.from(this._enabledTemplates);
    
    errors.push(
      ...this.validateTemplateConflicts(enabledTemplates),
      ...this.validateTemplateDependencies(enabledTemplates),
      ...this.validateRequiredVariables(enabledTemplates)
    );
    
    return errors;
  }

  /**
   * Validate template conflicts
   */
  private validateTemplateConflicts(enabledTemplates: string[]): string[] {
    const errors: string[] = [];
    
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
    
    return errors;
  }

  /**
   * Validate template dependencies
   * 
   * This function performs comprehensive dependency validation to ensure that:
   * 1. All required dependencies are present and enabled
   * 2. No circular dependencies exist in the dependency graph
   * 3. Dependencies are properly ordered (dependencies have lower order values)
   * 4. All dependency references point to valid templates in the registry
   * 
   * The validation prevents runtime errors and ensures that templates are processed
   * in the correct order during Dockerfile and README generation.
   * 
   * @param enabledTemplates Array of template IDs that are currently enabled
   * @returns Array of error messages describing any validation failures
   * 
   * @example
   * // If kubernetes template is enabled but docker is not:
   * // Returns: ["Missing dependency: kubernetes requires docker"]
   * 
   * // If templates have circular dependencies:
   * // Returns: ["Circular dependency detected: templateA -> templateB -> templateA"]
   * 
   * // If dependency ordering is incorrect:
   * // Returns: ["Dependency ordering issue: kubernetes (order: 35) depends on docker (order: 30), but dependency should have lower order value"]
   */
  private validateTemplateDependencies(enabledTemplates: string[]): string[] {
    const errors: string[] = [];
    
    // Validate that templateRegistry is properly initialized
    if (!templateRegistry || typeof templateRegistry !== 'object') {
      errors.push("Error: Template registry is not properly initialized");
      return errors;
    }
    
    // Check direct dependencies
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template) {
        errors.push(`Unknown template: ${templateId}`);
        continue;
      }
      
      if (template.dependencies) {
        for (const depId of template.dependencies) {
          if (!this._enabledTemplates.has(depId)) {
            errors.push(`Missing dependency: ${templateId} requires ${depId}`);
          } else {
            // Validate that the dependency template exists in registry
            const depTemplate = templateRegistry[depId];
            if (!depTemplate) {
              errors.push(`Invalid dependency: ${templateId} depends on unknown template ${depId}`);
            }
          }
        }
      }
    }
    
    // Check for circular dependencies
    const circularDependencyErrors = this.detectCircularDependencies(enabledTemplates);
    errors.push(...circularDependencyErrors);
    
    // Validate dependency ordering
    const orderingErrors = this.validateDependencyOrdering(enabledTemplates);
    errors.push(...orderingErrors);
    
    return errors;
  }

  /**
   * Detect circular dependencies in the template dependency graph
   */
  private detectCircularDependencies(enabledTemplates: string[]): string[] {
    const errors: string[] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    
    const detectCycle = (templateId: string, path: string[]): boolean => {
      if (recursionStack.has(templateId)) {
        const cycleStart = path.indexOf(templateId);
        const cycle = path.slice(cycleStart).concat(templateId);
        errors.push(`Circular dependency detected: ${cycle.join(' -> ')}`);
        return true;
      }
      
      if (visited.has(templateId)) {
        return false;
      }
      
      visited.add(templateId);
      recursionStack.add(templateId);
      
      const template = templateRegistry[templateId];
      if (template?.dependencies) {
        for (const depId of template.dependencies) {
          if (this._enabledTemplates.has(depId)) {
            if (detectCycle(depId, [...path, templateId])) {
              return true;
            }
          }
        }
      }
      
      recursionStack.delete(templateId);
      return false;
    };
    
    for (const templateId of enabledTemplates) {
      if (!visited.has(templateId)) {
        detectCycle(templateId, []);
      }
    }
    
    return errors;
  }

  /**
   * Validate that dependencies are ordered correctly based on template order values
   */
  private validateDependencyOrdering(enabledTemplates: string[]): string[] {
    const errors: string[] = [];
    
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template?.dependencies) continue;
      
      const templateOrder = template.order || DEFAULT_TEMPLATE_ORDER;
      
      for (const depId of template.dependencies) {
        if (!this._enabledTemplates.has(depId)) continue;
        
        const depTemplate = templateRegistry[depId];
        if (!depTemplate) continue;
        
        const depOrder = depTemplate.order || DEFAULT_TEMPLATE_ORDER;
        
        // Dependencies should have lower order values (be processed first)
        if (depOrder >= templateOrder) {
          errors.push(
            `Dependency ordering issue: ${templateId} (order: ${templateOrder}) ` +
            `depends on ${depId} (order: ${depOrder}), but dependency should have lower order value`
          );
        }
      }
    }
    
    return errors;
  }

  /**
   * Validate required variables
   */
  private validateRequiredVariables(enabledTemplates: string[]): string[] {
    const errors: string[] = [];
    
    // Validate initialization of templateRegistry and variables
    if (!templateRegistry || typeof templateRegistry !== 'object') {
      errors.push("Error: templateRegistry is not properly initialized.");
      return errors;
    }
    if (!this._variables || typeof this._variables !== 'object') {
      errors.push("Error: Variables are not properly initialized.");
      return errors;
    }
    
    for (const templateId of enabledTemplates) {
      const template = templateRegistry[templateId];
      if (!template) {
        errors.push(`Unknown template: ${templateId}`);
        continue;
      }
      
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
  public async generate(): Promise<GenerationResult> {
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
    const sortedTemplates = this.getSortedTemplates();
    
    // Generate content
    this.generateDockerfileContent(sortedTemplates, warnings);
    this.generateReadmeContent(sortedTemplates, warnings);
    
    // Clean up duplicate FROM statements
    this._dockerfile = this.cleanupDockerfile(this._dockerfile);
    
    return {
      Dockerfile: this._dockerfile,
      README: this._readme,
      warnings
    };
  }

  /**
   * Get templates sorted by order
   */
  private getSortedTemplates(): TemplateDefinition[] {
    return Array.from(this._enabledTemplates)
      .map(id => templateRegistry[id])
      .filter((template): template is TemplateDefinition => Boolean(template))
      .sort((a, b) => (a.order || DEFAULT_TEMPLATE_ORDER) - (b.order || DEFAULT_TEMPLATE_ORDER));
  }

  /**
   * Generate Dockerfile content from templates
   */
  private generateDockerfileContent(sortedTemplates: TemplateDefinition[], warnings: string[]): void {
    for (const template of sortedTemplates) {
      const templateContent = this._dockerTemplates[template.id];
      if (!templateContent) {
        warnings.push(`Missing Dockerfile template: ${template.id}`);
        continue;
      }
      
      const processedContent = this.processTemplate(templateContent, this._variables);
      this._dockerfile += processedContent;
    }
  }

  /**
   * Generate README content from templates
   */
  private generateReadmeContent(sortedTemplates: TemplateDefinition[], warnings: string[]): void {
    for (const template of sortedTemplates) {
      const templateContent = this._readmeTemplates[template.id];
      if (!templateContent) {
        warnings.push(`Missing README template: ${template.id}`);
        continue;
      }
      
      const processedContent = this.processTemplate(templateContent, this._variables);
      this._readme += processedContent;
    }
  }

  /**
   * Clean up Dockerfile by removing duplicate FROM statements
   */
  private cleanupDockerfile(dockerfile: string): string {
    return dockerfile.replace(/FROM devimage\n/g, "");
  }

  /**
   * Load a template file from the filesystem
   */
  private async loadTemplate(
    filename: string,
    extension: "Dockerfile" | "README",
  ): Promise<string> {
    if (!filename || !extension) {
      throw new Error('Filename and extension are required');
    }
    
    const filePath = `${this.templateDir}/${filename}.${extension}`;
    
    try {
      return await readFile(filePath, 'utf8');
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      throw new Error(`Could not read file: ${filePath} - ${errorMessage}`);
    }
  }
}
