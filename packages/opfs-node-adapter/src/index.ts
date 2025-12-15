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

// Export file operations
export {
  appendFile,
  copyFile,
  readFile,
  readFileSync,
  rename,
  truncate,
  unlink,
  writeFile,
} from "./file-operations";

// Export directory operations
export { access, cwd, mkdir, readdir, rmdir, stat } from "./directory-operations";

// Export file handle operations
export { createFileHandle, open } from "./file-handle";

// Create a default export with all functions
import * as directoryOperations from "./directory-operations";
import * as fileHandleOperations from "./file-handle";
import * as fileOperations from "./file-operations";

// Combine all operations into a single object
const FS = {
  ...fileOperations,
  ...directoryOperations,
  ...fileHandleOperations,
};

// Assign all functions to globalThis for global access
Object.assign(globalThis, FS);

export default FS;
