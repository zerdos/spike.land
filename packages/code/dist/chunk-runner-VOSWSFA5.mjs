import{a as XA,b as gA,c as TA,e as bA}from"./chunk-chunk-B2FWCURI.mjs";import{d as BA}from"./chunk-chunk-HJZ23XEN.mjs";import"./chunk-chunk-RI3ZG6FZ.mjs";import"./chunk-chunk-LZPDAGTB.mjs";import{D as mA,H as dA,P as AA,f as hA,x as QA}from"./chunk-chunk-3OFGBBDI.mjs";import{b as n7,d as zB,j as bB}from"./chunk-chunk-UURPA34U.mjs";var fA=n7((T7,eA)=>{bB();(AB=>{"use strict";var h=Object.defineProperty,T=Object.defineProperties,J=Object.getOwnPropertyDescriptor,R=Object.getOwnPropertyDescriptors,Z=Object.getOwnPropertyNames,tB=Object.getOwnPropertySymbols,HB=Object.prototype.hasOwnProperty,xB=Object.prototype.propertyIsEnumerable,dB=(B,A,k)=>A in B?h(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,sB=(B,A)=>{for(var k in A||(A={}))HB.call(A,k)&&dB(B,k,A[k]);if(tB)for(var k of tB(A))xB.call(A,k)&&dB(B,k,A[k]);return B},XB=(B,A)=>T(B,R(A)),yA=(B,A)=>{for(var k in A)h(B,k,{get:A[k],enumerable:!0})},CA=(B,A,k,n)=>{if(A&&typeof A=="object"||typeof A=="function")for(let p of Z(A))!HB.call(B,p)&&p!==k&&h(B,p,{get:()=>A[p],enumerable:!(n=J(A,p))||n.enumerable});return B},wA=B=>CA(h({},"__esModule",{value:!0}),B),MB=(B,A,k)=>new Promise((n,p)=>{var u=E=>{try{c(k.next(E))}catch(x){p(x)}},e=E=>{try{c(k.throw(E))}catch(x){p(x)}},c=E=>E.done?n(E.value):Promise.resolve(E.value).then(u,e);c((k=k.apply(B,A)).next())}),_B={};yA(_B,{analyzeMetafile:()=>ZA,analyzeMetafileSync:()=>$7,build:()=>JA,buildSync:()=>zA,default:()=>e7,formatMessages:()=>YA,formatMessagesSync:()=>A7,initialize:()=>k7,serve:()=>VA,transform:()=>KA,transformSync:()=>B7,version:()=>qA}),AB.exports=wA(_B);function tA(B){let A=n=>{if(n===null)k.write8(0);else if(typeof n=="boolean")k.write8(1),k.write8(+n);else if(typeof n=="number")k.write8(2),k.write32(n|0);else if(typeof n=="string")k.write8(3),k.write(gB(n));else if(n instanceof Uint8Array)k.write8(4),k.write(n);else if(n instanceof Array){k.write8(5),k.write32(n.length);for(let p of n)A(p)}else{let p=Object.keys(n);k.write8(6),k.write32(p.length);for(let u of p)k.write(gB(u)),A(n[u])}},k=new nA;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),VB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function RA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return yB(k.read());case 4:return k.read();case 5:{let e=k.read32(),c=[];for(let E=0;E<e;E++)c.push(A());return c}case 6:{let e=k.read32(),c={};for(let E=0;E<e;E++)c[yB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new nA(B),n=k.read32(),p=(n&1)===0;n>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:n,isRequest:p,value:u}}var nA=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);VB(this.buf,B,A)}write(B){let A=this._write(4+B.length);VB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return rA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},gB,yB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;gB=k=>B.encode(k),yB=k=>A.decode(k)}else if(typeof Buffer<"u")gB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},yB=B=>{let{buffer:A,byteOffset:k,byteLength:n}=B;return Buffer.from(A,k,n).toString()};else throw new Error("No UTF-8 codec found");function rA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function VB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function aA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var FB=()=>null,$B=B=>typeof B=="boolean"?null:"a boolean",DA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",d=B=>typeof B=="string"?null:"a string",WB=B=>B instanceof RegExp?null:"a RegExp object",CB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",KB=B=>typeof B=="function"?null:"a function",aB=B=>Array.isArray(B)?null:"an array",TB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",IA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",_A=B=>typeof B=="object"&&B!==null?null:"an array or an object",iA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",sA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",FA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",WA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",oA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,n){let p=B[k];if(A[k+""]=!0,p===void 0)return;let u=n(p);if(u!==null)throw new Error(`"${k}" must be ${u}`);return p}function oB(B,A,k){for(let n in B)if(!(n in A))throw new Error(`Invalid option ${k}: "${n}"`)}function UA(B){let A=Object.create(null),k=P(B,A,"wasmURL",d),n=P(B,A,"wasmModule",IA),p=P(B,A,"worker",$B);return oB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:n,worker:p}}function lA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let n=B[k];if(typeof n=="string"||n===!1)A[k]=n;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function UB(B,A,k,n,p){let u=P(A,k,"color",$B),e=P(A,k,"logLevel",d),c=P(A,k,"logLimit",CB);u!==void 0?B.push(`--color=${u}`):n&&B.push("--color=true"),B.push(`--log-level=${e||p}`),B.push(`--log-limit=${c||0}`)}function jA(B,A,k){let n=P(A,k,"legalComments",d),p=P(A,k,"sourceRoot",d),u=P(A,k,"sourcesContent",$B),e=P(A,k,"target",WA),c=P(A,k,"format",d),E=P(A,k,"globalName",d),x=P(A,k,"mangleProps",WB),N=P(A,k,"reserveProps",WB),H=P(A,k,"mangleQuoted",$B),l=P(A,k,"minify",$B),O=P(A,k,"minifySyntax",$B),z=P(A,k,"minifyWhitespace",$B),w=P(A,k,"minifyIdentifiers",$B),j=P(A,k,"drop",aB),o=P(A,k,"charset",d),m=P(A,k,"treeShaking",$B),v=P(A,k,"ignoreAnnotations",$B),C=P(A,k,"jsx",d),D=P(A,k,"jsxFactory",d),PB=P(A,k,"jsxFragment",d),$=P(A,k,"jsxImportSource",d),s=P(A,k,"jsxDev",$B),y=P(A,k,"define",TB),r=P(A,k,"logOverride",TB),a=P(A,k,"supported",TB),i=P(A,k,"pure",aB),Q=P(A,k,"keepNames",$B),G=P(A,k,"platform",d);if(n&&B.push(`--legal-comments=${n}`),p!==void 0&&B.push(`--source-root=${p}`),u!==void 0&&B.push(`--sources-content=${u}`),e&&(Array.isArray(e)?B.push(`--target=${Array.from(e).map(aA).join(",")}`):B.push(`--target=${aA(e)}`)),c&&B.push(`--format=${c}`),E&&B.push(`--global-name=${E}`),G&&B.push(`--platform=${G}`),l&&B.push("--minify"),O&&B.push("--minify-syntax"),z&&B.push("--minify-whitespace"),w&&B.push("--minify-identifiers"),o&&B.push(`--charset=${o}`),m!==void 0&&B.push(`--tree-shaking=${m}`),v&&B.push("--ignore-annotations"),j)for(let f of j)B.push(`--drop:${f}`);if(x&&B.push(`--mangle-props=${x.source}`),N&&B.push(`--reserve-props=${N.source}`),H!==void 0&&B.push(`--mangle-quoted=${H}`),C&&B.push(`--jsx=${C}`),D&&B.push(`--jsx-factory=${D}`),PB&&B.push(`--jsx-fragment=${PB}`),$&&B.push(`--jsx-import-source=${$}`),s&&B.push("--jsx-dev"),y)for(let f in y){if(f.indexOf("=")>=0)throw new Error(`Invalid define: ${f}`);B.push(`--define:${f}=${y[f]}`)}if(r)for(let f in r){if(f.indexOf("=")>=0)throw new Error(`Invalid log override: ${f}`);B.push(`--log-override:${f}=${r[f]}`)}if(a)for(let f in a){if(f.indexOf("=")>=0)throw new Error(`Invalid supported: ${f}`);B.push(`--supported:${f}=${a[f]}`)}if(i)for(let f of i)B.push(`--pure:${f}`);Q&&B.push("--keep-names")}function LA(B,A,k,n,p){var u;let e=[],c=[],E=Object.create(null),x=null,N=null,H=null;UB(e,A,E,k,n),jA(e,A,E);let l=P(A,E,"sourcemap",sA),O=P(A,E,"bundle",$B),z=P(A,E,"watch",DA),w=P(A,E,"splitting",$B),j=P(A,E,"preserveSymlinks",$B),o=P(A,E,"metafile",$B),m=P(A,E,"outfile",d),v=P(A,E,"outdir",d),C=P(A,E,"outbase",d),D=P(A,E,"tsconfig",d),PB=P(A,E,"resolveExtensions",aB),$=P(A,E,"nodePaths",aB),s=P(A,E,"mainFields",aB),y=P(A,E,"conditions",aB),r=P(A,E,"external",aB),a=P(A,E,"loader",TB),i=P(A,E,"outExtension",TB),Q=P(A,E,"publicPath",d),G=P(A,E,"entryNames",d),f=P(A,E,"chunkNames",d),U=P(A,E,"assetNames",d),_=P(A,E,"inject",aB),q=P(A,E,"banner",TB),L=P(A,E,"footer",TB),M=P(A,E,"entryPoints",_A),BB=P(A,E,"absWorkingDir",d),I=P(A,E,"stdin",TB),V=(u=P(A,E,"write",$B))!=null?u:p,eB=P(A,E,"allowOverwrite",$B),QB=P(A,E,"incremental",$B)===!0,F=P(A,E,"mangleCache",TB);if(E.plugins=!0,oB(A,E,`in ${B}() call`),l&&e.push(`--sourcemap${l===!0?"":`=${l}`}`),O&&e.push("--bundle"),eB&&e.push("--allow-overwrite"),z)if(e.push("--watch"),typeof z=="boolean")H={};else{let t=Object.create(null),X=P(z,t,"onRebuild",KB);oB(z,t,`on "watch" in ${B}() call`),H={onRebuild:X}}if(w&&e.push("--splitting"),j&&e.push("--preserve-symlinks"),o&&e.push("--metafile"),m&&e.push(`--outfile=${m}`),v&&e.push(`--outdir=${v}`),C&&e.push(`--outbase=${C}`),D&&e.push(`--tsconfig=${D}`),PB){let t=[];for(let X of PB){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${X}`);t.push(X)}e.push(`--resolve-extensions=${t.join(",")}`)}if(Q&&e.push(`--public-path=${Q}`),G&&e.push(`--entry-names=${G}`),f&&e.push(`--chunk-names=${f}`),U&&e.push(`--asset-names=${U}`),s){let t=[];for(let X of s){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid main field: ${X}`);t.push(X)}e.push(`--main-fields=${t.join(",")}`)}if(y){let t=[];for(let X of y){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid condition: ${X}`);t.push(X)}e.push(`--conditions=${t.join(",")}`)}if(r)for(let t of r)e.push(`--external:${t}`);if(q)for(let t in q){if(t.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${t}`);e.push(`--banner:${t}=${q[t]}`)}if(L)for(let t in L){if(t.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${t}`);e.push(`--footer:${t}=${L[t]}`)}if(_)for(let t of _)e.push(`--inject:${t}`);if(a)for(let t in a){if(t.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${t}`);e.push(`--loader:${t}=${a[t]}`)}if(i)for(let t in i){if(t.indexOf("=")>=0)throw new Error(`Invalid out extension: ${t}`);e.push(`--out-extension:${t}=${i[t]}`)}if(M)if(Array.isArray(M))for(let t of M)c.push(["",t+""]);else for(let[t,X]of Object.entries(M))c.push([t+"",X+""]);if(I){let t=Object.create(null),X=P(I,t,"contents",oA),kB=P(I,t,"resolveDir",d),nB=P(I,t,"sourcefile",d),b=P(I,t,"loader",d);oB(I,t,'in "stdin" object'),nB&&e.push(`--sourcefile=${nB}`),b&&e.push(`--loader=${b}`),kB&&(N=kB+""),typeof X=="string"?x=gB(X):X instanceof Uint8Array&&(x=X)}let S=[];if($)for(let t of $)t+="",S.push(t);return{entries:c,flags:e,write:V,stdinContents:x,stdinResolveDir:N,absWorkingDir:BB,incremental:QB,nodePaths:S,watch:H,mangleCache:lA(F)}}function NA(B,A,k,n){let p=[],u=Object.create(null);UB(p,A,u,k,n),jA(p,A,u);let e=P(A,u,"sourcemap",sA),c=P(A,u,"tsconfigRaw",FA),E=P(A,u,"sourcefile",d),x=P(A,u,"loader",d),N=P(A,u,"banner",d),H=P(A,u,"footer",d),l=P(A,u,"mangleCache",TB);return oB(A,u,`in ${B}() call`),e&&p.push(`--sourcemap=${e===!0?"external":e}`),c&&p.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),E&&p.push(`--sourcefile=${E}`),x&&p.push(`--loader=${x}`),N&&p.push(`--banner=${N}`),H&&p.push(`--footer=${H}`),{flags:p,mangleCache:lA(l)}}function GA(B){let A=new Map,k=new Map,n=new Map,p=new Map,u=null,e=0,c=0,E=new Uint8Array(16*1024),x=0,N=r=>{let a=x+r.length;if(a>E.length){let Q=new Uint8Array(a*2);Q.set(E),E=Q}E.set(r,x),x+=r.length;let i=0;for(;i+4<=x;){let Q=rA(E,i);if(i+4+Q>x)break;i+=4,j(E.subarray(i,i+Q)),i+=Q}i>0&&(E.copyWithin(0,i,x),x-=i)},H=r=>{u={reason:r?": "+(r.message||r):""};let a="The service was stopped"+u.reason;for(let i of A.values())i(a,null);A.clear();for(let i of p.values())i.onWait(a);p.clear();for(let i of n.values())try{i(new Error(a),null)}catch(Q){console.error(Q)}n.clear()},l=(r,a,i)=>{if(u)return i("The service is no longer running"+u.reason,null);let Q=e++;A.set(Q,(G,f)=>{try{i(G,f)}finally{r&&r.unref()}}),r&&r.ref(),B.writeToStdin(tA({id:Q,isRequest:!0,value:a}))},O=(r,a)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(tA({id:r,isRequest:!1,value:a}))},z=(r,a)=>MB(this,null,function*(){try{switch(a.command){case"ping":{O(r,{});break}case"on-start":{let i=k.get(a.key);i?O(r,yield i(a)):O(r,{});break}case"on-resolve":{let i=k.get(a.key);i?O(r,yield i(a)):O(r,{});break}case"on-load":{let i=k.get(a.key);i?O(r,yield i(a)):O(r,{});break}case"serve-request":{let i=p.get(a.key);i&&i.onRequest&&i.onRequest(a.args),O(r,{});break}case"serve-wait":{let i=p.get(a.key);i&&i.onWait(a.error),O(r,{});break}case"watch-rebuild":{let i=n.get(a.key);try{i&&i(null,a.args)}catch(Q){console.error(Q)}O(r,{});break}default:throw new Error("Invalid command: "+a.command)}}catch(i){O(r,{errors:[wB(i,B,null,void 0,"")]})}}),w=!0,j=r=>{if(w){w=!1;let i=String.fromCharCode(...r);if(i!=="0.15.7")throw new Error(`Cannot start service: Host version "0.15.7" does not match binary version ${JSON.stringify(i)}`);return}let a=RA(r);if(a.isRequest)z(a.id,a.value);else{let i=A.get(a.id);A.delete(a.id),a.value.error?i(a.value.error,{}):i(null,a.value)}},o=(r,a,i,Q,G)=>MB(this,null,function*(){let f=[],U=[],_={},q={},L=0,M=0,BB=[],I=!1;a=[...a];for(let F of a){let S={};if(typeof F!="object")throw new Error(`Plugin at index ${M} must be an object`);let t=P(F,S,"name",d);if(typeof t!="string"||t==="")throw new Error(`Plugin at index ${M} is missing a name`);try{let X=P(F,S,"setup",KB);if(typeof X!="function")throw new Error("Plugin is missing a setup function");oB(F,S,`on plugin ${JSON.stringify(t)}`);let kB={name:t,onResolve:[],onLoad:[]};M++;let b=X({initialOptions:r,resolve:(g,K={})=>{if(!I)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof g!="string")throw new Error("The path to resolve must be a string");let W=Object.create(null),jB=P(K,W,"pluginName",d),EB=P(K,W,"importer",d),iB=P(K,W,"namespace",d),cB=P(K,W,"resolveDir",d),pB=P(K,W,"kind",d),Y=P(K,W,"pluginData",FB);return oB(K,W,"in resolve() call"),new Promise((lB,uB)=>{let rB={command:"resolve",path:g,key:i,pluginName:t};jB!=null&&(rB.pluginName=jB),EB!=null&&(rB.importer=EB),iB!=null&&(rB.namespace=iB),cB!=null&&(rB.resolveDir=cB),pB!=null&&(rB.kind=pB),Y!=null&&(rB.pluginData=Q.store(Y)),l(G,rB,(SB,hB)=>{SB!==null?uB(new Error(SB)):lB({errors:fB(hB.errors,Q),warnings:fB(hB.warnings,Q),path:hB.path,external:hB.external,sideEffects:hB.sideEffects,namespace:hB.namespace,suffix:hB.suffix,pluginData:Q.load(hB.pluginData)})})})},onStart(g){let K='This error came from the "onStart" callback registered here:',W=LB(new Error(K),B,"onStart");f.push({name:t,callback:g,note:W})},onEnd(g){let K='This error came from the "onEnd" callback registered here:',W=LB(new Error(K),B,"onEnd");U.push({name:t,callback:g,note:W})},onResolve(g,K){let W='This error came from the "onResolve" callback registered here:',jB=LB(new Error(W),B,"onResolve"),EB={},iB=P(g,EB,"filter",WB),cB=P(g,EB,"namespace",d);if(oB(g,EB,`in onResolve() call for plugin ${JSON.stringify(t)}`),iB==null)throw new Error("onResolve() call is missing a filter");let pB=L++;_[pB]={name:t,callback:K,note:jB},kB.onResolve.push({id:pB,filter:iB.source,namespace:cB||""})},onLoad(g,K){let W='This error came from the "onLoad" callback registered here:',jB=LB(new Error(W),B,"onLoad"),EB={},iB=P(g,EB,"filter",WB),cB=P(g,EB,"namespace",d);if(oB(g,EB,`in onLoad() call for plugin ${JSON.stringify(t)}`),iB==null)throw new Error("onLoad() call is missing a filter");let pB=L++;q[pB]={name:t,callback:K,note:jB},kB.onLoad.push({id:pB,filter:iB.source,namespace:cB||""})},esbuild:B.esbuild});b&&(yield b),BB.push(kB)}catch(X){return{ok:!1,error:X,pluginName:t}}}let V=F=>MB(this,null,function*(){switch(F.command){case"on-start":{let S={errors:[],warnings:[]};return yield Promise.all(f.map(t=>MB(this,[t],function*({name:X,callback:kB,note:nB}){try{let b=yield kB();if(b!=null){if(typeof b!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(X)} to return an object`);let g={},K=P(b,g,"errors",aB),W=P(b,g,"warnings",aB);oB(b,g,`from onStart() callback in plugin ${JSON.stringify(X)}`),K!=null&&S.errors.push(...vB(K,"errors",Q,X)),W!=null&&S.warnings.push(...vB(W,"warnings",Q,X))}}catch(b){S.errors.push(wB(b,B,Q,nB&&nB(),X))}}))),S}case"on-resolve":{let S={},t="",X,kB;for(let nB of F.ids)try{({name:t,callback:X,note:kB}=_[nB]);let b=yield X({path:F.path,importer:F.importer,namespace:F.namespace,resolveDir:F.resolveDir,kind:F.kind,pluginData:Q.load(F.pluginData)});if(b!=null){if(typeof b!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(t)} to return an object`);let g={},K=P(b,g,"pluginName",d),W=P(b,g,"path",d),jB=P(b,g,"namespace",d),EB=P(b,g,"suffix",d),iB=P(b,g,"external",$B),cB=P(b,g,"sideEffects",$B),pB=P(b,g,"pluginData",FB),Y=P(b,g,"errors",aB),lB=P(b,g,"warnings",aB),uB=P(b,g,"watchFiles",aB),rB=P(b,g,"watchDirs",aB);oB(b,g,`from onResolve() callback in plugin ${JSON.stringify(t)}`),S.id=nB,K!=null&&(S.pluginName=K),W!=null&&(S.path=W),jB!=null&&(S.namespace=jB),EB!=null&&(S.suffix=EB),iB!=null&&(S.external=iB),cB!=null&&(S.sideEffects=cB),pB!=null&&(S.pluginData=Q.store(pB)),Y!=null&&(S.errors=vB(Y,"errors",Q,t)),lB!=null&&(S.warnings=vB(lB,"warnings",Q,t)),uB!=null&&(S.watchFiles=NB(uB,"watchFiles")),rB!=null&&(S.watchDirs=NB(rB,"watchDirs"));break}}catch(b){return{id:nB,errors:[wB(b,B,Q,kB&&kB(),t)]}}return S}case"on-load":{let S={},t="",X,kB;for(let nB of F.ids)try{({name:t,callback:X,note:kB}=q[nB]);let b=yield X({path:F.path,namespace:F.namespace,suffix:F.suffix,pluginData:Q.load(F.pluginData)});if(b!=null){if(typeof b!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(t)} to return an object`);let g={},K=P(b,g,"pluginName",d),W=P(b,g,"contents",oA),jB=P(b,g,"resolveDir",d),EB=P(b,g,"pluginData",FB),iB=P(b,g,"loader",d),cB=P(b,g,"errors",aB),pB=P(b,g,"warnings",aB),Y=P(b,g,"watchFiles",aB),lB=P(b,g,"watchDirs",aB);oB(b,g,`from onLoad() callback in plugin ${JSON.stringify(t)}`),S.id=nB,K!=null&&(S.pluginName=K),W instanceof Uint8Array?S.contents=W:W!=null&&(S.contents=gB(W)),jB!=null&&(S.resolveDir=jB),EB!=null&&(S.pluginData=Q.store(EB)),iB!=null&&(S.loader=iB),cB!=null&&(S.errors=vB(cB,"errors",Q,t)),pB!=null&&(S.warnings=vB(pB,"warnings",Q,t)),Y!=null&&(S.watchFiles=NB(Y,"watchFiles")),lB!=null&&(S.watchDirs=NB(lB,"watchDirs"));break}}catch(b){return{id:nB,errors:[wB(b,B,Q,kB&&kB(),t)]}}return S}default:throw new Error("Invalid command: "+F.command)}}),eB=(F,S,t)=>t();U.length>0&&(eB=(F,S,t)=>{(()=>MB(this,null,function*(){for(let{name:X,callback:kB,note:nB}of U)try{yield kB(F)}catch(b){F.errors.push(yield new Promise(g=>S(b,X,nB&&nB(),g)))}}))().then(t)}),I=!0;let QB=0;return{ok:!0,requestPlugins:BB,runOnEndCallbacks:eB,pluginRefs:{ref(){++QB===1&&k.set(i,V)},unref(){--QB===0&&k.delete(i)}}}}),m=(r,a,i,Q)=>{let G={},f=P(a,G,"port",CB),U=P(a,G,"host",d),_=P(a,G,"servedir",d),q=P(a,G,"onRequest",KB),L,M=new Promise((BB,I)=>{L=V=>{p.delete(Q),V!==null?I(new Error(V)):BB()}});return i.serve={},oB(a,G,"in serve() call"),f!==void 0&&(i.serve.port=f),U!==void 0&&(i.serve.host=U),_!==void 0&&(i.serve.servedir=_),p.set(Q,{onRequest:q,onWait:L}),{wait:M,stop(){l(r,{command:"serve-stop",key:Q},()=>{})}}},v="warning",C="silent",D=r=>{let a=c++,i=pA(),Q,{refs:G,options:f,isTTY:U,callback:_}=r;if(typeof f=="object"){let M=f.plugins;if(M!==void 0){if(!Array.isArray(M))throw new Error('"plugins" must be an array');Q=M}}let q=(M,BB,I,V)=>{let eB=[];try{UB(eB,f,{},U,v)}catch{}let QB=wB(M,B,i,I,BB);l(G,{command:"error",flags:eB,error:QB},()=>{QB.detail=i.load(QB.detail),V(QB)})},L=(M,BB)=>{q(M,BB,void 0,I=>{_(RB("Build failed",[I],[]),null)})};if(Q&&Q.length>0){if(B.isSync)return L(new Error("Cannot use plugins in synchronous API calls"),"");o(f,Q,a,i,G).then(M=>{if(!M.ok)L(M.error,M.pluginName);else try{PB(XB(sB({},r),{key:a,details:i,logPluginError:q,requestPlugins:M.requestPlugins,runOnEndCallbacks:M.runOnEndCallbacks,pluginRefs:M.pluginRefs}))}catch(BB){L(BB,"")}},M=>L(M,""))}else try{PB(XB(sB({},r),{key:a,details:i,logPluginError:q,requestPlugins:null,runOnEndCallbacks:(M,BB,I)=>I(),pluginRefs:null}))}catch(M){L(M,"")}},PB=({callName:r,refs:a,serveOptions:i,options:Q,isTTY:G,defaultWD:f,callback:U,key:_,details:q,logPluginError:L,requestPlugins:M,runOnEndCallbacks:BB,pluginRefs:I})=>{let V={ref(){I&&I.ref(),a&&a.ref()},unref(){I&&I.unref(),a&&a.unref()}},eB=!B.isWriteUnavailable,{entries:QB,flags:F,write:S,stdinContents:t,stdinResolveDir:X,absWorkingDir:kB,incremental:nB,nodePaths:b,watch:g,mangleCache:K}=LA(r,Q,G,v,eB),W={command:"build",key:_,entries:QB,flags:F,write:S,stdinContents:t,stdinResolveDir:X,absWorkingDir:kB||f,incremental:nB,nodePaths:b};M&&(W.plugins=M),K&&(W.mangleCache=K);let jB=i&&m(V,i,W,_),EB,iB,cB=(Y,lB)=>{Y.outputFiles&&(lB.outputFiles=Y.outputFiles.map(OA)),Y.metafile&&(lB.metafile=JSON.parse(Y.metafile)),Y.mangleCache&&(lB.mangleCache=Y.mangleCache),Y.writeToStdout!==void 0&&console.log(yB(Y.writeToStdout).replace(/\n$/,""))},pB=(Y,lB)=>{let uB={errors:fB(Y.errors,q),warnings:fB(Y.warnings,q)};cB(Y,uB),BB(uB,L,()=>{if(uB.errors.length>0)return lB(RB("Build failed",uB.errors,uB.warnings),null);if(Y.rebuild){if(!EB){let rB=!1;EB=()=>new Promise((SB,hB)=>{if(rB||u)throw new Error("Cannot rebuild");l(V,{command:"rebuild",key:_},(mB,E7)=>{if(mB)return lB(RB("Build failed",[{id:"",pluginName:"",text:mB,location:null,notes:[],detail:void 0}],[]),null);pB(E7,(ZB,t7)=>{ZB?hB(ZB):SB(t7)})})}),V.ref(),EB.dispose=()=>{rB||(rB=!0,l(V,{command:"rebuild-dispose",key:_},()=>{}),V.unref())}}uB.rebuild=EB}if(Y.watch){if(!iB){let rB=!1;V.ref(),iB=()=>{rB||(rB=!0,n.delete(_),l(V,{command:"watch-stop",key:_},()=>{}),V.unref())},g&&n.set(_,(SB,hB)=>{if(SB){g.onRebuild&&g.onRebuild(SB,null);return}let mB={errors:fB(hB.errors,q),warnings:fB(hB.warnings,q)};cB(hB,mB),BB(mB,L,()=>{if(mB.errors.length>0){g.onRebuild&&g.onRebuild(RB("Build failed",mB.errors,mB.warnings),null);return}hB.rebuildID!==void 0&&(mB.rebuild=EB),mB.stop=iB,g.onRebuild&&g.onRebuild(null,mB)})})}uB.stop=iB}lB(null,uB)})};if(S&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(nB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(g&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');l(V,W,(Y,lB)=>{if(Y)return U(new Error(Y),null);if(jB){let uB=lB,rB=!1;V.ref();let SB={port:uB.port,host:uB.host,wait:jB.wait,stop(){rB||(rB=!0,jB.stop(),V.unref())}};return V.ref(),jB.wait.then(V.unref,V.unref),U(null,SB)}return pB(lB,U)})};return{readFromStdout:N,afterClose:H,service:{buildOrServe:D,transform:({callName:r,refs:a,input:i,options:Q,isTTY:G,fs:f,callback:U})=>{let _=pA(),q=L=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:M,mangleCache:BB}=NA(r,Q,G,C),I={command:"transform",flags:M,inputFS:L!==null,input:L!==null?gB(L):typeof i=="string"?gB(i):i};BB&&(I.mangleCache=BB),l(a,I,(V,eB)=>{if(V)return U(new Error(V),null);let QB=fB(eB.errors,_),F=fB(eB.warnings,_),S=1,t=()=>{if(--S===0){let X={warnings:F,code:eB.code,map:eB.map};eB.mangleCache&&(X.mangleCache=eB?.mangleCache),U(null,X)}};if(QB.length>0)return U(RB("Transform failed",QB,F),null);eB.codeFS&&(S++,f.readFile(eB.code,(X,kB)=>{X!==null?U(X,null):(eB.code=kB,t())})),eB.mapFS&&(S++,f.readFile(eB.map,(X,kB)=>{X!==null?U(X,null):(eB.map=kB,t())})),t()})}catch(M){let BB=[];try{UB(BB,Q,{},G,C)}catch{}let I=wB(M,B,_,void 0,"");l(a,{command:"error",flags:BB,error:I},()=>{I.detail=_.load(I.detail),U(RB("Transform failed",[I],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let L=q;q=()=>f.writeFile(i,L)}q(null)},formatMessages:({callName:r,refs:a,messages:i,options:Q,callback:G})=>{let f=vB(i,"messages",null,"");if(!Q)throw new Error(`Missing second argument in ${r}() call`);let U={},_=P(Q,U,"kind",d),q=P(Q,U,"color",$B),L=P(Q,U,"terminalWidth",CB);if(oB(Q,U,`in ${r}() call`),_===void 0)throw new Error(`Missing "kind" in ${r}() call`);if(_!=="error"&&_!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${r}() call`);let M={command:"format-msgs",messages:f,isWarning:_==="warning"};q!==void 0&&(M.color=q),L!==void 0&&(M.terminalWidth=L),l(a,M,(BB,I)=>{if(BB)return G(new Error(BB),null);G(null,I.messages)})},analyzeMetafile:({callName:r,refs:a,metafile:i,options:Q,callback:G})=>{Q===void 0&&(Q={});let f={},U=P(Q,f,"color",$B),_=P(Q,f,"verbose",$B);oB(Q,f,`in ${r}() call`);let q={command:"analyze-metafile",metafile:i};U!==void 0&&(q.color=U),_!==void 0&&(q.verbose=_),l(a,q,(L,M)=>{if(L)return G(new Error(L),null);G(null,M.result)})}}}}function pA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let n=A++;return B.set(n,k),n}}}function LB(B,A,k){let n,p=!1;return()=>{if(p)return n;p=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let e=uA(A,u,k);if(e)return n={text:B.message,location:e},n}catch{}}}function wB(B,A,k,n,p){let u="Internal error",e=null;try{u=(B&&B.message||B)+""}catch{}try{e=uA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:p,text:u,location:e,notes:n?[n]:[],detail:k?k.store(B):-1}}function uA(B,A,k){let n="    at ";if(B.readFileSync&&!A[0].startsWith(n)&&A[1].startsWith(n))for(let p=1;p<A.length;p++){let u=A[p];if(!!u.startsWith(n))for(u=u.slice(n.length);;){let e=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(e){u=e[1];continue}if(e=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),e){u=e[1];continue}if(e=/^(\S+):(\d+):(\d+)$/.exec(u),e){let c;try{c=B.readFileSync(e[1],"utf8")}catch{break}let E=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+e[2]-1]||"",x=+e[3]-1,N=E.slice(x,x+k.length)===k?k.length:0;return{file:e[1],namespace:"file",line:+e[2],column:gB(E.slice(0,x)).length,length:gB(E.slice(x,x+N)).length,lineText:E+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function RB(B,A,k){let n=5,p=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,n+1).map((e,c)=>{if(c===n)return`
...`;if(!e.location)return`
error: ${e.text}`;let{file:E,line:x,column:N}=e.location,H=e.pluginName?`[plugin: ${e.pluginName}] `:"";return`
${E}:${x}:${N}: ERROR: ${H}${e.text}`}).join(""),u=new Error(`${B}${p}`);return u.errors=A,u.warnings=k,u}function fB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function cA(B,A){if(B==null)return null;let k={},n=P(B,k,"file",d),p=P(B,k,"namespace",d),u=P(B,k,"line",CB),e=P(B,k,"column",CB),c=P(B,k,"length",CB),E=P(B,k,"lineText",d),x=P(B,k,"suggestion",d);return oB(B,k,A),{file:n||"",namespace:p||"",line:u||0,column:e||0,length:c||0,lineText:E||"",suggestion:x||""}}function vB(B,A,k,n){let p=[],u=0;for(let e of B){let c={},E=P(e,c,"id",d),x=P(e,c,"pluginName",d),N=P(e,c,"text",d),H=P(e,c,"location",iA),l=P(e,c,"notes",aB),O=P(e,c,"detail",FB),z=`in element ${u} of "${A}"`;oB(e,c,z);let w=[];if(l)for(let j of l){let o={},m=P(j,o,"text",d),v=P(j,o,"location",iA);oB(j,o,z),w.push({text:m||"",location:cA(v,z)})}p.push({id:E||"",pluginName:x||n,text:N||"",location:cA(H,z),notes:w,detail:k?k.store(O):-1}),u++}return p}function NB(B,A){let k=[];for(let n of B){if(typeof n!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(n)}return k}function OA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){let n=this.contents;return(k===null||n!==A)&&(A=n,k=yB(n)),k}}}var qA="0.15.7",JA=B=>GB().build(B),VA=()=>{throw new Error('The "serve" API only works in node')},KA=(B,A)=>GB().transform(B,A),YA=(B,A)=>GB().formatMessages(B,A),ZA=(B,A)=>GB().analyzeMetafile(B,A),zA=()=>{throw new Error('The "buildSync" API only works in node')},B7=()=>{throw new Error('The "transformSync" API only works in node')},A7=()=>{throw new Error('The "formatMessagesSync" API only works in node')},$7=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},DB,YB,GB=()=>{if(YB)return YB;throw DB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},k7=B=>{B=UA(B||{});let A=B.wasmURL,k=B.wasmModule,n=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(DB)throw new Error('Cannot call "initialize" more than once');return DB=P7(A||"",k,n),DB.catch(()=>{DB=void 0}),DB},P7=(B,A,k)=>MB(void 0,null,function*(){let n;if(A)n=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);n=yield c.arrayBuffer()}let p;if(k){let c=new Blob([`onmessage=((postMessage) => {
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
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                  ));
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
        go.argv = ["", \`--service=\${"0.15.7"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});p=new Worker(URL.createObjectURL(c))}else{let c=(E=>{var x=(l,O,z)=>new Promise((w,j)=>{var o=C=>{try{v(z.next(C))}catch(D){j(D)}},m=C=>{try{v(z.throw(C))}catch(D){j(D)}},v=C=>C.done?w(C.value):Promise.resolve(C.value).then(o,m);v((z=z.apply(l,O)).next())});let N,H={};for(let l=self;l;l=Object.getPrototypeOf(l))for(let O of Object.getOwnPropertyNames(l))O in H||Object.defineProperty(H,O,{get:()=>self[O]});return(()=>{let l=()=>{let w=new Error("not implemented");return w.code="ENOSYS",w};if(!H.fs){let w="";H.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(j,o){w+=z.decode(o);let m=w.lastIndexOf(`
`);return m!=-1&&(console.log(w.substr(0,m)),w=w.substr(m+1)),o.length},write(j,o,m,v,C,D){if(m!==0||v!==o.length||C!==null){D(l());return}let PB=this.writeSync(j,o);D(null,PB)},chmod(j,o,m){m(l())},chown(j,o,m,v){v(l())},close(j,o){o(l())},fchmod(j,o,m){m(l())},fchown(j,o,m,v){v(l())},fstat(j,o){o(l())},fsync(j,o){o(null)},ftruncate(j,o,m){m(l())},lchown(j,o,m,v){v(l())},link(j,o,m){m(l())},lstat(j,o){o(l())},mkdir(j,o,m){m(l())},open(j,o,m,v){v(l())},read(j,o,m,v,C,D){D(l())},readdir(j,o){o(l())},readlink(j,o){o(l())},rename(j,o,m){m(l())},rmdir(j,o){o(l())},stat(j,o){o(l())},symlink(j,o,m){m(l())},truncate(j,o,m){m(l())},unlink(j,o){o(l())},utimes(j,o,m,v){v(l())}}}if(H.process||(H.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw l()},pid:-1,ppid:-1,umask(){throw l()},cwd(){throw l()},chdir(){throw l()}}),!H.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!H.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!H.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!H.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let O=new TextEncoder("utf-8"),z=new TextDecoder("utf-8");H.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let w=($,s)=>{this.mem.setUint32($+0,s,!0),this.mem.setUint32($+4,Math.floor(s/4294967296),!0)},j=$=>{let s=this.mem.getUint32($+0,!0),y=this.mem.getInt32($+4,!0);return s+y*4294967296},o=$=>{let s=this.mem.getFloat64($,!0);if(s===0)return;if(!isNaN(s))return s;let y=this.mem.getUint32($,!0);return this._values[y]},m=($,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,s,!0);return}if(s===void 0){this.mem.setFloat64($,0,!0);return}let r=this._ids.get(s);r===void 0&&(r=this._idPool.pop(),r===void 0&&(r=this._values.length),this._values[r]=s,this._goRefCounts[r]=0,this._ids.set(s,r)),this._goRefCounts[r]++;let a=0;switch(typeof s){case"object":s!==null&&(a=1);break;case"string":a=2;break;case"symbol":a=3;break;case"function":a=4;break}this.mem.setUint32($+4,2146959360|a,!0),this.mem.setUint32($,r,!0)},v=$=>{let s=j($+0),y=j($+8);return new Uint8Array(this._inst.exports.mem.buffer,s,y)},C=$=>{let s=j($+0),y=j($+8),r=new Array(y);for(let a=0;a<y;a++)r[a]=o(s+a*8);return r},D=$=>{let s=j($+0),y=j($+8);return z.decode(new DataView(this._inst.exports.mem.buffer,s,y))},PB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":$=>{$>>>=0;let s=j($+8),y=j($+16),r=this.mem.getInt32($+24,!0);H.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,y,r))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,w($+8,(PB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let s=new Date().getTime();w($+8,s/1e3),this.mem.setInt32($+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},j($+8)+1)),this.mem.setInt32($+16,s,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(v($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let s=this.mem.getUint32($+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){let y=this._values[s];this._values[s]=null,this._ids.delete(y),this._idPool.push(s)}},"syscall/js.stringVal":$=>{$>>>=0,m($+24,D($+8))},"syscall/js.valueGet":$=>{$>>>=0;let s=Reflect.get(o($+8),D($+16));$=this._inst.exports.getsp()>>>0,m($+32,s)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(o($+8),D($+16),o($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(o($+8),D($+16))},"syscall/js.valueIndex":$=>{$>>>=0,m($+24,Reflect.get(o($+8),j($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(o($+8),j($+16),o($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let s=o($+8),y=Reflect.get(s,D($+16)),r=C($+32),a=Reflect.apply(y,s,r);$=this._inst.exports.getsp()>>>0,m($+56,a),this.mem.setUint8($+64,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+56,s),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let s=o($+8),y=C($+16),r=Reflect.apply(s,void 0,y);$=this._inst.exports.getsp()>>>0,m($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let s=o($+8),y=C($+16),r=Reflect.construct(s,y);$=this._inst.exports.getsp()>>>0,m($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,w($+16,parseInt(o($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let s=O.encode(String(o($+8)));m($+16,s),w($+24,s.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let s=o($+8);v($+16).set(s)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,o($+8)instanceof o($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let s=v($+8),y=o($+32);if(!(y instanceof Uint8Array||y instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=y.subarray(0,s.length);s.set(r),w($+40,r.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let s=o($+8),y=v($+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=y.subarray(0,s.length);s.set(r),w($+40,r.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(w){return x(this,null,function*(){if(!(w instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=w,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,H,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[H,5],[this,6]]),this._idPool=[],this.exited=!1;let j=4096,o=$=>{let s=j,y=O.encode($+"\0");return new Uint8Array(this.mem.buffer,j,y.length).set(y),j+=y.length,j%8!==0&&(j+=8-j%8),s},m=this.argv.length,v=[];this.argv.forEach($=>{v.push(o($))}),v.push(0),Object.keys(this.env).sort().forEach($=>{v.push(o(`${$}=${this.env[$]}`))}),v.push(0);let D=j;v.forEach($=>{this.mem.setUint32(j,$,!0),this.mem.setUint32(j+4,0,!0),j+=8});let PB=4096+8192;if(j>=PB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(m,D),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(w){let j=this;return function(){let o={id:w,this:this,args:arguments};return j._pendingEvent=o,j._resume(),o.result}}}})(),N=({data:l})=>{let O=new TextDecoder,z=H.fs,w="";z.writeSync=(C,D)=>{if(C===1)E(D);else if(C===2){w+=O.decode(D);let PB=w.split(`
`);PB.length>1&&console.log(PB.slice(0,-1).join(`
`)),w=PB[PB.length-1]}else throw new Error("Bad write");return D.length};let j=[],o,m=0;N=({data:C})=>{C.length>0&&(j.push(C),o&&o())},z.read=(C,D,PB,$,s,y)=>{if(C!==0||PB!==0||$!==D.length||s!==null)throw new Error("Bad read");if(j.length===0){o=()=>z.read(C,D,PB,$,s,y);return}let r=j[0],a=Math.max(0,Math.min($,r.length-m));D.set(r.subarray(m,m+a),PB),m+=a,m===r.length&&(j.shift(),m=0),y(null,a)};let v=new H.Go;v.argv=["","--service=0.15.7"],l instanceof WebAssembly.Module?WebAssembly.instantiate(l,v.importObject).then(C=>v.run(C)):WebAssembly.instantiate(l,v.importObject).then(({instance:C})=>v.run(C))},l=>N(l)})(E=>p.onmessage({data:E}));p={onmessage:null,postMessage:E=>setTimeout(()=>c({data:E})),terminate(){}}}p.postMessage(n),p.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:e}=GA({writeToStdin(c){p.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:_B});YB={build:c=>new Promise((E,x)=>e.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(N,H)=>N?x(N):E(H)})),transform:(c,E)=>new Promise((x,N)=>e.transform({callName:"transform",refs:null,input:c,options:E||{},isTTY:!1,fs:{readFile(H,l){l(new Error("Internal error"),null)},writeFile(H,l){l(null)}},callback:(H,l)=>H?N(H):x(l)})),formatMessages:(c,E)=>new Promise((x,N)=>e.formatMessages({callName:"formatMessages",refs:null,messages:c,options:E,callback:(H,l)=>H?N(H):x(l)})),analyzeMetafile:(c,E)=>new Promise((x,N)=>e.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:E,callback:(H,l)=>H?N(H):x(l)}))}}),e7=_B})(typeof eA=="object"?eA:{set exports(AB){(typeof self<"u"?self:this).esbuild=AB}})});bB();bB();AA();AA();AA();var kA=zB(XA(),1),SA=document.createElement("div"),r7=hA(SA),$A={},a7=({md5Hash:AB,children:h})=>{let[T,J]=mA({res:null});return $A[AB]=new Promise(R=>J({res:R})),QA(()=>{T.res&&T.res(!0)},[T]),(0,kA.jsx)("div",{id:AB,children:h})},HA=async(AB,h)=>{let T=h+gA(AB).slice(0,14),J=await TA(AB);if(r7.render((0,kA.jsx)(a7,{md5Hash:T,children:(0,kA.jsx)(J,{})},T)),await new Promise(tB=>dA(tB,!0)),!$A[T]||!await $A[T])return null;let R=SA.querySelector(`#${T}`)?.innerHTML,Z=R?i7(R):null;return R&&Z?{html:R,css:Z}:null},i7=AB=>{try{let h={};for(let T in document.styleSheets){let J=document.styleSheets[T];J?.cssRules&&Array.from(J.cssRules).forEach(R=>{if(R&&R.cssText&&R.cssText.slice(0,5)===".css-"){let Z=R.cssText.slice(1,11),tB=R.selectorText||Z;!h[Z]&&AB.includes(Z)&&!R.cssText.slice(10).includes(".css-")&&(h[tB]=R.cssText)}})}return Object.keys(h).map(T=>h[T]).join(" ")}catch{return console.error("no css"),""}};bB();bB();var d7=new Error("timeout while waiting for mutex to become available"),X7=new Error("mutex already locked"),s7=new Error("request for lock canceled"),o7=function(AB,h,T,J){function R(Z){return Z instanceof T?Z:new T(function(tB){tB(Z)})}return new(T||(T=Promise))(function(Z,tB){function HB(sB){try{dB(J.next(sB))}catch(XB){tB(XB)}}function xB(sB){try{dB(J.throw(sB))}catch(XB){tB(XB)}}function dB(sB){sB.done?Z(sB.value):R(sB.value).then(HB,xB)}dB((J=J.apply(AB,h||[])).next())})},PA=class{constructor(h,T=s7){this._value=h,this._cancelError=T,this._weightedQueues=[],this._weightedWaiters=[]}acquire(h=1){if(h<=0)throw new Error(`invalid weight ${h}: must be positive`);return new Promise((T,J)=>{this._weightedQueues[h-1]||(this._weightedQueues[h-1]=[]),this._weightedQueues[h-1].push({resolve:T,reject:J}),this._dispatch()})}runExclusive(h,T=1){return o7(this,void 0,void 0,function*(){let[J,R]=yield this.acquire(T);try{return yield h(J)}finally{R()}})}waitForUnlock(h=1){if(h<=0)throw new Error(`invalid weight ${h}: must be positive`);return new Promise(T=>{this._weightedWaiters[h-1]||(this._weightedWaiters[h-1]=[]),this._weightedWaiters[h-1].push(T),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(h){this._value=h,this._dispatch()}release(h=1){if(h<=0)throw new Error(`invalid weight ${h}: must be positive`);this._value+=h,this._dispatch()}cancel(){this._weightedQueues.forEach(h=>h.forEach(T=>T.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var h;for(let T=this._value;T>0;T--){let J=(h=this._weightedQueues[T-1])===null||h===void 0?void 0:h.shift();if(!J)continue;let R=this._value,Z=T;this._value-=T,T=this._value+1,J.resolve([R,this._newReleaser(Z)])}this._drainUnlockWaiters()}_newReleaser(h){let T=!1;return()=>{T||(T=!0,this.release(h))}}_drainUnlockWaiters(){for(let h=this._value;h>0;h--)!this._weightedWaiters[h-1]||(this._weightedWaiters[h-1].forEach(T=>T()),this._weightedWaiters[h-1]=[])}},l7=function(AB,h,T,J){function R(Z){return Z instanceof T?Z:new T(function(tB){tB(Z)})}return new(T||(T=Promise))(function(Z,tB){function HB(sB){try{dB(J.next(sB))}catch(XB){tB(XB)}}function xB(sB){try{dB(J.throw(sB))}catch(XB){tB(XB)}}function dB(sB){sB.done?Z(sB.value):R(sB.value).then(HB,xB)}dB((J=J.apply(AB,h||[])).next())})},qB=class{constructor(h){this._semaphore=new PA(1,h)}acquire(){return l7(this,void 0,void 0,function*(){let[,h]=yield this._semaphore.acquire();return h})}runExclusive(h){return this._semaphore.runExclusive(()=>h())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var JB=zB(fA(),1);var xA="./chunk-esbuild-ZTDJQG3V.wasm";var IB=!1,EA={transform:new qB().runExclusive(()=>JB.transform)},vA=async()=>{try{if(IB===!0||(IB=IB||new Promise(AB=>{(0,JB.initialize)({wasmURL:new URL(xA,import.meta.url).toString()}).then(()=>AB(!0))}),await IB===!0))return EA;throw new Error("esbuild couldn't initialize")}catch{throw new Error("esbuild couldn't initialize")}finally{if(await IB===!0)return EA;throw new Error("esbuild couldn't initialize")}};var MA={i:0,esbuild:vA()};async function R7({code:AB,counter:h,codeSpace:T}){let J={transform:await(await MA.esbuild).transform};if(MA.i=h,AB!==BA().code)try{let R=await J.transform(AB,{loader:"tsx",format:"esm",treeShaking:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",jsxImportSource:"@emotion/react"}},module:"es2022",target:"es2021"});if(R.code===BA().transpiled)return;let Z=!1;if(R.code.length>0)try{let tB=await HA(R.code,T);if(tB===null){console.error("COULD NOT RENDER:"),console.error({code:AB,transpiled:R.code});return}let{html:HB,css:xB}=tB;await bA({code:AB,transpiled:R.code,i:h,html:HB,css:xB});return}catch(tB){console.error("EXCEPTION"),console.error(tB),Z=!0,console.error({restartError:Z});return}}catch(R){console.error({error:R})}}export{R7 as runner};
