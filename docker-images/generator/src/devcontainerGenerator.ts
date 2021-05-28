// deno-lint-ignore-file

import { promises as fs } from "fs";

type Base =
  | "stretch"
  | "buster"
  | "bionic"
  | "disco"
  | "eoan"
  | "groovy"
  | "focal"
  | "hirsute"
  | "implish"
  | "rolling"
  | "gitpod/workspace-full";
type nodeVersion = "lts" | "current";

const getDistro = (b: Base) =>
  b === "gitpod/workspace-full"
    ? "gitpod/workspace-full"
    : b === "stretch" || b === "buster"
    ? "debian"
    : "ubuntu";

import * as softwareVersions from "../versions.json";

export class DevcontainerGenerator {
  private _dockerfile = "";
  private _readme = "";

  private _dockerTemplates: { [key: string]: string } = {};
  private _readmeTemplates: { [key: string]: string } = {};

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
    "dotnet",
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
  private _nodeVersion: nodeVersion | null = null;
  private _gitVersion = "";
  private _cypressVersion = "";
  private _dotnet: null | "2" | "3" | "5" = null;
  private _xfce = false;
  private _debianBackports = false;
  private _docker = false;
  private _android = false;
  private _vscode = false;
  private _xpra = false;
  private _k8s = false;
  private _deno = false;
  private _noVNC = false;
  private _zsh = false;
  private _chromium = false;
  private _chrome = false;

  constructor(private base: Base) {}

  private async init() {
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
      (
        input,
        index,
      ) => (this._dockerTemplates[input] = String(bufferDockerfiles[index])),
    );
    this._templateInputs.forEach(
      (
        input,
        index,
      ) => (this._readmeTemplates[input] = String(bufferReadmeFiles[index])),
    );

    return {
      dockerTemplates: this._dockerTemplates,
      readmeTemplates: this._readmeTemplates,
    };
  }

  public setNodeVersion(nodeVersion: nodeVersion) {
    this._nodeVersion = nodeVersion;
  }

  public setVscode() {
    this._vscode = true;
  }

  public updateGit(forceFromSource = false) {
    if (getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._gitVersion = "ubuntu";
    } else this._gitVersion = softwareVersions.git;
  }

  public setDebianBackports() {
    this._debianBackports = true;
  }

  public setXfce() {
    this._xfce = true;
  }

  public setDeno() {
    this._deno = true;
  }

  public setK8s() {
    this._k8s = true;
  }

  public setChrome() {
    this._chrome = true;
  }

  public setChromium() {
    this._chromium = true;
  }

  public setAndroid() {
    this._android = true;
  }

  public setRemoteDesktop(type: "xpra" | "noVNC" = "xpra") {
    if (type === "xpra") {
      this._xpra = true;
    } else {
      this._noVNC = true;
    }

    //      if ((this._noVNC===true || this._xfce) && this._xpra===true) throw new Error("You can't have VNC and Xpra on the same image");
  }

  public setZsh() {
    this._zsh = true;
  }

  public setDocker() {
    this._docker = true;
  }

  public setDotnet(version: "2" | "3" | "5" = "2") {
    this._dotnet = version;
  }

  public setCypress() {
    this._cypressVersion = softwareVersions.cypress;
  }

  public async generate() {
    const { dockerTemplates, readmeTemplates } = await this.init();

    this._dockerfile += dockerTemplates["base"].replace(
      "{DISTRO}",
      getDistro(this.base) + ":" + this.base,
    );
    this._readme += readmeTemplates["base"].replace("{DISTRO}", this.base);

    if (this._debianBackports) {
      this._dockerfile += dockerTemplates["debianBackports"]
        .replace("{DISTRO}", this.base)
        .replace("{DISTRO}", this.base);
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
    if (this._deno) {
      this._dockerfile += dockerTemplates["deno"]
        .replace("{DENO_VERSION}", softwareVersions.deno);

      this._readme += readmeTemplates["deno"]
        .replace("{DENO_VERSION}", softwareVersions.deno);
    }

    if (this._nodeVersion) {
      this._dockerfile += dockerTemplates["node"]
        .replace("{NODE_VERSION}", softwareVersions.node[this._nodeVersion])
        .replace("{YARN_VERSION}", softwareVersions.yarn);

      this._readme += readmeTemplates["node"]
        .replace("{NODE_VERSION}", softwareVersions.node[this._nodeVersion])
        .replace("{YARN_VERSION}", softwareVersions.yarn);
    }

    if (this._dotnet) {
      if (this._dotnet === "2") {
        this._dockerfile += dockerTemplates["dotnet"]
          .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet)
          .replace(
            "{dotnet_sha512}",
            softwareVersions.sha.dotnet_sha512["2.1.816"],
          );
      } else if (this._dotnet === "3") {
        this._dockerfile += dockerTemplates["dotnet3"]
          .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet3)
          .replace(
            "{dotnet_sha512}",
            softwareVersions.sha.dotnet_sha512["3.1.409"],
          );
      } else {
        this._dockerfile += dockerTemplates["dotnet3"]
          .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet5)
          .replace(
            "{dotnet_sha512}",
            softwareVersions.sha.dotnet_sha512["5.0.300"],
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

      this._dockerfile +=
        `\nRUN echo "${xpraStart} --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx\n`;

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

    this._dockerfile += dockerTemplates["suffix"];
    this._readme += readmeTemplates["suffix"];

    this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");

    return {
      Dockerfile: this._dockerfile,
      README: this._readme,
    };
  }

  private loadTemplate = async (
    filename: string,
    extension: "Dockerfile" | "README",
  ) =>
    await fs
      .readFile(`${__dirname}/../../templates/${filename}.${extension}`)
      .catch((e) => {
        console.error({ e });
        return "";
      });
}
