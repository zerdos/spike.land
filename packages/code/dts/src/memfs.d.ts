type FileSystemEntry = Partial<FileSystemHandle> & {
    relativePath: string;
};
export declare const getDirectoryEntriesRecursive: (directoryHandle: FileSystemDirectoryHandle, relativePath?: string) => Promise<{
    [key: string]: FileSystemEntry;
}>;
export declare const getDirectoryHandleAndFileName: (filePath: string) => Promise<{
    dirHandle: FileSystemDirectoryHandle;
    fileName: string | undefined;
}>;
export declare const readdir: (filePath: string) => Promise<string[]>;
export declare const writeFile: (filePath: string, content: string) => Promise<void>;
export declare const readFile: (filePath: string) => Promise<string>;
export declare const unlink: (filePath: string) => Promise<void>;
export declare const mkdir: (filePath: string) => Promise<void>;
export declare const stat: (filePath: string) => Promise<{
    name: string;
    kind: "directory";
    relativePath: string;
    entries: {
        [key: string]: FileSystemEntry;
    };
    handle: FileSystemDirectoryHandle;
} | {
    name: string;
    kind: "file";
    size: number;
    type: string;
    lastModified: number;
    relativePath: string;
    handle: FileSystemFileHandle;
} | null>;
export declare const cwd: () => Promise<string>;
declare const FS: {
    readFile: (filePath: string) => Promise<string>;
    unlink: (filePath: string) => Promise<void>;
    mkdir: (filePath: string) => Promise<void>;
    writeFile: (filePath: string, content: string) => Promise<void>;
    readdir: (filePath: string) => Promise<string[]>;
    stat: (filePath: string) => Promise<{
        name: string;
        kind: "directory";
        relativePath: string;
        entries: {
            [key: string]: FileSystemEntry;
        };
        handle: FileSystemDirectoryHandle;
    } | {
        name: string;
        kind: "file";
        size: number;
        type: string;
        lastModified: number;
        relativePath: string;
        handle: FileSystemFileHandle;
    } | null>;
    cwd: () => Promise<string>;
};
export default FS;
