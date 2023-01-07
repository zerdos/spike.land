var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// ../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/Mime.js"(exports, module) {
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

// ../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/other.js
var require_other = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/index.js
var require_mime = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/mime-npm-3.0.0-8d911e4c06-9.zip/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// ../../../../../Users/z/.yarn/berry/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
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

// ../../../../../Users/z/.yarn/berry/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/@cloudflare-kv-asset-handler-npm-0.3.0-982933551f-9.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
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
      // do not bypass Cloudflare's cache
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

// ../../../../../Users/z/.yarn/berry/cache/esbuild-wasm-npm-0.16.14-49a0ba275e-9.zip/node_modules/esbuild-wasm/lib/browser.js
var require_browser = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/esbuild-wasm-npm-0.16.14-49a0ba275e-9.zip/node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
    ((module2) => {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod2) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod2);
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
      var browser_exports = {};
      __export(browser_exports, {
        analyzeMetafile: () => analyzeMetafile,
        analyzeMetafileSync: () => analyzeMetafileSync,
        build: () => build,
        buildSync: () => buildSync,
        default: () => browser_default,
        formatMessages: () => formatMessages,
        formatMessagesSync: () => formatMessagesSync,
        initialize: () => initialize2,
        serve: () => serve,
        transform: () => transform2,
        transformSync: () => transformSync,
        version: () => version
      });
      module2.exports = __toCommonJS(browser_exports);
      function encodePacket(packet) {
        let visit = (value) => {
          if (value === null) {
            bb.write8(0);
          } else if (typeof value === "boolean") {
            bb.write8(1);
            bb.write8(+value);
          } else if (typeof value === "number") {
            bb.write8(2);
            bb.write32(value | 0);
          } else if (typeof value === "string") {
            bb.write8(3);
            bb.write(encodeUTF8(value));
          } else if (value instanceof Uint8Array) {
            bb.write8(4);
            bb.write(value);
          } else if (value instanceof Array) {
            bb.write8(5);
            bb.write32(value.length);
            for (let item of value) {
              visit(item);
            }
          } else {
            let keys2 = Object.keys(value);
            bb.write8(6);
            bb.write32(keys2.length);
            for (let key of keys2) {
              bb.write(encodeUTF8(key));
              visit(value[key]);
            }
          }
        };
        let bb = new ByteBuffer();
        bb.write32(0);
        bb.write32(packet.id << 1 | +!packet.isRequest);
        visit(packet.value);
        writeUInt32LE(bb.buf, bb.len - 4, 0);
        return bb.buf.subarray(0, bb.len);
      }
      function decodePacket(bytes) {
        let visit = () => {
          switch (bb.read8()) {
            case 0:
              return null;
            case 1:
              return !!bb.read8();
            case 2:
              return bb.read32();
            case 3:
              return decodeUTF8(bb.read());
            case 4:
              return bb.read();
            case 5: {
              let count2 = bb.read32();
              let value2 = [];
              for (let i = 0; i < count2; i++) {
                value2.push(visit());
              }
              return value2;
            }
            case 6: {
              let count2 = bb.read32();
              let value2 = {};
              for (let i = 0; i < count2; i++) {
                value2[decodeUTF8(bb.read())] = visit();
              }
              return value2;
            }
            default:
              throw new Error("Invalid packet");
          }
        };
        let bb = new ByteBuffer(bytes);
        let id = bb.read32();
        let isRequest = (id & 1) === 0;
        id >>>= 1;
        let value = visit();
        if (bb.ptr !== bytes.length) {
          throw new Error("Invalid packet");
        }
        return { id, isRequest, value };
      }
      var ByteBuffer = class {
        constructor(buf = new Uint8Array(1024)) {
          this.buf = buf;
          this.len = 0;
          this.ptr = 0;
        }
        _write(delta) {
          if (this.len + delta > this.buf.length) {
            let clone = new Uint8Array((this.len + delta) * 2);
            clone.set(this.buf);
            this.buf = clone;
          }
          this.len += delta;
          return this.len - delta;
        }
        write8(value) {
          let offset = this._write(1);
          this.buf[offset] = value;
        }
        write32(value) {
          let offset = this._write(4);
          writeUInt32LE(this.buf, value, offset);
        }
        write(bytes) {
          let offset = this._write(4 + bytes.length);
          writeUInt32LE(this.buf, bytes.length, offset);
          this.buf.set(bytes, offset + 4);
        }
        _read(delta) {
          if (this.ptr + delta > this.buf.length) {
            throw new Error("Invalid packet");
          }
          this.ptr += delta;
          return this.ptr - delta;
        }
        read8() {
          return this.buf[this._read(1)];
        }
        read32() {
          return readUInt32LE(this.buf, this._read(4));
        }
        read() {
          let length = this.read32();
          let bytes = new Uint8Array(length);
          let ptr = this._read(bytes.length);
          bytes.set(this.buf.subarray(ptr, ptr + length));
          return bytes;
        }
      };
      var encodeUTF8;
      var decodeUTF8;
      var encodeInvariant;
      if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
        let encoder = new TextEncoder();
        let decoder = new TextDecoder();
        encodeUTF8 = (text) => encoder.encode(text);
        decodeUTF8 = (bytes) => decoder.decode(bytes);
        encodeInvariant = 'new TextEncoder().encode("")';
      } else if (typeof Buffer !== "undefined") {
        encodeUTF8 = (text) => Buffer.from(text);
        decodeUTF8 = (bytes) => {
          let { buffer, byteOffset, byteLength } = bytes;
          return Buffer.from(buffer, byteOffset, byteLength).toString();
        };
        encodeInvariant = 'Buffer.from("")';
      } else {
        throw new Error("No UTF-8 codec found");
      }
      if (!(encodeUTF8("") instanceof Uint8Array))
        throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
      function readUInt32LE(buffer, offset) {
        return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
      }
      function writeUInt32LE(buffer, value, offset) {
        buffer[offset++] = value;
        buffer[offset++] = value >> 8;
        buffer[offset++] = value >> 16;
        buffer[offset++] = value >> 24;
      }
      var quote = JSON.stringify;
      var buildLogLevelDefault = "warning";
      var transformLogLevelDefault = "silent";
      function validateTarget(target) {
        validateStringValue(target, "target");
        if (target.indexOf(",") >= 0)
          throw new Error(`Invalid target: ${target}`);
        return target;
      }
      var canBeAnything = () => null;
      var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
      var mustBeBooleanOrObject = (value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object";
      var mustBeString = (value) => typeof value === "string" ? null : "a string";
      var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
      var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
      var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
      var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
      var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
      var mustBeWebAssemblyModule = (value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
      var mustBeArrayOrRecord = (value) => typeof value === "object" && value !== null ? null : "an array or an object";
      var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
      var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
      var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
      var mustBeStringOrArray = (value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
      var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
      var mustBeStringOrURL = (value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL";
      function getFlag(object, keys2, key, mustBeFn) {
        let value = object[key];
        keys2[key + ""] = true;
        if (value === void 0)
          return void 0;
        let mustBe = mustBeFn(value);
        if (mustBe !== null)
          throw new Error(`${quote(key)} must be ${mustBe}`);
        return value;
      }
      function checkForInvalidFlags(object, keys2, where) {
        for (let key in object) {
          if (!(key in keys2)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
          }
        }
      }
      function validateInitializeOptions(options) {
        let keys2 = /* @__PURE__ */ Object.create(null);
        let wasmURL = getFlag(options, keys2, "wasmURL", mustBeStringOrURL);
        let wasmModule = getFlag(options, keys2, "wasmModule", mustBeWebAssemblyModule);
        let worker = getFlag(options, keys2, "worker", mustBeBoolean);
        checkForInvalidFlags(options, keys2, "in initialize() call");
        return {
          wasmURL,
          wasmModule,
          worker
        };
      }
      function validateMangleCache(mangleCache) {
        let validated;
        if (mangleCache !== void 0) {
          validated = /* @__PURE__ */ Object.create(null);
          for (let key in mangleCache) {
            let value = mangleCache[key];
            if (typeof value === "string" || value === false) {
              validated[key] = value;
            } else {
              throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
            }
          }
        }
        return validated;
      }
      function pushLogFlags(flags, options, keys2, isTTY, logLevelDefault) {
        let color = getFlag(options, keys2, "color", mustBeBoolean);
        let logLevel = getFlag(options, keys2, "logLevel", mustBeString);
        let logLimit = getFlag(options, keys2, "logLimit", mustBeInteger);
        if (color !== void 0)
          flags.push(`--color=${color}`);
        else if (isTTY)
          flags.push(`--color=true`);
        flags.push(`--log-level=${logLevel || logLevelDefault}`);
        flags.push(`--log-limit=${logLimit || 0}`);
      }
      function validateStringValue(value, what, key) {
        if (typeof value !== "string") {
          throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
        }
        return value;
      }
      function pushCommonFlags(flags, options, keys2) {
        let legalComments = getFlag(options, keys2, "legalComments", mustBeString);
        let sourceRoot = getFlag(options, keys2, "sourceRoot", mustBeString);
        let sourcesContent = getFlag(options, keys2, "sourcesContent", mustBeBoolean);
        let target = getFlag(options, keys2, "target", mustBeStringOrArray);
        let format = getFlag(options, keys2, "format", mustBeString);
        let globalName = getFlag(options, keys2, "globalName", mustBeString);
        let mangleProps = getFlag(options, keys2, "mangleProps", mustBeRegExp);
        let reserveProps = getFlag(options, keys2, "reserveProps", mustBeRegExp);
        let mangleQuoted = getFlag(options, keys2, "mangleQuoted", mustBeBoolean);
        let minify = getFlag(options, keys2, "minify", mustBeBoolean);
        let minifySyntax = getFlag(options, keys2, "minifySyntax", mustBeBoolean);
        let minifyWhitespace = getFlag(options, keys2, "minifyWhitespace", mustBeBoolean);
        let minifyIdentifiers = getFlag(options, keys2, "minifyIdentifiers", mustBeBoolean);
        let drop = getFlag(options, keys2, "drop", mustBeArray);
        let charset = getFlag(options, keys2, "charset", mustBeString);
        let treeShaking = getFlag(options, keys2, "treeShaking", mustBeBoolean);
        let ignoreAnnotations = getFlag(options, keys2, "ignoreAnnotations", mustBeBoolean);
        let jsx = getFlag(options, keys2, "jsx", mustBeString);
        let jsxFactory = getFlag(options, keys2, "jsxFactory", mustBeString);
        let jsxFragment = getFlag(options, keys2, "jsxFragment", mustBeString);
        let jsxImportSource = getFlag(options, keys2, "jsxImportSource", mustBeString);
        let jsxDev = getFlag(options, keys2, "jsxDev", mustBeBoolean);
        let jsxSideEffects = getFlag(options, keys2, "jsxSideEffects", mustBeBoolean);
        let define = getFlag(options, keys2, "define", mustBeObject);
        let logOverride = getFlag(options, keys2, "logOverride", mustBeObject);
        let supported = getFlag(options, keys2, "supported", mustBeObject);
        let pure = getFlag(options, keys2, "pure", mustBeArray);
        let keepNames = getFlag(options, keys2, "keepNames", mustBeBoolean);
        let platform = getFlag(options, keys2, "platform", mustBeString);
        if (legalComments)
          flags.push(`--legal-comments=${legalComments}`);
        if (sourceRoot !== void 0)
          flags.push(`--source-root=${sourceRoot}`);
        if (sourcesContent !== void 0)
          flags.push(`--sources-content=${sourcesContent}`);
        if (target) {
          if (Array.isArray(target))
            flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
          else
            flags.push(`--target=${validateTarget(target)}`);
        }
        if (format)
          flags.push(`--format=${format}`);
        if (globalName)
          flags.push(`--global-name=${globalName}`);
        if (platform)
          flags.push(`--platform=${platform}`);
        if (minify)
          flags.push("--minify");
        if (minifySyntax)
          flags.push("--minify-syntax");
        if (minifyWhitespace)
          flags.push("--minify-whitespace");
        if (minifyIdentifiers)
          flags.push("--minify-identifiers");
        if (charset)
          flags.push(`--charset=${charset}`);
        if (treeShaking !== void 0)
          flags.push(`--tree-shaking=${treeShaking}`);
        if (ignoreAnnotations)
          flags.push(`--ignore-annotations`);
        if (drop)
          for (let what of drop)
            flags.push(`--drop:${validateStringValue(what, "drop")}`);
        if (mangleProps)
          flags.push(`--mangle-props=${mangleProps.source}`);
        if (reserveProps)
          flags.push(`--reserve-props=${reserveProps.source}`);
        if (mangleQuoted !== void 0)
          flags.push(`--mangle-quoted=${mangleQuoted}`);
        if (jsx)
          flags.push(`--jsx=${jsx}`);
        if (jsxFactory)
          flags.push(`--jsx-factory=${jsxFactory}`);
        if (jsxFragment)
          flags.push(`--jsx-fragment=${jsxFragment}`);
        if (jsxImportSource)
          flags.push(`--jsx-import-source=${jsxImportSource}`);
        if (jsxDev)
          flags.push(`--jsx-dev`);
        if (jsxSideEffects)
          flags.push(`--jsx-side-effects`);
        if (define) {
          for (let key in define) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
          }
        }
        if (logOverride) {
          for (let key in logOverride) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid log override: ${key}`);
            flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
          }
        }
        if (supported) {
          for (let key in supported) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid supported: ${key}`);
            const value = supported[key];
            if (typeof value !== "boolean")
              throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
            flags.push(`--supported:${key}=${value}`);
          }
        }
        if (pure)
          for (let fn of pure)
            flags.push(`--pure:${validateStringValue(fn, "pure")}`);
        if (keepNames)
          flags.push(`--keep-names`);
      }
      function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
        var _a;
        let flags = [];
        let entries3 = [];
        let keys2 = /* @__PURE__ */ Object.create(null);
        let stdinContents = null;
        let stdinResolveDir = null;
        let watchMode = null;
        pushLogFlags(flags, options, keys2, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys2);
        let sourcemap = getFlag(options, keys2, "sourcemap", mustBeStringOrBoolean);
        let bundle = getFlag(options, keys2, "bundle", mustBeBoolean);
        let watch = getFlag(options, keys2, "watch", mustBeBooleanOrObject);
        let splitting = getFlag(options, keys2, "splitting", mustBeBoolean);
        let preserveSymlinks = getFlag(options, keys2, "preserveSymlinks", mustBeBoolean);
        let metafile = getFlag(options, keys2, "metafile", mustBeBoolean);
        let outfile = getFlag(options, keys2, "outfile", mustBeString);
        let outdir = getFlag(options, keys2, "outdir", mustBeString);
        let outbase = getFlag(options, keys2, "outbase", mustBeString);
        let tsconfig = getFlag(options, keys2, "tsconfig", mustBeString);
        let resolveExtensions = getFlag(options, keys2, "resolveExtensions", mustBeArray);
        let nodePathsInput = getFlag(options, keys2, "nodePaths", mustBeArray);
        let mainFields = getFlag(options, keys2, "mainFields", mustBeArray);
        let conditions = getFlag(options, keys2, "conditions", mustBeArray);
        let external = getFlag(options, keys2, "external", mustBeArray);
        let packages = getFlag(options, keys2, "packages", mustBeString);
        let alias = getFlag(options, keys2, "alias", mustBeObject);
        let loader = getFlag(options, keys2, "loader", mustBeObject);
        let outExtension = getFlag(options, keys2, "outExtension", mustBeObject);
        let publicPath = getFlag(options, keys2, "publicPath", mustBeString);
        let entryNames = getFlag(options, keys2, "entryNames", mustBeString);
        let chunkNames = getFlag(options, keys2, "chunkNames", mustBeString);
        let assetNames = getFlag(options, keys2, "assetNames", mustBeString);
        let inject = getFlag(options, keys2, "inject", mustBeArray);
        let banner = getFlag(options, keys2, "banner", mustBeObject);
        let footer = getFlag(options, keys2, "footer", mustBeObject);
        let entryPoints = getFlag(options, keys2, "entryPoints", mustBeArrayOrRecord);
        let absWorkingDir = getFlag(options, keys2, "absWorkingDir", mustBeString);
        let stdin = getFlag(options, keys2, "stdin", mustBeObject);
        let write = (_a = getFlag(options, keys2, "write", mustBeBoolean)) != null ? _a : writeDefault;
        let allowOverwrite = getFlag(options, keys2, "allowOverwrite", mustBeBoolean);
        let incremental = getFlag(options, keys2, "incremental", mustBeBoolean) === true;
        let mangleCache = getFlag(options, keys2, "mangleCache", mustBeObject);
        keys2.plugins = true;
        checkForInvalidFlags(options, keys2, `in ${callName}() call`);
        if (sourcemap)
          flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
        if (bundle)
          flags.push("--bundle");
        if (allowOverwrite)
          flags.push("--allow-overwrite");
        if (watch) {
          flags.push("--watch");
          if (typeof watch === "boolean") {
            watchMode = {};
          } else {
            let watchKeys = /* @__PURE__ */ Object.create(null);
            let onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
            checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`);
            watchMode = { onRebuild };
          }
        }
        if (splitting)
          flags.push("--splitting");
        if (preserveSymlinks)
          flags.push("--preserve-symlinks");
        if (metafile)
          flags.push(`--metafile`);
        if (outfile)
          flags.push(`--outfile=${outfile}`);
        if (outdir)
          flags.push(`--outdir=${outdir}`);
        if (outbase)
          flags.push(`--outbase=${outbase}`);
        if (tsconfig)
          flags.push(`--tsconfig=${tsconfig}`);
        if (packages)
          flags.push(`--packages=${packages}`);
        if (resolveExtensions) {
          let values2 = [];
          for (let value of resolveExtensions) {
            validateStringValue(value, "resolve extension");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid resolve extension: ${value}`);
            values2.push(value);
          }
          flags.push(`--resolve-extensions=${values2.join(",")}`);
        }
        if (publicPath)
          flags.push(`--public-path=${publicPath}`);
        if (entryNames)
          flags.push(`--entry-names=${entryNames}`);
        if (chunkNames)
          flags.push(`--chunk-names=${chunkNames}`);
        if (assetNames)
          flags.push(`--asset-names=${assetNames}`);
        if (mainFields) {
          let values2 = [];
          for (let value of mainFields) {
            validateStringValue(value, "main field");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid main field: ${value}`);
            values2.push(value);
          }
          flags.push(`--main-fields=${values2.join(",")}`);
        }
        if (conditions) {
          let values2 = [];
          for (let value of conditions) {
            validateStringValue(value, "condition");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid condition: ${value}`);
            values2.push(value);
          }
          flags.push(`--conditions=${values2.join(",")}`);
        }
        if (external)
          for (let name of external)
            flags.push(`--external:${validateStringValue(name, "external")}`);
        if (alias) {
          for (let old in alias) {
            if (old.indexOf("=") >= 0)
              throw new Error(`Invalid package name in alias: ${old}`);
            flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
          }
        }
        if (banner) {
          for (let type in banner) {
            if (type.indexOf("=") >= 0)
              throw new Error(`Invalid banner file type: ${type}`);
            flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
          }
        }
        if (footer) {
          for (let type in footer) {
            if (type.indexOf("=") >= 0)
              throw new Error(`Invalid footer file type: ${type}`);
            flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
          }
        }
        if (inject)
          for (let path of inject)
            flags.push(`--inject:${validateStringValue(path, "inject")}`);
        if (loader) {
          for (let ext in loader) {
            if (ext.indexOf("=") >= 0)
              throw new Error(`Invalid loader extension: ${ext}`);
            flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
          }
        }
        if (outExtension) {
          for (let ext in outExtension) {
            if (ext.indexOf("=") >= 0)
              throw new Error(`Invalid out extension: ${ext}`);
            flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
          }
        }
        if (entryPoints) {
          if (Array.isArray(entryPoints)) {
            for (let entryPoint of entryPoints) {
              entries3.push(["", validateStringValue(entryPoint, "entry point")]);
            }
          } else {
            for (let key in entryPoints) {
              entries3.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
            }
          }
        }
        if (stdin) {
          let stdinKeys = /* @__PURE__ */ Object.create(null);
          let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
          let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
          let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
          let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
          checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
          if (sourcefile)
            flags.push(`--sourcefile=${sourcefile}`);
          if (loader2)
            flags.push(`--loader=${loader2}`);
          if (resolveDir)
            stdinResolveDir = resolveDir;
          if (typeof contents === "string")
            stdinContents = encodeUTF8(contents);
          else if (contents instanceof Uint8Array)
            stdinContents = contents;
        }
        let nodePaths = [];
        if (nodePathsInput) {
          for (let value of nodePathsInput) {
            value += "";
            nodePaths.push(value);
          }
        }
        return {
          entries: entries3,
          flags,
          write,
          stdinContents,
          stdinResolveDir,
          absWorkingDir,
          incremental,
          nodePaths,
          watch: watchMode,
          mangleCache: validateMangleCache(mangleCache)
        };
      }
      function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
        let flags = [];
        let keys2 = /* @__PURE__ */ Object.create(null);
        pushLogFlags(flags, options, keys2, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys2);
        let sourcemap = getFlag(options, keys2, "sourcemap", mustBeStringOrBoolean);
        let tsconfigRaw = getFlag(options, keys2, "tsconfigRaw", mustBeStringOrObject);
        let sourcefile = getFlag(options, keys2, "sourcefile", mustBeString);
        let loader = getFlag(options, keys2, "loader", mustBeString);
        let banner = getFlag(options, keys2, "banner", mustBeString);
        let footer = getFlag(options, keys2, "footer", mustBeString);
        let mangleCache = getFlag(options, keys2, "mangleCache", mustBeObject);
        checkForInvalidFlags(options, keys2, `in ${callName}() call`);
        if (sourcemap)
          flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
        if (tsconfigRaw)
          flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
        if (sourcefile)
          flags.push(`--sourcefile=${sourcefile}`);
        if (loader)
          flags.push(`--loader=${loader}`);
        if (banner)
          flags.push(`--banner=${banner}`);
        if (footer)
          flags.push(`--footer=${footer}`);
        return {
          flags,
          mangleCache: validateMangleCache(mangleCache)
        };
      }
      function createChannel(streamIn) {
        const requestCallbacksByKey = {};
        const closeData = { didClose: false, reason: "" };
        let responseCallbacks = {};
        let nextRequestID = 0;
        let nextBuildKey = 0;
        let stdout = new Uint8Array(16 * 1024);
        let stdoutUsed = 0;
        let readFromStdout = (chunk) => {
          let limit = stdoutUsed + chunk.length;
          if (limit > stdout.length) {
            let swap = new Uint8Array(limit * 2);
            swap.set(stdout);
            stdout = swap;
          }
          stdout.set(chunk, stdoutUsed);
          stdoutUsed += chunk.length;
          let offset = 0;
          while (offset + 4 <= stdoutUsed) {
            let length = readUInt32LE(stdout, offset);
            if (offset + 4 + length > stdoutUsed) {
              break;
            }
            offset += 4;
            handleIncomingPacket(stdout.subarray(offset, offset + length));
            offset += length;
          }
          if (offset > 0) {
            stdout.copyWithin(0, offset, stdoutUsed);
            stdoutUsed -= offset;
          }
        };
        let afterClose = (error) => {
          closeData.didClose = true;
          if (error)
            closeData.reason = ": " + (error.message || error);
          const text = "The service was stopped" + closeData.reason;
          for (let id in responseCallbacks) {
            responseCallbacks[id](text, null);
          }
          responseCallbacks = {};
        };
        let sendRequest = (refs, value, callback) => {
          if (closeData.didClose)
            return callback("The service is no longer running" + closeData.reason, null);
          let id = nextRequestID++;
          responseCallbacks[id] = (error, response) => {
            try {
              callback(error, response);
            } finally {
              if (refs)
                refs.unref();
            }
          };
          if (refs)
            refs.ref();
          streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
        };
        let sendResponse = (id, value) => {
          if (closeData.didClose)
            throw new Error("The service is no longer running" + closeData.reason);
          streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
        };
        let handleRequest = (id, request) => __async(this, null, function* () {
          try {
            if (request.command === "ping") {
              sendResponse(id, {});
              return;
            }
            if (typeof request.key === "number") {
              const requestCallbacks = requestCallbacksByKey[request.key];
              if (requestCallbacks) {
                const callback = requestCallbacks[request.command];
                if (callback) {
                  yield callback(id, request);
                  return;
                }
              }
            }
            throw new Error(`Invalid command: ` + request.command);
          } catch (e) {
            sendResponse(id, { errors: [extractErrorMessageV8(e, streamIn, null, void 0, "")] });
          }
        });
        let isFirstPacket = true;
        let handleIncomingPacket = (bytes) => {
          if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.16.14") {
              throw new Error(`Cannot start service: Host version "${"0.16.14"}" does not match binary version ${quote(binaryVersion)}`);
            }
            return;
          }
          let packet = decodePacket(bytes);
          if (packet.isRequest) {
            handleRequest(packet.id, packet.value);
          } else {
            let callback = responseCallbacks[packet.id];
            delete responseCallbacks[packet.id];
            if (packet.value.error)
              callback(packet.value.error, {});
            else
              callback(null, packet.value);
          }
        };
        let buildOrServe = ({ callName, refs, serveOptions, options, isTTY, defaultWD, callback }) => {
          let refCount = 0;
          const buildKey = nextBuildKey++;
          const requestCallbacks = {};
          const buildRefs = {
            ref() {
              if (++refCount === 1) {
                if (refs)
                  refs.ref();
              }
            },
            unref() {
              if (--refCount === 0) {
                delete requestCallbacksByKey[buildKey];
                if (refs)
                  refs.unref();
              }
            }
          };
          requestCallbacksByKey[buildKey] = requestCallbacks;
          buildRefs.ref();
          buildOrServeImpl(
            callName,
            buildKey,
            sendRequest,
            sendResponse,
            buildRefs,
            streamIn,
            requestCallbacks,
            options,
            serveOptions,
            isTTY,
            defaultWD,
            closeData,
            (err, res) => {
              try {
                callback(err, res);
              } finally {
                buildRefs.unref();
              }
            }
          );
        };
        let transform22 = ({ callName, refs, input, options, isTTY, fs, callback }) => {
          const details = createObjectStash();
          let start = (inputPath) => {
            try {
              if (typeof input !== "string" && !(input instanceof Uint8Array))
                throw new Error('The input to "transform" must be a string or a Uint8Array');
              let {
                flags,
                mangleCache
              } = flagsForTransformOptions(callName, options, isTTY, transformLogLevelDefault);
              let request = {
                command: "transform",
                flags,
                inputFS: inputPath !== null,
                input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
              };
              if (mangleCache)
                request.mangleCache = mangleCache;
              sendRequest(refs, request, (error, response) => {
                if (error)
                  return callback(new Error(error), null);
                let errors = replaceDetailsInMessages(response.errors, details);
                let warnings = replaceDetailsInMessages(response.warnings, details);
                let outstanding = 1;
                let next = () => {
                  if (--outstanding === 0) {
                    let result = { warnings, code: response.code, map: response.map };
                    if ("legalComments" in response)
                      result.legalComments = response == null ? void 0 : response.legalComments;
                    if (response.mangleCache)
                      result.mangleCache = response == null ? void 0 : response.mangleCache;
                    callback(null, result);
                  }
                };
                if (errors.length > 0)
                  return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                if (response.codeFS) {
                  outstanding++;
                  fs.readFile(response.code, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.code = contents;
                      next();
                    }
                  });
                }
                if (response.mapFS) {
                  outstanding++;
                  fs.readFile(response.map, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.map = contents;
                      next();
                    }
                  });
                }
                next();
              });
            } catch (e) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
              } catch (e2) {
              }
              const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
              sendRequest(refs, { command: "error", flags, error }, () => {
                error.detail = details.load(error.detail);
                callback(failureErrorWithLog("Transform failed", [error], []), null);
              });
            }
          };
          if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = () => fs.writeFile(input, next);
          }
          start(null);
        };
        let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
          let result = sanitizeMessages(messages, "messages", null, "");
          if (!options)
            throw new Error(`Missing second argument in ${callName}() call`);
          let keys2 = {};
          let kind = getFlag(options, keys2, "kind", mustBeString);
          let color = getFlag(options, keys2, "color", mustBeBoolean);
          let terminalWidth = getFlag(options, keys2, "terminalWidth", mustBeInteger);
          checkForInvalidFlags(options, keys2, `in ${callName}() call`);
          if (kind === void 0)
            throw new Error(`Missing "kind" in ${callName}() call`);
          if (kind !== "error" && kind !== "warning")
            throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
          let request = {
            command: "format-msgs",
            messages: result,
            isWarning: kind === "warning"
          };
          if (color !== void 0)
            request.color = color;
          if (terminalWidth !== void 0)
            request.terminalWidth = terminalWidth;
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            callback(null, response.messages);
          });
        };
        let analyzeMetafile2 = ({ callName, refs, metafile, options, callback }) => {
          if (options === void 0)
            options = {};
          let keys2 = {};
          let color = getFlag(options, keys2, "color", mustBeBoolean);
          let verbose = getFlag(options, keys2, "verbose", mustBeBoolean);
          checkForInvalidFlags(options, keys2, `in ${callName}() call`);
          let request = {
            command: "analyze-metafile",
            metafile
          };
          if (color !== void 0)
            request.color = color;
          if (verbose !== void 0)
            request.verbose = verbose;
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            callback(null, response.result);
          });
        };
        return {
          readFromStdout,
          afterClose,
          service: {
            buildOrServe,
            transform: transform22,
            formatMessages: formatMessages2,
            analyzeMetafile: analyzeMetafile2
          }
        };
      }
      function buildOrServeImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, serveOptions, isTTY, defaultWD, closeData, callback) {
        const details = createObjectStash();
        const logPluginError = (e, pluginName, note, done) => {
          const flags = [];
          try {
            pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
          } catch (e2) {
          }
          const message = extractErrorMessageV8(e, streamIn, details, note, pluginName);
          sendRequest(refs, { command: "error", flags, error: message }, () => {
            message.detail = details.load(message.detail);
            done(message);
          });
        };
        const handleError = (e, pluginName) => {
          logPluginError(e, pluginName, void 0, (error) => {
            callback(failureErrorWithLog("Build failed", [error], []), null);
          });
        };
        let plugins;
        if (typeof options === "object") {
          const value = options.plugins;
          if (value !== void 0) {
            if (!Array.isArray(value))
              throw new Error(`"plugins" must be an array`);
            plugins = value;
          }
        }
        if (plugins && plugins.length > 0) {
          if (streamIn.isSync) {
            handleError(new Error("Cannot use plugins in synchronous API calls"), "");
            return;
          }
          handlePlugins(
            buildKey,
            sendRequest,
            sendResponse,
            refs,
            streamIn,
            requestCallbacks,
            options,
            plugins,
            details
          ).then(
            (result) => {
              if (!result.ok) {
                handleError(result.error, result.pluginName);
                return;
              }
              try {
                buildOrServeContinue(result.requestPlugins, result.runOnEndCallbacks);
              } catch (e) {
                handleError(e, "");
              }
            },
            (e) => handleError(e, "")
          );
          return;
        }
        try {
          buildOrServeContinue(null, (result, logPluginError2, done) => done());
        } catch (e) {
          handleError(e, "");
        }
        function buildOrServeContinue(requestPlugins, runOnEndCallbacks) {
          let writeDefault = !streamIn.isWriteUnavailable;
          let {
            entries: entries3,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir,
            incremental,
            nodePaths,
            watch,
            mangleCache
          } = flagsForBuildOptions(callName, options, isTTY, buildLogLevelDefault, writeDefault);
          let request = {
            command: "build",
            key: buildKey,
            entries: entries3,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir: absWorkingDir || defaultWD,
            incremental,
            nodePaths
          };
          if (requestPlugins)
            request.plugins = requestPlugins;
          if (mangleCache)
            request.mangleCache = mangleCache;
          let serve2 = serveOptions && buildServeData(buildKey, sendRequest, sendResponse, refs, requestCallbacks, serveOptions, request);
          let rebuild;
          let stop;
          let copyResponseToResult = (response, result) => {
            if (response.outputFiles)
              result.outputFiles = response.outputFiles.map(convertOutputFiles);
            if (response.metafile)
              result.metafile = JSON.parse(response.metafile);
            if (response.mangleCache)
              result.mangleCache = response.mangleCache;
            if (response.writeToStdout !== void 0)
              console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
          };
          let buildResponseToResult = (response, callback2) => {
            let result = {
              errors: replaceDetailsInMessages(response.errors, details),
              warnings: replaceDetailsInMessages(response.warnings, details)
            };
            copyResponseToResult(response, result);
            runOnEndCallbacks(result, logPluginError, () => {
              if (result.errors.length > 0) {
                return callback2(failureErrorWithLog("Build failed", result.errors, result.warnings), null);
              }
              if (response.rebuild) {
                if (!rebuild) {
                  let isDisposed = false;
                  rebuild = () => new Promise((resolve, reject) => {
                    if (isDisposed || closeData.didClose)
                      throw new Error("Cannot rebuild");
                    sendRequest(
                      refs,
                      { command: "rebuild", key: buildKey },
                      (error2, response2) => {
                        if (error2) {
                          const message = { id: "", pluginName: "", text: error2, location: null, notes: [], detail: void 0 };
                          return callback2(failureErrorWithLog("Build failed", [message], []), null);
                        }
                        buildResponseToResult(response2, (error3, result3) => {
                          if (error3)
                            reject(error3);
                          else
                            resolve(result3);
                        });
                      }
                    );
                  });
                  refs.ref();
                  rebuild.dispose = () => {
                    if (isDisposed)
                      return;
                    isDisposed = true;
                    sendRequest(refs, { command: "rebuild-dispose", key: buildKey }, () => {
                    });
                    refs.unref();
                  };
                }
                result.rebuild = rebuild;
              }
              if (response.watch) {
                if (!stop) {
                  let isStopped = false;
                  refs.ref();
                  stop = () => {
                    if (isStopped)
                      return;
                    isStopped = true;
                    delete requestCallbacks["watch-rebuild"];
                    sendRequest(refs, { command: "watch-stop", key: buildKey }, () => {
                    });
                    refs.unref();
                  };
                  if (watch) {
                    requestCallbacks["watch-rebuild"] = (id, request2) => {
                      try {
                        let watchResponse = request2.args;
                        let result2 = {
                          errors: replaceDetailsInMessages(watchResponse.errors, details),
                          warnings: replaceDetailsInMessages(watchResponse.warnings, details)
                        };
                        copyResponseToResult(watchResponse, result2);
                        runOnEndCallbacks(result2, logPluginError, () => {
                          if (result2.errors.length > 0) {
                            if (watch.onRebuild)
                              watch.onRebuild(failureErrorWithLog("Build failed", result2.errors, result2.warnings), null);
                            return;
                          }
                          result2.stop = stop;
                          if (watch.onRebuild)
                            watch.onRebuild(null, result2);
                        });
                      } catch (err) {
                        console.error(err);
                      }
                      sendResponse(id, {});
                    };
                  }
                }
                result.stop = stop;
              }
              callback2(null, result);
            });
          };
          if (write && streamIn.isWriteUnavailable)
            throw new Error(`The "write" option is unavailable in this environment`);
          if (incremental && streamIn.isSync)
            throw new Error(`Cannot use "incremental" with a synchronous build`);
          if (watch && streamIn.isSync)
            throw new Error(`Cannot use "watch" with a synchronous build`);
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            if (serve2) {
              let serveResponse = response;
              let isStopped = false;
              refs.ref();
              let result = {
                port: serveResponse.port,
                host: serveResponse.host,
                wait: serve2.wait,
                stop() {
                  if (isStopped)
                    return;
                  isStopped = true;
                  serve2.stop();
                  refs.unref();
                }
              };
              refs.ref();
              serve2.wait.then(refs.unref, refs.unref);
              return callback(null, result);
            }
            return buildResponseToResult(response, callback);
          });
        }
      }
      var buildServeData = (buildKey, sendRequest, sendResponse, refs, requestCallbacks, options, request) => {
        let keys2 = {};
        let port = getFlag(options, keys2, "port", mustBeInteger);
        let host = getFlag(options, keys2, "host", mustBeString);
        let servedir = getFlag(options, keys2, "servedir", mustBeString);
        let onRequest = getFlag(options, keys2, "onRequest", mustBeFunction);
        let wait = new Promise((resolve, reject) => {
          requestCallbacks["serve-wait"] = (id, request2) => {
            if (request2.error !== null)
              reject(new Error(request2.error));
            else
              resolve();
            sendResponse(id, {});
          };
        });
        request.serve = {};
        checkForInvalidFlags(options, keys2, `in serve() call`);
        if (port !== void 0)
          request.serve.port = port;
        if (host !== void 0)
          request.serve.host = host;
        if (servedir !== void 0)
          request.serve.servedir = servedir;
        requestCallbacks["serve-request"] = (id, request2) => {
          if (onRequest)
            onRequest(request2.args);
          sendResponse(id, {});
        };
        return {
          wait,
          stop() {
            sendRequest(refs, { command: "serve-stop", key: buildKey }, () => {
            });
          }
        };
      };
      var handlePlugins = (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => __async(void 0, null, function* () {
        let onStartCallbacks = [];
        let onEndCallbacks = [];
        let onResolveCallbacks = {};
        let onLoadCallbacks = {};
        let nextCallbackID = 0;
        let i = 0;
        let requestPlugins = [];
        let isSetupDone = false;
        plugins = [...plugins];
        for (let item of plugins) {
          let keys2 = {};
          if (typeof item !== "object")
            throw new Error(`Plugin at index ${i} must be an object`);
          const name = getFlag(item, keys2, "name", mustBeString);
          if (typeof name !== "string" || name === "")
            throw new Error(`Plugin at index ${i} is missing a name`);
          try {
            let setup = getFlag(item, keys2, "setup", mustBeFunction);
            if (typeof setup !== "function")
              throw new Error(`Plugin is missing a setup function`);
            checkForInvalidFlags(item, keys2, `on plugin ${quote(name)}`);
            let plugin = {
              name,
              onResolve: [],
              onLoad: []
            };
            i++;
            let resolve = (path, options = {}) => {
              if (!isSetupDone)
                throw new Error('Cannot call "resolve" before plugin setup has completed');
              if (typeof path !== "string")
                throw new Error(`The path to resolve must be a string`);
              let keys22 = /* @__PURE__ */ Object.create(null);
              let pluginName = getFlag(options, keys22, "pluginName", mustBeString);
              let importer = getFlag(options, keys22, "importer", mustBeString);
              let namespace = getFlag(options, keys22, "namespace", mustBeString);
              let resolveDir = getFlag(options, keys22, "resolveDir", mustBeString);
              let kind = getFlag(options, keys22, "kind", mustBeString);
              let pluginData = getFlag(options, keys22, "pluginData", canBeAnything);
              checkForInvalidFlags(options, keys22, "in resolve() call");
              return new Promise((resolve2, reject) => {
                const request = {
                  command: "resolve",
                  path,
                  key: buildKey,
                  pluginName: name
                };
                if (pluginName != null)
                  request.pluginName = pluginName;
                if (importer != null)
                  request.importer = importer;
                if (namespace != null)
                  request.namespace = namespace;
                if (resolveDir != null)
                  request.resolveDir = resolveDir;
                if (kind != null)
                  request.kind = kind;
                else
                  throw new Error(`Must specify "kind" when calling "resolve"`);
                if (pluginData != null)
                  request.pluginData = details.store(pluginData);
                sendRequest(refs, request, (error, response) => {
                  if (error !== null)
                    reject(new Error(error));
                  else
                    resolve2({
                      errors: replaceDetailsInMessages(response.errors, details),
                      warnings: replaceDetailsInMessages(response.warnings, details),
                      path: response.path,
                      external: response.external,
                      sideEffects: response.sideEffects,
                      namespace: response.namespace,
                      suffix: response.suffix,
                      pluginData: details.load(response.pluginData)
                    });
                });
              });
            };
            let promise = setup({
              initialOptions,
              resolve,
              onStart(callback) {
                let registeredText = `This error came from the "onStart" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                onStartCallbacks.push({ name, callback, note: registeredNote });
              },
              onEnd(callback) {
                let registeredText = `This error came from the "onEnd" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                onEndCallbacks.push({ name, callback, note: registeredNote });
              },
              onResolve(options, callback) {
                let registeredText = `This error came from the "onResolve" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                let keys22 = {};
                let filter3 = getFlag(options, keys22, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys22, "namespace", mustBeString);
                checkForInvalidFlags(options, keys22, `in onResolve() call for plugin ${quote(name)}`);
                if (filter3 == null)
                  throw new Error(`onResolve() call is missing a filter`);
                let id = nextCallbackID++;
                onResolveCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onResolve.push({ id, filter: filter3.source, namespace: namespace || "" });
              },
              onLoad(options, callback) {
                let registeredText = `This error came from the "onLoad" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                let keys22 = {};
                let filter3 = getFlag(options, keys22, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys22, "namespace", mustBeString);
                checkForInvalidFlags(options, keys22, `in onLoad() call for plugin ${quote(name)}`);
                if (filter3 == null)
                  throw new Error(`onLoad() call is missing a filter`);
                let id = nextCallbackID++;
                onLoadCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onLoad.push({ id, filter: filter3.source, namespace: namespace || "" });
              },
              esbuild: streamIn.esbuild
            });
            if (promise)
              yield promise;
            requestPlugins.push(plugin);
          } catch (e) {
            return { ok: false, error: e, pluginName: name };
          }
        }
        requestCallbacks["on-start"] = (id, request) => __async(void 0, null, function* () {
          let response = { errors: [], warnings: [] };
          yield Promise.all(onStartCallbacks.map((_0) => __async(void 0, [_0], function* ({ name, callback, note }) {
            try {
              let result = yield callback();
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
                let keys2 = {};
                let errors = getFlag(result, keys2, "errors", mustBeArray);
                let warnings = getFlag(result, keys2, "warnings", mustBeArray);
                checkForInvalidFlags(result, keys2, `from onStart() callback in plugin ${quote(name)}`);
                if (errors != null)
                  response.errors.push(...sanitizeMessages(errors, "errors", details, name));
                if (warnings != null)
                  response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name));
              }
            } catch (e) {
              response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
            }
          })));
          sendResponse(id, response);
        });
        requestCallbacks["on-resolve"] = (id, request) => __async(void 0, null, function* () {
          let response = {}, name = "", callback, note;
          for (let id2 of request.ids) {
            try {
              ({ name, callback, note } = onResolveCallbacks[id2]);
              let result = yield callback({
                path: request.path,
                importer: request.importer,
                namespace: request.namespace,
                resolveDir: request.resolveDir,
                kind: request.kind,
                pluginData: details.load(request.pluginData)
              });
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
                let keys2 = {};
                let pluginName = getFlag(result, keys2, "pluginName", mustBeString);
                let path = getFlag(result, keys2, "path", mustBeString);
                let namespace = getFlag(result, keys2, "namespace", mustBeString);
                let suffix = getFlag(result, keys2, "suffix", mustBeString);
                let external = getFlag(result, keys2, "external", mustBeBoolean);
                let sideEffects = getFlag(result, keys2, "sideEffects", mustBeBoolean);
                let pluginData = getFlag(result, keys2, "pluginData", canBeAnything);
                let errors = getFlag(result, keys2, "errors", mustBeArray);
                let warnings = getFlag(result, keys2, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys2, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys2, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys2, `from onResolve() callback in plugin ${quote(name)}`);
                response.id = id2;
                if (pluginName != null)
                  response.pluginName = pluginName;
                if (path != null)
                  response.path = path;
                if (namespace != null)
                  response.namespace = namespace;
                if (suffix != null)
                  response.suffix = suffix;
                if (external != null)
                  response.external = external;
                if (sideEffects != null)
                  response.sideEffects = sideEffects;
                if (pluginData != null)
                  response.pluginData = details.store(pluginData);
                if (errors != null)
                  response.errors = sanitizeMessages(errors, "errors", details, name);
                if (warnings != null)
                  response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                if (watchFiles != null)
                  response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                if (watchDirs != null)
                  response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                break;
              }
            } catch (e) {
              response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
              break;
            }
          }
          sendResponse(id, response);
        });
        requestCallbacks["on-load"] = (id, request) => __async(void 0, null, function* () {
          let response = {}, name = "", callback, note;
          for (let id2 of request.ids) {
            try {
              ({ name, callback, note } = onLoadCallbacks[id2]);
              let result = yield callback({
                path: request.path,
                namespace: request.namespace,
                suffix: request.suffix,
                pluginData: details.load(request.pluginData)
              });
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
                let keys2 = {};
                let pluginName = getFlag(result, keys2, "pluginName", mustBeString);
                let contents = getFlag(result, keys2, "contents", mustBeStringOrUint8Array);
                let resolveDir = getFlag(result, keys2, "resolveDir", mustBeString);
                let pluginData = getFlag(result, keys2, "pluginData", canBeAnything);
                let loader = getFlag(result, keys2, "loader", mustBeString);
                let errors = getFlag(result, keys2, "errors", mustBeArray);
                let warnings = getFlag(result, keys2, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys2, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys2, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys2, `from onLoad() callback in plugin ${quote(name)}`);
                response.id = id2;
                if (pluginName != null)
                  response.pluginName = pluginName;
                if (contents instanceof Uint8Array)
                  response.contents = contents;
                else if (contents != null)
                  response.contents = encodeUTF8(contents);
                if (resolveDir != null)
                  response.resolveDir = resolveDir;
                if (pluginData != null)
                  response.pluginData = details.store(pluginData);
                if (loader != null)
                  response.loader = loader;
                if (errors != null)
                  response.errors = sanitizeMessages(errors, "errors", details, name);
                if (warnings != null)
                  response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                if (watchFiles != null)
                  response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                if (watchDirs != null)
                  response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                break;
              }
            } catch (e) {
              response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
              break;
            }
          }
          sendResponse(id, response);
        });
        let runOnEndCallbacks = (result, logPluginError, done) => done();
        if (onEndCallbacks.length > 0) {
          runOnEndCallbacks = (result, logPluginError, done) => {
            (() => __async(void 0, null, function* () {
              for (const { name, callback, note } of onEndCallbacks) {
                try {
                  yield callback(result);
                } catch (e) {
                  result.errors.push(yield new Promise((resolve) => logPluginError(e, name, note && note(), resolve)));
                }
              }
            }))().then(done);
          };
        }
        isSetupDone = true;
        return {
          ok: true,
          requestPlugins,
          runOnEndCallbacks
        };
      });
      function createObjectStash() {
        const map2 = /* @__PURE__ */ new Map();
        let nextID = 0;
        return {
          load(id) {
            return map2.get(id);
          },
          store(value) {
            if (value === void 0)
              return -1;
            const id = nextID++;
            map2.set(id, value);
            return id;
          }
        };
      }
      function extractCallerV8(e, streamIn, ident) {
        let note;
        let tried = false;
        return () => {
          if (tried)
            return note;
          tried = true;
          try {
            let lines = (e.stack + "").split("\n");
            lines.splice(1, 1);
            let location2 = parseStackLinesV8(streamIn, lines, ident);
            if (location2) {
              note = { text: e.message, location: location2 };
              return note;
            }
          } catch (e2) {
          }
        };
      }
      function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
        let text = "Internal error";
        let location2 = null;
        try {
          text = (e && e.message || e) + "";
        } catch (e2) {
        }
        try {
          location2 = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
        } catch (e2) {
        }
        return { id: "", pluginName, text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
      }
      function parseStackLinesV8(streamIn, lines, ident) {
        let at3 = "    at ";
        if (streamIn.readFileSync && !lines[0].startsWith(at3) && lines[1].startsWith(at3)) {
          for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
            if (!line.startsWith(at3))
              continue;
            line = line.slice(at3.length);
            while (true) {
              let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
              if (match) {
                line = match[1];
                continue;
              }
              match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
              if (match) {
                line = match[1];
                continue;
              }
              match = /^(\S+):(\d+):(\d+)$/.exec(line);
              if (match) {
                let contents;
                try {
                  contents = streamIn.readFileSync(match[1], "utf8");
                } catch (e) {
                  break;
                }
                let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
                let column = +match[3] - 1;
                let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                return {
                  file: match[1],
                  namespace: "file",
                  line: +match[2],
                  column: encodeUTF8(lineText.slice(0, column)).length,
                  length: encodeUTF8(lineText.slice(column, column + length)).length,
                  lineText: lineText + "\n" + lines.slice(1).join("\n"),
                  suggestion: ""
                };
              }
              break;
            }
          }
        }
        return null;
      }
      function failureErrorWithLog(text, errors, warnings) {
        let limit = 5;
        let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
          if (i === limit)
            return "\n...";
          if (!e.location)
            return `
error: ${e.text}`;
          let { file, line, column } = e.location;
          let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
          return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
        }).join("");
        let error = new Error(`${text}${summary}`);
        error.errors = errors;
        error.warnings = warnings;
        return error;
      }
      function replaceDetailsInMessages(messages, stash) {
        for (const message of messages) {
          message.detail = stash.load(message.detail);
        }
        return messages;
      }
      function sanitizeLocation(location2, where) {
        if (location2 == null)
          return null;
        let keys2 = {};
        let file = getFlag(location2, keys2, "file", mustBeString);
        let namespace = getFlag(location2, keys2, "namespace", mustBeString);
        let line = getFlag(location2, keys2, "line", mustBeInteger);
        let column = getFlag(location2, keys2, "column", mustBeInteger);
        let length = getFlag(location2, keys2, "length", mustBeInteger);
        let lineText = getFlag(location2, keys2, "lineText", mustBeString);
        let suggestion = getFlag(location2, keys2, "suggestion", mustBeString);
        checkForInvalidFlags(location2, keys2, where);
        return {
          file: file || "",
          namespace: namespace || "",
          line: line || 0,
          column: column || 0,
          length: length || 0,
          lineText: lineText || "",
          suggestion: suggestion || ""
        };
      }
      function sanitizeMessages(messages, property, stash, fallbackPluginName) {
        let messagesClone = [];
        let index = 0;
        for (const message of messages) {
          let keys2 = {};
          let id = getFlag(message, keys2, "id", mustBeString);
          let pluginName = getFlag(message, keys2, "pluginName", mustBeString);
          let text = getFlag(message, keys2, "text", mustBeString);
          let location2 = getFlag(message, keys2, "location", mustBeObjectOrNull);
          let notes = getFlag(message, keys2, "notes", mustBeArray);
          let detail = getFlag(message, keys2, "detail", canBeAnything);
          let where = `in element ${index} of "${property}"`;
          checkForInvalidFlags(message, keys2, where);
          let notesClone = [];
          if (notes) {
            for (const note of notes) {
              let noteKeys = {};
              let noteText = getFlag(note, noteKeys, "text", mustBeString);
              let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
              checkForInvalidFlags(note, noteKeys, where);
              notesClone.push({
                text: noteText || "",
                location: sanitizeLocation(noteLocation, where)
              });
            }
          }
          messagesClone.push({
            id: id || "",
            pluginName: pluginName || fallbackPluginName,
            text: text || "",
            location: sanitizeLocation(location2, where),
            notes: notesClone,
            detail: stash ? stash.store(detail) : -1
          });
          index++;
        }
        return messagesClone;
      }
      function sanitizeStringArray(values2, property) {
        const result = [];
        for (const value of values2) {
          if (typeof value !== "string")
            throw new Error(`${quote(property)} must be an array of strings`);
          result.push(value);
        }
        return result;
      }
      function convertOutputFiles({ path, contents }) {
        let text = null;
        return {
          path,
          contents,
          get text() {
            const binary = this.contents;
            if (text === null || binary !== contents) {
              contents = binary;
              text = decodeUTF8(binary);
            }
            return text;
          }
        };
      }
      var version = "0.16.14";
      var build = (options) => ensureServiceIsRunning().build(options);
      var serve = () => {
        throw new Error(`The "serve" API only works in node`);
      };
      var transform2 = (input, options) => ensureServiceIsRunning().transform(input, options);
      var formatMessages = (messages, options) => ensureServiceIsRunning().formatMessages(messages, options);
      var analyzeMetafile = (metafile, options) => ensureServiceIsRunning().analyzeMetafile(metafile, options);
      var buildSync = () => {
        throw new Error(`The "buildSync" API only works in node`);
      };
      var transformSync = () => {
        throw new Error(`The "transformSync" API only works in node`);
      };
      var formatMessagesSync = () => {
        throw new Error(`The "formatMessagesSync" API only works in node`);
      };
      var analyzeMetafileSync = () => {
        throw new Error(`The "analyzeMetafileSync" API only works in node`);
      };
      var initializePromise;
      var longLivedService;
      var ensureServiceIsRunning = () => {
        if (longLivedService)
          return longLivedService;
        if (initializePromise)
          throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
        throw new Error('You need to call "initialize" before calling this');
      };
      var initialize2 = (options) => {
        options = validateInitializeOptions(options || {});
        let wasmURL = options.wasmURL;
        let wasmModule = options.wasmModule;
        let useWorker = options.worker !== false;
        if (!wasmURL && !wasmModule)
          throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
        if (initializePromise)
          throw new Error('Cannot call "initialize" more than once');
        initializePromise = startRunningService(wasmURL || "", wasmModule, useWorker);
        initializePromise.catch(() => {
          initializePromise = void 0;
        });
        return initializePromise;
      };
      var startRunningService = (wasmURL, wasmModule, useWorker) => __async(void 0, null, function* () {
        let worker;
        if (useWorker) {
          let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            // unused\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                // Go\'s SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)\n                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported\n                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).\n                // This changes the SP, thus we have to update the SP used by the imported function.\n                // func wasmExit(code int32)\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                // func resetMemoryDataView()\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                // func nanotime1() int64\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                // func walltime() (sec int64, nsec int32)\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                // func scheduleTimeoutEvent(delay int64) int32\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                    // setTimeout has been seen to fire up to 1 millisecond early\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                // func clearTimeoutEvent(id int32)\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                // func getRandomData(r []byte)\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                // func finalizeRef(v ref)\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                // func stringVal(value string) ref\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                // func valueGet(v ref, p string) ref\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                // func valueSet(v ref, p string, x ref)\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                // func valueDelete(v ref, p string)\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                // func valueIndex(v ref, i int) ref\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                // valueSetIndex(v ref, i int, x ref)\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                // func valueCall(v ref, m string, args []ref) (ref, bool)\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                // func valueInvoke(v ref, args []ref) (ref, bool)\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                // func valueNew(v ref, args []ref) (ref, bool)\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                // func valueLength(v ref) int\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                // valuePrepareString(v ref) (ref, int)\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                // valueLoadString(v ref, b []byte)\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                // func valueInstanceOf(v ref, t ref) bool\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                // func copyBytesToGo(dst []byte, src ref) (int, bool)\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                // func copyBytesToJS(dst ref, src []byte) (int, bool)\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                // JS values that Go currently has references to, indexed by reference id\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                // mapping from JS values to reference ids\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.16.14"}`];\n        tryToInstantiateModule(wasm, go).then(\n          (instance) => {\n            postMessage(null);\n            go.run(instance);\n          },\n          (error) => {\n            postMessage(error);\n          }\n        );\n      };\n      function tryToInstantiateModule(wasm, go) {\n        return __async(this, null, function* () {\n          if (wasm instanceof WebAssembly.Module) {\n            return WebAssembly.instantiate(wasm, go.importObject);\n          }\n          const res = yield fetch(wasm);\n          if (!res.ok)\n            throw new Error(`Failed to download ${JSON.stringify(wasm)}`);\n          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {\n            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);\n            return result2.instance;\n          }\n          const bytes = yield res.arrayBuffer();\n          const result = yield WebAssembly.instantiate(bytes, go.importObject);\n          return result.instance;\n        });\n      }\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
          worker = new Worker(URL.createObjectURL(blob));
        } else {
          let onmessage = ((postMessage) => {
            var __async2 = (__this, __arguments, generator) => {
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
            let onmessage2;
            let globalThis2 = {};
            for (let o = self; o; o = Object.getPrototypeOf(o))
              for (let k of Object.getOwnPropertyNames(o))
                if (!(k in globalThis2))
                  Object.defineProperty(globalThis2, k, { get: () => self[k] });
            "use strict";
            (() => {
              const enosys = () => {
                const err = new Error("not implemented");
                err.code = "ENOSYS";
                return err;
              };
              if (!globalThis2.fs) {
                let outputBuf = "";
                globalThis2.fs = {
                  constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
                  // unused
                  writeSync(fd, buf) {
                    outputBuf += decoder.decode(buf);
                    const nl = outputBuf.lastIndexOf("\n");
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
              if (!globalThis2.process) {
                globalThis2.process = {
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
              if (!globalThis2.crypto) {
                throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
              }
              if (!globalThis2.performance) {
                throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
              }
              if (!globalThis2.TextEncoder) {
                throw new Error("globalThis.TextEncoder is not available, polyfill required");
              }
              if (!globalThis2.TextDecoder) {
                throw new Error("globalThis.TextDecoder is not available, polyfill required");
              }
              const encoder = new TextEncoder("utf-8");
              const decoder = new TextDecoder("utf-8");
              globalThis2.Go = class {
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
                        globalThis2.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                      },
                      // func resetMemoryDataView()
                      "runtime.resetMemoryDataView": (sp) => {
                        sp >>>= 0;
                        this.mem = new DataView(this._inst.exports.mem.buffer);
                      },
                      // func nanotime1() int64
                      "runtime.nanotime1": (sp) => {
                        sp >>>= 0;
                        setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                      },
                      // func walltime() (sec int64, nsec int32)
                      "runtime.walltime": (sp) => {
                        sp >>>= 0;
                        const msec = new Date().getTime();
                        setInt64(sp + 8, msec / 1e3);
                        this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
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
                              console.warn("scheduleTimeoutEvent: missed timeout event");
                              this._resume();
                            }
                          },
                          getInt64(sp + 8) + 1
                          // setTimeout has been seen to fire up to 1 millisecond early
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
                        sp = this._inst.exports.getsp() >>> 0;
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
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 56, result);
                          this.mem.setUint8(sp + 64, 1);
                        } catch (err) {
                          sp = this._inst.exports.getsp() >>> 0;
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
                      // func valueNew(v ref, args []ref) (ref, bool)
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
                        this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
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
                      }
                    }
                  };
                }
                run(instance) {
                  return __async2(this, null, function* () {
                    if (!(instance instanceof WebAssembly.Instance)) {
                      throw new Error("Go.run: WebAssembly.Instance expected");
                    }
                    this._inst = instance;
                    this.mem = new DataView(this._inst.exports.mem.buffer);
                    this._values = [
                      // JS values that Go currently has references to, indexed by reference id
                      NaN,
                      0,
                      null,
                      true,
                      false,
                      globalThis2,
                      this
                    ];
                    this._goRefCounts = new Array(this._values.length).fill(Infinity);
                    this._ids = /* @__PURE__ */ new Map([
                      // mapping from JS values to reference ids
                      [0, 1],
                      [null, 2],
                      [true, 3],
                      [false, 4],
                      [globalThis2, 5],
                      [this, 6]
                    ]);
                    this._idPool = [];
                    this.exited = false;
                    let offset = 4096;
                    const strPtr = (str) => {
                      const ptr = offset;
                      const bytes = encoder.encode(str + "\0");
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
                    const keys2 = Object.keys(this.env).sort();
                    keys2.forEach((key) => {
                      argvPtrs.push(strPtr(`${key}=${this.env[key]}`));
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
            onmessage2 = ({ data: wasm }) => {
              let decoder = new TextDecoder();
              let fs = globalThis2.fs;
              let stderr = "";
              fs.writeSync = (fd, buffer) => {
                if (fd === 1) {
                  postMessage(buffer);
                } else if (fd === 2) {
                  stderr += decoder.decode(buffer);
                  let parts = stderr.split("\n");
                  if (parts.length > 1)
                    console.log(parts.slice(0, -1).join("\n"));
                  stderr = parts[parts.length - 1];
                } else {
                  throw new Error("Bad write");
                }
                return buffer.length;
              };
              let stdin = [];
              let resumeStdin;
              let stdinPos = 0;
              onmessage2 = ({ data }) => {
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
                let first3 = stdin[0];
                let count2 = Math.max(0, Math.min(length, first3.length - stdinPos));
                buffer.set(first3.subarray(stdinPos, stdinPos + count2), offset);
                stdinPos += count2;
                if (stdinPos === first3.length) {
                  stdin.shift();
                  stdinPos = 0;
                }
                callback(null, count2);
              };
              let go = new globalThis2.Go();
              go.argv = ["", `--service=${"0.16.14"}`];
              tryToInstantiateModule(wasm, go).then(
                (instance) => {
                  postMessage(null);
                  go.run(instance);
                },
                (error) => {
                  postMessage(error);
                }
              );
            };
            function tryToInstantiateModule(wasm, go) {
              return __async2(this, null, function* () {
                if (wasm instanceof WebAssembly.Module) {
                  return WebAssembly.instantiate(wasm, go.importObject);
                }
                const res = yield fetch(wasm);
                if (!res.ok)
                  throw new Error(`Failed to download ${JSON.stringify(wasm)}`);
                if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
                  const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
                  return result2.instance;
                }
                const bytes = yield res.arrayBuffer();
                const result = yield WebAssembly.instantiate(bytes, go.importObject);
                return result.instance;
              });
            }
            return (m) => onmessage2(m);
          })((data) => worker.onmessage({ data }));
          worker = {
            onmessage: null,
            postMessage: (data) => setTimeout(() => onmessage({ data })),
            terminate() {
            }
          };
        }
        let firstMessageResolve;
        let firstMessageReject;
        const firstMessagePromise = new Promise((resolve, reject) => {
          firstMessageResolve = resolve;
          firstMessageReject = reject;
        });
        worker.onmessage = ({ data: error }) => {
          worker.onmessage = ({ data }) => readFromStdout(data);
          if (error)
            firstMessageReject(error);
          else
            firstMessageResolve();
        };
        worker.postMessage(wasmModule || new URL(wasmURL, location.href).toString());
        let { readFromStdout, service } = createChannel({
          writeToStdin(bytes) {
            worker.postMessage(bytes);
          },
          isSync: false,
          isWriteUnavailable: true,
          esbuild: browser_exports
        });
        yield firstMessagePromise;
        longLivedService = {
          build: (options) => new Promise((resolve, reject) => service.buildOrServe({
            callName: "build",
            refs: null,
            serveOptions: null,
            options,
            isTTY: false,
            defaultWD: "/",
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          transform: (input, options) => new Promise((resolve, reject) => service.transform({
            callName: "transform",
            refs: null,
            input,
            options: options || {},
            isTTY: false,
            fs: {
              readFile(_, callback) {
                callback(new Error("Internal error"), null);
              },
              writeFile(_, callback) {
                callback(null);
              }
            },
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
            callName: "formatMessages",
            refs: null,
            messages,
            options,
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
            callName: "analyzeMetafile",
            refs: null,
            metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
            options,
            callback: (err, res) => err ? reject(err) : resolve(res)
          }))
        };
      });
      var browser_default = browser_exports;
    })(typeof module === "object" ? module : { set exports(x) {
      (typeof self !== "undefined" ? self : this).esbuild = x;
    } });
  }
});

// src/chat.ts
var import_kv_asset_handler = __toESM(require_dist(), 1);

// ../code/package.json
var package_default = {
  name: "@spike.land/code",
  version: "0.9.2",
  description: "spike.land",
  type: "module",
  entry: "./index.js",
  source: "index.js",
  main: "public/static/bundle.mjs",
  files: [
    "dist"
  ],
  exports: {
    "./package.json": "./package.json",
    "./session": "./dist/src/session.mjs",
    ".": "./dist"
  },
  scripts: {
    test: "esbuild --bundle tests/* --platform=node --external:uvu --external:uvu/  --external:esbuild-wasm  --external:esbuild-wasm/  --external:memfs  --format=esm   --loader:.html=text --outdir=testsJs && yarn uvu testsJs && rm -rf testsJs",
    types: "tsc || echo ok",
    clean: "rm -rf .tsBuildInfo src/vendor dist src/monaco-workers && yarn favicons",
    "build:sw": "esbuild --outfile=../packages/.spike.land/public/sw.js --platform=browser --bundle --minify ./src/sw.js && yarn sw",
    start: "cd ../../.. && yarn start",
    push: "cd ../../.. && yarn push",
    "build:preact": "esbuild --bundle src/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:orbit-db": "esbuild --bundle src/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:framer-motion": 'yarn esbuild --bundle src/motion.tsx  --target=esnext --minify --format=esm  --platform=browser  --define:process.env.NODE_ENV=\\"production\\" --external:react --external:@emotion/is-prop-valid  --external:react --outfile=./dist/framer-motion.mjs',
    prebuild: "yarn test || echo FAILED",
    build: "rm -rf dist src/monaco-workers && yarn favicons && yarn es:build",
    "es:build": "deno run --allow-read --allow-write --allow-env --allow-run esbuild-dev.ts",
    favicons: "mkdir -p ./dist/src/assets && cp -af src/assets/. ./dist/src/assets/",
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
  homepage: "http://spike.land",
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
    "@emotion/cache": "11.10.5",
    "@emotion/react": "11.10.5",
    "@emotion/styled": "11.10.5",
    "@isomorphic-git/lightning-fs": "^4.6.0",
    "@mui/material": "5.11.3",
    "@yarnpkg/fslib": "^3.0.0-rc.34",
    "ace-builds": "1.14.0",
    assert: "^2.0.0",
    "assert-browserify": "^2.0.0",
    "async-mutex": "^0.4.0",
    ava: "^5.1.0",
    avl: "1.5.3",
    "buffer-browserify": "^0.2.5",
    csstype: "3.1.1",
    "detective-typescript": "^9.0.0",
    "esbuild-plugin-external-global": "1.0.1",
    "esbuild-wasm": "0.16.14",
    "events-browserify": "^0.0.1",
    "fast-diff": "1.2.0",
    "fetch-retry": "^5.0.3",
    "framer-motion": "8.1.7",
    immutable: "^4.2.1",
    "is-callable": "1.2.7",
    "isomorphic-fetch": "^3.0.0",
    ky: "^0.33.1",
    localforage: "^1.10.0",
    logrocket: "^3.0.1",
    memfs: "^3.4.12",
    module: "^1.2.5",
    "monaco-editor": "0.35.0-dev.20230104",
    "os-browserify": "^0.3.0",
    "p-map": "5.5.0",
    "path-browserify": "^1.0.1",
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
    stream: "^0.0.2",
    "stream-browserify": "^3.0.0",
    util: "^0.12.5",
    utils: "^0.3.1",
    uuid: "^9.0.0",
    "webrtc-adapter": "^8.2.0",
    "workbox-window": "^6.5.4",
    "worker-rpc": "^0.2.0"
  },
  devDependencies: {
    "@libp2p/interfaces": "3.2.0",
    "@motionone/dom": "10.15.3",
    "@types/eslint": "^8.4.10",
    "@types/hoist-non-react-statics": "^3.3.1",
    "@types/is-callable": "1.1.0",
    "@types/node": "^18.11.18",
    "@types/prettier": "2.7.2",
    "@types/prismjs": "^1.26.0",
    "@types/react": "^18.0.26",
    "@types/react-dom": "18.0.10",
    "@types/uuid": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^5.48.0",
    "@typescript-eslint/parser": "^5.48.0",
    "@yarnpkg/cli": "^4.0.0-rc.34",
    "@yarnpkg/core": "^4.0.0-rc.34",
    "@yarnpkg/plugin-essentials": "^4.0.0-rc.34",
    "@yarnpkg/plugin-git": "^3.0.0-rc.34",
    "@yarnpkg/plugin-typescript": "^4.0.0-rc.34",
    "@yarnpkg/sdks": "3.0.0-rc.34",
    esbuild: "0.16.14",
    "esbuild-plugin-alias": "0.2.1",
    eslint: "^8.31.0",
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

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/src/session.mjs
var iP = Object.create;
var N7 = Object.defineProperty;
var aP = Object.getOwnPropertyDescriptor;
var sP = Object.getOwnPropertyNames;
var oP = Object.getPrototypeOf;
var lP = Object.prototype.hasOwnProperty;
var P = (B, A) => N7(B, "name", { value: A, configurable: true });
var O7 = (B, A) => () => (B && (A = B(B = 0)), A);
var Bk = (B, A) => () => (A || B((A = { exports: {} }).exports, A), A.exports);
var jP = (B, A, $, k) => {
  if (A && typeof A == "object" || typeof A == "function")
    for (let e of sP(A))
      !lP.call(B, e) && e !== $ && N7(B, e, { get: () => A[e], enumerable: !(k = aP(A, e)) || k.enumerable });
  return B;
};
var Ak = (B, A, $) => ($ = B != null ? iP(oP(B)) : {}, jP(A || !B || !B.__esModule ? N7($, "default", { value: B, enumerable: true }) : $, B));
var aB = O7(() => {
});
var ot;
var C$;
var me;
var _$ = O7(() => {
  "use strict";
  aB();
  ot = { "@emotion/react/jsx-runtime": "/src/emotionJsxRuntime.mjs", "react-dom/client": "/src/reactDomClient.mjs", "framer-motion": "/src/motion.mjs", "@emotion/react": "/src/emotion.mjs", "@emotion/cache": "/src/emotionCache.mjs", "@emotion/styled": "/src/emotionStyled.mjs", react: "/src/reactMod.mjs", "react-dom": "/src/reactDom.mjs", "react-error-boundary": "/src/reactMod.mjs", "hydrate.mjs": "/src/hydrate.mjs" }, C$ = { imports: ot }, me = C$;
});
function de(B, A, $, k = true, e = false) {
  let t = vB(B, 'from"', 'from "');
  if (Object.keys(Qe).map((c) => {
    let p = new URL(Qe[c], A).toString();
    k && (t = vB(t, ` from "${c}"`, ` from "${p}"`)), t = vB(t, ' from "/', ` from "${A}/`);
  }), t.split("/::").join(A), !t)
    return t;
  let r = $ || A, n = new URL(".", r).toString(), i = new URL("..", r).toString(), j = new URL("../..", r).toString(), o = new URL("../../..", r).toString();
  t = vB(t, 'reference path="./', `reference path="${n}`), t = vB(t, 'import"', 'import "'), t = vB(t, ' from "../../../', ` from "${o}`), t = vB(t, 'import("../../../', ` import("${o}`), t = vB(t, 'import("../../', ` import("${j}`), t = vB(t, 'import("../', ` import("${i}`), t = vB(t, 'import("./', ` import("${n}`), t = vB(t, 'import "../../../', ` import "${o}`), t = vB(t, 'import "../../', ` import "${j}`), t = vB(t, 'import "../', ` import "${i}`), t = vB(t, 'import "./', ` import "${n}`), t = vB(t, ' from "../../', ` from "${j}`), t = vB(t, ' from "../', ` from "${i}`), t = vB(t, ' from "./', ` from "${n}`);
  let m;
  return t = t.split(";").map((c) => c.indexOf("import") !== -1 ? c.trim() : c).map((c) => c.split(`
`).map((p) => {
    if (p.length === 0 || p.indexOf("import") === -1)
      return p;
    if (p.startsWith("import") && p.indexOf('"') !== -1 && p.indexOf("https://") === -1 && p.indexOf(A) === -1) {
      let Q = p.split('"');
      return Q[1] = A + "/" + Q[1] + "?dev&format=es2022", Q.join('"');
    }
    if (p.indexOf("/node_process.js") !== -1 || p.indexOf("/node_buffer.js") !== -1 || p.indexOf("@babel/runtime") !== -1) {
      let Q = p.split('"');
      try {
        m = new URL(Q[1]), Q[1] = A + "/npm:" + m.pathname;
      } catch {
        console.error("URL ERR", Q[1]);
      }
      return Q.join('"');
    }
    if (p.indexOf("/npm:/") === -1 && p.startsWith("import")) {
      let Q = p.split('"');
      try {
        m = new URL(Q[1], A), m && m.pathname.indexOf(".") === -1 && m.pathname.indexOf("/live/") !== -1 && (Q[1] = m.toString() + (e ? "/index.tsx" : "/index.js"));
      } catch {
        console.error("URL ERR", Q[1]);
      }
      return Q.join('"');
    }
    return p;
  }).join(`
`)).join(";"), t = t.split("/npm:/npm:").join("/npm:"), t;
}
function vB(B, A, $) {
  return B && B.split(A).join($);
}
var Qe;
var R$ = O7(() => {
  "use strict";
  aB();
  _$();
  Qe = C$.imports;
  P(de, "importMapReplace");
  P(vB, "replaceAll");
});
var xe = Bk((Yt, be) => {
  aB();
  var aA = -1, tA = 1, LB = 0;
  function l7(B, A, $, k) {
    if (B === A)
      return B ? [[LB, B]] : [];
    if ($ != null) {
      var e = dt(B, A, $);
      if (e)
        return e;
    }
    var t = I$(B, A), E = B.substring(0, t);
    B = B.substring(t), A = A.substring(t), t = F$(B, A);
    var r = B.substring(B.length - t);
    B = B.substring(0, B.length - t), A = A.substring(0, A.length - t);
    var n = ct(B, A);
    return E && n.unshift([LB, E]), r && n.push([LB, r]), Te(n, k), n;
  }
  P(l7, "diff_main");
  function ct(B, A) {
    var $;
    if (!B)
      return [[tA, A]];
    if (!A)
      return [[aA, B]];
    var k = B.length > A.length ? B : A, e = B.length > A.length ? A : B, t = k.indexOf(e);
    if (t !== -1)
      return $ = [[tA, k.substring(0, t)], [LB, e], [tA, k.substring(t + e.length)]], B.length > A.length && ($[0][0] = $[2][0] = aA), $;
    if (e.length === 1)
      return [[aA, B], [tA, A]];
    var E = mt(B, A);
    if (E) {
      var r = E[0], n = E[1], i = E[2], j = E[3], o = E[4], m = l7(r, i), c = l7(n, j);
      return m.concat([[LB, o]], c);
    }
    return ht(B, A);
  }
  P(ct, "diff_compute_");
  function ht(B, A) {
    for (var $ = B.length, k = A.length, e = Math.ceil(($ + k) / 2), t = e, E = 2 * e, r = new Array(E), n = new Array(E), i = 0; i < E; i++)
      r[i] = -1, n[i] = -1;
    r[t + 1] = 0, n[t + 1] = 0;
    for (var j = $ - k, o = j % 2 !== 0, m = 0, c = 0, p = 0, Q = 0, f = 0; f < e; f++) {
      for (var Y = -f + m; Y <= f - c; Y += 2) {
        var K = t + Y, sB;
        Y === -f || Y !== f && r[K - 1] < r[K + 1] ? sB = r[K + 1] : sB = r[K - 1] + 1;
        for (var lB = sB - Y; sB < $ && lB < k && B.charAt(sB) === A.charAt(lB); )
          sB++, lB++;
        if (r[K] = sB, sB > $)
          c += 2;
        else if (lB > k)
          m += 2;
        else if (o) {
          var z = t + j - Y;
          if (z >= 0 && z < E && n[z] !== -1) {
            var I = $ - n[z];
            if (sB >= I)
              return ge(B, A, sB, lB);
          }
        }
      }
      for (var N = -f + p; N <= f - Q; N += 2) {
        var z = t + N, I;
        N === -f || N !== f && n[z - 1] < n[z + 1] ? I = n[z + 1] : I = n[z - 1] + 1;
        for (var iB = I - N; I < $ && iB < k && B.charAt($ - I - 1) === A.charAt(k - iB - 1); )
          I++, iB++;
        if (n[z] = I, I > $)
          Q += 2;
        else if (iB > k)
          p += 2;
        else if (!o) {
          var K = t + j - N;
          if (K >= 0 && K < E && r[K] !== -1) {
            var sB = r[K], lB = t + sB - K;
            if (I = $ - I, sB >= I)
              return ge(B, A, sB, lB);
          }
        }
      }
    }
    return [[aA, B], [tA, A]];
  }
  P(ht, "diff_bisect_");
  function ge(B, A, $, k) {
    var e = B.substring(0, $), t = A.substring(0, k), E = B.substring($), r = A.substring(k), n = l7(e, t), i = l7(E, r);
    return n.concat(i);
  }
  P(ge, "diff_bisectSplit_");
  function I$(B, A) {
    if (!B || !A || B.charAt(0) !== A.charAt(0))
      return 0;
    for (var $ = 0, k = Math.min(B.length, A.length), e = k, t = 0; $ < e; )
      B.substring(t, e) == A.substring(t, e) ? ($ = e, t = $) : k = e, e = Math.floor((k - $) / 2 + $);
    return Xe(B.charCodeAt(e - 1)) && e--, e;
  }
  P(I$, "diff_commonPrefix");
  function F$(B, A) {
    if (!B || !A || B.slice(-1) !== A.slice(-1))
      return 0;
    for (var $ = 0, k = Math.min(B.length, A.length), e = k, t = 0; $ < e; )
      B.substring(B.length - e, B.length - t) == A.substring(A.length - e, A.length - t) ? ($ = e, t = $) : k = e, e = Math.floor((k - $) / 2 + $);
    return fe(B.charCodeAt(B.length - e)) && e--, e;
  }
  P(F$, "diff_commonSuffix");
  function mt(B, A) {
    var $ = B.length > A.length ? B : A, k = B.length > A.length ? A : B;
    if ($.length < 4 || k.length * 2 < $.length)
      return null;
    function e(c, p, Q) {
      for (var f = c.substring(Q, Q + Math.floor(c.length / 4)), Y = -1, K = "", sB, lB, z, I; (Y = p.indexOf(f, Y + 1)) !== -1; ) {
        var N = I$(c.substring(Q), p.substring(Y)), iB = F$(c.substring(0, Q), p.substring(0, Y));
        K.length < iB + N && (K = p.substring(Y - iB, Y) + p.substring(Y, Y + N), sB = c.substring(0, Q - iB), lB = c.substring(Q + N), z = p.substring(0, Y - iB), I = p.substring(Y + N));
      }
      return K.length * 2 >= c.length ? [sB, lB, z, I, K] : null;
    }
    P(e, "diff_halfMatchI_");
    var t = e($, k, Math.ceil($.length / 4)), E = e($, k, Math.ceil($.length / 2)), r;
    if (!t && !E)
      return null;
    E ? t ? r = t[4].length > E[4].length ? t : E : r = E : r = t;
    var n, i, j, o;
    B.length > A.length ? (n = r[0], i = r[1], j = r[2], o = r[3]) : (j = r[0], o = r[1], n = r[2], i = r[3]);
    var m = r[4];
    return [n, i, j, o, m];
  }
  P(mt, "diff_halfMatch_");
  function Te(B, A) {
    B.push([LB, ""]);
    for (var $ = 0, k = 0, e = 0, t = "", E = "", r; $ < B.length; ) {
      if ($ < B.length - 1 && !B[$][1]) {
        B.splice($, 1);
        continue;
      }
      switch (B[$][0]) {
        case tA:
          e++, E += B[$][1], $++;
          break;
        case aA:
          k++, t += B[$][1], $++;
          break;
        case LB:
          var n = $ - e - k - 1;
          if (A) {
            if (n >= 0 && He(B[n][1])) {
              var i = B[n][1].slice(-1);
              if (B[n][1] = B[n][1].slice(0, -1), t = i + t, E = i + E, !B[n][1]) {
                B.splice(n, 1), $--;
                var j = n - 1;
                B[j] && B[j][0] === tA && (e++, E = B[j][1] + E, j--), B[j] && B[j][0] === aA && (k++, t = B[j][1] + t, j--), n = j;
              }
            }
            if (Se(B[$][1])) {
              var i = B[$][1].charAt(0);
              B[$][1] = B[$][1].slice(1), t += i, E += i;
            }
          }
          if ($ < B.length - 1 && !B[$][1]) {
            B.splice($, 1);
            break;
          }
          if (t.length > 0 || E.length > 0) {
            t.length > 0 && E.length > 0 && (r = I$(E, t), r !== 0 && (n >= 0 ? B[n][1] += E.substring(0, r) : (B.splice(0, 0, [LB, E.substring(0, r)]), $++), E = E.substring(r), t = t.substring(r)), r = F$(E, t), r !== 0 && (B[$][1] = E.substring(E.length - r) + B[$][1], E = E.substring(0, E.length - r), t = t.substring(0, t.length - r)));
            var o = e + k;
            t.length === 0 && E.length === 0 ? (B.splice($ - o, o), $ = $ - o) : t.length === 0 ? (B.splice($ - o, o, [tA, E]), $ = $ - o + 1) : E.length === 0 ? (B.splice($ - o, o, [aA, t]), $ = $ - o + 1) : (B.splice($ - o, o, [aA, t], [tA, E]), $ = $ - o + 2);
          }
          $ !== 0 && B[$ - 1][0] === LB ? (B[$ - 1][1] += B[$][1], B.splice($, 1)) : $++, e = 0, k = 0, t = "", E = "";
          break;
      }
    }
    B[B.length - 1][1] === "" && B.pop();
    var m = false;
    for ($ = 1; $ < B.length - 1; )
      B[$ - 1][0] === LB && B[$ + 1][0] === LB && (B[$][1].substring(B[$][1].length - B[$ - 1][1].length) === B[$ - 1][1] ? (B[$][1] = B[$ - 1][1] + B[$][1].substring(0, B[$][1].length - B[$ - 1][1].length), B[$ + 1][1] = B[$ - 1][1] + B[$ + 1][1], B.splice($ - 1, 1), m = true) : B[$][1].substring(0, B[$ + 1][1].length) == B[$ + 1][1] && (B[$ - 1][1] += B[$ + 1][1], B[$][1] = B[$][1].substring(B[$ + 1][1].length) + B[$ + 1][1], B.splice($ + 1, 1), m = true)), $++;
    m && Te(B, A);
  }
  P(Te, "diff_cleanupMerge");
  function Xe(B) {
    return B >= 55296 && B <= 56319;
  }
  P(Xe, "is_surrogate_pair_start");
  function fe(B) {
    return B >= 56320 && B <= 57343;
  }
  P(fe, "is_surrogate_pair_end");
  function Se(B) {
    return fe(B.charCodeAt(0));
  }
  P(Se, "starts_with_pair_end");
  function He(B) {
    return Xe(B.charCodeAt(B.length - 1));
  }
  P(He, "ends_with_pair_start");
  function Qt(B) {
    for (var A = [], $ = 0; $ < B.length; $++)
      B[$][1].length > 0 && A.push(B[$]);
    return A;
  }
  P(Qt, "remove_empty_tuples");
  function D$(B, A, $, k) {
    return He(B) || Se(k) ? null : Qt([[LB, B], [aA, A], [tA, $], [LB, k]]);
  }
  P(D$, "make_edit_splice");
  function dt(B, A, $) {
    var k = typeof $ == "number" ? { index: $, length: 0 } : $.oldRange, e = typeof $ == "number" ? null : $.newRange, t = B.length, E = A.length;
    if (k.length === 0 && (e === null || e.length === 0)) {
      var r = k.index, n = B.slice(0, r), i = B.slice(r), j = e ? e.index : null;
      B: {
        var o = r + E - t;
        if (j !== null && j !== o || o < 0 || o > E)
          break B;
        var m = A.slice(0, o), c = A.slice(o);
        if (c !== i)
          break B;
        var p = Math.min(r, o), Q = n.slice(0, p), f = m.slice(0, p);
        if (Q !== f)
          break B;
        var Y = n.slice(p), K = m.slice(p);
        return D$(Q, Y, K, i);
      }
      B: {
        if (j !== null && j !== r)
          break B;
        var sB = r, m = A.slice(0, sB), c = A.slice(sB);
        if (m !== n)
          break B;
        var lB = Math.min(t - sB, E - sB), z = i.slice(i.length - lB), I = c.slice(c.length - lB);
        if (z !== I)
          break B;
        var Y = i.slice(0, i.length - lB), K = c.slice(0, c.length - lB);
        return D$(n, Y, K, z);
      }
    }
    if (k.length > 0 && e && e.length === 0) {
      B: {
        var Q = B.slice(0, k.index), z = B.slice(k.index + k.length), p = Q.length, lB = z.length;
        if (E < p + lB)
          break B;
        var f = A.slice(0, p), I = A.slice(E - lB);
        if (Q !== f || z !== I)
          break B;
        var Y = B.slice(p, t - lB), K = A.slice(p, E - lB);
        return D$(Q, Y, K, z);
      }
    }
    return null;
  }
  P(dt, "find_cursor_edit_diff");
  function D7(B, A, $) {
    return l7(B, A, $, true);
  }
  P(D7, "diff");
  D7.INSERT = tA;
  D7.DELETE = aA;
  D7.EQUAL = LB;
  be.exports = D7;
});
var ye = Bk((eE, L$) => {
  aB();
  ((B) => {
    "use strict";
    var A = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, k = Object.getOwnPropertyNames, e = Object.prototype.hasOwnProperty, t = P((s, l) => {
      for (var u in l)
        A(s, u, { get: l[u], enumerable: true });
    }, "__export"), E = P((s, l, u, H) => {
      if (l && typeof l == "object" || typeof l == "function")
        for (let M of k(l))
          !e.call(s, M) && M !== u && A(s, M, { get: () => l[M], enumerable: !(H = $(l, M)) || H.enumerable });
      return s;
    }, "__copyProps"), r = P((s) => E(A({}, "__esModule", { value: true }), s), "__toCommonJS"), n = P((s, l, u) => new Promise((H, M) => {
      var y = P((b) => {
        try {
          D(u.next(b));
        } catch (O) {
          M(O);
        }
      }, "fulfilled"), S = P((b) => {
        try {
          D(u.throw(b));
        } catch (O) {
          M(O);
        }
      }, "rejected"), D = P((b) => b.done ? H(b.value) : Promise.resolve(b.value).then(y, S), "step");
      D((u = u.apply(s, l)).next());
    }), "__async"), i = {};
    t(i, { analyzeMetafile: () => $P, analyzeMetafileSync: () => tP, build: () => Ye, buildSync: () => kP, default: () => nP, formatMessages: () => AP, formatMessagesSync: () => PP, initialize: () => EP, serve: () => Ze, transform: () => BP, transformSync: () => eP, version: () => ze }), B.exports = r(i);
    function j(s) {
      let l = P((H) => {
        if (H === null)
          u.write8(0);
        else if (typeof H == "boolean")
          u.write8(1), u.write8(+H);
        else if (typeof H == "number")
          u.write8(2), u.write32(H | 0);
        else if (typeof H == "string")
          u.write8(3), u.write(c(H));
        else if (H instanceof Uint8Array)
          u.write8(4), u.write(H);
        else if (H instanceof Array) {
          u.write8(5), u.write32(H.length);
          for (let M of H)
            l(M);
        } else {
          let M = Object.keys(H);
          u.write8(6), u.write32(M.length);
          for (let y of M)
            u.write(c(y)), l(H[y]);
        }
      }, "visit"), u = new m();
      return u.write32(0), u.write32(s.id << 1 | +!s.isRequest), l(s.value), Y(u.buf, u.len - 4, 0), u.buf.subarray(0, u.len);
    }
    P(j, "encodePacket");
    function o(s) {
      let l = P(() => {
        switch (u.read8()) {
          case 0:
            return null;
          case 1:
            return !!u.read8();
          case 2:
            return u.read32();
          case 3:
            return p(u.read());
          case 4:
            return u.read();
          case 5: {
            let S = u.read32(), D = [];
            for (let b = 0; b < S; b++)
              D.push(l());
            return D;
          }
          case 6: {
            let S = u.read32(), D = {};
            for (let b = 0; b < S; b++)
              D[p(u.read())] = l();
            return D;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, "visit"), u = new m(s), H = u.read32(), M = (H & 1) === 0;
      H >>>= 1;
      let y = l();
      if (u.ptr !== s.length)
        throw new Error("Invalid packet");
      return { id: H, isRequest: M, value: y };
    }
    P(o, "decodePacket");
    var m = P(class {
      constructor(s = new Uint8Array(1024)) {
        this.buf = s, this.len = 0, this.ptr = 0;
      }
      _write(s) {
        if (this.len + s > this.buf.length) {
          let l = new Uint8Array((this.len + s) * 2);
          l.set(this.buf), this.buf = l;
        }
        return this.len += s, this.len - s;
      }
      write8(s) {
        let l = this._write(1);
        this.buf[l] = s;
      }
      write32(s) {
        let l = this._write(4);
        Y(this.buf, s, l);
      }
      write(s) {
        let l = this._write(4 + s.length);
        Y(this.buf, s.length, l), this.buf.set(s, l + 4);
      }
      _read(s) {
        if (this.ptr + s > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += s, this.ptr - s;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return f(this.buf, this._read(4));
      }
      read() {
        let s = this.read32(), l = new Uint8Array(s), u = this._read(l.length);
        return l.set(this.buf.subarray(u, u + s)), l;
      }
    }, "ByteBuffer"), c, p, Q;
    if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
      let s = new TextEncoder(), l = new TextDecoder();
      c = P((u) => s.encode(u), "encodeUTF8"), p = P((u) => l.decode(u), "decodeUTF8"), Q = 'new TextEncoder().encode("")';
    } else if (typeof Buffer < "u")
      c = P((s) => Buffer.from(s), "encodeUTF8"), p = P((s) => {
        let { buffer: l, byteOffset: u, byteLength: H } = s;
        return Buffer.from(l, u, H).toString();
      }, "decodeUTF8"), Q = 'Buffer.from("")';
    else
      throw new Error("No UTF-8 codec found");
    if (!(c("") instanceof Uint8Array))
      throw new Error(`Invariant violation: "${Q} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
    function f(s, l) {
      return s[l++] | s[l++] << 8 | s[l++] << 16 | s[l++] << 24;
    }
    P(f, "readUInt32LE");
    function Y(s, l, u) {
      s[u++] = l, s[u++] = l >> 8, s[u++] = l >> 16, s[u++] = l >> 24;
    }
    P(Y, "writeUInt32LE");
    var K = JSON.stringify, sB = "warning", lB = "silent";
    function z(s) {
      if (HB(s, "target"), s.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${s}`);
      return s;
    }
    P(z, "validateTarget");
    var I = P(() => null, "canBeAnything"), N = P((s) => typeof s == "boolean" ? null : "a boolean", "mustBeBoolean"), iB = P((s) => typeof s == "boolean" || typeof s == "object" && !Array.isArray(s) ? null : "a boolean or an object", "mustBeBooleanOrObject"), F = P((s) => typeof s == "string" ? null : "a string", "mustBeString"), RB = P((s) => s instanceof RegExp ? null : "a RegExp object", "mustBeRegExp"), DB = P((s) => typeof s == "number" && s === (s | 0) ? null : "an integer", "mustBeInteger"), L7 = P((s) => typeof s == "function" ? null : "a function", "mustBeFunction"), XB = P((s) => Array.isArray(s) ? null : "an array", "mustBeArray"), BA = P((s) => typeof s == "object" && s !== null && !Array.isArray(s) ? null : "an object", "mustBeObject"), De = P((s) => s instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule"), Ie = P((s) => typeof s == "object" && s !== null ? null : "an array or an object", "mustBeArrayOrRecord"), W$ = P((s) => typeof s == "object" && !Array.isArray(s) ? null : "an object or null", "mustBeObjectOrNull"), N$ = P((s) => typeof s == "string" || typeof s == "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean"), Fe = P((s) => typeof s == "string" || typeof s == "object" && s !== null && !Array.isArray(s) ? null : "a string or an object", "mustBeStringOrObject"), Ue = P((s) => typeof s == "string" || Array.isArray(s) ? null : "a string or an array", "mustBeStringOrArray"), O$ = P((s) => typeof s == "string" || s instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array"), Le = P((s) => typeof s == "string" || s instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
    function d(s, l, u, H) {
      let M = s[u];
      if (l[u + ""] = true, M === void 0)
        return;
      let y = H(M);
      if (y !== null)
        throw new Error(`${K(u)} must be ${y}`);
      return M;
    }
    P(d, "getFlag");
    function fB(s, l, u) {
      for (let H in s)
        if (!(H in l))
          throw new Error(`Invalid option ${u}: ${K(H)}`);
    }
    P(fB, "checkForInvalidFlags");
    function We(s) {
      let l = /* @__PURE__ */ Object.create(null), u = d(s, l, "wasmURL", Le), H = d(s, l, "wasmModule", De), M = d(s, l, "worker", N);
      return fB(s, l, "in initialize() call"), { wasmURL: u, wasmModule: H, worker: M };
    }
    P(We, "validateInitializeOptions");
    function G$(s) {
      let l;
      if (s !== void 0) {
        l = /* @__PURE__ */ Object.create(null);
        for (let u in s) {
          let H = s[u];
          if (typeof H == "string" || H === false)
            l[u] = H;
          else
            throw new Error(`Expected ${K(u)} in mangle cache to map to either a string or false`);
        }
      }
      return l;
    }
    P(G$, "validateMangleCache");
    function p7(s, l, u, H, M) {
      let y = d(l, u, "color", N), S = d(l, u, "logLevel", F), D = d(l, u, "logLimit", DB);
      y !== void 0 ? s.push(`--color=${y}`) : H && s.push("--color=true"), s.push(`--log-level=${S || M}`), s.push(`--log-limit=${D || 0}`);
    }
    P(p7, "pushLogFlags");
    function HB(s, l, u) {
      if (typeof s != "string")
        throw new Error(`Expected value for ${l}${u !== void 0 ? " " + K(u) : ""} to be a string, got ${typeof s} instead`);
      return s;
    }
    P(HB, "validateStringValue");
    function q$(s, l, u) {
      let H = d(l, u, "legalComments", F), M = d(l, u, "sourceRoot", F), y = d(l, u, "sourcesContent", N), S = d(l, u, "target", Ue), D = d(l, u, "format", F), b = d(l, u, "globalName", F), O = d(l, u, "mangleProps", RB), V = d(l, u, "reserveProps", RB), Z = d(l, u, "mangleQuoted", N), $B = d(l, u, "minify", N), G = d(l, u, "minifySyntax", N), BB = d(l, u, "minifyWhitespace", N), U = d(l, u, "minifyIdentifiers", N), kB = d(l, u, "drop", XB), EB = d(l, u, "charset", F), _ = d(l, u, "treeShaking", N), g = d(l, u, "ignoreAnnotations", N), h = d(l, u, "jsx", F), X = d(l, u, "jsxFactory", F), v = d(l, u, "jsxFragment", F), R = d(l, u, "jsxImportSource", F), L = d(l, u, "jsxDev", N), x = d(l, u, "jsxSideEffects", N), a = d(l, u, "define", BA), T = d(l, u, "logOverride", BA), w = d(l, u, "supported", BA), C = d(l, u, "pure", XB), q = d(l, u, "keepNames", N), eB = d(l, u, "platform", F);
      if (H && s.push(`--legal-comments=${H}`), M !== void 0 && s.push(`--source-root=${M}`), y !== void 0 && s.push(`--sources-content=${y}`), S && (Array.isArray(S) ? s.push(`--target=${Array.from(S).map(z).join(",")}`) : s.push(`--target=${z(S)}`)), D && s.push(`--format=${D}`), b && s.push(`--global-name=${b}`), eB && s.push(`--platform=${eB}`), $B && s.push("--minify"), G && s.push("--minify-syntax"), BB && s.push("--minify-whitespace"), U && s.push("--minify-identifiers"), EB && s.push(`--charset=${EB}`), _ !== void 0 && s.push(`--tree-shaking=${_}`), g && s.push("--ignore-annotations"), kB)
        for (let J of kB)
          s.push(`--drop:${HB(J, "drop")}`);
      if (O && s.push(`--mangle-props=${O.source}`), V && s.push(`--reserve-props=${V.source}`), Z !== void 0 && s.push(`--mangle-quoted=${Z}`), h && s.push(`--jsx=${h}`), X && s.push(`--jsx-factory=${X}`), v && s.push(`--jsx-fragment=${v}`), R && s.push(`--jsx-import-source=${R}`), L && s.push("--jsx-dev"), x && s.push("--jsx-side-effects"), a)
        for (let J in a) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${J}`);
          s.push(`--define:${J}=${HB(a[J], "define", J)}`);
        }
      if (T)
        for (let J in T) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid log override: ${J}`);
          s.push(`--log-override:${J}=${HB(T[J], "log override", J)}`);
        }
      if (w)
        for (let J in w) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid supported: ${J}`);
          let AB = w[J];
          if (typeof AB != "boolean")
            throw new Error(`Expected value for supported ${K(J)} to be a boolean, got ${typeof AB} instead`);
          s.push(`--supported:${J}=${AB}`);
        }
      if (C)
        for (let J of C)
          s.push(`--pure:${HB(J, "pure")}`);
      q && s.push("--keep-names");
    }
    P(q$, "pushCommonFlags");
    function Ne(s, l, u, H, M) {
      var y;
      let S = [], D = [], b = /* @__PURE__ */ Object.create(null), O = null, V = null, Z = null;
      p7(S, l, b, u, H), q$(S, l, b);
      let $B = d(l, b, "sourcemap", N$), G = d(l, b, "bundle", N), BB = d(l, b, "watch", iB), U = d(l, b, "splitting", N), kB = d(l, b, "preserveSymlinks", N), EB = d(l, b, "metafile", N), _ = d(l, b, "outfile", F), g = d(l, b, "outdir", F), h = d(l, b, "outbase", F), X = d(l, b, "tsconfig", F), v = d(l, b, "resolveExtensions", XB), R = d(l, b, "nodePaths", XB), L = d(l, b, "mainFields", XB), x = d(l, b, "conditions", XB), a = d(l, b, "external", XB), T = d(l, b, "packages", F), w = d(l, b, "alias", BA), C = d(l, b, "loader", BA), q = d(l, b, "outExtension", BA), eB = d(l, b, "publicPath", F), J = d(l, b, "entryNames", F), AB = d(l, b, "chunkNames", F), SB = d(l, b, "assetNames", F), MB = d(l, b, "inject", XB), QB = d(l, b, "banner", BA), rB = d(l, b, "footer", BA), PB = d(l, b, "entryPoints", Ie), bB = d(l, b, "absWorkingDir", F), yB = d(l, b, "stdin", BA), dA = (y = d(l, b, "write", N)) != null ? y : M, KA = d(l, b, "allowOverwrite", N), EA = d(l, b, "incremental", N) === true, AA = d(l, b, "mangleCache", BA);
      if (b.plugins = true, fB(l, b, `in ${s}() call`), $B && S.push(`--sourcemap${$B === true ? "" : `=${$B}`}`), G && S.push("--bundle"), KA && S.push("--allow-overwrite"), BB)
        if (S.push("--watch"), typeof BB == "boolean")
          Z = {};
        else {
          let W = /* @__PURE__ */ Object.create(null), dB = d(BB, W, "onRebuild", L7);
          fB(BB, W, `on "watch" in ${s}() call`), Z = { onRebuild: dB };
        }
      if (U && S.push("--splitting"), kB && S.push("--preserve-symlinks"), EB && S.push("--metafile"), _ && S.push(`--outfile=${_}`), g && S.push(`--outdir=${g}`), h && S.push(`--outbase=${h}`), X && S.push(`--tsconfig=${X}`), T && S.push(`--packages=${T}`), v) {
        let W = [];
        for (let dB of v) {
          if (HB(dB, "resolve extension"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${dB}`);
          W.push(dB);
        }
        S.push(`--resolve-extensions=${W.join(",")}`);
      }
      if (eB && S.push(`--public-path=${eB}`), J && S.push(`--entry-names=${J}`), AB && S.push(`--chunk-names=${AB}`), SB && S.push(`--asset-names=${SB}`), L) {
        let W = [];
        for (let dB of L) {
          if (HB(dB, "main field"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${dB}`);
          W.push(dB);
        }
        S.push(`--main-fields=${W.join(",")}`);
      }
      if (x) {
        let W = [];
        for (let dB of x) {
          if (HB(dB, "condition"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${dB}`);
          W.push(dB);
        }
        S.push(`--conditions=${W.join(",")}`);
      }
      if (a)
        for (let W of a)
          S.push(`--external:${HB(W, "external")}`);
      if (w)
        for (let W in w) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid package name in alias: ${W}`);
          S.push(`--alias:${W}=${HB(w[W], "alias", W)}`);
        }
      if (QB)
        for (let W in QB) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${W}`);
          S.push(`--banner:${W}=${HB(QB[W], "banner", W)}`);
        }
      if (rB)
        for (let W in rB) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${W}`);
          S.push(`--footer:${W}=${HB(rB[W], "footer", W)}`);
        }
      if (MB)
        for (let W of MB)
          S.push(`--inject:${HB(W, "inject")}`);
      if (C)
        for (let W in C) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${W}`);
          S.push(`--loader:${W}=${HB(C[W], "loader", W)}`);
        }
      if (q)
        for (let W in q) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${W}`);
          S.push(`--out-extension:${W}=${HB(q[W], "out extension", W)}`);
        }
      if (PB)
        if (Array.isArray(PB))
          for (let W of PB)
            D.push(["", HB(W, "entry point")]);
        else
          for (let W in PB)
            D.push([W, HB(PB[W], "entry point", W)]);
      if (yB) {
        let W = /* @__PURE__ */ Object.create(null), dB = d(yB, W, "contents", O$), z$ = d(yB, W, "resolveDir", F), Y$ = d(yB, W, "sourcefile", F), Z$ = d(yB, W, "loader", F);
        fB(yB, W, 'in "stdin" object'), Y$ && S.push(`--sourcefile=${Y$}`), Z$ && S.push(`--loader=${Z$}`), z$ && (V = z$), typeof dB == "string" ? O = c(dB) : dB instanceof Uint8Array && (O = dB);
      }
      let vA = [];
      if (R)
        for (let W of R)
          W += "", vA.push(W);
      return { entries: D, flags: S, write: dA, stdinContents: O, stdinResolveDir: V, absWorkingDir: bB, incremental: EA, nodePaths: vA, watch: Z, mangleCache: G$(AA) };
    }
    P(Ne, "flagsForBuildOptions");
    function Oe(s, l, u, H) {
      let M = [], y = /* @__PURE__ */ Object.create(null);
      p7(M, l, y, u, H), q$(M, l, y);
      let S = d(l, y, "sourcemap", N$), D = d(l, y, "tsconfigRaw", Fe), b = d(l, y, "sourcefile", F), O = d(l, y, "loader", F), V = d(l, y, "banner", F), Z = d(l, y, "footer", F), $B = d(l, y, "mangleCache", BA);
      return fB(l, y, `in ${s}() call`), S && M.push(`--sourcemap=${S === true ? "external" : S}`), D && M.push(`--tsconfig-raw=${typeof D == "string" ? D : JSON.stringify(D)}`), b && M.push(`--sourcefile=${b}`), O && M.push(`--loader=${O}`), V && M.push(`--banner=${V}`), Z && M.push(`--footer=${Z}`), { flags: M, mangleCache: G$($B) };
    }
    P(Oe, "flagsForTransformOptions");
    function Ge(s) {
      let l = {}, u = { didClose: false, reason: "" }, H = {}, M = 0, y = 0, S = new Uint8Array(16 * 1024), D = 0, b = P((g) => {
        let h = D + g.length;
        if (h > S.length) {
          let v = new Uint8Array(h * 2);
          v.set(S), S = v;
        }
        S.set(g, D), D += g.length;
        let X = 0;
        for (; X + 4 <= D; ) {
          let v = f(S, X);
          if (X + 4 + v > D)
            break;
          X += 4, BB(S.subarray(X, X + v)), X += v;
        }
        X > 0 && (S.copyWithin(0, X, D), D -= X);
      }, "readFromStdout"), O = P((g) => {
        u.didClose = true, g && (u.reason = ": " + (g.message || g));
        let h = "The service was stopped" + u.reason;
        for (let X in H)
          H[X](h, null);
        H = {};
      }, "afterClose"), V = P((g, h, X) => {
        if (u.didClose)
          return X("The service is no longer running" + u.reason, null);
        let v = M++;
        H[v] = (R, L) => {
          try {
            X(R, L);
          } finally {
            g && g.unref();
          }
        }, g && g.ref(), s.writeToStdin(j({ id: v, isRequest: true, value: h }));
      }, "sendRequest"), Z = P((g, h) => {
        if (u.didClose)
          throw new Error("The service is no longer running" + u.reason);
        s.writeToStdin(j({ id: g, isRequest: false, value: h }));
      }, "sendResponse"), $B = P((g, h) => n(this, null, function* () {
        try {
          if (h.command === "ping") {
            Z(g, {});
            return;
          }
          if (typeof h.key == "number") {
            let X = l[h.key];
            if (X) {
              let v = X[h.command];
              if (v) {
                yield v(g, h);
                return;
              }
            }
          }
          throw new Error("Invalid command: " + h.command);
        } catch (X) {
          Z(g, { errors: [HA(X, s, null, void 0, "")] });
        }
      }), "handleRequest"), G = true, BB = P((g) => {
        if (G) {
          G = false;
          let X = String.fromCharCode(...g);
          if (X !== "0.16.14")
            throw new Error(`Cannot start service: Host version "0.16.14" does not match binary version ${K(X)}`);
          return;
        }
        let h = o(g);
        if (h.isRequest)
          $B(h.id, h.value);
        else {
          let X = H[h.id];
          delete H[h.id], h.value.error ? X(h.value.error, {}) : X(null, h.value);
        }
      }, "handleIncomingPacket");
      return { readFromStdout: b, afterClose: O, service: { buildOrServe: P(({ callName: g, refs: h, serveOptions: X, options: v, isTTY: R, defaultWD: L, callback: x }) => {
        let a = 0, T = y++, w = {}, C = { ref() {
          ++a === 1 && h && h.ref();
        }, unref() {
          --a === 0 && (delete l[T], h && h.unref());
        } };
        l[T] = w, C.ref(), qe(g, T, V, Z, C, s, w, v, X, R, L, u, (q, eB) => {
          try {
            x(q, eB);
          } finally {
            C.unref();
          }
        });
      }, "buildOrServe"), transform: P(({ callName: g, refs: h, input: X, options: v, isTTY: R, fs: L, callback: x }) => {
        let a = K$(), T = P((w) => {
          try {
            if (typeof X != "string" && !(X instanceof Uint8Array))
              throw new Error('The input to "transform" must be a string or a Uint8Array');
            let { flags: C, mangleCache: q } = Oe(g, v, R, lB), eB = { command: "transform", flags: C, inputFS: w !== null, input: w !== null ? c(w) : typeof X == "string" ? c(X) : X };
            q && (eB.mangleCache = q), V(h, eB, (J, AB) => {
              if (J)
                return x(new Error(J), null);
              let SB = lA(AB.errors, a), MB = lA(AB.warnings, a), QB = 1, rB = P(() => {
                if (--QB === 0) {
                  let PB = { warnings: MB, code: AB.code, map: AB.map };
                  "legalComments" in AB && (PB.legalComments = AB?.legalComments), AB.mangleCache && (PB.mangleCache = AB?.mangleCache), x(null, PB);
                }
              }, "next");
              if (SB.length > 0)
                return x(bA("Transform failed", SB, MB), null);
              AB.codeFS && (QB++, L.readFile(AB.code, (PB, bB) => {
                PB !== null ? x(PB, null) : (AB.code = bB, rB());
              })), AB.mapFS && (QB++, L.readFile(AB.map, (PB, bB) => {
                PB !== null ? x(PB, null) : (AB.map = bB, rB());
              })), rB();
            });
          } catch (C) {
            let q = [];
            try {
              p7(q, v, {}, R, lB);
            } catch {
            }
            let eB = HA(C, s, a, void 0, "");
            V(h, { command: "error", flags: q, error: eB }, () => {
              eB.detail = a.load(eB.detail), x(bA("Transform failed", [eB], []), null);
            });
          }
        }, "start");
        if ((typeof X == "string" || X instanceof Uint8Array) && X.length > 1024 * 1024) {
          let w = T;
          T = P(() => L.writeFile(X, w), "start");
        }
        T(null);
      }, "transform2"), formatMessages: P(({ callName: g, refs: h, messages: X, options: v, callback: R }) => {
        let L = QA(X, "messages", null, "");
        if (!v)
          throw new Error(`Missing second argument in ${g}() call`);
        let x = {}, a = d(v, x, "kind", F), T = d(v, x, "color", N), w = d(v, x, "terminalWidth", DB);
        if (fB(v, x, `in ${g}() call`), a === void 0)
          throw new Error(`Missing "kind" in ${g}() call`);
        if (a !== "error" && a !== "warning")
          throw new Error(`Expected "kind" to be "error" or "warning" in ${g}() call`);
        let C = { command: "format-msgs", messages: L, isWarning: a === "warning" };
        T !== void 0 && (C.color = T), w !== void 0 && (C.terminalWidth = w), V(h, C, (q, eB) => {
          if (q)
            return R(new Error(q), null);
          R(null, eB.messages);
        });
      }, "formatMessages2"), analyzeMetafile: P(({ callName: g, refs: h, metafile: X, options: v, callback: R }) => {
        v === void 0 && (v = {});
        let L = {}, x = d(v, L, "color", N), a = d(v, L, "verbose", N);
        fB(v, L, `in ${g}() call`);
        let T = { command: "analyze-metafile", metafile: X };
        x !== void 0 && (T.color = x), a !== void 0 && (T.verbose = a), V(h, T, (w, C) => {
          if (w)
            return R(new Error(w), null);
          R(null, C.result);
        });
      }, "analyzeMetafile2") } };
    }
    P(Ge, "createChannel");
    function qe(s, l, u, H, M, y, S, D, b, O, V, Z, $B) {
      let G = K$(), BB = P((_, g, h, X) => {
        let v = [];
        try {
          p7(v, D, {}, O, sB);
        } catch {
        }
        let R = HA(_, y, G, h, g);
        u(M, { command: "error", flags: v, error: R }, () => {
          R.detail = G.load(R.detail), X(R);
        });
      }, "logPluginError"), U = P((_, g) => {
        BB(_, g, void 0, (h) => {
          $B(bA("Build failed", [h], []), null);
        });
      }, "handleError"), kB;
      if (typeof D == "object") {
        let _ = D.plugins;
        if (_ !== void 0) {
          if (!Array.isArray(_))
            throw new Error('"plugins" must be an array');
          kB = _;
        }
      }
      if (kB && kB.length > 0) {
        if (y.isSync) {
          U(new Error("Cannot use plugins in synchronous API calls"), "");
          return;
        }
        Ve(l, u, H, M, y, S, D, kB, G).then((_) => {
          if (!_.ok) {
            U(_.error, _.pluginName);
            return;
          }
          try {
            EB(_.requestPlugins, _.runOnEndCallbacks);
          } catch (g) {
            U(g, "");
          }
        }, (_) => U(_, ""));
        return;
      }
      try {
        EB(null, (_, g, h) => h());
      } catch (_) {
        U(_, "");
      }
      function EB(_, g) {
        let h = !y.isWriteUnavailable, { entries: X, flags: v, write: R, stdinContents: L, stdinResolveDir: x, absWorkingDir: a, incremental: T, nodePaths: w, watch: C, mangleCache: q } = Ne(s, D, O, sB, h), eB = { command: "build", key: l, entries: X, flags: v, write: R, stdinContents: L, stdinResolveDir: x, absWorkingDir: a || V, incremental: T, nodePaths: w };
        _ && (eB.plugins = _), q && (eB.mangleCache = q);
        let J = b && Ke(l, u, H, M, S, b, eB), AB, SB, MB = P((rB, PB) => {
          rB.outputFiles && (PB.outputFiles = rB.outputFiles.map(Je)), rB.metafile && (PB.metafile = JSON.parse(rB.metafile)), rB.mangleCache && (PB.mangleCache = rB.mangleCache), rB.writeToStdout !== void 0 && console.log(p(rB.writeToStdout).replace(/\n$/, ""));
        }, "copyResponseToResult"), QB = P((rB, PB) => {
          let bB = { errors: lA(rB.errors, G), warnings: lA(rB.warnings, G) };
          MB(rB, bB), g(bB, BB, () => {
            if (bB.errors.length > 0)
              return PB(bA("Build failed", bB.errors, bB.warnings), null);
            if (rB.rebuild) {
              if (!AB) {
                let yB = false;
                AB = P(() => new Promise((dA, KA) => {
                  if (yB || Z.didClose)
                    throw new Error("Cannot rebuild");
                  u(M, { command: "rebuild", key: l }, (EA, AA) => {
                    if (EA)
                      return PB(bA("Build failed", [{ id: "", pluginName: "", text: EA, location: null, notes: [], detail: void 0 }], []), null);
                    QB(AA, (vA, W) => {
                      vA ? KA(vA) : dA(W);
                    });
                  });
                }), "rebuild"), M.ref(), AB.dispose = () => {
                  yB || (yB = true, u(M, { command: "rebuild-dispose", key: l }, () => {
                  }), M.unref());
                };
              }
              bB.rebuild = AB;
            }
            if (rB.watch) {
              if (!SB) {
                let yB = false;
                M.ref(), SB = P(() => {
                  yB || (yB = true, delete S["watch-rebuild"], u(M, { command: "watch-stop", key: l }, () => {
                  }), M.unref());
                }, "stop"), C && (S["watch-rebuild"] = (dA, KA) => {
                  try {
                    let EA = KA.args, AA = { errors: lA(EA.errors, G), warnings: lA(EA.warnings, G) };
                    MB(EA, AA), g(AA, BB, () => {
                      if (AA.errors.length > 0) {
                        C.onRebuild && C.onRebuild(bA("Build failed", AA.errors, AA.warnings), null);
                        return;
                      }
                      AA.stop = SB, C.onRebuild && C.onRebuild(null, AA);
                    });
                  } catch (EA) {
                    console.error(EA);
                  }
                  H(dA, {});
                });
              }
              bB.stop = SB;
            }
            PB(null, bB);
          });
        }, "buildResponseToResult");
        if (R && y.isWriteUnavailable)
          throw new Error('The "write" option is unavailable in this environment');
        if (T && y.isSync)
          throw new Error('Cannot use "incremental" with a synchronous build');
        if (C && y.isSync)
          throw new Error('Cannot use "watch" with a synchronous build');
        u(M, eB, (rB, PB) => {
          if (rB)
            return $B(new Error(rB), null);
          if (J) {
            let bB = PB, yB = false;
            M.ref();
            let dA = { port: bB.port, host: bB.host, wait: J.wait, stop() {
              yB || (yB = true, J.stop(), M.unref());
            } };
            return M.ref(), J.wait.then(M.unref, M.unref), $B(null, dA);
          }
          return QB(PB, $B);
        });
      }
      P(EB, "buildOrServeContinue");
    }
    P(qe, "buildOrServeImpl");
    var Ke = P((s, l, u, H, M, y, S) => {
      let D = {}, b = d(y, D, "port", DB), O = d(y, D, "host", F), V = d(y, D, "servedir", F), Z = d(y, D, "onRequest", L7), $B = new Promise((G, BB) => {
        M["serve-wait"] = (U, kB) => {
          kB.error !== null ? BB(new Error(kB.error)) : G(), u(U, {});
        };
      });
      return S.serve = {}, fB(y, D, "in serve() call"), b !== void 0 && (S.serve.port = b), O !== void 0 && (S.serve.host = O), V !== void 0 && (S.serve.servedir = V), M["serve-request"] = (G, BB) => {
        Z && Z(BB.args), u(G, {});
      }, { wait: $B, stop() {
        l(H, { command: "serve-stop", key: s }, () => {
        });
      } };
    }, "buildServeData"), Ve = P((s, l, u, H, M, y, S, D, b) => n(void 0, null, function* () {
      let O = [], V = [], Z = {}, $B = {}, G = 0, BB = 0, U = [], kB = false;
      D = [...D];
      for (let _ of D) {
        let g = {};
        if (typeof _ != "object")
          throw new Error(`Plugin at index ${BB} must be an object`);
        let h = d(_, g, "name", F);
        if (typeof h != "string" || h === "")
          throw new Error(`Plugin at index ${BB} is missing a name`);
        try {
          let X = d(_, g, "setup", L7);
          if (typeof X != "function")
            throw new Error("Plugin is missing a setup function");
          fB(_, g, `on plugin ${K(h)}`);
          let v = { name: h, onResolve: [], onLoad: [] };
          BB++;
          let L = X({ initialOptions: S, resolve: P((x, a = {}) => {
            if (!kB)
              throw new Error('Cannot call "resolve" before plugin setup has completed');
            if (typeof x != "string")
              throw new Error("The path to resolve must be a string");
            let T = /* @__PURE__ */ Object.create(null), w = d(a, T, "pluginName", F), C = d(a, T, "importer", F), q = d(a, T, "namespace", F), eB = d(a, T, "resolveDir", F), J = d(a, T, "kind", F), AB = d(a, T, "pluginData", I);
            return fB(a, T, "in resolve() call"), new Promise((SB, MB) => {
              let QB = { command: "resolve", path: x, key: s, pluginName: h };
              if (w != null && (QB.pluginName = w), C != null && (QB.importer = C), q != null && (QB.namespace = q), eB != null && (QB.resolveDir = eB), J != null)
                QB.kind = J;
              else
                throw new Error('Must specify "kind" when calling "resolve"');
              AB != null && (QB.pluginData = b.store(AB)), l(H, QB, (rB, PB) => {
                rB !== null ? MB(new Error(rB)) : SB({ errors: lA(PB.errors, b), warnings: lA(PB.warnings, b), path: PB.path, external: PB.external, sideEffects: PB.sideEffects, namespace: PB.namespace, suffix: PB.suffix, pluginData: b.load(PB.pluginData) });
              });
            });
          }, "resolve"), onStart(x) {
            let a = 'This error came from the "onStart" callback registered here:', T = u7(new Error(a), M, "onStart");
            O.push({ name: h, callback: x, note: T });
          }, onEnd(x) {
            let a = 'This error came from the "onEnd" callback registered here:', T = u7(new Error(a), M, "onEnd");
            V.push({ name: h, callback: x, note: T });
          }, onResolve(x, a) {
            let T = 'This error came from the "onResolve" callback registered here:', w = u7(new Error(T), M, "onResolve"), C = {}, q = d(x, C, "filter", RB), eB = d(x, C, "namespace", F);
            if (fB(x, C, `in onResolve() call for plugin ${K(h)}`), q == null)
              throw new Error("onResolve() call is missing a filter");
            let J = G++;
            Z[J] = { name: h, callback: a, note: w }, v.onResolve.push({ id: J, filter: q.source, namespace: eB || "" });
          }, onLoad(x, a) {
            let T = 'This error came from the "onLoad" callback registered here:', w = u7(new Error(T), M, "onLoad"), C = {}, q = d(x, C, "filter", RB), eB = d(x, C, "namespace", F);
            if (fB(x, C, `in onLoad() call for plugin ${K(h)}`), q == null)
              throw new Error("onLoad() call is missing a filter");
            let J = G++;
            $B[J] = { name: h, callback: a, note: w }, v.onLoad.push({ id: J, filter: q.source, namespace: eB || "" });
          }, esbuild: M.esbuild });
          L && (yield L), U.push(v);
        } catch (X) {
          return { ok: false, error: X, pluginName: h };
        }
      }
      y["on-start"] = (_, g) => n(void 0, null, function* () {
        let h = { errors: [], warnings: [] };
        yield Promise.all(O.map((X) => n(void 0, [X], function* ({ name: v, callback: R, note: L }) {
          try {
            let x = yield R();
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onStart() callback in plugin ${K(v)} to return an object`);
              let a = {}, T = d(x, a, "errors", XB), w = d(x, a, "warnings", XB);
              fB(x, a, `from onStart() callback in plugin ${K(v)}`), T != null && h.errors.push(...QA(T, "errors", b, v)), w != null && h.warnings.push(...QA(w, "warnings", b, v));
            }
          } catch (x) {
            h.errors.push(HA(x, M, b, L && L(), v));
          }
        }))), u(_, h);
      }), y["on-resolve"] = (_, g) => n(void 0, null, function* () {
        let h = {}, X = "", v, R;
        for (let L of g.ids)
          try {
            ({ name: X, callback: v, note: R } = Z[L]);
            let x = yield v({ path: g.path, importer: g.importer, namespace: g.namespace, resolveDir: g.resolveDir, kind: g.kind, pluginData: b.load(g.pluginData) });
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onResolve() callback in plugin ${K(X)} to return an object`);
              let a = {}, T = d(x, a, "pluginName", F), w = d(x, a, "path", F), C = d(x, a, "namespace", F), q = d(x, a, "suffix", F), eB = d(x, a, "external", N), J = d(x, a, "sideEffects", N), AB = d(x, a, "pluginData", I), SB = d(x, a, "errors", XB), MB = d(x, a, "warnings", XB), QB = d(x, a, "watchFiles", XB), rB = d(x, a, "watchDirs", XB);
              fB(x, a, `from onResolve() callback in plugin ${K(X)}`), h.id = L, T != null && (h.pluginName = T), w != null && (h.path = w), C != null && (h.namespace = C), q != null && (h.suffix = q), eB != null && (h.external = eB), J != null && (h.sideEffects = J), AB != null && (h.pluginData = b.store(AB)), SB != null && (h.errors = QA(SB, "errors", b, X)), MB != null && (h.warnings = QA(MB, "warnings", b, X)), QB != null && (h.watchFiles = c7(QB, "watchFiles")), rB != null && (h.watchDirs = c7(rB, "watchDirs"));
              break;
            }
          } catch (x) {
            h = { id: L, errors: [HA(x, M, b, R && R(), X)] };
            break;
          }
        u(_, h);
      }), y["on-load"] = (_, g) => n(void 0, null, function* () {
        let h = {}, X = "", v, R;
        for (let L of g.ids)
          try {
            ({ name: X, callback: v, note: R } = $B[L]);
            let x = yield v({ path: g.path, namespace: g.namespace, suffix: g.suffix, pluginData: b.load(g.pluginData) });
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onLoad() callback in plugin ${K(X)} to return an object`);
              let a = {}, T = d(x, a, "pluginName", F), w = d(x, a, "contents", O$), C = d(x, a, "resolveDir", F), q = d(x, a, "pluginData", I), eB = d(x, a, "loader", F), J = d(x, a, "errors", XB), AB = d(x, a, "warnings", XB), SB = d(x, a, "watchFiles", XB), MB = d(x, a, "watchDirs", XB);
              fB(x, a, `from onLoad() callback in plugin ${K(X)}`), h.id = L, T != null && (h.pluginName = T), w instanceof Uint8Array ? h.contents = w : w != null && (h.contents = c(w)), C != null && (h.resolveDir = C), q != null && (h.pluginData = b.store(q)), eB != null && (h.loader = eB), J != null && (h.errors = QA(J, "errors", b, X)), AB != null && (h.warnings = QA(AB, "warnings", b, X)), SB != null && (h.watchFiles = c7(SB, "watchFiles")), MB != null && (h.watchDirs = c7(MB, "watchDirs"));
              break;
            }
          } catch (x) {
            h = { id: L, errors: [HA(x, M, b, R && R(), X)] };
            break;
          }
        u(_, h);
      });
      let EB = P((_, g, h) => h(), "runOnEndCallbacks");
      return V.length > 0 && (EB = P((_, g, h) => {
        (() => n(void 0, null, function* () {
          for (let { name: X, callback: v, note: R } of V)
            try {
              yield v(_);
            } catch (L) {
              _.errors.push(yield new Promise((x) => g(L, X, R && R(), x)));
            }
        }))().then(h);
      }, "runOnEndCallbacks")), kB = true, { ok: true, requestPlugins: U, runOnEndCallbacks: EB };
    }), "handlePlugins");
    function K$() {
      let s = /* @__PURE__ */ new Map(), l = 0;
      return { load(u) {
        return s.get(u);
      }, store(u) {
        if (u === void 0)
          return -1;
        let H = l++;
        return s.set(H, u), H;
      } };
    }
    P(K$, "createObjectStash");
    function u7(s, l, u) {
      let H, M = false;
      return () => {
        if (M)
          return H;
        M = true;
        try {
          let y = (s.stack + "").split(`
`);
          y.splice(1, 1);
          let S = V$(l, y, u);
          if (S)
            return H = { text: s.message, location: S }, H;
        } catch {
        }
      };
    }
    P(u7, "extractCallerV8");
    function HA(s, l, u, H, M) {
      let y = "Internal error", S = null;
      try {
        y = (s && s.message || s) + "";
      } catch {
      }
      try {
        S = V$(l, (s.stack + "").split(`
`), "");
      } catch {
      }
      return { id: "", pluginName: M, text: y, location: S, notes: H ? [H] : [], detail: u ? u.store(s) : -1 };
    }
    P(HA, "extractErrorMessageV8");
    function V$(s, l, u) {
      let H = "    at ";
      if (s.readFileSync && !l[0].startsWith(H) && l[1].startsWith(H))
        for (let M = 1; M < l.length; M++) {
          let y = l[M];
          if (y.startsWith(H))
            for (y = y.slice(H.length); ; ) {
              let S = /^(?:new |async )?\S+ \((.*)\)$/.exec(y);
              if (S) {
                y = S[1];
                continue;
              }
              if (S = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y), S) {
                y = S[1];
                continue;
              }
              if (S = /^(\S+):(\d+):(\d+)$/.exec(y), S) {
                let D;
                try {
                  D = s.readFileSync(S[1], "utf8");
                } catch {
                  break;
                }
                let b = D.split(/\r\n|\r|\n|\u2028|\u2029/)[+S[2] - 1] || "", O = +S[3] - 1, V = b.slice(O, O + u.length) === u ? u.length : 0;
                return { file: S[1], namespace: "file", line: +S[2], column: c(b.slice(0, O)).length, length: c(b.slice(O, O + V)).length, lineText: b + `
` + l.slice(1).join(`
`), suggestion: "" };
              }
              break;
            }
        }
      return null;
    }
    P(V$, "parseStackLinesV8");
    function bA(s, l, u) {
      let H = 5, M = l.length < 1 ? "" : ` with ${l.length} error${l.length < 2 ? "" : "s"}:` + l.slice(0, H + 1).map((S, D) => {
        if (D === H)
          return `
...`;
        if (!S.location)
          return `
error: ${S.text}`;
        let { file: b, line: O, column: V } = S.location, Z = S.pluginName ? `[plugin: ${S.pluginName}] ` : "";
        return `
${b}:${O}:${V}: ERROR: ${Z}${S.text}`;
      }).join(""), y = new Error(`${s}${M}`);
      return y.errors = l, y.warnings = u, y;
    }
    P(bA, "failureErrorWithLog");
    function lA(s, l) {
      for (let u of s)
        u.detail = l.load(u.detail);
      return s;
    }
    P(lA, "replaceDetailsInMessages");
    function J$(s, l) {
      if (s == null)
        return null;
      let u = {}, H = d(s, u, "file", F), M = d(s, u, "namespace", F), y = d(s, u, "line", DB), S = d(s, u, "column", DB), D = d(s, u, "length", DB), b = d(s, u, "lineText", F), O = d(s, u, "suggestion", F);
      return fB(s, u, l), { file: H || "", namespace: M || "", line: y || 0, column: S || 0, length: D || 0, lineText: b || "", suggestion: O || "" };
    }
    P(J$, "sanitizeLocation");
    function QA(s, l, u, H) {
      let M = [], y = 0;
      for (let S of s) {
        let D = {}, b = d(S, D, "id", F), O = d(S, D, "pluginName", F), V = d(S, D, "text", F), Z = d(S, D, "location", W$), $B = d(S, D, "notes", XB), G = d(S, D, "detail", I), BB = `in element ${y} of "${l}"`;
        fB(S, D, BB);
        let U = [];
        if ($B)
          for (let kB of $B) {
            let EB = {}, _ = d(kB, EB, "text", F), g = d(kB, EB, "location", W$);
            fB(kB, EB, BB), U.push({ text: _ || "", location: J$(g, BB) });
          }
        M.push({ id: b || "", pluginName: O || H, text: V || "", location: J$(Z, BB), notes: U, detail: u ? u.store(G) : -1 }), y++;
      }
      return M;
    }
    P(QA, "sanitizeMessages");
    function c7(s, l) {
      let u = [];
      for (let H of s) {
        if (typeof H != "string")
          throw new Error(`${K(l)} must be an array of strings`);
        u.push(H);
      }
      return u;
    }
    P(c7, "sanitizeStringArray");
    function Je({ path: s, contents: l }) {
      let u = null;
      return { path: s, contents: l, get text() {
        let H = this.contents;
        return (u === null || H !== l) && (l = H, u = p(H)), u;
      } };
    }
    P(Je, "convertOutputFiles");
    var ze = "0.16.14", Ye = P((s) => h7().build(s), "build"), Ze = P(() => {
      throw new Error('The "serve" API only works in node');
    }, "serve"), BP = P((s, l) => h7().transform(s, l), "transform"), AP = P((s, l) => h7().formatMessages(s, l), "formatMessages"), $P = P((s, l) => h7().analyzeMetafile(s, l), "analyzeMetafile"), kP = P(() => {
      throw new Error('The "buildSync" API only works in node');
    }, "buildSync"), eP = P(() => {
      throw new Error('The "transformSync" API only works in node');
    }, "transformSync"), PP = P(() => {
      throw new Error('The "formatMessagesSync" API only works in node');
    }, "formatMessagesSync"), tP = P(() => {
      throw new Error('The "analyzeMetafileSync" API only works in node');
    }, "analyzeMetafileSync"), xA, W7, h7 = P(() => {
      if (W7)
        return W7;
      throw xA ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, "ensureServiceIsRunning"), EP = P((s) => {
      s = We(s || {});
      let l = s.wasmURL, u = s.wasmModule, H = s.worker !== false;
      if (!l && !u)
        throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
      if (xA)
        throw new Error('Cannot call "initialize" more than once');
      return xA = rP(l || "", u, H), xA.catch(() => {
        xA = void 0;
      }), xA;
    }, "initialize"), rP = P((s, l, u) => n(void 0, null, function* () {
      let H;
      if (u) {
        let O = new Blob([`onmessage=((postMessage) => {
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
            // unused
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
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = new Date().getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
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
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                    // setTimeout has been seen to fire up to 1 millisecond early
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
                  sp = this._inst.exports.getsp() >>> 0;
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
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
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
                // func valueNew(v ref, args []ref) (ref, bool)
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
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
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
                // JS values that Go currently has references to, indexed by reference id
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
                // mapping from JS values to reference ids
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
        go.argv = ["", \`--service=\${"0.16.14"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok)
            throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`], { type: "text/javascript" });
        H = new Worker(URL.createObjectURL(O));
      } else {
        let O = ((V) => {
          var Z = P((U, kB, EB) => new Promise((_, g) => {
            var h = P((R) => {
              try {
                v(EB.next(R));
              } catch (L) {
                g(L);
              }
            }, "fulfilled"), X = P((R) => {
              try {
                v(EB.throw(R));
              } catch (L) {
                g(L);
              }
            }, "rejected"), v = P((R) => R.done ? _(R.value) : Promise.resolve(R.value).then(h, X), "step");
            v((EB = EB.apply(U, kB)).next());
          }), "__async");
          let $B, G = {};
          for (let U = self; U; U = Object.getPrototypeOf(U))
            for (let kB of Object.getOwnPropertyNames(U))
              kB in G || Object.defineProperty(G, kB, { get: () => self[kB] });
          (() => {
            let U = P(() => {
              let _ = new Error("not implemented");
              return _.code = "ENOSYS", _;
            }, "enosys");
            if (!G.fs) {
              let _ = "";
              G.fs = { constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, writeSync(g, h) {
                _ += EB.decode(h);
                let X = _.lastIndexOf(`
`);
                return X != -1 && (console.log(_.substr(0, X)), _ = _.substr(X + 1)), h.length;
              }, write(g, h, X, v, R, L) {
                if (X !== 0 || v !== h.length || R !== null) {
                  L(U());
                  return;
                }
                let x = this.writeSync(g, h);
                L(null, x);
              }, chmod(g, h, X) {
                X(U());
              }, chown(g, h, X, v) {
                v(U());
              }, close(g, h) {
                h(U());
              }, fchmod(g, h, X) {
                X(U());
              }, fchown(g, h, X, v) {
                v(U());
              }, fstat(g, h) {
                h(U());
              }, fsync(g, h) {
                h(null);
              }, ftruncate(g, h, X) {
                X(U());
              }, lchown(g, h, X, v) {
                v(U());
              }, link(g, h, X) {
                X(U());
              }, lstat(g, h) {
                h(U());
              }, mkdir(g, h, X) {
                X(U());
              }, open(g, h, X, v) {
                v(U());
              }, read(g, h, X, v, R, L) {
                L(U());
              }, readdir(g, h) {
                h(U());
              }, readlink(g, h) {
                h(U());
              }, rename(g, h, X) {
                X(U());
              }, rmdir(g, h) {
                h(U());
              }, stat(g, h) {
                h(U());
              }, symlink(g, h, X) {
                X(U());
              }, truncate(g, h, X) {
                X(U());
              }, unlink(g, h) {
                h(U());
              }, utimes(g, h, X, v) {
                v(U());
              } };
            }
            if (G.process || (G.process = { getuid() {
              return -1;
            }, getgid() {
              return -1;
            }, geteuid() {
              return -1;
            }, getegid() {
              return -1;
            }, getgroups() {
              throw U();
            }, pid: -1, ppid: -1, umask() {
              throw U();
            }, cwd() {
              throw U();
            }, chdir() {
              throw U();
            } }), !G.crypto)
              throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
            if (!G.performance)
              throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
            if (!G.TextEncoder)
              throw new Error("globalThis.TextEncoder is not available, polyfill required");
            if (!G.TextDecoder)
              throw new Error("globalThis.TextDecoder is not available, polyfill required");
            let kB = new TextEncoder("utf-8"), EB = new TextDecoder("utf-8");
            G.Go = class {
              constructor() {
                this.argv = ["js"], this.env = {}, this.exit = (a) => {
                  a !== 0 && console.warn("exit code:", a);
                }, this._exitPromise = new Promise((a) => {
                  this._resolveExitPromise = a;
                }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
                let _ = P((a, T) => {
                  this.mem.setUint32(a + 0, T, true), this.mem.setUint32(a + 4, Math.floor(T / 4294967296), true);
                }, "setInt64"), g = P((a) => {
                  let T = this.mem.getUint32(a + 0, true), w = this.mem.getInt32(a + 4, true);
                  return T + w * 4294967296;
                }, "getInt64"), h = P((a) => {
                  let T = this.mem.getFloat64(a, true);
                  if (T === 0)
                    return;
                  if (!isNaN(T))
                    return T;
                  let w = this.mem.getUint32(a, true);
                  return this._values[w];
                }, "loadValue"), X = P((a, T) => {
                  if (typeof T == "number" && T !== 0) {
                    if (isNaN(T)) {
                      this.mem.setUint32(a + 4, 2146959360, true), this.mem.setUint32(a, 0, true);
                      return;
                    }
                    this.mem.setFloat64(a, T, true);
                    return;
                  }
                  if (T === void 0) {
                    this.mem.setFloat64(a, 0, true);
                    return;
                  }
                  let C = this._ids.get(T);
                  C === void 0 && (C = this._idPool.pop(), C === void 0 && (C = this._values.length), this._values[C] = T, this._goRefCounts[C] = 0, this._ids.set(T, C)), this._goRefCounts[C]++;
                  let q = 0;
                  switch (typeof T) {
                    case "object":
                      T !== null && (q = 1);
                      break;
                    case "string":
                      q = 2;
                      break;
                    case "symbol":
                      q = 3;
                      break;
                    case "function":
                      q = 4;
                      break;
                  }
                  this.mem.setUint32(a + 4, 2146959360 | q, true), this.mem.setUint32(a, C, true);
                }, "storeValue"), v = P((a) => {
                  let T = g(a + 0), w = g(a + 8);
                  return new Uint8Array(this._inst.exports.mem.buffer, T, w);
                }, "loadSlice"), R = P((a) => {
                  let T = g(a + 0), w = g(a + 8), C = new Array(w);
                  for (let q = 0; q < w; q++)
                    C[q] = h(T + q * 8);
                  return C;
                }, "loadSliceOfValues"), L = P((a) => {
                  let T = g(a + 0), w = g(a + 8);
                  return EB.decode(new DataView(this._inst.exports.mem.buffer, T, w));
                }, "loadString"), x = Date.now() - performance.now();
                this.importObject = { go: { "runtime.wasmExit": (a) => {
                  a >>>= 0;
                  let T = this.mem.getInt32(a + 8, true);
                  this.exited = true, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(T);
                }, "runtime.wasmWrite": (a) => {
                  a >>>= 0;
                  let T = g(a + 8), w = g(a + 16), C = this.mem.getInt32(a + 24, true);
                  G.fs.writeSync(T, new Uint8Array(this._inst.exports.mem.buffer, w, C));
                }, "runtime.resetMemoryDataView": (a) => {
                  a >>>= 0, this.mem = new DataView(this._inst.exports.mem.buffer);
                }, "runtime.nanotime1": (a) => {
                  a >>>= 0, _(a + 8, (x + performance.now()) * 1e6);
                }, "runtime.walltime": (a) => {
                  a >>>= 0;
                  let T = new Date().getTime();
                  _(a + 8, T / 1e3), this.mem.setInt32(a + 16, T % 1e3 * 1e6, true);
                }, "runtime.scheduleTimeoutEvent": (a) => {
                  a >>>= 0;
                  let T = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(T, setTimeout(() => {
                    for (this._resume(); this._scheduledTimeouts.has(T); )
                      console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
                  }, g(a + 8) + 1)), this.mem.setInt32(a + 16, T, true);
                }, "runtime.clearTimeoutEvent": (a) => {
                  a >>>= 0;
                  let T = this.mem.getInt32(a + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(T)), this._scheduledTimeouts.delete(T);
                }, "runtime.getRandomData": (a) => {
                  a >>>= 0, crypto.getRandomValues(v(a + 8));
                }, "syscall/js.finalizeRef": (a) => {
                  a >>>= 0;
                  let T = this.mem.getUint32(a + 8, true);
                  if (this._goRefCounts[T]--, this._goRefCounts[T] === 0) {
                    let w = this._values[T];
                    this._values[T] = null, this._ids.delete(w), this._idPool.push(T);
                  }
                }, "syscall/js.stringVal": (a) => {
                  a >>>= 0, X(a + 24, L(a + 8));
                }, "syscall/js.valueGet": (a) => {
                  a >>>= 0;
                  let T = Reflect.get(h(a + 8), L(a + 16));
                  a = this._inst.exports.getsp() >>> 0, X(a + 32, T);
                }, "syscall/js.valueSet": (a) => {
                  a >>>= 0, Reflect.set(h(a + 8), L(a + 16), h(a + 32));
                }, "syscall/js.valueDelete": (a) => {
                  a >>>= 0, Reflect.deleteProperty(h(a + 8), L(a + 16));
                }, "syscall/js.valueIndex": (a) => {
                  a >>>= 0, X(a + 24, Reflect.get(h(a + 8), g(a + 16)));
                }, "syscall/js.valueSetIndex": (a) => {
                  a >>>= 0, Reflect.set(h(a + 8), g(a + 16), h(a + 24));
                }, "syscall/js.valueCall": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = Reflect.get(T, L(a + 16)), C = R(a + 32), q = Reflect.apply(w, T, C);
                    a = this._inst.exports.getsp() >>> 0, X(a + 56, q), this.mem.setUint8(a + 64, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 56, T), this.mem.setUint8(a + 64, 0);
                  }
                }, "syscall/js.valueInvoke": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = R(a + 16), C = Reflect.apply(T, void 0, w);
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, C), this.mem.setUint8(a + 48, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, T), this.mem.setUint8(a + 48, 0);
                  }
                }, "syscall/js.valueNew": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = R(a + 16), C = Reflect.construct(T, w);
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, C), this.mem.setUint8(a + 48, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, T), this.mem.setUint8(a + 48, 0);
                  }
                }, "syscall/js.valueLength": (a) => {
                  a >>>= 0, _(a + 16, parseInt(h(a + 8).length));
                }, "syscall/js.valuePrepareString": (a) => {
                  a >>>= 0;
                  let T = kB.encode(String(h(a + 8)));
                  X(a + 16, T), _(a + 24, T.length);
                }, "syscall/js.valueLoadString": (a) => {
                  a >>>= 0;
                  let T = h(a + 8);
                  v(a + 16).set(T);
                }, "syscall/js.valueInstanceOf": (a) => {
                  a >>>= 0, this.mem.setUint8(a + 24, h(a + 8) instanceof h(a + 16) ? 1 : 0);
                }, "syscall/js.copyBytesToGo": (a) => {
                  a >>>= 0;
                  let T = v(a + 8), w = h(a + 32);
                  if (!(w instanceof Uint8Array || w instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(a + 48, 0);
                    return;
                  }
                  let C = w.subarray(0, T.length);
                  T.set(C), _(a + 40, C.length), this.mem.setUint8(a + 48, 1);
                }, "syscall/js.copyBytesToJS": (a) => {
                  a >>>= 0;
                  let T = h(a + 8), w = v(a + 16);
                  if (!(T instanceof Uint8Array || T instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(a + 48, 0);
                    return;
                  }
                  let C = w.subarray(0, T.length);
                  T.set(C), _(a + 40, C.length), this.mem.setUint8(a + 48, 1);
                }, debug: (a) => {
                  console.log(a);
                } } };
              }
              run(_) {
                return Z(this, null, function* () {
                  if (!(_ instanceof WebAssembly.Instance))
                    throw new Error("Go.run: WebAssembly.Instance expected");
                  this._inst = _, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [NaN, 0, null, true, false, G, this], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([[0, 1], [null, 2], [true, 3], [false, 4], [G, 5], [this, 6]]), this._idPool = [], this.exited = false;
                  let g = 4096, h = P((a) => {
                    let T = g, w = kB.encode(a + "\0");
                    return new Uint8Array(this.mem.buffer, g, w.length).set(w), g += w.length, g % 8 !== 0 && (g += 8 - g % 8), T;
                  }, "strPtr"), X = this.argv.length, v = [];
                  this.argv.forEach((a) => {
                    v.push(h(a));
                  }), v.push(0), Object.keys(this.env).sort().forEach((a) => {
                    v.push(h(`${a}=${this.env[a]}`));
                  }), v.push(0);
                  let L = g;
                  v.forEach((a) => {
                    this.mem.setUint32(g, a, true), this.mem.setUint32(g + 4, 0, true), g += 8;
                  });
                  let x = 4096 + 8192;
                  if (g >= x)
                    throw new Error("total length of command line and environment variables exceeds limit");
                  this._inst.exports.run(X, L), this.exited && this._resolveExitPromise(), yield this._exitPromise;
                });
              }
              _resume() {
                if (this.exited)
                  throw new Error("Go program has already exited");
                this._inst.exports.resume(), this.exited && this._resolveExitPromise();
              }
              _makeFuncWrapper(_) {
                let g = this;
                return function() {
                  let h = { id: _, this: this, args: arguments };
                  return g._pendingEvent = h, g._resume(), h.result;
                };
              }
            };
          })(), $B = P(({ data: U }) => {
            let kB = new TextDecoder(), EB = G.fs, _ = "";
            EB.writeSync = (R, L) => {
              if (R === 1)
                V(L);
              else if (R === 2) {
                _ += kB.decode(L);
                let x = _.split(`
`);
                x.length > 1 && console.log(x.slice(0, -1).join(`
`)), _ = x[x.length - 1];
              } else
                throw new Error("Bad write");
              return L.length;
            };
            let g = [], h, X = 0;
            $B = P(({ data: R }) => {
              R.length > 0 && (g.push(R), h && h());
            }, "onmessage"), EB.read = (R, L, x, a, T, w) => {
              if (R !== 0 || x !== 0 || a !== L.length || T !== null)
                throw new Error("Bad read");
              if (g.length === 0) {
                h = P(() => EB.read(R, L, x, a, T, w), "resumeStdin");
                return;
              }
              let C = g[0], q = Math.max(0, Math.min(a, C.length - X));
              L.set(C.subarray(X, X + q), x), X += q, X === C.length && (g.shift(), X = 0), w(null, q);
            };
            let v = new G.Go();
            v.argv = ["", "--service=0.16.14"], BB(U, v).then((R) => {
              V(null), v.run(R);
            }, (R) => {
              V(R);
            });
          }, "onmessage");
          function BB(U, kB) {
            return Z(this, null, function* () {
              if (U instanceof WebAssembly.Module)
                return WebAssembly.instantiate(U, kB.importObject);
              let EB = yield fetch(U);
              if (!EB.ok)
                throw new Error(`Failed to download ${JSON.stringify(U)}`);
              if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(EB.headers.get("Content-Type") || ""))
                return (yield WebAssembly.instantiateStreaming(EB, kB.importObject)).instance;
              let _ = yield EB.arrayBuffer();
              return (yield WebAssembly.instantiate(_, kB.importObject)).instance;
            });
          }
          return P(BB, "tryToInstantiateModule"), (U) => $B(U);
        })((V) => H.onmessage({ data: V }));
        H = { onmessage: null, postMessage: (V) => setTimeout(() => O({ data: V })), terminate() {
        } };
      }
      let M, y, S = new Promise((O, V) => {
        M = O, y = V;
      });
      H.onmessage = ({ data: O }) => {
        H.onmessage = ({ data: V }) => D(V), O ? y(O) : M();
      }, H.postMessage(l || new URL(s, location.href).toString());
      let { readFromStdout: D, service: b } = Ge({ writeToStdin(O) {
        H.postMessage(O);
      }, isSync: false, isWriteUnavailable: true, esbuild: i });
      yield S, W7 = { build: (O) => new Promise((V, Z) => b.buildOrServe({ callName: "build", refs: null, serveOptions: null, options: O, isTTY: false, defaultWD: "/", callback: ($B, G) => $B ? Z($B) : V(G) })), transform: (O, V) => new Promise((Z, $B) => b.transform({ callName: "transform", refs: null, input: O, options: V || {}, isTTY: false, fs: { readFile(G, BB) {
        BB(new Error("Internal error"), null);
      }, writeFile(G, BB) {
        BB(null);
      } }, callback: (G, BB) => G ? $B(G) : Z(BB) })), formatMessages: (O, V) => new Promise((Z, $B) => b.formatMessages({ callName: "formatMessages", refs: null, messages: O, options: V, callback: (G, BB) => G ? $B(G) : Z(BB) })), analyzeMetafile: (O, V) => new Promise((Z, $B) => b.analyzeMetafile({ callName: "analyzeMetafile", refs: null, metafile: typeof O == "string" ? O : JSON.stringify(O), options: V, callback: (G, BB) => G ? $B(G) : Z(BB) })) };
    }), "startRunningService"), nP = i;
  })(typeof L$ == "object" ? L$ : { set exports(B) {
    (typeof self < "u" ? self : this).esbuild = B;
  } });
});
aB();
aB();
var Mt = new Error("timeout while waiting for mutex to become available");
var yt = new Error("mutex already locked");
var pP = new Error("request for lock canceled");
var uP = function(B, A, $, k) {
  function e(t) {
    return t instanceof $ ? t : new $(function(E) {
      E(t);
    });
  }
  return P(e, "adopt"), new ($ || ($ = Promise))(function(t, E) {
    function r(j) {
      try {
        i(k.next(j));
      } catch (o) {
        E(o);
      }
    }
    P(r, "fulfilled");
    function n(j) {
      try {
        i(k.throw(j));
      } catch (o) {
        E(o);
      }
    }
    P(n, "rejected");
    function i(j) {
      j.done ? t(j.value) : e(j.value).then(r, n);
    }
    P(i, "step"), i((k = k.apply(B, A || [])).next());
  });
};
var m7 = class {
  constructor(A, $ = pP) {
    this._value = A, this._cancelError = $, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    return new Promise(($, k) => {
      this._weightedQueues[A - 1] || (this._weightedQueues[A - 1] = []), this._weightedQueues[A - 1].push({ resolve: $, reject: k }), this._dispatch();
    });
  }
  runExclusive(A, $ = 1) {
    return uP(this, void 0, void 0, function* () {
      let [k, e] = yield this.acquire($);
      try {
        return yield A(k);
      } finally {
        e();
      }
    });
  }
  waitForUnlock(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    return new Promise(($) => {
      this._weightedWaiters[A - 1] || (this._weightedWaiters[A - 1] = []), this._weightedWaiters[A - 1].push($), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(A) {
    this._value = A, this._dispatch();
  }
  release(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    this._value += A, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((A) => A.forEach(($) => $.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var A;
    for (let $ = this._value; $ > 0; $--) {
      let k = (A = this._weightedQueues[$ - 1]) === null || A === void 0 ? void 0 : A.shift();
      if (!k)
        continue;
      let e = this._value, t = $;
      this._value -= $, $ = this._value + 1, k.resolve([e, this._newReleaser(t)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(A) {
    let $ = false;
    return () => {
      $ || ($ = true, this.release(A));
    };
  }
  _drainUnlockWaiters() {
    for (let A = this._value; A > 0; A--)
      this._weightedWaiters[A - 1] && (this._weightedWaiters[A - 1].forEach(($) => $()), this._weightedWaiters[A - 1] = []);
  }
};
P(m7, "Semaphore");
var cP = function(B, A, $, k) {
  function e(t) {
    return t instanceof $ ? t : new $(function(E) {
      E(t);
    });
  }
  return P(e, "adopt"), new ($ || ($ = Promise))(function(t, E) {
    function r(j) {
      try {
        i(k.next(j));
      } catch (o) {
        E(o);
      }
    }
    P(r, "fulfilled");
    function n(j) {
      try {
        i(k.throw(j));
      } catch (o) {
        E(o);
      }
    }
    P(n, "rejected");
    function i(j) {
      j.done ? t(j.value) : e(j.value).then(r, n);
    }
    P(i, "step"), i((k = k.apply(B, A || [])).next());
  });
};
var VA = class {
  constructor(A) {
    this._semaphore = new m7(1, A);
  }
  acquire() {
    return cP(this, void 0, void 0, function* () {
      let [, A] = yield this._semaphore.acquire();
      return A;
    });
  }
  runExclusive(A) {
    return this._semaphore.runExclusive(() => A());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    this._semaphore.isLocked() && this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};
P(VA, "Mutex");
aB();
var E7 = "delete";
var pB = 5;
var KB = 1 << pB;
var CB = KB - 1;
var tB = {};
function z7() {
  return { value: false };
}
P(z7, "MakeRef");
function VB(B) {
  B && (B.value = true);
}
P(VB, "SetRef");
function t$() {
}
P(t$, "OwnerID");
function MA(B) {
  return B.size === void 0 && (B.size = B.__iterate(Sk)), B.size;
}
P(MA, "ensureSize");
function uA(B, A) {
  if (typeof A != "number") {
    var $ = A >>> 0;
    if ("" + $ !== A || $ === 4294967295)
      return NaN;
    A = $;
  }
  return A < 0 ? MA(B) + A : A;
}
P(uA, "wrapIndex");
function Sk() {
  return true;
}
P(Sk, "returnTrue");
function b7(B, A, $) {
  return (B === 0 && !bk(B) || $ !== void 0 && B <= -$) && (A === void 0 || $ !== void 0 && A >= $);
}
P(b7, "wholeSlice");
function r7(B, A) {
  return Hk(B, A, 0);
}
P(r7, "resolveBegin");
function x7(B, A) {
  return Hk(B, A, A);
}
P(x7, "resolveEnd");
function Hk(B, A, $) {
  return B === void 0 ? $ : bk(B) ? A === 1 / 0 ? A : Math.max(0, A + B) | 0 : A === void 0 || A === B ? B : Math.min(A, B) | 0;
}
P(Hk, "resolveIndex");
function bk(B) {
  return B < 0 || B === 0 && 1 / B === -1 / 0;
}
P(bk, "isNeg");
var xk = "@@__IMMUTABLE_ITERABLE__@@";
function FB(B) {
  return Boolean(B && B[xk]);
}
P(FB, "isCollection");
var vk = "@@__IMMUTABLE_KEYED__@@";
function cB(B) {
  return Boolean(B && B[vk]);
}
P(cB, "isKeyed");
var Mk = "@@__IMMUTABLE_INDEXED__@@";
function IB(B) {
  return Boolean(B && B[Mk]);
}
P(IB, "isIndexed");
function v7(B) {
  return cB(B) || IB(B);
}
P(v7, "isAssociative");
var gB = P(function(A) {
  return FB(A) ? A : GB(A);
}, "Collection");
var YB = function(B) {
  function A($) {
    return cB($) ? $ : hA($);
  }
  return P(A, "KeyedCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB);
var XA = function(B) {
  function A($) {
    return IB($) ? $ : PA($);
  }
  return P(A, "IndexedCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB);
var IA = function(B) {
  function A($) {
    return FB($) && !v7($) ? $ : WA($);
  }
  return P(A, "SetCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB);
gB.Keyed = YB;
gB.Indexed = XA;
gB.Set = IA;
var yk = "@@__IMMUTABLE_SEQ__@@";
function E$(B) {
  return Boolean(B && B[yk]);
}
P(E$, "isSeq");
var wk = "@@__IMMUTABLE_RECORD__@@";
function FA(B) {
  return Boolean(B && B[wk]);
}
P(FA, "isRecord");
function nA(B) {
  return FB(B) || FA(B);
}
P(nA, "isImmutable");
var UA = "@@__IMMUTABLE_ORDERED__@@";
function kA(B) {
  return Boolean(B && B[UA]);
}
P(kA, "isOrdered");
var n7 = 0;
var eA = 1;
var zB = 2;
var Y7 = typeof Symbol == "function" && Symbol.iterator;
var Ck = "@@iterator";
var M7 = Y7 || Ck;
var nB = P(function(A) {
  this.next = A;
}, "Iterator");
nB.prototype.toString = P(function() {
  return "[Iterator]";
}, "toString");
nB.KEYS = n7;
nB.VALUES = eA;
nB.ENTRIES = zB;
nB.prototype.inspect = nB.prototype.toSource = function() {
  return this.toString();
};
nB.prototype[M7] = function() {
  return this;
};
function hB(B, A, $, k) {
  var e = B === 0 ? A : B === 1 ? $ : [A, $];
  return k ? k.value = e : k = { value: e, done: false }, k;
}
P(hB, "iteratorValue");
function UB() {
  return { value: void 0, done: true };
}
P(UB, "iteratorDone");
function _k(B) {
  return Array.isArray(B) ? true : !!y7(B);
}
P(_k, "hasIterator");
function $k(B) {
  return B && typeof B.next == "function";
}
P($k, "isIterator");
function Z7(B) {
  var A = y7(B);
  return A && A.call(B);
}
P(Z7, "getIterator");
function y7(B) {
  var A = B && (Y7 && B[Y7] || B[Ck]);
  if (typeof A == "function")
    return A;
}
P(y7, "getIteratorFn");
function hP(B) {
  var A = y7(B);
  return A && A === B.entries;
}
P(hP, "isEntriesIterable");
function mP(B) {
  var A = y7(B);
  return A && A === B.keys;
}
P(mP, "isKeysIterable");
var LA = Object.prototype.hasOwnProperty;
function Rk(B) {
  return Array.isArray(B) || typeof B == "string" ? true : B && typeof B == "object" && Number.isInteger(B.length) && B.length >= 0 && (B.length === 0 ? Object.keys(B).length === 1 : B.hasOwnProperty(B.length - 1));
}
P(Rk, "isArrayLike");
var GB = function(B) {
  function A($) {
    return $ == null ? n$() : nA($) ? $.toSeq() : dP($);
  }
  return P(A, "Seq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toSeq = P(function() {
    return this;
  }, "toSeq"), A.prototype.toString = P(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), A.prototype.cacheResult = P(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), A.prototype.__iterate = P(function(k, e) {
    var t = this._cache;
    if (t) {
      for (var E = t.length, r = 0; r !== E; ) {
        var n = t[e ? E - ++r : r++];
        if (k(n[1], n[0], this) === false)
          break;
      }
      return r;
    }
    return this.__iterateUncached(k, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this._cache;
    if (t) {
      var E = t.length, r = 0;
      return new nB(function() {
        if (r === E)
          return UB();
        var n = t[e ? E - ++r : r++];
        return hB(k, n[0], n[1]);
      });
    }
    return this.__iteratorUncached(k, e);
  }, "__iterator"), A;
}(gB);
var hA = function(B) {
  function A($) {
    return $ == null ? n$().toKeyedSeq() : FB($) ? cB($) ? $.toSeq() : $.fromEntrySeq() : FA($) ? $.toSeq() : i$($);
  }
  return P(A, "KeyedSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toKeyedSeq = P(function() {
    return this;
  }, "toKeyedSeq"), A;
}(GB);
var PA = function(B) {
  function A($) {
    return $ == null ? n$() : FB($) ? cB($) ? $.entrySeq() : $.toIndexedSeq() : FA($) ? $.toSeq().entrySeq() : Dk($);
  }
  return P(A, "IndexedSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return A(arguments);
  }, "of"), A.prototype.toIndexedSeq = P(function() {
    return this;
  }, "toIndexedSeq"), A.prototype.toString = P(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), A;
}(GB);
var WA = function(B) {
  function A($) {
    return (FB($) && !v7($) ? $ : PA($)).toSetSeq();
  }
  return P(A, "SetSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return A(arguments);
  }, "of"), A.prototype.toSetSeq = P(function() {
    return this;
  }, "toSetSeq"), A;
}(GB);
GB.isSeq = E$;
GB.Keyed = hA;
GB.Set = WA;
GB.Indexed = PA;
GB.prototype[yk] = true;
var TA = function(B) {
  function A($) {
    this._array = $, this.size = $.length;
  }
  return P(A, "ArraySeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P(function(k, e) {
    return this.has(k) ? this._array[uA(this, k)] : e;
  }, "get"), A.prototype.__iterate = P(function(k, e) {
    for (var t = this._array, E = t.length, r = 0; r !== E; ) {
      var n = e ? E - ++r : r++;
      if (k(t[n], n, this) === false)
        break;
    }
    return r;
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this._array, E = t.length, r = 0;
    return new nB(function() {
      if (r === E)
        return UB();
      var n = e ? E - ++r : r++;
      return hB(k, n, t[n]);
    });
  }, "__iterator"), A;
}(PA);
var r$ = function(B) {
  function A($) {
    var k = Object.keys($).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols($) : []);
    this._object = $, this._keys = k, this.size = k.length;
  }
  return P(A, "ObjectSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P(function(k, e) {
    return e !== void 0 && !this.has(k) ? e : this._object[k];
  }, "get"), A.prototype.has = P(function(k) {
    return LA.call(this._object, k);
  }, "has"), A.prototype.__iterate = P(function(k, e) {
    for (var t = this._object, E = this._keys, r = E.length, n = 0; n !== r; ) {
      var i = E[e ? r - ++n : n++];
      if (k(t[i], i, this) === false)
        break;
    }
    return n;
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this._object, E = this._keys, r = E.length, n = 0;
    return new nB(function() {
      if (n === r)
        return UB();
      var i = E[e ? r - ++n : n++];
      return hB(k, i, t[i]);
    });
  }, "__iterator"), A;
}(hA);
r$.prototype[UA] = true;
var QP = function(B) {
  function A($) {
    this._collection = $, this.size = $.length || $.size;
  }
  return P(A, "CollectionSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.__iterateUncached = P(function(k, e) {
    if (e)
      return this.cacheResult().__iterate(k, e);
    var t = this._collection, E = Z7(t), r = 0;
    if ($k(E))
      for (var n; !(n = E.next()).done && k(n.value, r++, this) !== false; )
        ;
    return r;
  }, "__iterateUncached"), A.prototype.__iteratorUncached = P(function(k, e) {
    if (e)
      return this.cacheResult().__iterator(k, e);
    var t = this._collection, E = Z7(t);
    if (!$k(E))
      return new nB(UB);
    var r = 0;
    return new nB(function() {
      var n = E.next();
      return n.done ? n : hB(k, r++, n.value);
    });
  }, "__iteratorUncached"), A;
}(PA);
var kk;
function n$() {
  return kk || (kk = new TA([]));
}
P(n$, "emptySequence");
function i$(B) {
  var A = a$(B);
  if (A)
    return A.fromEntrySeq();
  if (typeof B == "object")
    return new r$(B);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + B);
}
P(i$, "keyedSeqFromValue");
function Dk(B) {
  var A = a$(B);
  if (A)
    return A;
  throw new TypeError("Expected Array or collection object of values: " + B);
}
P(Dk, "indexedSeqFromValue");
function dP(B) {
  var A = a$(B);
  if (A)
    return hP(B) ? A.fromEntrySeq() : mP(B) ? A.toSetSeq() : A;
  if (typeof B == "object")
    return new r$(B);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + B);
}
P(dP, "seqFromValue");
function a$(B) {
  return Rk(B) ? new TA(B) : _k(B) ? new QP(B) : void 0;
}
P(a$, "maybeIndexedSeqFromValue");
var Ik = "@@__IMMUTABLE_MAP__@@";
function s$(B) {
  return Boolean(B && B[Ik]);
}
P(s$, "isMap");
function Fk(B) {
  return s$(B) && kA(B);
}
P(Fk, "isOrderedMap");
function ek(B) {
  return Boolean(B && typeof B.equals == "function" && typeof B.hashCode == "function");
}
P(ek, "isValueObject");
function OB(B, A) {
  if (B === A || B !== B && A !== A)
    return true;
  if (!B || !A)
    return false;
  if (typeof B.valueOf == "function" && typeof A.valueOf == "function") {
    if (B = B.valueOf(), A = A.valueOf(), B === A || B !== B && A !== A)
      return true;
    if (!B || !A)
      return false;
  }
  return !!(ek(B) && ek(A) && B.equals(A));
}
P(OB, "is");
var JA = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : P(function(A, $) {
  A |= 0, $ |= 0;
  var k = A & 65535, e = $ & 65535;
  return k * e + ((A >>> 16) * e + k * ($ >>> 16) << 16 >>> 0) | 0;
}, "imul");
function w7(B) {
  return B >>> 1 & 1073741824 | B & 3221225471;
}
P(w7, "smi");
var gP = Object.prototype.valueOf;
function NB(B) {
  if (B == null)
    return Pk(B);
  if (typeof B.hashCode == "function")
    return w7(B.hashCode(B));
  var A = bP(B);
  if (A == null)
    return Pk(A);
  switch (typeof A) {
    case "boolean":
      return A ? 1108378657 : 1108378656;
    case "number":
      return TP(A);
    case "string":
      return A.length > xP ? XP(A) : B$(A);
    case "object":
    case "function":
      return SP(A);
    case "symbol":
      return fP(A);
    default:
      if (typeof A.toString == "function")
        return B$(A.toString());
      throw new Error("Value type " + typeof A + " cannot be hashed.");
  }
}
P(NB, "hash");
function Pk(B) {
  return B === null ? 1108378658 : 1108378659;
}
P(Pk, "hashNullish");
function TP(B) {
  if (B !== B || B === 1 / 0)
    return 0;
  var A = B | 0;
  for (A !== B && (A ^= B * 4294967295); B > 4294967295; )
    B /= 4294967295, A ^= B;
  return w7(A);
}
P(TP, "hashNumber");
function XP(B) {
  var A = K7[B];
  return A === void 0 && (A = B$(B), q7 === vP && (q7 = 0, K7 = {}), q7++, K7[B] = A), A;
}
P(XP, "cachedHashString");
function B$(B) {
  for (var A = 0, $ = 0; $ < B.length; $++)
    A = 31 * A + B.charCodeAt($) | 0;
  return w7(A);
}
P(B$, "hashString");
function fP(B) {
  var A = rk[B];
  return A !== void 0 || (A = Uk(), rk[B] = A), A;
}
P(fP, "hashSymbol");
function SP(B) {
  var A;
  if (A$ && (A = $$.get(B), A !== void 0) || (A = B[gA], A !== void 0) || !Ek && (A = B.propertyIsEnumerable && B.propertyIsEnumerable[gA], A !== void 0 || (A = HP(B), A !== void 0)))
    return A;
  if (A = Uk(), A$)
    $$.set(B, A);
  else {
    if (tk !== void 0 && tk(B) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (Ek)
      Object.defineProperty(B, gA, { enumerable: false, configurable: false, writable: false, value: A });
    else if (B.propertyIsEnumerable !== void 0 && B.propertyIsEnumerable === B.constructor.prototype.propertyIsEnumerable)
      B.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, B.propertyIsEnumerable[gA] = A;
    else if (B.nodeType !== void 0)
      B[gA] = A;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return A;
}
P(SP, "hashJSObj");
var tk = Object.isExtensible;
var Ek = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function HP(B) {
  if (B && B.nodeType > 0)
    switch (B.nodeType) {
      case 1:
        return B.uniqueID;
      case 9:
        return B.documentElement && B.documentElement.uniqueID;
    }
}
P(HP, "getIENodeHash");
function bP(B) {
  return B.valueOf !== gP && typeof B.valueOf == "function" ? B.valueOf(B) : B;
}
P(bP, "valueOf");
function Uk() {
  var B = ++G7;
  return G7 & 1073741824 && (G7 = 0), B;
}
P(Uk, "nextHash");
var A$ = typeof WeakMap == "function";
var $$;
A$ && ($$ = /* @__PURE__ */ new WeakMap());
var rk = /* @__PURE__ */ Object.create(null);
var G7 = 0;
var gA = "__immutablehash__";
typeof Symbol == "function" && (gA = Symbol(gA));
var xP = 16;
var vP = 255;
var q7 = 0;
var K7 = {};
var C7 = function(B) {
  function A($, k) {
    this._iter = $, this._useKeys = k, this.size = $.size;
  }
  return P(A, "ToKeyedSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P(function(k, e) {
    return this._iter.get(k, e);
  }, "get"), A.prototype.has = P(function(k) {
    return this._iter.has(k);
  }, "has"), A.prototype.valueSeq = P(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), A.prototype.reverse = P(function() {
    var k = this, e = o$(this, true);
    return this._useKeys || (e.valueSeq = function() {
      return k._iter.toSeq().reverse();
    }), e;
  }, "reverse"), A.prototype.map = P(function(k, e) {
    var t = this, E = Gk(this, k, e);
    return this._useKeys || (E.valueSeq = function() {
      return t._iter.toSeq().map(k, e);
    }), E;
  }, "map"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E, r) {
      return k(E, r, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    return this._iter.__iterator(k, e);
  }, "__iterator"), A;
}(hA);
C7.prototype[UA] = true;
var Lk = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P(A, "ToIndexedSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.includes = P(function(k) {
    return this._iter.includes(k);
  }, "includes"), A.prototype.__iterate = P(function(k, e) {
    var t = this, E = 0;
    return e && MA(this), this._iter.__iterate(function(r) {
      return k(r, e ? t.size - ++E : E++, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this, E = this._iter.__iterator(eA, e), r = 0;
    return e && MA(this), new nB(function() {
      var n = E.next();
      return n.done ? n : hB(k, e ? t.size - ++r : r++, n.value, n);
    });
  }, "__iterator"), A;
}(PA);
var Wk = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P(A, "ToSetSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.has = P(function(k) {
    return this._iter.includes(k);
  }, "has"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E) {
      return k(E, E, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this._iter.__iterator(eA, e);
    return new nB(function() {
      var E = t.next();
      return E.done ? E : hB(k, E.value, E.value, E);
    });
  }, "__iterator"), A;
}(WA);
var Nk = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P(A, "FromEntriesSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.entrySeq = P(function() {
    return this._iter.toSeq();
  }, "entrySeq"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E) {
      if (E) {
        ik(E);
        var r = FB(E);
        return k(r ? E.get(1) : E[1], r ? E.get(0) : E[0], t);
      }
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this._iter.__iterator(eA, e);
    return new nB(function() {
      for (; ; ) {
        var E = t.next();
        if (E.done)
          return E;
        var r = E.value;
        if (r) {
          ik(r);
          var n = FB(r);
          return hB(k, n ? r.get(0) : r[0], n ? r.get(1) : r[1], E);
        }
      }
    });
  }, "__iterator"), A;
}(hA);
Lk.prototype.cacheResult = C7.prototype.cacheResult = Wk.prototype.cacheResult = Nk.prototype.cacheResult = p$;
function Ok(B) {
  var A = iA(B);
  return A._iter = B, A.size = B.size, A.flip = function() {
    return B;
  }, A.reverse = function() {
    var $ = B.reverse.apply(this);
    return $.flip = function() {
      return B.reverse();
    }, $;
  }, A.has = function($) {
    return B.includes($);
  }, A.includes = function($) {
    return B.has($);
  }, A.cacheResult = p$, A.__iterateUncached = function($, k) {
    var e = this;
    return B.__iterate(function(t, E) {
      return $(E, t, e) !== false;
    }, k);
  }, A.__iteratorUncached = function($, k) {
    if ($ === zB) {
      var e = B.__iterator($, k);
      return new nB(function() {
        var t = e.next();
        if (!t.done) {
          var E = t.value[0];
          t.value[0] = t.value[1], t.value[1] = E;
        }
        return t;
      });
    }
    return B.__iterator($ === eA ? n7 : eA, k);
  }, A;
}
P(Ok, "flipFactory");
function Gk(B, A, $) {
  var k = iA(B);
  return k.size = B.size, k.has = function(e) {
    return B.has(e);
  }, k.get = function(e, t) {
    var E = B.get(e, tB);
    return E === tB ? t : A.call($, E, e, B);
  }, k.__iterateUncached = function(e, t) {
    var E = this;
    return B.__iterate(function(r, n, i) {
      return e(A.call($, r, n, i), n, E) !== false;
    }, t);
  }, k.__iteratorUncached = function(e, t) {
    var E = B.__iterator(zB, t);
    return new nB(function() {
      var r = E.next();
      if (r.done)
        return r;
      var n = r.value, i = n[0];
      return hB(e, i, A.call($, n[1], i, B), r);
    });
  }, k;
}
P(Gk, "mapFactory");
function o$(B, A) {
  var $ = this, k = iA(B);
  return k._iter = B, k.size = B.size, k.reverse = function() {
    return B;
  }, B.flip && (k.flip = function() {
    var e = Ok(B);
    return e.reverse = function() {
      return B.flip();
    }, e;
  }), k.get = function(e, t) {
    return B.get(A ? e : -1 - e, t);
  }, k.has = function(e) {
    return B.has(A ? e : -1 - e);
  }, k.includes = function(e) {
    return B.includes(e);
  }, k.cacheResult = p$, k.__iterate = function(e, t) {
    var E = this, r = 0;
    return t && MA(B), B.__iterate(function(n, i) {
      return e(n, A ? i : t ? E.size - ++r : r++, E);
    }, !t);
  }, k.__iterator = function(e, t) {
    var E = 0;
    t && MA(B);
    var r = B.__iterator(zB, !t);
    return new nB(function() {
      var n = r.next();
      if (n.done)
        return n;
      var i = n.value;
      return hB(e, A ? i[0] : t ? $.size - ++E : E++, i[1], n);
    });
  }, k;
}
P(o$, "reverseFactory");
function qk(B, A, $, k) {
  var e = iA(B);
  return k && (e.has = function(t) {
    var E = B.get(t, tB);
    return E !== tB && !!A.call($, E, t, B);
  }, e.get = function(t, E) {
    var r = B.get(t, tB);
    return r !== tB && A.call($, r, t, B) ? r : E;
  }), e.__iterateUncached = function(t, E) {
    var r = this, n = 0;
    return B.__iterate(function(i, j, o) {
      if (A.call($, i, j, o))
        return n++, t(i, k ? j : n - 1, r);
    }, E), n;
  }, e.__iteratorUncached = function(t, E) {
    var r = B.__iterator(zB, E), n = 0;
    return new nB(function() {
      for (; ; ) {
        var i = r.next();
        if (i.done)
          return i;
        var j = i.value, o = j[0], m = j[1];
        if (A.call($, m, o, B))
          return hB(t, k ? o : n++, m, i);
      }
    });
  }, e;
}
P(qk, "filterFactory");
function MP(B, A, $) {
  var k = OA().asMutable();
  return B.__iterate(function(e, t) {
    k.update(A.call($, e, t, B), 0, function(E) {
      return E + 1;
    });
  }), k.asImmutable();
}
P(MP, "countByFactory");
function yP(B, A, $) {
  var k = cB(B), e = (kA(B) ? oA() : OA()).asMutable();
  B.__iterate(function(E, r) {
    e.update(A.call($, E, r, B), function(n) {
      return n = n || [], n.push(k ? [r, E] : E), n;
    });
  });
  var t = j$(B);
  return e.map(function(E) {
    return oB(B, t(E));
  }).asImmutable();
}
P(yP, "groupByFactory");
function wP(B, A, $) {
  var k = cB(B), e = [[], []];
  B.__iterate(function(E, r) {
    e[A.call($, E, r, B) ? 1 : 0].push(k ? [r, E] : E);
  });
  var t = j$(B);
  return e.map(function(E) {
    return oB(B, t(E));
  });
}
P(wP, "partitionFactory");
function l$(B, A, $, k) {
  var e = B.size;
  if (b7(A, $, e))
    return B;
  var t = r7(A, e), E = x7($, e);
  if (t !== t || E !== E)
    return l$(B.toSeq().cacheResult(), A, $, k);
  var r = E - t, n;
  r === r && (n = r < 0 ? 0 : r);
  var i = iA(B);
  return i.size = n === 0 ? n : B.size && n || void 0, !k && E$(B) && n >= 0 && (i.get = function(j, o) {
    return j = uA(this, j), j >= 0 && j < n ? B.get(j + t, o) : o;
  }), i.__iterateUncached = function(j, o) {
    var m = this;
    if (n === 0)
      return 0;
    if (o)
      return this.cacheResult().__iterate(j, o);
    var c = 0, p = true, Q = 0;
    return B.__iterate(function(f, Y) {
      if (!(p && (p = c++ < t)))
        return Q++, j(f, k ? Y : Q - 1, m) !== false && Q !== n;
    }), Q;
  }, i.__iteratorUncached = function(j, o) {
    if (n !== 0 && o)
      return this.cacheResult().__iterator(j, o);
    if (n === 0)
      return new nB(UB);
    var m = B.__iterator(j, o), c = 0, p = 0;
    return new nB(function() {
      for (; c++ < t; )
        m.next();
      if (++p > n)
        return UB();
      var Q = m.next();
      return k || j === eA || Q.done ? Q : j === n7 ? hB(j, p - 1, void 0, Q) : hB(j, p - 1, Q.value[1], Q);
    });
  }, i;
}
P(l$, "sliceFactory");
function CP(B, A, $) {
  var k = iA(B);
  return k.__iterateUncached = function(e, t) {
    var E = this;
    if (t)
      return this.cacheResult().__iterate(e, t);
    var r = 0;
    return B.__iterate(function(n, i, j) {
      return A.call($, n, i, j) && ++r && e(n, i, E);
    }), r;
  }, k.__iteratorUncached = function(e, t) {
    var E = this;
    if (t)
      return this.cacheResult().__iterator(e, t);
    var r = B.__iterator(zB, t), n = true;
    return new nB(function() {
      if (!n)
        return UB();
      var i = r.next();
      if (i.done)
        return i;
      var j = i.value, o = j[0], m = j[1];
      return A.call($, m, o, E) ? e === zB ? i : hB(e, o, m, i) : (n = false, UB());
    });
  }, k;
}
P(CP, "takeWhileFactory");
function Kk(B, A, $, k) {
  var e = iA(B);
  return e.__iterateUncached = function(t, E) {
    var r = this;
    if (E)
      return this.cacheResult().__iterate(t, E);
    var n = true, i = 0;
    return B.__iterate(function(j, o, m) {
      if (!(n && (n = A.call($, j, o, m))))
        return i++, t(j, k ? o : i - 1, r);
    }), i;
  }, e.__iteratorUncached = function(t, E) {
    var r = this;
    if (E)
      return this.cacheResult().__iterator(t, E);
    var n = B.__iterator(zB, E), i = true, j = 0;
    return new nB(function() {
      var o, m, c;
      do {
        if (o = n.next(), o.done)
          return k || t === eA ? o : t === n7 ? hB(t, j++, void 0, o) : hB(t, j++, o.value[1], o);
        var p = o.value;
        m = p[0], c = p[1], i && (i = A.call($, c, m, r));
      } while (i);
      return t === zB ? o : hB(t, m, c, o);
    });
  }, e;
}
P(Kk, "skipWhileFactory");
function _P(B, A) {
  var $ = cB(B), k = [B].concat(A).map(function(E) {
    return FB(E) ? $ && (E = YB(E)) : E = $ ? i$(E) : Dk(Array.isArray(E) ? E : [E]), E;
  }).filter(function(E) {
    return E.size !== 0;
  });
  if (k.length === 0)
    return B;
  if (k.length === 1) {
    var e = k[0];
    if (e === B || $ && cB(e) || IB(B) && IB(e))
      return e;
  }
  var t = new TA(k);
  return $ ? t = t.toKeyedSeq() : IB(B) || (t = t.toSetSeq()), t = t.flatten(true), t.size = k.reduce(function(E, r) {
    if (E !== void 0) {
      var n = r.size;
      if (n !== void 0)
        return E + n;
    }
  }, 0), t;
}
P(_P, "concatFactory");
function Vk(B, A, $) {
  var k = iA(B);
  return k.__iterateUncached = function(e, t) {
    if (t)
      return this.cacheResult().__iterate(e, t);
    var E = 0, r = false;
    function n(i, j) {
      i.__iterate(function(o, m) {
        return (!A || j < A) && FB(o) ? n(o, j + 1) : (E++, e(o, $ ? m : E - 1, k) === false && (r = true)), !r;
      }, t);
    }
    return P(n, "flatDeep"), n(B, 0), E;
  }, k.__iteratorUncached = function(e, t) {
    if (t)
      return this.cacheResult().__iterator(e, t);
    var E = B.__iterator(e, t), r = [], n = 0;
    return new nB(function() {
      for (; E; ) {
        var i = E.next();
        if (i.done !== false) {
          E = r.pop();
          continue;
        }
        var j = i.value;
        if (e === zB && (j = j[1]), (!A || r.length < A) && FB(j))
          r.push(E), E = j.__iterator(e, t);
        else
          return $ ? i : hB(e, n++, j, i);
      }
      return UB();
    });
  }, k;
}
P(Vk, "flattenFactory");
function RP(B, A, $) {
  var k = j$(B);
  return B.toSeq().map(function(e, t) {
    return k(A.call($, e, t, B));
  }).flatten(true);
}
P(RP, "flatMapFactory");
function DP(B, A) {
  var $ = iA(B);
  return $.size = B.size && B.size * 2 - 1, $.__iterateUncached = function(k, e) {
    var t = this, E = 0;
    return B.__iterate(function(r) {
      return (!E || k(A, E++, t) !== false) && k(r, E++, t) !== false;
    }, e), E;
  }, $.__iteratorUncached = function(k, e) {
    var t = B.__iterator(eA, e), E = 0, r;
    return new nB(function() {
      return (!r || E % 2) && (r = t.next(), r.done) ? r : E % 2 ? hB(k, E++, A) : hB(k, E++, r.value, r);
    });
  }, $;
}
P(DP, "interposeFactory");
function yA(B, A, $) {
  A || (A = Jk);
  var k = cB(B), e = 0, t = B.toSeq().map(function(E, r) {
    return [r, E, e++, $ ? $(E, r, B) : E];
  }).valueSeq().toArray();
  return t.sort(function(E, r) {
    return A(E[3], r[3]) || E[2] - r[2];
  }).forEach(k ? function(E, r) {
    t[r].length = 2;
  } : function(E, r) {
    t[r] = E[1];
  }), k ? hA(t) : IB(B) ? PA(t) : WA(t);
}
P(yA, "sortFactory");
function Q7(B, A, $) {
  if (A || (A = Jk), $) {
    var k = B.toSeq().map(function(e, t) {
      return [e, $(e, t, B)];
    }).reduce(function(e, t) {
      return nk(A, e[1], t[1]) ? t : e;
    });
    return k && k[0];
  }
  return B.reduce(function(e, t) {
    return nk(A, e, t) ? t : e;
  });
}
P(Q7, "maxFactory");
function nk(B, A, $) {
  var k = B($, A);
  return k === 0 && $ !== A && ($ == null || $ !== $) || k > 0;
}
P(nk, "maxCompare");
function d7(B, A, $, k) {
  var e = iA(B), t = new TA($).map(function(E) {
    return E.size;
  });
  return e.size = k ? t.max() : t.min(), e.__iterate = function(E, r) {
    for (var n = this.__iterator(eA, r), i, j = 0; !(i = n.next()).done && E(i.value, j++, this) !== false; )
      ;
    return j;
  }, e.__iteratorUncached = function(E, r) {
    var n = $.map(function(o) {
      return o = gB(o), Z7(r ? o.reverse() : o);
    }), i = 0, j = false;
    return new nB(function() {
      var o;
      return j || (o = n.map(function(m) {
        return m.next();
      }), j = k ? o.every(function(m) {
        return m.done;
      }) : o.some(function(m) {
        return m.done;
      })), j ? UB() : hB(E, i++, A.apply(null, o.map(function(m) {
        return m.value;
      })));
    });
  }, e;
}
P(d7, "zipWithFactory");
function oB(B, A) {
  return B === A ? B : E$(B) ? A : B.constructor(A);
}
P(oB, "reify");
function ik(B) {
  if (B !== Object(B))
    throw new TypeError("Expected [K, V] tuple: " + B);
}
P(ik, "validateEntry");
function j$(B) {
  return cB(B) ? YB : IB(B) ? XA : IA;
}
P(j$, "collectionClass");
function iA(B) {
  return Object.create((cB(B) ? hA : IB(B) ? PA : WA).prototype);
}
P(iA, "makeSequence");
function p$() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : GB.prototype.cacheResult.call(this);
}
P(p$, "cacheResultThrough");
function Jk(B, A) {
  return B === void 0 && A === void 0 ? 0 : B === void 0 ? 1 : A === void 0 ? -1 : B > A ? 1 : B < A ? -1 : 0;
}
P(Jk, "defaultComparator");
function rA(B, A) {
  A = A || 0;
  for (var $ = Math.max(0, B.length - A), k = new Array($), e = 0; e < $; e++)
    k[e] = B[e + A];
  return k;
}
P(rA, "arrCopy");
function u$(B, A) {
  if (!B)
    throw new Error(A);
}
P(u$, "invariant");
function JB(B) {
  u$(B !== 1 / 0, "Cannot perform this action with an infinite size.");
}
P(JB, "assertNotInfinite");
function zk(B) {
  if (Rk(B) && typeof B != "string")
    return B;
  if (kA(B))
    return B.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + B);
}
P(zk, "coerceKeyPath");
var IP = Object.prototype.toString;
function FP(B) {
  if (!B || typeof B != "object" || IP.call(B) !== "[object Object]")
    return false;
  var A = Object.getPrototypeOf(B);
  if (A === null)
    return true;
  for (var $ = A, k = Object.getPrototypeOf(A); k !== null; )
    $ = k, k = Object.getPrototypeOf($);
  return $ === A;
}
P(FP, "isPlainObject");
function cA(B) {
  return typeof B == "object" && (nA(B) || Array.isArray(B) || FP(B));
}
P(cA, "isDataStructure");
function A7(B) {
  try {
    return typeof B == "string" ? JSON.stringify(B) : String(B);
  } catch {
    return JSON.stringify(B);
  }
}
P(A7, "quoteString");
function UP(B, A) {
  return nA(B) ? B.has(A) : cA(B) && LA.call(B, A);
}
P(UP, "has");
function Yk(B, A, $) {
  return nA(B) ? B.get(A, $) : UP(B, A) ? typeof B.get == "function" ? B.get(A) : B[A] : $;
}
P(Yk, "get");
function S7(B) {
  if (Array.isArray(B))
    return rA(B);
  var A = {};
  for (var $ in B)
    LA.call(B, $) && (A[$] = B[$]);
  return A;
}
P(S7, "shallowCopy");
function LP(B, A) {
  if (!cA(B))
    throw new TypeError("Cannot update non-data-structure value: " + B);
  if (nA(B)) {
    if (!B.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + B);
    return B.remove(A);
  }
  if (!LA.call(B, A))
    return B;
  var $ = S7(B);
  return Array.isArray($) ? $.splice(A, 1) : delete $[A], $;
}
P(LP, "remove");
function WP(B, A, $) {
  if (!cA(B))
    throw new TypeError("Cannot update non-data-structure value: " + B);
  if (nA(B)) {
    if (!B.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + B);
    return B.set(A, $);
  }
  if (LA.call(B, A) && $ === B[A])
    return B;
  var k = S7(B);
  return k[A] = $, k;
}
P(WP, "set");
function NA(B, A, $, k) {
  k || (k = $, $ = void 0);
  var e = Zk(nA(B), B, zk(A), 0, $, k);
  return e === tB ? $ : e;
}
P(NA, "updateIn$1");
function Zk(B, A, $, k, e, t) {
  var E = A === tB;
  if (k === $.length) {
    var r = E ? e : A, n = t(r);
    return n === r ? A : n;
  }
  if (!E && !cA(A))
    throw new TypeError("Cannot update within non-data-structure value in path [" + $.slice(0, k).map(A7) + "]: " + A);
  var i = $[k], j = E ? tB : Yk(A, i, tB), o = Zk(j === tB ? B : nA(j), j, $, k + 1, e, t);
  return o === j ? A : o === tB ? LP(A, i) : WP(E ? B ? $A() : {} : A, i, o);
}
P(Zk, "updateInDeeply");
function NP(B, A, $) {
  return NA(B, A, tB, function() {
    return $;
  });
}
P(NP, "setIn$1");
function c$(B, A) {
  return NP(this, B, A);
}
P(c$, "setIn");
function OP(B, A) {
  return NA(B, A, function() {
    return tB;
  });
}
P(OP, "removeIn");
function h$(B) {
  return OP(this, B);
}
P(h$, "deleteIn");
function Be(B, A, $, k) {
  return NA(B, [A], $, k);
}
P(Be, "update$1");
function m$(B, A, $) {
  return arguments.length === 1 ? B(this) : Be(this, B, A, $);
}
P(m$, "update");
function Q$(B, A, $) {
  return NA(this, B, A, $);
}
P(Q$, "updateIn");
function Ae() {
  for (var B = [], A = arguments.length; A--; )
    B[A] = arguments[A];
  return ke(this, B);
}
P(Ae, "merge$1");
function $e(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  if (typeof B != "function")
    throw new TypeError("Invalid merger function: " + B);
  return ke(this, A, B);
}
P($e, "mergeWith$1");
function ke(B, A, $) {
  for (var k = [], e = 0; e < A.length; e++) {
    var t = YB(A[e]);
    t.size !== 0 && k.push(t);
  }
  return k.length === 0 ? B : B.toSeq().size === 0 && !B.__ownerID && k.length === 1 ? B.constructor(k[0]) : B.withMutations(function(E) {
    for (var r = $ ? function(i, j) {
      Be(E, j, tB, function(o) {
        return o === tB ? i : $(o, i, j);
      });
    } : function(i, j) {
      E.set(j, i);
    }, n = 0; n < k.length; n++)
      k[n].forEach(r);
  });
}
P(ke, "mergeIntoKeyedWith");
function d$(B, A, $) {
  return g$(B, A, GP($));
}
P(d$, "mergeDeepWithSources");
function g$(B, A, $) {
  if (!cA(B))
    throw new TypeError("Cannot merge into non-data-structure value: " + B);
  if (nA(B))
    return typeof $ == "function" && B.mergeWith ? B.mergeWith.apply(B, [$].concat(A)) : B.merge ? B.merge.apply(B, A) : B.concat.apply(B, A);
  for (var k = Array.isArray(B), e = B, t = k ? XA : YB, E = k ? function(n) {
    e === B && (e = S7(e)), e.push(n);
  } : function(n, i) {
    var j = LA.call(e, i), o = j && $ ? $(e[i], n, i) : n;
    (!j || o !== e[i]) && (e === B && (e = S7(e)), e[i] = o);
  }, r = 0; r < A.length; r++)
    t(A[r]).forEach(E);
  return e;
}
P(g$, "mergeWithSources");
function GP(B) {
  function A($, k, e) {
    return cA($) && cA(k) && qP($, k) ? g$($, [k], A) : B ? B($, k, e) : k;
  }
  return P(A, "deepMerger"), A;
}
P(GP, "deepMergerWith");
function qP(B, A) {
  var $ = GB(B), k = GB(A);
  return IB($) === IB(k) && cB($) === cB(k);
}
P(qP, "areMergeable");
function ee() {
  for (var B = [], A = arguments.length; A--; )
    B[A] = arguments[A];
  return d$(this, B);
}
P(ee, "mergeDeep");
function Pe(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return d$(this, A, B);
}
P(Pe, "mergeDeepWith");
function T$(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return NA(this, B, $A(), function(k) {
    return g$(k, A);
  });
}
P(T$, "mergeIn");
function X$(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return NA(this, B, $A(), function(k) {
    return d$(k, A);
  });
}
P(X$, "mergeDeepIn");
function i7(B) {
  var A = this.asMutable();
  return B(A), A.wasAltered() ? A.__ensureOwner(this.__ownerID) : this;
}
P(i7, "withMutations");
function a7() {
  return this.__ownerID ? this : this.__ensureOwner(new t$());
}
P(a7, "asMutable");
function s7() {
  return this.__ensureOwner();
}
P(s7, "asImmutable");
function f$() {
  return this.__altered;
}
P(f$, "wasAltered");
var OA = function(B) {
  function A($) {
    return $ == null ? $A() : s$($) && !kA($) ? $ : $A().withMutations(function(k) {
      var e = B($);
      JB(e.size), e.forEach(function(t, E) {
        return k.set(E, t);
      });
    });
  }
  return P(A, "Map"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    return $A().withMutations(function(t) {
      for (var E = 0; E < k.length; E += 2) {
        if (E + 1 >= k.length)
          throw new Error("Missing value for key: " + k[E]);
        t.set(k[E], k[E + 1]);
      }
    });
  }, "of"), A.prototype.toString = P(function() {
    return this.__toString("Map {", "}");
  }, "toString"), A.prototype.get = P(function(k, e) {
    return this._root ? this._root.get(0, void 0, k, e) : e;
  }, "get"), A.prototype.set = P(function(k, e) {
    return ok(this, k, e);
  }, "set"), A.prototype.remove = P(function(k) {
    return ok(this, k, tB);
  }, "remove"), A.prototype.deleteAll = P(function(k) {
    var e = gB(k);
    return e.size === 0 ? this : this.withMutations(function(t) {
      e.forEach(function(E) {
        return t.remove(E);
      });
    });
  }, "deleteAll"), A.prototype.clear = P(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : $A();
  }, "clear"), A.prototype.sort = P(function(k) {
    return oA(yA(this, k));
  }, "sort"), A.prototype.sortBy = P(function(k, e) {
    return oA(yA(this, e, k));
  }, "sortBy"), A.prototype.map = P(function(k, e) {
    var t = this;
    return this.withMutations(function(E) {
      E.forEach(function(r, n) {
        E.set(n, k.call(e, r, n, t));
      });
    });
  }, "map"), A.prototype.__iterator = P(function(k, e) {
    return new KP(this, k, e);
  }, "__iterator"), A.prototype.__iterate = P(function(k, e) {
    var t = this, E = 0;
    return this._root && this._root.iterate(function(r) {
      return E++, k(r[1], r[0], t);
    }, e), E;
  }, "__iterate"), A.prototype.__ensureOwner = P(function(k) {
    return k === this.__ownerID ? this : k ? S$(this.size, this._root, k, this.__hash) : this.size === 0 ? $A() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A;
}(YB);
OA.isMap = s$;
var uB = OA.prototype;
uB[Ik] = true;
uB[E7] = uB.remove;
uB.removeAll = uB.deleteAll;
uB.setIn = c$;
uB.removeIn = uB.deleteIn = h$;
uB.update = m$;
uB.updateIn = Q$;
uB.merge = uB.concat = Ae;
uB.mergeWith = $e;
uB.mergeDeep = ee;
uB.mergeDeepWith = Pe;
uB.mergeIn = T$;
uB.mergeDeepIn = X$;
uB.withMutations = i7;
uB.wasAltered = f$;
uB.asImmutable = s7;
uB["@@transducer/init"] = uB.asMutable = a7;
uB["@@transducer/step"] = function(B, A) {
  return B.set(A[0], A[1]);
};
uB["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
var $7 = P(function(A, $) {
  this.ownerID = A, this.entries = $;
}, "ArrayMapNode");
$7.prototype.get = P(function(A, $, k, e) {
  for (var t = this.entries, E = 0, r = t.length; E < r; E++)
    if (OB(k, t[E][0]))
      return t[E][1];
  return e;
}, "get");
$7.prototype.update = P(function(A, $, k, e, t, E, r) {
  for (var n = t === tB, i = this.entries, j = 0, o = i.length; j < o && !OB(e, i[j][0]); j++)
    ;
  var m = j < o;
  if (m ? i[j][1] === t : n)
    return this;
  if (VB(r), (n || !m) && VB(E), !(n && i.length === 1)) {
    if (!m && !n && i.length >= Bt)
      return VP(A, i, e, t);
    var c = A && A === this.ownerID, p = c ? i : rA(i);
    return m ? n ? j === o - 1 ? p.pop() : p[j] = p.pop() : p[j] = [e, t] : p.push([e, t]), c ? (this.entries = p, this) : new $7(A, p);
  }
}, "update");
var wA = P(function(A, $, k) {
  this.ownerID = A, this.bitmap = $, this.nodes = k;
}, "BitmapIndexedNode");
wA.prototype.get = P(function(A, $, k, e) {
  $ === void 0 && ($ = NB(k));
  var t = 1 << ((A === 0 ? $ : $ >>> A) & CB), E = this.bitmap;
  return E & t ? this.nodes[te(E & t - 1)].get(A + pB, $, k, e) : e;
}, "get");
wA.prototype.update = P(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB(e));
  var n = ($ === 0 ? k : k >>> $) & CB, i = 1 << n, j = this.bitmap, o = (j & i) !== 0;
  if (!o && t === tB)
    return this;
  var m = te(j & i - 1), c = this.nodes, p = o ? c[m] : void 0, Q = H$(p, A, $ + pB, k, e, t, E, r);
  if (Q === p)
    return this;
  if (!o && Q && c.length >= At)
    return zP(A, c, j, n, Q);
  if (o && !Q && c.length === 2 && lk(c[m ^ 1]))
    return c[m ^ 1];
  if (o && Q && c.length === 1 && lk(Q))
    return Q;
  var f = A && A === this.ownerID, Y = o ? Q ? j : j ^ i : j | i, K = o ? Q ? Ee(c, m, Q, f) : ZP(c, m, f) : YP(c, m, Q, f);
  return f ? (this.bitmap = Y, this.nodes = K, this) : new wA(A, Y, K);
}, "update");
var k7 = P(function(A, $, k) {
  this.ownerID = A, this.count = $, this.nodes = k;
}, "HashArrayMapNode");
k7.prototype.get = P(function(A, $, k, e) {
  $ === void 0 && ($ = NB(k));
  var t = (A === 0 ? $ : $ >>> A) & CB, E = this.nodes[t];
  return E ? E.get(A + pB, $, k, e) : e;
}, "get");
k7.prototype.update = P(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB(e));
  var n = ($ === 0 ? k : k >>> $) & CB, i = t === tB, j = this.nodes, o = j[n];
  if (i && !o)
    return this;
  var m = H$(o, A, $ + pB, k, e, t, E, r);
  if (m === o)
    return this;
  var c = this.count;
  if (!o)
    c++;
  else if (!m && (c--, c < $t))
    return JP(A, j, c, n);
  var p = A && A === this.ownerID, Q = Ee(j, n, m, p);
  return p ? (this.count = c, this.nodes = Q, this) : new k7(A, c, Q);
}, "update");
var CA = P(function(A, $, k) {
  this.ownerID = A, this.keyHash = $, this.entries = k;
}, "HashCollisionNode");
CA.prototype.get = P(function(A, $, k, e) {
  for (var t = this.entries, E = 0, r = t.length; E < r; E++)
    if (OB(k, t[E][0]))
      return t[E][1];
  return e;
}, "get");
CA.prototype.update = P(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB(e));
  var n = t === tB;
  if (k !== this.keyHash)
    return n ? this : (VB(r), VB(E), b$(this, A, $, k, [e, t]));
  for (var i = this.entries, j = 0, o = i.length; j < o && !OB(e, i[j][0]); j++)
    ;
  var m = j < o;
  if (m ? i[j][1] === t : n)
    return this;
  if (VB(r), (n || !m) && VB(E), n && o === 2)
    return new sA(A, this.keyHash, i[j ^ 1]);
  var c = A && A === this.ownerID, p = c ? i : rA(i);
  return m ? n ? j === o - 1 ? p.pop() : p[j] = p.pop() : p[j] = [e, t] : p.push([e, t]), c ? (this.entries = p, this) : new CA(A, this.keyHash, p);
}, "update");
var sA = P(function(A, $, k) {
  this.ownerID = A, this.keyHash = $, this.entry = k;
}, "ValueNode");
sA.prototype.get = P(function(A, $, k, e) {
  return OB(k, this.entry[0]) ? this.entry[1] : e;
}, "get");
sA.prototype.update = P(function(A, $, k, e, t, E, r) {
  var n = t === tB, i = OB(e, this.entry[0]);
  if (i ? t === this.entry[1] : n)
    return this;
  if (VB(r), n) {
    VB(E);
    return;
  }
  return i ? A && A === this.ownerID ? (this.entry[1] = t, this) : new sA(A, this.keyHash, [e, t]) : (VB(E), b$(this, A, $, NB(e), [e, t]));
}, "update");
$7.prototype.iterate = CA.prototype.iterate = function(B, A) {
  for (var $ = this.entries, k = 0, e = $.length - 1; k <= e; k++)
    if (B($[A ? e - k : k]) === false)
      return false;
};
wA.prototype.iterate = k7.prototype.iterate = function(B, A) {
  for (var $ = this.nodes, k = 0, e = $.length - 1; k <= e; k++) {
    var t = $[A ? e - k : k];
    if (t && t.iterate(B, A) === false)
      return false;
  }
};
sA.prototype.iterate = function(B, A) {
  return B(this.entry);
};
var KP = function(B) {
  function A($, k, e) {
    this._type = k, this._reverse = e, this._stack = $._root && ak($._root);
  }
  return P(A, "MapIterator"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.next = P(function() {
    for (var k = this._type, e = this._stack; e; ) {
      var t = e.node, E = e.index++, r = void 0;
      if (t.entry) {
        if (E === 0)
          return V7(k, t.entry);
      } else if (t.entries) {
        if (r = t.entries.length - 1, E <= r)
          return V7(k, t.entries[this._reverse ? r - E : E]);
      } else if (r = t.nodes.length - 1, E <= r) {
        var n = t.nodes[this._reverse ? r - E : E];
        if (n) {
          if (n.entry)
            return V7(k, n.entry);
          e = this._stack = ak(n, e);
        }
        continue;
      }
      e = this._stack = this._stack.__prev;
    }
    return UB();
  }, "next"), A;
}(nB);
function V7(B, A) {
  return hB(B, A[0], A[1]);
}
P(V7, "mapIteratorValue");
function ak(B, A) {
  return { node: B, index: 0, __prev: A };
}
P(ak, "mapIteratorFrame");
function S$(B, A, $, k) {
  var e = Object.create(uB);
  return e.size = B, e._root = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P(S$, "makeMap");
var sk;
function $A() {
  return sk || (sk = S$(0));
}
P($A, "emptyMap");
function ok(B, A, $) {
  var k, e;
  if (B._root) {
    var t = z7(), E = z7();
    if (k = H$(B._root, B.__ownerID, 0, void 0, A, $, t, E), !E.value)
      return B;
    e = B.size + (t.value ? $ === tB ? -1 : 1 : 0);
  } else {
    if ($ === tB)
      return B;
    e = 1, k = new $7(B.__ownerID, [[A, $]]);
  }
  return B.__ownerID ? (B.size = e, B._root = k, B.__hash = void 0, B.__altered = true, B) : k ? S$(e, k) : $A();
}
P(ok, "updateMap");
function H$(B, A, $, k, e, t, E, r) {
  return B ? B.update(A, $, k, e, t, E, r) : t === tB ? B : (VB(r), VB(E), new sA(A, k, [e, t]));
}
P(H$, "updateNode");
function lk(B) {
  return B.constructor === sA || B.constructor === CA;
}
P(lk, "isLeafNode");
function b$(B, A, $, k, e) {
  if (B.keyHash === k)
    return new CA(A, k, [B.entry, e]);
  var t = ($ === 0 ? B.keyHash : B.keyHash >>> $) & CB, E = ($ === 0 ? k : k >>> $) & CB, r, n = t === E ? [b$(B, A, $ + pB, k, e)] : (r = new sA(A, k, e), t < E ? [B, r] : [r, B]);
  return new wA(A, 1 << t | 1 << E, n);
}
P(b$, "mergeIntoNode");
function VP(B, A, $, k) {
  B || (B = new t$());
  for (var e = new sA(B, NB($), [$, k]), t = 0; t < A.length; t++) {
    var E = A[t];
    e = e.update(B, 0, void 0, E[0], E[1]);
  }
  return e;
}
P(VP, "createNodes");
function JP(B, A, $, k) {
  for (var e = 0, t = 0, E = new Array($), r = 0, n = 1, i = A.length; r < i; r++, n <<= 1) {
    var j = A[r];
    j !== void 0 && r !== k && (e |= n, E[t++] = j);
  }
  return new wA(B, e, E);
}
P(JP, "packNodes");
function zP(B, A, $, k, e) {
  for (var t = 0, E = new Array(KB), r = 0; $ !== 0; r++, $ >>>= 1)
    E[r] = $ & 1 ? A[t++] : void 0;
  return E[k] = e, new k7(B, t + 1, E);
}
P(zP, "expandNodes");
function te(B) {
  return B -= B >> 1 & 1431655765, B = (B & 858993459) + (B >> 2 & 858993459), B = B + (B >> 4) & 252645135, B += B >> 8, B += B >> 16, B & 127;
}
P(te, "popCount");
function Ee(B, A, $, k) {
  var e = k ? B : rA(B);
  return e[A] = $, e;
}
P(Ee, "setAt");
function YP(B, A, $, k) {
  var e = B.length + 1;
  if (k && A + 1 === e)
    return B[A] = $, B;
  for (var t = new Array(e), E = 0, r = 0; r < e; r++)
    r === A ? (t[r] = $, E = -1) : t[r] = B[r + E];
  return t;
}
P(YP, "spliceIn");
function ZP(B, A, $) {
  var k = B.length - 1;
  if ($ && A === k)
    return B.pop(), B;
  for (var e = new Array(k), t = 0, E = 0; E < k; E++)
    E === A && (t = 1), e[E] = B[E + t];
  return e;
}
P(ZP, "spliceOut");
var Bt = KB / 4;
var At = KB / 2;
var $t = KB / 4;
var re = "@@__IMMUTABLE_LIST__@@";
function ne(B) {
  return Boolean(B && B[re]);
}
P(ne, "isList");
var _7 = function(B) {
  function A($) {
    var k = f7();
    if ($ == null)
      return k;
    if (ne($))
      return $;
    var e = B($), t = e.size;
    return t === 0 ? k : (JB(t), t > 0 && t < KB ? e7(0, t, pB, null, new pA(e.toArray())) : k.withMutations(function(E) {
      E.setSize(t), e.forEach(function(r, n) {
        return E.set(n, r);
      });
    }));
  }
  return P(A, "List"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P(function() {
    return this.__toString("List [", "]");
  }, "toString"), A.prototype.get = P(function(k, e) {
    if (k = uA(this, k), k >= 0 && k < this.size) {
      k += this._origin;
      var t = ie(this, k);
      return t && t.array[k & CB];
    }
    return e;
  }, "get"), A.prototype.set = P(function(k, e) {
    return kt(this, k, e);
  }, "set"), A.prototype.remove = P(function(k) {
    return this.has(k) ? k === 0 ? this.shift() : k === this.size - 1 ? this.pop() : this.splice(k, 1) : this;
  }, "remove"), A.prototype.insert = P(function(k, e) {
    return this.splice(k, 0, e);
  }, "insert"), A.prototype.clear = P(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = pB, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : f7();
  }, "clear"), A.prototype.push = P(function() {
    var k = arguments, e = this.size;
    return this.withMutations(function(t) {
      jA(t, 0, e + k.length);
      for (var E = 0; E < k.length; E++)
        t.set(e + E, k[E]);
    });
  }, "push"), A.prototype.pop = P(function() {
    return jA(this, 0, -1);
  }, "pop"), A.prototype.unshift = P(function() {
    var k = arguments;
    return this.withMutations(function(e) {
      jA(e, -k.length);
      for (var t = 0; t < k.length; t++)
        e.set(t, k[t]);
    });
  }, "unshift"), A.prototype.shift = P(function() {
    return jA(this, 1);
  }, "shift"), A.prototype.concat = P(function() {
    for (var k = arguments, e = [], t = 0; t < arguments.length; t++) {
      var E = k[t], r = B(typeof E != "string" && _k(E) ? E : [E]);
      r.size !== 0 && e.push(r);
    }
    return e.length === 0 ? this : this.size === 0 && !this.__ownerID && e.length === 1 ? this.constructor(e[0]) : this.withMutations(function(n) {
      e.forEach(function(i) {
        return i.forEach(function(j) {
          return n.push(j);
        });
      });
    });
  }, "concat"), A.prototype.setSize = P(function(k) {
    return jA(this, 0, k);
  }, "setSize"), A.prototype.map = P(function(k, e) {
    var t = this;
    return this.withMutations(function(E) {
      for (var r = 0; r < t.size; r++)
        E.set(r, k.call(e, E.get(r), r, t));
    });
  }, "map"), A.prototype.slice = P(function(k, e) {
    var t = this.size;
    return b7(k, e, t) ? this : jA(this, r7(k, t), x7(e, t));
  }, "slice"), A.prototype.__iterator = P(function(k, e) {
    var t = e ? this.size : 0, E = jk(this, e);
    return new nB(function() {
      var r = E();
      return r === B7 ? UB() : hB(k, e ? --t : t++, r);
    });
  }, "__iterator"), A.prototype.__iterate = P(function(k, e) {
    for (var t = e ? this.size : 0, E = jk(this, e), r; (r = E()) !== B7 && k(r, e ? --t : t++, this) !== false; )
      ;
    return t;
  }, "__iterate"), A.prototype.__ensureOwner = P(function(k) {
    return k === this.__ownerID ? this : k ? e7(this._origin, this._capacity, this._level, this._root, this._tail, k, this.__hash) : this.size === 0 ? f7() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A;
}(XA);
_7.isList = ne;
var TB = _7.prototype;
TB[re] = true;
TB[E7] = TB.remove;
TB.merge = TB.concat;
TB.setIn = c$;
TB.deleteIn = TB.removeIn = h$;
TB.update = m$;
TB.updateIn = Q$;
TB.mergeIn = T$;
TB.mergeDeepIn = X$;
TB.withMutations = i7;
TB.wasAltered = f$;
TB.asImmutable = s7;
TB["@@transducer/init"] = TB.asMutable = a7;
TB["@@transducer/step"] = function(B, A) {
  return B.push(A);
};
TB["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
var pA = P(function(A, $) {
  this.array = A, this.ownerID = $;
}, "VNode");
pA.prototype.removeBefore = P(function(A, $, k) {
  if (k === $ ? 1 << $ : this.array.length === 0)
    return this;
  var e = k >>> $ & CB;
  if (e >= this.array.length)
    return new pA([], A);
  var t = e === 0, E;
  if ($ > 0) {
    var r = this.array[e];
    if (E = r && r.removeBefore(A, $ - pB, k), E === r && t)
      return this;
  }
  if (t && !E)
    return this;
  var n = _A(this, A);
  if (!t)
    for (var i = 0; i < e; i++)
      n.array[i] = void 0;
  return E && (n.array[e] = E), n;
}, "removeBefore");
pA.prototype.removeAfter = P(function(A, $, k) {
  if (k === ($ ? 1 << $ : 0) || this.array.length === 0)
    return this;
  var e = k - 1 >>> $ & CB;
  if (e >= this.array.length)
    return this;
  var t;
  if ($ > 0) {
    var E = this.array[e];
    if (t = E && E.removeAfter(A, $ - pB, k), t === E && e === this.array.length - 1)
      return this;
  }
  var r = _A(this, A);
  return r.array.splice(e + 1), t && (r.array[e] = t), r;
}, "removeAfter");
var B7 = {};
function jk(B, A) {
  var $ = B._origin, k = B._capacity, e = P7(k), t = B._tail;
  return E(B._root, B._level, 0);
  function E(i, j, o) {
    return j === 0 ? r(i, o) : n(i, j, o);
  }
  function r(i, j) {
    var o = j === e ? t && t.array : i && i.array, m = j > $ ? 0 : $ - j, c = k - j;
    return c > KB && (c = KB), function() {
      if (m === c)
        return B7;
      var p = A ? --c : m++;
      return o && o[p];
    };
  }
  function n(i, j, o) {
    var m, c = i && i.array, p = o > $ ? 0 : $ - o >> j, Q = (k - o >> j) + 1;
    return Q > KB && (Q = KB), function() {
      for (; ; ) {
        if (m) {
          var f = m();
          if (f !== B7)
            return f;
          m = null;
        }
        if (p === Q)
          return B7;
        var Y = A ? --Q : p++;
        m = E(c && c[Y], j - pB, o + (Y << j));
      }
    };
  }
}
P(jk, "iterateList");
function e7(B, A, $, k, e, t, E) {
  var r = Object.create(TB);
  return r.size = A - B, r._origin = B, r._capacity = A, r._level = $, r._root = k, r._tail = e, r.__ownerID = t, r.__hash = E, r.__altered = false, r;
}
P(e7, "makeList");
var pk;
function f7() {
  return pk || (pk = e7(0, 0, pB));
}
P(f7, "emptyList");
function kt(B, A, $) {
  if (A = uA(B, A), A !== A)
    return B;
  if (A >= B.size || A < 0)
    return B.withMutations(function(E) {
      A < 0 ? jA(E, A).set(0, $) : jA(E, 0, A + 1).set(A, $);
    });
  A += B._origin;
  var k = B._tail, e = B._root, t = z7();
  return A >= P7(B._capacity) ? k = k$(k, B.__ownerID, 0, A, $, t) : e = k$(e, B.__ownerID, B._level, A, $, t), t.value ? B.__ownerID ? (B._root = e, B._tail = k, B.__hash = void 0, B.__altered = true, B) : e7(B._origin, B._capacity, B._level, e, k) : B;
}
P(kt, "updateList");
function k$(B, A, $, k, e, t) {
  var E = k >>> $ & CB, r = B && E < B.array.length;
  if (!r && e === void 0)
    return B;
  var n;
  if ($ > 0) {
    var i = B && B.array[E], j = k$(i, A, $ - pB, k, e, t);
    return j === i ? B : (n = _A(B, A), n.array[E] = j, n);
  }
  return r && B.array[E] === e ? B : (t && VB(t), n = _A(B, A), e === void 0 && E === n.array.length - 1 ? n.array.pop() : n.array[E] = e, n);
}
P(k$, "updateVNode");
function _A(B, A) {
  return A && B && A === B.ownerID ? B : new pA(B ? B.array.slice() : [], A);
}
P(_A, "editableVNode");
function ie(B, A) {
  if (A >= P7(B._capacity))
    return B._tail;
  if (A < 1 << B._level + pB) {
    for (var $ = B._root, k = B._level; $ && k > 0; )
      $ = $.array[A >>> k & CB], k -= pB;
    return $;
  }
}
P(ie, "listNodeFor");
function jA(B, A, $) {
  A !== void 0 && (A |= 0), $ !== void 0 && ($ |= 0);
  var k = B.__ownerID || new t$(), e = B._origin, t = B._capacity, E = e + A, r = $ === void 0 ? t : $ < 0 ? t + $ : e + $;
  if (E === e && r === t)
    return B;
  if (E >= r)
    return B.clear();
  for (var n = B._level, i = B._root, j = 0; E + j < 0; )
    i = new pA(i && i.array.length ? [void 0, i] : [], k), n += pB, j += 1 << n;
  j && (E += j, e += j, r += j, t += j);
  for (var o = P7(t), m = P7(r); m >= 1 << n + pB; )
    i = new pA(i && i.array.length ? [i] : [], k), n += pB;
  var c = B._tail, p = m < o ? ie(B, r - 1) : m > o ? new pA([], k) : c;
  if (c && m > o && E < t && c.array.length) {
    i = _A(i, k);
    for (var Q = i, f = n; f > pB; f -= pB) {
      var Y = o >>> f & CB;
      Q = Q.array[Y] = _A(Q.array[Y], k);
    }
    Q.array[o >>> pB & CB] = c;
  }
  if (r < t && (p = p && p.removeAfter(k, 0, r)), E >= m)
    E -= m, r -= m, n = pB, i = null, p = p && p.removeBefore(k, 0, E);
  else if (E > e || m < o) {
    for (j = 0; i; ) {
      var K = E >>> n & CB;
      if (K !== m >>> n & CB)
        break;
      K && (j += (1 << n) * K), n -= pB, i = i.array[K];
    }
    i && E > e && (i = i.removeBefore(k, n, E - j)), i && m < o && (i = i.removeAfter(k, n, m - j)), j && (E -= j, r -= j);
  }
  return B.__ownerID ? (B.size = r - E, B._origin = E, B._capacity = r, B._level = n, B._root = i, B._tail = p, B.__hash = void 0, B.__altered = true, B) : e7(E, r, n, i, p);
}
P(jA, "setListBounds");
function P7(B) {
  return B < KB ? 0 : B - 1 >>> pB << pB;
}
P(P7, "getTailOffset");
var oA = function(B) {
  function A($) {
    return $ == null ? zA() : Fk($) ? $ : zA().withMutations(function(k) {
      var e = YB($);
      JB(e.size), e.forEach(function(t, E) {
        return k.set(E, t);
      });
    });
  }
  return P(A, "OrderedMap"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), A.prototype.get = P(function(k, e) {
    var t = this._map.get(k);
    return t !== void 0 ? this._list.get(t)[1] : e;
  }, "get"), A.prototype.clear = P(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : zA();
  }, "clear"), A.prototype.set = P(function(k, e) {
    return ck(this, k, e);
  }, "set"), A.prototype.remove = P(function(k) {
    return ck(this, k, tB);
  }, "remove"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    return this._list.__iterate(function(E) {
      return E && k(E[1], E[0], t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    return this._list.fromEntrySeq().__iterator(k, e);
  }, "__iterator"), A.prototype.__ensureOwner = P(function(k) {
    if (k === this.__ownerID)
      return this;
    var e = this._map.__ensureOwner(k), t = this._list.__ensureOwner(k);
    return k ? x$(e, t, k, this.__hash) : this.size === 0 ? zA() : (this.__ownerID = k, this.__altered = false, this._map = e, this._list = t, this);
  }, "__ensureOwner"), A;
}(OA);
oA.isOrderedMap = Fk;
oA.prototype[UA] = true;
oA.prototype[E7] = oA.prototype.remove;
function x$(B, A, $, k) {
  var e = Object.create(oA.prototype);
  return e.size = B ? B.size : 0, e._map = B, e._list = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P(x$, "makeOrderedMap");
var uk;
function zA() {
  return uk || (uk = x$($A(), f7()));
}
P(zA, "emptyOrderedMap");
function ck(B, A, $) {
  var k = B._map, e = B._list, t = k.get(A), E = t !== void 0, r, n;
  if ($ === tB) {
    if (!E)
      return B;
    e.size >= KB && e.size >= k.size * 2 ? (n = e.filter(function(i, j) {
      return i !== void 0 && t !== j;
    }), r = n.toKeyedSeq().map(function(i) {
      return i[0];
    }).flip().toMap(), B.__ownerID && (r.__ownerID = n.__ownerID = B.__ownerID)) : (r = k.remove(A), n = t === e.size - 1 ? e.pop() : e.set(t, void 0));
  } else if (E) {
    if ($ === e.get(t)[1])
      return B;
    r = k, n = e.set(t, [A, $]);
  } else
    r = k.set(A, e.size), n = e.set(e.size, [A, $]);
  return B.__ownerID ? (B.size = r.size, B._map = r, B._list = n, B.__hash = void 0, B.__altered = true, B) : x$(r, n);
}
P(ck, "updateOrderedMap");
var ae = "@@__IMMUTABLE_STACK__@@";
function e$(B) {
  return Boolean(B && B[ae]);
}
P(e$, "isStack");
var v$ = function(B) {
  function A($) {
    return $ == null ? g7() : e$($) ? $ : g7().pushAll($);
  }
  return P(A, "Stack"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), A.prototype.get = P(function(k, e) {
    var t = this._head;
    for (k = uA(this, k); t && k--; )
      t = t.next;
    return t ? t.value : e;
  }, "get"), A.prototype.peek = P(function() {
    return this._head && this._head.value;
  }, "peek"), A.prototype.push = P(function() {
    var k = arguments;
    if (arguments.length === 0)
      return this;
    for (var e = this.size + arguments.length, t = this._head, E = arguments.length - 1; E >= 0; E--)
      t = { value: k[E], next: t };
    return this.__ownerID ? (this.size = e, this._head = t, this.__hash = void 0, this.__altered = true, this) : YA(e, t);
  }, "push"), A.prototype.pushAll = P(function(k) {
    if (k = B(k), k.size === 0)
      return this;
    if (this.size === 0 && e$(k))
      return k;
    JB(k.size);
    var e = this.size, t = this._head;
    return k.__iterate(function(E) {
      e++, t = { value: E, next: t };
    }, true), this.__ownerID ? (this.size = e, this._head = t, this.__hash = void 0, this.__altered = true, this) : YA(e, t);
  }, "pushAll"), A.prototype.pop = P(function() {
    return this.slice(1);
  }, "pop"), A.prototype.clear = P(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : g7();
  }, "clear"), A.prototype.slice = P(function(k, e) {
    if (b7(k, e, this.size))
      return this;
    var t = r7(k, this.size), E = x7(e, this.size);
    if (E !== this.size)
      return B.prototype.slice.call(this, k, e);
    for (var r = this.size - t, n = this._head; t--; )
      n = n.next;
    return this.__ownerID ? (this.size = r, this._head = n, this.__hash = void 0, this.__altered = true, this) : YA(r, n);
  }, "slice"), A.prototype.__ensureOwner = P(function(k) {
    return k === this.__ownerID ? this : k ? YA(this.size, this._head, k, this.__hash) : this.size === 0 ? g7() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    if (e)
      return new TA(this.toArray()).__iterate(function(n, i) {
        return k(n, i, t);
      }, e);
    for (var E = 0, r = this._head; r && k(r.value, E++, this) !== false; )
      r = r.next;
    return E;
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    if (e)
      return new TA(this.toArray()).__iterator(k, e);
    var t = 0, E = this._head;
    return new nB(function() {
      if (E) {
        var r = E.value;
        return E = E.next, hB(k, t++, r);
      }
      return UB();
    });
  }, "__iterator"), A;
}(XA);
v$.isStack = e$;
var _B = v$.prototype;
_B[ae] = true;
_B.shift = _B.pop;
_B.unshift = _B.push;
_B.unshiftAll = _B.pushAll;
_B.withMutations = i7;
_B.wasAltered = f$;
_B.asImmutable = s7;
_B["@@transducer/init"] = _B.asMutable = a7;
_B["@@transducer/step"] = function(B, A) {
  return B.unshift(A);
};
_B["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
function YA(B, A, $, k) {
  var e = Object.create(_B);
  return e.size = B, e._head = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P(YA, "makeStack");
var hk;
function g7() {
  return hk || (hk = YA(0));
}
P(g7, "emptyStack");
var se = "@@__IMMUTABLE_SET__@@";
function M$(B) {
  return Boolean(B && B[se]);
}
P(M$, "isSet");
function oe(B) {
  return M$(B) && kA(B);
}
P(oe, "isOrderedSet");
function le(B, A) {
  if (B === A)
    return true;
  if (!FB(A) || B.size !== void 0 && A.size !== void 0 && B.size !== A.size || B.__hash !== void 0 && A.__hash !== void 0 && B.__hash !== A.__hash || cB(B) !== cB(A) || IB(B) !== IB(A) || kA(B) !== kA(A))
    return false;
  if (B.size === 0 && A.size === 0)
    return true;
  var $ = !v7(B);
  if (kA(B)) {
    var k = B.entries();
    return A.every(function(n, i) {
      var j = k.next().value;
      return j && OB(j[1], n) && ($ || OB(j[0], i));
    }) && k.next().done;
  }
  var e = false;
  if (B.size === void 0)
    if (A.size === void 0)
      typeof B.cacheResult == "function" && B.cacheResult();
    else {
      e = true;
      var t = B;
      B = A, A = t;
    }
  var E = true, r = A.__iterate(function(n, i) {
    if ($ ? !B.has(n) : e ? !OB(n, B.get(i, tB)) : !OB(B.get(i, tB), n))
      return E = false, false;
  });
  return E && B.size === r;
}
P(le, "deepEqual");
function fA(B, A) {
  var $ = P(function(k) {
    B.prototype[k] = A[k];
  }, "keyCopier");
  return Object.keys(A).forEach($), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(A).forEach($), B;
}
P(fA, "mixin");
function H7(B) {
  if (!B || typeof B != "object")
    return B;
  if (!FB(B)) {
    if (!cA(B))
      return B;
    B = GB(B);
  }
  if (cB(B)) {
    var A = {};
    return B.__iterate(function(k, e) {
      A[e] = H7(k);
    }), A;
  }
  var $ = [];
  return B.__iterate(function(k) {
    $.push(H7(k));
  }), $;
}
P(H7, "toJS");
var R7 = function(B) {
  function A($) {
    return $ == null ? ZA() : M$($) && !kA($) ? $ : ZA().withMutations(function(k) {
      var e = B($);
      JB(e.size), e.forEach(function(t) {
        return k.add(t);
      });
    });
  }
  return P(A, "Set"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return this(arguments);
  }, "of"), A.fromKeys = P(function(k) {
    return this(YB(k).keySeq());
  }, "fromKeys"), A.intersect = P(function(k) {
    return k = gB(k).toArray(), k.length ? xB.intersect.apply(A(k.pop()), k) : ZA();
  }, "intersect"), A.union = P(function(k) {
    return k = gB(k).toArray(), k.length ? xB.union.apply(A(k.pop()), k) : ZA();
  }, "union"), A.prototype.toString = P(function() {
    return this.__toString("Set {", "}");
  }, "toString"), A.prototype.has = P(function(k) {
    return this._map.has(k);
  }, "has"), A.prototype.add = P(function(k) {
    return T7(this, this._map.set(k, k));
  }, "add"), A.prototype.remove = P(function(k) {
    return T7(this, this._map.remove(k));
  }, "remove"), A.prototype.clear = P(function() {
    return T7(this, this._map.clear());
  }, "clear"), A.prototype.map = P(function(k, e) {
    var t = this, E = false, r = T7(this, this._map.mapEntries(function(n) {
      var i = n[1], j = k.call(e, i, i, t);
      return j !== i && (E = true), [j, j];
    }, e));
    return E ? r : this;
  }, "map"), A.prototype.union = P(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    return k = k.filter(function(t) {
      return t.size !== 0;
    }), k.length === 0 ? this : this.size === 0 && !this.__ownerID && k.length === 1 ? this.constructor(k[0]) : this.withMutations(function(t) {
      for (var E = 0; E < k.length; E++)
        typeof k[E] == "string" ? t.add(k[E]) : B(k[E]).forEach(function(r) {
          return t.add(r);
        });
    });
  }, "union"), A.prototype.intersect = P(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    if (k.length === 0)
      return this;
    k = k.map(function(E) {
      return B(E);
    });
    var t = [];
    return this.forEach(function(E) {
      k.every(function(r) {
        return r.includes(E);
      }) || t.push(E);
    }), this.withMutations(function(E) {
      t.forEach(function(r) {
        E.remove(r);
      });
    });
  }, "intersect"), A.prototype.subtract = P(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    if (k.length === 0)
      return this;
    k = k.map(function(E) {
      return B(E);
    });
    var t = [];
    return this.forEach(function(E) {
      k.some(function(r) {
        return r.includes(E);
      }) && t.push(E);
    }), this.withMutations(function(E) {
      t.forEach(function(r) {
        E.remove(r);
      });
    });
  }, "subtract"), A.prototype.sort = P(function(k) {
    return t7(yA(this, k));
  }, "sort"), A.prototype.sortBy = P(function(k, e) {
    return t7(yA(this, e, k));
  }, "sortBy"), A.prototype.wasAltered = P(function() {
    return this._map.wasAltered();
  }, "wasAltered"), A.prototype.__iterate = P(function(k, e) {
    var t = this;
    return this._map.__iterate(function(E) {
      return k(E, E, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    return this._map.__iterator(k, e);
  }, "__iterator"), A.prototype.__ensureOwner = P(function(k) {
    if (k === this.__ownerID)
      return this;
    var e = this._map.__ensureOwner(k);
    return k ? this.__make(e, k) : this.size === 0 ? this.__empty() : (this.__ownerID = k, this._map = e, this);
  }, "__ensureOwner"), A;
}(IA);
R7.isSet = M$;
var xB = R7.prototype;
xB[se] = true;
xB[E7] = xB.remove;
xB.merge = xB.concat = xB.union;
xB.withMutations = i7;
xB.asImmutable = s7;
xB["@@transducer/init"] = xB.asMutable = a7;
xB["@@transducer/step"] = function(B, A) {
  return B.add(A);
};
xB["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
xB.__empty = ZA;
xB.__make = je;
function T7(B, A) {
  return B.__ownerID ? (B.size = A.size, B._map = A, B) : A === B._map ? B : A.size === 0 ? B.__empty() : B.__make(A);
}
P(T7, "updateSet");
function je(B, A) {
  var $ = Object.create(xB);
  return $.size = B ? B.size : 0, $._map = B, $.__ownerID = A, $;
}
P(je, "makeSet");
var mk;
function ZA() {
  return mk || (mk = je($A()));
}
P(ZA, "emptySet");
var et = function(B) {
  function A($, k, e) {
    if (!(this instanceof A))
      return new A($, k, e);
    if (u$(e !== 0, "Cannot step a Range by 0"), $ = $ || 0, k === void 0 && (k = 1 / 0), e = e === void 0 ? 1 : Math.abs(e), k < $ && (e = -e), this._start = $, this._end = k, this._step = e, this.size = Math.max(0, Math.ceil((k - $) / e - 1) + 1), this.size === 0) {
      if (J7)
        return J7;
      J7 = this;
    }
  }
  return P(A, "Range"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toString = P(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), A.prototype.get = P(function(k, e) {
    return this.has(k) ? this._start + uA(this, k) * this._step : e;
  }, "get"), A.prototype.includes = P(function(k) {
    var e = (k - this._start) / this._step;
    return e >= 0 && e < this.size && e === Math.floor(e);
  }, "includes"), A.prototype.slice = P(function(k, e) {
    return b7(k, e, this.size) ? this : (k = r7(k, this.size), e = x7(e, this.size), e <= k ? new A(0, 0) : new A(this.get(k, this._end), this.get(e, this._end), this._step));
  }, "slice"), A.prototype.indexOf = P(function(k) {
    var e = k - this._start;
    if (e % this._step === 0) {
      var t = e / this._step;
      if (t >= 0 && t < this.size)
        return t;
    }
    return -1;
  }, "indexOf"), A.prototype.lastIndexOf = P(function(k) {
    return this.indexOf(k);
  }, "lastIndexOf"), A.prototype.__iterate = P(function(k, e) {
    for (var t = this.size, E = this._step, r = e ? this._start + (t - 1) * E : this._start, n = 0; n !== t && k(r, e ? t - ++n : n++, this) !== false; )
      r += e ? -E : E;
    return n;
  }, "__iterate"), A.prototype.__iterator = P(function(k, e) {
    var t = this.size, E = this._step, r = e ? this._start + (t - 1) * E : this._start, n = 0;
    return new nB(function() {
      if (n === t)
        return UB();
      var i = r;
      return r += e ? -E : E, hB(k, e ? t - ++n : n++, i);
    });
  }, "__iterator"), A.prototype.equals = P(function(k) {
    return k instanceof A ? this._start === k._start && this._end === k._end && this._step === k._step : le(this, k);
  }, "equals"), A;
}(PA);
var J7;
function pe(B, A, $) {
  for (var k = zk(A), e = 0; e !== k.length; )
    if (B = Yk(B, k[e++], tB), B === tB)
      return $;
  return B;
}
P(pe, "getIn$1");
function ue(B, A) {
  return pe(this, B, A);
}
P(ue, "getIn");
function Pt(B, A) {
  return pe(B, A, tB) !== tB;
}
P(Pt, "hasIn$1");
function tt(B) {
  return Pt(this, B);
}
P(tt, "hasIn");
function ce() {
  JB(this.size);
  var B = {};
  return this.__iterate(function(A, $) {
    B[$] = A;
  }), B;
}
P(ce, "toObject");
gB.isIterable = FB;
gB.isKeyed = cB;
gB.isIndexed = IB;
gB.isAssociative = v7;
gB.isOrdered = kA;
gB.Iterator = nB;
fA(gB, { toArray: P(function() {
  JB(this.size);
  var A = new Array(this.size || 0), $ = cB(this), k = 0;
  return this.__iterate(function(e, t) {
    A[k++] = $ ? [t, e] : e;
  }), A;
}, "toArray"), toIndexedSeq: P(function() {
  return new Lk(this);
}, "toIndexedSeq"), toJS: P(function() {
  return H7(this);
}, "toJS$1"), toKeyedSeq: P(function() {
  return new C7(this, true);
}, "toKeyedSeq"), toMap: P(function() {
  return OA(this.toKeyedSeq());
}, "toMap"), toObject: ce, toOrderedMap: P(function() {
  return oA(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: P(function() {
  return t7(cB(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: P(function() {
  return R7(cB(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: P(function() {
  return new Wk(this);
}, "toSetSeq"), toSeq: P(function() {
  return IB(this) ? this.toIndexedSeq() : cB(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: P(function() {
  return v$(cB(this) ? this.valueSeq() : this);
}, "toStack"), toList: P(function() {
  return _7(cB(this) ? this.valueSeq() : this);
}, "toList"), toString: P(function() {
  return "[Collection]";
}, "toString"), __toString: P(function(A, $) {
  return this.size === 0 ? A + $ : A + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + $;
}, "__toString"), concat: P(function() {
  for (var A = [], $ = arguments.length; $--; )
    A[$] = arguments[$];
  return oB(this, _P(this, A));
}, "concat"), includes: P(function(A) {
  return this.some(function($) {
    return OB($, A);
  });
}, "includes"), entries: P(function() {
  return this.__iterator(zB);
}, "entries"), every: P(function(A, $) {
  JB(this.size);
  var k = true;
  return this.__iterate(function(e, t, E) {
    if (!A.call($, e, t, E))
      return k = false, false;
  }), k;
}, "every"), filter: P(function(A, $) {
  return oB(this, qk(this, A, $, true));
}, "filter"), partition: P(function(A, $) {
  return wP(this, A, $);
}, "partition"), find: P(function(A, $, k) {
  var e = this.findEntry(A, $);
  return e ? e[1] : k;
}, "find"), forEach: P(function(A, $) {
  return JB(this.size), this.__iterate($ ? A.bind($) : A);
}, "forEach"), join: P(function(A) {
  JB(this.size), A = A !== void 0 ? "" + A : ",";
  var $ = "", k = true;
  return this.__iterate(function(e) {
    k ? k = false : $ += A, $ += e != null ? e.toString() : "";
  }), $;
}, "join"), keys: P(function() {
  return this.__iterator(n7);
}, "keys"), map: P(function(A, $) {
  return oB(this, Gk(this, A, $));
}, "map"), reduce: P(function(A, $, k) {
  return Qk(this, A, $, k, arguments.length < 2, false);
}, "reduce$1"), reduceRight: P(function(A, $, k) {
  return Qk(this, A, $, k, arguments.length < 2, true);
}, "reduceRight"), reverse: P(function() {
  return oB(this, o$(this, true));
}, "reverse"), slice: P(function(A, $) {
  return oB(this, l$(this, A, $, true));
}, "slice"), some: P(function(A, $) {
  return !this.every(X7(A), $);
}, "some"), sort: P(function(A) {
  return oB(this, yA(this, A));
}, "sort"), values: P(function() {
  return this.__iterator(eA);
}, "values"), butLast: P(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: P(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: P(function(A, $) {
  return MA(A ? this.toSeq().filter(A, $) : this);
}, "count"), countBy: P(function(A, $) {
  return MP(this, A, $);
}, "countBy"), equals: P(function(A) {
  return le(this, A);
}, "equals"), entrySeq: P(function() {
  var A = this;
  if (A._cache)
    return new TA(A._cache);
  var $ = A.toSeq().map(rt).toIndexedSeq();
  return $.fromEntrySeq = function() {
    return A.toSeq();
  }, $;
}, "entrySeq"), filterNot: P(function(A, $) {
  return this.filter(X7(A), $);
}, "filterNot"), findEntry: P(function(A, $, k) {
  var e = k;
  return this.__iterate(function(t, E, r) {
    if (A.call($, t, E, r))
      return e = [E, t], false;
  }), e;
}, "findEntry"), findKey: P(function(A, $) {
  var k = this.findEntry(A, $);
  return k && k[0];
}, "findKey"), findLast: P(function(A, $, k) {
  return this.toKeyedSeq().reverse().find(A, $, k);
}, "findLast"), findLastEntry: P(function(A, $, k) {
  return this.toKeyedSeq().reverse().findEntry(A, $, k);
}, "findLastEntry"), findLastKey: P(function(A, $) {
  return this.toKeyedSeq().reverse().findKey(A, $);
}, "findLastKey"), first: P(function(A) {
  return this.find(Sk, null, A);
}, "first"), flatMap: P(function(A, $) {
  return oB(this, RP(this, A, $));
}, "flatMap"), flatten: P(function(A) {
  return oB(this, Vk(this, A, true));
}, "flatten"), fromEntrySeq: P(function() {
  return new Nk(this);
}, "fromEntrySeq"), get: P(function(A, $) {
  return this.find(function(k, e) {
    return OB(e, A);
  }, void 0, $);
}, "get"), getIn: ue, groupBy: P(function(A, $) {
  return yP(this, A, $);
}, "groupBy"), has: P(function(A) {
  return this.get(A, tB) !== tB;
}, "has"), hasIn: tt, isSubset: P(function(A) {
  return A = typeof A.includes == "function" ? A : gB(A), this.every(function($) {
    return A.includes($);
  });
}, "isSubset"), isSuperset: P(function(A) {
  return A = typeof A.isSubset == "function" ? A : gB(A), A.isSubset(this);
}, "isSuperset"), keyOf: P(function(A) {
  return this.findKey(function($) {
    return OB($, A);
  });
}, "keyOf"), keySeq: P(function() {
  return this.toSeq().map(Et).toIndexedSeq();
}, "keySeq"), last: P(function(A) {
  return this.toSeq().reverse().first(A);
}, "last"), lastKeyOf: P(function(A) {
  return this.toKeyedSeq().reverse().keyOf(A);
}, "lastKeyOf"), max: P(function(A) {
  return Q7(this, A);
}, "max"), maxBy: P(function(A, $) {
  return Q7(this, $, A);
}, "maxBy"), min: P(function(A) {
  return Q7(this, A ? dk(A) : Tk);
}, "min"), minBy: P(function(A, $) {
  return Q7(this, $ ? dk($) : Tk, A);
}, "minBy"), rest: P(function() {
  return this.slice(1);
}, "rest"), skip: P(function(A) {
  return A === 0 ? this : this.slice(Math.max(0, A));
}, "skip"), skipLast: P(function(A) {
  return A === 0 ? this : this.slice(0, -Math.max(0, A));
}, "skipLast"), skipWhile: P(function(A, $) {
  return oB(this, Kk(this, A, $, true));
}, "skipWhile"), skipUntil: P(function(A, $) {
  return this.skipWhile(X7(A), $);
}, "skipUntil"), sortBy: P(function(A, $) {
  return oB(this, yA(this, $, A));
}, "sortBy"), take: P(function(A) {
  return this.slice(0, Math.max(0, A));
}, "take"), takeLast: P(function(A) {
  return this.slice(-Math.max(0, A));
}, "takeLast"), takeWhile: P(function(A, $) {
  return oB(this, CP(this, A, $));
}, "takeWhile"), takeUntil: P(function(A, $) {
  return this.takeWhile(X7(A), $);
}, "takeUntil"), update: P(function(A) {
  return A(this);
}, "update"), valueSeq: P(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: P(function() {
  return this.__hash || (this.__hash = nt(this));
}, "hashCode") });
var wB = gB.prototype;
wB[xk] = true;
wB[M7] = wB.values;
wB.toJSON = wB.toArray;
wB.__toStringMapper = A7;
wB.inspect = wB.toSource = function() {
  return this.toString();
};
wB.chain = wB.flatMap;
wB.contains = wB.includes;
fA(YB, { flip: P(function() {
  return oB(this, Ok(this));
}, "flip"), mapEntries: P(function(A, $) {
  var k = this, e = 0;
  return oB(this, this.toSeq().map(function(t, E) {
    return A.call($, [E, t], e++, k);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: P(function(A, $) {
  var k = this;
  return oB(this, this.toSeq().flip().map(function(e, t) {
    return A.call($, e, t, k);
  }).flip());
}, "mapKeys") });
var o7 = YB.prototype;
o7[vk] = true;
o7[M7] = wB.entries;
o7.toJSON = ce;
o7.__toStringMapper = function(B, A) {
  return A7(A) + ": " + A7(B);
};
fA(XA, { toKeyedSeq: P(function() {
  return new C7(this, false);
}, "toKeyedSeq"), filter: P(function(A, $) {
  return oB(this, qk(this, A, $, false));
}, "filter"), findIndex: P(function(A, $) {
  var k = this.findEntry(A, $);
  return k ? k[0] : -1;
}, "findIndex"), indexOf: P(function(A) {
  var $ = this.keyOf(A);
  return $ === void 0 ? -1 : $;
}, "indexOf"), lastIndexOf: P(function(A) {
  var $ = this.lastKeyOf(A);
  return $ === void 0 ? -1 : $;
}, "lastIndexOf"), reverse: P(function() {
  return oB(this, o$(this, false));
}, "reverse"), slice: P(function(A, $) {
  return oB(this, l$(this, A, $, false));
}, "slice"), splice: P(function(A, $) {
  var k = arguments.length;
  if ($ = Math.max($ || 0, 0), k === 0 || k === 2 && !$)
    return this;
  A = r7(A, A < 0 ? this.count() : this.size);
  var e = this.slice(0, A);
  return oB(this, k === 1 ? e : e.concat(rA(arguments, 2), this.slice(A + $)));
}, "splice"), findLastIndex: P(function(A, $) {
  var k = this.findLastEntry(A, $);
  return k ? k[0] : -1;
}, "findLastIndex"), first: P(function(A) {
  return this.get(0, A);
}, "first"), flatten: P(function(A) {
  return oB(this, Vk(this, A, false));
}, "flatten"), get: P(function(A, $) {
  return A = uA(this, A), A < 0 || this.size === 1 / 0 || this.size !== void 0 && A > this.size ? $ : this.find(function(k, e) {
    return e === A;
  }, void 0, $);
}, "get"), has: P(function(A) {
  return A = uA(this, A), A >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || A < this.size : this.indexOf(A) !== -1);
}, "has"), interpose: P(function(A) {
  return oB(this, DP(this, A));
}, "interpose"), interleave: P(function() {
  var A = [this].concat(rA(arguments)), $ = d7(this.toSeq(), PA.of, A), k = $.flatten(true);
  return $.size && (k.size = $.size * A.length), oB(this, k);
}, "interleave"), keySeq: P(function() {
  return et(0, this.size);
}, "keySeq"), last: P(function(A) {
  return this.get(-1, A);
}, "last"), skipWhile: P(function(A, $) {
  return oB(this, Kk(this, A, $, false));
}, "skipWhile"), zip: P(function() {
  var A = [this].concat(rA(arguments));
  return oB(this, d7(this, gk, A));
}, "zip"), zipAll: P(function() {
  var A = [this].concat(rA(arguments));
  return oB(this, d7(this, gk, A, true));
}, "zipAll"), zipWith: P(function(A) {
  var $ = rA(arguments);
  return $[0] = this, oB(this, d7(this, A, $));
}, "zipWith") });
var GA = XA.prototype;
GA[Mk] = true;
GA[UA] = true;
fA(IA, { get: P(function(A, $) {
  return this.has(A) ? A : $;
}, "get"), includes: P(function(A) {
  return this.has(A);
}, "includes"), keySeq: P(function() {
  return this.valueSeq();
}, "keySeq") });
var RA = IA.prototype;
RA.has = wB.includes;
RA.contains = RA.includes;
RA.keys = RA.values;
fA(hA, o7);
fA(PA, GA);
fA(WA, RA);
function Qk(B, A, $, k, e, t) {
  return JB(B.size), B.__iterate(function(E, r, n) {
    e ? (e = false, $ = E) : $ = A.call(k, $, E, r, n);
  }, t), $;
}
P(Qk, "reduce");
function Et(B, A) {
  return A;
}
P(Et, "keyMapper");
function rt(B, A) {
  return [A, B];
}
P(rt, "entryMapper");
function X7(B) {
  return function() {
    return !B.apply(this, arguments);
  };
}
P(X7, "not");
function dk(B) {
  return function() {
    return -B.apply(this, arguments);
  };
}
P(dk, "neg");
function gk() {
  return rA(arguments);
}
P(gk, "defaultZipper");
function Tk(B, A) {
  return B < A ? 1 : B > A ? -1 : 0;
}
P(Tk, "defaultNegComparator");
function nt(B) {
  if (B.size === 1 / 0)
    return 0;
  var A = kA(B), $ = cB(B), k = A ? 1 : 0, e = B.__iterate($ ? A ? function(t, E) {
    k = 31 * k + Xk(NB(t), NB(E)) | 0;
  } : function(t, E) {
    k = k + Xk(NB(t), NB(E)) | 0;
  } : A ? function(t) {
    k = 31 * k + NB(t) | 0;
  } : function(t) {
    k = k + NB(t) | 0;
  });
  return it(e, k);
}
P(nt, "hashCollection");
function it(B, A) {
  return A = JA(A, 3432918353), A = JA(A << 15 | A >>> -15, 461845907), A = JA(A << 13 | A >>> -13, 5), A = (A + 3864292196 | 0) ^ B, A = JA(A ^ A >>> 16, 2246822507), A = JA(A ^ A >>> 13, 3266489909), A = w7(A ^ A >>> 16), A;
}
P(it, "murmurHashOfSize");
function Xk(B, A) {
  return B ^ A + 2654435769 + (B << 6) + (B >> 2) | 0;
}
P(Xk, "hashMerge");
var t7 = function(B) {
  function A($) {
    return $ == null ? P$() : oe($) ? $ : P$().withMutations(function(k) {
      var e = IA($);
      JB(e.size), e.forEach(function(t) {
        return k.add(t);
      });
    });
  }
  return P(A, "OrderedSet"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P(function() {
    return this(arguments);
  }, "of"), A.fromKeys = P(function(k) {
    return this(YB(k).keySeq());
  }, "fromKeys"), A.prototype.toString = P(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), A;
}(R7);
t7.isOrderedSet = oe;
var SA = t7.prototype;
SA[UA] = true;
SA.zip = GA.zip;
SA.zipWith = GA.zipWith;
SA.zipAll = GA.zipAll;
SA.__empty = P$;
SA.__make = he;
function he(B, A) {
  var $ = Object.create(SA);
  return $.size = B ? B.size : 0, $._map = B, $.__ownerID = A, $;
}
P(he, "makeOrderedSet");
var fk;
function P$() {
  return fk || (fk = he(zA()));
}
P(P$, "emptyOrderedSet");
function at(B) {
  if (FA(B))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (nA(B))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (B === null || typeof B != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
P(at, "throwOnInvalidDefaultValues");
var mB = P(function(A, $) {
  var k;
  at(A);
  var e = P(function(r) {
    var n = this;
    if (r instanceof e)
      return r;
    if (!(this instanceof e))
      return new e(r);
    if (!k) {
      k = true;
      var i = Object.keys(A), j = t._indices = {};
      t._name = $, t._keys = i, t._defaultValues = A;
      for (var o = 0; o < i.length; o++) {
        var m = i[o];
        j[m] = o, t[m] ? typeof console == "object" && console.warn && console.warn("Cannot define " + w$(this) + ' with property "' + m + '" since that property name is part of the Record API.') : st(t, m);
      }
    }
    return this.__ownerID = void 0, this._values = _7().withMutations(function(c) {
      c.setSize(n._keys.length), YB(r).forEach(function(p, Q) {
        c.set(n._indices[Q], p === n._defaultValues[Q] ? void 0 : p);
      });
    }), this;
  }, "Record"), t = e.prototype = Object.create(jB);
  return t.constructor = e, $ && (e.displayName = $), e;
}, "Record");
mB.prototype.toString = P(function() {
  for (var A = w$(this) + " { ", $ = this._keys, k, e = 0, t = $.length; e !== t; e++)
    k = $[e], A += (e ? ", " : "") + k + ": " + A7(this.get(k));
  return A + " }";
}, "toString");
mB.prototype.equals = P(function(A) {
  return this === A || FA(A) && DA(this).equals(DA(A));
}, "equals");
mB.prototype.hashCode = P(function() {
  return DA(this).hashCode();
}, "hashCode");
mB.prototype.has = P(function(A) {
  return this._indices.hasOwnProperty(A);
}, "has");
mB.prototype.get = P(function(A, $) {
  if (!this.has(A))
    return $;
  var k = this._indices[A], e = this._values.get(k);
  return e === void 0 ? this._defaultValues[A] : e;
}, "get");
mB.prototype.set = P(function(A, $) {
  if (this.has(A)) {
    var k = this._values.set(this._indices[A], $ === this._defaultValues[A] ? void 0 : $);
    if (k !== this._values && !this.__ownerID)
      return y$(this, k);
  }
  return this;
}, "set");
mB.prototype.remove = P(function(A) {
  return this.set(A);
}, "remove");
mB.prototype.clear = P(function() {
  var A = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : y$(this, A);
}, "clear");
mB.prototype.wasAltered = P(function() {
  return this._values.wasAltered();
}, "wasAltered");
mB.prototype.toSeq = P(function() {
  return DA(this);
}, "toSeq");
mB.prototype.toJS = P(function() {
  return H7(this);
}, "toJS$1");
mB.prototype.entries = P(function() {
  return this.__iterator(zB);
}, "entries");
mB.prototype.__iterator = P(function(A, $) {
  return DA(this).__iterator(A, $);
}, "__iterator");
mB.prototype.__iterate = P(function(A, $) {
  return DA(this).__iterate(A, $);
}, "__iterate");
mB.prototype.__ensureOwner = P(function(A) {
  if (A === this.__ownerID)
    return this;
  var $ = this._values.__ensureOwner(A);
  return A ? y$(this, $, A) : (this.__ownerID = A, this._values = $, this);
}, "__ensureOwner");
mB.isRecord = FA;
mB.getDescriptiveName = w$;
var jB = mB.prototype;
jB[wk] = true;
jB[E7] = jB.remove;
jB.deleteIn = jB.removeIn = h$;
jB.getIn = ue;
jB.hasIn = wB.hasIn;
jB.merge = Ae;
jB.mergeWith = $e;
jB.mergeIn = T$;
jB.mergeDeep = ee;
jB.mergeDeepWith = Pe;
jB.mergeDeepIn = X$;
jB.setIn = c$;
jB.update = m$;
jB.updateIn = Q$;
jB.withMutations = i7;
jB.asMutable = a7;
jB.asImmutable = s7;
jB[M7] = jB.entries;
jB.toJSON = jB.toObject = wB.toObject;
jB.inspect = jB.toSource = function() {
  return this.toString();
};
function y$(B, A, $) {
  var k = Object.create(Object.getPrototypeOf(B));
  return k._values = A, k.__ownerID = $, k;
}
P(y$, "makeRecord");
function w$(B) {
  return B.constructor.displayName || B.constructor.name || "Record";
}
P(w$, "recordName");
function DA(B) {
  return i$(B._keys.map(function(A) {
    return [A, B.get(A)];
  }));
}
P(DA, "recordSeq");
function st(B, A) {
  try {
    Object.defineProperty(B, A, { get: function() {
      return this.get(A);
    }, set: function($) {
      u$(this.__ownerID, "Cannot set on an immutable record."), this.set(A, $);
    } });
  } catch {
  }
}
P(st, "setProp");
_$();
aB();
var ZB = P((B) => pt(B).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8), "md5");
function pt(B) {
  let A = "0123456789abcdef";
  function $(z) {
    let I, N = "";
    for (I = 0; I <= 3; I++)
      N += A.charAt(z >> I * 8 + 4 & 15) + A.charAt(z >> I * 8 & 15);
    return N;
  }
  P($, "rh");
  function k(z, I) {
    let N = (z & 65535) + (I & 65535);
    return (z >> 16) + (I >> 16) + (N >> 16) << 16 | N & 65535;
  }
  P(k, "ad");
  function e(z, I) {
    return z << I | z >>> 32 - I;
  }
  P(e, "rl");
  function t(z, I, N, iB, F, RB) {
    return k(e(k(k(I, z), k(iB, RB)), F), N);
  }
  P(t, "cm");
  function E(z, I, N, iB, F, RB, DB) {
    return t(I & N | ~I & iB, z, I, F, RB, DB);
  }
  P(E, "ff");
  function r(z, I, N, iB, F, RB, DB) {
    return t(I & iB | N & ~iB, z, I, F, RB, DB);
  }
  P(r, "gg");
  function n(z, I, N, iB, F, RB, DB) {
    return t(I ^ N ^ iB, z, I, F, RB, DB);
  }
  P(n, "hh");
  function i(z, I, N, iB, F, RB, DB) {
    return t(N ^ (I | ~iB), z, I, F, RB, DB);
  }
  P(i, "ii");
  function j(z) {
    let I, N = (z.length + 8 >> 6) + 1, iB = Array.from({ length: N * 16 });
    for (I = 0; I < N * 16; I++)
      iB[I] = 0;
    for (I = 0; I < z.length; I++)
      iB[I >> 2] |= z.charCodeAt(I) << I % 4 * 8;
    return iB[I >> 2] |= 128 << I % 4 * 8, iB[N * 16 - 2] = z.length * 8, iB;
  }
  P(j, "sb");
  let o, m = j(B), c = 1732584193, p = -271733879, Q = -1732584194, f = 271733878, Y, K, sB, lB;
  for (o = 0; o < m.length; o += 16)
    Y = c, K = p, sB = Q, lB = f, c = E(c, p, Q, f, m[o + 0], 7, -680876936), f = E(f, c, p, Q, m[o + 1], 12, -389564586), Q = E(Q, f, c, p, m[o + 2], 17, 606105819), p = E(p, Q, f, c, m[o + 3], 22, -1044525330), c = E(c, p, Q, f, m[o + 4], 7, -176418897), f = E(f, c, p, Q, m[o + 5], 12, 1200080426), Q = E(Q, f, c, p, m[o + 6], 17, -1473231341), p = E(p, Q, f, c, m[o + 7], 22, -45705983), c = E(c, p, Q, f, m[o + 8], 7, 1770035416), f = E(f, c, p, Q, m[o + 9], 12, -1958414417), Q = E(Q, f, c, p, m[o + 10], 17, -42063), p = E(p, Q, f, c, m[o + 11], 22, -1990404162), c = E(c, p, Q, f, m[o + 12], 7, 1804603682), f = E(f, c, p, Q, m[o + 13], 12, -40341101), Q = E(Q, f, c, p, m[o + 14], 17, -1502002290), p = E(p, Q, f, c, m[o + 15], 22, 1236535329), c = r(c, p, Q, f, m[o + 1], 5, -165796510), f = r(f, c, p, Q, m[o + 6], 9, -1069501632), Q = r(Q, f, c, p, m[o + 11], 14, 643717713), p = r(p, Q, f, c, m[o + 0], 20, -373897302), c = r(c, p, Q, f, m[o + 5], 5, -701558691), f = r(f, c, p, Q, m[o + 10], 9, 38016083), Q = r(Q, f, c, p, m[o + 15], 14, -660478335), p = r(p, Q, f, c, m[o + 4], 20, -405537848), c = r(c, p, Q, f, m[o + 9], 5, 568446438), f = r(f, c, p, Q, m[o + 14], 9, -1019803690), Q = r(Q, f, c, p, m[o + 3], 14, -187363961), p = r(p, Q, f, c, m[o + 8], 20, 1163531501), c = r(c, p, Q, f, m[o + 13], 5, -1444681467), f = r(f, c, p, Q, m[o + 2], 9, -51403784), Q = r(Q, f, c, p, m[o + 7], 14, 1735328473), p = r(p, Q, f, c, m[o + 12], 20, -1926607734), c = n(c, p, Q, f, m[o + 5], 4, -378558), f = n(f, c, p, Q, m[o + 8], 11, -2022574463), Q = n(Q, f, c, p, m[o + 11], 16, 1839030562), p = n(p, Q, f, c, m[o + 14], 23, -35309556), c = n(c, p, Q, f, m[o + 1], 4, -1530992060), f = n(f, c, p, Q, m[o + 4], 11, 1272893353), Q = n(Q, f, c, p, m[o + 7], 16, -155497632), p = n(p, Q, f, c, m[o + 10], 23, -1094730640), c = n(c, p, Q, f, m[o + 13], 4, 681279174), f = n(f, c, p, Q, m[o + 0], 11, -358537222), Q = n(Q, f, c, p, m[o + 3], 16, -722521979), p = n(p, Q, f, c, m[o + 6], 23, 76029189), c = n(c, p, Q, f, m[o + 9], 4, -640364487), f = n(f, c, p, Q, m[o + 12], 11, -421815835), Q = n(Q, f, c, p, m[o + 15], 16, 530742520), p = n(p, Q, f, c, m[o + 2], 23, -995338651), c = i(c, p, Q, f, m[o + 0], 6, -198630844), f = i(f, c, p, Q, m[o + 7], 10, 1126891415), Q = i(Q, f, c, p, m[o + 14], 15, -1416354905), p = i(p, Q, f, c, m[o + 5], 21, -57434055), c = i(c, p, Q, f, m[o + 12], 6, 1700485571), f = i(f, c, p, Q, m[o + 3], 10, -1894986606), Q = i(Q, f, c, p, m[o + 10], 15, -1051523), p = i(p, Q, f, c, m[o + 1], 21, -2054922799), c = i(c, p, Q, f, m[o + 8], 6, 1873313359), f = i(f, c, p, Q, m[o + 15], 10, -30611744), Q = i(Q, f, c, p, m[o + 6], 15, -1560198380), p = i(p, Q, f, c, m[o + 13], 21, 1309151649), c = i(c, p, Q, f, m[o + 4], 6, -145523070), f = i(f, c, p, Q, m[o + 11], 10, -1120210379), Q = i(Q, f, c, p, m[o + 2], 15, 718787259), p = i(p, Q, f, c, m[o + 9], 21, -343485551), c = k(c, Y), p = k(p, K), Q = k(Q, sB), f = k(f, lB);
  return $(c) + $(p) + $(Q) + $(f);
}
P(pt, "md5FULL");
aB();
R$();
aB();
var ve = Ak(xe(), 1);
function Me(B, A) {
  return (0, ve.default)(B, A).map((e) => e[0] === 1 ? e : [e[0], e[1].length]);
}
P(Me, "createDelta");
function U$(B, A) {
  let $ = "", k = 0;
  for (let e of A) {
    let t = e[0], E = e[1];
    e[0] === -1 && typeof E == "number" ? k += E : t == 0 && typeof E == "number" ? $ += B.slice(k, k += E) : $ += E;
  }
  return $;
}
P(U$, "applyPatch");
aB();
aB();
var j7 = Ak(ye(), 1);
var we = "./chunk-esbuild-XXIAOOGR.wasm";
aB();
R$();
aB();
var I7 = { init: false, initialize: (B) => I7.init === false ? I7.init = (0, j7.initialize)({ wasmURL: new URL(we, B + "/src/").toString() }) : I7.init };
var _e = P(async (B, A, $) => {
  let k = I7.initialize($);
  k !== true && await k;
  let e = await (0, j7.transform)(B, { ...A, define: { ...Tt, ...A?.define ? A.define : {} } });
  return { code: `/*${ZB(B)}*/` + e.code };
}, "initAndTransform");
var Tt = { "process.env.NODE_ENV": '"development"', "process.env.NODE_DEBUG": JSON.stringify(false), "process.browser": JSON.stringify(true), "process.env.DEBUG": JSON.stringify(true), isBrowser: JSON.stringify(true), isJest: JSON.stringify(false), "process.env.version": '"1.1.1"', global: "globalThis", WORKER_DOM_DEBUG: JSON.stringify(false), "process.env.DUMP_SESSION_KEYS": JSON.stringify(false), process: JSON.stringify({ env: { NODE_ENV: "development", browser: true, NODE_DEBUG: false, DEBUG: true, isBrowser: true }, browser: true }) };
async function Ce(B, A) {
  return (await _e(B, { loader: "tsx", format: "esm", treeShaking: true, platform: "browser", minify: false, keepNames: true, tsconfigRaw: { compilerOptions: { jsx: "react-jsx", useDefineForClassFields: false, jsxFragmentFactory: "Fragment", jsxImportSource: "@emotion/react" } }, target: "es2022" }, A)).code;
}
P(Ce, "esmTransform");
var RE = { imports: me.imports };
function DE(B, A) {
  let $ = { syncDb: async (k, e, t) => {
    let { getItem: E, setItem: r } = $;
    return await P(async (i, j, o) => await St(r, E, i, j, o), "syncDb")(k, e, t);
  }, getItem: async (k) => await (await A(B)).getItem(k), setItem: async (k, e) => await (await A(B)).setItem(k, e) };
  return $;
}
P(DE, "db");
function Xt(B, A) {
  return mB({ ...A, room: B, state: mB(A.state)() });
}
P(Xt, "initSession");
var ft = new VA();
var St = P(async (B, A, $, k, e) => {
  ft.runExclusive(async () => {
    let t = P((j, o) => B(String(j), o), "setItem"), E = P((j) => A(String(j)), "getItem"), r = $.newHash, n = await A("head");
    n || (await t(r, $), await B("head", r), n = r), await t(e.newHash, { ...k, oldHash: e.oldHash, reversePatch: e.reversePatch });
    let i = await E(n);
    await t(n, { newHash: e.newHash, patch: e.patch, ...i ? { i: i.i, oldHash: i.oldHash, reversePatch: i.reversePatch } : { code: $.code, transpiled: $.transpiled, html: $.html, css: $.css } }), await B("head", e.newHash);
  });
}, "syncStorage");
var qB = {};
var mA = {};
var F7 = class {
  constructor(A, $) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      let A2 = this.session.get("state"), $2 = A2.hashCode();
      return mA[$2] = A2, $2;
    };
    this.createPatchFromHashCode = (A2, $2) => {
      let k2 = JSON.parse(qA($2));
      mA[U7(this.room)] = this.session.get("state");
      let e = mA[A2], t = A2, E = qA(e.toJSON()), r = e.merge(k2), n = qA(r.toJSON()).split(ZB(r.get("transpiled"))).join("css"), i = this.session.get("state").merge(JSON.parse(n)), j = i.hashCode();
      mA[j] = i;
      let o = Re(E, n), m = Re(n, E);
      return { oldHash: t, newHash: j, reversePatch: m, patch: o };
    };
    this.patchSync = (A2, $2 = false) => {
      if (!$2) {
        if (A2.code !== this.session.get("state").code && A2.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (A2.i, A2.i < this.session.get("state").i && (console.log("never going back!"), A2.i = this.session.get("state").i + 1), A2.code !== this.session.get("state").code && A2.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (A2.transpiled.slice(0, 12) !== `/*${ZB(A2.code)}*/`)
          throw console.error(`missing: /*${ZB(A2.code)}*/, transpiled: ${A2.transpiled.slice(0, 12)}`), new Error("transpiled	hack issue");
        if (A2.code.length < 5)
          throw new Error("code deleted?");
        if (A2.html.indexOf(ZB(A2.transpiled)) === -1)
          throw console.error(`missing md5trans from html: ${ZB(A2.transpiled)}
      ${A2.html.slice(0, 64)}
      
      `), new Error(`render hack issue missing: ${ZB(A2.transpiled)}.`);
        if (A2.css.length && A2.css.indexOf(ZB(A2.transpiled)) === -1)
          throw console.error(`missing from css: ${ZB(A2.transpiled)}`), new Error(`render hack issue missing: ${ZB(A2.transpiled)}.`);
      }
      let k2 = this.session.get("state").hashCode();
      return this.session = this.session.set("state", this.session.get("state").merge(A2)), this.session.get("state").hashCode() !== k2 && $2 !== true && this.update(), this.session;
    };
    this.applyPatch = ({ oldHash: A2, newHash: $2, patch: k2 }) => {
      if (!(A2 && $2 && k2.length))
        return;
      mA[U7(this.room)] = this.session.get("state");
      let e = mA[A2];
      if (!e)
        throw new Error(`cant find old record: ${A2}`);
      let t = qA(e.toJSON()), E = U$(t, k2), r = JSON.parse(E), n = this.session.get("state").merge(r), i = this.session.get("state").merge(n);
      if (i.hashCode() === $2)
        this.session = this.session.set("state", i), mA[$2] = this.session.get("state");
      else
        throw new Error("Wrong patch");
      return $2;
    };
    qB[A] = this, this.room = A;
    let k = null;
    this.session = Xt(A, { ...$, state: k || JSON.parse(qA({ ...$.state, codeSpace: A })) })(), mA[U7(A)] = this.session.get("state");
  }
  update() {
    Object.keys(this.cb).map((A) => this.cb[A]).map((A) => {
      try {
        A();
      } catch ($) {
        console.error("error calling callback", { err: $ });
      }
    });
  }
  onUpdate(A, $) {
    this.cb[$] = A;
  }
  json() {
    let A = this.session.toJSON(), $ = A.state.toJSON();
    return { ...A, state: $ };
  }
  setRoom(A) {
    let $ = this.session.set("room", A);
    this.session = $;
  }
};
P(F7, "CodeSession");
var U7 = P((B) => qB[B]?.session.get("state").hashCode(), "hashKEY");
function IE(B, A) {
  if (A && A.length) {
    let $ = qB[B]?.session.get("state").toJSON(), { i: k, transpiled: e, code: t, html: E, css: r } = A ? JSON.parse(U$(qA($), A)) : $;
    return qB[B]?.session.get("state").merge({ i: k, transpiled: e, code: t, html: E, css: r }).toObject();
  }
  return qB[B].session.get("state").toObject();
}
P(IE, "mST");
function qA(B) {
  let { i: A, transpiled: $, code: k, html: e, css: t } = B;
  return JSON.stringify({ i: A, transpiled: $, code: k, html: e, css: t });
}
P(qA, "string_");
var FE = P((B, A) => qB[A]?.applyPatch(B), "applyPatchSync");
var UE = P((B, A) => {
  qB[A]?.applyPatch(B), qB[A]?.update();
}, "applyPatch");
var LE = P((B, A = "default", $) => qB[$]?.onUpdate(B, A), "onSessionUpdate");
var Ht = P((B, A, $) => ({ codeSpace: $, i: A.i, ...qB[$]?.createPatchFromHashCode(B, A) }), "makePatchFrom");
var WE = P((B, A) => ({ ...Ht(U7(A), B, A), codeSpace: A, i: B.i }), "makePatch");
var NE = P((B, A) => qB[B] || (qB[B] = new F7(B, { name: A.name, state: { ...A.state } })), "startSession");
function Re(B, A) {
  return Me(B, A);
}
P(Re, "createPatch");
var OE = P((B, A = true) => qB[B.codeSpace].patchSync(B, A), "patchSync");
function GE(B) {
  return mB(B)().hashCode();
}
P(GE, "hashCode");

// src/staticContent.mjs
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";
var files = JSON.parse(ASSET_MANIFEST);
var ASSET_HASH = ZB(ASSET_MANIFEST);

// ../code/dist/src/session.mjs
var iP2 = Object.create;
var N72 = Object.defineProperty;
var aP2 = Object.getOwnPropertyDescriptor;
var sP2 = Object.getOwnPropertyNames;
var oP2 = Object.getPrototypeOf;
var lP2 = Object.prototype.hasOwnProperty;
var P2 = (B, A) => N72(B, "name", { value: A, configurable: true });
var O72 = (B, A) => () => (B && (A = B(B = 0)), A);
var Bk2 = (B, A) => () => (A || B((A = { exports: {} }).exports, A), A.exports);
var jP2 = (B, A, $, k) => {
  if (A && typeof A == "object" || typeof A == "function")
    for (let e of sP2(A))
      !lP2.call(B, e) && e !== $ && N72(B, e, { get: () => A[e], enumerable: !(k = aP2(A, e)) || k.enumerable });
  return B;
};
var Ak2 = (B, A, $) => ($ = B != null ? iP2(oP2(B)) : {}, jP2(A || !B || !B.__esModule ? N72($, "default", { value: B, enumerable: true }) : $, B));
var aB2 = O72(() => {
});
var ot2;
var C$2;
var me2;
var _$2 = O72(() => {
  "use strict";
  aB2();
  ot2 = { "@emotion/react/jsx-runtime": "/src/emotionJsxRuntime.mjs", "react-dom/client": "/src/reactDomClient.mjs", "framer-motion": "/src/motion.mjs", "@emotion/react": "/src/emotion.mjs", "@emotion/cache": "/src/emotionCache.mjs", "@emotion/styled": "/src/emotionStyled.mjs", react: "/src/reactMod.mjs", "react-dom": "/src/reactDom.mjs", "react-error-boundary": "/src/reactMod.mjs", "hydrate.mjs": "/src/hydrate.mjs" }, C$2 = { imports: ot2 }, me2 = C$2;
});
function de2(B, A, $, k = true, e = false) {
  let t = vB2(B, 'from"', 'from "');
  if (Object.keys(Qe2).map((c) => {
    let p = new URL(Qe2[c], A).toString();
    k && (t = vB2(t, ` from "${c}"`, ` from "${p}"`)), t = vB2(t, ' from "/', ` from "${A}/`);
  }), t.split("/::").join(A), !t)
    return t;
  let r = $ || A, n = new URL(".", r).toString(), i = new URL("..", r).toString(), j = new URL("../..", r).toString(), o = new URL("../../..", r).toString();
  t = vB2(t, 'reference path="./', `reference path="${n}`), t = vB2(t, 'import"', 'import "'), t = vB2(t, ' from "../../../', ` from "${o}`), t = vB2(t, 'import("../../../', ` import("${o}`), t = vB2(t, 'import("../../', ` import("${j}`), t = vB2(t, 'import("../', ` import("${i}`), t = vB2(t, 'import("./', ` import("${n}`), t = vB2(t, 'import "../../../', ` import "${o}`), t = vB2(t, 'import "../../', ` import "${j}`), t = vB2(t, 'import "../', ` import "${i}`), t = vB2(t, 'import "./', ` import "${n}`), t = vB2(t, ' from "../../', ` from "${j}`), t = vB2(t, ' from "../', ` from "${i}`), t = vB2(t, ' from "./', ` from "${n}`);
  let m;
  return t = t.split(";").map((c) => c.indexOf("import") !== -1 ? c.trim() : c).map((c) => c.split(`
`).map((p) => {
    if (p.length === 0 || p.indexOf("import") === -1)
      return p;
    if (p.startsWith("import") && p.indexOf('"') !== -1 && p.indexOf("https://") === -1 && p.indexOf(A) === -1) {
      let Q = p.split('"');
      return Q[1] = A + "/" + Q[1] + "?dev&format=es2022", Q.join('"');
    }
    if (p.indexOf("/node_process.js") !== -1 || p.indexOf("/node_buffer.js") !== -1 || p.indexOf("@babel/runtime") !== -1) {
      let Q = p.split('"');
      try {
        m = new URL(Q[1]), Q[1] = A + "/npm:" + m.pathname;
      } catch {
        console.error("URL ERR", Q[1]);
      }
      return Q.join('"');
    }
    if (p.indexOf("/npm:/") === -1 && p.startsWith("import")) {
      let Q = p.split('"');
      try {
        m = new URL(Q[1], A), m && m.pathname.indexOf(".") === -1 && m.pathname.indexOf("/live/") !== -1 && (Q[1] = m.toString() + (e ? "/index.tsx" : "/index.js"));
      } catch {
        console.error("URL ERR", Q[1]);
      }
      return Q.join('"');
    }
    return p;
  }).join(`
`)).join(";"), t = t.split("/npm:/npm:").join("/npm:"), t;
}
function vB2(B, A, $) {
  return B && B.split(A).join($);
}
var Qe2;
var R$2 = O72(() => {
  "use strict";
  aB2();
  _$2();
  Qe2 = C$2.imports;
  P2(de2, "importMapReplace");
  P2(vB2, "replaceAll");
});
var xe2 = Bk2((Yt, be) => {
  aB2();
  var aA = -1, tA = 1, LB = 0;
  function l7(B, A, $, k) {
    if (B === A)
      return B ? [[LB, B]] : [];
    if ($ != null) {
      var e = dt(B, A, $);
      if (e)
        return e;
    }
    var t = I$(B, A), E = B.substring(0, t);
    B = B.substring(t), A = A.substring(t), t = F$(B, A);
    var r = B.substring(B.length - t);
    B = B.substring(0, B.length - t), A = A.substring(0, A.length - t);
    var n = ct(B, A);
    return E && n.unshift([LB, E]), r && n.push([LB, r]), Te(n, k), n;
  }
  P2(l7, "diff_main");
  function ct(B, A) {
    var $;
    if (!B)
      return [[tA, A]];
    if (!A)
      return [[aA, B]];
    var k = B.length > A.length ? B : A, e = B.length > A.length ? A : B, t = k.indexOf(e);
    if (t !== -1)
      return $ = [[tA, k.substring(0, t)], [LB, e], [tA, k.substring(t + e.length)]], B.length > A.length && ($[0][0] = $[2][0] = aA), $;
    if (e.length === 1)
      return [[aA, B], [tA, A]];
    var E = mt(B, A);
    if (E) {
      var r = E[0], n = E[1], i = E[2], j = E[3], o = E[4], m = l7(r, i), c = l7(n, j);
      return m.concat([[LB, o]], c);
    }
    return ht(B, A);
  }
  P2(ct, "diff_compute_");
  function ht(B, A) {
    for (var $ = B.length, k = A.length, e = Math.ceil(($ + k) / 2), t = e, E = 2 * e, r = new Array(E), n = new Array(E), i = 0; i < E; i++)
      r[i] = -1, n[i] = -1;
    r[t + 1] = 0, n[t + 1] = 0;
    for (var j = $ - k, o = j % 2 !== 0, m = 0, c = 0, p = 0, Q = 0, f = 0; f < e; f++) {
      for (var Y = -f + m; Y <= f - c; Y += 2) {
        var K = t + Y, sB;
        Y === -f || Y !== f && r[K - 1] < r[K + 1] ? sB = r[K + 1] : sB = r[K - 1] + 1;
        for (var lB = sB - Y; sB < $ && lB < k && B.charAt(sB) === A.charAt(lB); )
          sB++, lB++;
        if (r[K] = sB, sB > $)
          c += 2;
        else if (lB > k)
          m += 2;
        else if (o) {
          var z = t + j - Y;
          if (z >= 0 && z < E && n[z] !== -1) {
            var I = $ - n[z];
            if (sB >= I)
              return ge(B, A, sB, lB);
          }
        }
      }
      for (var N = -f + p; N <= f - Q; N += 2) {
        var z = t + N, I;
        N === -f || N !== f && n[z - 1] < n[z + 1] ? I = n[z + 1] : I = n[z - 1] + 1;
        for (var iB = I - N; I < $ && iB < k && B.charAt($ - I - 1) === A.charAt(k - iB - 1); )
          I++, iB++;
        if (n[z] = I, I > $)
          Q += 2;
        else if (iB > k)
          p += 2;
        else if (!o) {
          var K = t + j - N;
          if (K >= 0 && K < E && r[K] !== -1) {
            var sB = r[K], lB = t + sB - K;
            if (I = $ - I, sB >= I)
              return ge(B, A, sB, lB);
          }
        }
      }
    }
    return [[aA, B], [tA, A]];
  }
  P2(ht, "diff_bisect_");
  function ge(B, A, $, k) {
    var e = B.substring(0, $), t = A.substring(0, k), E = B.substring($), r = A.substring(k), n = l7(e, t), i = l7(E, r);
    return n.concat(i);
  }
  P2(ge, "diff_bisectSplit_");
  function I$(B, A) {
    if (!B || !A || B.charAt(0) !== A.charAt(0))
      return 0;
    for (var $ = 0, k = Math.min(B.length, A.length), e = k, t = 0; $ < e; )
      B.substring(t, e) == A.substring(t, e) ? ($ = e, t = $) : k = e, e = Math.floor((k - $) / 2 + $);
    return Xe(B.charCodeAt(e - 1)) && e--, e;
  }
  P2(I$, "diff_commonPrefix");
  function F$(B, A) {
    if (!B || !A || B.slice(-1) !== A.slice(-1))
      return 0;
    for (var $ = 0, k = Math.min(B.length, A.length), e = k, t = 0; $ < e; )
      B.substring(B.length - e, B.length - t) == A.substring(A.length - e, A.length - t) ? ($ = e, t = $) : k = e, e = Math.floor((k - $) / 2 + $);
    return fe(B.charCodeAt(B.length - e)) && e--, e;
  }
  P2(F$, "diff_commonSuffix");
  function mt(B, A) {
    var $ = B.length > A.length ? B : A, k = B.length > A.length ? A : B;
    if ($.length < 4 || k.length * 2 < $.length)
      return null;
    function e(c, p, Q) {
      for (var f = c.substring(Q, Q + Math.floor(c.length / 4)), Y = -1, K = "", sB, lB, z, I; (Y = p.indexOf(f, Y + 1)) !== -1; ) {
        var N = I$(c.substring(Q), p.substring(Y)), iB = F$(c.substring(0, Q), p.substring(0, Y));
        K.length < iB + N && (K = p.substring(Y - iB, Y) + p.substring(Y, Y + N), sB = c.substring(0, Q - iB), lB = c.substring(Q + N), z = p.substring(0, Y - iB), I = p.substring(Y + N));
      }
      return K.length * 2 >= c.length ? [sB, lB, z, I, K] : null;
    }
    P2(e, "diff_halfMatchI_");
    var t = e($, k, Math.ceil($.length / 4)), E = e($, k, Math.ceil($.length / 2)), r;
    if (!t && !E)
      return null;
    E ? t ? r = t[4].length > E[4].length ? t : E : r = E : r = t;
    var n, i, j, o;
    B.length > A.length ? (n = r[0], i = r[1], j = r[2], o = r[3]) : (j = r[0], o = r[1], n = r[2], i = r[3]);
    var m = r[4];
    return [n, i, j, o, m];
  }
  P2(mt, "diff_halfMatch_");
  function Te(B, A) {
    B.push([LB, ""]);
    for (var $ = 0, k = 0, e = 0, t = "", E = "", r; $ < B.length; ) {
      if ($ < B.length - 1 && !B[$][1]) {
        B.splice($, 1);
        continue;
      }
      switch (B[$][0]) {
        case tA:
          e++, E += B[$][1], $++;
          break;
        case aA:
          k++, t += B[$][1], $++;
          break;
        case LB:
          var n = $ - e - k - 1;
          if (A) {
            if (n >= 0 && He(B[n][1])) {
              var i = B[n][1].slice(-1);
              if (B[n][1] = B[n][1].slice(0, -1), t = i + t, E = i + E, !B[n][1]) {
                B.splice(n, 1), $--;
                var j = n - 1;
                B[j] && B[j][0] === tA && (e++, E = B[j][1] + E, j--), B[j] && B[j][0] === aA && (k++, t = B[j][1] + t, j--), n = j;
              }
            }
            if (Se(B[$][1])) {
              var i = B[$][1].charAt(0);
              B[$][1] = B[$][1].slice(1), t += i, E += i;
            }
          }
          if ($ < B.length - 1 && !B[$][1]) {
            B.splice($, 1);
            break;
          }
          if (t.length > 0 || E.length > 0) {
            t.length > 0 && E.length > 0 && (r = I$(E, t), r !== 0 && (n >= 0 ? B[n][1] += E.substring(0, r) : (B.splice(0, 0, [LB, E.substring(0, r)]), $++), E = E.substring(r), t = t.substring(r)), r = F$(E, t), r !== 0 && (B[$][1] = E.substring(E.length - r) + B[$][1], E = E.substring(0, E.length - r), t = t.substring(0, t.length - r)));
            var o = e + k;
            t.length === 0 && E.length === 0 ? (B.splice($ - o, o), $ = $ - o) : t.length === 0 ? (B.splice($ - o, o, [tA, E]), $ = $ - o + 1) : E.length === 0 ? (B.splice($ - o, o, [aA, t]), $ = $ - o + 1) : (B.splice($ - o, o, [aA, t], [tA, E]), $ = $ - o + 2);
          }
          $ !== 0 && B[$ - 1][0] === LB ? (B[$ - 1][1] += B[$][1], B.splice($, 1)) : $++, e = 0, k = 0, t = "", E = "";
          break;
      }
    }
    B[B.length - 1][1] === "" && B.pop();
    var m = false;
    for ($ = 1; $ < B.length - 1; )
      B[$ - 1][0] === LB && B[$ + 1][0] === LB && (B[$][1].substring(B[$][1].length - B[$ - 1][1].length) === B[$ - 1][1] ? (B[$][1] = B[$ - 1][1] + B[$][1].substring(0, B[$][1].length - B[$ - 1][1].length), B[$ + 1][1] = B[$ - 1][1] + B[$ + 1][1], B.splice($ - 1, 1), m = true) : B[$][1].substring(0, B[$ + 1][1].length) == B[$ + 1][1] && (B[$ - 1][1] += B[$ + 1][1], B[$][1] = B[$][1].substring(B[$ + 1][1].length) + B[$ + 1][1], B.splice($ + 1, 1), m = true)), $++;
    m && Te(B, A);
  }
  P2(Te, "diff_cleanupMerge");
  function Xe(B) {
    return B >= 55296 && B <= 56319;
  }
  P2(Xe, "is_surrogate_pair_start");
  function fe(B) {
    return B >= 56320 && B <= 57343;
  }
  P2(fe, "is_surrogate_pair_end");
  function Se(B) {
    return fe(B.charCodeAt(0));
  }
  P2(Se, "starts_with_pair_end");
  function He(B) {
    return Xe(B.charCodeAt(B.length - 1));
  }
  P2(He, "ends_with_pair_start");
  function Qt(B) {
    for (var A = [], $ = 0; $ < B.length; $++)
      B[$][1].length > 0 && A.push(B[$]);
    return A;
  }
  P2(Qt, "remove_empty_tuples");
  function D$(B, A, $, k) {
    return He(B) || Se(k) ? null : Qt([[LB, B], [aA, A], [tA, $], [LB, k]]);
  }
  P2(D$, "make_edit_splice");
  function dt(B, A, $) {
    var k = typeof $ == "number" ? { index: $, length: 0 } : $.oldRange, e = typeof $ == "number" ? null : $.newRange, t = B.length, E = A.length;
    if (k.length === 0 && (e === null || e.length === 0)) {
      var r = k.index, n = B.slice(0, r), i = B.slice(r), j = e ? e.index : null;
      B: {
        var o = r + E - t;
        if (j !== null && j !== o || o < 0 || o > E)
          break B;
        var m = A.slice(0, o), c = A.slice(o);
        if (c !== i)
          break B;
        var p = Math.min(r, o), Q = n.slice(0, p), f = m.slice(0, p);
        if (Q !== f)
          break B;
        var Y = n.slice(p), K = m.slice(p);
        return D$(Q, Y, K, i);
      }
      B: {
        if (j !== null && j !== r)
          break B;
        var sB = r, m = A.slice(0, sB), c = A.slice(sB);
        if (m !== n)
          break B;
        var lB = Math.min(t - sB, E - sB), z = i.slice(i.length - lB), I = c.slice(c.length - lB);
        if (z !== I)
          break B;
        var Y = i.slice(0, i.length - lB), K = c.slice(0, c.length - lB);
        return D$(n, Y, K, z);
      }
    }
    if (k.length > 0 && e && e.length === 0) {
      B: {
        var Q = B.slice(0, k.index), z = B.slice(k.index + k.length), p = Q.length, lB = z.length;
        if (E < p + lB)
          break B;
        var f = A.slice(0, p), I = A.slice(E - lB);
        if (Q !== f || z !== I)
          break B;
        var Y = B.slice(p, t - lB), K = A.slice(p, E - lB);
        return D$(Q, Y, K, z);
      }
    }
    return null;
  }
  P2(dt, "find_cursor_edit_diff");
  function D7(B, A, $) {
    return l7(B, A, $, true);
  }
  P2(D7, "diff");
  D7.INSERT = tA;
  D7.DELETE = aA;
  D7.EQUAL = LB;
  be.exports = D7;
});
var ye2 = Bk2((eE, L$) => {
  aB2();
  ((B) => {
    "use strict";
    var A = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, k = Object.getOwnPropertyNames, e = Object.prototype.hasOwnProperty, t = P2((s, l) => {
      for (var u in l)
        A(s, u, { get: l[u], enumerable: true });
    }, "__export"), E = P2((s, l, u, H) => {
      if (l && typeof l == "object" || typeof l == "function")
        for (let M of k(l))
          !e.call(s, M) && M !== u && A(s, M, { get: () => l[M], enumerable: !(H = $(l, M)) || H.enumerable });
      return s;
    }, "__copyProps"), r = P2((s) => E(A({}, "__esModule", { value: true }), s), "__toCommonJS"), n = P2((s, l, u) => new Promise((H, M) => {
      var y = P2((b) => {
        try {
          D(u.next(b));
        } catch (O) {
          M(O);
        }
      }, "fulfilled"), S = P2((b) => {
        try {
          D(u.throw(b));
        } catch (O) {
          M(O);
        }
      }, "rejected"), D = P2((b) => b.done ? H(b.value) : Promise.resolve(b.value).then(y, S), "step");
      D((u = u.apply(s, l)).next());
    }), "__async"), i = {};
    t(i, { analyzeMetafile: () => $P, analyzeMetafileSync: () => tP, build: () => Ye, buildSync: () => kP, default: () => nP, formatMessages: () => AP, formatMessagesSync: () => PP, initialize: () => EP, serve: () => Ze, transform: () => BP, transformSync: () => eP, version: () => ze }), B.exports = r(i);
    function j(s) {
      let l = P2((H) => {
        if (H === null)
          u.write8(0);
        else if (typeof H == "boolean")
          u.write8(1), u.write8(+H);
        else if (typeof H == "number")
          u.write8(2), u.write32(H | 0);
        else if (typeof H == "string")
          u.write8(3), u.write(c(H));
        else if (H instanceof Uint8Array)
          u.write8(4), u.write(H);
        else if (H instanceof Array) {
          u.write8(5), u.write32(H.length);
          for (let M of H)
            l(M);
        } else {
          let M = Object.keys(H);
          u.write8(6), u.write32(M.length);
          for (let y of M)
            u.write(c(y)), l(H[y]);
        }
      }, "visit"), u = new m();
      return u.write32(0), u.write32(s.id << 1 | +!s.isRequest), l(s.value), Y(u.buf, u.len - 4, 0), u.buf.subarray(0, u.len);
    }
    P2(j, "encodePacket");
    function o(s) {
      let l = P2(() => {
        switch (u.read8()) {
          case 0:
            return null;
          case 1:
            return !!u.read8();
          case 2:
            return u.read32();
          case 3:
            return p(u.read());
          case 4:
            return u.read();
          case 5: {
            let S = u.read32(), D = [];
            for (let b = 0; b < S; b++)
              D.push(l());
            return D;
          }
          case 6: {
            let S = u.read32(), D = {};
            for (let b = 0; b < S; b++)
              D[p(u.read())] = l();
            return D;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, "visit"), u = new m(s), H = u.read32(), M = (H & 1) === 0;
      H >>>= 1;
      let y = l();
      if (u.ptr !== s.length)
        throw new Error("Invalid packet");
      return { id: H, isRequest: M, value: y };
    }
    P2(o, "decodePacket");
    var m = P2(class {
      constructor(s = new Uint8Array(1024)) {
        this.buf = s, this.len = 0, this.ptr = 0;
      }
      _write(s) {
        if (this.len + s > this.buf.length) {
          let l = new Uint8Array((this.len + s) * 2);
          l.set(this.buf), this.buf = l;
        }
        return this.len += s, this.len - s;
      }
      write8(s) {
        let l = this._write(1);
        this.buf[l] = s;
      }
      write32(s) {
        let l = this._write(4);
        Y(this.buf, s, l);
      }
      write(s) {
        let l = this._write(4 + s.length);
        Y(this.buf, s.length, l), this.buf.set(s, l + 4);
      }
      _read(s) {
        if (this.ptr + s > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += s, this.ptr - s;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return f(this.buf, this._read(4));
      }
      read() {
        let s = this.read32(), l = new Uint8Array(s), u = this._read(l.length);
        return l.set(this.buf.subarray(u, u + s)), l;
      }
    }, "ByteBuffer"), c, p, Q;
    if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
      let s = new TextEncoder(), l = new TextDecoder();
      c = P2((u) => s.encode(u), "encodeUTF8"), p = P2((u) => l.decode(u), "decodeUTF8"), Q = 'new TextEncoder().encode("")';
    } else if (typeof Buffer < "u")
      c = P2((s) => Buffer.from(s), "encodeUTF8"), p = P2((s) => {
        let { buffer: l, byteOffset: u, byteLength: H } = s;
        return Buffer.from(l, u, H).toString();
      }, "decodeUTF8"), Q = 'Buffer.from("")';
    else
      throw new Error("No UTF-8 codec found");
    if (!(c("") instanceof Uint8Array))
      throw new Error(`Invariant violation: "${Q} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
    function f(s, l) {
      return s[l++] | s[l++] << 8 | s[l++] << 16 | s[l++] << 24;
    }
    P2(f, "readUInt32LE");
    function Y(s, l, u) {
      s[u++] = l, s[u++] = l >> 8, s[u++] = l >> 16, s[u++] = l >> 24;
    }
    P2(Y, "writeUInt32LE");
    var K = JSON.stringify, sB = "warning", lB = "silent";
    function z(s) {
      if (HB(s, "target"), s.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${s}`);
      return s;
    }
    P2(z, "validateTarget");
    var I = P2(() => null, "canBeAnything"), N = P2((s) => typeof s == "boolean" ? null : "a boolean", "mustBeBoolean"), iB = P2((s) => typeof s == "boolean" || typeof s == "object" && !Array.isArray(s) ? null : "a boolean or an object", "mustBeBooleanOrObject"), F = P2((s) => typeof s == "string" ? null : "a string", "mustBeString"), RB = P2((s) => s instanceof RegExp ? null : "a RegExp object", "mustBeRegExp"), DB = P2((s) => typeof s == "number" && s === (s | 0) ? null : "an integer", "mustBeInteger"), L7 = P2((s) => typeof s == "function" ? null : "a function", "mustBeFunction"), XB = P2((s) => Array.isArray(s) ? null : "an array", "mustBeArray"), BA = P2((s) => typeof s == "object" && s !== null && !Array.isArray(s) ? null : "an object", "mustBeObject"), De = P2((s) => s instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule"), Ie = P2((s) => typeof s == "object" && s !== null ? null : "an array or an object", "mustBeArrayOrRecord"), W$ = P2((s) => typeof s == "object" && !Array.isArray(s) ? null : "an object or null", "mustBeObjectOrNull"), N$ = P2((s) => typeof s == "string" || typeof s == "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean"), Fe = P2((s) => typeof s == "string" || typeof s == "object" && s !== null && !Array.isArray(s) ? null : "a string or an object", "mustBeStringOrObject"), Ue = P2((s) => typeof s == "string" || Array.isArray(s) ? null : "a string or an array", "mustBeStringOrArray"), O$ = P2((s) => typeof s == "string" || s instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array"), Le = P2((s) => typeof s == "string" || s instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
    function d(s, l, u, H) {
      let M = s[u];
      if (l[u + ""] = true, M === void 0)
        return;
      let y = H(M);
      if (y !== null)
        throw new Error(`${K(u)} must be ${y}`);
      return M;
    }
    P2(d, "getFlag");
    function fB(s, l, u) {
      for (let H in s)
        if (!(H in l))
          throw new Error(`Invalid option ${u}: ${K(H)}`);
    }
    P2(fB, "checkForInvalidFlags");
    function We(s) {
      let l = /* @__PURE__ */ Object.create(null), u = d(s, l, "wasmURL", Le), H = d(s, l, "wasmModule", De), M = d(s, l, "worker", N);
      return fB(s, l, "in initialize() call"), { wasmURL: u, wasmModule: H, worker: M };
    }
    P2(We, "validateInitializeOptions");
    function G$(s) {
      let l;
      if (s !== void 0) {
        l = /* @__PURE__ */ Object.create(null);
        for (let u in s) {
          let H = s[u];
          if (typeof H == "string" || H === false)
            l[u] = H;
          else
            throw new Error(`Expected ${K(u)} in mangle cache to map to either a string or false`);
        }
      }
      return l;
    }
    P2(G$, "validateMangleCache");
    function p7(s, l, u, H, M) {
      let y = d(l, u, "color", N), S = d(l, u, "logLevel", F), D = d(l, u, "logLimit", DB);
      y !== void 0 ? s.push(`--color=${y}`) : H && s.push("--color=true"), s.push(`--log-level=${S || M}`), s.push(`--log-limit=${D || 0}`);
    }
    P2(p7, "pushLogFlags");
    function HB(s, l, u) {
      if (typeof s != "string")
        throw new Error(`Expected value for ${l}${u !== void 0 ? " " + K(u) : ""} to be a string, got ${typeof s} instead`);
      return s;
    }
    P2(HB, "validateStringValue");
    function q$(s, l, u) {
      let H = d(l, u, "legalComments", F), M = d(l, u, "sourceRoot", F), y = d(l, u, "sourcesContent", N), S = d(l, u, "target", Ue), D = d(l, u, "format", F), b = d(l, u, "globalName", F), O = d(l, u, "mangleProps", RB), V = d(l, u, "reserveProps", RB), Z = d(l, u, "mangleQuoted", N), $B = d(l, u, "minify", N), G = d(l, u, "minifySyntax", N), BB = d(l, u, "minifyWhitespace", N), U = d(l, u, "minifyIdentifiers", N), kB = d(l, u, "drop", XB), EB = d(l, u, "charset", F), _ = d(l, u, "treeShaking", N), g = d(l, u, "ignoreAnnotations", N), h = d(l, u, "jsx", F), X = d(l, u, "jsxFactory", F), v = d(l, u, "jsxFragment", F), R = d(l, u, "jsxImportSource", F), L = d(l, u, "jsxDev", N), x = d(l, u, "jsxSideEffects", N), a = d(l, u, "define", BA), T = d(l, u, "logOverride", BA), w = d(l, u, "supported", BA), C = d(l, u, "pure", XB), q = d(l, u, "keepNames", N), eB = d(l, u, "platform", F);
      if (H && s.push(`--legal-comments=${H}`), M !== void 0 && s.push(`--source-root=${M}`), y !== void 0 && s.push(`--sources-content=${y}`), S && (Array.isArray(S) ? s.push(`--target=${Array.from(S).map(z).join(",")}`) : s.push(`--target=${z(S)}`)), D && s.push(`--format=${D}`), b && s.push(`--global-name=${b}`), eB && s.push(`--platform=${eB}`), $B && s.push("--minify"), G && s.push("--minify-syntax"), BB && s.push("--minify-whitespace"), U && s.push("--minify-identifiers"), EB && s.push(`--charset=${EB}`), _ !== void 0 && s.push(`--tree-shaking=${_}`), g && s.push("--ignore-annotations"), kB)
        for (let J of kB)
          s.push(`--drop:${HB(J, "drop")}`);
      if (O && s.push(`--mangle-props=${O.source}`), V && s.push(`--reserve-props=${V.source}`), Z !== void 0 && s.push(`--mangle-quoted=${Z}`), h && s.push(`--jsx=${h}`), X && s.push(`--jsx-factory=${X}`), v && s.push(`--jsx-fragment=${v}`), R && s.push(`--jsx-import-source=${R}`), L && s.push("--jsx-dev"), x && s.push("--jsx-side-effects"), a)
        for (let J in a) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${J}`);
          s.push(`--define:${J}=${HB(a[J], "define", J)}`);
        }
      if (T)
        for (let J in T) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid log override: ${J}`);
          s.push(`--log-override:${J}=${HB(T[J], "log override", J)}`);
        }
      if (w)
        for (let J in w) {
          if (J.indexOf("=") >= 0)
            throw new Error(`Invalid supported: ${J}`);
          let AB = w[J];
          if (typeof AB != "boolean")
            throw new Error(`Expected value for supported ${K(J)} to be a boolean, got ${typeof AB} instead`);
          s.push(`--supported:${J}=${AB}`);
        }
      if (C)
        for (let J of C)
          s.push(`--pure:${HB(J, "pure")}`);
      q && s.push("--keep-names");
    }
    P2(q$, "pushCommonFlags");
    function Ne(s, l, u, H, M) {
      var y;
      let S = [], D = [], b = /* @__PURE__ */ Object.create(null), O = null, V = null, Z = null;
      p7(S, l, b, u, H), q$(S, l, b);
      let $B = d(l, b, "sourcemap", N$), G = d(l, b, "bundle", N), BB = d(l, b, "watch", iB), U = d(l, b, "splitting", N), kB = d(l, b, "preserveSymlinks", N), EB = d(l, b, "metafile", N), _ = d(l, b, "outfile", F), g = d(l, b, "outdir", F), h = d(l, b, "outbase", F), X = d(l, b, "tsconfig", F), v = d(l, b, "resolveExtensions", XB), R = d(l, b, "nodePaths", XB), L = d(l, b, "mainFields", XB), x = d(l, b, "conditions", XB), a = d(l, b, "external", XB), T = d(l, b, "packages", F), w = d(l, b, "alias", BA), C = d(l, b, "loader", BA), q = d(l, b, "outExtension", BA), eB = d(l, b, "publicPath", F), J = d(l, b, "entryNames", F), AB = d(l, b, "chunkNames", F), SB = d(l, b, "assetNames", F), MB = d(l, b, "inject", XB), QB = d(l, b, "banner", BA), rB = d(l, b, "footer", BA), PB = d(l, b, "entryPoints", Ie), bB = d(l, b, "absWorkingDir", F), yB = d(l, b, "stdin", BA), dA = (y = d(l, b, "write", N)) != null ? y : M, KA = d(l, b, "allowOverwrite", N), EA = d(l, b, "incremental", N) === true, AA = d(l, b, "mangleCache", BA);
      if (b.plugins = true, fB(l, b, `in ${s}() call`), $B && S.push(`--sourcemap${$B === true ? "" : `=${$B}`}`), G && S.push("--bundle"), KA && S.push("--allow-overwrite"), BB)
        if (S.push("--watch"), typeof BB == "boolean")
          Z = {};
        else {
          let W = /* @__PURE__ */ Object.create(null), dB = d(BB, W, "onRebuild", L7);
          fB(BB, W, `on "watch" in ${s}() call`), Z = { onRebuild: dB };
        }
      if (U && S.push("--splitting"), kB && S.push("--preserve-symlinks"), EB && S.push("--metafile"), _ && S.push(`--outfile=${_}`), g && S.push(`--outdir=${g}`), h && S.push(`--outbase=${h}`), X && S.push(`--tsconfig=${X}`), T && S.push(`--packages=${T}`), v) {
        let W = [];
        for (let dB of v) {
          if (HB(dB, "resolve extension"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${dB}`);
          W.push(dB);
        }
        S.push(`--resolve-extensions=${W.join(",")}`);
      }
      if (eB && S.push(`--public-path=${eB}`), J && S.push(`--entry-names=${J}`), AB && S.push(`--chunk-names=${AB}`), SB && S.push(`--asset-names=${SB}`), L) {
        let W = [];
        for (let dB of L) {
          if (HB(dB, "main field"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${dB}`);
          W.push(dB);
        }
        S.push(`--main-fields=${W.join(",")}`);
      }
      if (x) {
        let W = [];
        for (let dB of x) {
          if (HB(dB, "condition"), dB.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${dB}`);
          W.push(dB);
        }
        S.push(`--conditions=${W.join(",")}`);
      }
      if (a)
        for (let W of a)
          S.push(`--external:${HB(W, "external")}`);
      if (w)
        for (let W in w) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid package name in alias: ${W}`);
          S.push(`--alias:${W}=${HB(w[W], "alias", W)}`);
        }
      if (QB)
        for (let W in QB) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${W}`);
          S.push(`--banner:${W}=${HB(QB[W], "banner", W)}`);
        }
      if (rB)
        for (let W in rB) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${W}`);
          S.push(`--footer:${W}=${HB(rB[W], "footer", W)}`);
        }
      if (MB)
        for (let W of MB)
          S.push(`--inject:${HB(W, "inject")}`);
      if (C)
        for (let W in C) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${W}`);
          S.push(`--loader:${W}=${HB(C[W], "loader", W)}`);
        }
      if (q)
        for (let W in q) {
          if (W.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${W}`);
          S.push(`--out-extension:${W}=${HB(q[W], "out extension", W)}`);
        }
      if (PB)
        if (Array.isArray(PB))
          for (let W of PB)
            D.push(["", HB(W, "entry point")]);
        else
          for (let W in PB)
            D.push([W, HB(PB[W], "entry point", W)]);
      if (yB) {
        let W = /* @__PURE__ */ Object.create(null), dB = d(yB, W, "contents", O$), z$ = d(yB, W, "resolveDir", F), Y$ = d(yB, W, "sourcefile", F), Z$ = d(yB, W, "loader", F);
        fB(yB, W, 'in "stdin" object'), Y$ && S.push(`--sourcefile=${Y$}`), Z$ && S.push(`--loader=${Z$}`), z$ && (V = z$), typeof dB == "string" ? O = c(dB) : dB instanceof Uint8Array && (O = dB);
      }
      let vA = [];
      if (R)
        for (let W of R)
          W += "", vA.push(W);
      return { entries: D, flags: S, write: dA, stdinContents: O, stdinResolveDir: V, absWorkingDir: bB, incremental: EA, nodePaths: vA, watch: Z, mangleCache: G$(AA) };
    }
    P2(Ne, "flagsForBuildOptions");
    function Oe(s, l, u, H) {
      let M = [], y = /* @__PURE__ */ Object.create(null);
      p7(M, l, y, u, H), q$(M, l, y);
      let S = d(l, y, "sourcemap", N$), D = d(l, y, "tsconfigRaw", Fe), b = d(l, y, "sourcefile", F), O = d(l, y, "loader", F), V = d(l, y, "banner", F), Z = d(l, y, "footer", F), $B = d(l, y, "mangleCache", BA);
      return fB(l, y, `in ${s}() call`), S && M.push(`--sourcemap=${S === true ? "external" : S}`), D && M.push(`--tsconfig-raw=${typeof D == "string" ? D : JSON.stringify(D)}`), b && M.push(`--sourcefile=${b}`), O && M.push(`--loader=${O}`), V && M.push(`--banner=${V}`), Z && M.push(`--footer=${Z}`), { flags: M, mangleCache: G$($B) };
    }
    P2(Oe, "flagsForTransformOptions");
    function Ge(s) {
      let l = {}, u = { didClose: false, reason: "" }, H = {}, M = 0, y = 0, S = new Uint8Array(16 * 1024), D = 0, b = P2((g) => {
        let h = D + g.length;
        if (h > S.length) {
          let v = new Uint8Array(h * 2);
          v.set(S), S = v;
        }
        S.set(g, D), D += g.length;
        let X = 0;
        for (; X + 4 <= D; ) {
          let v = f(S, X);
          if (X + 4 + v > D)
            break;
          X += 4, BB(S.subarray(X, X + v)), X += v;
        }
        X > 0 && (S.copyWithin(0, X, D), D -= X);
      }, "readFromStdout"), O = P2((g) => {
        u.didClose = true, g && (u.reason = ": " + (g.message || g));
        let h = "The service was stopped" + u.reason;
        for (let X in H)
          H[X](h, null);
        H = {};
      }, "afterClose"), V = P2((g, h, X) => {
        if (u.didClose)
          return X("The service is no longer running" + u.reason, null);
        let v = M++;
        H[v] = (R, L) => {
          try {
            X(R, L);
          } finally {
            g && g.unref();
          }
        }, g && g.ref(), s.writeToStdin(j({ id: v, isRequest: true, value: h }));
      }, "sendRequest"), Z = P2((g, h) => {
        if (u.didClose)
          throw new Error("The service is no longer running" + u.reason);
        s.writeToStdin(j({ id: g, isRequest: false, value: h }));
      }, "sendResponse"), $B = P2((g, h) => n(this, null, function* () {
        try {
          if (h.command === "ping") {
            Z(g, {});
            return;
          }
          if (typeof h.key == "number") {
            let X = l[h.key];
            if (X) {
              let v = X[h.command];
              if (v) {
                yield v(g, h);
                return;
              }
            }
          }
          throw new Error("Invalid command: " + h.command);
        } catch (X) {
          Z(g, { errors: [HA(X, s, null, void 0, "")] });
        }
      }), "handleRequest"), G = true, BB = P2((g) => {
        if (G) {
          G = false;
          let X = String.fromCharCode(...g);
          if (X !== "0.16.14")
            throw new Error(`Cannot start service: Host version "0.16.14" does not match binary version ${K(X)}`);
          return;
        }
        let h = o(g);
        if (h.isRequest)
          $B(h.id, h.value);
        else {
          let X = H[h.id];
          delete H[h.id], h.value.error ? X(h.value.error, {}) : X(null, h.value);
        }
      }, "handleIncomingPacket");
      return { readFromStdout: b, afterClose: O, service: { buildOrServe: P2(({ callName: g, refs: h, serveOptions: X, options: v, isTTY: R, defaultWD: L, callback: x }) => {
        let a = 0, T = y++, w = {}, C = { ref() {
          ++a === 1 && h && h.ref();
        }, unref() {
          --a === 0 && (delete l[T], h && h.unref());
        } };
        l[T] = w, C.ref(), qe(g, T, V, Z, C, s, w, v, X, R, L, u, (q, eB) => {
          try {
            x(q, eB);
          } finally {
            C.unref();
          }
        });
      }, "buildOrServe"), transform: P2(({ callName: g, refs: h, input: X, options: v, isTTY: R, fs: L, callback: x }) => {
        let a = K$(), T = P2((w) => {
          try {
            if (typeof X != "string" && !(X instanceof Uint8Array))
              throw new Error('The input to "transform" must be a string or a Uint8Array');
            let { flags: C, mangleCache: q } = Oe(g, v, R, lB), eB = { command: "transform", flags: C, inputFS: w !== null, input: w !== null ? c(w) : typeof X == "string" ? c(X) : X };
            q && (eB.mangleCache = q), V(h, eB, (J, AB) => {
              if (J)
                return x(new Error(J), null);
              let SB = lA(AB.errors, a), MB = lA(AB.warnings, a), QB = 1, rB = P2(() => {
                if (--QB === 0) {
                  let PB = { warnings: MB, code: AB.code, map: AB.map };
                  "legalComments" in AB && (PB.legalComments = AB?.legalComments), AB.mangleCache && (PB.mangleCache = AB?.mangleCache), x(null, PB);
                }
              }, "next");
              if (SB.length > 0)
                return x(bA("Transform failed", SB, MB), null);
              AB.codeFS && (QB++, L.readFile(AB.code, (PB, bB) => {
                PB !== null ? x(PB, null) : (AB.code = bB, rB());
              })), AB.mapFS && (QB++, L.readFile(AB.map, (PB, bB) => {
                PB !== null ? x(PB, null) : (AB.map = bB, rB());
              })), rB();
            });
          } catch (C) {
            let q = [];
            try {
              p7(q, v, {}, R, lB);
            } catch {
            }
            let eB = HA(C, s, a, void 0, "");
            V(h, { command: "error", flags: q, error: eB }, () => {
              eB.detail = a.load(eB.detail), x(bA("Transform failed", [eB], []), null);
            });
          }
        }, "start");
        if ((typeof X == "string" || X instanceof Uint8Array) && X.length > 1024 * 1024) {
          let w = T;
          T = P2(() => L.writeFile(X, w), "start");
        }
        T(null);
      }, "transform2"), formatMessages: P2(({ callName: g, refs: h, messages: X, options: v, callback: R }) => {
        let L = QA(X, "messages", null, "");
        if (!v)
          throw new Error(`Missing second argument in ${g}() call`);
        let x = {}, a = d(v, x, "kind", F), T = d(v, x, "color", N), w = d(v, x, "terminalWidth", DB);
        if (fB(v, x, `in ${g}() call`), a === void 0)
          throw new Error(`Missing "kind" in ${g}() call`);
        if (a !== "error" && a !== "warning")
          throw new Error(`Expected "kind" to be "error" or "warning" in ${g}() call`);
        let C = { command: "format-msgs", messages: L, isWarning: a === "warning" };
        T !== void 0 && (C.color = T), w !== void 0 && (C.terminalWidth = w), V(h, C, (q, eB) => {
          if (q)
            return R(new Error(q), null);
          R(null, eB.messages);
        });
      }, "formatMessages2"), analyzeMetafile: P2(({ callName: g, refs: h, metafile: X, options: v, callback: R }) => {
        v === void 0 && (v = {});
        let L = {}, x = d(v, L, "color", N), a = d(v, L, "verbose", N);
        fB(v, L, `in ${g}() call`);
        let T = { command: "analyze-metafile", metafile: X };
        x !== void 0 && (T.color = x), a !== void 0 && (T.verbose = a), V(h, T, (w, C) => {
          if (w)
            return R(new Error(w), null);
          R(null, C.result);
        });
      }, "analyzeMetafile2") } };
    }
    P2(Ge, "createChannel");
    function qe(s, l, u, H, M, y, S, D, b, O, V, Z, $B) {
      let G = K$(), BB = P2((_, g, h, X) => {
        let v = [];
        try {
          p7(v, D, {}, O, sB);
        } catch {
        }
        let R = HA(_, y, G, h, g);
        u(M, { command: "error", flags: v, error: R }, () => {
          R.detail = G.load(R.detail), X(R);
        });
      }, "logPluginError"), U = P2((_, g) => {
        BB(_, g, void 0, (h) => {
          $B(bA("Build failed", [h], []), null);
        });
      }, "handleError"), kB;
      if (typeof D == "object") {
        let _ = D.plugins;
        if (_ !== void 0) {
          if (!Array.isArray(_))
            throw new Error('"plugins" must be an array');
          kB = _;
        }
      }
      if (kB && kB.length > 0) {
        if (y.isSync) {
          U(new Error("Cannot use plugins in synchronous API calls"), "");
          return;
        }
        Ve(l, u, H, M, y, S, D, kB, G).then((_) => {
          if (!_.ok) {
            U(_.error, _.pluginName);
            return;
          }
          try {
            EB(_.requestPlugins, _.runOnEndCallbacks);
          } catch (g) {
            U(g, "");
          }
        }, (_) => U(_, ""));
        return;
      }
      try {
        EB(null, (_, g, h) => h());
      } catch (_) {
        U(_, "");
      }
      function EB(_, g) {
        let h = !y.isWriteUnavailable, { entries: X, flags: v, write: R, stdinContents: L, stdinResolveDir: x, absWorkingDir: a, incremental: T, nodePaths: w, watch: C, mangleCache: q } = Ne(s, D, O, sB, h), eB = { command: "build", key: l, entries: X, flags: v, write: R, stdinContents: L, stdinResolveDir: x, absWorkingDir: a || V, incremental: T, nodePaths: w };
        _ && (eB.plugins = _), q && (eB.mangleCache = q);
        let J = b && Ke(l, u, H, M, S, b, eB), AB, SB, MB = P2((rB, PB) => {
          rB.outputFiles && (PB.outputFiles = rB.outputFiles.map(Je)), rB.metafile && (PB.metafile = JSON.parse(rB.metafile)), rB.mangleCache && (PB.mangleCache = rB.mangleCache), rB.writeToStdout !== void 0 && console.log(p(rB.writeToStdout).replace(/\n$/, ""));
        }, "copyResponseToResult"), QB = P2((rB, PB) => {
          let bB = { errors: lA(rB.errors, G), warnings: lA(rB.warnings, G) };
          MB(rB, bB), g(bB, BB, () => {
            if (bB.errors.length > 0)
              return PB(bA("Build failed", bB.errors, bB.warnings), null);
            if (rB.rebuild) {
              if (!AB) {
                let yB = false;
                AB = P2(() => new Promise((dA, KA) => {
                  if (yB || Z.didClose)
                    throw new Error("Cannot rebuild");
                  u(M, { command: "rebuild", key: l }, (EA, AA) => {
                    if (EA)
                      return PB(bA("Build failed", [{ id: "", pluginName: "", text: EA, location: null, notes: [], detail: void 0 }], []), null);
                    QB(AA, (vA, W) => {
                      vA ? KA(vA) : dA(W);
                    });
                  });
                }), "rebuild"), M.ref(), AB.dispose = () => {
                  yB || (yB = true, u(M, { command: "rebuild-dispose", key: l }, () => {
                  }), M.unref());
                };
              }
              bB.rebuild = AB;
            }
            if (rB.watch) {
              if (!SB) {
                let yB = false;
                M.ref(), SB = P2(() => {
                  yB || (yB = true, delete S["watch-rebuild"], u(M, { command: "watch-stop", key: l }, () => {
                  }), M.unref());
                }, "stop"), C && (S["watch-rebuild"] = (dA, KA) => {
                  try {
                    let EA = KA.args, AA = { errors: lA(EA.errors, G), warnings: lA(EA.warnings, G) };
                    MB(EA, AA), g(AA, BB, () => {
                      if (AA.errors.length > 0) {
                        C.onRebuild && C.onRebuild(bA("Build failed", AA.errors, AA.warnings), null);
                        return;
                      }
                      AA.stop = SB, C.onRebuild && C.onRebuild(null, AA);
                    });
                  } catch (EA) {
                    console.error(EA);
                  }
                  H(dA, {});
                });
              }
              bB.stop = SB;
            }
            PB(null, bB);
          });
        }, "buildResponseToResult");
        if (R && y.isWriteUnavailable)
          throw new Error('The "write" option is unavailable in this environment');
        if (T && y.isSync)
          throw new Error('Cannot use "incremental" with a synchronous build');
        if (C && y.isSync)
          throw new Error('Cannot use "watch" with a synchronous build');
        u(M, eB, (rB, PB) => {
          if (rB)
            return $B(new Error(rB), null);
          if (J) {
            let bB = PB, yB = false;
            M.ref();
            let dA = { port: bB.port, host: bB.host, wait: J.wait, stop() {
              yB || (yB = true, J.stop(), M.unref());
            } };
            return M.ref(), J.wait.then(M.unref, M.unref), $B(null, dA);
          }
          return QB(PB, $B);
        });
      }
      P2(EB, "buildOrServeContinue");
    }
    P2(qe, "buildOrServeImpl");
    var Ke = P2((s, l, u, H, M, y, S) => {
      let D = {}, b = d(y, D, "port", DB), O = d(y, D, "host", F), V = d(y, D, "servedir", F), Z = d(y, D, "onRequest", L7), $B = new Promise((G, BB) => {
        M["serve-wait"] = (U, kB) => {
          kB.error !== null ? BB(new Error(kB.error)) : G(), u(U, {});
        };
      });
      return S.serve = {}, fB(y, D, "in serve() call"), b !== void 0 && (S.serve.port = b), O !== void 0 && (S.serve.host = O), V !== void 0 && (S.serve.servedir = V), M["serve-request"] = (G, BB) => {
        Z && Z(BB.args), u(G, {});
      }, { wait: $B, stop() {
        l(H, { command: "serve-stop", key: s }, () => {
        });
      } };
    }, "buildServeData"), Ve = P2((s, l, u, H, M, y, S, D, b) => n(void 0, null, function* () {
      let O = [], V = [], Z = {}, $B = {}, G = 0, BB = 0, U = [], kB = false;
      D = [...D];
      for (let _ of D) {
        let g = {};
        if (typeof _ != "object")
          throw new Error(`Plugin at index ${BB} must be an object`);
        let h = d(_, g, "name", F);
        if (typeof h != "string" || h === "")
          throw new Error(`Plugin at index ${BB} is missing a name`);
        try {
          let X = d(_, g, "setup", L7);
          if (typeof X != "function")
            throw new Error("Plugin is missing a setup function");
          fB(_, g, `on plugin ${K(h)}`);
          let v = { name: h, onResolve: [], onLoad: [] };
          BB++;
          let L = X({ initialOptions: S, resolve: P2((x, a = {}) => {
            if (!kB)
              throw new Error('Cannot call "resolve" before plugin setup has completed');
            if (typeof x != "string")
              throw new Error("The path to resolve must be a string");
            let T = /* @__PURE__ */ Object.create(null), w = d(a, T, "pluginName", F), C = d(a, T, "importer", F), q = d(a, T, "namespace", F), eB = d(a, T, "resolveDir", F), J = d(a, T, "kind", F), AB = d(a, T, "pluginData", I);
            return fB(a, T, "in resolve() call"), new Promise((SB, MB) => {
              let QB = { command: "resolve", path: x, key: s, pluginName: h };
              if (w != null && (QB.pluginName = w), C != null && (QB.importer = C), q != null && (QB.namespace = q), eB != null && (QB.resolveDir = eB), J != null)
                QB.kind = J;
              else
                throw new Error('Must specify "kind" when calling "resolve"');
              AB != null && (QB.pluginData = b.store(AB)), l(H, QB, (rB, PB) => {
                rB !== null ? MB(new Error(rB)) : SB({ errors: lA(PB.errors, b), warnings: lA(PB.warnings, b), path: PB.path, external: PB.external, sideEffects: PB.sideEffects, namespace: PB.namespace, suffix: PB.suffix, pluginData: b.load(PB.pluginData) });
              });
            });
          }, "resolve"), onStart(x) {
            let a = 'This error came from the "onStart" callback registered here:', T = u7(new Error(a), M, "onStart");
            O.push({ name: h, callback: x, note: T });
          }, onEnd(x) {
            let a = 'This error came from the "onEnd" callback registered here:', T = u7(new Error(a), M, "onEnd");
            V.push({ name: h, callback: x, note: T });
          }, onResolve(x, a) {
            let T = 'This error came from the "onResolve" callback registered here:', w = u7(new Error(T), M, "onResolve"), C = {}, q = d(x, C, "filter", RB), eB = d(x, C, "namespace", F);
            if (fB(x, C, `in onResolve() call for plugin ${K(h)}`), q == null)
              throw new Error("onResolve() call is missing a filter");
            let J = G++;
            Z[J] = { name: h, callback: a, note: w }, v.onResolve.push({ id: J, filter: q.source, namespace: eB || "" });
          }, onLoad(x, a) {
            let T = 'This error came from the "onLoad" callback registered here:', w = u7(new Error(T), M, "onLoad"), C = {}, q = d(x, C, "filter", RB), eB = d(x, C, "namespace", F);
            if (fB(x, C, `in onLoad() call for plugin ${K(h)}`), q == null)
              throw new Error("onLoad() call is missing a filter");
            let J = G++;
            $B[J] = { name: h, callback: a, note: w }, v.onLoad.push({ id: J, filter: q.source, namespace: eB || "" });
          }, esbuild: M.esbuild });
          L && (yield L), U.push(v);
        } catch (X) {
          return { ok: false, error: X, pluginName: h };
        }
      }
      y["on-start"] = (_, g) => n(void 0, null, function* () {
        let h = { errors: [], warnings: [] };
        yield Promise.all(O.map((X) => n(void 0, [X], function* ({ name: v, callback: R, note: L }) {
          try {
            let x = yield R();
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onStart() callback in plugin ${K(v)} to return an object`);
              let a = {}, T = d(x, a, "errors", XB), w = d(x, a, "warnings", XB);
              fB(x, a, `from onStart() callback in plugin ${K(v)}`), T != null && h.errors.push(...QA(T, "errors", b, v)), w != null && h.warnings.push(...QA(w, "warnings", b, v));
            }
          } catch (x) {
            h.errors.push(HA(x, M, b, L && L(), v));
          }
        }))), u(_, h);
      }), y["on-resolve"] = (_, g) => n(void 0, null, function* () {
        let h = {}, X = "", v, R;
        for (let L of g.ids)
          try {
            ({ name: X, callback: v, note: R } = Z[L]);
            let x = yield v({ path: g.path, importer: g.importer, namespace: g.namespace, resolveDir: g.resolveDir, kind: g.kind, pluginData: b.load(g.pluginData) });
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onResolve() callback in plugin ${K(X)} to return an object`);
              let a = {}, T = d(x, a, "pluginName", F), w = d(x, a, "path", F), C = d(x, a, "namespace", F), q = d(x, a, "suffix", F), eB = d(x, a, "external", N), J = d(x, a, "sideEffects", N), AB = d(x, a, "pluginData", I), SB = d(x, a, "errors", XB), MB = d(x, a, "warnings", XB), QB = d(x, a, "watchFiles", XB), rB = d(x, a, "watchDirs", XB);
              fB(x, a, `from onResolve() callback in plugin ${K(X)}`), h.id = L, T != null && (h.pluginName = T), w != null && (h.path = w), C != null && (h.namespace = C), q != null && (h.suffix = q), eB != null && (h.external = eB), J != null && (h.sideEffects = J), AB != null && (h.pluginData = b.store(AB)), SB != null && (h.errors = QA(SB, "errors", b, X)), MB != null && (h.warnings = QA(MB, "warnings", b, X)), QB != null && (h.watchFiles = c7(QB, "watchFiles")), rB != null && (h.watchDirs = c7(rB, "watchDirs"));
              break;
            }
          } catch (x) {
            h = { id: L, errors: [HA(x, M, b, R && R(), X)] };
            break;
          }
        u(_, h);
      }), y["on-load"] = (_, g) => n(void 0, null, function* () {
        let h = {}, X = "", v, R;
        for (let L of g.ids)
          try {
            ({ name: X, callback: v, note: R } = $B[L]);
            let x = yield v({ path: g.path, namespace: g.namespace, suffix: g.suffix, pluginData: b.load(g.pluginData) });
            if (x != null) {
              if (typeof x != "object")
                throw new Error(`Expected onLoad() callback in plugin ${K(X)} to return an object`);
              let a = {}, T = d(x, a, "pluginName", F), w = d(x, a, "contents", O$), C = d(x, a, "resolveDir", F), q = d(x, a, "pluginData", I), eB = d(x, a, "loader", F), J = d(x, a, "errors", XB), AB = d(x, a, "warnings", XB), SB = d(x, a, "watchFiles", XB), MB = d(x, a, "watchDirs", XB);
              fB(x, a, `from onLoad() callback in plugin ${K(X)}`), h.id = L, T != null && (h.pluginName = T), w instanceof Uint8Array ? h.contents = w : w != null && (h.contents = c(w)), C != null && (h.resolveDir = C), q != null && (h.pluginData = b.store(q)), eB != null && (h.loader = eB), J != null && (h.errors = QA(J, "errors", b, X)), AB != null && (h.warnings = QA(AB, "warnings", b, X)), SB != null && (h.watchFiles = c7(SB, "watchFiles")), MB != null && (h.watchDirs = c7(MB, "watchDirs"));
              break;
            }
          } catch (x) {
            h = { id: L, errors: [HA(x, M, b, R && R(), X)] };
            break;
          }
        u(_, h);
      });
      let EB = P2((_, g, h) => h(), "runOnEndCallbacks");
      return V.length > 0 && (EB = P2((_, g, h) => {
        (() => n(void 0, null, function* () {
          for (let { name: X, callback: v, note: R } of V)
            try {
              yield v(_);
            } catch (L) {
              _.errors.push(yield new Promise((x) => g(L, X, R && R(), x)));
            }
        }))().then(h);
      }, "runOnEndCallbacks")), kB = true, { ok: true, requestPlugins: U, runOnEndCallbacks: EB };
    }), "handlePlugins");
    function K$() {
      let s = /* @__PURE__ */ new Map(), l = 0;
      return { load(u) {
        return s.get(u);
      }, store(u) {
        if (u === void 0)
          return -1;
        let H = l++;
        return s.set(H, u), H;
      } };
    }
    P2(K$, "createObjectStash");
    function u7(s, l, u) {
      let H, M = false;
      return () => {
        if (M)
          return H;
        M = true;
        try {
          let y = (s.stack + "").split(`
`);
          y.splice(1, 1);
          let S = V$(l, y, u);
          if (S)
            return H = { text: s.message, location: S }, H;
        } catch {
        }
      };
    }
    P2(u7, "extractCallerV8");
    function HA(s, l, u, H, M) {
      let y = "Internal error", S = null;
      try {
        y = (s && s.message || s) + "";
      } catch {
      }
      try {
        S = V$(l, (s.stack + "").split(`
`), "");
      } catch {
      }
      return { id: "", pluginName: M, text: y, location: S, notes: H ? [H] : [], detail: u ? u.store(s) : -1 };
    }
    P2(HA, "extractErrorMessageV8");
    function V$(s, l, u) {
      let H = "    at ";
      if (s.readFileSync && !l[0].startsWith(H) && l[1].startsWith(H))
        for (let M = 1; M < l.length; M++) {
          let y = l[M];
          if (y.startsWith(H))
            for (y = y.slice(H.length); ; ) {
              let S = /^(?:new |async )?\S+ \((.*)\)$/.exec(y);
              if (S) {
                y = S[1];
                continue;
              }
              if (S = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y), S) {
                y = S[1];
                continue;
              }
              if (S = /^(\S+):(\d+):(\d+)$/.exec(y), S) {
                let D;
                try {
                  D = s.readFileSync(S[1], "utf8");
                } catch {
                  break;
                }
                let b = D.split(/\r\n|\r|\n|\u2028|\u2029/)[+S[2] - 1] || "", O = +S[3] - 1, V = b.slice(O, O + u.length) === u ? u.length : 0;
                return { file: S[1], namespace: "file", line: +S[2], column: c(b.slice(0, O)).length, length: c(b.slice(O, O + V)).length, lineText: b + `
` + l.slice(1).join(`
`), suggestion: "" };
              }
              break;
            }
        }
      return null;
    }
    P2(V$, "parseStackLinesV8");
    function bA(s, l, u) {
      let H = 5, M = l.length < 1 ? "" : ` with ${l.length} error${l.length < 2 ? "" : "s"}:` + l.slice(0, H + 1).map((S, D) => {
        if (D === H)
          return `
...`;
        if (!S.location)
          return `
error: ${S.text}`;
        let { file: b, line: O, column: V } = S.location, Z = S.pluginName ? `[plugin: ${S.pluginName}] ` : "";
        return `
${b}:${O}:${V}: ERROR: ${Z}${S.text}`;
      }).join(""), y = new Error(`${s}${M}`);
      return y.errors = l, y.warnings = u, y;
    }
    P2(bA, "failureErrorWithLog");
    function lA(s, l) {
      for (let u of s)
        u.detail = l.load(u.detail);
      return s;
    }
    P2(lA, "replaceDetailsInMessages");
    function J$(s, l) {
      if (s == null)
        return null;
      let u = {}, H = d(s, u, "file", F), M = d(s, u, "namespace", F), y = d(s, u, "line", DB), S = d(s, u, "column", DB), D = d(s, u, "length", DB), b = d(s, u, "lineText", F), O = d(s, u, "suggestion", F);
      return fB(s, u, l), { file: H || "", namespace: M || "", line: y || 0, column: S || 0, length: D || 0, lineText: b || "", suggestion: O || "" };
    }
    P2(J$, "sanitizeLocation");
    function QA(s, l, u, H) {
      let M = [], y = 0;
      for (let S of s) {
        let D = {}, b = d(S, D, "id", F), O = d(S, D, "pluginName", F), V = d(S, D, "text", F), Z = d(S, D, "location", W$), $B = d(S, D, "notes", XB), G = d(S, D, "detail", I), BB = `in element ${y} of "${l}"`;
        fB(S, D, BB);
        let U = [];
        if ($B)
          for (let kB of $B) {
            let EB = {}, _ = d(kB, EB, "text", F), g = d(kB, EB, "location", W$);
            fB(kB, EB, BB), U.push({ text: _ || "", location: J$(g, BB) });
          }
        M.push({ id: b || "", pluginName: O || H, text: V || "", location: J$(Z, BB), notes: U, detail: u ? u.store(G) : -1 }), y++;
      }
      return M;
    }
    P2(QA, "sanitizeMessages");
    function c7(s, l) {
      let u = [];
      for (let H of s) {
        if (typeof H != "string")
          throw new Error(`${K(l)} must be an array of strings`);
        u.push(H);
      }
      return u;
    }
    P2(c7, "sanitizeStringArray");
    function Je({ path: s, contents: l }) {
      let u = null;
      return { path: s, contents: l, get text() {
        let H = this.contents;
        return (u === null || H !== l) && (l = H, u = p(H)), u;
      } };
    }
    P2(Je, "convertOutputFiles");
    var ze = "0.16.14", Ye = P2((s) => h7().build(s), "build"), Ze = P2(() => {
      throw new Error('The "serve" API only works in node');
    }, "serve"), BP = P2((s, l) => h7().transform(s, l), "transform"), AP = P2((s, l) => h7().formatMessages(s, l), "formatMessages"), $P = P2((s, l) => h7().analyzeMetafile(s, l), "analyzeMetafile"), kP = P2(() => {
      throw new Error('The "buildSync" API only works in node');
    }, "buildSync"), eP = P2(() => {
      throw new Error('The "transformSync" API only works in node');
    }, "transformSync"), PP = P2(() => {
      throw new Error('The "formatMessagesSync" API only works in node');
    }, "formatMessagesSync"), tP = P2(() => {
      throw new Error('The "analyzeMetafileSync" API only works in node');
    }, "analyzeMetafileSync"), xA, W7, h7 = P2(() => {
      if (W7)
        return W7;
      throw xA ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, "ensureServiceIsRunning"), EP = P2((s) => {
      s = We(s || {});
      let l = s.wasmURL, u = s.wasmModule, H = s.worker !== false;
      if (!l && !u)
        throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
      if (xA)
        throw new Error('Cannot call "initialize" more than once');
      return xA = rP(l || "", u, H), xA.catch(() => {
        xA = void 0;
      }), xA;
    }, "initialize"), rP = P2((s, l, u) => n(void 0, null, function* () {
      let H;
      if (u) {
        let O = new Blob([`onmessage=((postMessage) => {
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
            // unused
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
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = new Date().getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
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
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                    // setTimeout has been seen to fire up to 1 millisecond early
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
                  sp = this._inst.exports.getsp() >>> 0;
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
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
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
                // func valueNew(v ref, args []ref) (ref, bool)
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
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
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
                // JS values that Go currently has references to, indexed by reference id
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
                // mapping from JS values to reference ids
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
        go.argv = ["", \`--service=\${"0.16.14"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok)
            throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`], { type: "text/javascript" });
        H = new Worker(URL.createObjectURL(O));
      } else {
        let O = ((V) => {
          var Z = P2((U, kB, EB) => new Promise((_, g) => {
            var h = P2((R) => {
              try {
                v(EB.next(R));
              } catch (L) {
                g(L);
              }
            }, "fulfilled"), X = P2((R) => {
              try {
                v(EB.throw(R));
              } catch (L) {
                g(L);
              }
            }, "rejected"), v = P2((R) => R.done ? _(R.value) : Promise.resolve(R.value).then(h, X), "step");
            v((EB = EB.apply(U, kB)).next());
          }), "__async");
          let $B, G = {};
          for (let U = self; U; U = Object.getPrototypeOf(U))
            for (let kB of Object.getOwnPropertyNames(U))
              kB in G || Object.defineProperty(G, kB, { get: () => self[kB] });
          (() => {
            let U = P2(() => {
              let _ = new Error("not implemented");
              return _.code = "ENOSYS", _;
            }, "enosys");
            if (!G.fs) {
              let _ = "";
              G.fs = { constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, writeSync(g, h) {
                _ += EB.decode(h);
                let X = _.lastIndexOf(`
`);
                return X != -1 && (console.log(_.substr(0, X)), _ = _.substr(X + 1)), h.length;
              }, write(g, h, X, v, R, L) {
                if (X !== 0 || v !== h.length || R !== null) {
                  L(U());
                  return;
                }
                let x = this.writeSync(g, h);
                L(null, x);
              }, chmod(g, h, X) {
                X(U());
              }, chown(g, h, X, v) {
                v(U());
              }, close(g, h) {
                h(U());
              }, fchmod(g, h, X) {
                X(U());
              }, fchown(g, h, X, v) {
                v(U());
              }, fstat(g, h) {
                h(U());
              }, fsync(g, h) {
                h(null);
              }, ftruncate(g, h, X) {
                X(U());
              }, lchown(g, h, X, v) {
                v(U());
              }, link(g, h, X) {
                X(U());
              }, lstat(g, h) {
                h(U());
              }, mkdir(g, h, X) {
                X(U());
              }, open(g, h, X, v) {
                v(U());
              }, read(g, h, X, v, R, L) {
                L(U());
              }, readdir(g, h) {
                h(U());
              }, readlink(g, h) {
                h(U());
              }, rename(g, h, X) {
                X(U());
              }, rmdir(g, h) {
                h(U());
              }, stat(g, h) {
                h(U());
              }, symlink(g, h, X) {
                X(U());
              }, truncate(g, h, X) {
                X(U());
              }, unlink(g, h) {
                h(U());
              }, utimes(g, h, X, v) {
                v(U());
              } };
            }
            if (G.process || (G.process = { getuid() {
              return -1;
            }, getgid() {
              return -1;
            }, geteuid() {
              return -1;
            }, getegid() {
              return -1;
            }, getgroups() {
              throw U();
            }, pid: -1, ppid: -1, umask() {
              throw U();
            }, cwd() {
              throw U();
            }, chdir() {
              throw U();
            } }), !G.crypto)
              throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
            if (!G.performance)
              throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
            if (!G.TextEncoder)
              throw new Error("globalThis.TextEncoder is not available, polyfill required");
            if (!G.TextDecoder)
              throw new Error("globalThis.TextDecoder is not available, polyfill required");
            let kB = new TextEncoder("utf-8"), EB = new TextDecoder("utf-8");
            G.Go = class {
              constructor() {
                this.argv = ["js"], this.env = {}, this.exit = (a) => {
                  a !== 0 && console.warn("exit code:", a);
                }, this._exitPromise = new Promise((a) => {
                  this._resolveExitPromise = a;
                }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
                let _ = P2((a, T) => {
                  this.mem.setUint32(a + 0, T, true), this.mem.setUint32(a + 4, Math.floor(T / 4294967296), true);
                }, "setInt64"), g = P2((a) => {
                  let T = this.mem.getUint32(a + 0, true), w = this.mem.getInt32(a + 4, true);
                  return T + w * 4294967296;
                }, "getInt64"), h = P2((a) => {
                  let T = this.mem.getFloat64(a, true);
                  if (T === 0)
                    return;
                  if (!isNaN(T))
                    return T;
                  let w = this.mem.getUint32(a, true);
                  return this._values[w];
                }, "loadValue"), X = P2((a, T) => {
                  if (typeof T == "number" && T !== 0) {
                    if (isNaN(T)) {
                      this.mem.setUint32(a + 4, 2146959360, true), this.mem.setUint32(a, 0, true);
                      return;
                    }
                    this.mem.setFloat64(a, T, true);
                    return;
                  }
                  if (T === void 0) {
                    this.mem.setFloat64(a, 0, true);
                    return;
                  }
                  let C = this._ids.get(T);
                  C === void 0 && (C = this._idPool.pop(), C === void 0 && (C = this._values.length), this._values[C] = T, this._goRefCounts[C] = 0, this._ids.set(T, C)), this._goRefCounts[C]++;
                  let q = 0;
                  switch (typeof T) {
                    case "object":
                      T !== null && (q = 1);
                      break;
                    case "string":
                      q = 2;
                      break;
                    case "symbol":
                      q = 3;
                      break;
                    case "function":
                      q = 4;
                      break;
                  }
                  this.mem.setUint32(a + 4, 2146959360 | q, true), this.mem.setUint32(a, C, true);
                }, "storeValue"), v = P2((a) => {
                  let T = g(a + 0), w = g(a + 8);
                  return new Uint8Array(this._inst.exports.mem.buffer, T, w);
                }, "loadSlice"), R = P2((a) => {
                  let T = g(a + 0), w = g(a + 8), C = new Array(w);
                  for (let q = 0; q < w; q++)
                    C[q] = h(T + q * 8);
                  return C;
                }, "loadSliceOfValues"), L = P2((a) => {
                  let T = g(a + 0), w = g(a + 8);
                  return EB.decode(new DataView(this._inst.exports.mem.buffer, T, w));
                }, "loadString"), x = Date.now() - performance.now();
                this.importObject = { go: { "runtime.wasmExit": (a) => {
                  a >>>= 0;
                  let T = this.mem.getInt32(a + 8, true);
                  this.exited = true, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(T);
                }, "runtime.wasmWrite": (a) => {
                  a >>>= 0;
                  let T = g(a + 8), w = g(a + 16), C = this.mem.getInt32(a + 24, true);
                  G.fs.writeSync(T, new Uint8Array(this._inst.exports.mem.buffer, w, C));
                }, "runtime.resetMemoryDataView": (a) => {
                  a >>>= 0, this.mem = new DataView(this._inst.exports.mem.buffer);
                }, "runtime.nanotime1": (a) => {
                  a >>>= 0, _(a + 8, (x + performance.now()) * 1e6);
                }, "runtime.walltime": (a) => {
                  a >>>= 0;
                  let T = new Date().getTime();
                  _(a + 8, T / 1e3), this.mem.setInt32(a + 16, T % 1e3 * 1e6, true);
                }, "runtime.scheduleTimeoutEvent": (a) => {
                  a >>>= 0;
                  let T = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(T, setTimeout(() => {
                    for (this._resume(); this._scheduledTimeouts.has(T); )
                      console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
                  }, g(a + 8) + 1)), this.mem.setInt32(a + 16, T, true);
                }, "runtime.clearTimeoutEvent": (a) => {
                  a >>>= 0;
                  let T = this.mem.getInt32(a + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(T)), this._scheduledTimeouts.delete(T);
                }, "runtime.getRandomData": (a) => {
                  a >>>= 0, crypto.getRandomValues(v(a + 8));
                }, "syscall/js.finalizeRef": (a) => {
                  a >>>= 0;
                  let T = this.mem.getUint32(a + 8, true);
                  if (this._goRefCounts[T]--, this._goRefCounts[T] === 0) {
                    let w = this._values[T];
                    this._values[T] = null, this._ids.delete(w), this._idPool.push(T);
                  }
                }, "syscall/js.stringVal": (a) => {
                  a >>>= 0, X(a + 24, L(a + 8));
                }, "syscall/js.valueGet": (a) => {
                  a >>>= 0;
                  let T = Reflect.get(h(a + 8), L(a + 16));
                  a = this._inst.exports.getsp() >>> 0, X(a + 32, T);
                }, "syscall/js.valueSet": (a) => {
                  a >>>= 0, Reflect.set(h(a + 8), L(a + 16), h(a + 32));
                }, "syscall/js.valueDelete": (a) => {
                  a >>>= 0, Reflect.deleteProperty(h(a + 8), L(a + 16));
                }, "syscall/js.valueIndex": (a) => {
                  a >>>= 0, X(a + 24, Reflect.get(h(a + 8), g(a + 16)));
                }, "syscall/js.valueSetIndex": (a) => {
                  a >>>= 0, Reflect.set(h(a + 8), g(a + 16), h(a + 24));
                }, "syscall/js.valueCall": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = Reflect.get(T, L(a + 16)), C = R(a + 32), q = Reflect.apply(w, T, C);
                    a = this._inst.exports.getsp() >>> 0, X(a + 56, q), this.mem.setUint8(a + 64, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 56, T), this.mem.setUint8(a + 64, 0);
                  }
                }, "syscall/js.valueInvoke": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = R(a + 16), C = Reflect.apply(T, void 0, w);
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, C), this.mem.setUint8(a + 48, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, T), this.mem.setUint8(a + 48, 0);
                  }
                }, "syscall/js.valueNew": (a) => {
                  a >>>= 0;
                  try {
                    let T = h(a + 8), w = R(a + 16), C = Reflect.construct(T, w);
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, C), this.mem.setUint8(a + 48, 1);
                  } catch (T) {
                    a = this._inst.exports.getsp() >>> 0, X(a + 40, T), this.mem.setUint8(a + 48, 0);
                  }
                }, "syscall/js.valueLength": (a) => {
                  a >>>= 0, _(a + 16, parseInt(h(a + 8).length));
                }, "syscall/js.valuePrepareString": (a) => {
                  a >>>= 0;
                  let T = kB.encode(String(h(a + 8)));
                  X(a + 16, T), _(a + 24, T.length);
                }, "syscall/js.valueLoadString": (a) => {
                  a >>>= 0;
                  let T = h(a + 8);
                  v(a + 16).set(T);
                }, "syscall/js.valueInstanceOf": (a) => {
                  a >>>= 0, this.mem.setUint8(a + 24, h(a + 8) instanceof h(a + 16) ? 1 : 0);
                }, "syscall/js.copyBytesToGo": (a) => {
                  a >>>= 0;
                  let T = v(a + 8), w = h(a + 32);
                  if (!(w instanceof Uint8Array || w instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(a + 48, 0);
                    return;
                  }
                  let C = w.subarray(0, T.length);
                  T.set(C), _(a + 40, C.length), this.mem.setUint8(a + 48, 1);
                }, "syscall/js.copyBytesToJS": (a) => {
                  a >>>= 0;
                  let T = h(a + 8), w = v(a + 16);
                  if (!(T instanceof Uint8Array || T instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(a + 48, 0);
                    return;
                  }
                  let C = w.subarray(0, T.length);
                  T.set(C), _(a + 40, C.length), this.mem.setUint8(a + 48, 1);
                }, debug: (a) => {
                  console.log(a);
                } } };
              }
              run(_) {
                return Z(this, null, function* () {
                  if (!(_ instanceof WebAssembly.Instance))
                    throw new Error("Go.run: WebAssembly.Instance expected");
                  this._inst = _, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [NaN, 0, null, true, false, G, this], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([[0, 1], [null, 2], [true, 3], [false, 4], [G, 5], [this, 6]]), this._idPool = [], this.exited = false;
                  let g = 4096, h = P2((a) => {
                    let T = g, w = kB.encode(a + "\0");
                    return new Uint8Array(this.mem.buffer, g, w.length).set(w), g += w.length, g % 8 !== 0 && (g += 8 - g % 8), T;
                  }, "strPtr"), X = this.argv.length, v = [];
                  this.argv.forEach((a) => {
                    v.push(h(a));
                  }), v.push(0), Object.keys(this.env).sort().forEach((a) => {
                    v.push(h(`${a}=${this.env[a]}`));
                  }), v.push(0);
                  let L = g;
                  v.forEach((a) => {
                    this.mem.setUint32(g, a, true), this.mem.setUint32(g + 4, 0, true), g += 8;
                  });
                  let x = 4096 + 8192;
                  if (g >= x)
                    throw new Error("total length of command line and environment variables exceeds limit");
                  this._inst.exports.run(X, L), this.exited && this._resolveExitPromise(), yield this._exitPromise;
                });
              }
              _resume() {
                if (this.exited)
                  throw new Error("Go program has already exited");
                this._inst.exports.resume(), this.exited && this._resolveExitPromise();
              }
              _makeFuncWrapper(_) {
                let g = this;
                return function() {
                  let h = { id: _, this: this, args: arguments };
                  return g._pendingEvent = h, g._resume(), h.result;
                };
              }
            };
          })(), $B = P2(({ data: U }) => {
            let kB = new TextDecoder(), EB = G.fs, _ = "";
            EB.writeSync = (R, L) => {
              if (R === 1)
                V(L);
              else if (R === 2) {
                _ += kB.decode(L);
                let x = _.split(`
`);
                x.length > 1 && console.log(x.slice(0, -1).join(`
`)), _ = x[x.length - 1];
              } else
                throw new Error("Bad write");
              return L.length;
            };
            let g = [], h, X = 0;
            $B = P2(({ data: R }) => {
              R.length > 0 && (g.push(R), h && h());
            }, "onmessage"), EB.read = (R, L, x, a, T, w) => {
              if (R !== 0 || x !== 0 || a !== L.length || T !== null)
                throw new Error("Bad read");
              if (g.length === 0) {
                h = P2(() => EB.read(R, L, x, a, T, w), "resumeStdin");
                return;
              }
              let C = g[0], q = Math.max(0, Math.min(a, C.length - X));
              L.set(C.subarray(X, X + q), x), X += q, X === C.length && (g.shift(), X = 0), w(null, q);
            };
            let v = new G.Go();
            v.argv = ["", "--service=0.16.14"], BB(U, v).then((R) => {
              V(null), v.run(R);
            }, (R) => {
              V(R);
            });
          }, "onmessage");
          function BB(U, kB) {
            return Z(this, null, function* () {
              if (U instanceof WebAssembly.Module)
                return WebAssembly.instantiate(U, kB.importObject);
              let EB = yield fetch(U);
              if (!EB.ok)
                throw new Error(`Failed to download ${JSON.stringify(U)}`);
              if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(EB.headers.get("Content-Type") || ""))
                return (yield WebAssembly.instantiateStreaming(EB, kB.importObject)).instance;
              let _ = yield EB.arrayBuffer();
              return (yield WebAssembly.instantiate(_, kB.importObject)).instance;
            });
          }
          return P2(BB, "tryToInstantiateModule"), (U) => $B(U);
        })((V) => H.onmessage({ data: V }));
        H = { onmessage: null, postMessage: (V) => setTimeout(() => O({ data: V })), terminate() {
        } };
      }
      let M, y, S = new Promise((O, V) => {
        M = O, y = V;
      });
      H.onmessage = ({ data: O }) => {
        H.onmessage = ({ data: V }) => D(V), O ? y(O) : M();
      }, H.postMessage(l || new URL(s, location.href).toString());
      let { readFromStdout: D, service: b } = Ge({ writeToStdin(O) {
        H.postMessage(O);
      }, isSync: false, isWriteUnavailable: true, esbuild: i });
      yield S, W7 = { build: (O) => new Promise((V, Z) => b.buildOrServe({ callName: "build", refs: null, serveOptions: null, options: O, isTTY: false, defaultWD: "/", callback: ($B, G) => $B ? Z($B) : V(G) })), transform: (O, V) => new Promise((Z, $B) => b.transform({ callName: "transform", refs: null, input: O, options: V || {}, isTTY: false, fs: { readFile(G, BB) {
        BB(new Error("Internal error"), null);
      }, writeFile(G, BB) {
        BB(null);
      } }, callback: (G, BB) => G ? $B(G) : Z(BB) })), formatMessages: (O, V) => new Promise((Z, $B) => b.formatMessages({ callName: "formatMessages", refs: null, messages: O, options: V, callback: (G, BB) => G ? $B(G) : Z(BB) })), analyzeMetafile: (O, V) => new Promise((Z, $B) => b.analyzeMetafile({ callName: "analyzeMetafile", refs: null, metafile: typeof O == "string" ? O : JSON.stringify(O), options: V, callback: (G, BB) => G ? $B(G) : Z(BB) })) };
    }), "startRunningService"), nP = i;
  })(typeof L$ == "object" ? L$ : { set exports(B) {
    (typeof self < "u" ? self : this).esbuild = B;
  } });
});
aB2();
aB2();
var Mt2 = new Error("timeout while waiting for mutex to become available");
var yt2 = new Error("mutex already locked");
var pP2 = new Error("request for lock canceled");
var uP2 = function(B, A, $, k) {
  function e(t) {
    return t instanceof $ ? t : new $(function(E) {
      E(t);
    });
  }
  return P2(e, "adopt"), new ($ || ($ = Promise))(function(t, E) {
    function r(j) {
      try {
        i(k.next(j));
      } catch (o) {
        E(o);
      }
    }
    P2(r, "fulfilled");
    function n(j) {
      try {
        i(k.throw(j));
      } catch (o) {
        E(o);
      }
    }
    P2(n, "rejected");
    function i(j) {
      j.done ? t(j.value) : e(j.value).then(r, n);
    }
    P2(i, "step"), i((k = k.apply(B, A || [])).next());
  });
};
var m72 = class {
  constructor(A, $ = pP2) {
    this._value = A, this._cancelError = $, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    return new Promise(($, k) => {
      this._weightedQueues[A - 1] || (this._weightedQueues[A - 1] = []), this._weightedQueues[A - 1].push({ resolve: $, reject: k }), this._dispatch();
    });
  }
  runExclusive(A, $ = 1) {
    return uP2(this, void 0, void 0, function* () {
      let [k, e] = yield this.acquire($);
      try {
        return yield A(k);
      } finally {
        e();
      }
    });
  }
  waitForUnlock(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    return new Promise(($) => {
      this._weightedWaiters[A - 1] || (this._weightedWaiters[A - 1] = []), this._weightedWaiters[A - 1].push($), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(A) {
    this._value = A, this._dispatch();
  }
  release(A = 1) {
    if (A <= 0)
      throw new Error(`invalid weight ${A}: must be positive`);
    this._value += A, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((A) => A.forEach(($) => $.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var A;
    for (let $ = this._value; $ > 0; $--) {
      let k = (A = this._weightedQueues[$ - 1]) === null || A === void 0 ? void 0 : A.shift();
      if (!k)
        continue;
      let e = this._value, t = $;
      this._value -= $, $ = this._value + 1, k.resolve([e, this._newReleaser(t)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(A) {
    let $ = false;
    return () => {
      $ || ($ = true, this.release(A));
    };
  }
  _drainUnlockWaiters() {
    for (let A = this._value; A > 0; A--)
      this._weightedWaiters[A - 1] && (this._weightedWaiters[A - 1].forEach(($) => $()), this._weightedWaiters[A - 1] = []);
  }
};
P2(m72, "Semaphore");
var cP2 = function(B, A, $, k) {
  function e(t) {
    return t instanceof $ ? t : new $(function(E) {
      E(t);
    });
  }
  return P2(e, "adopt"), new ($ || ($ = Promise))(function(t, E) {
    function r(j) {
      try {
        i(k.next(j));
      } catch (o) {
        E(o);
      }
    }
    P2(r, "fulfilled");
    function n(j) {
      try {
        i(k.throw(j));
      } catch (o) {
        E(o);
      }
    }
    P2(n, "rejected");
    function i(j) {
      j.done ? t(j.value) : e(j.value).then(r, n);
    }
    P2(i, "step"), i((k = k.apply(B, A || [])).next());
  });
};
var VA2 = class {
  constructor(A) {
    this._semaphore = new m72(1, A);
  }
  acquire() {
    return cP2(this, void 0, void 0, function* () {
      let [, A] = yield this._semaphore.acquire();
      return A;
    });
  }
  runExclusive(A) {
    return this._semaphore.runExclusive(() => A());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    this._semaphore.isLocked() && this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};
P2(VA2, "Mutex");
aB2();
var E72 = "delete";
var pB2 = 5;
var KB2 = 1 << pB2;
var CB2 = KB2 - 1;
var tB2 = {};
function z72() {
  return { value: false };
}
P2(z72, "MakeRef");
function VB2(B) {
  B && (B.value = true);
}
P2(VB2, "SetRef");
function t$2() {
}
P2(t$2, "OwnerID");
function MA2(B) {
  return B.size === void 0 && (B.size = B.__iterate(Sk2)), B.size;
}
P2(MA2, "ensureSize");
function uA2(B, A) {
  if (typeof A != "number") {
    var $ = A >>> 0;
    if ("" + $ !== A || $ === 4294967295)
      return NaN;
    A = $;
  }
  return A < 0 ? MA2(B) + A : A;
}
P2(uA2, "wrapIndex");
function Sk2() {
  return true;
}
P2(Sk2, "returnTrue");
function b72(B, A, $) {
  return (B === 0 && !bk2(B) || $ !== void 0 && B <= -$) && (A === void 0 || $ !== void 0 && A >= $);
}
P2(b72, "wholeSlice");
function r72(B, A) {
  return Hk2(B, A, 0);
}
P2(r72, "resolveBegin");
function x72(B, A) {
  return Hk2(B, A, A);
}
P2(x72, "resolveEnd");
function Hk2(B, A, $) {
  return B === void 0 ? $ : bk2(B) ? A === 1 / 0 ? A : Math.max(0, A + B) | 0 : A === void 0 || A === B ? B : Math.min(A, B) | 0;
}
P2(Hk2, "resolveIndex");
function bk2(B) {
  return B < 0 || B === 0 && 1 / B === -1 / 0;
}
P2(bk2, "isNeg");
var xk2 = "@@__IMMUTABLE_ITERABLE__@@";
function FB2(B) {
  return Boolean(B && B[xk2]);
}
P2(FB2, "isCollection");
var vk2 = "@@__IMMUTABLE_KEYED__@@";
function cB2(B) {
  return Boolean(B && B[vk2]);
}
P2(cB2, "isKeyed");
var Mk2 = "@@__IMMUTABLE_INDEXED__@@";
function IB2(B) {
  return Boolean(B && B[Mk2]);
}
P2(IB2, "isIndexed");
function v72(B) {
  return cB2(B) || IB2(B);
}
P2(v72, "isAssociative");
var gB2 = P2(function(A) {
  return FB2(A) ? A : GB2(A);
}, "Collection");
var YB2 = function(B) {
  function A($) {
    return cB2($) ? $ : hA2($);
  }
  return P2(A, "KeyedCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB2);
var XA2 = function(B) {
  function A($) {
    return IB2($) ? $ : PA2($);
  }
  return P2(A, "IndexedCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB2);
var IA2 = function(B) {
  function A($) {
    return FB2($) && !v72($) ? $ : WA2($);
  }
  return P2(A, "SetCollection"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A;
}(gB2);
gB2.Keyed = YB2;
gB2.Indexed = XA2;
gB2.Set = IA2;
var yk2 = "@@__IMMUTABLE_SEQ__@@";
function E$2(B) {
  return Boolean(B && B[yk2]);
}
P2(E$2, "isSeq");
var wk2 = "@@__IMMUTABLE_RECORD__@@";
function FA2(B) {
  return Boolean(B && B[wk2]);
}
P2(FA2, "isRecord");
function nA2(B) {
  return FB2(B) || FA2(B);
}
P2(nA2, "isImmutable");
var UA2 = "@@__IMMUTABLE_ORDERED__@@";
function kA2(B) {
  return Boolean(B && B[UA2]);
}
P2(kA2, "isOrdered");
var n72 = 0;
var eA2 = 1;
var zB2 = 2;
var Y72 = typeof Symbol == "function" && Symbol.iterator;
var Ck2 = "@@iterator";
var M72 = Y72 || Ck2;
var nB2 = P2(function(A) {
  this.next = A;
}, "Iterator");
nB2.prototype.toString = P2(function() {
  return "[Iterator]";
}, "toString");
nB2.KEYS = n72;
nB2.VALUES = eA2;
nB2.ENTRIES = zB2;
nB2.prototype.inspect = nB2.prototype.toSource = function() {
  return this.toString();
};
nB2.prototype[M72] = function() {
  return this;
};
function hB2(B, A, $, k) {
  var e = B === 0 ? A : B === 1 ? $ : [A, $];
  return k ? k.value = e : k = { value: e, done: false }, k;
}
P2(hB2, "iteratorValue");
function UB2() {
  return { value: void 0, done: true };
}
P2(UB2, "iteratorDone");
function _k2(B) {
  return Array.isArray(B) ? true : !!y72(B);
}
P2(_k2, "hasIterator");
function $k2(B) {
  return B && typeof B.next == "function";
}
P2($k2, "isIterator");
function Z72(B) {
  var A = y72(B);
  return A && A.call(B);
}
P2(Z72, "getIterator");
function y72(B) {
  var A = B && (Y72 && B[Y72] || B[Ck2]);
  if (typeof A == "function")
    return A;
}
P2(y72, "getIteratorFn");
function hP2(B) {
  var A = y72(B);
  return A && A === B.entries;
}
P2(hP2, "isEntriesIterable");
function mP2(B) {
  var A = y72(B);
  return A && A === B.keys;
}
P2(mP2, "isKeysIterable");
var LA2 = Object.prototype.hasOwnProperty;
function Rk2(B) {
  return Array.isArray(B) || typeof B == "string" ? true : B && typeof B == "object" && Number.isInteger(B.length) && B.length >= 0 && (B.length === 0 ? Object.keys(B).length === 1 : B.hasOwnProperty(B.length - 1));
}
P2(Rk2, "isArrayLike");
var GB2 = function(B) {
  function A($) {
    return $ == null ? n$2() : nA2($) ? $.toSeq() : dP2($);
  }
  return P2(A, "Seq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toSeq = P2(function() {
    return this;
  }, "toSeq"), A.prototype.toString = P2(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), A.prototype.cacheResult = P2(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), A.prototype.__iterate = P2(function(k, e) {
    var t = this._cache;
    if (t) {
      for (var E = t.length, r = 0; r !== E; ) {
        var n = t[e ? E - ++r : r++];
        if (k(n[1], n[0], this) === false)
          break;
      }
      return r;
    }
    return this.__iterateUncached(k, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this._cache;
    if (t) {
      var E = t.length, r = 0;
      return new nB2(function() {
        if (r === E)
          return UB2();
        var n = t[e ? E - ++r : r++];
        return hB2(k, n[0], n[1]);
      });
    }
    return this.__iteratorUncached(k, e);
  }, "__iterator"), A;
}(gB2);
var hA2 = function(B) {
  function A($) {
    return $ == null ? n$2().toKeyedSeq() : FB2($) ? cB2($) ? $.toSeq() : $.fromEntrySeq() : FA2($) ? $.toSeq() : i$2($);
  }
  return P2(A, "KeyedSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toKeyedSeq = P2(function() {
    return this;
  }, "toKeyedSeq"), A;
}(GB2);
var PA2 = function(B) {
  function A($) {
    return $ == null ? n$2() : FB2($) ? cB2($) ? $.entrySeq() : $.toIndexedSeq() : FA2($) ? $.toSeq().entrySeq() : Dk2($);
  }
  return P2(A, "IndexedSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return A(arguments);
  }, "of"), A.prototype.toIndexedSeq = P2(function() {
    return this;
  }, "toIndexedSeq"), A.prototype.toString = P2(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), A;
}(GB2);
var WA2 = function(B) {
  function A($) {
    return (FB2($) && !v72($) ? $ : PA2($)).toSetSeq();
  }
  return P2(A, "SetSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return A(arguments);
  }, "of"), A.prototype.toSetSeq = P2(function() {
    return this;
  }, "toSetSeq"), A;
}(GB2);
GB2.isSeq = E$2;
GB2.Keyed = hA2;
GB2.Set = WA2;
GB2.Indexed = PA2;
GB2.prototype[yk2] = true;
var TA2 = function(B) {
  function A($) {
    this._array = $, this.size = $.length;
  }
  return P2(A, "ArraySeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P2(function(k, e) {
    return this.has(k) ? this._array[uA2(this, k)] : e;
  }, "get"), A.prototype.__iterate = P2(function(k, e) {
    for (var t = this._array, E = t.length, r = 0; r !== E; ) {
      var n = e ? E - ++r : r++;
      if (k(t[n], n, this) === false)
        break;
    }
    return r;
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this._array, E = t.length, r = 0;
    return new nB2(function() {
      if (r === E)
        return UB2();
      var n = e ? E - ++r : r++;
      return hB2(k, n, t[n]);
    });
  }, "__iterator"), A;
}(PA2);
var r$2 = function(B) {
  function A($) {
    var k = Object.keys($).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols($) : []);
    this._object = $, this._keys = k, this.size = k.length;
  }
  return P2(A, "ObjectSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P2(function(k, e) {
    return e !== void 0 && !this.has(k) ? e : this._object[k];
  }, "get"), A.prototype.has = P2(function(k) {
    return LA2.call(this._object, k);
  }, "has"), A.prototype.__iterate = P2(function(k, e) {
    for (var t = this._object, E = this._keys, r = E.length, n = 0; n !== r; ) {
      var i = E[e ? r - ++n : n++];
      if (k(t[i], i, this) === false)
        break;
    }
    return n;
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this._object, E = this._keys, r = E.length, n = 0;
    return new nB2(function() {
      if (n === r)
        return UB2();
      var i = E[e ? r - ++n : n++];
      return hB2(k, i, t[i]);
    });
  }, "__iterator"), A;
}(hA2);
r$2.prototype[UA2] = true;
var QP2 = function(B) {
  function A($) {
    this._collection = $, this.size = $.length || $.size;
  }
  return P2(A, "CollectionSeq"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.__iterateUncached = P2(function(k, e) {
    if (e)
      return this.cacheResult().__iterate(k, e);
    var t = this._collection, E = Z72(t), r = 0;
    if ($k2(E))
      for (var n; !(n = E.next()).done && k(n.value, r++, this) !== false; )
        ;
    return r;
  }, "__iterateUncached"), A.prototype.__iteratorUncached = P2(function(k, e) {
    if (e)
      return this.cacheResult().__iterator(k, e);
    var t = this._collection, E = Z72(t);
    if (!$k2(E))
      return new nB2(UB2);
    var r = 0;
    return new nB2(function() {
      var n = E.next();
      return n.done ? n : hB2(k, r++, n.value);
    });
  }, "__iteratorUncached"), A;
}(PA2);
var kk2;
function n$2() {
  return kk2 || (kk2 = new TA2([]));
}
P2(n$2, "emptySequence");
function i$2(B) {
  var A = a$2(B);
  if (A)
    return A.fromEntrySeq();
  if (typeof B == "object")
    return new r$2(B);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + B);
}
P2(i$2, "keyedSeqFromValue");
function Dk2(B) {
  var A = a$2(B);
  if (A)
    return A;
  throw new TypeError("Expected Array or collection object of values: " + B);
}
P2(Dk2, "indexedSeqFromValue");
function dP2(B) {
  var A = a$2(B);
  if (A)
    return hP2(B) ? A.fromEntrySeq() : mP2(B) ? A.toSetSeq() : A;
  if (typeof B == "object")
    return new r$2(B);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + B);
}
P2(dP2, "seqFromValue");
function a$2(B) {
  return Rk2(B) ? new TA2(B) : _k2(B) ? new QP2(B) : void 0;
}
P2(a$2, "maybeIndexedSeqFromValue");
var Ik2 = "@@__IMMUTABLE_MAP__@@";
function s$2(B) {
  return Boolean(B && B[Ik2]);
}
P2(s$2, "isMap");
function Fk2(B) {
  return s$2(B) && kA2(B);
}
P2(Fk2, "isOrderedMap");
function ek2(B) {
  return Boolean(B && typeof B.equals == "function" && typeof B.hashCode == "function");
}
P2(ek2, "isValueObject");
function OB2(B, A) {
  if (B === A || B !== B && A !== A)
    return true;
  if (!B || !A)
    return false;
  if (typeof B.valueOf == "function" && typeof A.valueOf == "function") {
    if (B = B.valueOf(), A = A.valueOf(), B === A || B !== B && A !== A)
      return true;
    if (!B || !A)
      return false;
  }
  return !!(ek2(B) && ek2(A) && B.equals(A));
}
P2(OB2, "is");
var JA2 = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : P2(function(A, $) {
  A |= 0, $ |= 0;
  var k = A & 65535, e = $ & 65535;
  return k * e + ((A >>> 16) * e + k * ($ >>> 16) << 16 >>> 0) | 0;
}, "imul");
function w72(B) {
  return B >>> 1 & 1073741824 | B & 3221225471;
}
P2(w72, "smi");
var gP2 = Object.prototype.valueOf;
function NB2(B) {
  if (B == null)
    return Pk2(B);
  if (typeof B.hashCode == "function")
    return w72(B.hashCode(B));
  var A = bP2(B);
  if (A == null)
    return Pk2(A);
  switch (typeof A) {
    case "boolean":
      return A ? 1108378657 : 1108378656;
    case "number":
      return TP2(A);
    case "string":
      return A.length > xP2 ? XP2(A) : B$2(A);
    case "object":
    case "function":
      return SP2(A);
    case "symbol":
      return fP2(A);
    default:
      if (typeof A.toString == "function")
        return B$2(A.toString());
      throw new Error("Value type " + typeof A + " cannot be hashed.");
  }
}
P2(NB2, "hash");
function Pk2(B) {
  return B === null ? 1108378658 : 1108378659;
}
P2(Pk2, "hashNullish");
function TP2(B) {
  if (B !== B || B === 1 / 0)
    return 0;
  var A = B | 0;
  for (A !== B && (A ^= B * 4294967295); B > 4294967295; )
    B /= 4294967295, A ^= B;
  return w72(A);
}
P2(TP2, "hashNumber");
function XP2(B) {
  var A = K72[B];
  return A === void 0 && (A = B$2(B), q72 === vP2 && (q72 = 0, K72 = {}), q72++, K72[B] = A), A;
}
P2(XP2, "cachedHashString");
function B$2(B) {
  for (var A = 0, $ = 0; $ < B.length; $++)
    A = 31 * A + B.charCodeAt($) | 0;
  return w72(A);
}
P2(B$2, "hashString");
function fP2(B) {
  var A = rk2[B];
  return A !== void 0 || (A = Uk2(), rk2[B] = A), A;
}
P2(fP2, "hashSymbol");
function SP2(B) {
  var A;
  if (A$2 && (A = $$2.get(B), A !== void 0) || (A = B[gA2], A !== void 0) || !Ek2 && (A = B.propertyIsEnumerable && B.propertyIsEnumerable[gA2], A !== void 0 || (A = HP2(B), A !== void 0)))
    return A;
  if (A = Uk2(), A$2)
    $$2.set(B, A);
  else {
    if (tk2 !== void 0 && tk2(B) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (Ek2)
      Object.defineProperty(B, gA2, { enumerable: false, configurable: false, writable: false, value: A });
    else if (B.propertyIsEnumerable !== void 0 && B.propertyIsEnumerable === B.constructor.prototype.propertyIsEnumerable)
      B.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, B.propertyIsEnumerable[gA2] = A;
    else if (B.nodeType !== void 0)
      B[gA2] = A;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return A;
}
P2(SP2, "hashJSObj");
var tk2 = Object.isExtensible;
var Ek2 = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function HP2(B) {
  if (B && B.nodeType > 0)
    switch (B.nodeType) {
      case 1:
        return B.uniqueID;
      case 9:
        return B.documentElement && B.documentElement.uniqueID;
    }
}
P2(HP2, "getIENodeHash");
function bP2(B) {
  return B.valueOf !== gP2 && typeof B.valueOf == "function" ? B.valueOf(B) : B;
}
P2(bP2, "valueOf");
function Uk2() {
  var B = ++G72;
  return G72 & 1073741824 && (G72 = 0), B;
}
P2(Uk2, "nextHash");
var A$2 = typeof WeakMap == "function";
var $$2;
A$2 && ($$2 = /* @__PURE__ */ new WeakMap());
var rk2 = /* @__PURE__ */ Object.create(null);
var G72 = 0;
var gA2 = "__immutablehash__";
typeof Symbol == "function" && (gA2 = Symbol(gA2));
var xP2 = 16;
var vP2 = 255;
var q72 = 0;
var K72 = {};
var C72 = function(B) {
  function A($, k) {
    this._iter = $, this._useKeys = k, this.size = $.size;
  }
  return P2(A, "ToKeyedSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.get = P2(function(k, e) {
    return this._iter.get(k, e);
  }, "get"), A.prototype.has = P2(function(k) {
    return this._iter.has(k);
  }, "has"), A.prototype.valueSeq = P2(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), A.prototype.reverse = P2(function() {
    var k = this, e = o$2(this, true);
    return this._useKeys || (e.valueSeq = function() {
      return k._iter.toSeq().reverse();
    }), e;
  }, "reverse"), A.prototype.map = P2(function(k, e) {
    var t = this, E = Gk2(this, k, e);
    return this._useKeys || (E.valueSeq = function() {
      return t._iter.toSeq().map(k, e);
    }), E;
  }, "map"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E, r) {
      return k(E, r, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    return this._iter.__iterator(k, e);
  }, "__iterator"), A;
}(hA2);
C72.prototype[UA2] = true;
var Lk2 = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P2(A, "ToIndexedSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.includes = P2(function(k) {
    return this._iter.includes(k);
  }, "includes"), A.prototype.__iterate = P2(function(k, e) {
    var t = this, E = 0;
    return e && MA2(this), this._iter.__iterate(function(r) {
      return k(r, e ? t.size - ++E : E++, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this, E = this._iter.__iterator(eA2, e), r = 0;
    return e && MA2(this), new nB2(function() {
      var n = E.next();
      return n.done ? n : hB2(k, e ? t.size - ++r : r++, n.value, n);
    });
  }, "__iterator"), A;
}(PA2);
var Wk2 = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P2(A, "ToSetSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.has = P2(function(k) {
    return this._iter.includes(k);
  }, "has"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E) {
      return k(E, E, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this._iter.__iterator(eA2, e);
    return new nB2(function() {
      var E = t.next();
      return E.done ? E : hB2(k, E.value, E.value, E);
    });
  }, "__iterator"), A;
}(WA2);
var Nk2 = function(B) {
  function A($) {
    this._iter = $, this.size = $.size;
  }
  return P2(A, "FromEntriesSequence"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.entrySeq = P2(function() {
    return this._iter.toSeq();
  }, "entrySeq"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    return this._iter.__iterate(function(E) {
      if (E) {
        ik2(E);
        var r = FB2(E);
        return k(r ? E.get(1) : E[1], r ? E.get(0) : E[0], t);
      }
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this._iter.__iterator(eA2, e);
    return new nB2(function() {
      for (; ; ) {
        var E = t.next();
        if (E.done)
          return E;
        var r = E.value;
        if (r) {
          ik2(r);
          var n = FB2(r);
          return hB2(k, n ? r.get(0) : r[0], n ? r.get(1) : r[1], E);
        }
      }
    });
  }, "__iterator"), A;
}(hA2);
Lk2.prototype.cacheResult = C72.prototype.cacheResult = Wk2.prototype.cacheResult = Nk2.prototype.cacheResult = p$2;
function Ok2(B) {
  var A = iA2(B);
  return A._iter = B, A.size = B.size, A.flip = function() {
    return B;
  }, A.reverse = function() {
    var $ = B.reverse.apply(this);
    return $.flip = function() {
      return B.reverse();
    }, $;
  }, A.has = function($) {
    return B.includes($);
  }, A.includes = function($) {
    return B.has($);
  }, A.cacheResult = p$2, A.__iterateUncached = function($, k) {
    var e = this;
    return B.__iterate(function(t, E) {
      return $(E, t, e) !== false;
    }, k);
  }, A.__iteratorUncached = function($, k) {
    if ($ === zB2) {
      var e = B.__iterator($, k);
      return new nB2(function() {
        var t = e.next();
        if (!t.done) {
          var E = t.value[0];
          t.value[0] = t.value[1], t.value[1] = E;
        }
        return t;
      });
    }
    return B.__iterator($ === eA2 ? n72 : eA2, k);
  }, A;
}
P2(Ok2, "flipFactory");
function Gk2(B, A, $) {
  var k = iA2(B);
  return k.size = B.size, k.has = function(e) {
    return B.has(e);
  }, k.get = function(e, t) {
    var E = B.get(e, tB2);
    return E === tB2 ? t : A.call($, E, e, B);
  }, k.__iterateUncached = function(e, t) {
    var E = this;
    return B.__iterate(function(r, n, i) {
      return e(A.call($, r, n, i), n, E) !== false;
    }, t);
  }, k.__iteratorUncached = function(e, t) {
    var E = B.__iterator(zB2, t);
    return new nB2(function() {
      var r = E.next();
      if (r.done)
        return r;
      var n = r.value, i = n[0];
      return hB2(e, i, A.call($, n[1], i, B), r);
    });
  }, k;
}
P2(Gk2, "mapFactory");
function o$2(B, A) {
  var $ = this, k = iA2(B);
  return k._iter = B, k.size = B.size, k.reverse = function() {
    return B;
  }, B.flip && (k.flip = function() {
    var e = Ok2(B);
    return e.reverse = function() {
      return B.flip();
    }, e;
  }), k.get = function(e, t) {
    return B.get(A ? e : -1 - e, t);
  }, k.has = function(e) {
    return B.has(A ? e : -1 - e);
  }, k.includes = function(e) {
    return B.includes(e);
  }, k.cacheResult = p$2, k.__iterate = function(e, t) {
    var E = this, r = 0;
    return t && MA2(B), B.__iterate(function(n, i) {
      return e(n, A ? i : t ? E.size - ++r : r++, E);
    }, !t);
  }, k.__iterator = function(e, t) {
    var E = 0;
    t && MA2(B);
    var r = B.__iterator(zB2, !t);
    return new nB2(function() {
      var n = r.next();
      if (n.done)
        return n;
      var i = n.value;
      return hB2(e, A ? i[0] : t ? $.size - ++E : E++, i[1], n);
    });
  }, k;
}
P2(o$2, "reverseFactory");
function qk2(B, A, $, k) {
  var e = iA2(B);
  return k && (e.has = function(t) {
    var E = B.get(t, tB2);
    return E !== tB2 && !!A.call($, E, t, B);
  }, e.get = function(t, E) {
    var r = B.get(t, tB2);
    return r !== tB2 && A.call($, r, t, B) ? r : E;
  }), e.__iterateUncached = function(t, E) {
    var r = this, n = 0;
    return B.__iterate(function(i, j, o) {
      if (A.call($, i, j, o))
        return n++, t(i, k ? j : n - 1, r);
    }, E), n;
  }, e.__iteratorUncached = function(t, E) {
    var r = B.__iterator(zB2, E), n = 0;
    return new nB2(function() {
      for (; ; ) {
        var i = r.next();
        if (i.done)
          return i;
        var j = i.value, o = j[0], m = j[1];
        if (A.call($, m, o, B))
          return hB2(t, k ? o : n++, m, i);
      }
    });
  }, e;
}
P2(qk2, "filterFactory");
function MP2(B, A, $) {
  var k = OA2().asMutable();
  return B.__iterate(function(e, t) {
    k.update(A.call($, e, t, B), 0, function(E) {
      return E + 1;
    });
  }), k.asImmutable();
}
P2(MP2, "countByFactory");
function yP2(B, A, $) {
  var k = cB2(B), e = (kA2(B) ? oA2() : OA2()).asMutable();
  B.__iterate(function(E, r) {
    e.update(A.call($, E, r, B), function(n) {
      return n = n || [], n.push(k ? [r, E] : E), n;
    });
  });
  var t = j$2(B);
  return e.map(function(E) {
    return oB2(B, t(E));
  }).asImmutable();
}
P2(yP2, "groupByFactory");
function wP2(B, A, $) {
  var k = cB2(B), e = [[], []];
  B.__iterate(function(E, r) {
    e[A.call($, E, r, B) ? 1 : 0].push(k ? [r, E] : E);
  });
  var t = j$2(B);
  return e.map(function(E) {
    return oB2(B, t(E));
  });
}
P2(wP2, "partitionFactory");
function l$2(B, A, $, k) {
  var e = B.size;
  if (b72(A, $, e))
    return B;
  var t = r72(A, e), E = x72($, e);
  if (t !== t || E !== E)
    return l$2(B.toSeq().cacheResult(), A, $, k);
  var r = E - t, n;
  r === r && (n = r < 0 ? 0 : r);
  var i = iA2(B);
  return i.size = n === 0 ? n : B.size && n || void 0, !k && E$2(B) && n >= 0 && (i.get = function(j, o) {
    return j = uA2(this, j), j >= 0 && j < n ? B.get(j + t, o) : o;
  }), i.__iterateUncached = function(j, o) {
    var m = this;
    if (n === 0)
      return 0;
    if (o)
      return this.cacheResult().__iterate(j, o);
    var c = 0, p = true, Q = 0;
    return B.__iterate(function(f, Y) {
      if (!(p && (p = c++ < t)))
        return Q++, j(f, k ? Y : Q - 1, m) !== false && Q !== n;
    }), Q;
  }, i.__iteratorUncached = function(j, o) {
    if (n !== 0 && o)
      return this.cacheResult().__iterator(j, o);
    if (n === 0)
      return new nB2(UB2);
    var m = B.__iterator(j, o), c = 0, p = 0;
    return new nB2(function() {
      for (; c++ < t; )
        m.next();
      if (++p > n)
        return UB2();
      var Q = m.next();
      return k || j === eA2 || Q.done ? Q : j === n72 ? hB2(j, p - 1, void 0, Q) : hB2(j, p - 1, Q.value[1], Q);
    });
  }, i;
}
P2(l$2, "sliceFactory");
function CP2(B, A, $) {
  var k = iA2(B);
  return k.__iterateUncached = function(e, t) {
    var E = this;
    if (t)
      return this.cacheResult().__iterate(e, t);
    var r = 0;
    return B.__iterate(function(n, i, j) {
      return A.call($, n, i, j) && ++r && e(n, i, E);
    }), r;
  }, k.__iteratorUncached = function(e, t) {
    var E = this;
    if (t)
      return this.cacheResult().__iterator(e, t);
    var r = B.__iterator(zB2, t), n = true;
    return new nB2(function() {
      if (!n)
        return UB2();
      var i = r.next();
      if (i.done)
        return i;
      var j = i.value, o = j[0], m = j[1];
      return A.call($, m, o, E) ? e === zB2 ? i : hB2(e, o, m, i) : (n = false, UB2());
    });
  }, k;
}
P2(CP2, "takeWhileFactory");
function Kk2(B, A, $, k) {
  var e = iA2(B);
  return e.__iterateUncached = function(t, E) {
    var r = this;
    if (E)
      return this.cacheResult().__iterate(t, E);
    var n = true, i = 0;
    return B.__iterate(function(j, o, m) {
      if (!(n && (n = A.call($, j, o, m))))
        return i++, t(j, k ? o : i - 1, r);
    }), i;
  }, e.__iteratorUncached = function(t, E) {
    var r = this;
    if (E)
      return this.cacheResult().__iterator(t, E);
    var n = B.__iterator(zB2, E), i = true, j = 0;
    return new nB2(function() {
      var o, m, c;
      do {
        if (o = n.next(), o.done)
          return k || t === eA2 ? o : t === n72 ? hB2(t, j++, void 0, o) : hB2(t, j++, o.value[1], o);
        var p = o.value;
        m = p[0], c = p[1], i && (i = A.call($, c, m, r));
      } while (i);
      return t === zB2 ? o : hB2(t, m, c, o);
    });
  }, e;
}
P2(Kk2, "skipWhileFactory");
function _P2(B, A) {
  var $ = cB2(B), k = [B].concat(A).map(function(E) {
    return FB2(E) ? $ && (E = YB2(E)) : E = $ ? i$2(E) : Dk2(Array.isArray(E) ? E : [E]), E;
  }).filter(function(E) {
    return E.size !== 0;
  });
  if (k.length === 0)
    return B;
  if (k.length === 1) {
    var e = k[0];
    if (e === B || $ && cB2(e) || IB2(B) && IB2(e))
      return e;
  }
  var t = new TA2(k);
  return $ ? t = t.toKeyedSeq() : IB2(B) || (t = t.toSetSeq()), t = t.flatten(true), t.size = k.reduce(function(E, r) {
    if (E !== void 0) {
      var n = r.size;
      if (n !== void 0)
        return E + n;
    }
  }, 0), t;
}
P2(_P2, "concatFactory");
function Vk2(B, A, $) {
  var k = iA2(B);
  return k.__iterateUncached = function(e, t) {
    if (t)
      return this.cacheResult().__iterate(e, t);
    var E = 0, r = false;
    function n(i, j) {
      i.__iterate(function(o, m) {
        return (!A || j < A) && FB2(o) ? n(o, j + 1) : (E++, e(o, $ ? m : E - 1, k) === false && (r = true)), !r;
      }, t);
    }
    return P2(n, "flatDeep"), n(B, 0), E;
  }, k.__iteratorUncached = function(e, t) {
    if (t)
      return this.cacheResult().__iterator(e, t);
    var E = B.__iterator(e, t), r = [], n = 0;
    return new nB2(function() {
      for (; E; ) {
        var i = E.next();
        if (i.done !== false) {
          E = r.pop();
          continue;
        }
        var j = i.value;
        if (e === zB2 && (j = j[1]), (!A || r.length < A) && FB2(j))
          r.push(E), E = j.__iterator(e, t);
        else
          return $ ? i : hB2(e, n++, j, i);
      }
      return UB2();
    });
  }, k;
}
P2(Vk2, "flattenFactory");
function RP2(B, A, $) {
  var k = j$2(B);
  return B.toSeq().map(function(e, t) {
    return k(A.call($, e, t, B));
  }).flatten(true);
}
P2(RP2, "flatMapFactory");
function DP2(B, A) {
  var $ = iA2(B);
  return $.size = B.size && B.size * 2 - 1, $.__iterateUncached = function(k, e) {
    var t = this, E = 0;
    return B.__iterate(function(r) {
      return (!E || k(A, E++, t) !== false) && k(r, E++, t) !== false;
    }, e), E;
  }, $.__iteratorUncached = function(k, e) {
    var t = B.__iterator(eA2, e), E = 0, r;
    return new nB2(function() {
      return (!r || E % 2) && (r = t.next(), r.done) ? r : E % 2 ? hB2(k, E++, A) : hB2(k, E++, r.value, r);
    });
  }, $;
}
P2(DP2, "interposeFactory");
function yA2(B, A, $) {
  A || (A = Jk2);
  var k = cB2(B), e = 0, t = B.toSeq().map(function(E, r) {
    return [r, E, e++, $ ? $(E, r, B) : E];
  }).valueSeq().toArray();
  return t.sort(function(E, r) {
    return A(E[3], r[3]) || E[2] - r[2];
  }).forEach(k ? function(E, r) {
    t[r].length = 2;
  } : function(E, r) {
    t[r] = E[1];
  }), k ? hA2(t) : IB2(B) ? PA2(t) : WA2(t);
}
P2(yA2, "sortFactory");
function Q72(B, A, $) {
  if (A || (A = Jk2), $) {
    var k = B.toSeq().map(function(e, t) {
      return [e, $(e, t, B)];
    }).reduce(function(e, t) {
      return nk2(A, e[1], t[1]) ? t : e;
    });
    return k && k[0];
  }
  return B.reduce(function(e, t) {
    return nk2(A, e, t) ? t : e;
  });
}
P2(Q72, "maxFactory");
function nk2(B, A, $) {
  var k = B($, A);
  return k === 0 && $ !== A && ($ == null || $ !== $) || k > 0;
}
P2(nk2, "maxCompare");
function d72(B, A, $, k) {
  var e = iA2(B), t = new TA2($).map(function(E) {
    return E.size;
  });
  return e.size = k ? t.max() : t.min(), e.__iterate = function(E, r) {
    for (var n = this.__iterator(eA2, r), i, j = 0; !(i = n.next()).done && E(i.value, j++, this) !== false; )
      ;
    return j;
  }, e.__iteratorUncached = function(E, r) {
    var n = $.map(function(o) {
      return o = gB2(o), Z72(r ? o.reverse() : o);
    }), i = 0, j = false;
    return new nB2(function() {
      var o;
      return j || (o = n.map(function(m) {
        return m.next();
      }), j = k ? o.every(function(m) {
        return m.done;
      }) : o.some(function(m) {
        return m.done;
      })), j ? UB2() : hB2(E, i++, A.apply(null, o.map(function(m) {
        return m.value;
      })));
    });
  }, e;
}
P2(d72, "zipWithFactory");
function oB2(B, A) {
  return B === A ? B : E$2(B) ? A : B.constructor(A);
}
P2(oB2, "reify");
function ik2(B) {
  if (B !== Object(B))
    throw new TypeError("Expected [K, V] tuple: " + B);
}
P2(ik2, "validateEntry");
function j$2(B) {
  return cB2(B) ? YB2 : IB2(B) ? XA2 : IA2;
}
P2(j$2, "collectionClass");
function iA2(B) {
  return Object.create((cB2(B) ? hA2 : IB2(B) ? PA2 : WA2).prototype);
}
P2(iA2, "makeSequence");
function p$2() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : GB2.prototype.cacheResult.call(this);
}
P2(p$2, "cacheResultThrough");
function Jk2(B, A) {
  return B === void 0 && A === void 0 ? 0 : B === void 0 ? 1 : A === void 0 ? -1 : B > A ? 1 : B < A ? -1 : 0;
}
P2(Jk2, "defaultComparator");
function rA2(B, A) {
  A = A || 0;
  for (var $ = Math.max(0, B.length - A), k = new Array($), e = 0; e < $; e++)
    k[e] = B[e + A];
  return k;
}
P2(rA2, "arrCopy");
function u$2(B, A) {
  if (!B)
    throw new Error(A);
}
P2(u$2, "invariant");
function JB2(B) {
  u$2(B !== 1 / 0, "Cannot perform this action with an infinite size.");
}
P2(JB2, "assertNotInfinite");
function zk2(B) {
  if (Rk2(B) && typeof B != "string")
    return B;
  if (kA2(B))
    return B.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + B);
}
P2(zk2, "coerceKeyPath");
var IP2 = Object.prototype.toString;
function FP2(B) {
  if (!B || typeof B != "object" || IP2.call(B) !== "[object Object]")
    return false;
  var A = Object.getPrototypeOf(B);
  if (A === null)
    return true;
  for (var $ = A, k = Object.getPrototypeOf(A); k !== null; )
    $ = k, k = Object.getPrototypeOf($);
  return $ === A;
}
P2(FP2, "isPlainObject");
function cA2(B) {
  return typeof B == "object" && (nA2(B) || Array.isArray(B) || FP2(B));
}
P2(cA2, "isDataStructure");
function A72(B) {
  try {
    return typeof B == "string" ? JSON.stringify(B) : String(B);
  } catch {
    return JSON.stringify(B);
  }
}
P2(A72, "quoteString");
function UP2(B, A) {
  return nA2(B) ? B.has(A) : cA2(B) && LA2.call(B, A);
}
P2(UP2, "has");
function Yk2(B, A, $) {
  return nA2(B) ? B.get(A, $) : UP2(B, A) ? typeof B.get == "function" ? B.get(A) : B[A] : $;
}
P2(Yk2, "get");
function S72(B) {
  if (Array.isArray(B))
    return rA2(B);
  var A = {};
  for (var $ in B)
    LA2.call(B, $) && (A[$] = B[$]);
  return A;
}
P2(S72, "shallowCopy");
function LP2(B, A) {
  if (!cA2(B))
    throw new TypeError("Cannot update non-data-structure value: " + B);
  if (nA2(B)) {
    if (!B.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + B);
    return B.remove(A);
  }
  if (!LA2.call(B, A))
    return B;
  var $ = S72(B);
  return Array.isArray($) ? $.splice(A, 1) : delete $[A], $;
}
P2(LP2, "remove");
function WP2(B, A, $) {
  if (!cA2(B))
    throw new TypeError("Cannot update non-data-structure value: " + B);
  if (nA2(B)) {
    if (!B.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + B);
    return B.set(A, $);
  }
  if (LA2.call(B, A) && $ === B[A])
    return B;
  var k = S72(B);
  return k[A] = $, k;
}
P2(WP2, "set");
function NA2(B, A, $, k) {
  k || (k = $, $ = void 0);
  var e = Zk2(nA2(B), B, zk2(A), 0, $, k);
  return e === tB2 ? $ : e;
}
P2(NA2, "updateIn$1");
function Zk2(B, A, $, k, e, t) {
  var E = A === tB2;
  if (k === $.length) {
    var r = E ? e : A, n = t(r);
    return n === r ? A : n;
  }
  if (!E && !cA2(A))
    throw new TypeError("Cannot update within non-data-structure value in path [" + $.slice(0, k).map(A72) + "]: " + A);
  var i = $[k], j = E ? tB2 : Yk2(A, i, tB2), o = Zk2(j === tB2 ? B : nA2(j), j, $, k + 1, e, t);
  return o === j ? A : o === tB2 ? LP2(A, i) : WP2(E ? B ? $A2() : {} : A, i, o);
}
P2(Zk2, "updateInDeeply");
function NP2(B, A, $) {
  return NA2(B, A, tB2, function() {
    return $;
  });
}
P2(NP2, "setIn$1");
function c$2(B, A) {
  return NP2(this, B, A);
}
P2(c$2, "setIn");
function OP2(B, A) {
  return NA2(B, A, function() {
    return tB2;
  });
}
P2(OP2, "removeIn");
function h$2(B) {
  return OP2(this, B);
}
P2(h$2, "deleteIn");
function Be2(B, A, $, k) {
  return NA2(B, [A], $, k);
}
P2(Be2, "update$1");
function m$2(B, A, $) {
  return arguments.length === 1 ? B(this) : Be2(this, B, A, $);
}
P2(m$2, "update");
function Q$2(B, A, $) {
  return NA2(this, B, A, $);
}
P2(Q$2, "updateIn");
function Ae2() {
  for (var B = [], A = arguments.length; A--; )
    B[A] = arguments[A];
  return ke2(this, B);
}
P2(Ae2, "merge$1");
function $e2(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  if (typeof B != "function")
    throw new TypeError("Invalid merger function: " + B);
  return ke2(this, A, B);
}
P2($e2, "mergeWith$1");
function ke2(B, A, $) {
  for (var k = [], e = 0; e < A.length; e++) {
    var t = YB2(A[e]);
    t.size !== 0 && k.push(t);
  }
  return k.length === 0 ? B : B.toSeq().size === 0 && !B.__ownerID && k.length === 1 ? B.constructor(k[0]) : B.withMutations(function(E) {
    for (var r = $ ? function(i, j) {
      Be2(E, j, tB2, function(o) {
        return o === tB2 ? i : $(o, i, j);
      });
    } : function(i, j) {
      E.set(j, i);
    }, n = 0; n < k.length; n++)
      k[n].forEach(r);
  });
}
P2(ke2, "mergeIntoKeyedWith");
function d$2(B, A, $) {
  return g$2(B, A, GP2($));
}
P2(d$2, "mergeDeepWithSources");
function g$2(B, A, $) {
  if (!cA2(B))
    throw new TypeError("Cannot merge into non-data-structure value: " + B);
  if (nA2(B))
    return typeof $ == "function" && B.mergeWith ? B.mergeWith.apply(B, [$].concat(A)) : B.merge ? B.merge.apply(B, A) : B.concat.apply(B, A);
  for (var k = Array.isArray(B), e = B, t = k ? XA2 : YB2, E = k ? function(n) {
    e === B && (e = S72(e)), e.push(n);
  } : function(n, i) {
    var j = LA2.call(e, i), o = j && $ ? $(e[i], n, i) : n;
    (!j || o !== e[i]) && (e === B && (e = S72(e)), e[i] = o);
  }, r = 0; r < A.length; r++)
    t(A[r]).forEach(E);
  return e;
}
P2(g$2, "mergeWithSources");
function GP2(B) {
  function A($, k, e) {
    return cA2($) && cA2(k) && qP2($, k) ? g$2($, [k], A) : B ? B($, k, e) : k;
  }
  return P2(A, "deepMerger"), A;
}
P2(GP2, "deepMergerWith");
function qP2(B, A) {
  var $ = GB2(B), k = GB2(A);
  return IB2($) === IB2(k) && cB2($) === cB2(k);
}
P2(qP2, "areMergeable");
function ee2() {
  for (var B = [], A = arguments.length; A--; )
    B[A] = arguments[A];
  return d$2(this, B);
}
P2(ee2, "mergeDeep");
function Pe2(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return d$2(this, A, B);
}
P2(Pe2, "mergeDeepWith");
function T$2(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return NA2(this, B, $A2(), function(k) {
    return g$2(k, A);
  });
}
P2(T$2, "mergeIn");
function X$2(B) {
  for (var A = [], $ = arguments.length - 1; $-- > 0; )
    A[$] = arguments[$ + 1];
  return NA2(this, B, $A2(), function(k) {
    return d$2(k, A);
  });
}
P2(X$2, "mergeDeepIn");
function i72(B) {
  var A = this.asMutable();
  return B(A), A.wasAltered() ? A.__ensureOwner(this.__ownerID) : this;
}
P2(i72, "withMutations");
function a72() {
  return this.__ownerID ? this : this.__ensureOwner(new t$2());
}
P2(a72, "asMutable");
function s72() {
  return this.__ensureOwner();
}
P2(s72, "asImmutable");
function f$2() {
  return this.__altered;
}
P2(f$2, "wasAltered");
var OA2 = function(B) {
  function A($) {
    return $ == null ? $A2() : s$2($) && !kA2($) ? $ : $A2().withMutations(function(k) {
      var e = B($);
      JB2(e.size), e.forEach(function(t, E) {
        return k.set(E, t);
      });
    });
  }
  return P2(A, "Map"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    return $A2().withMutations(function(t) {
      for (var E = 0; E < k.length; E += 2) {
        if (E + 1 >= k.length)
          throw new Error("Missing value for key: " + k[E]);
        t.set(k[E], k[E + 1]);
      }
    });
  }, "of"), A.prototype.toString = P2(function() {
    return this.__toString("Map {", "}");
  }, "toString"), A.prototype.get = P2(function(k, e) {
    return this._root ? this._root.get(0, void 0, k, e) : e;
  }, "get"), A.prototype.set = P2(function(k, e) {
    return ok2(this, k, e);
  }, "set"), A.prototype.remove = P2(function(k) {
    return ok2(this, k, tB2);
  }, "remove"), A.prototype.deleteAll = P2(function(k) {
    var e = gB2(k);
    return e.size === 0 ? this : this.withMutations(function(t) {
      e.forEach(function(E) {
        return t.remove(E);
      });
    });
  }, "deleteAll"), A.prototype.clear = P2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : $A2();
  }, "clear"), A.prototype.sort = P2(function(k) {
    return oA2(yA2(this, k));
  }, "sort"), A.prototype.sortBy = P2(function(k, e) {
    return oA2(yA2(this, e, k));
  }, "sortBy"), A.prototype.map = P2(function(k, e) {
    var t = this;
    return this.withMutations(function(E) {
      E.forEach(function(r, n) {
        E.set(n, k.call(e, r, n, t));
      });
    });
  }, "map"), A.prototype.__iterator = P2(function(k, e) {
    return new KP2(this, k, e);
  }, "__iterator"), A.prototype.__iterate = P2(function(k, e) {
    var t = this, E = 0;
    return this._root && this._root.iterate(function(r) {
      return E++, k(r[1], r[0], t);
    }, e), E;
  }, "__iterate"), A.prototype.__ensureOwner = P2(function(k) {
    return k === this.__ownerID ? this : k ? S$2(this.size, this._root, k, this.__hash) : this.size === 0 ? $A2() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A;
}(YB2);
OA2.isMap = s$2;
var uB2 = OA2.prototype;
uB2[Ik2] = true;
uB2[E72] = uB2.remove;
uB2.removeAll = uB2.deleteAll;
uB2.setIn = c$2;
uB2.removeIn = uB2.deleteIn = h$2;
uB2.update = m$2;
uB2.updateIn = Q$2;
uB2.merge = uB2.concat = Ae2;
uB2.mergeWith = $e2;
uB2.mergeDeep = ee2;
uB2.mergeDeepWith = Pe2;
uB2.mergeIn = T$2;
uB2.mergeDeepIn = X$2;
uB2.withMutations = i72;
uB2.wasAltered = f$2;
uB2.asImmutable = s72;
uB2["@@transducer/init"] = uB2.asMutable = a72;
uB2["@@transducer/step"] = function(B, A) {
  return B.set(A[0], A[1]);
};
uB2["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
var $72 = P2(function(A, $) {
  this.ownerID = A, this.entries = $;
}, "ArrayMapNode");
$72.prototype.get = P2(function(A, $, k, e) {
  for (var t = this.entries, E = 0, r = t.length; E < r; E++)
    if (OB2(k, t[E][0]))
      return t[E][1];
  return e;
}, "get");
$72.prototype.update = P2(function(A, $, k, e, t, E, r) {
  for (var n = t === tB2, i = this.entries, j = 0, o = i.length; j < o && !OB2(e, i[j][0]); j++)
    ;
  var m = j < o;
  if (m ? i[j][1] === t : n)
    return this;
  if (VB2(r), (n || !m) && VB2(E), !(n && i.length === 1)) {
    if (!m && !n && i.length >= Bt2)
      return VP2(A, i, e, t);
    var c = A && A === this.ownerID, p = c ? i : rA2(i);
    return m ? n ? j === o - 1 ? p.pop() : p[j] = p.pop() : p[j] = [e, t] : p.push([e, t]), c ? (this.entries = p, this) : new $72(A, p);
  }
}, "update");
var wA2 = P2(function(A, $, k) {
  this.ownerID = A, this.bitmap = $, this.nodes = k;
}, "BitmapIndexedNode");
wA2.prototype.get = P2(function(A, $, k, e) {
  $ === void 0 && ($ = NB2(k));
  var t = 1 << ((A === 0 ? $ : $ >>> A) & CB2), E = this.bitmap;
  return E & t ? this.nodes[te2(E & t - 1)].get(A + pB2, $, k, e) : e;
}, "get");
wA2.prototype.update = P2(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB2(e));
  var n = ($ === 0 ? k : k >>> $) & CB2, i = 1 << n, j = this.bitmap, o = (j & i) !== 0;
  if (!o && t === tB2)
    return this;
  var m = te2(j & i - 1), c = this.nodes, p = o ? c[m] : void 0, Q = H$2(p, A, $ + pB2, k, e, t, E, r);
  if (Q === p)
    return this;
  if (!o && Q && c.length >= At2)
    return zP2(A, c, j, n, Q);
  if (o && !Q && c.length === 2 && lk2(c[m ^ 1]))
    return c[m ^ 1];
  if (o && Q && c.length === 1 && lk2(Q))
    return Q;
  var f = A && A === this.ownerID, Y = o ? Q ? j : j ^ i : j | i, K = o ? Q ? Ee2(c, m, Q, f) : ZP2(c, m, f) : YP2(c, m, Q, f);
  return f ? (this.bitmap = Y, this.nodes = K, this) : new wA2(A, Y, K);
}, "update");
var k72 = P2(function(A, $, k) {
  this.ownerID = A, this.count = $, this.nodes = k;
}, "HashArrayMapNode");
k72.prototype.get = P2(function(A, $, k, e) {
  $ === void 0 && ($ = NB2(k));
  var t = (A === 0 ? $ : $ >>> A) & CB2, E = this.nodes[t];
  return E ? E.get(A + pB2, $, k, e) : e;
}, "get");
k72.prototype.update = P2(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB2(e));
  var n = ($ === 0 ? k : k >>> $) & CB2, i = t === tB2, j = this.nodes, o = j[n];
  if (i && !o)
    return this;
  var m = H$2(o, A, $ + pB2, k, e, t, E, r);
  if (m === o)
    return this;
  var c = this.count;
  if (!o)
    c++;
  else if (!m && (c--, c < $t2))
    return JP2(A, j, c, n);
  var p = A && A === this.ownerID, Q = Ee2(j, n, m, p);
  return p ? (this.count = c, this.nodes = Q, this) : new k72(A, c, Q);
}, "update");
var CA2 = P2(function(A, $, k) {
  this.ownerID = A, this.keyHash = $, this.entries = k;
}, "HashCollisionNode");
CA2.prototype.get = P2(function(A, $, k, e) {
  for (var t = this.entries, E = 0, r = t.length; E < r; E++)
    if (OB2(k, t[E][0]))
      return t[E][1];
  return e;
}, "get");
CA2.prototype.update = P2(function(A, $, k, e, t, E, r) {
  k === void 0 && (k = NB2(e));
  var n = t === tB2;
  if (k !== this.keyHash)
    return n ? this : (VB2(r), VB2(E), b$2(this, A, $, k, [e, t]));
  for (var i = this.entries, j = 0, o = i.length; j < o && !OB2(e, i[j][0]); j++)
    ;
  var m = j < o;
  if (m ? i[j][1] === t : n)
    return this;
  if (VB2(r), (n || !m) && VB2(E), n && o === 2)
    return new sA2(A, this.keyHash, i[j ^ 1]);
  var c = A && A === this.ownerID, p = c ? i : rA2(i);
  return m ? n ? j === o - 1 ? p.pop() : p[j] = p.pop() : p[j] = [e, t] : p.push([e, t]), c ? (this.entries = p, this) : new CA2(A, this.keyHash, p);
}, "update");
var sA2 = P2(function(A, $, k) {
  this.ownerID = A, this.keyHash = $, this.entry = k;
}, "ValueNode");
sA2.prototype.get = P2(function(A, $, k, e) {
  return OB2(k, this.entry[0]) ? this.entry[1] : e;
}, "get");
sA2.prototype.update = P2(function(A, $, k, e, t, E, r) {
  var n = t === tB2, i = OB2(e, this.entry[0]);
  if (i ? t === this.entry[1] : n)
    return this;
  if (VB2(r), n) {
    VB2(E);
    return;
  }
  return i ? A && A === this.ownerID ? (this.entry[1] = t, this) : new sA2(A, this.keyHash, [e, t]) : (VB2(E), b$2(this, A, $, NB2(e), [e, t]));
}, "update");
$72.prototype.iterate = CA2.prototype.iterate = function(B, A) {
  for (var $ = this.entries, k = 0, e = $.length - 1; k <= e; k++)
    if (B($[A ? e - k : k]) === false)
      return false;
};
wA2.prototype.iterate = k72.prototype.iterate = function(B, A) {
  for (var $ = this.nodes, k = 0, e = $.length - 1; k <= e; k++) {
    var t = $[A ? e - k : k];
    if (t && t.iterate(B, A) === false)
      return false;
  }
};
sA2.prototype.iterate = function(B, A) {
  return B(this.entry);
};
var KP2 = function(B) {
  function A($, k, e) {
    this._type = k, this._reverse = e, this._stack = $._root && ak2($._root);
  }
  return P2(A, "MapIterator"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.next = P2(function() {
    for (var k = this._type, e = this._stack; e; ) {
      var t = e.node, E = e.index++, r = void 0;
      if (t.entry) {
        if (E === 0)
          return V72(k, t.entry);
      } else if (t.entries) {
        if (r = t.entries.length - 1, E <= r)
          return V72(k, t.entries[this._reverse ? r - E : E]);
      } else if (r = t.nodes.length - 1, E <= r) {
        var n = t.nodes[this._reverse ? r - E : E];
        if (n) {
          if (n.entry)
            return V72(k, n.entry);
          e = this._stack = ak2(n, e);
        }
        continue;
      }
      e = this._stack = this._stack.__prev;
    }
    return UB2();
  }, "next"), A;
}(nB2);
function V72(B, A) {
  return hB2(B, A[0], A[1]);
}
P2(V72, "mapIteratorValue");
function ak2(B, A) {
  return { node: B, index: 0, __prev: A };
}
P2(ak2, "mapIteratorFrame");
function S$2(B, A, $, k) {
  var e = Object.create(uB2);
  return e.size = B, e._root = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P2(S$2, "makeMap");
var sk2;
function $A2() {
  return sk2 || (sk2 = S$2(0));
}
P2($A2, "emptyMap");
function ok2(B, A, $) {
  var k, e;
  if (B._root) {
    var t = z72(), E = z72();
    if (k = H$2(B._root, B.__ownerID, 0, void 0, A, $, t, E), !E.value)
      return B;
    e = B.size + (t.value ? $ === tB2 ? -1 : 1 : 0);
  } else {
    if ($ === tB2)
      return B;
    e = 1, k = new $72(B.__ownerID, [[A, $]]);
  }
  return B.__ownerID ? (B.size = e, B._root = k, B.__hash = void 0, B.__altered = true, B) : k ? S$2(e, k) : $A2();
}
P2(ok2, "updateMap");
function H$2(B, A, $, k, e, t, E, r) {
  return B ? B.update(A, $, k, e, t, E, r) : t === tB2 ? B : (VB2(r), VB2(E), new sA2(A, k, [e, t]));
}
P2(H$2, "updateNode");
function lk2(B) {
  return B.constructor === sA2 || B.constructor === CA2;
}
P2(lk2, "isLeafNode");
function b$2(B, A, $, k, e) {
  if (B.keyHash === k)
    return new CA2(A, k, [B.entry, e]);
  var t = ($ === 0 ? B.keyHash : B.keyHash >>> $) & CB2, E = ($ === 0 ? k : k >>> $) & CB2, r, n = t === E ? [b$2(B, A, $ + pB2, k, e)] : (r = new sA2(A, k, e), t < E ? [B, r] : [r, B]);
  return new wA2(A, 1 << t | 1 << E, n);
}
P2(b$2, "mergeIntoNode");
function VP2(B, A, $, k) {
  B || (B = new t$2());
  for (var e = new sA2(B, NB2($), [$, k]), t = 0; t < A.length; t++) {
    var E = A[t];
    e = e.update(B, 0, void 0, E[0], E[1]);
  }
  return e;
}
P2(VP2, "createNodes");
function JP2(B, A, $, k) {
  for (var e = 0, t = 0, E = new Array($), r = 0, n = 1, i = A.length; r < i; r++, n <<= 1) {
    var j = A[r];
    j !== void 0 && r !== k && (e |= n, E[t++] = j);
  }
  return new wA2(B, e, E);
}
P2(JP2, "packNodes");
function zP2(B, A, $, k, e) {
  for (var t = 0, E = new Array(KB2), r = 0; $ !== 0; r++, $ >>>= 1)
    E[r] = $ & 1 ? A[t++] : void 0;
  return E[k] = e, new k72(B, t + 1, E);
}
P2(zP2, "expandNodes");
function te2(B) {
  return B -= B >> 1 & 1431655765, B = (B & 858993459) + (B >> 2 & 858993459), B = B + (B >> 4) & 252645135, B += B >> 8, B += B >> 16, B & 127;
}
P2(te2, "popCount");
function Ee2(B, A, $, k) {
  var e = k ? B : rA2(B);
  return e[A] = $, e;
}
P2(Ee2, "setAt");
function YP2(B, A, $, k) {
  var e = B.length + 1;
  if (k && A + 1 === e)
    return B[A] = $, B;
  for (var t = new Array(e), E = 0, r = 0; r < e; r++)
    r === A ? (t[r] = $, E = -1) : t[r] = B[r + E];
  return t;
}
P2(YP2, "spliceIn");
function ZP2(B, A, $) {
  var k = B.length - 1;
  if ($ && A === k)
    return B.pop(), B;
  for (var e = new Array(k), t = 0, E = 0; E < k; E++)
    E === A && (t = 1), e[E] = B[E + t];
  return e;
}
P2(ZP2, "spliceOut");
var Bt2 = KB2 / 4;
var At2 = KB2 / 2;
var $t2 = KB2 / 4;
var re2 = "@@__IMMUTABLE_LIST__@@";
function ne2(B) {
  return Boolean(B && B[re2]);
}
P2(ne2, "isList");
var _72 = function(B) {
  function A($) {
    var k = f72();
    if ($ == null)
      return k;
    if (ne2($))
      return $;
    var e = B($), t = e.size;
    return t === 0 ? k : (JB2(t), t > 0 && t < KB2 ? e72(0, t, pB2, null, new pA2(e.toArray())) : k.withMutations(function(E) {
      E.setSize(t), e.forEach(function(r, n) {
        return E.set(n, r);
      });
    }));
  }
  return P2(A, "List"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P2(function() {
    return this.__toString("List [", "]");
  }, "toString"), A.prototype.get = P2(function(k, e) {
    if (k = uA2(this, k), k >= 0 && k < this.size) {
      k += this._origin;
      var t = ie2(this, k);
      return t && t.array[k & CB2];
    }
    return e;
  }, "get"), A.prototype.set = P2(function(k, e) {
    return kt2(this, k, e);
  }, "set"), A.prototype.remove = P2(function(k) {
    return this.has(k) ? k === 0 ? this.shift() : k === this.size - 1 ? this.pop() : this.splice(k, 1) : this;
  }, "remove"), A.prototype.insert = P2(function(k, e) {
    return this.splice(k, 0, e);
  }, "insert"), A.prototype.clear = P2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = pB2, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : f72();
  }, "clear"), A.prototype.push = P2(function() {
    var k = arguments, e = this.size;
    return this.withMutations(function(t) {
      jA2(t, 0, e + k.length);
      for (var E = 0; E < k.length; E++)
        t.set(e + E, k[E]);
    });
  }, "push"), A.prototype.pop = P2(function() {
    return jA2(this, 0, -1);
  }, "pop"), A.prototype.unshift = P2(function() {
    var k = arguments;
    return this.withMutations(function(e) {
      jA2(e, -k.length);
      for (var t = 0; t < k.length; t++)
        e.set(t, k[t]);
    });
  }, "unshift"), A.prototype.shift = P2(function() {
    return jA2(this, 1);
  }, "shift"), A.prototype.concat = P2(function() {
    for (var k = arguments, e = [], t = 0; t < arguments.length; t++) {
      var E = k[t], r = B(typeof E != "string" && _k2(E) ? E : [E]);
      r.size !== 0 && e.push(r);
    }
    return e.length === 0 ? this : this.size === 0 && !this.__ownerID && e.length === 1 ? this.constructor(e[0]) : this.withMutations(function(n) {
      e.forEach(function(i) {
        return i.forEach(function(j) {
          return n.push(j);
        });
      });
    });
  }, "concat"), A.prototype.setSize = P2(function(k) {
    return jA2(this, 0, k);
  }, "setSize"), A.prototype.map = P2(function(k, e) {
    var t = this;
    return this.withMutations(function(E) {
      for (var r = 0; r < t.size; r++)
        E.set(r, k.call(e, E.get(r), r, t));
    });
  }, "map"), A.prototype.slice = P2(function(k, e) {
    var t = this.size;
    return b72(k, e, t) ? this : jA2(this, r72(k, t), x72(e, t));
  }, "slice"), A.prototype.__iterator = P2(function(k, e) {
    var t = e ? this.size : 0, E = jk2(this, e);
    return new nB2(function() {
      var r = E();
      return r === B72 ? UB2() : hB2(k, e ? --t : t++, r);
    });
  }, "__iterator"), A.prototype.__iterate = P2(function(k, e) {
    for (var t = e ? this.size : 0, E = jk2(this, e), r; (r = E()) !== B72 && k(r, e ? --t : t++, this) !== false; )
      ;
    return t;
  }, "__iterate"), A.prototype.__ensureOwner = P2(function(k) {
    return k === this.__ownerID ? this : k ? e72(this._origin, this._capacity, this._level, this._root, this._tail, k, this.__hash) : this.size === 0 ? f72() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A;
}(XA2);
_72.isList = ne2;
var TB2 = _72.prototype;
TB2[re2] = true;
TB2[E72] = TB2.remove;
TB2.merge = TB2.concat;
TB2.setIn = c$2;
TB2.deleteIn = TB2.removeIn = h$2;
TB2.update = m$2;
TB2.updateIn = Q$2;
TB2.mergeIn = T$2;
TB2.mergeDeepIn = X$2;
TB2.withMutations = i72;
TB2.wasAltered = f$2;
TB2.asImmutable = s72;
TB2["@@transducer/init"] = TB2.asMutable = a72;
TB2["@@transducer/step"] = function(B, A) {
  return B.push(A);
};
TB2["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
var pA2 = P2(function(A, $) {
  this.array = A, this.ownerID = $;
}, "VNode");
pA2.prototype.removeBefore = P2(function(A, $, k) {
  if (k === $ ? 1 << $ : this.array.length === 0)
    return this;
  var e = k >>> $ & CB2;
  if (e >= this.array.length)
    return new pA2([], A);
  var t = e === 0, E;
  if ($ > 0) {
    var r = this.array[e];
    if (E = r && r.removeBefore(A, $ - pB2, k), E === r && t)
      return this;
  }
  if (t && !E)
    return this;
  var n = _A2(this, A);
  if (!t)
    for (var i = 0; i < e; i++)
      n.array[i] = void 0;
  return E && (n.array[e] = E), n;
}, "removeBefore");
pA2.prototype.removeAfter = P2(function(A, $, k) {
  if (k === ($ ? 1 << $ : 0) || this.array.length === 0)
    return this;
  var e = k - 1 >>> $ & CB2;
  if (e >= this.array.length)
    return this;
  var t;
  if ($ > 0) {
    var E = this.array[e];
    if (t = E && E.removeAfter(A, $ - pB2, k), t === E && e === this.array.length - 1)
      return this;
  }
  var r = _A2(this, A);
  return r.array.splice(e + 1), t && (r.array[e] = t), r;
}, "removeAfter");
var B72 = {};
function jk2(B, A) {
  var $ = B._origin, k = B._capacity, e = P72(k), t = B._tail;
  return E(B._root, B._level, 0);
  function E(i, j, o) {
    return j === 0 ? r(i, o) : n(i, j, o);
  }
  function r(i, j) {
    var o = j === e ? t && t.array : i && i.array, m = j > $ ? 0 : $ - j, c = k - j;
    return c > KB2 && (c = KB2), function() {
      if (m === c)
        return B72;
      var p = A ? --c : m++;
      return o && o[p];
    };
  }
  function n(i, j, o) {
    var m, c = i && i.array, p = o > $ ? 0 : $ - o >> j, Q = (k - o >> j) + 1;
    return Q > KB2 && (Q = KB2), function() {
      for (; ; ) {
        if (m) {
          var f = m();
          if (f !== B72)
            return f;
          m = null;
        }
        if (p === Q)
          return B72;
        var Y = A ? --Q : p++;
        m = E(c && c[Y], j - pB2, o + (Y << j));
      }
    };
  }
}
P2(jk2, "iterateList");
function e72(B, A, $, k, e, t, E) {
  var r = Object.create(TB2);
  return r.size = A - B, r._origin = B, r._capacity = A, r._level = $, r._root = k, r._tail = e, r.__ownerID = t, r.__hash = E, r.__altered = false, r;
}
P2(e72, "makeList");
var pk2;
function f72() {
  return pk2 || (pk2 = e72(0, 0, pB2));
}
P2(f72, "emptyList");
function kt2(B, A, $) {
  if (A = uA2(B, A), A !== A)
    return B;
  if (A >= B.size || A < 0)
    return B.withMutations(function(E) {
      A < 0 ? jA2(E, A).set(0, $) : jA2(E, 0, A + 1).set(A, $);
    });
  A += B._origin;
  var k = B._tail, e = B._root, t = z72();
  return A >= P72(B._capacity) ? k = k$2(k, B.__ownerID, 0, A, $, t) : e = k$2(e, B.__ownerID, B._level, A, $, t), t.value ? B.__ownerID ? (B._root = e, B._tail = k, B.__hash = void 0, B.__altered = true, B) : e72(B._origin, B._capacity, B._level, e, k) : B;
}
P2(kt2, "updateList");
function k$2(B, A, $, k, e, t) {
  var E = k >>> $ & CB2, r = B && E < B.array.length;
  if (!r && e === void 0)
    return B;
  var n;
  if ($ > 0) {
    var i = B && B.array[E], j = k$2(i, A, $ - pB2, k, e, t);
    return j === i ? B : (n = _A2(B, A), n.array[E] = j, n);
  }
  return r && B.array[E] === e ? B : (t && VB2(t), n = _A2(B, A), e === void 0 && E === n.array.length - 1 ? n.array.pop() : n.array[E] = e, n);
}
P2(k$2, "updateVNode");
function _A2(B, A) {
  return A && B && A === B.ownerID ? B : new pA2(B ? B.array.slice() : [], A);
}
P2(_A2, "editableVNode");
function ie2(B, A) {
  if (A >= P72(B._capacity))
    return B._tail;
  if (A < 1 << B._level + pB2) {
    for (var $ = B._root, k = B._level; $ && k > 0; )
      $ = $.array[A >>> k & CB2], k -= pB2;
    return $;
  }
}
P2(ie2, "listNodeFor");
function jA2(B, A, $) {
  A !== void 0 && (A |= 0), $ !== void 0 && ($ |= 0);
  var k = B.__ownerID || new t$2(), e = B._origin, t = B._capacity, E = e + A, r = $ === void 0 ? t : $ < 0 ? t + $ : e + $;
  if (E === e && r === t)
    return B;
  if (E >= r)
    return B.clear();
  for (var n = B._level, i = B._root, j = 0; E + j < 0; )
    i = new pA2(i && i.array.length ? [void 0, i] : [], k), n += pB2, j += 1 << n;
  j && (E += j, e += j, r += j, t += j);
  for (var o = P72(t), m = P72(r); m >= 1 << n + pB2; )
    i = new pA2(i && i.array.length ? [i] : [], k), n += pB2;
  var c = B._tail, p = m < o ? ie2(B, r - 1) : m > o ? new pA2([], k) : c;
  if (c && m > o && E < t && c.array.length) {
    i = _A2(i, k);
    for (var Q = i, f = n; f > pB2; f -= pB2) {
      var Y = o >>> f & CB2;
      Q = Q.array[Y] = _A2(Q.array[Y], k);
    }
    Q.array[o >>> pB2 & CB2] = c;
  }
  if (r < t && (p = p && p.removeAfter(k, 0, r)), E >= m)
    E -= m, r -= m, n = pB2, i = null, p = p && p.removeBefore(k, 0, E);
  else if (E > e || m < o) {
    for (j = 0; i; ) {
      var K = E >>> n & CB2;
      if (K !== m >>> n & CB2)
        break;
      K && (j += (1 << n) * K), n -= pB2, i = i.array[K];
    }
    i && E > e && (i = i.removeBefore(k, n, E - j)), i && m < o && (i = i.removeAfter(k, n, m - j)), j && (E -= j, r -= j);
  }
  return B.__ownerID ? (B.size = r - E, B._origin = E, B._capacity = r, B._level = n, B._root = i, B._tail = p, B.__hash = void 0, B.__altered = true, B) : e72(E, r, n, i, p);
}
P2(jA2, "setListBounds");
function P72(B) {
  return B < KB2 ? 0 : B - 1 >>> pB2 << pB2;
}
P2(P72, "getTailOffset");
var oA2 = function(B) {
  function A($) {
    return $ == null ? zA2() : Fk2($) ? $ : zA2().withMutations(function(k) {
      var e = YB2($);
      JB2(e.size), e.forEach(function(t, E) {
        return k.set(E, t);
      });
    });
  }
  return P2(A, "OrderedMap"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P2(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), A.prototype.get = P2(function(k, e) {
    var t = this._map.get(k);
    return t !== void 0 ? this._list.get(t)[1] : e;
  }, "get"), A.prototype.clear = P2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : zA2();
  }, "clear"), A.prototype.set = P2(function(k, e) {
    return ck2(this, k, e);
  }, "set"), A.prototype.remove = P2(function(k) {
    return ck2(this, k, tB2);
  }, "remove"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    return this._list.__iterate(function(E) {
      return E && k(E[1], E[0], t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    return this._list.fromEntrySeq().__iterator(k, e);
  }, "__iterator"), A.prototype.__ensureOwner = P2(function(k) {
    if (k === this.__ownerID)
      return this;
    var e = this._map.__ensureOwner(k), t = this._list.__ensureOwner(k);
    return k ? x$2(e, t, k, this.__hash) : this.size === 0 ? zA2() : (this.__ownerID = k, this.__altered = false, this._map = e, this._list = t, this);
  }, "__ensureOwner"), A;
}(OA2);
oA2.isOrderedMap = Fk2;
oA2.prototype[UA2] = true;
oA2.prototype[E72] = oA2.prototype.remove;
function x$2(B, A, $, k) {
  var e = Object.create(oA2.prototype);
  return e.size = B ? B.size : 0, e._map = B, e._list = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P2(x$2, "makeOrderedMap");
var uk2;
function zA2() {
  return uk2 || (uk2 = x$2($A2(), f72()));
}
P2(zA2, "emptyOrderedMap");
function ck2(B, A, $) {
  var k = B._map, e = B._list, t = k.get(A), E = t !== void 0, r, n;
  if ($ === tB2) {
    if (!E)
      return B;
    e.size >= KB2 && e.size >= k.size * 2 ? (n = e.filter(function(i, j) {
      return i !== void 0 && t !== j;
    }), r = n.toKeyedSeq().map(function(i) {
      return i[0];
    }).flip().toMap(), B.__ownerID && (r.__ownerID = n.__ownerID = B.__ownerID)) : (r = k.remove(A), n = t === e.size - 1 ? e.pop() : e.set(t, void 0));
  } else if (E) {
    if ($ === e.get(t)[1])
      return B;
    r = k, n = e.set(t, [A, $]);
  } else
    r = k.set(A, e.size), n = e.set(e.size, [A, $]);
  return B.__ownerID ? (B.size = r.size, B._map = r, B._list = n, B.__hash = void 0, B.__altered = true, B) : x$2(r, n);
}
P2(ck2, "updateOrderedMap");
var ae2 = "@@__IMMUTABLE_STACK__@@";
function e$2(B) {
  return Boolean(B && B[ae2]);
}
P2(e$2, "isStack");
var v$2 = function(B) {
  function A($) {
    return $ == null ? g72() : e$2($) ? $ : g72().pushAll($);
  }
  return P2(A, "Stack"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return this(arguments);
  }, "of"), A.prototype.toString = P2(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), A.prototype.get = P2(function(k, e) {
    var t = this._head;
    for (k = uA2(this, k); t && k--; )
      t = t.next;
    return t ? t.value : e;
  }, "get"), A.prototype.peek = P2(function() {
    return this._head && this._head.value;
  }, "peek"), A.prototype.push = P2(function() {
    var k = arguments;
    if (arguments.length === 0)
      return this;
    for (var e = this.size + arguments.length, t = this._head, E = arguments.length - 1; E >= 0; E--)
      t = { value: k[E], next: t };
    return this.__ownerID ? (this.size = e, this._head = t, this.__hash = void 0, this.__altered = true, this) : YA2(e, t);
  }, "push"), A.prototype.pushAll = P2(function(k) {
    if (k = B(k), k.size === 0)
      return this;
    if (this.size === 0 && e$2(k))
      return k;
    JB2(k.size);
    var e = this.size, t = this._head;
    return k.__iterate(function(E) {
      e++, t = { value: E, next: t };
    }, true), this.__ownerID ? (this.size = e, this._head = t, this.__hash = void 0, this.__altered = true, this) : YA2(e, t);
  }, "pushAll"), A.prototype.pop = P2(function() {
    return this.slice(1);
  }, "pop"), A.prototype.clear = P2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : g72();
  }, "clear"), A.prototype.slice = P2(function(k, e) {
    if (b72(k, e, this.size))
      return this;
    var t = r72(k, this.size), E = x72(e, this.size);
    if (E !== this.size)
      return B.prototype.slice.call(this, k, e);
    for (var r = this.size - t, n = this._head; t--; )
      n = n.next;
    return this.__ownerID ? (this.size = r, this._head = n, this.__hash = void 0, this.__altered = true, this) : YA2(r, n);
  }, "slice"), A.prototype.__ensureOwner = P2(function(k) {
    return k === this.__ownerID ? this : k ? YA2(this.size, this._head, k, this.__hash) : this.size === 0 ? g72() : (this.__ownerID = k, this.__altered = false, this);
  }, "__ensureOwner"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    if (e)
      return new TA2(this.toArray()).__iterate(function(n, i) {
        return k(n, i, t);
      }, e);
    for (var E = 0, r = this._head; r && k(r.value, E++, this) !== false; )
      r = r.next;
    return E;
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    if (e)
      return new TA2(this.toArray()).__iterator(k, e);
    var t = 0, E = this._head;
    return new nB2(function() {
      if (E) {
        var r = E.value;
        return E = E.next, hB2(k, t++, r);
      }
      return UB2();
    });
  }, "__iterator"), A;
}(XA2);
v$2.isStack = e$2;
var _B2 = v$2.prototype;
_B2[ae2] = true;
_B2.shift = _B2.pop;
_B2.unshift = _B2.push;
_B2.unshiftAll = _B2.pushAll;
_B2.withMutations = i72;
_B2.wasAltered = f$2;
_B2.asImmutable = s72;
_B2["@@transducer/init"] = _B2.asMutable = a72;
_B2["@@transducer/step"] = function(B, A) {
  return B.unshift(A);
};
_B2["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
function YA2(B, A, $, k) {
  var e = Object.create(_B2);
  return e.size = B, e._head = A, e.__ownerID = $, e.__hash = k, e.__altered = false, e;
}
P2(YA2, "makeStack");
var hk2;
function g72() {
  return hk2 || (hk2 = YA2(0));
}
P2(g72, "emptyStack");
var se2 = "@@__IMMUTABLE_SET__@@";
function M$2(B) {
  return Boolean(B && B[se2]);
}
P2(M$2, "isSet");
function oe2(B) {
  return M$2(B) && kA2(B);
}
P2(oe2, "isOrderedSet");
function le2(B, A) {
  if (B === A)
    return true;
  if (!FB2(A) || B.size !== void 0 && A.size !== void 0 && B.size !== A.size || B.__hash !== void 0 && A.__hash !== void 0 && B.__hash !== A.__hash || cB2(B) !== cB2(A) || IB2(B) !== IB2(A) || kA2(B) !== kA2(A))
    return false;
  if (B.size === 0 && A.size === 0)
    return true;
  var $ = !v72(B);
  if (kA2(B)) {
    var k = B.entries();
    return A.every(function(n, i) {
      var j = k.next().value;
      return j && OB2(j[1], n) && ($ || OB2(j[0], i));
    }) && k.next().done;
  }
  var e = false;
  if (B.size === void 0)
    if (A.size === void 0)
      typeof B.cacheResult == "function" && B.cacheResult();
    else {
      e = true;
      var t = B;
      B = A, A = t;
    }
  var E = true, r = A.__iterate(function(n, i) {
    if ($ ? !B.has(n) : e ? !OB2(n, B.get(i, tB2)) : !OB2(B.get(i, tB2), n))
      return E = false, false;
  });
  return E && B.size === r;
}
P2(le2, "deepEqual");
function fA2(B, A) {
  var $ = P2(function(k) {
    B.prototype[k] = A[k];
  }, "keyCopier");
  return Object.keys(A).forEach($), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(A).forEach($), B;
}
P2(fA2, "mixin");
function H72(B) {
  if (!B || typeof B != "object")
    return B;
  if (!FB2(B)) {
    if (!cA2(B))
      return B;
    B = GB2(B);
  }
  if (cB2(B)) {
    var A = {};
    return B.__iterate(function(k, e) {
      A[e] = H72(k);
    }), A;
  }
  var $ = [];
  return B.__iterate(function(k) {
    $.push(H72(k));
  }), $;
}
P2(H72, "toJS");
var R72 = function(B) {
  function A($) {
    return $ == null ? ZA2() : M$2($) && !kA2($) ? $ : ZA2().withMutations(function(k) {
      var e = B($);
      JB2(e.size), e.forEach(function(t) {
        return k.add(t);
      });
    });
  }
  return P2(A, "Set"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return this(arguments);
  }, "of"), A.fromKeys = P2(function(k) {
    return this(YB2(k).keySeq());
  }, "fromKeys"), A.intersect = P2(function(k) {
    return k = gB2(k).toArray(), k.length ? xB2.intersect.apply(A(k.pop()), k) : ZA2();
  }, "intersect"), A.union = P2(function(k) {
    return k = gB2(k).toArray(), k.length ? xB2.union.apply(A(k.pop()), k) : ZA2();
  }, "union"), A.prototype.toString = P2(function() {
    return this.__toString("Set {", "}");
  }, "toString"), A.prototype.has = P2(function(k) {
    return this._map.has(k);
  }, "has"), A.prototype.add = P2(function(k) {
    return T72(this, this._map.set(k, k));
  }, "add"), A.prototype.remove = P2(function(k) {
    return T72(this, this._map.remove(k));
  }, "remove"), A.prototype.clear = P2(function() {
    return T72(this, this._map.clear());
  }, "clear"), A.prototype.map = P2(function(k, e) {
    var t = this, E = false, r = T72(this, this._map.mapEntries(function(n) {
      var i = n[1], j = k.call(e, i, i, t);
      return j !== i && (E = true), [j, j];
    }, e));
    return E ? r : this;
  }, "map"), A.prototype.union = P2(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    return k = k.filter(function(t) {
      return t.size !== 0;
    }), k.length === 0 ? this : this.size === 0 && !this.__ownerID && k.length === 1 ? this.constructor(k[0]) : this.withMutations(function(t) {
      for (var E = 0; E < k.length; E++)
        typeof k[E] == "string" ? t.add(k[E]) : B(k[E]).forEach(function(r) {
          return t.add(r);
        });
    });
  }, "union"), A.prototype.intersect = P2(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    if (k.length === 0)
      return this;
    k = k.map(function(E) {
      return B(E);
    });
    var t = [];
    return this.forEach(function(E) {
      k.every(function(r) {
        return r.includes(E);
      }) || t.push(E);
    }), this.withMutations(function(E) {
      t.forEach(function(r) {
        E.remove(r);
      });
    });
  }, "intersect"), A.prototype.subtract = P2(function() {
    for (var k = [], e = arguments.length; e--; )
      k[e] = arguments[e];
    if (k.length === 0)
      return this;
    k = k.map(function(E) {
      return B(E);
    });
    var t = [];
    return this.forEach(function(E) {
      k.some(function(r) {
        return r.includes(E);
      }) && t.push(E);
    }), this.withMutations(function(E) {
      t.forEach(function(r) {
        E.remove(r);
      });
    });
  }, "subtract"), A.prototype.sort = P2(function(k) {
    return t72(yA2(this, k));
  }, "sort"), A.prototype.sortBy = P2(function(k, e) {
    return t72(yA2(this, e, k));
  }, "sortBy"), A.prototype.wasAltered = P2(function() {
    return this._map.wasAltered();
  }, "wasAltered"), A.prototype.__iterate = P2(function(k, e) {
    var t = this;
    return this._map.__iterate(function(E) {
      return k(E, E, t);
    }, e);
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    return this._map.__iterator(k, e);
  }, "__iterator"), A.prototype.__ensureOwner = P2(function(k) {
    if (k === this.__ownerID)
      return this;
    var e = this._map.__ensureOwner(k);
    return k ? this.__make(e, k) : this.size === 0 ? this.__empty() : (this.__ownerID = k, this._map = e, this);
  }, "__ensureOwner"), A;
}(IA2);
R72.isSet = M$2;
var xB2 = R72.prototype;
xB2[se2] = true;
xB2[E72] = xB2.remove;
xB2.merge = xB2.concat = xB2.union;
xB2.withMutations = i72;
xB2.asImmutable = s72;
xB2["@@transducer/init"] = xB2.asMutable = a72;
xB2["@@transducer/step"] = function(B, A) {
  return B.add(A);
};
xB2["@@transducer/result"] = function(B) {
  return B.asImmutable();
};
xB2.__empty = ZA2;
xB2.__make = je2;
function T72(B, A) {
  return B.__ownerID ? (B.size = A.size, B._map = A, B) : A === B._map ? B : A.size === 0 ? B.__empty() : B.__make(A);
}
P2(T72, "updateSet");
function je2(B, A) {
  var $ = Object.create(xB2);
  return $.size = B ? B.size : 0, $._map = B, $.__ownerID = A, $;
}
P2(je2, "makeSet");
var mk2;
function ZA2() {
  return mk2 || (mk2 = je2($A2()));
}
P2(ZA2, "emptySet");
var et2 = function(B) {
  function A($, k, e) {
    if (!(this instanceof A))
      return new A($, k, e);
    if (u$2(e !== 0, "Cannot step a Range by 0"), $ = $ || 0, k === void 0 && (k = 1 / 0), e = e === void 0 ? 1 : Math.abs(e), k < $ && (e = -e), this._start = $, this._end = k, this._step = e, this.size = Math.max(0, Math.ceil((k - $) / e - 1) + 1), this.size === 0) {
      if (J72)
        return J72;
      J72 = this;
    }
  }
  return P2(A, "Range"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.prototype.toString = P2(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), A.prototype.get = P2(function(k, e) {
    return this.has(k) ? this._start + uA2(this, k) * this._step : e;
  }, "get"), A.prototype.includes = P2(function(k) {
    var e = (k - this._start) / this._step;
    return e >= 0 && e < this.size && e === Math.floor(e);
  }, "includes"), A.prototype.slice = P2(function(k, e) {
    return b72(k, e, this.size) ? this : (k = r72(k, this.size), e = x72(e, this.size), e <= k ? new A(0, 0) : new A(this.get(k, this._end), this.get(e, this._end), this._step));
  }, "slice"), A.prototype.indexOf = P2(function(k) {
    var e = k - this._start;
    if (e % this._step === 0) {
      var t = e / this._step;
      if (t >= 0 && t < this.size)
        return t;
    }
    return -1;
  }, "indexOf"), A.prototype.lastIndexOf = P2(function(k) {
    return this.indexOf(k);
  }, "lastIndexOf"), A.prototype.__iterate = P2(function(k, e) {
    for (var t = this.size, E = this._step, r = e ? this._start + (t - 1) * E : this._start, n = 0; n !== t && k(r, e ? t - ++n : n++, this) !== false; )
      r += e ? -E : E;
    return n;
  }, "__iterate"), A.prototype.__iterator = P2(function(k, e) {
    var t = this.size, E = this._step, r = e ? this._start + (t - 1) * E : this._start, n = 0;
    return new nB2(function() {
      if (n === t)
        return UB2();
      var i = r;
      return r += e ? -E : E, hB2(k, e ? t - ++n : n++, i);
    });
  }, "__iterator"), A.prototype.equals = P2(function(k) {
    return k instanceof A ? this._start === k._start && this._end === k._end && this._step === k._step : le2(this, k);
  }, "equals"), A;
}(PA2);
var J72;
function pe2(B, A, $) {
  for (var k = zk2(A), e = 0; e !== k.length; )
    if (B = Yk2(B, k[e++], tB2), B === tB2)
      return $;
  return B;
}
P2(pe2, "getIn$1");
function ue2(B, A) {
  return pe2(this, B, A);
}
P2(ue2, "getIn");
function Pt2(B, A) {
  return pe2(B, A, tB2) !== tB2;
}
P2(Pt2, "hasIn$1");
function tt2(B) {
  return Pt2(this, B);
}
P2(tt2, "hasIn");
function ce2() {
  JB2(this.size);
  var B = {};
  return this.__iterate(function(A, $) {
    B[$] = A;
  }), B;
}
P2(ce2, "toObject");
gB2.isIterable = FB2;
gB2.isKeyed = cB2;
gB2.isIndexed = IB2;
gB2.isAssociative = v72;
gB2.isOrdered = kA2;
gB2.Iterator = nB2;
fA2(gB2, { toArray: P2(function() {
  JB2(this.size);
  var A = new Array(this.size || 0), $ = cB2(this), k = 0;
  return this.__iterate(function(e, t) {
    A[k++] = $ ? [t, e] : e;
  }), A;
}, "toArray"), toIndexedSeq: P2(function() {
  return new Lk2(this);
}, "toIndexedSeq"), toJS: P2(function() {
  return H72(this);
}, "toJS$1"), toKeyedSeq: P2(function() {
  return new C72(this, true);
}, "toKeyedSeq"), toMap: P2(function() {
  return OA2(this.toKeyedSeq());
}, "toMap"), toObject: ce2, toOrderedMap: P2(function() {
  return oA2(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: P2(function() {
  return t72(cB2(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: P2(function() {
  return R72(cB2(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: P2(function() {
  return new Wk2(this);
}, "toSetSeq"), toSeq: P2(function() {
  return IB2(this) ? this.toIndexedSeq() : cB2(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: P2(function() {
  return v$2(cB2(this) ? this.valueSeq() : this);
}, "toStack"), toList: P2(function() {
  return _72(cB2(this) ? this.valueSeq() : this);
}, "toList"), toString: P2(function() {
  return "[Collection]";
}, "toString"), __toString: P2(function(A, $) {
  return this.size === 0 ? A + $ : A + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + $;
}, "__toString"), concat: P2(function() {
  for (var A = [], $ = arguments.length; $--; )
    A[$] = arguments[$];
  return oB2(this, _P2(this, A));
}, "concat"), includes: P2(function(A) {
  return this.some(function($) {
    return OB2($, A);
  });
}, "includes"), entries: P2(function() {
  return this.__iterator(zB2);
}, "entries"), every: P2(function(A, $) {
  JB2(this.size);
  var k = true;
  return this.__iterate(function(e, t, E) {
    if (!A.call($, e, t, E))
      return k = false, false;
  }), k;
}, "every"), filter: P2(function(A, $) {
  return oB2(this, qk2(this, A, $, true));
}, "filter"), partition: P2(function(A, $) {
  return wP2(this, A, $);
}, "partition"), find: P2(function(A, $, k) {
  var e = this.findEntry(A, $);
  return e ? e[1] : k;
}, "find"), forEach: P2(function(A, $) {
  return JB2(this.size), this.__iterate($ ? A.bind($) : A);
}, "forEach"), join: P2(function(A) {
  JB2(this.size), A = A !== void 0 ? "" + A : ",";
  var $ = "", k = true;
  return this.__iterate(function(e) {
    k ? k = false : $ += A, $ += e != null ? e.toString() : "";
  }), $;
}, "join"), keys: P2(function() {
  return this.__iterator(n72);
}, "keys"), map: P2(function(A, $) {
  return oB2(this, Gk2(this, A, $));
}, "map"), reduce: P2(function(A, $, k) {
  return Qk2(this, A, $, k, arguments.length < 2, false);
}, "reduce$1"), reduceRight: P2(function(A, $, k) {
  return Qk2(this, A, $, k, arguments.length < 2, true);
}, "reduceRight"), reverse: P2(function() {
  return oB2(this, o$2(this, true));
}, "reverse"), slice: P2(function(A, $) {
  return oB2(this, l$2(this, A, $, true));
}, "slice"), some: P2(function(A, $) {
  return !this.every(X72(A), $);
}, "some"), sort: P2(function(A) {
  return oB2(this, yA2(this, A));
}, "sort"), values: P2(function() {
  return this.__iterator(eA2);
}, "values"), butLast: P2(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: P2(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: P2(function(A, $) {
  return MA2(A ? this.toSeq().filter(A, $) : this);
}, "count"), countBy: P2(function(A, $) {
  return MP2(this, A, $);
}, "countBy"), equals: P2(function(A) {
  return le2(this, A);
}, "equals"), entrySeq: P2(function() {
  var A = this;
  if (A._cache)
    return new TA2(A._cache);
  var $ = A.toSeq().map(rt2).toIndexedSeq();
  return $.fromEntrySeq = function() {
    return A.toSeq();
  }, $;
}, "entrySeq"), filterNot: P2(function(A, $) {
  return this.filter(X72(A), $);
}, "filterNot"), findEntry: P2(function(A, $, k) {
  var e = k;
  return this.__iterate(function(t, E, r) {
    if (A.call($, t, E, r))
      return e = [E, t], false;
  }), e;
}, "findEntry"), findKey: P2(function(A, $) {
  var k = this.findEntry(A, $);
  return k && k[0];
}, "findKey"), findLast: P2(function(A, $, k) {
  return this.toKeyedSeq().reverse().find(A, $, k);
}, "findLast"), findLastEntry: P2(function(A, $, k) {
  return this.toKeyedSeq().reverse().findEntry(A, $, k);
}, "findLastEntry"), findLastKey: P2(function(A, $) {
  return this.toKeyedSeq().reverse().findKey(A, $);
}, "findLastKey"), first: P2(function(A) {
  return this.find(Sk2, null, A);
}, "first"), flatMap: P2(function(A, $) {
  return oB2(this, RP2(this, A, $));
}, "flatMap"), flatten: P2(function(A) {
  return oB2(this, Vk2(this, A, true));
}, "flatten"), fromEntrySeq: P2(function() {
  return new Nk2(this);
}, "fromEntrySeq"), get: P2(function(A, $) {
  return this.find(function(k, e) {
    return OB2(e, A);
  }, void 0, $);
}, "get"), getIn: ue2, groupBy: P2(function(A, $) {
  return yP2(this, A, $);
}, "groupBy"), has: P2(function(A) {
  return this.get(A, tB2) !== tB2;
}, "has"), hasIn: tt2, isSubset: P2(function(A) {
  return A = typeof A.includes == "function" ? A : gB2(A), this.every(function($) {
    return A.includes($);
  });
}, "isSubset"), isSuperset: P2(function(A) {
  return A = typeof A.isSubset == "function" ? A : gB2(A), A.isSubset(this);
}, "isSuperset"), keyOf: P2(function(A) {
  return this.findKey(function($) {
    return OB2($, A);
  });
}, "keyOf"), keySeq: P2(function() {
  return this.toSeq().map(Et2).toIndexedSeq();
}, "keySeq"), last: P2(function(A) {
  return this.toSeq().reverse().first(A);
}, "last"), lastKeyOf: P2(function(A) {
  return this.toKeyedSeq().reverse().keyOf(A);
}, "lastKeyOf"), max: P2(function(A) {
  return Q72(this, A);
}, "max"), maxBy: P2(function(A, $) {
  return Q72(this, $, A);
}, "maxBy"), min: P2(function(A) {
  return Q72(this, A ? dk2(A) : Tk2);
}, "min"), minBy: P2(function(A, $) {
  return Q72(this, $ ? dk2($) : Tk2, A);
}, "minBy"), rest: P2(function() {
  return this.slice(1);
}, "rest"), skip: P2(function(A) {
  return A === 0 ? this : this.slice(Math.max(0, A));
}, "skip"), skipLast: P2(function(A) {
  return A === 0 ? this : this.slice(0, -Math.max(0, A));
}, "skipLast"), skipWhile: P2(function(A, $) {
  return oB2(this, Kk2(this, A, $, true));
}, "skipWhile"), skipUntil: P2(function(A, $) {
  return this.skipWhile(X72(A), $);
}, "skipUntil"), sortBy: P2(function(A, $) {
  return oB2(this, yA2(this, $, A));
}, "sortBy"), take: P2(function(A) {
  return this.slice(0, Math.max(0, A));
}, "take"), takeLast: P2(function(A) {
  return this.slice(-Math.max(0, A));
}, "takeLast"), takeWhile: P2(function(A, $) {
  return oB2(this, CP2(this, A, $));
}, "takeWhile"), takeUntil: P2(function(A, $) {
  return this.takeWhile(X72(A), $);
}, "takeUntil"), update: P2(function(A) {
  return A(this);
}, "update"), valueSeq: P2(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: P2(function() {
  return this.__hash || (this.__hash = nt2(this));
}, "hashCode") });
var wB2 = gB2.prototype;
wB2[xk2] = true;
wB2[M72] = wB2.values;
wB2.toJSON = wB2.toArray;
wB2.__toStringMapper = A72;
wB2.inspect = wB2.toSource = function() {
  return this.toString();
};
wB2.chain = wB2.flatMap;
wB2.contains = wB2.includes;
fA2(YB2, { flip: P2(function() {
  return oB2(this, Ok2(this));
}, "flip"), mapEntries: P2(function(A, $) {
  var k = this, e = 0;
  return oB2(this, this.toSeq().map(function(t, E) {
    return A.call($, [E, t], e++, k);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: P2(function(A, $) {
  var k = this;
  return oB2(this, this.toSeq().flip().map(function(e, t) {
    return A.call($, e, t, k);
  }).flip());
}, "mapKeys") });
var o72 = YB2.prototype;
o72[vk2] = true;
o72[M72] = wB2.entries;
o72.toJSON = ce2;
o72.__toStringMapper = function(B, A) {
  return A72(A) + ": " + A72(B);
};
fA2(XA2, { toKeyedSeq: P2(function() {
  return new C72(this, false);
}, "toKeyedSeq"), filter: P2(function(A, $) {
  return oB2(this, qk2(this, A, $, false));
}, "filter"), findIndex: P2(function(A, $) {
  var k = this.findEntry(A, $);
  return k ? k[0] : -1;
}, "findIndex"), indexOf: P2(function(A) {
  var $ = this.keyOf(A);
  return $ === void 0 ? -1 : $;
}, "indexOf"), lastIndexOf: P2(function(A) {
  var $ = this.lastKeyOf(A);
  return $ === void 0 ? -1 : $;
}, "lastIndexOf"), reverse: P2(function() {
  return oB2(this, o$2(this, false));
}, "reverse"), slice: P2(function(A, $) {
  return oB2(this, l$2(this, A, $, false));
}, "slice"), splice: P2(function(A, $) {
  var k = arguments.length;
  if ($ = Math.max($ || 0, 0), k === 0 || k === 2 && !$)
    return this;
  A = r72(A, A < 0 ? this.count() : this.size);
  var e = this.slice(0, A);
  return oB2(this, k === 1 ? e : e.concat(rA2(arguments, 2), this.slice(A + $)));
}, "splice"), findLastIndex: P2(function(A, $) {
  var k = this.findLastEntry(A, $);
  return k ? k[0] : -1;
}, "findLastIndex"), first: P2(function(A) {
  return this.get(0, A);
}, "first"), flatten: P2(function(A) {
  return oB2(this, Vk2(this, A, false));
}, "flatten"), get: P2(function(A, $) {
  return A = uA2(this, A), A < 0 || this.size === 1 / 0 || this.size !== void 0 && A > this.size ? $ : this.find(function(k, e) {
    return e === A;
  }, void 0, $);
}, "get"), has: P2(function(A) {
  return A = uA2(this, A), A >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || A < this.size : this.indexOf(A) !== -1);
}, "has"), interpose: P2(function(A) {
  return oB2(this, DP2(this, A));
}, "interpose"), interleave: P2(function() {
  var A = [this].concat(rA2(arguments)), $ = d72(this.toSeq(), PA2.of, A), k = $.flatten(true);
  return $.size && (k.size = $.size * A.length), oB2(this, k);
}, "interleave"), keySeq: P2(function() {
  return et2(0, this.size);
}, "keySeq"), last: P2(function(A) {
  return this.get(-1, A);
}, "last"), skipWhile: P2(function(A, $) {
  return oB2(this, Kk2(this, A, $, false));
}, "skipWhile"), zip: P2(function() {
  var A = [this].concat(rA2(arguments));
  return oB2(this, d72(this, gk2, A));
}, "zip"), zipAll: P2(function() {
  var A = [this].concat(rA2(arguments));
  return oB2(this, d72(this, gk2, A, true));
}, "zipAll"), zipWith: P2(function(A) {
  var $ = rA2(arguments);
  return $[0] = this, oB2(this, d72(this, A, $));
}, "zipWith") });
var GA2 = XA2.prototype;
GA2[Mk2] = true;
GA2[UA2] = true;
fA2(IA2, { get: P2(function(A, $) {
  return this.has(A) ? A : $;
}, "get"), includes: P2(function(A) {
  return this.has(A);
}, "includes"), keySeq: P2(function() {
  return this.valueSeq();
}, "keySeq") });
var RA2 = IA2.prototype;
RA2.has = wB2.includes;
RA2.contains = RA2.includes;
RA2.keys = RA2.values;
fA2(hA2, o72);
fA2(PA2, GA2);
fA2(WA2, RA2);
function Qk2(B, A, $, k, e, t) {
  return JB2(B.size), B.__iterate(function(E, r, n) {
    e ? (e = false, $ = E) : $ = A.call(k, $, E, r, n);
  }, t), $;
}
P2(Qk2, "reduce");
function Et2(B, A) {
  return A;
}
P2(Et2, "keyMapper");
function rt2(B, A) {
  return [A, B];
}
P2(rt2, "entryMapper");
function X72(B) {
  return function() {
    return !B.apply(this, arguments);
  };
}
P2(X72, "not");
function dk2(B) {
  return function() {
    return -B.apply(this, arguments);
  };
}
P2(dk2, "neg");
function gk2() {
  return rA2(arguments);
}
P2(gk2, "defaultZipper");
function Tk2(B, A) {
  return B < A ? 1 : B > A ? -1 : 0;
}
P2(Tk2, "defaultNegComparator");
function nt2(B) {
  if (B.size === 1 / 0)
    return 0;
  var A = kA2(B), $ = cB2(B), k = A ? 1 : 0, e = B.__iterate($ ? A ? function(t, E) {
    k = 31 * k + Xk2(NB2(t), NB2(E)) | 0;
  } : function(t, E) {
    k = k + Xk2(NB2(t), NB2(E)) | 0;
  } : A ? function(t) {
    k = 31 * k + NB2(t) | 0;
  } : function(t) {
    k = k + NB2(t) | 0;
  });
  return it2(e, k);
}
P2(nt2, "hashCollection");
function it2(B, A) {
  return A = JA2(A, 3432918353), A = JA2(A << 15 | A >>> -15, 461845907), A = JA2(A << 13 | A >>> -13, 5), A = (A + 3864292196 | 0) ^ B, A = JA2(A ^ A >>> 16, 2246822507), A = JA2(A ^ A >>> 13, 3266489909), A = w72(A ^ A >>> 16), A;
}
P2(it2, "murmurHashOfSize");
function Xk2(B, A) {
  return B ^ A + 2654435769 + (B << 6) + (B >> 2) | 0;
}
P2(Xk2, "hashMerge");
var t72 = function(B) {
  function A($) {
    return $ == null ? P$2() : oe2($) ? $ : P$2().withMutations(function(k) {
      var e = IA2($);
      JB2(e.size), e.forEach(function(t) {
        return k.add(t);
      });
    });
  }
  return P2(A, "OrderedSet"), B && (A.__proto__ = B), A.prototype = Object.create(B && B.prototype), A.prototype.constructor = A, A.of = P2(function() {
    return this(arguments);
  }, "of"), A.fromKeys = P2(function(k) {
    return this(YB2(k).keySeq());
  }, "fromKeys"), A.prototype.toString = P2(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), A;
}(R72);
t72.isOrderedSet = oe2;
var SA2 = t72.prototype;
SA2[UA2] = true;
SA2.zip = GA2.zip;
SA2.zipWith = GA2.zipWith;
SA2.zipAll = GA2.zipAll;
SA2.__empty = P$2;
SA2.__make = he2;
function he2(B, A) {
  var $ = Object.create(SA2);
  return $.size = B ? B.size : 0, $._map = B, $.__ownerID = A, $;
}
P2(he2, "makeOrderedSet");
var fk2;
function P$2() {
  return fk2 || (fk2 = he2(zA2()));
}
P2(P$2, "emptyOrderedSet");
function at2(B) {
  if (FA2(B))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (nA2(B))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (B === null || typeof B != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
P2(at2, "throwOnInvalidDefaultValues");
var mB2 = P2(function(A, $) {
  var k;
  at2(A);
  var e = P2(function(r) {
    var n = this;
    if (r instanceof e)
      return r;
    if (!(this instanceof e))
      return new e(r);
    if (!k) {
      k = true;
      var i = Object.keys(A), j = t._indices = {};
      t._name = $, t._keys = i, t._defaultValues = A;
      for (var o = 0; o < i.length; o++) {
        var m = i[o];
        j[m] = o, t[m] ? typeof console == "object" && console.warn && console.warn("Cannot define " + w$2(this) + ' with property "' + m + '" since that property name is part of the Record API.') : st2(t, m);
      }
    }
    return this.__ownerID = void 0, this._values = _72().withMutations(function(c) {
      c.setSize(n._keys.length), YB2(r).forEach(function(p, Q) {
        c.set(n._indices[Q], p === n._defaultValues[Q] ? void 0 : p);
      });
    }), this;
  }, "Record"), t = e.prototype = Object.create(jB2);
  return t.constructor = e, $ && (e.displayName = $), e;
}, "Record");
mB2.prototype.toString = P2(function() {
  for (var A = w$2(this) + " { ", $ = this._keys, k, e = 0, t = $.length; e !== t; e++)
    k = $[e], A += (e ? ", " : "") + k + ": " + A72(this.get(k));
  return A + " }";
}, "toString");
mB2.prototype.equals = P2(function(A) {
  return this === A || FA2(A) && DA2(this).equals(DA2(A));
}, "equals");
mB2.prototype.hashCode = P2(function() {
  return DA2(this).hashCode();
}, "hashCode");
mB2.prototype.has = P2(function(A) {
  return this._indices.hasOwnProperty(A);
}, "has");
mB2.prototype.get = P2(function(A, $) {
  if (!this.has(A))
    return $;
  var k = this._indices[A], e = this._values.get(k);
  return e === void 0 ? this._defaultValues[A] : e;
}, "get");
mB2.prototype.set = P2(function(A, $) {
  if (this.has(A)) {
    var k = this._values.set(this._indices[A], $ === this._defaultValues[A] ? void 0 : $);
    if (k !== this._values && !this.__ownerID)
      return y$2(this, k);
  }
  return this;
}, "set");
mB2.prototype.remove = P2(function(A) {
  return this.set(A);
}, "remove");
mB2.prototype.clear = P2(function() {
  var A = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : y$2(this, A);
}, "clear");
mB2.prototype.wasAltered = P2(function() {
  return this._values.wasAltered();
}, "wasAltered");
mB2.prototype.toSeq = P2(function() {
  return DA2(this);
}, "toSeq");
mB2.prototype.toJS = P2(function() {
  return H72(this);
}, "toJS$1");
mB2.prototype.entries = P2(function() {
  return this.__iterator(zB2);
}, "entries");
mB2.prototype.__iterator = P2(function(A, $) {
  return DA2(this).__iterator(A, $);
}, "__iterator");
mB2.prototype.__iterate = P2(function(A, $) {
  return DA2(this).__iterate(A, $);
}, "__iterate");
mB2.prototype.__ensureOwner = P2(function(A) {
  if (A === this.__ownerID)
    return this;
  var $ = this._values.__ensureOwner(A);
  return A ? y$2(this, $, A) : (this.__ownerID = A, this._values = $, this);
}, "__ensureOwner");
mB2.isRecord = FA2;
mB2.getDescriptiveName = w$2;
var jB2 = mB2.prototype;
jB2[wk2] = true;
jB2[E72] = jB2.remove;
jB2.deleteIn = jB2.removeIn = h$2;
jB2.getIn = ue2;
jB2.hasIn = wB2.hasIn;
jB2.merge = Ae2;
jB2.mergeWith = $e2;
jB2.mergeIn = T$2;
jB2.mergeDeep = ee2;
jB2.mergeDeepWith = Pe2;
jB2.mergeDeepIn = X$2;
jB2.setIn = c$2;
jB2.update = m$2;
jB2.updateIn = Q$2;
jB2.withMutations = i72;
jB2.asMutable = a72;
jB2.asImmutable = s72;
jB2[M72] = jB2.entries;
jB2.toJSON = jB2.toObject = wB2.toObject;
jB2.inspect = jB2.toSource = function() {
  return this.toString();
};
function y$2(B, A, $) {
  var k = Object.create(Object.getPrototypeOf(B));
  return k._values = A, k.__ownerID = $, k;
}
P2(y$2, "makeRecord");
function w$2(B) {
  return B.constructor.displayName || B.constructor.name || "Record";
}
P2(w$2, "recordName");
function DA2(B) {
  return i$2(B._keys.map(function(A) {
    return [A, B.get(A)];
  }));
}
P2(DA2, "recordSeq");
function st2(B, A) {
  try {
    Object.defineProperty(B, A, { get: function() {
      return this.get(A);
    }, set: function($) {
      u$2(this.__ownerID, "Cannot set on an immutable record."), this.set(A, $);
    } });
  } catch {
  }
}
P2(st2, "setProp");
_$2();
var jt = `<!DOCTYPE html>
<html lang="en">

<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="sharedArrayBuffer" description="using cross-origin-isolation in the web browser">
  <base href="/">
  <link rel="shortcut icon" type="image/png" href="/src/assets/favicons/chunk-chunk-fe2f7da4f9ccc2.png">
  <title>Instant React Editor</title>

  <script type="importMap"><\/script>
  <style>
    html,
    body {
      overflow: hidden;
      margin: 0;
      height: 100%;
      --webkit-overflow-scrolling: touch;
      overscroll-behavior-x: none;
    }

    q {
      display: none;
    }


    @media screen and (prefers-color-scheme: dark) {
      body {
        background-color: #121212;
        ;
        color: hsl(210, 10%, 62%);
        --text-color-normal: hsl(210, 10%, 62%);
        --text-color-light: hsl(210, 15%, 35%);
        --text-color-richer: hsl(210, 50%, 72%);
        --text-color-highlight: hsl(25, 70%, 45%);
      }
    }


    @media screen and (prefers-color-scheme: light) {
      body {
        background-color: white;
        color: black;
        --text-color-normal: #0a244d;
        --text-color-light: #8cabd9;
      }
    }

    /**reset*/
  </style>
</head>


<body>
  <div id="root"></div>
</body>

</html>`;
aB2();
var ZB2 = P2((B) => pt2(B).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8), "md5");
function pt2(B) {
  let A = "0123456789abcdef";
  function $(z) {
    let I, N = "";
    for (I = 0; I <= 3; I++)
      N += A.charAt(z >> I * 8 + 4 & 15) + A.charAt(z >> I * 8 & 15);
    return N;
  }
  P2($, "rh");
  function k(z, I) {
    let N = (z & 65535) + (I & 65535);
    return (z >> 16) + (I >> 16) + (N >> 16) << 16 | N & 65535;
  }
  P2(k, "ad");
  function e(z, I) {
    return z << I | z >>> 32 - I;
  }
  P2(e, "rl");
  function t(z, I, N, iB, F, RB) {
    return k(e(k(k(I, z), k(iB, RB)), F), N);
  }
  P2(t, "cm");
  function E(z, I, N, iB, F, RB, DB) {
    return t(I & N | ~I & iB, z, I, F, RB, DB);
  }
  P2(E, "ff");
  function r(z, I, N, iB, F, RB, DB) {
    return t(I & iB | N & ~iB, z, I, F, RB, DB);
  }
  P2(r, "gg");
  function n(z, I, N, iB, F, RB, DB) {
    return t(I ^ N ^ iB, z, I, F, RB, DB);
  }
  P2(n, "hh");
  function i(z, I, N, iB, F, RB, DB) {
    return t(N ^ (I | ~iB), z, I, F, RB, DB);
  }
  P2(i, "ii");
  function j(z) {
    let I, N = (z.length + 8 >> 6) + 1, iB = Array.from({ length: N * 16 });
    for (I = 0; I < N * 16; I++)
      iB[I] = 0;
    for (I = 0; I < z.length; I++)
      iB[I >> 2] |= z.charCodeAt(I) << I % 4 * 8;
    return iB[I >> 2] |= 128 << I % 4 * 8, iB[N * 16 - 2] = z.length * 8, iB;
  }
  P2(j, "sb");
  let o, m = j(B), c = 1732584193, p = -271733879, Q = -1732584194, f = 271733878, Y, K, sB, lB;
  for (o = 0; o < m.length; o += 16)
    Y = c, K = p, sB = Q, lB = f, c = E(c, p, Q, f, m[o + 0], 7, -680876936), f = E(f, c, p, Q, m[o + 1], 12, -389564586), Q = E(Q, f, c, p, m[o + 2], 17, 606105819), p = E(p, Q, f, c, m[o + 3], 22, -1044525330), c = E(c, p, Q, f, m[o + 4], 7, -176418897), f = E(f, c, p, Q, m[o + 5], 12, 1200080426), Q = E(Q, f, c, p, m[o + 6], 17, -1473231341), p = E(p, Q, f, c, m[o + 7], 22, -45705983), c = E(c, p, Q, f, m[o + 8], 7, 1770035416), f = E(f, c, p, Q, m[o + 9], 12, -1958414417), Q = E(Q, f, c, p, m[o + 10], 17, -42063), p = E(p, Q, f, c, m[o + 11], 22, -1990404162), c = E(c, p, Q, f, m[o + 12], 7, 1804603682), f = E(f, c, p, Q, m[o + 13], 12, -40341101), Q = E(Q, f, c, p, m[o + 14], 17, -1502002290), p = E(p, Q, f, c, m[o + 15], 22, 1236535329), c = r(c, p, Q, f, m[o + 1], 5, -165796510), f = r(f, c, p, Q, m[o + 6], 9, -1069501632), Q = r(Q, f, c, p, m[o + 11], 14, 643717713), p = r(p, Q, f, c, m[o + 0], 20, -373897302), c = r(c, p, Q, f, m[o + 5], 5, -701558691), f = r(f, c, p, Q, m[o + 10], 9, 38016083), Q = r(Q, f, c, p, m[o + 15], 14, -660478335), p = r(p, Q, f, c, m[o + 4], 20, -405537848), c = r(c, p, Q, f, m[o + 9], 5, 568446438), f = r(f, c, p, Q, m[o + 14], 9, -1019803690), Q = r(Q, f, c, p, m[o + 3], 14, -187363961), p = r(p, Q, f, c, m[o + 8], 20, 1163531501), c = r(c, p, Q, f, m[o + 13], 5, -1444681467), f = r(f, c, p, Q, m[o + 2], 9, -51403784), Q = r(Q, f, c, p, m[o + 7], 14, 1735328473), p = r(p, Q, f, c, m[o + 12], 20, -1926607734), c = n(c, p, Q, f, m[o + 5], 4, -378558), f = n(f, c, p, Q, m[o + 8], 11, -2022574463), Q = n(Q, f, c, p, m[o + 11], 16, 1839030562), p = n(p, Q, f, c, m[o + 14], 23, -35309556), c = n(c, p, Q, f, m[o + 1], 4, -1530992060), f = n(f, c, p, Q, m[o + 4], 11, 1272893353), Q = n(Q, f, c, p, m[o + 7], 16, -155497632), p = n(p, Q, f, c, m[o + 10], 23, -1094730640), c = n(c, p, Q, f, m[o + 13], 4, 681279174), f = n(f, c, p, Q, m[o + 0], 11, -358537222), Q = n(Q, f, c, p, m[o + 3], 16, -722521979), p = n(p, Q, f, c, m[o + 6], 23, 76029189), c = n(c, p, Q, f, m[o + 9], 4, -640364487), f = n(f, c, p, Q, m[o + 12], 11, -421815835), Q = n(Q, f, c, p, m[o + 15], 16, 530742520), p = n(p, Q, f, c, m[o + 2], 23, -995338651), c = i(c, p, Q, f, m[o + 0], 6, -198630844), f = i(f, c, p, Q, m[o + 7], 10, 1126891415), Q = i(Q, f, c, p, m[o + 14], 15, -1416354905), p = i(p, Q, f, c, m[o + 5], 21, -57434055), c = i(c, p, Q, f, m[o + 12], 6, 1700485571), f = i(f, c, p, Q, m[o + 3], 10, -1894986606), Q = i(Q, f, c, p, m[o + 10], 15, -1051523), p = i(p, Q, f, c, m[o + 1], 21, -2054922799), c = i(c, p, Q, f, m[o + 8], 6, 1873313359), f = i(f, c, p, Q, m[o + 15], 10, -30611744), Q = i(Q, f, c, p, m[o + 6], 15, -1560198380), p = i(p, Q, f, c, m[o + 13], 21, 1309151649), c = i(c, p, Q, f, m[o + 4], 6, -145523070), f = i(f, c, p, Q, m[o + 11], 10, -1120210379), Q = i(Q, f, c, p, m[o + 2], 15, 718787259), p = i(p, Q, f, c, m[o + 9], 21, -343485551), c = k(c, Y), p = k(p, K), Q = k(Q, sB), f = k(f, lB);
  return $(c) + $(p) + $(Q) + $(f);
}
P2(pt2, "md5FULL");
aB2();
var ut = `
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
R$2();
aB2();
var ve2 = Ak2(xe2(), 1);
function Me2(B, A) {
  return (0, ve2.default)(B, A).map((e) => e[0] === 1 ? e : [e[0], e[1].length]);
}
P2(Me2, "createDelta");
function U$2(B, A) {
  let $ = "", k = 0;
  for (let e of A) {
    let t = e[0], E = e[1];
    e[0] === -1 && typeof E == "number" ? k += E : t == 0 && typeof E == "number" ? $ += B.slice(k, k += E) : $ += E;
  }
  return $;
}
P2(U$2, "applyPatch");
aB2();
aB2();
var j72 = Ak2(ye2(), 1);
var we2 = "./chunk-esbuild-XXIAOOGR.wasm";
aB2();
R$2();
aB2();
var I72 = { init: false, initialize: (B) => I72.init === false ? I72.init = (0, j72.initialize)({ wasmURL: new URL(we2, B + "/src/").toString() }) : I72.init };
var _e2 = P2(async (B, A, $) => {
  let k = I72.initialize($);
  k !== true && await k;
  let e = await (0, j72.transform)(B, { ...A, define: { ...Tt2, ...A?.define ? A.define : {} } });
  return { code: `/*${ZB2(B)}*/` + e.code };
}, "initAndTransform");
var Tt2 = { "process.env.NODE_ENV": '"development"', "process.env.NODE_DEBUG": JSON.stringify(false), "process.browser": JSON.stringify(true), "process.env.DEBUG": JSON.stringify(true), isBrowser: JSON.stringify(true), isJest: JSON.stringify(false), "process.env.version": '"1.1.1"', global: "globalThis", WORKER_DOM_DEBUG: JSON.stringify(false), "process.env.DUMP_SESSION_KEYS": JSON.stringify(false), process: JSON.stringify({ env: { NODE_ENV: "development", browser: true, NODE_DEBUG: false, DEBUG: true, isBrowser: true }, browser: true }) };
async function Ce2(B, A) {
  return (await _e2(B, { loader: "tsx", format: "esm", treeShaking: true, platform: "browser", minify: false, keepNames: true, tsconfigRaw: { compilerOptions: { jsx: "react-jsx", useDefineForClassFields: false, jsxFragmentFactory: "Fragment", jsxImportSource: "@emotion/react" } }, target: "es2022" }, A)).code;
}
P2(Ce2, "esmTransform");
var RE2 = { imports: me2.imports };
function DE2(B, A) {
  let $ = { syncDb: async (k, e, t) => {
    let { getItem: E, setItem: r } = $;
    return await P2(async (i, j, o) => await St2(r, E, i, j, o), "syncDb")(k, e, t);
  }, getItem: async (k) => await (await A(B)).getItem(k), setItem: async (k, e) => await (await A(B)).setItem(k, e) };
  return $;
}
P2(DE2, "db");
function Xt2(B, A) {
  return mB2({ ...A, room: B, state: mB2(A.state)() });
}
P2(Xt2, "initSession");
var ft2 = new VA2();
var St2 = P2(async (B, A, $, k, e) => {
  ft2.runExclusive(async () => {
    let t = P2((j, o) => B(String(j), o), "setItem"), E = P2((j) => A(String(j)), "getItem"), r = $.newHash, n = await A("head");
    n || (await t(r, $), await B("head", r), n = r), await t(e.newHash, { ...k, oldHash: e.oldHash, reversePatch: e.reversePatch });
    let i = await E(n);
    await t(n, { newHash: e.newHash, patch: e.patch, ...i ? { i: i.i, oldHash: i.oldHash, reversePatch: i.reversePatch } : { code: $.code, transpiled: $.transpiled, html: $.html, css: $.css } }), await B("head", e.newHash);
  });
}, "syncStorage");
var qB2 = {};
var mA2 = {};
var F72 = class {
  constructor(A, $) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      let A2 = this.session.get("state"), $2 = A2.hashCode();
      return mA2[$2] = A2, $2;
    };
    this.createPatchFromHashCode = (A2, $2) => {
      let k2 = JSON.parse(qA2($2));
      mA2[U72(this.room)] = this.session.get("state");
      let e = mA2[A2], t = A2, E = qA2(e.toJSON()), r = e.merge(k2), n = qA2(r.toJSON()).split(ZB2(r.get("transpiled"))).join("css"), i = this.session.get("state").merge(JSON.parse(n)), j = i.hashCode();
      mA2[j] = i;
      let o = Re2(E, n), m = Re2(n, E);
      return { oldHash: t, newHash: j, reversePatch: m, patch: o };
    };
    this.patchSync = (A2, $2 = false) => {
      if (!$2) {
        if (A2.code !== this.session.get("state").code && A2.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (A2.i, A2.i < this.session.get("state").i && (console.log("never going back!"), A2.i = this.session.get("state").i + 1), A2.code !== this.session.get("state").code && A2.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (A2.transpiled.slice(0, 12) !== `/*${ZB2(A2.code)}*/`)
          throw console.error(`missing: /*${ZB2(A2.code)}*/, transpiled: ${A2.transpiled.slice(0, 12)}`), new Error("transpiled	hack issue");
        if (A2.code.length < 5)
          throw new Error("code deleted?");
        if (A2.html.indexOf(ZB2(A2.transpiled)) === -1)
          throw console.error(`missing md5trans from html: ${ZB2(A2.transpiled)}
      ${A2.html.slice(0, 64)}
      
      `), new Error(`render hack issue missing: ${ZB2(A2.transpiled)}.`);
        if (A2.css.length && A2.css.indexOf(ZB2(A2.transpiled)) === -1)
          throw console.error(`missing from css: ${ZB2(A2.transpiled)}`), new Error(`render hack issue missing: ${ZB2(A2.transpiled)}.`);
      }
      let k2 = this.session.get("state").hashCode();
      return this.session = this.session.set("state", this.session.get("state").merge(A2)), this.session.get("state").hashCode() !== k2 && $2 !== true && this.update(), this.session;
    };
    this.applyPatch = ({ oldHash: A2, newHash: $2, patch: k2 }) => {
      if (!(A2 && $2 && k2.length))
        return;
      mA2[U72(this.room)] = this.session.get("state");
      let e = mA2[A2];
      if (!e)
        throw new Error(`cant find old record: ${A2}`);
      let t = qA2(e.toJSON()), E = U$2(t, k2), r = JSON.parse(E), n = this.session.get("state").merge(r), i = this.session.get("state").merge(n);
      if (i.hashCode() === $2)
        this.session = this.session.set("state", i), mA2[$2] = this.session.get("state");
      else
        throw new Error("Wrong patch");
      return $2;
    };
    qB2[A] = this, this.room = A;
    let k = null;
    this.session = Xt2(A, { ...$, state: k || JSON.parse(qA2({ ...$.state, codeSpace: A })) })(), mA2[U72(A)] = this.session.get("state");
  }
  update() {
    Object.keys(this.cb).map((A) => this.cb[A]).map((A) => {
      try {
        A();
      } catch ($) {
        console.error("error calling callback", { err: $ });
      }
    });
  }
  onUpdate(A, $) {
    this.cb[$] = A;
  }
  json() {
    let A = this.session.toJSON(), $ = A.state.toJSON();
    return { ...A, state: $ };
  }
  setRoom(A) {
    let $ = this.session.set("room", A);
    this.session = $;
  }
};
P2(F72, "CodeSession");
var U72 = P2((B) => qB2[B]?.session.get("state").hashCode(), "hashKEY");
function IE2(B, A) {
  if (A && A.length) {
    let $ = qB2[B]?.session.get("state").toJSON(), { i: k, transpiled: e, code: t, html: E, css: r } = A ? JSON.parse(U$2(qA2($), A)) : $;
    return qB2[B]?.session.get("state").merge({ i: k, transpiled: e, code: t, html: E, css: r }).toObject();
  }
  return qB2[B].session.get("state").toObject();
}
P2(IE2, "mST");
function qA2(B) {
  let { i: A, transpiled: $, code: k, html: e, css: t } = B;
  return JSON.stringify({ i: A, transpiled: $, code: k, html: e, css: t });
}
P2(qA2, "string_");
var FE2 = P2((B, A) => qB2[A]?.applyPatch(B), "applyPatchSync");
var UE2 = P2((B, A) => {
  qB2[A]?.applyPatch(B), qB2[A]?.update();
}, "applyPatch");
var LE2 = P2((B, A = "default", $) => qB2[$]?.onUpdate(B, A), "onSessionUpdate");
var Ht2 = P2((B, A, $) => ({ codeSpace: $, i: A.i, ...qB2[$]?.createPatchFromHashCode(B, A) }), "makePatchFrom");
var WE2 = P2((B, A) => ({ ...Ht2(U72(A), B, A), codeSpace: A, i: B.i }), "makePatch");
var NE2 = P2((B, A) => qB2[B] || (qB2[B] = new F72(B, { name: A.name, state: { ...A.state } })), "startSession");
function Re2(B, A) {
  return Me2(B, A);
}
P2(Re2, "createPatch");
var OE2 = P2((B, A = true) => qB2[B.codeSpace].patchSync(B, A), "patchSync");
function GE2(B) {
  return mB2(B)().hashCode();
}
P2(GE2, "hashCode");

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
        const start = ZB2(
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
          case "importMap.json":
            return new Response(JSON.stringify(RE2), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH
              }
            });
          case "api":
            return handleApiRequest(path2.slice(1), request, env);
          case "ata":
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
            const file = newUrl.pathname.slice(0, 7) === "/assets/" ? newUrl.pathname.slice(8) : newUrl.pathname.slice(1);
            if (files[file]) {
              const kvCacheKey = new Request(
                request.url.replace(file, files[file])
              );
              response = await cache.match(kvCacheKey);
              if (response)
                return response;
              let kvResp = await (0, import_kv_asset_handler.getAssetFromKV)(
                {
                  request,
                  waitUntil: async (prom) => await prom
                },
                {
                  // cacheControl: (isChunk(url.href)
                  //   ? {
                  //     browserTTL: 2 * 60 * 60 * 24,
                  //     edgeTTL: 2 * 60 * 60 * 24,
                  //     orbypassCache: false,
                  //   }
                  //   : {
                  //     browserTTL: 0,
                  //     edgeTTL: 0,
                  //     bypassCache: true,
                  //   }),
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST
                }
              );
              if (!kvResp.ok) {
                request = new Request(
                  request.url.replace(url.origin, url.origin + "/src")
                );
                kvResp = await (0, import_kv_asset_handler.getAssetFromKV)(
                  {
                    request,
                    waitUntil: async (prom) => await prom
                  },
                  {
                    // cacheControl: (isChunk(url.href)
                    //   ? {
                    //     browserTTL: 2 * 60 * 60 * 24,
                    //     edgeTTL: 2 * 60 * 60 * 24,
                    //     orbypassCache: false,
                    //   }
                    //   : {
                    //     browserTTL: 0,
                    //     edgeTTL: 0,
                    //     bypassCache: true,
                    //   }),
                    ASSET_NAMESPACE: env.__STATIC_CONTENT,
                    ASSET_MANIFEST
                  }
                );
              }
              if (!kvResp.ok)
                return kvResp;
              kvResp = new Response(kvResp.body, kvResp);
              const headers2 = new Headers(kvResp.headers);
              if (isChunk(request.url)) {
                headers2.set(
                  "Cache-Control",
                  "public, max-age=604800, immutable"
                );
              }
              headers2.set("Cross-Origin-Embedder-Policy", "require-corp");
              kvResp = new Response(kvResp.body, { ...kvResp, headers: headers2 });
              cache.put(kvCacheKey, kvResp.clone());
              return kvResp;
            }
            const isDTS = u.pathname.endsWith(".d.ts");
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
              request = new Request(
                new URL(newUrl.pathname, "https://raw.githubusercontent.com/").toString()
              );
              response = await fetch(request);
              if (!response.ok)
                return response;
            }
            const redirectUrl = response.headers.get("location") || response.url;
            const headers = new Headers(response.headers);
            headers.set(
              "location",
              redirectUrl.replace(
                "esm.sh/",
                u.hostname + "/"
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
            const isText = !!response?.headers?.get("Content-Type")?.includes(
              "charset"
            );
            const bodyStr = isText ? de2(
              await response.text(),
              u.origin,
              isDTS ? xTs : response.url
            ).split("esm.sh").join(
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
  return link.indexOf("chunk-") !== -1 || chunkRegExp.test(link);
}
var chat_default = api;

// ../../../../../Users/z/.yarn/berry/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/utils.js
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
function sort(keys2, values2, left, right, compare) {
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
  sort(keys2, values2, left, j, compare);
  sort(keys2, values2, j + 1, right, compare);
}

// ../../../../../Users/z/.yarn/berry/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
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
  /**
   * Callback for comparator
   * @callback comparatorCallback
   * @param {Key} a
   * @param {Key} b
   * @returns {number}
   */
  /**
   * @class AVLTree
   * @constructor
   * @param  {comparatorCallback} [comparator]
   * @param  {boolean}            [noDuplicates=false] Disallow duplicates
   */
  constructor(comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }
  /**
   * Clear the tree
   * @return {AVLTree}
   */
  destroy() {
    return this.clear();
  }
  /**
   * Clear the tree
   * @return {AVLTree}
   */
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }
  /**
   * Number of nodes
   * @return {number}
   */
  get size() {
    return this._size;
  }
  /**
   * Whether the tree contains a node with the given key
   * @param  {Key} key
   * @return {boolean} true/false
   */
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
  /* eslint-disable class-methods-use-this */
  /**
   * Successor node
   * @param  {Node} node
   * @return {?Node}
   */
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
  /**
   * Predecessor node
   * @param  {Node} node
   * @return {?Node}
   */
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
  /* eslint-enable class-methods-use-this */
  /**
   * Callback for forEach
   * @callback forEachCallback
   * @param {Node} node
   * @param {number} index
   */
  /**
   * @param  {forEachCallback} callback
   * @return {AVLTree}
   */
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
  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param  {Key}      low
   * @param  {Key}      high
   * @param  {Function} fn
   * @param  {*?}       ctx
   * @return {SplayTree}
   */
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
  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
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
  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
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
  /**
   * Returns node at given index
   * @param  {number} index
   * @return {?Node}
   */
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
  /**
   * Returns node with the minimum key
   * @return {?Node}
   */
  minNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node;
  }
  /**
   * Returns node with the max key
   * @return {?Node}
   */
  maxNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node;
  }
  /**
   * Min key
   * @return {?Key}
   */
  min() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node.key;
  }
  /**
   * Max key
   * @return {?Key}
   */
  max() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node.key;
  }
  /**
   * @return {boolean} true/false
   */
  isEmpty() {
    return !this._root;
  }
  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
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
  /**
   * Removes and returns the node with highest key
   * @return {?Node}
   */
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
  /**
   * Find node by key
   * @param  {Key} key
   * @return {?Node}
   */
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
  /**
   * Insert a node into the tree
   * @param  {Key} key
   * @param  {Value} [data]
   * @return {?Node}
   */
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
  /**
   * Removes the node from the tree. If not found, returns null.
   * @param  {Key} key
   * @return {?Node}
   */
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
  /**
   * Bulk-load items
   * @param  {Array<Key>}  keys
   * @param  {Array<Value>}  [values]
   * @return {AVLTree}
   */
  load(keys2 = [], values2 = [], presort) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const size = keys2.length;
    if (presort)
      sort(keys2, values2, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys2, values2, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  }
  /**
   * Returns true if the tree is balanced
   * @return {boolean}
   */
  isBalanced() {
    return isBalanced(this._root);
  }
  /**
   * String representation of the tree - primitive horizontal print-out
   * @param  {Function(Node):string} [printNode]
   * @return {string}
   */
  toString(printNode) {
    return print(this._root, printNode);
  }
};
AVLTree.default = AVLTree;

// ../../../../../Users/z/.yarn/berry/cache/immutable-npm-4.2.1-1b52575f26-9.zip/node_modules/immutable/dist/immutable.es.js
var DELETE = "delete";
var SHIFT = 5;
var SIZE = 1 << SHIFT;
var MASK = SIZE - 1;
var NOT_SET = {};
function MakeRef() {
  return { value: false };
}
function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}
function OwnerID() {
}
function ensureSize(iter) {
  if (iter.size === void 0) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}
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
function returnTrue() {
  return true;
}
function wholeSlice(begin, end, size) {
  return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
}
function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}
function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}
function resolveIndex(index, size, defaultIndex) {
  return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
}
function isNeg(value) {
  return value < 0 || value === 0 && 1 / value === -Infinity;
}
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
var Collection = function Collection2(value) {
  return isCollection(value) ? value : Seq(value);
};
var KeyedCollection = /* @__PURE__ */ function(Collection3) {
  function KeyedCollection2(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }
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
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;
var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
var Iterator = function Iterator2(next) {
  this.next = next;
};
Iterator.prototype.toString = function toString() {
  return "[Iterator]";
};
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
function iteratorDone() {
  return { value: void 0, done: true };
}
function hasIterator(maybeIterable) {
  if (Array.isArray(maybeIterable)) {
    return true;
  }
  return !!getIteratorFn(maybeIterable);
}
function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === "function";
}
function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}
function getIteratorFn(iterable) {
  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === "function") {
    return iteratorFn;
  }
}
function isEntriesIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.entries;
}
function isKeysIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.keys;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === "string") {
    return true;
  }
  return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? (
    // Only {length: 0} is considered Array-like.
    Object.keys(value).length === 1
  ) : (
    // An object is only Array-like if it has a property where the last value
    // in the array-like may be found (which could be undefined).
    value.hasOwnProperty(value.length - 1)
  ));
}
var Seq = /* @__PURE__ */ function(Collection3) {
  function Seq2(value) {
    return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
  }
  if (Collection3)
    Seq2.__proto__ = Collection3;
  Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
  Seq2.prototype.constructor = Seq2;
  Seq2.prototype.toSeq = function toSeq3() {
    return this;
  };
  Seq2.prototype.toString = function toString5() {
    return this.__toString("Seq {", "}");
  };
  Seq2.prototype.cacheResult = function cacheResult() {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };
  Seq2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  Seq2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
  return Seq2;
}(Collection);
var KeyedSeq = /* @__PURE__ */ function(Seq2) {
  function KeyedSeq2(value) {
    return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
  }
  if (Seq2)
    KeyedSeq2.__proto__ = Seq2;
  KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  KeyedSeq2.prototype.constructor = KeyedSeq2;
  KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq3() {
    return this;
  };
  return KeyedSeq2;
}(Seq);
var IndexedSeq = /* @__PURE__ */ function(Seq2) {
  function IndexedSeq2(value) {
    return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
  }
  if (Seq2)
    IndexedSeq2.__proto__ = Seq2;
  IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  IndexedSeq2.prototype.constructor = IndexedSeq2;
  IndexedSeq2.of = function of() {
    return IndexedSeq2(arguments);
  };
  IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq2() {
    return this;
  };
  IndexedSeq2.prototype.toString = function toString5() {
    return this.__toString("Seq [", "]");
  };
  return IndexedSeq2;
}(Seq);
var SetSeq = /* @__PURE__ */ function(Seq2) {
  function SetSeq2(value) {
    return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
  }
  if (Seq2)
    SetSeq2.__proto__ = Seq2;
  SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  SetSeq2.prototype.constructor = SetSeq2;
  SetSeq2.of = function of() {
    return SetSeq2(arguments);
  };
  SetSeq2.prototype.toSetSeq = function toSetSeq2() {
    return this;
  };
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
  if (IndexedSeq2)
    ArraySeq2.__proto__ = IndexedSeq2;
  ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ArraySeq2.prototype.constructor = ArraySeq2;
  ArraySeq2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };
  ArraySeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  ArraySeq2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
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
  if (KeyedSeq2)
    ObjectSeq2.__proto__ = KeyedSeq2;
  ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ObjectSeq2.prototype.constructor = ObjectSeq2;
  ObjectSeq2.prototype.get = function get11(key, notSetValue) {
    if (notSetValue !== void 0 && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };
  ObjectSeq2.prototype.has = function has5(key) {
    return hasOwnProperty.call(this._object, key);
  };
  ObjectSeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  ObjectSeq2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
  return ObjectSeq2;
}(KeyedSeq);
ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
  function CollectionSeq2(collection) {
    this._collection = collection;
    this.size = collection.length || collection.size;
  }
  if (IndexedSeq2)
    CollectionSeq2.__proto__ = IndexedSeq2;
  CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  CollectionSeq2.prototype.constructor = CollectionSeq2;
  CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse3) {
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
  };
  CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse3) {
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
  };
  return CollectionSeq2;
}(IndexedSeq);
var EMPTY_SEQ;
function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}
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
function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError(
    "Expected Array or collection object of values: " + value
  );
}
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
function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
}
var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
function isValueObject(maybeValue) {
  return Boolean(
    maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
  );
}
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
var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
  a |= 0;
  b |= 0;
  var c = a & 65535;
  var d = b & 65535;
  return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
};
function smi(i32) {
  return i32 >>> 1 & 1073741824 | i32 & 3221225471;
}
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
function hashNullish(nullish) {
  return nullish === null ? 1108378658 : (
    /* undefined */
    1108378659
  );
}
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
function hashString(string) {
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
  }
  return smi(hashed);
}
function hashSymbol(sym) {
  var hashed = symbolMap[sym];
  if (hashed !== void 0) {
    return hashed;
  }
  hashed = nextHash();
  symbolMap[sym] = hashed;
  return hashed;
}
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
function valueOf(obj) {
  return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
}
function nextHash() {
  var nextHash2 = ++_objHashUID;
  if (_objHashUID & 1073741824) {
    _objHashUID = 0;
  }
  return nextHash2;
}
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
  if (KeyedSeq2)
    ToKeyedSequence2.__proto__ = KeyedSeq2;
  ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
  ToKeyedSequence2.prototype.get = function get11(key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };
  ToKeyedSequence2.prototype.has = function has5(key) {
    return this._iter.has(key);
  };
  ToKeyedSequence2.prototype.valueSeq = function valueSeq2() {
    return this._iter.valueSeq();
  };
  ToKeyedSequence2.prototype.reverse = function reverse3() {
    var this$1$1 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };
  ToKeyedSequence2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };
  ToKeyedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v, k) {
      return fn(v, k, this$1$1);
    }, reverse3);
  };
  ToKeyedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._iter.__iterator(type, reverse3);
  };
  return ToKeyedSequence2;
}(KeyedSeq);
ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
  function ToIndexedSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (IndexedSeq2)
    ToIndexedSequence2.__proto__ = IndexedSeq2;
  ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
  ToIndexedSequence2.prototype.includes = function includes3(value) {
    return this._iter.includes(value);
  };
  ToIndexedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var i = 0;
    reverse3 && ensureSize(this);
    return this._iter.__iterate(
      function(v) {
        return fn(v, reverse3 ? this$1$1.size - ++i : i++, this$1$1);
      },
      reverse3
    );
  };
  ToIndexedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
  return ToIndexedSequence2;
}(IndexedSeq);
var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
  function ToSetSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (SetSeq2)
    ToSetSequence2.__proto__ = SetSeq2;
  ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
  ToSetSequence2.prototype.constructor = ToSetSequence2;
  ToSetSequence2.prototype.has = function has5(key) {
    return this._iter.includes(key);
  };
  ToSetSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v) {
      return fn(v, v, this$1$1);
    }, reverse3);
  };
  ToSetSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };
  return ToSetSequence2;
}(SetSeq);
var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
  function FromEntriesSequence2(entries3) {
    this._iter = entries3;
    this.size = entries3.size;
  }
  if (KeyedSeq2)
    FromEntriesSequence2.__proto__ = KeyedSeq2;
  FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
  FromEntriesSequence2.prototype.entrySeq = function entrySeq2() {
    return this._iter.toSeq();
  };
  FromEntriesSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  FromEntriesSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
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
function countByFactory(collection, grouper, context) {
  var groups = Map2().asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function(a) {
      return a + 1;
    });
  });
  return groups.asImmutable();
}
function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map2()).asMutable();
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
function partitionFactory(collection, predicate, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = [[], []];
  collection.__iterate(function(v, k) {
    groups[predicate.call(context, v, k, collection) ? 1 : 0].push(
      isKeyedIter ? [k, v] : v
    );
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  });
}
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
function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection.toSeq().map(function(v, k) {
    return coerce(mapper.call(context, v, k, collection));
  }).flatten(true);
}
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
function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
}
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
function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}
function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError("Expected [K, V] tuple: " + entry);
  }
}
function collectionClass(collection) {
  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
}
function makeSequence(collection) {
  return Object.create(
    (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
  );
}
function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}
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
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
function invariant(condition, error) {
  if (!condition) {
    throw new Error(error);
  }
}
function assertNotInfinite(size) {
  invariant(
    size !== Infinity,
    "Cannot perform this action with an infinite size."
  );
}
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
function isDataStructure(value) {
  return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
}
function quoteString(value) {
  try {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
function has(collection, key) {
  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}
function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
}
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
function setIn$1(collection, keyPath, value) {
  return updateIn$1(collection, keyPath, NOT_SET, function() {
    return value;
  });
}
function setIn(keyPath, v) {
  return setIn$1(this, keyPath, v);
}
function removeIn(collection, keyPath) {
  return updateIn$1(collection, keyPath, function() {
    return NOT_SET;
  });
}
function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}
function update$1(collection, key, notSetValue, updater) {
  return updateIn$1(collection, [key], notSetValue, updater);
}
function update(key, notSetValue, updater) {
  return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
}
function updateIn(keyPath, notSetValue, updater) {
  return updateIn$1(this, keyPath, notSetValue, updater);
}
function merge$1() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeIntoKeyedWith(this, iters);
}
function mergeWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  if (typeof merger !== "function") {
    throw new TypeError("Invalid merger function: " + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}
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
function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}
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
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
  }
  return deepMerger;
}
function areMergeable(oldDataStructure, newDataStructure) {
  var oldSeq = Seq(oldDataStructure);
  var newSeq = Seq(newDataStructure);
  return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
}
function mergeDeep() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeDeepWithSources(this, iters);
}
function mergeDeepWith(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return mergeDeepWithSources(this, iters, merger);
}
function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeWithSources(m, iters);
  });
}
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
function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
function asImmutable() {
  return this.__ensureOwner();
}
function wasAltered() {
  return this.__altered;
}
var Map2 = /* @__PURE__ */ function(KeyedCollection2) {
  function Map3(value) {
    return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
      var iter = KeyedCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (KeyedCollection2)
    Map3.__proto__ = KeyedCollection2;
  Map3.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
  Map3.prototype.constructor = Map3;
  Map3.of = function of() {
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
  };
  Map3.prototype.toString = function toString5() {
    return this.__toString("Map {", "}");
  };
  Map3.prototype.get = function get11(k, notSetValue) {
    return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
  };
  Map3.prototype.set = function set3(k, v) {
    return updateMap(this, k, v);
  };
  Map3.prototype.remove = function remove3(k) {
    return updateMap(this, k, NOT_SET);
  };
  Map3.prototype.deleteAll = function deleteAll(keys2) {
    var collection = Collection(keys2);
    if (collection.size === 0) {
      return this;
    }
    return this.withMutations(function(map2) {
      collection.forEach(function(key) {
        return map2.remove(key);
      });
    });
  };
  Map3.prototype.clear = function clear2() {
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
  };
  Map3.prototype.sort = function sort3(comparator) {
    return OrderedMap(sortFactory(this, comparator));
  };
  Map3.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedMap(sortFactory(this, comparator, mapper));
  };
  Map3.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(map3) {
      map3.forEach(function(value, key) {
        map3.set(key, mapper.call(context, value, key, this$1$1));
      });
    });
  };
  Map3.prototype.__iterator = function __iterator2(type, reverse3) {
    return new MapIterator(this, type, reverse3);
  };
  Map3.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    this._root && this._root.iterate(function(entry) {
      iterations++;
      return fn(entry[1], entry[0], this$1$1);
    }, reverse3);
    return iterations;
  };
  Map3.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
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
  };
  return Map3;
}(KeyedCollection);
Map2.isMap = isMap;
var MapPrototype = Map2.prototype;
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
var ArrayMapNode = function ArrayMapNode2(ownerID, entries3) {
  this.ownerID = ownerID;
  this.entries = entries3;
};
ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
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
};
var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
  this.ownerID = ownerID;
  this.bitmap = bitmap;
  this.nodes = nodes;
};
BitmapIndexedNode.prototype.get = function get3(shift, keyHash, key, notSetValue) {
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
};
BitmapIndexedNode.prototype.update = function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
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
};
var HashArrayMapNode = function HashArrayMapNode2(ownerID, count2, nodes) {
  this.ownerID = ownerID;
  this.count = count2;
  this.nodes = nodes;
};
HashArrayMapNode.prototype.get = function get4(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var node = this.nodes[idx];
  return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
};
HashArrayMapNode.prototype.update = function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
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
};
var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries3) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entries = entries3;
};
HashCollisionNode.prototype.get = function get5(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
HashCollisionNode.prototype.update = function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
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
};
var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
};
ValueNode.prototype.get = function get6(shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
};
ValueNode.prototype.update = function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
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
};
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
  if (Iterator3)
    MapIterator2.__proto__ = Iterator3;
  MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
  MapIterator2.prototype.constructor = MapIterator2;
  MapIterator2.prototype.next = function next() {
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
  };
  return MapIterator2;
}(Iterator);
function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}
function mapIteratorFrame(node, prev) {
  return {
    node,
    index: 0,
    __prev: prev
  };
}
function makeMap(size, root, ownerID, hash2) {
  var map2 = Object.create(MapPrototype);
  map2.size = size;
  map2._root = root;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
var EMPTY_MAP;
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}
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
function isLeafNode(node) {
  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
}
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
function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count2 = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
}
function popCount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}
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
var MAX_ARRAY_MAP_SIZE = SIZE / 4;
var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
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
  if (IndexedCollection2)
    List2.__proto__ = IndexedCollection2;
  List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  List2.prototype.constructor = List2;
  List2.of = function of() {
    return this(arguments);
  };
  List2.prototype.toString = function toString5() {
    return this.__toString("List [", "]");
  };
  List2.prototype.get = function get11(index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };
  List2.prototype.set = function set3(index, value) {
    return updateList(this, index, value);
  };
  List2.prototype.remove = function remove3(index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };
  List2.prototype.insert = function insert(index, value) {
    return this.splice(index, 0, value);
  };
  List2.prototype.clear = function clear2() {
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
  };
  List2.prototype.push = function push() {
    var values2 = arguments;
    var oldSize = this.size;
    return this.withMutations(function(list) {
      setListBounds(list, 0, oldSize + values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(oldSize + ii, values2[ii]);
      }
    });
  };
  List2.prototype.pop = function pop() {
    return setListBounds(this, 0, -1);
  };
  List2.prototype.unshift = function unshift() {
    var values2 = arguments;
    return this.withMutations(function(list) {
      setListBounds(list, -values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(ii, values2[ii]);
      }
    });
  };
  List2.prototype.shift = function shift() {
    return setListBounds(this, 1);
  };
  List2.prototype.concat = function concat2() {
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
  };
  List2.prototype.setSize = function setSize(size) {
    return setListBounds(this, 0, size);
  };
  List2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(list) {
      for (var i = 0; i < this$1$1.size; i++) {
        list.set(i, mapper.call(context, list.get(i), i, this$1$1));
      }
    });
  };
  List2.prototype.slice = function slice3(begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(
      this,
      resolveBegin(begin, size),
      resolveEnd(end, size)
    );
  };
  List2.prototype.__iterator = function __iterator2(type, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    return new Iterator(function() {
      var value = values2();
      return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index : index++, value);
    });
  };
  List2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    var value;
    while ((value = values2()) !== DONE) {
      if (fn(value, reverse3 ? --index : index++, this) === false) {
        break;
      }
    }
    return index;
  };
  List2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
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
  };
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
var VNode = function VNode2(array, ownerID) {
  this.array = array;
  this.ownerID = ownerID;
};
VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
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
};
VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
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
};
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
}
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
var EMPTY_LIST;
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}
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
function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}
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
function getTailOffset(size) {
  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
}
var OrderedMap = /* @__PURE__ */ function(Map3) {
  function OrderedMap2(value) {
    return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
      var iter = KeyedCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (Map3)
    OrderedMap2.__proto__ = Map3;
  OrderedMap2.prototype = Object.create(Map3 && Map3.prototype);
  OrderedMap2.prototype.constructor = OrderedMap2;
  OrderedMap2.of = function of() {
    return this(arguments);
  };
  OrderedMap2.prototype.toString = function toString5() {
    return this.__toString("OrderedMap {", "}");
  };
  OrderedMap2.prototype.get = function get11(k, notSetValue) {
    var index = this._map.get(k);
    return index !== void 0 ? this._list.get(index)[1] : notSetValue;
  };
  OrderedMap2.prototype.clear = function clear2() {
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
  };
  OrderedMap2.prototype.set = function set3(k, v) {
    return updateOrderedMap(this, k, v);
  };
  OrderedMap2.prototype.remove = function remove3(k) {
    return updateOrderedMap(this, k, NOT_SET);
  };
  OrderedMap2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._list.__iterate(
      function(entry) {
        return entry && fn(entry[1], entry[0], this$1$1);
      },
      reverse3
    );
  };
  OrderedMap2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._list.fromEntrySeq().__iterator(type, reverse3);
  };
  OrderedMap2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
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
  };
  return OrderedMap2;
}(Map2);
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
var EMPTY_ORDERED_MAP;
function emptyOrderedMap() {
  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
}
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
var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
var Stack = /* @__PURE__ */ function(IndexedCollection2) {
  function Stack2(value) {
    return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
  }
  if (IndexedCollection2)
    Stack2.__proto__ = IndexedCollection2;
  Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  Stack2.prototype.constructor = Stack2;
  Stack2.of = function of() {
    return this(arguments);
  };
  Stack2.prototype.toString = function toString5() {
    return this.__toString("Stack [", "]");
  };
  Stack2.prototype.get = function get11(index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };
  Stack2.prototype.peek = function peek() {
    return this._head && this._head.value;
  };
  Stack2.prototype.push = function push() {
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
  };
  Stack2.prototype.pushAll = function pushAll(iter) {
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
    iter.__iterate(
      function(value) {
        newSize++;
        head = {
          value,
          next: head
        };
      },
      /* reverse */
      true
    );
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.pop = function pop() {
    return this.slice(1);
  };
  Stack2.prototype.clear = function clear2() {
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
  };
  Stack2.prototype.slice = function slice3(begin, end) {
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
  };
  Stack2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
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
  };
  Stack2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  Stack2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
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
var EMPTY_STACK;
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}
var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
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
function mixin(ctor, methods) {
  var keyCopier = function(key) {
    ctor.prototype[key] = methods[key];
  };
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}
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
  if (SetCollection2)
    Set2.__proto__ = SetCollection2;
  Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
  Set2.prototype.constructor = Set2;
  Set2.of = function of() {
    return this(arguments);
  };
  Set2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  Set2.intersect = function intersect(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.union = function union(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.prototype.toString = function toString5() {
    return this.__toString("Set {", "}");
  };
  Set2.prototype.has = function has5(value) {
    return this._map.has(value);
  };
  Set2.prototype.add = function add(value) {
    return updateSet(this, this._map.set(value, value));
  };
  Set2.prototype.remove = function remove3(value) {
    return updateSet(this, this._map.remove(value));
  };
  Set2.prototype.clear = function clear2() {
    return updateSet(this, this._map.clear());
  };
  Set2.prototype.map = function map2(mapper, context) {
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
  };
  Set2.prototype.union = function union() {
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
        if (typeof iters[ii] === "string") {
          set3.add(iters[ii]);
        } else {
          SetCollection2(iters[ii]).forEach(function(value) {
            return set3.add(value);
          });
        }
      }
    });
  };
  Set2.prototype.intersect = function intersect() {
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
  };
  Set2.prototype.subtract = function subtract() {
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
  };
  Set2.prototype.sort = function sort3(comparator) {
    return OrderedSet(sortFactory(this, comparator));
  };
  Set2.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedSet(sortFactory(this, comparator, mapper));
  };
  Set2.prototype.wasAltered = function wasAltered3() {
    return this._map.wasAltered();
  };
  Set2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._map.__iterate(function(k) {
      return fn(k, k, this$1$1);
    }, reverse3);
  };
  Set2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._map.__iterator(type, reverse3);
  };
  Set2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
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
  };
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
function makeSet(map2, ownerID) {
  var set3 = Object.create(SetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
var EMPTY_SET;
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}
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
  if (IndexedSeq2)
    Range2.__proto__ = IndexedSeq2;
  Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  Range2.prototype.constructor = Range2;
  Range2.prototype.toString = function toString5() {
    if (this.size === 0) {
      return "Range []";
    }
    return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  };
  Range2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };
  Range2.prototype.includes = function includes3(searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };
  Range2.prototype.slice = function slice3(begin, end) {
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
  };
  Range2.prototype.indexOf = function indexOf2(searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };
  Range2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
    return this.indexOf(searchValue);
  };
  Range2.prototype.__iterate = function __iterate2(fn, reverse3) {
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
  };
  Range2.prototype.__iterator = function __iterator2(type, reverse3) {
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
  };
  Range2.prototype.equals = function equals3(other) {
    return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };
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
function getIn(searchKeyPath, notSetValue) {
  return getIn$1(this, searchKeyPath, notSetValue);
}
function hasIn$1(collection, keyPath) {
  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
}
function hasIn(searchKeyPath) {
  return hasIn$1(this, searchKeyPath);
}
function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function(v, k) {
    object[k] = v;
  });
  return object;
}
Collection.isIterable = isCollection;
Collection.isKeyed = isKeyed;
Collection.isIndexed = isIndexed;
Collection.isAssociative = isAssociative;
Collection.isOrdered = isOrdered;
Collection.Iterator = Iterator;
mixin(Collection, {
  // ### Conversion to other types
  toArray: function toArray() {
    assertNotInfinite(this.size);
    var array = new Array(this.size || 0);
    var useTuples = isKeyed(this);
    var i = 0;
    this.__iterate(function(v, k) {
      array[i++] = useTuples ? [k, v] : v;
    });
    return array;
  },
  toIndexedSeq: function toIndexedSeq() {
    return new ToIndexedSequence(this);
  },
  toJS: function toJS$1() {
    return toJS(this);
  },
  toKeyedSeq: function toKeyedSeq() {
    return new ToKeyedSequence(this, true);
  },
  toMap: function toMap() {
    return Map2(this.toKeyedSeq());
  },
  toObject,
  toOrderedMap: function toOrderedMap() {
    return OrderedMap(this.toKeyedSeq());
  },
  toOrderedSet: function toOrderedSet() {
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  },
  toSet: function toSet() {
    return Set(isKeyed(this) ? this.valueSeq() : this);
  },
  toSetSeq: function toSetSeq() {
    return new ToSetSequence(this);
  },
  toSeq: function toSeq() {
    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
  },
  toStack: function toStack() {
    return Stack(isKeyed(this) ? this.valueSeq() : this);
  },
  toList: function toList() {
    return List(isKeyed(this) ? this.valueSeq() : this);
  },
  // ### Common JavaScript methods and properties
  toString: function toString3() {
    return "[Collection]";
  },
  __toString: function __toString(head, tail) {
    if (this.size === 0) {
      return head + tail;
    }
    return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
  },
  // ### ES6 Collection methods (ES6 Array and Map)
  concat: function concat() {
    var values2 = [], len = arguments.length;
    while (len--)
      values2[len] = arguments[len];
    return reify(this, concatFactory(this, values2));
  },
  includes: function includes(searchValue) {
    return this.some(function(value) {
      return is(value, searchValue);
    });
  },
  entries: function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  },
  every: function every(predicate, context) {
    assertNotInfinite(this.size);
    var returnValue = true;
    this.__iterate(function(v, k, c) {
      if (!predicate.call(context, v, k, c)) {
        returnValue = false;
        return false;
      }
    });
    return returnValue;
  },
  filter: function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, true));
  },
  partition: function partition(predicate, context) {
    return partitionFactory(this, predicate, context);
  },
  find: function find(predicate, context, notSetValue) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[1] : notSetValue;
  },
  forEach: function forEach(sideEffect, context) {
    assertNotInfinite(this.size);
    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
  },
  join: function join(separator) {
    assertNotInfinite(this.size);
    separator = separator !== void 0 ? "" + separator : ",";
    var joined = "";
    var isFirst = true;
    this.__iterate(function(v) {
      isFirst ? isFirst = false : joined += separator;
      joined += v !== null && v !== void 0 ? v.toString() : "";
    });
    return joined;
  },
  keys: function keys() {
    return this.__iterator(ITERATE_KEYS);
  },
  map: function map(mapper, context) {
    return reify(this, mapFactory(this, mapper, context));
  },
  reduce: function reduce$1(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      false
    );
  },
  reduceRight: function reduceRight(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      true
    );
  },
  reverse: function reverse() {
    return reify(this, reverseFactory(this, true));
  },
  slice: function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, true));
  },
  some: function some(predicate, context) {
    return !this.every(not(predicate), context);
  },
  sort: function sort2(comparator) {
    return reify(this, sortFactory(this, comparator));
  },
  values: function values() {
    return this.__iterator(ITERATE_VALUES);
  },
  // ### More sequential methods
  butLast: function butLast() {
    return this.slice(0, -1);
  },
  isEmpty: function isEmpty() {
    return this.size !== void 0 ? this.size === 0 : !this.some(function() {
      return true;
    });
  },
  count: function count(predicate, context) {
    return ensureSize(
      predicate ? this.toSeq().filter(predicate, context) : this
    );
  },
  countBy: function countBy(grouper, context) {
    return countByFactory(this, grouper, context);
  },
  equals: function equals(other) {
    return deepEqual(this, other);
  },
  entrySeq: function entrySeq() {
    var collection = this;
    if (collection._cache) {
      return new ArraySeq(collection._cache);
    }
    var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
    entriesSequence.fromEntrySeq = function() {
      return collection.toSeq();
    };
    return entriesSequence;
  },
  filterNot: function filterNot(predicate, context) {
    return this.filter(not(predicate), context);
  },
  findEntry: function findEntry(predicate, context, notSetValue) {
    var found = notSetValue;
    this.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        found = [k, v];
        return false;
      }
    });
    return found;
  },
  findKey: function findKey(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry && entry[0];
  },
  findLast: function findLast(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
  },
  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
  },
  findLastKey: function findLastKey(predicate, context) {
    return this.toKeyedSeq().reverse().findKey(predicate, context);
  },
  first: function first(notSetValue) {
    return this.find(returnTrue, null, notSetValue);
  },
  flatMap: function flatMap(mapper, context) {
    return reify(this, flatMapFactory(this, mapper, context));
  },
  flatten: function flatten(depth) {
    return reify(this, flattenFactory(this, depth, true));
  },
  fromEntrySeq: function fromEntrySeq() {
    return new FromEntriesSequence(this);
  },
  get: function get7(searchKey, notSetValue) {
    return this.find(function(_, key) {
      return is(key, searchKey);
    }, void 0, notSetValue);
  },
  getIn,
  groupBy: function groupBy(grouper, context) {
    return groupByFactory(this, grouper, context);
  },
  has: function has2(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  },
  hasIn,
  isSubset: function isSubset(iter) {
    iter = typeof iter.includes === "function" ? iter : Collection(iter);
    return this.every(function(value) {
      return iter.includes(value);
    });
  },
  isSuperset: function isSuperset(iter) {
    iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
    return iter.isSubset(this);
  },
  keyOf: function keyOf(searchValue) {
    return this.findKey(function(value) {
      return is(value, searchValue);
    });
  },
  keySeq: function keySeq() {
    return this.toSeq().map(keyMapper).toIndexedSeq();
  },
  last: function last(notSetValue) {
    return this.toSeq().reverse().first(notSetValue);
  },
  lastKeyOf: function lastKeyOf(searchValue) {
    return this.toKeyedSeq().reverse().keyOf(searchValue);
  },
  max: function max(comparator) {
    return maxFactory(this, comparator);
  },
  maxBy: function maxBy(mapper, comparator) {
    return maxFactory(this, comparator, mapper);
  },
  min: function min(comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator
    );
  },
  minBy: function minBy(mapper, comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator,
      mapper
    );
  },
  rest: function rest() {
    return this.slice(1);
  },
  skip: function skip(amount) {
    return amount === 0 ? this : this.slice(Math.max(0, amount));
  },
  skipLast: function skipLast(amount) {
    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
  },
  skipWhile: function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, true));
  },
  skipUntil: function skipUntil(predicate, context) {
    return this.skipWhile(not(predicate), context);
  },
  sortBy: function sortBy(mapper, comparator) {
    return reify(this, sortFactory(this, comparator, mapper));
  },
  take: function take(amount) {
    return this.slice(0, Math.max(0, amount));
  },
  takeLast: function takeLast(amount) {
    return this.slice(-Math.max(0, amount));
  },
  takeWhile: function takeWhile(predicate, context) {
    return reify(this, takeWhileFactory(this, predicate, context));
  },
  takeUntil: function takeUntil(predicate, context) {
    return this.takeWhile(not(predicate), context);
  },
  update: function update7(fn) {
    return fn(this);
  },
  valueSeq: function valueSeq() {
    return this.toIndexedSeq();
  },
  // ### Hashable Object
  hashCode: function hashCode() {
    return this.__hash || (this.__hash = hashCollection(this));
  }
  // ### Internal
  // abstract __iterate(fn, reverse)
  // abstract __iterator(type, reverse)
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
  // ### More sequential methods
  flip: function flip() {
    return reify(this, flipFactory(this));
  },
  mapEntries: function mapEntries(mapper, context) {
    var this$1$1 = this;
    var iterations = 0;
    return reify(
      this,
      this.toSeq().map(function(v, k) {
        return mapper.call(context, [k, v], iterations++, this$1$1);
      }).fromEntrySeq()
    );
  },
  mapKeys: function mapKeys(mapper, context) {
    var this$1$1 = this;
    return reify(
      this,
      this.toSeq().flip().map(function(k, v) {
        return mapper.call(context, k, v, this$1$1);
      }).flip()
    );
  }
});
var KeyedCollectionPrototype = KeyedCollection.prototype;
KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
KeyedCollectionPrototype.toJSON = toObject;
KeyedCollectionPrototype.__toStringMapper = function(v, k) {
  return quoteString(k) + ": " + quoteString(v);
};
mixin(IndexedCollection, {
  // ### Conversion to other types
  toKeyedSeq: function toKeyedSeq2() {
    return new ToKeyedSequence(this, false);
  },
  // ### ES6 Collection methods (ES6 Array and Map)
  filter: function filter2(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, false));
  },
  findIndex: function findIndex(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  indexOf: function indexOf(searchValue) {
    var key = this.keyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  lastIndexOf: function lastIndexOf(searchValue) {
    var key = this.lastKeyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  reverse: function reverse2() {
    return reify(this, reverseFactory(this, false));
  },
  slice: function slice2(begin, end) {
    return reify(this, sliceFactory(this, begin, end, false));
  },
  splice: function splice(index, removeNum) {
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
  },
  // ### More collection methods
  findLastIndex: function findLastIndex(predicate, context) {
    var entry = this.findLastEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  first: function first2(notSetValue) {
    return this.get(0, notSetValue);
  },
  flatten: function flatten2(depth) {
    return reify(this, flattenFactory(this, depth, false));
  },
  get: function get8(index, notSetValue) {
    index = wrapIndex(this, index);
    return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
      return key === index;
    }, void 0, notSetValue);
  },
  has: function has3(index) {
    index = wrapIndex(this, index);
    return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
  },
  interpose: function interpose(separator) {
    return reify(this, interposeFactory(this, separator));
  },
  interleave: function interleave() {
    var collections = [this].concat(arrCopy(arguments));
    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
    var interleaved = zipped.flatten(true);
    if (zipped.size) {
      interleaved.size = zipped.size * collections.length;
    }
    return reify(this, interleaved);
  },
  keySeq: function keySeq2() {
    return Range(0, this.size);
  },
  last: function last2(notSetValue) {
    return this.get(-1, notSetValue);
  },
  skipWhile: function skipWhile2(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, false));
  },
  zip: function zip() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections));
  },
  zipAll: function zipAll() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
  },
  zipWith: function zipWith(zipper) {
    var collections = arrCopy(arguments);
    collections[0] = this;
    return reify(this, zipWithFactory(this, zipper, collections));
  }
});
var IndexedCollectionPrototype = IndexedCollection.prototype;
IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
mixin(SetCollection, {
  // ### ES6 Collection methods (ES6 Array and Map)
  get: function get9(value, notSetValue) {
    return this.has(value) ? value : notSetValue;
  },
  includes: function includes2(value) {
    return this.has(value);
  },
  // ### More sequential methods
  keySeq: function keySeq3() {
    return this.valueSeq();
  }
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
function keyMapper(v, k) {
  return k;
}
function entryMapper(v, k) {
  return [k, v];
}
function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}
function defaultZipper() {
  return arrCopy(arguments);
}
function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
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
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
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
  if (Set2)
    OrderedSet2.__proto__ = Set2;
  OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
  OrderedSet2.prototype.constructor = OrderedSet2;
  OrderedSet2.of = function of() {
    return this(arguments);
  };
  OrderedSet2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  OrderedSet2.prototype.toString = function toString5() {
    return this.__toString("OrderedSet {", "}");
  };
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
var EMPTY_ORDERED_SET;
function emptyOrderedSet() {
  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
}
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
var Record = function Record2(defaultValues, name) {
  var hasInitialized;
  throwOnInvalidDefaultValues(defaultValues);
  var RecordType = function Record3(values2) {
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
  };
  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
  RecordTypePrototype.constructor = RecordType;
  if (name) {
    RecordType.displayName = name;
  }
  return RecordType;
};
Record.prototype.toString = function toString4() {
  var str = recordName(this) + " { ";
  var keys2 = this._keys;
  var k;
  for (var i = 0, l = keys2.length; i !== l; i++) {
    k = keys2[i];
    str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
  }
  return str + " }";
};
Record.prototype.equals = function equals2(other) {
  return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
};
Record.prototype.hashCode = function hashCode2() {
  return recordSeq(this).hashCode();
};
Record.prototype.has = function has4(k) {
  return this._indices.hasOwnProperty(k);
};
Record.prototype.get = function get10(k, notSetValue) {
  if (!this.has(k)) {
    return notSetValue;
  }
  var index = this._indices[k];
  var value = this._values.get(index);
  return value === void 0 ? this._defaultValues[k] : value;
};
Record.prototype.set = function set2(k, v) {
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
};
Record.prototype.remove = function remove2(k) {
  return this.set(k);
};
Record.prototype.clear = function clear() {
  var newValues = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : makeRecord(this, newValues);
};
Record.prototype.wasAltered = function wasAltered2() {
  return this._values.wasAltered();
};
Record.prototype.toSeq = function toSeq2() {
  return recordSeq(this);
};
Record.prototype.toJS = function toJS$12() {
  return toJS(this);
};
Record.prototype.entries = function entries2() {
  return this.__iterator(ITERATE_ENTRIES);
};
Record.prototype.__iterator = function __iterator(type, reverse3) {
  return recordSeq(this).__iterator(type, reverse3);
};
Record.prototype.__iterate = function __iterate(fn, reverse3) {
  return recordSeq(this).__iterate(fn, reverse3);
};
Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
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
};
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
function recordName(record) {
  return record.constructor.displayName || record.constructor.name || "Record";
}
function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function(k) {
    return [k, record.get(k)];
  }));
}
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

// src/esbuild.ts
var import_esbuild_wasm = __toESM(require_browser(), 1);
import was from "../src/esbuild.wasm";
Object.assign(globalThis, {
  performance: {
    now: () => Date.now()
  }
});
var mod = {
  init: false,
  initialize: () => mod.init || (0, import_esbuild_wasm.initialize)({
    wasmModule: was,
    worker: false
  }).then(() => mod.init = true)
};
var initAndTransform = async (code, opts, origin) => {
  const initFinished = mod.initialize();
  if (initFinished !== true)
    await initFinished;
  return await esmTransform(code, origin);
};
async function esmTransform(code, origin) {
  const transpiled = await (0, import_esbuild_wasm.transform)(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        useDefineForClassFields: false,
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react"
      }
    },
    target: "es2022"
  });
  if (origin)
    return de2(transpiled.code, origin, origin);
  else
    return transpiled.code;
}

// src/chatRoom.ts
function hashCode3(sess) {
  return Record(sess)().hashCode();
}
var Code = class {
  constructor(state, env) {
    this.env = env;
    this.state = state;
    this.kv = state.storage;
    this.sess = null;
    this.session = null;
    this.head = 0;
    this.wsSessions = [];
    this.env = env;
    this.state.blockConcurrencyWhile(async () => {
      try {
        this.head = await this.kv.get("head") || 0;
        this.sess = await this.kv.get(this.head ? String(this.head) : "session", {
          allowConcurrency: true
        }) || await env.CODE.get(env.CODE.idFromName("code-main")).fetch(
          "session.json"
        ).then((x) => x.json());
        if (!this.sess)
          throw Error("cant get the starter session");
        if (Number(this.head + 50) !== 50 + this.head)
          this.head = 0;
      } catch {
        throw Error("cant get the starter session");
      }
    });
  }
  state;
  kv;
  // mutex: Mutex;
  session;
  sess;
  user = ZB2(self.crypto.randomUUID());
  users = new AVLTree(
    (a, b) => a === b ? 0 : a < b ? 1 : -1,
    true
  );
  head = 0;
  waiting = [];
  wsSessions;
  buffy = [];
  i = 0;
  mST(p) {
    if (p && p.length) {
      const sessAsJs = this.session.session.get("state").toJSON();
      const { i, transpiled, code, html, css } = p ? JSON.parse(
        U$2(
          qA2(
            sessAsJs
          ),
          p
        )
      ) : sessAsJs;
      return this.session.session.get("state").merge({
        i,
        transpiled,
        code,
        html,
        css
      }).toObject();
    }
    return this.session.session.get("state").toObject();
  }
  syncKV(oldSession, newSess, message) {
    return (async () => await St2(
      async (key, v) => await this.kv.put(key, v, {
        allowConcurrency: false
      }),
      // .then(x=>console.log(x)).catch(()=>console.error('error')).finally(()=>console.log("ok")),
      async (key) => await this.kv.get(String(key), { allowConcurrency: true }),
      oldSession,
      newSess,
      message
    ))();
  }
  wait = (x) => {
    this.waiting = this.waiting.filter((x2) => !x2()) || [];
    if (x && !x())
      this.waiting.push(x);
  };
  async fetch(request) {
    const url = new URL(request.url);
    this.wait();
    const codeSpace = url.searchParams.get("room");
    if (this.head === 0) {
      this.head = hashCode3(this.sess);
      this.kv.put(String(this.head), this.sess).then(() => this.kv.put("head", this.head));
    }
    if (request.method === "POST") {
      try {
        const mess = await request.json();
        if (mess) {
          if (!mess.patch || mess.patch && mess.i && mess.i > this.i) {
            if (mess.i) {
              this.i = mess.i;
              const reversePatch = mess.reversePatch || [];
              const patch = mess.patch || [];
              const oldState = this.sess;
              const newState = this.mST(patch);
              const oldHash = hashCode3(oldState);
              const newHash = hashCode3(newState);
              if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
                console.error({ mess, calculated: { oldHash, newHash } });
                throw "Error - we messed up the hashStores";
              }
              const newRec = this.session.session.get("state").merge(
                newState
              );
              this.session.session = this.session.session.set(
                "state",
                newRec
              );
              this.sess = this.session.session.get("state").toObject();
              this.syncKV(oldState, newState, {
                oldHash,
                newHash,
                patch,
                reversePatch
              });
              this.broadcast(mess);
              return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8"
                }
              });
            }
          }
        }
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: { e } }), {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json; charset=UTF-8"
          }
        });
      }
      return new Response(JSON.stringify({ success: true, message: "nothing happened" }), {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json; charset=UTF-8"
        }
      });
    }
    return handleErrors(request, async () => {
      const { code, css, html, i } = this.sess;
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
              content_hash: ZB2(code),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "index.trans.js": {
          const trp = await initAndTransform(
            this.sess.code,
            {},
            url.origin
          );
          return new Response(trp, {
            status: 200,
            headers: {
              "x-typescript-types": `${url.origin}/live/${codeSpace}/index.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: ZB2(trp),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "sessions": {
          const d = await this.state.storage.list({ start: path[1] || "0", end: path[2] || "100" });
          return new Response(JSON.stringify(d), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: ZB2(d),
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "session.json":
        case "session": {
          if (path[1]) {
            let session = await this.kv.get(path[1], {
              allowConcurrency: true
            });
            if (session) {
              if (typeof session !== "string") {
                session = JSON.stringify(session);
              }
              return new Response(session, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  content_hash: ZB2(session),
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
          const body = qA2(this.sess);
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: ZB2(body),
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        }
        case "lazy":
          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;
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
          const list = await this.kv.list({ allowConcurrency: true });
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
        case "room":
          return new Response(JSON.stringify({ codeSpace }), {
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
        case "index.mjs":
        case "index.js":
        case "js": {
          const i2 = path[1] || this.sess.i;
          if (i2 > this.sess.i) {
            const trp2 = await initAndTransform(
              this.sess.code,
              {},
              url.origin
            );
            return new Response(trp2, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                content_hash: ZB2(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          if (i2 < this.sess.i) {
            const trp2 = await initAndTransform(
              this.sess.code,
              {},
              url.origin
            );
            return new Response(trp2, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${codeSpace}/index.mjs/${this.sess.i}`,
                "Cache-Control": "no-cache",
                content_hash: ZB2(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          const trp = await initAndTransform(
            this.sess.code,
            {},
            url.origin
          );
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: ZB2(trp),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "env": {
          return new Response(JSON.stringify(this.env), {
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
            hashCode4,
            { allowConcurrency: true }
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
          const respText = jt.replace(
            "/**reset*/",
            ut
          ).replace(
            `<div id="root"></div>`,
            `<div id="root" style="height: 100%;">
                  <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
                  <style>${css}</style>
                  ${html}
                  </div>
              </div>` + (path[0] === "dehydrated" ? `<script>

              const paths = location.href.split("/");
              const page = paths.pop();
              const codeSpace = paths.pop();
                
            
                const BC = new BroadcastChannel([...paths, codeSpace, ""].join("/"));
              
              BC.onmessage = ({data}) => {
                const {html, css, i } = data;
                if (page ==="dehydrated" && html ) document.getElementById("root").innerHTML = ['<div id="', codeSpace, '-css" style="height: 100%"><style>', css, "</style>", html, "<div>" ].join("");
                
              }
              var sheet = document.createStyleSheet();
sheet.addRule('h1', 'background: red;');
              <\/script>` : `<script type="module" src="${url.origin}/src/hydrate.mjs?ASSET_HASH=${ASSET_HASH}"><\/script>`)
          );
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache"
          );
          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", ZB2(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "prerender": {
          const respText = jt.replace(
            "/**reset*/",
            ut
          ).replace(
            `<div id="root"></div>`,
            `   
          <div id="root"></div>
          <script type="module">
          import App from "${url.origin}/live/${codeSpace}/index.js?i=${i}"
              
            import {prerender} from "${url.origin}/src/render.mjs"
              
              
             const res = prerender(App).then(res=>window.parent.postMessage(res))

            //  console.log({res});
            
              <\/script>`
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
          headers.set("content_hash", ZB2(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iframe": {
          const respText = jt.replace(
            "/**reset*/",
            ut
          ).replace(
            `<div id="root"></div>`,
            `
              <div id="root" style="height: 100%;">
                <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
                <style>${css}</style>
                ${html}
              </div>
              <script type="module">

              import {render} from "${url.origin}/src/render.mjs";
              
              import App from "${url.origin}/live/${codeSpace}/index.js?i=${i}";

              const rootEl = document.getElementById("${codeSpace}-css");
              
              render(rootEl, App, "${codeSpace}");          
          
              <\/script>`
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
          headers.set("content_hash", ZB2(respText));
          return new Response(respText, {
            status: 200,
            headers
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
    const session = {
      name: "",
      quit: false,
      webSocket
      //   blockedMessages: [] as string[],
    };
    this.wsSessions.push(session);
    this.wsSessions = this.wsSessions.filter((x) => !x.quit);
    const users = this.wsSessions.filter((x) => x.name).map((x) => x.name);
    webSocket.send(
      JSON.stringify({
        hashCode: this.head,
        i: this.sess.i,
        users,
        type: "handshake"
      })
    );
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session)
    );
    const closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  async processWsMessage(msg, session) {
    if (session.quit) {
      this.users.remove(session.name);
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const { name } = session;
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
      if (!data.name) {
        return respondWith({
          msg: "no-name-no-party"
        });
      }
      this.wsSessions.filter((x) => x.name === data.name).map((x) => x.quit = true);
      session.name = name;
    }
    if (data.type == "handshake") {
      const commit = data.hashCode;
      while (commit && commit !== this.head) {
        const oldNode = await this.kv.get("" + commit, {
          allowConcurrency: true
        });
        const newNode = await this.kv.get("" + oldNode.newHash, {
          allowConcurrency: true
        });
        return respondWith({
          oldHash: commit,
          newHash: oldNode.newHash,
          patch: oldNode.patch,
          reversePatch: newNode.reversePatch
        });
      }
    }
    try {
      try {
        if (data.target && data.type && ["new-ice-candidate", "video-offer", "video-answer"].includes(
          data.type
        )) {
          return this.user2user(data.target, { ...data, name });
        }
        if (data.patch && data.oldHash && data.newHash) {
          const oldSession = this.sess;
          const newSess = this.mST(data.patch);
          if (this.head !== data.oldHash) {
            return respondWith({
              error: `old hashes not matching`
            });
          }
          try {
            OE2(
              newSess
            );
          } catch (exp) {
            const err = exp || {};
            return respondWith({
              error: "unknown error- in patching" + JSON.stringify({ err }),
              exp: exp || {}
            });
          }
          try {
            await this.kv.put("session", newSess, {
              allowConcurrency: true
            });
            const { newHash, oldHash, patch, reversePatch } = data;
            await this.syncKV(oldSession || newSess, newSess, {
              newHash: +newHash,
              oldHash: +oldHash,
              patch,
              reversePatch
            });
            this.broadcast(data);
          } catch (err) {
            return respondWith({
              error: "Saving it its really hard",
              exp: err || {}
            });
          }
          return respondWith({
            hashCode: this.head
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
    this.wsSessions.filter((session) => session.name === to).map((s) => {
      try {
        s.webSocket.send(message);
      } catch {
        console.error("p2p error");
      }
    });
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.wsSessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        this.users.remove(s.name);
      }
    });
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  nextAllowedTime = 0;
  // Our protocol is: POST when the IP performs an action, or GET to simply read the current limit.
  // Either way, the result is the number of seconds to wait before allowing the IP to perform its
  // next action.
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
var src_default = chat_default;
export {
  Code,
  CodeRateLimiter,
  r2bucket_default as R2,
  Users,
  src_default as default
};
