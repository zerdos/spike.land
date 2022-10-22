import{a as qB}from"./chunk-chunk-CNQ6RIFM.mjs";import{a as W7,b as hB,e as PA,f as eB,h as LB,l as MA}from"./chunk-chunk-7S6RW3KX.mjs";import{b as yA}from"./chunk-chunk-66EYGUWD.mjs";import{B as xB,C as NB,G as GB,I as WA,R as vB,T as jB,a as CA,d as eA,f as wA,g as RA,i as DA,k as IA,m as _A,n as FA,u as fB,z as UA}from"./chunk-chunk-7S345MUO.mjs";import{b as OB,e as cB}from"./chunk-chunk-ZI6YOEXO.mjs";import{a as EA,b as U,c as aB}from"./chunk-chunk-L3K3VSNH.mjs";import{b as vA,d as kA,j as J}from"./chunk-chunk-FWOMBYHR.mjs";var LA=vA((l$,tA)=>{J();(s=>{"use strict";var E=Object.defineProperty,l=Object.getOwnPropertyDescriptor,H=Object.getOwnPropertyNames,D=Object.prototype.hasOwnProperty,x=(B,$)=>{for(var k in $)E(B,k,{get:$[k],enumerable:!0})},L=(B,$,k,p)=>{if($&&typeof $=="object"||typeof $=="function")for(let u of H($))!D.call(B,u)&&u!==k&&E(B,u,{get:()=>$[u],enumerable:!(p=l($,u))||p.enumerable});return B},PB=B=>L(E({},"__esModule",{value:!0}),B),AB=(B,$,k)=>new Promise((p,u)=>{var d=a=>{try{h(k.next(a))}catch(v){u(v)}},r=a=>{try{h(k.throw(a))}catch(v){u(v)}},h=a=>a.done?p(a.value):Promise.resolve(a.value).then(d,r);h((k=k.apply(B,$)).next())}),pB={};x(pB,{analyzeMetafile:()=>C7,analyzeMetafileSync:()=>I7,build:()=>x7,buildSync:()=>w7,default:()=>U7,formatMessages:()=>y7,formatMessagesSync:()=>D7,initialize:()=>_7,serve:()=>v7,transform:()=>M7,transformSync:()=>R7,version:()=>f7}),s.exports=PB(pB);function nB(B){let $=p=>{if(p===null)k.write8(0);else if(typeof p=="boolean")k.write8(1),k.write8(+p);else if(typeof p=="number")k.write8(2),k.write32(p|0);else if(typeof p=="string")k.write8(3),k.write(tB(p));else if(p instanceof Uint8Array)k.write8(4),k.write(p);else if(p instanceof Array){k.write8(5),k.write32(p.length);for(let u of p)$(u)}else{let u=Object.keys(p);k.write8(6),k.write32(u.length);for(let d of u)k.write(tB(d)),$(p[d])}},k=new rB;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),$(B.value),BA(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function gB(B){let $=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return TB(k.read());case 4:return k.read();case 5:{let r=k.read32(),h=[];for(let a=0;a<r;a++)h.push($());return h}case 6:{let r=k.read32(),h={};for(let a=0;a<r;a++)h[TB(k.read())]=$();return h}default:throw new Error("Invalid packet")}},k=new rB(B),p=k.read32(),u=(p&1)===0;p>>>=1;let d=$();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:p,isRequest:u,value:d}}var rB=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let $=new Uint8Array((this.len+B)*2);$.set(this.buf),this.buf=$}return this.len+=B,this.len-B}write8(B){let $=this._write(1);this.buf[$]=B}write32(B){let $=this._write(4);BA(this.buf,B,$)}write(B){let $=this._write(4+B.length);BA(this.buf,B.length,$),this.buf.set(B,$+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return cA(this.buf,this._read(4))}read(){let B=this.read32(),$=new Uint8Array(B),k=this._read($.length);return $.set(this.buf.subarray(k,k+B)),$}},tB,TB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,$=new TextDecoder;tB=k=>B.encode(k),TB=k=>$.decode(k)}else if(typeof Buffer<"u")tB=B=>{let $=Buffer.from(B);return $ instanceof Uint8Array||($=new Uint8Array($)),$},TB=B=>{let{buffer:$,byteOffset:k,byteLength:p}=B;return Buffer.from($,k,p).toString()};else throw new Error("No UTF-8 codec found");function cA(B,$){return B[$++]|B[$++]<<8|B[$++]<<16|B[$++]<<24}function BA(B,$,k){B[k++]=$,B[k++]=$>>8,B[k++]=$>>16,B[k++]=$>>24}var uA="warning",hA="silent";function mA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var RB=()=>null,V=B=>typeof B=="boolean"?null:"a boolean",p7=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",f=B=>typeof B=="string"?null:"a string",DB=B=>B instanceof RegExp?null:"a RegExp object",XB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",AA=B=>typeof B=="function"?null:"a function",Z=B=>Array.isArray(B)?null:"an array",lB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",c7=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",u7=B=>typeof B=="object"&&B!==null?null:"an array or an object",QA=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",dA=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",h7=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",m7=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",gA=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,$,k,p){let u=B[k];if($[k+""]=!0,u===void 0)return;let d=p(u);if(d!==null)throw new Error(`"${k}" must be ${d}`);return u}function BB(B,$,k){for(let p in B)if(!(p in $))throw new Error(`Invalid option ${k}: "${p}"`)}function Q7(B){let $=Object.create(null),k=P(B,$,"wasmURL",f),p=P(B,$,"wasmModule",c7),u=P(B,$,"worker",V);return BB(B,$,"in initialize() call"),{wasmURL:k,wasmModule:p,worker:u}}function TA(B){let $;if(B!==void 0){$=Object.create(null);for(let k of Object.keys(B)){let p=B[k];if(typeof p=="string"||p===!1)$[k]=p;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return $}function IB(B,$,k,p,u){let d=P($,k,"color",V),r=P($,k,"logLevel",f),h=P($,k,"logLimit",XB);d!==void 0?B.push(`--color=${d}`):p&&B.push("--color=true"),B.push(`--log-level=${r||u}`),B.push(`--log-limit=${h||0}`)}function XA(B,$,k){let p=P($,k,"legalComments",f),u=P($,k,"sourceRoot",f),d=P($,k,"sourcesContent",V),r=P($,k,"target",m7),h=P($,k,"format",f),a=P($,k,"globalName",f),v=P($,k,"mangleProps",DB),w=P($,k,"reserveProps",DB),b=P($,k,"mangleQuoted",V),g=P($,k,"minify",V),W=P($,k,"minifySyntax",V),I=P($,k,"minifyWhitespace",V),M=P($,k,"minifyIdentifiers",V),Q=P($,k,"drop",Z),m=P($,k,"charset",f),c=P($,k,"treeShaking",V),i=P($,k,"ignoreAnnotations",V),e=P($,k,"jsx",f),o=P($,k,"jsxFactory",f),T=P($,k,"jsxFragment",f),A=P($,k,"jsxImportSource",f),t=P($,k,"jsxDev",V),n=P($,k,"jsxSideEffects",V),j=P($,k,"define",lB),X=P($,k,"logOverride",lB),R=P($,k,"supported",lB),C=P($,k,"pure",Z),N=P($,k,"keepNames",V),_=P($,k,"platform",f);if(p&&B.push(`--legal-comments=${p}`),u!==void 0&&B.push(`--source-root=${u}`),d!==void 0&&B.push(`--sources-content=${d}`),r&&(Array.isArray(r)?B.push(`--target=${Array.from(r).map(mA).join(",")}`):B.push(`--target=${mA(r)}`)),h&&B.push(`--format=${h}`),a&&B.push(`--global-name=${a}`),_&&B.push(`--platform=${_}`),g&&B.push("--minify"),W&&B.push("--minify-syntax"),I&&B.push("--minify-whitespace"),M&&B.push("--minify-identifiers"),m&&B.push(`--charset=${m}`),c!==void 0&&B.push(`--tree-shaking=${c}`),i&&B.push("--ignore-annotations"),Q)for(let y of Q)B.push(`--drop:${y}`);if(v&&B.push(`--mangle-props=${v.source}`),w&&B.push(`--reserve-props=${w.source}`),b!==void 0&&B.push(`--mangle-quoted=${b}`),e&&B.push(`--jsx=${e}`),o&&B.push(`--jsx-factory=${o}`),T&&B.push(`--jsx-fragment=${T}`),A&&B.push(`--jsx-import-source=${A}`),t&&B.push("--jsx-dev"),n&&B.push("--jsx-side-effects"),j)for(let y in j){if(y.indexOf("=")>=0)throw new Error(`Invalid define: ${y}`);B.push(`--define:${y}=${j[y]}`)}if(X)for(let y in X){if(y.indexOf("=")>=0)throw new Error(`Invalid log override: ${y}`);B.push(`--log-override:${y}=${X[y]}`)}if(R)for(let y in R){if(y.indexOf("=")>=0)throw new Error(`Invalid supported: ${y}`);B.push(`--supported:${y}=${R[y]}`)}if(C)for(let y of C)B.push(`--pure:${y}`);N&&B.push("--keep-names")}function d7(B,$,k,p,u){var d;let r=[],h=[],a=Object.create(null),v=null,w=null,b=null;IB(r,$,a,k,p),XA(r,$,a);let g=P($,a,"sourcemap",dA),W=P($,a,"bundle",V),I=P($,a,"watch",p7),M=P($,a,"splitting",V),Q=P($,a,"preserveSymlinks",V),m=P($,a,"metafile",V),c=P($,a,"outfile",f),i=P($,a,"outdir",f),e=P($,a,"outbase",f),o=P($,a,"tsconfig",f),T=P($,a,"resolveExtensions",Z),A=P($,a,"nodePaths",Z),t=P($,a,"mainFields",Z),n=P($,a,"conditions",Z),j=P($,a,"external",Z),X=P($,a,"loader",lB),R=P($,a,"outExtension",lB),C=P($,a,"publicPath",f),N=P($,a,"entryNames",f),_=P($,a,"chunkNames",f),y=P($,a,"assetNames",f),G=P($,a,"inject",Z),z=P($,a,"banner",lB),$B=P($,a,"footer",lB),K=P($,a,"entryPoints",u7),O=P($,a,"absWorkingDir",f),F=P($,a,"stdin",lB),kB=(d=P($,a,"write",V))!=null?d:u,sB=P($,a,"allowOverwrite",V),dB=P($,a,"incremental",V)===!0,CB=P($,a,"mangleCache",lB);if(a.plugins=!0,BB($,a,`in ${B}() call`),g&&r.push(`--sourcemap${g===!0?"":`=${g}`}`),W&&r.push("--bundle"),sB&&r.push("--allow-overwrite"),I)if(r.push("--watch"),typeof I=="boolean")b={};else{let S=Object.create(null),q=P(I,S,"onRebuild",AA);BB(I,S,`on "watch" in ${B}() call`),b={onRebuild:q}}if(M&&r.push("--splitting"),Q&&r.push("--preserve-symlinks"),m&&r.push("--metafile"),c&&r.push(`--outfile=${c}`),i&&r.push(`--outdir=${i}`),e&&r.push(`--outbase=${e}`),o&&r.push(`--tsconfig=${o}`),T){let S=[];for(let q of T){if(q+="",q.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${q}`);S.push(q)}r.push(`--resolve-extensions=${S.join(",")}`)}if(C&&r.push(`--public-path=${C}`),N&&r.push(`--entry-names=${N}`),_&&r.push(`--chunk-names=${_}`),y&&r.push(`--asset-names=${y}`),t){let S=[];for(let q of t){if(q+="",q.indexOf(",")>=0)throw new Error(`Invalid main field: ${q}`);S.push(q)}r.push(`--main-fields=${S.join(",")}`)}if(n){let S=[];for(let q of n){if(q+="",q.indexOf(",")>=0)throw new Error(`Invalid condition: ${q}`);S.push(q)}r.push(`--conditions=${S.join(",")}`)}if(j)for(let S of j)r.push(`--external:${S}`);if(z)for(let S in z){if(S.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${S}`);r.push(`--banner:${S}=${z[S]}`)}if($B)for(let S in $B){if(S.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${S}`);r.push(`--footer:${S}=${$B[S]}`)}if(G)for(let S of G)r.push(`--inject:${S}`);if(X)for(let S in X){if(S.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${S}`);r.push(`--loader:${S}=${X[S]}`)}if(R)for(let S in R){if(S.indexOf("=")>=0)throw new Error(`Invalid out extension: ${S}`);r.push(`--out-extension:${S}=${R[S]}`)}if(K)if(Array.isArray(K))for(let S of K)h.push(["",S+""]);else for(let[S,q]of Object.entries(K))h.push([S+"",q+""]);if(F){let S=Object.create(null),q=P(F,S,"contents",gA),WB=P(F,S,"resolveDir",f),fA=P(F,S,"sourcefile",f),xA=P(F,S,"loader",f);BB(F,S,'in "stdin" object'),fA&&r.push(`--sourcefile=${fA}`),xA&&r.push(`--loader=${xA}`),WB&&(w=WB+""),typeof q=="string"?v=tB(q):q instanceof Uint8Array&&(v=q)}let oB=[];if(A)for(let S of A)S+="",oB.push(S);return{entries:h,flags:r,write:kB,stdinContents:v,stdinResolveDir:w,absWorkingDir:O,incremental:dB,nodePaths:oB,watch:b,mangleCache:TA(CB)}}function g7(B,$,k,p){let u=[],d=Object.create(null);IB(u,$,d,k,p),XA(u,$,d);let r=P($,d,"sourcemap",dA),h=P($,d,"tsconfigRaw",h7),a=P($,d,"sourcefile",f),v=P($,d,"loader",f),w=P($,d,"banner",f),b=P($,d,"footer",f),g=P($,d,"mangleCache",lB);return BB($,d,`in ${B}() call`),r&&u.push(`--sourcemap=${r===!0?"external":r}`),h&&u.push(`--tsconfig-raw=${typeof h=="string"?h:JSON.stringify(h)}`),a&&u.push(`--sourcefile=${a}`),v&&u.push(`--loader=${v}`),w&&u.push(`--banner=${w}`),b&&u.push(`--footer=${b}`),{flags:u,mangleCache:TA(g)}}function T7(B){let $={},k={didClose:!1,reason:""},p={},u=0,d=0,r=new Uint8Array(16*1024),h=0,a=i=>{let e=h+i.length;if(e>r.length){let T=new Uint8Array(e*2);T.set(r),r=T}r.set(i,h),h+=i.length;let o=0;for(;o+4<=h;){let T=cA(r,o);if(o+4+T>h)break;o+=4,I(r.subarray(o,o+T)),o+=T}o>0&&(r.copyWithin(0,o,h),h-=o)},v=i=>{k.didClose=!0,i&&(k.reason=": "+(i.message||i));let e="The service was stopped"+k.reason;for(let o in p)p[o](e,null);p={}},w=(i,e,o)=>{if(k.didClose)return o("The service is no longer running"+k.reason,null);let T=u++;p[T]=(A,t)=>{try{o(A,t)}finally{i&&i.unref()}},i&&i.ref(),B.writeToStdin(nB({id:T,isRequest:!0,value:e}))},b=(i,e)=>{if(k.didClose)throw new Error("The service is no longer running"+k.reason);B.writeToStdin(nB({id:i,isRequest:!1,value:e}))},g=(i,e)=>AB(this,null,function*(){try{if(e.command==="ping"){b(i,{});return}if(typeof e.key=="number"){let o=$[e.key];if(o){let T=o[e.command];if(T){yield T(i,e);return}}}throw new Error("Invalid command: "+e.command)}catch(o){b(i,{errors:[HB(o,B,null,void 0,"")]})}}),W=!0,I=i=>{if(W){W=!1;let o=String.fromCharCode(...i);if(o!=="0.15.12")throw new Error(`Cannot start service: Host version "0.15.12" does not match binary version ${JSON.stringify(o)}`);return}let e=gB(i);if(e.isRequest)g(e.id,e.value);else{let o=p[e.id];delete p[e.id],e.value.error?o(e.value.error,{}):o(null,e.value)}};return{readFromStdout:a,afterClose:v,service:{buildOrServe:({callName:i,refs:e,serveOptions:o,options:T,isTTY:A,defaultWD:t,callback:n})=>{let j=0,X=d++,R={},C={ref(){++j===1&&e&&e.ref()},unref(){--j===0&&(delete $[X],e&&e.unref())}};$[X]=R,C.ref(),X7(i,X,w,b,C,B,R,T,o,A,t,k,(N,_)=>{try{n(N,_)}finally{C.unref()}})},transform:({callName:i,refs:e,input:o,options:T,isTTY:A,fs:t,callback:n})=>{let j=HA(),X=R=>{try{if(typeof o!="string"&&!(o instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:C,mangleCache:N}=g7(i,T,A,hA),_={command:"transform",flags:C,inputFS:R!==null,input:R!==null?tB(R):typeof o=="string"?tB(o):o};N&&(_.mangleCache=N),w(e,_,(y,G)=>{if(y)return n(new Error(y),null);let z=uB(G.errors,j),$B=uB(G.warnings,j),K=1,O=()=>{if(--K===0){let F={warnings:$B,code:G.code,map:G.map};G.mangleCache&&(F.mangleCache=G?.mangleCache),n(null,F)}};if(z.length>0)return n(SB("Transform failed",z,$B),null);G.codeFS&&(K++,t.readFile(G.code,(F,kB)=>{F!==null?n(F,null):(G.code=kB,O())})),G.mapFS&&(K++,t.readFile(G.map,(F,kB)=>{F!==null?n(F,null):(G.map=kB,O())})),O()})}catch(C){let N=[];try{IB(N,T,{},A,hA)}catch{}let _=HB(C,B,j,void 0,"");w(e,{command:"error",flags:N,error:_},()=>{_.detail=j.load(_.detail),n(SB("Transform failed",[_],[]),null)})}};if((typeof o=="string"||o instanceof Uint8Array)&&o.length>1024*1024){let R=X;X=()=>t.writeFile(o,R)}X(null)},formatMessages:({callName:i,refs:e,messages:o,options:T,callback:A})=>{let t=QB(o,"messages",null,"");if(!T)throw new Error(`Missing second argument in ${i}() call`);let n={},j=P(T,n,"kind",f),X=P(T,n,"color",V),R=P(T,n,"terminalWidth",XB);if(BB(T,n,`in ${i}() call`),j===void 0)throw new Error(`Missing "kind" in ${i}() call`);if(j!=="error"&&j!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${i}() call`);let C={command:"format-msgs",messages:t,isWarning:j==="warning"};X!==void 0&&(C.color=X),R!==void 0&&(C.terminalWidth=R),w(e,C,(N,_)=>{if(N)return A(new Error(N),null);A(null,_.messages)})},analyzeMetafile:({callName:i,refs:e,metafile:o,options:T,callback:A})=>{T===void 0&&(T={});let t={},n=P(T,t,"color",V),j=P(T,t,"verbose",V);BB(T,t,`in ${i}() call`);let X={command:"analyze-metafile",metafile:o};n!==void 0&&(X.color=n),j!==void 0&&(X.verbose=j),w(e,X,(R,C)=>{if(R)return A(new Error(R),null);A(null,C.result)})}}}}function X7(B,$,k,p,u,d,r,h,a,v,w,b,g){let W=HA(),I=(c,i,e,o)=>{let T=[];try{IB(T,h,{},v,uA)}catch{}let A=HB(c,d,W,e,i);k(u,{command:"error",flags:T,error:A},()=>{A.detail=W.load(A.detail),o(A)})},M=(c,i)=>{I(c,i,void 0,e=>{g(SB("Build failed",[e],[]),null)})},Q;if(typeof h=="object"){let c=h.plugins;if(c!==void 0){if(!Array.isArray(c))throw new Error('"plugins" must be an array');Q=c}}if(Q&&Q.length>0){if(d.isSync){M(new Error("Cannot use plugins in synchronous API calls"),"");return}S7($,k,p,u,d,r,h,Q,W).then(c=>{if(!c.ok){M(c.error,c.pluginName);return}try{m(c.requestPlugins,c.runOnEndCallbacks)}catch(i){M(i,"")}},c=>M(c,""));return}try{m(null,(c,i,e)=>e())}catch(c){M(c,"")}function m(c,i){let e=!d.isWriteUnavailable,{entries:o,flags:T,write:A,stdinContents:t,stdinResolveDir:n,absWorkingDir:j,incremental:X,nodePaths:R,watch:C,mangleCache:N}=d7(B,h,v,uA,e),_={command:"build",key:$,entries:o,flags:T,write:A,stdinContents:t,stdinResolveDir:n,absWorkingDir:j||w,incremental:X,nodePaths:R};c&&(_.plugins=c),N&&(_.mangleCache=N);let y=a&&H7($,k,p,u,r,a,_),G,z,$B=(O,F)=>{O.outputFiles&&(F.outputFiles=O.outputFiles.map(b7)),O.metafile&&(F.metafile=JSON.parse(O.metafile)),O.mangleCache&&(F.mangleCache=O.mangleCache),O.writeToStdout!==void 0&&console.log(TB(O.writeToStdout).replace(/\n$/,""))},K=(O,F)=>{let kB={errors:uB(O.errors,W),warnings:uB(O.warnings,W)};$B(O,kB),i(kB,I,()=>{if(kB.errors.length>0)return F(SB("Build failed",kB.errors,kB.warnings),null);if(O.rebuild){if(!G){let sB=!1;G=()=>new Promise((dB,CB)=>{if(sB||b.didClose)throw new Error("Cannot rebuild");k(u,{command:"rebuild",key:$},(oB,S)=>{if(oB)return F(SB("Build failed",[{id:"",pluginName:"",text:oB,location:null,notes:[],detail:void 0}],[]),null);K(S,(q,WB)=>{q?CB(q):dB(WB)})})}),u.ref(),G.dispose=()=>{sB||(sB=!0,k(u,{command:"rebuild-dispose",key:$},()=>{}),u.unref())}}kB.rebuild=G}if(O.watch){if(!z){let sB=!1;u.ref(),z=()=>{sB||(sB=!0,delete r["watch-rebuild"],k(u,{command:"watch-stop",key:$},()=>{}),u.unref())},C&&(r["watch-rebuild"]=(dB,CB)=>{try{let oB=CB.args,S={errors:uB(oB.errors,W),warnings:uB(oB.warnings,W)};$B(oB,S),i(S,I,()=>{if(S.errors.length>0){C.onRebuild&&C.onRebuild(SB("Build failed",S.errors,S.warnings),null);return}S.stop=z,C.onRebuild&&C.onRebuild(null,S)})}catch(oB){console.error(oB)}p(dB,{})})}kB.stop=z}F(null,kB)})};if(A&&d.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(X&&d.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(C&&d.isSync)throw new Error('Cannot use "watch" with a synchronous build');k(u,_,(O,F)=>{if(O)return g(new Error(O),null);if(y){let kB=F,sB=!1;u.ref();let dB={port:kB.port,host:kB.host,wait:y.wait,stop(){sB||(sB=!0,y.stop(),u.unref())}};return u.ref(),y.wait.then(u.unref,u.unref),g(null,dB)}return K(F,g)})}}var H7=(B,$,k,p,u,d,r)=>{let h={},a=P(d,h,"port",XB),v=P(d,h,"host",f),w=P(d,h,"servedir",f),b=P(d,h,"onRequest",AA),g=new Promise((W,I)=>{u["serve-wait"]=(M,Q)=>{Q.error!==null?I(new Error(Q.error)):W(),k(M,{})}});return r.serve={},BB(d,h,"in serve() call"),a!==void 0&&(r.serve.port=a),v!==void 0&&(r.serve.host=v),w!==void 0&&(r.serve.servedir=w),u["serve-request"]=(W,I)=>{b&&b(I.args),k(W,{})},{wait:g,stop(){$(p,{command:"serve-stop",key:B},()=>{})}}},S7=(B,$,k,p,u,d,r,h,a)=>AB(void 0,null,function*(){let v=[],w=[],b={},g={},W=0,I=0,M=[],Q=!1;h=[...h];for(let c of h){let i={};if(typeof c!="object")throw new Error(`Plugin at index ${I} must be an object`);let e=P(c,i,"name",f);if(typeof e!="string"||e==="")throw new Error(`Plugin at index ${I} is missing a name`);try{let o=P(c,i,"setup",AA);if(typeof o!="function")throw new Error("Plugin is missing a setup function");BB(c,i,`on plugin ${JSON.stringify(e)}`);let T={name:e,onResolve:[],onLoad:[]};I++;let t=o({initialOptions:r,resolve:(n,j={})=>{if(!Q)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof n!="string")throw new Error("The path to resolve must be a string");let X=Object.create(null),R=P(j,X,"pluginName",f),C=P(j,X,"importer",f),N=P(j,X,"namespace",f),_=P(j,X,"resolveDir",f),y=P(j,X,"kind",f),G=P(j,X,"pluginData",RB);return BB(j,X,"in resolve() call"),new Promise((z,$B)=>{let K={command:"resolve",path:n,key:B,pluginName:e};R!=null&&(K.pluginName=R),C!=null&&(K.importer=C),N!=null&&(K.namespace=N),_!=null&&(K.resolveDir=_),y!=null&&(K.kind=y),G!=null&&(K.pluginData=a.store(G)),$(p,K,(O,F)=>{O!==null?$B(new Error(O)):z({errors:uB(F.errors,a),warnings:uB(F.warnings,a),path:F.path,external:F.external,sideEffects:F.sideEffects,namespace:F.namespace,suffix:F.suffix,pluginData:a.load(F.pluginData)})})})},onStart(n){let j='This error came from the "onStart" callback registered here:',X=_B(new Error(j),u,"onStart");v.push({name:e,callback:n,note:X})},onEnd(n){let j='This error came from the "onEnd" callback registered here:',X=_B(new Error(j),u,"onEnd");w.push({name:e,callback:n,note:X})},onResolve(n,j){let X='This error came from the "onResolve" callback registered here:',R=_B(new Error(X),u,"onResolve"),C={},N=P(n,C,"filter",DB),_=P(n,C,"namespace",f);if(BB(n,C,`in onResolve() call for plugin ${JSON.stringify(e)}`),N==null)throw new Error("onResolve() call is missing a filter");let y=W++;b[y]={name:e,callback:j,note:R},T.onResolve.push({id:y,filter:N.source,namespace:_||""})},onLoad(n,j){let X='This error came from the "onLoad" callback registered here:',R=_B(new Error(X),u,"onLoad"),C={},N=P(n,C,"filter",DB),_=P(n,C,"namespace",f);if(BB(n,C,`in onLoad() call for plugin ${JSON.stringify(e)}`),N==null)throw new Error("onLoad() call is missing a filter");let y=W++;g[y]={name:e,callback:j,note:R},T.onLoad.push({id:y,filter:N.source,namespace:_||""})},esbuild:u.esbuild});t&&(yield t),M.push(T)}catch(o){return{ok:!1,error:o,pluginName:e}}}d["on-start"]=(c,i)=>AB(void 0,null,function*(){let e={errors:[],warnings:[]};yield Promise.all(v.map(o=>AB(void 0,[o],function*({name:T,callback:A,note:t}){try{let n=yield A();if(n!=null){if(typeof n!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(T)} to return an object`);let j={},X=P(n,j,"errors",Z),R=P(n,j,"warnings",Z);BB(n,j,`from onStart() callback in plugin ${JSON.stringify(T)}`),X!=null&&e.errors.push(...QB(X,"errors",a,T)),R!=null&&e.warnings.push(...QB(R,"warnings",a,T))}}catch(n){e.errors.push(HB(n,u,a,t&&t(),T))}}))),k(c,e)}),d["on-resolve"]=(c,i)=>AB(void 0,null,function*(){let e={},o="",T,A;for(let t of i.ids)try{({name:o,callback:T,note:A}=b[t]);let n=yield T({path:i.path,importer:i.importer,namespace:i.namespace,resolveDir:i.resolveDir,kind:i.kind,pluginData:a.load(i.pluginData)});if(n!=null){if(typeof n!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(o)} to return an object`);let j={},X=P(n,j,"pluginName",f),R=P(n,j,"path",f),C=P(n,j,"namespace",f),N=P(n,j,"suffix",f),_=P(n,j,"external",V),y=P(n,j,"sideEffects",V),G=P(n,j,"pluginData",RB),z=P(n,j,"errors",Z),$B=P(n,j,"warnings",Z),K=P(n,j,"watchFiles",Z),O=P(n,j,"watchDirs",Z);BB(n,j,`from onResolve() callback in plugin ${JSON.stringify(o)}`),e.id=t,X!=null&&(e.pluginName=X),R!=null&&(e.path=R),C!=null&&(e.namespace=C),N!=null&&(e.suffix=N),_!=null&&(e.external=_),y!=null&&(e.sideEffects=y),G!=null&&(e.pluginData=a.store(G)),z!=null&&(e.errors=QB(z,"errors",a,o)),$B!=null&&(e.warnings=QB($B,"warnings",a,o)),K!=null&&(e.watchFiles=FB(K,"watchFiles")),O!=null&&(e.watchDirs=FB(O,"watchDirs"));break}}catch(n){e={id:t,errors:[HB(n,u,a,A&&A(),o)]};break}k(c,e)}),d["on-load"]=(c,i)=>AB(void 0,null,function*(){let e={},o="",T,A;for(let t of i.ids)try{({name:o,callback:T,note:A}=g[t]);let n=yield T({path:i.path,namespace:i.namespace,suffix:i.suffix,pluginData:a.load(i.pluginData)});if(n!=null){if(typeof n!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(o)} to return an object`);let j={},X=P(n,j,"pluginName",f),R=P(n,j,"contents",gA),C=P(n,j,"resolveDir",f),N=P(n,j,"pluginData",RB),_=P(n,j,"loader",f),y=P(n,j,"errors",Z),G=P(n,j,"warnings",Z),z=P(n,j,"watchFiles",Z),$B=P(n,j,"watchDirs",Z);BB(n,j,`from onLoad() callback in plugin ${JSON.stringify(o)}`),e.id=t,X!=null&&(e.pluginName=X),R instanceof Uint8Array?e.contents=R:R!=null&&(e.contents=tB(R)),C!=null&&(e.resolveDir=C),N!=null&&(e.pluginData=a.store(N)),_!=null&&(e.loader=_),y!=null&&(e.errors=QB(y,"errors",a,o)),G!=null&&(e.warnings=QB(G,"warnings",a,o)),z!=null&&(e.watchFiles=FB(z,"watchFiles")),$B!=null&&(e.watchDirs=FB($B,"watchDirs"));break}}catch(n){e={id:t,errors:[HB(n,u,a,A&&A(),o)]};break}k(c,e)});let m=(c,i,e)=>e();return w.length>0&&(m=(c,i,e)=>{(()=>AB(void 0,null,function*(){for(let{name:o,callback:T,note:A}of w)try{yield T(c)}catch(t){c.errors.push(yield new Promise(n=>i(t,o,A&&A(),n)))}}))().then(e)}),Q=!0,{ok:!0,requestPlugins:M,runOnEndCallbacks:m}});function HA(){let B=new Map,$=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let p=$++;return B.set(p,k),p}}}function _B(B,$,k){let p,u=!1;return()=>{if(u)return p;u=!0;try{let d=(B.stack+"").split(`
`);d.splice(1,1);let r=SA($,d,k);if(r)return p={text:B.message,location:r},p}catch{}}}function HB(B,$,k,p,u){let d="Internal error",r=null;try{d=(B&&B.message||B)+""}catch{}try{r=SA($,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:u,text:d,location:r,notes:p?[p]:[],detail:k?k.store(B):-1}}function SA(B,$,k){let p="    at ";if(B.readFileSync&&!$[0].startsWith(p)&&$[1].startsWith(p))for(let u=1;u<$.length;u++){let d=$[u];if(!!d.startsWith(p))for(d=d.slice(p.length);;){let r=/^(?:new |async )?\S+ \((.*)\)$/.exec(d);if(r){d=r[1];continue}if(r=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(d),r){d=r[1];continue}if(r=/^(\S+):(\d+):(\d+)$/.exec(d),r){let h;try{h=B.readFileSync(r[1],"utf8")}catch{break}let a=h.split(/\r\n|\r|\n|\u2028|\u2029/)[+r[2]-1]||"",v=+r[3]-1,w=a.slice(v,v+k.length)===k?k.length:0;return{file:r[1],namespace:"file",line:+r[2],column:tB(a.slice(0,v)).length,length:tB(a.slice(v,v+w)).length,lineText:a+`
`+$.slice(1).join(`
`),suggestion:""}}break}}return null}function SB(B,$,k){let p=5,u=$.length<1?"":` with ${$.length} error${$.length<2?"":"s"}:`+$.slice(0,p+1).map((r,h)=>{if(h===p)return`
...`;if(!r.location)return`
error: ${r.text}`;let{file:a,line:v,column:w}=r.location,b=r.pluginName?`[plugin: ${r.pluginName}] `:"";return`
${a}:${v}:${w}: ERROR: ${b}${r.text}`}).join(""),d=new Error(`${B}${u}`);return d.errors=$,d.warnings=k,d}function uB(B,$){for(let k of B)k.detail=$.load(k.detail);return B}function bA(B,$){if(B==null)return null;let k={},p=P(B,k,"file",f),u=P(B,k,"namespace",f),d=P(B,k,"line",XB),r=P(B,k,"column",XB),h=P(B,k,"length",XB),a=P(B,k,"lineText",f),v=P(B,k,"suggestion",f);return BB(B,k,$),{file:p||"",namespace:u||"",line:d||0,column:r||0,length:h||0,lineText:a||"",suggestion:v||""}}function QB(B,$,k,p){let u=[],d=0;for(let r of B){let h={},a=P(r,h,"id",f),v=P(r,h,"pluginName",f),w=P(r,h,"text",f),b=P(r,h,"location",QA),g=P(r,h,"notes",Z),W=P(r,h,"detail",RB),I=`in element ${d} of "${$}"`;BB(r,h,I);let M=[];if(g)for(let Q of g){let m={},c=P(Q,m,"text",f),i=P(Q,m,"location",QA);BB(Q,m,I),M.push({text:c||"",location:bA(i,I)})}u.push({id:a||"",pluginName:v||p,text:w||"",location:bA(b,I),notes:M,detail:k?k.store(W):-1}),d++}return u}function FB(B,$){let k=[];for(let p of B){if(typeof p!="string")throw new Error(`${JSON.stringify($)} must be an array of strings`);k.push(p)}return k}function b7({path:B,contents:$}){let k=null;return{path:B,contents:$,get text(){let p=this.contents;return(k===null||p!==$)&&($=p,k=TB(p)),k}}}var f7="0.15.12",x7=B=>UB().build(B),v7=()=>{throw new Error('The "serve" API only works in node')},M7=(B,$)=>UB().transform(B,$),y7=(B,$)=>UB().formatMessages(B,$),C7=(B,$)=>UB().analyzeMetafile(B,$),w7=()=>{throw new Error('The "buildSync" API only works in node')},R7=()=>{throw new Error('The "transformSync" API only works in node')},D7=()=>{throw new Error('The "formatMessagesSync" API only works in node')},I7=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},bB,$A,UB=()=>{if($A)return $A;throw bB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},_7=B=>{B=Q7(B||{});let $=B.wasmURL,k=B.wasmModule,p=B.worker!==!1;if(!$&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(bB)throw new Error('Cannot call "initialize" more than once');return bB=F7($||"",k,p),bB.catch(()=>{bB=void 0}),bB},F7=(B,$,k)=>AB(void 0,null,function*(){let p;if($)p=$;else{let h=yield fetch(B);if(!h.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);p=yield h.arrayBuffer()}let u;if(k){let h=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.15.12"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});u=new Worker(URL.createObjectURL(h))}else{let h=(a=>{var v=(g,W,I)=>new Promise((M,Q)=>{var m=e=>{try{i(I.next(e))}catch(o){Q(o)}},c=e=>{try{i(I.throw(e))}catch(o){Q(o)}},i=e=>e.done?M(e.value):Promise.resolve(e.value).then(m,c);i((I=I.apply(g,W)).next())});let w,b={};for(let g=self;g;g=Object.getPrototypeOf(g))for(let W of Object.getOwnPropertyNames(g))W in b||Object.defineProperty(b,W,{get:()=>self[W]});return(()=>{let g=()=>{let M=new Error("not implemented");return M.code="ENOSYS",M};if(!b.fs){let M="";b.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(Q,m){M+=I.decode(m);let c=M.lastIndexOf(`
`);return c!=-1&&(console.log(M.substr(0,c)),M=M.substr(c+1)),m.length},write(Q,m,c,i,e,o){if(c!==0||i!==m.length||e!==null){o(g());return}let T=this.writeSync(Q,m);o(null,T)},chmod(Q,m,c){c(g())},chown(Q,m,c,i){i(g())},close(Q,m){m(g())},fchmod(Q,m,c){c(g())},fchown(Q,m,c,i){i(g())},fstat(Q,m){m(g())},fsync(Q,m){m(null)},ftruncate(Q,m,c){c(g())},lchown(Q,m,c,i){i(g())},link(Q,m,c){c(g())},lstat(Q,m){m(g())},mkdir(Q,m,c){c(g())},open(Q,m,c,i){i(g())},read(Q,m,c,i,e,o){o(g())},readdir(Q,m){m(g())},readlink(Q,m){m(g())},rename(Q,m,c){c(g())},rmdir(Q,m){m(g())},stat(Q,m){m(g())},symlink(Q,m,c){c(g())},truncate(Q,m,c){c(g())},unlink(Q,m){m(g())},utimes(Q,m,c,i){i(g())}}}if(b.process||(b.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw g()},pid:-1,ppid:-1,umask(){throw g()},cwd(){throw g()},chdir(){throw g()}}),!b.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!b.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!b.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!b.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let W=new TextEncoder("utf-8"),I=new TextDecoder("utf-8");b.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=A=>{A!==0&&console.warn("exit code:",A)},this._exitPromise=new Promise(A=>{this._resolveExitPromise=A}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let M=(A,t)=>{this.mem.setUint32(A+0,t,!0),this.mem.setUint32(A+4,Math.floor(t/4294967296),!0)},Q=A=>{let t=this.mem.getUint32(A+0,!0),n=this.mem.getInt32(A+4,!0);return t+n*4294967296},m=A=>{let t=this.mem.getFloat64(A,!0);if(t===0)return;if(!isNaN(t))return t;let n=this.mem.getUint32(A,!0);return this._values[n]},c=(A,t)=>{if(typeof t=="number"&&t!==0){if(isNaN(t)){this.mem.setUint32(A+4,2146959360,!0),this.mem.setUint32(A,0,!0);return}this.mem.setFloat64(A,t,!0);return}if(t===void 0){this.mem.setFloat64(A,0,!0);return}let j=this._ids.get(t);j===void 0&&(j=this._idPool.pop(),j===void 0&&(j=this._values.length),this._values[j]=t,this._goRefCounts[j]=0,this._ids.set(t,j)),this._goRefCounts[j]++;let X=0;switch(typeof t){case"object":t!==null&&(X=1);break;case"string":X=2;break;case"symbol":X=3;break;case"function":X=4;break}this.mem.setUint32(A+4,2146959360|X,!0),this.mem.setUint32(A,j,!0)},i=A=>{let t=Q(A+0),n=Q(A+8);return new Uint8Array(this._inst.exports.mem.buffer,t,n)},e=A=>{let t=Q(A+0),n=Q(A+8),j=new Array(n);for(let X=0;X<n;X++)j[X]=m(t+X*8);return j},o=A=>{let t=Q(A+0),n=Q(A+8);return I.decode(new DataView(this._inst.exports.mem.buffer,t,n))},T=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":A=>{A>>>=0;let t=this.mem.getInt32(A+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(t)},"runtime.wasmWrite":A=>{A>>>=0;let t=Q(A+8),n=Q(A+16),j=this.mem.getInt32(A+24,!0);b.fs.writeSync(t,new Uint8Array(this._inst.exports.mem.buffer,n,j))},"runtime.resetMemoryDataView":A=>{A>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":A=>{A>>>=0,M(A+8,(T+performance.now())*1e6)},"runtime.walltime":A=>{A>>>=0;let t=new Date().getTime();M(A+8,t/1e3),this.mem.setInt32(A+16,t%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":A=>{A>>>=0;let t=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(t,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(t);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},Q(A+8)+1)),this.mem.setInt32(A+16,t,!0)},"runtime.clearTimeoutEvent":A=>{A>>>=0;let t=this.mem.getInt32(A+8,!0);clearTimeout(this._scheduledTimeouts.get(t)),this._scheduledTimeouts.delete(t)},"runtime.getRandomData":A=>{A>>>=0,crypto.getRandomValues(i(A+8))},"syscall/js.finalizeRef":A=>{A>>>=0;let t=this.mem.getUint32(A+8,!0);if(this._goRefCounts[t]--,this._goRefCounts[t]===0){let n=this._values[t];this._values[t]=null,this._ids.delete(n),this._idPool.push(t)}},"syscall/js.stringVal":A=>{A>>>=0,c(A+24,o(A+8))},"syscall/js.valueGet":A=>{A>>>=0;let t=Reflect.get(m(A+8),o(A+16));A=this._inst.exports.getsp()>>>0,c(A+32,t)},"syscall/js.valueSet":A=>{A>>>=0,Reflect.set(m(A+8),o(A+16),m(A+32))},"syscall/js.valueDelete":A=>{A>>>=0,Reflect.deleteProperty(m(A+8),o(A+16))},"syscall/js.valueIndex":A=>{A>>>=0,c(A+24,Reflect.get(m(A+8),Q(A+16)))},"syscall/js.valueSetIndex":A=>{A>>>=0,Reflect.set(m(A+8),Q(A+16),m(A+24))},"syscall/js.valueCall":A=>{A>>>=0;try{let t=m(A+8),n=Reflect.get(t,o(A+16)),j=e(A+32),X=Reflect.apply(n,t,j);A=this._inst.exports.getsp()>>>0,c(A+56,X),this.mem.setUint8(A+64,1)}catch(t){A=this._inst.exports.getsp()>>>0,c(A+56,t),this.mem.setUint8(A+64,0)}},"syscall/js.valueInvoke":A=>{A>>>=0;try{let t=m(A+8),n=e(A+16),j=Reflect.apply(t,void 0,n);A=this._inst.exports.getsp()>>>0,c(A+40,j),this.mem.setUint8(A+48,1)}catch(t){A=this._inst.exports.getsp()>>>0,c(A+40,t),this.mem.setUint8(A+48,0)}},"syscall/js.valueNew":A=>{A>>>=0;try{let t=m(A+8),n=e(A+16),j=Reflect.construct(t,n);A=this._inst.exports.getsp()>>>0,c(A+40,j),this.mem.setUint8(A+48,1)}catch(t){A=this._inst.exports.getsp()>>>0,c(A+40,t),this.mem.setUint8(A+48,0)}},"syscall/js.valueLength":A=>{A>>>=0,M(A+16,parseInt(m(A+8).length))},"syscall/js.valuePrepareString":A=>{A>>>=0;let t=W.encode(String(m(A+8)));c(A+16,t),M(A+24,t.length)},"syscall/js.valueLoadString":A=>{A>>>=0;let t=m(A+8);i(A+16).set(t)},"syscall/js.valueInstanceOf":A=>{A>>>=0,this.mem.setUint8(A+24,m(A+8)instanceof m(A+16)?1:0)},"syscall/js.copyBytesToGo":A=>{A>>>=0;let t=i(A+8),n=m(A+32);if(!(n instanceof Uint8Array||n instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let j=n.subarray(0,t.length);t.set(j),M(A+40,j.length),this.mem.setUint8(A+48,1)},"syscall/js.copyBytesToJS":A=>{A>>>=0;let t=m(A+8),n=i(A+16);if(!(t instanceof Uint8Array||t instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let j=n.subarray(0,t.length);t.set(j),M(A+40,j.length),this.mem.setUint8(A+48,1)},debug:A=>{console.log(A)}}}}run(M){return v(this,null,function*(){if(!(M instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=M,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,b,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[b,5],[this,6]]),this._idPool=[],this.exited=!1;let Q=4096,m=A=>{let t=Q,n=W.encode(A+"\0");return new Uint8Array(this.mem.buffer,Q,n.length).set(n),Q+=n.length,Q%8!==0&&(Q+=8-Q%8),t},c=this.argv.length,i=[];this.argv.forEach(A=>{i.push(m(A))}),i.push(0),Object.keys(this.env).sort().forEach(A=>{i.push(m(`${A}=${this.env[A]}`))}),i.push(0);let o=Q;i.forEach(A=>{this.mem.setUint32(Q,A,!0),this.mem.setUint32(Q+4,0,!0),Q+=8});let T=4096+8192;if(Q>=T)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(c,o),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(M){let Q=this;return function(){let m={id:M,this:this,args:arguments};return Q._pendingEvent=m,Q._resume(),m.result}}}})(),w=({data:g})=>{let W=new TextDecoder,I=b.fs,M="";I.writeSync=(e,o)=>{if(e===1)a(o);else if(e===2){M+=W.decode(o);let T=M.split(`
`);T.length>1&&console.log(T.slice(0,-1).join(`
`)),M=T[T.length-1]}else throw new Error("Bad write");return o.length};let Q=[],m,c=0;w=({data:e})=>{e.length>0&&(Q.push(e),m&&m())},I.read=(e,o,T,A,t,n)=>{if(e!==0||T!==0||A!==o.length||t!==null)throw new Error("Bad read");if(Q.length===0){m=()=>I.read(e,o,T,A,t,n);return}let j=Q[0],X=Math.max(0,Math.min(A,j.length-c));o.set(j.subarray(c,c+X),T),c+=X,c===j.length&&(Q.shift(),c=0),n(null,X)};let i=new b.Go;i.argv=["","--service=0.15.12"],g instanceof WebAssembly.Module?WebAssembly.instantiate(g,i.importObject).then(e=>i.run(e)):WebAssembly.instantiate(g,i.importObject).then(({instance:e})=>i.run(e))},g=>w(g)})(a=>u.onmessage({data:a}));u={onmessage:null,postMessage:a=>setTimeout(()=>h({data:a})),terminate(){}}}u.postMessage(p),u.onmessage=({data:h})=>d(h);let{readFromStdout:d,service:r}=T7({writeToStdin(h){u.postMessage(h)},isSync:!1,isWriteUnavailable:!0,esbuild:pB});$A={build:h=>new Promise((a,v)=>r.buildOrServe({callName:"build",refs:null,serveOptions:null,options:h,isTTY:!1,defaultWD:"/",callback:(w,b)=>w?v(w):a(b)})),transform:(h,a)=>new Promise((v,w)=>r.transform({callName:"transform",refs:null,input:h,options:a||{},isTTY:!1,fs:{readFile(b,g){g(new Error("Internal error"),null)},writeFile(b,g){g(null)}},callback:(b,g)=>b?w(b):v(g)})),formatMessages:(h,a)=>new Promise((v,w)=>r.formatMessages({callName:"formatMessages",refs:null,messages:h,options:a,callback:(b,g)=>b?w(b):v(g)})),analyzeMetafile:(h,a)=>new Promise((v,w)=>r.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof h=="string"?h:JSON.stringify(h),options:a,callback:(b,g)=>b?w(b):v(g)}))}}),U7=pB})(typeof tA=="object"?tA:{set exports(s){(typeof self<"u"?self:this).esbuild=s}})});var e7=vA((N$,P7)=>{"use strict";J();var k7=Function.prototype.toString,yB=typeof Reflect=="object"&&Reflect!==null&&Reflect.apply,sA,YB;if(typeof yB=="function"&&typeof Object.defineProperty=="function")try{sA=Object.defineProperty({},"length",{get:function(){throw YB}}),YB={},yB(function(){throw 42},null,sA)}catch(s){s!==YB&&(yB=null)}else yB=null;var K7=/^\s*class\b/,oA=function(E){try{var l=k7.call(E);return K7.test(l)}catch{return!1}},iA=function(E){try{return oA(E)?!1:(k7.call(E),!0)}catch{return!1}},ZB=Object.prototype.toString,Y7="[object Object]",Z7="[object Function]",z7="[object GeneratorFunction]",B$="[object HTMLAllCollection]",A$="[object HTML document.all class]",$$="[object HTMLCollection]",k$=typeof Symbol=="function"&&!!Symbol.toStringTag,P$=!(0 in[,]),lA=function(){return!1};typeof document=="object"&&($7=document.all,ZB.call($7)===ZB.call(document.all)&&(lA=function(E){if((P$||!E)&&(typeof E>"u"||typeof E=="object"))try{var l=ZB.call(E);return(l===B$||l===A$||l===$$||l===Y7)&&E("")==null}catch{}return!1}));var $7;P7.exports=yB?function(E){if(lA(E))return!0;if(!E||typeof E!="function"&&typeof E!="object")return!1;try{yB(E,null,sA)}catch(l){if(l!==YB)return!1}return!oA(E)&&iA(E)}:function(E){if(lA(E))return!0;if(!E||typeof E!="function"&&typeof E!="object")return!1;if(k$)return iA(E);if(oA(E))return!1;var l=ZB.call(E);return l!==Z7&&l!==z7&&!/^\[object HTML/.test(l)?!1:iA(E)}});J();jB();J();J();var JB=kA(LA(),1);var NA="./chunk-esbuild-6NIHVSNG.wasm";var MB={init:!1,initialize:()=>{if(MB.init!==!1)return MB.init;let s=new URL(NA,location.origin).toString();return MB.init=(0,JB.initialize)({wasmURL:s}).then(()=>MB.init=!0),MB.init}},GA=async(s,E)=>{let l=MB.initialize();l!==!0&&await l;let H=await(0,JB.transform)(s,E);return{...H,code:H.code+"//"+hB(s)}};J();J();jB();J();jB();var nA=class extends vB.Component{constructor(E){super(E),this.state={error:void 0,errorInfo:void 0}}componentDidCatch(E,l){this.setState({error:E,errorInfo:l})}render(){return this.state.errorInfo?aB("div",{children:[U("h2",{children:"Something went wrong."}),aB("details",{style:{whiteSpace:"pre-wrap"},children:[this.state.error&&this.state.error.toString(),U("br",{}),this.state.errorInfo.componentStack]})]}):this.props.children}},OA=nA;J();jB();jB();J();jB();jB();var qA=function(){var s=function(E,l){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(H,D){H.__proto__=D}||function(H,D){for(var x in D)D.hasOwnProperty(x)&&(H[x]=D[x])},s(E,l)};return function(E,l){s(E,l);function H(){this.constructor=E}E.prototype=l===null?Object.create(l):(H.prototype=l.prototype,new H)}}(),rA="html",aA="svg",G7="http://www.w3.org/2000/svg",O7=function(s,E){if(E===rA)return s instanceof HTMLElement;if(E===aA)return s instanceof SVGElement;throw new Error('Unrecognized element type "'+E+'" for validateElementType.')},JA=function(s,E){var l={},H,D,x;if(s===rA)x=document.createElement("div");else if(s===aA)x=document.createElementNS(G7,"g");else throw new Error('Invalid element type "'+s+'" for createPortalNode: must be "html" or "svg".');if(E&&typeof E=="object")for(var L=0,PB=Object.entries(E.attributes);L<PB.length;L++){var AB=PB[L],pB=AB[0],nB=AB[1];x.setAttribute(pB,nB)}var gB={element:x,elementType:s,setPortalProps:function(rB){l=rB},getInitialPortalProps:function(){return l},mount:function(rB,tB){if(tB!==D){if(gB.unmount(),rB!==H&&!O7(rB,s))throw new Error('Invalid element type for portal: "'+s+'" portalNodes must be used with '+s+" elements, but OutPortal is within <"+rB.tagName+">.");rB.replaceChild(gB.element,tB),H=rB,D=tB}},unmount:function(rB){rB&&rB!==D||H&&D&&(H.replaceChild(D,gB.element),H=void 0,D=void 0)}};return gB},VA=function(s){qA(E,s);function E(l){var H=s.call(this,l)||this;return H.addPropsChannel=function(){Object.assign(H.props.node,{setPortalProps:function(D){H.setState({nodeProps:D})}})},H.state={nodeProps:H.props.node.getInitialPortalProps()},H}return E.prototype.componentDidMount=function(){this.addPropsChannel()},E.prototype.componentDidUpdate=function(){this.addPropsChannel()},E.prototype.render=function(){var l=this,H=this.props,D=H.children,x=H.node;return WA(CA.map(D,function(L){return _A(L)?RA(L,l.state.nodeProps):L}),x.element)},E}(eA),VB=function(s){qA(E,s);function E(l){var H=s.call(this,l)||this;return H.placeholderNode=IA(),H.passPropsThroughPortal(),H}return E.prototype.passPropsThroughPortal=function(){var l=Object.assign({},this.props,{node:void 0});this.props.node.setPortalProps(l)},E.prototype.componentDidMount=function(){var l=this.props.node;this.currentPortalNode=l;var H=this.placeholderNode.current,D=H.parentNode;l.mount(D,H),this.passPropsThroughPortal()},E.prototype.componentDidUpdate=function(){var l=this.props.node;this.currentPortalNode&&l!==this.currentPortalNode&&(this.currentPortalNode.unmount(this.placeholderNode.current),this.currentPortalNode.setPortalProps({}),this.currentPortalNode=l);var H=this.placeholderNode.current,D=H.parentNode;l.mount(D,H),this.passPropsThroughPortal()},E.prototype.componentWillUnmount=function(){var l=this.props.node;l.unmount(this.placeholderNode.current),l.setPortalProps({})},E.prototype.render=function(){return DA("div",{ref:this.placeholderNode})},E}(eA),KA=JA.bind(null,rA),S$=JA.bind(null,aA);J();async function YA(s){return new Promise(E=>{setTimeout(()=>{E()},s)})}var q7=FA(()=>YA(1e3).then(()=>import("./chunk-DraggableWindow-JN2ZRML3.mjs"))),J7=({children:s})=>U("div",{css:cB`
height: 100%;
width: 100%;
background-blend-mode: overlay;
background:  repeating-radial-gradient(circle at bottom left, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
            #e87f24 0, #e87f24 22.2222222222%, 
            #dd6227 0, #dd6227 27.7777777778%,
             #dc4c27 0, #dc4c27 33.3333333333%, 
            #ca3435 0, #ca3435 38.8888888889%, 
            #b82841 0, #b82841 44.4444444444%, 
            #953751 0, #953751 50%, #364c88 0, 
            #364c88 55.5555555556%, #16599d 0, 
            #16599d 61.1111111111%, #02609e 0, 
            #02609e 66.6666666667%, #0073a9 0, 
            #0073a9 72.2222222222%, #008aa4 0, 
            #008aa4 77.7777777778%, #239a87 0, 
            #239a87 83.3333333333%, #7cba6d 0, 
            #7cba6d 88.8888888889%, #becc2f 0, 
            #becc2f 94.4444444444%, #e0d81d 0, 
            #e0d81d 100%), 
            repeating-radial-gradient(circle at bottom right, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
              #e87f24 0, #e87f24 22.2222222222%, 
              #dd6227 0, #dd6227 27.7777777778%, 
              #dc4c27 0, #dc4c27 33.3333333333%, 
              #ca3435 0, #ca3435 38.8888888889%, 
              #b82841 0, #b82841 44.4444444444%, 
              #953751 0, #953751 50%,
               #364c88 0, #364c88 55.5555555556%, 
               #16599d 0, #16599d 61.1111111111%, 
               #02609e 0, #02609e 66.6666666667%, 
               #0073a9 0, #0073a9 72.2222222222%, 
               #008aa4 0, #008aa4 77.7777777778%,
                #239a87 0, #239a87 83.3333333333%, 
                #7cba6d 0, #7cba6d 88.8888888889%, 
                #becc2f 0, #becc2f 94.4444444444%, 
                #e0d81d 0, #e0d81d 100%);
`,children:s}),V7=({codeSpace:s})=>{let E=PA(),[l,H]=NB(E),D=location.pathname.endsWith("public")||location.pathname.endsWith("hydrated");fB(()=>{LB(async()=>{let L=PA();if(l!==L)try{await KB(),H(L)}catch(PB){console.error({e:PB})}},"myApp")},[l,H]);let x=UA(()=>KA({attributes:{id:`root-${s}`,style:"height: 100%"}}),[]);return aB(EA,{children:[U(VA,{node:x,children:U(B7,{hash:l,codeSpace:s})}),D?U(VB,{node:x}):U(wA,{fallback:U(VB,{node:x}),children:U(J7,{children:aB(EA,{children:[U(A7,{codeSpace:s}),U(q7,{room:s,children:U(VB,{node:x})})]})})})]})},ZA={started:!1},zA=({codeSpace:s})=>{if(ZA.started)return;ZA.started=!0;let E=document.querySelector("#root"),l=GB(E),H=qB({key:"root"});l.render(U(OB,{value:H,children:U(V7,{codeSpace:s})}))};var t7=kA(e7(),1);var e$=s=>window.importShim?window.importShim(s):import(s);Object.assign(globalThis,{apps:{},eCaches:{}});var{apps:mB,eCaches:zB}=globalThis||globalThis.apps,B7=({hash:s,codeSpace:E})=>{let[l,H]=NB(hB(eB().transpiled).slice(0,8));fB(()=>{let L=hB(eB().transpiled);L!==l&&H(L)},[s]);let D=xB(null),x=mB[l];return U(OA,{children:U("div",{style:{height:100+"%"},ref:D,children:U(x,{appId:`${E}-${l}`},l)},l)})},E7=!1;async function KB(s="",E){let{transpiled:l,i:H}=eB(),D=s.length>0?s:l,x=hB(D);if(!mB[x])try{console.log(`i: ${H}: `);let L=(await e$(E$(D))).default;if((0,t7.default)(L))zB[x]=zB[x]||qB({key:x,speedy:!1}),zB[x].compat=void 0,mB[x]=mB[x]||(({appId:PB})=>PB.includes(x)?U(OB,{value:zB[x],children:U("div",{css:cB`height: 100%;`,id:PB,children:U(L,{})},x)},x):null);else throw new Error("the default export is not a function!")}catch(L){if(L instanceof SyntaxError){let PB=L.name,AB=L.message;mB[x]=()=>aB("div",{css:cB`background-color: orange;`,children:[U("h1",{children:"Syntax Error"}),U("h2",{children:x}),aB("h2",{children:[PB,": ",AB]}),U("p",{children:JSON.stringify({err:L})})]})}else if(L instanceof Error){let PB=L.name,AB=L.message;mB[x]=()=>aB("div",{css:cB`background-color: orange;`,children:[U("h1",{children:"Syntax Error"}),aB("h2",{children:[PB,": ",AB]}),U("p",{children:JSON.stringify({err:L})})]})}else mB[x]=()=>U("div",{css:cB`background-color: orange;`,children:aB("h1",{children:["Unknown Error: $",x]})})}return!E7&&E&&(E7=!0,await zA({codeSpace:E})),mB[x]}function E$(s,E="index.mjs"){let l=new File([s],E,{type:"application/javascript",lastModified:Date.now()});return URL.createObjectURL(l)}jB();jB();var EB={md5Hash:"",wait:1,res:null,codeSpace:"",waitForDiv:async()=>{let s=EB.md5Hash;return EB.res?.innerHTML||await n7(),EB.res?.innerHTML.includes(s)||await n7(),EB.res?.innerHTML.includes(s)?EB.res.innerHTML:(EB.wait=EB.wait*2,await EB.waitForDiv())},setHash:null,setApp:s=>{let E=document.createElement("div");E.style.visibility="hidden",E.style.position="absolute",document.body.appendChild(E);let l=GB(E);return l.render(U(n$,{md5Hash:s})),()=>{l.unmount,document.body.removeChild(E),E.remove(),EB.setHash=null}}},r7=async(s,E)=>{EB.codeSpace=E;let l=hB(s);apps[l]||await KB(s),EB.wait=1;let H=EB.setApp(l);try{let D=await EB.waitForDiv();if(!D)return{html:null,css:null};let x=t$(eCaches[l]),L=document.querySelector(`style[data-emotion=${eCaches[l].key}-global]`)?.innerHTML;return{html:D,css:L?L+" "+x:x}}finally{H()}};function t$(s){let E=Object.keys(s.inserted).map(l=>`.${s.key}-${l}`);return Array.from(document.styleSheets).map(l=>l.cssRules[0]).filter(l=>l&&E.includes(l.selectorText)).map(l=>l.cssText).join(`
`)}var n$=({md5Hash:s})=>{let E=xB(null);fB(()=>{E?.current&&(EB.res=E.current)},[E?.current]);let l=apps[s];return U("div",{ref:E,children:U(l,{appId:`${EB.codeSpace}-${s}`},s)})},n7=()=>{let s;console.log("wait for animation");let E=new Promise(l=>s=l);return requestAnimationFrame(()=>s(!0)),E};var i7=kA(W7(),1),r$=(0,i7.default)(MA,200,{leading:!0,trailing:!0,maxWait:800}),a7=eB().i;async function s7({code:s,counter:E,codeSpace:l}){if(!(E<=a7)){a7=E;try{let H=await GA(s,{loader:"tsx",format:"esm",treeShaking:!0,minify:!0,keepNames:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",module:"ESNext",jsxFragmentFactory:"Fragment",jsxImportSource:"@emotion/react"}},target:"es2018"}),{html:D,css:x}=await r7(H.code,l);if(!D)return;r$({...eB(),code:s,i:E,transpiled:H.code,html:D,css:x})}catch(H){console.error({error:H})}finally{}}}jB();J();function o7(){let s=/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.userAgent.indexOf("SAMSUNG")===-1,E=!1;return function(l){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(l)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(l.slice(0,4)))&&(E=!0)}(navigator.userAgent||navigator.vendor||window.opera),E&&!s}J();var pA=async s=>a$().prettierJs(s),jA=null,l7={prettierJs:async s=>{let E=performance.now();jA=jA||(await import("./chunk-prettierEsm-TP7AMCUV.mjs")).prettierJs;let l=performance.now();console.log(`importing took ${l-E} milliseconds.`);let H=jA(s),D=performance.now();return console.log(`prettier took ${D-l} milliseconds.`),H}},wB=null;function a$(){if(wB)return wB;if(!i$())return wB=l7;try{let s=new SharedWorker(new URL("prettierWorker.mjs",location.origin),{type:"module"});return wB=yA(s.port)}catch{return wB=l7}}function i$(){let s=!1,E={get type(){return s=!0,"module"}};try{new Worker("blob://",E)}finally{return s}}var Y={CH(){},getValue:async()=>"",setValue:async s=>{s.length<10&&console.log(s)},getErrors:async()=>[],code:"",counter:0,codeSpace:"",lastKeyDown:0,codeToSet:""},A7=({codeSpace:s})=>{let E=xB(null),{i:l,code:H}=eB(),[D,x]=vB.useState({lastKeyDown:0,myCode:H,counter:l,started:!1,onChange(nB){},engine:o7()?"ace":"monaco"});Y.counter=eB().i,Y.codeSpace=s;let{myCode:L,started:PB,engine:AB,onChange:pB}=D;return Y.code=L,vB.useEffect(()=>{!E?.current||PB||(AB==="monaco"?s$():o$()).then(nB=>Object.assign(Y,nB)).then(()=>x(nB=>({...nB,started:!0})))},[PB,E]),vB.useEffect(()=>{Y.getErrors().then(console.log),pB(()=>Y.getValue().then(()=>x(nB=>({...nB,counter:Y.counter,myCode:Y.code}))))},[pB,L,x]),LB(async()=>{Y.counter>=eB().i||(Y.counter=eB().i,Y.code=await pA(eB().code),await Y.setValue(Y.code),x(nB=>({...nB,counter:Y.counter,myCode:Y.code})))},"editor"),U("div",{onKeyDown:()=>Y.lastKeyDown=Date.now(),id:"editor",css:cB`          
      max-width: 640px;
      height: 100%; 
      `,ref:E})};async function j7(s){let E=await pA(s);if(E===Y.code)return;let l=++Y.counter;Y.code=E,s7({code:E,counter:l,codeSpace:Y.codeSpace})}async function s$(){let s=document.createElement("link");s.setAttribute("rel","stylesheet"),s.href=location.origin+"/Editor.css",document.head.append(s);let{startMonaco:E}=await import("./chunk-startMonaco-TZZX7EX2.mjs"),l=window.document.getElementById("editor");return E({container:l,name:Y.codeSpace,code:eB().code,onChange:j7})}async function o$(){let{startAce:s}=await import("./chunk-startAce-4RSCPFH6.mjs");return await s(eB().code,j7)}export{YA as a,KB as b,A7 as c};
