export interface Version {
    timestamp: number;
    code: string;
}
export declare const loadVersionHistory: (codeSpace: string) => Version[];
export declare const saveVersionHistory: (codeSpace: string, versions: Version[]) => void;
export declare const addVersion: (codeSpace: string, newVersion: Version, currentVersions: Version[]) => Version[];
