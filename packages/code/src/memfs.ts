type FileSystemEntry = Partial<FileSystemHandle> & { relativePath: string };

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
  nestedPath: string = "",
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
) => {
  const directoryIterator = directoryHandle.values();
  const directoryEntryPromises: Promise<FileSystemEntry>[] = [];
  for await (const handle of directoryIterator) {
    const nestedPath = `${relativePath}/${handle.name}`;
    if (handle.kind === "file") {
      directoryEntryPromises.push(handleFile(handle, nestedPath));
    } else if (handle.kind === "directory") {
      directoryEntryPromises.push(handleDirectory(handle, nestedPath));
    }
  }
  const directoryEntries = await Promise.all(directoryEntryPromises);
  const entries: { [key: string]: FileSystemEntry } = {};
  directoryEntries.forEach((directoryEntry) => {
    entries[directoryEntry.name!] = directoryEntry;
  });
  return entries;
};

export const getDirectoryHandleAndFileName = async (
  filePath: string,
): Promise<
  { dirHandle: FileSystemDirectoryHandle; fileName: string | undefined }
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
) => {
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

export const cwd = async () => "/";

const FS = { readFile, unlink, mkdir, writeFile, readdir, stat, cwd };

export default FS;

Object.assign(globalThis, FS);
