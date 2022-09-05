var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
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

// ../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/Mime.js"(exports, module) {
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

// ../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// ../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/types/other.js
var require_other = __commonJS({
  "../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// ../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/index.js
var require_mime = __commonJS({
  "../../../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9c9.zip/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// ../../../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.2.0-683fd99c2f-9c9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "../../../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.2.0-683fd99c2f-9c9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
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

// ../../../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.2.0-683fd99c2f-9c9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "../../../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.2.0-683fd99c2f-9c9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
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
    "ws": ws,
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
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.5.17/dist/es-module-shims.js"><\/script>
   <script type="esms-options">
    {
      "shimMode": true
    }
    <\/script>

   <script async type="importmap-shim" src="/importmap.json"><\/script>
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

<script type="module-shim">
    import {mST, assets, codeSpace, address} from "/live/coder/mST.mjs" 
    import {run } from "ws"

    run({
      mST,
      codeSpace,
      address,
      assets
    });
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

// ../../packages/code/dist/chunk-chunk-GXKC332Z.mjs
var i = Object.create;
var d = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var k = Object.getOwnPropertyNames;
var l = Object.getPrototypeOf;
var m = Object.prototype.hasOwnProperty;
var n = (a2, b2, c) => b2 in a2 ? d(a2, b2, { enumerable: true, configurable: true, writable: true, value: c }) : a2[b2] = c;
var r = (a2, b2) => d(a2, "name", { value: b2, configurable: true });
var o = (a2, b2) => () => (a2 && (b2 = a2(a2 = 0)), b2);
var s = (a2, b2) => () => (b2 || a2((b2 = { exports: {} }).exports, b2), b2.exports);
var g = (a2, b2, c, e) => {
  if (b2 && typeof b2 == "object" || typeof b2 == "function")
    for (let f of k(b2))
      !m.call(a2, f) && f !== c && d(a2, f, { get: () => b2[f], enumerable: !(e = j(b2, f)) || e.enumerable });
  return a2;
};
var u = (a2, b2, c) => (c = a2 != null ? i(l(a2)) : {}, g(b2 || !a2 || !a2.__esModule ? d(c, "default", { value: a2, enumerable: true }) : c, a2));
var w = (a2, b2, c) => (n(a2, typeof b2 != "symbol" ? b2 + "" : b2, c), c);
var C;
var q = o(() => {
  C = { env: { NODE_ENV: "production" }, version: "1.1.1", browser: true };
});

// ../../packages/code/dist/chunk-chunk-WMQNDN7G.mjs
var Kn = s((ro, Wn) => {
  q();
  var at = -1, et = 1, W = 0;
  function sr(t, r2, e, n2) {
    if (t === r2)
      return t ? [[W, t]] : [];
    if (e != null) {
      var i2 = Hi(t, r2, e);
      if (i2)
        return i2;
    }
    var s2 = de(t, r2), u2 = t.substring(0, s2);
    t = t.substring(s2), r2 = r2.substring(s2), s2 = ye(t, r2);
    var a2 = t.substring(t.length - s2);
    t = t.substring(0, t.length - s2), r2 = r2.substring(0, r2.length - s2);
    var f = Wi(t, r2);
    return u2 && f.unshift([W, u2]), a2 && f.push([W, a2]), Un(f, n2), f;
  }
  r(sr, "diff_main");
  function Wi(t, r2) {
    var e;
    if (!t)
      return [[et, r2]];
    if (!r2)
      return [[at, t]];
    var n2 = t.length > r2.length ? t : r2, i2 = t.length > r2.length ? r2 : t, s2 = n2.indexOf(i2);
    if (s2 !== -1)
      return e = [[et, n2.substring(0, s2)], [W, i2], [et, n2.substring(s2 + i2.length)]], t.length > r2.length && (e[0][0] = e[2][0] = at), e;
    if (i2.length === 1)
      return [[at, t], [et, r2]];
    var u2 = Ji(t, r2);
    if (u2) {
      var a2 = u2[0], f = u2[1], h = u2[2], c = u2[3], p = u2[4], _ = sr(a2, h), v = sr(f, c);
      return _.concat([[W, p]], v);
    }
    return Ki(t, r2);
  }
  r(Wi, "diff_compute_");
  function Ki(t, r2) {
    for (var e = t.length, n2 = r2.length, i2 = Math.ceil((e + n2) / 2), s2 = i2, u2 = 2 * i2, a2 = new Array(u2), f = new Array(u2), h = 0; h < u2; h++)
      a2[h] = -1, f[h] = -1;
    a2[s2 + 1] = 0, f[s2 + 1] = 0;
    for (var c = e - n2, p = c % 2 !== 0, _ = 0, v = 0, l2 = 0, d2 = 0, S = 0; S < i2; S++) {
      for (var y = -S + _; y <= S - v; y += 2) {
        var w2 = s2 + y, A;
        y === -S || y !== S && a2[w2 - 1] < a2[w2 + 1] ? A = a2[w2 + 1] : A = a2[w2 - 1] + 1;
        for (var j2 = A - y; A < e && j2 < n2 && t.charAt(A) === r2.charAt(j2); )
          A++, j2++;
        if (a2[w2] = A, A > e)
          v += 2;
        else if (j2 > n2)
          _ += 2;
        else if (p) {
          var T = s2 + c - y;
          if (T >= 0 && T < u2 && f[T] !== -1) {
            var $ = e - f[T];
            if (A >= $)
              return Ln(t, r2, A, j2);
          }
        }
      }
      for (var Y = -S + l2; Y <= S - d2; Y += 2) {
        var T = s2 + Y, $;
        Y === -S || Y !== S && f[T - 1] < f[T + 1] ? $ = f[T + 1] : $ = f[T - 1] + 1;
        for (var ht = $ - Y; $ < e && ht < n2 && t.charAt(e - $ - 1) === r2.charAt(n2 - ht - 1); )
          $++, ht++;
        if (f[T] = $, $ > e)
          d2 += 2;
        else if (ht > n2)
          l2 += 2;
        else if (!p) {
          var w2 = s2 + c - Y;
          if (w2 >= 0 && w2 < u2 && a2[w2] !== -1) {
            var A = a2[w2], j2 = s2 + A - w2;
            if ($ = e - $, A >= $)
              return Ln(t, r2, A, j2);
          }
        }
      }
    }
    return [[at, t], [et, r2]];
  }
  r(Ki, "diff_bisect_");
  function Ln(t, r2, e, n2) {
    var i2 = t.substring(0, e), s2 = r2.substring(0, n2), u2 = t.substring(e), a2 = r2.substring(n2), f = sr(i2, s2), h = sr(u2, a2);
    return f.concat(h);
  }
  r(Ln, "diff_bisectSplit_");
  function de(t, r2) {
    if (!t || !r2 || t.charAt(0) !== r2.charAt(0))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r2.length), i2 = n2, s2 = 0; e < i2; )
      t.substring(s2, i2) == r2.substring(s2, i2) ? (e = i2, s2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Pn(t.charCodeAt(i2 - 1)) && i2--, i2;
  }
  r(de, "diff_commonPrefix");
  function ye(t, r2) {
    if (!t || !r2 || t.slice(-1) !== r2.slice(-1))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r2.length), i2 = n2, s2 = 0; e < i2; )
      t.substring(t.length - i2, t.length - s2) == r2.substring(r2.length - i2, r2.length - s2) ? (e = i2, s2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Bn(t.charCodeAt(t.length - i2)) && i2--, i2;
  }
  r(ye, "diff_commonSuffix");
  function Ji(t, r2) {
    var e = t.length > r2.length ? t : r2, n2 = t.length > r2.length ? r2 : t;
    if (e.length < 4 || n2.length * 2 < e.length)
      return null;
    function i2(v, l2, d2) {
      for (var S = v.substring(d2, d2 + Math.floor(v.length / 4)), y = -1, w2 = "", A, j2, T, $; (y = l2.indexOf(S, y + 1)) !== -1; ) {
        var Y = de(v.substring(d2), l2.substring(y)), ht = ye(v.substring(0, d2), l2.substring(0, y));
        w2.length < ht + Y && (w2 = l2.substring(y - ht, y) + l2.substring(y, y + Y), A = v.substring(0, d2 - ht), j2 = v.substring(d2 + Y), T = l2.substring(0, y - ht), $ = l2.substring(y + Y));
      }
      return w2.length * 2 >= v.length ? [A, j2, T, $, w2] : null;
    }
    r(i2, "diff_halfMatchI_");
    var s2 = i2(e, n2, Math.ceil(e.length / 4)), u2 = i2(e, n2, Math.ceil(e.length / 2)), a2;
    if (!s2 && !u2)
      return null;
    u2 ? s2 ? a2 = s2[4].length > u2[4].length ? s2 : u2 : a2 = u2 : a2 = s2;
    var f, h, c, p;
    t.length > r2.length ? (f = a2[0], h = a2[1], c = a2[2], p = a2[3]) : (c = a2[0], p = a2[1], f = a2[2], h = a2[3]);
    var _ = a2[4];
    return [f, h, c, p, _];
  }
  r(Ji, "diff_halfMatch_");
  function Un(t, r2) {
    t.push([W, ""]);
    for (var e = 0, n2 = 0, i2 = 0, s2 = "", u2 = "", a2; e < t.length; ) {
      if (e < t.length - 1 && !t[e][1]) {
        t.splice(e, 1);
        continue;
      }
      switch (t[e][0]) {
        case et:
          i2++, u2 += t[e][1], e++;
          break;
        case at:
          n2++, s2 += t[e][1], e++;
          break;
        case W:
          var f = e - i2 - n2 - 1;
          if (r2) {
            if (f >= 0 && kn(t[f][1])) {
              var h = t[f][1].slice(-1);
              if (t[f][1] = t[f][1].slice(0, -1), s2 = h + s2, u2 = h + u2, !t[f][1]) {
                t.splice(f, 1), e--;
                var c = f - 1;
                t[c] && t[c][0] === et && (i2++, u2 = t[c][1] + u2, c--), t[c] && t[c][0] === at && (n2++, s2 = t[c][1] + s2, c--), f = c;
              }
            }
            if (Fn(t[e][1])) {
              var h = t[e][1].charAt(0);
              t[e][1] = t[e][1].slice(1), s2 += h, u2 += h;
            }
          }
          if (e < t.length - 1 && !t[e][1]) {
            t.splice(e, 1);
            break;
          }
          if (s2.length > 0 || u2.length > 0) {
            s2.length > 0 && u2.length > 0 && (a2 = de(u2, s2), a2 !== 0 && (f >= 0 ? t[f][1] += u2.substring(0, a2) : (t.splice(0, 0, [W, u2.substring(0, a2)]), e++), u2 = u2.substring(a2), s2 = s2.substring(a2)), a2 = ye(u2, s2), a2 !== 0 && (t[e][1] = u2.substring(u2.length - a2) + t[e][1], u2 = u2.substring(0, u2.length - a2), s2 = s2.substring(0, s2.length - a2)));
            var p = i2 + n2;
            s2.length === 0 && u2.length === 0 ? (t.splice(e - p, p), e = e - p) : s2.length === 0 ? (t.splice(e - p, p, [et, u2]), e = e - p + 1) : u2.length === 0 ? (t.splice(e - p, p, [at, s2]), e = e - p + 1) : (t.splice(e - p, p, [at, s2], [et, u2]), e = e - p + 2);
          }
          e !== 0 && t[e - 1][0] === W ? (t[e - 1][1] += t[e][1], t.splice(e, 1)) : e++, i2 = 0, n2 = 0, s2 = "", u2 = "";
          break;
      }
    }
    t[t.length - 1][1] === "" && t.pop();
    var _ = false;
    for (e = 1; e < t.length - 1; )
      t[e - 1][0] === W && t[e + 1][0] === W && (t[e][1].substring(t[e][1].length - t[e - 1][1].length) === t[e - 1][1] ? (t[e][1] = t[e - 1][1] + t[e][1].substring(0, t[e][1].length - t[e - 1][1].length), t[e + 1][1] = t[e - 1][1] + t[e + 1][1], t.splice(e - 1, 1), _ = true) : t[e][1].substring(0, t[e + 1][1].length) == t[e + 1][1] && (t[e - 1][1] += t[e + 1][1], t[e][1] = t[e][1].substring(t[e + 1][1].length) + t[e + 1][1], t.splice(e + 1, 1), _ = true)), e++;
    _ && Un(t, r2);
  }
  r(Un, "diff_cleanupMerge");
  function Pn(t) {
    return t >= 55296 && t <= 56319;
  }
  r(Pn, "is_surrogate_pair_start");
  function Bn(t) {
    return t >= 56320 && t <= 57343;
  }
  r(Bn, "is_surrogate_pair_end");
  function Fn(t) {
    return Bn(t.charCodeAt(0));
  }
  r(Fn, "starts_with_pair_end");
  function kn(t) {
    return Pn(t.charCodeAt(t.length - 1));
  }
  r(kn, "ends_with_pair_start");
  function Yi(t) {
    for (var r2 = [], e = 0; e < t.length; e++)
      t[e][1].length > 0 && r2.push(t[e]);
    return r2;
  }
  r(Yi, "remove_empty_tuples");
  function le(t, r2, e, n2) {
    return kn(t) || Fn(n2) ? null : Yi([[W, t], [at, r2], [et, e], [W, n2]]);
  }
  r(le, "make_edit_splice");
  function Hi(t, r2, e) {
    var n2 = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i2 = typeof e == "number" ? null : e.newRange, s2 = t.length, u2 = r2.length;
    if (n2.length === 0 && (i2 === null || i2.length === 0)) {
      var a2 = n2.index, f = t.slice(0, a2), h = t.slice(a2), c = i2 ? i2.index : null;
      t: {
        var p = a2 + u2 - s2;
        if (c !== null && c !== p || p < 0 || p > u2)
          break t;
        var _ = r2.slice(0, p), v = r2.slice(p);
        if (v !== h)
          break t;
        var l2 = Math.min(a2, p), d2 = f.slice(0, l2), S = _.slice(0, l2);
        if (d2 !== S)
          break t;
        var y = f.slice(l2), w2 = _.slice(l2);
        return le(d2, y, w2, h);
      }
      t: {
        if (c !== null && c !== a2)
          break t;
        var A = a2, _ = r2.slice(0, A), v = r2.slice(A);
        if (_ !== f)
          break t;
        var j2 = Math.min(s2 - A, u2 - A), T = h.slice(h.length - j2), $ = v.slice(v.length - j2);
        if (T !== $)
          break t;
        var y = h.slice(0, h.length - j2), w2 = v.slice(0, v.length - j2);
        return le(f, y, w2, T);
      }
    }
    if (n2.length > 0 && i2 && i2.length === 0) {
      t: {
        var d2 = t.slice(0, n2.index), T = t.slice(n2.index + n2.length), l2 = d2.length, j2 = T.length;
        if (u2 < l2 + j2)
          break t;
        var S = r2.slice(0, l2), $ = r2.slice(u2 - j2);
        if (d2 !== S || T !== $)
          break t;
        var y = t.slice(l2, s2 - j2), w2 = r2.slice(l2, u2 - j2);
        return le(d2, y, w2, T);
      }
    }
    return null;
  }
  r(Hi, "find_cursor_edit_diff");
  function Or(t, r2, e) {
    return sr(t, r2, e, true);
  }
  r(Or, "diff");
  Or.INSERT = et;
  Or.DELETE = at;
  Or.EQUAL = W;
  Wn.exports = Or;
});
q();
q();
var Vt = "delete";
var b = 5;
var H = 1 << b;
var U = H - 1;
var g2 = {};
function Rr() {
  return { value: false };
}
r(Rr, "MakeRef");
function X(t) {
  t && (t.value = true);
}
r(X, "SetRef");
function Br() {
}
r(Br, "OwnerID");
function Et(t) {
  return t.size === void 0 && (t.size = t.__iterate(We)), t.size;
}
r(Et, "ensureSize");
function dt(t, r2) {
  if (typeof r2 != "number") {
    var e = r2 >>> 0;
    if ("" + e !== r2 || e === 4294967295)
      return NaN;
    r2 = e;
  }
  return r2 < 0 ? Et(t) + r2 : r2;
}
r(dt, "wrapIndex");
function We() {
  return true;
}
r(We, "returnTrue");
function xt(t, r2, e) {
  return (t === 0 && !Je(t) || e !== void 0 && t <= -e) && (r2 === void 0 || e !== void 0 && r2 >= e);
}
r(xt, "wholeSlice");
function Tt(t, r2) {
  return Ke(t, r2, 0);
}
r(Tt, "resolveBegin");
function tr(t, r2) {
  return Ke(t, r2, r2);
}
r(tr, "resolveEnd");
function Ke(t, r2, e) {
  return t === void 0 ? e : Je(t) ? r2 === 1 / 0 ? r2 : Math.max(0, r2 + t) | 0 : r2 === void 0 || r2 === t ? t : Math.min(r2, t) | 0;
}
r(Ke, "resolveIndex");
function Je(t) {
  return t < 0 || t === 0 && 1 / t === -1 / 0;
}
r(Je, "isNeg");
var Ye = "@@__IMMUTABLE_ITERABLE__@@";
function k2(t) {
  return Boolean(t && t[Ye]);
}
r(k2, "isCollection");
var He = "@@__IMMUTABLE_KEYED__@@";
function M(t) {
  return Boolean(t && t[He]);
}
r(M, "isKeyed");
var Xe = "@@__IMMUTABLE_INDEXED__@@";
function F(t) {
  return Boolean(t && t[Xe]);
}
r(F, "isIndexed");
function lr(t) {
  return M(t) || F(t);
}
r(lr, "isAssociative");
var q2 = r(function(r2) {
  return k2(r2) ? r2 : J(r2);
}, "Collection");
var G = function(t) {
  function r2(e) {
    return M(e) ? e : gt(e);
  }
  return r(r2, "KeyedCollection"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(q2);
var wt = function(t) {
  function r2(e) {
    return F(e) ? e : V(e);
  }
  return r(r2, "IndexedCollection"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(q2);
var $t = function(t) {
  function r2(e) {
    return k2(e) && !lr(e) ? e : Lt(e);
  }
  return r(r2, "SetCollection"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(q2);
q2.Keyed = G;
q2.Indexed = wt;
q2.Set = $t;
var Ze = "@@__IMMUTABLE_SEQ__@@";
function Fr(t) {
  return Boolean(t && t[Ze]);
}
r(Fr, "isSeq");
var Qe = "@@__IMMUTABLE_RECORD__@@";
function Dt(t) {
  return Boolean(t && t[Qe]);
}
r(Dt, "isRecord");
function st(t) {
  return k2(t) || Dt(t);
}
r(st, "isImmutable");
var Nt = "@@__IMMUTABLE_ORDERED__@@";
function tt(t) {
  return Boolean(t && t[Nt]);
}
r(tt, "isOrdered");
var rr = 0;
var rt = 1;
var Q = 2;
var jr = typeof Symbol == "function" && Symbol.iterator;
var Ge = "@@iterator";
var dr = jr || Ge;
var m2 = r(function(r2) {
  this.next = r2;
}, "Iterator");
m2.prototype.toString = r(function() {
  return "[Iterator]";
}, "toString");
m2.KEYS = rr;
m2.VALUES = rt;
m2.ENTRIES = Q;
m2.prototype.inspect = m2.prototype.toSource = function() {
  return this.toString();
};
m2.prototype[dr] = function() {
  return this;
};
function E(t, r2, e, n2) {
  var i2 = t === 0 ? r2 : t === 1 ? e : [r2, e];
  return n2 ? n2.value = i2 : n2 = { value: i2, done: false }, n2;
}
r(E, "iteratorValue");
function P() {
  return { value: void 0, done: true };
}
r(P, "iteratorDone");
function Ve(t) {
  return Array.isArray(t) ? true : !!yr(t);
}
r(Ve, "hasIterator");
function ge(t) {
  return t && typeof t.next == "function";
}
r(ge, "isIterator");
function Tr(t) {
  var r2 = yr(t);
  return r2 && r2.call(t);
}
r(Tr, "getIterator");
function yr(t) {
  var r2 = t && (jr && t[jr] || t[Ge]);
  if (typeof r2 == "function")
    return r2;
}
r(yr, "getIteratorFn");
function Qn(t) {
  var r2 = yr(t);
  return r2 && r2 === t.entries;
}
r(Qn, "isEntriesIterable");
function Gn(t) {
  var r2 = yr(t);
  return r2 && r2 === t.keys;
}
r(Gn, "isKeysIterable");
var Ct = Object.prototype.hasOwnProperty;
function xe(t) {
  return Array.isArray(t) || typeof t == "string" ? true : t && typeof t == "object" && Number.isInteger(t.length) && t.length >= 0 && (t.length === 0 ? Object.keys(t).length === 1 : t.hasOwnProperty(t.length - 1));
}
r(xe, "isArrayLike");
var J = function(t) {
  function r2(e) {
    return e == null ? Wr() : st(e) ? e.toSeq() : xn(e);
  }
  return r(r2, "Seq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toSeq = r(function() {
    return this;
  }, "toSeq"), r2.prototype.toString = r(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), r2.prototype.cacheResult = r(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this._cache;
    if (s2) {
      for (var u2 = s2.length, a2 = 0; a2 !== u2; ) {
        var f = s2[i2 ? u2 - ++a2 : a2++];
        if (n2(f[1], f[0], this) === false)
          break;
      }
      return a2;
    }
    return this.__iterateUncached(n2, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this._cache;
    if (s2) {
      var u2 = s2.length, a2 = 0;
      return new m2(function() {
        if (a2 === u2)
          return P();
        var f = s2[i2 ? u2 - ++a2 : a2++];
        return E(n2, f[0], f[1]);
      });
    }
    return this.__iteratorUncached(n2, i2);
  }, "__iterator"), r2;
}(q2);
var gt = function(t) {
  function r2(e) {
    return e == null ? Wr().toKeyedSeq() : k2(e) ? M(e) ? e.toSeq() : e.fromEntrySeq() : Dt(e) ? e.toSeq() : Kr(e);
  }
  return r(r2, "KeyedSeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toKeyedSeq = r(function() {
    return this;
  }, "toKeyedSeq"), r2;
}(J);
var V = function(t) {
  function r2(e) {
    return e == null ? Wr() : k2(e) ? M(e) ? e.entrySeq() : e.toIndexedSeq() : Dt(e) ? e.toSeq().entrySeq() : tn(e);
  }
  return r(r2, "IndexedSeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return r2(arguments);
  }, "of"), r2.prototype.toIndexedSeq = r(function() {
    return this;
  }, "toIndexedSeq"), r2.prototype.toString = r(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), r2;
}(J);
var Lt = function(t) {
  function r2(e) {
    return (k2(e) && !lr(e) ? e : V(e)).toSetSeq();
  }
  return r(r2, "SetSeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return r2(arguments);
  }, "of"), r2.prototype.toSetSeq = r(function() {
    return this;
  }, "toSetSeq"), r2;
}(J);
J.isSeq = Fr;
J.Keyed = gt;
J.Set = Lt;
J.Indexed = V;
J.prototype[Ze] = true;
var St = function(t) {
  function r2(e) {
    this._array = e, this.size = e.length;
  }
  return r(r2, "ArraySeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = r(function(n2, i2) {
    return this.has(n2) ? this._array[dt(this, n2)] : i2;
  }, "get"), r2.prototype.__iterate = r(function(n2, i2) {
    for (var s2 = this._array, u2 = s2.length, a2 = 0; a2 !== u2; ) {
      var f = i2 ? u2 - ++a2 : a2++;
      if (n2(s2[f], f, this) === false)
        break;
    }
    return a2;
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this._array, u2 = s2.length, a2 = 0;
    return new m2(function() {
      if (a2 === u2)
        return P();
      var f = i2 ? u2 - ++a2 : a2++;
      return E(n2, f, s2[f]);
    });
  }, "__iterator"), r2;
}(V);
var kr = function(t) {
  function r2(e) {
    var n2 = Object.keys(e).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : []);
    this._object = e, this._keys = n2, this.size = n2.length;
  }
  return r(r2, "ObjectSeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = r(function(n2, i2) {
    return i2 !== void 0 && !this.has(n2) ? i2 : this._object[n2];
  }, "get"), r2.prototype.has = r(function(n2) {
    return Ct.call(this._object, n2);
  }, "has"), r2.prototype.__iterate = r(function(n2, i2) {
    for (var s2 = this._object, u2 = this._keys, a2 = u2.length, f = 0; f !== a2; ) {
      var h = u2[i2 ? a2 - ++f : f++];
      if (n2(s2[h], h, this) === false)
        break;
    }
    return f;
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this._object, u2 = this._keys, a2 = u2.length, f = 0;
    return new m2(function() {
      if (f === a2)
        return P();
      var h = u2[i2 ? a2 - ++f : f++];
      return E(n2, h, s2[h]);
    });
  }, "__iterator"), r2;
}(gt);
kr.prototype[Nt] = true;
var Vn = function(t) {
  function r2(e) {
    this._collection = e, this.size = e.length || e.size;
  }
  return r(r2, "CollectionSeq"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.__iterateUncached = r(function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterate(n2, i2);
    var s2 = this._collection, u2 = Tr(s2), a2 = 0;
    if (ge(u2))
      for (var f; !(f = u2.next()).done && n2(f.value, a2++, this) !== false; )
        ;
    return a2;
  }, "__iterateUncached"), r2.prototype.__iteratorUncached = r(function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterator(n2, i2);
    var s2 = this._collection, u2 = Tr(s2);
    if (!ge(u2))
      return new m2(P);
    var a2 = 0;
    return new m2(function() {
      var f = u2.next();
      return f.done ? f : E(n2, a2++, f.value);
    });
  }, "__iteratorUncached"), r2;
}(V);
var me;
function Wr() {
  return me || (me = new St([]));
}
r(Wr, "emptySequence");
function Kr(t) {
  var r2 = Jr(t);
  if (r2)
    return r2.fromEntrySeq();
  if (typeof t == "object")
    return new kr(t);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t);
}
r(Kr, "keyedSeqFromValue");
function tn(t) {
  var r2 = Jr(t);
  if (r2)
    return r2;
  throw new TypeError("Expected Array or collection object of values: " + t);
}
r(tn, "indexedSeqFromValue");
function xn(t) {
  var r2 = Jr(t);
  if (r2)
    return Qn(t) ? r2.fromEntrySeq() : Gn(t) ? r2.toSetSeq() : r2;
  if (typeof t == "object")
    return new kr(t);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t);
}
r(xn, "seqFromValue");
function Jr(t) {
  return xe(t) ? new St(t) : Ve(t) ? new Vn(t) : void 0;
}
r(Jr, "maybeIndexedSeqFromValue");
var rn = "@@__IMMUTABLE_MAP__@@";
function Yr(t) {
  return Boolean(t && t[rn]);
}
r(Yr, "isMap");
function en(t) {
  return Yr(t) && tt(t);
}
r(en, "isOrderedMap");
function Se(t) {
  return Boolean(t && typeof t.equals == "function" && typeof t.hashCode == "function");
}
r(Se, "isValueObject");
function N(t, r2) {
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
  return !!(Se(t) && Se(r2) && t.equals(r2));
}
r(N, "is");
var Ft = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : r(function(r2, e) {
  r2 |= 0, e |= 0;
  var n2 = r2 & 65535, i2 = e & 65535;
  return n2 * i2 + ((r2 >>> 16) * i2 + n2 * (e >>> 16) << 16 >>> 0) | 0;
}, "imul");
function gr(t) {
  return t >>> 1 & 1073741824 | t & 3221225471;
}
r(gr, "smi");
var ti = Object.prototype.valueOf;
function K(t) {
  if (t == null)
    return we(t);
  if (typeof t.hashCode == "function")
    return gr(t.hashCode(t));
  var r2 = si(t);
  if (r2 == null)
    return we(r2);
  switch (typeof r2) {
    case "boolean":
      return r2 ? 1108378657 : 1108378656;
    case "number":
      return ri(r2);
    case "string":
      return r2.length > ui ? ei(r2) : $r(r2);
    case "object":
    case "function":
      return ii(r2);
    case "symbol":
      return ni(r2);
    default:
      if (typeof r2.toString == "function")
        return $r(r2.toString());
      throw new Error("Value type " + typeof r2 + " cannot be hashed.");
  }
}
r(K, "hash");
function we(t) {
  return t === null ? 1108378658 : 1108378659;
}
r(we, "hashNullish");
function ri(t) {
  if (t !== t || t === 1 / 0)
    return 0;
  var r2 = t | 0;
  for (r2 !== t && (r2 ^= t * 4294967295); t > 4294967295; )
    t /= 4294967295, r2 ^= t;
  return gr(r2);
}
r(ri, "hashNumber");
function ei(t) {
  var r2 = zr[t];
  return r2 === void 0 && (r2 = $r(t), Er === ai && (Er = 0, zr = {}), Er++, zr[t] = r2), r2;
}
r(ei, "cachedHashString");
function $r(t) {
  for (var r2 = 0, e = 0; e < t.length; e++)
    r2 = 31 * r2 + t.charCodeAt(e) | 0;
  return gr(r2);
}
r($r, "hashString");
function ni(t) {
  var r2 = be[t];
  return r2 !== void 0 || (r2 = nn(), be[t] = r2), r2;
}
r(ni, "hashSymbol");
function ii(t) {
  var r2;
  if (Dr && (r2 = Nr.get(t), r2 !== void 0) || (r2 = t[mt], r2 !== void 0) || !Ie && (r2 = t.propertyIsEnumerable && t.propertyIsEnumerable[mt], r2 !== void 0 || (r2 = oi(t), r2 !== void 0)))
    return r2;
  if (r2 = nn(), Dr)
    Nr.set(t, r2);
  else {
    if (Oe !== void 0 && Oe(t) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (Ie)
      Object.defineProperty(t, mt, { enumerable: false, configurable: false, writable: false, value: r2 });
    else if (t.propertyIsEnumerable !== void 0 && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable)
      t.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t.propertyIsEnumerable[mt] = r2;
    else if (t.nodeType !== void 0)
      t[mt] = r2;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return r2;
}
r(ii, "hashJSObj");
var Oe = Object.isExtensible;
var Ie = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function oi(t) {
  if (t && t.nodeType > 0)
    switch (t.nodeType) {
      case 1:
        return t.uniqueID;
      case 9:
        return t.documentElement && t.documentElement.uniqueID;
    }
}
r(oi, "getIENodeHash");
function si(t) {
  return t.valueOf !== ti && typeof t.valueOf == "function" ? t.valueOf(t) : t;
}
r(si, "valueOf");
function nn() {
  var t = ++br;
  return br & 1073741824 && (br = 0), t;
}
r(nn, "nextHash");
var Dr = typeof WeakMap == "function";
var Nr;
Dr && (Nr = /* @__PURE__ */ new WeakMap());
var be = /* @__PURE__ */ Object.create(null);
var br = 0;
var mt = "__immutablehash__";
typeof Symbol == "function" && (mt = Symbol(mt));
var ui = 16;
var ai = 255;
var Er = 0;
var zr = {};
var mr = function(t) {
  function r2(e, n2) {
    this._iter = e, this._useKeys = n2, this.size = e.size;
  }
  return r(r2, "ToKeyedSequence"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = r(function(n2, i2) {
    return this._iter.get(n2, i2);
  }, "get"), r2.prototype.has = r(function(n2) {
    return this._iter.has(n2);
  }, "has"), r2.prototype.valueSeq = r(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), r2.prototype.reverse = r(function() {
    var n2 = this, i2 = Hr(this, true);
    return this._useKeys || (i2.valueSeq = function() {
      return n2._iter.toSeq().reverse();
    }), i2;
  }, "reverse"), r2.prototype.map = r(function(n2, i2) {
    var s2 = this, u2 = fn(this, n2, i2);
    return this._useKeys || (u2.valueSeq = function() {
      return s2._iter.toSeq().map(n2, i2);
    }), u2;
  }, "map"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2, a2) {
      return n2(u2, a2, s2);
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    return this._iter.__iterator(n2, i2);
  }, "__iterator"), r2;
}(gt);
mr.prototype[Nt] = true;
var on = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return r(r2, "ToIndexedSequence"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.includes = r(function(n2) {
    return this._iter.includes(n2);
  }, "includes"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this, u2 = 0;
    return i2 && Et(this), this._iter.__iterate(function(a2) {
      return n2(a2, i2 ? s2.size - ++u2 : u2++, s2);
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this, u2 = this._iter.__iterator(rt, i2), a2 = 0;
    return i2 && Et(this), new m2(function() {
      var f = u2.next();
      return f.done ? f : E(n2, i2 ? s2.size - ++a2 : a2++, f.value, f);
    });
  }, "__iterator"), r2;
}(V);
var sn = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return r(r2, "ToSetSequence"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.has = r(function(n2) {
    return this._iter.includes(n2);
  }, "has"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2) {
      return n2(u2, u2, s2);
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this._iter.__iterator(rt, i2);
    return new m2(function() {
      var u2 = s2.next();
      return u2.done ? u2 : E(n2, u2.value, u2.value, u2);
    });
  }, "__iterator"), r2;
}(Lt);
var un = function(t) {
  function r2(e) {
    this._iter = e, this.size = e.size;
  }
  return r(r2, "FromEntriesSequence"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.entrySeq = r(function() {
    return this._iter.toSeq();
  }, "entrySeq"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2) {
      if (u2) {
        ze(u2);
        var a2 = k2(u2);
        return n2(a2 ? u2.get(1) : u2[1], a2 ? u2.get(0) : u2[0], s2);
      }
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this._iter.__iterator(rt, i2);
    return new m2(function() {
      for (; ; ) {
        var u2 = s2.next();
        if (u2.done)
          return u2;
        var a2 = u2.value;
        if (a2) {
          ze(a2);
          var f = k2(a2);
          return E(n2, f ? a2.get(0) : a2[0], f ? a2.get(1) : a2[1], u2);
        }
      }
    });
  }, "__iterator"), r2;
}(gt);
on.prototype.cacheResult = mr.prototype.cacheResult = sn.prototype.cacheResult = un.prototype.cacheResult = Zr;
function an(t) {
  var r2 = ut(t);
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
  }, r2.cacheResult = Zr, r2.__iterateUncached = function(e, n2) {
    var i2 = this;
    return t.__iterate(function(s2, u2) {
      return e(u2, s2, i2) !== false;
    }, n2);
  }, r2.__iteratorUncached = function(e, n2) {
    if (e === Q) {
      var i2 = t.__iterator(e, n2);
      return new m2(function() {
        var s2 = i2.next();
        if (!s2.done) {
          var u2 = s2.value[0];
          s2.value[0] = s2.value[1], s2.value[1] = u2;
        }
        return s2;
      });
    }
    return t.__iterator(e === rt ? rr : rt, n2);
  }, r2;
}
r(an, "flipFactory");
function fn(t, r2, e) {
  var n2 = ut(t);
  return n2.size = t.size, n2.has = function(i2) {
    return t.has(i2);
  }, n2.get = function(i2, s2) {
    var u2 = t.get(i2, g2);
    return u2 === g2 ? s2 : r2.call(e, u2, i2, t);
  }, n2.__iterateUncached = function(i2, s2) {
    var u2 = this;
    return t.__iterate(function(a2, f, h) {
      return i2(r2.call(e, a2, f, h), f, u2) !== false;
    }, s2);
  }, n2.__iteratorUncached = function(i2, s2) {
    var u2 = t.__iterator(Q, s2);
    return new m2(function() {
      var a2 = u2.next();
      if (a2.done)
        return a2;
      var f = a2.value, h = f[0];
      return E(i2, h, r2.call(e, f[1], h, t), a2);
    });
  }, n2;
}
r(fn, "mapFactory");
function Hr(t, r2) {
  var e = this, n2 = ut(t);
  return n2._iter = t, n2.size = t.size, n2.reverse = function() {
    return t;
  }, t.flip && (n2.flip = function() {
    var i2 = an(t);
    return i2.reverse = function() {
      return t.flip();
    }, i2;
  }), n2.get = function(i2, s2) {
    return t.get(r2 ? i2 : -1 - i2, s2);
  }, n2.has = function(i2) {
    return t.has(r2 ? i2 : -1 - i2);
  }, n2.includes = function(i2) {
    return t.includes(i2);
  }, n2.cacheResult = Zr, n2.__iterate = function(i2, s2) {
    var u2 = this, a2 = 0;
    return s2 && Et(t), t.__iterate(function(f, h) {
      return i2(f, r2 ? h : s2 ? u2.size - ++a2 : a2++, u2);
    }, !s2);
  }, n2.__iterator = function(i2, s2) {
    var u2 = 0;
    s2 && Et(t);
    var a2 = t.__iterator(Q, !s2);
    return new m2(function() {
      var f = a2.next();
      if (f.done)
        return f;
      var h = f.value;
      return E(i2, r2 ? h[0] : s2 ? e.size - ++u2 : u2++, h[1], f);
    });
  }, n2;
}
r(Hr, "reverseFactory");
function hn(t, r2, e, n2) {
  var i2 = ut(t);
  return n2 && (i2.has = function(s2) {
    var u2 = t.get(s2, g2);
    return u2 !== g2 && !!r2.call(e, u2, s2, t);
  }, i2.get = function(s2, u2) {
    var a2 = t.get(s2, g2);
    return a2 !== g2 && r2.call(e, a2, s2, t) ? a2 : u2;
  }), i2.__iterateUncached = function(s2, u2) {
    var a2 = this, f = 0;
    return t.__iterate(function(h, c, p) {
      if (r2.call(e, h, c, p))
        return f++, s2(h, n2 ? c : f - 1, a2);
    }, u2), f;
  }, i2.__iteratorUncached = function(s2, u2) {
    var a2 = t.__iterator(Q, u2), f = 0;
    return new m2(function() {
      for (; ; ) {
        var h = a2.next();
        if (h.done)
          return h;
        var c = h.value, p = c[0], _ = c[1];
        if (r2.call(e, _, p, t))
          return E(s2, n2 ? p : f++, _, h);
      }
    });
  }, i2;
}
r(hn, "filterFactory");
function fi(t, r2, e) {
  var n2 = Pt().asMutable();
  return t.__iterate(function(i2, s2) {
    n2.update(r2.call(e, i2, s2, t), 0, function(u2) {
      return u2 + 1;
    });
  }), n2.asImmutable();
}
r(fi, "countByFactory");
function hi(t, r2, e) {
  var n2 = M(t), i2 = (tt(t) ? pt() : Pt()).asMutable();
  t.__iterate(function(u2, a2) {
    i2.update(r2.call(e, u2, a2, t), function(f) {
      return f = f || [], f.push(n2 ? [a2, u2] : u2), f;
    });
  });
  var s2 = _n(t);
  return i2.map(function(u2) {
    return O(t, s2(u2));
  }).asImmutable();
}
r(hi, "groupByFactory");
function Xr(t, r2, e, n2) {
  var i2 = t.size;
  if (xt(r2, e, i2))
    return t;
  var s2 = Tt(r2, i2), u2 = tr(e, i2);
  if (s2 !== s2 || u2 !== u2)
    return Xr(t.toSeq().cacheResult(), r2, e, n2);
  var a2 = u2 - s2, f;
  a2 === a2 && (f = a2 < 0 ? 0 : a2);
  var h = ut(t);
  return h.size = f === 0 ? f : t.size && f || void 0, !n2 && Fr(t) && f >= 0 && (h.get = function(c, p) {
    return c = dt(this, c), c >= 0 && c < f ? t.get(c + s2, p) : p;
  }), h.__iterateUncached = function(c, p) {
    var _ = this;
    if (f === 0)
      return 0;
    if (p)
      return this.cacheResult().__iterate(c, p);
    var v = 0, l2 = true, d2 = 0;
    return t.__iterate(function(S, y) {
      if (!(l2 && (l2 = v++ < s2)))
        return d2++, c(S, n2 ? y : d2 - 1, _) !== false && d2 !== f;
    }), d2;
  }, h.__iteratorUncached = function(c, p) {
    if (f !== 0 && p)
      return this.cacheResult().__iterator(c, p);
    if (f === 0)
      return new m2(P);
    var _ = t.__iterator(c, p), v = 0, l2 = 0;
    return new m2(function() {
      for (; v++ < s2; )
        _.next();
      if (++l2 > f)
        return P();
      var d2 = _.next();
      return n2 || c === rt || d2.done ? d2 : c === rr ? E(c, l2 - 1, void 0, d2) : E(c, l2 - 1, d2.value[1], d2);
    });
  }, h;
}
r(Xr, "sliceFactory");
function ci(t, r2, e) {
  var n2 = ut(t);
  return n2.__iterateUncached = function(i2, s2) {
    var u2 = this;
    if (s2)
      return this.cacheResult().__iterate(i2, s2);
    var a2 = 0;
    return t.__iterate(function(f, h, c) {
      return r2.call(e, f, h, c) && ++a2 && i2(f, h, u2);
    }), a2;
  }, n2.__iteratorUncached = function(i2, s2) {
    var u2 = this;
    if (s2)
      return this.cacheResult().__iterator(i2, s2);
    var a2 = t.__iterator(Q, s2), f = true;
    return new m2(function() {
      if (!f)
        return P();
      var h = a2.next();
      if (h.done)
        return h;
      var c = h.value, p = c[0], _ = c[1];
      return r2.call(e, _, p, u2) ? i2 === Q ? h : E(i2, p, _, h) : (f = false, P());
    });
  }, n2;
}
r(ci, "takeWhileFactory");
function cn(t, r2, e, n2) {
  var i2 = ut(t);
  return i2.__iterateUncached = function(s2, u2) {
    var a2 = this;
    if (u2)
      return this.cacheResult().__iterate(s2, u2);
    var f = true, h = 0;
    return t.__iterate(function(c, p, _) {
      if (!(f && (f = r2.call(e, c, p, _))))
        return h++, s2(c, n2 ? p : h - 1, a2);
    }), h;
  }, i2.__iteratorUncached = function(s2, u2) {
    var a2 = this;
    if (u2)
      return this.cacheResult().__iterator(s2, u2);
    var f = t.__iterator(Q, u2), h = true, c = 0;
    return new m2(function() {
      var p, _, v;
      do {
        if (p = f.next(), p.done)
          return n2 || s2 === rt ? p : s2 === rr ? E(s2, c++, void 0, p) : E(s2, c++, p.value[1], p);
        var l2 = p.value;
        _ = l2[0], v = l2[1], h && (h = r2.call(e, v, _, a2));
      } while (h);
      return s2 === Q ? p : E(s2, _, v, p);
    });
  }, i2;
}
r(cn, "skipWhileFactory");
function pi(t, r2) {
  var e = M(t), n2 = [t].concat(r2).map(function(u2) {
    return k2(u2) ? e && (u2 = G(u2)) : u2 = e ? Kr(u2) : tn(Array.isArray(u2) ? u2 : [u2]), u2;
  }).filter(function(u2) {
    return u2.size !== 0;
  });
  if (n2.length === 0)
    return t;
  if (n2.length === 1) {
    var i2 = n2[0];
    if (i2 === t || e && M(i2) || F(t) && F(i2))
      return i2;
  }
  var s2 = new St(n2);
  return e ? s2 = s2.toKeyedSeq() : F(t) || (s2 = s2.toSetSeq()), s2 = s2.flatten(true), s2.size = n2.reduce(function(u2, a2) {
    if (u2 !== void 0) {
      var f = a2.size;
      if (f !== void 0)
        return u2 + f;
    }
  }, 0), s2;
}
r(pi, "concatFactory");
function pn(t, r2, e) {
  var n2 = ut(t);
  return n2.__iterateUncached = function(i2, s2) {
    if (s2)
      return this.cacheResult().__iterate(i2, s2);
    var u2 = 0, a2 = false;
    function f(h, c) {
      h.__iterate(function(p, _) {
        return (!r2 || c < r2) && k2(p) ? f(p, c + 1) : (u2++, i2(p, e ? _ : u2 - 1, n2) === false && (a2 = true)), !a2;
      }, s2);
    }
    return r(f, "flatDeep"), f(t, 0), u2;
  }, n2.__iteratorUncached = function(i2, s2) {
    if (s2)
      return this.cacheResult().__iterator(i2, s2);
    var u2 = t.__iterator(i2, s2), a2 = [], f = 0;
    return new m2(function() {
      for (; u2; ) {
        var h = u2.next();
        if (h.done !== false) {
          u2 = a2.pop();
          continue;
        }
        var c = h.value;
        if (i2 === Q && (c = c[1]), (!r2 || a2.length < r2) && k2(c))
          a2.push(u2), u2 = c.__iterator(i2, s2);
        else
          return e ? h : E(i2, f++, c, h);
      }
      return P();
    });
  }, n2;
}
r(pn, "flattenFactory");
function _i(t, r2, e) {
  var n2 = _n(t);
  return t.toSeq().map(function(i2, s2) {
    return n2(r2.call(e, i2, s2, t));
  }).flatten(true);
}
r(_i, "flatMapFactory");
function vi(t, r2) {
  var e = ut(t);
  return e.size = t.size && t.size * 2 - 1, e.__iterateUncached = function(n2, i2) {
    var s2 = this, u2 = 0;
    return t.__iterate(function(a2) {
      return (!u2 || n2(r2, u2++, s2) !== false) && n2(a2, u2++, s2) !== false;
    }, i2), u2;
  }, e.__iteratorUncached = function(n2, i2) {
    var s2 = t.__iterator(rt, i2), u2 = 0, a2;
    return new m2(function() {
      return (!a2 || u2 % 2) && (a2 = s2.next(), a2.done) ? a2 : u2 % 2 ? E(n2, u2++, r2) : E(n2, u2++, a2.value, a2);
    });
  }, e;
}
r(vi, "interposeFactory");
function zt(t, r2, e) {
  r2 || (r2 = vn);
  var n2 = M(t), i2 = 0, s2 = t.toSeq().map(function(u2, a2) {
    return [a2, u2, i2++, e ? e(u2, a2, t) : u2];
  }).valueSeq().toArray();
  return s2.sort(function(u2, a2) {
    return r2(u2[3], a2[3]) || u2[2] - a2[2];
  }).forEach(n2 ? function(u2, a2) {
    s2[a2].length = 2;
  } : function(u2, a2) {
    s2[a2] = u2[1];
  }), n2 ? gt(s2) : F(t) ? V(s2) : Lt(s2);
}
r(zt, "sortFactory");
function ur(t, r2, e) {
  if (r2 || (r2 = vn), e) {
    var n2 = t.toSeq().map(function(i2, s2) {
      return [i2, e(i2, s2, t)];
    }).reduce(function(i2, s2) {
      return Ee(r2, i2[1], s2[1]) ? s2 : i2;
    });
    return n2 && n2[0];
  }
  return t.reduce(function(i2, s2) {
    return Ee(r2, i2, s2) ? s2 : i2;
  });
}
r(ur, "maxFactory");
function Ee(t, r2, e) {
  var n2 = t(e, r2);
  return n2 === 0 && e !== r2 && (e == null || e !== e) || n2 > 0;
}
r(Ee, "maxCompare");
function ar(t, r2, e, n2) {
  var i2 = ut(t), s2 = new St(e).map(function(u2) {
    return u2.size;
  });
  return i2.size = n2 ? s2.max() : s2.min(), i2.__iterate = function(u2, a2) {
    for (var f = this.__iterator(rt, a2), h, c = 0; !(h = f.next()).done && u2(h.value, c++, this) !== false; )
      ;
    return c;
  }, i2.__iteratorUncached = function(u2, a2) {
    var f = e.map(function(p) {
      return p = q2(p), Tr(a2 ? p.reverse() : p);
    }), h = 0, c = false;
    return new m2(function() {
      var p;
      return c || (p = f.map(function(_) {
        return _.next();
      }), c = n2 ? p.every(function(_) {
        return _.done;
      }) : p.some(function(_) {
        return _.done;
      })), c ? P() : E(u2, h++, r2.apply(null, p.map(function(_) {
        return _.value;
      })));
    });
  }, i2;
}
r(ar, "zipWithFactory");
function O(t, r2) {
  return t === r2 ? t : Fr(t) ? r2 : t.constructor(r2);
}
r(O, "reify");
function ze(t) {
  if (t !== Object(t))
    throw new TypeError("Expected [K, V] tuple: " + t);
}
r(ze, "validateEntry");
function _n(t) {
  return M(t) ? G : F(t) ? wt : $t;
}
r(_n, "collectionClass");
function ut(t) {
  return Object.create((M(t) ? gt : F(t) ? V : Lt).prototype);
}
r(ut, "makeSequence");
function Zr() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : J.prototype.cacheResult.call(this);
}
r(Zr, "cacheResultThrough");
function vn(t, r2) {
  return t === void 0 && r2 === void 0 ? 0 : t === void 0 ? 1 : r2 === void 0 ? -1 : t > r2 ? 1 : t < r2 ? -1 : 0;
}
r(vn, "defaultComparator");
function ot(t, r2) {
  r2 = r2 || 0;
  for (var e = Math.max(0, t.length - r2), n2 = new Array(e), i2 = 0; i2 < e; i2++)
    n2[i2] = t[i2 + r2];
  return n2;
}
r(ot, "arrCopy");
function Qr(t, r2) {
  if (!t)
    throw new Error(r2);
}
r(Qr, "invariant");
function Z(t) {
  Qr(t !== 1 / 0, "Cannot perform this action with an infinite size.");
}
r(Z, "assertNotInfinite");
function ln(t) {
  if (xe(t) && typeof t != "string")
    return t;
  if (tt(t))
    return t.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t);
}
r(ln, "coerceKeyPath");
var li = Object.prototype.toString;
function di(t) {
  if (!t || typeof t != "object" || li.call(t) !== "[object Object]")
    return false;
  var r2 = Object.getPrototypeOf(t);
  if (r2 === null)
    return true;
  for (var e = r2, n2 = Object.getPrototypeOf(r2); n2 !== null; )
    e = n2, n2 = Object.getPrototypeOf(e);
  return e === r2;
}
r(di, "isPlainObject");
function yt(t) {
  return typeof t == "object" && (st(t) || Array.isArray(t) || di(t));
}
r(yt, "isDataStructure");
function Yt(t) {
  try {
    return typeof t == "string" ? JSON.stringify(t) : String(t);
  } catch {
    return JSON.stringify(t);
  }
}
r(Yt, "quoteString");
function yi(t, r2) {
  return st(t) ? t.has(r2) : yt(t) && Ct.call(t, r2);
}
r(yi, "has");
function dn(t, r2, e) {
  return st(t) ? t.get(r2, e) : yi(t, r2) ? typeof t.get == "function" ? t.get(r2) : t[r2] : e;
}
r(dn, "get");
function _r(t) {
  if (Array.isArray(t))
    return ot(t);
  var r2 = {};
  for (var e in t)
    Ct.call(t, e) && (r2[e] = t[e]);
  return r2;
}
r(_r, "shallowCopy");
function gi(t, r2) {
  if (!yt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (st(t)) {
    if (!t.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t);
    return t.remove(r2);
  }
  if (!Ct.call(t, r2))
    return t;
  var e = _r(t);
  return Array.isArray(e) ? e.splice(r2, 1) : delete e[r2], e;
}
r(gi, "remove");
function mi(t, r2, e) {
  if (!yt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (st(t)) {
    if (!t.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t);
    return t.set(r2, e);
  }
  if (Ct.call(t, r2) && e === t[r2])
    return t;
  var n2 = _r(t);
  return n2[r2] = e, n2;
}
r(mi, "set");
function Ut(t, r2, e, n2) {
  n2 || (n2 = e, e = void 0);
  var i2 = yn(st(t), t, ln(r2), 0, e, n2);
  return i2 === g2 ? e : i2;
}
r(Ut, "updateIn$1");
function yn(t, r2, e, n2, i2, s2) {
  var u2 = r2 === g2;
  if (n2 === e.length) {
    var a2 = u2 ? i2 : r2, f = s2(a2);
    return f === a2 ? r2 : f;
  }
  if (!u2 && !yt(r2))
    throw new TypeError("Cannot update within non-data-structure value in path [" + e.slice(0, n2).map(Yt) + "]: " + r2);
  var h = e[n2], c = u2 ? g2 : dn(r2, h, g2), p = yn(c === g2 ? t : st(c), c, e, n2 + 1, i2, s2);
  return p === c ? r2 : p === g2 ? gi(r2, h) : mi(u2 ? t ? x() : {} : r2, h, p);
}
r(yn, "updateInDeeply");
function Si(t, r2, e) {
  return Ut(t, r2, g2, function() {
    return e;
  });
}
r(Si, "setIn$1");
function Gr(t, r2) {
  return Si(this, t, r2);
}
r(Gr, "setIn");
function wi(t, r2) {
  return Ut(t, r2, function() {
    return g2;
  });
}
r(wi, "removeIn");
function Vr(t) {
  return wi(this, t);
}
r(Vr, "deleteIn");
function gn(t, r2, e, n2) {
  return Ut(t, [r2], e, n2);
}
r(gn, "update$1");
function xr(t, r2, e) {
  return arguments.length === 1 ? t(this) : gn(this, t, r2, e);
}
r(xr, "update");
function te(t, r2, e) {
  return Ut(this, t, r2, e);
}
r(te, "updateIn");
function mn() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return wn(this, t);
}
r(mn, "merge$1");
function Sn(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  if (typeof t != "function")
    throw new TypeError("Invalid merger function: " + t);
  return wn(this, r2, t);
}
r(Sn, "mergeWith$1");
function wn(t, r2, e) {
  for (var n2 = [], i2 = 0; i2 < r2.length; i2++) {
    var s2 = G(r2[i2]);
    s2.size !== 0 && n2.push(s2);
  }
  return n2.length === 0 ? t : t.toSeq().size === 0 && !t.__ownerID && n2.length === 1 ? t.constructor(n2[0]) : t.withMutations(function(u2) {
    for (var a2 = e ? function(h, c) {
      gn(u2, c, g2, function(p) {
        return p === g2 ? h : e(p, h, c);
      });
    } : function(h, c) {
      u2.set(c, h);
    }, f = 0; f < n2.length; f++)
      n2[f].forEach(a2);
  });
}
r(wn, "mergeIntoKeyedWith");
function re(t, r2, e) {
  return ee(t, r2, Oi(e));
}
r(re, "mergeDeepWithSources");
function ee(t, r2, e) {
  if (!yt(t))
    throw new TypeError("Cannot merge into non-data-structure value: " + t);
  if (st(t))
    return typeof e == "function" && t.mergeWith ? t.mergeWith.apply(t, [e].concat(r2)) : t.merge ? t.merge.apply(t, r2) : t.concat.apply(t, r2);
  for (var n2 = Array.isArray(t), i2 = t, s2 = n2 ? wt : G, u2 = n2 ? function(f) {
    i2 === t && (i2 = _r(i2)), i2.push(f);
  } : function(f, h) {
    var c = Ct.call(i2, h), p = c && e ? e(i2[h], f, h) : f;
    (!c || p !== i2[h]) && (i2 === t && (i2 = _r(i2)), i2[h] = p);
  }, a2 = 0; a2 < r2.length; a2++)
    s2(r2[a2]).forEach(u2);
  return i2;
}
r(ee, "mergeWithSources");
function Oi(t) {
  function r2(e, n2, i2) {
    return yt(e) && yt(n2) && Ii(e, n2) ? ee(e, [n2], r2) : t ? t(e, n2, i2) : n2;
  }
  return r(r2, "deepMerger"), r2;
}
r(Oi, "deepMergerWith");
function Ii(t, r2) {
  var e = J(t), n2 = J(r2);
  return F(e) === F(n2) && M(e) === M(n2);
}
r(Ii, "areMergeable");
function On() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return re(this, t);
}
r(On, "mergeDeep");
function In(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return re(this, r2, t);
}
r(In, "mergeDeepWith");
function ne(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return Ut(this, t, x(), function(n2) {
    return ee(n2, r2);
  });
}
r(ne, "mergeIn");
function ie(t) {
  for (var r2 = [], e = arguments.length - 1; e-- > 0; )
    r2[e] = arguments[e + 1];
  return Ut(this, t, x(), function(n2) {
    return re(n2, r2);
  });
}
r(ie, "mergeDeepIn");
function er(t) {
  var r2 = this.asMutable();
  return t(r2), r2.wasAltered() ? r2.__ensureOwner(this.__ownerID) : this;
}
r(er, "withMutations");
function nr() {
  return this.__ownerID ? this : this.__ensureOwner(new Br());
}
r(nr, "asMutable");
function ir() {
  return this.__ensureOwner();
}
r(ir, "asImmutable");
function oe() {
  return this.__altered;
}
r(oe, "wasAltered");
var Pt = function(t) {
  function r2(e) {
    return e == null ? x() : Yr(e) && !tt(e) ? e : x().withMutations(function(n2) {
      var i2 = t(e);
      Z(i2.size), i2.forEach(function(s2, u2) {
        return n2.set(u2, s2);
      });
    });
  }
  return r(r2, "Map"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    return x().withMutations(function(s2) {
      for (var u2 = 0; u2 < n2.length; u2 += 2) {
        if (u2 + 1 >= n2.length)
          throw new Error("Missing value for key: " + n2[u2]);
        s2.set(n2[u2], n2[u2 + 1]);
      }
    });
  }, "of"), r2.prototype.toString = r(function() {
    return this.__toString("Map {", "}");
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    return this._root ? this._root.get(0, void 0, n2, i2) : i2;
  }, "get"), r2.prototype.set = r(function(n2, i2) {
    return qe(this, n2, i2);
  }, "set"), r2.prototype.remove = r(function(n2) {
    return qe(this, n2, g2);
  }, "remove"), r2.prototype.deleteAll = r(function(n2) {
    var i2 = q2(n2);
    return i2.size === 0 ? this : this.withMutations(function(s2) {
      i2.forEach(function(u2) {
        return s2.remove(u2);
      });
    });
  }, "deleteAll"), r2.prototype.clear = r(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : x();
  }, "clear"), r2.prototype.sort = r(function(n2) {
    return pt(zt(this, n2));
  }, "sort"), r2.prototype.sortBy = r(function(n2, i2) {
    return pt(zt(this, i2, n2));
  }, "sortBy"), r2.prototype.map = r(function(n2, i2) {
    var s2 = this;
    return this.withMutations(function(u2) {
      u2.forEach(function(a2, f) {
        u2.set(f, n2.call(i2, a2, f, s2));
      });
    });
  }, "map"), r2.prototype.__iterator = r(function(n2, i2) {
    return new bi(this, n2, i2);
  }, "__iterator"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this, u2 = 0;
    return this._root && this._root.iterate(function(a2) {
      return u2++, n2(a2[1], a2[0], s2);
    }, i2), u2;
  }, "__iterate"), r2.prototype.__ensureOwner = r(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? se(this.size, this._root, n2, this.__hash) : this.size === 0 ? x() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r2;
}(G);
Pt.isMap = Yr;
var z = Pt.prototype;
z[rn] = true;
z[Vt] = z.remove;
z.removeAll = z.deleteAll;
z.setIn = Gr;
z.removeIn = z.deleteIn = Vr;
z.update = xr;
z.updateIn = te;
z.merge = z.concat = mn;
z.mergeWith = Sn;
z.mergeDeep = On;
z.mergeDeepWith = In;
z.mergeIn = ne;
z.mergeDeepIn = ie;
z.withMutations = er;
z.wasAltered = oe;
z.asImmutable = ir;
z["@@transducer/init"] = z.asMutable = nr;
z["@@transducer/step"] = function(t, r2) {
  return t.set(r2[0], r2[1]);
};
z["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var Ht = r(function(r2, e) {
  this.ownerID = r2, this.entries = e;
}, "ArrayMapNode");
Ht.prototype.get = r(function(r2, e, n2, i2) {
  for (var s2 = this.entries, u2 = 0, a2 = s2.length; u2 < a2; u2++)
    if (N(n2, s2[u2][0]))
      return s2[u2][1];
  return i2;
}, "get");
Ht.prototype.update = r(function(r2, e, n2, i2, s2, u2, a2) {
  for (var f = s2 === g2, h = this.entries, c = 0, p = h.length; c < p && !N(i2, h[c][0]); c++)
    ;
  var _ = c < p;
  if (_ ? h[c][1] === s2 : f)
    return this;
  if (X(a2), (f || !_) && X(u2), !(f && h.length === 1)) {
    if (!_ && !f && h.length >= Ri)
      return Ei(r2, h, i2, s2);
    var v = r2 && r2 === this.ownerID, l2 = v ? h : ot(h);
    return _ ? f ? c === p - 1 ? l2.pop() : l2[c] = l2.pop() : l2[c] = [i2, s2] : l2.push([i2, s2]), v ? (this.entries = l2, this) : new Ht(r2, l2);
  }
}, "update");
var Mt = r(function(r2, e, n2) {
  this.ownerID = r2, this.bitmap = e, this.nodes = n2;
}, "BitmapIndexedNode");
Mt.prototype.get = r(function(r2, e, n2, i2) {
  e === void 0 && (e = K(n2));
  var s2 = 1 << ((r2 === 0 ? e : e >>> r2) & U), u2 = this.bitmap;
  return (u2 & s2) === 0 ? i2 : this.nodes[bn(u2 & s2 - 1)].get(r2 + b, e, n2, i2);
}, "get");
Mt.prototype.update = r(function(r2, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = (e === 0 ? n2 : n2 >>> e) & U, h = 1 << f, c = this.bitmap, p = (c & h) !== 0;
  if (!p && s2 === g2)
    return this;
  var _ = bn(c & h - 1), v = this.nodes, l2 = p ? v[_] : void 0, d2 = ue(l2, r2, e + b, n2, i2, s2, u2, a2);
  if (d2 === l2)
    return this;
  if (!p && d2 && v.length >= ji)
    return Mi(r2, v, c, f, d2);
  if (p && !d2 && v.length === 2 && Re(v[_ ^ 1]))
    return v[_ ^ 1];
  if (p && d2 && v.length === 1 && Re(d2))
    return d2;
  var S = r2 && r2 === this.ownerID, y = p ? d2 ? c : c ^ h : c | h, w2 = p ? d2 ? En(v, _, d2, S) : qi(v, _, S) : Ai(v, _, d2, S);
  return S ? (this.bitmap = y, this.nodes = w2, this) : new Mt(r2, y, w2);
}, "update");
var Xt = r(function(r2, e, n2) {
  this.ownerID = r2, this.count = e, this.nodes = n2;
}, "HashArrayMapNode");
Xt.prototype.get = r(function(r2, e, n2, i2) {
  e === void 0 && (e = K(n2));
  var s2 = (r2 === 0 ? e : e >>> r2) & U, u2 = this.nodes[s2];
  return u2 ? u2.get(r2 + b, e, n2, i2) : i2;
}, "get");
Xt.prototype.update = r(function(r2, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = (e === 0 ? n2 : n2 >>> e) & U, h = s2 === g2, c = this.nodes, p = c[f];
  if (h && !p)
    return this;
  var _ = ue(p, r2, e + b, n2, i2, s2, u2, a2);
  if (_ === p)
    return this;
  var v = this.count;
  if (!p)
    v++;
  else if (!_ && (v--, v < Ti))
    return zi(r2, c, v, f);
  var l2 = r2 && r2 === this.ownerID, d2 = En(c, f, _, l2);
  return l2 ? (this.count = v, this.nodes = d2, this) : new Xt(r2, v, d2);
}, "update");
var At = r(function(r2, e, n2) {
  this.ownerID = r2, this.keyHash = e, this.entries = n2;
}, "HashCollisionNode");
At.prototype.get = r(function(r2, e, n2, i2) {
  for (var s2 = this.entries, u2 = 0, a2 = s2.length; u2 < a2; u2++)
    if (N(n2, s2[u2][0]))
      return s2[u2][1];
  return i2;
}, "get");
At.prototype.update = r(function(r2, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = s2 === g2;
  if (n2 !== this.keyHash)
    return f ? this : (X(a2), X(u2), ae(this, r2, e, n2, [i2, s2]));
  for (var h = this.entries, c = 0, p = h.length; c < p && !N(i2, h[c][0]); c++)
    ;
  var _ = c < p;
  if (_ ? h[c][1] === s2 : f)
    return this;
  if (X(a2), (f || !_) && X(u2), f && p === 2)
    return new ct(r2, this.keyHash, h[c ^ 1]);
  var v = r2 && r2 === this.ownerID, l2 = v ? h : ot(h);
  return _ ? f ? c === p - 1 ? l2.pop() : l2[c] = l2.pop() : l2[c] = [i2, s2] : l2.push([i2, s2]), v ? (this.entries = l2, this) : new At(r2, this.keyHash, l2);
}, "update");
var ct = r(function(r2, e, n2) {
  this.ownerID = r2, this.keyHash = e, this.entry = n2;
}, "ValueNode");
ct.prototype.get = r(function(r2, e, n2, i2) {
  return N(n2, this.entry[0]) ? this.entry[1] : i2;
}, "get");
ct.prototype.update = r(function(r2, e, n2, i2, s2, u2, a2) {
  var f = s2 === g2, h = N(i2, this.entry[0]);
  if (h ? s2 === this.entry[1] : f)
    return this;
  if (X(a2), f) {
    X(u2);
    return;
  }
  return h ? r2 && r2 === this.ownerID ? (this.entry[1] = s2, this) : new ct(r2, this.keyHash, [i2, s2]) : (X(u2), ae(this, r2, e, K(i2), [i2, s2]));
}, "update");
Ht.prototype.iterate = At.prototype.iterate = function(t, r2) {
  for (var e = this.entries, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++)
    if (t(e[r2 ? i2 - n2 : n2]) === false)
      return false;
};
Mt.prototype.iterate = Xt.prototype.iterate = function(t, r2) {
  for (var e = this.nodes, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++) {
    var s2 = e[r2 ? i2 - n2 : n2];
    if (s2 && s2.iterate(t, r2) === false)
      return false;
  }
};
ct.prototype.iterate = function(t, r2) {
  return t(this.entry);
};
var bi = function(t) {
  function r2(e, n2, i2) {
    this._type = n2, this._reverse = i2, this._stack = e._root && Me(e._root);
  }
  return r(r2, "MapIterator"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.next = r(function() {
    for (var n2 = this._type, i2 = this._stack; i2; ) {
      var s2 = i2.node, u2 = i2.index++, a2 = void 0;
      if (s2.entry) {
        if (u2 === 0)
          return Mr(n2, s2.entry);
      } else if (s2.entries) {
        if (a2 = s2.entries.length - 1, u2 <= a2)
          return Mr(n2, s2.entries[this._reverse ? a2 - u2 : u2]);
      } else if (a2 = s2.nodes.length - 1, u2 <= a2) {
        var f = s2.nodes[this._reverse ? a2 - u2 : u2];
        if (f) {
          if (f.entry)
            return Mr(n2, f.entry);
          i2 = this._stack = Me(f, i2);
        }
        continue;
      }
      i2 = this._stack = this._stack.__prev;
    }
    return P();
  }, "next"), r2;
}(m2);
function Mr(t, r2) {
  return E(t, r2[0], r2[1]);
}
r(Mr, "mapIteratorValue");
function Me(t, r2) {
  return { node: t, index: 0, __prev: r2 };
}
r(Me, "mapIteratorFrame");
function se(t, r2, e, n2) {
  var i2 = Object.create(z);
  return i2.size = t, i2._root = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
r(se, "makeMap");
var Ae;
function x() {
  return Ae || (Ae = se(0));
}
r(x, "emptyMap");
function qe(t, r2, e) {
  var n2, i2;
  if (t._root) {
    var s2 = Rr(), u2 = Rr();
    if (n2 = ue(t._root, t.__ownerID, 0, void 0, r2, e, s2, u2), !u2.value)
      return t;
    i2 = t.size + (s2.value ? e === g2 ? -1 : 1 : 0);
  } else {
    if (e === g2)
      return t;
    i2 = 1, n2 = new Ht(t.__ownerID, [[r2, e]]);
  }
  return t.__ownerID ? (t.size = i2, t._root = n2, t.__hash = void 0, t.__altered = true, t) : n2 ? se(i2, n2) : x();
}
r(qe, "updateMap");
function ue(t, r2, e, n2, i2, s2, u2, a2) {
  return t ? t.update(r2, e, n2, i2, s2, u2, a2) : s2 === g2 ? t : (X(a2), X(u2), new ct(r2, n2, [i2, s2]));
}
r(ue, "updateNode");
function Re(t) {
  return t.constructor === ct || t.constructor === At;
}
r(Re, "isLeafNode");
function ae(t, r2, e, n2, i2) {
  if (t.keyHash === n2)
    return new At(r2, n2, [t.entry, i2]);
  var s2 = (e === 0 ? t.keyHash : t.keyHash >>> e) & U, u2 = (e === 0 ? n2 : n2 >>> e) & U, a2, f = s2 === u2 ? [ae(t, r2, e + b, n2, i2)] : (a2 = new ct(r2, n2, i2), s2 < u2 ? [t, a2] : [a2, t]);
  return new Mt(r2, 1 << s2 | 1 << u2, f);
}
r(ae, "mergeIntoNode");
function Ei(t, r2, e, n2) {
  t || (t = new Br());
  for (var i2 = new ct(t, K(e), [e, n2]), s2 = 0; s2 < r2.length; s2++) {
    var u2 = r2[s2];
    i2 = i2.update(t, 0, void 0, u2[0], u2[1]);
  }
  return i2;
}
r(Ei, "createNodes");
function zi(t, r2, e, n2) {
  for (var i2 = 0, s2 = 0, u2 = new Array(e), a2 = 0, f = 1, h = r2.length; a2 < h; a2++, f <<= 1) {
    var c = r2[a2];
    c !== void 0 && a2 !== n2 && (i2 |= f, u2[s2++] = c);
  }
  return new Mt(t, i2, u2);
}
r(zi, "packNodes");
function Mi(t, r2, e, n2, i2) {
  for (var s2 = 0, u2 = new Array(H), a2 = 0; e !== 0; a2++, e >>>= 1)
    u2[a2] = e & 1 ? r2[s2++] : void 0;
  return u2[n2] = i2, new Xt(t, s2 + 1, u2);
}
r(Mi, "expandNodes");
function bn(t) {
  return t -= t >> 1 & 1431655765, t = (t & 858993459) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, t & 127;
}
r(bn, "popCount");
function En(t, r2, e, n2) {
  var i2 = n2 ? t : ot(t);
  return i2[r2] = e, i2;
}
r(En, "setAt");
function Ai(t, r2, e, n2) {
  var i2 = t.length + 1;
  if (n2 && r2 + 1 === i2)
    return t[r2] = e, t;
  for (var s2 = new Array(i2), u2 = 0, a2 = 0; a2 < i2; a2++)
    a2 === r2 ? (s2[a2] = e, u2 = -1) : s2[a2] = t[a2 + u2];
  return s2;
}
r(Ai, "spliceIn");
function qi(t, r2, e) {
  var n2 = t.length - 1;
  if (e && r2 === n2)
    return t.pop(), t;
  for (var i2 = new Array(n2), s2 = 0, u2 = 0; u2 < n2; u2++)
    u2 === r2 && (s2 = 1), i2[u2] = t[u2 + s2];
  return i2;
}
r(qi, "spliceOut");
var Ri = H / 4;
var ji = H / 2;
var Ti = H / 4;
var zn = "@@__IMMUTABLE_LIST__@@";
function Mn(t) {
  return Boolean(t && t[zn]);
}
r(Mn, "isList");
var Sr = function(t) {
  function r2(e) {
    var n2 = pr();
    if (e == null)
      return n2;
    if (Mn(e))
      return e;
    var i2 = t(e), s2 = i2.size;
    return s2 === 0 ? n2 : (Z(s2), s2 > 0 && s2 < H ? Zt(0, s2, b, null, new lt(i2.toArray())) : n2.withMutations(function(u2) {
      u2.setSize(s2), i2.forEach(function(a2, f) {
        return u2.set(f, a2);
      });
    }));
  }
  return r(r2, "List"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return this(arguments);
  }, "of"), r2.prototype.toString = r(function() {
    return this.__toString("List [", "]");
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    if (n2 = dt(this, n2), n2 >= 0 && n2 < this.size) {
      n2 += this._origin;
      var s2 = An(this, n2);
      return s2 && s2.array[n2 & U];
    }
    return i2;
  }, "get"), r2.prototype.set = r(function(n2, i2) {
    return $i(this, n2, i2);
  }, "set"), r2.prototype.remove = r(function(n2) {
    return this.has(n2) ? n2 === 0 ? this.shift() : n2 === this.size - 1 ? this.pop() : this.splice(n2, 1) : this;
  }, "remove"), r2.prototype.insert = r(function(n2, i2) {
    return this.splice(n2, 0, i2);
  }, "insert"), r2.prototype.clear = r(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = b, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : pr();
  }, "clear"), r2.prototype.push = r(function() {
    var n2 = arguments, i2 = this.size;
    return this.withMutations(function(s2) {
      vt(s2, 0, i2 + n2.length);
      for (var u2 = 0; u2 < n2.length; u2++)
        s2.set(i2 + u2, n2[u2]);
    });
  }, "push"), r2.prototype.pop = r(function() {
    return vt(this, 0, -1);
  }, "pop"), r2.prototype.unshift = r(function() {
    var n2 = arguments;
    return this.withMutations(function(i2) {
      vt(i2, -n2.length);
      for (var s2 = 0; s2 < n2.length; s2++)
        i2.set(s2, n2[s2]);
    });
  }, "unshift"), r2.prototype.shift = r(function() {
    return vt(this, 1);
  }, "shift"), r2.prototype.concat = r(function() {
    for (var n2 = arguments, i2 = [], s2 = 0; s2 < arguments.length; s2++) {
      var u2 = n2[s2], a2 = t(typeof u2 != "string" && Ve(u2) ? u2 : [u2]);
      a2.size !== 0 && i2.push(a2);
    }
    return i2.length === 0 ? this : this.size === 0 && !this.__ownerID && i2.length === 1 ? this.constructor(i2[0]) : this.withMutations(function(f) {
      i2.forEach(function(h) {
        return h.forEach(function(c) {
          return f.push(c);
        });
      });
    });
  }, "concat"), r2.prototype.setSize = r(function(n2) {
    return vt(this, 0, n2);
  }, "setSize"), r2.prototype.map = r(function(n2, i2) {
    var s2 = this;
    return this.withMutations(function(u2) {
      for (var a2 = 0; a2 < s2.size; a2++)
        u2.set(a2, n2.call(i2, u2.get(a2), a2, s2));
    });
  }, "map"), r2.prototype.slice = r(function(n2, i2) {
    var s2 = this.size;
    return xt(n2, i2, s2) ? this : vt(this, Tt(n2, s2), tr(i2, s2));
  }, "slice"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = i2 ? this.size : 0, u2 = je(this, i2);
    return new m2(function() {
      var a2 = u2();
      return a2 === Jt ? P() : E(n2, i2 ? --s2 : s2++, a2);
    });
  }, "__iterator"), r2.prototype.__iterate = r(function(n2, i2) {
    for (var s2 = i2 ? this.size : 0, u2 = je(this, i2), a2; (a2 = u2()) !== Jt && n2(a2, i2 ? --s2 : s2++, this) !== false; )
      ;
    return s2;
  }, "__iterate"), r2.prototype.__ensureOwner = r(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? Zt(this._origin, this._capacity, this._level, this._root, this._tail, n2, this.__hash) : this.size === 0 ? pr() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r2;
}(wt);
Sr.isList = Mn;
var D = Sr.prototype;
D[zn] = true;
D[Vt] = D.remove;
D.merge = D.concat;
D.setIn = Gr;
D.deleteIn = D.removeIn = Vr;
D.update = xr;
D.updateIn = te;
D.mergeIn = ne;
D.mergeDeepIn = ie;
D.withMutations = er;
D.wasAltered = oe;
D.asImmutable = ir;
D["@@transducer/init"] = D.asMutable = nr;
D["@@transducer/step"] = function(t, r2) {
  return t.push(r2);
};
D["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var lt = r(function(r2, e) {
  this.array = r2, this.ownerID = e;
}, "VNode");
lt.prototype.removeBefore = r(function(r2, e, n2) {
  if (n2 === e ? 1 << e : this.array.length === 0)
    return this;
  var i2 = n2 >>> e & U;
  if (i2 >= this.array.length)
    return new lt([], r2);
  var s2 = i2 === 0, u2;
  if (e > 0) {
    var a2 = this.array[i2];
    if (u2 = a2 && a2.removeBefore(r2, e - b, n2), u2 === a2 && s2)
      return this;
  }
  if (s2 && !u2)
    return this;
  var f = qt(this, r2);
  if (!s2)
    for (var h = 0; h < i2; h++)
      f.array[h] = void 0;
  return u2 && (f.array[i2] = u2), f;
}, "removeBefore");
lt.prototype.removeAfter = r(function(r2, e, n2) {
  if (n2 === (e ? 1 << e : 0) || this.array.length === 0)
    return this;
  var i2 = n2 - 1 >>> e & U;
  if (i2 >= this.array.length)
    return this;
  var s2;
  if (e > 0) {
    var u2 = this.array[i2];
    if (s2 = u2 && u2.removeAfter(r2, e - b, n2), s2 === u2 && i2 === this.array.length - 1)
      return this;
  }
  var a2 = qt(this, r2);
  return a2.array.splice(i2 + 1), s2 && (a2.array[i2] = s2), a2;
}, "removeAfter");
var Jt = {};
function je(t, r2) {
  var e = t._origin, n2 = t._capacity, i2 = Qt(n2), s2 = t._tail;
  return u2(t._root, t._level, 0);
  function u2(h, c, p) {
    return c === 0 ? a2(h, p) : f(h, c, p);
  }
  function a2(h, c) {
    var p = c === i2 ? s2 && s2.array : h && h.array, _ = c > e ? 0 : e - c, v = n2 - c;
    return v > H && (v = H), function() {
      if (_ === v)
        return Jt;
      var l2 = r2 ? --v : _++;
      return p && p[l2];
    };
  }
  function f(h, c, p) {
    var _, v = h && h.array, l2 = p > e ? 0 : e - p >> c, d2 = (n2 - p >> c) + 1;
    return d2 > H && (d2 = H), function() {
      for (; ; ) {
        if (_) {
          var S = _();
          if (S !== Jt)
            return S;
          _ = null;
        }
        if (l2 === d2)
          return Jt;
        var y = r2 ? --d2 : l2++;
        _ = u2(v && v[y], c - b, p + (y << c));
      }
    };
  }
}
r(je, "iterateList");
function Zt(t, r2, e, n2, i2, s2, u2) {
  var a2 = Object.create(D);
  return a2.size = r2 - t, a2._origin = t, a2._capacity = r2, a2._level = e, a2._root = n2, a2._tail = i2, a2.__ownerID = s2, a2.__hash = u2, a2.__altered = false, a2;
}
r(Zt, "makeList");
var Te;
function pr() {
  return Te || (Te = Zt(0, 0, b));
}
r(pr, "emptyList");
function $i(t, r2, e) {
  if (r2 = dt(t, r2), r2 !== r2)
    return t;
  if (r2 >= t.size || r2 < 0)
    return t.withMutations(function(u2) {
      r2 < 0 ? vt(u2, r2).set(0, e) : vt(u2, 0, r2 + 1).set(r2, e);
    });
  r2 += t._origin;
  var n2 = t._tail, i2 = t._root, s2 = Rr();
  return r2 >= Qt(t._capacity) ? n2 = Cr(n2, t.__ownerID, 0, r2, e, s2) : i2 = Cr(i2, t.__ownerID, t._level, r2, e, s2), s2.value ? t.__ownerID ? (t._root = i2, t._tail = n2, t.__hash = void 0, t.__altered = true, t) : Zt(t._origin, t._capacity, t._level, i2, n2) : t;
}
r($i, "updateList");
function Cr(t, r2, e, n2, i2, s2) {
  var u2 = n2 >>> e & U, a2 = t && u2 < t.array.length;
  if (!a2 && i2 === void 0)
    return t;
  var f;
  if (e > 0) {
    var h = t && t.array[u2], c = Cr(h, r2, e - b, n2, i2, s2);
    return c === h ? t : (f = qt(t, r2), f.array[u2] = c, f);
  }
  return a2 && t.array[u2] === i2 ? t : (s2 && X(s2), f = qt(t, r2), i2 === void 0 && u2 === f.array.length - 1 ? f.array.pop() : f.array[u2] = i2, f);
}
r(Cr, "updateVNode");
function qt(t, r2) {
  return r2 && t && r2 === t.ownerID ? t : new lt(t ? t.array.slice() : [], r2);
}
r(qt, "editableVNode");
function An(t, r2) {
  if (r2 >= Qt(t._capacity))
    return t._tail;
  if (r2 < 1 << t._level + b) {
    for (var e = t._root, n2 = t._level; e && n2 > 0; )
      e = e.array[r2 >>> n2 & U], n2 -= b;
    return e;
  }
}
r(An, "listNodeFor");
function vt(t, r2, e) {
  r2 !== void 0 && (r2 |= 0), e !== void 0 && (e |= 0);
  var n2 = t.__ownerID || new Br(), i2 = t._origin, s2 = t._capacity, u2 = i2 + r2, a2 = e === void 0 ? s2 : e < 0 ? s2 + e : i2 + e;
  if (u2 === i2 && a2 === s2)
    return t;
  if (u2 >= a2)
    return t.clear();
  for (var f = t._level, h = t._root, c = 0; u2 + c < 0; )
    h = new lt(h && h.array.length ? [void 0, h] : [], n2), f += b, c += 1 << f;
  c && (u2 += c, i2 += c, a2 += c, s2 += c);
  for (var p = Qt(s2), _ = Qt(a2); _ >= 1 << f + b; )
    h = new lt(h && h.array.length ? [h] : [], n2), f += b;
  var v = t._tail, l2 = _ < p ? An(t, a2 - 1) : _ > p ? new lt([], n2) : v;
  if (v && _ > p && u2 < s2 && v.array.length) {
    h = qt(h, n2);
    for (var d2 = h, S = f; S > b; S -= b) {
      var y = p >>> S & U;
      d2 = d2.array[y] = qt(d2.array[y], n2);
    }
    d2.array[p >>> b & U] = v;
  }
  if (a2 < s2 && (l2 = l2 && l2.removeAfter(n2, 0, a2)), u2 >= _)
    u2 -= _, a2 -= _, f = b, h = null, l2 = l2 && l2.removeBefore(n2, 0, u2);
  else if (u2 > i2 || _ < p) {
    for (c = 0; h; ) {
      var w2 = u2 >>> f & U;
      if (w2 !== _ >>> f & U)
        break;
      w2 && (c += (1 << f) * w2), f -= b, h = h.array[w2];
    }
    h && u2 > i2 && (h = h.removeBefore(n2, f, u2 - c)), h && _ < p && (h = h.removeAfter(n2, f, _ - c)), c && (u2 -= c, a2 -= c);
  }
  return t.__ownerID ? (t.size = a2 - u2, t._origin = u2, t._capacity = a2, t._level = f, t._root = h, t._tail = l2, t.__hash = void 0, t.__altered = true, t) : Zt(u2, a2, f, h, l2);
}
r(vt, "setListBounds");
function Qt(t) {
  return t < H ? 0 : t - 1 >>> b << b;
}
r(Qt, "getTailOffset");
var pt = function(t) {
  function r2(e) {
    return e == null ? kt() : en(e) ? e : kt().withMutations(function(n2) {
      var i2 = G(e);
      Z(i2.size), i2.forEach(function(s2, u2) {
        return n2.set(u2, s2);
      });
    });
  }
  return r(r2, "OrderedMap"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return this(arguments);
  }, "of"), r2.prototype.toString = r(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    var s2 = this._map.get(n2);
    return s2 !== void 0 ? this._list.get(s2)[1] : i2;
  }, "get"), r2.prototype.clear = r(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : kt();
  }, "clear"), r2.prototype.set = r(function(n2, i2) {
    return De(this, n2, i2);
  }, "set"), r2.prototype.remove = r(function(n2) {
    return De(this, n2, g2);
  }, "remove"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    return this._list.__iterate(function(u2) {
      return u2 && n2(u2[1], u2[0], s2);
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    return this._list.fromEntrySeq().__iterator(n2, i2);
  }, "__iterator"), r2.prototype.__ensureOwner = r(function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2), s2 = this._list.__ensureOwner(n2);
    return n2 ? fe(i2, s2, n2, this.__hash) : this.size === 0 ? kt() : (this.__ownerID = n2, this.__altered = false, this._map = i2, this._list = s2, this);
  }, "__ensureOwner"), r2;
}(Pt);
pt.isOrderedMap = en;
pt.prototype[Nt] = true;
pt.prototype[Vt] = pt.prototype.remove;
function fe(t, r2, e, n2) {
  var i2 = Object.create(pt.prototype);
  return i2.size = t ? t.size : 0, i2._map = t, i2._list = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
r(fe, "makeOrderedMap");
var $e;
function kt() {
  return $e || ($e = fe(x(), pr()));
}
r(kt, "emptyOrderedMap");
function De(t, r2, e) {
  var n2 = t._map, i2 = t._list, s2 = n2.get(r2), u2 = s2 !== void 0, a2, f;
  if (e === g2) {
    if (!u2)
      return t;
    i2.size >= H && i2.size >= n2.size * 2 ? (f = i2.filter(function(h, c) {
      return h !== void 0 && s2 !== c;
    }), a2 = f.toKeyedSeq().map(function(h) {
      return h[0];
    }).flip().toMap(), t.__ownerID && (a2.__ownerID = f.__ownerID = t.__ownerID)) : (a2 = n2.remove(r2), f = s2 === i2.size - 1 ? i2.pop() : i2.set(s2, void 0));
  } else if (u2) {
    if (e === i2.get(s2)[1])
      return t;
    a2 = n2, f = i2.set(s2, [r2, e]);
  } else
    a2 = n2.set(r2, i2.size), f = i2.set(i2.size, [r2, e]);
  return t.__ownerID ? (t.size = a2.size, t._map = a2, t._list = f, t.__hash = void 0, t.__altered = true, t) : fe(a2, f);
}
r(De, "updateOrderedMap");
var qn = "@@__IMMUTABLE_STACK__@@";
function Lr(t) {
  return Boolean(t && t[qn]);
}
r(Lr, "isStack");
var he = function(t) {
  function r2(e) {
    return e == null ? fr() : Lr(e) ? e : fr().pushAll(e);
  }
  return r(r2, "Stack"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return this(arguments);
  }, "of"), r2.prototype.toString = r(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    var s2 = this._head;
    for (n2 = dt(this, n2); s2 && n2--; )
      s2 = s2.next;
    return s2 ? s2.value : i2;
  }, "get"), r2.prototype.peek = r(function() {
    return this._head && this._head.value;
  }, "peek"), r2.prototype.push = r(function() {
    var n2 = arguments;
    if (arguments.length === 0)
      return this;
    for (var i2 = this.size + arguments.length, s2 = this._head, u2 = arguments.length - 1; u2 >= 0; u2--)
      s2 = { value: n2[u2], next: s2 };
    return this.__ownerID ? (this.size = i2, this._head = s2, this.__hash = void 0, this.__altered = true, this) : Wt(i2, s2);
  }, "push"), r2.prototype.pushAll = r(function(n2) {
    if (n2 = t(n2), n2.size === 0)
      return this;
    if (this.size === 0 && Lr(n2))
      return n2;
    Z(n2.size);
    var i2 = this.size, s2 = this._head;
    return n2.__iterate(function(u2) {
      i2++, s2 = { value: u2, next: s2 };
    }, true), this.__ownerID ? (this.size = i2, this._head = s2, this.__hash = void 0, this.__altered = true, this) : Wt(i2, s2);
  }, "pushAll"), r2.prototype.pop = r(function() {
    return this.slice(1);
  }, "pop"), r2.prototype.clear = r(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : fr();
  }, "clear"), r2.prototype.slice = r(function(n2, i2) {
    if (xt(n2, i2, this.size))
      return this;
    var s2 = Tt(n2, this.size), u2 = tr(i2, this.size);
    if (u2 !== this.size)
      return t.prototype.slice.call(this, n2, i2);
    for (var a2 = this.size - s2, f = this._head; s2--; )
      f = f.next;
    return this.__ownerID ? (this.size = a2, this._head = f, this.__hash = void 0, this.__altered = true, this) : Wt(a2, f);
  }, "slice"), r2.prototype.__ensureOwner = r(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? Wt(this.size, this._head, n2, this.__hash) : this.size === 0 ? fr() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    if (i2)
      return new St(this.toArray()).__iterate(function(f, h) {
        return n2(f, h, s2);
      }, i2);
    for (var u2 = 0, a2 = this._head; a2 && n2(a2.value, u2++, this) !== false; )
      a2 = a2.next;
    return u2;
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    if (i2)
      return new St(this.toArray()).__iterator(n2, i2);
    var s2 = 0, u2 = this._head;
    return new m2(function() {
      if (u2) {
        var a2 = u2.value;
        return u2 = u2.next, E(n2, s2++, a2);
      }
      return P();
    });
  }, "__iterator"), r2;
}(wt);
he.isStack = Lr;
var B = he.prototype;
B[qn] = true;
B.shift = B.pop;
B.unshift = B.push;
B.unshiftAll = B.pushAll;
B.withMutations = er;
B.wasAltered = oe;
B.asImmutable = ir;
B["@@transducer/init"] = B.asMutable = nr;
B["@@transducer/step"] = function(t, r2) {
  return t.unshift(r2);
};
B["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
function Wt(t, r2, e, n2) {
  var i2 = Object.create(B);
  return i2.size = t, i2._head = r2, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
r(Wt, "makeStack");
var Ne;
function fr() {
  return Ne || (Ne = Wt(0));
}
r(fr, "emptyStack");
var Rn = "@@__IMMUTABLE_SET__@@";
function ce(t) {
  return Boolean(t && t[Rn]);
}
r(ce, "isSet");
function jn(t) {
  return ce(t) && tt(t);
}
r(jn, "isOrderedSet");
function pe(t, r2) {
  if (t === r2)
    return true;
  if (!k2(r2) || t.size !== void 0 && r2.size !== void 0 && t.size !== r2.size || t.__hash !== void 0 && r2.__hash !== void 0 && t.__hash !== r2.__hash || M(t) !== M(r2) || F(t) !== F(r2) || tt(t) !== tt(r2))
    return false;
  if (t.size === 0 && r2.size === 0)
    return true;
  var e = !lr(t);
  if (tt(t)) {
    var n2 = t.entries();
    return r2.every(function(f, h) {
      var c = n2.next().value;
      return c && N(c[1], f) && (e || N(c[0], h));
    }) && n2.next().done;
  }
  var i2 = false;
  if (t.size === void 0)
    if (r2.size === void 0)
      typeof t.cacheResult == "function" && t.cacheResult();
    else {
      i2 = true;
      var s2 = t;
      t = r2, r2 = s2;
    }
  var u2 = true, a2 = r2.__iterate(function(f, h) {
    if (e ? !t.has(f) : i2 ? !N(f, t.get(h, g2)) : !N(t.get(h, g2), f))
      return u2 = false, false;
  });
  return u2 && t.size === a2;
}
r(pe, "deepEqual");
function Ot(t, r2) {
  var e = r(function(n2) {
    t.prototype[n2] = r2[n2];
  }, "keyCopier");
  return Object.keys(r2).forEach(e), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(r2).forEach(e), t;
}
r(Ot, "mixin");
function vr(t) {
  if (!t || typeof t != "object")
    return t;
  if (!k2(t)) {
    if (!yt(t))
      return t;
    t = J(t);
  }
  if (M(t)) {
    var r2 = {};
    return t.__iterate(function(n2, i2) {
      r2[i2] = vr(n2);
    }), r2;
  }
  var e = [];
  return t.__iterate(function(n2) {
    e.push(vr(n2));
  }), e;
}
r(vr, "toJS");
var wr = function(t) {
  function r2(e) {
    return e == null ? Kt() : ce(e) && !tt(e) ? e : Kt().withMutations(function(n2) {
      var i2 = t(e);
      Z(i2.size), i2.forEach(function(s2) {
        return n2.add(s2);
      });
    });
  }
  return r(r2, "Set"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return this(arguments);
  }, "of"), r2.fromKeys = r(function(n2) {
    return this(G(n2).keySeq());
  }, "fromKeys"), r2.intersect = r(function(n2) {
    return n2 = q2(n2).toArray(), n2.length ? C2.intersect.apply(r2(n2.pop()), n2) : Kt();
  }, "intersect"), r2.union = r(function(n2) {
    return n2 = q2(n2).toArray(), n2.length ? C2.union.apply(r2(n2.pop()), n2) : Kt();
  }, "union"), r2.prototype.toString = r(function() {
    return this.__toString("Set {", "}");
  }, "toString"), r2.prototype.has = r(function(n2) {
    return this._map.has(n2);
  }, "has"), r2.prototype.add = r(function(n2) {
    return hr(this, this._map.set(n2, n2));
  }, "add"), r2.prototype.remove = r(function(n2) {
    return hr(this, this._map.remove(n2));
  }, "remove"), r2.prototype.clear = r(function() {
    return hr(this, this._map.clear());
  }, "clear"), r2.prototype.map = r(function(n2, i2) {
    var s2 = this, u2 = false, a2 = hr(this, this._map.mapEntries(function(f) {
      var h = f[1], c = n2.call(i2, h, h, s2);
      return c !== h && (u2 = true), [c, c];
    }, i2));
    return u2 ? a2 : this;
  }, "map"), r2.prototype.union = r(function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    return n2 = n2.filter(function(s2) {
      return s2.size !== 0;
    }), n2.length === 0 ? this : this.size === 0 && !this.__ownerID && n2.length === 1 ? this.constructor(n2[0]) : this.withMutations(function(s2) {
      for (var u2 = 0; u2 < n2.length; u2++)
        t(n2[u2]).forEach(function(a2) {
          return s2.add(a2);
        });
    });
  }, "union"), r2.prototype.intersect = r(function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    if (n2.length === 0)
      return this;
    n2 = n2.map(function(u2) {
      return t(u2);
    });
    var s2 = [];
    return this.forEach(function(u2) {
      n2.every(function(a2) {
        return a2.includes(u2);
      }) || s2.push(u2);
    }), this.withMutations(function(u2) {
      s2.forEach(function(a2) {
        u2.remove(a2);
      });
    });
  }, "intersect"), r2.prototype.subtract = r(function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    if (n2.length === 0)
      return this;
    n2 = n2.map(function(u2) {
      return t(u2);
    });
    var s2 = [];
    return this.forEach(function(u2) {
      n2.some(function(a2) {
        return a2.includes(u2);
      }) && s2.push(u2);
    }), this.withMutations(function(u2) {
      s2.forEach(function(a2) {
        u2.remove(a2);
      });
    });
  }, "subtract"), r2.prototype.sort = r(function(n2) {
    return Gt(zt(this, n2));
  }, "sort"), r2.prototype.sortBy = r(function(n2, i2) {
    return Gt(zt(this, i2, n2));
  }, "sortBy"), r2.prototype.wasAltered = r(function() {
    return this._map.wasAltered();
  }, "wasAltered"), r2.prototype.__iterate = r(function(n2, i2) {
    var s2 = this;
    return this._map.__iterate(function(u2) {
      return n2(u2, u2, s2);
    }, i2);
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    return this._map.__iterator(n2, i2);
  }, "__iterator"), r2.prototype.__ensureOwner = r(function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2);
    return n2 ? this.__make(i2, n2) : this.size === 0 ? this.__empty() : (this.__ownerID = n2, this._map = i2, this);
  }, "__ensureOwner"), r2;
}($t);
wr.isSet = ce;
var C2 = wr.prototype;
C2[Rn] = true;
C2[Vt] = C2.remove;
C2.merge = C2.concat = C2.union;
C2.withMutations = er;
C2.asImmutable = ir;
C2["@@transducer/init"] = C2.asMutable = nr;
C2["@@transducer/step"] = function(t, r2) {
  return t.add(r2);
};
C2["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
C2.__empty = Kt;
C2.__make = Tn;
function hr(t, r2) {
  return t.__ownerID ? (t.size = r2.size, t._map = r2, t) : r2 === t._map ? t : r2.size === 0 ? t.__empty() : t.__make(r2);
}
r(hr, "updateSet");
function Tn(t, r2) {
  var e = Object.create(C2);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r2, e;
}
r(Tn, "makeSet");
var Ce;
function Kt() {
  return Ce || (Ce = Tn(x()));
}
r(Kt, "emptySet");
var Di = function(t) {
  function r2(e, n2, i2) {
    if (!(this instanceof r2))
      return new r2(e, n2, i2);
    if (Qr(i2 !== 0, "Cannot step a Range by 0"), e = e || 0, n2 === void 0 && (n2 = 1 / 0), i2 = i2 === void 0 ? 1 : Math.abs(i2), n2 < e && (i2 = -i2), this._start = e, this._end = n2, this._step = i2, this.size = Math.max(0, Math.ceil((n2 - e) / i2 - 1) + 1), this.size === 0) {
      if (Ar)
        return Ar;
      Ar = this;
    }
  }
  return r(r2, "Range"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = r(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    return this.has(n2) ? this._start + dt(this, n2) * this._step : i2;
  }, "get"), r2.prototype.includes = r(function(n2) {
    var i2 = (n2 - this._start) / this._step;
    return i2 >= 0 && i2 < this.size && i2 === Math.floor(i2);
  }, "includes"), r2.prototype.slice = r(function(n2, i2) {
    return xt(n2, i2, this.size) ? this : (n2 = Tt(n2, this.size), i2 = tr(i2, this.size), i2 <= n2 ? new r2(0, 0) : new r2(this.get(n2, this._end), this.get(i2, this._end), this._step));
  }, "slice"), r2.prototype.indexOf = r(function(n2) {
    var i2 = n2 - this._start;
    if (i2 % this._step === 0) {
      var s2 = i2 / this._step;
      if (s2 >= 0 && s2 < this.size)
        return s2;
    }
    return -1;
  }, "indexOf"), r2.prototype.lastIndexOf = r(function(n2) {
    return this.indexOf(n2);
  }, "lastIndexOf"), r2.prototype.__iterate = r(function(n2, i2) {
    for (var s2 = this.size, u2 = this._step, a2 = i2 ? this._start + (s2 - 1) * u2 : this._start, f = 0; f !== s2 && n2(a2, i2 ? s2 - ++f : f++, this) !== false; )
      a2 += i2 ? -u2 : u2;
    return f;
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this.size, u2 = this._step, a2 = i2 ? this._start + (s2 - 1) * u2 : this._start, f = 0;
    return new m2(function() {
      if (f === s2)
        return P();
      var h = a2;
      return a2 += i2 ? -u2 : u2, E(n2, i2 ? s2 - ++f : f++, h);
    });
  }, "__iterator"), r2.prototype.equals = r(function(n2) {
    return n2 instanceof r2 ? this._start === n2._start && this._end === n2._end && this._step === n2._step : pe(this, n2);
  }, "equals"), r2;
}(V);
var Ar;
function $n(t, r2, e) {
  for (var n2 = ln(r2), i2 = 0; i2 !== n2.length; )
    if (t = dn(t, n2[i2++], g2), t === g2)
      return e;
  return t;
}
r($n, "getIn$1");
function Dn(t, r2) {
  return $n(this, t, r2);
}
r(Dn, "getIn");
function Ni(t, r2) {
  return $n(t, r2, g2) !== g2;
}
r(Ni, "hasIn$1");
function Ci(t) {
  return Ni(this, t);
}
r(Ci, "hasIn");
function Nn() {
  Z(this.size);
  var t = {};
  return this.__iterate(function(r2, e) {
    t[e] = r2;
  }), t;
}
r(Nn, "toObject");
q2.isIterable = k2;
q2.isKeyed = M;
q2.isIndexed = F;
q2.isAssociative = lr;
q2.isOrdered = tt;
q2.Iterator = m2;
Ot(q2, { toArray: r(function() {
  Z(this.size);
  var r2 = new Array(this.size || 0), e = M(this), n2 = 0;
  return this.__iterate(function(i2, s2) {
    r2[n2++] = e ? [s2, i2] : i2;
  }), r2;
}, "toArray"), toIndexedSeq: r(function() {
  return new on(this);
}, "toIndexedSeq"), toJS: r(function() {
  return vr(this);
}, "toJS$1"), toKeyedSeq: r(function() {
  return new mr(this, true);
}, "toKeyedSeq"), toMap: r(function() {
  return Pt(this.toKeyedSeq());
}, "toMap"), toObject: Nn, toOrderedMap: r(function() {
  return pt(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: r(function() {
  return Gt(M(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: r(function() {
  return wr(M(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: r(function() {
  return new sn(this);
}, "toSetSeq"), toSeq: r(function() {
  return F(this) ? this.toIndexedSeq() : M(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: r(function() {
  return he(M(this) ? this.valueSeq() : this);
}, "toStack"), toList: r(function() {
  return Sr(M(this) ? this.valueSeq() : this);
}, "toList"), toString: r(function() {
  return "[Collection]";
}, "toString"), __toString: r(function(r2, e) {
  return this.size === 0 ? r2 + e : r2 + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e;
}, "__toString"), concat: r(function() {
  for (var r2 = [], e = arguments.length; e--; )
    r2[e] = arguments[e];
  return O(this, pi(this, r2));
}, "concat"), includes: r(function(r2) {
  return this.some(function(e) {
    return N(e, r2);
  });
}, "includes"), entries: r(function() {
  return this.__iterator(Q);
}, "entries"), every: r(function(r2, e) {
  Z(this.size);
  var n2 = true;
  return this.__iterate(function(i2, s2, u2) {
    if (!r2.call(e, i2, s2, u2))
      return n2 = false, false;
  }), n2;
}, "every"), filter: r(function(r2, e) {
  return O(this, hn(this, r2, e, true));
}, "filter"), find: r(function(r2, e, n2) {
  var i2 = this.findEntry(r2, e);
  return i2 ? i2[1] : n2;
}, "find"), forEach: r(function(r2, e) {
  return Z(this.size), this.__iterate(e ? r2.bind(e) : r2);
}, "forEach"), join: r(function(r2) {
  Z(this.size), r2 = r2 !== void 0 ? "" + r2 : ",";
  var e = "", n2 = true;
  return this.__iterate(function(i2) {
    n2 ? n2 = false : e += r2, e += i2 != null ? i2.toString() : "";
  }), e;
}, "join"), keys: r(function() {
  return this.__iterator(rr);
}, "keys"), map: r(function(r2, e) {
  return O(this, fn(this, r2, e));
}, "map"), reduce: r(function(r2, e, n2) {
  return Le(this, r2, e, n2, arguments.length < 2, false);
}, "reduce$1"), reduceRight: r(function(r2, e, n2) {
  return Le(this, r2, e, n2, arguments.length < 2, true);
}, "reduceRight"), reverse: r(function() {
  return O(this, Hr(this, true));
}, "reverse"), slice: r(function(r2, e) {
  return O(this, Xr(this, r2, e, true));
}, "slice"), some: r(function(r2, e) {
  return !this.every(cr(r2), e);
}, "some"), sort: r(function(r2) {
  return O(this, zt(this, r2));
}, "sort"), values: r(function() {
  return this.__iterator(rt);
}, "values"), butLast: r(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: r(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: r(function(r2, e) {
  return Et(r2 ? this.toSeq().filter(r2, e) : this);
}, "count"), countBy: r(function(r2, e) {
  return fi(this, r2, e);
}, "countBy"), equals: r(function(r2) {
  return pe(this, r2);
}, "equals"), entrySeq: r(function() {
  var r2 = this;
  if (r2._cache)
    return new St(r2._cache);
  var e = r2.toSeq().map(Ui).toIndexedSeq();
  return e.fromEntrySeq = function() {
    return r2.toSeq();
  }, e;
}, "entrySeq"), filterNot: r(function(r2, e) {
  return this.filter(cr(r2), e);
}, "filterNot"), findEntry: r(function(r2, e, n2) {
  var i2 = n2;
  return this.__iterate(function(s2, u2, a2) {
    if (r2.call(e, s2, u2, a2))
      return i2 = [u2, s2], false;
  }), i2;
}, "findEntry"), findKey: r(function(r2, e) {
  var n2 = this.findEntry(r2, e);
  return n2 && n2[0];
}, "findKey"), findLast: r(function(r2, e, n2) {
  return this.toKeyedSeq().reverse().find(r2, e, n2);
}, "findLast"), findLastEntry: r(function(r2, e, n2) {
  return this.toKeyedSeq().reverse().findEntry(r2, e, n2);
}, "findLastEntry"), findLastKey: r(function(r2, e) {
  return this.toKeyedSeq().reverse().findKey(r2, e);
}, "findLastKey"), first: r(function(r2) {
  return this.find(We, null, r2);
}, "first"), flatMap: r(function(r2, e) {
  return O(this, _i(this, r2, e));
}, "flatMap"), flatten: r(function(r2) {
  return O(this, pn(this, r2, true));
}, "flatten"), fromEntrySeq: r(function() {
  return new un(this);
}, "fromEntrySeq"), get: r(function(r2, e) {
  return this.find(function(n2, i2) {
    return N(i2, r2);
  }, void 0, e);
}, "get"), getIn: Dn, groupBy: r(function(r2, e) {
  return hi(this, r2, e);
}, "groupBy"), has: r(function(r2) {
  return this.get(r2, g2) !== g2;
}, "has"), hasIn: Ci, isSubset: r(function(r2) {
  return r2 = typeof r2.includes == "function" ? r2 : q2(r2), this.every(function(e) {
    return r2.includes(e);
  });
}, "isSubset"), isSuperset: r(function(r2) {
  return r2 = typeof r2.isSubset == "function" ? r2 : q2(r2), r2.isSubset(this);
}, "isSuperset"), keyOf: r(function(r2) {
  return this.findKey(function(e) {
    return N(e, r2);
  });
}, "keyOf"), keySeq: r(function() {
  return this.toSeq().map(Li).toIndexedSeq();
}, "keySeq"), last: r(function(r2) {
  return this.toSeq().reverse().first(r2);
}, "last"), lastKeyOf: r(function(r2) {
  return this.toKeyedSeq().reverse().keyOf(r2);
}, "lastKeyOf"), max: r(function(r2) {
  return ur(this, r2);
}, "max"), maxBy: r(function(r2, e) {
  return ur(this, e, r2);
}, "maxBy"), min: r(function(r2) {
  return ur(this, r2 ? Ue(r2) : Be);
}, "min"), minBy: r(function(r2, e) {
  return ur(this, e ? Ue(e) : Be, r2);
}, "minBy"), rest: r(function() {
  return this.slice(1);
}, "rest"), skip: r(function(r2) {
  return r2 === 0 ? this : this.slice(Math.max(0, r2));
}, "skip"), skipLast: r(function(r2) {
  return r2 === 0 ? this : this.slice(0, -Math.max(0, r2));
}, "skipLast"), skipWhile: r(function(r2, e) {
  return O(this, cn(this, r2, e, true));
}, "skipWhile"), skipUntil: r(function(r2, e) {
  return this.skipWhile(cr(r2), e);
}, "skipUntil"), sortBy: r(function(r2, e) {
  return O(this, zt(this, e, r2));
}, "sortBy"), take: r(function(r2) {
  return this.slice(0, Math.max(0, r2));
}, "take"), takeLast: r(function(r2) {
  return this.slice(-Math.max(0, r2));
}, "takeLast"), takeWhile: r(function(r2, e) {
  return O(this, ci(this, r2, e));
}, "takeWhile"), takeUntil: r(function(r2, e) {
  return this.takeWhile(cr(r2), e);
}, "takeUntil"), update: r(function(r2) {
  return r2(this);
}, "update"), valueSeq: r(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: r(function() {
  return this.__hash || (this.__hash = Pi(this));
}, "hashCode") });
var L = q2.prototype;
L[Ye] = true;
L[dr] = L.values;
L.toJSON = L.toArray;
L.__toStringMapper = Yt;
L.inspect = L.toSource = function() {
  return this.toString();
};
L.chain = L.flatMap;
L.contains = L.includes;
Ot(G, { flip: r(function() {
  return O(this, an(this));
}, "flip"), mapEntries: r(function(r2, e) {
  var n2 = this, i2 = 0;
  return O(this, this.toSeq().map(function(s2, u2) {
    return r2.call(e, [u2, s2], i2++, n2);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: r(function(r2, e) {
  var n2 = this;
  return O(this, this.toSeq().flip().map(function(i2, s2) {
    return r2.call(e, i2, s2, n2);
  }).flip());
}, "mapKeys") });
var or = G.prototype;
or[He] = true;
or[dr] = L.entries;
or.toJSON = Nn;
or.__toStringMapper = function(t, r2) {
  return Yt(r2) + ": " + Yt(t);
};
Ot(wt, { toKeyedSeq: r(function() {
  return new mr(this, false);
}, "toKeyedSeq"), filter: r(function(r2, e) {
  return O(this, hn(this, r2, e, false));
}, "filter"), findIndex: r(function(r2, e) {
  var n2 = this.findEntry(r2, e);
  return n2 ? n2[0] : -1;
}, "findIndex"), indexOf: r(function(r2) {
  var e = this.keyOf(r2);
  return e === void 0 ? -1 : e;
}, "indexOf"), lastIndexOf: r(function(r2) {
  var e = this.lastKeyOf(r2);
  return e === void 0 ? -1 : e;
}, "lastIndexOf"), reverse: r(function() {
  return O(this, Hr(this, false));
}, "reverse"), slice: r(function(r2, e) {
  return O(this, Xr(this, r2, e, false));
}, "slice"), splice: r(function(r2, e) {
  var n2 = arguments.length;
  if (e = Math.max(e || 0, 0), n2 === 0 || n2 === 2 && !e)
    return this;
  r2 = Tt(r2, r2 < 0 ? this.count() : this.size);
  var i2 = this.slice(0, r2);
  return O(this, n2 === 1 ? i2 : i2.concat(ot(arguments, 2), this.slice(r2 + e)));
}, "splice"), findLastIndex: r(function(r2, e) {
  var n2 = this.findLastEntry(r2, e);
  return n2 ? n2[0] : -1;
}, "findLastIndex"), first: r(function(r2) {
  return this.get(0, r2);
}, "first"), flatten: r(function(r2) {
  return O(this, pn(this, r2, false));
}, "flatten"), get: r(function(r2, e) {
  return r2 = dt(this, r2), r2 < 0 || this.size === 1 / 0 || this.size !== void 0 && r2 > this.size ? e : this.find(function(n2, i2) {
    return i2 === r2;
  }, void 0, e);
}, "get"), has: r(function(r2) {
  return r2 = dt(this, r2), r2 >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || r2 < this.size : this.indexOf(r2) !== -1);
}, "has"), interpose: r(function(r2) {
  return O(this, vi(this, r2));
}, "interpose"), interleave: r(function() {
  var r2 = [this].concat(ot(arguments)), e = ar(this.toSeq(), V.of, r2), n2 = e.flatten(true);
  return e.size && (n2.size = e.size * r2.length), O(this, n2);
}, "interleave"), keySeq: r(function() {
  return Di(0, this.size);
}, "keySeq"), last: r(function(r2) {
  return this.get(-1, r2);
}, "last"), skipWhile: r(function(r2, e) {
  return O(this, cn(this, r2, e, false));
}, "skipWhile"), zip: r(function() {
  var r2 = [this].concat(ot(arguments));
  return O(this, ar(this, Pe, r2));
}, "zip"), zipAll: r(function() {
  var r2 = [this].concat(ot(arguments));
  return O(this, ar(this, Pe, r2, true));
}, "zipAll"), zipWith: r(function(r2) {
  var e = ot(arguments);
  return e[0] = this, O(this, ar(this, r2, e));
}, "zipWith") });
var Bt = wt.prototype;
Bt[Xe] = true;
Bt[Nt] = true;
Ot($t, { get: r(function(r2, e) {
  return this.has(r2) ? r2 : e;
}, "get"), includes: r(function(r2) {
  return this.has(r2);
}, "includes"), keySeq: r(function() {
  return this.valueSeq();
}, "keySeq") });
var Rt = $t.prototype;
Rt.has = L.includes;
Rt.contains = Rt.includes;
Rt.keys = Rt.values;
Ot(gt, or);
Ot(V, Bt);
Ot(Lt, Rt);
function Le(t, r2, e, n2, i2, s2) {
  return Z(t.size), t.__iterate(function(u2, a2, f) {
    i2 ? (i2 = false, e = u2) : e = r2.call(n2, e, u2, a2, f);
  }, s2), e;
}
r(Le, "reduce");
function Li(t, r2) {
  return r2;
}
r(Li, "keyMapper");
function Ui(t, r2) {
  return [r2, t];
}
r(Ui, "entryMapper");
function cr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
r(cr, "not");
function Ue(t) {
  return function() {
    return -t.apply(this, arguments);
  };
}
r(Ue, "neg");
function Pe() {
  return ot(arguments);
}
r(Pe, "defaultZipper");
function Be(t, r2) {
  return t < r2 ? 1 : t > r2 ? -1 : 0;
}
r(Be, "defaultNegComparator");
function Pi(t) {
  if (t.size === 1 / 0)
    return 0;
  var r2 = tt(t), e = M(t), n2 = r2 ? 1 : 0, i2 = t.__iterate(e ? r2 ? function(s2, u2) {
    n2 = 31 * n2 + Fe(K(s2), K(u2)) | 0;
  } : function(s2, u2) {
    n2 = n2 + Fe(K(s2), K(u2)) | 0;
  } : r2 ? function(s2) {
    n2 = 31 * n2 + K(s2) | 0;
  } : function(s2) {
    n2 = n2 + K(s2) | 0;
  });
  return Bi(i2, n2);
}
r(Pi, "hashCollection");
function Bi(t, r2) {
  return r2 = Ft(r2, 3432918353), r2 = Ft(r2 << 15 | r2 >>> -15, 461845907), r2 = Ft(r2 << 13 | r2 >>> -13, 5), r2 = (r2 + 3864292196 | 0) ^ t, r2 = Ft(r2 ^ r2 >>> 16, 2246822507), r2 = Ft(r2 ^ r2 >>> 13, 3266489909), r2 = gr(r2 ^ r2 >>> 16), r2;
}
r(Bi, "murmurHashOfSize");
function Fe(t, r2) {
  return t ^ r2 + 2654435769 + (t << 6) + (t >> 2) | 0;
}
r(Fe, "hashMerge");
var Gt = function(t) {
  function r2(e) {
    return e == null ? Ur() : jn(e) ? e : Ur().withMutations(function(n2) {
      var i2 = $t(e);
      Z(i2.size), i2.forEach(function(s2) {
        return n2.add(s2);
      });
    });
  }
  return r(r2, "OrderedSet"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = r(function() {
    return this(arguments);
  }, "of"), r2.fromKeys = r(function(n2) {
    return this(G(n2).keySeq());
  }, "fromKeys"), r2.prototype.toString = r(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), r2;
}(wr);
Gt.isOrderedSet = jn;
var It = Gt.prototype;
It[Nt] = true;
It.zip = Bt.zip;
It.zipWith = Bt.zipWith;
It.zipAll = Bt.zipAll;
It.__empty = Ur;
It.__make = Cn;
function Cn(t, r2) {
  var e = Object.create(It);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r2, e;
}
r(Cn, "makeOrderedSet");
var ke;
function Ur() {
  return ke || (ke = Cn(kt()));
}
r(Ur, "emptyOrderedSet");
function Fi(t) {
  if (Dt(t))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (st(t))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t === null || typeof t != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
r(Fi, "throwOnInvalidDefaultValues");
var R = r(function(r2, e) {
  var n2;
  Fi(r2);
  var i2 = r(function(a2) {
    var f = this;
    if (a2 instanceof i2)
      return a2;
    if (!(this instanceof i2))
      return new i2(a2);
    if (!n2) {
      n2 = true;
      var h = Object.keys(r2), c = s2._indices = {};
      s2._name = e, s2._keys = h, s2._defaultValues = r2;
      for (var p = 0; p < h.length; p++) {
        var _ = h[p];
        c[_] = p, s2[_] ? typeof console == "object" && console.warn && console.warn("Cannot define " + ve(this) + ' with property "' + _ + '" since that property name is part of the Record API.') : ki(s2, _);
      }
    }
    return this.__ownerID = void 0, this._values = Sr().withMutations(function(v) {
      v.setSize(f._keys.length), G(a2).forEach(function(l2, d2) {
        v.set(f._indices[d2], l2 === f._defaultValues[d2] ? void 0 : l2);
      });
    }), this;
  }, "Record"), s2 = i2.prototype = Object.create(I);
  return s2.constructor = i2, e && (i2.displayName = e), i2;
}, "Record");
R.prototype.toString = r(function() {
  for (var r2 = ve(this) + " { ", e = this._keys, n2, i2 = 0, s2 = e.length; i2 !== s2; i2++)
    n2 = e[i2], r2 += (i2 ? ", " : "") + n2 + ": " + Yt(this.get(n2));
  return r2 + " }";
}, "toString");
R.prototype.equals = r(function(r2) {
  return this === r2 || Dt(r2) && jt(this).equals(jt(r2));
}, "equals");
R.prototype.hashCode = r(function() {
  return jt(this).hashCode();
}, "hashCode");
R.prototype.has = r(function(r2) {
  return this._indices.hasOwnProperty(r2);
}, "has");
R.prototype.get = r(function(r2, e) {
  if (!this.has(r2))
    return e;
  var n2 = this._indices[r2], i2 = this._values.get(n2);
  return i2 === void 0 ? this._defaultValues[r2] : i2;
}, "get");
R.prototype.set = r(function(r2, e) {
  if (this.has(r2)) {
    var n2 = this._values.set(this._indices[r2], e === this._defaultValues[r2] ? void 0 : e);
    if (n2 !== this._values && !this.__ownerID)
      return _e(this, n2);
  }
  return this;
}, "set");
R.prototype.remove = r(function(r2) {
  return this.set(r2);
}, "remove");
R.prototype.clear = r(function() {
  var r2 = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : _e(this, r2);
}, "clear");
R.prototype.wasAltered = r(function() {
  return this._values.wasAltered();
}, "wasAltered");
R.prototype.toSeq = r(function() {
  return jt(this);
}, "toSeq");
R.prototype.toJS = r(function() {
  return vr(this);
}, "toJS$1");
R.prototype.entries = r(function() {
  return this.__iterator(Q);
}, "entries");
R.prototype.__iterator = r(function(r2, e) {
  return jt(this).__iterator(r2, e);
}, "__iterator");
R.prototype.__iterate = r(function(r2, e) {
  return jt(this).__iterate(r2, e);
}, "__iterate");
R.prototype.__ensureOwner = r(function(r2) {
  if (r2 === this.__ownerID)
    return this;
  var e = this._values.__ensureOwner(r2);
  return r2 ? _e(this, e, r2) : (this.__ownerID = r2, this._values = e, this);
}, "__ensureOwner");
R.isRecord = Dt;
R.getDescriptiveName = ve;
var I = R.prototype;
I[Qe] = true;
I[Vt] = I.remove;
I.deleteIn = I.removeIn = Vr;
I.getIn = Dn;
I.hasIn = L.hasIn;
I.merge = mn;
I.mergeWith = Sn;
I.mergeIn = ne;
I.mergeDeep = On;
I.mergeDeepWith = In;
I.mergeDeepIn = ie;
I.setIn = Gr;
I.update = xr;
I.updateIn = te;
I.withMutations = er;
I.asMutable = nr;
I.asImmutable = ir;
I[dr] = I.entries;
I.toJSON = I.toObject = L.toObject;
I.inspect = I.toSource = function() {
  return this.toString();
};
function _e(t, r2, e) {
  var n2 = Object.create(Object.getPrototypeOf(t));
  return n2._values = r2, n2.__ownerID = e, n2;
}
r(_e, "makeRecord");
function ve(t) {
  return t.constructor.displayName || t.constructor.name || "Record";
}
r(ve, "recordName");
function jt(t) {
  return Kr(t._keys.map(function(r2) {
    return [r2, t.get(r2)];
  }));
}
r(jt, "recordSeq");
function ki(t, r2) {
  try {
    Object.defineProperty(t, r2, { get: function() {
      return this.get(r2);
    }, set: function(e) {
      Qr(this.__ownerID, "Cannot set on an immutable record."), this.set(r2, e);
    } });
  } catch {
  }
}
r(ki, "setProp");
var xi = function(t) {
  function r2(e, n2) {
    if (!(this instanceof r2))
      return new r2(e, n2);
    if (this._value = e, this.size = n2 === void 0 ? 1 / 0 : Math.max(0, n2), this.size === 0) {
      if (qr)
        return qr;
      qr = this;
    }
  }
  return r(r2, "Repeat"), t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = r(function() {
    return this.size === 0 ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]";
  }, "toString"), r2.prototype.get = r(function(n2, i2) {
    return this.has(n2) ? this._value : i2;
  }, "get"), r2.prototype.includes = r(function(n2) {
    return N(this._value, n2);
  }, "includes"), r2.prototype.slice = r(function(n2, i2) {
    var s2 = this.size;
    return xt(n2, i2, s2) ? this : new r2(this._value, tr(i2, s2) - Tt(n2, s2));
  }, "slice"), r2.prototype.reverse = r(function() {
    return this;
  }, "reverse"), r2.prototype.indexOf = r(function(n2) {
    return N(this._value, n2) ? 0 : -1;
  }, "indexOf"), r2.prototype.lastIndexOf = r(function(n2) {
    return N(this._value, n2) ? this.size : -1;
  }, "lastIndexOf"), r2.prototype.__iterate = r(function(n2, i2) {
    for (var s2 = this.size, u2 = 0; u2 !== s2 && n2(this._value, i2 ? s2 - ++u2 : u2++, this) !== false; )
      ;
    return u2;
  }, "__iterate"), r2.prototype.__iterator = r(function(n2, i2) {
    var s2 = this, u2 = this.size, a2 = 0;
    return new m2(function() {
      return a2 === u2 ? P() : E(n2, i2 ? u2 - ++a2 : a2++, s2._value);
    });
  }, "__iterator"), r2.prototype.equals = r(function(n2) {
    return n2 instanceof r2 ? N(this._value, n2._value) : pe(n2);
  }, "equals"), r2;
}(V);
var qr;
q();
var Jn = u(Kn(), 1);
function Yn(t, r2) {
  var e = (0, Jn.default)(t, r2);
  return e.map((i2) => i2[0] === 1 ? i2 : [i2[0], i2[1].length]);
}
r(Yn, "createDelta");
function Hn(t, r2) {
  for (var e = "", n2 = 0, i2 = 0; i2 < r2.length; i2++) {
    var s2 = r2[i2], u2 = s2[0], a2 = s2[1];
    s2[0] === -1 && typeof a2 == "number" ? n2 += a2 : u2 == 0 && typeof a2 == "number" ? e += t.slice(n2, n2 += a2) : e += a2;
  }
  return e;
}
r(Hn, "applyPatch");
function Xi(t, r2) {
  return R({ ...r2, room: t, state: R(r2.state)() });
}
r(Xi, "initSession");
var nt = null;
var ft = {};
var Ir = class {
  constructor(r2, e) {
    w(this, "session");
    w(this, "cb", {});
    w(this, "hashCodeSession", 0);
    w(this, "room");
    w(this, "created", new Date().toISOString());
    w(this, "hashOfState", r(() => {
      let r3 = this.session.get("state"), e2 = r3.hashCode();
      return ft[e2] = r3, e2;
    }, "hashOfState"));
    w(this, "createPatchFromHashCode", r(async (r3, e2) => {
      let n3 = JSON.parse(bt(e2));
      if (!ft[r3]) {
        let c = await fetch(`/live/${this.room}
        `), { mST: p, hashCode: _ } = await c.json();
        ft[_] = this.session.get("state").merge(p);
      }
      let i2 = ft[r3], s2 = bt(i2.toJSON()), u2 = i2.merge(n3), a2 = bt(u2.toJSON()), f = u2.hashCode();
      ft[f] = u2;
      let h = Vi(s2, a2);
      return { oldHash: r3, newHash: f, patch: h };
    }, "createPatchFromHashCode"));
    w(this, "patchSync", r((r3) => {
      this.session = this.session.set("state", this.session.get("state").merge(r3)), this.update();
    }, "patchSync"));
    w(this, "applyPatch", r(async ({ oldHash: r3, newHash: e2, patch: n3 }) => {
      let i2 = this.room || "";
      if (!Object.keys(ft).map((p) => Number(p)).includes(Number(r3)) && i2) {
        console.log(Object.keys(ft));
        let p = await fetch(`/live/${i2}/mST`);
        if (p.ok) {
          let _ = await p.json(), v = this.session.get("state").merge(JSON.parse(bt(_.mST)));
          ft[v.hashCode()] = v;
        } else {
          let { mST: _ } = await import(location.origin + `/live/${this.room}/mst.mjs?${Date.now()}`), v = this.session.get("state").merge(JSON.parse(bt(_)));
          ft[v.hashCode()] = v;
        }
      }
      let s2 = bt(ft[r3].toJSON()), u2 = Hn(s2, n3), a2 = JSON.parse(u2), f = this.session.get("state").merge(a2), h = this.session.get("state").merge(f);
      if (h.hashCode() === e2)
        this.session = this.session.set("state", h);
      else {
        new Error("Wrong patch");
        return;
      }
    }, "applyPatch"));
    nt = this, this.room = r2;
    let n2 = null;
    this.session = Xi(r2, { ...e, state: n2 || JSON.parse(bt(e.state)) })();
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
r(Ir, "CodeSession");
var Zi = r(() => nt ? nt.hashOfState() : 0, "hashCode");
var so = r(() => {
  if (!nt)
    return { i: 0, transpiled: "", code: "", html: "", css: "" };
  let { i: t, transpiled: r2, code: e, html: n2, css: i2 } = nt.json().state;
  return { i: t, transpiled: r2, code: e, html: n2, css: i2 };
}, "mST");
function Qi(t, r2) {
  let { i: e, transpiled: n2, code: i2, html: s2, css: u2 } = t, a2 = { i: e, transpiled: n2, code: i2, html: s2, css: u2 };
  return a2.code = a2.code.replace("from '/live", `from '${r2}/live`), a2.code = a2.code.replace("from './", `from '${r2}/live/`), a2.transpiled = a2.transpiled.replace('from "/live', `from "${r2}/live`), a2.transpiled = a2.transpiled.replace('from "./', `from "${r2}/live/`), a2;
}
r(Qi, "addOrigin");
function bt(t) {
  let { i: r2, transpiled: e, code: n2, html: i2, css: s2 } = t;
  return JSON.stringify({ i: r2, transpiled: e, code: n2, html: i2, css: s2 });
}
r(bt, "str");
var uo = r(async (t) => {
  await nt?.applyPatch(t), nt?.update();
}, "applyPatch");
var ao = r((t, r2 = "default") => nt?.onUpdate(t, r2), "onSessionUpdate");
var Gi = r((t, r2) => nt.createPatchFromHashCode(t, r2), "makePatchFrom");
var fo = r((t) => Gi(Zi(), t), "makePatch");
var ho = r((t, r2, e) => nt || new Ir(t, { name: r2.name, state: Qi(r2.state, e) }), "startSession");
function Vi(t, r2) {
  return Yn(t, r2);
}
r(Vi, "createPatch");
var co = r((t) => nt?.patchSync(t), "patchSync");

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
      ho(
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
          return new Response(so().code, {
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
          return new Response(JSON.stringify(so()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "lazy":
          const { html, css, transpiled } = so();
          const hash = Zi();
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
          return new Response(Zi().toString(), {
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
              export const mST=${JSON.stringify(so())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${JSON.stringify({
              js: importMapReplace(so().transpiled)
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
              mST: so(),
              hashCode: Zi()
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
          return new Response(importMapReplace(so().transpiled), {
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
        ${so().css}
        `
          ).replace("favicon.ico", a3["favicon.ico"]).replace(
            `<div id="root"></div>`,
            `<div id="root">
                    <div id="root-${this.codeSpace}" style="height: 100%">
                      ${so().html}
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
          const startState = so();
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
                (m3) => session.webSocket.send(m3)
              );
              otherSession.blockedMessages = [];
            }
          });
        } catch (e) {
          respondWith({ error: "error while checked blocked messages" });
        }
        return respondWith({
          hashCode: Zi()
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
        hashCode: Zi()
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
          if (oldHash !== Zi()) {
            return respondWith({ hashCode: Zi() });
          }
          try {
            await uo({ patch, newHash, oldHash });
          } catch (err) {
            return respondWith({
              msg: "strange error",
              err: err instanceof SyntaxError ? err.toString() : "Some error",
              stack: err instanceof SyntaxError ? err.stack?.toString() : "no stack",
              hash: Zi()
            });
          }
          if (newHash === Zi()) {
            try {
              this.broadcast(data);
            } catch {
              return respondWith({
                "msg": "broadcast issue"
              });
            }
            await this.kv.put("session", { ...so() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash,
                patch
              })
            );
          }
          return respondWith({
            hashCode: Zi()
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
