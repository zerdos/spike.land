import { readFile } from "fs/promises";
import * as softwareVersions from "../versions.json";

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

interface TemplateSet {
  dockerTemplates: Record<string, string>;
  readmeTemplates: Record<string, string>;
}

/**
 * Gets the distribution type based on the base image
 */
const getDistro = (base: Base): string => {
  if (base === "gitpod/workspace-full") {
    return "gitpod/workspace-full";
  }
  
  const debianDistros = ["stretch", "buster", "bullseye", "bookworm", "trixie"];
  return debianDistros.includes(base as string) ? "debian" : "ubuntu";
};

/**
 * DevcontainerGenerator generates Dockerfiles and README files for development containers
 * with various tools and technologies.
 */
export class DevcontainerGenerator {
  private _dockerfile = "";
  private _readme = "";
  private _dockerTemplates: Record<string, string> = {};
  private _readmeTemplates: Record<string, string> = {};
  
  // Configuration options
  private _nodeVersion: NodeVersion | null = null;
  private _gitVersion = "";
  private _cypressVersion = "";
  private _dotnet: DotnetVersion | null = null;
  private _debianBackports = false;
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

  // Template input components
  private _templateInputs = [
    "base",
    "android",
    "git",
    "debianBackports",
    "google-chrome",
    "chromium",
    "gitUbuntu",
    "node",
    "cypress",
    "dotnet6",
    "docker",
    "kubernetes",
    "dotnet3",
    "xfce",
    "noVNC",
    "xpra",
    "deno",
    "zsh",
    "vscode",
    "suffix"
  ];

  /**
   * Creates a new DevcontainerGenerator
   * @param base The base distribution to use for the container
   */
  constructor(private base: Base) {}

  /**
   * Initialize the generator by loading all template files
   */
  private async init(): Promise<TemplateSet> {
    try {
      const bufferDockerfiles = await Promise.all(
        this._templateInputs.map(
          async (fileName) => await this.loadTemplate(fileName, "Dockerfile"),
        ),
      );
      
      const bufferReadmeFiles = await Promise.all(
        this._templateInputs.map(
          async (fileName) => await this.loadTemplate(fileName, "README"),
        ),
      );

      this._templateInputs.forEach(
        (input, index) => (this._dockerTemplates[input] = String(bufferDockerfiles[index])),
      );
      
      this._templateInputs.forEach(
        (input, index) => (this._readmeTemplates[input] = String(bufferReadmeFiles[index])),
      );

      return {
        dockerTemplates: this._dockerTemplates,
        readmeTemplates: this._readmeTemplates,
      };
    } catch (error) {
      console.error("Failed to initialize templates:", error);
      throw new Error("Template initialization failed");
    }
  }

  /**
   * Set the Node.js version to include
   */
  public setNodeVersion(nodeVersion: NodeVersion): this {
    this._nodeVersion = nodeVersion;
    return this;
  }

  /**
   * Enable VS Code in the container
   */
  public setVscode(): this {
    this._features.vscode = true;
    return this;
  }

  /**
   * Update Git to the latest version or use Ubuntu's package
   */
  public updateGit(forceFromSource = false): this {
    if (getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._gitVersion = "ubuntu";
    } else {
      this._gitVersion = softwareVersions.git;
    }
    return this;
  }

  /**
   * Enable Debian backports repository
   */
  public setDebianBackports(): this {
    this._debianBackports = true;
    return this;
  }

  /**
   * Enable XFCE desktop environment
   */
  public setXfce(): this {
    this._features.xfce = true;
    return this;
  }

  /**
   * Enable Deno runtime
   */
  public setDeno(): this {
    this._features.deno = true;
    return this;
  }

  /**
   * Enable Kubernetes tools
   */
  public setK8s(): this {
    this._features.k8s = true;
    return this;
  }

  /**
   * Enable Google Chrome browser
   */
  public setChrome(): this {
    this._features.chrome = true;
    return this;
  }

  /**
   * Enable Chromium browser
   */
  public setChromium(): this {
    this._features.chromium = true;
    return this;
  }

  /**
   * Enable Android development tools
   */
  public setAndroid(): this {
    this._features.android = true;
    return this;
  }

  /**
   * Enable remote desktop (either xpra or noVNC)
   */
  public setRemoteDesktop(type: RemoteDesktopType = "xpra"): this {
    if (type === "xpra") {
      this._features.xpra = true;
    } else {
      this._features.noVNC = true;
    }

    // Validate remote desktop settings
    if (this._features.noVNC && this._features.xpra) {
      console.warn("Warning: Both noVNC and Xpra are enabled. This may cause conflicts.");
    }
    
    return this;
  }

  /**
   * Enable Zsh shell with Oh My Zsh
   */
  public setZsh(): this {
    this._features.zsh = true;
    return this;
  }

  /**
   * Enable Docker in the container
   */
  public setDocker(): this {
    this._features.docker = true;
    return this;
  }

  /**
   * Enable .NET SDK
   */
  public setDotnet(version: DotnetVersion = "6"): this {
    this._dotnet = version;
    return this;
  }

  /**
   * Enable Cypress for end-to-end testing
   */
  public setCypress(): this {
    this._cypressVersion = softwareVersions.cypress;
    return this;
  }

  /**
   * Generate Dockerfile and README based on the selected options
   */
  public async generate(): Promise<{ Dockerfile: string; README: string }> {
    try {
      const { dockerTemplates, readmeTemplates } = await this.init();

      // Start with base image
      this._dockerfile += dockerTemplates["base"].replace(
        "{DISTRO}",
        getDistro(this.base) + ":" + this.base,
      );
      this._readme += readmeTemplates["base"].replace("{DISTRO}", this.base);

      // Add Debian backports if enabled
      if (this._debianBackports) {
        this._dockerfile += dockerTemplates["debianBackports"]
          .replace(/{DISTRO}/g, this.base);
      }

      // Add Git setup
      if (this._gitVersion) {
        if (this._gitVersion === "ubuntu") {
          this._dockerfile += dockerTemplates["gitUbuntu"];
        } else {
          this._dockerfile += dockerTemplates["git"].replace(
            "{GIT_VERSION}",
            this._gitVersion,
          );
        }
      }

      // Add Node.js
      if (this._nodeVersion) {
        const nodeVersion = softwareVersions.node[this._nodeVersion];
        const yarnVersion = softwareVersions.yarn;
        
        this._dockerfile += dockerTemplates["node"]
          .replace("{NODE_VERSION}", nodeVersion)
          .replace("{YARN_VERSION}", yarnVersion);

        this._readme += readmeTemplates["node"]
          .replace("{NODE_VERSION}", nodeVersion)
          .replace("{YARN_VERSION}", yarnVersion);
      }

      // Add .NET SDK
      if (this._dotnet) {
        this.addDotnetSdk(dockerTemplates);
      }

      // Add Cypress
      if (this._cypressVersion) {
        this._dockerfile += dockerTemplates["cypress"].replace(
          "{CYPRESS_VERSION}",
          this._cypressVersion,
        );
        this._readme += readmeTemplates["cypress"].replace(
          "{CYPRESS_VERSION}",
          this._cypressVersion,
        );
      }

      // Configure Remote Desktop
      this.configureRemoteDesktop(dockerTemplates, readmeTemplates);

      // Add Chrome/Chromium
      if (this._features.chrome) {
        this._dockerfile += dockerTemplates["google-chrome"].replace(
          "{CHROMIUM}",
          getDistro(this.base) === "debian" ? "chromium" : "firefox",
        );
        this._readme += readmeTemplates["google-chrome"];
      }

      if (this._features.chromium) {
        this._dockerfile += dockerTemplates["chromium"].replace(
          "{CHROMIUM}",
          getDistro(this.base) === "debian" ? "chromium" : "firefox",
        );
        this._readme += readmeTemplates["chromium"];
      }

      // Add Android tools
      if (this._features.android) {
        this._dockerfile += dockerTemplates["android"];
        this._readme += readmeTemplates["android"];
      }

      // Add VS Code (if not already added)
      if (this._features.vscode && !this._features.xpra) {
        this._dockerfile += dockerTemplates["vscode"];
        this._readme += readmeTemplates["vscode"];
      }

      // Add Docker and Kubernetes
      if (this._features.docker || this._features.k8s) {
        this._dockerfile += dockerTemplates["docker"].replace(
          "{DISTRO}",
          getDistro(this.base),
        );
        this._readme += readmeTemplates["docker"];

        if (this._features.k8s) {
          this._dockerfile += dockerTemplates["kubernetes"].replace(
            "{DISTRO}",
            getDistro(this.base),
          );
          this._readme += readmeTemplates["kubernetes"];
        }
      }

      // Add Zsh
      if (this._features.zsh) {
        this._dockerfile += dockerTemplates["zsh"];
        this._readme += readmeTemplates["zsh"];
      }

      // Add Deno
      if (this._features.deno) {
        this._dockerfile += dockerTemplates["deno"].replace("{DENO_VERSION}", softwareVersions.deno);
        this._readme += readmeTemplates["deno"].replace("{DENO_VERSION}", softwareVersions.deno);
      }

      // Add suffix
      this._dockerfile += dockerTemplates["suffix"];
      this._readme += readmeTemplates["suffix"];

      // Clean up duplicate FROM statements
      this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");

      return {
        Dockerfile: this._dockerfile,
        README: this._readme,
      };
    } catch (error) {
      console.error("Error generating Dockerfile:", error);
      throw new Error("Failed to generate Dockerfile");
    }
  }

  /**
   * Helper method to add .NET SDK configuration
   */
  private addDotnetSdk(dockerTemplates: Record<string, string>): void {
    const dotnetShaRecords = softwareVersions.sha.dotnet_sha512 as Record<string, string | { amd: string, arm: string }>;
    
    if (this._dotnet === "6") {
      const dotnetVersion = softwareVersions.dotnet6;
      const shaValues = dotnetShaRecords["6.0.400"] as { amd: string, arm: string };
      
      this._dockerfile += dockerTemplates["dotnet6"]
        .replace("{DOTNET_SDK_VERSION}", dotnetVersion)
        .replace("{arm_dotnet_sha512}", shaValues.arm)
        .replace("{amd_dotnet_sha512}", shaValues.amd);
    } 
    else if (this._dotnet === "3") {
      const dotnetVersion = softwareVersions.dotnet3 as "3.1.417";
      const shaRecord = dotnetShaRecords[dotnetVersion];
      const shaValue = typeof shaRecord === 'string' ? shaRecord : (shaRecord as { amd: string }).amd;
      
      this._dockerfile += dockerTemplates["dotnet3"]
        .replace("{DOTNET_SDK_VERSION}", dotnetVersion)
        .replace("{amd_dotnet_sha512}", shaValue);
    } 
    else {
      const dotnetVersion = softwareVersions.dotnet5 as "5.0.406";
      const shaRecord = dotnetShaRecords[dotnetVersion];
      const shaValue = typeof shaRecord === 'string' ? shaRecord : shaRecord.amd;
      
      this._dockerfile += dockerTemplates["dotnet5"]
        .replace("{DOTNET_SDK_VERSION}", dotnetVersion)
        .replace("{dotnet_sha512}", shaValue);
    }
  }

  /**
   * Helper method to configure remote desktop options
   */
  private configureRemoteDesktop(
    dockerTemplates: Record<string, string>, 
    readmeTemplates: Record<string, string>
  ): void {
    if (this._features.xpra) {
      this._dockerfile += dockerTemplates["xpra"].replace(
        /{XPRADISTRO}/g,
        this.base,
      );
      this._readme += readmeTemplates["xpra"];

      // Configure XFCE with Xpra if enabled
      let xpraStart = "xpra start --start=xterm";
      if (this._features.xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
        xpraStart = "xpra start-desktop --start=xfce4-session";
      }

      // Add Xpra startup command
      this._dockerfile += `\nRUN echo "${xpraStart} --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx\n`;

      // Add VS Code if enabled with Xpra
      if (this._features.vscode) {
        this._dockerfile += dockerTemplates["vscode"];
        this._readme += readmeTemplates["vscode"];
      }
    } 
    else if (this._features.noVNC) {
      this._dockerfile += dockerTemplates["noVNC"];
      this._readme += readmeTemplates["noVNC"];

      // Configure XFCE with noVNC if enabled
      if (this._features.xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
      }
    }
  }

  /**
   * Load a template file from the filesystem
   */
  private async loadTemplate(
    filename: string,
    extension: "Dockerfile" | "README",
  ): Promise<string> {
    try {
      return await readFile(
        `../devcontainer-generator/templates/${filename}.${extension}`,
        'utf8'
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.warn(`Warning: Could not load template ${filename}.${extension}:`, errorMessage);
      return "";
    }
  }
}