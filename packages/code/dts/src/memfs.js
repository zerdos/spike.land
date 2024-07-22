const handleFile = async (handle, nestedPath) => {
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
const handleDirectory = async (handle, nestedPath = "") => {
    return {
        name: handle.name,
        kind: handle.kind,
        relativePath: nestedPath,
        entries: await getDirectoryEntriesRecursive(handle, nestedPath),
        handle,
    };
};
export const getDirectoryEntriesRecursive = async (directoryHandle, relativePath = ".") => {
    const directoryIterator = directoryHandle.values();
    const directoryEntryPromises = [];
    for await (const handle of directoryIterator) {
        const nestedPath = `${relativePath}/${handle.name}`;
        if (handle.kind === "file") {
            directoryEntryPromises.push(handleFile(handle, nestedPath));
        }
        else if (handle.kind === "directory") {
            directoryEntryPromises.push(handleDirectory(handle, nestedPath));
        }
    }
    const directoryEntries = await Promise.all(directoryEntryPromises);
    const entries = {};
    directoryEntries.forEach((directoryEntry) => {
        entries[directoryEntry.name] = directoryEntry;
    });
    return entries;
};
export const getDirectoryHandleAndFileName = async (filePath) => {
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
export const readdir = async (filePath) => {
    const { dirHandle } = await getDirectoryHandleAndFileName(filePath);
    const entries = await getDirectoryEntriesRecursive(dirHandle);
    return Object.keys(entries);
};
export const writeFile = async (filePath, content) => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName)
        throw new Error("Invalid file path");
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
};
export const readFile = async (filePath) => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName)
        throw new Error("Invalid file path");
    const fileHandle = await dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.text();
};
export const unlink = async (filePath) => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName)
        throw new Error("Invalid file path");
    await dirHandle.removeEntry(fileName);
};
export const mkdir = async (filePath) => {
    const pathParts = filePath.split("/").filter((x) => x);
    const folderName = pathParts.pop()?.trim();
    if (!folderName)
        throw new Error("Invalid directory path");
    let currentHandle = await navigator.storage.getDirectory();
    for (const part of pathParts) {
        currentHandle = await currentHandle.getDirectoryHandle(part, {
            create: true,
        });
    }
    await currentHandle.getDirectoryHandle(folderName, { create: true });
};
export const stat = async (filePath) => {
    try {
        const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
        if (!fileName) {
            return await handleDirectory(dirHandle);
        }
        else {
            const fileHandle = await dirHandle.getFileHandle(fileName);
            return await handleFile(fileHandle, filePath);
        }
    }
    catch {
        return null;
    }
};
export const cwd = async () => "/";
const FS = { readFile, unlink, mkdir, writeFile, readdir, stat, cwd };
export default FS;
Object.assign(globalThis, FS);
