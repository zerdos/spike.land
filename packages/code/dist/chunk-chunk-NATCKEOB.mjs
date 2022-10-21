import{c as mA,e as dA,k as hB}from"./chunk-chunk-DVGZF2JU.mjs";var WB=mA((XA,TB)=>{hB();(z=>{"use strict";var nB=Object.defineProperty,aB=Object.getOwnPropertyDescriptor,LB=Object.getOwnPropertyNames,NB=Object.prototype.hasOwnProperty,GB=(B,$)=>{for(var k in $)nB(B,k,{get:$[k],enumerable:!0})},OB=(B,$,k,o)=>{if($&&typeof $=="object"||typeof $=="function")for(let j of LB($))!NB.call(B,j)&&j!==k&&nB(B,j,{get:()=>$[j],enumerable:!(o=aB($,j))||o.enumerable});return B},qB=B=>OB(nB({},"__esModule",{value:!0}),B),Y=(B,$,k)=>new Promise((o,j)=>{var h=r=>{try{p(k.next(r))}catch(H){j(H)}},n=r=>{try{p(k.throw(r))}catch(H){j(H)}},p=r=>r.done?o(r.value):Promise.resolve(r.value).then(h,n);p((k=k.apply(B,$)).next())}),iB={};GB(iB,{analyzeMetafile:()=>oA,analyzeMetafileSync:()=>uA,build:()=>rA,buildSync:()=>lA,default:()=>QA,formatMessages:()=>sA,formatMessagesSync:()=>pA,initialize:()=>cA,serve:()=>aA,transform:()=>iA,transformSync:()=>jA,version:()=>nA}),z.exports=qB(iB);function XB(B){let $=o=>{if(o===null)k.write8(0);else if(typeof o=="boolean")k.write8(1),k.write8(+o);else if(typeof o=="number")k.write8(2),k.write32(o|0);else if(typeof o=="string")k.write8(3),k.write(V(o));else if(o instanceof Uint8Array)k.write8(4),k.write(o);else if(o instanceof Array){k.write8(5),k.write32(o.length);for(let j of o)$(j)}else{let j=Object.keys(o);k.write8(6),k.write32(j.length);for(let h of j)k.write(V(h)),$(o[h])}},k=new HB;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),$(B.value),mB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function JB(B){let $=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return $B(k.read());case 4:return k.read();case 5:{let n=k.read32(),p=[];for(let r=0;r<n;r++)p.push($());return p}case 6:{let n=k.read32(),p={};for(let r=0;r<n;r++)p[$B(k.read())]=$();return p}default:throw new Error("Invalid packet")}},k=new HB(B),o=k.read32(),j=(o&1)===0;o>>>=1;let h=$();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:o,isRequest:j,value:h}}var HB=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let $=new Uint8Array((this.len+B)*2);$.set(this.buf),this.buf=$}return this.len+=B,this.len-B}write8(B){let $=this._write(1);this.buf[$]=B}write32(B){let $=this._write(4);mB(this.buf,B,$)}write(B){let $=this._write(4+B.length);mB(this.buf,B.length,$),this.buf.set(B,$+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return SB(this.buf,this._read(4))}read(){let B=this.read32(),$=new Uint8Array(B),k=this._read($.length);return $.set(this.buf.subarray(k,k+B)),$}},V,$B;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,$=new TextDecoder;V=k=>B.encode(k),$B=k=>$.decode(k)}else if(typeof Buffer<"u")V=B=>{let $=Buffer.from(B);return $ instanceof Uint8Array||($=new Uint8Array($)),$},$B=B=>{let{buffer:$,byteOffset:k,byteLength:o}=B;return Buffer.from($,k,o).toString()};else throw new Error("No UTF-8 codec found");function SB(B,$){return B[$++]|B[$++]<<8|B[$++]<<16|B[$++]<<24}function mB(B,$,k){B[k++]=$,B[k++]=$>>8,B[k++]=$>>16,B[k++]=$>>24}var bB="warning",fB="silent";function xB(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var sB=()=>null,F=B=>typeof B=="boolean"?null:"a boolean",VB=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",X=B=>typeof B=="string"?null:"a string",oB=B=>B instanceof RegExp?null:"a RegExp object",kB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",dB=B=>typeof B=="function"?null:"a function",U=B=>Array.isArray(B)?null:"an array",K=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",KB=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",YB=B=>typeof B=="object"&&B!==null?null:"an array or an object",vB=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",MB=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",ZB=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",zB=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",yB=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,$,k,o){let j=B[k];if($[k+""]=!0,j===void 0)return;let h=o(j);if(h!==null)throw new Error(`"${k}" must be ${h}`);return j}function N(B,$,k){for(let o in B)if(!(o in $))throw new Error(`Invalid option ${k}: "${o}"`)}function BA(B){let $=Object.create(null),k=P(B,$,"wasmURL",X),o=P(B,$,"wasmModule",KB),j=P(B,$,"worker",F);return N(B,$,"in initialize() call"),{wasmURL:k,wasmModule:o,worker:j}}function CB(B){let $;if(B!==void 0){$=Object.create(null);for(let k of Object.keys(B)){let o=B[k];if(typeof o=="string"||o===!1)$[k]=o;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return $}function lB(B,$,k,o,j){let h=P($,k,"color",F),n=P($,k,"logLevel",X),p=P($,k,"logLimit",kB);h!==void 0?B.push(`--color=${h}`):o&&B.push("--color=true"),B.push(`--log-level=${n||j}`),B.push(`--log-limit=${p||0}`)}function wB(B,$,k){let o=P($,k,"legalComments",X),j=P($,k,"sourceRoot",X),h=P($,k,"sourcesContent",F),n=P($,k,"target",zB),p=P($,k,"format",X),r=P($,k,"globalName",X),H=P($,k,"mangleProps",oB),x=P($,k,"reserveProps",oB),T=P($,k,"mangleQuoted",F),Q=P($,k,"minify",F),w=P($,k,"minifySyntax",F),M=P($,k,"minifyWhitespace",F),S=P($,k,"minifyIdentifiers",F),c=P($,k,"drop",U),u=P($,k,"charset",X),l=P($,k,"treeShaking",F),a=P($,k,"ignoreAnnotations",F),e=P($,k,"jsx",X),i=P($,k,"jsxFactory",X),m=P($,k,"jsxFragment",X),A=P($,k,"jsxImportSource",X),E=P($,k,"jsxDev",F),t=P($,k,"jsxSideEffects",F),s=P($,k,"define",K),d=P($,k,"logOverride",K),v=P($,k,"supported",K),f=P($,k,"pure",U),R=P($,k,"keepNames",F),y=P($,k,"platform",X);if(o&&B.push(`--legal-comments=${o}`),j!==void 0&&B.push(`--source-root=${j}`),h!==void 0&&B.push(`--sources-content=${h}`),n&&(Array.isArray(n)?B.push(`--target=${Array.from(n).map(xB).join(",")}`):B.push(`--target=${xB(n)}`)),p&&B.push(`--format=${p}`),r&&B.push(`--global-name=${r}`),y&&B.push(`--platform=${y}`),Q&&B.push("--minify"),w&&B.push("--minify-syntax"),M&&B.push("--minify-whitespace"),S&&B.push("--minify-identifiers"),u&&B.push(`--charset=${u}`),l!==void 0&&B.push(`--tree-shaking=${l}`),a&&B.push("--ignore-annotations"),c)for(let b of c)B.push(`--drop:${b}`);if(H&&B.push(`--mangle-props=${H.source}`),x&&B.push(`--reserve-props=${x.source}`),T!==void 0&&B.push(`--mangle-quoted=${T}`),e&&B.push(`--jsx=${e}`),i&&B.push(`--jsx-factory=${i}`),m&&B.push(`--jsx-fragment=${m}`),A&&B.push(`--jsx-import-source=${A}`),E&&B.push("--jsx-dev"),t&&B.push("--jsx-side-effects"),s)for(let b in s){if(b.indexOf("=")>=0)throw new Error(`Invalid define: ${b}`);B.push(`--define:${b}=${s[b]}`)}if(d)for(let b in d){if(b.indexOf("=")>=0)throw new Error(`Invalid log override: ${b}`);B.push(`--log-override:${b}=${d[b]}`)}if(v)for(let b in v){if(b.indexOf("=")>=0)throw new Error(`Invalid supported: ${b}`);B.push(`--supported:${b}=${v[b]}`)}if(f)for(let b of f)B.push(`--pure:${b}`);R&&B.push("--keep-names")}function AA(B,$,k,o,j){var h;let n=[],p=[],r=Object.create(null),H=null,x=null,T=null;lB(n,$,r,k,o),wB(n,$,r);let Q=P($,r,"sourcemap",MB),w=P($,r,"bundle",F),M=P($,r,"watch",VB),S=P($,r,"splitting",F),c=P($,r,"preserveSymlinks",F),u=P($,r,"metafile",F),l=P($,r,"outfile",X),a=P($,r,"outdir",X),e=P($,r,"outbase",X),i=P($,r,"tsconfig",X),m=P($,r,"resolveExtensions",U),A=P($,r,"nodePaths",U),E=P($,r,"mainFields",U),t=P($,r,"conditions",U),s=P($,r,"external",U),d=P($,r,"loader",K),v=P($,r,"outExtension",K),f=P($,r,"publicPath",X),R=P($,r,"entryNames",X),y=P($,r,"chunkNames",X),b=P($,r,"assetNames",X),D=P($,r,"inject",U),L=P($,r,"banner",K),G=P($,r,"footer",K),W=P($,r,"entryPoints",YB),I=P($,r,"absWorkingDir",X),C=P($,r,"stdin",K),O=(h=P($,r,"write",F))!=null?h:j,q=P($,r,"allowOverwrite",F),AB=P($,r,"incremental",F)===!0,rB=P($,r,"mangleCache",K);if(r.plugins=!0,N($,r,`in ${B}() call`),Q&&n.push(`--sourcemap${Q===!0?"":`=${Q}`}`),w&&n.push("--bundle"),q&&n.push("--allow-overwrite"),M)if(n.push("--watch"),typeof M=="boolean")T={};else{let g=Object.create(null),_=P(M,g,"onRebuild",dB);N(M,g,`on "watch" in ${B}() call`),T={onRebuild:_}}if(S&&n.push("--splitting"),c&&n.push("--preserve-symlinks"),u&&n.push("--metafile"),l&&n.push(`--outfile=${l}`),a&&n.push(`--outdir=${a}`),e&&n.push(`--outbase=${e}`),i&&n.push(`--tsconfig=${i}`),m){let g=[];for(let _ of m){if(_+="",_.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${_}`);g.push(_)}n.push(`--resolve-extensions=${g.join(",")}`)}if(f&&n.push(`--public-path=${f}`),R&&n.push(`--entry-names=${R}`),y&&n.push(`--chunk-names=${y}`),b&&n.push(`--asset-names=${b}`),E){let g=[];for(let _ of E){if(_+="",_.indexOf(",")>=0)throw new Error(`Invalid main field: ${_}`);g.push(_)}n.push(`--main-fields=${g.join(",")}`)}if(t){let g=[];for(let _ of t){if(_+="",_.indexOf(",")>=0)throw new Error(`Invalid condition: ${_}`);g.push(_)}n.push(`--conditions=${g.join(",")}`)}if(s)for(let g of s)n.push(`--external:${g}`);if(L)for(let g in L){if(g.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${g}`);n.push(`--banner:${g}=${L[g]}`)}if(G)for(let g in G){if(g.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${g}`);n.push(`--footer:${g}=${G[g]}`)}if(D)for(let g of D)n.push(`--inject:${g}`);if(d)for(let g in d){if(g.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${g}`);n.push(`--loader:${g}=${d[g]}`)}if(v)for(let g in v){if(g.indexOf("=")>=0)throw new Error(`Invalid out extension: ${g}`);n.push(`--out-extension:${g}=${v[g]}`)}if(W)if(Array.isArray(W))for(let g of W)p.push(["",g+""]);else for(let[g,_]of Object.entries(W))p.push([g+"",_+""]);if(C){let g=Object.create(null),_=P(C,g,"contents",yB),cB=P(C,g,"resolveDir",X),_B=P(C,g,"sourcefile",X),FB=P(C,g,"loader",X);N(C,g,'in "stdin" object'),_B&&n.push(`--sourcefile=${_B}`),FB&&n.push(`--loader=${FB}`),cB&&(x=cB+""),typeof _=="string"?H=V(_):_ instanceof Uint8Array&&(H=_)}let J=[];if(A)for(let g of A)g+="",J.push(g);return{entries:p,flags:n,write:O,stdinContents:H,stdinResolveDir:x,absWorkingDir:I,incremental:AB,nodePaths:J,watch:T,mangleCache:CB(rB)}}function $A(B,$,k,o){let j=[],h=Object.create(null);lB(j,$,h,k,o),wB(j,$,h);let n=P($,h,"sourcemap",MB),p=P($,h,"tsconfigRaw",ZB),r=P($,h,"sourcefile",X),H=P($,h,"loader",X),x=P($,h,"banner",X),T=P($,h,"footer",X),Q=P($,h,"mangleCache",K);return N($,h,`in ${B}() call`),n&&j.push(`--sourcemap=${n===!0?"external":n}`),p&&j.push(`--tsconfig-raw=${typeof p=="string"?p:JSON.stringify(p)}`),r&&j.push(`--sourcefile=${r}`),H&&j.push(`--loader=${H}`),x&&j.push(`--banner=${x}`),T&&j.push(`--footer=${T}`),{flags:j,mangleCache:CB(Q)}}function kA(B){let $={},k={didClose:!1,reason:""},o={},j=0,h=0,n=new Uint8Array(16*1024),p=0,r=a=>{let e=p+a.length;if(e>n.length){let m=new Uint8Array(e*2);m.set(n),n=m}n.set(a,p),p+=a.length;let i=0;for(;i+4<=p;){let m=SB(n,i);if(i+4+m>p)break;i+=4,M(n.subarray(i,i+m)),i+=m}i>0&&(n.copyWithin(0,i,p),p-=i)},H=a=>{k.didClose=!0,a&&(k.reason=": "+(a.message||a));let e="The service was stopped"+k.reason;for(let i in o)o[i](e,null);o={}},x=(a,e,i)=>{if(k.didClose)return i("The service is no longer running"+k.reason,null);let m=j++;o[m]=(A,E)=>{try{i(A,E)}finally{a&&a.unref()}},a&&a.ref(),B.writeToStdin(XB({id:m,isRequest:!0,value:e}))},T=(a,e)=>{if(k.didClose)throw new Error("The service is no longer running"+k.reason);B.writeToStdin(XB({id:a,isRequest:!1,value:e}))},Q=(a,e)=>Y(this,null,function*(){try{if(e.command==="ping"){T(a,{});return}if(typeof e.key=="number"){let i=$[e.key];if(i){let m=i[e.command];if(m){yield m(a,e);return}}}throw new Error("Invalid command: "+e.command)}catch(i){T(a,{errors:[PB(i,B,null,void 0,"")]})}}),w=!0,M=a=>{if(w){w=!1;let i=String.fromCharCode(...a);if(i!=="0.15.11")throw new Error(`Cannot start service: Host version "0.15.11" does not match binary version ${JSON.stringify(i)}`);return}let e=JB(a);if(e.isRequest)Q(e.id,e.value);else{let i=o[e.id];delete o[e.id],e.value.error?i(e.value.error,{}):i(null,e.value)}};return{readFromStdout:r,afterClose:H,service:{buildOrServe:({callName:a,refs:e,serveOptions:i,options:m,isTTY:A,defaultWD:E,callback:t})=>{let s=0,d=h++,v={},f={ref(){++s===1&&e&&e.ref()},unref(){--s===0&&(delete $[d],e&&e.unref())}};$[d]=v,f.ref(),PA(a,d,x,T,f,B,v,m,i,A,E,k,(R,y)=>{try{t(R,y)}finally{f.unref()}})},transform:({callName:a,refs:e,input:i,options:m,isTTY:A,fs:E,callback:t})=>{let s=RB(),d=v=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:f,mangleCache:R}=$A(a,m,A,fB),y={command:"transform",flags:f,inputFS:v!==null,input:v!==null?V(v):typeof i=="string"?V(i):i};R&&(y.mangleCache=R),x(e,y,(b,D)=>{if(b)return t(new Error(b),null);let L=Z(D.errors,s),G=Z(D.warnings,s),W=1,I=()=>{if(--W===0){let C={warnings:G,code:D.code,map:D.map};D.mangleCache&&(C.mangleCache=D?.mangleCache),t(null,C)}};if(L.length>0)return t(eB("Transform failed",L,G),null);D.codeFS&&(W++,E.readFile(D.code,(C,O)=>{C!==null?t(C,null):(D.code=O,I())})),D.mapFS&&(W++,E.readFile(D.map,(C,O)=>{C!==null?t(C,null):(D.map=O,I())})),I()})}catch(f){let R=[];try{lB(R,m,{},A,fB)}catch{}let y=PB(f,B,s,void 0,"");x(e,{command:"error",flags:R,error:y},()=>{y.detail=s.load(y.detail),t(eB("Transform failed",[y],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let v=d;d=()=>E.writeFile(i,v)}d(null)},formatMessages:({callName:a,refs:e,messages:i,options:m,callback:A})=>{let E=BB(i,"messages",null,"");if(!m)throw new Error(`Missing second argument in ${a}() call`);let t={},s=P(m,t,"kind",X),d=P(m,t,"color",F),v=P(m,t,"terminalWidth",kB);if(N(m,t,`in ${a}() call`),s===void 0)throw new Error(`Missing "kind" in ${a}() call`);if(s!=="error"&&s!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${a}() call`);let f={command:"format-msgs",messages:E,isWarning:s==="warning"};d!==void 0&&(f.color=d),v!==void 0&&(f.terminalWidth=v),x(e,f,(R,y)=>{if(R)return A(new Error(R),null);A(null,y.messages)})},analyzeMetafile:({callName:a,refs:e,metafile:i,options:m,callback:A})=>{m===void 0&&(m={});let E={},t=P(m,E,"color",F),s=P(m,E,"verbose",F);N(m,E,`in ${a}() call`);let d={command:"analyze-metafile",metafile:i};t!==void 0&&(d.color=t),s!==void 0&&(d.verbose=s),x(e,d,(v,f)=>{if(v)return A(new Error(v),null);A(null,f.result)})}}}}function PA(B,$,k,o,j,h,n,p,r,H,x,T,Q){let w=RB(),M=(l,a,e,i)=>{let m=[];try{lB(m,p,{},H,bB)}catch{}let A=PB(l,h,w,e,a);k(j,{command:"error",flags:m,error:A},()=>{A.detail=w.load(A.detail),i(A)})},S=(l,a)=>{M(l,a,void 0,e=>{Q(eB("Build failed",[e],[]),null)})},c;if(typeof p=="object"){let l=p.plugins;if(l!==void 0){if(!Array.isArray(l))throw new Error('"plugins" must be an array');c=l}}if(c&&c.length>0){if(h.isSync){S(new Error("Cannot use plugins in synchronous API calls"),"");return}EA($,k,o,j,h,n,p,c,w).then(l=>{if(!l.ok){S(l.error,l.pluginName);return}try{u(l.requestPlugins,l.runOnEndCallbacks)}catch(a){S(a,"")}},l=>S(l,""));return}try{u(null,(l,a,e)=>e())}catch(l){S(l,"")}function u(l,a){let e=!h.isWriteUnavailable,{entries:i,flags:m,write:A,stdinContents:E,stdinResolveDir:t,absWorkingDir:s,incremental:d,nodePaths:v,watch:f,mangleCache:R}=AA(B,p,H,bB,e),y={command:"build",key:$,entries:i,flags:m,write:A,stdinContents:E,stdinResolveDir:t,absWorkingDir:s||x,incremental:d,nodePaths:v};l&&(y.plugins=l),R&&(y.mangleCache=R);let b=r&&eA($,k,o,j,n,r,y),D,L,G=(I,C)=>{I.outputFiles&&(C.outputFiles=I.outputFiles.map(tA)),I.metafile&&(C.metafile=JSON.parse(I.metafile)),I.mangleCache&&(C.mangleCache=I.mangleCache),I.writeToStdout!==void 0&&console.log($B(I.writeToStdout).replace(/\n$/,""))},W=(I,C)=>{let O={errors:Z(I.errors,w),warnings:Z(I.warnings,w)};G(I,O),a(O,M,()=>{if(O.errors.length>0)return C(eB("Build failed",O.errors,O.warnings),null);if(I.rebuild){if(!D){let q=!1;D=()=>new Promise((AB,rB)=>{if(q||T.didClose)throw new Error("Cannot rebuild");k(j,{command:"rebuild",key:$},(J,g)=>{if(J)return C(eB("Build failed",[{id:"",pluginName:"",text:J,location:null,notes:[],detail:void 0}],[]),null);W(g,(_,cB)=>{_?rB(_):AB(cB)})})}),j.ref(),D.dispose=()=>{q||(q=!0,k(j,{command:"rebuild-dispose",key:$},()=>{}),j.unref())}}O.rebuild=D}if(I.watch){if(!L){let q=!1;j.ref(),L=()=>{q||(q=!0,delete n["watch-rebuild"],k(j,{command:"watch-stop",key:$},()=>{}),j.unref())},f&&(n["watch-rebuild"]=(AB,rB)=>{try{let J=rB.args,g={errors:Z(J.errors,w),warnings:Z(J.warnings,w)};G(J,g),a(g,M,()=>{if(g.errors.length>0){f.onRebuild&&f.onRebuild(eB("Build failed",g.errors,g.warnings),null);return}g.stop=L,f.onRebuild&&f.onRebuild(null,g)})}catch(J){console.error(J)}o(AB,{})})}O.stop=L}C(null,O)})};if(A&&h.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(d&&h.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(f&&h.isSync)throw new Error('Cannot use "watch" with a synchronous build');k(j,y,(I,C)=>{if(I)return Q(new Error(I),null);if(b){let O=C,q=!1;j.ref();let AB={port:O.port,host:O.host,wait:b.wait,stop(){q||(q=!0,b.stop(),j.unref())}};return j.ref(),b.wait.then(j.unref,j.unref),Q(null,AB)}return W(C,Q)})}}var eA=(B,$,k,o,j,h,n)=>{let p={},r=P(h,p,"port",kB),H=P(h,p,"host",X),x=P(h,p,"servedir",X),T=P(h,p,"onRequest",dB),Q=new Promise((w,M)=>{j["serve-wait"]=(S,c)=>{c.error!==null?M(new Error(c.error)):w(),k(S,{})}});return n.serve={},N(h,p,"in serve() call"),r!==void 0&&(n.serve.port=r),H!==void 0&&(n.serve.host=H),x!==void 0&&(n.serve.servedir=x),j["serve-request"]=(w,M)=>{T&&T(M.args),k(w,{})},{wait:Q,stop(){$(o,{command:"serve-stop",key:B},()=>{})}}},EA=(B,$,k,o,j,h,n,p,r)=>Y(void 0,null,function*(){let H=[],x=[],T={},Q={},w=0,M=0,S=[],c=!1;p=[...p];for(let l of p){let a={};if(typeof l!="object")throw new Error(`Plugin at index ${M} must be an object`);let e=P(l,a,"name",X);if(typeof e!="string"||e==="")throw new Error(`Plugin at index ${M} is missing a name`);try{let i=P(l,a,"setup",dB);if(typeof i!="function")throw new Error("Plugin is missing a setup function");N(l,a,`on plugin ${JSON.stringify(e)}`);let m={name:e,onResolve:[],onLoad:[]};M++;let E=i({initialOptions:n,resolve:(t,s={})=>{if(!c)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof t!="string")throw new Error("The path to resolve must be a string");let d=Object.create(null),v=P(s,d,"pluginName",X),f=P(s,d,"importer",X),R=P(s,d,"namespace",X),y=P(s,d,"resolveDir",X),b=P(s,d,"kind",X),D=P(s,d,"pluginData",sB);return N(s,d,"in resolve() call"),new Promise((L,G)=>{let W={command:"resolve",path:t,key:B,pluginName:e};v!=null&&(W.pluginName=v),f!=null&&(W.importer=f),R!=null&&(W.namespace=R),y!=null&&(W.resolveDir=y),b!=null&&(W.kind=b),D!=null&&(W.pluginData=r.store(D)),$(o,W,(I,C)=>{I!==null?G(new Error(I)):L({errors:Z(C.errors,r),warnings:Z(C.warnings,r),path:C.path,external:C.external,sideEffects:C.sideEffects,namespace:C.namespace,suffix:C.suffix,pluginData:r.load(C.pluginData)})})})},onStart(t){let s='This error came from the "onStart" callback registered here:',d=jB(new Error(s),j,"onStart");H.push({name:e,callback:t,note:d})},onEnd(t){let s='This error came from the "onEnd" callback registered here:',d=jB(new Error(s),j,"onEnd");x.push({name:e,callback:t,note:d})},onResolve(t,s){let d='This error came from the "onResolve" callback registered here:',v=jB(new Error(d),j,"onResolve"),f={},R=P(t,f,"filter",oB),y=P(t,f,"namespace",X);if(N(t,f,`in onResolve() call for plugin ${JSON.stringify(e)}`),R==null)throw new Error("onResolve() call is missing a filter");let b=w++;T[b]={name:e,callback:s,note:v},m.onResolve.push({id:b,filter:R.source,namespace:y||""})},onLoad(t,s){let d='This error came from the "onLoad" callback registered here:',v=jB(new Error(d),j,"onLoad"),f={},R=P(t,f,"filter",oB),y=P(t,f,"namespace",X);if(N(t,f,`in onLoad() call for plugin ${JSON.stringify(e)}`),R==null)throw new Error("onLoad() call is missing a filter");let b=w++;Q[b]={name:e,callback:s,note:v},m.onLoad.push({id:b,filter:R.source,namespace:y||""})},esbuild:j.esbuild});E&&(yield E),S.push(m)}catch(i){return{ok:!1,error:i,pluginName:e}}}h["on-start"]=(l,a)=>Y(void 0,null,function*(){let e={errors:[],warnings:[]};yield Promise.all(H.map(i=>Y(void 0,[i],function*({name:m,callback:A,note:E}){try{let t=yield A();if(t!=null){if(typeof t!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(m)} to return an object`);let s={},d=P(t,s,"errors",U),v=P(t,s,"warnings",U);N(t,s,`from onStart() callback in plugin ${JSON.stringify(m)}`),d!=null&&e.errors.push(...BB(d,"errors",r,m)),v!=null&&e.warnings.push(...BB(v,"warnings",r,m))}}catch(t){e.errors.push(PB(t,j,r,E&&E(),m))}}))),k(l,e)}),h["on-resolve"]=(l,a)=>Y(void 0,null,function*(){let e={},i="",m,A;for(let E of a.ids)try{({name:i,callback:m,note:A}=T[E]);let t=yield m({path:a.path,importer:a.importer,namespace:a.namespace,resolveDir:a.resolveDir,kind:a.kind,pluginData:r.load(a.pluginData)});if(t!=null){if(typeof t!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(i)} to return an object`);let s={},d=P(t,s,"pluginName",X),v=P(t,s,"path",X),f=P(t,s,"namespace",X),R=P(t,s,"suffix",X),y=P(t,s,"external",F),b=P(t,s,"sideEffects",F),D=P(t,s,"pluginData",sB),L=P(t,s,"errors",U),G=P(t,s,"warnings",U),W=P(t,s,"watchFiles",U),I=P(t,s,"watchDirs",U);N(t,s,`from onResolve() callback in plugin ${JSON.stringify(i)}`),e.id=E,d!=null&&(e.pluginName=d),v!=null&&(e.path=v),f!=null&&(e.namespace=f),R!=null&&(e.suffix=R),y!=null&&(e.external=y),b!=null&&(e.sideEffects=b),D!=null&&(e.pluginData=r.store(D)),L!=null&&(e.errors=BB(L,"errors",r,i)),G!=null&&(e.warnings=BB(G,"warnings",r,i)),W!=null&&(e.watchFiles=pB(W,"watchFiles")),I!=null&&(e.watchDirs=pB(I,"watchDirs"));break}}catch(t){e={id:E,errors:[PB(t,j,r,A&&A(),i)]};break}k(l,e)}),h["on-load"]=(l,a)=>Y(void 0,null,function*(){let e={},i="",m,A;for(let E of a.ids)try{({name:i,callback:m,note:A}=Q[E]);let t=yield m({path:a.path,namespace:a.namespace,suffix:a.suffix,pluginData:r.load(a.pluginData)});if(t!=null){if(typeof t!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(i)} to return an object`);let s={},d=P(t,s,"pluginName",X),v=P(t,s,"contents",yB),f=P(t,s,"resolveDir",X),R=P(t,s,"pluginData",sB),y=P(t,s,"loader",X),b=P(t,s,"errors",U),D=P(t,s,"warnings",U),L=P(t,s,"watchFiles",U),G=P(t,s,"watchDirs",U);N(t,s,`from onLoad() callback in plugin ${JSON.stringify(i)}`),e.id=E,d!=null&&(e.pluginName=d),v instanceof Uint8Array?e.contents=v:v!=null&&(e.contents=V(v)),f!=null&&(e.resolveDir=f),R!=null&&(e.pluginData=r.store(R)),y!=null&&(e.loader=y),b!=null&&(e.errors=BB(b,"errors",r,i)),D!=null&&(e.warnings=BB(D,"warnings",r,i)),L!=null&&(e.watchFiles=pB(L,"watchFiles")),G!=null&&(e.watchDirs=pB(G,"watchDirs"));break}}catch(t){e={id:E,errors:[PB(t,j,r,A&&A(),i)]};break}k(l,e)});let u=(l,a,e)=>e();return x.length>0&&(u=(l,a,e)=>{(()=>Y(void 0,null,function*(){for(let{name:i,callback:m,note:A}of x)try{yield m(l)}catch(E){l.errors.push(yield new Promise(t=>a(E,i,A&&A(),t)))}}))().then(e)}),c=!0,{ok:!0,requestPlugins:S,runOnEndCallbacks:u}});function RB(){let B=new Map,$=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let o=$++;return B.set(o,k),o}}}function jB(B,$,k){let o,j=!1;return()=>{if(j)return o;j=!0;try{let h=(B.stack+"").split(`
`);h.splice(1,1);let n=DB($,h,k);if(n)return o={text:B.message,location:n},o}catch{}}}function PB(B,$,k,o,j){let h="Internal error",n=null;try{h=(B&&B.message||B)+""}catch{}try{n=DB($,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:j,text:h,location:n,notes:o?[o]:[],detail:k?k.store(B):-1}}function DB(B,$,k){let o="    at ";if(B.readFileSync&&!$[0].startsWith(o)&&$[1].startsWith(o))for(let j=1;j<$.length;j++){let h=$[j];if(!!h.startsWith(o))for(h=h.slice(o.length);;){let n=/^(?:new |async )?\S+ \((.*)\)$/.exec(h);if(n){h=n[1];continue}if(n=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(h),n){h=n[1];continue}if(n=/^(\S+):(\d+):(\d+)$/.exec(h),n){let p;try{p=B.readFileSync(n[1],"utf8")}catch{break}let r=p.split(/\r\n|\r|\n|\u2028|\u2029/)[+n[2]-1]||"",H=+n[3]-1,x=r.slice(H,H+k.length)===k?k.length:0;return{file:n[1],namespace:"file",line:+n[2],column:V(r.slice(0,H)).length,length:V(r.slice(H,H+x)).length,lineText:r+`
`+$.slice(1).join(`
`),suggestion:""}}break}}return null}function eB(B,$,k){let o=5,j=$.length<1?"":` with ${$.length} error${$.length<2?"":"s"}:`+$.slice(0,o+1).map((n,p)=>{if(p===o)return`
...`;if(!n.location)return`
error: ${n.text}`;let{file:r,line:H,column:x}=n.location,T=n.pluginName?`[plugin: ${n.pluginName}] `:"";return`
${r}:${H}:${x}: ERROR: ${T}${n.text}`}).join(""),h=new Error(`${B}${j}`);return h.errors=$,h.warnings=k,h}function Z(B,$){for(let k of B)k.detail=$.load(k.detail);return B}function IB(B,$){if(B==null)return null;let k={},o=P(B,k,"file",X),j=P(B,k,"namespace",X),h=P(B,k,"line",kB),n=P(B,k,"column",kB),p=P(B,k,"length",kB),r=P(B,k,"lineText",X),H=P(B,k,"suggestion",X);return N(B,k,$),{file:o||"",namespace:j||"",line:h||0,column:n||0,length:p||0,lineText:r||"",suggestion:H||""}}function BB(B,$,k,o){let j=[],h=0;for(let n of B){let p={},r=P(n,p,"id",X),H=P(n,p,"pluginName",X),x=P(n,p,"text",X),T=P(n,p,"location",vB),Q=P(n,p,"notes",U),w=P(n,p,"detail",sB),M=`in element ${h} of "${$}"`;N(n,p,M);let S=[];if(Q)for(let c of Q){let u={},l=P(c,u,"text",X),a=P(c,u,"location",vB);N(c,u,M),S.push({text:l||"",location:IB(a,M)})}j.push({id:r||"",pluginName:H||o,text:x||"",location:IB(T,M),notes:S,detail:k?k.store(w):-1}),h++}return j}function pB(B,$){let k=[];for(let o of B){if(typeof o!="string")throw new Error(`${JSON.stringify($)} must be an array of strings`);k.push(o)}return k}function tA({path:B,contents:$}){let k=null;return{path:B,contents:$,get text(){let o=this.contents;return(k===null||o!==$)&&($=o,k=$B(o)),k}}}var nA="0.15.11",rA=B=>uB().build(B),aA=()=>{throw new Error('The "serve" API only works in node')},iA=(B,$)=>uB().transform(B,$),sA=(B,$)=>uB().formatMessages(B,$),oA=(B,$)=>uB().analyzeMetafile(B,$),lA=()=>{throw new Error('The "buildSync" API only works in node')},jA=()=>{throw new Error('The "transformSync" API only works in node')},pA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},uA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},EB,gB,uB=()=>{if(gB)return gB;throw EB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},cA=B=>{B=BA(B||{});let $=B.wasmURL,k=B.wasmModule,o=B.worker!==!1;if(!$&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(EB)throw new Error('Cannot call "initialize" more than once');return EB=hA($||"",k,o),EB.catch(()=>{EB=void 0}),EB},hA=(B,$,k)=>Y(void 0,null,function*(){let o;if($)o=$;else{let p=yield fetch(B);if(!p.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);o=yield p.arrayBuffer()}let j;if(k){let p=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.15.11"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});j=new Worker(URL.createObjectURL(p))}else{let p=(r=>{var H=(Q,w,M)=>new Promise((S,c)=>{var u=e=>{try{a(M.next(e))}catch(i){c(i)}},l=e=>{try{a(M.throw(e))}catch(i){c(i)}},a=e=>e.done?S(e.value):Promise.resolve(e.value).then(u,l);a((M=M.apply(Q,w)).next())});let x,T={};for(let Q=self;Q;Q=Object.getPrototypeOf(Q))for(let w of Object.getOwnPropertyNames(Q))w in T||Object.defineProperty(T,w,{get:()=>self[w]});return(()=>{let Q=()=>{let S=new Error("not implemented");return S.code="ENOSYS",S};if(!T.fs){let S="";T.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(c,u){S+=M.decode(u);let l=S.lastIndexOf(`
`);return l!=-1&&(console.log(S.substr(0,l)),S=S.substr(l+1)),u.length},write(c,u,l,a,e,i){if(l!==0||a!==u.length||e!==null){i(Q());return}let m=this.writeSync(c,u);i(null,m)},chmod(c,u,l){l(Q())},chown(c,u,l,a){a(Q())},close(c,u){u(Q())},fchmod(c,u,l){l(Q())},fchown(c,u,l,a){a(Q())},fstat(c,u){u(Q())},fsync(c,u){u(null)},ftruncate(c,u,l){l(Q())},lchown(c,u,l,a){a(Q())},link(c,u,l){l(Q())},lstat(c,u){u(Q())},mkdir(c,u,l){l(Q())},open(c,u,l,a){a(Q())},read(c,u,l,a,e,i){i(Q())},readdir(c,u){u(Q())},readlink(c,u){u(Q())},rename(c,u,l){l(Q())},rmdir(c,u){u(Q())},stat(c,u){u(Q())},symlink(c,u,l){l(Q())},truncate(c,u,l){l(Q())},unlink(c,u){u(Q())},utimes(c,u,l,a){a(Q())}}}if(T.process||(T.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw Q()},pid:-1,ppid:-1,umask(){throw Q()},cwd(){throw Q()},chdir(){throw Q()}}),!T.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!T.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!T.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!T.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let w=new TextEncoder("utf-8"),M=new TextDecoder("utf-8");T.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=A=>{A!==0&&console.warn("exit code:",A)},this._exitPromise=new Promise(A=>{this._resolveExitPromise=A}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let S=(A,E)=>{this.mem.setUint32(A+0,E,!0),this.mem.setUint32(A+4,Math.floor(E/4294967296),!0)},c=A=>{let E=this.mem.getUint32(A+0,!0),t=this.mem.getInt32(A+4,!0);return E+t*4294967296},u=A=>{let E=this.mem.getFloat64(A,!0);if(E===0)return;if(!isNaN(E))return E;let t=this.mem.getUint32(A,!0);return this._values[t]},l=(A,E)=>{if(typeof E=="number"&&E!==0){if(isNaN(E)){this.mem.setUint32(A+4,2146959360,!0),this.mem.setUint32(A,0,!0);return}this.mem.setFloat64(A,E,!0);return}if(E===void 0){this.mem.setFloat64(A,0,!0);return}let s=this._ids.get(E);s===void 0&&(s=this._idPool.pop(),s===void 0&&(s=this._values.length),this._values[s]=E,this._goRefCounts[s]=0,this._ids.set(E,s)),this._goRefCounts[s]++;let d=0;switch(typeof E){case"object":E!==null&&(d=1);break;case"string":d=2;break;case"symbol":d=3;break;case"function":d=4;break}this.mem.setUint32(A+4,2146959360|d,!0),this.mem.setUint32(A,s,!0)},a=A=>{let E=c(A+0),t=c(A+8);return new Uint8Array(this._inst.exports.mem.buffer,E,t)},e=A=>{let E=c(A+0),t=c(A+8),s=new Array(t);for(let d=0;d<t;d++)s[d]=u(E+d*8);return s},i=A=>{let E=c(A+0),t=c(A+8);return M.decode(new DataView(this._inst.exports.mem.buffer,E,t))},m=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":A=>{A>>>=0;let E=this.mem.getInt32(A+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(E)},"runtime.wasmWrite":A=>{A>>>=0;let E=c(A+8),t=c(A+16),s=this.mem.getInt32(A+24,!0);T.fs.writeSync(E,new Uint8Array(this._inst.exports.mem.buffer,t,s))},"runtime.resetMemoryDataView":A=>{A>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":A=>{A>>>=0,S(A+8,(m+performance.now())*1e6)},"runtime.walltime":A=>{A>>>=0;let E=new Date().getTime();S(A+8,E/1e3),this.mem.setInt32(A+16,E%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":A=>{A>>>=0;let E=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(E,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(E);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},c(A+8)+1)),this.mem.setInt32(A+16,E,!0)},"runtime.clearTimeoutEvent":A=>{A>>>=0;let E=this.mem.getInt32(A+8,!0);clearTimeout(this._scheduledTimeouts.get(E)),this._scheduledTimeouts.delete(E)},"runtime.getRandomData":A=>{A>>>=0,crypto.getRandomValues(a(A+8))},"syscall/js.finalizeRef":A=>{A>>>=0;let E=this.mem.getUint32(A+8,!0);if(this._goRefCounts[E]--,this._goRefCounts[E]===0){let t=this._values[E];this._values[E]=null,this._ids.delete(t),this._idPool.push(E)}},"syscall/js.stringVal":A=>{A>>>=0,l(A+24,i(A+8))},"syscall/js.valueGet":A=>{A>>>=0;let E=Reflect.get(u(A+8),i(A+16));A=this._inst.exports.getsp()>>>0,l(A+32,E)},"syscall/js.valueSet":A=>{A>>>=0,Reflect.set(u(A+8),i(A+16),u(A+32))},"syscall/js.valueDelete":A=>{A>>>=0,Reflect.deleteProperty(u(A+8),i(A+16))},"syscall/js.valueIndex":A=>{A>>>=0,l(A+24,Reflect.get(u(A+8),c(A+16)))},"syscall/js.valueSetIndex":A=>{A>>>=0,Reflect.set(u(A+8),c(A+16),u(A+24))},"syscall/js.valueCall":A=>{A>>>=0;try{let E=u(A+8),t=Reflect.get(E,i(A+16)),s=e(A+32),d=Reflect.apply(t,E,s);A=this._inst.exports.getsp()>>>0,l(A+56,d),this.mem.setUint8(A+64,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+56,E),this.mem.setUint8(A+64,0)}},"syscall/js.valueInvoke":A=>{A>>>=0;try{let E=u(A+8),t=e(A+16),s=Reflect.apply(E,void 0,t);A=this._inst.exports.getsp()>>>0,l(A+40,s),this.mem.setUint8(A+48,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+40,E),this.mem.setUint8(A+48,0)}},"syscall/js.valueNew":A=>{A>>>=0;try{let E=u(A+8),t=e(A+16),s=Reflect.construct(E,t);A=this._inst.exports.getsp()>>>0,l(A+40,s),this.mem.setUint8(A+48,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+40,E),this.mem.setUint8(A+48,0)}},"syscall/js.valueLength":A=>{A>>>=0,S(A+16,parseInt(u(A+8).length))},"syscall/js.valuePrepareString":A=>{A>>>=0;let E=w.encode(String(u(A+8)));l(A+16,E),S(A+24,E.length)},"syscall/js.valueLoadString":A=>{A>>>=0;let E=u(A+8);a(A+16).set(E)},"syscall/js.valueInstanceOf":A=>{A>>>=0,this.mem.setUint8(A+24,u(A+8)instanceof u(A+16)?1:0)},"syscall/js.copyBytesToGo":A=>{A>>>=0;let E=a(A+8),t=u(A+32);if(!(t instanceof Uint8Array||t instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let s=t.subarray(0,E.length);E.set(s),S(A+40,s.length),this.mem.setUint8(A+48,1)},"syscall/js.copyBytesToJS":A=>{A>>>=0;let E=u(A+8),t=a(A+16);if(!(E instanceof Uint8Array||E instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let s=t.subarray(0,E.length);E.set(s),S(A+40,s.length),this.mem.setUint8(A+48,1)},debug:A=>{console.log(A)}}}}run(S){return H(this,null,function*(){if(!(S instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=S,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,T,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[T,5],[this,6]]),this._idPool=[],this.exited=!1;let c=4096,u=A=>{let E=c,t=w.encode(A+"\0");return new Uint8Array(this.mem.buffer,c,t.length).set(t),c+=t.length,c%8!==0&&(c+=8-c%8),E},l=this.argv.length,a=[];this.argv.forEach(A=>{a.push(u(A))}),a.push(0),Object.keys(this.env).sort().forEach(A=>{a.push(u(`${A}=${this.env[A]}`))}),a.push(0);let i=c;a.forEach(A=>{this.mem.setUint32(c,A,!0),this.mem.setUint32(c+4,0,!0),c+=8});let m=4096+8192;if(c>=m)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(l,i),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(S){let c=this;return function(){let u={id:S,this:this,args:arguments};return c._pendingEvent=u,c._resume(),u.result}}}})(),x=({data:Q})=>{let w=new TextDecoder,M=T.fs,S="";M.writeSync=(e,i)=>{if(e===1)r(i);else if(e===2){S+=w.decode(i);let m=S.split(`
`);m.length>1&&console.log(m.slice(0,-1).join(`
`)),S=m[m.length-1]}else throw new Error("Bad write");return i.length};let c=[],u,l=0;x=({data:e})=>{e.length>0&&(c.push(e),u&&u())},M.read=(e,i,m,A,E,t)=>{if(e!==0||m!==0||A!==i.length||E!==null)throw new Error("Bad read");if(c.length===0){u=()=>M.read(e,i,m,A,E,t);return}let s=c[0],d=Math.max(0,Math.min(A,s.length-l));i.set(s.subarray(l,l+d),m),l+=d,l===s.length&&(c.shift(),l=0),t(null,d)};let a=new T.Go;a.argv=["","--service=0.15.11"],Q instanceof WebAssembly.Module?WebAssembly.instantiate(Q,a.importObject).then(e=>a.run(e)):WebAssembly.instantiate(Q,a.importObject).then(({instance:e})=>a.run(e))},Q=>x(Q)})(r=>j.onmessage({data:r}));j={onmessage:null,postMessage:r=>setTimeout(()=>p({data:r})),terminate(){}}}j.postMessage(o),j.onmessage=({data:p})=>h(p);let{readFromStdout:h,service:n}=kA({writeToStdin(p){j.postMessage(p)},isSync:!1,isWriteUnavailable:!0,esbuild:iB});gB={build:p=>new Promise((r,H)=>n.buildOrServe({callName:"build",refs:null,serveOptions:null,options:p,isTTY:!1,defaultWD:"/",callback:(x,T)=>x?H(x):r(T)})),transform:(p,r)=>new Promise((H,x)=>n.transform({callName:"transform",refs:null,input:p,options:r||{},isTTY:!1,fs:{readFile(T,Q){Q(new Error("Internal error"),null)},writeFile(T,Q){Q(null)}},callback:(T,Q)=>T?x(T):H(Q)})),formatMessages:(p,r)=>new Promise((H,x)=>n.formatMessages({callName:"formatMessages",refs:null,messages:p,options:r,callback:(T,Q)=>T?x(T):H(Q)})),analyzeMetafile:(p,r)=>new Promise((H,x)=>n.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof p=="string"?p:JSON.stringify(p),options:r,callback:(T,Q)=>T?x(T):H(Q)}))}}),QA=iB})(typeof TB=="object"?TB:{set exports(z){(typeof self<"u"?self:this).esbuild=z}})});hB();var QB=dA(WB(),1);var UB="./chunk-esbuild-AGEQ2DRT.wasm";var tB={init:!1,initialize:()=>{if(tB.init!==!1)return tB.init;let z=new URL(UB,location.origin).toString();return tB.init=(0,QB.initialize)({wasmURL:z}).then(()=>tB.init=!0),tB.init}},vA=async(z,nB)=>{let aB=tB.initialize();return aB!==!0&&await aB,(0,QB.transform)(z,nB)};export{vA as a};
