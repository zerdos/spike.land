
    import { renderToString } from "./reactDomServer";
    
export    const toString = (App: React.FC)=> renderToString( <App />)
