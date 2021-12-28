var Ce=Object.defineProperty,tt=Object.defineProperties,rt=Object.getOwnPropertyDescriptors,Ie=Object.getOwnPropertySymbols,nt=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,Ne=(e,t,r)=>t in e?Ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Fe=(e,t)=>{for(var r in t||(t={}))nt.call(t,r)&&Ne(e,r,t[r]);if(Ie)for(var r of Ie(t))lt.call(t,r)&&Ne(e,r,t[r]);return e},Ue=(e,t)=>tt(e,rt(t)),st=(e,t)=>{for(var r in t)Ce(e,r,{get:t[r],enumerable:!0})},Me={};st(Me,{analyzeMetafile:()=>kt,analyzeMetafileSync:()=>$t,build:()=>bt,buildSync:()=>xt,formatMessages:()=>vt,formatMessagesSync:()=>St,initialize:()=>Ae,serve:()=>yt,transform:()=>Re,transformSync:()=>Et,version:()=>wt});function Be(e){let t=a=>{if(a===null)r.write8(0);else if(typeof a=="boolean")r.write8(1),r.write8(+a);else if(typeof a=="number")r.write8(2),r.write32(a|0);else if(typeof a=="string")r.write8(3),r.write(fe(a));else if(a instanceof Uint8Array)r.write8(4),r.write(a);else if(a instanceof Array){r.write8(5),r.write32(a.length);for(let d of a)t(d)}else{let d=Object.keys(a);r.write8(6),r.write32(d.length);for(let c of d)r.write(fe(c)),t(a[c])}},r=new Ve;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),t(e.value),je(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function it(e){let t=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return ge(r.read());case 4:return r.read();case 5:{let s=r.read32(),b=[];for(let i=0;i<s;i++)b.push(t());return b}case 6:{let s=r.read32(),b={};for(let i=0;i<s;i++)b[ge(r.read())]=t();return b}default:throw new Error("Invalid packet")}},r=new Ve(e),a=r.read32(),d=(a&1)===0;a>>>=1;let c=t();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:a,isRequest:d,value:c}}var Ve=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let t=new Uint8Array((this.len+e)*2);t.set(this.buf),this.buf=t}return this.len+=e,this.len-e}write8(e){let t=this._write(1);this.buf[t]=e}write32(e){let t=this._write(4);je(this.buf,e,t)}write(e){let t=this._write(4+e.length);je(this.buf,e.length,t),this.buf.set(e,t+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return Le(this.buf,this._read(4))}read(){let e=this.read32(),t=new Uint8Array(e),r=this._read(t.length);return t.set(this.buf.subarray(r,r+e)),t}},fe,ge;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let e=new TextEncoder,t=new TextDecoder;fe=r=>e.encode(r),ge=r=>t.decode(r)}else if(typeof Buffer!="undefined")fe=e=>{let t=Buffer.from(e);return t instanceof Uint8Array||(t=new Uint8Array(t)),t},ge=e=>{let{buffer:t,byteOffset:r,byteLength:a}=e;return Buffer.from(t,r,a).toString()};else throw new Error("No UTF-8 codec found");function Le(e,t){return e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24}function je(e,t,r){e[r++]=t,e[r++]=t>>8,e[r++]=t>>16,e[r++]=t>>24}function We(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var ve=()=>null,B=e=>typeof e=="boolean"?null:"a boolean",at=e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object",p=e=>typeof e=="string"?null:"a string",ze=e=>e instanceof RegExp?null:"a RegExp object",pe=e=>typeof e=="number"&&e===(e|0)?null:"an integer",Pe=e=>typeof e=="function"?null:"a function",G=e=>Array.isArray(e)?null:"an array",me=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",ot=e=>typeof e=="object"&&e!==null?null:"an array or an object",Je=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",Ge=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",ct=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",ut=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",ft=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array";function n(e,t,r,a){let d=e[r];if(t[r+""]=!0,d===void 0)return;let c=a(d);if(c!==null)throw new Error(`"${r}" must be ${c}`);return d}function q(e,t,r){for(let a in e)if(!(a in t))throw new Error(`Invalid option ${r}: "${a}"`)}function dt(e){let t=Object.create(null),r=n(e,t,"wasmURL",p),a=n(e,t,"worker",B);return q(e,t,"in startService() call"),{wasmURL:r,worker:a}}function ke(e,t,r,a,d){let c=n(t,r,"color",B),s=n(t,r,"logLevel",p),b=n(t,r,"logLimit",pe);c!==void 0?e.push(`--color=${c}`):a&&e.push("--color=true"),e.push(`--log-level=${s||d}`),e.push(`--log-limit=${b||0}`)}function qe(e,t,r){let a=n(t,r,"legalComments",p),d=n(t,r,"sourceRoot",p),c=n(t,r,"sourcesContent",B),s=n(t,r,"target",ut),b=n(t,r,"format",p),i=n(t,r,"globalName",p),x=n(t,r,"minify",B),P=n(t,r,"minifySyntax",B),U=n(t,r,"minifyWhitespace",B),E=n(t,r,"minifyIdentifiers",B),$=n(t,r,"charset",p),Z=n(t,r,"treeShaking",B),le=n(t,r,"ignoreAnnotations",B),se=n(t,r,"jsx",p),oe=n(t,r,"jsxFactory",p),ie=n(t,r,"jsxFragment",p),ae=n(t,r,"define",me),ce=n(t,r,"pure",G),he=n(t,r,"keepNames",B);if(a&&e.push(`--legal-comments=${a}`),d!==void 0&&e.push(`--source-root=${d}`),c!==void 0&&e.push(`--sources-content=${c}`),s&&(Array.isArray(s)?e.push(`--target=${Array.from(s).map(We).join(",")}`):e.push(`--target=${We(s)}`)),b&&e.push(`--format=${b}`),i&&e.push(`--global-name=${i}`),x&&e.push("--minify"),P&&e.push("--minify-syntax"),U&&e.push("--minify-whitespace"),E&&e.push("--minify-identifiers"),$&&e.push(`--charset=${$}`),Z!==void 0&&e.push(`--tree-shaking=${Z}`),le&&e.push("--ignore-annotations"),se&&e.push(`--jsx=${se}`),oe&&e.push(`--jsx-factory=${oe}`),ie&&e.push(`--jsx-fragment=${ie}`),ae)for(let ee in ae){if(ee.indexOf("=")>=0)throw new Error(`Invalid define: ${ee}`);e.push(`--define:${ee}=${ae[ee]}`)}if(ce)for(let ee of ce)e.push(`--pure:${ee}`);he&&e.push("--keep-names")}function ht(e,t,r,a,d){var c;let s=[],b=[],i=Object.create(null),x=null,P=null,U=null;ke(s,t,i,r,a),qe(s,t,i);let E=n(t,i,"sourcemap",Ge),$=n(t,i,"bundle",B),Z=n(t,i,"watch",at),le=n(t,i,"splitting",B),se=n(t,i,"preserveSymlinks",B),oe=n(t,i,"metafile",B),ie=n(t,i,"outfile",p),ae=n(t,i,"outdir",p),ce=n(t,i,"outbase",p),he=n(t,i,"platform",p),ee=n(t,i,"tsconfig",p),$e=n(t,i,"resolveExtensions",G),Oe=n(t,i,"nodePaths",G),_e=n(t,i,"mainFields",G),h=n(t,i,"conditions",G),u=n(t,i,"external",G),o=n(t,i,"loader",me),f=n(t,i,"outExtension",me),N=n(t,i,"publicPath",p),R=n(t,i,"entryNames",p),_=n(t,i,"chunkNames",p),O=n(t,i,"assetNames",p),D=n(t,i,"inject",G),T=n(t,i,"banner",me),y=n(t,i,"footer",me),F=n(t,i,"entryPoints",ot),A=n(t,i,"absWorkingDir",p),k=n(t,i,"stdin",me),te=(c=n(t,i,"write",B))!=null?c:d,Q=n(t,i,"allowOverwrite",B),S=n(t,i,"incremental",B)===!0;if(i.plugins=!0,q(t,i,`in ${e}() call`),E&&s.push(`--sourcemap${E===!0?"":`=${E}`}`),$&&s.push("--bundle"),Q&&s.push("--allow-overwrite"),Z)if(s.push("--watch"),typeof Z=="boolean")U={};else{let l=Object.create(null),v=n(Z,l,"onRebuild",Pe);q(Z,l,`on "watch" in ${e}() call`),U={onRebuild:v}}if(le&&s.push("--splitting"),se&&s.push("--preserve-symlinks"),oe&&s.push("--metafile"),ie&&s.push(`--outfile=${ie}`),ae&&s.push(`--outdir=${ae}`),ce&&s.push(`--outbase=${ce}`),he&&s.push(`--platform=${he}`),ee&&s.push(`--tsconfig=${ee}`),$e){let l=[];for(let v of $e){if(v+="",v.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${v}`);l.push(v)}s.push(`--resolve-extensions=${l.join(",")}`)}if(N&&s.push(`--public-path=${N}`),R&&s.push(`--entry-names=${R}`),_&&s.push(`--chunk-names=${_}`),O&&s.push(`--asset-names=${O}`),_e){let l=[];for(let v of _e){if(v+="",v.indexOf(",")>=0)throw new Error(`Invalid main field: ${v}`);l.push(v)}s.push(`--main-fields=${l.join(",")}`)}if(h){let l=[];for(let v of h){if(v+="",v.indexOf(",")>=0)throw new Error(`Invalid condition: ${v}`);l.push(v)}s.push(`--conditions=${l.join(",")}`)}if(u)for(let l of u)s.push(`--external:${l}`);if(T)for(let l in T){if(l.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${l}`);s.push(`--banner:${l}=${T[l]}`)}if(y)for(let l in y){if(l.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${l}`);s.push(`--footer:${l}=${y[l]}`)}if(D)for(let l of D)s.push(`--inject:${l}`);if(o)for(let l in o){if(l.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${l}`);s.push(`--loader:${l}=${o[l]}`)}if(f)for(let l in f){if(l.indexOf("=")>=0)throw new Error(`Invalid out extension: ${l}`);s.push(`--out-extension:${l}=${f[l]}`)}if(F)if(Array.isArray(F))for(let l of F)b.push(["",l+""]);else for(let[l,v]of Object.entries(F))b.push([l+"",v+""]);if(k){let l=Object.create(null),v=n(k,l,"contents",p),V=n(k,l,"resolveDir",p),M=n(k,l,"sourcefile",p),w=n(k,l,"loader",p);q(k,l,'in "stdin" object'),M&&s.push(`--sourcefile=${M}`),w&&s.push(`--loader=${w}`),V&&(P=V+""),x=v?v+"":""}let m=[];if(Oe)for(let l of Oe)l+="",m.push(l);return{entries:b,flags:s,write:te,stdinContents:x,stdinResolveDir:P,absWorkingDir:A,incremental:S,nodePaths:m,watch:U}}function gt(e,t,r,a){let d=[],c=Object.create(null);ke(d,t,c,r,a),qe(d,t,c);let s=n(t,c,"sourcemap",Ge),b=n(t,c,"tsconfigRaw",ct),i=n(t,c,"sourcefile",p),x=n(t,c,"loader",p),P=n(t,c,"banner",p),U=n(t,c,"footer",p);return q(t,c,`in ${e}() call`),s&&d.push(`--sourcemap=${s===!0?"external":s}`),b&&d.push(`--tsconfig-raw=${typeof b=="string"?b:JSON.stringify(b)}`),i&&d.push(`--sourcefile=${i}`),x&&d.push(`--loader=${x}`),P&&d.push(`--banner=${P}`),U&&d.push(`--footer=${U}`),d}function pt(e){let t=new Map,r=new Map,a=new Map,d=new Map,c=!1,s=0,b=0,i=new Uint8Array(16*1024),x=0,P=h=>{let u=x+h.length;if(u>i.length){let f=new Uint8Array(u*2);f.set(i),i=f}i.set(h,x),x+=h.length;let o=0;for(;o+4<=x;){let f=Le(i,o);if(o+4+f>x)break;o+=4,se(i.subarray(o,o+f)),o+=f}o>0&&(i.copyWithin(0,o,x),x-=o)},U=()=>{c=!0;for(let h of t.values())h("The service was stopped",null);t.clear();for(let h of d.values())h.onWait("The service was stopped");d.clear();for(let h of a.values())try{h(new Error("The service was stopped"),null)}catch(u){console.error(u)}a.clear()},E=(h,u,o)=>{if(c)return o("The service is no longer running",null);let f=s++;t.set(f,(N,R)=>{try{o(N,R)}finally{h&&h.unref()}}),h&&h.ref(),e.writeToStdin(Be({id:f,isRequest:!0,value:u}))},$=(h,u)=>{if(c)throw new Error("The service is no longer running");e.writeToStdin(Be({id:h,isRequest:!1,value:u}))},Z=async(h,u)=>{try{switch(u.command){case"ping":{$(h,{});break}case"on-start":{let o=r.get(u.key);o?$(h,await o(u)):$(h,{});break}case"on-resolve":{let o=r.get(u.key);o?$(h,await o(u)):$(h,{});break}case"on-load":{let o=r.get(u.key);o?$(h,await o(u)):$(h,{});break}case"serve-request":{let o=d.get(u.key);o&&o.onRequest&&o.onRequest(u.args),$(h,{});break}case"serve-wait":{let o=d.get(u.key);o&&o.onWait(u.error),$(h,{});break}case"watch-rebuild":{let o=a.get(u.key);try{o&&o(null,u.args)}catch(f){console.error(f)}$(h,{});break}default:throw new Error("Invalid command: "+u.command)}}catch(o){$(h,{errors:[we(o,e,null,void 0,"")]})}},le=!0,se=h=>{if(le){le=!1;let o=String.fromCharCode(...h);if(o!=="0.14.8")throw new Error(`Cannot start service: Host version "0.14.8" does not match binary version ${JSON.stringify(o)}`);return}let u=it(h);if(u.isRequest)Z(u.id,u.value);else{let o=t.get(u.id);t.delete(u.id),u.value.error?o(u.value.error,{}):o(null,u.value)}},oe=async(h,u,o,f,N)=>{let R=[],_=[],O={},D={},T=0,y=0,F=[],A=!1;u=[...u];for(let S of u){let m={};if(typeof S!="object")throw new Error(`Plugin at index ${y} must be an object`);let l=n(S,m,"name",p);if(typeof l!="string"||l==="")throw new Error(`Plugin at index ${y} is missing a name`);try{let v=n(S,m,"setup",Pe);if(typeof v!="function")throw new Error("Plugin is missing a setup function");q(S,m,`on plugin ${JSON.stringify(l)}`);let V={name:l,onResolve:[],onLoad:[]};y++;let w=v({initialOptions:h,resolve:(g,C={})=>{if(!A)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof g!="string")throw new Error("The path to resolve must be a string");let I=Object.create(null),J=n(C,I,"importer",p),L=n(C,I,"namespace",p),Y=n(C,I,"resolveDir",p),K=n(C,I,"kind",p),j=n(C,I,"pluginData",ve);return q(C,I,"in resolve() call"),new Promise((H,W)=>{let z={command:"resolve",path:g,key:o,pluginName:l};J!=null&&(z.importer=J),L!=null&&(z.namespace=L),Y!=null&&(z.resolveDir=Y),K!=null&&(z.kind=K),j!=null&&(z.pluginData=f.store(j)),E(N,z,(re,X)=>{re!==null?W(new Error(re)):H({errors:ue(X.errors,f),warnings:ue(X.warnings,f),path:X.path,external:X.external,sideEffects:X.sideEffects,namespace:X.namespace,suffix:X.suffix,pluginData:f.load(X.pluginData)})})})},onStart(g){let C='This error came from the "onStart" callback registered here:',I=xe(new Error(C),e,"onStart");R.push({name:l,callback:g,note:I})},onEnd(g){let C='This error came from the "onEnd" callback registered here:',I=xe(new Error(C),e,"onEnd");_.push({name:l,callback:g,note:I})},onResolve(g,C){let I='This error came from the "onResolve" callback registered here:',J=xe(new Error(I),e,"onResolve"),L={},Y=n(g,L,"filter",ze),K=n(g,L,"namespace",p);if(q(g,L,`in onResolve() call for plugin ${JSON.stringify(l)}`),Y==null)throw new Error("onResolve() call is missing a filter");let j=T++;O[j]={name:l,callback:C,note:J},V.onResolve.push({id:j,filter:Y.source,namespace:K||""})},onLoad(g,C){let I='This error came from the "onLoad" callback registered here:',J=xe(new Error(I),e,"onLoad"),L={},Y=n(g,L,"filter",ze),K=n(g,L,"namespace",p);if(q(g,L,`in onLoad() call for plugin ${JSON.stringify(l)}`),Y==null)throw new Error("onLoad() call is missing a filter");let j=T++;D[j]={name:l,callback:C,note:J},V.onLoad.push({id:j,filter:Y.source,namespace:K||""})},esbuild:e.esbuild});w&&await w,F.push(V)}catch(v){return{ok:!1,error:v,pluginName:l}}}let k=async S=>{switch(S.command){case"on-start":{let m={errors:[],warnings:[]};return await Promise.all(R.map(async({name:l,callback:v,note:V})=>{try{let M=await v();if(M!=null){if(typeof M!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(l)} to return an object`);let w={},g=n(M,w,"errors",G),C=n(M,w,"warnings",G);q(M,w,`from onStart() callback in plugin ${JSON.stringify(l)}`),g!=null&&m.errors.push(...de(g,"errors",f,l)),C!=null&&m.warnings.push(...de(C,"warnings",f,l))}}catch(M){m.errors.push(we(M,e,f,V&&V(),l))}})),m}case"on-resolve":{let m={},l="",v,V;for(let M of S.ids)try{({name:l,callback:v,note:V}=O[M]);let w=await v({path:S.path,importer:S.importer,namespace:S.namespace,resolveDir:S.resolveDir,kind:S.kind,pluginData:f.load(S.pluginData)});if(w!=null){if(typeof w!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(l)} to return an object`);let g={},C=n(w,g,"pluginName",p),I=n(w,g,"path",p),J=n(w,g,"namespace",p),L=n(w,g,"suffix",p),Y=n(w,g,"external",B),K=n(w,g,"sideEffects",B),j=n(w,g,"pluginData",ve),H=n(w,g,"errors",G),W=n(w,g,"warnings",G),z=n(w,g,"watchFiles",G),re=n(w,g,"watchDirs",G);q(w,g,`from onResolve() callback in plugin ${JSON.stringify(l)}`),m.id=M,C!=null&&(m.pluginName=C),I!=null&&(m.path=I),J!=null&&(m.namespace=J),L!=null&&(m.suffix=L),Y!=null&&(m.external=Y),K!=null&&(m.sideEffects=K),j!=null&&(m.pluginData=f.store(j)),H!=null&&(m.errors=de(H,"errors",f,l)),W!=null&&(m.warnings=de(W,"warnings",f,l)),z!=null&&(m.watchFiles=Ee(z,"watchFiles")),re!=null&&(m.watchDirs=Ee(re,"watchDirs"));break}}catch(w){return{id:M,errors:[we(w,e,f,V&&V(),l)]}}return m}case"on-load":{let m={},l="",v,V;for(let M of S.ids)try{({name:l,callback:v,note:V}=D[M]);let w=await v({path:S.path,namespace:S.namespace,suffix:S.suffix,pluginData:f.load(S.pluginData)});if(w!=null){if(typeof w!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(l)} to return an object`);let g={},C=n(w,g,"pluginName",p),I=n(w,g,"contents",ft),J=n(w,g,"resolveDir",p),L=n(w,g,"pluginData",ve),Y=n(w,g,"loader",p),K=n(w,g,"errors",G),j=n(w,g,"warnings",G),H=n(w,g,"watchFiles",G),W=n(w,g,"watchDirs",G);q(w,g,`from onLoad() callback in plugin ${JSON.stringify(l)}`),m.id=M,C!=null&&(m.pluginName=C),I instanceof Uint8Array?m.contents=I:I!=null&&(m.contents=fe(I)),J!=null&&(m.resolveDir=J),L!=null&&(m.pluginData=f.store(L)),Y!=null&&(m.loader=Y),K!=null&&(m.errors=de(K,"errors",f,l)),j!=null&&(m.warnings=de(j,"warnings",f,l)),H!=null&&(m.watchFiles=Ee(H,"watchFiles")),W!=null&&(m.watchDirs=Ee(W,"watchDirs"));break}}catch(w){return{id:M,errors:[we(w,e,f,V&&V(),l)]}}return m}default:throw new Error("Invalid command: "+S.command)}},te=(S,m,l)=>l();_.length>0&&(te=(S,m,l)=>{(async()=>{for(let{name:v,callback:V,note:M}of _)try{await V(S)}catch(w){S.errors.push(await new Promise(g=>m(w,v,M&&M(),g)))}})().then(l)}),A=!0;let Q=0;return{ok:!0,requestPlugins:F,runOnEndCallbacks:te,pluginRefs:{ref(){++Q===1&&r.set(o,k)},unref(){--Q===0&&r.delete(o)}}}},ie=(h,u,o,f)=>{let N={},R=n(u,N,"port",pe),_=n(u,N,"host",p),O=n(u,N,"servedir",p),D=n(u,N,"onRequest",Pe),T,y=new Promise((F,A)=>{T=k=>{d.delete(f),k!==null?A(new Error(k)):F()}});return o.serve={},q(u,N,"in serve() call"),R!==void 0&&(o.serve.port=R),_!==void 0&&(o.serve.host=_),O!==void 0&&(o.serve.servedir=O),d.set(f,{onRequest:D,onWait:T}),{wait:y,stop(){E(h,{command:"serve-stop",key:f},()=>{})}}},ae="warning",ce="silent",he=h=>{let u=b++,o=Ye(),f,{refs:N,options:R,isTTY:_,callback:O}=h;if(typeof R=="object"){let y=R.plugins;if(y!==void 0){if(!Array.isArray(y))throw new Error('"plugins" must be an array');f=y}}let D=(y,F,A,k)=>{let te=[];try{ke(te,R,{},_,ae)}catch{}let Q=we(y,e,o,A,F);E(N,{command:"error",flags:te,error:Q},()=>{Q.detail=o.load(Q.detail),k(Q)})},T=(y,F)=>{D(y,F,void 0,A=>{O(be("Build failed",[A],[]),null)})};if(f&&f.length>0){if(e.isSync)return T(new Error("Cannot use plugins in synchronous API calls"),"");oe(R,f,u,o,N).then(y=>{if(!y.ok)T(y.error,y.pluginName);else try{ee(Ue(Fe({},h),{key:u,details:o,logPluginError:D,requestPlugins:y.requestPlugins,runOnEndCallbacks:y.runOnEndCallbacks,pluginRefs:y.pluginRefs}))}catch(F){T(F,"")}},y=>T(y,""))}else try{ee(Ue(Fe({},h),{key:u,details:o,logPluginError:D,requestPlugins:null,runOnEndCallbacks:(y,F,A)=>A(),pluginRefs:null}))}catch(y){T(y,"")}},ee=({callName:h,refs:u,serveOptions:o,options:f,isTTY:N,defaultWD:R,callback:_,key:O,details:D,logPluginError:T,requestPlugins:y,runOnEndCallbacks:F,pluginRefs:A})=>{let k={ref(){A&&A.ref(),u&&u.ref()},unref(){A&&A.unref(),u&&u.unref()}},te=!e.isBrowser,{entries:Q,flags:S,write:m,stdinContents:l,stdinResolveDir:v,absWorkingDir:V,incremental:M,nodePaths:w,watch:g}=ht(h,f,N,ae,te),C={command:"build",key:O,entries:Q,flags:S,write:m,stdinContents:l,stdinResolveDir:v,absWorkingDir:V||R,incremental:M,nodePaths:w};y&&(C.plugins=y);let I=o&&ie(k,o,C,O),J,L,Y=(j,H)=>{j.outputFiles&&(H.outputFiles=j.outputFiles.map(mt)),j.metafile&&(H.metafile=JSON.parse(j.metafile)),j.writeToStdout!==void 0&&console.log(ge(j.writeToStdout).replace(/\n$/,""))},K=(j,H)=>{let W={errors:ue(j.errors,D),warnings:ue(j.warnings,D)};Y(j,W),F(W,T,()=>{if(W.errors.length>0)return H(be("Build failed",W.errors,W.warnings),null);if(j.rebuild){if(!J){let z=!1;J=()=>new Promise((re,X)=>{if(z||c)throw new Error("Cannot rebuild");E(k,{command:"rebuild",key:O},(ne,Ze)=>{if(ne)return H(be("Build failed",[{pluginName:"",text:ne,location:null,notes:[],detail:void 0}],[]),null);K(Ze,(Te,et)=>{Te?X(Te):re(et)})})}),k.ref(),J.dispose=()=>{z||(z=!0,E(k,{command:"rebuild-dispose",key:O},()=>{}),k.unref())}}W.rebuild=J}if(j.watch){if(!L){let z=!1;k.ref(),L=()=>{z||(z=!0,a.delete(O),E(k,{command:"watch-stop",key:O},()=>{}),k.unref())},g&&a.set(O,(re,X)=>{if(re){g.onRebuild&&g.onRebuild(re,null);return}let ne={errors:ue(X.errors,D),warnings:ue(X.warnings,D)};Y(X,ne),F(ne,T,()=>{if(ne.errors.length>0){g.onRebuild&&g.onRebuild(be("Build failed",ne.errors,ne.warnings),null);return}X.rebuildID!==void 0&&(ne.rebuild=J),ne.stop=L,g.onRebuild&&g.onRebuild(null,ne)})})}W.stop=L}H(null,W)})};if(m&&e.isBrowser)throw new Error('Cannot enable "write" in the browser');if(M&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(g&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');E(k,C,(j,H)=>{if(j)return _(new Error(j),null);if(I){let W=H,z=!1;k.ref();let re={port:W.port,host:W.host,wait:I.wait,stop(){z||(z=!0,I.stop(),k.unref())}};return k.ref(),I.wait.then(k.unref,k.unref),_(null,re)}return K(H,_)})};return{readFromStdout:P,afterClose:U,service:{buildOrServe:he,transform:({callName:h,refs:u,input:o,options:f,isTTY:N,fs:R,callback:_})=>{let O=Ye(),D=T=>{try{if(typeof o!="string")throw new Error('The input to "transform" must be a string');let y=gt(h,f,N,ce);E(u,{command:"transform",flags:y,inputFS:T!==null,input:T!==null?T:o},(A,k)=>{if(A)return _(new Error(A),null);let te=ue(k.errors,O),Q=ue(k.warnings,O),S=1,m=()=>--S===0&&_(null,{warnings:Q,code:k.code,map:k.map});if(te.length>0)return _(be("Transform failed",te,Q),null);k.codeFS&&(S++,R.readFile(k.code,(l,v)=>{l!==null?_(l,null):(k.code=v,m())})),k.mapFS&&(S++,R.readFile(k.map,(l,v)=>{l!==null?_(l,null):(k.map=v,m())})),m()})}catch(y){let F=[];try{ke(F,f,{},N,ce)}catch{}let A=we(y,e,O,void 0,"");E(u,{command:"error",flags:F,error:A},()=>{A.detail=O.load(A.detail),_(be("Transform failed",[A],[]),null)})}};if(typeof o=="string"&&o.length>1024*1024){let T=D;D=()=>R.writeFile(o,T)}D(null)},formatMessages:({callName:h,refs:u,messages:o,options:f,callback:N})=>{let R=de(o,"messages",null,"");if(!f)throw new Error(`Missing second argument in ${h}() call`);let _={},O=n(f,_,"kind",p),D=n(f,_,"color",B),T=n(f,_,"terminalWidth",pe);if(q(f,_,`in ${h}() call`),O===void 0)throw new Error(`Missing "kind" in ${h}() call`);if(O!=="error"&&O!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${h}() call`);let y={command:"format-msgs",messages:R,isWarning:O==="warning"};D!==void 0&&(y.color=D),T!==void 0&&(y.terminalWidth=T),E(u,y,(F,A)=>{if(F)return N(new Error(F),null);N(null,A.messages)})},analyzeMetafile:({callName:h,refs:u,metafile:o,options:f,callback:N})=>{f===void 0&&(f={});let R={},_=n(f,R,"color",B),O=n(f,R,"verbose",B);q(f,R,`in ${h}() call`);let D={command:"analyze-metafile",metafile:o};_!==void 0&&(D.color=_),O!==void 0&&(D.verbose=O),E(u,D,(T,y)=>{if(T)return N(new Error(T),null);N(null,y.result)})}}}}function Ye(){let e=new Map,t=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;let a=t++;return e.set(a,r),a}}}function xe(e,t,r){let a,d=!1;return()=>{if(d)return a;d=!0;try{let c=(e.stack+"").split(`
`);c.splice(1,1);let s=He(t,c,r);if(s)return a={text:e.message,location:s},a}catch{}}}function we(e,t,r,a,d){let c="Internal error",s=null;try{c=(e&&e.message||e)+""}catch{}try{s=He(t,(e.stack+"").split(`
`),"")}catch{}return{pluginName:d,text:c,location:s,notes:a?[a]:[],detail:r?r.store(e):-1}}function He(e,t,r){let a="    at ";if(e.readFileSync&&!t[0].startsWith(a)&&t[1].startsWith(a))for(let d=1;d<t.length;d++){let c=t[d];if(!!c.startsWith(a))for(c=c.slice(a.length);;){let s=/^(?:new |async )?\S+ \((.*)\)$/.exec(c);if(s){c=s[1];continue}if(s=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(c),s){c=s[1];continue}if(s=/^(\S+):(\d+):(\d+)$/.exec(c),s){let b;try{b=e.readFileSync(s[1],"utf8")}catch{break}let i=b.split(/\r\n|\r|\n|\u2028|\u2029/)[+s[2]-1]||"",x=+s[3]-1,P=i.slice(x,x+r.length)===r?r.length:0;return{file:s[1],namespace:"file",line:+s[2],column:fe(i.slice(0,x)).length,length:fe(i.slice(x,x+P)).length,lineText:i+`
`+t.slice(1).join(`
`),suggestion:""}}break}}return null}function be(e,t,r){let a=5,d=t.length<1?"":` with ${t.length} error${t.length<2?"":"s"}:`+t.slice(0,a+1).map((s,b)=>{if(b===a)return`
...`;if(!s.location)return`
error: ${s.text}`;let{file:i,line:x,column:P}=s.location,U=s.pluginName?`[plugin: ${s.pluginName}] `:"";return`
${i}:${x}:${P}: ERROR: ${U}${s.text}`}).join(""),c=new Error(`${e}${d}`);return c.errors=t,c.warnings=r,c}function ue(e,t){for(let r of e)r.detail=t.load(r.detail);return e}function Ke(e,t){if(e==null)return null;let r={},a=n(e,r,"file",p),d=n(e,r,"namespace",p),c=n(e,r,"line",pe),s=n(e,r,"column",pe),b=n(e,r,"length",pe),i=n(e,r,"lineText",p),x=n(e,r,"suggestion",p);return q(e,r,t),{file:a||"",namespace:d||"",line:c||0,column:s||0,length:b||0,lineText:i||"",suggestion:x||""}}function de(e,t,r,a){let d=[],c=0;for(let s of e){let b={},i=n(s,b,"pluginName",p),x=n(s,b,"text",p),P=n(s,b,"location",Je),U=n(s,b,"notes",G),E=n(s,b,"detail",ve),$=`in element ${c} of "${t}"`;q(s,b,$);let Z=[];if(U)for(let le of U){let se={},oe=n(le,se,"text",p),ie=n(le,se,"location",Je);q(le,se,$),Z.push({text:oe||"",location:Ke(ie,$)})}d.push({pluginName:i||a,text:x||"",location:Ke(P,$),notes:Z,detail:r?r.store(E):-1}),c++}return d}function Ee(e,t){let r=[];for(let a of e){if(typeof a!="string")throw new Error(`${JSON.stringify(t)} must be an array of strings`);r.push(a)}return r}function mt({path:e,contents:t}){let r=null;return{path:e,contents:t,get text(){return r===null&&(r=ge(t)),r}}}var wt="0.14.8",bt=e=>Se().build(e),yt=()=>{throw new Error('The "serve" API only works in node')},Re=(e,t)=>Se().transform(e,t),vt=(e,t)=>Se().formatMessages(e,t),kt=(e,t)=>Se().analyzeMetafile(e,t),xt=()=>{throw new Error('The "buildSync" API only works in node')},Et=()=>{throw new Error('The "transformSync" API only works in node')},St=()=>{throw new Error('The "formatMessagesSync" API only works in node')},$t=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},ye,De,Se=()=>{if(De)return De;throw ye?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},Ae=e=>{e=dt(e||{});let t=e.wasmURL,r=e.worker!==!1;if(!t)throw new Error('Must provide the "wasmURL" option');if(t+="",ye)throw new Error('Cannot call "initialize" more than once');return ye=Ot(t,r),ye.catch(()=>{ye=void 0}),ye},Ot=async(e,t)=>{let r=await fetch(e);if(!r.ok)throw new Error(`Failed to download ${JSON.stringify(e)}`);let a=await r.arrayBuffer(),d=`{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

(() => {
	// Map multiple JavaScript environments to a single common API,
	// preferring web standards over Node.js API.
	//
	// Environments considered:
	// - Browsers
	// - Node.js
	// - Electron
	// - Parcel
	// - Webpack

	if (typeof global !== "undefined") {
		// global already exists
	} else if (typeof window !== "undefined") {
		window.global = window;
	} else if (typeof self !== "undefined") {
		self.global = self;
	} else {
		throw new Error("cannot export Go (neither global, window nor self is defined)");
	}

	if (!global.require && typeof require !== "undefined") {
		global.require = require;
	}

	if (!global.fs && global.require) {
		const fs = require("fs");
		if (typeof fs === "object" && fs !== null && Object.keys(fs).length !== 0) {
			
    global.fs = Object.assign({}, fs, {
      // Hack around a Unicode bug in node: https://github.com/nodejs/node/issues/24550
      write(fd, buf, offset, length, position, callback) {
        if (offset === 0 && length === buf.length && position === null) {
          if (fd === process.stdout.fd) {
            try {
              process.stdout.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
          if (fd === process.stderr.fd) {
            try {
              process.stderr.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
        }
        fs.write(fd, buf, offset, length, position, callback);
      },
    });
  
		}
	}

	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!global.fs) {
		let outputBuf = "";
		global.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
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
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!global.process) {
		global.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
		}
	}

	if (!global.crypto && global.require) {
		const nodeCrypto = require("crypto");
		global.crypto = {
			getRandomValues(b) {
				nodeCrypto.randomFillSync(b);
			},
		};
	}
	if (!global.crypto) {
		throw new Error("global.crypto is not available, polyfill required (getRandomValues only)");
	}

	if (!global.performance) {
		global.performance = {
			now() {
				const [sec, nsec] = process.hrtime();
				return sec * 1000 + nsec / 1000000;
			},
		};
	}

	if (!global.TextEncoder && global.require) {
		global.TextEncoder = require("util").TextEncoder;
	}
	if (!global.TextEncoder) {
		throw new Error("global.TextEncoder is not available, polyfill required");
	}

	if (!global.TextDecoder && global.require) {
		global.TextDecoder = require("util").TextDecoder;
	}
	if (!global.TextDecoder) {
		throw new Error("global.TextDecoder is not available, polyfill required");
	}

	// End of polyfills for common API.

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	global.Go = class {
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
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
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
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				go: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
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

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						sp >>>= 0;
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						sp >>>= 0;
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						sp >>>= 0;
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime() (sec int64, nsec int32)
					"runtime.walltime": (sp) => {
						sp >>>= 0;
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8) + 1, // setTimeout has been seen to fire up to 1 millisecond early
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						sp >>>= 0;
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
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

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						sp >>>= 0;
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp() >>> 0; // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						sp >>>= 0;
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						sp >>>= 0;
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						sp >>>= 0;
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						sp >>>= 0;
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						sp >>>= 0;
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
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

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
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
					},
				}
			};
		}

		async run(instance) {
			if (!(instance instanceof WebAssembly.Instance)) {
				throw new Error("Go.run: WebAssembly.Instance expected");
			}
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				global,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[global, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
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

			// The linker guarantees global data starts from at least wasmMinDataAddr.
			// Keep in sync with cmd/link/internal/ld/data.go:wasmMinDataAddr.
			const wasmMinDataAddr = 4096 + 8192;
			if (offset >= wasmMinDataAddr) {
				throw new Error("total length of command line and environment variables exceeds limit");
			}

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
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
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}

	if (
		typeof module !== "undefined" &&
		global.require &&
		global.require.main === module &&
		global.process &&
		global.process.versions &&
		!global.process.versions.electron
	) {
		if (process.argv.length < 3) {
			console.error("usage: go_js_wasm_exec [wasm binary] [arguments]");
			process.exit(1);
		}

		const go = new Go();
		go.argv = process.argv.slice(2);
		go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
		go.exit = process.exit;
		WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then((result) => {
			process.on("exit", (code) => { // Node.js exits if no event handler is pending
				if (code === 0 && !go.exited) {
					// deadlock, make Go print error and stack traces
					go._pendingEvent = { id: 0 };
					go._resume();
				}
			});
			return go.run(result.instance);
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
})();
onmessage = ({ data: wasm }) => {
  let decoder = new TextDecoder();
  let fs = global.fs;
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
  let go = new global.Go();
  go.argv = ["", \`--service=\${"0.14.8"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
};}`,c;if(t){let i=new Blob([d],{type:"text/javascript"});c=new Worker(URL.createObjectURL(i))}else{let x=new Function("postMessage",d+"var onmessage; return m => onmessage(m)")(P=>c.onmessage({data:P}));c={onmessage:null,postMessage:P=>x({data:P}),terminate(){}}}c.postMessage(a),c.onmessage=({data:i})=>s(i);let{readFromStdout:s,service:b}=pt({writeToStdin(i){c.postMessage(i)},isSync:!1,isBrowser:!0,esbuild:Me});De={build:i=>new Promise((x,P)=>b.buildOrServe({callName:"build",refs:null,serveOptions:null,options:i,isTTY:!1,defaultWD:"/",callback:(U,E)=>U?P(U):x(E)})),transform:(i,x)=>new Promise((P,U)=>b.transform({callName:"transform",refs:null,input:i,options:x||{},isTTY:!1,fs:{readFile(E,$){$(new Error("Internal error"),null)},writeFile(E,$){$(null)}},callback:(E,$)=>E?U(E):P($)})),formatMessages:(i,x)=>new Promise((P,U)=>b.formatMessages({callName:"formatMessages",refs:null,messages:i,options:x,callback:(E,$)=>E?U(E):P($)})),analyzeMetafile:(i,x)=>new Promise((P,U)=>b.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof i=="string"?i:JSON.stringify(i),options:x,callback:(E,$)=>E?U(E):P($)}))}};var Tt=Ae({wasmURL:"https://unpkg.com/esbuild-wasm@0.14.8/esbuild.wasm",worker:!1}),Xe=!1,Qe=async e=>(Xe||(await Tt,Xe=!0),(await Re(e,{loader:"tsx",target:"es2018"})).code);var Dt={async fetch(e,t){let a=new URL(e.url).pathname.slice(1).split("/");switch(a[0]){case"api":return jt(a.slice(1),e,t);default:return new Response("Noo, Not found",{status:404})}}};async function jt(e,t,r){switch(e[0]){case"transform":if(t.method==="POST"){let a=await t.text(),d=await Qe(a);return new Response(a,{status:200,headers:{"Access-Control-Allow-Origin":"*","Cache-Control":"no-cache","Content-Type":"text/html; charset=UTF-8"}})}else return new Response("please post",{status:200,headers:{"Access-Control-Allow-Origin":"*","Cache-Control":"no-cache","Content-Type":"text/html; charset=UTF-8"}});default:return new Response(e[0],{status:404})}}export{Dt as default};
