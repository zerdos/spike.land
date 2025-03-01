type FileSystemEntry = Partial<FileSystemHandle> & { relativePath: string; };

const handleFile = async (handle: FileSystemFileHandle, nestedPath: string) => {
  const file = await handle.getFile();
  return {
    name: handle.name,
    kind: handle.kind,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    relativePath: nestedPath,
    handle,
  };
};

const handleDirectory = async (
  handle: FileSystemDirectoryHandle,
  nestedPath = "",
) => {
  return {
    name: handle.name,
    kind: handle.kind,
    relativePath: nestedPath,
    entries: await getDirectoryEntriesRecursive(handle, nestedPath),
    handle,
  };
};

export const getDirectoryEntriesRecursive = async (
  directoryHandle: FileSystemDirectoryHandle,
  relativePath = ".",
): Promise<Record<string, FileSystemEntry>> => {
  const entries: Record<string, FileSystemEntry> = {};

  for await (const [_, handle] of directoryHandle.entries()) {
    const nestedPath = `${relativePath}/${handle.name}`;
    if (handle.kind === "file") {
      const fileHandle = handle as FileSystemFileHandle;
      const entry = await handleFile(fileHandle, nestedPath);
      entries[entry.name!] = entry;
    } else if (handle.kind === "directory") {
      const dirHandle = handle as FileSystemDirectoryHandle;
      const entry = await handleDirectory(dirHandle, nestedPath);
      entries[entry.name!] = entry;
    }
  }

  return entries;
};

export const getDirectoryHandleAndFileName = async (
  filePath: string,
): Promise<
  { dirHandle: FileSystemDirectoryHandle; fileName: string | undefined; }
> => {
  const pathParts = filePath.split("/").filter((x) => x);
  const fileName = pathParts.pop()?.trim();

  let currentHandle = await navigator.storage.getDirectory();

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, {
      create: true,
    });
  }

  return { dirHandle: currentHandle, fileName };
};

export const readdir = async (filePath: string): Promise<string[]> => {
  const { dirHandle } = await getDirectoryHandleAndFileName(filePath);

  const entries = await getDirectoryEntriesRecursive(dirHandle);
  return Object.keys(entries);
};

export const writeFile = async (
  filePath: string,
  content: string,
): Promise<void> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const readFile = async (filePath: string): Promise<string> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  const fileHandle = await dirHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  return await file.text();
};

export const unlink = async (filePath: string): Promise<void> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  await dirHandle.removeEntry(fileName);
};

export const mkdir = async (filePath: string): Promise<void> => {
  const pathParts = filePath.split("/").filter((x) => x);
  const folderName = pathParts.pop()?.trim();
  if (!folderName) throw new Error("Invalid directory path");

  let currentHandle = await navigator.storage.getDirectory();

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, {
      create: true,
    });
  }

  await currentHandle.getDirectoryHandle(folderName, { create: true });
};

export const stat = async (
  filePath: string,
): Promise<
  {
    name: string;
    kind: "file";
    size: number;
    type: string;
    lastModified: number;
    relativePath: string;
    handle: FileSystemFileHandle;
  } | {
    name: string;
    kind: "directory";
    relativePath: string;
    entries: Record<string, FileSystemEntry>;
    handle: FileSystemDirectoryHandle;
  } | null
> => {
  try {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      filePath,
    );
    if (!fileName) {
      // If fileName is undefined, it means the path points to a directory
      return await handleDirectory(dirHandle);
    } else {
      // If fileName is defined, it means the path points to a file
      const fileHandle = await dirHandle.getFileHandle(fileName);
      return await handleFile(fileHandle, filePath);
    }
  } catch {
    return null;
  }
};

export const cwd = async (): Promise<string> => "/";
export const readFileSync = (filePath: string): string => {
  // Define a type for the global object that includes the expected properties
  type GlobalWithFiles = Record<string, string>;

  // Type assertion to let TypeScript know about the shape of the global object
  const globalFiles = globalThis as unknown as GlobalWithFiles;

  // Check if the filePath exists in the global object and return its content
  return Object.hasOwn(globalFiles, filePath) ? globalFiles[filePath] : "";
};

const FS: {
  readFileSync: (filePath: string) => string;
  readFile: (filePath: string) => Promise<string>;
  unlink: (filePath: string) => Promise<void>;
  mkdir: (filePath: string) => Promise<void>;
  writeFile: (filePath: string, content: string) => Promise<void>;
  readdir: (filePath: string) => Promise<string[]>;
  stat: (filePath: string) => Promise<
    {
      name: string;
      kind: "file";
      size: number;
      type: string;
      lastModified: number;
      relativePath: string;
      handle: FileSystemFileHandle;
    } | {
      name: string;
      kind: "directory";
      relativePath: string;
      entries: Record<string, FileSystemEntry>;
      handle: FileSystemDirectoryHandle;
    } | null
  >;
  cwd: () => Promise<string>;
} = {
  readFile,
  unlink,
  mkdir,
  writeFile,
  readdir,
  stat,
  cwd,
  readFileSync,
};

export default FS;

Object.assign(globalThis, FS);
