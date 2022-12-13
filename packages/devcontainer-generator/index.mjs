// src/devcontainerGenerator.ts
import { readFile } from "fs/promises";

// versions.json
var node = {
  lts: "18.12.1",
  current: "19.2.0",
};
var deno = "1.27.2";
var git = "2.38.1";
var cypress = "12.0.2";
var yarn = "1.22.19";
var dotnet3 = "3.1.417";
var dotnet5 = "5.0.406";
var dotnet6 = "6.0.400";
var sha = {
  dotnet_sha512: {
    "3.1.417":
      "8eb1002ad829ddd17638b942d3f8da24ad71ccab268a92a1fa6af6a65d86a4ab7f885f663ea9c68127bb356462bce125222ec4f04dc928005cbbbb1a8658f107",
    "5.0.406":
      "21f0617d359d5c333a8925af71b359c0e9e371eaa6e4b20faf0f699296cebaacc56cb9660fa310b2ed99ca636f241f2df999698a883cf7899dd670bdf92bdd29",
    "6.0.300":
      "52d720e90cfb889a92d605d64e6d0e90b96209e1bd7eab00dab1d567017d7a5a4ff4adbc55aff4cffcea4b1bf92bb8d351859d00d8eb65059eec5e449886c938",
    "6.0.400": {
      amd:
        "8decbba0a6b09501daede52cbb5a9ae9e5f31ade201918c03efcd1b4cc345ec934f88321704ec3beb1f90f2204934be7259c76f66d9204cbdd15933582602763",
      arm:
        "a21010f9e0e091bf0a4df9dfc4ec9893c056c2b07b10be093ea392a4fa5c8a38bad9535f66e570b45dc25165b685199fb729434b845bcfb35f8b79cceb22c632",
    },
  },
};

// src/devcontainerGenerator.ts
var getDistro = (b) =>
  b === "gitpod/workspace-full"
    ? "gitpod/workspace-full"
    : b === "stretch" || b === "buster" || b === "bullseye" || b === "bookworm"
    ? "debian"
    : "ubuntu";
var DevcontainerGenerator = class {
  constructor(base) {
    this.base = base;
  }
  _dockerfile = "";
  _readme = "";
  _dockerTemplates = {};
  _readmeTemplates = {};
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
    "suffix",
  ];
  _nodeVersion = null;
  _gitVersion = "";
  _cypressVersion = "";
  _dotnet = null;
  _xfce = false;
  _debianBackports = false;
  _docker = false;
  _android = false;
  _vscode = false;
  _xpra = false;
  _k8s = false;
  _deno = false;
  _noVNC = false;
  _zsh = false;
  _chromium = false;
  _chrome = false;
  async init() {
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
      (input, index) => this._dockerTemplates[input] = String(bufferDockerfiles[index]),
    );
    this._templateInputs.forEach(
      (input, index) => this._readmeTemplates[input] = String(bufferReadmeFiles[index]),
    );
    return {
      dockerTemplates: this._dockerTemplates,
      readmeTemplates: this._readmeTemplates,
    };
  }
  setNodeVersion(nodeVersion) {
    this._nodeVersion = nodeVersion;
  }
  setVscode() {
    this._vscode = true;
  }
  updateGit(forceFromSource = false) {
    if (getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._gitVersion = "ubuntu";
    } else {
      this._gitVersion = git;
    }
  }
  setDebianBackports() {
    this._debianBackports = true;
  }
  setXfce() {
    this._xfce = true;
  }
  setDeno() {
    this._deno = true;
  }
  setK8s() {
    this._k8s = true;
  }
  setChrome() {
    this._chrome = true;
  }
  setChromium() {
    this._chromium = true;
  }
  setAndroid() {
    this._android = true;
  }
  setRemoteDesktop(type = "xpra") {
    if (type === "xpra") {
      this._xpra = true;
    } else {
      this._noVNC = true;
    }
  }
  setZsh() {
    this._zsh = true;
  }
  setDocker() {
    this._docker = true;
  }
  setDotnet(version = "6") {
    this._dotnet = version;
  }
  setCypress() {
    this._cypressVersion = cypress;
  }
  async generate() {
    const { dockerTemplates, readmeTemplates } = await this.init();
    this._dockerfile += dockerTemplates["base"].replace(
      "{DISTRO}",
      getDistro(this.base) + ":" + this.base,
    );
    this._readme += readmeTemplates["base"].replace("{DISTRO}", this.base);
    if (this._debianBackports) {
      this._dockerfile += dockerTemplates["debianBackports"].replace(
        "{DISTRO}",
        this.base,
      ).replace(
        "{DISTRO}",
        this.base,
      );
    }
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
    if (this._nodeVersion) {
      this._dockerfile += dockerTemplates["node"].replace(
        "{NODE_VERSION}",
        node[this._nodeVersion],
      ).replace(
        "{YARN_VERSION}",
        yarn,
      );
      this._readme += readmeTemplates["node"].replace(
        "{NODE_VERSION}",
        node[this._nodeVersion],
      ).replace(
        "{YARN_VERSION}",
        yarn,
      );
    }
    if (this._dotnet) {
      if (this._dotnet === "6") {
        this._dockerfile += dockerTemplates["dotnet6"].replace(
          "{DOTNET_SDK_VERSION}",
          dotnet6,
        ).replace(
          "{arm_dotnet_sha512}",
          sha.dotnet_sha512["6.0.400"].arm,
        ).replace(
          "{amd_dotnet_sha512}",
          sha.dotnet_sha512["6.0.400"].amd,
        );
      } else if (this._dotnet === "3") {
        this._dockerfile += dockerTemplates["dotnet3"].replace(
          "{DOTNET_SDK_VERSION}",
          dotnet3,
        ).replace(
          "{amd_dotnet_sha512}",
          sha.dotnet_sha512[dotnet3],
        );
      } else {
        this._dockerfile += dockerTemplates["dotnet5"].replace(
          "{DOTNET_SDK_VERSION}",
          dotnet5,
        ).replace(
          "{dotnet_sha512}",
          sha.dotnet_sha512[dotnet5],
        );
      }
    }
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
    if (this._xpra) {
      this._dockerfile += dockerTemplates["xpra"].replace(
        /{XPRADISTRO}/g,
        this.base,
      );
      this._readme += readmeTemplates["xpra"];
      let xpraStart = "xpra start --start=xterm";
      if (this._xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
        xpraStart = "xpra start-desktop --start=xfce4-session";
      }
      this._dockerfile += `
RUN echo "${xpraStart} --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx
`;
      if (this._vscode) {
        this._dockerfile += dockerTemplates["vscode"];
        this._readme += readmeTemplates["vscode"];
      }
    } else if (this._noVNC) {
      this._dockerfile += dockerTemplates["noVNC"];
      this._readme += readmeTemplates["noVNC"];
      if (this._xfce) {
        this._dockerfile += dockerTemplates["xfce"];
        this._readme += readmeTemplates["xfce"];
      }
    }
    if (this._chrome) {
      this._dockerfile += dockerTemplates["google-chrome"].replace(
        "{CHROMIUM}",
        getDistro(this.base) === "debian" ? "chromium" : "firefox",
      );
      this._readme += readmeTemplates["google-chrome"];
    }
    if (this._chromium) {
      this._dockerfile += dockerTemplates["chromium"].replace(
        "{CHROMIUM}",
        getDistro(this.base) === "debian" ? "chromium" : "firefox",
      );
      this._readme += readmeTemplates["chromium"];
    }
    if (this._android) {
      this._dockerfile += dockerTemplates["android"];
      this._readme += readmeTemplates["android"];
    }
    if (this._vscode) {
      this._dockerfile += dockerTemplates["vscode"];
      this._readme += readmeTemplates["vscode"];
    }
    if (this._docker || this._k8s) {
      this._dockerfile += dockerTemplates["docker"].replace(
        "{DISTRO}",
        getDistro(this.base),
      );
      this._readme += readmeTemplates["docker"];
      if (this._k8s) {
        this._dockerfile += dockerTemplates["kubernetes"].replace(
          "{DISTRO}",
          getDistro(this.base),
        );
        this._readme += readmeTemplates["kubernetes"];
      }
    }
    if (this._zsh) {
      this._dockerfile += dockerTemplates["zsh"];
      this._readme += readmeTemplates["zsh"];
    }
    if (this._deno) {
      this._dockerfile += dockerTemplates["deno"].replace(
        "{DENO_VERSION}",
        deno,
      );
      this._readme += readmeTemplates["deno"].replace("{DENO_VERSION}", deno);
    }
    this._dockerfile += dockerTemplates["suffix"];
    this._readme += readmeTemplates["suffix"];
    this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");
    return {
      Dockerfile: this._dockerfile,
      README: this._readme,
    };
  }
  loadTemplate = async (filename, extension) =>
    await readFile(
      `../devcontainer-generator/templates/${filename}.${extension}`,
    ).catch((e) => {
      console.error({ e });
      return "";
    });
};
export { DevcontainerGenerator };
