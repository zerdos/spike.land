// src/devcontainerGenerator.ts
import { readFile } from "fs/promises";

// versions.json
var node = {
  lts: "22.14.0",
  current: "23.8.0"
};
var deno = "2.2.1";
var git = "2.48.1";
var cypress = "14.0.3";
var yarn = "1.22.19";
var dotnet3 = "3.1.417";
var dotnet5 = "5.0.406";
var dotnet6 = "6.0.400";
var sha = {
  dotnet_sha512: {
    "3.1.417": "8eb1002ad829ddd17638b942d3f8da24ad71ccab268a92a1fa6af6a65d86a4ab7f885f663ea9c68127bb356462bce125222ec4f04dc928005cbbbb1a8658f107",
    "5.0.406": "21f0617d359d5c333a8925af71b359c0e9e371eaa6e4b20faf0f699296cebaacc56cb9660fa310b2ed99ca636f241f2df999698a883cf7899dd670bdf92bdd29",
    "6.0.300": "52d720e90cfb889a92d605d64e6d0e90b96209e1bd7eab00dab1d567017d7a5a4ff4adbc55aff4cffcea4b1bf92bb8d351859d00d8eb65059eec5e449886c938",
    "6.0.400": {
      amd: "8decbba0a6b09501daede52cbb5a9ae9e5f31ade201918c03efcd1b4cc345ec934f88321704ec3beb1f90f2204934be7259c76f66d9204cbdd15933582602763",
      arm: "a21010f9e0e091bf0a4df9dfc4ec9893c056c2b07b10be093ea392a4fa5c8a38bad9535f66e570b45dc25165b685199fb729434b845bcfb35f8b79cceb22c632"
    }
  }
};

// src/devcontainerGenerator.ts
var getDistro = (base) => {
  if (base === "gitpod/workspace-full") {
    return "gitpod/workspace-full";
  }
  const debianDistros = ["stretch", "buster", "bullseye", "bookworm", "trixie"];
  return debianDistros.includes(base) ? "debian" : "ubuntu";
};
var DevcontainerGenerator = class {
  /**
   * Creates a new DevcontainerGenerator
   * @param base The base distribution to use for the container
   */
  constructor(base) {
    this.base = base;
  }
  _dockerfile = "";
  _readme = "";
  _dockerTemplates = {};
  _readmeTemplates = {};
  // Configuration options
  _nodeVersion = null;
  _gitVersion = "";
  _cypressVersion = "";
  _dotnet = null;
  _debianBackports = false;
  _features = {
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
  _templateInputs = [
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
   * Initialize the generator by loading all template files
   */
  async init() {
    try {
      const bufferDockerfiles = await Promise.all(
        this._templateInputs.map(
          async (fileName) => await this.loadTemplate(fileName, "Dockerfile")
        )
      );
      const bufferReadmeFiles = await Promise.all(
        this._templateInputs.map(
          async (fileName) => await this.loadTemplate(fileName, "README")
        )
      );
      this._templateInputs.forEach(
        (input, index) => this._dockerTemplates[input] = String(bufferDockerfiles[index])
      );
      this._templateInputs.forEach(
        (input, index) => this._readmeTemplates[input] = String(bufferReadmeFiles[index])
      );
      return {
        dockerTemplates: this._dockerTemplates,
        readmeTemplates: this._readmeTemplates
      };
    } catch (error) {
      console.error("Failed to initialize templates:", error);
      throw new Error("Template initialization failed");
    }
  }
  /**
   * Set the Node.js version to include
   */
  setNodeVersion(nodeVersion) {
    this._nodeVersion = nodeVersion;
    return this;
  }
  /**
   * Enable VS Code in the container
   */
  setVscode() {
    this._features.vscode = true;
    return this;
  }
  /**
   * Update Git to the latest version or use Ubuntu's package
   */
  updateGit(forceFromSource = false) {
    if (getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._gitVersion = "ubuntu";
    } else {
      this._gitVersion = git;
    }
    return this;
  }
  /**
   * Enable Debian backports repository
   */
  setDebianBackports() {
    this._debianBackports = true;
    return this;
  }
  /**
   * Enable XFCE desktop environment
   */
  setXfce() {
    this._features.xfce = true;
    return this;
  }
  /**
   * Enable Deno runtime
   */
  setDeno() {
    this._features.deno = true;
    return this;
  }
  /**
   * Enable Kubernetes tools
   */
  setK8s() {
    this._features.k8s = true;
    return this;
  }
  /**
   * Enable Google Chrome browser
   */
  setChrome() {
    this._features.chrome = true;
    return this;
  }
  /**
   * Enable Chromium browser
   */
  setChromium() {
    this._features.chromium = true;
    return this;
  }
  /**
   * Enable Android development tools
   */
  setAndroid() {
    this._features.android = true;
    return this;
  }
  /**
   * Enable remote desktop (either xpra or noVNC)
   */
  setRemoteDesktop(type = "xpra") {
    if (type === "xpra") {
      this._features.xpra = true;
    } else {
      this._features.noVNC = true;
    }
    if (this._features.noVNC && this._features.xpra) {
      console.warn("Warning: Both noVNC and Xpra are enabled. This may cause conflicts.");
    }
    return this;
  }
  /**
   * Enable Zsh shell with Oh My Zsh
   */
  setZsh() {
    this._features.zsh = true;
    return this;
  }
  /**
   * Enable Docker in the container
   */
  setDocker() {
    this._features.docker = true;
    return this;
  }
  /**
   * Enable .NET SDK
   */
  setDotnet(version = "6") {
    this._dotnet = version;
    return this;
  }
  /**
   * Enable Cypress for end-to-end testing
   */
  setCypress() {
    this._cypressVersion = cypress;
    return this;
  }
  /**
   * Generate Dockerfile and README based on the selected options
   */
  async generate() {
    try {
      const { dockerTemplates, readmeTemplates } = await this.init();
      this._dockerfile += dockerTemplates["base"].replace(
        "{DISTRO}",
        getDistro(this.base) + ":" + this.base
      );
      this._readme += readmeTemplates["base"].replace("{DISTRO}", this.base);
      if (this._debianBackports) {
        this._dockerfile += dockerTemplates["debianBackports"].replace(/{DISTRO}/g, this.base);
      }
      if (this._gitVersion) {
        if (this._gitVersion === "ubuntu") {
          this._dockerfile += dockerTemplates["gitUbuntu"];
        } else {
          this._dockerfile += dockerTemplates["git"].replace(
            "{GIT_VERSION}",
            this._gitVersion
          );
        }
      }
      if (this._nodeVersion) {
        const nodeVersion = node[this._nodeVersion];
        const yarnVersion = yarn;
        this._dockerfile += dockerTemplates["node"].replace("{NODE_VERSION}", nodeVersion).replace("{YARN_VERSION}", yarnVersion);
        this._readme += readmeTemplates["node"].replace("{NODE_VERSION}", nodeVersion).replace("{YARN_VERSION}", yarnVersion);
      }
      if (this._dotnet) {
        this.addDotnetSdk(dockerTemplates);
      }
      if (this._cypressVersion) {
        this._dockerfile += dockerTemplates["cypress"].replace(
          "{CYPRESS_VERSION}",
          this._cypressVersion
        );
        this._readme += readmeTemplates["cypress"].replace(
          "{CYPRESS_VERSION}",
          this._cypressVersion
        );
      }
      this.configureRemoteDesktop(dockerTemplates, readmeTemplates);
      if (this._features.chrome) {
        this._dockerfile += dockerTemplates["google-chrome"].replace(
          "{CHROMIUM}",
          getDistro(this.base) === "debian" ? "chromium" : "firefox"
        );
        this._readme += readmeTemplates["google-chrome"];
      }
      if (this._features.chromium) {
        this._dockerfile += dockerTemplates["chromium"].replace(
          "{CHROMIUM}",
          getDistro(this.base) === "debian" ? "chromium" : "firefox"
        );
        this._readme += readmeTemplates["chromium"];
      }
      if (this._features.android) {
        this._dockerfile += dockerTemplates["android"];
        this._readme += readmeTemplates["android"];
      }
      if (this._features.vscode && !this._features.xpra) {
        this._dockerfile += dockerTemplates["vscode"];
        this._readme += readmeTemplates["vscode"];
      }
      if (this._features.docker || this._features.k8s) {
        this._dockerfile += dockerTemplates["docker"].replace(
          "{DISTRO}",
          getDistro(this.base)
        );
        this._readme += readmeTemplates["docker"];
        if (this._features.k8s) {
          this._dockerfile += dockerTemplates["kubernetes"].replace(
            "{DISTRO}",
            getDistro(this.base)
          );
          this._readme += readmeTemplates["kubernetes"];
        }
      }
      if (this._features.zsh) {
        this._dockerfile += dockerTemplates["zsh"];
        this._readme += readmeTemplates["zsh"];
      }
      if (this._features.deno) {
        this._dockerfile += dockerTemplates["deno"].replace("{DENO_VERSION}", deno);
        this._readme += readmeTemplates["deno"].replace("{DENO_VERSION}", deno);
      }
      this._dockerfile += dockerTemplates["suffix"];
      this._readme += readmeTemplates["suffix"];
      this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");
      return {
        Dockerfile: this._dockerfile,
        README: this._readme
      };
    } catch (error) {
      console.error("Error generating Dockerfile:", error);
      throw new Error("Failed to generate Dockerfile");
    }
  }
  /**
   * Helper method to add .NET SDK configuration
   */
  addDotnetSdk(dockerTemplates) {
    const dotnetShaRecords = sha.dotnet_sha512;
    if (this._dotnet === "6") {
      const dotnetVersion = dotnet6;
      const shaValues = dotnetShaRecords["6.0.400"];
      this._dockerfile += dockerTemplates["dotnet6"].replace("{DOTNET_SDK_VERSION}", dotnetVersion).replace("{arm_dotnet_sha512}", shaValues.arm).replace("{amd_dotnet_sha512}", shaValues.amd);
    } else if (this._dotnet === "3") {
      const dotnetVersion = dotnet3;
      const shaRecord = dotnetShaRecords[dotnetVersion];
      const shaValue = typeof shaRecord === "string" ? shaRecord : shaRecord.amd;
      this._dockerfile += dockerTemplates["dotnet3"].replace("{DOTNET_SDK_VERSION}", dotnetVersion).replace("{amd_dotnet_sha512}", shaValue);
    } else {
      const dotnetVersion = dotnet5;
      const shaRecord = dotnetShaRecords[dotnetVersion];
      const shaValue = typeof shaRecord === "string" ? shaRecord : shaRecord.amd;
      this._dockerfile += dockerTemplates["dotnet5"].replace("{DOTNET_SDK_VERSION}", dotnetVersion).replace("{dotnet_sha512}", shaValue);
    }
  }
  /**
   * Helper method to configure remote desktop options
   */
  configureRemoteDesktop(dockerTemplates, readmeTemplates) {
    if (this._features.xpra) {
      this._dockerfile += dockerTemplates["xpra"].replace(
        /{XPRADISTRO}/g,
        this.base
      );
      this._readme += readmeTemplates["xpra"];
      let xpraStart = "xpra start --start=xterm";
      if (this._features.xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
        xpraStart = "xpra start-desktop --start=xfce4-session";
      }
      this._dockerfile += `
RUN echo "${xpraStart} --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx
`;
      if (this._features.vscode) {
        this._dockerfile += dockerTemplates["vscode"];
        this._readme += readmeTemplates["vscode"];
      }
    } else if (this._features.noVNC) {
      this._dockerfile += dockerTemplates["noVNC"];
      this._readme += readmeTemplates["noVNC"];
      if (this._features.xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
      }
    }
  }
  /**
   * Load a template file from the filesystem
   */
  async loadTemplate(filename, extension) {
    try {
      return await readFile(
        `../devcontainer-generator/templates/${filename}.${extension}`,
        "utf8"
      );
    } catch (error) {
      console.warn(`Warning: Could not load template ${filename}.${extension}:`, error.message);
      return "";
    }
  }
};
export {
  DevcontainerGenerator
};
