import{a as wr}from"./chunk-chunk-OOBH5VBY.mjs";import{a as Mn}from"./chunk-chunk-RQUTZNLE.mjs";import{a as yr}from"./chunk-chunk-73U57KXL.mjs";import{a as Jt}from"./chunk-chunk-WNZVI2YQ.mjs";import{a as vr,b as Ke,c as $n,f as mt,g as Ue,i as Pn,m as jn}from"./chunk-chunk-UDUMOIFY.mjs";import{a as Un}from"./chunk-chunk-HJDRMN4F.mjs";import{a as t,b as kt,d as Cn,f as Ge,g as ke}from"./chunk-chunk-O6JVKB3A.mjs";var xn=Cn((ui,_n)=>{ke();(s=>{"use strict";var n=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=Object.getOwnPropertyNames,g=Object.prototype.hasOwnProperty,w=t((o,l)=>{for(var m in l)n(o,m,{get:l[m],enumerable:!0})},"__export"),d=t((o,l,m,R)=>{if(l&&typeof l=="object"||typeof l=="function")for(let P of p(l))!g.call(o,P)&&P!==m&&n(o,P,{get:()=>l[P],enumerable:!(R=u(l,P))||R.enumerable});return o},"__copyProps"),v=t(o=>d(n({},"__esModule",{value:!0}),o),"__toCommonJS"),_=t((o,l,m)=>new Promise((R,P)=>{var Y=t(N=>{try{L(m.next(N))}catch(ee){P(ee)}},"fulfilled"),O=t(N=>{try{L(m.throw(N))}catch(ee){P(ee)}},"rejected"),L=t(N=>N.done?R(N.value):Promise.resolve(N.value).then(Y,O),"step");L((m=m.apply(o,l)).next())}),"__async"),j={};w(j,{analyzeMetafile:()=>Lt,analyzeMetafileSync:()=>zt,build:()=>jt,buildSync:()=>Ft,default:()=>mn,formatMessages:()=>Bt,formatMessagesSync:()=>Vt,initialize:()=>Ot,serve:()=>Ut,transform:()=>Mt,transformSync:()=>Wt,version:()=>Tt}),s.exports=v(j);function D(o){let l=t(R=>{if(R===null)m.write8(0);else if(typeof R=="boolean")m.write8(1),m.write8(+R);else if(typeof R=="number")m.write8(2),m.write32(R|0);else if(typeof R=="string")m.write8(3),m.write(W(R));else if(R instanceof Uint8Array)m.write8(4),m.write(R);else if(R instanceof Array){m.write8(5),m.write32(R.length);for(let P of R)l(P)}else{let P=Object.keys(R);m.write8(6),m.write32(P.length);for(let Y of P)m.write(W(Y)),l(R[Y])}},"visit"),m=new x;return m.write32(0),m.write32(o.id<<1|+!o.isRequest),l(o.value),ge(m.buf,m.len-4,0),m.buf.subarray(0,m.len)}t(D,"encodePacket");function U(o){let l=t(()=>{switch(m.read8()){case 0:return null;case 1:return!!m.read8();case 2:return m.read32();case 3:return Z(m.read());case 4:return m.read();case 5:{let O=m.read32(),L=[];for(let N=0;N<O;N++)L.push(l());return L}case 6:{let O=m.read32(),L={};for(let N=0;N<O;N++)L[Z(m.read())]=l();return L}default:throw new Error("Invalid packet")}},"visit"),m=new x(o),R=m.read32(),P=(R&1)===0;R>>>=1;let Y=l();if(m.ptr!==o.length)throw new Error("Invalid packet");return{id:R,isRequest:P,value:Y}}t(U,"decodePacket");var x=t(class{constructor(o=new Uint8Array(1024)){this.buf=o,this.len=0,this.ptr=0}_write(o){if(this.len+o>this.buf.length){let l=new Uint8Array((this.len+o)*2);l.set(this.buf),this.buf=l}return this.len+=o,this.len-o}write8(o){let l=this._write(1);this.buf[l]=o}write32(o){let l=this._write(4);ge(this.buf,o,l)}write(o){let l=this._write(4+o.length);ge(this.buf,o.length,l),this.buf.set(o,l+4)}_read(o){if(this.ptr+o>this.buf.length)throw new Error("Invalid packet");return this.ptr+=o,this.ptr-o}read8(){return this.buf[this._read(1)]}read32(){return se(this.buf,this._read(4))}read(){let o=this.read32(),l=new Uint8Array(o),m=this._read(l.length);return l.set(this.buf.subarray(m,m+o)),l}},"ByteBuffer"),W,Z;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let o=new TextEncoder,l=new TextDecoder;W=t(m=>o.encode(m),"encodeUTF8"),Z=t(m=>l.decode(m),"decodeUTF8")}else if(typeof Buffer<"u")W=t(o=>{let l=Buffer.from(o);return l instanceof Uint8Array||(l=new Uint8Array(l)),l},"encodeUTF8"),Z=t(o=>{let{buffer:l,byteOffset:m,byteLength:R}=o;return Buffer.from(l,m,R).toString()},"decodeUTF8");else throw new Error("No UTF-8 codec found");function se(o,l){return o[l++]|o[l++]<<8|o[l++]<<16|o[l++]<<24}t(se,"readUInt32LE");function ge(o,l,m){o[m++]=l,o[m++]=l>>8,o[m++]=l>>16,o[m++]=l>>24}t(ge,"writeUInt32LE");var le="warning",je="silent";function Se(o){if(o+="",o.indexOf(",")>=0)throw new Error(`Invalid target: ${o}`);return o}t(Se,"validateTarget");var We=t(()=>null,"canBeAnything"),fe=t(o=>typeof o=="boolean"?null:"a boolean","mustBeBoolean"),Q=t(o=>typeof o=="boolean"||typeof o=="object"&&!Array.isArray(o)?null:"a boolean or an object","mustBeBooleanOrObject"),V=t(o=>typeof o=="string"?null:"a string","mustBeString"),ae=t(o=>o instanceof RegExp?null:"a RegExp object","mustBeRegExp"),ve=t(o=>typeof o=="number"&&o===(o|0)?null:"an integer","mustBeInteger"),Re=t(o=>typeof o=="function"?null:"a function","mustBeFunction"),we=t(o=>Array.isArray(o)?null:"an array","mustBeArray"),Oe=t(o=>typeof o=="object"&&o!==null&&!Array.isArray(o)?null:"an object","mustBeObject"),Le=t(o=>o instanceof WebAssembly.Module?null:"a WebAssembly.Module","mustBeWebAssemblyModule"),Qe=t(o=>typeof o=="object"&&o!==null?null:"an array or an object","mustBeArrayOrRecord"),rt=t(o=>typeof o=="object"&&!Array.isArray(o)?null:"an object or null","mustBeObjectOrNull"),at=t(o=>typeof o=="string"||typeof o=="boolean"?null:"a string or a boolean","mustBeStringOrBoolean"),bt=t(o=>typeof o=="string"||typeof o=="object"&&o!==null&&!Array.isArray(o)?null:"a string or an object","mustBeStringOrObject"),it=t(o=>typeof o=="string"||Array.isArray(o)?null:"a string or an array","mustBeStringOrArray"),_t=t(o=>typeof o=="string"||o instanceof Uint8Array?null:"a string or a Uint8Array","mustBeStringOrUint8Array");function y(o,l,m,R){let P=o[m];if(l[m+""]=!0,P===void 0)return;let Y=R(P);if(Y!==null)throw new Error(`"${m}" must be ${Y}`);return P}t(y,"getFlag");function De(o,l,m){for(let R in o)if(!(R in l))throw new Error(`Invalid option ${m}: "${R}"`)}t(De,"checkForInvalidFlags");function qe(o){let l=Object.create(null),m=y(o,l,"wasmURL",V),R=y(o,l,"wasmModule",Le),P=y(o,l,"worker",fe);return De(o,l,"in initialize() call"),{wasmURL:m,wasmModule:R,worker:P}}t(qe,"validateInitializeOptions");function xt(o){let l;if(o!==void 0){l=Object.create(null);for(let m of Object.keys(o)){let R=o[m];if(typeof R=="string"||R===!1)l[m]=R;else throw new Error(`Expected ${JSON.stringify(m)} in mangle cache to map to either a string or false`)}}return l}t(xt,"validateMangleCache");function ft(o,l,m,R,P){let Y=y(l,m,"color",fe),O=y(l,m,"logLevel",V),L=y(l,m,"logLimit",ve);Y!==void 0?o.push(`--color=${Y}`):R&&o.push("--color=true"),o.push(`--log-level=${O||P}`),o.push(`--log-limit=${L||0}`)}t(ft,"pushLogFlags");function Ct(o,l,m){let R=y(l,m,"legalComments",V),P=y(l,m,"sourceRoot",V),Y=y(l,m,"sourcesContent",fe),O=y(l,m,"target",it),L=y(l,m,"format",V),N=y(l,m,"globalName",V),ee=y(l,m,"mangleProps",ae),ie=y(l,m,"reserveProps",ae),X=y(l,m,"mangleQuoted",fe),G=y(l,m,"minify",fe),he=y(l,m,"minifySyntax",fe),ue=y(l,m,"minifyWhitespace",fe),te=y(l,m,"minifyIdentifiers",fe),z=y(l,m,"drop",we),F=y(l,m,"charset",V),$=y(l,m,"treeShaking",fe),k=y(l,m,"ignoreAnnotations",fe),b=y(l,m,"jsx",V),A=y(l,m,"jsxFactory",V),H=y(l,m,"jsxFragment",V),a=y(l,m,"jsxImportSource",V),E=y(l,m,"jsxDev",fe),S=y(l,m,"jsxSideEffects",fe),I=y(l,m,"define",Oe),q=y(l,m,"logOverride",Oe),oe=y(l,m,"supported",Oe),re=y(l,m,"pure",we),me=y(l,m,"keepNames",fe),de=y(l,m,"platform",V);if(R&&o.push(`--legal-comments=${R}`),P!==void 0&&o.push(`--source-root=${P}`),Y!==void 0&&o.push(`--sources-content=${Y}`),O&&(Array.isArray(O)?o.push(`--target=${Array.from(O).map(Se).join(",")}`):o.push(`--target=${Se(O)}`)),L&&o.push(`--format=${L}`),N&&o.push(`--global-name=${N}`),de&&o.push(`--platform=${de}`),G&&o.push("--minify"),he&&o.push("--minify-syntax"),ue&&o.push("--minify-whitespace"),te&&o.push("--minify-identifiers"),F&&o.push(`--charset=${F}`),$!==void 0&&o.push(`--tree-shaking=${$}`),k&&o.push("--ignore-annotations"),z)for(let ne of z)o.push(`--drop:${ne}`);if(ee&&o.push(`--mangle-props=${ee.source}`),ie&&o.push(`--reserve-props=${ie.source}`),X!==void 0&&o.push(`--mangle-quoted=${X}`),b&&o.push(`--jsx=${b}`),A&&o.push(`--jsx-factory=${A}`),H&&o.push(`--jsx-fragment=${H}`),a&&o.push(`--jsx-import-source=${a}`),E&&o.push("--jsx-dev"),S&&o.push("--jsx-side-effects"),I)for(let ne in I){if(ne.indexOf("=")>=0)throw new Error(`Invalid define: ${ne}`);o.push(`--define:${ne}=${I[ne]}`)}if(q)for(let ne in q){if(ne.indexOf("=")>=0)throw new Error(`Invalid log override: ${ne}`);o.push(`--log-override:${ne}=${q[ne]}`)}if(oe)for(let ne in oe){if(ne.indexOf("=")>=0)throw new Error(`Invalid supported: ${ne}`);o.push(`--supported:${ne}=${oe[ne]}`)}if(re)for(let ne of re)o.push(`--pure:${ne}`);me&&o.push("--keep-names")}t(Ct,"pushCommonFlags");function an(o,l,m,R,P){var Y;let O=[],L=[],N=Object.create(null),ee=null,ie=null,X=null;ft(O,l,N,m,R),Ct(O,l,N);let G=y(l,N,"sourcemap",at),he=y(l,N,"bundle",fe),ue=y(l,N,"watch",Q),te=y(l,N,"splitting",fe),z=y(l,N,"preserveSymlinks",fe),F=y(l,N,"metafile",fe),$=y(l,N,"outfile",V),k=y(l,N,"outdir",V),b=y(l,N,"outbase",V),A=y(l,N,"tsconfig",V),H=y(l,N,"resolveExtensions",we),a=y(l,N,"nodePaths",we),E=y(l,N,"mainFields",we),S=y(l,N,"conditions",we),I=y(l,N,"external",we),q=y(l,N,"alias",Oe),oe=y(l,N,"loader",Oe),re=y(l,N,"outExtension",Oe),me=y(l,N,"publicPath",V),de=y(l,N,"entryNames",V),ne=y(l,N,"chunkNames",V),be=y(l,N,"assetNames",V),Ne=y(l,N,"inject",we),Ce=y(l,N,"banner",Oe),Ee=y(l,N,"footer",Oe),ye=y(l,N,"entryPoints",Qe),pe=y(l,N,"absWorkingDir",V),Te=y(l,N,"stdin",Oe),Ve=(Y=y(l,N,"write",fe))!=null?Y:P,tt=y(l,N,"allowOverwrite",fe),nt=y(l,N,"incremental",fe)===!0,Je=y(l,N,"mangleCache",Oe);if(N.plugins=!0,De(l,N,`in ${o}() call`),G&&O.push(`--sourcemap${G===!0?"":`=${G}`}`),he&&O.push("--bundle"),tt&&O.push("--allow-overwrite"),ue)if(O.push("--watch"),typeof ue=="boolean")X={};else{let e=Object.create(null),i=y(ue,e,"onRebuild",Re);De(ue,e,`on "watch" in ${o}() call`),X={onRebuild:i}}if(te&&O.push("--splitting"),z&&O.push("--preserve-symlinks"),F&&O.push("--metafile"),$&&O.push(`--outfile=${$}`),k&&O.push(`--outdir=${k}`),b&&O.push(`--outbase=${b}`),A&&O.push(`--tsconfig=${A}`),H){let e=[];for(let i of H){if(i+="",i.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${i}`);e.push(i)}O.push(`--resolve-extensions=${e.join(",")}`)}if(me&&O.push(`--public-path=${me}`),de&&O.push(`--entry-names=${de}`),ne&&O.push(`--chunk-names=${ne}`),be&&O.push(`--asset-names=${be}`),E){let e=[];for(let i of E){if(i+="",i.indexOf(",")>=0)throw new Error(`Invalid main field: ${i}`);e.push(i)}O.push(`--main-fields=${e.join(",")}`)}if(S){let e=[];for(let i of S){if(i+="",i.indexOf(",")>=0)throw new Error(`Invalid condition: ${i}`);e.push(i)}O.push(`--conditions=${e.join(",")}`)}if(I)for(let e of I)O.push(`--external:${e}`);if(q)for(let e in q){if(e.indexOf("=")>=0)throw new Error(`Invalid package name in alias: ${e}`);O.push(`--alias:${e}=${q[e]}`)}if(Ce)for(let e in Ce){if(e.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${e}`);O.push(`--banner:${e}=${Ce[e]}`)}if(Ee)for(let e in Ee){if(e.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${e}`);O.push(`--footer:${e}=${Ee[e]}`)}if(Ne)for(let e of Ne)O.push(`--inject:${e}`);if(oe)for(let e in oe){if(e.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${e}`);O.push(`--loader:${e}=${oe[e]}`)}if(re)for(let e in re){if(e.indexOf("=")>=0)throw new Error(`Invalid out extension: ${e}`);O.push(`--out-extension:${e}=${re[e]}`)}if(ye)if(Array.isArray(ye))for(let e of ye)L.push(["",e+""]);else for(let[e,i]of Object.entries(ye))L.push([e+"",i+""]);if(Te){let e=Object.create(null),i=y(Te,e,"contents",_t),r=y(Te,e,"resolveDir",V),f=y(Te,e,"sourcefile",V),h=y(Te,e,"loader",V);De(Te,e,'in "stdin" object'),f&&O.push(`--sourcefile=${f}`),h&&O.push(`--loader=${h}`),r&&(ie=r+""),typeof i=="string"?ee=W(i):i instanceof Uint8Array&&(ee=i)}let Fe=[];if(a)for(let e of a)e+="",Fe.push(e);return{entries:L,flags:O,write:Ve,stdinContents:ee,stdinResolveDir:ie,absWorkingDir:pe,incremental:nt,nodePaths:Fe,watch:X,mangleCache:xt(Je)}}t(an,"flagsForBuildOptions");function ln(o,l,m,R){let P=[],Y=Object.create(null);ft(P,l,Y,m,R),Ct(P,l,Y);let O=y(l,Y,"sourcemap",at),L=y(l,Y,"tsconfigRaw",bt),N=y(l,Y,"sourcefile",V),ee=y(l,Y,"loader",V),ie=y(l,Y,"banner",V),X=y(l,Y,"footer",V),G=y(l,Y,"mangleCache",Oe);return De(l,Y,`in ${o}() call`),O&&P.push(`--sourcemap=${O===!0?"external":O}`),L&&P.push(`--tsconfig-raw=${typeof L=="string"?L:JSON.stringify(L)}`),N&&P.push(`--sourcefile=${N}`),ee&&P.push(`--loader=${ee}`),ie&&P.push(`--banner=${ie}`),X&&P.push(`--footer=${X}`),{flags:P,mangleCache:xt(G)}}t(ln,"flagsForTransformOptions");function un(o){let l={},m={didClose:!1,reason:""},R={},P=0,Y=0,O=new Uint8Array(16*1024),L=0,N=t(k=>{let b=L+k.length;if(b>O.length){let H=new Uint8Array(b*2);H.set(O),O=H}O.set(k,L),L+=k.length;let A=0;for(;A+4<=L;){let H=se(O,A);if(A+4+H>L)break;A+=4,ue(O.subarray(A,A+H)),A+=H}A>0&&(O.copyWithin(0,A,L),L-=A)},"readFromStdout"),ee=t(k=>{m.didClose=!0,k&&(m.reason=": "+(k.message||k));let b="The service was stopped"+m.reason;for(let A in R)R[A](b,null);R={}},"afterClose"),ie=t((k,b,A)=>{if(m.didClose)return A("The service is no longer running"+m.reason,null);let H=P++;R[H]=(a,E)=>{try{A(a,E)}finally{k&&k.unref()}},k&&k.ref(),o.writeToStdin(D({id:H,isRequest:!0,value:b}))},"sendRequest"),X=t((k,b)=>{if(m.didClose)throw new Error("The service is no longer running"+m.reason);o.writeToStdin(D({id:k,isRequest:!1,value:b}))},"sendResponse"),G=t((k,b)=>_(this,null,function*(){try{if(b.command==="ping"){X(k,{});return}if(typeof b.key=="number"){let A=l[b.key];if(A){let H=A[b.command];if(H){yield H(k,b);return}}}throw new Error("Invalid command: "+b.command)}catch(A){X(k,{errors:[ot(A,o,null,void 0,"")]})}}),"handleRequest"),he=!0,ue=t(k=>{if(he){he=!1;let A=String.fromCharCode(...k);if(A!=="0.15.16")throw new Error(`Cannot start service: Host version "0.15.16" does not match binary version ${JSON.stringify(A)}`);return}let b=U(k);if(b.isRequest)G(b.id,b.value);else{let A=R[b.id];delete R[b.id],b.value.error?A(b.value.error,{}):A(null,b.value)}},"handleIncomingPacket");return{readFromStdout:N,afterClose:ee,service:{buildOrServe:t(({callName:k,refs:b,serveOptions:A,options:H,isTTY:a,defaultWD:E,callback:S})=>{let I=0,q=Y++,oe={},re={ref(){++I===1&&b&&b.ref()},unref(){--I===0&&(delete l[q],b&&b.unref())}};l[q]=oe,re.ref(),cn(k,q,ie,X,re,o,oe,H,A,a,E,m,(me,de)=>{try{S(me,de)}finally{re.unref()}})},"buildOrServe"),transform:t(({callName:k,refs:b,input:A,options:H,isTTY:a,fs:E,callback:S})=>{let I=$t(),q=t(oe=>{try{if(typeof A!="string"&&!(A instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:re,mangleCache:me}=ln(k,H,a,je),de={command:"transform",flags:re,inputFS:oe!==null,input:oe!==null?W(oe):typeof A=="string"?W(A):A};me&&(de.mangleCache=me),ie(b,de,(ne,be)=>{if(ne)return S(new Error(ne),null);let Ne=Ze(be.errors,I),Ce=Ze(be.warnings,I),Ee=1,ye=t(()=>{if(--Ee===0){let pe={warnings:Ce,code:be.code,map:be.map};be.mangleCache&&(pe.mangleCache=be?.mangleCache),S(null,pe)}},"next");if(Ne.length>0)return S(Be("Transform failed",Ne,Ce),null);be.codeFS&&(Ee++,E.readFile(be.code,(pe,Te)=>{pe!==null?S(pe,null):(be.code=Te,ye())})),be.mapFS&&(Ee++,E.readFile(be.map,(pe,Te)=>{pe!==null?S(pe,null):(be.map=Te,ye())})),ye()})}catch(re){let me=[];try{ft(me,H,{},a,je)}catch{}let de=ot(re,o,I,void 0,"");ie(b,{command:"error",flags:me,error:de},()=>{de.detail=I.load(de.detail),S(Be("Transform failed",[de],[]),null)})}},"start");if((typeof A=="string"||A instanceof Uint8Array)&&A.length>1024*1024){let oe=q;q=t(()=>E.writeFile(A,oe),"start")}q(null)},"transform2"),formatMessages:t(({callName:k,refs:b,messages:A,options:H,callback:a})=>{let E=ze(A,"messages",null,"");if(!H)throw new Error(`Missing second argument in ${k}() call`);let S={},I=y(H,S,"kind",V),q=y(H,S,"color",fe),oe=y(H,S,"terminalWidth",ve);if(De(H,S,`in ${k}() call`),I===void 0)throw new Error(`Missing "kind" in ${k}() call`);if(I!=="error"&&I!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${k}() call`);let re={command:"format-msgs",messages:E,isWarning:I==="warning"};q!==void 0&&(re.color=q),oe!==void 0&&(re.terminalWidth=oe),ie(b,re,(me,de)=>{if(me)return a(new Error(me),null);a(null,de.messages)})},"formatMessages2"),analyzeMetafile:t(({callName:k,refs:b,metafile:A,options:H,callback:a})=>{H===void 0&&(H={});let E={},S=y(H,E,"color",fe),I=y(H,E,"verbose",fe);De(H,E,`in ${k}() call`);let q={command:"analyze-metafile",metafile:A};S!==void 0&&(q.color=S),I!==void 0&&(q.verbose=I),ie(b,q,(oe,re)=>{if(oe)return a(new Error(oe),null);a(null,re.result)})},"analyzeMetafile2")}}}t(un,"createChannel");function cn(o,l,m,R,P,Y,O,L,N,ee,ie,X,G){let he=$t(),ue=t(($,k,b,A)=>{let H=[];try{ft(H,L,{},ee,le)}catch{}let a=ot($,Y,he,b,k);m(P,{command:"error",flags:H,error:a},()=>{a.detail=he.load(a.detail),A(a)})},"logPluginError"),te=t(($,k)=>{ue($,k,void 0,b=>{G(Be("Build failed",[b],[]),null)})},"handleError"),z;if(typeof L=="object"){let $=L.plugins;if($!==void 0){if(!Array.isArray($))throw new Error('"plugins" must be an array');z=$}}if(z&&z.length>0){if(Y.isSync){te(new Error("Cannot use plugins in synchronous API calls"),"");return}dn(l,m,R,P,Y,O,L,z,he).then($=>{if(!$.ok){te($.error,$.pluginName);return}try{F($.requestPlugins,$.runOnEndCallbacks)}catch(k){te(k,"")}},$=>te($,""));return}try{F(null,($,k,b)=>b())}catch($){te($,"")}function F($,k){let b=!Y.isWriteUnavailable,{entries:A,flags:H,write:a,stdinContents:E,stdinResolveDir:S,absWorkingDir:I,incremental:q,nodePaths:oe,watch:re,mangleCache:me}=an(o,L,ee,le,b),de={command:"build",key:l,entries:A,flags:H,write:a,stdinContents:E,stdinResolveDir:S,absWorkingDir:I||ie,incremental:q,nodePaths:oe};$&&(de.plugins=$),me&&(de.mangleCache=me);let ne=N&&fn(l,m,R,P,O,N,de),be,Ne,Ce=t((ye,pe)=>{ye.outputFiles&&(pe.outputFiles=ye.outputFiles.map(St)),ye.metafile&&(pe.metafile=JSON.parse(ye.metafile)),ye.mangleCache&&(pe.mangleCache=ye.mangleCache),ye.writeToStdout!==void 0&&console.log(Z(ye.writeToStdout).replace(/\n$/,""))},"copyResponseToResult"),Ee=t((ye,pe)=>{let Te={errors:Ze(ye.errors,he),warnings:Ze(ye.warnings,he)};Ce(ye,Te),k(Te,ue,()=>{if(Te.errors.length>0)return pe(Be("Build failed",Te.errors,Te.warnings),null);if(ye.rebuild){if(!be){let Ve=!1;be=t(()=>new Promise((tt,nt)=>{if(Ve||X.didClose)throw new Error("Cannot rebuild");m(P,{command:"rebuild",key:l},(Je,Fe)=>{if(Je)return pe(Be("Build failed",[{id:"",pluginName:"",text:Je,location:null,notes:[],detail:void 0}],[]),null);Ee(Fe,(e,i)=>{e?nt(e):tt(i)})})}),"rebuild"),P.ref(),be.dispose=()=>{Ve||(Ve=!0,m(P,{command:"rebuild-dispose",key:l},()=>{}),P.unref())}}Te.rebuild=be}if(ye.watch){if(!Ne){let Ve=!1;P.ref(),Ne=t(()=>{Ve||(Ve=!0,delete O["watch-rebuild"],m(P,{command:"watch-stop",key:l},()=>{}),P.unref())},"stop"),re&&(O["watch-rebuild"]=(tt,nt)=>{try{let Je=nt.args,Fe={errors:Ze(Je.errors,he),warnings:Ze(Je.warnings,he)};Ce(Je,Fe),k(Fe,ue,()=>{if(Fe.errors.length>0){re.onRebuild&&re.onRebuild(Be("Build failed",Fe.errors,Fe.warnings),null);return}Fe.stop=Ne,re.onRebuild&&re.onRebuild(null,Fe)})}catch(Je){console.error(Je)}R(tt,{})})}Te.stop=Ne}pe(null,Te)})},"buildResponseToResult");if(a&&Y.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(q&&Y.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(re&&Y.isSync)throw new Error('Cannot use "watch" with a synchronous build');m(P,de,(ye,pe)=>{if(ye)return G(new Error(ye),null);if(ne){let Te=pe,Ve=!1;P.ref();let tt={port:Te.port,host:Te.host,wait:ne.wait,stop(){Ve||(Ve=!0,ne.stop(),P.unref())}};return P.ref(),ne.wait.then(P.unref,P.unref),G(null,tt)}return Ee(pe,G)})}t(F,"buildOrServeContinue")}t(cn,"buildOrServeImpl");var fn=t((o,l,m,R,P,Y,O)=>{let L={},N=y(Y,L,"port",ve),ee=y(Y,L,"host",V),ie=y(Y,L,"servedir",V),X=y(Y,L,"onRequest",Re),G=new Promise((he,ue)=>{P["serve-wait"]=(te,z)=>{z.error!==null?ue(new Error(z.error)):he(),m(te,{})}});return O.serve={},De(Y,L,"in serve() call"),N!==void 0&&(O.serve.port=N),ee!==void 0&&(O.serve.host=ee),ie!==void 0&&(O.serve.servedir=ie),P["serve-request"]=(he,ue)=>{X&&X(ue.args),m(he,{})},{wait:G,stop(){l(R,{command:"serve-stop",key:o},()=>{})}}},"buildServeData"),dn=t((o,l,m,R,P,Y,O,L,N)=>_(void 0,null,function*(){let ee=[],ie=[],X={},G={},he=0,ue=0,te=[],z=!1;L=[...L];for(let $ of L){let k={};if(typeof $!="object")throw new Error(`Plugin at index ${ue} must be an object`);let b=y($,k,"name",V);if(typeof b!="string"||b==="")throw new Error(`Plugin at index ${ue} is missing a name`);try{let A=y($,k,"setup",Re);if(typeof A!="function")throw new Error("Plugin is missing a setup function");De($,k,`on plugin ${JSON.stringify(b)}`);let H={name:b,onResolve:[],onLoad:[]};ue++;let E=A({initialOptions:O,resolve:t((S,I={})=>{if(!z)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof S!="string")throw new Error("The path to resolve must be a string");let q=Object.create(null),oe=y(I,q,"pluginName",V),re=y(I,q,"importer",V),me=y(I,q,"namespace",V),de=y(I,q,"resolveDir",V),ne=y(I,q,"kind",V),be=y(I,q,"pluginData",We);return De(I,q,"in resolve() call"),new Promise((Ne,Ce)=>{let Ee={command:"resolve",path:S,key:o,pluginName:b};oe!=null&&(Ee.pluginName=oe),re!=null&&(Ee.importer=re),me!=null&&(Ee.namespace=me),de!=null&&(Ee.resolveDir=de),ne!=null&&(Ee.kind=ne),be!=null&&(Ee.pluginData=N.store(be)),l(R,Ee,(ye,pe)=>{ye!==null?Ce(new Error(ye)):Ne({errors:Ze(pe.errors,N),warnings:Ze(pe.warnings,N),path:pe.path,external:pe.external,sideEffects:pe.sideEffects,namespace:pe.namespace,suffix:pe.suffix,pluginData:N.load(pe.pluginData)})})})},"resolve"),onStart(S){let I='This error came from the "onStart" callback registered here:',q=dt(new Error(I),P,"onStart");ee.push({name:b,callback:S,note:q})},onEnd(S){let I='This error came from the "onEnd" callback registered here:',q=dt(new Error(I),P,"onEnd");ie.push({name:b,callback:S,note:q})},onResolve(S,I){let q='This error came from the "onResolve" callback registered here:',oe=dt(new Error(q),P,"onResolve"),re={},me=y(S,re,"filter",ae),de=y(S,re,"namespace",V);if(De(S,re,`in onResolve() call for plugin ${JSON.stringify(b)}`),me==null)throw new Error("onResolve() call is missing a filter");let ne=he++;X[ne]={name:b,callback:I,note:oe},H.onResolve.push({id:ne,filter:me.source,namespace:de||""})},onLoad(S,I){let q='This error came from the "onLoad" callback registered here:',oe=dt(new Error(q),P,"onLoad"),re={},me=y(S,re,"filter",ae),de=y(S,re,"namespace",V);if(De(S,re,`in onLoad() call for plugin ${JSON.stringify(b)}`),me==null)throw new Error("onLoad() call is missing a filter");let ne=he++;G[ne]={name:b,callback:I,note:oe},H.onLoad.push({id:ne,filter:me.source,namespace:de||""})},esbuild:P.esbuild});E&&(yield E),te.push(H)}catch(A){return{ok:!1,error:A,pluginName:b}}}Y["on-start"]=($,k)=>_(void 0,null,function*(){let b={errors:[],warnings:[]};yield Promise.all(ee.map(A=>_(void 0,[A],function*({name:H,callback:a,note:E}){try{let S=yield a();if(S!=null){if(typeof S!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(H)} to return an object`);let I={},q=y(S,I,"errors",we),oe=y(S,I,"warnings",we);De(S,I,`from onStart() callback in plugin ${JSON.stringify(H)}`),q!=null&&b.errors.push(...ze(q,"errors",N,H)),oe!=null&&b.warnings.push(...ze(oe,"warnings",N,H))}}catch(S){b.errors.push(ot(S,P,N,E&&E(),H))}}))),m($,b)}),Y["on-resolve"]=($,k)=>_(void 0,null,function*(){let b={},A="",H,a;for(let E of k.ids)try{({name:A,callback:H,note:a}=X[E]);let S=yield H({path:k.path,importer:k.importer,namespace:k.namespace,resolveDir:k.resolveDir,kind:k.kind,pluginData:N.load(k.pluginData)});if(S!=null){if(typeof S!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(A)} to return an object`);let I={},q=y(S,I,"pluginName",V),oe=y(S,I,"path",V),re=y(S,I,"namespace",V),me=y(S,I,"suffix",V),de=y(S,I,"external",fe),ne=y(S,I,"sideEffects",fe),be=y(S,I,"pluginData",We),Ne=y(S,I,"errors",we),Ce=y(S,I,"warnings",we),Ee=y(S,I,"watchFiles",we),ye=y(S,I,"watchDirs",we);De(S,I,`from onResolve() callback in plugin ${JSON.stringify(A)}`),b.id=E,q!=null&&(b.pluginName=q),oe!=null&&(b.path=oe),re!=null&&(b.namespace=re),me!=null&&(b.suffix=me),de!=null&&(b.external=de),ne!=null&&(b.sideEffects=ne),be!=null&&(b.pluginData=N.store(be)),Ne!=null&&(b.errors=ze(Ne,"errors",N,A)),Ce!=null&&(b.warnings=ze(Ce,"warnings",N,A)),Ee!=null&&(b.watchFiles=st(Ee,"watchFiles")),ye!=null&&(b.watchDirs=st(ye,"watchDirs"));break}}catch(S){b={id:E,errors:[ot(S,P,N,a&&a(),A)]};break}m($,b)}),Y["on-load"]=($,k)=>_(void 0,null,function*(){let b={},A="",H,a;for(let E of k.ids)try{({name:A,callback:H,note:a}=G[E]);let S=yield H({path:k.path,namespace:k.namespace,suffix:k.suffix,pluginData:N.load(k.pluginData)});if(S!=null){if(typeof S!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(A)} to return an object`);let I={},q=y(S,I,"pluginName",V),oe=y(S,I,"contents",_t),re=y(S,I,"resolveDir",V),me=y(S,I,"pluginData",We),de=y(S,I,"loader",V),ne=y(S,I,"errors",we),be=y(S,I,"warnings",we),Ne=y(S,I,"watchFiles",we),Ce=y(S,I,"watchDirs",we);De(S,I,`from onLoad() callback in plugin ${JSON.stringify(A)}`),b.id=E,q!=null&&(b.pluginName=q),oe instanceof Uint8Array?b.contents=oe:oe!=null&&(b.contents=W(oe)),re!=null&&(b.resolveDir=re),me!=null&&(b.pluginData=N.store(me)),de!=null&&(b.loader=de),ne!=null&&(b.errors=ze(ne,"errors",N,A)),be!=null&&(b.warnings=ze(be,"warnings",N,A)),Ne!=null&&(b.watchFiles=st(Ne,"watchFiles")),Ce!=null&&(b.watchDirs=st(Ce,"watchDirs"));break}}catch(S){b={id:E,errors:[ot(S,P,N,a&&a(),A)]};break}m($,b)});let F=t(($,k,b)=>b(),"runOnEndCallbacks");return ie.length>0&&(F=t(($,k,b)=>{(()=>_(void 0,null,function*(){for(let{name:A,callback:H,note:a}of ie)try{yield H($)}catch(E){$.errors.push(yield new Promise(S=>k(E,A,a&&a(),S)))}}))().then(b)},"runOnEndCallbacks")),z=!0,{ok:!0,requestPlugins:te,runOnEndCallbacks:F}}),"handlePlugins");function $t(){let o=new Map,l=0;return{load(m){return o.get(m)},store(m){if(m===void 0)return-1;let R=l++;return o.set(R,m),R}}}t($t,"createObjectStash");function dt(o,l,m){let R,P=!1;return()=>{if(P)return R;P=!0;try{let Y=(o.stack+"").split(`
`);Y.splice(1,1);let O=Pt(l,Y,m);if(O)return R={text:o.message,location:O},R}catch{}}}t(dt,"extractCallerV8");function ot(o,l,m,R,P){let Y="Internal error",O=null;try{Y=(o&&o.message||o)+""}catch{}try{O=Pt(l,(o.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:P,text:Y,location:O,notes:R?[R]:[],detail:m?m.store(o):-1}}t(ot,"extractErrorMessageV8");function Pt(o,l,m){let R="    at ";if(o.readFileSync&&!l[0].startsWith(R)&&l[1].startsWith(R))for(let P=1;P<l.length;P++){let Y=l[P];if(!!Y.startsWith(R))for(Y=Y.slice(R.length);;){let O=/^(?:new |async )?\S+ \((.*)\)$/.exec(Y);if(O){Y=O[1];continue}if(O=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(Y),O){Y=O[1];continue}if(O=/^(\S+):(\d+):(\d+)$/.exec(Y),O){let L;try{L=o.readFileSync(O[1],"utf8")}catch{break}let N=L.split(/\r\n|\r|\n|\u2028|\u2029/)[+O[2]-1]||"",ee=+O[3]-1,ie=N.slice(ee,ee+m.length)===m?m.length:0;return{file:O[1],namespace:"file",line:+O[2],column:W(N.slice(0,ee)).length,length:W(N.slice(ee,ee+ie)).length,lineText:N+`
`+l.slice(1).join(`
`),suggestion:""}}break}}return null}t(Pt,"parseStackLinesV8");function Be(o,l,m){let R=5,P=l.length<1?"":` with ${l.length} error${l.length<2?"":"s"}:`+l.slice(0,R+1).map((O,L)=>{if(L===R)return`
...`;if(!O.location)return`
error: ${O.text}`;let{file:N,line:ee,column:ie}=O.location,X=O.pluginName?`[plugin: ${O.pluginName}] `:"";return`
${N}:${ee}:${ie}: ERROR: ${X}${O.text}`}).join(""),Y=new Error(`${o}${P}`);return Y.errors=l,Y.warnings=m,Y}t(Be,"failureErrorWithLog");function Ze(o,l){for(let m of o)m.detail=l.load(m.detail);return o}t(Ze,"replaceDetailsInMessages");function Et(o,l){if(o==null)return null;let m={},R=y(o,m,"file",V),P=y(o,m,"namespace",V),Y=y(o,m,"line",ve),O=y(o,m,"column",ve),L=y(o,m,"length",ve),N=y(o,m,"lineText",V),ee=y(o,m,"suggestion",V);return De(o,m,l),{file:R||"",namespace:P||"",line:Y||0,column:O||0,length:L||0,lineText:N||"",suggestion:ee||""}}t(Et,"sanitizeLocation");function ze(o,l,m,R){let P=[],Y=0;for(let O of o){let L={},N=y(O,L,"id",V),ee=y(O,L,"pluginName",V),ie=y(O,L,"text",V),X=y(O,L,"location",rt),G=y(O,L,"notes",we),he=y(O,L,"detail",We),ue=`in element ${Y} of "${l}"`;De(O,L,ue);let te=[];if(G)for(let z of G){let F={},$=y(z,F,"text",V),k=y(z,F,"location",rt);De(z,F,ue),te.push({text:$||"",location:Et(k,ue)})}P.push({id:N||"",pluginName:ee||R,text:ie||"",location:Et(X,ue),notes:te,detail:m?m.store(he):-1}),Y++}return P}t(ze,"sanitizeMessages");function st(o,l){let m=[];for(let R of o){if(typeof R!="string")throw new Error(`${JSON.stringify(l)} must be an array of strings`);m.push(R)}return m}t(st,"sanitizeStringArray");function St({path:o,contents:l}){let m=null;return{path:o,contents:l,get text(){let R=this.contents;return(m===null||R!==l)&&(l=R,m=Z(R)),m}}}t(St,"convertOutputFiles");var Tt="0.15.16",jt=t(o=>lt().build(o),"build"),Ut=t(()=>{throw new Error('The "serve" API only works in node')},"serve"),Mt=t((o,l)=>lt().transform(o,l),"transform"),Bt=t((o,l)=>lt().formatMessages(o,l),"formatMessages"),Lt=t((o,l)=>lt().analyzeMetafile(o,l),"analyzeMetafile"),Ft=t(()=>{throw new Error('The "buildSync" API only works in node')},"buildSync"),Wt=t(()=>{throw new Error('The "transformSync" API only works in node')},"transformSync"),Vt=t(()=>{throw new Error('The "formatMessagesSync" API only works in node')},"formatMessagesSync"),zt=t(()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},"analyzeMetafileSync"),et,ht,lt=t(()=>{if(ht)return ht;throw et?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},"ensureServiceIsRunning"),Ot=t(o=>{o=qe(o||{});let l=o.wasmURL,m=o.wasmModule,R=o.worker!==!1;if(!l&&!m)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(et)throw new Error('Cannot call "initialize" more than once');return et=hn(l||"",m,R),et.catch(()=>{et=void 0}),et},"initialize"),hn=t((o,l,m)=>_(void 0,null,function*(){let R;if(l)R=l;else{let L=yield fetch(o);if(!L.ok)throw new Error(`Failed to download ${JSON.stringify(o)}`);R=yield L.arrayBuffer()}let P;if(m){let L=new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.15.16"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});P=new Worker(URL.createObjectURL(L))}else{let L=(N=>{var ee=t((G,he,ue)=>new Promise((te,z)=>{var F=t(b=>{try{k(ue.next(b))}catch(A){z(A)}},"fulfilled"),$=t(b=>{try{k(ue.throw(b))}catch(A){z(A)}},"rejected"),k=t(b=>b.done?te(b.value):Promise.resolve(b.value).then(F,$),"step");k((ue=ue.apply(G,he)).next())}),"__async");let ie,X={};for(let G=self;G;G=Object.getPrototypeOf(G))for(let he of Object.getOwnPropertyNames(G))he in X||Object.defineProperty(X,he,{get:()=>self[he]});return(()=>{let G=t(()=>{let te=new Error("not implemented");return te.code="ENOSYS",te},"enosys");if(!X.fs){let te="";X.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(z,F){te+=ue.decode(F);let $=te.lastIndexOf(`
`);return $!=-1&&(console.log(te.substr(0,$)),te=te.substr($+1)),F.length},write(z,F,$,k,b,A){if($!==0||k!==F.length||b!==null){A(G());return}let H=this.writeSync(z,F);A(null,H)},chmod(z,F,$){$(G())},chown(z,F,$,k){k(G())},close(z,F){F(G())},fchmod(z,F,$){$(G())},fchown(z,F,$,k){k(G())},fstat(z,F){F(G())},fsync(z,F){F(null)},ftruncate(z,F,$){$(G())},lchown(z,F,$,k){k(G())},link(z,F,$){$(G())},lstat(z,F){F(G())},mkdir(z,F,$){$(G())},open(z,F,$,k){k(G())},read(z,F,$,k,b,A){A(G())},readdir(z,F){F(G())},readlink(z,F){F(G())},rename(z,F,$){$(G())},rmdir(z,F){F(G())},stat(z,F){F(G())},symlink(z,F,$){$(G())},truncate(z,F,$){$(G())},unlink(z,F){F(G())},utimes(z,F,$,k){k(G())}}}if(X.process||(X.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw G()},pid:-1,ppid:-1,umask(){throw G()},cwd(){throw G()},chdir(){throw G()}}),!X.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!X.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!X.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!X.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let he=new TextEncoder("utf-8"),ue=new TextDecoder("utf-8");X.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=a=>{a!==0&&console.warn("exit code:",a)},this._exitPromise=new Promise(a=>{this._resolveExitPromise=a}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let te=t((a,E)=>{this.mem.setUint32(a+0,E,!0),this.mem.setUint32(a+4,Math.floor(E/4294967296),!0)},"setInt64"),z=t(a=>{let E=this.mem.getUint32(a+0,!0),S=this.mem.getInt32(a+4,!0);return E+S*4294967296},"getInt64"),F=t(a=>{let E=this.mem.getFloat64(a,!0);if(E===0)return;if(!isNaN(E))return E;let S=this.mem.getUint32(a,!0);return this._values[S]},"loadValue"),$=t((a,E)=>{if(typeof E=="number"&&E!==0){if(isNaN(E)){this.mem.setUint32(a+4,2146959360,!0),this.mem.setUint32(a,0,!0);return}this.mem.setFloat64(a,E,!0);return}if(E===void 0){this.mem.setFloat64(a,0,!0);return}let I=this._ids.get(E);I===void 0&&(I=this._idPool.pop(),I===void 0&&(I=this._values.length),this._values[I]=E,this._goRefCounts[I]=0,this._ids.set(E,I)),this._goRefCounts[I]++;let q=0;switch(typeof E){case"object":E!==null&&(q=1);break;case"string":q=2;break;case"symbol":q=3;break;case"function":q=4;break}this.mem.setUint32(a+4,2146959360|q,!0),this.mem.setUint32(a,I,!0)},"storeValue"),k=t(a=>{let E=z(a+0),S=z(a+8);return new Uint8Array(this._inst.exports.mem.buffer,E,S)},"loadSlice"),b=t(a=>{let E=z(a+0),S=z(a+8),I=new Array(S);for(let q=0;q<S;q++)I[q]=F(E+q*8);return I},"loadSliceOfValues"),A=t(a=>{let E=z(a+0),S=z(a+8);return ue.decode(new DataView(this._inst.exports.mem.buffer,E,S))},"loadString"),H=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":a=>{a>>>=0;let E=this.mem.getInt32(a+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(E)},"runtime.wasmWrite":a=>{a>>>=0;let E=z(a+8),S=z(a+16),I=this.mem.getInt32(a+24,!0);X.fs.writeSync(E,new Uint8Array(this._inst.exports.mem.buffer,S,I))},"runtime.resetMemoryDataView":a=>{a>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":a=>{a>>>=0,te(a+8,(H+performance.now())*1e6)},"runtime.walltime":a=>{a>>>=0;let E=new Date().getTime();te(a+8,E/1e3),this.mem.setInt32(a+16,E%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":a=>{a>>>=0;let E=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(E,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(E);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},z(a+8)+1)),this.mem.setInt32(a+16,E,!0)},"runtime.clearTimeoutEvent":a=>{a>>>=0;let E=this.mem.getInt32(a+8,!0);clearTimeout(this._scheduledTimeouts.get(E)),this._scheduledTimeouts.delete(E)},"runtime.getRandomData":a=>{a>>>=0,crypto.getRandomValues(k(a+8))},"syscall/js.finalizeRef":a=>{a>>>=0;let E=this.mem.getUint32(a+8,!0);if(this._goRefCounts[E]--,this._goRefCounts[E]===0){let S=this._values[E];this._values[E]=null,this._ids.delete(S),this._idPool.push(E)}},"syscall/js.stringVal":a=>{a>>>=0,$(a+24,A(a+8))},"syscall/js.valueGet":a=>{a>>>=0;let E=Reflect.get(F(a+8),A(a+16));a=this._inst.exports.getsp()>>>0,$(a+32,E)},"syscall/js.valueSet":a=>{a>>>=0,Reflect.set(F(a+8),A(a+16),F(a+32))},"syscall/js.valueDelete":a=>{a>>>=0,Reflect.deleteProperty(F(a+8),A(a+16))},"syscall/js.valueIndex":a=>{a>>>=0,$(a+24,Reflect.get(F(a+8),z(a+16)))},"syscall/js.valueSetIndex":a=>{a>>>=0,Reflect.set(F(a+8),z(a+16),F(a+24))},"syscall/js.valueCall":a=>{a>>>=0;try{let E=F(a+8),S=Reflect.get(E,A(a+16)),I=b(a+32),q=Reflect.apply(S,E,I);a=this._inst.exports.getsp()>>>0,$(a+56,q),this.mem.setUint8(a+64,1)}catch(E){a=this._inst.exports.getsp()>>>0,$(a+56,E),this.mem.setUint8(a+64,0)}},"syscall/js.valueInvoke":a=>{a>>>=0;try{let E=F(a+8),S=b(a+16),I=Reflect.apply(E,void 0,S);a=this._inst.exports.getsp()>>>0,$(a+40,I),this.mem.setUint8(a+48,1)}catch(E){a=this._inst.exports.getsp()>>>0,$(a+40,E),this.mem.setUint8(a+48,0)}},"syscall/js.valueNew":a=>{a>>>=0;try{let E=F(a+8),S=b(a+16),I=Reflect.construct(E,S);a=this._inst.exports.getsp()>>>0,$(a+40,I),this.mem.setUint8(a+48,1)}catch(E){a=this._inst.exports.getsp()>>>0,$(a+40,E),this.mem.setUint8(a+48,0)}},"syscall/js.valueLength":a=>{a>>>=0,te(a+16,parseInt(F(a+8).length))},"syscall/js.valuePrepareString":a=>{a>>>=0;let E=he.encode(String(F(a+8)));$(a+16,E),te(a+24,E.length)},"syscall/js.valueLoadString":a=>{a>>>=0;let E=F(a+8);k(a+16).set(E)},"syscall/js.valueInstanceOf":a=>{a>>>=0,this.mem.setUint8(a+24,F(a+8)instanceof F(a+16)?1:0)},"syscall/js.copyBytesToGo":a=>{a>>>=0;let E=k(a+8),S=F(a+32);if(!(S instanceof Uint8Array||S instanceof Uint8ClampedArray)){this.mem.setUint8(a+48,0);return}let I=S.subarray(0,E.length);E.set(I),te(a+40,I.length),this.mem.setUint8(a+48,1)},"syscall/js.copyBytesToJS":a=>{a>>>=0;let E=F(a+8),S=k(a+16);if(!(E instanceof Uint8Array||E instanceof Uint8ClampedArray)){this.mem.setUint8(a+48,0);return}let I=S.subarray(0,E.length);E.set(I),te(a+40,I.length),this.mem.setUint8(a+48,1)},debug:a=>{console.log(a)}}}}run(te){return ee(this,null,function*(){if(!(te instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=te,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,X,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[X,5],[this,6]]),this._idPool=[],this.exited=!1;let z=4096,F=t(a=>{let E=z,S=he.encode(a+"\0");return new Uint8Array(this.mem.buffer,z,S.length).set(S),z+=S.length,z%8!==0&&(z+=8-z%8),E},"strPtr"),$=this.argv.length,k=[];this.argv.forEach(a=>{k.push(F(a))}),k.push(0),Object.keys(this.env).sort().forEach(a=>{k.push(F(`${a}=${this.env[a]}`))}),k.push(0);let A=z;k.forEach(a=>{this.mem.setUint32(z,a,!0),this.mem.setUint32(z+4,0,!0),z+=8});let H=4096+8192;if(z>=H)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run($,A),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(te){let z=this;return function(){let F={id:te,this:this,args:arguments};return z._pendingEvent=F,z._resume(),F.result}}}})(),ie=t(({data:G})=>{let he=new TextDecoder,ue=X.fs,te="";ue.writeSync=(b,A)=>{if(b===1)N(A);else if(b===2){te+=he.decode(A);let H=te.split(`
`);H.length>1&&console.log(H.slice(0,-1).join(`
`)),te=H[H.length-1]}else throw new Error("Bad write");return A.length};let z=[],F,$=0;ie=t(({data:b})=>{b.length>0&&(z.push(b),F&&F())},"onmessage"),ue.read=(b,A,H,a,E,S)=>{if(b!==0||H!==0||a!==A.length||E!==null)throw new Error("Bad read");if(z.length===0){F=t(()=>ue.read(b,A,H,a,E,S),"resumeStdin");return}let I=z[0],q=Math.max(0,Math.min(a,I.length-$));A.set(I.subarray($,$+q),H),$+=q,$===I.length&&(z.shift(),$=0),S(null,q)};let k=new X.Go;k.argv=["","--service=0.15.16"],G instanceof WebAssembly.Module?WebAssembly.instantiate(G,k.importObject).then(b=>k.run(b)):WebAssembly.instantiate(G,k.importObject).then(({instance:b})=>k.run(b))},"onmessage"),G=>ie(G)})(N=>P.onmessage({data:N}));P={onmessage:null,postMessage:N=>setTimeout(()=>L({data:N})),terminate(){}}}P.postMessage(R),P.onmessage=({data:L})=>Y(L);let{readFromStdout:Y,service:O}=un({writeToStdin(L){P.postMessage(L)},isSync:!1,isWriteUnavailable:!0,esbuild:j});ht={build:L=>new Promise((N,ee)=>O.buildOrServe({callName:"build",refs:null,serveOptions:null,options:L,isTTY:!1,defaultWD:"/",callback:(ie,X)=>ie?ee(ie):N(X)})),transform:(L,N)=>new Promise((ee,ie)=>O.transform({callName:"transform",refs:null,input:L,options:N||{},isTTY:!1,fs:{readFile(X,G){G(new Error("Internal error"),null)},writeFile(X,G){G(null)}},callback:(X,G)=>X?ie(X):ee(G)})),formatMessages:(L,N)=>new Promise((ee,ie)=>O.formatMessages({callName:"formatMessages",refs:null,messages:L,options:N,callback:(X,G)=>X?ie(X):ee(G)})),analyzeMetafile:(L,N)=>new Promise((ee,ie)=>O.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof L=="string"?L:JSON.stringify(L),options:N,callback:(X,G)=>X?ie(X):ee(G)}))}}),"startRunningService"),mn=j})(typeof _n=="object"?_n:{set exports(s){(typeof self<"u"?self:this).esbuild=s}})});var tr=Cn((er,On)=>{ke();(function(s){if(typeof er=="object"&&typeof On<"u")On.exports=s();else if(typeof define=="function"&&define.amd)define([],s);else{var n;typeof window<"u"?n=window:typeof globalThis<"u"?n=globalThis:typeof self<"u"?n=self:n=this,n.localforage=s()}})(function(){var s,n,u;return t(function p(g,w,d){function v(D,U){if(!w[D]){if(!g[D]){var x=typeof kt=="function"&&kt;if(!U&&x)return x(D,!0);if(_)return _(D,!0);var W=new Error("Cannot find module '"+D+"'");throw W.code="MODULE_NOT_FOUND",W}var Z=w[D]={exports:{}};g[D][0].call(Z.exports,function(se){var ge=g[D][1][se];return v(ge||se)},Z,Z.exports,p,g,w,d)}return w[D].exports}t(v,"s");for(var _=typeof kt=="function"&&kt,j=0;j<d.length;j++)v(d[j]);return v},"e")({1:[function(p,g,w){(function(d){"use strict";var v=d.MutationObserver||d.WebKitMutationObserver,_;if(v){var j=0,D=new v(se),U=d.document.createTextNode("");D.observe(U,{characterData:!0}),_=t(function(){U.data=j=++j%2},"scheduleDrain")}else if(!d.setImmediate&&typeof d.MessageChannel<"u"){var x=new d.MessageChannel;x.port1.onmessage=se,_=t(function(){x.port2.postMessage(0)},"scheduleDrain")}else"document"in d&&"onreadystatechange"in d.document.createElement("script")?_=t(function(){var le=d.document.createElement("script");le.onreadystatechange=function(){se(),le.onreadystatechange=null,le.parentNode.removeChild(le),le=null},d.document.documentElement.appendChild(le)},"scheduleDrain"):_=t(function(){setTimeout(se,0)},"scheduleDrain");var W,Z=[];function se(){W=!0;for(var le,je,Se=Z.length;Se;){for(je=Z,Z=[],le=-1;++le<Se;)je[le]();Se=Z.length}W=!1}t(se,"nextTick"),g.exports=ge;function ge(le){Z.push(le)===1&&!W&&_()}t(ge,"immediate")}).call(this,typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(p,g,w){"use strict";var d=p(1);function v(){}t(v,"INTERNAL");var _={},j=["REJECTED"],D=["FULFILLED"],U=["PENDING"];g.exports=x;function x(Q){if(typeof Q!="function")throw new TypeError("resolver must be a function");this.state=U,this.queue=[],this.outcome=void 0,Q!==v&&ge(this,Q)}t(x,"Promise"),x.prototype.catch=function(Q){return this.then(null,Q)},x.prototype.then=function(Q,V){if(typeof Q!="function"&&this.state===D||typeof V!="function"&&this.state===j)return this;var ae=new this.constructor(v);if(this.state!==U){var ve=this.state===D?Q:V;Z(ae,ve,this.outcome)}else this.queue.push(new W(ae,Q,V));return ae};function W(Q,V,ae){this.promise=Q,typeof V=="function"&&(this.onFulfilled=V,this.callFulfilled=this.otherCallFulfilled),typeof ae=="function"&&(this.onRejected=ae,this.callRejected=this.otherCallRejected)}t(W,"QueueItem"),W.prototype.callFulfilled=function(Q){_.resolve(this.promise,Q)},W.prototype.otherCallFulfilled=function(Q){Z(this.promise,this.onFulfilled,Q)},W.prototype.callRejected=function(Q){_.reject(this.promise,Q)},W.prototype.otherCallRejected=function(Q){Z(this.promise,this.onRejected,Q)};function Z(Q,V,ae){d(function(){var ve;try{ve=V(ae)}catch(Re){return _.reject(Q,Re)}ve===Q?_.reject(Q,new TypeError("Cannot resolve promise with itself")):_.resolve(Q,ve)})}t(Z,"unwrap"),_.resolve=function(Q,V){var ae=le(se,V);if(ae.status==="error")return _.reject(Q,ae.value);var ve=ae.value;if(ve)ge(Q,ve);else{Q.state=D,Q.outcome=V;for(var Re=-1,we=Q.queue.length;++Re<we;)Q.queue[Re].callFulfilled(V)}return Q},_.reject=function(Q,V){Q.state=j,Q.outcome=V;for(var ae=-1,ve=Q.queue.length;++ae<ve;)Q.queue[ae].callRejected(V);return Q};function se(Q){var V=Q&&Q.then;if(Q&&(typeof Q=="object"||typeof Q=="function")&&typeof V=="function")return t(function(){V.apply(Q,arguments)},"appyThen")}t(se,"getThen");function ge(Q,V){var ae=!1;function ve(Le){ae||(ae=!0,_.reject(Q,Le))}t(ve,"onError");function Re(Le){ae||(ae=!0,_.resolve(Q,Le))}t(Re,"onSuccess");function we(){V(Re,ve)}t(we,"tryToUnwrap");var Oe=le(we);Oe.status==="error"&&ve(Oe.value)}t(ge,"safelyResolveThenable");function le(Q,V){var ae={};try{ae.value=Q(V),ae.status="success"}catch(ve){ae.status="error",ae.value=ve}return ae}t(le,"tryCatch"),x.resolve=je;function je(Q){return Q instanceof this?Q:_.resolve(new this(v),Q)}t(je,"resolve"),x.reject=Se;function Se(Q){var V=new this(v);return _.reject(V,Q)}t(Se,"reject"),x.all=We;function We(Q){var V=this;if(Object.prototype.toString.call(Q)!=="[object Array]")return this.reject(new TypeError("must be an array"));var ae=Q.length,ve=!1;if(!ae)return this.resolve([]);for(var Re=new Array(ae),we=0,Oe=-1,Le=new this(v);++Oe<ae;)Qe(Q[Oe],Oe);return Le;function Qe(rt,at){V.resolve(rt).then(bt,function(it){ve||(ve=!0,_.reject(Le,it))});function bt(it){Re[at]=it,++we===ae&&!ve&&(ve=!0,_.resolve(Le,Re))}t(bt,"resolveFromAll")}}t(We,"all"),x.race=fe;function fe(Q){var V=this;if(Object.prototype.toString.call(Q)!=="[object Array]")return this.reject(new TypeError("must be an array"));var ae=Q.length,ve=!1;if(!ae)return this.resolve([]);for(var Re=-1,we=new this(v);++Re<ae;)Oe(Q[Re]);return we;function Oe(Le){V.resolve(Le).then(function(Qe){ve||(ve=!0,_.resolve(we,Qe))},function(Qe){ve||(ve=!0,_.reject(we,Qe))})}}t(fe,"race")},{1:1}],3:[function(p,g,w){(function(d){"use strict";typeof d.Promise!="function"&&(d.Promise=p(2))}).call(this,typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(p,g,w){"use strict";var d=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function v(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}t(v,"_classCallCheck");function _(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}t(_,"getIDB");var j=_();function D(){try{if(!j||!j.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),i=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||i)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}t(D,"isIndexedDBValid");function U(e,i){e=e||[],i=i||{};try{return new Blob(e,i)}catch(c){if(c.name!=="TypeError")throw c;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,f=new r,h=0;h<e.length;h+=1)f.append(e[h]);return f.getBlob(i.type)}}t(U,"createBlob"),typeof Promise>"u"&&p(3);var x=Promise;function W(e,i){i&&e.then(function(r){i(null,r)},function(r){i(r)})}t(W,"executeCallback");function Z(e,i,r){typeof i=="function"&&e.then(i),typeof r=="function"&&e.catch(r)}t(Z,"executeTwoCallbacks");function se(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}t(se,"normalizeKey");function ge(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}t(ge,"getCallback");var le="local-forage-detect-blob-support",je=void 0,Se={},We=Object.prototype.toString,fe="readonly",Q="readwrite";function V(e){for(var i=e.length,r=new ArrayBuffer(i),f=new Uint8Array(r),h=0;h<i;h++)f[h]=e.charCodeAt(h);return r}t(V,"_binStringToArrayBuffer");function ae(e){return new x(function(i){var r=e.transaction(le,Q),f=U([""]);r.objectStore(le).put(f,"key"),r.onabort=function(h){h.preventDefault(),h.stopPropagation(),i(!1)},r.oncomplete=function(){var h=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);i(c||!h||parseInt(h[1],10)>=43)}}).catch(function(){return!1})}t(ae,"_checkBlobSupportWithoutCaching");function ve(e){return typeof je=="boolean"?x.resolve(je):ae(e).then(function(i){return je=i,je})}t(ve,"_checkBlobSupport");function Re(e){var i=Se[e.name],r={};r.promise=new x(function(f,h){r.resolve=f,r.reject=h}),i.deferredOperations.push(r),i.dbReady?i.dbReady=i.dbReady.then(function(){return r.promise}):i.dbReady=r.promise}t(Re,"_deferReadiness");function we(e){var i=Se[e.name],r=i.deferredOperations.pop();if(r)return r.resolve(),r.promise}t(we,"_advanceReadiness");function Oe(e,i){var r=Se[e.name],f=r.deferredOperations.pop();if(f)return f.reject(i),f.promise}t(Oe,"_rejectReadiness");function Le(e,i){return new x(function(r,f){if(Se[e.name]=Se[e.name]||xt(),e.db)if(i)Re(e),e.db.close();else return r(e.db);var h=[e.name];i&&h.push(e.version);var c=j.open.apply(j,h);i&&(c.onupgradeneeded=function(T){var C=c.result;try{C.createObjectStore(e.storeName),T.oldVersion<=1&&C.createObjectStore(le)}catch(M){if(M.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+T.oldVersion+" to version "+T.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw M}}),c.onerror=function(T){T.preventDefault(),f(c.error)},c.onsuccess=function(){var T=c.result;T.onversionchange=function(C){C.target.close()},r(T),we(e)}})}t(Le,"_getConnection");function Qe(e){return Le(e,!1)}t(Qe,"_getOriginalConnection");function rt(e){return Le(e,!0)}t(rt,"_getUpgradedConnection");function at(e,i){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),f=e.version<e.db.version,h=e.version>e.db.version;if(f&&(e.version!==i&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),h||r){if(r){var c=e.db.version+1;c>e.version&&(e.version=c)}return!0}return!1}t(at,"_isUpgradeNeeded");function bt(e){return new x(function(i,r){var f=new FileReader;f.onerror=r,f.onloadend=function(h){var c=btoa(h.target.result||"");i({__local_forage_encoded_blob:!0,data:c,type:e.type})},f.readAsBinaryString(e)})}t(bt,"_encodeBlob");function it(e){var i=V(atob(e.data));return U([i],{type:e.type})}t(it,"_decodeBlob");function _t(e){return e&&e.__local_forage_encoded_blob}t(_t,"_isEncodedBlob");function y(e){var i=this,r=i._initReady().then(function(){var f=Se[i._dbInfo.name];if(f&&f.dbReady)return f.dbReady});return Z(r,e,e),r}t(y,"_fullyReady");function De(e){Re(e);for(var i=Se[e.name],r=i.forages,f=0;f<r.length;f++){var h=r[f];h._dbInfo.db&&(h._dbInfo.db.close(),h._dbInfo.db=null)}return e.db=null,Qe(e).then(function(c){return e.db=c,at(e)?rt(e):c}).then(function(c){e.db=i.db=c;for(var T=0;T<r.length;T++)r[T]._dbInfo.db=c}).catch(function(c){throw Oe(e,c),c})}t(De,"_tryReconnect");function qe(e,i,r,f){f===void 0&&(f=1);try{var h=e.db.transaction(e.storeName,i);r(null,h)}catch(c){if(f>0&&(!e.db||c.name==="InvalidStateError"||c.name==="NotFoundError"))return x.resolve().then(function(){if(!e.db||c.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),rt(e)}).then(function(){return De(e).then(function(){qe(e,i,r,f-1)})}).catch(r);r(c)}}t(qe,"createTransaction");function xt(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}t(xt,"createDbContext");function ft(e){var i=this,r={db:null};if(e)for(var f in e)r[f]=e[f];var h=Se[r.name];h||(h=xt(),Se[r.name]=h),h.forages.push(i),i._initReady||(i._initReady=i.ready,i.ready=y);var c=[];function T(){return x.resolve()}t(T,"ignoreErrors");for(var C=0;C<h.forages.length;C++){var M=h.forages[C];M!==i&&c.push(M._initReady().catch(T))}var B=h.forages.slice(0);return x.all(c).then(function(){return r.db=h.db,Qe(r)}).then(function(J){return r.db=J,at(r,i._defaultConfig.version)?rt(r):J}).then(function(J){r.db=h.db=J,i._dbInfo=r;for(var K=0;K<B.length;K++){var ce=B[K];ce!==i&&(ce._dbInfo.db=r.db,ce._dbInfo.version=r.version)}})}t(ft,"_initStorage");function Ct(e,i){var r=this;e=se(e);var f=new x(function(h,c){r.ready().then(function(){qe(r._dbInfo,fe,function(T,C){if(T)return c(T);try{var M=C.objectStore(r._dbInfo.storeName),B=M.get(e);B.onsuccess=function(){var J=B.result;J===void 0&&(J=null),_t(J)&&(J=it(J)),h(J)},B.onerror=function(){c(B.error)}}catch(J){c(J)}})}).catch(c)});return W(f,i),f}t(Ct,"getItem");function an(e,i){var r=this,f=new x(function(h,c){r.ready().then(function(){qe(r._dbInfo,fe,function(T,C){if(T)return c(T);try{var M=C.objectStore(r._dbInfo.storeName),B=M.openCursor(),J=1;B.onsuccess=function(){var K=B.result;if(K){var ce=K.value;_t(ce)&&(ce=it(ce));var _e=e(ce,K.key,J++);_e!==void 0?h(_e):K.continue()}else h()},B.onerror=function(){c(B.error)}}catch(K){c(K)}})}).catch(c)});return W(f,i),f}t(an,"iterate");function ln(e,i,r){var f=this;e=se(e);var h=new x(function(c,T){var C;f.ready().then(function(){return C=f._dbInfo,We.call(i)==="[object Blob]"?ve(C.db).then(function(M){return M?i:bt(i)}):i}).then(function(M){qe(f._dbInfo,Q,function(B,J){if(B)return T(B);try{var K=J.objectStore(f._dbInfo.storeName);M===null&&(M=void 0);var ce=K.put(M,e);J.oncomplete=function(){M===void 0&&(M=null),c(M)},J.onabort=J.onerror=function(){var _e=ce.error?ce.error:ce.transaction.error;T(_e)}}catch(_e){T(_e)}})}).catch(T)});return W(h,r),h}t(ln,"setItem");function un(e,i){var r=this;e=se(e);var f=new x(function(h,c){r.ready().then(function(){qe(r._dbInfo,Q,function(T,C){if(T)return c(T);try{var M=C.objectStore(r._dbInfo.storeName),B=M.delete(e);C.oncomplete=function(){h()},C.onerror=function(){c(B.error)},C.onabort=function(){var J=B.error?B.error:B.transaction.error;c(J)}}catch(J){c(J)}})}).catch(c)});return W(f,i),f}t(un,"removeItem");function cn(e){var i=this,r=new x(function(f,h){i.ready().then(function(){qe(i._dbInfo,Q,function(c,T){if(c)return h(c);try{var C=T.objectStore(i._dbInfo.storeName),M=C.clear();T.oncomplete=function(){f()},T.onabort=T.onerror=function(){var B=M.error?M.error:M.transaction.error;h(B)}}catch(B){h(B)}})}).catch(h)});return W(r,e),r}t(cn,"clear");function fn(e){var i=this,r=new x(function(f,h){i.ready().then(function(){qe(i._dbInfo,fe,function(c,T){if(c)return h(c);try{var C=T.objectStore(i._dbInfo.storeName),M=C.count();M.onsuccess=function(){f(M.result)},M.onerror=function(){h(M.error)}}catch(B){h(B)}})}).catch(h)});return W(r,e),r}t(fn,"length");function dn(e,i){var r=this,f=new x(function(h,c){if(e<0){h(null);return}r.ready().then(function(){qe(r._dbInfo,fe,function(T,C){if(T)return c(T);try{var M=C.objectStore(r._dbInfo.storeName),B=!1,J=M.openKeyCursor();J.onsuccess=function(){var K=J.result;if(!K){h(null);return}e===0||B?h(K.key):(B=!0,K.advance(e))},J.onerror=function(){c(J.error)}}catch(K){c(K)}})}).catch(c)});return W(f,i),f}t(dn,"key");function $t(e){var i=this,r=new x(function(f,h){i.ready().then(function(){qe(i._dbInfo,fe,function(c,T){if(c)return h(c);try{var C=T.objectStore(i._dbInfo.storeName),M=C.openKeyCursor(),B=[];M.onsuccess=function(){var J=M.result;if(!J){f(B);return}B.push(J.key),J.continue()},M.onerror=function(){h(M.error)}}catch(J){h(J)}})}).catch(h)});return W(r,e),r}t($t,"keys");function dt(e,i){i=ge.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var f=this,h;if(!e.name)h=x.reject("Invalid arguments");else{var c=e.name===r.name&&f._dbInfo.db,T=c?x.resolve(f._dbInfo.db):Qe(e).then(function(C){var M=Se[e.name],B=M.forages;M.db=C;for(var J=0;J<B.length;J++)B[J]._dbInfo.db=C;return C});e.storeName?h=T.then(function(C){if(!!C.objectStoreNames.contains(e.storeName)){var M=C.version+1;Re(e);var B=Se[e.name],J=B.forages;C.close();for(var K=0;K<J.length;K++){var ce=J[K];ce._dbInfo.db=null,ce._dbInfo.version=M}var _e=new x(function(xe,$e){var Ae=j.open(e.name,M);Ae.onerror=function(Ye){var Nt=Ae.result;Nt.close(),$e(Ye)},Ae.onupgradeneeded=function(){var Ye=Ae.result;Ye.deleteObjectStore(e.storeName)},Ae.onsuccess=function(){var Ye=Ae.result;Ye.close(),xe(Ye)}});return _e.then(function(xe){B.db=xe;for(var $e=0;$e<J.length;$e++){var Ae=J[$e];Ae._dbInfo.db=xe,we(Ae._dbInfo)}}).catch(function(xe){throw(Oe(e,xe)||x.resolve()).catch(function(){}),xe})}}):h=T.then(function(C){Re(e);var M=Se[e.name],B=M.forages;C.close();for(var J=0;J<B.length;J++){var K=B[J];K._dbInfo.db=null}var ce=new x(function(_e,xe){var $e=j.deleteDatabase(e.name);$e.onerror=function(){var Ae=$e.result;Ae&&Ae.close(),xe($e.error)},$e.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},$e.onsuccess=function(){var Ae=$e.result;Ae&&Ae.close(),_e(Ae)}});return ce.then(function(_e){M.db=_e;for(var xe=0;xe<B.length;xe++){var $e=B[xe];we($e._dbInfo)}}).catch(function(_e){throw(Oe(e,_e)||x.resolve()).catch(function(){}),_e})})}return W(h,i),h}t(dt,"dropInstance");var ot={_driver:"asyncStorage",_initStorage:ft,_support:D(),iterate:an,getItem:Ct,setItem:ln,removeItem:un,clear:cn,length:fn,key:dn,keys:$t,dropInstance:dt};function Pt(){return typeof openDatabase=="function"}t(Pt,"isWebSQLValid");var Be="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ze="~~local_forage_type~",Et=/^~~local_forage_type~([^~]+)~/,ze="__lfsc__:",st=ze.length,St="arbf",Tt="blob",jt="si08",Ut="ui08",Mt="uic8",Bt="si16",Lt="si32",Ft="ur16",Wt="ui32",Vt="fl32",zt="fl64",et=st+St.length,ht=Object.prototype.toString;function lt(e){var i=e.length*.75,r=e.length,f,h=0,c,T,C,M;e[e.length-1]==="="&&(i--,e[e.length-2]==="="&&i--);var B=new ArrayBuffer(i),J=new Uint8Array(B);for(f=0;f<r;f+=4)c=Be.indexOf(e[f]),T=Be.indexOf(e[f+1]),C=Be.indexOf(e[f+2]),M=Be.indexOf(e[f+3]),J[h++]=c<<2|T>>4,J[h++]=(T&15)<<4|C>>2,J[h++]=(C&3)<<6|M&63;return B}t(lt,"stringToBuffer");function Ot(e){var i=new Uint8Array(e),r="",f;for(f=0;f<i.length;f+=3)r+=Be[i[f]>>2],r+=Be[(i[f]&3)<<4|i[f+1]>>4],r+=Be[(i[f+1]&15)<<2|i[f+2]>>6],r+=Be[i[f+2]&63];return i.length%3===2?r=r.substring(0,r.length-1)+"=":i.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}t(Ot,"bufferToString");function hn(e,i){var r="";if(e&&(r=ht.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&ht.call(e.buffer)==="[object ArrayBuffer]")){var f,h=ze;e instanceof ArrayBuffer?(f=e,h+=St):(f=e.buffer,r==="[object Int8Array]"?h+=jt:r==="[object Uint8Array]"?h+=Ut:r==="[object Uint8ClampedArray]"?h+=Mt:r==="[object Int16Array]"?h+=Bt:r==="[object Uint16Array]"?h+=Ft:r==="[object Int32Array]"?h+=Lt:r==="[object Uint32Array]"?h+=Wt:r==="[object Float32Array]"?h+=Vt:r==="[object Float64Array]"?h+=zt:i(new Error("Failed to get type for BinaryArray"))),i(h+Ot(f))}else if(r==="[object Blob]"){var c=new FileReader;c.onload=function(){var T=Ze+e.type+"~"+Ot(this.result);i(ze+Tt+T)},c.readAsArrayBuffer(e)}else try{i(JSON.stringify(e))}catch(T){console.error("Couldn't convert value into a JSON string: ",e),i(null,T)}}t(hn,"serialize");function mn(e){if(e.substring(0,st)!==ze)return JSON.parse(e);var i=e.substring(et),r=e.substring(st,et),f;if(r===Tt&&Et.test(i)){var h=i.match(Et);f=h[1],i=i.substring(h[0].length)}var c=lt(i);switch(r){case St:return c;case Tt:return U([c],{type:f});case jt:return new Int8Array(c);case Ut:return new Uint8Array(c);case Mt:return new Uint8ClampedArray(c);case Bt:return new Int16Array(c);case Ft:return new Uint16Array(c);case Lt:return new Int32Array(c);case Wt:return new Uint32Array(c);case Vt:return new Float32Array(c);case zt:return new Float64Array(c);default:throw new Error("Unkown type: "+r)}}t(mn,"deserialize");var o={serialize:hn,deserialize:mn,stringToBuffer:lt,bufferToString:Ot};function l(e,i,r,f){e.executeSql("CREATE TABLE IF NOT EXISTS "+i.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,f)}t(l,"createDbTable");function m(e){var i=this,r={db:null};if(e)for(var f in e)r[f]=typeof e[f]!="string"?e[f].toString():e[f];var h=new x(function(c,T){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(C){return T(C)}r.db.transaction(function(C){l(C,r,function(){i._dbInfo=r,c()},function(M,B){T(B)})},T)});return r.serializer=o,h}t(m,"_initStorage$1");function R(e,i,r,f,h,c){e.executeSql(r,f,h,function(T,C){C.code===C.SYNTAX_ERR?T.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[i.storeName],function(M,B){B.rows.length?c(M,C):l(M,i,function(){M.executeSql(r,f,h,c)},c)},c):c(T,C)},c)}t(R,"tryExecuteSql");function P(e,i){var r=this;e=se(e);var f=new x(function(h,c){r.ready().then(function(){var T=r._dbInfo;T.db.transaction(function(C){R(C,T,"SELECT * FROM "+T.storeName+" WHERE key = ? LIMIT 1",[e],function(M,B){var J=B.rows.length?B.rows.item(0).value:null;J&&(J=T.serializer.deserialize(J)),h(J)},function(M,B){c(B)})})}).catch(c)});return W(f,i),f}t(P,"getItem$1");function Y(e,i){var r=this,f=new x(function(h,c){r.ready().then(function(){var T=r._dbInfo;T.db.transaction(function(C){R(C,T,"SELECT * FROM "+T.storeName,[],function(M,B){for(var J=B.rows,K=J.length,ce=0;ce<K;ce++){var _e=J.item(ce),xe=_e.value;if(xe&&(xe=T.serializer.deserialize(xe)),xe=e(xe,_e.key,ce+1),xe!==void 0){h(xe);return}}h()},function(M,B){c(B)})})}).catch(c)});return W(f,i),f}t(Y,"iterate$1");function O(e,i,r,f){var h=this;e=se(e);var c=new x(function(T,C){h.ready().then(function(){i===void 0&&(i=null);var M=i,B=h._dbInfo;B.serializer.serialize(i,function(J,K){K?C(K):B.db.transaction(function(ce){R(ce,B,"INSERT OR REPLACE INTO "+B.storeName+" (key, value) VALUES (?, ?)",[e,J],function(){T(M)},function(_e,xe){C(xe)})},function(ce){if(ce.code===ce.QUOTA_ERR){if(f>0){T(O.apply(h,[e,M,r,f-1]));return}C(ce)}})})}).catch(C)});return W(c,r),c}t(O,"_setItem");function L(e,i,r){return O.apply(this,[e,i,r,1])}t(L,"setItem$1");function N(e,i){var r=this;e=se(e);var f=new x(function(h,c){r.ready().then(function(){var T=r._dbInfo;T.db.transaction(function(C){R(C,T,"DELETE FROM "+T.storeName+" WHERE key = ?",[e],function(){h()},function(M,B){c(B)})})}).catch(c)});return W(f,i),f}t(N,"removeItem$1");function ee(e){var i=this,r=new x(function(f,h){i.ready().then(function(){var c=i._dbInfo;c.db.transaction(function(T){R(T,c,"DELETE FROM "+c.storeName,[],function(){f()},function(C,M){h(M)})})}).catch(h)});return W(r,e),r}t(ee,"clear$1");function ie(e){var i=this,r=new x(function(f,h){i.ready().then(function(){var c=i._dbInfo;c.db.transaction(function(T){R(T,c,"SELECT COUNT(key) as c FROM "+c.storeName,[],function(C,M){var B=M.rows.item(0).c;f(B)},function(C,M){h(M)})})}).catch(h)});return W(r,e),r}t(ie,"length$1");function X(e,i){var r=this,f=new x(function(h,c){r.ready().then(function(){var T=r._dbInfo;T.db.transaction(function(C){R(C,T,"SELECT key FROM "+T.storeName+" WHERE id = ? LIMIT 1",[e+1],function(M,B){var J=B.rows.length?B.rows.item(0).key:null;h(J)},function(M,B){c(B)})})}).catch(c)});return W(f,i),f}t(X,"key$1");function G(e){var i=this,r=new x(function(f,h){i.ready().then(function(){var c=i._dbInfo;c.db.transaction(function(T){R(T,c,"SELECT key FROM "+c.storeName,[],function(C,M){for(var B=[],J=0;J<M.rows.length;J++)B.push(M.rows.item(J).key);f(B)},function(C,M){h(M)})})}).catch(h)});return W(r,e),r}t(G,"keys$1");function he(e){return new x(function(i,r){e.transaction(function(f){f.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(h,c){for(var T=[],C=0;C<c.rows.length;C++)T.push(c.rows.item(C).name);i({db:e,storeNames:T})},function(h,c){r(c)})},function(f){r(f)})})}t(he,"getAllStoreNames");function ue(e,i){i=ge.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var f=this,h;return e.name?h=new x(function(c){var T;e.name===r.name?T=f._dbInfo.db:T=openDatabase(e.name,"","",0),e.storeName?c({db:T,storeNames:[e.storeName]}):c(he(T))}).then(function(c){return new x(function(T,C){c.db.transaction(function(M){function B(_e){return new x(function(xe,$e){M.executeSql("DROP TABLE IF EXISTS "+_e,[],function(){xe()},function(Ae,Ye){$e(Ye)})})}t(B,"dropTable");for(var J=[],K=0,ce=c.storeNames.length;K<ce;K++)J.push(B(c.storeNames[K]));x.all(J).then(function(){T()}).catch(function(_e){C(_e)})},function(M){C(M)})})}):h=x.reject("Invalid arguments"),W(h,i),h}t(ue,"dropInstance$1");var te={_driver:"webSQLStorage",_initStorage:m,_support:Pt(),iterate:Y,getItem:P,setItem:L,removeItem:N,clear:ee,length:ie,key:X,keys:G,dropInstance:ue};function z(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}t(z,"isLocalStorageValid");function F(e,i){var r=e.name+"/";return e.storeName!==i.storeName&&(r+=e.storeName+"/"),r}t(F,"_getKeyPrefix");function $(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}t($,"checkIfLocalStorageThrows");function k(){return!$()||localStorage.length>0}t(k,"_isLocalStorageUsable");function b(e){var i=this,r={};if(e)for(var f in e)r[f]=e[f];return r.keyPrefix=F(e,i._defaultConfig),k()?(i._dbInfo=r,r.serializer=o,x.resolve()):x.reject()}t(b,"_initStorage$2");function A(e){var i=this,r=i.ready().then(function(){for(var f=i._dbInfo.keyPrefix,h=localStorage.length-1;h>=0;h--){var c=localStorage.key(h);c.indexOf(f)===0&&localStorage.removeItem(c)}});return W(r,e),r}t(A,"clear$2");function H(e,i){var r=this;e=se(e);var f=r.ready().then(function(){var h=r._dbInfo,c=localStorage.getItem(h.keyPrefix+e);return c&&(c=h.serializer.deserialize(c)),c});return W(f,i),f}t(H,"getItem$2");function a(e,i){var r=this,f=r.ready().then(function(){for(var h=r._dbInfo,c=h.keyPrefix,T=c.length,C=localStorage.length,M=1,B=0;B<C;B++){var J=localStorage.key(B);if(J.indexOf(c)===0){var K=localStorage.getItem(J);if(K&&(K=h.serializer.deserialize(K)),K=e(K,J.substring(T),M++),K!==void 0)return K}}});return W(f,i),f}t(a,"iterate$2");function E(e,i){var r=this,f=r.ready().then(function(){var h=r._dbInfo,c;try{c=localStorage.key(e)}catch{c=null}return c&&(c=c.substring(h.keyPrefix.length)),c});return W(f,i),f}t(E,"key$2");function S(e){var i=this,r=i.ready().then(function(){for(var f=i._dbInfo,h=localStorage.length,c=[],T=0;T<h;T++){var C=localStorage.key(T);C.indexOf(f.keyPrefix)===0&&c.push(C.substring(f.keyPrefix.length))}return c});return W(r,e),r}t(S,"keys$2");function I(e){var i=this,r=i.keys().then(function(f){return f.length});return W(r,e),r}t(I,"length$2");function q(e,i){var r=this;e=se(e);var f=r.ready().then(function(){var h=r._dbInfo;localStorage.removeItem(h.keyPrefix+e)});return W(f,i),f}t(q,"removeItem$2");function oe(e,i,r){var f=this;e=se(e);var h=f.ready().then(function(){i===void 0&&(i=null);var c=i;return new x(function(T,C){var M=f._dbInfo;M.serializer.serialize(i,function(B,J){if(J)C(J);else try{localStorage.setItem(M.keyPrefix+e,B),T(c)}catch(K){(K.name==="QuotaExceededError"||K.name==="NS_ERROR_DOM_QUOTA_REACHED")&&C(K),C(K)}})})});return W(h,r),h}t(oe,"setItem$2");function re(e,i){if(i=ge.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var f=this,h;return e.name?h=new x(function(c){e.storeName?c(F(e,f._defaultConfig)):c(e.name+"/")}).then(function(c){for(var T=localStorage.length-1;T>=0;T--){var C=localStorage.key(T);C.indexOf(c)===0&&localStorage.removeItem(C)}}):h=x.reject("Invalid arguments"),W(h,i),h}t(re,"dropInstance$2");var me={_driver:"localStorageWrapper",_initStorage:b,_support:z(),iterate:a,getItem:H,setItem:oe,removeItem:q,clear:A,length:I,key:E,keys:S,dropInstance:re},de=t(function(i,r){return i===r||typeof i=="number"&&typeof r=="number"&&isNaN(i)&&isNaN(r)},"sameValue"),ne=t(function(i,r){for(var f=i.length,h=0;h<f;){if(de(i[h],r))return!0;h++}return!1},"includes"),be=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},Ne={},Ce={},Ee={INDEXEDDB:ot,WEBSQL:te,LOCALSTORAGE:me},ye=[Ee.INDEXEDDB._driver,Ee.WEBSQL._driver,Ee.LOCALSTORAGE._driver],pe=["dropInstance"],Te=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(pe),Ve={description:"",driver:ye.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function tt(e,i){e[i]=function(){var r=arguments;return e.ready().then(function(){return e[i].apply(e,r)})}}t(tt,"callWhenReady");function nt(){for(var e=1;e<arguments.length;e++){var i=arguments[e];if(i)for(var r in i)i.hasOwnProperty(r)&&(be(i[r])?arguments[0][r]=i[r].slice():arguments[0][r]=i[r])}return arguments[0]}t(nt,"extend");var Je=function(){function e(i){v(this,e);for(var r in Ee)if(Ee.hasOwnProperty(r)){var f=Ee[r],h=f._driver;this[r]=h,Ne[h]||this.defineDriver(f)}this._defaultConfig=nt({},Ve),this._config=nt({},this._defaultConfig,i),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return t(e,"LocalForage"),e.prototype.config=t(function(r){if((typeof r>"u"?"undefined":d(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var f in r){if(f==="storeName"&&(r[f]=r[f].replace(/\W/g,"_")),f==="version"&&typeof r[f]!="number")return new Error("Database version must be a number.");this._config[f]=r[f]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},"config"),e.prototype.defineDriver=t(function(r,f,h){var c=new x(function(T,C){try{var M=r._driver,B=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){C(B);return}for(var J=Te.concat("_initStorage"),K=0,ce=J.length;K<ce;K++){var _e=J[K],xe=!ne(pe,_e);if((xe||r[_e])&&typeof r[_e]!="function"){C(B);return}}var $e=t(function(){for(var Nt=t(function(pr){return function(){var gr=new Error("Method "+pr+" is not implemented by the current driver"),Dn=x.reject(gr);return W(Dn,arguments[arguments.length-1]),Dn}},"methodNotImplementedFactory"),pn=0,mr=pe.length;pn<mr;pn++){var gn=pe[pn];r[gn]||(r[gn]=Nt(gn))}},"configureMissingMethods");$e();var Ae=t(function(Nt){Ne[M]&&console.info("Redefining LocalForage driver: "+M),Ne[M]=r,Ce[M]=Nt,T()},"setDriverSupport");"_support"in r?r._support&&typeof r._support=="function"?r._support().then(Ae,C):Ae(!!r._support):Ae(!0)}catch(Ye){C(Ye)}});return Z(c,f,h),c},"defineDriver"),e.prototype.driver=t(function(){return this._driver||null},"driver"),e.prototype.getDriver=t(function(r,f,h){var c=Ne[r]?x.resolve(Ne[r]):x.reject(new Error("Driver not found."));return Z(c,f,h),c},"getDriver"),e.prototype.getSerializer=t(function(r){var f=x.resolve(o);return Z(f,r),f},"getSerializer"),e.prototype.ready=t(function(r){var f=this,h=f._driverSet.then(function(){return f._ready===null&&(f._ready=f._initDriver()),f._ready});return Z(h,r,r),h},"ready"),e.prototype.setDriver=t(function(r,f,h){var c=this;be(r)||(r=[r]);var T=this._getSupportedDrivers(r);function C(){c._config.driver=c.driver()}t(C,"setDriverToConfig");function M(K){return c._extend(K),C(),c._ready=c._initStorage(c._config),c._ready}t(M,"extendSelfWithDriver");function B(K){return function(){var ce=0;function _e(){for(;ce<K.length;){var xe=K[ce];return ce++,c._dbInfo=null,c._ready=null,c.getDriver(xe).then(M).catch(_e)}C();var $e=new Error("No available storage method found.");return c._driverSet=x.reject($e),c._driverSet}return t(_e,"driverPromiseLoop"),_e()}}t(B,"initDriver");var J=this._driverSet!==null?this._driverSet.catch(function(){return x.resolve()}):x.resolve();return this._driverSet=J.then(function(){var K=T[0];return c._dbInfo=null,c._ready=null,c.getDriver(K).then(function(ce){c._driver=ce._driver,C(),c._wrapLibraryMethodsWithReady(),c._initDriver=B(T)})}).catch(function(){C();var K=new Error("No available storage method found.");return c._driverSet=x.reject(K),c._driverSet}),Z(this._driverSet,f,h),this._driverSet},"setDriver"),e.prototype.supports=t(function(r){return!!Ce[r]},"supports"),e.prototype._extend=t(function(r){nt(this,r)},"_extend"),e.prototype._getSupportedDrivers=t(function(r){for(var f=[],h=0,c=r.length;h<c;h++){var T=r[h];this.supports(T)&&f.push(T)}return f},"_getSupportedDrivers"),e.prototype._wrapLibraryMethodsWithReady=t(function(){for(var r=0,f=Te.length;r<f;r++)tt(this,Te[r])},"_wrapLibraryMethodsWithReady"),e.prototype.createInstance=t(function(r){return new e(r)},"createInstance"),e}(),Fe=new Je;g.exports=Fe},{3:3}]},{},[4])(4)})});ke();var dr=Ge(Un(),1);ke();var br=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(8);return{execute:(d,v,_)=>(w&&_&&(d=n.getNode(d[v+1]))&&(_=d.transferControlToOffscreen(),u.messageToWorker({12:9,13:[d._index_],38:_},[_])),v+2)}},"e"),_r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],Bn=t((s,n)=>Array.prototype.forEach.call(s,n),"n"),Yt=class{constructor(n,u){this.nodes=this.count=this.stringContext=this.baseElement=void 0,this.createNodes=(p,g)=>{let w=(p=new Uint16Array(p)).length;for(let v=0;v<w;v+=5){var d=void 0;if(p[v+1]===3)d=document.createTextNode(this.stringContext.get(p[v+3]));else if(p[v+1]===8)d=document.createComment(this.stringContext.get(p[v+3]));else if(p[v+1]===11)d=document.createDocumentFragment();else if(d=this.stringContext.get(p[v+2]),d=p[v+4]!==0?document.createElementNS(this.stringContext.get(p[v+4]),d):document.createElement(d),g&&!g.sanitize(d))continue;this.storeNode(d,p[v])}},this.getNode=p=>(p=this.nodes.get(p))&&p.nodeName==="BODY"?this.baseElement:p,this.storeNodes=p=>{this.storeNode(p,++this.count),Bn(p.childNodes,g=>this.storeNodes(g))},this.count=2,this.stringContext=n,this.nodes=new Map([[1,u],[2,u]]),this.baseElement=u,u._index_=2,Bn(u.childNodes,p=>this.storeNodes(p))}storeNode(n,u){n._index_=u,this.nodes.set(u,n)}};t(Yt,"r");var Ln=new Map,yn=t((s,n)=>{n&&"value"in n&&n.oninput===null&&(n.oninput=()=>bn(s,n))},"o"),wn=t((s,n)=>{n&&"value"in n&&!Ln.get(n)&&(new MutationObserver(u=>u.map(p=>bn(s,p.target))).observe(n,{attributes:!0}),Ln.set(n,!0))},"i"),bn=t((s,n)=>s.messageToWorker({12:4,40:{7:n._index_,21:n.value}}),"l"),Fn=t(s=>Object.values(s).map(n=>[n.identifier,n.screenX,n.screenY,n.clientX,n.clientY,n.pageX,n.pageY,n.target._index_]),"u"),xr=t((s,n,u,p,g)=>{let w=[],d=g.executorsAllowed.includes(4),v=[window.innerWidth,window.innerHeight],_=t((j,D)=>U=>{D&&U.preventDefault();var x=U.currentTarget;if(x&&"value"in x)bn(u,U.currentTarget);else if(U.type==="resize"){let{innerWidth:W,innerHeight:Z}=window;if(v[0]===W&&v[1]===Z)return;v=[window.innerWidth,window.innerHeight],u.messageToWorker({12:5,40:v})}u.messageToWorker({12:1,39:{7:j,25:U.bubbles,26:U.cancelable,27:U.cancelBubble,28:[U.currentTarget._index_||0],29:U.defaultPrevented,30:U.eventPhase,31:U.isTrusted,32:U.returnValue,13:[U.target._index_||0],33:U.timeStamp,12:U.type,35:"keyCode"in U?U.keyCode:void 0,60:"pageX"in U?U.pageX:void 0,61:"pageY"in U?U.pageY:void 0,65:"offsetX"in U?U.offsetX:void 0,66:"offsetY"in U?U.offsetY:void 0,62:"touches"in U?Fn(U.touches):void 0,63:"changedTouches"in U?Fn(U.changedTouches):void 0}})},"h");return{execute(j,D,U){var x=j[D+2];let W=D+4+2*x;if(x=D+4+6*j[D+3]+2*x,d&&U&&(U=n.getNode(j[D+1]))){let le=D+4;for(;le<x;){let je=le<=W;e:{D=U;var Z=je,se=j,ge=le;let Se=s.get(se[ge]),We=se[ge+1];if(D===n.baseElement){Z?addEventListener(Se,w[We]=_(1,!!se[ge+5])):removeEventListener(Se,w[We]);break e}let fe=D.oninput!==null,Q=Se==="change";Z?(Q&&(fe=!0,D.onchange=null),D.addEventListener(Se,w[We]=_(D._index_,!!se[ge+5]))):(Q&&(fe=!1),D.removeEventListener(Se,w[We])),D&&"value"in D&&(fe||yn(u,D),wn(u,D))}le+=je?2:6}}return x}}},"a"),Er=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(5);return{execute:(d,v,_)=>(w&&_&&(d=n.getNode(d[v+1]))&&(_=d.getBoundingClientRect(),u.messageToWorker({12:6,13:[d._index_],38:[_.top,_.right,_.bottom,_.left,_.width,_.height]})),v+2)}},"c"),Sr=t((s,{getNode:n},u,p,g)=>{let w=g.executorsAllowed.includes(2);return{execute(d,v,_){let j=d[v+4],D=d[v+5];if(w&&_){let U=n(d[v+1]);U&&(0<D&&d.slice(v+6+j,v+6+j+D).forEach(x=>{(x=n(x))&&x.remove()}),0<j&&d.slice(v+6,v+6+j).forEach(x=>{let W=d[v+2];(x=n(x))&&(U.insertBefore(x,W&&n(W)||null),yn(u,x),wn(u,x))}))}return v+6+j+D}}},"d"),Tr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(0);return{execute(d,v,_){if(w&&_){_=n.getNode(d[v+1]);let j=s.get(d[v+2]);d=(d=d[v+4])!==0?s.get(d-1):null,_&&j!=null&&(g.sanitizer?g.sanitizer.setAttribute(_,j,d):d==null?_.removeAttribute(j):_.setAttribute(j,d))}return v+5}}},"h"),Or=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(1);return{execute:(d,v,_)=>(w&&_&&(_=n.getNode(d[v+1]),d=d[v+2],_&&d&&(_.textContent=s.get(d))),v+3)}},"g"),Nr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(3);return{execute(d,v,_){if(w&&_){_=n.getNode(d[v+1]);let j=s.get(d[v+2]);{let D=d[v+4];d=d[v+3]===1?D===1:D!==0?s.get(D):null}_&&j&&d!=null&&(g.sanitizer?g.sanitizer.setProperty(_,j,String(d)):_[j]=d)}return v+5}}},"f"),kr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(6),d,v=0;return{execute(_,j,D){if(w&&D&&g.longTask)if(_[j]===6){if(v++,!d){let U=new Promise(x=>d=x);Promise.resolve().then(()=>g.longTask&&g.longTask(U))}}else _[j]===7&&(v--,d&&0>=v&&(d(),d=null,v=0));return j+2},get active(){return d!==null}}},"p"),zn=new Float32Array(1),Wn=new Uint16Array(zn.buffer);function Rt(s,n,u,p,g,w){let d=[];for(let _=0;_<u;_++)switch(s[n++]){case 1:d.push(s[n++]);break;case 2:Wn[0]=s[n++],Wn[1]=s[n++],d.push(zn[0]);break;case 3:d.push(p.get(s[n++]));break;case 4:var v=s[n++];n=Rt(s,n,v,p,g,w),d.push(n.args),n=n.offset;break;case 5:if(!w)throw Error("objectContext not provided.");d.push(w.get(s[n++]));break;case 6:v=g.getNode(s[n++]),d.push(v.getContext("2d"));break;case 7:d.push(g.getNode(s[n++]));break;default:throw Error("Cannot deserialize argument.")}return{args:d,offset:n}}t(Rt,"x");var Rr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(9);return{execute(d,v,_){let j=s.get(d[v+1]),D=d[v+2],{offset:U,args:x}=Rt(d,v+3,1,s,n,p);v=x[0];let{offset:W,args:Z}=Rt(d,U,D,s,n,p);return w&&_&&(Jn(v,j)?v[j]=Z[0]:v[j](...Z)),W}}},"v");function Jn(s,n){if(!s)throw Error(`Property ${n} does not exist on ${s}.`);let u=Object.getOwnPropertyDescriptor(s,n);return u!==void 0?"set"in u:Jn(Object.getPrototypeOf(s),n)}t(Jn,"b");var Ar=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(10);if(!p)throw Error("objectContext is not defined.");return{execute(d,v,_){let j=s.get(d[v+1]),D=d[v+2],U=d[v+3],{offset:x,args:W}=Rt(d,v+4,1,s,n,p);v=W[0];let{offset:Z,args:se}=Rt(d,x,U,s,n,p);return w&&_&&j!=="new"&&p.store(D,v[j](...se)),Z}}},"k"),Ir=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(11);return{execute:(d,v,_)=>(w&&_&&(_=n.getNode(d[v+1]))&&self.createImageBitmap(_).then(j=>{u.messageToWorker({12:10,73:d[v+2],38:j},[j])}),v+3)}},"y"),Dr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(12);return{execute(d,v,_){if(w&&_){_=d[v+1];var j=d[v+2],D=d[v+3];let U=d[v+4];if(d=0<D?s.get(D-1):"",D=0<U?s.get(U-1):null,_===1)((x,W)=>{g.sanitizer&&x===2&&g.sanitizer.getStorage(x,W).then(Z=>{u.messageToWorker({12:11,74:W,75:x,21:Z})})})(j,d);else if(_===2)if(_=j,j=d,d=D,g.sanitizer)g.sanitizer.setStorage(_,j,d);else{let x;if(_===0?x=window.localStorage:_===1&&(x=window.sessionStorage),x)if(j==null){if(d!=null)throw Error("Unexpected storage operation.");x.clear()}else d==null?x.removeItem(j):x.setItem(j,d)}}return v+5}}},"N"),vn=0,Gt={},Cr=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(13);return{execute(d,v){if(w){let _=d[v+1],j=d[v+2];d=d[v+3],d=s.hasIndex(d)?JSON.parse(s.get(d)):void 0,_===1?Gt[j].resolve(d):Gt[j].reject(d),delete Gt[j]}return v+4}}},"O"),$r=t((s,n,u,p,g)=>{let w=g.executorsAllowed.includes(14);return{execute:(d,v,_)=>(w&&_&&(d=n.getNode(d[v+1]))&&d.scrollIntoView(),v+2)}},"_"),Ht=class{constructor(n,u,p,g,w){this.nodeContext=this.stringContext=void 0,this.mutationQueue=[],this.pendingMutations=!1,this.executors=this.sanitizer=this.mutationPumpFunction=void 0,this.syncFlush=(d=!0)=>{let v=[];return this.mutationQueue.forEach(_=>{let j=_.length,D=0;for(;D<j;){let x=_[D];var U;if(!(U=d)){e:switch(x){case 4:case 5:case 6:case 7:case 12:case 8:case 13:U=!1;break e;default:U=!0}U=!U}U||v.push(x),D=this.executors[x].execute(_,D,U)}}),this.mutationQueue=[],this.pendingMutations=!1,v},this.stringContext=n,this.nodeContext=u,this.sanitizer=g.sanitizer,this.mutationPumpFunction=g.mutationPump,u=kr.apply(null,n=[n,u,p,w,g]),this.executors={2:Sr.apply(null,n),0:Tr.apply(null,n),1:Or.apply(null,n),3:Nr.apply(null,n),4:xr.apply(null,n),5:Er.apply(null,n),6:u,7:u,8:br.apply(null,n),9:Rr.apply(null,n),10:Ar.apply(null,n),11:Ir.apply(null,n),12:Dr.apply(null,n),13:Cr.apply(null,n),14:$r.apply(null,n)}}mutate(n,u,p,g){this.stringContext.storeValues(p),this.nodeContext.createNodes(u,this.sanitizer),this.mutationQueue=this.mutationQueue.concat(g),this.pendingMutations||(this.pendingMutations=!0,this.mutationPumpFunction(this.syncFlush,n))}};t(Ht,"E");var Qt=class{constructor(){this.strings=[]}get(n){return this.strings[n]||""}hasIndex(n){return this.strings[n]!==void 0}store(n){return this.strings.push(n),this.strings.length-1}storeValues(n){n.forEach(u=>this.store(u))}};t(Qt,"T");var Pr=[8,3];function Yn(s,n,u,p){var g=[].slice.call(s.childNodes).filter(u);return g={7:s._index_,11:0,0:s.nodeType,1:n(s.localName||s.nodeName),4:g.map(w=>Yn(w,n,u,p)),2:[].map.call(s.attributes||[],w=>[n(w.namespaceURI||"null"),n(w.name),n(w.value)])},s.namespaceURI!=null&&(g[6]=n(s.namespaceURI)),Pr.includes(s.nodeType)&&s.textContent!==null&&(g[5]=n(s.textContent)),yn(p,s),wn(p,s),g}t(Yn,"S");var qt=class{constructor(n,u,p,g,w){this[55]=void 0,this.nodeContext=u,this.config=w;let{skeleton:d,strings:v}=function(U,x,W){x=x.hydrateFilter||(()=>!0);let Z=[],se=new Map;return{skeleton:Yn(U,ge=>{if(se.has(ge))return se.get(ge);let le=Z.length;return se.set(ge,le),Z.push(ge),le},x,W),strings:Z}}(n,w,this);u=[];let _=[],j=Vn("localStorage"),D=Vn("sessionStorage");for(let U in n.style)u.push(U);for(let U in n)U.startsWith("on")&&_.push(U);p=`'use strict';(function(){${p}self['window']=self;var workerDOM=WorkerThread.workerDOM;WorkerThread.hydrate(workerDOM.document,${JSON.stringify(v)},${JSON.stringify(d)},${JSON.stringify(u)},${JSON.stringify(_)},[${window.innerWidth},${window.innerHeight}],${JSON.stringify(j)},${JSON.stringify(D)});workerDOM.document[59](this);Object.assign(self,workerDOM);}).call(self);${g}//# sourceURL=${encodeURI(w.authorURL)}`,w.sandbox||(this[55]=new Worker(URL.createObjectURL(new Blob([p])))),w.onCreateWorker&&w.onCreateWorker(n,v,d,u)}ready(){return this.worker.readyPromise||Promise.resolve()}get worker(){return this[55]}messageToWorker(n,u){this.config.onSendMessage&&this.config.onSendMessage(n),this.worker.postMessage(n,u||[])}};t(qt,"U");function Vn(s,n){try{return n?{storage:n.getStorage(s=="localStorage"?0:1),errorMsg:null}:{storage:window[s],errorMsg:null}}catch(u){return{errorMsg:u.message,storage:null}}}t(Vn,"W");var Kt=class{constructor(){this.objects=void 0,this.objects=new Map}store(n,u){this.objects.set(n,u)}get(n){let u=this.objects.get(n);if(u)return u;throw Error("Object with id ("+n+") does not exist.")}};t(Kt,"P");var Xt=class{constructor(n,u){this.workerContext_=n,this.config=u}callFunction(n,...u){if(!this.config.executorsAllowed.includes(13))throw Error(`[worker-dom]: Error calling ${n}. You must enable the FUNCTION_CALL executor within the config.`);let{promise:p,index:g}=function(){let w,d,v=new Promise((j,D)=>{w=j,d=D});vn>=Number.MAX_VALUE&&(vn=0);let _=vn++;return Gt[_]={promise:v,resolve:w,reject:d},{promise:v,index:_}}();return n={12:12,77:n,78:JSON.stringify(u),7:g},this.workerContext_.messageToWorker(n),p}set onerror(n){this.workerContext_.worker.onerror=n}terminate(){this.workerContext_.worker.terminate()}};t(Xt,"L");var jr=[3,2];function Ur(s,n){return function(u,p,g){var w=p.dataset.shadowDom;if(w==="open"||w==="closed"){w=p.attachShadow({mode:w});let D=p.cloneNode(!0);w.appendChild(D),p=D}let d=new Qt,v=new Kt,_=new Yt(d,p),j=function(D){return Object.assign({},{mutationPump:requestAnimationFrame.bind(null),executorsAllowed:_r},D)}(g);return u.then(([D,U])=>{if(D&&U&&g.authorURL){let x=new qt(p,_,D,U,j),W=new Ht(d,_,x,j,v);return x.worker.onmessage=Z=>{let{data:se}=Z;jr.includes(se[12])&&(W.mutate(se[54],se[37],se[41],new Uint16Array(se[36])),g.onReceiveMessage)&&g.onReceiveMessage(Z)},x.ready().then(()=>new Xt(x,j))}return null})}(Promise.all([fetch(n.domURL).then(u=>u.text()),fetch(n.authorURL).then(u=>u.text())]),s,n)}t(Ur,"j");function Gn(s,n){let u=s.getAttribute("src");return u?Ur(s,{authorURL:u,domURL:n}):Promise.resolve(null)}t(Gn,"upgradeElement");var yt=Ge(yr(),1);ke();var ii=new Error("timeout while waiting for mutex to become available"),oi=new Error("mutex already locked"),Mr=new Error("request for lock canceled"),Br=function(s,n,u,p){function g(w){return w instanceof u?w:new u(function(d){d(w)})}return t(g,"adopt"),new(u||(u=Promise))(function(w,d){function v(D){try{j(p.next(D))}catch(U){d(U)}}t(v,"fulfilled");function _(D){try{j(p.throw(D))}catch(U){d(U)}}t(_,"rejected");function j(D){D.done?w(D.value):g(D.value).then(v,_)}t(j,"step"),j((p=p.apply(s,n||[])).next())})},Zt=class{constructor(n,u=Mr){this._value=n,this._cancelError=u,this._weightedQueues=[],this._weightedWaiters=[]}acquire(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise((u,p)=>{this._weightedQueues[n-1]||(this._weightedQueues[n-1]=[]),this._weightedQueues[n-1].push({resolve:u,reject:p}),this._dispatch()})}runExclusive(n,u=1){return Br(this,void 0,void 0,function*(){let[p,g]=yield this.acquire(u);try{return yield n(p)}finally{g()}})}waitForUnlock(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise(u=>{this._weightedWaiters[n-1]||(this._weightedWaiters[n-1]=[]),this._weightedWaiters[n-1].push(u),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(n){this._value=n,this._dispatch()}release(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);this._value+=n,this._dispatch()}cancel(){this._weightedQueues.forEach(n=>n.forEach(u=>u.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var n;for(let u=this._value;u>0;u--){let p=(n=this._weightedQueues[u-1])===null||n===void 0?void 0:n.shift();if(!p)continue;let g=this._value,w=u;this._value-=u,u=this._value+1,p.resolve([g,this._newReleaser(w)])}this._drainUnlockWaiters()}_newReleaser(n){let u=!1;return()=>{u||(u=!0,this.release(n))}}_drainUnlockWaiters(){for(let n=this._value;n>0;n--)!this._weightedWaiters[n-1]||(this._weightedWaiters[n-1].forEach(u=>u()),this._weightedWaiters[n-1]=[])}};t(Zt,"Semaphore");var Lr=function(s,n,u,p){function g(w){return w instanceof u?w:new u(function(d){d(w)})}return t(g,"adopt"),new(u||(u=Promise))(function(w,d){function v(D){try{j(p.next(D))}catch(U){d(U)}}t(v,"fulfilled");function _(D){try{j(p.throw(D))}catch(U){d(U)}}t(_,"rejected");function j(D){D.done?w(D.value):g(D.value).then(v,_)}t(j,"step"),j((p=p.apply(s,n||[])).next())})},At=class{constructor(n){this._semaphore=new Zt(1,n)}acquire(){return Lr(this,void 0,void 0,function*(){let[,n]=yield this._semaphore.acquire();return n})}runExclusive(n){return this._semaphore.runExclusive(()=>n())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};t(At,"Mutex");ke();var vt=Ge(xn(),1);ke();ke();var sr=Ge(vr(),1);ke();var qn=Ge(Un(),1),Kn=Ge(wr(),1);ke();async function en(s){return new Promise(n=>{setTimeout(()=>{n(s)},s)})}t(en,"wait");var En=Ge(Jt(),1),Me={md5Hash:"",wait:1,res:null,codeSpace:"",waitForDiv:async s=>{if(Me.md5Hash!==s)return"";Me.res?.innerHTML||await Hn(),Me.wait*=2,await en(Me.wait),Me.res?.innerHTML.includes(s)||await Hn();let n=Me.res?.innerHTML;return n?.includes(s)&&Me.res?.firstElementChild?.innerHTML!==""?n:(Me.wait=Me.wait*2,await Me.waitForDiv(s))},setApp:s=>{let n=document.createElement("div");n.style.visibility="hidden",n.style.position="absolute";let u=(0,Kn.createRoot)(n),p=apps[s];return Me.md5Hash=s,Me.res=n,u.render((0,En.jsx)(qn.StrictMode,{children:(0,En.jsx)(p,{appId:`${Me.codeSpace}-${s}`})})),()=>{u.unmount(),n.remove()}}},Xn=t(async(s,n)=>{Me.codeSpace=n;let u=Ke(s);apps[u]||await Qn(s),Me.wait=1;let p=Me.setApp(u);try{let g=await Me.waitForDiv(u);if(!g)return{html:null,css:null};let w=Fr(eCaches[u]),d=document.querySelector(`style[data-emotion=${eCaches[u].key}-global]`)?.innerHTML;return{html:g,css:d?d+" "+w:w}}finally{p()}},"render");function Fr(s){let n=s.key;try{return Array.from(document.querySelectorAll(`style[data-emotion="${s.key}"]`)).map(u=>u.textContent).join(`
`)}catch{return Array.from(document.styleSheets).map(u=>{try{return u.cssRules[0]}catch{return null}}).filter(u=>u&&u.selectorText&&u.selectorText.indexOf(n)!==-1).map(u=>u.cssText).join(`
`)}}t(Fr,"mineFromCaches");var Hn=t(()=>{let s;console.log("wait for animation");let n=new Promise(u=>s=u);return requestAnimationFrame(()=>s(!0)),n},"waitForAnimation");ke();var Sn={"framer-motion":"/motion.mjs","@emotion/react":"/emotion.mjs","@emotion/cache":"/emotionCache.mjs","@emotion/styled":"/emotionStyled.mjs","@emotion/react/jsx-runtime":"/emotionJsxRuntime.mjs",react:"/reactMod.mjs","react/jsx-runtime":"/jsx.mjs","react-dom":"/reactDom.mjs","react-dom/client":"/reactDomClient.mjs","react-error-boundary":"/reactMod.mjs"},Tn={imports:Sn};var ir=Ge(tr(),1);var nr=ir.default.createInstance({name:"filecache"}),rr={...Tn.imports},Nn={};Object.keys(rr).map(s=>Object.assign(Nn,{[s]:location.origin+rr[s]}));var Ie={printR(s,n){if(n[Ie.hashMap[s]])return"";n[Ie.hashMap[s]]=!0;let u=Ie.data[Ie.hashMap[s]];u||console.error(s+" is missing!");let p=u.code;return!u.deps||!u.deps.length?p:[...u.deps].map(d=>Ie.printR(d,n)).join(` 
 `)+`
    
    `+p},toJs:async s=>{let n=Ie.printR(s,{}),u={};Object.keys(Ie.hashMap).forEach(w=>u={...u,[Ie.hashMap[w]]:w});let p={};return Object.keys(Ie.data).forEach(w=>p={...p,[u[w]]:w}),Object.keys(Nn).forEach(w=>p={...p,[w]:"getName(`"+Nn[w]+"`)"}),`
     ${n}




  
  function require(name){


      const importmap = ${JSON.stringify(Tn.imports)};
      const uName = new URL(name, location.origin).toString();    
      const urlName = new URL(name+"/index.js", location.origin).toString();
      if (globalThis.globalNames[name]) return  globalThis.globalNames[name];     
      
      if (globalThis.globalNames[uName]) return  globalThis.globalNames[uName];     

      if (globalThis.globalNames[urlName]) return  globalThis.globalNames[urlName];
      if (importmap[name]) return require(importmap[name])      
      if (!name.includes("/npm:")){
      const npmUrl = new URL('/npm:*'+name+"?bundle&external=@emotion/*,react*,react ", location.origin).toString()
      return require(npmUrl);
    }
  }`},last:0,hashMap:{},data:{}},Wr=t(s=>{let n=/require\("(.+?)"\)/gm,u,p=[];for(;(u=n.exec(s))!==null;){u.index===n.lastIndex&&n.lastIndex++;for(let[g,w]of u.entries())g==1&&p.push(w)}return p},"findDeps"),kn=t(async(s,n)=>{let u=Ke(s);if(Ie.hashMap={...Ie.hashMap,[n]:u},Ie.data[u])return Ie;try{Ie.data[u]={code:(await gt(s,{format:"iife",keepNames:!0,treeShaking:!0,platform:"browser",ignoreAnnotations:!0,target:"es2022",define:{"globalThis.workerDom":JSON.stringify(!0),"process.env.NODE_ENV":'"development"',"process.env.NODE_DEBUG":JSON.stringify(!1),"process.browser":JSON.stringify(!0),"process.env.DEBUG":JSON.stringify(!1),isBrowser:JSON.stringify(!0),isJest:JSON.stringify(!1),"process.env.version":'"1.1.1"',global:"globalThis","process.env.DUMP_SESSION_KEYS":JSON.stringify(!1)},loader:"ts",globalName:u})).code,deps:[]}}catch{Ie.data[u]={code:(await gt(s,{format:"iife",keepNames:!0,treeShaking:!0,define:{"globalThis.workerDom":JSON.stringify(!0),"process.env.NODE_ENV":'"development"',"process.env.NODE_DEBUG":JSON.stringify(!1),"process.browser":JSON.stringify(!0),"process.env.DEBUG":JSON.stringify(!1),isBrowser:JSON.stringify(!0),isJest:JSON.stringify(!1),"process.env.version":'"1.1.1"',global:"globalThis","process.env.DUMP_SESSION_KEYS":JSON.stringify(!1)},ignoreAnnotations:!0,target:"es2022",tsconfigRaw:{compilerOptions:{jsx:"react-jsx",useDefineForClassFields:!1,jsxImportSource:"@emotion/react"}},loader:"tsx",globalName:u})).code,deps:[]}}return Ie.data[u].code=Ie.data[u].code+`
  
  globalThis.globalNames = globalThis.globalNames || {};
  globalThis.globalNames["${n}"] =  ${u}  ;`,Ie.data[u].deps=Wr(Ie.data[u].code).map(p=>importShim.resolve(p,n)),await Promise.all(Ie.data[u].deps.map(p=>Vr(p).then(g=>kn(g,p).then(async w=>await w)))),Ie},"toUmd"),pt={},Vr=t(async s=>{if(s.includes("/live/"))return await fetch(s).then(u=>u.text());if(pt[s])return pt[s];let n=await nr.getItem(s);return n||(pt[s]=pt[s]||await fetch(s).then(u=>u.text()),await nr.setItem(s,pt[s]),pt[s])},"fetch_or_die");var tn=t(async s=>(await gt(s,{loader:"tsx",format:"esm",treeShaking:!0,platform:"browser",minify:!1,keepNames:!0,tsconfigRaw:{compilerOptions:{jsx:"react-jsx",useDefineForClassFields:!1,jsxFragmentFactory:"Fragment",jsxImportSource:"@emotion/react"}},target:"es2022"})).code,"esmTransform");Object.assign(globalThis,{transform:gt,build:It,toUmd:kn});var zr=(0,sr.default)(jn,200,{leading:!0,trailing:!0,maxWait:800}),or=Ue().i;async function ji({code:s,counter:n,codeSpace:u}){if(!(n<=or)){or=n;try{let p=await tn(s),{html:g,css:w}=await Xn(p,u);if(console.log({html:g,css:w}),!g||!w)return;zr({...Ue(),code:s,i:n,transpiled:p,html:g,css:w})}catch(p){console.error({error:p})}finally{}}}t(ji,"runner");var Rn={match:s=>caches.open("fetchCache").then(n=>(Rn=n,n.match(s)))},Jr=location.pathname.slice(1).split("/")[1],ar={name:"http",setup(s){s.onResolve({filter:/.*/,namespace:"http-url"},n=>({path:importShim.resolve(n.path,n.importer),namespace:"http-url"})),s.onResolve({filter:/\.ttf*/,namespace:"http-url"},n=>({path:importShim.resolve(n.path,n.importer),namespace:"ttf"})),s.onLoad({filter:/.*.tsx.*/},async n=>{if(n.path.indexOf("render.tsx")!==-1)return{contents:await tn(`
      import {createRoot} from "react-dom/client"
      import { CacheProvider } from "@emotion/react";
      import createCache from "@emotion/cache";
      import {StrictMode} from "react";
      import { ErrorBoundary } from "react-error-boundary";
      import App from "${location.origin}/live/${Jr}/index.tsx/${Ue().i}"
      document.body.innerHTML = ${JSON.stringify(`<div id="root" style="height:100%">
             <style>${Ue().css}</style>${Ue().html}
      </div>`)};

  let rootEl = document.getElementById("root");

  rootEl.innerHTML="";
   
  const root = createRoot(rootEl);
  
    const cache = createCache({
      key: "${mt()}",
      container: rootEl,
      speedy: false
    });
  
   cache.compat = undefined;
  
  root.render(<StrictMode><ErrorBoundary
    fallbackRender={({ error }) => (
      <div role="alert">
        <div>Oh n o</div>
        <pre>{error.message}</pre>
      </div>
    )}>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
    </ErrorBoundary></StrictMode>);

      `)}}),s.onLoad({filter:/.*/},async n=>{let u=t(async d=>{let v=await Rn.match(d);return v||(v=await fetch(d),!v||!v.ok)||(v=new Response(v.body,v),await Rn.put(d,v.clone())),v},"getRequest"),p=new Request(n.path),g=await u(p);return p.url.indexOf(".tsx")?{contents:await tn(await g.text())}:n.namespace==="ttf"?{contents:g.blob(),loader:"dataurl"}:{contents:await g.text()}})}};ke();var Ji=Ge(xn(),1),lr={name:"unpkg-path-plugin",setup(s){s.onResolve({filter:/^\.+\//},n=>({path:new URL(n.path,location.origin).toString(),namespace:"http-url"})),s.onResolve({filter:/^\[a-z]+\//},n=>n.path.indexOf(location.origin)!==-1?{namespace:"http-url",path:n.path}:{path:`${location.origin}/npm:/${n.path}`,namespace:"http-url"})}};var ut={init:!1,initialize:()=>ut.init!==!1?ut.init:fetch(`${location.origin}/files.json`).then(s=>s.json()).then(s=>{let n=new URL(s[Object.keys(s).find(u=>u.indexOf(".wasm")!==-1&&u.indexOf("esbuild")!==-1)],location.origin).toString();return ut.init=(0,vt.initialize)({wasmURL:n}).then(()=>ut.init=!0),ut.init})},gt=t(async(s,n)=>{let u=ut.initialize();u!==!0&&await u;let p=await(0,vt.transform)(s,{...n,define:{...ur,...n?.define?n.define:{}}}),g=n.keepNames?Yr(p.code):p.code;return{code:`/*${Ke(s)}*/`+g+`/*${Ue().i}*/`}},"initAndTransform"),ur={"process.env.NODE_ENV":'"development"',"process.env.NODE_DEBUG":JSON.stringify(!1),"process.browser":JSON.stringify(!0),"process.env.DEBUG":JSON.stringify(!0),isBrowser:JSON.stringify(!0),isJest:JSON.stringify(!1),"process.env.version":'"1.1.1"',global:"globalThis",WORKER_DOM_DEBUG:JSON.stringify(!1),"process.env.DUMP_SESSION_KEYS":JSON.stringify(!1),process:JSON.stringify({env:{NODE_ENV:"development",browser:!0,NODE_DEBUG:!1,DEBUG:!0,isBrowser:!0},browser:!0})},Zi={"process.env.NODE_ENV":'"production"',"process.env.NODE_DEBUG":JSON.stringify(!1),"process.browser":JSON.stringify(!0),"process.env.DEBUG":JSON.stringify(!1),isBrowser:JSON.stringify(!0),isJest:JSON.stringify(!1),"process.env.version":'"1.1.1"',global:"globalThis",WORKER_DOM_DEBUG:JSON.stringify(!1),"process.env.DUMP_SESSION_KEYS":JSON.stringify(!1),process:JSON.stringify({env:{NODE_ENV:"production",browser:!0,NODE_DEBUG:!1,DEBUG:!1,isBrowser:!0},browser:!0})},cr=!1,It=t(async(s,n,u)=>{let p=ut.initialize();p!==!0&&await p,cr=!0;let g={bundle:!0,resolveExtensions:[".tsx",".ts",".jsx",".js",".d.ts",".css",".json",".mjs",".js",".wasm",".ttf"],loader:{".js":"tsx",".css":"css",".ttf":"dataurl"},write:!1,metafile:!0,target:"es2022",outdir:"./",treeShaking:!0,minify:!1,define:ur,minifyIdentifiers:!1,minifySyntax:!1,minifyWhitespace:!1,splitting:!1,incremental:!0,format:"esm",entryPoints:[`./render.tsx?i=${n}`],tsconfig:"./tsconfig.json",plugins:[lr,ar]},w;return!u.aborted&&(w=await(0,vt.build)(g))&&!u.aborted?(console.log(w.outputFiles),w.outputFiles[0].contents):!1},"build");function Yr(s){if(cr)return s;let n=Object.keys(Sn),u=s;return n.map(p=>{let g=new URL(Sn[p],location.origin).toString();u=u.replaceAll(` from "${p}"`,` from "${g}"`).replaceAll(" from './",` from 'https://${location.host}/live/`)}),u}t(Yr,"importMapReplace");var Pe=Ge(Jt(),1),He={},An={},on=location.pathname.slice(1).split("/")[1],hr=new At,sn=t(async(s,n)=>{await hr.runExclusive(async()=>He[`${s}-${n}`]?He[`${s}-${n}`]:He[`${s}-${n}`]=new Promise(async u=>{if(He[s]!==null&&He[s]>n)return;An[s]&&An[s]();let p=new AbortController,{signal:g}=p;An[s]=()=>p.abort(),He[s]=n;let w=Ue();if(s===on)w=Ue();else{let ge=Ue(),le=n;w=(await importShim(`/live/${s}/mST.mjs?${le}`)).mST}if(g.aborted||He[s]!==n)return;let{html:d,css:v,i:_,transpiled:j}=w,D=Ke(j);_>He[s]&&(He[s]=_);let U=`/*${_}*/`.length;if(_>n)return sn(s,_);let x=+j.slice(-U).split("*")[1];if(x>He[s]&&(He[s]=x),x>_)return sn(s,x);if(g.aborted)return;let W=document.createElement("iframe"),Z=t(ge=>Zr(`
    <html> 
    <head>
    <style>
    html,body{
      height: 100%;
    }
    q{
      display: none;
    }
    ${$n}
    ${v}
    </style>
    <script type="module" src=${ge}><\/script> 
    </head>
    <body>
    <div id="${s}-${D}" style="height: 100%;">${d}</div>
    </body>
    </html>`),"iSRC"),se=t(ge=>{if(W.src=Z(ge),g.aborted)return;let le=document.getElementById("z-body");return W.onload=()=>g.aborted?!1:le?.firstChild?.isSameNode(W)?(console.log("ALL OK"),!0):le?(le.innerHTML="",le.appendChild(W),!0):new Promise(je=>setTimeout(async()=>{je(await se(ge))},1e4)),W.setAttribute("data-coder",s),W.style.height="100%",W.setAttribute("id",`coder-${s}`),W.style.border="none",W.style.width="100%",g.aborted?!1:le?(le.innerHTML="",le.appendChild(W),W):!1},"setIframe");if(se(wt("")),!g.aborted&&He[s]===n&&!g.aborted&&!!W&&!g.aborted)return requestAnimationFrame(()=>!g.aborted&&It(s,n,g).then(ge=>ge&&se(wt(ge)))),u(W),W}))},"createIframe"),In,Gr,nn="",Hr="";async function Qr(s,n){In&&In.terminate(),nn=mt(),console.log(`last hash: ${nn}`),await hr.runExclusive(async()=>{let u=mt();if(nn!==mt()){console.log(`skipping old build hash: ${nn}`);return}if(u===Hr){console.log(`skipping build since it is the latest successful: ${u}`);return}let p=await Kr(s,document.getElementById("root"));if(!p)return;let g=await Gn(p,"/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.mjs");if(g===null)throw new Error("No worker");In=g})}t(Qr,"runInWorker");var qr=new BroadcastChannel(location.origin);qr.onmessage=s=>{let n=location.pathname.slice(1).split("/")[1];s.data.codeSpace===n&&(location.href.indexOf("/hydrated")!==-1?Qr(n,Gr):sn(n,Ue().i))};async function Kr(s,n){let{i:u}=s===on?Ue():(await import(`${location.origin}/live/${on}/mST.mjs`)).mST,p=n?.getElementsByTagName("div")[0];p.style.height="100%";let g=new AbortController,w=await It(on,u,g.signal);if(!w)return!1;let d=wt(w);return p.setAttribute("src",d),p.setAttribute("data-shadow-dom","open"),p}t(Kr,"moveToWorker");Object.assign(globalThis,{md5:Ke});var Xr={},rn={},fr;Pn(()=>{fr&&fr.abort()},"abort");var co=t(async s=>{let n=100,u,p=s.split("/"),g=+(p.pop()||0),w=p.join("/");for(rn[w]=rn[w]||g;;){let d=g<rn[w]?rn[w]:g,v=[...p,d].join("/");try{try{let j=new AbortController().signal,D=await fetch(v,{signal:j});if(D.ok)try{return u=(await importShim(v)).default,{App:u,url:D.url}}catch{let U=await D.text();try{u=(await import(wt(U))).default}catch{console.error("something went nuts"),u=(await importShim(wt(U))).default}return Xr[w]=u,{App:u,url:D.url}}}catch(_){console.error({err:_}),console.error(_&&_?.message||"error has been thrown")}}catch{console.error("bad something happened;")}finally{await en(n*=2)}}},"importIt");Object.hasOwn(globalThis,"apps")||Object.assign(globalThis,{apps:{},eCaches:{}});var{apps:ct,eCaches:Dt}=globalThis;function fo({codeSpace:s}){return(0,dr.useEffect)(()=>{sn(s,Ue().i)},[]),(0,Pe.jsx)(Pe.Fragment,{})}t(fo,"AutoUpdateApp");async function Qn(s=""){let{transpiled:n,i:u}=Ue(),p=s.length>0?s:n,g=Ke(p);if(!ct[g]||!Dt[g]){try{Dt[g]=Dt[g]||Mn({key:g,speedy:!1}),Dt[g].compat=void 0,console.log(`i: ${u}: `);let w;try{w=await importShim(wt(p))}catch{w=new Function(p+` return ${p.slice(2,10)}`)()}let d=w.default;ct[g]=({appId:v})=>(0,Pe.jsx)("div",{style:{height:100+"%"},id:v,children:(0,Pe.jsx)(yt.CacheProvider,{value:Dt[g],children:(0,Pe.jsx)(d,{})},g)},g)}catch(w){if(w instanceof SyntaxError){let d=w.name,v=w.message;ct[g]=()=>(0,Pe.jsxs)("div",{css:yt.css`background-color: orange;`,children:[(0,Pe.jsx)("h1",{children:"Syntax Error"}),(0,Pe.jsx)("h2",{children:g}),(0,Pe.jsxs)("h2",{children:[d,": ",v]}),(0,Pe.jsx)("p",{children:JSON.stringify({err:w})})]})}else if(w instanceof Error){let d=w.name,v=w.message;ct[g]=()=>(0,Pe.jsxs)("div",{css:yt.css`background-color: orange;`,children:[(0,Pe.jsx)("h1",{children:"Syntax Error"}),(0,Pe.jsxs)("h2",{children:[d,": ",v]}),(0,Pe.jsx)("p",{children:JSON.stringify({err:w})})]})}else ct[g]=()=>(0,Pe.jsx)("div",{css:yt.css`background-color: orange;`,children:(0,Pe.jsxs)("h1",{children:["Unknown Error: $",g]})})}if(s!=="")return ct[g]}return ct[g]}t(Qn,"appFactory");function wt(s){return URL.createObjectURL(new Blob([s],{type:"application/javascript"}))}t(wt,"createJsBlob");function Zr(s){return URL.createObjectURL(new Blob([s],{type:"text/html"}))}t(Zr,"createHTML");export{en as a,sn as b,Qr as c,co as d,ct as e,Dt as f,fo as g,Qn as h,wt as i,ji as j,It as k};
