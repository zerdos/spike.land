import{b as ZB}from"./chunk-chunk-42BWLY4V.mjs";import{d as MB,j as yB}from"./chunk-chunk-4ZLJ3PZE.mjs";import"./chunk-chunk-ZW54XXDA.mjs";import"./chunk-chunk-KW5NRTZC.mjs";import"./chunk-chunk-DO4KKNNU.mjs";import"./chunk-chunk-AWGDGW7T.mjs";import"./chunk-chunk-DMUSMKFA.mjs";import"./chunk-chunk-DXSWH7CM.mjs";import{b as fA,d as xA,j as rB}from"./chunk-chunk-UURPA34U.mjs";var BA=fA((UA,RB)=>{rB();(Y=>{"use strict";var S=Object.defineProperty,C=Object.getOwnPropertyDescriptor,L=Object.getOwnPropertyNames,AB=Object.prototype.hasOwnProperty,z=(B,$)=>{for(var k in $)S(B,k,{get:$[k],enumerable:!0})},$B=(B,$,k,o)=>{if($&&typeof $=="object"||typeof $=="function")for(let j of L($))!AB.call(B,j)&&j!==k&&S(B,j,{get:()=>$[j],enumerable:!(o=C($,j))||o.enumerable});return B},uB=B=>$B(S({},"__esModule",{value:!0}),B),Z=(B,$,k)=>new Promise((o,j)=>{var h=r=>{try{p(k.next(r))}catch(H){j(H)}},n=r=>{try{p(k.throw(r))}catch(H){j(H)}},p=r=>r.done?o(r.value):Promise.resolve(r.value).then(h,n);p((k=k.apply(B,$)).next())}),BB={};z(BB,{analyzeMetafile:()=>mA,analyzeMetafileSync:()=>XA,build:()=>uA,buildSync:()=>dA,default:()=>bA,formatMessages:()=>QA,formatMessagesSync:()=>TA,initialize:()=>SA,serve:()=>cA,transform:()=>hA,transformSync:()=>gA,version:()=>pA}),Y.exports=uB(BB);function q(B){let $=o=>{if(o===null)k.write8(0);else if(typeof o=="boolean")k.write8(1),k.write8(+o);else if(typeof o=="number")k.write8(2),k.write32(o|0);else if(typeof o=="string")k.write8(3),k.write(eB(o));else if(o instanceof Uint8Array)k.write8(4),k.write(o);else if(o instanceof Array){k.write8(5),k.write32(o.length);for(let j of o)$(j)}else{let j=Object.keys(o);k.write8(6),k.write32(j.length);for(let h of j)k.write(eB(h)),$(o[h])}},k=new IB;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),$(B.value),fB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}function tB(B){let $=()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return sB(k.read());case 4:return k.read();case 5:{let n=k.read32(),p=[];for(let r=0;r<n;r++)p.push($());return p}case 6:{let n=k.read32(),p={};for(let r=0;r<n;r++)p[sB(k.read())]=$();return p}default:throw new Error("Invalid packet")}},k=new IB(B),o=k.read32(),j=(o&1)===0;o>>>=1;let h=$();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:o,isRequest:j,value:h}}var IB=class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let $=new Uint8Array((this.len+B)*2);$.set(this.buf),this.buf=$}return this.len+=B,this.len-B}write8(B){let $=this._write(1);this.buf[$]=B}write32(B){let $=this._write(4);fB(this.buf,B,$)}write(B){let $=this._write(4+B.length);fB(this.buf,B.length,$),this.buf.set(B,$+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return _B(this.buf,this._read(4))}read(){let B=this.read32(),$=new Uint8Array(B),k=this._read($.length);return $.set(this.buf.subarray(k,k+B)),$}},eB,sB;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let B=new TextEncoder,$=new TextDecoder;eB=k=>B.encode(k),sB=k=>$.decode(k)}else if(typeof Buffer!="undefined")eB=B=>{let $=Buffer.from(B);return $ instanceof Uint8Array||($=new Uint8Array($)),$},sB=B=>{let{buffer:$,byteOffset:k,byteLength:o}=B;return Buffer.from($,k,o).toString()};else throw new Error("No UTF-8 codec found");function _B(B,$){return B[$++]|B[$++]<<8|B[$++]<<16|B[$++]<<24}function fB(B,$,k){B[k++]=$,B[k++]=$>>8,B[k++]=$>>16,B[k++]=$>>24}var FB="warning",WB="silent";function UB(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}var QB=()=>null,U=B=>typeof B=="boolean"?null:"a boolean",kA=B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object",X=B=>typeof B=="string"?null:"a string",mB=B=>B instanceof RegExp?null:"a RegExp object",oB=B=>typeof B=="number"&&B===(B|0)?null:"an integer",xB=B=>typeof B=="function"?null:"a function",G=B=>Array.isArray(B)?null:"an array",EB=B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object",PA=B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module",eA=B=>typeof B=="object"&&B!==null?null:"an array or an object",LB=B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null",NB=B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean",EA=B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object",tA=B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array",GB=B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array";function P(B,$,k,o){let j=B[k];if($[k+""]=!0,j===void 0)return;let h=o(j);if(h!==null)throw new Error(`"${k}" must be ${h}`);return j}function J(B,$,k){for(let o in B)if(!(o in $))throw new Error(`Invalid option ${k}: "${o}"`)}function nA(B){let $=Object.create(null),k=P(B,$,"wasmURL",X),o=P(B,$,"wasmModule",PA),j=P(B,$,"worker",U);return J(B,$,"in initialize() call"),{wasmURL:k,wasmModule:o,worker:j}}function OB(B){let $;if(B!==void 0){$=Object.create(null);for(let k of Object.keys(B)){let o=B[k];if(typeof o=="string"||o===!1)$[k]=o;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return $}function dB(B,$,k,o,j){let h=P($,k,"color",U),n=P($,k,"logLevel",X),p=P($,k,"logLimit",oB);h!==void 0?B.push(`--color=${h}`):o&&B.push("--color=true"),B.push(`--log-level=${n||j}`),B.push(`--log-limit=${p||0}`)}function qB(B,$,k){let o=P($,k,"legalComments",X),j=P($,k,"sourceRoot",X),h=P($,k,"sourcesContent",U),n=P($,k,"target",tA),p=P($,k,"format",X),r=P($,k,"globalName",X),H=P($,k,"mangleProps",mB),v=P($,k,"reserveProps",mB),T=P($,k,"mangleQuoted",U),Q=P($,k,"minify",U),D=P($,k,"minifySyntax",U),y=P($,k,"minifyWhitespace",U),b=P($,k,"minifyIdentifiers",U),c=P($,k,"drop",G),u=P($,k,"charset",X),l=P($,k,"treeShaking",U),a=P($,k,"ignoreAnnotations",U),e=P($,k,"jsx",X),i=P($,k,"jsxFactory",X),m=P($,k,"jsxFragment",X),A=P($,k,"jsxImportSource",X),E=P($,k,"jsxDev",U),t=P($,k,"jsxSideEffects",U),s=P($,k,"define",EB),d=P($,k,"logOverride",EB),M=P($,k,"supported",EB),x=P($,k,"pure",G),I=P($,k,"keepNames",U),w=P($,k,"platform",X);if(o&&B.push(`--legal-comments=${o}`),j!==void 0&&B.push(`--source-root=${j}`),h!==void 0&&B.push(`--sources-content=${h}`),n&&(Array.isArray(n)?B.push(`--target=${Array.from(n).map(UB).join(",")}`):B.push(`--target=${UB(n)}`)),p&&B.push(`--format=${p}`),r&&B.push(`--global-name=${r}`),w&&B.push(`--platform=${w}`),Q&&B.push("--minify"),D&&B.push("--minify-syntax"),y&&B.push("--minify-whitespace"),b&&B.push("--minify-identifiers"),u&&B.push(`--charset=${u}`),l!==void 0&&B.push(`--tree-shaking=${l}`),a&&B.push("--ignore-annotations"),c)for(let f of c)B.push(`--drop:${f}`);if(H&&B.push(`--mangle-props=${H.source}`),v&&B.push(`--reserve-props=${v.source}`),T!==void 0&&B.push(`--mangle-quoted=${T}`),e&&B.push(`--jsx=${e}`),i&&B.push(`--jsx-factory=${i}`),m&&B.push(`--jsx-fragment=${m}`),A&&B.push(`--jsx-import-source=${A}`),E&&B.push("--jsx-dev"),t&&B.push("--jsx-side-effects"),s)for(let f in s){if(f.indexOf("=")>=0)throw new Error(`Invalid define: ${f}`);B.push(`--define:${f}=${s[f]}`)}if(d)for(let f in d){if(f.indexOf("=")>=0)throw new Error(`Invalid log override: ${f}`);B.push(`--log-override:${f}=${d[f]}`)}if(M)for(let f in M){if(f.indexOf("=")>=0)throw new Error(`Invalid supported: ${f}`);B.push(`--supported:${f}=${M[f]}`)}if(x)for(let f of x)B.push(`--pure:${f}`);I&&B.push("--keep-names")}function rA(B,$,k,o,j){var h;let n=[],p=[],r=Object.create(null),H=null,v=null,T=null;dB(n,$,r,k,o),qB(n,$,r);let Q=P($,r,"sourcemap",NB),D=P($,r,"bundle",U),y=P($,r,"watch",kA),b=P($,r,"splitting",U),c=P($,r,"preserveSymlinks",U),u=P($,r,"metafile",U),l=P($,r,"outfile",X),a=P($,r,"outdir",X),e=P($,r,"outbase",X),i=P($,r,"tsconfig",X),m=P($,r,"resolveExtensions",G),A=P($,r,"nodePaths",G),E=P($,r,"mainFields",G),t=P($,r,"conditions",G),s=P($,r,"external",G),d=P($,r,"loader",EB),M=P($,r,"outExtension",EB),x=P($,r,"publicPath",X),I=P($,r,"entryNames",X),w=P($,r,"chunkNames",X),f=P($,r,"assetNames",X),_=P($,r,"inject",G),O=P($,r,"banner",EB),V=P($,r,"footer",EB),N=P($,r,"entryPoints",eA),F=P($,r,"absWorkingDir",X),R=P($,r,"stdin",EB),K=(h=P($,r,"write",U))!=null?h:j,kB=P($,r,"allowOverwrite",U),iB=P($,r,"incremental",U)===!0,cB=P($,r,"mangleCache",EB);if(r.plugins=!0,J($,r,`in ${B}() call`),Q&&n.push(`--sourcemap${Q===!0?"":`=${Q}`}`),D&&n.push("--bundle"),kB&&n.push("--allow-overwrite"),y)if(n.push("--watch"),typeof y=="boolean")T={};else{let g=Object.create(null),W=P(y,g,"onRebuild",xB);J(y,g,`on "watch" in ${B}() call`),T={onRebuild:W}}if(b&&n.push("--splitting"),c&&n.push("--preserve-symlinks"),u&&n.push("--metafile"),l&&n.push(`--outfile=${l}`),a&&n.push(`--outdir=${a}`),e&&n.push(`--outbase=${e}`),i&&n.push(`--tsconfig=${i}`),m){let g=[];for(let W of m){if(W+="",W.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${W}`);g.push(W)}n.push(`--resolve-extensions=${g.join(",")}`)}if(x&&n.push(`--public-path=${x}`),I&&n.push(`--entry-names=${I}`),w&&n.push(`--chunk-names=${w}`),f&&n.push(`--asset-names=${f}`),E){let g=[];for(let W of E){if(W+="",W.indexOf(",")>=0)throw new Error(`Invalid main field: ${W}`);g.push(W)}n.push(`--main-fields=${g.join(",")}`)}if(t){let g=[];for(let W of t){if(W+="",W.indexOf(",")>=0)throw new Error(`Invalid condition: ${W}`);g.push(W)}n.push(`--conditions=${g.join(",")}`)}if(s)for(let g of s)n.push(`--external:${g}`);if(O)for(let g in O){if(g.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${g}`);n.push(`--banner:${g}=${O[g]}`)}if(V)for(let g in V){if(g.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${g}`);n.push(`--footer:${g}=${V[g]}`)}if(_)for(let g of _)n.push(`--inject:${g}`);if(d)for(let g in d){if(g.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${g}`);n.push(`--loader:${g}=${d[g]}`)}if(M)for(let g in M){if(g.indexOf("=")>=0)throw new Error(`Invalid out extension: ${g}`);n.push(`--out-extension:${g}=${M[g]}`)}if(N)if(Array.isArray(N))for(let g of N)p.push(["",g+""]);else for(let[g,W]of Object.entries(N))p.push([g+"",W+""]);if(R){let g=Object.create(null),W=P(R,g,"contents",GB),SB=P(R,g,"resolveDir",X),YB=P(R,g,"sourcefile",X),zB=P(R,g,"loader",X);J(R,g,'in "stdin" object'),YB&&n.push(`--sourcefile=${YB}`),zB&&n.push(`--loader=${zB}`),SB&&(v=SB+""),typeof W=="string"?H=eB(W):W instanceof Uint8Array&&(H=W)}let PB=[];if(A)for(let g of A)g+="",PB.push(g);return{entries:p,flags:n,write:K,stdinContents:H,stdinResolveDir:v,absWorkingDir:F,incremental:iB,nodePaths:PB,watch:T,mangleCache:OB(cB)}}function aA(B,$,k,o){let j=[],h=Object.create(null);dB(j,$,h,k,o),qB(j,$,h);let n=P($,h,"sourcemap",NB),p=P($,h,"tsconfigRaw",EA),r=P($,h,"sourcefile",X),H=P($,h,"loader",X),v=P($,h,"banner",X),T=P($,h,"footer",X),Q=P($,h,"mangleCache",EB);return J($,h,`in ${B}() call`),n&&j.push(`--sourcemap=${n===!0?"external":n}`),p&&j.push(`--tsconfig-raw=${typeof p=="string"?p:JSON.stringify(p)}`),r&&j.push(`--sourcefile=${r}`),H&&j.push(`--loader=${H}`),v&&j.push(`--banner=${v}`),T&&j.push(`--footer=${T}`),{flags:j,mangleCache:OB(Q)}}function iA(B){let $={},k={didClose:!1,reason:""},o={},j=0,h=0,n=new Uint8Array(16*1024),p=0,r=a=>{let e=p+a.length;if(e>n.length){let m=new Uint8Array(e*2);m.set(n),n=m}n.set(a,p),p+=a.length;let i=0;for(;i+4<=p;){let m=_B(n,i);if(i+4+m>p)break;i+=4,y(n.subarray(i,i+m)),i+=m}i>0&&(n.copyWithin(0,i,p),p-=i)},H=a=>{k.didClose=!0,a&&(k.reason=": "+(a.message||a));let e="The service was stopped"+k.reason;for(let i in o)o[i](e,null);o={}},v=(a,e,i)=>{if(k.didClose)return i("The service is no longer running"+k.reason,null);let m=j++;o[m]=(A,E)=>{try{i(A,E)}finally{a&&a.unref()}},a&&a.ref(),B.writeToStdin(q({id:m,isRequest:!0,value:e}))},T=(a,e)=>{if(k.didClose)throw new Error("The service is no longer running"+k.reason);B.writeToStdin(q({id:a,isRequest:!1,value:e}))},Q=(a,e)=>Z(this,null,function*(){try{if(e.command==="ping"){T(a,{});return}if(typeof e.key=="number"){let i=$[e.key];if(i){let m=i[e.command];if(m){yield m(a,e);return}}}throw new Error("Invalid command: "+e.command)}catch(i){T(a,{errors:[lB(i,B,null,void 0,"")]})}}),D=!0,y=a=>{if(D){D=!1;let i=String.fromCharCode(...a);if(i!=="0.15.9")throw new Error(`Cannot start service: Host version "0.15.9" does not match binary version ${JSON.stringify(i)}`);return}let e=tB(a);if(e.isRequest)Q(e.id,e.value);else{let i=o[e.id];delete o[e.id],e.value.error?i(e.value.error,{}):i(null,e.value)}};return{readFromStdout:r,afterClose:H,service:{buildOrServe:({callName:a,refs:e,serveOptions:i,options:m,isTTY:A,defaultWD:E,callback:t})=>{let s=0,d=h++,M={},x={ref(){++s===1&&e&&e.ref()},unref(){--s===0&&(delete $[d],e&&e.unref())}};$[d]=M,x.ref(),sA(a,d,v,T,x,B,M,m,i,A,E,k,(I,w)=>{try{t(I,w)}finally{x.unref()}})},transform:({callName:a,refs:e,input:i,options:m,isTTY:A,fs:E,callback:t})=>{let s=JB(),d=M=>{try{if(typeof i!="string"&&!(i instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:x,mangleCache:I}=aA(a,m,A,WB),w={command:"transform",flags:x,inputFS:M!==null,input:M!==null?eB(M):typeof i=="string"?eB(i):i};I&&(w.mangleCache=I),v(e,w,(f,_)=>{if(f)return t(new Error(f),null);let O=nB(_.errors,s),V=nB(_.warnings,s),N=1,F=()=>{if(--N===0){let R={warnings:V,code:_.code,map:_.map};_.mangleCache&&(R.mangleCache=_==null?void 0:_.mangleCache),t(null,R)}};if(O.length>0)return t(jB("Transform failed",O,V),null);_.codeFS&&(N++,E.readFile(_.code,(R,K)=>{R!==null?t(R,null):(_.code=K,F())})),_.mapFS&&(N++,E.readFile(_.map,(R,K)=>{R!==null?t(R,null):(_.map=K,F())})),F()})}catch(x){let I=[];try{dB(I,m,{},A,WB)}catch(f){}let w=lB(x,B,s,void 0,"");v(e,{command:"error",flags:I,error:w},()=>{w.detail=s.load(w.detail),t(jB("Transform failed",[w],[]),null)})}};if((typeof i=="string"||i instanceof Uint8Array)&&i.length>1024*1024){let M=d;d=()=>E.writeFile(i,M)}d(null)},formatMessages:({callName:a,refs:e,messages:i,options:m,callback:A})=>{let E=aB(i,"messages",null,"");if(!m)throw new Error(`Missing second argument in ${a}() call`);let t={},s=P(m,t,"kind",X),d=P(m,t,"color",U),M=P(m,t,"terminalWidth",oB);if(J(m,t,`in ${a}() call`),s===void 0)throw new Error(`Missing "kind" in ${a}() call`);if(s!=="error"&&s!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${a}() call`);let x={command:"format-msgs",messages:E,isWarning:s==="warning"};d!==void 0&&(x.color=d),M!==void 0&&(x.terminalWidth=M),v(e,x,(I,w)=>{if(I)return A(new Error(I),null);A(null,w.messages)})},analyzeMetafile:({callName:a,refs:e,metafile:i,options:m,callback:A})=>{m===void 0&&(m={});let E={},t=P(m,E,"color",U),s=P(m,E,"verbose",U);J(m,E,`in ${a}() call`);let d={command:"analyze-metafile",metafile:i};t!==void 0&&(d.color=t),s!==void 0&&(d.verbose=s),v(e,d,(M,x)=>{if(M)return A(new Error(M),null);A(null,x.result)})}}}}function sA(B,$,k,o,j,h,n,p,r,H,v,T,Q){let D=JB(),y=(l,a,e,i)=>{let m=[];try{dB(m,p,{},H,FB)}catch(E){}let A=lB(l,h,D,e,a);k(j,{command:"error",flags:m,error:A},()=>{A.detail=D.load(A.detail),i(A)})},b=(l,a)=>{y(l,a,void 0,e=>{Q(jB("Build failed",[e],[]),null)})},c;if(typeof p=="object"){let l=p.plugins;if(l!==void 0){if(!Array.isArray(l))throw new Error('"plugins" must be an array');c=l}}if(c&&c.length>0){if(h.isSync){b(new Error("Cannot use plugins in synchronous API calls"),"");return}lA($,k,o,j,h,n,p,c,D).then(l=>{if(!l.ok){b(l.error,l.pluginName);return}try{u(l.requestPlugins,l.runOnEndCallbacks)}catch(a){b(a,"")}},l=>b(l,""));return}try{u(null,(l,a,e)=>e())}catch(l){b(l,"")}function u(l,a){let e=!h.isWriteUnavailable,{entries:i,flags:m,write:A,stdinContents:E,stdinResolveDir:t,absWorkingDir:s,incremental:d,nodePaths:M,watch:x,mangleCache:I}=rA(B,p,H,FB,e),w={command:"build",key:$,entries:i,flags:m,write:A,stdinContents:E,stdinResolveDir:t,absWorkingDir:s||v,incremental:d,nodePaths:M};l&&(w.plugins=l),I&&(w.mangleCache=I);let f=r&&oA($,k,o,j,n,r,w),_,O,V=(F,R)=>{F.outputFiles&&(R.outputFiles=F.outputFiles.map(jA)),F.metafile&&(R.metafile=JSON.parse(F.metafile)),F.mangleCache&&(R.mangleCache=F.mangleCache),F.writeToStdout!==void 0&&console.log(sB(F.writeToStdout).replace(/\n$/,""))},N=(F,R)=>{let K={errors:nB(F.errors,D),warnings:nB(F.warnings,D)};V(F,K),a(K,y,()=>{if(K.errors.length>0)return R(jB("Build failed",K.errors,K.warnings),null);if(F.rebuild){if(!_){let kB=!1;_=()=>new Promise((iB,cB)=>{if(kB||T.didClose)throw new Error("Cannot rebuild");k(j,{command:"rebuild",key:$},(PB,g)=>{if(PB)return R(jB("Build failed",[{id:"",pluginName:"",text:PB,location:null,notes:[],detail:void 0}],[]),null);N(g,(W,SB)=>{W?cB(W):iB(SB)})})}),j.ref(),_.dispose=()=>{kB||(kB=!0,k(j,{command:"rebuild-dispose",key:$},()=>{}),j.unref())}}K.rebuild=_}if(F.watch){if(!O){let kB=!1;j.ref(),O=()=>{kB||(kB=!0,delete n["watch-rebuild"],k(j,{command:"watch-stop",key:$},()=>{}),j.unref())},x&&(n["watch-rebuild"]=(iB,cB)=>{try{let PB=cB.args,g={errors:nB(PB.errors,D),warnings:nB(PB.warnings,D)};V(PB,g),a(g,y,()=>{if(g.errors.length>0){x.onRebuild&&x.onRebuild(jB("Build failed",g.errors,g.warnings),null);return}g.stop=O,x.onRebuild&&x.onRebuild(null,g)})}catch(PB){console.error(PB)}o(iB,{})})}K.stop=O}R(null,K)})};if(A&&h.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(d&&h.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(x&&h.isSync)throw new Error('Cannot use "watch" with a synchronous build');k(j,w,(F,R)=>{if(F)return Q(new Error(F),null);if(f){let K=R,kB=!1;j.ref();let iB={port:K.port,host:K.host,wait:f.wait,stop(){kB||(kB=!0,f.stop(),j.unref())}};return j.ref(),f.wait.then(j.unref,j.unref),Q(null,iB)}return N(R,Q)})}}var oA=(B,$,k,o,j,h,n)=>{let p={},r=P(h,p,"port",oB),H=P(h,p,"host",X),v=P(h,p,"servedir",X),T=P(h,p,"onRequest",xB),Q=new Promise((D,y)=>{j["serve-wait"]=(b,c)=>{c.error!==null?y(new Error(c.error)):D(),k(b,{})}});return n.serve={},J(h,p,"in serve() call"),r!==void 0&&(n.serve.port=r),H!==void 0&&(n.serve.host=H),v!==void 0&&(n.serve.servedir=v),j["serve-request"]=(D,y)=>{T&&T(y.args),k(D,{})},{wait:Q,stop(){$(o,{command:"serve-stop",key:B},()=>{})}}},lA=(B,$,k,o,j,h,n,p,r)=>Z(void 0,null,function*(){let H=[],v=[],T={},Q={},D=0,y=0,b=[],c=!1;p=[...p];for(let l of p){let a={};if(typeof l!="object")throw new Error(`Plugin at index ${y} must be an object`);let e=P(l,a,"name",X);if(typeof e!="string"||e==="")throw new Error(`Plugin at index ${y} is missing a name`);try{let i=P(l,a,"setup",xB);if(typeof i!="function")throw new Error("Plugin is missing a setup function");J(l,a,`on plugin ${JSON.stringify(e)}`);let m={name:e,onResolve:[],onLoad:[]};y++;let E=i({initialOptions:n,resolve:(t,s={})=>{if(!c)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof t!="string")throw new Error("The path to resolve must be a string");let d=Object.create(null),M=P(s,d,"pluginName",X),x=P(s,d,"importer",X),I=P(s,d,"namespace",X),w=P(s,d,"resolveDir",X),f=P(s,d,"kind",X),_=P(s,d,"pluginData",QB);return J(s,d,"in resolve() call"),new Promise((O,V)=>{let N={command:"resolve",path:t,key:B,pluginName:e};M!=null&&(N.pluginName=M),x!=null&&(N.importer=x),I!=null&&(N.namespace=I),w!=null&&(N.resolveDir=w),f!=null&&(N.kind=f),_!=null&&(N.pluginData=r.store(_)),$(o,N,(F,R)=>{F!==null?V(new Error(F)):O({errors:nB(R.errors,r),warnings:nB(R.warnings,r),path:R.path,external:R.external,sideEffects:R.sideEffects,namespace:R.namespace,suffix:R.suffix,pluginData:r.load(R.pluginData)})})})},onStart(t){let s='This error came from the "onStart" callback registered here:',d=gB(new Error(s),j,"onStart");H.push({name:e,callback:t,note:d})},onEnd(t){let s='This error came from the "onEnd" callback registered here:',d=gB(new Error(s),j,"onEnd");v.push({name:e,callback:t,note:d})},onResolve(t,s){let d='This error came from the "onResolve" callback registered here:',M=gB(new Error(d),j,"onResolve"),x={},I=P(t,x,"filter",mB),w=P(t,x,"namespace",X);if(J(t,x,`in onResolve() call for plugin ${JSON.stringify(e)}`),I==null)throw new Error("onResolve() call is missing a filter");let f=D++;T[f]={name:e,callback:s,note:M},m.onResolve.push({id:f,filter:I.source,namespace:w||""})},onLoad(t,s){let d='This error came from the "onLoad" callback registered here:',M=gB(new Error(d),j,"onLoad"),x={},I=P(t,x,"filter",mB),w=P(t,x,"namespace",X);if(J(t,x,`in onLoad() call for plugin ${JSON.stringify(e)}`),I==null)throw new Error("onLoad() call is missing a filter");let f=D++;Q[f]={name:e,callback:s,note:M},m.onLoad.push({id:f,filter:I.source,namespace:w||""})},esbuild:j.esbuild});E&&(yield E),b.push(m)}catch(i){return{ok:!1,error:i,pluginName:e}}}h["on-start"]=(l,a)=>Z(void 0,null,function*(){let e={errors:[],warnings:[]};yield Promise.all(H.map(i=>Z(void 0,[i],function*({name:m,callback:A,note:E}){try{let t=yield A();if(t!=null){if(typeof t!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(m)} to return an object`);let s={},d=P(t,s,"errors",G),M=P(t,s,"warnings",G);J(t,s,`from onStart() callback in plugin ${JSON.stringify(m)}`),d!=null&&e.errors.push(...aB(d,"errors",r,m)),M!=null&&e.warnings.push(...aB(M,"warnings",r,m))}}catch(t){e.errors.push(lB(t,j,r,E&&E(),m))}}))),k(l,e)}),h["on-resolve"]=(l,a)=>Z(void 0,null,function*(){let e={},i="",m,A;for(let E of a.ids)try{({name:i,callback:m,note:A}=T[E]);let t=yield m({path:a.path,importer:a.importer,namespace:a.namespace,resolveDir:a.resolveDir,kind:a.kind,pluginData:r.load(a.pluginData)});if(t!=null){if(typeof t!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(i)} to return an object`);let s={},d=P(t,s,"pluginName",X),M=P(t,s,"path",X),x=P(t,s,"namespace",X),I=P(t,s,"suffix",X),w=P(t,s,"external",U),f=P(t,s,"sideEffects",U),_=P(t,s,"pluginData",QB),O=P(t,s,"errors",G),V=P(t,s,"warnings",G),N=P(t,s,"watchFiles",G),F=P(t,s,"watchDirs",G);J(t,s,`from onResolve() callback in plugin ${JSON.stringify(i)}`),e.id=E,d!=null&&(e.pluginName=d),M!=null&&(e.path=M),x!=null&&(e.namespace=x),I!=null&&(e.suffix=I),w!=null&&(e.external=w),f!=null&&(e.sideEffects=f),_!=null&&(e.pluginData=r.store(_)),O!=null&&(e.errors=aB(O,"errors",r,i)),V!=null&&(e.warnings=aB(V,"warnings",r,i)),N!=null&&(e.watchFiles=TB(N,"watchFiles")),F!=null&&(e.watchDirs=TB(F,"watchDirs"));break}}catch(t){e={id:E,errors:[lB(t,j,r,A&&A(),i)]};break}k(l,e)}),h["on-load"]=(l,a)=>Z(void 0,null,function*(){let e={},i="",m,A;for(let E of a.ids)try{({name:i,callback:m,note:A}=Q[E]);let t=yield m({path:a.path,namespace:a.namespace,suffix:a.suffix,pluginData:r.load(a.pluginData)});if(t!=null){if(typeof t!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(i)} to return an object`);let s={},d=P(t,s,"pluginName",X),M=P(t,s,"contents",GB),x=P(t,s,"resolveDir",X),I=P(t,s,"pluginData",QB),w=P(t,s,"loader",X),f=P(t,s,"errors",G),_=P(t,s,"warnings",G),O=P(t,s,"watchFiles",G),V=P(t,s,"watchDirs",G);J(t,s,`from onLoad() callback in plugin ${JSON.stringify(i)}`),e.id=E,d!=null&&(e.pluginName=d),M instanceof Uint8Array?e.contents=M:M!=null&&(e.contents=eB(M)),x!=null&&(e.resolveDir=x),I!=null&&(e.pluginData=r.store(I)),w!=null&&(e.loader=w),f!=null&&(e.errors=aB(f,"errors",r,i)),_!=null&&(e.warnings=aB(_,"warnings",r,i)),O!=null&&(e.watchFiles=TB(O,"watchFiles")),V!=null&&(e.watchDirs=TB(V,"watchDirs"));break}}catch(t){e={id:E,errors:[lB(t,j,r,A&&A(),i)]};break}k(l,e)});let u=(l,a,e)=>e();return v.length>0&&(u=(l,a,e)=>{(()=>Z(void 0,null,function*(){for(let{name:i,callback:m,note:A}of v)try{yield m(l)}catch(E){l.errors.push(yield new Promise(t=>a(E,i,A&&A(),t)))}}))().then(e)}),c=!0,{ok:!0,requestPlugins:b,runOnEndCallbacks:u}});function JB(){let B=new Map,$=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let o=$++;return B.set(o,k),o}}}function gB(B,$,k){let o,j=!1;return()=>{if(j)return o;j=!0;try{let h=(B.stack+"").split(`
`);h.splice(1,1);let n=VB($,h,k);if(n)return o={text:B.message,location:n},o}catch(h){}}}function lB(B,$,k,o,j){let h="Internal error",n=null;try{h=(B&&B.message||B)+""}catch(p){}try{n=VB($,(B.stack+"").split(`
`),"")}catch(p){}return{id:"",pluginName:j,text:h,location:n,notes:o?[o]:[],detail:k?k.store(B):-1}}function VB(B,$,k){let o="    at ";if(B.readFileSync&&!$[0].startsWith(o)&&$[1].startsWith(o))for(let j=1;j<$.length;j++){let h=$[j];if(!!h.startsWith(o))for(h=h.slice(o.length);;){let n=/^(?:new |async )?\S+ \((.*)\)$/.exec(h);if(n){h=n[1];continue}if(n=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(h),n){h=n[1];continue}if(n=/^(\S+):(\d+):(\d+)$/.exec(h),n){let p;try{p=B.readFileSync(n[1],"utf8")}catch(T){break}let r=p.split(/\r\n|\r|\n|\u2028|\u2029/)[+n[2]-1]||"",H=+n[3]-1,v=r.slice(H,H+k.length)===k?k.length:0;return{file:n[1],namespace:"file",line:+n[2],column:eB(r.slice(0,H)).length,length:eB(r.slice(H,H+v)).length,lineText:r+`
`+$.slice(1).join(`
`),suggestion:""}}break}}return null}function jB(B,$,k){let o=5,j=$.length<1?"":` with ${$.length} error${$.length<2?"":"s"}:`+$.slice(0,o+1).map((n,p)=>{if(p===o)return`
...`;if(!n.location)return`
error: ${n.text}`;let{file:r,line:H,column:v}=n.location,T=n.pluginName?`[plugin: ${n.pluginName}] `:"";return`
${r}:${H}:${v}: ERROR: ${T}${n.text}`}).join(""),h=new Error(`${B}${j}`);return h.errors=$,h.warnings=k,h}function nB(B,$){for(let k of B)k.detail=$.load(k.detail);return B}function KB(B,$){if(B==null)return null;let k={},o=P(B,k,"file",X),j=P(B,k,"namespace",X),h=P(B,k,"line",oB),n=P(B,k,"column",oB),p=P(B,k,"length",oB),r=P(B,k,"lineText",X),H=P(B,k,"suggestion",X);return J(B,k,$),{file:o||"",namespace:j||"",line:h||0,column:n||0,length:p||0,lineText:r||"",suggestion:H||""}}function aB(B,$,k,o){let j=[],h=0;for(let n of B){let p={},r=P(n,p,"id",X),H=P(n,p,"pluginName",X),v=P(n,p,"text",X),T=P(n,p,"location",LB),Q=P(n,p,"notes",G),D=P(n,p,"detail",QB),y=`in element ${h} of "${$}"`;J(n,p,y);let b=[];if(Q)for(let c of Q){let u={},l=P(c,u,"text",X),a=P(c,u,"location",LB);J(c,u,y),b.push({text:l||"",location:KB(a,y)})}j.push({id:r||"",pluginName:H||o,text:v||"",location:KB(T,y),notes:b,detail:k?k.store(D):-1}),h++}return j}function TB(B,$){let k=[];for(let o of B){if(typeof o!="string")throw new Error(`${JSON.stringify($)} must be an array of strings`);k.push(o)}return k}function jA({path:B,contents:$}){let k=null;return{path:B,contents:$,get text(){let o=this.contents;return(k===null||o!==$)&&($=o,k=sB(o)),k}}}var pA="0.15.9",uA=B=>XB().build(B),cA=()=>{throw new Error('The "serve" API only works in node')},hA=(B,$)=>XB().transform(B,$),QA=(B,$)=>XB().formatMessages(B,$),mA=(B,$)=>XB().analyzeMetafile(B,$),dA=()=>{throw new Error('The "buildSync" API only works in node')},gA=()=>{throw new Error('The "transformSync" API only works in node')},TA=()=>{throw new Error('The "formatMessagesSync" API only works in node')},XA=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},pB,vB,XB=()=>{if(vB)return vB;throw pB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},SA=B=>{B=nA(B||{});let $=B.wasmURL,k=B.wasmModule,o=B.worker!==!1;if(!$&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(pB)throw new Error('Cannot call "initialize" more than once');return pB=HA($||"",k,o),pB.catch(()=>{pB=void 0}),pB},HA=(B,$,k)=>Z(void 0,null,function*(){let o;if($)o=$;else{let p=yield fetch(B);if(!p.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);o=yield p.arrayBuffer()}let j;if(k){let p=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.15.9"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});j=new Worker(URL.createObjectURL(p))}else{let p=(r=>{var H=(Q,D,y)=>new Promise((b,c)=>{var u=e=>{try{a(y.next(e))}catch(i){c(i)}},l=e=>{try{a(y.throw(e))}catch(i){c(i)}},a=e=>e.done?b(e.value):Promise.resolve(e.value).then(u,l);a((y=y.apply(Q,D)).next())});let v,T={};for(let Q=self;Q;Q=Object.getPrototypeOf(Q))for(let D of Object.getOwnPropertyNames(Q))D in T||Object.defineProperty(T,D,{get:()=>self[D]});return(()=>{let Q=()=>{let b=new Error("not implemented");return b.code="ENOSYS",b};if(!T.fs){let b="";T.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(c,u){b+=y.decode(u);let l=b.lastIndexOf(`
`);return l!=-1&&(console.log(b.substr(0,l)),b=b.substr(l+1)),u.length},write(c,u,l,a,e,i){if(l!==0||a!==u.length||e!==null){i(Q());return}let m=this.writeSync(c,u);i(null,m)},chmod(c,u,l){l(Q())},chown(c,u,l,a){a(Q())},close(c,u){u(Q())},fchmod(c,u,l){l(Q())},fchown(c,u,l,a){a(Q())},fstat(c,u){u(Q())},fsync(c,u){u(null)},ftruncate(c,u,l){l(Q())},lchown(c,u,l,a){a(Q())},link(c,u,l){l(Q())},lstat(c,u){u(Q())},mkdir(c,u,l){l(Q())},open(c,u,l,a){a(Q())},read(c,u,l,a,e,i){i(Q())},readdir(c,u){u(Q())},readlink(c,u){u(Q())},rename(c,u,l){l(Q())},rmdir(c,u){u(Q())},stat(c,u){u(Q())},symlink(c,u,l){l(Q())},truncate(c,u,l){l(Q())},unlink(c,u){u(Q())},utimes(c,u,l,a){a(Q())}}}if(T.process||(T.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw Q()},pid:-1,ppid:-1,umask(){throw Q()},cwd(){throw Q()},chdir(){throw Q()}}),!T.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!T.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!T.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!T.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let D=new TextEncoder("utf-8"),y=new TextDecoder("utf-8");T.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=A=>{A!==0&&console.warn("exit code:",A)},this._exitPromise=new Promise(A=>{this._resolveExitPromise=A}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let b=(A,E)=>{this.mem.setUint32(A+0,E,!0),this.mem.setUint32(A+4,Math.floor(E/4294967296),!0)},c=A=>{let E=this.mem.getUint32(A+0,!0),t=this.mem.getInt32(A+4,!0);return E+t*4294967296},u=A=>{let E=this.mem.getFloat64(A,!0);if(E===0)return;if(!isNaN(E))return E;let t=this.mem.getUint32(A,!0);return this._values[t]},l=(A,E)=>{if(typeof E=="number"&&E!==0){if(isNaN(E)){this.mem.setUint32(A+4,2146959360,!0),this.mem.setUint32(A,0,!0);return}this.mem.setFloat64(A,E,!0);return}if(E===void 0){this.mem.setFloat64(A,0,!0);return}let s=this._ids.get(E);s===void 0&&(s=this._idPool.pop(),s===void 0&&(s=this._values.length),this._values[s]=E,this._goRefCounts[s]=0,this._ids.set(E,s)),this._goRefCounts[s]++;let d=0;switch(typeof E){case"object":E!==null&&(d=1);break;case"string":d=2;break;case"symbol":d=3;break;case"function":d=4;break}this.mem.setUint32(A+4,2146959360|d,!0),this.mem.setUint32(A,s,!0)},a=A=>{let E=c(A+0),t=c(A+8);return new Uint8Array(this._inst.exports.mem.buffer,E,t)},e=A=>{let E=c(A+0),t=c(A+8),s=new Array(t);for(let d=0;d<t;d++)s[d]=u(E+d*8);return s},i=A=>{let E=c(A+0),t=c(A+8);return y.decode(new DataView(this._inst.exports.mem.buffer,E,t))},m=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":A=>{A>>>=0;let E=this.mem.getInt32(A+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(E)},"runtime.wasmWrite":A=>{A>>>=0;let E=c(A+8),t=c(A+16),s=this.mem.getInt32(A+24,!0);T.fs.writeSync(E,new Uint8Array(this._inst.exports.mem.buffer,t,s))},"runtime.resetMemoryDataView":A=>{A>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":A=>{A>>>=0,b(A+8,(m+performance.now())*1e6)},"runtime.walltime":A=>{A>>>=0;let E=new Date().getTime();b(A+8,E/1e3),this.mem.setInt32(A+16,E%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":A=>{A>>>=0;let E=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(E,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(E);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},c(A+8)+1)),this.mem.setInt32(A+16,E,!0)},"runtime.clearTimeoutEvent":A=>{A>>>=0;let E=this.mem.getInt32(A+8,!0);clearTimeout(this._scheduledTimeouts.get(E)),this._scheduledTimeouts.delete(E)},"runtime.getRandomData":A=>{A>>>=0,crypto.getRandomValues(a(A+8))},"syscall/js.finalizeRef":A=>{A>>>=0;let E=this.mem.getUint32(A+8,!0);if(this._goRefCounts[E]--,this._goRefCounts[E]===0){let t=this._values[E];this._values[E]=null,this._ids.delete(t),this._idPool.push(E)}},"syscall/js.stringVal":A=>{A>>>=0,l(A+24,i(A+8))},"syscall/js.valueGet":A=>{A>>>=0;let E=Reflect.get(u(A+8),i(A+16));A=this._inst.exports.getsp()>>>0,l(A+32,E)},"syscall/js.valueSet":A=>{A>>>=0,Reflect.set(u(A+8),i(A+16),u(A+32))},"syscall/js.valueDelete":A=>{A>>>=0,Reflect.deleteProperty(u(A+8),i(A+16))},"syscall/js.valueIndex":A=>{A>>>=0,l(A+24,Reflect.get(u(A+8),c(A+16)))},"syscall/js.valueSetIndex":A=>{A>>>=0,Reflect.set(u(A+8),c(A+16),u(A+24))},"syscall/js.valueCall":A=>{A>>>=0;try{let E=u(A+8),t=Reflect.get(E,i(A+16)),s=e(A+32),d=Reflect.apply(t,E,s);A=this._inst.exports.getsp()>>>0,l(A+56,d),this.mem.setUint8(A+64,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+56,E),this.mem.setUint8(A+64,0)}},"syscall/js.valueInvoke":A=>{A>>>=0;try{let E=u(A+8),t=e(A+16),s=Reflect.apply(E,void 0,t);A=this._inst.exports.getsp()>>>0,l(A+40,s),this.mem.setUint8(A+48,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+40,E),this.mem.setUint8(A+48,0)}},"syscall/js.valueNew":A=>{A>>>=0;try{let E=u(A+8),t=e(A+16),s=Reflect.construct(E,t);A=this._inst.exports.getsp()>>>0,l(A+40,s),this.mem.setUint8(A+48,1)}catch(E){A=this._inst.exports.getsp()>>>0,l(A+40,E),this.mem.setUint8(A+48,0)}},"syscall/js.valueLength":A=>{A>>>=0,b(A+16,parseInt(u(A+8).length))},"syscall/js.valuePrepareString":A=>{A>>>=0;let E=D.encode(String(u(A+8)));l(A+16,E),b(A+24,E.length)},"syscall/js.valueLoadString":A=>{A>>>=0;let E=u(A+8);a(A+16).set(E)},"syscall/js.valueInstanceOf":A=>{A>>>=0,this.mem.setUint8(A+24,u(A+8)instanceof u(A+16)?1:0)},"syscall/js.copyBytesToGo":A=>{A>>>=0;let E=a(A+8),t=u(A+32);if(!(t instanceof Uint8Array||t instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let s=t.subarray(0,E.length);E.set(s),b(A+40,s.length),this.mem.setUint8(A+48,1)},"syscall/js.copyBytesToJS":A=>{A>>>=0;let E=u(A+8),t=a(A+16);if(!(E instanceof Uint8Array||E instanceof Uint8ClampedArray)){this.mem.setUint8(A+48,0);return}let s=t.subarray(0,E.length);E.set(s),b(A+40,s.length),this.mem.setUint8(A+48,1)},debug:A=>{console.log(A)}}}}run(b){return H(this,null,function*(){if(!(b instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=b,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,T,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[T,5],[this,6]]),this._idPool=[],this.exited=!1;let c=4096,u=A=>{let E=c,t=D.encode(A+"\0");return new Uint8Array(this.mem.buffer,c,t.length).set(t),c+=t.length,c%8!==0&&(c+=8-c%8),E},l=this.argv.length,a=[];this.argv.forEach(A=>{a.push(u(A))}),a.push(0),Object.keys(this.env).sort().forEach(A=>{a.push(u(`${A}=${this.env[A]}`))}),a.push(0);let i=c;a.forEach(A=>{this.mem.setUint32(c,A,!0),this.mem.setUint32(c+4,0,!0),c+=8});let m=4096+8192;if(c>=m)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(l,i),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(b){let c=this;return function(){let u={id:b,this:this,args:arguments};return c._pendingEvent=u,c._resume(),u.result}}}})(),v=({data:Q})=>{let D=new TextDecoder,y=T.fs,b="";y.writeSync=(e,i)=>{if(e===1)r(i);else if(e===2){b+=D.decode(i);let m=b.split(`
`);m.length>1&&console.log(m.slice(0,-1).join(`
`)),b=m[m.length-1]}else throw new Error("Bad write");return i.length};let c=[],u,l=0;v=({data:e})=>{e.length>0&&(c.push(e),u&&u())},y.read=(e,i,m,A,E,t)=>{if(e!==0||m!==0||A!==i.length||E!==null)throw new Error("Bad read");if(c.length===0){u=()=>y.read(e,i,m,A,E,t);return}let s=c[0],d=Math.max(0,Math.min(A,s.length-l));i.set(s.subarray(l,l+d),m),l+=d,l===s.length&&(c.shift(),l=0),t(null,d)};let a=new T.Go;a.argv=["","--service=0.15.9"],Q instanceof WebAssembly.Module?WebAssembly.instantiate(Q,a.importObject).then(e=>a.run(e)):WebAssembly.instantiate(Q,a.importObject).then(({instance:e})=>a.run(e))},Q=>v(Q)})(r=>j.onmessage({data:r}));j={onmessage:null,postMessage:r=>setTimeout(()=>p({data:r})),terminate(){}}}j.postMessage(o),j.onmessage=({data:p})=>h(p);let{readFromStdout:h,service:n}=iA({writeToStdin(p){j.postMessage(p)},isSync:!1,isWriteUnavailable:!0,esbuild:BB});vB={build:p=>new Promise((r,H)=>n.buildOrServe({callName:"build",refs:null,serveOptions:null,options:p,isTTY:!1,defaultWD:"/",callback:(v,T)=>v?H(v):r(T)})),transform:(p,r)=>new Promise((H,v)=>n.transform({callName:"transform",refs:null,input:p,options:r||{},isTTY:!1,fs:{readFile(T,Q){Q(new Error("Internal error"),null)},writeFile(T,Q){Q(null)}},callback:(T,Q)=>T?v(T):H(Q)})),formatMessages:(p,r)=>new Promise((H,v)=>n.formatMessages({callName:"formatMessages",refs:null,messages:p,options:r,callback:(T,Q)=>T?v(T):H(Q)})),analyzeMetafile:(p,r)=>new Promise((H,v)=>n.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof p=="string"?p:JSON.stringify(p),options:r,callback:(T,Q)=>T?v(T):H(Q)}))}}),bA=BB})(typeof RB=="object"?RB:{set exports(Y){(typeof self!="undefined"?self:this).esbuild=Y}})});rB();rB();rB();var IA=new Error("timeout while waiting for mutex to become available"),_A=new Error("mutex already locked"),vA=new Error("request for lock canceled"),MA=function(Y,S,C,L){function AB(z){return z instanceof C?z:new C(function($B){$B(z)})}return new(C||(C=Promise))(function(z,$B){function uB(q){try{BB(L.next(q))}catch(tB){$B(tB)}}function Z(q){try{BB(L.throw(q))}catch(tB){$B(tB)}}function BB(q){q.done?z(q.value):AB(q.value).then(uB,Z)}BB((L=L.apply(Y,S||[])).next())})},CB=class{constructor(S,C=vA){this._value=S,this._cancelError=C,this._weightedQueues=[],this._weightedWaiters=[]}acquire(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);return new Promise((C,L)=>{this._weightedQueues[S-1]||(this._weightedQueues[S-1]=[]),this._weightedQueues[S-1].push({resolve:C,reject:L}),this._dispatch()})}runExclusive(S,C=1){return MA(this,void 0,void 0,function*(){let[L,AB]=yield this.acquire(C);try{return yield S(L)}finally{AB()}})}waitForUnlock(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);return new Promise(C=>{this._weightedWaiters[S-1]||(this._weightedWaiters[S-1]=[]),this._weightedWaiters[S-1].push(C),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(S){this._value=S,this._dispatch()}release(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);this._value+=S,this._dispatch()}cancel(){this._weightedQueues.forEach(S=>S.forEach(C=>C.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var S;for(let C=this._value;C>0;C--){let L=(S=this._weightedQueues[C-1])===null||S===void 0?void 0:S.shift();if(!L)continue;let AB=this._value,z=C;this._value-=C,C=this._value+1,L.resolve([AB,this._newReleaser(z)])}this._drainUnlockWaiters()}_newReleaser(S){let C=!1;return()=>{C||(C=!0,this.release(S))}}_drainUnlockWaiters(){for(let S=this._value;S>0;S--)!this._weightedWaiters[S-1]||(this._weightedWaiters[S-1].forEach(C=>C()),this._weightedWaiters[S-1]=[])}},yA=function(Y,S,C,L){function AB(z){return z instanceof C?z:new C(function($B){$B(z)})}return new(C||(C=Promise))(function(z,$B){function uB(q){try{BB(L.next(q))}catch(tB){$B(tB)}}function Z(q){try{BB(L.throw(q))}catch(tB){$B(tB)}}function BB(q){q.done?z(q.value):AB(q.value).then(uB,Z)}BB((L=L.apply(Y,S||[])).next())})},HB=class{constructor(S){this._semaphore=new CB(1,S)}acquire(){return yA(this,void 0,void 0,function*(){let[,S]=yield this._semaphore.acquire();return S})}runExclusive(S){return this._semaphore.runExclusive(()=>S())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};var bB=xA(BA(),1);var AA="./chunk-esbuild-D3FQ3XPW.wasm";var hB=!1,wA=new HB,DB={transform:wA.runExclusive(()=>bB.transform)},$A=async()=>{try{if(hB===!0||(hB=hB||new Promise(Y=>{(0,bB.initialize)({wasmURL:new URL(AA,location.origin).toString()}).then(()=>Y(!0))}),await hB===!0))return DB;throw new Error("esbuild couldn't initialize")}catch(Y){throw new Error("esbuild couldn't initialize")}finally{if(await hB===!0)return DB;throw new Error("esbuild couldn't initialize")}};var RA={i:0,esbuild:$A()},DA=(async()=>({transform:await(await RA.esbuild).transform}))();async function B7({code:Y,counter:S}){let C=await DA;yB({...MB(),code:Y,i:S});try{let L=await C.transform(Y,{loader:"tsx",format:"esm",treeShaking:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",module:"es2022",jsxFragmentFactory:"Fragment",jsxImportSource:"@emotion/react"}},target:"es2021"});if(yB({...MB(),transpiled:L.code}),L.code.length>0)try{ZB()}catch(AB){console.error("EXCEPTION"),console.error(AB)}}catch(L){console.error({error:L})}}export{B7 as runner};
