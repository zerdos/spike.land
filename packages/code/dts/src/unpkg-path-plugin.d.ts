import * as esbuild from "esbuild-wasm";
export declare const unpkgPathPlugin: (origin: string) => {
    name: string;
    setup(build: esbuild.PluginBuild): void;
};
