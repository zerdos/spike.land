import{a as oA}from"./chunk-QBSDP3A6.mjs";import{b as qA,d as JA,f as RB}from"./chunk-WOIYS7FW.mjs";var pA=qA((P7,ZB)=>{"use strict";RB();(cB=>{var C=Object.defineProperty,V=Object.defineProperties,sB=Object.getOwnPropertyDescriptor,bB=Object.getOwnPropertyDescriptors,uB=Object.getOwnPropertyNames,hB=Object.getOwnPropertySymbols,xB=Object.prototype.hasOwnProperty,DB=Object.prototype.propertyIsEnumerable,QB=(B,A,k)=>A in B?C(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,tB=(B,A)=>{for(var k in A||(A={}))xB.call(A,k)&&QB(B,k,A[k]);if(hB)for(var k of hB(A))DB.call(A,k)&&QB(B,k,A[k]);return B},dB=(B,A)=>V(B,bB(A)),cA=(B,A)=>{for(var k in A)C(B,k,{get:A[k],enumerable:!0})},hA=(B,A,k,n)=>{if(A&&typeof A=="object"||typeof A=="function")for(let p of uB(A))!xB.call(B,p)&&p!==k&&C(B,p,{get:()=>A[p],enumerable:!(n=sB(A,p))||n.enumerable});return B},mA=B=>hA(C({},"__esModule",{value:!0}),B),fB=(B,A,k)=>new Promise((n,p)=>{var u=E=>{try{c(k.next(E))}catch(S){p(S)}},e=E=>{try{c(k.throw(E))}catch(S){p(S)}},c=E=>E.done?n(E.value):Promise.resolve(E.value).then(u,e);c((k=k.apply(B,A)).next())}),IB={};cA(IB,{analyzeMetafile:()=>DA,analyzeMetafileSync:()=>WA,build:()=>yA,buildSync:()=>IA,default:()=>NA,formatMessages:()=>RA,formatMessagesSync:()=>FA,initialize:()=>UA,serve:()=>CA,transform:()=>wA,transformSync:()=>_A,version:()=>MA}),cB.exports=mA(IB);function AA(B){let A=n=>{if(n===null)k.write8(0);else if(typeof n=="boolean")k.write8(1),k.write8(+n);else if(typeof n=="number")k.write8(2),k.write32(n|0);else if(typeof n=="string")k.write8(3),k.write(gB(n));else if(n instanceof Uint8Array)k.write8(4),k.write(n);else if(n instanceof Array){k.write8(5),k.write32(n.length);for(let p of n)A(p)}else{let p=Object.keys(n);k.write8(6),k.write32(p.length);for(let u of p)k.write(gB(u)),A(n[u])}},k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),qB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function QA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return vB(k.read());case 4:return k.read();case 5:{let e=k.read32(),c=[];for(let E=0;E<e;E++)c.push(A());return c}case 6:{let e=k.read32(),c={};for(let E=0;E<e;E++)c[vB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new $A(B),n=k.read32(),p=(n&1)===0;n>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:n,isRequest:p,value:u}}var $A=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);qB(this.buf,B,A)}write(B){let A=this._write(4+B.length);qB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},gB,vB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;gB=k=>B.encode(k),vB=k=>A.decode(k)}else if(typeof Buffer<"u")gB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},vB=B=>{let{buffer:A,byteOffset:k,byteLength:n}=B;return Buffer.from(A,k,n).toString()};else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function qB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var _B=()=>null,Z=B=>typeof B=="boolean"?null:"a boolean",dA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",Q=B=>typeof B=="string"?null:"a string",FB=B=>B instanceof RegExp?null:"a RegExp object",MB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",JB=B=>typeof B=="function"?null:"a function",eB=B=>Array.isArray(B)?null:"an array",TB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",gA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",TA=B=>typeof B=="object"&&B!==null?null:"an array or an object",eA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",EA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",XA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",HA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",tA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,n){let p=B[k];if(A[k+""]=!0,p===void 0)return;let u=n(p);if(u!==null)throw new Error(`"${k}" must be ${u}`);return p}function nB(B,A,k){for(let n in B)if(!(n in A))throw new Error(`Invalid option ${k}: "${n}"`)}function bA(B){let A=Object.create(null),k=P(B,A,"wasmURL",Q),n=P(B,A,"wasmModule",gA),p=P(B,A,"worker",Z);return nB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:n,worker:p}}function nA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let n=B[k];if(typeof n=="string"||n===!1)A[k]=n;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function WB(B,A,k,n,p){let u=P(A,k,"color",Z),e=P(A,k,"logLevel",Q),c=P(A,k,"logLimit",MB);u!==void 0?B.push(`--color=${u}`):n&&B.push("--color=true"),B.push(`--log-level=${e||p}`),B.push(`--log-limit=${c||0}`)}function rA(B,A,k){let n=P(A,k,"legalComments",Q),p=P(A,k,"sourceRoot",Q),u=P(A,k,"sourcesContent",Z),e=P(A,k,"target",HA),c=P(A,k,"format",Q),E=P(A,k,"globalName",Q),S=P(A,k,"mangleProps",FB),U=P(A,k,"reserveProps",FB),H=P(A,k,"mangleQuoted",Z),l=P(A,k,"minify",Z),N=P(A,k,"minifySyntax",Z),K=P(A,k,"minifyWhitespace",Z),y=P(A,k,"minifyIdentifiers",Z),j=P(A,k,"drop",eB),o=P(A,k,"charset",Q),m=P(A,k,"treeShaking",Z),x=P(A,k,"ignoreAnnotations",Z),M=P(A,k,"jsx",Q),w=P(A,k,"jsxFactory",Q),BB=P(A,k,"jsxFragment",Q),$=P(A,k,"jsxImportSource",Q),s=P(A,k,"jsxDev",Z),v=P(A,k,"define",TB),r=P(A,k,"logOverride",TB),a=P(A,k,"supported",TB),i=P(A,k,"pure",eB),h=P(A,k,"keepNames",Z),L=P(A,k,"platform",Q);if(n&&B.push(`--legal-comments=${n}`),p!==void 0&&B.push(`--source-root=${p}`),u!==void 0&&B.push(`--sources-content=${u}`),e&&(Array.isArray(e)?B.push(`--target=${Array.from(e).map(PA).join(",")}`):B.push(`--target=${PA(e)}`)),c&&B.push(`--format=${c}`),E&&B.push(`--global-name=${E}`),L&&B.push(`--platform=${L}`),l&&B.push("--minify"),N&&B.push("--minify-syntax"),K&&B.push("--minify-whitespace"),y&&B.push("--minify-identifiers"),o&&B.push(`--charset=${o}`),m!==void 0&&B.push(`--tree-shaking=${m}`),x&&B.push("--ignore-annotations"),j)for(let b of j)B.push(`--drop:${b}`);if(S&&B.push(`--mangle-props=${S.source}`),U&&B.push(`--reserve-props=${U.source}`),H!==void 0&&B.push(`--mangle-quoted=${H}`),M&&B.push(`--jsx=${M}`),w&&B.push(`--jsx-factory=${w}`),BB&&B.push(`--jsx-fragment=${BB}`),$&&B.push(`--jsx-import-source=${$}`),s&&B.push("--jsx-dev"),v)for(let b in v){if(b.indexOf("=")>=0)throw new Error(`Invalid define: ${b}`);B.push(`--define:${b}=${v[b]}`)}if(r)for(let b in r){if(b.indexOf("=")>=0)throw new Error(`Invalid log override: ${b}`);B.push(`--log-override:${b}=${r[b]}`)}if(a)for(let b in a){if(b.indexOf("=")>=0)throw new Error(`Invalid supported: ${b}`);B.push(`--supported:${b}=${a[b]}`)}if(i)for(let b of i)B.push(`--pure:${b}`);h&&B.push("--keep-names")}function SA(B,A,k,n,p){var u;let e=[],c=[],E=Object.create(null),S=null,U=null,H=null;WB(e,A,E,k,n),rA(e,A,E);let l=P(A,E,"sourcemap",EA),N=P(A,E,"bundle",Z),K=P(A,E,"watch",dA),y=P(A,E,"splitting",Z),j=P(A,E,"preserveSymlinks",Z),o=P(A,E,"metafile",Z),m=P(A,E,"outfile",Q),x=P(A,E,"outdir",Q),M=P(A,E,"outbase",Q),w=P(A,E,"tsconfig",Q),BB=P(A,E,"resolveExtensions",eB),$=P(A,E,"nodePaths",eB),s=P(A,E,"mainFields",eB),v=P(A,E,"conditions",eB),r=P(A,E,"external",eB),a=P(A,E,"loader",TB),i=P(A,E,"outExtension",TB),h=P(A,E,"publicPath",Q),L=P(A,E,"entryNames",Q),b=P(A,E,"chunkNames",Q),F=P(A,E,"assetNames",Q),D=P(A,E,"inject",eB),O=P(A,E,"banner",TB),W=P(A,E,"footer",TB),f=P(A,E,"entryPoints",TA),Y=P(A,E,"absWorkingDir",Q),R=P(A,E,"stdin",TB),G=(u=P(A,E,"write",Z))!=null?u:p,AB=P(A,E,"allowOverwrite",Z),pB=P(A,E,"incremental",Z)===!0,I=P(A,E,"mangleCache",TB);if(E.plugins=!0,nB(A,E,`in ${B}() call`),l&&e.push(`--sourcemap${l===!0?"":`=${l}`}`),N&&e.push("--bundle"),AB&&e.push("--allow-overwrite"),K)if(e.push("--watch"),typeof K=="boolean")H={};else{let t=Object.create(null),d=P(K,t,"onRebuild",JB);nB(K,t,`on "watch" in ${B}() call`),H={onRebuild:d}}if(y&&e.push("--splitting"),j&&e.push("--preserve-symlinks"),o&&e.push("--metafile"),m&&e.push(`--outfile=${m}`),x&&e.push(`--outdir=${x}`),M&&e.push(`--outbase=${M}`),w&&e.push(`--tsconfig=${w}`),BB){let t=[];for(let d of BB){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${d}`);t.push(d)}e.push(`--resolve-extensions=${t.join(",")}`)}if(h&&e.push(`--public-path=${h}`),L&&e.push(`--entry-names=${L}`),b&&e.push(`--chunk-names=${b}`),F&&e.push(`--asset-names=${F}`),s){let t=[];for(let d of s){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid main field: ${d}`);t.push(d)}e.push(`--main-fields=${t.join(",")}`)}if(v){let t=[];for(let d of v){if(d+="",d.indexOf(",")>=0)throw new Error(`Invalid condition: ${d}`);t.push(d)}e.push(`--conditions=${t.join(",")}`)}if(r)for(let t of r)e.push(`--external:${t}`);if(O)for(let t in O){if(t.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${t}`);e.push(`--banner:${t}=${O[t]}`)}if(W)for(let t in W){if(t.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${t}`);e.push(`--footer:${t}=${W[t]}`)}if(D)for(let t of D)e.push(`--inject:${t}`);if(a)for(let t in a){if(t.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${t}`);e.push(`--loader:${t}=${a[t]}`)}if(i)for(let t in i){if(t.indexOf("=")>=0)throw new Error(`Invalid out extension: ${t}`);e.push(`--out-extension:${t}=${i[t]}`)}if(f)if(Array.isArray(f))for(let t of f)c.push(["",t+""]);else for(let[t,d]of Object.entries(f))c.push([t+"",d+""]);if(R){let t=Object.create(null),d=P(R,t,"contents",tA),z=P(R,t,"resolveDir",Q),kB=P(R,t,"sourcefile",Q),T=P(R,t,"loader",Q);nB(R,t,'in "stdin" object'),kB&&e.push(`--sourcefile=${kB}`),T&&e.push(`--loader=${T}`),z&&(U=z+""),typeof d=="string"?S=gB(d):d instanceof Uint8Array&&(S=d)}let X=[];if($)for(let t of $)t+="",X.push(t);return{entries:c,flags:e,write:G,stdinContents:S,stdinResolveDir:U,absWorkingDir:Y,incremental:pB,nodePaths:X,watch:H,mangleCache:nA(I)}}function xA(B,A,k,n){let p=[],u=Object.create(null);WB(p,A,u,k,n),rA(p,A,u);let e=P(A,u,"sourcemap",EA),c=P(A,u,"tsconfigRaw",XA),E=P(A,u,"sourcefile",Q),S=P(A,u,"loader",Q),U=P(A,u,"banner",Q),H=P(A,u,"footer",Q),l=P(A,u,"mangleCache",TB);return nB(A,u,`in ${B}() call`),e&&p.push(`--sourcemap=${e===!0?"external":e}`),c&&p.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),E&&p.push(`--sourcefile=${E}`),S&&p.push(`--loader=${S}`),U&&p.push(`--banner=${U}`),H&&p.push(`--footer=${H}`),{flags:p,mangleCache:nA(l)}}function fA(B){let A=new Map,k=new Map,n=new Map,p=new Map,u=null,e=0,c=0,E=new Uint8Array(16*1024),S=0,U=r=>{let a=S+r.length;if(a>E.length){let h=new Uint8Array(a*2);h.set(E),E=h}E.set(r,S),S+=r.length;let i=0;for(;i+4<=S;){let h=kA(E,i);if(i+4+h>S)break;i+=4,j(E.subarray(i,i+h)),i+=h}i>0&&(E.copyWithin(0,i,S),S-=i)},H=r=>{u={reason:r?": "+(r.message||r):""};let a="The service was stopped"+u.reason;for(let i of A.values())i(a,null);A.clear();for(let i of p.values())i.onWait(a);p.clear();for(let i of n.values())try{i(new Error(a),null)}catch(h){console.error(h)}n.clear()},l=(r,a,i)=>{if(u)return i("The service is no longer running"+u.reason,null);let h=e++;A.set(h,(L,b)=>{try{i(L,b)}finally{r&&r.unref()}}),r&&r.ref(),B.writeToStdin(AA({id:h,isRequest:!0,value:a}))},N=(r,a)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(AA({id:r,isRequest:!1,value:a}))},K=(r,a)=>fB(this,null,function*(){try{switch(a.command){case"ping":{N(r,{});break}case"on-start":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"on-resolve":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"on-load":{let i=k.get(a.key);i?N(r,yield i(a)):N(r,{});break}case"serve-request":{let i=p.get(a.key);i&&i.onRequest&&i.onRequest(a.args),N(r,{});break}case"serve-wait":{let i=p.get(a.key);i&&i.onWait(a.error),N(r,{});break}case"watch-rebuild":{let i=n.get(a.key);try{i&&i(null,a.args)}catch(h){console.error(h)}N(r,{});break}default:throw new Error("Invalid command: "+a.command)}}catch(i){N(r,{errors:[yB(i,B,null,void 0,"")]})}}),y=!0,j=r=>{if(y){y=!1;let i=String.fromCharCode(...r);if(i!=="0.14.53")throw new Error(`Cannot start service: Host version "0.14.53" does not match binary version ${JSON.stringify(i)}`);return}let a=QA(r);if(a.isRequest)K(a.id,a.value);else{let i=A.get(a.id);A.delete(a.id),a.value.error?i(a.value.error,{}):i(null,a.value)}},o=(r,a,i,h,L)=>fB(this,null,function*(){let b=[],F=[],D={},O={},W=0,f=0,Y=[],R=!1;a=[...a];for(let I of a){let X={};if(typeof I!="object")throw new Error(`Plugin at index ${f} must be an object`);let t=P(I,X,"name",Q);if(typeof t!="string"||t==="")throw new Error(`Plugin at index ${f} is missing a name`);try{let d=P(I,X,"setup",JB);if(typeof d!="function")throw new Error("Plugin is missing a setup function");nB(I,X,`on plugin ${JSON.stringify(t)}`);let z={name:t,onResolve:[],onLoad:[]};f++;let T=d({initialOptions:r,resolve:(g,q={})=>{if(!R)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof g!="string")throw new Error("The path to resolve must be a string");let _=Object.create(null),aB=P(q,_,"pluginName",Q),$B=P(q,_,"importer",Q),EB=P(q,_,"namespace",Q),lB=P(q,_,"resolveDir",Q),iB=P(q,_,"kind",Q),J=P(q,_,"pluginData",_B);return nB(q,_,"in resolve() call"),new Promise((rB,oB)=>{let PB={command:"resolve",path:g,key:i,pluginName:t};aB!=null&&(PB.pluginName=aB),$B!=null&&(PB.importer=$B),EB!=null&&(PB.namespace=EB),lB!=null&&(PB.resolveDir=lB),iB!=null&&(PB.kind=iB),J!=null&&(PB.pluginData=h.store(J)),l(L,PB,(XB,jB)=>{XB!==null?oB(new Error(XB)):rB({errors:HB(jB.errors,h),warnings:HB(jB.warnings,h),path:jB.path,external:jB.external,sideEffects:jB.sideEffects,namespace:jB.namespace,suffix:jB.suffix,pluginData:h.load(jB.pluginData)})})})},onStart(g){let q='This error came from the "onStart" callback registered here:',_=UB(new Error(q),B,"onStart");b.push({name:t,callback:g,note:_})},onEnd(g){let q='This error came from the "onEnd" callback registered here:',_=UB(new Error(q),B,"onEnd");F.push({name:t,callback:g,note:_})},onResolve(g,q){let _='This error came from the "onResolve" callback registered here:',aB=UB(new Error(_),B,"onResolve"),$B={},EB=P(g,$B,"filter",FB),lB=P(g,$B,"namespace",Q);if(nB(g,$B,`in onResolve() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onResolve() call is missing a filter");let iB=W++;D[iB]={name:t,callback:q,note:aB},z.onResolve.push({id:iB,filter:EB.source,namespace:lB||""})},onLoad(g,q){let _='This error came from the "onLoad" callback registered here:',aB=UB(new Error(_),B,"onLoad"),$B={},EB=P(g,$B,"filter",FB),lB=P(g,$B,"namespace",Q);if(nB(g,$B,`in onLoad() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onLoad() call is missing a filter");let iB=W++;O[iB]={name:t,callback:q,note:aB},z.onLoad.push({id:iB,filter:EB.source,namespace:lB||""})},esbuild:B.esbuild});T&&(yield T),Y.push(z)}catch(d){return{ok:!1,error:d,pluginName:t}}}let G=I=>fB(this,null,function*(){switch(I.command){case"on-start":{let X={errors:[],warnings:[]};return yield Promise.all(b.map(t=>fB(this,[t],function*({name:d,callback:z,note:kB}){try{let T=yield z();if(T!=null){if(typeof T!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(d)} to return an object`);let g={},q=P(T,g,"errors",eB),_=P(T,g,"warnings",eB);nB(T,g,`from onStart() callback in plugin ${JSON.stringify(d)}`),q!=null&&X.errors.push(...SB(q,"errors",h,d)),_!=null&&X.warnings.push(...SB(_,"warnings",h,d))}}catch(T){X.errors.push(yB(T,B,h,kB&&kB(),d))}}))),X}case"on-resolve":{let X={},t="",d,z;for(let kB of I.ids)try{({name:t,callback:d,note:z}=D[kB]);let T=yield d({path:I.path,importer:I.importer,namespace:I.namespace,resolveDir:I.resolveDir,kind:I.kind,pluginData:h.load(I.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(t)} to return an object`);let g={},q=P(T,g,"pluginName",Q),_=P(T,g,"path",Q),aB=P(T,g,"namespace",Q),$B=P(T,g,"suffix",Q),EB=P(T,g,"external",Z),lB=P(T,g,"sideEffects",Z),iB=P(T,g,"pluginData",_B),J=P(T,g,"errors",eB),rB=P(T,g,"warnings",eB),oB=P(T,g,"watchFiles",eB),PB=P(T,g,"watchDirs",eB);nB(T,g,`from onResolve() callback in plugin ${JSON.stringify(t)}`),X.id=kB,q!=null&&(X.pluginName=q),_!=null&&(X.path=_),aB!=null&&(X.namespace=aB),$B!=null&&(X.suffix=$B),EB!=null&&(X.external=EB),lB!=null&&(X.sideEffects=lB),iB!=null&&(X.pluginData=h.store(iB)),J!=null&&(X.errors=SB(J,"errors",h,t)),rB!=null&&(X.warnings=SB(rB,"warnings",h,t)),oB!=null&&(X.watchFiles=LB(oB,"watchFiles")),PB!=null&&(X.watchDirs=LB(PB,"watchDirs"));break}}catch(T){return{id:kB,errors:[yB(T,B,h,z&&z(),t)]}}return X}case"on-load":{let X={},t="",d,z;for(let kB of I.ids)try{({name:t,callback:d,note:z}=O[kB]);let T=yield d({path:I.path,namespace:I.namespace,suffix:I.suffix,pluginData:h.load(I.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(t)} to return an object`);let g={},q=P(T,g,"pluginName",Q),_=P(T,g,"contents",tA),aB=P(T,g,"resolveDir",Q),$B=P(T,g,"pluginData",_B),EB=P(T,g,"loader",Q),lB=P(T,g,"errors",eB),iB=P(T,g,"warnings",eB),J=P(T,g,"watchFiles",eB),rB=P(T,g,"watchDirs",eB);nB(T,g,`from onLoad() callback in plugin ${JSON.stringify(t)}`),X.id=kB,q!=null&&(X.pluginName=q),_ instanceof Uint8Array?X.contents=_:_!=null&&(X.contents=gB(_)),aB!=null&&(X.resolveDir=aB),$B!=null&&(X.pluginData=h.store($B)),EB!=null&&(X.loader=EB),lB!=null&&(X.errors=SB(lB,"errors",h,t)),iB!=null&&(X.warnings=SB(iB,"warnings",h,t)),J!=null&&(X.watchFiles=LB(J,"watchFiles")),rB!=null&&(X.watchDirs=LB(rB,"watchDirs"));break}}catch(T){return{id:kB,errors:[yB(T,B,h,z&&z(),t)]}}return X}default:throw new Error("Invalid command: "+I.command)}}),AB=(I,X,t)=>t();F.length>0&&(AB=(I,X,t)=>{(()=>fB(this,null,function*(){for(let{name:d,callback:z,note:kB}of F)try{yield z(I)}catch(T){I.errors.push(yield new Promise(g=>X(T,d,kB&&kB(),g)))}}))().then(t)}),R=!0;let pB=0;return{ok:!0,requestPlugins:Y,runOnEndCallbacks:AB,pluginRefs:{ref(){++pB===1&&k.set(i,G)},unref(){--pB===0&&k.delete(i)}}}}),m=(r,a,i,h)=>{let L={},b=P(a,L,"port",MB),F=P(a,L,"host",Q),D=P(a,L,"servedir",Q),O=P(a,L,"onRequest",JB),W,f=new Promise((Y,R)=>{W=G=>{p.delete(h),G!==null?R(new Error(G)):Y()}});return i.serve={},nB(a,L,"in serve() call"),b!==void 0&&(i.serve.port=b),F!==void 0&&(i.serve.host=F),D!==void 0&&(i.serve.servedir=D),p.set(h,{onRequest:O,onWait:W}),{wait:f,stop(){l(r,{command:"serve-stop",key:h},()=>{})}}},x="warning",M="silent",w=r=>{let a=c++,i=aA(),h,{refs:L,options:b,isTTY:F,callback:D}=r;if(typeof b=="object"){let f=b.plugins;if(f!==void 0){if(!Array.isArray(f))throw new Error('"plugins" must be an array');h=f}}let O=(f,Y,R,G)=>{let AB=[];try{WB(AB,b,{},F,x)}catch{}let pB=yB(f,B,i,R,Y);l(L,{command:"error",flags:AB,error:pB},()=>{pB.detail=i.load(pB.detail),G(pB)})},W=(f,Y)=>{O(f,Y,void 0,R=>{D(CB("Build failed",[R],[]),null)})};if(h&&h.length>0){if(B.isSync)return W(new Error("Cannot use plugins in synchronous API calls"),"");o(b,h,a,i,L).then(f=>{if(!f.ok)W(f.error,f.pluginName);else try{BB(dB(tB({},r),{key:a,details:i,logPluginError:O,requestPlugins:f.requestPlugins,runOnEndCallbacks:f.runOnEndCallbacks,pluginRefs:f.pluginRefs}))}catch(Y){W(Y,"")}},f=>W(f,""))}else try{BB(dB(tB({},r),{key:a,details:i,logPluginError:O,requestPlugins:null,runOnEndCallbacks:(f,Y,R)=>R(),pluginRefs:null}))}catch(f){W(f,"")}},BB=({callName:r,refs:a,serveOptions:i,options:h,isTTY:L,defaultWD:b,callback:F,key:D,details:O,logPluginError:W,requestPlugins:f,runOnEndCallbacks:Y,pluginRefs:R})=>{let G={ref(){R&&R.ref(),a&&a.ref()},unref(){R&&R.unref(),a&&a.unref()}},AB=!B.isWriteUnavailable,{entries:pB,flags:I,write:X,stdinContents:t,stdinResolveDir:d,absWorkingDir:z,incremental:kB,nodePaths:T,watch:g,mangleCache:q}=SA(r,h,L,x,AB),_={command:"build",key:D,entries:pB,flags:I,write:X,stdinContents:t,stdinResolveDir:d,absWorkingDir:z||b,incremental:kB,nodePaths:T};f&&(_.plugins=f),q&&(_.mangleCache=q);let aB=i&&m(G,i,_,D),$B,EB,lB=(J,rB)=>{J.outputFiles&&(rB.outputFiles=J.outputFiles.map(vA)),J.metafile&&(rB.metafile=JSON.parse(J.metafile)),J.mangleCache&&(rB.mangleCache=J.mangleCache),J.writeToStdout!==void 0&&console.log(vB(J.writeToStdout).replace(/\n$/,""))},iB=(J,rB)=>{let oB={errors:HB(J.errors,O),warnings:HB(J.warnings,O)};lB(J,oB),Y(oB,W,()=>{if(oB.errors.length>0)return rB(CB("Build failed",oB.errors,oB.warnings),null);if(J.rebuild){if(!$B){let PB=!1;$B=()=>new Promise((XB,jB)=>{if(PB||u)throw new Error("Cannot rebuild");l(G,{command:"rebuild",key:D},(mB,OA)=>{if(mB)return rB(CB("Build failed",[{id:"",pluginName:"",text:mB,location:null,notes:[],detail:void 0}],[]),null);iB(OA,(KB,GA)=>{KB?jB(KB):XB(GA)})})}),G.ref(),$B.dispose=()=>{PB||(PB=!0,l(G,{command:"rebuild-dispose",key:D},()=>{}),G.unref())}}oB.rebuild=$B}if(J.watch){if(!EB){let PB=!1;G.ref(),EB=()=>{PB||(PB=!0,n.delete(D),l(G,{command:"watch-stop",key:D},()=>{}),G.unref())},g&&n.set(D,(XB,jB)=>{if(XB){g.onRebuild&&g.onRebuild(XB,null);return}let mB={errors:HB(jB.errors,O),warnings:HB(jB.warnings,O)};lB(jB,mB),Y(mB,W,()=>{if(mB.errors.length>0){g.onRebuild&&g.onRebuild(CB("Build failed",mB.errors,mB.warnings),null);return}jB.rebuildID!==void 0&&(mB.rebuild=$B),mB.stop=EB,g.onRebuild&&g.onRebuild(null,mB)})})}oB.stop=EB}rB(null,oB)})};if(X&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(kB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(g&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');l(G,_,(J,rB)=>{if(J)return F(new Error(J),null);if(aB){let oB=rB,PB=!1;G.ref();let XB={port:oB.port,host:oB.host,wait:aB.wait,stop(){PB||(PB=!0,aB.stop(),G.unref())}};return G.ref(),aB.wait.then(G.unref,G.unref),F(null,XB)}return iB(rB,F)})};return{readFromStdout:U,afterClose:H,service:{buildOrServe:w,transform:({callName:r,refs:a,input:i,options:h,isTTY:L,fs:b,callback:F})=>{let D=aA(),O=W=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:f,mangleCache:Y}=xA(r,h,L,M),R={command:"transform",flags:f,inputFS:W!==null,input:W!==null?gB(W):typeof i=="string"?gB(i):i};Y&&(R.mangleCache=Y),l(a,R,(G,AB)=>{if(G)return F(new Error(G),null);let pB=HB(AB.errors,D),I=HB(AB.warnings,D),X=1,t=()=>{if(--X===0){let d={warnings:I,code:AB.code,map:AB.map};AB.mangleCache&&(d.mangleCache=AB?.mangleCache),F(null,d)}};if(pB.length>0)return F(CB("Transform failed",pB,I),null);AB.codeFS&&(X++,b.readFile(AB.code,(d,z)=>{d!==null?F(d,null):(AB.code=z,t())})),AB.mapFS&&(X++,b.readFile(AB.map,(d,z)=>{d!==null?F(d,null):(AB.map=z,t())})),t()})}catch(f){let Y=[];try{WB(Y,h,{},L,M)}catch{}let R=yB(f,B,D,void 0,"");l(a,{command:"error",flags:Y,error:R},()=>{R.detail=D.load(R.detail),F(CB("Transform failed",[R],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let W=O;O=()=>b.writeFile(i,W)}O(null)},formatMessages:({callName:r,refs:a,messages:i,options:h,callback:L})=>{let b=SB(i,"messages",null,"");if(!h)throw new Error(`Missing second argument in ${r}() call`);let F={},D=P(h,F,"kind",Q),O=P(h,F,"color",Z),W=P(h,F,"terminalWidth",MB);if(nB(h,F,`in ${r}() call`),D===void 0)throw new Error(`Missing "kind" in ${r}() call`);if(D!=="error"&&D!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${r}() call`);let f={command:"format-msgs",messages:b,isWarning:D==="warning"};O!==void 0&&(f.color=O),W!==void 0&&(f.terminalWidth=W),l(a,f,(Y,R)=>{if(Y)return L(new Error(Y),null);L(null,R.messages)})},analyzeMetafile:({callName:r,refs:a,metafile:i,options:h,callback:L})=>{h===void 0&&(h={});let b={},F=P(h,b,"color",Z),D=P(h,b,"verbose",Z);nB(h,b,`in ${r}() call`);let O={command:"analyze-metafile",metafile:i};F!==void 0&&(O.color=F),D!==void 0&&(O.verbose=D),l(a,O,(W,f)=>{if(W)return L(new Error(W),null);L(null,f.result)})}}}}function aA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let n=A++;return B.set(n,k),n}}}function UB(B,A,k){let n,p=!1;return()=>{if(p)return n;p=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let e=iA(A,u,k);if(e)return n={text:B.message,location:e},n}catch{}}}function yB(B,A,k,n,p){let u="Internal error",e=null;try{u=(B&&B.message||B)+""}catch{}try{e=iA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:p,text:u,location:e,notes:n?[n]:[],detail:k?k.store(B):-1}}function iA(B,A,k){let n="    at ";if(B.readFileSync&&!A[0].startsWith(n)&&A[1].startsWith(n))for(let p=1;p<A.length;p++){let u=A[p];if(!!u.startsWith(n))for(u=u.slice(n.length);;){let e=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(e){u=e[1];continue}if(e=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),e){u=e[1];continue}if(e=/^(\S+):(\d+):(\d+)$/.exec(u),e){let c;try{c=B.readFileSync(e[1],"utf8")}catch{break}let E=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+e[2]-1]||"",S=+e[3]-1,U=E.slice(S,S+k.length)===k?k.length:0;return{file:e[1],namespace:"file",line:+e[2],column:gB(E.slice(0,S)).length,length:gB(E.slice(S,S+U)).length,lineText:E+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function CB(B,A,k){let n=5,p=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,n+1).map((e,c)=>{if(c===n)return`
...`;if(!e.location)return`
error: ${e.text}`;let{file:E,line:S,column:U}=e.location,H=e.pluginName?`[plugin: ${e.pluginName}] `:"";return`
${E}:${S}:${U}: ERROR: ${H}${e.text}`}).join(""),u=new Error(`${B}${p}`);return u.errors=A,u.warnings=k,u}function HB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function sA(B,A){if(B==null)return null;let k={},n=P(B,k,"file",Q),p=P(B,k,"namespace",Q),u=P(B,k,"line",MB),e=P(B,k,"column",MB),c=P(B,k,"length",MB),E=P(B,k,"lineText",Q),S=P(B,k,"suggestion",Q);return nB(B,k,A),{file:n||"",namespace:p||"",line:u||0,column:e||0,length:c||0,lineText:E||"",suggestion:S||""}}function SB(B,A,k,n){let p=[],u=0;for(let e of B){let c={},E=P(e,c,"id",Q),S=P(e,c,"pluginName",Q),U=P(e,c,"text",Q),H=P(e,c,"location",eA),l=P(e,c,"notes",eB),N=P(e,c,"detail",_B),K=`in element ${u} of "${A}"`;nB(e,c,K);let y=[];if(l)for(let j of l){let o={},m=P(j,o,"text",Q),x=P(j,o,"location",eA);nB(j,o,K),y.push({text:m||"",location:sA(x,K)})}p.push({id:E||"",pluginName:S||n,text:U||"",location:sA(H,K),notes:y,detail:k?k.store(N):-1}),u++}return p}function LB(B,A){let k=[];for(let n of B){if(typeof n!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(n)}return k}function vA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){let n=this.contents;return(k===null||n!==A)&&(A=n,k=vB(n)),k}}}var MA="0.14.53",yA=B=>NB().build(B),CA=()=>{throw new Error('The "serve" API only works in node')},wA=(B,A)=>NB().transform(B,A),RA=(B,A)=>NB().formatMessages(B,A),DA=(B,A)=>NB().analyzeMetafile(B,A),IA=()=>{throw new Error('The "buildSync" API only works in node')},_A=()=>{throw new Error('The "transformSync" API only works in node')},FA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},WA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wB,VB,NB=()=>{if(VB)return VB;throw wB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},UA=B=>{B=bA(B||{});let A=B.wasmURL,k=B.wasmModule,n=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(wB)throw new Error('Cannot call "initialize" more than once');return wB=LA(A||"",k,n),wB.catch(()=>{wB=void 0}),wB},LA=(B,A,k)=>fB(void 0,null,function*(){let n;if(A)n=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);n=yield c.arrayBuffer()}let p;if(k){let c=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.14.53"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});p=new Worker(URL.createObjectURL(c))}else{let c=(E=>{var S=(l,N,K)=>new Promise((y,j)=>{var o=M=>{try{x(K.next(M))}catch(w){j(w)}},m=M=>{try{x(K.throw(M))}catch(w){j(w)}},x=M=>M.done?y(M.value):Promise.resolve(M.value).then(o,m);x((K=K.apply(l,N)).next())});let U,H={};for(let l=self;l;l=Object.getPrototypeOf(l))for(let N of Object.getOwnPropertyNames(l))N in H||Object.defineProperty(H,N,{get:()=>self[N]});return(()=>{let l=()=>{let y=new Error("not implemented");return y.code="ENOSYS",y};if(!H.fs){let y="";H.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(j,o){y+=K.decode(o);let m=y.lastIndexOf(`
`);return m!=-1&&(console.log(y.substr(0,m)),y=y.substr(m+1)),o.length},write(j,o,m,x,M,w){if(m!==0||x!==o.length||M!==null){w(l());return}let BB=this.writeSync(j,o);w(null,BB)},chmod(j,o,m){m(l())},chown(j,o,m,x){x(l())},close(j,o){o(l())},fchmod(j,o,m){m(l())},fchown(j,o,m,x){x(l())},fstat(j,o){o(l())},fsync(j,o){o(null)},ftruncate(j,o,m){m(l())},lchown(j,o,m,x){x(l())},link(j,o,m){m(l())},lstat(j,o){o(l())},mkdir(j,o,m){m(l())},open(j,o,m,x){x(l())},read(j,o,m,x,M,w){w(l())},readdir(j,o){o(l())},readlink(j,o){o(l())},rename(j,o,m){m(l())},rmdir(j,o){o(l())},stat(j,o){o(l())},symlink(j,o,m){m(l())},truncate(j,o,m){m(l())},unlink(j,o){o(l())},utimes(j,o,m,x){x(l())}}}if(H.process||(H.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw l()},pid:-1,ppid:-1,umask(){throw l()},cwd(){throw l()},chdir(){throw l()}}),!H.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!H.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!H.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!H.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let N=new TextEncoder("utf-8"),K=new TextDecoder("utf-8");H.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let y=($,s)=>{this.mem.setUint32($+0,s,!0),this.mem.setUint32($+4,Math.floor(s/4294967296),!0)},j=$=>{let s=this.mem.getUint32($+0,!0),v=this.mem.getInt32($+4,!0);return s+v*4294967296},o=$=>{let s=this.mem.getFloat64($,!0);if(s===0)return;if(!isNaN(s))return s;let v=this.mem.getUint32($,!0);return this._values[v]},m=($,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,s,!0);return}if(s===void 0){this.mem.setFloat64($,0,!0);return}let r=this._ids.get(s);r===void 0&&(r=this._idPool.pop(),r===void 0&&(r=this._values.length),this._values[r]=s,this._goRefCounts[r]=0,this._ids.set(s,r)),this._goRefCounts[r]++;let a=0;switch(typeof s){case"object":s!==null&&(a=1);break;case"string":a=2;break;case"symbol":a=3;break;case"function":a=4;break}this.mem.setUint32($+4,2146959360|a,!0),this.mem.setUint32($,r,!0)},x=$=>{let s=j($+0),v=j($+8);return new Uint8Array(this._inst.exports.mem.buffer,s,v)},M=$=>{let s=j($+0),v=j($+8),r=new Array(v);for(let a=0;a<v;a++)r[a]=o(s+a*8);return r},w=$=>{let s=j($+0),v=j($+8);return K.decode(new DataView(this._inst.exports.mem.buffer,s,v))},BB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":$=>{$>>>=0;let s=j($+8),v=j($+16),r=this.mem.getInt32($+24,!0);H.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,v,r))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,y($+8,(BB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let s=new Date().getTime();y($+8,s/1e3),this.mem.setInt32($+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},j($+8)+1)),this.mem.setInt32($+16,s,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let s=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(x($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let s=this.mem.getUint32($+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){let v=this._values[s];this._values[s]=null,this._ids.delete(v),this._idPool.push(s)}},"syscall/js.stringVal":$=>{$>>>=0,m($+24,w($+8))},"syscall/js.valueGet":$=>{$>>>=0;let s=Reflect.get(o($+8),w($+16));$=this._inst.exports.getsp()>>>0,m($+32,s)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(o($+8),w($+16),o($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(o($+8),w($+16))},"syscall/js.valueIndex":$=>{$>>>=0,m($+24,Reflect.get(o($+8),j($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(o($+8),j($+16),o($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let s=o($+8),v=Reflect.get(s,w($+16)),r=M($+32),a=Reflect.apply(v,s,r);$=this._inst.exports.getsp()>>>0,m($+56,a),this.mem.setUint8($+64,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+56,s),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let s=o($+8),v=M($+16),r=Reflect.apply(s,void 0,v);$=this._inst.exports.getsp()>>>0,m($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let s=o($+8),v=M($+16),r=Reflect.construct(s,v);$=this._inst.exports.getsp()>>>0,m($+40,r),this.mem.setUint8($+48,1)}catch(s){$=this._inst.exports.getsp()>>>0,m($+40,s),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,y($+16,parseInt(o($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let s=N.encode(String(o($+8)));m($+16,s),y($+24,s.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let s=o($+8);x($+16).set(s)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,o($+8)instanceof o($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let s=x($+8),v=o($+32);if(!(v instanceof Uint8Array||v instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=v.subarray(0,s.length);s.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let s=o($+8),v=x($+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let r=v.subarray(0,s.length);s.set(r),y($+40,r.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(y){return S(this,null,function*(){if(!(y instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=y,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,H,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[H,5],[this,6]]),this._idPool=[],this.exited=!1;let j=4096,o=$=>{let s=j,v=N.encode($+"\0");return new Uint8Array(this.mem.buffer,j,v.length).set(v),j+=v.length,j%8!==0&&(j+=8-j%8),s},m=this.argv.length,x=[];this.argv.forEach($=>{x.push(o($))}),x.push(0),Object.keys(this.env).sort().forEach($=>{x.push(o(`${$}=${this.env[$]}`))}),x.push(0);let w=j;x.forEach($=>{this.mem.setUint32(j,$,!0),this.mem.setUint32(j+4,0,!0),j+=8});let BB=4096+8192;if(j>=BB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(m,w),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(y){let j=this;return function(){let o={id:y,this:this,args:arguments};return j._pendingEvent=o,j._resume(),o.result}}}})(),U=({data:l})=>{let N=new TextDecoder,K=H.fs,y="";K.writeSync=(M,w)=>{if(M===1)E(w);else if(M===2){y+=N.decode(w);let BB=y.split(`
`);BB.length>1&&console.log(BB.slice(0,-1).join(`
`)),y=BB[BB.length-1]}else throw new Error("Bad write");return w.length};let j=[],o,m=0;U=({data:M})=>{M.length>0&&(j.push(M),o&&o())},K.read=(M,w,BB,$,s,v)=>{if(M!==0||BB!==0||$!==w.length||s!==null)throw new Error("Bad read");if(j.length===0){o=()=>K.read(M,w,BB,$,s,v);return}let r=j[0],a=Math.max(0,Math.min($,r.length-m));w.set(r.subarray(m,m+a),BB),m+=a,m===r.length&&(j.shift(),m=0),v(null,a)};let x=new H.Go;x.argv=["","--service=0.14.53"],l instanceof WebAssembly.Module?WebAssembly.instantiate(l,x.importObject).then(M=>x.run(M)):WebAssembly.instantiate(l,x.importObject).then(({instance:M})=>x.run(M))},l=>U(l)})(E=>p.onmessage({data:E}));p={onmessage:null,postMessage:E=>setTimeout(()=>c({data:E})),terminate(){}}}p.postMessage(n),p.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:e}=fA({writeToStdin(c){p.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:IB});VB={build:c=>new Promise((E,S)=>e.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(U,H)=>U?S(U):E(H)})),transform:(c,E)=>new Promise((S,U)=>e.transform({callName:"transform",refs:null,input:c,options:E||{},isTTY:!1,fs:{readFile(H,l){l(new Error("Internal error"),null)},writeFile(H,l){l(null)}},callback:(H,l)=>H?U(H):S(l)})),formatMessages:(c,E)=>new Promise((S,U)=>e.formatMessages({callName:"formatMessages",refs:null,messages:c,options:E,callback:(H,l)=>H?U(H):S(l)})),analyzeMetafile:(c,E)=>new Promise((S,U)=>e.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:E,callback:(H,l)=>H?U(H):S(l)}))}}),NA=IB})(typeof ZB=="object"?ZB:{set exports(cB){(typeof self<"u"?self:this).esbuild=cB}})});RB();RB();var A7=new Error("timeout while waiting for mutex to become available"),$7=new Error("mutex already locked"),VA=new Error("request for lock canceled"),lA=function(cB,C,V,sB){function bB(uB){return uB instanceof V?uB:new V(function(hB){hB(uB)})}return new(V||(V=Promise))(function(uB,hB){function xB(tB){try{QB(sB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{QB(sB.throw(tB))}catch(dB){hB(dB)}}function QB(tB){tB.done?uB(tB.value):bB(tB.value).then(xB,DB)}QB((sB=sB.apply(cB,C||[])).next())})},YB=class{constructor(C,V=VA){if(this._maxConcurrency=C,this._cancelError=V,this._queue=[],this._waiters=[],C<=0)throw new Error("semaphore must be initialized to a positive value");this._value=C}acquire(){let C=this.isLocked(),V=new Promise((sB,bB)=>this._queue.push({resolve:sB,reject:bB}));return C||this._dispatch(),V}runExclusive(C){return lA(this,void 0,void 0,function*(){let[V,sB]=yield this.acquire();try{return yield C(V)}finally{sB()}})}waitForUnlock(){return lA(this,void 0,void 0,function*(){return this.isLocked()?new Promise(V=>this._waiters.push({resolve:V})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let C=this._currentReleaser;this._currentReleaser=void 0,C()}}cancel(){this._queue.forEach(C=>C.reject(this._cancelError)),this._queue=[]}_dispatch(){let C=this._queue.shift();if(!C)return;let V=!1;this._currentReleaser=()=>{V||(V=!0,this._value++,this._resolveWaiters(),this._dispatch())},C.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(C=>C.resolve()),this._waiters=[]}},KA=function(cB,C,V,sB){function bB(uB){return uB instanceof V?uB:new V(function(hB){hB(uB)})}return new(V||(V=Promise))(function(uB,hB){function xB(tB){try{QB(sB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{QB(sB.throw(tB))}catch(dB){hB(dB)}}function QB(tB){tB.done?uB(tB.value):bB(tB.value).then(xB,DB)}QB((sB=sB.apply(cB,C||[])).next())})},OB=class{constructor(C){this._semaphore=new YB(1,C)}acquire(){return KA(this,void 0,void 0,function*(){let[,C]=yield this._semaphore.acquire();return C})}runExclusive(C){return this._semaphore.runExclusive(()=>C())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var GB=JA(pA(),1);var uA="./esbuild-CFMHCJ7W.wasm";var zB={initFinished:!1},ZA=new OB,i7=async()=>(zB.initFinished||await ZA.runExclusive(async()=>(zB.initFinished||await GB.initialize({wasmURL:uA}),zB.initFinished=!0,!0)),BA),zA=/ from \"\.\./ig,B7=/ from \"\./ig;async function BA(cB,C=4){try{return(await GB.transform(`/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    `+cB,{loader:"tsx",target:"esnext"})).code.replaceAll(zA,' from "/live').replaceAll(B7,' from "/live')}catch(V){if(C>0)return await oA(100),BA(cB,C-1);throw V}}export{i7 as init};
