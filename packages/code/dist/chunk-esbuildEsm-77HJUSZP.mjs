import{a as e,c as NA,e as GA}from"./chunk-chunk-YENLXQ5M.mjs";var oA=NA((B7,BA)=>{(cB=>{"use strict";var T=Object.defineProperty,C=Object.defineProperties,nB=Object.getOwnPropertyDescriptor,bB=Object.getOwnPropertyDescriptors,jB=Object.getOwnPropertyNames,QB=Object.getOwnPropertySymbols,xB=Object.prototype.hasOwnProperty,DB=Object.prototype.propertyIsEnumerable,dB=e((B,A,k)=>A in B?T(B,A,{enumerable:!0,configurable:!0,writable:!0,value:k}):B[A]=k,"__defNormalProp"),rB=e((B,A)=>{for(var k in A||(A={}))xB.call(A,k)&&dB(B,k,A[k]);if(QB)for(var k of QB(A))DB.call(A,k)&&dB(B,k,A[k]);return B},"__spreadValues"),XB=e((B,A)=>C(B,bB(A)),"__spreadProps"),jA=e((B,A)=>{for(var k in A)T(B,k,{get:A[k],enumerable:!0})},"__export"),pA=e((B,A,k,r)=>{if(A&&typeof A=="object"||typeof A=="function")for(let u of jB(A))!xB.call(B,u)&&u!==k&&T(B,u,{get:()=>A[u],enumerable:!(r=nB(A,u))||r.enumerable});return B},"__copyProps"),uA=e(B=>pA(T({},"__esModule",{value:!0}),B),"__toCommonJS"),vB=e((B,A,k)=>new Promise((r,u)=>{var c=e(t=>{try{h(k.next(t))}catch(x){u(x)}},"fulfilled"),E=e(t=>{try{h(k.throw(t))}catch(x){u(x)}},"rejected"),h=e(t=>t.done?r(t.value):Promise.resolve(t.value).then(c,E),"step");h((k=k.apply(B,A)).next())}),"__async"),FB={};jA(FB,{analyzeMetafile:()=>CA,analyzeMetafileSync:()=>IA,build:()=>xA,buildSync:()=>wA,default:()=>WA,formatMessages:()=>yA,formatMessagesSync:()=>DA,initialize:()=>_A,serve:()=>vA,transform:()=>MA,transformSync:()=>RA,version:()=>fA}),cB.exports=uA(FB);function AA(B){let A=e(r=>{if(r===null)k.write8(0);else if(typeof r=="boolean")k.write8(1),k.write8(+r);else if(typeof r=="number")k.write8(2),k.write32(r|0);else if(typeof r=="string")k.write8(3),k.write(gB(r));else if(r instanceof Uint8Array)k.write8(4),k.write(r);else if(r instanceof Array){k.write8(5),k.write32(r.length);for(let u of r)A(u)}else{let u=Object.keys(r);k.write8(6),k.write32(u.length);for(let c of u)k.write(gB(c)),A(r[c])}},"visit"),k=new $A;return k.write32(0),k.write32(B.id<<1|+!B.isRequest),A(B.value),KB(k.buf,k.len-4,0),k.buf.subarray(0,k.len)}e(AA,"encodePacket");function cA(B){let A=e(()=>{switch(k.read8()){case 0:return null;case 1:return!!k.read8();case 2:return k.read32();case 3:return MB(k.read());case 4:return k.read();case 5:{let E=k.read32(),h=[];for(let t=0;t<E;t++)h.push(A());return h}case 6:{let E=k.read32(),h={};for(let t=0;t<E;t++)h[MB(k.read())]=A();return h}default:throw new Error("Invalid packet")}},"visit"),k=new $A(B),r=k.read32(),u=(r&1)===0;r>>>=1;let c=A();if(k.ptr!==B.length)throw new Error("Invalid packet");return{id:r,isRequest:u,value:c}}e(cA,"decodePacket");var $A=e(class{constructor(B=new Uint8Array(1024)){this.buf=B,this.len=0,this.ptr=0}_write(B){if(this.len+B>this.buf.length){let A=new Uint8Array((this.len+B)*2);A.set(this.buf),this.buf=A}return this.len+=B,this.len-B}write8(B){let A=this._write(1);this.buf[A]=B}write32(B){let A=this._write(4);KB(this.buf,B,A)}write(B){let A=this._write(4+B.length);KB(this.buf,B.length,A),this.buf.set(B,A+4)}_read(B){if(this.ptr+B>this.buf.length)throw new Error("Invalid packet");return this.ptr+=B,this.ptr-B}read8(){return this.buf[this._read(1)]}read32(){return kA(this.buf,this._read(4))}read(){let B=this.read32(),A=new Uint8Array(B),k=this._read(A.length);return A.set(this.buf.subarray(k,k+B)),A}},"ByteBuffer"),gB,MB;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let B=new TextEncoder,A=new TextDecoder;gB=e(k=>B.encode(k),"encodeUTF8"),MB=e(k=>A.decode(k),"decodeUTF8")}else if(typeof Buffer<"u")gB=e(B=>{let A=Buffer.from(B);return A instanceof Uint8Array||(A=new Uint8Array(A)),A},"encodeUTF8"),MB=e(B=>{let{buffer:A,byteOffset:k,byteLength:r}=B;return Buffer.from(A,k,r).toString()},"decodeUTF8");else throw new Error("No UTF-8 codec found");function kA(B,A){return B[A++]|B[A++]<<8|B[A++]<<16|B[A++]<<24}e(kA,"readUInt32LE");function KB(B,A,k){B[k++]=A,B[k++]=A>>8,B[k++]=A>>16,B[k++]=A>>24}e(KB,"writeUInt32LE");function PA(B){if(B+="",B.indexOf(",")>=0)throw new Error(`Invalid target: ${B}`);return B}e(PA,"validateTarget");var WB=e(()=>null,"canBeAnything"),z=e(B=>typeof B=="boolean"?null:"a boolean","mustBeBoolean"),hA=e(B=>typeof B=="boolean"||typeof B=="object"&&!Array.isArray(B)?null:"a boolean or an object","mustBeBooleanOrObject"),d=e(B=>typeof B=="string"?null:"a string","mustBeString"),UB=e(B=>B instanceof RegExp?null:"a RegExp object","mustBeRegExp"),yB=e(B=>typeof B=="number"&&B===(B|0)?null:"an integer","mustBeInteger"),YB=e(B=>typeof B=="function"?null:"a function","mustBeFunction"),EB=e(B=>Array.isArray(B)?null:"an array","mustBeArray"),TB=e(B=>typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"an object","mustBeObject"),QA=e(B=>B instanceof WebAssembly.Module?null:"a WebAssembly.Module","mustBeWebAssemblyModule"),mA=e(B=>typeof B=="object"&&B!==null?null:"an array or an object","mustBeArrayOrRecord"),eA=e(B=>typeof B=="object"&&!Array.isArray(B)?null:"an object or null","mustBeObjectOrNull"),EA=e(B=>typeof B=="string"||typeof B=="boolean"?null:"a string or a boolean","mustBeStringOrBoolean"),dA=e(B=>typeof B=="string"||typeof B=="object"&&B!==null&&!Array.isArray(B)?null:"a string or an object","mustBeStringOrObject"),XA=e(B=>typeof B=="string"||Array.isArray(B)?null:"a string or an array","mustBeStringOrArray"),tA=e(B=>typeof B=="string"||B instanceof Uint8Array?null:"a string or a Uint8Array","mustBeStringOrUint8Array");function P(B,A,k,r){let u=B[k];if(A[k+""]=!0,u===void 0)return;let c=r(u);if(c!==null)throw new Error(`"${k}" must be ${c}`);return u}e(P,"getFlag");function aB(B,A,k){for(let r in B)if(!(r in A))throw new Error(`Invalid option ${k}: "${r}"`)}e(aB,"checkForInvalidFlags");function gA(B){let A=Object.create(null),k=P(B,A,"wasmURL",d),r=P(B,A,"wasmModule",QA),u=P(B,A,"worker",z);return aB(B,A,"in initialize() call"),{wasmURL:k,wasmModule:r,worker:u}}e(gA,"validateInitializeOptions");function nA(B){let A;if(B!==void 0){A=Object.create(null);for(let k of Object.keys(B)){let r=B[k];if(typeof r=="string"||r===!1)A[k]=r;else throw new Error(`Expected ${JSON.stringify(k)} in mangle cache to map to either a string or false`)}}return A}e(nA,"validateMangleCache");function LB(B,A,k,r,u){let c=P(A,k,"color",z),E=P(A,k,"logLevel",d),h=P(A,k,"logLimit",yB);c!==void 0?B.push(`--color=${c}`):r&&B.push("--color=true"),B.push(`--log-level=${E||u}`),B.push(`--log-limit=${h||0}`)}e(LB,"pushLogFlags");function rA(B,A,k){let r=P(A,k,"legalComments",d),u=P(A,k,"sourceRoot",d),c=P(A,k,"sourcesContent",z),E=P(A,k,"target",XA),h=P(A,k,"format",d),t=P(A,k,"globalName",d),x=P(A,k,"mangleProps",UB),N=P(A,k,"reserveProps",UB),S=P(A,k,"mangleQuoted",z),j=P(A,k,"minify",z),O=P(A,k,"minifySyntax",z),Y=P(A,k,"minifyWhitespace",z),R=P(A,k,"minifyIdentifiers",z),p=P(A,k,"drop",EB),l=P(A,k,"charset",d),m=P(A,k,"treeShaking",z),v=P(A,k,"ignoreAnnotations",z),w=P(A,k,"jsx",d),D=P(A,k,"jsxFactory",d),AB=P(A,k,"jsxFragment",d),$=P(A,k,"jsxImportSource",d),o=P(A,k,"jsxDev",z),y=P(A,k,"define",TB),a=P(A,k,"logOverride",TB),i=P(A,k,"supported",TB),s=P(A,k,"pure",EB),Q=P(A,k,"keepNames",z),G=P(A,k,"platform",d);if(r&&B.push(`--legal-comments=${r}`),u!==void 0&&B.push(`--source-root=${u}`),c!==void 0&&B.push(`--sources-content=${c}`),E&&(Array.isArray(E)?B.push(`--target=${Array.from(E).map(PA).join(",")}`):B.push(`--target=${PA(E)}`)),h&&B.push(`--format=${h}`),t&&B.push(`--global-name=${t}`),G&&B.push(`--platform=${G}`),j&&B.push("--minify"),O&&B.push("--minify-syntax"),Y&&B.push("--minify-whitespace"),R&&B.push("--minify-identifiers"),l&&B.push(`--charset=${l}`),m!==void 0&&B.push(`--tree-shaking=${m}`),v&&B.push("--ignore-annotations"),p)for(let f of p)B.push(`--drop:${f}`);if(x&&B.push(`--mangle-props=${x.source}`),N&&B.push(`--reserve-props=${N.source}`),S!==void 0&&B.push(`--mangle-quoted=${S}`),w&&B.push(`--jsx=${w}`),D&&B.push(`--jsx-factory=${D}`),AB&&B.push(`--jsx-fragment=${AB}`),$&&B.push(`--jsx-import-source=${$}`),o&&B.push("--jsx-dev"),y)for(let f in y){if(f.indexOf("=")>=0)throw new Error(`Invalid define: ${f}`);B.push(`--define:${f}=${y[f]}`)}if(a)for(let f in a){if(f.indexOf("=")>=0)throw new Error(`Invalid log override: ${f}`);B.push(`--log-override:${f}=${a[f]}`)}if(i)for(let f in i){if(f.indexOf("=")>=0)throw new Error(`Invalid supported: ${f}`);B.push(`--supported:${f}=${i[f]}`)}if(s)for(let f of s)B.push(`--pure:${f}`);Q&&B.push("--keep-names")}e(rA,"pushCommonFlags");function TA(B,A,k,r,u){var c;let E=[],h=[],t=Object.create(null),x=null,N=null,S=null;LB(E,A,t,k,r),rA(E,A,t);let j=P(A,t,"sourcemap",EA),O=P(A,t,"bundle",z),Y=P(A,t,"watch",hA),R=P(A,t,"splitting",z),p=P(A,t,"preserveSymlinks",z),l=P(A,t,"metafile",z),m=P(A,t,"outfile",d),v=P(A,t,"outdir",d),w=P(A,t,"outbase",d),D=P(A,t,"tsconfig",d),AB=P(A,t,"resolveExtensions",EB),$=P(A,t,"nodePaths",EB),o=P(A,t,"mainFields",EB),y=P(A,t,"conditions",EB),a=P(A,t,"external",EB),i=P(A,t,"loader",TB),s=P(A,t,"outExtension",TB),Q=P(A,t,"publicPath",d),G=P(A,t,"entryNames",d),f=P(A,t,"chunkNames",d),U=P(A,t,"assetNames",d),_=P(A,t,"inject",EB),q=P(A,t,"banner",TB),L=P(A,t,"footer",TB),M=P(A,t,"entryPoints",mA),Z=P(A,t,"absWorkingDir",d),I=P(A,t,"stdin",TB),J=(c=P(A,t,"write",z))!=null?c:u,$B=P(A,t,"allowOverwrite",z),hB=P(A,t,"incremental",z)===!0,F=P(A,t,"mangleCache",TB);if(t.plugins=!0,aB(A,t,`in ${B}() call`),j&&E.push(`--sourcemap${j===!0?"":`=${j}`}`),O&&E.push("--bundle"),$B&&E.push("--allow-overwrite"),Y)if(E.push("--watch"),typeof Y=="boolean")S={};else{let n=Object.create(null),X=P(Y,n,"onRebuild",YB);aB(Y,n,`on "watch" in ${B}() call`),S={onRebuild:X}}if(R&&E.push("--splitting"),p&&E.push("--preserve-symlinks"),l&&E.push("--metafile"),m&&E.push(`--outfile=${m}`),v&&E.push(`--outdir=${v}`),w&&E.push(`--outbase=${w}`),D&&E.push(`--tsconfig=${D}`),AB){let n=[];for(let X of AB){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${X}`);n.push(X)}E.push(`--resolve-extensions=${n.join(",")}`)}if(Q&&E.push(`--public-path=${Q}`),G&&E.push(`--entry-names=${G}`),f&&E.push(`--chunk-names=${f}`),U&&E.push(`--asset-names=${U}`),o){let n=[];for(let X of o){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid main field: ${X}`);n.push(X)}E.push(`--main-fields=${n.join(",")}`)}if(y){let n=[];for(let X of y){if(X+="",X.indexOf(",")>=0)throw new Error(`Invalid condition: ${X}`);n.push(X)}E.push(`--conditions=${n.join(",")}`)}if(a)for(let n of a)E.push(`--external:${n}`);if(q)for(let n in q){if(n.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${n}`);E.push(`--banner:${n}=${q[n]}`)}if(L)for(let n in L){if(n.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${n}`);E.push(`--footer:${n}=${L[n]}`)}if(_)for(let n of _)E.push(`--inject:${n}`);if(i)for(let n in i){if(n.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${n}`);E.push(`--loader:${n}=${i[n]}`)}if(s)for(let n in s){if(n.indexOf("=")>=0)throw new Error(`Invalid out extension: ${n}`);E.push(`--out-extension:${n}=${s[n]}`)}if(M)if(Array.isArray(M))for(let n of M)h.push(["",n+""]);else for(let[n,X]of Object.entries(M))h.push([n+"",X+""]);if(I){let n=Object.create(null),X=P(I,n,"contents",tA),BB=P(I,n,"resolveDir",d),PB=P(I,n,"sourcefile",d),b=P(I,n,"loader",d);aB(I,n,'in "stdin" object'),PB&&E.push(`--sourcefile=${PB}`),b&&E.push(`--loader=${b}`),BB&&(N=BB+""),typeof X=="string"?x=gB(X):X instanceof Uint8Array&&(x=X)}let H=[];if($)for(let n of $)n+="",H.push(n);return{entries:h,flags:E,write:J,stdinContents:x,stdinResolveDir:N,absWorkingDir:Z,incremental:hB,nodePaths:H,watch:S,mangleCache:nA(F)}}e(TA,"flagsForBuildOptions");function bA(B,A,k,r){let u=[],c=Object.create(null);LB(u,A,c,k,r),rA(u,A,c);let E=P(A,c,"sourcemap",EA),h=P(A,c,"tsconfigRaw",dA),t=P(A,c,"sourcefile",d),x=P(A,c,"loader",d),N=P(A,c,"banner",d),S=P(A,c,"footer",d),j=P(A,c,"mangleCache",TB);return aB(A,c,`in ${B}() call`),E&&u.push(`--sourcemap=${E===!0?"external":E}`),h&&u.push(`--tsconfig-raw=${typeof h=="string"?h:JSON.stringify(h)}`),t&&u.push(`--sourcefile=${t}`),x&&u.push(`--loader=${x}`),N&&u.push(`--banner=${N}`),S&&u.push(`--footer=${S}`),{flags:u,mangleCache:nA(j)}}e(bA,"flagsForTransformOptions");function HA(B){let A=new Map,k=new Map,r=new Map,u=new Map,c=null,E=0,h=0,t=new Uint8Array(16*1024),x=0,N=e(a=>{let i=x+a.length;if(i>t.length){let Q=new Uint8Array(i*2);Q.set(t),t=Q}t.set(a,x),x+=a.length;let s=0;for(;s+4<=x;){let Q=kA(t,s);if(s+4+Q>x)break;s+=4,p(t.subarray(s,s+Q)),s+=Q}s>0&&(t.copyWithin(0,s,x),x-=s)},"readFromStdout"),S=e(a=>{c={reason:a?": "+(a.message||a):""};let i="The service was stopped"+c.reason;for(let s of A.values())s(i,null);A.clear();for(let s of u.values())s.onWait(i);u.clear();for(let s of r.values())try{s(new Error(i),null)}catch(Q){console.error(Q)}r.clear()},"afterClose"),j=e((a,i,s)=>{if(c)return s("The service is no longer running"+c.reason,null);let Q=E++;A.set(Q,(G,f)=>{try{s(G,f)}finally{a&&a.unref()}}),a&&a.ref(),B.writeToStdin(AA({id:Q,isRequest:!0,value:i}))},"sendRequest"),O=e((a,i)=>{if(c)throw new Error("The service is no longer running"+c.reason);B.writeToStdin(AA({id:a,isRequest:!1,value:i}))},"sendResponse"),Y=e((a,i)=>vB(this,null,function*(){try{switch(i.command){case"ping":{O(a,{});break}case"on-start":{let s=k.get(i.key);s?O(a,yield s(i)):O(a,{});break}case"on-resolve":{let s=k.get(i.key);s?O(a,yield s(i)):O(a,{});break}case"on-load":{let s=k.get(i.key);s?O(a,yield s(i)):O(a,{});break}case"serve-request":{let s=u.get(i.key);s&&s.onRequest&&s.onRequest(i.args),O(a,{});break}case"serve-wait":{let s=u.get(i.key);s&&s.onWait(i.error),O(a,{});break}case"watch-rebuild":{let s=r.get(i.key);try{s&&s(null,i.args)}catch(Q){console.error(Q)}O(a,{});break}default:throw new Error("Invalid command: "+i.command)}}catch(s){O(a,{errors:[CB(s,B,null,void 0,"")]})}}),"handleRequest"),R=!0,p=e(a=>{if(R){R=!1;let s=String.fromCharCode(...a);if(s!=="0.15.7")throw new Error(`Cannot start service: Host version "0.15.7" does not match binary version ${JSON.stringify(s)}`);return}let i=cA(a);if(i.isRequest)Y(i.id,i.value);else{let s=A.get(i.id);A.delete(i.id),i.value.error?s(i.value.error,{}):s(null,i.value)}},"handleIncomingPacket"),l=e((a,i,s,Q,G)=>vB(this,null,function*(){let f=[],U=[],_={},q={},L=0,M=0,Z=[],I=!1;i=[...i];for(let F of i){let H={};if(typeof F!="object")throw new Error(`Plugin at index ${M} must be an object`);let n=P(F,H,"name",d);if(typeof n!="string"||n==="")throw new Error(`Plugin at index ${M} is missing a name`);try{let X=P(F,H,"setup",YB);if(typeof X!="function")throw new Error("Plugin is missing a setup function");aB(F,H,`on plugin ${JSON.stringify(n)}`);let BB={name:n,onResolve:[],onLoad:[]};M++;let b=X({initialOptions:a,resolve:e((g,V={})=>{if(!I)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof g!="string")throw new Error("The path to resolve must be a string");let W=Object.create(null),sB=P(V,W,"pluginName",d),kB=P(V,W,"importer",d),tB=P(V,W,"namespace",d),pB=P(V,W,"resolveDir",d),oB=P(V,W,"kind",d),K=P(V,W,"pluginData",WB);return aB(V,W,"in resolve() call"),new Promise((iB,lB)=>{let eB={command:"resolve",path:g,key:s,pluginName:n};sB!=null&&(eB.pluginName=sB),kB!=null&&(eB.importer=kB),tB!=null&&(eB.namespace=tB),pB!=null&&(eB.resolveDir=pB),oB!=null&&(eB.kind=oB),K!=null&&(eB.pluginData=Q.store(K)),j(G,eB,(HB,uB)=>{HB!==null?lB(new Error(HB)):iB({errors:SB(uB.errors,Q),warnings:SB(uB.warnings,Q),path:uB.path,external:uB.external,sideEffects:uB.sideEffects,namespace:uB.namespace,suffix:uB.suffix,pluginData:Q.load(uB.pluginData)})})})},"resolve"),onStart(g){let V='This error came from the "onStart" callback registered here:',W=NB(new Error(V),B,"onStart");f.push({name:n,callback:g,note:W})},onEnd(g){let V='This error came from the "onEnd" callback registered here:',W=NB(new Error(V),B,"onEnd");U.push({name:n,callback:g,note:W})},onResolve(g,V){let W='This error came from the "onResolve" callback registered here:',sB=NB(new Error(W),B,"onResolve"),kB={},tB=P(g,kB,"filter",UB),pB=P(g,kB,"namespace",d);if(aB(g,kB,`in onResolve() call for plugin ${JSON.stringify(n)}`),tB==null)throw new Error("onResolve() call is missing a filter");let oB=L++;_[oB]={name:n,callback:V,note:sB},BB.onResolve.push({id:oB,filter:tB.source,namespace:pB||""})},onLoad(g,V){let W='This error came from the "onLoad" callback registered here:',sB=NB(new Error(W),B,"onLoad"),kB={},tB=P(g,kB,"filter",UB),pB=P(g,kB,"namespace",d);if(aB(g,kB,`in onLoad() call for plugin ${JSON.stringify(n)}`),tB==null)throw new Error("onLoad() call is missing a filter");let oB=L++;q[oB]={name:n,callback:V,note:sB},BB.onLoad.push({id:oB,filter:tB.source,namespace:pB||""})},esbuild:B.esbuild});b&&(yield b),Z.push(BB)}catch(X){return{ok:!1,error:X,pluginName:n}}}let J=e(F=>vB(this,null,function*(){switch(F.command){case"on-start":{let H={errors:[],warnings:[]};return yield Promise.all(f.map(n=>vB(this,[n],function*({name:X,callback:BB,note:PB}){try{let b=yield BB();if(b!=null){if(typeof b!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(X)} to return an object`);let g={},V=P(b,g,"errors",EB),W=P(b,g,"warnings",EB);aB(b,g,`from onStart() callback in plugin ${JSON.stringify(X)}`),V!=null&&H.errors.push(...fB(V,"errors",Q,X)),W!=null&&H.warnings.push(...fB(W,"warnings",Q,X))}}catch(b){H.errors.push(CB(b,B,Q,PB&&PB(),X))}}))),H}case"on-resolve":{let H={},n="",X,BB;for(let PB of F.ids)try{({name:n,callback:X,note:BB}=_[PB]);let b=yield X({path:F.path,importer:F.importer,namespace:F.namespace,resolveDir:F.resolveDir,kind:F.kind,pluginData:Q.load(F.pluginData)});if(b!=null){if(typeof b!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(n)} to return an object`);let g={},V=P(b,g,"pluginName",d),W=P(b,g,"path",d),sB=P(b,g,"namespace",d),kB=P(b,g,"suffix",d),tB=P(b,g,"external",z),pB=P(b,g,"sideEffects",z),oB=P(b,g,"pluginData",WB),K=P(b,g,"errors",EB),iB=P(b,g,"warnings",EB),lB=P(b,g,"watchFiles",EB),eB=P(b,g,"watchDirs",EB);aB(b,g,`from onResolve() callback in plugin ${JSON.stringify(n)}`),H.id=PB,V!=null&&(H.pluginName=V),W!=null&&(H.path=W),sB!=null&&(H.namespace=sB),kB!=null&&(H.suffix=kB),tB!=null&&(H.external=tB),pB!=null&&(H.sideEffects=pB),oB!=null&&(H.pluginData=Q.store(oB)),K!=null&&(H.errors=fB(K,"errors",Q,n)),iB!=null&&(H.warnings=fB(iB,"warnings",Q,n)),lB!=null&&(H.watchFiles=GB(lB,"watchFiles")),eB!=null&&(H.watchDirs=GB(eB,"watchDirs"));break}}catch(b){return{id:PB,errors:[CB(b,B,Q,BB&&BB(),n)]}}return H}case"on-load":{let H={},n="",X,BB;for(let PB of F.ids)try{({name:n,callback:X,note:BB}=q[PB]);let b=yield X({path:F.path,namespace:F.namespace,suffix:F.suffix,pluginData:Q.load(F.pluginData)});if(b!=null){if(typeof b!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(n)} to return an object`);let g={},V=P(b,g,"pluginName",d),W=P(b,g,"contents",tA),sB=P(b,g,"resolveDir",d),kB=P(b,g,"pluginData",WB),tB=P(b,g,"loader",d),pB=P(b,g,"errors",EB),oB=P(b,g,"warnings",EB),K=P(b,g,"watchFiles",EB),iB=P(b,g,"watchDirs",EB);aB(b,g,`from onLoad() callback in plugin ${JSON.stringify(n)}`),H.id=PB,V!=null&&(H.pluginName=V),W instanceof Uint8Array?H.contents=W:W!=null&&(H.contents=gB(W)),sB!=null&&(H.resolveDir=sB),kB!=null&&(H.pluginData=Q.store(kB)),tB!=null&&(H.loader=tB),pB!=null&&(H.errors=fB(pB,"errors",Q,n)),oB!=null&&(H.warnings=fB(oB,"warnings",Q,n)),K!=null&&(H.watchFiles=GB(K,"watchFiles")),iB!=null&&(H.watchDirs=GB(iB,"watchDirs"));break}}catch(b){return{id:PB,errors:[CB(b,B,Q,BB&&BB(),n)]}}return H}default:throw new Error("Invalid command: "+F.command)}}),"callback"),$B=e((F,H,n)=>n(),"runOnEndCallbacks");U.length>0&&($B=e((F,H,n)=>{(()=>vB(this,null,function*(){for(let{name:X,callback:BB,note:PB}of U)try{yield BB(F)}catch(b){F.errors.push(yield new Promise(g=>H(b,X,PB&&PB(),g)))}}))().then(n)},"runOnEndCallbacks")),I=!0;let hB=0;return{ok:!0,requestPlugins:Z,runOnEndCallbacks:$B,pluginRefs:{ref(){++hB===1&&k.set(s,J)},unref(){--hB===0&&k.delete(s)}}}}),"handlePlugins"),m=e((a,i,s,Q)=>{let G={},f=P(i,G,"port",yB),U=P(i,G,"host",d),_=P(i,G,"servedir",d),q=P(i,G,"onRequest",YB),L,M=new Promise((Z,I)=>{L=e(J=>{u.delete(Q),J!==null?I(new Error(J)):Z()},"onWait")});return s.serve={},aB(i,G,"in serve() call"),f!==void 0&&(s.serve.port=f),U!==void 0&&(s.serve.host=U),_!==void 0&&(s.serve.servedir=_),u.set(Q,{onRequest:q,onWait:L}),{wait:M,stop(){j(a,{command:"serve-stop",key:Q},()=>{})}}},"buildServeData"),v="warning",w="silent",D=e(a=>{let i=h++,s=aA(),Q,{refs:G,options:f,isTTY:U,callback:_}=a;if(typeof f=="object"){let M=f.plugins;if(M!==void 0){if(!Array.isArray(M))throw new Error('"plugins" must be an array');Q=M}}let q=e((M,Z,I,J)=>{let $B=[];try{LB($B,f,{},U,v)}catch{}let hB=CB(M,B,s,I,Z);j(G,{command:"error",flags:$B,error:hB},()=>{hB.detail=s.load(hB.detail),J(hB)})},"logPluginError"),L=e((M,Z)=>{q(M,Z,void 0,I=>{_(wB("Build failed",[I],[]),null)})},"handleError");if(Q&&Q.length>0){if(B.isSync)return L(new Error("Cannot use plugins in synchronous API calls"),"");l(f,Q,i,s,G).then(M=>{if(!M.ok)L(M.error,M.pluginName);else try{AB(XB(rB({},a),{key:i,details:s,logPluginError:q,requestPlugins:M.requestPlugins,runOnEndCallbacks:M.runOnEndCallbacks,pluginRefs:M.pluginRefs}))}catch(Z){L(Z,"")}},M=>L(M,""))}else try{AB(XB(rB({},a),{key:i,details:s,logPluginError:q,requestPlugins:null,runOnEndCallbacks:(M,Z,I)=>I(),pluginRefs:null}))}catch(M){L(M,"")}},"buildOrServe"),AB=e(({callName:a,refs:i,serveOptions:s,options:Q,isTTY:G,defaultWD:f,callback:U,key:_,details:q,logPluginError:L,requestPlugins:M,runOnEndCallbacks:Z,pluginRefs:I})=>{let J={ref(){I&&I.ref(),i&&i.ref()},unref(){I&&I.unref(),i&&i.unref()}},$B=!B.isWriteUnavailable,{entries:hB,flags:F,write:H,stdinContents:n,stdinResolveDir:X,absWorkingDir:BB,incremental:PB,nodePaths:b,watch:g,mangleCache:V}=TA(a,Q,G,v,$B),W={command:"build",key:_,entries:hB,flags:F,write:H,stdinContents:n,stdinResolveDir:X,absWorkingDir:BB||f,incremental:PB,nodePaths:b};M&&(W.plugins=M),V&&(W.mangleCache=V);let sB=s&&m(J,s,W,_),kB,tB,pB=e((K,iB)=>{K.outputFiles&&(iB.outputFiles=K.outputFiles.map(SA)),K.metafile&&(iB.metafile=JSON.parse(K.metafile)),K.mangleCache&&(iB.mangleCache=K.mangleCache),K.writeToStdout!==void 0&&console.log(MB(K.writeToStdout).replace(/\n$/,""))},"copyResponseToResult"),oB=e((K,iB)=>{let lB={errors:SB(K.errors,q),warnings:SB(K.warnings,q)};pB(K,lB),Z(lB,L,()=>{if(lB.errors.length>0)return iB(wB("Build failed",lB.errors,lB.warnings),null);if(K.rebuild){if(!kB){let eB=!1;kB=e(()=>new Promise((HB,uB)=>{if(eB||c)throw new Error("Cannot rebuild");j(J,{command:"rebuild",key:_},(mB,UA)=>{if(mB)return iB(wB("Build failed",[{id:"",pluginName:"",text:mB,location:null,notes:[],detail:void 0}],[]),null);oB(UA,(zB,LA)=>{zB?uB(zB):HB(LA)})})}),"rebuild"),J.ref(),kB.dispose=()=>{eB||(eB=!0,j(J,{command:"rebuild-dispose",key:_},()=>{}),J.unref())}}lB.rebuild=kB}if(K.watch){if(!tB){let eB=!1;J.ref(),tB=e(()=>{eB||(eB=!0,r.delete(_),j(J,{command:"watch-stop",key:_},()=>{}),J.unref())},"stop"),g&&r.set(_,(HB,uB)=>{if(HB){g.onRebuild&&g.onRebuild(HB,null);return}let mB={errors:SB(uB.errors,q),warnings:SB(uB.warnings,q)};pB(uB,mB),Z(mB,L,()=>{if(mB.errors.length>0){g.onRebuild&&g.onRebuild(wB("Build failed",mB.errors,mB.warnings),null);return}uB.rebuildID!==void 0&&(mB.rebuild=kB),mB.stop=tB,g.onRebuild&&g.onRebuild(null,mB)})})}lB.stop=tB}iB(null,lB)})},"buildResponseToResult");if(H&&B.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(PB&&B.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(g&&B.isSync)throw new Error('Cannot use "watch" with a synchronous build');j(J,W,(K,iB)=>{if(K)return U(new Error(K),null);if(sB){let lB=iB,eB=!1;J.ref();let HB={port:lB.port,host:lB.host,wait:sB.wait,stop(){eB||(eB=!0,sB.stop(),J.unref())}};return J.ref(),sB.wait.then(J.unref,J.unref),U(null,HB)}return oB(iB,U)})},"buildOrServeContinue");return{readFromStdout:N,afterClose:S,service:{buildOrServe:D,transform:e(({callName:a,refs:i,input:s,options:Q,isTTY:G,fs:f,callback:U})=>{let _=aA(),q=e(L=>{try{if(typeof s!="string"&&!(s instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:M,mangleCache:Z}=bA(a,Q,G,w),I={command:"transform",flags:M,inputFS:L!==null,input:L!==null?gB(L):typeof s=="string"?gB(s):s};Z&&(I.mangleCache=Z),j(i,I,(J,$B)=>{if(J)return U(new Error(J),null);let hB=SB($B.errors,_),F=SB($B.warnings,_),H=1,n=e(()=>{if(--H===0){let X={warnings:F,code:$B.code,map:$B.map};$B.mangleCache&&(X.mangleCache=$B?.mangleCache),U(null,X)}},"next");if(hB.length>0)return U(wB("Transform failed",hB,F),null);$B.codeFS&&(H++,f.readFile($B.code,(X,BB)=>{X!==null?U(X,null):($B.code=BB,n())})),$B.mapFS&&(H++,f.readFile($B.map,(X,BB)=>{X!==null?U(X,null):($B.map=BB,n())})),n()})}catch(M){let Z=[];try{LB(Z,Q,{},G,w)}catch{}let I=CB(M,B,_,void 0,"");j(i,{command:"error",flags:Z,error:I},()=>{I.detail=_.load(I.detail),U(wB("Transform failed",[I],[]),null)})}},"start");if((typeof s=="string"||s instanceof Uint8Array)&&s.length>1024*1024){let L=q;q=e(()=>f.writeFile(s,L),"start")}q(null)},"transform2"),formatMessages:e(({callName:a,refs:i,messages:s,options:Q,callback:G})=>{let f=fB(s,"messages",null,"");if(!Q)throw new Error(`Missing second argument in ${a}() call`);let U={},_=P(Q,U,"kind",d),q=P(Q,U,"color",z),L=P(Q,U,"terminalWidth",yB);if(aB(Q,U,`in ${a}() call`),_===void 0)throw new Error(`Missing "kind" in ${a}() call`);if(_!=="error"&&_!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${a}() call`);let M={command:"format-msgs",messages:f,isWarning:_==="warning"};q!==void 0&&(M.color=q),L!==void 0&&(M.terminalWidth=L),j(i,M,(Z,I)=>{if(Z)return G(new Error(Z),null);G(null,I.messages)})},"formatMessages2"),analyzeMetafile:e(({callName:a,refs:i,metafile:s,options:Q,callback:G})=>{Q===void 0&&(Q={});let f={},U=P(Q,f,"color",z),_=P(Q,f,"verbose",z);aB(Q,f,`in ${a}() call`);let q={command:"analyze-metafile",metafile:s};U!==void 0&&(q.color=U),_!==void 0&&(q.verbose=_),j(i,q,(L,M)=>{if(L)return G(new Error(L),null);G(null,M.result)})},"analyzeMetafile2")}}}e(HA,"createChannel");function aA(){let B=new Map,A=0;return{load(k){return B.get(k)},store(k){if(k===void 0)return-1;let r=A++;return B.set(r,k),r}}}e(aA,"createObjectStash");function NB(B,A,k){let r,u=!1;return()=>{if(u)return r;u=!0;try{let c=(B.stack+"").split(`
`);c.splice(1,1);let E=iA(A,c,k);if(E)return r={text:B.message,location:E},r}catch{}}}e(NB,"extractCallerV8");function CB(B,A,k,r,u){let c="Internal error",E=null;try{c=(B&&B.message||B)+""}catch{}try{E=iA(A,(B.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:u,text:c,location:E,notes:r?[r]:[],detail:k?k.store(B):-1}}e(CB,"extractErrorMessageV8");function iA(B,A,k){let r="    at ";if(B.readFileSync&&!A[0].startsWith(r)&&A[1].startsWith(r))for(let u=1;u<A.length;u++){let c=A[u];if(!!c.startsWith(r))for(c=c.slice(r.length);;){let E=/^(?:new |async )?\S+ \((.*)\)$/.exec(c);if(E){c=E[1];continue}if(E=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(c),E){c=E[1];continue}if(E=/^(\S+):(\d+):(\d+)$/.exec(c),E){let h;try{h=B.readFileSync(E[1],"utf8")}catch{break}let t=h.split(/\r\n|\r|\n|\u2028|\u2029/)[+E[2]-1]||"",x=+E[3]-1,N=t.slice(x,x+k.length)===k?k.length:0;return{file:E[1],namespace:"file",line:+E[2],column:gB(t.slice(0,x)).length,length:gB(t.slice(x,x+N)).length,lineText:t+`
`+A.slice(1).join(`
`),suggestion:""}}break}}return null}e(iA,"parseStackLinesV8");function wB(B,A,k){let r=5,u=A.length<1?"":` with ${A.length} error${A.length<2?"":"s"}:`+A.slice(0,r+1).map((E,h)=>{if(h===r)return`
...`;if(!E.location)return`
error: ${E.text}`;let{file:t,line:x,column:N}=E.location,S=E.pluginName?`[plugin: ${E.pluginName}] `:"";return`
${t}:${x}:${N}: ERROR: ${S}${E.text}`}).join(""),c=new Error(`${B}${u}`);return c.errors=A,c.warnings=k,c}e(wB,"failureErrorWithLog");function SB(B,A){for(let k of B)k.detail=A.load(k.detail);return B}e(SB,"replaceDetailsInMessages");function sA(B,A){if(B==null)return null;let k={},r=P(B,k,"file",d),u=P(B,k,"namespace",d),c=P(B,k,"line",yB),E=P(B,k,"column",yB),h=P(B,k,"length",yB),t=P(B,k,"lineText",d),x=P(B,k,"suggestion",d);return aB(B,k,A),{file:r||"",namespace:u||"",line:c||0,column:E||0,length:h||0,lineText:t||"",suggestion:x||""}}e(sA,"sanitizeLocation");function fB(B,A,k,r){let u=[],c=0;for(let E of B){let h={},t=P(E,h,"id",d),x=P(E,h,"pluginName",d),N=P(E,h,"text",d),S=P(E,h,"location",eA),j=P(E,h,"notes",EB),O=P(E,h,"detail",WB),Y=`in element ${c} of "${A}"`;aB(E,h,Y);let R=[];if(j)for(let p of j){let l={},m=P(p,l,"text",d),v=P(p,l,"location",eA);aB(p,l,Y),R.push({text:m||"",location:sA(v,Y)})}u.push({id:t||"",pluginName:x||r,text:N||"",location:sA(S,Y),notes:R,detail:k?k.store(O):-1}),c++}return u}e(fB,"sanitizeMessages");function GB(B,A){let k=[];for(let r of B){if(typeof r!="string")throw new Error(`${JSON.stringify(A)} must be an array of strings`);k.push(r)}return k}e(GB,"sanitizeStringArray");function SA({path:B,contents:A}){let k=null;return{path:B,contents:A,get text(){let r=this.contents;return(k===null||r!==A)&&(A=r,k=MB(r)),k}}}e(SA,"convertOutputFiles");var fA="0.15.7",xA=e(B=>OB().build(B),"build"),vA=e(()=>{throw new Error('The "serve" API only works in node')},"serve"),MA=e((B,A)=>OB().transform(B,A),"transform"),yA=e((B,A)=>OB().formatMessages(B,A),"formatMessages"),CA=e((B,A)=>OB().analyzeMetafile(B,A),"analyzeMetafile"),wA=e(()=>{throw new Error('The "buildSync" API only works in node')},"buildSync"),RA=e(()=>{throw new Error('The "transformSync" API only works in node')},"transformSync"),DA=e(()=>{throw new Error('The "formatMessagesSync" API only works in node')},"formatMessagesSync"),IA=e(()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},"analyzeMetafileSync"),RB,ZB,OB=e(()=>{if(ZB)return ZB;throw RB?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},"ensureServiceIsRunning"),_A=e(B=>{B=gA(B||{});let A=B.wasmURL,k=B.wasmModule,r=B.worker!==!1;if(!A&&!k)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(RB)throw new Error('Cannot call "initialize" more than once');return RB=FA(A||"",k,r),RB.catch(()=>{RB=void 0}),RB},"initialize"),FA=e((B,A,k)=>vB(void 0,null,function*(){let r;if(A)r=A;else{let h=yield fetch(B);if(!h.ok)throw new Error(`Failed to download ${JSON.stringify(B)}`);r=yield h.arrayBuffer()}let u;if(k){let h=new Blob([`onmessage=((postMessage) => {
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
    })(postMessage)`],{type:"text/javascript"});u=new Worker(URL.createObjectURL(h))}else{let h=(t=>{var x=e((j,O,Y)=>new Promise((R,p)=>{var l=e(w=>{try{v(Y.next(w))}catch(D){p(D)}},"fulfilled"),m=e(w=>{try{v(Y.throw(w))}catch(D){p(D)}},"rejected"),v=e(w=>w.done?R(w.value):Promise.resolve(w.value).then(l,m),"step");v((Y=Y.apply(j,O)).next())}),"__async");let N,S={};for(let j=self;j;j=Object.getPrototypeOf(j))for(let O of Object.getOwnPropertyNames(j))O in S||Object.defineProperty(S,O,{get:()=>self[O]});return(()=>{let j=e(()=>{let R=new Error("not implemented");return R.code="ENOSYS",R},"enosys");if(!S.fs){let R="";S.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(p,l){R+=Y.decode(l);let m=R.lastIndexOf(`
`);return m!=-1&&(console.log(R.substr(0,m)),R=R.substr(m+1)),l.length},write(p,l,m,v,w,D){if(m!==0||v!==l.length||w!==null){D(j());return}let AB=this.writeSync(p,l);D(null,AB)},chmod(p,l,m){m(j())},chown(p,l,m,v){v(j())},close(p,l){l(j())},fchmod(p,l,m){m(j())},fchown(p,l,m,v){v(j())},fstat(p,l){l(j())},fsync(p,l){l(null)},ftruncate(p,l,m){m(j())},lchown(p,l,m,v){v(j())},link(p,l,m){m(j())},lstat(p,l){l(j())},mkdir(p,l,m){m(j())},open(p,l,m,v){v(j())},read(p,l,m,v,w,D){D(j())},readdir(p,l){l(j())},readlink(p,l){l(j())},rename(p,l,m){m(j())},rmdir(p,l){l(j())},stat(p,l){l(j())},symlink(p,l,m){m(j())},truncate(p,l,m){m(j())},unlink(p,l){l(j())},utimes(p,l,m,v){v(j())}}}if(S.process||(S.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw j()},pid:-1,ppid:-1,umask(){throw j()},cwd(){throw j()},chdir(){throw j()}}),!S.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!S.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!S.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!S.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let O=new TextEncoder("utf-8"),Y=new TextDecoder("utf-8");S.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=$=>{$!==0&&console.warn("exit code:",$)},this._exitPromise=new Promise($=>{this._resolveExitPromise=$}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let R=e(($,o)=>{this.mem.setUint32($+0,o,!0),this.mem.setUint32($+4,Math.floor(o/4294967296),!0)},"setInt64"),p=e($=>{let o=this.mem.getUint32($+0,!0),y=this.mem.getInt32($+4,!0);return o+y*4294967296},"getInt64"),l=e($=>{let o=this.mem.getFloat64($,!0);if(o===0)return;if(!isNaN(o))return o;let y=this.mem.getUint32($,!0);return this._values[y]},"loadValue"),m=e(($,o)=>{if(typeof o=="number"&&o!==0){if(isNaN(o)){this.mem.setUint32($+4,2146959360,!0),this.mem.setUint32($,0,!0);return}this.mem.setFloat64($,o,!0);return}if(o===void 0){this.mem.setFloat64($,0,!0);return}let a=this._ids.get(o);a===void 0&&(a=this._idPool.pop(),a===void 0&&(a=this._values.length),this._values[a]=o,this._goRefCounts[a]=0,this._ids.set(o,a)),this._goRefCounts[a]++;let i=0;switch(typeof o){case"object":o!==null&&(i=1);break;case"string":i=2;break;case"symbol":i=3;break;case"function":i=4;break}this.mem.setUint32($+4,2146959360|i,!0),this.mem.setUint32($,a,!0)},"storeValue"),v=e($=>{let o=p($+0),y=p($+8);return new Uint8Array(this._inst.exports.mem.buffer,o,y)},"loadSlice"),w=e($=>{let o=p($+0),y=p($+8),a=new Array(y);for(let i=0;i<y;i++)a[i]=l(o+i*8);return a},"loadSliceOfValues"),D=e($=>{let o=p($+0),y=p($+8);return Y.decode(new DataView(this._inst.exports.mem.buffer,o,y))},"loadString"),AB=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":$=>{$>>>=0;let o=this.mem.getInt32($+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(o)},"runtime.wasmWrite":$=>{$>>>=0;let o=p($+8),y=p($+16),a=this.mem.getInt32($+24,!0);S.fs.writeSync(o,new Uint8Array(this._inst.exports.mem.buffer,y,a))},"runtime.resetMemoryDataView":$=>{$>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":$=>{$>>>=0,R($+8,(AB+performance.now())*1e6)},"runtime.walltime":$=>{$>>>=0;let o=new Date().getTime();R($+8,o/1e3),this.mem.setInt32($+16,o%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":$=>{$>>>=0;let o=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(o,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(o);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},p($+8)+1)),this.mem.setInt32($+16,o,!0)},"runtime.clearTimeoutEvent":$=>{$>>>=0;let o=this.mem.getInt32($+8,!0);clearTimeout(this._scheduledTimeouts.get(o)),this._scheduledTimeouts.delete(o)},"runtime.getRandomData":$=>{$>>>=0,crypto.getRandomValues(v($+8))},"syscall/js.finalizeRef":$=>{$>>>=0;let o=this.mem.getUint32($+8,!0);if(this._goRefCounts[o]--,this._goRefCounts[o]===0){let y=this._values[o];this._values[o]=null,this._ids.delete(y),this._idPool.push(o)}},"syscall/js.stringVal":$=>{$>>>=0,m($+24,D($+8))},"syscall/js.valueGet":$=>{$>>>=0;let o=Reflect.get(l($+8),D($+16));$=this._inst.exports.getsp()>>>0,m($+32,o)},"syscall/js.valueSet":$=>{$>>>=0,Reflect.set(l($+8),D($+16),l($+32))},"syscall/js.valueDelete":$=>{$>>>=0,Reflect.deleteProperty(l($+8),D($+16))},"syscall/js.valueIndex":$=>{$>>>=0,m($+24,Reflect.get(l($+8),p($+16)))},"syscall/js.valueSetIndex":$=>{$>>>=0,Reflect.set(l($+8),p($+16),l($+24))},"syscall/js.valueCall":$=>{$>>>=0;try{let o=l($+8),y=Reflect.get(o,D($+16)),a=w($+32),i=Reflect.apply(y,o,a);$=this._inst.exports.getsp()>>>0,m($+56,i),this.mem.setUint8($+64,1)}catch(o){$=this._inst.exports.getsp()>>>0,m($+56,o),this.mem.setUint8($+64,0)}},"syscall/js.valueInvoke":$=>{$>>>=0;try{let o=l($+8),y=w($+16),a=Reflect.apply(o,void 0,y);$=this._inst.exports.getsp()>>>0,m($+40,a),this.mem.setUint8($+48,1)}catch(o){$=this._inst.exports.getsp()>>>0,m($+40,o),this.mem.setUint8($+48,0)}},"syscall/js.valueNew":$=>{$>>>=0;try{let o=l($+8),y=w($+16),a=Reflect.construct(o,y);$=this._inst.exports.getsp()>>>0,m($+40,a),this.mem.setUint8($+48,1)}catch(o){$=this._inst.exports.getsp()>>>0,m($+40,o),this.mem.setUint8($+48,0)}},"syscall/js.valueLength":$=>{$>>>=0,R($+16,parseInt(l($+8).length))},"syscall/js.valuePrepareString":$=>{$>>>=0;let o=O.encode(String(l($+8)));m($+16,o),R($+24,o.length)},"syscall/js.valueLoadString":$=>{$>>>=0;let o=l($+8);v($+16).set(o)},"syscall/js.valueInstanceOf":$=>{$>>>=0,this.mem.setUint8($+24,l($+8)instanceof l($+16)?1:0)},"syscall/js.copyBytesToGo":$=>{$>>>=0;let o=v($+8),y=l($+32);if(!(y instanceof Uint8Array||y instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let a=y.subarray(0,o.length);o.set(a),R($+40,a.length),this.mem.setUint8($+48,1)},"syscall/js.copyBytesToJS":$=>{$>>>=0;let o=l($+8),y=v($+16);if(!(o instanceof Uint8Array||o instanceof Uint8ClampedArray)){this.mem.setUint8($+48,0);return}let a=y.subarray(0,o.length);o.set(a),R($+40,a.length),this.mem.setUint8($+48,1)},debug:$=>{console.log($)}}}}run(R){return x(this,null,function*(){if(!(R instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=R,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,S,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[S,5],[this,6]]),this._idPool=[],this.exited=!1;let p=4096,l=e($=>{let o=p,y=O.encode($+"\0");return new Uint8Array(this.mem.buffer,p,y.length).set(y),p+=y.length,p%8!==0&&(p+=8-p%8),o},"strPtr"),m=this.argv.length,v=[];this.argv.forEach($=>{v.push(l($))}),v.push(0),Object.keys(this.env).sort().forEach($=>{v.push(l(`${$}=${this.env[$]}`))}),v.push(0);let D=p;v.forEach($=>{this.mem.setUint32(p,$,!0),this.mem.setUint32(p+4,0,!0),p+=8});let AB=4096+8192;if(p>=AB)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(m,D),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(R){let p=this;return function(){let l={id:R,this:this,args:arguments};return p._pendingEvent=l,p._resume(),l.result}}}})(),N=e(({data:j})=>{let O=new TextDecoder,Y=S.fs,R="";Y.writeSync=(w,D)=>{if(w===1)t(D);else if(w===2){R+=O.decode(D);let AB=R.split(`
`);AB.length>1&&console.log(AB.slice(0,-1).join(`
`)),R=AB[AB.length-1]}else throw new Error("Bad write");return D.length};let p=[],l,m=0;N=e(({data:w})=>{w.length>0&&(p.push(w),l&&l())},"onmessage"),Y.read=(w,D,AB,$,o,y)=>{if(w!==0||AB!==0||$!==D.length||o!==null)throw new Error("Bad read");if(p.length===0){l=e(()=>Y.read(w,D,AB,$,o,y),"resumeStdin");return}let a=p[0],i=Math.max(0,Math.min($,a.length-m));D.set(a.subarray(m,m+i),AB),m+=i,m===a.length&&(p.shift(),m=0),y(null,i)};let v=new S.Go;v.argv=["","--service=0.15.7"],j instanceof WebAssembly.Module?WebAssembly.instantiate(j,v.importObject).then(w=>v.run(w)):WebAssembly.instantiate(j,v.importObject).then(({instance:w})=>v.run(w))},"onmessage"),j=>N(j)})(t=>u.onmessage({data:t}));u={onmessage:null,postMessage:t=>setTimeout(()=>h({data:t})),terminate(){}}}u.postMessage(r),u.onmessage=({data:h})=>c(h);let{readFromStdout:c,service:E}=HA({writeToStdin(h){u.postMessage(h)},isSync:!1,isWriteUnavailable:!0,esbuild:FB});ZB={build:h=>new Promise((t,x)=>E.buildOrServe({callName:"build",refs:null,serveOptions:null,options:h,isTTY:!1,defaultWD:"/",callback:(N,S)=>N?x(N):t(S)})),transform:(h,t)=>new Promise((x,N)=>E.transform({callName:"transform",refs:null,input:h,options:t||{},isTTY:!1,fs:{readFile(S,j){j(new Error("Internal error"),null)},writeFile(S,j){j(null)}},callback:(S,j)=>S?N(S):x(j)})),formatMessages:(h,t)=>new Promise((x,N)=>E.formatMessages({callName:"formatMessages",refs:null,messages:h,options:t,callback:(S,j)=>S?N(S):x(j)})),analyzeMetafile:(h,t)=>new Promise((x,N)=>E.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof h=="string"?h:JSON.stringify(h),options:t,callback:(S,j)=>S?N(S):x(j)}))}}),"startRunningService"),WA=FB})(typeof BA=="object"?BA:{set exports(cB){(typeof self<"u"?self:this).esbuild=cB}})});var YA=new Error("timeout while waiting for mutex to become available"),ZA=new Error("mutex already locked"),OA=new Error("request for lock canceled"),qA=function(cB,T,C,nB){function bB(jB){return jB instanceof C?jB:new C(function(QB){QB(jB)})}return e(bB,"adopt"),new(C||(C=Promise))(function(jB,QB){function xB(rB){try{dB(nB.next(rB))}catch(XB){QB(XB)}}e(xB,"fulfilled");function DB(rB){try{dB(nB.throw(rB))}catch(XB){QB(XB)}}e(DB,"rejected");function dB(rB){rB.done?jB(rB.value):bB(rB.value).then(xB,DB)}e(dB,"step"),dB((nB=nB.apply(cB,T||[])).next())})},qB=class{constructor(T,C=OA){this._value=T,this._cancelError=C,this._weightedQueues=[],this._weightedWaiters=[]}acquire(T=1){if(T<=0)throw new Error(`invalid weight ${T}: must be positive`);return new Promise((C,nB)=>{this._weightedQueues[T-1]||(this._weightedQueues[T-1]=[]),this._weightedQueues[T-1].push({resolve:C,reject:nB}),this._dispatch()})}runExclusive(T,C=1){return qA(this,void 0,void 0,function*(){let[nB,bB]=yield this.acquire(C);try{return yield T(nB)}finally{bB()}})}waitForUnlock(T=1){if(T<=0)throw new Error(`invalid weight ${T}: must be positive`);return new Promise(C=>{this._weightedWaiters[T-1]||(this._weightedWaiters[T-1]=[]),this._weightedWaiters[T-1].push(C),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(T){this._value=T,this._dispatch()}release(T=1){if(T<=0)throw new Error(`invalid weight ${T}: must be positive`);this._value+=T,this._dispatch()}cancel(){this._weightedQueues.forEach(T=>T.forEach(C=>C.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var T;for(let C=this._value;C>0;C--){let nB=(T=this._weightedQueues[C-1])===null||T===void 0?void 0:T.shift();if(!nB)continue;let bB=this._value,jB=C;this._value-=C,C=this._value+1,nB.resolve([bB,this._newReleaser(jB)])}this._drainUnlockWaiters()}_newReleaser(T){let C=!1;return()=>{C||(C=!0,this.release(T))}}_drainUnlockWaiters(){for(let T=this._value;T>0;T--)!this._weightedWaiters[T-1]||(this._weightedWaiters[T-1].forEach(C=>C()),this._weightedWaiters[T-1]=[])}};e(qB,"Semaphore");var JA=function(cB,T,C,nB){function bB(jB){return jB instanceof C?jB:new C(function(QB){QB(jB)})}return e(bB,"adopt"),new(C||(C=Promise))(function(jB,QB){function xB(rB){try{dB(nB.next(rB))}catch(XB){QB(XB)}}e(xB,"fulfilled");function DB(rB){try{dB(nB.throw(rB))}catch(XB){QB(XB)}}e(DB,"rejected");function dB(rB){rB.done?jB(rB.value):bB(rB.value).then(xB,DB)}e(dB,"step"),dB((nB=nB.apply(cB,T||[])).next())})},IB=class{constructor(T){this._semaphore=new qB(1,T)}acquire(){return JA(this,void 0,void 0,function*(){let[,T]=yield this._semaphore.acquire();return T})}runExclusive(T){return this._semaphore.runExclusive(()=>T())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};e(IB,"Mutex");var VB=GA(oA());var lA="./chunk-esbuild-ZTDJQG3V.wasm";var KA=new IB,JB={initialize:VB.initialize,transform:async(cB,T)=>await KA.runExclusive(async()=>{try{console.info("esbuild start");let C=await(0,VB.transform)(cB,T);return console.info("esbuild transpile done"),C}catch(C){throw console.error("Ebuild transform error: ",{code:cB,err:C}),C}})},_B=!1,t7=e(async()=>{try{if(_B===!0||(_B=_B||new Promise(cB=>{JB.initialize({wasmURL:new URL(lA,import.meta.url).toString()}).then(()=>cB(!0))}),await _B===!0))return JB;throw new Error("esbuild couldn't initialize")}catch{throw new Error("esbuild couldn't initialize")}finally{if(await _B===!0)return JB;throw new Error("esbuild couldn't initialize")}},"init");export{t7 as init};
