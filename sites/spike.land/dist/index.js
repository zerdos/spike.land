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

// ../../packages/code/dist/chunk-chunk-YENLXQ5M.mjs
var i = Object.create;
var d = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var k = Object.getOwnPropertyNames;
var l = Object.getPrototypeOf;
var m = Object.prototype.hasOwnProperty;
var n = (a2, b2, c) => b2 in a2 ? d(a2, b2, { enumerable: true, configurable: true, writable: true, value: c }) : a2[b2] = c;
var o = (a2, b2) => d(a2, "name", { value: b2, configurable: true });
var q = (a2, b2) => () => (b2 || a2((b2 = { exports: {} }).exports, b2), b2.exports);
var g = (a2, b2, c, e) => {
  if (b2 && typeof b2 == "object" || typeof b2 == "function")
    for (let f of k(b2))
      !m.call(a2, f) && f !== c && d(a2, f, { get: () => b2[f], enumerable: !(e = j(b2, f)) || e.enumerable });
  return a2;
};
var s = (a2, b2, c) => (c = a2 != null ? i(l(a2)) : {}, g(b2 || !a2 || !a2.__esModule ? d(c, "default", { value: a2, enumerable: true }) : c, a2));
var u = (a2, b2, c) => (n(a2, typeof b2 != "symbol" ? b2 + "" : b2, c), c);

// ../../packages/code/dist/chunk-chunk-57WDUUKV.mjs
var kn = q((xi, Fn) => {
  var at = -1, et = 1, W = 0;
  function or(t, r, e, n2) {
    if (t === r)
      return t ? [[W, t]] : [];
    if (e != null) {
      var i2 = Ji(t, r, e);
      if (i2)
        return i2;
    }
    var s2 = ve(t, r), u2 = t.substring(0, s2);
    t = t.substring(s2), r = r.substring(s2), s2 = le(t, r);
    var a2 = t.substring(t.length - s2);
    t = t.substring(0, t.length - s2), r = r.substring(0, r.length - s2);
    var f = Fi(t, r);
    return u2 && f.unshift([W, u2]), a2 && f.push([W, a2]), Cn(f, n2), f;
  }
  o(or, "diff_main");
  function Fi(t, r) {
    var e;
    if (!t)
      return [[et, r]];
    if (!r)
      return [[at, t]];
    var n2 = t.length > r.length ? t : r, i2 = t.length > r.length ? r : t, s2 = n2.indexOf(i2);
    if (s2 !== -1)
      return e = [[et, n2.substring(0, s2)], [W, i2], [et, n2.substring(s2 + i2.length)]], t.length > r.length && (e[0][0] = e[2][0] = at), e;
    if (i2.length === 1)
      return [[at, t], [et, r]];
    var u2 = Wi(t, r);
    if (u2) {
      var a2 = u2[0], f = u2[1], h = u2[2], c = u2[3], p = u2[4], _ = or(a2, h), v = or(f, c);
      return _.concat([[W, p]], v);
    }
    return ki(t, r);
  }
  o(Fi, "diff_compute_");
  function ki(t, r) {
    for (var e = t.length, n2 = r.length, i2 = Math.ceil((e + n2) / 2), s2 = i2, u2 = 2 * i2, a2 = new Array(u2), f = new Array(u2), h = 0; h < u2; h++)
      a2[h] = -1, f[h] = -1;
    a2[s2 + 1] = 0, f[s2 + 1] = 0;
    for (var c = e - n2, p = c % 2 !== 0, _ = 0, v = 0, l2 = 0, d2 = 0, S = 0; S < i2; S++) {
      for (var y = -S + _; y <= S - v; y += 2) {
        var w = s2 + y, A;
        y === -S || y !== S && a2[w - 1] < a2[w + 1] ? A = a2[w + 1] : A = a2[w - 1] + 1;
        for (var j2 = A - y; A < e && j2 < n2 && t.charAt(A) === r.charAt(j2); )
          A++, j2++;
        if (a2[w] = A, A > e)
          v += 2;
        else if (j2 > n2)
          _ += 2;
        else if (p) {
          var T = s2 + c - y;
          if (T >= 0 && T < u2 && f[T] !== -1) {
            var $ = e - f[T];
            if (A >= $)
              return Nn(t, r, A, j2);
          }
        }
      }
      for (var Y = -S + l2; Y <= S - d2; Y += 2) {
        var T = s2 + Y, $;
        Y === -S || Y !== S && f[T - 1] < f[T + 1] ? $ = f[T + 1] : $ = f[T - 1] + 1;
        for (var ht = $ - Y; $ < e && ht < n2 && t.charAt(e - $ - 1) === r.charAt(n2 - ht - 1); )
          $++, ht++;
        if (f[T] = $, $ > e)
          d2 += 2;
        else if (ht > n2)
          l2 += 2;
        else if (!p) {
          var w = s2 + c - Y;
          if (w >= 0 && w < u2 && a2[w] !== -1) {
            var A = a2[w], j2 = s2 + A - w;
            if ($ = e - $, A >= $)
              return Nn(t, r, A, j2);
          }
        }
      }
    }
    return [[at, t], [et, r]];
  }
  o(ki, "diff_bisect_");
  function Nn(t, r, e, n2) {
    var i2 = t.substring(0, e), s2 = r.substring(0, n2), u2 = t.substring(e), a2 = r.substring(n2), f = or(i2, s2), h = or(u2, a2);
    return f.concat(h);
  }
  o(Nn, "diff_bisectSplit_");
  function ve(t, r) {
    if (!t || !r || t.charAt(0) !== r.charAt(0))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r.length), i2 = n2, s2 = 0; e < i2; )
      t.substring(s2, i2) == r.substring(s2, i2) ? (e = i2, s2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Ln(t.charCodeAt(i2 - 1)) && i2--, i2;
  }
  o(ve, "diff_commonPrefix");
  function le(t, r) {
    if (!t || !r || t.slice(-1) !== r.slice(-1))
      return 0;
    for (var e = 0, n2 = Math.min(t.length, r.length), i2 = n2, s2 = 0; e < i2; )
      t.substring(t.length - i2, t.length - s2) == r.substring(r.length - i2, r.length - s2) ? (e = i2, s2 = e) : n2 = i2, i2 = Math.floor((n2 - e) / 2 + e);
    return Un(t.charCodeAt(t.length - i2)) && i2--, i2;
  }
  o(le, "diff_commonSuffix");
  function Wi(t, r) {
    var e = t.length > r.length ? t : r, n2 = t.length > r.length ? r : t;
    if (e.length < 4 || n2.length * 2 < e.length)
      return null;
    function i2(v, l2, d2) {
      for (var S = v.substring(d2, d2 + Math.floor(v.length / 4)), y = -1, w = "", A, j2, T, $; (y = l2.indexOf(S, y + 1)) !== -1; ) {
        var Y = ve(v.substring(d2), l2.substring(y)), ht = le(v.substring(0, d2), l2.substring(0, y));
        w.length < ht + Y && (w = l2.substring(y - ht, y) + l2.substring(y, y + Y), A = v.substring(0, d2 - ht), j2 = v.substring(d2 + Y), T = l2.substring(0, y - ht), $ = l2.substring(y + Y));
      }
      return w.length * 2 >= v.length ? [A, j2, T, $, w] : null;
    }
    o(i2, "diff_halfMatchI_");
    var s2 = i2(e, n2, Math.ceil(e.length / 4)), u2 = i2(e, n2, Math.ceil(e.length / 2)), a2;
    if (!s2 && !u2)
      return null;
    u2 ? s2 ? a2 = s2[4].length > u2[4].length ? s2 : u2 : a2 = u2 : a2 = s2;
    var f, h, c, p;
    t.length > r.length ? (f = a2[0], h = a2[1], c = a2[2], p = a2[3]) : (c = a2[0], p = a2[1], f = a2[2], h = a2[3]);
    var _ = a2[4];
    return [f, h, c, p, _];
  }
  o(Wi, "diff_halfMatch_");
  function Cn(t, r) {
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
          if (r) {
            if (f >= 0 && Bn(t[f][1])) {
              var h = t[f][1].slice(-1);
              if (t[f][1] = t[f][1].slice(0, -1), s2 = h + s2, u2 = h + u2, !t[f][1]) {
                t.splice(f, 1), e--;
                var c = f - 1;
                t[c] && t[c][0] === et && (i2++, u2 = t[c][1] + u2, c--), t[c] && t[c][0] === at && (n2++, s2 = t[c][1] + s2, c--), f = c;
              }
            }
            if (Pn(t[e][1])) {
              var h = t[e][1].charAt(0);
              t[e][1] = t[e][1].slice(1), s2 += h, u2 += h;
            }
          }
          if (e < t.length - 1 && !t[e][1]) {
            t.splice(e, 1);
            break;
          }
          if (s2.length > 0 || u2.length > 0) {
            s2.length > 0 && u2.length > 0 && (a2 = ve(u2, s2), a2 !== 0 && (f >= 0 ? t[f][1] += u2.substring(0, a2) : (t.splice(0, 0, [W, u2.substring(0, a2)]), e++), u2 = u2.substring(a2), s2 = s2.substring(a2)), a2 = le(u2, s2), a2 !== 0 && (t[e][1] = u2.substring(u2.length - a2) + t[e][1], u2 = u2.substring(0, u2.length - a2), s2 = s2.substring(0, s2.length - a2)));
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
    _ && Cn(t, r);
  }
  o(Cn, "diff_cleanupMerge");
  function Ln(t) {
    return t >= 55296 && t <= 56319;
  }
  o(Ln, "is_surrogate_pair_start");
  function Un(t) {
    return t >= 56320 && t <= 57343;
  }
  o(Un, "is_surrogate_pair_end");
  function Pn(t) {
    return Un(t.charCodeAt(0));
  }
  o(Pn, "starts_with_pair_end");
  function Bn(t) {
    return Ln(t.charCodeAt(t.length - 1));
  }
  o(Bn, "ends_with_pair_start");
  function Ki(t) {
    for (var r = [], e = 0; e < t.length; e++)
      t[e][1].length > 0 && r.push(t[e]);
    return r;
  }
  o(Ki, "remove_empty_tuples");
  function _e(t, r, e, n2) {
    return Bn(t) || Pn(n2) ? null : Ki([[W, t], [at, r], [et, e], [W, n2]]);
  }
  o(_e, "make_edit_splice");
  function Ji(t, r, e) {
    var n2 = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i2 = typeof e == "number" ? null : e.newRange, s2 = t.length, u2 = r.length;
    if (n2.length === 0 && (i2 === null || i2.length === 0)) {
      var a2 = n2.index, f = t.slice(0, a2), h = t.slice(a2), c = i2 ? i2.index : null;
      t: {
        var p = a2 + u2 - s2;
        if (c !== null && c !== p || p < 0 || p > u2)
          break t;
        var _ = r.slice(0, p), v = r.slice(p);
        if (v !== h)
          break t;
        var l2 = Math.min(a2, p), d2 = f.slice(0, l2), S = _.slice(0, l2);
        if (d2 !== S)
          break t;
        var y = f.slice(l2), w = _.slice(l2);
        return _e(d2, y, w, h);
      }
      t: {
        if (c !== null && c !== a2)
          break t;
        var A = a2, _ = r.slice(0, A), v = r.slice(A);
        if (_ !== f)
          break t;
        var j2 = Math.min(s2 - A, u2 - A), T = h.slice(h.length - j2), $ = v.slice(v.length - j2);
        if (T !== $)
          break t;
        var y = h.slice(0, h.length - j2), w = v.slice(0, v.length - j2);
        return _e(f, y, w, T);
      }
    }
    if (n2.length > 0 && i2 && i2.length === 0) {
      t: {
        var d2 = t.slice(0, n2.index), T = t.slice(n2.index + n2.length), l2 = d2.length, j2 = T.length;
        if (u2 < l2 + j2)
          break t;
        var S = r.slice(0, l2), $ = r.slice(u2 - j2);
        if (d2 !== S || T !== $)
          break t;
        var y = t.slice(l2, s2 - j2), w = r.slice(l2, u2 - j2);
        return _e(d2, y, w, T);
      }
    }
    return null;
  }
  o(Ji, "find_cursor_edit_diff");
  function wr(t, r, e) {
    return or(t, r, e, true);
  }
  o(wr, "diff");
  wr.INSERT = et;
  wr.DELETE = at;
  wr.EQUAL = W;
  Fn.exports = wr;
});
var Gt = "delete";
var b = 5;
var H = 1 << b;
var U = H - 1;
var g2 = {};
function qr() {
  return { value: false };
}
o(qr, "MakeRef");
function X(t) {
  t && (t.value = true);
}
o(X, "SetRef");
function Ur() {
}
o(Ur, "OwnerID");
function bt(t) {
  return t.size === void 0 && (t.size = t.__iterate(Fe)), t.size;
}
o(bt, "ensureSize");
function lt(t, r) {
  if (typeof r != "number") {
    var e = r >>> 0;
    if ("" + e !== r || e === 4294967295)
      return NaN;
    r = e;
  }
  return r < 0 ? bt(t) + r : r;
}
o(lt, "wrapIndex");
function Fe() {
  return true;
}
o(Fe, "returnTrue");
function Vt(t, r, e) {
  return (t === 0 && !We(t) || e !== void 0 && t <= -e) && (r === void 0 || e !== void 0 && r >= e);
}
o(Vt, "wholeSlice");
function jt(t, r) {
  return ke(t, r, 0);
}
o(jt, "resolveBegin");
function xt(t, r) {
  return ke(t, r, r);
}
o(xt, "resolveEnd");
function ke(t, r, e) {
  return t === void 0 ? e : We(t) ? r === 1 / 0 ? r : Math.max(0, r + t) | 0 : r === void 0 || r === t ? t : Math.min(r, t) | 0;
}
o(ke, "resolveIndex");
function We(t) {
  return t < 0 || t === 0 && 1 / t === -1 / 0;
}
o(We, "isNeg");
var Ke = "@@__IMMUTABLE_ITERABLE__@@";
function k2(t) {
  return Boolean(t && t[Ke]);
}
o(k2, "isCollection");
var Je = "@@__IMMUTABLE_KEYED__@@";
function M(t) {
  return Boolean(t && t[Je]);
}
o(M, "isKeyed");
var Ye = "@@__IMMUTABLE_INDEXED__@@";
function F(t) {
  return Boolean(t && t[Ye]);
}
o(F, "isIndexed");
function vr(t) {
  return M(t) || F(t);
}
o(vr, "isAssociative");
var q2 = o(function(r) {
  return k2(r) ? r : J(r);
}, "Collection");
var G = function(t) {
  function r(e) {
    return M(e) ? e : yt(e);
  }
  return o(r, "KeyedCollection"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r;
}(q2);
var St = function(t) {
  function r(e) {
    return F(e) ? e : V(e);
  }
  return o(r, "IndexedCollection"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r;
}(q2);
var Tt = function(t) {
  function r(e) {
    return k2(e) && !vr(e) ? e : Ct(e);
  }
  return o(r, "SetCollection"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r;
}(q2);
q2.Keyed = G;
q2.Indexed = St;
q2.Set = Tt;
var He = "@@__IMMUTABLE_SEQ__@@";
function Pr(t) {
  return Boolean(t && t[He]);
}
o(Pr, "isSeq");
var Xe = "@@__IMMUTABLE_RECORD__@@";
function $t(t) {
  return Boolean(t && t[Xe]);
}
o($t, "isRecord");
function st(t) {
  return k2(t) || $t(t);
}
o(st, "isImmutable");
var Dt = "@@__IMMUTABLE_ORDERED__@@";
function tt(t) {
  return Boolean(t && t[Dt]);
}
o(tt, "isOrdered");
var tr = 0;
var rt = 1;
var Q = 2;
var Rr = typeof Symbol == "function" && Symbol.iterator;
var Ze = "@@iterator";
var lr = Rr || Ze;
var m2 = o(function(r) {
  this.next = r;
}, "Iterator");
m2.prototype.toString = o(function() {
  return "[Iterator]";
}, "toString");
m2.KEYS = tr;
m2.VALUES = rt;
m2.ENTRIES = Q;
m2.prototype.inspect = m2.prototype.toSource = function() {
  return this.toString();
};
m2.prototype[lr] = function() {
  return this;
};
function E(t, r, e, n2) {
  var i2 = t === 0 ? r : t === 1 ? e : [r, e];
  return n2 ? n2.value = i2 : n2 = { value: i2, done: false }, n2;
}
o(E, "iteratorValue");
function P() {
  return { value: void 0, done: true };
}
o(P, "iteratorDone");
function Qe(t) {
  return Array.isArray(t) ? true : !!dr(t);
}
o(Qe, "hasIterator");
function de(t) {
  return t && typeof t.next == "function";
}
o(de, "isIterator");
function jr(t) {
  var r = dr(t);
  return r && r.call(t);
}
o(jr, "getIterator");
function dr(t) {
  var r = t && (Rr && t[Rr] || t[Ze]);
  if (typeof r == "function")
    return r;
}
o(dr, "getIteratorFn");
function Xn(t) {
  var r = dr(t);
  return r && r === t.entries;
}
o(Xn, "isEntriesIterable");
function Zn(t) {
  var r = dr(t);
  return r && r === t.keys;
}
o(Zn, "isKeysIterable");
var Nt = Object.prototype.hasOwnProperty;
function Ge(t) {
  return Array.isArray(t) || typeof t == "string" ? true : t && typeof t == "object" && Number.isInteger(t.length) && t.length >= 0 && (t.length === 0 ? Object.keys(t).length === 1 : t.hasOwnProperty(t.length - 1));
}
o(Ge, "isArrayLike");
var J = function(t) {
  function r(e) {
    return e == null ? Fr() : st(e) ? e.toSeq() : Gn(e);
  }
  return o(r, "Seq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.toSeq = o(function() {
    return this;
  }, "toSeq"), r.prototype.toString = o(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), r.prototype.cacheResult = o(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), r.prototype.__iterate = o(function(n2, i2) {
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
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
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
  }, "__iterator"), r;
}(q2);
var yt = function(t) {
  function r(e) {
    return e == null ? Fr().toKeyedSeq() : k2(e) ? M(e) ? e.toSeq() : e.fromEntrySeq() : $t(e) ? e.toSeq() : kr(e);
  }
  return o(r, "KeyedSeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.toKeyedSeq = o(function() {
    return this;
  }, "toKeyedSeq"), r;
}(J);
var V = function(t) {
  function r(e) {
    return e == null ? Fr() : k2(e) ? M(e) ? e.entrySeq() : e.toIndexedSeq() : $t(e) ? e.toSeq().entrySeq() : Ve(e);
  }
  return o(r, "IndexedSeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return r(arguments);
  }, "of"), r.prototype.toIndexedSeq = o(function() {
    return this;
  }, "toIndexedSeq"), r.prototype.toString = o(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), r;
}(J);
var Ct = function(t) {
  function r(e) {
    return (k2(e) && !vr(e) ? e : V(e)).toSetSeq();
  }
  return o(r, "SetSeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return r(arguments);
  }, "of"), r.prototype.toSetSeq = o(function() {
    return this;
  }, "toSetSeq"), r;
}(J);
J.isSeq = Pr;
J.Keyed = yt;
J.Set = Ct;
J.Indexed = V;
J.prototype[He] = true;
var mt = function(t) {
  function r(e) {
    this._array = e, this.size = e.length;
  }
  return o(r, "ArraySeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.get = o(function(n2, i2) {
    return this.has(n2) ? this._array[lt(this, n2)] : i2;
  }, "get"), r.prototype.__iterate = o(function(n2, i2) {
    for (var s2 = this._array, u2 = s2.length, a2 = 0; a2 !== u2; ) {
      var f = i2 ? u2 - ++a2 : a2++;
      if (n2(s2[f], f, this) === false)
        break;
    }
    return a2;
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this._array, u2 = s2.length, a2 = 0;
    return new m2(function() {
      if (a2 === u2)
        return P();
      var f = i2 ? u2 - ++a2 : a2++;
      return E(n2, f, s2[f]);
    });
  }, "__iterator"), r;
}(V);
var Br = function(t) {
  function r(e) {
    var n2 = Object.keys(e).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : []);
    this._object = e, this._keys = n2, this.size = n2.length;
  }
  return o(r, "ObjectSeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.get = o(function(n2, i2) {
    return i2 !== void 0 && !this.has(n2) ? i2 : this._object[n2];
  }, "get"), r.prototype.has = o(function(n2) {
    return Nt.call(this._object, n2);
  }, "has"), r.prototype.__iterate = o(function(n2, i2) {
    for (var s2 = this._object, u2 = this._keys, a2 = u2.length, f = 0; f !== a2; ) {
      var h = u2[i2 ? a2 - ++f : f++];
      if (n2(s2[h], h, this) === false)
        break;
    }
    return f;
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this._object, u2 = this._keys, a2 = u2.length, f = 0;
    return new m2(function() {
      if (f === a2)
        return P();
      var h = u2[i2 ? a2 - ++f : f++];
      return E(n2, h, s2[h]);
    });
  }, "__iterator"), r;
}(yt);
Br.prototype[Dt] = true;
var Qn = function(t) {
  function r(e) {
    this._collection = e, this.size = e.length || e.size;
  }
  return o(r, "CollectionSeq"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.__iterateUncached = o(function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterate(n2, i2);
    var s2 = this._collection, u2 = jr(s2), a2 = 0;
    if (de(u2))
      for (var f; !(f = u2.next()).done && n2(f.value, a2++, this) !== false; )
        ;
    return a2;
  }, "__iterateUncached"), r.prototype.__iteratorUncached = o(function(n2, i2) {
    if (i2)
      return this.cacheResult().__iterator(n2, i2);
    var s2 = this._collection, u2 = jr(s2);
    if (!de(u2))
      return new m2(P);
    var a2 = 0;
    return new m2(function() {
      var f = u2.next();
      return f.done ? f : E(n2, a2++, f.value);
    });
  }, "__iteratorUncached"), r;
}(V);
var ye;
function Fr() {
  return ye || (ye = new mt([]));
}
o(Fr, "emptySequence");
function kr(t) {
  var r = Wr(t);
  if (r)
    return r.fromEntrySeq();
  if (typeof t == "object")
    return new Br(t);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t);
}
o(kr, "keyedSeqFromValue");
function Ve(t) {
  var r = Wr(t);
  if (r)
    return r;
  throw new TypeError("Expected Array or collection object of values: " + t);
}
o(Ve, "indexedSeqFromValue");
function Gn(t) {
  var r = Wr(t);
  if (r)
    return Xn(t) ? r.fromEntrySeq() : Zn(t) ? r.toSetSeq() : r;
  if (typeof t == "object")
    return new Br(t);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t);
}
o(Gn, "seqFromValue");
function Wr(t) {
  return Ge(t) ? new mt(t) : Qe(t) ? new Qn(t) : void 0;
}
o(Wr, "maybeIndexedSeqFromValue");
var xe = "@@__IMMUTABLE_MAP__@@";
function Kr(t) {
  return Boolean(t && t[xe]);
}
o(Kr, "isMap");
function tn(t) {
  return Kr(t) && tt(t);
}
o(tn, "isOrderedMap");
function ge(t) {
  return Boolean(t && typeof t.equals == "function" && typeof t.hashCode == "function");
}
o(ge, "isValueObject");
function N(t, r) {
  if (t === r || t !== t && r !== r)
    return true;
  if (!t || !r)
    return false;
  if (typeof t.valueOf == "function" && typeof r.valueOf == "function") {
    if (t = t.valueOf(), r = r.valueOf(), t === r || t !== t && r !== r)
      return true;
    if (!t || !r)
      return false;
  }
  return !!(ge(t) && ge(r) && t.equals(r));
}
o(N, "is");
var Bt = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : o(function(r, e) {
  r |= 0, e |= 0;
  var n2 = r & 65535, i2 = e & 65535;
  return n2 * i2 + ((r >>> 16) * i2 + n2 * (e >>> 16) << 16 >>> 0) | 0;
}, "imul");
function yr(t) {
  return t >>> 1 & 1073741824 | t & 3221225471;
}
o(yr, "smi");
var Vn = Object.prototype.valueOf;
function K(t) {
  if (t == null)
    return me(t);
  if (typeof t.hashCode == "function")
    return yr(t.hashCode(t));
  var r = ii(t);
  if (r == null)
    return me(r);
  switch (typeof r) {
    case "boolean":
      return r ? 1108378657 : 1108378656;
    case "number":
      return xn(r);
    case "string":
      return r.length > oi ? ti(r) : Tr(r);
    case "object":
    case "function":
      return ei(r);
    case "symbol":
      return ri(r);
    default:
      if (typeof r.toString == "function")
        return Tr(r.toString());
      throw new Error("Value type " + typeof r + " cannot be hashed.");
  }
}
o(K, "hash");
function me(t) {
  return t === null ? 1108378658 : 1108378659;
}
o(me, "hashNullish");
function xn(t) {
  if (t !== t || t === 1 / 0)
    return 0;
  var r = t | 0;
  for (r !== t && (r ^= t * 4294967295); t > 4294967295; )
    t /= 4294967295, r ^= t;
  return yr(r);
}
o(xn, "hashNumber");
function ti(t) {
  var r = Er[t];
  return r === void 0 && (r = Tr(t), br === si && (br = 0, Er = {}), br++, Er[t] = r), r;
}
o(ti, "cachedHashString");
function Tr(t) {
  for (var r = 0, e = 0; e < t.length; e++)
    r = 31 * r + t.charCodeAt(e) | 0;
  return yr(r);
}
o(Tr, "hashString");
function ri(t) {
  var r = Oe[t];
  return r !== void 0 || (r = rn(), Oe[t] = r), r;
}
o(ri, "hashSymbol");
function ei(t) {
  var r;
  if ($r && (r = Dr.get(t), r !== void 0) || (r = t[gt], r !== void 0) || !we && (r = t.propertyIsEnumerable && t.propertyIsEnumerable[gt], r !== void 0 || (r = ni(t), r !== void 0)))
    return r;
  if (r = rn(), $r)
    Dr.set(t, r);
  else {
    if (Se !== void 0 && Se(t) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (we)
      Object.defineProperty(t, gt, { enumerable: false, configurable: false, writable: false, value: r });
    else if (t.propertyIsEnumerable !== void 0 && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable)
      t.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t.propertyIsEnumerable[gt] = r;
    else if (t.nodeType !== void 0)
      t[gt] = r;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return r;
}
o(ei, "hashJSObj");
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
o(ni, "getIENodeHash");
function ii(t) {
  return t.valueOf !== Vn && typeof t.valueOf == "function" ? t.valueOf(t) : t;
}
o(ii, "valueOf");
function rn() {
  var t = ++Ir;
  return Ir & 1073741824 && (Ir = 0), t;
}
o(rn, "nextHash");
var $r = typeof WeakMap == "function";
var Dr;
$r && (Dr = /* @__PURE__ */ new WeakMap());
var Oe = /* @__PURE__ */ Object.create(null);
var Ir = 0;
var gt = "__immutablehash__";
typeof Symbol == "function" && (gt = Symbol(gt));
var oi = 16;
var si = 255;
var br = 0;
var Er = {};
var gr = function(t) {
  function r(e, n2) {
    this._iter = e, this._useKeys = n2, this.size = e.size;
  }
  return o(r, "ToKeyedSequence"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.get = o(function(n2, i2) {
    return this._iter.get(n2, i2);
  }, "get"), r.prototype.has = o(function(n2) {
    return this._iter.has(n2);
  }, "has"), r.prototype.valueSeq = o(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), r.prototype.reverse = o(function() {
    var n2 = this, i2 = Jr(this, true);
    return this._useKeys || (i2.valueSeq = function() {
      return n2._iter.toSeq().reverse();
    }), i2;
  }, "reverse"), r.prototype.map = o(function(n2, i2) {
    var s2 = this, u2 = un(this, n2, i2);
    return this._useKeys || (u2.valueSeq = function() {
      return s2._iter.toSeq().map(n2, i2);
    }), u2;
  }, "map"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2, a2) {
      return n2(u2, a2, s2);
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    return this._iter.__iterator(n2, i2);
  }, "__iterator"), r;
}(yt);
gr.prototype[Dt] = true;
var en = function(t) {
  function r(e) {
    this._iter = e, this.size = e.size;
  }
  return o(r, "ToIndexedSequence"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.includes = o(function(n2) {
    return this._iter.includes(n2);
  }, "includes"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this, u2 = 0;
    return i2 && bt(this), this._iter.__iterate(function(a2) {
      return n2(a2, i2 ? s2.size - ++u2 : u2++, s2);
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this, u2 = this._iter.__iterator(rt, i2), a2 = 0;
    return i2 && bt(this), new m2(function() {
      var f = u2.next();
      return f.done ? f : E(n2, i2 ? s2.size - ++a2 : a2++, f.value, f);
    });
  }, "__iterator"), r;
}(V);
var nn = function(t) {
  function r(e) {
    this._iter = e, this.size = e.size;
  }
  return o(r, "ToSetSequence"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.has = o(function(n2) {
    return this._iter.includes(n2);
  }, "has"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2) {
      return n2(u2, u2, s2);
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this._iter.__iterator(rt, i2);
    return new m2(function() {
      var u2 = s2.next();
      return u2.done ? u2 : E(n2, u2.value, u2.value, u2);
    });
  }, "__iterator"), r;
}(Ct);
var on = function(t) {
  function r(e) {
    this._iter = e, this.size = e.size;
  }
  return o(r, "FromEntriesSequence"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.entrySeq = o(function() {
    return this._iter.toSeq();
  }, "entrySeq"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    return this._iter.__iterate(function(u2) {
      if (u2) {
        be(u2);
        var a2 = k2(u2);
        return n2(a2 ? u2.get(1) : u2[1], a2 ? u2.get(0) : u2[0], s2);
      }
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this._iter.__iterator(rt, i2);
    return new m2(function() {
      for (; ; ) {
        var u2 = s2.next();
        if (u2.done)
          return u2;
        var a2 = u2.value;
        if (a2) {
          be(a2);
          var f = k2(a2);
          return E(n2, f ? a2.get(0) : a2[0], f ? a2.get(1) : a2[1], u2);
        }
      }
    });
  }, "__iterator"), r;
}(yt);
en.prototype.cacheResult = gr.prototype.cacheResult = nn.prototype.cacheResult = on.prototype.cacheResult = Hr;
function sn(t) {
  var r = ut(t);
  return r._iter = t, r.size = t.size, r.flip = function() {
    return t;
  }, r.reverse = function() {
    var e = t.reverse.apply(this);
    return e.flip = function() {
      return t.reverse();
    }, e;
  }, r.has = function(e) {
    return t.includes(e);
  }, r.includes = function(e) {
    return t.has(e);
  }, r.cacheResult = Hr, r.__iterateUncached = function(e, n2) {
    var i2 = this;
    return t.__iterate(function(s2, u2) {
      return e(u2, s2, i2) !== false;
    }, n2);
  }, r.__iteratorUncached = function(e, n2) {
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
    return t.__iterator(e === rt ? tr : rt, n2);
  }, r;
}
o(sn, "flipFactory");
function un(t, r, e) {
  var n2 = ut(t);
  return n2.size = t.size, n2.has = function(i2) {
    return t.has(i2);
  }, n2.get = function(i2, s2) {
    var u2 = t.get(i2, g2);
    return u2 === g2 ? s2 : r.call(e, u2, i2, t);
  }, n2.__iterateUncached = function(i2, s2) {
    var u2 = this;
    return t.__iterate(function(a2, f, h) {
      return i2(r.call(e, a2, f, h), f, u2) !== false;
    }, s2);
  }, n2.__iteratorUncached = function(i2, s2) {
    var u2 = t.__iterator(Q, s2);
    return new m2(function() {
      var a2 = u2.next();
      if (a2.done)
        return a2;
      var f = a2.value, h = f[0];
      return E(i2, h, r.call(e, f[1], h, t), a2);
    });
  }, n2;
}
o(un, "mapFactory");
function Jr(t, r) {
  var e = this, n2 = ut(t);
  return n2._iter = t, n2.size = t.size, n2.reverse = function() {
    return t;
  }, t.flip && (n2.flip = function() {
    var i2 = sn(t);
    return i2.reverse = function() {
      return t.flip();
    }, i2;
  }), n2.get = function(i2, s2) {
    return t.get(r ? i2 : -1 - i2, s2);
  }, n2.has = function(i2) {
    return t.has(r ? i2 : -1 - i2);
  }, n2.includes = function(i2) {
    return t.includes(i2);
  }, n2.cacheResult = Hr, n2.__iterate = function(i2, s2) {
    var u2 = this, a2 = 0;
    return s2 && bt(t), t.__iterate(function(f, h) {
      return i2(f, r ? h : s2 ? u2.size - ++a2 : a2++, u2);
    }, !s2);
  }, n2.__iterator = function(i2, s2) {
    var u2 = 0;
    s2 && bt(t);
    var a2 = t.__iterator(Q, !s2);
    return new m2(function() {
      var f = a2.next();
      if (f.done)
        return f;
      var h = f.value;
      return E(i2, r ? h[0] : s2 ? e.size - ++u2 : u2++, h[1], f);
    });
  }, n2;
}
o(Jr, "reverseFactory");
function an(t, r, e, n2) {
  var i2 = ut(t);
  return n2 && (i2.has = function(s2) {
    var u2 = t.get(s2, g2);
    return u2 !== g2 && !!r.call(e, u2, s2, t);
  }, i2.get = function(s2, u2) {
    var a2 = t.get(s2, g2);
    return a2 !== g2 && r.call(e, a2, s2, t) ? a2 : u2;
  }), i2.__iterateUncached = function(s2, u2) {
    var a2 = this, f = 0;
    return t.__iterate(function(h, c, p) {
      if (r.call(e, h, c, p))
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
        if (r.call(e, _, p, t))
          return E(s2, n2 ? p : f++, _, h);
      }
    });
  }, i2;
}
o(an, "filterFactory");
function ui(t, r, e) {
  var n2 = Ut().asMutable();
  return t.__iterate(function(i2, s2) {
    n2.update(r.call(e, i2, s2, t), 0, function(u2) {
      return u2 + 1;
    });
  }), n2.asImmutable();
}
o(ui, "countByFactory");
function ai(t, r, e) {
  var n2 = M(t), i2 = (tt(t) ? pt() : Ut()).asMutable();
  t.__iterate(function(u2, a2) {
    i2.update(r.call(e, u2, a2, t), function(f) {
      return f = f || [], f.push(n2 ? [a2, u2] : u2), f;
    });
  });
  var s2 = cn(t);
  return i2.map(function(u2) {
    return O(t, s2(u2));
  }).asImmutable();
}
o(ai, "groupByFactory");
function Yr(t, r, e, n2) {
  var i2 = t.size;
  if (Vt(r, e, i2))
    return t;
  var s2 = jt(r, i2), u2 = xt(e, i2);
  if (s2 !== s2 || u2 !== u2)
    return Yr(t.toSeq().cacheResult(), r, e, n2);
  var a2 = u2 - s2, f;
  a2 === a2 && (f = a2 < 0 ? 0 : a2);
  var h = ut(t);
  return h.size = f === 0 ? f : t.size && f || void 0, !n2 && Pr(t) && f >= 0 && (h.get = function(c, p) {
    return c = lt(this, c), c >= 0 && c < f ? t.get(c + s2, p) : p;
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
      return n2 || c === rt || d2.done ? d2 : c === tr ? E(c, l2 - 1, void 0, d2) : E(c, l2 - 1, d2.value[1], d2);
    });
  }, h;
}
o(Yr, "sliceFactory");
function fi(t, r, e) {
  var n2 = ut(t);
  return n2.__iterateUncached = function(i2, s2) {
    var u2 = this;
    if (s2)
      return this.cacheResult().__iterate(i2, s2);
    var a2 = 0;
    return t.__iterate(function(f, h, c) {
      return r.call(e, f, h, c) && ++a2 && i2(f, h, u2);
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
      return r.call(e, _, p, u2) ? i2 === Q ? h : E(i2, p, _, h) : (f = false, P());
    });
  }, n2;
}
o(fi, "takeWhileFactory");
function fn(t, r, e, n2) {
  var i2 = ut(t);
  return i2.__iterateUncached = function(s2, u2) {
    var a2 = this;
    if (u2)
      return this.cacheResult().__iterate(s2, u2);
    var f = true, h = 0;
    return t.__iterate(function(c, p, _) {
      if (!(f && (f = r.call(e, c, p, _))))
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
          return n2 || s2 === rt ? p : s2 === tr ? E(s2, c++, void 0, p) : E(s2, c++, p.value[1], p);
        var l2 = p.value;
        _ = l2[0], v = l2[1], h && (h = r.call(e, v, _, a2));
      } while (h);
      return s2 === Q ? p : E(s2, _, v, p);
    });
  }, i2;
}
o(fn, "skipWhileFactory");
function hi(t, r) {
  var e = M(t), n2 = [t].concat(r).map(function(u2) {
    return k2(u2) ? e && (u2 = G(u2)) : u2 = e ? kr(u2) : Ve(Array.isArray(u2) ? u2 : [u2]), u2;
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
  var s2 = new mt(n2);
  return e ? s2 = s2.toKeyedSeq() : F(t) || (s2 = s2.toSetSeq()), s2 = s2.flatten(true), s2.size = n2.reduce(function(u2, a2) {
    if (u2 !== void 0) {
      var f = a2.size;
      if (f !== void 0)
        return u2 + f;
    }
  }, 0), s2;
}
o(hi, "concatFactory");
function hn(t, r, e) {
  var n2 = ut(t);
  return n2.__iterateUncached = function(i2, s2) {
    if (s2)
      return this.cacheResult().__iterate(i2, s2);
    var u2 = 0, a2 = false;
    function f(h, c) {
      h.__iterate(function(p, _) {
        return (!r || c < r) && k2(p) ? f(p, c + 1) : (u2++, i2(p, e ? _ : u2 - 1, n2) === false && (a2 = true)), !a2;
      }, s2);
    }
    return o(f, "flatDeep"), f(t, 0), u2;
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
        if (i2 === Q && (c = c[1]), (!r || a2.length < r) && k2(c))
          a2.push(u2), u2 = c.__iterator(i2, s2);
        else
          return e ? h : E(i2, f++, c, h);
      }
      return P();
    });
  }, n2;
}
o(hn, "flattenFactory");
function ci(t, r, e) {
  var n2 = cn(t);
  return t.toSeq().map(function(i2, s2) {
    return n2(r.call(e, i2, s2, t));
  }).flatten(true);
}
o(ci, "flatMapFactory");
function pi(t, r) {
  var e = ut(t);
  return e.size = t.size && t.size * 2 - 1, e.__iterateUncached = function(n2, i2) {
    var s2 = this, u2 = 0;
    return t.__iterate(function(a2) {
      return (!u2 || n2(r, u2++, s2) !== false) && n2(a2, u2++, s2) !== false;
    }, i2), u2;
  }, e.__iteratorUncached = function(n2, i2) {
    var s2 = t.__iterator(rt, i2), u2 = 0, a2;
    return new m2(function() {
      return (!a2 || u2 % 2) && (a2 = s2.next(), a2.done) ? a2 : u2 % 2 ? E(n2, u2++, r) : E(n2, u2++, a2.value, a2);
    });
  }, e;
}
o(pi, "interposeFactory");
function Et(t, r, e) {
  r || (r = pn);
  var n2 = M(t), i2 = 0, s2 = t.toSeq().map(function(u2, a2) {
    return [a2, u2, i2++, e ? e(u2, a2, t) : u2];
  }).valueSeq().toArray();
  return s2.sort(function(u2, a2) {
    return r(u2[3], a2[3]) || u2[2] - a2[2];
  }).forEach(n2 ? function(u2, a2) {
    s2[a2].length = 2;
  } : function(u2, a2) {
    s2[a2] = u2[1];
  }), n2 ? yt(s2) : F(t) ? V(s2) : Ct(s2);
}
o(Et, "sortFactory");
function sr(t, r, e) {
  if (r || (r = pn), e) {
    var n2 = t.toSeq().map(function(i2, s2) {
      return [i2, e(i2, s2, t)];
    }).reduce(function(i2, s2) {
      return Ie(r, i2[1], s2[1]) ? s2 : i2;
    });
    return n2 && n2[0];
  }
  return t.reduce(function(i2, s2) {
    return Ie(r, i2, s2) ? s2 : i2;
  });
}
o(sr, "maxFactory");
function Ie(t, r, e) {
  var n2 = t(e, r);
  return n2 === 0 && e !== r && (e == null || e !== e) || n2 > 0;
}
o(Ie, "maxCompare");
function ur(t, r, e, n2) {
  var i2 = ut(t), s2 = new mt(e).map(function(u2) {
    return u2.size;
  });
  return i2.size = n2 ? s2.max() : s2.min(), i2.__iterate = function(u2, a2) {
    for (var f = this.__iterator(rt, a2), h, c = 0; !(h = f.next()).done && u2(h.value, c++, this) !== false; )
      ;
    return c;
  }, i2.__iteratorUncached = function(u2, a2) {
    var f = e.map(function(p) {
      return p = q2(p), jr(a2 ? p.reverse() : p);
    }), h = 0, c = false;
    return new m2(function() {
      var p;
      return c || (p = f.map(function(_) {
        return _.next();
      }), c = n2 ? p.every(function(_) {
        return _.done;
      }) : p.some(function(_) {
        return _.done;
      })), c ? P() : E(u2, h++, r.apply(null, p.map(function(_) {
        return _.value;
      })));
    });
  }, i2;
}
o(ur, "zipWithFactory");
function O(t, r) {
  return t === r ? t : Pr(t) ? r : t.constructor(r);
}
o(O, "reify");
function be(t) {
  if (t !== Object(t))
    throw new TypeError("Expected [K, V] tuple: " + t);
}
o(be, "validateEntry");
function cn(t) {
  return M(t) ? G : F(t) ? St : Tt;
}
o(cn, "collectionClass");
function ut(t) {
  return Object.create((M(t) ? yt : F(t) ? V : Ct).prototype);
}
o(ut, "makeSequence");
function Hr() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : J.prototype.cacheResult.call(this);
}
o(Hr, "cacheResultThrough");
function pn(t, r) {
  return t === void 0 && r === void 0 ? 0 : t === void 0 ? 1 : r === void 0 ? -1 : t > r ? 1 : t < r ? -1 : 0;
}
o(pn, "defaultComparator");
function ot(t, r) {
  r = r || 0;
  for (var e = Math.max(0, t.length - r), n2 = new Array(e), i2 = 0; i2 < e; i2++)
    n2[i2] = t[i2 + r];
  return n2;
}
o(ot, "arrCopy");
function Xr(t, r) {
  if (!t)
    throw new Error(r);
}
o(Xr, "invariant");
function Z(t) {
  Xr(t !== 1 / 0, "Cannot perform this action with an infinite size.");
}
o(Z, "assertNotInfinite");
function _n(t) {
  if (Ge(t) && typeof t != "string")
    return t;
  if (tt(t))
    return t.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t);
}
o(_n, "coerceKeyPath");
var _i = Object.prototype.toString;
function vi(t) {
  if (!t || typeof t != "object" || _i.call(t) !== "[object Object]")
    return false;
  var r = Object.getPrototypeOf(t);
  if (r === null)
    return true;
  for (var e = r, n2 = Object.getPrototypeOf(r); n2 !== null; )
    e = n2, n2 = Object.getPrototypeOf(e);
  return e === r;
}
o(vi, "isPlainObject");
function dt(t) {
  return typeof t == "object" && (st(t) || Array.isArray(t) || vi(t));
}
o(dt, "isDataStructure");
function Jt(t) {
  try {
    return typeof t == "string" ? JSON.stringify(t) : String(t);
  } catch {
    return JSON.stringify(t);
  }
}
o(Jt, "quoteString");
function li(t, r) {
  return st(t) ? t.has(r) : dt(t) && Nt.call(t, r);
}
o(li, "has");
function vn(t, r, e) {
  return st(t) ? t.get(r, e) : li(t, r) ? typeof t.get == "function" ? t.get(r) : t[r] : e;
}
o(vn, "get");
function pr(t) {
  if (Array.isArray(t))
    return ot(t);
  var r = {};
  for (var e in t)
    Nt.call(t, e) && (r[e] = t[e]);
  return r;
}
o(pr, "shallowCopy");
function di(t, r) {
  if (!dt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (st(t)) {
    if (!t.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t);
    return t.remove(r);
  }
  if (!Nt.call(t, r))
    return t;
  var e = pr(t);
  return Array.isArray(e) ? e.splice(r, 1) : delete e[r], e;
}
o(di, "remove");
function yi(t, r, e) {
  if (!dt(t))
    throw new TypeError("Cannot update non-data-structure value: " + t);
  if (st(t)) {
    if (!t.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t);
    return t.set(r, e);
  }
  if (Nt.call(t, r) && e === t[r])
    return t;
  var n2 = pr(t);
  return n2[r] = e, n2;
}
o(yi, "set");
function Lt(t, r, e, n2) {
  n2 || (n2 = e, e = void 0);
  var i2 = ln(st(t), t, _n(r), 0, e, n2);
  return i2 === g2 ? e : i2;
}
o(Lt, "updateIn$1");
function ln(t, r, e, n2, i2, s2) {
  var u2 = r === g2;
  if (n2 === e.length) {
    var a2 = u2 ? i2 : r, f = s2(a2);
    return f === a2 ? r : f;
  }
  if (!u2 && !dt(r))
    throw new TypeError("Cannot update within non-data-structure value in path [" + e.slice(0, n2).map(Jt) + "]: " + r);
  var h = e[n2], c = u2 ? g2 : vn(r, h, g2), p = ln(c === g2 ? t : st(c), c, e, n2 + 1, i2, s2);
  return p === c ? r : p === g2 ? di(r, h) : yi(u2 ? t ? x() : {} : r, h, p);
}
o(ln, "updateInDeeply");
function gi(t, r, e) {
  return Lt(t, r, g2, function() {
    return e;
  });
}
o(gi, "setIn$1");
function Zr(t, r) {
  return gi(this, t, r);
}
o(Zr, "setIn");
function mi(t, r) {
  return Lt(t, r, function() {
    return g2;
  });
}
o(mi, "removeIn");
function Qr(t) {
  return mi(this, t);
}
o(Qr, "deleteIn");
function dn(t, r, e, n2) {
  return Lt(t, [r], e, n2);
}
o(dn, "update$1");
function Gr(t, r, e) {
  return arguments.length === 1 ? t(this) : dn(this, t, r, e);
}
o(Gr, "update");
function Vr(t, r, e) {
  return Lt(this, t, r, e);
}
o(Vr, "updateIn");
function yn() {
  for (var t = [], r = arguments.length; r--; )
    t[r] = arguments[r];
  return mn(this, t);
}
o(yn, "merge$1");
function gn(t) {
  for (var r = [], e = arguments.length - 1; e-- > 0; )
    r[e] = arguments[e + 1];
  if (typeof t != "function")
    throw new TypeError("Invalid merger function: " + t);
  return mn(this, r, t);
}
o(gn, "mergeWith$1");
function mn(t, r, e) {
  for (var n2 = [], i2 = 0; i2 < r.length; i2++) {
    var s2 = G(r[i2]);
    s2.size !== 0 && n2.push(s2);
  }
  return n2.length === 0 ? t : t.toSeq().size === 0 && !t.__ownerID && n2.length === 1 ? t.constructor(n2[0]) : t.withMutations(function(u2) {
    for (var a2 = e ? function(h, c) {
      dn(u2, c, g2, function(p) {
        return p === g2 ? h : e(p, h, c);
      });
    } : function(h, c) {
      u2.set(c, h);
    }, f = 0; f < n2.length; f++)
      n2[f].forEach(a2);
  });
}
o(mn, "mergeIntoKeyedWith");
function xr(t, r, e) {
  return te(t, r, Si(e));
}
o(xr, "mergeDeepWithSources");
function te(t, r, e) {
  if (!dt(t))
    throw new TypeError("Cannot merge into non-data-structure value: " + t);
  if (st(t))
    return typeof e == "function" && t.mergeWith ? t.mergeWith.apply(t, [e].concat(r)) : t.merge ? t.merge.apply(t, r) : t.concat.apply(t, r);
  for (var n2 = Array.isArray(t), i2 = t, s2 = n2 ? St : G, u2 = n2 ? function(f) {
    i2 === t && (i2 = pr(i2)), i2.push(f);
  } : function(f, h) {
    var c = Nt.call(i2, h), p = c && e ? e(i2[h], f, h) : f;
    (!c || p !== i2[h]) && (i2 === t && (i2 = pr(i2)), i2[h] = p);
  }, a2 = 0; a2 < r.length; a2++)
    s2(r[a2]).forEach(u2);
  return i2;
}
o(te, "mergeWithSources");
function Si(t) {
  function r(e, n2, i2) {
    return dt(e) && dt(n2) && wi(e, n2) ? te(e, [n2], r) : t ? t(e, n2, i2) : n2;
  }
  return o(r, "deepMerger"), r;
}
o(Si, "deepMergerWith");
function wi(t, r) {
  var e = J(t), n2 = J(r);
  return F(e) === F(n2) && M(e) === M(n2);
}
o(wi, "areMergeable");
function Sn() {
  for (var t = [], r = arguments.length; r--; )
    t[r] = arguments[r];
  return xr(this, t);
}
o(Sn, "mergeDeep");
function wn(t) {
  for (var r = [], e = arguments.length - 1; e-- > 0; )
    r[e] = arguments[e + 1];
  return xr(this, r, t);
}
o(wn, "mergeDeepWith");
function re(t) {
  for (var r = [], e = arguments.length - 1; e-- > 0; )
    r[e] = arguments[e + 1];
  return Lt(this, t, x(), function(n2) {
    return te(n2, r);
  });
}
o(re, "mergeIn");
function ee(t) {
  for (var r = [], e = arguments.length - 1; e-- > 0; )
    r[e] = arguments[e + 1];
  return Lt(this, t, x(), function(n2) {
    return xr(n2, r);
  });
}
o(ee, "mergeDeepIn");
function rr(t) {
  var r = this.asMutable();
  return t(r), r.wasAltered() ? r.__ensureOwner(this.__ownerID) : this;
}
o(rr, "withMutations");
function er() {
  return this.__ownerID ? this : this.__ensureOwner(new Ur());
}
o(er, "asMutable");
function nr() {
  return this.__ensureOwner();
}
o(nr, "asImmutable");
function ne() {
  return this.__altered;
}
o(ne, "wasAltered");
var Ut = function(t) {
  function r(e) {
    return e == null ? x() : Kr(e) && !tt(e) ? e : x().withMutations(function(n2) {
      var i2 = t(e);
      Z(i2.size), i2.forEach(function(s2, u2) {
        return n2.set(u2, s2);
      });
    });
  }
  return o(r, "Map"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    for (var n2 = [], i2 = arguments.length; i2--; )
      n2[i2] = arguments[i2];
    return x().withMutations(function(s2) {
      for (var u2 = 0; u2 < n2.length; u2 += 2) {
        if (u2 + 1 >= n2.length)
          throw new Error("Missing value for key: " + n2[u2]);
        s2.set(n2[u2], n2[u2 + 1]);
      }
    });
  }, "of"), r.prototype.toString = o(function() {
    return this.__toString("Map {", "}");
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    return this._root ? this._root.get(0, void 0, n2, i2) : i2;
  }, "get"), r.prototype.set = o(function(n2, i2) {
    return Me(this, n2, i2);
  }, "set"), r.prototype.remove = o(function(n2) {
    return Me(this, n2, g2);
  }, "remove"), r.prototype.deleteAll = o(function(n2) {
    var i2 = q2(n2);
    return i2.size === 0 ? this : this.withMutations(function(s2) {
      i2.forEach(function(u2) {
        return s2.remove(u2);
      });
    });
  }, "deleteAll"), r.prototype.clear = o(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : x();
  }, "clear"), r.prototype.sort = o(function(n2) {
    return pt(Et(this, n2));
  }, "sort"), r.prototype.sortBy = o(function(n2, i2) {
    return pt(Et(this, i2, n2));
  }, "sortBy"), r.prototype.map = o(function(n2, i2) {
    var s2 = this;
    return this.withMutations(function(u2) {
      u2.forEach(function(a2, f) {
        u2.set(f, n2.call(i2, a2, f, s2));
      });
    });
  }, "map"), r.prototype.__iterator = o(function(n2, i2) {
    return new Oi(this, n2, i2);
  }, "__iterator"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this, u2 = 0;
    return this._root && this._root.iterate(function(a2) {
      return u2++, n2(a2[1], a2[0], s2);
    }, i2), u2;
  }, "__iterate"), r.prototype.__ensureOwner = o(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? ie(this.size, this._root, n2, this.__hash) : this.size === 0 ? x() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r;
}(G);
Ut.isMap = Kr;
var z = Ut.prototype;
z[xe] = true;
z[Gt] = z.remove;
z.removeAll = z.deleteAll;
z.setIn = Zr;
z.removeIn = z.deleteIn = Qr;
z.update = Gr;
z.updateIn = Vr;
z.merge = z.concat = yn;
z.mergeWith = gn;
z.mergeDeep = Sn;
z.mergeDeepWith = wn;
z.mergeIn = re;
z.mergeDeepIn = ee;
z.withMutations = rr;
z.wasAltered = ne;
z.asImmutable = nr;
z["@@transducer/init"] = z.asMutable = er;
z["@@transducer/step"] = function(t, r) {
  return t.set(r[0], r[1]);
};
z["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var Yt = o(function(r, e) {
  this.ownerID = r, this.entries = e;
}, "ArrayMapNode");
Yt.prototype.get = o(function(r, e, n2, i2) {
  for (var s2 = this.entries, u2 = 0, a2 = s2.length; u2 < a2; u2++)
    if (N(n2, s2[u2][0]))
      return s2[u2][1];
  return i2;
}, "get");
Yt.prototype.update = o(function(r, e, n2, i2, s2, u2, a2) {
  for (var f = s2 === g2, h = this.entries, c = 0, p = h.length; c < p && !N(i2, h[c][0]); c++)
    ;
  var _ = c < p;
  if (_ ? h[c][1] === s2 : f)
    return this;
  if (X(a2), (f || !_) && X(u2), !(f && h.length === 1)) {
    if (!_ && !f && h.length >= Ai)
      return Ii(r, h, i2, s2);
    var v = r && r === this.ownerID, l2 = v ? h : ot(h);
    return _ ? f ? c === p - 1 ? l2.pop() : l2[c] = l2.pop() : l2[c] = [i2, s2] : l2.push([i2, s2]), v ? (this.entries = l2, this) : new Yt(r, l2);
  }
}, "update");
var zt = o(function(r, e, n2) {
  this.ownerID = r, this.bitmap = e, this.nodes = n2;
}, "BitmapIndexedNode");
zt.prototype.get = o(function(r, e, n2, i2) {
  e === void 0 && (e = K(n2));
  var s2 = 1 << ((r === 0 ? e : e >>> r) & U), u2 = this.bitmap;
  return (u2 & s2) === 0 ? i2 : this.nodes[On(u2 & s2 - 1)].get(r + b, e, n2, i2);
}, "get");
zt.prototype.update = o(function(r, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = (e === 0 ? n2 : n2 >>> e) & U, h = 1 << f, c = this.bitmap, p = (c & h) !== 0;
  if (!p && s2 === g2)
    return this;
  var _ = On(c & h - 1), v = this.nodes, l2 = p ? v[_] : void 0, d2 = oe(l2, r, e + b, n2, i2, s2, u2, a2);
  if (d2 === l2)
    return this;
  if (!p && d2 && v.length >= qi)
    return Ei(r, v, c, f, d2);
  if (p && !d2 && v.length === 2 && Ae(v[_ ^ 1]))
    return v[_ ^ 1];
  if (p && d2 && v.length === 1 && Ae(d2))
    return d2;
  var S = r && r === this.ownerID, y = p ? d2 ? c : c ^ h : c | h, w = p ? d2 ? In(v, _, d2, S) : Mi(v, _, S) : zi(v, _, d2, S);
  return S ? (this.bitmap = y, this.nodes = w, this) : new zt(r, y, w);
}, "update");
var Ht = o(function(r, e, n2) {
  this.ownerID = r, this.count = e, this.nodes = n2;
}, "HashArrayMapNode");
Ht.prototype.get = o(function(r, e, n2, i2) {
  e === void 0 && (e = K(n2));
  var s2 = (r === 0 ? e : e >>> r) & U, u2 = this.nodes[s2];
  return u2 ? u2.get(r + b, e, n2, i2) : i2;
}, "get");
Ht.prototype.update = o(function(r, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = (e === 0 ? n2 : n2 >>> e) & U, h = s2 === g2, c = this.nodes, p = c[f];
  if (h && !p)
    return this;
  var _ = oe(p, r, e + b, n2, i2, s2, u2, a2);
  if (_ === p)
    return this;
  var v = this.count;
  if (!p)
    v++;
  else if (!_ && (v--, v < Ri))
    return bi(r, c, v, f);
  var l2 = r && r === this.ownerID, d2 = In(c, f, _, l2);
  return l2 ? (this.count = v, this.nodes = d2, this) : new Ht(r, v, d2);
}, "update");
var Mt = o(function(r, e, n2) {
  this.ownerID = r, this.keyHash = e, this.entries = n2;
}, "HashCollisionNode");
Mt.prototype.get = o(function(r, e, n2, i2) {
  for (var s2 = this.entries, u2 = 0, a2 = s2.length; u2 < a2; u2++)
    if (N(n2, s2[u2][0]))
      return s2[u2][1];
  return i2;
}, "get");
Mt.prototype.update = o(function(r, e, n2, i2, s2, u2, a2) {
  n2 === void 0 && (n2 = K(i2));
  var f = s2 === g2;
  if (n2 !== this.keyHash)
    return f ? this : (X(a2), X(u2), se(this, r, e, n2, [i2, s2]));
  for (var h = this.entries, c = 0, p = h.length; c < p && !N(i2, h[c][0]); c++)
    ;
  var _ = c < p;
  if (_ ? h[c][1] === s2 : f)
    return this;
  if (X(a2), (f || !_) && X(u2), f && p === 2)
    return new ct(r, this.keyHash, h[c ^ 1]);
  var v = r && r === this.ownerID, l2 = v ? h : ot(h);
  return _ ? f ? c === p - 1 ? l2.pop() : l2[c] = l2.pop() : l2[c] = [i2, s2] : l2.push([i2, s2]), v ? (this.entries = l2, this) : new Mt(r, this.keyHash, l2);
}, "update");
var ct = o(function(r, e, n2) {
  this.ownerID = r, this.keyHash = e, this.entry = n2;
}, "ValueNode");
ct.prototype.get = o(function(r, e, n2, i2) {
  return N(n2, this.entry[0]) ? this.entry[1] : i2;
}, "get");
ct.prototype.update = o(function(r, e, n2, i2, s2, u2, a2) {
  var f = s2 === g2, h = N(i2, this.entry[0]);
  if (h ? s2 === this.entry[1] : f)
    return this;
  if (X(a2), f) {
    X(u2);
    return;
  }
  return h ? r && r === this.ownerID ? (this.entry[1] = s2, this) : new ct(r, this.keyHash, [i2, s2]) : (X(u2), se(this, r, e, K(i2), [i2, s2]));
}, "update");
Yt.prototype.iterate = Mt.prototype.iterate = function(t, r) {
  for (var e = this.entries, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++)
    if (t(e[r ? i2 - n2 : n2]) === false)
      return false;
};
zt.prototype.iterate = Ht.prototype.iterate = function(t, r) {
  for (var e = this.nodes, n2 = 0, i2 = e.length - 1; n2 <= i2; n2++) {
    var s2 = e[r ? i2 - n2 : n2];
    if (s2 && s2.iterate(t, r) === false)
      return false;
  }
};
ct.prototype.iterate = function(t, r) {
  return t(this.entry);
};
var Oi = function(t) {
  function r(e, n2, i2) {
    this._type = n2, this._reverse = i2, this._stack = e._root && Ee(e._root);
  }
  return o(r, "MapIterator"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.next = o(function() {
    for (var n2 = this._type, i2 = this._stack; i2; ) {
      var s2 = i2.node, u2 = i2.index++, a2 = void 0;
      if (s2.entry) {
        if (u2 === 0)
          return zr(n2, s2.entry);
      } else if (s2.entries) {
        if (a2 = s2.entries.length - 1, u2 <= a2)
          return zr(n2, s2.entries[this._reverse ? a2 - u2 : u2]);
      } else if (a2 = s2.nodes.length - 1, u2 <= a2) {
        var f = s2.nodes[this._reverse ? a2 - u2 : u2];
        if (f) {
          if (f.entry)
            return zr(n2, f.entry);
          i2 = this._stack = Ee(f, i2);
        }
        continue;
      }
      i2 = this._stack = this._stack.__prev;
    }
    return P();
  }, "next"), r;
}(m2);
function zr(t, r) {
  return E(t, r[0], r[1]);
}
o(zr, "mapIteratorValue");
function Ee(t, r) {
  return { node: t, index: 0, __prev: r };
}
o(Ee, "mapIteratorFrame");
function ie(t, r, e, n2) {
  var i2 = Object.create(z);
  return i2.size = t, i2._root = r, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
o(ie, "makeMap");
var ze;
function x() {
  return ze || (ze = ie(0));
}
o(x, "emptyMap");
function Me(t, r, e) {
  var n2, i2;
  if (t._root) {
    var s2 = qr(), u2 = qr();
    if (n2 = oe(t._root, t.__ownerID, 0, void 0, r, e, s2, u2), !u2.value)
      return t;
    i2 = t.size + (s2.value ? e === g2 ? -1 : 1 : 0);
  } else {
    if (e === g2)
      return t;
    i2 = 1, n2 = new Yt(t.__ownerID, [[r, e]]);
  }
  return t.__ownerID ? (t.size = i2, t._root = n2, t.__hash = void 0, t.__altered = true, t) : n2 ? ie(i2, n2) : x();
}
o(Me, "updateMap");
function oe(t, r, e, n2, i2, s2, u2, a2) {
  return t ? t.update(r, e, n2, i2, s2, u2, a2) : s2 === g2 ? t : (X(a2), X(u2), new ct(r, n2, [i2, s2]));
}
o(oe, "updateNode");
function Ae(t) {
  return t.constructor === ct || t.constructor === Mt;
}
o(Ae, "isLeafNode");
function se(t, r, e, n2, i2) {
  if (t.keyHash === n2)
    return new Mt(r, n2, [t.entry, i2]);
  var s2 = (e === 0 ? t.keyHash : t.keyHash >>> e) & U, u2 = (e === 0 ? n2 : n2 >>> e) & U, a2, f = s2 === u2 ? [se(t, r, e + b, n2, i2)] : (a2 = new ct(r, n2, i2), s2 < u2 ? [t, a2] : [a2, t]);
  return new zt(r, 1 << s2 | 1 << u2, f);
}
o(se, "mergeIntoNode");
function Ii(t, r, e, n2) {
  t || (t = new Ur());
  for (var i2 = new ct(t, K(e), [e, n2]), s2 = 0; s2 < r.length; s2++) {
    var u2 = r[s2];
    i2 = i2.update(t, 0, void 0, u2[0], u2[1]);
  }
  return i2;
}
o(Ii, "createNodes");
function bi(t, r, e, n2) {
  for (var i2 = 0, s2 = 0, u2 = new Array(e), a2 = 0, f = 1, h = r.length; a2 < h; a2++, f <<= 1) {
    var c = r[a2];
    c !== void 0 && a2 !== n2 && (i2 |= f, u2[s2++] = c);
  }
  return new zt(t, i2, u2);
}
o(bi, "packNodes");
function Ei(t, r, e, n2, i2) {
  for (var s2 = 0, u2 = new Array(H), a2 = 0; e !== 0; a2++, e >>>= 1)
    u2[a2] = e & 1 ? r[s2++] : void 0;
  return u2[n2] = i2, new Ht(t, s2 + 1, u2);
}
o(Ei, "expandNodes");
function On(t) {
  return t -= t >> 1 & 1431655765, t = (t & 858993459) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, t & 127;
}
o(On, "popCount");
function In(t, r, e, n2) {
  var i2 = n2 ? t : ot(t);
  return i2[r] = e, i2;
}
o(In, "setAt");
function zi(t, r, e, n2) {
  var i2 = t.length + 1;
  if (n2 && r + 1 === i2)
    return t[r] = e, t;
  for (var s2 = new Array(i2), u2 = 0, a2 = 0; a2 < i2; a2++)
    a2 === r ? (s2[a2] = e, u2 = -1) : s2[a2] = t[a2 + u2];
  return s2;
}
o(zi, "spliceIn");
function Mi(t, r, e) {
  var n2 = t.length - 1;
  if (e && r === n2)
    return t.pop(), t;
  for (var i2 = new Array(n2), s2 = 0, u2 = 0; u2 < n2; u2++)
    u2 === r && (s2 = 1), i2[u2] = t[u2 + s2];
  return i2;
}
o(Mi, "spliceOut");
var Ai = H / 4;
var qi = H / 2;
var Ri = H / 4;
var bn = "@@__IMMUTABLE_LIST__@@";
function En(t) {
  return Boolean(t && t[bn]);
}
o(En, "isList");
var mr = function(t) {
  function r(e) {
    var n2 = cr();
    if (e == null)
      return n2;
    if (En(e))
      return e;
    var i2 = t(e), s2 = i2.size;
    return s2 === 0 ? n2 : (Z(s2), s2 > 0 && s2 < H ? Xt(0, s2, b, null, new vt(i2.toArray())) : n2.withMutations(function(u2) {
      u2.setSize(s2), i2.forEach(function(a2, f) {
        return u2.set(f, a2);
      });
    }));
  }
  return o(r, "List"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return this(arguments);
  }, "of"), r.prototype.toString = o(function() {
    return this.__toString("List [", "]");
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    if (n2 = lt(this, n2), n2 >= 0 && n2 < this.size) {
      n2 += this._origin;
      var s2 = zn(this, n2);
      return s2 && s2.array[n2 & U];
    }
    return i2;
  }, "get"), r.prototype.set = o(function(n2, i2) {
    return ji(this, n2, i2);
  }, "set"), r.prototype.remove = o(function(n2) {
    return this.has(n2) ? n2 === 0 ? this.shift() : n2 === this.size - 1 ? this.pop() : this.splice(n2, 1) : this;
  }, "remove"), r.prototype.insert = o(function(n2, i2) {
    return this.splice(n2, 0, i2);
  }, "insert"), r.prototype.clear = o(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = b, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : cr();
  }, "clear"), r.prototype.push = o(function() {
    var n2 = arguments, i2 = this.size;
    return this.withMutations(function(s2) {
      _t(s2, 0, i2 + n2.length);
      for (var u2 = 0; u2 < n2.length; u2++)
        s2.set(i2 + u2, n2[u2]);
    });
  }, "push"), r.prototype.pop = o(function() {
    return _t(this, 0, -1);
  }, "pop"), r.prototype.unshift = o(function() {
    var n2 = arguments;
    return this.withMutations(function(i2) {
      _t(i2, -n2.length);
      for (var s2 = 0; s2 < n2.length; s2++)
        i2.set(s2, n2[s2]);
    });
  }, "unshift"), r.prototype.shift = o(function() {
    return _t(this, 1);
  }, "shift"), r.prototype.concat = o(function() {
    for (var n2 = arguments, i2 = [], s2 = 0; s2 < arguments.length; s2++) {
      var u2 = n2[s2], a2 = t(typeof u2 != "string" && Qe(u2) ? u2 : [u2]);
      a2.size !== 0 && i2.push(a2);
    }
    return i2.length === 0 ? this : this.size === 0 && !this.__ownerID && i2.length === 1 ? this.constructor(i2[0]) : this.withMutations(function(f) {
      i2.forEach(function(h) {
        return h.forEach(function(c) {
          return f.push(c);
        });
      });
    });
  }, "concat"), r.prototype.setSize = o(function(n2) {
    return _t(this, 0, n2);
  }, "setSize"), r.prototype.map = o(function(n2, i2) {
    var s2 = this;
    return this.withMutations(function(u2) {
      for (var a2 = 0; a2 < s2.size; a2++)
        u2.set(a2, n2.call(i2, u2.get(a2), a2, s2));
    });
  }, "map"), r.prototype.slice = o(function(n2, i2) {
    var s2 = this.size;
    return Vt(n2, i2, s2) ? this : _t(this, jt(n2, s2), xt(i2, s2));
  }, "slice"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = i2 ? this.size : 0, u2 = qe(this, i2);
    return new m2(function() {
      var a2 = u2();
      return a2 === Kt ? P() : E(n2, i2 ? --s2 : s2++, a2);
    });
  }, "__iterator"), r.prototype.__iterate = o(function(n2, i2) {
    for (var s2 = i2 ? this.size : 0, u2 = qe(this, i2), a2; (a2 = u2()) !== Kt && n2(a2, i2 ? --s2 : s2++, this) !== false; )
      ;
    return s2;
  }, "__iterate"), r.prototype.__ensureOwner = o(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? Xt(this._origin, this._capacity, this._level, this._root, this._tail, n2, this.__hash) : this.size === 0 ? cr() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r;
}(St);
mr.isList = En;
var D = mr.prototype;
D[bn] = true;
D[Gt] = D.remove;
D.merge = D.concat;
D.setIn = Zr;
D.deleteIn = D.removeIn = Qr;
D.update = Gr;
D.updateIn = Vr;
D.mergeIn = re;
D.mergeDeepIn = ee;
D.withMutations = rr;
D.wasAltered = ne;
D.asImmutable = nr;
D["@@transducer/init"] = D.asMutable = er;
D["@@transducer/step"] = function(t, r) {
  return t.push(r);
};
D["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
var vt = o(function(r, e) {
  this.array = r, this.ownerID = e;
}, "VNode");
vt.prototype.removeBefore = o(function(r, e, n2) {
  if (n2 === e ? 1 << e : this.array.length === 0)
    return this;
  var i2 = n2 >>> e & U;
  if (i2 >= this.array.length)
    return new vt([], r);
  var s2 = i2 === 0, u2;
  if (e > 0) {
    var a2 = this.array[i2];
    if (u2 = a2 && a2.removeBefore(r, e - b, n2), u2 === a2 && s2)
      return this;
  }
  if (s2 && !u2)
    return this;
  var f = At(this, r);
  if (!s2)
    for (var h = 0; h < i2; h++)
      f.array[h] = void 0;
  return u2 && (f.array[i2] = u2), f;
}, "removeBefore");
vt.prototype.removeAfter = o(function(r, e, n2) {
  if (n2 === (e ? 1 << e : 0) || this.array.length === 0)
    return this;
  var i2 = n2 - 1 >>> e & U;
  if (i2 >= this.array.length)
    return this;
  var s2;
  if (e > 0) {
    var u2 = this.array[i2];
    if (s2 = u2 && u2.removeAfter(r, e - b, n2), s2 === u2 && i2 === this.array.length - 1)
      return this;
  }
  var a2 = At(this, r);
  return a2.array.splice(i2 + 1), s2 && (a2.array[i2] = s2), a2;
}, "removeAfter");
var Kt = {};
function qe(t, r) {
  var e = t._origin, n2 = t._capacity, i2 = Zt(n2), s2 = t._tail;
  return u2(t._root, t._level, 0);
  function u2(h, c, p) {
    return c === 0 ? a2(h, p) : f(h, c, p);
  }
  function a2(h, c) {
    var p = c === i2 ? s2 && s2.array : h && h.array, _ = c > e ? 0 : e - c, v = n2 - c;
    return v > H && (v = H), function() {
      if (_ === v)
        return Kt;
      var l2 = r ? --v : _++;
      return p && p[l2];
    };
  }
  function f(h, c, p) {
    var _, v = h && h.array, l2 = p > e ? 0 : e - p >> c, d2 = (n2 - p >> c) + 1;
    return d2 > H && (d2 = H), function() {
      for (; ; ) {
        if (_) {
          var S = _();
          if (S !== Kt)
            return S;
          _ = null;
        }
        if (l2 === d2)
          return Kt;
        var y = r ? --d2 : l2++;
        _ = u2(v && v[y], c - b, p + (y << c));
      }
    };
  }
}
o(qe, "iterateList");
function Xt(t, r, e, n2, i2, s2, u2) {
  var a2 = Object.create(D);
  return a2.size = r - t, a2._origin = t, a2._capacity = r, a2._level = e, a2._root = n2, a2._tail = i2, a2.__ownerID = s2, a2.__hash = u2, a2.__altered = false, a2;
}
o(Xt, "makeList");
var Re;
function cr() {
  return Re || (Re = Xt(0, 0, b));
}
o(cr, "emptyList");
function ji(t, r, e) {
  if (r = lt(t, r), r !== r)
    return t;
  if (r >= t.size || r < 0)
    return t.withMutations(function(u2) {
      r < 0 ? _t(u2, r).set(0, e) : _t(u2, 0, r + 1).set(r, e);
    });
  r += t._origin;
  var n2 = t._tail, i2 = t._root, s2 = qr();
  return r >= Zt(t._capacity) ? n2 = Nr(n2, t.__ownerID, 0, r, e, s2) : i2 = Nr(i2, t.__ownerID, t._level, r, e, s2), s2.value ? t.__ownerID ? (t._root = i2, t._tail = n2, t.__hash = void 0, t.__altered = true, t) : Xt(t._origin, t._capacity, t._level, i2, n2) : t;
}
o(ji, "updateList");
function Nr(t, r, e, n2, i2, s2) {
  var u2 = n2 >>> e & U, a2 = t && u2 < t.array.length;
  if (!a2 && i2 === void 0)
    return t;
  var f;
  if (e > 0) {
    var h = t && t.array[u2], c = Nr(h, r, e - b, n2, i2, s2);
    return c === h ? t : (f = At(t, r), f.array[u2] = c, f);
  }
  return a2 && t.array[u2] === i2 ? t : (s2 && X(s2), f = At(t, r), i2 === void 0 && u2 === f.array.length - 1 ? f.array.pop() : f.array[u2] = i2, f);
}
o(Nr, "updateVNode");
function At(t, r) {
  return r && t && r === t.ownerID ? t : new vt(t ? t.array.slice() : [], r);
}
o(At, "editableVNode");
function zn(t, r) {
  if (r >= Zt(t._capacity))
    return t._tail;
  if (r < 1 << t._level + b) {
    for (var e = t._root, n2 = t._level; e && n2 > 0; )
      e = e.array[r >>> n2 & U], n2 -= b;
    return e;
  }
}
o(zn, "listNodeFor");
function _t(t, r, e) {
  r !== void 0 && (r |= 0), e !== void 0 && (e |= 0);
  var n2 = t.__ownerID || new Ur(), i2 = t._origin, s2 = t._capacity, u2 = i2 + r, a2 = e === void 0 ? s2 : e < 0 ? s2 + e : i2 + e;
  if (u2 === i2 && a2 === s2)
    return t;
  if (u2 >= a2)
    return t.clear();
  for (var f = t._level, h = t._root, c = 0; u2 + c < 0; )
    h = new vt(h && h.array.length ? [void 0, h] : [], n2), f += b, c += 1 << f;
  c && (u2 += c, i2 += c, a2 += c, s2 += c);
  for (var p = Zt(s2), _ = Zt(a2); _ >= 1 << f + b; )
    h = new vt(h && h.array.length ? [h] : [], n2), f += b;
  var v = t._tail, l2 = _ < p ? zn(t, a2 - 1) : _ > p ? new vt([], n2) : v;
  if (v && _ > p && u2 < s2 && v.array.length) {
    h = At(h, n2);
    for (var d2 = h, S = f; S > b; S -= b) {
      var y = p >>> S & U;
      d2 = d2.array[y] = At(d2.array[y], n2);
    }
    d2.array[p >>> b & U] = v;
  }
  if (a2 < s2 && (l2 = l2 && l2.removeAfter(n2, 0, a2)), u2 >= _)
    u2 -= _, a2 -= _, f = b, h = null, l2 = l2 && l2.removeBefore(n2, 0, u2);
  else if (u2 > i2 || _ < p) {
    for (c = 0; h; ) {
      var w = u2 >>> f & U;
      if (w !== _ >>> f & U)
        break;
      w && (c += (1 << f) * w), f -= b, h = h.array[w];
    }
    h && u2 > i2 && (h = h.removeBefore(n2, f, u2 - c)), h && _ < p && (h = h.removeAfter(n2, f, _ - c)), c && (u2 -= c, a2 -= c);
  }
  return t.__ownerID ? (t.size = a2 - u2, t._origin = u2, t._capacity = a2, t._level = f, t._root = h, t._tail = l2, t.__hash = void 0, t.__altered = true, t) : Xt(u2, a2, f, h, l2);
}
o(_t, "setListBounds");
function Zt(t) {
  return t < H ? 0 : t - 1 >>> b << b;
}
o(Zt, "getTailOffset");
var pt = function(t) {
  function r(e) {
    return e == null ? Ft() : tn(e) ? e : Ft().withMutations(function(n2) {
      var i2 = G(e);
      Z(i2.size), i2.forEach(function(s2, u2) {
        return n2.set(u2, s2);
      });
    });
  }
  return o(r, "OrderedMap"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return this(arguments);
  }, "of"), r.prototype.toString = o(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    var s2 = this._map.get(n2);
    return s2 !== void 0 ? this._list.get(s2)[1] : i2;
  }, "get"), r.prototype.clear = o(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : Ft();
  }, "clear"), r.prototype.set = o(function(n2, i2) {
    return Te(this, n2, i2);
  }, "set"), r.prototype.remove = o(function(n2) {
    return Te(this, n2, g2);
  }, "remove"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    return this._list.__iterate(function(u2) {
      return u2 && n2(u2[1], u2[0], s2);
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    return this._list.fromEntrySeq().__iterator(n2, i2);
  }, "__iterator"), r.prototype.__ensureOwner = o(function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2), s2 = this._list.__ensureOwner(n2);
    return n2 ? ue(i2, s2, n2, this.__hash) : this.size === 0 ? Ft() : (this.__ownerID = n2, this.__altered = false, this._map = i2, this._list = s2, this);
  }, "__ensureOwner"), r;
}(Ut);
pt.isOrderedMap = tn;
pt.prototype[Dt] = true;
pt.prototype[Gt] = pt.prototype.remove;
function ue(t, r, e, n2) {
  var i2 = Object.create(pt.prototype);
  return i2.size = t ? t.size : 0, i2._map = t, i2._list = r, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
o(ue, "makeOrderedMap");
var je;
function Ft() {
  return je || (je = ue(x(), cr()));
}
o(Ft, "emptyOrderedMap");
function Te(t, r, e) {
  var n2 = t._map, i2 = t._list, s2 = n2.get(r), u2 = s2 !== void 0, a2, f;
  if (e === g2) {
    if (!u2)
      return t;
    i2.size >= H && i2.size >= n2.size * 2 ? (f = i2.filter(function(h, c) {
      return h !== void 0 && s2 !== c;
    }), a2 = f.toKeyedSeq().map(function(h) {
      return h[0];
    }).flip().toMap(), t.__ownerID && (a2.__ownerID = f.__ownerID = t.__ownerID)) : (a2 = n2.remove(r), f = s2 === i2.size - 1 ? i2.pop() : i2.set(s2, void 0));
  } else if (u2) {
    if (e === i2.get(s2)[1])
      return t;
    a2 = n2, f = i2.set(s2, [r, e]);
  } else
    a2 = n2.set(r, i2.size), f = i2.set(i2.size, [r, e]);
  return t.__ownerID ? (t.size = a2.size, t._map = a2, t._list = f, t.__hash = void 0, t.__altered = true, t) : ue(a2, f);
}
o(Te, "updateOrderedMap");
var Mn = "@@__IMMUTABLE_STACK__@@";
function Cr(t) {
  return Boolean(t && t[Mn]);
}
o(Cr, "isStack");
var ae = function(t) {
  function r(e) {
    return e == null ? ar() : Cr(e) ? e : ar().pushAll(e);
  }
  return o(r, "Stack"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return this(arguments);
  }, "of"), r.prototype.toString = o(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    var s2 = this._head;
    for (n2 = lt(this, n2); s2 && n2--; )
      s2 = s2.next;
    return s2 ? s2.value : i2;
  }, "get"), r.prototype.peek = o(function() {
    return this._head && this._head.value;
  }, "peek"), r.prototype.push = o(function() {
    var n2 = arguments;
    if (arguments.length === 0)
      return this;
    for (var i2 = this.size + arguments.length, s2 = this._head, u2 = arguments.length - 1; u2 >= 0; u2--)
      s2 = { value: n2[u2], next: s2 };
    return this.__ownerID ? (this.size = i2, this._head = s2, this.__hash = void 0, this.__altered = true, this) : kt(i2, s2);
  }, "push"), r.prototype.pushAll = o(function(n2) {
    if (n2 = t(n2), n2.size === 0)
      return this;
    if (this.size === 0 && Cr(n2))
      return n2;
    Z(n2.size);
    var i2 = this.size, s2 = this._head;
    return n2.__iterate(function(u2) {
      i2++, s2 = { value: u2, next: s2 };
    }, true), this.__ownerID ? (this.size = i2, this._head = s2, this.__hash = void 0, this.__altered = true, this) : kt(i2, s2);
  }, "pushAll"), r.prototype.pop = o(function() {
    return this.slice(1);
  }, "pop"), r.prototype.clear = o(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : ar();
  }, "clear"), r.prototype.slice = o(function(n2, i2) {
    if (Vt(n2, i2, this.size))
      return this;
    var s2 = jt(n2, this.size), u2 = xt(i2, this.size);
    if (u2 !== this.size)
      return t.prototype.slice.call(this, n2, i2);
    for (var a2 = this.size - s2, f = this._head; s2--; )
      f = f.next;
    return this.__ownerID ? (this.size = a2, this._head = f, this.__hash = void 0, this.__altered = true, this) : kt(a2, f);
  }, "slice"), r.prototype.__ensureOwner = o(function(n2) {
    return n2 === this.__ownerID ? this : n2 ? kt(this.size, this._head, n2, this.__hash) : this.size === 0 ? ar() : (this.__ownerID = n2, this.__altered = false, this);
  }, "__ensureOwner"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    if (i2)
      return new mt(this.toArray()).__iterate(function(f, h) {
        return n2(f, h, s2);
      }, i2);
    for (var u2 = 0, a2 = this._head; a2 && n2(a2.value, u2++, this) !== false; )
      a2 = a2.next;
    return u2;
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    if (i2)
      return new mt(this.toArray()).__iterator(n2, i2);
    var s2 = 0, u2 = this._head;
    return new m2(function() {
      if (u2) {
        var a2 = u2.value;
        return u2 = u2.next, E(n2, s2++, a2);
      }
      return P();
    });
  }, "__iterator"), r;
}(St);
ae.isStack = Cr;
var B = ae.prototype;
B[Mn] = true;
B.shift = B.pop;
B.unshift = B.push;
B.unshiftAll = B.pushAll;
B.withMutations = rr;
B.wasAltered = ne;
B.asImmutable = nr;
B["@@transducer/init"] = B.asMutable = er;
B["@@transducer/step"] = function(t, r) {
  return t.unshift(r);
};
B["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
function kt(t, r, e, n2) {
  var i2 = Object.create(B);
  return i2.size = t, i2._head = r, i2.__ownerID = e, i2.__hash = n2, i2.__altered = false, i2;
}
o(kt, "makeStack");
var $e;
function ar() {
  return $e || ($e = kt(0));
}
o(ar, "emptyStack");
var An = "@@__IMMUTABLE_SET__@@";
function fe(t) {
  return Boolean(t && t[An]);
}
o(fe, "isSet");
function qn(t) {
  return fe(t) && tt(t);
}
o(qn, "isOrderedSet");
function he(t, r) {
  if (t === r)
    return true;
  if (!k2(r) || t.size !== void 0 && r.size !== void 0 && t.size !== r.size || t.__hash !== void 0 && r.__hash !== void 0 && t.__hash !== r.__hash || M(t) !== M(r) || F(t) !== F(r) || tt(t) !== tt(r))
    return false;
  if (t.size === 0 && r.size === 0)
    return true;
  var e = !vr(t);
  if (tt(t)) {
    var n2 = t.entries();
    return r.every(function(f, h) {
      var c = n2.next().value;
      return c && N(c[1], f) && (e || N(c[0], h));
    }) && n2.next().done;
  }
  var i2 = false;
  if (t.size === void 0)
    if (r.size === void 0)
      typeof t.cacheResult == "function" && t.cacheResult();
    else {
      i2 = true;
      var s2 = t;
      t = r, r = s2;
    }
  var u2 = true, a2 = r.__iterate(function(f, h) {
    if (e ? !t.has(f) : i2 ? !N(f, t.get(h, g2)) : !N(t.get(h, g2), f))
      return u2 = false, false;
  });
  return u2 && t.size === a2;
}
o(he, "deepEqual");
function wt(t, r) {
  var e = o(function(n2) {
    t.prototype[n2] = r[n2];
  }, "keyCopier");
  return Object.keys(r).forEach(e), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(r).forEach(e), t;
}
o(wt, "mixin");
function _r(t) {
  if (!t || typeof t != "object")
    return t;
  if (!k2(t)) {
    if (!dt(t))
      return t;
    t = J(t);
  }
  if (M(t)) {
    var r = {};
    return t.__iterate(function(n2, i2) {
      r[i2] = _r(n2);
    }), r;
  }
  var e = [];
  return t.__iterate(function(n2) {
    e.push(_r(n2));
  }), e;
}
o(_r, "toJS");
var Sr = function(t) {
  function r(e) {
    return e == null ? Wt() : fe(e) && !tt(e) ? e : Wt().withMutations(function(n2) {
      var i2 = t(e);
      Z(i2.size), i2.forEach(function(s2) {
        return n2.add(s2);
      });
    });
  }
  return o(r, "Set"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return this(arguments);
  }, "of"), r.fromKeys = o(function(n2) {
    return this(G(n2).keySeq());
  }, "fromKeys"), r.intersect = o(function(n2) {
    return n2 = q2(n2).toArray(), n2.length ? C.intersect.apply(r(n2.pop()), n2) : Wt();
  }, "intersect"), r.union = o(function(n2) {
    return n2 = q2(n2).toArray(), n2.length ? C.union.apply(r(n2.pop()), n2) : Wt();
  }, "union"), r.prototype.toString = o(function() {
    return this.__toString("Set {", "}");
  }, "toString"), r.prototype.has = o(function(n2) {
    return this._map.has(n2);
  }, "has"), r.prototype.add = o(function(n2) {
    return fr(this, this._map.set(n2, n2));
  }, "add"), r.prototype.remove = o(function(n2) {
    return fr(this, this._map.remove(n2));
  }, "remove"), r.prototype.clear = o(function() {
    return fr(this, this._map.clear());
  }, "clear"), r.prototype.map = o(function(n2, i2) {
    var s2 = this, u2 = false, a2 = fr(this, this._map.mapEntries(function(f) {
      var h = f[1], c = n2.call(i2, h, h, s2);
      return c !== h && (u2 = true), [c, c];
    }, i2));
    return u2 ? a2 : this;
  }, "map"), r.prototype.union = o(function() {
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
  }, "union"), r.prototype.intersect = o(function() {
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
  }, "intersect"), r.prototype.subtract = o(function() {
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
  }, "subtract"), r.prototype.sort = o(function(n2) {
    return Qt(Et(this, n2));
  }, "sort"), r.prototype.sortBy = o(function(n2, i2) {
    return Qt(Et(this, i2, n2));
  }, "sortBy"), r.prototype.wasAltered = o(function() {
    return this._map.wasAltered();
  }, "wasAltered"), r.prototype.__iterate = o(function(n2, i2) {
    var s2 = this;
    return this._map.__iterate(function(u2) {
      return n2(u2, u2, s2);
    }, i2);
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    return this._map.__iterator(n2, i2);
  }, "__iterator"), r.prototype.__ensureOwner = o(function(n2) {
    if (n2 === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n2);
    return n2 ? this.__make(i2, n2) : this.size === 0 ? this.__empty() : (this.__ownerID = n2, this._map = i2, this);
  }, "__ensureOwner"), r;
}(Tt);
Sr.isSet = fe;
var C = Sr.prototype;
C[An] = true;
C[Gt] = C.remove;
C.merge = C.concat = C.union;
C.withMutations = rr;
C.asImmutable = nr;
C["@@transducer/init"] = C.asMutable = er;
C["@@transducer/step"] = function(t, r) {
  return t.add(r);
};
C["@@transducer/result"] = function(t) {
  return t.asImmutable();
};
C.__empty = Wt;
C.__make = Rn;
function fr(t, r) {
  return t.__ownerID ? (t.size = r.size, t._map = r, t) : r === t._map ? t : r.size === 0 ? t.__empty() : t.__make(r);
}
o(fr, "updateSet");
function Rn(t, r) {
  var e = Object.create(C);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r, e;
}
o(Rn, "makeSet");
var De;
function Wt() {
  return De || (De = Rn(x()));
}
o(Wt, "emptySet");
var Ti = function(t) {
  function r(e, n2, i2) {
    if (!(this instanceof r))
      return new r(e, n2, i2);
    if (Xr(i2 !== 0, "Cannot step a Range by 0"), e = e || 0, n2 === void 0 && (n2 = 1 / 0), i2 = i2 === void 0 ? 1 : Math.abs(i2), n2 < e && (i2 = -i2), this._start = e, this._end = n2, this._step = i2, this.size = Math.max(0, Math.ceil((n2 - e) / i2 - 1) + 1), this.size === 0) {
      if (Mr)
        return Mr;
      Mr = this;
    }
  }
  return o(r, "Range"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.toString = o(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    return this.has(n2) ? this._start + lt(this, n2) * this._step : i2;
  }, "get"), r.prototype.includes = o(function(n2) {
    var i2 = (n2 - this._start) / this._step;
    return i2 >= 0 && i2 < this.size && i2 === Math.floor(i2);
  }, "includes"), r.prototype.slice = o(function(n2, i2) {
    return Vt(n2, i2, this.size) ? this : (n2 = jt(n2, this.size), i2 = xt(i2, this.size), i2 <= n2 ? new r(0, 0) : new r(this.get(n2, this._end), this.get(i2, this._end), this._step));
  }, "slice"), r.prototype.indexOf = o(function(n2) {
    var i2 = n2 - this._start;
    if (i2 % this._step === 0) {
      var s2 = i2 / this._step;
      if (s2 >= 0 && s2 < this.size)
        return s2;
    }
    return -1;
  }, "indexOf"), r.prototype.lastIndexOf = o(function(n2) {
    return this.indexOf(n2);
  }, "lastIndexOf"), r.prototype.__iterate = o(function(n2, i2) {
    for (var s2 = this.size, u2 = this._step, a2 = i2 ? this._start + (s2 - 1) * u2 : this._start, f = 0; f !== s2 && n2(a2, i2 ? s2 - ++f : f++, this) !== false; )
      a2 += i2 ? -u2 : u2;
    return f;
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this.size, u2 = this._step, a2 = i2 ? this._start + (s2 - 1) * u2 : this._start, f = 0;
    return new m2(function() {
      if (f === s2)
        return P();
      var h = a2;
      return a2 += i2 ? -u2 : u2, E(n2, i2 ? s2 - ++f : f++, h);
    });
  }, "__iterator"), r.prototype.equals = o(function(n2) {
    return n2 instanceof r ? this._start === n2._start && this._end === n2._end && this._step === n2._step : he(this, n2);
  }, "equals"), r;
}(V);
var Mr;
function jn(t, r, e) {
  for (var n2 = _n(r), i2 = 0; i2 !== n2.length; )
    if (t = vn(t, n2[i2++], g2), t === g2)
      return e;
  return t;
}
o(jn, "getIn$1");
function Tn(t, r) {
  return jn(this, t, r);
}
o(Tn, "getIn");
function $i(t, r) {
  return jn(t, r, g2) !== g2;
}
o($i, "hasIn$1");
function Di(t) {
  return $i(this, t);
}
o(Di, "hasIn");
function $n() {
  Z(this.size);
  var t = {};
  return this.__iterate(function(r, e) {
    t[e] = r;
  }), t;
}
o($n, "toObject");
q2.isIterable = k2;
q2.isKeyed = M;
q2.isIndexed = F;
q2.isAssociative = vr;
q2.isOrdered = tt;
q2.Iterator = m2;
wt(q2, { toArray: o(function() {
  Z(this.size);
  var r = new Array(this.size || 0), e = M(this), n2 = 0;
  return this.__iterate(function(i2, s2) {
    r[n2++] = e ? [s2, i2] : i2;
  }), r;
}, "toArray"), toIndexedSeq: o(function() {
  return new en(this);
}, "toIndexedSeq"), toJS: o(function() {
  return _r(this);
}, "toJS$1"), toKeyedSeq: o(function() {
  return new gr(this, true);
}, "toKeyedSeq"), toMap: o(function() {
  return Ut(this.toKeyedSeq());
}, "toMap"), toObject: $n, toOrderedMap: o(function() {
  return pt(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: o(function() {
  return Qt(M(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: o(function() {
  return Sr(M(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: o(function() {
  return new nn(this);
}, "toSetSeq"), toSeq: o(function() {
  return F(this) ? this.toIndexedSeq() : M(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: o(function() {
  return ae(M(this) ? this.valueSeq() : this);
}, "toStack"), toList: o(function() {
  return mr(M(this) ? this.valueSeq() : this);
}, "toList"), toString: o(function() {
  return "[Collection]";
}, "toString"), __toString: o(function(r, e) {
  return this.size === 0 ? r + e : r + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e;
}, "__toString"), concat: o(function() {
  for (var r = [], e = arguments.length; e--; )
    r[e] = arguments[e];
  return O(this, hi(this, r));
}, "concat"), includes: o(function(r) {
  return this.some(function(e) {
    return N(e, r);
  });
}, "includes"), entries: o(function() {
  return this.__iterator(Q);
}, "entries"), every: o(function(r, e) {
  Z(this.size);
  var n2 = true;
  return this.__iterate(function(i2, s2, u2) {
    if (!r.call(e, i2, s2, u2))
      return n2 = false, false;
  }), n2;
}, "every"), filter: o(function(r, e) {
  return O(this, an(this, r, e, true));
}, "filter"), find: o(function(r, e, n2) {
  var i2 = this.findEntry(r, e);
  return i2 ? i2[1] : n2;
}, "find"), forEach: o(function(r, e) {
  return Z(this.size), this.__iterate(e ? r.bind(e) : r);
}, "forEach"), join: o(function(r) {
  Z(this.size), r = r !== void 0 ? "" + r : ",";
  var e = "", n2 = true;
  return this.__iterate(function(i2) {
    n2 ? n2 = false : e += r, e += i2 != null ? i2.toString() : "";
  }), e;
}, "join"), keys: o(function() {
  return this.__iterator(tr);
}, "keys"), map: o(function(r, e) {
  return O(this, un(this, r, e));
}, "map"), reduce: o(function(r, e, n2) {
  return Ne(this, r, e, n2, arguments.length < 2, false);
}, "reduce$1"), reduceRight: o(function(r, e, n2) {
  return Ne(this, r, e, n2, arguments.length < 2, true);
}, "reduceRight"), reverse: o(function() {
  return O(this, Jr(this, true));
}, "reverse"), slice: o(function(r, e) {
  return O(this, Yr(this, r, e, true));
}, "slice"), some: o(function(r, e) {
  return !this.every(hr(r), e);
}, "some"), sort: o(function(r) {
  return O(this, Et(this, r));
}, "sort"), values: o(function() {
  return this.__iterator(rt);
}, "values"), butLast: o(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: o(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: o(function(r, e) {
  return bt(r ? this.toSeq().filter(r, e) : this);
}, "count"), countBy: o(function(r, e) {
  return ui(this, r, e);
}, "countBy"), equals: o(function(r) {
  return he(this, r);
}, "equals"), entrySeq: o(function() {
  var r = this;
  if (r._cache)
    return new mt(r._cache);
  var e = r.toSeq().map(Ci).toIndexedSeq();
  return e.fromEntrySeq = function() {
    return r.toSeq();
  }, e;
}, "entrySeq"), filterNot: o(function(r, e) {
  return this.filter(hr(r), e);
}, "filterNot"), findEntry: o(function(r, e, n2) {
  var i2 = n2;
  return this.__iterate(function(s2, u2, a2) {
    if (r.call(e, s2, u2, a2))
      return i2 = [u2, s2], false;
  }), i2;
}, "findEntry"), findKey: o(function(r, e) {
  var n2 = this.findEntry(r, e);
  return n2 && n2[0];
}, "findKey"), findLast: o(function(r, e, n2) {
  return this.toKeyedSeq().reverse().find(r, e, n2);
}, "findLast"), findLastEntry: o(function(r, e, n2) {
  return this.toKeyedSeq().reverse().findEntry(r, e, n2);
}, "findLastEntry"), findLastKey: o(function(r, e) {
  return this.toKeyedSeq().reverse().findKey(r, e);
}, "findLastKey"), first: o(function(r) {
  return this.find(Fe, null, r);
}, "first"), flatMap: o(function(r, e) {
  return O(this, ci(this, r, e));
}, "flatMap"), flatten: o(function(r) {
  return O(this, hn(this, r, true));
}, "flatten"), fromEntrySeq: o(function() {
  return new on(this);
}, "fromEntrySeq"), get: o(function(r, e) {
  return this.find(function(n2, i2) {
    return N(i2, r);
  }, void 0, e);
}, "get"), getIn: Tn, groupBy: o(function(r, e) {
  return ai(this, r, e);
}, "groupBy"), has: o(function(r) {
  return this.get(r, g2) !== g2;
}, "has"), hasIn: Di, isSubset: o(function(r) {
  return r = typeof r.includes == "function" ? r : q2(r), this.every(function(e) {
    return r.includes(e);
  });
}, "isSubset"), isSuperset: o(function(r) {
  return r = typeof r.isSubset == "function" ? r : q2(r), r.isSubset(this);
}, "isSuperset"), keyOf: o(function(r) {
  return this.findKey(function(e) {
    return N(e, r);
  });
}, "keyOf"), keySeq: o(function() {
  return this.toSeq().map(Ni).toIndexedSeq();
}, "keySeq"), last: o(function(r) {
  return this.toSeq().reverse().first(r);
}, "last"), lastKeyOf: o(function(r) {
  return this.toKeyedSeq().reverse().keyOf(r);
}, "lastKeyOf"), max: o(function(r) {
  return sr(this, r);
}, "max"), maxBy: o(function(r, e) {
  return sr(this, e, r);
}, "maxBy"), min: o(function(r) {
  return sr(this, r ? Ce(r) : Ue);
}, "min"), minBy: o(function(r, e) {
  return sr(this, e ? Ce(e) : Ue, r);
}, "minBy"), rest: o(function() {
  return this.slice(1);
}, "rest"), skip: o(function(r) {
  return r === 0 ? this : this.slice(Math.max(0, r));
}, "skip"), skipLast: o(function(r) {
  return r === 0 ? this : this.slice(0, -Math.max(0, r));
}, "skipLast"), skipWhile: o(function(r, e) {
  return O(this, fn(this, r, e, true));
}, "skipWhile"), skipUntil: o(function(r, e) {
  return this.skipWhile(hr(r), e);
}, "skipUntil"), sortBy: o(function(r, e) {
  return O(this, Et(this, e, r));
}, "sortBy"), take: o(function(r) {
  return this.slice(0, Math.max(0, r));
}, "take"), takeLast: o(function(r) {
  return this.slice(-Math.max(0, r));
}, "takeLast"), takeWhile: o(function(r, e) {
  return O(this, fi(this, r, e));
}, "takeWhile"), takeUntil: o(function(r, e) {
  return this.takeWhile(hr(r), e);
}, "takeUntil"), update: o(function(r) {
  return r(this);
}, "update"), valueSeq: o(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: o(function() {
  return this.__hash || (this.__hash = Li(this));
}, "hashCode") });
var L = q2.prototype;
L[Ke] = true;
L[lr] = L.values;
L.toJSON = L.toArray;
L.__toStringMapper = Jt;
L.inspect = L.toSource = function() {
  return this.toString();
};
L.chain = L.flatMap;
L.contains = L.includes;
wt(G, { flip: o(function() {
  return O(this, sn(this));
}, "flip"), mapEntries: o(function(r, e) {
  var n2 = this, i2 = 0;
  return O(this, this.toSeq().map(function(s2, u2) {
    return r.call(e, [u2, s2], i2++, n2);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: o(function(r, e) {
  var n2 = this;
  return O(this, this.toSeq().flip().map(function(i2, s2) {
    return r.call(e, i2, s2, n2);
  }).flip());
}, "mapKeys") });
var ir = G.prototype;
ir[Je] = true;
ir[lr] = L.entries;
ir.toJSON = $n;
ir.__toStringMapper = function(t, r) {
  return Jt(r) + ": " + Jt(t);
};
wt(St, { toKeyedSeq: o(function() {
  return new gr(this, false);
}, "toKeyedSeq"), filter: o(function(r, e) {
  return O(this, an(this, r, e, false));
}, "filter"), findIndex: o(function(r, e) {
  var n2 = this.findEntry(r, e);
  return n2 ? n2[0] : -1;
}, "findIndex"), indexOf: o(function(r) {
  var e = this.keyOf(r);
  return e === void 0 ? -1 : e;
}, "indexOf"), lastIndexOf: o(function(r) {
  var e = this.lastKeyOf(r);
  return e === void 0 ? -1 : e;
}, "lastIndexOf"), reverse: o(function() {
  return O(this, Jr(this, false));
}, "reverse"), slice: o(function(r, e) {
  return O(this, Yr(this, r, e, false));
}, "slice"), splice: o(function(r, e) {
  var n2 = arguments.length;
  if (e = Math.max(e || 0, 0), n2 === 0 || n2 === 2 && !e)
    return this;
  r = jt(r, r < 0 ? this.count() : this.size);
  var i2 = this.slice(0, r);
  return O(this, n2 === 1 ? i2 : i2.concat(ot(arguments, 2), this.slice(r + e)));
}, "splice"), findLastIndex: o(function(r, e) {
  var n2 = this.findLastEntry(r, e);
  return n2 ? n2[0] : -1;
}, "findLastIndex"), first: o(function(r) {
  return this.get(0, r);
}, "first"), flatten: o(function(r) {
  return O(this, hn(this, r, false));
}, "flatten"), get: o(function(r, e) {
  return r = lt(this, r), r < 0 || this.size === 1 / 0 || this.size !== void 0 && r > this.size ? e : this.find(function(n2, i2) {
    return i2 === r;
  }, void 0, e);
}, "get"), has: o(function(r) {
  return r = lt(this, r), r >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || r < this.size : this.indexOf(r) !== -1);
}, "has"), interpose: o(function(r) {
  return O(this, pi(this, r));
}, "interpose"), interleave: o(function() {
  var r = [this].concat(ot(arguments)), e = ur(this.toSeq(), V.of, r), n2 = e.flatten(true);
  return e.size && (n2.size = e.size * r.length), O(this, n2);
}, "interleave"), keySeq: o(function() {
  return Ti(0, this.size);
}, "keySeq"), last: o(function(r) {
  return this.get(-1, r);
}, "last"), skipWhile: o(function(r, e) {
  return O(this, fn(this, r, e, false));
}, "skipWhile"), zip: o(function() {
  var r = [this].concat(ot(arguments));
  return O(this, ur(this, Le, r));
}, "zip"), zipAll: o(function() {
  var r = [this].concat(ot(arguments));
  return O(this, ur(this, Le, r, true));
}, "zipAll"), zipWith: o(function(r) {
  var e = ot(arguments);
  return e[0] = this, O(this, ur(this, r, e));
}, "zipWith") });
var Pt = St.prototype;
Pt[Ye] = true;
Pt[Dt] = true;
wt(Tt, { get: o(function(r, e) {
  return this.has(r) ? r : e;
}, "get"), includes: o(function(r) {
  return this.has(r);
}, "includes"), keySeq: o(function() {
  return this.valueSeq();
}, "keySeq") });
var qt = Tt.prototype;
qt.has = L.includes;
qt.contains = qt.includes;
qt.keys = qt.values;
wt(yt, ir);
wt(V, Pt);
wt(Ct, qt);
function Ne(t, r, e, n2, i2, s2) {
  return Z(t.size), t.__iterate(function(u2, a2, f) {
    i2 ? (i2 = false, e = u2) : e = r.call(n2, e, u2, a2, f);
  }, s2), e;
}
o(Ne, "reduce");
function Ni(t, r) {
  return r;
}
o(Ni, "keyMapper");
function Ci(t, r) {
  return [r, t];
}
o(Ci, "entryMapper");
function hr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
o(hr, "not");
function Ce(t) {
  return function() {
    return -t.apply(this, arguments);
  };
}
o(Ce, "neg");
function Le() {
  return ot(arguments);
}
o(Le, "defaultZipper");
function Ue(t, r) {
  return t < r ? 1 : t > r ? -1 : 0;
}
o(Ue, "defaultNegComparator");
function Li(t) {
  if (t.size === 1 / 0)
    return 0;
  var r = tt(t), e = M(t), n2 = r ? 1 : 0, i2 = t.__iterate(e ? r ? function(s2, u2) {
    n2 = 31 * n2 + Pe(K(s2), K(u2)) | 0;
  } : function(s2, u2) {
    n2 = n2 + Pe(K(s2), K(u2)) | 0;
  } : r ? function(s2) {
    n2 = 31 * n2 + K(s2) | 0;
  } : function(s2) {
    n2 = n2 + K(s2) | 0;
  });
  return Ui(i2, n2);
}
o(Li, "hashCollection");
function Ui(t, r) {
  return r = Bt(r, 3432918353), r = Bt(r << 15 | r >>> -15, 461845907), r = Bt(r << 13 | r >>> -13, 5), r = (r + 3864292196 | 0) ^ t, r = Bt(r ^ r >>> 16, 2246822507), r = Bt(r ^ r >>> 13, 3266489909), r = yr(r ^ r >>> 16), r;
}
o(Ui, "murmurHashOfSize");
function Pe(t, r) {
  return t ^ r + 2654435769 + (t << 6) + (t >> 2) | 0;
}
o(Pe, "hashMerge");
var Qt = function(t) {
  function r(e) {
    return e == null ? Lr() : qn(e) ? e : Lr().withMutations(function(n2) {
      var i2 = Tt(e);
      Z(i2.size), i2.forEach(function(s2) {
        return n2.add(s2);
      });
    });
  }
  return o(r, "OrderedSet"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.of = o(function() {
    return this(arguments);
  }, "of"), r.fromKeys = o(function(n2) {
    return this(G(n2).keySeq());
  }, "fromKeys"), r.prototype.toString = o(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), r;
}(Sr);
Qt.isOrderedSet = qn;
var Ot = Qt.prototype;
Ot[Dt] = true;
Ot.zip = Pt.zip;
Ot.zipWith = Pt.zipWith;
Ot.zipAll = Pt.zipAll;
Ot.__empty = Lr;
Ot.__make = Dn;
function Dn(t, r) {
  var e = Object.create(Ot);
  return e.size = t ? t.size : 0, e._map = t, e.__ownerID = r, e;
}
o(Dn, "makeOrderedSet");
var Be;
function Lr() {
  return Be || (Be = Dn(Ft()));
}
o(Lr, "emptyOrderedSet");
function Pi(t) {
  if ($t(t))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (st(t))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t === null || typeof t != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
o(Pi, "throwOnInvalidDefaultValues");
var R = o(function(r, e) {
  var n2;
  Pi(r);
  var i2 = o(function(a2) {
    var f = this;
    if (a2 instanceof i2)
      return a2;
    if (!(this instanceof i2))
      return new i2(a2);
    if (!n2) {
      n2 = true;
      var h = Object.keys(r), c = s2._indices = {};
      s2._name = e, s2._keys = h, s2._defaultValues = r;
      for (var p = 0; p < h.length; p++) {
        var _ = h[p];
        c[_] = p, s2[_] ? typeof console == "object" && console.warn && console.warn("Cannot define " + pe(this) + ' with property "' + _ + '" since that property name is part of the Record API.') : Bi(s2, _);
      }
    }
    return this.__ownerID = void 0, this._values = mr().withMutations(function(v) {
      v.setSize(f._keys.length), G(a2).forEach(function(l2, d2) {
        v.set(f._indices[d2], l2 === f._defaultValues[d2] ? void 0 : l2);
      });
    }), this;
  }, "Record"), s2 = i2.prototype = Object.create(I);
  return s2.constructor = i2, e && (i2.displayName = e), i2;
}, "Record");
R.prototype.toString = o(function() {
  for (var r = pe(this) + " { ", e = this._keys, n2, i2 = 0, s2 = e.length; i2 !== s2; i2++)
    n2 = e[i2], r += (i2 ? ", " : "") + n2 + ": " + Jt(this.get(n2));
  return r + " }";
}, "toString");
R.prototype.equals = o(function(r) {
  return this === r || $t(r) && Rt(this).equals(Rt(r));
}, "equals");
R.prototype.hashCode = o(function() {
  return Rt(this).hashCode();
}, "hashCode");
R.prototype.has = o(function(r) {
  return this._indices.hasOwnProperty(r);
}, "has");
R.prototype.get = o(function(r, e) {
  if (!this.has(r))
    return e;
  var n2 = this._indices[r], i2 = this._values.get(n2);
  return i2 === void 0 ? this._defaultValues[r] : i2;
}, "get");
R.prototype.set = o(function(r, e) {
  if (this.has(r)) {
    var n2 = this._values.set(this._indices[r], e === this._defaultValues[r] ? void 0 : e);
    if (n2 !== this._values && !this.__ownerID)
      return ce(this, n2);
  }
  return this;
}, "set");
R.prototype.remove = o(function(r) {
  return this.set(r);
}, "remove");
R.prototype.clear = o(function() {
  var r = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : ce(this, r);
}, "clear");
R.prototype.wasAltered = o(function() {
  return this._values.wasAltered();
}, "wasAltered");
R.prototype.toSeq = o(function() {
  return Rt(this);
}, "toSeq");
R.prototype.toJS = o(function() {
  return _r(this);
}, "toJS$1");
R.prototype.entries = o(function() {
  return this.__iterator(Q);
}, "entries");
R.prototype.__iterator = o(function(r, e) {
  return Rt(this).__iterator(r, e);
}, "__iterator");
R.prototype.__iterate = o(function(r, e) {
  return Rt(this).__iterate(r, e);
}, "__iterate");
R.prototype.__ensureOwner = o(function(r) {
  if (r === this.__ownerID)
    return this;
  var e = this._values.__ensureOwner(r);
  return r ? ce(this, e, r) : (this.__ownerID = r, this._values = e, this);
}, "__ensureOwner");
R.isRecord = $t;
R.getDescriptiveName = pe;
var I = R.prototype;
I[Xe] = true;
I[Gt] = I.remove;
I.deleteIn = I.removeIn = Qr;
I.getIn = Tn;
I.hasIn = L.hasIn;
I.merge = yn;
I.mergeWith = gn;
I.mergeIn = re;
I.mergeDeep = Sn;
I.mergeDeepWith = wn;
I.mergeDeepIn = ee;
I.setIn = Zr;
I.update = Gr;
I.updateIn = Vr;
I.withMutations = rr;
I.asMutable = er;
I.asImmutable = nr;
I[lr] = I.entries;
I.toJSON = I.toObject = L.toObject;
I.inspect = I.toSource = function() {
  return this.toString();
};
function ce(t, r, e) {
  var n2 = Object.create(Object.getPrototypeOf(t));
  return n2._values = r, n2.__ownerID = e, n2;
}
o(ce, "makeRecord");
function pe(t) {
  return t.constructor.displayName || t.constructor.name || "Record";
}
o(pe, "recordName");
function Rt(t) {
  return kr(t._keys.map(function(r) {
    return [r, t.get(r)];
  }));
}
o(Rt, "recordSeq");
function Bi(t, r) {
  try {
    Object.defineProperty(t, r, { get: function() {
      return this.get(r);
    }, set: function(e) {
      Xr(this.__ownerID, "Cannot set on an immutable record."), this.set(r, e);
    } });
  } catch {
  }
}
o(Bi, "setProp");
var Gi = function(t) {
  function r(e, n2) {
    if (!(this instanceof r))
      return new r(e, n2);
    if (this._value = e, this.size = n2 === void 0 ? 1 / 0 : Math.max(0, n2), this.size === 0) {
      if (Ar)
        return Ar;
      Ar = this;
    }
  }
  return o(r, "Repeat"), t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.toString = o(function() {
    return this.size === 0 ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]";
  }, "toString"), r.prototype.get = o(function(n2, i2) {
    return this.has(n2) ? this._value : i2;
  }, "get"), r.prototype.includes = o(function(n2) {
    return N(this._value, n2);
  }, "includes"), r.prototype.slice = o(function(n2, i2) {
    var s2 = this.size;
    return Vt(n2, i2, s2) ? this : new r(this._value, xt(i2, s2) - jt(n2, s2));
  }, "slice"), r.prototype.reverse = o(function() {
    return this;
  }, "reverse"), r.prototype.indexOf = o(function(n2) {
    return N(this._value, n2) ? 0 : -1;
  }, "indexOf"), r.prototype.lastIndexOf = o(function(n2) {
    return N(this._value, n2) ? this.size : -1;
  }, "lastIndexOf"), r.prototype.__iterate = o(function(n2, i2) {
    for (var s2 = this.size, u2 = 0; u2 !== s2 && n2(this._value, i2 ? s2 - ++u2 : u2++, this) !== false; )
      ;
    return u2;
  }, "__iterate"), r.prototype.__iterator = o(function(n2, i2) {
    var s2 = this, u2 = this.size, a2 = 0;
    return new m2(function() {
      return a2 === u2 ? P() : E(n2, i2 ? u2 - ++a2 : a2++, s2._value);
    });
  }, "__iterator"), r.prototype.equals = o(function(n2) {
    return n2 instanceof r ? N(this._value, n2._value) : he(n2);
  }, "equals"), r;
}(V);
var Ar;
var Wn = s(kn());
function Kn(t, r) {
  var e = (0, Wn.default)(t, r);
  return e.map((i2) => i2[0] === 1 ? i2 : [i2[0], i2[1].length]);
}
o(Kn, "createDelta");
function Jn(t, r) {
  for (var e = "", n2 = 0, i2 = 0; i2 < r.length; i2++) {
    var s2 = r[i2], u2 = s2[0], a2 = s2[1];
    s2[0] === -1 && typeof a2 == "number" ? n2 += a2 : u2 == 0 && typeof a2 == "number" ? e += t.slice(n2, n2 += a2) : e += a2;
  }
  return e;
}
o(Jn, "applyPatch");
function Yi(t, r) {
  return R({ ...r, room: t, state: R(r.state)() });
}
o(Yi, "initSession");
var nt = null;
var ft = {};
var Or = class {
  constructor(r, e) {
    u(this, "session");
    u(this, "cb", {});
    u(this, "hashCodeSession", 0);
    u(this, "room");
    u(this, "created", new Date().toISOString());
    u(this, "hashOfState", o(() => {
      let r2 = this.session.get("state"), e2 = r2.hashCode();
      return ft[e2] = r2, e2;
    }, "hashOfState"));
    u(this, "createPatchFromHashCode", o(async (r2, e2) => {
      let n3 = JSON.parse(It(e2));
      if (!ft[r2]) {
        let c = await fetch(`/live/${this.room}
        `), { mST: p, hashCode: _ } = await c.json();
        ft[_] = this.session.get("state").merge(p);
      }
      let i2 = ft[r2], s2 = It(i2.toJSON()), u2 = i2.merge(n3), a2 = It(u2.toJSON()), f = u2.hashCode();
      ft[f] = u2;
      let h = Qi(s2, a2);
      return { oldHash: r2, newHash: f, patch: h };
    }, "createPatchFromHashCode"));
    u(this, "patchSync", o((r2) => {
      this.session = this.session.set("state", this.session.get("state").merge(r2)), this.update();
    }, "patchSync"));
    u(this, "applyPatch", o(async ({ oldHash: r2, newHash: e2, patch: n3 }) => {
      let i2 = this.room || "";
      if (!Object.keys(ft).map((p) => Number(p)).includes(Number(r2)) && i2) {
        console.log(Object.keys(ft));
        let p = await fetch(`/live/${i2}/mST`);
        if (p.ok) {
          let _ = await p.json(), v = this.session.get("state").merge(JSON.parse(It(_.mST)));
          ft[v.hashCode()] = v;
        } else {
          let { mST: _ } = await import(location.origin + `/live/${this.room}/mst.mjs?${Date.now()}`), v = this.session.get("state").merge(JSON.parse(It(_)));
          ft[v.hashCode()] = v;
        }
      }
      let s2 = It(ft[r2].toJSON()), u2 = Jn(s2, n3), a2 = JSON.parse(u2), f = this.session.get("state").merge(a2), h = this.session.get("state").merge(f);
      if (h.hashCode() === e2)
        this.session = this.session.set("state", h);
      else {
        new Error("Wrong patch");
        return;
      }
    }, "applyPatch"));
    nt = this, this.room = r;
    let n2 = null;
    this.session = Yi(r, { ...e, state: n2 || JSON.parse(It(e.state)) })();
  }
  update() {
    Object.keys(this.cb).map((r) => this.cb[r]).map((r) => {
      try {
        r(true);
      } catch (e) {
        console.error("error calling callback", { err: e });
      }
    });
  }
  onUpdate(r, e) {
    this.cb[e] = r;
  }
  json() {
    let r = this.session.toJSON(), e = r.state.toJSON();
    return { ...r, state: e };
  }
  setRoom(r) {
    let e = this.session.set("room", r);
    this.session = e;
  }
};
o(Or, "CodeSession");
var Hi = o(() => nt ? nt.hashOfState() : 0, "hashCode");
var io = o(() => {
  if (!nt)
    return { i: 0, transpiled: "", code: "", html: "", css: "" };
  let { i: t, transpiled: r, code: e, html: n2, css: i2 } = nt.json().state;
  return { i: t, transpiled: r, code: e, html: n2, css: i2 };
}, "mST");
function Xi(t, r) {
  let { i: e, transpiled: n2, code: i2, html: s2, css: u2 } = t, a2 = { i: e, transpiled: n2, code: i2, html: s2, css: u2 };
  return a2.code = a2.code.replace("from '/live", `from '${r}/live`), a2.code = a2.code.replace("from './", `from '${r}/live/`), a2.transpiled = a2.transpiled.replace('from "/live', `from "${r}/live`), a2.transpiled = a2.transpiled.replace('from "./', `from "${r}/live/`), a2;
}
o(Xi, "addOrigin");
function It(t) {
  let { i: r, transpiled: e, code: n2, html: i2, css: s2 } = t;
  return JSON.stringify({ i: r, transpiled: e, code: n2, html: i2, css: s2 });
}
o(It, "str");
var oo = o(async (t) => {
  await nt?.applyPatch(t), nt?.update();
}, "applyPatch");
var so = o((t, r = "default") => nt?.onUpdate(t, r), "onSessionUpdate");
var Zi = o((t, r) => nt.createPatchFromHashCode(t, r), "makePatchFrom");
var uo = o((t) => Zi(Hi(), t), "makePatch");
var ao = o((t, r, e) => nt || new Or(t, { name: r.name, state: Xi(r.state, e) }), "startSession");
function Qi(t, r) {
  return Kn(t, r);
}
o(Qi, "createPatch");
var fo = o((t) => nt?.patchSync(t), "patchSync");

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
      ao(
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
            "startMonaco.mjs": a2["startMonaco.mjs"],
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
        ${io().css}
        `
          ).replace("favicon.ico", a3["favicon.ico"]).replace(
            `<div id="root"></div>`,
            `<div id="root">
                    <div id="root-${this.codeSpace}" style="height: 100%">
                      ${io().html}
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
                (m3) => session.webSocket.send(m3)
              );
              otherSession.blockedMessages = [];
            }
          });
        } catch (e) {
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
