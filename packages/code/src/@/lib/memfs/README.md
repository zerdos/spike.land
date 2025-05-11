# MemFS - In-Memory File System

MemFS is a Node.js-like file system implementation that works in the browser
using the File System Access API. It provides a Promise-based API similar to
Node.js's `fs.promises` module.

## Module Structure

The MemFS module is organized into several files:

- **types.ts**: Contains all interfaces and types used throughout the module.
- **utils.ts**: Contains utility functions for working with file paths and
  handles.
- **file-operations.ts**: Contains functions for file operations like reading,
  writing, and deleting files.
- **directory-operations.ts**: Contains functions for directory operations like
  creating, listing, and removing directories.
- **file-handle.ts**: Contains the FileHandle implementation for working with
  file handles.
- **index.ts**: Main entry point that exports all functions and provides a
  default export.

## Usage

```typescript
import FS, { mkdir, readFile, writeFile } from "@/lib/memfs";

// Using individual functions
async function example() {
  // Create a directory
  await mkdir("/example");

  // Write a file
  await writeFile("/example/test.txt", "Hello, world!");

  // Read a file
  const content = await readFile("/example/test.txt");
  console.warn(content); // 'Hello, world!'
}

// Using the default export
async function exampleWithDefault() {
  await FS.mkdir("/example");
  await FS.writeFile("/example/test.txt", "Hello, world!");
  const content = await FS.readFile("/example/test.txt");
  console.warn(content); // 'Hello, world!'
}
```

## API Reference

### File Operations

- **readFile(path: string): Promise<string>** - Read a file's content as a
  string.
- **writeFile(path: string, content: string): Promise<void>** - Write content to
  a file.
- **appendFile(path: string, content: string): Promise<void>** - Append content
  to a file.
- **unlink(path: string): Promise<void>** - Delete a file.
- **copyFile(srcPath: string, destPath: string): Promise<void>** - Copy a file.
- **rename(oldPath: string, newPath: string): Promise<void>** - Rename a file or
  directory.
- **truncate(path: string, len?: number): Promise<void>** - Truncate a file to a
  specified length.
- **readFileSync(path: string): string** - Read a file synchronously (limited
  functionality).

### Directory Operations

- **mkdir(path: string): Promise<void>** - Create a directory.
- **rmdir(path: string): Promise<void>** - Remove a directory.
- **readdir(path: string): Promise<string[]>** - List directory contents.
- **stat(path: string): Promise<StatResult>** - Get file or directory
  information.
- **access(path: string, mode?: number): Promise<void>** - Check if a file or
  directory exists.
- **cwd(): Promise<string>** - Get current working directory.

### File Handle Operations

- **open(path: string, flags: string | number, mode?: Mode):
  Promise<FileHandle>** - Open a file and return a FileHandle.
- **createFileHandle(fileHandle: FileSystemFileHandle, path: string):
  FileHandle** - Create a FileHandle from a FileSystemFileHandle.

## Testing

The module includes comprehensive tests in the `__tests__/memfs` directory:

- **file-operations.spec.ts**: Tests for file operations.
- **directory-operations.spec.ts**: Tests for directory operations.
- **utils.spec.ts**: Tests for utility functions.
- **misc-operations.spec.ts**: Tests for miscellaneous operations.
- **index.spec.ts**: Tests for the main module exports.

Run the tests with:

```bash
cd packages/code
npx vitest run memfs
```
