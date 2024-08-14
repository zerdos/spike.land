import { tsx } from "detective-typescript";

process.cwd = () => "/";

process.emitWarning = () => {};

Object.assign(self, { tsx });
