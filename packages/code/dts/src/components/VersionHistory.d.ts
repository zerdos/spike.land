import React from "react";
interface Version {
    timestamp: number;
    code: string;
}
interface VersionHistoryProps {
    versions: Version[];
    onRestore: (code: string) => void;
    onClose: () => void;
}
declare const VersionHistory: React.FC<VersionHistoryProps>;
export default VersionHistory;
