// Export types
export * from './types';

// Export utility functions
export {
  normalizePath,
  handleFile,
  handleDirectory,
  getDirectoryEntriesRecursive,
  getDirectoryHandleAndFileName
} from './utils';

// Export file operations
export {
  readFile,
  writeFile,
  appendFile,
  unlink,
  copyFile,
  rename,
  truncate,
  readFileSync
} from './file-operations';

// Export directory operations
export {
  readdir,
  mkdir,
  rmdir,
  stat,
  access,
  cwd
} from './directory-operations';

// Export file handle operations
export {
  createFileHandle,
  open
} from './file-handle';

// Create a default export with all functions
import * as fileOperations from './file-operations';
import * as directoryOperations from './directory-operations';
import * as fileHandleOperations from './file-handle';

// Combine all operations into a single object
const FS = {
  ...fileOperations,
  ...directoryOperations,
  ...fileHandleOperations,
};

// Assign all functions to globalThis for global access
Object.assign(globalThis, FS);

export default FS;
