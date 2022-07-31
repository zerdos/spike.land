import{a as sA}from"./chunk-Y62ILJI7.mjs";import{b as JA,d as VA,i as RB}from"./chunk-PWAMAVFK.mjs";var lA=JA((P7,ZB)=>{"use strict";RB();(cB=>{var C=Object.defineProperty,q=Object.defineProperties,sB=Object.getOwnPropertyDescriptor,bB=Object.getOwnPropertyDescriptors,uB=Object.getOwnPropertyNames,hB=Object.getOwnPropertySymbols,fB=Object.prototype.hasOwnProperty,DB=Object.prototype.propertyIsEnumerable,mB=(B,A,k)=>A in B?C(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,tB=(B,A)=>{for(var k in A||(A={}))fB.call(A,k)&&mB(B,k,A[k]);if(hB)for(var k of hB(A))DB.call(A,k)&&mB(B,k,A[k]);return B},dB=(B,A)=>q(B,bB(A)),uA=(B,A)=>{for(var k in A)C(B,k,{get:A[k],enumerable:!0})},cA=(B,A,k,i)=>{if(A&&typeof A=="object"||typeof A=="function")for(let j of uB(A))!fB.call(B,j)&&j!==k&&C(B,j,{get:()=>A[j],enumerable:!(i=sB(A,j))||i.enumerable});return B},hA=B=>cA(C({},"__esModule",{value:!0}),B),xB=(B,A,k)=>new Promise((i,j)=>{var u=E=>{try{c(k.next(E))}catch(x){j(x)}},e=E=>{try{c(k.throw(E))}catch(x){j(x)}},c=E=>E.done?i(E.value):Promise.resolve(E.value).then(u,e);c((k=k.apply(B,A)).next())}),_B={};uA(_B,{analyzeMetafile:()=>DA,analyzeMetafileSync:()=>UA,build:()=>yA,buildSync:()=>_A,default:()=>NA,formatMessages:()=>RA,formatMessagesSync:()=>FA,initialize:()=>WA,serve:()=>CA,transform:()=>wA,transformSync:()=>IA,version:()=>MA}),cB.exports=hA(_B);function AA(B){let A=i=>{if(i===null)k.write8(0);else if(typeof i=="boolean")k.write8(1),k.write8(+i);else if(typeof i=="number")k.write8(2),k.write32(i|0);else if(typeof i=="string")k.write8(3),k.write(SB(i));else if(i instanceof Uint8Array)k.write8(4),k.write(i);else if(i instanceof Array){k.write8(5),k.write32(i.length);for(let j of i)A(j)}else{let j=Object.keys(i);k.write8(6),k.write32(j.length);for(let u of j)k.write(SB(u)),A(i[u])}},k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),JB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function QA(B){let A=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return vB(k.read());case 4:return k.read();case 5:{let e=k.read32(),c=[];for(let E=0;E<e;E++)c.push(A());return c}case 6:{let e=k.read32(),c={};for(let E=0;E<e;E++)c[vB(k.read())]=A();return c}default:throw new Error("Invalid packet")}},k=new $A(B),i=k.read32(),j=(i&1)===0;i>>>=1;let u=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:i,isRequest:j,value:u}}var $A=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);JB(this.buf,B,A)}write(B){let A=this._write(4+B.length);JB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},SB,vB;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let B=new TextEncoder,A=new TextDecoder;SB=k=>B.encode(k),vB=k=>A.decode(k)}else if(typeof Buffer!="undefined")SB=B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},vB=B=>{let{buffer:A,byteOffset:k,byteLength:i}=B;return Buffer.from(A,k,i).toString()};else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}function JB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var IB=()=>null,Z=B=>typeof B=="boolean"?null:"a boolean",mA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",m=B=>typeof B=="string"?null:"a string",FB=B=>B instanceof RegExp?null:"a RegExp object",MB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",VB=B=>typeof B=="function"?null:"a function",eB=B=>Array.isArray(B)?null:"an array",gB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",dA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",gA=B=>typeof B=="object"&&B!==null?null:"an array or an object",eA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",EA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",TA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",XA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",bA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,A,k,i){let j=B[k];if(A[k+""]=!0,j===void 0)return;let u=i(j);if(u!==null)throw new Error(`"${k}" must be ${u}`);return j}function nB(B,A,k){for(let i in B)if(!(i in A))throw new Error(`Invalid option ${k}: "${i}"`)}function SA(B){let A=Object.create(null),k=P(B,A,"wasmURL",m),i=P(B,A,"wasmModule",dA),j=P(B,A,"worker",Z);return nB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:i,worker:j}}function tA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let i=B[k];if(typeof i=="string"||i===!1)A[k]=i;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}function UB(B,A,k,i,j){let u=P(A,k,"color",Z),e=P(A,k,"logLevel",m),c=P(A,k,"logLimit",MB);u!==void 0?B.push(`--color=${u}`):i&&B.push("--color=true"),B.push(`--log-level=${e||j}`),B.push(`--log-limit=${c||0}`)}function nA(B,A,k){let i=P(A,k,"legalComments",m),j=P(A,k,"sourceRoot",m),u=P(A,k,"sourcesContent",Z),e=P(A,k,"target",XA),c=P(A,k,"format",m),E=P(A,k,"globalName",m),x=P(A,k,"mangleProps",FB),W=P(A,k,"reserveProps",FB),b=P(A,k,"mangleQuoted",Z),p=P(A,k,"minify",Z),N=P(A,k,"minifySyntax",Z),Y=P(A,k,"minifyWhitespace",Z),y=P(A,k,"minifyIdentifiers",Z),l=P(A,k,"drop",eB),o=P(A,k,"charset",m),Q=P(A,k,"treeShaking",Z),H=P(A,k,"ignoreAnnotations",Z),M=P(A,k,"jsx",m),w=P(A,k,"jsxFactory",m),BB=P(A,k,"jsxFragment",m),$=P(A,k,"jsxImportSource",m),a=P(A,k,"jsxDev",Z),v=P(A,k,"define",gB),n=P(A,k,"logOverride",gB),r=P(A,k,"supported",gB),s=P(A,k,"pure",eB),h=P(A,k,"keepNames",Z),L=P(A,k,"platform",m);if(i&&B.push(`--legal-comments=${i}`),j!==void 0&&B.push(`--source-root=${j}`),u!==void 0&&B.push(`--sources-content=${u}`),e&&(Array.isArray(e)?B.push(`--target=${Array.from(e).map(PA).join(",")}`):B.push(`--target=${PA(e)}`)),c&&B.push(`--format=${c}`),E&&B.push(`--global-name=${E}`),L&&B.push(`--platform=${L}`),p&&B.push("--minify"),N&&B.push("--minify-syntax"),Y&&B.push("--minify-whitespace"),y&&B.push("--minify-identifiers"),o&&B.push(`--charset=${o}`),Q!==void 0&&B.push(`--tree-shaking=${Q}`),H&&B.push("--ignore-annotations"),l)for(let S of l)B.push(`--drop:${S}`);if(x&&B.push(`--mangle-props=${x.source}`),W&&B.push(`--reserve-props=${W.source}`),b!==void 0&&B.push(`--mangle-quoted=${b}`),M&&B.push(`--jsx=${M}`),w&&B.push(`--jsx-factory=${w}`),BB&&B.push(`--jsx-fragment=${BB}`),$&&B.push(`--jsx-import-source=${$}`),a&&B.push("--jsx-dev"),v)for(let S in v){if(S.indexOf("=")>=0)throw new Error(`Invalid define: ${S}`);B.push(`--define:${S}=${v[S]}`)}if(n)for(let S in n){if(S.indexOf("=")>=0)throw new Error(`Invalid log override: ${S}`);B.push(`--log-override:${S}=${n[S]}`)}if(r)for(let S in r){if(S.indexOf("=")>=0)throw new Error(`Invalid supported: ${S}`);B.push(`--supported:${S}=${r[S]}`)}if(s)for(let S of s)B.push(`--pure:${S}`);h&&B.push("--keep-names")}function HA(B,A,k,i,j){var u;let e=[],c=[],E=Object.create(null),x=null,W=null,b=null;UB(e,A,E,k,i),nA(e,A,E);let p=P(A,E,"sourcemap",EA),N=P(A,E,"bundle",Z),Y=P(A,E,"watch",mA),y=P(A,E,"splitting",Z),l=P(A,E,"preserveSymlinks",Z),o=P(A,E,"metafile",Z),Q=P(A,E,"outfile",m),H=P(A,E,"outdir",m),M=P(A,E,"outbase",m),w=P(A,E,"tsconfig",m),BB=P(A,E,"resolveExtensions",eB),$=P(A,E,"nodePaths",eB),a=P(A,E,"mainFields",eB),v=P(A,E,"conditions",eB),n=P(A,E,"external",eB),r=P(A,E,"loader",gB),s=P(A,E,"outExtension",gB),h=P(A,E,"publicPath",m),L=P(A,E,"entryNames",m),S=P(A,E,"chunkNames",m),F=P(A,E,"assetNames",m),D=P(A,E,"inject",eB),O=P(A,E,"banner",gB),U=P(A,E,"footer",gB),f=P(A,E,"entryPoints",gA),K=P(A,E,"absWorkingDir",m),R=P(A,E,"stdin",gB),G=(u=P(A,E,"write",Z))!=null?u:j,AB=P(A,E,"allowOverwrite",Z),jB=P(A,E,"incremental",Z)===!0,_=P(A,E,"mangleCache",gB);if(E.plugins=!0,nB(A,E,`in ${B}() call`),p&&e.push(`--sourcemap${p===!0?"":`=${p}`}`),N&&e.push("--bundle"),AB&&e.push("--allow-overwrite"),Y)if(e.push("--watch"),typeof Y=="boolean")b={};else{let t=Object.create(null),g=P(Y,t,"onRebuild",VB);nB(Y,t,`on "watch" in ${B}() call`),b={onRebuild:g}}if(y&&e.push("--splitting"),l&&e.push("--preserve-symlinks"),o&&e.push("--metafile"),Q&&e.push(`--outfile=${Q}`),H&&e.push(`--outdir=${H}`),M&&e.push(`--outbase=${M}`),w&&e.push(`--tsconfig=${w}`),BB){let t=[];for(let g of BB){if(g+="",g.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${g}`);t.push(g)}e.push(`--resolve-extensions=${t.join(",")}`)}if(h&&e.push(`--public-path=${h}`),L&&e.push(`--entry-names=${L}`),S&&e.push(`--chunk-names=${S}`),F&&e.push(`--asset-names=${F}`),a){let t=[];for(let g of a){if(g+="",g.indexOf(",")>=0)throw new Error(`Invalid main field: ${g}`);t.push(g)}e.push(`--main-fields=${t.join(",")}`)}if(v){let t=[];for(let g of v){if(g+="",g.indexOf(",")>=0)throw new Error(`Invalid condition: ${g}`);t.push(g)}e.push(`--conditions=${t.join(",")}`)}if(n)for(let t of n)e.push(`--external:${t}`);if(O)for(let t in O){if(t.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${t}`);e.push(`--banner:${t}=${O[t]}`)}if(U)for(let t in U){if(t.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${t}`);e.push(`--footer:${t}=${U[t]}`)}if(D)for(let t of D)e.push(`--inject:${t}`);if(r)for(let t in r){if(t.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${t}`);e.push(`--loader:${t}=${r[t]}`)}if(s)for(let t in s){if(t.indexOf("=")>=0)throw new Error(`Invalid out extension: ${t}`);e.push(`--out-extension:${t}=${s[t]}`)}if(f)if(Array.isArray(f))for(let t of f)c.push(["",t+""]);else for(let[t,g]of Object.entries(f))c.push([t+"",g+""]);if(R){let t=Object.create(null),g=P(R,t,"contents",m),z=P(R,t,"resolveDir",m),kB=P(R,t,"sourcefile",m),T=P(R,t,"loader",m);nB(R,t,'in "stdin" object'),kB&&e.push(`--sourcefile=${kB}`),T&&e.push(`--loader=${T}`),z&&(W=z+""),x=g?g+"":""}let X=[];if($)for(let t of $)t+="",X.push(t);return{entries:c,flags:e,write:G,stdinContents:x,stdinResolveDir:W,absWorkingDir:K,incremental:jB,nodePaths:X,watch:b,mangleCache:tA(_)}}function fA(B,A,k,i){let j=[],u=Object.create(null);UB(j,A,u,k,i),nA(j,A,u);let e=P(A,u,"sourcemap",EA),c=P(A,u,"tsconfigRaw",TA),E=P(A,u,"sourcefile",m),x=P(A,u,"loader",m),W=P(A,u,"banner",m),b=P(A,u,"footer",m),p=P(A,u,"mangleCache",gB);return nB(A,u,`in ${B}() call`),e&&j.push(`--sourcemap=${e===!0?"external":e}`),c&&j.push(`--tsconfig-raw=${typeof c=="string"?c:JSON.stringify(c)}`),E&&j.push(`--sourcefile=${E}`),x&&j.push(`--loader=${x}`),W&&j.push(`--banner=${W}`),b&&j.push(`--footer=${b}`),{flags:j,mangleCache:tA(p)}}function xA(B){let A=new Map,k=new Map,i=new Map,j=new Map,u=null,e=0,c=0,E=new Uint8Array(16*1024),x=0,W=n=>{let r=x+n.length;if(r>E.length){let h=new Uint8Array(r*2);h.set(E),E=h}E.set(n,x),x+=n.length;let s=0;for(;s+4<=x;){let h=kA(E,s);if(s+4+h>x)break;s+=4,l(E.subarray(s,s+h)),s+=h}s>0&&(E.copyWithin(0,s,x),x-=s)},b=n=>{u={reason:n?": "+(n.message||n):""};let r="The service was stopped"+u.reason;for(let s of A.values())s(r,null);A.clear();for(let s of j.values())s.onWait(r);j.clear();for(let s of i.values())try{s(new Error(r),null)}catch(h){console.error(h)}i.clear()},p=(n,r,s)=>{if(u)return s("The service is no longer running"+u.reason,null);let h=e++;A.set(h,(L,S)=>{try{s(L,S)}finally{n&&n.unref()}}),n&&n.ref(),B.writeToStdin(AA({id:h,isRequest:!0,value:r}))},N=(n,r)=>{if(u)throw new Error("The service is no longer running"+u.reason);B.writeToStdin(AA({id:n,isRequest:!1,value:r}))},Y=(n,r)=>xB(this,null,function*(){try{switch(r.command){case"ping":{N(n,{});break}case"on-start":{let s=k.get(r.key);s?N(n,yield s(r)):N(n,{});break}case"on-resolve":{let s=k.get(r.key);s?N(n,yield s(r)):N(n,{});break}case"on-load":{let s=k.get(r.key);s?N(n,yield s(r)):N(n,{});break}case"serve-request":{let s=j.get(r.key);s&&s.onRequest&&s.onRequest(r.args),N(n,{});break}case"serve-wait":{let s=j.get(r.key);s&&s.onWait(r.error),N(n,{});break}case"watch-rebuild":{let s=i.get(r.key);try{s&&s(null,r.args)}catch(h){console.error(h)}N(n,{});break}default:throw new Error("Invalid command: "+r.command)}}catch(s){N(n,{errors:[yB(s,B,null,void 0,"")]})}}),y=!0,l=n=>{if(y){y=!1;let s=String.fromCharCode(...n);if(s!=="0.14.51")throw new Error(`Cannot start service: Host version "0.14.51" does not match binary version ${JSON.stringify(s)}`);return}let r=QA(n);if(r.isRequest)Y(r.id,r.value);else{let s=A.get(r.id);A.delete(r.id),r.value.error?s(r.value.error,{}):s(null,r.value)}},o=(n,r,s,h,L)=>xB(this,null,function*(){let S=[],F=[],D={},O={},U=0,f=0,K=[],R=!1;r=[...r];for(let _ of r){let X={};if(typeof _!="object")throw new Error(`Plugin at index ${f} must be an object`);let t=P(_,X,"name",m);if(typeof t!="string"||t==="")throw new Error(`Plugin at index ${f} is missing a name`);try{let g=P(_,X,"setup",VB);if(typeof g!="function")throw new Error("Plugin is missing a setup function");nB(_,X,`on plugin ${JSON.stringify(t)}`);let z={name:t,onResolve:[],onLoad:[]};f++;let T=g({initialOptions:n,resolve:(d,J={})=>{if(!R)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof d!="string")throw new Error("The path to resolve must be a string");let I=Object.create(null),aB=P(J,I,"pluginName",m),$B=P(J,I,"importer",m),EB=P(J,I,"namespace",m),pB=P(J,I,"resolveDir",m),iB=P(J,I,"kind",m),V=P(J,I,"pluginData",IB);return nB(J,I,"in resolve() call"),new Promise((rB,oB)=>{let PB={command:"resolve",path:d,key:s,pluginName:t};aB!=null&&(PB.pluginName=aB),$B!=null&&(PB.importer=$B),EB!=null&&(PB.namespace=EB),pB!=null&&(PB.resolveDir=pB),iB!=null&&(PB.kind=iB),V!=null&&(PB.pluginData=h.store(V)),p(L,PB,(TB,lB)=>{TB!==null?oB(new Error(TB)):rB({errors:XB(lB.errors,h),warnings:XB(lB.warnings,h),path:lB.path,external:lB.external,sideEffects:lB.sideEffects,namespace:lB.namespace,suffix:lB.suffix,pluginData:h.load(lB.pluginData)})})})},onStart(d){let J='This error came from the "onStart" callback registered here:',I=WB(new Error(J),B,"onStart");S.push({name:t,callback:d,note:I})},onEnd(d){let J='This error came from the "onEnd" callback registered here:',I=WB(new Error(J),B,"onEnd");F.push({name:t,callback:d,note:I})},onResolve(d,J){let I='This error came from the "onResolve" callback registered here:',aB=WB(new Error(I),B,"onResolve"),$B={},EB=P(d,$B,"filter",FB),pB=P(d,$B,"namespace",m);if(nB(d,$B,`in onResolve() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onResolve() call is missing a filter");let iB=U++;D[iB]={name:t,callback:J,note:aB},z.onResolve.push({id:iB,filter:EB.source,namespace:pB||""})},onLoad(d,J){let I='This error came from the "onLoad" callback registered here:',aB=WB(new Error(I),B,"onLoad"),$B={},EB=P(d,$B,"filter",FB),pB=P(d,$B,"namespace",m);if(nB(d,$B,`in onLoad() call for plugin ${JSON.stringify(t)}`),EB==null)throw new Error("onLoad() call is missing a filter");let iB=U++;O[iB]={name:t,callback:J,note:aB},z.onLoad.push({id:iB,filter:EB.source,namespace:pB||""})},esbuild:B.esbuild});T&&(yield T),K.push(z)}catch(g){return{ok:!1,error:g,pluginName:t}}}let G=_=>xB(this,null,function*(){switch(_.command){case"on-start":{let X={errors:[],warnings:[]};return yield Promise.all(S.map(t=>xB(this,[t],function*({name:g,callback:z,note:kB}){try{let T=yield z();if(T!=null){if(typeof T!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(g)} to return an object`);let d={},J=P(T,d,"errors",eB),I=P(T,d,"warnings",eB);nB(T,d,`from onStart() callback in plugin ${JSON.stringify(g)}`),J!=null&&X.errors.push(...HB(J,"errors",h,g)),I!=null&&X.warnings.push(...HB(I,"warnings",h,g))}}catch(T){X.errors.push(yB(T,B,h,kB&&kB(),g))}}))),X}case"on-resolve":{let X={},t="",g,z;for(let kB of _.ids)try{({name:t,callback:g,note:z}=D[kB]);let T=yield g({path:_.path,importer:_.importer,namespace:_.namespace,resolveDir:_.resolveDir,kind:_.kind,pluginData:h.load(_.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(t)} to return an object`);let d={},J=P(T,d,"pluginName",m),I=P(T,d,"path",m),aB=P(T,d,"namespace",m),$B=P(T,d,"suffix",m),EB=P(T,d,"external",Z),pB=P(T,d,"sideEffects",Z),iB=P(T,d,"pluginData",IB),V=P(T,d,"errors",eB),rB=P(T,d,"warnings",eB),oB=P(T,d,"watchFiles",eB),PB=P(T,d,"watchDirs",eB);nB(T,d,`from onResolve() callback in plugin ${JSON.stringify(t)}`),X.id=kB,J!=null&&(X.pluginName=J),I!=null&&(X.path=I),aB!=null&&(X.namespace=aB),$B!=null&&(X.suffix=$B),EB!=null&&(X.external=EB),pB!=null&&(X.sideEffects=pB),iB!=null&&(X.pluginData=h.store(iB)),V!=null&&(X.errors=HB(V,"errors",h,t)),rB!=null&&(X.warnings=HB(rB,"warnings",h,t)),oB!=null&&(X.watchFiles=LB(oB,"watchFiles")),PB!=null&&(X.watchDirs=LB(PB,"watchDirs"));break}}catch(T){return{id:kB,errors:[yB(T,B,h,z&&z(),t)]}}return X}case"on-load":{let X={},t="",g,z;for(let kB of _.ids)try{({name:t,callback:g,note:z}=O[kB]);let T=yield g({path:_.path,namespace:_.namespace,suffix:_.suffix,pluginData:h.load(_.pluginData)});if(T!=null){if(typeof T!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(t)} to return an object`);let d={},J=P(T,d,"pluginName",m),I=P(T,d,"contents",bA),aB=P(T,d,"resolveDir",m),$B=P(T,d,"pluginData",IB),EB=P(T,d,"loader",m),pB=P(T,d,"errors",eB),iB=P(T,d,"warnings",eB),V=P(T,d,"watchFiles",eB),rB=P(T,d,"watchDirs",eB);nB(T,d,`from onLoad() callback in plugin ${JSON.stringify(t)}`),X.id=kB,J!=null&&(X.pluginName=J),I instanceof Uint8Array?X.contents=I:I!=null&&(X.contents=SB(I)),aB!=null&&(X.resolveDir=aB),$B!=null&&(X.pluginData=h.store($B)),EB!=null&&(X.loader=EB),pB!=null&&(X.errors=HB(pB,"errors",h,t)),iB!=null&&(X.warnings=HB(iB,"warnings",h,t)),V!=null&&(X.watchFiles=LB(V,"watchFiles")),rB!=null&&(X.watchDirs=LB(rB,"watchDirs"));break}}catch(T){return{id:kB,errors:[yB(T,B,h,z&&z(),t)]}}return X}default:throw new Error("Invalid command: "+_.command)}}),AB=(_,X,t)=>t();F.length>0&&(AB=(_,X,t)=>{(()=>xB(this,null,function*(){for(let{name:g,callback:z,note:kB}of F)try{yield z(_)}catch(T){_.errors.push(yield new Promise(d=>X(T,g,kB&&kB(),d)))}}))().then(t)}),R=!0;let jB=0;return{ok:!0,requestPlugins:K,runOnEndCallbacks:AB,pluginRefs:{ref(){++jB===1&&k.set(s,G)},unref(){--jB===0&&k.delete(s)}}}}),Q=(n,r,s,h)=>{let L={},S=P(r,L,"port",MB),F=P(r,L,"host",m),D=P(r,L,"servedir",m),O=P(r,L,"onRequest",VB),U,f=new Promise((K,R)=>{U=G=>{j.delete(h),G!==null?R(new Error(G)):K()}});return s.serve={},nB(r,L,"in serve() call"),S!==void 0&&(s.serve.port=S),F!==void 0&&(s.serve.host=F),D!==void 0&&(s.serve.servedir=D),j.set(h,{onRequest:O,onWait:U}),{wait:f,stop(){p(n,{command:"serve-stop",key:h},()=>{})}}},H="warning",M="silent",w=n=>{let r=c++,s=rA(),h,{refs:L,options:S,isTTY:F,callback:D}=n;if(typeof S=="object"){let f=S.plugins;if(f!==void 0){if(!Array.isArray(f))throw new Error('"plugins" must be an array');h=f}}let O=(f,K,R,G)=>{let AB=[];try{UB(AB,S,{},F,H)}catch(_){}let jB=yB(f,B,s,R,K);p(L,{command:"error",flags:AB,error:jB},()=>{jB.detail=s.load(jB.detail),G(jB)})},U=(f,K)=>{O(f,K,void 0,R=>{D(CB("Build failed",[R],[]),null)})};if(h&&h.length>0){if(B.isSync)return U(new Error("Cannot use plugins in synchronous API calls"),"");o(S,h,r,s,L).then(f=>{if(!f.ok)U(f.error,f.pluginName);else try{BB(dB(tB({},n),{key:r,details:s,logPluginError:O,requestPlugins:f.requestPlugins,runOnEndCallbacks:f.runOnEndCallbacks,pluginRefs:f.pluginRefs}))}catch(K){U(K,"")}},f=>U(f,""))}else try{BB(dB(tB({},n),{key:r,details:s,logPluginError:O,requestPlugins:null,runOnEndCallbacks:(f,K,R)=>R(),pluginRefs:null}))}catch(f){U(f,"")}},BB=({callName:n,refs:r,serveOptions:s,options:h,isTTY:L,defaultWD:S,callback:F,key:D,details:O,logPluginError:U,requestPlugins:f,runOnEndCallbacks:K,pluginRefs:R})=>{let G={ref(){R&&R.ref(),r&&r.ref()},unref(){R&&R.unref(),r&&r.unref()}},AB=!B.isWriteUnavailable,{entries:jB,flags:_,write:X,stdinContents:t,stdinResolveDir:g,absWorkingDir:z,incremental:kB,nodePaths:T,watch:d,mangleCache:J}=HA(n,h,L,H,AB),I={command:"build",key:D,entries:jB,flags:_,write:X,stdinContents:t,stdinResolveDir:g,absWorkingDir:z||S,incremental:kB,nodePaths:T};f&&(I.plugins=f),J&&(I.mangleCache=J);let aB=s&&Q(G,s,I,D),$B,EB,pB=(V,rB)=>{V.outputFiles&&(rB.outputFiles=V.outputFiles.map(vA)),V.metafile&&(rB.metafile=JSON.parse(V.metafile)),V.mangleCache&&(rB.mangleCache=V.mangleCache),V.writeToStdout!==void 0&&console.log(vB(V.writeToStdout).replace(/\n$/,""))},iB=(V,rB)=>{let oB={errors:XB(V.errors,O),warnings:XB(V.warnings,O)};pB(V,oB),K(oB,U,()=>{if(oB.errors.length>0)return rB(CB("Build failed",oB.errors,oB.warnings),null);if(V.rebuild){if(!$B){let PB=!1;$B=()=>new Promise((TB,lB)=>{if(PB||u)throw new Error("Cannot rebuild");p(G,{command:"rebuild",key:D},(QB,OA)=>{if(QB)return rB(CB("Build failed",[{id:"",pluginName:"",text:QB,location:null,notes:[],detail:void 0}],[]),null);iB(OA,(YB,GA)=>{YB?lB(YB):TB(GA)})})}),G.ref(),$B.dispose=()=>{PB||(PB=!0,p(G,{command:"rebuild-dispose",key:D},()=>{}),G.unref())}}oB.rebuild=$B}if(V.watch){if(!EB){let PB=!1;G.ref(),EB=()=>{PB||(PB=!0,i.delete(D),p(G,{command:"watch-stop",key:D},()=>{}),G.unref())},d&&i.set(D,(TB,lB)=>{if(TB){d.onRebuild&&d.onRebuild(TB,null);return}let QB={errors:XB(lB.errors,O),warnings:XB(lB.warnings,O)};pB(lB,QB),K(QB,U,()=>{if(QB.errors.length>0){d.onRebuild&&d.onRebuild(CB("Build failed",QB.errors,QB.warnings),null);return}lB.rebuildID!==void 0&&(QB.rebuild=$B),QB.stop=EB,d.onRebuild&&d.onRebuild(null,QB)})})}oB.stop=EB}rB(null,oB)})};if(X&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(kB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(d&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');p(G,I,(V,rB)=>{if(V)return F(new Error(V),null);if(aB){let oB=rB,PB=!1;G.ref();let TB={port:oB.port,host:oB.host,wait:aB.wait,stop(){PB||(PB=!0,aB.stop(),G.unref())}};return G.ref(),aB.wait.then(G.unref,G.unref),F(null,TB)}return iB(rB,F)})};return{readFromStdout:W,afterClose:b,service:{buildOrServe:w,transform:({callName:n,refs:r,input:s,options:h,isTTY:L,fs:S,callback:F})=>{let D=rA(),O=U=>{try{if(typeof s!="string")throw new Error('The input to "transform" must be a string');let{flags:f,mangleCache:K}=fA(n,h,L,M),R={command:"transform",flags:f,inputFS:U!==null,input:U!==null?U:s};K&&(R.mangleCache=K),p(r,R,(G,AB)=>{if(G)return F(new Error(G),null);let jB=XB(AB.errors,D),_=XB(AB.warnings,D),X=1,t=()=>{if(--X===0){let g={warnings:_,code:AB.code,map:AB.map};AB.mangleCache&&(g.mangleCache=AB==null?void 0:AB.mangleCache),F(null,g)}};if(jB.length>0)return F(CB("Transform failed",jB,_),null);AB.codeFS&&(X++,S.readFile(AB.code,(g,z)=>{g!==null?F(g,null):(AB.code=z,t())})),AB.mapFS&&(X++,S.readFile(AB.map,(g,z)=>{g!==null?F(g,null):(AB.map=z,t())})),t()})}catch(f){let K=[];try{UB(K,h,{},L,M)}catch(G){}let R=yB(f,B,D,void 0,"");p(r,{command:"error",flags:K,error:R},()=>{R.detail=D.load(R.detail),F(CB("Transform failed",[R],[]),null)})}};if(typeof s=="string"&&s.length>1024*1024){let U=O;O=()=>S.writeFile(s,U)}O(null)},formatMessages:({callName:n,refs:r,messages:s,options:h,callback:L})=>{let S=HB(s,"messages",null,"");if(!h)throw new Error(`Missing second argument in ${n}() call`);let F={},D=P(h,F,"kind",m),O=P(h,F,"color",Z),U=P(h,F,"terminalWidth",MB);if(nB(h,F,`in ${n}() call`),D===void 0)throw new Error(`Missing "kind" in ${n}() call`);if(D!=="error"&&D!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${n}() call`);let f={command:"format-msgs",messages:S,isWarning:D==="warning"};O!==void 0&&(f.color=O),U!==void 0&&(f.terminalWidth=U),p(r,f,(K,R)=>{if(K)return L(new Error(K),null);L(null,R.messages)})},analyzeMetafile:({callName:n,refs:r,metafile:s,options:h,callback:L})=>{h===void 0&&(h={});let S={},F=P(h,S,"color",Z),D=P(h,S,"verbose",Z);nB(h,S,`in ${n}() call`);let O={command:"analyze-metafile",metafile:s};F!==void 0&&(O.color=F),D!==void 0&&(O.verbose=D),p(r,O,(U,f)=>{if(U)return L(new Error(U),null);L(null,f.result)})}}}}function rA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let i=A++;return B.set(i,k),i}}}function WB(B,A,k){let i,j=!1;return()=>{if(j)return i;j=!0;try{let u=(B.stack+"").split(`
`);u.splice(1,1);let e=aA(A,u,k);if(e)return i={text:B.message,location:e},i}catch(u){}}}function yB(B,A,k,i,j){let u="Internal error",e=null;try{u=(B&&B.message||B)+""}catch(c){}try{e=aA(A,(B.stack+"").split(`
`),"")}catch(c){}return{id:"",pluginName:j,text:u,location:e,notes:i?[i]:[],detail:k?k.store(B):-1}}function aA(B,A,k){let i="    at ";if(B.readFileSync&&!A[0].startsWith(i)&&A[1].startsWith(i))for(let j=1;j<A.length;j++){let u=A[j];if(!!u.startsWith(i))for(u=u.slice(i.length);;){let e=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(e){u=e[1];continue}if(e=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),e){u=e[1];continue}if(e=/^(\S+):(\d+):(\d+)$/.exec(u),e){let c;try{c=B.readFileSync(e[1],"utf8")}catch(b){break}let E=c.split(/\r\n|\r|\n|\u2028|\u2029/)[+e[2]-1]||"",x=+e[3]-1,W=E.slice(x,x+k.length)===k?k.length:0;return{file:e[1],namespace:"file",line:+e[2],column:SB(E.slice(0,x)).length,length:SB(E.slice(x,x+W)).length,lineText:E+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}function CB(B,A,k){let i=5,j=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,i+1).map((e,c)=>{if(c===i)return`
...`;if(!e.location)return`
error: ${e.text}`;let{file:E,line:x,column:W}=e.location,b=e.pluginName?`[plugin: ${e.pluginName}] `:"";return`
${E}:${x}:${W}: ERROR: ${b}${e.text}`}).join(""),u=new Error(`${B}${j}`);return u.errors=A,u.warnings=k,u}function XB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}function iA(B,A){if(B==null)return null;let k={},i=P(B,k,"file",m),j=P(B,k,"namespace",m),u=P(B,k,"line",MB),e=P(B,k,"column",MB),c=P(B,k,"length",MB),E=P(B,k,"lineText",m),x=P(B,k,"suggestion",m);return nB(B,k,A),{file:i||"",namespace:j||"",line:u||0,column:e||0,length:c||0,lineText:E||"",suggestion:x||""}}function HB(B,A,k,i){let j=[],u=0;for(let e of B){let c={},E=P(e,c,"id",m),x=P(e,c,"pluginName",m),W=P(e,c,"text",m),b=P(e,c,"location",eA),p=P(e,c,"notes",eB),N=P(e,c,"detail",IB),Y=`in element ${u} of "${A}"`;nB(e,c,Y);let y=[];if(p)for(let l of p){let o={},Q=P(l,o,"text",m),H=P(l,o,"location",eA);nB(l,o,Y),y.push({text:Q||"",location:iA(H,Y)})}j.push({id:E||"",pluginName:x||i,text:W||"",location:iA(b,Y),notes:y,detail:k?k.store(N):-1}),u++}return j}function LB(B,A){let k=[];for(let i of B){if(typeof i!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(i)}return k}function vA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){return k===null&&(k=vB(A)),k}}}var MA="0.14.51",yA=B=>NB().build(B),CA=()=>{throw new Error('The "serve" API only works in node')},wA=(B,A)=>NB().transform(B,A),RA=(B,A)=>NB().formatMessages(B,A),DA=(B,A)=>NB().analyzeMetafile(B,A),_A=()=>{throw new Error('The "buildSync" API only works in node')},IA=()=>{throw new Error('The "transformSync" API only works in node')},FA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},UA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wB,qB,NB=()=>{if(qB)return qB;throw wB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},WA=B=>{B=SA(B||{});let A=B.wasmURL,k=B.wasmModule,i=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(wB)throw new Error('Cannot call "initialize" more than once');return wB=LA(A||"",k,i),wB.catch(()=>{wB=void 0}),wB},LA=(B,A,k)=>xB(void 0,null,function*(){let i;if(A)i=A;else{let c=yield fetch(B);if(!c.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);i=yield c.arrayBuffer()}let j;if(k){let c=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.14.51"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});j=new Worker(URL.createObjectURL(c))}else{let c=(E=>{var x=(p,N,Y)=>new Promise((y,l)=>{var o=M=>{try{H(Y.next(M))}catch(w){l(w)}},Q=M=>{try{H(Y.throw(M))}catch(w){l(w)}},H=M=>M.done?y(M.value):Promise.resolve(M.value).then(o,Q);H((Y=Y.apply(p,N)).next())});let W,b={};for(let p=self;p;p=Object.getPrototypeOf(p))for(let N of Object.getOwnPropertyNames(p))N in b||Object.defineProperty(b,N,{get:()=>self[N]});return(()=>{let p=()=>{let y=new Error("not implemented");return y.code="ENOSYS",y};if(!b.fs){let y="";b.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(l,o){y+=Y.decode(o);let Q=y.lastIndexOf(`
`);return Q!=-1&&(console.log(y.substr(0,Q)),y=y.substr(Q+1)),o.length},write(l,o,Q,H,M,w){if(Q!==0||H!==o.length||M!==null){w(p());return}let BB=this.writeSync(l,o);w(null,BB)},chmod(l,o,Q){Q(p())},chown(l,o,Q,H){H(p())},close(l,o){o(p())},fchmod(l,o,Q){Q(p())},fchown(l,o,Q,H){H(p())},fstat(l,o){o(p())},fsync(l,o){o(null)},ftruncate(l,o,Q){Q(p())},lchown(l,o,Q,H){H(p())},link(l,o,Q){Q(p())},lstat(l,o){o(p())},mkdir(l,o,Q){Q(p())},open(l,o,Q,H){H(p())},read(l,o,Q,H,M,w){w(p())},readdir(l,o){o(p())},readlink(l,o){o(p())},rename(l,o,Q){Q(p())},rmdir(l,o){o(p())},stat(l,o){o(p())},symlink(l,o,Q){Q(p())},truncate(l,o,Q){Q(p())},unlink(l,o){o(p())},utimes(l,o,Q,H){H(p())}}}if(b.process||(b.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw p()},pid:-1,ppid:-1,umask(){throw p()},cwd(){throw p()},chdir(){throw p()}}),!b.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!b.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!b.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!b.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let N=new TextEncoder("utf-8"),Y=new TextDecoder("utf-8");b.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let y=($,a)=>{this.mem.setUint32($+0,a,!0),this.mem.setUint32($+4,Math.floor(a/4294967296),!0)},l=$=>{let a=this.mem.getUint32($+0,!0),v=this.mem.getInt32($+4,!0);return a+v*4294967296},o=$=>{let a=this.mem.getFloat64($,!0);if(a===0)return;if(!isNaN(a))return a;let v=this.mem.getUint32($,!0);return this._values[v]},Q=($,a)=>{if(typeof a=="number"&&a!==0){if(isNaN(a)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,a,!0);return}if(a===void 0){this.mem.setFloat64($,0,!0);return}let n=this._ids.get(a);n===void 0&&(n=this._idPool.pop(),n===void 0&&(n=this._values.length),this._values[n]=a,this._goRefCounts[n]=0,this._ids.set(a,n)),this._goRefCounts[n]++;let r=0;switch(typeof a){case"object":a!==null&&(r=1);break;case"string":r=2;break;case"symbol":r=3;break;case"function":r=4;break}this.mem.setUint32($+4,2146959360|r,!0),this.mem.setUint32($,n,!0)},H=$=>{let a=l($+0),v=l($+8);return new Uint8Array(this._inst.exports.mem.buffer,a,v)},M=$=>{let a=l($+0),v=l($+8),n=new Array(v);for(let r=0;r<v;r++)n[r]=o(a+r*8);return n},w=$=>{let a=l($+0),v=l($+8);return Y.decode(new DataView(this._inst.exports.mem.buffer,a,v))},BB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let a=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(a)},"runtime.wasmWrite":$=>{$>>>=0;let a=l($+8),v=l($+16),n=this.mem.getInt32($+24,!0);b.fs.writeSync(a,new Uint8Array(this._inst.exports.mem.buffer,v,n))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,y($+8,(BB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let a=new Date().getTime();y($+8,a/1e3),this.mem.setInt32($+16,a%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let a=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(a,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(a);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},l($+8)+1)),this.mem.setInt32($+16,a,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let a=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(a)),this._scheduledTimeouts.delete(a)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(H($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let a=this.mem.getUint32($+8,!0);if(this._goRefCounts[a]--,this._goRefCounts[a]===0){let v=this._values[a];this._values[a]=null,this._ids.delete(v),this._idPool.push(a)}},"syscall/js.stringVal":$=>{$>>>=0,Q($+24,w($+8))},"syscall/js.valueGet":$=>{$>>>=0;let a=Reflect.get(o($+8),w($+16));$=this._inst.exports.getsp()>>>0,Q($+32,a)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(o($+8),w($+16),o($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(o($+8),w($+16))},"syscall/js.valueIndex":$=>{$>>>=0,Q($+24,Reflect.get(o($+8),l($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(o($+8),l($+16),o($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let a=o($+8),v=Reflect.get(a,w($+16)),n=M($+32),r=Reflect.apply(v,a,n);$=this._inst.exports.getsp()>>>0,Q($+56,r),this.mem.setUint8($+64,1)}catch(a){$=this._inst.exports.getsp()>>>0,Q($+56,a),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let a=o($+8),v=M($+16),n=Reflect.apply(a,void 0,v);$=this._inst.exports.getsp()>>>0,Q($+40,n),this.mem.setUint8($+48,1)}catch(a){$=this._inst.exports.getsp()>>>0,Q($+40,a),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let a=o($+8),v=M($+16),n=Reflect.construct(a,v);$=this._inst.exports.getsp()>>>0,Q($+40,n),this.mem.setUint8($+48,1)}catch(a){$=this._inst.exports.getsp()>>>0,Q($+40,a),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,y($+16,parseInt(o($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let a=N.encode(String(o($+8)));Q($+16,a),y($+24,a.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let a=o($+8);H($+16).set(a)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,o($+8)instanceof o($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let a=H($+8),v=o($+32);if(!(v instanceof Uint8Array||v instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let n=v.subarray(0,a.length);a.set(n),y($+40,n.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let a=o($+8),v=H($+16);if(!(a instanceof Uint8Array||a instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let n=v.subarray(0,a.length);a.set(n),y($+40,n.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(y){return x(this,null,function*(){if(!(y instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=y,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,b,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[b,5],[this,6]]),this._idPool=[],this.exited=!1;let l=4096,o=$=>{let a=l,v=N.encode($+"\0");return new Uint8Array(this.mem.buffer,l,v.length).set(v),l+=v.length,l%8!==0&&(l+=8-l%8),a},Q=this.argv.length,H=[];this.argv.forEach($=>{H.push(o($))}),H.push(0),Object.keys(this.env).sort().forEach($=>{H.push(o(`${$}=${this.env[$]}`))}),H.push(0);let w=l;H.forEach($=>{this.mem.setUint32(l,$,!0),this.mem.setUint32(l+4,0,!0),l+=8});let BB=4096+8192;if(l>=BB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(Q,w),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(y){let l=this;return function(){let o={id:y,this:this,args:arguments};return l._pendingEvent=o,l._resume(),o.result}}}})(),W=({data:p})=>{let N=new TextDecoder,Y=b.fs,y="";Y.writeSync=(M,w)=>{if(M===1)E(w);else if(M===2){y+=N.decode(w);let BB=y.split(`
`);BB.length>1&&console.log(BB.slice(0,-1).join(`
`)),y=BB[BB.length-1]}else throw new Error("Bad write");return w.length};let l=[],o,Q=0;W=({data:M})=>{M.length>0&&(l.push(M),o&&o())},Y.read=(M,w,BB,$,a,v)=>{if(M!==0||BB!==0||$!==w.length||a!==null)throw new Error("Bad read");if(l.length===0){o=()=>Y.read(M,w,BB,$,a,v);return}let n=l[0],r=Math.max(0,Math.min($,n.length-Q));w.set(n.subarray(Q,Q+r),BB),Q+=r,Q===n.length&&(l.shift(),Q=0),v(null,r)};let H=new b.Go;H.argv=["","--service=0.14.51"],p instanceof WebAssembly.Module?WebAssembly.instantiate(p,H.importObject).then(M=>H.run(M)):WebAssembly.instantiate(p,H.importObject).then(({instance:M})=>H.run(M))},p=>W(p)})(E=>j.onmessage({data:E}));j={onmessage:null,postMessage:E=>setTimeout(()=>c({data:E})),terminate(){}}}j.postMessage(i),j.onmessage=({data:c})=>u(c);let{readFromStdout:u,service:e}=xA({writeToStdin(c){j.postMessage(c)},isSync:!1,isWriteUnavailable:!0,esbuild:_B});qB={build:c=>new Promise((E,x)=>e.buildOrServe({callName:"build",refs:null,serveOptions:null,options:c,isTTY:!1,defaultWD:"/",callback:(W,b)=>W?x(W):E(b)})),transform:(c,E)=>new Promise((x,W)=>e.transform({callName:"transform",refs:null,input:c,options:E||{},isTTY:!1,fs:{readFile(b,p){p(new Error("Internal error"),null)},writeFile(b,p){p(null)}},callback:(b,p)=>b?W(b):x(p)})),formatMessages:(c,E)=>new Promise((x,W)=>e.formatMessages({callName:"formatMessages",refs:null,messages:c,options:E,callback:(b,p)=>b?W(b):x(p)})),analyzeMetafile:(c,E)=>new Promise((x,W)=>e.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof c=="string"?c:JSON.stringify(c),options:E,callback:(b,p)=>b?W(b):x(p)}))}}),NA=_B})(typeof ZB=="object"?ZB:{set exports(cB){(typeof self!="undefined"?self:this).esbuild=cB}})});RB();RB();var A7=new Error("timeout while waiting for mutex to become available"),$7=new Error("mutex already locked"),qA=new Error("request for lock canceled"),oA=function(cB,C,q,sB){function bB(uB){return uB instanceof q?uB:new q(function(hB){hB(uB)})}return new(q||(q=Promise))(function(uB,hB){function fB(tB){try{mB(sB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{mB(sB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?uB(tB.value):bB(tB.value).then(fB,DB)}mB((sB=sB.apply(cB,C||[])).next())})},KB=class{constructor(C,q=qA){if(this._maxConcurrency=C,this._cancelError=q,this._queue=[],this._waiters=[],C<=0)throw new Error("semaphore must be initialized to a positive value");this._value=C}acquire(){let C=this.isLocked(),q=new Promise((sB,bB)=>this._queue.push({resolve:sB,reject:bB}));return C||this._dispatch(),q}runExclusive(C){return oA(this,void 0,void 0,function*(){let[q,sB]=yield this.acquire();try{return yield C(q)}finally{sB()}})}waitForUnlock(){return oA(this,void 0,void 0,function*(){return this.isLocked()?new Promise(q=>this._waiters.push({resolve:q})):Promise.resolve()})}isLocked(){return this._value<=0}release(){if(this._maxConcurrency>1)throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");if(this._currentReleaser){let C=this._currentReleaser;this._currentReleaser=void 0,C()}}cancel(){this._queue.forEach(C=>C.reject(this._cancelError)),this._queue=[]}_dispatch(){let C=this._queue.shift();if(!C)return;let q=!1;this._currentReleaser=()=>{q||(q=!0,this._value++,this._resolveWaiters(),this._dispatch())},C.resolve([this._value--,this._currentReleaser])}_resolveWaiters(){this._waiters.forEach(C=>C.resolve()),this._waiters=[]}},YA=function(cB,C,q,sB){function bB(uB){return uB instanceof q?uB:new q(function(hB){hB(uB)})}return new(q||(q=Promise))(function(uB,hB){function fB(tB){try{mB(sB.next(tB))}catch(dB){hB(dB)}}function DB(tB){try{mB(sB.throw(tB))}catch(dB){hB(dB)}}function mB(tB){tB.done?uB(tB.value):bB(tB.value).then(fB,DB)}mB((sB=sB.apply(cB,C||[])).next())})},OB=class{constructor(C){this._semaphore=new KB(1,C)}acquire(){return YA(this,void 0,void 0,function*(){let[,C]=yield this._semaphore.acquire();return C})}runExclusive(C){return this._semaphore.runExclusive(()=>C())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var GB=VA(lA(),1);var jA="./esbuild-D3PW3UVI.wasm";var zB={initFinished:!1},ZA=new OB,i7=async()=>(zB.initFinished||await ZA.runExclusive(async()=>(zB.initFinished||await GB.initialize({wasmURL:jA}),zB.initFinished=!0,!0)),BA),zA=/ from \"\.\./ig,B7=/ from \"\./ig;async function BA(cB,C=4){try{return(await GB.transform(`/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    `+cB,{loader:"tsx",target:"esnext"})).code.replaceAll(zA,' from "/live').replaceAll(B7,' from "/live')}catch(q){if(C>0)return await sA(100),BA(cB,C-1);throw q}}export{i7 as init};
