var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// ../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
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
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
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
      let last3 = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last3.replace(/^.*\./, "").toLowerCase();
      let hasPath = last3.length < path.length;
      let hasDot = ext.length < last3.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// ../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// ../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/other.js
var require_other = __commonJS({
  "../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// ../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/index.js
var require_mime = __commonJS({
  "../../.yarn/global/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// ../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
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

// ../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "../../.yarn/global/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
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
      pathIsEncoded: false,
      defaultETag: "strong"
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
      const ASSET_MANIFEST2 = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = options.pathIsEncoded;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST2[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST2[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST2[decodeURIComponent(mappedRawPathKey)]) {
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
      if (typeof ASSET_MANIFEST2 !== "undefined") {
        if (ASSET_MANIFEST2[pathKey]) {
          pathKey = ASSET_MANIFEST2[pathKey];
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
      const formatETag = (entityId = pathKey, validatorType = options.defaultETag) => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              if (entityId.startsWith(`"`) && entityId.endsWith(`"`)) {
                return `W/${entityId}`;
              }
              return `W/"${entityId}"`;
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
          response.headers.set("Content-Length", String(body.byteLength));
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag = formatETag(response.headers.get("etag"));
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
var import_kv_asset_handler = __toESM(require_dist(), 1);

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/package.json
var package_default = {
  name: "@spike.land/code",
  version: "0.9.2",
  description: "spike.land",
  type: "module",
  entry: "./index.js",
  source: "index.js",
  main: "public/static/bundle.mjs",
  files: [
    "**/*"
  ],
  exports: {
    "./package.json": "./package.json",
    "./js/starter.ts": "./js/starter.ts",
    "./js/rtc.ts": "./js/rtc.ts",
    "./js/session": {
      import: "./dist/session.mjs",
      node: "./dist/session.js"
    },
    "./js/textDiff": "./js/textDiff.ts",
    "./js/esbuildEsm": "./js/esbuildEsm.ts",
    "./js/binary": "./js/binary.ts",
    "./js/importmap.json": "./js/importmap.json",
    "./js/mockedMap.json": "./js/mockedMap.json"
  },
  scripts: {
    test: "esbuild --bundle tests/* --platform=node --external:uvu --external:uvu/ --format=esm --outdir=testsJs && yarn uvu testsJs && rm -rf testsJs",
    typecheck: "yarn tsc",
    clean: "rm -rf .tsBuildInfo js/vendor dist js/monaco-workers && yarn favicons",
    "build:sw": "esbuild --outfile=../packages/.spike.land/public/sw.js --platform=browser --bundle --minify ./js/sw.js && yarn sw",
    start: "cd ../../.. && yarn start",
    push: "cd ../../.. && yarn push",
    "build:preact": "esbuild --bundle js/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:orbit-db": "esbuild --bundle js/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:framer-motion": 'yarn esbuild --bundle js/motion.tsx  --target=esnext --minify --format=esm  --platform=browser  --define:process.env.NODE_ENV=\\"production\\" --external:react --external:@emotion/is-prop-valid  --external:react --outfile=./dist/framer-motion.mjs',
    prebuild: "yarn test || echo FAILED",
    build: "rm -rf dist js/monaco-workers && yarn favicons && yarn es:build",
    "es:build": "yarn test && node esbuild-dev.mjs",
    favicons: "cp -af js/assets/ ./dist && mkdir -p  ./dist/assets && cp js/assets/synthwave.webp   ./dist/assets/",
    sw: "echo ok"
  },
  keywords: [
    "monaco",
    "editor",
    "react",
    "typescript",
    "html",
    "vscode"
  ],
  authors: [
    "Zoltan Erdos <zolika84@gmail.com>"
  ],
  bugs: {
    url: "https://github.com/zerdos/spike.land"
  },
  homepage: "http:///",
  repository: {
    type: "git",
    url: "git+https://github.com/zerdos/spike.land.git"
  },
  author: "Zoltan Erdos <zolika84@gmail.com>",
  license: "BSD-3-Clause",
  publishConfig: {
    access: "public"
  },
  dependencies: {
    "@ampproject/worker-dom": "^0.34.0",
    "@ava/typescript": "^3.0.1",
    "@emotion/cache": "11.10.5",
    "@emotion/react": "11.10.5",
    "@emotion/styled": "11.10.5",
    "@mui/material": "5.11.1",
    "ace-builds": "1.14.0",
    "async-mutex": "^0.4.0",
    ava: "^5.1.0",
    avl: "1.5.3",
    axios: "^1.2.1",
    comlink: "4.3.1",
    "core-js": "^3.26.1",
    csstype: "3.1.1",
    "detective-typescript": "^9.0.0",
    "es-module-shims": "1.6.2",
    "esbuild-plugin-external-global": "1.0.1",
    "esbuild-wasm": "0.16.10",
    "fast-diff": "1.2.0",
    "framer-motion": "7.10.3",
    immutable: "^4.1.0",
    "is-callable": "1.2.7",
    localforage: "^1.10.0",
    "lodash.debounce": "4.0.8",
    "lodash.throttle": "4.1.1",
    "monaco-editor": "0.34.1",
    "p-map": "5.5.0",
    p2pcf: "^1.3.11",
    prettier: "2.8.1",
    prismjs: "^1.29.0",
    qrious: "4.0.2",
    "re-resizable": "^6.9.9",
    react: "18.2.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^3.1.4",
    "react-icons": "4.7.1",
    "react-qrious": "2.5.6",
    "react-reverse-portal": "2.1.1",
    "react-rnd": "^10.4.1",
    util: "^0.12.5",
    utils: "^0.3.1",
    uuid: "^9.0.0",
    "webrtc-adapter": "^8.2.0",
    "worker-rpc": "^0.2.0"
  },
  devDependencies: {
    "@libp2p/interfaces": "3.1.0",
    "@motionone/dom": "10.15.3",
    "@types/eslint": "^8.4.10",
    "@types/hoist-non-react-statics": "^3.3.1",
    "@types/is-callable": "1.1.0",
    "@types/lodash.debounce": "4.0.7",
    "@types/lodash.throttle": "4.1.7",
    "@types/node": "^18.11.17",
    "@types/prettier": "2.7.1",
    "@types/prismjs": "^1.26.0",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.9",
    "@types/uuid": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^5.47.0",
    "@typescript-eslint/parser": "^5.47.0",
    "@yarnpkg/sdks": "3.0.0-rc.33",
    esbuild: "0.16.10",
    "esbuild-plugin-alias": "0.2.1",
    eslint: "^8.30.0",
    "eslint-plugin-react": "^7.31.11",
    "fast-glob": "3.2.12",
    popmotion: "11.0.5",
    tslib: "^2.4.1",
    typescript: "^4.9.4",
    uvu: "0.5.6"
  },
  peerDependencies: {
    "@motionone/dom": "*",
    "fast-glob": "*",
    popmotion: "*"
  },
  directories: {
    test: "tests"
  }
};

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/chunk-chunk-A3E5PINE.mjs
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = { env: { NODE_ENV: "development", browser: true, NODE_DEBUG: false, DEBUG: false, isBrowser: true }, browser: true };
  }
});

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/chunk-chunk-MYHHNLEY.mjs
var require_lodash = __commonJS2({
  "../../.yarn/global/cache/lodash.debounce-npm-4.0.8-f1d6e09799-9.zip/node_modules/lodash.debounce/index.js"(exports, module) {
    init_define_process();
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = /* @__PURE__ */ __name(function() {
      return root.Date.now();
    }, "now");
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      __name(invokeFunc, "invokeFunc");
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      __name(leadingEdge, "leadingEdge");
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      __name(remainingWait, "remainingWait");
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      __name(shouldInvoke, "shouldInvoke");
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      __name(timerExpired, "timerExpired");
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      __name(trailingEdge, "trailingEdge");
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      __name(cancel, "cancel");
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      __name(flush, "flush");
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      __name(debounced, "debounced");
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    __name(debounce2, "debounce");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = debounce2;
  }
});
var require_diff = __commonJS2({
  "../../.yarn/global/cache/fast-diff-npm-1.2.0-5ba4171bb6-9.zip/node_modules/fast-diff/diff.js"(exports, module) {
    init_define_process();
    var DIFF_DELETE = -1;
    var DIFF_INSERT = 1;
    var DIFF_EQUAL = 0;
    function diff_main(text1, text2, cursor_pos, _fix_unicode) {
      if (text1 === text2) {
        if (text1) {
          return [[DIFF_EQUAL, text1]];
        }
        return [];
      }
      if (cursor_pos != null) {
        var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
        if (editdiff) {
          return editdiff;
        }
      }
      var commonlength = diff_commonPrefix(text1, text2);
      var commonprefix = text1.substring(0, commonlength);
      text1 = text1.substring(commonlength);
      text2 = text2.substring(commonlength);
      commonlength = diff_commonSuffix(text1, text2);
      var commonsuffix = text1.substring(text1.length - commonlength);
      text1 = text1.substring(0, text1.length - commonlength);
      text2 = text2.substring(0, text2.length - commonlength);
      var diffs = diff_compute_(text1, text2);
      if (commonprefix) {
        diffs.unshift([DIFF_EQUAL, commonprefix]);
      }
      if (commonsuffix) {
        diffs.push([DIFF_EQUAL, commonsuffix]);
      }
      diff_cleanupMerge(diffs, _fix_unicode);
      return diffs;
    }
    __name(diff_main, "diff_main");
    function diff_compute_(text1, text2) {
      var diffs;
      if (!text1) {
        return [[DIFF_INSERT, text2]];
      }
      if (!text2) {
        return [[DIFF_DELETE, text1]];
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      var i = longtext.indexOf(shorttext);
      if (i !== -1) {
        diffs = [
          [DIFF_INSERT, longtext.substring(0, i)],
          [DIFF_EQUAL, shorttext],
          [DIFF_INSERT, longtext.substring(i + shorttext.length)]
        ];
        if (text1.length > text2.length) {
          diffs[0][0] = diffs[2][0] = DIFF_DELETE;
        }
        return diffs;
      }
      if (shorttext.length === 1) {
        return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
      }
      var hm = diff_halfMatch_(text1, text2);
      if (hm) {
        var text1_a = hm[0];
        var text1_b = hm[1];
        var text2_a = hm[2];
        var text2_b = hm[3];
        var mid_common = hm[4];
        var diffs_a = diff_main(text1_a, text2_a);
        var diffs_b = diff_main(text1_b, text2_b);
        return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
      }
      return diff_bisect_(text1, text2);
    }
    __name(diff_compute_, "diff_compute_");
    function diff_bisect_(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      var max_d = Math.ceil((text1_length + text2_length) / 2);
      var v_offset = max_d;
      var v_length = 2 * max_d;
      var v1 = new Array(v_length);
      var v2 = new Array(v_length);
      for (var x = 0; x < v_length; x++) {
        v1[x] = -1;
        v2[x] = -1;
      }
      v1[v_offset + 1] = 0;
      v2[v_offset + 1] = 0;
      var delta = text1_length - text2_length;
      var front = delta % 2 !== 0;
      var k1start = 0;
      var k1end = 0;
      var k2start = 0;
      var k2end = 0;
      for (var d = 0; d < max_d; d++) {
        for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
          var k1_offset = v_offset + k1;
          var x1;
          if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
            x1 = v1[k1_offset + 1];
          } else {
            x1 = v1[k1_offset - 1] + 1;
          }
          var y1 = x1 - k1;
          while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
            x1++;
            y1++;
          }
          v1[k1_offset] = x1;
          if (x1 > text1_length) {
            k1end += 2;
          } else if (y1 > text2_length) {
            k1start += 2;
          } else if (front) {
            var k2_offset = v_offset + delta - k1;
            if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
              var x2 = text1_length - v2[k2_offset];
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
        for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
          var k2_offset = v_offset + k2;
          var x2;
          if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
            x2 = v2[k2_offset + 1];
          } else {
            x2 = v2[k2_offset - 1] + 1;
          }
          var y2 = x2 - k2;
          while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
            x2++;
            y2++;
          }
          v2[k2_offset] = x2;
          if (x2 > text1_length) {
            k2end += 2;
          } else if (y2 > text2_length) {
            k2start += 2;
          } else if (!front) {
            var k1_offset = v_offset + delta - k2;
            if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
              var x1 = v1[k1_offset];
              var y1 = v_offset + x1 - k1_offset;
              x2 = text1_length - x2;
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
      }
      return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
    }
    __name(diff_bisect_, "diff_bisect_");
    function diff_bisectSplit_(text1, text2, x, y) {
      var text1a = text1.substring(0, x);
      var text2a = text2.substring(0, y);
      var text1b = text1.substring(x);
      var text2b = text2.substring(y);
      var diffs = diff_main(text1a, text2a);
      var diffsb = diff_main(text1b, text2b);
      return diffs.concat(diffsb);
    }
    __name(diff_bisectSplit_, "diff_bisectSplit_");
    function diff_commonPrefix(text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerstart = 0;
      while (pointermin < pointermid) {
        if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
          pointermin = pointermid;
          pointerstart = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
        pointermid--;
      }
      return pointermid;
    }
    __name(diff_commonPrefix, "diff_commonPrefix");
    function diff_commonSuffix(text1, text2) {
      if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerend = 0;
      while (pointermin < pointermid) {
        if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
          pointermin = pointermid;
          pointerend = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
        pointermid--;
      }
      return pointermid;
    }
    __name(diff_commonSuffix, "diff_commonSuffix");
    function diff_halfMatch_(text1, text2) {
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
      }
      function diff_halfMatchI_(longtext2, shorttext2, i) {
        var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
        var j = -1;
        var best_common = "";
        var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
          var prefixLength = diff_commonPrefix(
            longtext2.substring(i),
            shorttext2.substring(j)
          );
          var suffixLength = diff_commonSuffix(
            longtext2.substring(0, i),
            shorttext2.substring(0, j)
          );
          if (best_common.length < suffixLength + prefixLength) {
            best_common = shorttext2.substring(
              j - suffixLength,
              j
            ) + shorttext2.substring(j, j + prefixLength);
            best_longtext_a = longtext2.substring(0, i - suffixLength);
            best_longtext_b = longtext2.substring(i + prefixLength);
            best_shorttext_a = shorttext2.substring(0, j - suffixLength);
            best_shorttext_b = shorttext2.substring(j + prefixLength);
          }
        }
        if (best_common.length * 2 >= longtext2.length) {
          return [
            best_longtext_a,
            best_longtext_b,
            best_shorttext_a,
            best_shorttext_b,
            best_common
          ];
        } else {
          return null;
        }
      }
      __name(diff_halfMatchI_, "diff_halfMatchI_");
      var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
      var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
      var hm;
      if (!hm1 && !hm2) {
        return null;
      } else if (!hm2) {
        hm = hm1;
      } else if (!hm1) {
        hm = hm2;
      } else {
        hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
      }
      var text1_a, text1_b, text2_a, text2_b;
      if (text1.length > text2.length) {
        text1_a = hm[0];
        text1_b = hm[1];
        text2_a = hm[2];
        text2_b = hm[3];
      } else {
        text2_a = hm[0];
        text2_b = hm[1];
        text1_a = hm[2];
        text1_b = hm[3];
      }
      var mid_common = hm[4];
      return [text1_a, text1_b, text2_a, text2_b, mid_common];
    }
    __name(diff_halfMatch_, "diff_halfMatch_");
    function diff_cleanupMerge(diffs, fix_unicode) {
      diffs.push([DIFF_EQUAL, ""]);
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          diffs.splice(pointer, 1);
          continue;
        }
        switch (diffs[pointer][0]) {
          case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_EQUAL:
            var previous_equality = pointer - count_insert - count_delete - 1;
            if (fix_unicode) {
              if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
                var stray = diffs[previous_equality][1].slice(-1);
                diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
                text_delete = stray + text_delete;
                text_insert = stray + text_insert;
                if (!diffs[previous_equality][1]) {
                  diffs.splice(previous_equality, 1);
                  pointer--;
                  var k = previous_equality - 1;
                  if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                    count_insert++;
                    text_insert = diffs[k][1] + text_insert;
                    k--;
                  }
                  if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                    count_delete++;
                    text_delete = diffs[k][1] + text_delete;
                    k--;
                  }
                  previous_equality = k;
                }
              }
              if (starts_with_pair_end(diffs[pointer][1])) {
                var stray = diffs[pointer][1].charAt(0);
                diffs[pointer][1] = diffs[pointer][1].slice(1);
                text_delete += stray;
                text_insert += stray;
              }
            }
            if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
              diffs.splice(pointer, 1);
              break;
            }
            if (text_delete.length > 0 || text_insert.length > 0) {
              if (text_delete.length > 0 && text_insert.length > 0) {
                commonlength = diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (previous_equality >= 0) {
                    diffs[previous_equality][1] += text_insert.substring(0, commonlength);
                  } else {
                    diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                  text_insert = text_insert.substring(0, text_insert.length - commonlength);
                  text_delete = text_delete.substring(0, text_delete.length - commonlength);
                }
              }
              var n = count_insert + count_delete;
              if (text_delete.length === 0 && text_insert.length === 0) {
                diffs.splice(pointer - n, n);
                pointer = pointer - n;
              } else if (text_delete.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
                pointer = pointer - n + 1;
              } else if (text_insert.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
                pointer = pointer - n + 1;
              } else {
                diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
                pointer = pointer - n + 2;
              }
            }
            if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
              diffs[pointer - 1][1] += diffs[pointer][1];
              diffs.splice(pointer, 1);
            } else {
              pointer++;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
      }
      if (diffs[diffs.length - 1][1] === "") {
        diffs.pop();
      }
      var changes = false;
      pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
          if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
            diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
            diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
            diffs.splice(pointer - 1, 1);
            changes = true;
          } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
            diffs[pointer - 1][1] += diffs[pointer + 1][1];
            diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
            diffs.splice(pointer + 1, 1);
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs, fix_unicode);
      }
    }
    __name(diff_cleanupMerge, "diff_cleanupMerge");
    function is_surrogate_pair_start(charCode) {
      return charCode >= 55296 && charCode <= 56319;
    }
    __name(is_surrogate_pair_start, "is_surrogate_pair_start");
    function is_surrogate_pair_end(charCode) {
      return charCode >= 56320 && charCode <= 57343;
    }
    __name(is_surrogate_pair_end, "is_surrogate_pair_end");
    function starts_with_pair_end(str) {
      return is_surrogate_pair_end(str.charCodeAt(0));
    }
    __name(starts_with_pair_end, "starts_with_pair_end");
    function ends_with_pair_start(str) {
      return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
    }
    __name(ends_with_pair_start, "ends_with_pair_start");
    function remove_empty_tuples(tuples) {
      var ret = [];
      for (var i = 0; i < tuples.length; i++) {
        if (tuples[i][1].length > 0) {
          ret.push(tuples[i]);
        }
      }
      return ret;
    }
    __name(remove_empty_tuples, "remove_empty_tuples");
    function make_edit_splice(before, oldMiddle, newMiddle, after) {
      if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
        return null;
      }
      return remove_empty_tuples([
        [DIFF_EQUAL, before],
        [DIFF_DELETE, oldMiddle],
        [DIFF_INSERT, newMiddle],
        [DIFF_EQUAL, after]
      ]);
    }
    __name(make_edit_splice, "make_edit_splice");
    function find_cursor_edit_diff(oldText, newText, cursor_pos) {
      var oldRange = typeof cursor_pos === "number" ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
      var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
      var oldLength = oldText.length;
      var newLength = newText.length;
      if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
        var oldCursor = oldRange.index;
        var oldBefore = oldText.slice(0, oldCursor);
        var oldAfter = oldText.slice(oldCursor);
        var maybeNewCursor = newRange ? newRange.index : null;
        editBefore: {
          var newCursor = oldCursor + newLength - oldLength;
          if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
            break editBefore;
          }
          if (newCursor < 0 || newCursor > newLength) {
            break editBefore;
          }
          var newBefore = newText.slice(0, newCursor);
          var newAfter = newText.slice(newCursor);
          if (newAfter !== oldAfter) {
            break editBefore;
          }
          var prefixLength = Math.min(oldCursor, newCursor);
          var oldPrefix = oldBefore.slice(0, prefixLength);
          var newPrefix = newBefore.slice(0, prefixLength);
          if (oldPrefix !== newPrefix) {
            break editBefore;
          }
          var oldMiddle = oldBefore.slice(prefixLength);
          var newMiddle = newBefore.slice(prefixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
        }
        editAfter: {
          if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
            break editAfter;
          }
          var cursor = oldCursor;
          var newBefore = newText.slice(0, cursor);
          var newAfter = newText.slice(cursor);
          if (newBefore !== oldBefore) {
            break editAfter;
          }
          var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
          var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
          var newSuffix = newAfter.slice(newAfter.length - suffixLength);
          if (oldSuffix !== newSuffix) {
            break editAfter;
          }
          var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
          var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
          return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
        }
      }
      if (oldRange.length > 0 && newRange && newRange.length === 0) {
        replaceRange: {
          var oldPrefix = oldText.slice(0, oldRange.index);
          var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
          var prefixLength = oldPrefix.length;
          var suffixLength = oldSuffix.length;
          if (newLength < prefixLength + suffixLength) {
            break replaceRange;
          }
          var newPrefix = newText.slice(0, prefixLength);
          var newSuffix = newText.slice(newLength - suffixLength);
          if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
            break replaceRange;
          }
          var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
          var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
        }
      }
      return null;
    }
    __name(find_cursor_edit_diff, "find_cursor_edit_diff");
    function diff2(text1, text2, cursor_pos) {
      return diff_main(text1, text2, cursor_pos, true);
    }
    __name(diff2, "diff");
    diff2.INSERT = DIFF_INSERT;
    diff2.DELETE = DIFF_DELETE;
    diff2.EQUAL = DIFF_EQUAL;
    module.exports = diff2;
  }
});
init_define_process();
init_define_process();
var DELETE = "delete";
var SHIFT = 5;
var SIZE = 1 << SHIFT;
var MASK = SIZE - 1;
var NOT_SET = {};
function MakeRef() {
  return { value: false };
}
__name(MakeRef, "MakeRef");
function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}
__name(SetRef, "SetRef");
function OwnerID() {
}
__name(OwnerID, "OwnerID");
function ensureSize(iter) {
  if (iter.size === void 0) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}
__name(ensureSize, "ensureSize");
function wrapIndex(iter, index) {
  if (typeof index !== "number") {
    var uint32Index = index >>> 0;
    if ("" + uint32Index !== index || uint32Index === 4294967295) {
      return NaN;
    }
    index = uint32Index;
  }
  return index < 0 ? ensureSize(iter) + index : index;
}
__name(wrapIndex, "wrapIndex");
function returnTrue() {
  return true;
}
__name(returnTrue, "returnTrue");
function wholeSlice(begin, end, size) {
  return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
}
__name(wholeSlice, "wholeSlice");
function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}
__name(resolveBegin, "resolveBegin");
function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}
__name(resolveEnd, "resolveEnd");
function resolveIndex(index, size, defaultIndex) {
  return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
}
__name(resolveIndex, "resolveIndex");
function isNeg(value) {
  return value < 0 || value === 0 && 1 / value === -Infinity;
}
__name(isNeg, "isNeg");
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
__name(isCollection, "isCollection");
var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
__name(isKeyed, "isKeyed");
var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
__name(isIndexed, "isIndexed");
function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
__name(isAssociative, "isAssociative");
var Collection = /* @__PURE__ */ __name(function Collection2(value) {
  return isCollection(value) ? value : Seq(value);
}, "Collection");
var KeyedCollection = /* @__PURE__ */ function(Collection3) {
  function KeyedCollection2(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }
  __name(KeyedCollection2, "KeyedCollection");
  if (Collection3)
    KeyedCollection2.__proto__ = Collection3;
  KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  KeyedCollection2.prototype.constructor = KeyedCollection2;
  return KeyedCollection2;
}(Collection);
var IndexedCollection = /* @__PURE__ */ function(Collection3) {
  function IndexedCollection2(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }
  __name(IndexedCollection2, "IndexedCollection");
  if (Collection3)
    IndexedCollection2.__proto__ = Collection3;
  IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  IndexedCollection2.prototype.constructor = IndexedCollection2;
  return IndexedCollection2;
}(Collection);
var SetCollection = /* @__PURE__ */ function(Collection3) {
  function SetCollection2(value) {
    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
  }
  __name(SetCollection2, "SetCollection");
  if (Collection3)
    SetCollection2.__proto__ = Collection3;
  SetCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  SetCollection2.prototype.constructor = SetCollection2;
  return SetCollection2;
}(Collection);
Collection.Keyed = KeyedCollection;
Collection.Indexed = IndexedCollection;
Collection.Set = SetCollection;
var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}
__name(isSeq, "isSeq");
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
__name(isRecord, "isRecord");
function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
__name(isImmutable, "isImmutable");
var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
__name(isOrdered, "isOrdered");
var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;
var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
var Iterator = /* @__PURE__ */ __name(function Iterator2(next) {
  this.next = next;
}, "Iterator");
Iterator.prototype.toString = /* @__PURE__ */ __name(function toString() {
  return "[Iterator]";
}, "toString");
Iterator.KEYS = ITERATE_KEYS;
Iterator.VALUES = ITERATE_VALUES;
Iterator.ENTRIES = ITERATE_ENTRIES;
Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
  return this.toString();
};
Iterator.prototype[ITERATOR_SYMBOL] = function() {
  return this;
};
function iteratorValue(type, k, v, iteratorResult) {
  var value = type === 0 ? k : type === 1 ? v : [k, v];
  iteratorResult ? iteratorResult.value = value : iteratorResult = {
    value,
    done: false
  };
  return iteratorResult;
}
__name(iteratorValue, "iteratorValue");
function iteratorDone() {
  return { value: void 0, done: true };
}
__name(iteratorDone, "iteratorDone");
function hasIterator(maybeIterable) {
  if (Array.isArray(maybeIterable)) {
    return true;
  }
  return !!getIteratorFn(maybeIterable);
}
__name(hasIterator, "hasIterator");
function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === "function";
}
__name(isIterator, "isIterator");
function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}
__name(getIterator, "getIterator");
function getIteratorFn(iterable) {
  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === "function") {
    return iteratorFn;
  }
}
__name(getIteratorFn, "getIteratorFn");
function isEntriesIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.entries;
}
__name(isEntriesIterable, "isEntriesIterable");
function isKeysIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.keys;
}
__name(isKeysIterable, "isKeysIterable");
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === "string") {
    return true;
  }
  return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? Object.keys(value).length === 1 : value.hasOwnProperty(value.length - 1));
}
__name(isArrayLike, "isArrayLike");
var Seq = /* @__PURE__ */ function(Collection3) {
  function Seq2(value) {
    return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
  }
  __name(Seq2, "Seq");
  if (Collection3)
    Seq2.__proto__ = Collection3;
  Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
  Seq2.prototype.constructor = Seq2;
  Seq2.prototype.toSeq = /* @__PURE__ */ __name(function toSeq3() {
    return this;
  }, "toSeq");
  Seq2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Seq {", "}");
  }, "toString");
  Seq2.prototype.cacheResult = /* @__PURE__ */ __name(function cacheResult() {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  }, "cacheResult");
  Seq2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      while (i !== size) {
        var entry = cache[reverse3 ? size - ++i : i++];
        if (fn(entry[1], entry[0], this) === false) {
          break;
        }
      }
      return i;
    }
    return this.__iterateUncached(fn, reverse3);
  }, "__iterate");
  Seq2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      return new Iterator(function() {
        if (i === size) {
          return iteratorDone();
        }
        var entry = cache[reverse3 ? size - ++i : i++];
        return iteratorValue(type, entry[0], entry[1]);
      });
    }
    return this.__iteratorUncached(type, reverse3);
  }, "__iterator");
  return Seq2;
}(Collection);
var KeyedSeq = /* @__PURE__ */ function(Seq2) {
  function KeyedSeq2(value) {
    return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
  }
  __name(KeyedSeq2, "KeyedSeq");
  if (Seq2)
    KeyedSeq2.__proto__ = Seq2;
  KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  KeyedSeq2.prototype.constructor = KeyedSeq2;
  KeyedSeq2.prototype.toKeyedSeq = /* @__PURE__ */ __name(function toKeyedSeq3() {
    return this;
  }, "toKeyedSeq");
  return KeyedSeq2;
}(Seq);
var IndexedSeq = /* @__PURE__ */ function(Seq2) {
  function IndexedSeq2(value) {
    return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
  }
  __name(IndexedSeq2, "IndexedSeq");
  if (Seq2)
    IndexedSeq2.__proto__ = Seq2;
  IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  IndexedSeq2.prototype.constructor = IndexedSeq2;
  IndexedSeq2.of = /* @__PURE__ */ __name(function of() {
    return IndexedSeq2(arguments);
  }, "of");
  IndexedSeq2.prototype.toIndexedSeq = /* @__PURE__ */ __name(function toIndexedSeq2() {
    return this;
  }, "toIndexedSeq");
  IndexedSeq2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Seq [", "]");
  }, "toString");
  return IndexedSeq2;
}(Seq);
var SetSeq = /* @__PURE__ */ function(Seq2) {
  function SetSeq2(value) {
    return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
  }
  __name(SetSeq2, "SetSeq");
  if (Seq2)
    SetSeq2.__proto__ = Seq2;
  SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  SetSeq2.prototype.constructor = SetSeq2;
  SetSeq2.of = /* @__PURE__ */ __name(function of() {
    return SetSeq2(arguments);
  }, "of");
  SetSeq2.prototype.toSetSeq = /* @__PURE__ */ __name(function toSetSeq2() {
    return this;
  }, "toSetSeq");
  return SetSeq2;
}(Seq);
Seq.isSeq = isSeq;
Seq.Keyed = KeyedSeq;
Seq.Set = SetSeq;
Seq.Indexed = IndexedSeq;
Seq.prototype[IS_SEQ_SYMBOL] = true;
var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
  function ArraySeq2(array) {
    this._array = array;
    this.size = array.length;
  }
  __name(ArraySeq2, "ArraySeq");
  if (IndexedSeq2)
    ArraySeq2.__proto__ = IndexedSeq2;
  ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ArraySeq2.prototype.constructor = ArraySeq2;
  ArraySeq2.prototype.get = /* @__PURE__ */ __name(function get11(index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  }, "get");
  ArraySeq2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    while (i !== size) {
      var ii = reverse3 ? size - ++i : i++;
      if (fn(array[ii], ii, this) === false) {
        break;
      }
    }
    return i;
  }, "__iterate");
  ArraySeq2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var ii = reverse3 ? size - ++i : i++;
      return iteratorValue(type, ii, array[ii]);
    });
  }, "__iterator");
  return ArraySeq2;
}(IndexedSeq);
var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
  function ObjectSeq2(object) {
    var keys2 = Object.keys(object).concat(
      Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []
    );
    this._object = object;
    this._keys = keys2;
    this.size = keys2.length;
  }
  __name(ObjectSeq2, "ObjectSeq");
  if (KeyedSeq2)
    ObjectSeq2.__proto__ = KeyedSeq2;
  ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ObjectSeq2.prototype.constructor = ObjectSeq2;
  ObjectSeq2.prototype.get = /* @__PURE__ */ __name(function get11(key, notSetValue) {
    if (notSetValue !== void 0 && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  }, "get");
  ObjectSeq2.prototype.has = /* @__PURE__ */ __name(function has5(key) {
    return hasOwnProperty.call(this._object, key);
  }, "has");
  ObjectSeq2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    while (i !== size) {
      var key = keys2[reverse3 ? size - ++i : i++];
      if (fn(object[key], key, this) === false) {
        break;
      }
    }
    return i;
  }, "__iterate");
  ObjectSeq2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var key = keys2[reverse3 ? size - ++i : i++];
      return iteratorValue(type, key, object[key]);
    });
  }, "__iterator");
  return ObjectSeq2;
}(KeyedSeq);
ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
  function CollectionSeq2(collection) {
    this._collection = collection;
    this.size = collection.length || collection.size;
  }
  __name(CollectionSeq2, "CollectionSeq");
  if (IndexedSeq2)
    CollectionSeq2.__proto__ = IndexedSeq2;
  CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  CollectionSeq2.prototype.constructor = CollectionSeq2;
  CollectionSeq2.prototype.__iterateUncached = /* @__PURE__ */ __name(function __iterateUncached(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  }, "__iterateUncached");
  CollectionSeq2.prototype.__iteratorUncached = /* @__PURE__ */ __name(function __iteratorUncached(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  }, "__iteratorUncached");
  return CollectionSeq2;
}(IndexedSeq);
var EMPTY_SEQ;
function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}
__name(emptySequence, "emptySequence");
function keyedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq.fromEntrySeq();
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    "Expected Array or collection object of [k, v] entries, or keyed object: " + value
  );
}
__name(keyedSeqFromValue, "keyedSeqFromValue");
function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError(
    "Expected Array or collection object of values: " + value
  );
}
__name(indexedSeqFromValue, "indexedSeqFromValue");
function seqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    "Expected Array or collection object of values, or keyed object: " + value
  );
}
__name(seqFromValue, "seqFromValue");
function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
}
__name(maybeIndexedSeqFromValue, "maybeIndexedSeqFromValue");
var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
__name(isMap, "isMap");
function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
__name(isOrderedMap, "isOrderedMap");
function isValueObject(maybeValue) {
  return Boolean(
    maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
  );
}
__name(isValueObject, "isValueObject");
function is(valueA, valueB) {
  if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
}
__name(is, "is");
var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : /* @__PURE__ */ __name(function imul2(a, b) {
  a |= 0;
  b |= 0;
  var c = a & 65535;
  var d = b & 65535;
  return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
}, "imul");
function smi(i32) {
  return i32 >>> 1 & 1073741824 | i32 & 3221225471;
}
__name(smi, "smi");
var defaultValueOf = Object.prototype.valueOf;
function hash(o) {
  if (o == null) {
    return hashNullish(o);
  }
  if (typeof o.hashCode === "function") {
    return smi(o.hashCode(o));
  }
  var v = valueOf(o);
  if (v == null) {
    return hashNullish(v);
  }
  switch (typeof v) {
    case "boolean":
      return v ? 1108378657 : 1108378656;
    case "number":
      return hashNumber(v);
    case "string":
      return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
    case "object":
    case "function":
      return hashJSObj(v);
    case "symbol":
      return hashSymbol(v);
    default:
      if (typeof v.toString === "function") {
        return hashString(v.toString());
      }
      throw new Error("Value type " + typeof v + " cannot be hashed.");
  }
}
__name(hash, "hash");
function hashNullish(nullish) {
  return nullish === null ? 1108378658 : 1108378659;
}
__name(hashNullish, "hashNullish");
function hashNumber(n) {
  if (n !== n || n === Infinity) {
    return 0;
  }
  var hash2 = n | 0;
  if (hash2 !== n) {
    hash2 ^= n * 4294967295;
  }
  while (n > 4294967295) {
    n /= 4294967295;
    hash2 ^= n;
  }
  return smi(hash2);
}
__name(hashNumber, "hashNumber");
function cachedHashString(string) {
  var hashed = stringHashCache[string];
  if (hashed === void 0) {
    hashed = hashString(string);
    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
      STRING_HASH_CACHE_SIZE = 0;
      stringHashCache = {};
    }
    STRING_HASH_CACHE_SIZE++;
    stringHashCache[string] = hashed;
  }
  return hashed;
}
__name(cachedHashString, "cachedHashString");
function hashString(string) {
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
  }
  return smi(hashed);
}
__name(hashString, "hashString");
function hashSymbol(sym) {
  var hashed = symbolMap[sym];
  if (hashed !== void 0) {
    return hashed;
  }
  hashed = nextHash();
  symbolMap[sym] = hashed;
  return hashed;
}
__name(hashSymbol, "hashSymbol");
function hashJSObj(obj) {
  var hashed;
  if (usingWeakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = obj[UID_HASH_KEY];
  if (hashed !== void 0) {
    return hashed;
  }
  if (!canDefineProperty) {
    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = getIENodeHash(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = nextHash();
  if (usingWeakMap) {
    weakMap.set(obj, hashed);
  } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
    throw new Error("Non-extensible objects are not allowed as keys.");
  } else if (canDefineProperty) {
    Object.defineProperty(obj, UID_HASH_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: hashed
    });
  } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
    obj.propertyIsEnumerable = function() {
      return this.constructor.prototype.propertyIsEnumerable.apply(
        this,
        arguments
      );
    };
    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
  } else if (obj.nodeType !== void 0) {
    obj[UID_HASH_KEY] = hashed;
  } else {
    throw new Error("Unable to set a non-enumerable property on object.");
  }
  return hashed;
}
__name(hashJSObj, "hashJSObj");
var isExtensible = Object.isExtensible;
var canDefineProperty = function() {
  try {
    Object.defineProperty({}, "@", {});
    return true;
  } catch (e) {
    return false;
  }
}();
function getIENodeHash(node) {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1:
        return node.uniqueID;
      case 9:
        return node.documentElement && node.documentElement.uniqueID;
    }
  }
}
__name(getIENodeHash, "getIENodeHash");
function valueOf(obj) {
  return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
}
__name(valueOf, "valueOf");
function nextHash() {
  var nextHash2 = ++_objHashUID;
  if (_objHashUID & 1073741824) {
    _objHashUID = 0;
  }
  return nextHash2;
}
__name(nextHash, "nextHash");
var usingWeakMap = typeof WeakMap === "function";
var weakMap;
if (usingWeakMap) {
  weakMap = /* @__PURE__ */ new WeakMap();
}
var symbolMap = /* @__PURE__ */ Object.create(null);
var _objHashUID = 0;
var UID_HASH_KEY = "__immutablehash__";
if (typeof Symbol === "function") {
  UID_HASH_KEY = Symbol(UID_HASH_KEY);
}
var STRING_HASH_CACHE_MIN_STRLEN = 16;
var STRING_HASH_CACHE_MAX_SIZE = 255;
var STRING_HASH_CACHE_SIZE = 0;
var stringHashCache = {};
var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
  function ToKeyedSequence2(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }
  __name(ToKeyedSequence2, "ToKeyedSequence");
  if (KeyedSeq2)
    ToKeyedSequence2.__proto__ = KeyedSeq2;
  ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
  ToKeyedSequence2.prototype.get = /* @__PURE__ */ __name(function get11(key, notSetValue) {
    return this._iter.get(key, notSetValue);
  }, "get");
  ToKeyedSequence2.prototype.has = /* @__PURE__ */ __name(function has5(key) {
    return this._iter.has(key);
  }, "has");
  ToKeyedSequence2.prototype.valueSeq = /* @__PURE__ */ __name(function valueSeq2() {
    return this._iter.valueSeq();
  }, "valueSeq");
  ToKeyedSequence2.prototype.reverse = /* @__PURE__ */ __name(function reverse3() {
    var this$1$1 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  }, "reverse");
  ToKeyedSequence2.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
    var this$1$1 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  }, "map");
  ToKeyedSequence2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v, k) {
      return fn(v, k, this$1$1);
    }, reverse3);
  }, "__iterate");
  ToKeyedSequence2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return this._iter.__iterator(type, reverse3);
  }, "__iterator");
  return ToKeyedSequence2;
}(KeyedSeq);
ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
  function ToIndexedSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  __name(ToIndexedSequence2, "ToIndexedSequence");
  if (IndexedSeq2)
    ToIndexedSequence2.__proto__ = IndexedSeq2;
  ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
  ToIndexedSequence2.prototype.includes = /* @__PURE__ */ __name(function includes3(value) {
    return this._iter.includes(value);
  }, "includes");
  ToIndexedSequence2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var i = 0;
    reverse3 && ensureSize(this);
    return this._iter.__iterate(
      function(v) {
        return fn(v, reverse3 ? this$1$1.size - ++i : i++, this$1$1);
      },
      reverse3
    );
  }, "__iterate");
  ToIndexedSequence2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var this$1$1 = this;
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    var i = 0;
    reverse3 && ensureSize(this);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(
        type,
        reverse3 ? this$1$1.size - ++i : i++,
        step.value,
        step
      );
    });
  }, "__iterator");
  return ToIndexedSequence2;
}(IndexedSeq);
var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
  function ToSetSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  __name(ToSetSequence2, "ToSetSequence");
  if (SetSeq2)
    ToSetSequence2.__proto__ = SetSeq2;
  ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
  ToSetSequence2.prototype.constructor = ToSetSequence2;
  ToSetSequence2.prototype.has = /* @__PURE__ */ __name(function has5(key) {
    return this._iter.includes(key);
  }, "has");
  ToSetSequence2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v) {
      return fn(v, v, this$1$1);
    }, reverse3);
  }, "__iterate");
  ToSetSequence2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  }, "__iterator");
  return ToSetSequence2;
}(SetSeq);
var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
  function FromEntriesSequence2(entries3) {
    this._iter = entries3;
    this.size = entries3.size;
  }
  __name(FromEntriesSequence2, "FromEntriesSequence");
  if (KeyedSeq2)
    FromEntriesSequence2.__proto__ = KeyedSeq2;
  FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
  FromEntriesSequence2.prototype.entrySeq = /* @__PURE__ */ __name(function entrySeq2() {
    return this._iter.toSeq();
  }, "entrySeq");
  FromEntriesSequence2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(entry) {
      if (entry) {
        validateEntry(entry);
        var indexedCollection = isCollection(entry);
        return fn(
          indexedCollection ? entry.get(1) : entry[1],
          indexedCollection ? entry.get(0) : entry[0],
          this$1$1
        );
      }
    }, reverse3);
  }, "__iterate");
  FromEntriesSequence2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return iteratorValue(
            type,
            indexedCollection ? entry.get(0) : entry[0],
            indexedCollection ? entry.get(1) : entry[1],
            step
          );
        }
      }
    });
  }, "__iterator");
  return FromEntriesSequence2;
}(KeyedSeq);
ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
function flipFactory(collection) {
  var flipSequence = makeSequence(collection);
  flipSequence._iter = collection;
  flipSequence.size = collection.size;
  flipSequence.flip = function() {
    return collection;
  };
  flipSequence.reverse = function() {
    var reversedSequence = collection.reverse.apply(this);
    reversedSequence.flip = function() {
      return collection.reverse();
    };
    return reversedSequence;
  };
  flipSequence.has = function(key) {
    return collection.includes(key);
  };
  flipSequence.includes = function(key) {
    return collection.has(key);
  };
  flipSequence.cacheResult = cacheResultThrough;
  flipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k) {
      return fn(k, v, this$1$1) !== false;
    }, reverse3);
  };
  flipSequence.__iteratorUncached = function(type, reverse3) {
    if (type === ITERATE_ENTRIES) {
      var iterator = collection.__iterator(type, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (!step.done) {
          var k = step.value[0];
          step.value[0] = step.value[1];
          step.value[1] = k;
        }
        return step;
      });
    }
    return collection.__iterator(
      type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
      reverse3
    );
  };
  return flipSequence;
}
__name(flipFactory, "flipFactory");
function mapFactory(collection, mapper, context) {
  var mappedSequence = makeSequence(collection);
  mappedSequence.size = collection.size;
  mappedSequence.has = function(key) {
    return collection.has(key);
  };
  mappedSequence.get = function(key, notSetValue) {
    var v = collection.get(key, NOT_SET);
    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
  };
  mappedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(
      function(v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
      },
      reverse3
    );
  };
  mappedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var key = entry[0];
      return iteratorValue(
        type,
        key,
        mapper.call(context, entry[1], key, collection),
        step
      );
    });
  };
  return mappedSequence;
}
__name(mapFactory, "mapFactory");
function reverseFactory(collection, useKeys) {
  var this$1$1 = this;
  var reversedSequence = makeSequence(collection);
  reversedSequence._iter = collection;
  reversedSequence.size = collection.size;
  reversedSequence.reverse = function() {
    return collection;
  };
  if (collection.flip) {
    reversedSequence.flip = function() {
      var flipSequence = flipFactory(collection);
      flipSequence.reverse = function() {
        return collection.flip();
      };
      return flipSequence;
    };
  }
  reversedSequence.get = function(key, notSetValue) {
    return collection.get(useKeys ? key : -1 - key, notSetValue);
  };
  reversedSequence.has = function(key) {
    return collection.has(useKeys ? key : -1 - key);
  };
  reversedSequence.includes = function(value) {
    return collection.includes(value);
  };
  reversedSequence.cacheResult = cacheResultThrough;
  reversedSequence.__iterate = function(fn, reverse3) {
    var this$1$12 = this;
    var i = 0;
    reverse3 && ensureSize(collection);
    return collection.__iterate(
      function(v, k) {
        return fn(v, useKeys ? k : reverse3 ? this$1$12.size - ++i : i++, this$1$12);
      },
      !reverse3
    );
  };
  reversedSequence.__iterator = function(type, reverse3) {
    var i = 0;
    reverse3 && ensureSize(collection);
    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      return iteratorValue(
        type,
        useKeys ? entry[0] : reverse3 ? this$1$1.size - ++i : i++,
        entry[1],
        step
      );
    });
  };
  return reversedSequence;
}
__name(reverseFactory, "reverseFactory");
function filterFactory(collection, predicate, context, useKeys) {
  var filterSequence = makeSequence(collection);
  if (useKeys) {
    filterSequence.has = function(key) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
    };
    filterSequence.get = function(key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
    };
  }
  filterSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    }, reverse3);
    return iterations;
  };
  filterSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterations = 0;
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        var value = entry[1];
        if (predicate.call(context, value, key, collection)) {
          return iteratorValue(type, useKeys ? key : iterations++, value, step);
        }
      }
    });
  };
  return filterSequence;
}
__name(filterFactory, "filterFactory");
function countByFactory(collection, grouper, context) {
  var groups = Map().asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function(a) {
      return a + 1;
    });
  });
  return groups.asImmutable();
}
__name(countByFactory, "countByFactory");
function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
  collection.__iterate(function(v, k) {
    groups.update(
      grouper.call(context, v, k, collection),
      function(a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      }
    );
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  }).asImmutable();
}
__name(groupByFactory, "groupByFactory");
function sliceFactory(collection, begin, end, useKeys) {
  var originalSize = collection.size;
  if (wholeSlice(begin, end, originalSize)) {
    return collection;
  }
  var resolvedBegin = resolveBegin(begin, originalSize);
  var resolvedEnd = resolveEnd(end, originalSize);
  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
  }
  var resolvedSize = resolvedEnd - resolvedBegin;
  var sliceSize;
  if (resolvedSize === resolvedSize) {
    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
  }
  var sliceSeq = makeSequence(collection);
  sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
    sliceSeq.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
    };
  }
  sliceSeq.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (sliceSize === 0) {
      return 0;
    }
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var skipped = 0;
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k) {
      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
      }
    });
    return iterations;
  };
  sliceSeq.__iteratorUncached = function(type, reverse3) {
    if (sliceSize !== 0 && reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    if (sliceSize === 0) {
      return new Iterator(iteratorDone);
    }
    var iterator = collection.__iterator(type, reverse3);
    var skipped = 0;
    var iterations = 0;
    return new Iterator(function() {
      while (skipped++ < resolvedBegin) {
        iterator.next();
      }
      if (++iterations > sliceSize) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (useKeys || type === ITERATE_VALUES || step.done) {
        return step;
      }
      if (type === ITERATE_KEYS) {
        return iteratorValue(type, iterations - 1, void 0, step);
      }
      return iteratorValue(type, iterations - 1, step.value[1], step);
    });
  };
  return sliceSeq;
}
__name(sliceFactory, "sliceFactory");
function takeWhileFactory(collection, predicate, context) {
  var takeSequence = makeSequence(collection);
  takeSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    collection.__iterate(
      function(v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
      }
    );
    return iterations;
  };
  takeSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterating = true;
    return new Iterator(function() {
      if (!iterating) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var k = entry[0];
      var v = entry[1];
      if (!predicate.call(context, v, k, this$1$1)) {
        iterating = false;
        return iteratorDone();
      }
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return takeSequence;
}
__name(takeWhileFactory, "takeWhileFactory");
function skipWhileFactory(collection, predicate, context, useKeys) {
  var skipSequence = makeSequence(collection);
  skipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    });
    return iterations;
  };
  skipSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var skipping = true;
    var iterations = 0;
    return new Iterator(function() {
      var step;
      var k;
      var v;
      do {
        step = iterator.next();
        if (step.done) {
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          }
          if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations++, void 0, step);
          }
          return iteratorValue(type, iterations++, step.value[1], step);
        }
        var entry = step.value;
        k = entry[0];
        v = entry[1];
        skipping && (skipping = predicate.call(context, v, k, this$1$1));
      } while (skipping);
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return skipSequence;
}
__name(skipWhileFactory, "skipWhileFactory");
function concatFactory(collection, values2) {
  var isKeyedCollection = isKeyed(collection);
  var iters = [collection].concat(values2).map(function(v) {
    if (!isCollection(v)) {
      v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
    } else if (isKeyedCollection) {
      v = KeyedCollection(v);
    }
    return v;
  }).filter(function(v) {
    return v.size !== 0;
  });
  if (iters.length === 0) {
    return collection;
  }
  if (iters.length === 1) {
    var singleton = iters[0];
    if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
      return singleton;
    }
  }
  var concatSeq = new ArraySeq(iters);
  if (isKeyedCollection) {
    concatSeq = concatSeq.toKeyedSeq();
  } else if (!isIndexed(collection)) {
    concatSeq = concatSeq.toSetSeq();
  }
  concatSeq = concatSeq.flatten(true);
  concatSeq.size = iters.reduce(function(sum, seq) {
    if (sum !== void 0) {
      var size = seq.size;
      if (size !== void 0) {
        return sum + size;
      }
    }
  }, 0);
  return concatSeq;
}
__name(concatFactory, "concatFactory");
function flattenFactory(collection, depth, useKeys) {
  var flatSequence = makeSequence(collection);
  flatSequence.__iterateUncached = function(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    var stopped = false;
    function flatDeep(iter, currentDepth) {
      iter.__iterate(function(v, k) {
        if ((!depth || currentDepth < depth) && isCollection(v)) {
          flatDeep(v, currentDepth + 1);
        } else {
          iterations++;
          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
            stopped = true;
          }
        }
        return !stopped;
      }, reverse3);
    }
    __name(flatDeep, "flatDeep");
    flatDeep(collection, 0);
    return iterations;
  };
  flatSequence.__iteratorUncached = function(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(type, reverse3);
    var stack = [];
    var iterations = 0;
    return new Iterator(function() {
      while (iterator) {
        var step = iterator.next();
        if (step.done !== false) {
          iterator = stack.pop();
          continue;
        }
        var v = step.value;
        if (type === ITERATE_ENTRIES) {
          v = v[1];
        }
        if ((!depth || stack.length < depth) && isCollection(v)) {
          stack.push(iterator);
          iterator = v.__iterator(type, reverse3);
        } else {
          return useKeys ? step : iteratorValue(type, iterations++, v, step);
        }
      }
      return iteratorDone();
    });
  };
  return flatSequence;
}
__name(flattenFactory, "flattenFactory");
function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection.toSeq().map(function(v, k) {
    return coerce(mapper.call(context, v, k, collection));
  }).flatten(true);
}
__name(flatMapFactory, "flatMapFactory");
function interposeFactory(collection, separator) {
  var interposedSequence = makeSequence(collection);
  interposedSequence.size = collection.size && collection.size * 2 - 1;
  interposedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(
      function(v) {
        return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
      },
      reverse3
    );
    return iterations;
  };
  interposedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_VALUES, reverse3);
    var iterations = 0;
    var step;
    return new Iterator(function() {
      if (!step || iterations % 2) {
        step = iterator.next();
        if (step.done) {
          return step;
        }
      }
      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
    });
  };
  return interposedSequence;
}
__name(interposeFactory, "interposeFactory");
function sortFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  var isKeyedCollection = isKeyed(collection);
  var index = 0;
  var entries3 = collection.toSeq().map(function(v, k) {
    return [k, v, index++, mapper ? mapper(v, k, collection) : v];
  }).valueSeq().toArray();
  entries3.sort(function(a, b) {
    return comparator(a[3], b[3]) || a[2] - b[2];
  }).forEach(
    isKeyedCollection ? function(v, i) {
      entries3[i].length = 2;
    } : function(v, i) {
      entries3[i] = v[1];
    }
  );
  return isKeyedCollection ? KeyedSeq(entries3) : isIndexed(collection) ? IndexedSeq(entries3) : SetSeq(entries3);
}
__name(sortFactory, "sortFactory");
function maxFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  if (mapper) {
    var entry = collection.toSeq().map(function(v, k) {
      return [v, mapper(v, k, collection)];
    }).reduce(function(a, b) {
      return maxCompare(comparator, a[1], b[1]) ? b : a;
    });
    return entry && entry[0];
  }
  return collection.reduce(function(a, b) {
    return maxCompare(comparator, a, b) ? b : a;
  });
}
__name(maxFactory, "maxFactory");
function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
}
__name(maxCompare, "maxCompare");
function zipWithFactory(keyIter, zipper, iters, zipAll2) {
  var zipSequence = makeSequence(keyIter);
  var sizes = new ArraySeq(iters).map(function(i) {
    return i.size;
  });
  zipSequence.size = zipAll2 ? sizes.max() : sizes.min();
  zipSequence.__iterate = function(fn, reverse3) {
    var iterator = this.__iterator(ITERATE_VALUES, reverse3);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      if (fn(step.value, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };
  zipSequence.__iteratorUncached = function(type, reverse3) {
    var iterators = iters.map(
      function(i) {
        return i = Collection(i), getIterator(reverse3 ? i.reverse() : i);
      }
    );
    var iterations = 0;
    var isDone = false;
    return new Iterator(function() {
      var steps;
      if (!isDone) {
        steps = iterators.map(function(i) {
          return i.next();
        });
        isDone = zipAll2 ? steps.every(function(s) {
          return s.done;
        }) : steps.some(function(s) {
          return s.done;
        });
      }
      if (isDone) {
        return iteratorDone();
      }
      return iteratorValue(
        type,
        iterations++,
        zipper.apply(
          null,
          steps.map(function(s) {
            return s.value;
          })
        )
      );
    });
  };
  return zipSequence;
}
__name(zipWithFactory, "zipWithFactory");
function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}
__name(reify, "reify");
function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError("Expected [K, V] tuple: " + entry);
  }
}
__name(validateEntry, "validateEntry");
function collectionClass(collection) {
  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
}
__name(collectionClass, "collectionClass");
function makeSequence(collection) {
  return Object.create(
    (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
  );
}
__name(makeSequence, "makeSequence");
function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}
__name(cacheResultThrough, "cacheResultThrough");
function defaultComparator(a, b) {
  if (a === void 0 && b === void 0) {
    return 0;
  }
  if (a === void 0) {
    return 1;
  }
  if (b === void 0) {
    return -1;
  }
  return a > b ? 1 : a < b ? -1 : 0;
}
__name(defaultComparator, "defaultComparator");
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
__name(arrCopy, "arrCopy");
function invariant(condition, error) {
  if (!condition) {
    throw new Error(error);
  }
}
__name(invariant, "invariant");
function assertNotInfinite(size) {
  invariant(
    size !== Infinity,
    "Cannot perform this action with an infinite size."
  );
}
__name(assertNotInfinite, "assertNotInfinite");
function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== "string") {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError(
    "Invalid keyPath: expected Ordered Collection or Array: " + keyPath
  );
}
__name(coerceKeyPath, "coerceKeyPath");
var toString2 = Object.prototype.toString;
function isPlainObject(value) {
  if (!value || typeof value !== "object" || toString2.call(value) !== "[object Object]") {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  var parentProto = proto;
  var nextProto = Object.getPrototypeOf(proto);
  while (nextProto !== null) {
    parentProto = nextProto;
    nextProto = Object.getPrototypeOf(parentProto);
  }
  return parentProto === proto;
}
__name(isPlainObject, "isPlainObject");
function isDataStructure(value) {
  return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
}
__name(isDataStructure, "isDataStructure");
function quoteString(value) {
  try {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
__name(quoteString, "quoteString");
function has(collection, key) {
  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}
__name(has, "has");
function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
}
__name(get, "get");
function shallowCopy(from) {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  var to = {};
  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}
__name(shallowCopy, "shallowCopy");
function remove(collection, key) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot update non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.remove) {
      throw new TypeError(
        "Cannot update immutable value without .remove() method: " + collection
      );
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) {
    collectionCopy.splice(key, 1);
  } else {
    delete collectionCopy[key];
  }
  return collectionCopy;
}
__name(remove, "remove");
function set(collection, key, value) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot update non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.set) {
      throw new TypeError(
        "Cannot update immutable value without .set() method: " + collection
      );
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
}
__name(set, "set");
function updateIn$1(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = void 0;
  }
  var updatedValue = updateInDeeply(
    isImmutable(collection),
    collection,
    coerceKeyPath(keyPath),
    0,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}
__name(updateIn$1, "updateIn$1");
function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
  var wasNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    var existingValue = wasNotSet ? notSetValue : existing;
    var newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError(
      "Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing
    );
  }
  var key = keyPath[i];
  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  var nextUpdated = updateInDeeply(
    nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
    nextExisting,
    keyPath,
    i + 1,
    notSetValue,
    updater
  );
  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(
    wasNotSet ? inImmutable ? emptyMap() : {} : existing,
    key,
    nextUpdated
  );
}
__name(updateInDeeply, "updateInDeeply");
function setIn$1(collection, keyPath, value) {
  return updateIn$1(collection, keyPath, NOT_SET, function() {
    return value;
  });
}
__name(setIn$1, "setIn$1");
function setIn(keyPath, v) {
  return setIn$1(this, keyPath, v);
}
__name(setIn, "setIn");
function removeIn(collection, keyPath) {
  return updateIn$1(collection, keyPath, function() {
    return NOT_SET;
  });
}
__name(removeIn, "removeIn");
function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}
__name(deleteIn, "deleteIn");
function update$1(collection, key, notSetValue, updater) {
  return updateIn$1(collection, [key], notSetValue, updater);
}
__name(update$1, "update$1");
function update(key, notSetValue, updater) {
  return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
}
__name(update, "update");
function updateIn(keyPath, notSetValue, updater) {
  return updateIn$1(this, keyPath, notSetValue, updater);
}
__name(updateIn, "updateIn");
function merge$1() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeIntoKeyedWith(this, iters);
}
__name(merge$1, "merge$1");
function mergeWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  if (typeof merger !== "function") {
    throw new TypeError("Invalid merger function: " + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}
__name(mergeWith$1, "mergeWith$1");
function mergeIntoKeyedWith(collection, collections, merger) {
  var iters = [];
  for (var ii = 0; ii < collections.length; ii++) {
    var collection$1 = KeyedCollection(collections[ii]);
    if (collection$1.size !== 0) {
      iters.push(collection$1);
    }
  }
  if (iters.length === 0) {
    return collection;
  }
  if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(function(collection2) {
    var mergeIntoCollection = merger ? function(value, key) {
      update$1(
        collection2,
        key,
        NOT_SET,
        function(oldVal) {
          return oldVal === NOT_SET ? value : merger(oldVal, value, key);
        }
      );
    } : function(value, key) {
      collection2.set(key, value);
    };
    for (var ii2 = 0; ii2 < iters.length; ii2++) {
      iters[ii2].forEach(mergeIntoCollection);
    }
  });
}
__name(mergeIntoKeyedWith, "mergeIntoKeyedWith");
function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}
__name(mergeDeepWithSources, "mergeDeepWithSources");
function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot merge into non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
  }
  var isArray = Array.isArray(collection);
  var merged = collection;
  var Collection3 = isArray ? IndexedCollection : KeyedCollection;
  var mergeItem = isArray ? function(value) {
    if (merged === collection) {
      merged = shallowCopy(merged);
    }
    merged.push(value);
  } : function(value, key) {
    var hasVal = hasOwnProperty.call(merged, key);
    var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
    if (!hasVal || nextVal !== merged[key]) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged[key] = nextVal;
    }
  };
  for (var i = 0; i < sources.length; i++) {
    Collection3(sources[i]).forEach(mergeItem);
  }
  return merged;
}
__name(mergeWithSources, "mergeWithSources");
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
  }
  __name(deepMerger, "deepMerger");
  return deepMerger;
}
__name(deepMergerWith, "deepMergerWith");
function areMergeable(oldDataStructure, newDataStructure) {
  var oldSeq = Seq(oldDataStructure);
  var newSeq = Seq(newDataStructure);
  return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
}
__name(areMergeable, "areMergeable");
function mergeDeep() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeDeepWithSources(this, iters);
}
__name(mergeDeep, "mergeDeep");
function mergeDeepWith(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return mergeDeepWithSources(this, iters, merger);
}
__name(mergeDeepWith, "mergeDeepWith");
function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeWithSources(m, iters);
  });
}
__name(mergeIn, "mergeIn");
function mergeDeepIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(
    this,
    keyPath,
    emptyMap(),
    function(m) {
      return mergeDeepWithSources(m, iters);
    }
  );
}
__name(mergeDeepIn, "mergeDeepIn");
function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
__name(withMutations, "withMutations");
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
__name(asMutable, "asMutable");
function asImmutable() {
  return this.__ensureOwner();
}
__name(asImmutable, "asImmutable");
function wasAltered() {
  return this.__altered;
}
__name(wasAltered, "wasAltered");
var Map = /* @__PURE__ */ function(KeyedCollection2) {
  function Map2(value) {
    return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
      var iter = KeyedCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  __name(Map2, "Map");
  if (KeyedCollection2)
    Map2.__proto__ = KeyedCollection2;
  Map2.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
  Map2.prototype.constructor = Map2;
  Map2.of = /* @__PURE__ */ __name(function of() {
    var keyValues = [], len = arguments.length;
    while (len--)
      keyValues[len] = arguments[len];
    return emptyMap().withMutations(function(map2) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error("Missing value for key: " + keyValues[i]);
        }
        map2.set(keyValues[i], keyValues[i + 1]);
      }
    });
  }, "of");
  Map2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Map {", "}");
  }, "toString");
  Map2.prototype.get = /* @__PURE__ */ __name(function get11(k, notSetValue) {
    return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
  }, "get");
  Map2.prototype.set = /* @__PURE__ */ __name(function set3(k, v) {
    return updateMap(this, k, v);
  }, "set");
  Map2.prototype.remove = /* @__PURE__ */ __name(function remove3(k) {
    return updateMap(this, k, NOT_SET);
  }, "remove");
  Map2.prototype.deleteAll = /* @__PURE__ */ __name(function deleteAll(keys2) {
    var collection = Collection(keys2);
    if (collection.size === 0) {
      return this;
    }
    return this.withMutations(function(map2) {
      collection.forEach(function(key) {
        return map2.remove(key);
      });
    });
  }, "deleteAll");
  Map2.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  }, "clear");
  Map2.prototype.sort = /* @__PURE__ */ __name(function sort22(comparator) {
    return OrderedMap(sortFactory(this, comparator));
  }, "sort");
  Map2.prototype.sortBy = /* @__PURE__ */ __name(function sortBy2(mapper, comparator) {
    return OrderedMap(sortFactory(this, comparator, mapper));
  }, "sortBy");
  Map2.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(map3) {
      map3.forEach(function(value, key) {
        map3.set(key, mapper.call(context, value, key, this$1$1));
      });
    });
  }, "map");
  Map2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return new MapIterator(this, type, reverse3);
  }, "__iterator");
  Map2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    this._root && this._root.iterate(function(entry) {
      iterations++;
      return fn(entry[1], entry[0], this$1$1);
    }, reverse3);
    return iterations;
  }, "__iterate");
  Map2.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  }, "__ensureOwner");
  return Map2;
}(KeyedCollection);
Map.isMap = isMap;
var MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;
MapPrototype[DELETE] = MapPrototype.remove;
MapPrototype.removeAll = MapPrototype.deleteAll;
MapPrototype.setIn = setIn;
MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
MapPrototype.update = update;
MapPrototype.updateIn = updateIn;
MapPrototype.merge = MapPrototype.concat = merge$1;
MapPrototype.mergeWith = mergeWith$1;
MapPrototype.mergeDeep = mergeDeep;
MapPrototype.mergeDeepWith = mergeDeepWith;
MapPrototype.mergeIn = mergeIn;
MapPrototype.mergeDeepIn = mergeDeepIn;
MapPrototype.withMutations = withMutations;
MapPrototype.wasAltered = wasAltered;
MapPrototype.asImmutable = asImmutable;
MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
MapPrototype["@@transducer/step"] = function(result, arr) {
  return result.set(arr[0], arr[1]);
};
MapPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var ArrayMapNode = /* @__PURE__ */ __name(function ArrayMapNode2(ownerID, entries3) {
  this.ownerID = ownerID;
  this.entries = entries3;
}, "ArrayMapNode");
ArrayMapNode.prototype.get = /* @__PURE__ */ __name(function get2(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
}, "get");
ArrayMapNode.prototype.update = /* @__PURE__ */ __name(function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && entries3.length === 1) {
    return;
  }
  if (!exists && !removed && entries3.length >= MAX_ARRAY_MAP_SIZE) {
    return createNodes(ownerID, entries3, key, value);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new ArrayMapNode(ownerID, newEntries);
}, "update");
var BitmapIndexedNode = /* @__PURE__ */ __name(function BitmapIndexedNode2(ownerID, bitmap, nodes) {
  this.ownerID = ownerID;
  this.bitmap = bitmap;
  this.nodes = nodes;
}, "BitmapIndexedNode");
BitmapIndexedNode.prototype.get = /* @__PURE__ */ __name(function get3(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
  var bitmap = this.bitmap;
  return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(
    shift + SHIFT,
    keyHash,
    key,
    notSetValue
  );
}, "get");
BitmapIndexedNode.prototype.update = /* @__PURE__ */ __name(function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var bit = 1 << keyHashFrag;
  var bitmap = this.bitmap;
  var exists = (bitmap & bit) !== 0;
  if (!exists && value === NOT_SET) {
    return this;
  }
  var idx = popCount(bitmap & bit - 1);
  var nodes = this.nodes;
  var node = exists ? nodes[idx] : void 0;
  var newNode = updateNode(
    node,
    ownerID,
    shift + SHIFT,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
  if (newNode === node) {
    return this;
  }
  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
  }
  if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
    return nodes[idx ^ 1];
  }
  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
    return newNode;
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
  var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.bitmap = newBitmap;
    this.nodes = newNodes;
    return this;
  }
  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
}, "update");
var HashArrayMapNode = /* @__PURE__ */ __name(function HashArrayMapNode2(ownerID, count2, nodes) {
  this.ownerID = ownerID;
  this.count = count2;
  this.nodes = nodes;
}, "HashArrayMapNode");
HashArrayMapNode.prototype.get = /* @__PURE__ */ __name(function get4(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var node = this.nodes[idx];
  return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
}, "get");
HashArrayMapNode.prototype.update = /* @__PURE__ */ __name(function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var removed = value === NOT_SET;
  var nodes = this.nodes;
  var node = nodes[idx];
  if (removed && !node) {
    return this;
  }
  var newNode = updateNode(
    node,
    ownerID,
    shift + SHIFT,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
  if (newNode === node) {
    return this;
  }
  var newCount = this.count;
  if (!node) {
    newCount++;
  } else if (!newNode) {
    newCount--;
    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
      return packNodes(ownerID, nodes, newCount, idx);
    }
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newNodes = setAt(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.count = newCount;
    this.nodes = newNodes;
    return this;
  }
  return new HashArrayMapNode(ownerID, newCount, newNodes);
}, "update");
var HashCollisionNode = /* @__PURE__ */ __name(function HashCollisionNode2(ownerID, keyHash, entries3) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entries = entries3;
}, "HashCollisionNode");
HashCollisionNode.prototype.get = /* @__PURE__ */ __name(function get5(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
}, "get");
HashCollisionNode.prototype.update = /* @__PURE__ */ __name(function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var removed = value === NOT_SET;
  if (keyHash !== this.keyHash) {
    if (removed) {
      return this;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
  }
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && len === 2) {
    return new ValueNode(ownerID, this.keyHash, entries3[idx ^ 1]);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
}, "update");
var ValueNode = /* @__PURE__ */ __name(function ValueNode2(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
}, "ValueNode");
ValueNode.prototype.get = /* @__PURE__ */ __name(function get6(shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
}, "get");
ValueNode.prototype.update = /* @__PURE__ */ __name(function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var keyMatch = is(key, this.entry[0]);
  if (keyMatch ? value === this.entry[1] : removed) {
    return this;
  }
  SetRef(didAlter);
  if (removed) {
    SetRef(didChangeSize);
    return;
  }
  if (keyMatch) {
    if (ownerID && ownerID === this.ownerID) {
      this.entry[1] = value;
      return this;
    }
    return new ValueNode(ownerID, this.keyHash, [key, value]);
  }
  SetRef(didChangeSize);
  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
}, "update");
ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse3) {
  var entries3 = this.entries;
  for (var ii = 0, maxIndex = entries3.length - 1; ii <= maxIndex; ii++) {
    if (fn(entries3[reverse3 ? maxIndex - ii : ii]) === false) {
      return false;
    }
  }
};
BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse3) {
  var nodes = this.nodes;
  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
    var node = nodes[reverse3 ? maxIndex - ii : ii];
    if (node && node.iterate(fn, reverse3) === false) {
      return false;
    }
  }
};
ValueNode.prototype.iterate = function(fn, reverse3) {
  return fn(this.entry);
};
var MapIterator = /* @__PURE__ */ function(Iterator3) {
  function MapIterator2(map2, type, reverse3) {
    this._type = type;
    this._reverse = reverse3;
    this._stack = map2._root && mapIteratorFrame(map2._root);
  }
  __name(MapIterator2, "MapIterator");
  if (Iterator3)
    MapIterator2.__proto__ = Iterator3;
  MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
  MapIterator2.prototype.constructor = MapIterator2;
  MapIterator2.prototype.next = /* @__PURE__ */ __name(function next() {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex = void 0;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(
            type,
            node.entries[this._reverse ? maxIndex - index : index]
          );
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  }, "next");
  return MapIterator2;
}(Iterator);
function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}
__name(mapIteratorValue, "mapIteratorValue");
function mapIteratorFrame(node, prev) {
  return {
    node,
    index: 0,
    __prev: prev
  };
}
__name(mapIteratorFrame, "mapIteratorFrame");
function makeMap(size, root, ownerID, hash2) {
  var map2 = Object.create(MapPrototype);
  map2.size = size;
  map2._root = root;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
__name(makeMap, "makeMap");
var EMPTY_MAP;
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}
__name(emptyMap, "emptyMap");
function updateMap(map2, k, v) {
  var newRoot;
  var newSize;
  if (!map2._root) {
    if (v === NOT_SET) {
      return map2;
    }
    newSize = 1;
    newRoot = new ArrayMapNode(map2.__ownerID, [[k, v]]);
  } else {
    var didChangeSize = MakeRef();
    var didAlter = MakeRef();
    newRoot = updateNode(
      map2._root,
      map2.__ownerID,
      0,
      void 0,
      k,
      v,
      didChangeSize,
      didAlter
    );
    if (!didAlter.value) {
      return map2;
    }
    newSize = map2.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
  }
  if (map2.__ownerID) {
    map2.size = newSize;
    map2._root = newRoot;
    map2.__hash = void 0;
    map2.__altered = true;
    return map2;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
}
__name(updateMap, "updateMap");
function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (!node) {
    if (value === NOT_SET) {
      return node;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return new ValueNode(ownerID, keyHash, [key, value]);
  }
  return node.update(
    ownerID,
    shift,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
}
__name(updateNode, "updateNode");
function isLeafNode(node) {
  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
}
__name(isLeafNode, "isLeafNode");
function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
  if (node.keyHash === keyHash) {
    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
  }
  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var newNode;
  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
  return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
}
__name(mergeIntoNode, "mergeIntoNode");
function createNodes(ownerID, entries3, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries3.length; ii++) {
    var entry = entries3[ii];
    node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
  }
  return node;
}
__name(createNodes, "createNodes");
function packNodes(ownerID, nodes, count2, excluding) {
  var bitmap = 0;
  var packedII = 0;
  var packedNodes = new Array(count2);
  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
    var node = nodes[ii];
    if (node !== void 0 && ii !== excluding) {
      bitmap |= bit;
      packedNodes[packedII++] = node;
    }
  }
  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
}
__name(packNodes, "packNodes");
function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count2 = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
}
__name(expandNodes, "expandNodes");
function popCount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
__name(popCount, "popCount");
function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}
__name(setAt, "setAt");
function spliceIn(array, idx, val, canEdit) {
  var newLen = array.length + 1;
  if (canEdit && idx + 1 === newLen) {
    array[idx] = val;
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      newArray[ii] = val;
      after = -1;
    } else {
      newArray[ii] = array[ii + after];
    }
  }
  return newArray;
}
__name(spliceIn, "spliceIn");
function spliceOut(array, idx, canEdit) {
  var newLen = array.length - 1;
  if (canEdit && idx === newLen) {
    array.pop();
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      after = 1;
    }
    newArray[ii] = array[ii + after];
  }
  return newArray;
}
__name(spliceOut, "spliceOut");
var MAX_ARRAY_MAP_SIZE = SIZE / 4;
var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
__name(isList, "isList");
var List = /* @__PURE__ */ function(IndexedCollection2) {
  function List2(value) {
    var empty = emptyList();
    if (value === void 0 || value === null) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedCollection2(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function(list) {
      list.setSize(size);
      iter.forEach(function(v, i) {
        return list.set(i, v);
      });
    });
  }
  __name(List2, "List");
  if (IndexedCollection2)
    List2.__proto__ = IndexedCollection2;
  List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  List2.prototype.constructor = List2;
  List2.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  List2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("List [", "]");
  }, "toString");
  List2.prototype.get = /* @__PURE__ */ __name(function get11(index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  }, "get");
  List2.prototype.set = /* @__PURE__ */ __name(function set3(index, value) {
    return updateList(this, index, value);
  }, "set");
  List2.prototype.remove = /* @__PURE__ */ __name(function remove3(index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  }, "remove");
  List2.prototype.insert = /* @__PURE__ */ __name(function insert(index, value) {
    return this.splice(index, 0, value);
  }, "insert");
  List2.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyList();
  }, "clear");
  List2.prototype.push = /* @__PURE__ */ __name(function push() {
    var values2 = arguments;
    var oldSize = this.size;
    return this.withMutations(function(list) {
      setListBounds(list, 0, oldSize + values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(oldSize + ii, values2[ii]);
      }
    });
  }, "push");
  List2.prototype.pop = /* @__PURE__ */ __name(function pop() {
    return setListBounds(this, 0, -1);
  }, "pop");
  List2.prototype.unshift = /* @__PURE__ */ __name(function unshift() {
    var values2 = arguments;
    return this.withMutations(function(list) {
      setListBounds(list, -values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(ii, values2[ii]);
      }
    });
  }, "unshift");
  List2.prototype.shift = /* @__PURE__ */ __name(function shift() {
    return setListBounds(this, 1);
  }, "shift");
  List2.prototype.concat = /* @__PURE__ */ __name(function concat2() {
    var arguments$1 = arguments;
    var seqs = [];
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments$1[i];
      var seq = IndexedCollection2(
        typeof argument !== "string" && hasIterator(argument) ? argument : [argument]
      );
      if (seq.size !== 0) {
        seqs.push(seq);
      }
    }
    if (seqs.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
      return this.constructor(seqs[0]);
    }
    return this.withMutations(function(list) {
      seqs.forEach(function(seq2) {
        return seq2.forEach(function(value) {
          return list.push(value);
        });
      });
    });
  }, "concat");
  List2.prototype.setSize = /* @__PURE__ */ __name(function setSize(size) {
    return setListBounds(this, 0, size);
  }, "setSize");
  List2.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(list) {
      for (var i = 0; i < this$1$1.size; i++) {
        list.set(i, mapper.call(context, list.get(i), i, this$1$1));
      }
    });
  }, "map");
  List2.prototype.slice = /* @__PURE__ */ __name(function slice3(begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(
      this,
      resolveBegin(begin, size),
      resolveEnd(end, size)
    );
  }, "slice");
  List2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    return new Iterator(function() {
      var value = values2();
      return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index : index++, value);
    });
  }, "__iterator");
  List2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    var value;
    while ((value = values2()) !== DONE) {
      if (fn(value, reverse3 ? --index : index++, this) === false) {
        break;
      }
    }
    return index;
  }, "__iterate");
  List2.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyList();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeList(
      this._origin,
      this._capacity,
      this._level,
      this._root,
      this._tail,
      ownerID,
      this.__hash
    );
  }, "__ensureOwner");
  return List2;
}(IndexedCollection);
List.isList = isList;
var ListPrototype = List.prototype;
ListPrototype[IS_LIST_SYMBOL] = true;
ListPrototype[DELETE] = ListPrototype.remove;
ListPrototype.merge = ListPrototype.concat;
ListPrototype.setIn = setIn;
ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
ListPrototype.update = update;
ListPrototype.updateIn = updateIn;
ListPrototype.mergeIn = mergeIn;
ListPrototype.mergeDeepIn = mergeDeepIn;
ListPrototype.withMutations = withMutations;
ListPrototype.wasAltered = wasAltered;
ListPrototype.asImmutable = asImmutable;
ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
ListPrototype["@@transducer/step"] = function(result, arr) {
  return result.push(arr);
};
ListPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var VNode = /* @__PURE__ */ __name(function VNode2(array, ownerID) {
  this.array = array;
  this.ownerID = ownerID;
}, "VNode");
VNode.prototype.removeBefore = /* @__PURE__ */ __name(function removeBefore(ownerID, level, index) {
  if (index === level ? 1 << level : this.array.length === 0) {
    return this;
  }
  var originIndex = index >>> level & MASK;
  if (originIndex >= this.array.length) {
    return new VNode([], ownerID);
  }
  var removingFirst = originIndex === 0;
  var newChild;
  if (level > 0) {
    var oldChild = this.array[originIndex];
    newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
    if (newChild === oldChild && removingFirst) {
      return this;
    }
  }
  if (removingFirst && !newChild) {
    return this;
  }
  var editable = editableVNode(this, ownerID);
  if (!removingFirst) {
    for (var ii = 0; ii < originIndex; ii++) {
      editable.array[ii] = void 0;
    }
  }
  if (newChild) {
    editable.array[originIndex] = newChild;
  }
  return editable;
}, "removeBefore");
VNode.prototype.removeAfter = /* @__PURE__ */ __name(function removeAfter(ownerID, level, index) {
  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
    return this;
  }
  var sizeIndex = index - 1 >>> level & MASK;
  if (sizeIndex >= this.array.length) {
    return this;
  }
  var newChild;
  if (level > 0) {
    var oldChild = this.array[sizeIndex];
    newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
      return this;
    }
  }
  var editable = editableVNode(this, ownerID);
  editable.array.splice(sizeIndex + 1);
  if (newChild) {
    editable.array[sizeIndex] = newChild;
  }
  return editable;
}, "removeAfter");
var DONE = {};
function iterateList(list, reverse3) {
  var left = list._origin;
  var right = list._capacity;
  var tailPos = getTailOffset(right);
  var tail = list._tail;
  return iterateNodeOrLeaf(list._root, list._level, 0);
  function iterateNodeOrLeaf(node, level, offset) {
    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
  }
  __name(iterateNodeOrLeaf, "iterateNodeOrLeaf");
  function iterateLeaf(node, offset) {
    var array = offset === tailPos ? tail && tail.array : node && node.array;
    var from = offset > left ? 0 : left - offset;
    var to = right - offset;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      if (from === to) {
        return DONE;
      }
      var idx = reverse3 ? --to : from++;
      return array && array[idx];
    };
  }
  __name(iterateLeaf, "iterateLeaf");
  function iterateNode(node, level, offset) {
    var values2;
    var array = node && node.array;
    var from = offset > left ? 0 : left - offset >> level;
    var to = (right - offset >> level) + 1;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      while (true) {
        if (values2) {
          var value = values2();
          if (value !== DONE) {
            return value;
          }
          values2 = null;
        }
        if (from === to) {
          return DONE;
        }
        var idx = reverse3 ? --to : from++;
        values2 = iterateNodeOrLeaf(
          array && array[idx],
          level - SHIFT,
          offset + (idx << level)
        );
      }
    };
  }
  __name(iterateNode, "iterateNode");
}
__name(iterateList, "iterateList");
function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin;
  list._origin = origin;
  list._capacity = capacity;
  list._level = level;
  list._root = root;
  list._tail = tail;
  list.__ownerID = ownerID;
  list.__hash = hash2;
  list.__altered = false;
  return list;
}
__name(makeList, "makeList");
var EMPTY_LIST;
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}
__name(emptyList, "emptyList");
function updateList(list, index, value) {
  index = wrapIndex(list, index);
  if (index !== index) {
    return list;
  }
  if (index >= list.size || index < 0) {
    return list.withMutations(function(list2) {
      index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
    });
  }
  index += list._origin;
  var newTail = list._tail;
  var newRoot = list._root;
  var didAlter = MakeRef();
  if (index >= getTailOffset(list._capacity)) {
    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
  } else {
    newRoot = updateVNode(
      newRoot,
      list.__ownerID,
      list._level,
      index,
      value,
      didAlter
    );
  }
  if (!didAlter.value) {
    return list;
  }
  if (list.__ownerID) {
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
}
__name(updateList, "updateList");
function updateVNode(node, ownerID, level, index, value, didAlter) {
  var idx = index >>> level & MASK;
  var nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === void 0) {
    return node;
  }
  var newNode;
  if (level > 0) {
    var lowerNode = node && node.array[idx];
    var newLowerNode = updateVNode(
      lowerNode,
      ownerID,
      level - SHIFT,
      index,
      value,
      didAlter
    );
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }
  if (nodeHas && node.array[idx] === value) {
    return node;
  }
  if (didAlter) {
    SetRef(didAlter);
  }
  newNode = editableVNode(node, ownerID);
  if (value === void 0 && idx === newNode.array.length - 1) {
    newNode.array.pop();
  } else {
    newNode.array[idx] = value;
  }
  return newNode;
}
__name(updateVNode, "updateVNode");
function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}
__name(editableVNode, "editableVNode");
function listNodeFor(list, rawIndex) {
  if (rawIndex >= getTailOffset(list._capacity)) {
    return list._tail;
  }
  if (rawIndex < 1 << list._level + SHIFT) {
    var node = list._root;
    var level = list._level;
    while (node && level > 0) {
      node = node.array[rawIndex >>> level & MASK];
      level -= SHIFT;
    }
    return node;
  }
}
__name(listNodeFor, "listNodeFor");
function setListBounds(list, begin, end) {
  if (begin !== void 0) {
    begin |= 0;
  }
  if (end !== void 0) {
    end |= 0;
  }
  var owner = list.__ownerID || new OwnerID();
  var oldOrigin = list._origin;
  var oldCapacity = list._capacity;
  var newOrigin = oldOrigin + begin;
  var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
    return list;
  }
  if (newOrigin >= newCapacity) {
    return list.clear();
  }
  var newLevel = list._level;
  var newRoot = list._root;
  var offsetShift = 0;
  while (newOrigin + offsetShift < 0) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [void 0, newRoot] : [],
      owner
    );
    newLevel += SHIFT;
    offsetShift += 1 << newLevel;
  }
  if (offsetShift) {
    newOrigin += offsetShift;
    oldOrigin += offsetShift;
    newCapacity += offsetShift;
    oldCapacity += offsetShift;
  }
  var oldTailOffset = getTailOffset(oldCapacity);
  var newTailOffset = getTailOffset(newCapacity);
  while (newTailOffset >= 1 << newLevel + SHIFT) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [newRoot] : [],
      owner
    );
    newLevel += SHIFT;
  }
  var oldTail = list._tail;
  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
    newRoot = editableVNode(newRoot, owner);
    var node = newRoot;
    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
      var idx = oldTailOffset >>> level & MASK;
      node = node.array[idx] = editableVNode(node.array[idx], owner);
    }
    node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
  }
  if (newCapacity < oldCapacity) {
    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
  }
  if (newOrigin >= newTailOffset) {
    newOrigin -= newTailOffset;
    newCapacity -= newTailOffset;
    newLevel = SHIFT;
    newRoot = null;
    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
    offsetShift = 0;
    while (newRoot) {
      var beginIndex = newOrigin >>> newLevel & MASK;
      if (beginIndex !== newTailOffset >>> newLevel & MASK) {
        break;
      }
      if (beginIndex) {
        offsetShift += (1 << newLevel) * beginIndex;
      }
      newLevel -= SHIFT;
      newRoot = newRoot.array[beginIndex];
    }
    if (newRoot && newOrigin > oldOrigin) {
      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
    }
    if (newRoot && newTailOffset < oldTailOffset) {
      newRoot = newRoot.removeAfter(
        owner,
        newLevel,
        newTailOffset - offsetShift
      );
    }
    if (offsetShift) {
      newOrigin -= offsetShift;
      newCapacity -= offsetShift;
    }
  }
  if (list.__ownerID) {
    list.size = newCapacity - newOrigin;
    list._origin = newOrigin;
    list._capacity = newCapacity;
    list._level = newLevel;
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
}
__name(setListBounds, "setListBounds");
function getTailOffset(size) {
  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
}
__name(getTailOffset, "getTailOffset");
var OrderedMap = /* @__PURE__ */ function(Map2) {
  function OrderedMap2(value) {
    return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
      var iter = KeyedCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  __name(OrderedMap2, "OrderedMap");
  if (Map2)
    OrderedMap2.__proto__ = Map2;
  OrderedMap2.prototype = Object.create(Map2 && Map2.prototype);
  OrderedMap2.prototype.constructor = OrderedMap2;
  OrderedMap2.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  OrderedMap2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("OrderedMap {", "}");
  }, "toString");
  OrderedMap2.prototype.get = /* @__PURE__ */ __name(function get11(k, notSetValue) {
    var index = this._map.get(k);
    return index !== void 0 ? this._list.get(index)[1] : notSetValue;
  }, "get");
  OrderedMap2.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      this.__altered = true;
      return this;
    }
    return emptyOrderedMap();
  }, "clear");
  OrderedMap2.prototype.set = /* @__PURE__ */ __name(function set3(k, v) {
    return updateOrderedMap(this, k, v);
  }, "set");
  OrderedMap2.prototype.remove = /* @__PURE__ */ __name(function remove3(k) {
    return updateOrderedMap(this, k, NOT_SET);
  }, "remove");
  OrderedMap2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._list.__iterate(
      function(entry) {
        return entry && fn(entry[1], entry[0], this$1$1);
      },
      reverse3
    );
  }, "__iterate");
  OrderedMap2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return this._list.fromEntrySeq().__iterator(type, reverse3);
  }, "__iterator");
  OrderedMap2.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return emptyOrderedMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  }, "__ensureOwner");
  return OrderedMap2;
}(Map);
OrderedMap.isOrderedMap = isOrderedMap;
OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
function makeOrderedMap(map2, list, ownerID, hash2) {
  var omap = Object.create(OrderedMap.prototype);
  omap.size = map2 ? map2.size : 0;
  omap._map = map2;
  omap._list = list;
  omap.__ownerID = ownerID;
  omap.__hash = hash2;
  omap.__altered = false;
  return omap;
}
__name(makeOrderedMap, "makeOrderedMap");
var EMPTY_ORDERED_MAP;
function emptyOrderedMap() {
  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
}
__name(emptyOrderedMap, "emptyOrderedMap");
function updateOrderedMap(omap, k, v) {
  var map2 = omap._map;
  var list = omap._list;
  var i = map2.get(k);
  var has5 = i !== void 0;
  var newMap;
  var newList;
  if (v === NOT_SET) {
    if (!has5) {
      return omap;
    }
    if (list.size >= SIZE && list.size >= map2.size * 2) {
      newList = list.filter(function(entry, idx) {
        return entry !== void 0 && i !== idx;
      });
      newMap = newList.toKeyedSeq().map(function(entry) {
        return entry[0];
      }).flip().toMap();
      if (omap.__ownerID) {
        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
      }
    } else {
      newMap = map2.remove(k);
      newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
    }
  } else if (has5) {
    if (v === list.get(i)[1]) {
      return omap;
    }
    newMap = map2;
    newList = list.set(i, [k, v]);
  } else {
    newMap = map2.set(k, list.size);
    newList = list.set(list.size, [k, v]);
  }
  if (omap.__ownerID) {
    omap.size = newMap.size;
    omap._map = newMap;
    omap._list = newList;
    omap.__hash = void 0;
    omap.__altered = true;
    return omap;
  }
  return makeOrderedMap(newMap, newList);
}
__name(updateOrderedMap, "updateOrderedMap");
var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
__name(isStack, "isStack");
var Stack = /* @__PURE__ */ function(IndexedCollection2) {
  function Stack2(value) {
    return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
  }
  __name(Stack2, "Stack");
  if (IndexedCollection2)
    Stack2.__proto__ = IndexedCollection2;
  Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  Stack2.prototype.constructor = Stack2;
  Stack2.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  Stack2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Stack [", "]");
  }, "toString");
  Stack2.prototype.get = /* @__PURE__ */ __name(function get11(index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  }, "get");
  Stack2.prototype.peek = /* @__PURE__ */ __name(function peek() {
    return this._head && this._head.value;
  }, "peek");
  Stack2.prototype.push = /* @__PURE__ */ __name(function push() {
    var arguments$1 = arguments;
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments$1[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  }, "push");
  Stack2.prototype.pushAll = /* @__PURE__ */ __name(function pushAll(iter) {
    iter = IndexedCollection2(iter);
    if (iter.size === 0) {
      return this;
    }
    if (this.size === 0 && isStack(iter)) {
      return iter;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.__iterate(function(value) {
      newSize++;
      head = {
        value,
        next: head
      };
    }, true);
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  }, "pushAll");
  Stack2.prototype.pop = /* @__PURE__ */ __name(function pop() {
    return this.slice(1);
  }, "pop");
  Stack2.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = void 0;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  }, "clear");
  Stack2.prototype.slice = /* @__PURE__ */ __name(function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      return IndexedCollection2.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  }, "slice");
  Stack2.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyStack();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  }, "__ensureOwner");
  Stack2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterate(
        function(v, k) {
          return fn(v, k, this$1$1);
        },
        reverse3
      );
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  }, "__iterate");
  Stack2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterator(type, reverse3);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function() {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  }, "__iterator");
  return Stack2;
}(IndexedCollection);
Stack.isStack = isStack;
var StackPrototype = Stack.prototype;
StackPrototype[IS_STACK_SYMBOL] = true;
StackPrototype.shift = StackPrototype.pop;
StackPrototype.unshift = StackPrototype.push;
StackPrototype.unshiftAll = StackPrototype.pushAll;
StackPrototype.withMutations = withMutations;
StackPrototype.wasAltered = wasAltered;
StackPrototype.asImmutable = asImmutable;
StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
StackPrototype["@@transducer/step"] = function(result, arr) {
  return result.unshift(arr);
};
StackPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
function makeStack(size, head, ownerID, hash2) {
  var map2 = Object.create(StackPrototype);
  map2.size = size;
  map2._head = head;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
__name(makeStack, "makeStack");
var EMPTY_STACK;
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}
__name(emptyStack, "emptyStack");
var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
__name(isSet, "isSet");
function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
__name(isOrderedSet, "isOrderedSet");
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
    return false;
  }
  if (a.size === 0 && b.size === 0) {
    return true;
  }
  var notAssociative = !isAssociative(a);
  if (isOrdered(a)) {
    var entries3 = a.entries();
    return b.every(function(v, k) {
      var entry = entries3.next().value;
      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
    }) && entries3.next().done;
  }
  var flipped = false;
  if (a.size === void 0) {
    if (b.size === void 0) {
      if (typeof a.cacheResult === "function") {
        a.cacheResult();
      }
    } else {
      flipped = true;
      var _ = a;
      a = b;
      b = _;
    }
  }
  var allEqual = true;
  var bSize = b.__iterate(function(v, k) {
    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
      allEqual = false;
      return false;
    }
  });
  return allEqual && a.size === bSize;
}
__name(deepEqual, "deepEqual");
function mixin(ctor, methods) {
  var keyCopier = /* @__PURE__ */ __name(function(key) {
    ctor.prototype[key] = methods[key];
  }, "keyCopier");
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}
__name(mixin, "mixin");
function toJS(value) {
  if (!value || typeof value !== "object") {
    return value;
  }
  if (!isCollection(value)) {
    if (!isDataStructure(value)) {
      return value;
    }
    value = Seq(value);
  }
  if (isKeyed(value)) {
    var result$1 = {};
    value.__iterate(function(v, k) {
      result$1[k] = toJS(v);
    });
    return result$1;
  }
  var result = [];
  value.__iterate(function(v) {
    result.push(toJS(v));
  });
  return result;
}
__name(toJS, "toJS");
var Set = /* @__PURE__ */ function(SetCollection2) {
  function Set2(value) {
    return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
      var iter = SetCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  __name(Set2, "Set");
  if (SetCollection2)
    Set2.__proto__ = SetCollection2;
  Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
  Set2.prototype.constructor = Set2;
  Set2.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  Set2.fromKeys = /* @__PURE__ */ __name(function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  }, "fromKeys");
  Set2.intersect = /* @__PURE__ */ __name(function intersect(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
  }, "intersect");
  Set2.union = /* @__PURE__ */ __name(function union(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
  }, "union");
  Set2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Set {", "}");
  }, "toString");
  Set2.prototype.has = /* @__PURE__ */ __name(function has5(value) {
    return this._map.has(value);
  }, "has");
  Set2.prototype.add = /* @__PURE__ */ __name(function add(value) {
    return updateSet(this, this._map.set(value, value));
  }, "add");
  Set2.prototype.remove = /* @__PURE__ */ __name(function remove3(value) {
    return updateSet(this, this._map.remove(value));
  }, "remove");
  Set2.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    return updateSet(this, this._map.clear());
  }, "clear");
  Set2.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
    var this$1$1 = this;
    var didChanges = false;
    var newMap = updateSet(
      this,
      this._map.mapEntries(function(ref) {
        var v = ref[1];
        var mapped = mapper.call(context, v, v, this$1$1);
        if (mapped !== v) {
          didChanges = true;
        }
        return [mapped, mapped];
      }, context)
    );
    return didChanges ? newMap : this;
  }, "map");
  Set2.prototype.union = /* @__PURE__ */ __name(function union() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    iters = iters.filter(function(x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function(set3) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetCollection2(iters[ii]).forEach(function(value) {
          return set3.add(value);
        });
      }
    });
  }, "union");
  Set2.prototype.intersect = /* @__PURE__ */ __name(function intersect() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (!iters.every(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  }, "intersect");
  Set2.prototype.subtract = /* @__PURE__ */ __name(function subtract() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (iters.some(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  }, "subtract");
  Set2.prototype.sort = /* @__PURE__ */ __name(function sort22(comparator) {
    return OrderedSet(sortFactory(this, comparator));
  }, "sort");
  Set2.prototype.sortBy = /* @__PURE__ */ __name(function sortBy2(mapper, comparator) {
    return OrderedSet(sortFactory(this, comparator, mapper));
  }, "sortBy");
  Set2.prototype.wasAltered = /* @__PURE__ */ __name(function wasAltered3() {
    return this._map.wasAltered();
  }, "wasAltered");
  Set2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._map.__iterate(function(k) {
      return fn(k, k, this$1$1);
    }, reverse3);
  }, "__iterate");
  Set2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return this._map.__iterator(type, reverse3);
  }, "__iterator");
  Set2.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return this.__empty();
      }
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  }, "__ensureOwner");
  return Set2;
}(SetCollection);
Set.isSet = isSet;
var SetPrototype = Set.prototype;
SetPrototype[IS_SET_SYMBOL] = true;
SetPrototype[DELETE] = SetPrototype.remove;
SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
SetPrototype.withMutations = withMutations;
SetPrototype.asImmutable = asImmutable;
SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
SetPrototype["@@transducer/step"] = function(result, arr) {
  return result.add(arr);
};
SetPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
SetPrototype.__empty = emptySet;
SetPrototype.__make = makeSet;
function updateSet(set3, newMap) {
  if (set3.__ownerID) {
    set3.size = newMap.size;
    set3._map = newMap;
    return set3;
  }
  return newMap === set3._map ? set3 : newMap.size === 0 ? set3.__empty() : set3.__make(newMap);
}
__name(updateSet, "updateSet");
function makeSet(map2, ownerID) {
  var set3 = Object.create(SetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
__name(makeSet, "makeSet");
var EMPTY_SET;
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}
__name(emptySet, "emptySet");
var Range = /* @__PURE__ */ function(IndexedSeq2) {
  function Range2(start, end, step) {
    if (!(this instanceof Range2)) {
      return new Range2(start, end, step);
    }
    invariant(step !== 0, "Cannot step a Range by 0");
    start = start || 0;
    if (end === void 0) {
      end = Infinity;
    }
    step = step === void 0 ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }
  __name(Range2, "Range");
  if (IndexedSeq2)
    Range2.__proto__ = IndexedSeq2;
  Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  Range2.prototype.constructor = Range2;
  Range2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    if (this.size === 0) {
      return "Range []";
    }
    return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString");
  Range2.prototype.get = /* @__PURE__ */ __name(function get11(index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  }, "get");
  Range2.prototype.includes = /* @__PURE__ */ __name(function includes3(searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  }, "includes");
  Range2.prototype.slice = /* @__PURE__ */ __name(function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range2(0, 0);
    }
    return new Range2(
      this.get(begin, this._end),
      this.get(end, this._end),
      this._step
    );
  }, "slice");
  Range2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf2(searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  }, "indexOf");
  Range2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf2(searchValue) {
    return this.indexOf(searchValue);
  }, "lastIndexOf");
  Range2.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    while (i !== size) {
      if (fn(value, reverse3 ? size - ++i : i++, this) === false) {
        break;
      }
      value += reverse3 ? -step : step;
    }
    return i;
  }, "__iterate");
  Range2.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var v = value;
      value += reverse3 ? -step : step;
      return iteratorValue(type, reverse3 ? size - ++i : i++, v);
    });
  }, "__iterator");
  Range2.prototype.equals = /* @__PURE__ */ __name(function equals3(other) {
    return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  }, "equals");
  return Range2;
}(IndexedSeq);
var EMPTY_RANGE;
function getIn$1(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
__name(getIn$1, "getIn$1");
function getIn(searchKeyPath, notSetValue) {
  return getIn$1(this, searchKeyPath, notSetValue);
}
__name(getIn, "getIn");
function hasIn$1(collection, keyPath) {
  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
}
__name(hasIn$1, "hasIn$1");
function hasIn(searchKeyPath) {
  return hasIn$1(this, searchKeyPath);
}
__name(hasIn, "hasIn");
function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function(v, k) {
    object[k] = v;
  });
  return object;
}
__name(toObject, "toObject");
Collection.isIterable = isCollection;
Collection.isKeyed = isKeyed;
Collection.isIndexed = isIndexed;
Collection.isAssociative = isAssociative;
Collection.isOrdered = isOrdered;
Collection.Iterator = Iterator;
mixin(Collection, {
  toArray: /* @__PURE__ */ __name(function toArray() {
    assertNotInfinite(this.size);
    var array = new Array(this.size || 0);
    var useTuples = isKeyed(this);
    var i = 0;
    this.__iterate(function(v, k) {
      array[i++] = useTuples ? [k, v] : v;
    });
    return array;
  }, "toArray"),
  toIndexedSeq: /* @__PURE__ */ __name(function toIndexedSeq() {
    return new ToIndexedSequence(this);
  }, "toIndexedSeq"),
  toJS: /* @__PURE__ */ __name(function toJS$1() {
    return toJS(this);
  }, "toJS$1"),
  toKeyedSeq: /* @__PURE__ */ __name(function toKeyedSeq() {
    return new ToKeyedSequence(this, true);
  }, "toKeyedSeq"),
  toMap: /* @__PURE__ */ __name(function toMap() {
    return Map(this.toKeyedSeq());
  }, "toMap"),
  toObject,
  toOrderedMap: /* @__PURE__ */ __name(function toOrderedMap() {
    return OrderedMap(this.toKeyedSeq());
  }, "toOrderedMap"),
  toOrderedSet: /* @__PURE__ */ __name(function toOrderedSet() {
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  }, "toOrderedSet"),
  toSet: /* @__PURE__ */ __name(function toSet() {
    return Set(isKeyed(this) ? this.valueSeq() : this);
  }, "toSet"),
  toSetSeq: /* @__PURE__ */ __name(function toSetSeq() {
    return new ToSetSequence(this);
  }, "toSetSeq"),
  toSeq: /* @__PURE__ */ __name(function toSeq() {
    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
  }, "toSeq"),
  toStack: /* @__PURE__ */ __name(function toStack() {
    return Stack(isKeyed(this) ? this.valueSeq() : this);
  }, "toStack"),
  toList: /* @__PURE__ */ __name(function toList() {
    return List(isKeyed(this) ? this.valueSeq() : this);
  }, "toList"),
  toString: /* @__PURE__ */ __name(function toString3() {
    return "[Collection]";
  }, "toString"),
  __toString: /* @__PURE__ */ __name(function __toString(head, tail) {
    if (this.size === 0) {
      return head + tail;
    }
    return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
  }, "__toString"),
  concat: /* @__PURE__ */ __name(function concat() {
    var values2 = [], len = arguments.length;
    while (len--)
      values2[len] = arguments[len];
    return reify(this, concatFactory(this, values2));
  }, "concat"),
  includes: /* @__PURE__ */ __name(function includes(searchValue) {
    return this.some(function(value) {
      return is(value, searchValue);
    });
  }, "includes"),
  entries: /* @__PURE__ */ __name(function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  }, "entries"),
  every: /* @__PURE__ */ __name(function every(predicate, context) {
    assertNotInfinite(this.size);
    var returnValue = true;
    this.__iterate(function(v, k, c) {
      if (!predicate.call(context, v, k, c)) {
        returnValue = false;
        return false;
      }
    });
    return returnValue;
  }, "every"),
  filter: /* @__PURE__ */ __name(function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, true));
  }, "filter"),
  find: /* @__PURE__ */ __name(function find(predicate, context, notSetValue) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[1] : notSetValue;
  }, "find"),
  forEach: /* @__PURE__ */ __name(function forEach(sideEffect, context) {
    assertNotInfinite(this.size);
    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
  }, "forEach"),
  join: /* @__PURE__ */ __name(function join(separator) {
    assertNotInfinite(this.size);
    separator = separator !== void 0 ? "" + separator : ",";
    var joined = "";
    var isFirst = true;
    this.__iterate(function(v) {
      isFirst ? isFirst = false : joined += separator;
      joined += v !== null && v !== void 0 ? v.toString() : "";
    });
    return joined;
  }, "join"),
  keys: /* @__PURE__ */ __name(function keys() {
    return this.__iterator(ITERATE_KEYS);
  }, "keys"),
  map: /* @__PURE__ */ __name(function map(mapper, context) {
    return reify(this, mapFactory(this, mapper, context));
  }, "map"),
  reduce: /* @__PURE__ */ __name(function reduce$1(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      false
    );
  }, "reduce$1"),
  reduceRight: /* @__PURE__ */ __name(function reduceRight(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      true
    );
  }, "reduceRight"),
  reverse: /* @__PURE__ */ __name(function reverse() {
    return reify(this, reverseFactory(this, true));
  }, "reverse"),
  slice: /* @__PURE__ */ __name(function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, true));
  }, "slice"),
  some: /* @__PURE__ */ __name(function some(predicate, context) {
    return !this.every(not(predicate), context);
  }, "some"),
  sort: /* @__PURE__ */ __name(function sort(comparator) {
    return reify(this, sortFactory(this, comparator));
  }, "sort"),
  values: /* @__PURE__ */ __name(function values() {
    return this.__iterator(ITERATE_VALUES);
  }, "values"),
  butLast: /* @__PURE__ */ __name(function butLast() {
    return this.slice(0, -1);
  }, "butLast"),
  isEmpty: /* @__PURE__ */ __name(function isEmpty() {
    return this.size !== void 0 ? this.size === 0 : !this.some(function() {
      return true;
    });
  }, "isEmpty"),
  count: /* @__PURE__ */ __name(function count(predicate, context) {
    return ensureSize(
      predicate ? this.toSeq().filter(predicate, context) : this
    );
  }, "count"),
  countBy: /* @__PURE__ */ __name(function countBy(grouper, context) {
    return countByFactory(this, grouper, context);
  }, "countBy"),
  equals: /* @__PURE__ */ __name(function equals(other) {
    return deepEqual(this, other);
  }, "equals"),
  entrySeq: /* @__PURE__ */ __name(function entrySeq() {
    var collection = this;
    if (collection._cache) {
      return new ArraySeq(collection._cache);
    }
    var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
    entriesSequence.fromEntrySeq = function() {
      return collection.toSeq();
    };
    return entriesSequence;
  }, "entrySeq"),
  filterNot: /* @__PURE__ */ __name(function filterNot(predicate, context) {
    return this.filter(not(predicate), context);
  }, "filterNot"),
  findEntry: /* @__PURE__ */ __name(function findEntry(predicate, context, notSetValue) {
    var found = notSetValue;
    this.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        found = [k, v];
        return false;
      }
    });
    return found;
  }, "findEntry"),
  findKey: /* @__PURE__ */ __name(function findKey(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry && entry[0];
  }, "findKey"),
  findLast: /* @__PURE__ */ __name(function findLast(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
  }, "findLast"),
  findLastEntry: /* @__PURE__ */ __name(function findLastEntry(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
  }, "findLastEntry"),
  findLastKey: /* @__PURE__ */ __name(function findLastKey(predicate, context) {
    return this.toKeyedSeq().reverse().findKey(predicate, context);
  }, "findLastKey"),
  first: /* @__PURE__ */ __name(function first(notSetValue) {
    return this.find(returnTrue, null, notSetValue);
  }, "first"),
  flatMap: /* @__PURE__ */ __name(function flatMap(mapper, context) {
    return reify(this, flatMapFactory(this, mapper, context));
  }, "flatMap"),
  flatten: /* @__PURE__ */ __name(function flatten(depth) {
    return reify(this, flattenFactory(this, depth, true));
  }, "flatten"),
  fromEntrySeq: /* @__PURE__ */ __name(function fromEntrySeq() {
    return new FromEntriesSequence(this);
  }, "fromEntrySeq"),
  get: /* @__PURE__ */ __name(function get7(searchKey, notSetValue) {
    return this.find(function(_, key) {
      return is(key, searchKey);
    }, void 0, notSetValue);
  }, "get"),
  getIn,
  groupBy: /* @__PURE__ */ __name(function groupBy(grouper, context) {
    return groupByFactory(this, grouper, context);
  }, "groupBy"),
  has: /* @__PURE__ */ __name(function has2(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  }, "has"),
  hasIn,
  isSubset: /* @__PURE__ */ __name(function isSubset(iter) {
    iter = typeof iter.includes === "function" ? iter : Collection(iter);
    return this.every(function(value) {
      return iter.includes(value);
    });
  }, "isSubset"),
  isSuperset: /* @__PURE__ */ __name(function isSuperset(iter) {
    iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
    return iter.isSubset(this);
  }, "isSuperset"),
  keyOf: /* @__PURE__ */ __name(function keyOf(searchValue) {
    return this.findKey(function(value) {
      return is(value, searchValue);
    });
  }, "keyOf"),
  keySeq: /* @__PURE__ */ __name(function keySeq() {
    return this.toSeq().map(keyMapper).toIndexedSeq();
  }, "keySeq"),
  last: /* @__PURE__ */ __name(function last(notSetValue) {
    return this.toSeq().reverse().first(notSetValue);
  }, "last"),
  lastKeyOf: /* @__PURE__ */ __name(function lastKeyOf(searchValue) {
    return this.toKeyedSeq().reverse().keyOf(searchValue);
  }, "lastKeyOf"),
  max: /* @__PURE__ */ __name(function max(comparator) {
    return maxFactory(this, comparator);
  }, "max"),
  maxBy: /* @__PURE__ */ __name(function maxBy(mapper, comparator) {
    return maxFactory(this, comparator, mapper);
  }, "maxBy"),
  min: /* @__PURE__ */ __name(function min(comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator
    );
  }, "min"),
  minBy: /* @__PURE__ */ __name(function minBy(mapper, comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator,
      mapper
    );
  }, "minBy"),
  rest: /* @__PURE__ */ __name(function rest() {
    return this.slice(1);
  }, "rest"),
  skip: /* @__PURE__ */ __name(function skip(amount) {
    return amount === 0 ? this : this.slice(Math.max(0, amount));
  }, "skip"),
  skipLast: /* @__PURE__ */ __name(function skipLast(amount) {
    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
  }, "skipLast"),
  skipWhile: /* @__PURE__ */ __name(function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, true));
  }, "skipWhile"),
  skipUntil: /* @__PURE__ */ __name(function skipUntil(predicate, context) {
    return this.skipWhile(not(predicate), context);
  }, "skipUntil"),
  sortBy: /* @__PURE__ */ __name(function sortBy(mapper, comparator) {
    return reify(this, sortFactory(this, comparator, mapper));
  }, "sortBy"),
  take: /* @__PURE__ */ __name(function take(amount) {
    return this.slice(0, Math.max(0, amount));
  }, "take"),
  takeLast: /* @__PURE__ */ __name(function takeLast(amount) {
    return this.slice(-Math.max(0, amount));
  }, "takeLast"),
  takeWhile: /* @__PURE__ */ __name(function takeWhile(predicate, context) {
    return reify(this, takeWhileFactory(this, predicate, context));
  }, "takeWhile"),
  takeUntil: /* @__PURE__ */ __name(function takeUntil(predicate, context) {
    return this.takeWhile(not(predicate), context);
  }, "takeUntil"),
  update: /* @__PURE__ */ __name(function update7(fn) {
    return fn(this);
  }, "update"),
  valueSeq: /* @__PURE__ */ __name(function valueSeq() {
    return this.toIndexedSeq();
  }, "valueSeq"),
  hashCode: /* @__PURE__ */ __name(function hashCode() {
    return this.__hash || (this.__hash = hashCollection(this));
  }, "hashCode")
});
var CollectionPrototype = Collection.prototype;
CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
CollectionPrototype.toJSON = CollectionPrototype.toArray;
CollectionPrototype.__toStringMapper = quoteString;
CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
  return this.toString();
};
CollectionPrototype.chain = CollectionPrototype.flatMap;
CollectionPrototype.contains = CollectionPrototype.includes;
mixin(KeyedCollection, {
  flip: /* @__PURE__ */ __name(function flip() {
    return reify(this, flipFactory(this));
  }, "flip"),
  mapEntries: /* @__PURE__ */ __name(function mapEntries(mapper, context) {
    var this$1$1 = this;
    var iterations = 0;
    return reify(
      this,
      this.toSeq().map(function(v, k) {
        return mapper.call(context, [k, v], iterations++, this$1$1);
      }).fromEntrySeq()
    );
  }, "mapEntries"),
  mapKeys: /* @__PURE__ */ __name(function mapKeys(mapper, context) {
    var this$1$1 = this;
    return reify(
      this,
      this.toSeq().flip().map(function(k, v) {
        return mapper.call(context, k, v, this$1$1);
      }).flip()
    );
  }, "mapKeys")
});
var KeyedCollectionPrototype = KeyedCollection.prototype;
KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
KeyedCollectionPrototype.toJSON = toObject;
KeyedCollectionPrototype.__toStringMapper = function(v, k) {
  return quoteString(k) + ": " + quoteString(v);
};
mixin(IndexedCollection, {
  toKeyedSeq: /* @__PURE__ */ __name(function toKeyedSeq2() {
    return new ToKeyedSequence(this, false);
  }, "toKeyedSeq"),
  filter: /* @__PURE__ */ __name(function filter2(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, false));
  }, "filter"),
  findIndex: /* @__PURE__ */ __name(function findIndex(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[0] : -1;
  }, "findIndex"),
  indexOf: /* @__PURE__ */ __name(function indexOf(searchValue) {
    var key = this.keyOf(searchValue);
    return key === void 0 ? -1 : key;
  }, "indexOf"),
  lastIndexOf: /* @__PURE__ */ __name(function lastIndexOf(searchValue) {
    var key = this.lastKeyOf(searchValue);
    return key === void 0 ? -1 : key;
  }, "lastIndexOf"),
  reverse: /* @__PURE__ */ __name(function reverse2() {
    return reify(this, reverseFactory(this, false));
  }, "reverse"),
  slice: /* @__PURE__ */ __name(function slice2(begin, end) {
    return reify(this, sliceFactory(this, begin, end, false));
  }, "slice"),
  splice: /* @__PURE__ */ __name(function splice(index, removeNum) {
    var numArgs = arguments.length;
    removeNum = Math.max(removeNum || 0, 0);
    if (numArgs === 0 || numArgs === 2 && !removeNum) {
      return this;
    }
    index = resolveBegin(index, index < 0 ? this.count() : this.size);
    var spliced = this.slice(0, index);
    return reify(
      this,
      numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
    );
  }, "splice"),
  findLastIndex: /* @__PURE__ */ __name(function findLastIndex(predicate, context) {
    var entry = this.findLastEntry(predicate, context);
    return entry ? entry[0] : -1;
  }, "findLastIndex"),
  first: /* @__PURE__ */ __name(function first2(notSetValue) {
    return this.get(0, notSetValue);
  }, "first"),
  flatten: /* @__PURE__ */ __name(function flatten2(depth) {
    return reify(this, flattenFactory(this, depth, false));
  }, "flatten"),
  get: /* @__PURE__ */ __name(function get8(index, notSetValue) {
    index = wrapIndex(this, index);
    return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
      return key === index;
    }, void 0, notSetValue);
  }, "get"),
  has: /* @__PURE__ */ __name(function has3(index) {
    index = wrapIndex(this, index);
    return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
  }, "has"),
  interpose: /* @__PURE__ */ __name(function interpose(separator) {
    return reify(this, interposeFactory(this, separator));
  }, "interpose"),
  interleave: /* @__PURE__ */ __name(function interleave() {
    var collections = [this].concat(arrCopy(arguments));
    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
    var interleaved = zipped.flatten(true);
    if (zipped.size) {
      interleaved.size = zipped.size * collections.length;
    }
    return reify(this, interleaved);
  }, "interleave"),
  keySeq: /* @__PURE__ */ __name(function keySeq2() {
    return Range(0, this.size);
  }, "keySeq"),
  last: /* @__PURE__ */ __name(function last2(notSetValue) {
    return this.get(-1, notSetValue);
  }, "last"),
  skipWhile: /* @__PURE__ */ __name(function skipWhile2(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, false));
  }, "skipWhile"),
  zip: /* @__PURE__ */ __name(function zip() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections));
  }, "zip"),
  zipAll: /* @__PURE__ */ __name(function zipAll() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
  }, "zipAll"),
  zipWith: /* @__PURE__ */ __name(function zipWith(zipper) {
    var collections = arrCopy(arguments);
    collections[0] = this;
    return reify(this, zipWithFactory(this, zipper, collections));
  }, "zipWith")
});
var IndexedCollectionPrototype = IndexedCollection.prototype;
IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
mixin(SetCollection, {
  get: /* @__PURE__ */ __name(function get9(value, notSetValue) {
    return this.has(value) ? value : notSetValue;
  }, "get"),
  includes: /* @__PURE__ */ __name(function includes2(value) {
    return this.has(value);
  }, "includes"),
  keySeq: /* @__PURE__ */ __name(function keySeq3() {
    return this.valueSeq();
  }, "keySeq")
});
var SetCollectionPrototype = SetCollection.prototype;
SetCollectionPrototype.has = CollectionPrototype.includes;
SetCollectionPrototype.contains = SetCollectionPrototype.includes;
SetCollectionPrototype.keys = SetCollectionPrototype.values;
mixin(KeyedSeq, KeyedCollectionPrototype);
mixin(IndexedSeq, IndexedCollectionPrototype);
mixin(SetSeq, SetCollectionPrototype);
function reduce(collection, reducer, reduction, context, useFirst, reverse3) {
  assertNotInfinite(collection.size);
  collection.__iterate(function(v, k, c) {
    if (useFirst) {
      useFirst = false;
      reduction = v;
    } else {
      reduction = reducer.call(context, reduction, v, k, c);
    }
  }, reverse3);
  return reduction;
}
__name(reduce, "reduce");
function keyMapper(v, k) {
  return k;
}
__name(keyMapper, "keyMapper");
function entryMapper(v, k) {
  return [k, v];
}
__name(entryMapper, "entryMapper");
function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
__name(not, "not");
function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}
__name(neg, "neg");
function defaultZipper() {
  return arrCopy(arguments);
}
__name(defaultZipper, "defaultZipper");
function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
__name(defaultNegComparator, "defaultNegComparator");
function hashCollection(collection) {
  if (collection.size === Infinity) {
    return 0;
  }
  var ordered = isOrdered(collection);
  var keyed = isKeyed(collection);
  var h = ordered ? 1 : 0;
  var size = collection.__iterate(
    keyed ? ordered ? function(v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function(v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function(v) {
      h = 31 * h + hash(v) | 0;
    } : function(v) {
      h = h + hash(v) | 0;
    }
  );
  return murmurHashOfSize(size, h);
}
__name(hashCollection, "hashCollection");
function murmurHashOfSize(size, h) {
  h = imul(h, 3432918353);
  h = imul(h << 15 | h >>> -15, 461845907);
  h = imul(h << 13 | h >>> -13, 5);
  h = (h + 3864292196 | 0) ^ size;
  h = imul(h ^ h >>> 16, 2246822507);
  h = imul(h ^ h >>> 13, 3266489909);
  h = smi(h ^ h >>> 16);
  return h;
}
__name(murmurHashOfSize, "murmurHashOfSize");
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
__name(hashMerge, "hashMerge");
var OrderedSet = /* @__PURE__ */ function(Set2) {
  function OrderedSet2(value) {
    return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
      var iter = SetCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  __name(OrderedSet2, "OrderedSet");
  if (Set2)
    OrderedSet2.__proto__ = Set2;
  OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
  OrderedSet2.prototype.constructor = OrderedSet2;
  OrderedSet2.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  OrderedSet2.fromKeys = /* @__PURE__ */ __name(function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  }, "fromKeys");
  OrderedSet2.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("OrderedSet {", "}");
  }, "toString");
  return OrderedSet2;
}(Set);
OrderedSet.isOrderedSet = isOrderedSet;
var OrderedSetPrototype = OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
OrderedSetPrototype.__empty = emptyOrderedSet;
OrderedSetPrototype.__make = makeOrderedSet;
function makeOrderedSet(map2, ownerID) {
  var set3 = Object.create(OrderedSetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
__name(makeOrderedSet, "makeOrderedSet");
var EMPTY_ORDERED_SET;
function emptyOrderedSet() {
  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
}
__name(emptyOrderedSet, "emptyOrderedSet");
function throwOnInvalidDefaultValues(defaultValues) {
  if (isRecord(defaultValues)) {
    throw new Error(
      "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
    );
  }
  if (isImmutable(defaultValues)) {
    throw new Error(
      "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
    );
  }
  if (defaultValues === null || typeof defaultValues !== "object") {
    throw new Error(
      "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
    );
  }
}
__name(throwOnInvalidDefaultValues, "throwOnInvalidDefaultValues");
var Record = /* @__PURE__ */ __name(function Record2(defaultValues, name) {
  var hasInitialized;
  throwOnInvalidDefaultValues(defaultValues);
  var RecordType = /* @__PURE__ */ __name(function Record3(values2) {
    var this$1$1 = this;
    if (values2 instanceof RecordType) {
      return values2;
    }
    if (!(this instanceof RecordType)) {
      return new RecordType(values2);
    }
    if (!hasInitialized) {
      hasInitialized = true;
      var keys2 = Object.keys(defaultValues);
      var indices = RecordTypePrototype._indices = {};
      RecordTypePrototype._name = name;
      RecordTypePrototype._keys = keys2;
      RecordTypePrototype._defaultValues = defaultValues;
      for (var i = 0; i < keys2.length; i++) {
        var propName = keys2[i];
        indices[propName] = i;
        if (RecordTypePrototype[propName]) {
          typeof console === "object" && console.warn && console.warn(
            "Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.'
          );
        } else {
          setProp(RecordTypePrototype, propName);
        }
      }
    }
    this.__ownerID = void 0;
    this._values = List().withMutations(function(l) {
      l.setSize(this$1$1._keys.length);
      KeyedCollection(values2).forEach(function(v, k) {
        l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
      });
    });
    return this;
  }, "Record");
  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
  RecordTypePrototype.constructor = RecordType;
  if (name) {
    RecordType.displayName = name;
  }
  return RecordType;
}, "Record");
Record.prototype.toString = /* @__PURE__ */ __name(function toString4() {
  var str = recordName(this) + " { ";
  var keys2 = this._keys;
  var k;
  for (var i = 0, l = keys2.length; i !== l; i++) {
    k = keys2[i];
    str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
  }
  return str + " }";
}, "toString");
Record.prototype.equals = /* @__PURE__ */ __name(function equals2(other) {
  return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
}, "equals");
Record.prototype.hashCode = /* @__PURE__ */ __name(function hashCode2() {
  return recordSeq(this).hashCode();
}, "hashCode");
Record.prototype.has = /* @__PURE__ */ __name(function has4(k) {
  return this._indices.hasOwnProperty(k);
}, "has");
Record.prototype.get = /* @__PURE__ */ __name(function get10(k, notSetValue) {
  if (!this.has(k)) {
    return notSetValue;
  }
  var index = this._indices[k];
  var value = this._values.get(index);
  return value === void 0 ? this._defaultValues[k] : value;
}, "get");
Record.prototype.set = /* @__PURE__ */ __name(function set2(k, v) {
  if (this.has(k)) {
    var newValues = this._values.set(
      this._indices[k],
      v === this._defaultValues[k] ? void 0 : v
    );
    if (newValues !== this._values && !this.__ownerID) {
      return makeRecord(this, newValues);
    }
  }
  return this;
}, "set");
Record.prototype.remove = /* @__PURE__ */ __name(function remove2(k) {
  return this.set(k);
}, "remove");
Record.prototype.clear = /* @__PURE__ */ __name(function clear() {
  var newValues = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : makeRecord(this, newValues);
}, "clear");
Record.prototype.wasAltered = /* @__PURE__ */ __name(function wasAltered2() {
  return this._values.wasAltered();
}, "wasAltered");
Record.prototype.toSeq = /* @__PURE__ */ __name(function toSeq2() {
  return recordSeq(this);
}, "toSeq");
Record.prototype.toJS = /* @__PURE__ */ __name(function toJS$12() {
  return toJS(this);
}, "toJS$1");
Record.prototype.entries = /* @__PURE__ */ __name(function entries2() {
  return this.__iterator(ITERATE_ENTRIES);
}, "entries");
Record.prototype.__iterator = /* @__PURE__ */ __name(function __iterator(type, reverse3) {
  return recordSeq(this).__iterator(type, reverse3);
}, "__iterator");
Record.prototype.__iterate = /* @__PURE__ */ __name(function __iterate(fn, reverse3) {
  return recordSeq(this).__iterate(fn, reverse3);
}, "__iterate");
Record.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner(ownerID) {
  if (ownerID === this.__ownerID) {
    return this;
  }
  var newValues = this._values.__ensureOwner(ownerID);
  if (!ownerID) {
    this.__ownerID = ownerID;
    this._values = newValues;
    return this;
  }
  return makeRecord(this, newValues, ownerID);
}, "__ensureOwner");
Record.isRecord = isRecord;
Record.getDescriptiveName = recordName;
var RecordPrototype = Record.prototype;
RecordPrototype[IS_RECORD_SYMBOL] = true;
RecordPrototype[DELETE] = RecordPrototype.remove;
RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
RecordPrototype.getIn = getIn;
RecordPrototype.hasIn = CollectionPrototype.hasIn;
RecordPrototype.merge = merge$1;
RecordPrototype.mergeWith = mergeWith$1;
RecordPrototype.mergeIn = mergeIn;
RecordPrototype.mergeDeep = mergeDeep;
RecordPrototype.mergeDeepWith = mergeDeepWith;
RecordPrototype.mergeDeepIn = mergeDeepIn;
RecordPrototype.setIn = setIn;
RecordPrototype.update = update;
RecordPrototype.updateIn = updateIn;
RecordPrototype.withMutations = withMutations;
RecordPrototype.asMutable = asMutable;
RecordPrototype.asImmutable = asImmutable;
RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
RecordPrototype.inspect = RecordPrototype.toSource = function() {
  return this.toString();
};
function makeRecord(likeRecord, values2, ownerID) {
  var record = Object.create(Object.getPrototypeOf(likeRecord));
  record._values = values2;
  record.__ownerID = ownerID;
  return record;
}
__name(makeRecord, "makeRecord");
function recordName(record) {
  return record.constructor.displayName || record.constructor.name || "Record";
}
__name(recordName, "recordName");
function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function(k) {
    return [k, record.get(k)];
  }));
}
__name(recordSeq, "recordSeq");
function setProp(prototype, name) {
  try {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, "Cannot set on an immutable record.");
        this.set(name, value);
      }
    });
  } catch (error) {
  }
}
__name(setProp, "setProp");
var import_lodash = __toESM2(require_lodash(), 1);
init_define_process();
var md5 = /* @__PURE__ */ __name((code) => md5FULL(code).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8), "md5");
function md5FULL(inputString) {
  const hc = "0123456789abcdef";
  function rh(n) {
    let j;
    let s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  __name(rh, "rh");
  function ad(x2, y) {
    const l = (x2 & 65535) + (y & 65535);
    const m = (x2 >> 16) + (y >> 16) + (l >> 16);
    return m << 16 | l & 65535;
  }
  __name(ad, "ad");
  function rl(n, c2) {
    return n << c2 | n >>> 32 - c2;
  }
  __name(rl, "rl");
  function cm(q, a2, b2, x2, s, t) {
    return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
  }
  __name(cm, "cm");
  function ff(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
  }
  __name(ff, "ff");
  function gg(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
  }
  __name(gg, "gg");
  function hh(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
  }
  __name(hh, "hh");
  function ii(a2, b2, c2, d2, x2, s, t) {
    return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
  }
  __name(ii, "ii");
  function sb(x2) {
    let i2;
    const nblk = (x2.length + 8 >> 6) + 1;
    const blks = Array.from({ length: nblk * 16 });
    for (i2 = 0; i2 < nblk * 16; i2++) {
      blks[i2] = 0;
    }
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  __name(sb, "sb");
  let i;
  const x = sb(inputString);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  let olda;
  let oldb;
  let oldc;
  let oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}
__name(md5FULL, "md5FULL");
init_define_process();
var resetCSS = `
*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
all: unset;
display: revert;
}

*,
*::before,
*::after {
box-sizing: border-box;
}

a, button {
cursor: revert;
}

ol, ul, menu {
list-style: none;
}

img {
max-width: 100%;
}

table {
border-collapse: collapse;
}

input, textarea {
-webkit-user-select: auto;
}

textarea {
white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
-webkit-appearance: revert;
appearance: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
color: unset;
}

/* fix the feature of 'hidden' attribute.
display:revert; revert to element instead of a/live/editttribute */
:where([hidden]) {
display: none;
}

/* revert for bug in Chromium browsers
- fix for the content editable attribute will work properly.
- webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
:where([contenteditable]:not([contenteditable="false"])) {
-moz-user-modify: read-write;
-webkit-user-modify: read-write;
overflow-wrap: break-word;
-webkit-line-break: after-white-space;
-webkit-user-select: auto;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
-webkit-user-drag: element;
}`;
init_define_process();
var importmap_default = {
  imports: {
    "framer-motion": "/motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/cache": "/emotionCache.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    react: "/reactMod.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom": "/reactDom.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "react-error-boundary": "/reactMod.mjs",
    "hydrate.mjs": "/hydrate.mjs",
    "load.mjs": "/load.mjs"
  }
};
var importMapImports = importmap_default.imports;
function importMapReplace(codeInp, origin, relativeUrl, importmapRep = true) {
  const items = Object.keys(
    importMapImports
  );
  let returnStr = codeInp;
  if (!returnStr)
    return returnStr;
  const url = relativeUrl || origin;
  const baSe = new URL(".", url).toString();
  const parent = new URL("..", url).toString();
  const gParent = new URL("../..", url).toString();
  const ggParent = new URL("../../..", url).toString();
  returnStr = replaceAll(
    returnStr,
    `reference path="./`,
    `reference path="${baSe}`
  );
  returnStr = replaceAll(returnStr, `import"`, `import "`);
  returnStr = replaceAll(returnStr, ` from "../../../`, ` from "${ggParent}`);
  returnStr = replaceAll(
    returnStr,
    `import("../../../`,
    ` import("${ggParent}`
  );
  returnStr = replaceAll(returnStr, `import("../../`, ` import("${gParent}`);
  returnStr = replaceAll(returnStr, `import("../`, ` import("${parent}`);
  returnStr = replaceAll(returnStr, `import("./`, ` import("${baSe}`);
  returnStr = replaceAll(
    returnStr,
    `import "../../../`,
    ` import "${ggParent}`
  );
  returnStr = replaceAll(returnStr, `import "../../`, ` import "${gParent}`);
  returnStr = replaceAll(returnStr, `import "../`, ` import "${parent}`);
  returnStr = replaceAll(returnStr, `import "./`, ` import "${baSe}`);
  returnStr = replaceAll(returnStr, ` from "../../`, ` from "${gParent}`);
  returnStr = replaceAll(returnStr, ` from "../`, ` from "${parent}`);
  returnStr = replaceAll(returnStr, ` from "./`, ` from "${baSe}`);
  items.map((lib) => {
    const uri = new URL(importMapImports[lib], origin).toString();
    returnStr = replaceAll(returnStr, `from"`, `from "`);
    if (importmapRep) {
      returnStr = replaceAll(returnStr, ` from "${lib}"`, ` from "${uri}"`);
    }
    returnStr = replaceAll(returnStr, ` from "./`, ` from "${origin}/live/`);
    returnStr = replaceAll(returnStr, ` from "/`, ` from "${origin}/`);
  });
  console.log("importmapReplace fn");
  returnStr = returnStr.split(";").map((x) => x.indexOf("import") !== -1 ? x.trim() : x).map(
    (Y) => Y.split("\n").map((x) => {
      if (x.length === 0 || x.indexOf("import") === -1)
        return x;
      if (x.startsWith("import") && x.indexOf(`"`) !== -1 && x.indexOf(`"https://`) === -1) {
        const slices = x.split(`"`);
        slices[1] = origin + "/npm:/*" + slices[1] + "?bundle&target=es2020&keep-names=true&dev=true";
        return slices.join(`"`);
      }
      if (x.indexOf("/node_process.js") !== -1 || x.indexOf("/node_buffer.js") !== -1 || x.indexOf("@babel/runtime") !== -1) {
        const slices = x.split(`"`);
        const oldUrl = new URL(slices[1]);
        slices[1] = origin + "/npm:" + oldUrl.pathname;
        return slices.join(`"`);
      }
      if (x.indexOf("/npm:/") === -1 && x.startsWith("import") && x.indexOf(origin) !== -1) {
        let u = new URL(x.split(`"`)[1]);
        if (u && u.pathname.indexOf(".") === -1) {
          return x.slice(0, -1) + `/index.js"`;
        }
      }
      return x;
    }).join("\n")
  ).join(";");
  if (relativeUrl.indexOf("esm.sh") === -1) {
    returnStr = returnStr.split("https://esm.sh").join(relativeUrl + "/npm:").split("npm:/npm:").join("npm:").split(
      "npm:/*/"
    ).join(
      "npm:/"
    );
  }
  return returnStr;
}
__name(importMapReplace, "importMapReplace");
function replaceAll(inp, search, replace) {
  if (!inp)
    return inp;
  return inp.split(search).join(replace);
}
__name(replaceAll, "replaceAll");
init_define_process();
var import_fast_diff = __toESM2(require_diff(), 1);
function createDelta(original, revision) {
  const result = (0, import_fast_diff.default)(original, revision);
  const delta = result.map((r) => r[0] === 1 ? r : [r[0], r[1].length]);
  return delta;
}
__name(createDelta, "createDelta");
function applyPatch(original, delta) {
  let result = "";
  let index = 0;
  for (const item of delta) {
    const operation = item[0];
    const value = item[1];
    if (item[0] === -1 && typeof value === "number") {
      index += value;
    } else if (operation == 0 && typeof value === "number") {
      result += original.slice(index, index += value);
    } else {
      result += value;
    }
  }
  return result;
}
__name(applyPatch, "applyPatch");
function initSession(room, u) {
  return Record({ ...u, room, state: Record(u.state)() });
}
__name(initSession, "initSession");
var syncStorage = /* @__PURE__ */ __name(async (setItem, getItem, oldSession, newSession, message) => {
  const hashOfOldSession = md5(oldSession.transpiled);
  let historyHead = await getItem("head");
  if (!historyHead) {
    await setItem(hashOfOldSession, oldSession);
    await setItem("head", hashOfOldSession);
    historyHead = hashOfOldSession;
  }
  await setItem(message.newHash, {
    ...newSession,
    oldHash: message.oldHash,
    reversePatch: message.reversePatch
  });
  const oldNode = await getItem(
    message.oldHash
  );
  if (!oldNode)
    throw Error("corrupt storage");
  await setItem(message.oldHash, {
    oldHash: oldNode.oldHash ? oldNode.oldHash : null,
    reversePatch: oldNode.reversePatch ? oldNode.reversePatch : null,
    newHash: message.newHash,
    patch: message.patch
  });
  await setItem("head", message.newHash);
}, "syncStorage");
var session = null;
var hashStore = {};
var CodeSession = class {
  constructor(room, user) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      const state = this.session.get("state");
      const hashCode4 = md5(state.transpiled);
      hashStore[hashCode4] = state;
      return hashCode4;
    };
    this.createPatchFromHashCode = (oldHash, state, updateHash) => {
      const s = JSON.parse(string_(state));
      hashStore[md5(this.session.get("state").transpiled)] = this.session.get(
        "state"
      );
      let oldRec = hashStore[oldHash];
      let usedOldHash = oldHash;
      if (!oldRec) {
        fetch(
          `/live/${this.room}/mST`
        ).then(async (resp) => {
          if (!resp.ok) {
            console.error(location.origin + " is NOT OK", await resp.text());
            throw new Error(location.origin + " is NOT OK");
          }
          const { mST: mST2 } = await resp.json();
          const hashC = md5(mST2.transpiled);
          if (updateHash) {
            updateHash(hashC);
          }
          hashStore[hashC] = this.session.get("state").merge(mST2);
          oldRec = hashStore[hashC];
          this.createPatchFromHashCode(hashC, state, updateHash);
        });
        return null;
      }
      const oldString = string_(oldRec.toJSON());
      const newRec = oldRec.merge(s);
      const newString = string_(newRec.toJSON()).split(
        md5(newRec.get("transpiled"))
      ).join("css");
      const newNewRecord = this.session.get("state").merge(JSON.parse(newString));
      const newHash = md5(newNewRecord.get("transpiled"));
      hashStore[newHash] = newNewRecord;
      const patch = createPatch(oldString, newString);
      const reversePatch = createPatch(newString, oldString);
      return {
        oldHash: usedOldHash,
        newHash,
        reversePatch,
        patch
      };
    };
    this.patchSync = (sess) => {
      if (sess.code !== this.session.get("state").code && sess.i <= this.session.get("state").i)
        throw new Error("Code update without I update error");
      sess.i;
      if (sess.i < this.session.get("state").i) {
        console.log("never going back!");
        sess.i = this.session.get("state").i + 1;
      }
      if (sess.code !== this.session.get("state").code && sess.i <= this.session.get("state").i)
        throw new Error("Code update without I update error");
      if (sess.transpiled.slice(0, 12) !== `/*${md5(sess.code)}*/`) {
        console.error(
          `missing: /*${md5(sess.code)}*/, transpiled: ${sess.transpiled.slice(0, 12)}`
        );
        throw new Error("transpiled	hack issue");
      }
      if (sess.code.length < 5) {
        throw new Error("code deleted?");
      }
      if (sess.html.indexOf(md5(sess.transpiled)) === -1) {
        console.error(`missing md5trans from html: ${md5(sess.transpiled)}
      ${sess.html.slice(0, 64)}
      
      `);
        throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
      }
      if (sess.css.length && sess.css.indexOf(md5(sess.transpiled)) === -1) {
        console.error(`missing from css: ${md5(sess.transpiled)}`);
        throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
      }
      const oldHash = md5(this.session.get("state").transpiled);
      this.session = this.session.set(
        "state",
        this.session.get("state").merge(sess)
      );
      const newHash = md5(this.session.get("state").transpiled);
      if (newHash !== oldHash) {
        queueMicrotask(() => {
          this.createPatchFromHashCode(oldHash, mST());
          this.update();
        });
      }
    };
    this.applyPatch = ({
      oldHash,
      newHash,
      patch
    }) => {
      if (!(oldHash && newHash && patch.length))
        return;
      hashStore[hashCode3()] = this.session.get("state");
      let maybeOldRec = hashStore[oldHash];
      if (!maybeOldRec)
        throw new Error(`cant find old record: ${oldHash}`);
      const oldString = string_(maybeOldRec.toJSON());
      const applied = applyPatch(oldString, patch);
      const newState = JSON.parse(applied);
      const newRec = this.session.get("state").merge(
        newState
      );
      const newRecord = this.session.get("state").merge(newRec);
      const newHashCheck = md5(newRecord.get("transpiled"));
      if (newHashCheck === newHash) {
        this.session = this.session.set("state", newRecord);
        hashStore[newHash] = this.session.get("state");
      } else {
        throw new Error("Wrong patch");
      }
      return newHash;
    };
    session = this;
    this.room = room;
    const savedState = null;
    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : JSON.parse(string_(user.state))
    })();
    hashStore[md5(user.state.transpiled)] = this.session.get("state");
  }
  update() {
    return (0, import_lodash.default)(() => this.updateNonDebounced(), 200, {
      maxWait: 500,
      trailing: true,
      leading: false
    })();
  }
  updateNonDebounced() {
    Object.keys(this.cb).map((k) => this.cb[k]).map((x) => {
      try {
        x();
      } catch (error) {
        console.error("error calling callback", { err: error });
      }
    });
  }
  onUpdate(fn, regId) {
    this.cb[regId] = fn;
  }
  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }
  setRoom(codeSpace) {
    const user = this.session.set("room", codeSpace);
    this.session = user;
  }
};
__name(CodeSession, "CodeSession");
var hashCode3 = /* @__PURE__ */ __name(() => md5(mST().transpiled), "hashCode");
function mST(p) {
  if (!session) {
    return {
      i: 0,
      transpiled: "",
      code: "",
      html: "",
      css: ""
    };
  }
  const sessAsJs = session.session.get("state").toJSON();
  const { i, transpiled, code, html, css } = p ? JSON.parse(
    applyPatch(
      string_(
        sessAsJs
      ),
      p
    )
  ) : sessAsJs;
  return { i, transpiled, code, html, css };
}
__name(mST, "mST");
function string_(s) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}
__name(string_, "string_");
var applyPatch2 = /* @__PURE__ */ __name((x) => {
  session?.applyPatch(x);
  session?.update();
}, "applyPatch");
var makePatchFrom = /* @__PURE__ */ __name((n, st, update8) => session.createPatchFromHashCode(n, st, update8), "makePatchFrom");
var startSession = /* @__PURE__ */ __name((room, u) => session || new CodeSession(room, {
  name: u.name,
  state: u.state
}), "startSession");
function createPatch(oldCode, newCode) {
  return createDelta(oldCode, newCode);
}
__name(createPatch, "createPatch");

// src/staticContent.mjs
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";
var files = JSON.parse(ASSET_MANIFEST);
var ASSET_HASH = md5(ASSET_MANIFEST);

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/js/importmap.json
var importmap_default2 = {
  imports: {
    "framer-motion": "/motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/cache": "/emotionCache.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    react: "/reactMod.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom": "/reactDom.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "react-error-boundary": "/reactMod.mjs",
    "hydrate.mjs": "/hydrate.mjs",
    "load.mjs": "/load.mjs"
  }
};

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
      const pair = new WebSocketPair();
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
var api = {
  fetch: async (req, env) => {
    let request = new Request(req.url, req);
    if (request.cf && request.cf.asOrganization && request.cf.asOrganization.startsWith("YANDEX")) {
      return new Response(null, { status: 401, statusText: "no robots" });
    }
    return handleErrors(request, async () => {
      console.log(`handling request: ${request.url}`);
      const u = new URL(request.url);
      const url = u;
      const accept = request.headers.get("accept");
      const path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        const utcSecs = Math.floor(Math.floor(Date.now() / 1e3 / 7200));
        console.log({ asOrganization: request.cf?.asOrganization });
        const start = md5(
          (request.cf?.asOrganization || "default") + utcSecs + `
        and reset every 2 hours
        time`
        );
        return new Response(
          `<meta http-equiv="refresh" content="0; URL=${u.origin}/live/${start}" />`,
          {
            status: 307,
            headers: {
              "Location": `${u.origin}/live/${start}/`,
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache",
              ASSET_HASH
            }
          }
        );
      }
      const handleFetchApi = async (path2) => {
        const newUrl = new URL(path2.join("/"), url.origin);
        request = new Request(newUrl, request);
        const cacheKey = new Request(request.url);
        const cache = await caches.open(newUrl.origin);
        let response = await cache.match(cacheKey);
        if (response) {
          return response;
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
            return new Response(JSON.stringify(files), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH
              }
            });
          case "packages.json":
            return new Response(JSON.stringify(package_default), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache"
              }
            });
          case "importmap.json":
            return new Response(JSON.stringify(importmap_default2), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH
              }
            });
          case "api":
            return handleApiRequest(path2.slice(1), request, env);
          case "ipns":
          case "ipfs": {
            const u2 = new URL(request.url, "https://cloudflare-ipfs.com");
            const new1 = new URL(u2.pathname, "https://cloudflare-ipfs.com");
            const resp = await fetch(new1.toString());
            if (!resp.ok)
              return resp;
            const new2 = new URL(u2.pathname, "https://ipfs.io");
            const resp2 = await fetch(new2.toString());
            return resp2;
          }
          case "live": {
            const paths = [...path2.slice(1)];
            return handleApiRequest(
              ["room", ...paths],
              request,
              env
            ).catch(
              (e) => new Response("Error," + e?.message, {
                status: 500,
                statusText: e?.message
              })
            );
          }
          default: {
            const file = newUrl.pathname.slice(1);
            if (files[file]) {
              const kvCacheKey = new Request(request.url.replace(file, files[file]));
              response = await cache.match(kvCacheKey);
              if (response)
                return response;
              let kvResp = await (0, import_kv_asset_handler.getAssetFromKV)(
                {
                  request,
                  waitUntil: async (prom) => await prom
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
                  ASSET_MANIFEST
                }
              );
              if (!kvResp.ok)
                return kvResp;
              kvResp = new Response(
                kvResp.body,
                kvResp
              );
              const headers2 = new Headers(kvResp.headers);
              headers2.append("Cross-Origin-Embedder-Policy", "require-corp");
              kvResp = new Response(kvResp.body, { ...kvResp, headers: headers2 });
              cache.put(kvCacheKey, kvResp.clone());
              return kvResp;
            }
            const isDTS = u.pathname.endsWith("/index.d.ts") && u.pathname.indexOf("/npm:/") === -1;
            const packageName = u.toString().split(
              u.origin
            ).join(
              "https://esm.sh"
            ).split(
              "/node_modules"
            ).join(
              ""
            ).split(
              "/npm:"
            ).join(
              ""
            ).replace("/index.d.ts", "");
            const esmUrl = packageName;
            request = new Request(esmUrl, { redirect: "follow" });
            response = await fetch(request);
            if (!response.ok) {
              return response;
            }
            const redirectUrl = response.headers.get("location") || response.url;
            const headers = new Headers(response.headers);
            headers.set(
              "location",
              redirectUrl.replace(
                "esm.sh/",
                u.hostname + "/npm:/"
              )
            );
            headers.set("Cross-Origin-Embedder-Policy", "require-corp");
            const xTs = response.headers.get("x-typescript-types") || "NO_DTS";
            if (isDTS) {
              if (xTs === "NO_DTS") {
                return new Response(JSON.stringify({ error: "NO_DTS" }), {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Cache-Control": "no-cache"
                  }
                });
              }
              const xt = response.headers.get("x-typescript-types");
              response = new Response(
                `
              export * from "${xt}";
              export { default } from "${xt}";
              `,
                {
                  headers: {
                    "content-type": "application/javascript; charset=utf-8",
                    "Cache-Control": "no-cache"
                  }
                }
              );
            }
            headers.set(
              "x-DTS",
              xTs
            );
            const isText = !!response?.headers?.get("Content-Type")?.includes(
              "charset"
            );
            const bodyStr = isText ? importMapReplace(await response.text(), u.origin, isDTS ? xTs : response.url).split("esm.sh").join(
              url.host
            ) : await response.blob();
            response = new Response(
              bodyStr,
              {
                ...response,
                status: 200,
                headers
              }
            );
            await cache.put(cacheKey, response.clone());
            return response;
          }
        }
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
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp"
            }
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
      return roomObject.fetch(new Request(newUrl.toString(), request));
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
function isChunk(link) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.includes("chunk-") || chunkRegExp.test(link);
}
var chat_default = api;

// src/index.html
var src_default = '<!DOCTYPE html>\n<html lang="en">\n\n<head profile="http://www.w3.org/2005/10/profile">\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width" />\n  <meta name="sharedArrayBuffer" description="using cross-origin-isolation in the web browser">\n  <base href="/">\n  <link rel="shortcut icon" type="image/png" href="/favicons/chunk-chunk-fe2f7da4f9ccc2.png">\n  <title>Instant React Editor</title>\n\n  <script type="importmap"><\/script>\n  <style>\n    html,\n    body {\n      overflow: hidden;\n      margin: 0;\n      height: 100%;\n      --webkit-overflow-scrolling: touch;\n      overscroll-behavior-x: none;\n    }\n\n    q {\n      display: none;\n    }\n\n\n    @media screen and (prefers-color-scheme: dark) {\n      body {\n        background-color: #121212;\n        ;\n        color: hsl(210, 10%, 62%);\n        --text-color-normal: hsl(210, 10%, 62%);\n        --text-color-light: hsl(210, 15%, 35%);\n        --text-color-richer: hsl(210, 50%, 72%);\n        --text-color-highlight: hsl(25, 70%, 45%);\n      }\n    }\n\n\n    @media screen and (prefers-color-scheme: light) {\n      body {\n        background-color: white;\n        color: black;\n        --text-color-normal: #0a244d;\n        --text-color-light: #8cabd9;\n      }\n    }\n\n    /**reset*/\n  </style>\n</head>\n\n\n<body>\n  <div id="root"></div>\n  <script type="module">\n    import { hydrate, md5, ab2str } from "./hydrate.mjs?ASSET_HASH";\n    import load from "./load.mjs?ASSET_HASH";\n\n    globalThis.assetHash = "ASSET_HASH";\n    const paths = location.pathname.split("/");\n    const codeSpace = paths[2];\n\n    const rootEl = document.getElementById(`root`);\n\n\n    if (location.pathname !== `/live/${codeSpace}` && !location.pathname.endsWith("worker")) {\n      const bc = new SharedWorker("/sharedWorker.js?ASSET_HASH");\n      const name = md5(((self && self.crypto && self.crypto.randomUUID\n  && self.crypto.randomUUID()) || (uidV4())).slice(\n    0,\n    8,\n  ));\n      // messagePort = bc.port;\n   \n      bc.port.addEventListener("message", async (event) => {\n        if (event.data.type==="onconnect"){\n          bc.port.postMessage({codeSpace, name,  type: \'handshake\'});\n        } else {\n          const data = JSON.parse(ab2str(event.data))\n//          const { html, css, transpiled, i } = event.data.sess;\n          //     unmountComponentAtNode(document.getElementById(codeSpace+"-css"));\n\n          //      document.body = `<div id="root" data-i="${i}" style="height: 100%;">${html.split(md5(transpiled)).join(`css`)}</div>`,\n          await hydrate(data.codeSpace, data.sess, bc.port);\n        }\n      });\n      bc.port.start()\n     \n      hydrate(codeSpace);\n   \n    } else if (location.pathname.endsWith(\'worker\')){\n      load();\n    } else {\n      load();\n    }\n  <\/script>\n\n  <script type="module">\n    import {Workbox} from \'/npm:/workbox-window\';\n\nif (\'serviceWorker\' in navigator) {\n  const wb = new Workbox(\'/sw.js\');\n\n  wb.register();\n}\n  <\/script>\n\n</body>\n\n</html>';

// ../../.yarn/global/cache/async-mutex-npm-0.4.0-f5a25d4255-9.zip/node_modules/async-mutex/index.mjs
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Semaphore = class {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._weightedQueues = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve, reject) => {
      if (!this._weightedQueues[weight - 1])
        this._weightedQueues[weight - 1] = [];
      this._weightedQueues[weight - 1].push({ resolve, reject });
      this._dispatch();
    });
  }
  runExclusive(callback, weight = 1) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire(weight);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve) => {
      if (!this._weightedWaiters[weight - 1])
        this._weightedWaiters[weight - 1] = [];
      this._weightedWaiters[weight - 1].push(resolve);
      this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatch();
  }
  release(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((queue) => queue.forEach((entry) => entry.reject(this._cancelError)));
    this._weightedQueues = [];
  }
  _dispatch() {
    var _a;
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
      if (!queueEntry)
        continue;
      const previousValue = this._value;
      const previousWeight = weight;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._weightedWaiters[weight - 1])
        continue;
      this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
      this._weightedWaiters[weight - 1] = [];
    }
  }
};
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Mutex = class {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    if (this._semaphore.isLocked())
      this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/utils.js
function print(root, printNode = (n) => n.key) {
  var out = [];
  row(root, "", true, (v) => out.push(v), printNode);
  return out.join("");
}
function row(root, prefix, isTail, out, printNode) {
  if (root) {
    out(`${prefix}${isTail ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 "}${printNode(root)}
`);
    const indent = prefix + (isTail ? "    " : "\u2502   ");
    if (root.left)
      row(root.left, indent, false, out, printNode);
    if (root.right)
      row(root.right, indent, true, out, printNode);
  }
}
function isBalanced(root) {
  if (root === null)
    return true;
  var lh = height(root.left);
  var rh = height(root.right);
  if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right))
    return true;
  return false;
}
function height(node) {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
}
function loadRecursive(parent, keys2, values2, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys2[middle];
    const data = values2[middle];
    const node = { key, data, parent };
    node.left = loadRecursive(node, keys2, values2, start, middle);
    node.right = loadRecursive(node, keys2, values2, middle + 1, end);
    return node;
  }
  return null;
}
function markBalance(node) {
  if (node === null)
    return 0;
  const lh = markBalance(node.left);
  const rh = markBalance(node.right);
  node.balanceFactor = lh - rh;
  return Math.max(lh, rh) + 1;
}
function sort2(keys2, values2, left, right, compare) {
  if (left >= right)
    return;
  const pivot = keys2[left + right >> 1];
  let i = left - 1;
  let j = right + 1;
  while (true) {
    do
      i++;
    while (compare(keys2[i], pivot) < 0);
    do
      j--;
    while (compare(keys2[j], pivot) > 0);
    if (i >= j)
      break;
    let tmp = keys2[i];
    keys2[i] = keys2[j];
    keys2[j] = tmp;
    tmp = values2[i];
    values2[i] = values2[j];
    values2[j] = tmp;
  }
  sort2(keys2, values2, left, j, compare);
  sort2(keys2, values2, j + 1, right, compare);
}

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
function DEFAULT_COMPARE(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function rotateLeft(node) {
  var rightNode = node.right;
  node.right = rightNode.left;
  if (rightNode.left)
    rightNode.left.parent = node;
  rightNode.parent = node.parent;
  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode;
    } else {
      rightNode.parent.right = rightNode;
    }
  }
  node.parent = rightNode;
  rightNode.left = node;
  node.balanceFactor += 1;
  if (rightNode.balanceFactor < 0) {
    node.balanceFactor -= rightNode.balanceFactor;
  }
  rightNode.balanceFactor += 1;
  if (node.balanceFactor > 0) {
    rightNode.balanceFactor += node.balanceFactor;
  }
  return rightNode;
}
function rotateRight(node) {
  var leftNode = node.left;
  node.left = leftNode.right;
  if (node.left)
    node.left.parent = node;
  leftNode.parent = node.parent;
  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode;
    } else {
      leftNode.parent.right = leftNode;
    }
  }
  node.parent = leftNode;
  leftNode.right = node;
  node.balanceFactor -= 1;
  if (leftNode.balanceFactor > 0) {
    node.balanceFactor -= leftNode.balanceFactor;
  }
  leftNode.balanceFactor -= 1;
  if (node.balanceFactor < 0) {
    leftNode.balanceFactor += node.balanceFactor;
  }
  return leftNode;
}
var AVLTree = class {
  constructor(comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }
  destroy() {
    return this.clear();
  }
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }
  get size() {
    return this._size;
  }
  contains(key) {
    if (this._root) {
      var node = this._root;
      var comparator = this._comparator;
      while (node) {
        var cmp = comparator(key, node.key);
        if (cmp === 0)
          return true;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    return false;
  }
  next(node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor.left)
          successor = successor.left;
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor;
          successor = successor.parent;
        }
      }
    }
    return successor;
  }
  prev(node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor.right)
          predecessor = predecessor.right;
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  }
  forEach(callback) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);
          current = current.right;
        } else
          done = true;
      }
    }
    return this;
  }
  range(low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;
    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node))
            return this;
        }
        node = node.right;
      }
    }
    return this;
  }
  keys() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  values() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  at(index) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index)
            return current;
          i++;
          current = current.right;
        } else
          done = true;
      }
    }
    return null;
  }
  minNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node;
  }
  maxNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node;
  }
  min() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node.key;
  }
  max() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node.key;
  }
  isEmpty() {
    return !this._root;
  }
  pop() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left)
        node = node.left;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  popMax() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.right)
        node = node.right;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  find(key) {
    var root = this._root;
    var subtree = root, cmp;
    var compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if (cmp === 0)
        return subtree;
      else if (cmp < 0)
        subtree = subtree.left;
      else
        subtree = subtree.right;
    }
    return null;
  }
  insert(key, data) {
    if (!this._root) {
      this._root = {
        parent: null,
        left: null,
        right: null,
        balanceFactor: 0,
        key,
        data
      };
      this._size++;
      return this._root;
    }
    var compare = this._comparator;
    var node = this._root;
    var parent = null;
    var cmp = 0;
    if (this._noDuplicates) {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if (cmp === 0)
          return null;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if (cmp <= 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    var newNode = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent,
      key,
      data
    };
    var newRoot;
    if (cmp <= 0)
      parent.left = newNode;
    else
      parent.right = newNode;
    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor === 0)
        break;
      else if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      }
      parent = parent.parent;
    }
    this._size++;
    return newNode;
  }
  remove(key) {
    if (!this._root)
      return null;
    var node = this._root;
    var compare = this._comparator;
    var cmp = 0;
    while (node) {
      cmp = compare(key, node.key);
      if (cmp === 0)
        break;
      else if (cmp < 0)
        node = node.left;
      else
        node = node.right;
    }
    if (!node)
      return null;
    var returnValue = node.key;
    var max2, min2;
    if (node.left) {
      max2 = node.left;
      while (max2.left || max2.right) {
        while (max2.right)
          max2 = max2.right;
        node.key = max2.key;
        node.data = max2.data;
        if (max2.left) {
          node = max2;
          max2 = max2.left;
        }
      }
      node.key = max2.key;
      node.data = max2.data;
      node = max2;
    }
    if (node.right) {
      min2 = node.right;
      while (min2.left || min2.right) {
        while (min2.left)
          min2 = min2.left;
        node.key = min2.key;
        node.data = min2.data;
        if (min2.right) {
          node = min2;
          min2 = min2.right;
        }
      }
      node.key = min2.key;
      node.data = min2.data;
      node = min2;
    }
    var parent = node.parent;
    var pp = node;
    var newRoot;
    while (parent) {
      if (parent.left === pp)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      }
      if (parent.balanceFactor === -1 || parent.balanceFactor === 1)
        break;
      pp = parent;
      parent = parent.parent;
    }
    if (node.parent) {
      if (node.parent.left === node)
        node.parent.left = null;
      else
        node.parent.right = null;
    }
    if (node === this._root)
      this._root = null;
    this._size--;
    return returnValue;
  }
  load(keys2 = [], values2 = [], presort) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const size = keys2.length;
    if (presort)
      sort2(keys2, values2, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys2, values2, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  }
  isBalanced() {
    return isBalanced(this._root);
  }
  toString(printNode) {
    return print(this._root, printNode);
  }
};
AVLTree.default = AVLTree;

// src/iife.html
var iife_default = `
<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="/">
  <title>Instant React Editor</title>
  <style>
    html,
body,
#root {
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
var Code = class {
  constructor(state, env) {
    this.env = env;
    this.kv = state.storage;
    this.state = state;
    this.sessionStarted = false;
    this.sessions = [];
    this.sess = null;
    this.env = env;
    this.codeSpace = "";
    this.address = "";
    this.mutex = new Mutex();
    this.state.blockConcurrencyWhile(async () => {
      const session2 = await this.kv.get("session") || await env.CODE.get(env.CODE.idFromName("code-main")).fetch(
        "session.json"
      ).then((x) => x.json());
      if (!session2)
        throw Error("cant get the starter session");
      this.address = await this.kv.get("address") || "";
      this.sess = session2;
      this.sessionStarted = false;
    });
  }
  state;
  kv;
  codeSpace;
  mutex;
  sess;
  sessionStarted;
  session = null;
  user = md5(self.crypto.randomUUID());
  address;
  users = new AVLTree(
    (a, b) => a === b ? 0 : a < b ? 1 : -1,
    true
  );
  waiting = [];
  sessions;
  i = 0;
  wait = (x) => {
    this.waiting = this.waiting.filter((x2) => !x2());
    if (x && !x())
      this.waiting.push(x);
  };
  async fetch(request) {
    const state = this.sess;
    const url = new URL(request.url);
    this.wait();
    this.codeSpace = url.searchParams.get("room") || "code-main";
    if (!this.session) {
      this.session = startSession(
        this.codeSpace,
        { state, name: this.codeSpace }
      );
      this.sessionStarted = true;
    }
    return handleErrors(request, async () => {
      const { code, transpiled, css, html, i } = mST();
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0)
        path.push("");
      switch (path[0]) {
        case "code":
        case "index.tsx":
          return new Response(code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(code),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "session.json":
        case "session": {
          if (path[1]) {
            let session2 = await this.kv.get(path[1]);
            if (session2) {
              if (typeof session2 !== "string")
                session2 = JSON.stringify(session2);
              return new Response(session2, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  content_hash: md5(session2),
                  "Content-Type": "application/json; charset=UTF-8"
                }
              });
            } else {
              return new Response(
                JSON.stringify({ success: false, statusCode: 404 }),
                {
                  status: 404,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                }
              );
            }
          }
          const body = JSON.stringify(mST());
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(body),
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "lazy":
          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${this.codeSpace}"}) ;
           `,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
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
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "list": {
          const list = await this.kv.list();
          return new Response(JSON.stringify({ ...list }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "mST.mjs": {
          const body = `
          export const mST=${JSON.stringify(mST())};
          export const codeSpace="${this.codeSpace}";
          export const address="${this.address}";
          export const importmapReplaced=${JSON.stringify({
            js: importMapReplace(mST().transpiled, url.origin, url.origin)
          })}`;
          const content_hash = md5(body);
          return new Response(
            `
              export const mST=${JSON.stringify(mST())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${JSON.stringify({
              js: importMapReplace(mST().transpiled, url.origin, url.origin)
            })}`,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                content_hash,
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            }
          );
        }
        case "mST":
          return new Response(
            JSON.stringify({
              mST: mST(),
              hashCode: hashCode3()
            }),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
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
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "path":
          return new Response(path.join("----"), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "render.tsx": {
          const codeSpace = this.codeSpace;
          const src = importMapReplace(
            `import {createRoot} from "react-dom/client"
          import { CacheProvider } from "@emotion/react";
          import createCache from "@emotion/cache";
          import { ErrorBoundary } from "react-error-boundary";
          import App from "${url.origin}/live/${codeSpace}/index.js/${i}"
          
          document.body.innerHTML = '<div id="root"></div>';

      let rootEl = document.getElementById("root");

      rootEl.innerHTML="";
       
      const root = createRoot(rootEl);
      
        const cache = createCache({
          key: "z",
          container: rootEl,
          speedy: false
        });
      
       cache.compat = undefined;
      
      root.render(<ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh no</div>
            <pre>{error.message}</pre>
          </div>
        )}>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
        </ErrorBoundary>);`,
            url.origin,
            url.origin
          );
          return new Response(src, {
            headers: {
              "x-typescript-types": `${url.origin}/live/${this.codeSpace}/render.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(src),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "index.mjs":
        case "index.js":
        case "js": {
          const i2 = path[1] || mST().i;
          if (i2 > mST().i) {
            const started = Date.now() / 1e3;
            const body = await new Promise(
              (res, reject) => this.wait(() => {
                const now = Date.now() / 1e3;
                if (mST().i < Number(i2) && started - now < 3e3) {
                  return false;
                }
                if (mST().i < Number(i2) && started - now >= 3e3) {
                  reject(null);
                  return false;
                }
                res(mST().transpiled);
                return true;
              })
            );
            const trp2 = importMapReplace(body, url.origin, url.origin);
            return new Response(trp2, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                content_hash: md5(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          if (i2 < mST().i) {
            const trp2 = importMapReplace(transpiled, url.origin, url.origin);
            return new Response(trp2, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${this.codeSpace}/index.mjs/${mST().i}`,
                "Cache-Control": "no-cache",
                content_hash: md5(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          const trp = importMapReplace(transpiled, url.origin, url.origin);
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(trp),
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
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "hashCode": {
          const hashCode4 = String(Number(path[1]));
          const patch = await this.kv.get(
            hashCode4
          );
          return new Response(JSON.stringify(patch || {}), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "":
        case "hydrated":
        case "worker":
        case "dehydrated":
        case "public": {
          const respText = src_default.replace(
            "/**reset*/",
            resetCSS
          ).replace(
            `<script type="importmap"><\/script>`,
            `<script type="importmap">${JSON.stringify(importmap_default2)}<\/script>`
          ).replace(
            `<div id="root"></div>`,
            `<div id="root" data-i="${i}" style="height: 100%;">
              <div  style="height: 100%;">
              <iframe
              height="100%"
              width="100%"
              frameBorder="0"
              src="/live/${this.codeSpace}/iframe"></iframe></div></div>`
          ).split("ASSET_HASH").join(ASSET_HASH);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache"
          );
          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iframe": {
          const respText = src_default.replace(
            "/**reset*/",
            resetCSS
          ).replace(
            `<script type="importmap"><\/script>`,
            `<script type="importmap">${JSON.stringify(importmap_default2)}<\/script>`
          ).replace(
            `<div id="root"></div>`,
            `<div id="root" data-i="${i}" style="height: 100%;">
              <style>${css}</style>
              <div style="height: 100%;">
                ${html}
              </div>
              </div>`
          ).split("ASSET_HASH").join(ASSET_HASH);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache"
          );
          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iife": {
          const startState = mST();
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
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }
          const pair = new WebSocketPair();
          await this.handleSession(pair[1]);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }
  async handleSession(webSocket) {
    webSocket.accept();
    const session2 = {
      name: "",
      quit: false,
      webSocket,
      blockedMessages: []
    };
    this.sessions.push(session2);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session2.blockedMessages.push(
          JSON.stringify({ name: otherSession.name })
        );
      }
    });
    const storage = await this.kv.list({ reverse: true, limit: 100 });
    const backlog = [...storage.values()];
    backlog.reverse();
    backlog.forEach((value) => {
      session2.blockedMessages.push(
        typeof value === "string" ? value : JSON.stringify(value)
      );
    });
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session2)
    );
    const closeOrErrorHandler = () => {
      session2.quit = true;
      this.users.remove(session2.name);
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  async processWsMessage(msg, session2) {
    if (session2.quit) {
      this.users.remove(session2.name);
      session2.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const { name } = session2;
    const respondWith = (obj) => session2.webSocket.send(JSON.stringify(obj));
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
        session2.name = data.name;
        try {
          this.sessions.map((otherSession) => {
            if (otherSession === session2)
              return;
            if (otherSession.name === data.name) {
              otherSession.name = "";
              otherSession.blockedMessages.map((m) => session2.webSocket.send(m));
              otherSession.blockedMessages = [];
            }
          });
          if (data.hashCode) {
            if (data?.hashCode !== hashCode3()) {
              const patch = makePatchFrom(data.hashCode, mST());
              if (patch) {
                return respondWith({ ...patch });
              }
            }
          }
        } catch (e) {
          respondWith({ error: "error while checked blocked messages" });
        }
        const userNode = this.users.insert(data.name);
        const usersNum = this.users.keys().length;
        const rtcConnUser = usersNum > 2 ? userNode.parent?.key || userNode.left?.key || userNode.right?.key : null;
        return respondWith({
          ...rtcConnUser ? { name: rtcConnUser } : {},
          hashCode: hashCode3(),
          users: this.users.keys()
        });
      }
      return respondWith({
        msg: "no-name-no-party"
      });
    }
    this.i = data.i;
    if (data.i < this.i)
      return;
    if (data.codeSpace && data.address && !this.address) {
      return this.broadcast(data);
    }
    try {
      try {
        if (data.target && data.type && ["new-ice-candidate", "video-offer", "video-answer"].includes(
          data.type
        )) {
          return this.user2user(data.target, { ...data, name });
        }
        if (data.i <= mST().i)
          return;
        const oldSession = mST();
        if (data.patch && data.oldHash && data.newHash) {
          const patch = data.patch;
          const newHash = data.newHash;
          const oldHash = data.oldHash;
          const reversePatch = data.reversePatch;
          if (oldHash !== hashCode3()) {
            return respondWith({ hashCode: hashCode3() });
          }
          try {
            await applyPatch2({ newHash, oldHash, patch, reversePatch });
          } catch (err) {
            console.error({ err });
            return respondWith({ err });
          }
          if (newHash === hashCode3()) {
            try {
              this.broadcast(data);
            } catch {
              respondWith({
                "msg": "broadcast issue"
              });
            }
            const newSession = mST();
            const syncKV = async (oldSession2, newSession2, message) => await syncStorage(
              async (key, value) => await this.kv.put(key, value),
              async (key) => await this.kv.get(key),
              oldSession2,
              newSession2,
              message
            );
            await syncKV(oldSession, newSession, { newHash, oldHash, patch, reversePatch });
            await this.kv.put("session", { ...mST() });
          }
          return respondWith({
            hashCode: hashCode3()
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
    this.sessions.filter((session2) => session2.name === to).map((s) => {
      try {
        s.webSocket.send(message);
      } catch {
        console.error("p2p error");
        "";
      }
    });
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.sessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        this.users.remove(s.name);
        s.blockedMessages.push(message);
      }
    });
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  nextAllowedTime = 0;
  async fetch(request) {
    return await handleErrors(request, async () => {
      const now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 1;
      }
      const cooldown = Math.max(0, this.nextAllowedTime - now - 1);
      return new Response(`${cooldown}`);
    });
  }
};

// src/users.ts
var Users = class {
  async fetch(_request, _env) {
    return new Response("OKi");
  }
};

// src/r2bucket.ts
var r2bucket_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    let object;
    let headers;
    switch (request.method) {
      case "PUT":
        await env.r2_bucket.put(key, request.body);
        return new Response(`Put ${key} successfully!`);
      case "GET":
        object = await env.r2_bucket.get(key);
        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }
        headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        return new Response(object.body, {
          headers
        });
      case "DELETE":
        await env.r2_bucket.delete(key);
        return new Response("Deleted!");
      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE"
          }
        });
    }
  }
};

// src/index.ts
var src_default2 = chat_default;
export {
  Code,
  CodeRateLimiter,
  r2bucket_default as R2,
  Users,
  src_default2 as default
};
