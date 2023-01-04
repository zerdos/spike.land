var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b3) => (typeof require !== "undefined" ? require : a)[b3]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod2) => function __require2() {
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
      for (let i3 = 0; i3 < arguments.length; i3++) {
        this.define(arguments[i3]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t4) {
          return t4.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i3 = 0; i3 < extensions.length; i3++) {
          const ext = extensions[i3];
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

// ../../../../../Users/z/.yarn/berry/cache/esbuild-wasm-npm-0.16.13-8714cdd154-9.zip/node_modules/esbuild-wasm/lib/browser.js
var require_browser = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/esbuild-wasm-npm-0.16.13-8714cdd154-9.zip/node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
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
            } catch (e3) {
              reject(e3);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e3) {
              reject(e3);
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
            let keys = Object.keys(value);
            bb.write8(6);
            bb.write32(keys.length);
            for (let key of keys) {
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
              let count = bb.read32();
              let value2 = [];
              for (let i3 = 0; i3 < count; i3++) {
                value2.push(visit());
              }
              return value2;
            }
            case 6: {
              let count = bb.read32();
              let value2 = {};
              for (let i3 = 0; i3 < count; i3++) {
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
      function getFlag(object, keys, key, mustBeFn) {
        let value = object[key];
        keys[key + ""] = true;
        if (value === void 0)
          return void 0;
        let mustBe = mustBeFn(value);
        if (mustBe !== null)
          throw new Error(`${quote(key)} must be ${mustBe}`);
        return value;
      }
      function checkForInvalidFlags(object, keys, where) {
        for (let key in object) {
          if (!(key in keys)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
          }
        }
      }
      function validateInitializeOptions(options) {
        let keys = /* @__PURE__ */ Object.create(null);
        let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
        let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
        let worker = getFlag(options, keys, "worker", mustBeBoolean);
        checkForInvalidFlags(options, keys, "in initialize() call");
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
      function pushLogFlags(flags, options, keys, isTTY, logLevelDefault) {
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let logLevel = getFlag(options, keys, "logLevel", mustBeString);
        let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
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
      function pushCommonFlags(flags, options, keys) {
        let legalComments = getFlag(options, keys, "legalComments", mustBeString);
        let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
        let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
        let target = getFlag(options, keys, "target", mustBeStringOrArray);
        let format = getFlag(options, keys, "format", mustBeString);
        let globalName = getFlag(options, keys, "globalName", mustBeString);
        let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
        let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
        let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
        let minify = getFlag(options, keys, "minify", mustBeBoolean);
        let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
        let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
        let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
        let drop = getFlag(options, keys, "drop", mustBeArray);
        let charset = getFlag(options, keys, "charset", mustBeString);
        let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
        let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
        let jsx = getFlag(options, keys, "jsx", mustBeString);
        let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
        let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
        let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
        let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
        let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
        let define = getFlag(options, keys, "define", mustBeObject);
        let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
        let supported = getFlag(options, keys, "supported", mustBeObject);
        let pure = getFlag(options, keys, "pure", mustBeArray);
        let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
        let platform = getFlag(options, keys, "platform", mustBeString);
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
          for (let fn3 of pure)
            flags.push(`--pure:${validateStringValue(fn3, "pure")}`);
        if (keepNames)
          flags.push(`--keep-names`);
      }
      function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
        var _a3;
        let flags = [];
        let entries = [];
        let keys = /* @__PURE__ */ Object.create(null);
        let stdinContents = null;
        let stdinResolveDir = null;
        let watchMode = null;
        pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys);
        let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
        let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
        let watch = getFlag(options, keys, "watch", mustBeBooleanOrObject);
        let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
        let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
        let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
        let outfile = getFlag(options, keys, "outfile", mustBeString);
        let outdir = getFlag(options, keys, "outdir", mustBeString);
        let outbase = getFlag(options, keys, "outbase", mustBeString);
        let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
        let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
        let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
        let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
        let conditions = getFlag(options, keys, "conditions", mustBeArray);
        let external = getFlag(options, keys, "external", mustBeArray);
        let packages = getFlag(options, keys, "packages", mustBeString);
        let alias = getFlag(options, keys, "alias", mustBeObject);
        let loader = getFlag(options, keys, "loader", mustBeObject);
        let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
        let publicPath = getFlag(options, keys, "publicPath", mustBeString);
        let entryNames = getFlag(options, keys, "entryNames", mustBeString);
        let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
        let assetNames = getFlag(options, keys, "assetNames", mustBeString);
        let inject = getFlag(options, keys, "inject", mustBeArray);
        let banner = getFlag(options, keys, "banner", mustBeObject);
        let footer = getFlag(options, keys, "footer", mustBeObject);
        let entryPoints = getFlag(options, keys, "entryPoints", mustBeArrayOrRecord);
        let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
        let stdin = getFlag(options, keys, "stdin", mustBeObject);
        let write = (_a3 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a3 : writeDefault;
        let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
        let incremental = getFlag(options, keys, "incremental", mustBeBoolean) === true;
        let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
        keys.plugins = true;
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
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
          let values = [];
          for (let value of resolveExtensions) {
            validateStringValue(value, "resolve extension");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid resolve extension: ${value}`);
            values.push(value);
          }
          flags.push(`--resolve-extensions=${values.join(",")}`);
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
          let values = [];
          for (let value of mainFields) {
            validateStringValue(value, "main field");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid main field: ${value}`);
            values.push(value);
          }
          flags.push(`--main-fields=${values.join(",")}`);
        }
        if (conditions) {
          let values = [];
          for (let value of conditions) {
            validateStringValue(value, "condition");
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid condition: ${value}`);
            values.push(value);
          }
          flags.push(`--conditions=${values.join(",")}`);
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
              entries.push(["", validateStringValue(entryPoint, "entry point")]);
            }
          } else {
            for (let key in entryPoints) {
              entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
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
          entries,
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
        let keys = /* @__PURE__ */ Object.create(null);
        pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys);
        let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
        let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
        let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
        let loader = getFlag(options, keys, "loader", mustBeString);
        let banner = getFlag(options, keys, "banner", mustBeString);
        let footer = getFlag(options, keys, "footer", mustBeString);
        let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
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
          } catch (e3) {
            sendResponse(id, { errors: [extractErrorMessageV8(e3, streamIn, null, void 0, "")] });
          }
        });
        let isFirstPacket = true;
        let handleIncomingPacket = (bytes) => {
          if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.16.13") {
              throw new Error(`Cannot start service: Host version "${"0.16.13"}" does not match binary version ${quote(binaryVersion)}`);
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
        let transform22 = ({ callName, refs, input, options, isTTY, fs: fs3, callback }) => {
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
                  fs3.readFile(response.code, (err, contents) => {
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
                  fs3.readFile(response.map, (err, contents) => {
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
            } catch (e3) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
              } catch (e22) {
              }
              const error = extractErrorMessageV8(e3, streamIn, details, void 0, "");
              sendRequest(refs, { command: "error", flags, error }, () => {
                error.detail = details.load(error.detail);
                callback(failureErrorWithLog("Transform failed", [error], []), null);
              });
            }
          };
          if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = () => fs3.writeFile(input, next);
          }
          start(null);
        };
        let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
          let result = sanitizeMessages(messages, "messages", null, "");
          if (!options)
            throw new Error(`Missing second argument in ${callName}() call`);
          let keys = {};
          let kind = getFlag(options, keys, "kind", mustBeString);
          let color = getFlag(options, keys, "color", mustBeBoolean);
          let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
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
          let keys = {};
          let color = getFlag(options, keys, "color", mustBeBoolean);
          let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
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
        const logPluginError = (e3, pluginName, note, done) => {
          const flags = [];
          try {
            pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
          } catch (e22) {
          }
          const message = extractErrorMessageV8(e3, streamIn, details, note, pluginName);
          sendRequest(refs, { command: "error", flags, error: message }, () => {
            message.detail = details.load(message.detail);
            done(message);
          });
        };
        const handleError = (e3, pluginName) => {
          logPluginError(e3, pluginName, void 0, (error) => {
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
              } catch (e3) {
                handleError(e3, "");
              }
            },
            (e3) => handleError(e3, "")
          );
          return;
        }
        try {
          buildOrServeContinue(null, (result, logPluginError2, done) => done());
        } catch (e3) {
          handleError(e3, "");
        }
        function buildOrServeContinue(requestPlugins, runOnEndCallbacks) {
          let writeDefault = !streamIn.isWriteUnavailable;
          let {
            entries,
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
            entries,
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
        let keys = {};
        let port = getFlag(options, keys, "port", mustBeInteger);
        let host = getFlag(options, keys, "host", mustBeString);
        let servedir = getFlag(options, keys, "servedir", mustBeString);
        let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
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
        checkForInvalidFlags(options, keys, `in serve() call`);
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
        let i3 = 0;
        let requestPlugins = [];
        let isSetupDone = false;
        plugins = [...plugins];
        for (let item of plugins) {
          let keys = {};
          if (typeof item !== "object")
            throw new Error(`Plugin at index ${i3} must be an object`);
          const name = getFlag(item, keys, "name", mustBeString);
          if (typeof name !== "string" || name === "")
            throw new Error(`Plugin at index ${i3} is missing a name`);
          try {
            let setup = getFlag(item, keys, "setup", mustBeFunction);
            if (typeof setup !== "function")
              throw new Error(`Plugin is missing a setup function`);
            checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
            let plugin = {
              name,
              onResolve: [],
              onLoad: []
            };
            i3++;
            let resolve = (path, options = {}) => {
              if (!isSetupDone)
                throw new Error('Cannot call "resolve" before plugin setup has completed');
              if (typeof path !== "string")
                throw new Error(`The path to resolve must be a string`);
              let keys2 = /* @__PURE__ */ Object.create(null);
              let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
              let importer = getFlag(options, keys2, "importer", mustBeString);
              let namespace = getFlag(options, keys2, "namespace", mustBeString);
              let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
              let kind = getFlag(options, keys2, "kind", mustBeString);
              let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
              checkForInvalidFlags(options, keys2, "in resolve() call");
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
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
                if (filter == null)
                  throw new Error(`onResolve() call is missing a filter`);
                let id = nextCallbackID++;
                onResolveCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              onLoad(options, callback) {
                let registeredText = `This error came from the "onLoad" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
                if (filter == null)
                  throw new Error(`onLoad() call is missing a filter`);
                let id = nextCallbackID++;
                onLoadCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              esbuild: streamIn.esbuild
            });
            if (promise)
              yield promise;
            requestPlugins.push(plugin);
          } catch (e3) {
            return { ok: false, error: e3, pluginName: name };
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
                let keys = {};
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
                if (errors != null)
                  response.errors.push(...sanitizeMessages(errors, "errors", details, name));
                if (warnings != null)
                  response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name));
              }
            } catch (e3) {
              response.errors.push(extractErrorMessageV8(e3, streamIn, details, note && note(), name));
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
                let keys = {};
                let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                let path = getFlag(result, keys, "path", mustBeString);
                let namespace = getFlag(result, keys, "namespace", mustBeString);
                let suffix = getFlag(result, keys, "suffix", mustBeString);
                let external = getFlag(result, keys, "external", mustBeBoolean);
                let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
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
            } catch (e3) {
              response = { id: id2, errors: [extractErrorMessageV8(e3, streamIn, details, note && note(), name)] };
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
                let keys = {};
                let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                let loader = getFlag(result, keys, "loader", mustBeString);
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
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
            } catch (e3) {
              response = { id: id2, errors: [extractErrorMessageV8(e3, streamIn, details, note && note(), name)] };
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
                } catch (e3) {
                  result.errors.push(yield new Promise((resolve) => logPluginError(e3, name, note && note(), resolve)));
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
        const map = /* @__PURE__ */ new Map();
        let nextID = 0;
        return {
          load(id) {
            return map.get(id);
          },
          store(value) {
            if (value === void 0)
              return -1;
            const id = nextID++;
            map.set(id, value);
            return id;
          }
        };
      }
      function extractCallerV8(e3, streamIn, ident) {
        let note;
        let tried = false;
        return () => {
          if (tried)
            return note;
          tried = true;
          try {
            let lines = (e3.stack + "").split("\n");
            lines.splice(1, 1);
            let location2 = parseStackLinesV8(streamIn, lines, ident);
            if (location2) {
              note = { text: e3.message, location: location2 };
              return note;
            }
          } catch (e22) {
          }
        };
      }
      function extractErrorMessageV8(e3, streamIn, stash, note, pluginName) {
        let text = "Internal error";
        let location2 = null;
        try {
          text = (e3 && e3.message || e3) + "";
        } catch (e22) {
        }
        try {
          location2 = parseStackLinesV8(streamIn, (e3.stack + "").split("\n"), "");
        } catch (e22) {
        }
        return { id: "", pluginName, text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e3) : -1 };
      }
      function parseStackLinesV8(streamIn, lines, ident) {
        let at = "    at ";
        if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
          for (let i3 = 1; i3 < lines.length; i3++) {
            let line = lines[i3];
            if (!line.startsWith(at))
              continue;
            line = line.slice(at.length);
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
                } catch (e3) {
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
        let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e3, i3) => {
          if (i3 === limit)
            return "\n...";
          if (!e3.location)
            return `
error: ${e3.text}`;
          let { file, line, column } = e3.location;
          let pluginText = e3.pluginName ? `[plugin: ${e3.pluginName}] ` : "";
          return `
${file}:${line}:${column}: ERROR: ${pluginText}${e3.text}`;
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
        let keys = {};
        let file = getFlag(location2, keys, "file", mustBeString);
        let namespace = getFlag(location2, keys, "namespace", mustBeString);
        let line = getFlag(location2, keys, "line", mustBeInteger);
        let column = getFlag(location2, keys, "column", mustBeInteger);
        let length = getFlag(location2, keys, "length", mustBeInteger);
        let lineText = getFlag(location2, keys, "lineText", mustBeString);
        let suggestion = getFlag(location2, keys, "suggestion", mustBeString);
        checkForInvalidFlags(location2, keys, where);
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
          let keys = {};
          let id = getFlag(message, keys, "id", mustBeString);
          let pluginName = getFlag(message, keys, "pluginName", mustBeString);
          let text = getFlag(message, keys, "text", mustBeString);
          let location2 = getFlag(message, keys, "location", mustBeObjectOrNull);
          let notes = getFlag(message, keys, "notes", mustBeArray);
          let detail = getFlag(message, keys, "detail", canBeAnything);
          let where = `in element ${index} of "${property}"`;
          checkForInvalidFlags(message, keys, where);
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
      function sanitizeStringArray(values, property) {
        const result = [];
        for (const value of values) {
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
      var version = "0.16.13";
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
          let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.16.13"}`];\n        tryToInstantiateModule(wasm, go).then(\n          (instance) => {\n            postMessage(null);\n            go.run(instance);\n          },\n          (error) => {\n            postMessage(error);\n          }\n        );\n      };\n      function tryToInstantiateModule(wasm, go) {\n        return __async(this, null, function* () {\n          if (wasm instanceof WebAssembly.Module) {\n            return WebAssembly.instantiate(wasm, go.importObject);\n          }\n          const res = yield fetch(wasm);\n          if (!res.ok)\n            throw new Error(`Failed to download ${JSON.stringify(wasm)}`);\n          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {\n            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);\n            return result2.instance;\n          }\n          const bytes = yield res.arrayBuffer();\n          const result = yield WebAssembly.instantiate(bytes, go.importObject);\n          return result.instance;\n        });\n      }\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
          worker = new Worker(URL.createObjectURL(blob));
        } else {
          let onmessage = ((postMessage) => {
            var __async2 = (__this, __arguments, generator) => {
              return new Promise((resolve, reject) => {
                var fulfilled = (value) => {
                  try {
                    step(generator.next(value));
                  } catch (e3) {
                    reject(e3);
                  }
                };
                var rejected = (value) => {
                  try {
                    step(generator.throw(value));
                  } catch (e3) {
                    reject(e3);
                  }
                };
                var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
                step((generator = generator.apply(__this, __arguments)).next());
              });
            };
            let onmessage2;
            let globalThis2 = {};
            for (let o5 = self; o5; o5 = Object.getPrototypeOf(o5))
              for (let k3 of Object.getOwnPropertyNames(o5))
                if (!(k3 in globalThis2))
                  Object.defineProperty(globalThis2, k3, { get: () => self[k3] });
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
                    for (let i3 = 0; i3 < len; i3++) {
                      a[i3] = loadValue(array + i3 * 8);
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
                        const p3 = getInt64(sp + 16);
                        const n = this.mem.getInt32(sp + 24, true);
                        globalThis2.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p3, n));
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
                          const m3 = Reflect.get(v, loadString(sp + 16));
                          const args = loadSliceOfValues(sp + 32);
                          const result = Reflect.apply(m3, v, args);
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
                  return __async2(this, null, function* () {
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
                      globalThis2,
                      this
                    ];
                    this._goRefCounts = new Array(this._values.length).fill(Infinity);
                    this._ids = /* @__PURE__ */ new Map([
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
                    const keys = Object.keys(this.env).sort();
                    keys.forEach((key) => {
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
                  const go3 = this;
                  return function() {
                    const event = { id, this: this, args: arguments };
                    go3._pendingEvent = event;
                    go3._resume();
                    return event.result;
                  };
                }
              };
            })();
            onmessage2 = ({ data: wasm }) => {
              let decoder = new TextDecoder();
              let fs3 = globalThis2.fs;
              let stderr = "";
              fs3.writeSync = (fd, buffer) => {
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
              fs3.read = (fd, buffer, offset, length, position, callback) => {
                if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
                  throw new Error("Bad read");
                }
                if (stdin.length === 0) {
                  resumeStdin = () => fs3.read(fd, buffer, offset, length, position, callback);
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
              let go3 = new globalThis2.Go();
              go3.argv = ["", `--service=${"0.16.13"}`];
              tryToInstantiateModule(wasm, go3).then(
                (instance) => {
                  postMessage(null);
                  go3.run(instance);
                },
                (error) => {
                  postMessage(error);
                }
              );
            };
            function tryToInstantiateModule(wasm, go3) {
              return __async2(this, null, function* () {
                if (wasm instanceof WebAssembly.Module) {
                  return WebAssembly.instantiate(wasm, go3.importObject);
                }
                const res = yield fetch(wasm);
                if (!res.ok)
                  throw new Error(`Failed to download ${JSON.stringify(wasm)}`);
                if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
                  const result2 = yield WebAssembly.instantiateStreaming(res, go3.importObject);
                  return result2.instance;
                }
                const bytes = yield res.arrayBuffer();
                const result = yield WebAssembly.instantiate(bytes, go3.importObject);
                return result.instance;
              });
            }
            return (m3) => onmessage2(m3);
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
    "esbuild-wasm": "0.16.13",
    "events-browserify": "^0.0.1",
    "fast-diff": "1.2.0",
    "fetch-retry": "^5.0.3",
    "framer-motion": "8.1.5",
    immutable: "^4.2.1",
    "is-callable": "1.2.7",
    "isomorphic-fetch": "^3.0.0",
    localforage: "^1.10.0",
    logrocket: "^3.0.1",
    memfs: "^3.4.12",
    module: "^1.2.5",
    "monaco-editor": "0.35.0-dev.20230103",
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
    esbuild: "0.16.13",
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

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/src/chunk-chunk-WVUJHC6X.mjs
var $ = "./chunk-esbuild-GS5BVJUF.wasm";

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/src/chunk-chunk-TKEPGNJK.mjs
var g = Object.create;
var e = Object.defineProperty;
var h = Object.getOwnPropertyDescriptor;
var i = Object.getOwnPropertyNames;
var j = Object.getPrototypeOf;
var k = Object.prototype.hasOwnProperty;
var p = (a, b3) => e(a, "name", { value: b3, configurable: true });
var q = ((a) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(a, { get: (b3, c) => (typeof __require < "u" ? __require : b3)[c] }) : a)(function(a) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + a + '" is not supported');
});
var l = (a, b3) => () => (a && (b3 = a(a = 0)), b3);
var r = (a, b3) => () => (b3 || a((b3 = { exports: {} }).exports, b3), b3.exports);
var m = (a, b3, c, f) => {
  if (b3 && typeof b3 == "object" || typeof b3 == "function")
    for (let d of i(b3))
      !k.call(a, d) && d !== c && e(a, d, { get: () => b3[d], enumerable: !(f = h(b3, d)) || f.enumerable });
  return a;
};
var t2 = (a, b3, c) => (c = a != null ? g(j(a)) : {}, m(b3 || !a || !a.__esModule ? e(c, "default", { value: a, enumerable: true }) : c, a));
var w;
var o = l(() => {
  w = { version: "v19.3.0", versions: { node: "v19.3.0" }, env: { NODE_ENV: "production", version: "v19.3.0", browser: true, isWebworker: true, NODE_DEBUG: false, DEBUG: false, isBrowser: true, versions: { node: "v19.3.0" } }, browser: true };
});

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/src/chunk-chunk-XTZ7MHB7.mjs
o();
var U = { "@emotion/react/jsx-runtime": "/src/emotionJsxRuntime.mjs", "react-dom/client": "/src/reactDomClient.mjs", "framer-motion": "/src/motion.mjs", "@emotion/react": "/src/emotion.mjs", "@emotion/cache": "/src/emotionCache.mjs", "@emotion/styled": "/src/emotionStyled.mjs", react: "/src/reactMod.mjs", "react-dom": "/src/reactDom.mjs", "react-error-boundary": "/src/reactMod.mjs", "hydrate.mjs": "/src/hydrate.mjs" };
var R = { imports: U };
var g2 = R;
o();
var $2 = R.imports;
function b(s, m3, f, h3 = true, y = false) {
  let t4 = o2(s, 'from"', 'from "');
  if (Object.keys($2).map((n) => {
    let r3 = new URL($2[n], m3).toString();
    h3 && (t4 = o2(t4, ` from "${n}"`, ` from "${r3}"`)), t4 = o2(t4, ' from "/', ` from "${m3}/`);
  }), t4.split("/::").join(m3), !t4)
    return t4;
  let p3 = f || m3, c = new URL(".", p3).toString(), l3 = new URL("..", p3).toString(), d = new URL("../..", p3).toString(), j3 = new URL("../../..", p3).toString();
  t4 = o2(t4, 'reference path="./', `reference path="${c}`), t4 = o2(t4, 'import"', 'import "'), t4 = o2(t4, ' from "../../../', ` from "${j3}`), t4 = o2(t4, 'import("../../../', ` import("${j3}`), t4 = o2(t4, 'import("../../', ` import("${d}`), t4 = o2(t4, 'import("../', ` import("${l3}`), t4 = o2(t4, 'import("./', ` import("${c}`), t4 = o2(t4, 'import "../../../', ` import "${j3}`), t4 = o2(t4, 'import "../../', ` import "${d}`), t4 = o2(t4, 'import "../', ` import "${l3}`), t4 = o2(t4, 'import "./', ` import "${c}`), t4 = o2(t4, ' from "../../', ` from "${d}`), t4 = o2(t4, ' from "../', ` from "${l3}`), t4 = o2(t4, ' from "./', ` from "${c}`);
  let i3;
  return t4 = t4.split(";").map((n) => n.indexOf("import") !== -1 ? n.trim() : n).map((n) => n.split(`
`).map((r3) => {
    if (r3.length === 0 || r3.indexOf("import") === -1)
      return r3;
    if (r3.startsWith("import") && r3.indexOf('"') !== -1 && r3.indexOf("https://") === -1 && r3.indexOf(m3) === -1) {
      let e3 = r3.split('"');
      return e3[1] = m3 + "/" + e3[1] + "?dev&format=es2022", e3.join('"');
    }
    if (r3.indexOf("/node_process.js") !== -1 || r3.indexOf("/node_buffer.js") !== -1 || r3.indexOf("@babel/runtime") !== -1) {
      let e3 = r3.split('"');
      try {
        i3 = new URL(e3[1]), e3[1] = m3 + "/npm:" + i3.pathname;
      } catch {
        console.error("URL ERR", e3[1]);
      }
      return e3.join('"');
    }
    if (r3.indexOf("/npm:/") === -1 && r3.startsWith("import")) {
      let e3 = r3.split('"');
      try {
        i3 = new URL(e3[1], m3), i3 && i3.pathname.indexOf(".") === -1 && i3.pathname.indexOf("/live/") !== -1 && (e3[1] = i3.toString() + (y ? "/index.tsx" : "/index.js"));
      } catch {
        console.error("URL ERR", e3[1]);
      }
      return e3.join('"');
    }
    return r3;
  }).join(`
`)).join(";"), t4 = t4.split("/npm:/npm:").join("/npm:"), t4;
}
p(b, "importMapReplace");
function o2(s, m3, f) {
  return s && s.split(m3).join(f);
}
p(o2, "replaceAll");

// ../../.yarn/__virtual__/@spike.land-code-virtual-d9171aea5c/1/packages/code/dist/src/chunk-chunk-5MVL554Q.mjs
var Os = r((Aa, Es) => {
  o();
  var fe = -1, se = 1, qt = 0;
  function pr(t4, e3, r3, n) {
    if (t4 === e3)
      return t4 ? [[qt, t4]] : [];
    if (r3 != null) {
      var s = la(t4, e3, r3);
      if (s)
        return s;
    }
    var o5 = zn(t4, e3), a = t4.substring(0, o5);
    t4 = t4.substring(o5), e3 = e3.substring(o5), o5 = Pn(t4, e3);
    var u = t4.substring(t4.length - o5);
    t4 = t4.substring(0, t4.length - o5), e3 = e3.substring(0, e3.length - o5);
    var l3 = sa(t4, e3);
    return a && l3.unshift([qt, a]), u && l3.push([qt, u]), vs(l3, n), l3;
  }
  p(pr, "diff_main");
  function sa(t4, e3) {
    var r3;
    if (!t4)
      return [[se, e3]];
    if (!e3)
      return [[fe, t4]];
    var n = t4.length > e3.length ? t4 : e3, s = t4.length > e3.length ? e3 : t4, o5 = n.indexOf(s);
    if (o5 !== -1)
      return r3 = [[se, n.substring(0, o5)], [qt, s], [se, n.substring(o5 + s.length)]], t4.length > e3.length && (r3[0][0] = r3[2][0] = fe), r3;
    if (s.length === 1)
      return [[fe, t4], [se, e3]];
    var a = aa(t4, e3);
    if (a) {
      var u = a[0], l3 = a[1], c = a[2], _ = a[3], p3 = a[4], w3 = pr(u, c), v = pr(l3, _);
      return w3.concat([[qt, p3]], v);
    }
    return oa(t4, e3);
  }
  p(sa, "diff_compute_");
  function oa(t4, e3) {
    for (var r3 = t4.length, n = e3.length, s = Math.ceil((r3 + n) / 2), o5 = s, a = 2 * s, u = new Array(a), l3 = new Array(a), c = 0; c < a; c++)
      u[c] = -1, l3[c] = -1;
    u[o5 + 1] = 0, l3[o5 + 1] = 0;
    for (var _ = r3 - n, p3 = _ % 2 !== 0, w3 = 0, v = 0, y = 0, b3 = 0, k3 = 0; k3 < s; k3++) {
      for (var X = -k3 + w3; X <= k3 - v; X += 2) {
        var K = o5 + X, ct;
        X === -k3 || X !== k3 && u[K - 1] < u[K + 1] ? ct = u[K + 1] : ct = u[K - 1] + 1;
        for (var pt = ct - X; ct < r3 && pt < n && t4.charAt(ct) === e3.charAt(pt); )
          ct++, pt++;
        if (u[K] = ct, ct > r3)
          v += 2;
        else if (pt > n)
          w3 += 2;
        else if (p3) {
          var Q = o5 + _ - X;
          if (Q >= 0 && Q < a && l3[Q] !== -1) {
            var N = r3 - l3[Q];
            if (ct >= N)
              return gs(t4, e3, ct, pt);
          }
        }
      }
      for (var W = -k3 + y; W <= k3 - b3; W += 2) {
        var Q = o5 + W, N;
        W === -k3 || W !== k3 && l3[Q - 1] < l3[Q + 1] ? N = l3[Q + 1] : N = l3[Q - 1] + 1;
        for (var ft = N - W; N < r3 && ft < n && t4.charAt(r3 - N - 1) === e3.charAt(n - ft - 1); )
          N++, ft++;
        if (l3[Q] = N, N > r3)
          b3 += 2;
        else if (ft > n)
          y += 2;
        else if (!p3) {
          var K = o5 + _ - W;
          if (K >= 0 && K < a && u[K] !== -1) {
            var ct = u[K], pt = o5 + ct - K;
            if (N = r3 - N, ct >= N)
              return gs(t4, e3, ct, pt);
          }
        }
      }
    }
    return [[fe, t4], [se, e3]];
  }
  p(oa, "diff_bisect_");
  function gs(t4, e3, r3, n) {
    var s = t4.substring(0, r3), o5 = e3.substring(0, n), a = t4.substring(r3), u = e3.substring(n), l3 = pr(s, o5), c = pr(a, u);
    return l3.concat(c);
  }
  p(gs, "diff_bisectSplit_");
  function zn(t4, e3) {
    if (!t4 || !e3 || t4.charAt(0) !== e3.charAt(0))
      return 0;
    for (var r3 = 0, n = Math.min(t4.length, e3.length), s = n, o5 = 0; r3 < s; )
      t4.substring(o5, s) == e3.substring(o5, s) ? (r3 = s, o5 = r3) : n = s, s = Math.floor((n - r3) / 2 + r3);
    return ys(t4.charCodeAt(s - 1)) && s--, s;
  }
  p(zn, "diff_commonPrefix");
  function Pn(t4, e3) {
    if (!t4 || !e3 || t4.slice(-1) !== e3.slice(-1))
      return 0;
    for (var r3 = 0, n = Math.min(t4.length, e3.length), s = n, o5 = 0; r3 < s; )
      t4.substring(t4.length - s, t4.length - o5) == e3.substring(e3.length - s, e3.length - o5) ? (r3 = s, o5 = r3) : n = s, s = Math.floor((n - r3) / 2 + r3);
    return ws(t4.charCodeAt(t4.length - s)) && s--, s;
  }
  p(Pn, "diff_commonSuffix");
  function aa(t4, e3) {
    var r3 = t4.length > e3.length ? t4 : e3, n = t4.length > e3.length ? e3 : t4;
    if (r3.length < 4 || n.length * 2 < r3.length)
      return null;
    function s(v, y, b3) {
      for (var k3 = v.substring(b3, b3 + Math.floor(v.length / 4)), X = -1, K = "", ct, pt, Q, N; (X = y.indexOf(k3, X + 1)) !== -1; ) {
        var W = zn(v.substring(b3), y.substring(X)), ft = Pn(v.substring(0, b3), y.substring(0, X));
        K.length < ft + W && (K = y.substring(X - ft, X) + y.substring(X, X + W), ct = v.substring(0, b3 - ft), pt = v.substring(b3 + W), Q = y.substring(0, X - ft), N = y.substring(X + W));
      }
      return K.length * 2 >= v.length ? [ct, pt, Q, N, K] : null;
    }
    p(s, "diff_halfMatchI_");
    var o5 = s(r3, n, Math.ceil(r3.length / 4)), a = s(r3, n, Math.ceil(r3.length / 2)), u;
    if (!o5 && !a)
      return null;
    a ? o5 ? u = o5[4].length > a[4].length ? o5 : a : u = a : u = o5;
    var l3, c, _, p3;
    t4.length > e3.length ? (l3 = u[0], c = u[1], _ = u[2], p3 = u[3]) : (_ = u[0], p3 = u[1], l3 = u[2], c = u[3]);
    var w3 = u[4];
    return [l3, c, _, p3, w3];
  }
  p(aa, "diff_halfMatch_");
  function vs(t4, e3) {
    t4.push([qt, ""]);
    for (var r3 = 0, n = 0, s = 0, o5 = "", a = "", u; r3 < t4.length; ) {
      if (r3 < t4.length - 1 && !t4[r3][1]) {
        t4.splice(r3, 1);
        continue;
      }
      switch (t4[r3][0]) {
        case se:
          s++, a += t4[r3][1], r3++;
          break;
        case fe:
          n++, o5 += t4[r3][1], r3++;
          break;
        case qt:
          var l3 = r3 - s - n - 1;
          if (e3) {
            if (l3 >= 0 && Ss(t4[l3][1])) {
              var c = t4[l3][1].slice(-1);
              if (t4[l3][1] = t4[l3][1].slice(0, -1), o5 = c + o5, a = c + a, !t4[l3][1]) {
                t4.splice(l3, 1), r3--;
                var _ = l3 - 1;
                t4[_] && t4[_][0] === se && (s++, a = t4[_][1] + a, _--), t4[_] && t4[_][0] === fe && (n++, o5 = t4[_][1] + o5, _--), l3 = _;
              }
            }
            if (bs(t4[r3][1])) {
              var c = t4[r3][1].charAt(0);
              t4[r3][1] = t4[r3][1].slice(1), o5 += c, a += c;
            }
          }
          if (r3 < t4.length - 1 && !t4[r3][1]) {
            t4.splice(r3, 1);
            break;
          }
          if (o5.length > 0 || a.length > 0) {
            o5.length > 0 && a.length > 0 && (u = zn(a, o5), u !== 0 && (l3 >= 0 ? t4[l3][1] += a.substring(0, u) : (t4.splice(0, 0, [qt, a.substring(0, u)]), r3++), a = a.substring(u), o5 = o5.substring(u)), u = Pn(a, o5), u !== 0 && (t4[r3][1] = a.substring(a.length - u) + t4[r3][1], a = a.substring(0, a.length - u), o5 = o5.substring(0, o5.length - u)));
            var p3 = s + n;
            o5.length === 0 && a.length === 0 ? (t4.splice(r3 - p3, p3), r3 = r3 - p3) : o5.length === 0 ? (t4.splice(r3 - p3, p3, [se, a]), r3 = r3 - p3 + 1) : a.length === 0 ? (t4.splice(r3 - p3, p3, [fe, o5]), r3 = r3 - p3 + 1) : (t4.splice(r3 - p3, p3, [fe, o5], [se, a]), r3 = r3 - p3 + 2);
          }
          r3 !== 0 && t4[r3 - 1][0] === qt ? (t4[r3 - 1][1] += t4[r3][1], t4.splice(r3, 1)) : r3++, s = 0, n = 0, o5 = "", a = "";
          break;
      }
    }
    t4[t4.length - 1][1] === "" && t4.pop();
    var w3 = false;
    for (r3 = 1; r3 < t4.length - 1; )
      t4[r3 - 1][0] === qt && t4[r3 + 1][0] === qt && (t4[r3][1].substring(t4[r3][1].length - t4[r3 - 1][1].length) === t4[r3 - 1][1] ? (t4[r3][1] = t4[r3 - 1][1] + t4[r3][1].substring(0, t4[r3][1].length - t4[r3 - 1][1].length), t4[r3 + 1][1] = t4[r3 - 1][1] + t4[r3 + 1][1], t4.splice(r3 - 1, 1), w3 = true) : t4[r3][1].substring(0, t4[r3 + 1][1].length) == t4[r3 + 1][1] && (t4[r3 - 1][1] += t4[r3 + 1][1], t4[r3][1] = t4[r3][1].substring(t4[r3 + 1][1].length) + t4[r3 + 1][1], t4.splice(r3 + 1, 1), w3 = true)), r3++;
    w3 && vs(t4, e3);
  }
  p(vs, "diff_cleanupMerge");
  function ys(t4) {
    return t4 >= 55296 && t4 <= 56319;
  }
  p(ys, "is_surrogate_pair_start");
  function ws(t4) {
    return t4 >= 56320 && t4 <= 57343;
  }
  p(ws, "is_surrogate_pair_end");
  function bs(t4) {
    return ws(t4.charCodeAt(0));
  }
  p(bs, "starts_with_pair_end");
  function Ss(t4) {
    return ys(t4.charCodeAt(t4.length - 1));
  }
  p(Ss, "ends_with_pair_start");
  function ua(t4) {
    for (var e3 = [], r3 = 0; r3 < t4.length; r3++)
      t4[r3][1].length > 0 && e3.push(t4[r3]);
    return e3;
  }
  p(ua, "remove_empty_tuples");
  function $n(t4, e3, r3, n) {
    return Ss(t4) || bs(n) ? null : ua([[qt, t4], [fe, e3], [se, r3], [qt, n]]);
  }
  p($n, "make_edit_splice");
  function la(t4, e3, r3) {
    var n = typeof r3 == "number" ? { index: r3, length: 0 } : r3.oldRange, s = typeof r3 == "number" ? null : r3.newRange, o5 = t4.length, a = e3.length;
    if (n.length === 0 && (s === null || s.length === 0)) {
      var u = n.index, l3 = t4.slice(0, u), c = t4.slice(u), _ = s ? s.index : null;
      t: {
        var p3 = u + a - o5;
        if (_ !== null && _ !== p3 || p3 < 0 || p3 > a)
          break t;
        var w3 = e3.slice(0, p3), v = e3.slice(p3);
        if (v !== c)
          break t;
        var y = Math.min(u, p3), b3 = l3.slice(0, y), k3 = w3.slice(0, y);
        if (b3 !== k3)
          break t;
        var X = l3.slice(y), K = w3.slice(y);
        return $n(b3, X, K, c);
      }
      t: {
        if (_ !== null && _ !== u)
          break t;
        var ct = u, w3 = e3.slice(0, ct), v = e3.slice(ct);
        if (w3 !== l3)
          break t;
        var pt = Math.min(o5 - ct, a - ct), Q = c.slice(c.length - pt), N = v.slice(v.length - pt);
        if (Q !== N)
          break t;
        var X = c.slice(0, c.length - pt), K = v.slice(0, v.length - pt);
        return $n(l3, X, K, Q);
      }
    }
    if (n.length > 0 && s && s.length === 0) {
      t: {
        var b3 = t4.slice(0, n.index), Q = t4.slice(n.index + n.length), y = b3.length, pt = Q.length;
        if (a < y + pt)
          break t;
        var k3 = e3.slice(0, y), N = e3.slice(a - pt);
        if (b3 !== k3 || Q !== N)
          break t;
        var X = t4.slice(y, o5 - pt), K = e3.slice(y, a - pt);
        return $n(b3, X, K, Q);
      }
    }
    return null;
  }
  p(la, "find_cursor_edit_diff");
  function Cr(t4, e3, r3) {
    return pr(t4, e3, r3, true);
  }
  p(Cr, "diff");
  Cr.INSERT = se;
  Cr.DELETE = fe;
  Cr.EQUAL = qt;
  Es.exports = Cr;
});
var js = r((Da, Cn) => {
  o();
  ((t4) => {
    "use strict";
    var e3 = Object.defineProperty, r3 = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, o5 = p((h3, d) => {
      for (var m3 in d)
        e3(h3, m3, { get: d[m3], enumerable: true });
    }, "__export"), a = p((h3, d, m3, M) => {
      if (d && typeof d == "object" || typeof d == "function")
        for (let T of n(d))
          !s.call(h3, T) && T !== m3 && e3(h3, T, { get: () => d[T], enumerable: !(M = r3(d, T)) || M.enumerable });
      return h3;
    }, "__copyProps"), u = p((h3) => a(e3({}, "__esModule", { value: true }), h3), "__toCommonJS"), l3 = p((h3, d, m3) => new Promise((M, T) => {
      var $5 = p((x) => {
        try {
          U3(m3.next(x));
        } catch (V) {
          T(V);
        }
      }, "fulfilled"), j3 = p((x) => {
        try {
          U3(m3.throw(x));
        } catch (V) {
          T(V);
        }
      }, "rejected"), U3 = p((x) => x.done ? M(x.value) : Promise.resolve(x.value).then($5, j3), "step");
      U3((m3 = m3.apply(h3, d)).next());
    }), "__async"), c = {};
    o5(c, { analyzeMetafile: () => Ys, analyzeMetafileSync: () => Zs, build: () => Vs, buildSync: () => Gs, default: () => ro, formatMessages: () => Ks, formatMessagesSync: () => Xs, initialize: () => to, serve: () => Js, transform: () => Hs, transformSync: () => Qs, version: () => Ws }), t4.exports = u(c);
    function _(h3) {
      let d = p((M) => {
        if (M === null)
          m3.write8(0);
        else if (typeof M == "boolean")
          m3.write8(1), m3.write8(+M);
        else if (typeof M == "number")
          m3.write8(2), m3.write32(M | 0);
        else if (typeof M == "string")
          m3.write8(3), m3.write(v(M));
        else if (M instanceof Uint8Array)
          m3.write8(4), m3.write(M);
        else if (M instanceof Array) {
          m3.write8(5), m3.write32(M.length);
          for (let T of M)
            d(T);
        } else {
          let T = Object.keys(M);
          m3.write8(6), m3.write32(T.length);
          for (let $5 of T)
            m3.write(v($5)), d(M[$5]);
        }
      }, "visit"), m3 = new w3();
      return m3.write32(0), m3.write32(h3.id << 1 | +!h3.isRequest), d(h3.value), X(m3.buf, m3.len - 4, 0), m3.buf.subarray(0, m3.len);
    }
    p(_, "encodePacket");
    function p3(h3) {
      let d = p(() => {
        switch (m3.read8()) {
          case 0:
            return null;
          case 1:
            return !!m3.read8();
          case 2:
            return m3.read32();
          case 3:
            return y(m3.read());
          case 4:
            return m3.read();
          case 5: {
            let j3 = m3.read32(), U3 = [];
            for (let x = 0; x < j3; x++)
              U3.push(d());
            return U3;
          }
          case 6: {
            let j3 = m3.read32(), U3 = {};
            for (let x = 0; x < j3; x++)
              U3[y(m3.read())] = d();
            return U3;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, "visit"), m3 = new w3(h3), M = m3.read32(), T = (M & 1) === 0;
      M >>>= 1;
      let $5 = d();
      if (m3.ptr !== h3.length)
        throw new Error("Invalid packet");
      return { id: M, isRequest: T, value: $5 };
    }
    p(p3, "decodePacket");
    var w3 = p(class {
      constructor(h3 = new Uint8Array(1024)) {
        this.buf = h3, this.len = 0, this.ptr = 0;
      }
      _write(h3) {
        if (this.len + h3 > this.buf.length) {
          let d = new Uint8Array((this.len + h3) * 2);
          d.set(this.buf), this.buf = d;
        }
        return this.len += h3, this.len - h3;
      }
      write8(h3) {
        let d = this._write(1);
        this.buf[d] = h3;
      }
      write32(h3) {
        let d = this._write(4);
        X(this.buf, h3, d);
      }
      write(h3) {
        let d = this._write(4 + h3.length);
        X(this.buf, h3.length, d), this.buf.set(h3, d + 4);
      }
      _read(h3) {
        if (this.ptr + h3 > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += h3, this.ptr - h3;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return k3(this.buf, this._read(4));
      }
      read() {
        let h3 = this.read32(), d = new Uint8Array(h3), m3 = this._read(d.length);
        return d.set(this.buf.subarray(m3, m3 + h3)), d;
      }
    }, "ByteBuffer"), v, y, b3;
    if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
      let h3 = new TextEncoder(), d = new TextDecoder();
      v = p((m3) => h3.encode(m3), "encodeUTF8"), y = p((m3) => d.decode(m3), "decodeUTF8"), b3 = 'new TextEncoder().encode("")';
    } else if (typeof Buffer < "u")
      v = p((h3) => Buffer.from(h3), "encodeUTF8"), y = p((h3) => {
        let { buffer: d, byteOffset: m3, byteLength: M } = h3;
        return Buffer.from(d, m3, M).toString();
      }, "decodeUTF8"), b3 = 'Buffer.from("")';
    else
      throw new Error("No UTF-8 codec found");
    if (!(v("") instanceof Uint8Array))
      throw new Error(`Invariant violation: "${b3} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
    function k3(h3, d) {
      return h3[d++] | h3[d++] << 8 | h3[d++] << 16 | h3[d++] << 24;
    }
    p(k3, "readUInt32LE");
    function X(h3, d, m3) {
      h3[m3++] = d, h3[m3++] = d >> 8, h3[m3++] = d >> 16, h3[m3++] = d >> 24;
    }
    p(X, "writeUInt32LE");
    var K = JSON.stringify, ct = "warning", pt = "silent";
    function Q(h3) {
      if (Mt(h3, "target"), h3.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${h3}`);
      return h3;
    }
    p(Q, "validateTarget");
    var N = p(() => null, "canBeAnything"), W = p((h3) => typeof h3 == "boolean" ? null : "a boolean", "mustBeBoolean"), ft = p((h3) => typeof h3 == "boolean" || typeof h3 == "object" && !Array.isArray(h3) ? null : "a boolean or an object", "mustBeBooleanOrObject"), F = p((h3) => typeof h3 == "string" ? null : "a string", "mustBeString"), Dt = p((h3) => h3 instanceof RegExp ? null : "a RegExp object", "mustBeRegExp"), Ct = p((h3) => typeof h3 == "number" && h3 === (h3 | 0) ? null : "an integer", "mustBeInteger"), qr = p((h3) => typeof h3 == "function" ? null : "a function", "mustBeFunction"), It = p((h3) => Array.isArray(h3) ? null : "an array", "mustBeArray"), Xt = p((h3) => typeof h3 == "object" && h3 !== null && !Array.isArray(h3) ? null : "an object", "mustBeObject"), Rs = p((h3) => h3 instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule"), Ts = p((h3) => typeof h3 == "object" && h3 !== null ? null : "an array or an object", "mustBeArrayOrRecord"), Un = p((h3) => typeof h3 == "object" && !Array.isArray(h3) ? null : "an object or null", "mustBeObjectOrNull"), Nn = p((h3) => typeof h3 == "string" || typeof h3 == "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean"), $s = p((h3) => typeof h3 == "string" || typeof h3 == "object" && h3 !== null && !Array.isArray(h3) ? null : "a string or an object", "mustBeStringOrObject"), zs = p((h3) => typeof h3 == "string" || Array.isArray(h3) ? null : "a string or an array", "mustBeStringOrArray"), Fn = p((h3) => typeof h3 == "string" || h3 instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array"), Ps = p((h3) => typeof h3 == "string" || h3 instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
    function S(h3, d, m3, M) {
      let T = h3[m3];
      if (d[m3 + ""] = true, T === void 0)
        return;
      let $5 = M(T);
      if ($5 !== null)
        throw new Error(`${K(m3)} must be ${$5}`);
      return T;
    }
    p(S, "getFlag");
    function kt(h3, d, m3) {
      for (let M in h3)
        if (!(M in d))
          throw new Error(`Invalid option ${m3}: ${K(M)}`);
    }
    p(kt, "checkForInvalidFlags");
    function Ds(h3) {
      let d = /* @__PURE__ */ Object.create(null), m3 = S(h3, d, "wasmURL", Ps), M = S(h3, d, "wasmModule", Rs), T = S(h3, d, "worker", W);
      return kt(h3, d, "in initialize() call"), { wasmURL: m3, wasmModule: M, worker: T };
    }
    p(Ds, "validateInitializeOptions");
    function qn(h3) {
      let d;
      if (h3 !== void 0) {
        d = /* @__PURE__ */ Object.create(null);
        for (let m3 in h3) {
          let M = h3[m3];
          if (typeof M == "string" || M === false)
            d[m3] = M;
          else
            throw new Error(`Expected ${K(m3)} in mangle cache to map to either a string or false`);
        }
      }
      return d;
    }
    p(qn, "validateMangleCache");
    function _r(h3, d, m3, M, T) {
      let $5 = S(d, m3, "color", W), j3 = S(d, m3, "logLevel", F), U3 = S(d, m3, "logLimit", Ct);
      $5 !== void 0 ? h3.push(`--color=${$5}`) : M && h3.push("--color=true"), h3.push(`--log-level=${j3 || T}`), h3.push(`--log-limit=${U3 || 0}`);
    }
    p(_r, "pushLogFlags");
    function Mt(h3, d, m3) {
      if (typeof h3 != "string")
        throw new Error(`Expected value for ${d}${m3 !== void 0 ? " " + K(m3) : ""} to be a string, got ${typeof h3} instead`);
      return h3;
    }
    p(Mt, "validateStringValue");
    function Ln(h3, d, m3) {
      let M = S(d, m3, "legalComments", F), T = S(d, m3, "sourceRoot", F), $5 = S(d, m3, "sourcesContent", W), j3 = S(d, m3, "target", zs), U3 = S(d, m3, "format", F), x = S(d, m3, "globalName", F), V = S(d, m3, "mangleProps", Dt), Y = S(d, m3, "reserveProps", Dt), Z = S(d, m3, "mangleQuoted", W), rt = S(d, m3, "minify", W), J = S(d, m3, "minifySyntax", W), tt = S(d, m3, "minifyWhitespace", W), q3 = S(d, m3, "minifyIdentifiers", W), nt = S(d, m3, "drop", It), at = S(d, m3, "charset", F), D = S(d, m3, "treeShaking", W), E = S(d, m3, "ignoreAnnotations", W), g5 = S(d, m3, "jsx", F), I = S(d, m3, "jsxFactory", F), R3 = S(d, m3, "jsxFragment", F), C = S(d, m3, "jsxImportSource", F), L = S(d, m3, "jsxDev", W), A = S(d, m3, "jsxSideEffects", W), f = S(d, m3, "define", Xt), O = S(d, m3, "logOverride", Xt), z = S(d, m3, "supported", Xt), P = S(d, m3, "pure", It), H = S(d, m3, "keepNames", W), it = S(d, m3, "platform", F);
      if (M && h3.push(`--legal-comments=${M}`), T !== void 0 && h3.push(`--source-root=${T}`), $5 !== void 0 && h3.push(`--sources-content=${$5}`), j3 && (Array.isArray(j3) ? h3.push(`--target=${Array.from(j3).map(Q).join(",")}`) : h3.push(`--target=${Q(j3)}`)), U3 && h3.push(`--format=${U3}`), x && h3.push(`--global-name=${x}`), it && h3.push(`--platform=${it}`), rt && h3.push("--minify"), J && h3.push("--minify-syntax"), tt && h3.push("--minify-whitespace"), q3 && h3.push("--minify-identifiers"), at && h3.push(`--charset=${at}`), D !== void 0 && h3.push(`--tree-shaking=${D}`), E && h3.push("--ignore-annotations"), nt)
        for (let G of nt)
          h3.push(`--drop:${Mt(G, "drop")}`);
      if (V && h3.push(`--mangle-props=${V.source}`), Y && h3.push(`--reserve-props=${Y.source}`), Z !== void 0 && h3.push(`--mangle-quoted=${Z}`), g5 && h3.push(`--jsx=${g5}`), I && h3.push(`--jsx-factory=${I}`), R3 && h3.push(`--jsx-fragment=${R3}`), C && h3.push(`--jsx-import-source=${C}`), L && h3.push("--jsx-dev"), A && h3.push("--jsx-side-effects"), f)
        for (let G in f) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${G}`);
          h3.push(`--define:${G}=${Mt(f[G], "define", G)}`);
        }
      if (O)
        for (let G in O) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid log override: ${G}`);
          h3.push(`--log-override:${G}=${Mt(O[G], "log override", G)}`);
        }
      if (z)
        for (let G in z) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid supported: ${G}`);
          let et = z[G];
          if (typeof et != "boolean")
            throw new Error(`Expected value for supported ${K(G)} to be a boolean, got ${typeof et} instead`);
          h3.push(`--supported:${G}=${et}`);
        }
      if (P)
        for (let G of P)
          h3.push(`--pure:${Mt(G, "pure")}`);
      H && h3.push("--keep-names");
    }
    p(Ln, "pushCommonFlags");
    function Cs(h3, d, m3, M, T) {
      var $5;
      let j3 = [], U3 = [], x = /* @__PURE__ */ Object.create(null), V = null, Y = null, Z = null;
      _r(j3, d, x, m3, M), Ln(j3, d, x);
      let rt = S(d, x, "sourcemap", Nn), J = S(d, x, "bundle", W), tt = S(d, x, "watch", ft), q3 = S(d, x, "splitting", W), nt = S(d, x, "preserveSymlinks", W), at = S(d, x, "metafile", W), D = S(d, x, "outfile", F), E = S(d, x, "outdir", F), g5 = S(d, x, "outbase", F), I = S(d, x, "tsconfig", F), R3 = S(d, x, "resolveExtensions", It), C = S(d, x, "nodePaths", It), L = S(d, x, "mainFields", It), A = S(d, x, "conditions", It), f = S(d, x, "external", It), O = S(d, x, "packages", F), z = S(d, x, "alias", Xt), P = S(d, x, "loader", Xt), H = S(d, x, "outExtension", Xt), it = S(d, x, "publicPath", F), G = S(d, x, "entryNames", F), et = S(d, x, "chunkNames", F), jt = S(d, x, "assetNames", F), Rt = S(d, x, "inject", It), bt = S(d, x, "banner", Xt), ut = S(d, x, "footer", Xt), st = S(d, x, "entryPoints", Ts), xt = S(d, x, "absWorkingDir", F), Tt = S(d, x, "stdin", Xt), be = ($5 = S(d, x, "write", W)) != null ? $5 : T, He = S(d, x, "allowOverwrite", W), oe = S(d, x, "incremental", W) === true, Zt = S(d, x, "mangleCache", Xt);
      if (x.plugins = true, kt(d, x, `in ${h3}() call`), rt && j3.push(`--sourcemap${rt === true ? "" : `=${rt}`}`), J && j3.push("--bundle"), He && j3.push("--allow-overwrite"), tt)
        if (j3.push("--watch"), typeof tt == "boolean")
          Z = {};
        else {
          let B = /* @__PURE__ */ Object.create(null), St = S(tt, B, "onRebuild", qr);
          kt(tt, B, `on "watch" in ${h3}() call`), Z = { onRebuild: St };
        }
      if (q3 && j3.push("--splitting"), nt && j3.push("--preserve-symlinks"), at && j3.push("--metafile"), D && j3.push(`--outfile=${D}`), E && j3.push(`--outdir=${E}`), g5 && j3.push(`--outbase=${g5}`), I && j3.push(`--tsconfig=${I}`), O && j3.push(`--packages=${O}`), R3) {
        let B = [];
        for (let St of R3) {
          if (Mt(St, "resolve extension"), St.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${St}`);
          B.push(St);
        }
        j3.push(`--resolve-extensions=${B.join(",")}`);
      }
      if (it && j3.push(`--public-path=${it}`), G && j3.push(`--entry-names=${G}`), et && j3.push(`--chunk-names=${et}`), jt && j3.push(`--asset-names=${jt}`), L) {
        let B = [];
        for (let St of L) {
          if (Mt(St, "main field"), St.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${St}`);
          B.push(St);
        }
        j3.push(`--main-fields=${B.join(",")}`);
      }
      if (A) {
        let B = [];
        for (let St of A) {
          if (Mt(St, "condition"), St.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${St}`);
          B.push(St);
        }
        j3.push(`--conditions=${B.join(",")}`);
      }
      if (f)
        for (let B of f)
          j3.push(`--external:${Mt(B, "external")}`);
      if (z)
        for (let B in z) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid package name in alias: ${B}`);
          j3.push(`--alias:${B}=${Mt(z[B], "alias", B)}`);
        }
      if (bt)
        for (let B in bt) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${B}`);
          j3.push(`--banner:${B}=${Mt(bt[B], "banner", B)}`);
        }
      if (ut)
        for (let B in ut) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${B}`);
          j3.push(`--footer:${B}=${Mt(ut[B], "footer", B)}`);
        }
      if (Rt)
        for (let B of Rt)
          j3.push(`--inject:${Mt(B, "inject")}`);
      if (P)
        for (let B in P) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${B}`);
          j3.push(`--loader:${B}=${Mt(P[B], "loader", B)}`);
        }
      if (H)
        for (let B in H) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${B}`);
          j3.push(`--out-extension:${B}=${Mt(H[B], "out extension", B)}`);
        }
      if (st)
        if (Array.isArray(st))
          for (let B of st)
            U3.push(["", Mt(B, "entry point")]);
        else
          for (let B in st)
            U3.push([B, Mt(st[B], "entry point", B)]);
      if (Tt) {
        let B = /* @__PURE__ */ Object.create(null), St = S(Tt, B, "contents", Fn), Jn = S(Tt, B, "resolveDir", F), Hn = S(Tt, B, "sourcefile", F), Kn = S(Tt, B, "loader", F);
        kt(Tt, B, 'in "stdin" object'), Hn && j3.push(`--sourcefile=${Hn}`), Kn && j3.push(`--loader=${Kn}`), Jn && (Y = Jn), typeof St == "string" ? V = v(St) : St instanceof Uint8Array && (V = St);
      }
      let Ae = [];
      if (C)
        for (let B of C)
          B += "", Ae.push(B);
      return { entries: U3, flags: j3, write: be, stdinContents: V, stdinResolveDir: Y, absWorkingDir: xt, incremental: oe, nodePaths: Ae, watch: Z, mangleCache: qn(Zt) };
    }
    p(Cs, "flagsForBuildOptions");
    function Us(h3, d, m3, M) {
      let T = [], $5 = /* @__PURE__ */ Object.create(null);
      _r(T, d, $5, m3, M), Ln(T, d, $5);
      let j3 = S(d, $5, "sourcemap", Nn), U3 = S(d, $5, "tsconfigRaw", $s), x = S(d, $5, "sourcefile", F), V = S(d, $5, "loader", F), Y = S(d, $5, "banner", F), Z = S(d, $5, "footer", F), rt = S(d, $5, "mangleCache", Xt);
      return kt(d, $5, `in ${h3}() call`), j3 && T.push(`--sourcemap=${j3 === true ? "external" : j3}`), U3 && T.push(`--tsconfig-raw=${typeof U3 == "string" ? U3 : JSON.stringify(U3)}`), x && T.push(`--sourcefile=${x}`), V && T.push(`--loader=${V}`), Y && T.push(`--banner=${Y}`), Z && T.push(`--footer=${Z}`), { flags: T, mangleCache: qn(rt) };
    }
    p(Us, "flagsForTransformOptions");
    function Ns(h3) {
      let d = {}, m3 = { didClose: false, reason: "" }, M = {}, T = 0, $5 = 0, j3 = new Uint8Array(16 * 1024), U3 = 0, x = p((E) => {
        let g5 = U3 + E.length;
        if (g5 > j3.length) {
          let R3 = new Uint8Array(g5 * 2);
          R3.set(j3), j3 = R3;
        }
        j3.set(E, U3), U3 += E.length;
        let I = 0;
        for (; I + 4 <= U3; ) {
          let R3 = k3(j3, I);
          if (I + 4 + R3 > U3)
            break;
          I += 4, tt(j3.subarray(I, I + R3)), I += R3;
        }
        I > 0 && (j3.copyWithin(0, I, U3), U3 -= I);
      }, "readFromStdout"), V = p((E) => {
        m3.didClose = true, E && (m3.reason = ": " + (E.message || E));
        let g5 = "The service was stopped" + m3.reason;
        for (let I in M)
          M[I](g5, null);
        M = {};
      }, "afterClose"), Y = p((E, g5, I) => {
        if (m3.didClose)
          return I("The service is no longer running" + m3.reason, null);
        let R3 = T++;
        M[R3] = (C, L) => {
          try {
            I(C, L);
          } finally {
            E && E.unref();
          }
        }, E && E.ref(), h3.writeToStdin(_({ id: R3, isRequest: true, value: g5 }));
      }, "sendRequest"), Z = p((E, g5) => {
        if (m3.didClose)
          throw new Error("The service is no longer running" + m3.reason);
        h3.writeToStdin(_({ id: E, isRequest: false, value: g5 }));
      }, "sendResponse"), rt = p((E, g5) => l3(this, null, function* () {
        try {
          if (g5.command === "ping") {
            Z(E, {});
            return;
          }
          if (typeof g5.key == "number") {
            let I = d[g5.key];
            if (I) {
              let R3 = I[g5.command];
              if (R3) {
                yield R3(E, g5);
                return;
              }
            }
          }
          throw new Error("Invalid command: " + g5.command);
        } catch (I) {
          Z(E, { errors: [je(I, h3, null, void 0, "")] });
        }
      }), "handleRequest"), J = true, tt = p((E) => {
        if (J) {
          J = false;
          let I = String.fromCharCode(...E);
          if (I !== "0.16.13")
            throw new Error(`Cannot start service: Host version "0.16.13" does not match binary version ${K(I)}`);
          return;
        }
        let g5 = p3(E);
        if (g5.isRequest)
          rt(g5.id, g5.value);
        else {
          let I = M[g5.id];
          delete M[g5.id], g5.value.error ? I(g5.value.error, {}) : I(null, g5.value);
        }
      }, "handleIncomingPacket");
      return { readFromStdout: x, afterClose: V, service: { buildOrServe: p(({ callName: E, refs: g5, serveOptions: I, options: R3, isTTY: C, defaultWD: L, callback: A }) => {
        let f = 0, O = $5++, z = {}, P = { ref() {
          ++f === 1 && g5 && g5.ref();
        }, unref() {
          --f === 0 && (delete d[O], g5 && g5.unref());
        } };
        d[O] = z, P.ref(), Fs(E, O, Y, Z, P, h3, z, R3, I, C, L, m3, (H, it) => {
          try {
            A(H, it);
          } finally {
            P.unref();
          }
        });
      }, "buildOrServe"), transform: p(({ callName: E, refs: g5, input: I, options: R3, isTTY: C, fs: L, callback: A }) => {
        let f = Bn(), O = p((z) => {
          try {
            if (typeof I != "string" && !(I instanceof Uint8Array))
              throw new Error('The input to "transform" must be a string or a Uint8Array');
            let { flags: P, mangleCache: H } = Us(E, R3, C, pt), it = { command: "transform", flags: P, inputFS: z !== null, input: z !== null ? v(z) : typeof I == "string" ? v(I) : I };
            H && (it.mangleCache = H), Y(g5, it, (G, et) => {
              if (G)
                return A(new Error(G), null);
              let jt = pe(et.errors, f), Rt = pe(et.warnings, f), bt = 1, ut = p(() => {
                if (--bt === 0) {
                  let st = { warnings: Rt, code: et.code, map: et.map };
                  "legalComments" in et && (st.legalComments = et?.legalComments), et.mangleCache && (st.mangleCache = et?.mangleCache), A(null, st);
                }
              }, "next");
              if (jt.length > 0)
                return A(Me("Transform failed", jt, Rt), null);
              et.codeFS && (bt++, L.readFile(et.code, (st, xt) => {
                st !== null ? A(st, null) : (et.code = xt, ut());
              })), et.mapFS && (bt++, L.readFile(et.map, (st, xt) => {
                st !== null ? A(st, null) : (et.map = xt, ut());
              })), ut();
            });
          } catch (P) {
            let H = [];
            try {
              _r(H, R3, {}, C, pt);
            } catch {
            }
            let it = je(P, h3, f, void 0, "");
            Y(g5, { command: "error", flags: H, error: it }, () => {
              it.detail = f.load(it.detail), A(Me("Transform failed", [it], []), null);
            });
          }
        }, "start");
        if ((typeof I == "string" || I instanceof Uint8Array) && I.length > 1024 * 1024) {
          let z = O;
          O = p(() => L.writeFile(I, z), "start");
        }
        O(null);
      }, "transform2"), formatMessages: p(({ callName: E, refs: g5, messages: I, options: R3, callback: C }) => {
        let L = we(I, "messages", null, "");
        if (!R3)
          throw new Error(`Missing second argument in ${E}() call`);
        let A = {}, f = S(R3, A, "kind", F), O = S(R3, A, "color", W), z = S(R3, A, "terminalWidth", Ct);
        if (kt(R3, A, `in ${E}() call`), f === void 0)
          throw new Error(`Missing "kind" in ${E}() call`);
        if (f !== "error" && f !== "warning")
          throw new Error(`Expected "kind" to be "error" or "warning" in ${E}() call`);
        let P = { command: "format-msgs", messages: L, isWarning: f === "warning" };
        O !== void 0 && (P.color = O), z !== void 0 && (P.terminalWidth = z), Y(g5, P, (H, it) => {
          if (H)
            return C(new Error(H), null);
          C(null, it.messages);
        });
      }, "formatMessages2"), analyzeMetafile: p(({ callName: E, refs: g5, metafile: I, options: R3, callback: C }) => {
        R3 === void 0 && (R3 = {});
        let L = {}, A = S(R3, L, "color", W), f = S(R3, L, "verbose", W);
        kt(R3, L, `in ${E}() call`);
        let O = { command: "analyze-metafile", metafile: I };
        A !== void 0 && (O.color = A), f !== void 0 && (O.verbose = f), Y(g5, O, (z, P) => {
          if (z)
            return C(new Error(z), null);
          C(null, P.result);
        });
      }, "analyzeMetafile2") } };
    }
    p(Ns, "createChannel");
    function Fs(h3, d, m3, M, T, $5, j3, U3, x, V, Y, Z, rt) {
      let J = Bn(), tt = p((D, E, g5, I) => {
        let R3 = [];
        try {
          _r(R3, U3, {}, V, ct);
        } catch {
        }
        let C = je(D, $5, J, g5, E);
        m3(T, { command: "error", flags: R3, error: C }, () => {
          C.detail = J.load(C.detail), I(C);
        });
      }, "logPluginError"), q3 = p((D, E) => {
        tt(D, E, void 0, (g5) => {
          rt(Me("Build failed", [g5], []), null);
        });
      }, "handleError"), nt;
      if (typeof U3 == "object") {
        let D = U3.plugins;
        if (D !== void 0) {
          if (!Array.isArray(D))
            throw new Error('"plugins" must be an array');
          nt = D;
        }
      }
      if (nt && nt.length > 0) {
        if ($5.isSync) {
          q3(new Error("Cannot use plugins in synchronous API calls"), "");
          return;
        }
        Ls(d, m3, M, T, $5, j3, U3, nt, J).then((D) => {
          if (!D.ok) {
            q3(D.error, D.pluginName);
            return;
          }
          try {
            at(D.requestPlugins, D.runOnEndCallbacks);
          } catch (E) {
            q3(E, "");
          }
        }, (D) => q3(D, ""));
        return;
      }
      try {
        at(null, (D, E, g5) => g5());
      } catch (D) {
        q3(D, "");
      }
      function at(D, E) {
        let g5 = !$5.isWriteUnavailable, { entries: I, flags: R3, write: C, stdinContents: L, stdinResolveDir: A, absWorkingDir: f, incremental: O, nodePaths: z, watch: P, mangleCache: H } = Cs(h3, U3, V, ct, g5), it = { command: "build", key: d, entries: I, flags: R3, write: C, stdinContents: L, stdinResolveDir: A, absWorkingDir: f || Y, incremental: O, nodePaths: z };
        D && (it.plugins = D), H && (it.mangleCache = H);
        let G = x && qs(d, m3, M, T, j3, x, it), et, jt, Rt = p((ut, st) => {
          ut.outputFiles && (st.outputFiles = ut.outputFiles.map(Bs)), ut.metafile && (st.metafile = JSON.parse(ut.metafile)), ut.mangleCache && (st.mangleCache = ut.mangleCache), ut.writeToStdout !== void 0 && console.log(y(ut.writeToStdout).replace(/\n$/, ""));
        }, "copyResponseToResult"), bt = p((ut, st) => {
          let xt = { errors: pe(ut.errors, J), warnings: pe(ut.warnings, J) };
          Rt(ut, xt), E(xt, tt, () => {
            if (xt.errors.length > 0)
              return st(Me("Build failed", xt.errors, xt.warnings), null);
            if (ut.rebuild) {
              if (!et) {
                let Tt = false;
                et = p(() => new Promise((be, He) => {
                  if (Tt || Z.didClose)
                    throw new Error("Cannot rebuild");
                  m3(T, { command: "rebuild", key: d }, (oe, Zt) => {
                    if (oe)
                      return st(Me("Build failed", [{ id: "", pluginName: "", text: oe, location: null, notes: [], detail: void 0 }], []), null);
                    bt(Zt, (Ae, B) => {
                      Ae ? He(Ae) : be(B);
                    });
                  });
                }), "rebuild"), T.ref(), et.dispose = () => {
                  Tt || (Tt = true, m3(T, { command: "rebuild-dispose", key: d }, () => {
                  }), T.unref());
                };
              }
              xt.rebuild = et;
            }
            if (ut.watch) {
              if (!jt) {
                let Tt = false;
                T.ref(), jt = p(() => {
                  Tt || (Tt = true, delete j3["watch-rebuild"], m3(T, { command: "watch-stop", key: d }, () => {
                  }), T.unref());
                }, "stop"), P && (j3["watch-rebuild"] = (be, He) => {
                  try {
                    let oe = He.args, Zt = { errors: pe(oe.errors, J), warnings: pe(oe.warnings, J) };
                    Rt(oe, Zt), E(Zt, tt, () => {
                      if (Zt.errors.length > 0) {
                        P.onRebuild && P.onRebuild(Me("Build failed", Zt.errors, Zt.warnings), null);
                        return;
                      }
                      Zt.stop = jt, P.onRebuild && P.onRebuild(null, Zt);
                    });
                  } catch (oe) {
                    console.error(oe);
                  }
                  M(be, {});
                });
              }
              xt.stop = jt;
            }
            st(null, xt);
          });
        }, "buildResponseToResult");
        if (C && $5.isWriteUnavailable)
          throw new Error('The "write" option is unavailable in this environment');
        if (O && $5.isSync)
          throw new Error('Cannot use "incremental" with a synchronous build');
        if (P && $5.isSync)
          throw new Error('Cannot use "watch" with a synchronous build');
        m3(T, it, (ut, st) => {
          if (ut)
            return rt(new Error(ut), null);
          if (G) {
            let xt = st, Tt = false;
            T.ref();
            let be = { port: xt.port, host: xt.host, wait: G.wait, stop() {
              Tt || (Tt = true, G.stop(), T.unref());
            } };
            return T.ref(), G.wait.then(T.unref, T.unref), rt(null, be);
          }
          return bt(st, rt);
        });
      }
      p(at, "buildOrServeContinue");
    }
    p(Fs, "buildOrServeImpl");
    var qs = p((h3, d, m3, M, T, $5, j3) => {
      let U3 = {}, x = S($5, U3, "port", Ct), V = S($5, U3, "host", F), Y = S($5, U3, "servedir", F), Z = S($5, U3, "onRequest", qr), rt = new Promise((J, tt) => {
        T["serve-wait"] = (q3, nt) => {
          nt.error !== null ? tt(new Error(nt.error)) : J(), m3(q3, {});
        };
      });
      return j3.serve = {}, kt($5, U3, "in serve() call"), x !== void 0 && (j3.serve.port = x), V !== void 0 && (j3.serve.host = V), Y !== void 0 && (j3.serve.servedir = Y), T["serve-request"] = (J, tt) => {
        Z && Z(tt.args), m3(J, {});
      }, { wait: rt, stop() {
        d(M, { command: "serve-stop", key: h3 }, () => {
        });
      } };
    }, "buildServeData"), Ls = p((h3, d, m3, M, T, $5, j3, U3, x) => l3(void 0, null, function* () {
      let V = [], Y = [], Z = {}, rt = {}, J = 0, tt = 0, q3 = [], nt = false;
      U3 = [...U3];
      for (let D of U3) {
        let E = {};
        if (typeof D != "object")
          throw new Error(`Plugin at index ${tt} must be an object`);
        let g5 = S(D, E, "name", F);
        if (typeof g5 != "string" || g5 === "")
          throw new Error(`Plugin at index ${tt} is missing a name`);
        try {
          let I = S(D, E, "setup", qr);
          if (typeof I != "function")
            throw new Error("Plugin is missing a setup function");
          kt(D, E, `on plugin ${K(g5)}`);
          let R3 = { name: g5, onResolve: [], onLoad: [] };
          tt++;
          let L = I({ initialOptions: j3, resolve: p((A, f = {}) => {
            if (!nt)
              throw new Error('Cannot call "resolve" before plugin setup has completed');
            if (typeof A != "string")
              throw new Error("The path to resolve must be a string");
            let O = /* @__PURE__ */ Object.create(null), z = S(f, O, "pluginName", F), P = S(f, O, "importer", F), H = S(f, O, "namespace", F), it = S(f, O, "resolveDir", F), G = S(f, O, "kind", F), et = S(f, O, "pluginData", N);
            return kt(f, O, "in resolve() call"), new Promise((jt, Rt) => {
              let bt = { command: "resolve", path: A, key: h3, pluginName: g5 };
              if (z != null && (bt.pluginName = z), P != null && (bt.importer = P), H != null && (bt.namespace = H), it != null && (bt.resolveDir = it), G != null)
                bt.kind = G;
              else
                throw new Error('Must specify "kind" when calling "resolve"');
              et != null && (bt.pluginData = x.store(et)), d(M, bt, (ut, st) => {
                ut !== null ? Rt(new Error(ut)) : jt({ errors: pe(st.errors, x), warnings: pe(st.warnings, x), path: st.path, external: st.external, sideEffects: st.sideEffects, namespace: st.namespace, suffix: st.suffix, pluginData: x.load(st.pluginData) });
              });
            });
          }, "resolve"), onStart(A) {
            let f = 'This error came from the "onStart" callback registered here:', O = mr(new Error(f), T, "onStart");
            V.push({ name: g5, callback: A, note: O });
          }, onEnd(A) {
            let f = 'This error came from the "onEnd" callback registered here:', O = mr(new Error(f), T, "onEnd");
            Y.push({ name: g5, callback: A, note: O });
          }, onResolve(A, f) {
            let O = 'This error came from the "onResolve" callback registered here:', z = mr(new Error(O), T, "onResolve"), P = {}, H = S(A, P, "filter", Dt), it = S(A, P, "namespace", F);
            if (kt(A, P, `in onResolve() call for plugin ${K(g5)}`), H == null)
              throw new Error("onResolve() call is missing a filter");
            let G = J++;
            Z[G] = { name: g5, callback: f, note: z }, R3.onResolve.push({ id: G, filter: H.source, namespace: it || "" });
          }, onLoad(A, f) {
            let O = 'This error came from the "onLoad" callback registered here:', z = mr(new Error(O), T, "onLoad"), P = {}, H = S(A, P, "filter", Dt), it = S(A, P, "namespace", F);
            if (kt(A, P, `in onLoad() call for plugin ${K(g5)}`), H == null)
              throw new Error("onLoad() call is missing a filter");
            let G = J++;
            rt[G] = { name: g5, callback: f, note: z }, R3.onLoad.push({ id: G, filter: H.source, namespace: it || "" });
          }, esbuild: T.esbuild });
          L && (yield L), q3.push(R3);
        } catch (I) {
          return { ok: false, error: I, pluginName: g5 };
        }
      }
      $5["on-start"] = (D, E) => l3(void 0, null, function* () {
        let g5 = { errors: [], warnings: [] };
        yield Promise.all(V.map((I) => l3(void 0, [I], function* ({ name: R3, callback: C, note: L }) {
          try {
            let A = yield C();
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onStart() callback in plugin ${K(R3)} to return an object`);
              let f = {}, O = S(A, f, "errors", It), z = S(A, f, "warnings", It);
              kt(A, f, `from onStart() callback in plugin ${K(R3)}`), O != null && g5.errors.push(...we(O, "errors", x, R3)), z != null && g5.warnings.push(...we(z, "warnings", x, R3));
            }
          } catch (A) {
            g5.errors.push(je(A, T, x, L && L(), R3));
          }
        }))), m3(D, g5);
      }), $5["on-resolve"] = (D, E) => l3(void 0, null, function* () {
        let g5 = {}, I = "", R3, C;
        for (let L of E.ids)
          try {
            ({ name: I, callback: R3, note: C } = Z[L]);
            let A = yield R3({ path: E.path, importer: E.importer, namespace: E.namespace, resolveDir: E.resolveDir, kind: E.kind, pluginData: x.load(E.pluginData) });
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onResolve() callback in plugin ${K(I)} to return an object`);
              let f = {}, O = S(A, f, "pluginName", F), z = S(A, f, "path", F), P = S(A, f, "namespace", F), H = S(A, f, "suffix", F), it = S(A, f, "external", W), G = S(A, f, "sideEffects", W), et = S(A, f, "pluginData", N), jt = S(A, f, "errors", It), Rt = S(A, f, "warnings", It), bt = S(A, f, "watchFiles", It), ut = S(A, f, "watchDirs", It);
              kt(A, f, `from onResolve() callback in plugin ${K(I)}`), g5.id = L, O != null && (g5.pluginName = O), z != null && (g5.path = z), P != null && (g5.namespace = P), H != null && (g5.suffix = H), it != null && (g5.external = it), G != null && (g5.sideEffects = G), et != null && (g5.pluginData = x.store(et)), jt != null && (g5.errors = we(jt, "errors", x, I)), Rt != null && (g5.warnings = we(Rt, "warnings", x, I)), bt != null && (g5.watchFiles = gr(bt, "watchFiles")), ut != null && (g5.watchDirs = gr(ut, "watchDirs"));
              break;
            }
          } catch (A) {
            g5 = { id: L, errors: [je(A, T, x, C && C(), I)] };
            break;
          }
        m3(D, g5);
      }), $5["on-load"] = (D, E) => l3(void 0, null, function* () {
        let g5 = {}, I = "", R3, C;
        for (let L of E.ids)
          try {
            ({ name: I, callback: R3, note: C } = rt[L]);
            let A = yield R3({ path: E.path, namespace: E.namespace, suffix: E.suffix, pluginData: x.load(E.pluginData) });
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onLoad() callback in plugin ${K(I)} to return an object`);
              let f = {}, O = S(A, f, "pluginName", F), z = S(A, f, "contents", Fn), P = S(A, f, "resolveDir", F), H = S(A, f, "pluginData", N), it = S(A, f, "loader", F), G = S(A, f, "errors", It), et = S(A, f, "warnings", It), jt = S(A, f, "watchFiles", It), Rt = S(A, f, "watchDirs", It);
              kt(A, f, `from onLoad() callback in plugin ${K(I)}`), g5.id = L, O != null && (g5.pluginName = O), z instanceof Uint8Array ? g5.contents = z : z != null && (g5.contents = v(z)), P != null && (g5.resolveDir = P), H != null && (g5.pluginData = x.store(H)), it != null && (g5.loader = it), G != null && (g5.errors = we(G, "errors", x, I)), et != null && (g5.warnings = we(et, "warnings", x, I)), jt != null && (g5.watchFiles = gr(jt, "watchFiles")), Rt != null && (g5.watchDirs = gr(Rt, "watchDirs"));
              break;
            }
          } catch (A) {
            g5 = { id: L, errors: [je(A, T, x, C && C(), I)] };
            break;
          }
        m3(D, g5);
      });
      let at = p((D, E, g5) => g5(), "runOnEndCallbacks");
      return Y.length > 0 && (at = p((D, E, g5) => {
        (() => l3(void 0, null, function* () {
          for (let { name: I, callback: R3, note: C } of Y)
            try {
              yield R3(D);
            } catch (L) {
              D.errors.push(yield new Promise((A) => E(L, I, C && C(), A)));
            }
        }))().then(g5);
      }, "runOnEndCallbacks")), nt = true, { ok: true, requestPlugins: q3, runOnEndCallbacks: at };
    }), "handlePlugins");
    function Bn() {
      let h3 = /* @__PURE__ */ new Map(), d = 0;
      return { load(m3) {
        return h3.get(m3);
      }, store(m3) {
        if (m3 === void 0)
          return -1;
        let M = d++;
        return h3.set(M, m3), M;
      } };
    }
    p(Bn, "createObjectStash");
    function mr(h3, d, m3) {
      let M, T = false;
      return () => {
        if (T)
          return M;
        T = true;
        try {
          let $5 = (h3.stack + "").split(`
`);
          $5.splice(1, 1);
          let j3 = Wn(d, $5, m3);
          if (j3)
            return M = { text: h3.message, location: j3 }, M;
        } catch {
        }
      };
    }
    p(mr, "extractCallerV8");
    function je(h3, d, m3, M, T) {
      let $5 = "Internal error", j3 = null;
      try {
        $5 = (h3 && h3.message || h3) + "";
      } catch {
      }
      try {
        j3 = Wn(d, (h3.stack + "").split(`
`), "");
      } catch {
      }
      return { id: "", pluginName: T, text: $5, location: j3, notes: M ? [M] : [], detail: m3 ? m3.store(h3) : -1 };
    }
    p(je, "extractErrorMessageV8");
    function Wn(h3, d, m3) {
      let M = "    at ";
      if (h3.readFileSync && !d[0].startsWith(M) && d[1].startsWith(M))
        for (let T = 1; T < d.length; T++) {
          let $5 = d[T];
          if ($5.startsWith(M))
            for ($5 = $5.slice(M.length); ; ) {
              let j3 = /^(?:new |async )?\S+ \((.*)\)$/.exec($5);
              if (j3) {
                $5 = j3[1];
                continue;
              }
              if (j3 = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec($5), j3) {
                $5 = j3[1];
                continue;
              }
              if (j3 = /^(\S+):(\d+):(\d+)$/.exec($5), j3) {
                let U3;
                try {
                  U3 = h3.readFileSync(j3[1], "utf8");
                } catch {
                  break;
                }
                let x = U3.split(/\r\n|\r|\n|\u2028|\u2029/)[+j3[2] - 1] || "", V = +j3[3] - 1, Y = x.slice(V, V + m3.length) === m3 ? m3.length : 0;
                return { file: j3[1], namespace: "file", line: +j3[2], column: v(x.slice(0, V)).length, length: v(x.slice(V, V + Y)).length, lineText: x + `
` + d.slice(1).join(`
`), suggestion: "" };
              }
              break;
            }
        }
      return null;
    }
    p(Wn, "parseStackLinesV8");
    function Me(h3, d, m3) {
      let M = 5, T = d.length < 1 ? "" : ` with ${d.length} error${d.length < 2 ? "" : "s"}:` + d.slice(0, M + 1).map((j3, U3) => {
        if (U3 === M)
          return `
...`;
        if (!j3.location)
          return `
error: ${j3.text}`;
        let { file: x, line: V, column: Y } = j3.location, Z = j3.pluginName ? `[plugin: ${j3.pluginName}] ` : "";
        return `
${x}:${V}:${Y}: ERROR: ${Z}${j3.text}`;
      }).join(""), $5 = new Error(`${h3}${T}`);
      return $5.errors = d, $5.warnings = m3, $5;
    }
    p(Me, "failureErrorWithLog");
    function pe(h3, d) {
      for (let m3 of h3)
        m3.detail = d.load(m3.detail);
      return h3;
    }
    p(pe, "replaceDetailsInMessages");
    function Vn(h3, d) {
      if (h3 == null)
        return null;
      let m3 = {}, M = S(h3, m3, "file", F), T = S(h3, m3, "namespace", F), $5 = S(h3, m3, "line", Ct), j3 = S(h3, m3, "column", Ct), U3 = S(h3, m3, "length", Ct), x = S(h3, m3, "lineText", F), V = S(h3, m3, "suggestion", F);
      return kt(h3, m3, d), { file: M || "", namespace: T || "", line: $5 || 0, column: j3 || 0, length: U3 || 0, lineText: x || "", suggestion: V || "" };
    }
    p(Vn, "sanitizeLocation");
    function we(h3, d, m3, M) {
      let T = [], $5 = 0;
      for (let j3 of h3) {
        let U3 = {}, x = S(j3, U3, "id", F), V = S(j3, U3, "pluginName", F), Y = S(j3, U3, "text", F), Z = S(j3, U3, "location", Un), rt = S(j3, U3, "notes", It), J = S(j3, U3, "detail", N), tt = `in element ${$5} of "${d}"`;
        kt(j3, U3, tt);
        let q3 = [];
        if (rt)
          for (let nt of rt) {
            let at = {}, D = S(nt, at, "text", F), E = S(nt, at, "location", Un);
            kt(nt, at, tt), q3.push({ text: D || "", location: Vn(E, tt) });
          }
        T.push({ id: x || "", pluginName: V || M, text: Y || "", location: Vn(Z, tt), notes: q3, detail: m3 ? m3.store(J) : -1 }), $5++;
      }
      return T;
    }
    p(we, "sanitizeMessages");
    function gr(h3, d) {
      let m3 = [];
      for (let M of h3) {
        if (typeof M != "string")
          throw new Error(`${K(d)} must be an array of strings`);
        m3.push(M);
      }
      return m3;
    }
    p(gr, "sanitizeStringArray");
    function Bs({ path: h3, contents: d }) {
      let m3 = null;
      return { path: h3, contents: d, get text() {
        let M = this.contents;
        return (m3 === null || M !== d) && (d = M, m3 = y(M)), m3;
      } };
    }
    p(Bs, "convertOutputFiles");
    var Ws = "0.16.13", Vs = p((h3) => vr().build(h3), "build"), Js = p(() => {
      throw new Error('The "serve" API only works in node');
    }, "serve"), Hs = p((h3, d) => vr().transform(h3, d), "transform"), Ks = p((h3, d) => vr().formatMessages(h3, d), "formatMessages"), Ys = p((h3, d) => vr().analyzeMetafile(h3, d), "analyzeMetafile"), Gs = p(() => {
      throw new Error('The "buildSync" API only works in node');
    }, "buildSync"), Qs = p(() => {
      throw new Error('The "transformSync" API only works in node');
    }, "transformSync"), Xs = p(() => {
      throw new Error('The "formatMessagesSync" API only works in node');
    }, "formatMessagesSync"), Zs = p(() => {
      throw new Error('The "analyzeMetafileSync" API only works in node');
    }, "analyzeMetafileSync"), xe, Lr, vr = p(() => {
      if (Lr)
        return Lr;
      throw xe ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, "ensureServiceIsRunning"), to = p((h3) => {
      h3 = Ds(h3 || {});
      let d = h3.wasmURL, m3 = h3.wasmModule, M = h3.worker !== false;
      if (!d && !m3)
        throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
      if (xe)
        throw new Error('Cannot call "initialize" more than once');
      return xe = eo(d || "", m3, M), xe.catch(() => {
        xe = void 0;
      }), xe;
    }, "initialize"), eo = p((h3, d, m3) => l3(void 0, null, function* () {
      let M;
      if (m3) {
        let V = new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.16.13"}\`];
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
        M = new Worker(URL.createObjectURL(V));
      } else {
        let V = ((Y) => {
          var Z = p((q3, nt, at) => new Promise((D, E) => {
            var g5 = p((C) => {
              try {
                R3(at.next(C));
              } catch (L) {
                E(L);
              }
            }, "fulfilled"), I = p((C) => {
              try {
                R3(at.throw(C));
              } catch (L) {
                E(L);
              }
            }, "rejected"), R3 = p((C) => C.done ? D(C.value) : Promise.resolve(C.value).then(g5, I), "step");
            R3((at = at.apply(q3, nt)).next());
          }), "__async");
          let rt, J = {};
          for (let q3 = self; q3; q3 = Object.getPrototypeOf(q3))
            for (let nt of Object.getOwnPropertyNames(q3))
              nt in J || Object.defineProperty(J, nt, { get: () => self[nt] });
          (() => {
            let q3 = p(() => {
              let D = new Error("not implemented");
              return D.code = "ENOSYS", D;
            }, "enosys");
            if (!J.fs) {
              let D = "";
              J.fs = { constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, writeSync(E, g5) {
                D += at.decode(g5);
                let I = D.lastIndexOf(`
`);
                return I != -1 && (console.log(D.substr(0, I)), D = D.substr(I + 1)), g5.length;
              }, write(E, g5, I, R3, C, L) {
                if (I !== 0 || R3 !== g5.length || C !== null) {
                  L(q3());
                  return;
                }
                let A = this.writeSync(E, g5);
                L(null, A);
              }, chmod(E, g5, I) {
                I(q3());
              }, chown(E, g5, I, R3) {
                R3(q3());
              }, close(E, g5) {
                g5(q3());
              }, fchmod(E, g5, I) {
                I(q3());
              }, fchown(E, g5, I, R3) {
                R3(q3());
              }, fstat(E, g5) {
                g5(q3());
              }, fsync(E, g5) {
                g5(null);
              }, ftruncate(E, g5, I) {
                I(q3());
              }, lchown(E, g5, I, R3) {
                R3(q3());
              }, link(E, g5, I) {
                I(q3());
              }, lstat(E, g5) {
                g5(q3());
              }, mkdir(E, g5, I) {
                I(q3());
              }, open(E, g5, I, R3) {
                R3(q3());
              }, read(E, g5, I, R3, C, L) {
                L(q3());
              }, readdir(E, g5) {
                g5(q3());
              }, readlink(E, g5) {
                g5(q3());
              }, rename(E, g5, I) {
                I(q3());
              }, rmdir(E, g5) {
                g5(q3());
              }, stat(E, g5) {
                g5(q3());
              }, symlink(E, g5, I) {
                I(q3());
              }, truncate(E, g5, I) {
                I(q3());
              }, unlink(E, g5) {
                g5(q3());
              }, utimes(E, g5, I, R3) {
                R3(q3());
              } };
            }
            if (J.process || (J.process = { getuid() {
              return -1;
            }, getgid() {
              return -1;
            }, geteuid() {
              return -1;
            }, getegid() {
              return -1;
            }, getgroups() {
              throw q3();
            }, pid: -1, ppid: -1, umask() {
              throw q3();
            }, cwd() {
              throw q3();
            }, chdir() {
              throw q3();
            } }), !J.crypto)
              throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
            if (!J.performance)
              throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
            if (!J.TextEncoder)
              throw new Error("globalThis.TextEncoder is not available, polyfill required");
            if (!J.TextDecoder)
              throw new Error("globalThis.TextDecoder is not available, polyfill required");
            let nt = new TextEncoder("utf-8"), at = new TextDecoder("utf-8");
            J.Go = class {
              constructor() {
                this.argv = ["js"], this.env = {}, this.exit = (f) => {
                  f !== 0 && console.warn("exit code:", f);
                }, this._exitPromise = new Promise((f) => {
                  this._resolveExitPromise = f;
                }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
                let D = p((f, O) => {
                  this.mem.setUint32(f + 0, O, true), this.mem.setUint32(f + 4, Math.floor(O / 4294967296), true);
                }, "setInt64"), E = p((f) => {
                  let O = this.mem.getUint32(f + 0, true), z = this.mem.getInt32(f + 4, true);
                  return O + z * 4294967296;
                }, "getInt64"), g5 = p((f) => {
                  let O = this.mem.getFloat64(f, true);
                  if (O === 0)
                    return;
                  if (!isNaN(O))
                    return O;
                  let z = this.mem.getUint32(f, true);
                  return this._values[z];
                }, "loadValue"), I = p((f, O) => {
                  if (typeof O == "number" && O !== 0) {
                    if (isNaN(O)) {
                      this.mem.setUint32(f + 4, 2146959360, true), this.mem.setUint32(f, 0, true);
                      return;
                    }
                    this.mem.setFloat64(f, O, true);
                    return;
                  }
                  if (O === void 0) {
                    this.mem.setFloat64(f, 0, true);
                    return;
                  }
                  let P = this._ids.get(O);
                  P === void 0 && (P = this._idPool.pop(), P === void 0 && (P = this._values.length), this._values[P] = O, this._goRefCounts[P] = 0, this._ids.set(O, P)), this._goRefCounts[P]++;
                  let H = 0;
                  switch (typeof O) {
                    case "object":
                      O !== null && (H = 1);
                      break;
                    case "string":
                      H = 2;
                      break;
                    case "symbol":
                      H = 3;
                      break;
                    case "function":
                      H = 4;
                      break;
                  }
                  this.mem.setUint32(f + 4, 2146959360 | H, true), this.mem.setUint32(f, P, true);
                }, "storeValue"), R3 = p((f) => {
                  let O = E(f + 0), z = E(f + 8);
                  return new Uint8Array(this._inst.exports.mem.buffer, O, z);
                }, "loadSlice"), C = p((f) => {
                  let O = E(f + 0), z = E(f + 8), P = new Array(z);
                  for (let H = 0; H < z; H++)
                    P[H] = g5(O + H * 8);
                  return P;
                }, "loadSliceOfValues"), L = p((f) => {
                  let O = E(f + 0), z = E(f + 8);
                  return at.decode(new DataView(this._inst.exports.mem.buffer, O, z));
                }, "loadString"), A = Date.now() - performance.now();
                this.importObject = { go: { "runtime.wasmExit": (f) => {
                  f >>>= 0;
                  let O = this.mem.getInt32(f + 8, true);
                  this.exited = true, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(O);
                }, "runtime.wasmWrite": (f) => {
                  f >>>= 0;
                  let O = E(f + 8), z = E(f + 16), P = this.mem.getInt32(f + 24, true);
                  J.fs.writeSync(O, new Uint8Array(this._inst.exports.mem.buffer, z, P));
                }, "runtime.resetMemoryDataView": (f) => {
                  f >>>= 0, this.mem = new DataView(this._inst.exports.mem.buffer);
                }, "runtime.nanotime1": (f) => {
                  f >>>= 0, D(f + 8, (A + performance.now()) * 1e6);
                }, "runtime.walltime": (f) => {
                  f >>>= 0;
                  let O = new Date().getTime();
                  D(f + 8, O / 1e3), this.mem.setInt32(f + 16, O % 1e3 * 1e6, true);
                }, "runtime.scheduleTimeoutEvent": (f) => {
                  f >>>= 0;
                  let O = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(O, setTimeout(() => {
                    for (this._resume(); this._scheduledTimeouts.has(O); )
                      console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
                  }, E(f + 8) + 1)), this.mem.setInt32(f + 16, O, true);
                }, "runtime.clearTimeoutEvent": (f) => {
                  f >>>= 0;
                  let O = this.mem.getInt32(f + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(O)), this._scheduledTimeouts.delete(O);
                }, "runtime.getRandomData": (f) => {
                  f >>>= 0, crypto.getRandomValues(R3(f + 8));
                }, "syscall/js.finalizeRef": (f) => {
                  f >>>= 0;
                  let O = this.mem.getUint32(f + 8, true);
                  if (this._goRefCounts[O]--, this._goRefCounts[O] === 0) {
                    let z = this._values[O];
                    this._values[O] = null, this._ids.delete(z), this._idPool.push(O);
                  }
                }, "syscall/js.stringVal": (f) => {
                  f >>>= 0, I(f + 24, L(f + 8));
                }, "syscall/js.valueGet": (f) => {
                  f >>>= 0;
                  let O = Reflect.get(g5(f + 8), L(f + 16));
                  f = this._inst.exports.getsp() >>> 0, I(f + 32, O);
                }, "syscall/js.valueSet": (f) => {
                  f >>>= 0, Reflect.set(g5(f + 8), L(f + 16), g5(f + 32));
                }, "syscall/js.valueDelete": (f) => {
                  f >>>= 0, Reflect.deleteProperty(g5(f + 8), L(f + 16));
                }, "syscall/js.valueIndex": (f) => {
                  f >>>= 0, I(f + 24, Reflect.get(g5(f + 8), E(f + 16)));
                }, "syscall/js.valueSetIndex": (f) => {
                  f >>>= 0, Reflect.set(g5(f + 8), E(f + 16), g5(f + 24));
                }, "syscall/js.valueCall": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = Reflect.get(O, L(f + 16)), P = C(f + 32), H = Reflect.apply(z, O, P);
                    f = this._inst.exports.getsp() >>> 0, I(f + 56, H), this.mem.setUint8(f + 64, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 56, O), this.mem.setUint8(f + 64, 0);
                  }
                }, "syscall/js.valueInvoke": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = C(f + 16), P = Reflect.apply(O, void 0, z);
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, P), this.mem.setUint8(f + 48, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, O), this.mem.setUint8(f + 48, 0);
                  }
                }, "syscall/js.valueNew": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = C(f + 16), P = Reflect.construct(O, z);
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, P), this.mem.setUint8(f + 48, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, O), this.mem.setUint8(f + 48, 0);
                  }
                }, "syscall/js.valueLength": (f) => {
                  f >>>= 0, D(f + 16, parseInt(g5(f + 8).length));
                }, "syscall/js.valuePrepareString": (f) => {
                  f >>>= 0;
                  let O = nt.encode(String(g5(f + 8)));
                  I(f + 16, O), D(f + 24, O.length);
                }, "syscall/js.valueLoadString": (f) => {
                  f >>>= 0;
                  let O = g5(f + 8);
                  R3(f + 16).set(O);
                }, "syscall/js.valueInstanceOf": (f) => {
                  f >>>= 0, this.mem.setUint8(f + 24, g5(f + 8) instanceof g5(f + 16) ? 1 : 0);
                }, "syscall/js.copyBytesToGo": (f) => {
                  f >>>= 0;
                  let O = R3(f + 8), z = g5(f + 32);
                  if (!(z instanceof Uint8Array || z instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(f + 48, 0);
                    return;
                  }
                  let P = z.subarray(0, O.length);
                  O.set(P), D(f + 40, P.length), this.mem.setUint8(f + 48, 1);
                }, "syscall/js.copyBytesToJS": (f) => {
                  f >>>= 0;
                  let O = g5(f + 8), z = R3(f + 16);
                  if (!(O instanceof Uint8Array || O instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(f + 48, 0);
                    return;
                  }
                  let P = z.subarray(0, O.length);
                  O.set(P), D(f + 40, P.length), this.mem.setUint8(f + 48, 1);
                }, debug: (f) => {
                  console.log(f);
                } } };
              }
              run(D) {
                return Z(this, null, function* () {
                  if (!(D instanceof WebAssembly.Instance))
                    throw new Error("Go.run: WebAssembly.Instance expected");
                  this._inst = D, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [NaN, 0, null, true, false, J, this], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([[0, 1], [null, 2], [true, 3], [false, 4], [J, 5], [this, 6]]), this._idPool = [], this.exited = false;
                  let E = 4096, g5 = p((f) => {
                    let O = E, z = nt.encode(f + "\0");
                    return new Uint8Array(this.mem.buffer, E, z.length).set(z), E += z.length, E % 8 !== 0 && (E += 8 - E % 8), O;
                  }, "strPtr"), I = this.argv.length, R3 = [];
                  this.argv.forEach((f) => {
                    R3.push(g5(f));
                  }), R3.push(0), Object.keys(this.env).sort().forEach((f) => {
                    R3.push(g5(`${f}=${this.env[f]}`));
                  }), R3.push(0);
                  let L = E;
                  R3.forEach((f) => {
                    this.mem.setUint32(E, f, true), this.mem.setUint32(E + 4, 0, true), E += 8;
                  });
                  let A = 4096 + 8192;
                  if (E >= A)
                    throw new Error("total length of command line and environment variables exceeds limit");
                  this._inst.exports.run(I, L), this.exited && this._resolveExitPromise(), yield this._exitPromise;
                });
              }
              _resume() {
                if (this.exited)
                  throw new Error("Go program has already exited");
                this._inst.exports.resume(), this.exited && this._resolveExitPromise();
              }
              _makeFuncWrapper(D) {
                let E = this;
                return function() {
                  let g5 = { id: D, this: this, args: arguments };
                  return E._pendingEvent = g5, E._resume(), g5.result;
                };
              }
            };
          })(), rt = p(({ data: q3 }) => {
            let nt = new TextDecoder(), at = J.fs, D = "";
            at.writeSync = (C, L) => {
              if (C === 1)
                Y(L);
              else if (C === 2) {
                D += nt.decode(L);
                let A = D.split(`
`);
                A.length > 1 && console.log(A.slice(0, -1).join(`
`)), D = A[A.length - 1];
              } else
                throw new Error("Bad write");
              return L.length;
            };
            let E = [], g5, I = 0;
            rt = p(({ data: C }) => {
              C.length > 0 && (E.push(C), g5 && g5());
            }, "onmessage"), at.read = (C, L, A, f, O, z) => {
              if (C !== 0 || A !== 0 || f !== L.length || O !== null)
                throw new Error("Bad read");
              if (E.length === 0) {
                g5 = p(() => at.read(C, L, A, f, O, z), "resumeStdin");
                return;
              }
              let P = E[0], H = Math.max(0, Math.min(f, P.length - I));
              L.set(P.subarray(I, I + H), A), I += H, I === P.length && (E.shift(), I = 0), z(null, H);
            };
            let R3 = new J.Go();
            R3.argv = ["", "--service=0.16.13"], tt(q3, R3).then((C) => {
              Y(null), R3.run(C);
            }, (C) => {
              Y(C);
            });
          }, "onmessage");
          function tt(q3, nt) {
            return Z(this, null, function* () {
              if (q3 instanceof WebAssembly.Module)
                return WebAssembly.instantiate(q3, nt.importObject);
              let at = yield fetch(q3);
              if (!at.ok)
                throw new Error(`Failed to download ${JSON.stringify(q3)}`);
              if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(at.headers.get("Content-Type") || ""))
                return (yield WebAssembly.instantiateStreaming(at, nt.importObject)).instance;
              let D = yield at.arrayBuffer();
              return (yield WebAssembly.instantiate(D, nt.importObject)).instance;
            });
          }
          return p(tt, "tryToInstantiateModule"), (q3) => rt(q3);
        })((Y) => M.onmessage({ data: Y }));
        M = { onmessage: null, postMessage: (Y) => setTimeout(() => V({ data: Y })), terminate() {
        } };
      }
      let T, $5, j3 = new Promise((V, Y) => {
        T = V, $5 = Y;
      });
      M.onmessage = ({ data: V }) => {
        M.onmessage = ({ data: Y }) => U3(Y), V ? $5(V) : T();
      }, M.postMessage(d || new URL(h3, location.href).toString());
      let { readFromStdout: U3, service: x } = Ns({ writeToStdin(V) {
        M.postMessage(V);
      }, isSync: false, isWriteUnavailable: true, esbuild: c });
      yield j3, Lr = { build: (V) => new Promise((Y, Z) => x.buildOrServe({ callName: "build", refs: null, serveOptions: null, options: V, isTTY: false, defaultWD: "/", callback: (rt, J) => rt ? Z(rt) : Y(J) })), transform: (V, Y) => new Promise((Z, rt) => x.transform({ callName: "transform", refs: null, input: V, options: Y || {}, isTTY: false, fs: { readFile(J, tt) {
        tt(new Error("Internal error"), null);
      }, writeFile(J, tt) {
        tt(null);
      } }, callback: (J, tt) => J ? rt(J) : Z(tt) })), formatMessages: (V, Y) => new Promise((Z, rt) => x.formatMessages({ callName: "formatMessages", refs: null, messages: V, options: Y, callback: (J, tt) => J ? rt(J) : Z(tt) })), analyzeMetafile: (V, Y) => new Promise((Z, rt) => x.analyzeMetafile({ callName: "analyzeMetafile", refs: null, metafile: typeof V == "string" ? V : JSON.stringify(V), options: Y, callback: (J, tt) => J ? rt(J) : Z(tt) })) };
    }), "startRunningService"), ro = c;
  })(typeof Cn == "object" ? Cn : { set exports(t4) {
    (typeof self < "u" ? self : this).esbuild = t4;
  } });
});
o();
o();
var ma = new Error("timeout while waiting for mutex to become available");
var ga = new Error("mutex already locked");
var no = new Error("request for lock canceled");
var io = function(t4, e3, r3, n) {
  function s(o5) {
    return o5 instanceof r3 ? o5 : new r3(function(a) {
      a(o5);
    });
  }
  return p(s, "adopt"), new (r3 || (r3 = Promise))(function(o5, a) {
    function u(_) {
      try {
        c(n.next(_));
      } catch (p3) {
        a(p3);
      }
    }
    p(u, "fulfilled");
    function l3(_) {
      try {
        c(n.throw(_));
      } catch (p3) {
        a(p3);
      }
    }
    p(l3, "rejected");
    function c(_) {
      _.done ? o5(_.value) : s(_.value).then(u, l3);
    }
    p(c, "step"), c((n = n.apply(t4, e3 || [])).next());
  });
};
var yr = class {
  constructor(e3, r3 = no) {
    this._value = e3, this._cancelError = r3, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    return new Promise((r3, n) => {
      this._weightedQueues[e3 - 1] || (this._weightedQueues[e3 - 1] = []), this._weightedQueues[e3 - 1].push({ resolve: r3, reject: n }), this._dispatch();
    });
  }
  runExclusive(e3, r3 = 1) {
    return io(this, void 0, void 0, function* () {
      let [n, s] = yield this.acquire(r3);
      try {
        return yield e3(n);
      } finally {
        s();
      }
    });
  }
  waitForUnlock(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    return new Promise((r3) => {
      this._weightedWaiters[e3 - 1] || (this._weightedWaiters[e3 - 1] = []), this._weightedWaiters[e3 - 1].push(r3), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(e3) {
    this._value = e3, this._dispatch();
  }
  release(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    this._value += e3, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((e3) => e3.forEach((r3) => r3.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var e3;
    for (let r3 = this._value; r3 > 0; r3--) {
      let n = (e3 = this._weightedQueues[r3 - 1]) === null || e3 === void 0 ? void 0 : e3.shift();
      if (!n)
        continue;
      let s = this._value, o5 = r3;
      this._value -= r3, r3 = this._value + 1, n.resolve([s, this._newReleaser(o5)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(e3) {
    let r3 = false;
    return () => {
      r3 || (r3 = true, this.release(e3));
    };
  }
  _drainUnlockWaiters() {
    for (let e3 = this._value; e3 > 0; e3--)
      this._weightedWaiters[e3 - 1] && (this._weightedWaiters[e3 - 1].forEach((r3) => r3()), this._weightedWaiters[e3 - 1] = []);
  }
};
p(yr, "Semaphore");
var so = function(t4, e3, r3, n) {
  function s(o5) {
    return o5 instanceof r3 ? o5 : new r3(function(a) {
      a(o5);
    });
  }
  return p(s, "adopt"), new (r3 || (r3 = Promise))(function(o5, a) {
    function u(_) {
      try {
        c(n.next(_));
      } catch (p3) {
        a(p3);
      }
    }
    p(u, "fulfilled");
    function l3(_) {
      try {
        c(n.throw(_));
      } catch (p3) {
        a(p3);
      }
    }
    p(l3, "rejected");
    function c(_) {
      _.done ? o5(_.value) : s(_.value).then(u, l3);
    }
    p(c, "step"), c((n = n.apply(t4, e3 || [])).next());
  });
};
var Ke = class {
  constructor(e3) {
    this._semaphore = new yr(1, e3);
  }
  acquire() {
    return so(this, void 0, void 0, function* () {
      let [, e3] = yield this._semaphore.acquire();
      return e3;
    });
  }
  runExclusive(e3) {
    return this._semaphore.runExclusive(() => e3());
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
p(Ke, "Mutex");
o();
var or = "delete";
var _t = 5;
var Jt = 1 << _t;
var zt = Jt - 1;
var ot = {};
function Kr() {
  return { value: false };
}
p(Kr, "MakeRef");
function Ht(t4) {
  t4 && (t4.value = true);
}
p(Ht, "SetRef");
function nn() {
}
p(nn, "OwnerID");
function Re(t4) {
  return t4.size === void 0 && (t4.size = t4.__iterate(Oi)), t4.size;
}
p(Re, "ensureSize");
function me(t4, e3) {
  if (typeof e3 != "number") {
    var r3 = e3 >>> 0;
    if ("" + r3 !== e3 || r3 === 4294967295)
      return NaN;
    e3 = r3;
  }
  return e3 < 0 ? Re(t4) + e3 : e3;
}
p(me, "wrapIndex");
function Oi() {
  return true;
}
p(Oi, "returnTrue");
function Mr(t4, e3, r3) {
  return (t4 === 0 && !ki(t4) || r3 !== void 0 && t4 <= -r3) && (e3 === void 0 || r3 !== void 0 && e3 >= r3);
}
p(Mr, "wholeSlice");
function ar(t4, e3) {
  return Ii(t4, e3, 0);
}
p(ar, "resolveBegin");
function xr(t4, e3) {
  return Ii(t4, e3, e3);
}
p(xr, "resolveEnd");
function Ii(t4, e3, r3) {
  return t4 === void 0 ? r3 : ki(t4) ? e3 === 1 / 0 ? e3 : Math.max(0, e3 + t4) | 0 : e3 === void 0 || e3 === t4 ? t4 : Math.min(e3, t4) | 0;
}
p(Ii, "resolveIndex");
function ki(t4) {
  return t4 < 0 || t4 === 0 && 1 / t4 === -1 / 0;
}
p(ki, "isNeg");
var ji = "@@__IMMUTABLE_ITERABLE__@@";
function Nt(t4) {
  return Boolean(t4 && t4[ji]);
}
p(Nt, "isCollection");
var Mi = "@@__IMMUTABLE_KEYED__@@";
function vt(t4) {
  return Boolean(t4 && t4[Mi]);
}
p(vt, "isKeyed");
var xi = "@@__IMMUTABLE_INDEXED__@@";
function Ut(t4) {
  return Boolean(t4 && t4[xi]);
}
p(Ut, "isIndexed");
function Ar(t4) {
  return vt(t4) || Ut(t4);
}
p(Ar, "isAssociative");
var Et = p(function(e3) {
  return Nt(e3) ? e3 : Wt(e3);
}, "Collection");
var Gt = function(t4) {
  function e3(r3) {
    return vt(r3) ? r3 : ve(r3);
  }
  return p(e3, "KeyedCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et);
var Oe = function(t4) {
  function e3(r3) {
    return Ut(r3) ? r3 : ie(r3);
  }
  return p(e3, "IndexedCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et);
var Ue = function(t4) {
  function e3(r3) {
    return Nt(r3) && !Ar(r3) ? r3 : Le(r3);
  }
  return p(e3, "SetCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et);
Et.Keyed = Gt;
Et.Indexed = Oe;
Et.Set = Ue;
var Ai = "@@__IMMUTABLE_SEQ__@@";
function sn(t4) {
  return Boolean(t4 && t4[Ai]);
}
p(sn, "isSeq");
var Ri = "@@__IMMUTABLE_RECORD__@@";
function Ne(t4) {
  return Boolean(t4 && t4[Ri]);
}
p(Ne, "isRecord");
function ue(t4) {
  return Nt(t4) || Ne(t4);
}
p(ue, "isImmutable");
var Fe = "@@__IMMUTABLE_ORDERED__@@";
function re(t4) {
  return Boolean(t4 && t4[Fe]);
}
p(re, "isOrdered");
var ur = 0;
var ne = 1;
var Yt = 2;
var Yr = typeof Symbol == "function" && Symbol.iterator;
var Ti = "@@iterator";
var Rr = Yr || Ti;
var lt = p(function(e3) {
  this.next = e3;
}, "Iterator");
lt.prototype.toString = p(function() {
  return "[Iterator]";
}, "toString");
lt.KEYS = ur;
lt.VALUES = ne;
lt.ENTRIES = Yt;
lt.prototype.inspect = lt.prototype.toSource = function() {
  return this.toString();
};
lt.prototype[Rr] = function() {
  return this;
};
function yt(t4, e3, r3, n) {
  var s = t4 === 0 ? e3 : t4 === 1 ? r3 : [e3, r3];
  return n ? n.value = s : n = { value: s, done: false }, n;
}
p(yt, "iteratorValue");
function Ft() {
  return { value: void 0, done: true };
}
p(Ft, "iteratorDone");
function $i(t4) {
  return Array.isArray(t4) ? true : !!Tr(t4);
}
p($i, "hasIterator");
function Zn(t4) {
  return t4 && typeof t4.next == "function";
}
p(Zn, "isIterator");
function Gr(t4) {
  var e3 = Tr(t4);
  return e3 && e3.call(t4);
}
p(Gr, "getIterator");
function Tr(t4) {
  var e3 = t4 && (Yr && t4[Yr] || t4[Ti]);
  if (typeof e3 == "function")
    return e3;
}
p(Tr, "getIteratorFn");
function oo(t4) {
  var e3 = Tr(t4);
  return e3 && e3 === t4.entries;
}
p(oo, "isEntriesIterable");
function ao(t4) {
  var e3 = Tr(t4);
  return e3 && e3 === t4.keys;
}
p(ao, "isKeysIterable");
var qe = Object.prototype.hasOwnProperty;
function zi(t4) {
  return Array.isArray(t4) || typeof t4 == "string" ? true : t4 && typeof t4 == "object" && Number.isInteger(t4.length) && t4.length >= 0 && (t4.length === 0 ? Object.keys(t4).length === 1 : t4.hasOwnProperty(t4.length - 1));
}
p(zi, "isArrayLike");
var Wt = function(t4) {
  function e3(r3) {
    return r3 == null ? an() : ue(r3) ? r3.toSeq() : lo(r3);
  }
  return p(e3, "Seq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toSeq = p(function() {
    return this;
  }, "toSeq"), e3.prototype.toString = p(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), e3.prototype.cacheResult = p(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this._cache;
    if (o5) {
      for (var a = o5.length, u = 0; u !== a; ) {
        var l3 = o5[s ? a - ++u : u++];
        if (n(l3[1], l3[0], this) === false)
          break;
      }
      return u;
    }
    return this.__iterateUncached(n, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this._cache;
    if (o5) {
      var a = o5.length, u = 0;
      return new lt(function() {
        if (u === a)
          return Ft();
        var l3 = o5[s ? a - ++u : u++];
        return yt(n, l3[0], l3[1]);
      });
    }
    return this.__iteratorUncached(n, s);
  }, "__iterator"), e3;
}(Et);
var ve = function(t4) {
  function e3(r3) {
    return r3 == null ? an().toKeyedSeq() : Nt(r3) ? vt(r3) ? r3.toSeq() : r3.fromEntrySeq() : Ne(r3) ? r3.toSeq() : un(r3);
  }
  return p(e3, "KeyedSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toKeyedSeq = p(function() {
    return this;
  }, "toKeyedSeq"), e3;
}(Wt);
var ie = function(t4) {
  function e3(r3) {
    return r3 == null ? an() : Nt(r3) ? vt(r3) ? r3.entrySeq() : r3.toIndexedSeq() : Ne(r3) ? r3.toSeq().entrySeq() : Pi(r3);
  }
  return p(e3, "IndexedSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return e3(arguments);
  }, "of"), e3.prototype.toIndexedSeq = p(function() {
    return this;
  }, "toIndexedSeq"), e3.prototype.toString = p(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), e3;
}(Wt);
var Le = function(t4) {
  function e3(r3) {
    return (Nt(r3) && !Ar(r3) ? r3 : ie(r3)).toSetSeq();
  }
  return p(e3, "SetSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return e3(arguments);
  }, "of"), e3.prototype.toSetSeq = p(function() {
    return this;
  }, "toSetSeq"), e3;
}(Wt);
Wt.isSeq = sn;
Wt.Keyed = ve;
Wt.Set = Le;
Wt.Indexed = ie;
Wt.prototype[Ai] = true;
var Ee = function(t4) {
  function e3(r3) {
    this._array = r3, this.size = r3.length;
  }
  return p(e3, "ArraySeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p(function(n, s) {
    return this.has(n) ? this._array[me(this, n)] : s;
  }, "get"), e3.prototype.__iterate = p(function(n, s) {
    for (var o5 = this._array, a = o5.length, u = 0; u !== a; ) {
      var l3 = s ? a - ++u : u++;
      if (n(o5[l3], l3, this) === false)
        break;
    }
    return u;
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this._array, a = o5.length, u = 0;
    return new lt(function() {
      if (u === a)
        return Ft();
      var l3 = s ? a - ++u : u++;
      return yt(n, l3, o5[l3]);
    });
  }, "__iterator"), e3;
}(ie);
var on = function(t4) {
  function e3(r3) {
    var n = Object.keys(r3).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r3) : []);
    this._object = r3, this._keys = n, this.size = n.length;
  }
  return p(e3, "ObjectSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p(function(n, s) {
    return s !== void 0 && !this.has(n) ? s : this._object[n];
  }, "get"), e3.prototype.has = p(function(n) {
    return qe.call(this._object, n);
  }, "has"), e3.prototype.__iterate = p(function(n, s) {
    for (var o5 = this._object, a = this._keys, u = a.length, l3 = 0; l3 !== u; ) {
      var c = a[s ? u - ++l3 : l3++];
      if (n(o5[c], c, this) === false)
        break;
    }
    return l3;
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this._object, a = this._keys, u = a.length, l3 = 0;
    return new lt(function() {
      if (l3 === u)
        return Ft();
      var c = a[s ? u - ++l3 : l3++];
      return yt(n, c, o5[c]);
    });
  }, "__iterator"), e3;
}(ve);
on.prototype[Fe] = true;
var uo = function(t4) {
  function e3(r3) {
    this._collection = r3, this.size = r3.length || r3.size;
  }
  return p(e3, "CollectionSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.__iterateUncached = p(function(n, s) {
    if (s)
      return this.cacheResult().__iterate(n, s);
    var o5 = this._collection, a = Gr(o5), u = 0;
    if (Zn(a))
      for (var l3; !(l3 = a.next()).done && n(l3.value, u++, this) !== false; )
        ;
    return u;
  }, "__iterateUncached"), e3.prototype.__iteratorUncached = p(function(n, s) {
    if (s)
      return this.cacheResult().__iterator(n, s);
    var o5 = this._collection, a = Gr(o5);
    if (!Zn(a))
      return new lt(Ft);
    var u = 0;
    return new lt(function() {
      var l3 = a.next();
      return l3.done ? l3 : yt(n, u++, l3.value);
    });
  }, "__iteratorUncached"), e3;
}(ie);
var ti;
function an() {
  return ti || (ti = new Ee([]));
}
p(an, "emptySequence");
function un(t4) {
  var e3 = ln(t4);
  if (e3)
    return e3.fromEntrySeq();
  if (typeof t4 == "object")
    return new on(t4);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t4);
}
p(un, "keyedSeqFromValue");
function Pi(t4) {
  var e3 = ln(t4);
  if (e3)
    return e3;
  throw new TypeError("Expected Array or collection object of values: " + t4);
}
p(Pi, "indexedSeqFromValue");
function lo(t4) {
  var e3 = ln(t4);
  if (e3)
    return oo(t4) ? e3.fromEntrySeq() : ao(t4) ? e3.toSetSeq() : e3;
  if (typeof t4 == "object")
    return new on(t4);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t4);
}
p(lo, "seqFromValue");
function ln(t4) {
  return zi(t4) ? new Ee(t4) : $i(t4) ? new uo(t4) : void 0;
}
p(ln, "maybeIndexedSeqFromValue");
var Di = "@@__IMMUTABLE_MAP__@@";
function fn(t4) {
  return Boolean(t4 && t4[Di]);
}
p(fn, "isMap");
function Ci(t4) {
  return fn(t4) && re(t4);
}
p(Ci, "isOrderedMap");
function ei(t4) {
  return Boolean(t4 && typeof t4.equals == "function" && typeof t4.hashCode == "function");
}
p(ei, "isValueObject");
function Bt(t4, e3) {
  if (t4 === e3 || t4 !== t4 && e3 !== e3)
    return true;
  if (!t4 || !e3)
    return false;
  if (typeof t4.valueOf == "function" && typeof e3.valueOf == "function") {
    if (t4 = t4.valueOf(), e3 = e3.valueOf(), t4 === e3 || t4 !== t4 && e3 !== e3)
      return true;
    if (!t4 || !e3)
      return false;
  }
  return !!(ei(t4) && ei(e3) && t4.equals(e3));
}
p(Bt, "is");
var Ye = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : p(function(e3, r3) {
  e3 |= 0, r3 |= 0;
  var n = e3 & 65535, s = r3 & 65535;
  return n * s + ((e3 >>> 16) * s + n * (r3 >>> 16) << 16 >>> 0) | 0;
}, "imul");
function $r(t4) {
  return t4 >>> 1 & 1073741824 | t4 & 3221225471;
}
p($r, "smi");
var fo = Object.prototype.valueOf;
function Lt(t4) {
  if (t4 == null)
    return ri(t4);
  if (typeof t4.hashCode == "function")
    return $r(t4.hashCode(t4));
  var e3 = go(t4);
  if (e3 == null)
    return ri(e3);
  switch (typeof e3) {
    case "boolean":
      return e3 ? 1108378657 : 1108378656;
    case "number":
      return co(e3);
    case "string":
      return e3.length > vo ? ho(e3) : Qr(e3);
    case "object":
    case "function":
      return _o(e3);
    case "symbol":
      return po(e3);
    default:
      if (typeof e3.toString == "function")
        return Qr(e3.toString());
      throw new Error("Value type " + typeof e3 + " cannot be hashed.");
  }
}
p(Lt, "hash");
function ri(t4) {
  return t4 === null ? 1108378658 : 1108378659;
}
p(ri, "hashNullish");
function co(t4) {
  if (t4 !== t4 || t4 === 1 / 0)
    return 0;
  var e3 = t4 | 0;
  for (e3 !== t4 && (e3 ^= t4 * 4294967295); t4 > 4294967295; )
    t4 /= 4294967295, e3 ^= t4;
  return $r(e3);
}
p(co, "hashNumber");
function ho(t4) {
  var e3 = Vr[t4];
  return e3 === void 0 && (e3 = Qr(t4), Wr === yo && (Wr = 0, Vr = {}), Wr++, Vr[t4] = e3), e3;
}
p(ho, "cachedHashString");
function Qr(t4) {
  for (var e3 = 0, r3 = 0; r3 < t4.length; r3++)
    e3 = 31 * e3 + t4.charCodeAt(r3) | 0;
  return $r(e3);
}
p(Qr, "hashString");
function po(t4) {
  var e3 = si[t4];
  return e3 !== void 0 || (e3 = Ui(), si[t4] = e3), e3;
}
p(po, "hashSymbol");
function _o(t4) {
  var e3;
  if (Xr && (e3 = Zr.get(t4), e3 !== void 0) || (e3 = t4[Se], e3 !== void 0) || !ii && (e3 = t4.propertyIsEnumerable && t4.propertyIsEnumerable[Se], e3 !== void 0 || (e3 = mo(t4), e3 !== void 0)))
    return e3;
  if (e3 = Ui(), Xr)
    Zr.set(t4, e3);
  else {
    if (ni !== void 0 && ni(t4) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (ii)
      Object.defineProperty(t4, Se, { enumerable: false, configurable: false, writable: false, value: e3 });
    else if (t4.propertyIsEnumerable !== void 0 && t4.propertyIsEnumerable === t4.constructor.prototype.propertyIsEnumerable)
      t4.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t4.propertyIsEnumerable[Se] = e3;
    else if (t4.nodeType !== void 0)
      t4[Se] = e3;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return e3;
}
p(_o, "hashJSObj");
var ni = Object.isExtensible;
var ii = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function mo(t4) {
  if (t4 && t4.nodeType > 0)
    switch (t4.nodeType) {
      case 1:
        return t4.uniqueID;
      case 9:
        return t4.documentElement && t4.documentElement.uniqueID;
    }
}
p(mo, "getIENodeHash");
function go(t4) {
  return t4.valueOf !== fo && typeof t4.valueOf == "function" ? t4.valueOf(t4) : t4;
}
p(go, "valueOf");
function Ui() {
  var t4 = ++Br;
  return Br & 1073741824 && (Br = 0), t4;
}
p(Ui, "nextHash");
var Xr = typeof WeakMap == "function";
var Zr;
Xr && (Zr = /* @__PURE__ */ new WeakMap());
var si = /* @__PURE__ */ Object.create(null);
var Br = 0;
var Se = "__immutablehash__";
typeof Symbol == "function" && (Se = Symbol(Se));
var vo = 16;
var yo = 255;
var Wr = 0;
var Vr = {};
var zr = function(t4) {
  function e3(r3, n) {
    this._iter = r3, this._useKeys = n, this.size = r3.size;
  }
  return p(e3, "ToKeyedSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p(function(n, s) {
    return this._iter.get(n, s);
  }, "get"), e3.prototype.has = p(function(n) {
    return this._iter.has(n);
  }, "has"), e3.prototype.valueSeq = p(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), e3.prototype.reverse = p(function() {
    var n = this, s = cn(this, true);
    return this._useKeys || (s.valueSeq = function() {
      return n._iter.toSeq().reverse();
    }), s;
  }, "reverse"), e3.prototype.map = p(function(n, s) {
    var o5 = this, a = Bi(this, n, s);
    return this._useKeys || (a.valueSeq = function() {
      return o5._iter.toSeq().map(n, s);
    }), a;
  }, "map"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a, u) {
      return n(a, u, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    return this._iter.__iterator(n, s);
  }, "__iterator"), e3;
}(ve);
zr.prototype[Fe] = true;
var Ni = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p(e3, "ToIndexedSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.includes = p(function(n) {
    return this._iter.includes(n);
  }, "includes"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this, a = 0;
    return s && Re(this), this._iter.__iterate(function(u) {
      return n(u, s ? o5.size - ++a : a++, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this, a = this._iter.__iterator(ne, s), u = 0;
    return s && Re(this), new lt(function() {
      var l3 = a.next();
      return l3.done ? l3 : yt(n, s ? o5.size - ++u : u++, l3.value, l3);
    });
  }, "__iterator"), e3;
}(ie);
var Fi = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p(e3, "ToSetSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.has = p(function(n) {
    return this._iter.includes(n);
  }, "has"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a) {
      return n(a, a, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this._iter.__iterator(ne, s);
    return new lt(function() {
      var a = o5.next();
      return a.done ? a : yt(n, a.value, a.value, a);
    });
  }, "__iterator"), e3;
}(Le);
var qi = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p(e3, "FromEntriesSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.entrySeq = p(function() {
    return this._iter.toSeq();
  }, "entrySeq"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a) {
      if (a) {
        ai(a);
        var u = Nt(a);
        return n(u ? a.get(1) : a[1], u ? a.get(0) : a[0], o5);
      }
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this._iter.__iterator(ne, s);
    return new lt(function() {
      for (; ; ) {
        var a = o5.next();
        if (a.done)
          return a;
        var u = a.value;
        if (u) {
          ai(u);
          var l3 = Nt(u);
          return yt(n, l3 ? u.get(0) : u[0], l3 ? u.get(1) : u[1], a);
        }
      }
    });
  }, "__iterator"), e3;
}(ve);
Ni.prototype.cacheResult = zr.prototype.cacheResult = Fi.prototype.cacheResult = qi.prototype.cacheResult = dn;
function Li(t4) {
  var e3 = le(t4);
  return e3._iter = t4, e3.size = t4.size, e3.flip = function() {
    return t4;
  }, e3.reverse = function() {
    var r3 = t4.reverse.apply(this);
    return r3.flip = function() {
      return t4.reverse();
    }, r3;
  }, e3.has = function(r3) {
    return t4.includes(r3);
  }, e3.includes = function(r3) {
    return t4.has(r3);
  }, e3.cacheResult = dn, e3.__iterateUncached = function(r3, n) {
    var s = this;
    return t4.__iterate(function(o5, a) {
      return r3(a, o5, s) !== false;
    }, n);
  }, e3.__iteratorUncached = function(r3, n) {
    if (r3 === Yt) {
      var s = t4.__iterator(r3, n);
      return new lt(function() {
        var o5 = s.next();
        if (!o5.done) {
          var a = o5.value[0];
          o5.value[0] = o5.value[1], o5.value[1] = a;
        }
        return o5;
      });
    }
    return t4.__iterator(r3 === ne ? ur : ne, n);
  }, e3;
}
p(Li, "flipFactory");
function Bi(t4, e3, r3) {
  var n = le(t4);
  return n.size = t4.size, n.has = function(s) {
    return t4.has(s);
  }, n.get = function(s, o5) {
    var a = t4.get(s, ot);
    return a === ot ? o5 : e3.call(r3, a, s, t4);
  }, n.__iterateUncached = function(s, o5) {
    var a = this;
    return t4.__iterate(function(u, l3, c) {
      return s(e3.call(r3, u, l3, c), l3, a) !== false;
    }, o5);
  }, n.__iteratorUncached = function(s, o5) {
    var a = t4.__iterator(Yt, o5);
    return new lt(function() {
      var u = a.next();
      if (u.done)
        return u;
      var l3 = u.value, c = l3[0];
      return yt(s, c, e3.call(r3, l3[1], c, t4), u);
    });
  }, n;
}
p(Bi, "mapFactory");
function cn(t4, e3) {
  var r3 = this, n = le(t4);
  return n._iter = t4, n.size = t4.size, n.reverse = function() {
    return t4;
  }, t4.flip && (n.flip = function() {
    var s = Li(t4);
    return s.reverse = function() {
      return t4.flip();
    }, s;
  }), n.get = function(s, o5) {
    return t4.get(e3 ? s : -1 - s, o5);
  }, n.has = function(s) {
    return t4.has(e3 ? s : -1 - s);
  }, n.includes = function(s) {
    return t4.includes(s);
  }, n.cacheResult = dn, n.__iterate = function(s, o5) {
    var a = this, u = 0;
    return o5 && Re(t4), t4.__iterate(function(l3, c) {
      return s(l3, e3 ? c : o5 ? a.size - ++u : u++, a);
    }, !o5);
  }, n.__iterator = function(s, o5) {
    var a = 0;
    o5 && Re(t4);
    var u = t4.__iterator(Yt, !o5);
    return new lt(function() {
      var l3 = u.next();
      if (l3.done)
        return l3;
      var c = l3.value;
      return yt(s, e3 ? c[0] : o5 ? r3.size - ++a : a++, c[1], l3);
    });
  }, n;
}
p(cn, "reverseFactory");
function Wi(t4, e3, r3, n) {
  var s = le(t4);
  return n && (s.has = function(o5) {
    var a = t4.get(o5, ot);
    return a !== ot && !!e3.call(r3, a, o5, t4);
  }, s.get = function(o5, a) {
    var u = t4.get(o5, ot);
    return u !== ot && e3.call(r3, u, o5, t4) ? u : a;
  }), s.__iterateUncached = function(o5, a) {
    var u = this, l3 = 0;
    return t4.__iterate(function(c, _, p3) {
      if (e3.call(r3, c, _, p3))
        return l3++, o5(c, n ? _ : l3 - 1, u);
    }, a), l3;
  }, s.__iteratorUncached = function(o5, a) {
    var u = t4.__iterator(Yt, a), l3 = 0;
    return new lt(function() {
      for (; ; ) {
        var c = u.next();
        if (c.done)
          return c;
        var _ = c.value, p3 = _[0], w3 = _[1];
        if (e3.call(r3, w3, p3, t4))
          return yt(o5, n ? p3 : l3++, w3, c);
      }
    });
  }, s;
}
p(Wi, "filterFactory");
function wo(t4, e3, r3) {
  var n = We().asMutable();
  return t4.__iterate(function(s, o5) {
    n.update(e3.call(r3, s, o5, t4), 0, function(a) {
      return a + 1;
    });
  }), n.asImmutable();
}
p(wo, "countByFactory");
function bo(t4, e3, r3) {
  var n = vt(t4), s = (re(t4) ? he() : We()).asMutable();
  t4.__iterate(function(a, u) {
    s.update(e3.call(r3, a, u, t4), function(l3) {
      return l3 = l3 || [], l3.push(n ? [u, a] : a), l3;
    });
  });
  var o5 = pn(t4);
  return s.map(function(a) {
    return ht(t4, o5(a));
  }).asImmutable();
}
p(bo, "groupByFactory");
function So(t4, e3, r3) {
  var n = vt(t4), s = [[], []];
  t4.__iterate(function(a, u) {
    s[e3.call(r3, a, u, t4) ? 1 : 0].push(n ? [u, a] : a);
  });
  var o5 = pn(t4);
  return s.map(function(a) {
    return ht(t4, o5(a));
  });
}
p(So, "partitionFactory");
function hn(t4, e3, r3, n) {
  var s = t4.size;
  if (Mr(e3, r3, s))
    return t4;
  var o5 = ar(e3, s), a = xr(r3, s);
  if (o5 !== o5 || a !== a)
    return hn(t4.toSeq().cacheResult(), e3, r3, n);
  var u = a - o5, l3;
  u === u && (l3 = u < 0 ? 0 : u);
  var c = le(t4);
  return c.size = l3 === 0 ? l3 : t4.size && l3 || void 0, !n && sn(t4) && l3 >= 0 && (c.get = function(_, p3) {
    return _ = me(this, _), _ >= 0 && _ < l3 ? t4.get(_ + o5, p3) : p3;
  }), c.__iterateUncached = function(_, p3) {
    var w3 = this;
    if (l3 === 0)
      return 0;
    if (p3)
      return this.cacheResult().__iterate(_, p3);
    var v = 0, y = true, b3 = 0;
    return t4.__iterate(function(k3, X) {
      if (!(y && (y = v++ < o5)))
        return b3++, _(k3, n ? X : b3 - 1, w3) !== false && b3 !== l3;
    }), b3;
  }, c.__iteratorUncached = function(_, p3) {
    if (l3 !== 0 && p3)
      return this.cacheResult().__iterator(_, p3);
    if (l3 === 0)
      return new lt(Ft);
    var w3 = t4.__iterator(_, p3), v = 0, y = 0;
    return new lt(function() {
      for (; v++ < o5; )
        w3.next();
      if (++y > l3)
        return Ft();
      var b3 = w3.next();
      return n || _ === ne || b3.done ? b3 : _ === ur ? yt(_, y - 1, void 0, b3) : yt(_, y - 1, b3.value[1], b3);
    });
  }, c;
}
p(hn, "sliceFactory");
function Eo(t4, e3, r3) {
  var n = le(t4);
  return n.__iterateUncached = function(s, o5) {
    var a = this;
    if (o5)
      return this.cacheResult().__iterate(s, o5);
    var u = 0;
    return t4.__iterate(function(l3, c, _) {
      return e3.call(r3, l3, c, _) && ++u && s(l3, c, a);
    }), u;
  }, n.__iteratorUncached = function(s, o5) {
    var a = this;
    if (o5)
      return this.cacheResult().__iterator(s, o5);
    var u = t4.__iterator(Yt, o5), l3 = true;
    return new lt(function() {
      if (!l3)
        return Ft();
      var c = u.next();
      if (c.done)
        return c;
      var _ = c.value, p3 = _[0], w3 = _[1];
      return e3.call(r3, w3, p3, a) ? s === Yt ? c : yt(s, p3, w3, c) : (l3 = false, Ft());
    });
  }, n;
}
p(Eo, "takeWhileFactory");
function Vi(t4, e3, r3, n) {
  var s = le(t4);
  return s.__iterateUncached = function(o5, a) {
    var u = this;
    if (a)
      return this.cacheResult().__iterate(o5, a);
    var l3 = true, c = 0;
    return t4.__iterate(function(_, p3, w3) {
      if (!(l3 && (l3 = e3.call(r3, _, p3, w3))))
        return c++, o5(_, n ? p3 : c - 1, u);
    }), c;
  }, s.__iteratorUncached = function(o5, a) {
    var u = this;
    if (a)
      return this.cacheResult().__iterator(o5, a);
    var l3 = t4.__iterator(Yt, a), c = true, _ = 0;
    return new lt(function() {
      var p3, w3, v;
      do {
        if (p3 = l3.next(), p3.done)
          return n || o5 === ne ? p3 : o5 === ur ? yt(o5, _++, void 0, p3) : yt(o5, _++, p3.value[1], p3);
        var y = p3.value;
        w3 = y[0], v = y[1], c && (c = e3.call(r3, v, w3, u));
      } while (c);
      return o5 === Yt ? p3 : yt(o5, w3, v, p3);
    });
  }, s;
}
p(Vi, "skipWhileFactory");
function Oo(t4, e3) {
  var r3 = vt(t4), n = [t4].concat(e3).map(function(a) {
    return Nt(a) ? r3 && (a = Gt(a)) : a = r3 ? un(a) : Pi(Array.isArray(a) ? a : [a]), a;
  }).filter(function(a) {
    return a.size !== 0;
  });
  if (n.length === 0)
    return t4;
  if (n.length === 1) {
    var s = n[0];
    if (s === t4 || r3 && vt(s) || Ut(t4) && Ut(s))
      return s;
  }
  var o5 = new Ee(n);
  return r3 ? o5 = o5.toKeyedSeq() : Ut(t4) || (o5 = o5.toSetSeq()), o5 = o5.flatten(true), o5.size = n.reduce(function(a, u) {
    if (a !== void 0) {
      var l3 = u.size;
      if (l3 !== void 0)
        return a + l3;
    }
  }, 0), o5;
}
p(Oo, "concatFactory");
function Ji(t4, e3, r3) {
  var n = le(t4);
  return n.__iterateUncached = function(s, o5) {
    if (o5)
      return this.cacheResult().__iterate(s, o5);
    var a = 0, u = false;
    function l3(c, _) {
      c.__iterate(function(p3, w3) {
        return (!e3 || _ < e3) && Nt(p3) ? l3(p3, _ + 1) : (a++, s(p3, r3 ? w3 : a - 1, n) === false && (u = true)), !u;
      }, o5);
    }
    return p(l3, "flatDeep"), l3(t4, 0), a;
  }, n.__iteratorUncached = function(s, o5) {
    if (o5)
      return this.cacheResult().__iterator(s, o5);
    var a = t4.__iterator(s, o5), u = [], l3 = 0;
    return new lt(function() {
      for (; a; ) {
        var c = a.next();
        if (c.done !== false) {
          a = u.pop();
          continue;
        }
        var _ = c.value;
        if (s === Yt && (_ = _[1]), (!e3 || u.length < e3) && Nt(_))
          u.push(a), a = _.__iterator(s, o5);
        else
          return r3 ? c : yt(s, l3++, _, c);
      }
      return Ft();
    });
  }, n;
}
p(Ji, "flattenFactory");
function Io(t4, e3, r3) {
  var n = pn(t4);
  return t4.toSeq().map(function(s, o5) {
    return n(e3.call(r3, s, o5, t4));
  }).flatten(true);
}
p(Io, "flatMapFactory");
function ko(t4, e3) {
  var r3 = le(t4);
  return r3.size = t4.size && t4.size * 2 - 1, r3.__iterateUncached = function(n, s) {
    var o5 = this, a = 0;
    return t4.__iterate(function(u) {
      return (!a || n(e3, a++, o5) !== false) && n(u, a++, o5) !== false;
    }, s), a;
  }, r3.__iteratorUncached = function(n, s) {
    var o5 = t4.__iterator(ne, s), a = 0, u;
    return new lt(function() {
      return (!u || a % 2) && (u = o5.next(), u.done) ? u : a % 2 ? yt(n, a++, e3) : yt(n, a++, u.value, u);
    });
  }, r3;
}
p(ko, "interposeFactory");
function Te(t4, e3, r3) {
  e3 || (e3 = Hi);
  var n = vt(t4), s = 0, o5 = t4.toSeq().map(function(a, u) {
    return [u, a, s++, r3 ? r3(a, u, t4) : a];
  }).valueSeq().toArray();
  return o5.sort(function(a, u) {
    return e3(a[3], u[3]) || a[2] - u[2];
  }).forEach(n ? function(a, u) {
    o5[u].length = 2;
  } : function(a, u) {
    o5[u] = a[1];
  }), n ? ve(o5) : Ut(t4) ? ie(o5) : Le(o5);
}
p(Te, "sortFactory");
function wr(t4, e3, r3) {
  if (e3 || (e3 = Hi), r3) {
    var n = t4.toSeq().map(function(s, o5) {
      return [s, r3(s, o5, t4)];
    }).reduce(function(s, o5) {
      return oi(e3, s[1], o5[1]) ? o5 : s;
    });
    return n && n[0];
  }
  return t4.reduce(function(s, o5) {
    return oi(e3, s, o5) ? o5 : s;
  });
}
p(wr, "maxFactory");
function oi(t4, e3, r3) {
  var n = t4(r3, e3);
  return n === 0 && r3 !== e3 && (r3 == null || r3 !== r3) || n > 0;
}
p(oi, "maxCompare");
function br(t4, e3, r3, n) {
  var s = le(t4), o5 = new Ee(r3).map(function(a) {
    return a.size;
  });
  return s.size = n ? o5.max() : o5.min(), s.__iterate = function(a, u) {
    for (var l3 = this.__iterator(ne, u), c, _ = 0; !(c = l3.next()).done && a(c.value, _++, this) !== false; )
      ;
    return _;
  }, s.__iteratorUncached = function(a, u) {
    var l3 = r3.map(function(p3) {
      return p3 = Et(p3), Gr(u ? p3.reverse() : p3);
    }), c = 0, _ = false;
    return new lt(function() {
      var p3;
      return _ || (p3 = l3.map(function(w3) {
        return w3.next();
      }), _ = n ? p3.every(function(w3) {
        return w3.done;
      }) : p3.some(function(w3) {
        return w3.done;
      })), _ ? Ft() : yt(a, c++, e3.apply(null, p3.map(function(w3) {
        return w3.value;
      })));
    });
  }, s;
}
p(br, "zipWithFactory");
function ht(t4, e3) {
  return t4 === e3 ? t4 : sn(t4) ? e3 : t4.constructor(e3);
}
p(ht, "reify");
function ai(t4) {
  if (t4 !== Object(t4))
    throw new TypeError("Expected [K, V] tuple: " + t4);
}
p(ai, "validateEntry");
function pn(t4) {
  return vt(t4) ? Gt : Ut(t4) ? Oe : Ue;
}
p(pn, "collectionClass");
function le(t4) {
  return Object.create((vt(t4) ? ve : Ut(t4) ? ie : Le).prototype);
}
p(le, "makeSequence");
function dn() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : Wt.prototype.cacheResult.call(this);
}
p(dn, "cacheResultThrough");
function Hi(t4, e3) {
  return t4 === void 0 && e3 === void 0 ? 0 : t4 === void 0 ? 1 : e3 === void 0 ? -1 : t4 > e3 ? 1 : t4 < e3 ? -1 : 0;
}
p(Hi, "defaultComparator");
function ae(t4, e3) {
  e3 = e3 || 0;
  for (var r3 = Math.max(0, t4.length - e3), n = new Array(r3), s = 0; s < r3; s++)
    n[s] = t4[s + e3];
  return n;
}
p(ae, "arrCopy");
function _n(t4, e3) {
  if (!t4)
    throw new Error(e3);
}
p(_n, "invariant");
function Kt(t4) {
  _n(t4 !== 1 / 0, "Cannot perform this action with an infinite size.");
}
p(Kt, "assertNotInfinite");
function Ki(t4) {
  if (zi(t4) && typeof t4 != "string")
    return t4;
  if (re(t4))
    return t4.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t4);
}
p(Ki, "coerceKeyPath");
var jo = Object.prototype.toString;
function Mo(t4) {
  if (!t4 || typeof t4 != "object" || jo.call(t4) !== "[object Object]")
    return false;
  var e3 = Object.getPrototypeOf(t4);
  if (e3 === null)
    return true;
  for (var r3 = e3, n = Object.getPrototypeOf(e3); n !== null; )
    r3 = n, n = Object.getPrototypeOf(r3);
  return r3 === e3;
}
p(Mo, "isPlainObject");
function ge(t4) {
  return typeof t4 == "object" && (ue(t4) || Array.isArray(t4) || Mo(t4));
}
p(ge, "isDataStructure");
function tr(t4) {
  try {
    return typeof t4 == "string" ? JSON.stringify(t4) : String(t4);
  } catch {
    return JSON.stringify(t4);
  }
}
p(tr, "quoteString");
function xo(t4, e3) {
  return ue(t4) ? t4.has(e3) : ge(t4) && qe.call(t4, e3);
}
p(xo, "has");
function Yi(t4, e3, r3) {
  return ue(t4) ? t4.get(e3, r3) : xo(t4, e3) ? typeof t4.get == "function" ? t4.get(e3) : t4[e3] : r3;
}
p(Yi, "get");
function kr(t4) {
  if (Array.isArray(t4))
    return ae(t4);
  var e3 = {};
  for (var r3 in t4)
    qe.call(t4, r3) && (e3[r3] = t4[r3]);
  return e3;
}
p(kr, "shallowCopy");
function Ao(t4, e3) {
  if (!ge(t4))
    throw new TypeError("Cannot update non-data-structure value: " + t4);
  if (ue(t4)) {
    if (!t4.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t4);
    return t4.remove(e3);
  }
  if (!qe.call(t4, e3))
    return t4;
  var r3 = kr(t4);
  return Array.isArray(r3) ? r3.splice(e3, 1) : delete r3[e3], r3;
}
p(Ao, "remove");
function Ro(t4, e3, r3) {
  if (!ge(t4))
    throw new TypeError("Cannot update non-data-structure value: " + t4);
  if (ue(t4)) {
    if (!t4.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t4);
    return t4.set(e3, r3);
  }
  if (qe.call(t4, e3) && r3 === t4[e3])
    return t4;
  var n = kr(t4);
  return n[e3] = r3, n;
}
p(Ro, "set");
function Be(t4, e3, r3, n) {
  n || (n = r3, r3 = void 0);
  var s = Gi(ue(t4), t4, Ki(e3), 0, r3, n);
  return s === ot ? r3 : s;
}
p(Be, "updateIn$1");
function Gi(t4, e3, r3, n, s, o5) {
  var a = e3 === ot;
  if (n === r3.length) {
    var u = a ? s : e3, l3 = o5(u);
    return l3 === u ? e3 : l3;
  }
  if (!a && !ge(e3))
    throw new TypeError("Cannot update within non-data-structure value in path [" + r3.slice(0, n).map(tr) + "]: " + e3);
  var c = r3[n], _ = a ? ot : Yi(e3, c, ot), p3 = Gi(_ === ot ? t4 : ue(_), _, r3, n + 1, s, o5);
  return p3 === _ ? e3 : p3 === ot ? Ao(e3, c) : Ro(a ? t4 ? ee() : {} : e3, c, p3);
}
p(Gi, "updateInDeeply");
function To(t4, e3, r3) {
  return Be(t4, e3, ot, function() {
    return r3;
  });
}
p(To, "setIn$1");
function mn(t4, e3) {
  return To(this, t4, e3);
}
p(mn, "setIn");
function $o(t4, e3) {
  return Be(t4, e3, function() {
    return ot;
  });
}
p($o, "removeIn");
function gn(t4) {
  return $o(this, t4);
}
p(gn, "deleteIn");
function Qi(t4, e3, r3, n) {
  return Be(t4, [e3], r3, n);
}
p(Qi, "update$1");
function vn(t4, e3, r3) {
  return arguments.length === 1 ? t4(this) : Qi(this, t4, e3, r3);
}
p(vn, "update");
function yn(t4, e3, r3) {
  return Be(this, t4, e3, r3);
}
p(yn, "updateIn");
function Xi() {
  for (var t4 = [], e3 = arguments.length; e3--; )
    t4[e3] = arguments[e3];
  return ts(this, t4);
}
p(Xi, "merge$1");
function Zi(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  if (typeof t4 != "function")
    throw new TypeError("Invalid merger function: " + t4);
  return ts(this, e3, t4);
}
p(Zi, "mergeWith$1");
function ts(t4, e3, r3) {
  for (var n = [], s = 0; s < e3.length; s++) {
    var o5 = Gt(e3[s]);
    o5.size !== 0 && n.push(o5);
  }
  return n.length === 0 ? t4 : t4.toSeq().size === 0 && !t4.__ownerID && n.length === 1 ? t4.constructor(n[0]) : t4.withMutations(function(a) {
    for (var u = r3 ? function(c, _) {
      Qi(a, _, ot, function(p3) {
        return p3 === ot ? c : r3(p3, c, _);
      });
    } : function(c, _) {
      a.set(_, c);
    }, l3 = 0; l3 < n.length; l3++)
      n[l3].forEach(u);
  });
}
p(ts, "mergeIntoKeyedWith");
function wn(t4, e3, r3) {
  return bn(t4, e3, zo(r3));
}
p(wn, "mergeDeepWithSources");
function bn(t4, e3, r3) {
  if (!ge(t4))
    throw new TypeError("Cannot merge into non-data-structure value: " + t4);
  if (ue(t4))
    return typeof r3 == "function" && t4.mergeWith ? t4.mergeWith.apply(t4, [r3].concat(e3)) : t4.merge ? t4.merge.apply(t4, e3) : t4.concat.apply(t4, e3);
  for (var n = Array.isArray(t4), s = t4, o5 = n ? Oe : Gt, a = n ? function(l3) {
    s === t4 && (s = kr(s)), s.push(l3);
  } : function(l3, c) {
    var _ = qe.call(s, c), p3 = _ && r3 ? r3(s[c], l3, c) : l3;
    (!_ || p3 !== s[c]) && (s === t4 && (s = kr(s)), s[c] = p3);
  }, u = 0; u < e3.length; u++)
    o5(e3[u]).forEach(a);
  return s;
}
p(bn, "mergeWithSources");
function zo(t4) {
  function e3(r3, n, s) {
    return ge(r3) && ge(n) && Po(r3, n) ? bn(r3, [n], e3) : t4 ? t4(r3, n, s) : n;
  }
  return p(e3, "deepMerger"), e3;
}
p(zo, "deepMergerWith");
function Po(t4, e3) {
  var r3 = Wt(t4), n = Wt(e3);
  return Ut(r3) === Ut(n) && vt(r3) === vt(n);
}
p(Po, "areMergeable");
function es() {
  for (var t4 = [], e3 = arguments.length; e3--; )
    t4[e3] = arguments[e3];
  return wn(this, t4);
}
p(es, "mergeDeep");
function rs(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return wn(this, e3, t4);
}
p(rs, "mergeDeepWith");
function Sn(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return Be(this, t4, ee(), function(n) {
    return bn(n, e3);
  });
}
p(Sn, "mergeIn");
function En(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return Be(this, t4, ee(), function(n) {
    return wn(n, e3);
  });
}
p(En, "mergeDeepIn");
function lr(t4) {
  var e3 = this.asMutable();
  return t4(e3), e3.wasAltered() ? e3.__ensureOwner(this.__ownerID) : this;
}
p(lr, "withMutations");
function fr() {
  return this.__ownerID ? this : this.__ensureOwner(new nn());
}
p(fr, "asMutable");
function cr() {
  return this.__ensureOwner();
}
p(cr, "asImmutable");
function On() {
  return this.__altered;
}
p(On, "wasAltered");
var We = function(t4) {
  function e3(r3) {
    return r3 == null ? ee() : fn(r3) && !re(r3) ? r3 : ee().withMutations(function(n) {
      var s = t4(r3);
      Kt(s.size), s.forEach(function(o5, a) {
        return n.set(a, o5);
      });
    });
  }
  return p(e3, "Map"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    return ee().withMutations(function(o5) {
      for (var a = 0; a < n.length; a += 2) {
        if (a + 1 >= n.length)
          throw new Error("Missing value for key: " + n[a]);
        o5.set(n[a], n[a + 1]);
      }
    });
  }, "of"), e3.prototype.toString = p(function() {
    return this.__toString("Map {", "}");
  }, "toString"), e3.prototype.get = p(function(n, s) {
    return this._root ? this._root.get(0, void 0, n, s) : s;
  }, "get"), e3.prototype.set = p(function(n, s) {
    return fi(this, n, s);
  }, "set"), e3.prototype.remove = p(function(n) {
    return fi(this, n, ot);
  }, "remove"), e3.prototype.deleteAll = p(function(n) {
    var s = Et(n);
    return s.size === 0 ? this : this.withMutations(function(o5) {
      s.forEach(function(a) {
        return o5.remove(a);
      });
    });
  }, "deleteAll"), e3.prototype.clear = p(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : ee();
  }, "clear"), e3.prototype.sort = p(function(n) {
    return he(Te(this, n));
  }, "sort"), e3.prototype.sortBy = p(function(n, s) {
    return he(Te(this, s, n));
  }, "sortBy"), e3.prototype.map = p(function(n, s) {
    var o5 = this;
    return this.withMutations(function(a) {
      a.forEach(function(u, l3) {
        a.set(l3, n.call(s, u, l3, o5));
      });
    });
  }, "map"), e3.prototype.__iterator = p(function(n, s) {
    return new Do(this, n, s);
  }, "__iterator"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this, a = 0;
    return this._root && this._root.iterate(function(u) {
      return a++, n(u[1], u[0], o5);
    }, s), a;
  }, "__iterate"), e3.prototype.__ensureOwner = p(function(n) {
    return n === this.__ownerID ? this : n ? In(this.size, this._root, n, this.__hash) : this.size === 0 ? ee() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3;
}(Gt);
We.isMap = fn;
var mt = We.prototype;
mt[Di] = true;
mt[or] = mt.remove;
mt.removeAll = mt.deleteAll;
mt.setIn = mn;
mt.removeIn = mt.deleteIn = gn;
mt.update = vn;
mt.updateIn = yn;
mt.merge = mt.concat = Xi;
mt.mergeWith = Zi;
mt.mergeDeep = es;
mt.mergeDeepWith = rs;
mt.mergeIn = Sn;
mt.mergeDeepIn = En;
mt.withMutations = lr;
mt.wasAltered = On;
mt.asImmutable = cr;
mt["@@transducer/init"] = mt.asMutable = fr;
mt["@@transducer/step"] = function(t4, e3) {
  return t4.set(e3[0], e3[1]);
};
mt["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
var er = p(function(e3, r3) {
  this.ownerID = e3, this.entries = r3;
}, "ArrayMapNode");
er.prototype.get = p(function(e3, r3, n, s) {
  for (var o5 = this.entries, a = 0, u = o5.length; a < u; a++)
    if (Bt(n, o5[a][0]))
      return o5[a][1];
  return s;
}, "get");
er.prototype.update = p(function(e3, r3, n, s, o5, a, u) {
  for (var l3 = o5 === ot, c = this.entries, _ = 0, p3 = c.length; _ < p3 && !Bt(s, c[_][0]); _++)
    ;
  var w3 = _ < p3;
  if (w3 ? c[_][1] === o5 : l3)
    return this;
  if (Ht(u), (l3 || !w3) && Ht(a), !(l3 && c.length === 1)) {
    if (!w3 && !l3 && c.length >= Lo)
      return Co(e3, c, s, o5);
    var v = e3 && e3 === this.ownerID, y = v ? c : ae(c);
    return w3 ? l3 ? _ === p3 - 1 ? y.pop() : y[_] = y.pop() : y[_] = [s, o5] : y.push([s, o5]), v ? (this.entries = y, this) : new er(e3, y);
  }
}, "update");
var $e = p(function(e3, r3, n) {
  this.ownerID = e3, this.bitmap = r3, this.nodes = n;
}, "BitmapIndexedNode");
$e.prototype.get = p(function(e3, r3, n, s) {
  r3 === void 0 && (r3 = Lt(n));
  var o5 = 1 << ((e3 === 0 ? r3 : r3 >>> e3) & zt), a = this.bitmap;
  return a & o5 ? this.nodes[ns(a & o5 - 1)].get(e3 + _t, r3, n, s) : s;
}, "get");
$e.prototype.update = p(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt(s));
  var l3 = (r3 === 0 ? n : n >>> r3) & zt, c = 1 << l3, _ = this.bitmap, p3 = (_ & c) !== 0;
  if (!p3 && o5 === ot)
    return this;
  var w3 = ns(_ & c - 1), v = this.nodes, y = p3 ? v[w3] : void 0, b3 = kn(y, e3, r3 + _t, n, s, o5, a, u);
  if (b3 === y)
    return this;
  if (!p3 && b3 && v.length >= Bo)
    return No(e3, v, _, l3, b3);
  if (p3 && !b3 && v.length === 2 && ci(v[w3 ^ 1]))
    return v[w3 ^ 1];
  if (p3 && b3 && v.length === 1 && ci(b3))
    return b3;
  var k3 = e3 && e3 === this.ownerID, X = p3 ? b3 ? _ : _ ^ c : _ | c, K = p3 ? b3 ? is(v, w3, b3, k3) : qo(v, w3, k3) : Fo(v, w3, b3, k3);
  return k3 ? (this.bitmap = X, this.nodes = K, this) : new $e(e3, X, K);
}, "update");
var rr = p(function(e3, r3, n) {
  this.ownerID = e3, this.count = r3, this.nodes = n;
}, "HashArrayMapNode");
rr.prototype.get = p(function(e3, r3, n, s) {
  r3 === void 0 && (r3 = Lt(n));
  var o5 = (e3 === 0 ? r3 : r3 >>> e3) & zt, a = this.nodes[o5];
  return a ? a.get(e3 + _t, r3, n, s) : s;
}, "get");
rr.prototype.update = p(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt(s));
  var l3 = (r3 === 0 ? n : n >>> r3) & zt, c = o5 === ot, _ = this.nodes, p3 = _[l3];
  if (c && !p3)
    return this;
  var w3 = kn(p3, e3, r3 + _t, n, s, o5, a, u);
  if (w3 === p3)
    return this;
  var v = this.count;
  if (!p3)
    v++;
  else if (!w3 && (v--, v < Wo))
    return Uo(e3, _, v, l3);
  var y = e3 && e3 === this.ownerID, b3 = is(_, l3, w3, y);
  return y ? (this.count = v, this.nodes = b3, this) : new rr(e3, v, b3);
}, "update");
var ze = p(function(e3, r3, n) {
  this.ownerID = e3, this.keyHash = r3, this.entries = n;
}, "HashCollisionNode");
ze.prototype.get = p(function(e3, r3, n, s) {
  for (var o5 = this.entries, a = 0, u = o5.length; a < u; a++)
    if (Bt(n, o5[a][0]))
      return o5[a][1];
  return s;
}, "get");
ze.prototype.update = p(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt(s));
  var l3 = o5 === ot;
  if (n !== this.keyHash)
    return l3 ? this : (Ht(u), Ht(a), jn(this, e3, r3, n, [s, o5]));
  for (var c = this.entries, _ = 0, p3 = c.length; _ < p3 && !Bt(s, c[_][0]); _++)
    ;
  var w3 = _ < p3;
  if (w3 ? c[_][1] === o5 : l3)
    return this;
  if (Ht(u), (l3 || !w3) && Ht(a), l3 && p3 === 2)
    return new ce(e3, this.keyHash, c[_ ^ 1]);
  var v = e3 && e3 === this.ownerID, y = v ? c : ae(c);
  return w3 ? l3 ? _ === p3 - 1 ? y.pop() : y[_] = y.pop() : y[_] = [s, o5] : y.push([s, o5]), v ? (this.entries = y, this) : new ze(e3, this.keyHash, y);
}, "update");
var ce = p(function(e3, r3, n) {
  this.ownerID = e3, this.keyHash = r3, this.entry = n;
}, "ValueNode");
ce.prototype.get = p(function(e3, r3, n, s) {
  return Bt(n, this.entry[0]) ? this.entry[1] : s;
}, "get");
ce.prototype.update = p(function(e3, r3, n, s, o5, a, u) {
  var l3 = o5 === ot, c = Bt(s, this.entry[0]);
  if (c ? o5 === this.entry[1] : l3)
    return this;
  if (Ht(u), l3) {
    Ht(a);
    return;
  }
  return c ? e3 && e3 === this.ownerID ? (this.entry[1] = o5, this) : new ce(e3, this.keyHash, [s, o5]) : (Ht(a), jn(this, e3, r3, Lt(s), [s, o5]));
}, "update");
er.prototype.iterate = ze.prototype.iterate = function(t4, e3) {
  for (var r3 = this.entries, n = 0, s = r3.length - 1; n <= s; n++)
    if (t4(r3[e3 ? s - n : n]) === false)
      return false;
};
$e.prototype.iterate = rr.prototype.iterate = function(t4, e3) {
  for (var r3 = this.nodes, n = 0, s = r3.length - 1; n <= s; n++) {
    var o5 = r3[e3 ? s - n : n];
    if (o5 && o5.iterate(t4, e3) === false)
      return false;
  }
};
ce.prototype.iterate = function(t4, e3) {
  return t4(this.entry);
};
var Do = function(t4) {
  function e3(r3, n, s) {
    this._type = n, this._reverse = s, this._stack = r3._root && ui(r3._root);
  }
  return p(e3, "MapIterator"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.next = p(function() {
    for (var n = this._type, s = this._stack; s; ) {
      var o5 = s.node, a = s.index++, u = void 0;
      if (o5.entry) {
        if (a === 0)
          return Jr(n, o5.entry);
      } else if (o5.entries) {
        if (u = o5.entries.length - 1, a <= u)
          return Jr(n, o5.entries[this._reverse ? u - a : a]);
      } else if (u = o5.nodes.length - 1, a <= u) {
        var l3 = o5.nodes[this._reverse ? u - a : a];
        if (l3) {
          if (l3.entry)
            return Jr(n, l3.entry);
          s = this._stack = ui(l3, s);
        }
        continue;
      }
      s = this._stack = this._stack.__prev;
    }
    return Ft();
  }, "next"), e3;
}(lt);
function Jr(t4, e3) {
  return yt(t4, e3[0], e3[1]);
}
p(Jr, "mapIteratorValue");
function ui(t4, e3) {
  return { node: t4, index: 0, __prev: e3 };
}
p(ui, "mapIteratorFrame");
function In(t4, e3, r3, n) {
  var s = Object.create(mt);
  return s.size = t4, s._root = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p(In, "makeMap");
var li;
function ee() {
  return li || (li = In(0));
}
p(ee, "emptyMap");
function fi(t4, e3, r3) {
  var n, s;
  if (t4._root) {
    var o5 = Kr(), a = Kr();
    if (n = kn(t4._root, t4.__ownerID, 0, void 0, e3, r3, o5, a), !a.value)
      return t4;
    s = t4.size + (o5.value ? r3 === ot ? -1 : 1 : 0);
  } else {
    if (r3 === ot)
      return t4;
    s = 1, n = new er(t4.__ownerID, [[e3, r3]]);
  }
  return t4.__ownerID ? (t4.size = s, t4._root = n, t4.__hash = void 0, t4.__altered = true, t4) : n ? In(s, n) : ee();
}
p(fi, "updateMap");
function kn(t4, e3, r3, n, s, o5, a, u) {
  return t4 ? t4.update(e3, r3, n, s, o5, a, u) : o5 === ot ? t4 : (Ht(u), Ht(a), new ce(e3, n, [s, o5]));
}
p(kn, "updateNode");
function ci(t4) {
  return t4.constructor === ce || t4.constructor === ze;
}
p(ci, "isLeafNode");
function jn(t4, e3, r3, n, s) {
  if (t4.keyHash === n)
    return new ze(e3, n, [t4.entry, s]);
  var o5 = (r3 === 0 ? t4.keyHash : t4.keyHash >>> r3) & zt, a = (r3 === 0 ? n : n >>> r3) & zt, u, l3 = o5 === a ? [jn(t4, e3, r3 + _t, n, s)] : (u = new ce(e3, n, s), o5 < a ? [t4, u] : [u, t4]);
  return new $e(e3, 1 << o5 | 1 << a, l3);
}
p(jn, "mergeIntoNode");
function Co(t4, e3, r3, n) {
  t4 || (t4 = new nn());
  for (var s = new ce(t4, Lt(r3), [r3, n]), o5 = 0; o5 < e3.length; o5++) {
    var a = e3[o5];
    s = s.update(t4, 0, void 0, a[0], a[1]);
  }
  return s;
}
p(Co, "createNodes");
function Uo(t4, e3, r3, n) {
  for (var s = 0, o5 = 0, a = new Array(r3), u = 0, l3 = 1, c = e3.length; u < c; u++, l3 <<= 1) {
    var _ = e3[u];
    _ !== void 0 && u !== n && (s |= l3, a[o5++] = _);
  }
  return new $e(t4, s, a);
}
p(Uo, "packNodes");
function No(t4, e3, r3, n, s) {
  for (var o5 = 0, a = new Array(Jt), u = 0; r3 !== 0; u++, r3 >>>= 1)
    a[u] = r3 & 1 ? e3[o5++] : void 0;
  return a[n] = s, new rr(t4, o5 + 1, a);
}
p(No, "expandNodes");
function ns(t4) {
  return t4 -= t4 >> 1 & 1431655765, t4 = (t4 & 858993459) + (t4 >> 2 & 858993459), t4 = t4 + (t4 >> 4) & 252645135, t4 += t4 >> 8, t4 += t4 >> 16, t4 & 127;
}
p(ns, "popCount");
function is(t4, e3, r3, n) {
  var s = n ? t4 : ae(t4);
  return s[e3] = r3, s;
}
p(is, "setAt");
function Fo(t4, e3, r3, n) {
  var s = t4.length + 1;
  if (n && e3 + 1 === s)
    return t4[e3] = r3, t4;
  for (var o5 = new Array(s), a = 0, u = 0; u < s; u++)
    u === e3 ? (o5[u] = r3, a = -1) : o5[u] = t4[u + a];
  return o5;
}
p(Fo, "spliceIn");
function qo(t4, e3, r3) {
  var n = t4.length - 1;
  if (r3 && e3 === n)
    return t4.pop(), t4;
  for (var s = new Array(n), o5 = 0, a = 0; a < n; a++)
    a === e3 && (o5 = 1), s[a] = t4[a + o5];
  return s;
}
p(qo, "spliceOut");
var Lo = Jt / 4;
var Bo = Jt / 2;
var Wo = Jt / 4;
var ss = "@@__IMMUTABLE_LIST__@@";
function os(t4) {
  return Boolean(t4 && t4[ss]);
}
p(os, "isList");
var Pr = function(t4) {
  function e3(r3) {
    var n = Ir();
    if (r3 == null)
      return n;
    if (os(r3))
      return r3;
    var s = t4(r3), o5 = s.size;
    return o5 === 0 ? n : (Kt(o5), o5 > 0 && o5 < Jt ? nr(0, o5, _t, null, new _e(s.toArray())) : n.withMutations(function(a) {
      a.setSize(o5), s.forEach(function(u, l3) {
        return a.set(l3, u);
      });
    }));
  }
  return p(e3, "List"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p(function() {
    return this.__toString("List [", "]");
  }, "toString"), e3.prototype.get = p(function(n, s) {
    if (n = me(this, n), n >= 0 && n < this.size) {
      n += this._origin;
      var o5 = as(this, n);
      return o5 && o5.array[n & zt];
    }
    return s;
  }, "get"), e3.prototype.set = p(function(n, s) {
    return Vo(this, n, s);
  }, "set"), e3.prototype.remove = p(function(n) {
    return this.has(n) ? n === 0 ? this.shift() : n === this.size - 1 ? this.pop() : this.splice(n, 1) : this;
  }, "remove"), e3.prototype.insert = p(function(n, s) {
    return this.splice(n, 0, s);
  }, "insert"), e3.prototype.clear = p(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = _t, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : Ir();
  }, "clear"), e3.prototype.push = p(function() {
    var n = arguments, s = this.size;
    return this.withMutations(function(o5) {
      de(o5, 0, s + n.length);
      for (var a = 0; a < n.length; a++)
        o5.set(s + a, n[a]);
    });
  }, "push"), e3.prototype.pop = p(function() {
    return de(this, 0, -1);
  }, "pop"), e3.prototype.unshift = p(function() {
    var n = arguments;
    return this.withMutations(function(s) {
      de(s, -n.length);
      for (var o5 = 0; o5 < n.length; o5++)
        s.set(o5, n[o5]);
    });
  }, "unshift"), e3.prototype.shift = p(function() {
    return de(this, 1);
  }, "shift"), e3.prototype.concat = p(function() {
    for (var n = arguments, s = [], o5 = 0; o5 < arguments.length; o5++) {
      var a = n[o5], u = t4(typeof a != "string" && $i(a) ? a : [a]);
      u.size !== 0 && s.push(u);
    }
    return s.length === 0 ? this : this.size === 0 && !this.__ownerID && s.length === 1 ? this.constructor(s[0]) : this.withMutations(function(l3) {
      s.forEach(function(c) {
        return c.forEach(function(_) {
          return l3.push(_);
        });
      });
    });
  }, "concat"), e3.prototype.setSize = p(function(n) {
    return de(this, 0, n);
  }, "setSize"), e3.prototype.map = p(function(n, s) {
    var o5 = this;
    return this.withMutations(function(a) {
      for (var u = 0; u < o5.size; u++)
        a.set(u, n.call(s, a.get(u), u, o5));
    });
  }, "map"), e3.prototype.slice = p(function(n, s) {
    var o5 = this.size;
    return Mr(n, s, o5) ? this : de(this, ar(n, o5), xr(s, o5));
  }, "slice"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = s ? this.size : 0, a = hi(this, s);
    return new lt(function() {
      var u = a();
      return u === Ze ? Ft() : yt(n, s ? --o5 : o5++, u);
    });
  }, "__iterator"), e3.prototype.__iterate = p(function(n, s) {
    for (var o5 = s ? this.size : 0, a = hi(this, s), u; (u = a()) !== Ze && n(u, s ? --o5 : o5++, this) !== false; )
      ;
    return o5;
  }, "__iterate"), e3.prototype.__ensureOwner = p(function(n) {
    return n === this.__ownerID ? this : n ? nr(this._origin, this._capacity, this._level, this._root, this._tail, n, this.__hash) : this.size === 0 ? Ir() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3;
}(Oe);
Pr.isList = os;
var Ot = Pr.prototype;
Ot[ss] = true;
Ot[or] = Ot.remove;
Ot.merge = Ot.concat;
Ot.setIn = mn;
Ot.deleteIn = Ot.removeIn = gn;
Ot.update = vn;
Ot.updateIn = yn;
Ot.mergeIn = Sn;
Ot.mergeDeepIn = En;
Ot.withMutations = lr;
Ot.wasAltered = On;
Ot.asImmutable = cr;
Ot["@@transducer/init"] = Ot.asMutable = fr;
Ot["@@transducer/step"] = function(t4, e3) {
  return t4.push(e3);
};
Ot["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
var _e = p(function(e3, r3) {
  this.array = e3, this.ownerID = r3;
}, "VNode");
_e.prototype.removeBefore = p(function(e3, r3, n) {
  if (n === r3 ? 1 << r3 : this.array.length === 0)
    return this;
  var s = n >>> r3 & zt;
  if (s >= this.array.length)
    return new _e([], e3);
  var o5 = s === 0, a;
  if (r3 > 0) {
    var u = this.array[s];
    if (a = u && u.removeBefore(e3, r3 - _t, n), a === u && o5)
      return this;
  }
  if (o5 && !a)
    return this;
  var l3 = Pe(this, e3);
  if (!o5)
    for (var c = 0; c < s; c++)
      l3.array[c] = void 0;
  return a && (l3.array[s] = a), l3;
}, "removeBefore");
_e.prototype.removeAfter = p(function(e3, r3, n) {
  if (n === (r3 ? 1 << r3 : 0) || this.array.length === 0)
    return this;
  var s = n - 1 >>> r3 & zt;
  if (s >= this.array.length)
    return this;
  var o5;
  if (r3 > 0) {
    var a = this.array[s];
    if (o5 = a && a.removeAfter(e3, r3 - _t, n), o5 === a && s === this.array.length - 1)
      return this;
  }
  var u = Pe(this, e3);
  return u.array.splice(s + 1), o5 && (u.array[s] = o5), u;
}, "removeAfter");
var Ze = {};
function hi(t4, e3) {
  var r3 = t4._origin, n = t4._capacity, s = ir(n), o5 = t4._tail;
  return a(t4._root, t4._level, 0);
  function a(c, _, p3) {
    return _ === 0 ? u(c, p3) : l3(c, _, p3);
  }
  function u(c, _) {
    var p3 = _ === s ? o5 && o5.array : c && c.array, w3 = _ > r3 ? 0 : r3 - _, v = n - _;
    return v > Jt && (v = Jt), function() {
      if (w3 === v)
        return Ze;
      var y = e3 ? --v : w3++;
      return p3 && p3[y];
    };
  }
  function l3(c, _, p3) {
    var w3, v = c && c.array, y = p3 > r3 ? 0 : r3 - p3 >> _, b3 = (n - p3 >> _) + 1;
    return b3 > Jt && (b3 = Jt), function() {
      for (; ; ) {
        if (w3) {
          var k3 = w3();
          if (k3 !== Ze)
            return k3;
          w3 = null;
        }
        if (y === b3)
          return Ze;
        var X = e3 ? --b3 : y++;
        w3 = a(v && v[X], _ - _t, p3 + (X << _));
      }
    };
  }
}
p(hi, "iterateList");
function nr(t4, e3, r3, n, s, o5, a) {
  var u = Object.create(Ot);
  return u.size = e3 - t4, u._origin = t4, u._capacity = e3, u._level = r3, u._root = n, u._tail = s, u.__ownerID = o5, u.__hash = a, u.__altered = false, u;
}
p(nr, "makeList");
var pi;
function Ir() {
  return pi || (pi = nr(0, 0, _t));
}
p(Ir, "emptyList");
function Vo(t4, e3, r3) {
  if (e3 = me(t4, e3), e3 !== e3)
    return t4;
  if (e3 >= t4.size || e3 < 0)
    return t4.withMutations(function(a) {
      e3 < 0 ? de(a, e3).set(0, r3) : de(a, 0, e3 + 1).set(e3, r3);
    });
  e3 += t4._origin;
  var n = t4._tail, s = t4._root, o5 = Kr();
  return e3 >= ir(t4._capacity) ? n = tn(n, t4.__ownerID, 0, e3, r3, o5) : s = tn(s, t4.__ownerID, t4._level, e3, r3, o5), o5.value ? t4.__ownerID ? (t4._root = s, t4._tail = n, t4.__hash = void 0, t4.__altered = true, t4) : nr(t4._origin, t4._capacity, t4._level, s, n) : t4;
}
p(Vo, "updateList");
function tn(t4, e3, r3, n, s, o5) {
  var a = n >>> r3 & zt, u = t4 && a < t4.array.length;
  if (!u && s === void 0)
    return t4;
  var l3;
  if (r3 > 0) {
    var c = t4 && t4.array[a], _ = tn(c, e3, r3 - _t, n, s, o5);
    return _ === c ? t4 : (l3 = Pe(t4, e3), l3.array[a] = _, l3);
  }
  return u && t4.array[a] === s ? t4 : (o5 && Ht(o5), l3 = Pe(t4, e3), s === void 0 && a === l3.array.length - 1 ? l3.array.pop() : l3.array[a] = s, l3);
}
p(tn, "updateVNode");
function Pe(t4, e3) {
  return e3 && t4 && e3 === t4.ownerID ? t4 : new _e(t4 ? t4.array.slice() : [], e3);
}
p(Pe, "editableVNode");
function as(t4, e3) {
  if (e3 >= ir(t4._capacity))
    return t4._tail;
  if (e3 < 1 << t4._level + _t) {
    for (var r3 = t4._root, n = t4._level; r3 && n > 0; )
      r3 = r3.array[e3 >>> n & zt], n -= _t;
    return r3;
  }
}
p(as, "listNodeFor");
function de(t4, e3, r3) {
  e3 !== void 0 && (e3 |= 0), r3 !== void 0 && (r3 |= 0);
  var n = t4.__ownerID || new nn(), s = t4._origin, o5 = t4._capacity, a = s + e3, u = r3 === void 0 ? o5 : r3 < 0 ? o5 + r3 : s + r3;
  if (a === s && u === o5)
    return t4;
  if (a >= u)
    return t4.clear();
  for (var l3 = t4._level, c = t4._root, _ = 0; a + _ < 0; )
    c = new _e(c && c.array.length ? [void 0, c] : [], n), l3 += _t, _ += 1 << l3;
  _ && (a += _, s += _, u += _, o5 += _);
  for (var p3 = ir(o5), w3 = ir(u); w3 >= 1 << l3 + _t; )
    c = new _e(c && c.array.length ? [c] : [], n), l3 += _t;
  var v = t4._tail, y = w3 < p3 ? as(t4, u - 1) : w3 > p3 ? new _e([], n) : v;
  if (v && w3 > p3 && a < o5 && v.array.length) {
    c = Pe(c, n);
    for (var b3 = c, k3 = l3; k3 > _t; k3 -= _t) {
      var X = p3 >>> k3 & zt;
      b3 = b3.array[X] = Pe(b3.array[X], n);
    }
    b3.array[p3 >>> _t & zt] = v;
  }
  if (u < o5 && (y = y && y.removeAfter(n, 0, u)), a >= w3)
    a -= w3, u -= w3, l3 = _t, c = null, y = y && y.removeBefore(n, 0, a);
  else if (a > s || w3 < p3) {
    for (_ = 0; c; ) {
      var K = a >>> l3 & zt;
      if (K !== w3 >>> l3 & zt)
        break;
      K && (_ += (1 << l3) * K), l3 -= _t, c = c.array[K];
    }
    c && a > s && (c = c.removeBefore(n, l3, a - _)), c && w3 < p3 && (c = c.removeAfter(n, l3, w3 - _)), _ && (a -= _, u -= _);
  }
  return t4.__ownerID ? (t4.size = u - a, t4._origin = a, t4._capacity = u, t4._level = l3, t4._root = c, t4._tail = y, t4.__hash = void 0, t4.__altered = true, t4) : nr(a, u, l3, c, y);
}
p(de, "setListBounds");
function ir(t4) {
  return t4 < Jt ? 0 : t4 - 1 >>> _t << _t;
}
p(ir, "getTailOffset");
var he = function(t4) {
  function e3(r3) {
    return r3 == null ? Ge() : Ci(r3) ? r3 : Ge().withMutations(function(n) {
      var s = Gt(r3);
      Kt(s.size), s.forEach(function(o5, a) {
        return n.set(a, o5);
      });
    });
  }
  return p(e3, "OrderedMap"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), e3.prototype.get = p(function(n, s) {
    var o5 = this._map.get(n);
    return o5 !== void 0 ? this._list.get(o5)[1] : s;
  }, "get"), e3.prototype.clear = p(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : Ge();
  }, "clear"), e3.prototype.set = p(function(n, s) {
    return _i(this, n, s);
  }, "set"), e3.prototype.remove = p(function(n) {
    return _i(this, n, ot);
  }, "remove"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    return this._list.__iterate(function(a) {
      return a && n(a[1], a[0], o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    return this._list.fromEntrySeq().__iterator(n, s);
  }, "__iterator"), e3.prototype.__ensureOwner = p(function(n) {
    if (n === this.__ownerID)
      return this;
    var s = this._map.__ensureOwner(n), o5 = this._list.__ensureOwner(n);
    return n ? Mn(s, o5, n, this.__hash) : this.size === 0 ? Ge() : (this.__ownerID = n, this.__altered = false, this._map = s, this._list = o5, this);
  }, "__ensureOwner"), e3;
}(We);
he.isOrderedMap = Ci;
he.prototype[Fe] = true;
he.prototype[or] = he.prototype.remove;
function Mn(t4, e3, r3, n) {
  var s = Object.create(he.prototype);
  return s.size = t4 ? t4.size : 0, s._map = t4, s._list = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p(Mn, "makeOrderedMap");
var di;
function Ge() {
  return di || (di = Mn(ee(), Ir()));
}
p(Ge, "emptyOrderedMap");
function _i(t4, e3, r3) {
  var n = t4._map, s = t4._list, o5 = n.get(e3), a = o5 !== void 0, u, l3;
  if (r3 === ot) {
    if (!a)
      return t4;
    s.size >= Jt && s.size >= n.size * 2 ? (l3 = s.filter(function(c, _) {
      return c !== void 0 && o5 !== _;
    }), u = l3.toKeyedSeq().map(function(c) {
      return c[0];
    }).flip().toMap(), t4.__ownerID && (u.__ownerID = l3.__ownerID = t4.__ownerID)) : (u = n.remove(e3), l3 = o5 === s.size - 1 ? s.pop() : s.set(o5, void 0));
  } else if (a) {
    if (r3 === s.get(o5)[1])
      return t4;
    u = n, l3 = s.set(o5, [e3, r3]);
  } else
    u = n.set(e3, s.size), l3 = s.set(s.size, [e3, r3]);
  return t4.__ownerID ? (t4.size = u.size, t4._map = u, t4._list = l3, t4.__hash = void 0, t4.__altered = true, t4) : Mn(u, l3);
}
p(_i, "updateOrderedMap");
var us = "@@__IMMUTABLE_STACK__@@";
function en(t4) {
  return Boolean(t4 && t4[us]);
}
p(en, "isStack");
var xn = function(t4) {
  function e3(r3) {
    return r3 == null ? Sr() : en(r3) ? r3 : Sr().pushAll(r3);
  }
  return p(e3, "Stack"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), e3.prototype.get = p(function(n, s) {
    var o5 = this._head;
    for (n = me(this, n); o5 && n--; )
      o5 = o5.next;
    return o5 ? o5.value : s;
  }, "get"), e3.prototype.peek = p(function() {
    return this._head && this._head.value;
  }, "peek"), e3.prototype.push = p(function() {
    var n = arguments;
    if (arguments.length === 0)
      return this;
    for (var s = this.size + arguments.length, o5 = this._head, a = arguments.length - 1; a >= 0; a--)
      o5 = { value: n[a], next: o5 };
    return this.__ownerID ? (this.size = s, this._head = o5, this.__hash = void 0, this.__altered = true, this) : Qe(s, o5);
  }, "push"), e3.prototype.pushAll = p(function(n) {
    if (n = t4(n), n.size === 0)
      return this;
    if (this.size === 0 && en(n))
      return n;
    Kt(n.size);
    var s = this.size, o5 = this._head;
    return n.__iterate(function(a) {
      s++, o5 = { value: a, next: o5 };
    }, true), this.__ownerID ? (this.size = s, this._head = o5, this.__hash = void 0, this.__altered = true, this) : Qe(s, o5);
  }, "pushAll"), e3.prototype.pop = p(function() {
    return this.slice(1);
  }, "pop"), e3.prototype.clear = p(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : Sr();
  }, "clear"), e3.prototype.slice = p(function(n, s) {
    if (Mr(n, s, this.size))
      return this;
    var o5 = ar(n, this.size), a = xr(s, this.size);
    if (a !== this.size)
      return t4.prototype.slice.call(this, n, s);
    for (var u = this.size - o5, l3 = this._head; o5--; )
      l3 = l3.next;
    return this.__ownerID ? (this.size = u, this._head = l3, this.__hash = void 0, this.__altered = true, this) : Qe(u, l3);
  }, "slice"), e3.prototype.__ensureOwner = p(function(n) {
    return n === this.__ownerID ? this : n ? Qe(this.size, this._head, n, this.__hash) : this.size === 0 ? Sr() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    if (s)
      return new Ee(this.toArray()).__iterate(function(l3, c) {
        return n(l3, c, o5);
      }, s);
    for (var a = 0, u = this._head; u && n(u.value, a++, this) !== false; )
      u = u.next;
    return a;
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    if (s)
      return new Ee(this.toArray()).__iterator(n, s);
    var o5 = 0, a = this._head;
    return new lt(function() {
      if (a) {
        var u = a.value;
        return a = a.next, yt(n, o5++, u);
      }
      return Ft();
    });
  }, "__iterator"), e3;
}(Oe);
xn.isStack = en;
var Pt = xn.prototype;
Pt[us] = true;
Pt.shift = Pt.pop;
Pt.unshift = Pt.push;
Pt.unshiftAll = Pt.pushAll;
Pt.withMutations = lr;
Pt.wasAltered = On;
Pt.asImmutable = cr;
Pt["@@transducer/init"] = Pt.asMutable = fr;
Pt["@@transducer/step"] = function(t4, e3) {
  return t4.unshift(e3);
};
Pt["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
function Qe(t4, e3, r3, n) {
  var s = Object.create(Pt);
  return s.size = t4, s._head = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p(Qe, "makeStack");
var mi;
function Sr() {
  return mi || (mi = Qe(0));
}
p(Sr, "emptyStack");
var ls = "@@__IMMUTABLE_SET__@@";
function An(t4) {
  return Boolean(t4 && t4[ls]);
}
p(An, "isSet");
function fs(t4) {
  return An(t4) && re(t4);
}
p(fs, "isOrderedSet");
function cs(t4, e3) {
  if (t4 === e3)
    return true;
  if (!Nt(e3) || t4.size !== void 0 && e3.size !== void 0 && t4.size !== e3.size || t4.__hash !== void 0 && e3.__hash !== void 0 && t4.__hash !== e3.__hash || vt(t4) !== vt(e3) || Ut(t4) !== Ut(e3) || re(t4) !== re(e3))
    return false;
  if (t4.size === 0 && e3.size === 0)
    return true;
  var r3 = !Ar(t4);
  if (re(t4)) {
    var n = t4.entries();
    return e3.every(function(l3, c) {
      var _ = n.next().value;
      return _ && Bt(_[1], l3) && (r3 || Bt(_[0], c));
    }) && n.next().done;
  }
  var s = false;
  if (t4.size === void 0)
    if (e3.size === void 0)
      typeof t4.cacheResult == "function" && t4.cacheResult();
    else {
      s = true;
      var o5 = t4;
      t4 = e3, e3 = o5;
    }
  var a = true, u = e3.__iterate(function(l3, c) {
    if (r3 ? !t4.has(l3) : s ? !Bt(l3, t4.get(c, ot)) : !Bt(t4.get(c, ot), l3))
      return a = false, false;
  });
  return a && t4.size === u;
}
p(cs, "deepEqual");
function Ie(t4, e3) {
  var r3 = p(function(n) {
    t4.prototype[n] = e3[n];
  }, "keyCopier");
  return Object.keys(e3).forEach(r3), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e3).forEach(r3), t4;
}
p(Ie, "mixin");
function jr(t4) {
  if (!t4 || typeof t4 != "object")
    return t4;
  if (!Nt(t4)) {
    if (!ge(t4))
      return t4;
    t4 = Wt(t4);
  }
  if (vt(t4)) {
    var e3 = {};
    return t4.__iterate(function(n, s) {
      e3[s] = jr(n);
    }), e3;
  }
  var r3 = [];
  return t4.__iterate(function(n) {
    r3.push(jr(n));
  }), r3;
}
p(jr, "toJS");
var Dr = function(t4) {
  function e3(r3) {
    return r3 == null ? Xe() : An(r3) && !re(r3) ? r3 : Xe().withMutations(function(n) {
      var s = t4(r3);
      Kt(s.size), s.forEach(function(o5) {
        return n.add(o5);
      });
    });
  }
  return p(e3, "Set"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return this(arguments);
  }, "of"), e3.fromKeys = p(function(n) {
    return this(Gt(n).keySeq());
  }, "fromKeys"), e3.intersect = p(function(n) {
    return n = Et(n).toArray(), n.length ? At.intersect.apply(e3(n.pop()), n) : Xe();
  }, "intersect"), e3.union = p(function(n) {
    return n = Et(n).toArray(), n.length ? At.union.apply(e3(n.pop()), n) : Xe();
  }, "union"), e3.prototype.toString = p(function() {
    return this.__toString("Set {", "}");
  }, "toString"), e3.prototype.has = p(function(n) {
    return this._map.has(n);
  }, "has"), e3.prototype.add = p(function(n) {
    return Er(this, this._map.set(n, n));
  }, "add"), e3.prototype.remove = p(function(n) {
    return Er(this, this._map.remove(n));
  }, "remove"), e3.prototype.clear = p(function() {
    return Er(this, this._map.clear());
  }, "clear"), e3.prototype.map = p(function(n, s) {
    var o5 = this, a = false, u = Er(this, this._map.mapEntries(function(l3) {
      var c = l3[1], _ = n.call(s, c, c, o5);
      return _ !== c && (a = true), [_, _];
    }, s));
    return a ? u : this;
  }, "map"), e3.prototype.union = p(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    return n = n.filter(function(o5) {
      return o5.size !== 0;
    }), n.length === 0 ? this : this.size === 0 && !this.__ownerID && n.length === 1 ? this.constructor(n[0]) : this.withMutations(function(o5) {
      for (var a = 0; a < n.length; a++)
        typeof n[a] == "string" ? o5.add(n[a]) : t4(n[a]).forEach(function(u) {
          return o5.add(u);
        });
    });
  }, "union"), e3.prototype.intersect = p(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t4(a);
    });
    var o5 = [];
    return this.forEach(function(a) {
      n.every(function(u) {
        return u.includes(a);
      }) || o5.push(a);
    }), this.withMutations(function(a) {
      o5.forEach(function(u) {
        a.remove(u);
      });
    });
  }, "intersect"), e3.prototype.subtract = p(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t4(a);
    });
    var o5 = [];
    return this.forEach(function(a) {
      n.some(function(u) {
        return u.includes(a);
      }) && o5.push(a);
    }), this.withMutations(function(a) {
      o5.forEach(function(u) {
        a.remove(u);
      });
    });
  }, "subtract"), e3.prototype.sort = p(function(n) {
    return sr(Te(this, n));
  }, "sort"), e3.prototype.sortBy = p(function(n, s) {
    return sr(Te(this, s, n));
  }, "sortBy"), e3.prototype.wasAltered = p(function() {
    return this._map.wasAltered();
  }, "wasAltered"), e3.prototype.__iterate = p(function(n, s) {
    var o5 = this;
    return this._map.__iterate(function(a) {
      return n(a, a, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    return this._map.__iterator(n, s);
  }, "__iterator"), e3.prototype.__ensureOwner = p(function(n) {
    if (n === this.__ownerID)
      return this;
    var s = this._map.__ensureOwner(n);
    return n ? this.__make(s, n) : this.size === 0 ? this.__empty() : (this.__ownerID = n, this._map = s, this);
  }, "__ensureOwner"), e3;
}(Ue);
Dr.isSet = An;
var At = Dr.prototype;
At[ls] = true;
At[or] = At.remove;
At.merge = At.concat = At.union;
At.withMutations = lr;
At.asImmutable = cr;
At["@@transducer/init"] = At.asMutable = fr;
At["@@transducer/step"] = function(t4, e3) {
  return t4.add(e3);
};
At["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
At.__empty = Xe;
At.__make = hs;
function Er(t4, e3) {
  return t4.__ownerID ? (t4.size = e3.size, t4._map = e3, t4) : e3 === t4._map ? t4 : e3.size === 0 ? t4.__empty() : t4.__make(e3);
}
p(Er, "updateSet");
function hs(t4, e3) {
  var r3 = Object.create(At);
  return r3.size = t4 ? t4.size : 0, r3._map = t4, r3.__ownerID = e3, r3;
}
p(hs, "makeSet");
var gi;
function Xe() {
  return gi || (gi = hs(ee()));
}
p(Xe, "emptySet");
var Jo = function(t4) {
  function e3(r3, n, s) {
    if (!(this instanceof e3))
      return new e3(r3, n, s);
    if (_n(s !== 0, "Cannot step a Range by 0"), r3 = r3 || 0, n === void 0 && (n = 1 / 0), s = s === void 0 ? 1 : Math.abs(s), n < r3 && (s = -s), this._start = r3, this._end = n, this._step = s, this.size = Math.max(0, Math.ceil((n - r3) / s - 1) + 1), this.size === 0) {
      if (Hr)
        return Hr;
      Hr = this;
    }
  }
  return p(e3, "Range"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toString = p(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), e3.prototype.get = p(function(n, s) {
    return this.has(n) ? this._start + me(this, n) * this._step : s;
  }, "get"), e3.prototype.includes = p(function(n) {
    var s = (n - this._start) / this._step;
    return s >= 0 && s < this.size && s === Math.floor(s);
  }, "includes"), e3.prototype.slice = p(function(n, s) {
    return Mr(n, s, this.size) ? this : (n = ar(n, this.size), s = xr(s, this.size), s <= n ? new e3(0, 0) : new e3(this.get(n, this._end), this.get(s, this._end), this._step));
  }, "slice"), e3.prototype.indexOf = p(function(n) {
    var s = n - this._start;
    if (s % this._step === 0) {
      var o5 = s / this._step;
      if (o5 >= 0 && o5 < this.size)
        return o5;
    }
    return -1;
  }, "indexOf"), e3.prototype.lastIndexOf = p(function(n) {
    return this.indexOf(n);
  }, "lastIndexOf"), e3.prototype.__iterate = p(function(n, s) {
    for (var o5 = this.size, a = this._step, u = s ? this._start + (o5 - 1) * a : this._start, l3 = 0; l3 !== o5 && n(u, s ? o5 - ++l3 : l3++, this) !== false; )
      u += s ? -a : a;
    return l3;
  }, "__iterate"), e3.prototype.__iterator = p(function(n, s) {
    var o5 = this.size, a = this._step, u = s ? this._start + (o5 - 1) * a : this._start, l3 = 0;
    return new lt(function() {
      if (l3 === o5)
        return Ft();
      var c = u;
      return u += s ? -a : a, yt(n, s ? o5 - ++l3 : l3++, c);
    });
  }, "__iterator"), e3.prototype.equals = p(function(n) {
    return n instanceof e3 ? this._start === n._start && this._end === n._end && this._step === n._step : cs(this, n);
  }, "equals"), e3;
}(ie);
var Hr;
function ps(t4, e3, r3) {
  for (var n = Ki(e3), s = 0; s !== n.length; )
    if (t4 = Yi(t4, n[s++], ot), t4 === ot)
      return r3;
  return t4;
}
p(ps, "getIn$1");
function ds(t4, e3) {
  return ps(this, t4, e3);
}
p(ds, "getIn");
function Ho(t4, e3) {
  return ps(t4, e3, ot) !== ot;
}
p(Ho, "hasIn$1");
function Ko(t4) {
  return Ho(this, t4);
}
p(Ko, "hasIn");
function _s() {
  Kt(this.size);
  var t4 = {};
  return this.__iterate(function(e3, r3) {
    t4[r3] = e3;
  }), t4;
}
p(_s, "toObject");
Et.isIterable = Nt;
Et.isKeyed = vt;
Et.isIndexed = Ut;
Et.isAssociative = Ar;
Et.isOrdered = re;
Et.Iterator = lt;
Ie(Et, { toArray: p(function() {
  Kt(this.size);
  var e3 = new Array(this.size || 0), r3 = vt(this), n = 0;
  return this.__iterate(function(s, o5) {
    e3[n++] = r3 ? [o5, s] : s;
  }), e3;
}, "toArray"), toIndexedSeq: p(function() {
  return new Ni(this);
}, "toIndexedSeq"), toJS: p(function() {
  return jr(this);
}, "toJS$1"), toKeyedSeq: p(function() {
  return new zr(this, true);
}, "toKeyedSeq"), toMap: p(function() {
  return We(this.toKeyedSeq());
}, "toMap"), toObject: _s, toOrderedMap: p(function() {
  return he(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: p(function() {
  return sr(vt(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: p(function() {
  return Dr(vt(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: p(function() {
  return new Fi(this);
}, "toSetSeq"), toSeq: p(function() {
  return Ut(this) ? this.toIndexedSeq() : vt(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: p(function() {
  return xn(vt(this) ? this.valueSeq() : this);
}, "toStack"), toList: p(function() {
  return Pr(vt(this) ? this.valueSeq() : this);
}, "toList"), toString: p(function() {
  return "[Collection]";
}, "toString"), __toString: p(function(e3, r3) {
  return this.size === 0 ? e3 + r3 : e3 + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + r3;
}, "__toString"), concat: p(function() {
  for (var e3 = [], r3 = arguments.length; r3--; )
    e3[r3] = arguments[r3];
  return ht(this, Oo(this, e3));
}, "concat"), includes: p(function(e3) {
  return this.some(function(r3) {
    return Bt(r3, e3);
  });
}, "includes"), entries: p(function() {
  return this.__iterator(Yt);
}, "entries"), every: p(function(e3, r3) {
  Kt(this.size);
  var n = true;
  return this.__iterate(function(s, o5, a) {
    if (!e3.call(r3, s, o5, a))
      return n = false, false;
  }), n;
}, "every"), filter: p(function(e3, r3) {
  return ht(this, Wi(this, e3, r3, true));
}, "filter"), partition: p(function(e3, r3) {
  return So(this, e3, r3);
}, "partition"), find: p(function(e3, r3, n) {
  var s = this.findEntry(e3, r3);
  return s ? s[1] : n;
}, "find"), forEach: p(function(e3, r3) {
  return Kt(this.size), this.__iterate(r3 ? e3.bind(r3) : e3);
}, "forEach"), join: p(function(e3) {
  Kt(this.size), e3 = e3 !== void 0 ? "" + e3 : ",";
  var r3 = "", n = true;
  return this.__iterate(function(s) {
    n ? n = false : r3 += e3, r3 += s != null ? s.toString() : "";
  }), r3;
}, "join"), keys: p(function() {
  return this.__iterator(ur);
}, "keys"), map: p(function(e3, r3) {
  return ht(this, Bi(this, e3, r3));
}, "map"), reduce: p(function(e3, r3, n) {
  return vi(this, e3, r3, n, arguments.length < 2, false);
}, "reduce$1"), reduceRight: p(function(e3, r3, n) {
  return vi(this, e3, r3, n, arguments.length < 2, true);
}, "reduceRight"), reverse: p(function() {
  return ht(this, cn(this, true));
}, "reverse"), slice: p(function(e3, r3) {
  return ht(this, hn(this, e3, r3, true));
}, "slice"), some: p(function(e3, r3) {
  return !this.every(Or(e3), r3);
}, "some"), sort: p(function(e3) {
  return ht(this, Te(this, e3));
}, "sort"), values: p(function() {
  return this.__iterator(ne);
}, "values"), butLast: p(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: p(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: p(function(e3, r3) {
  return Re(e3 ? this.toSeq().filter(e3, r3) : this);
}, "count"), countBy: p(function(e3, r3) {
  return wo(this, e3, r3);
}, "countBy"), equals: p(function(e3) {
  return cs(this, e3);
}, "equals"), entrySeq: p(function() {
  var e3 = this;
  if (e3._cache)
    return new Ee(e3._cache);
  var r3 = e3.toSeq().map(Go).toIndexedSeq();
  return r3.fromEntrySeq = function() {
    return e3.toSeq();
  }, r3;
}, "entrySeq"), filterNot: p(function(e3, r3) {
  return this.filter(Or(e3), r3);
}, "filterNot"), findEntry: p(function(e3, r3, n) {
  var s = n;
  return this.__iterate(function(o5, a, u) {
    if (e3.call(r3, o5, a, u))
      return s = [a, o5], false;
  }), s;
}, "findEntry"), findKey: p(function(e3, r3) {
  var n = this.findEntry(e3, r3);
  return n && n[0];
}, "findKey"), findLast: p(function(e3, r3, n) {
  return this.toKeyedSeq().reverse().find(e3, r3, n);
}, "findLast"), findLastEntry: p(function(e3, r3, n) {
  return this.toKeyedSeq().reverse().findEntry(e3, r3, n);
}, "findLastEntry"), findLastKey: p(function(e3, r3) {
  return this.toKeyedSeq().reverse().findKey(e3, r3);
}, "findLastKey"), first: p(function(e3) {
  return this.find(Oi, null, e3);
}, "first"), flatMap: p(function(e3, r3) {
  return ht(this, Io(this, e3, r3));
}, "flatMap"), flatten: p(function(e3) {
  return ht(this, Ji(this, e3, true));
}, "flatten"), fromEntrySeq: p(function() {
  return new qi(this);
}, "fromEntrySeq"), get: p(function(e3, r3) {
  return this.find(function(n, s) {
    return Bt(s, e3);
  }, void 0, r3);
}, "get"), getIn: ds, groupBy: p(function(e3, r3) {
  return bo(this, e3, r3);
}, "groupBy"), has: p(function(e3) {
  return this.get(e3, ot) !== ot;
}, "has"), hasIn: Ko, isSubset: p(function(e3) {
  return e3 = typeof e3.includes == "function" ? e3 : Et(e3), this.every(function(r3) {
    return e3.includes(r3);
  });
}, "isSubset"), isSuperset: p(function(e3) {
  return e3 = typeof e3.isSubset == "function" ? e3 : Et(e3), e3.isSubset(this);
}, "isSuperset"), keyOf: p(function(e3) {
  return this.findKey(function(r3) {
    return Bt(r3, e3);
  });
}, "keyOf"), keySeq: p(function() {
  return this.toSeq().map(Yo).toIndexedSeq();
}, "keySeq"), last: p(function(e3) {
  return this.toSeq().reverse().first(e3);
}, "last"), lastKeyOf: p(function(e3) {
  return this.toKeyedSeq().reverse().keyOf(e3);
}, "lastKeyOf"), max: p(function(e3) {
  return wr(this, e3);
}, "max"), maxBy: p(function(e3, r3) {
  return wr(this, r3, e3);
}, "maxBy"), min: p(function(e3) {
  return wr(this, e3 ? yi(e3) : bi);
}, "min"), minBy: p(function(e3, r3) {
  return wr(this, r3 ? yi(r3) : bi, e3);
}, "minBy"), rest: p(function() {
  return this.slice(1);
}, "rest"), skip: p(function(e3) {
  return e3 === 0 ? this : this.slice(Math.max(0, e3));
}, "skip"), skipLast: p(function(e3) {
  return e3 === 0 ? this : this.slice(0, -Math.max(0, e3));
}, "skipLast"), skipWhile: p(function(e3, r3) {
  return ht(this, Vi(this, e3, r3, true));
}, "skipWhile"), skipUntil: p(function(e3, r3) {
  return this.skipWhile(Or(e3), r3);
}, "skipUntil"), sortBy: p(function(e3, r3) {
  return ht(this, Te(this, r3, e3));
}, "sortBy"), take: p(function(e3) {
  return this.slice(0, Math.max(0, e3));
}, "take"), takeLast: p(function(e3) {
  return this.slice(-Math.max(0, e3));
}, "takeLast"), takeWhile: p(function(e3, r3) {
  return ht(this, Eo(this, e3, r3));
}, "takeWhile"), takeUntil: p(function(e3, r3) {
  return this.takeWhile(Or(e3), r3);
}, "takeUntil"), update: p(function(e3) {
  return e3(this);
}, "update"), valueSeq: p(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: p(function() {
  return this.__hash || (this.__hash = Qo(this));
}, "hashCode") });
var $t = Et.prototype;
$t[ji] = true;
$t[Rr] = $t.values;
$t.toJSON = $t.toArray;
$t.__toStringMapper = tr;
$t.inspect = $t.toSource = function() {
  return this.toString();
};
$t.chain = $t.flatMap;
$t.contains = $t.includes;
Ie(Gt, { flip: p(function() {
  return ht(this, Li(this));
}, "flip"), mapEntries: p(function(e3, r3) {
  var n = this, s = 0;
  return ht(this, this.toSeq().map(function(o5, a) {
    return e3.call(r3, [a, o5], s++, n);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: p(function(e3, r3) {
  var n = this;
  return ht(this, this.toSeq().flip().map(function(s, o5) {
    return e3.call(r3, s, o5, n);
  }).flip());
}, "mapKeys") });
var hr = Gt.prototype;
hr[Mi] = true;
hr[Rr] = $t.entries;
hr.toJSON = _s;
hr.__toStringMapper = function(t4, e3) {
  return tr(e3) + ": " + tr(t4);
};
Ie(Oe, { toKeyedSeq: p(function() {
  return new zr(this, false);
}, "toKeyedSeq"), filter: p(function(e3, r3) {
  return ht(this, Wi(this, e3, r3, false));
}, "filter"), findIndex: p(function(e3, r3) {
  var n = this.findEntry(e3, r3);
  return n ? n[0] : -1;
}, "findIndex"), indexOf: p(function(e3) {
  var r3 = this.keyOf(e3);
  return r3 === void 0 ? -1 : r3;
}, "indexOf"), lastIndexOf: p(function(e3) {
  var r3 = this.lastKeyOf(e3);
  return r3 === void 0 ? -1 : r3;
}, "lastIndexOf"), reverse: p(function() {
  return ht(this, cn(this, false));
}, "reverse"), slice: p(function(e3, r3) {
  return ht(this, hn(this, e3, r3, false));
}, "slice"), splice: p(function(e3, r3) {
  var n = arguments.length;
  if (r3 = Math.max(r3 || 0, 0), n === 0 || n === 2 && !r3)
    return this;
  e3 = ar(e3, e3 < 0 ? this.count() : this.size);
  var s = this.slice(0, e3);
  return ht(this, n === 1 ? s : s.concat(ae(arguments, 2), this.slice(e3 + r3)));
}, "splice"), findLastIndex: p(function(e3, r3) {
  var n = this.findLastEntry(e3, r3);
  return n ? n[0] : -1;
}, "findLastIndex"), first: p(function(e3) {
  return this.get(0, e3);
}, "first"), flatten: p(function(e3) {
  return ht(this, Ji(this, e3, false));
}, "flatten"), get: p(function(e3, r3) {
  return e3 = me(this, e3), e3 < 0 || this.size === 1 / 0 || this.size !== void 0 && e3 > this.size ? r3 : this.find(function(n, s) {
    return s === e3;
  }, void 0, r3);
}, "get"), has: p(function(e3) {
  return e3 = me(this, e3), e3 >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || e3 < this.size : this.indexOf(e3) !== -1);
}, "has"), interpose: p(function(e3) {
  return ht(this, ko(this, e3));
}, "interpose"), interleave: p(function() {
  var e3 = [this].concat(ae(arguments)), r3 = br(this.toSeq(), ie.of, e3), n = r3.flatten(true);
  return r3.size && (n.size = r3.size * e3.length), ht(this, n);
}, "interleave"), keySeq: p(function() {
  return Jo(0, this.size);
}, "keySeq"), last: p(function(e3) {
  return this.get(-1, e3);
}, "last"), skipWhile: p(function(e3, r3) {
  return ht(this, Vi(this, e3, r3, false));
}, "skipWhile"), zip: p(function() {
  var e3 = [this].concat(ae(arguments));
  return ht(this, br(this, wi, e3));
}, "zip"), zipAll: p(function() {
  var e3 = [this].concat(ae(arguments));
  return ht(this, br(this, wi, e3, true));
}, "zipAll"), zipWith: p(function(e3) {
  var r3 = ae(arguments);
  return r3[0] = this, ht(this, br(this, e3, r3));
}, "zipWith") });
var Ve = Oe.prototype;
Ve[xi] = true;
Ve[Fe] = true;
Ie(Ue, { get: p(function(e3, r3) {
  return this.has(e3) ? e3 : r3;
}, "get"), includes: p(function(e3) {
  return this.has(e3);
}, "includes"), keySeq: p(function() {
  return this.valueSeq();
}, "keySeq") });
var De = Ue.prototype;
De.has = $t.includes;
De.contains = De.includes;
De.keys = De.values;
Ie(ve, hr);
Ie(ie, Ve);
Ie(Le, De);
function vi(t4, e3, r3, n, s, o5) {
  return Kt(t4.size), t4.__iterate(function(a, u, l3) {
    s ? (s = false, r3 = a) : r3 = e3.call(n, r3, a, u, l3);
  }, o5), r3;
}
p(vi, "reduce");
function Yo(t4, e3) {
  return e3;
}
p(Yo, "keyMapper");
function Go(t4, e3) {
  return [e3, t4];
}
p(Go, "entryMapper");
function Or(t4) {
  return function() {
    return !t4.apply(this, arguments);
  };
}
p(Or, "not");
function yi(t4) {
  return function() {
    return -t4.apply(this, arguments);
  };
}
p(yi, "neg");
function wi() {
  return ae(arguments);
}
p(wi, "defaultZipper");
function bi(t4, e3) {
  return t4 < e3 ? 1 : t4 > e3 ? -1 : 0;
}
p(bi, "defaultNegComparator");
function Qo(t4) {
  if (t4.size === 1 / 0)
    return 0;
  var e3 = re(t4), r3 = vt(t4), n = e3 ? 1 : 0, s = t4.__iterate(r3 ? e3 ? function(o5, a) {
    n = 31 * n + Si(Lt(o5), Lt(a)) | 0;
  } : function(o5, a) {
    n = n + Si(Lt(o5), Lt(a)) | 0;
  } : e3 ? function(o5) {
    n = 31 * n + Lt(o5) | 0;
  } : function(o5) {
    n = n + Lt(o5) | 0;
  });
  return Xo(s, n);
}
p(Qo, "hashCollection");
function Xo(t4, e3) {
  return e3 = Ye(e3, 3432918353), e3 = Ye(e3 << 15 | e3 >>> -15, 461845907), e3 = Ye(e3 << 13 | e3 >>> -13, 5), e3 = (e3 + 3864292196 | 0) ^ t4, e3 = Ye(e3 ^ e3 >>> 16, 2246822507), e3 = Ye(e3 ^ e3 >>> 13, 3266489909), e3 = $r(e3 ^ e3 >>> 16), e3;
}
p(Xo, "murmurHashOfSize");
function Si(t4, e3) {
  return t4 ^ e3 + 2654435769 + (t4 << 6) + (t4 >> 2) | 0;
}
p(Si, "hashMerge");
var sr = function(t4) {
  function e3(r3) {
    return r3 == null ? rn() : fs(r3) ? r3 : rn().withMutations(function(n) {
      var s = Ue(r3);
      Kt(s.size), s.forEach(function(o5) {
        return n.add(o5);
      });
    });
  }
  return p(e3, "OrderedSet"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p(function() {
    return this(arguments);
  }, "of"), e3.fromKeys = p(function(n) {
    return this(Gt(n).keySeq());
  }, "fromKeys"), e3.prototype.toString = p(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), e3;
}(Dr);
sr.isOrderedSet = fs;
var ke = sr.prototype;
ke[Fe] = true;
ke.zip = Ve.zip;
ke.zipWith = Ve.zipWith;
ke.zipAll = Ve.zipAll;
ke.__empty = rn;
ke.__make = ms;
function ms(t4, e3) {
  var r3 = Object.create(ke);
  return r3.size = t4 ? t4.size : 0, r3._map = t4, r3.__ownerID = e3, r3;
}
p(ms, "makeOrderedSet");
var Ei;
function rn() {
  return Ei || (Ei = ms(Ge()));
}
p(rn, "emptyOrderedSet");
function Zo(t4) {
  if (Ne(t4))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (ue(t4))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t4 === null || typeof t4 != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
p(Zo, "throwOnInvalidDefaultValues");
var wt = p(function(e3, r3) {
  var n;
  Zo(e3);
  var s = p(function(u) {
    var l3 = this;
    if (u instanceof s)
      return u;
    if (!(this instanceof s))
      return new s(u);
    if (!n) {
      n = true;
      var c = Object.keys(e3), _ = o5._indices = {};
      o5._name = r3, o5._keys = c, o5._defaultValues = e3;
      for (var p3 = 0; p3 < c.length; p3++) {
        var w3 = c[p3];
        _[w3] = p3, o5[w3] ? typeof console == "object" && console.warn && console.warn("Cannot define " + Tn(this) + ' with property "' + w3 + '" since that property name is part of the Record API.') : ta(o5, w3);
      }
    }
    return this.__ownerID = void 0, this._values = Pr().withMutations(function(v) {
      v.setSize(l3._keys.length), Gt(u).forEach(function(y, b3) {
        v.set(l3._indices[b3], y === l3._defaultValues[b3] ? void 0 : y);
      });
    }), this;
  }, "Record"), o5 = s.prototype = Object.create(dt);
  return o5.constructor = s, r3 && (s.displayName = r3), s;
}, "Record");
wt.prototype.toString = p(function() {
  for (var e3 = Tn(this) + " { ", r3 = this._keys, n, s = 0, o5 = r3.length; s !== o5; s++)
    n = r3[s], e3 += (s ? ", " : "") + n + ": " + tr(this.get(n));
  return e3 + " }";
}, "toString");
wt.prototype.equals = p(function(e3) {
  return this === e3 || Ne(e3) && Ce(this).equals(Ce(e3));
}, "equals");
wt.prototype.hashCode = p(function() {
  return Ce(this).hashCode();
}, "hashCode");
wt.prototype.has = p(function(e3) {
  return this._indices.hasOwnProperty(e3);
}, "has");
wt.prototype.get = p(function(e3, r3) {
  if (!this.has(e3))
    return r3;
  var n = this._indices[e3], s = this._values.get(n);
  return s === void 0 ? this._defaultValues[e3] : s;
}, "get");
wt.prototype.set = p(function(e3, r3) {
  if (this.has(e3)) {
    var n = this._values.set(this._indices[e3], r3 === this._defaultValues[e3] ? void 0 : r3);
    if (n !== this._values && !this.__ownerID)
      return Rn(this, n);
  }
  return this;
}, "set");
wt.prototype.remove = p(function(e3) {
  return this.set(e3);
}, "remove");
wt.prototype.clear = p(function() {
  var e3 = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : Rn(this, e3);
}, "clear");
wt.prototype.wasAltered = p(function() {
  return this._values.wasAltered();
}, "wasAltered");
wt.prototype.toSeq = p(function() {
  return Ce(this);
}, "toSeq");
wt.prototype.toJS = p(function() {
  return jr(this);
}, "toJS$1");
wt.prototype.entries = p(function() {
  return this.__iterator(Yt);
}, "entries");
wt.prototype.__iterator = p(function(e3, r3) {
  return Ce(this).__iterator(e3, r3);
}, "__iterator");
wt.prototype.__iterate = p(function(e3, r3) {
  return Ce(this).__iterate(e3, r3);
}, "__iterate");
wt.prototype.__ensureOwner = p(function(e3) {
  if (e3 === this.__ownerID)
    return this;
  var r3 = this._values.__ensureOwner(e3);
  return e3 ? Rn(this, r3, e3) : (this.__ownerID = e3, this._values = r3, this);
}, "__ensureOwner");
wt.isRecord = Ne;
wt.getDescriptiveName = Tn;
var dt = wt.prototype;
dt[Ri] = true;
dt[or] = dt.remove;
dt.deleteIn = dt.removeIn = gn;
dt.getIn = ds;
dt.hasIn = $t.hasIn;
dt.merge = Xi;
dt.mergeWith = Zi;
dt.mergeIn = Sn;
dt.mergeDeep = es;
dt.mergeDeepWith = rs;
dt.mergeDeepIn = En;
dt.setIn = mn;
dt.update = vn;
dt.updateIn = yn;
dt.withMutations = lr;
dt.asMutable = fr;
dt.asImmutable = cr;
dt[Rr] = dt.entries;
dt.toJSON = dt.toObject = $t.toObject;
dt.inspect = dt.toSource = function() {
  return this.toString();
};
function Rn(t4, e3, r3) {
  var n = Object.create(Object.getPrototypeOf(t4));
  return n._values = e3, n.__ownerID = r3, n;
}
p(Rn, "makeRecord");
function Tn(t4) {
  return t4.constructor.displayName || t4.constructor.name || "Record";
}
p(Tn, "recordName");
function Ce(t4) {
  return un(t4._keys.map(function(e3) {
    return [e3, t4.get(e3)];
  }));
}
p(Ce, "recordSeq");
function ta(t4, e3) {
  try {
    Object.defineProperty(t4, e3, { get: function() {
      return this.get(e3);
    }, set: function(r3) {
      _n(this.__ownerID, "Cannot set on an immutable record."), this.set(e3, r3);
    } });
  } catch {
  }
}
p(ta, "setProp");
o();
var Qt = p((t4) => na(t4).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8), "md5");
function na(t4) {
  let e3 = "0123456789abcdef";
  function r3(Q) {
    let N, W = "";
    for (N = 0; N <= 3; N++)
      W += e3.charAt(Q >> N * 8 + 4 & 15) + e3.charAt(Q >> N * 8 & 15);
    return W;
  }
  p(r3, "rh");
  function n(Q, N) {
    let W = (Q & 65535) + (N & 65535);
    return (Q >> 16) + (N >> 16) + (W >> 16) << 16 | W & 65535;
  }
  p(n, "ad");
  function s(Q, N) {
    return Q << N | Q >>> 32 - N;
  }
  p(s, "rl");
  function o5(Q, N, W, ft, F, Dt) {
    return n(s(n(n(N, Q), n(ft, Dt)), F), W);
  }
  p(o5, "cm");
  function a(Q, N, W, ft, F, Dt, Ct) {
    return o5(N & W | ~N & ft, Q, N, F, Dt, Ct);
  }
  p(a, "ff");
  function u(Q, N, W, ft, F, Dt, Ct) {
    return o5(N & ft | W & ~ft, Q, N, F, Dt, Ct);
  }
  p(u, "gg");
  function l3(Q, N, W, ft, F, Dt, Ct) {
    return o5(N ^ W ^ ft, Q, N, F, Dt, Ct);
  }
  p(l3, "hh");
  function c(Q, N, W, ft, F, Dt, Ct) {
    return o5(W ^ (N | ~ft), Q, N, F, Dt, Ct);
  }
  p(c, "ii");
  function _(Q) {
    let N, W = (Q.length + 8 >> 6) + 1, ft = Array.from({ length: W * 16 });
    for (N = 0; N < W * 16; N++)
      ft[N] = 0;
    for (N = 0; N < Q.length; N++)
      ft[N >> 2] |= Q.charCodeAt(N) << N % 4 * 8;
    return ft[N >> 2] |= 128 << N % 4 * 8, ft[W * 16 - 2] = Q.length * 8, ft;
  }
  p(_, "sb");
  let p3, w3 = _(t4), v = 1732584193, y = -271733879, b3 = -1732584194, k3 = 271733878, X, K, ct, pt;
  for (p3 = 0; p3 < w3.length; p3 += 16)
    X = v, K = y, ct = b3, pt = k3, v = a(v, y, b3, k3, w3[p3 + 0], 7, -680876936), k3 = a(k3, v, y, b3, w3[p3 + 1], 12, -389564586), b3 = a(b3, k3, v, y, w3[p3 + 2], 17, 606105819), y = a(y, b3, k3, v, w3[p3 + 3], 22, -1044525330), v = a(v, y, b3, k3, w3[p3 + 4], 7, -176418897), k3 = a(k3, v, y, b3, w3[p3 + 5], 12, 1200080426), b3 = a(b3, k3, v, y, w3[p3 + 6], 17, -1473231341), y = a(y, b3, k3, v, w3[p3 + 7], 22, -45705983), v = a(v, y, b3, k3, w3[p3 + 8], 7, 1770035416), k3 = a(k3, v, y, b3, w3[p3 + 9], 12, -1958414417), b3 = a(b3, k3, v, y, w3[p3 + 10], 17, -42063), y = a(y, b3, k3, v, w3[p3 + 11], 22, -1990404162), v = a(v, y, b3, k3, w3[p3 + 12], 7, 1804603682), k3 = a(k3, v, y, b3, w3[p3 + 13], 12, -40341101), b3 = a(b3, k3, v, y, w3[p3 + 14], 17, -1502002290), y = a(y, b3, k3, v, w3[p3 + 15], 22, 1236535329), v = u(v, y, b3, k3, w3[p3 + 1], 5, -165796510), k3 = u(k3, v, y, b3, w3[p3 + 6], 9, -1069501632), b3 = u(b3, k3, v, y, w3[p3 + 11], 14, 643717713), y = u(y, b3, k3, v, w3[p3 + 0], 20, -373897302), v = u(v, y, b3, k3, w3[p3 + 5], 5, -701558691), k3 = u(k3, v, y, b3, w3[p3 + 10], 9, 38016083), b3 = u(b3, k3, v, y, w3[p3 + 15], 14, -660478335), y = u(y, b3, k3, v, w3[p3 + 4], 20, -405537848), v = u(v, y, b3, k3, w3[p3 + 9], 5, 568446438), k3 = u(k3, v, y, b3, w3[p3 + 14], 9, -1019803690), b3 = u(b3, k3, v, y, w3[p3 + 3], 14, -187363961), y = u(y, b3, k3, v, w3[p3 + 8], 20, 1163531501), v = u(v, y, b3, k3, w3[p3 + 13], 5, -1444681467), k3 = u(k3, v, y, b3, w3[p3 + 2], 9, -51403784), b3 = u(b3, k3, v, y, w3[p3 + 7], 14, 1735328473), y = u(y, b3, k3, v, w3[p3 + 12], 20, -1926607734), v = l3(v, y, b3, k3, w3[p3 + 5], 4, -378558), k3 = l3(k3, v, y, b3, w3[p3 + 8], 11, -2022574463), b3 = l3(b3, k3, v, y, w3[p3 + 11], 16, 1839030562), y = l3(y, b3, k3, v, w3[p3 + 14], 23, -35309556), v = l3(v, y, b3, k3, w3[p3 + 1], 4, -1530992060), k3 = l3(k3, v, y, b3, w3[p3 + 4], 11, 1272893353), b3 = l3(b3, k3, v, y, w3[p3 + 7], 16, -155497632), y = l3(y, b3, k3, v, w3[p3 + 10], 23, -1094730640), v = l3(v, y, b3, k3, w3[p3 + 13], 4, 681279174), k3 = l3(k3, v, y, b3, w3[p3 + 0], 11, -358537222), b3 = l3(b3, k3, v, y, w3[p3 + 3], 16, -722521979), y = l3(y, b3, k3, v, w3[p3 + 6], 23, 76029189), v = l3(v, y, b3, k3, w3[p3 + 9], 4, -640364487), k3 = l3(k3, v, y, b3, w3[p3 + 12], 11, -421815835), b3 = l3(b3, k3, v, y, w3[p3 + 15], 16, 530742520), y = l3(y, b3, k3, v, w3[p3 + 2], 23, -995338651), v = c(v, y, b3, k3, w3[p3 + 0], 6, -198630844), k3 = c(k3, v, y, b3, w3[p3 + 7], 10, 1126891415), b3 = c(b3, k3, v, y, w3[p3 + 14], 15, -1416354905), y = c(y, b3, k3, v, w3[p3 + 5], 21, -57434055), v = c(v, y, b3, k3, w3[p3 + 12], 6, 1700485571), k3 = c(k3, v, y, b3, w3[p3 + 3], 10, -1894986606), b3 = c(b3, k3, v, y, w3[p3 + 10], 15, -1051523), y = c(y, b3, k3, v, w3[p3 + 1], 21, -2054922799), v = c(v, y, b3, k3, w3[p3 + 8], 6, 1873313359), k3 = c(k3, v, y, b3, w3[p3 + 15], 10, -30611744), b3 = c(b3, k3, v, y, w3[p3 + 6], 15, -1560198380), y = c(y, b3, k3, v, w3[p3 + 13], 21, 1309151649), v = c(v, y, b3, k3, w3[p3 + 4], 6, -145523070), k3 = c(k3, v, y, b3, w3[p3 + 11], 10, -1120210379), b3 = c(b3, k3, v, y, w3[p3 + 2], 15, 718787259), y = c(y, b3, k3, v, w3[p3 + 9], 21, -343485551), v = n(v, X), y = n(y, K), b3 = n(b3, ct), k3 = n(k3, pt);
  return r3(v) + r3(y) + r3(b3) + r3(k3);
}
p(na, "md5FULL");
o();
o();
var Is = t2(Os(), 1);
function ks(t4, e3) {
  return (0, Is.default)(t4, e3).map((s) => s[0] === 1 ? s : [s[0], s[1].length]);
}
p(ks, "createDelta");
function Dn(t4, e3) {
  let r3 = "", n = 0;
  for (let s of e3) {
    let o5 = s[0], a = s[1];
    s[0] === -1 && typeof a == "number" ? n += a : o5 == 0 && typeof a == "number" ? r3 += t4.slice(n, n += a) : r3 += a;
  }
  return r3;
}
p(Dn, "applyPatch");
o();
o();
var dr = t2(js(), 1);
o();
o();
var Ur = { init: false, initialize: (t4) => Ur.init === false ? Ur.init = (0, dr.initialize)({ wasmURL: new URL($, t4 + "/src/").toString() }) : Ur.init };
var xs = p(async (t4, e3, r3) => {
  let n = Ur.initialize(r3);
  n !== true && await n;
  let s = await (0, dr.transform)(t4, { ...e3, define: { ...ca, ...e3?.define ? e3.define : {} } });
  return { code: `/*${Qt(t4)}*/` + s.code };
}, "initAndTransform");
var ca = { "process.env.NODE_ENV": '"development"', "process.env.NODE_DEBUG": JSON.stringify(false), "process.browser": JSON.stringify(true), "process.env.DEBUG": JSON.stringify(true), isBrowser: JSON.stringify(true), isJest: JSON.stringify(false), "process.env.version": '"1.1.1"', global: "globalThis", WORKER_DOM_DEBUG: JSON.stringify(false), "process.env.DUMP_SESSION_KEYS": JSON.stringify(false), process: JSON.stringify({ env: { NODE_ENV: "development", browser: true, NODE_DEBUG: false, DEBUG: true, isBrowser: true }, browser: true }) };
async function Ms(t4, e3) {
  return (await xs(t4, { loader: "tsx", format: "esm", treeShaking: true, platform: "browser", minify: false, keepNames: true, tsconfigRaw: { compilerOptions: { jsx: "react-jsx", useDefineForClassFields: false, jsxFragmentFactory: "Fragment", jsxImportSource: "@emotion/react" } }, target: "es2022" }, e3)).code;
}
p(Ms, "esmTransform");
var du = { imports: g2.imports };
function _u(t4, e3) {
  let r3 = { syncDb: async (n, s, o5) => {
    let { getItem: a, setItem: u } = r3;
    return await p(async (c, _, p3) => await da(u, a, c, _, p3), "syncDb")(n, s, o5);
  }, getItem: async (n) => await (await e3(t4)).getItem(n), setItem: async (n, s) => await (await e3(t4)).setItem(n, s) };
  return r3;
}
p(_u, "db");
function ha(t4, e3) {
  return wt({ ...e3, room: t4, state: wt(e3.state)() });
}
p(ha, "initSession");
var pa = new Ke();
var da = p(async (t4, e3, r3, n, s) => {
  pa.runExclusive(async () => {
    let o5 = p((_, p3) => t4("#" + String(_), p3), "setItem"), a = p((_) => e3("#" + String(_)), "getItem"), u = wt(r3)().hashCode(), l3 = await e3("head");
    l3 || (await o5(u, r3), await t4("head", u), l3 = u), await o5(s.newHash, { ...n, oldHash: s.oldHash, reversePatch: s.reversePatch });
    let c = await a(l3);
    await o5(l3, { newHash: s.newHash, patch: s.patch, ...c ? { i: c.i, oldHash: c.oldHash, reversePatch: c.reversePatch } : { code: r3.code, transpiled: r3.transpiled, html: r3.html, css: r3.css } }), await t4("head", s.newHash);
  });
}, "syncStorage");
var Vt = {};
var ye = {};
var Nr = class {
  constructor(e3, r3) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      let e4 = this.session.get("state"), r4 = e4.hashCode();
      return ye[r4] = e4, r4;
    };
    this.createPatchFromHashCode = (e4, r4) => {
      let n2 = JSON.parse(Je(r4));
      ye[Fr(this.room)] = this.session.get("state");
      let s = ye[e4], o5 = e4, a = Je(s.toJSON()), u = s.merge(n2), l3 = Je(u.toJSON()).split(Qt(u.get("transpiled"))).join("css"), c = this.session.get("state").merge(JSON.parse(l3)), _ = c.hashCode();
      ye[_] = c;
      let p3 = As(a, l3), w3 = As(l3, a);
      return { oldHash: o5, newHash: _, reversePatch: w3, patch: p3 };
    };
    this.patchSync = (e4, r4 = false) => {
      if (!r4) {
        if (e4.code !== this.session.get("state").code && e4.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (e4.i, e4.i < this.session.get("state").i && (console.log("never going back!"), e4.i = this.session.get("state").i + 1), e4.code !== this.session.get("state").code && e4.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (e4.transpiled.slice(0, 12) !== `/*${Qt(e4.code)}*/`)
          throw console.error(`missing: /*${Qt(e4.code)}*/, transpiled: ${e4.transpiled.slice(0, 12)}`), new Error("transpiled	hack issue");
        if (e4.code.length < 5)
          throw new Error("code deleted?");
        if (e4.html.indexOf(Qt(e4.transpiled)) === -1)
          throw console.error(`missing md5trans from html: ${Qt(e4.transpiled)}
      ${e4.html.slice(0, 64)}
      
      `), new Error(`render hack issue missing: ${Qt(e4.transpiled)}.`);
        if (e4.css.length && e4.css.indexOf(Qt(e4.transpiled)) === -1)
          throw console.error(`missing from css: ${Qt(e4.transpiled)}`), new Error(`render hack issue missing: ${Qt(e4.transpiled)}.`);
      }
      let n2 = this.session.get("state").hashCode();
      return this.session = this.session.set("state", this.session.get("state").merge(e4)), this.session.get("state").hashCode() !== n2 && r4 !== true && this.update(), this.session;
    };
    this.applyPatch = ({ oldHash: e4, newHash: r4, patch: n2 }) => {
      if (!(e4 && r4 && n2.length))
        return;
      ye[Fr(this.room)] = this.session.get("state");
      let s = ye[e4];
      if (!s)
        throw new Error(`cant find old record: ${e4}`);
      let o5 = Je(s.toJSON()), a = Dn(o5, n2), u = JSON.parse(a), l3 = this.session.get("state").merge(u), c = this.session.get("state").merge(l3);
      if (c.hashCode() === r4)
        this.session = this.session.set("state", c), ye[r4] = this.session.get("state");
      else
        throw new Error("Wrong patch");
      return r4;
    };
    Vt[e3] = this, this.room = e3;
    let n = null;
    this.session = ha(e3, { ...r3, state: n || JSON.parse(Je({ ...r3.state, codeSpace: e3 })) })(), ye[Fr(e3)] = this.session.get("state");
  }
  update() {
    Object.keys(this.cb).map((e3) => this.cb[e3]).map((e3) => {
      try {
        e3();
      } catch (r3) {
        console.error("error calling callback", { err: r3 });
      }
    });
  }
  onUpdate(e3, r3) {
    this.cb[r3] = e3;
  }
  json() {
    let e3 = this.session.toJSON(), r3 = e3.state.toJSON();
    return { ...e3, state: r3 };
  }
  setRoom(e3) {
    let r3 = this.session.set("room", e3);
    this.session = r3;
  }
};
p(Nr, "CodeSession");
var Fr = p((t4) => Vt[t4]?.session.get("state").hashCode(), "hashKEY");
function mu(t4, e3) {
  if (e3 && e3.length) {
    let r3 = Vt[t4]?.session.get("state").toJSON(), { i: n, transpiled: s, code: o5, html: a, css: u } = e3 ? JSON.parse(Dn(Je(r3), e3)) : r3;
    return Vt[t4]?.session.get("state").merge({ i: n, transpiled: s, code: o5, html: a, css: u, codeSpace: t4 }).toObject();
  }
  return Vt[t4].session.get("state").toObject();
}
p(mu, "mST");
function Je(t4) {
  let { i: e3, transpiled: r3, code: n, html: s, css: o5 } = t4;
  return JSON.stringify({ i: e3, transpiled: r3, code: n, html: s, css: o5 });
}
p(Je, "string_");
var gu = p((t4, e3) => Vt[e3]?.applyPatch(t4), "applyPatchSync");
var vu = p((t4, e3) => {
  Vt[e3]?.applyPatch(t4), Vt[e3]?.update();
}, "applyPatch");
var yu = p((t4, e3 = "default", r3) => Vt[r3]?.onUpdate(t4, e3), "onSessionUpdate");
var _a = p((t4, e3, r3) => ({ codeSpace: r3, i: e3.i, ...Vt[r3]?.createPatchFromHashCode(t4, e3) }), "makePatchFrom");
var wu = p((t4, e3) => ({ ..._a(Fr(e3), t4, e3), codeSpace: e3, i: t4.i }), "makePatch");
var bu = p((t4, e3) => Vt[t4] || (Vt[t4] = new Nr(t4, { name: e3.name, state: { ...e3.state, codeSpace: t4 } })), "startSession");
function As(t4, e3) {
  return ks(t4, e3);
}
p(As, "createPatch");
var Su = p((t4, e3 = true) => Vt[t4.codeSpace].patchSync(t4, e3), "patchSync");
function Eu(t4) {
  return wt(t4)().hashCode();
}
p(Eu, "hashCode");

// src/staticContent.mjs
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";
var files = JSON.parse(ASSET_MANIFEST);
var ASSET_HASH = Qt(ASSET_MANIFEST);

// ../code/dist/src/chunk-chunk-WVUJHC6X.mjs
var $3 = "./chunk-esbuild-GS5BVJUF.wasm";

// ../code/dist/src/chunk-chunk-TKEPGNJK.mjs
var g3 = Object.create;
var e2 = Object.defineProperty;
var h2 = Object.getOwnPropertyDescriptor;
var i2 = Object.getOwnPropertyNames;
var j2 = Object.getPrototypeOf;
var k2 = Object.prototype.hasOwnProperty;
var p2 = (a, b3) => e2(a, "name", { value: b3, configurable: true });
var q2 = ((a) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(a, { get: (b3, c) => (typeof __require < "u" ? __require : b3)[c] }) : a)(function(a) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + a + '" is not supported');
});
var l2 = (a, b3) => () => (a && (b3 = a(a = 0)), b3);
var r2 = (a, b3) => () => (b3 || a((b3 = { exports: {} }).exports, b3), b3.exports);
var m2 = (a, b3, c, f) => {
  if (b3 && typeof b3 == "object" || typeof b3 == "function")
    for (let d of i2(b3))
      !k2.call(a, d) && d !== c && e2(a, d, { get: () => b3[d], enumerable: !(f = h2(b3, d)) || f.enumerable });
  return a;
};
var t3 = (a, b3, c) => (c = a != null ? g3(j2(a)) : {}, m2(b3 || !a || !a.__esModule ? e2(c, "default", { value: a, enumerable: true }) : c, a));
var w2;
var o3 = l2(() => {
  w2 = { version: "v19.3.0", versions: { node: "v19.3.0" }, env: { NODE_ENV: "production", version: "v19.3.0", browser: true, isWebworker: true, NODE_DEBUG: false, DEBUG: false, isBrowser: true, versions: { node: "v19.3.0" } }, browser: true };
});

// ../code/dist/src/chunk-chunk-XTZ7MHB7.mjs
o3();
var U2 = { "@emotion/react/jsx-runtime": "/src/emotionJsxRuntime.mjs", "react-dom/client": "/src/reactDomClient.mjs", "framer-motion": "/src/motion.mjs", "@emotion/react": "/src/emotion.mjs", "@emotion/cache": "/src/emotionCache.mjs", "@emotion/styled": "/src/emotionStyled.mjs", react: "/src/reactMod.mjs", "react-dom": "/src/reactDom.mjs", "react-error-boundary": "/src/reactMod.mjs", "hydrate.mjs": "/src/hydrate.mjs" };
var R2 = { imports: U2 };
var g4 = R2;
o3();
var $4 = R2.imports;
function b2(s, m3, f, h3 = true, y = false) {
  let t4 = o4(s, 'from"', 'from "');
  if (Object.keys($4).map((n) => {
    let r3 = new URL($4[n], m3).toString();
    h3 && (t4 = o4(t4, ` from "${n}"`, ` from "${r3}"`)), t4 = o4(t4, ' from "/', ` from "${m3}/`);
  }), t4.split("/::").join(m3), !t4)
    return t4;
  let p3 = f || m3, c = new URL(".", p3).toString(), l3 = new URL("..", p3).toString(), d = new URL("../..", p3).toString(), j3 = new URL("../../..", p3).toString();
  t4 = o4(t4, 'reference path="./', `reference path="${c}`), t4 = o4(t4, 'import"', 'import "'), t4 = o4(t4, ' from "../../../', ` from "${j3}`), t4 = o4(t4, 'import("../../../', ` import("${j3}`), t4 = o4(t4, 'import("../../', ` import("${d}`), t4 = o4(t4, 'import("../', ` import("${l3}`), t4 = o4(t4, 'import("./', ` import("${c}`), t4 = o4(t4, 'import "../../../', ` import "${j3}`), t4 = o4(t4, 'import "../../', ` import "${d}`), t4 = o4(t4, 'import "../', ` import "${l3}`), t4 = o4(t4, 'import "./', ` import "${c}`), t4 = o4(t4, ' from "../../', ` from "${d}`), t4 = o4(t4, ' from "../', ` from "${l3}`), t4 = o4(t4, ' from "./', ` from "${c}`);
  let i3;
  return t4 = t4.split(";").map((n) => n.indexOf("import") !== -1 ? n.trim() : n).map((n) => n.split(`
`).map((r3) => {
    if (r3.length === 0 || r3.indexOf("import") === -1)
      return r3;
    if (r3.startsWith("import") && r3.indexOf('"') !== -1 && r3.indexOf("https://") === -1 && r3.indexOf(m3) === -1) {
      let e3 = r3.split('"');
      return e3[1] = m3 + "/" + e3[1] + "?dev&format=es2022", e3.join('"');
    }
    if (r3.indexOf("/node_process.js") !== -1 || r3.indexOf("/node_buffer.js") !== -1 || r3.indexOf("@babel/runtime") !== -1) {
      let e3 = r3.split('"');
      try {
        i3 = new URL(e3[1]), e3[1] = m3 + "/npm:" + i3.pathname;
      } catch {
        console.error("URL ERR", e3[1]);
      }
      return e3.join('"');
    }
    if (r3.indexOf("/npm:/") === -1 && r3.startsWith("import")) {
      let e3 = r3.split('"');
      try {
        i3 = new URL(e3[1], m3), i3 && i3.pathname.indexOf(".") === -1 && i3.pathname.indexOf("/live/") !== -1 && (e3[1] = i3.toString() + (y ? "/index.tsx" : "/index.js"));
      } catch {
        console.error("URL ERR", e3[1]);
      }
      return e3.join('"');
    }
    return r3;
  }).join(`
`)).join(";"), t4 = t4.split("/npm:/npm:").join("/npm:"), t4;
}
p2(b2, "importMapReplace");
function o4(s, m3, f) {
  return s && s.split(m3).join(f);
}
p2(o4, "replaceAll");

// ../code/dist/src/chunk-chunk-5MVL554Q.mjs
var Os2 = r2((Aa, Es) => {
  o3();
  var fe = -1, se = 1, qt = 0;
  function pr(t4, e3, r3, n) {
    if (t4 === e3)
      return t4 ? [[qt, t4]] : [];
    if (r3 != null) {
      var s = la(t4, e3, r3);
      if (s)
        return s;
    }
    var o5 = zn(t4, e3), a = t4.substring(0, o5);
    t4 = t4.substring(o5), e3 = e3.substring(o5), o5 = Pn(t4, e3);
    var u = t4.substring(t4.length - o5);
    t4 = t4.substring(0, t4.length - o5), e3 = e3.substring(0, e3.length - o5);
    var l3 = sa(t4, e3);
    return a && l3.unshift([qt, a]), u && l3.push([qt, u]), vs(l3, n), l3;
  }
  p2(pr, "diff_main");
  function sa(t4, e3) {
    var r3;
    if (!t4)
      return [[se, e3]];
    if (!e3)
      return [[fe, t4]];
    var n = t4.length > e3.length ? t4 : e3, s = t4.length > e3.length ? e3 : t4, o5 = n.indexOf(s);
    if (o5 !== -1)
      return r3 = [[se, n.substring(0, o5)], [qt, s], [se, n.substring(o5 + s.length)]], t4.length > e3.length && (r3[0][0] = r3[2][0] = fe), r3;
    if (s.length === 1)
      return [[fe, t4], [se, e3]];
    var a = aa(t4, e3);
    if (a) {
      var u = a[0], l3 = a[1], c = a[2], _ = a[3], p3 = a[4], w3 = pr(u, c), v = pr(l3, _);
      return w3.concat([[qt, p3]], v);
    }
    return oa(t4, e3);
  }
  p2(sa, "diff_compute_");
  function oa(t4, e3) {
    for (var r3 = t4.length, n = e3.length, s = Math.ceil((r3 + n) / 2), o5 = s, a = 2 * s, u = new Array(a), l3 = new Array(a), c = 0; c < a; c++)
      u[c] = -1, l3[c] = -1;
    u[o5 + 1] = 0, l3[o5 + 1] = 0;
    for (var _ = r3 - n, p3 = _ % 2 !== 0, w3 = 0, v = 0, y = 0, b3 = 0, k3 = 0; k3 < s; k3++) {
      for (var X = -k3 + w3; X <= k3 - v; X += 2) {
        var K = o5 + X, ct;
        X === -k3 || X !== k3 && u[K - 1] < u[K + 1] ? ct = u[K + 1] : ct = u[K - 1] + 1;
        for (var pt = ct - X; ct < r3 && pt < n && t4.charAt(ct) === e3.charAt(pt); )
          ct++, pt++;
        if (u[K] = ct, ct > r3)
          v += 2;
        else if (pt > n)
          w3 += 2;
        else if (p3) {
          var Q = o5 + _ - X;
          if (Q >= 0 && Q < a && l3[Q] !== -1) {
            var N = r3 - l3[Q];
            if (ct >= N)
              return gs(t4, e3, ct, pt);
          }
        }
      }
      for (var W = -k3 + y; W <= k3 - b3; W += 2) {
        var Q = o5 + W, N;
        W === -k3 || W !== k3 && l3[Q - 1] < l3[Q + 1] ? N = l3[Q + 1] : N = l3[Q - 1] + 1;
        for (var ft = N - W; N < r3 && ft < n && t4.charAt(r3 - N - 1) === e3.charAt(n - ft - 1); )
          N++, ft++;
        if (l3[Q] = N, N > r3)
          b3 += 2;
        else if (ft > n)
          y += 2;
        else if (!p3) {
          var K = o5 + _ - W;
          if (K >= 0 && K < a && u[K] !== -1) {
            var ct = u[K], pt = o5 + ct - K;
            if (N = r3 - N, ct >= N)
              return gs(t4, e3, ct, pt);
          }
        }
      }
    }
    return [[fe, t4], [se, e3]];
  }
  p2(oa, "diff_bisect_");
  function gs(t4, e3, r3, n) {
    var s = t4.substring(0, r3), o5 = e3.substring(0, n), a = t4.substring(r3), u = e3.substring(n), l3 = pr(s, o5), c = pr(a, u);
    return l3.concat(c);
  }
  p2(gs, "diff_bisectSplit_");
  function zn(t4, e3) {
    if (!t4 || !e3 || t4.charAt(0) !== e3.charAt(0))
      return 0;
    for (var r3 = 0, n = Math.min(t4.length, e3.length), s = n, o5 = 0; r3 < s; )
      t4.substring(o5, s) == e3.substring(o5, s) ? (r3 = s, o5 = r3) : n = s, s = Math.floor((n - r3) / 2 + r3);
    return ys(t4.charCodeAt(s - 1)) && s--, s;
  }
  p2(zn, "diff_commonPrefix");
  function Pn(t4, e3) {
    if (!t4 || !e3 || t4.slice(-1) !== e3.slice(-1))
      return 0;
    for (var r3 = 0, n = Math.min(t4.length, e3.length), s = n, o5 = 0; r3 < s; )
      t4.substring(t4.length - s, t4.length - o5) == e3.substring(e3.length - s, e3.length - o5) ? (r3 = s, o5 = r3) : n = s, s = Math.floor((n - r3) / 2 + r3);
    return ws(t4.charCodeAt(t4.length - s)) && s--, s;
  }
  p2(Pn, "diff_commonSuffix");
  function aa(t4, e3) {
    var r3 = t4.length > e3.length ? t4 : e3, n = t4.length > e3.length ? e3 : t4;
    if (r3.length < 4 || n.length * 2 < r3.length)
      return null;
    function s(v, y, b3) {
      for (var k3 = v.substring(b3, b3 + Math.floor(v.length / 4)), X = -1, K = "", ct, pt, Q, N; (X = y.indexOf(k3, X + 1)) !== -1; ) {
        var W = zn(v.substring(b3), y.substring(X)), ft = Pn(v.substring(0, b3), y.substring(0, X));
        K.length < ft + W && (K = y.substring(X - ft, X) + y.substring(X, X + W), ct = v.substring(0, b3 - ft), pt = v.substring(b3 + W), Q = y.substring(0, X - ft), N = y.substring(X + W));
      }
      return K.length * 2 >= v.length ? [ct, pt, Q, N, K] : null;
    }
    p2(s, "diff_halfMatchI_");
    var o5 = s(r3, n, Math.ceil(r3.length / 4)), a = s(r3, n, Math.ceil(r3.length / 2)), u;
    if (!o5 && !a)
      return null;
    a ? o5 ? u = o5[4].length > a[4].length ? o5 : a : u = a : u = o5;
    var l3, c, _, p3;
    t4.length > e3.length ? (l3 = u[0], c = u[1], _ = u[2], p3 = u[3]) : (_ = u[0], p3 = u[1], l3 = u[2], c = u[3]);
    var w3 = u[4];
    return [l3, c, _, p3, w3];
  }
  p2(aa, "diff_halfMatch_");
  function vs(t4, e3) {
    t4.push([qt, ""]);
    for (var r3 = 0, n = 0, s = 0, o5 = "", a = "", u; r3 < t4.length; ) {
      if (r3 < t4.length - 1 && !t4[r3][1]) {
        t4.splice(r3, 1);
        continue;
      }
      switch (t4[r3][0]) {
        case se:
          s++, a += t4[r3][1], r3++;
          break;
        case fe:
          n++, o5 += t4[r3][1], r3++;
          break;
        case qt:
          var l3 = r3 - s - n - 1;
          if (e3) {
            if (l3 >= 0 && Ss(t4[l3][1])) {
              var c = t4[l3][1].slice(-1);
              if (t4[l3][1] = t4[l3][1].slice(0, -1), o5 = c + o5, a = c + a, !t4[l3][1]) {
                t4.splice(l3, 1), r3--;
                var _ = l3 - 1;
                t4[_] && t4[_][0] === se && (s++, a = t4[_][1] + a, _--), t4[_] && t4[_][0] === fe && (n++, o5 = t4[_][1] + o5, _--), l3 = _;
              }
            }
            if (bs(t4[r3][1])) {
              var c = t4[r3][1].charAt(0);
              t4[r3][1] = t4[r3][1].slice(1), o5 += c, a += c;
            }
          }
          if (r3 < t4.length - 1 && !t4[r3][1]) {
            t4.splice(r3, 1);
            break;
          }
          if (o5.length > 0 || a.length > 0) {
            o5.length > 0 && a.length > 0 && (u = zn(a, o5), u !== 0 && (l3 >= 0 ? t4[l3][1] += a.substring(0, u) : (t4.splice(0, 0, [qt, a.substring(0, u)]), r3++), a = a.substring(u), o5 = o5.substring(u)), u = Pn(a, o5), u !== 0 && (t4[r3][1] = a.substring(a.length - u) + t4[r3][1], a = a.substring(0, a.length - u), o5 = o5.substring(0, o5.length - u)));
            var p3 = s + n;
            o5.length === 0 && a.length === 0 ? (t4.splice(r3 - p3, p3), r3 = r3 - p3) : o5.length === 0 ? (t4.splice(r3 - p3, p3, [se, a]), r3 = r3 - p3 + 1) : a.length === 0 ? (t4.splice(r3 - p3, p3, [fe, o5]), r3 = r3 - p3 + 1) : (t4.splice(r3 - p3, p3, [fe, o5], [se, a]), r3 = r3 - p3 + 2);
          }
          r3 !== 0 && t4[r3 - 1][0] === qt ? (t4[r3 - 1][1] += t4[r3][1], t4.splice(r3, 1)) : r3++, s = 0, n = 0, o5 = "", a = "";
          break;
      }
    }
    t4[t4.length - 1][1] === "" && t4.pop();
    var w3 = false;
    for (r3 = 1; r3 < t4.length - 1; )
      t4[r3 - 1][0] === qt && t4[r3 + 1][0] === qt && (t4[r3][1].substring(t4[r3][1].length - t4[r3 - 1][1].length) === t4[r3 - 1][1] ? (t4[r3][1] = t4[r3 - 1][1] + t4[r3][1].substring(0, t4[r3][1].length - t4[r3 - 1][1].length), t4[r3 + 1][1] = t4[r3 - 1][1] + t4[r3 + 1][1], t4.splice(r3 - 1, 1), w3 = true) : t4[r3][1].substring(0, t4[r3 + 1][1].length) == t4[r3 + 1][1] && (t4[r3 - 1][1] += t4[r3 + 1][1], t4[r3][1] = t4[r3][1].substring(t4[r3 + 1][1].length) + t4[r3 + 1][1], t4.splice(r3 + 1, 1), w3 = true)), r3++;
    w3 && vs(t4, e3);
  }
  p2(vs, "diff_cleanupMerge");
  function ys(t4) {
    return t4 >= 55296 && t4 <= 56319;
  }
  p2(ys, "is_surrogate_pair_start");
  function ws(t4) {
    return t4 >= 56320 && t4 <= 57343;
  }
  p2(ws, "is_surrogate_pair_end");
  function bs(t4) {
    return ws(t4.charCodeAt(0));
  }
  p2(bs, "starts_with_pair_end");
  function Ss(t4) {
    return ys(t4.charCodeAt(t4.length - 1));
  }
  p2(Ss, "ends_with_pair_start");
  function ua(t4) {
    for (var e3 = [], r3 = 0; r3 < t4.length; r3++)
      t4[r3][1].length > 0 && e3.push(t4[r3]);
    return e3;
  }
  p2(ua, "remove_empty_tuples");
  function $n(t4, e3, r3, n) {
    return Ss(t4) || bs(n) ? null : ua([[qt, t4], [fe, e3], [se, r3], [qt, n]]);
  }
  p2($n, "make_edit_splice");
  function la(t4, e3, r3) {
    var n = typeof r3 == "number" ? { index: r3, length: 0 } : r3.oldRange, s = typeof r3 == "number" ? null : r3.newRange, o5 = t4.length, a = e3.length;
    if (n.length === 0 && (s === null || s.length === 0)) {
      var u = n.index, l3 = t4.slice(0, u), c = t4.slice(u), _ = s ? s.index : null;
      t: {
        var p3 = u + a - o5;
        if (_ !== null && _ !== p3 || p3 < 0 || p3 > a)
          break t;
        var w3 = e3.slice(0, p3), v = e3.slice(p3);
        if (v !== c)
          break t;
        var y = Math.min(u, p3), b3 = l3.slice(0, y), k3 = w3.slice(0, y);
        if (b3 !== k3)
          break t;
        var X = l3.slice(y), K = w3.slice(y);
        return $n(b3, X, K, c);
      }
      t: {
        if (_ !== null && _ !== u)
          break t;
        var ct = u, w3 = e3.slice(0, ct), v = e3.slice(ct);
        if (w3 !== l3)
          break t;
        var pt = Math.min(o5 - ct, a - ct), Q = c.slice(c.length - pt), N = v.slice(v.length - pt);
        if (Q !== N)
          break t;
        var X = c.slice(0, c.length - pt), K = v.slice(0, v.length - pt);
        return $n(l3, X, K, Q);
      }
    }
    if (n.length > 0 && s && s.length === 0) {
      t: {
        var b3 = t4.slice(0, n.index), Q = t4.slice(n.index + n.length), y = b3.length, pt = Q.length;
        if (a < y + pt)
          break t;
        var k3 = e3.slice(0, y), N = e3.slice(a - pt);
        if (b3 !== k3 || Q !== N)
          break t;
        var X = t4.slice(y, o5 - pt), K = e3.slice(y, a - pt);
        return $n(b3, X, K, Q);
      }
    }
    return null;
  }
  p2(la, "find_cursor_edit_diff");
  function Cr(t4, e3, r3) {
    return pr(t4, e3, r3, true);
  }
  p2(Cr, "diff");
  Cr.INSERT = se;
  Cr.DELETE = fe;
  Cr.EQUAL = qt;
  Es.exports = Cr;
});
var js2 = r2((Da, Cn) => {
  o3();
  ((t4) => {
    "use strict";
    var e3 = Object.defineProperty, r3 = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, o5 = p2((h3, d) => {
      for (var m3 in d)
        e3(h3, m3, { get: d[m3], enumerable: true });
    }, "__export"), a = p2((h3, d, m3, M) => {
      if (d && typeof d == "object" || typeof d == "function")
        for (let T of n(d))
          !s.call(h3, T) && T !== m3 && e3(h3, T, { get: () => d[T], enumerable: !(M = r3(d, T)) || M.enumerable });
      return h3;
    }, "__copyProps"), u = p2((h3) => a(e3({}, "__esModule", { value: true }), h3), "__toCommonJS"), l3 = p2((h3, d, m3) => new Promise((M, T) => {
      var $5 = p2((x) => {
        try {
          U3(m3.next(x));
        } catch (V) {
          T(V);
        }
      }, "fulfilled"), j3 = p2((x) => {
        try {
          U3(m3.throw(x));
        } catch (V) {
          T(V);
        }
      }, "rejected"), U3 = p2((x) => x.done ? M(x.value) : Promise.resolve(x.value).then($5, j3), "step");
      U3((m3 = m3.apply(h3, d)).next());
    }), "__async"), c = {};
    o5(c, { analyzeMetafile: () => Ys, analyzeMetafileSync: () => Zs, build: () => Vs, buildSync: () => Gs, default: () => ro, formatMessages: () => Ks, formatMessagesSync: () => Xs, initialize: () => to, serve: () => Js, transform: () => Hs, transformSync: () => Qs, version: () => Ws }), t4.exports = u(c);
    function _(h3) {
      let d = p2((M) => {
        if (M === null)
          m3.write8(0);
        else if (typeof M == "boolean")
          m3.write8(1), m3.write8(+M);
        else if (typeof M == "number")
          m3.write8(2), m3.write32(M | 0);
        else if (typeof M == "string")
          m3.write8(3), m3.write(v(M));
        else if (M instanceof Uint8Array)
          m3.write8(4), m3.write(M);
        else if (M instanceof Array) {
          m3.write8(5), m3.write32(M.length);
          for (let T of M)
            d(T);
        } else {
          let T = Object.keys(M);
          m3.write8(6), m3.write32(T.length);
          for (let $5 of T)
            m3.write(v($5)), d(M[$5]);
        }
      }, "visit"), m3 = new w3();
      return m3.write32(0), m3.write32(h3.id << 1 | +!h3.isRequest), d(h3.value), X(m3.buf, m3.len - 4, 0), m3.buf.subarray(0, m3.len);
    }
    p2(_, "encodePacket");
    function p3(h3) {
      let d = p2(() => {
        switch (m3.read8()) {
          case 0:
            return null;
          case 1:
            return !!m3.read8();
          case 2:
            return m3.read32();
          case 3:
            return y(m3.read());
          case 4:
            return m3.read();
          case 5: {
            let j3 = m3.read32(), U3 = [];
            for (let x = 0; x < j3; x++)
              U3.push(d());
            return U3;
          }
          case 6: {
            let j3 = m3.read32(), U3 = {};
            for (let x = 0; x < j3; x++)
              U3[y(m3.read())] = d();
            return U3;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, "visit"), m3 = new w3(h3), M = m3.read32(), T = (M & 1) === 0;
      M >>>= 1;
      let $5 = d();
      if (m3.ptr !== h3.length)
        throw new Error("Invalid packet");
      return { id: M, isRequest: T, value: $5 };
    }
    p2(p3, "decodePacket");
    var w3 = p2(class {
      constructor(h3 = new Uint8Array(1024)) {
        this.buf = h3, this.len = 0, this.ptr = 0;
      }
      _write(h3) {
        if (this.len + h3 > this.buf.length) {
          let d = new Uint8Array((this.len + h3) * 2);
          d.set(this.buf), this.buf = d;
        }
        return this.len += h3, this.len - h3;
      }
      write8(h3) {
        let d = this._write(1);
        this.buf[d] = h3;
      }
      write32(h3) {
        let d = this._write(4);
        X(this.buf, h3, d);
      }
      write(h3) {
        let d = this._write(4 + h3.length);
        X(this.buf, h3.length, d), this.buf.set(h3, d + 4);
      }
      _read(h3) {
        if (this.ptr + h3 > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += h3, this.ptr - h3;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return k3(this.buf, this._read(4));
      }
      read() {
        let h3 = this.read32(), d = new Uint8Array(h3), m3 = this._read(d.length);
        return d.set(this.buf.subarray(m3, m3 + h3)), d;
      }
    }, "ByteBuffer"), v, y, b3;
    if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
      let h3 = new TextEncoder(), d = new TextDecoder();
      v = p2((m3) => h3.encode(m3), "encodeUTF8"), y = p2((m3) => d.decode(m3), "decodeUTF8"), b3 = 'new TextEncoder().encode("")';
    } else if (typeof Buffer < "u")
      v = p2((h3) => Buffer.from(h3), "encodeUTF8"), y = p2((h3) => {
        let { buffer: d, byteOffset: m3, byteLength: M } = h3;
        return Buffer.from(d, m3, M).toString();
      }, "decodeUTF8"), b3 = 'Buffer.from("")';
    else
      throw new Error("No UTF-8 codec found");
    if (!(v("") instanceof Uint8Array))
      throw new Error(`Invariant violation: "${b3} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
    function k3(h3, d) {
      return h3[d++] | h3[d++] << 8 | h3[d++] << 16 | h3[d++] << 24;
    }
    p2(k3, "readUInt32LE");
    function X(h3, d, m3) {
      h3[m3++] = d, h3[m3++] = d >> 8, h3[m3++] = d >> 16, h3[m3++] = d >> 24;
    }
    p2(X, "writeUInt32LE");
    var K = JSON.stringify, ct = "warning", pt = "silent";
    function Q(h3) {
      if (Mt(h3, "target"), h3.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${h3}`);
      return h3;
    }
    p2(Q, "validateTarget");
    var N = p2(() => null, "canBeAnything"), W = p2((h3) => typeof h3 == "boolean" ? null : "a boolean", "mustBeBoolean"), ft = p2((h3) => typeof h3 == "boolean" || typeof h3 == "object" && !Array.isArray(h3) ? null : "a boolean or an object", "mustBeBooleanOrObject"), F = p2((h3) => typeof h3 == "string" ? null : "a string", "mustBeString"), Dt = p2((h3) => h3 instanceof RegExp ? null : "a RegExp object", "mustBeRegExp"), Ct = p2((h3) => typeof h3 == "number" && h3 === (h3 | 0) ? null : "an integer", "mustBeInteger"), qr = p2((h3) => typeof h3 == "function" ? null : "a function", "mustBeFunction"), It = p2((h3) => Array.isArray(h3) ? null : "an array", "mustBeArray"), Xt = p2((h3) => typeof h3 == "object" && h3 !== null && !Array.isArray(h3) ? null : "an object", "mustBeObject"), Rs = p2((h3) => h3 instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule"), Ts = p2((h3) => typeof h3 == "object" && h3 !== null ? null : "an array or an object", "mustBeArrayOrRecord"), Un = p2((h3) => typeof h3 == "object" && !Array.isArray(h3) ? null : "an object or null", "mustBeObjectOrNull"), Nn = p2((h3) => typeof h3 == "string" || typeof h3 == "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean"), $s = p2((h3) => typeof h3 == "string" || typeof h3 == "object" && h3 !== null && !Array.isArray(h3) ? null : "a string or an object", "mustBeStringOrObject"), zs = p2((h3) => typeof h3 == "string" || Array.isArray(h3) ? null : "a string or an array", "mustBeStringOrArray"), Fn = p2((h3) => typeof h3 == "string" || h3 instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array"), Ps = p2((h3) => typeof h3 == "string" || h3 instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
    function S(h3, d, m3, M) {
      let T = h3[m3];
      if (d[m3 + ""] = true, T === void 0)
        return;
      let $5 = M(T);
      if ($5 !== null)
        throw new Error(`${K(m3)} must be ${$5}`);
      return T;
    }
    p2(S, "getFlag");
    function kt(h3, d, m3) {
      for (let M in h3)
        if (!(M in d))
          throw new Error(`Invalid option ${m3}: ${K(M)}`);
    }
    p2(kt, "checkForInvalidFlags");
    function Ds(h3) {
      let d = /* @__PURE__ */ Object.create(null), m3 = S(h3, d, "wasmURL", Ps), M = S(h3, d, "wasmModule", Rs), T = S(h3, d, "worker", W);
      return kt(h3, d, "in initialize() call"), { wasmURL: m3, wasmModule: M, worker: T };
    }
    p2(Ds, "validateInitializeOptions");
    function qn(h3) {
      let d;
      if (h3 !== void 0) {
        d = /* @__PURE__ */ Object.create(null);
        for (let m3 in h3) {
          let M = h3[m3];
          if (typeof M == "string" || M === false)
            d[m3] = M;
          else
            throw new Error(`Expected ${K(m3)} in mangle cache to map to either a string or false`);
        }
      }
      return d;
    }
    p2(qn, "validateMangleCache");
    function _r(h3, d, m3, M, T) {
      let $5 = S(d, m3, "color", W), j3 = S(d, m3, "logLevel", F), U3 = S(d, m3, "logLimit", Ct);
      $5 !== void 0 ? h3.push(`--color=${$5}`) : M && h3.push("--color=true"), h3.push(`--log-level=${j3 || T}`), h3.push(`--log-limit=${U3 || 0}`);
    }
    p2(_r, "pushLogFlags");
    function Mt(h3, d, m3) {
      if (typeof h3 != "string")
        throw new Error(`Expected value for ${d}${m3 !== void 0 ? " " + K(m3) : ""} to be a string, got ${typeof h3} instead`);
      return h3;
    }
    p2(Mt, "validateStringValue");
    function Ln(h3, d, m3) {
      let M = S(d, m3, "legalComments", F), T = S(d, m3, "sourceRoot", F), $5 = S(d, m3, "sourcesContent", W), j3 = S(d, m3, "target", zs), U3 = S(d, m3, "format", F), x = S(d, m3, "globalName", F), V = S(d, m3, "mangleProps", Dt), Y = S(d, m3, "reserveProps", Dt), Z = S(d, m3, "mangleQuoted", W), rt = S(d, m3, "minify", W), J = S(d, m3, "minifySyntax", W), tt = S(d, m3, "minifyWhitespace", W), q3 = S(d, m3, "minifyIdentifiers", W), nt = S(d, m3, "drop", It), at = S(d, m3, "charset", F), D = S(d, m3, "treeShaking", W), E = S(d, m3, "ignoreAnnotations", W), g5 = S(d, m3, "jsx", F), I = S(d, m3, "jsxFactory", F), R3 = S(d, m3, "jsxFragment", F), C = S(d, m3, "jsxImportSource", F), L = S(d, m3, "jsxDev", W), A = S(d, m3, "jsxSideEffects", W), f = S(d, m3, "define", Xt), O = S(d, m3, "logOverride", Xt), z = S(d, m3, "supported", Xt), P = S(d, m3, "pure", It), H = S(d, m3, "keepNames", W), it = S(d, m3, "platform", F);
      if (M && h3.push(`--legal-comments=${M}`), T !== void 0 && h3.push(`--source-root=${T}`), $5 !== void 0 && h3.push(`--sources-content=${$5}`), j3 && (Array.isArray(j3) ? h3.push(`--target=${Array.from(j3).map(Q).join(",")}`) : h3.push(`--target=${Q(j3)}`)), U3 && h3.push(`--format=${U3}`), x && h3.push(`--global-name=${x}`), it && h3.push(`--platform=${it}`), rt && h3.push("--minify"), J && h3.push("--minify-syntax"), tt && h3.push("--minify-whitespace"), q3 && h3.push("--minify-identifiers"), at && h3.push(`--charset=${at}`), D !== void 0 && h3.push(`--tree-shaking=${D}`), E && h3.push("--ignore-annotations"), nt)
        for (let G of nt)
          h3.push(`--drop:${Mt(G, "drop")}`);
      if (V && h3.push(`--mangle-props=${V.source}`), Y && h3.push(`--reserve-props=${Y.source}`), Z !== void 0 && h3.push(`--mangle-quoted=${Z}`), g5 && h3.push(`--jsx=${g5}`), I && h3.push(`--jsx-factory=${I}`), R3 && h3.push(`--jsx-fragment=${R3}`), C && h3.push(`--jsx-import-source=${C}`), L && h3.push("--jsx-dev"), A && h3.push("--jsx-side-effects"), f)
        for (let G in f) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${G}`);
          h3.push(`--define:${G}=${Mt(f[G], "define", G)}`);
        }
      if (O)
        for (let G in O) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid log override: ${G}`);
          h3.push(`--log-override:${G}=${Mt(O[G], "log override", G)}`);
        }
      if (z)
        for (let G in z) {
          if (G.indexOf("=") >= 0)
            throw new Error(`Invalid supported: ${G}`);
          let et = z[G];
          if (typeof et != "boolean")
            throw new Error(`Expected value for supported ${K(G)} to be a boolean, got ${typeof et} instead`);
          h3.push(`--supported:${G}=${et}`);
        }
      if (P)
        for (let G of P)
          h3.push(`--pure:${Mt(G, "pure")}`);
      H && h3.push("--keep-names");
    }
    p2(Ln, "pushCommonFlags");
    function Cs(h3, d, m3, M, T) {
      var $5;
      let j3 = [], U3 = [], x = /* @__PURE__ */ Object.create(null), V = null, Y = null, Z = null;
      _r(j3, d, x, m3, M), Ln(j3, d, x);
      let rt = S(d, x, "sourcemap", Nn), J = S(d, x, "bundle", W), tt = S(d, x, "watch", ft), q3 = S(d, x, "splitting", W), nt = S(d, x, "preserveSymlinks", W), at = S(d, x, "metafile", W), D = S(d, x, "outfile", F), E = S(d, x, "outdir", F), g5 = S(d, x, "outbase", F), I = S(d, x, "tsconfig", F), R3 = S(d, x, "resolveExtensions", It), C = S(d, x, "nodePaths", It), L = S(d, x, "mainFields", It), A = S(d, x, "conditions", It), f = S(d, x, "external", It), O = S(d, x, "packages", F), z = S(d, x, "alias", Xt), P = S(d, x, "loader", Xt), H = S(d, x, "outExtension", Xt), it = S(d, x, "publicPath", F), G = S(d, x, "entryNames", F), et = S(d, x, "chunkNames", F), jt = S(d, x, "assetNames", F), Rt = S(d, x, "inject", It), bt = S(d, x, "banner", Xt), ut = S(d, x, "footer", Xt), st = S(d, x, "entryPoints", Ts), xt = S(d, x, "absWorkingDir", F), Tt = S(d, x, "stdin", Xt), be = ($5 = S(d, x, "write", W)) != null ? $5 : T, He = S(d, x, "allowOverwrite", W), oe = S(d, x, "incremental", W) === true, Zt = S(d, x, "mangleCache", Xt);
      if (x.plugins = true, kt(d, x, `in ${h3}() call`), rt && j3.push(`--sourcemap${rt === true ? "" : `=${rt}`}`), J && j3.push("--bundle"), He && j3.push("--allow-overwrite"), tt)
        if (j3.push("--watch"), typeof tt == "boolean")
          Z = {};
        else {
          let B = /* @__PURE__ */ Object.create(null), St = S(tt, B, "onRebuild", qr);
          kt(tt, B, `on "watch" in ${h3}() call`), Z = { onRebuild: St };
        }
      if (q3 && j3.push("--splitting"), nt && j3.push("--preserve-symlinks"), at && j3.push("--metafile"), D && j3.push(`--outfile=${D}`), E && j3.push(`--outdir=${E}`), g5 && j3.push(`--outbase=${g5}`), I && j3.push(`--tsconfig=${I}`), O && j3.push(`--packages=${O}`), R3) {
        let B = [];
        for (let St of R3) {
          if (Mt(St, "resolve extension"), St.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${St}`);
          B.push(St);
        }
        j3.push(`--resolve-extensions=${B.join(",")}`);
      }
      if (it && j3.push(`--public-path=${it}`), G && j3.push(`--entry-names=${G}`), et && j3.push(`--chunk-names=${et}`), jt && j3.push(`--asset-names=${jt}`), L) {
        let B = [];
        for (let St of L) {
          if (Mt(St, "main field"), St.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${St}`);
          B.push(St);
        }
        j3.push(`--main-fields=${B.join(",")}`);
      }
      if (A) {
        let B = [];
        for (let St of A) {
          if (Mt(St, "condition"), St.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${St}`);
          B.push(St);
        }
        j3.push(`--conditions=${B.join(",")}`);
      }
      if (f)
        for (let B of f)
          j3.push(`--external:${Mt(B, "external")}`);
      if (z)
        for (let B in z) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid package name in alias: ${B}`);
          j3.push(`--alias:${B}=${Mt(z[B], "alias", B)}`);
        }
      if (bt)
        for (let B in bt) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${B}`);
          j3.push(`--banner:${B}=${Mt(bt[B], "banner", B)}`);
        }
      if (ut)
        for (let B in ut) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${B}`);
          j3.push(`--footer:${B}=${Mt(ut[B], "footer", B)}`);
        }
      if (Rt)
        for (let B of Rt)
          j3.push(`--inject:${Mt(B, "inject")}`);
      if (P)
        for (let B in P) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${B}`);
          j3.push(`--loader:${B}=${Mt(P[B], "loader", B)}`);
        }
      if (H)
        for (let B in H) {
          if (B.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${B}`);
          j3.push(`--out-extension:${B}=${Mt(H[B], "out extension", B)}`);
        }
      if (st)
        if (Array.isArray(st))
          for (let B of st)
            U3.push(["", Mt(B, "entry point")]);
        else
          for (let B in st)
            U3.push([B, Mt(st[B], "entry point", B)]);
      if (Tt) {
        let B = /* @__PURE__ */ Object.create(null), St = S(Tt, B, "contents", Fn), Jn = S(Tt, B, "resolveDir", F), Hn = S(Tt, B, "sourcefile", F), Kn = S(Tt, B, "loader", F);
        kt(Tt, B, 'in "stdin" object'), Hn && j3.push(`--sourcefile=${Hn}`), Kn && j3.push(`--loader=${Kn}`), Jn && (Y = Jn), typeof St == "string" ? V = v(St) : St instanceof Uint8Array && (V = St);
      }
      let Ae = [];
      if (C)
        for (let B of C)
          B += "", Ae.push(B);
      return { entries: U3, flags: j3, write: be, stdinContents: V, stdinResolveDir: Y, absWorkingDir: xt, incremental: oe, nodePaths: Ae, watch: Z, mangleCache: qn(Zt) };
    }
    p2(Cs, "flagsForBuildOptions");
    function Us(h3, d, m3, M) {
      let T = [], $5 = /* @__PURE__ */ Object.create(null);
      _r(T, d, $5, m3, M), Ln(T, d, $5);
      let j3 = S(d, $5, "sourcemap", Nn), U3 = S(d, $5, "tsconfigRaw", $s), x = S(d, $5, "sourcefile", F), V = S(d, $5, "loader", F), Y = S(d, $5, "banner", F), Z = S(d, $5, "footer", F), rt = S(d, $5, "mangleCache", Xt);
      return kt(d, $5, `in ${h3}() call`), j3 && T.push(`--sourcemap=${j3 === true ? "external" : j3}`), U3 && T.push(`--tsconfig-raw=${typeof U3 == "string" ? U3 : JSON.stringify(U3)}`), x && T.push(`--sourcefile=${x}`), V && T.push(`--loader=${V}`), Y && T.push(`--banner=${Y}`), Z && T.push(`--footer=${Z}`), { flags: T, mangleCache: qn(rt) };
    }
    p2(Us, "flagsForTransformOptions");
    function Ns(h3) {
      let d = {}, m3 = { didClose: false, reason: "" }, M = {}, T = 0, $5 = 0, j3 = new Uint8Array(16 * 1024), U3 = 0, x = p2((E) => {
        let g5 = U3 + E.length;
        if (g5 > j3.length) {
          let R3 = new Uint8Array(g5 * 2);
          R3.set(j3), j3 = R3;
        }
        j3.set(E, U3), U3 += E.length;
        let I = 0;
        for (; I + 4 <= U3; ) {
          let R3 = k3(j3, I);
          if (I + 4 + R3 > U3)
            break;
          I += 4, tt(j3.subarray(I, I + R3)), I += R3;
        }
        I > 0 && (j3.copyWithin(0, I, U3), U3 -= I);
      }, "readFromStdout"), V = p2((E) => {
        m3.didClose = true, E && (m3.reason = ": " + (E.message || E));
        let g5 = "The service was stopped" + m3.reason;
        for (let I in M)
          M[I](g5, null);
        M = {};
      }, "afterClose"), Y = p2((E, g5, I) => {
        if (m3.didClose)
          return I("The service is no longer running" + m3.reason, null);
        let R3 = T++;
        M[R3] = (C, L) => {
          try {
            I(C, L);
          } finally {
            E && E.unref();
          }
        }, E && E.ref(), h3.writeToStdin(_({ id: R3, isRequest: true, value: g5 }));
      }, "sendRequest"), Z = p2((E, g5) => {
        if (m3.didClose)
          throw new Error("The service is no longer running" + m3.reason);
        h3.writeToStdin(_({ id: E, isRequest: false, value: g5 }));
      }, "sendResponse"), rt = p2((E, g5) => l3(this, null, function* () {
        try {
          if (g5.command === "ping") {
            Z(E, {});
            return;
          }
          if (typeof g5.key == "number") {
            let I = d[g5.key];
            if (I) {
              let R3 = I[g5.command];
              if (R3) {
                yield R3(E, g5);
                return;
              }
            }
          }
          throw new Error("Invalid command: " + g5.command);
        } catch (I) {
          Z(E, { errors: [je(I, h3, null, void 0, "")] });
        }
      }), "handleRequest"), J = true, tt = p2((E) => {
        if (J) {
          J = false;
          let I = String.fromCharCode(...E);
          if (I !== "0.16.13")
            throw new Error(`Cannot start service: Host version "0.16.13" does not match binary version ${K(I)}`);
          return;
        }
        let g5 = p3(E);
        if (g5.isRequest)
          rt(g5.id, g5.value);
        else {
          let I = M[g5.id];
          delete M[g5.id], g5.value.error ? I(g5.value.error, {}) : I(null, g5.value);
        }
      }, "handleIncomingPacket");
      return { readFromStdout: x, afterClose: V, service: { buildOrServe: p2(({ callName: E, refs: g5, serveOptions: I, options: R3, isTTY: C, defaultWD: L, callback: A }) => {
        let f = 0, O = $5++, z = {}, P = { ref() {
          ++f === 1 && g5 && g5.ref();
        }, unref() {
          --f === 0 && (delete d[O], g5 && g5.unref());
        } };
        d[O] = z, P.ref(), Fs(E, O, Y, Z, P, h3, z, R3, I, C, L, m3, (H, it) => {
          try {
            A(H, it);
          } finally {
            P.unref();
          }
        });
      }, "buildOrServe"), transform: p2(({ callName: E, refs: g5, input: I, options: R3, isTTY: C, fs: L, callback: A }) => {
        let f = Bn(), O = p2((z) => {
          try {
            if (typeof I != "string" && !(I instanceof Uint8Array))
              throw new Error('The input to "transform" must be a string or a Uint8Array');
            let { flags: P, mangleCache: H } = Us(E, R3, C, pt), it = { command: "transform", flags: P, inputFS: z !== null, input: z !== null ? v(z) : typeof I == "string" ? v(I) : I };
            H && (it.mangleCache = H), Y(g5, it, (G, et) => {
              if (G)
                return A(new Error(G), null);
              let jt = pe(et.errors, f), Rt = pe(et.warnings, f), bt = 1, ut = p2(() => {
                if (--bt === 0) {
                  let st = { warnings: Rt, code: et.code, map: et.map };
                  "legalComments" in et && (st.legalComments = et?.legalComments), et.mangleCache && (st.mangleCache = et?.mangleCache), A(null, st);
                }
              }, "next");
              if (jt.length > 0)
                return A(Me("Transform failed", jt, Rt), null);
              et.codeFS && (bt++, L.readFile(et.code, (st, xt) => {
                st !== null ? A(st, null) : (et.code = xt, ut());
              })), et.mapFS && (bt++, L.readFile(et.map, (st, xt) => {
                st !== null ? A(st, null) : (et.map = xt, ut());
              })), ut();
            });
          } catch (P) {
            let H = [];
            try {
              _r(H, R3, {}, C, pt);
            } catch {
            }
            let it = je(P, h3, f, void 0, "");
            Y(g5, { command: "error", flags: H, error: it }, () => {
              it.detail = f.load(it.detail), A(Me("Transform failed", [it], []), null);
            });
          }
        }, "start");
        if ((typeof I == "string" || I instanceof Uint8Array) && I.length > 1024 * 1024) {
          let z = O;
          O = p2(() => L.writeFile(I, z), "start");
        }
        O(null);
      }, "transform2"), formatMessages: p2(({ callName: E, refs: g5, messages: I, options: R3, callback: C }) => {
        let L = we(I, "messages", null, "");
        if (!R3)
          throw new Error(`Missing second argument in ${E}() call`);
        let A = {}, f = S(R3, A, "kind", F), O = S(R3, A, "color", W), z = S(R3, A, "terminalWidth", Ct);
        if (kt(R3, A, `in ${E}() call`), f === void 0)
          throw new Error(`Missing "kind" in ${E}() call`);
        if (f !== "error" && f !== "warning")
          throw new Error(`Expected "kind" to be "error" or "warning" in ${E}() call`);
        let P = { command: "format-msgs", messages: L, isWarning: f === "warning" };
        O !== void 0 && (P.color = O), z !== void 0 && (P.terminalWidth = z), Y(g5, P, (H, it) => {
          if (H)
            return C(new Error(H), null);
          C(null, it.messages);
        });
      }, "formatMessages2"), analyzeMetafile: p2(({ callName: E, refs: g5, metafile: I, options: R3, callback: C }) => {
        R3 === void 0 && (R3 = {});
        let L = {}, A = S(R3, L, "color", W), f = S(R3, L, "verbose", W);
        kt(R3, L, `in ${E}() call`);
        let O = { command: "analyze-metafile", metafile: I };
        A !== void 0 && (O.color = A), f !== void 0 && (O.verbose = f), Y(g5, O, (z, P) => {
          if (z)
            return C(new Error(z), null);
          C(null, P.result);
        });
      }, "analyzeMetafile2") } };
    }
    p2(Ns, "createChannel");
    function Fs(h3, d, m3, M, T, $5, j3, U3, x, V, Y, Z, rt) {
      let J = Bn(), tt = p2((D, E, g5, I) => {
        let R3 = [];
        try {
          _r(R3, U3, {}, V, ct);
        } catch {
        }
        let C = je(D, $5, J, g5, E);
        m3(T, { command: "error", flags: R3, error: C }, () => {
          C.detail = J.load(C.detail), I(C);
        });
      }, "logPluginError"), q3 = p2((D, E) => {
        tt(D, E, void 0, (g5) => {
          rt(Me("Build failed", [g5], []), null);
        });
      }, "handleError"), nt;
      if (typeof U3 == "object") {
        let D = U3.plugins;
        if (D !== void 0) {
          if (!Array.isArray(D))
            throw new Error('"plugins" must be an array');
          nt = D;
        }
      }
      if (nt && nt.length > 0) {
        if ($5.isSync) {
          q3(new Error("Cannot use plugins in synchronous API calls"), "");
          return;
        }
        Ls(d, m3, M, T, $5, j3, U3, nt, J).then((D) => {
          if (!D.ok) {
            q3(D.error, D.pluginName);
            return;
          }
          try {
            at(D.requestPlugins, D.runOnEndCallbacks);
          } catch (E) {
            q3(E, "");
          }
        }, (D) => q3(D, ""));
        return;
      }
      try {
        at(null, (D, E, g5) => g5());
      } catch (D) {
        q3(D, "");
      }
      function at(D, E) {
        let g5 = !$5.isWriteUnavailable, { entries: I, flags: R3, write: C, stdinContents: L, stdinResolveDir: A, absWorkingDir: f, incremental: O, nodePaths: z, watch: P, mangleCache: H } = Cs(h3, U3, V, ct, g5), it = { command: "build", key: d, entries: I, flags: R3, write: C, stdinContents: L, stdinResolveDir: A, absWorkingDir: f || Y, incremental: O, nodePaths: z };
        D && (it.plugins = D), H && (it.mangleCache = H);
        let G = x && qs(d, m3, M, T, j3, x, it), et, jt, Rt = p2((ut, st) => {
          ut.outputFiles && (st.outputFiles = ut.outputFiles.map(Bs)), ut.metafile && (st.metafile = JSON.parse(ut.metafile)), ut.mangleCache && (st.mangleCache = ut.mangleCache), ut.writeToStdout !== void 0 && console.log(y(ut.writeToStdout).replace(/\n$/, ""));
        }, "copyResponseToResult"), bt = p2((ut, st) => {
          let xt = { errors: pe(ut.errors, J), warnings: pe(ut.warnings, J) };
          Rt(ut, xt), E(xt, tt, () => {
            if (xt.errors.length > 0)
              return st(Me("Build failed", xt.errors, xt.warnings), null);
            if (ut.rebuild) {
              if (!et) {
                let Tt = false;
                et = p2(() => new Promise((be, He) => {
                  if (Tt || Z.didClose)
                    throw new Error("Cannot rebuild");
                  m3(T, { command: "rebuild", key: d }, (oe, Zt) => {
                    if (oe)
                      return st(Me("Build failed", [{ id: "", pluginName: "", text: oe, location: null, notes: [], detail: void 0 }], []), null);
                    bt(Zt, (Ae, B) => {
                      Ae ? He(Ae) : be(B);
                    });
                  });
                }), "rebuild"), T.ref(), et.dispose = () => {
                  Tt || (Tt = true, m3(T, { command: "rebuild-dispose", key: d }, () => {
                  }), T.unref());
                };
              }
              xt.rebuild = et;
            }
            if (ut.watch) {
              if (!jt) {
                let Tt = false;
                T.ref(), jt = p2(() => {
                  Tt || (Tt = true, delete j3["watch-rebuild"], m3(T, { command: "watch-stop", key: d }, () => {
                  }), T.unref());
                }, "stop"), P && (j3["watch-rebuild"] = (be, He) => {
                  try {
                    let oe = He.args, Zt = { errors: pe(oe.errors, J), warnings: pe(oe.warnings, J) };
                    Rt(oe, Zt), E(Zt, tt, () => {
                      if (Zt.errors.length > 0) {
                        P.onRebuild && P.onRebuild(Me("Build failed", Zt.errors, Zt.warnings), null);
                        return;
                      }
                      Zt.stop = jt, P.onRebuild && P.onRebuild(null, Zt);
                    });
                  } catch (oe) {
                    console.error(oe);
                  }
                  M(be, {});
                });
              }
              xt.stop = jt;
            }
            st(null, xt);
          });
        }, "buildResponseToResult");
        if (C && $5.isWriteUnavailable)
          throw new Error('The "write" option is unavailable in this environment');
        if (O && $5.isSync)
          throw new Error('Cannot use "incremental" with a synchronous build');
        if (P && $5.isSync)
          throw new Error('Cannot use "watch" with a synchronous build');
        m3(T, it, (ut, st) => {
          if (ut)
            return rt(new Error(ut), null);
          if (G) {
            let xt = st, Tt = false;
            T.ref();
            let be = { port: xt.port, host: xt.host, wait: G.wait, stop() {
              Tt || (Tt = true, G.stop(), T.unref());
            } };
            return T.ref(), G.wait.then(T.unref, T.unref), rt(null, be);
          }
          return bt(st, rt);
        });
      }
      p2(at, "buildOrServeContinue");
    }
    p2(Fs, "buildOrServeImpl");
    var qs = p2((h3, d, m3, M, T, $5, j3) => {
      let U3 = {}, x = S($5, U3, "port", Ct), V = S($5, U3, "host", F), Y = S($5, U3, "servedir", F), Z = S($5, U3, "onRequest", qr), rt = new Promise((J, tt) => {
        T["serve-wait"] = (q3, nt) => {
          nt.error !== null ? tt(new Error(nt.error)) : J(), m3(q3, {});
        };
      });
      return j3.serve = {}, kt($5, U3, "in serve() call"), x !== void 0 && (j3.serve.port = x), V !== void 0 && (j3.serve.host = V), Y !== void 0 && (j3.serve.servedir = Y), T["serve-request"] = (J, tt) => {
        Z && Z(tt.args), m3(J, {});
      }, { wait: rt, stop() {
        d(M, { command: "serve-stop", key: h3 }, () => {
        });
      } };
    }, "buildServeData"), Ls = p2((h3, d, m3, M, T, $5, j3, U3, x) => l3(void 0, null, function* () {
      let V = [], Y = [], Z = {}, rt = {}, J = 0, tt = 0, q3 = [], nt = false;
      U3 = [...U3];
      for (let D of U3) {
        let E = {};
        if (typeof D != "object")
          throw new Error(`Plugin at index ${tt} must be an object`);
        let g5 = S(D, E, "name", F);
        if (typeof g5 != "string" || g5 === "")
          throw new Error(`Plugin at index ${tt} is missing a name`);
        try {
          let I = S(D, E, "setup", qr);
          if (typeof I != "function")
            throw new Error("Plugin is missing a setup function");
          kt(D, E, `on plugin ${K(g5)}`);
          let R3 = { name: g5, onResolve: [], onLoad: [] };
          tt++;
          let L = I({ initialOptions: j3, resolve: p2((A, f = {}) => {
            if (!nt)
              throw new Error('Cannot call "resolve" before plugin setup has completed');
            if (typeof A != "string")
              throw new Error("The path to resolve must be a string");
            let O = /* @__PURE__ */ Object.create(null), z = S(f, O, "pluginName", F), P = S(f, O, "importer", F), H = S(f, O, "namespace", F), it = S(f, O, "resolveDir", F), G = S(f, O, "kind", F), et = S(f, O, "pluginData", N);
            return kt(f, O, "in resolve() call"), new Promise((jt, Rt) => {
              let bt = { command: "resolve", path: A, key: h3, pluginName: g5 };
              if (z != null && (bt.pluginName = z), P != null && (bt.importer = P), H != null && (bt.namespace = H), it != null && (bt.resolveDir = it), G != null)
                bt.kind = G;
              else
                throw new Error('Must specify "kind" when calling "resolve"');
              et != null && (bt.pluginData = x.store(et)), d(M, bt, (ut, st) => {
                ut !== null ? Rt(new Error(ut)) : jt({ errors: pe(st.errors, x), warnings: pe(st.warnings, x), path: st.path, external: st.external, sideEffects: st.sideEffects, namespace: st.namespace, suffix: st.suffix, pluginData: x.load(st.pluginData) });
              });
            });
          }, "resolve"), onStart(A) {
            let f = 'This error came from the "onStart" callback registered here:', O = mr(new Error(f), T, "onStart");
            V.push({ name: g5, callback: A, note: O });
          }, onEnd(A) {
            let f = 'This error came from the "onEnd" callback registered here:', O = mr(new Error(f), T, "onEnd");
            Y.push({ name: g5, callback: A, note: O });
          }, onResolve(A, f) {
            let O = 'This error came from the "onResolve" callback registered here:', z = mr(new Error(O), T, "onResolve"), P = {}, H = S(A, P, "filter", Dt), it = S(A, P, "namespace", F);
            if (kt(A, P, `in onResolve() call for plugin ${K(g5)}`), H == null)
              throw new Error("onResolve() call is missing a filter");
            let G = J++;
            Z[G] = { name: g5, callback: f, note: z }, R3.onResolve.push({ id: G, filter: H.source, namespace: it || "" });
          }, onLoad(A, f) {
            let O = 'This error came from the "onLoad" callback registered here:', z = mr(new Error(O), T, "onLoad"), P = {}, H = S(A, P, "filter", Dt), it = S(A, P, "namespace", F);
            if (kt(A, P, `in onLoad() call for plugin ${K(g5)}`), H == null)
              throw new Error("onLoad() call is missing a filter");
            let G = J++;
            rt[G] = { name: g5, callback: f, note: z }, R3.onLoad.push({ id: G, filter: H.source, namespace: it || "" });
          }, esbuild: T.esbuild });
          L && (yield L), q3.push(R3);
        } catch (I) {
          return { ok: false, error: I, pluginName: g5 };
        }
      }
      $5["on-start"] = (D, E) => l3(void 0, null, function* () {
        let g5 = { errors: [], warnings: [] };
        yield Promise.all(V.map((I) => l3(void 0, [I], function* ({ name: R3, callback: C, note: L }) {
          try {
            let A = yield C();
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onStart() callback in plugin ${K(R3)} to return an object`);
              let f = {}, O = S(A, f, "errors", It), z = S(A, f, "warnings", It);
              kt(A, f, `from onStart() callback in plugin ${K(R3)}`), O != null && g5.errors.push(...we(O, "errors", x, R3)), z != null && g5.warnings.push(...we(z, "warnings", x, R3));
            }
          } catch (A) {
            g5.errors.push(je(A, T, x, L && L(), R3));
          }
        }))), m3(D, g5);
      }), $5["on-resolve"] = (D, E) => l3(void 0, null, function* () {
        let g5 = {}, I = "", R3, C;
        for (let L of E.ids)
          try {
            ({ name: I, callback: R3, note: C } = Z[L]);
            let A = yield R3({ path: E.path, importer: E.importer, namespace: E.namespace, resolveDir: E.resolveDir, kind: E.kind, pluginData: x.load(E.pluginData) });
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onResolve() callback in plugin ${K(I)} to return an object`);
              let f = {}, O = S(A, f, "pluginName", F), z = S(A, f, "path", F), P = S(A, f, "namespace", F), H = S(A, f, "suffix", F), it = S(A, f, "external", W), G = S(A, f, "sideEffects", W), et = S(A, f, "pluginData", N), jt = S(A, f, "errors", It), Rt = S(A, f, "warnings", It), bt = S(A, f, "watchFiles", It), ut = S(A, f, "watchDirs", It);
              kt(A, f, `from onResolve() callback in plugin ${K(I)}`), g5.id = L, O != null && (g5.pluginName = O), z != null && (g5.path = z), P != null && (g5.namespace = P), H != null && (g5.suffix = H), it != null && (g5.external = it), G != null && (g5.sideEffects = G), et != null && (g5.pluginData = x.store(et)), jt != null && (g5.errors = we(jt, "errors", x, I)), Rt != null && (g5.warnings = we(Rt, "warnings", x, I)), bt != null && (g5.watchFiles = gr(bt, "watchFiles")), ut != null && (g5.watchDirs = gr(ut, "watchDirs"));
              break;
            }
          } catch (A) {
            g5 = { id: L, errors: [je(A, T, x, C && C(), I)] };
            break;
          }
        m3(D, g5);
      }), $5["on-load"] = (D, E) => l3(void 0, null, function* () {
        let g5 = {}, I = "", R3, C;
        for (let L of E.ids)
          try {
            ({ name: I, callback: R3, note: C } = rt[L]);
            let A = yield R3({ path: E.path, namespace: E.namespace, suffix: E.suffix, pluginData: x.load(E.pluginData) });
            if (A != null) {
              if (typeof A != "object")
                throw new Error(`Expected onLoad() callback in plugin ${K(I)} to return an object`);
              let f = {}, O = S(A, f, "pluginName", F), z = S(A, f, "contents", Fn), P = S(A, f, "resolveDir", F), H = S(A, f, "pluginData", N), it = S(A, f, "loader", F), G = S(A, f, "errors", It), et = S(A, f, "warnings", It), jt = S(A, f, "watchFiles", It), Rt = S(A, f, "watchDirs", It);
              kt(A, f, `from onLoad() callback in plugin ${K(I)}`), g5.id = L, O != null && (g5.pluginName = O), z instanceof Uint8Array ? g5.contents = z : z != null && (g5.contents = v(z)), P != null && (g5.resolveDir = P), H != null && (g5.pluginData = x.store(H)), it != null && (g5.loader = it), G != null && (g5.errors = we(G, "errors", x, I)), et != null && (g5.warnings = we(et, "warnings", x, I)), jt != null && (g5.watchFiles = gr(jt, "watchFiles")), Rt != null && (g5.watchDirs = gr(Rt, "watchDirs"));
              break;
            }
          } catch (A) {
            g5 = { id: L, errors: [je(A, T, x, C && C(), I)] };
            break;
          }
        m3(D, g5);
      });
      let at = p2((D, E, g5) => g5(), "runOnEndCallbacks");
      return Y.length > 0 && (at = p2((D, E, g5) => {
        (() => l3(void 0, null, function* () {
          for (let { name: I, callback: R3, note: C } of Y)
            try {
              yield R3(D);
            } catch (L) {
              D.errors.push(yield new Promise((A) => E(L, I, C && C(), A)));
            }
        }))().then(g5);
      }, "runOnEndCallbacks")), nt = true, { ok: true, requestPlugins: q3, runOnEndCallbacks: at };
    }), "handlePlugins");
    function Bn() {
      let h3 = /* @__PURE__ */ new Map(), d = 0;
      return { load(m3) {
        return h3.get(m3);
      }, store(m3) {
        if (m3 === void 0)
          return -1;
        let M = d++;
        return h3.set(M, m3), M;
      } };
    }
    p2(Bn, "createObjectStash");
    function mr(h3, d, m3) {
      let M, T = false;
      return () => {
        if (T)
          return M;
        T = true;
        try {
          let $5 = (h3.stack + "").split(`
`);
          $5.splice(1, 1);
          let j3 = Wn(d, $5, m3);
          if (j3)
            return M = { text: h3.message, location: j3 }, M;
        } catch {
        }
      };
    }
    p2(mr, "extractCallerV8");
    function je(h3, d, m3, M, T) {
      let $5 = "Internal error", j3 = null;
      try {
        $5 = (h3 && h3.message || h3) + "";
      } catch {
      }
      try {
        j3 = Wn(d, (h3.stack + "").split(`
`), "");
      } catch {
      }
      return { id: "", pluginName: T, text: $5, location: j3, notes: M ? [M] : [], detail: m3 ? m3.store(h3) : -1 };
    }
    p2(je, "extractErrorMessageV8");
    function Wn(h3, d, m3) {
      let M = "    at ";
      if (h3.readFileSync && !d[0].startsWith(M) && d[1].startsWith(M))
        for (let T = 1; T < d.length; T++) {
          let $5 = d[T];
          if ($5.startsWith(M))
            for ($5 = $5.slice(M.length); ; ) {
              let j3 = /^(?:new |async )?\S+ \((.*)\)$/.exec($5);
              if (j3) {
                $5 = j3[1];
                continue;
              }
              if (j3 = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec($5), j3) {
                $5 = j3[1];
                continue;
              }
              if (j3 = /^(\S+):(\d+):(\d+)$/.exec($5), j3) {
                let U3;
                try {
                  U3 = h3.readFileSync(j3[1], "utf8");
                } catch {
                  break;
                }
                let x = U3.split(/\r\n|\r|\n|\u2028|\u2029/)[+j3[2] - 1] || "", V = +j3[3] - 1, Y = x.slice(V, V + m3.length) === m3 ? m3.length : 0;
                return { file: j3[1], namespace: "file", line: +j3[2], column: v(x.slice(0, V)).length, length: v(x.slice(V, V + Y)).length, lineText: x + `
` + d.slice(1).join(`
`), suggestion: "" };
              }
              break;
            }
        }
      return null;
    }
    p2(Wn, "parseStackLinesV8");
    function Me(h3, d, m3) {
      let M = 5, T = d.length < 1 ? "" : ` with ${d.length} error${d.length < 2 ? "" : "s"}:` + d.slice(0, M + 1).map((j3, U3) => {
        if (U3 === M)
          return `
...`;
        if (!j3.location)
          return `
error: ${j3.text}`;
        let { file: x, line: V, column: Y } = j3.location, Z = j3.pluginName ? `[plugin: ${j3.pluginName}] ` : "";
        return `
${x}:${V}:${Y}: ERROR: ${Z}${j3.text}`;
      }).join(""), $5 = new Error(`${h3}${T}`);
      return $5.errors = d, $5.warnings = m3, $5;
    }
    p2(Me, "failureErrorWithLog");
    function pe(h3, d) {
      for (let m3 of h3)
        m3.detail = d.load(m3.detail);
      return h3;
    }
    p2(pe, "replaceDetailsInMessages");
    function Vn(h3, d) {
      if (h3 == null)
        return null;
      let m3 = {}, M = S(h3, m3, "file", F), T = S(h3, m3, "namespace", F), $5 = S(h3, m3, "line", Ct), j3 = S(h3, m3, "column", Ct), U3 = S(h3, m3, "length", Ct), x = S(h3, m3, "lineText", F), V = S(h3, m3, "suggestion", F);
      return kt(h3, m3, d), { file: M || "", namespace: T || "", line: $5 || 0, column: j3 || 0, length: U3 || 0, lineText: x || "", suggestion: V || "" };
    }
    p2(Vn, "sanitizeLocation");
    function we(h3, d, m3, M) {
      let T = [], $5 = 0;
      for (let j3 of h3) {
        let U3 = {}, x = S(j3, U3, "id", F), V = S(j3, U3, "pluginName", F), Y = S(j3, U3, "text", F), Z = S(j3, U3, "location", Un), rt = S(j3, U3, "notes", It), J = S(j3, U3, "detail", N), tt = `in element ${$5} of "${d}"`;
        kt(j3, U3, tt);
        let q3 = [];
        if (rt)
          for (let nt of rt) {
            let at = {}, D = S(nt, at, "text", F), E = S(nt, at, "location", Un);
            kt(nt, at, tt), q3.push({ text: D || "", location: Vn(E, tt) });
          }
        T.push({ id: x || "", pluginName: V || M, text: Y || "", location: Vn(Z, tt), notes: q3, detail: m3 ? m3.store(J) : -1 }), $5++;
      }
      return T;
    }
    p2(we, "sanitizeMessages");
    function gr(h3, d) {
      let m3 = [];
      for (let M of h3) {
        if (typeof M != "string")
          throw new Error(`${K(d)} must be an array of strings`);
        m3.push(M);
      }
      return m3;
    }
    p2(gr, "sanitizeStringArray");
    function Bs({ path: h3, contents: d }) {
      let m3 = null;
      return { path: h3, contents: d, get text() {
        let M = this.contents;
        return (m3 === null || M !== d) && (d = M, m3 = y(M)), m3;
      } };
    }
    p2(Bs, "convertOutputFiles");
    var Ws = "0.16.13", Vs = p2((h3) => vr().build(h3), "build"), Js = p2(() => {
      throw new Error('The "serve" API only works in node');
    }, "serve"), Hs = p2((h3, d) => vr().transform(h3, d), "transform"), Ks = p2((h3, d) => vr().formatMessages(h3, d), "formatMessages"), Ys = p2((h3, d) => vr().analyzeMetafile(h3, d), "analyzeMetafile"), Gs = p2(() => {
      throw new Error('The "buildSync" API only works in node');
    }, "buildSync"), Qs = p2(() => {
      throw new Error('The "transformSync" API only works in node');
    }, "transformSync"), Xs = p2(() => {
      throw new Error('The "formatMessagesSync" API only works in node');
    }, "formatMessagesSync"), Zs = p2(() => {
      throw new Error('The "analyzeMetafileSync" API only works in node');
    }, "analyzeMetafileSync"), xe, Lr, vr = p2(() => {
      if (Lr)
        return Lr;
      throw xe ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, "ensureServiceIsRunning"), to = p2((h3) => {
      h3 = Ds(h3 || {});
      let d = h3.wasmURL, m3 = h3.wasmModule, M = h3.worker !== false;
      if (!d && !m3)
        throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
      if (xe)
        throw new Error('Cannot call "initialize" more than once');
      return xe = eo(d || "", m3, M), xe.catch(() => {
        xe = void 0;
      }), xe;
    }, "initialize"), eo = p2((h3, d, m3) => l3(void 0, null, function* () {
      let M;
      if (m3) {
        let V = new Blob([`onmessage=((postMessage) => {
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
        go.argv = ["", \`--service=\${"0.16.13"}\`];
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
        M = new Worker(URL.createObjectURL(V));
      } else {
        let V = ((Y) => {
          var Z = p2((q3, nt, at) => new Promise((D, E) => {
            var g5 = p2((C) => {
              try {
                R3(at.next(C));
              } catch (L) {
                E(L);
              }
            }, "fulfilled"), I = p2((C) => {
              try {
                R3(at.throw(C));
              } catch (L) {
                E(L);
              }
            }, "rejected"), R3 = p2((C) => C.done ? D(C.value) : Promise.resolve(C.value).then(g5, I), "step");
            R3((at = at.apply(q3, nt)).next());
          }), "__async");
          let rt, J = {};
          for (let q3 = self; q3; q3 = Object.getPrototypeOf(q3))
            for (let nt of Object.getOwnPropertyNames(q3))
              nt in J || Object.defineProperty(J, nt, { get: () => self[nt] });
          (() => {
            let q3 = p2(() => {
              let D = new Error("not implemented");
              return D.code = "ENOSYS", D;
            }, "enosys");
            if (!J.fs) {
              let D = "";
              J.fs = { constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, writeSync(E, g5) {
                D += at.decode(g5);
                let I = D.lastIndexOf(`
`);
                return I != -1 && (console.log(D.substr(0, I)), D = D.substr(I + 1)), g5.length;
              }, write(E, g5, I, R3, C, L) {
                if (I !== 0 || R3 !== g5.length || C !== null) {
                  L(q3());
                  return;
                }
                let A = this.writeSync(E, g5);
                L(null, A);
              }, chmod(E, g5, I) {
                I(q3());
              }, chown(E, g5, I, R3) {
                R3(q3());
              }, close(E, g5) {
                g5(q3());
              }, fchmod(E, g5, I) {
                I(q3());
              }, fchown(E, g5, I, R3) {
                R3(q3());
              }, fstat(E, g5) {
                g5(q3());
              }, fsync(E, g5) {
                g5(null);
              }, ftruncate(E, g5, I) {
                I(q3());
              }, lchown(E, g5, I, R3) {
                R3(q3());
              }, link(E, g5, I) {
                I(q3());
              }, lstat(E, g5) {
                g5(q3());
              }, mkdir(E, g5, I) {
                I(q3());
              }, open(E, g5, I, R3) {
                R3(q3());
              }, read(E, g5, I, R3, C, L) {
                L(q3());
              }, readdir(E, g5) {
                g5(q3());
              }, readlink(E, g5) {
                g5(q3());
              }, rename(E, g5, I) {
                I(q3());
              }, rmdir(E, g5) {
                g5(q3());
              }, stat(E, g5) {
                g5(q3());
              }, symlink(E, g5, I) {
                I(q3());
              }, truncate(E, g5, I) {
                I(q3());
              }, unlink(E, g5) {
                g5(q3());
              }, utimes(E, g5, I, R3) {
                R3(q3());
              } };
            }
            if (J.process || (J.process = { getuid() {
              return -1;
            }, getgid() {
              return -1;
            }, geteuid() {
              return -1;
            }, getegid() {
              return -1;
            }, getgroups() {
              throw q3();
            }, pid: -1, ppid: -1, umask() {
              throw q3();
            }, cwd() {
              throw q3();
            }, chdir() {
              throw q3();
            } }), !J.crypto)
              throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
            if (!J.performance)
              throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
            if (!J.TextEncoder)
              throw new Error("globalThis.TextEncoder is not available, polyfill required");
            if (!J.TextDecoder)
              throw new Error("globalThis.TextDecoder is not available, polyfill required");
            let nt = new TextEncoder("utf-8"), at = new TextDecoder("utf-8");
            J.Go = class {
              constructor() {
                this.argv = ["js"], this.env = {}, this.exit = (f) => {
                  f !== 0 && console.warn("exit code:", f);
                }, this._exitPromise = new Promise((f) => {
                  this._resolveExitPromise = f;
                }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
                let D = p2((f, O) => {
                  this.mem.setUint32(f + 0, O, true), this.mem.setUint32(f + 4, Math.floor(O / 4294967296), true);
                }, "setInt64"), E = p2((f) => {
                  let O = this.mem.getUint32(f + 0, true), z = this.mem.getInt32(f + 4, true);
                  return O + z * 4294967296;
                }, "getInt64"), g5 = p2((f) => {
                  let O = this.mem.getFloat64(f, true);
                  if (O === 0)
                    return;
                  if (!isNaN(O))
                    return O;
                  let z = this.mem.getUint32(f, true);
                  return this._values[z];
                }, "loadValue"), I = p2((f, O) => {
                  if (typeof O == "number" && O !== 0) {
                    if (isNaN(O)) {
                      this.mem.setUint32(f + 4, 2146959360, true), this.mem.setUint32(f, 0, true);
                      return;
                    }
                    this.mem.setFloat64(f, O, true);
                    return;
                  }
                  if (O === void 0) {
                    this.mem.setFloat64(f, 0, true);
                    return;
                  }
                  let P = this._ids.get(O);
                  P === void 0 && (P = this._idPool.pop(), P === void 0 && (P = this._values.length), this._values[P] = O, this._goRefCounts[P] = 0, this._ids.set(O, P)), this._goRefCounts[P]++;
                  let H = 0;
                  switch (typeof O) {
                    case "object":
                      O !== null && (H = 1);
                      break;
                    case "string":
                      H = 2;
                      break;
                    case "symbol":
                      H = 3;
                      break;
                    case "function":
                      H = 4;
                      break;
                  }
                  this.mem.setUint32(f + 4, 2146959360 | H, true), this.mem.setUint32(f, P, true);
                }, "storeValue"), R3 = p2((f) => {
                  let O = E(f + 0), z = E(f + 8);
                  return new Uint8Array(this._inst.exports.mem.buffer, O, z);
                }, "loadSlice"), C = p2((f) => {
                  let O = E(f + 0), z = E(f + 8), P = new Array(z);
                  for (let H = 0; H < z; H++)
                    P[H] = g5(O + H * 8);
                  return P;
                }, "loadSliceOfValues"), L = p2((f) => {
                  let O = E(f + 0), z = E(f + 8);
                  return at.decode(new DataView(this._inst.exports.mem.buffer, O, z));
                }, "loadString"), A = Date.now() - performance.now();
                this.importObject = { go: { "runtime.wasmExit": (f) => {
                  f >>>= 0;
                  let O = this.mem.getInt32(f + 8, true);
                  this.exited = true, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(O);
                }, "runtime.wasmWrite": (f) => {
                  f >>>= 0;
                  let O = E(f + 8), z = E(f + 16), P = this.mem.getInt32(f + 24, true);
                  J.fs.writeSync(O, new Uint8Array(this._inst.exports.mem.buffer, z, P));
                }, "runtime.resetMemoryDataView": (f) => {
                  f >>>= 0, this.mem = new DataView(this._inst.exports.mem.buffer);
                }, "runtime.nanotime1": (f) => {
                  f >>>= 0, D(f + 8, (A + performance.now()) * 1e6);
                }, "runtime.walltime": (f) => {
                  f >>>= 0;
                  let O = new Date().getTime();
                  D(f + 8, O / 1e3), this.mem.setInt32(f + 16, O % 1e3 * 1e6, true);
                }, "runtime.scheduleTimeoutEvent": (f) => {
                  f >>>= 0;
                  let O = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(O, setTimeout(() => {
                    for (this._resume(); this._scheduledTimeouts.has(O); )
                      console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
                  }, E(f + 8) + 1)), this.mem.setInt32(f + 16, O, true);
                }, "runtime.clearTimeoutEvent": (f) => {
                  f >>>= 0;
                  let O = this.mem.getInt32(f + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(O)), this._scheduledTimeouts.delete(O);
                }, "runtime.getRandomData": (f) => {
                  f >>>= 0, crypto.getRandomValues(R3(f + 8));
                }, "syscall/js.finalizeRef": (f) => {
                  f >>>= 0;
                  let O = this.mem.getUint32(f + 8, true);
                  if (this._goRefCounts[O]--, this._goRefCounts[O] === 0) {
                    let z = this._values[O];
                    this._values[O] = null, this._ids.delete(z), this._idPool.push(O);
                  }
                }, "syscall/js.stringVal": (f) => {
                  f >>>= 0, I(f + 24, L(f + 8));
                }, "syscall/js.valueGet": (f) => {
                  f >>>= 0;
                  let O = Reflect.get(g5(f + 8), L(f + 16));
                  f = this._inst.exports.getsp() >>> 0, I(f + 32, O);
                }, "syscall/js.valueSet": (f) => {
                  f >>>= 0, Reflect.set(g5(f + 8), L(f + 16), g5(f + 32));
                }, "syscall/js.valueDelete": (f) => {
                  f >>>= 0, Reflect.deleteProperty(g5(f + 8), L(f + 16));
                }, "syscall/js.valueIndex": (f) => {
                  f >>>= 0, I(f + 24, Reflect.get(g5(f + 8), E(f + 16)));
                }, "syscall/js.valueSetIndex": (f) => {
                  f >>>= 0, Reflect.set(g5(f + 8), E(f + 16), g5(f + 24));
                }, "syscall/js.valueCall": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = Reflect.get(O, L(f + 16)), P = C(f + 32), H = Reflect.apply(z, O, P);
                    f = this._inst.exports.getsp() >>> 0, I(f + 56, H), this.mem.setUint8(f + 64, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 56, O), this.mem.setUint8(f + 64, 0);
                  }
                }, "syscall/js.valueInvoke": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = C(f + 16), P = Reflect.apply(O, void 0, z);
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, P), this.mem.setUint8(f + 48, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, O), this.mem.setUint8(f + 48, 0);
                  }
                }, "syscall/js.valueNew": (f) => {
                  f >>>= 0;
                  try {
                    let O = g5(f + 8), z = C(f + 16), P = Reflect.construct(O, z);
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, P), this.mem.setUint8(f + 48, 1);
                  } catch (O) {
                    f = this._inst.exports.getsp() >>> 0, I(f + 40, O), this.mem.setUint8(f + 48, 0);
                  }
                }, "syscall/js.valueLength": (f) => {
                  f >>>= 0, D(f + 16, parseInt(g5(f + 8).length));
                }, "syscall/js.valuePrepareString": (f) => {
                  f >>>= 0;
                  let O = nt.encode(String(g5(f + 8)));
                  I(f + 16, O), D(f + 24, O.length);
                }, "syscall/js.valueLoadString": (f) => {
                  f >>>= 0;
                  let O = g5(f + 8);
                  R3(f + 16).set(O);
                }, "syscall/js.valueInstanceOf": (f) => {
                  f >>>= 0, this.mem.setUint8(f + 24, g5(f + 8) instanceof g5(f + 16) ? 1 : 0);
                }, "syscall/js.copyBytesToGo": (f) => {
                  f >>>= 0;
                  let O = R3(f + 8), z = g5(f + 32);
                  if (!(z instanceof Uint8Array || z instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(f + 48, 0);
                    return;
                  }
                  let P = z.subarray(0, O.length);
                  O.set(P), D(f + 40, P.length), this.mem.setUint8(f + 48, 1);
                }, "syscall/js.copyBytesToJS": (f) => {
                  f >>>= 0;
                  let O = g5(f + 8), z = R3(f + 16);
                  if (!(O instanceof Uint8Array || O instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(f + 48, 0);
                    return;
                  }
                  let P = z.subarray(0, O.length);
                  O.set(P), D(f + 40, P.length), this.mem.setUint8(f + 48, 1);
                }, debug: (f) => {
                  console.log(f);
                } } };
              }
              run(D) {
                return Z(this, null, function* () {
                  if (!(D instanceof WebAssembly.Instance))
                    throw new Error("Go.run: WebAssembly.Instance expected");
                  this._inst = D, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [NaN, 0, null, true, false, J, this], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([[0, 1], [null, 2], [true, 3], [false, 4], [J, 5], [this, 6]]), this._idPool = [], this.exited = false;
                  let E = 4096, g5 = p2((f) => {
                    let O = E, z = nt.encode(f + "\0");
                    return new Uint8Array(this.mem.buffer, E, z.length).set(z), E += z.length, E % 8 !== 0 && (E += 8 - E % 8), O;
                  }, "strPtr"), I = this.argv.length, R3 = [];
                  this.argv.forEach((f) => {
                    R3.push(g5(f));
                  }), R3.push(0), Object.keys(this.env).sort().forEach((f) => {
                    R3.push(g5(`${f}=${this.env[f]}`));
                  }), R3.push(0);
                  let L = E;
                  R3.forEach((f) => {
                    this.mem.setUint32(E, f, true), this.mem.setUint32(E + 4, 0, true), E += 8;
                  });
                  let A = 4096 + 8192;
                  if (E >= A)
                    throw new Error("total length of command line and environment variables exceeds limit");
                  this._inst.exports.run(I, L), this.exited && this._resolveExitPromise(), yield this._exitPromise;
                });
              }
              _resume() {
                if (this.exited)
                  throw new Error("Go program has already exited");
                this._inst.exports.resume(), this.exited && this._resolveExitPromise();
              }
              _makeFuncWrapper(D) {
                let E = this;
                return function() {
                  let g5 = { id: D, this: this, args: arguments };
                  return E._pendingEvent = g5, E._resume(), g5.result;
                };
              }
            };
          })(), rt = p2(({ data: q3 }) => {
            let nt = new TextDecoder(), at = J.fs, D = "";
            at.writeSync = (C, L) => {
              if (C === 1)
                Y(L);
              else if (C === 2) {
                D += nt.decode(L);
                let A = D.split(`
`);
                A.length > 1 && console.log(A.slice(0, -1).join(`
`)), D = A[A.length - 1];
              } else
                throw new Error("Bad write");
              return L.length;
            };
            let E = [], g5, I = 0;
            rt = p2(({ data: C }) => {
              C.length > 0 && (E.push(C), g5 && g5());
            }, "onmessage"), at.read = (C, L, A, f, O, z) => {
              if (C !== 0 || A !== 0 || f !== L.length || O !== null)
                throw new Error("Bad read");
              if (E.length === 0) {
                g5 = p2(() => at.read(C, L, A, f, O, z), "resumeStdin");
                return;
              }
              let P = E[0], H = Math.max(0, Math.min(f, P.length - I));
              L.set(P.subarray(I, I + H), A), I += H, I === P.length && (E.shift(), I = 0), z(null, H);
            };
            let R3 = new J.Go();
            R3.argv = ["", "--service=0.16.13"], tt(q3, R3).then((C) => {
              Y(null), R3.run(C);
            }, (C) => {
              Y(C);
            });
          }, "onmessage");
          function tt(q3, nt) {
            return Z(this, null, function* () {
              if (q3 instanceof WebAssembly.Module)
                return WebAssembly.instantiate(q3, nt.importObject);
              let at = yield fetch(q3);
              if (!at.ok)
                throw new Error(`Failed to download ${JSON.stringify(q3)}`);
              if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(at.headers.get("Content-Type") || ""))
                return (yield WebAssembly.instantiateStreaming(at, nt.importObject)).instance;
              let D = yield at.arrayBuffer();
              return (yield WebAssembly.instantiate(D, nt.importObject)).instance;
            });
          }
          return p2(tt, "tryToInstantiateModule"), (q3) => rt(q3);
        })((Y) => M.onmessage({ data: Y }));
        M = { onmessage: null, postMessage: (Y) => setTimeout(() => V({ data: Y })), terminate() {
        } };
      }
      let T, $5, j3 = new Promise((V, Y) => {
        T = V, $5 = Y;
      });
      M.onmessage = ({ data: V }) => {
        M.onmessage = ({ data: Y }) => U3(Y), V ? $5(V) : T();
      }, M.postMessage(d || new URL(h3, location.href).toString());
      let { readFromStdout: U3, service: x } = Ns({ writeToStdin(V) {
        M.postMessage(V);
      }, isSync: false, isWriteUnavailable: true, esbuild: c });
      yield j3, Lr = { build: (V) => new Promise((Y, Z) => x.buildOrServe({ callName: "build", refs: null, serveOptions: null, options: V, isTTY: false, defaultWD: "/", callback: (rt, J) => rt ? Z(rt) : Y(J) })), transform: (V, Y) => new Promise((Z, rt) => x.transform({ callName: "transform", refs: null, input: V, options: Y || {}, isTTY: false, fs: { readFile(J, tt) {
        tt(new Error("Internal error"), null);
      }, writeFile(J, tt) {
        tt(null);
      } }, callback: (J, tt) => J ? rt(J) : Z(tt) })), formatMessages: (V, Y) => new Promise((Z, rt) => x.formatMessages({ callName: "formatMessages", refs: null, messages: V, options: Y, callback: (J, tt) => J ? rt(J) : Z(tt) })), analyzeMetafile: (V, Y) => new Promise((Z, rt) => x.analyzeMetafile({ callName: "analyzeMetafile", refs: null, metafile: typeof V == "string" ? V : JSON.stringify(V), options: Y, callback: (J, tt) => J ? rt(J) : Z(tt) })) };
    }), "startRunningService"), ro = c;
  })(typeof Cn == "object" ? Cn : { set exports(t4) {
    (typeof self < "u" ? self : this).esbuild = t4;
  } });
});
o3();
o3();
var ma2 = new Error("timeout while waiting for mutex to become available");
var ga2 = new Error("mutex already locked");
var no2 = new Error("request for lock canceled");
var io2 = function(t4, e3, r3, n) {
  function s(o5) {
    return o5 instanceof r3 ? o5 : new r3(function(a) {
      a(o5);
    });
  }
  return p2(s, "adopt"), new (r3 || (r3 = Promise))(function(o5, a) {
    function u(_) {
      try {
        c(n.next(_));
      } catch (p3) {
        a(p3);
      }
    }
    p2(u, "fulfilled");
    function l3(_) {
      try {
        c(n.throw(_));
      } catch (p3) {
        a(p3);
      }
    }
    p2(l3, "rejected");
    function c(_) {
      _.done ? o5(_.value) : s(_.value).then(u, l3);
    }
    p2(c, "step"), c((n = n.apply(t4, e3 || [])).next());
  });
};
var yr2 = class {
  constructor(e3, r3 = no2) {
    this._value = e3, this._cancelError = r3, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    return new Promise((r3, n) => {
      this._weightedQueues[e3 - 1] || (this._weightedQueues[e3 - 1] = []), this._weightedQueues[e3 - 1].push({ resolve: r3, reject: n }), this._dispatch();
    });
  }
  runExclusive(e3, r3 = 1) {
    return io2(this, void 0, void 0, function* () {
      let [n, s] = yield this.acquire(r3);
      try {
        return yield e3(n);
      } finally {
        s();
      }
    });
  }
  waitForUnlock(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    return new Promise((r3) => {
      this._weightedWaiters[e3 - 1] || (this._weightedWaiters[e3 - 1] = []), this._weightedWaiters[e3 - 1].push(r3), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(e3) {
    this._value = e3, this._dispatch();
  }
  release(e3 = 1) {
    if (e3 <= 0)
      throw new Error(`invalid weight ${e3}: must be positive`);
    this._value += e3, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((e3) => e3.forEach((r3) => r3.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var e3;
    for (let r3 = this._value; r3 > 0; r3--) {
      let n = (e3 = this._weightedQueues[r3 - 1]) === null || e3 === void 0 ? void 0 : e3.shift();
      if (!n)
        continue;
      let s = this._value, o5 = r3;
      this._value -= r3, r3 = this._value + 1, n.resolve([s, this._newReleaser(o5)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(e3) {
    let r3 = false;
    return () => {
      r3 || (r3 = true, this.release(e3));
    };
  }
  _drainUnlockWaiters() {
    for (let e3 = this._value; e3 > 0; e3--)
      this._weightedWaiters[e3 - 1] && (this._weightedWaiters[e3 - 1].forEach((r3) => r3()), this._weightedWaiters[e3 - 1] = []);
  }
};
p2(yr2, "Semaphore");
var so2 = function(t4, e3, r3, n) {
  function s(o5) {
    return o5 instanceof r3 ? o5 : new r3(function(a) {
      a(o5);
    });
  }
  return p2(s, "adopt"), new (r3 || (r3 = Promise))(function(o5, a) {
    function u(_) {
      try {
        c(n.next(_));
      } catch (p3) {
        a(p3);
      }
    }
    p2(u, "fulfilled");
    function l3(_) {
      try {
        c(n.throw(_));
      } catch (p3) {
        a(p3);
      }
    }
    p2(l3, "rejected");
    function c(_) {
      _.done ? o5(_.value) : s(_.value).then(u, l3);
    }
    p2(c, "step"), c((n = n.apply(t4, e3 || [])).next());
  });
};
var Ke2 = class {
  constructor(e3) {
    this._semaphore = new yr2(1, e3);
  }
  acquire() {
    return so2(this, void 0, void 0, function* () {
      let [, e3] = yield this._semaphore.acquire();
      return e3;
    });
  }
  runExclusive(e3) {
    return this._semaphore.runExclusive(() => e3());
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
p2(Ke2, "Mutex");
o3();
var or2 = "delete";
var _t2 = 5;
var Jt2 = 1 << _t2;
var zt2 = Jt2 - 1;
var ot2 = {};
function Kr2() {
  return { value: false };
}
p2(Kr2, "MakeRef");
function Ht2(t4) {
  t4 && (t4.value = true);
}
p2(Ht2, "SetRef");
function nn2() {
}
p2(nn2, "OwnerID");
function Re2(t4) {
  return t4.size === void 0 && (t4.size = t4.__iterate(Oi2)), t4.size;
}
p2(Re2, "ensureSize");
function me2(t4, e3) {
  if (typeof e3 != "number") {
    var r3 = e3 >>> 0;
    if ("" + r3 !== e3 || r3 === 4294967295)
      return NaN;
    e3 = r3;
  }
  return e3 < 0 ? Re2(t4) + e3 : e3;
}
p2(me2, "wrapIndex");
function Oi2() {
  return true;
}
p2(Oi2, "returnTrue");
function Mr2(t4, e3, r3) {
  return (t4 === 0 && !ki2(t4) || r3 !== void 0 && t4 <= -r3) && (e3 === void 0 || r3 !== void 0 && e3 >= r3);
}
p2(Mr2, "wholeSlice");
function ar2(t4, e3) {
  return Ii2(t4, e3, 0);
}
p2(ar2, "resolveBegin");
function xr2(t4, e3) {
  return Ii2(t4, e3, e3);
}
p2(xr2, "resolveEnd");
function Ii2(t4, e3, r3) {
  return t4 === void 0 ? r3 : ki2(t4) ? e3 === 1 / 0 ? e3 : Math.max(0, e3 + t4) | 0 : e3 === void 0 || e3 === t4 ? t4 : Math.min(e3, t4) | 0;
}
p2(Ii2, "resolveIndex");
function ki2(t4) {
  return t4 < 0 || t4 === 0 && 1 / t4 === -1 / 0;
}
p2(ki2, "isNeg");
var ji2 = "@@__IMMUTABLE_ITERABLE__@@";
function Nt2(t4) {
  return Boolean(t4 && t4[ji2]);
}
p2(Nt2, "isCollection");
var Mi2 = "@@__IMMUTABLE_KEYED__@@";
function vt2(t4) {
  return Boolean(t4 && t4[Mi2]);
}
p2(vt2, "isKeyed");
var xi2 = "@@__IMMUTABLE_INDEXED__@@";
function Ut2(t4) {
  return Boolean(t4 && t4[xi2]);
}
p2(Ut2, "isIndexed");
function Ar2(t4) {
  return vt2(t4) || Ut2(t4);
}
p2(Ar2, "isAssociative");
var Et2 = p2(function(e3) {
  return Nt2(e3) ? e3 : Wt2(e3);
}, "Collection");
var Gt2 = function(t4) {
  function e3(r3) {
    return vt2(r3) ? r3 : ve2(r3);
  }
  return p2(e3, "KeyedCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et2);
var Oe2 = function(t4) {
  function e3(r3) {
    return Ut2(r3) ? r3 : ie2(r3);
  }
  return p2(e3, "IndexedCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et2);
var Ue2 = function(t4) {
  function e3(r3) {
    return Nt2(r3) && !Ar2(r3) ? r3 : Le2(r3);
  }
  return p2(e3, "SetCollection"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3;
}(Et2);
Et2.Keyed = Gt2;
Et2.Indexed = Oe2;
Et2.Set = Ue2;
var Ai2 = "@@__IMMUTABLE_SEQ__@@";
function sn2(t4) {
  return Boolean(t4 && t4[Ai2]);
}
p2(sn2, "isSeq");
var Ri2 = "@@__IMMUTABLE_RECORD__@@";
function Ne2(t4) {
  return Boolean(t4 && t4[Ri2]);
}
p2(Ne2, "isRecord");
function ue2(t4) {
  return Nt2(t4) || Ne2(t4);
}
p2(ue2, "isImmutable");
var Fe2 = "@@__IMMUTABLE_ORDERED__@@";
function re2(t4) {
  return Boolean(t4 && t4[Fe2]);
}
p2(re2, "isOrdered");
var ur2 = 0;
var ne2 = 1;
var Yt2 = 2;
var Yr2 = typeof Symbol == "function" && Symbol.iterator;
var Ti2 = "@@iterator";
var Rr2 = Yr2 || Ti2;
var lt2 = p2(function(e3) {
  this.next = e3;
}, "Iterator");
lt2.prototype.toString = p2(function() {
  return "[Iterator]";
}, "toString");
lt2.KEYS = ur2;
lt2.VALUES = ne2;
lt2.ENTRIES = Yt2;
lt2.prototype.inspect = lt2.prototype.toSource = function() {
  return this.toString();
};
lt2.prototype[Rr2] = function() {
  return this;
};
function yt2(t4, e3, r3, n) {
  var s = t4 === 0 ? e3 : t4 === 1 ? r3 : [e3, r3];
  return n ? n.value = s : n = { value: s, done: false }, n;
}
p2(yt2, "iteratorValue");
function Ft2() {
  return { value: void 0, done: true };
}
p2(Ft2, "iteratorDone");
function $i2(t4) {
  return Array.isArray(t4) ? true : !!Tr2(t4);
}
p2($i2, "hasIterator");
function Zn2(t4) {
  return t4 && typeof t4.next == "function";
}
p2(Zn2, "isIterator");
function Gr2(t4) {
  var e3 = Tr2(t4);
  return e3 && e3.call(t4);
}
p2(Gr2, "getIterator");
function Tr2(t4) {
  var e3 = t4 && (Yr2 && t4[Yr2] || t4[Ti2]);
  if (typeof e3 == "function")
    return e3;
}
p2(Tr2, "getIteratorFn");
function oo2(t4) {
  var e3 = Tr2(t4);
  return e3 && e3 === t4.entries;
}
p2(oo2, "isEntriesIterable");
function ao2(t4) {
  var e3 = Tr2(t4);
  return e3 && e3 === t4.keys;
}
p2(ao2, "isKeysIterable");
var qe2 = Object.prototype.hasOwnProperty;
function zi2(t4) {
  return Array.isArray(t4) || typeof t4 == "string" ? true : t4 && typeof t4 == "object" && Number.isInteger(t4.length) && t4.length >= 0 && (t4.length === 0 ? Object.keys(t4).length === 1 : t4.hasOwnProperty(t4.length - 1));
}
p2(zi2, "isArrayLike");
var Wt2 = function(t4) {
  function e3(r3) {
    return r3 == null ? an2() : ue2(r3) ? r3.toSeq() : lo2(r3);
  }
  return p2(e3, "Seq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toSeq = p2(function() {
    return this;
  }, "toSeq"), e3.prototype.toString = p2(function() {
    return this.__toString("Seq {", "}");
  }, "toString"), e3.prototype.cacheResult = p2(function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, "cacheResult"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this._cache;
    if (o5) {
      for (var a = o5.length, u = 0; u !== a; ) {
        var l3 = o5[s ? a - ++u : u++];
        if (n(l3[1], l3[0], this) === false)
          break;
      }
      return u;
    }
    return this.__iterateUncached(n, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this._cache;
    if (o5) {
      var a = o5.length, u = 0;
      return new lt2(function() {
        if (u === a)
          return Ft2();
        var l3 = o5[s ? a - ++u : u++];
        return yt2(n, l3[0], l3[1]);
      });
    }
    return this.__iteratorUncached(n, s);
  }, "__iterator"), e3;
}(Et2);
var ve2 = function(t4) {
  function e3(r3) {
    return r3 == null ? an2().toKeyedSeq() : Nt2(r3) ? vt2(r3) ? r3.toSeq() : r3.fromEntrySeq() : Ne2(r3) ? r3.toSeq() : un2(r3);
  }
  return p2(e3, "KeyedSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toKeyedSeq = p2(function() {
    return this;
  }, "toKeyedSeq"), e3;
}(Wt2);
var ie2 = function(t4) {
  function e3(r3) {
    return r3 == null ? an2() : Nt2(r3) ? vt2(r3) ? r3.entrySeq() : r3.toIndexedSeq() : Ne2(r3) ? r3.toSeq().entrySeq() : Pi2(r3);
  }
  return p2(e3, "IndexedSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return e3(arguments);
  }, "of"), e3.prototype.toIndexedSeq = p2(function() {
    return this;
  }, "toIndexedSeq"), e3.prototype.toString = p2(function() {
    return this.__toString("Seq [", "]");
  }, "toString"), e3;
}(Wt2);
var Le2 = function(t4) {
  function e3(r3) {
    return (Nt2(r3) && !Ar2(r3) ? r3 : ie2(r3)).toSetSeq();
  }
  return p2(e3, "SetSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return e3(arguments);
  }, "of"), e3.prototype.toSetSeq = p2(function() {
    return this;
  }, "toSetSeq"), e3;
}(Wt2);
Wt2.isSeq = sn2;
Wt2.Keyed = ve2;
Wt2.Set = Le2;
Wt2.Indexed = ie2;
Wt2.prototype[Ai2] = true;
var Ee2 = function(t4) {
  function e3(r3) {
    this._array = r3, this.size = r3.length;
  }
  return p2(e3, "ArraySeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p2(function(n, s) {
    return this.has(n) ? this._array[me2(this, n)] : s;
  }, "get"), e3.prototype.__iterate = p2(function(n, s) {
    for (var o5 = this._array, a = o5.length, u = 0; u !== a; ) {
      var l3 = s ? a - ++u : u++;
      if (n(o5[l3], l3, this) === false)
        break;
    }
    return u;
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this._array, a = o5.length, u = 0;
    return new lt2(function() {
      if (u === a)
        return Ft2();
      var l3 = s ? a - ++u : u++;
      return yt2(n, l3, o5[l3]);
    });
  }, "__iterator"), e3;
}(ie2);
var on2 = function(t4) {
  function e3(r3) {
    var n = Object.keys(r3).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r3) : []);
    this._object = r3, this._keys = n, this.size = n.length;
  }
  return p2(e3, "ObjectSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p2(function(n, s) {
    return s !== void 0 && !this.has(n) ? s : this._object[n];
  }, "get"), e3.prototype.has = p2(function(n) {
    return qe2.call(this._object, n);
  }, "has"), e3.prototype.__iterate = p2(function(n, s) {
    for (var o5 = this._object, a = this._keys, u = a.length, l3 = 0; l3 !== u; ) {
      var c = a[s ? u - ++l3 : l3++];
      if (n(o5[c], c, this) === false)
        break;
    }
    return l3;
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this._object, a = this._keys, u = a.length, l3 = 0;
    return new lt2(function() {
      if (l3 === u)
        return Ft2();
      var c = a[s ? u - ++l3 : l3++];
      return yt2(n, c, o5[c]);
    });
  }, "__iterator"), e3;
}(ve2);
on2.prototype[Fe2] = true;
var uo2 = function(t4) {
  function e3(r3) {
    this._collection = r3, this.size = r3.length || r3.size;
  }
  return p2(e3, "CollectionSeq"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.__iterateUncached = p2(function(n, s) {
    if (s)
      return this.cacheResult().__iterate(n, s);
    var o5 = this._collection, a = Gr2(o5), u = 0;
    if (Zn2(a))
      for (var l3; !(l3 = a.next()).done && n(l3.value, u++, this) !== false; )
        ;
    return u;
  }, "__iterateUncached"), e3.prototype.__iteratorUncached = p2(function(n, s) {
    if (s)
      return this.cacheResult().__iterator(n, s);
    var o5 = this._collection, a = Gr2(o5);
    if (!Zn2(a))
      return new lt2(Ft2);
    var u = 0;
    return new lt2(function() {
      var l3 = a.next();
      return l3.done ? l3 : yt2(n, u++, l3.value);
    });
  }, "__iteratorUncached"), e3;
}(ie2);
var ti2;
function an2() {
  return ti2 || (ti2 = new Ee2([]));
}
p2(an2, "emptySequence");
function un2(t4) {
  var e3 = ln2(t4);
  if (e3)
    return e3.fromEntrySeq();
  if (typeof t4 == "object")
    return new on2(t4);
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + t4);
}
p2(un2, "keyedSeqFromValue");
function Pi2(t4) {
  var e3 = ln2(t4);
  if (e3)
    return e3;
  throw new TypeError("Expected Array or collection object of values: " + t4);
}
p2(Pi2, "indexedSeqFromValue");
function lo2(t4) {
  var e3 = ln2(t4);
  if (e3)
    return oo2(t4) ? e3.fromEntrySeq() : ao2(t4) ? e3.toSetSeq() : e3;
  if (typeof t4 == "object")
    return new on2(t4);
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + t4);
}
p2(lo2, "seqFromValue");
function ln2(t4) {
  return zi2(t4) ? new Ee2(t4) : $i2(t4) ? new uo2(t4) : void 0;
}
p2(ln2, "maybeIndexedSeqFromValue");
var Di2 = "@@__IMMUTABLE_MAP__@@";
function fn2(t4) {
  return Boolean(t4 && t4[Di2]);
}
p2(fn2, "isMap");
function Ci2(t4) {
  return fn2(t4) && re2(t4);
}
p2(Ci2, "isOrderedMap");
function ei2(t4) {
  return Boolean(t4 && typeof t4.equals == "function" && typeof t4.hashCode == "function");
}
p2(ei2, "isValueObject");
function Bt2(t4, e3) {
  if (t4 === e3 || t4 !== t4 && e3 !== e3)
    return true;
  if (!t4 || !e3)
    return false;
  if (typeof t4.valueOf == "function" && typeof e3.valueOf == "function") {
    if (t4 = t4.valueOf(), e3 = e3.valueOf(), t4 === e3 || t4 !== t4 && e3 !== e3)
      return true;
    if (!t4 || !e3)
      return false;
  }
  return !!(ei2(t4) && ei2(e3) && t4.equals(e3));
}
p2(Bt2, "is");
var Ye2 = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : p2(function(e3, r3) {
  e3 |= 0, r3 |= 0;
  var n = e3 & 65535, s = r3 & 65535;
  return n * s + ((e3 >>> 16) * s + n * (r3 >>> 16) << 16 >>> 0) | 0;
}, "imul");
function $r2(t4) {
  return t4 >>> 1 & 1073741824 | t4 & 3221225471;
}
p2($r2, "smi");
var fo2 = Object.prototype.valueOf;
function Lt2(t4) {
  if (t4 == null)
    return ri2(t4);
  if (typeof t4.hashCode == "function")
    return $r2(t4.hashCode(t4));
  var e3 = go2(t4);
  if (e3 == null)
    return ri2(e3);
  switch (typeof e3) {
    case "boolean":
      return e3 ? 1108378657 : 1108378656;
    case "number":
      return co2(e3);
    case "string":
      return e3.length > vo2 ? ho2(e3) : Qr2(e3);
    case "object":
    case "function":
      return _o2(e3);
    case "symbol":
      return po2(e3);
    default:
      if (typeof e3.toString == "function")
        return Qr2(e3.toString());
      throw new Error("Value type " + typeof e3 + " cannot be hashed.");
  }
}
p2(Lt2, "hash");
function ri2(t4) {
  return t4 === null ? 1108378658 : 1108378659;
}
p2(ri2, "hashNullish");
function co2(t4) {
  if (t4 !== t4 || t4 === 1 / 0)
    return 0;
  var e3 = t4 | 0;
  for (e3 !== t4 && (e3 ^= t4 * 4294967295); t4 > 4294967295; )
    t4 /= 4294967295, e3 ^= t4;
  return $r2(e3);
}
p2(co2, "hashNumber");
function ho2(t4) {
  var e3 = Vr2[t4];
  return e3 === void 0 && (e3 = Qr2(t4), Wr2 === yo2 && (Wr2 = 0, Vr2 = {}), Wr2++, Vr2[t4] = e3), e3;
}
p2(ho2, "cachedHashString");
function Qr2(t4) {
  for (var e3 = 0, r3 = 0; r3 < t4.length; r3++)
    e3 = 31 * e3 + t4.charCodeAt(r3) | 0;
  return $r2(e3);
}
p2(Qr2, "hashString");
function po2(t4) {
  var e3 = si2[t4];
  return e3 !== void 0 || (e3 = Ui2(), si2[t4] = e3), e3;
}
p2(po2, "hashSymbol");
function _o2(t4) {
  var e3;
  if (Xr2 && (e3 = Zr2.get(t4), e3 !== void 0) || (e3 = t4[Se2], e3 !== void 0) || !ii2 && (e3 = t4.propertyIsEnumerable && t4.propertyIsEnumerable[Se2], e3 !== void 0 || (e3 = mo2(t4), e3 !== void 0)))
    return e3;
  if (e3 = Ui2(), Xr2)
    Zr2.set(t4, e3);
  else {
    if (ni2 !== void 0 && ni2(t4) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (ii2)
      Object.defineProperty(t4, Se2, { enumerable: false, configurable: false, writable: false, value: e3 });
    else if (t4.propertyIsEnumerable !== void 0 && t4.propertyIsEnumerable === t4.constructor.prototype.propertyIsEnumerable)
      t4.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t4.propertyIsEnumerable[Se2] = e3;
    else if (t4.nodeType !== void 0)
      t4[Se2] = e3;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return e3;
}
p2(_o2, "hashJSObj");
var ni2 = Object.isExtensible;
var ii2 = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function mo2(t4) {
  if (t4 && t4.nodeType > 0)
    switch (t4.nodeType) {
      case 1:
        return t4.uniqueID;
      case 9:
        return t4.documentElement && t4.documentElement.uniqueID;
    }
}
p2(mo2, "getIENodeHash");
function go2(t4) {
  return t4.valueOf !== fo2 && typeof t4.valueOf == "function" ? t4.valueOf(t4) : t4;
}
p2(go2, "valueOf");
function Ui2() {
  var t4 = ++Br2;
  return Br2 & 1073741824 && (Br2 = 0), t4;
}
p2(Ui2, "nextHash");
var Xr2 = typeof WeakMap == "function";
var Zr2;
Xr2 && (Zr2 = /* @__PURE__ */ new WeakMap());
var si2 = /* @__PURE__ */ Object.create(null);
var Br2 = 0;
var Se2 = "__immutablehash__";
typeof Symbol == "function" && (Se2 = Symbol(Se2));
var vo2 = 16;
var yo2 = 255;
var Wr2 = 0;
var Vr2 = {};
var zr2 = function(t4) {
  function e3(r3, n) {
    this._iter = r3, this._useKeys = n, this.size = r3.size;
  }
  return p2(e3, "ToKeyedSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.get = p2(function(n, s) {
    return this._iter.get(n, s);
  }, "get"), e3.prototype.has = p2(function(n) {
    return this._iter.has(n);
  }, "has"), e3.prototype.valueSeq = p2(function() {
    return this._iter.valueSeq();
  }, "valueSeq"), e3.prototype.reverse = p2(function() {
    var n = this, s = cn2(this, true);
    return this._useKeys || (s.valueSeq = function() {
      return n._iter.toSeq().reverse();
    }), s;
  }, "reverse"), e3.prototype.map = p2(function(n, s) {
    var o5 = this, a = Bi2(this, n, s);
    return this._useKeys || (a.valueSeq = function() {
      return o5._iter.toSeq().map(n, s);
    }), a;
  }, "map"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a, u) {
      return n(a, u, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    return this._iter.__iterator(n, s);
  }, "__iterator"), e3;
}(ve2);
zr2.prototype[Fe2] = true;
var Ni2 = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p2(e3, "ToIndexedSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.includes = p2(function(n) {
    return this._iter.includes(n);
  }, "includes"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this, a = 0;
    return s && Re2(this), this._iter.__iterate(function(u) {
      return n(u, s ? o5.size - ++a : a++, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this, a = this._iter.__iterator(ne2, s), u = 0;
    return s && Re2(this), new lt2(function() {
      var l3 = a.next();
      return l3.done ? l3 : yt2(n, s ? o5.size - ++u : u++, l3.value, l3);
    });
  }, "__iterator"), e3;
}(ie2);
var Fi2 = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p2(e3, "ToSetSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.has = p2(function(n) {
    return this._iter.includes(n);
  }, "has"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a) {
      return n(a, a, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this._iter.__iterator(ne2, s);
    return new lt2(function() {
      var a = o5.next();
      return a.done ? a : yt2(n, a.value, a.value, a);
    });
  }, "__iterator"), e3;
}(Le2);
var qi2 = function(t4) {
  function e3(r3) {
    this._iter = r3, this.size = r3.size;
  }
  return p2(e3, "FromEntriesSequence"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.entrySeq = p2(function() {
    return this._iter.toSeq();
  }, "entrySeq"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    return this._iter.__iterate(function(a) {
      if (a) {
        ai2(a);
        var u = Nt2(a);
        return n(u ? a.get(1) : a[1], u ? a.get(0) : a[0], o5);
      }
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this._iter.__iterator(ne2, s);
    return new lt2(function() {
      for (; ; ) {
        var a = o5.next();
        if (a.done)
          return a;
        var u = a.value;
        if (u) {
          ai2(u);
          var l3 = Nt2(u);
          return yt2(n, l3 ? u.get(0) : u[0], l3 ? u.get(1) : u[1], a);
        }
      }
    });
  }, "__iterator"), e3;
}(ve2);
Ni2.prototype.cacheResult = zr2.prototype.cacheResult = Fi2.prototype.cacheResult = qi2.prototype.cacheResult = dn2;
function Li2(t4) {
  var e3 = le2(t4);
  return e3._iter = t4, e3.size = t4.size, e3.flip = function() {
    return t4;
  }, e3.reverse = function() {
    var r3 = t4.reverse.apply(this);
    return r3.flip = function() {
      return t4.reverse();
    }, r3;
  }, e3.has = function(r3) {
    return t4.includes(r3);
  }, e3.includes = function(r3) {
    return t4.has(r3);
  }, e3.cacheResult = dn2, e3.__iterateUncached = function(r3, n) {
    var s = this;
    return t4.__iterate(function(o5, a) {
      return r3(a, o5, s) !== false;
    }, n);
  }, e3.__iteratorUncached = function(r3, n) {
    if (r3 === Yt2) {
      var s = t4.__iterator(r3, n);
      return new lt2(function() {
        var o5 = s.next();
        if (!o5.done) {
          var a = o5.value[0];
          o5.value[0] = o5.value[1], o5.value[1] = a;
        }
        return o5;
      });
    }
    return t4.__iterator(r3 === ne2 ? ur2 : ne2, n);
  }, e3;
}
p2(Li2, "flipFactory");
function Bi2(t4, e3, r3) {
  var n = le2(t4);
  return n.size = t4.size, n.has = function(s) {
    return t4.has(s);
  }, n.get = function(s, o5) {
    var a = t4.get(s, ot2);
    return a === ot2 ? o5 : e3.call(r3, a, s, t4);
  }, n.__iterateUncached = function(s, o5) {
    var a = this;
    return t4.__iterate(function(u, l3, c) {
      return s(e3.call(r3, u, l3, c), l3, a) !== false;
    }, o5);
  }, n.__iteratorUncached = function(s, o5) {
    var a = t4.__iterator(Yt2, o5);
    return new lt2(function() {
      var u = a.next();
      if (u.done)
        return u;
      var l3 = u.value, c = l3[0];
      return yt2(s, c, e3.call(r3, l3[1], c, t4), u);
    });
  }, n;
}
p2(Bi2, "mapFactory");
function cn2(t4, e3) {
  var r3 = this, n = le2(t4);
  return n._iter = t4, n.size = t4.size, n.reverse = function() {
    return t4;
  }, t4.flip && (n.flip = function() {
    var s = Li2(t4);
    return s.reverse = function() {
      return t4.flip();
    }, s;
  }), n.get = function(s, o5) {
    return t4.get(e3 ? s : -1 - s, o5);
  }, n.has = function(s) {
    return t4.has(e3 ? s : -1 - s);
  }, n.includes = function(s) {
    return t4.includes(s);
  }, n.cacheResult = dn2, n.__iterate = function(s, o5) {
    var a = this, u = 0;
    return o5 && Re2(t4), t4.__iterate(function(l3, c) {
      return s(l3, e3 ? c : o5 ? a.size - ++u : u++, a);
    }, !o5);
  }, n.__iterator = function(s, o5) {
    var a = 0;
    o5 && Re2(t4);
    var u = t4.__iterator(Yt2, !o5);
    return new lt2(function() {
      var l3 = u.next();
      if (l3.done)
        return l3;
      var c = l3.value;
      return yt2(s, e3 ? c[0] : o5 ? r3.size - ++a : a++, c[1], l3);
    });
  }, n;
}
p2(cn2, "reverseFactory");
function Wi2(t4, e3, r3, n) {
  var s = le2(t4);
  return n && (s.has = function(o5) {
    var a = t4.get(o5, ot2);
    return a !== ot2 && !!e3.call(r3, a, o5, t4);
  }, s.get = function(o5, a) {
    var u = t4.get(o5, ot2);
    return u !== ot2 && e3.call(r3, u, o5, t4) ? u : a;
  }), s.__iterateUncached = function(o5, a) {
    var u = this, l3 = 0;
    return t4.__iterate(function(c, _, p3) {
      if (e3.call(r3, c, _, p3))
        return l3++, o5(c, n ? _ : l3 - 1, u);
    }, a), l3;
  }, s.__iteratorUncached = function(o5, a) {
    var u = t4.__iterator(Yt2, a), l3 = 0;
    return new lt2(function() {
      for (; ; ) {
        var c = u.next();
        if (c.done)
          return c;
        var _ = c.value, p3 = _[0], w3 = _[1];
        if (e3.call(r3, w3, p3, t4))
          return yt2(o5, n ? p3 : l3++, w3, c);
      }
    });
  }, s;
}
p2(Wi2, "filterFactory");
function wo2(t4, e3, r3) {
  var n = We2().asMutable();
  return t4.__iterate(function(s, o5) {
    n.update(e3.call(r3, s, o5, t4), 0, function(a) {
      return a + 1;
    });
  }), n.asImmutable();
}
p2(wo2, "countByFactory");
function bo2(t4, e3, r3) {
  var n = vt2(t4), s = (re2(t4) ? he2() : We2()).asMutable();
  t4.__iterate(function(a, u) {
    s.update(e3.call(r3, a, u, t4), function(l3) {
      return l3 = l3 || [], l3.push(n ? [u, a] : a), l3;
    });
  });
  var o5 = pn2(t4);
  return s.map(function(a) {
    return ht2(t4, o5(a));
  }).asImmutable();
}
p2(bo2, "groupByFactory");
function So2(t4, e3, r3) {
  var n = vt2(t4), s = [[], []];
  t4.__iterate(function(a, u) {
    s[e3.call(r3, a, u, t4) ? 1 : 0].push(n ? [u, a] : a);
  });
  var o5 = pn2(t4);
  return s.map(function(a) {
    return ht2(t4, o5(a));
  });
}
p2(So2, "partitionFactory");
function hn2(t4, e3, r3, n) {
  var s = t4.size;
  if (Mr2(e3, r3, s))
    return t4;
  var o5 = ar2(e3, s), a = xr2(r3, s);
  if (o5 !== o5 || a !== a)
    return hn2(t4.toSeq().cacheResult(), e3, r3, n);
  var u = a - o5, l3;
  u === u && (l3 = u < 0 ? 0 : u);
  var c = le2(t4);
  return c.size = l3 === 0 ? l3 : t4.size && l3 || void 0, !n && sn2(t4) && l3 >= 0 && (c.get = function(_, p3) {
    return _ = me2(this, _), _ >= 0 && _ < l3 ? t4.get(_ + o5, p3) : p3;
  }), c.__iterateUncached = function(_, p3) {
    var w3 = this;
    if (l3 === 0)
      return 0;
    if (p3)
      return this.cacheResult().__iterate(_, p3);
    var v = 0, y = true, b3 = 0;
    return t4.__iterate(function(k3, X) {
      if (!(y && (y = v++ < o5)))
        return b3++, _(k3, n ? X : b3 - 1, w3) !== false && b3 !== l3;
    }), b3;
  }, c.__iteratorUncached = function(_, p3) {
    if (l3 !== 0 && p3)
      return this.cacheResult().__iterator(_, p3);
    if (l3 === 0)
      return new lt2(Ft2);
    var w3 = t4.__iterator(_, p3), v = 0, y = 0;
    return new lt2(function() {
      for (; v++ < o5; )
        w3.next();
      if (++y > l3)
        return Ft2();
      var b3 = w3.next();
      return n || _ === ne2 || b3.done ? b3 : _ === ur2 ? yt2(_, y - 1, void 0, b3) : yt2(_, y - 1, b3.value[1], b3);
    });
  }, c;
}
p2(hn2, "sliceFactory");
function Eo2(t4, e3, r3) {
  var n = le2(t4);
  return n.__iterateUncached = function(s, o5) {
    var a = this;
    if (o5)
      return this.cacheResult().__iterate(s, o5);
    var u = 0;
    return t4.__iterate(function(l3, c, _) {
      return e3.call(r3, l3, c, _) && ++u && s(l3, c, a);
    }), u;
  }, n.__iteratorUncached = function(s, o5) {
    var a = this;
    if (o5)
      return this.cacheResult().__iterator(s, o5);
    var u = t4.__iterator(Yt2, o5), l3 = true;
    return new lt2(function() {
      if (!l3)
        return Ft2();
      var c = u.next();
      if (c.done)
        return c;
      var _ = c.value, p3 = _[0], w3 = _[1];
      return e3.call(r3, w3, p3, a) ? s === Yt2 ? c : yt2(s, p3, w3, c) : (l3 = false, Ft2());
    });
  }, n;
}
p2(Eo2, "takeWhileFactory");
function Vi2(t4, e3, r3, n) {
  var s = le2(t4);
  return s.__iterateUncached = function(o5, a) {
    var u = this;
    if (a)
      return this.cacheResult().__iterate(o5, a);
    var l3 = true, c = 0;
    return t4.__iterate(function(_, p3, w3) {
      if (!(l3 && (l3 = e3.call(r3, _, p3, w3))))
        return c++, o5(_, n ? p3 : c - 1, u);
    }), c;
  }, s.__iteratorUncached = function(o5, a) {
    var u = this;
    if (a)
      return this.cacheResult().__iterator(o5, a);
    var l3 = t4.__iterator(Yt2, a), c = true, _ = 0;
    return new lt2(function() {
      var p3, w3, v;
      do {
        if (p3 = l3.next(), p3.done)
          return n || o5 === ne2 ? p3 : o5 === ur2 ? yt2(o5, _++, void 0, p3) : yt2(o5, _++, p3.value[1], p3);
        var y = p3.value;
        w3 = y[0], v = y[1], c && (c = e3.call(r3, v, w3, u));
      } while (c);
      return o5 === Yt2 ? p3 : yt2(o5, w3, v, p3);
    });
  }, s;
}
p2(Vi2, "skipWhileFactory");
function Oo2(t4, e3) {
  var r3 = vt2(t4), n = [t4].concat(e3).map(function(a) {
    return Nt2(a) ? r3 && (a = Gt2(a)) : a = r3 ? un2(a) : Pi2(Array.isArray(a) ? a : [a]), a;
  }).filter(function(a) {
    return a.size !== 0;
  });
  if (n.length === 0)
    return t4;
  if (n.length === 1) {
    var s = n[0];
    if (s === t4 || r3 && vt2(s) || Ut2(t4) && Ut2(s))
      return s;
  }
  var o5 = new Ee2(n);
  return r3 ? o5 = o5.toKeyedSeq() : Ut2(t4) || (o5 = o5.toSetSeq()), o5 = o5.flatten(true), o5.size = n.reduce(function(a, u) {
    if (a !== void 0) {
      var l3 = u.size;
      if (l3 !== void 0)
        return a + l3;
    }
  }, 0), o5;
}
p2(Oo2, "concatFactory");
function Ji2(t4, e3, r3) {
  var n = le2(t4);
  return n.__iterateUncached = function(s, o5) {
    if (o5)
      return this.cacheResult().__iterate(s, o5);
    var a = 0, u = false;
    function l3(c, _) {
      c.__iterate(function(p3, w3) {
        return (!e3 || _ < e3) && Nt2(p3) ? l3(p3, _ + 1) : (a++, s(p3, r3 ? w3 : a - 1, n) === false && (u = true)), !u;
      }, o5);
    }
    return p2(l3, "flatDeep"), l3(t4, 0), a;
  }, n.__iteratorUncached = function(s, o5) {
    if (o5)
      return this.cacheResult().__iterator(s, o5);
    var a = t4.__iterator(s, o5), u = [], l3 = 0;
    return new lt2(function() {
      for (; a; ) {
        var c = a.next();
        if (c.done !== false) {
          a = u.pop();
          continue;
        }
        var _ = c.value;
        if (s === Yt2 && (_ = _[1]), (!e3 || u.length < e3) && Nt2(_))
          u.push(a), a = _.__iterator(s, o5);
        else
          return r3 ? c : yt2(s, l3++, _, c);
      }
      return Ft2();
    });
  }, n;
}
p2(Ji2, "flattenFactory");
function Io2(t4, e3, r3) {
  var n = pn2(t4);
  return t4.toSeq().map(function(s, o5) {
    return n(e3.call(r3, s, o5, t4));
  }).flatten(true);
}
p2(Io2, "flatMapFactory");
function ko2(t4, e3) {
  var r3 = le2(t4);
  return r3.size = t4.size && t4.size * 2 - 1, r3.__iterateUncached = function(n, s) {
    var o5 = this, a = 0;
    return t4.__iterate(function(u) {
      return (!a || n(e3, a++, o5) !== false) && n(u, a++, o5) !== false;
    }, s), a;
  }, r3.__iteratorUncached = function(n, s) {
    var o5 = t4.__iterator(ne2, s), a = 0, u;
    return new lt2(function() {
      return (!u || a % 2) && (u = o5.next(), u.done) ? u : a % 2 ? yt2(n, a++, e3) : yt2(n, a++, u.value, u);
    });
  }, r3;
}
p2(ko2, "interposeFactory");
function Te2(t4, e3, r3) {
  e3 || (e3 = Hi2);
  var n = vt2(t4), s = 0, o5 = t4.toSeq().map(function(a, u) {
    return [u, a, s++, r3 ? r3(a, u, t4) : a];
  }).valueSeq().toArray();
  return o5.sort(function(a, u) {
    return e3(a[3], u[3]) || a[2] - u[2];
  }).forEach(n ? function(a, u) {
    o5[u].length = 2;
  } : function(a, u) {
    o5[u] = a[1];
  }), n ? ve2(o5) : Ut2(t4) ? ie2(o5) : Le2(o5);
}
p2(Te2, "sortFactory");
function wr2(t4, e3, r3) {
  if (e3 || (e3 = Hi2), r3) {
    var n = t4.toSeq().map(function(s, o5) {
      return [s, r3(s, o5, t4)];
    }).reduce(function(s, o5) {
      return oi2(e3, s[1], o5[1]) ? o5 : s;
    });
    return n && n[0];
  }
  return t4.reduce(function(s, o5) {
    return oi2(e3, s, o5) ? o5 : s;
  });
}
p2(wr2, "maxFactory");
function oi2(t4, e3, r3) {
  var n = t4(r3, e3);
  return n === 0 && r3 !== e3 && (r3 == null || r3 !== r3) || n > 0;
}
p2(oi2, "maxCompare");
function br2(t4, e3, r3, n) {
  var s = le2(t4), o5 = new Ee2(r3).map(function(a) {
    return a.size;
  });
  return s.size = n ? o5.max() : o5.min(), s.__iterate = function(a, u) {
    for (var l3 = this.__iterator(ne2, u), c, _ = 0; !(c = l3.next()).done && a(c.value, _++, this) !== false; )
      ;
    return _;
  }, s.__iteratorUncached = function(a, u) {
    var l3 = r3.map(function(p3) {
      return p3 = Et2(p3), Gr2(u ? p3.reverse() : p3);
    }), c = 0, _ = false;
    return new lt2(function() {
      var p3;
      return _ || (p3 = l3.map(function(w3) {
        return w3.next();
      }), _ = n ? p3.every(function(w3) {
        return w3.done;
      }) : p3.some(function(w3) {
        return w3.done;
      })), _ ? Ft2() : yt2(a, c++, e3.apply(null, p3.map(function(w3) {
        return w3.value;
      })));
    });
  }, s;
}
p2(br2, "zipWithFactory");
function ht2(t4, e3) {
  return t4 === e3 ? t4 : sn2(t4) ? e3 : t4.constructor(e3);
}
p2(ht2, "reify");
function ai2(t4) {
  if (t4 !== Object(t4))
    throw new TypeError("Expected [K, V] tuple: " + t4);
}
p2(ai2, "validateEntry");
function pn2(t4) {
  return vt2(t4) ? Gt2 : Ut2(t4) ? Oe2 : Ue2;
}
p2(pn2, "collectionClass");
function le2(t4) {
  return Object.create((vt2(t4) ? ve2 : Ut2(t4) ? ie2 : Le2).prototype);
}
p2(le2, "makeSequence");
function dn2() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : Wt2.prototype.cacheResult.call(this);
}
p2(dn2, "cacheResultThrough");
function Hi2(t4, e3) {
  return t4 === void 0 && e3 === void 0 ? 0 : t4 === void 0 ? 1 : e3 === void 0 ? -1 : t4 > e3 ? 1 : t4 < e3 ? -1 : 0;
}
p2(Hi2, "defaultComparator");
function ae2(t4, e3) {
  e3 = e3 || 0;
  for (var r3 = Math.max(0, t4.length - e3), n = new Array(r3), s = 0; s < r3; s++)
    n[s] = t4[s + e3];
  return n;
}
p2(ae2, "arrCopy");
function _n2(t4, e3) {
  if (!t4)
    throw new Error(e3);
}
p2(_n2, "invariant");
function Kt2(t4) {
  _n2(t4 !== 1 / 0, "Cannot perform this action with an infinite size.");
}
p2(Kt2, "assertNotInfinite");
function Ki2(t4) {
  if (zi2(t4) && typeof t4 != "string")
    return t4;
  if (re2(t4))
    return t4.toArray();
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + t4);
}
p2(Ki2, "coerceKeyPath");
var jo2 = Object.prototype.toString;
function Mo2(t4) {
  if (!t4 || typeof t4 != "object" || jo2.call(t4) !== "[object Object]")
    return false;
  var e3 = Object.getPrototypeOf(t4);
  if (e3 === null)
    return true;
  for (var r3 = e3, n = Object.getPrototypeOf(e3); n !== null; )
    r3 = n, n = Object.getPrototypeOf(r3);
  return r3 === e3;
}
p2(Mo2, "isPlainObject");
function ge2(t4) {
  return typeof t4 == "object" && (ue2(t4) || Array.isArray(t4) || Mo2(t4));
}
p2(ge2, "isDataStructure");
function tr2(t4) {
  try {
    return typeof t4 == "string" ? JSON.stringify(t4) : String(t4);
  } catch {
    return JSON.stringify(t4);
  }
}
p2(tr2, "quoteString");
function xo2(t4, e3) {
  return ue2(t4) ? t4.has(e3) : ge2(t4) && qe2.call(t4, e3);
}
p2(xo2, "has");
function Yi2(t4, e3, r3) {
  return ue2(t4) ? t4.get(e3, r3) : xo2(t4, e3) ? typeof t4.get == "function" ? t4.get(e3) : t4[e3] : r3;
}
p2(Yi2, "get");
function kr2(t4) {
  if (Array.isArray(t4))
    return ae2(t4);
  var e3 = {};
  for (var r3 in t4)
    qe2.call(t4, r3) && (e3[r3] = t4[r3]);
  return e3;
}
p2(kr2, "shallowCopy");
function Ao2(t4, e3) {
  if (!ge2(t4))
    throw new TypeError("Cannot update non-data-structure value: " + t4);
  if (ue2(t4)) {
    if (!t4.remove)
      throw new TypeError("Cannot update immutable value without .remove() method: " + t4);
    return t4.remove(e3);
  }
  if (!qe2.call(t4, e3))
    return t4;
  var r3 = kr2(t4);
  return Array.isArray(r3) ? r3.splice(e3, 1) : delete r3[e3], r3;
}
p2(Ao2, "remove");
function Ro2(t4, e3, r3) {
  if (!ge2(t4))
    throw new TypeError("Cannot update non-data-structure value: " + t4);
  if (ue2(t4)) {
    if (!t4.set)
      throw new TypeError("Cannot update immutable value without .set() method: " + t4);
    return t4.set(e3, r3);
  }
  if (qe2.call(t4, e3) && r3 === t4[e3])
    return t4;
  var n = kr2(t4);
  return n[e3] = r3, n;
}
p2(Ro2, "set");
function Be2(t4, e3, r3, n) {
  n || (n = r3, r3 = void 0);
  var s = Gi2(ue2(t4), t4, Ki2(e3), 0, r3, n);
  return s === ot2 ? r3 : s;
}
p2(Be2, "updateIn$1");
function Gi2(t4, e3, r3, n, s, o5) {
  var a = e3 === ot2;
  if (n === r3.length) {
    var u = a ? s : e3, l3 = o5(u);
    return l3 === u ? e3 : l3;
  }
  if (!a && !ge2(e3))
    throw new TypeError("Cannot update within non-data-structure value in path [" + r3.slice(0, n).map(tr2) + "]: " + e3);
  var c = r3[n], _ = a ? ot2 : Yi2(e3, c, ot2), p3 = Gi2(_ === ot2 ? t4 : ue2(_), _, r3, n + 1, s, o5);
  return p3 === _ ? e3 : p3 === ot2 ? Ao2(e3, c) : Ro2(a ? t4 ? ee2() : {} : e3, c, p3);
}
p2(Gi2, "updateInDeeply");
function To2(t4, e3, r3) {
  return Be2(t4, e3, ot2, function() {
    return r3;
  });
}
p2(To2, "setIn$1");
function mn2(t4, e3) {
  return To2(this, t4, e3);
}
p2(mn2, "setIn");
function $o2(t4, e3) {
  return Be2(t4, e3, function() {
    return ot2;
  });
}
p2($o2, "removeIn");
function gn2(t4) {
  return $o2(this, t4);
}
p2(gn2, "deleteIn");
function Qi2(t4, e3, r3, n) {
  return Be2(t4, [e3], r3, n);
}
p2(Qi2, "update$1");
function vn2(t4, e3, r3) {
  return arguments.length === 1 ? t4(this) : Qi2(this, t4, e3, r3);
}
p2(vn2, "update");
function yn2(t4, e3, r3) {
  return Be2(this, t4, e3, r3);
}
p2(yn2, "updateIn");
function Xi2() {
  for (var t4 = [], e3 = arguments.length; e3--; )
    t4[e3] = arguments[e3];
  return ts2(this, t4);
}
p2(Xi2, "merge$1");
function Zi2(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  if (typeof t4 != "function")
    throw new TypeError("Invalid merger function: " + t4);
  return ts2(this, e3, t4);
}
p2(Zi2, "mergeWith$1");
function ts2(t4, e3, r3) {
  for (var n = [], s = 0; s < e3.length; s++) {
    var o5 = Gt2(e3[s]);
    o5.size !== 0 && n.push(o5);
  }
  return n.length === 0 ? t4 : t4.toSeq().size === 0 && !t4.__ownerID && n.length === 1 ? t4.constructor(n[0]) : t4.withMutations(function(a) {
    for (var u = r3 ? function(c, _) {
      Qi2(a, _, ot2, function(p3) {
        return p3 === ot2 ? c : r3(p3, c, _);
      });
    } : function(c, _) {
      a.set(_, c);
    }, l3 = 0; l3 < n.length; l3++)
      n[l3].forEach(u);
  });
}
p2(ts2, "mergeIntoKeyedWith");
function wn2(t4, e3, r3) {
  return bn2(t4, e3, zo2(r3));
}
p2(wn2, "mergeDeepWithSources");
function bn2(t4, e3, r3) {
  if (!ge2(t4))
    throw new TypeError("Cannot merge into non-data-structure value: " + t4);
  if (ue2(t4))
    return typeof r3 == "function" && t4.mergeWith ? t4.mergeWith.apply(t4, [r3].concat(e3)) : t4.merge ? t4.merge.apply(t4, e3) : t4.concat.apply(t4, e3);
  for (var n = Array.isArray(t4), s = t4, o5 = n ? Oe2 : Gt2, a = n ? function(l3) {
    s === t4 && (s = kr2(s)), s.push(l3);
  } : function(l3, c) {
    var _ = qe2.call(s, c), p3 = _ && r3 ? r3(s[c], l3, c) : l3;
    (!_ || p3 !== s[c]) && (s === t4 && (s = kr2(s)), s[c] = p3);
  }, u = 0; u < e3.length; u++)
    o5(e3[u]).forEach(a);
  return s;
}
p2(bn2, "mergeWithSources");
function zo2(t4) {
  function e3(r3, n, s) {
    return ge2(r3) && ge2(n) && Po2(r3, n) ? bn2(r3, [n], e3) : t4 ? t4(r3, n, s) : n;
  }
  return p2(e3, "deepMerger"), e3;
}
p2(zo2, "deepMergerWith");
function Po2(t4, e3) {
  var r3 = Wt2(t4), n = Wt2(e3);
  return Ut2(r3) === Ut2(n) && vt2(r3) === vt2(n);
}
p2(Po2, "areMergeable");
function es2() {
  for (var t4 = [], e3 = arguments.length; e3--; )
    t4[e3] = arguments[e3];
  return wn2(this, t4);
}
p2(es2, "mergeDeep");
function rs2(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return wn2(this, e3, t4);
}
p2(rs2, "mergeDeepWith");
function Sn2(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return Be2(this, t4, ee2(), function(n) {
    return bn2(n, e3);
  });
}
p2(Sn2, "mergeIn");
function En2(t4) {
  for (var e3 = [], r3 = arguments.length - 1; r3-- > 0; )
    e3[r3] = arguments[r3 + 1];
  return Be2(this, t4, ee2(), function(n) {
    return wn2(n, e3);
  });
}
p2(En2, "mergeDeepIn");
function lr2(t4) {
  var e3 = this.asMutable();
  return t4(e3), e3.wasAltered() ? e3.__ensureOwner(this.__ownerID) : this;
}
p2(lr2, "withMutations");
function fr2() {
  return this.__ownerID ? this : this.__ensureOwner(new nn2());
}
p2(fr2, "asMutable");
function cr2() {
  return this.__ensureOwner();
}
p2(cr2, "asImmutable");
function On2() {
  return this.__altered;
}
p2(On2, "wasAltered");
var We2 = function(t4) {
  function e3(r3) {
    return r3 == null ? ee2() : fn2(r3) && !re2(r3) ? r3 : ee2().withMutations(function(n) {
      var s = t4(r3);
      Kt2(s.size), s.forEach(function(o5, a) {
        return n.set(a, o5);
      });
    });
  }
  return p2(e3, "Map"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    return ee2().withMutations(function(o5) {
      for (var a = 0; a < n.length; a += 2) {
        if (a + 1 >= n.length)
          throw new Error("Missing value for key: " + n[a]);
        o5.set(n[a], n[a + 1]);
      }
    });
  }, "of"), e3.prototype.toString = p2(function() {
    return this.__toString("Map {", "}");
  }, "toString"), e3.prototype.get = p2(function(n, s) {
    return this._root ? this._root.get(0, void 0, n, s) : s;
  }, "get"), e3.prototype.set = p2(function(n, s) {
    return fi2(this, n, s);
  }, "set"), e3.prototype.remove = p2(function(n) {
    return fi2(this, n, ot2);
  }, "remove"), e3.prototype.deleteAll = p2(function(n) {
    var s = Et2(n);
    return s.size === 0 ? this : this.withMutations(function(o5) {
      s.forEach(function(a) {
        return o5.remove(a);
      });
    });
  }, "deleteAll"), e3.prototype.clear = p2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : ee2();
  }, "clear"), e3.prototype.sort = p2(function(n) {
    return he2(Te2(this, n));
  }, "sort"), e3.prototype.sortBy = p2(function(n, s) {
    return he2(Te2(this, s, n));
  }, "sortBy"), e3.prototype.map = p2(function(n, s) {
    var o5 = this;
    return this.withMutations(function(a) {
      a.forEach(function(u, l3) {
        a.set(l3, n.call(s, u, l3, o5));
      });
    });
  }, "map"), e3.prototype.__iterator = p2(function(n, s) {
    return new Do2(this, n, s);
  }, "__iterator"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this, a = 0;
    return this._root && this._root.iterate(function(u) {
      return a++, n(u[1], u[0], o5);
    }, s), a;
  }, "__iterate"), e3.prototype.__ensureOwner = p2(function(n) {
    return n === this.__ownerID ? this : n ? In2(this.size, this._root, n, this.__hash) : this.size === 0 ? ee2() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3;
}(Gt2);
We2.isMap = fn2;
var mt2 = We2.prototype;
mt2[Di2] = true;
mt2[or2] = mt2.remove;
mt2.removeAll = mt2.deleteAll;
mt2.setIn = mn2;
mt2.removeIn = mt2.deleteIn = gn2;
mt2.update = vn2;
mt2.updateIn = yn2;
mt2.merge = mt2.concat = Xi2;
mt2.mergeWith = Zi2;
mt2.mergeDeep = es2;
mt2.mergeDeepWith = rs2;
mt2.mergeIn = Sn2;
mt2.mergeDeepIn = En2;
mt2.withMutations = lr2;
mt2.wasAltered = On2;
mt2.asImmutable = cr2;
mt2["@@transducer/init"] = mt2.asMutable = fr2;
mt2["@@transducer/step"] = function(t4, e3) {
  return t4.set(e3[0], e3[1]);
};
mt2["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
var er2 = p2(function(e3, r3) {
  this.ownerID = e3, this.entries = r3;
}, "ArrayMapNode");
er2.prototype.get = p2(function(e3, r3, n, s) {
  for (var o5 = this.entries, a = 0, u = o5.length; a < u; a++)
    if (Bt2(n, o5[a][0]))
      return o5[a][1];
  return s;
}, "get");
er2.prototype.update = p2(function(e3, r3, n, s, o5, a, u) {
  for (var l3 = o5 === ot2, c = this.entries, _ = 0, p3 = c.length; _ < p3 && !Bt2(s, c[_][0]); _++)
    ;
  var w3 = _ < p3;
  if (w3 ? c[_][1] === o5 : l3)
    return this;
  if (Ht2(u), (l3 || !w3) && Ht2(a), !(l3 && c.length === 1)) {
    if (!w3 && !l3 && c.length >= Lo2)
      return Co2(e3, c, s, o5);
    var v = e3 && e3 === this.ownerID, y = v ? c : ae2(c);
    return w3 ? l3 ? _ === p3 - 1 ? y.pop() : y[_] = y.pop() : y[_] = [s, o5] : y.push([s, o5]), v ? (this.entries = y, this) : new er2(e3, y);
  }
}, "update");
var $e2 = p2(function(e3, r3, n) {
  this.ownerID = e3, this.bitmap = r3, this.nodes = n;
}, "BitmapIndexedNode");
$e2.prototype.get = p2(function(e3, r3, n, s) {
  r3 === void 0 && (r3 = Lt2(n));
  var o5 = 1 << ((e3 === 0 ? r3 : r3 >>> e3) & zt2), a = this.bitmap;
  return a & o5 ? this.nodes[ns2(a & o5 - 1)].get(e3 + _t2, r3, n, s) : s;
}, "get");
$e2.prototype.update = p2(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt2(s));
  var l3 = (r3 === 0 ? n : n >>> r3) & zt2, c = 1 << l3, _ = this.bitmap, p3 = (_ & c) !== 0;
  if (!p3 && o5 === ot2)
    return this;
  var w3 = ns2(_ & c - 1), v = this.nodes, y = p3 ? v[w3] : void 0, b3 = kn2(y, e3, r3 + _t2, n, s, o5, a, u);
  if (b3 === y)
    return this;
  if (!p3 && b3 && v.length >= Bo2)
    return No2(e3, v, _, l3, b3);
  if (p3 && !b3 && v.length === 2 && ci2(v[w3 ^ 1]))
    return v[w3 ^ 1];
  if (p3 && b3 && v.length === 1 && ci2(b3))
    return b3;
  var k3 = e3 && e3 === this.ownerID, X = p3 ? b3 ? _ : _ ^ c : _ | c, K = p3 ? b3 ? is2(v, w3, b3, k3) : qo2(v, w3, k3) : Fo2(v, w3, b3, k3);
  return k3 ? (this.bitmap = X, this.nodes = K, this) : new $e2(e3, X, K);
}, "update");
var rr2 = p2(function(e3, r3, n) {
  this.ownerID = e3, this.count = r3, this.nodes = n;
}, "HashArrayMapNode");
rr2.prototype.get = p2(function(e3, r3, n, s) {
  r3 === void 0 && (r3 = Lt2(n));
  var o5 = (e3 === 0 ? r3 : r3 >>> e3) & zt2, a = this.nodes[o5];
  return a ? a.get(e3 + _t2, r3, n, s) : s;
}, "get");
rr2.prototype.update = p2(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt2(s));
  var l3 = (r3 === 0 ? n : n >>> r3) & zt2, c = o5 === ot2, _ = this.nodes, p3 = _[l3];
  if (c && !p3)
    return this;
  var w3 = kn2(p3, e3, r3 + _t2, n, s, o5, a, u);
  if (w3 === p3)
    return this;
  var v = this.count;
  if (!p3)
    v++;
  else if (!w3 && (v--, v < Wo2))
    return Uo2(e3, _, v, l3);
  var y = e3 && e3 === this.ownerID, b3 = is2(_, l3, w3, y);
  return y ? (this.count = v, this.nodes = b3, this) : new rr2(e3, v, b3);
}, "update");
var ze2 = p2(function(e3, r3, n) {
  this.ownerID = e3, this.keyHash = r3, this.entries = n;
}, "HashCollisionNode");
ze2.prototype.get = p2(function(e3, r3, n, s) {
  for (var o5 = this.entries, a = 0, u = o5.length; a < u; a++)
    if (Bt2(n, o5[a][0]))
      return o5[a][1];
  return s;
}, "get");
ze2.prototype.update = p2(function(e3, r3, n, s, o5, a, u) {
  n === void 0 && (n = Lt2(s));
  var l3 = o5 === ot2;
  if (n !== this.keyHash)
    return l3 ? this : (Ht2(u), Ht2(a), jn2(this, e3, r3, n, [s, o5]));
  for (var c = this.entries, _ = 0, p3 = c.length; _ < p3 && !Bt2(s, c[_][0]); _++)
    ;
  var w3 = _ < p3;
  if (w3 ? c[_][1] === o5 : l3)
    return this;
  if (Ht2(u), (l3 || !w3) && Ht2(a), l3 && p3 === 2)
    return new ce2(e3, this.keyHash, c[_ ^ 1]);
  var v = e3 && e3 === this.ownerID, y = v ? c : ae2(c);
  return w3 ? l3 ? _ === p3 - 1 ? y.pop() : y[_] = y.pop() : y[_] = [s, o5] : y.push([s, o5]), v ? (this.entries = y, this) : new ze2(e3, this.keyHash, y);
}, "update");
var ce2 = p2(function(e3, r3, n) {
  this.ownerID = e3, this.keyHash = r3, this.entry = n;
}, "ValueNode");
ce2.prototype.get = p2(function(e3, r3, n, s) {
  return Bt2(n, this.entry[0]) ? this.entry[1] : s;
}, "get");
ce2.prototype.update = p2(function(e3, r3, n, s, o5, a, u) {
  var l3 = o5 === ot2, c = Bt2(s, this.entry[0]);
  if (c ? o5 === this.entry[1] : l3)
    return this;
  if (Ht2(u), l3) {
    Ht2(a);
    return;
  }
  return c ? e3 && e3 === this.ownerID ? (this.entry[1] = o5, this) : new ce2(e3, this.keyHash, [s, o5]) : (Ht2(a), jn2(this, e3, r3, Lt2(s), [s, o5]));
}, "update");
er2.prototype.iterate = ze2.prototype.iterate = function(t4, e3) {
  for (var r3 = this.entries, n = 0, s = r3.length - 1; n <= s; n++)
    if (t4(r3[e3 ? s - n : n]) === false)
      return false;
};
$e2.prototype.iterate = rr2.prototype.iterate = function(t4, e3) {
  for (var r3 = this.nodes, n = 0, s = r3.length - 1; n <= s; n++) {
    var o5 = r3[e3 ? s - n : n];
    if (o5 && o5.iterate(t4, e3) === false)
      return false;
  }
};
ce2.prototype.iterate = function(t4, e3) {
  return t4(this.entry);
};
var Do2 = function(t4) {
  function e3(r3, n, s) {
    this._type = n, this._reverse = s, this._stack = r3._root && ui2(r3._root);
  }
  return p2(e3, "MapIterator"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.next = p2(function() {
    for (var n = this._type, s = this._stack; s; ) {
      var o5 = s.node, a = s.index++, u = void 0;
      if (o5.entry) {
        if (a === 0)
          return Jr2(n, o5.entry);
      } else if (o5.entries) {
        if (u = o5.entries.length - 1, a <= u)
          return Jr2(n, o5.entries[this._reverse ? u - a : a]);
      } else if (u = o5.nodes.length - 1, a <= u) {
        var l3 = o5.nodes[this._reverse ? u - a : a];
        if (l3) {
          if (l3.entry)
            return Jr2(n, l3.entry);
          s = this._stack = ui2(l3, s);
        }
        continue;
      }
      s = this._stack = this._stack.__prev;
    }
    return Ft2();
  }, "next"), e3;
}(lt2);
function Jr2(t4, e3) {
  return yt2(t4, e3[0], e3[1]);
}
p2(Jr2, "mapIteratorValue");
function ui2(t4, e3) {
  return { node: t4, index: 0, __prev: e3 };
}
p2(ui2, "mapIteratorFrame");
function In2(t4, e3, r3, n) {
  var s = Object.create(mt2);
  return s.size = t4, s._root = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p2(In2, "makeMap");
var li2;
function ee2() {
  return li2 || (li2 = In2(0));
}
p2(ee2, "emptyMap");
function fi2(t4, e3, r3) {
  var n, s;
  if (t4._root) {
    var o5 = Kr2(), a = Kr2();
    if (n = kn2(t4._root, t4.__ownerID, 0, void 0, e3, r3, o5, a), !a.value)
      return t4;
    s = t4.size + (o5.value ? r3 === ot2 ? -1 : 1 : 0);
  } else {
    if (r3 === ot2)
      return t4;
    s = 1, n = new er2(t4.__ownerID, [[e3, r3]]);
  }
  return t4.__ownerID ? (t4.size = s, t4._root = n, t4.__hash = void 0, t4.__altered = true, t4) : n ? In2(s, n) : ee2();
}
p2(fi2, "updateMap");
function kn2(t4, e3, r3, n, s, o5, a, u) {
  return t4 ? t4.update(e3, r3, n, s, o5, a, u) : o5 === ot2 ? t4 : (Ht2(u), Ht2(a), new ce2(e3, n, [s, o5]));
}
p2(kn2, "updateNode");
function ci2(t4) {
  return t4.constructor === ce2 || t4.constructor === ze2;
}
p2(ci2, "isLeafNode");
function jn2(t4, e3, r3, n, s) {
  if (t4.keyHash === n)
    return new ze2(e3, n, [t4.entry, s]);
  var o5 = (r3 === 0 ? t4.keyHash : t4.keyHash >>> r3) & zt2, a = (r3 === 0 ? n : n >>> r3) & zt2, u, l3 = o5 === a ? [jn2(t4, e3, r3 + _t2, n, s)] : (u = new ce2(e3, n, s), o5 < a ? [t4, u] : [u, t4]);
  return new $e2(e3, 1 << o5 | 1 << a, l3);
}
p2(jn2, "mergeIntoNode");
function Co2(t4, e3, r3, n) {
  t4 || (t4 = new nn2());
  for (var s = new ce2(t4, Lt2(r3), [r3, n]), o5 = 0; o5 < e3.length; o5++) {
    var a = e3[o5];
    s = s.update(t4, 0, void 0, a[0], a[1]);
  }
  return s;
}
p2(Co2, "createNodes");
function Uo2(t4, e3, r3, n) {
  for (var s = 0, o5 = 0, a = new Array(r3), u = 0, l3 = 1, c = e3.length; u < c; u++, l3 <<= 1) {
    var _ = e3[u];
    _ !== void 0 && u !== n && (s |= l3, a[o5++] = _);
  }
  return new $e2(t4, s, a);
}
p2(Uo2, "packNodes");
function No2(t4, e3, r3, n, s) {
  for (var o5 = 0, a = new Array(Jt2), u = 0; r3 !== 0; u++, r3 >>>= 1)
    a[u] = r3 & 1 ? e3[o5++] : void 0;
  return a[n] = s, new rr2(t4, o5 + 1, a);
}
p2(No2, "expandNodes");
function ns2(t4) {
  return t4 -= t4 >> 1 & 1431655765, t4 = (t4 & 858993459) + (t4 >> 2 & 858993459), t4 = t4 + (t4 >> 4) & 252645135, t4 += t4 >> 8, t4 += t4 >> 16, t4 & 127;
}
p2(ns2, "popCount");
function is2(t4, e3, r3, n) {
  var s = n ? t4 : ae2(t4);
  return s[e3] = r3, s;
}
p2(is2, "setAt");
function Fo2(t4, e3, r3, n) {
  var s = t4.length + 1;
  if (n && e3 + 1 === s)
    return t4[e3] = r3, t4;
  for (var o5 = new Array(s), a = 0, u = 0; u < s; u++)
    u === e3 ? (o5[u] = r3, a = -1) : o5[u] = t4[u + a];
  return o5;
}
p2(Fo2, "spliceIn");
function qo2(t4, e3, r3) {
  var n = t4.length - 1;
  if (r3 && e3 === n)
    return t4.pop(), t4;
  for (var s = new Array(n), o5 = 0, a = 0; a < n; a++)
    a === e3 && (o5 = 1), s[a] = t4[a + o5];
  return s;
}
p2(qo2, "spliceOut");
var Lo2 = Jt2 / 4;
var Bo2 = Jt2 / 2;
var Wo2 = Jt2 / 4;
var ss2 = "@@__IMMUTABLE_LIST__@@";
function os2(t4) {
  return Boolean(t4 && t4[ss2]);
}
p2(os2, "isList");
var Pr2 = function(t4) {
  function e3(r3) {
    var n = Ir2();
    if (r3 == null)
      return n;
    if (os2(r3))
      return r3;
    var s = t4(r3), o5 = s.size;
    return o5 === 0 ? n : (Kt2(o5), o5 > 0 && o5 < Jt2 ? nr2(0, o5, _t2, null, new _e2(s.toArray())) : n.withMutations(function(a) {
      a.setSize(o5), s.forEach(function(u, l3) {
        return a.set(l3, u);
      });
    }));
  }
  return p2(e3, "List"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p2(function() {
    return this.__toString("List [", "]");
  }, "toString"), e3.prototype.get = p2(function(n, s) {
    if (n = me2(this, n), n >= 0 && n < this.size) {
      n += this._origin;
      var o5 = as2(this, n);
      return o5 && o5.array[n & zt2];
    }
    return s;
  }, "get"), e3.prototype.set = p2(function(n, s) {
    return Vo2(this, n, s);
  }, "set"), e3.prototype.remove = p2(function(n) {
    return this.has(n) ? n === 0 ? this.shift() : n === this.size - 1 ? this.pop() : this.splice(n, 1) : this;
  }, "remove"), e3.prototype.insert = p2(function(n, s) {
    return this.splice(n, 0, s);
  }, "insert"), e3.prototype.clear = p2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = _t2, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : Ir2();
  }, "clear"), e3.prototype.push = p2(function() {
    var n = arguments, s = this.size;
    return this.withMutations(function(o5) {
      de2(o5, 0, s + n.length);
      for (var a = 0; a < n.length; a++)
        o5.set(s + a, n[a]);
    });
  }, "push"), e3.prototype.pop = p2(function() {
    return de2(this, 0, -1);
  }, "pop"), e3.prototype.unshift = p2(function() {
    var n = arguments;
    return this.withMutations(function(s) {
      de2(s, -n.length);
      for (var o5 = 0; o5 < n.length; o5++)
        s.set(o5, n[o5]);
    });
  }, "unshift"), e3.prototype.shift = p2(function() {
    return de2(this, 1);
  }, "shift"), e3.prototype.concat = p2(function() {
    for (var n = arguments, s = [], o5 = 0; o5 < arguments.length; o5++) {
      var a = n[o5], u = t4(typeof a != "string" && $i2(a) ? a : [a]);
      u.size !== 0 && s.push(u);
    }
    return s.length === 0 ? this : this.size === 0 && !this.__ownerID && s.length === 1 ? this.constructor(s[0]) : this.withMutations(function(l3) {
      s.forEach(function(c) {
        return c.forEach(function(_) {
          return l3.push(_);
        });
      });
    });
  }, "concat"), e3.prototype.setSize = p2(function(n) {
    return de2(this, 0, n);
  }, "setSize"), e3.prototype.map = p2(function(n, s) {
    var o5 = this;
    return this.withMutations(function(a) {
      for (var u = 0; u < o5.size; u++)
        a.set(u, n.call(s, a.get(u), u, o5));
    });
  }, "map"), e3.prototype.slice = p2(function(n, s) {
    var o5 = this.size;
    return Mr2(n, s, o5) ? this : de2(this, ar2(n, o5), xr2(s, o5));
  }, "slice"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = s ? this.size : 0, a = hi2(this, s);
    return new lt2(function() {
      var u = a();
      return u === Ze2 ? Ft2() : yt2(n, s ? --o5 : o5++, u);
    });
  }, "__iterator"), e3.prototype.__iterate = p2(function(n, s) {
    for (var o5 = s ? this.size : 0, a = hi2(this, s), u; (u = a()) !== Ze2 && n(u, s ? --o5 : o5++, this) !== false; )
      ;
    return o5;
  }, "__iterate"), e3.prototype.__ensureOwner = p2(function(n) {
    return n === this.__ownerID ? this : n ? nr2(this._origin, this._capacity, this._level, this._root, this._tail, n, this.__hash) : this.size === 0 ? Ir2() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3;
}(Oe2);
Pr2.isList = os2;
var Ot2 = Pr2.prototype;
Ot2[ss2] = true;
Ot2[or2] = Ot2.remove;
Ot2.merge = Ot2.concat;
Ot2.setIn = mn2;
Ot2.deleteIn = Ot2.removeIn = gn2;
Ot2.update = vn2;
Ot2.updateIn = yn2;
Ot2.mergeIn = Sn2;
Ot2.mergeDeepIn = En2;
Ot2.withMutations = lr2;
Ot2.wasAltered = On2;
Ot2.asImmutable = cr2;
Ot2["@@transducer/init"] = Ot2.asMutable = fr2;
Ot2["@@transducer/step"] = function(t4, e3) {
  return t4.push(e3);
};
Ot2["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
var _e2 = p2(function(e3, r3) {
  this.array = e3, this.ownerID = r3;
}, "VNode");
_e2.prototype.removeBefore = p2(function(e3, r3, n) {
  if (n === r3 ? 1 << r3 : this.array.length === 0)
    return this;
  var s = n >>> r3 & zt2;
  if (s >= this.array.length)
    return new _e2([], e3);
  var o5 = s === 0, a;
  if (r3 > 0) {
    var u = this.array[s];
    if (a = u && u.removeBefore(e3, r3 - _t2, n), a === u && o5)
      return this;
  }
  if (o5 && !a)
    return this;
  var l3 = Pe2(this, e3);
  if (!o5)
    for (var c = 0; c < s; c++)
      l3.array[c] = void 0;
  return a && (l3.array[s] = a), l3;
}, "removeBefore");
_e2.prototype.removeAfter = p2(function(e3, r3, n) {
  if (n === (r3 ? 1 << r3 : 0) || this.array.length === 0)
    return this;
  var s = n - 1 >>> r3 & zt2;
  if (s >= this.array.length)
    return this;
  var o5;
  if (r3 > 0) {
    var a = this.array[s];
    if (o5 = a && a.removeAfter(e3, r3 - _t2, n), o5 === a && s === this.array.length - 1)
      return this;
  }
  var u = Pe2(this, e3);
  return u.array.splice(s + 1), o5 && (u.array[s] = o5), u;
}, "removeAfter");
var Ze2 = {};
function hi2(t4, e3) {
  var r3 = t4._origin, n = t4._capacity, s = ir2(n), o5 = t4._tail;
  return a(t4._root, t4._level, 0);
  function a(c, _, p3) {
    return _ === 0 ? u(c, p3) : l3(c, _, p3);
  }
  function u(c, _) {
    var p3 = _ === s ? o5 && o5.array : c && c.array, w3 = _ > r3 ? 0 : r3 - _, v = n - _;
    return v > Jt2 && (v = Jt2), function() {
      if (w3 === v)
        return Ze2;
      var y = e3 ? --v : w3++;
      return p3 && p3[y];
    };
  }
  function l3(c, _, p3) {
    var w3, v = c && c.array, y = p3 > r3 ? 0 : r3 - p3 >> _, b3 = (n - p3 >> _) + 1;
    return b3 > Jt2 && (b3 = Jt2), function() {
      for (; ; ) {
        if (w3) {
          var k3 = w3();
          if (k3 !== Ze2)
            return k3;
          w3 = null;
        }
        if (y === b3)
          return Ze2;
        var X = e3 ? --b3 : y++;
        w3 = a(v && v[X], _ - _t2, p3 + (X << _));
      }
    };
  }
}
p2(hi2, "iterateList");
function nr2(t4, e3, r3, n, s, o5, a) {
  var u = Object.create(Ot2);
  return u.size = e3 - t4, u._origin = t4, u._capacity = e3, u._level = r3, u._root = n, u._tail = s, u.__ownerID = o5, u.__hash = a, u.__altered = false, u;
}
p2(nr2, "makeList");
var pi2;
function Ir2() {
  return pi2 || (pi2 = nr2(0, 0, _t2));
}
p2(Ir2, "emptyList");
function Vo2(t4, e3, r3) {
  if (e3 = me2(t4, e3), e3 !== e3)
    return t4;
  if (e3 >= t4.size || e3 < 0)
    return t4.withMutations(function(a) {
      e3 < 0 ? de2(a, e3).set(0, r3) : de2(a, 0, e3 + 1).set(e3, r3);
    });
  e3 += t4._origin;
  var n = t4._tail, s = t4._root, o5 = Kr2();
  return e3 >= ir2(t4._capacity) ? n = tn2(n, t4.__ownerID, 0, e3, r3, o5) : s = tn2(s, t4.__ownerID, t4._level, e3, r3, o5), o5.value ? t4.__ownerID ? (t4._root = s, t4._tail = n, t4.__hash = void 0, t4.__altered = true, t4) : nr2(t4._origin, t4._capacity, t4._level, s, n) : t4;
}
p2(Vo2, "updateList");
function tn2(t4, e3, r3, n, s, o5) {
  var a = n >>> r3 & zt2, u = t4 && a < t4.array.length;
  if (!u && s === void 0)
    return t4;
  var l3;
  if (r3 > 0) {
    var c = t4 && t4.array[a], _ = tn2(c, e3, r3 - _t2, n, s, o5);
    return _ === c ? t4 : (l3 = Pe2(t4, e3), l3.array[a] = _, l3);
  }
  return u && t4.array[a] === s ? t4 : (o5 && Ht2(o5), l3 = Pe2(t4, e3), s === void 0 && a === l3.array.length - 1 ? l3.array.pop() : l3.array[a] = s, l3);
}
p2(tn2, "updateVNode");
function Pe2(t4, e3) {
  return e3 && t4 && e3 === t4.ownerID ? t4 : new _e2(t4 ? t4.array.slice() : [], e3);
}
p2(Pe2, "editableVNode");
function as2(t4, e3) {
  if (e3 >= ir2(t4._capacity))
    return t4._tail;
  if (e3 < 1 << t4._level + _t2) {
    for (var r3 = t4._root, n = t4._level; r3 && n > 0; )
      r3 = r3.array[e3 >>> n & zt2], n -= _t2;
    return r3;
  }
}
p2(as2, "listNodeFor");
function de2(t4, e3, r3) {
  e3 !== void 0 && (e3 |= 0), r3 !== void 0 && (r3 |= 0);
  var n = t4.__ownerID || new nn2(), s = t4._origin, o5 = t4._capacity, a = s + e3, u = r3 === void 0 ? o5 : r3 < 0 ? o5 + r3 : s + r3;
  if (a === s && u === o5)
    return t4;
  if (a >= u)
    return t4.clear();
  for (var l3 = t4._level, c = t4._root, _ = 0; a + _ < 0; )
    c = new _e2(c && c.array.length ? [void 0, c] : [], n), l3 += _t2, _ += 1 << l3;
  _ && (a += _, s += _, u += _, o5 += _);
  for (var p3 = ir2(o5), w3 = ir2(u); w3 >= 1 << l3 + _t2; )
    c = new _e2(c && c.array.length ? [c] : [], n), l3 += _t2;
  var v = t4._tail, y = w3 < p3 ? as2(t4, u - 1) : w3 > p3 ? new _e2([], n) : v;
  if (v && w3 > p3 && a < o5 && v.array.length) {
    c = Pe2(c, n);
    for (var b3 = c, k3 = l3; k3 > _t2; k3 -= _t2) {
      var X = p3 >>> k3 & zt2;
      b3 = b3.array[X] = Pe2(b3.array[X], n);
    }
    b3.array[p3 >>> _t2 & zt2] = v;
  }
  if (u < o5 && (y = y && y.removeAfter(n, 0, u)), a >= w3)
    a -= w3, u -= w3, l3 = _t2, c = null, y = y && y.removeBefore(n, 0, a);
  else if (a > s || w3 < p3) {
    for (_ = 0; c; ) {
      var K = a >>> l3 & zt2;
      if (K !== w3 >>> l3 & zt2)
        break;
      K && (_ += (1 << l3) * K), l3 -= _t2, c = c.array[K];
    }
    c && a > s && (c = c.removeBefore(n, l3, a - _)), c && w3 < p3 && (c = c.removeAfter(n, l3, w3 - _)), _ && (a -= _, u -= _);
  }
  return t4.__ownerID ? (t4.size = u - a, t4._origin = a, t4._capacity = u, t4._level = l3, t4._root = c, t4._tail = y, t4.__hash = void 0, t4.__altered = true, t4) : nr2(a, u, l3, c, y);
}
p2(de2, "setListBounds");
function ir2(t4) {
  return t4 < Jt2 ? 0 : t4 - 1 >>> _t2 << _t2;
}
p2(ir2, "getTailOffset");
var he2 = function(t4) {
  function e3(r3) {
    return r3 == null ? Ge2() : Ci2(r3) ? r3 : Ge2().withMutations(function(n) {
      var s = Gt2(r3);
      Kt2(s.size), s.forEach(function(o5, a) {
        return n.set(a, o5);
      });
    });
  }
  return p2(e3, "OrderedMap"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p2(function() {
    return this.__toString("OrderedMap {", "}");
  }, "toString"), e3.prototype.get = p2(function(n, s) {
    var o5 = this._map.get(n);
    return o5 !== void 0 ? this._list.get(o5)[1] : s;
  }, "get"), e3.prototype.clear = p2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : Ge2();
  }, "clear"), e3.prototype.set = p2(function(n, s) {
    return _i2(this, n, s);
  }, "set"), e3.prototype.remove = p2(function(n) {
    return _i2(this, n, ot2);
  }, "remove"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    return this._list.__iterate(function(a) {
      return a && n(a[1], a[0], o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    return this._list.fromEntrySeq().__iterator(n, s);
  }, "__iterator"), e3.prototype.__ensureOwner = p2(function(n) {
    if (n === this.__ownerID)
      return this;
    var s = this._map.__ensureOwner(n), o5 = this._list.__ensureOwner(n);
    return n ? Mn2(s, o5, n, this.__hash) : this.size === 0 ? Ge2() : (this.__ownerID = n, this.__altered = false, this._map = s, this._list = o5, this);
  }, "__ensureOwner"), e3;
}(We2);
he2.isOrderedMap = Ci2;
he2.prototype[Fe2] = true;
he2.prototype[or2] = he2.prototype.remove;
function Mn2(t4, e3, r3, n) {
  var s = Object.create(he2.prototype);
  return s.size = t4 ? t4.size : 0, s._map = t4, s._list = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p2(Mn2, "makeOrderedMap");
var di2;
function Ge2() {
  return di2 || (di2 = Mn2(ee2(), Ir2()));
}
p2(Ge2, "emptyOrderedMap");
function _i2(t4, e3, r3) {
  var n = t4._map, s = t4._list, o5 = n.get(e3), a = o5 !== void 0, u, l3;
  if (r3 === ot2) {
    if (!a)
      return t4;
    s.size >= Jt2 && s.size >= n.size * 2 ? (l3 = s.filter(function(c, _) {
      return c !== void 0 && o5 !== _;
    }), u = l3.toKeyedSeq().map(function(c) {
      return c[0];
    }).flip().toMap(), t4.__ownerID && (u.__ownerID = l3.__ownerID = t4.__ownerID)) : (u = n.remove(e3), l3 = o5 === s.size - 1 ? s.pop() : s.set(o5, void 0));
  } else if (a) {
    if (r3 === s.get(o5)[1])
      return t4;
    u = n, l3 = s.set(o5, [e3, r3]);
  } else
    u = n.set(e3, s.size), l3 = s.set(s.size, [e3, r3]);
  return t4.__ownerID ? (t4.size = u.size, t4._map = u, t4._list = l3, t4.__hash = void 0, t4.__altered = true, t4) : Mn2(u, l3);
}
p2(_i2, "updateOrderedMap");
var us2 = "@@__IMMUTABLE_STACK__@@";
function en2(t4) {
  return Boolean(t4 && t4[us2]);
}
p2(en2, "isStack");
var xn2 = function(t4) {
  function e3(r3) {
    return r3 == null ? Sr2() : en2(r3) ? r3 : Sr2().pushAll(r3);
  }
  return p2(e3, "Stack"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return this(arguments);
  }, "of"), e3.prototype.toString = p2(function() {
    return this.__toString("Stack [", "]");
  }, "toString"), e3.prototype.get = p2(function(n, s) {
    var o5 = this._head;
    for (n = me2(this, n); o5 && n--; )
      o5 = o5.next;
    return o5 ? o5.value : s;
  }, "get"), e3.prototype.peek = p2(function() {
    return this._head && this._head.value;
  }, "peek"), e3.prototype.push = p2(function() {
    var n = arguments;
    if (arguments.length === 0)
      return this;
    for (var s = this.size + arguments.length, o5 = this._head, a = arguments.length - 1; a >= 0; a--)
      o5 = { value: n[a], next: o5 };
    return this.__ownerID ? (this.size = s, this._head = o5, this.__hash = void 0, this.__altered = true, this) : Qe2(s, o5);
  }, "push"), e3.prototype.pushAll = p2(function(n) {
    if (n = t4(n), n.size === 0)
      return this;
    if (this.size === 0 && en2(n))
      return n;
    Kt2(n.size);
    var s = this.size, o5 = this._head;
    return n.__iterate(function(a) {
      s++, o5 = { value: a, next: o5 };
    }, true), this.__ownerID ? (this.size = s, this._head = o5, this.__hash = void 0, this.__altered = true, this) : Qe2(s, o5);
  }, "pushAll"), e3.prototype.pop = p2(function() {
    return this.slice(1);
  }, "pop"), e3.prototype.clear = p2(function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : Sr2();
  }, "clear"), e3.prototype.slice = p2(function(n, s) {
    if (Mr2(n, s, this.size))
      return this;
    var o5 = ar2(n, this.size), a = xr2(s, this.size);
    if (a !== this.size)
      return t4.prototype.slice.call(this, n, s);
    for (var u = this.size - o5, l3 = this._head; o5--; )
      l3 = l3.next;
    return this.__ownerID ? (this.size = u, this._head = l3, this.__hash = void 0, this.__altered = true, this) : Qe2(u, l3);
  }, "slice"), e3.prototype.__ensureOwner = p2(function(n) {
    return n === this.__ownerID ? this : n ? Qe2(this.size, this._head, n, this.__hash) : this.size === 0 ? Sr2() : (this.__ownerID = n, this.__altered = false, this);
  }, "__ensureOwner"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    if (s)
      return new Ee2(this.toArray()).__iterate(function(l3, c) {
        return n(l3, c, o5);
      }, s);
    for (var a = 0, u = this._head; u && n(u.value, a++, this) !== false; )
      u = u.next;
    return a;
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    if (s)
      return new Ee2(this.toArray()).__iterator(n, s);
    var o5 = 0, a = this._head;
    return new lt2(function() {
      if (a) {
        var u = a.value;
        return a = a.next, yt2(n, o5++, u);
      }
      return Ft2();
    });
  }, "__iterator"), e3;
}(Oe2);
xn2.isStack = en2;
var Pt2 = xn2.prototype;
Pt2[us2] = true;
Pt2.shift = Pt2.pop;
Pt2.unshift = Pt2.push;
Pt2.unshiftAll = Pt2.pushAll;
Pt2.withMutations = lr2;
Pt2.wasAltered = On2;
Pt2.asImmutable = cr2;
Pt2["@@transducer/init"] = Pt2.asMutable = fr2;
Pt2["@@transducer/step"] = function(t4, e3) {
  return t4.unshift(e3);
};
Pt2["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
function Qe2(t4, e3, r3, n) {
  var s = Object.create(Pt2);
  return s.size = t4, s._head = e3, s.__ownerID = r3, s.__hash = n, s.__altered = false, s;
}
p2(Qe2, "makeStack");
var mi2;
function Sr2() {
  return mi2 || (mi2 = Qe2(0));
}
p2(Sr2, "emptyStack");
var ls2 = "@@__IMMUTABLE_SET__@@";
function An2(t4) {
  return Boolean(t4 && t4[ls2]);
}
p2(An2, "isSet");
function fs2(t4) {
  return An2(t4) && re2(t4);
}
p2(fs2, "isOrderedSet");
function cs2(t4, e3) {
  if (t4 === e3)
    return true;
  if (!Nt2(e3) || t4.size !== void 0 && e3.size !== void 0 && t4.size !== e3.size || t4.__hash !== void 0 && e3.__hash !== void 0 && t4.__hash !== e3.__hash || vt2(t4) !== vt2(e3) || Ut2(t4) !== Ut2(e3) || re2(t4) !== re2(e3))
    return false;
  if (t4.size === 0 && e3.size === 0)
    return true;
  var r3 = !Ar2(t4);
  if (re2(t4)) {
    var n = t4.entries();
    return e3.every(function(l3, c) {
      var _ = n.next().value;
      return _ && Bt2(_[1], l3) && (r3 || Bt2(_[0], c));
    }) && n.next().done;
  }
  var s = false;
  if (t4.size === void 0)
    if (e3.size === void 0)
      typeof t4.cacheResult == "function" && t4.cacheResult();
    else {
      s = true;
      var o5 = t4;
      t4 = e3, e3 = o5;
    }
  var a = true, u = e3.__iterate(function(l3, c) {
    if (r3 ? !t4.has(l3) : s ? !Bt2(l3, t4.get(c, ot2)) : !Bt2(t4.get(c, ot2), l3))
      return a = false, false;
  });
  return a && t4.size === u;
}
p2(cs2, "deepEqual");
function Ie2(t4, e3) {
  var r3 = p2(function(n) {
    t4.prototype[n] = e3[n];
  }, "keyCopier");
  return Object.keys(e3).forEach(r3), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e3).forEach(r3), t4;
}
p2(Ie2, "mixin");
function jr2(t4) {
  if (!t4 || typeof t4 != "object")
    return t4;
  if (!Nt2(t4)) {
    if (!ge2(t4))
      return t4;
    t4 = Wt2(t4);
  }
  if (vt2(t4)) {
    var e3 = {};
    return t4.__iterate(function(n, s) {
      e3[s] = jr2(n);
    }), e3;
  }
  var r3 = [];
  return t4.__iterate(function(n) {
    r3.push(jr2(n));
  }), r3;
}
p2(jr2, "toJS");
var Dr2 = function(t4) {
  function e3(r3) {
    return r3 == null ? Xe2() : An2(r3) && !re2(r3) ? r3 : Xe2().withMutations(function(n) {
      var s = t4(r3);
      Kt2(s.size), s.forEach(function(o5) {
        return n.add(o5);
      });
    });
  }
  return p2(e3, "Set"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return this(arguments);
  }, "of"), e3.fromKeys = p2(function(n) {
    return this(Gt2(n).keySeq());
  }, "fromKeys"), e3.intersect = p2(function(n) {
    return n = Et2(n).toArray(), n.length ? At2.intersect.apply(e3(n.pop()), n) : Xe2();
  }, "intersect"), e3.union = p2(function(n) {
    return n = Et2(n).toArray(), n.length ? At2.union.apply(e3(n.pop()), n) : Xe2();
  }, "union"), e3.prototype.toString = p2(function() {
    return this.__toString("Set {", "}");
  }, "toString"), e3.prototype.has = p2(function(n) {
    return this._map.has(n);
  }, "has"), e3.prototype.add = p2(function(n) {
    return Er2(this, this._map.set(n, n));
  }, "add"), e3.prototype.remove = p2(function(n) {
    return Er2(this, this._map.remove(n));
  }, "remove"), e3.prototype.clear = p2(function() {
    return Er2(this, this._map.clear());
  }, "clear"), e3.prototype.map = p2(function(n, s) {
    var o5 = this, a = false, u = Er2(this, this._map.mapEntries(function(l3) {
      var c = l3[1], _ = n.call(s, c, c, o5);
      return _ !== c && (a = true), [_, _];
    }, s));
    return a ? u : this;
  }, "map"), e3.prototype.union = p2(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    return n = n.filter(function(o5) {
      return o5.size !== 0;
    }), n.length === 0 ? this : this.size === 0 && !this.__ownerID && n.length === 1 ? this.constructor(n[0]) : this.withMutations(function(o5) {
      for (var a = 0; a < n.length; a++)
        typeof n[a] == "string" ? o5.add(n[a]) : t4(n[a]).forEach(function(u) {
          return o5.add(u);
        });
    });
  }, "union"), e3.prototype.intersect = p2(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t4(a);
    });
    var o5 = [];
    return this.forEach(function(a) {
      n.every(function(u) {
        return u.includes(a);
      }) || o5.push(a);
    }), this.withMutations(function(a) {
      o5.forEach(function(u) {
        a.remove(u);
      });
    });
  }, "intersect"), e3.prototype.subtract = p2(function() {
    for (var n = [], s = arguments.length; s--; )
      n[s] = arguments[s];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t4(a);
    });
    var o5 = [];
    return this.forEach(function(a) {
      n.some(function(u) {
        return u.includes(a);
      }) && o5.push(a);
    }), this.withMutations(function(a) {
      o5.forEach(function(u) {
        a.remove(u);
      });
    });
  }, "subtract"), e3.prototype.sort = p2(function(n) {
    return sr2(Te2(this, n));
  }, "sort"), e3.prototype.sortBy = p2(function(n, s) {
    return sr2(Te2(this, s, n));
  }, "sortBy"), e3.prototype.wasAltered = p2(function() {
    return this._map.wasAltered();
  }, "wasAltered"), e3.prototype.__iterate = p2(function(n, s) {
    var o5 = this;
    return this._map.__iterate(function(a) {
      return n(a, a, o5);
    }, s);
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    return this._map.__iterator(n, s);
  }, "__iterator"), e3.prototype.__ensureOwner = p2(function(n) {
    if (n === this.__ownerID)
      return this;
    var s = this._map.__ensureOwner(n);
    return n ? this.__make(s, n) : this.size === 0 ? this.__empty() : (this.__ownerID = n, this._map = s, this);
  }, "__ensureOwner"), e3;
}(Ue2);
Dr2.isSet = An2;
var At2 = Dr2.prototype;
At2[ls2] = true;
At2[or2] = At2.remove;
At2.merge = At2.concat = At2.union;
At2.withMutations = lr2;
At2.asImmutable = cr2;
At2["@@transducer/init"] = At2.asMutable = fr2;
At2["@@transducer/step"] = function(t4, e3) {
  return t4.add(e3);
};
At2["@@transducer/result"] = function(t4) {
  return t4.asImmutable();
};
At2.__empty = Xe2;
At2.__make = hs2;
function Er2(t4, e3) {
  return t4.__ownerID ? (t4.size = e3.size, t4._map = e3, t4) : e3 === t4._map ? t4 : e3.size === 0 ? t4.__empty() : t4.__make(e3);
}
p2(Er2, "updateSet");
function hs2(t4, e3) {
  var r3 = Object.create(At2);
  return r3.size = t4 ? t4.size : 0, r3._map = t4, r3.__ownerID = e3, r3;
}
p2(hs2, "makeSet");
var gi2;
function Xe2() {
  return gi2 || (gi2 = hs2(ee2()));
}
p2(Xe2, "emptySet");
var Jo2 = function(t4) {
  function e3(r3, n, s) {
    if (!(this instanceof e3))
      return new e3(r3, n, s);
    if (_n2(s !== 0, "Cannot step a Range by 0"), r3 = r3 || 0, n === void 0 && (n = 1 / 0), s = s === void 0 ? 1 : Math.abs(s), n < r3 && (s = -s), this._start = r3, this._end = n, this._step = s, this.size = Math.max(0, Math.ceil((n - r3) / s - 1) + 1), this.size === 0) {
      if (Hr2)
        return Hr2;
      Hr2 = this;
    }
  }
  return p2(e3, "Range"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.prototype.toString = p2(function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, "toString"), e3.prototype.get = p2(function(n, s) {
    return this.has(n) ? this._start + me2(this, n) * this._step : s;
  }, "get"), e3.prototype.includes = p2(function(n) {
    var s = (n - this._start) / this._step;
    return s >= 0 && s < this.size && s === Math.floor(s);
  }, "includes"), e3.prototype.slice = p2(function(n, s) {
    return Mr2(n, s, this.size) ? this : (n = ar2(n, this.size), s = xr2(s, this.size), s <= n ? new e3(0, 0) : new e3(this.get(n, this._end), this.get(s, this._end), this._step));
  }, "slice"), e3.prototype.indexOf = p2(function(n) {
    var s = n - this._start;
    if (s % this._step === 0) {
      var o5 = s / this._step;
      if (o5 >= 0 && o5 < this.size)
        return o5;
    }
    return -1;
  }, "indexOf"), e3.prototype.lastIndexOf = p2(function(n) {
    return this.indexOf(n);
  }, "lastIndexOf"), e3.prototype.__iterate = p2(function(n, s) {
    for (var o5 = this.size, a = this._step, u = s ? this._start + (o5 - 1) * a : this._start, l3 = 0; l3 !== o5 && n(u, s ? o5 - ++l3 : l3++, this) !== false; )
      u += s ? -a : a;
    return l3;
  }, "__iterate"), e3.prototype.__iterator = p2(function(n, s) {
    var o5 = this.size, a = this._step, u = s ? this._start + (o5 - 1) * a : this._start, l3 = 0;
    return new lt2(function() {
      if (l3 === o5)
        return Ft2();
      var c = u;
      return u += s ? -a : a, yt2(n, s ? o5 - ++l3 : l3++, c);
    });
  }, "__iterator"), e3.prototype.equals = p2(function(n) {
    return n instanceof e3 ? this._start === n._start && this._end === n._end && this._step === n._step : cs2(this, n);
  }, "equals"), e3;
}(ie2);
var Hr2;
function ps2(t4, e3, r3) {
  for (var n = Ki2(e3), s = 0; s !== n.length; )
    if (t4 = Yi2(t4, n[s++], ot2), t4 === ot2)
      return r3;
  return t4;
}
p2(ps2, "getIn$1");
function ds2(t4, e3) {
  return ps2(this, t4, e3);
}
p2(ds2, "getIn");
function Ho2(t4, e3) {
  return ps2(t4, e3, ot2) !== ot2;
}
p2(Ho2, "hasIn$1");
function Ko2(t4) {
  return Ho2(this, t4);
}
p2(Ko2, "hasIn");
function _s2() {
  Kt2(this.size);
  var t4 = {};
  return this.__iterate(function(e3, r3) {
    t4[r3] = e3;
  }), t4;
}
p2(_s2, "toObject");
Et2.isIterable = Nt2;
Et2.isKeyed = vt2;
Et2.isIndexed = Ut2;
Et2.isAssociative = Ar2;
Et2.isOrdered = re2;
Et2.Iterator = lt2;
Ie2(Et2, { toArray: p2(function() {
  Kt2(this.size);
  var e3 = new Array(this.size || 0), r3 = vt2(this), n = 0;
  return this.__iterate(function(s, o5) {
    e3[n++] = r3 ? [o5, s] : s;
  }), e3;
}, "toArray"), toIndexedSeq: p2(function() {
  return new Ni2(this);
}, "toIndexedSeq"), toJS: p2(function() {
  return jr2(this);
}, "toJS$1"), toKeyedSeq: p2(function() {
  return new zr2(this, true);
}, "toKeyedSeq"), toMap: p2(function() {
  return We2(this.toKeyedSeq());
}, "toMap"), toObject: _s2, toOrderedMap: p2(function() {
  return he2(this.toKeyedSeq());
}, "toOrderedMap"), toOrderedSet: p2(function() {
  return sr2(vt2(this) ? this.valueSeq() : this);
}, "toOrderedSet"), toSet: p2(function() {
  return Dr2(vt2(this) ? this.valueSeq() : this);
}, "toSet"), toSetSeq: p2(function() {
  return new Fi2(this);
}, "toSetSeq"), toSeq: p2(function() {
  return Ut2(this) ? this.toIndexedSeq() : vt2(this) ? this.toKeyedSeq() : this.toSetSeq();
}, "toSeq"), toStack: p2(function() {
  return xn2(vt2(this) ? this.valueSeq() : this);
}, "toStack"), toList: p2(function() {
  return Pr2(vt2(this) ? this.valueSeq() : this);
}, "toList"), toString: p2(function() {
  return "[Collection]";
}, "toString"), __toString: p2(function(e3, r3) {
  return this.size === 0 ? e3 + r3 : e3 + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + r3;
}, "__toString"), concat: p2(function() {
  for (var e3 = [], r3 = arguments.length; r3--; )
    e3[r3] = arguments[r3];
  return ht2(this, Oo2(this, e3));
}, "concat"), includes: p2(function(e3) {
  return this.some(function(r3) {
    return Bt2(r3, e3);
  });
}, "includes"), entries: p2(function() {
  return this.__iterator(Yt2);
}, "entries"), every: p2(function(e3, r3) {
  Kt2(this.size);
  var n = true;
  return this.__iterate(function(s, o5, a) {
    if (!e3.call(r3, s, o5, a))
      return n = false, false;
  }), n;
}, "every"), filter: p2(function(e3, r3) {
  return ht2(this, Wi2(this, e3, r3, true));
}, "filter"), partition: p2(function(e3, r3) {
  return So2(this, e3, r3);
}, "partition"), find: p2(function(e3, r3, n) {
  var s = this.findEntry(e3, r3);
  return s ? s[1] : n;
}, "find"), forEach: p2(function(e3, r3) {
  return Kt2(this.size), this.__iterate(r3 ? e3.bind(r3) : e3);
}, "forEach"), join: p2(function(e3) {
  Kt2(this.size), e3 = e3 !== void 0 ? "" + e3 : ",";
  var r3 = "", n = true;
  return this.__iterate(function(s) {
    n ? n = false : r3 += e3, r3 += s != null ? s.toString() : "";
  }), r3;
}, "join"), keys: p2(function() {
  return this.__iterator(ur2);
}, "keys"), map: p2(function(e3, r3) {
  return ht2(this, Bi2(this, e3, r3));
}, "map"), reduce: p2(function(e3, r3, n) {
  return vi2(this, e3, r3, n, arguments.length < 2, false);
}, "reduce$1"), reduceRight: p2(function(e3, r3, n) {
  return vi2(this, e3, r3, n, arguments.length < 2, true);
}, "reduceRight"), reverse: p2(function() {
  return ht2(this, cn2(this, true));
}, "reverse"), slice: p2(function(e3, r3) {
  return ht2(this, hn2(this, e3, r3, true));
}, "slice"), some: p2(function(e3, r3) {
  return !this.every(Or2(e3), r3);
}, "some"), sort: p2(function(e3) {
  return ht2(this, Te2(this, e3));
}, "sort"), values: p2(function() {
  return this.__iterator(ne2);
}, "values"), butLast: p2(function() {
  return this.slice(0, -1);
}, "butLast"), isEmpty: p2(function() {
  return this.size !== void 0 ? this.size === 0 : !this.some(function() {
    return true;
  });
}, "isEmpty"), count: p2(function(e3, r3) {
  return Re2(e3 ? this.toSeq().filter(e3, r3) : this);
}, "count"), countBy: p2(function(e3, r3) {
  return wo2(this, e3, r3);
}, "countBy"), equals: p2(function(e3) {
  return cs2(this, e3);
}, "equals"), entrySeq: p2(function() {
  var e3 = this;
  if (e3._cache)
    return new Ee2(e3._cache);
  var r3 = e3.toSeq().map(Go2).toIndexedSeq();
  return r3.fromEntrySeq = function() {
    return e3.toSeq();
  }, r3;
}, "entrySeq"), filterNot: p2(function(e3, r3) {
  return this.filter(Or2(e3), r3);
}, "filterNot"), findEntry: p2(function(e3, r3, n) {
  var s = n;
  return this.__iterate(function(o5, a, u) {
    if (e3.call(r3, o5, a, u))
      return s = [a, o5], false;
  }), s;
}, "findEntry"), findKey: p2(function(e3, r3) {
  var n = this.findEntry(e3, r3);
  return n && n[0];
}, "findKey"), findLast: p2(function(e3, r3, n) {
  return this.toKeyedSeq().reverse().find(e3, r3, n);
}, "findLast"), findLastEntry: p2(function(e3, r3, n) {
  return this.toKeyedSeq().reverse().findEntry(e3, r3, n);
}, "findLastEntry"), findLastKey: p2(function(e3, r3) {
  return this.toKeyedSeq().reverse().findKey(e3, r3);
}, "findLastKey"), first: p2(function(e3) {
  return this.find(Oi2, null, e3);
}, "first"), flatMap: p2(function(e3, r3) {
  return ht2(this, Io2(this, e3, r3));
}, "flatMap"), flatten: p2(function(e3) {
  return ht2(this, Ji2(this, e3, true));
}, "flatten"), fromEntrySeq: p2(function() {
  return new qi2(this);
}, "fromEntrySeq"), get: p2(function(e3, r3) {
  return this.find(function(n, s) {
    return Bt2(s, e3);
  }, void 0, r3);
}, "get"), getIn: ds2, groupBy: p2(function(e3, r3) {
  return bo2(this, e3, r3);
}, "groupBy"), has: p2(function(e3) {
  return this.get(e3, ot2) !== ot2;
}, "has"), hasIn: Ko2, isSubset: p2(function(e3) {
  return e3 = typeof e3.includes == "function" ? e3 : Et2(e3), this.every(function(r3) {
    return e3.includes(r3);
  });
}, "isSubset"), isSuperset: p2(function(e3) {
  return e3 = typeof e3.isSubset == "function" ? e3 : Et2(e3), e3.isSubset(this);
}, "isSuperset"), keyOf: p2(function(e3) {
  return this.findKey(function(r3) {
    return Bt2(r3, e3);
  });
}, "keyOf"), keySeq: p2(function() {
  return this.toSeq().map(Yo2).toIndexedSeq();
}, "keySeq"), last: p2(function(e3) {
  return this.toSeq().reverse().first(e3);
}, "last"), lastKeyOf: p2(function(e3) {
  return this.toKeyedSeq().reverse().keyOf(e3);
}, "lastKeyOf"), max: p2(function(e3) {
  return wr2(this, e3);
}, "max"), maxBy: p2(function(e3, r3) {
  return wr2(this, r3, e3);
}, "maxBy"), min: p2(function(e3) {
  return wr2(this, e3 ? yi2(e3) : bi2);
}, "min"), minBy: p2(function(e3, r3) {
  return wr2(this, r3 ? yi2(r3) : bi2, e3);
}, "minBy"), rest: p2(function() {
  return this.slice(1);
}, "rest"), skip: p2(function(e3) {
  return e3 === 0 ? this : this.slice(Math.max(0, e3));
}, "skip"), skipLast: p2(function(e3) {
  return e3 === 0 ? this : this.slice(0, -Math.max(0, e3));
}, "skipLast"), skipWhile: p2(function(e3, r3) {
  return ht2(this, Vi2(this, e3, r3, true));
}, "skipWhile"), skipUntil: p2(function(e3, r3) {
  return this.skipWhile(Or2(e3), r3);
}, "skipUntil"), sortBy: p2(function(e3, r3) {
  return ht2(this, Te2(this, r3, e3));
}, "sortBy"), take: p2(function(e3) {
  return this.slice(0, Math.max(0, e3));
}, "take"), takeLast: p2(function(e3) {
  return this.slice(-Math.max(0, e3));
}, "takeLast"), takeWhile: p2(function(e3, r3) {
  return ht2(this, Eo2(this, e3, r3));
}, "takeWhile"), takeUntil: p2(function(e3, r3) {
  return this.takeWhile(Or2(e3), r3);
}, "takeUntil"), update: p2(function(e3) {
  return e3(this);
}, "update"), valueSeq: p2(function() {
  return this.toIndexedSeq();
}, "valueSeq"), hashCode: p2(function() {
  return this.__hash || (this.__hash = Qo2(this));
}, "hashCode") });
var $t2 = Et2.prototype;
$t2[ji2] = true;
$t2[Rr2] = $t2.values;
$t2.toJSON = $t2.toArray;
$t2.__toStringMapper = tr2;
$t2.inspect = $t2.toSource = function() {
  return this.toString();
};
$t2.chain = $t2.flatMap;
$t2.contains = $t2.includes;
Ie2(Gt2, { flip: p2(function() {
  return ht2(this, Li2(this));
}, "flip"), mapEntries: p2(function(e3, r3) {
  var n = this, s = 0;
  return ht2(this, this.toSeq().map(function(o5, a) {
    return e3.call(r3, [a, o5], s++, n);
  }).fromEntrySeq());
}, "mapEntries"), mapKeys: p2(function(e3, r3) {
  var n = this;
  return ht2(this, this.toSeq().flip().map(function(s, o5) {
    return e3.call(r3, s, o5, n);
  }).flip());
}, "mapKeys") });
var hr2 = Gt2.prototype;
hr2[Mi2] = true;
hr2[Rr2] = $t2.entries;
hr2.toJSON = _s2;
hr2.__toStringMapper = function(t4, e3) {
  return tr2(e3) + ": " + tr2(t4);
};
Ie2(Oe2, { toKeyedSeq: p2(function() {
  return new zr2(this, false);
}, "toKeyedSeq"), filter: p2(function(e3, r3) {
  return ht2(this, Wi2(this, e3, r3, false));
}, "filter"), findIndex: p2(function(e3, r3) {
  var n = this.findEntry(e3, r3);
  return n ? n[0] : -1;
}, "findIndex"), indexOf: p2(function(e3) {
  var r3 = this.keyOf(e3);
  return r3 === void 0 ? -1 : r3;
}, "indexOf"), lastIndexOf: p2(function(e3) {
  var r3 = this.lastKeyOf(e3);
  return r3 === void 0 ? -1 : r3;
}, "lastIndexOf"), reverse: p2(function() {
  return ht2(this, cn2(this, false));
}, "reverse"), slice: p2(function(e3, r3) {
  return ht2(this, hn2(this, e3, r3, false));
}, "slice"), splice: p2(function(e3, r3) {
  var n = arguments.length;
  if (r3 = Math.max(r3 || 0, 0), n === 0 || n === 2 && !r3)
    return this;
  e3 = ar2(e3, e3 < 0 ? this.count() : this.size);
  var s = this.slice(0, e3);
  return ht2(this, n === 1 ? s : s.concat(ae2(arguments, 2), this.slice(e3 + r3)));
}, "splice"), findLastIndex: p2(function(e3, r3) {
  var n = this.findLastEntry(e3, r3);
  return n ? n[0] : -1;
}, "findLastIndex"), first: p2(function(e3) {
  return this.get(0, e3);
}, "first"), flatten: p2(function(e3) {
  return ht2(this, Ji2(this, e3, false));
}, "flatten"), get: p2(function(e3, r3) {
  return e3 = me2(this, e3), e3 < 0 || this.size === 1 / 0 || this.size !== void 0 && e3 > this.size ? r3 : this.find(function(n, s) {
    return s === e3;
  }, void 0, r3);
}, "get"), has: p2(function(e3) {
  return e3 = me2(this, e3), e3 >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || e3 < this.size : this.indexOf(e3) !== -1);
}, "has"), interpose: p2(function(e3) {
  return ht2(this, ko2(this, e3));
}, "interpose"), interleave: p2(function() {
  var e3 = [this].concat(ae2(arguments)), r3 = br2(this.toSeq(), ie2.of, e3), n = r3.flatten(true);
  return r3.size && (n.size = r3.size * e3.length), ht2(this, n);
}, "interleave"), keySeq: p2(function() {
  return Jo2(0, this.size);
}, "keySeq"), last: p2(function(e3) {
  return this.get(-1, e3);
}, "last"), skipWhile: p2(function(e3, r3) {
  return ht2(this, Vi2(this, e3, r3, false));
}, "skipWhile"), zip: p2(function() {
  var e3 = [this].concat(ae2(arguments));
  return ht2(this, br2(this, wi2, e3));
}, "zip"), zipAll: p2(function() {
  var e3 = [this].concat(ae2(arguments));
  return ht2(this, br2(this, wi2, e3, true));
}, "zipAll"), zipWith: p2(function(e3) {
  var r3 = ae2(arguments);
  return r3[0] = this, ht2(this, br2(this, e3, r3));
}, "zipWith") });
var Ve2 = Oe2.prototype;
Ve2[xi2] = true;
Ve2[Fe2] = true;
Ie2(Ue2, { get: p2(function(e3, r3) {
  return this.has(e3) ? e3 : r3;
}, "get"), includes: p2(function(e3) {
  return this.has(e3);
}, "includes"), keySeq: p2(function() {
  return this.valueSeq();
}, "keySeq") });
var De2 = Ue2.prototype;
De2.has = $t2.includes;
De2.contains = De2.includes;
De2.keys = De2.values;
Ie2(ve2, hr2);
Ie2(ie2, Ve2);
Ie2(Le2, De2);
function vi2(t4, e3, r3, n, s, o5) {
  return Kt2(t4.size), t4.__iterate(function(a, u, l3) {
    s ? (s = false, r3 = a) : r3 = e3.call(n, r3, a, u, l3);
  }, o5), r3;
}
p2(vi2, "reduce");
function Yo2(t4, e3) {
  return e3;
}
p2(Yo2, "keyMapper");
function Go2(t4, e3) {
  return [e3, t4];
}
p2(Go2, "entryMapper");
function Or2(t4) {
  return function() {
    return !t4.apply(this, arguments);
  };
}
p2(Or2, "not");
function yi2(t4) {
  return function() {
    return -t4.apply(this, arguments);
  };
}
p2(yi2, "neg");
function wi2() {
  return ae2(arguments);
}
p2(wi2, "defaultZipper");
function bi2(t4, e3) {
  return t4 < e3 ? 1 : t4 > e3 ? -1 : 0;
}
p2(bi2, "defaultNegComparator");
function Qo2(t4) {
  if (t4.size === 1 / 0)
    return 0;
  var e3 = re2(t4), r3 = vt2(t4), n = e3 ? 1 : 0, s = t4.__iterate(r3 ? e3 ? function(o5, a) {
    n = 31 * n + Si2(Lt2(o5), Lt2(a)) | 0;
  } : function(o5, a) {
    n = n + Si2(Lt2(o5), Lt2(a)) | 0;
  } : e3 ? function(o5) {
    n = 31 * n + Lt2(o5) | 0;
  } : function(o5) {
    n = n + Lt2(o5) | 0;
  });
  return Xo2(s, n);
}
p2(Qo2, "hashCollection");
function Xo2(t4, e3) {
  return e3 = Ye2(e3, 3432918353), e3 = Ye2(e3 << 15 | e3 >>> -15, 461845907), e3 = Ye2(e3 << 13 | e3 >>> -13, 5), e3 = (e3 + 3864292196 | 0) ^ t4, e3 = Ye2(e3 ^ e3 >>> 16, 2246822507), e3 = Ye2(e3 ^ e3 >>> 13, 3266489909), e3 = $r2(e3 ^ e3 >>> 16), e3;
}
p2(Xo2, "murmurHashOfSize");
function Si2(t4, e3) {
  return t4 ^ e3 + 2654435769 + (t4 << 6) + (t4 >> 2) | 0;
}
p2(Si2, "hashMerge");
var sr2 = function(t4) {
  function e3(r3) {
    return r3 == null ? rn2() : fs2(r3) ? r3 : rn2().withMutations(function(n) {
      var s = Ue2(r3);
      Kt2(s.size), s.forEach(function(o5) {
        return n.add(o5);
      });
    });
  }
  return p2(e3, "OrderedSet"), t4 && (e3.__proto__ = t4), e3.prototype = Object.create(t4 && t4.prototype), e3.prototype.constructor = e3, e3.of = p2(function() {
    return this(arguments);
  }, "of"), e3.fromKeys = p2(function(n) {
    return this(Gt2(n).keySeq());
  }, "fromKeys"), e3.prototype.toString = p2(function() {
    return this.__toString("OrderedSet {", "}");
  }, "toString"), e3;
}(Dr2);
sr2.isOrderedSet = fs2;
var ke2 = sr2.prototype;
ke2[Fe2] = true;
ke2.zip = Ve2.zip;
ke2.zipWith = Ve2.zipWith;
ke2.zipAll = Ve2.zipAll;
ke2.__empty = rn2;
ke2.__make = ms2;
function ms2(t4, e3) {
  var r3 = Object.create(ke2);
  return r3.size = t4 ? t4.size : 0, r3._map = t4, r3.__ownerID = e3, r3;
}
p2(ms2, "makeOrderedSet");
var Ei2;
function rn2() {
  return Ei2 || (Ei2 = ms2(Ge2()));
}
p2(rn2, "emptyOrderedSet");
function Zo2(t4) {
  if (Ne2(t4))
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  if (ue2(t4))
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  if (t4 === null || typeof t4 != "object")
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
}
p2(Zo2, "throwOnInvalidDefaultValues");
var wt2 = p2(function(e3, r3) {
  var n;
  Zo2(e3);
  var s = p2(function(u) {
    var l3 = this;
    if (u instanceof s)
      return u;
    if (!(this instanceof s))
      return new s(u);
    if (!n) {
      n = true;
      var c = Object.keys(e3), _ = o5._indices = {};
      o5._name = r3, o5._keys = c, o5._defaultValues = e3;
      for (var p3 = 0; p3 < c.length; p3++) {
        var w3 = c[p3];
        _[w3] = p3, o5[w3] ? typeof console == "object" && console.warn && console.warn("Cannot define " + Tn2(this) + ' with property "' + w3 + '" since that property name is part of the Record API.') : ta2(o5, w3);
      }
    }
    return this.__ownerID = void 0, this._values = Pr2().withMutations(function(v) {
      v.setSize(l3._keys.length), Gt2(u).forEach(function(y, b3) {
        v.set(l3._indices[b3], y === l3._defaultValues[b3] ? void 0 : y);
      });
    }), this;
  }, "Record"), o5 = s.prototype = Object.create(dt2);
  return o5.constructor = s, r3 && (s.displayName = r3), s;
}, "Record");
wt2.prototype.toString = p2(function() {
  for (var e3 = Tn2(this) + " { ", r3 = this._keys, n, s = 0, o5 = r3.length; s !== o5; s++)
    n = r3[s], e3 += (s ? ", " : "") + n + ": " + tr2(this.get(n));
  return e3 + " }";
}, "toString");
wt2.prototype.equals = p2(function(e3) {
  return this === e3 || Ne2(e3) && Ce2(this).equals(Ce2(e3));
}, "equals");
wt2.prototype.hashCode = p2(function() {
  return Ce2(this).hashCode();
}, "hashCode");
wt2.prototype.has = p2(function(e3) {
  return this._indices.hasOwnProperty(e3);
}, "has");
wt2.prototype.get = p2(function(e3, r3) {
  if (!this.has(e3))
    return r3;
  var n = this._indices[e3], s = this._values.get(n);
  return s === void 0 ? this._defaultValues[e3] : s;
}, "get");
wt2.prototype.set = p2(function(e3, r3) {
  if (this.has(e3)) {
    var n = this._values.set(this._indices[e3], r3 === this._defaultValues[e3] ? void 0 : r3);
    if (n !== this._values && !this.__ownerID)
      return Rn2(this, n);
  }
  return this;
}, "set");
wt2.prototype.remove = p2(function(e3) {
  return this.set(e3);
}, "remove");
wt2.prototype.clear = p2(function() {
  var e3 = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : Rn2(this, e3);
}, "clear");
wt2.prototype.wasAltered = p2(function() {
  return this._values.wasAltered();
}, "wasAltered");
wt2.prototype.toSeq = p2(function() {
  return Ce2(this);
}, "toSeq");
wt2.prototype.toJS = p2(function() {
  return jr2(this);
}, "toJS$1");
wt2.prototype.entries = p2(function() {
  return this.__iterator(Yt2);
}, "entries");
wt2.prototype.__iterator = p2(function(e3, r3) {
  return Ce2(this).__iterator(e3, r3);
}, "__iterator");
wt2.prototype.__iterate = p2(function(e3, r3) {
  return Ce2(this).__iterate(e3, r3);
}, "__iterate");
wt2.prototype.__ensureOwner = p2(function(e3) {
  if (e3 === this.__ownerID)
    return this;
  var r3 = this._values.__ensureOwner(e3);
  return e3 ? Rn2(this, r3, e3) : (this.__ownerID = e3, this._values = r3, this);
}, "__ensureOwner");
wt2.isRecord = Ne2;
wt2.getDescriptiveName = Tn2;
var dt2 = wt2.prototype;
dt2[Ri2] = true;
dt2[or2] = dt2.remove;
dt2.deleteIn = dt2.removeIn = gn2;
dt2.getIn = ds2;
dt2.hasIn = $t2.hasIn;
dt2.merge = Xi2;
dt2.mergeWith = Zi2;
dt2.mergeIn = Sn2;
dt2.mergeDeep = es2;
dt2.mergeDeepWith = rs2;
dt2.mergeDeepIn = En2;
dt2.setIn = mn2;
dt2.update = vn2;
dt2.updateIn = yn2;
dt2.withMutations = lr2;
dt2.asMutable = fr2;
dt2.asImmutable = cr2;
dt2[Rr2] = dt2.entries;
dt2.toJSON = dt2.toObject = $t2.toObject;
dt2.inspect = dt2.toSource = function() {
  return this.toString();
};
function Rn2(t4, e3, r3) {
  var n = Object.create(Object.getPrototypeOf(t4));
  return n._values = e3, n.__ownerID = r3, n;
}
p2(Rn2, "makeRecord");
function Tn2(t4) {
  return t4.constructor.displayName || t4.constructor.name || "Record";
}
p2(Tn2, "recordName");
function Ce2(t4) {
  return un2(t4._keys.map(function(e3) {
    return [e3, t4.get(e3)];
  }));
}
p2(Ce2, "recordSeq");
function ta2(t4, e3) {
  try {
    Object.defineProperty(t4, e3, { get: function() {
      return this.get(e3);
    }, set: function(r3) {
      _n2(this.__ownerID, "Cannot set on an immutable record."), this.set(e3, r3);
    } });
  } catch {
  }
}
p2(ta2, "setProp");
var ra2 = `<!DOCTYPE html>
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
o3();
var Qt2 = p2((t4) => na2(t4).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8), "md5");
function na2(t4) {
  let e3 = "0123456789abcdef";
  function r3(Q) {
    let N, W = "";
    for (N = 0; N <= 3; N++)
      W += e3.charAt(Q >> N * 8 + 4 & 15) + e3.charAt(Q >> N * 8 & 15);
    return W;
  }
  p2(r3, "rh");
  function n(Q, N) {
    let W = (Q & 65535) + (N & 65535);
    return (Q >> 16) + (N >> 16) + (W >> 16) << 16 | W & 65535;
  }
  p2(n, "ad");
  function s(Q, N) {
    return Q << N | Q >>> 32 - N;
  }
  p2(s, "rl");
  function o5(Q, N, W, ft, F, Dt) {
    return n(s(n(n(N, Q), n(ft, Dt)), F), W);
  }
  p2(o5, "cm");
  function a(Q, N, W, ft, F, Dt, Ct) {
    return o5(N & W | ~N & ft, Q, N, F, Dt, Ct);
  }
  p2(a, "ff");
  function u(Q, N, W, ft, F, Dt, Ct) {
    return o5(N & ft | W & ~ft, Q, N, F, Dt, Ct);
  }
  p2(u, "gg");
  function l3(Q, N, W, ft, F, Dt, Ct) {
    return o5(N ^ W ^ ft, Q, N, F, Dt, Ct);
  }
  p2(l3, "hh");
  function c(Q, N, W, ft, F, Dt, Ct) {
    return o5(W ^ (N | ~ft), Q, N, F, Dt, Ct);
  }
  p2(c, "ii");
  function _(Q) {
    let N, W = (Q.length + 8 >> 6) + 1, ft = Array.from({ length: W * 16 });
    for (N = 0; N < W * 16; N++)
      ft[N] = 0;
    for (N = 0; N < Q.length; N++)
      ft[N >> 2] |= Q.charCodeAt(N) << N % 4 * 8;
    return ft[N >> 2] |= 128 << N % 4 * 8, ft[W * 16 - 2] = Q.length * 8, ft;
  }
  p2(_, "sb");
  let p3, w3 = _(t4), v = 1732584193, y = -271733879, b3 = -1732584194, k3 = 271733878, X, K, ct, pt;
  for (p3 = 0; p3 < w3.length; p3 += 16)
    X = v, K = y, ct = b3, pt = k3, v = a(v, y, b3, k3, w3[p3 + 0], 7, -680876936), k3 = a(k3, v, y, b3, w3[p3 + 1], 12, -389564586), b3 = a(b3, k3, v, y, w3[p3 + 2], 17, 606105819), y = a(y, b3, k3, v, w3[p3 + 3], 22, -1044525330), v = a(v, y, b3, k3, w3[p3 + 4], 7, -176418897), k3 = a(k3, v, y, b3, w3[p3 + 5], 12, 1200080426), b3 = a(b3, k3, v, y, w3[p3 + 6], 17, -1473231341), y = a(y, b3, k3, v, w3[p3 + 7], 22, -45705983), v = a(v, y, b3, k3, w3[p3 + 8], 7, 1770035416), k3 = a(k3, v, y, b3, w3[p3 + 9], 12, -1958414417), b3 = a(b3, k3, v, y, w3[p3 + 10], 17, -42063), y = a(y, b3, k3, v, w3[p3 + 11], 22, -1990404162), v = a(v, y, b3, k3, w3[p3 + 12], 7, 1804603682), k3 = a(k3, v, y, b3, w3[p3 + 13], 12, -40341101), b3 = a(b3, k3, v, y, w3[p3 + 14], 17, -1502002290), y = a(y, b3, k3, v, w3[p3 + 15], 22, 1236535329), v = u(v, y, b3, k3, w3[p3 + 1], 5, -165796510), k3 = u(k3, v, y, b3, w3[p3 + 6], 9, -1069501632), b3 = u(b3, k3, v, y, w3[p3 + 11], 14, 643717713), y = u(y, b3, k3, v, w3[p3 + 0], 20, -373897302), v = u(v, y, b3, k3, w3[p3 + 5], 5, -701558691), k3 = u(k3, v, y, b3, w3[p3 + 10], 9, 38016083), b3 = u(b3, k3, v, y, w3[p3 + 15], 14, -660478335), y = u(y, b3, k3, v, w3[p3 + 4], 20, -405537848), v = u(v, y, b3, k3, w3[p3 + 9], 5, 568446438), k3 = u(k3, v, y, b3, w3[p3 + 14], 9, -1019803690), b3 = u(b3, k3, v, y, w3[p3 + 3], 14, -187363961), y = u(y, b3, k3, v, w3[p3 + 8], 20, 1163531501), v = u(v, y, b3, k3, w3[p3 + 13], 5, -1444681467), k3 = u(k3, v, y, b3, w3[p3 + 2], 9, -51403784), b3 = u(b3, k3, v, y, w3[p3 + 7], 14, 1735328473), y = u(y, b3, k3, v, w3[p3 + 12], 20, -1926607734), v = l3(v, y, b3, k3, w3[p3 + 5], 4, -378558), k3 = l3(k3, v, y, b3, w3[p3 + 8], 11, -2022574463), b3 = l3(b3, k3, v, y, w3[p3 + 11], 16, 1839030562), y = l3(y, b3, k3, v, w3[p3 + 14], 23, -35309556), v = l3(v, y, b3, k3, w3[p3 + 1], 4, -1530992060), k3 = l3(k3, v, y, b3, w3[p3 + 4], 11, 1272893353), b3 = l3(b3, k3, v, y, w3[p3 + 7], 16, -155497632), y = l3(y, b3, k3, v, w3[p3 + 10], 23, -1094730640), v = l3(v, y, b3, k3, w3[p3 + 13], 4, 681279174), k3 = l3(k3, v, y, b3, w3[p3 + 0], 11, -358537222), b3 = l3(b3, k3, v, y, w3[p3 + 3], 16, -722521979), y = l3(y, b3, k3, v, w3[p3 + 6], 23, 76029189), v = l3(v, y, b3, k3, w3[p3 + 9], 4, -640364487), k3 = l3(k3, v, y, b3, w3[p3 + 12], 11, -421815835), b3 = l3(b3, k3, v, y, w3[p3 + 15], 16, 530742520), y = l3(y, b3, k3, v, w3[p3 + 2], 23, -995338651), v = c(v, y, b3, k3, w3[p3 + 0], 6, -198630844), k3 = c(k3, v, y, b3, w3[p3 + 7], 10, 1126891415), b3 = c(b3, k3, v, y, w3[p3 + 14], 15, -1416354905), y = c(y, b3, k3, v, w3[p3 + 5], 21, -57434055), v = c(v, y, b3, k3, w3[p3 + 12], 6, 1700485571), k3 = c(k3, v, y, b3, w3[p3 + 3], 10, -1894986606), b3 = c(b3, k3, v, y, w3[p3 + 10], 15, -1051523), y = c(y, b3, k3, v, w3[p3 + 1], 21, -2054922799), v = c(v, y, b3, k3, w3[p3 + 8], 6, 1873313359), k3 = c(k3, v, y, b3, w3[p3 + 15], 10, -30611744), b3 = c(b3, k3, v, y, w3[p3 + 6], 15, -1560198380), y = c(y, b3, k3, v, w3[p3 + 13], 21, 1309151649), v = c(v, y, b3, k3, w3[p3 + 4], 6, -145523070), k3 = c(k3, v, y, b3, w3[p3 + 11], 10, -1120210379), b3 = c(b3, k3, v, y, w3[p3 + 2], 15, 718787259), y = c(y, b3, k3, v, w3[p3 + 9], 21, -343485551), v = n(v, X), y = n(y, K), b3 = n(b3, ct), k3 = n(k3, pt);
  return r3(v) + r3(y) + r3(b3) + r3(k3);
}
p2(na2, "md5FULL");
o3();
var ia2 = `
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
o3();
var Is2 = t3(Os2(), 1);
function ks2(t4, e3) {
  return (0, Is2.default)(t4, e3).map((s) => s[0] === 1 ? s : [s[0], s[1].length]);
}
p2(ks2, "createDelta");
function Dn2(t4, e3) {
  let r3 = "", n = 0;
  for (let s of e3) {
    let o5 = s[0], a = s[1];
    s[0] === -1 && typeof a == "number" ? n += a : o5 == 0 && typeof a == "number" ? r3 += t4.slice(n, n += a) : r3 += a;
  }
  return r3;
}
p2(Dn2, "applyPatch");
o3();
o3();
var dr2 = t3(js2(), 1);
o3();
o3();
var Ur2 = { init: false, initialize: (t4) => Ur2.init === false ? Ur2.init = (0, dr2.initialize)({ wasmURL: new URL($3, t4 + "/src/").toString() }) : Ur2.init };
var xs2 = p2(async (t4, e3, r3) => {
  let n = Ur2.initialize(r3);
  n !== true && await n;
  let s = await (0, dr2.transform)(t4, { ...e3, define: { ...ca2, ...e3?.define ? e3.define : {} } });
  return { code: `/*${Qt2(t4)}*/` + s.code };
}, "initAndTransform");
var ca2 = { "process.env.NODE_ENV": '"development"', "process.env.NODE_DEBUG": JSON.stringify(false), "process.browser": JSON.stringify(true), "process.env.DEBUG": JSON.stringify(true), isBrowser: JSON.stringify(true), isJest: JSON.stringify(false), "process.env.version": '"1.1.1"', global: "globalThis", WORKER_DOM_DEBUG: JSON.stringify(false), "process.env.DUMP_SESSION_KEYS": JSON.stringify(false), process: JSON.stringify({ env: { NODE_ENV: "development", browser: true, NODE_DEBUG: false, DEBUG: true, isBrowser: true }, browser: true }) };
async function Ms2(t4, e3) {
  return (await xs2(t4, { loader: "tsx", format: "esm", treeShaking: true, platform: "browser", minify: false, keepNames: true, tsconfigRaw: { compilerOptions: { jsx: "react-jsx", useDefineForClassFields: false, jsxFragmentFactory: "Fragment", jsxImportSource: "@emotion/react" } }, target: "es2022" }, e3)).code;
}
p2(Ms2, "esmTransform");
var du2 = { imports: g4.imports };
function _u2(t4, e3) {
  let r3 = { syncDb: async (n, s, o5) => {
    let { getItem: a, setItem: u } = r3;
    return await p2(async (c, _, p3) => await da2(u, a, c, _, p3), "syncDb")(n, s, o5);
  }, getItem: async (n) => await (await e3(t4)).getItem(n), setItem: async (n, s) => await (await e3(t4)).setItem(n, s) };
  return r3;
}
p2(_u2, "db");
function ha2(t4, e3) {
  return wt2({ ...e3, room: t4, state: wt2(e3.state)() });
}
p2(ha2, "initSession");
var pa2 = new Ke2();
var da2 = p2(async (t4, e3, r3, n, s) => {
  pa2.runExclusive(async () => {
    let o5 = p2((_, p3) => t4("#" + String(_), p3), "setItem"), a = p2((_) => e3("#" + String(_)), "getItem"), u = wt2(r3)().hashCode(), l3 = await e3("head");
    l3 || (await o5(u, r3), await t4("head", u), l3 = u), await o5(s.newHash, { ...n, oldHash: s.oldHash, reversePatch: s.reversePatch });
    let c = await a(l3);
    await o5(l3, { newHash: s.newHash, patch: s.patch, ...c ? { i: c.i, oldHash: c.oldHash, reversePatch: c.reversePatch } : { code: r3.code, transpiled: r3.transpiled, html: r3.html, css: r3.css } }), await t4("head", s.newHash);
  });
}, "syncStorage");
var Vt2 = {};
var ye2 = {};
var Nr2 = class {
  constructor(e3, r3) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      let e4 = this.session.get("state"), r4 = e4.hashCode();
      return ye2[r4] = e4, r4;
    };
    this.createPatchFromHashCode = (e4, r4) => {
      let n2 = JSON.parse(Je2(r4));
      ye2[Fr2(this.room)] = this.session.get("state");
      let s = ye2[e4], o5 = e4, a = Je2(s.toJSON()), u = s.merge(n2), l3 = Je2(u.toJSON()).split(Qt2(u.get("transpiled"))).join("css"), c = this.session.get("state").merge(JSON.parse(l3)), _ = c.hashCode();
      ye2[_] = c;
      let p3 = As2(a, l3), w3 = As2(l3, a);
      return { oldHash: o5, newHash: _, reversePatch: w3, patch: p3 };
    };
    this.patchSync = (e4, r4 = false) => {
      if (!r4) {
        if (e4.code !== this.session.get("state").code && e4.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (e4.i, e4.i < this.session.get("state").i && (console.log("never going back!"), e4.i = this.session.get("state").i + 1), e4.code !== this.session.get("state").code && e4.i <= this.session.get("state").i)
          throw new Error("Code update without I update error");
        if (e4.transpiled.slice(0, 12) !== `/*${Qt2(e4.code)}*/`)
          throw console.error(`missing: /*${Qt2(e4.code)}*/, transpiled: ${e4.transpiled.slice(0, 12)}`), new Error("transpiled	hack issue");
        if (e4.code.length < 5)
          throw new Error("code deleted?");
        if (e4.html.indexOf(Qt2(e4.transpiled)) === -1)
          throw console.error(`missing md5trans from html: ${Qt2(e4.transpiled)}
      ${e4.html.slice(0, 64)}
      
      `), new Error(`render hack issue missing: ${Qt2(e4.transpiled)}.`);
        if (e4.css.length && e4.css.indexOf(Qt2(e4.transpiled)) === -1)
          throw console.error(`missing from css: ${Qt2(e4.transpiled)}`), new Error(`render hack issue missing: ${Qt2(e4.transpiled)}.`);
      }
      let n2 = this.session.get("state").hashCode();
      return this.session = this.session.set("state", this.session.get("state").merge(e4)), this.session.get("state").hashCode() !== n2 && r4 !== true && this.update(), this.session;
    };
    this.applyPatch = ({ oldHash: e4, newHash: r4, patch: n2 }) => {
      if (!(e4 && r4 && n2.length))
        return;
      ye2[Fr2(this.room)] = this.session.get("state");
      let s = ye2[e4];
      if (!s)
        throw new Error(`cant find old record: ${e4}`);
      let o5 = Je2(s.toJSON()), a = Dn2(o5, n2), u = JSON.parse(a), l3 = this.session.get("state").merge(u), c = this.session.get("state").merge(l3);
      if (c.hashCode() === r4)
        this.session = this.session.set("state", c), ye2[r4] = this.session.get("state");
      else
        throw new Error("Wrong patch");
      return r4;
    };
    Vt2[e3] = this, this.room = e3;
    let n = null;
    this.session = ha2(e3, { ...r3, state: n || JSON.parse(Je2({ ...r3.state, codeSpace: e3 })) })(), ye2[Fr2(e3)] = this.session.get("state");
  }
  update() {
    Object.keys(this.cb).map((e3) => this.cb[e3]).map((e3) => {
      try {
        e3();
      } catch (r3) {
        console.error("error calling callback", { err: r3 });
      }
    });
  }
  onUpdate(e3, r3) {
    this.cb[r3] = e3;
  }
  json() {
    let e3 = this.session.toJSON(), r3 = e3.state.toJSON();
    return { ...e3, state: r3 };
  }
  setRoom(e3) {
    let r3 = this.session.set("room", e3);
    this.session = r3;
  }
};
p2(Nr2, "CodeSession");
var Fr2 = p2((t4) => Vt2[t4]?.session.get("state").hashCode(), "hashKEY");
function mu2(t4, e3) {
  if (e3 && e3.length) {
    let r3 = Vt2[t4]?.session.get("state").toJSON(), { i: n, transpiled: s, code: o5, html: a, css: u } = e3 ? JSON.parse(Dn2(Je2(r3), e3)) : r3;
    return Vt2[t4]?.session.get("state").merge({ i: n, transpiled: s, code: o5, html: a, css: u, codeSpace: t4 }).toObject();
  }
  return Vt2[t4].session.get("state").toObject();
}
p2(mu2, "mST");
function Je2(t4) {
  let { i: e3, transpiled: r3, code: n, html: s, css: o5 } = t4;
  return JSON.stringify({ i: e3, transpiled: r3, code: n, html: s, css: o5 });
}
p2(Je2, "string_");
var gu2 = p2((t4, e3) => Vt2[e3]?.applyPatch(t4), "applyPatchSync");
var vu2 = p2((t4, e3) => {
  Vt2[e3]?.applyPatch(t4), Vt2[e3]?.update();
}, "applyPatch");
var yu2 = p2((t4, e3 = "default", r3) => Vt2[r3]?.onUpdate(t4, e3), "onSessionUpdate");
var _a2 = p2((t4, e3, r3) => ({ codeSpace: r3, i: e3.i, ...Vt2[r3]?.createPatchFromHashCode(t4, e3) }), "makePatchFrom");
var wu2 = p2((t4, e3) => ({ ..._a2(Fr2(e3), t4, e3), codeSpace: e3, i: t4.i }), "makePatch");
var bu2 = p2((t4, e3) => Vt2[t4] || (Vt2[t4] = new Nr2(t4, { name: e3.name, state: { ...e3.state, codeSpace: t4 } })), "startSession");
function As2(t4, e3) {
  return ks2(t4, e3);
}
p2(As2, "createPatch");
var Su2 = p2((t4, e3 = true) => Vt2[t4.codeSpace].patchSync(t4, e3), "patchSync");
function Eu2(t4) {
  return wt2(t4)().hashCode();
}
p2(Eu2, "hashCode");

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
        const start = Qt2(
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
            return new Response(JSON.stringify(du2), {
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
              (e3) => new Response("Error," + e3?.message, {
                status: 500,
                statusText: e3?.message
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
            const bodyStr = isText ? b2(
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
function loadRecursive(parent, keys, values, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys[middle];
    const data = values[middle];
    const node = { key, data, parent };
    node.left = loadRecursive(node, keys, values, start, middle);
    node.right = loadRecursive(node, keys, values, middle + 1, end);
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
function sort(keys, values, left, right, compare) {
  if (left >= right)
    return;
  const pivot = keys[left + right >> 1];
  let i3 = left - 1;
  let j3 = right + 1;
  while (true) {
    do
      i3++;
    while (compare(keys[i3], pivot) < 0);
    do
      j3--;
    while (compare(keys[j3], pivot) > 0);
    if (i3 >= j3)
      break;
    let tmp = keys[i3];
    keys[i3] = keys[j3];
    keys[j3] = tmp;
    tmp = values[i3];
    values[i3] = values[j3];
    values[j3] = tmp;
  }
  sort(keys, values, left, j3, compare);
  sort(keys, values, j3 + 1, right, compare);
}

// ../../../../../Users/z/.yarn/berry/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
function DEFAULT_COMPARE(a, b3) {
  return a > b3 ? 1 : a < b3 ? -1 : 0;
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
    var s = [], done = false, i3 = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          callback(current, i3++);
          current = current.right;
        } else
          done = true;
      }
    }
    return this;
  }
  range(low, high, fn3, ctx) {
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
          if (fn3.call(ctx, node))
            return this;
        }
        node = node.right;
      }
    }
    return this;
  }
  keys() {
    var current = this._root;
    var s = [], r3 = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r3.push(current.key);
          current = current.right;
        } else
          done = true;
      }
    }
    return r3;
  }
  values() {
    var current = this._root;
    var s = [], r3 = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r3.push(current.data);
          current = current.right;
        } else
          done = true;
      }
    }
    return r3;
  }
  at(index) {
    var current = this._root;
    var s = [], done = false, i3 = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i3 === index)
            return current;
          i3++;
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
    var max, min;
    if (node.left) {
      max = node.left;
      while (max.left || max.right) {
        while (max.right)
          max = max.right;
        node.key = max.key;
        node.data = max.data;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }
      node.key = max.key;
      node.data = max.data;
      node = max;
    }
    if (node.right) {
      min = node.right;
      while (min.left || min.right) {
        while (min.left)
          min = min.left;
        node.key = min.key;
        node.data = min.data;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }
      node.key = min.key;
      node.data = min.data;
      node = min;
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
  load(keys = [], values = [], presort) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const size = keys.length;
    if (presort)
      sort(keys, values, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys, values, 0, size);
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
    return b2(transpiled.code, origin, origin);
  else
    return transpiled.code;
}

// src/chatRoom.ts
var Code = class {
  constructor(state, env) {
    this.env = env;
    this.kv = state.storage;
    this.state = state;
    this.head = 0;
    this.sessionStarted = false;
    this.sessions = [];
    this.sess = null;
    this.env = env;
    this.codeSpace = "";
    this.address = "";
    this.state.blockConcurrencyWhile(async () => {
      try {
        const session = await this.kv.get("session", {
          allowConcurrency: true
        }) || await env.CODE.get(env.CODE.idFromName("code-main")).fetch(
          "session.json"
        ).then((x) => x.json());
        if (!session)
          throw Error("cant get the starter session");
        this.head = await this.kv.get("head") || 0;
        if (Number(this.head + 50) !== 50 + this.head)
          this.head = 0;
        this.address = await this.kv.get("address", { allowConcurrency: true }) || "";
        this.sess = session;
        this.codeSpace = session.codeSpace || "";
        if (this.sess.codeSpace) {
          this.session = bu2(
            this.codeSpace,
            { state: session, name: this.user }
          );
        }
        this.sessionStarted = false;
      } catch {
        throw Error("cant get the starter session");
      }
    });
  }
  state;
  kv;
  codeSpace;
  sess;
  sessionStarted;
  session = null;
  user = Qt2(self.crypto.randomUUID());
  address;
  users = new AVLTree(
    (a, b3) => a === b3 ? 0 : a < b3 ? 1 : -1,
    true
  );
  head = 0;
  waiting = [];
  sessions;
  i = 0;
  syncKV(oldSession, newSess, message) {
    return (async () => await da2(
      async (key, v) => await this.kv.put(key, v, {
        allowConcurrency: true,
        allowUnconfirmed: true
      }),
      async (key) => await this.kv.get(key, { allowConcurrency: true }),
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
    if (!this.codeSpace) {
      this.codeSpace = url.searchParams.get("room") || "code-main";
      this.codeSpace = url.searchParams.get("room") || "code-main";
      this.sess.codeSpace = this.codeSpace;
      await this.kv.put("session", this.sess, { allowConcurrency: true });
      this.session = bu2(
        this.codeSpace,
        { state: this.sess, name: this.codeSpace }
      );
      this.sessionStarted = true;
    }
    if (this.head === 0) {
      const sess = mu2(this.codeSpace);
      this.head = Eu2(sess);
      await this.kv.put("head", this.head);
      await this.kv.put(String(this.head), sess);
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
              const oldState = mu2(this.codeSpace);
              const newState = mu2(this.codeSpace, patch);
              const oldHash = Eu2(oldState);
              const newHash = Eu2(newState);
              if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
                console.error({ mess, calculated: { oldHash, newHash } });
                throw "Error - we messed up the hashStores";
              }
              this.sess = newState;
              t;
              this.session = bu2(
                this.codeSpace,
                { state: newState, name: this.user }
              );
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
      } catch (e3) {
        return new Response(JSON.stringify({ success: false, error: { e: e3 } }), {
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
      const { code, css, html, i: i3 } = mu2(this.codeSpace);
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
              content_hash: Qt2(code),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "index.trans.js": {
          const trp = await initAndTransform(
            mu2(this.codeSpace).code,
            {},
            url.origin
          );
          return new Response(trp, {
            status: 200,
            headers: {
              "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: Qt2(trp),
              "Content-Type": "application/javascript; charset=UTF-8"
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
                  content_hash: Qt2(session),
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
          const body = Je2(mu2(this.codeSpace));
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: Qt2(body),
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
        case "index.mjs":
        case "index.js":
        case "js": {
          const i4 = path[1] || mu2(this.codeSpace).i;
          if (i4 > mu2(this.codeSpace).i) {
            const trp2 = await initAndTransform(
              mu2(this.codeSpace).code,
              {},
              url.origin
            );
            return new Response(trp2, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                content_hash: Qt2(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          if (i4 < mu2(this.codeSpace).i) {
            const trp2 = await initAndTransform(
              mu2(this.codeSpace).code,
              {},
              url.origin
            );
            return new Response(trp2, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${this.codeSpace}/index.mjs/${mu2(this.codeSpace).i}`,
                "Cache-Control": "no-cache",
                content_hash: Qt2(trp2),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          const trp = await initAndTransform(
            mu2(this.codeSpace).code,
            {},
            url.origin
          );
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: Qt2(trp),
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
          const hashCode = String(Number(path[1]));
          const patch = await this.kv.get(
            hashCode,
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
          const respText = ra2.replace(
            "/**reset*/",
            ia2
          ).replace(
            `<div id="root"></div>`,
            `<div id="root" style="height: 100%;">
                  <div id="${this.codeSpace}-css" data-i="${i3}" style="height: 100%;">
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
          headers.set("content_hash", Qt2(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "prerender": {
          const respText = ra2.replace(
            "/**reset*/",
            ia2
          ).replace(
            `<div id="root"></div>`,
            `   
          <div id="root"></div>
          <script type="module">
          import App from "${url.origin}/live/${this.codeSpace}/index.js?i=${mu2(this.codeSpace).i}"
              
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
          headers.set("content_hash", Qt2(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iframe": {
          const respText = ra2.replace(
            "/**reset*/",
            ia2
          ).replace(
            `<div id="root"></div>`,
            `
              <div id="root" data-i="${i3}" style="height: 100%;">

              <style>${css}</style>
              <div id="${this.codeSpace}-css" style="height: 100%;">
                ${html}
              </div>
              </div>
              <script type="module">

              import {render} from "${url.origin}/src/render.mjs";
              
              import App from "${url.origin}/live/${this.codeSpace}/index.js?i=${mu2(this.codeSpace).i}";

              const rootEl = document.getElementById("${this.codeSpace}-css");
              
              render(rootEl, App, "${this.codeSpace}");          
          
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
          headers.set("content_hash", Qt2(respText));
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
    };
    this.sessions.push(session);
    this.sessions = this.sessions.filter((x) => !x.quit);
    const users = this.sessions.filter((x) => x.name).map((x) => x.name);
    webSocket.send(
      JSON.stringify({
        hashCode: Fr2(this.codeSpace),
        i: mu2(this.codeSpace).i,
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
      this.sessions.filter((x) => x.name === data.name).map((x) => x.quit = true);
      session.name = name;
    }
    if (data.type == "handshake") {
      const HEAD = Fr2(this.codeSpace);
      const commit = data.hashCode;
      while (commit && commit !== HEAD) {
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
          const oldSession = mu2(this.codeSpace);
          const newSess = mu2(this.codeSpace, data.patch);
          if (Fr2(this.codeSpace) !== data.oldHash) {
            return respondWith({
              error: `old hashes not matching`
            });
          }
          try {
            Su2(
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
            await this.syncKV(oldSession, newSess, {
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
            hashCode: Fr2(this.codeSpace)
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
    this.sessions.filter((session) => session.name === to).map((s) => {
      try {
        s.webSocket.send(message);
      } catch {
        console.error("p2p error");
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
var src_default = chat_default;
export {
  Code,
  CodeRateLimiter,
  r2bucket_default as R2,
  Users,
  src_default as default
};
