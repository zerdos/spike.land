// Export types
export * from "./types";

// Export utility functions
export {
  getDirectoryEntriesRecursive,
  getDirectoryHandleAndFileName,
  handleDirectory,
  handleFile,
  normalizePath,
} from "./utils";

// Export file operations from new structure
export {
  appendFile,
  chmod,
  chown,
  copyFile,
  lchmod,
  lchown,
  link,
  lutimes,
  readFile,
  readFileSync,
  readlink,
  realpath,
  rename,
  symlink,
  truncate,
  unlink,
  utimes,
  writeFile,
} from "./operations/file";

// Export directory operations from new structure
export {
  access,
  cp,
  cwd,
  exists,
  glob,
  lstat,
  mkdir,
  mkdtemp,
  opendir,
  readdir,
  rm,
  rmdir,
  stat,
  statfs,
  watch,
} from "./operations/directory";

// Export file handle operations
export { createFileHandle, open } from "./file-handle";

// Re-export constants for fs compatibility
export { constants } from "./types";

// Import all operations for the FS object
import * as fileOperations from "./operations/file";
import * as directoryOperations from "./operations/directory";
import * as fileHandleOperations from "./file-handle";
import { constants } from "./types";

// Combine all operations into a single object that mirrors Node.js fs/promises
const FS = {
  // File operations
  appendFile: fileOperations.appendFile,
  chmod: fileOperations.chmod,
  chown: fileOperations.chown,
  copyFile: fileOperations.copyFile,
  lchmod: fileOperations.lchmod,
  lchown: fileOperations.lchown,
  link: fileOperations.link,
  lutimes: fileOperations.lutimes,
  readFile: fileOperations.readFile,
  readFileSync: fileOperations.readFileSync,
  readlink: fileOperations.readlink,
  realpath: fileOperations.realpath,
  rename: fileOperations.rename,
  symlink: fileOperations.symlink,
  truncate: fileOperations.truncate,
  unlink: fileOperations.unlink,
  utimes: fileOperations.utimes,
  writeFile: fileOperations.writeFile,

  // Directory operations
  access: directoryOperations.access,
  cp: directoryOperations.cp,
  cwd: directoryOperations.cwd,
  exists: directoryOperations.exists,
  glob: directoryOperations.glob,
  lstat: directoryOperations.lstat,
  mkdir: directoryOperations.mkdir,
  mkdtemp: directoryOperations.mkdtemp,
  opendir: directoryOperations.opendir,
  readdir: directoryOperations.readdir,
  rm: directoryOperations.rm,
  rmdir: directoryOperations.rmdir,
  stat: directoryOperations.stat,
  statfs: directoryOperations.statfs,
  watch: directoryOperations.watch,

  // File handle operations
  open: fileHandleOperations.open,
  createFileHandle: fileHandleOperations.createFileHandle,

  // Constants
  constants,
};

// Assign all functions to globalThis for global access
Object.assign(globalThis, FS);

export default FS;

// Also export as named 'promises' for compatibility with Node.js fs/promises pattern
export const promises = FS;
