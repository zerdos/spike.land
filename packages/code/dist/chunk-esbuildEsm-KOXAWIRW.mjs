import{c as GA,e as OA,j as RB}from"./chunk-chunk-WHEVJVJY.mjs";var lA=GA((B7,BA)=>{RB();(uB=>{"use strict";var g=Object.defineProperty,y=Object.defineProperties,kB=Object.getOwnPropertyDescriptor,TB=Object.getOwnPropertyDescriptors,lB=Object.getOwnPropertyNames,hB=Object.getOwnPropertySymbols,fB=Object.prototype.hasOwnProperty,DB=Object.prototype.propertyIsEnumerable,mB=(B,A,k)=>A in B?g(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,nB=(B,A)=>{for(var k in A||(A={}))fB.call(A,k)&&mB(B,k,A[k]);if(hB)for(var k of hB(A))DB.call(A,k)&&mB(B,k,A[k]);return B},dB=(B,A)=>y(B,TB(A)),pA=(B,A)=>{for(var k in A)g(B,k,{get:A[k],enumerable:!0})},uA=(B,A,k,n)=>{if(A&&typeof A=="object"||typeof A=="function")for(let p of lB(A))!fB.call(B,p)&&p!==k&&g(B,p,{get:()=>A[p],enumerable:!(n=kB(A,p))||n.enumerable});return B},cA=B=>uA(g({},"__esModule",{value:!0}),B),xB=(B,A,k)=>new Promise((n,p)=>{var u=E=>{try{c(k.next(E))}catch(f){p(f)}},e=E=>{try{c(k.throw(E))}catch(f){p(f)}},c=E=>E.done?n(E.value):Promise.resolve(E.value).then(u,e);c((k=k.apply(B,A)).next())}),FB={};pA(FB,{analyzeMetafile:()=>wA,analyzeMetafileSync:()=>_A,build:()=>vA,buildSync:()=>RA,default:()=>UA,formatMessages:()=>CA,formatMessagesSync:()=>IA,initialize:()=>FA,serve:()=>MA,transform:()=>yA,transformSync:()=>DA,version:()=>xA}),uB.exports=cA(FB);function AA(B){let A=n=>{if(n===null)k.write8(0);else if(typeof n=="boolean")k.write8(1),k.write8(+n);else if(typeof n=="number")k.write8(2),k.write32(n|0);else if(typeof n=="string")k.write8(3),k.write(XB(n));else if(n instanceof Uint8Array)k.write8(4),k.write(n);else if(n instanceof Array){k.write8(5),k.write32(n.length);for(let p of n)A(p)}else{let p=Object.keys(n);k.write8(6),k.write32(p.length);for(let u of p)k.write(XB(u)),A(n[u])}},k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),VB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function hA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return vB(k.read());case 4:return k.read();case 5:{let e=k.read32(),c=[];for(let E=0;E<e;E++)c.push(A());return c}case 6:{let e=k.read32(),c={};for(let E=0;E<e;E++)c[vB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new $A(B),n=k.read32(),p=(n&1)===0;n>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:n,isRequest:p,value:u}}var $A=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);VB(this.buf,B,A)}write(B){let A=this._write(4+B.length);VB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},XB,vB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;XB=k=>B.encode(k),vB=k=>A.decode(k)}else if(typeof Buffer<"u")XB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},vB=B=>{let{buffer:A,byteOffset:k,byteLength:n}=B;return Buffer.from(A,k,n).toString()};else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function VB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var WB=()=>null,Z=B=>typeof B=="boolean"?null:"a boolean",QA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",m=B=>typeof B=="string"?null:"a string",UB=B=>B instanceof RegExp?null:"a RegExp object",MB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",KB=B=>typeof B=="function"?null:"a function",EB=B=>Array.isArray(B)?null:"an array",gB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",mA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",dA=B=>typeof B=="object"&&B!==null?null:"an array or an object",eA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",EA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",XA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",gA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",tA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,n){let p=B[k];if(A[k+""]=!0,p===void 0)return;let u=n(p);if(u!==null)throw new Error(`"${k}" must be ${u}`);return p}function rB(B,A,k){for(let n in B)if(!(n in A))throw new Error(`Invalid option ${k}: "${n}"`)}function TA(B){let A=Object.create(null),k=P(B,A,"wasmURL",m),n=P(B,A,"wasmModule",mA),p=P(B,A,"worker",Z);return rB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:n,worker:p}}function nA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let n=B[k];if(typeof n=="string"||n===!1)A[k]=n;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function LB(B,A,k,n,p){let u=P(A,k,"color",Z),e=P(A,k,"logLevel",m),c=P(A,k,"logLimit",MB);u!==void 0?B.push(`--color=${u}`):n&&B.push("--color=true"),B.push(`--log-level=${e||p}`),B.push(`--log-limit=${c||0}`)}function rA(B,A,k){let n=P(A,k,"legalComments",m),p=P(A,k,"sourceRoot",m),u=P(A,k,"sourcesContent",Z),e=P(A,k,"target",gA),c=P(A,k,"format",m),E=P(A,k,"globalName",m),f=P(A,k,"mangleProps",UB),L=P(A,k,"reserveProps",UB),H=P(A,k,"mangleQuoted",Z),l=P(A,k,"minify",Z),G=P(A,k,"minifySyntax",Z),K=P(A,k,"minifyWhitespace",Z),w=P(A,k,"minifyIdentifiers",Z),j=P(A,k,"drop",EB),o=P(A,k,"charset",m),Q=P(A,k,"treeShaking",Z),x=P(A,k,"ignoreAnnotations",Z),C=P(A,k,"jsx",m),R=P(A,k,"jsxFactory",m),BB=P(A,k,"jsxFragment",m),$=P(A,k,"jsxImportSource",m),s=P(A,k,"jsxDev",Z),M=P(A,k,"define",gB),r=P(A,k,"logOverride",gB),a=P(A,k,"supported",gB),i=P(A,k,"pure",EB),h=P(A,k,"keepNames",Z),N=P(A,k,"platform",m);if(n&&B.push(`--legal-comments=${n}`),p!==void 0&&B.push(`--source-root=${p}`),u!==void 0&&B.push(`--sources-content=${u}`),e&&(Array.isArray(e)?B.push(`--target=${Array.from(e).map(PA).join(",")}`):B.push(`--target=${PA(e)}`)),c&&B.push(`--format=${c}`),E&&B.push(`--global-name=${E}`),N&&B.push(`--platform=${N}`),l&&B.push("--minify"),G&&B.push("--minify-syntax"),K&&B.push("--minify-whitespace"),w&&B.push("--minify-identifiers"),o&&B.push(`--charset=${o}`),Q!==void 0&&B.push(`--tree-shaking=${Q}`),x&&B.push("--ignore-annotations"),j)for(let S of j)B.push(`--drop:${S}`);if(f&&B.push(`--mangle-props=${f.source}`),L&&B.push(`--reserve-props=${L.source}`),H!==void 0&&B.push(`--mangle-quoted=${H}`),C&&B.push(`--jsx=${C}`),R&&B.push(`--jsx-factory=${R}`),BB&&B.push(`--jsx-fragment=${BB}`),$&&B.push(`--jsx-import-source=${$}`),s&&B.push("--jsx-dev"),M)for(let S in M){if(S.indexOf("=")>=0)throw new Error(`Invalid define: ${S}`);B.push(`--define:${S}=${M[S]}`)}if(r)for(let S in r){if(S.indexOf("=")>=0)throw new Error(`Invalid log override: ${S}`);B.push(`--log-override:${S}=${r[S]}`)}if(a)for(let S in a){if(S.indexOf("=")>=0)throw new Error(`Invalid supported: ${S}`);B.push(`--supported:${S}=${a[S]}`)}if(i)for(let S of i)B.push(`--pure:${S}`);h&&B.push("--keep-names")}function bA(B,A,k,n,p){var u;let e=[],c=[],E=Object.create(null),f=null,L=null,H=null;LB(e,A,E,k,n),rA(e,A,E);let l=P(A,E,"sourcemap",EA),G=P(A,E,"bundle",Z),K=P(A,E,"watch",QA),w=P(A,E,"splitting",Z),j=P(A,E,"preserveSymlinks",Z),o=P(A,E,"metafile",Z),Q=P(A,E,"outfile",m),x=P(A,E,"outdir",m),C=P(A,E,"outbase",m),R=P(A,E,"tsconfig",m),BB=P(A,E,"resolveExtensions",EB),$=P(A,E,"nodePaths",EB),s=P(A,E,"mainFields",EB),M=P(A,E,"conditions",EB),r=P(A,E,"external",EB),a=P(A,E,"loader",gB),i=P(A,E,"outExtension",gB),h=P(A,E,"publicPath",m),N=P(A,E,"entryNames",m),S=P(A,E,"chunkNames",m),W=P(A,E,"assetNames",m),I=P(A,E,"inject",EB),O=P(A,E,"banner",gB),U=P(A,E,"footer",gB),v=P(A,E,"entryPoints",dA),Y=P(A,E,"absWorkingDir",m),D=P(A,E,"stdin",gB),q=(u=P(A,E,"write",Z))!=null?u:p,AB=P(A,E,"allowOverwrite",Z),cB=P(A,E,"incremental",Z)===!0,_=P(A,E,"mangleCache",gB);if(E.plugins=!0,rB(A,E,`in ${B}() call`),l&&e.push(`--sourcemap${l===!0?"":`=${l}`}`),G&&e.push("--bundle"),AB&&e.push("--allow-overwrite"),K)if(e.push("--watch"),typeof K=="boolean")H={};else{let t=Object.create(null),d=P(K,t,"onRebuild",KB);rB(K,t,`on "watch" in ${B}() call`),H={onRebuild:d}}if(w&&e.push("--splitting"),j&&e.push("--preserve-symlinks"),o&&e.push("--metafile"),Q&&e.push(`--outfile=${Q}`),x&&e.push(`--outdir=${x}`),C&&e.push(`--outbase=${C}`),R&&e.push(`--tsconfig=${R}`),BB){let t=[];for(let d of BB){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${d}`);t.push(d)}e.push(`--resolve-extensions=${t.join(",")}`)}if(h&&e.push(`--public-path=${h}`),N&&e.push(`--entry-names=${N}`),S&&e.push(`--chunk-names=${S}`),W&&e.push(`--asset-names=${W}`),s){let t=[];for(let d of s){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid main field: ${d}`);t.push(d)}e.push(`--main-fields=${t.join(",")}`)}if(M){let t=[];for(let d of M){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid condition: ${d}`);t.push(d)}e.push(`--conditions=${t.join(",")}`)}if(r)for(let t of r)e.push(`--external:${t}`);if(O)for(let t in O){if(t.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${t}`);e.push(`--banner:${t}=${O[t]}`)}if(U)for(let t in U){if(t.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${t}`);e.push(`--footer:${t}=${U[t]}`)}if(I)for(let t of I)e.push(`--inject:${t}`);if(a)for(let t in a){if(t.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${t}`);e.push(`--loader:${t}=${a[t]}`)}if(i)for(let t in i){if(t.indexOf("=")>=0)throw new Error(`Invalid out extension: ${t}`);e.push(`--out-extension:${t}=${i[t]}`)}if(v)if(Array.isArray(v))for(let t of v)c.push(["",t+""]);else for(let[t,d]of Object.entries(v))c.push([t+"",d+""]);if(D){let t=Object.create(null),d=P(D,t,"contents",tA),z=P(D,t,"resolveDir",m),PB=P(D,t,"sourcefile",m),T=P(D,t,"loader",m);rB(D,t,'in "stdin" object'),PB&&e.push(`--sourcefile=${PB}`),T&&e.push(`--loader=${T}`),z&&(L=z+""),typeof d=="string"?f=XB(d):d instanceof Uint8Array&&(f=d)}let b=[];if($)for(let t of $)t+="",b.push(t);return{entries:c,flags:e,write:q,stdinContents:f,stdinResolveDir:L,absWorkingDir:Y,incremental:cB,nodePaths:b,watch:H,mangleCache:nA(_)}}function HA(B,A,k,n){let p=[],u=Object.create(null);LB(p,A,u,k,n),rA(p,A,u);let e=P(A,u,"sourcemap",EA),c=P(A,u,"tsconfigRaw",XA),E=P(A,u,"sourcefile",m),f=P(A,u,"loader",m),L=P(A,u,"banner",m),H=P(A,u,"footer",m),l=P(A,u,"mangleCache",gB);return rB(A,u,`in ${B}() call`),e&&p.push(`--sourcemap=${e===!0?"external":e}`),c&&p.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),E&&p.push(`--sourcefile=${E}`),f&&p.push(`--loader=${f}`),L&&p.push(`--banner=${L}`),H&&p.push(`--footer=${H}`),{flags:p,mangleCache:nA(l)}}function SA(B){let A=new Map,k=new Map,n=new Map,p=new Map,u=null,e=0,c=0,E=new Uint8Array(16*1024),f=0,L=r=>{let a=f+r.length;if(a>E.length){let h=new Uint8Array(a*2);h.set(E),E=h}E.set(r,f),f+=r.length;let i=0;for(;i+4<=f;){let h=kA(E,i);if(i+4+h>f)break;i+=4,j(E.subarray(i,i+h)),i+=h}i>0&&(E.copyWithin(0,i,f),f-=i)},H=r=>{u={reason:r?": "+(r.message||r):""};let a="The service was stopped"+u.reason;for(let i of A.values())i(a,null);A.clear();for(let i of p.values())i.onWait(a);p.clear();for(let i of n.values())try{i(new Error(a),null)}catch(h){console.error(h)}n.clear()},l=(r,a,i)=>{if(u)return i("The service is no longer running"+u.reason,null);let h=e++;A.set(h,(N,S)=>{try{i(N,S)}finally{r&&r.unref()}}),r&&r.ref(),B.writeToStdin(AA({id:h,isRequest:!0,value:a}))},G=(r,a)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(AA({id:r,isRequest:!1,value:a}))},K=(r,a)=>xB(this,null,function*(){try{switch(a.command){case"ping":{G(r,{});break}case"on-start":{let i=k.get(a.key);i?G(r,yield i(a)):G(r,{});break}case"on-resolve":{let i=k.get(a.key);i?G(r,yield i(a)):G(r,{});break}case"on-load":{let i=k.get(a.key);i?G(r,yield i(a)):G(r,{});break}case"serve-request":{let i=p.get(a.key);i&&i.onRequest&&i.onRequest(a.args),G(r,{});break}case"serve-wait":{let i=p.get(a.key);i&&i.onWait(a.error),G(r,{});break}case"watch-rebuild":{let i=n.get(a.key);try{i&&i(null,a.args)}catch(h){console.error(h)}G(r,{});break}default:throw new Error("Invalid command: "+a.command)}}catch(i){G(r,{errors:[yB(i,B,null,void 0,"")]})}}),w=!0,j=r=>{if(w){w=!1;let i=String.fromCharCode(...r);if(i!=="0.15.7")throw new Error(`Cannot start service: Host version "0.15.7" does not match binary version ${JSON.stringify(i)}`);return}let a=hA(r);if(a.isRequest)K(a.id,a.value);else{let i=A.get(a.id);A.delete(a.id),a.value.error?i(a.value.error,{}):i(null,a.value)}},o=(r,a,i,h,N)=>xB(this,null,function*(){let S=[],W=[],I={},O={},U=0,v=0,Y=[],D=!1;a=[...a];for(let _ of a){let b={};if(typeof _!="object")throw new Error(`Plugin at index ${v} must be an object`);let t=P(_,b,"name",m);if(typeof t!="string"||t==="")throw new Error(`Plugin at index ${v} is missing a name`);try{let d=P(_,b,"setup",KB);if(typeof d!="function")throw new Error("Plugin is missing a setup function");rB(_,b,`on plugin ${JSON.stringify(t)}`);let z={name:t,onResolve:[],onLoad:[]};v++;let T=d({initialOptions:r,resolve:(X,J={})=>{if(!D)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof X!="string")throw new Error("The path to resolve must be a string");let F=Object.create(null),iB=P(J,F,"pluginName",m),$B=P(J,F,"importer",m),tB=P(J,F,"namespace",m),jB=P(J,F,"resolveDir",m),sB=P(J,F,"kind",m),V=P(J,F,"pluginData",WB);return rB(J,F,"in resolve() call"),new Promise((aB,oB)=>{let eB={command:"resolve",path:X,key:i,pluginName:t};iB!=null&&(eB.pluginName=iB),$B!=null&&(eB.importer=$B),tB!=null&&(eB.namespace=tB),jB!=null&&(eB.resolveDir=jB),sB!=null&&(eB.kind=sB),V!=null&&(eB.pluginData=h.store(V)),l(N,eB,(bB,pB)=>{bB!==null?oB(new Error(bB)):aB({errors:HB(pB.errors,h),warnings:HB(pB.warnings,h),path:pB.path,external:pB.external,sideEffects:pB.sideEffects,namespace:pB.namespace,suffix:pB.suffix,pluginData:h.load(pB.pluginData)})})})},onStart(X){let J='This error came from the "onStart" callback registered here:',F=NB(new Error(J),B,"onStart");S.push({name:t,callback:X,note:F})},onEnd(X){let J='This error came from the "onEnd" callback registered here:',F=NB(new Error(J),B,"onEnd");W.push({name:t,callback:X,note:F})},onResolve(X,J){let F='This error came from the "onResolve" callback registered here:',iB=NB(new Error(F),B,"onResolve"),$B={},tB=P(X,$B,"filter",UB),jB=P(X,$B,"namespace",m);if(rB(X,$B,`in onResolve() call for plugin ${JSON.stringify(t)}`),tB==null)throw new Error("onResolve() call is missing a filter");let sB=U++;I[sB]={name:t,callback:J,note:iB},z.onResolve.push({id:sB,filter:tB.source,namespace:jB||""})},onLoad(X,J){let F='This error came from the "onLoad" callback registered here:',iB=NB(new Error(F),B,"onLoad"),$B={},tB=P(X,$B,"filter",UB),jB=P(X,$B,"namespace",m);if(rB(X,$B,`in onLoad() call for plugin ${JSON.stringify(t)}`),tB==null)throw new Error("onLoad() call is missing a filter");let sB=U++;O[sB]={name:t,callback:J,note:iB},z.onLoad.push({id:sB,filter:tB.source,namespace:jB||""})},esbuild:B.esbuild});T&&(yield T),Y.push(z)}catch(d){return{ok:!1,error:d,pluginName:t}}}let q=_=>xB(this,null,function*(){switch(_.command){case"on-start":{let b={errors:[],warnings:[]};return yield Promise.all(S.map(t=>xB(this,[t],function*({name:d,callback:z,note:PB}){try{let T=yield z();if(T!=null){if(typeof T!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(d)} to return an object`);let X={},J=P(T,X,"errors",EB),F=P(T,X,"warnings",EB);rB(T,X,`from onStart() callback in plugin ${JSON.stringify(d)}`),J!=null&&b.errors.push(...SB(J,"errors",h,d)),F!=null&&b.warnings.push(...SB(F,"warnings",h,d))}}catch(T){b.errors.push(yB(T,B,h,PB&&PB(),d))}}))),b}case"on-resolve":{let b={},t="",d,z;for(let PB of _.ids)try{({name:t,callback:d,note:z}=I[PB]);let T=yield d({path:_.path,importer:_.importer,namespace:_.namespace,resolveDir:_.resolveDir,kind:_.kind,pluginData:h.load(_.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(t)} to return an object`);let X={},J=P(T,X,"pluginName",m),F=P(T,X,"path",m),iB=P(T,X,"namespace",m),$B=P(T,X,"suffix",m),tB=P(T,X,"external",Z),jB=P(T,X,"sideEffects",Z),sB=P(T,X,"pluginData",WB),V=P(T,X,"errors",EB),aB=P(T,X,"warnings",EB),oB=P(T,X,"watchFiles",EB),eB=P(T,X,"watchDirs",EB);rB(T,X,`from onResolve() callback in plugin ${JSON.stringify(t)}`),b.id=PB,J!=null&&(b.pluginName=J),F!=null&&(b.path=F),iB!=null&&(b.namespace=iB),$B!=null&&(b.suffix=$B),tB!=null&&(b.external=tB),jB!=null&&(b.sideEffects=jB),sB!=null&&(b.pluginData=h.store(sB)),V!=null&&(b.errors=SB(V,"errors",h,t)),aB!=null&&(b.warnings=SB(aB,"warnings",h,t)),oB!=null&&(b.watchFiles=GB(oB,"watchFiles")),eB!=null&&(b.watchDirs=GB(eB,"watchDirs"));break}}catch(T){return{id:PB,errors:[yB(T,B,h,z&&z(),t)]}}return b}case"on-load":{let b={},t="",d,z;for(let PB of _.ids)try{({name:t,callback:d,note:z}=O[PB]);let T=yield d({path:_.path,namespace:_.namespace,suffix:_.suffix,pluginData:h.load(_.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(t)} to return an object`);let X={},J=P(T,X,"pluginName",m),F=P(T,X,"contents",tA),iB=P(T,X,"resolveDir",m),$B=P(T,X,"pluginData",WB),tB=P(T,X,"loader",m),jB=P(T,X,"errors",EB),sB=P(T,X,"warnings",EB),V=P(T,X,"watchFiles",EB),aB=P(T,X,"watchDirs",EB);rB(T,X,`from onLoad() callback in plugin ${JSON.stringify(t)}`),b.id=PB,J!=null&&(b.pluginName=J),F instanceof Uint8Array?b.contents=F:F!=null&&(b.contents=XB(F)),iB!=null&&(b.resolveDir=iB),$B!=null&&(b.pluginData=h.store($B)),tB!=null&&(b.loader=tB),jB!=null&&(b.errors=SB(jB,"errors",h,t)),sB!=null&&(b.warnings=SB(sB,"warnings",h,t)),V!=null&&(b.watchFiles=GB(V,"watchFiles")),aB!=null&&(b.watchDirs=GB(aB,"watchDirs"));break}}catch(T){return{id:PB,errors:[yB(T,B,h,z&&z(),t)]}}return b}default:throw new Error("Invalid command: "+_.command)}}),AB=(_,b,t)=>t();W.length>0&&(AB=(_,b,t)=>{(()=>xB(this,null,function*(){for(let{name:d,callback:z,note:PB}of W)try{yield z(_)}catch(T){_.errors.push(yield new Promise(X=>b(T,d,PB&&PB(),X)))}}))().then(t)}),D=!0;let cB=0;return{ok:!0,requestPlugins:Y,runOnEndCallbacks:AB,pluginRefs:{ref(){++cB===1&&k.set(i,q)},unref(){--cB===0&&k.delete(i)}}}}),Q=(r,a,i,h)=>{let N={},S=P(a,N,"port",MB),W=P(a,N,"host",m),I=P(a,N,"servedir",m),O=P(a,N,"onRequest",KB),U,v=new Promise((Y,D)=>{U=q=>{p.delete(h),q!==null?D(new Error(q)):Y()}});return i.serve={},rB(a,N,"in serve() call"),S!==void 0&&(i.serve.port=S),W!==void 0&&(i.serve.host=W),I!==void 0&&(i.serve.servedir=I),p.set(h,{onRequest:O,onWait:U}),{wait:v,stop(){l(r,{command:"serve-stop",key:h},()=>{})}}},x="warning",C="silent",R=r=>{let a=c++,i=aA(),h,{refs:N,options:S,isTTY:W,callback:I}=r;if(typeof S=="object"){let v=S.plugins;if(v!==void 0){if(!Array.isArray(v))throw new Error('"plugins" must be an array');h=v}}let O=(v,Y,D,q)=>{let AB=[];try{LB(AB,S,{},W,x)}catch{}let cB=yB(v,B,i,D,Y);l(N,{command:"error",flags:AB,error:cB},()=>{cB.detail=i.load(cB.detail),q(cB)})},U=(v,Y)=>{O(v,Y,void 0,D=>{I(CB("Build failed",[D],[]),null)})};if(h&&h.length>0){if(B.isSync)return U(new Error("Cannot use plugins in synchronous API calls"),"");o(S,h,a,i,N).then(v=>{if(!v.ok)U(v.error,v.pluginName);else try{BB(dB(nB({},r),{key:a,details:i,logPluginError:O,requestPlugins:v.requestPlugins,runOnEndCallbacks:v.runOnEndCallbacks,pluginRefs:v.pluginRefs}))}catch(Y){U(Y,"")}},v=>U(v,""))}else try{BB(dB(nB({},r),{key:a,details:i,logPluginError:O,requestPlugins:null,runOnEndCallbacks:(v,Y,D)=>D(),pluginRefs:null}))}catch(v){U(v,"")}},BB=({callName:r,refs:a,serveOptions:i,options:h,isTTY:N,defaultWD:S,callback:W,key:I,details:O,logPluginError:U,requestPlugins:v,runOnEndCallbacks:Y,pluginRefs:D})=>{let q={ref(){D&&D.ref(),a&&a.ref()},unref(){D&&D.unref(),a&&a.unref()}},AB=!B.isWriteUnavailable,{entries:cB,flags:_,write:b,stdinContents:t,stdinResolveDir:d,absWorkingDir:z,incremental:PB,nodePaths:T,watch:X,mangleCache:J}=bA(r,h,N,x,AB),F={command:"build",key:I,entries:cB,flags:_,write:b,stdinContents:t,stdinResolveDir:d,absWorkingDir:z||S,incremental:PB,nodePaths:T};v&&(F.plugins=v),J&&(F.mangleCache=J);let iB=i&&Q(q,i,F,I),$B,tB,jB=(V,aB)=>{V.outputFiles&&(aB.outputFiles=V.outputFiles.map(fA)),V.metafile&&(aB.metafile=JSON.parse(V.metafile)),V.mangleCache&&(aB.mangleCache=V.mangleCache),V.writeToStdout!==void 0&&console.log(vB(V.writeToStdout).replace(/\n$/,""))},sB=(V,aB)=>{let oB={errors:HB(V.errors,O),warnings:HB(V.warnings,O)};jB(V,oB),Y(oB,U,()=>{if(oB.errors.length>0)return aB(CB("Build failed",oB.errors,oB.warnings),null);if(V.rebuild){if(!$B){let eB=!1;$B=()=>new Promise((bB,pB)=>{if(eB||u)throw new Error("Cannot rebuild");l(q,{command:"rebuild",key:I},(QB,LA)=>{if(QB)return aB(CB("Build failed",[{id:"",pluginName:"",text:QB,location:null,notes:[],detail:void 0}],[]),null);sB(LA,(ZB,NA)=>{ZB?pB(ZB):bB(NA)})})}),q.ref(),$B.dispose=()=>{eB||(eB=!0,l(q,{command:"rebuild-dispose",key:I},()=>{}),q.unref())}}oB.rebuild=$B}if(V.watch){if(!tB){let eB=!1;q.ref(),tB=()=>{eB||(eB=!0,n.delete(I),l(q,{command:"watch-stop",key:I},()=>{}),q.unref())},X&&n.set(I,(bB,pB)=>{if(bB){X.onRebuild&&X.onRebuild(bB,null);return}let QB={errors:HB(pB.errors,O),warnings:HB(pB.warnings,O)};jB(pB,QB),Y(QB,U,()=>{if(QB.errors.length>0){X.onRebuild&&X.onRebuild(CB("Build failed",QB.errors,QB.warnings),null);return}pB.rebuildID!==void 0&&(QB.rebuild=$B),QB.stop=tB,X.onRebuild&&X.onRebuild(null,QB)})})}oB.stop=tB}aB(null,oB)})};if(b&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(PB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(X&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');l(q,F,(V,aB)=>{if(V)return W(new Error(V),null);if(iB){let oB=aB,eB=!1;q.ref();let bB={port:oB.port,host:oB.host,wait:iB.wait,stop(){eB||(eB=!0,iB.stop(),q.unref())}};return q.ref(),iB.wait.then(q.unref,q.unref),W(null,bB)}return sB(aB,W)})};return{readFromStdout:L,afterClose:H,service:{buildOrServe:R,transform:({callName:r,refs:a,input:i,options:h,isTTY:N,fs:S,callback:W})=>{let I=aA(),O=U=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:v,mangleCache:Y}=HA(r,h,N,C),D={command:"transform",flags:v,inputFS:U!==null,input:U!==null?XB(U):typeof i=="string"?XB(i):i};Y&&(D.mangleCache=Y),l(a,D,(q,AB)=>{if(q)return W(new Error(q),null);let cB=HB(AB.errors,I),_=HB(AB.warnings,I),b=1,t=()=>{if(--b===0){let d={warnings:_,code:AB.code,map:AB.map};AB.mangleCache&&(d.mangleCache=AB?.mangleCache),W(null,d)}};if(cB.length>0)return W(CB("Transform failed",cB,_),null);AB.codeFS&&(b++,S.readFile(AB.code,(d,z)=>{d!==null?W(d,null):(AB.code=z,t())})),AB.mapFS&&(b++,S.readFile(AB.map,(d,z)=>{d!==null?W(d,null):(AB.map=z,t())})),t()})}catch(v){let Y=[];try{LB(Y,h,{},N,C)}catch{}let D=yB(v,B,I,void 0,"");l(a,{command:"error",flags:Y,error:D},()=>{D.detail=I.load(D.detail),W(CB("Transform failed",[D],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let U=O;O=()=>S.writeFile(i,U)}O(null)},formatMessages:({callName:r,refs:a,messages:i,options:h,callback:N})=>{let S=SB(i,"messages",null,"");if(!h)throw new Error(`Missing second argument in ${r}() call`);let W={},I=P(h,W,"kind",m),O=P(h,W,"color",Z),U=P(h,W,"terminalWidth",MB);if(rB(h,W,`in ${r}() call`),I===void 0)throw new Error(`Missing "kind" in ${r}() call`);if(I!=="error"&&I!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${r}() call`);let v={command:"format-msgs",messages:S,isWarning:I==="warning"};O!==void 0&&(v.color=O),U!==void 0&&(v.terminalWidth=U),l(a,v,(Y,D)=>{if(Y)return N(new Error(Y),null);N(null,D.messages)})},analyzeMetafile:({callName:r,refs:a,metafile:i,options:h,callback:N})=>{h===void 0&&(h={});let S={},W=P(h,S,"color",Z),I=P(h,S,"verbose",Z);rB(h,S,`in ${r}() call`);let O={command:"analyze-metafile",metafile:i};W!==void 0&&(O.color=W),I!==void 0&&(O.verbose=I),l(a,O,(U,v)=>{if(U)return N(new Error(U),null);N(null,v.result)})}}}}function aA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let n=A++;return B.set(n,k),n}}}function NB(B,A,k){let n,p=!1;return()=>{if(p)return n;p=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let e=iA(A,u,k);if(e)return n={text:B.message,location:e},n}catch{}}}function yB(B,A,k,n,p){let u="Internal error",e=null;try{u=(B&&B.message||B)+""}catch{}try{e=iA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:p,text:u,location:e,notes:n?[n]:[],detail:k?k.store(B):-1}}function iA(B,A,k){let n="    at ";if(B.readFileSync&&!A[0].startsWith(n)&&A[1].startsWith(n))for(let p=1;p<A.length;p++){let u=A[p];if(!!u.startsWith(n))for(u=u.slice(n.length);;){let e=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(e){u=e[1];continue}if(e=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),e){u=e[1];continue}if(e=/^(\S+):(\d+):(\d+)$/.exec(u),e){let c;try{c=B.readFileSync(e[1],"utf8")}catch{break}let E=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+e[2]-1]||"",f=+e[3]-1,L=E.slice(f,f+k.length)===k?k.length:0;return{file:e[1],namespace:"file",line:+e[2],column:XB(E.slice(0,f)).length,length:XB(E.slice(f,f+L)).length,lineText:E+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function CB(B,A,k){let n=5,p=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,n+1).map((e,c)=>{if(c===n)return`
...`;if(!e.location)return`
error: ${e.text}`;let{file:E,line:f,column:L}=e.location,H=e.pluginName?`[plugin: ${e.pluginName}] `:"";return`
${E}:${f}:${L}: ERROR: ${H}${e.text}`}).join(""),u=new Error(`${B}${p}`);return u.errors=A,u.warnings=k,u}function HB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function sA(B,A){if(B==null)return null;let k={},n=P(B,k,"file",m),p=P(B,k,"namespace",m),u=P(B,k,"line",MB),e=P(B,k,"column",MB),c=P(B,k,"length",MB),E=P(B,k,"lineText",m),f=P(B,k,"suggestion",m);return rB(B,k,A),{file:n||"",namespace:p||"",line:u||0,column:e||0,length:c||0,lineText:E||"",suggestion:f||""}}function SB(B,A,k,n){let p=[],u=0;for(let e of B){let c={},E=P(e,c,"id",m),f=P(e,c,"pluginName",m),L=P(e,c,"text",m),H=P(e,c,"location",eA),l=P(e,c,"notes",EB),G=P(e,c,"detail",WB),K=`in element ${u} of "${A}"`;rB(e,c,K);let w=[];if(l)for(let j of l){let o={},Q=P(j,o,"text",m),x=P(j,o,"location",eA);rB(j,o,K),w.push({text:Q||"",location:sA(x,K)})}p.push({id:E||"",pluginName:f||n,text:L||"",location:sA(H,K),notes:w,detail:k?k.store(G):-1}),u++}return p}function GB(B,A){let k=[];for(let n of B){if(typeof n!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(n)}return k}function fA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){let n=this.contents;return(k===null||n!==A)&&(A=n,k=vB(n)),k}}}var xA="0.15.7",vA=B=>OB().build(B),MA=()=>{throw new Error('The "serve" API only works in node')},yA=(B,A)=>OB().transform(B,A),CA=(B,A)=>OB().formatMessages(B,A),wA=(B,A)=>OB().analyzeMetafile(B,A),RA=()=>{throw new Error('The "buildSync" API only works in node')},DA=()=>{throw new Error('The "transformSync" API only works in node')},IA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},_A=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wB,YB,OB=()=>{if(YB)return YB;throw wB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},FA=B=>{B=TA(B||{});let A=B.wasmURL,k=B.wasmModule,n=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(wB)throw new Error('Cannot call "initialize" more than once');return wB=WA(A||"",k,n),wB.catch(()=>{wB=void 0}),wB},WA=(B,A,k)=>xB(void 0,null,function*(){let n;if(A)n=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);n=yield c.arrayBuffer()}let p;if(k){let c=new Blob([`onmessage=((postMessage) => {
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
    })(postMessage)`],{type:"text/javascript"});p=new Worker(URL.createObjectURL(c))}else{let c=(E=>{var f=(l,G,K)=>new Promise((w,j)=>{var o=C=>{try{x(K.next(C))}catch(R){j(R)}},Q=C=>{try{x(K.throw(C))}catch(R){j(R)}},x=C=>C.done?w(C.value):Promise.resolve(C.value).then(o,Q);x((K=K.apply(l,G)).next())});let L,H={};for(let l=self;l;l=Object.getPrototypeOf(l))for(let G of Object.getOwnPropertyNames(l))G in H||Object.defineProperty(H,G,{get:()=>self[G]});return(()=>{let l=()=>{let w=new Error("not implemented");return w.code="ENOSYS",w};if(!H.fs){let w="";H.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(j,o){w+=K.decode(o);let Q=w.lastIndexOf(`
`);return Q!=-1&&(console.log(w.substr(0,Q)),w=w.substr(Q+1)),o.length},write(j,o,Q,x,C,R){if(Q!==0||x!==o.length||C!==null){R(l());return}let BB=this.writeSync(j,o);R(null,BB)},chmod(j,o,Q){Q(l())},chown(j,o,Q,x){x(l())},close(j,o){o(l())},fchmod(j,o,Q){Q(l())},fchown(j,o,Q,x){x(l())},fstat(j,o){o(l())},fsync(j,o){o(null)},ftruncate(j,o,Q){Q(l())},lchown(j,o,Q,x){x(l())},link(j,o,Q){Q(l())},lstat(j,o){o(l())},mkdir(j,o,Q){Q(l())},open(j,o,Q,x){x(l())},read(j,o,Q,x,C,R){R(l())},readdir(j,o){o(l())},readlink(j,o){o(l())},rename(j,o,Q){Q(l())},rmdir(j,o){o(l())},stat(j,o){o(l())},symlink(j,o,Q){Q(l())},truncate(j,o,Q){Q(l())},unlink(j,o){o(l())},utimes(j,o,Q,x){x(l())}}}if(H.process||(H.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw l()},pid:-1,ppid:-1,umask(){throw l()},cwd(){throw l()},chdir(){throw l()}}),!H.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!H.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!H.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!H.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let G=new TextEncoder("utf-8"),K=new TextDecoder("utf-8");H.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let w=($,s)=>{this.mem.setUint32($+0,s,!0),this.mem.setUint32($+4,Math.floor(s/4294967296),!0)},j=$=>{let s=this.mem.getUint32($+0,!0),M=this.mem.getInt32($+4,!0);return s+M*4294967296},o=$=>{let s=this.mem.getFloat64($,!0);if(s===0)return;if(!isNaN(s))return s;let M=this.mem.getUint32($,!0);return this._values[M]},Q=($,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,s,!0);return}if(s===void 0){this.mem.setFloat64($,0,!0);return}let r=this._ids.get(s);r===void 0&&(r=this._idPool.pop(),r===void 0&&(r=this._values.length),this._values[r]=s,this._goRefCounts[r]=0,this._ids.set(s,r)),this._goRefCounts[r]++;let a=0;switch(typeof s){case"object":s!==null&&(a=1);break;case"string":a=2;break;case"symbol":a=3;break;case"function":a=4;break}this.mem.setUint32($+4,2146959360|a,!0),this.mem.setUint32($,r,!0)},x=$=>{let s=j($+0),M=j($+8);return new Uint8Array(this._inst.exports.mem.buffer,s,M)},C=$=>{let s=j($+0),M=j($+8),r=new Array(M);for(let a=0;a<M;a++)r[a]=o(s+a*8);return r},R=$=>{let s=j($+0),M=j($+8);return K.decode(new DataView(this._inst.exports.mem.buffer,s,M))},BB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":$=>{$>>>=0;let s=j($+8),M=j($+16),r=this.mem.getInt32($+24,!0);H.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,M,r))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,w($+8,(BB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let s=new Date().getTime();w($+8,s/1e3),this.mem.setInt32($+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},j($+8)+1)),this.mem.setInt32($+16,s,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(x($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let s=this.mem.getUint32($+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){let M=this._values[s];this._values[s]=null,this._ids.delete(M),this._idPool.push(s)}},"syscall/js.stringVal":$=>{$>>>=0,Q($+24,R($+8))},"syscall/js.valueGet":$=>{$>>>=0;let s=Reflect.get(o($+8),R($+16));$=this._inst.exports.getsp()>>>0,Q($+32,s)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(o($+8),R($+16),o($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(o($+8),R($+16))},"syscall/js.valueIndex":$=>{$>>>=0,Q($+24,Reflect.get(o($+8),j($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(o($+8),j($+16),o($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let s=o($+8),M=Reflect.get(s,R($+16)),r=C($+32),a=Reflect.apply(M,s,r);$=this._inst.exports.getsp()>>>0,Q($+56,a),this.mem.setUint8($+64,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+56,s),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let s=o($+8),M=C($+16),r=Reflect.apply(s,void 0,M);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let s=o($+8),M=C($+16),r=Reflect.construct(s,M);$=this._inst.exports.getsp()>>>0,Q($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,Q($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,w($+16,parseInt(o($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let s=G.encode(String(o($+8)));Q($+16,s),w($+24,s.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let s=o($+8);x($+16).set(s)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,o($+8)instanceof o($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let s=x($+8),M=o($+32);if(!(M instanceof Uint8Array||M instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=M.subarray(0,s.length);s.set(r),w($+40,r.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let s=o($+8),M=x($+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=M.subarray(0,s.length);s.set(r),w($+40,r.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(w){return f(this,null,function*(){if(!(w instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=w,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,H,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[H,5],[this,6]]),this._idPool=[],this.exited=!1;let j=4096,o=$=>{let s=j,M=G.encode($+"\0");return new Uint8Array(this.mem.buffer,j,M.length).set(M),j+=M.length,j%8!==0&&(j+=8-j%8),s},Q=this.argv.length,x=[];this.argv.forEach($=>{x.push(o($))}),x.push(0),Object.keys(this.env).sort().forEach($=>{x.push(o(`${$}=${this.env[$]}`))}),x.push(0);let R=j;x.forEach($=>{this.mem.setUint32(j,$,!0),this.mem.setUint32(j+4,0,!0),j+=8});let BB=4096+8192;if(j>=BB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(Q,R),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(w){let j=this;return function(){let o={id:w,this:this,args:arguments};return j._pendingEvent=o,j._resume(),o.result}}}})(),L=({data:l})=>{let G=new TextDecoder,K=H.fs,w="";K.writeSync=(C,R)=>{if(C===1)E(R);else if(C===2){w+=G.decode(R);let BB=w.split(`
`);BB.length>1&&console.log(BB.slice(0,-1).join(`
`)),w=BB[BB.length-1]}else throw new Error("Bad write");return R.length};let j=[],o,Q=0;L=({data:C})=>{C.length>0&&(j.push(C),o&&o())},K.read=(C,R,BB,$,s,M)=>{if(C!==0||BB!==0||$!==R.length||s!==null)throw new Error("Bad read");if(j.length===0){o=()=>K.read(C,R,BB,$,s,M);return}let r=j[0],a=Math.max(0,Math.min($,r.length-Q));R.set(r.subarray(Q,Q+a),BB),Q+=a,Q===r.length&&(j.shift(),Q=0),M(null,a)};let x=new H.Go;x.argv=["","--service=0.15.7"],l instanceof WebAssembly.Module?WebAssembly.instantiate(l,x.importObject).then(C=>x.run(C)):WebAssembly.instantiate(l,x.importObject).then(({instance:C})=>x.run(C))},l=>L(l)})(E=>p.onmessage({data:E}));p={onmessage:null,postMessage:E=>setTimeout(()=>c({data:E})),terminate(){}}}p.postMessage(n),p.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:e}=SA({writeToStdin(c){p.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:FB});YB={build:c=>new Promise((E,f)=>e.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(L,H)=>L?f(L):E(H)})),transform:(c,E)=>new Promise((f,L)=>e.transform({callName:"transform",refs:null,input:c,options:E||{},isTTY:!1,fs:{readFile(H,l){l(new Error("Internal error"),null)},writeFile(H,l){l(null)}},callback:(H,l)=>H?L(H):f(l)})),formatMessages:(c,E)=>new Promise((f,L)=>e.formatMessages({callName:"formatMessages",refs:null,messages:c,options:E,callback:(H,l)=>H?L(H):f(l)})),analyzeMetafile:(c,E)=>new Promise((f,L)=>e.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:E,callback:(H,l)=>H?L(H):f(l)}))}}),UA=FB})(typeof BA=="object"?BA:{set exports(uB){(typeof self<"u"?self:this).esbuild=uB}})});RB();RB();var YA=new Error("timeout while waiting for mutex to become available"),ZA=new Error("mutex already locked"),qA=new Error("request for lock canceled"),JA=function(uB,g,y,kB){function TB(lB){return lB instanceof y?lB:new y(function(hB){hB(lB)})}return new(y||(y=Promise))(function(lB,hB){function fB(nB){try{mB(kB.next(nB))}catch(dB){hB(dB)}}function DB(nB){try{mB(kB.throw(nB))}catch(dB){hB(dB)}}function mB(nB){nB.done?lB(nB.value):TB(nB.value).then(fB,DB)}mB((kB=kB.apply(uB,g||[])).next())})},zB=class{constructor(g,y=qA){this._value=g,this._cancelError=y,this._weightedQueues=[],this._weightedWaiters=[]}acquire(g=1){if(g<=0)throw new Error(`invalid weight ${g}: must be positive`);return new Promise((y,kB)=>{this._weightedQueues[g-1]||(this._weightedQueues[g-1]=[]),this._weightedQueues[g-1].push({resolve:y,reject:kB}),this._dispatch()})}runExclusive(g,y=1){return JA(this,void 0,void 0,function*(){let[kB,TB]=yield this.acquire(y);try{return yield g(kB)}finally{TB()}})}waitForUnlock(g=1){if(g<=0)throw new Error(`invalid weight ${g}: must be positive`);return new Promise(y=>{this._weightedWaiters[g-1]||(this._weightedWaiters[g-1]=[]),this._weightedWaiters[g-1].push(y),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(g){this._value=g,this._dispatch()}release(g=1){if(g<=0)throw new Error(`invalid weight ${g}: must be positive`);this._value+=g,this._dispatch()}cancel(){this._weightedQueues.forEach(g=>g.forEach(y=>y.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var g;for(let y=this._value;y>0;y--){let kB=(g=this._weightedQueues[y-1])===null||g===void 0?void 0:g.shift();if(!kB)continue;let TB=this._value,lB=y;this._value-=y,y=this._value+1,kB.resolve([TB,this._newReleaser(lB)])}this._drainUnlockWaiters()}_newReleaser(g){let y=!1;return()=>{y||(y=!0,this.release(g))}}_drainUnlockWaiters(){for(let g=this._value;g>0;g--)!this._weightedWaiters[g-1]||(this._weightedWaiters[g-1].forEach(y=>y()),this._weightedWaiters[g-1]=[])}},VA=function(uB,g,y,kB){function TB(lB){return lB instanceof y?lB:new y(function(hB){hB(lB)})}return new(y||(y=Promise))(function(lB,hB){function fB(nB){try{mB(kB.next(nB))}catch(dB){hB(dB)}}function DB(nB){try{mB(kB.throw(nB))}catch(dB){hB(dB)}}function mB(nB){nB.done?lB(nB.value):TB(nB.value).then(fB,DB)}mB((kB=kB.apply(uB,g||[])).next())})},qB=class{constructor(g){this._semaphore=new zB(1,g)}acquire(){return VA(this,void 0,void 0,function*(){let[,g]=yield this._semaphore.acquire();return g})}runExclusive(g){return this._semaphore.runExclusive(()=>g())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var JB=OA(lA(),1);var jA="./chunk-esbuild-ZTDJQG3V.wasm";var _B={initialize:JB.initialize,mutex:new qB,transform:async(uB,g)=>{let y;return await _B.mutex.runExclusive(async()=>{try{return console.info("esbuild start"),y=await(0,JB.transform)(uB,g),console.info("esbuild transpile done"),y}catch(kB){throw console.error("Ebuild transform error: ",{code:uB,err:kB}),kB}}),y}},IB=!1,t7=async()=>{try{if(IB===!0||(IB=IB||new Promise(uB=>{_B.initialize({wasmURL:new URL(jA,import.meta.url).toString()}).then(()=>uB(!0))}),await IB===!0))return _B;throw new Error("esbuild couldn't initialize")}catch{throw new Error("esbuild couldn't initialize")}finally{if(await IB===!0)return _B;throw new Error("esbuild couldn't initialize")}};export{t7 as init};
