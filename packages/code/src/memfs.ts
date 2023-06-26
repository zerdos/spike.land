const textEncoder = new TextEncoder();

type FileSystemEntry = Partial<FileSystemHandle> & { relativePath: string };

const getDirectoryEntriesRecursive = async (
  directoryHandle: FileSystemDirectoryHandle,
  relativePath = ".",
) => {
  const fileHandles = [];
  const directoryHandles = [];
  const entries: {
    [path: string]: FileSystemEntry | FileSystemEntry[];
  } = {};
  const directoryIterator = directoryHandle.values();
  const directoryEntryPromises = [];
  for await (const handle of directoryIterator) {
    const nestedPath = `${relativePath}/${handle.name}`;
    if (handle.kind === "file") {
      fileHandles.push({ handle, nestedPath });
      directoryEntryPromises.push(
        handle.getFile().then((file) => {
          return {
            name: handle.name,
            kind: handle.kind,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            relativePath: nestedPath,
            handle,
          } as FileSystemEntry;
        }),
      );
    } else if (handle.kind === "directory") {
      directoryHandles.push({ handle, nestedPath });
      directoryEntryPromises.push(
        (async () => {
          return {
            name: handle.name,
            kind: handle.kind,
            relativePath: nestedPath,
            entries: await getDirectoryEntriesRecursive(handle, nestedPath),
            handle,
          };
        })(),
      );
    }
  }
  const directoryEntries = await Promise.all(directoryEntryPromises);
  directoryEntries.forEach((directoryEntry) => {
    const name = directoryEntry.name!;
    entries[name] = directoryEntry;
  });
  return entries;
};

const getDirectoryHandleAndFileName = async (
  filePath: string,
): Promise<{ dirHandle: FileSystemDirectoryHandle; fileName: string | undefined }> => {
  const pathParts = filePath.split("/").filter(x => x);
  const fileName = pathParts.pop()?.trim();

  let currentHandle = await navigator.storage.getDirectory();

  if (pathParts && pathParts.length) {
    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
    }
  }

  return { dirHandle: currentHandle, fileName };
};

export const readdir = async (filePath: string): Promise<string[]> => {
  const { dirHandle } = await getDirectoryHandleAndFileName(filePath);
  const entries = await getDirectoryEntriesRecursive(dirHandle);
  return Object.keys(entries);
};

export const writeFile = async (filePath: string, content: string): Promise<void> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const accessHandle = await fileHandle.createWritable();
  const encodedContent = textEncoder.encode(content);
  await accessHandle.write(encodedContent);
  await accessHandle.close();
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
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  await dirHandle.getDirectoryHandle(fileName, { create: true });
};

export const stat = async (filePath: string): Promise<boolean> => {
  try {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName) throw new Error("Invalid file path");
    const fileHandle = await dirHandle.getFileHandle(fileName);
    return fileHandle ? true : false;
  } catch {
    return false;
  }
};

export const cwd = async () => "/";

const FS = { readFile, unlink, mkdir, writeFile, readdir, stat, cwd };

export default FS;

Object.assign(globalThis, FS);
