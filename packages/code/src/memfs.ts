const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

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
  // Get an iterator of the files and folders in the directory.
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

const getDirectoryHandleAtPath = async (filePath: string): Promise<FileSystemDirectoryHandle> => {
  const pathParts = filePath.split("/").filter(x => x);
  pathParts.pop();

  let currentHandle = await navigator.storage.getDirectory();

  if (!pathParts || !pathParts.length) return currentHandle;

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
  }

  return currentHandle;
};

export const readdir = async (filePath: string): Promise<string[]> => {
  const entries = await getDirectoryEntriesRecursive(await getDirectoryHandleAtPath(filePath));
  return Object.keys(entries);
};

export const writeFile = async (filePath: string, content: string): Promise<void> => {
  const dirHandle = await getDirectoryHandleAtPath(filePath);
  const fileName = filePath.split("/").pop()!;
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const accessHandle = await fileHandle.createWritable();
  const encodedContent = textEncoder.encode(content);
  await accessHandle.write(encodedContent);
  await accessHandle.close();
  // await accessHandle.flush();
};

export const readFile = async (filePath: string): Promise<string> => {
  const fileHandle = await (await getDirectoryHandleAtPath(filePath)).getFileHandle(filePath.split("/").pop()!);
  const file = await fileHandle.getFile();
  return await file.text();
  // const size = accessHandle.getSize();
  // const dataView = new DataView(new ArrayBuffer(size));
  // await accessHandle.read(dataView);
  // return textDecoder.decode(dataView);
};

export const unlink = async (filePath: string): Promise<void> => {
  const dirHandle = await getDirectoryHandleAtPath(filePath);
  await dirHandle.removeEntry(filePath.split("/").pop()!);
};

export const mkdir = async (filePath: string): Promise<void> => {
  const dirHandle = await getDirectoryHandleAtPath(filePath);
  const dirName = filePath.split("/").pop()!;
  await dirHandle.getDirectoryHandle(dirName, { create: true });
};

export const stat = async (filePath: string): Promise<boolean> => {
  try {
    const dirHandle = await getDirectoryHandleAtPath(filePath);
    const fileHandle = await dirHandle.getFileHandle(filePath.split("/").pop()!);
    return fileHandle ? true : false;
  } catch {
    return false;
  }
};

export default { readFile, unlink, mkdir, writeFile, readdir, stat };

Object.assign(globalThis, { readFile, unlink, mkdir, writeFile, readdir, stat });
