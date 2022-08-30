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
    "monaco-editor": "npm:monaco-editor",
    "monaco-editor/": "npm:monaco-editor/",
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
      const u = new URL(request.url);
      let url = u;
      const accept = request.headers.get("accept");
      const serveJs = !(accept && accept.includes("html"));
      if (serveJs && u.pathname.endsWith(".tsx") && !u.pathname.endsWith(".index.tsx")) {
        url = new URL(request.url.replace(".tsx", "/index.tsx"));
      }
      if (serveJs && !url.pathname.includes(".")) {
        url = new URL(request.url + "/index.js");
      }
      const path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        return new Response(
          `<meta http-equiv="refresh" content="0; URL=${u.protocol + "//" + u.hostname + ":" + u.port}/live/coder/" />`,
          {
            headers: {
              "Location": `${u.protocol}//${u.hostname}:${u.port}/live/coder`,
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
          if (path2[0].startsWith("npm:")) {
            const isJs = u.toString().includes(".js") || u.toString().includes(".mjs");
            const packageName = u.toString().replace(
              u.origin + "/npm:",
              ""
            );
            const searchParams = isJs ? `?bundle&external=${esbuildExternal.filter((p2) => p2 !== packageName).join(",")} ` : "";
            const esmUrl = "https://esm.sh/" + packageName + searchParams;
            const cacheUrl = new URL(request2.url + searchParams);
            const cacheKey = new Request(cacheUrl.toString());
            const cache = caches.default;
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse && cachedResponse.ok) {
              return cachedResponse.clone();
            }
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
              isText ? bodyStr.replaceAll(regex, u.origin + "/npm:/").replaceAll(regex2, ' from "/npm:/').replaceAll(regex3, 'import "/npm:/').replaceAll(regex4, ' from "/npm:/').replaceAll(regex5, 'import "/npm:/') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "immutable",
                  "Content-Type": resp.headers.get("Content-Type")
                }
              }
            );
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }
          if (path2[0].startsWith("unpkg:")) {
            const cacheUrl = new URL(request2.url);
            const cacheKey = new Request(cacheUrl.toString());
            const cache = caches.default;
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse && cachedResponse.ok) {
              return cachedResponse.clone();
            }
            const esmUrl = u.toString().replace(
              u.origin + "/unpkg:",
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
              // ${cacheUrl}
              ` + bodyStr ? bodyStr.replaceAll(regex, u.origin + "/unpkg:").replaceAll(regex2, ' from "/unpkg:') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "immutable",
                  "Content-Type": resp.headers.get("Content-Type")
                }
              }
            );
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }
          if (path2[0].startsWith("node_modules")) {
            const cacheUrl = new URL(request2.url);
            const cacheKey = new Request(cacheUrl.toString());
            const cache = caches.default;
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse && cachedResponse.ok) {
              return cachedResponse.clone();
            }
            const esmUrl = u.toString().replace(
              u.origin + "/node_modules/",
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
              // ${cacheUrl}
              ` + bodyStr ? bodyStr.replaceAll(regex, u.origin + "/node_modules/").replaceAll(regex2, ' from "/node_modules/') : await resp.blob(),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "immutable",
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
              return new Response(JSON.stringify(imap), {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache"
                }
              });
            case "api":
              return handleApiRequest(path2.slice(1), request2, env);
            case "ipns":
            case "ipfs":
              const u2 = new URL(request2.url, "https://cloudflare-ipfs.com");
              const new1 = new URL(u2.pathname, "https://cloudflare-ipfs.com");
              const resp = await fetch(new1.toString());
              if (resp.ok)
                return resp;
              const new2 = new URL(u2.pathname, "https://ipfs.io");
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
                  cacheControl: url.href.includes("chunk-") ? {
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
              const chunkRegx = /[.]{1}[a-f0-9]{10}[.]+/gm;
              if (url.href.includes("chunk-") || chunkRegx.test(url.href)) {
                kvResp.headers.append("Cache-Control", "immutable");
              }
              return kvResp;
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

// src/rateLimiterClient.ts
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
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
 /* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
 *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
   all: unset;
   display: revert;
  }
 
 /* Preferred box-sizing value */
 *,
  *::before,
 *::after {
   box-sizing: border-box;
 }
 
 /*
   Remove list styles (bullets/numbers)
   in case you use it with normalize.css
 */
 ol, ul {
   list-style: none;
 }
 
 /* For images to not be able to exceed their container */
 img {
   max-width: 100%;
 }
 
 /* Removes spacing between cells in tables */
 table {
   border-collapse: collapse;
 }
 
 /* Revert the 'white-space' property for textarea elements on Safari */
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

   <script type="importmap"><\/script>
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

// ../../packages/code/dist/chunk-chunk-FCQ733RZ.mjs
var h = Object.create;
var e = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var k = Object.getPrototypeOf;
var l = Object.prototype.hasOwnProperty;
var m = (a2, b2) => () => (a2 && (b2 = a2(a2 = 0)), b2);
var p = (a2, b2) => () => (b2 || a2((b2 = { exports: {} }).exports, b2), b2.exports);
var g = (a2, b2, c, f) => {
  if (b2 && typeof b2 == "object" || typeof b2 == "function")
    for (let d of j(b2))
      !l.call(a2, d) && d !== c && e(a2, d, { get: () => b2[d], enumerable: !(f = i(b2, d)) || f.enumerable });
  return a2;
};
var r = (a2, b2, c) => (c = a2 != null ? h(k(a2)) : {}, g(b2 || !a2 || !a2.__esModule ? e(c, "default", { value: a2, enumerable: true }) : c, a2));
var v;
var o = m(() => {
  v = { env: { NODE_ENV: "production" }, version: "1.1.1", browser: true };
});

// ../../packages/code/dist/chunk-chunk-SOFCA3VV.mjs
var kn = p((xi, Fn) => {
  o();
  var st = -1, rt = 1, k2 = 0;
  function ir(t, r2, e2, n) {
    if (t === r2)
      return t ? [[k2, t]] : [];
    if (e2 != null) {
      var i2 = Ji(t, r2, e2);
      if (i2)
        return i2;
    }
    var o2 = _e(t, r2), s = t.substring(0, o2);
    t = t.substring(o2), r2 = r2.substring(o2), o2 = ve(t, r2);
    var u = t.substring(t.length - o2);
    t = t.substring(0, t.length - o2), r2 = r2.substring(0, r2.length - o2);
    var a2 = Fi(t, r2);
    return s && a2.unshift([k2, s]), u && a2.push([k2, u]), Cn(a2, n), a2;
  }
  function Fi(t, r2) {
    var e2;
    if (!t)
      return [[rt, r2]];
    if (!r2)
      return [[st, t]];
    var n = t.length > r2.length ? t : r2, i2 = t.length > r2.length ? r2 : t, o2 = n.indexOf(i2);
    if (o2 !== -1)
      return e2 = [[rt, n.substring(0, o2)], [k2, i2], [rt, n.substring(o2 + i2.length)]], t.length > r2.length && (e2[0][0] = e2[2][0] = st), e2;
    if (i2.length === 1)
      return [[st, t], [rt, r2]];
    var s = Wi(t, r2);
    if (s) {
      var u = s[0], a2 = s[1], f = s[2], h2 = s[3], c = s[4], p2 = ir(u, f), _ = ir(a2, h2);
      return p2.concat([[k2, c]], _);
    }
    return ki(t, r2);
  }
  function ki(t, r2) {
    for (var e2 = t.length, n = r2.length, i2 = Math.ceil((e2 + n) / 2), o2 = i2, s = 2 * i2, u = new Array(s), a2 = new Array(s), f = 0; f < s; f++)
      u[f] = -1, a2[f] = -1;
    u[o2 + 1] = 0, a2[o2 + 1] = 0;
    for (var h2 = e2 - n, c = h2 % 2 !== 0, p2 = 0, _ = 0, v2 = 0, l2 = 0, m2 = 0; m2 < i2; m2++) {
      for (var d = -m2 + p2; d <= m2 - _; d += 2) {
        var S = o2 + d, M;
        d === -m2 || d !== m2 && u[S - 1] < u[S + 1] ? M = u[S + 1] : M = u[S - 1] + 1;
        for (var R = M - d; M < e2 && R < n && t.charAt(M) === r2.charAt(R); )
          M++, R++;
        if (u[S] = M, M > e2)
          _ += 2;
        else if (R > n)
          p2 += 2;
        else if (c) {
          var j2 = o2 + h2 - d;
          if (j2 >= 0 && j2 < s && a2[j2] !== -1) {
            var T = e2 - a2[j2];
            if (M >= T)
              return Nn(t, r2, M, R);
          }
        }
      }
      for (var J = -m2 + v2; J <= m2 - l2; J += 2) {
        var j2 = o2 + J, T;
        J === -m2 || J !== m2 && a2[j2 - 1] < a2[j2 + 1] ? T = a2[j2 + 1] : T = a2[j2 - 1] + 1;
        for (var at = T - J; T < e2 && at < n && t.charAt(e2 - T - 1) === r2.charAt(n - at - 1); )
          T++, at++;
        if (a2[j2] = T, T > e2)
          l2 += 2;
        else if (at > n)
          v2 += 2;
        else if (!c) {
          var S = o2 + h2 - J;
          if (S >= 0 && S < s && u[S] !== -1) {
            var M = u[S], R = o2 + M - S;
            if (T = e2 - T, M >= T)
              return Nn(t, r2, M, R);
          }
        }
      }
    }
    return [[st, t], [rt, r2]];
  }
  function Nn(t, r2, e2, n) {
    var i2 = t.substring(0, e2), o2 = r2.substring(0, n), s = t.substring(e2), u = r2.substring(n), a2 = ir(i2, o2), f = ir(s, u);
    return a2.concat(f);
  }
  function _e(t, r2) {
    if (!t || !r2 || t.charAt(0) !== r2.charAt(0))
      return 0;
    for (var e2 = 0, n = Math.min(t.length, r2.length), i2 = n, o2 = 0; e2 < i2; )
      t.substring(o2, i2) == r2.substring(o2, i2) ? (e2 = i2, o2 = e2) : n = i2, i2 = Math.floor((n - e2) / 2 + e2);
    return Ln(t.charCodeAt(i2 - 1)) && i2--, i2;
  }
  function ve(t, r2) {
    if (!t || !r2 || t.slice(-1) !== r2.slice(-1))
      return 0;
    for (var e2 = 0, n = Math.min(t.length, r2.length), i2 = n, o2 = 0; e2 < i2; )
      t.substring(t.length - i2, t.length - o2) == r2.substring(r2.length - i2, r2.length - o2) ? (e2 = i2, o2 = e2) : n = i2, i2 = Math.floor((n - e2) / 2 + e2);
    return Un(t.charCodeAt(t.length - i2)) && i2--, i2;
  }
  function Wi(t, r2) {
    var e2 = t.length > r2.length ? t : r2, n = t.length > r2.length ? r2 : t;
    if (e2.length < 4 || n.length * 2 < e2.length)
      return null;
    function i2(_, v2, l2) {
      for (var m2 = _.substring(l2, l2 + Math.floor(_.length / 4)), d = -1, S = "", M, R, j2, T; (d = v2.indexOf(m2, d + 1)) !== -1; ) {
        var J = _e(_.substring(l2), v2.substring(d)), at = ve(_.substring(0, l2), v2.substring(0, d));
        S.length < at + J && (S = v2.substring(d - at, d) + v2.substring(d, d + J), M = _.substring(0, l2 - at), R = _.substring(l2 + J), j2 = v2.substring(0, d - at), T = v2.substring(d + J));
      }
      return S.length * 2 >= _.length ? [M, R, j2, T, S] : null;
    }
    var o2 = i2(e2, n, Math.ceil(e2.length / 4)), s = i2(e2, n, Math.ceil(e2.length / 2)), u;
    if (!o2 && !s)
      return null;
    s ? o2 ? u = o2[4].length > s[4].length ? o2 : s : u = s : u = o2;
    var a2, f, h2, c;
    t.length > r2.length ? (a2 = u[0], f = u[1], h2 = u[2], c = u[3]) : (h2 = u[0], c = u[1], a2 = u[2], f = u[3]);
    var p2 = u[4];
    return [a2, f, h2, c, p2];
  }
  function Cn(t, r2) {
    t.push([k2, ""]);
    for (var e2 = 0, n = 0, i2 = 0, o2 = "", s = "", u; e2 < t.length; ) {
      if (e2 < t.length - 1 && !t[e2][1]) {
        t.splice(e2, 1);
        continue;
      }
      switch (t[e2][0]) {
        case rt:
          i2++, s += t[e2][1], e2++;
          break;
        case st:
          n++, o2 += t[e2][1], e2++;
          break;
        case k2:
          var a2 = e2 - i2 - n - 1;
          if (r2) {
            if (a2 >= 0 && Bn(t[a2][1])) {
              var f = t[a2][1].slice(-1);
              if (t[a2][1] = t[a2][1].slice(0, -1), o2 = f + o2, s = f + s, !t[a2][1]) {
                t.splice(a2, 1), e2--;
                var h2 = a2 - 1;
                t[h2] && t[h2][0] === rt && (i2++, s = t[h2][1] + s, h2--), t[h2] && t[h2][0] === st && (n++, o2 = t[h2][1] + o2, h2--), a2 = h2;
              }
            }
            if (Pn(t[e2][1])) {
              var f = t[e2][1].charAt(0);
              t[e2][1] = t[e2][1].slice(1), o2 += f, s += f;
            }
          }
          if (e2 < t.length - 1 && !t[e2][1]) {
            t.splice(e2, 1);
            break;
          }
          if (o2.length > 0 || s.length > 0) {
            o2.length > 0 && s.length > 0 && (u = _e(s, o2), u !== 0 && (a2 >= 0 ? t[a2][1] += s.substring(0, u) : (t.splice(0, 0, [k2, s.substring(0, u)]), e2++), s = s.substring(u), o2 = o2.substring(u)), u = ve(s, o2), u !== 0 && (t[e2][1] = s.substring(s.length - u) + t[e2][1], s = s.substring(0, s.length - u), o2 = o2.substring(0, o2.length - u)));
            var c = i2 + n;
            o2.length === 0 && s.length === 0 ? (t.splice(e2 - c, c), e2 = e2 - c) : o2.length === 0 ? (t.splice(e2 - c, c, [rt, s]), e2 = e2 - c + 1) : s.length === 0 ? (t.splice(e2 - c, c, [st, o2]), e2 = e2 - c + 1) : (t.splice(e2 - c, c, [st, o2], [rt, s]), e2 = e2 - c + 2);
          }
          e2 !== 0 && t[e2 - 1][0] === k2 ? (t[e2 - 1][1] += t[e2][1], t.splice(e2, 1)) : e2++, i2 = 0, n = 0, o2 = "", s = "";
          break;
      }
    }
    t[t.length - 1][1] === "" && t.pop();
    var p2 = false;
    for (e2 = 1; e2 < t.length - 1; )
      t[e2 - 1][0] === k2 && t[e2 + 1][0] === k2 && (t[e2][1].substring(t[e2][1].length - t[e2 - 1][1].length) === t[e2 - 1][1] ? (t[e2][1] = t[e2 - 1][1] + t[e2][1].substring(0, t[e2][1].length - t[e2 - 1][1].length), t[e2 + 1][1] = t[e2 - 1][1] + t[e2 + 1][1], t.splice(e2 - 1, 1), p2 = true) : t[e2][1].substring(0, t[e2 + 1][1].length) == t[e2 + 1][1] && (t[e2 - 1][1] += t[e2 + 1][1], t[e2][1] = t[e2][1].substring(t[e2 + 1][1].length) + t[e2 + 1][1], t.splice(e2 + 1, 1), p2 = true)), e2++;
    p2 && Cn(t, r2);
  }
  function Ln(t) {
    return t >= 55296 && t <= 56319;
  }
  function Un(t) {
    return t >= 56320 && t <= 57343;
  }
  function Pn(t) {
    return Un(t.charCodeAt(0));
  }
  function Bn(t) {
    return Ln(t.charCodeAt(t.length - 1));
  }
  function Ki(t) {
    for (var r2 = [], e2 = 0; e2 < t.length; e2++)
      t[e2][1].length > 0 && r2.push(t[e2]);
    return r2;
  }
  function pe(t, r2, e2, n) {
    return Bn(t) || Pn(n) ? null : Ki([[k2, t], [st, r2], [rt, e2], [k2, n]]);
  }
  function Ji(t, r2, e2) {
    var n = typeof e2 == "number" ? { index: e2, length: 0 } : e2.oldRange, i2 = typeof e2 == "number" ? null : e2.newRange, o2 = t.length, s = r2.length;
    if (n.length === 0 && (i2 === null || i2.length === 0)) {
      var u = n.index, a2 = t.slice(0, u), f = t.slice(u), h2 = i2 ? i2.index : null;
      t: {
        var c = u + s - o2;
        if (h2 !== null && h2 !== c || c < 0 || c > s)
          break t;
        var p2 = r2.slice(0, c), _ = r2.slice(c);
        if (_ !== f)
          break t;
        var v2 = Math.min(u, c), l2 = a2.slice(0, v2), m2 = p2.slice(0, v2);
        if (l2 !== m2)
          break t;
        var d = a2.slice(v2), S = p2.slice(v2);
        return pe(l2, d, S, f);
      }
      t: {
        if (h2 !== null && h2 !== u)
          break t;
        var M = u, p2 = r2.slice(0, M), _ = r2.slice(M);
        if (p2 !== a2)
          break t;
        var R = Math.min(o2 - M, s - M), j2 = f.slice(f.length - R), T = _.slice(_.length - R);
        if (j2 !== T)
          break t;
        var d = f.slice(0, f.length - R), S = _.slice(0, _.length - R);
        return pe(a2, d, S, j2);
      }
    }
    if (n.length > 0 && i2 && i2.length === 0) {
      t: {
        var l2 = t.slice(0, n.index), j2 = t.slice(n.index + n.length), v2 = l2.length, R = j2.length;
        if (s < v2 + R)
          break t;
        var m2 = r2.slice(0, v2), T = r2.slice(s - R);
        if (l2 !== m2 || j2 !== T)
          break t;
        var d = t.slice(v2, o2 - R), S = r2.slice(v2, s - R);
        return pe(l2, d, S, j2);
      }
    }
    return null;
  }
  function Sr(t, r2, e2) {
    return ir(t, r2, e2, true);
  }
  Sr.INSERT = rt;
  Sr.DELETE = st;
  Sr.EQUAL = k2;
  Fn.exports = Sr;
});
o();
o();
var Qt = "delete";
var I = 5;
var Y = 1 << I;
var L = Y - 1;
var y = {};
function Mr() {
  return { value: false };
}
function H(t) {
  t && (t.value = true);
}
function Lr() {
}
function It(t) {
  return t.size === void 0 && (t.size = t.__iterate(Fe)), t.size;
}
function vt(t, r2) {
  if (typeof r2 != "number") {
    var e2 = r2 >>> 0;
    if ("" + e2 !== r2 || e2 === 4294967295)
      return NaN;
    r2 = e2;
  }
  return r2 < 0 ? It(t) + r2 : r2;
}
function Fe() {
  return true;
}
function Gt(t, r2, e2) {
  return (t === 0 && !We(t) || e2 !== void 0 && t <= -e2) && (r2 === void 0 || e2 !== void 0 && r2 >= e2);
}
function Rt(t, r2) {
  return ke(t, r2, 0);
}
function Vt(t, r2) {
  return ke(t, r2, r2);
}
function ke(t, r2, e2) {
  return t === void 0 ? e2 : We(t) ? r2 === 1 / 0 ? r2 : Math.max(0, r2 + t) | 0 : r2 === void 0 || r2 === t ? t : Math.min(r2, t) | 0;
}
function We(t) {
  return t < 0 || t === 0 && 1 / t === -1 / 0;
}
var Ke = "@@__IMMUTABLE_ITERABLE__@@";
function F(t) {
  return Boolean(t && t[Ke]);
}
var Je = "@@__IMMUTABLE_KEYED__@@";
function z(t) {
  return Boolean(t && t[Je]);
}
var Ye = "@@__IMMUTABLE_INDEXED__@@";
function B(t) {
  return Boolean(t && t[Ye]);
}
function _r(t) {
  return z(t) || B(t);
}
var A = function(r2) {
  return F(r2) ? r2 : K(r2);
};
var Q = function(t) {
  function r2(e2) {
    return z(e2) ? e2 : dt(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
var mt = function(t) {
  function r2(e2) {
    return B(e2) ? e2 : G(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
var jt = function(t) {
  function r2(e2) {
    return F(e2) && !_r(e2) ? e2 : Nt(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2;
}(A);
A.Keyed = Q;
A.Indexed = mt;
A.Set = jt;
var He = "@@__IMMUTABLE_SEQ__@@";
function Ur(t) {
  return Boolean(t && t[He]);
}
var Xe = "@@__IMMUTABLE_RECORD__@@";
function Tt(t) {
  return Boolean(t && t[Xe]);
}
function it(t) {
  return F(t) || Tt(t);
}
var $t = "@@__IMMUTABLE_ORDERED__@@";
function x(t) {
  return Boolean(t && t[$t]);
}
var xt = 0;
var tt = 1;
var Z = 2;
var Ar = typeof Symbol == "function" && Symbol.iterator;
var Ze = "@@iterator";
var vr = Ar || Ze;
var g2 = function(r2) {
  this.next = r2;
};
g2.prototype.toString = function() {
  return "[Iterator]";
};
g2.KEYS = xt;
g2.VALUES = tt;
g2.ENTRIES = Z;
g2.prototype.inspect = g2.prototype.toSource = function() {
  return this.toString();
};
g2.prototype[vr] = function() {
  return this;
};
function b(t, r2, e2, n) {
  var i2 = t === 0 ? r2 : t === 1 ? e2 : [r2, e2];
  return n ? n.value = i2 : n = { value: i2, done: false }, n;
}
function U() {
  return { value: void 0, done: true };
}
function Qe(t) {
  return Array.isArray(t) ? true : !!lr(t);
}
function de(t) {
  return t && typeof t.next == "function";
}
function qr(t) {
  var r2 = lr(t);
  return r2 && r2.call(t);
}
function lr(t) {
  var r2 = t && (Ar && t[Ar] || t[Ze]);
  if (typeof r2 == "function")
    return r2;
}
function Xn(t) {
  var r2 = lr(t);
  return r2 && r2 === t.entries;
}
function Zn(t) {
  var r2 = lr(t);
  return r2 && r2 === t.keys;
}
var Dt = Object.prototype.hasOwnProperty;
function Ge(t) {
  return Array.isArray(t) || typeof t == "string" ? true : t && typeof t == "object" && Number.isInteger(t.length) && t.length >= 0 && (t.length === 0 ? Object.keys(t).length === 1 : t.hasOwnProperty(t.length - 1));
}
var K = function(t) {
  function r2(e2) {
    return e2 == null ? Br() : it(e2) ? e2.toSeq() : Gn(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toSeq = function() {
    return this;
  }, r2.prototype.toString = function() {
    return this.__toString("Seq {", "}");
  }, r2.prototype.cacheResult = function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this._cache;
    if (o2) {
      for (var s = o2.length, u = 0; u !== s; ) {
        var a2 = o2[i2 ? s - ++u : u++];
        if (n(a2[1], a2[0], this) === false)
          break;
      }
      return u;
    }
    return this.__iterateUncached(n, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this._cache;
    if (o2) {
      var s = o2.length, u = 0;
      return new g2(function() {
        if (u === s)
          return U();
        var a2 = o2[i2 ? s - ++u : u++];
        return b(n, a2[0], a2[1]);
      });
    }
    return this.__iteratorUncached(n, i2);
  }, r2;
}(A);
var dt = function(t) {
  function r2(e2) {
    return e2 == null ? Br().toKeyedSeq() : F(e2) ? z(e2) ? e2.toSeq() : e2.fromEntrySeq() : Tt(e2) ? e2.toSeq() : Fr(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toKeyedSeq = function() {
    return this;
  }, r2;
}(K);
var G = function(t) {
  function r2(e2) {
    return e2 == null ? Br() : F(e2) ? z(e2) ? e2.entrySeq() : e2.toIndexedSeq() : Tt(e2) ? e2.toSeq().entrySeq() : Ve(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return r2(arguments);
  }, r2.prototype.toIndexedSeq = function() {
    return this;
  }, r2.prototype.toString = function() {
    return this.__toString("Seq [", "]");
  }, r2;
}(K);
var Nt = function(t) {
  function r2(e2) {
    return (F(e2) && !_r(e2) ? e2 : G(e2)).toSetSeq();
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return r2(arguments);
  }, r2.prototype.toSetSeq = function() {
    return this;
  }, r2;
}(K);
K.isSeq = Ur;
K.Keyed = dt;
K.Set = Nt;
K.Indexed = G;
K.prototype[He] = true;
var gt = function(t) {
  function r2(e2) {
    this._array = e2, this.size = e2.length;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n, i2) {
    return this.has(n) ? this._array[vt(this, n)] : i2;
  }, r2.prototype.__iterate = function(n, i2) {
    for (var o2 = this._array, s = o2.length, u = 0; u !== s; ) {
      var a2 = i2 ? s - ++u : u++;
      if (n(o2[a2], a2, this) === false)
        break;
    }
    return u;
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this._array, s = o2.length, u = 0;
    return new g2(function() {
      if (u === s)
        return U();
      var a2 = i2 ? s - ++u : u++;
      return b(n, a2, o2[a2]);
    });
  }, r2;
}(G);
var Pr = function(t) {
  function r2(e2) {
    var n = Object.keys(e2).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e2) : []);
    this._object = e2, this._keys = n, this.size = n.length;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n, i2) {
    return i2 !== void 0 && !this.has(n) ? i2 : this._object[n];
  }, r2.prototype.has = function(n) {
    return Dt.call(this._object, n);
  }, r2.prototype.__iterate = function(n, i2) {
    for (var o2 = this._object, s = this._keys, u = s.length, a2 = 0; a2 !== u; ) {
      var f = s[i2 ? u - ++a2 : a2++];
      if (n(o2[f], f, this) === false)
        break;
    }
    return a2;
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this._object, s = this._keys, u = s.length, a2 = 0;
    return new g2(function() {
      if (a2 === u)
        return U();
      var f = s[i2 ? u - ++a2 : a2++];
      return b(n, f, o2[f]);
    });
  }, r2;
}(dt);
Pr.prototype[$t] = true;
var Qn = function(t) {
  function r2(e2) {
    this._collection = e2, this.size = e2.length || e2.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.__iterateUncached = function(n, i2) {
    if (i2)
      return this.cacheResult().__iterate(n, i2);
    var o2 = this._collection, s = qr(o2), u = 0;
    if (de(s))
      for (var a2; !(a2 = s.next()).done && n(a2.value, u++, this) !== false; )
        ;
    return u;
  }, r2.prototype.__iteratorUncached = function(n, i2) {
    if (i2)
      return this.cacheResult().__iterator(n, i2);
    var o2 = this._collection, s = qr(o2);
    if (!de(s))
      return new g2(U);
    var u = 0;
    return new g2(function() {
      var a2 = s.next();
      return a2.done ? a2 : b(n, u++, a2.value);
    });
  }, r2;
}(G);
var ye;
function Br() {
  return ye || (ye = new gt([]));
}
function Fr(t) {
  var r2 = kr(t);
  if (r2)
    return r2.fromEntrySeq();
  if (typeof t == "object")
    return new Pr(t);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t);
}
function Ve(t) {
  var r2 = kr(t);
  if (r2)
    return r2;
  throw new TypeError("Expected Array or collection object of values: " + t);
}
function Gn(t) {
  var r2 = kr(t);
  if (r2)
    return Xn(t) ? r2.fromEntrySeq() : Zn(t) ? r2.toSetSeq() : r2;
  if (typeof t == "object")
    return new Pr(t);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t);
}
function kr(t) {
  return Ge(t) ? new gt(t) : Qe(t) ? new Qn(t) : void 0;
}
var xe = "@@__IMMUTABLE_MAP__@@";
function Wr(t) {
  return Boolean(t && t[xe]);
}
function tn(t) {
  return Wr(t) && x(t);
}
function ge(t) {
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
  return !!(ge(t) && ge(r2) && t.equals(r2));
}
var Pt = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function(r2, e2) {
  r2 |= 0, e2 |= 0;
  var n = r2 & 65535, i2 = e2 & 65535;
  return n * i2 + ((r2 >>> 16) * i2 + n * (e2 >>> 16) << 16 >>> 0) | 0;
};
function dr(t) {
  return t >>> 1 & 1073741824 | t & 3221225471;
}
var Vn = Object.prototype.valueOf;
function W(t) {
  if (t == null)
    return me(t);
  if (typeof t.hashCode == "function")
    return dr(t.hashCode(t));
  var r2 = ii(t);
  if (r2 == null)
    return me(r2);
  switch (typeof r2) {
    case "boolean":
      return r2 ? 1108378657 : 1108378656;
    case "number":
      return xn(r2);
    case "string":
      return r2.length > oi ? ti(r2) : Rr(r2);
    case "object":
    case "function":
      return ei(r2);
    case "symbol":
      return ri(r2);
    default:
      if (typeof r2.toString == "function")
        return Rr(r2.toString());
      throw new Error("Value type " + typeof r2 + " cannot be hashed.");
  }
}
function me(t) {
  return t === null ? 1108378658 : 1108378659;
}
function xn(t) {
  if (t !== t || t === 1 / 0)
    return 0;
  var r2 = t | 0;
  for (r2 !== t && (r2 ^= t * 4294967295); t > 4294967295; )
    t /= 4294967295, r2 ^= t;
  return dr(r2);
}
function ti(t) {
  var r2 = Ir[t];
  return r2 === void 0 && (r2 = Rr(t), Or === si && (Or = 0, Ir = {}), Or++, Ir[t] = r2), r2;
}
function Rr(t) {
  for (var r2 = 0, e2 = 0; e2 < t.length; e2++)
    r2 = 31 * r2 + t.charCodeAt(e2) | 0;
  return dr(r2);
}
function ri(t) {
  var r2 = Oe[t];
  return r2 !== void 0 || (r2 = rn(), Oe[t] = r2), r2;
}
function ei(t) {
  var r2;
  if (jr && (r2 = Tr.get(t), r2 !== void 0) || (r2 = t[yt], r2 !== void 0) || !we && (r2 = t.propertyIsEnumerable && t.propertyIsEnumerable[yt], r2 !== void 0 || (r2 = ni(t), r2 !== void 0)))
    return r2;
  if (r2 = rn(), jr)
    Tr.set(t, r2);
  else {
    if (Se !== void 0 && Se(t) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (we)
      Object.defineProperty(t, yt, { enumerable: false, configurable: false, writable: false, value: r2 });
    else if (t.propertyIsEnumerable !== void 0 && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable)
      t.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t.propertyIsEnumerable[yt] = r2;
    else if (t.nodeType !== void 0)
      t[yt] = r2;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return r2;
}
var Se = Object.isExtensible;
var we = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function ni(t) {
  if (t && t.nodeType > 0)
    switch (t.nodeType) {
      case 1:
        return t.uniqueID;
      case 9:
        return t.documentElement && t.documentElement.uniqueID;
    }
}
function ii(t) {
  return t.valueOf !== Vn && typeof t.valueOf == "function" ? t.valueOf(t) : t;
}
function rn() {
  var t = ++wr;
  return wr & 1073741824 && (wr = 0), t;
}
var jr = typeof WeakMap == "function";
var Tr;
jr && (Tr = /* @__PURE__ */ new WeakMap());
var Oe = /* @__PURE__ */ Object.create(null);
var wr = 0;
var yt = "__immutablehash__";
typeof Symbol == "function" && (yt = Symbol(yt));
var oi = 16;
var si = 255;
var Or = 0;
var Ir = {};
var yr = function(t) {
  function r2(e2, n) {
    this._iter = e2, this._useKeys = n, this.size = e2.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.get = function(n, i2) {
    return this._iter.get(n, i2);
  }, r2.prototype.has = function(n) {
    return this._iter.has(n);
  }, r2.prototype.valueSeq = function() {
    return this._iter.valueSeq();
  }, r2.prototype.reverse = function() {
    var n = this, i2 = Kr(this, true);
    return this._useKeys || (i2.valueSeq = function() {
      return n._iter.toSeq().reverse();
    }), i2;
  }, r2.prototype.map = function(n, i2) {
    var o2 = this, s = un(this, n, i2);
    return this._useKeys || (s.valueSeq = function() {
      return o2._iter.toSeq().map(n, i2);
    }), s;
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s, u) {
      return n(s, u, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    return this._iter.__iterator(n, i2);
  }, r2;
}(dt);
yr.prototype[$t] = true;
var en = function(t) {
  function r2(e2) {
    this._iter = e2, this.size = e2.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.includes = function(n) {
    return this._iter.includes(n);
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this, s = 0;
    return i2 && It(this), this._iter.__iterate(function(u) {
      return n(u, i2 ? o2.size - ++s : s++, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this, s = this._iter.__iterator(tt, i2), u = 0;
    return i2 && It(this), new g2(function() {
      var a2 = s.next();
      return a2.done ? a2 : b(n, i2 ? o2.size - ++u : u++, a2.value, a2);
    });
  }, r2;
}(G);
var nn = function(t) {
  function r2(e2) {
    this._iter = e2, this.size = e2.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.has = function(n) {
    return this._iter.includes(n);
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s) {
      return n(s, s, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this._iter.__iterator(tt, i2);
    return new g2(function() {
      var s = o2.next();
      return s.done ? s : b(n, s.value, s.value, s);
    });
  }, r2;
}(Nt);
var on = function(t) {
  function r2(e2) {
    this._iter = e2, this.size = e2.size;
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.entrySeq = function() {
    return this._iter.toSeq();
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(s) {
      if (s) {
        be(s);
        var u = F(s);
        return n(u ? s.get(1) : s[1], u ? s.get(0) : s[0], o2);
      }
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this._iter.__iterator(tt, i2);
    return new g2(function() {
      for (; ; ) {
        var s = o2.next();
        if (s.done)
          return s;
        var u = s.value;
        if (u) {
          be(u);
          var a2 = F(u);
          return b(n, a2 ? u.get(0) : u[0], a2 ? u.get(1) : u[1], s);
        }
      }
    });
  }, r2;
}(dt);
en.prototype.cacheResult = yr.prototype.cacheResult = nn.prototype.cacheResult = on.prototype.cacheResult = Yr;
function sn(t) {
  var r2 = ot(t);
  return r2._iter = t, r2.size = t.size, r2.flip = function() {
    return t;
  }, r2.reverse = function() {
    var e2 = t.reverse.apply(this);
    return e2.flip = function() {
      return t.reverse();
    }, e2;
  }, r2.has = function(e2) {
    return t.includes(e2);
  }, r2.includes = function(e2) {
    return t.has(e2);
  }, r2.cacheResult = Yr, r2.__iterateUncached = function(e2, n) {
    var i2 = this;
    return t.__iterate(function(o2, s) {
      return e2(s, o2, i2) !== false;
    }, n);
  }, r2.__iteratorUncached = function(e2, n) {
    if (e2 === Z) {
      var i2 = t.__iterator(e2, n);
      return new g2(function() {
        var o2 = i2.next();
        if (!o2.done) {
          var s = o2.value[0];
          o2.value[0] = o2.value[1], o2.value[1] = s;
        }
        return o2;
      });
    }
    return t.__iterator(e2 === tt ? xt : tt, n);
  }, r2;
}
function un(t, r2, e2) {
  var n = ot(t);
  return n.size = t.size, n.has = function(i2) {
    return t.has(i2);
  }, n.get = function(i2, o2) {
    var s = t.get(i2, y);
    return s === y ? o2 : r2.call(e2, s, i2, t);
  }, n.__iterateUncached = function(i2, o2) {
    var s = this;
    return t.__iterate(function(u, a2, f) {
      return i2(r2.call(e2, u, a2, f), a2, s) !== false;
    }, o2);
  }, n.__iteratorUncached = function(i2, o2) {
    var s = t.__iterator(Z, o2);
    return new g2(function() {
      var u = s.next();
      if (u.done)
        return u;
      var a2 = u.value, f = a2[0];
      return b(i2, f, r2.call(e2, a2[1], f, t), u);
    });
  }, n;
}
function Kr(t, r2) {
  var e2 = this, n = ot(t);
  return n._iter = t, n.size = t.size, n.reverse = function() {
    return t;
  }, t.flip && (n.flip = function() {
    var i2 = sn(t);
    return i2.reverse = function() {
      return t.flip();
    }, i2;
  }), n.get = function(i2, o2) {
    return t.get(r2 ? i2 : -1 - i2, o2);
  }, n.has = function(i2) {
    return t.has(r2 ? i2 : -1 - i2);
  }, n.includes = function(i2) {
    return t.includes(i2);
  }, n.cacheResult = Yr, n.__iterate = function(i2, o2) {
    var s = this, u = 0;
    return o2 && It(t), t.__iterate(function(a2, f) {
      return i2(a2, r2 ? f : o2 ? s.size - ++u : u++, s);
    }, !o2);
  }, n.__iterator = function(i2, o2) {
    var s = 0;
    o2 && It(t);
    var u = t.__iterator(Z, !o2);
    return new g2(function() {
      var a2 = u.next();
      if (a2.done)
        return a2;
      var f = a2.value;
      return b(i2, r2 ? f[0] : o2 ? e2.size - ++s : s++, f[1], a2);
    });
  }, n;
}
function an(t, r2, e2, n) {
  var i2 = ot(t);
  return n && (i2.has = function(o2) {
    var s = t.get(o2, y);
    return s !== y && !!r2.call(e2, s, o2, t);
  }, i2.get = function(o2, s) {
    var u = t.get(o2, y);
    return u !== y && r2.call(e2, u, o2, t) ? u : s;
  }), i2.__iterateUncached = function(o2, s) {
    var u = this, a2 = 0;
    return t.__iterate(function(f, h2, c) {
      if (r2.call(e2, f, h2, c))
        return a2++, o2(f, n ? h2 : a2 - 1, u);
    }, s), a2;
  }, i2.__iteratorUncached = function(o2, s) {
    var u = t.__iterator(Z, s), a2 = 0;
    return new g2(function() {
      for (; ; ) {
        var f = u.next();
        if (f.done)
          return f;
        var h2 = f.value, c = h2[0], p2 = h2[1];
        if (r2.call(e2, p2, c, t))
          return b(o2, n ? c : a2++, p2, f);
      }
    });
  }, i2;
}
function ui(t, r2, e2) {
  var n = Lt().asMutable();
  return t.__iterate(function(i2, o2) {
    n.update(r2.call(e2, i2, o2, t), 0, function(s) {
      return s + 1;
    });
  }), n.asImmutable();
}
function ai(t, r2, e2) {
  var n = z(t), i2 = (x(t) ? ht() : Lt()).asMutable();
  t.__iterate(function(s, u) {
    i2.update(r2.call(e2, s, u, t), function(a2) {
      return a2 = a2 || [], a2.push(n ? [u, s] : s), a2;
    });
  });
  var o2 = cn(t);
  return i2.map(function(s) {
    return w(t, o2(s));
  }).asImmutable();
}
function Jr(t, r2, e2, n) {
  var i2 = t.size;
  if (Gt(r2, e2, i2))
    return t;
  var o2 = Rt(r2, i2), s = Vt(e2, i2);
  if (o2 !== o2 || s !== s)
    return Jr(t.toSeq().cacheResult(), r2, e2, n);
  var u = s - o2, a2;
  u === u && (a2 = u < 0 ? 0 : u);
  var f = ot(t);
  return f.size = a2 === 0 ? a2 : t.size && a2 || void 0, !n && Ur(t) && a2 >= 0 && (f.get = function(h2, c) {
    return h2 = vt(this, h2), h2 >= 0 && h2 < a2 ? t.get(h2 + o2, c) : c;
  }), f.__iterateUncached = function(h2, c) {
    var p2 = this;
    if (a2 === 0)
      return 0;
    if (c)
      return this.cacheResult().__iterate(h2, c);
    var _ = 0, v2 = true, l2 = 0;
    return t.__iterate(function(m2, d) {
      if (!(v2 && (v2 = _++ < o2)))
        return l2++, h2(m2, n ? d : l2 - 1, p2) !== false && l2 !== a2;
    }), l2;
  }, f.__iteratorUncached = function(h2, c) {
    if (a2 !== 0 && c)
      return this.cacheResult().__iterator(h2, c);
    if (a2 === 0)
      return new g2(U);
    var p2 = t.__iterator(h2, c), _ = 0, v2 = 0;
    return new g2(function() {
      for (; _++ < o2; )
        p2.next();
      if (++v2 > a2)
        return U();
      var l2 = p2.next();
      return n || h2 === tt || l2.done ? l2 : h2 === xt ? b(h2, v2 - 1, void 0, l2) : b(h2, v2 - 1, l2.value[1], l2);
    });
  }, f;
}
function fi(t, r2, e2) {
  var n = ot(t);
  return n.__iterateUncached = function(i2, o2) {
    var s = this;
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var u = 0;
    return t.__iterate(function(a2, f, h2) {
      return r2.call(e2, a2, f, h2) && ++u && i2(a2, f, s);
    }), u;
  }, n.__iteratorUncached = function(i2, o2) {
    var s = this;
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var u = t.__iterator(Z, o2), a2 = true;
    return new g2(function() {
      if (!a2)
        return U();
      var f = u.next();
      if (f.done)
        return f;
      var h2 = f.value, c = h2[0], p2 = h2[1];
      return r2.call(e2, p2, c, s) ? i2 === Z ? f : b(i2, c, p2, f) : (a2 = false, U());
    });
  }, n;
}
function fn(t, r2, e2, n) {
  var i2 = ot(t);
  return i2.__iterateUncached = function(o2, s) {
    var u = this;
    if (s)
      return this.cacheResult().__iterate(o2, s);
    var a2 = true, f = 0;
    return t.__iterate(function(h2, c, p2) {
      if (!(a2 && (a2 = r2.call(e2, h2, c, p2))))
        return f++, o2(h2, n ? c : f - 1, u);
    }), f;
  }, i2.__iteratorUncached = function(o2, s) {
    var u = this;
    if (s)
      return this.cacheResult().__iterator(o2, s);
    var a2 = t.__iterator(Z, s), f = true, h2 = 0;
    return new g2(function() {
      var c, p2, _;
      do {
        if (c = a2.next(), c.done)
          return n || o2 === tt ? c : o2 === xt ? b(o2, h2++, void 0, c) : b(o2, h2++, c.value[1], c);
        var v2 = c.value;
        p2 = v2[0], _ = v2[1], f && (f = r2.call(e2, _, p2, u));
      } while (f);
      return o2 === Z ? c : b(o2, p2, _, c);
    });
  }, i2;
}
function hi(t, r2) {
  var e2 = z(t), n = [t].concat(r2).map(function(s) {
    return F(s) ? e2 && (s = Q(s)) : s = e2 ? Fr(s) : Ve(Array.isArray(s) ? s : [s]), s;
  }).filter(function(s) {
    return s.size !== 0;
  });
  if (n.length === 0)
    return t;
  if (n.length === 1) {
    var i2 = n[0];
    if (i2 === t || e2 && z(i2) || B(t) && B(i2))
      return i2;
  }
  var o2 = new gt(n);
  return e2 ? o2 = o2.toKeyedSeq() : B(t) || (o2 = o2.toSetSeq()), o2 = o2.flatten(true), o2.size = n.reduce(function(s, u) {
    if (s !== void 0) {
      var a2 = u.size;
      if (a2 !== void 0)
        return s + a2;
    }
  }, 0), o2;
}
function hn(t, r2, e2) {
  var n = ot(t);
  return n.__iterateUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var s = 0, u = false;
    function a2(f, h2) {
      f.__iterate(function(c, p2) {
        return (!r2 || h2 < r2) && F(c) ? a2(c, h2 + 1) : (s++, i2(c, e2 ? p2 : s - 1, n) === false && (u = true)), !u;
      }, o2);
    }
    return a2(t, 0), s;
  }, n.__iteratorUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var s = t.__iterator(i2, o2), u = [], a2 = 0;
    return new g2(function() {
      for (; s; ) {
        var f = s.next();
        if (f.done !== false) {
          s = u.pop();
          continue;
        }
        var h2 = f.value;
        if (i2 === Z && (h2 = h2[1]), (!r2 || u.length < r2) && F(h2))
          u.push(s), s = h2.__iterator(i2, o2);
        else
          return e2 ? f : b(i2, a2++, h2, f);
      }
      return U();
    });
  }, n;
}
function ci(t, r2, e2) {
  var n = cn(t);
  return t.toSeq().map(function(i2, o2) {
    return n(r2.call(e2, i2, o2, t));
  }).flatten(true);
}
function pi(t, r2) {
  var e2 = ot(t);
  return e2.size = t.size && t.size * 2 - 1, e2.__iterateUncached = function(n, i2) {
    var o2 = this, s = 0;
    return t.__iterate(function(u) {
      return (!s || n(r2, s++, o2) !== false) && n(u, s++, o2) !== false;
    }, i2), s;
  }, e2.__iteratorUncached = function(n, i2) {
    var o2 = t.__iterator(tt, i2), s = 0, u;
    return new g2(function() {
      return (!u || s % 2) && (u = o2.next(), u.done) ? u : s % 2 ? b(n, s++, r2) : b(n, s++, u.value, u);
    });
  }, e2;
}
function bt(t, r2, e2) {
  r2 || (r2 = pn);
  var n = z(t), i2 = 0, o2 = t.toSeq().map(function(s, u) {
    return [u, s, i2++, e2 ? e2(s, u, t) : s];
  }).valueSeq().toArray();
  return o2.sort(function(s, u) {
    return r2(s[3], u[3]) || s[2] - u[2];
  }).forEach(n ? function(s, u) {
    o2[u].length = 2;
  } : function(s, u) {
    o2[u] = s[1];
  }), n ? dt(o2) : B(t) ? G(o2) : Nt(o2);
}
function or(t, r2, e2) {
  if (r2 || (r2 = pn), e2) {
    var n = t.toSeq().map(function(i2, o2) {
      return [i2, e2(i2, o2, t)];
    }).reduce(function(i2, o2) {
      return Ie(r2, i2[1], o2[1]) ? o2 : i2;
    });
    return n && n[0];
  }
  return t.reduce(function(i2, o2) {
    return Ie(r2, i2, o2) ? o2 : i2;
  });
}
function Ie(t, r2, e2) {
  var n = t(e2, r2);
  return n === 0 && e2 !== r2 && (e2 == null || e2 !== e2) || n > 0;
}
function sr(t, r2, e2, n) {
  var i2 = ot(t), o2 = new gt(e2).map(function(s) {
    return s.size;
  });
  return i2.size = n ? o2.max() : o2.min(), i2.__iterate = function(s, u) {
    for (var a2 = this.__iterator(tt, u), f, h2 = 0; !(f = a2.next()).done && s(f.value, h2++, this) !== false; )
      ;
    return h2;
  }, i2.__iteratorUncached = function(s, u) {
    var a2 = e2.map(function(c) {
      return c = A(c), qr(u ? c.reverse() : c);
    }), f = 0, h2 = false;
    return new g2(function() {
      var c;
      return h2 || (c = a2.map(function(p2) {
        return p2.next();
      }), h2 = n ? c.every(function(p2) {
        return p2.done;
      }) : c.some(function(p2) {
        return p2.done;
      })), h2 ? U() : b(s, f++, r2.apply(null, c.map(function(p2) {
        return p2.value;
      })));
    });
  }, i2;
}
function w(t, r2) {
  return t === r2 ? t : Ur(t) ? r2 : t.constructor(r2);
}
function be(t) {
  if (t !== Object(t))
    throw new TypeError("Expected [K, V] tuple: " + t);
}
function cn(t) {
  return z(t) ? Q : B(t) ? mt : jt;
}
function ot(t) {
  return Object.create((z(t) ? dt : B(t) ? G : Nt).prototype);
}
function Yr() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : K.prototype.cacheResult.call(this);
}
function pn(t, r2) {
  return t === void 0 && r2 === void 0 ? 0 : t === void 0 ? 1 : r2 === void 0 ? -1 : t > r2 ? 1 : t < r2 ? -1 : 0;
}
function nt(t, r2) {
  r2 = r2 || 0;
  for (var e2 = Math.max(0, t.length - r2), n = new Array(e2), i2 = 0; i2 < e2; i2++)
    n[i2] = t[i2 + r2];
  return n;
}
function Hr(t, r2) {
  if (!t)
    throw new Error(r2);
}
function X(t) {
  Hr(t !== 1 / 0, "Cannot perform this action with an infinite size.");
}
function _n(t) {
  if (Ge(t) && typeof t != "string")
    return t;
  if (x(t))
    return t.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t);
}
var _i = Object.prototype.toString;
function vi(t) {
  if (!t || typeof t != "object" || _i.call(t) !== "[object Object]")
    return false;
  var r2 = Object.getPrototypeOf(t);
  if (r2 === null)
    return true;
  for (var e2 = r2, n = Object.getPrototypeOf(r2); n !== null; )
    e2 = n, n = Object.getPrototypeOf(e2);
  return e2 === r2;
}
function lt(t) {
  return typeof t == "object" && (it(t) || Array.isArray(t) || vi(t));
}
function Kt(t) {
  try {
    return typeof t == "string" ? JSON.stringify(t) : String(t);
  } catch {
    return JSON.stringify(t);
  }
}
function li(t, r2) {
  return it(t) ? t.has(r2) : lt(t) && Dt.call(t, r2);
}
function vn(t, r2, e2) {
  return it(t) ? t.get(r2, e2) : li(t, r2) ? typeof t.get == "function" ? t.get(r2) : t[r2] : e2;
}
function cr(t) {
  if (Array.isArray(t))
    return nt(t);
  var r2 = {};
  for (var e2 in t)
    Dt.call(t, e2) && (r2[e2] = t[e2]);
  return r2;
}
function di(t, r2) {
  if (!lt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (it(t)) {
    if (!t.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t);
    return t.remove(r2);
  }
  if (!Dt.call(t, r2))
    return t;
  var e2 = cr(t);
  return Array.isArray(e2) ? e2.splice(r2, 1) : delete e2[r2], e2;
}
function yi(t, r2, e2) {
  if (!lt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (it(t)) {
    if (!t.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t);
    return t.set(r2, e2);
  }
  if (Dt.call(t, r2) && e2 === t[r2])
    return t;
  var n = cr(t);
  return n[r2] = e2, n;
}
function Ct(t, r2, e2, n) {
  n || (n = e2, e2 = void 0);
  var i2 = ln(it(t), t, _n(r2), 0, e2, n);
  return i2 === y ? e2 : i2;
}
function ln(t, r2, e2, n, i2, o2) {
  var s = r2 === y;
  if (n === e2.length) {
    var u = s ? i2 : r2, a2 = o2(u);
    return a2 === u ? r2 : a2;
  }
  if (!s && !lt(r2))
    throw new TypeError("Cannot update within non-data-structure value in path [" + e2.slice(0, n).map(Kt) + "]: " + r2);
  var f = e2[n], h2 = s ? y : vn(r2, f, y), c = ln(h2 === y ? t : it(h2), h2, e2, n + 1, i2, o2);
  return c === h2 ? r2 : c === y ? di(r2, f) : yi(s ? t ? V() : {} : r2, f, c);
}
function gi(t, r2, e2) {
  return Ct(t, r2, y, function() {
    return e2;
  });
}
function Xr(t, r2) {
  return gi(this, t, r2);
}
function mi(t, r2) {
  return Ct(t, r2, function() {
    return y;
  });
}
function Zr(t) {
  return mi(this, t);
}
function dn(t, r2, e2, n) {
  return Ct(t, [r2], e2, n);
}
function Qr(t, r2, e2) {
  return arguments.length === 1 ? t(this) : dn(this, t, r2, e2);
}
function Gr(t, r2, e2) {
  return Ct(this, t, r2, e2);
}
function yn() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return mn(this, t);
}
function gn(t) {
  for (var r2 = [], e2 = arguments.length - 1; e2-- > 0; )
    r2[e2] = arguments[e2 + 1];
  if (typeof t != "function")
    throw new TypeError("Invalid merger function: " + t);
  return mn(this, r2, t);
}
function mn(t, r2, e2) {
  for (var n = [], i2 = 0; i2 < r2.length; i2++) {
    var o2 = Q(r2[i2]);
    o2.size !== 0 && n.push(o2);
  }
  return n.length === 0 ? t : t.toSeq().size === 0 && !t.__ownerID && n.length === 1 ? t.constructor(n[0]) : t.withMutations(function(s) {
    for (var u = e2 ? function(f, h2) {
      dn(s, h2, y, function(c) {
        return c === y ? f : e2(c, f, h2);
      });
    } : function(f, h2) {
      s.set(h2, f);
    }, a2 = 0; a2 < n.length; a2++)
      n[a2].forEach(u);
  });
}
function Vr(t, r2, e2) {
  return xr(t, r2, Si(e2));
}
function xr(t, r2, e2) {
  if (!lt(t))
    throw new TypeError("Cannot merge into non-data-structure value: " + t);
  if (it(t))
    return typeof e2 == "function" && t.mergeWith ? t.mergeWith.apply(t, [e2].concat(r2)) : t.merge ? t.merge.apply(t, r2) : t.concat.apply(t, r2);
  for (var n = Array.isArray(t), i2 = t, o2 = n ? mt : Q, s = n ? function(a2) {
    i2 === t && (i2 = cr(i2)), i2.push(a2);
  } : function(a2, f) {
    var h2 = Dt.call(i2, f), c = h2 && e2 ? e2(i2[f], a2, f) : a2;
    (!h2 || c !== i2[f]) && (i2 === t && (i2 = cr(i2)), i2[f] = c);
  }, u = 0; u < r2.length; u++)
    o2(r2[u]).forEach(s);
  return i2;
}
function Si(t) {
  function r2(e2, n, i2) {
    return lt(e2) && lt(n) && wi(e2, n) ? xr(e2, [n], r2) : t ? t(e2, n, i2) : n;
  }
  return r2;
}
function wi(t, r2) {
  var e2 = K(t), n = K(r2);
  return B(e2) === B(n) && z(e2) === z(n);
}
function Sn() {
  for (var t = [], r2 = arguments.length; r2--; )
    t[r2] = arguments[r2];
  return Vr(this, t);
}
function wn(t) {
  for (var r2 = [], e2 = arguments.length - 1; e2-- > 0; )
    r2[e2] = arguments[e2 + 1];
  return Vr(this, r2, t);
}
function te(t) {
  for (var r2 = [], e2 = arguments.length - 1; e2-- > 0; )
    r2[e2] = arguments[e2 + 1];
  return Ct(this, t, V(), function(n) {
    return xr(n, r2);
  });
}
function re(t) {
  for (var r2 = [], e2 = arguments.length - 1; e2-- > 0; )
    r2[e2] = arguments[e2 + 1];
  return Ct(this, t, V(), function(n) {
    return Vr(n, r2);
  });
}
function tr(t) {
  var r2 = this.asMutable();
  return t(r2), r2.wasAltered() ? r2.__ensureOwner(this.__ownerID) : this;
}
function rr() {
  return this.__ownerID ? this : this.__ensureOwner(new Lr());
}
function er() {
  return this.__ensureOwner();
}
function ee() {
  return this.__altered;
}
var Lt = function(t) {
  function r2(e2) {
    return e2 == null ? V() : Wr(e2) && !x(e2) ? e2 : V().withMutations(function(n) {
      var i2 = t(e2);
      X(i2.size), i2.forEach(function(o2, s) {
        return n.set(s, o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    return V().withMutations(function(o2) {
      for (var s = 0; s < n.length; s += 2) {
        if (s + 1 >= n.length)
          throw new Error("Missing value for key: " + n[s]);
        o2.set(n[s], n[s + 1]);
      }
    });
  }, r2.prototype.toString = function() {
    return this.__toString("Map {", "}");
  }, r2.prototype.get = function(n, i2) {
    return this._root ? this._root.get(0, void 0, n, i2) : i2;
  }, r2.prototype.set = function(n, i2) {
    return Me(this, n, i2);
  }, r2.prototype.remove = function(n) {
    return Me(this, n, y);
  }, r2.prototype.deleteAll = function(n) {
    var i2 = A(n);
    return i2.size === 0 ? this : this.withMutations(function(o2) {
      i2.forEach(function(s) {
        return o2.remove(s);
      });
    });
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : V();
  }, r2.prototype.sort = function(n) {
    return ht(bt(this, n));
  }, r2.prototype.sortBy = function(n, i2) {
    return ht(bt(this, i2, n));
  }, r2.prototype.map = function(n, i2) {
    var o2 = this;
    return this.withMutations(function(s) {
      s.forEach(function(u, a2) {
        s.set(a2, n.call(i2, u, a2, o2));
      });
    });
  }, r2.prototype.__iterator = function(n, i2) {
    return new Oi(this, n, i2);
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this, s = 0;
    return this._root && this._root.iterate(function(u) {
      return s++, n(u[1], u[0], o2);
    }, i2), s;
  }, r2.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? ne(this.size, this._root, n, this.__hash) : this.size === 0 ? V() : (this.__ownerID = n, this.__altered = false, this);
  }, r2;
}(Q);
Lt.isMap = Wr;
var E = Lt.prototype;
E[xe] = true;
E[Qt] = E.remove;
E.removeAll = E.deleteAll;
E.setIn = Xr;
E.removeIn = E.deleteIn = Zr;
E.update = Qr;
E.updateIn = Gr;
E.merge = E.concat = yn;
E.mergeWith = gn;
E.mergeDeep = Sn;
E.mergeDeepWith = wn;
E.mergeIn = te;
E.mergeDeepIn = re;
E.withMutations = tr;
E.wasAltered = ee;
E.asImmutable = er;
E["@@transducer/init"] = E.asMutable = rr;
E["@@transducer/step"] = function(t, r2) {
  return t.set(r2[0], r2[1]);
};
E["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var Jt = function(r2, e2) {
  this.ownerID = r2, this.entries = e2;
};
Jt.prototype.get = function(r2, e2, n, i2) {
  for (var o2 = this.entries, s = 0, u = o2.length; s < u; s++)
    if (D(n, o2[s][0]))
      return o2[s][1];
  return i2;
};
Jt.prototype.update = function(r2, e2, n, i2, o2, s, u) {
  for (var a2 = o2 === y, f = this.entries, h2 = 0, c = f.length; h2 < c && !D(i2, f[h2][0]); h2++)
    ;
  var p2 = h2 < c;
  if (p2 ? f[h2][1] === o2 : a2)
    return this;
  if (H(u), (a2 || !p2) && H(s), !(a2 && f.length === 1)) {
    if (!p2 && !a2 && f.length >= Ai)
      return Ii(r2, f, i2, o2);
    var _ = r2 && r2 === this.ownerID, v2 = _ ? f : nt(f);
    return p2 ? a2 ? h2 === c - 1 ? v2.pop() : v2[h2] = v2.pop() : v2[h2] = [i2, o2] : v2.push([i2, o2]), _ ? (this.entries = v2, this) : new Jt(r2, v2);
  }
};
var Et = function(r2, e2, n) {
  this.ownerID = r2, this.bitmap = e2, this.nodes = n;
};
Et.prototype.get = function(r2, e2, n, i2) {
  e2 === void 0 && (e2 = W(n));
  var o2 = 1 << ((r2 === 0 ? e2 : e2 >>> r2) & L), s = this.bitmap;
  return (s & o2) === 0 ? i2 : this.nodes[On(s & o2 - 1)].get(r2 + I, e2, n, i2);
};
Et.prototype.update = function(r2, e2, n, i2, o2, s, u) {
  n === void 0 && (n = W(i2));
  var a2 = (e2 === 0 ? n : n >>> e2) & L, f = 1 << a2, h2 = this.bitmap, c = (h2 & f) !== 0;
  if (!c && o2 === y)
    return this;
  var p2 = On(h2 & f - 1), _ = this.nodes, v2 = c ? _[p2] : void 0, l2 = ie(v2, r2, e2 + I, n, i2, o2, s, u);
  if (l2 === v2)
    return this;
  if (!c && l2 && _.length >= qi)
    return Ei(r2, _, h2, a2, l2);
  if (c && !l2 && _.length === 2 && Ae(_[p2 ^ 1]))
    return _[p2 ^ 1];
  if (c && l2 && _.length === 1 && Ae(l2))
    return l2;
  var m2 = r2 && r2 === this.ownerID, d = c ? l2 ? h2 : h2 ^ f : h2 | f, S = c ? l2 ? In(_, p2, l2, m2) : Mi(_, p2, m2) : zi(_, p2, l2, m2);
  return m2 ? (this.bitmap = d, this.nodes = S, this) : new Et(r2, d, S);
};
var Yt = function(r2, e2, n) {
  this.ownerID = r2, this.count = e2, this.nodes = n;
};
Yt.prototype.get = function(r2, e2, n, i2) {
  e2 === void 0 && (e2 = W(n));
  var o2 = (r2 === 0 ? e2 : e2 >>> r2) & L, s = this.nodes[o2];
  return s ? s.get(r2 + I, e2, n, i2) : i2;
};
Yt.prototype.update = function(r2, e2, n, i2, o2, s, u) {
  n === void 0 && (n = W(i2));
  var a2 = (e2 === 0 ? n : n >>> e2) & L, f = o2 === y, h2 = this.nodes, c = h2[a2];
  if (f && !c)
    return this;
  var p2 = ie(c, r2, e2 + I, n, i2, o2, s, u);
  if (p2 === c)
    return this;
  var _ = this.count;
  if (!c)
    _++;
  else if (!p2 && (_--, _ < Ri))
    return bi(r2, h2, _, a2);
  var v2 = r2 && r2 === this.ownerID, l2 = In(h2, a2, p2, v2);
  return v2 ? (this.count = _, this.nodes = l2, this) : new Yt(r2, _, l2);
};
var zt = function(r2, e2, n) {
  this.ownerID = r2, this.keyHash = e2, this.entries = n;
};
zt.prototype.get = function(r2, e2, n, i2) {
  for (var o2 = this.entries, s = 0, u = o2.length; s < u; s++)
    if (D(n, o2[s][0]))
      return o2[s][1];
  return i2;
};
zt.prototype.update = function(r2, e2, n, i2, o2, s, u) {
  n === void 0 && (n = W(i2));
  var a2 = o2 === y;
  if (n !== this.keyHash)
    return a2 ? this : (H(u), H(s), oe(this, r2, e2, n, [i2, o2]));
  for (var f = this.entries, h2 = 0, c = f.length; h2 < c && !D(i2, f[h2][0]); h2++)
    ;
  var p2 = h2 < c;
  if (p2 ? f[h2][1] === o2 : a2)
    return this;
  if (H(u), (a2 || !p2) && H(s), a2 && c === 2)
    return new ft(r2, this.keyHash, f[h2 ^ 1]);
  var _ = r2 && r2 === this.ownerID, v2 = _ ? f : nt(f);
  return p2 ? a2 ? h2 === c - 1 ? v2.pop() : v2[h2] = v2.pop() : v2[h2] = [i2, o2] : v2.push([i2, o2]), _ ? (this.entries = v2, this) : new zt(r2, this.keyHash, v2);
};
var ft = function(r2, e2, n) {
  this.ownerID = r2, this.keyHash = e2, this.entry = n;
};
ft.prototype.get = function(r2, e2, n, i2) {
  return D(n, this.entry[0]) ? this.entry[1] : i2;
};
ft.prototype.update = function(r2, e2, n, i2, o2, s, u) {
  var a2 = o2 === y, f = D(i2, this.entry[0]);
  if (f ? o2 === this.entry[1] : a2)
    return this;
  if (H(u), a2) {
    H(s);
    return;
  }
  return f ? r2 && r2 === this.ownerID ? (this.entry[1] = o2, this) : new ft(r2, this.keyHash, [i2, o2]) : (H(s), oe(this, r2, e2, W(i2), [i2, o2]));
};
Jt.prototype.iterate = zt.prototype.iterate = function(t, r2) {
  for (var e2 = this.entries, n = 0, i2 = e2.length - 1; n <= i2; n++)
    if (t(e2[r2 ? i2 - n : n]) === false)
      return false;
};
Et.prototype.iterate = Yt.prototype.iterate = function(t, r2) {
  for (var e2 = this.nodes, n = 0, i2 = e2.length - 1; n <= i2; n++) {
    var o2 = e2[r2 ? i2 - n : n];
    if (o2 && o2.iterate(t, r2) === false)
      return false;
  }
};
ft.prototype.iterate = function(t, r2) {
  return t(this.entry);
};
var Oi = function(t) {
  function r2(e2, n, i2) {
    this._type = n, this._reverse = i2, this._stack = e2._root && Ee(e2._root);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.next = function() {
    for (var n = this._type, i2 = this._stack; i2; ) {
      var o2 = i2.node, s = i2.index++, u = void 0;
      if (o2.entry) {
        if (s === 0)
          return br(n, o2.entry);
      } else if (o2.entries) {
        if (u = o2.entries.length - 1, s <= u)
          return br(n, o2.entries[this._reverse ? u - s : s]);
      } else if (u = o2.nodes.length - 1, s <= u) {
        var a2 = o2.nodes[this._reverse ? u - s : s];
        if (a2) {
          if (a2.entry)
            return br(n, a2.entry);
          i2 = this._stack = Ee(a2, i2);
        }
        continue;
      }
      i2 = this._stack = this._stack.__prev;
    }
    return U();
  }, r2;
}(g2);
function br(t, r2) {
  return b(t, r2[0], r2[1]);
}
function Ee(t, r2) {
  return { node: t, index: 0, __prev: r2 };
}
function ne(t, r2, e2, n) {
  var i2 = Object.create(E);
  return i2.size = t, i2._root = r2, i2.__ownerID = e2, i2.__hash = n, i2.__altered = false, i2;
}
var ze;
function V() {
  return ze || (ze = ne(0));
}
function Me(t, r2, e2) {
  var n, i2;
  if (t._root) {
    var o2 = Mr(), s = Mr();
    if (n = ie(t._root, t.__ownerID, 0, void 0, r2, e2, o2, s), !s.value)
      return t;
    i2 = t.size + (o2.value ? e2 === y ? -1 : 1 : 0);
  } else {
    if (e2 === y)
      return t;
    i2 = 1, n = new Jt(t.__ownerID, [[r2, e2]]);
  }
  return t.__ownerID ? (t.size = i2, t._root = n, t.__hash = void 0, t.__altered = true, t) : n ? ne(i2, n) : V();
}
function ie(t, r2, e2, n, i2, o2, s, u) {
  return t ? t.update(r2, e2, n, i2, o2, s, u) : o2 === y ? t : (H(u), H(s), new ft(r2, n, [i2, o2]));
}
function Ae(t) {
  return t.constructor === ft || t.constructor === zt;
}
function oe(t, r2, e2, n, i2) {
  if (t.keyHash === n)
    return new zt(r2, n, [t.entry, i2]);
  var o2 = (e2 === 0 ? t.keyHash : t.keyHash >>> e2) & L, s = (e2 === 0 ? n : n >>> e2) & L, u, a2 = o2 === s ? [oe(t, r2, e2 + I, n, i2)] : (u = new ft(r2, n, i2), o2 < s ? [t, u] : [u, t]);
  return new Et(r2, 1 << o2 | 1 << s, a2);
}
function Ii(t, r2, e2, n) {
  t || (t = new Lr());
  for (var i2 = new ft(t, W(e2), [e2, n]), o2 = 0; o2 < r2.length; o2++) {
    var s = r2[o2];
    i2 = i2.update(t, 0, void 0, s[0], s[1]);
  }
  return i2;
}
function bi(t, r2, e2, n) {
  for (var i2 = 0, o2 = 0, s = new Array(e2), u = 0, a2 = 1, f = r2.length; u < f; u++, a2 <<= 1) {
    var h2 = r2[u];
    h2 !== void 0 && u !== n && (i2 |= a2, s[o2++] = h2);
  }
  return new Et(t, i2, s);
}
function Ei(t, r2, e2, n, i2) {
  for (var o2 = 0, s = new Array(Y), u = 0; e2 !== 0; u++, e2 >>>= 1)
    s[u] = e2 & 1 ? r2[o2++] : void 0;
  return s[n] = i2, new Yt(t, o2 + 1, s);
}
function On(t) {
  return t -= t >> 1 & 1431655765, t = (t & 858993459) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, t & 127;
}
function In(t, r2, e2, n) {
  var i2 = n ? t : nt(t);
  return i2[r2] = e2, i2;
}
function zi(t, r2, e2, n) {
  var i2 = t.length + 1;
  if (n && r2 + 1 === i2)
    return t[r2] = e2, t;
  for (var o2 = new Array(i2), s = 0, u = 0; u < i2; u++)
    u === r2 ? (o2[u] = e2, s = -1) : o2[u] = t[u + s];
  return o2;
}
function Mi(t, r2, e2) {
  var n = t.length - 1;
  if (e2 && r2 === n)
    return t.pop(), t;
  for (var i2 = new Array(n), o2 = 0, s = 0; s < n; s++)
    s === r2 && (o2 = 1), i2[s] = t[s + o2];
  return i2;
}
var Ai = Y / 4;
var qi = Y / 2;
var Ri = Y / 4;
var bn = "@@__IMMUTABLE_LIST__@@";
function En(t) {
  return Boolean(t && t[bn]);
}
var gr = function(t) {
  function r2(e2) {
    var n = hr();
    if (e2 == null)
      return n;
    if (En(e2))
      return e2;
    var i2 = t(e2), o2 = i2.size;
    return o2 === 0 ? n : (X(o2), o2 > 0 && o2 < Y ? Ht(0, o2, I, null, new _t(i2.toArray())) : n.withMutations(function(s) {
      s.setSize(o2), i2.forEach(function(u, a2) {
        return s.set(a2, u);
      });
    }));
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("List [", "]");
  }, r2.prototype.get = function(n, i2) {
    if (n = vt(this, n), n >= 0 && n < this.size) {
      n += this._origin;
      var o2 = zn(this, n);
      return o2 && o2.array[n & L];
    }
    return i2;
  }, r2.prototype.set = function(n, i2) {
    return ji(this, n, i2);
  }, r2.prototype.remove = function(n) {
    return this.has(n) ? n === 0 ? this.shift() : n === this.size - 1 ? this.pop() : this.splice(n, 1) : this;
  }, r2.prototype.insert = function(n, i2) {
    return this.splice(n, 0, i2);
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = I, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : hr();
  }, r2.prototype.push = function() {
    var n = arguments, i2 = this.size;
    return this.withMutations(function(o2) {
      pt(o2, 0, i2 + n.length);
      for (var s = 0; s < n.length; s++)
        o2.set(i2 + s, n[s]);
    });
  }, r2.prototype.pop = function() {
    return pt(this, 0, -1);
  }, r2.prototype.unshift = function() {
    var n = arguments;
    return this.withMutations(function(i2) {
      pt(i2, -n.length);
      for (var o2 = 0; o2 < n.length; o2++)
        i2.set(o2, n[o2]);
    });
  }, r2.prototype.shift = function() {
    return pt(this, 1);
  }, r2.prototype.concat = function() {
    for (var n = arguments, i2 = [], o2 = 0; o2 < arguments.length; o2++) {
      var s = n[o2], u = t(typeof s != "string" && Qe(s) ? s : [s]);
      u.size !== 0 && i2.push(u);
    }
    return i2.length === 0 ? this : this.size === 0 && !this.__ownerID && i2.length === 1 ? this.constructor(i2[0]) : this.withMutations(function(a2) {
      i2.forEach(function(f) {
        return f.forEach(function(h2) {
          return a2.push(h2);
        });
      });
    });
  }, r2.prototype.setSize = function(n) {
    return pt(this, 0, n);
  }, r2.prototype.map = function(n, i2) {
    var o2 = this;
    return this.withMutations(function(s) {
      for (var u = 0; u < o2.size; u++)
        s.set(u, n.call(i2, s.get(u), u, o2));
    });
  }, r2.prototype.slice = function(n, i2) {
    var o2 = this.size;
    return Gt(n, i2, o2) ? this : pt(this, Rt(n, o2), Vt(i2, o2));
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = i2 ? this.size : 0, s = qe(this, i2);
    return new g2(function() {
      var u = s();
      return u === Wt ? U() : b(n, i2 ? --o2 : o2++, u);
    });
  }, r2.prototype.__iterate = function(n, i2) {
    for (var o2 = i2 ? this.size : 0, s = qe(this, i2), u; (u = s()) !== Wt && n(u, i2 ? --o2 : o2++, this) !== false; )
      ;
    return o2;
  }, r2.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? Ht(this._origin, this._capacity, this._level, this._root, this._tail, n, this.__hash) : this.size === 0 ? hr() : (this.__ownerID = n, this.__altered = false, this);
  }, r2;
}(mt);
gr.isList = En;
var $ = gr.prototype;
$[bn] = true;
$[Qt] = $.remove;
$.merge = $.concat;
$.setIn = Xr;
$.deleteIn = $.removeIn = Zr;
$.update = Qr;
$.updateIn = Gr;
$.mergeIn = te;
$.mergeDeepIn = re;
$.withMutations = tr;
$.wasAltered = ee;
$.asImmutable = er;
$["@@transducer/init"] = $.asMutable = rr;
$["@@transducer/step"] = function(t, r2) {
  return t.push(r2);
};
$["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var _t = function(r2, e2) {
  this.array = r2, this.ownerID = e2;
};
_t.prototype.removeBefore = function(r2, e2, n) {
  if (n === e2 ? 1 << e2 : this.array.length === 0)
    return this;
  var i2 = n >>> e2 & L;
  if (i2 >= this.array.length)
    return new _t([], r2);
  var o2 = i2 === 0, s;
  if (e2 > 0) {
    var u = this.array[i2];
    if (s = u && u.removeBefore(r2, e2 - I, n), s === u && o2)
      return this;
  }
  if (o2 && !s)
    return this;
  var a2 = Mt(this, r2);
  if (!o2)
    for (var f = 0; f < i2; f++)
      a2.array[f] = void 0;
  return s && (a2.array[i2] = s), a2;
};
_t.prototype.removeAfter = function(r2, e2, n) {
  if (n === (e2 ? 1 << e2 : 0) || this.array.length === 0)
    return this;
  var i2 = n - 1 >>> e2 & L;
  if (i2 >= this.array.length)
    return this;
  var o2;
  if (e2 > 0) {
    var s = this.array[i2];
    if (o2 = s && s.removeAfter(r2, e2 - I, n), o2 === s && i2 === this.array.length - 1)
      return this;
  }
  var u = Mt(this, r2);
  return u.array.splice(i2 + 1), o2 && (u.array[i2] = o2), u;
};
var Wt = {};
function qe(t, r2) {
  var e2 = t._origin, n = t._capacity, i2 = Xt(n), o2 = t._tail;
  return s(t._root, t._level, 0);
  function s(f, h2, c) {
    return h2 === 0 ? u(f, c) : a2(f, h2, c);
  }
  function u(f, h2) {
    var c = h2 === i2 ? o2 && o2.array : f && f.array, p2 = h2 > e2 ? 0 : e2 - h2, _ = n - h2;
    return _ > Y && (_ = Y), function() {
      if (p2 === _)
        return Wt;
      var v2 = r2 ? --_ : p2++;
      return c && c[v2];
    };
  }
  function a2(f, h2, c) {
    var p2, _ = f && f.array, v2 = c > e2 ? 0 : e2 - c >> h2, l2 = (n - c >> h2) + 1;
    return l2 > Y && (l2 = Y), function() {
      for (; ; ) {
        if (p2) {
          var m2 = p2();
          if (m2 !== Wt)
            return m2;
          p2 = null;
        }
        if (v2 === l2)
          return Wt;
        var d = r2 ? --l2 : v2++;
        p2 = s(_ && _[d], h2 - I, c + (d << h2));
      }
    };
  }
}
function Ht(t, r2, e2, n, i2, o2, s) {
  var u = Object.create($);
  return u.size = r2 - t, u._origin = t, u._capacity = r2, u._level = e2, u._root = n, u._tail = i2, u.__ownerID = o2, u.__hash = s, u.__altered = false, u;
}
var Re;
function hr() {
  return Re || (Re = Ht(0, 0, I));
}
function ji(t, r2, e2) {
  if (r2 = vt(t, r2), r2 !== r2)
    return t;
  if (r2 >= t.size || r2 < 0)
    return t.withMutations(function(s) {
      r2 < 0 ? pt(s, r2).set(0, e2) : pt(s, 0, r2 + 1).set(r2, e2);
    });
  r2 += t._origin;
  var n = t._tail, i2 = t._root, o2 = Mr();
  return r2 >= Xt(t._capacity) ? n = $r(n, t.__ownerID, 0, r2, e2, o2) : i2 = $r(i2, t.__ownerID, t._level, r2, e2, o2), o2.value ? t.__ownerID ? (t._root = i2, t._tail = n, t.__hash = void 0, t.__altered = true, t) : Ht(t._origin, t._capacity, t._level, i2, n) : t;
}
function $r(t, r2, e2, n, i2, o2) {
  var s = n >>> e2 & L, u = t && s < t.array.length;
  if (!u && i2 === void 0)
    return t;
  var a2;
  if (e2 > 0) {
    var f = t && t.array[s], h2 = $r(f, r2, e2 - I, n, i2, o2);
    return h2 === f ? t : (a2 = Mt(t, r2), a2.array[s] = h2, a2);
  }
  return u && t.array[s] === i2 ? t : (o2 && H(o2), a2 = Mt(t, r2), i2 === void 0 && s === a2.array.length - 1 ? a2.array.pop() : a2.array[s] = i2, a2);
}
function Mt(t, r2) {
  return r2 && t && r2 === t.ownerID ? t : new _t(t ? t.array.slice() : [], r2);
}
function zn(t, r2) {
  if (r2 >= Xt(t._capacity))
    return t._tail;
  if (r2 < 1 << t._level + I) {
    for (var e2 = t._root, n = t._level; e2 && n > 0; )
      e2 = e2.array[r2 >>> n & L], n -= I;
    return e2;
  }
}
function pt(t, r2, e2) {
  r2 !== void 0 && (r2 |= 0), e2 !== void 0 && (e2 |= 0);
  var n = t.__ownerID || new Lr(), i2 = t._origin, o2 = t._capacity, s = i2 + r2, u = e2 === void 0 ? o2 : e2 < 0 ? o2 + e2 : i2 + e2;
  if (s === i2 && u === o2)
    return t;
  if (s >= u)
    return t.clear();
  for (var a2 = t._level, f = t._root, h2 = 0; s + h2 < 0; )
    f = new _t(f && f.array.length ? [void 0, f] : [], n), a2 += I, h2 += 1 << a2;
  h2 && (s += h2, i2 += h2, u += h2, o2 += h2);
  for (var c = Xt(o2), p2 = Xt(u); p2 >= 1 << a2 + I; )
    f = new _t(f && f.array.length ? [f] : [], n), a2 += I;
  var _ = t._tail, v2 = p2 < c ? zn(t, u - 1) : p2 > c ? new _t([], n) : _;
  if (_ && p2 > c && s < o2 && _.array.length) {
    f = Mt(f, n);
    for (var l2 = f, m2 = a2; m2 > I; m2 -= I) {
      var d = c >>> m2 & L;
      l2 = l2.array[d] = Mt(l2.array[d], n);
    }
    l2.array[c >>> I & L] = _;
  }
  if (u < o2 && (v2 = v2 && v2.removeAfter(n, 0, u)), s >= p2)
    s -= p2, u -= p2, a2 = I, f = null, v2 = v2 && v2.removeBefore(n, 0, s);
  else if (s > i2 || p2 < c) {
    for (h2 = 0; f; ) {
      var S = s >>> a2 & L;
      if (S !== p2 >>> a2 & L)
        break;
      S && (h2 += (1 << a2) * S), a2 -= I, f = f.array[S];
    }
    f && s > i2 && (f = f.removeBefore(n, a2, s - h2)), f && p2 < c && (f = f.removeAfter(n, a2, p2 - h2)), h2 && (s -= h2, u -= h2);
  }
  return t.__ownerID ? (t.size = u - s, t._origin = s, t._capacity = u, t._level = a2, t._root = f, t._tail = v2, t.__hash = void 0, t.__altered = true, t) : Ht(s, u, a2, f, v2);
}
function Xt(t) {
  return t < Y ? 0 : t - 1 >>> I << I;
}
var ht = function(t) {
  function r2(e2) {
    return e2 == null ? Bt() : tn(e2) ? e2 : Bt().withMutations(function(n) {
      var i2 = Q(e2);
      X(i2.size), i2.forEach(function(o2, s) {
        return n.set(s, o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("OrderedMap {", "}");
  }, r2.prototype.get = function(n, i2) {
    var o2 = this._map.get(n);
    return o2 !== void 0 ? this._list.get(o2)[1] : i2;
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : Bt();
  }, r2.prototype.set = function(n, i2) {
    return Te(this, n, i2);
  }, r2.prototype.remove = function(n) {
    return Te(this, n, y);
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._list.__iterate(function(s) {
      return s && n(s[1], s[0], o2);
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    return this._list.fromEntrySeq().__iterator(n, i2);
  }, r2.prototype.__ensureOwner = function(n) {
    if (n === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n), o2 = this._list.__ensureOwner(n);
    return n ? se(i2, o2, n, this.__hash) : this.size === 0 ? Bt() : (this.__ownerID = n, this.__altered = false, this._map = i2, this._list = o2, this);
  }, r2;
}(Lt);
ht.isOrderedMap = tn;
ht.prototype[$t] = true;
ht.prototype[Qt] = ht.prototype.remove;
function se(t, r2, e2, n) {
  var i2 = Object.create(ht.prototype);
  return i2.size = t ? t.size : 0, i2._map = t, i2._list = r2, i2.__ownerID = e2, i2.__hash = n, i2.__altered = false, i2;
}
var je;
function Bt() {
  return je || (je = se(V(), hr()));
}
function Te(t, r2, e2) {
  var n = t._map, i2 = t._list, o2 = n.get(r2), s = o2 !== void 0, u, a2;
  if (e2 === y) {
    if (!s)
      return t;
    i2.size >= Y && i2.size >= n.size * 2 ? (a2 = i2.filter(function(f, h2) {
      return f !== void 0 && o2 !== h2;
    }), u = a2.toKeyedSeq().map(function(f) {
      return f[0];
    }).flip().toMap(), t.__ownerID && (u.__ownerID = a2.__ownerID = t.__ownerID)) : (u = n.remove(r2), a2 = o2 === i2.size - 1 ? i2.pop() : i2.set(o2, void 0));
  } else if (s) {
    if (e2 === i2.get(o2)[1])
      return t;
    u = n, a2 = i2.set(o2, [r2, e2]);
  } else
    u = n.set(r2, i2.size), a2 = i2.set(i2.size, [r2, e2]);
  return t.__ownerID ? (t.size = u.size, t._map = u, t._list = a2, t.__hash = void 0, t.__altered = true, t) : se(u, a2);
}
var Mn = "@@__IMMUTABLE_STACK__@@";
function Dr(t) {
  return Boolean(t && t[Mn]);
}
var ue = function(t) {
  function r2(e2) {
    return e2 == null ? ur() : Dr(e2) ? e2 : ur().pushAll(e2);
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.prototype.toString = function() {
    return this.__toString("Stack [", "]");
  }, r2.prototype.get = function(n, i2) {
    var o2 = this._head;
    for (n = vt(this, n); o2 && n--; )
      o2 = o2.next;
    return o2 ? o2.value : i2;
  }, r2.prototype.peek = function() {
    return this._head && this._head.value;
  }, r2.prototype.push = function() {
    var n = arguments;
    if (arguments.length === 0)
      return this;
    for (var i2 = this.size + arguments.length, o2 = this._head, s = arguments.length - 1; s >= 0; s--)
      o2 = { value: n[s], next: o2 };
    return this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : Ft(i2, o2);
  }, r2.prototype.pushAll = function(n) {
    if (n = t(n), n.size === 0)
      return this;
    if (this.size === 0 && Dr(n))
      return n;
    X(n.size);
    var i2 = this.size, o2 = this._head;
    return n.__iterate(function(s) {
      i2++, o2 = { value: s, next: o2 };
    }, true), this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : Ft(i2, o2);
  }, r2.prototype.pop = function() {
    return this.slice(1);
  }, r2.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : ur();
  }, r2.prototype.slice = function(n, i2) {
    if (Gt(n, i2, this.size))
      return this;
    var o2 = Rt(n, this.size), s = Vt(i2, this.size);
    if (s !== this.size)
      return t.prototype.slice.call(this, n, i2);
    for (var u = this.size - o2, a2 = this._head; o2--; )
      a2 = a2.next;
    return this.__ownerID ? (this.size = u, this._head = a2, this.__hash = void 0, this.__altered = true, this) : Ft(u, a2);
  }, r2.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? Ft(this.size, this._head, n, this.__hash) : this.size === 0 ? ur() : (this.__ownerID = n, this.__altered = false, this);
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    if (i2)
      return new gt(this.toArray()).__iterate(function(a2, f) {
        return n(a2, f, o2);
      }, i2);
    for (var s = 0, u = this._head; u && n(u.value, s++, this) !== false; )
      u = u.next;
    return s;
  }, r2.prototype.__iterator = function(n, i2) {
    if (i2)
      return new gt(this.toArray()).__iterator(n, i2);
    var o2 = 0, s = this._head;
    return new g2(function() {
      if (s) {
        var u = s.value;
        return s = s.next, b(n, o2++, u);
      }
      return U();
    });
  }, r2;
}(mt);
ue.isStack = Dr;
var P = ue.prototype;
P[Mn] = true;
P.shift = P.pop;
P.unshift = P.push;
P.unshiftAll = P.pushAll;
P.withMutations = tr;
P.wasAltered = ee;
P.asImmutable = er;
P["@@transducer/init"] = P.asMutable = rr;
P["@@transducer/step"] = function(t, r2) {
  return t.unshift(r2);
};
P["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
function Ft(t, r2, e2, n) {
  var i2 = Object.create(P);
  return i2.size = t, i2._head = r2, i2.__ownerID = e2, i2.__hash = n, i2.__altered = false, i2;
}
var $e;
function ur() {
  return $e || ($e = Ft(0));
}
var An = "@@__IMMUTABLE_SET__@@";
function ae(t) {
  return Boolean(t && t[An]);
}
function qn(t) {
  return ae(t) && x(t);
}
function fe(t, r2) {
  if (t === r2)
    return true;
  if (!F(r2) || t.size !== void 0 && r2.size !== void 0 && t.size !== r2.size || t.__hash !== void 0 && r2.__hash !== void 0 && t.__hash !== r2.__hash || z(t) !== z(r2) || B(t) !== B(r2) || x(t) !== x(r2))
    return false;
  if (t.size === 0 && r2.size === 0)
    return true;
  var e2 = !_r(t);
  if (x(t)) {
    var n = t.entries();
    return r2.every(function(a2, f) {
      var h2 = n.next().value;
      return h2 && D(h2[1], a2) && (e2 || D(h2[0], f));
    }) && n.next().done;
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
  var s = true, u = r2.__iterate(function(a2, f) {
    if (e2 ? !t.has(a2) : i2 ? !D(a2, t.get(f, y)) : !D(t.get(f, y), a2))
      return s = false, false;
  });
  return s && t.size === u;
}
function St(t, r2) {
  var e2 = function(n) {
    t.prototype[n] = r2[n];
  };
  return Object.keys(r2).forEach(e2), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(r2).forEach(e2), t;
}
function pr(t) {
  if (!t || typeof t != "object")
    return t;
  if (!F(t)) {
    if (!lt(t))
      return t;
    t = K(t);
  }
  if (z(t)) {
    var r2 = {};
    return t.__iterate(function(n, i2) {
      r2[i2] = pr(n);
    }), r2;
  }
  var e2 = [];
  return t.__iterate(function(n) {
    e2.push(pr(n));
  }), e2;
}
var mr = function(t) {
  function r2(e2) {
    return e2 == null ? kt() : ae(e2) && !x(e2) ? e2 : kt().withMutations(function(n) {
      var i2 = t(e2);
      X(i2.size), i2.forEach(function(o2) {
        return n.add(o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.fromKeys = function(n) {
    return this(Q(n).keySeq());
  }, r2.intersect = function(n) {
    return n = A(n).toArray(), n.length ? N.intersect.apply(r2(n.pop()), n) : kt();
  }, r2.union = function(n) {
    return n = A(n).toArray(), n.length ? N.union.apply(r2(n.pop()), n) : kt();
  }, r2.prototype.toString = function() {
    return this.__toString("Set {", "}");
  }, r2.prototype.has = function(n) {
    return this._map.has(n);
  }, r2.prototype.add = function(n) {
    return ar(this, this._map.set(n, n));
  }, r2.prototype.remove = function(n) {
    return ar(this, this._map.remove(n));
  }, r2.prototype.clear = function() {
    return ar(this, this._map.clear());
  }, r2.prototype.map = function(n, i2) {
    var o2 = this, s = false, u = ar(this, this._map.mapEntries(function(a2) {
      var f = a2[1], h2 = n.call(i2, f, f, o2);
      return h2 !== f && (s = true), [h2, h2];
    }, i2));
    return s ? u : this;
  }, r2.prototype.union = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    return n = n.filter(function(o2) {
      return o2.size !== 0;
    }), n.length === 0 ? this : this.size === 0 && !this.__ownerID && n.length === 1 ? this.constructor(n[0]) : this.withMutations(function(o2) {
      for (var s = 0; s < n.length; s++)
        t(n[s]).forEach(function(u) {
          return o2.add(u);
        });
    });
  }, r2.prototype.intersect = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    if (n.length === 0)
      return this;
    n = n.map(function(s) {
      return t(s);
    });
    var o2 = [];
    return this.forEach(function(s) {
      n.every(function(u) {
        return u.includes(s);
      }) || o2.push(s);
    }), this.withMutations(function(s) {
      o2.forEach(function(u) {
        s.remove(u);
      });
    });
  }, r2.prototype.subtract = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    if (n.length === 0)
      return this;
    n = n.map(function(s) {
      return t(s);
    });
    var o2 = [];
    return this.forEach(function(s) {
      n.some(function(u) {
        return u.includes(s);
      }) && o2.push(s);
    }), this.withMutations(function(s) {
      o2.forEach(function(u) {
        s.remove(u);
      });
    });
  }, r2.prototype.sort = function(n) {
    return Zt(bt(this, n));
  }, r2.prototype.sortBy = function(n, i2) {
    return Zt(bt(this, i2, n));
  }, r2.prototype.wasAltered = function() {
    return this._map.wasAltered();
  }, r2.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._map.__iterate(function(s) {
      return n(s, s, o2);
    }, i2);
  }, r2.prototype.__iterator = function(n, i2) {
    return this._map.__iterator(n, i2);
  }, r2.prototype.__ensureOwner = function(n) {
    if (n === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n);
    return n ? this.__make(i2, n) : this.size === 0 ? this.__empty() : (this.__ownerID = n, this._map = i2, this);
  }, r2;
}(jt);
mr.isSet = ae;
var N = mr.prototype;
N[An] = true;
N[Qt] = N.remove;
N.merge = N.concat = N.union;
N.withMutations = tr;
N.asImmutable = er;
N["@@transducer/init"] = N.asMutable = rr;
N["@@transducer/step"] = function(t, r2) {
  return t.add(r2);
};
N["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
N.__empty = kt;
N.__make = Rn;
function ar(t, r2) {
  return t.__ownerID ? (t.size = r2.size, t._map = r2, t) : r2 === t._map ? t : r2.size === 0 ? t.__empty() : t.__make(r2);
}
function Rn(t, r2) {
  var e2 = Object.create(N);
  return e2.size = t ? t.size : 0, e2._map = t, e2.__ownerID = r2, e2;
}
var De;
function kt() {
  return De || (De = Rn(V()));
}
var Ti = function(t) {
  function r2(e2, n, i2) {
    if (!(this instanceof r2))
      return new r2(e2, n, i2);
    if (Hr(i2 !== 0, "Cannot step a Range by 0"), e2 = e2 || 0, n === void 0 && (n = 1 / 0), i2 = i2 === void 0 ? 1 : Math.abs(i2), n < e2 && (i2 = -i2), this._start = e2, this._end = n, this._step = i2, this.size = Math.max(0, Math.ceil((n - e2) / i2 - 1) + 1), this.size === 0) {
      if (Er)
        return Er;
      Er = this;
    }
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, r2.prototype.get = function(n, i2) {
    return this.has(n) ? this._start + vt(this, n) * this._step : i2;
  }, r2.prototype.includes = function(n) {
    var i2 = (n - this._start) / this._step;
    return i2 >= 0 && i2 < this.size && i2 === Math.floor(i2);
  }, r2.prototype.slice = function(n, i2) {
    return Gt(n, i2, this.size) ? this : (n = Rt(n, this.size), i2 = Vt(i2, this.size), i2 <= n ? new r2(0, 0) : new r2(this.get(n, this._end), this.get(i2, this._end), this._step));
  }, r2.prototype.indexOf = function(n) {
    var i2 = n - this._start;
    if (i2 % this._step === 0) {
      var o2 = i2 / this._step;
      if (o2 >= 0 && o2 < this.size)
        return o2;
    }
    return -1;
  }, r2.prototype.lastIndexOf = function(n) {
    return this.indexOf(n);
  }, r2.prototype.__iterate = function(n, i2) {
    for (var o2 = this.size, s = this._step, u = i2 ? this._start + (o2 - 1) * s : this._start, a2 = 0; a2 !== o2 && n(u, i2 ? o2 - ++a2 : a2++, this) !== false; )
      u += i2 ? -s : s;
    return a2;
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this.size, s = this._step, u = i2 ? this._start + (o2 - 1) * s : this._start, a2 = 0;
    return new g2(function() {
      if (a2 === o2)
        return U();
      var f = u;
      return u += i2 ? -s : s, b(n, i2 ? o2 - ++a2 : a2++, f);
    });
  }, r2.prototype.equals = function(n) {
    return n instanceof r2 ? this._start === n._start && this._end === n._end && this._step === n._step : fe(this, n);
  }, r2;
}(G);
var Er;
function jn(t, r2, e2) {
  for (var n = _n(r2), i2 = 0; i2 !== n.length; )
    if (t = vn(t, n[i2++], y), t === y)
      return e2;
  return t;
}
function Tn(t, r2) {
  return jn(this, t, r2);
}
function $i(t, r2) {
  return jn(t, r2, y) !== y;
}
function Di(t) {
  return $i(this, t);
}
function $n() {
  X(this.size);
  var t = {};
  return this.__iterate(function(r2, e2) {
    t[e2] = r2;
  }), t;
}
A.isIterable = F;
A.isKeyed = z;
A.isIndexed = B;
A.isAssociative = _r;
A.isOrdered = x;
A.Iterator = g2;
St(A, { toArray: function() {
  X(this.size);
  var r2 = new Array(this.size || 0), e2 = z(this), n = 0;
  return this.__iterate(function(i2, o2) {
    r2[n++] = e2 ? [o2, i2] : i2;
  }), r2;
}, toIndexedSeq: function() {
  return new en(this);
}, toJS: function() {
  return pr(this);
}, toKeyedSeq: function() {
  return new yr(this, true);
}, toMap: function() {
  return Lt(this.toKeyedSeq());
}, toObject: $n, toOrderedMap: function() {
  return ht(this.toKeyedSeq());
}, toOrderedSet: function() {
  return Zt(z(this) ? this.valueSeq() : this);
}, toSet: function() {
  return mr(z(this) ? this.valueSeq() : this);
}, toSetSeq: function() {
  return new nn(this);
}, toSeq: function() {
  return B(this) ? this.toIndexedSeq() : z(this) ? this.toKeyedSeq() : this.toSetSeq();
}, toStack: function() {
  return ue(z(this) ? this.valueSeq() : this);
}, toList: function() {
  return gr(z(this) ? this.valueSeq() : this);
}, toString: function() {
  return "[Collection]";
}, __toString: function(r2, e2) {
  return this.size === 0 ? r2 + e2 : r2 + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e2;
}, concat: function() {
  for (var r2 = [], e2 = arguments.length; e2--; )
    r2[e2] = arguments[e2];
  return w(this, hi(this, r2));
}, includes: function(r2) {
  return this.some(function(e2) {
    return D(e2, r2);
  });
}, entries: function() {
  return this.__iterator(Z);
}, every: function(r2, e2) {
  X(this.size);
  var n = true;
  return this.__iterate(function(i2, o2, s) {
    if (!r2.call(e2, i2, o2, s))
      return n = false, false;
  }), n;
}, filter: function(r2, e2) {
  return w(this, an(this, r2, e2, true));
}, find: function(r2, e2, n) {
  var i2 = this.findEntry(r2, e2);
  return i2 ? i2[1] : n;
}, forEach: function(r2, e2) {
  return X(this.size), this.__iterate(e2 ? r2.bind(e2) : r2);
}, join: function(r2) {
  X(this.size), r2 = r2 !== void 0 ? "" + r2 : ",";
  var e2 = "", n = true;
  return this.__iterate(function(i2) {
    n ? n = false : e2 += r2, e2 += i2 != null ? i2.toString() : "";
  }), e2;
}, keys: function() {
  return this.__iterator(xt);
}, map: function(r2, e2) {
  return w(this, un(this, r2, e2));
}, reduce: function(r2, e2, n) {
  return Ne(this, r2, e2, n, arguments.length < 2, false);
}, reduceRight: function(r2, e2, n) {
  return Ne(this, r2, e2, n, arguments.length < 2, true);
}, reverse: function() {
  return w(this, Kr(this, true));
}, slice: function(r2, e2) {
  return w(this, Jr(this, r2, e2, true));
}, some: function(r2, e2) {
  return !this.every(fr(r2), e2);
}, sort: function(r2) {
  return w(this, bt(this, r2));
}, values: function() {
  return this.__iterator(tt);
}, butLast: function() {
  return this.slice(0, -1);
}, isEmpty: function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, count: function(r2, e2) {
  return It(r2 ? this.toSeq().filter(r2, e2) : this);
}, countBy: function(r2, e2) {
  return ui(this, r2, e2);
}, equals: function(r2) {
  return fe(this, r2);
}, entrySeq: function() {
  var r2 = this;
  if (r2._cache)
    return new gt(r2._cache);
  var e2 = r2.toSeq().map(Ci).toIndexedSeq();
  return e2.fromEntrySeq = function() {
    return r2.toSeq();
  }, e2;
}, filterNot: function(r2, e2) {
  return this.filter(fr(r2), e2);
}, findEntry: function(r2, e2, n) {
  var i2 = n;
  return this.__iterate(function(o2, s, u) {
    if (r2.call(e2, o2, s, u))
      return i2 = [s, o2], false;
  }), i2;
}, findKey: function(r2, e2) {
  var n = this.findEntry(r2, e2);
  return n && n[0];
}, findLast: function(r2, e2, n) {
  return this.toKeyedSeq().reverse().find(r2, e2, n);
}, findLastEntry: function(r2, e2, n) {
  return this.toKeyedSeq().reverse().findEntry(r2, e2, n);
}, findLastKey: function(r2, e2) {
  return this.toKeyedSeq().reverse().findKey(r2, e2);
}, first: function(r2) {
  return this.find(Fe, null, r2);
}, flatMap: function(r2, e2) {
  return w(this, ci(this, r2, e2));
}, flatten: function(r2) {
  return w(this, hn(this, r2, true));
}, fromEntrySeq: function() {
  return new on(this);
}, get: function(r2, e2) {
  return this.find(function(n, i2) {
    return D(i2, r2);
  }, void 0, e2);
}, getIn: Tn, groupBy: function(r2, e2) {
  return ai(this, r2, e2);
}, has: function(r2) {
  return this.get(r2, y) !== y;
}, hasIn: Di, isSubset: function(r2) {
  return r2 = typeof r2.includes == "function" ? r2 : A(r2), this.every(function(e2) {
    return r2.includes(e2);
  });
}, isSuperset: function(r2) {
  return r2 = typeof r2.isSubset == "function" ? r2 : A(r2), r2.isSubset(this);
}, keyOf: function(r2) {
  return this.findKey(function(e2) {
    return D(e2, r2);
  });
}, keySeq: function() {
  return this.toSeq().map(Ni).toIndexedSeq();
}, last: function(r2) {
  return this.toSeq().reverse().first(r2);
}, lastKeyOf: function(r2) {
  return this.toKeyedSeq().reverse().keyOf(r2);
}, max: function(r2) {
  return or(this, r2);
}, maxBy: function(r2, e2) {
  return or(this, e2, r2);
}, min: function(r2) {
  return or(this, r2 ? Ce(r2) : Ue);
}, minBy: function(r2, e2) {
  return or(this, e2 ? Ce(e2) : Ue, r2);
}, rest: function() {
  return this.slice(1);
}, skip: function(r2) {
  return r2 === 0 ? this : this.slice(Math.max(0, r2));
}, skipLast: function(r2) {
  return r2 === 0 ? this : this.slice(0, -Math.max(0, r2));
}, skipWhile: function(r2, e2) {
  return w(this, fn(this, r2, e2, true));
}, skipUntil: function(r2, e2) {
  return this.skipWhile(fr(r2), e2);
}, sortBy: function(r2, e2) {
  return w(this, bt(this, e2, r2));
}, take: function(r2) {
  return this.slice(0, Math.max(0, r2));
}, takeLast: function(r2) {
  return this.slice(-Math.max(0, r2));
}, takeWhile: function(r2, e2) {
  return w(this, fi(this, r2, e2));
}, takeUntil: function(r2, e2) {
  return this.takeWhile(fr(r2), e2);
}, update: function(r2) {
  return r2(this);
}, valueSeq: function() {
  return this.toIndexedSeq();
}, hashCode: function() {
  return this.__hash || (this.__hash = Li(this));
} });
var C = A.prototype;
C[Ke] = true;
C[vr] = C.values;
C.toJSON = C.toArray;
C.__toStringMapper = Kt;
C.inspect = C.toSource = function() {
  return this.toString();
};
C.chain = C.flatMap;
C.contains = C.includes;
St(Q, { flip: function() {
  return w(this, sn(this));
}, mapEntries: function(r2, e2) {
  var n = this, i2 = 0;
  return w(this, this.toSeq().map(function(o2, s) {
    return r2.call(e2, [s, o2], i2++, n);
  }).fromEntrySeq());
}, mapKeys: function(r2, e2) {
  var n = this;
  return w(this, this.toSeq().flip().map(function(i2, o2) {
    return r2.call(e2, i2, o2, n);
  }).flip());
} });
var nr = Q.prototype;
nr[Je] = true;
nr[vr] = C.entries;
nr.toJSON = $n;
nr.__toStringMapper = function(t, r2) {
  return Kt(r2) + ": " + Kt(t);
};
St(mt, { toKeyedSeq: function() {
  return new yr(this, false);
}, filter: function(r2, e2) {
  return w(this, an(this, r2, e2, false));
}, findIndex: function(r2, e2) {
  var n = this.findEntry(r2, e2);
  return n ? n[0] : -1;
}, indexOf: function(r2) {
  var e2 = this.keyOf(r2);
  return e2 === void 0 ? -1 : e2;
}, lastIndexOf: function(r2) {
  var e2 = this.lastKeyOf(r2);
  return e2 === void 0 ? -1 : e2;
}, reverse: function() {
  return w(this, Kr(this, false));
}, slice: function(r2, e2) {
  return w(this, Jr(this, r2, e2, false));
}, splice: function(r2, e2) {
  var n = arguments.length;
  if (e2 = Math.max(e2 || 0, 0), n === 0 || n === 2 && !e2)
    return this;
  r2 = Rt(r2, r2 < 0 ? this.count() : this.size);
  var i2 = this.slice(0, r2);
  return w(this, n === 1 ? i2 : i2.concat(nt(arguments, 2), this.slice(r2 + e2)));
}, findLastIndex: function(r2, e2) {
  var n = this.findLastEntry(r2, e2);
  return n ? n[0] : -1;
}, first: function(r2) {
  return this.get(0, r2);
}, flatten: function(r2) {
  return w(this, hn(this, r2, false));
}, get: function(r2, e2) {
  return r2 = vt(this, r2), r2 < 0 || this.size === 1 / 0 || this.size !== void 0 && r2 > this.size ? e2 : this.find(function(n, i2) {
    return i2 === r2;
  }, void 0, e2);
}, has: function(r2) {
  return r2 = vt(this, r2), r2 >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || r2 < this.size : this.indexOf(r2) !== -1);
}, interpose: function(r2) {
  return w(this, pi(this, r2));
}, interleave: function() {
  var r2 = [this].concat(nt(arguments)), e2 = sr(this.toSeq(), G.of, r2), n = e2.flatten(true);
  return e2.size && (n.size = e2.size * r2.length), w(this, n);
}, keySeq: function() {
  return Ti(0, this.size);
}, last: function(r2) {
  return this.get(-1, r2);
}, skipWhile: function(r2, e2) {
  return w(this, fn(this, r2, e2, false));
}, zip: function() {
  var r2 = [this].concat(nt(arguments));
  return w(this, sr(this, Le, r2));
}, zipAll: function() {
  var r2 = [this].concat(nt(arguments));
  return w(this, sr(this, Le, r2, true));
}, zipWith: function(r2) {
  var e2 = nt(arguments);
  return e2[0] = this, w(this, sr(this, r2, e2));
} });
var Ut = mt.prototype;
Ut[Ye] = true;
Ut[$t] = true;
St(jt, { get: function(r2, e2) {
  return this.has(r2) ? r2 : e2;
}, includes: function(r2) {
  return this.has(r2);
}, keySeq: function() {
  return this.valueSeq();
} });
var At = jt.prototype;
At.has = C.includes;
At.contains = At.includes;
At.keys = At.values;
St(dt, nr);
St(G, Ut);
St(Nt, At);
function Ne(t, r2, e2, n, i2, o2) {
  return X(t.size), t.__iterate(function(s, u, a2) {
    i2 ? (i2 = false, e2 = s) : e2 = r2.call(n, e2, s, u, a2);
  }, o2), e2;
}
function Ni(t, r2) {
  return r2;
}
function Ci(t, r2) {
  return [r2, t];
}
function fr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function Ce(t) {
  return function() {
    return -t.apply(this, arguments);
  };
}
function Le() {
  return nt(arguments);
}
function Ue(t, r2) {
  return t < r2 ? 1 : t > r2 ? -1 : 0;
}
function Li(t) {
  if (t.size === 1 / 0)
    return 0;
  var r2 = x(t), e2 = z(t), n = r2 ? 1 : 0, i2 = t.__iterate(e2 ? r2 ? function(o2, s) {
    n = 31 * n + Pe(W(o2), W(s)) | 0;
  } : function(o2, s) {
    n = n + Pe(W(o2), W(s)) | 0;
  } : r2 ? function(o2) {
    n = 31 * n + W(o2) | 0;
  } : function(o2) {
    n = n + W(o2) | 0;
  });
  return Ui(i2, n);
}
function Ui(t, r2) {
  return r2 = Pt(r2, 3432918353), r2 = Pt(r2 << 15 | r2 >>> -15, 461845907), r2 = Pt(r2 << 13 | r2 >>> -13, 5), r2 = (r2 + 3864292196 | 0) ^ t, r2 = Pt(r2 ^ r2 >>> 16, 2246822507), r2 = Pt(r2 ^ r2 >>> 13, 3266489909), r2 = dr(r2 ^ r2 >>> 16), r2;
}
function Pe(t, r2) {
  return t ^ r2 + 2654435769 + (t << 6) + (t >> 2) | 0;
}
var Zt = function(t) {
  function r2(e2) {
    return e2 == null ? Nr() : qn(e2) ? e2 : Nr().withMutations(function(n) {
      var i2 = jt(e2);
      X(i2.size), i2.forEach(function(o2) {
        return n.add(o2);
      });
    });
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.of = function() {
    return this(arguments);
  }, r2.fromKeys = function(n) {
    return this(Q(n).keySeq());
  }, r2.prototype.toString = function() {
    return this.__toString("OrderedSet {", "}");
  }, r2;
}(mr);
Zt.isOrderedSet = qn;
var wt = Zt.prototype;
wt[$t] = true;
wt.zip = Ut.zip;
wt.zipWith = Ut.zipWith;
wt.zipAll = Ut.zipAll;
wt.__empty = Nr;
wt.__make = Dn;
function Dn(t, r2) {
  var e2 = Object.create(wt);
  return e2.size = t ? t.size : 0, e2._map = t, e2.__ownerID = r2, e2;
}
var Be;
function Nr() {
  return Be || (Be = Dn(Bt()));
}
function Pi(t) {
  if (Tt(t))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (it(t))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t === null || typeof t != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
var q = function(r2, e2) {
  var n;
  Pi(r2);
  var i2 = function(u) {
    var a2 = this;
    if (u instanceof i2)
      return u;
    if (!(this instanceof i2))
      return new i2(u);
    if (!n) {
      n = true;
      var f = Object.keys(r2), h2 = o2._indices = {};
      o2._name = e2, o2._keys = f, o2._defaultValues = r2;
      for (var c = 0; c < f.length; c++) {
        var p2 = f[c];
        h2[p2] = c, o2[p2] ? typeof console == "object" && console.warn && console.warn("Cannot define " + ce(this) + ' with property "' + p2 + '" since that property name is part of the Record API.') : Bi(o2, p2);
      }
    }
    return this.__ownerID = void 0, this._values = gr().withMutations(function(_) {
      _.setSize(a2._keys.length), Q(u).forEach(function(v2, l2) {
        _.set(a2._indices[l2], v2 === a2._defaultValues[l2] ? void 0 : v2);
      });
    }), this;
  }, o2 = i2.prototype = Object.create(O);
  return o2.constructor = i2, e2 && (i2.displayName = e2), i2;
};
q.prototype.toString = function() {
  for (var r2 = ce(this) + " { ", e2 = this._keys, n, i2 = 0, o2 = e2.length; i2 !== o2; i2++)
    n = e2[i2], r2 += (i2 ? ", " : "") + n + ": " + Kt(this.get(n));
  return r2 + " }";
};
q.prototype.equals = function(r2) {
  return this === r2 || Tt(r2) && qt(this).equals(qt(r2));
};
q.prototype.hashCode = function() {
  return qt(this).hashCode();
};
q.prototype.has = function(r2) {
  return this._indices.hasOwnProperty(r2);
};
q.prototype.get = function(r2, e2) {
  if (!this.has(r2))
    return e2;
  var n = this._indices[r2], i2 = this._values.get(n);
  return i2 === void 0 ? this._defaultValues[r2] : i2;
};
q.prototype.set = function(r2, e2) {
  if (this.has(r2)) {
    var n = this._values.set(this._indices[r2], e2 === this._defaultValues[r2] ? void 0 : e2);
    if (n !== this._values && !this.__ownerID)
      return he(this, n);
  }
  return this;
};
q.prototype.remove = function(r2) {
  return this.set(r2);
};
q.prototype.clear = function() {
  var r2 = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : he(this, r2);
};
q.prototype.wasAltered = function() {
  return this._values.wasAltered();
};
q.prototype.toSeq = function() {
  return qt(this);
};
q.prototype.toJS = function() {
  return pr(this);
};
q.prototype.entries = function() {
  return this.__iterator(Z);
};
q.prototype.__iterator = function(r2, e2) {
  return qt(this).__iterator(r2, e2);
};
q.prototype.__iterate = function(r2, e2) {
  return qt(this).__iterate(r2, e2);
};
q.prototype.__ensureOwner = function(r2) {
  if (r2 === this.__ownerID)
    return this;
  var e2 = this._values.__ensureOwner(r2);
  return r2 ? he(this, e2, r2) : (this.__ownerID = r2, this._values = e2, this);
};
q.isRecord = Tt;
q.getDescriptiveName = ce;
var O = q.prototype;
O[Xe] = true;
O[Qt] = O.remove;
O.deleteIn = O.removeIn = Zr;
O.getIn = Tn;
O.hasIn = C.hasIn;
O.merge = yn;
O.mergeWith = gn;
O.mergeIn = te;
O.mergeDeep = Sn;
O.mergeDeepWith = wn;
O.mergeDeepIn = re;
O.setIn = Xr;
O.update = Qr;
O.updateIn = Gr;
O.withMutations = tr;
O.asMutable = rr;
O.asImmutable = er;
O[vr] = O.entries;
O.toJSON = O.toObject = C.toObject;
O.inspect = O.toSource = function() {
  return this.toString();
};
function he(t, r2, e2) {
  var n = Object.create(Object.getPrototypeOf(t));
  return n._values = r2, n.__ownerID = e2, n;
}
function ce(t) {
  return t.constructor.displayName || t.constructor.name || "Record";
}
function qt(t) {
  return Fr(t._keys.map(function(r2) {
    return [r2, t.get(r2)];
  }));
}
function Bi(t, r2) {
  try {
    Object.defineProperty(t, r2, { get: function() {
      return this.get(r2);
    }, set: function(e2) {
      Hr(this.__ownerID, "Cannot set on an immutable record."), this.set(r2, e2);
    } });
  } catch {
  }
}
var Gi = function(t) {
  function r2(e2, n) {
    if (!(this instanceof r2))
      return new r2(e2, n);
    if (this._value = e2, this.size = n === void 0 ? 1 / 0 : Math.max(0, n), this.size === 0) {
      if (zr)
        return zr;
      zr = this;
    }
  }
  return t && (r2.__proto__ = t), r2.prototype = Object.create(t && t.prototype), r2.prototype.constructor = r2, r2.prototype.toString = function() {
    return this.size === 0 ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]";
  }, r2.prototype.get = function(n, i2) {
    return this.has(n) ? this._value : i2;
  }, r2.prototype.includes = function(n) {
    return D(this._value, n);
  }, r2.prototype.slice = function(n, i2) {
    var o2 = this.size;
    return Gt(n, i2, o2) ? this : new r2(this._value, Vt(i2, o2) - Rt(n, o2));
  }, r2.prototype.reverse = function() {
    return this;
  }, r2.prototype.indexOf = function(n) {
    return D(this._value, n) ? 0 : -1;
  }, r2.prototype.lastIndexOf = function(n) {
    return D(this._value, n) ? this.size : -1;
  }, r2.prototype.__iterate = function(n, i2) {
    for (var o2 = this.size, s = 0; s !== o2 && n(this._value, i2 ? o2 - ++s : s++, this) !== false; )
      ;
    return s;
  }, r2.prototype.__iterator = function(n, i2) {
    var o2 = this, s = this.size, u = 0;
    return new g2(function() {
      return u === s ? U() : b(n, i2 ? s - ++u : u++, o2._value);
    });
  }, r2.prototype.equals = function(n) {
    return n instanceof r2 ? D(this._value, n._value) : fe(n);
  }, r2;
}(G);
var zr;
o();
var Wn = r(kn(), 1);
function Kn(t, r2) {
  var e2 = (0, Wn.default)(t, r2);
  return e2.map((i2) => i2[0] === 1 ? i2 : [i2[0], i2[1].length]);
}
function Jn(t, r2) {
  for (var e2 = "", n = 0, i2 = 0; i2 < r2.length; i2++) {
    var o2 = r2[i2], s = o2[0], u = o2[1];
    o2[0] === -1 && typeof u == "number" ? n += u : s == 0 && typeof u == "number" ? e2 += t.slice(n, n += u) : e2 += u;
  }
  return e2;
}
function Yi(t, r2) {
  return q({ ...r2, room: t, state: q(r2.state)() });
}
var et = null;
var ut = {};
var le = class {
  constructor(r2, e2) {
    __publicField(this, "session");
    __publicField(this, "cb", {});
    __publicField(this, "hashCodeSession", 0);
    __publicField(this, "room");
    __publicField(this, "created", new Date().toISOString());
    __publicField(this, "hashOfState", () => {
      let r2 = this.session.get("state"), e2 = r2.hashCode();
      return ut[e2] = r2, e2;
    });
    __publicField(this, "createPatchFromHashCode", async (r2, e2) => {
      let n = JSON.parse(Ot(e2));
      if (!ut[r2]) {
        let h2 = await fetch(`/live/${this.room}
        `), { mST: c, hashCode: p2 } = await h2.json();
        ut[p2] = this.session.get("state").merge(c);
      }
      let i2 = ut[r2], o2 = Ot(i2.toJSON()), s = i2.merge(n), u = Ot(s.toJSON()), a2 = s.hashCode();
      ut[a2] = s;
      let f = Qi(o2, u);
      return { oldHash: r2, newHash: a2, patch: f };
    });
    __publicField(this, "patchSync", (r2) => {
      this.session = this.session.set("state", this.session.get("state").merge(r2)), this.update();
    });
    __publicField(this, "applyPatch", async ({ oldHash: r2, newHash: e2, patch: n }) => {
      let i2 = this.room || "";
      if (!Object.keys(ut).map((c) => Number(c)).includes(Number(r2)) && i2) {
        console.log(Object.keys(ut));
        let c = await fetch(`/live/${i2}/mST`);
        if (c.ok) {
          let p2 = await c.json(), _ = this.session.get("state").merge(JSON.parse(Ot(p2.mST)));
          ut[_.hashCode()] = _;
        } else {
          let { mST: p2 } = await import(location.origin + `/live/${this.room}/mst.mjs?${Date.now()}`), _ = this.session.get("state").merge(JSON.parse(Ot(p2)));
          ut[_.hashCode()] = _;
        }
      }
      let o2 = Ot(ut[r2].toJSON()), s = Jn(o2, n), u = JSON.parse(s), a2 = this.session.get("state").merge(u), f = this.session.get("state").merge(a2);
      if (f.hashCode() === e2)
        this.session = this.session.set("state", f);
      else {
        new Error("Wrong patch");
        return;
      }
    });
    et = this, this.room = r2;
    let n = null;
    this.session = Yi(r2, { ...e2, state: n || JSON.parse(Ot(e2.state)) })();
  }
  update() {
    Object.keys(this.cb).map((r2) => this.cb[r2]).map((r2) => {
      try {
        r2(true);
      } catch (e2) {
        console.error("error calling callback", { err: e2 });
      }
    });
  }
  onUpdate(r2, e2) {
    this.cb[e2] = r2;
  }
  json() {
    let r2 = this.session.toJSON(), e2 = r2.state.toJSON();
    return { ...r2, state: e2 };
  }
  setRoom(r2) {
    let e2 = this.session.set("room", r2);
    this.session = e2;
  }
};
var Hi = () => et ? et.hashOfState() : 0;
var io = () => {
  if (!et)
    return { i: 0, transpiled: "", code: "", html: "", css: "" };
  let { i: t, transpiled: r2, code: e2, html: n, css: i2 } = et.json().state;
  return { i: t, transpiled: r2, code: e2, html: n, css: i2 };
};
function Xi(t, r2) {
  let { i: e2, transpiled: n, code: i2, html: o2, css: s } = t, u = { i: e2, transpiled: n, code: i2, html: o2, css: s };
  return u.code = u.code.replace("from '/live", `from '${r2}/live`), u.code = u.code.replace("from './", `from '${r2}/live/`), u.transpiled = u.transpiled.replace('from "/live', `from "${r2}/live`), u.transpiled = u.transpiled.replace('from "./', `from "${r2}/live/`), u;
}
function Ot(t) {
  let { i: r2, transpiled: e2, code: n, html: i2, css: o2 } = t;
  return JSON.stringify({ i: r2, transpiled: e2, code: n, html: i2, css: o2 });
}
var oo = async (t) => {
  await et?.applyPatch(t), et?.update();
};
var ao = (t, r2, e2) => et || new le(t, { name: r2.name, state: Xi(r2.state, e2) });
function Qi(t, r2) {
  return Kn(t, r2);
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
    this.room = "";
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
        const s = backupSession;
        session.code = s.code;
        session.transpiled = s.transpiled;
        session.i = s.i;
        session.html = s.html;
        session.css = s.css;
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
      ao(
        this.codeSpace,
        { name: this.codeSpace, state },
        url.origin
      );
      this.sessionStarted = true;
    }
    this.codeSpace = url.searchParams.get("room") || "code-main";
    return await handleErrors(request, async () => {
      let path = url.pathname.slice(1).split("/");
      switch (path[0]) {
        case "":
        case "index":
        case "index.tsx":
        case "code": {
          return new Response(io().code, {
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
          return new Response(JSON.stringify(io()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "lazy":
          const { html, css, transpiled } = io();
          const hash = Hi();
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
          return new Response(Hi().toString(), {
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
            "startMonaco.css": a2["startMonaco.css"]
          };
          return new Response(
            `
              export const assets=${JSON.stringify(assets)};
              export const mST=${JSON.stringify(io())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${JSON.stringify({
              js: importMapReplace(io().transpiled)
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
              mST: io(),
              hashCode: Hi()
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
          return new Response(importMapReplace(io().transpiled), {
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
          const { css: css2, html: html2 } = io();
          const a3 = JSON.parse(manifestJSON2);
          const imaps = { ...imap.imports };
          Object.keys(imap.imports).map(
            (k2) => imaps[k2] = url.origin + "/" + imaps[k2]
          );
          return new Response(
            src_default.replaceAll(
              "/live/coder/",
              `/live/${this.codeSpace}/`
            ).replace(
              `<script type="importmap"><\/script>`,
              ` <script type="importmap-shim">${JSON.stringify({ imports: { ...imaps } })}<\/script>`
            ).replace(
              `/* #root{} */`,
              `
          #root{
            height: 100%; 
          }
          ${css2}
          `
            ).replace(
              `<div id="root"></div>`,
              `<div id="root"><div id="root-${this.codeSpace}" style="height: 100%">` + html2 + `</div></div>
           `
            ),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "text/html; charset=UTF-8"
              }
            }
          );
        }
        case "iife": {
          const startState = io();
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
        } catch (e2) {
          respondWith({ error: "error while checked blocked messages" });
        }
        return respondWith({
          hashCode: Hi()
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
        hashCode: Hi()
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
          if (oldHash !== Hi()) {
            return respondWith({ hashCode: Hi() });
          }
          try {
            await oo({ patch, newHash, oldHash });
          } catch (err) {
            return respondWith({
              msg: "strange error",
              err: err instanceof SyntaxError ? err.toString() : "Some error",
              stack: err instanceof SyntaxError ? err.stack?.toString() : "no stack",
              hash: Hi()
            });
          }
          if (newHash === Hi()) {
            try {
              this.broadcast(data);
            } catch {
              return respondWith({
                "msg": "broadcast issue"
              });
            }
            await this.kv.put("session", { ...io() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash,
                patch
              })
            );
          }
          return respondWith({
            hashCode: Hi()
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
    this.sessions.filter((session) => session.name === to).map((s) => s.webSocket.send(message));
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.sessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        s.blockedMessages.push(message);
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

// src/users.ts
var Users = class {
  async fetch(_request, _env, _ctx) {
    return new Response("OKi");
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  constructor(_state, _env) {
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
