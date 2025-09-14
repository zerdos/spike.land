export function setupUrlMock() {
  global.URL = class {
    href: string;
    origin: string;
    protocol: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchParams: URLSearchParams;
    hash: string;

    constructor(url: string | URL, base?: string | URL) {
      const urlString = typeof url === "string" ? url : url.toString();
      const baseString = base
        ? (typeof base === "string" ? base : base.toString())
        : undefined;

      const fullUrl = baseString ? `${baseString}${urlString}` : urlString;
      const parsedUrl = this.parseUrl(fullUrl);

      this.href = fullUrl;
      this.origin = parsedUrl.origin;
      this.protocol = parsedUrl.protocol;
      this.username = "";
      this.password = "";
      this.host = parsedUrl.host;
      this.hostname = parsedUrl.hostname;
      this.port = parsedUrl.port;
      this.pathname = parsedUrl.pathname;
      this.search = parsedUrl.search;
      this.searchParams = new URLSearchParams(parsedUrl.search);
      this.hash = parsedUrl.hash;
    }

    private parseUrl(url: string): {
      origin: string;
      protocol: string;
      host: string;
      hostname: string;
      port: string;
      pathname: string;
      search: string;
      hash: string;
    } {
      const protocolMatch = url.match(/^([a-z]+):\/\//i);
      const protocol = protocolMatch
        ? protocolMatch[1]?.toLowerCase() + ":"
        : "https:";

      const withoutProtocol = url.replace(/^[a-z]+:\/\//i, "");
      const [hostPath, hash = ""] = withoutProtocol.split("#");
      const [hostSearch, search = ""] = hostPath?.split("?") || [hostPath, ""];
      const [host, ...pathParts] = hostSearch?.split("/") || [""];

      const [hostname, port = ""] = host?.split(":") || ["", ""];
      const pathname = "/" + pathParts.join("/");

      return {
        origin: `${protocol}//${host}`,
        protocol,
        host: host || "",
        hostname: hostname || "",
        port,
        pathname,
        search: search ? `?${search}` : "",
        hash: hash ? `#${hash}` : "",
      };
    }

    toString(): string {
      return this.href;
    }

    toJSON(): string {
      return this.href;
    }

    static canParse = (url: string | URL, base?: string | URL) => {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    };

    static createObjectURL = (obj: Blob | unknown) => {
      return URL.createObjectURL(obj as Blob);
    };

    static parse = (url: string | URL, base?: string | URL) => {
      try {
        return new URL(url, base);
      } catch {
        return null;
      }
    };

    static revokeObjectURL = (url: string) => {
      URL.revokeObjectURL(url);
    };
  };
}
