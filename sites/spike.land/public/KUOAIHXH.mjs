import{a as sA}from"./OFN6M5OE.mjs";import{c as JA,e as VA,g as RB}from"./YZ5NCQOK.mjs";var jA=JA((P7,ZB)=>{"use strict";RB();(cB=>{var C=Object.defineProperty,Y=Object.defineProperties,sB=Object.getOwnPropertyDescriptor,XB=Object.getOwnPropertyDescriptors,uB=Object.getOwnPropertyNames,hB=Object.getOwnPropertySymbols,fB=Object.prototype.hasOwnProperty,IB=Object.prototype.propertyIsEnumerable,mB=(B,A,k)=>A in B?C(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,tB=(B,A)=>{for(var k in A||(A={}))fB.call(A,k)&&mB(B,k,A[k]);if(hB)for(var k of hB(A))IB.call(A,k)&&mB(B,k,A[k]);return B},dB=(B,A)=>Y(B,XB(A)),uA=(B,A)=>{for(var k in A)C(B,k,{get:A[k],enumerable:!0})},cA=(B,A,k,a)=>{if(A&&typeof A=="object"||typeof A=="function")for(let p of uB(A))!fB.call(B,p)&&p!==k&&C(B,p,{get:()=>A[p],enumerable:!(a=sB(A,p))||a.enumerable});return B},hA=B=>cA(C({},"__esModule",{value:!0}),B),xB=(B,A,k)=>new Promise((a,p)=>{var u=t=>{try{c(k.next(t))}catch(S){p(S)}},E=t=>{try{c(k.throw(t))}catch(S){p(S)}},c=t=>t.done?a(t.value):Promise.resolve(t.value).then(u,E);c((k=k.apply(B,A)).next())}),DB={};uA(DB,{analyzeMetafile:()=>IA,analyzeMetafileSync:()=>UA,build:()=>yA,buildSync:()=>DA,default:()=>LA,formatMessages:()=>RA,formatMessagesSync:()=>FA,initialize:()=>WA,serve:()=>CA,transform:()=>wA,transformSync:()=>_A,version:()=>MA}),cB.exports=hA(DB);function AA(B){let A=a=>{if(a===null)k.write8(0);else if(typeof a=="boolean")k.write8(1),k.write8(+a);else if(typeof a=="number")k.write8(2),k.write32(a|0);else if(typeof a=="string")k.write8(3),k.write(HB(a));else if(a instanceof Uint8Array)k.write8(4),k.write(a);else if(a instanceof Array){k.write8(5),k.write32(a.length);for(let p of a)A(p)}else{let p=Object.keys(a);k.write8(6),k.write32(p.length);for(let u of p)k.write(HB(u)),A(a[u])}},k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),JB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function QA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return vB(k.read());case 4:return k.read();case 5:{let E=k.read32(),c=[];for(let t=0;t<E;t++)c.push(A());return c}case 6:{let E=k.read32(),c={};for(let t=0;t<E;t++)c[vB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new $A(B),a=k.read32(),p=(a&1)===0;a>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:a,isRequest:p,value:u}}var $A=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);JB(this.buf,B,A)}write(B){let A=this._write(4+B.length);JB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},HB,vB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;HB=k=>B.encode(k),vB=k=>A.decode(k)}else if(typeof Buffer<"u")HB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},vB=B=>{let{buffer:A,byteOffset:k,byteLength:a}=B;return Buffer.from(A,k,a).toString()};else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function JB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var _B=()=>null,z=B=>typeof B=="boolean"?null:"a boolean",mA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",d=B=>typeof B=="string"?null:"a string",FB=B=>B instanceof RegExp?null:"a RegExp object",MB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",VB=B=>typeof B=="function"?null:"a function",eB=B=>Array.isArray(B)?null:"an array",gB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",dA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",gA=B=>typeof B=="object"&&B!==null?null:"an array or an object",eA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",EA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",TA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",bA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",XA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,a){let p=B[k];if(A[k+""]=!0,p===void 0)return;let u=a(p);if(u!==null)throw new Error(`"${k}" must be ${u}`);return p}function nB(B,A,k){for(let a in B)if(!(a in A))throw new Error(`Invalid option ${k}: "${a}"`)}function HA(B){let A=Object.create(null),k=P(B,A,"wasmURL",d),a=P(B,A,"wasmModule",dA),p=P(B,A,"worker",z);return nB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:a,worker:p}}function tA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let a=B[k];if(typeof a=="string"||a===!1)A[k]=a;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function UB(B,A,k,a,p){let u=P(A,k,"color",z),E=P(A,k,"logLevel",d),c=P(A,k,"logLimit",MB);u!==void 0?B.push(`--color=${u}`):a&&B.push("--color=true"),B.push(`--log-level=${E||p}`),B.push(`--log-limit=${c||0}`)}function nA(B,A,k){let a=P(A,k,"legalComments",d),p=P(A,k,"sourceRoot",d),u=P(A,k,"sourcesContent",z),E=P(A,k,"target",bA),c=P(A,k,"format",d),t=P(A,k,"globalName",d),S=P(A,k,"mangleProps",FB),W=P(A,k,"reserveProps",FB),b=P(A,k,"mangleQuoted",z),l=P(A,k,"minify",z),N=P(A,k,"minifySyntax",z),Z=P(A,k,"minifyWhitespace",z),y=P(A,k,"minifyIdentifiers",z),j=P(A,k,"drop",eB),s=P(A,k,"charset",d),Q=P(A,k,"treeShaking",z),X=P(A,k,"ignoreAnnotations",z),M=P(A,k,"jsx",d),w=P(A,k,"jsxFactory",d),BB=P(A,k,"jsxFragment",d),$=P(A,k,"define",gB),n=P(A,k,"logOverride",gB),f=P(A,k,"supported",gB),r=P(A,k,"pure",eB),i=P(A,k,"keepNames",z);if(a&&B.push(`--legal-comments=${a}`),p!==void 0&&B.push(`--source-root=${p}`),u!==void 0&&B.push(`--sources-content=${u}`),E&&(Array.isArray(E)?B.push(`--target=${Array.from(E).map(PA).join(",")}`):B.push(`--target=${PA(E)}`)),c&&B.push(`--format=${c}`),t&&B.push(`--global-name=${t}`),l&&B.push("--minify"),N&&B.push("--minify-syntax"),Z&&B.push("--minify-whitespace"),y&&B.push("--minify-identifiers"),s&&B.push(`--charset=${s}`),Q!==void 0&&B.push(`--tree-shaking=${Q}`),X&&B.push("--ignore-annotations"),j)for(let e of j)B.push(`--drop:${e}`);if(S&&B.push(`--mangle-props=${S.source}`),W&&B.push(`--reserve-props=${W.source}`),b!==void 0&&B.push(`--mangle-quoted=${b}`),M&&B.push(`--jsx=${M}`),w&&B.push(`--jsx-factory=${w}`),BB&&B.push(`--jsx-fragment=${BB}`),$)for(let e in $){if(e.indexOf("=")>=0)throw new Error(`Invalid define: ${e}`);B.push(`--define:${e}=${$[e]}`)}if(n)for(let e in n){if(e.indexOf("=")>=0)throw new Error(`Invalid log override: ${e}`);B.push(`--log-override:${e}=${n[e]}`)}if(f)for(let e in f){if(e.indexOf("=")>=0)throw new Error(`Invalid supported: ${e}`);B.push(`--supported:${e}=${f[e]}`)}if(r)for(let e of r)B.push(`--pure:${e}`);i&&B.push("--keep-names")}function SA(B,A,k,a,p){var u;let E=[],c=[],t=Object.create(null),S=null,W=null,b=null;UB(E,A,t,k,a),nA(E,A,t);let l=P(A,t,"sourcemap",EA),N=P(A,t,"bundle",z),Z=P(A,t,"watch",mA),y=P(A,t,"splitting",z),j=P(A,t,"preserveSymlinks",z),s=P(A,t,"metafile",z),Q=P(A,t,"outfile",d),X=P(A,t,"outdir",d),M=P(A,t,"outbase",d),w=P(A,t,"platform",d),BB=P(A,t,"tsconfig",d),$=P(A,t,"resolveExtensions",eB),n=P(A,t,"nodePaths",eB),f=P(A,t,"mainFields",eB),r=P(A,t,"conditions",eB),i=P(A,t,"external",eB),e=P(A,t,"loader",gB),h=P(A,t,"outExtension",gB),q=P(A,t,"publicPath",d),O=P(A,t,"entryNames",d),F=P(A,t,"chunkNames",d),I=P(A,t,"assetNames",d),G=P(A,t,"inject",eB),U=P(A,t,"banner",gB),x=P(A,t,"footer",gB),L=P(A,t,"entryPoints",gA),J=P(A,t,"absWorkingDir",d),R=P(A,t,"stdin",gB),AB=(u=P(A,t,"write",z))!=null?u:p,pB=P(A,t,"allowOverwrite",z),D=P(A,t,"incremental",z)===!0,T=P(A,t,"mangleCache",gB);if(t.plugins=!0,nB(A,t,`in ${B}() call`),l&&E.push(`--sourcemap${l===!0?"":`=${l}`}`),N&&E.push("--bundle"),pB&&E.push("--allow-overwrite"),Z)if(E.push("--watch"),typeof Z=="boolean")b={};else{let o=Object.create(null),H=P(Z,o,"onRebuild",VB);nB(Z,o,`on "watch" in ${B}() call`),b={onRebuild:H}}if(y&&E.push("--splitting"),j&&E.push("--preserve-symlinks"),s&&E.push("--metafile"),Q&&E.push(`--outfile=${Q}`),X&&E.push(`--outdir=${X}`),M&&E.push(`--outbase=${M}`),w&&E.push(`--platform=${w}`),BB&&E.push(`--tsconfig=${BB}`),$){let o=[];for(let H of $){if(H+="",H.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${H}`);o.push(H)}E.push(`--resolve-extensions=${o.join(",")}`)}if(q&&E.push(`--public-path=${q}`),O&&E.push(`--entry-names=${O}`),F&&E.push(`--chunk-names=${F}`),I&&E.push(`--asset-names=${I}`),f){let o=[];for(let H of f){if(H+="",H.indexOf(",")>=0)throw new Error(`Invalid main field: ${H}`);o.push(H)}E.push(`--main-fields=${o.join(",")}`)}if(r){let o=[];for(let H of r){if(H+="",H.indexOf(",")>=0)throw new Error(`Invalid condition: ${H}`);o.push(H)}E.push(`--conditions=${o.join(",")}`)}if(i)for(let o of i)E.push(`--external:${o}`);if(U)for(let o in U){if(o.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${o}`);E.push(`--banner:${o}=${U[o]}`)}if(x)for(let o in x){if(o.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${o}`);E.push(`--footer:${o}=${x[o]}`)}if(G)for(let o of G)E.push(`--inject:${o}`);if(e)for(let o in e){if(o.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${o}`);E.push(`--loader:${o}=${e[o]}`)}if(h)for(let o in h){if(o.indexOf("=")>=0)throw new Error(`Invalid out extension: ${o}`);E.push(`--out-extension:${o}=${h[o]}`)}if(L)if(Array.isArray(L))for(let o of L)c.push(["",o+""]);else for(let[o,H]of Object.entries(L))c.push([o+"",H+""]);if(R){let o=Object.create(null),H=P(R,o,"contents",d),kB=P(R,o,"resolveDir",d),g=P(R,o,"sourcefile",d),m=P(R,o,"loader",d);nB(R,o,'in "stdin" object'),g&&E.push(`--sourcefile=${g}`),m&&E.push(`--loader=${m}`),kB&&(W=kB+""),S=H?H+"":""}let v=[];if(n)for(let o of n)o+="",v.push(o);return{entries:c,flags:E,write:AB,stdinContents:S,stdinResolveDir:W,absWorkingDir:J,incremental:D,nodePaths:v,watch:b,mangleCache:tA(T)}}function fA(B,A,k,a){let p=[],u=Object.create(null);UB(p,A,u,k,a),nA(p,A,u);let E=P(A,u,"sourcemap",EA),c=P(A,u,"tsconfigRaw",TA),t=P(A,u,"sourcefile",d),S=P(A,u,"loader",d),W=P(A,u,"banner",d),b=P(A,u,"footer",d),l=P(A,u,"mangleCache",gB);return nB(A,u,`in ${B}() call`),E&&p.push(`--sourcemap=${E===!0?"external":E}`),c&&p.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),t&&p.push(`--sourcefile=${t}`),S&&p.push(`--loader=${S}`),W&&p.push(`--banner=${W}`),b&&p.push(`--footer=${b}`),{flags:p,mangleCache:tA(l)}}function xA(B){let A=new Map,k=new Map,a=new Map,p=new Map,u=null,E=0,c=0,t=new Uint8Array(16*1024),S=0,W=r=>{let i=S+r.length;if(i>t.length){let h=new Uint8Array(i*2);h.set(t),t=h}t.set(r,S),S+=r.length;let e=0;for(;e+4<=S;){let h=kA(t,e);if(e+4+h>S)break;e+=4,j(t.subarray(e,e+h)),e+=h}e>0&&(t.copyWithin(0,e,S),S-=e)},b=r=>{u={reason:r?": "+(r.message||r):""};let i="The service was stopped"+u.reason;for(let e of A.values())e(i,null);A.clear();for(let e of p.values())e.onWait(i);p.clear();for(let e of a.values())try{e(new Error(i),null)}catch(h){console.error(h)}a.clear()},l=(r,i,e)=>{if(u)return e("The service is no longer running"+u.reason,null);let h=E++;A.set(h,(q,O)=>{try{e(q,O)}finally{r&&r.unref()}}),r&&r.ref(),B.writeToStdin(AA({id:h,isRequest:!0,value:i}))},N=(r,i)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(AA({id:r,isRequest:!1,value:i}))},Z=(r,i)=>xB(this,null,function*(){try{switch(i.command){case"ping":{N(r,{});break}case"on-start":{let e=k.get(i.key);e?N(r,yield e(i)):N(r,{});break}case"on-resolve":{let e=k.get(i.key);e?N(r,yield e(i)):N(r,{});break}case"on-load":{let e=k.get(i.key);e?N(r,yield e(i)):N(r,{});break}case"serve-request":{let e=p.get(i.key);e&&e.onRequest&&e.onRequest(i.args),N(r,{});break}case"serve-wait":{let e=p.get(i.key);e&&e.onWait(i.error),N(r,{});break}case"watch-rebuild":{let e=a.get(i.key);try{e&&e(null,i.args)}catch(h){console.error(h)}N(r,{});break}default:throw new Error("Invalid command: "+i.command)}}catch(e){N(r,{errors:[yB(e,B,null,void 0,"")]})}}),y=!0,j=r=>{if(y){y=!1;let e=String.fromCharCode(...r);if(e!=="0.14.49")throw new Error(`Cannot start service: Host version "0.14.49" does not match binary version ${JSON.stringify(e)}`);return}let i=QA(r);if(i.isRequest)Z(i.id,i.value);else{let e=A.get(i.id);A.delete(i.id),i.value.error?e(i.value.error,{}):e(null,i.value)}},s=(r,i,e,h,q)=>xB(this,null,function*(){let O=[],F=[],I={},G={},U=0,x=0,L=[],J=!1;i=[...i];for(let D of i){let T={};if(typeof D!="object")throw new Error(`Plugin at index ${x} must be an object`);let v=P(D,T,"name",d);if(typeof v!="string"||v==="")throw new Error(`Plugin at index ${x} is missing a name`);try{let o=P(D,T,"setup",VB);if(typeof o!="function")throw new Error("Plugin is missing a setup function");nB(D,T,`on plugin ${JSON.stringify(v)}`);let H={name:v,onResolve:[],onLoad:[]};x++;let g=o({initialOptions:r,resolve:(m,V={})=>{if(!J)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof m!="string")throw new Error("The path to resolve must be a string");let _=Object.create(null),aB=P(V,_,"pluginName",d),$B=P(V,_,"importer",d),EB=P(V,_,"namespace",d),lB=P(V,_,"resolveDir",d),iB=P(V,_,"kind",d),K=P(V,_,"pluginData",_B);return nB(V,_,"in resolve() call"),new Promise((rB,oB)=>{let PB={command:"resolve",path:m,key:e,pluginName:v};aB!=null&&(PB.pluginName=aB),$B!=null&&(PB.importer=$B),EB!=null&&(PB.namespace=EB),lB!=null&&(PB.resolveDir=lB),iB!=null&&(PB.kind=iB),K!=null&&(PB.pluginData=h.store(K)),l(q,PB,(TB,jB)=>{TB!==null?oB(new Error(TB)):rB({errors:bB(jB.errors,h),warnings:bB(jB.warnings,h),path:jB.path,external:jB.external,sideEffects:jB.sideEffects,namespace:jB.namespace,suffix:jB.suffix,pluginData:h.load(jB.pluginData)})})})},onStart(m){let V='This error came from the "onStart" callback registered here:',_=WB(new Error(V),B,"onStart");O.push({name:v,callback:m,note:_})},onEnd(m){let V='This error came from the "onEnd" callback registered here:',_=WB(new Error(V),B,"onEnd");F.push({name:v,callback:m,note:_})},onResolve(m,V){let _='This error came from the "onResolve" callback registered here:',aB=WB(new Error(_),B,"onResolve"),$B={},EB=P(m,$B,"filter",FB),lB=P(m,$B,"namespace",d);if(nB(m,$B,`in onResolve() call for plugin ${JSON.stringify(v)}`),EB==null)throw new Error("onResolve() call is missing a filter");let iB=U++;I[iB]={name:v,callback:V,note:aB},H.onResolve.push({id:iB,filter:EB.source,namespace:lB||""})},onLoad(m,V){let _='This error came from the "onLoad" callback registered here:',aB=WB(new Error(_),B,"onLoad"),$B={},EB=P(m,$B,"filter",FB),lB=P(m,$B,"namespace",d);if(nB(m,$B,`in onLoad() call for plugin ${JSON.stringify(v)}`),EB==null)throw new Error("onLoad() call is missing a filter");let iB=U++;G[iB]={name:v,callback:V,note:aB},H.onLoad.push({id:iB,filter:EB.source,namespace:lB||""})},esbuild:B.esbuild});g&&(yield g),L.push(H)}catch(o){return{ok:!1,error:o,pluginName:v}}}let R=D=>xB(this,null,function*(){switch(D.command){case"on-start":{let T={errors:[],warnings:[]};return yield Promise.all(O.map(v=>xB(this,[v],function*({name:o,callback:H,note:kB}){try{let g=yield H();if(g!=null){if(typeof g!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(o)} to return an object`);let m={},V=P(g,m,"errors",eB),_=P(g,m,"warnings",eB);nB(g,m,`from onStart() callback in plugin ${JSON.stringify(o)}`),V!=null&&T.errors.push(...SB(V,"errors",h,o)),_!=null&&T.warnings.push(...SB(_,"warnings",h,o))}}catch(g){T.errors.push(yB(g,B,h,kB&&kB(),o))}}))),T}case"on-resolve":{let T={},v="",o,H;for(let kB of D.ids)try{({name:v,callback:o,note:H}=I[kB]);let g=yield o({path:D.path,importer:D.importer,namespace:D.namespace,resolveDir:D.resolveDir,kind:D.kind,pluginData:h.load(D.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(v)} to return an object`);let m={},V=P(g,m,"pluginName",d),_=P(g,m,"path",d),aB=P(g,m,"namespace",d),$B=P(g,m,"suffix",d),EB=P(g,m,"external",z),lB=P(g,m,"sideEffects",z),iB=P(g,m,"pluginData",_B),K=P(g,m,"errors",eB),rB=P(g,m,"warnings",eB),oB=P(g,m,"watchFiles",eB),PB=P(g,m,"watchDirs",eB);nB(g,m,`from onResolve() callback in plugin ${JSON.stringify(v)}`),T.id=kB,V!=null&&(T.pluginName=V),_!=null&&(T.path=_),aB!=null&&(T.namespace=aB),$B!=null&&(T.suffix=$B),EB!=null&&(T.external=EB),lB!=null&&(T.sideEffects=lB),iB!=null&&(T.pluginData=h.store(iB)),K!=null&&(T.errors=SB(K,"errors",h,v)),rB!=null&&(T.warnings=SB(rB,"warnings",h,v)),oB!=null&&(T.watchFiles=NB(oB,"watchFiles")),PB!=null&&(T.watchDirs=NB(PB,"watchDirs"));break}}catch(g){return{id:kB,errors:[yB(g,B,h,H&&H(),v)]}}return T}case"on-load":{let T={},v="",o,H;for(let kB of D.ids)try{({name:v,callback:o,note:H}=G[kB]);let g=yield o({path:D.path,namespace:D.namespace,suffix:D.suffix,pluginData:h.load(D.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(v)} to return an object`);let m={},V=P(g,m,"pluginName",d),_=P(g,m,"contents",XA),aB=P(g,m,"resolveDir",d),$B=P(g,m,"pluginData",_B),EB=P(g,m,"loader",d),lB=P(g,m,"errors",eB),iB=P(g,m,"warnings",eB),K=P(g,m,"watchFiles",eB),rB=P(g,m,"watchDirs",eB);nB(g,m,`from onLoad() callback in plugin ${JSON.stringify(v)}`),T.id=kB,V!=null&&(T.pluginName=V),_ instanceof Uint8Array?T.contents=_:_!=null&&(T.contents=HB(_)),aB!=null&&(T.resolveDir=aB),$B!=null&&(T.pluginData=h.store($B)),EB!=null&&(T.loader=EB),lB!=null&&(T.errors=SB(lB,"errors",h,v)),iB!=null&&(T.warnings=SB(iB,"warnings",h,v)),K!=null&&(T.watchFiles=NB(K,"watchFiles")),rB!=null&&(T.watchDirs=NB(rB,"watchDirs"));break}}catch(g){return{id:kB,errors:[yB(g,B,h,H&&H(),v)]}}return T}default:throw new Error("Invalid command: "+D.command)}}),AB=(D,T,v)=>v();F.length>0&&(AB=(D,T,v)=>{(()=>xB(this,null,function*(){for(let{name:o,callback:H,note:kB}of F)try{yield H(D)}catch(g){D.errors.push(yield new Promise(m=>T(g,o,kB&&kB(),m)))}}))().then(v)}),J=!0;let pB=0;return{ok:!0,requestPlugins:L,runOnEndCallbacks:AB,pluginRefs:{ref(){++pB===1&&k.set(e,R)},unref(){--pB===0&&k.delete(e)}}}}),Q=(r,i,e,h)=>{let q={},O=P(i,q,"port",MB),F=P(i,q,"host",d),I=P(i,q,"servedir",d),G=P(i,q,"onRequest",VB),U,x=new Promise((L,J)=>{U=R=>{p.delete(h),R!==null?J(new Error(R)):L()}});return e.serve={},nB(i,q,"in serve() call"),O!==void 0&&(e.serve.port=O),F!==void 0&&(e.serve.host=F),I!==void 0&&(e.serve.servedir=I),p.set(h,{onRequest:G,onWait:U}),{wait:x,stop(){l(r,{command:"serve-stop",key:h},()=>{})}}},X="warning",M="silent",w=r=>{let i=c++,e=rA(),h,{refs:q,options:O,isTTY:F,callback:I}=r;if(typeof O=="object"){let x=O.plugins;if(x!==void 0){if(!Array.isArray(x))throw new Error('"plugins" must be an array');h=x}}let G=(x,L,J,R)=>{let AB=[];try{UB(AB,O,{},F,X)}catch{}let pB=yB(x,B,e,J,L);l(q,{command:"error",flags:AB,error:pB},()=>{pB.detail=e.load(pB.detail),R(pB)})},U=(x,L)=>{G(x,L,void 0,J=>{I(CB("Build failed",[J],[]),null)})};if(h&&h.length>0){if(B.isSync)return U(new Error("Cannot use plugins in synchronous API calls"),"");s(O,h,i,e,q).then(x=>{if(!x.ok)U(x.error,x.pluginName);else try{BB(dB(tB({},r),{key:i,details:e,logPluginError:G,requestPlugins:x.requestPlugins,runOnEndCallbacks:x.runOnEndCallbacks,pluginRefs:x.pluginRefs}))}catch(L){U(L,"")}},x=>U(x,""))}else try{BB(dB(tB({},r),{key:i,details:e,logPluginError:G,requestPlugins:null,runOnEndCallbacks:(x,L,J)=>J(),pluginRefs:null}))}catch(x){U(x,"")}},BB=({callName:r,refs:i,serveOptions:e,options:h,isTTY:q,defaultWD:O,callback:F,key:I,details:G,logPluginError:U,requestPlugins:x,runOnEndCallbacks:L,pluginRefs:J})=>{let R={ref(){J&&J.ref(),i&&i.ref()},unref(){J&&J.unref(),i&&i.unref()}},AB=!B.isWriteUnavailable,{entries:pB,flags:D,write:T,stdinContents:v,stdinResolveDir:o,absWorkingDir:H,incremental:kB,nodePaths:g,watch:m,mangleCache:V}=SA(r,h,q,X,AB),_={command:"build",key:I,entries:pB,flags:D,write:T,stdinContents:v,stdinResolveDir:o,absWorkingDir:H||O,incremental:kB,nodePaths:g};x&&(_.plugins=x),V&&(_.mangleCache=V);let aB=e&&Q(R,e,_,I),$B,EB,lB=(K,rB)=>{K.outputFiles&&(rB.outputFiles=K.outputFiles.map(vA)),K.metafile&&(rB.metafile=JSON.parse(K.metafile)),K.mangleCache&&(rB.mangleCache=K.mangleCache),K.writeToStdout!==void 0&&console.log(vB(K.writeToStdout).replace(/\n$/,""))},iB=(K,rB)=>{let oB={errors:bB(K.errors,G),warnings:bB(K.warnings,G)};lB(K,oB),L(oB,U,()=>{if(oB.errors.length>0)return rB(CB("Build failed",oB.errors,oB.warnings),null);if(K.rebuild){if(!$B){let PB=!1;$B=()=>new Promise((TB,jB)=>{if(PB||u)throw new Error("Cannot rebuild");l(R,{command:"rebuild",key:I},(QB,OA)=>{if(QB)return rB(CB("Build failed",[{id:"",pluginName:"",text:QB,location:null,notes:[],detail:void 0}],[]),null);iB(OA,(KB,GA)=>{KB?jB(KB):TB(GA)})})}),R.ref(),$B.dispose=()=>{PB||(PB=!0,l(R,{command:"rebuild-dispose",key:I},()=>{}),R.unref())}}oB.rebuild=$B}if(K.watch){if(!EB){let PB=!1;R.ref(),EB=()=>{PB||(PB=!0,a.delete(I),l(R,{command:"watch-stop",key:I},()=>{}),R.unref())},m&&a.set(I,(TB,jB)=>{if(TB){m.onRebuild&&m.onRebuild(TB,null);return}let QB={errors:bB(jB.errors,G),warnings:bB(jB.warnings,G)};lB(jB,QB),L(QB,U,()=>{if(QB.errors.length>0){m.onRebuild&&m.onRebuild(CB("Build failed",QB.errors,QB.warnings),null);return}jB.rebuildID!==void 0&&(QB.rebuild=$B),QB.stop=EB,m.onRebuild&&m.onRebuild(null,QB)})})}oB.stop=EB}rB(null,oB)})};if(T&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(kB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(m&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');l(R,_,(K,rB)=>{if(K)return F(new Error(K),null);if(aB){let oB=rB,PB=!1;R.ref();let TB={port:oB.port,host:oB.host,wait:aB.wait,stop(){PB||(PB=!0,aB.stop(),R.unref())}};return R.ref(),aB.wait.then(R.unref,R.unref),F(null,TB)}return iB(rB,F)})};return{readFromStdout:W,afterClose:b,service:{buildOrServe:w,transform:({callName:r,refs:i,input:e,options:h,isTTY:q,fs:O,callback:F})=>{let I=rA(),G=U=>{try{if(typeof e!="string")throw new Error('The input to "transform" must be a string');let{flags:x,mangleCache:L}=fA(r,h,q,M),J={command:"transform",flags:x,inputFS:U!==null,input:U!==null?U:e};L&&(J.mangleCache=L),l(i,J,(R,AB)=>{if(R)return F(new Error(R),null);let pB=bB(AB.errors,I),D=bB(AB.warnings,I),T=1,v=()=>{if(--T===0){let o={warnings:D,code:AB.code,map:AB.map};AB.mangleCache&&(o.mangleCache=AB?.mangleCache),F(null,o)}};if(pB.length>0)return F(CB("Transform failed",pB,D),null);AB.codeFS&&(T++,O.readFile(AB.code,(o,H)=>{o!==null?F(o,null):(AB.code=H,v())})),AB.mapFS&&(T++,O.readFile(AB.map,(o,H)=>{o!==null?F(o,null):(AB.map=H,v())})),v()})}catch(x){let L=[];try{UB(L,h,{},q,M)}catch{}let J=yB(x,B,I,void 0,"");l(i,{command:"error",flags:L,error:J},()=>{J.detail=I.load(J.detail),F(CB("Transform failed",[J],[]),null)})}};if(typeof e=="string"&&e.length>1024*1024){let U=G;G=()=>O.writeFile(e,U)}G(null)},formatMessages:({callName:r,refs:i,messages:e,options:h,callback:q})=>{let O=SB(e,"messages",null,"");if(!h)throw new Error(`Missing second argument in ${r}() call`);let F={},I=P(h,F,"kind",d),G=P(h,F,"color",z),U=P(h,F,"terminalWidth",MB);if(nB(h,F,`in ${r}() call`),I===void 0)throw new Error(`Missing "kind" in ${r}() call`);if(I!=="error"&&I!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${r}() call`);let x={command:"format-msgs",messages:O,isWarning:I==="warning"};G!==void 0&&(x.color=G),U!==void 0&&(x.terminalWidth=U),l(i,x,(L,J)=>{if(L)return q(new Error(L),null);q(null,J.messages)})},analyzeMetafile:({callName:r,refs:i,metafile:e,options:h,callback:q})=>{h===void 0&&(h={});let O={},F=P(h,O,"color",z),I=P(h,O,"verbose",z);nB(h,O,`in ${r}() call`);let G={command:"analyze-metafile",metafile:e};F!==void 0&&(G.color=F),I!==void 0&&(G.verbose=I),l(i,G,(U,x)=>{if(U)return q(new Error(U),null);q(null,x.result)})}}}}function rA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let a=A++;return B.set(a,k),a}}}function WB(B,A,k){let a,p=!1;return()=>{if(p)return a;p=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let E=aA(A,u,k);if(E)return a={text:B.message,location:E},a}catch{}}}function yB(B,A,k,a,p){let u="Internal error",E=null;try{u=(B&&B.message||B)+""}catch{}try{E=aA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:p,text:u,location:E,notes:a?[a]:[],detail:k?k.store(B):-1}}function aA(B,A,k){let a="    at ";if(B.readFileSync&&!A[0].startsWith(a)&&A[1].startsWith(a))for(let p=1;p<A.length;p++){let u=A[p];if(!!u.startsWith(a))for(u=u.slice(a.length);;){let E=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(E){u=E[1];continue}if(E=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),E){u=E[1];continue}if(E=/^(\S+):(\d+):(\d+)$/.exec(u),E){let c;try{c=B.readFileSync(E[1],"utf8")}catch{break}let t=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+E[2]-1]||"",S=+E[3]-1,W=t.slice(S,S+k.length)===k?k.length:0;return{file:E[1],namespace:"file",line:+E[2],column:HB(t.slice(0,S)).length,length:HB(t.slice(S,S+W)).length,lineText:t+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function CB(B,A,k){let a=5,p=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,a+1).map((E,c)=>{if(c===a)return`
...`;if(!E.location)return`
error: ${E.text}`;let{file:t,line:S,column:W}=E.location,b=E.pluginName?`[plugin: ${E.pluginName}] `:"";return`
${t}:${S}:${W}: ERROR: ${b}${E.text}`}).join(""),u=new Error(`${B}${p}`);return u.errors=A,u.warnings=k,u}function bB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function iA(B,A){if(B==null)return null;let k={},a=P(B,k,"file",d),p=P(B,k,"namespace",d),u=P(B,k,"line",MB),E=P(B,k,"column",MB),c=P(B,k,"length",MB),t=P(B,k,"lineText",d),S=P(B,k,"suggestion",d);return nB(B,k,A),{file:a||"",namespace:p||"",line:u||0,column:E||0,length:c||0,lineText:t||"",suggestion:S||""}}function SB(B,A,k,a){let p=[],u=0;for(let E of B){let c={},t=P(E,c,"id",d),S=P(E,c,"pluginName",d),W=P(E,c,"text",d),b=P(E,c,"location",eA),l=P(E,c,"notes",eB),N=P(E,c,"detail",_B),Z=`in element ${u} of "${A}"`;nB(E,c,Z);let y=[];if(l)for(let j of l){let s={},Q=P(j,s,"text",d),X=P(j,s,"location",eA);nB(j,s,Z),y.push({text:Q||"",location:iA(X,Z)})}p.push({id:t||"",pluginName:S||a,text:W||"",location:iA(b,Z),notes:y,detail:k?k.store(N):-1}),u++}return p}function NB(B,A){let k=[];for(let a of B){if(typeof a!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(a)}return k}function vA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){return k===null&&(k=vB(A)),k}}}var MA="0.14.49",yA=B=>LB().build(B),CA=()=>{throw new Error('The "serve" API only works in node')},wA=(B,A)=>LB().transform(B,A),RA=(B,A)=>LB().formatMessages(B,A),IA=(B,A)=>LB().analyzeMetafile(B,A),DA=()=>{throw new Error('The "buildSync" API only works in node')},_A=()=>{throw new Error('The "transformSync" API only works in node')},FA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},UA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wB,qB,LB=()=>{if(qB)return qB;throw wB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},WA=B=>{B=HA(B||{});let A=B.wasmURL,k=B.wasmModule,a=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(wB)throw new Error('Cannot call "initialize" more than once');return wB=NA(A||"",k,a),wB.catch(()=>{wB=void 0}),wB},NA=(B,A,k)=>xB(void 0,null,function*(){let a;if(A)a=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);a=yield c.arrayBuffer()}let p;if(k){let c=new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
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
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
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
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
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
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              go: {
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
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = new Date().getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(() => {
                    this._resume();
                    while (this._scheduledTimeouts.has(id)) {
                      console.warn("scheduleTimeoutEvent: missed timeout event");
                      this._resume();
                    }
                  }, getInt64(sp + 8) + 1));
                  this.mem.setInt32(sp + 16, id, true);
                },
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
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
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
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
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
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
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
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
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
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
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.14.49"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});p=new Worker(URL.createObjectURL(c))}else{let c=(t=>{var S=(l,N,Z)=>new Promise((y,j)=>{var s=M=>{try{X(Z.next(M))}catch(w){j(w)}},Q=M=>{try{X(Z.throw(M))}catch(w){j(w)}},X=M=>M.done?y(M.value):Promise.resolve(M.value).then(s,Q);X((Z=Z.apply(l,N)).next())});let W,b={};for(let l=self;l;l=Object.getPrototypeOf(l))for(let N of Object.getOwnPropertyNames(l))N in b||Object.defineProperty(b,N,{get:()=>self[N]});return(()=>{let l=()=>{let y=new Error("not implemented");return y.code="ENOSYS",y};if(!b.fs){let y="";b.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(j,s){y+=Z.decode(s);let Q=y.lastIndexOf(`
`);return Q!=-1&&(console.log(y.substr(0,Q)),y=y.substr(Q+1)),s.length},write(j,s,Q,X,M,w){if(Q!==0||X!==s.length||M!==null){w(l());return}let BB=this.writeSync(j,s);w(null,BB)},chmod(j,s,Q){Q(l())},chown(j,s,Q,X){X(l())},close(j,s){s(l())},fchmod(j,s,Q){Q(l())},fchown(j,s,Q,X){X(l())},fstat(j,s){s(l())},fsync(j,s){s(null)},ftruncate(j,s,Q){Q(l())},lchown(j,s,Q,X){X(l())},link(j,s,Q){Q(l())},lstat(j,s){s(l())},mkdir(j,s,Q){Q(l())},open(j,s,Q,X){X(l())},read(j,s,Q,X,M,w){w(l())},readdir(j,s){s(l())},readlink(j,s){s(l())},rename(j,s,Q){Q(l())},rmdir(j,s){s(l())},stat(j,s){s(l())},symlink(j,s,Q){Q(l())},truncate(j,s,Q){Q(l())},unlink(j,s){s(l())},utimes(j,s,Q,X){X(l())}}}if(b.process||(b.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw l()},pid:-1,ppid:-1,umask(){throw l()},cwd(){throw l()},chdir(){throw l()}}),!b.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!b.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!b.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!b.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let N=new TextEncoder("utf-8"),Z=new TextDecoder("utf-8");b.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let y=($,n)=>{this.mem.setUint32($+0,n,!0),this.mem.setUint32($+4,Math.floor(n/4294967296),!0)},j=$=>{let n=this.mem.getUint32($+0,!0),f=this.mem.getInt32($+4,!0);return n+f*4294967296},s=$=>{let n=this.mem.getFloat64($,!0);if(n===0)return;if(!isNaN(n))return n;let f=this.mem.getUint32($,!0);return this._values[f]},Q=($,n)=>{if(typeof n=="number"&&n!==0){if(isNaN(n)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,n,!0);return}if(n===void 0){this.mem.setFloat64($,0,!0);return}let r=this._ids.get(n);r===void 0&&(r=this._idPool.pop(),r===void 0&&(r=this._values.length),this._values[r]=n,this._goRefCounts[r]=0,this._ids.set(n,r)),this._goRefCounts[r]++;let i=0;switch(typeof n){case"object":n!==null&&(i=1);break;case"string":i=2;break;case"symbol":i=3;break;case"function":i=4;break}this.mem.setUint32($+4,2146959360|i,!0),this.mem.setUint32($,r,!0)},X=$=>{let n=j($+0),f=j($+8);return new Uint8Array(this._inst.exports.mem.buffer,n,f)},M=$=>{let n=j($+0),f=j($+8),r=new Array(f);for(let i=0;i<f;i++)r[i]=s(n+i*8);return r},w=$=>{let n=j($+0),f=j($+8);return Z.decode(new DataView(this._inst.exports.mem.buffer,n,f))},BB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let n=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(n)},"runtime.wasmWrite":$=>{$>>>=0;let n=j($+8),f=j($+16),r=this.mem.getInt32($+24,!0);b.fs.writeSync(n,new Uint8Array(this._inst.exports.mem.buffer,f,r))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,y($+8,(BB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let n=new Date().getTime();y($+8,n/1e3),this.mem.setInt32($+16,n%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let n=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(n,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(n);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},j($+8)+1)),this.mem.setInt32($+16,n,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let n=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(n)),this._scheduledTimeouts.delete(n)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(X($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let n=this.mem.getUint32($+8,!0);if(this._goRefCounts[n]--,this._goRefCounts[n]===0){let f=this._values[n];this._values[n]=null,this._ids.delete(f),this._idPool.push(n)}},"syscall/js.stringVal":$=>{$>>>=0,Q($+24,w($+8))},"syscall/js.valueGet":$=>{$>>>=0;let n=Reflect.get(s($+8),w($+16));$=this._inst.exports.getsp()>>>0,Q($+32,n)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(s($+8),w($+16),s($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(s($+8),w($+16))},"syscall/js.valueIndex":$=>{$>>>=0,Q($+24,Reflect.get(s($+8),j($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(s($+8),j($+16),s($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let n=s($+8),f=Reflect.get(n,w($+16)),r=M($+32),i=Reflect.apply(f,n,r);$=this._inst.exports.getsp()>>>0,Q($+56,i),this.mem.setUint8($+64,1)}catch(n){$=this._inst.exports.getsp()>>>0,Q($+56,n),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let n=s($+8),f=M($+16),r=Reflect.apply(n,void 0,f);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(n){$=this._inst.exports.getsp()>>>0,Q($+40,n),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let n=s($+8),f=M($+16),r=Reflect.construct(n,f);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(n){$=this._inst.exports.getsp()>>>0,Q($+40,n),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,y($+16,parseInt(s($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let n=N.encode(String(s($+8)));Q($+16,n),y($+24,n.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let n=s($+8);X($+16).set(n)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,s($+8)instanceof s($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let n=X($+8),f=s($+32);if(!(f instanceof Uint8Array||f instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=f.subarray(0,n.length);n.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let n=s($+8),f=X($+16);if(!(n instanceof Uint8Array||n instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=f.subarray(0,n.length);n.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(y){return S(this,null,function*(){if(!(y instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=y,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,b,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[b,5],[this,6]]),this._idPool=[],this.exited=!1;let j=4096,s=$=>{let n=j,f=N.encode($+"\0");return new Uint8Array(this.mem.buffer,j,f.length).set(f),j+=f.length,j%8!==0&&(j+=8-j%8),n},Q=this.argv.length,X=[];this.argv.forEach($=>{X.push(s($))}),X.push(0),Object.keys(this.env).sort().forEach($=>{X.push(s(`${$}=${this.env[$]}`))}),X.push(0);let w=j;X.forEach($=>{this.mem.setUint32(j,$,!0),this.mem.setUint32(j+4,0,!0),j+=8});let BB=4096+8192;if(j>=BB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(Q,w),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(y){let j=this;return function(){let s={id:y,this:this,args:arguments};return j._pendingEvent=s,j._resume(),s.result}}}})(),W=({data:l})=>{let N=new TextDecoder,Z=b.fs,y="";Z.writeSync=(M,w)=>{if(M===1)t(w);else if(M===2){y+=N.decode(w);let BB=y.split(`
`);BB.length>1&&console.log(BB.slice(0,-1).join(`
`)),y=BB[BB.length-1]}else throw new Error("Bad write");return w.length};let j=[],s,Q=0;W=({data:M})=>{M.length>0&&(j.push(M),s&&s())},Z.read=(M,w,BB,$,n,f)=>{if(M!==0||BB!==0||$!==w.length||n!==null)throw new Error("Bad read");if(j.length===0){s=()=>Z.read(M,w,BB,$,n,f);return}let r=j[0],i=Math.max(0,Math.min($,r.length-Q));w.set(r.subarray(Q,Q+i),BB),Q+=i,Q===r.length&&(j.shift(),Q=0),f(null,i)};let X=new b.Go;X.argv=["","--service=0.14.49"],l instanceof WebAssembly.Module?WebAssembly.instantiate(l,X.importObject).then(M=>X.run(M)):WebAssembly.instantiate(l,X.importObject).then(({instance:M})=>X.run(M))},l=>W(l)})(t=>p.onmessage({data:t}));p={onmessage:null,postMessage:t=>setTimeout(()=>c({data:t})),terminate(){}}}p.postMessage(a),p.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:E}=xA({writeToStdin(c){p.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:DB});qB={build:c=>new Promise((t,S)=>E.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(W,b)=>W?S(W):t(b)})),transform:(c,t)=>new Promise((S,W)=>E.transform({callName:"transform",refs:null,input:c,options:t||{},isTTY:!1,fs:{readFile(b,l){l(new Error("Internal error"),null)},writeFile(b,l){l(null)}},callback:(b,l)=>b?W(b):S(l)})),formatMessages:(c,t)=>new Promise((S,W)=>E.formatMessages({callName:"formatMessages",refs:null,messages:c,options:t,callback:(b,l)=>b?W(b):S(l)})),analyzeMetafile:(c,t)=>new Promise((S,W)=>E.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:t,callback:(b,l)=>b?W(b):S(l)}))}}),LA=DB})(typeof ZB=="object"?ZB:{set exports(cB){(typeof self<"u"?self:this).esbuild=cB}})});RB();RB();var A7=new Error("timeout while waiting for mutex to become available"),$7=new Error("mutex already locked"),qA=new Error("request for lock canceled"),oA=function(cB,C,Y,sB){function XB(uB){return uB instanceof Y?uB:new Y(function(hB){hB(uB)})}return new(Y||(Y=Promise))(function(uB,hB){function fB(tB){try{mB(sB.next(tB))}catch(dB){hB(dB)}}function IB(tB){try{mB(sB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?uB(tB.value):XB(tB.value).then(fB,IB)}mB((sB=sB.apply(cB,C||[])).next())})},YB=class{constructor(C,Y=qA){if(this._maxConcurrency=C,this._cancelError=Y,this._queue=[],this._waiters=[],C<=0)throw new Error("semaphore must be initialized to a positive value");this._value=C}acquire(){let C=this.isLocked(),Y=new Promise((sB,XB)=>this._queue.push({resolve:sB,reject:XB}));return C||this._dispatch(),Y}runExclusive(C){return oA(this,void 0,void 0,function*(){let[Y,sB]=yield this.acquire();try{return yield C(Y)}finally{sB()}})}waitForUnlock(){return oA(this,void 0,void 0,function*(){return this.isLocked()?new Promise(Y=>this._waiters.push({resolve:Y})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let C=this._currentReleaser;this._currentReleaser=void 0,C()}}cancel(){this._queue.forEach(C=>C.reject(this._cancelError)),this._queue=[]}_dispatch(){let C=this._queue.shift();if(!C)return;let Y=!1;this._currentReleaser=()=>{Y||(Y=!0,this._value++,this._resolveWaiters(),this._dispatch())},C.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(C=>C.resolve()),this._waiters=[]}},KA=function(cB,C,Y,sB){function XB(uB){return uB instanceof Y?uB:new Y(function(hB){hB(uB)})}return new(Y||(Y=Promise))(function(uB,hB){function fB(tB){try{mB(sB.next(tB))}catch(dB){hB(dB)}}function IB(tB){try{mB(sB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?uB(tB.value):XB(tB.value).then(fB,IB)}mB((sB=sB.apply(cB,C||[])).next())})},OB=class{constructor(C){this._semaphore=new YB(1,C)}acquire(){return KA(this,void 0,void 0,function*(){let[,C]=yield this._semaphore.acquire();return C})}runExclusive(C){return this._semaphore.runExclusive(()=>C())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var GB=VA(jA(),1);var pA="./esbuild-HZXT6DI4.wasm";var zB={initFinished:!1},ZA=new OB,i7=async()=>(zB.initFinished||await ZA.runExclusive(async()=>(zB.initFinished||await GB.initialize({wasmURL:pA}),zB.initFinished=!0,!0)),BA),zA=/ from \"\.\./ig,B7=/ from \"\./ig;async function BA(cB,C=4){try{return(await GB.transform(`/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    `+cB,{loader:"tsx",target:"esnext"})).code.replaceAll(zA,' from "/live').replaceAll(B7,' from "/live')}catch(Y){if(C>0)return await sA(100),BA(cB,C-1);throw Y}}export{i7 as init};
