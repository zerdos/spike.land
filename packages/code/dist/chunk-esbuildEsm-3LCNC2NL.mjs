import{b as OA,d as qA,f as RB}from"./chunk-chunk-FCQ733RZ.mjs";var jA=OA((A7,BA)=>{RB();(pB=>{"use strict";var C=Object.defineProperty,O=Object.defineProperties,oB=Object.getOwnPropertyDescriptor,SB=Object.getOwnPropertyDescriptors,cB=Object.getOwnPropertyNames,hB=Object.getOwnPropertySymbols,fB=Object.prototype.hasOwnProperty,DB=Object.prototype.propertyIsEnumerable,mB=(B,A,k)=>A in B?C(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,tB=(B,A)=>{for(var k in A||(A={}))fB.call(A,k)&&mB(B,k,A[k]);if(hB)for(var k of hB(A))DB.call(A,k)&&mB(B,k,A[k]);return B},dB=(B,A)=>O(B,SB(A)),uA=(B,A)=>{for(var k in A)C(B,k,{get:A[k],enumerable:!0})},cA=(B,A,k,n)=>{if(A&&typeof A=="object"||typeof A=="function")for(let p of cB(A))!fB.call(B,p)&&p!==k&&C(B,p,{get:()=>A[p],enumerable:!(n=oB(A,p))||n.enumerable});return B},hA=B=>cA(C({},"__esModule",{value:!0}),B),xB=(B,A,k)=>new Promise((n,p)=>{var u=E=>{try{c(k.next(E))}catch(b){p(b)}},e=E=>{try{c(k.throw(E))}catch(b){p(b)}},c=E=>E.done?n(E.value):Promise.resolve(E.value).then(u,e);c((k=k.apply(B,A)).next())}),IB={};uA(IB,{analyzeMetafile:()=>RA,analyzeMetafileSync:()=>FA,build:()=>MA,buildSync:()=>DA,default:()=>UA,formatMessages:()=>wA,formatMessagesSync:()=>IA,initialize:()=>LA,serve:()=>yA,transform:()=>CA,transformSync:()=>_A,version:()=>vA}),pB.exports=hA(IB);function AA(B){let A=n=>{if(n===null)k.write8(0);else if(typeof n=="boolean")k.write8(1),k.write8(+n);else if(typeof n=="number")k.write8(2),k.write32(n|0);else if(typeof n=="string")k.write8(3),k.write(TB(n));else if(n instanceof Uint8Array)k.write8(4),k.write(n);else if(n instanceof Array){k.write8(5),k.write32(n.length);for(let p of n)A(p)}else{let p=Object.keys(n);k.write8(6),k.write32(p.length);for(let u of p)k.write(TB(u)),A(n[u])}},k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),VB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function QA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return vB(k.read());case 4:return k.read();case 5:{let e=k.read32(),c=[];for(let E=0;E<e;E++)c.push(A());return c}case 6:{let e=k.read32(),c={};for(let E=0;E<e;E++)c[vB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new $A(B),n=k.read32(),p=(n&1)===0;n>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:n,isRequest:p,value:u}}var $A=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);VB(this.buf,B,A)}write(B){let A=this._write(4+B.length);VB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},TB,vB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;TB=k=>B.encode(k),vB=k=>A.decode(k)}else if(typeof Buffer<"u")TB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},vB=B=>{let{buffer:A,byteOffset:k,byteLength:n}=B;return Buffer.from(A,k,n).toString()};else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function VB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var FB=()=>null,Z=B=>typeof B=="boolean"?null:"a boolean",mA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",m=B=>typeof B=="string"?null:"a string",LB=B=>B instanceof RegExp?null:"a RegExp object",MB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",KB=B=>typeof B=="function"?null:"a function",eB=B=>Array.isArray(B)?null:"an array",gB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",dA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",TA=B=>typeof B=="object"&&B!==null?null:"an array or an object",eA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",EA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",gA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",XA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",tA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,n){let p=B[k];if(A[k+""]=!0,p===void 0)return;let u=n(p);if(u!==null)throw new Error(`"${k}" must be ${u}`);return p}function nB(B,A,k){for(let n in B)if(!(n in A))throw new Error(`Invalid option ${k}: "${n}"`)}function HA(B){let A=Object.create(null),k=P(B,A,"wasmURL",m),n=P(B,A,"wasmModule",dA),p=P(B,A,"worker",Z);return nB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:n,worker:p}}function nA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let n=B[k];if(typeof n=="string"||n===!1)A[k]=n;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function WB(B,A,k,n,p){let u=P(A,k,"color",Z),e=P(A,k,"logLevel",m),c=P(A,k,"logLimit",MB);u!==void 0?B.push(`--color=${u}`):n&&B.push("--color=true"),B.push(`--log-level=${e||p}`),B.push(`--log-limit=${c||0}`)}function rA(B,A,k){let n=P(A,k,"legalComments",m),p=P(A,k,"sourceRoot",m),u=P(A,k,"sourcesContent",Z),e=P(A,k,"target",XA),c=P(A,k,"format",m),E=P(A,k,"globalName",m),b=P(A,k,"mangleProps",LB),W=P(A,k,"reserveProps",LB),H=P(A,k,"mangleQuoted",Z),l=P(A,k,"minify",Z),N=P(A,k,"minifySyntax",Z),K=P(A,k,"minifyWhitespace",Z),y=P(A,k,"minifyIdentifiers",Z),j=P(A,k,"drop",eB),o=P(A,k,"charset",m),Q=P(A,k,"treeShaking",Z),f=P(A,k,"ignoreAnnotations",Z),M=P(A,k,"jsx",m),w=P(A,k,"jsxFactory",m),BB=P(A,k,"jsxFragment",m),$=P(A,k,"jsxImportSource",m),s=P(A,k,"jsxDev",Z),v=P(A,k,"define",gB),r=P(A,k,"logOverride",gB),a=P(A,k,"supported",gB),i=P(A,k,"pure",eB),h=P(A,k,"keepNames",Z),U=P(A,k,"platform",m);if(n&&B.push(`--legal-comments=${n}`),p!==void 0&&B.push(`--source-root=${p}`),u!==void 0&&B.push(`--sources-content=${u}`),e&&(Array.isArray(e)?B.push(`--target=${Array.from(e).map(PA).join(",")}`):B.push(`--target=${PA(e)}`)),c&&B.push(`--format=${c}`),E&&B.push(`--global-name=${E}`),U&&B.push(`--platform=${U}`),l&&B.push("--minify"),N&&B.push("--minify-syntax"),K&&B.push("--minify-whitespace"),y&&B.push("--minify-identifiers"),o&&B.push(`--charset=${o}`),Q!==void 0&&B.push(`--tree-shaking=${Q}`),f&&B.push("--ignore-annotations"),j)for(let S of j)B.push(`--drop:${S}`);if(b&&B.push(`--mangle-props=${b.source}`),W&&B.push(`--reserve-props=${W.source}`),H!==void 0&&B.push(`--mangle-quoted=${H}`),M&&B.push(`--jsx=${M}`),w&&B.push(`--jsx-factory=${w}`),BB&&B.push(`--jsx-fragment=${BB}`),$&&B.push(`--jsx-import-source=${$}`),s&&B.push("--jsx-dev"),v)for(let S in v){if(S.indexOf("=")>=0)throw new Error(`Invalid define: ${S}`);B.push(`--define:${S}=${v[S]}`)}if(r)for(let S in r){if(S.indexOf("=")>=0)throw new Error(`Invalid log override: ${S}`);B.push(`--log-override:${S}=${r[S]}`)}if(a)for(let S in a){if(S.indexOf("=")>=0)throw new Error(`Invalid supported: ${S}`);B.push(`--supported:${S}=${a[S]}`)}if(i)for(let S of i)B.push(`--pure:${S}`);h&&B.push("--keep-names")}function SA(B,A,k,n,p){var u;let e=[],c=[],E=Object.create(null),b=null,W=null,H=null;WB(e,A,E,k,n),rA(e,A,E);let l=P(A,E,"sourcemap",EA),N=P(A,E,"bundle",Z),K=P(A,E,"watch",mA),y=P(A,E,"splitting",Z),j=P(A,E,"preserveSymlinks",Z),o=P(A,E,"metafile",Z),Q=P(A,E,"outfile",m),f=P(A,E,"outdir",m),M=P(A,E,"outbase",m),w=P(A,E,"tsconfig",m),BB=P(A,E,"resolveExtensions",eB),$=P(A,E,"nodePaths",eB),s=P(A,E,"mainFields",eB),v=P(A,E,"conditions",eB),r=P(A,E,"external",eB),a=P(A,E,"loader",gB),i=P(A,E,"outExtension",gB),h=P(A,E,"publicPath",m),U=P(A,E,"entryNames",m),S=P(A,E,"chunkNames",m),F=P(A,E,"assetNames",m),D=P(A,E,"inject",eB),G=P(A,E,"banner",gB),L=P(A,E,"footer",gB),x=P(A,E,"entryPoints",TA),Y=P(A,E,"absWorkingDir",m),R=P(A,E,"stdin",gB),q=(u=P(A,E,"write",Z))!=null?u:p,AB=P(A,E,"allowOverwrite",Z),uB=P(A,E,"incremental",Z)===!0,_=P(A,E,"mangleCache",gB);if(E.plugins=!0,nB(A,E,`in ${B}() call`),l&&e.push(`--sourcemap${l===!0?"":`=${l}`}`),N&&e.push("--bundle"),AB&&e.push("--allow-overwrite"),K)if(e.push("--watch"),typeof K=="boolean")H={};else{let t=Object.create(null),d=P(K,t,"onRebuild",KB);nB(K,t,`on "watch" in ${B}() call`),H={onRebuild:d}}if(y&&e.push("--splitting"),j&&e.push("--preserve-symlinks"),o&&e.push("--metafile"),Q&&e.push(`--outfile=${Q}`),f&&e.push(`--outdir=${f}`),M&&e.push(`--outbase=${M}`),w&&e.push(`--tsconfig=${w}`),BB){let t=[];for(let d of BB){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${d}`);t.push(d)}e.push(`--resolve-extensions=${t.join(",")}`)}if(h&&e.push(`--public-path=${h}`),U&&e.push(`--entry-names=${U}`),S&&e.push(`--chunk-names=${S}`),F&&e.push(`--asset-names=${F}`),s){let t=[];for(let d of s){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid main field: ${d}`);t.push(d)}e.push(`--main-fields=${t.join(",")}`)}if(v){let t=[];for(let d of v){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid condition: ${d}`);t.push(d)}e.push(`--conditions=${t.join(",")}`)}if(r)for(let t of r)e.push(`--external:${t}`);if(G)for(let t in G){if(t.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${t}`);e.push(`--banner:${t}=${G[t]}`)}if(L)for(let t in L){if(t.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${t}`);e.push(`--footer:${t}=${L[t]}`)}if(D)for(let t of D)e.push(`--inject:${t}`);if(a)for(let t in a){if(t.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${t}`);e.push(`--loader:${t}=${a[t]}`)}if(i)for(let t in i){if(t.indexOf("=")>=0)throw new Error(`Invalid out extension: ${t}`);e.push(`--out-extension:${t}=${i[t]}`)}if(x)if(Array.isArray(x))for(let t of x)c.push(["",t+""]);else for(let[t,d]of Object.entries(x))c.push([t+"",d+""]);if(R){let t=Object.create(null),d=P(R,t,"contents",tA),z=P(R,t,"resolveDir",m),kB=P(R,t,"sourcefile",m),g=P(R,t,"loader",m);nB(R,t,'in "stdin" object'),kB&&e.push(`--sourcefile=${kB}`),g&&e.push(`--loader=${g}`),z&&(W=z+""),typeof d=="string"?b=TB(d):d instanceof Uint8Array&&(b=d)}let X=[];if($)for(let t of $)t+="",X.push(t);return{entries:c,flags:e,write:q,stdinContents:b,stdinResolveDir:W,absWorkingDir:Y,incremental:uB,nodePaths:X,watch:H,mangleCache:nA(_)}}function bA(B,A,k,n){let p=[],u=Object.create(null);WB(p,A,u,k,n),rA(p,A,u);let e=P(A,u,"sourcemap",EA),c=P(A,u,"tsconfigRaw",gA),E=P(A,u,"sourcefile",m),b=P(A,u,"loader",m),W=P(A,u,"banner",m),H=P(A,u,"footer",m),l=P(A,u,"mangleCache",gB);return nB(A,u,`in ${B}() call`),e&&p.push(`--sourcemap=${e===!0?"external":e}`),c&&p.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),E&&p.push(`--sourcefile=${E}`),b&&p.push(`--loader=${b}`),W&&p.push(`--banner=${W}`),H&&p.push(`--footer=${H}`),{flags:p,mangleCache:nA(l)}}function fA(B){let A=new Map,k=new Map,n=new Map,p=new Map,u=null,e=0,c=0,E=new Uint8Array(16*1024),b=0,W=r=>{let a=b+r.length;if(a>E.length){let h=new Uint8Array(a*2);h.set(E),E=h}E.set(r,b),b+=r.length;let i=0;for(;i+4<=b;){let h=kA(E,i);if(i+4+h>b)break;i+=4,j(E.subarray(i,i+h)),i+=h}i>0&&(E.copyWithin(0,i,b),b-=i)},H=r=>{u={reason:r?": "+(r.message||r):""};let a="The service was stopped"+u.reason;for(let i of A.values())i(a,null);A.clear();for(let i of p.values())i.onWait(a);p.clear();for(let i of n.values())try{i(new Error(a),null)}catch(h){console.error(h)}n.clear()},l=(r,a,i)=>{if(u)return i("The service is no longer running"+u.reason,null);let h=e++;A.set(h,(U,S)=>{try{i(U,S)}finally{r&&r.unref()}}),r&&r.ref(),B.writeToStdin(AA({id:h,isRequest:!0,value:a}))},N=(r,a)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(AA({id:r,isRequest:!1,value:a}))},K=(r,a)=>xB(this,null,function*(){try{switch(a.command){case"ping":{N(r,{});break}case"on-start":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"on-resolve":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"on-load":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"serve-request":{let i=p.get(a.key);i&&i.onRequest&&i.onRequest(a.args),N(r,{});break}case"serve-wait":{let i=p.get(a.key);i&&i.onWait(a.error),N(r,{});break}case"watch-rebuild":{let i=n.get(a.key);try{i&&i(null,a.args)}catch(h){console.error(h)}N(r,{});break}default:throw new Error("Invalid command: "+a.command)}}catch(i){N(r,{errors:[yB(i,B,null,void 0,"")]})}}),y=!0,j=r=>{if(y){y=!1;let i=String.fromCharCode(...r);if(i!=="0.15.5")throw new Error(`Cannot start service: Host version "0.15.5" does not match binary version ${JSON.stringify(i)}`);return}let a=QA(r);if(a.isRequest)K(a.id,a.value);else{let i=A.get(a.id);A.delete(a.id),a.value.error?i(a.value.error,{}):i(null,a.value)}},o=(r,a,i,h,U)=>xB(this,null,function*(){let S=[],F=[],D={},G={},L=0,x=0,Y=[],R=!1;a=[...a];for(let _ of a){let X={};if(typeof _!="object")throw new Error(`Plugin at index ${x} must be an object`);let t=P(_,X,"name",m);if(typeof t!="string"||t==="")throw new Error(`Plugin at index ${x} is missing a name`);try{let d=P(_,X,"setup",KB);if(typeof d!="function")throw new Error("Plugin is missing a setup function");nB(_,X,`on plugin ${JSON.stringify(t)}`);let z={name:t,onResolve:[],onLoad:[]};x++;let g=d({initialOptions:r,resolve:(T,J={})=>{if(!R)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof T!="string")throw new Error("The path to resolve must be a string");let I=Object.create(null),aB=P(J,I,"pluginName",m),$B=P(J,I,"importer",m),EB=P(J,I,"namespace",m),lB=P(J,I,"resolveDir",m),iB=P(J,I,"kind",m),V=P(J,I,"pluginData",FB);return nB(J,I,"in resolve() call"),new Promise((rB,sB)=>{let PB={command:"resolve",path:T,key:i,pluginName:t};aB!=null&&(PB.pluginName=aB),$B!=null&&(PB.importer=$B),EB!=null&&(PB.namespace=EB),lB!=null&&(PB.resolveDir=lB),iB!=null&&(PB.kind=iB),V!=null&&(PB.pluginData=h.store(V)),l(U,PB,(XB,jB)=>{XB!==null?sB(new Error(XB)):rB({errors:HB(jB.errors,h),warnings:HB(jB.warnings,h),path:jB.path,external:jB.external,sideEffects:jB.sideEffects,namespace:jB.namespace,suffix:jB.suffix,pluginData:h.load(jB.pluginData)})})})},onStart(T){let J='This error came from the "onStart" callback registered here:',I=UB(new Error(J),B,"onStart");S.push({name:t,callback:T,note:I})},onEnd(T){let J='This error came from the "onEnd" callback registered here:',I=UB(new Error(J),B,"onEnd");F.push({name:t,callback:T,note:I})},onResolve(T,J){let I='This error came from the "onResolve" callback registered here:',aB=UB(new Error(I),B,"onResolve"),$B={},EB=P(T,$B,"filter",LB),lB=P(T,$B,"namespace",m);if(nB(T,$B,`in onResolve() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onResolve() call is missing a filter");let iB=L++;D[iB]={name:t,callback:J,note:aB},z.onResolve.push({id:iB,filter:EB.source,namespace:lB||""})},onLoad(T,J){let I='This error came from the "onLoad" callback registered here:',aB=UB(new Error(I),B,"onLoad"),$B={},EB=P(T,$B,"filter",LB),lB=P(T,$B,"namespace",m);if(nB(T,$B,`in onLoad() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onLoad() call is missing a filter");let iB=L++;G[iB]={name:t,callback:J,note:aB},z.onLoad.push({id:iB,filter:EB.source,namespace:lB||""})},esbuild:B.esbuild});g&&(yield g),Y.push(z)}catch(d){return{ok:!1,error:d,pluginName:t}}}let q=_=>xB(this,null,function*(){switch(_.command){case"on-start":{let X={errors:[],warnings:[]};return yield Promise.all(S.map(t=>xB(this,[t],function*({name:d,callback:z,note:kB}){try{let g=yield z();if(g!=null){if(typeof g!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(d)} to return an object`);let T={},J=P(g,T,"errors",eB),I=P(g,T,"warnings",eB);nB(g,T,`from onStart() callback in plugin ${JSON.stringify(d)}`),J!=null&&X.errors.push(...bB(J,"errors",h,d)),I!=null&&X.warnings.push(...bB(I,"warnings",h,d))}}catch(g){X.errors.push(yB(g,B,h,kB&&kB(),d))}}))),X}case"on-resolve":{let X={},t="",d,z;for(let kB of _.ids)try{({name:t,callback:d,note:z}=D[kB]);let g=yield d({path:_.path,importer:_.importer,namespace:_.namespace,resolveDir:_.resolveDir,kind:_.kind,pluginData:h.load(_.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(t)} to return an object`);let T={},J=P(g,T,"pluginName",m),I=P(g,T,"path",m),aB=P(g,T,"namespace",m),$B=P(g,T,"suffix",m),EB=P(g,T,"external",Z),lB=P(g,T,"sideEffects",Z),iB=P(g,T,"pluginData",FB),V=P(g,T,"errors",eB),rB=P(g,T,"warnings",eB),sB=P(g,T,"watchFiles",eB),PB=P(g,T,"watchDirs",eB);nB(g,T,`from onResolve() callback in plugin ${JSON.stringify(t)}`),X.id=kB,J!=null&&(X.pluginName=J),I!=null&&(X.path=I),aB!=null&&(X.namespace=aB),$B!=null&&(X.suffix=$B),EB!=null&&(X.external=EB),lB!=null&&(X.sideEffects=lB),iB!=null&&(X.pluginData=h.store(iB)),V!=null&&(X.errors=bB(V,"errors",h,t)),rB!=null&&(X.warnings=bB(rB,"warnings",h,t)),sB!=null&&(X.watchFiles=NB(sB,"watchFiles")),PB!=null&&(X.watchDirs=NB(PB,"watchDirs"));break}}catch(g){return{id:kB,errors:[yB(g,B,h,z&&z(),t)]}}return X}case"on-load":{let X={},t="",d,z;for(let kB of _.ids)try{({name:t,callback:d,note:z}=G[kB]);let g=yield d({path:_.path,namespace:_.namespace,suffix:_.suffix,pluginData:h.load(_.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(t)} to return an object`);let T={},J=P(g,T,"pluginName",m),I=P(g,T,"contents",tA),aB=P(g,T,"resolveDir",m),$B=P(g,T,"pluginData",FB),EB=P(g,T,"loader",m),lB=P(g,T,"errors",eB),iB=P(g,T,"warnings",eB),V=P(g,T,"watchFiles",eB),rB=P(g,T,"watchDirs",eB);nB(g,T,`from onLoad() callback in plugin ${JSON.stringify(t)}`),X.id=kB,J!=null&&(X.pluginName=J),I instanceof Uint8Array?X.contents=I:I!=null&&(X.contents=TB(I)),aB!=null&&(X.resolveDir=aB),$B!=null&&(X.pluginData=h.store($B)),EB!=null&&(X.loader=EB),lB!=null&&(X.errors=bB(lB,"errors",h,t)),iB!=null&&(X.warnings=bB(iB,"warnings",h,t)),V!=null&&(X.watchFiles=NB(V,"watchFiles")),rB!=null&&(X.watchDirs=NB(rB,"watchDirs"));break}}catch(g){return{id:kB,errors:[yB(g,B,h,z&&z(),t)]}}return X}default:throw new Error("Invalid command: "+_.command)}}),AB=(_,X,t)=>t();F.length>0&&(AB=(_,X,t)=>{(()=>xB(this,null,function*(){for(let{name:d,callback:z,note:kB}of F)try{yield z(_)}catch(g){_.errors.push(yield new Promise(T=>X(g,d,kB&&kB(),T)))}}))().then(t)}),R=!0;let uB=0;return{ok:!0,requestPlugins:Y,runOnEndCallbacks:AB,pluginRefs:{ref(){++uB===1&&k.set(i,q)},unref(){--uB===0&&k.delete(i)}}}}),Q=(r,a,i,h)=>{let U={},S=P(a,U,"port",MB),F=P(a,U,"host",m),D=P(a,U,"servedir",m),G=P(a,U,"onRequest",KB),L,x=new Promise((Y,R)=>{L=q=>{p.delete(h),q!==null?R(new Error(q)):Y()}});return i.serve={},nB(a,U,"in serve() call"),S!==void 0&&(i.serve.port=S),F!==void 0&&(i.serve.host=F),D!==void 0&&(i.serve.servedir=D),p.set(h,{onRequest:G,onWait:L}),{wait:x,stop(){l(r,{command:"serve-stop",key:h},()=>{})}}},f="warning",M="silent",w=r=>{let a=c++,i=aA(),h,{refs:U,options:S,isTTY:F,callback:D}=r;if(typeof S=="object"){let x=S.plugins;if(x!==void 0){if(!Array.isArray(x))throw new Error('"plugins" must be an array');h=x}}let G=(x,Y,R,q)=>{let AB=[];try{WB(AB,S,{},F,f)}catch{}let uB=yB(x,B,i,R,Y);l(U,{command:"error",flags:AB,error:uB},()=>{uB.detail=i.load(uB.detail),q(uB)})},L=(x,Y)=>{G(x,Y,void 0,R=>{D(CB("Build failed",[R],[]),null)})};if(h&&h.length>0){if(B.isSync)return L(new Error("Cannot use plugins in synchronous API calls"),"");o(S,h,a,i,U).then(x=>{if(!x.ok)L(x.error,x.pluginName);else try{BB(dB(tB({},r),{key:a,details:i,logPluginError:G,requestPlugins:x.requestPlugins,runOnEndCallbacks:x.runOnEndCallbacks,pluginRefs:x.pluginRefs}))}catch(Y){L(Y,"")}},x=>L(x,""))}else try{BB(dB(tB({},r),{key:a,details:i,logPluginError:G,requestPlugins:null,runOnEndCallbacks:(x,Y,R)=>R(),pluginRefs:null}))}catch(x){L(x,"")}},BB=({callName:r,refs:a,serveOptions:i,options:h,isTTY:U,defaultWD:S,callback:F,key:D,details:G,logPluginError:L,requestPlugins:x,runOnEndCallbacks:Y,pluginRefs:R})=>{let q={ref(){R&&R.ref(),a&&a.ref()},unref(){R&&R.unref(),a&&a.unref()}},AB=!B.isWriteUnavailable,{entries:uB,flags:_,write:X,stdinContents:t,stdinResolveDir:d,absWorkingDir:z,incremental:kB,nodePaths:g,watch:T,mangleCache:J}=SA(r,h,U,f,AB),I={command:"build",key:D,entries:uB,flags:_,write:X,stdinContents:t,stdinResolveDir:d,absWorkingDir:z||S,incremental:kB,nodePaths:g};x&&(I.plugins=x),J&&(I.mangleCache=J);let aB=i&&Q(q,i,I,D),$B,EB,lB=(V,rB)=>{V.outputFiles&&(rB.outputFiles=V.outputFiles.map(xA)),V.metafile&&(rB.metafile=JSON.parse(V.metafile)),V.mangleCache&&(rB.mangleCache=V.mangleCache),V.writeToStdout!==void 0&&console.log(vB(V.writeToStdout).replace(/\n$/,""))},iB=(V,rB)=>{let sB={errors:HB(V.errors,G),warnings:HB(V.warnings,G)};lB(V,sB),Y(sB,L,()=>{if(sB.errors.length>0)return rB(CB("Build failed",sB.errors,sB.warnings),null);if(V.rebuild){if(!$B){let PB=!1;$B=()=>new Promise((XB,jB)=>{if(PB||u)throw new Error("Cannot rebuild");l(q,{command:"rebuild",key:D},(QB,NA)=>{if(QB)return rB(CB("Build failed",[{id:"",pluginName:"",text:QB,location:null,notes:[],detail:void 0}],[]),null);iB(NA,(ZB,GA)=>{ZB?jB(ZB):XB(GA)})})}),q.ref(),$B.dispose=()=>{PB||(PB=!0,l(q,{command:"rebuild-dispose",key:D},()=>{}),q.unref())}}sB.rebuild=$B}if(V.watch){if(!EB){let PB=!1;q.ref(),EB=()=>{PB||(PB=!0,n.delete(D),l(q,{command:"watch-stop",key:D},()=>{}),q.unref())},T&&n.set(D,(XB,jB)=>{if(XB){T.onRebuild&&T.onRebuild(XB,null);return}let QB={errors:HB(jB.errors,G),warnings:HB(jB.warnings,G)};lB(jB,QB),Y(QB,L,()=>{if(QB.errors.length>0){T.onRebuild&&T.onRebuild(CB("Build failed",QB.errors,QB.warnings),null);return}jB.rebuildID!==void 0&&(QB.rebuild=$B),QB.stop=EB,T.onRebuild&&T.onRebuild(null,QB)})})}sB.stop=EB}rB(null,sB)})};if(X&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(kB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(T&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');l(q,I,(V,rB)=>{if(V)return F(new Error(V),null);if(aB){let sB=rB,PB=!1;q.ref();let XB={port:sB.port,host:sB.host,wait:aB.wait,stop(){PB||(PB=!0,aB.stop(),q.unref())}};return q.ref(),aB.wait.then(q.unref,q.unref),F(null,XB)}return iB(rB,F)})};return{readFromStdout:W,afterClose:H,service:{buildOrServe:w,transform:({callName:r,refs:a,input:i,options:h,isTTY:U,fs:S,callback:F})=>{let D=aA(),G=L=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:x,mangleCache:Y}=bA(r,h,U,M),R={command:"transform",flags:x,inputFS:L!==null,input:L!==null?TB(L):typeof i=="string"?TB(i):i};Y&&(R.mangleCache=Y),l(a,R,(q,AB)=>{if(q)return F(new Error(q),null);let uB=HB(AB.errors,D),_=HB(AB.warnings,D),X=1,t=()=>{if(--X===0){let d={warnings:_,code:AB.code,map:AB.map};AB.mangleCache&&(d.mangleCache=AB?.mangleCache),F(null,d)}};if(uB.length>0)return F(CB("Transform failed",uB,_),null);AB.codeFS&&(X++,S.readFile(AB.code,(d,z)=>{d!==null?F(d,null):(AB.code=z,t())})),AB.mapFS&&(X++,S.readFile(AB.map,(d,z)=>{d!==null?F(d,null):(AB.map=z,t())})),t()})}catch(x){let Y=[];try{WB(Y,h,{},U,M)}catch{}let R=yB(x,B,D,void 0,"");l(a,{command:"error",flags:Y,error:R},()=>{R.detail=D.load(R.detail),F(CB("Transform failed",[R],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let L=G;G=()=>S.writeFile(i,L)}G(null)},formatMessages:({callName:r,refs:a,messages:i,options:h,callback:U})=>{let S=bB(i,"messages",null,"");if(!h)throw new Error(`Missing second argument in ${r}() call`);let F={},D=P(h,F,"kind",m),G=P(h,F,"color",Z),L=P(h,F,"terminalWidth",MB);if(nB(h,F,`in ${r}() call`),D===void 0)throw new Error(`Missing "kind" in ${r}() call`);if(D!=="error"&&D!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${r}() call`);let x={command:"format-msgs",messages:S,isWarning:D==="warning"};G!==void 0&&(x.color=G),L!==void 0&&(x.terminalWidth=L),l(a,x,(Y,R)=>{if(Y)return U(new Error(Y),null);U(null,R.messages)})},analyzeMetafile:({callName:r,refs:a,metafile:i,options:h,callback:U})=>{h===void 0&&(h={});let S={},F=P(h,S,"color",Z),D=P(h,S,"verbose",Z);nB(h,S,`in ${r}() call`);let G={command:"analyze-metafile",metafile:i};F!==void 0&&(G.color=F),D!==void 0&&(G.verbose=D),l(a,G,(L,x)=>{if(L)return U(new Error(L),null);U(null,x.result)})}}}}function aA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let n=A++;return B.set(n,k),n}}}function UB(B,A,k){let n,p=!1;return()=>{if(p)return n;p=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let e=iA(A,u,k);if(e)return n={text:B.message,location:e},n}catch{}}}function yB(B,A,k,n,p){let u="Internal error",e=null;try{u=(B&&B.message||B)+""}catch{}try{e=iA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:p,text:u,location:e,notes:n?[n]:[],detail:k?k.store(B):-1}}function iA(B,A,k){let n="    at ";if(B.readFileSync&&!A[0].startsWith(n)&&A[1].startsWith(n))for(let p=1;p<A.length;p++){let u=A[p];if(!!u.startsWith(n))for(u=u.slice(n.length);;){let e=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(e){u=e[1];continue}if(e=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),e){u=e[1];continue}if(e=/^(\S+):(\d+):(\d+)$/.exec(u),e){let c;try{c=B.readFileSync(e[1],"utf8")}catch{break}let E=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+e[2]-1]||"",b=+e[3]-1,W=E.slice(b,b+k.length)===k?k.length:0;return{file:e[1],namespace:"file",line:+e[2],column:TB(E.slice(0,b)).length,length:TB(E.slice(b,b+W)).length,lineText:E+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function CB(B,A,k){let n=5,p=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,n+1).map((e,c)=>{if(c===n)return`
...`;if(!e.location)return`
error: ${e.text}`;let{file:E,line:b,column:W}=e.location,H=e.pluginName?`[plugin: ${e.pluginName}] `:"";return`
${E}:${b}:${W}: ERROR: ${H}${e.text}`}).join(""),u=new Error(`${B}${p}`);return u.errors=A,u.warnings=k,u}function HB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function sA(B,A){if(B==null)return null;let k={},n=P(B,k,"file",m),p=P(B,k,"namespace",m),u=P(B,k,"line",MB),e=P(B,k,"column",MB),c=P(B,k,"length",MB),E=P(B,k,"lineText",m),b=P(B,k,"suggestion",m);return nB(B,k,A),{file:n||"",namespace:p||"",line:u||0,column:e||0,length:c||0,lineText:E||"",suggestion:b||""}}function bB(B,A,k,n){let p=[],u=0;for(let e of B){let c={},E=P(e,c,"id",m),b=P(e,c,"pluginName",m),W=P(e,c,"text",m),H=P(e,c,"location",eA),l=P(e,c,"notes",eB),N=P(e,c,"detail",FB),K=`in element ${u} of "${A}"`;nB(e,c,K);let y=[];if(l)for(let j of l){let o={},Q=P(j,o,"text",m),f=P(j,o,"location",eA);nB(j,o,K),y.push({text:Q||"",location:sA(f,K)})}p.push({id:E||"",pluginName:b||n,text:W||"",location:sA(H,K),notes:y,detail:k?k.store(N):-1}),u++}return p}function NB(B,A){let k=[];for(let n of B){if(typeof n!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(n)}return k}function xA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){let n=this.contents;return(k===null||n!==A)&&(A=n,k=vB(n)),k}}}var vA="0.15.5",MA=B=>GB().build(B),yA=()=>{throw new Error('The "serve" API only works in node')},CA=(B,A)=>GB().transform(B,A),wA=(B,A)=>GB().formatMessages(B,A),RA=(B,A)=>GB().analyzeMetafile(B,A),DA=()=>{throw new Error('The "buildSync" API only works in node')},_A=()=>{throw new Error('The "transformSync" API only works in node')},IA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},FA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wB,YB,GB=()=>{if(YB)return YB;throw wB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},LA=B=>{B=HA(B||{});let A=B.wasmURL,k=B.wasmModule,n=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(wB)throw new Error('Cannot call "initialize" more than once');return wB=WA(A||"",k,n),wB.catch(()=>{wB=void 0}),wB},WA=(B,A,k)=>xB(void 0,null,function*(){let n;if(A)n=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);n=yield c.arrayBuffer()}let p;if(k){let c=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.15.5"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});p=new Worker(URL.createObjectURL(c))}else{let c=(E=>{var b=(l,N,K)=>new Promise((y,j)=>{var o=M=>{try{f(K.next(M))}catch(w){j(w)}},Q=M=>{try{f(K.throw(M))}catch(w){j(w)}},f=M=>M.done?y(M.value):Promise.resolve(M.value).then(o,Q);f((K=K.apply(l,N)).next())});let W,H={};for(let l=self;l;l=Object.getPrototypeOf(l))for(let N of Object.getOwnPropertyNames(l))N in H||Object.defineProperty(H,N,{get:()=>self[N]});return(()=>{let l=()=>{let y=new Error("not implemented");return y.code="ENOSYS",y};if(!H.fs){let y="";H.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(j,o){y+=K.decode(o);let Q=y.lastIndexOf(`
`);return Q!=-1&&(console.log(y.substr(0,Q)),y=y.substr(Q+1)),o.length},write(j,o,Q,f,M,w){if(Q!==0||f!==o.length||M!==null){w(l());return}let BB=this.writeSync(j,o);w(null,BB)},chmod(j,o,Q){Q(l())},chown(j,o,Q,f){f(l())},close(j,o){o(l())},fchmod(j,o,Q){Q(l())},fchown(j,o,Q,f){f(l())},fstat(j,o){o(l())},fsync(j,o){o(null)},ftruncate(j,o,Q){Q(l())},lchown(j,o,Q,f){f(l())},link(j,o,Q){Q(l())},lstat(j,o){o(l())},mkdir(j,o,Q){Q(l())},open(j,o,Q,f){f(l())},read(j,o,Q,f,M,w){w(l())},readdir(j,o){o(l())},readlink(j,o){o(l())},rename(j,o,Q){Q(l())},rmdir(j,o){o(l())},stat(j,o){o(l())},symlink(j,o,Q){Q(l())},truncate(j,o,Q){Q(l())},unlink(j,o){o(l())},utimes(j,o,Q,f){f(l())}}}if(H.process||(H.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw l()},pid:-1,ppid:-1,umask(){throw l()},cwd(){throw l()},chdir(){throw l()}}),!H.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!H.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!H.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!H.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let N=new TextEncoder("utf-8"),K=new TextDecoder("utf-8");H.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let y=($,s)=>{this.mem.setUint32($+0,s,!0),this.mem.setUint32($+4,Math.floor(s/4294967296),!0)},j=$=>{let s=this.mem.getUint32($+0,!0),v=this.mem.getInt32($+4,!0);return s+v*4294967296},o=$=>{let s=this.mem.getFloat64($,!0);if(s===0)return;if(!isNaN(s))return s;let v=this.mem.getUint32($,!0);return this._values[v]},Q=($,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,s,!0);return}if(s===void 0){this.mem.setFloat64($,0,!0);return}let r=this._ids.get(s);r===void 0&&(r=this._idPool.pop(),r===void 0&&(r=this._values.length),this._values[r]=s,this._goRefCounts[r]=0,this._ids.set(s,r)),this._goRefCounts[r]++;let a=0;switch(typeof s){case"object":s!==null&&(a=1);break;case"string":a=2;break;case"symbol":a=3;break;case"function":a=4;break}this.mem.setUint32($+4,2146959360|a,!0),this.mem.setUint32($,r,!0)},f=$=>{let s=j($+0),v=j($+8);return new Uint8Array(this._inst.exports.mem.buffer,s,v)},M=$=>{let s=j($+0),v=j($+8),r=new Array(v);for(let a=0;a<v;a++)r[a]=o(s+a*8);return r},w=$=>{let s=j($+0),v=j($+8);return K.decode(new DataView(this._inst.exports.mem.buffer,s,v))},BB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":$=>{$>>>=0;let s=j($+8),v=j($+16),r=this.mem.getInt32($+24,!0);H.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,v,r))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,y($+8,(BB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let s=new Date().getTime();y($+8,s/1e3),this.mem.setInt32($+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},j($+8)+1)),this.mem.setInt32($+16,s,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(f($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let s=this.mem.getUint32($+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){let v=this._values[s];this._values[s]=null,this._ids.delete(v),this._idPool.push(s)}},"syscall/js.stringVal":$=>{$>>>=0,Q($+24,w($+8))},"syscall/js.valueGet":$=>{$>>>=0;let s=Reflect.get(o($+8),w($+16));$=this._inst.exports.getsp()>>>0,Q($+32,s)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(o($+8),w($+16),o($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(o($+8),w($+16))},"syscall/js.valueIndex":$=>{$>>>=0,Q($+24,Reflect.get(o($+8),j($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(o($+8),j($+16),o($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let s=o($+8),v=Reflect.get(s,w($+16)),r=M($+32),a=Reflect.apply(v,s,r);$=this._inst.exports.getsp()>>>0,Q($+56,a),this.mem.setUint8($+64,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+56,s),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let s=o($+8),v=M($+16),r=Reflect.apply(s,void 0,v);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let s=o($+8),v=M($+16),r=Reflect.construct(s,v);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,y($+16,parseInt(o($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let s=N.encode(String(o($+8)));Q($+16,s),y($+24,s.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let s=o($+8);f($+16).set(s)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,o($+8)instanceof o($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let s=f($+8),v=o($+32);if(!(v instanceof Uint8Array||v instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=v.subarray(0,s.length);s.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let s=o($+8),v=f($+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=v.subarray(0,s.length);s.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(y){return b(this,null,function*(){if(!(y instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=y,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,H,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[H,5],[this,6]]),this._idPool=[],this.exited=!1;let j=4096,o=$=>{let s=j,v=N.encode($+"\0");return new Uint8Array(this.mem.buffer,j,v.length).set(v),j+=v.length,j%8!==0&&(j+=8-j%8),s},Q=this.argv.length,f=[];this.argv.forEach($=>{f.push(o($))}),f.push(0),Object.keys(this.env).sort().forEach($=>{f.push(o(`${$}=${this.env[$]}`))}),f.push(0);let w=j;f.forEach($=>{this.mem.setUint32(j,$,!0),this.mem.setUint32(j+4,0,!0),j+=8});let BB=4096+8192;if(j>=BB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(Q,w),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(y){let j=this;return function(){let o={id:y,this:this,args:arguments};return j._pendingEvent=o,j._resume(),o.result}}}})(),W=({data:l})=>{let N=new TextDecoder,K=H.fs,y="";K.writeSync=(M,w)=>{if(M===1)E(w);else if(M===2){y+=N.decode(w);let BB=y.split(`
`);BB.length>1&&console.log(BB.slice(0,-1).join(`
`)),y=BB[BB.length-1]}else throw new Error("Bad write");return w.length};let j=[],o,Q=0;W=({data:M})=>{M.length>0&&(j.push(M),o&&o())},K.read=(M,w,BB,$,s,v)=>{if(M!==0||BB!==0||$!==w.length||s!==null)throw new Error("Bad read");if(j.length===0){o=()=>K.read(M,w,BB,$,s,v);return}let r=j[0],a=Math.max(0,Math.min($,r.length-Q));w.set(r.subarray(Q,Q+a),BB),Q+=a,Q===r.length&&(j.shift(),Q=0),v(null,a)};let f=new H.Go;f.argv=["","--service=0.15.5"],l instanceof WebAssembly.Module?WebAssembly.instantiate(l,f.importObject).then(M=>f.run(M)):WebAssembly.instantiate(l,f.importObject).then(({instance:M})=>f.run(M))},l=>W(l)})(E=>p.onmessage({data:E}));p={onmessage:null,postMessage:E=>setTimeout(()=>c({data:E})),terminate(){}}}p.postMessage(n),p.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:e}=fA({writeToStdin(c){p.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:IB});YB={build:c=>new Promise((E,b)=>e.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(W,H)=>W?b(W):E(H)})),transform:(c,E)=>new Promise((b,W)=>e.transform({callName:"transform",refs:null,input:c,options:E||{},isTTY:!1,fs:{readFile(H,l){l(new Error("Internal error"),null)},writeFile(H,l){l(null)}},callback:(H,l)=>H?W(H):b(l)})),formatMessages:(c,E)=>new Promise((b,W)=>e.formatMessages({callName:"formatMessages",refs:null,messages:c,options:E,callback:(H,l)=>H?W(H):b(l)})),analyzeMetafile:(c,E)=>new Promise((b,W)=>e.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:E,callback:(H,l)=>H?W(H):b(l)}))}}),UA=IB})(typeof BA=="object"?BA:{set exports(pB){(typeof self<"u"?self:this).esbuild=pB}})});RB();RB();var ZA=new Error("timeout while waiting for mutex to become available"),zA=new Error("mutex already locked"),JA=new Error("request for lock canceled"),oA=function(pB,C,O,oB){function SB(cB){return cB instanceof O?cB:new O(function(hB){hB(cB)})}return new(O||(O=Promise))(function(cB,hB){function fB(tB){try{mB(oB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{mB(oB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?cB(tB.value):SB(tB.value).then(fB,DB)}mB((oB=oB.apply(pB,C||[])).next())})},zB=class{constructor(C,O=JA){if(this._maxConcurrency=C,this._cancelError=O,this._queue=[],this._waiters=[],C<=0)throw new Error("semaphore must be initialized to a positive value");this._value=C}acquire(){let C=this.isLocked(),O=new Promise((oB,SB)=>this._queue.push({resolve:oB,reject:SB}));return C||this._dispatch(),O}runExclusive(C){return oA(this,void 0,void 0,function*(){let[O,oB]=yield this.acquire();try{return yield C(O)}finally{oB()}})}waitForUnlock(){return oA(this,void 0,void 0,function*(){return this.isLocked()?new Promise(O=>this._waiters.push({resolve:O})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let C=this._currentReleaser;this._currentReleaser=void 0,C()}}cancel(){this._queue.forEach(C=>C.reject(this._cancelError)),this._queue=[]}_dispatch(){let C=this._queue.shift();if(!C)return;let O=!1;this._currentReleaser=()=>{O||(O=!0,this._value++,this._resolveWaiters(),this._dispatch())},C.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(C=>C.resolve()),this._waiters=[]}},VA=function(pB,C,O,oB){function SB(cB){return cB instanceof O?cB:new O(function(hB){hB(cB)})}return new(O||(O=Promise))(function(cB,hB){function fB(tB){try{mB(oB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{mB(oB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?cB(tB.value):SB(tB.value).then(fB,DB)}mB((oB=oB.apply(pB,C||[])).next())})},OB=class{constructor(C){this._semaphore=new zB(1,C)}acquire(){return VA(this,void 0,void 0,function*(){let[,C]=yield this._semaphore.acquire();return C})}runExclusive(C){return this._semaphore.runExclusive(()=>C())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var JB=qA(jA(),1);var pA="./chunk-esbuild-C5LYP4UP.wasm";var YA=new OB,qB={initialize:JB.initialize,transform:async(pB,C)=>await YA.runExclusive(async()=>{try{console.info("esbuild start");let O=await(0,JB.transform)(pB,C);return console.info("esbuild transpile done"),O}catch(O){throw console.error("Ebuild transform error: ",{code:pB,err:O}),O}})},_B=!1,n7=async()=>{try{if(_B===!0||(_B=_B||new Promise(pB=>{qB.initialize({wasmURL:new URL(pA,import.meta.url).toString()}).then(()=>pB(!0))}),await _B===!0))return qB;throw new Error("esbuild couldn't initialize")}catch{throw new Error("esbuild couldn't initialize")}finally{if(await _B===!0)return qB;throw new Error("esbuild couldn't initialize")}};export{n7 as init};
