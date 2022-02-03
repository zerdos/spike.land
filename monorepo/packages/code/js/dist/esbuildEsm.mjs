import{a as ot}from"./chunks/chunk-3XDVH4IX.mjs";import{a as Vt,b as Wt}from"./chunks/chunk-XOF3GJEG.mjs";var ft=Vt((Qt,Ke)=>{(se=>{var _=Object.defineProperty,B=Object.defineProperties,H=Object.getOwnPropertyDescriptor,me=Object.getOwnPropertyDescriptors,re=Object.getOwnPropertyNames,ae=Object.getOwnPropertySymbols,Oe=Object.prototype.hasOwnProperty,Ie=Object.prototype.propertyIsEnumerable,de=(e,t,r)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,K=(e,t)=>{for(var r in t||(t={}))Oe.call(t,r)&&de(e,r,t[r]);if(ae)for(var r of ae(t))Ie.call(t,r)&&de(e,r,t[r]);return e},he=(e,t)=>B(e,me(t)),ht=e=>_(e,"__esModule",{value:!0}),pt=(e,t)=>{for(var r in t)_(e,r,{get:t[r],enumerable:!0})},mt=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of re(t))!Oe.call(e,u)&&(r||u!=="default")&&_(e,u,{get:()=>t[u],enumerable:!(s=H(t,u))||s.enumerable});return e},gt=(e=>(t,r)=>e&&e.get(t)||(r=mt(ht({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0),Pe=(e,t,r)=>new Promise((s,u)=>{var c=l=>{try{b(r.next(l))}catch(v){u(v)}},i=l=>{try{b(r.throw(l))}catch(v){u(v)}},b=l=>l.done?s(l.value):Promise.resolve(l.value).then(c,i);b((r=r.apply(e,t)).next())}),ze={};pt(ze,{analyzeMetafile:()=>Ct,analyzeMetafileSync:()=>Ut,build:()=>Tt,buildSync:()=>At,formatMessages:()=>Rt,formatMessagesSync:()=>It,initialize:()=>Ft,serve:()=>jt,transform:()=>Dt,transformSync:()=>Nt,version:()=>Pt});function Xe(e){let t=s=>{if(s===null)r.write8(0);else if(typeof s=="boolean")r.write8(1),r.write8(+s);else if(typeof s=="number")r.write8(2),r.write32(s|0);else if(typeof s=="string")r.write8(3),r.write(Ee(s));else if(s instanceof Uint8Array)r.write8(4),r.write(s);else if(s instanceof Array){r.write8(5),r.write32(s.length);for(let u of s)t(u)}else{let u=Object.keys(s);r.write8(6),r.write32(u.length);for(let c of u)r.write(Ee(c)),t(s[c])}},r=new Qe;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),t(e.value),qe(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function wt(e){let t=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return Te(r.read());case 4:return r.read();case 5:{let i=r.read32(),b=[];for(let l=0;l<i;l++)b.push(t());return b}case 6:{let i=r.read32(),b={};for(let l=0;l<i;l++)b[Te(r.read())]=t();return b}default:throw new Error("Invalid packet")}},r=new Qe(e),s=r.read32(),u=(s&1)===0;s>>>=1;let c=t();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:s,isRequest:u,value:c}}var Qe=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let t=new Uint8Array((this.len+e)*2);t.set(this.buf),this.buf=t}return this.len+=e,this.len-e}write8(e){let t=this._write(1);this.buf[t]=e}write32(e){let t=this._write(4);qe(this.buf,e,t)}write(e){let t=this._write(4+e.length);qe(this.buf,e.length,t),this.buf.set(e,t+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return Ze(this.buf,this._read(4))}read(){let e=this.read32(),t=new Uint8Array(e),r=this._read(t.length);return t.set(this.buf.subarray(r,r+e)),t}},Ee,Te;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let e=new TextEncoder,t=new TextDecoder;Ee=r=>e.encode(r),Te=r=>t.decode(r)}else if(typeof Buffer!="undefined")Ee=e=>{let t=Buffer.from(e);return t instanceof Uint8Array||(t=new Uint8Array(t)),t},Te=e=>{let{buffer:t,byteOffset:r,byteLength:s}=e;return Buffer.from(t,r,s).toString()};else throw new Error("No UTF-8 codec found");function Ze(e,t){return e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24}function qe(e,t,r){e[r++]=t,e[r++]=t>>8,e[r++]=t>>16,e[r++]=t>>24}function et(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var Fe=()=>null,W=e=>typeof e=="boolean"?null:"a boolean",bt=e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object",p=e=>typeof e=="string"?null:"a string",Me=e=>e instanceof RegExp?null:"a RegExp object",je=e=>typeof e=="number"&&e===(e|0)?null:"an integer",Je=e=>typeof e=="function"?null:"a function",G=e=>Array.isArray(e)?null:"an array",be=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",yt=e=>typeof e=="object"&&e!==null?null:"an array or an object",tt=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",rt=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",vt=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",kt=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",xt=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array";function n(e,t,r,s){let u=e[r];if(t[r+""]=!0,u===void 0)return;let c=s(u);if(c!==null)throw new Error(`"${r}" must be ${c}`);return u}function X(e,t,r){for(let s in e)if(!(s in t))throw new Error(`Invalid option ${r}: "${s}"`)}function _t(e){let t=Object.create(null),r=n(e,t,"wasmURL",p),s=n(e,t,"worker",W);return X(e,t,"in startService() call"),{wasmURL:r,worker:s}}function nt(e){let t;if(e!==void 0){t=Object.create(null);for(let r of Object.keys(e)){let s=e[r];if(typeof s=="string"||s===!1)t[r]=s;else throw new Error(`Expected ${JSON.stringify(r)} in mangle cache to map to either a string or false`)}}return t}function Le(e,t,r,s,u){let c=n(t,r,"color",W),i=n(t,r,"logLevel",p),b=n(t,r,"logLimit",je);c!==void 0?e.push(`--color=${c}`):s&&e.push("--color=true"),e.push(`--log-level=${i||u}`),e.push(`--log-limit=${b||0}`)}function lt(e,t,r){let s=n(t,r,"legalComments",p),u=n(t,r,"sourceRoot",p),c=n(t,r,"sourcesContent",W),i=n(t,r,"target",kt),b=n(t,r,"format",p),l=n(t,r,"globalName",p),v=n(t,r,"mangleProps",Me),R=n(t,r,"reserveProps",Me),L=n(t,r,"minify",W),E=n(t,r,"minifySyntax",W),T=n(t,r,"minifyWhitespace",W),ce=n(t,r,"minifyIdentifiers",W),ue=n(t,r,"drop",G),pe=n(t,r,"charset",p),ve=n(t,r,"treeShaking",W),ke=n(t,r,"ignoreAnnotations",W),xe=n(t,r,"jsx",p),_e=n(t,r,"jsxFactory",p),$e=n(t,r,"jsxFragment",p),ge=n(t,r,"define",be),Ae=n(t,r,"pure",G),Ue=n(t,r,"keepNames",W);if(s&&e.push(`--legal-comments=${s}`),u!==void 0&&e.push(`--source-root=${u}`),c!==void 0&&e.push(`--sources-content=${c}`),i&&(Array.isArray(i)?e.push(`--target=${Array.from(i).map(et).join(",")}`):e.push(`--target=${et(i)}`)),b&&e.push(`--format=${b}`),l&&e.push(`--global-name=${l}`),L&&e.push("--minify"),E&&e.push("--minify-syntax"),T&&e.push("--minify-whitespace"),ce&&e.push("--minify-identifiers"),pe&&e.push(`--charset=${pe}`),ve!==void 0&&e.push(`--tree-shaking=${ve}`),ke&&e.push("--ignore-annotations"),ue)for(let oe of ue)e.push(`--drop:${oe}`);if(v&&e.push(`--mangle-props=${v.source}`),R&&e.push(`--reserve-props=${R.source}`),xe&&e.push(`--jsx=${xe}`),_e&&e.push(`--jsx-factory=${_e}`),$e&&e.push(`--jsx-fragment=${$e}`),ge)for(let oe in ge){if(oe.indexOf("=")>=0)throw new Error(`Invalid define: ${oe}`);e.push(`--define:${oe}=${ge[oe]}`)}if(Ae)for(let oe of Ae)e.push(`--pure:${oe}`);Ue&&e.push("--keep-names")}function Et(e,t,r,s,u){var c;let i=[],b=[],l=Object.create(null),v=null,R=null,L=null;Le(i,t,l,r,s),lt(i,t,l);let E=n(t,l,"sourcemap",rt),T=n(t,l,"bundle",W),ce=n(t,l,"watch",bt),ue=n(t,l,"splitting",W),pe=n(t,l,"preserveSymlinks",W),ve=n(t,l,"metafile",W),ke=n(t,l,"outfile",p),xe=n(t,l,"outdir",p),_e=n(t,l,"outbase",p),$e=n(t,l,"platform",p),ge=n(t,l,"tsconfig",p),Ae=n(t,l,"resolveExtensions",G),Ue=n(t,l,"nodePaths",G),oe=n(t,l,"mainFields",G),m=n(t,l,"conditions",G),f=n(t,l,"external",G),o=n(t,l,"loader",be),d=n(t,l,"outExtension",be),F=n(t,l,"publicPath",p),A=n(t,l,"entryNames",p),j=n(t,l,"chunkNames",p),$=n(t,l,"assetNames",p),N=n(t,l,"inject",G),D=n(t,l,"banner",be),k=n(t,l,"footer",be),C=n(t,l,"entryPoints",yt),I=n(t,l,"absWorkingDir",p),S=n(t,l,"stdin",be),V=(c=n(t,l,"write",W))!=null?c:u,ie=n(t,l,"allowOverwrite",W),O=n(t,l,"incremental",W)===!0,w=n(t,l,"mangleCache",be);if(l.plugins=!0,X(t,l,`in ${e}() call`),E&&i.push(`--sourcemap${E===!0?"":`=${E}`}`),T&&i.push("--bundle"),ie&&i.push("--allow-overwrite"),ce)if(i.push("--watch"),typeof ce=="boolean")L={};else{let a=Object.create(null),y=n(ce,a,"onRebuild",Je);X(ce,a,`on "watch" in ${e}() call`),L={onRebuild:y}}if(ue&&i.push("--splitting"),pe&&i.push("--preserve-symlinks"),ve&&i.push("--metafile"),ke&&i.push(`--outfile=${ke}`),xe&&i.push(`--outdir=${xe}`),_e&&i.push(`--outbase=${_e}`),$e&&i.push(`--platform=${$e}`),ge&&i.push(`--tsconfig=${ge}`),Ae){let a=[];for(let y of Ae){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${y}`);a.push(y)}i.push(`--resolve-extensions=${a.join(",")}`)}if(F&&i.push(`--public-path=${F}`),A&&i.push(`--entry-names=${A}`),j&&i.push(`--chunk-names=${j}`),$&&i.push(`--asset-names=${$}`),oe){let a=[];for(let y of oe){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid main field: ${y}`);a.push(y)}i.push(`--main-fields=${a.join(",")}`)}if(m){let a=[];for(let y of m){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid condition: ${y}`);a.push(y)}i.push(`--conditions=${a.join(",")}`)}if(f)for(let a of f)i.push(`--external:${a}`);if(D)for(let a in D){if(a.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${a}`);i.push(`--banner:${a}=${D[a]}`)}if(k)for(let a in k){if(a.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${a}`);i.push(`--footer:${a}=${k[a]}`)}if(N)for(let a of N)i.push(`--inject:${a}`);if(o)for(let a in o){if(a.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${a}`);i.push(`--loader:${a}=${o[a]}`)}if(d)for(let a in d){if(a.indexOf("=")>=0)throw new Error(`Invalid out extension: ${a}`);i.push(`--out-extension:${a}=${d[a]}`)}if(C)if(Array.isArray(C))for(let a of C)b.push(["",a+""]);else for(let[a,y]of Object.entries(C))b.push([a+"",y+""]);if(S){let a=Object.create(null),y=n(S,a,"contents",p),q=n(S,a,"resolveDir",p),g=n(S,a,"sourcefile",p),h=n(S,a,"loader",p);X(S,a,'in "stdin" object'),g&&i.push(`--sourcefile=${g}`),h&&i.push(`--loader=${h}`),q&&(R=q+""),v=y?y+"":""}let x=[];if(Ue)for(let a of Ue)a+="",x.push(a);return{entries:b,flags:i,write:V,stdinContents:v,stdinResolveDir:R,absWorkingDir:I,incremental:O,nodePaths:x,watch:L,mangleCache:nt(w)}}function St(e,t,r,s){let u=[],c=Object.create(null);Le(u,t,c,r,s),lt(u,t,c);let i=n(t,c,"sourcemap",rt),b=n(t,c,"tsconfigRaw",vt),l=n(t,c,"sourcefile",p),v=n(t,c,"loader",p),R=n(t,c,"banner",p),L=n(t,c,"footer",p),E=n(t,c,"mangleCache",be);return X(t,c,`in ${e}() call`),i&&u.push(`--sourcemap=${i===!0?"external":i}`),b&&u.push(`--tsconfig-raw=${typeof b=="string"?b:JSON.stringify(b)}`),l&&u.push(`--sourcefile=${l}`),v&&u.push(`--loader=${v}`),R&&u.push(`--banner=${R}`),L&&u.push(`--footer=${L}`),{flags:u,mangleCache:nt(E)}}function $t(e){let t=new Map,r=new Map,s=new Map,u=new Map,c=!1,i=0,b=0,l=new Uint8Array(16*1024),v=0,R=m=>{let f=v+m.length;if(f>l.length){let d=new Uint8Array(f*2);d.set(l),l=d}l.set(m,v),v+=m.length;let o=0;for(;o+4<=v;){let d=Ze(l,o);if(o+4+d>v)break;o+=4,pe(l.subarray(o,o+d)),o+=d}o>0&&(l.copyWithin(0,o,v),v-=o)},L=()=>{c=!0;for(let m of t.values())m("The service was stopped",null);t.clear();for(let m of u.values())m.onWait("The service was stopped");u.clear();for(let m of s.values())try{m(new Error("The service was stopped"),null)}catch(f){console.error(f)}s.clear()},E=(m,f,o)=>{if(c)return o("The service is no longer running",null);let d=i++;t.set(d,(F,A)=>{try{o(F,A)}finally{m&&m.unref()}}),m&&m.ref(),e.writeToStdin(Xe({id:d,isRequest:!0,value:f}))},T=(m,f)=>{if(c)throw new Error("The service is no longer running");e.writeToStdin(Xe({id:m,isRequest:!1,value:f}))},ce=(m,f)=>Pe(this,null,function*(){try{switch(f.command){case"ping":{T(m,{});break}case"on-start":{let o=r.get(f.key);o?T(m,yield o(f)):T(m,{});break}case"on-resolve":{let o=r.get(f.key);o?T(m,yield o(f)):T(m,{});break}case"on-load":{let o=r.get(f.key);o?T(m,yield o(f)):T(m,{});break}case"serve-request":{let o=u.get(f.key);o&&o.onRequest&&o.onRequest(f.args),T(m,{});break}case"serve-wait":{let o=u.get(f.key);o&&o.onWait(f.error),T(m,{});break}case"watch-rebuild":{let o=s.get(f.key);try{o&&o(null,f.args)}catch(d){console.error(d)}T(m,{});break}default:throw new Error("Invalid command: "+f.command)}}catch(o){T(m,{errors:[De(o,e,null,void 0,"")]})}}),ue=!0,pe=m=>{if(ue){ue=!1;let o=String.fromCharCode(...m);if(o!=="0.14.18")throw new Error(`Cannot start service: Host version "0.14.18" does not match binary version ${JSON.stringify(o)}`);return}let f=wt(m);if(f.isRequest)ce(f.id,f.value);else{let o=t.get(f.id);t.delete(f.id),f.value.error?o(f.value.error,{}):o(null,f.value)}},ve=(m,f,o,d,F)=>Pe(this,null,function*(){let A=[],j=[],$={},N={},D=0,k=0,C=[],I=!1;f=[...f];for(let O of f){let w={};if(typeof O!="object")throw new Error(`Plugin at index ${k} must be an object`);let x=n(O,w,"name",p);if(typeof x!="string"||x==="")throw new Error(`Plugin at index ${k} is missing a name`);try{let a=n(O,w,"setup",Je);if(typeof a!="function")throw new Error("Plugin is missing a setup function");X(O,w,`on plugin ${JSON.stringify(x)}`);let y={name:x,onResolve:[],onLoad:[]};k++;let g=a({initialOptions:m,resolve:(h,U={})=>{if(!I)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof h!="string")throw new Error("The path to resolve must be a string");let P=Object.create(null),Z=n(U,P,"pluginName",p),z=n(U,P,"importer",p),Y=n(U,P,"namespace",p),ne=n(U,P,"resolveDir",p),ee=n(U,P,"kind",p),M=n(U,P,"pluginData",Fe);return X(U,P,"in resolve() call"),new Promise((Q,te)=>{let J={command:"resolve",path:h,key:o,pluginName:x};Z!=null&&(J.pluginName=Z),z!=null&&(J.importer=z),Y!=null&&(J.namespace=Y),ne!=null&&(J.resolveDir=ne),ee!=null&&(J.kind=ee),M!=null&&(J.pluginData=d.store(M)),E(F,J,(we,le)=>{we!==null?te(new Error(we)):Q({errors:ye(le.errors,d),warnings:ye(le.warnings,d),path:le.path,external:le.external,sideEffects:le.sideEffects,namespace:le.namespace,suffix:le.suffix,pluginData:d.load(le.pluginData)})})})},onStart(h){let U='This error came from the "onStart" callback registered here:',P=Be(new Error(U),e,"onStart");A.push({name:x,callback:h,note:P})},onEnd(h){let U='This error came from the "onEnd" callback registered here:',P=Be(new Error(U),e,"onEnd");j.push({name:x,callback:h,note:P})},onResolve(h,U){let P='This error came from the "onResolve" callback registered here:',Z=Be(new Error(P),e,"onResolve"),z={},Y=n(h,z,"filter",Me),ne=n(h,z,"namespace",p);if(X(h,z,`in onResolve() call for plugin ${JSON.stringify(x)}`),Y==null)throw new Error("onResolve() call is missing a filter");let ee=D++;$[ee]={name:x,callback:U,note:Z},y.onResolve.push({id:ee,filter:Y.source,namespace:ne||""})},onLoad(h,U){let P='This error came from the "onLoad" callback registered here:',Z=Be(new Error(P),e,"onLoad"),z={},Y=n(h,z,"filter",Me),ne=n(h,z,"namespace",p);if(X(h,z,`in onLoad() call for plugin ${JSON.stringify(x)}`),Y==null)throw new Error("onLoad() call is missing a filter");let ee=D++;N[ee]={name:x,callback:U,note:Z},y.onLoad.push({id:ee,filter:Y.source,namespace:ne||""})},esbuild:e.esbuild});g&&(yield g),C.push(y)}catch(a){return{ok:!1,error:a,pluginName:x}}}let S=O=>Pe(this,null,function*(){switch(O.command){case"on-start":{let w={errors:[],warnings:[]};return yield Promise.all(A.map(x=>Pe(this,[x],function*({name:a,callback:y,note:q}){try{let g=yield y();if(g!=null){if(typeof g!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(a)} to return an object`);let h={},U=n(g,h,"errors",G),P=n(g,h,"warnings",G);X(g,h,`from onStart() callback in plugin ${JSON.stringify(a)}`),U!=null&&w.errors.push(...Se(U,"errors",d,a)),P!=null&&w.warnings.push(...Se(P,"warnings",d,a))}}catch(g){w.errors.push(De(g,e,d,q&&q(),a))}}))),w}case"on-resolve":{let w={},x="",a,y;for(let q of O.ids)try{({name:x,callback:a,note:y}=$[q]);let g=yield a({path:O.path,importer:O.importer,namespace:O.namespace,resolveDir:O.resolveDir,kind:O.kind,pluginData:d.load(O.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(x)} to return an object`);let h={},U=n(g,h,"pluginName",p),P=n(g,h,"path",p),Z=n(g,h,"namespace",p),z=n(g,h,"suffix",p),Y=n(g,h,"external",W),ne=n(g,h,"sideEffects",W),ee=n(g,h,"pluginData",Fe),M=n(g,h,"errors",G),Q=n(g,h,"warnings",G),te=n(g,h,"watchFiles",G),J=n(g,h,"watchDirs",G);X(g,h,`from onResolve() callback in plugin ${JSON.stringify(x)}`),w.id=q,U!=null&&(w.pluginName=U),P!=null&&(w.path=P),Z!=null&&(w.namespace=Z),z!=null&&(w.suffix=z),Y!=null&&(w.external=Y),ne!=null&&(w.sideEffects=ne),ee!=null&&(w.pluginData=d.store(ee)),M!=null&&(w.errors=Se(M,"errors",d,x)),Q!=null&&(w.warnings=Se(Q,"warnings",d,x)),te!=null&&(w.watchFiles=Ve(te,"watchFiles")),J!=null&&(w.watchDirs=Ve(J,"watchDirs"));break}}catch(g){return{id:q,errors:[De(g,e,d,y&&y(),x)]}}return w}case"on-load":{let w={},x="",a,y;for(let q of O.ids)try{({name:x,callback:a,note:y}=N[q]);let g=yield a({path:O.path,namespace:O.namespace,suffix:O.suffix,pluginData:d.load(O.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(x)} to return an object`);let h={},U=n(g,h,"pluginName",p),P=n(g,h,"contents",xt),Z=n(g,h,"resolveDir",p),z=n(g,h,"pluginData",Fe),Y=n(g,h,"loader",p),ne=n(g,h,"errors",G),ee=n(g,h,"warnings",G),M=n(g,h,"watchFiles",G),Q=n(g,h,"watchDirs",G);X(g,h,`from onLoad() callback in plugin ${JSON.stringify(x)}`),w.id=q,U!=null&&(w.pluginName=U),P instanceof Uint8Array?w.contents=P:P!=null&&(w.contents=Ee(P)),Z!=null&&(w.resolveDir=Z),z!=null&&(w.pluginData=d.store(z)),Y!=null&&(w.loader=Y),ne!=null&&(w.errors=Se(ne,"errors",d,x)),ee!=null&&(w.warnings=Se(ee,"warnings",d,x)),M!=null&&(w.watchFiles=Ve(M,"watchFiles")),Q!=null&&(w.watchDirs=Ve(Q,"watchDirs"));break}}catch(g){return{id:q,errors:[De(g,e,d,y&&y(),x)]}}return w}default:throw new Error("Invalid command: "+O.command)}}),V=(O,w,x)=>x();j.length>0&&(V=(O,w,x)=>{(()=>Pe(this,null,function*(){for(let{name:a,callback:y,note:q}of j)try{yield y(O)}catch(g){O.errors.push(yield new Promise(h=>w(g,a,q&&q(),h)))}}))().then(x)}),I=!0;let ie=0;return{ok:!0,requestPlugins:C,runOnEndCallbacks:V,pluginRefs:{ref(){++ie===1&&r.set(o,S)},unref(){--ie===0&&r.delete(o)}}}}),ke=(m,f,o,d)=>{let F={},A=n(f,F,"port",je),j=n(f,F,"host",p),$=n(f,F,"servedir",p),N=n(f,F,"onRequest",Je),D,k=new Promise((C,I)=>{D=S=>{u.delete(d),S!==null?I(new Error(S)):C()}});return o.serve={},X(f,F,"in serve() call"),A!==void 0&&(o.serve.port=A),j!==void 0&&(o.serve.host=j),$!==void 0&&(o.serve.servedir=$),u.set(d,{onRequest:N,onWait:D}),{wait:k,stop(){E(m,{command:"serve-stop",key:d},()=>{})}}},xe="warning",_e="silent",$e=m=>{let f=b++,o=it(),d,{refs:F,options:A,isTTY:j,callback:$}=m;if(typeof A=="object"){let k=A.plugins;if(k!==void 0){if(!Array.isArray(k))throw new Error('"plugins" must be an array');d=k}}let N=(k,C,I,S)=>{let V=[];try{Le(V,A,{},j,xe)}catch(O){}let ie=De(k,e,o,I,C);E(F,{command:"error",flags:V,error:ie},()=>{ie.detail=o.load(ie.detail),S(ie)})},D=(k,C)=>{N(k,C,void 0,I=>{$(Re("Build failed",[I],[]),null)})};if(d&&d.length>0){if(e.isSync)return D(new Error("Cannot use plugins in synchronous API calls"),"");ve(A,d,f,o,F).then(k=>{if(!k.ok)D(k.error,k.pluginName);else try{ge(he(K({},m),{key:f,details:o,logPluginError:N,requestPlugins:k.requestPlugins,runOnEndCallbacks:k.runOnEndCallbacks,pluginRefs:k.pluginRefs}))}catch(C){D(C,"")}},k=>D(k,""))}else try{ge(he(K({},m),{key:f,details:o,logPluginError:N,requestPlugins:null,runOnEndCallbacks:(k,C,I)=>I(),pluginRefs:null}))}catch(k){D(k,"")}},ge=({callName:m,refs:f,serveOptions:o,options:d,isTTY:F,defaultWD:A,callback:j,key:$,details:N,logPluginError:D,requestPlugins:k,runOnEndCallbacks:C,pluginRefs:I})=>{let S={ref(){I&&I.ref(),f&&f.ref()},unref(){I&&I.unref(),f&&f.unref()}},V=!e.isBrowser,{entries:ie,flags:O,write:w,stdinContents:x,stdinResolveDir:a,absWorkingDir:y,incremental:q,nodePaths:g,watch:h,mangleCache:U}=Et(m,d,F,xe,V),P={command:"build",key:$,entries:ie,flags:O,write:w,stdinContents:x,stdinResolveDir:a,absWorkingDir:y||A,incremental:q,nodePaths:g};k&&(P.plugins=k),U&&(P.mangleCache=U);let Z=o&&ke(S,o,P,$),z,Y,ne=(M,Q)=>{M.outputFiles&&(Q.outputFiles=M.outputFiles.map(Ot)),M.metafile&&(Q.metafile=JSON.parse(M.metafile)),M.mangleCache&&(Q.mangleCache=M.mangleCache),M.writeToStdout!==void 0&&console.log(Te(M.writeToStdout).replace(/\n$/,""))},ee=(M,Q)=>{let te={errors:ye(M.errors,N),warnings:ye(M.warnings,N)};ne(M,te),C(te,D,()=>{if(te.errors.length>0)return Q(Re("Build failed",te.errors,te.warnings),null);if(M.rebuild){if(!z){let J=!1;z=()=>new Promise((we,le)=>{if(J||c)throw new Error("Cannot rebuild");E(S,{command:"rebuild",key:$},(fe,Lt)=>{if(fe)return Q(Re("Build failed",[{pluginName:"",text:fe,location:null,notes:[],detail:void 0}],[]),null);ee(Lt,(Ye,Bt)=>{Ye?le(Ye):we(Bt)})})}),S.ref(),z.dispose=()=>{J||(J=!0,E(S,{command:"rebuild-dispose",key:$},()=>{}),S.unref())}}te.rebuild=z}if(M.watch){if(!Y){let J=!1;S.ref(),Y=()=>{J||(J=!0,s.delete($),E(S,{command:"watch-stop",key:$},()=>{}),S.unref())},h&&s.set($,(we,le)=>{if(we){h.onRebuild&&h.onRebuild(we,null);return}let fe={errors:ye(le.errors,N),warnings:ye(le.warnings,N)};ne(le,fe),C(fe,D,()=>{if(fe.errors.length>0){h.onRebuild&&h.onRebuild(Re("Build failed",fe.errors,fe.warnings),null);return}le.rebuildID!==void 0&&(fe.rebuild=z),fe.stop=Y,h.onRebuild&&h.onRebuild(null,fe)})})}te.stop=Y}Q(null,te)})};if(w&&e.isBrowser)throw new Error('Cannot enable "write" in the browser');if(q&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(h&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');E(S,P,(M,Q)=>{if(M)return j(new Error(M),null);if(Z){let te=Q,J=!1;S.ref();let we={port:te.port,host:te.host,wait:Z.wait,stop(){J||(J=!0,Z.stop(),S.unref())}};return S.ref(),Z.wait.then(S.unref,S.unref),j(null,we)}return ee(Q,j)})};return{readFromStdout:R,afterClose:L,service:{buildOrServe:$e,transform:({callName:m,refs:f,input:o,options:d,isTTY:F,fs:A,callback:j})=>{let $=it(),N=D=>{try{if(typeof o!="string")throw new Error('The input to "transform" must be a string');let{flags:k,mangleCache:C}=St(m,d,F,_e),I={command:"transform",flags:k,inputFS:D!==null,input:D!==null?D:o};C&&(I.mangleCache=C),E(f,I,(S,V)=>{if(S)return j(new Error(S),null);let ie=ye(V.errors,$),O=ye(V.warnings,$),w=1,x=()=>{if(--w===0){let a={warnings:O,code:V.code,map:V.map};V.mangleCache&&(a.mangleCache=V==null?void 0:V.mangleCache),j(null,a)}};if(ie.length>0)return j(Re("Transform failed",ie,O),null);V.codeFS&&(w++,A.readFile(V.code,(a,y)=>{a!==null?j(a,null):(V.code=y,x())})),V.mapFS&&(w++,A.readFile(V.map,(a,y)=>{a!==null?j(a,null):(V.map=y,x())})),x()})}catch(k){let C=[];try{Le(C,d,{},F,_e)}catch(S){}let I=De(k,e,$,void 0,"");E(f,{command:"error",flags:C,error:I},()=>{I.detail=$.load(I.detail),j(Re("Transform failed",[I],[]),null)})}};if(typeof o=="string"&&o.length>1024*1024){let D=N;N=()=>A.writeFile(o,D)}N(null)},formatMessages:({callName:m,refs:f,messages:o,options:d,callback:F})=>{let A=Se(o,"messages",null,"");if(!d)throw new Error(`Missing second argument in ${m}() call`);let j={},$=n(d,j,"kind",p),N=n(d,j,"color",W),D=n(d,j,"terminalWidth",je);if(X(d,j,`in ${m}() call`),$===void 0)throw new Error(`Missing "kind" in ${m}() call`);if($!=="error"&&$!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${m}() call`);let k={command:"format-msgs",messages:A,isWarning:$==="warning"};N!==void 0&&(k.color=N),D!==void 0&&(k.terminalWidth=D),E(f,k,(C,I)=>{if(C)return F(new Error(C),null);F(null,I.messages)})},analyzeMetafile:({callName:m,refs:f,metafile:o,options:d,callback:F})=>{d===void 0&&(d={});let A={},j=n(d,A,"color",W),$=n(d,A,"verbose",W);X(d,A,`in ${m}() call`);let N={command:"analyze-metafile",metafile:o};j!==void 0&&(N.color=j),$!==void 0&&(N.verbose=$),E(f,N,(D,k)=>{if(D)return F(new Error(D),null);F(null,k.result)})}}}}function it(){let e=new Map,t=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;let s=t++;return e.set(s,r),s}}}function Be(e,t,r){let s,u=!1;return()=>{if(u)return s;u=!0;try{let c=(e.stack+"").split(`
`);c.splice(1,1);let i=st(t,c,r);if(i)return s={text:e.message,location:i},s}catch(c){}}}function De(e,t,r,s,u){let c="Internal error",i=null;try{c=(e&&e.message||e)+""}catch(b){}try{i=st(t,(e.stack+"").split(`
`),"")}catch(b){}return{pluginName:u,text:c,location:i,notes:s?[s]:[],detail:r?r.store(e):-1}}function st(e,t,r){let s="    at ";if(e.readFileSync&&!t[0].startsWith(s)&&t[1].startsWith(s))for(let u=1;u<t.length;u++){let c=t[u];if(!!c.startsWith(s))for(c=c.slice(s.length);;){let i=/^(?:new |async )?\S+ \((.*)\)$/.exec(c);if(i){c=i[1];continue}if(i=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(c),i){c=i[1];continue}if(i=/^(\S+):(\d+):(\d+)$/.exec(c),i){let b;try{b=e.readFileSync(i[1],"utf8")}catch(L){break}let l=b.split(/\r\n|\r|\n|\u2028|\u2029/)[+i[2]-1]||"",v=+i[3]-1,R=l.slice(v,v+r.length)===r?r.length:0;return{file:i[1],namespace:"file",line:+i[2],column:Ee(l.slice(0,v)).length,length:Ee(l.slice(v,v+R)).length,lineText:l+`
`+t.slice(1).join(`
`),suggestion:""}}break}}return null}function Re(e,t,r){let s=5,u=t.length<1?"":` with ${t.length} error${t.length<2?"":"s"}:`+t.slice(0,s+1).map((i,b)=>{if(b===s)return`
...`;if(!i.location)return`
error: ${i.text}`;let{file:l,line:v,column:R}=i.location,L=i.pluginName?`[plugin: ${i.pluginName}] `:"";return`
${l}:${v}:${R}: ERROR: ${L}${i.text}`}).join(""),c=new Error(`${e}${u}`);return c.errors=t,c.warnings=r,c}function ye(e,t){for(let r of e)r.detail=t.load(r.detail);return e}function at(e,t){if(e==null)return null;let r={},s=n(e,r,"file",p),u=n(e,r,"namespace",p),c=n(e,r,"line",je),i=n(e,r,"column",je),b=n(e,r,"length",je),l=n(e,r,"lineText",p),v=n(e,r,"suggestion",p);return X(e,r,t),{file:s||"",namespace:u||"",line:c||0,column:i||0,length:b||0,lineText:l||"",suggestion:v||""}}function Se(e,t,r,s){let u=[],c=0;for(let i of e){let b={},l=n(i,b,"pluginName",p),v=n(i,b,"text",p),R=n(i,b,"location",tt),L=n(i,b,"notes",G),E=n(i,b,"detail",Fe),T=`in element ${c} of "${t}"`;X(i,b,T);let ce=[];if(L)for(let ue of L){let pe={},ve=n(ue,pe,"text",p),ke=n(ue,pe,"location",tt);X(ue,pe,T),ce.push({text:ve||"",location:at(ke,T)})}u.push({pluginName:l||s,text:v||"",location:at(R,T),notes:ce,detail:r?r.store(E):-1}),c++}return u}function Ve(e,t){let r=[];for(let s of e){if(typeof s!="string")throw new Error(`${JSON.stringify(t)} must be an array of strings`);r.push(s)}return r}function Ot({path:e,contents:t}){let r=null;return{path:e,contents:t,get text(){return r===null&&(r=Te(t)),r}}}var Pt="0.14.18",Tt=e=>We().build(e),jt=()=>{throw new Error('The "serve" API only works in node')},Dt=(e,t)=>We().transform(e,t),Rt=(e,t)=>We().formatMessages(e,t),Ct=(e,t)=>We().analyzeMetafile(e,t),At=()=>{throw new Error('The "buildSync" API only works in node')},Nt=()=>{throw new Error('The "transformSync" API only works in node')},It=()=>{throw new Error('The "formatMessagesSync" API only works in node')},Ut=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},Ce,Ge,We=()=>{if(Ge)return Ge;throw Ce?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},Ft=e=>{e=_t(e||{});let t=e.wasmURL,r=e.worker!==!1;if(!t)throw new Error('Must provide the "wasmURL" option');if(t+="",Ce)throw new Error('Cannot call "initialize" more than once');return Ce=Mt(t,r),Ce.catch(()=>{Ce=void 0}),Ce},Mt=(e,t)=>Pe(void 0,null,function*(){let r=yield fetch(e);if(!r.ok)throw new Error(`Failed to download ${JSON.stringify(e)}`);let s=yield r.arrayBuffer(),u=`{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

(() => {
	// Map multiple JavaScript environments to a single common API,
	// preferring web standards over Node.js API.
	//
	// Environments considered:
	// - Browsers
	// - Node.js
	// - Electron
	// - Parcel
	// - Webpack

	if (typeof global !== "undefined") {
		// global already exists
	} else if (typeof window !== "undefined") {
		window.global = window;
	} else if (typeof self !== "undefined") {
		self.global = self;
	} else {
		throw new Error("cannot export Go (neither global, window nor self is defined)");
	}

	if (!global.require && typeof require !== "undefined") {
		global.require = require;
	}

	if (!global.fs && global.require) {
		const fs = require("fs");
		if (typeof fs === "object" && fs !== null && Object.keys(fs).length !== 0) {
			
    global.fs = Object.assign({}, fs, {
      // Hack around a Unicode bug in node: https://github.com/nodejs/node/issues/24550
      write(fd, buf, offset, length, position, callback) {
        if (offset === 0 && length === buf.length && position === null) {
          if (fd === process.stdout.fd) {
            try {
              process.stdout.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
          if (fd === process.stderr.fd) {
            try {
              process.stderr.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
        }
        fs.write(fd, buf, offset, length, position, callback);
      },
    });
  
		}
	}

	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!global.fs) {
		let outputBuf = "";
		global.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
			writeSync(fd, buf) {
				outputBuf += decoder.decode(buf);
				const nl = outputBuf.lastIndexOf("\\n");
				if (nl != -1) {
					console.log(outputBuf.substr(0, nl));
					outputBuf = outputBuf.substr(nl + 1);
				}
				return buf.length;
			},
			write(fd, buf, offset, length, position, callback) {
				if (offset !== 0 || length !== buf.length || position !== null) {
					callback(enosys());
					return;
				}
				const n = this.writeSync(fd, buf);
				callback(null, n);
			},
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!global.process) {
		global.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
		}
	}

	if (!global.crypto && global.require) {
		const nodeCrypto = require("crypto");
		global.crypto = {
			getRandomValues(b) {
				nodeCrypto.randomFillSync(b);
			},
		};
	}
	if (!global.crypto) {
		throw new Error("global.crypto is not available, polyfill required (getRandomValues only)");
	}

	if (!global.performance) {
		global.performance = {
			now() {
				const [sec, nsec] = process.hrtime();
				return sec * 1000 + nsec / 1000000;
			},
		};
	}

	if (!global.TextEncoder && global.require) {
		global.TextEncoder = require("util").TextEncoder;
	}
	if (!global.TextEncoder) {
		throw new Error("global.TextEncoder is not available, polyfill required");
	}

	if (!global.TextDecoder && global.require) {
		global.TextDecoder = require("util").TextDecoder;
	}
	if (!global.TextDecoder) {
		throw new Error("global.TextDecoder is not available, polyfill required");
	}

	// End of polyfills for common API.

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	global.Go = class {
		constructor() {
			this.argv = ["js"];
			this.env = {};
			this.exit = (code) => {
				if (code !== 0) {
					console.warn("exit code:", code);
				}
			};
			this._exitPromise = new Promise((resolve) => {
				this._resolveExitPromise = resolve;
			});
			this._pendingEvent = null;
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
						id = this._values.length;
					}
					this._values[id] = v;
					this._goRefCounts[id] = 0;
					this._ids.set(v, id);
				}
				this._goRefCounts[id]++;
				let typeFlag = 0;
				switch (typeof v) {
					case "object":
						if (v !== null) {
							typeFlag = 1;
						}
						break;
					case "string":
						typeFlag = 2;
						break;
					case "symbol":
						typeFlag = 3;
						break;
					case "function":
						typeFlag = 4;
						break;
				}
				this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
				this.mem.setUint32(addr, id, true);
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				go: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
					"runtime.wasmExit": (sp) => {
						sp >>>= 0;
						const code = this.mem.getInt32(sp + 8, true);
						this.exited = true;
						delete this._inst;
						delete this._values;
						delete this._goRefCounts;
						delete this._ids;
						delete this._idPool;
						this.exit(code);
					},

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						sp >>>= 0;
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						sp >>>= 0;
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						sp >>>= 0;
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime() (sec int64, nsec int32)
					"runtime.walltime": (sp) => {
						sp >>>= 0;
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8) + 1, // setTimeout has been seen to fire up to 1 millisecond early
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						sp >>>= 0;
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
					"syscall/js.finalizeRef": (sp) => {
						sp >>>= 0;
						const id = this.mem.getUint32(sp + 8, true);
						this._goRefCounts[id]--;
						if (this._goRefCounts[id] === 0) {
							const v = this._values[id];
							this._values[id] = null;
							this._ids.delete(v);
							this._idPool.push(id);
						}
					},

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						sp >>>= 0;
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp() >>> 0; // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						sp >>>= 0;
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						sp >>>= 0;
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						sp >>>= 0;
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						sp >>>= 0;
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						sp >>>= 0;
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
					"syscall/js.copyBytesToGo": (sp) => {
						sp >>>= 0;
						const dst = loadSlice(sp + 8);
						const src = loadValue(sp + 32);
						if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
					"syscall/js.copyBytesToJS": (sp) => {
						sp >>>= 0;
						const dst = loadValue(sp + 8);
						const src = loadSlice(sp + 16);
						if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					"debug": (value) => {
						console.log(value);
					},
				}
			};
		}

		async run(instance) {
			if (!(instance instanceof WebAssembly.Instance)) {
				throw new Error("Go.run: WebAssembly.Instance expected");
			}
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				global,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[global, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
				}
				return ptr;
			};

			const argc = this.argv.length;

			const argvPtrs = [];
			this.argv.forEach((arg) => {
				argvPtrs.push(strPtr(arg));
			});
			argvPtrs.push(0);

			const keys = Object.keys(this.env).sort();
			keys.forEach((key) => {
				argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
			});
			argvPtrs.push(0);

			const argv = offset;
			argvPtrs.forEach((ptr) => {
				this.mem.setUint32(offset, ptr, true);
				this.mem.setUint32(offset + 4, 0, true);
				offset += 8;
			});

			// The linker guarantees global data starts from at least wasmMinDataAddr.
			// Keep in sync with cmd/link/internal/ld/data.go:wasmMinDataAddr.
			const wasmMinDataAddr = 4096 + 8192;
			if (offset >= wasmMinDataAddr) {
				throw new Error("total length of command line and environment variables exceeds limit");
			}

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
		}

		_resume() {
			if (this.exited) {
				throw new Error("Go program has already exited");
			}
			this._inst.exports.resume();
			if (this.exited) {
				this._resolveExitPromise();
			}
		}

		_makeFuncWrapper(id) {
			const go = this;
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}

	if (
		typeof module !== "undefined" &&
		global.require &&
		global.require.main === module &&
		global.process &&
		global.process.versions &&
		!global.process.versions.electron
	) {
		if (process.argv.length < 3) {
			console.error("usage: go_js_wasm_exec [wasm binary] [arguments]");
			process.exit(1);
		}

		const go = new Go();
		go.argv = process.argv.slice(2);
		go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
		go.exit = process.exit;
		WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then((result) => {
			process.on("exit", (code) => { // Node.js exits if no event handler is pending
				if (code === 0 && !go.exited) {
					// deadlock, make Go print error and stack traces
					go._pendingEvent = { id: 0 };
					go._resume();
				}
			});
			return go.run(result.instance);
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
})();
onmessage = ({ data: wasm }) => {
  let decoder = new TextDecoder();
  let fs = global.fs;
  let stderr = "";
  fs.writeSync = (fd, buffer) => {
    if (fd === 1) {
      postMessage(buffer);
    } else if (fd === 2) {
      stderr += decoder.decode(buffer);
      let parts = stderr.split("\\n");
      if (parts.length > 1)
        console.log(parts.slice(0, -1).join("\\n"));
      stderr = parts[parts.length - 1];
    } else {
      throw new Error("Bad write");
    }
    return buffer.length;
  };
  let stdin = [];
  let resumeStdin;
  let stdinPos = 0;
  onmessage = ({ data }) => {
    if (data.length > 0) {
      stdin.push(data);
      if (resumeStdin)
        resumeStdin();
    }
  };
  fs.read = (fd, buffer, offset, length, position, callback) => {
    if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
      throw new Error("Bad read");
    }
    if (stdin.length === 0) {
      resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
      return;
    }
    let first = stdin[0];
    let count = Math.max(0, Math.min(length, first.length - stdinPos));
    buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
    stdinPos += count;
    if (stdinPos === first.length) {
      stdin.shift();
      stdinPos = 0;
    }
    callback(null, count);
  };
  let go = new global.Go();
  go.argv = ["", \`--service=\${"0.14.18"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
};}`,c;if(t){let l=new Blob([u],{type:"text/javascript"});c=new Worker(URL.createObjectURL(l))}else{let v=new Function("postMessage",u+"var onmessage; return m => onmessage(m)")(R=>c.onmessage({data:R}));c={onmessage:null,postMessage:R=>v({data:R}),terminate(){}}}c.postMessage(s),c.onmessage=({data:l})=>i(l);let{readFromStdout:i,service:b}=$t({writeToStdin(l){c.postMessage(l)},isSync:!1,isBrowser:!0,esbuild:ze});Ge={build:l=>new Promise((v,R)=>b.buildOrServe({callName:"build",refs:null,serveOptions:null,options:l,isTTY:!1,defaultWD:"/",callback:(L,E)=>L?R(L):v(E)})),transform:(l,v)=>new Promise((R,L)=>b.transform({callName:"transform",refs:null,input:l,options:v||{},isTTY:!1,fs:{readFile(E,T){T(new Error("Internal error"),null)},writeFile(E,T){T(null)}},callback:(E,T)=>E?L(E):R(T)})),formatMessages:(l,v)=>new Promise((R,L)=>b.formatMessages({callName:"formatMessages",refs:null,messages:l,options:v,callback:(E,T)=>E?L(E):R(T)})),analyzeMetafile:(l,v)=>new Promise((R,L)=>b.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof l=="string"?l:JSON.stringify(l),options:v,callback:(E,T)=>E?L(E):R(T)}))}});se.exports=gt(ze)})(typeof Ke=="object"?Ke:{set exports(se){(typeof self!="undefined"?self:this).esbuild=se}})});var Ht=new Error("timeout while waiting for mutex to become available"),Kt=new Error("mutex already locked"),zt=new Error("request for lock canceled"),ct=function(se,_,B,H){function me(re){return re instanceof B?re:new B(function(ae){ae(re)})}return new(B||(B=Promise))(function(re,ae){function Oe(K){try{de(H.next(K))}catch(he){ae(he)}}function Ie(K){try{de(H.throw(K))}catch(he){ae(he)}}function de(K){K.done?re(K.value):me(K.value).then(Oe,Ie)}de((H=H.apply(se,_||[])).next())})},ut=class{constructor(_,B=zt){if(this._maxConcurrency=_,this._cancelError=B,this._queue=[],this._waiters=[],_<=0)throw new Error("semaphore must be initialized to a positive value");this._value=_}acquire(){let _=this.isLocked(),B=new Promise((H,me)=>this._queue.push({resolve:H,reject:me}));return _||this._dispatch(),B}runExclusive(_){return ct(this,void 0,void 0,function*(){let[B,H]=yield this.acquire();try{return yield _(B)}finally{H()}})}waitForUnlock(){return ct(this,void 0,void 0,function*(){return this.isLocked()?new Promise(B=>this._waiters.push({resolve:B})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let _=this._currentReleaser;this._currentReleaser=void 0,_()}}cancel(){this._queue.forEach(_=>_.reject(this._cancelError)),this._queue=[]}_dispatch(){let _=this._queue.shift();if(!_)return;let B=!1;this._currentReleaser=()=>{B||(B=!0,this._value++,this._resolveWaiters(),this._dispatch())},_.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(_=>_.resolve()),this._waiters=[]}},qt=function(se,_,B,H){function me(re){return re instanceof B?re:new B(function(ae){ae(re)})}return new(B||(B=Promise))(function(re,ae){function Oe(K){try{de(H.next(K))}catch(he){ae(he)}}function Ie(K){try{de(H.throw(K))}catch(he){ae(he)}}function de(K){K.done?re(K.value):me(K.value).then(Oe,Ie)}de((H=H.apply(se,_||[])).next())})},He=class{constructor(_){this._semaphore=new ut(1,_)}acquire(){return qt(this,void 0,void 0,function*(){let[,_]=yield this._semaphore.acquire();return _})}runExclusive(_){return this._semaphore.runExclusive(()=>_())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var Ne=Wt(ft());var Jt=Ne.initialize({wasmURL:`https://unpkg.com/esbuild-wasm@${Ne.version}/esbuild.wasm`}),dt=!1,Gt=new He,Yt=async(se,_=4)=>{let B=performance.now();(dt||await Jt)&&(dt=!0);let H;try{await Gt.waitForUnlock(),H=await Ne.transform(se,{loader:"tsx",target:"es2018"})}catch(re){if(_>0)return await ot(100),Yt(se,_-1);throw re}let me=performance.now();return console.log(`esbuildEsmTransform: took ${me-B} milliseconds`),H.code};export{Yt as transform};
