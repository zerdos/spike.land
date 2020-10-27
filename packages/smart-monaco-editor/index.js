
const importSpecificVersion = (version) =>  import (`https://unpkg.com/smart-monaco-editor@${version}/lib/editor.js`);

export const startMonaco = async(...args) => {
let version;
    if (typeof window !== undefined) {
        try{
            const sp= await fetch("./package.json");
            const data = await sp.json();
            version = data.version;
        } catch(e) {
            version="latest"
        }

        const {startMonaco} = await importSpecificVersion(version);
        return startMonaco(...args);
    }   
}