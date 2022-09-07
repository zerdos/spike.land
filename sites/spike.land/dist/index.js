var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "../../node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i2 = 0; i2 < arguments.length; i2++) {
        this.define(arguments[i2]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i2 = 0; i2 < extensions.length; i2++) {
          const ext = extensions[i2];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// ../../node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "../../node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// ../../node_modules/mime/types/other.js
var require_other = __commonJS({
  "../../node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// ../../node_modules/mime/index.js
var require_mime = __commonJS({
  "../../node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// ../../node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "../../node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// ../../node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      bypassCache: false
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : {},
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html",
      pathIsEncoded: false
    };
    function assignOptions(options) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options);
    }
    var mapRequestToAsset = (request, options) => {
      options = assignOptions(options);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset;
    function serveSinglePageApp(request, options) {
      options = assignOptions(options);
      request = mapRequestToAsset(request, options);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = async (event, options) => {
      options = assignOptions(options);
      const request = event.request;
      const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = options.pathIsEncoded;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset(request, options);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options.cacheControl) {
          case "function":
            return options.cacheControl(request);
          case "object":
            return options.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = "strong") => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              return `W/${entityId}`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = await cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
          } else {
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body = await ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", body.length);
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey, "strong"));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag = formatETag(response.headers.get("etag"), "strong");
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag) {
          if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    };
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// src/chat.ts
var import_kv_asset_handler = __toESM(require_dist());
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

// src/handleErrors.ts
async function handleErrors(request, func) {
  try {
    return await func();
  } catch (err) {
    if (request.headers.get("Upgrade") === "websocket") {
      let stack = null;
      if (err instanceof Error) {
        stack = err.stack;
        console.log({ error: err.stack, message: err.message });
      }
      let pair = new WebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      let stack = "We have no idea what happened";
      if (err instanceof Error) {
        stack = err.stack || stack;
        console.log({ error: err.stack, message: err.message });
      }
      return new Response(stack, { status: 500 });
    }
  }
}

// src/chat.ts
var a = JSON.parse(manifestJSON);
var ws = a["ws.mjs"];
var preact = a["react-preact.mjs"];
var emotionReact = a["emotion.mjs"];
var motion = a["motion.mjs"];
var esbuildExternal = [
  "monaco-editor",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "@mui/material",
  "framer-motion",
  "tslib"
];
var externals = esbuildExternal.join(",");
var mods = {};
esbuildExternal.map((packageName) => mods[packageName] = `npm:/${packageName}`);
var imap = {
  "imports": {
    ...mods,
    "@emotion/react": emotionReact,
    "@emotion/react/jsx-runtime": emotionReact,
    "@emotion/react/jsx-dev-runtime": emotionReact,
    "@mui/": "npm:@mui/",
    "react": preact,
    "react-dom": preact,
    "framer-motion": motion,
    "react-dom/client": preact,
    "react-dom/server": preact,
    "react/jsx-runtime": preact,
    "react/jsx-dev-runtime": preact
  }
};
var chat_default = {
  async fetch(request, env, ctx) {
    return handleErrors(request, async () => {
      console.log(`handling request: ${request.url}`);
      const u2 = new URL(request.url);
      let url = u2;
      const accept = request.headers.get("accept");
      const serveJs = !(accept && accept.includes("html"));
      if (serveJs && u2.pathname.endsWith(".tsx") && !u2.pathname.endsWith(".index.tsx")) {
        url = new URL(request.url.replace(".tsx", "/index.tsx"));
      }
      if (serveJs && !url.pathname.includes(".")) {
        url = new URL(request.url + "/index.js");
      }
      const path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        return new Response(
          `<meta http-equiv="refresh" content="0; URL=${u2.origin}/live/coder/" />`,
          {
            headers: {
              "Location": `${u2.origin}/live/coder`,
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache"
            }
          }
        );
      }
      const handleFetchApi = async (path2) => {
        const newUrl = new URL(path2.join("/"), url.origin).toString();
        const _request = new Request(newUrl, { ...request, url: newUrl });
        return (async (request2) => {
          const cacheKey = new Request(request2.url);
          const cache = caches.default;
          const cachedResponse = await cache.match(cacheKey);
          if (cachedResponse) {
            return cachedResponse.clone();
          }
          if (path2[0].startsWith("npm:")) {
            const isJs = u2.toString().includes(".js") || u2.toString().includes(".mjs");
            const packageName = u2.toString().replace(
              u2.origin + "/npm:",
              ""
            );
            const searchParams = isJs ? `?bundle&external=${esbuildExternal.filter((p) => p !== packageName).join(",")} ` : "";
            const esmUrl = "https://esm.sh/" + packageName + searchParams;
            let resp = await fetch(esmUrl, { ...request2, url: esmUrl });
            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(redirectUrl, {
                  ...request2,
                  url: redirectUrl
                });
              }
              if (resp !== null && !resp.ok) {
                return resp;
              }
            }
            const isText = !!resp?.headers?.get("Content-Type")?.includes(
              "charset"
            );
            const bodyStr = await (isText ? resp.text() : null);
            if (!bodyStr) {
              throw new Error("empty body");
            }
            const regex = /https:\/\/esm.sh\//gm;
            const regex2 = / from "\//gm;
            const regex3 = /import "\//gm;
            const regex4 = /from"\//gm;
            const regex5 = /import"\//gm;
            const responseToCache = new Response(
              isText ? bodyStr.replaceAll(regex, u2.origin + "/npm:/").replaceAll(regex2, ' from "/npm:/').replaceAll(regex3, 'import "/npm:/').replaceAll(regex4, ' from "/npm:/').replaceAll(regex5, 'import "/npm:/') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "public, max-age=604800, immutable",
                  "Content-Type": resp.headers.get("Content-Type")
                }
              }
            );
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }
          if (path2[0].startsWith("unpkg:")) {
            const esmUrl = u2.toString().replace(
              u2.origin + "/unpkg:",
              "https://unpkg.com/"
            );
            let resp = await fetch(esmUrl, { ...request2, url: esmUrl });
            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(redirectUrl, {
                  ...request2,
                  url: redirectUrl
                });
              }
              if (resp !== null && !resp.ok)
                return resp;
            }
            const isText = !!resp?.headers?.get("Content-Type")?.includes(
              "charset"
            );
            const bodyStr = await (isText ? resp.text() : null);
            const regex = /https:\/\/unpkg.com\//gm;
            const regex2 = / from "\//gm;
            if (!bodyStr)
              throw new Error("empty body");
            const responseToCache = new Response(
              `
              // ${request2.url}
              ` + bodyStr ? bodyStr.replaceAll(regex, u2.origin + "/unpkg:").replaceAll(regex2, ' from "/unpkg:') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "public, max-age=604800, immutable",
                  "Content-Type": resp.headers.get("Content-Type")
                }
              }
            );
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }
          if (path2[0].startsWith("node_modules")) {
            const esmUrl = u2.toString().replace(
              u2.origin + "/node_modules/",
              "https://unpkg.com/"
            );
            let resp = await fetch(esmUrl, { ...request2, url: esmUrl });
            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(new URL(redirectUrl, `https://unpkg.com`).toString(), {
                  ...request2,
                  url: redirectUrl
                });
              }
              if (resp !== null && !resp.ok)
                return resp;
            }
            const isText = !!resp?.headers?.get("Content-Type")?.includes(
              "charset"
            );
            const bodyStr = await (isText ? resp.text() : null);
            const regex = /https:\/\/unpkg.com\//gm;
            const regex2 = / from "\//gm;
            if (!bodyStr)
              throw new Error("empty body");
            const responseToCache = new Response(
              `
              // ${request2.url}
              ` + bodyStr ? bodyStr.replaceAll(regex, u2.origin + "/node_modules/").replaceAll(regex2, ' from "/node_modules/') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "public, max-age=604800, immutable",
                  "Content-Type": resp.headers.get("Content-Type")
                }
              }
            );
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }
          switch (path2[0]) {
            case "ping":
              return new Response("ping" + Math.random(), {
                headers: {
                  "Content-Type": "text/html;charset=UTF-8",
                  "Cache-Control": "no-cache"
                }
              });
            case "env":
              return new Response(JSON.stringify({ env, accept }), {
                headers: {
                  "Content-Type": "text/html;charset=UTF-8",
                  "Cache-Control": "no-cache"
                }
              });
            case "files.json":
              return new Response(manifestJSON, {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache"
                }
              });
            case "importmap.json":
              const importmapImport = { ...imap.imports };
              for (const [key, value] of Object.entries(imap.imports)) {
                importmapImport[key] = "/" + value;
              }
              return new Response(JSON.stringify({ imports: importmapImport }), {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache"
                }
              });
            case "api":
              return handleApiRequest(path2.slice(1), request2, env);
            case "ipns":
            case "ipfs":
              const u3 = new URL(request2.url, "https://cloudflare-ipfs.com");
              const new1 = new URL(u3.pathname, "https://cloudflare-ipfs.com");
              const resp = await fetch(new1.toString());
              if (resp.ok)
                return resp;
              const new2 = new URL(u3.pathname, "https://ipfs.io");
              const resp2 = await fetch(new2.toString());
              return resp2;
            case "live":
              const paths = [...path2.slice(1)];
              return Promise.any([
                handleApiRequest(
                  ["room", ...paths, "public"],
                  request2,
                  env
                ),
                path2.length > 2 ? handleFetchApi([...path2.slice(2)]) : Promise.reject()
              ]).catch(() => new Response("Error"));
            default:
              const kvResp = await (0, import_kv_asset_handler.getAssetFromKV)(
                {
                  request: request2,
                  waitUntil(promise) {
                    return ctx.waitUntil(promise);
                  }
                },
                {
                  cacheControl: isChunk(url.href) ? {
                    browserTTL: 2 * 60 * 60 * 24,
                    edgeTTL: 2 * 60 * 60 * 24,
                    bypassCache: false
                  } : {
                    browserTTL: 0,
                    edgeTTL: 0,
                    bypassCache: true
                  },
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST: manifestJSON
                }
              );
              const cacheKV = kvResp.clone();
              if (isChunk(url.href)) {
                cacheKV.headers.append("Cache-Control", "public, max-age=604800, immutable");
              }
              await cache.put(cacheKey, cacheKV.clone());
              return cacheKV.clone();
          }
        })(_request);
      };
      return handleFetchApi(path);
    });
  }
};
async function handleApiRequest(path, request, env) {
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          const id2 = env.CODE.newUniqueId();
          return new Response(id2.toString(), {
            headers: { "Access-Control-Allow-Origin": "*" }
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      const name = path[1].replace(".tsx", "");
      let id;
      if (name.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      const roomObject = env.CODE.get(id);
      const newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(newUrl.toString(), request);
    }
    case "rtc": {
      const room = path[1];
      const user = path[2];
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
function isChunk(link) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.includes("chunk-") || chunkRegExp.test(link);
}

// src/rateLimiterClient.ts
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    __publicField(this, "limiter");
    __publicField(this, "inCoolDown");
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.limiter = getLimiterStub();
    this.inCoolDown = false;
  }
  checkLimit() {
    if (this.inCoolDown) {
      return false;
    }
    this.inCoolDown = true;
    this.callLimiter();
    return true;
  }
  async callLimiter() {
    try {
      let response;
      try {
        response = await this.limiter.fetch(
          new Request("https://dummy-url", {
            method: "POST"
          })
        );
      } catch (err) {
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch(
          new Request("https://dummy-url", {
            method: "POST"
          })
        );
      }
      let coolDown = +await response.text() * 100;
      await new Promise((resolve) => setTimeout(() => resolve(true), coolDown));
      this.inCoolDown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/index.html
var src_default = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="./">
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <title>Instant React Editor</title>
<style>
  html,
body {
  overflow: overlay;
}

html[data-theme='dark'] {
  background-color: #121212;
 --text-color-normal: hsl(210, 10%, 62%);
  --text-color-light: hsl(210, 15%, 35%);
  --text-color-richer: hsl(210, 50%, 72%);
  --text-color-highlight: hsl(25, 70%, 45%);
}
@media screen and (prefers-color-scheme: light) {
  body {
    background-color: white;
    color: black;
    --text-color-normal: #0a244d;
    --text-color-light: #8cabd9;
  }
}
html, body {margin: 0; height: 100%}

 /* #root{} */


 *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
   all: unset;
   display: revert;
  }
 *,
  *::before,
 *::after {
   box-sizing: border-box;
 }
 ol, ul {
   list-style: none;
 }
 img {
   max-width: 100%;
 }
 table {
   border-collapse: collapse;
 }
 textarea {
   white-space: revert;
 }
 
 
   </style>
   <script type="esms-options">
    {
      "shimMode": true
    }
    <\/script>

   <script async type="importmap"><\/script>
   </head>
   
   
  <body>
  
  
  
  
  
  

<script>     
  
  if (location.href.indexOf(".tsx")!==-1) {
    const loc = location.href.indexOf(".tsx");

    location.href = location.href.slice(0,loc);
  }

  window.process = {
    env: {
      "NODE_ENV": "production"
    }};
    



window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the background cache.');
  } else {
    console.log('This page was loaded normally.');
  }
});
 
 <\/script>



<div id="root"></div>

<script type="module">
    import {mST, assets, codeSpace, address} from "/live/coder/mST.mjs" 
   
import( location.origin + "/" + assets["ws.mjs"]).then(({run})=>run({
      mST,
      codeSpace,
      address,
      assets
    }));
<\/script>

  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cc7e2ceaa75d4111b26b0ec989795375"}'><\/script>
  <!-- End Cloudflare Web Analytics -->
</body>
</html>`;

// src/iife.html
var iife_default = `
<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="//">
  <title>Instant React Editor</title>
  <style>
    html,
body,
#root,
#zbody {
  box-sizing: border-box;
  width: 100%;
  height: 100%; 
 }


*, *::before, *::after {
  box-sizing: inherit;
}
body {
  border: 0;
  padding: 0;
  margin: 0;
  background: fixed;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
  overscroll-behavior-y: contain;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  min-height: -webkit-fill-available;
  height: 100%;
  /* prevent overscroll bounce*/
  /* overflow-y: scroll; */
  --webkit-overflow-scrolling: touch;
  padding-bottom: 0 !important;
  overflow: hidden;
  /* overflow-x: hidden; */
  /* overflow-y: hidden; */
}
  </style>
</head>
<body>
  <script>     
  window.startedWithNativeEsmModules = false;
  if (location.href.indexOf(".tsx")!==-1) {
    const loc = location.href.indexOf(".tsx");

    location.href = location.href.slice(0,loc);
  }
  window.process = {
    env: {
      "NODE_ENV": "production"
    }};
  <\/script>
  <div id="root"></div>
  <script>


   /** startState **/


window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the bg cache.');
  } else {
    console.log('This page was loaded normally.');
  }
});
 
 <\/script>

  <script type="importmap">
{
  "imports": {
    "react/jsx-runtime": "/react.mjs",
    "react": "/react.mjs",
    "preact": "/react.mjs",
    "react-dom/client": "/react.mjs",
    "react-dom/server": "/react.mjs",
    "framer-motion": "/framer-motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/react/jsx-runtime": "/emotion.mjs",
    "@emotion/cache": "/emotion.mjs"
  }
}
    <\/script>
  
    <script defer src="/iife.js"><\/script>


  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cc7e2ceaa75d4111b26b0ec989795375"}'><\/script><!-- End Cloudflare Web Analytics -->
</body>
</html>`;

// src/chatRoom.ts
import manifestJSON2 from "__STATIC_CONTENT_MANIFEST";

// ../../packages/code/dist/chunk-chunk-WHEVJVJY.mjs
var h = Object.create;
var f = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var k = Object.getPrototypeOf;
var l = Object.prototype.hasOwnProperty;
var m = (a2, b2, c) => b2 in a2 ? f(a2, b2, { enumerable: true, configurable: true, writable: true, value: c }) : a2[b2] = c;
var r = ((a2) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(a2, { get: (b2, c) => (typeof __require < "u" ? __require : b2)[c] }) : a2)(function(a2) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + a2 + '" is not supported');
});
var n = (a2, b2) => () => (a2 && (b2 = a2(a2 = 0)), b2);
var s = (a2, b2) => () => (b2 || a2((b2 = { exports: {} }).exports, b2), b2.exports);
var o = (a2, b2, c, d) => {
  if (b2 && typeof b2 == "object" || typeof b2 == "function")
    for (let e of j(b2))
      !l.call(a2, e) && e !== c && f(a2, e, { get: () => b2[e], enumerable: !(d = i(b2, e)) || d.enumerable });
  return a2;
};
var u = (a2, b2, c) => (c = a2 != null ? h(k(a2)) : {}, o(b2 || !a2 || !a2.__esModule ? f(c, "default", { value: a2, enumerable: true }) : c, a2));
var v = (a2, b2, c) => (m(a2, typeof b2 != "symbol" ? b2 + "" : b2, c), c);
var B;
var q = n(() => {
  B = { env: { NODE_ENV: "production" }, version: "1.1.1", browser: true };
});

// ../../packages/code/dist/chunk-chunk-QR2H2R2X.mjs
var Wn = s((to, kn) => {
  q();
  var ut = -1, rt = 1, k2 = 0;
  function or(t, r2, e, n2) {
    if (t === r2)
      return t ? [[k2, t]] : [];
    if (e != null) {
      var i2 = Yi(t, r2, e);
      if (i2)
        return i2;
    }
    var o2 = ve(t, r2), s2 = t.substring(0, o2);
    t = t.substring(o2), r2 = r2.substring(o2), o2 = le(t, r2);
    var u2 = t.substring(t.length - o2);
    t = t.substring(0, t.length - o2), r2 = r2.substring(0, r2.length - o2);
    var a2 = ki(t, r2);
    return s2 && a2.unshift([k2, s2]), u2 && a2.push([k2, u2]), Ln(a2, n2), a2;
  }
  function ki(t, r2) {
    var e;
    if (!t)
      return [[rt, r2]];
    if (!r2)
      return [[ut, t]];
    var n2 = t.length > r2.length ? t : r2, i2 = t.length > r2.length ? r2 : t, o2 = n2.indexOf(i2);
    if (o2 !== -1)
      return e = [[rt, n2.substring(0, o2)], [k2, i2], [rt, n2.substring(o2 + i2.length)]], t.length > r2.length && (e[0][0] = e[2][0] = ut), e;
    if (i2.length === 1)
      return [[ut, t], [rt, r2]];
    var s2 = Ki(t, r2);
    if (s2) {
      var u2 = s2[0], a2 = s2[1], f2 = s2[2], h2 = s2[3], c = s2[4], p = or(u2, f2), _ = or(a2, h2);
      return p.concat([[k2, c]], _);
    }
    return Wi(t, r2);
  }
  function Wi(t, r2) {
    for (var e = t.length, n2 = r2.length, i2 = Math.ceil((e + n2) / 2), o2 = i2, s2 = 2 * i2, u2 = new Array(s2), a2 = new Array(s2), f2 = 0; f2 < s2; f2++)
      u2[f2] = -1, a2[f2] = -1;
    u2[o2 + 1] = 0, a2[o2 + 1] = 0;
    for (var h2 = e - n2, c = h2 % 2 !== 0, p = 0, _ = 0, v2 = 0, l2 = 0, m2 = 0; m2 < i2; m2++) {
      for (var d = -m2 + p; d <= m2 - _; d += 2) {
        var S = o2 + d, M;
        d === -m2 || d !== m2 && u2[S - 1] < u2[S + 1] ? M = u2[S + 1] : M = u2[S - 1] + 1;
        for (var R = M - d; M < e && R < n2 && t.charAt(M) === r2.charAt(R); )
          M++, R++;
        if (u2[S] = M, M > e)
          _ += 2;
        else if (R > n2)
          p += 2;
        else if (c) {
          var j2 = o2 + h2 - d;
          if (j2 >= 0 && j2 < s2 && a2[j2] !== -1) {
            var T = e - a2[j2];
            if (M >= T)
              return Cn(t, r2, M, R);
          }
        }
      }
      for (var J = -m2 + v2; J <= m2 - l2; J += 2) {
        var j2 = o2 + J, T;
        J === -m2 || J !== m2 && a2[j2 - 1] < a2[j2 + 1] ? T = a2[j2 + 1] : T = a2[j2 - 1] + 1;
        for (var ft = T - J; T < e && ft < n2 && t.charAt(e - T - 1) === r2.charAt(n2 - ft - 1); )
          T++, ft++;
        if (a2[j2] = T, T > e)
          l2 += 2;
        else if (ft > n2)
          v2 += 2;
        else if (!c) {
          var S = o2 + h2 - J;
          if (S >= 0 && S < s2 && u2[S] !== -1) {
            var M = u2[S], R = o2 + M - S;
            if (T = e - T, M >= T)
              return Cn(t, r2, M, R);
          }
        }
      }
    }
    return [[ut, t], [rt, r2]];
  }
  function Cn(t, r2, e, n2) {
    var i2 = t.substring(0, e), o2 = r2.substring(0, n2), s2 = t.substring(e), u2 = r2.substring(n2), a2 = or(i2, o2), f2 = or(s2, u2);
    return a2.concat(f2);
  }
  function ve(t, r2) {
    if (!t || !r2 || t.charAt(0) !== r2.charAt(0))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r2.length), i2 = n2, o2 = 0; e < i2; )
      t.substring(o2, i2) == r2.substring(o2, i2) ? (e = i2, o2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Un(t.charCodeAt(i2 - 1)) && i2--, i2;
  }
  function le(t, r2) {
    if (!t || !r2 || t.slice(-1) !== r2.slice(-1))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r2.length), i2 = n2, o2 = 0; e < i2; )
      t.substring(t.length - i2, t.length - o2) == r2.substring(r2.length - i2, r2.length - o2) ? (e = i2, o2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Pn(t.charCodeAt(t.length - i2)) && i2--, i2;
  }
  function Ki(t, r2) {
    var e = t.length > r2.length ? t : r2, n2 = t.length > r2.length ? r2 : t;
    if (e.length < 4 || n2.length * 2 < e.length)
      return null;
    function i2(_, v2, l2) {
      for (var m2 = _.substring(l2, l2 + Math.floor(_.length / 4)), d = -1, S = "", M, R, j2, T; (d = v2.indexOf(m2, d + 1)) !== -1; ) {
        var J = ve(_.substring(l2), v2.substring(d)), ft = le(_.substring(0, l2), v2.substring(0, d));
        S.length < ft + J && (S = v2.substring(d - ft, d) + v2.substring(d, d + J), M = _.substring(0, l2 - ft), R = _.substring(l2 + J), j2 = v2.substring(0, d - ft), T = v2.substring(d + J));
      }
      return S.length * 2 >= _.length ? [M, R, j2, T, S] : null;
    }
    var o2 = i2(e, n2, Math.ceil(e.length / 4)), s2 = i2(e, n2, Math.ceil(e.length / 2)), u2;
    if (!o2 && !s2)
      return null;
    s2 ? o2 ? u2 = o2[4].length > s2[4].length ? o2 : s2 : u2 = s2 : u2 = o2;
    var a2, f2, h2, c;
    t.length > r2.length ? (a2 = u2[0], f2 = u2[1], h2 = u2[2], c = u2[3]) : (h2 = u2[0], c = u2[1], a2 = u2[2], f2 = u2[3]);
    var p = u2[4];
    return [a2, f2, h2, c, p];
  }
  function Ln(t, r2) {
    t.push([k2, ""]);
    for (var e = 0, n2 = 0, i2 = 0, o2 = "", s2 = "", u2; e < t.length; ) {
      if (e < t.length - 1 && !t[e][1]) {
        t.splice(e, 1);
        continue;
      }
      switch (t[e][0]) {
        case rt:
          i2++, s2 += t[e][1], e++;
          break;
        case ut:
          n2++, o2 += t[e][1], e++;
          break;
        case k2:
          var a2 = e - i2 - n2 - 1;
          if (r2) {
            if (a2 >= 0 && Fn(t[a2][1])) {
              var f2 = t[a2][1].slice(-1);
              if (t[a2][1] = t[a2][1].slice(0, -1), o2 = f2 + o2, s2 = f2 + s2, !t[a2][1]) {
                t.splice(a2, 1), e--;
                var h2 = a2 - 1;
                t[h2] && t[h2][0] === rt && (i2++, s2 = t[h2][1] + s2, h2--), t[h2] && t[h2][0] === ut && (n2++, o2 = t[h2][1] + o2, h2--), a2 = h2;
              }
            }
            if (Bn(t[e][1])) {
              var f2 = t[e][1].charAt(0);
              t[e][1] = t[e][1].slice(1), o2 += f2, s2 += f2;
            }
          }
          if (e < t.length - 1 && !t[e][1]) {
            t.splice(e, 1);
            break;
          }
          if (o2.length > 0 || s2.length > 0) {
            o2.length > 0 && s2.length > 0 && (u2 = ve(s2, o2), u2 !== 0 && (a2 >= 0 ? t[a2][1] += s2.substring(0, u2) : (t.splice(0, 0, [k2, s2.substring(0, u2)]), e++), s2 = s2.substring(u2), o2 = o2.substring(u2)), u2 = le(s2, o2), u2 !== 0 && (t[e][1] = s2.substring(s2.length - u2) + t[e][1], s2 = s2.substring(0, s2.length - u2), o2 = o2.substring(0, o2.length - u2)));
            var c = i2 + n2;
            o2.length === 0 && s2.length === 0 ? (t.splice(e - c, c), e = e - c) : o2.length === 0 ? (t.splice(e - c, c, [rt, s2]), e = e - c + 1) : s2.length === 0 ? (t.splice(e - c, c, [ut, o2]), e = e - c + 1) : (t.splice(e - c, c, [ut, o2], [rt, s2]), e = e - c + 2);
          }
          e !== 0 && t[e - 1][0] === k2 ? (t[e - 1][1] += t[e][1], t.splice(e, 1)) : e++, i2 = 0, n2 = 0, o2 = "", s2 = "";
          break;
      }
    }
    t[t.length - 1][1] === "" && t.pop();
    var p = false;
    for (e = 1; e < t.length - 1; )
      t[e - 1][0] === k2 && t[e + 1][0] === k2 && (t[e][1].substring(t[e][1].length - t[e - 1][1].length) === t[e - 1][1] ? (t[e][1] = t[e - 1][1] + t[e][1].substring(0, t[e][1].length - t[e - 1][1].length), t[e + 1][1] = t[e - 1][1] + t[e + 1][1], t.splice(e - 1, 1), p = true) : t[e][1].substring(0, t[e + 1][1].length) == t[e + 1][1] && (t[e - 1][1] += t[e + 1][1], t[e][1] = t[e][1].substring(t[e + 1][1].length) + t[e + 1][1], t.splice(e + 1, 1), p = true)), e++;
    p && Ln(t, r2);
  }
  function Un(t) {
    return t >= 55296 && t <= 56319;
  }
  function Pn(t) {
    return t >= 56320 && t <= 57343;
  }
  function Bn(t) {
    return Pn(t.charCodeAt(0));
  }
  function Fn(t) {
    return Un(t.charCodeAt(t.length - 1));
  }
  function Ji(t) {
    for (var r2 = [], e = 0; e < t.length; e++)
      t[e][1].length > 0 && r2.push(t[e]);
    return r2;
  }
  function _e(t, r2, e, n2) {
    return Fn(t) || Bn(n2) ? null : Ji([[k2, t], [ut, r2], [rt, e], [k2, n2]]);
  }
  function Yi(t, r2, e) {
    var n2 = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i2 = typeof e == "number" ? null : e.newRange, o2 = t.length, s2 = r2.length;
    if (n2.length === 0 && (i2 === null || i2.length === 0)) {
      var u2 = n2.index, a2 = t.slice(0, u2), f2 = t.slice(u2), h2 = i2 ? i2.index : null;
      t: {
        var c = u2 + s2 - o2;
        if (h2 !== null && h2 !== c || c < 0 || c > s2)
          break t;
        var p = r2.slice(0, c), _ = r2.slice(c);
        if (_ !== f2)
          break t;
        var v2 = Math.min(u2, c), l2 = a2.slice(0, v2), m2 = p.slice(0, v2);
        if (l2 !== m2)
          break t;
        var d = a2.slice(v2), S = p.slice(v2);
        return _e(l2, d, S, f2);
      }
      t: {
        if (h2 !== null && h2 !== u2)
          break t;
        var M = u2, p = r2.slice(0, M), _ = r2.slice(M);
        if (p !== a2)
          break t;
        var R = Math.min(o2 - M, s2 - M), j2 = f2.slice(f2.length - R), T = _.slice(_.length - R);
        if (j2 !== T)
          break t;
        var d = f2.slice(0, f2.length - R), S = _.slice(0, _.length - R);
        return _e(a2, d, S, j2);
      }
    }
    if (n2.length > 0 && i2 && i2.length === 0) {
      t: {
        var l2 = t.slice(0, n2.index), j2 = t.slice(n2.index + n2.length), v2 = l2.length, R = j2.length;
        if (s2 < v2 + R)
          break t;
        var m2 = r2.slice(0, v2), T = r2.slice(s2 - R);
        if (l2 !== m2 || j2 !== T)
          break t;
        var d = t.slice(v2, o2 - R), S = r2.slice(v2, s2 - R);
        return _e(l2, d, S, j2);
      }
    }
    return null;
  }
  function wr(t, r2, e) {
    return or(t, r2, e, true);
  }
  wr.INSERT = rt;
  wr.DELETE = ut;
  wr.EQUAL = k2;
  kn.exports = wr;
});
q();
q();
var Gt = "delete";
var I = 5;
var Y = 1 << I;
var L = Y - 1;
var y = {};
function Ar() {
  return { value: false };
}
function H(t) {
  t && (t.value = true);
}
function Ur() {
}
function bt(t) {
  return t.size === void 0 && (t.size = t.__iterate(ke)), t.size;
}
function lt(t, r2) {
  if (typeof r2 != "number") {
    var e = r2 >>> 0;
    if ("" + e !== r2 || e === 4294967295)
      return NaN;
    r2 = e;
  }
  return r2 < 0 ? bt(t) + r2 : r2;
}
function ke() {
  return true;
}
function Vt(t, r2, e) {
  return (t === 0 && !Ke(t) || e !== void 0 && t <= -e) && (r2 === void 0 || e !== void 0 && r2 >= e);
}
function jt(t, r2) {
  return We(t, r2, 0);
}
function xt(t, r2) {
  return We(t, r2, r2);
}
function We(t, r2, e) {
  return t === void 0 ? e : Ke(t) ? r2 === 1 / 0 ? r2 : Math.max(0, r2 + t) | 0 : r2 === void 0 || r2 === t ? t : Math.min(r2, t) | 0;
}
function Ke(t) {
  return t < 0 || t === 0 && 1 / t === -1 / 0;
}
var Je = "@@__IMMUTABLE_ITERABLE__@@";
function F(t) {
  return Boolean(t && t[Je]);
}
var Ye = "@@__IMMUTABLE_KEYED__@@";
function z(t) {
  return Boolean(t && t[Ye]);
}
var He = "@@__IMMUTABLE_INDEXED__@@";
function B2(t) {
  return Boolean(t && t[He]);
}
function vr(t) {
  return z(t) || B2(t);
}
var A = function(r2) {
  return F(r2) ? r2 : K(r2);
};
var Q = function(t) {
  function r2(e) {
    return z(e) ? e : yt(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
var St = function(t) {
  function r2(e) {
    return B2(e) ? e : G(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
var Tt = function(t) {
  function r2(e) {
    return F(e) && !vr(e) ? e : Ct(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
A.Keyed = Q;
A.Indexed = St;
A.Set = Tt;
var Xe = "@@__IMMUTABLE_SEQ__@@";
function Pr(t) {
  return Boolean(t && t[Xe]);
}
var Ze = "@@__IMMUTABLE_RECORD__@@";
function $t(t) {
  return Boolean(t && t[Ze]);
}
function ot(t) {
  return F(t) || $t(t);
}
var Dt = "@@__IMMUTABLE_ORDERED__@@";
function x(t) {
  return Boolean(t && t[Dt]);
}
var tr = 0;
var tt = 1;
var Z = 2;
var qr = typeof Symbol == "function" && Symbol.iterator;
var Qe = "@@iterator";
var lr = qr || Qe;
var g = function(r2) {
  this.next = r2;
};
g.prototype.toString = function() {
  return "[Iterator]";
};
g.KEYS = tr;
g.VALUES = tt;
g.ENTRIES = Z;
g.prototype.inspect = g.prototype.toSource = function() {
  return this.toString();
};
g.prototype[lr] = function() {
  return this;
};
function b(t, r2, e, n2) {
  var i2 = t === 0 ? r2 : t === 1 ? e : [r2, e];
  return n2 ? n2.value = i2 : n2 = { value: i2, done: false }, n2;
}
function U() {
  return { value: void 0, done: true };
}
function Ge(t) {
  return Array.isArray(t) ? true : !!dr(t);
}
function ye(t) {
  return t && typeof t.next == "function";
}
function Rr(t) {
  var r2 = dr(t);
  return r2 && r2.call(t);
}
function dr(t) {
  var r2 = t && (qr && t[qr] || t[Qe]);
  if (typeof r2 == "function")
    return r2;
}
function Zn(t) {
  var r2 = dr(t);
  return r2 && r2 === t.entries;
}
function Qn(t) {
  var r2 = dr(t);
  return r2 && r2 === t.keys;
}
var Nt = Object.prototype.hasOwnProperty;
function Ve(t) {
  return Array.isArray(t) || typeof t == "string" ? true : t && typeof t == "object" && Number.isInteger(t.length) && t.length >= 0 && (t.length === 0 ? Object.keys(t).length === 1 : t.hasOwnProperty(t.length - 1));
}
var K = function(t) {
  function r2(e) {
    return e == null ? Fr() : ot(e) ? e.toSeq() : Vn(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toSeq = function() {
    return this;
  }, r2.prototype.toString = function() {
    return this.__toString("Seq {", "}");
  }, r2.prototype.cacheResult = function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this._cache;
    if (o2) {
      for (var s2 = o2.length, u2 = 0; u2 !== s2; ) {
        var a2 = o2[i2 ? s2 - ++u2 : u2++];
        if (n2(a2[1], a2[0], this) === false)
          break;
      }
      return u2;
    }
    return this.__iterateUncached(n2, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this._cache;
    if (o2) {
      var s2 = o2.length, u2 = 0;
      return new g(function() {
        if (u2 === s2)
          return U();
        var a2 = o2[i2 ? s2 - ++u2 : u2++];
        return b(n2, a2[0], a2[1]);
      });
    }
    return this.__iteratorUncached(n2, i2);
  }, r2;
}(A);
var yt = function(t) {
  function r2(e) {
    return e == null ? Fr().toKeyedSeq() : F(e) ? z(e) ? e.toSeq() : e.fromEntrySeq() : $t(e) ? e.toSeq() : kr(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toKeyedSeq = function() {
    return this;
  }, r2;
}(K);
var G = function(t) {
  function r2(e) {
    return e == null ? Fr() : F(e) ? z(e) ? e.entrySeq() : e.toIndexedSeq() : $t(e) ? e.toSeq().entrySeq() : xe(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return r2(arguments);
  }, r2.prototype.toIndexedSeq = function() {
    return this;
  }, r2.prototype.toString = function() {
    return this.__toString("Seq [", "]");
  }, r2;
}(K);
var Ct = function(t) {
  function r2(e) {
    return (F(e) && !vr(e) ? e : G(e)).toSetSeq();
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return r2(arguments);
  }, r2.prototype.toSetSeq = function() {
    return this;
  }, r2;
}(K);
K.isSeq = Pr;
K.Keyed = yt;
K.Set = Ct;
K.Indexed = G;
K.prototype[Xe] = true;
var mt = function(t) {
  function r2(e) {
    this._array = e, this.size = e.length;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n2, i2) {
    return this.has(n2) ? this._array[lt(this, n2)] : i2;
  }, r2.prototype.__iterate = function(n2, i2) {
    for (var o2 = this._array, s2 = o2.length, u2 = 0; u2 !== s2; ) {
      var a2 = i2 ? s2 - ++u2 : u2++;
      if (n2(o2[a2], a2, this) === false)
        break;
    }
    return u2;
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this._array, s2 = o2.length, u2 = 0;
    return new g(function() {
      if (u2 === s2)
        return U();
      var a2 = i2 ? s2 - ++u2 : u2++;
      return b(n2, a2, o2[a2]);
    });
  }, r2;
}(G);
var Br = function(t) {
  function r2(e) {
    var n2 = Object.keys(e).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : []);
    this._object = e, this._keys = n2, this.size = n2.length;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n2, i2) {
    return i2 !== void 0 && !this.has(n2) ? i2 : this._object[n2];
  }, r2.prototype.has = function(n2) {
    return Nt.call(this._object, n2);
  }, r2.prototype.__iterate = function(n2, i2) {
    for (var o2 = this._object, s2 = this._keys, u2 = s2.length, a2 = 0; a2 !== u2; ) {
      var f2 = s2[i2 ? u2 - ++a2 : a2++];
      if (n2(o2[f2], f2, this) === false)
        break;
    }
    return a2;
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this._object, s2 = this._keys, u2 = s2.length, a2 = 0;
    return new g(function() {
      if (a2 === u2)
        return U();
      var f2 = s2[i2 ? u2 - ++a2 : a2++];
      return b(n2, f2, o2[f2]);
    });
  }, r2;
}(yt);
Br.prototype[Dt] = true;
var Gn = function(t) {
  function r2(e) {
    this._collection = e, this.size = e.length || e.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.__iterateUncached = function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterate(n2, i2);
    var o2 = this._collection, s2 = Rr(o2), u2 = 0;
    if (ye(s2))
      for (var a2; !(a2 = s2.next()).done && n2(a2.value, u2++, this) !== false; )
        ;
    return u2;
  }, r2.prototype.__iteratorUncached = function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterator(n2, i2);
    var o2 = this._collection, s2 = Rr(o2);
    if (!ye(s2))
      return new g(U);
    var u2 = 0;
    return new g(function() {
      var a2 = s2.next();
      return a2.done ? a2 : b(n2, u2++, a2.value);
    });
  }, r2;
}(G);
var ge;
function Fr() {
  return ge || (ge = new mt([]));
}
function kr(t) {
  var r2 = Wr(t);
  if (r2)
    return r2.fromEntrySeq();
  if (typeof t == "object")
    return new Br(t);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t);
}
function xe(t) {
  var r2 = Wr(t);
  if (r2)
    return r2;
  throw new TypeError("Expected Array or collection object of values: " + t);
}
function Vn(t) {
  var r2 = Wr(t);
  if (r2)
    return Zn(t) ? r2.fromEntrySeq() : Qn(t) ? r2.toSetSeq() : r2;
  if (typeof t == "object")
    return new Br(t);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t);
}
function Wr(t) {
  return Ve(t) ? new mt(t) : Ge(t) ? new Gn(t) : void 0;
}
var tn = "@@__IMMUTABLE_MAP__@@";
function Kr(t) {
  return Boolean(t && t[tn]);
}
function rn(t) {
  return Kr(t) && x(t);
}
function me(t) {
  return Boolean(t && typeof t.equals == "function" && typeof t.hashCode == "function");
}
function D(t, r2) {
  if (t === r2 || t !== t && r2 !== r2)
    return true;
  if (!t || !r2)
    return false;
  if (typeof t.valueOf == "function" && typeof r2.valueOf == "function") {
    if (t = t.valueOf(), r2 = r2.valueOf(), t === r2 || t !== t && r2 !== r2)
      return true;
    if (!t || !r2)
      return false;
  }
  return !!(me(t) && me(r2) && t.equals(r2));
}
var Bt = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function(r2, e) {
  r2 |= 0, e |= 0;
  var n2 = r2 & 65535, i2 = e & 65535;
  return n2 * i2 + ((r2 >>> 16) * i2 + n2 * (e >>> 16) << 16 >>> 0) | 0;
};
function yr(t) {
  return t >>> 1 & 1073741824 | t & 3221225471;
}
var xn = Object.prototype.valueOf;
function W(t) {
  if (t == null)
    return Se(t);
  if (typeof t.hashCode == "function")
    return yr(t.hashCode(t));
  var r2 = oi(t);
  if (r2 == null)
    return Se(r2);
  switch (typeof r2) {
    case "boolean":
      return r2 ? 1108378657 : 1108378656;
    case "number":
      return ti(r2);
    case "string":
      return r2.length > si ? ri(r2) : jr(r2);
    case "object":
    case "function":
      return ni(r2);
    case "symbol":
      return ei(r2);
    default:
      if (typeof r2.toString == "function")
        return jr(r2.toString());
      throw new Error("Value type " + typeof r2 + " cannot be hashed.");
  }
}
function Se(t) {
  return t === null ? 1108378658 : 1108378659;
}
function ti(t) {
  if (t !== t || t === 1 / 0)
    return 0;
  var r2 = t | 0;
  for (r2 !== t && (r2 ^= t * 4294967295); t > 4294967295; )
    t /= 4294967295, r2 ^= t;
  return yr(r2);
}
function ri(t) {
  var r2 = br[t];
  return r2 === void 0 && (r2 = jr(t), Ir === ui && (Ir = 0, br = {}), Ir++, br[t] = r2), r2;
}
function jr(t) {
  for (var r2 = 0, e = 0; e < t.length; e++)
    r2 = 31 * r2 + t.charCodeAt(e) | 0;
  return yr(r2);
}
function ei(t) {
  var r2 = Ie[t];
  return r2 !== void 0 || (r2 = en(), Ie[t] = r2), r2;
}
function ni(t) {
  var r2;
  if (Tr && (r2 = $r.get(t), r2 !== void 0) || (r2 = t[gt], r2 !== void 0) || !Oe && (r2 = t.propertyIsEnumerable && t.propertyIsEnumerable[gt], r2 !== void 0 || (r2 = ii(t), r2 !== void 0)))
    return r2;
  if (r2 = en(), Tr)
    $r.set(t, r2);
  else {
    if (we !== void 0 && we(t) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (Oe)
      Object.defineProperty(t, gt, { enumerable: false, configurable: false, writable: false, value: r2 });
    else if (t.propertyIsEnumerable !== void 0 && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable)
      t.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t.propertyIsEnumerable[gt] = r2;
    else if (t.nodeType !== void 0)
      t[gt] = r2;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return r2;
}
var we = Object.isExtensible;
var Oe = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function ii(t) {
  if (t && t.nodeType > 0)
    switch (t.nodeType) {
      case 1:
        return t.uniqueID;
      case 9:
        return t.documentElement && t.documentElement.uniqueID;
    }
}
function oi(t) {
  return t.valueOf !== xn && typeof t.valueOf == "function" ? t.valueOf(t) : t;
}
function en() {
  var t = ++Or;
  return Or & 1073741824 && (Or = 0), t;
}
var Tr = typeof WeakMap == "function";
var $r;
Tr && ($r = /* @__PURE__ */ new WeakMap());
var Ie = /* @__PURE__ */ Object.create(null);
var Or = 0;
var gt = "__immutablehash__";
typeof Symbol == "function" && (gt = Symbol(gt));
var si = 16;
var ui = 255;
var Ir = 0;
var br = {};
var gr = function(t) {
  function r2(e, n2) {
    this._iter = e, this._useKeys = n2, this.size = e.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n2, i2) {
    return this._iter.get(n2, i2);
  }, r2.prototype.has = function(n2) {
    return this._iter.has(n2);
  }, r2.prototype.valueSeq = function() {
    return this._iter.valueSeq();
  }, r2.prototype.reverse = function() {
    var n2 = this, i2 = Jr(this, true);
    return this._useKeys || (i2.valueSeq = function() {
      return n2._iter.toSeq().reverse();
    }), i2;
  }, r2.prototype.map = function(n2, i2) {
    var o2 = this, s2 = an(this, n2, i2);
    return this._useKeys || (s2.valueSeq = function() {
      return o2._iter.toSeq().map(n2, i2);
    }), s2;
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s2, u2) {
      return n2(s2, u2, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    return this._iter.__iterator(n2, i2);
  }, r2;
}(yt);
gr.prototype[Dt] = true;
var nn = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.includes = function(n2) {
    return this._iter.includes(n2);
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this, s2 = 0;
    return i2 && bt(this), this._iter.__iterate(function(u2) {
      return n2(u2, i2 ? o2.size - ++s2 : s2++, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this, s2 = this._iter.__iterator(tt, i2), u2 = 0;
    return i2 && bt(this), new g(function() {
      var a2 = s2.next();
      return a2.done ? a2 : b(n2, i2 ? o2.size - ++u2 : u2++, a2.value, a2);
    });
  }, r2;
}(G);
var on = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.has = function(n2) {
    return this._iter.includes(n2);
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s2) {
      return n2(s2, s2, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this._iter.__iterator(tt, i2);
    return new g(function() {
      var s2 = o2.next();
      return s2.done ? s2 : b(n2, s2.value, s2.value, s2);
    });
  }, r2;
}(Ct);
var sn = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.entrySeq = function() {
    return this._iter.toSeq();
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s2) {
      if (s2) {
        Ee(s2);
        var u2 = F(s2);
        return n2(u2 ? s2.get(1) : s2[1], u2 ? s2.get(0) : s2[0], o2);
      }
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this._iter.__iterator(tt, i2);
    return new g(function() {
      for (; ; ) {
        var s2 = o2.next();
        if (s2.done)
          return s2;
        var u2 = s2.value;
        if (u2) {
          Ee(u2);
          var a2 = F(u2);
          return b(n2, a2 ? u2.get(0) : u2[0], a2 ? u2.get(1) : u2[1], s2);
        }
      }
    });
  }, r2;
}(yt);
nn.prototype.cacheResult = gr.prototype.cacheResult = on.prototype.cacheResult = sn.prototype.cacheResult = Hr;
function un(t) {
  var r2 = st(t);
  return r2._iter = t, r2.size = t.size, r2.flip = function() {
    return t;
  }, r2.reverse = function() {
    var e = t.reverse.apply(this);
    return e.flip = function() {
      return t.reverse();
    }, e;
  }, r2.has = function(e) {
    return t.includes(e);
  }, r2.includes = function(e) {
    return t.has(e);
  }, r2.cacheResult = Hr, r2.__iterateUncached = function(e, n2) {
    var i2 = this;
    return t.__iterate(function(o2, s2) {
      return e(s2, o2, i2) !== false;
    }, n2);
  }, r2.__iteratorUncached = function(e, n2) {
    if (e === Z) {
      var i2 = t.__iterator(e, n2);
      return new g(function() {
        var o2 = i2.next();
        if (!o2.done) {
          var s2 = o2.value[0];
          o2.value[0] = o2.value[1], o2.value[1] = s2;
        }
        return o2;
      });
    }
    return t.__iterator(e === tt ? tr : tt, n2);
  }, r2;
}
function an(t, r2, e) {
  var n2 = st(t);
  return n2.size = t.size, n2.has = function(i2) {
    return t.has(i2);
  }, n2.get = function(i2, o2) {
    var s2 = t.get(i2, y);
    return s2 === y ? o2 : r2.call(e, s2, i2, t);
  }, n2.__iterateUncached = function(i2, o2) {
    var s2 = this;
    return t.__iterate(function(u2, a2, f2) {
      return i2(r2.call(e, u2, a2, f2), a2, s2) !== false;
    }, o2);
  }, n2.__iteratorUncached = function(i2, o2) {
    var s2 = t.__iterator(Z, o2);
    return new g(function() {
      var u2 = s2.next();
      if (u2.done)
        return u2;
      var a2 = u2.value, f2 = a2[0];
      return b(i2, f2, r2.call(e, a2[1], f2, t), u2);
    });
  }, n2;
}
function Jr(t, r2) {
  var e = this, n2 = st(t);
  return n2._iter = t, n2.size = t.size, n2.reverse = function() {
    return t;
  }, t.flip && (n2.flip = function() {
    var i2 = un(t);
    return i2.reverse = function() {
      return t.flip();
    }, i2;
  }), n2.get = function(i2, o2) {
    return t.get(r2 ? i2 : -1 - i2, o2);
  }, n2.has = function(i2) {
    return t.has(r2 ? i2 : -1 - i2);
  }, n2.includes = function(i2) {
    return t.includes(i2);
  }, n2.cacheResult = Hr, n2.__iterate = function(i2, o2) {
    var s2 = this, u2 = 0;
    return o2 && bt(t), t.__iterate(function(a2, f2) {
      return i2(a2, r2 ? f2 : o2 ? s2.size - ++u2 : u2++, s2);
    }, !o2);
  }, n2.__iterator = function(i2, o2) {
    var s2 = 0;
    o2 && bt(t);
    var u2 = t.__iterator(Z, !o2);
    return new g(function() {
      var a2 = u2.next();
      if (a2.done)
        return a2;
      var f2 = a2.value;
      return b(i2, r2 ? f2[0] : o2 ? e.size - ++s2 : s2++, f2[1], a2);
    });
  }, n2;
}
function fn(t, r2, e, n2) {
  var i2 = st(t);
  return n2 && (i2.has = function(o2) {
    var s2 = t.get(o2, y);
    return s2 !== y && !!r2.call(e, s2, o2, t);
  }, i2.get = function(o2, s2) {
    var u2 = t.get(o2, y);
    return u2 !== y && r2.call(e, u2, o2, t) ? u2 : s2;
  }), i2.__iterateUncached = function(o2, s2) {
    var u2 = this, a2 = 0;
    return t.__iterate(function(f2, h2, c) {
      if (r2.call(e, f2, h2, c))
        return a2++, o2(f2, n2 ? h2 : a2 - 1, u2);
    }, s2), a2;
  }, i2.__iteratorUncached = function(o2, s2) {
    var u2 = t.__iterator(Z, s2), a2 = 0;
    return new g(function() {
      for (; ; ) {
        var f2 = u2.next();
        if (f2.done)
          return f2;
        var h2 = f2.value, c = h2[0], p = h2[1];
        if (r2.call(e, p, c, t))
          return b(o2, n2 ? c : a2++, p, f2);
      }
    });
  }, i2;
}
function ai(t, r2, e) {
  var n2 = Ut().asMutable();
  return t.__iterate(function(i2, o2) {
    n2.update(r2.call(e, i2, o2, t), 0, function(s2) {
      return s2 + 1;
    });
  }), n2.asImmutable();
}
function fi(t, r2, e) {
  var n2 = z(t), i2 = (x(t) ? ct() : Ut()).asMutable();
  t.__iterate(function(s2, u2) {
    i2.update(r2.call(e, s2, u2, t), function(a2) {
      return a2 = a2 || [], a2.push(n2 ? [u2, s2] : s2), a2;
    });
  });
  var o2 = pn(t);
  return i2.map(function(s2) {
    return w(t, o2(s2));
  }).asImmutable();
}
function Yr(t, r2, e, n2) {
  var i2 = t.size;
  if (Vt(r2, e, i2))
    return t;
  var o2 = jt(r2, i2), s2 = xt(e, i2);
  if (o2 !== o2 || s2 !== s2)
    return Yr(t.toSeq().cacheResult(), r2, e, n2);
  var u2 = s2 - o2, a2;
  u2 === u2 && (a2 = u2 < 0 ? 0 : u2);
  var f2 = st(t);
  return f2.size = a2 === 0 ? a2 : t.size && a2 || void 0, !n2 && Pr(t) && a2 >= 0 && (f2.get = function(h2, c) {
    return h2 = lt(this, h2), h2 >= 0 && h2 < a2 ? t.get(h2 + o2, c) : c;
  }), f2.__iterateUncached = function(h2, c) {
    var p = this;
    if (a2 === 0)
      return 0;
    if (c)
      return this.cacheResult().__iterate(h2, c);
    var _ = 0, v2 = true, l2 = 0;
    return t.__iterate(function(m2, d) {
      if (!(v2 && (v2 = _++ < o2)))
        return l2++, h2(m2, n2 ? d : l2 - 1, p) !== false && l2 !== a2;
    }), l2;
  }, f2.__iteratorUncached = function(h2, c) {
    if (a2 !== 0 && c)
      return this.cacheResult().__iterator(h2, c);
    if (a2 === 0)
      return new g(U);
    var p = t.__iterator(h2, c), _ = 0, v2 = 0;
    return new g(function() {
      for (; _++ < o2; )
        p.next();
      if (++v2 > a2)
        return U();
      var l2 = p.next();
      return n2 || h2 === tt || l2.done ? l2 : h2 === tr ? b(h2, v2 - 1, void 0, l2) : b(h2, v2 - 1, l2.value[1], l2);
    });
  }, f2;
}
function hi(t, r2, e) {
  var n2 = st(t);
  return n2.__iterateUncached = function(i2, o2) {
    var s2 = this;
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var u2 = 0;
    return t.__iterate(function(a2, f2, h2) {
      return r2.call(e, a2, f2, h2) && ++u2 && i2(a2, f2, s2);
    }), u2;
  }, n2.__iteratorUncached = function(i2, o2) {
    var s2 = this;
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var u2 = t.__iterator(Z, o2), a2 = true;
    return new g(function() {
      if (!a2)
        return U();
      var f2 = u2.next();
      if (f2.done)
        return f2;
      var h2 = f2.value, c = h2[0], p = h2[1];
      return r2.call(e, p, c, s2) ? i2 === Z ? f2 : b(i2, c, p, f2) : (a2 = false, U());
    });
  }, n2;
}
function hn(t, r2, e, n2) {
  var i2 = st(t);
  return i2.__iterateUncached = function(o2, s2) {
    var u2 = this;
    if (s2)
      return this.cacheResult().__iterate(o2, s2);
    var a2 = true, f2 = 0;
    return t.__iterate(function(h2, c, p) {
      if (!(a2 && (a2 = r2.call(e, h2, c, p))))
        return f2++, o2(h2, n2 ? c : f2 - 1, u2);
    }), f2;
  }, i2.__iteratorUncached = function(o2, s2) {
    var u2 = this;
    if (s2)
      return this.cacheResult().__iterator(o2, s2);
    var a2 = t.__iterator(Z, s2), f2 = true, h2 = 0;
    return new g(function() {
      var c, p, _;
      do {
        if (c = a2.next(), c.done)
          return n2 || o2 === tt ? c : o2 === tr ? b(o2, h2++, void 0, c) : b(o2, h2++, c.value[1], c);
        var v2 = c.value;
        p = v2[0], _ = v2[1], f2 && (f2 = r2.call(e, _, p, u2));
      } while (f2);
      return o2 === Z ? c : b(o2, p, _, c);
    });
  }, i2;
}
function ci(t, r2) {
  var e = z(t), n2 = [t].concat(r2).map(function(s2) {
    return F(s2) ? e && (s2 = Q(s2)) : s2 = e ? kr(s2) : xe(Array.isArray(s2) ? s2 : [s2]), s2;
  }).filter(function(s2) {
    return s2.size !== 0;
  });
  if (n2.length === 0)
    return t;
  if (n2.length === 1) {
    var i2 = n2[0];
    if (i2 === t || e && z(i2) || B2(t) && B2(i2))
      return i2;
  }
  var o2 = new mt(n2);
  return e ? o2 = o2.toKeyedSeq() : B2(t) || (o2 = o2.toSetSeq()), o2 = o2.flatten(true), o2.size = n2.reduce(function(s2, u2) {
    if (s2 !== void 0) {
      var a2 = u2.size;
      if (a2 !== void 0)
        return s2 + a2;
    }
  }, 0), o2;
}
function cn(t, r2, e) {
  var n2 = st(t);
  return n2.__iterateUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var s2 = 0, u2 = false;
    function a2(f2, h2) {
      f2.__iterate(function(c, p) {
        return (!r2 || h2 < r2) && F(c) ? a2(c, h2 + 1) : (s2++, i2(c, e ? p : s2 - 1, n2) === false && (u2 = true)), !u2;
      }, o2);
    }
    return a2(t, 0), s2;
  }, n2.__iteratorUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var s2 = t.__iterator(i2, o2), u2 = [], a2 = 0;
    return new g(function() {
      for (; s2; ) {
        var f2 = s2.next();
        if (f2.done !== false) {
          s2 = u2.pop();
          continue;
        }
        var h2 = f2.value;
        if (i2 === Z && (h2 = h2[1]), (!r2 || u2.length < r2) && F(h2))
          u2.push(s2), s2 = h2.__iterator(i2, o2);
        else
          return e ? f2 : b(i2, a2++, h2, f2);
      }
      return U();
    });
  }, n2;
}
function pi(t, r2, e) {
  var n2 = pn(t);
  return t.toSeq().map(function(i2, o2) {
    return n2(r2.call(e, i2, o2, t));
  }).flatten(true);
}
function _i(t, r2) {
  var e = st(t);
  return e.size = t.size && t.size * 2 - 1, e.__iterateUncached = function(n2, i2) {
    var o2 = this, s2 = 0;
    return t.__iterate(function(u2) {
      return (!s2 || n2(r2, s2++, o2) !== false) && n2(u2, s2++, o2) !== false;
    }, i2), s2;
  }, e.__iteratorUncached = function(n2, i2) {
    var o2 = t.__iterator(tt, i2), s2 = 0, u2;
    return new g(function() {
      return (!u2 || s2 % 2) && (u2 = o2.next(), u2.done) ? u2 : s2 % 2 ? b(n2, s2++, r2) : b(n2, s2++, u2.value, u2);
    });
  }, e;
}
function Et(t, r2, e) {
  r2 || (r2 = _n);
  var n2 = z(t), i2 = 0, o2 = t.toSeq().map(function(s2, u2) {
    return [u2, s2, i2++, e ? e(s2, u2, t) : s2];
  }).valueSeq().toArray();
  return o2.sort(function(s2, u2) {
    return r2(s2[3], u2[3]) || s2[2] - u2[2];
  }).forEach(n2 ? function(s2, u2) {
    o2[u2].length = 2;
  } : function(s2, u2) {
    o2[u2] = s2[1];
  }), n2 ? yt(o2) : B2(t) ? G(o2) : Ct(o2);
}
function sr(t, r2, e) {
  if (r2 || (r2 = _n), e) {
    var n2 = t.toSeq().map(function(i2, o2) {
      return [i2, e(i2, o2, t)];
    }).reduce(function(i2, o2) {
      return be(r2, i2[1], o2[1]) ? o2 : i2;
    });
    return n2 && n2[0];
  }
  return t.reduce(function(i2, o2) {
    return be(r2, i2, o2) ? o2 : i2;
  });
}
function be(t, r2, e) {
  var n2 = t(e, r2);
  return n2 === 0 && e !== r2 && (e == null || e !== e) || n2 > 0;
}
function ur(t, r2, e, n2) {
  var i2 = st(t), o2 = new mt(e).map(function(s2) {
    return s2.size;
  });
  return i2.size = n2 ? o2.max() : o2.min(), i2.__iterate = function(s2, u2) {
    for (var a2 = this.__iterator(tt, u2), f2, h2 = 0; !(f2 = a2.next()).done && s2(f2.value, h2++, this) !== false; )
      ;
    return h2;
  }, i2.__iteratorUncached = function(s2, u2) {
    var a2 = e.map(function(c) {
      return c = A(c), Rr(u2 ? c.reverse() : c);
    }), f2 = 0, h2 = false;
    return new g(function() {
      var c;
      return h2 || (c = a2.map(function(p) {
        return p.next();
      }), h2 = n2 ? c.every(function(p) {
        return p.done;
      }) : c.some(function(p) {
        return p.done;
      })), h2 ? U() : b(s2, f2++, r2.apply(null, c.map(function(p) {
        return p.value;
      })));
    });
  }, i2;
}
function w(t, r2) {
  return t === r2 ? t : Pr(t) ? r2 : t.constructor(r2);
}
function Ee(t) {
  if (t !== Object(t))
    throw new TypeError("Expected [K, V] tuple: " + t);
}
function pn(t) {
  return z(t) ? Q : B2(t) ? St : Tt;
}
function st(t) {
  return Object.create((z(t) ? yt : B2(t) ? G : Ct).prototype);
}
function Hr() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : K.prototype.cacheResult.call(this);
}
function _n(t, r2) {
  return t === void 0 && r2 === void 0 ? 0 : t === void 0 ? 1 : r2 === void 0 ? -1 : t > r2 ? 1 : t < r2 ? -1 : 0;
}
function it(t, r2) {
  r2 = r2 || 0;
  for (var e = Math.max(0, t.length - r2), n2 = new Array(e), i2 = 0; i2 < e; i2++)
    n2[i2] = t[i2 + r2];
  return n2;
}
function Xr(t, r2) {
  if (!t)
    throw new Error(r2);
}
function X(t) {
  Xr(t !== 1 / 0, "Cannot perform this action with an infinite size.");
}
function vn(t) {
  if (Ve(t) && typeof t != "string")
    return t;
  if (x(t))
    return t.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t);
}
var vi = Object.prototype.toString;
function li(t) {
  if (!t || typeof t != "object" || vi.call(t) !== "[object Object]")
    return false;
  var r2 = Object.getPrototypeOf(t);
  if (r2 === null)
    return true;
  for (var e = r2, n2 = Object.getPrototypeOf(r2); n2 !== null; )
    e = n2, n2 = Object.getPrototypeOf(e);
  return e === r2;
}
function dt(t) {
  return typeof t == "object" && (ot(t) || Array.isArray(t) || li(t));
}
function Jt(t) {
  try {
    return typeof t == "string" ? JSON.stringify(t) : String(t);
  } catch {
    return JSON.stringify(t);
  }
}
function di(t, r2) {
  return ot(t) ? t.has(r2) : dt(t) && Nt.call(t, r2);
}
function ln(t, r2, e) {
  return ot(t) ? t.get(r2, e) : di(t, r2) ? typeof t.get == "function" ? t.get(r2) : t[r2] : e;
}
function pr(t) {
  if (Array.isArray(t))
    return it(t);
  var r2 = {};
  for (var e in t)
    Nt.call(t, e) && (r2[e] = t[e]);
  return r2;
}
function yi(t, r2) {
  if (!dt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (ot(t)) {
    if (!t.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t);
    return t.remove(r2);
  }
  if (!Nt.call(t, r2))
    return t;
  var e = pr(t);
  return Array.isArray(e) ? e.splice(r2, 1) : delete e[r2], e;
}
function gi(t, r2, e) {
  if (!dt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (ot(t)) {
    if (!t.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t);
    return t.set(r2, e);
  }
  if (Nt.call(t, r2) && e === t[r2])
    return t;
  var n2 = pr(t);
  return n2[r2] = e, n2;
}
function Lt(t, r2, e, n2) {
  n2 || (n2 = e, e = void 0);
  var i2 = dn(ot(t), t, vn(r2), 0, e, n2);
  return i2 === y ? e : i2;
}
function dn(t, r2, e, n2, i2, o2) {
  var s2 = r2 === y;
  if (n2 === e.length) {
    var u2 = s2 ? i2 : r2, a2 = o2(u2);
    return a2 === u2 ? r2 : a2;
  }
  if (!s2 && !dt(r2))
    throw new TypeError("Cannot update within non-data-structure value in path [" + e.slice(0, n2).map(Jt) + "]: " + r2);
  var f2 = e[n2], h2 = s2 ? y : ln(r2, f2, y), c = dn(h2 === y ? t : ot(h2), h2, e, n2 + 1, i2, o2);
  return c === h2 ? r2 : c === y ? yi(r2, f2) : gi(s2 ? t ? V() : {} : r2, f2, c);
}
function mi(t, r2, e) {
  return Lt(t, r2, y, function() {
    return e;
  });
}
function Zr(t, r2) {
  return mi(this, t, r2);
}
function Si(t, r2) {
  return Lt(t, r2, function() {
    return y;
  });
}
function Qr(t) {
  return Si(this, t);
}
function yn(t, r2, e, n2) {
  return Lt(t, [r2], e, n2);
}
function Gr(t, r2, e) {
  return arguments.length === 1 ? t(this) : yn(this, t, r2, e);
}
function Vr(t, r2, e) {
  return Lt(this, t, r2, e);
}
function gn() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return Sn(this, t);
}
function mn(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  if (typeof t != "function")
    throw new TypeError("Invalid merger function: " + t);
  return Sn(this, r2, t);
}
function Sn(t, r2, e) {
  for (var n2 = [], i2 = 0; i2 < r2.length; i2++) {
    var o2 = Q(r2[i2]);
    o2.size !== 0 && n2.push(o2);
  }
  return n2.length === 0 ? t : t.toSeq().size === 0 && !t.__ownerID && n2.length === 1 ? t.constructor(n2[0]) : t.withMutations(function(s2) {
    for (var u2 = e ? function(f2, h2) {
      yn(s2, h2, y, function(c) {
        return c === y ? f2 : e(c, f2, h2);
      });
    } : function(f2, h2) {
      s2.set(h2, f2);
    }, a2 = 0; a2 < n2.length; a2++)
      n2[a2].forEach(u2);
  });
}
function xr(t, r2, e) {
  return te(t, r2, wi(e));
}
function te(t, r2, e) {
  if (!dt(t))
    throw new TypeError("Cannot merge into non-data-structure value: " + t);
  if (ot(t))
    return typeof e == "function" && t.mergeWith ? t.mergeWith.apply(t, [e].concat(r2)) : t.merge ? t.merge.apply(t, r2) : t.concat.apply(t, r2);
  for (var n2 = Array.isArray(t), i2 = t, o2 = n2 ? St : Q, s2 = n2 ? function(a2) {
    i2 === t && (i2 = pr(i2)), i2.push(a2);
  } : function(a2, f2) {
    var h2 = Nt.call(i2, f2), c = h2 && e ? e(i2[f2], a2, f2) : a2;
    (!h2 || c !== i2[f2]) && (i2 === t && (i2 = pr(i2)), i2[f2] = c);
  }, u2 = 0; u2 < r2.length; u2++)
    o2(r2[u2]).forEach(s2);
  return i2;
}
function wi(t) {
  function r2(e, n2, i2) {
    return dt(e) && dt(n2) && Oi(e, n2) ? te(e, [n2], r2) : t ? t(e, n2, i2) : n2;
  }
  return r2;
}
function Oi(t, r2) {
  var e = K(t), n2 = K(r2);
  return B2(e) === B2(n2) && z(e) === z(n2);
}
function wn() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return xr(this, t);
}
function On(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return xr(this, r2, t);
}
function re(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return Lt(this, t, V(), function(n2) {
    return te(n2, r2);
  });
}
function ee(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return Lt(this, t, V(), function(n2) {
    return xr(n2, r2);
  });
}
function rr(t) {
  var r2 = this.asMutable();
  return t(r2), r2.wasAltered() ? r2.__ensureOwner(this.__ownerID) : this;
}
function er() {
  return this.__ownerID ? this : this.__ensureOwner(new Ur());
}
function nr() {
  return this.__ensureOwner();
}
function ne() {
  return this.__altered;
}
var Ut = function(t) {
  function r2(e) {
    return e == null ? V() : Kr(e) && !x(e) ? e : V().withMutations(function(n2) {
      var i2 = t(e);
      X(i2.size), i2.forEach(function(o2, s2) {
        return n2.set(s2, o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    return V().withMutations(function(o2) {
      for (var s2 = 0; s2 < n2.length; s2 += 2) {
        if (s2 + 1 >= n2.length)
          throw new Error("Missing value for key: " + n2[s2]);
        o2.set(n2[s2], n2[s2 + 1]);
      }
    });
  }, r2.prototype.toString = function() {
    return this.__toString("Map {", "}");
  }, r2.prototype.get = function(n2, i2) {
    return this._root ? this._root.get(0, void 0, n2, i2) : i2;
  }, r2.prototype.set = function(n2, i2) {
    return Ae(this, n2, i2);
  }, r2.prototype.remove = function(n2) {
    return Ae(this, n2, y);
  }, r2.prototype.deleteAll = function(n2) {
    var i2 = A(n2);
    return i2.size === 0 ? this : this.withMutations(function(o2) {
      i2.forEach(function(s2) {
        return o2.remove(s2);
      });
    });
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : V();
  }, r2.prototype.sort = function(n2) {
    return ct(Et(this, n2));
  }, r2.prototype.sortBy = function(n2, i2) {
    return ct(Et(this, i2, n2));
  }, r2.prototype.map = function(n2, i2) {
    var o2 = this;
    return this.withMutations(function(s2) {
      s2.forEach(function(u2, a2) {
        s2.set(a2, n2.call(i2, u2, a2, o2));
      });
    });
  }, r2.prototype.__iterator = function(n2, i2) {
    return new Ii(this, n2, i2);
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this, s2 = 0;
    return this._root && this._root.iterate(function(u2) {
      return s2++, n2(u2[1], u2[0], o2);
    }, i2), s2;
  }, r2.prototype.__ensureOwner = function(n2) {
    return n2 === this.__ownerID ? this : n2 ? ie(this.size, this._root, n2, this.__hash) : this.size === 0 ? V() : (this.__ownerID = n2, this.__altered = false, this);
  }, r2;
}(Q);
Ut.isMap = Kr;
var E = Ut.prototype;
E[tn] = true;
E[Gt] = E.remove;
E.removeAll = E.deleteAll;
E.setIn = Zr;
E.removeIn = E.deleteIn = Qr;
E.update = Gr;
E.updateIn = Vr;
E.merge = E.concat = gn;
E.mergeWith = mn;
E.mergeDeep = wn;
E.mergeDeepWith = On;
E.mergeIn = re;
E.mergeDeepIn = ee;
E.withMutations = rr;
E.wasAltered = ne;
E.asImmutable = nr;
E["@@transducer/init"] = E.asMutable = er;
E["@@transducer/step"] = function(t, r2) {
  return t.set(r2[0], r2[1]);
};
E["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var Yt = function(r2, e) {
  this.ownerID = r2, this.entries = e;
};
Yt.prototype.get = function(r2, e, n2, i2) {
  for (var o2 = this.entries, s2 = 0, u2 = o2.length; s2 < u2; s2++)
    if (D(n2, o2[s2][0]))
      return o2[s2][1];
  return i2;
};
Yt.prototype.update = function(r2, e, n2, i2, o2, s2, u2) {
  for (var a2 = o2 === y, f2 = this.entries, h2 = 0, c = f2.length; h2 < c && !D(i2, f2[h2][0]); h2++)
    ;
  var p = h2 < c;
  if (p ? f2[h2][1] === o2 : a2)
    return this;
  if (H(u2), (a2 || !p) && H(s2), !(a2 && f2.length === 1)) {
    if (!p && !a2 && f2.length >= qi)
      return bi(r2, f2, i2, o2);
    var _ = r2 && r2 === this.ownerID, v2 = _ ? f2 : it(f2);
    return p ? a2 ? h2 === c - 1 ? v2.pop() : v2[h2] = v2.pop() : v2[h2] = [i2, o2] : v2.push([i2, o2]), _ ? (this.entries = v2, this) : new Yt(r2, v2);
  }
};
var zt = function(r2, e, n2) {
  this.ownerID = r2, this.bitmap = e, this.nodes = n2;
};
zt.prototype.get = function(r2, e, n2, i2) {
  e === void 0 && (e = W(n2));
  var o2 = 1 << ((r2 === 0 ? e : e >>> r2) & L), s2 = this.bitmap;
  return (s2 & o2) === 0 ? i2 : this.nodes[In(s2 & o2 - 1)].get(r2 + I, e, n2, i2);
};
zt.prototype.update = function(r2, e, n2, i2, o2, s2, u2) {
  n2 === void 0 && (n2 = W(i2));
  var a2 = (e === 0 ? n2 : n2 >>> e) & L, f2 = 1 << a2, h2 = this.bitmap, c = (h2 & f2) !== 0;
  if (!c && o2 === y)
    return this;
  var p = In(h2 & f2 - 1), _ = this.nodes, v2 = c ? _[p] : void 0, l2 = oe(v2, r2, e + I, n2, i2, o2, s2, u2);
  if (l2 === v2)
    return this;
  if (!c && l2 && _.length >= Ri)
    return zi(r2, _, h2, a2, l2);
  if (c && !l2 && _.length === 2 && qe(_[p ^ 1]))
    return _[p ^ 1];
  if (c && l2 && _.length === 1 && qe(l2))
    return l2;
  var m2 = r2 && r2 === this.ownerID, d = c ? l2 ? h2 : h2 ^ f2 : h2 | f2, S = c ? l2 ? bn(_, p, l2, m2) : Ai(_, p, m2) : Mi(_, p, l2, m2);
  return m2 ? (this.bitmap = d, this.nodes = S, this) : new zt(r2, d, S);
};
var Ht = function(r2, e, n2) {
  this.ownerID = r2, this.count = e, this.nodes = n2;
};
Ht.prototype.get = function(r2, e, n2, i2) {
  e === void 0 && (e = W(n2));
  var o2 = (r2 === 0 ? e : e >>> r2) & L, s2 = this.nodes[o2];
  return s2 ? s2.get(r2 + I, e, n2, i2) : i2;
};
Ht.prototype.update = function(r2, e, n2, i2, o2, s2, u2) {
  n2 === void 0 && (n2 = W(i2));
  var a2 = (e === 0 ? n2 : n2 >>> e) & L, f2 = o2 === y, h2 = this.nodes, c = h2[a2];
  if (f2 && !c)
    return this;
  var p = oe(c, r2, e + I, n2, i2, o2, s2, u2);
  if (p === c)
    return this;
  var _ = this.count;
  if (!c)
    _++;
  else if (!p && (_--, _ < ji))
    return Ei(r2, h2, _, a2);
  var v2 = r2 && r2 === this.ownerID, l2 = bn(h2, a2, p, v2);
  return v2 ? (this.count = _, this.nodes = l2, this) : new Ht(r2, _, l2);
};
var Mt = function(r2, e, n2) {
  this.ownerID = r2, this.keyHash = e, this.entries = n2;
};
Mt.prototype.get = function(r2, e, n2, i2) {
  for (var o2 = this.entries, s2 = 0, u2 = o2.length; s2 < u2; s2++)
    if (D(n2, o2[s2][0]))
      return o2[s2][1];
  return i2;
};
Mt.prototype.update = function(r2, e, n2, i2, o2, s2, u2) {
  n2 === void 0 && (n2 = W(i2));
  var a2 = o2 === y;
  if (n2 !== this.keyHash)
    return a2 ? this : (H(u2), H(s2), se(this, r2, e, n2, [i2, o2]));
  for (var f2 = this.entries, h2 = 0, c = f2.length; h2 < c && !D(i2, f2[h2][0]); h2++)
    ;
  var p = h2 < c;
  if (p ? f2[h2][1] === o2 : a2)
    return this;
  if (H(u2), (a2 || !p) && H(s2), a2 && c === 2)
    return new ht(r2, this.keyHash, f2[h2 ^ 1]);
  var _ = r2 && r2 === this.ownerID, v2 = _ ? f2 : it(f2);
  return p ? a2 ? h2 === c - 1 ? v2.pop() : v2[h2] = v2.pop() : v2[h2] = [i2, o2] : v2.push([i2, o2]), _ ? (this.entries = v2, this) : new Mt(r2, this.keyHash, v2);
};
var ht = function(r2, e, n2) {
  this.ownerID = r2, this.keyHash = e, this.entry = n2;
};
ht.prototype.get = function(r2, e, n2, i2) {
  return D(n2, this.entry[0]) ? this.entry[1] : i2;
};
ht.prototype.update = function(r2, e, n2, i2, o2, s2, u2) {
  var a2 = o2 === y, f2 = D(i2, this.entry[0]);
  if (f2 ? o2 === this.entry[1] : a2)
    return this;
  if (H(u2), a2) {
    H(s2);
    return;
  }
  return f2 ? r2 && r2 === this.ownerID ? (this.entry[1] = o2, this) : new ht(r2, this.keyHash, [i2, o2]) : (H(s2), se(this, r2, e, W(i2), [i2, o2]));
};
Yt.prototype.iterate = Mt.prototype.iterate = function(t, r2) {
  for (var e = this.entries, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++)
    if (t(e[r2 ? i2 - n2 : n2]) === false)
      return false;
};
zt.prototype.iterate = Ht.prototype.iterate = function(t, r2) {
  for (var e = this.nodes, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++) {
    var o2 = e[r2 ? i2 - n2 : n2];
    if (o2 && o2.iterate(t, r2) === false)
      return false;
  }
};
ht.prototype.iterate = function(t, r2) {
  return t(this.entry);
};
var Ii = function(t) {
  function r2(e, n2, i2) {
    this._type = n2, this._reverse = i2, this._stack = e._root && ze(e._root);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.next = function() {
    for (var n2 = this._type, i2 = this._stack; i2; ) {
      var o2 = i2.node, s2 = i2.index++, u2 = void 0;
      if (o2.entry) {
        if (s2 === 0)
          return Er(n2, o2.entry);
      } else if (o2.entries) {
        if (u2 = o2.entries.length - 1, s2 <= u2)
          return Er(n2, o2.entries[this._reverse ? u2 - s2 : s2]);
      } else if (u2 = o2.nodes.length - 1, s2 <= u2) {
        var a2 = o2.nodes[this._reverse ? u2 - s2 : s2];
        if (a2) {
          if (a2.entry)
            return Er(n2, a2.entry);
          i2 = this._stack = ze(a2, i2);
        }
        continue;
      }
      i2 = this._stack = this._stack.__prev;
    }
    return U();
  }, r2;
}(g);
function Er(t, r2) {
  return b(t, r2[0], r2[1]);
}
function ze(t, r2) {
  return { node: t, index: 0, __prev: r2 };
}
function ie(t, r2, e, n2) {
  var i2 = Object.create(E);
  return i2.size = t, i2._root = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
var Me;
function V() {
  return Me || (Me = ie(0));
}
function Ae(t, r2, e) {
  var n2, i2;
  if (t._root) {
    var o2 = Ar(), s2 = Ar();
    if (n2 = oe(t._root, t.__ownerID, 0, void 0, r2, e, o2, s2), !s2.value)
      return t;
    i2 = t.size + (o2.value ? e === y ? -1 : 1 : 0);
  } else {
    if (e === y)
      return t;
    i2 = 1, n2 = new Yt(t.__ownerID, [[r2, e]]);
  }
  return t.__ownerID ? (t.size = i2, t._root = n2, t.__hash = void 0, t.__altered = true, t) : n2 ? ie(i2, n2) : V();
}
function oe(t, r2, e, n2, i2, o2, s2, u2) {
  return t ? t.update(r2, e, n2, i2, o2, s2, u2) : o2 === y ? t : (H(u2), H(s2), new ht(r2, n2, [i2, o2]));
}
function qe(t) {
  return t.constructor === ht || t.constructor === Mt;
}
function se(t, r2, e, n2, i2) {
  if (t.keyHash === n2)
    return new Mt(r2, n2, [t.entry, i2]);
  var o2 = (e === 0 ? t.keyHash : t.keyHash >>> e) & L, s2 = (e === 0 ? n2 : n2 >>> e) & L, u2, a2 = o2 === s2 ? [se(t, r2, e + I, n2, i2)] : (u2 = new ht(r2, n2, i2), o2 < s2 ? [t, u2] : [u2, t]);
  return new zt(r2, 1 << o2 | 1 << s2, a2);
}
function bi(t, r2, e, n2) {
  t || (t = new Ur());
  for (var i2 = new ht(t, W(e), [e, n2]), o2 = 0; o2 < r2.length; o2++) {
    var s2 = r2[o2];
    i2 = i2.update(t, 0, void 0, s2[0], s2[1]);
  }
  return i2;
}
function Ei(t, r2, e, n2) {
  for (var i2 = 0, o2 = 0, s2 = new Array(e), u2 = 0, a2 = 1, f2 = r2.length; u2 < f2; u2++, a2 <<= 1) {
    var h2 = r2[u2];
    h2 !== void 0 && u2 !== n2 && (i2 |= a2, s2[o2++] = h2);
  }
  return new zt(t, i2, s2);
}
function zi(t, r2, e, n2, i2) {
  for (var o2 = 0, s2 = new Array(Y), u2 = 0; e !== 0; u2++, e >>>= 1)
    s2[u2] = e & 1 ? r2[o2++] : void 0;
  return s2[n2] = i2, new Ht(t, o2 + 1, s2);
}
function In(t) {
  return t -= t >> 1 & 1431655765, t = (t & 858993459) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, t & 127;
}
function bn(t, r2, e, n2) {
  var i2 = n2 ? t : it(t);
  return i2[r2] = e, i2;
}
function Mi(t, r2, e, n2) {
  var i2 = t.length + 1;
  if (n2 && r2 + 1 === i2)
    return t[r2] = e, t;
  for (var o2 = new Array(i2), s2 = 0, u2 = 0; u2 < i2; u2++)
    u2 === r2 ? (o2[u2] = e, s2 = -1) : o2[u2] = t[u2 + s2];
  return o2;
}
function Ai(t, r2, e) {
  var n2 = t.length - 1;
  if (e && r2 === n2)
    return t.pop(), t;
  for (var i2 = new Array(n2), o2 = 0, s2 = 0; s2 < n2; s2++)
    s2 === r2 && (o2 = 1), i2[s2] = t[s2 + o2];
  return i2;
}
var qi = Y / 4;
var Ri = Y / 2;
var ji = Y / 4;
var En = "@@__IMMUTABLE_LIST__@@";
function zn(t) {
  return Boolean(t && t[En]);
}
var mr = function(t) {
  function r2(e) {
    var n2 = cr();
    if (e == null)
      return n2;
    if (zn(e))
      return e;
    var i2 = t(e), o2 = i2.size;
    return o2 === 0 ? n2 : (X(o2), o2 > 0 && o2 < Y ? Xt(0, o2, I, null, new vt(i2.toArray())) : n2.withMutations(function(s2) {
      s2.setSize(o2), i2.forEach(function(u2, a2) {
        return s2.set(a2, u2);
      });
    }));
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("List [", "]");
  }, r2.prototype.get = function(n2, i2) {
    if (n2 = lt(this, n2), n2 >= 0 && n2 < this.size) {
      n2 += this._origin;
      var o2 = Mn(this, n2);
      return o2 && o2.array[n2 & L];
    }
    return i2;
  }, r2.prototype.set = function(n2, i2) {
    return Ti(this, n2, i2);
  }, r2.prototype.remove = function(n2) {
    return this.has(n2) ? n2 === 0 ? this.shift() : n2 === this.size - 1 ? this.pop() : this.splice(n2, 1) : this;
  }, r2.prototype.insert = function(n2, i2) {
    return this.splice(n2, 0, i2);
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = I, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : cr();
  }, r2.prototype.push = function() {
    var n2 = arguments, i2 = this.size;
    return this.withMutations(function(o2) {
      _t(o2, 0, i2 + n2.length);
      for (var s2 = 0; s2 < n2.length; s2++)
        o2.set(i2 + s2, n2[s2]);
    });
  }, r2.prototype.pop = function() {
    return _t(this, 0, -1);
  }, r2.prototype.unshift = function() {
    var n2 = arguments;
    return this.withMutations(function(i2) {
      _t(i2, -n2.length);
      for (var o2 = 0; o2 < n2.length; o2++)
        i2.set(o2, n2[o2]);
    });
  }, r2.prototype.shift = function() {
    return _t(this, 1);
  }, r2.prototype.concat = function() {
    for (var n2 = arguments, i2 = [], o2 = 0; o2 < arguments.length; o2++) {
      var s2 = n2[o2], u2 = t(typeof s2 != "string" && Ge(s2) ? s2 : [s2]);
      u2.size !== 0 && i2.push(u2);
    }
    return i2.length === 0 ? this : this.size === 0 && !this.__ownerID && i2.length === 1 ? this.constructor(i2[0]) : this.withMutations(function(a2) {
      i2.forEach(function(f2) {
        return f2.forEach(function(h2) {
          return a2.push(h2);
        });
      });
    });
  }, r2.prototype.setSize = function(n2) {
    return _t(this, 0, n2);
  }, r2.prototype.map = function(n2, i2) {
    var o2 = this;
    return this.withMutations(function(s2) {
      for (var u2 = 0; u2 < o2.size; u2++)
        s2.set(u2, n2.call(i2, s2.get(u2), u2, o2));
    });
  }, r2.prototype.slice = function(n2, i2) {
    var o2 = this.size;
    return Vt(n2, i2, o2) ? this : _t(this, jt(n2, o2), xt(i2, o2));
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = i2 ? this.size : 0, s2 = Re(this, i2);
    return new g(function() {
      var u2 = s2();
      return u2 === Kt ? U() : b(n2, i2 ? --o2 : o2++, u2);
    });
  }, r2.prototype.__iterate = function(n2, i2) {
    for (var o2 = i2 ? this.size : 0, s2 = Re(this, i2), u2; (u2 = s2()) !== Kt && n2(u2, i2 ? --o2 : o2++, this) !== false; )
      ;
    return o2;
  }, r2.prototype.__ensureOwner = function(n2) {
    return n2 === this.__ownerID ? this : n2 ? Xt(this._origin, this._capacity, this._level, this._root, this._tail, n2, this.__hash) : this.size === 0 ? cr() : (this.__ownerID = n2, this.__altered = false, this);
  }, r2;
}(St);
mr.isList = zn;
var $ = mr.prototype;
$[En] = true;
$[Gt] = $.remove;
$.merge = $.concat;
$.setIn = Zr;
$.deleteIn = $.removeIn = Qr;
$.update = Gr;
$.updateIn = Vr;
$.mergeIn = re;
$.mergeDeepIn = ee;
$.withMutations = rr;
$.wasAltered = ne;
$.asImmutable = nr;
$["@@transducer/init"] = $.asMutable = er;
$["@@transducer/step"] = function(t, r2) {
  return t.push(r2);
};
$["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var vt = function(r2, e) {
  this.array = r2, this.ownerID = e;
};
vt.prototype.removeBefore = function(r2, e, n2) {
  if (n2 === e ? 1 << e : this.array.length === 0)
    return this;
  var i2 = n2 >>> e & L;
  if (i2 >= this.array.length)
    return new vt([], r2);
  var o2 = i2 === 0, s2;
  if (e > 0) {
    var u2 = this.array[i2];
    if (s2 = u2 && u2.removeBefore(r2, e - I, n2), s2 === u2 && o2)
      return this;
  }
  if (o2 && !s2)
    return this;
  var a2 = At(this, r2);
  if (!o2)
    for (var f2 = 0; f2 < i2; f2++)
      a2.array[f2] = void 0;
  return s2 && (a2.array[i2] = s2), a2;
};
vt.prototype.removeAfter = function(r2, e, n2) {
  if (n2 === (e ? 1 << e : 0) || this.array.length === 0)
    return this;
  var i2 = n2 - 1 >>> e & L;
  if (i2 >= this.array.length)
    return this;
  var o2;
  if (e > 0) {
    var s2 = this.array[i2];
    if (o2 = s2 && s2.removeAfter(r2, e - I, n2), o2 === s2 && i2 === this.array.length - 1)
      return this;
  }
  var u2 = At(this, r2);
  return u2.array.splice(i2 + 1), o2 && (u2.array[i2] = o2), u2;
};
var Kt = {};
function Re(t, r2) {
  var e = t._origin, n2 = t._capacity, i2 = Zt(n2), o2 = t._tail;
  return s2(t._root, t._level, 0);
  function s2(f2, h2, c) {
    return h2 === 0 ? u2(f2, c) : a2(f2, h2, c);
  }
  function u2(f2, h2) {
    var c = h2 === i2 ? o2 && o2.array : f2 && f2.array, p = h2 > e ? 0 : e - h2, _ = n2 - h2;
    return _ > Y && (_ = Y), function() {
      if (p === _)
        return Kt;
      var v2 = r2 ? --_ : p++;
      return c && c[v2];
    };
  }
  function a2(f2, h2, c) {
    var p, _ = f2 && f2.array, v2 = c > e ? 0 : e - c >> h2, l2 = (n2 - c >> h2) + 1;
    return l2 > Y && (l2 = Y), function() {
      for (; ; ) {
        if (p) {
          var m2 = p();
          if (m2 !== Kt)
            return m2;
          p = null;
        }
        if (v2 === l2)
          return Kt;
        var d = r2 ? --l2 : v2++;
        p = s2(_ && _[d], h2 - I, c + (d << h2));
      }
    };
  }
}
function Xt(t, r2, e, n2, i2, o2, s2) {
  var u2 = Object.create($);
  return u2.size = r2 - t, u2._origin = t, u2._capacity = r2, u2._level = e, u2._root = n2, u2._tail = i2, u2.__ownerID = o2, u2.__hash = s2, u2.__altered = false, u2;
}
var je;
function cr() {
  return je || (je = Xt(0, 0, I));
}
function Ti(t, r2, e) {
  if (r2 = lt(t, r2), r2 !== r2)
    return t;
  if (r2 >= t.size || r2 < 0)
    return t.withMutations(function(s2) {
      r2 < 0 ? _t(s2, r2).set(0, e) : _t(s2, 0, r2 + 1).set(r2, e);
    });
  r2 += t._origin;
  var n2 = t._tail, i2 = t._root, o2 = Ar();
  return r2 >= Zt(t._capacity) ? n2 = Dr(n2, t.__ownerID, 0, r2, e, o2) : i2 = Dr(i2, t.__ownerID, t._level, r2, e, o2), o2.value ? t.__ownerID ? (t._root = i2, t._tail = n2, t.__hash = void 0, t.__altered = true, t) : Xt(t._origin, t._capacity, t._level, i2, n2) : t;
}
function Dr(t, r2, e, n2, i2, o2) {
  var s2 = n2 >>> e & L, u2 = t && s2 < t.array.length;
  if (!u2 && i2 === void 0)
    return t;
  var a2;
  if (e > 0) {
    var f2 = t && t.array[s2], h2 = Dr(f2, r2, e - I, n2, i2, o2);
    return h2 === f2 ? t : (a2 = At(t, r2), a2.array[s2] = h2, a2);
  }
  return u2 && t.array[s2] === i2 ? t : (o2 && H(o2), a2 = At(t, r2), i2 === void 0 && s2 === a2.array.length - 1 ? a2.array.pop() : a2.array[s2] = i2, a2);
}
function At(t, r2) {
  return r2 && t && r2 === t.ownerID ? t : new vt(t ? t.array.slice() : [], r2);
}
function Mn(t, r2) {
  if (r2 >= Zt(t._capacity))
    return t._tail;
  if (r2 < 1 << t._level + I) {
    for (var e = t._root, n2 = t._level; e && n2 > 0; )
      e = e.array[r2 >>> n2 & L], n2 -= I;
    return e;
  }
}
function _t(t, r2, e) {
  r2 !== void 0 && (r2 |= 0), e !== void 0 && (e |= 0);
  var n2 = t.__ownerID || new Ur(), i2 = t._origin, o2 = t._capacity, s2 = i2 + r2, u2 = e === void 0 ? o2 : e < 0 ? o2 + e : i2 + e;
  if (s2 === i2 && u2 === o2)
    return t;
  if (s2 >= u2)
    return t.clear();
  for (var a2 = t._level, f2 = t._root, h2 = 0; s2 + h2 < 0; )
    f2 = new vt(f2 && f2.array.length ? [void 0, f2] : [], n2), a2 += I, h2 += 1 << a2;
  h2 && (s2 += h2, i2 += h2, u2 += h2, o2 += h2);
  for (var c = Zt(o2), p = Zt(u2); p >= 1 << a2 + I; )
    f2 = new vt(f2 && f2.array.length ? [f2] : [], n2), a2 += I;
  var _ = t._tail, v2 = p < c ? Mn(t, u2 - 1) : p > c ? new vt([], n2) : _;
  if (_ && p > c && s2 < o2 && _.array.length) {
    f2 = At(f2, n2);
    for (var l2 = f2, m2 = a2; m2 > I; m2 -= I) {
      var d = c >>> m2 & L;
      l2 = l2.array[d] = At(l2.array[d], n2);
    }
    l2.array[c >>> I & L] = _;
  }
  if (u2 < o2 && (v2 = v2 && v2.removeAfter(n2, 0, u2)), s2 >= p)
    s2 -= p, u2 -= p, a2 = I, f2 = null, v2 = v2 && v2.removeBefore(n2, 0, s2);
  else if (s2 > i2 || p < c) {
    for (h2 = 0; f2; ) {
      var S = s2 >>> a2 & L;
      if (S !== p >>> a2 & L)
        break;
      S && (h2 += (1 << a2) * S), a2 -= I, f2 = f2.array[S];
    }
    f2 && s2 > i2 && (f2 = f2.removeBefore(n2, a2, s2 - h2)), f2 && p < c && (f2 = f2.removeAfter(n2, a2, p - h2)), h2 && (s2 -= h2, u2 -= h2);
  }
  return t.__ownerID ? (t.size = u2 - s2, t._origin = s2, t._capacity = u2, t._level = a2, t._root = f2, t._tail = v2, t.__hash = void 0, t.__altered = true, t) : Xt(s2, u2, a2, f2, v2);
}
function Zt(t) {
  return t < Y ? 0 : t - 1 >>> I << I;
}
var ct = function(t) {
  function r2(e) {
    return e == null ? Ft() : rn(e) ? e : Ft().withMutations(function(n2) {
      var i2 = Q(e);
      X(i2.size), i2.forEach(function(o2, s2) {
        return n2.set(s2, o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("OrderedMap {", "}");
  }, r2.prototype.get = function(n2, i2) {
    var o2 = this._map.get(n2);
    return o2 !== void 0 ? this._list.get(o2)[1] : i2;
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : Ft();
  }, r2.prototype.set = function(n2, i2) {
    return $e(this, n2, i2);
  }, r2.prototype.remove = function(n2) {
    return $e(this, n2, y);
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    return this._list.__iterate(function(s2) {
      return s2 && n2(s2[1], s2[0], o2);
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    return this._list.fromEntrySeq().__iterator(n2, i2);
  }, r2.prototype.__ensureOwner = function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2), o2 = this._list.__ensureOwner(n2);
    return n2 ? ue(i2, o2, n2, this.__hash) : this.size === 0 ? Ft() : (this.__ownerID = n2, this.__altered = false, this._map = i2, this._list = o2, this);
  }, r2;
}(Ut);
ct.isOrderedMap = rn;
ct.prototype[Dt] = true;
ct.prototype[Gt] = ct.prototype.remove;
function ue(t, r2, e, n2) {
  var i2 = Object.create(ct.prototype);
  return i2.size = t ? t.size : 0, i2._map = t, i2._list = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
var Te;
function Ft() {
  return Te || (Te = ue(V(), cr()));
}
function $e(t, r2, e) {
  var n2 = t._map, i2 = t._list, o2 = n2.get(r2), s2 = o2 !== void 0, u2, a2;
  if (e === y) {
    if (!s2)
      return t;
    i2.size >= Y && i2.size >= n2.size * 2 ? (a2 = i2.filter(function(f2, h2) {
      return f2 !== void 0 && o2 !== h2;
    }), u2 = a2.toKeyedSeq().map(function(f2) {
      return f2[0];
    }).flip().toMap(), t.__ownerID && (u2.__ownerID = a2.__ownerID = t.__ownerID)) : (u2 = n2.remove(r2), a2 = o2 === i2.size - 1 ? i2.pop() : i2.set(o2, void 0));
  } else if (s2) {
    if (e === i2.get(o2)[1])
      return t;
    u2 = n2, a2 = i2.set(o2, [r2, e]);
  } else
    u2 = n2.set(r2, i2.size), a2 = i2.set(i2.size, [r2, e]);
  return t.__ownerID ? (t.size = u2.size, t._map = u2, t._list = a2, t.__hash = void 0, t.__altered = true, t) : ue(u2, a2);
}
var An = "@@__IMMUTABLE_STACK__@@";
function Nr(t) {
  return Boolean(t && t[An]);
}
var ae = function(t) {
  function r2(e) {
    return e == null ? ar() : Nr(e) ? e : ar().pushAll(e);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("Stack [", "]");
  }, r2.prototype.get = function(n2, i2) {
    var o2 = this._head;
    for (n2 = lt(this, n2); o2 && n2--; )
      o2 = o2.next;
    return o2 ? o2.value : i2;
  }, r2.prototype.peek = function() {
    return this._head && this._head.value;
  }, r2.prototype.push = function() {
    var n2 = arguments;
    if (arguments.length === 0)
      return this;
    for (var i2 = this.size + arguments.length, o2 = this._head, s2 = arguments.length - 1; s2 >= 0; s2--)
      o2 = { value: n2[s2], next: o2 };
    return this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : kt(i2, o2);
  }, r2.prototype.pushAll = function(n2) {
    if (n2 = t(n2), n2.size === 0)
      return this;
    if (this.size === 0 && Nr(n2))
      return n2;
    X(n2.size);
    var i2 = this.size, o2 = this._head;
    return n2.__iterate(function(s2) {
      i2++, o2 = { value: s2, next: o2 };
    }, true), this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : kt(i2, o2);
  }, r2.prototype.pop = function() {
    return this.slice(1);
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : ar();
  }, r2.prototype.slice = function(n2, i2) {
    if (Vt(n2, i2, this.size))
      return this;
    var o2 = jt(n2, this.size), s2 = xt(i2, this.size);
    if (s2 !== this.size)
      return t.prototype.slice.call(this, n2, i2);
    for (var u2 = this.size - o2, a2 = this._head; o2--; )
      a2 = a2.next;
    return this.__ownerID ? (this.size = u2, this._head = a2, this.__hash = void 0, this.__altered = true, this) : kt(u2, a2);
  }, r2.prototype.__ensureOwner = function(n2) {
    return n2 === this.__ownerID ? this : n2 ? kt(this.size, this._head, n2, this.__hash) : this.size === 0 ? ar() : (this.__ownerID = n2, this.__altered = false, this);
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    if (i2)
      return new mt(this.toArray()).__iterate(function(a2, f2) {
        return n2(a2, f2, o2);
      }, i2);
    for (var s2 = 0, u2 = this._head; u2 && n2(u2.value, s2++, this) !== false; )
      u2 = u2.next;
    return s2;
  }, r2.prototype.__iterator = function(n2, i2) {
    if (i2)
      return new mt(this.toArray()).__iterator(n2, i2);
    var o2 = 0, s2 = this._head;
    return new g(function() {
      if (s2) {
        var u2 = s2.value;
        return s2 = s2.next, b(n2, o2++, u2);
      }
      return U();
    });
  }, r2;
}(St);
ae.isStack = Nr;
var P = ae.prototype;
P[An] = true;
P.shift = P.pop;
P.unshift = P.push;
P.unshiftAll = P.pushAll;
P.withMutations = rr;
P.wasAltered = ne;
P.asImmutable = nr;
P["@@transducer/init"] = P.asMutable = er;
P["@@transducer/step"] = function(t, r2) {
  return t.unshift(r2);
};
P["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
function kt(t, r2, e, n2) {
  var i2 = Object.create(P);
  return i2.size = t, i2._head = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
var De;
function ar() {
  return De || (De = kt(0));
}
var qn = "@@__IMMUTABLE_SET__@@";
function fe(t) {
  return Boolean(t && t[qn]);
}
function Rn(t) {
  return fe(t) && x(t);
}
function he(t, r2) {
  if (t === r2)
    return true;
  if (!F(r2) || t.size !== void 0 && r2.size !== void 0 && t.size !== r2.size || t.__hash !== void 0 && r2.__hash !== void 0 && t.__hash !== r2.__hash || z(t) !== z(r2) || B2(t) !== B2(r2) || x(t) !== x(r2))
    return false;
  if (t.size === 0 && r2.size === 0)
    return true;
  var e = !vr(t);
  if (x(t)) {
    var n2 = t.entries();
    return r2.every(function(a2, f2) {
      var h2 = n2.next().value;
      return h2 && D(h2[1], a2) && (e || D(h2[0], f2));
    }) && n2.next().done;
  }
  var i2 = false;
  if (t.size === void 0)
    if (r2.size === void 0)
      typeof t.cacheResult == "function" && t.cacheResult();
    else {
      i2 = true;
      var o2 = t;
      t = r2, r2 = o2;
    }
  var s2 = true, u2 = r2.__iterate(function(a2, f2) {
    if (e ? !t.has(a2) : i2 ? !D(a2, t.get(f2, y)) : !D(t.get(f2, y), a2))
      return s2 = false, false;
  });
  return s2 && t.size === u2;
}
function wt(t, r2) {
  var e = function(n2) {
    t.prototype[n2] = r2[n2];
  };
  return Object.keys(r2).forEach(e), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(r2).forEach(e), t;
}
function _r(t) {
  if (!t || typeof t != "object")
    return t;
  if (!F(t)) {
    if (!dt(t))
      return t;
    t = K(t);
  }
  if (z(t)) {
    var r2 = {};
    return t.__iterate(function(n2, i2) {
      r2[i2] = _r(n2);
    }), r2;
  }
  var e = [];
  return t.__iterate(function(n2) {
    e.push(_r(n2));
  }), e;
}
var Sr = function(t) {
  function r2(e) {
    return e == null ? Wt() : fe(e) && !x(e) ? e : Wt().withMutations(function(n2) {
      var i2 = t(e);
      X(i2.size), i2.forEach(function(o2) {
        return n2.add(o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.fromKeys = function(n2) {
    return this(Q(n2).keySeq());
  }, r2.intersect = function(n2) {
    return n2 = A(n2).toArray(), n2.length ? N.intersect.apply(r2(n2.pop()), n2) : Wt();
  }, r2.union = function(n2) {
    return n2 = A(n2).toArray(), n2.length ? N.union.apply(r2(n2.pop()), n2) : Wt();
  }, r2.prototype.toString = function() {
    return this.__toString("Set {", "}");
  }, r2.prototype.has = function(n2) {
    return this._map.has(n2);
  }, r2.prototype.add = function(n2) {
    return fr(this, this._map.set(n2, n2));
  }, r2.prototype.remove = function(n2) {
    return fr(this, this._map.remove(n2));
  }, r2.prototype.clear = function() {
    return fr(this, this._map.clear());
  }, r2.prototype.map = function(n2, i2) {
    var o2 = this, s2 = false, u2 = fr(this, this._map.mapEntries(function(a2) {
      var f2 = a2[1], h2 = n2.call(i2, f2, f2, o2);
      return h2 !== f2 && (s2 = true), [h2, h2];
    }, i2));
    return s2 ? u2 : this;
  }, r2.prototype.union = function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    return n2 = n2.filter(function(o2) {
      return o2.size !== 0;
    }), n2.length === 0 ? this : this.size === 0 && !this.__ownerID && n2.length === 1 ? this.constructor(n2[0]) : this.withMutations(function(o2) {
      for (var s2 = 0; s2 < n2.length; s2++)
        t(n2[s2]).forEach(function(u2) {
          return o2.add(u2);
        });
    });
  }, r2.prototype.intersect = function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    if (n2.length === 0)
      return this;
    n2 = n2.map(function(s2) {
      return t(s2);
    });
    var o2 = [];
    return this.forEach(function(s2) {
      n2.every(function(u2) {
        return u2.includes(s2);
      }) || o2.push(s2);
    }), this.withMutations(function(s2) {
      o2.forEach(function(u2) {
        s2.remove(u2);
      });
    });
  }, r2.prototype.subtract = function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    if (n2.length === 0)
      return this;
    n2 = n2.map(function(s2) {
      return t(s2);
    });
    var o2 = [];
    return this.forEach(function(s2) {
      n2.some(function(u2) {
        return u2.includes(s2);
      }) && o2.push(s2);
    }), this.withMutations(function(s2) {
      o2.forEach(function(u2) {
        s2.remove(u2);
      });
    });
  }, r2.prototype.sort = function(n2) {
    return Qt(Et(this, n2));
  }, r2.prototype.sortBy = function(n2, i2) {
    return Qt(Et(this, i2, n2));
  }, r2.prototype.wasAltered = function() {
    return this._map.wasAltered();
  }, r2.prototype.__iterate = function(n2, i2) {
    var o2 = this;
    return this._map.__iterate(function(s2) {
      return n2(s2, s2, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n2, i2) {
    return this._map.__iterator(n2, i2);
  }, r2.prototype.__ensureOwner = function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2);
    return n2 ? this.__make(i2, n2) : this.size === 0 ? this.__empty() : (this.__ownerID = n2, this._map = i2, this);
  }, r2;
}(Tt);
Sr.isSet = fe;
var N = Sr.prototype;
N[qn] = true;
N[Gt] = N.remove;
N.merge = N.concat = N.union;
N.withMutations = rr;
N.asImmutable = nr;
N["@@transducer/init"] = N.asMutable = er;
N["@@transducer/step"] = function(t, r2) {
  return t.add(r2);
};
N["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
N.__empty = Wt;
N.__make = jn;
function fr(t, r2) {
  return t.__ownerID ? (t.size = r2.size, t._map = r2, t) : r2 === t._map ? t : r2.size === 0 ? t.__empty() : t.__make(r2);
}
function jn(t, r2) {
  var e = Object.create(N);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r2, e;
}
var Ne;
function Wt() {
  return Ne || (Ne = jn(V()));
}
var $i = function(t) {
  function r2(e, n2, i2) {
    if (!(this instanceof r2))
      return new r2(e, n2, i2);
    if (Xr(i2 !== 0, "Cannot step a Range by 0"), e = e || 0, n2 === void 0 && (n2 = 1 / 0), i2 = i2 === void 0 ? 1 : Math.abs(i2), n2 < e && (i2 = -i2), this._start = e, this._end = n2, this._step = i2, this.size = Math.max(0, Math.ceil((n2 - e) / i2 - 1) + 1), this.size === 0) {
      if (zr)
        return zr;
      zr = this;
    }
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, r2.prototype.get = function(n2, i2) {
    return this.has(n2) ? this._start + lt(this, n2) * this._step : i2;
  }, r2.prototype.includes = function(n2) {
    var i2 = (n2 - this._start) / this._step;
    return i2 >= 0 && i2 < this.size && i2 === Math.floor(i2);
  }, r2.prototype.slice = function(n2, i2) {
    return Vt(n2, i2, this.size) ? this : (n2 = jt(n2, this.size), i2 = xt(i2, this.size), i2 <= n2 ? new r2(0, 0) : new r2(this.get(n2, this._end), this.get(i2, this._end), this._step));
  }, r2.prototype.indexOf = function(n2) {
    var i2 = n2 - this._start;
    if (i2 % this._step === 0) {
      var o2 = i2 / this._step;
      if (o2 >= 0 && o2 < this.size)
        return o2;
    }
    return -1;
  }, r2.prototype.lastIndexOf = function(n2) {
    return this.indexOf(n2);
  }, r2.prototype.__iterate = function(n2, i2) {
    for (var o2 = this.size, s2 = this._step, u2 = i2 ? this._start + (o2 - 1) * s2 : this._start, a2 = 0; a2 !== o2 && n2(u2, i2 ? o2 - ++a2 : a2++, this) !== false; )
      u2 += i2 ? -s2 : s2;
    return a2;
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this.size, s2 = this._step, u2 = i2 ? this._start + (o2 - 1) * s2 : this._start, a2 = 0;
    return new g(function() {
      if (a2 === o2)
        return U();
      var f2 = u2;
      return u2 += i2 ? -s2 : s2, b(n2, i2 ? o2 - ++a2 : a2++, f2);
    });
  }, r2.prototype.equals = function(n2) {
    return n2 instanceof r2 ? this._start === n2._start && this._end === n2._end && this._step === n2._step : he(this, n2);
  }, r2;
}(G);
var zr;
function Tn(t, r2, e) {
  for (var n2 = vn(r2), i2 = 0; i2 !== n2.length; )
    if (t = ln(t, n2[i2++], y), t === y)
      return e;
  return t;
}
function $n(t, r2) {
  return Tn(this, t, r2);
}
function Di(t, r2) {
  return Tn(t, r2, y) !== y;
}
function Ni(t) {
  return Di(this, t);
}
function Dn() {
  X(this.size);
  var t = {};
  return this.__iterate(function(r2, e) {
    t[e] = r2;
  }), t;
}
A.isIterable = F;
A.isKeyed = z;
A.isIndexed = B2;
A.isAssociative = vr;
A.isOrdered = x;
A.Iterator = g;
wt(A, { toArray: function() {
  X(this.size);
  var r2 = new Array(this.size || 0), e = z(this), n2 = 0;
  return this.__iterate(function(i2, o2) {
    r2[n2++] = e ? [o2, i2] : i2;
  }), r2;
}, toIndexedSeq: function() {
  return new nn(this);
}, toJS: function() {
  return _r(this);
}, toKeyedSeq: function() {
  return new gr(this, true);
}, toMap: function() {
  return Ut(this.toKeyedSeq());
}, toObject: Dn, toOrderedMap: function() {
  return ct(this.toKeyedSeq());
}, toOrderedSet: function() {
  return Qt(z(this) ? this.valueSeq() : this);
}, toSet: function() {
  return Sr(z(this) ? this.valueSeq() : this);
}, toSetSeq: function() {
  return new on(this);
}, toSeq: function() {
  return B2(this) ? this.toIndexedSeq() : z(this) ? this.toKeyedSeq() : this.toSetSeq();
}, toStack: function() {
  return ae(z(this) ? this.valueSeq() : this);
}, toList: function() {
  return mr(z(this) ? this.valueSeq() : this);
}, toString: function() {
  return "[Collection]";
}, __toString: function(r2, e) {
  return this.size === 0 ? r2 + e : r2 + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e;
}, concat: function() {
  for (var r2 = [], e = arguments.length; e--; )
    r2[e] = arguments[e];
  return w(this, ci(this, r2));
}, includes: function(r2) {
  return this.some(function(e) {
    return D(e, r2);
  });
}, entries: function() {
  return this.__iterator(Z);
}, every: function(r2, e) {
  X(this.size);
  var n2 = true;
  return this.__iterate(function(i2, o2, s2) {
    if (!r2.call(e, i2, o2, s2))
      return n2 = false, false;
  }), n2;
}, filter: function(r2, e) {
  return w(this, fn(this, r2, e, true));
}, find: function(r2, e, n2) {
  var i2 = this.findEntry(r2, e);
  return i2 ? i2[1] : n2;
}, forEach: function(r2, e) {
  return X(this.size), this.__iterate(e ? r2.bind(e) : r2);
}, join: function(r2) {
  X(this.size), r2 = r2 !== void 0 ? "" + r2 : ",";
  var e = "", n2 = true;
  return this.__iterate(function(i2) {
    n2 ? n2 = false : e += r2, e += i2 != null ? i2.toString() : "";
  }), e;
}, keys: function() {
  return this.__iterator(tr);
}, map: function(r2, e) {
  return w(this, an(this, r2, e));
}, reduce: function(r2, e, n2) {
  return Ce(this, r2, e, n2, arguments.length < 2, false);
}, reduceRight: function(r2, e, n2) {
  return Ce(this, r2, e, n2, arguments.length < 2, true);
}, reverse: function() {
  return w(this, Jr(this, true));
}, slice: function(r2, e) {
  return w(this, Yr(this, r2, e, true));
}, some: function(r2, e) {
  return !this.every(hr(r2), e);
}, sort: function(r2) {
  return w(this, Et(this, r2));
}, values: function() {
  return this.__iterator(tt);
}, butLast: function() {
  return this.slice(0, -1);
}, isEmpty: function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, count: function(r2, e) {
  return bt(r2 ? this.toSeq().filter(r2, e) : this);
}, countBy: function(r2, e) {
  return ai(this, r2, e);
}, equals: function(r2) {
  return he(this, r2);
}, entrySeq: function() {
  var r2 = this;
  if (r2._cache)
    return new mt(r2._cache);
  var e = r2.toSeq().map(Li).toIndexedSeq();
  return e.fromEntrySeq = function() {
    return r2.toSeq();
  }, e;
}, filterNot: function(r2, e) {
  return this.filter(hr(r2), e);
}, findEntry: function(r2, e, n2) {
  var i2 = n2;
  return this.__iterate(function(o2, s2, u2) {
    if (r2.call(e, o2, s2, u2))
      return i2 = [s2, o2], false;
  }), i2;
}, findKey: function(r2, e) {
  var n2 = this.findEntry(r2, e);
  return n2 && n2[0];
}, findLast: function(r2, e, n2) {
  return this.toKeyedSeq().reverse().find(r2, e, n2);
}, findLastEntry: function(r2, e, n2) {
  return this.toKeyedSeq().reverse().findEntry(r2, e, n2);
}, findLastKey: function(r2, e) {
  return this.toKeyedSeq().reverse().findKey(r2, e);
}, first: function(r2) {
  return this.find(ke, null, r2);
}, flatMap: function(r2, e) {
  return w(this, pi(this, r2, e));
}, flatten: function(r2) {
  return w(this, cn(this, r2, true));
}, fromEntrySeq: function() {
  return new sn(this);
}, get: function(r2, e) {
  return this.find(function(n2, i2) {
    return D(i2, r2);
  }, void 0, e);
}, getIn: $n, groupBy: function(r2, e) {
  return fi(this, r2, e);
}, has: function(r2) {
  return this.get(r2, y) !== y;
}, hasIn: Ni, isSubset: function(r2) {
  return r2 = typeof r2.includes == "function" ? r2 : A(r2), this.every(function(e) {
    return r2.includes(e);
  });
}, isSuperset: function(r2) {
  return r2 = typeof r2.isSubset == "function" ? r2 : A(r2), r2.isSubset(this);
}, keyOf: function(r2) {
  return this.findKey(function(e) {
    return D(e, r2);
  });
}, keySeq: function() {
  return this.toSeq().map(Ci).toIndexedSeq();
}, last: function(r2) {
  return this.toSeq().reverse().first(r2);
}, lastKeyOf: function(r2) {
  return this.toKeyedSeq().reverse().keyOf(r2);
}, max: function(r2) {
  return sr(this, r2);
}, maxBy: function(r2, e) {
  return sr(this, e, r2);
}, min: function(r2) {
  return sr(this, r2 ? Le(r2) : Pe);
}, minBy: function(r2, e) {
  return sr(this, e ? Le(e) : Pe, r2);
}, rest: function() {
  return this.slice(1);
}, skip: function(r2) {
  return r2 === 0 ? this : this.slice(Math.max(0, r2));
}, skipLast: function(r2) {
  return r2 === 0 ? this : this.slice(0, -Math.max(0, r2));
}, skipWhile: function(r2, e) {
  return w(this, hn(this, r2, e, true));
}, skipUntil: function(r2, e) {
  return this.skipWhile(hr(r2), e);
}, sortBy: function(r2, e) {
  return w(this, Et(this, e, r2));
}, take: function(r2) {
  return this.slice(0, Math.max(0, r2));
}, takeLast: function(r2) {
  return this.slice(-Math.max(0, r2));
}, takeWhile: function(r2, e) {
  return w(this, hi(this, r2, e));
}, takeUntil: function(r2, e) {
  return this.takeWhile(hr(r2), e);
}, update: function(r2) {
  return r2(this);
}, valueSeq: function() {
  return this.toIndexedSeq();
}, hashCode: function() {
  return this.__hash || (this.__hash = Ui(this));
} });
var C = A.prototype;
C[Je] = true;
C[lr] = C.values;
C.toJSON = C.toArray;
C.__toStringMapper = Jt;
C.inspect = C.toSource = function() {
  return this.toString();
};
C.chain = C.flatMap;
C.contains = C.includes;
wt(Q, { flip: function() {
  return w(this, un(this));
}, mapEntries: function(r2, e) {
  var n2 = this, i2 = 0;
  return w(this, this.toSeq().map(function(o2, s2) {
    return r2.call(e, [s2, o2], i2++, n2);
  }).fromEntrySeq());
}, mapKeys: function(r2, e) {
  var n2 = this;
  return w(this, this.toSeq().flip().map(function(i2, o2) {
    return r2.call(e, i2, o2, n2);
  }).flip());
} });
var ir = Q.prototype;
ir[Ye] = true;
ir[lr] = C.entries;
ir.toJSON = Dn;
ir.__toStringMapper = function(t, r2) {
  return Jt(r2) + ": " + Jt(t);
};
wt(St, { toKeyedSeq: function() {
  return new gr(this, false);
}, filter: function(r2, e) {
  return w(this, fn(this, r2, e, false));
}, findIndex: function(r2, e) {
  var n2 = this.findEntry(r2, e);
  return n2 ? n2[0] : -1;
}, indexOf: function(r2) {
  var e = this.keyOf(r2);
  return e === void 0 ? -1 : e;
}, lastIndexOf: function(r2) {
  var e = this.lastKeyOf(r2);
  return e === void 0 ? -1 : e;
}, reverse: function() {
  return w(this, Jr(this, false));
}, slice: function(r2, e) {
  return w(this, Yr(this, r2, e, false));
}, splice: function(r2, e) {
  var n2 = arguments.length;
  if (e = Math.max(e || 0, 0), n2 === 0 || n2 === 2 && !e)
    return this;
  r2 = jt(r2, r2 < 0 ? this.count() : this.size);
  var i2 = this.slice(0, r2);
  return w(this, n2 === 1 ? i2 : i2.concat(it(arguments, 2), this.slice(r2 + e)));
}, findLastIndex: function(r2, e) {
  var n2 = this.findLastEntry(r2, e);
  return n2 ? n2[0] : -1;
}, first: function(r2) {
  return this.get(0, r2);
}, flatten: function(r2) {
  return w(this, cn(this, r2, false));
}, get: function(r2, e) {
  return r2 = lt(this, r2), r2 < 0 || this.size === 1 / 0 || this.size !== void 0 && r2 > this.size ? e : this.find(function(n2, i2) {
    return i2 === r2;
  }, void 0, e);
}, has: function(r2) {
  return r2 = lt(this, r2), r2 >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || r2 < this.size : this.indexOf(r2) !== -1);
}, interpose: function(r2) {
  return w(this, _i(this, r2));
}, interleave: function() {
  var r2 = [this].concat(it(arguments)), e = ur(this.toSeq(), G.of, r2), n2 = e.flatten(true);
  return e.size && (n2.size = e.size * r2.length), w(this, n2);
}, keySeq: function() {
  return $i(0, this.size);
}, last: function(r2) {
  return this.get(-1, r2);
}, skipWhile: function(r2, e) {
  return w(this, hn(this, r2, e, false));
}, zip: function() {
  var r2 = [this].concat(it(arguments));
  return w(this, ur(this, Ue, r2));
}, zipAll: function() {
  var r2 = [this].concat(it(arguments));
  return w(this, ur(this, Ue, r2, true));
}, zipWith: function(r2) {
  var e = it(arguments);
  return e[0] = this, w(this, ur(this, r2, e));
} });
var Pt = St.prototype;
Pt[He] = true;
Pt[Dt] = true;
wt(Tt, { get: function(r2, e) {
  return this.has(r2) ? r2 : e;
}, includes: function(r2) {
  return this.has(r2);
}, keySeq: function() {
  return this.valueSeq();
} });
var qt = Tt.prototype;
qt.has = C.includes;
qt.contains = qt.includes;
qt.keys = qt.values;
wt(yt, ir);
wt(G, Pt);
wt(Ct, qt);
function Ce(t, r2, e, n2, i2, o2) {
  return X(t.size), t.__iterate(function(s2, u2, a2) {
    i2 ? (i2 = false, e = s2) : e = r2.call(n2, e, s2, u2, a2);
  }, o2), e;
}
function Ci(t, r2) {
  return r2;
}
function Li(t, r2) {
  return [r2, t];
}
function hr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function Le(t) {
  return function() {
    return -t.apply(this, arguments);
  };
}
function Ue() {
  return it(arguments);
}
function Pe(t, r2) {
  return t < r2 ? 1 : t > r2 ? -1 : 0;
}
function Ui(t) {
  if (t.size === 1 / 0)
    return 0;
  var r2 = x(t), e = z(t), n2 = r2 ? 1 : 0, i2 = t.__iterate(e ? r2 ? function(o2, s2) {
    n2 = 31 * n2 + Be(W(o2), W(s2)) | 0;
  } : function(o2, s2) {
    n2 = n2 + Be(W(o2), W(s2)) | 0;
  } : r2 ? function(o2) {
    n2 = 31 * n2 + W(o2) | 0;
  } : function(o2) {
    n2 = n2 + W(o2) | 0;
  });
  return Pi(i2, n2);
}
function Pi(t, r2) {
  return r2 = Bt(r2, 3432918353), r2 = Bt(r2 << 15 | r2 >>> -15, 461845907), r2 = Bt(r2 << 13 | r2 >>> -13, 5), r2 = (r2 + 3864292196 | 0) ^ t, r2 = Bt(r2 ^ r2 >>> 16, 2246822507), r2 = Bt(r2 ^ r2 >>> 13, 3266489909), r2 = yr(r2 ^ r2 >>> 16), r2;
}
function Be(t, r2) {
  return t ^ r2 + 2654435769 + (t << 6) + (t >> 2) | 0;
}
var Qt = function(t) {
  function r2(e) {
    return e == null ? Cr() : Rn(e) ? e : Cr().withMutations(function(n2) {
      var i2 = Tt(e);
      X(i2.size), i2.forEach(function(o2) {
        return n2.add(o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.fromKeys = function(n2) {
    return this(Q(n2).keySeq());
  }, r2.prototype.toString = function() {
    return this.__toString("OrderedSet {", "}");
  }, r2;
}(Sr);
Qt.isOrderedSet = Rn;
var Ot = Qt.prototype;
Ot[Dt] = true;
Ot.zip = Pt.zip;
Ot.zipWith = Pt.zipWith;
Ot.zipAll = Pt.zipAll;
Ot.__empty = Cr;
Ot.__make = Nn;
function Nn(t, r2) {
  var e = Object.create(Ot);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r2, e;
}
var Fe;
function Cr() {
  return Fe || (Fe = Nn(Ft()));
}
function Bi(t) {
  if ($t(t))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (ot(t))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t === null || typeof t != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
var q2 = function(r2, e) {
  var n2;
  Bi(r2);
  var i2 = function(u2) {
    var a2 = this;
    if (u2 instanceof i2)
      return u2;
    if (!(this instanceof i2))
      return new i2(u2);
    if (!n2) {
      n2 = true;
      var f2 = Object.keys(r2), h2 = o2._indices = {};
      o2._name = e, o2._keys = f2, o2._defaultValues = r2;
      for (var c = 0; c < f2.length; c++) {
        var p = f2[c];
        h2[p] = c, o2[p] ? typeof console == "object" && console.warn && console.warn("Cannot define " + pe(this) + ' with property "' + p + '" since that property name is part of the Record API.') : Fi(o2, p);
      }
    }
    return this.__ownerID = void 0, this._values = mr().withMutations(function(_) {
      _.setSize(a2._keys.length), Q(u2).forEach(function(v2, l2) {
        _.set(a2._indices[l2], v2 === a2._defaultValues[l2] ? void 0 : v2);
      });
    }), this;
  }, o2 = i2.prototype = Object.create(O);
  return o2.constructor = i2, e && (i2.displayName = e), i2;
};
q2.prototype.toString = function() {
  for (var r2 = pe(this) + " { ", e = this._keys, n2, i2 = 0, o2 = e.length; i2 !== o2; i2++)
    n2 = e[i2], r2 += (i2 ? ", " : "") + n2 + ": " + Jt(this.get(n2));
  return r2 + " }";
};
q2.prototype.equals = function(r2) {
  return this === r2 || $t(r2) && Rt(this).equals(Rt(r2));
};
q2.prototype.hashCode = function() {
  return Rt(this).hashCode();
};
q2.prototype.has = function(r2) {
  return this._indices.hasOwnProperty(r2);
};
q2.prototype.get = function(r2, e) {
  if (!this.has(r2))
    return e;
  var n2 = this._indices[r2], i2 = this._values.get(n2);
  return i2 === void 0 ? this._defaultValues[r2] : i2;
};
q2.prototype.set = function(r2, e) {
  if (this.has(r2)) {
    var n2 = this._values.set(this._indices[r2], e === this._defaultValues[r2] ? void 0 : e);
    if (n2 !== this._values && !this.__ownerID)
      return ce(this, n2);
  }
  return this;
};
q2.prototype.remove = function(r2) {
  return this.set(r2);
};
q2.prototype.clear = function() {
  var r2 = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : ce(this, r2);
};
q2.prototype.wasAltered = function() {
  return this._values.wasAltered();
};
q2.prototype.toSeq = function() {
  return Rt(this);
};
q2.prototype.toJS = function() {
  return _r(this);
};
q2.prototype.entries = function() {
  return this.__iterator(Z);
};
q2.prototype.__iterator = function(r2, e) {
  return Rt(this).__iterator(r2, e);
};
q2.prototype.__iterate = function(r2, e) {
  return Rt(this).__iterate(r2, e);
};
q2.prototype.__ensureOwner = function(r2) {
  if (r2 === this.__ownerID)
    return this;
  var e = this._values.__ensureOwner(r2);
  return r2 ? ce(this, e, r2) : (this.__ownerID = r2, this._values = e, this);
};
q2.isRecord = $t;
q2.getDescriptiveName = pe;
var O = q2.prototype;
O[Ze] = true;
O[Gt] = O.remove;
O.deleteIn = O.removeIn = Qr;
O.getIn = $n;
O.hasIn = C.hasIn;
O.merge = gn;
O.mergeWith = mn;
O.mergeIn = re;
O.mergeDeep = wn;
O.mergeDeepWith = On;
O.mergeDeepIn = ee;
O.setIn = Zr;
O.update = Gr;
O.updateIn = Vr;
O.withMutations = rr;
O.asMutable = er;
O.asImmutable = nr;
O[lr] = O.entries;
O.toJSON = O.toObject = C.toObject;
O.inspect = O.toSource = function() {
  return this.toString();
};
function ce(t, r2, e) {
  var n2 = Object.create(Object.getPrototypeOf(t));
  return n2._values = r2, n2.__ownerID = e, n2;
}
function pe(t) {
  return t.constructor.displayName || t.constructor.name || "Record";
}
function Rt(t) {
  return kr(t._keys.map(function(r2) {
    return [r2, t.get(r2)];
  }));
}
function Fi(t, r2) {
  try {
    Object.defineProperty(t, r2, { get: function() {
      return this.get(r2);
    }, set: function(e) {
      Xr(this.__ownerID, "Cannot set on an immutable record."), this.set(r2, e);
    } });
  } catch {
  }
}
var Vi = function(t) {
  function r2(e, n2) {
    if (!(this instanceof r2))
      return new r2(e, n2);
    if (this._value = e, this.size = n2 === void 0 ? 1 / 0 : Math.max(0, n2), this.size === 0) {
      if (Mr)
        return Mr;
      Mr = this;
    }
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = function() {
    return this.size === 0 ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]";
  }, r2.prototype.get = function(n2, i2) {
    return this.has(n2) ? this._value : i2;
  }, r2.prototype.includes = function(n2) {
    return D(this._value, n2);
  }, r2.prototype.slice = function(n2, i2) {
    var o2 = this.size;
    return Vt(n2, i2, o2) ? this : new r2(this._value, xt(i2, o2) - jt(n2, o2));
  }, r2.prototype.reverse = function() {
    return this;
  }, r2.prototype.indexOf = function(n2) {
    return D(this._value, n2) ? 0 : -1;
  }, r2.prototype.lastIndexOf = function(n2) {
    return D(this._value, n2) ? this.size : -1;
  }, r2.prototype.__iterate = function(n2, i2) {
    for (var o2 = this.size, s2 = 0; s2 !== o2 && n2(this._value, i2 ? o2 - ++s2 : s2++, this) !== false; )
      ;
    return s2;
  }, r2.prototype.__iterator = function(n2, i2) {
    var o2 = this, s2 = this.size, u2 = 0;
    return new g(function() {
      return u2 === s2 ? U() : b(n2, i2 ? s2 - ++u2 : u2++, o2._value);
    });
  }, r2.prototype.equals = function(n2) {
    return n2 instanceof r2 ? D(this._value, n2._value) : he(n2);
  }, r2;
}(G);
var Mr;
q();
var Kn = u(Wn(), 1);
function Jn(t, r2) {
  var e = (0, Kn.default)(t, r2);
  return e.map((i2) => i2[0] === 1 ? i2 : [i2[0], i2[1].length]);
}
function Yn(t, r2) {
  for (var e = "", n2 = 0, i2 = 0; i2 < r2.length; i2++) {
    var o2 = r2[i2], s2 = o2[0], u2 = o2[1];
    o2[0] === -1 && typeof u2 == "number" ? n2 += u2 : s2 == 0 && typeof u2 == "number" ? e += t.slice(n2, n2 += u2) : e += u2;
  }
  return e;
}
function Hi(t, r2) {
  return q2({ ...r2, room: t, state: q2(r2.state)() });
}
var et = null;
var at = {};
var de = class {
  constructor(r2, e) {
    v(this, "session");
    v(this, "cb", {});
    v(this, "hashCodeSession", 0);
    v(this, "room");
    v(this, "created", new Date().toISOString());
    v(this, "hashOfState", () => {
      let r3 = this.session.get("state"), e2 = r3.hashCode();
      return at[e2] = r3, e2;
    });
    v(this, "createPatchFromHashCode", async (r3, e2) => {
      let n3 = JSON.parse(It(e2));
      if (!at[r3]) {
        let h2 = await fetch(`/live/${this.room}
        `), { mST: c, hashCode: p } = await h2.json();
        at[p] = this.session.get("state").merge(c);
      }
      let i2 = at[r3], o2 = It(i2.toJSON()), s2 = i2.merge(n3), u2 = It(s2.toJSON()), a2 = s2.hashCode();
      at[a2] = s2;
      let f2 = Gi(o2, u2);
      return { oldHash: r3, newHash: a2, patch: f2 };
    });
    v(this, "patchSync", (r3) => {
      this.session = this.session.set("state", this.session.get("state").merge(r3)), this.update();
    });
    v(this, "applyPatch", async ({ oldHash: r3, newHash: e2, patch: n3 }) => {
      let i2 = this.room || "";
      if (!Object.keys(at).map((c) => Number(c)).includes(Number(r3)) && i2) {
        console.log(Object.keys(at));
        let c = await fetch(`/live/${i2}/mST`);
        if (c.ok) {
          let p = await c.json(), _ = this.session.get("state").merge(JSON.parse(It(p.mST)));
          at[_.hashCode()] = _;
        } else {
          let { mST: p } = await import(location.origin + `/live/${this.room}/mst.mjs?${Date.now()}`), _ = this.session.get("state").merge(JSON.parse(It(p)));
          at[_.hashCode()] = _;
        }
      }
      let o2 = It(at[r3].toJSON()), s2 = Yn(o2, n3), u2 = JSON.parse(s2), a2 = this.session.get("state").merge(u2), f2 = this.session.get("state").merge(a2);
      if (f2.hashCode() === e2)
        this.session = this.session.set("state", f2);
      else {
        new Error("Wrong patch");
        return;
      }
    });
    et = this, this.room = r2;
    let n2 = null;
    this.session = Hi(r2, { ...e, state: n2 || JSON.parse(It(e.state)) })();
  }
  update() {
    Object.keys(this.cb).map((r2) => this.cb[r2]).map((r2) => {
      try {
        r2(true);
      } catch (e) {
        console.error("error calling callback", { err: e });
      }
    });
  }
  onUpdate(r2, e) {
    this.cb[e] = r2;
  }
  json() {
    let r2 = this.session.toJSON(), e = r2.state.toJSON();
    return { ...r2, state: e };
  }
  setRoom(r2) {
    let e = this.session.set("room", r2);
    this.session = e;
  }
};
var Xi = () => et ? et.hashOfState() : 0;
var oo = () => {
  if (!et)
    return { i: 0, transpiled: "", code: "", html: "", css: "" };
  let { i: t, transpiled: r2, code: e, html: n2, css: i2 } = et.json().state;
  return { i: t, transpiled: r2, code: e, html: n2, css: i2 };
};
function Zi(t, r2) {
  let { i: e, transpiled: n2, code: i2, html: o2, css: s2 } = t, u2 = { i: e, transpiled: n2, code: i2, html: o2, css: s2 };
  return u2.code = u2.code.replace("from '/live", `from '${r2}/live`), u2.code = u2.code.replace("from './", `from '${r2}/live/`), u2.transpiled = u2.transpiled.replace('from "/live', `from "${r2}/live`), u2.transpiled = u2.transpiled.replace('from "./', `from "${r2}/live/`), u2;
}
function It(t) {
  let { i: r2, transpiled: e, code: n2, html: i2, css: o2 } = t;
  return JSON.stringify({ i: r2, transpiled: e, code: n2, html: i2, css: o2 });
}
var so = async (t) => {
  await et?.applyPatch(t), et?.update();
};
var fo = (t, r2, e) => et || new de(t, { name: r2.name, state: Zi(r2.state, e) });
function Gi(t, r2) {
  return Jn(t, r2);
}

// src/getBackupSession.ts
function getBackupSession() {
  return {
    "i": 3734,
    "transpiled": 'import { jsx as jsX } from "@emotion/react";\nimport { css } from "@emotion/react";\nimport { motion } from "framer-motion";\nexport default () => /* @__PURE__ */ jsX("header", {\n  css: css`\n      background-color: gre;\n      min-height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `\n}, /* @__PURE__ */ jsX(motion.div, {\n  animate: { rotate: 360 },\n  transition: {\n    repeat: 0,\n    duration: 2,\n    repeatType: "loop"\n  }\n}, /* @__PURE__ */ jsX("div", {\n  css: css`\n          font-size: calc(10px + 20vmin);\n        `\n}, "\\u{1F525}"), "-------------------"), /* @__PURE__ */ jsX("p", null, "Hey!Try to modify ", /* @__PURE__ */ jsX("code", null, "this"), " page."), /* @__PURE__ */ jsX("a", {\n  css: css`\n        color: #61dafb;\n      `,\n  href: "./edit"\n}, "Open the editor."));\n',
    "code": "import { css } from '@emotion/react';\nimport { motion } from 'framer-motion';\n\nexport default () => (\n  <header\n    css={css`\n      background-color: gre;\n      min-height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `}>\n    <motion.div\n      animate={{ rotate: 360 }}\n      transition={{\n        repeat: 0,\n        duration: 2,\n        repeatType: 'loop',\n      }}>\n      <div\n        css={css`\n          font-size: calc(10px + 20vmin);\n        `}>\n        \u{1F525}\n      </div>\n      -------------------\n    </motion.div>\n    <p>\n      Hey!Try to modify <code>this</code> page.\n    </p>\n    <a\n      css={css`\n        color: #61dafb;\n      `}\n      href=\"./edit\">\n      Open the editor.\n    </a>\n  </header>\n);\n",
    "html": '<header class="css-34wkbp">\n  <div data-projection-id="3">\n    <div class="css-15plvkc">\u{1F525}</div>\n    -------------------\n  </div>\n  <p>Hey!Try to modify <code>this</code> page.</p>\n  <a href="./edit" class="css-1v5q1ar">Open the editor.</a>\n</header>\n',
    "css": ".css-34wkbp {\n  background-color: gre;\n  min-height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n  text-align: center;\n  overflow: hidden;\n}\n.css-15plvkc {\n  font-size: calc(10px + 20vmin);\n}\n.css-1v5q1ar {\n  color: #61dafb;\n}\n"
  };
}

// src/chatRoom.ts
var Code = class {
  constructor(state, env) {
    this.env = env;
    __publicField(this, "state");
    __publicField(this, "room", "");
    __publicField(this, "kv");
    __publicField(this, "codeSpace");
    __publicField(this, "sess");
    __publicField(this, "sessionStarted");
    __publicField(this, "address");
    __publicField(this, "sessions");
    this.kv = state.storage;
    this.state = state;
    this.sessionStarted = false;
    this.sessions = [];
    this.sess = null;
    this.env = env;
    this.codeSpace = "";
    this.address = "";
    this.state.blockConcurrencyWhile(async () => {
      const backupSession = getBackupSession();
      const session = await this.kv.get("session") || backupSession;
      if (!session.code) {
        const s2 = backupSession;
        session.code = s2.code;
        session.transpiled = s2.transpiled;
        session.i = s2.i;
        session.html = s2.html;
        session.css = s2.css;
      }
      this.address = await this.kv.get("address") || "";
      this.sess = session;
      this.sessionStarted = false;
    });
  }
  async fetch(request, env, ctx) {
    const state = this.sess;
    let url = new URL(request.url);
    if (!this.sessionStarted) {
      fo(
        this.codeSpace,
        { name: this.codeSpace, state },
        url.origin
      );
      this.sessionStarted = true;
    }
    this.codeSpace = url.searchParams.get("room") || "code-main";
    return handleErrors(request, async () => {
      let path = url.pathname.slice(1).split("/");
      switch (path[0]) {
        case "":
        case "index":
        case "index.tsx":
        case "code": {
          return new Response(oo().code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "session.json":
        case "session": {
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session) {
              const { i: i2, transpiled: transpiled2, code, html: html2, css: css2 } = session;
              new Response(JSON.stringify({ i: i2, transpiled: transpiled2, code, html: html2, css: css2 }), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8"
                }
              });
            }
          }
          return new Response(JSON.stringify(oo()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "lazy":
          const { html, css, transpiled } = oo();
          const hash = Xi();
          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${this.codeSpace}"}) ;
           `,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            }
          );
        case "request": {
          return new Response(JSON.stringify({ ...request }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "hashCodeSession":
          return new Response(Xi().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "mST.mjs":
          const a2 = JSON.parse(manifestJSON2);
          const assets = {
            "ws.mjs": a2["ws.mjs"],
            "react.mjs": a2["react.mjs"],
            "emotion.mjs": a2["emotion.mjs"],
            "framer-motion.mjs": a2["framer-motion.mjs"],
            "startMonaco.mjs": a2["startMonaco.mjs"],
            "startMonaco.css": a2["startMonaco.css"]
          };
          return new Response(
            `
              export const assets=${JSON.stringify(assets)};
              export const mST=${JSON.stringify(oo())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${JSON.stringify({
              js: importMapReplace(oo().transpiled)
            })}`,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            }
          );
        case "mST":
          return new Response(
            JSON.stringify({
              mST: oo(),
              hashCode: Xi()
            }),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8"
              }
            }
          );
        case "room":
          return new Response(JSON.stringify({ codeSpace: this.codeSpace }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "index.js":
        case "js": {
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session && session.transpiled) {
              return new Response(session.transpiled, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/javascript; charset=UTF-8"
                }
              });
            }
          }
          return new Response(importMapReplace(oo().transpiled), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "env": {
          return new Response(request.url, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "hashCode": {
          const hashCode = String(Number(path[1]));
          const patch = await this.kv.get(
            hashCode
          );
          return new Response(JSON.stringify(patch || {}), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "hydrated":
        case "public": {
          const a3 = JSON.parse(manifestJSON2);
          const respText = src_default.replaceAll(
            "/live/coder/",
            `/live/${this.codeSpace}/`
          ).replace(
            `/* #root{} */`,
            `
        #root{
          height: 100%; 
        }
        ${oo().css}
        `
          ).replace("favicon.ico", a3["favicon.ico"]).replace(
            `<script async type="importmap"><\/script>`,
            `<script async type="importmap">
            ${JSON.stringify(imap)}
            <\/script>`
          ).replace(
            `<div id="root"></div>`,
            `<div id="root">
                    <div id="root-${this.codeSpace}" style="height: 100%">
                      ${oo().html}
                    </div>
              </div>
         `
          );
          const Etag = request.headers.get("Etag");
          const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cache-Control", "max-age=604800, stale-while-revalidate=86400");
          if (Etag === newEtag) {
            return new Response(null, {
              status: 304,
              statusText: "Not modified",
              headers
            });
          }
          headers.set("Content-Type", "text/html; charset=UTF-8");
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iife": {
          const startState = oo();
          const html2 = iife_default.replace(
            `/** startState **/`,
            `Object.assign(window,${JSON.stringify({
              startState,
              codeSpace: this.codeSpace,
              address: this.address
            })});`
          );
          return new Response(html2, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }
          let ip = request.headers.get("CF-Connecting-IP") || "192.100.123.1";
          let pair = new WebSocketPair();
          await this.handleSession(pair[1], ip);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }
  async handleSession(webSocket, ip) {
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new RateLimiterClient(
      () => this.env.LIMITERS.get(limiterId),
      (err) => webSocket.close(1011, err.stack)
    );
    let session = {
      name: "",
      webSocket,
      limiter,
      timestamp: Date.now(),
      blockedMessages: []
    };
    this.sessions.push(session);
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session)
    );
    let closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  async processWsMessage(msg, session) {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const { webSocket, limiter, name } = session;
    const respondWith = (obj) => session.webSocket.send(JSON.stringify(obj));
    let data;
    try {
      data = typeof msg.data === "string" ? JSON.parse(msg.data) : JSON.parse(new TextDecoder().decode(msg.data));
    } catch (exp) {
      return respondWith({
        error: "JSON parse error",
        exp: exp || {}
      });
    }
    if (!name) {
      if (data.name) {
        session.name = data.name;
        try {
          this.sessions.map((otherSession) => {
            if (otherSession === session)
              return;
            if (otherSession.name === data.name) {
              otherSession.name = "";
              otherSession.blockedMessages.map(
                (m2) => session.webSocket.send(m2)
              );
              otherSession.blockedMessages = [];
            }
          });
        } catch (e) {
          respondWith({ error: "error while checked blocked messages" });
        }
        return respondWith({
          hashCode: Xi()
        });
      }
      return respondWith({
        msg: "no-name-no-party"
      });
    }
    if (data.codeSpace && data.address && !this.address) {
      try {
        this.broadcast(data);
      } catch {
        return respondWith({
          "msg": "broadcast issue"
        });
      }
      this.address = data.address;
      await this.kv.put("address", data.address);
      return;
    }
    if (data.timestamp && !data.patch) {
      return respondWith({
        timestamp: Date.now(),
        hashCode: Xi()
      });
    }
    try {
      try {
        if (data.target && data.type && ["new-ice-candidate", "offer", "answer"].includes(data.type)) {
          return this.user2user(data.target, { ...data, name });
        }
        if (data.patch && data.oldHash && data.newHash) {
          const patch = data.patch;
          const newHash = Number(data.newHash);
          const oldHash = Number(data.oldHash);
          if (oldHash !== Xi()) {
            return respondWith({ hashCode: Xi() });
          }
          try {
            await so({ patch, newHash, oldHash });
          } catch (err) {
            return respondWith({
              msg: "strange error",
              err: err instanceof SyntaxError ? err.toString() : "Some error",
              stack: err instanceof SyntaxError ? err.stack?.toString() : "no stack",
              hash: Xi()
            });
          }
          if (newHash === Xi()) {
            try {
              this.broadcast(data);
            } catch {
              return respondWith({
                "msg": "broadcast issue"
              });
            }
            await this.kv.put("session", { ...oo() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash,
                patch
              })
            );
          }
          return respondWith({
            hashCode: Xi()
          });
        }
      } catch (exp) {
        console.error({ exp });
        return respondWith({
          error: "unknown error - e1",
          exp: exp || {}
        });
      }
    } catch (exp) {
      console.error({ exp });
      return respondWith({
        error: "unknown error - e2",
        exp: exp || {}
      });
    }
  }
  user2user(to, msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.sessions.filter((session) => session.name === to).map((s2) => s2.webSocket.send(message));
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.sessions.filter((s2) => s2.name).map((s2) => {
      try {
        s2.webSocket.send(message);
      } catch (err) {
        s2.quit = true;
        s2.blockedMessages.push(message);
      }
    });
  }
};
function importMapReplace(codeInp) {
  const items = Object.keys(imap.imports);
  let returnStr = codeInp;
  items.map((lib) => {
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      `from "${imap.imports[lib]}"`
    );
  });
  return returnStr;
}
async function sha256(myText) {
  const myY = new TextEncoder().encode(myText);
  const myDigest = await crypto.subtle.digest(
    {
      name: "SHA-256"
    },
    myY
  );
  return new TextDecoder("utf-8").decode(new Uint8Array(myDigest));
}

// src/users.ts
var Users = class {
  async fetch(_request, _env, _ctx) {
    return new Response("OKi");
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  constructor(_state, _env) {
    __publicField(this, "nextAllowedTime");
    this.nextAllowedTime = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 0.5;
      }
      let coolDown = Math.max(0, this.nextAllowedTime - now - 2);
      return new Response(`${coolDown}`);
    });
  }
};

// src/index.ts
var src_default2 = chat_default;
export {
  Code,
  CodeRateLimiter,
  Users,
  src_default2 as default
};
