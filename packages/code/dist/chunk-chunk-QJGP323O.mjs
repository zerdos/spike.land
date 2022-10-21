import{a as IA,b as q,c as hB}from"./chunk-chunk-2L6FIRGJ.mjs";import{b as v$}from"./chunk-chunk-KW2DITXL.mjs";import{a as oA,h as bB,p as _A}from"./chunk-chunk-TZSW5DDA.mjs";import{a as x$,b as TB,e as cB,f as PB,g as CA,h as _B,i as wA,j as RA,k as o7,l as l7}from"./chunk-chunk-L2U7Q2OG.mjs";import{b as p7}from"./chunk-chunk-66EYGUWD.mjs";import{B as UB,C as WB,H as sA,L as T7,M as LB,O as XB,a as j7,d as DA,f as c7,g as u7,i as h7,k as m7,m as Q7,n as d7,u as FB,z as g7}from"./chunk-chunk-CE3G72A7.mjs";import{b as s7,d as iA,j as W}from"./chunk-chunk-FWOMBYHR.mjs";var y7=s7((Xk,M7)=>{"use strict";W();var v7=Function.prototype.toString,NB=typeof Reflect=="object"&&Reflect!==null&&Reflect.apply,GA,jA;if(typeof NB=="function"&&typeof Object.defineProperty=="function")try{GA=Object.defineProperty({},"length",{get:function(){throw jA}}),jA={},NB(function(){throw 42},null,GA)}catch(A){A!==jA&&(NB=null)}else NB=null;var R$=/^\s*class\b/,OA=function(B){try{var $=v7.call(B);return R$.test($)}catch{return!1}},NA=function(B){try{return OA(B)?!1:(v7.call(B),!0)}catch{return!1}},cA=Object.prototype.toString,D$="[object Object]",I$="[object Function]",_$="[object GeneratorFunction]",F$="[object HTMLAllCollection]",U$="[object HTML document.all class]",W$="[object HTMLCollection]",L$=typeof Symbol=="function"&&!!Symbol.toStringTag,N$=!(0 in[,]),qA=function(){return!1};typeof document=="object"&&(x7=document.all,cA.call(x7)===cA.call(document.all)&&(qA=function(B){if((N$||!B)&&(typeof B>"u"||typeof B=="object"))try{var $=cA.call(B);return($===F$||$===U$||$===W$||$===D$)&&B("")==null}catch{}return!1}));var x7;M7.exports=NB?function(B){if(qA(B))return!0;if(!B||typeof B!="function"&&typeof B!="object")return!1;try{NB(B,null,GA)}catch($){if($!==jA)return!1}return!OA(B)&&NA(B)}:function(B){if(qA(B))return!0;if(!B||typeof B!="function"&&typeof B!="object")return!1;if(L$)return NA(B);if(OA(B))return!1;var $=cA.call(B);return $!==I$&&$!==_$&&!/^\[object HTML/.test($)?!1:NA(B)}});var q7=s7((PP,zA)=>{W();(A=>{"use strict";var B=Object.defineProperty,$=Object.getOwnPropertyDescriptor,E=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,Q=(k,e)=>{for(var t in e)B(k,t,{get:e[t],enumerable:!0})},o=(k,e,t,h)=>{if(e&&typeof e=="object"||typeof e=="function")for(let d of E(e))!a.call(k,d)&&d!==t&&B(k,d,{get:()=>e[d],enumerable:!(h=$(e,d))||h.enumerable});return k},X=k=>o(B({},"__esModule",{value:!0}),k),v=(k,e,t)=>new Promise((h,d)=>{var S=p=>{try{g(t.next(p))}catch(w){d(w)}},l=p=>{try{g(t.throw(p))}catch(w){d(w)}},g=p=>p.done?h(p.value):Promise.resolve(p.value).then(S,l);g((t=t.apply(k,e)).next())}),kB={};Q(kB,{analyzeMetafile:()=>d$,analyzeMetafileSync:()=>b$,build:()=>u$,buildSync:()=>g$,default:()=>f$,formatMessages:()=>Q$,formatMessagesSync:()=>X$,initialize:()=>S$,serve:()=>h$,transform:()=>m$,transformSync:()=>T$,version:()=>c$}),A.exports=X(kB);function BB(k){let e=h=>{if(h===null)t.write8(0);else if(typeof h=="boolean")t.write8(1),t.write8(+h);else if(typeof h=="number")t.write8(2),t.write32(h|0);else if(typeof h=="string")t.write8(3),t.write(Z(h));else if(h instanceof Uint8Array)t.write8(4),t.write(h);else if(h instanceof Array){t.write8(5),t.write32(h.length);for(let d of h)e(d)}else{let d=Object.keys(h);t.write8(6),t.write32(d.length);for(let S of d)t.write(Z(S)),e(h[S])}},t=new pB;return t.write32(0),t.write32(k.id<<1|+!k.isRequest),e(k.value),xB(t.buf,t.len-4,0),t.buf.subarray(0,t.len)}function HB(k){let e=()=>{switch(t.read8()){case 0:return null;case 1:return!!t.read8();case 2:return t.read32();case 3:return jB(t.read());case 4:return t.read();case 5:{let l=t.read32(),g=[];for(let p=0;p<l;p++)g.push(e());return g}case 6:{let l=t.read32(),g={};for(let p=0;p<l;p++)g[jB(t.read())]=e();return g}default:throw new Error("Invalid packet")}},t=new pB(k),h=t.read32(),d=(h&1)===0;h>>>=1;let S=e();if(t.ptr!==k.length)throw new Error("Invalid packet");return{id:h,isRequest:d,value:S}}var pB=class{constructor(k=new Uint8Array(1024)){this.buf=k,this.len=0,this.ptr=0}_write(k){if(this.len+k>this.buf.length){let e=new Uint8Array((this.len+k)*2);e.set(this.buf),this.buf=e}return this.len+=k,this.len-k}write8(k){let e=this._write(1);this.buf[e]=k}write32(k){let e=this._write(4);xB(this.buf,k,e)}write(k){let e=this._write(4+k.length);xB(this.buf,k.length,e),this.buf.set(k,e+4)}_read(k){if(this.ptr+k>this.buf.length)throw new Error("Invalid packet");return this.ptr+=k,this.ptr-k}read8(){return this.buf[this._read(1)]}read32(){return AA(this.buf,this._read(4))}read(){let k=this.read32(),e=new Uint8Array(k),t=this._read(e.length);return e.set(this.buf.subarray(t,t+k)),e}},Z,jB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let k=new TextEncoder,e=new TextDecoder;Z=t=>k.encode(t),jB=t=>e.decode(t)}else if(typeof Buffer<"u")Z=k=>{let e=Buffer.from(k);return e instanceof Uint8Array||(e=new Uint8Array(e)),e},jB=k=>{let{buffer:e,byteOffset:t,byteLength:h}=k;return Buffer.from(e,t,h).toString()};else throw new Error("No UTF-8 codec found");function AA(k,e){return k[e++]|k[e++]<<8|k[e++]<<16|k[e++]<<24}function xB(k,e,t){k[t++]=e,k[t++]=e>>8,k[t++]=e>>16,k[t++]=e>>24}var VB="warning",$A="silent";function kA(k){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid target: ${k}`);return k}var PA=()=>null,z=k=>typeof k=="boolean"?null:"a boolean",P$=k=>typeof k=="boolean"||typeof k=="object"&&!Array.isArray(k)?null:"a boolean or an object",C=k=>typeof k=="string"?null:"a string",eA=k=>k instanceof RegExp?null:"a RegExp object",wB=k=>typeof k=="number"&&k===(k|0)?null:"an integer",MA=k=>typeof k=="function"?null:"a function",eB=k=>Array.isArray(k)?null:"an array",gB=k=>typeof k=="object"&&k!==null&&!Array.isArray(k)?null:"an object",e$=k=>k instanceof WebAssembly.Module?null:"a WebAssembly.Module",t$=k=>typeof k=="object"&&k!==null?null:"an array or an object",$7=k=>typeof k=="object"&&!Array.isArray(k)?null:"an object or null",k7=k=>typeof k=="string"||typeof k=="boolean"?null:"a string or a boolean",E$=k=>typeof k=="string"||typeof k=="object"&&k!==null&&!Array.isArray(k)?null:"a string or an object",n$=k=>typeof k=="string"||Array.isArray(k)?null:"a string or an array",P7=k=>typeof k=="string"||k instanceof Uint8Array?null:"a string or a Uint8Array";function n(k,e,t,h){let d=k[t];if(e[t+""]=!0,d===void 0)return;let S=h(d);if(S!==null)throw new Error(`"${t}" must be ${S}`);return d}function EB(k,e,t){for(let h in k)if(!(h in e))throw new Error(`Invalid option ${t}: "${h}"`)}function r$(k){let e=Object.create(null),t=n(k,e,"wasmURL",C),h=n(k,e,"wasmModule",e$),d=n(k,e,"worker",z);return EB(k,e,"in initialize() call"),{wasmURL:t,wasmModule:h,worker:d}}function e7(k){let e;if(k!==void 0){e=Object.create(null);for(let t of Object.keys(k)){let h=k[t];if(typeof h=="string"||h===!1)e[t]=h;else throw new Error(`Expected ${JSON.stringify(t)} in mangle cache to map to either a string or false`)}}return e}function tA(k,e,t,h,d){let S=n(e,t,"color",z),l=n(e,t,"logLevel",C),g=n(e,t,"logLimit",wB);S!==void 0?k.push(`--color=${S}`):h&&k.push("--color=true"),k.push(`--log-level=${l||d}`),k.push(`--log-limit=${g||0}`)}function t7(k,e,t){let h=n(e,t,"legalComments",C),d=n(e,t,"sourceRoot",C),S=n(e,t,"sourcesContent",z),l=n(e,t,"target",n$),g=n(e,t,"format",C),p=n(e,t,"globalName",C),w=n(e,t,"mangleProps",eA),_=n(e,t,"reserveProps",eA),y=n(e,t,"mangleQuoted",z),H=n(e,t,"minify",z),G=n(e,t,"minifySyntax",z),U=n(e,t,"minifyWhitespace",z),R=n(e,t,"minifyIdentifiers",z),b=n(e,t,"drop",eB),T=n(e,t,"charset",C),m=n(e,t,"treeShaking",z),j=n(e,t,"ignoreAnnotations",z),r=n(e,t,"jsx",C),c=n(e,t,"jsxFactory",C),f=n(e,t,"jsxFragment",C),P=n(e,t,"jsxImportSource",C),i=n(e,t,"jsxDev",z),s=n(e,t,"jsxSideEffects",z),u=n(e,t,"define",gB),x=n(e,t,"logOverride",gB),F=n(e,t,"supported",gB),I=n(e,t,"pure",eB),O=n(e,t,"keepNames",z),L=n(e,t,"platform",C);if(h&&k.push(`--legal-comments=${h}`),d!==void 0&&k.push(`--source-root=${d}`),S!==void 0&&k.push(`--sources-content=${S}`),l&&(Array.isArray(l)?k.push(`--target=${Array.from(l).map(kA).join(",")}`):k.push(`--target=${kA(l)}`)),g&&k.push(`--format=${g}`),p&&k.push(`--global-name=${p}`),L&&k.push(`--platform=${L}`),H&&k.push("--minify"),G&&k.push("--minify-syntax"),U&&k.push("--minify-whitespace"),R&&k.push("--minify-identifiers"),T&&k.push(`--charset=${T}`),m!==void 0&&k.push(`--tree-shaking=${m}`),j&&k.push("--ignore-annotations"),b)for(let D of b)k.push(`--drop:${D}`);if(w&&k.push(`--mangle-props=${w.source}`),_&&k.push(`--reserve-props=${_.source}`),y!==void 0&&k.push(`--mangle-quoted=${y}`),r&&k.push(`--jsx=${r}`),c&&k.push(`--jsx-factory=${c}`),f&&k.push(`--jsx-fragment=${f}`),P&&k.push(`--jsx-import-source=${P}`),i&&k.push("--jsx-dev"),s&&k.push("--jsx-side-effects"),u)for(let D in u){if(D.indexOf("=")>=0)throw new Error(`Invalid define: ${D}`);k.push(`--define:${D}=${u[D]}`)}if(x)for(let D in x){if(D.indexOf("=")>=0)throw new Error(`Invalid log override: ${D}`);k.push(`--log-override:${D}=${x[D]}`)}if(F)for(let D in F){if(D.indexOf("=")>=0)throw new Error(`Invalid supported: ${D}`);k.push(`--supported:${D}=${F[D]}`)}if(I)for(let D of I)k.push(`--pure:${D}`);O&&k.push("--keep-names")}function a$(k,e,t,h,d){var S;let l=[],g=[],p=Object.create(null),w=null,_=null,y=null;tA(l,e,p,t,h),t7(l,e,p);let H=n(e,p,"sourcemap",k7),G=n(e,p,"bundle",z),U=n(e,p,"watch",P$),R=n(e,p,"splitting",z),b=n(e,p,"preserveSymlinks",z),T=n(e,p,"metafile",z),m=n(e,p,"outfile",C),j=n(e,p,"outdir",C),r=n(e,p,"outbase",C),c=n(e,p,"tsconfig",C),f=n(e,p,"resolveExtensions",eB),P=n(e,p,"nodePaths",eB),i=n(e,p,"mainFields",eB),s=n(e,p,"conditions",eB),u=n(e,p,"external",eB),x=n(e,p,"loader",gB),F=n(e,p,"outExtension",gB),I=n(e,p,"publicPath",C),O=n(e,p,"entryNames",C),L=n(e,p,"chunkNames",C),D=n(e,p,"assetNames",C),J=n(e,p,"inject",eB),tB=n(e,p,"banner",gB),nB=n(e,p,"footer",gB),AB=n(e,p,"entryPoints",t$),V=n(e,p,"absWorkingDir",C),N=n(e,p,"stdin",gB),rB=(S=n(e,p,"write",z))!=null?S:d,mB=n(e,p,"allowOverwrite",z),MB=n(e,p,"incremental",z)===!0,KB=n(e,p,"mangleCache",gB);if(p.plugins=!0,EB(e,p,`in ${k}() call`),H&&l.push(`--sourcemap${H===!0?"":`=${H}`}`),G&&l.push("--bundle"),mB&&l.push("--allow-overwrite"),U)if(l.push("--watch"),typeof U=="boolean")y={};else{let M=Object.create(null),Y=n(U,M,"onRebuild",MA);EB(U,M,`on "watch" in ${k}() call`),y={onRebuild:Y}}if(R&&l.push("--splitting"),b&&l.push("--preserve-symlinks"),T&&l.push("--metafile"),m&&l.push(`--outfile=${m}`),j&&l.push(`--outdir=${j}`),r&&l.push(`--outbase=${r}`),c&&l.push(`--tsconfig=${c}`),f){let M=[];for(let Y of f){if(Y+="",Y.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${Y}`);M.push(Y)}l.push(`--resolve-extensions=${M.join(",")}`)}if(I&&l.push(`--public-path=${I}`),O&&l.push(`--entry-names=${O}`),L&&l.push(`--chunk-names=${L}`),D&&l.push(`--asset-names=${D}`),i){let M=[];for(let Y of i){if(Y+="",Y.indexOf(",")>=0)throw new Error(`Invalid main field: ${Y}`);M.push(Y)}l.push(`--main-fields=${M.join(",")}`)}if(s){let M=[];for(let Y of s){if(Y+="",Y.indexOf(",")>=0)throw new Error(`Invalid condition: ${Y}`);M.push(Y)}l.push(`--conditions=${M.join(",")}`)}if(u)for(let M of u)l.push(`--external:${M}`);if(tB)for(let M in tB){if(M.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${M}`);l.push(`--banner:${M}=${tB[M]}`)}if(nB)for(let M in nB){if(M.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${M}`);l.push(`--footer:${M}=${nB[M]}`)}if(J)for(let M of J)l.push(`--inject:${M}`);if(x)for(let M in x){if(M.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${M}`);l.push(`--loader:${M}=${x[M]}`)}if(F)for(let M in F){if(M.indexOf("=")>=0)throw new Error(`Invalid out extension: ${M}`);l.push(`--out-extension:${M}=${F[M]}`)}if(AB)if(Array.isArray(AB))for(let M of AB)g.push(["",M+""]);else for(let[M,Y]of Object.entries(AB))g.push([M+"",Y+""]);if(N){let M=Object.create(null),Y=n(N,M,"contents",P7),aA=n(N,M,"resolveDir",C),a7=n(N,M,"sourcefile",C),i7=n(N,M,"loader",C);EB(N,M,'in "stdin" object'),a7&&l.push(`--sourcefile=${a7}`),i7&&l.push(`--loader=${i7}`),aA&&(_=aA+""),typeof Y=="string"?w=Z(Y):Y instanceof Uint8Array&&(w=Y)}let QB=[];if(P)for(let M of P)M+="",QB.push(M);return{entries:g,flags:l,write:rB,stdinContents:w,stdinResolveDir:_,absWorkingDir:V,incremental:MB,nodePaths:QB,watch:y,mangleCache:e7(KB)}}function i$(k,e,t,h){let d=[],S=Object.create(null);tA(d,e,S,t,h),t7(d,e,S);let l=n(e,S,"sourcemap",k7),g=n(e,S,"tsconfigRaw",E$),p=n(e,S,"sourcefile",C),w=n(e,S,"loader",C),_=n(e,S,"banner",C),y=n(e,S,"footer",C),H=n(e,S,"mangleCache",gB);return EB(e,S,`in ${k}() call`),l&&d.push(`--sourcemap=${l===!0?"external":l}`),g&&d.push(`--tsconfig-raw=${typeof g=="string"?g:JSON.stringify(g)}`),p&&d.push(`--sourcefile=${p}`),w&&d.push(`--loader=${w}`),_&&d.push(`--banner=${_}`),y&&d.push(`--footer=${y}`),{flags:d,mangleCache:e7(H)}}function s$(k){let e={},t={didClose:!1,reason:""},h={},d=0,S=0,l=new Uint8Array(16*1024),g=0,p=j=>{let r=g+j.length;if(r>l.length){let f=new Uint8Array(r*2);f.set(l),l=f}l.set(j,g),g+=j.length;let c=0;for(;c+4<=g;){let f=AA(l,c);if(c+4+f>g)break;c+=4,U(l.subarray(c,c+f)),c+=f}c>0&&(l.copyWithin(0,c,g),g-=c)},w=j=>{t.didClose=!0,j&&(t.reason=": "+(j.message||j));let r="The service was stopped"+t.reason;for(let c in h)h[c](r,null);h={}},_=(j,r,c)=>{if(t.didClose)return c("The service is no longer running"+t.reason,null);let f=d++;h[f]=(P,i)=>{try{c(P,i)}finally{j&&j.unref()}},j&&j.ref(),k.writeToStdin(BB({id:f,isRequest:!0,value:r}))},y=(j,r)=>{if(t.didClose)throw new Error("The service is no longer running"+t.reason);k.writeToStdin(BB({id:j,isRequest:!1,value:r}))},H=(j,r)=>v(this,null,function*(){try{if(r.command==="ping"){y(j,{});return}if(typeof r.key=="number"){let c=e[r.key];if(c){let f=c[r.command];if(f){yield f(j,r);return}}}throw new Error("Invalid command: "+r.command)}catch(c){y(j,{errors:[RB(c,k,null,void 0,"")]})}}),G=!0,U=j=>{if(G){G=!1;let c=String.fromCharCode(...j);if(c!=="0.15.12")throw new Error(`Cannot start service: Host version "0.15.12" does not match binary version ${JSON.stringify(c)}`);return}let r=HB(j);if(r.isRequest)H(r.id,r.value);else{let c=h[r.id];delete h[r.id],r.value.error?c(r.value.error,{}):c(null,r.value)}};return{readFromStdout:p,afterClose:w,service:{buildOrServe:({callName:j,refs:r,serveOptions:c,options:f,isTTY:P,defaultWD:i,callback:s})=>{let u=0,x=S++,F={},I={ref(){++u===1&&r&&r.ref()},unref(){--u===0&&(delete e[x],r&&r.unref())}};e[x]=F,I.ref(),o$(j,x,_,y,I,k,F,f,c,P,i,t,(O,L)=>{try{s(O,L)}finally{I.unref()}})},transform:({callName:j,refs:r,input:c,options:f,isTTY:P,fs:i,callback:s})=>{let u=E7(),x=F=>{try{if(typeof c!="string"&&!(c instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:I,mangleCache:O}=i$(j,f,P,$A),L={command:"transform",flags:I,inputFS:F!==null,input:F!==null?Z(F):typeof c=="string"?Z(c):c};O&&(L.mangleCache=O),_(r,L,(D,J)=>{if(D)return s(new Error(D),null);let tB=fB(J.errors,u),nB=fB(J.warnings,u),AB=1,V=()=>{if(--AB===0){let N={warnings:nB,code:J.code,map:J.map};J.mangleCache&&(N.mangleCache=J?.mangleCache),s(null,N)}};if(tB.length>0)return s(DB("Transform failed",tB,nB),null);J.codeFS&&(AB++,i.readFile(J.code,(N,rB)=>{N!==null?s(N,null):(J.code=rB,V())})),J.mapFS&&(AB++,i.readFile(J.map,(N,rB)=>{N!==null?s(N,null):(J.map=rB,V())})),V()})}catch(I){let O=[];try{tA(O,f,{},P,$A)}catch{}let L=RB(I,k,u,void 0,"");_(r,{command:"error",flags:O,error:L},()=>{L.detail=u.load(L.detail),s(DB("Transform failed",[L],[]),null)})}};if((typeof c=="string"||c instanceof Uint8Array)&&c.length>1024*1024){let F=x;x=()=>i.writeFile(c,F)}x(null)},formatMessages:({callName:j,refs:r,messages:c,options:f,callback:P})=>{let i=vB(c,"messages",null,"");if(!f)throw new Error(`Missing second argument in ${j}() call`);let s={},u=n(f,s,"kind",C),x=n(f,s,"color",z),F=n(f,s,"terminalWidth",wB);if(EB(f,s,`in ${j}() call`),u===void 0)throw new Error(`Missing "kind" in ${j}() call`);if(u!=="error"&&u!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${j}() call`);let I={command:"format-msgs",messages:i,isWarning:u==="warning"};x!==void 0&&(I.color=x),F!==void 0&&(I.terminalWidth=F),_(r,I,(O,L)=>{if(O)return P(new Error(O),null);P(null,L.messages)})},analyzeMetafile:({callName:j,refs:r,metafile:c,options:f,callback:P})=>{f===void 0&&(f={});let i={},s=n(f,i,"color",z),u=n(f,i,"verbose",z);EB(f,i,`in ${j}() call`);let x={command:"analyze-metafile",metafile:c};s!==void 0&&(x.color=s),u!==void 0&&(x.verbose=u),_(r,x,(F,I)=>{if(F)return P(new Error(F),null);P(null,I.result)})}}}}function o$(k,e,t,h,d,S,l,g,p,w,_,y,H){let G=E7(),U=(m,j,r,c)=>{let f=[];try{tA(f,g,{},w,VB)}catch{}let P=RB(m,S,G,r,j);t(d,{command:"error",flags:f,error:P},()=>{P.detail=G.load(P.detail),c(P)})},R=(m,j)=>{U(m,j,void 0,r=>{H(DB("Build failed",[r],[]),null)})},b;if(typeof g=="object"){let m=g.plugins;if(m!==void 0){if(!Array.isArray(m))throw new Error('"plugins" must be an array');b=m}}if(b&&b.length>0){if(S.isSync){R(new Error("Cannot use plugins in synchronous API calls"),"");return}p$(e,t,h,d,S,l,g,b,G).then(m=>{if(!m.ok){R(m.error,m.pluginName);return}try{T(m.requestPlugins,m.runOnEndCallbacks)}catch(j){R(j,"")}},m=>R(m,""));return}try{T(null,(m,j,r)=>r())}catch(m){R(m,"")}function T(m,j){let r=!S.isWriteUnavailable,{entries:c,flags:f,write:P,stdinContents:i,stdinResolveDir:s,absWorkingDir:u,incremental:x,nodePaths:F,watch:I,mangleCache:O}=a$(k,g,w,VB,r),L={command:"build",key:e,entries:c,flags:f,write:P,stdinContents:i,stdinResolveDir:s,absWorkingDir:u||_,incremental:x,nodePaths:F};m&&(L.plugins=m),O&&(L.mangleCache=O);let D=p&&l$(e,t,h,d,l,p,L),J,tB,nB=(V,N)=>{V.outputFiles&&(N.outputFiles=V.outputFiles.map(j$)),V.metafile&&(N.metafile=JSON.parse(V.metafile)),V.mangleCache&&(N.mangleCache=V.mangleCache),V.writeToStdout!==void 0&&console.log(jB(V.writeToStdout).replace(/\n$/,""))},AB=(V,N)=>{let rB={errors:fB(V.errors,G),warnings:fB(V.warnings,G)};nB(V,rB),j(rB,U,()=>{if(rB.errors.length>0)return N(DB("Build failed",rB.errors,rB.warnings),null);if(V.rebuild){if(!J){let mB=!1;J=()=>new Promise((MB,KB)=>{if(mB||y.didClose)throw new Error("Cannot rebuild");t(d,{command:"rebuild",key:e},(QB,M)=>{if(QB)return N(DB("Build failed",[{id:"",pluginName:"",text:QB,location:null,notes:[],detail:void 0}],[]),null);AB(M,(Y,aA)=>{Y?KB(Y):MB(aA)})})}),d.ref(),J.dispose=()=>{mB||(mB=!0,t(d,{command:"rebuild-dispose",key:e},()=>{}),d.unref())}}rB.rebuild=J}if(V.watch){if(!tB){let mB=!1;d.ref(),tB=()=>{mB||(mB=!0,delete l["watch-rebuild"],t(d,{command:"watch-stop",key:e},()=>{}),d.unref())},I&&(l["watch-rebuild"]=(MB,KB)=>{try{let QB=KB.args,M={errors:fB(QB.errors,G),warnings:fB(QB.warnings,G)};nB(QB,M),j(M,U,()=>{if(M.errors.length>0){I.onRebuild&&I.onRebuild(DB("Build failed",M.errors,M.warnings),null);return}M.stop=tB,I.onRebuild&&I.onRebuild(null,M)})}catch(QB){console.error(QB)}h(MB,{})})}rB.stop=tB}N(null,rB)})};if(P&&S.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(x&&S.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(I&&S.isSync)throw new Error('Cannot use "watch" with a synchronous build');t(d,L,(V,N)=>{if(V)return H(new Error(V),null);if(D){let rB=N,mB=!1;d.ref();let MB={port:rB.port,host:rB.host,wait:D.wait,stop(){mB||(mB=!0,D.stop(),d.unref())}};return d.ref(),D.wait.then(d.unref,d.unref),H(null,MB)}return AB(N,H)})}}var l$=(k,e,t,h,d,S,l)=>{let g={},p=n(S,g,"port",wB),w=n(S,g,"host",C),_=n(S,g,"servedir",C),y=n(S,g,"onRequest",MA),H=new Promise((G,U)=>{d["serve-wait"]=(R,b)=>{b.error!==null?U(new Error(b.error)):G(),t(R,{})}});return l.serve={},EB(S,g,"in serve() call"),p!==void 0&&(l.serve.port=p),w!==void 0&&(l.serve.host=w),_!==void 0&&(l.serve.servedir=_),d["serve-request"]=(G,U)=>{y&&y(U.args),t(G,{})},{wait:H,stop(){e(h,{command:"serve-stop",key:k},()=>{})}}},p$=(k,e,t,h,d,S,l,g,p)=>v(void 0,null,function*(){let w=[],_=[],y={},H={},G=0,U=0,R=[],b=!1;g=[...g];for(let m of g){let j={};if(typeof m!="object")throw new Error(`Plugin at index ${U} must be an object`);let r=n(m,j,"name",C);if(typeof r!="string"||r==="")throw new Error(`Plugin at index ${U} is missing a name`);try{let c=n(m,j,"setup",MA);if(typeof c!="function")throw new Error("Plugin is missing a setup function");EB(m,j,`on plugin ${JSON.stringify(r)}`);let f={name:r,onResolve:[],onLoad:[]};U++;let i=c({initialOptions:l,resolve:(s,u={})=>{if(!b)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof s!="string")throw new Error("The path to resolve must be a string");let x=Object.create(null),F=n(u,x,"pluginName",C),I=n(u,x,"importer",C),O=n(u,x,"namespace",C),L=n(u,x,"resolveDir",C),D=n(u,x,"kind",C),J=n(u,x,"pluginData",PA);return EB(u,x,"in resolve() call"),new Promise((tB,nB)=>{let AB={command:"resolve",path:s,key:k,pluginName:r};F!=null&&(AB.pluginName=F),I!=null&&(AB.importer=I),O!=null&&(AB.namespace=O),L!=null&&(AB.resolveDir=L),D!=null&&(AB.kind=D),J!=null&&(AB.pluginData=p.store(J)),e(h,AB,(V,N)=>{V!==null?nB(new Error(V)):tB({errors:fB(N.errors,p),warnings:fB(N.warnings,p),path:N.path,external:N.external,sideEffects:N.sideEffects,namespace:N.namespace,suffix:N.suffix,pluginData:p.load(N.pluginData)})})})},onStart(s){let u='This error came from the "onStart" callback registered here:',x=EA(new Error(u),d,"onStart");w.push({name:r,callback:s,note:x})},onEnd(s){let u='This error came from the "onEnd" callback registered here:',x=EA(new Error(u),d,"onEnd");_.push({name:r,callback:s,note:x})},onResolve(s,u){let x='This error came from the "onResolve" callback registered here:',F=EA(new Error(x),d,"onResolve"),I={},O=n(s,I,"filter",eA),L=n(s,I,"namespace",C);if(EB(s,I,`in onResolve() call for plugin ${JSON.stringify(r)}`),O==null)throw new Error("onResolve() call is missing a filter");let D=G++;y[D]={name:r,callback:u,note:F},f.onResolve.push({id:D,filter:O.source,namespace:L||""})},onLoad(s,u){let x='This error came from the "onLoad" callback registered here:',F=EA(new Error(x),d,"onLoad"),I={},O=n(s,I,"filter",eA),L=n(s,I,"namespace",C);if(EB(s,I,`in onLoad() call for plugin ${JSON.stringify(r)}`),O==null)throw new Error("onLoad() call is missing a filter");let D=G++;H[D]={name:r,callback:u,note:F},f.onLoad.push({id:D,filter:O.source,namespace:L||""})},esbuild:d.esbuild});i&&(yield i),R.push(f)}catch(c){return{ok:!1,error:c,pluginName:r}}}S["on-start"]=(m,j)=>v(void 0,null,function*(){let r={errors:[],warnings:[]};yield Promise.all(w.map(c=>v(void 0,[c],function*({name:f,callback:P,note:i}){try{let s=yield P();if(s!=null){if(typeof s!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(f)} to return an object`);let u={},x=n(s,u,"errors",eB),F=n(s,u,"warnings",eB);EB(s,u,`from onStart() callback in plugin ${JSON.stringify(f)}`),x!=null&&r.errors.push(...vB(x,"errors",p,f)),F!=null&&r.warnings.push(...vB(F,"warnings",p,f))}}catch(s){r.errors.push(RB(s,d,p,i&&i(),f))}}))),t(m,r)}),S["on-resolve"]=(m,j)=>v(void 0,null,function*(){let r={},c="",f,P;for(let i of j.ids)try{({name:c,callback:f,note:P}=y[i]);let s=yield f({path:j.path,importer:j.importer,namespace:j.namespace,resolveDir:j.resolveDir,kind:j.kind,pluginData:p.load(j.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(c)} to return an object`);let u={},x=n(s,u,"pluginName",C),F=n(s,u,"path",C),I=n(s,u,"namespace",C),O=n(s,u,"suffix",C),L=n(s,u,"external",z),D=n(s,u,"sideEffects",z),J=n(s,u,"pluginData",PA),tB=n(s,u,"errors",eB),nB=n(s,u,"warnings",eB),AB=n(s,u,"watchFiles",eB),V=n(s,u,"watchDirs",eB);EB(s,u,`from onResolve() callback in plugin ${JSON.stringify(c)}`),r.id=i,x!=null&&(r.pluginName=x),F!=null&&(r.path=F),I!=null&&(r.namespace=I),O!=null&&(r.suffix=O),L!=null&&(r.external=L),D!=null&&(r.sideEffects=D),J!=null&&(r.pluginData=p.store(J)),tB!=null&&(r.errors=vB(tB,"errors",p,c)),nB!=null&&(r.warnings=vB(nB,"warnings",p,c)),AB!=null&&(r.watchFiles=nA(AB,"watchFiles")),V!=null&&(r.watchDirs=nA(V,"watchDirs"));break}}catch(s){r={id:i,errors:[RB(s,d,p,P&&P(),c)]};break}t(m,r)}),S["on-load"]=(m,j)=>v(void 0,null,function*(){let r={},c="",f,P;for(let i of j.ids)try{({name:c,callback:f,note:P}=H[i]);let s=yield f({path:j.path,namespace:j.namespace,suffix:j.suffix,pluginData:p.load(j.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(c)} to return an object`);let u={},x=n(s,u,"pluginName",C),F=n(s,u,"contents",P7),I=n(s,u,"resolveDir",C),O=n(s,u,"pluginData",PA),L=n(s,u,"loader",C),D=n(s,u,"errors",eB),J=n(s,u,"warnings",eB),tB=n(s,u,"watchFiles",eB),nB=n(s,u,"watchDirs",eB);EB(s,u,`from onLoad() callback in plugin ${JSON.stringify(c)}`),r.id=i,x!=null&&(r.pluginName=x),F instanceof Uint8Array?r.contents=F:F!=null&&(r.contents=Z(F)),I!=null&&(r.resolveDir=I),O!=null&&(r.pluginData=p.store(O)),L!=null&&(r.loader=L),D!=null&&(r.errors=vB(D,"errors",p,c)),J!=null&&(r.warnings=vB(J,"warnings",p,c)),tB!=null&&(r.watchFiles=nA(tB,"watchFiles")),nB!=null&&(r.watchDirs=nA(nB,"watchDirs"));break}}catch(s){r={id:i,errors:[RB(s,d,p,P&&P(),c)]};break}t(m,r)});let T=(m,j,r)=>r();return _.length>0&&(T=(m,j,r)=>{(()=>v(void 0,null,function*(){for(let{name:c,callback:f,note:P}of _)try{yield f(m)}catch(i){m.errors.push(yield new Promise(s=>j(i,c,P&&P(),s)))}}))().then(r)}),b=!0,{ok:!0,requestPlugins:R,runOnEndCallbacks:T}});function E7(){let k=new Map,e=0;return{load(t){return k.get(t)},store(t){if(t===void 0)return-1;let h=e++;return k.set(h,t),h}}}function EA(k,e,t){let h,d=!1;return()=>{if(d)return h;d=!0;try{let S=(k.stack+"").split(`
`);S.splice(1,1);let l=n7(e,S,t);if(l)return h={text:k.message,location:l},h}catch{}}}function RB(k,e,t,h,d){let S="Internal error",l=null;try{S=(k&&k.message||k)+""}catch{}try{l=n7(e,(k.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:d,text:S,location:l,notes:h?[h]:[],detail:t?t.store(k):-1}}function n7(k,e,t){let h="    at ";if(k.readFileSync&&!e[0].startsWith(h)&&e[1].startsWith(h))for(let d=1;d<e.length;d++){let S=e[d];if(!!S.startsWith(h))for(S=S.slice(h.length);;){let l=/^(?:new |async )?\S+ \((.*)\)$/.exec(S);if(l){S=l[1];continue}if(l=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(S),l){S=l[1];continue}if(l=/^(\S+):(\d+):(\d+)$/.exec(S),l){let g;try{g=k.readFileSync(l[1],"utf8")}catch{break}let p=g.split(/\r\n|\r|\n|\u2028|\u2029/)[+l[2]-1]||"",w=+l[3]-1,_=p.slice(w,w+t.length)===t?t.length:0;return{file:l[1],namespace:"file",line:+l[2],column:Z(p.slice(0,w)).length,length:Z(p.slice(w,w+_)).length,lineText:p+`
`+e.slice(1).join(`
`),suggestion:""}}break}}return null}function DB(k,e,t){let h=5,d=e.length<1?"":` with ${e.length} error${e.length<2?"":"s"}:`+e.slice(0,h+1).map((l,g)=>{if(g===h)return`
...`;if(!l.location)return`
error: ${l.text}`;let{file:p,line:w,column:_}=l.location,y=l.pluginName?`[plugin: ${l.pluginName}] `:"";return`
${p}:${w}:${_}: ERROR: ${y}${l.text}`}).join(""),S=new Error(`${k}${d}`);return S.errors=e,S.warnings=t,S}function fB(k,e){for(let t of k)t.detail=e.load(t.detail);return k}function r7(k,e){if(k==null)return null;let t={},h=n(k,t,"file",C),d=n(k,t,"namespace",C),S=n(k,t,"line",wB),l=n(k,t,"column",wB),g=n(k,t,"length",wB),p=n(k,t,"lineText",C),w=n(k,t,"suggestion",C);return EB(k,t,e),{file:h||"",namespace:d||"",line:S||0,column:l||0,length:g||0,lineText:p||"",suggestion:w||""}}function vB(k,e,t,h){let d=[],S=0;for(let l of k){let g={},p=n(l,g,"id",C),w=n(l,g,"pluginName",C),_=n(l,g,"text",C),y=n(l,g,"location",$7),H=n(l,g,"notes",eB),G=n(l,g,"detail",PA),U=`in element ${S} of "${e}"`;EB(l,g,U);let R=[];if(H)for(let b of H){let T={},m=n(b,T,"text",C),j=n(b,T,"location",$7);EB(b,T,U),R.push({text:m||"",location:r7(j,U)})}d.push({id:p||"",pluginName:w||h,text:_||"",location:r7(y,U),notes:R,detail:t?t.store(G):-1}),S++}return d}function nA(k,e){let t=[];for(let h of k){if(typeof h!="string")throw new Error(`${JSON.stringify(e)} must be an array of strings`);t.push(h)}return t}function j$({path:k,contents:e}){let t=null;return{path:k,contents:e,get text(){let h=this.contents;return(t===null||h!==e)&&(e=h,t=jB(h)),t}}}var c$="0.15.12",u$=k=>rA().build(k),h$=()=>{throw new Error('The "serve" API only works in node')},m$=(k,e)=>rA().transform(k,e),Q$=(k,e)=>rA().formatMessages(k,e),d$=(k,e)=>rA().analyzeMetafile(k,e),g$=()=>{throw new Error('The "buildSync" API only works in node')},T$=()=>{throw new Error('The "transformSync" API only works in node')},X$=()=>{throw new Error('The "formatMessagesSync" API only works in node')},b$=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},IB,yA,rA=()=>{if(yA)return yA;throw IB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},S$=k=>{k=r$(k||{});let e=k.wasmURL,t=k.wasmModule,h=k.worker!==!1;if(!e&&!t)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(IB)throw new Error('Cannot call "initialize" more than once');return IB=H$(e||"",t,h),IB.catch(()=>{IB=void 0}),IB},H$=(k,e,t)=>v(void 0,null,function*(){let h;if(e)h=e;else{let g=yield fetch(k);if(!g.ok)throw new Error(`Failed to download ${JSON.stringify(k)}`);h=yield g.arrayBuffer()}let d;if(t){let g=new Blob([`onmessage=((postMessage) => {
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
    })(postMessage)`],{type:"text/javascript"});d=new Worker(URL.createObjectURL(g))}else{let g=(p=>{var w=(H,G,U)=>new Promise((R,b)=>{var T=r=>{try{j(U.next(r))}catch(c){b(c)}},m=r=>{try{j(U.throw(r))}catch(c){b(c)}},j=r=>r.done?R(r.value):Promise.resolve(r.value).then(T,m);j((U=U.apply(H,G)).next())});let _,y={};for(let H=self;H;H=Object.getPrototypeOf(H))for(let G of Object.getOwnPropertyNames(H))G in y||Object.defineProperty(y,G,{get:()=>self[G]});return(()=>{let H=()=>{let R=new Error("not implemented");return R.code="ENOSYS",R};if(!y.fs){let R="";y.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(b,T){R+=U.decode(T);let m=R.lastIndexOf(`
`);return m!=-1&&(console.log(R.substr(0,m)),R=R.substr(m+1)),T.length},write(b,T,m,j,r,c){if(m!==0||j!==T.length||r!==null){c(H());return}let f=this.writeSync(b,T);c(null,f)},chmod(b,T,m){m(H())},chown(b,T,m,j){j(H())},close(b,T){T(H())},fchmod(b,T,m){m(H())},fchown(b,T,m,j){j(H())},fstat(b,T){T(H())},fsync(b,T){T(null)},ftruncate(b,T,m){m(H())},lchown(b,T,m,j){j(H())},link(b,T,m){m(H())},lstat(b,T){T(H())},mkdir(b,T,m){m(H())},open(b,T,m,j){j(H())},read(b,T,m,j,r,c){c(H())},readdir(b,T){T(H())},readlink(b,T){T(H())},rename(b,T,m){m(H())},rmdir(b,T){T(H())},stat(b,T){T(H())},symlink(b,T,m){m(H())},truncate(b,T,m){m(H())},unlink(b,T){T(H())},utimes(b,T,m,j){j(H())}}}if(y.process||(y.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw H()},pid:-1,ppid:-1,umask(){throw H()},cwd(){throw H()},chdir(){throw H()}}),!y.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!y.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!y.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!y.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let G=new TextEncoder("utf-8"),U=new TextDecoder("utf-8");y.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=P=>{P!==0&&console.warn("exit code:",P)},this._exitPromise=new Promise(P=>{this._resolveExitPromise=P}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let R=(P,i)=>{this.mem.setUint32(P+0,i,!0),this.mem.setUint32(P+4,Math.floor(i/4294967296),!0)},b=P=>{let i=this.mem.getUint32(P+0,!0),s=this.mem.getInt32(P+4,!0);return i+s*4294967296},T=P=>{let i=this.mem.getFloat64(P,!0);if(i===0)return;if(!isNaN(i))return i;let s=this.mem.getUint32(P,!0);return this._values[s]},m=(P,i)=>{if(typeof i=="number"&&i!==0){if(isNaN(i)){this.mem.setUint32(P+4,2146959360,!0),this.mem.setUint32(P,0,!0);return}this.mem.setFloat64(P,i,!0);return}if(i===void 0){this.mem.setFloat64(P,0,!0);return}let u=this._ids.get(i);u===void 0&&(u=this._idPool.pop(),u===void 0&&(u=this._values.length),this._values[u]=i,this._goRefCounts[u]=0,this._ids.set(i,u)),this._goRefCounts[u]++;let x=0;switch(typeof i){case"object":i!==null&&(x=1);break;case"string":x=2;break;case"symbol":x=3;break;case"function":x=4;break}this.mem.setUint32(P+4,2146959360|x,!0),this.mem.setUint32(P,u,!0)},j=P=>{let i=b(P+0),s=b(P+8);return new Uint8Array(this._inst.exports.mem.buffer,i,s)},r=P=>{let i=b(P+0),s=b(P+8),u=new Array(s);for(let x=0;x<s;x++)u[x]=T(i+x*8);return u},c=P=>{let i=b(P+0),s=b(P+8);return U.decode(new DataView(this._inst.exports.mem.buffer,i,s))},f=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":P=>{P>>>=0;let i=this.mem.getInt32(P+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(i)},"runtime.wasmWrite":P=>{P>>>=0;let i=b(P+8),s=b(P+16),u=this.mem.getInt32(P+24,!0);y.fs.writeSync(i,new Uint8Array(this._inst.exports.mem.buffer,s,u))},"runtime.resetMemoryDataView":P=>{P>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":P=>{P>>>=0,R(P+8,(f+performance.now())*1e6)},"runtime.walltime":P=>{P>>>=0;let i=new Date().getTime();R(P+8,i/1e3),this.mem.setInt32(P+16,i%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":P=>{P>>>=0;let i=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(i,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(i);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},b(P+8)+1)),this.mem.setInt32(P+16,i,!0)},"runtime.clearTimeoutEvent":P=>{P>>>=0;let i=this.mem.getInt32(P+8,!0);clearTimeout(this._scheduledTimeouts.get(i)),this._scheduledTimeouts.delete(i)},"runtime.getRandomData":P=>{P>>>=0,crypto.getRandomValues(j(P+8))},"syscall/js.finalizeRef":P=>{P>>>=0;let i=this.mem.getUint32(P+8,!0);if(this._goRefCounts[i]--,this._goRefCounts[i]===0){let s=this._values[i];this._values[i]=null,this._ids.delete(s),this._idPool.push(i)}},"syscall/js.stringVal":P=>{P>>>=0,m(P+24,c(P+8))},"syscall/js.valueGet":P=>{P>>>=0;let i=Reflect.get(T(P+8),c(P+16));P=this._inst.exports.getsp()>>>0,m(P+32,i)},"syscall/js.valueSet":P=>{P>>>=0,Reflect.set(T(P+8),c(P+16),T(P+32))},"syscall/js.valueDelete":P=>{P>>>=0,Reflect.deleteProperty(T(P+8),c(P+16))},"syscall/js.valueIndex":P=>{P>>>=0,m(P+24,Reflect.get(T(P+8),b(P+16)))},"syscall/js.valueSetIndex":P=>{P>>>=0,Reflect.set(T(P+8),b(P+16),T(P+24))},"syscall/js.valueCall":P=>{P>>>=0;try{let i=T(P+8),s=Reflect.get(i,c(P+16)),u=r(P+32),x=Reflect.apply(s,i,u);P=this._inst.exports.getsp()>>>0,m(P+56,x),this.mem.setUint8(P+64,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+56,i),this.mem.setUint8(P+64,0)}},"syscall/js.valueInvoke":P=>{P>>>=0;try{let i=T(P+8),s=r(P+16),u=Reflect.apply(i,void 0,s);P=this._inst.exports.getsp()>>>0,m(P+40,u),this.mem.setUint8(P+48,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+40,i),this.mem.setUint8(P+48,0)}},"syscall/js.valueNew":P=>{P>>>=0;try{let i=T(P+8),s=r(P+16),u=Reflect.construct(i,s);P=this._inst.exports.getsp()>>>0,m(P+40,u),this.mem.setUint8(P+48,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+40,i),this.mem.setUint8(P+48,0)}},"syscall/js.valueLength":P=>{P>>>=0,R(P+16,parseInt(T(P+8).length))},"syscall/js.valuePrepareString":P=>{P>>>=0;let i=G.encode(String(T(P+8)));m(P+16,i),R(P+24,i.length)},"syscall/js.valueLoadString":P=>{P>>>=0;let i=T(P+8);j(P+16).set(i)},"syscall/js.valueInstanceOf":P=>{P>>>=0,this.mem.setUint8(P+24,T(P+8)instanceof T(P+16)?1:0)},"syscall/js.copyBytesToGo":P=>{P>>>=0;let i=j(P+8),s=T(P+32);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8(P+48,0);return}let u=s.subarray(0,i.length);i.set(u),R(P+40,u.length),this.mem.setUint8(P+48,1)},"syscall/js.copyBytesToJS":P=>{P>>>=0;let i=T(P+8),s=j(P+16);if(!(i instanceof Uint8Array||i instanceof Uint8ClampedArray)){this.mem.setUint8(P+48,0);return}let u=s.subarray(0,i.length);i.set(u),R(P+40,u.length),this.mem.setUint8(P+48,1)},debug:P=>{console.log(P)}}}}run(R){return w(this,null,function*(){if(!(R instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=R,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,y,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[y,5],[this,6]]),this._idPool=[],this.exited=!1;let b=4096,T=P=>{let i=b,s=G.encode(P+"\0");return new Uint8Array(this.mem.buffer,b,s.length).set(s),b+=s.length,b%8!==0&&(b+=8-b%8),i},m=this.argv.length,j=[];this.argv.forEach(P=>{j.push(T(P))}),j.push(0),Object.keys(this.env).sort().forEach(P=>{j.push(T(`${P}=${this.env[P]}`))}),j.push(0);let c=b;j.forEach(P=>{this.mem.setUint32(b,P,!0),this.mem.setUint32(b+4,0,!0),b+=8});let f=4096+8192;if(b>=f)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(m,c),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(R){let b=this;return function(){let T={id:R,this:this,args:arguments};return b._pendingEvent=T,b._resume(),T.result}}}})(),_=({data:H})=>{let G=new TextDecoder,U=y.fs,R="";U.writeSync=(r,c)=>{if(r===1)p(c);else if(r===2){R+=G.decode(c);let f=R.split(`
`);f.length>1&&console.log(f.slice(0,-1).join(`
`)),R=f[f.length-1]}else throw new Error("Bad write");return c.length};let b=[],T,m=0;_=({data:r})=>{r.length>0&&(b.push(r),T&&T())},U.read=(r,c,f,P,i,s)=>{if(r!==0||f!==0||P!==c.length||i!==null)throw new Error("Bad read");if(b.length===0){T=()=>U.read(r,c,f,P,i,s);return}let u=b[0],x=Math.max(0,Math.min(P,u.length-m));c.set(u.subarray(m,m+x),f),m+=x,m===u.length&&(b.shift(),m=0),s(null,x)};let j=new y.Go;j.argv=["","--service=0.15.12"],H instanceof WebAssembly.Module?WebAssembly.instantiate(H,j.importObject).then(r=>j.run(r)):WebAssembly.instantiate(H,j.importObject).then(({instance:r})=>j.run(r))},H=>_(H)})(p=>d.onmessage({data:p}));d={onmessage:null,postMessage:p=>setTimeout(()=>g({data:p})),terminate(){}}}d.postMessage(h),d.onmessage=({data:g})=>S(g);let{readFromStdout:S,service:l}=s$({writeToStdin(g){d.postMessage(g)},isSync:!1,isWriteUnavailable:!0,esbuild:kB});yA={build:g=>new Promise((p,w)=>l.buildOrServe({callName:"build",refs:null,serveOptions:null,options:g,isTTY:!1,defaultWD:"/",callback:(_,y)=>_?w(_):p(y)})),transform:(g,p)=>new Promise((w,_)=>l.transform({callName:"transform",refs:null,input:g,options:p||{},isTTY:!1,fs:{readFile(y,H){H(new Error("Internal error"),null)},writeFile(y,H){H(null)}},callback:(y,H)=>y?_(y):w(H)})),formatMessages:(g,p)=>new Promise((w,_)=>l.formatMessages({callName:"formatMessages",refs:null,messages:g,options:p,callback:(y,H)=>y?_(y):w(H)})),analyzeMetafile:(g,p)=>new Promise((w,_)=>l.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof g=="string"?g:JSON.stringify(g),options:p,callback:(y,H)=>y?_(y):w(H)}))}}),f$=kB})(typeof zA=="object"?zA:{set exports(A){(typeof self<"u"?self:this).esbuild=A}})});W();XB();XB();W();XB();XB();var X7=function(){var A=function(B,$){return A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(E,a){E.__proto__=a}||function(E,a){for(var Q in a)a.hasOwnProperty(Q)&&(E[Q]=a[Q])},A(B,$)};return function(B,$){A(B,$);function E(){this.constructor=B}B.prototype=$===null?Object.create($):(E.prototype=$.prototype,new E)}}(),FA="html",UA="svg",y$="http://www.w3.org/2000/svg",C$=function(A,B){if(B===FA)return A instanceof HTMLElement;if(B===UA)return A instanceof SVGElement;throw new Error('Unrecognized element type "'+B+'" for validateElementType.')},b7=function(A,B){var $={},E,a,Q;if(A===FA)Q=document.createElement("div");else if(A===UA)Q=document.createElementNS(y$,"g");else throw new Error('Invalid element type "'+A+'" for createPortalNode: must be "html" or "svg".');if(B&&typeof B=="object")for(var o=0,X=Object.entries(B.attributes);o<X.length;o++){var v=X[o],kB=v[0],BB=v[1];Q.setAttribute(kB,BB)}var HB={element:Q,elementType:A,setPortalProps:function(pB){$=pB},getInitialPortalProps:function(){return $},mount:function(pB,Z){if(Z!==a){if(HB.unmount(),pB!==E&&!C$(pB,A))throw new Error('Invalid element type for portal: "'+A+'" portalNodes must be used with '+A+" elements, but OutPortal is within <"+pB.tagName+">.");pB.replaceChild(HB.element,Z),E=pB,a=Z}},unmount:function(pB){pB&&pB!==a||E&&a&&(E.replaceChild(a,HB.element),E=void 0,a=void 0)}};return HB},S7=function(A){X7(B,A);function B($){var E=A.call(this,$)||this;return E.addPropsChannel=function(){Object.assign(E.props.node,{setPortalProps:function(a){E.setState({nodeProps:a})}})},E.state={nodeProps:E.props.node.getInitialPortalProps()},E}return B.prototype.componentDidMount=function(){this.addPropsChannel()},B.prototype.componentDidUpdate=function(){this.addPropsChannel()},B.prototype.render=function(){var $=this,E=this.props,a=E.children,Q=E.node;return T7(j7.map(a,function(o){return Q7(o)?u7(o,$.state.nodeProps):o}),Q.element)},B}(DA),lA=function(A){X7(B,A);function B($){var E=A.call(this,$)||this;return E.placeholderNode=m7(),E.passPropsThroughPortal(),E}return B.prototype.passPropsThroughPortal=function(){var $=Object.assign({},this.props,{node:void 0});this.props.node.setPortalProps($)},B.prototype.componentDidMount=function(){var $=this.props.node;this.currentPortalNode=$;var E=this.placeholderNode.current,a=E.parentNode;$.mount(a,E),this.passPropsThroughPortal()},B.prototype.componentDidUpdate=function(){var $=this.props.node;this.currentPortalNode&&$!==this.currentPortalNode&&(this.currentPortalNode.unmount(this.placeholderNode.current),this.currentPortalNode.setPortalProps({}),this.currentPortalNode=$);var E=this.placeholderNode.current,a=E.parentNode;$.mount(a,E),this.passPropsThroughPortal()},B.prototype.componentWillUnmount=function(){var $=this.props.node;$.unmount(this.placeholderNode.current),$.setPortalProps({})},B.prototype.render=function(){return h7("div",{ref:this.placeholderNode})},B}(DA),H7=b7.bind(null,FA),jk=b7.bind(null,UA);W();XB();W();XB();var WA=class extends LB.Component{constructor(B){super(B),this.state={error:void 0,errorInfo:void 0}}componentDidCatch(B,$){this.setState({error:B,errorInfo:$})}render(){return this.state.errorInfo?hB("div",{children:[q("h2",{children:"Something went wrong."}),hB("details",{style:{whiteSpace:"pre-wrap"},children:[this.state.error&&this.state.error.toString(),q("br",{}),this.state.errorInfo.componentStack]})]}):this.props.children}},f7=WA;_A();W();var LA=iA(v$(),1),w$=LA.default.default||LA.default,pA=w$;var R7=iA(y7(),1);var G$=A=>window.importShim?window.importShim(A):import(A);Object.assign(globalThis,{apps:{},eCaches:{}});var{apps:dB,eCaches:YB}=globalThis||globalThis.apps,D7=({hash:A,codeSpace:B})=>{let[$,E]=WB(TB(PB().transpiled).slice(0,8));FB(()=>{let o=TB(PB().transpiled).slice(0,8);o!==$&&E(o)},[A]);let a=UB(null),Q=dB[$];return q(f7,{ref:a,children:q(Q,{appId:`${B}-${$}`})},$)},C7=!1;async function GB(A="",B){let{transpiled:$,i:E}=PB(),a=A.length>0?A:$,Q=TB(a).slice(0,8);if(!dB[Q])try{console.log(`i: ${E}: `);let o=(await G$(O$(a))).default;if((0,R7.default)(o))YB[Q]=pA({key:Q.replace(/\d+/g,""),speedy:!1}),YB[Q].compat=void 0,dB[Q]=({appId:X})=>X.includes(Q)?q(oA,{value:YB[Q],children:q("div",{css:bB`height: 100%;`,id:X,children:q(o,{})})}):null;else throw new Error("the default export is not a function!")}catch(o){if(o instanceof SyntaxError){let X=o.name,v=o.message;dB[Q]=()=>hB("div",{css:bB`background-color: orange;`,children:[q("h1",{children:"Syntax Error"}),hB("h2",{children:[X,": ",v]}),q("p",{children:JSON.stringify({err:o})})]})}else if(o instanceof Error){let X=o.name,v=o.message;dB[Q]=()=>hB("div",{css:bB`background-color: orange;`,children:[q("h1",{children:"Syntax Error"}),hB("h2",{children:[X,": ",v]}),q("p",{children:JSON.stringify({err:o})})]})}else dB[Q]=()=>q("div",{css:bB`background-color: orange;`,children:hB("h1",{children:["Unknown Error: $",Q]})})}return!C7&&B&&(C7=!0,await w7({codeSpace:B})),dB[Q]}function O$(A,B="index.mjs"){let $=new File([A],B,{type:"application/javascript",lastModified:Date.now()});return URL.createObjectURL($)}_A();W();XB();W();W();var YA=iA(x$(),1);W();W();function I7(A,B=$=>$.key){var $=[];return JA(A,"",!0,E=>$.push(E),B),$.join("")}function JA(A,B,$,E,a){if(A){E(`${B}${$?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 "}${a(A)}
`);let Q=B+($?"    ":"\u2502   ");A.left&&JA(A.left,Q,!1,E,a),A.right&&JA(A.right,Q,!0,E,a)}}function uA(A){if(A===null)return!0;var B=hA(A.left),$=hA(A.right);return!!(Math.abs(B-$)<=1&&uA(A.left)&&uA(A.right))}function hA(A){return A?1+Math.max(hA(A.left),hA(A.right)):0}function mA(A,B,$,E,a){let Q=a-E;if(Q>0){let o=E+Math.floor(Q/2),X=B[o],v=$[o],kB={key:X,data:v,parent:A};return kB.left=mA(kB,B,$,E,o),kB.right=mA(kB,B,$,o+1,a),kB}return null}function QA(A){if(A===null)return 0;let B=QA(A.left),$=QA(A.right);return A.balanceFactor=B-$,Math.max(B,$)+1}function dA(A,B,$,E,a){if($>=E)return;let Q=A[$+E>>1],o=$-1,X=E+1;for(;;){do o++;while(a(A[o],Q)<0);do X--;while(a(A[X],Q)>0);if(o>=X)break;let v=A[o];A[o]=A[X],A[X]=v,v=B[o],B[o]=B[X],B[X]=v}dA(A,B,$,X,a),dA(A,B,X+1,E,a)}function q$(A,B){return A>B?1:A<B?-1:0}function gA(A){var B=A.right;return A.right=B.left,B.left&&(B.left.parent=A),B.parent=A.parent,B.parent&&(B.parent.left===A?B.parent.left=B:B.parent.right=B),A.parent=B,B.left=A,A.balanceFactor+=1,B.balanceFactor<0&&(A.balanceFactor-=B.balanceFactor),B.balanceFactor+=1,A.balanceFactor>0&&(B.balanceFactor+=A.balanceFactor),B}function TA(A){var B=A.left;return A.left=B.right,A.left&&(A.left.parent=A),B.parent=A.parent,B.parent&&(B.parent.left===A?B.parent.left=B:B.parent.right=B),A.parent=B,B.right=A,A.balanceFactor-=1,B.balanceFactor>0&&(A.balanceFactor-=B.balanceFactor),B.balanceFactor-=1,A.balanceFactor<0&&(B.balanceFactor+=A.balanceFactor),B}var yB=class{constructor(B,$=!1){this._comparator=B||q$,this._root=null,this._size=0,this._noDuplicates=!!$}destroy(){return this.clear()}clear(){return this._root=null,this._size=0,this}get size(){return this._size}contains(B){if(this._root)for(var $=this._root,E=this._comparator;$;){var a=E(B,$.key);if(a===0)return!0;a<0?$=$.left:$=$.right}return!1}next(B){var $=B;if($)if($.right)for($=$.right;$.left;)$=$.left;else for($=B.parent;$&&$.right===B;)B=$,$=$.parent;return $}prev(B){var $=B;if($)if($.left)for($=$.left;$.right;)$=$.right;else for($=B.parent;$&&$.left===B;)B=$,$=$.parent;return $}forEach(B){for(var $=this._root,E=[],a=!1,Q=0;!a;)$?(E.push($),$=$.left):E.length>0?($=E.pop(),B($,Q++),$=$.right):a=!0;return this}range(B,$,E,a){let Q=[],o=this._comparator,X=this._root,v;for(;Q.length!==0||X;)if(X)Q.push(X),X=X.left;else{if(X=Q.pop(),v=o(X.key,$),v>0)break;if(o(X.key,B)>=0&&E.call(a,X))return this;X=X.right}return this}keys(){for(var B=this._root,$=[],E=[],a=!1;!a;)B?($.push(B),B=B.left):$.length>0?(B=$.pop(),E.push(B.key),B=B.right):a=!0;return E}values(){for(var B=this._root,$=[],E=[],a=!1;!a;)B?($.push(B),B=B.left):$.length>0?(B=$.pop(),E.push(B.data),B=B.right):a=!0;return E}at(B){for(var $=this._root,E=[],a=!1,Q=0;!a;)if($)E.push($),$=$.left;else if(E.length>0){if($=E.pop(),Q===B)return $;Q++,$=$.right}else a=!0;return null}minNode(){var B=this._root;if(!B)return null;for(;B.left;)B=B.left;return B}maxNode(){var B=this._root;if(!B)return null;for(;B.right;)B=B.right;return B}min(){var B=this._root;if(!B)return null;for(;B.left;)B=B.left;return B.key}max(){var B=this._root;if(!B)return null;for(;B.right;)B=B.right;return B.key}isEmpty(){return!this._root}pop(){var B=this._root,$=null;if(B){for(;B.left;)B=B.left;$={key:B.key,data:B.data},this.remove(B.key)}return $}popMax(){var B=this._root,$=null;if(B){for(;B.right;)B=B.right;$={key:B.key,data:B.data},this.remove(B.key)}return $}find(B){for(var $=this._root,E=$,a,Q=this._comparator;E;){if(a=Q(B,E.key),a===0)return E;a<0?E=E.left:E=E.right}return null}insert(B,$){if(!this._root)return this._root={parent:null,left:null,right:null,balanceFactor:0,key:B,data:$},this._size++,this._root;var E=this._comparator,a=this._root,Q=null,o=0;if(this._noDuplicates)for(;a;){if(o=E(B,a.key),Q=a,o===0)return null;o<0?a=a.left:a=a.right}else for(;a;)o=E(B,a.key),Q=a,o<=0?a=a.left:a=a.right;var X={left:null,right:null,balanceFactor:0,parent:Q,key:B,data:$},v;for(o<=0?Q.left=X:Q.right=X;Q&&(o=E(Q.key,B),o<0?Q.balanceFactor-=1:Q.balanceFactor+=1,Q.balanceFactor!==0);){if(Q.balanceFactor<-1){Q.right.balanceFactor===1&&TA(Q.right),v=gA(Q),Q===this._root&&(this._root=v);break}else if(Q.balanceFactor>1){Q.left.balanceFactor===-1&&gA(Q.left),v=TA(Q),Q===this._root&&(this._root=v);break}Q=Q.parent}return this._size++,X}remove(B){if(!this._root)return null;for(var $=this._root,E=this._comparator,a=0;$&&(a=E(B,$.key),a!==0);)a<0?$=$.left:$=$.right;if(!$)return null;var Q=$.key,o,X;if($.left){for(o=$.left;o.left||o.right;){for(;o.right;)o=o.right;$.key=o.key,$.data=o.data,o.left&&($=o,o=o.left)}$.key=o.key,$.data=o.data,$=o}if($.right){for(X=$.right;X.left||X.right;){for(;X.left;)X=X.left;$.key=X.key,$.data=X.data,X.right&&($=X,X=X.right)}$.key=X.key,$.data=X.data,$=X}for(var v=$.parent,kB=$,BB;v&&(v.left===kB?v.balanceFactor-=1:v.balanceFactor+=1,v.balanceFactor<-1?(v.right.balanceFactor===1&&TA(v.right),BB=gA(v),v===this._root&&(this._root=BB),v=BB):v.balanceFactor>1&&(v.left.balanceFactor===-1&&gA(v.left),BB=TA(v),v===this._root&&(this._root=BB),v=BB),!(v.balanceFactor===-1||v.balanceFactor===1));)kB=v,v=v.parent;return $.parent&&($.parent.left===$?$.parent.left=null:$.parent.right=null),$===this._root&&(this._root=null),this._size--,Q}load(B=[],$=[],E){if(this._size!==0)throw new Error("bulk-load: tree is not empty");let a=B.length;return E&&dA(B,$,0,a-1,this._comparator),this._root=mA(null,B,$,0,a),QA(this._root),this._size=a,this}isBalanced(){return uA(this._root)}toString(B){return I7(this._root,B)}};yB.default=yB;W();var XA,J$=new Uint8Array(16);function V$(){if(!XA&&(XA=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!XA))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return XA(J$)}var K$=/^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;function Y$(A){return typeof A=="string"&&K$.test(A)}var iB=[];for(let A=0;A<256;++A)iB.push((A+256).toString(16).slice(1));function Z$(A){let B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,$=(iB[A[B+0]]+iB[A[B+1]]+iB[A[B+2]]+iB[A[B+3]]+"-"+iB[A[B+4]]+iB[A[B+5]]+"-"+iB[A[B+6]]+iB[A[B+7]]+"-"+iB[A[B+8]]+iB[A[B+9]]+"-"+iB[A[B+10]]+iB[A[B+11]]+iB[A[B+12]]+iB[A[B+13]]+iB[A[B+14]]+iB[A[B+15]]).toLowerCase();if(!Y$($))throw new TypeError("Stringified UUID is invalid");return $}function _7(A,B,$){A=A||{};let E=A.random||(A.rng||V$)();if(E[6]=E[6]&15|64,E[8]=E[8]&63|128,B){$=$||0;for(let a=0;a<16;++a)B[$+a]=E[a];return B}return Z$(E)}W();async function OB(A){return new Promise(B=>{setTimeout(()=>{B()},A)})}var z$=new yB((A,B)=>A===B?0:A<B?1:-1,!0),HA=[],lB=(self&&self.crypto&&self.crypto.randomUUID&&self.crypto.randomUUID()||_7()).slice(0,8);z$.insert(lB);var K={},ZB,SB,F7="",qB=0,bA=0,U7=0,ZA=0,sB=null,W7,CB=!1,fA={},uB={localStream:null,webRtcArray:HA,tracks:fA,user:lB,rtcConns:K,send(A){let B=JSON.stringify({...A,name:A.name||lB});HA.map($=>{try{if($.readyState!=="open")return;(!A.target||$.target===A.target&&!zB.includes($.target))&&$.send(B)}catch{}})}};Object.assign(globalThis,{sendChannel:uB});var Zk=async A=>{let{mST:B,address:$}=A;SB=A.codeSpace,ZB=new BroadcastChannel(location.origin),!(location.pathname.endsWith("dehydrated")&&(ZB.onmessage=E=>{E.data.codeSpace===SB&&console.log(E.data)}))&&(o7(SB,{name:lB,state:B},location.origin),await GB(B.transpiled,SB),await N7(),ZB=new BroadcastChannel(location.origin),ZB.onmessage=async E=>{if(!(E.data.ignoreUser&&E.data.ignoreUser===lB)&&(E.data.codeSpace===SB&&E.data.address&&!$&&sB?.send(JSON.stringify({codeSpace:SB,address:E.data.address})),E.data.ignoreUser&&!zB.includes(E.data.ignoreUser)&&zB.push(E.data.ignoreUser),E.data.codeSpace===SB&&E.data.sess.code!==PB().code)){let a=await RA(E.data.sess);await CA(a)}},_B(()=>{let E=PB(),a=TB(JSON.stringify(E));a!==F7&&(F7=a,ZB.postMessage({ignoreUser:lB,sess:E,codeSpace:SB,address:$}))},"broadcast"))},VA=null;async function SA(){return!CB||sB===null?(sB=null,await N7()):sB}var zB=[];function L7(){Ak(),Bk()}var Bk=(0,YA.default)(kk,100,{trailing:!0,leading:!0,maxWait:500}),Ak=(0,YA.default)($k,1200,{trailing:!0,leading:!0,maxWait:2500});async function $k(){try{if(sB){if(qB===cB())return;let A=PB(),B=await wA(qB,A);if(!B||B.newHash!==cB())return;let $=JSON.stringify({...B,name:lB});W7($)}else CB=!1,await SA()}catch{}}var zk=async()=>{!uB.localStream||uB.localStream.getTracks().map(A=>A.stop())},BP=async A=>{let B={audio:!0,video:!0},$=await navigator.mediaDevices.getUserMedia(B);A.srcObject=$,$.getTracks().forEach(E=>Object.keys(uB.rtcConns).map(a=>{let Q=uB.rtcConns[a];Q.addTrack(E),Q.ontrack=({track:o,streams:X})=>fA[a]={track:o,streams:X}}))};async function kk(){try{if(Object.keys(K).length>0){if(bA===cB())return;let A=PB(),B=bA?await wA(bA,A):await RA(A);B&&B.patch&&uB.send(B)}}catch{}}async function N7(){if(sB!==null)return sB;if(CB=!0,location.origin.includes("localhost"))return;let A=new WebSocket(`wss://${location.host}/live/`+SB+"/websocket");return CB=!1,A.addEventListener("open",()=>{sB=A,W7=E=>{try{sB&&sB?.send&&sB?.send(E)}catch{sB=null,CB=!1,SA()}};let $=Object.assign(A,{hashCode:cB()});return sB.addEventListener("message",E=>G7(E,"ws",$)),VA&&clearInterval(VA),VA=setInterval(()=>{let a=Date.now()-ZA;if(a>4e4)try{if(A.readyState===A.OPEN){A?.send(JSON.stringify({name:lB,timestamp:U7+a}));return}CB=!1,SA()}catch{CB=!1,SA()}},3e4),A.send(JSON.stringify({name:lB})),A}),A}var KA={};async function G7(A,B,$){if(sB==null)return;ZA=Date.now();let E=JSON.parse(A.data);Pk(E,B,$)}async function Pk(A,B,$){if(B==="ws"&&A.timestamp&&(ZA=Date.now(),U7=A.timestamp),(A.hashCode||A.newHash&&$)&&($.hashCode=A.hashCode||A.newHash),B==="ws"&&A.hashCode&&(qB=A.hashCode),B==="ws"&&A.hashCode&&(qB=A.hashCode),(B==="rtc"&&A.hashCode||A.newHash)&&(bA=A.hashCode||A.newHash),zB.includes(A.name)||A.newHash===cB())return;if(A.oldHash&&A.newHash){if(KA[A.oldHash]&&KA[A.oldHash]===A.newHash)return;KA[A.oldHash]=A.newHash}if(A.newHash===cB())return;if((async()=>{try{if(A.type==="new-ice-candidate"){await ek(A.candidate,A.name);return}if(A.type==="video-offer"){await Q(A.offer,A.name);return}if(A.type==="video-answer"){await a(A.answer,A.name);return}if(A.name&&A.name!==lB&&!K[A.name]&&!zB.includes(A.name)){await E(A.name);let o=A.users;for(;o.length;){await OB(2e3);let X=o.pop();X&&!uB.rtcConns[X]&&await E(X)}return}}catch{}})(),A.patch&&A.name!==lB){if(A.newHash===cB())return;if(await CA(A),A.newHash===cB()){uB&&uB.send({hashCode:A.newHash});return}return}if(A.patch&&A.name===lB){qB=A.newHash;return}if(A.name===lB)return;cB();function E(o){if(K[o])return;K[o]=new RTCPeerConnection(O7),K[o].onicecandidate=Z=>{Z.candidate&&sB?.send(JSON.stringify({type:"new-ice-candidate",target:o,name:lB,candidate:Z.candidate.toJSON()}))},K[o].oniceconnectionstatechange=HB,K[o].onicegatheringstatechange=pB,K[o].onsignalingstatechange=()=>{switch(K[o].signalingState){case"closed":break}},K[o].onnegotiationneeded=BB,K[o].ontrack=function({track:Z,streams:jB}){fA[o]={track:Z,streams:jB}},K[o].ondatachannel=Z=>{let jB=Z.channel;jB.binaryType="arraybuffer",jB.addEventListener("close",kB),uB&&uB.localStream&&uB.localStream.active&&uB.localStream.getTracks().forEach(xB=>{let VB=K[o];VB.addTrack(xB),VB.ontrack=({track:$A,streams:kA})=>fA[o]={track:$A,streams:kA}}),jB.addEventListener("message",async xB=>G7(xB,"rtc",Object.assign(jB,{hashCode:cB()})));let AA=Object.assign(jB,{target:o});HA.push(AA)};let X={ordered:!0,reliable:!0,maxPacketLifeTime:3e3},v=Object.assign(K[o].createDataChannel(o,X),{target:o});return v.binaryType="arraybuffer",v.addEventListener("error",Z=>{console.log("xxxxxx-  Data Channel Error:",Z)}),v.addEventListener("open",()=>{HA.push(v)}),v.addEventListener("close",()=>{}),K[o];function kB(){K[o].close(),delete K[o]}async function BB(){try{let Z=await K[o].createOffer();if(K[o].signalingState!="stable")return;await K[o].setLocalDescription(Z),sB?.send(JSON.stringify({target:o,name:lB,type:"video-offer",offer:K[o].localDescription}))}catch{}}function HB(){switch(K[o].iceConnectionState){case"closed":case"failed":case"disconnected":break}}function pB(){}}async function a(o,X){await K[X].setRemoteDescription(new RTCSessionDescription(o)).catch(console.error)}async function Q(o,X){K[X]||E(X),await K[X].setRemoteDescription(new RTCSessionDescription(o));let v=await K[X].createAnswer();await K[X].setLocalDescription(v),sB?.send(JSON.stringify({target:X,name:lB,type:"video-answer",answer:v}))}}var O7={iceServers:["stun3.l.google.com:19302"].map(A=>({urls:`stun:${A}`}))};O7.iceServers=[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}];async function ek(A,B){let $=new RTCIceCandidate(A);await K[B].addIceCandidate($)}async function AP(){try{if(navigator.serviceWorker.onmessage=async A=>{let B=A.source;if(B!=null)switch(A.data.method){case"ipfs-message-port":let $=new MessageChannel;B.postMessage({method:"ipfs-message-port",id:A.data.id,port:$.port2},{transfer:[$.port2]})}},document.documentElement.dataset.viewer){await(async B=>{switch((B&&B.split("/")||[])[0]||""){case"ipfs":case"ipns":document.body.innerHTML=`<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${B}"></iframe>`}})(location.pathname);return}}catch{}}W();var xA=iA(q7(),1);var J7="./chunk-esbuild-6NIHVSNG.wasm";var JB={init:!1,initialize:()=>{if(JB.init!==!1)return JB.init;let A=new URL(J7,location.origin).toString();return JB.init=(0,xA.initialize)({wasmURL:A}).then(()=>JB.init=!0),JB.init}},V7=async(A,B)=>{let $=JB.initialize();return $!==!0&&await $,(0,xA.transform)(A,B)};W();XB();XB();var oB={md5Hash:"",wait:1,res:null,codeSpace:"",waitForDiv:async()=>{let A=oB.md5Hash;return oB.res?.innerHTML||await K7(),oB.res?.innerHTML.includes(A)||await K7(),oB.res?.innerHTML.includes(A)?oB.res.innerHTML:(oB.wait=oB.wait*2,await oB.waitForDiv())},setHash:null,setApp:A=>{let B=document.createElement("div");B.style.visibility="hidden",B.style.position="absolute",document.body.appendChild(B);let $=sA(B);return $.render(q(nk,{md5Hash:A})),()=>{$.unmount,document.body.removeChild(B),B.remove(),delete dB[A],oB.setHash=null}}},Y7=async(A,B)=>{oB.codeSpace=B;let $=TB(A).slice(0,8);dB[$]||await GB(A),oB.wait=1;let E=oB.setApp($);try{let a=await oB.waitForDiv();if(!a)return{html:null,css:null};let Q=Ek(YB[$]),o=document.querySelector("style[data-emotion=z-global]")?.innerHTML;return{html:a,css:o+" "+Q}}finally{E()}};function Ek(A){let B=Object.keys(A.inserted).map($=>`.${A.key}-${$}`);return Array.from(document.styleSheets).map($=>$.cssRules[0]).filter($=>$&&B.includes($.selectorText)).map($=>$.cssText).join(`
`)}var nk=({md5Hash:A})=>{let B=UB(null),[$,E]=WB(A);FB(()=>{B?.current&&(oB.res=B.current),oB.md5Hash=$,oB.setHash=Q=>E(Q)},[B,$,E]);let a=dB[$];return q("div",{ref:B,children:q(a,{appId:`${oB.codeSpace}-${$}`},$)})},K7=()=>{let A;console.log("wait for animation");let B=new Promise($=>A=$);return requestAnimationFrame(()=>A(!0)),B};var vA={code:"",olderCode:""};async function B7({code:A,counter:B,codeSpace:$}){vA.code=A;let E=PB();if(console.log(`${E.i} => ${B}`),!(B<E.i)){setTimeout(()=>{vA.code===A&&A!==vA.olderCode&&B7({code:A,counter:B,codeSpace:$}),vA.olderCode=A},1e3);try{let a=await V7(A,{loader:"tsx",format:"esm",treeShaking:!0,minify:!0,keepNames:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",module:"ESNext",jsxFragmentFactory:"Fragment",jsxImportSource:"@emotion/react"}},target:"es2018"}),Q=TB(A).slice(0,8),o=`${a.code}//${Q}`,{html:X,css:v}=await Y7(o,$);if(console.log({html:X,css:v}),!X)return;l7({...PB(),code:A,i:B,transpiled:o,html:X,css:v}),L7()}catch(a){console.error({error:a})}finally{}}}XB();_A();W();function Z7(){let A=/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.userAgent.indexOf("SAMSUNG")===-1,B=!1;return function($){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test($)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test($.slice(0,4)))&&(B=!0)}(navigator.userAgent||navigator.vendor||window.opera),B&&!A}W();var B$=async A=>rk().prettierJs(A),A7=null,z7={prettierJs:async A=>{let B=performance.now();A7=A7||(await import("./chunk-prettierEsm-TP7AMCUV.mjs")).prettierJs;let $=performance.now();console.log(`importing took ${$-B} milliseconds.`);let E=A7(A),a=performance.now();return console.log(`prettier took ${a-$} milliseconds.`),E}},BA=null;function rk(){if(BA)return BA;if(!ak())return BA=z7;try{let A=new SharedWorker(new URL("prettierWorker.mjs",location.origin),{type:"module"});return BA=p7(A.port)}catch{return BA=z7}}function ak(){let A=!1,B={get type(){return A=!0,"module"}};try{new Worker("blob://",B)}finally{return A}}var $B={CH(){},getValue:async()=>"",setValue:async A=>{A.length<10&&console.log(A)},getErrors:async()=>[],code:"",counter:0,codeSpace:"",lastKeyDown:0,codeToSet:""},A$=({codeSpace:A})=>{let B=UB(null),{i:$,code:E}=PB(),[a,Q]=LB.useState({lastKeyDown:0,myCode:E,counter:$,started:!1,onChange(BB){},engine:Z7()?"ace":"monaco"});$B.counter=PB().i,$B.codeSpace=A;let{myCode:o,started:X,engine:v,onChange:kB}=a;return $B.code=o,LB.useEffect(()=>{!B?.current||X||(v==="monaco"?ik():sk()).then(BB=>Object.assign($B,BB)).then(()=>Q(BB=>({...BB,started:!0})))},[X,B]),LB.useEffect(()=>{$B.getErrors().then(console.log),kB(()=>$B.getValue().then(()=>Q(BB=>({...BB,counter:$B.counter,myCode:$B.code}))))},[kB,o,Q]),_B(()=>{$B.counter>=PB().i||($B.counter=PB().i,$B.code=PB().code,$B.setValue($B.code),Q(BB=>({...BB,counter:$B.counter,myCode:$B.code})))},"editor"),q("div",{onKeyDown:()=>$B.lastKeyDown=Date.now(),id:"editor",css:bB`          
      max-width: 640px;
      height: 100%; 
      `,ref:B})};async function $$(A){let B=await B$(A);if(B===$B.code)return;let $=++$B.counter;$B.code=B,B7({code:B,counter:$,codeSpace:$B.codeSpace})}async function ik(){let A=document.createElement("link");A.setAttribute("rel","stylesheet"),A.href=location.origin+"/Editor.css",document.head.append(A);let{startMonaco:B}=await import("./chunk-startMonaco-TZZX7EX2.mjs"),$=window.document.getElementById("editor");return B({container:$,name:$B.codeSpace,code:PB().code,onChange:$$})}async function sk(){let{startAce:A}=await import("./chunk-startAce-FV3SITGG.mjs");return await OB(100),await A(PB().code,$$)}var ok=d7(()=>OB(1e3).then(()=>import("./chunk-DraggableWindow-HPHYBNO3.mjs"))),lk=({children:A})=>q("div",{css:bB`
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
`,children:A}),pk=({codeSpace:A})=>{let B=cB(),[$,E]=WB(B),a=location.pathname.endsWith("public")||location.pathname.endsWith("hydrated");FB(()=>{_B(async()=>{let o=cB();if($!==o)try{await GB(),E(o)}catch(X){console.error({e:X})}},"myApp")},[$,E]);let Q=g7(()=>H7({attributes:{id:`root-${A}`,style:"height: 100%"}}),[]);return hB(IA,{children:[q(S7,{node:Q,children:q(D7,{hash:$,codeSpace:A})}),a?q(lA,{node:Q}):q(c7,{fallback:q(lA,{node:Q}),children:q(lk,{children:hB(IA,{children:[q(A$,{codeSpace:A}),q(ok,{room:A,children:q(lA,{node:Q})})]})})})]})},k$={started:!1},w7=({codeSpace:A})=>{if(k$.started)return;k$.started=!0;let B=document.querySelector("#root"),$=sA(B),E=pA({key:"root"});$.render(q(oA,{value:E,cj:!0,children:q(pk,{codeSpace:A})}))};export{w7 as a,uB as b,Zk as c,L7 as d,zk as e,BP as f,N7 as g,AP as h,Y7 as i,A$ as j};
