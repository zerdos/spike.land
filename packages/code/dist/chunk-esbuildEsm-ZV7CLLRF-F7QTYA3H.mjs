import{a as l,c as yt,e as bt,i as qe}from"./chunk-MMD7NQBO.mjs";var Gt=yt({"../../../../.yarn/global/cache/esbuild-wasm-npm-0.15.7-ff6d98f037-9c9.zip/node_modules/esbuild-wasm/lib/browser.js"(S,V){qe(),(K=>{"use strict";var ce=Object.defineProperty,Oe=Object.defineProperties,be=Object.getOwnPropertyDescriptor,_e=Object.getOwnPropertyDescriptors,Re=Object.getOwnPropertyNames,$e=Object.getOwnPropertySymbols,ve=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable,ke=l((e,t,r)=>t in e?ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,"__defNormalProp"),it=l((e,t)=>{for(var r in t||(t={}))ve.call(t,r)&&ke(e,r,t[r]);if($e)for(var r of $e(t))de.call(t,r)&&ke(e,r,t[r]);return e},"__spreadValues"),at=l((e,t)=>Oe(e,_e(t)),"__spreadProps"),kt=l((e,t)=>{for(var r in t)ce(e,r,{get:t[r],enumerable:!0})},"__export"),Et=l((e,t,r,u)=>{if(t&&typeof t=="object"||typeof t=="function")for(let w of Re(t))!ve.call(e,w)&&w!==r&&ce(e,w,{get:()=>t[w],enumerable:!(u=be(t,w))||u.enumerable});return e},"__copyProps"),St=l(e=>Et(ce({},"__esModule",{value:!0}),e),"__toCommonJS"),Ce=l((e,t,r)=>new Promise((u,w)=>{var y=l(a=>{try{b(r.next(a))}catch(P){w(P)}},"fulfilled"),i=l(a=>{try{b(r.throw(a))}catch(P){w(P)}},"rejected"),b=l(a=>a.done?u(a.value):Promise.resolve(a.value).then(y,i),"step");b((r=r.apply(e,t)).next())}),"__async"),We={};kt(We,{analyzeMetafile:()=>It,analyzeMetafileSync:()=>Bt,build:()=>Ut,buildSync:()=>Mt,default:()=>Lt,formatMessages:()=>At,formatMessagesSync:()=>Ft,initialize:()=>Vt,serve:()=>Dt,transform:()=>Ct,transformSync:()=>Nt,version:()=>Rt}),K.exports=St(We);function Ye(e){let t=l(u=>{if(u===null)r.write8(0);else if(typeof u=="boolean")r.write8(1),r.write8(+u);else if(typeof u=="number")r.write8(2),r.write32(u|0);else if(typeof u=="string")r.write8(3),r.write(Ee(u));else if(u instanceof Uint8Array)r.write8(4),r.write(u);else if(u instanceof Array){r.write8(5),r.write32(u.length);for(let w of u)t(w)}else{let w=Object.keys(u);r.write8(6),r.write32(w.length);for(let y of w)r.write(Ee(y)),t(u[y])}},"visit"),r=new ut;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),t(e.value),Le(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}l(Ye,"encodePacket");function ot(e){let t=l(()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return Ae(r.read());case 4:return r.read();case 5:{let i=r.read32(),b=[];for(let a=0;a<i;a++)b.push(t());return b}case 6:{let i=r.read32(),b={};for(let a=0;a<i;a++)b[Ae(r.read())]=t();return b}default:throw new Error("Invalid packet")}},"visit"),r=new ut(e),u=r.read32(),w=(u&1)===0;u>>>=1;let y=t();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:u,isRequest:w,value:y}}l(ot,"decodePacket");var ut=l(class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let t=new Uint8Array((this.len+e)*2);t.set(this.buf),this.buf=t}return this.len+=e,this.len-e}write8(e){let t=this._write(1);this.buf[t]=e}write32(e){let t=this._write(4);Le(this.buf,e,t)}write(e){let t=this._write(4+e.length);Le(this.buf,e.length,t),this.buf.set(e,t+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return He(this.buf,this._read(4))}read(){let e=this.read32(),t=new Uint8Array(e),r=this._read(t.length);return t.set(this.buf.subarray(r,r+e)),t}},"ByteBuffer"),Ee,Ae;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let e=new TextEncoder,t=new TextDecoder;Ee=l(r=>e.encode(r),"encodeUTF8"),Ae=l(r=>t.decode(r),"decodeUTF8")}else if(typeof Buffer<"u")Ee=l(e=>{let t=Buffer.from(e);return t instanceof Uint8Array||(t=new Uint8Array(t)),t},"encodeUTF8"),Ae=l(e=>{let{buffer:t,byteOffset:r,byteLength:u}=e;return Buffer.from(t,r,u).toString()},"decodeUTF8");else throw new Error("No UTF-8 codec found");function He(e,t){return e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24}l(He,"readUInt32LE");function Le(e,t,r){e[r++]=t,e[r++]=t>>8,e[r++]=t>>16,e[r++]=t>>24}l(Le,"writeUInt32LE");function Ke(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}l(Ke,"validateTarget");var ze=l(()=>null,"canBeAnything"),ee=l(e=>typeof e=="boolean"?null:"a boolean","mustBeBoolean"),Ot=l(e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object","mustBeBooleanOrObject"),x=l(e=>typeof e=="string"?null:"a string","mustBeString"),Je=l(e=>e instanceof RegExp?null:"a RegExp object","mustBeRegExp"),Ie=l(e=>typeof e=="number"&&e===(e|0)?null:"an integer","mustBeInteger"),Xe=l(e=>typeof e=="function"?null:"a function","mustBeFunction"),ae=l(e=>Array.isArray(e)?null:"an array","mustBeArray"),Se=l(e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object","mustBeObject"),jt=l(e=>e instanceof WebAssembly.Module?null:"a WebAssembly.Module","mustBeWebAssemblyModule"),Tt=l(e=>typeof e=="object"&&e!==null?null:"an array or an object","mustBeArrayOrRecord"),ct=l(e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null","mustBeObjectOrNull"),ft=l(e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean","mustBeStringOrBoolean"),$t=l(e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object","mustBeStringOrObject"),Pt=l(e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array","mustBeStringOrArray"),dt=l(e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array","mustBeStringOrUint8Array");function s(e,t,r,u){let w=e[r];if(t[r+""]=!0,w===void 0)return;let y=u(w);if(y!==null)throw new Error(`"${r}" must be ${y}`);return w}l(s,"getFlag");function oe(e,t,r){for(let u in e)if(!(u in t))throw new Error(`Invalid option ${r}: "${u}"`)}l(oe,"checkForInvalidFlags");function ht(e){let t=Object.create(null),r=s(e,t,"wasmURL",x),u=s(e,t,"wasmModule",jt),w=s(e,t,"worker",ee);return oe(e,t,"in initialize() call"),{wasmURL:r,wasmModule:u,worker:w}}l(ht,"validateInitializeOptions");function Ze(e){let t;if(e!==void 0){t=Object.create(null);for(let r of Object.keys(e)){let u=e[r];if(typeof u=="string"||u===!1)t[r]=u;else throw new Error(`Expected ${JSON.stringify(r)} in mangle cache to map to either a string or false`)}}return t}l(Ze,"validateMangleCache");function Ne(e,t,r,u,w){let y=s(t,r,"color",ee),i=s(t,r,"logLevel",x),b=s(t,r,"logLimit",Ie);y!==void 0?e.push(`--color=${y}`):u&&e.push("--color=true"),e.push(`--log-level=${i||w}`),e.push(`--log-limit=${b||0}`)}l(Ne,"pushLogFlags");function et(e,t,r){let u=s(t,r,"legalComments",x),w=s(t,r,"sourceRoot",x),y=s(t,r,"sourcesContent",ee),i=s(t,r,"target",Pt),b=s(t,r,"format",x),a=s(t,r,"globalName",x),P=s(t,r,"mangleProps",Je),z=s(t,r,"reserveProps",Je),T=s(t,r,"mangleQuoted",ee),g=s(t,r,"minify",ee),G=s(t,r,"minifySyntax",ee),X=s(t,r,"minifyWhitespace",ee),A=s(t,r,"minifyIdentifiers",ee),p=s(t,r,"drop",ae),m=s(t,r,"charset",x),_=s(t,r,"treeShaking",ee),R=s(t,r,"ignoreAnnotations",ee),C=s(t,r,"jsx",x),I=s(t,r,"jsxFactory",x),ne=s(t,r,"jsxFragment",x),n=s(t,r,"jsxImportSource",x),f=s(t,r,"jsxDev",ee),U=s(t,r,"define",Se),c=s(t,r,"logOverride",Se),d=s(t,r,"supported",Se),h=s(t,r,"pure",ae),v=s(t,r,"keepNames",ee),J=s(t,r,"platform",x);if(u&&e.push(`--legal-comments=${u}`),w!==void 0&&e.push(`--source-root=${w}`),y!==void 0&&e.push(`--sources-content=${y}`),i&&(Array.isArray(i)?e.push(`--target=${Array.from(i).map(Ke).join(",")}`):e.push(`--target=${Ke(i)}`)),b&&e.push(`--format=${b}`),a&&e.push(`--global-name=${a}`),J&&e.push(`--platform=${J}`),g&&e.push("--minify"),G&&e.push("--minify-syntax"),X&&e.push("--minify-whitespace"),A&&e.push("--minify-identifiers"),m&&e.push(`--charset=${m}`),_!==void 0&&e.push(`--tree-shaking=${_}`),R&&e.push("--ignore-annotations"),p)for(let $ of p)e.push(`--drop:${$}`);if(P&&e.push(`--mangle-props=${P.source}`),z&&e.push(`--reserve-props=${z.source}`),T!==void 0&&e.push(`--mangle-quoted=${T}`),C&&e.push(`--jsx=${C}`),I&&e.push(`--jsx-factory=${I}`),ne&&e.push(`--jsx-fragment=${ne}`),n&&e.push(`--jsx-import-source=${n}`),f&&e.push("--jsx-dev"),U)for(let $ in U){if($.indexOf("=")>=0)throw new Error(`Invalid define: ${$}`);e.push(`--define:${$}=${U[$]}`)}if(c)for(let $ in c){if($.indexOf("=")>=0)throw new Error(`Invalid log override: ${$}`);e.push(`--log-override:${$}=${c[$]}`)}if(d)for(let $ in d){if($.indexOf("=")>=0)throw new Error(`Invalid supported: ${$}`);e.push(`--supported:${$}=${d[$]}`)}if(h)for(let $ of h)e.push(`--pure:${$}`);v&&e.push("--keep-names")}l(et,"pushCommonFlags");function mt(e,t,r,u,w){var y;let i=[],b=[],a=Object.create(null),P=null,z=null,T=null;Ne(i,t,a,r,u),et(i,t,a);let g=s(t,a,"sourcemap",ft),G=s(t,a,"bundle",ee),X=s(t,a,"watch",Ot),A=s(t,a,"splitting",ee),p=s(t,a,"preserveSymlinks",ee),m=s(t,a,"metafile",ee),_=s(t,a,"outfile",x),R=s(t,a,"outdir",x),C=s(t,a,"outbase",x),I=s(t,a,"tsconfig",x),ne=s(t,a,"resolveExtensions",ae),n=s(t,a,"nodePaths",ae),f=s(t,a,"mainFields",ae),U=s(t,a,"conditions",ae),c=s(t,a,"external",ae),d=s(t,a,"loader",Se),h=s(t,a,"outExtension",Se),v=s(t,a,"publicPath",x),J=s(t,a,"entryNames",x),$=s(t,a,"chunkNames",x),W=s(t,a,"assetNames",x),N=s(t,a,"inject",ae),q=s(t,a,"banner",Se),L=s(t,a,"footer",Se),D=s(t,a,"entryPoints",Tt),Z=s(t,a,"absWorkingDir",x),M=s(t,a,"stdin",Se),Q=(y=s(t,a,"write",ee))!=null?y:w,re=s(t,a,"allowOverwrite",ee),ye=s(t,a,"incremental",ee)===!0,F=s(t,a,"mangleCache",Se);if(a.plugins=!0,oe(t,a,`in ${e}() call`),g&&i.push(`--sourcemap${g===!0?"":`=${g}`}`),G&&i.push("--bundle"),re&&i.push("--allow-overwrite"),X)if(i.push("--watch"),typeof X=="boolean")T={};else{let o=Object.create(null),k=s(X,o,"onRebuild",Xe);oe(X,o,`on "watch" in ${e}() call`),T={onRebuild:k}}if(A&&i.push("--splitting"),p&&i.push("--preserve-symlinks"),m&&i.push("--metafile"),_&&i.push(`--outfile=${_}`),R&&i.push(`--outdir=${R}`),C&&i.push(`--outbase=${C}`),I&&i.push(`--tsconfig=${I}`),ne){let o=[];for(let k of ne){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${k}`);o.push(k)}i.push(`--resolve-extensions=${o.join(",")}`)}if(v&&i.push(`--public-path=${v}`),J&&i.push(`--entry-names=${J}`),$&&i.push(`--chunk-names=${$}`),W&&i.push(`--asset-names=${W}`),f){let o=[];for(let k of f){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid main field: ${k}`);o.push(k)}i.push(`--main-fields=${o.join(",")}`)}if(U){let o=[];for(let k of U){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid condition: ${k}`);o.push(k)}i.push(`--conditions=${o.join(",")}`)}if(c)for(let o of c)i.push(`--external:${o}`);if(q)for(let o in q){if(o.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${o}`);i.push(`--banner:${o}=${q[o]}`)}if(L)for(let o in L){if(o.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${o}`);i.push(`--footer:${o}=${L[o]}`)}if(N)for(let o of N)i.push(`--inject:${o}`);if(d)for(let o in d){if(o.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${o}`);i.push(`--loader:${o}=${d[o]}`)}if(h)for(let o in h){if(o.indexOf("=")>=0)throw new Error(`Invalid out extension: ${o}`);i.push(`--out-extension:${o}=${h[o]}`)}if(D)if(Array.isArray(D))for(let o of D)b.push(["",o+""]);else for(let[o,k]of Object.entries(D))b.push([o+"",k+""]);if(M){let o=Object.create(null),k=s(M,o,"contents",dt),te=s(M,o,"resolveDir",x),le=s(M,o,"sourcefile",x),O=s(M,o,"loader",x);oe(M,o,'in "stdin" object'),le&&i.push(`--sourcefile=${le}`),O&&i.push(`--loader=${O}`),te&&(z=te+""),typeof k=="string"?P=Ee(k):k instanceof Uint8Array&&(P=k)}let j=[];if(n)for(let o of n)o+="",j.push(o);return{entries:b,flags:i,write:Q,stdinContents:P,stdinResolveDir:z,absWorkingDir:Z,incremental:ye,nodePaths:j,watch:T,mangleCache:Ze(F)}}l(mt,"flagsForBuildOptions");function gt(e,t,r,u){let w=[],y=Object.create(null);Ne(w,t,y,r,u),et(w,t,y);let i=s(t,y,"sourcemap",ft),b=s(t,y,"tsconfigRaw",$t),a=s(t,y,"sourcefile",x),P=s(t,y,"loader",x),z=s(t,y,"banner",x),T=s(t,y,"footer",x),g=s(t,y,"mangleCache",Se);return oe(t,y,`in ${e}() call`),i&&w.push(`--sourcemap=${i===!0?"external":i}`),b&&w.push(`--tsconfig-raw=${typeof b=="string"?b:JSON.stringify(b)}`),a&&w.push(`--sourcefile=${a}`),P&&w.push(`--loader=${P}`),z&&w.push(`--banner=${z}`),T&&w.push(`--footer=${T}`),{flags:w,mangleCache:Ze(g)}}l(gt,"flagsForTransformOptions");function pt(e){let t=new Map,r=new Map,u=new Map,w=new Map,y=null,i=0,b=0,a=new Uint8Array(16*1024),P=0,z=l(c=>{let d=P+c.length;if(d>a.length){let v=new Uint8Array(d*2);v.set(a),a=v}a.set(c,P),P+=c.length;let h=0;for(;h+4<=P;){let v=He(a,h);if(h+4+v>P)break;h+=4,p(a.subarray(h,h+v)),h+=v}h>0&&(a.copyWithin(0,h,P),P-=h)},"readFromStdout"),T=l(c=>{y={reason:c?": "+(c.message||c):""};let d="The service was stopped"+y.reason;for(let h of t.values())h(d,null);t.clear();for(let h of w.values())h.onWait(d);w.clear();for(let h of u.values())try{h(new Error(d),null)}catch(v){console.error(v)}u.clear()},"afterClose"),g=l((c,d,h)=>{if(y)return h("The service is no longer running"+y.reason,null);let v=i++;t.set(v,(J,$)=>{try{h(J,$)}finally{c&&c.unref()}}),c&&c.ref(),e.writeToStdin(Ye({id:v,isRequest:!0,value:d}))},"sendRequest"),G=l((c,d)=>{if(y)throw new Error("The service is no longer running"+y.reason);e.writeToStdin(Ye({id:c,isRequest:!1,value:d}))},"sendResponse"),X=l((c,d)=>Ce(this,null,function*(){try{switch(d.command){case"ping":{G(c,{});break}case"on-start":{let h=r.get(d.key);h?G(c,yield h(d)):G(c,{});break}case"on-resolve":{let h=r.get(d.key);h?G(c,yield h(d)):G(c,{});break}case"on-load":{let h=r.get(d.key);h?G(c,yield h(d)):G(c,{});break}case"serve-request":{let h=w.get(d.key);h&&h.onRequest&&h.onRequest(d.args),G(c,{});break}case"serve-wait":{let h=w.get(d.key);h&&h.onWait(d.error),G(c,{});break}case"watch-rebuild":{let h=u.get(d.key);try{h&&h(null,d.args)}catch(v){console.error(v)}G(c,{});break}default:throw new Error("Invalid command: "+d.command)}}catch(h){G(c,{errors:[Ue(h,e,null,void 0,"")]})}}),"handleRequest"),A=!0,p=l(c=>{if(A){A=!1;let h=String.fromCharCode(...c);if(h!=="0.15.7")throw new Error(`Cannot start service: Host version "0.15.7" does not match binary version ${JSON.stringify(h)}`);return}let d=ot(c);if(d.isRequest)X(d.id,d.value);else{let h=t.get(d.id);t.delete(d.id),d.value.error?h(d.value.error,{}):h(null,d.value)}},"handleIncomingPacket"),m=l((c,d,h,v,J)=>Ce(this,null,function*(){let $=[],W=[],N={},q={},L=0,D=0,Z=[],M=!1;d=[...d];for(let F of d){let j={};if(typeof F!="object")throw new Error(`Plugin at index ${D} must be an object`);let o=s(F,j,"name",x);if(typeof o!="string"||o==="")throw new Error(`Plugin at index ${D} is missing a name`);try{let k=s(F,j,"setup",Xe);if(typeof k!="function")throw new Error("Plugin is missing a setup function");oe(F,j,`on plugin ${JSON.stringify(o)}`);let te={name:o,onResolve:[],onLoad:[]};D++;let le=l((E,Y={})=>{if(!M)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof E!="string")throw new Error("The path to resolve must be a string");let B=Object.create(null),he=s(Y,B,"pluginName",x),se=s(Y,B,"importer",x),ue=s(Y,B,"namespace",x),pe=s(Y,B,"resolveDir",x),me=s(Y,B,"kind",x),H=s(Y,B,"pluginData",ze);return oe(Y,B,"in resolve() call"),new Promise((fe,ge)=>{let ie={command:"resolve",path:E,key:h,pluginName:o};he!=null&&(ie.pluginName=he),se!=null&&(ie.importer=se),ue!=null&&(ie.namespace=ue),pe!=null&&(ie.resolveDir=pe),me!=null&&(ie.kind=me),H!=null&&(ie.pluginData=v.store(H)),g(J,ie,(Te,we)=>{Te!==null?ge(new Error(Te)):fe({errors:je(we.errors,v),warnings:je(we.warnings,v),path:we.path,external:we.external,sideEffects:we.sideEffects,namespace:we.namespace,suffix:we.suffix,pluginData:v.load(we.pluginData)})})})},"resolve"),O=k({initialOptions:c,resolve:le,onStart(E){let Y='This error came from the "onStart" callback registered here:',B=Fe(new Error(Y),e,"onStart");$.push({name:o,callback:E,note:B})},onEnd(E){let Y='This error came from the "onEnd" callback registered here:',B=Fe(new Error(Y),e,"onEnd");W.push({name:o,callback:E,note:B})},onResolve(E,Y){let B='This error came from the "onResolve" callback registered here:',he=Fe(new Error(B),e,"onResolve"),se={},ue=s(E,se,"filter",Je),pe=s(E,se,"namespace",x);if(oe(E,se,`in onResolve() call for plugin ${JSON.stringify(o)}`),ue==null)throw new Error("onResolve() call is missing a filter");let me=L++;N[me]={name:o,callback:Y,note:he},te.onResolve.push({id:me,filter:ue.source,namespace:pe||""})},onLoad(E,Y){let B='This error came from the "onLoad" callback registered here:',he=Fe(new Error(B),e,"onLoad"),se={},ue=s(E,se,"filter",Je),pe=s(E,se,"namespace",x);if(oe(E,se,`in onLoad() call for plugin ${JSON.stringify(o)}`),ue==null)throw new Error("onLoad() call is missing a filter");let me=L++;q[me]={name:o,callback:Y,note:he},te.onLoad.push({id:me,filter:ue.source,namespace:pe||""})},esbuild:e.esbuild});O&&(yield O),Z.push(te)}catch(k){return{ok:!1,error:k,pluginName:o}}}let Q=l(F=>Ce(this,null,function*(){switch(F.command){case"on-start":{let j={errors:[],warnings:[]};return yield Promise.all($.map(o=>Ce(this,[o],function*({name:k,callback:te,note:le}){try{let O=yield te();if(O!=null){if(typeof O!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(k)} to return an object`);let E={},Y=s(O,E,"errors",ae),B=s(O,E,"warnings",ae);oe(O,E,`from onStart() callback in plugin ${JSON.stringify(k)}`),Y!=null&&j.errors.push(...Pe(Y,"errors",v,k)),B!=null&&j.warnings.push(...Pe(B,"warnings",v,k))}}catch(O){j.errors.push(Ue(O,e,v,le&&le(),k))}}))),j}case"on-resolve":{let j={},o="",k,te;for(let le of F.ids)try{({name:o,callback:k,note:te}=N[le]);let O=yield k({path:F.path,importer:F.importer,namespace:F.namespace,resolveDir:F.resolveDir,kind:F.kind,pluginData:v.load(F.pluginData)});if(O!=null){if(typeof O!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(o)} to return an object`);let E={},Y=s(O,E,"pluginName",x),B=s(O,E,"path",x),he=s(O,E,"namespace",x),se=s(O,E,"suffix",x),ue=s(O,E,"external",ee),pe=s(O,E,"sideEffects",ee),me=s(O,E,"pluginData",ze),H=s(O,E,"errors",ae),fe=s(O,E,"warnings",ae),ge=s(O,E,"watchFiles",ae),ie=s(O,E,"watchDirs",ae);oe(O,E,`from onResolve() callback in plugin ${JSON.stringify(o)}`),j.id=le,Y!=null&&(j.pluginName=Y),B!=null&&(j.path=B),he!=null&&(j.namespace=he),se!=null&&(j.suffix=se),ue!=null&&(j.external=ue),pe!=null&&(j.sideEffects=pe),me!=null&&(j.pluginData=v.store(me)),H!=null&&(j.errors=Pe(H,"errors",v,o)),fe!=null&&(j.warnings=Pe(fe,"warnings",v,o)),ge!=null&&(j.watchFiles=Be(ge,"watchFiles")),ie!=null&&(j.watchDirs=Be(ie,"watchDirs"));break}}catch(O){return{id:le,errors:[Ue(O,e,v,te&&te(),o)]}}return j}case"on-load":{let j={},o="",k,te;for(let le of F.ids)try{({name:o,callback:k,note:te}=q[le]);let O=yield k({path:F.path,namespace:F.namespace,suffix:F.suffix,pluginData:v.load(F.pluginData)});if(O!=null){if(typeof O!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(o)} to return an object`);let E={},Y=s(O,E,"pluginName",x),B=s(O,E,"contents",dt),he=s(O,E,"resolveDir",x),se=s(O,E,"pluginData",ze),ue=s(O,E,"loader",x),pe=s(O,E,"errors",ae),me=s(O,E,"warnings",ae),H=s(O,E,"watchFiles",ae),fe=s(O,E,"watchDirs",ae);oe(O,E,`from onLoad() callback in plugin ${JSON.stringify(o)}`),j.id=le,Y!=null&&(j.pluginName=Y),B instanceof Uint8Array?j.contents=B:B!=null&&(j.contents=Ee(B)),he!=null&&(j.resolveDir=he),se!=null&&(j.pluginData=v.store(se)),ue!=null&&(j.loader=ue),pe!=null&&(j.errors=Pe(pe,"errors",v,o)),me!=null&&(j.warnings=Pe(me,"warnings",v,o)),H!=null&&(j.watchFiles=Be(H,"watchFiles")),fe!=null&&(j.watchDirs=Be(fe,"watchDirs"));break}}catch(O){return{id:le,errors:[Ue(O,e,v,te&&te(),o)]}}return j}default:throw new Error("Invalid command: "+F.command)}}),"callback"),re=l((F,j,o)=>o(),"runOnEndCallbacks");W.length>0&&(re=l((F,j,o)=>{(()=>Ce(this,null,function*(){for(let{name:k,callback:te,note:le}of W)try{yield te(F)}catch(O){F.errors.push(yield new Promise(E=>j(O,k,le&&le(),E)))}}))().then(o)},"runOnEndCallbacks")),M=!0;let ye=0;return{ok:!0,requestPlugins:Z,runOnEndCallbacks:re,pluginRefs:{ref(){++ye===1&&r.set(h,Q)},unref(){--ye===0&&r.delete(h)}}}}),"handlePlugins"),_=l((c,d,h,v)=>{let J={},$=s(d,J,"port",Ie),W=s(d,J,"host",x),N=s(d,J,"servedir",x),q=s(d,J,"onRequest",Xe),L,D=new Promise((Z,M)=>{L=l(Q=>{w.delete(v),Q!==null?M(new Error(Q)):Z()},"onWait")});return h.serve={},oe(d,J,"in serve() call"),$!==void 0&&(h.serve.port=$),W!==void 0&&(h.serve.host=W),N!==void 0&&(h.serve.servedir=N),w.set(v,{onRequest:q,onWait:L}),{wait:D,stop(){g(c,{command:"serve-stop",key:v},()=>{})}}},"buildServeData"),R="warning",C="silent",I=l(c=>{let d=b++,h=tt(),v,{refs:J,options:$,isTTY:W,callback:N}=c;if(typeof $=="object"){let D=$.plugins;if(D!==void 0){if(!Array.isArray(D))throw new Error('"plugins" must be an array');v=D}}let q=l((D,Z,M,Q)=>{let re=[];try{Ne(re,$,{},W,R)}catch{}let ye=Ue(D,e,h,M,Z);g(J,{command:"error",flags:re,error:ye},()=>{ye.detail=h.load(ye.detail),Q(ye)})},"logPluginError"),L=l((D,Z)=>{q(D,Z,void 0,M=>{N(De("Build failed",[M],[]),null)})},"handleError");if(v&&v.length>0){if(e.isSync)return L(new Error("Cannot use plugins in synchronous API calls"),"");m($,v,d,h,J).then(D=>{if(!D.ok)L(D.error,D.pluginName);else try{ne(at(it({},c),{key:d,details:h,logPluginError:q,requestPlugins:D.requestPlugins,runOnEndCallbacks:D.runOnEndCallbacks,pluginRefs:D.pluginRefs}))}catch(Z){L(Z,"")}},D=>L(D,""))}else try{ne(at(it({},c),{key:d,details:h,logPluginError:q,requestPlugins:null,runOnEndCallbacks:(D,Z,M)=>M(),pluginRefs:null}))}catch(D){L(D,"")}},"buildOrServe"),ne=l(({callName:c,refs:d,serveOptions:h,options:v,isTTY:J,defaultWD:$,callback:W,key:N,details:q,logPluginError:L,requestPlugins:D,runOnEndCallbacks:Z,pluginRefs:M})=>{let Q={ref(){M&&M.ref(),d&&d.ref()},unref(){M&&M.unref(),d&&d.unref()}},re=!e.isWriteUnavailable,{entries:ye,flags:F,write:j,stdinContents:o,stdinResolveDir:k,absWorkingDir:te,incremental:le,nodePaths:O,watch:E,mangleCache:Y}=mt(c,v,J,R,re),B={command:"build",key:N,entries:ye,flags:F,write:j,stdinContents:o,stdinResolveDir:k,absWorkingDir:te||$,incremental:le,nodePaths:O};D&&(B.plugins=D),Y&&(B.mangleCache=Y);let he=h&&_(Q,h,B,N),se,ue,pe=l((H,fe)=>{H.outputFiles&&(fe.outputFiles=H.outputFiles.map(wt)),H.metafile&&(fe.metafile=JSON.parse(H.metafile)),H.mangleCache&&(fe.mangleCache=H.mangleCache),H.writeToStdout!==void 0&&console.log(Ae(H.writeToStdout).replace(/\n$/,""))},"copyResponseToResult"),me=l((H,fe)=>{let ge={errors:je(H.errors,q),warnings:je(H.warnings,q)};pe(H,ge),Z(ge,L,()=>{if(ge.errors.length>0)return fe(De("Build failed",ge.errors,ge.warnings),null);if(H.rebuild){if(!se){let ie=!1;se=l(()=>new Promise((Te,we)=>{if(ie||y)throw new Error("Cannot rebuild");g(Q,{command:"rebuild",key:N},(xe,zt)=>{if(xe)return fe(De("Build failed",[{id:"",pluginName:"",text:xe,location:null,notes:[],detail:void 0}],[]),null);me(zt,(lt,Jt)=>{lt?we(lt):Te(Jt)})})}),"rebuild"),Q.ref(),se.dispose=()=>{ie||(ie=!0,g(Q,{command:"rebuild-dispose",key:N},()=>{}),Q.unref())}}ge.rebuild=se}if(H.watch){if(!ue){let ie=!1;Q.ref(),ue=l(()=>{ie||(ie=!0,u.delete(N),g(Q,{command:"watch-stop",key:N},()=>{}),Q.unref())},"stop"),E&&u.set(N,(Te,we)=>{if(Te){E.onRebuild&&E.onRebuild(Te,null);return}let xe={errors:je(we.errors,q),warnings:je(we.warnings,q)};pe(we,xe),Z(xe,L,()=>{if(xe.errors.length>0){E.onRebuild&&E.onRebuild(De("Build failed",xe.errors,xe.warnings),null);return}we.rebuildID!==void 0&&(xe.rebuild=se),xe.stop=ue,E.onRebuild&&E.onRebuild(null,xe)})})}ge.stop=ue}fe(null,ge)})},"buildResponseToResult");if(j&&e.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(le&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(E&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');g(Q,B,(H,fe)=>{if(H)return W(new Error(H),null);if(he){let ge=fe,ie=!1;Q.ref();let Te={port:ge.port,host:ge.host,wait:he.wait,stop(){ie||(ie=!0,he.stop(),Q.unref())}};return Q.ref(),he.wait.then(Q.unref,Q.unref),W(null,Te)}return me(fe,W)})},"buildOrServeContinue"),n=l(({callName:c,refs:d,input:h,options:v,isTTY:J,fs:$,callback:W})=>{let N=tt(),q=l(L=>{try{if(typeof h!="string"&&!(h instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:D,mangleCache:Z}=gt(c,v,J,C),M={command:"transform",flags:D,inputFS:L!==null,input:L!==null?Ee(L):typeof h=="string"?Ee(h):h};Z&&(M.mangleCache=Z),g(d,M,(Q,re)=>{if(Q)return W(new Error(Q),null);let ye=je(re.errors,N),F=je(re.warnings,N),j=1,o=l(()=>{if(--j===0){let k={warnings:F,code:re.code,map:re.map};re.mangleCache&&(k.mangleCache=re?.mangleCache),W(null,k)}},"next");if(ye.length>0)return W(De("Transform failed",ye,F),null);re.codeFS&&(j++,$.readFile(re.code,(k,te)=>{k!==null?W(k,null):(re.code=te,o())})),re.mapFS&&(j++,$.readFile(re.map,(k,te)=>{k!==null?W(k,null):(re.map=te,o())})),o()})}catch(D){let Z=[];try{Ne(Z,v,{},J,C)}catch{}let M=Ue(D,e,N,void 0,"");g(d,{command:"error",flags:Z,error:M},()=>{M.detail=N.load(M.detail),W(De("Transform failed",[M],[]),null)})}},"start");if((typeof h=="string"||h instanceof Uint8Array)&&h.length>1024*1024){let L=q;q=l(()=>$.writeFile(h,L),"start")}q(null)},"transform2"),f=l(({callName:c,refs:d,messages:h,options:v,callback:J})=>{let $=Pe(h,"messages",null,"");if(!v)throw new Error(`Missing second argument in ${c}() call`);let W={},N=s(v,W,"kind",x),q=s(v,W,"color",ee),L=s(v,W,"terminalWidth",Ie);if(oe(v,W,`in ${c}() call`),N===void 0)throw new Error(`Missing "kind" in ${c}() call`);if(N!=="error"&&N!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${c}() call`);let D={command:"format-msgs",messages:$,isWarning:N==="warning"};q!==void 0&&(D.color=q),L!==void 0&&(D.terminalWidth=L),g(d,D,(Z,M)=>{if(Z)return J(new Error(Z),null);J(null,M.messages)})},"formatMessages2"),U=l(({callName:c,refs:d,metafile:h,options:v,callback:J})=>{v===void 0&&(v={});let $={},W=s(v,$,"color",ee),N=s(v,$,"verbose",ee);oe(v,$,`in ${c}() call`);let q={command:"analyze-metafile",metafile:h};W!==void 0&&(q.color=W),N!==void 0&&(q.verbose=N),g(d,q,(L,D)=>{if(L)return J(new Error(L),null);J(null,D.result)})},"analyzeMetafile2");return{readFromStdout:z,afterClose:T,service:{buildOrServe:I,transform:n,formatMessages:f,analyzeMetafile:U}}}l(pt,"createChannel");function tt(){let e=new Map,t=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;let u=t++;return e.set(u,r),u}}}l(tt,"createObjectStash");function Fe(e,t,r){let u,w=!1;return()=>{if(w)return u;w=!0;try{let y=(e.stack+"").split(`
`);y.splice(1,1);let i=nt(t,y,r);if(i)return u={text:e.message,location:i},u}catch{}}}l(Fe,"extractCallerV8");function Ue(e,t,r,u,w){let y="Internal error",i=null;try{y=(e&&e.message||e)+""}catch{}try{i=nt(t,(e.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:w,text:y,location:i,notes:u?[u]:[],detail:r?r.store(e):-1}}l(Ue,"extractErrorMessageV8");function nt(e,t,r){let u="    at ";if(e.readFileSync&&!t[0].startsWith(u)&&t[1].startsWith(u))for(let w=1;w<t.length;w++){let y=t[w];if(!!y.startsWith(u))for(y=y.slice(u.length);;){let i=/^(?:new |async )?\S+ \((.*)\)$/.exec(y);if(i){y=i[1];continue}if(i=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y),i){y=i[1];continue}if(i=/^(\S+):(\d+):(\d+)$/.exec(y),i){let b;try{b=e.readFileSync(i[1],"utf8")}catch{break}let a=b.split(/\r\n|\r|\n|\u2028|\u2029/)[+i[2]-1]||"",P=+i[3]-1,z=a.slice(P,P+r.length)===r?r.length:0;return{file:i[1],namespace:"file",line:+i[2],column:Ee(a.slice(0,P)).length,length:Ee(a.slice(P,P+z)).length,lineText:a+`
`+t.slice(1).join(`
`),suggestion:""}}break}}return null}l(nt,"parseStackLinesV8");function De(e,t,r){let u=5,w=t.length<1?"":` with ${t.length} error${t.length<2?"":"s"}:`+t.slice(0,u+1).map((i,b)=>{if(b===u)return`
...`;if(!i.location)return`
error: ${i.text}`;let{file:a,line:P,column:z}=i.location,T=i.pluginName?`[plugin: ${i.pluginName}] `:"";return`
${a}:${P}:${z}: ERROR: ${T}${i.text}`}).join(""),y=new Error(`${e}${w}`);return y.errors=t,y.warnings=r,y}l(De,"failureErrorWithLog");function je(e,t){for(let r of e)r.detail=t.load(r.detail);return e}l(je,"replaceDetailsInMessages");function rt(e,t){if(e==null)return null;let r={},u=s(e,r,"file",x),w=s(e,r,"namespace",x),y=s(e,r,"line",Ie),i=s(e,r,"column",Ie),b=s(e,r,"length",Ie),a=s(e,r,"lineText",x),P=s(e,r,"suggestion",x);return oe(e,r,t),{file:u||"",namespace:w||"",line:y||0,column:i||0,length:b||0,lineText:a||"",suggestion:P||""}}l(rt,"sanitizeLocation");function Pe(e,t,r,u){let w=[],y=0;for(let i of e){let b={},a=s(i,b,"id",x),P=s(i,b,"pluginName",x),z=s(i,b,"text",x),T=s(i,b,"location",ct),g=s(i,b,"notes",ae),G=s(i,b,"detail",ze),X=`in element ${y} of "${t}"`;oe(i,b,X);let A=[];if(g)for(let p of g){let m={},_=s(p,m,"text",x),R=s(p,m,"location",ct);oe(p,m,X),A.push({text:_||"",location:rt(R,X)})}w.push({id:a||"",pluginName:P||u,text:z||"",location:rt(T,X),notes:A,detail:r?r.store(G):-1}),y++}return w}l(Pe,"sanitizeMessages");function Be(e,t){let r=[];for(let u of e){if(typeof u!="string")throw new Error(`${JSON.stringify(t)} must be an array of strings`);r.push(u)}return r}l(Be,"sanitizeStringArray");function wt({path:e,contents:t}){let r=null;return{path:e,contents:t,get text(){let u=this.contents;return(r===null||u!==t)&&(t=u,r=Ae(u)),r}}}l(wt,"convertOutputFiles");var Rt="0.15.7",Ut=l(e=>Ge().build(e),"build"),Dt=l(()=>{throw new Error('The "serve" API only works in node')},"serve"),Ct=l((e,t)=>Ge().transform(e,t),"transform"),At=l((e,t)=>Ge().formatMessages(e,t),"formatMessages"),It=l((e,t)=>Ge().analyzeMetafile(e,t),"analyzeMetafile"),Mt=l(()=>{throw new Error('The "buildSync" API only works in node')},"buildSync"),Nt=l(()=>{throw new Error('The "transformSync" API only works in node')},"transformSync"),Ft=l(()=>{throw new Error('The "formatMessagesSync" API only works in node')},"formatMessagesSync"),Bt=l(()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},"analyzeMetafileSync"),Me,st,Ge=l(()=>{if(st)return st;throw Me?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},"ensureServiceIsRunning"),Vt=l(e=>{e=ht(e||{});let t=e.wasmURL,r=e.wasmModule,u=e.worker!==!1;if(!t&&!r)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(Me)throw new Error('Cannot call "initialize" more than once');return Me=Wt(t||"",r,u),Me.catch(()=>{Me=void 0}),Me},"initialize"),Wt=l((e,t,r)=>Ce(void 0,null,function*(){let u;if(t)u=t;else{let b=yield fetch(e);if(!b.ok)throw new Error(`Failed to download ${JSON.stringify(e)}`);u=yield b.arrayBuffer()}let w;if(r){let b=new Blob([`onmessage=((postMessage) => {
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
    })(postMessage)`],{type:"text/javascript"});w=new Worker(URL.createObjectURL(b))}else{let b=(a=>{var P=l((g,G,X)=>new Promise((A,p)=>{var m=l(C=>{try{R(X.next(C))}catch(I){p(I)}},"fulfilled"),_=l(C=>{try{R(X.throw(C))}catch(I){p(I)}},"rejected"),R=l(C=>C.done?A(C.value):Promise.resolve(C.value).then(m,_),"step");R((X=X.apply(g,G)).next())}),"__async");let z,T={};for(let g=self;g;g=Object.getPrototypeOf(g))for(let G of Object.getOwnPropertyNames(g))G in T||Object.defineProperty(T,G,{get:()=>self[G]});return(()=>{let g=l(()=>{let A=new Error("not implemented");return A.code="ENOSYS",A},"enosys");if(!T.fs){let A="";T.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(p,m){A+=X.decode(m);let _=A.lastIndexOf(`
`);return _!=-1&&(console.log(A.substr(0,_)),A=A.substr(_+1)),m.length},write(p,m,_,R,C,I){if(_!==0||R!==m.length||C!==null){I(g());return}let ne=this.writeSync(p,m);I(null,ne)},chmod(p,m,_){_(g())},chown(p,m,_,R){R(g())},close(p,m){m(g())},fchmod(p,m,_){_(g())},fchown(p,m,_,R){R(g())},fstat(p,m){m(g())},fsync(p,m){m(null)},ftruncate(p,m,_){_(g())},lchown(p,m,_,R){R(g())},link(p,m,_){_(g())},lstat(p,m){m(g())},mkdir(p,m,_){_(g())},open(p,m,_,R){R(g())},read(p,m,_,R,C,I){I(g())},readdir(p,m){m(g())},readlink(p,m){m(g())},rename(p,m,_){_(g())},rmdir(p,m){m(g())},stat(p,m){m(g())},symlink(p,m,_){_(g())},truncate(p,m,_){_(g())},unlink(p,m){m(g())},utimes(p,m,_,R){R(g())}}}if(T.process||(T.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw g()},pid:-1,ppid:-1,umask(){throw g()},cwd(){throw g()},chdir(){throw g()}}),!T.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!T.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!T.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!T.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");let G=new TextEncoder("utf-8"),X=new TextDecoder("utf-8");T.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=n=>{n!==0&&console.warn("exit code:",n)},this._exitPromise=new Promise(n=>{this._resolveExitPromise=n}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;let A=l((n,f)=>{this.mem.setUint32(n+0,f,!0),this.mem.setUint32(n+4,Math.floor(f/4294967296),!0)},"setInt64"),p=l(n=>{let f=this.mem.getUint32(n+0,!0),U=this.mem.getInt32(n+4,!0);return f+U*4294967296},"getInt64"),m=l(n=>{let f=this.mem.getFloat64(n,!0);if(f===0)return;if(!isNaN(f))return f;let U=this.mem.getUint32(n,!0);return this._values[U]},"loadValue"),_=l((n,f)=>{if(typeof f=="number"&&f!==0){if(isNaN(f)){this.mem.setUint32(n+4,2146959360,!0),this.mem.setUint32(n,0,!0);return}this.mem.setFloat64(n,f,!0);return}if(f===void 0){this.mem.setFloat64(n,0,!0);return}let c=this._ids.get(f);c===void 0&&(c=this._idPool.pop(),c===void 0&&(c=this._values.length),this._values[c]=f,this._goRefCounts[c]=0,this._ids.set(f,c)),this._goRefCounts[c]++;let d=0;switch(typeof f){case"object":f!==null&&(d=1);break;case"string":d=2;break;case"symbol":d=3;break;case"function":d=4;break}this.mem.setUint32(n+4,2146959360|d,!0),this.mem.setUint32(n,c,!0)},"storeValue"),R=l(n=>{let f=p(n+0),U=p(n+8);return new Uint8Array(this._inst.exports.mem.buffer,f,U)},"loadSlice"),C=l(n=>{let f=p(n+0),U=p(n+8),c=new Array(U);for(let d=0;d<U;d++)c[d]=m(f+d*8);return c},"loadSliceOfValues"),I=l(n=>{let f=p(n+0),U=p(n+8);return X.decode(new DataView(this._inst.exports.mem.buffer,f,U))},"loadString"),ne=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":n=>{n>>>=0;let f=this.mem.getInt32(n+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(f)},"runtime.wasmWrite":n=>{n>>>=0;let f=p(n+8),U=p(n+16),c=this.mem.getInt32(n+24,!0);T.fs.writeSync(f,new Uint8Array(this._inst.exports.mem.buffer,U,c))},"runtime.resetMemoryDataView":n=>{n>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":n=>{n>>>=0,A(n+8,(ne+performance.now())*1e6)},"runtime.walltime":n=>{n>>>=0;let f=new Date().getTime();A(n+8,f/1e3),this.mem.setInt32(n+16,f%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":n=>{n>>>=0;let f=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(f,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(f);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},p(n+8)+1)),this.mem.setInt32(n+16,f,!0)},"runtime.clearTimeoutEvent":n=>{n>>>=0;let f=this.mem.getInt32(n+8,!0);clearTimeout(this._scheduledTimeouts.get(f)),this._scheduledTimeouts.delete(f)},"runtime.getRandomData":n=>{n>>>=0,crypto.getRandomValues(R(n+8))},"syscall/js.finalizeRef":n=>{n>>>=0;let f=this.mem.getUint32(n+8,!0);if(this._goRefCounts[f]--,this._goRefCounts[f]===0){let U=this._values[f];this._values[f]=null,this._ids.delete(U),this._idPool.push(f)}},"syscall/js.stringVal":n=>{n>>>=0,_(n+24,I(n+8))},"syscall/js.valueGet":n=>{n>>>=0;let f=Reflect.get(m(n+8),I(n+16));n=this._inst.exports.getsp()>>>0,_(n+32,f)},"syscall/js.valueSet":n=>{n>>>=0,Reflect.set(m(n+8),I(n+16),m(n+32))},"syscall/js.valueDelete":n=>{n>>>=0,Reflect.deleteProperty(m(n+8),I(n+16))},"syscall/js.valueIndex":n=>{n>>>=0,_(n+24,Reflect.get(m(n+8),p(n+16)))},"syscall/js.valueSetIndex":n=>{n>>>=0,Reflect.set(m(n+8),p(n+16),m(n+24))},"syscall/js.valueCall":n=>{n>>>=0;try{let f=m(n+8),U=Reflect.get(f,I(n+16)),c=C(n+32),d=Reflect.apply(U,f,c);n=this._inst.exports.getsp()>>>0,_(n+56,d),this.mem.setUint8(n+64,1)}catch(f){n=this._inst.exports.getsp()>>>0,_(n+56,f),this.mem.setUint8(n+64,0)}},"syscall/js.valueInvoke":n=>{n>>>=0;try{let f=m(n+8),U=C(n+16),c=Reflect.apply(f,void 0,U);n=this._inst.exports.getsp()>>>0,_(n+40,c),this.mem.setUint8(n+48,1)}catch(f){n=this._inst.exports.getsp()>>>0,_(n+40,f),this.mem.setUint8(n+48,0)}},"syscall/js.valueNew":n=>{n>>>=0;try{let f=m(n+8),U=C(n+16),c=Reflect.construct(f,U);n=this._inst.exports.getsp()>>>0,_(n+40,c),this.mem.setUint8(n+48,1)}catch(f){n=this._inst.exports.getsp()>>>0,_(n+40,f),this.mem.setUint8(n+48,0)}},"syscall/js.valueLength":n=>{n>>>=0,A(n+16,parseInt(m(n+8).length))},"syscall/js.valuePrepareString":n=>{n>>>=0;let f=G.encode(String(m(n+8)));_(n+16,f),A(n+24,f.length)},"syscall/js.valueLoadString":n=>{n>>>=0;let f=m(n+8);R(n+16).set(f)},"syscall/js.valueInstanceOf":n=>{n>>>=0,this.mem.setUint8(n+24,m(n+8)instanceof m(n+16)?1:0)},"syscall/js.copyBytesToGo":n=>{n>>>=0;let f=R(n+8),U=m(n+32);if(!(U instanceof Uint8Array||U instanceof Uint8ClampedArray)){this.mem.setUint8(n+48,0);return}let c=U.subarray(0,f.length);f.set(c),A(n+40,c.length),this.mem.setUint8(n+48,1)},"syscall/js.copyBytesToJS":n=>{n>>>=0;let f=m(n+8),U=R(n+16);if(!(f instanceof Uint8Array||f instanceof Uint8ClampedArray)){this.mem.setUint8(n+48,0);return}let c=U.subarray(0,f.length);f.set(c),A(n+40,c.length),this.mem.setUint8(n+48,1)},debug:n=>{console.log(n)}}}}run(A){return P(this,null,function*(){if(!(A instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=A,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,T,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[T,5],[this,6]]),this._idPool=[],this.exited=!1;let p=4096,m=l(n=>{let f=p,U=G.encode(n+"\0");return new Uint8Array(this.mem.buffer,p,U.length).set(U),p+=U.length,p%8!==0&&(p+=8-p%8),f},"strPtr"),_=this.argv.length,R=[];this.argv.forEach(n=>{R.push(m(n))}),R.push(0),Object.keys(this.env).sort().forEach(n=>{R.push(m(`${n}=${this.env[n]}`))}),R.push(0);let I=p;R.forEach(n=>{this.mem.setUint32(p,n,!0),this.mem.setUint32(p+4,0,!0),p+=8});let ne=4096+8192;if(p>=ne)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(_,I),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(A){let p=this;return function(){let m={id:A,this:this,args:arguments};return p._pendingEvent=m,p._resume(),m.result}}}})(),z=l(({data:g})=>{let G=new TextDecoder,X=T.fs,A="";X.writeSync=(C,I)=>{if(C===1)a(I);else if(C===2){A+=G.decode(I);let ne=A.split(`
`);ne.length>1&&console.log(ne.slice(0,-1).join(`
`)),A=ne[ne.length-1]}else throw new Error("Bad write");return I.length};let p=[],m,_=0;z=l(({data:C})=>{C.length>0&&(p.push(C),m&&m())},"onmessage"),X.read=(C,I,ne,n,f,U)=>{if(C!==0||ne!==0||n!==I.length||f!==null)throw new Error("Bad read");if(p.length===0){m=l(()=>X.read(C,I,ne,n,f,U),"resumeStdin");return}let c=p[0],d=Math.max(0,Math.min(n,c.length-_));I.set(c.subarray(_,_+d),ne),_+=d,_===c.length&&(p.shift(),_=0),U(null,d)};let R=new T.Go;R.argv=["","--service=0.15.7"],g instanceof WebAssembly.Module?WebAssembly.instantiate(g,R.importObject).then(C=>R.run(C)):WebAssembly.instantiate(g,R.importObject).then(({instance:C})=>R.run(C))},"onmessage"),g=>z(g)})(a=>w.onmessage({data:a}));w={onmessage:null,postMessage:a=>setTimeout(()=>b({data:a})),terminate(){}}}w.postMessage(u),w.onmessage=({data:b})=>y(b);let{readFromStdout:y,service:i}=pt({writeToStdin(b){w.postMessage(b)},isSync:!1,isWriteUnavailable:!0,esbuild:We});st={build:b=>new Promise((a,P)=>i.buildOrServe({callName:"build",refs:null,serveOptions:null,options:b,isTTY:!1,defaultWD:"/",callback:(z,T)=>z?P(z):a(T)})),transform:(b,a)=>new Promise((P,z)=>i.transform({callName:"transform",refs:null,input:b,options:a||{},isTTY:!1,fs:{readFile(T,g){g(new Error("Internal error"),null)},writeFile(T,g){g(null)}},callback:(T,g)=>T?z(T):P(g)})),formatMessages:(b,a)=>new Promise((P,z)=>i.formatMessages({callName:"formatMessages",refs:null,messages:b,options:a,callback:(T,g)=>T?z(T):P(g)})),analyzeMetafile:(b,a)=>new Promise((P,z)=>i.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof b=="string"?b:JSON.stringify(b),options:a,callback:(T,g)=>T?z(T):P(g)}))}}),"startRunningService"),Lt=We})(typeof V=="object"?V:{set exports(K){(typeof self<"u"?self:this).esbuild=K}})}});qe();qe();var Zt=new Error("timeout while waiting for mutex to become available"),en=new Error("mutex already locked"),qt=new Error("request for lock canceled"),Qt=function(S,V,K,ce){function Oe(be){return be instanceof K?be:new K(function(_e){_e(be)})}return l(Oe,"adopt"),new(K||(K=Promise))(function(be,_e){function Re(de){try{ve(ce.next(de))}catch(ke){_e(ke)}}l(Re,"fulfilled");function $e(de){try{ve(ce.throw(de))}catch(ke){_e(ke)}}l($e,"rejected");function ve(de){de.done?be(de.value):Oe(de.value).then(Re,$e)}l(ve,"step"),ve((ce=ce.apply(S,V||[])).next())})},_t=class{constructor(S,V=qt){this._value=S,this._cancelError=V,this._weightedQueues=[],this._weightedWaiters=[]}acquire(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);return new Promise((V,K)=>{this._weightedQueues[S-1]||(this._weightedQueues[S-1]=[]),this._weightedQueues[S-1].push({resolve:V,reject:K}),this._dispatch()})}runExclusive(S,V=1){return Qt(this,void 0,void 0,function*(){let[K,ce]=yield this.acquire(V);try{return yield S(K)}finally{ce()}})}waitForUnlock(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);return new Promise(V=>{this._weightedWaiters[S-1]||(this._weightedWaiters[S-1]=[]),this._weightedWaiters[S-1].push(V),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(S){this._value=S,this._dispatch()}release(S=1){if(S<=0)throw new Error(`invalid weight ${S}: must be positive`);this._value+=S,this._dispatch()}cancel(){this._weightedQueues.forEach(S=>S.forEach(V=>V.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var S;for(let V=this._value;V>0;V--){let K=(S=this._weightedQueues[V-1])===null||S===void 0?void 0:S.shift();if(!K)continue;let ce=this._value,Oe=V;this._value-=V,V=this._value+1,K.resolve([ce,this._newReleaser(Oe)])}this._drainUnlockWaiters()}_newReleaser(S){let V=!1;return()=>{V||(V=!0,this.release(S))}}_drainUnlockWaiters(){for(let S=this._value;S>0;S--)!this._weightedWaiters[S-1]||(this._weightedWaiters[S-1].forEach(V=>V()),this._weightedWaiters[S-1]=[])}};l(_t,"Semaphore");var Yt=function(S,V,K,ce){function Oe(be){return be instanceof K?be:new K(function(_e){_e(be)})}return l(Oe,"adopt"),new(K||(K=Promise))(function(be,_e){function Re(de){try{ve(ce.next(de))}catch(ke){_e(ke)}}l(Re,"fulfilled");function $e(de){try{ve(ce.throw(de))}catch(ke){_e(ke)}}l($e,"rejected");function ve(de){de.done?be(de.value):Oe(de.value).then(Re,$e)}l(ve,"step"),ve((ce=ce.apply(S,V||[])).next())})},xt=class{constructor(S){this._semaphore=new _t(1,S)}acquire(){return Yt(this,void 0,void 0,function*(){let[,S]=yield this._semaphore.acquire();return S})}runExclusive(S){return this._semaphore.runExclusive(()=>S())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}};l(xt,"Mutex");var vt=bt(Gt(),1),Ht="./chunk-esbuild-ZTDJQG3V.wasm",Kt=new xt,Qe={initialize:vt.initialize,transform:async(S,V)=>await Kt.runExclusive(async()=>{try{console.info("esbuild start");let K=await(0,vt.transform)(S,V);return console.info("esbuild transpile done"),K}catch(K){throw console.error("Ebuild transform error: ",{code:S,err:K}),K}})},Ve=!1,tn=l(async()=>{try{if(Ve===!0||(Ve=Ve||new Promise(S=>{Qe.initialize({wasmURL:new URL(Ht,import.meta.url).toString()}).then(()=>S(!0))}),await Ve===!0))return Qe;throw new Error("esbuild couldn't initialize")}catch{throw new Error("esbuild couldn't initialize")}finally{if(await Ve===!0)return Qe;throw new Error("esbuild couldn't initialize")}},"init");export{tn as init};
