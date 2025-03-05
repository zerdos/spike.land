// Export types
export * from "./memfs/types";

// Export utility functions
export {
  getDirectoryEntriesRecursive,
  getDirectoryHandleAndFileName,
  handleDirectory,
  handleFile,
  normalizePath,
} from "./memfs/utils";

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
} from "./memfs/file-operations";

// Export directory operations
export { access, cwd, mkdir, readdir, rmdir, stat } from "./memfs/directory-operations";

// Export file handle operations
export { createFileHandle, open } from "./memfs/file-handle";

// Create a default export with all functions
import * as directoryOperations from "./memfs/directory-operations";
import * as fileHandleOperations from "./memfs/file-handle";
import * as fileOperations from "./memfs/file-operations";

// Combine all operations into a single object
const FS = {
  ...fileOperations,
  ...directoryOperations,
  ...fileHandleOperations,
};

// Assign all functions to globalThis for global access
Object.assign(globalThis, { FS });

export default FS;
