import { build, transpile } from "@/lib/transpile";

Object.assign(globalThis, { transpile, build });
