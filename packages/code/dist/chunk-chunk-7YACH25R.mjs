import{a as L$,c as M7,d as N$,e as G$,f as O$,g as q$,h as J$,i as V$,j as K$,k as OA}from"./chunk-chunk-3MUKUM7Q.mjs";import{e as Y$,f as Z$}from"./chunk-chunk-6DVZZJG6.mjs";import{a as W$,b as gB,e as hB,f as AB,g as UA,h as WB,i as WA,j as LA,k as m7,l as Q7}from"./chunk-chunk-L2U7Q2OG.mjs";import{b as d7}from"./chunk-chunk-66EYGUWD.mjs";import{B as NB,C as GB,H as uA,L as v7,M as OB,N as GA,O as TB,a as g7,d as NA,f as T7,g as X7,i as b7,k as S7,m as H7,n as f7,u as LB,z as x7}from"./chunk-chunk-CE3G72A7.mjs";import{b as cA,d as sB,e as h7,j as U}from"./chunk-chunk-FWOMBYHR.mjs";var D7=cA($A=>{"use strict";U();Object.defineProperty($A,"__esModule",{value:!0});TB();M7();var qB=K$();N$();L$();G$();O$();q$();J$();V$();var AA=(Z$(),h7(Y$)),Ak=AA.Fragment;function $k(A,B,$){return qB.hasOwnProperty.call(B,"css")?AA.jsx(qB.Emotion,qB.createEmotionProps(A,B),$):AA.jsx(A,B,$)}function kk(A,B,$){return qB.hasOwnProperty.call(B,"css")?AA.jsxs(qB.Emotion,qB.createEmotionProps(A,B),$):AA.jsxs(A,B,$)}$A.Fragment=Ak;$A.jsx=$k;$A.jsxs=kk});var XB=cA((Nk,I7)=>{"use strict";U();I7.exports=D7()});var L7=cA((Yk,W7)=>{"use strict";U();var U7=Function.prototype.toString,VB=typeof Reflect=="object"&&Reflect!==null&&Reflect.apply,ZA,QA;if(typeof VB=="function"&&typeof Object.defineProperty=="function")try{ZA=Object.defineProperty({},"length",{get:function(){throw QA}}),QA={},VB(function(){throw 42},null,ZA)}catch(A){A!==QA&&(VB=null)}else VB=null;var ek=/^\s*class\b/,zA=function(B){try{var $=U7.call(B);return ek.test($)}catch{return!1}},YA=function(B){try{return zA(B)?!1:(U7.call(B),!0)}catch{return!1}},dA=Object.prototype.toString,tk="[object Object]",Ek="[object Function]",nk="[object GeneratorFunction]",rk="[object HTMLAllCollection]",ak="[object HTML document.all class]",ik="[object HTMLCollection]",sk=typeof Symbol=="function"&&!!Symbol.toStringTag,ok=!(0 in[,]),B7=function(){return!1};typeof document=="object"&&(F7=document.all,dA.call(F7)===dA.call(document.all)&&(B7=function(B){if((ok||!B)&&(typeof B>"u"||typeof B=="object"))try{var $=dA.call(B);return($===rk||$===ak||$===ik||$===tk)&&B("")==null}catch{}return!1}));var F7;W7.exports=VB?function(B){if(B7(B))return!0;if(!B||typeof B!="function"&&typeof B!="object")return!1;try{VB(B,null,ZA)}catch($){if($!==QA)return!1}return!zA(B)&&YA(B)}:function(B){if(B7(B))return!0;if(!B||typeof B!="function"&&typeof B!="object")return!1;if(sk)return YA(B);if(zA(B))return!1;var $=dA.call(B);return $!==Ek&&$!==nk&&!/^\[object HTML/.test($)?!1:YA(B)}});var k$=cA((HP,t7)=>{U();(A=>{"use strict";var B=Object.defineProperty,$=Object.getOwnPropertyDescriptor,E=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,Q=(k,e)=>{for(var t in e)B(k,t,{get:e[t],enumerable:!0})},o=(k,e,t,h)=>{if(e&&typeof e=="object"||typeof e=="function")for(let d of E(e))!a.call(k,d)&&d!==t&&B(k,d,{get:()=>e[d],enumerable:!(h=$(e,d))||h.enumerable});return k},T=k=>o(B({},"__esModule",{value:!0}),k),v=(k,e,t)=>new Promise((h,d)=>{var S=p=>{try{g(t.next(p))}catch(w){d(w)}},l=p=>{try{g(t.throw(p))}catch(w){d(w)}},g=p=>p.done?h(p.value):Promise.resolve(p.value).then(S,l);g((t=t.apply(k,e)).next())}),PB={};Q(PB,{analyzeMetafile:()=>C$,analyzeMetafileSync:()=>I$,build:()=>x$,buildSync:()=>w$,default:()=>U$,formatMessages:()=>y$,formatMessagesSync:()=>D$,initialize:()=>_$,serve:()=>v$,transform:()=>M$,transformSync:()=>R$,version:()=>f$}),A.exports=T(PB);function z(k){let e=h=>{if(h===null)t.write8(0);else if(typeof h=="boolean")t.write8(1),t.write8(+h);else if(typeof h=="number")t.write8(2),t.write32(h|0);else if(typeof h=="string")t.write8(3),t.write(Y(h));else if(h instanceof Uint8Array)t.write8(4),t.write(h);else if(h instanceof Array){t.write8(5),t.write32(h.length);for(let d of h)e(d)}else{let d=Object.keys(h);t.write8(6),t.write32(d.length);for(let S of d)t.write(Y(S)),e(h[S])}},t=new cB;return t.write32(0),t.write32(k.id<<1|+!k.isRequest),e(k.value),MB(t.buf,t.len-4,0),t.buf.subarray(0,t.len)}function fB(k){let e=()=>{switch(t.read8()){case 0:return null;case 1:return!!t.read8();case 2:return t.read32();case 3:return uB(t.read());case 4:return t.read();case 5:{let l=t.read32(),g=[];for(let p=0;p<l;p++)g.push(e());return g}case 6:{let l=t.read32(),g={};for(let p=0;p<l;p++)g[uB(t.read())]=e();return g}default:throw new Error("Invalid packet")}},t=new cB(k),h=t.read32(),d=(h&1)===0;h>>>=1;let S=e();if(t.ptr!==k.length)throw new Error("Invalid packet");return{id:h,isRequest:d,value:S}}var cB=class{constructor(k=new Uint8Array(1024)){this.buf=k,this.len=0,this.ptr=0}_write(k){if(this.len+k>this.buf.length){let e=new Uint8Array((this.len+k)*2);e.set(this.buf),this.buf=e}return this.len+=k,this.len-k}write8(k){let e=this._write(1);this.buf[e]=k}write32(k){let e=this._write(4);MB(this.buf,k,e)}write(k){let e=this._write(4+k.length);MB(this.buf,k.length,e),this.buf.set(k,e+4)}_read(k){if(this.ptr+k>this.buf.length)throw new Error("Invalid packet");return this.ptr+=k,this.ptr-k}read8(){return this.buf[this._read(1)]}read32(){return EA(this.buf,this._read(4))}read(){let k=this.read32(),e=new Uint8Array(k),t=this._read(e.length);return e.set(this.buf.subarray(t,t+k)),e}},Y,uB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let k=new TextEncoder,e=new TextDecoder;Y=t=>k.encode(t),uB=t=>e.decode(t)}else if(typeof Buffer<"u")Y=k=>{let e=Buffer.from(k);return e instanceof Uint8Array||(e=new Uint8Array(e)),e},uB=k=>{let{buffer:e,byteOffset:t,byteLength:h}=k;return Buffer.from(e,t,h).toString()};else throw new Error("No UTF-8 codec found");function EA(k,e){return k[e++]|k[e++]<<8|k[e++]<<16|k[e++]<<24}function MB(k,e,t){k[t++]=e,k[t++]=e>>8,k[t++]=e>>16,k[t++]=e>>24}var zB="warning",nA="silent";function rA(k){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid target: ${k}`);return k}var aA=()=>null,Z=k=>typeof k=="boolean"?null:"a boolean",j$=k=>typeof k=="boolean"||typeof k=="object"&&!Array.isArray(k)?null:"a boolean or an object",C=k=>typeof k=="string"?null:"a string",iA=k=>k instanceof RegExp?null:"a RegExp object",IB=k=>typeof k=="number"&&k===(k|0)?null:"an integer",_A=k=>typeof k=="function"?null:"a function",eB=k=>Array.isArray(k)?null:"an array",SB=k=>typeof k=="object"&&k!==null&&!Array.isArray(k)?null:"an object",c$=k=>k instanceof WebAssembly.Module?null:"a WebAssembly.Module",u$=k=>typeof k=="object"&&k!==null?null:"an array or an object",r7=k=>typeof k=="object"&&!Array.isArray(k)?null:"an object or null",a7=k=>typeof k=="string"||typeof k=="boolean"?null:"a string or a boolean",h$=k=>typeof k=="string"||typeof k=="object"&&k!==null&&!Array.isArray(k)?null:"a string or an object",m$=k=>typeof k=="string"||Array.isArray(k)?null:"a string or an array",i7=k=>typeof k=="string"||k instanceof Uint8Array?null:"a string or a Uint8Array";function n(k,e,t,h){let d=k[t];if(e[t+""]=!0,d===void 0)return;let S=h(d);if(S!==null)throw new Error(`"${t}" must be ${S}`);return d}function rB(k,e,t){for(let h in k)if(!(h in e))throw new Error(`Invalid option ${t}: "${h}"`)}function Q$(k){let e=Object.create(null),t=n(k,e,"wasmURL",C),h=n(k,e,"wasmModule",c$),d=n(k,e,"worker",Z);return rB(k,e,"in initialize() call"),{wasmURL:t,wasmModule:h,worker:d}}function s7(k){let e;if(k!==void 0){e=Object.create(null);for(let t of Object.keys(k)){let h=k[t];if(typeof h=="string"||h===!1)e[t]=h;else throw new Error(`Expected ${JSON.stringify(t)} in mangle cache to map to either a string or false`)}}return e}function sA(k,e,t,h,d){let S=n(e,t,"color",Z),l=n(e,t,"logLevel",C),g=n(e,t,"logLimit",IB);S!==void 0?k.push(`--color=${S}`):h&&k.push("--color=true"),k.push(`--log-level=${l||d}`),k.push(`--log-limit=${g||0}`)}function o7(k,e,t){let h=n(e,t,"legalComments",C),d=n(e,t,"sourceRoot",C),S=n(e,t,"sourcesContent",Z),l=n(e,t,"target",m$),g=n(e,t,"format",C),p=n(e,t,"globalName",C),w=n(e,t,"mangleProps",iA),_=n(e,t,"reserveProps",iA),y=n(e,t,"mangleQuoted",Z),H=n(e,t,"minify",Z),G=n(e,t,"minifySyntax",Z),W=n(e,t,"minifyWhitespace",Z),R=n(e,t,"minifyIdentifiers",Z),b=n(e,t,"drop",eB),X=n(e,t,"charset",C),m=n(e,t,"treeShaking",Z),j=n(e,t,"ignoreAnnotations",Z),r=n(e,t,"jsx",C),c=n(e,t,"jsxFactory",C),f=n(e,t,"jsxFragment",C),P=n(e,t,"jsxImportSource",C),i=n(e,t,"jsxDev",Z),s=n(e,t,"jsxSideEffects",Z),u=n(e,t,"define",SB),x=n(e,t,"logOverride",SB),F=n(e,t,"supported",SB),I=n(e,t,"pure",eB),O=n(e,t,"keepNames",Z),L=n(e,t,"platform",C);if(h&&k.push(`--legal-comments=${h}`),d!==void 0&&k.push(`--source-root=${d}`),S!==void 0&&k.push(`--sources-content=${S}`),l&&(Array.isArray(l)?k.push(`--target=${Array.from(l).map(rA).join(",")}`):k.push(`--target=${rA(l)}`)),g&&k.push(`--format=${g}`),p&&k.push(`--global-name=${p}`),L&&k.push(`--platform=${L}`),H&&k.push("--minify"),G&&k.push("--minify-syntax"),W&&k.push("--minify-whitespace"),R&&k.push("--minify-identifiers"),X&&k.push(`--charset=${X}`),m!==void 0&&k.push(`--tree-shaking=${m}`),j&&k.push("--ignore-annotations"),b)for(let D of b)k.push(`--drop:${D}`);if(w&&k.push(`--mangle-props=${w.source}`),_&&k.push(`--reserve-props=${_.source}`),y!==void 0&&k.push(`--mangle-quoted=${y}`),r&&k.push(`--jsx=${r}`),c&&k.push(`--jsx-factory=${c}`),f&&k.push(`--jsx-fragment=${f}`),P&&k.push(`--jsx-import-source=${P}`),i&&k.push("--jsx-dev"),s&&k.push("--jsx-side-effects"),u)for(let D in u){if(D.indexOf("=")>=0)throw new Error(`Invalid define: ${D}`);k.push(`--define:${D}=${u[D]}`)}if(x)for(let D in x){if(D.indexOf("=")>=0)throw new Error(`Invalid log override: ${D}`);k.push(`--log-override:${D}=${x[D]}`)}if(F)for(let D in F){if(D.indexOf("=")>=0)throw new Error(`Invalid supported: ${D}`);k.push(`--supported:${D}=${F[D]}`)}if(I)for(let D of I)k.push(`--pure:${D}`);O&&k.push("--keep-names")}function d$(k,e,t,h,d){var S;let l=[],g=[],p=Object.create(null),w=null,_=null,y=null;sA(l,e,p,t,h),o7(l,e,p);let H=n(e,p,"sourcemap",a7),G=n(e,p,"bundle",Z),W=n(e,p,"watch",j$),R=n(e,p,"splitting",Z),b=n(e,p,"preserveSymlinks",Z),X=n(e,p,"metafile",Z),m=n(e,p,"outfile",C),j=n(e,p,"outdir",C),r=n(e,p,"outbase",C),c=n(e,p,"tsconfig",C),f=n(e,p,"resolveExtensions",eB),P=n(e,p,"nodePaths",eB),i=n(e,p,"mainFields",eB),s=n(e,p,"conditions",eB),u=n(e,p,"external",eB),x=n(e,p,"loader",SB),F=n(e,p,"outExtension",SB),I=n(e,p,"publicPath",C),O=n(e,p,"entryNames",C),L=n(e,p,"chunkNames",C),D=n(e,p,"assetNames",C),q=n(e,p,"inject",eB),tB=n(e,p,"banner",SB),aB=n(e,p,"footer",SB),BB=n(e,p,"entryPoints",u$),J=n(e,p,"absWorkingDir",C),N=n(e,p,"stdin",SB),iB=(S=n(e,p,"write",Z))!=null?S:d,QB=n(e,p,"allowOverwrite",Z),CB=n(e,p,"incremental",Z)===!0,BA=n(e,p,"mangleCache",SB);if(p.plugins=!0,rB(e,p,`in ${k}() call`),H&&l.push(`--sourcemap${H===!0?"":`=${H}`}`),G&&l.push("--bundle"),QB&&l.push("--allow-overwrite"),W)if(l.push("--watch"),typeof W=="boolean")y={};else{let M=Object.create(null),K=n(W,M,"onRebuild",_A);rB(W,M,`on "watch" in ${k}() call`),y={onRebuild:K}}if(R&&l.push("--splitting"),b&&l.push("--preserve-symlinks"),X&&l.push("--metafile"),m&&l.push(`--outfile=${m}`),j&&l.push(`--outdir=${j}`),r&&l.push(`--outbase=${r}`),c&&l.push(`--tsconfig=${c}`),f){let M=[];for(let K of f){if(K+="",K.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${K}`);M.push(K)}l.push(`--resolve-extensions=${M.join(",")}`)}if(I&&l.push(`--public-path=${I}`),O&&l.push(`--entry-names=${O}`),L&&l.push(`--chunk-names=${L}`),D&&l.push(`--asset-names=${D}`),i){let M=[];for(let K of i){if(K+="",K.indexOf(",")>=0)throw new Error(`Invalid main field: ${K}`);M.push(K)}l.push(`--main-fields=${M.join(",")}`)}if(s){let M=[];for(let K of s){if(K+="",K.indexOf(",")>=0)throw new Error(`Invalid condition: ${K}`);M.push(K)}l.push(`--conditions=${M.join(",")}`)}if(u)for(let M of u)l.push(`--external:${M}`);if(tB)for(let M in tB){if(M.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${M}`);l.push(`--banner:${M}=${tB[M]}`)}if(aB)for(let M in aB){if(M.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${M}`);l.push(`--footer:${M}=${aB[M]}`)}if(q)for(let M of q)l.push(`--inject:${M}`);if(x)for(let M in x){if(M.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${M}`);l.push(`--loader:${M}=${x[M]}`)}if(F)for(let M in F){if(M.indexOf("=")>=0)throw new Error(`Invalid out extension: ${M}`);l.push(`--out-extension:${M}=${F[M]}`)}if(BB)if(Array.isArray(BB))for(let M of BB)g.push(["",M+""]);else for(let[M,K]of Object.entries(BB))g.push([M+"",K+""]);if(N){let M=Object.create(null),K=n(N,M,"contents",i7),jA=n(N,M,"resolveDir",C),c7=n(N,M,"sourcefile",C),u7=n(N,M,"loader",C);rB(N,M,'in "stdin" object'),c7&&l.push(`--sourcefile=${c7}`),u7&&l.push(`--loader=${u7}`),jA&&(_=jA+""),typeof K=="string"?w=Y(K):K instanceof Uint8Array&&(w=K)}let dB=[];if(P)for(let M of P)M+="",dB.push(M);return{entries:g,flags:l,write:iB,stdinContents:w,stdinResolveDir:_,absWorkingDir:J,incremental:CB,nodePaths:dB,watch:y,mangleCache:s7(BA)}}function g$(k,e,t,h){let d=[],S=Object.create(null);sA(d,e,S,t,h),o7(d,e,S);let l=n(e,S,"sourcemap",a7),g=n(e,S,"tsconfigRaw",h$),p=n(e,S,"sourcefile",C),w=n(e,S,"loader",C),_=n(e,S,"banner",C),y=n(e,S,"footer",C),H=n(e,S,"mangleCache",SB);return rB(e,S,`in ${k}() call`),l&&d.push(`--sourcemap=${l===!0?"external":l}`),g&&d.push(`--tsconfig-raw=${typeof g=="string"?g:JSON.stringify(g)}`),p&&d.push(`--sourcefile=${p}`),w&&d.push(`--loader=${w}`),_&&d.push(`--banner=${_}`),y&&d.push(`--footer=${y}`),{flags:d,mangleCache:s7(H)}}function T$(k){let e={},t={didClose:!1,reason:""},h={},d=0,S=0,l=new Uint8Array(16*1024),g=0,p=j=>{let r=g+j.length;if(r>l.length){let f=new Uint8Array(r*2);f.set(l),l=f}l.set(j,g),g+=j.length;let c=0;for(;c+4<=g;){let f=EA(l,c);if(c+4+f>g)break;c+=4,W(l.subarray(c,c+f)),c+=f}c>0&&(l.copyWithin(0,c,g),g-=c)},w=j=>{t.didClose=!0,j&&(t.reason=": "+(j.message||j));let r="The service was stopped"+t.reason;for(let c in h)h[c](r,null);h={}},_=(j,r,c)=>{if(t.didClose)return c("The service is no longer running"+t.reason,null);let f=d++;h[f]=(P,i)=>{try{c(P,i)}finally{j&&j.unref()}},j&&j.ref(),k.writeToStdin(z({id:f,isRequest:!0,value:r}))},y=(j,r)=>{if(t.didClose)throw new Error("The service is no longer running"+t.reason);k.writeToStdin(z({id:j,isRequest:!1,value:r}))},H=(j,r)=>v(this,null,function*(){try{if(r.command==="ping"){y(j,{});return}if(typeof r.key=="number"){let c=e[r.key];if(c){let f=c[r.command];if(f){yield f(j,r);return}}}throw new Error("Invalid command: "+r.command)}catch(c){y(j,{errors:[_B(c,k,null,void 0,"")]})}}),G=!0,W=j=>{if(G){G=!1;let c=String.fromCharCode(...j);if(c!=="0.15.12")throw new Error(`Cannot start service: Host version "0.15.12" does not match binary version ${JSON.stringify(c)}`);return}let r=fB(j);if(r.isRequest)H(r.id,r.value);else{let c=h[r.id];delete h[r.id],r.value.error?c(r.value.error,{}):c(null,r.value)}};return{readFromStdout:p,afterClose:w,service:{buildOrServe:({callName:j,refs:r,serveOptions:c,options:f,isTTY:P,defaultWD:i,callback:s})=>{let u=0,x=S++,F={},I={ref(){++u===1&&r&&r.ref()},unref(){--u===0&&(delete e[x],r&&r.unref())}};e[x]=F,I.ref(),X$(j,x,_,y,I,k,F,f,c,P,i,t,(O,L)=>{try{s(O,L)}finally{I.unref()}})},transform:({callName:j,refs:r,input:c,options:f,isTTY:P,fs:i,callback:s})=>{let u=l7(),x=F=>{try{if(typeof c!="string"&&!(c instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:I,mangleCache:O}=g$(j,f,P,nA),L={command:"transform",flags:I,inputFS:F!==null,input:F!==null?Y(F):typeof c=="string"?Y(c):c};O&&(L.mangleCache=O),_(r,L,(D,q)=>{if(D)return s(new Error(D),null);let tB=xB(q.errors,u),aB=xB(q.warnings,u),BB=1,J=()=>{if(--BB===0){let N={warnings:aB,code:q.code,map:q.map};q.mangleCache&&(N.mangleCache=q?.mangleCache),s(null,N)}};if(tB.length>0)return s(FB("Transform failed",tB,aB),null);q.codeFS&&(BB++,i.readFile(q.code,(N,iB)=>{N!==null?s(N,null):(q.code=iB,J())})),q.mapFS&&(BB++,i.readFile(q.map,(N,iB)=>{N!==null?s(N,null):(q.map=iB,J())})),J()})}catch(I){let O=[];try{sA(O,f,{},P,nA)}catch{}let L=_B(I,k,u,void 0,"");_(r,{command:"error",flags:O,error:L},()=>{L.detail=u.load(L.detail),s(FB("Transform failed",[L],[]),null)})}};if((typeof c=="string"||c instanceof Uint8Array)&&c.length>1024*1024){let F=x;x=()=>i.writeFile(c,F)}x(null)},formatMessages:({callName:j,refs:r,messages:c,options:f,callback:P})=>{let i=yB(c,"messages",null,"");if(!f)throw new Error(`Missing second argument in ${j}() call`);let s={},u=n(f,s,"kind",C),x=n(f,s,"color",Z),F=n(f,s,"terminalWidth",IB);if(rB(f,s,`in ${j}() call`),u===void 0)throw new Error(`Missing "kind" in ${j}() call`);if(u!=="error"&&u!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${j}() call`);let I={command:"format-msgs",messages:i,isWarning:u==="warning"};x!==void 0&&(I.color=x),F!==void 0&&(I.terminalWidth=F),_(r,I,(O,L)=>{if(O)return P(new Error(O),null);P(null,L.messages)})},analyzeMetafile:({callName:j,refs:r,metafile:c,options:f,callback:P})=>{f===void 0&&(f={});let i={},s=n(f,i,"color",Z),u=n(f,i,"verbose",Z);rB(f,i,`in ${j}() call`);let x={command:"analyze-metafile",metafile:c};s!==void 0&&(x.color=s),u!==void 0&&(x.verbose=u),_(r,x,(F,I)=>{if(F)return P(new Error(F),null);P(null,I.result)})}}}}function X$(k,e,t,h,d,S,l,g,p,w,_,y,H){let G=l7(),W=(m,j,r,c)=>{let f=[];try{sA(f,g,{},w,zB)}catch{}let P=_B(m,S,G,r,j);t(d,{command:"error",flags:f,error:P},()=>{P.detail=G.load(P.detail),c(P)})},R=(m,j)=>{W(m,j,void 0,r=>{H(FB("Build failed",[r],[]),null)})},b;if(typeof g=="object"){let m=g.plugins;if(m!==void 0){if(!Array.isArray(m))throw new Error('"plugins" must be an array');b=m}}if(b&&b.length>0){if(S.isSync){R(new Error("Cannot use plugins in synchronous API calls"),"");return}S$(e,t,h,d,S,l,g,b,G).then(m=>{if(!m.ok){R(m.error,m.pluginName);return}try{X(m.requestPlugins,m.runOnEndCallbacks)}catch(j){R(j,"")}},m=>R(m,""));return}try{X(null,(m,j,r)=>r())}catch(m){R(m,"")}function X(m,j){let r=!S.isWriteUnavailable,{entries:c,flags:f,write:P,stdinContents:i,stdinResolveDir:s,absWorkingDir:u,incremental:x,nodePaths:F,watch:I,mangleCache:O}=d$(k,g,w,zB,r),L={command:"build",key:e,entries:c,flags:f,write:P,stdinContents:i,stdinResolveDir:s,absWorkingDir:u||_,incremental:x,nodePaths:F};m&&(L.plugins=m),O&&(L.mangleCache=O);let D=p&&b$(e,t,h,d,l,p,L),q,tB,aB=(J,N)=>{J.outputFiles&&(N.outputFiles=J.outputFiles.map(H$)),J.metafile&&(N.metafile=JSON.parse(J.metafile)),J.mangleCache&&(N.mangleCache=J.mangleCache),J.writeToStdout!==void 0&&console.log(uB(J.writeToStdout).replace(/\n$/,""))},BB=(J,N)=>{let iB={errors:xB(J.errors,G),warnings:xB(J.warnings,G)};aB(J,iB),j(iB,W,()=>{if(iB.errors.length>0)return N(FB("Build failed",iB.errors,iB.warnings),null);if(J.rebuild){if(!q){let QB=!1;q=()=>new Promise((CB,BA)=>{if(QB||y.didClose)throw new Error("Cannot rebuild");t(d,{command:"rebuild",key:e},(dB,M)=>{if(dB)return N(FB("Build failed",[{id:"",pluginName:"",text:dB,location:null,notes:[],detail:void 0}],[]),null);BB(M,(K,jA)=>{K?BA(K):CB(jA)})})}),d.ref(),q.dispose=()=>{QB||(QB=!0,t(d,{command:"rebuild-dispose",key:e},()=>{}),d.unref())}}iB.rebuild=q}if(J.watch){if(!tB){let QB=!1;d.ref(),tB=()=>{QB||(QB=!0,delete l["watch-rebuild"],t(d,{command:"watch-stop",key:e},()=>{}),d.unref())},I&&(l["watch-rebuild"]=(CB,BA)=>{try{let dB=BA.args,M={errors:xB(dB.errors,G),warnings:xB(dB.warnings,G)};aB(dB,M),j(M,W,()=>{if(M.errors.length>0){I.onRebuild&&I.onRebuild(FB("Build failed",M.errors,M.warnings),null);return}M.stop=tB,I.onRebuild&&I.onRebuild(null,M)})}catch(dB){console.error(dB)}h(CB,{})})}iB.stop=tB}N(null,iB)})};if(P&&S.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(x&&S.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(I&&S.isSync)throw new Error('Cannot use "watch" with a synchronous build');t(d,L,(J,N)=>{if(J)return H(new Error(J),null);if(D){let iB=N,QB=!1;d.ref();let CB={port:iB.port,host:iB.host,wait:D.wait,stop(){QB||(QB=!0,D.stop(),d.unref())}};return d.ref(),D.wait.then(d.unref,d.unref),H(null,CB)}return BB(N,H)})}}var b$=(k,e,t,h,d,S,l)=>{let g={},p=n(S,g,"port",IB),w=n(S,g,"host",C),_=n(S,g,"servedir",C),y=n(S,g,"onRequest",_A),H=new Promise((G,W)=>{d["serve-wait"]=(R,b)=>{b.error!==null?W(new Error(b.error)):G(),t(R,{})}});return l.serve={},rB(S,g,"in serve() call"),p!==void 0&&(l.serve.port=p),w!==void 0&&(l.serve.host=w),_!==void 0&&(l.serve.servedir=_),d["serve-request"]=(G,W)=>{y&&y(W.args),t(G,{})},{wait:H,stop(){e(h,{command:"serve-stop",key:k},()=>{})}}},S$=(k,e,t,h,d,S,l,g,p)=>v(void 0,null,function*(){let w=[],_=[],y={},H={},G=0,W=0,R=[],b=!1;g=[...g];for(let m of g){let j={};if(typeof m!="object")throw new Error(`Plugin at index ${W} must be an object`);let r=n(m,j,"name",C);if(typeof r!="string"||r==="")throw new Error(`Plugin at index ${W} is missing a name`);try{let c=n(m,j,"setup",_A);if(typeof c!="function")throw new Error("Plugin is missing a setup function");rB(m,j,`on plugin ${JSON.stringify(r)}`);let f={name:r,onResolve:[],onLoad:[]};W++;let i=c({initialOptions:l,resolve:(s,u={})=>{if(!b)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof s!="string")throw new Error("The path to resolve must be a string");let x=Object.create(null),F=n(u,x,"pluginName",C),I=n(u,x,"importer",C),O=n(u,x,"namespace",C),L=n(u,x,"resolveDir",C),D=n(u,x,"kind",C),q=n(u,x,"pluginData",aA);return rB(u,x,"in resolve() call"),new Promise((tB,aB)=>{let BB={command:"resolve",path:s,key:k,pluginName:r};F!=null&&(BB.pluginName=F),I!=null&&(BB.importer=I),O!=null&&(BB.namespace=O),L!=null&&(BB.resolveDir=L),D!=null&&(BB.kind=D),q!=null&&(BB.pluginData=p.store(q)),e(h,BB,(J,N)=>{J!==null?aB(new Error(J)):tB({errors:xB(N.errors,p),warnings:xB(N.warnings,p),path:N.path,external:N.external,sideEffects:N.sideEffects,namespace:N.namespace,suffix:N.suffix,pluginData:p.load(N.pluginData)})})})},onStart(s){let u='This error came from the "onStart" callback registered here:',x=oA(new Error(u),d,"onStart");w.push({name:r,callback:s,note:x})},onEnd(s){let u='This error came from the "onEnd" callback registered here:',x=oA(new Error(u),d,"onEnd");_.push({name:r,callback:s,note:x})},onResolve(s,u){let x='This error came from the "onResolve" callback registered here:',F=oA(new Error(x),d,"onResolve"),I={},O=n(s,I,"filter",iA),L=n(s,I,"namespace",C);if(rB(s,I,`in onResolve() call for plugin ${JSON.stringify(r)}`),O==null)throw new Error("onResolve() call is missing a filter");let D=G++;y[D]={name:r,callback:u,note:F},f.onResolve.push({id:D,filter:O.source,namespace:L||""})},onLoad(s,u){let x='This error came from the "onLoad" callback registered here:',F=oA(new Error(x),d,"onLoad"),I={},O=n(s,I,"filter",iA),L=n(s,I,"namespace",C);if(rB(s,I,`in onLoad() call for plugin ${JSON.stringify(r)}`),O==null)throw new Error("onLoad() call is missing a filter");let D=G++;H[D]={name:r,callback:u,note:F},f.onLoad.push({id:D,filter:O.source,namespace:L||""})},esbuild:d.esbuild});i&&(yield i),R.push(f)}catch(c){return{ok:!1,error:c,pluginName:r}}}S["on-start"]=(m,j)=>v(void 0,null,function*(){let r={errors:[],warnings:[]};yield Promise.all(w.map(c=>v(void 0,[c],function*({name:f,callback:P,note:i}){try{let s=yield P();if(s!=null){if(typeof s!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(f)} to return an object`);let u={},x=n(s,u,"errors",eB),F=n(s,u,"warnings",eB);rB(s,u,`from onStart() callback in plugin ${JSON.stringify(f)}`),x!=null&&r.errors.push(...yB(x,"errors",p,f)),F!=null&&r.warnings.push(...yB(F,"warnings",p,f))}}catch(s){r.errors.push(_B(s,d,p,i&&i(),f))}}))),t(m,r)}),S["on-resolve"]=(m,j)=>v(void 0,null,function*(){let r={},c="",f,P;for(let i of j.ids)try{({name:c,callback:f,note:P}=y[i]);let s=yield f({path:j.path,importer:j.importer,namespace:j.namespace,resolveDir:j.resolveDir,kind:j.kind,pluginData:p.load(j.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(c)} to return an object`);let u={},x=n(s,u,"pluginName",C),F=n(s,u,"path",C),I=n(s,u,"namespace",C),O=n(s,u,"suffix",C),L=n(s,u,"external",Z),D=n(s,u,"sideEffects",Z),q=n(s,u,"pluginData",aA),tB=n(s,u,"errors",eB),aB=n(s,u,"warnings",eB),BB=n(s,u,"watchFiles",eB),J=n(s,u,"watchDirs",eB);rB(s,u,`from onResolve() callback in plugin ${JSON.stringify(c)}`),r.id=i,x!=null&&(r.pluginName=x),F!=null&&(r.path=F),I!=null&&(r.namespace=I),O!=null&&(r.suffix=O),L!=null&&(r.external=L),D!=null&&(r.sideEffects=D),q!=null&&(r.pluginData=p.store(q)),tB!=null&&(r.errors=yB(tB,"errors",p,c)),aB!=null&&(r.warnings=yB(aB,"warnings",p,c)),BB!=null&&(r.watchFiles=lA(BB,"watchFiles")),J!=null&&(r.watchDirs=lA(J,"watchDirs"));break}}catch(s){r={id:i,errors:[_B(s,d,p,P&&P(),c)]};break}t(m,r)}),S["on-load"]=(m,j)=>v(void 0,null,function*(){let r={},c="",f,P;for(let i of j.ids)try{({name:c,callback:f,note:P}=H[i]);let s=yield f({path:j.path,namespace:j.namespace,suffix:j.suffix,pluginData:p.load(j.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(c)} to return an object`);let u={},x=n(s,u,"pluginName",C),F=n(s,u,"contents",i7),I=n(s,u,"resolveDir",C),O=n(s,u,"pluginData",aA),L=n(s,u,"loader",C),D=n(s,u,"errors",eB),q=n(s,u,"warnings",eB),tB=n(s,u,"watchFiles",eB),aB=n(s,u,"watchDirs",eB);rB(s,u,`from onLoad() callback in plugin ${JSON.stringify(c)}`),r.id=i,x!=null&&(r.pluginName=x),F instanceof Uint8Array?r.contents=F:F!=null&&(r.contents=Y(F)),I!=null&&(r.resolveDir=I),O!=null&&(r.pluginData=p.store(O)),L!=null&&(r.loader=L),D!=null&&(r.errors=yB(D,"errors",p,c)),q!=null&&(r.warnings=yB(q,"warnings",p,c)),tB!=null&&(r.watchFiles=lA(tB,"watchFiles")),aB!=null&&(r.watchDirs=lA(aB,"watchDirs"));break}}catch(s){r={id:i,errors:[_B(s,d,p,P&&P(),c)]};break}t(m,r)});let X=(m,j,r)=>r();return _.length>0&&(X=(m,j,r)=>{(()=>v(void 0,null,function*(){for(let{name:c,callback:f,note:P}of _)try{yield f(m)}catch(i){m.errors.push(yield new Promise(s=>j(i,c,P&&P(),s)))}}))().then(r)}),b=!0,{ok:!0,requestPlugins:R,runOnEndCallbacks:X}});function l7(){let k=new Map,e=0;return{load(t){return k.get(t)},store(t){if(t===void 0)return-1;let h=e++;return k.set(h,t),h}}}function oA(k,e,t){let h,d=!1;return()=>{if(d)return h;d=!0;try{let S=(k.stack+"").split(`
`);S.splice(1,1);let l=p7(e,S,t);if(l)return h={text:k.message,location:l},h}catch{}}}function _B(k,e,t,h,d){let S="Internal error",l=null;try{S=(k&&k.message||k)+""}catch{}try{l=p7(e,(k.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:d,text:S,location:l,notes:h?[h]:[],detail:t?t.store(k):-1}}function p7(k,e,t){let h="    at ";if(k.readFileSync&&!e[0].startsWith(h)&&e[1].startsWith(h))for(let d=1;d<e.length;d++){let S=e[d];if(!!S.startsWith(h))for(S=S.slice(h.length);;){let l=/^(?:new |async )?\S+ \((.*)\)$/.exec(S);if(l){S=l[1];continue}if(l=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(S),l){S=l[1];continue}if(l=/^(\S+):(\d+):(\d+)$/.exec(S),l){let g;try{g=k.readFileSync(l[1],"utf8")}catch{break}let p=g.split(/\r\n|\r|\n|\u2028|\u2029/)[+l[2]-1]||"",w=+l[3]-1,_=p.slice(w,w+t.length)===t?t.length:0;return{file:l[1],namespace:"file",line:+l[2],column:Y(p.slice(0,w)).length,length:Y(p.slice(w,w+_)).length,lineText:p+`
`+e.slice(1).join(`
`),suggestion:""}}break}}return null}function FB(k,e,t){let h=5,d=e.length<1?"":` with ${e.length} error${e.length<2?"":"s"}:`+e.slice(0,h+1).map((l,g)=>{if(g===h)return`
...`;if(!l.location)return`
error: ${l.text}`;let{file:p,line:w,column:_}=l.location,y=l.pluginName?`[plugin: ${l.pluginName}] `:"";return`
${p}:${w}:${_}: ERROR: ${y}${l.text}`}).join(""),S=new Error(`${k}${d}`);return S.errors=e,S.warnings=t,S}function xB(k,e){for(let t of k)t.detail=e.load(t.detail);return k}function j7(k,e){if(k==null)return null;let t={},h=n(k,t,"file",C),d=n(k,t,"namespace",C),S=n(k,t,"line",IB),l=n(k,t,"column",IB),g=n(k,t,"length",IB),p=n(k,t,"lineText",C),w=n(k,t,"suggestion",C);return rB(k,t,e),{file:h||"",namespace:d||"",line:S||0,column:l||0,length:g||0,lineText:p||"",suggestion:w||""}}function yB(k,e,t,h){let d=[],S=0;for(let l of k){let g={},p=n(l,g,"id",C),w=n(l,g,"pluginName",C),_=n(l,g,"text",C),y=n(l,g,"location",r7),H=n(l,g,"notes",eB),G=n(l,g,"detail",aA),W=`in element ${S} of "${e}"`;rB(l,g,W);let R=[];if(H)for(let b of H){let X={},m=n(b,X,"text",C),j=n(b,X,"location",r7);rB(b,X,W),R.push({text:m||"",location:j7(j,W)})}d.push({id:p||"",pluginName:w||h,text:_||"",location:j7(y,W),notes:R,detail:t?t.store(G):-1}),S++}return d}function lA(k,e){let t=[];for(let h of k){if(typeof h!="string")throw new Error(`${JSON.stringify(e)} must be an array of strings`);t.push(h)}return t}function H$({path:k,contents:e}){let t=null;return{path:k,contents:e,get text(){let h=this.contents;return(t===null||h!==e)&&(e=h,t=uB(h)),t}}}var f$="0.15.12",x$=k=>pA().build(k),v$=()=>{throw new Error('The "serve" API only works in node')},M$=(k,e)=>pA().transform(k,e),y$=(k,e)=>pA().formatMessages(k,e),C$=(k,e)=>pA().analyzeMetafile(k,e),w$=()=>{throw new Error('The "buildSync" API only works in node')},R$=()=>{throw new Error('The "transformSync" API only works in node')},D$=()=>{throw new Error('The "formatMessagesSync" API only works in node')},I$=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},UB,FA,pA=()=>{if(FA)return FA;throw UB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},_$=k=>{k=Q$(k||{});let e=k.wasmURL,t=k.wasmModule,h=k.worker!==!1;if(!e&&!t)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(UB)throw new Error('Cannot call "initialize" more than once');return UB=F$(e||"",t,h),UB.catch(()=>{UB=void 0}),UB},F$=(k,e,t)=>v(void 0,null,function*(){let h;if(e)h=e;else{let g=yield fetch(k);if(!g.ok)throw new Error(`Failed to download ${JSON.stringify(k)}`);h=yield g.arrayBuffer()}let d;if(t){let g=new Blob([`onmessage=((postMessage) => {
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
    })(postMessage)`],{type:"text/javascript"});d=new Worker(URL.createObjectURL(g))}else{let g=(p=>{var w=(H,G,W)=>new Promise((R,b)=>{var X=r=>{try{j(W.next(r))}catch(c){b(c)}},m=r=>{try{j(W.throw(r))}catch(c){b(c)}},j=r=>r.done?R(r.value):Promise.resolve(r.value).then(X,m);j((W=W.apply(H,G)).next())});let _,y={};for(let H=self;H;H=Object.getPrototypeOf(H))for(let G of Object.getOwnPropertyNames(H))G in y||Object.defineProperty(y,G,{get:()=>self[G]});return(()=>{let H=()=>{let R=new Error("not implemented");return R.code="ENOSYS",R};if(!y.fs){let R="";y.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(b,X){R+=W.decode(X);let m=R.lastIndexOf(`
`);return m!=-1&&(console.log(R.substr(0,m)),R=R.substr(m+1)),X.length},write(b,X,m,j,r,c){if(m!==0||j!==X.length||r!==null){c(H());return}let f=this.writeSync(b,X);c(null,f)},chmod(b,X,m){m(H())},chown(b,X,m,j){j(H())},close(b,X){X(H())},fchmod(b,X,m){m(H())},fchown(b,X,m,j){j(H())},fstat(b,X){X(H())},fsync(b,X){X(null)},ftruncate(b,X,m){m(H())},lchown(b,X,m,j){j(H())},link(b,X,m){m(H())},lstat(b,X){X(H())},mkdir(b,X,m){m(H())},open(b,X,m,j){j(H())},read(b,X,m,j,r,c){c(H())},readdir(b,X){X(H())},readlink(b,X){X(H())},rename(b,X,m){m(H())},rmdir(b,X){X(H())},stat(b,X){X(H())},symlink(b,X,m){m(H())},truncate(b,X,m){m(H())},unlink(b,X){X(H())},utimes(b,X,m,j){j(H())}}}if(y.process||(y.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw H()},pid:-1,ppid:-1,umask(){throw H()},cwd(){throw H()},chdir(){throw H()}}),!y.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!y.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!y.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!y.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let G=new TextEncoder("utf-8"),W=new TextDecoder("utf-8");y.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=P=>{P!==0&&console.warn("exit code:",P)},this._exitPromise=new Promise(P=>{this._resolveExitPromise=P}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let R=(P,i)=>{this.mem.setUint32(P+0,i,!0),this.mem.setUint32(P+4,Math.floor(i/4294967296),!0)},b=P=>{let i=this.mem.getUint32(P+0,!0),s=this.mem.getInt32(P+4,!0);return i+s*4294967296},X=P=>{let i=this.mem.getFloat64(P,!0);if(i===0)return;if(!isNaN(i))return i;let s=this.mem.getUint32(P,!0);return this._values[s]},m=(P,i)=>{if(typeof i=="number"&&i!==0){if(isNaN(i)){this.mem.setUint32(P+4,2146959360,!0),this.mem.setUint32(P,0,!0);return}this.mem.setFloat64(P,i,!0);return}if(i===void 0){this.mem.setFloat64(P,0,!0);return}let u=this._ids.get(i);u===void 0&&(u=this._idPool.pop(),u===void 0&&(u=this._values.length),this._values[u]=i,this._goRefCounts[u]=0,this._ids.set(i,u)),this._goRefCounts[u]++;let x=0;switch(typeof i){case"object":i!==null&&(x=1);break;case"string":x=2;break;case"symbol":x=3;break;case"function":x=4;break}this.mem.setUint32(P+4,2146959360|x,!0),this.mem.setUint32(P,u,!0)},j=P=>{let i=b(P+0),s=b(P+8);return new Uint8Array(this._inst.exports.mem.buffer,i,s)},r=P=>{let i=b(P+0),s=b(P+8),u=new Array(s);for(let x=0;x<s;x++)u[x]=X(i+x*8);return u},c=P=>{let i=b(P+0),s=b(P+8);return W.decode(new DataView(this._inst.exports.mem.buffer,i,s))},f=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":P=>{P>>>=0;let i=this.mem.getInt32(P+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(i)},"runtime.wasmWrite":P=>{P>>>=0;let i=b(P+8),s=b(P+16),u=this.mem.getInt32(P+24,!0);y.fs.writeSync(i,new Uint8Array(this._inst.exports.mem.buffer,s,u))},"runtime.resetMemoryDataView":P=>{P>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":P=>{P>>>=0,R(P+8,(f+performance.now())*1e6)},"runtime.walltime":P=>{P>>>=0;let i=new Date().getTime();R(P+8,i/1e3),this.mem.setInt32(P+16,i%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":P=>{P>>>=0;let i=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(i,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(i);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},b(P+8)+1)),this.mem.setInt32(P+16,i,!0)},"runtime.clearTimeoutEvent":P=>{P>>>=0;let i=this.mem.getInt32(P+8,!0);clearTimeout(this._scheduledTimeouts.get(i)),this._scheduledTimeouts.delete(i)},"runtime.getRandomData":P=>{P>>>=0,crypto.getRandomValues(j(P+8))},"syscall/js.finalizeRef":P=>{P>>>=0;let i=this.mem.getUint32(P+8,!0);if(this._goRefCounts[i]--,this._goRefCounts[i]===0){let s=this._values[i];this._values[i]=null,this._ids.delete(s),this._idPool.push(i)}},"syscall/js.stringVal":P=>{P>>>=0,m(P+24,c(P+8))},"syscall/js.valueGet":P=>{P>>>=0;let i=Reflect.get(X(P+8),c(P+16));P=this._inst.exports.getsp()>>>0,m(P+32,i)},"syscall/js.valueSet":P=>{P>>>=0,Reflect.set(X(P+8),c(P+16),X(P+32))},"syscall/js.valueDelete":P=>{P>>>=0,Reflect.deleteProperty(X(P+8),c(P+16))},"syscall/js.valueIndex":P=>{P>>>=0,m(P+24,Reflect.get(X(P+8),b(P+16)))},"syscall/js.valueSetIndex":P=>{P>>>=0,Reflect.set(X(P+8),b(P+16),X(P+24))},"syscall/js.valueCall":P=>{P>>>=0;try{let i=X(P+8),s=Reflect.get(i,c(P+16)),u=r(P+32),x=Reflect.apply(s,i,u);P=this._inst.exports.getsp()>>>0,m(P+56,x),this.mem.setUint8(P+64,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+56,i),this.mem.setUint8(P+64,0)}},"syscall/js.valueInvoke":P=>{P>>>=0;try{let i=X(P+8),s=r(P+16),u=Reflect.apply(i,void 0,s);P=this._inst.exports.getsp()>>>0,m(P+40,u),this.mem.setUint8(P+48,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+40,i),this.mem.setUint8(P+48,0)}},"syscall/js.valueNew":P=>{P>>>=0;try{let i=X(P+8),s=r(P+16),u=Reflect.construct(i,s);P=this._inst.exports.getsp()>>>0,m(P+40,u),this.mem.setUint8(P+48,1)}catch(i){P=this._inst.exports.getsp()>>>0,m(P+40,i),this.mem.setUint8(P+48,0)}},"syscall/js.valueLength":P=>{P>>>=0,R(P+16,parseInt(X(P+8).length))},"syscall/js.valuePrepareString":P=>{P>>>=0;let i=G.encode(String(X(P+8)));m(P+16,i),R(P+24,i.length)},"syscall/js.valueLoadString":P=>{P>>>=0;let i=X(P+8);j(P+16).set(i)},"syscall/js.valueInstanceOf":P=>{P>>>=0,this.mem.setUint8(P+24,X(P+8)instanceof X(P+16)?1:0)},"syscall/js.copyBytesToGo":P=>{P>>>=0;let i=j(P+8),s=X(P+32);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8(P+48,0);return}let u=s.subarray(0,i.length);i.set(u),R(P+40,u.length),this.mem.setUint8(P+48,1)},"syscall/js.copyBytesToJS":P=>{P>>>=0;let i=X(P+8),s=j(P+16);if(!(i instanceof Uint8Array||i instanceof Uint8ClampedArray)){this.mem.setUint8(P+48,0);return}let u=s.subarray(0,i.length);i.set(u),R(P+40,u.length),this.mem.setUint8(P+48,1)},debug:P=>{console.log(P)}}}}run(R){return w(this,null,function*(){if(!(R instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=R,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,y,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[y,5],[this,6]]),this._idPool=[],this.exited=!1;let b=4096,X=P=>{let i=b,s=G.encode(P+"\0");return new Uint8Array(this.mem.buffer,b,s.length).set(s),b+=s.length,b%8!==0&&(b+=8-b%8),i},m=this.argv.length,j=[];this.argv.forEach(P=>{j.push(X(P))}),j.push(0),Object.keys(this.env).sort().forEach(P=>{j.push(X(`${P}=${this.env[P]}`))}),j.push(0);let c=b;j.forEach(P=>{this.mem.setUint32(b,P,!0),this.mem.setUint32(b+4,0,!0),b+=8});let f=4096+8192;if(b>=f)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(m,c),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(R){let b=this;return function(){let X={id:R,this:this,args:arguments};return b._pendingEvent=X,b._resume(),X.result}}}})(),_=({data:H})=>{let G=new TextDecoder,W=y.fs,R="";W.writeSync=(r,c)=>{if(r===1)p(c);else if(r===2){R+=G.decode(c);let f=R.split(`
`);f.length>1&&console.log(f.slice(0,-1).join(`
`)),R=f[f.length-1]}else throw new Error("Bad write");return c.length};let b=[],X,m=0;_=({data:r})=>{r.length>0&&(b.push(r),X&&X())},W.read=(r,c,f,P,i,s)=>{if(r!==0||f!==0||P!==c.length||i!==null)throw new Error("Bad read");if(b.length===0){X=()=>W.read(r,c,f,P,i,s);return}let u=b[0],x=Math.max(0,Math.min(P,u.length-m));c.set(u.subarray(m,m+x),f),m+=x,m===u.length&&(b.shift(),m=0),s(null,x)};let j=new y.Go;j.argv=["","--service=0.15.12"],H instanceof WebAssembly.Module?WebAssembly.instantiate(H,j.importObject).then(r=>j.run(r)):WebAssembly.instantiate(H,j.importObject).then(({instance:r})=>j.run(r))},H=>_(H)})(p=>d.onmessage({data:p}));d={onmessage:null,postMessage:p=>setTimeout(()=>g({data:p})),terminate(){}}}d.postMessage(h),d.onmessage=({data:g})=>S(g);let{readFromStdout:S,service:l}=T$({writeToStdin(g){d.postMessage(g)},isSync:!1,isWriteUnavailable:!0,esbuild:PB});FA={build:g=>new Promise((p,w)=>l.buildOrServe({callName:"build",refs:null,serveOptions:null,options:g,isTTY:!1,defaultWD:"/",callback:(_,y)=>_?w(_):p(y)})),transform:(g,p)=>new Promise((w,_)=>l.transform({callName:"transform",refs:null,input:g,options:p||{},isTTY:!1,fs:{readFile(y,H){H(new Error("Internal error"),null)},writeFile(y,H){H(null)}},callback:(y,H)=>y?_(y):w(H)})),formatMessages:(g,p)=>new Promise((w,_)=>l.formatMessages({callName:"formatMessages",refs:null,messages:g,options:p,callback:(y,H)=>y?_(y):w(H)})),analyzeMetafile:(g,p)=>new Promise((w,_)=>l.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof g=="string"?g:JSON.stringify(g),options:p,callback:(y,H)=>y?_(y):w(H)}))}}),U$=PB})(typeof t7=="object"?t7:{set exports(A){(typeof self<"u"?self:this).esbuild=A}})});U();TB();TB();U();TB();TB();var y7=function(){var A=function(B,$){return A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(E,a){E.__proto__=a}||function(E,a){for(var Q in a)a.hasOwnProperty(Q)&&(E[Q]=a[Q])},A(B,$)};return function(B,$){A(B,$);function E(){this.constructor=B}B.prototype=$===null?Object.create($):(E.prototype=$.prototype,new E)}}(),qA="html",JA="svg",z$="http://www.w3.org/2000/svg",Bk=function(A,B){if(B===qA)return A instanceof HTMLElement;if(B===JA)return A instanceof SVGElement;throw new Error('Unrecognized element type "'+B+'" for validateElementType.')},C7=function(A,B){var $={},E,a,Q;if(A===qA)Q=document.createElement("div");else if(A===JA)Q=document.createElementNS(z$,"g");else throw new Error('Invalid element type "'+A+'" for createPortalNode: must be "html" or "svg".');if(B&&typeof B=="object")for(var o=0,T=Object.entries(B.attributes);o<T.length;o++){var v=T[o],PB=v[0],z=v[1];Q.setAttribute(PB,z)}var fB={element:Q,elementType:A,setPortalProps:function(cB){$=cB},getInitialPortalProps:function(){return $},mount:function(cB,Y){if(Y!==a){if(fB.unmount(),cB!==E&&!Bk(cB,A))throw new Error('Invalid element type for portal: "'+A+'" portalNodes must be used with '+A+" elements, but OutPortal is within <"+cB.tagName+">.");cB.replaceChild(fB.element,Y),E=cB,a=Y}},unmount:function(cB){cB&&cB!==a||E&&a&&(E.replaceChild(a,fB.element),E=void 0,a=void 0)}};return fB},w7=function(A){y7(B,A);function B($){var E=A.call(this,$)||this;return E.addPropsChannel=function(){Object.assign(E.props.node,{setPortalProps:function(a){E.setState({nodeProps:a})}})},E.state={nodeProps:E.props.node.getInitialPortalProps()},E}return B.prototype.componentDidMount=function(){this.addPropsChannel()},B.prototype.componentDidUpdate=function(){this.addPropsChannel()},B.prototype.render=function(){var $=this,E=this.props,a=E.children,Q=E.node;return v7(g7.map(a,function(o){return H7(o)?X7(o,$.state.nodeProps):o}),Q.element)},B}(NA),hA=function(A){y7(B,A);function B($){var E=A.call(this,$)||this;return E.placeholderNode=S7(),E.passPropsThroughPortal(),E}return B.prototype.passPropsThroughPortal=function(){var $=Object.assign({},this.props,{node:void 0});this.props.node.setPortalProps($)},B.prototype.componentDidMount=function(){var $=this.props.node;this.currentPortalNode=$;var E=this.placeholderNode.current,a=E.parentNode;$.mount(a,E),this.passPropsThroughPortal()},B.prototype.componentDidUpdate=function(){var $=this.props.node;this.currentPortalNode&&$!==this.currentPortalNode&&(this.currentPortalNode.unmount(this.placeholderNode.current),this.currentPortalNode.setPortalProps({}),this.currentPortalNode=$);var E=this.placeholderNode.current,a=E.parentNode;$.mount(a,E),this.passPropsThroughPortal()},B.prototype.componentWillUnmount=function(){var $=this.props.node;$.unmount(this.placeholderNode.current),$.setPortalProps({})},B.prototype.render=function(){return b7("div",{ref:this.placeholderNode})},B}(NA),R7=C7.bind(null,qA),_k=C7.bind(null,JA);U();TB();U();TB();var JB=sB(XB(),1),VA=class extends OB.Component{constructor(B){super(B),this.state={error:void 0,errorInfo:void 0}}componentDidCatch(B,$){this.setState({error:B,errorInfo:$})}render(){return this.state.errorInfo?(0,JB.jsxs)("div",{children:[(0,JB.jsx)("h2",{children:"Something went wrong."}),(0,JB.jsxs)("details",{style:{whiteSpace:"pre-wrap"},children:[this.state.error&&this.state.error.toString(),(0,JB.jsx)("br",{}),this.state.errorInfo.componentStack]})]}):this.props.children}},_7=VA;var wB=sB(OA(),1);U();var KA=sB(M7(),1),Pk=KA.default.default||KA.default,mA=Pk;var O7=sB(L7(),1),oB=sB(XB(),1),lk=A=>window.importShim?window.importShim(A):import(A);Object.assign(globalThis,{apps:{},eCaches:{}});var{apps:bB,eCaches:kA}=globalThis||globalThis.apps,q7=({hash:A,codeSpace:B})=>{let[$,E]=GB(gB(AB().transpiled).slice(0,8));LB(()=>{let T=gB(AB().transpiled).slice(0,8);T!==$&&E(T)},[A]);let a=NB(null),Q=AB().transpiled,o=bB[gB(Q).slice(0,8)];return(0,oB.jsx)(_7,{ref:a,children:(0,oB.jsx)(o,{appId:`${B}-${$}`})},$)},N7=!1;async function KB(A="",B){let{transpiled:$,i:E}=AB(),a=A.length>0?A:$,Q=gB(a).slice(0,8);if(!bB[Q])try{console.log(`i: ${E}: `);let o=(await lk(pk(a))).default;if((0,O7.default)(o))kA[Q]=mA({key:"z",speedy:!1}),kA[Q].compat=void 0,bB[Q]=({appId:T})=>T.includes(Q)?(0,oB.jsx)(wB.CacheProvider,{value:kA[Q],children:(0,oB.jsx)("div",{css:wB.css`height: 100%;`,id:T,children:(0,oB.jsx)(o,{})})}):null;else throw new Error("the default export is not a function!")}catch(o){if(o instanceof SyntaxError){let T=o.name,v=o.message;bB[Q]=()=>(0,oB.jsxs)("div",{css:wB.css`background-color: orange;`,children:[(0,oB.jsx)("h1",{children:"Syntax Error"}),(0,oB.jsxs)("h2",{children:[T,": ",v]}),(0,oB.jsx)("p",{children:JSON.stringify({err:o})})]})}else if(o instanceof Error){let T=o.name,v=o.message;bB[Q]=()=>(0,oB.jsxs)("div",{css:wB.css`background-color: orange;`,children:[(0,oB.jsx)("h1",{children:"Syntax Error"}),(0,oB.jsxs)("h2",{children:[T,": ",v]}),(0,oB.jsx)("p",{children:JSON.stringify({err:o})})]})}else bB[Q]=()=>(0,oB.jsx)("div",{css:wB.css`background-color: orange;`,children:(0,oB.jsxs)("h1",{children:["Unknown Error: $",Q]})})}return!N7&&B&&(N7=!0,await G7({codeSpace:B})),bB[Q]}function pk(A,B="index.mjs"){let $=new File([A],B,{type:"application/javascript",lastModified:Date.now()});return URL.createObjectURL($)}var IA=sB(OA(),1);U();TB();U();U();var P7=sB(W$(),1);U();U();function J7(A,B=$=>$.key){var $=[];return A7(A,"",!0,E=>$.push(E),B),$.join("")}function A7(A,B,$,E,a){if(A){E(`${B}${$?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 "}${a(A)}
`);let Q=B+($?"    ":"\u2502   ");A.left&&A7(A.left,Q,!1,E,a),A.right&&A7(A.right,Q,!0,E,a)}}function gA(A){if(A===null)return!0;var B=TA(A.left),$=TA(A.right);return!!(Math.abs(B-$)<=1&&gA(A.left)&&gA(A.right))}function TA(A){return A?1+Math.max(TA(A.left),TA(A.right)):0}function XA(A,B,$,E,a){let Q=a-E;if(Q>0){let o=E+Math.floor(Q/2),T=B[o],v=$[o],PB={key:T,data:v,parent:A};return PB.left=XA(PB,B,$,E,o),PB.right=XA(PB,B,$,o+1,a),PB}return null}function bA(A){if(A===null)return 0;let B=bA(A.left),$=bA(A.right);return A.balanceFactor=B-$,Math.max(B,$)+1}function SA(A,B,$,E,a){if($>=E)return;let Q=A[$+E>>1],o=$-1,T=E+1;for(;;){do o++;while(a(A[o],Q)<0);do T--;while(a(A[T],Q)>0);if(o>=T)break;let v=A[o];A[o]=A[T],A[T]=v,v=B[o],B[o]=B[T],B[T]=v}SA(A,B,$,T,a),SA(A,B,T+1,E,a)}function jk(A,B){return A>B?1:A<B?-1:0}function HA(A){var B=A.right;return A.right=B.left,B.left&&(B.left.parent=A),B.parent=A.parent,B.parent&&(B.parent.left===A?B.parent.left=B:B.parent.right=B),A.parent=B,B.left=A,A.balanceFactor+=1,B.balanceFactor<0&&(A.balanceFactor-=B.balanceFactor),B.balanceFactor+=1,A.balanceFactor>0&&(B.balanceFactor+=A.balanceFactor),B}function fA(A){var B=A.left;return A.left=B.right,A.left&&(A.left.parent=A),B.parent=A.parent,B.parent&&(B.parent.left===A?B.parent.left=B:B.parent.right=B),A.parent=B,B.right=A,A.balanceFactor-=1,B.balanceFactor>0&&(A.balanceFactor-=B.balanceFactor),B.balanceFactor-=1,A.balanceFactor<0&&(B.balanceFactor+=A.balanceFactor),B}var RB=class{constructor(B,$=!1){this._comparator=B||jk,this._root=null,this._size=0,this._noDuplicates=!!$}destroy(){return this.clear()}clear(){return this._root=null,this._size=0,this}get size(){return this._size}contains(B){if(this._root)for(var $=this._root,E=this._comparator;$;){var a=E(B,$.key);if(a===0)return!0;a<0?$=$.left:$=$.right}return!1}next(B){var $=B;if($)if($.right)for($=$.right;$.left;)$=$.left;else for($=B.parent;$&&$.right===B;)B=$,$=$.parent;return $}prev(B){var $=B;if($)if($.left)for($=$.left;$.right;)$=$.right;else for($=B.parent;$&&$.left===B;)B=$,$=$.parent;return $}forEach(B){for(var $=this._root,E=[],a=!1,Q=0;!a;)$?(E.push($),$=$.left):E.length>0?($=E.pop(),B($,Q++),$=$.right):a=!0;return this}range(B,$,E,a){let Q=[],o=this._comparator,T=this._root,v;for(;Q.length!==0||T;)if(T)Q.push(T),T=T.left;else{if(T=Q.pop(),v=o(T.key,$),v>0)break;if(o(T.key,B)>=0&&E.call(a,T))return this;T=T.right}return this}keys(){for(var B=this._root,$=[],E=[],a=!1;!a;)B?($.push(B),B=B.left):$.length>0?(B=$.pop(),E.push(B.key),B=B.right):a=!0;return E}values(){for(var B=this._root,$=[],E=[],a=!1;!a;)B?($.push(B),B=B.left):$.length>0?(B=$.pop(),E.push(B.data),B=B.right):a=!0;return E}at(B){for(var $=this._root,E=[],a=!1,Q=0;!a;)if($)E.push($),$=$.left;else if(E.length>0){if($=E.pop(),Q===B)return $;Q++,$=$.right}else a=!0;return null}minNode(){var B=this._root;if(!B)return null;for(;B.left;)B=B.left;return B}maxNode(){var B=this._root;if(!B)return null;for(;B.right;)B=B.right;return B}min(){var B=this._root;if(!B)return null;for(;B.left;)B=B.left;return B.key}max(){var B=this._root;if(!B)return null;for(;B.right;)B=B.right;return B.key}isEmpty(){return!this._root}pop(){var B=this._root,$=null;if(B){for(;B.left;)B=B.left;$={key:B.key,data:B.data},this.remove(B.key)}return $}popMax(){var B=this._root,$=null;if(B){for(;B.right;)B=B.right;$={key:B.key,data:B.data},this.remove(B.key)}return $}find(B){for(var $=this._root,E=$,a,Q=this._comparator;E;){if(a=Q(B,E.key),a===0)return E;a<0?E=E.left:E=E.right}return null}insert(B,$){if(!this._root)return this._root={parent:null,left:null,right:null,balanceFactor:0,key:B,data:$},this._size++,this._root;var E=this._comparator,a=this._root,Q=null,o=0;if(this._noDuplicates)for(;a;){if(o=E(B,a.key),Q=a,o===0)return null;o<0?a=a.left:a=a.right}else for(;a;)o=E(B,a.key),Q=a,o<=0?a=a.left:a=a.right;var T={left:null,right:null,balanceFactor:0,parent:Q,key:B,data:$},v;for(o<=0?Q.left=T:Q.right=T;Q&&(o=E(Q.key,B),o<0?Q.balanceFactor-=1:Q.balanceFactor+=1,Q.balanceFactor!==0);){if(Q.balanceFactor<-1){Q.right.balanceFactor===1&&fA(Q.right),v=HA(Q),Q===this._root&&(this._root=v);break}else if(Q.balanceFactor>1){Q.left.balanceFactor===-1&&HA(Q.left),v=fA(Q),Q===this._root&&(this._root=v);break}Q=Q.parent}return this._size++,T}remove(B){if(!this._root)return null;for(var $=this._root,E=this._comparator,a=0;$&&(a=E(B,$.key),a!==0);)a<0?$=$.left:$=$.right;if(!$)return null;var Q=$.key,o,T;if($.left){for(o=$.left;o.left||o.right;){for(;o.right;)o=o.right;$.key=o.key,$.data=o.data,o.left&&($=o,o=o.left)}$.key=o.key,$.data=o.data,$=o}if($.right){for(T=$.right;T.left||T.right;){for(;T.left;)T=T.left;$.key=T.key,$.data=T.data,T.right&&($=T,T=T.right)}$.key=T.key,$.data=T.data,$=T}for(var v=$.parent,PB=$,z;v&&(v.left===PB?v.balanceFactor-=1:v.balanceFactor+=1,v.balanceFactor<-1?(v.right.balanceFactor===1&&fA(v.right),z=HA(v),v===this._root&&(this._root=z),v=z):v.balanceFactor>1&&(v.left.balanceFactor===-1&&HA(v.left),z=fA(v),v===this._root&&(this._root=z),v=z),!(v.balanceFactor===-1||v.balanceFactor===1));)PB=v,v=v.parent;return $.parent&&($.parent.left===$?$.parent.left=null:$.parent.right=null),$===this._root&&(this._root=null),this._size--,Q}load(B=[],$=[],E){if(this._size!==0)throw new Error("bulk-load: tree is not empty");let a=B.length;return E&&SA(B,$,0,a-1,this._comparator),this._root=XA(null,B,$,0,a),bA(this._root),this._size=a,this}isBalanced(){return gA(this._root)}toString(B){return J7(this._root,B)}};RB.default=RB;U();var xA,ck=new Uint8Array(16);function uk(){if(!xA&&(xA=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!xA))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return xA(ck)}var hk=/^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;function mk(A){return typeof A=="string"&&hk.test(A)}var lB=[];for(let A=0;A<256;++A)lB.push((A+256).toString(16).slice(1));function Qk(A){let B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,$=(lB[A[B+0]]+lB[A[B+1]]+lB[A[B+2]]+lB[A[B+3]]+"-"+lB[A[B+4]]+lB[A[B+5]]+"-"+lB[A[B+6]]+lB[A[B+7]]+"-"+lB[A[B+8]]+lB[A[B+9]]+"-"+lB[A[B+10]]+lB[A[B+11]]+lB[A[B+12]]+lB[A[B+13]]+lB[A[B+14]]+lB[A[B+15]]).toLowerCase();if(!mk($))throw new TypeError("Stringified UUID is invalid");return $}function V7(A,B,$){A=A||{};let E=A.random||(A.rng||uk)();if(E[6]=E[6]&15|64,E[8]=E[8]&63|128,B){$=$||0;for(let a=0;a<16;++a)B[$+a]=E[a];return B}return Qk(E)}U();async function vB(A){return new Promise(B=>{setTimeout(()=>{B()},A)})}var dk=new RB((A,B)=>A===B?0:A<B?1:-1,!0),yA=[],jB=(self&&self.crypto&&self.crypto.randomUUID&&self.crypto.randomUUID()||V7()).slice(0,8);dk.insert(jB);var V={},PA,HB,K7="",YB=0,vA=0,Y7=0,e7=0,pB=null,Z7,DB=!1,CA={},mB={localStream:null,webRtcArray:yA,tracks:CA,user:jB,rtcConns:V,send(A){let B=JSON.stringify({...A,name:A.name||jB});yA.map($=>{try{if($.readyState!=="open")return;(!A.target||$.target===A.target&&!eA.includes($.target))&&$.send(B)}catch{}})}};Object.assign(globalThis,{sendChannel:mB});var dP=async A=>{let{mST:B,address:$}=A;HB=A.codeSpace,PA=new BroadcastChannel(location.origin),!(location.pathname.endsWith("dehydrated")&&(PA.onmessage=E=>{E.data.codeSpace===HB&&console.log(E.data)}))&&(m7(HB,{name:jB,state:B},location.origin),await KB(B.transpiled,HB),await B$(),PA=new BroadcastChannel(location.origin),PA.onmessage=async E=>{if(!(E.data.ignoreUser&&E.data.ignoreUser===jB)&&(E.data.codeSpace===HB&&E.data.address&&!$&&pB?.send(JSON.stringify({codeSpace:HB,address:E.data.address})),E.data.ignoreUser&&!eA.includes(E.data.ignoreUser)&&eA.push(E.data.ignoreUser),E.data.codeSpace===HB&&E.data.sess.code!==AB().code)){let a=await LA(E.data.sess);await UA(a)}},WB(()=>{let E=AB(),a=gB(JSON.stringify(E));a!==K7&&(K7=a,PA.postMessage({ignoreUser:jB,sess:E,codeSpace:HB,address:$}))},"broadcast"))},$7=null;async function MA(){return!DB||pB===null?(pB=null,await B$()):pB}var eA=[];function z7(){Tk(),gk()}var gk=(0,P7.default)(bk,100,{trailing:!0,leading:!0,maxWait:500}),Tk=(0,P7.default)(Xk,1200,{trailing:!0,leading:!0,maxWait:2500});async function Xk(){try{if(pB){if(YB===hB())return;let A=AB(),B=await WA(YB,A);if(!B||B.newHash!==hB())return;let $=JSON.stringify({...B,name:jB});Z7($)}else DB=!1,await MA()}catch{}}var gP=async()=>{!mB.localStream||mB.localStream.getTracks().map(A=>A.stop())},TP=async A=>{let B={audio:!0,video:!0},$=await navigator.mediaDevices.getUserMedia(B);A.srcObject=$,$.getTracks().forEach(E=>Object.keys(mB.rtcConns).map(a=>{let Q=mB.rtcConns[a];Q.addTrack(E),Q.ontrack=({track:o,streams:T})=>CA[a]={track:o,streams:T}}))};async function bk(){try{if(Object.keys(V).length>0){if(vA===hB())return;let A=AB(),B=vA?await WA(vA,A):await LA(A);B&&B.patch&&mB.send(B)}}catch{}}async function B$(){if(pB!==null)return pB;if(DB=!0,location.origin.includes("localhost"))return;let A=new WebSocket(`wss://${location.host}/live/`+HB+"/websocket");return DB=!1,A.addEventListener("open",()=>{pB=A,Z7=E=>{try{pB&&pB?.send&&pB?.send(E)}catch{pB=null,DB=!1,MA()}};let $=Object.assign(A,{hashCode:hB()});return pB.addEventListener("message",E=>A$(E,"ws",$)),$7&&clearInterval($7),$7=setInterval(()=>{let a=Date.now()-e7;if(a>4e4)try{if(A.readyState===A.OPEN){A?.send(JSON.stringify({name:jB,timestamp:Y7+a}));return}DB=!1,MA()}catch{DB=!1,MA()}},3e4),A.send(JSON.stringify({name:jB})),A}),A}var k7={};async function A$(A,B,$){if(pB==null)return;e7=Date.now();let E=JSON.parse(A.data);Sk(E,B,$)}async function Sk(A,B,$){if(B==="ws"&&A.timestamp&&(e7=Date.now(),Y7=A.timestamp),(A.hashCode||A.newHash&&$)&&($.hashCode=A.hashCode||A.newHash),B==="ws"&&A.hashCode&&(YB=A.hashCode),B==="ws"&&A.hashCode&&(YB=A.hashCode),(B==="rtc"&&A.hashCode||A.newHash)&&(vA=A.hashCode||A.newHash),eA.includes(A.name)||A.newHash===hB())return;if(A.oldHash&&A.newHash){if(k7[A.oldHash]&&k7[A.oldHash]===A.newHash)return;k7[A.oldHash]=A.newHash}if(A.newHash===hB())return;if((async()=>{try{if(A.type==="new-ice-candidate"){await Hk(A.candidate,A.name);return}if(A.type==="video-offer"){await Q(A.offer,A.name);return}if(A.type==="video-answer"){await a(A.answer,A.name);return}if(A.name&&A.name!==jB&&!V[A.name]&&!eA.includes(A.name)){await E(A.name);let o=A.users;for(;o.length;){await vB(2e3);let T=o.pop();T&&!mB.rtcConns[T]&&await E(T)}return}}catch{}})(),A.patch&&A.name!==jB){if(A.newHash===hB())return;if(await UA(A),A.newHash===hB()){mB&&mB.send({hashCode:A.newHash});return}return}if(A.patch&&A.name===jB){YB=A.newHash;return}if(A.name===jB)return;hB();function E(o){if(V[o])return;V[o]=new RTCPeerConnection($$),V[o].onicecandidate=Y=>{Y.candidate&&pB?.send(JSON.stringify({type:"new-ice-candidate",target:o,name:jB,candidate:Y.candidate.toJSON()}))},V[o].oniceconnectionstatechange=fB,V[o].onicegatheringstatechange=cB,V[o].onsignalingstatechange=()=>{switch(V[o].signalingState){case"closed":break}},V[o].onnegotiationneeded=z,V[o].ontrack=function({track:Y,streams:uB}){CA[o]={track:Y,streams:uB}},V[o].ondatachannel=Y=>{let uB=Y.channel;uB.binaryType="arraybuffer",uB.addEventListener("close",PB),mB&&mB.localStream&&mB.localStream.active&&mB.localStream.getTracks().forEach(MB=>{let zB=V[o];zB.addTrack(MB),zB.ontrack=({track:nA,streams:rA})=>CA[o]={track:nA,streams:rA}}),uB.addEventListener("message",async MB=>A$(MB,"rtc",Object.assign(uB,{hashCode:hB()})));let EA=Object.assign(uB,{target:o});yA.push(EA)};let T={ordered:!0,reliable:!0,maxPacketLifeTime:3e3},v=Object.assign(V[o].createDataChannel(o,T),{target:o});return v.binaryType="arraybuffer",v.addEventListener("error",Y=>{console.log("xxxxxx-  Data Channel Error:",Y)}),v.addEventListener("open",()=>{yA.push(v)}),v.addEventListener("close",()=>{}),V[o];function PB(){V[o].close(),delete V[o]}async function z(){try{let Y=await V[o].createOffer();if(V[o].signalingState!="stable")return;await V[o].setLocalDescription(Y),pB?.send(JSON.stringify({target:o,name:jB,type:"video-offer",offer:V[o].localDescription}))}catch{}}function fB(){switch(V[o].iceConnectionState){case"closed":case"failed":case"disconnected":break}}function cB(){}}async function a(o,T){await V[T].setRemoteDescription(new RTCSessionDescription(o)).catch(console.error)}async function Q(o,T){V[T]||E(T),await V[T].setRemoteDescription(new RTCSessionDescription(o));let v=await V[T].createAnswer();await V[T].setLocalDescription(v),pB?.send(JSON.stringify({target:T,name:jB,type:"video-answer",answer:v}))}}var $$={iceServers:["stun3.l.google.com:19302"].map(A=>({urls:`stun:${A}`}))};$$.iceServers=[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}];async function Hk(A,B){let $=new RTCIceCandidate(A);await V[B].addIceCandidate($)}async function XP(){try{if(navigator.serviceWorker.onmessage=async A=>{let B=A.source;if(B!=null)switch(A.data.method){case"ipfs-message-port":let $=new MessageChannel;B.postMessage({method:"ipfs-message-port",id:A.data.id,port:$.port2},{transfer:[$.port2]})}},document.documentElement.dataset.viewer){await(async B=>{switch((B&&B.split("/")||[])[0]||""){case"ipfs":case"ipns":document.body.innerHTML=`<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${B}"></iframe>`}})(location.pathname);return}}catch{}}U();var wA=sB(k$(),1);var P$="./chunk-esbuild-6NIHVSNG.wasm";var ZB={init:!1,initialize:()=>{if(ZB.init!==!1)return ZB.init;let A=new URL(P$,location.origin).toString();return ZB.init=(0,wA.initialize)({wasmURL:A}).then(()=>ZB.init=!0),ZB.init}},e$=async(A,B)=>{let $=ZB.initialize();return $!==!0&&await $,(0,wA.transform)(A,B)};U();TB();TB();var RA=sB(XB(),1),$B={md5Hash:"",wait:1,res:null,codeSpace:"",waitForDiv:async()=>{let A=$B.md5Hash;return $B.res?.innerHTML||await t$(),$B.res?.innerHTML.includes(A)||await t$(),$B.res?.innerHTML.includes(A)||(console.log(`waiting ${$B.wait} for ${$B.md5Hash} `),await vB($B.wait)),$B.res?.innerHTML.includes(A)?$B.res.innerHTML:($B.wait=$B.wait*2,await $B.waitForDiv())},setHash:null,setApp:A=>{let B=document.createElement("div");B.style.visibility="hidden",B.style.position="absolute",document.body.appendChild(B);let $=uA(B);return $.render((0,RA.jsx)(vk,{md5Hash:A})),()=>{$.unmount,document.body.removeChild(B),B.remove(),delete bB[A],$B.setHash=null}}},E$=async(A,B)=>{$B.codeSpace=B;let $=gB(A).slice(0,8);bB[$]||await KB(A),$B.wait=1;let E=$B.setApp($);try{let a=await $B.waitForDiv();if(!a)return{html:null,css:null};let Q=xk(kA[$]),o=document.querySelector("style[data-emotion=z-global]")?.innerHTML;return{html:a,css:o+" "+Q}}finally{E()}};function xk(A){let B=Object.keys(A.inserted).map($=>`.${A.key}-${$}`);return Array.from(document.styleSheets).map($=>$.cssRules[0]).filter($=>$&&B.includes($.selectorText)).map($=>$.cssText).join(`
`)}var vk=({md5Hash:A})=>{let B=NB(null),[$,E]=GB(A);LB(()=>{B?.current&&($B.res=B.current),$B.md5Hash=$,$B.setHash=Q=>E(Q)},[B,$,E]);let a=bB[$];return(0,RA.jsx)("div",{ref:B,children:(0,RA.jsx)(a,{appId:`${$B.codeSpace}-${$}`},$)})},t$=()=>{let A;console.log("wait for animation");let B=new Promise($=>A=$);return requestAnimationFrame(()=>A(!0)),B};var DA={code:"",olderCode:""};async function E7({code:A,counter:B,codeSpace:$}){DA.code=A;let E=AB();if(console.log(`${E.i} => ${B}`),!(B<E.i)){setTimeout(()=>{DA.code===A&&A!==DA.olderCode&&E7({code:A,counter:B,codeSpace:$}),DA.olderCode=A},1e3);try{let a=await e$(A,{loader:"tsx",format:"esm",treeShaking:!0,minify:!0,keepNames:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",module:"ESNext",jsxFragmentFactory:"Fragment",jsxImportSource:"@emotion/react"}},target:"es2018"}),Q=gB(A).slice(0,8),o=`${a.code}//${Q}`,{html:T,css:v}=await E$(o,$);if(console.log({html:T,css:v}),!T)return;Q7({...AB(),code:A,i:B,transpiled:o,html:T,css:v}),z7()}catch(a){console.error({error:a})}finally{}}}TB();var i$=sB(OA(),1);U();function n$(){let A=/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.userAgent.indexOf("SAMSUNG")===-1,B=!1;return function($){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test($)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test($.slice(0,4)))&&(B=!0)}(navigator.userAgent||navigator.vendor||window.opera),B&&!A}U();var a$=async A=>Mk().prettierJs(A),n7=null,r$={prettierJs:async A=>{let B=performance.now();n7=n7||(await import("./chunk-prettierEsm-TP7AMCUV.mjs")).prettierJs;let $=performance.now();console.log(`importing took ${$-B} milliseconds.`);let E=n7(A),a=performance.now();return console.log(`prettier took ${a-$} milliseconds.`),E}},tA=null;function Mk(){if(tA)return tA;if(!yk())return tA=r$;try{let A=new SharedWorker(new URL("prettierWorker.mjs",location.origin),{type:"module"});return tA=d7(A.port)}catch{return tA=r$}}function yk(){let A=!1,B={get type(){return A=!0,"module"}};try{new Worker("blob://",B)}finally{return A}}var l$=sB(XB(),1),kB={CH(){},getValue:async()=>"",setValue:async A=>{A.length<10&&console.log(A)},getErrors:async()=>[],code:"",counter:0,codeSpace:"",lastKeyDown:0,codeToSet:""},s$=({codeSpace:A})=>{let B=NB(null),{i:$,code:E}=AB(),[a,Q]=OB.useState({lastKeyDown:0,myCode:E,counter:$,started:!1,onChange(z){},engine:n$()?"ace":"monaco"});kB.counter=AB().i,kB.codeSpace=A;let{myCode:o,started:T,engine:v,onChange:PB}=a;return kB.code=o,OB.useEffect(()=>{!B?.current||T||(v==="monaco"?Ck():wk()).then(z=>Object.assign(kB,z)).then(()=>Q(z=>({...z,started:!0})))},[T,B]),OB.useEffect(()=>{kB.getErrors().then(console.log),PB(()=>kB.getValue().then(()=>Q(z=>({...z,counter:kB.counter,myCode:kB.code}))))},[PB,o,Q]),WB(()=>{kB.counter>=AB().i||(kB.counter=AB().i,kB.code=AB().code,kB.setValue(kB.code),Q(z=>({...z,counter:kB.counter,myCode:kB.code})))},"editor"),(0,l$.jsx)("div",{onKeyDown:()=>kB.lastKeyDown=Date.now(),id:"editor",css:i$.css`          
      max-width: 640px;
      height: 100%; 
      `,ref:B})};async function o$(A){let B=await a$(A);if(B===kB.code)return;let $=++kB.counter;kB.code=B,E7({code:B,counter:$,codeSpace:kB.codeSpace})}async function Ck(){let A=document.createElement("link");A.setAttribute("rel","stylesheet"),A.href=location.origin+"/Editor.css",document.head.append(A);let{startMonaco:B}=await import("./chunk-startMonaco-TZZX7EX2.mjs"),$=window.document.getElementById("editor");return B({container:$,name:kB.codeSpace,code:AB().code,onChange:o$})}async function wk(){let{startAce:A}=await import("./chunk-startAce-FV3SITGG.mjs");return await vB(100),await A(AB().code,o$)}var nB=sB(XB(),1),Rk=f7(()=>vB(1e3).then(()=>import("./chunk-DraggableWindow-DGNWWV5X.mjs"))),Dk=({children:A})=>(0,nB.jsx)("div",{css:IA.css`
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
`,children:A}),Ik=({codeSpace:A})=>{let B=hB(),[$,E]=GB(B),a=location.pathname.endsWith("public")||location.pathname.endsWith("hydrated");LB(()=>{WB(async()=>{let o=hB();if($!==o)try{await KB(),E(o)}catch(T){console.error({e:T})}},"myApp")},[$,E]);let Q=x7(()=>R7({attributes:{id:`root-${A}`,style:"height: 100%"}}),[]);return(0,nB.jsxs)(nB.Fragment,{children:[(0,nB.jsx)(w7,{node:Q,children:(0,nB.jsx)(q7,{hash:$,codeSpace:A})}),a?(0,nB.jsx)(hA,{node:Q}):(0,nB.jsx)(T7,{fallback:(0,nB.jsx)(hA,{node:Q}),children:(0,nB.jsx)(Dk,{children:(0,nB.jsxs)(nB.Fragment,{children:[(0,nB.jsx)(s$,{codeSpace:A}),(0,nB.jsx)(Rk,{room:A,children:(0,nB.jsx)(hA,{node:Q})})]})})})]})},p$={started:!1},G7=({codeSpace:A})=>{if(p$.started)return;p$.started=!0;let B=document.querySelector("#root"),$=uA(B),E=mA({key:"root"});$.render((0,nB.jsx)(IA.CacheProvider,{value:E,cj:!0,children:(0,nB.jsx)(Ik,{codeSpace:A})}))};export{XB as a,G7 as b,mB as c,dP as d,z7 as e,gP as f,TP as g,B$ as h,XP as i,E$ as j,s$ as k};
