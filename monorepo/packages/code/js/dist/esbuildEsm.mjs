import{a as it}from"./chunks/chunk-3XDVH4IX.mjs";import{a as Lt,b as Bt}from"./chunks/chunk-XOF3GJEG.mjs";var ct=Lt((Kt,He)=>{(se=>{var _=Object.defineProperty,L=Object.defineProperties,Y=Object.getOwnPropertyDescriptor,pe=Object.getOwnPropertyDescriptors,te=Object.getOwnPropertyNames,ie=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,fe=(e,t,r)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,H=(e,t)=>{for(var r in t||(t={}))Se.call(t,r)&&fe(e,r,t[r]);if(ie)for(var r of ie(t))Ne.call(t,r)&&fe(e,r,t[r]);return e},de=(e,t)=>L(e,pe(t)),ft=e=>_(e,"__esModule",{value:!0}),dt=(e,t)=>{for(var r in t)_(e,r,{get:t[r],enumerable:!0})},ht=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of te(t))!Se.call(e,u)&&(r||u!=="default")&&_(e,u,{get:()=>t[u],enumerable:!(a=Y(t,u))||a.enumerable});return e},pt=(e=>(t,r)=>e&&e.get(t)||(r=ht(ft({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0),$e=(e,t,r)=>new Promise((a,u)=>{var c=l=>{try{b(r.next(l))}catch(v){u(v)}},i=l=>{try{b(r.throw(l))}catch(v){u(v)}},b=l=>l.done?a(l.value):Promise.resolve(l.value).then(c,i);b((r=r.apply(e,t)).next())}),We={};dt(We,{analyzeMetafile:()=>Dt,analyzeMetafileSync:()=>It,build:()=>Ot,buildSync:()=>Rt,formatMessages:()=>jt,formatMessagesSync:()=>Nt,initialize:()=>Ct,serve:()=>Pt,transform:()=>Tt,transformSync:()=>At,version:()=>$t});function Ke(e){let t=a=>{if(a===null)r.write8(0);else if(typeof a=="boolean")r.write8(1),r.write8(+a);else if(typeof a=="number")r.write8(2),r.write32(a|0);else if(typeof a=="string")r.write8(3),r.write(xe(a));else if(a instanceof Uint8Array)r.write8(4),r.write(a);else if(a instanceof Array){r.write8(5),r.write32(a.length);for(let u of a)t(u)}else{let u=Object.keys(a);r.write8(6),r.write32(u.length);for(let c of u)r.write(xe(c)),t(a[c])}},r=new Xe;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),t(e.value),ze(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function mt(e){let t=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return Oe(r.read());case 4:return r.read();case 5:{let i=r.read32(),b=[];for(let l=0;l<i;l++)b.push(t());return b}case 6:{let i=r.read32(),b={};for(let l=0;l<i;l++)b[Oe(r.read())]=t();return b}default:throw new Error("Invalid packet")}},r=new Xe(e),a=r.read32(),u=(a&1)===0;a>>>=1;let c=t();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:a,isRequest:u,value:c}}var Xe=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let t=new Uint8Array((this.len+e)*2);t.set(this.buf),this.buf=t}return this.len+=e,this.len-e}write8(e){let t=this._write(1);this.buf[t]=e}write32(e){let t=this._write(4);ze(this.buf,e,t)}write(e){let t=this._write(4+e.length);ze(this.buf,e.length,t),this.buf.set(e,t+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return Qe(this.buf,this._read(4))}read(){let e=this.read32(),t=new Uint8Array(e),r=this._read(t.length);return t.set(this.buf.subarray(r,r+e)),t}},xe,Oe;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let e=new TextEncoder,t=new TextDecoder;xe=r=>e.encode(r),Oe=r=>t.decode(r)}else if(typeof Buffer!="undefined")xe=e=>{let t=Buffer.from(e);return t instanceof Uint8Array||(t=new Uint8Array(t)),t},Oe=e=>{let{buffer:t,byteOffset:r,byteLength:a}=e;return Buffer.from(t,r,a).toString()};else throw new Error("No UTF-8 codec found");function Qe(e,t){return e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24}function ze(e,t,r){e[r++]=t,e[r++]=t>>8,e[r++]=t>>16,e[r++]=t>>24}function Ze(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var Ce=()=>null,B=e=>typeof e=="boolean"?null:"a boolean",gt=e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object",h=e=>typeof e=="string"?null:"a string",Ue=e=>e instanceof RegExp?null:"a RegExp object",Pe=e=>typeof e=="number"&&e===(e|0)?null:"an integer",qe=e=>typeof e=="function"?null:"a function",J=e=>Array.isArray(e)?null:"an array",Te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",wt=e=>typeof e=="object"&&e!==null?null:"an array or an object",et=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",tt=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",bt=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",yt=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",vt=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array";function n(e,t,r,a){let u=e[r];if(t[r+""]=!0,u===void 0)return;let c=a(u);if(c!==null)throw new Error(`"${r}" must be ${c}`);return u}function K(e,t,r){for(let a in e)if(!(a in t))throw new Error(`Invalid option ${r}: "${a}"`)}function kt(e){let t=Object.create(null),r=n(e,t,"wasmURL",h),a=n(e,t,"worker",B);return K(e,t,"in startService() call"),{wasmURL:r,worker:a}}function Fe(e,t,r,a,u){let c=n(t,r,"color",B),i=n(t,r,"logLevel",h),b=n(t,r,"logLimit",Pe);c!==void 0?e.push(`--color=${c}`):a&&e.push("--color=true"),e.push(`--log-level=${i||u}`),e.push(`--log-limit=${b||0}`)}function rt(e,t,r){let a=n(t,r,"legalComments",h),u=n(t,r,"sourceRoot",h),c=n(t,r,"sourcesContent",B),i=n(t,r,"target",yt),b=n(t,r,"format",h),l=n(t,r,"globalName",h),v=n(t,r,"mangleProps",Ue),R=n(t,r,"reserveProps",Ue),M=n(t,r,"minify",B),E=n(t,r,"minifySyntax",B),P=n(t,r,"minifyWhitespace",B),ce=n(t,r,"minifyIdentifiers",B),ue=n(t,r,"drop",J),he=n(t,r,"charset",h),be=n(t,r,"treeShaking",B),ye=n(t,r,"ignoreAnnotations",B),ve=n(t,r,"jsx",h),ke=n(t,r,"jsxFactory",h),Ee=n(t,r,"jsxFragment",h),me=n(t,r,"define",Te),Ae=n(t,r,"pure",J),Ie=n(t,r,"keepNames",B);if(a&&e.push(`--legal-comments=${a}`),u!==void 0&&e.push(`--source-root=${u}`),c!==void 0&&e.push(`--sources-content=${c}`),i&&(Array.isArray(i)?e.push(`--target=${Array.from(i).map(Ze).join(",")}`):e.push(`--target=${Ze(i)}`)),b&&e.push(`--format=${b}`),l&&e.push(`--global-name=${l}`),M&&e.push("--minify"),E&&e.push("--minify-syntax"),P&&e.push("--minify-whitespace"),ce&&e.push("--minify-identifiers"),he&&e.push(`--charset=${he}`),be!==void 0&&e.push(`--tree-shaking=${be}`),ye&&e.push("--ignore-annotations"),ue)for(let ae of ue)e.push(`--drop:${ae}`);if(v&&e.push(`--mangle-props=${v.source}`),R&&e.push(`--reserve-props=${R.source}`),ve&&e.push(`--jsx=${ve}`),ke&&e.push(`--jsx-factory=${ke}`),Ee&&e.push(`--jsx-fragment=${Ee}`),me)for(let ae in me){if(ae.indexOf("=")>=0)throw new Error(`Invalid define: ${ae}`);e.push(`--define:${ae}=${me[ae]}`)}if(Ae)for(let ae of Ae)e.push(`--pure:${ae}`);Ie&&e.push("--keep-names")}function xt(e,t,r,a,u){var c;let i=[],b=[],l=Object.create(null),v=null,R=null,M=null;Fe(i,t,l,r,a),rt(i,t,l);let E=n(t,l,"sourcemap",tt),P=n(t,l,"bundle",B),ce=n(t,l,"watch",gt),ue=n(t,l,"splitting",B),he=n(t,l,"preserveSymlinks",B),be=n(t,l,"metafile",B),ye=n(t,l,"outfile",h),ve=n(t,l,"outdir",h),ke=n(t,l,"outbase",h),Ee=n(t,l,"platform",h),me=n(t,l,"tsconfig",h),Ae=n(t,l,"resolveExtensions",J),Ie=n(t,l,"nodePaths",J),ae=n(t,l,"mainFields",J),p=n(t,l,"conditions",J),f=n(t,l,"external",J),o=n(t,l,"loader",Te),d=n(t,l,"outExtension",Te),U=n(t,l,"publicPath",h),N=n(t,l,"entryNames",h),T=n(t,l,"chunkNames",h),$=n(t,l,"assetNames",h),I=n(t,l,"inject",J),j=n(t,l,"banner",Te),k=n(t,l,"footer",Te),F=n(t,l,"entryPoints",wt),C=n(t,l,"absWorkingDir",h),x=n(t,l,"stdin",Te),oe=(c=n(t,l,"write",B))!=null?c:u,ne=n(t,l,"allowOverwrite",B),S=n(t,l,"incremental",B)===!0;if(l.plugins=!0,K(t,l,`in ${e}() call`),E&&i.push(`--sourcemap${E===!0?"":`=${E}`}`),P&&i.push("--bundle"),ne&&i.push("--allow-overwrite"),ce)if(i.push("--watch"),typeof ce=="boolean")M={};else{let s=Object.create(null),y=n(ce,s,"onRebuild",qe);K(ce,s,`on "watch" in ${e}() call`),M={onRebuild:y}}if(ue&&i.push("--splitting"),he&&i.push("--preserve-symlinks"),be&&i.push("--metafile"),ye&&i.push(`--outfile=${ye}`),ve&&i.push(`--outdir=${ve}`),ke&&i.push(`--outbase=${ke}`),Ee&&i.push(`--platform=${Ee}`),me&&i.push(`--tsconfig=${me}`),Ae){let s=[];for(let y of Ae){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${y}`);s.push(y)}i.push(`--resolve-extensions=${s.join(",")}`)}if(U&&i.push(`--public-path=${U}`),N&&i.push(`--entry-names=${N}`),T&&i.push(`--chunk-names=${T}`),$&&i.push(`--asset-names=${$}`),ae){let s=[];for(let y of ae){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid main field: ${y}`);s.push(y)}i.push(`--main-fields=${s.join(",")}`)}if(p){let s=[];for(let y of p){if(y+="",y.indexOf(",")>=0)throw new Error(`Invalid condition: ${y}`);s.push(y)}i.push(`--conditions=${s.join(",")}`)}if(f)for(let s of f)i.push(`--external:${s}`);if(j)for(let s in j){if(s.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${s}`);i.push(`--banner:${s}=${j[s]}`)}if(k)for(let s in k){if(s.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${s}`);i.push(`--footer:${s}=${k[s]}`)}if(I)for(let s of I)i.push(`--inject:${s}`);if(o)for(let s in o){if(s.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${s}`);i.push(`--loader:${s}=${o[s]}`)}if(d)for(let s in d){if(s.indexOf("=")>=0)throw new Error(`Invalid out extension: ${s}`);i.push(`--out-extension:${s}=${d[s]}`)}if(F)if(Array.isArray(F))for(let s of F)b.push(["",s+""]);else for(let[s,y]of Object.entries(F))b.push([s+"",y+""]);if(x){let s=Object.create(null),y=n(x,s,"contents",h),W=n(x,s,"resolveDir",h),z=n(x,s,"sourcefile",h),g=n(x,s,"loader",h);K(x,s,'in "stdin" object'),z&&i.push(`--sourcefile=${z}`),g&&i.push(`--loader=${g}`),W&&(R=W+""),v=y?y+"":""}let w=[];if(Ie)for(let s of Ie)s+="",w.push(s);return{entries:b,flags:i,write:oe,stdinContents:v,stdinResolveDir:R,absWorkingDir:C,incremental:S,nodePaths:w,watch:M}}function _t(e,t,r,a){let u=[],c=Object.create(null);Fe(u,t,c,r,a),rt(u,t,c);let i=n(t,c,"sourcemap",tt),b=n(t,c,"tsconfigRaw",bt),l=n(t,c,"sourcefile",h),v=n(t,c,"loader",h),R=n(t,c,"banner",h),M=n(t,c,"footer",h);return K(t,c,`in ${e}() call`),i&&u.push(`--sourcemap=${i===!0?"external":i}`),b&&u.push(`--tsconfig-raw=${typeof b=="string"?b:JSON.stringify(b)}`),l&&u.push(`--sourcefile=${l}`),v&&u.push(`--loader=${v}`),R&&u.push(`--banner=${R}`),M&&u.push(`--footer=${M}`),u}function Et(e){let t=new Map,r=new Map,a=new Map,u=new Map,c=!1,i=0,b=0,l=new Uint8Array(16*1024),v=0,R=p=>{let f=v+p.length;if(f>l.length){let d=new Uint8Array(f*2);d.set(l),l=d}l.set(p,v),v+=p.length;let o=0;for(;o+4<=v;){let d=Qe(l,o);if(o+4+d>v)break;o+=4,he(l.subarray(o,o+d)),o+=d}o>0&&(l.copyWithin(0,o,v),v-=o)},M=()=>{c=!0;for(let p of t.values())p("The service was stopped",null);t.clear();for(let p of u.values())p.onWait("The service was stopped");u.clear();for(let p of a.values())try{p(new Error("The service was stopped"),null)}catch(f){console.error(f)}a.clear()},E=(p,f,o)=>{if(c)return o("The service is no longer running",null);let d=i++;t.set(d,(U,N)=>{try{o(U,N)}finally{p&&p.unref()}}),p&&p.ref(),e.writeToStdin(Ke({id:d,isRequest:!0,value:f}))},P=(p,f)=>{if(c)throw new Error("The service is no longer running");e.writeToStdin(Ke({id:p,isRequest:!1,value:f}))},ce=(p,f)=>$e(this,null,function*(){try{switch(f.command){case"ping":{P(p,{});break}case"on-start":{let o=r.get(f.key);o?P(p,yield o(f)):P(p,{});break}case"on-resolve":{let o=r.get(f.key);o?P(p,yield o(f)):P(p,{});break}case"on-load":{let o=r.get(f.key);o?P(p,yield o(f)):P(p,{});break}case"serve-request":{let o=u.get(f.key);o&&o.onRequest&&o.onRequest(f.args),P(p,{});break}case"serve-wait":{let o=u.get(f.key);o&&o.onWait(f.error),P(p,{});break}case"watch-rebuild":{let o=a.get(f.key);try{o&&o(null,f.args)}catch(d){console.error(d)}P(p,{});break}default:throw new Error("Invalid command: "+f.command)}}catch(o){P(p,{errors:[je(o,e,null,void 0,"")]})}}),ue=!0,he=p=>{if(ue){ue=!1;let o=String.fromCharCode(...p);if(o!=="0.14.17")throw new Error(`Cannot start service: Host version "0.14.17" does not match binary version ${JSON.stringify(o)}`);return}let f=mt(p);if(f.isRequest)ce(f.id,f.value);else{let o=t.get(f.id);t.delete(f.id),f.value.error?o(f.value.error,{}):o(null,f.value)}},be=(p,f,o,d,U)=>$e(this,null,function*(){let N=[],T=[],$={},I={},j=0,k=0,F=[],C=!1;f=[...f];for(let S of f){let w={};if(typeof S!="object")throw new Error(`Plugin at index ${k} must be an object`);let s=n(S,w,"name",h);if(typeof s!="string"||s==="")throw new Error(`Plugin at index ${k} is missing a name`);try{let y=n(S,w,"setup",qe);if(typeof y!="function")throw new Error("Plugin is missing a setup function");K(S,w,`on plugin ${JSON.stringify(s)}`);let W={name:s,onResolve:[],onLoad:[]};k++;let g=y({initialOptions:p,resolve:(m,A={})=>{if(!C)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof m!="string")throw new Error("The path to resolve must be a string");let O=Object.create(null),X=n(A,O,"pluginName",h),V=n(A,O,"importer",h),Z=n(A,O,"namespace",h),re=n(A,O,"resolveDir",h),D=n(A,O,"kind",h),Q=n(A,O,"pluginData",Ce);return K(A,O,"in resolve() call"),new Promise((G,le)=>{let ee={command:"resolve",path:m,key:o,pluginName:s};X!=null&&(ee.pluginName=X),V!=null&&(ee.importer=V),Z!=null&&(ee.namespace=Z),re!=null&&(ee.resolveDir=re),D!=null&&(ee.kind=D),Q!=null&&(ee.pluginData=d.store(Q)),E(U,ee,(ge,q)=>{ge!==null?le(new Error(ge)):G({errors:we(q.errors,d),warnings:we(q.warnings,d),path:q.path,external:q.external,sideEffects:q.sideEffects,namespace:q.namespace,suffix:q.suffix,pluginData:d.load(q.pluginData)})})})},onStart(m){let A='This error came from the "onStart" callback registered here:',O=Me(new Error(A),e,"onStart");N.push({name:s,callback:m,note:O})},onEnd(m){let A='This error came from the "onEnd" callback registered here:',O=Me(new Error(A),e,"onEnd");T.push({name:s,callback:m,note:O})},onResolve(m,A){let O='This error came from the "onResolve" callback registered here:',X=Me(new Error(O),e,"onResolve"),V={},Z=n(m,V,"filter",Ue),re=n(m,V,"namespace",h);if(K(m,V,`in onResolve() call for plugin ${JSON.stringify(s)}`),Z==null)throw new Error("onResolve() call is missing a filter");let D=j++;$[D]={name:s,callback:A,note:X},W.onResolve.push({id:D,filter:Z.source,namespace:re||""})},onLoad(m,A){let O='This error came from the "onLoad" callback registered here:',X=Me(new Error(O),e,"onLoad"),V={},Z=n(m,V,"filter",Ue),re=n(m,V,"namespace",h);if(K(m,V,`in onLoad() call for plugin ${JSON.stringify(s)}`),Z==null)throw new Error("onLoad() call is missing a filter");let D=j++;I[D]={name:s,callback:A,note:X},W.onLoad.push({id:D,filter:Z.source,namespace:re||""})},esbuild:e.esbuild});g&&(yield g),F.push(W)}catch(y){return{ok:!1,error:y,pluginName:s}}}let x=S=>$e(this,null,function*(){switch(S.command){case"on-start":{let w={errors:[],warnings:[]};return yield Promise.all(N.map(s=>$e(this,[s],function*({name:y,callback:W,note:z}){try{let g=yield W();if(g!=null){if(typeof g!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(y)} to return an object`);let m={},A=n(g,m,"errors",J),O=n(g,m,"warnings",J);K(g,m,`from onStart() callback in plugin ${JSON.stringify(y)}`),A!=null&&w.errors.push(..._e(A,"errors",d,y)),O!=null&&w.warnings.push(..._e(O,"warnings",d,y))}}catch(g){w.errors.push(je(g,e,d,z&&z(),y))}}))),w}case"on-resolve":{let w={},s="",y,W;for(let z of S.ids)try{({name:s,callback:y,note:W}=$[z]);let g=yield y({path:S.path,importer:S.importer,namespace:S.namespace,resolveDir:S.resolveDir,kind:S.kind,pluginData:d.load(S.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(s)} to return an object`);let m={},A=n(g,m,"pluginName",h),O=n(g,m,"path",h),X=n(g,m,"namespace",h),V=n(g,m,"suffix",h),Z=n(g,m,"external",B),re=n(g,m,"sideEffects",B),D=n(g,m,"pluginData",Ce),Q=n(g,m,"errors",J),G=n(g,m,"warnings",J),le=n(g,m,"watchFiles",J),ee=n(g,m,"watchDirs",J);K(g,m,`from onResolve() callback in plugin ${JSON.stringify(s)}`),w.id=z,A!=null&&(w.pluginName=A),O!=null&&(w.path=O),X!=null&&(w.namespace=X),V!=null&&(w.suffix=V),Z!=null&&(w.external=Z),re!=null&&(w.sideEffects=re),D!=null&&(w.pluginData=d.store(D)),Q!=null&&(w.errors=_e(Q,"errors",d,s)),G!=null&&(w.warnings=_e(G,"warnings",d,s)),le!=null&&(w.watchFiles=Le(le,"watchFiles")),ee!=null&&(w.watchDirs=Le(ee,"watchDirs"));break}}catch(g){return{id:z,errors:[je(g,e,d,W&&W(),s)]}}return w}case"on-load":{let w={},s="",y,W;for(let z of S.ids)try{({name:s,callback:y,note:W}=I[z]);let g=yield y({path:S.path,namespace:S.namespace,suffix:S.suffix,pluginData:d.load(S.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(s)} to return an object`);let m={},A=n(g,m,"pluginName",h),O=n(g,m,"contents",vt),X=n(g,m,"resolveDir",h),V=n(g,m,"pluginData",Ce),Z=n(g,m,"loader",h),re=n(g,m,"errors",J),D=n(g,m,"warnings",J),Q=n(g,m,"watchFiles",J),G=n(g,m,"watchDirs",J);K(g,m,`from onLoad() callback in plugin ${JSON.stringify(s)}`),w.id=z,A!=null&&(w.pluginName=A),O instanceof Uint8Array?w.contents=O:O!=null&&(w.contents=xe(O)),X!=null&&(w.resolveDir=X),V!=null&&(w.pluginData=d.store(V)),Z!=null&&(w.loader=Z),re!=null&&(w.errors=_e(re,"errors",d,s)),D!=null&&(w.warnings=_e(D,"warnings",d,s)),Q!=null&&(w.watchFiles=Le(Q,"watchFiles")),G!=null&&(w.watchDirs=Le(G,"watchDirs"));break}}catch(g){return{id:z,errors:[je(g,e,d,W&&W(),s)]}}return w}default:throw new Error("Invalid command: "+S.command)}}),oe=(S,w,s)=>s();T.length>0&&(oe=(S,w,s)=>{(()=>$e(this,null,function*(){for(let{name:y,callback:W,note:z}of T)try{yield W(S)}catch(g){S.errors.push(yield new Promise(m=>w(g,y,z&&z(),m)))}}))().then(s)}),C=!0;let ne=0;return{ok:!0,requestPlugins:F,runOnEndCallbacks:oe,pluginRefs:{ref(){++ne===1&&r.set(o,x)},unref(){--ne===0&&r.delete(o)}}}}),ye=(p,f,o,d)=>{let U={},N=n(f,U,"port",Pe),T=n(f,U,"host",h),$=n(f,U,"servedir",h),I=n(f,U,"onRequest",qe),j,k=new Promise((F,C)=>{j=x=>{u.delete(d),x!==null?C(new Error(x)):F()}});return o.serve={},K(f,U,"in serve() call"),N!==void 0&&(o.serve.port=N),T!==void 0&&(o.serve.host=T),$!==void 0&&(o.serve.servedir=$),u.set(d,{onRequest:I,onWait:j}),{wait:k,stop(){E(p,{command:"serve-stop",key:d},()=>{})}}},ve="warning",ke="silent",Ee=p=>{let f=b++,o=nt(),d,{refs:U,options:N,isTTY:T,callback:$}=p;if(typeof N=="object"){let k=N.plugins;if(k!==void 0){if(!Array.isArray(k))throw new Error('"plugins" must be an array');d=k}}let I=(k,F,C,x)=>{let oe=[];try{Fe(oe,N,{},T,ve)}catch(S){}let ne=je(k,e,o,C,F);E(U,{command:"error",flags:oe,error:ne},()=>{ne.detail=o.load(ne.detail),x(ne)})},j=(k,F)=>{I(k,F,void 0,C=>{$(De("Build failed",[C],[]),null)})};if(d&&d.length>0){if(e.isSync)return j(new Error("Cannot use plugins in synchronous API calls"),"");be(N,d,f,o,U).then(k=>{if(!k.ok)j(k.error,k.pluginName);else try{me(de(H({},p),{key:f,details:o,logPluginError:I,requestPlugins:k.requestPlugins,runOnEndCallbacks:k.runOnEndCallbacks,pluginRefs:k.pluginRefs}))}catch(F){j(F,"")}},k=>j(k,""))}else try{me(de(H({},p),{key:f,details:o,logPluginError:I,requestPlugins:null,runOnEndCallbacks:(k,F,C)=>C(),pluginRefs:null}))}catch(k){j(k,"")}},me=({callName:p,refs:f,serveOptions:o,options:d,isTTY:U,defaultWD:N,callback:T,key:$,details:I,logPluginError:j,requestPlugins:k,runOnEndCallbacks:F,pluginRefs:C})=>{let x={ref(){C&&C.ref(),f&&f.ref()},unref(){C&&C.unref(),f&&f.unref()}},oe=!e.isBrowser,{entries:ne,flags:S,write:w,stdinContents:s,stdinResolveDir:y,absWorkingDir:W,incremental:z,nodePaths:g,watch:m}=xt(p,d,U,ve,oe),A={command:"build",key:$,entries:ne,flags:S,write:w,stdinContents:s,stdinResolveDir:y,absWorkingDir:W||N,incremental:z,nodePaths:g};k&&(A.plugins=k);let O=o&&ye(x,o,A,$),X,V,Z=(D,Q)=>{D.outputFiles&&(Q.outputFiles=D.outputFiles.map(St)),D.metafile&&(Q.metafile=JSON.parse(D.metafile)),D.writeToStdout!==void 0&&console.log(Oe(D.writeToStdout).replace(/\n$/,""))},re=(D,Q)=>{let G={errors:we(D.errors,I),warnings:we(D.warnings,I)};Z(D,G),F(G,j,()=>{if(G.errors.length>0)return Q(De("Build failed",G.errors,G.warnings),null);if(D.rebuild){if(!X){let le=!1;X=()=>new Promise((ee,ge)=>{if(le||c)throw new Error("Cannot rebuild");E(x,{command:"rebuild",key:$},(q,Ft)=>{if(q)return Q(De("Build failed",[{pluginName:"",text:q,location:null,notes:[],detail:void 0}],[]),null);re(Ft,(Ge,Mt)=>{Ge?ge(Ge):ee(Mt)})})}),x.ref(),X.dispose=()=>{le||(le=!0,E(x,{command:"rebuild-dispose",key:$},()=>{}),x.unref())}}G.rebuild=X}if(D.watch){if(!V){let le=!1;x.ref(),V=()=>{le||(le=!0,a.delete($),E(x,{command:"watch-stop",key:$},()=>{}),x.unref())},m&&a.set($,(ee,ge)=>{if(ee){m.onRebuild&&m.onRebuild(ee,null);return}let q={errors:we(ge.errors,I),warnings:we(ge.warnings,I)};Z(ge,q),F(q,j,()=>{if(q.errors.length>0){m.onRebuild&&m.onRebuild(De("Build failed",q.errors,q.warnings),null);return}ge.rebuildID!==void 0&&(q.rebuild=X),q.stop=V,m.onRebuild&&m.onRebuild(null,q)})})}G.stop=V}Q(null,G)})};if(w&&e.isBrowser)throw new Error('Cannot enable "write" in the browser');if(z&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(m&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');E(x,A,(D,Q)=>{if(D)return T(new Error(D),null);if(O){let G=Q,le=!1;x.ref();let ee={port:G.port,host:G.host,wait:O.wait,stop(){le||(le=!0,O.stop(),x.unref())}};return x.ref(),O.wait.then(x.unref,x.unref),T(null,ee)}return re(Q,T)})};return{readFromStdout:R,afterClose:M,service:{buildOrServe:Ee,transform:({callName:p,refs:f,input:o,options:d,isTTY:U,fs:N,callback:T})=>{let $=nt(),I=j=>{try{if(typeof o!="string")throw new Error('The input to "transform" must be a string');let k=_t(p,d,U,ke);E(f,{command:"transform",flags:k,inputFS:j!==null,input:j!==null?j:o},(C,x)=>{if(C)return T(new Error(C),null);let oe=we(x.errors,$),ne=we(x.warnings,$),S=1,w=()=>--S===0&&T(null,{warnings:ne,code:x.code,map:x.map});if(oe.length>0)return T(De("Transform failed",oe,ne),null);x.codeFS&&(S++,N.readFile(x.code,(s,y)=>{s!==null?T(s,null):(x.code=y,w())})),x.mapFS&&(S++,N.readFile(x.map,(s,y)=>{s!==null?T(s,null):(x.map=y,w())})),w()})}catch(k){let F=[];try{Fe(F,d,{},U,ke)}catch(x){}let C=je(k,e,$,void 0,"");E(f,{command:"error",flags:F,error:C},()=>{C.detail=$.load(C.detail),T(De("Transform failed",[C],[]),null)})}};if(typeof o=="string"&&o.length>1024*1024){let j=I;I=()=>N.writeFile(o,j)}I(null)},formatMessages:({callName:p,refs:f,messages:o,options:d,callback:U})=>{let N=_e(o,"messages",null,"");if(!d)throw new Error(`Missing second argument in ${p}() call`);let T={},$=n(d,T,"kind",h),I=n(d,T,"color",B),j=n(d,T,"terminalWidth",Pe);if(K(d,T,`in ${p}() call`),$===void 0)throw new Error(`Missing "kind" in ${p}() call`);if($!=="error"&&$!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${p}() call`);let k={command:"format-msgs",messages:N,isWarning:$==="warning"};I!==void 0&&(k.color=I),j!==void 0&&(k.terminalWidth=j),E(f,k,(F,C)=>{if(F)return U(new Error(F),null);U(null,C.messages)})},analyzeMetafile:({callName:p,refs:f,metafile:o,options:d,callback:U})=>{d===void 0&&(d={});let N={},T=n(d,N,"color",B),$=n(d,N,"verbose",B);K(d,N,`in ${p}() call`);let I={command:"analyze-metafile",metafile:o};T!==void 0&&(I.color=T),$!==void 0&&(I.verbose=$),E(f,I,(j,k)=>{if(j)return U(new Error(j),null);U(null,k.result)})}}}}function nt(){let e=new Map,t=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;let a=t++;return e.set(a,r),a}}}function Me(e,t,r){let a,u=!1;return()=>{if(u)return a;u=!0;try{let c=(e.stack+"").split(`
`);c.splice(1,1);let i=lt(t,c,r);if(i)return a={text:e.message,location:i},a}catch(c){}}}function je(e,t,r,a,u){let c="Internal error",i=null;try{c=(e&&e.message||e)+""}catch(b){}try{i=lt(t,(e.stack+"").split(`
`),"")}catch(b){}return{pluginName:u,text:c,location:i,notes:a?[a]:[],detail:r?r.store(e):-1}}function lt(e,t,r){let a="    at ";if(e.readFileSync&&!t[0].startsWith(a)&&t[1].startsWith(a))for(let u=1;u<t.length;u++){let c=t[u];if(!!c.startsWith(a))for(c=c.slice(a.length);;){let i=/^(?:new |async )?\S+ \((.*)\)$/.exec(c);if(i){c=i[1];continue}if(i=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(c),i){c=i[1];continue}if(i=/^(\S+):(\d+):(\d+)$/.exec(c),i){let b;try{b=e.readFileSync(i[1],"utf8")}catch(M){break}let l=b.split(/\r\n|\r|\n|\u2028|\u2029/)[+i[2]-1]||"",v=+i[3]-1,R=l.slice(v,v+r.length)===r?r.length:0;return{file:i[1],namespace:"file",line:+i[2],column:xe(l.slice(0,v)).length,length:xe(l.slice(v,v+R)).length,lineText:l+`
`+t.slice(1).join(`
`),suggestion:""}}break}}return null}function De(e,t,r){let a=5,u=t.length<1?"":` with ${t.length} error${t.length<2?"":"s"}:`+t.slice(0,a+1).map((i,b)=>{if(b===a)return`
...`;if(!i.location)return`
error: ${i.text}`;let{file:l,line:v,column:R}=i.location,M=i.pluginName?`[plugin: ${i.pluginName}] `:"";return`
${l}:${v}:${R}: ERROR: ${M}${i.text}`}).join(""),c=new Error(`${e}${u}`);return c.errors=t,c.warnings=r,c}function we(e,t){for(let r of e)r.detail=t.load(r.detail);return e}function st(e,t){if(e==null)return null;let r={},a=n(e,r,"file",h),u=n(e,r,"namespace",h),c=n(e,r,"line",Pe),i=n(e,r,"column",Pe),b=n(e,r,"length",Pe),l=n(e,r,"lineText",h),v=n(e,r,"suggestion",h);return K(e,r,t),{file:a||"",namespace:u||"",line:c||0,column:i||0,length:b||0,lineText:l||"",suggestion:v||""}}function _e(e,t,r,a){let u=[],c=0;for(let i of e){let b={},l=n(i,b,"pluginName",h),v=n(i,b,"text",h),R=n(i,b,"location",et),M=n(i,b,"notes",J),E=n(i,b,"detail",Ce),P=`in element ${c} of "${t}"`;K(i,b,P);let ce=[];if(M)for(let ue of M){let he={},be=n(ue,he,"text",h),ye=n(ue,he,"location",et);K(ue,he,P),ce.push({text:be||"",location:st(ye,P)})}u.push({pluginName:l||a,text:v||"",location:st(R,P),notes:ce,detail:r?r.store(E):-1}),c++}return u}function Le(e,t){let r=[];for(let a of e){if(typeof a!="string")throw new Error(`${JSON.stringify(t)} must be an array of strings`);r.push(a)}return r}function St({path:e,contents:t}){let r=null;return{path:e,contents:t,get text(){return r===null&&(r=Oe(t)),r}}}var $t="0.14.17",Ot=e=>Be().build(e),Pt=()=>{throw new Error('The "serve" API only works in node')},Tt=(e,t)=>Be().transform(e,t),jt=(e,t)=>Be().formatMessages(e,t),Dt=(e,t)=>Be().analyzeMetafile(e,t),Rt=()=>{throw new Error('The "buildSync" API only works in node')},At=()=>{throw new Error('The "transformSync" API only works in node')},Nt=()=>{throw new Error('The "formatMessagesSync" API only works in node')},It=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},Re,Je,Be=()=>{if(Je)return Je;throw Re?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},Ct=e=>{e=kt(e||{});let t=e.wasmURL,r=e.worker!==!1;if(!t)throw new Error('Must provide the "wasmURL" option');if(t+="",Re)throw new Error('Cannot call "initialize" more than once');return Re=Ut(t,r),Re.catch(()=>{Re=void 0}),Re},Ut=(e,t)=>$e(void 0,null,function*(){let r=yield fetch(e);if(!r.ok)throw new Error(`Failed to download ${JSON.stringify(e)}`);let a=yield r.arrayBuffer(),u=`{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
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
  go.argv = ["", \`--service=\${"0.14.17"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
};}`,c;if(t){let l=new Blob([u],{type:"text/javascript"});c=new Worker(URL.createObjectURL(l))}else{let v=new Function("postMessage",u+"var onmessage; return m => onmessage(m)")(R=>c.onmessage({data:R}));c={onmessage:null,postMessage:R=>v({data:R}),terminate(){}}}c.postMessage(a),c.onmessage=({data:l})=>i(l);let{readFromStdout:i,service:b}=Et({writeToStdin(l){c.postMessage(l)},isSync:!1,isBrowser:!0,esbuild:We});Je={build:l=>new Promise((v,R)=>b.buildOrServe({callName:"build",refs:null,serveOptions:null,options:l,isTTY:!1,defaultWD:"/",callback:(M,E)=>M?R(M):v(E)})),transform:(l,v)=>new Promise((R,M)=>b.transform({callName:"transform",refs:null,input:l,options:v||{},isTTY:!1,fs:{readFile(E,P){P(new Error("Internal error"),null)},writeFile(E,P){P(null)}},callback:(E,P)=>E?M(E):R(P)})),formatMessages:(l,v)=>new Promise((R,M)=>b.formatMessages({callName:"formatMessages",refs:null,messages:l,options:v,callback:(E,P)=>E?M(E):R(P)})),analyzeMetafile:(l,v)=>new Promise((R,M)=>b.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof l=="string"?l:JSON.stringify(l),options:v,callback:(E,P)=>E?M(E):R(P)}))}});se.exports=pt(We)})(typeof He=="object"?He:{set exports(se){(typeof self!="undefined"?self:this).esbuild=se}})});var Gt=new Error("timeout while waiting for mutex to become available"),Yt=new Error("mutex already locked"),Vt=new Error("request for lock canceled"),at=function(se,_,L,Y){function pe(te){return te instanceof L?te:new L(function(ie){ie(te)})}return new(L||(L=Promise))(function(te,ie){function Se(H){try{fe(Y.next(H))}catch(de){ie(de)}}function Ne(H){try{fe(Y.throw(H))}catch(de){ie(de)}}function fe(H){H.done?te(H.value):pe(H.value).then(Se,Ne)}fe((Y=Y.apply(se,_||[])).next())})},ot=class{constructor(_,L=Vt){if(this._maxConcurrency=_,this._cancelError=L,this._queue=[],this._waiters=[],_<=0)throw new Error("semaphore must be initialized to a positive value");this._value=_}acquire(){let _=this.isLocked(),L=new Promise((Y,pe)=>this._queue.push({resolve:Y,reject:pe}));return _||this._dispatch(),L}runExclusive(_){return at(this,void 0,void 0,function*(){let[L,Y]=yield this.acquire();try{return yield _(L)}finally{Y()}})}waitForUnlock(){return at(this,void 0,void 0,function*(){return this.isLocked()?new Promise(L=>this._waiters.push({resolve:L})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let _=this._currentReleaser;this._currentReleaser=void 0,_()}}cancel(){this._queue.forEach(_=>_.reject(this._cancelError)),this._queue=[]}_dispatch(){let _=this._queue.shift();if(!_)return;let L=!1;this._currentReleaser=()=>{L||(L=!0,this._value++,this._resolveWaiters(),this._dispatch())},_.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(_=>_.resolve()),this._waiters=[]}},Wt=function(se,_,L,Y){function pe(te){return te instanceof L?te:new L(function(ie){ie(te)})}return new(L||(L=Promise))(function(te,ie){function Se(H){try{fe(Y.next(H))}catch(de){ie(de)}}function Ne(H){try{fe(Y.throw(H))}catch(de){ie(de)}}function fe(H){H.done?te(H.value):pe(H.value).then(Se,Ne)}fe((Y=Y.apply(se,_||[])).next())})},Ye=class{constructor(_){this._semaphore=new ot(1,_)}acquire(){return Wt(this,void 0,void 0,function*(){let[,_]=yield this._semaphore.acquire();return _})}runExclusive(_){return this._semaphore.runExclusive(()=>_())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var Ve=Bt(ct());var zt=Ve.initialize({wasmURL:"./vendor/esbuild.wasm"}),ut=!1,qt=new Ye,Jt=async(se,_=4)=>{let L=performance.now();(ut||await zt)&&(ut=!0);let Y;try{await qt.waitForUnlock(),Y=await Ve.transform(se,{loader:"tsx",target:"es2018"})}catch(te){if(_>0)return await it(100),Jt(se,_-1);throw te}let pe=performance.now();return console.log(`esbuildEsmTransform: took ${pe-L} milliseconds`),Y.code};export{Jt as transform};
