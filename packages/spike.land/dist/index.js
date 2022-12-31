var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod2) => function __require3() {
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

// ../../node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "../../node_modules/mime/Mime.js"(exports, module) {
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
    "**/*"
  ],
  exports: {
    "./package.json": "./package.json",
    "./src/starter.ts": "./src/starter.ts",
    "./src/rtc.ts": "./src/rtc.ts",
    "./src/session": {
      import: "./dist/session.mjs",
      node: "./dist/session.js"
    },
    "./src/textDiff": "./src/textDiff.ts",
    "./src/esbuildEsm": "./src/esbuildEsm.ts",
    "./src/binary": "./src/binary.ts",
    "./src/importmap.json": "./src/importmap.json",
    "./src/mockedMap.json": "./src/mockedMap.json"
  },
  scripts: {
    test: "esbuild --bundle tests/* --platform=node --external:uvu --external:uvu/  --external:esbuild-wasm  --external:esbuild-wasm/  --external:memfs  --format=esm   --loader:.html=text --outdir=testsJs && yarn uvu testsJs && rm -rf testsJs",
    typecheck: "yarn tsc",
    clean: "rm -rf .tsBuildInfo src/vendor dist src/monaco-workers && yarn favicons",
    "build:sw": "esbuild --outfile=../packages/.spike.land/public/sw.js --platform=browser --bundle --minify ./src/sw.js && yarn sw",
    start: "cd ../../.. && yarn start",
    push: "cd ../../.. && yarn push",
    "build:preact": "esbuild --bundle src/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:orbit-db": "esbuild --bundle src/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=./dist//react.mjs",
    "build:framer-motion": 'yarn esbuild --bundle src/motion.tsx  --target=esnext --minify --format=esm  --platform=browser  --define:process.env.NODE_ENV=\\"production\\" --external:react --external:@emotion/is-prop-valid  --external:react --outfile=./dist/framer-motion.mjs',
    prebuild: "yarn test || echo FAILED",
    build: "rm -rf dist src/monaco-workers && yarn favicons && yarn es:build",
    "es:build": "yarn test && node esbuild-dev.mjs",
    favicons: "cp -af src/assets/ ./dist && mkdir -p  ./dist/assets && cp src/assets/synthwave.webp   ./dist/assets/",
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
    "@isomorphic-git/lightning-fs": "^4.6.0",
    "@mui/material": "5.11.2",
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
    "esbuild-wasm": "0.16.12",
    "events-browserify": "^0.0.1",
    "fast-diff": "1.2.0",
    "framer-motion": "8.0.2",
    immutable: "^4.2.1",
    "is-callable": "1.2.7",
    localforage: "^1.10.0",
    logrocket: "^3.0.1",
    memfs: "^3.4.12",
    module: "^1.2.5",
    "monaco-editor": "0.35.0-dev.20221230",
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
    "@libp2p/interfaces": "3.1.0",
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
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "@yarnpkg/sdks": "3.0.0-rc.34",
    esbuild: "0.16.12",
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

// ../code/dist/chunk-chunk-JLPTXNJM.mjs
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod2) => function __require22() {
  return mod2 || (0, cb[__getOwnPropNames2(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod2, isNodeMode, target) => (target = mod2 != null ? __create2(__getProtoOf2(mod2)) : {}, __copyProps2(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp2(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = { version: "v19.3.0", versions: { node: "v19.3.0" }, env: { NODE_ENV: "development", version: "v19.3.0", browser: true, isWebworker: true, NODE_DEBUG: false, DEBUG: false, isBrowser: true, versions: { node: "v19.3.0" } }, browser: true };
  }
});

// ../code/dist/chunk-chunk-TZJEAKGX.mjs
var require_diff = __commonJS2({
  "../../node_modules/fast-diff/diff.js"(exports, module) {
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
var require_browser = __commonJS2({
  "../../node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
    init_define_process();
    ((module2) => {
      "use strict";
      var __defProp3 = Object.defineProperty;
      var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp3 = Object.prototype.hasOwnProperty;
      var __export = /* @__PURE__ */ __name((target, all) => {
        for (var name in all)
          __defProp3(target, name, { get: all[name], enumerable: true });
      }, "__export");
      var __copyProps3 = /* @__PURE__ */ __name((to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp3.call(to, key) && key !== except)
              __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
        }
        return to;
      }, "__copyProps");
      var __toCommonJS = /* @__PURE__ */ __name((mod2) => __copyProps3(__defProp3({}, "__esModule", { value: true }), mod2), "__toCommonJS");
      var __async = /* @__PURE__ */ __name((__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }, "fulfilled");
          var rejected = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          }, "rejected");
          var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
          step((generator = generator.apply(__this, __arguments)).next());
        });
      }, "__async");
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
        let visit = /* @__PURE__ */ __name((value) => {
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
        }, "visit");
        let bb = new ByteBuffer();
        bb.write32(0);
        bb.write32(packet.id << 1 | +!packet.isRequest);
        visit(packet.value);
        writeUInt32LE(bb.buf, bb.len - 4, 0);
        return bb.buf.subarray(0, bb.len);
      }
      __name(encodePacket, "encodePacket");
      function decodePacket(bytes) {
        let visit = /* @__PURE__ */ __name(() => {
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
        }, "visit");
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
      __name(decodePacket, "decodePacket");
      var ByteBuffer = /* @__PURE__ */ __name(class {
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
      }, "ByteBuffer");
      var encodeUTF8;
      var decodeUTF8;
      var encodeInvariant;
      if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
        let encoder = new TextEncoder();
        let decoder = new TextDecoder();
        encodeUTF8 = /* @__PURE__ */ __name((text) => encoder.encode(text), "encodeUTF8");
        decodeUTF8 = /* @__PURE__ */ __name((bytes) => decoder.decode(bytes), "decodeUTF8");
        encodeInvariant = 'new TextEncoder().encode("")';
      } else if (typeof Buffer !== "undefined") {
        encodeUTF8 = /* @__PURE__ */ __name((text) => Buffer.from(text), "encodeUTF8");
        decodeUTF8 = /* @__PURE__ */ __name((bytes) => {
          let { buffer, byteOffset, byteLength } = bytes;
          return Buffer.from(buffer, byteOffset, byteLength).toString();
        }, "decodeUTF8");
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
      __name(readUInt32LE, "readUInt32LE");
      function writeUInt32LE(buffer, value, offset) {
        buffer[offset++] = value;
        buffer[offset++] = value >> 8;
        buffer[offset++] = value >> 16;
        buffer[offset++] = value >> 24;
      }
      __name(writeUInt32LE, "writeUInt32LE");
      var quote = JSON.stringify;
      var buildLogLevelDefault = "warning";
      var transformLogLevelDefault = "silent";
      function validateTarget(target) {
        validateStringValue(target, "target");
        if (target.indexOf(",") >= 0)
          throw new Error(`Invalid target: ${target}`);
        return target;
      }
      __name(validateTarget, "validateTarget");
      var canBeAnything = /* @__PURE__ */ __name(() => null, "canBeAnything");
      var mustBeBoolean = /* @__PURE__ */ __name((value) => typeof value === "boolean" ? null : "a boolean", "mustBeBoolean");
      var mustBeBooleanOrObject = /* @__PURE__ */ __name((value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object", "mustBeBooleanOrObject");
      var mustBeString = /* @__PURE__ */ __name((value) => typeof value === "string" ? null : "a string", "mustBeString");
      var mustBeRegExp = /* @__PURE__ */ __name((value) => value instanceof RegExp ? null : "a RegExp object", "mustBeRegExp");
      var mustBeInteger = /* @__PURE__ */ __name((value) => typeof value === "number" && value === (value | 0) ? null : "an integer", "mustBeInteger");
      var mustBeFunction = /* @__PURE__ */ __name((value) => typeof value === "function" ? null : "a function", "mustBeFunction");
      var mustBeArray = /* @__PURE__ */ __name((value) => Array.isArray(value) ? null : "an array", "mustBeArray");
      var mustBeObject = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object", "mustBeObject");
      var mustBeWebAssemblyModule = /* @__PURE__ */ __name((value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule");
      var mustBeArrayOrRecord = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null ? null : "an array or an object", "mustBeArrayOrRecord");
      var mustBeObjectOrNull = /* @__PURE__ */ __name((value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null", "mustBeObjectOrNull");
      var mustBeStringOrBoolean = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean");
      var mustBeStringOrObject = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object", "mustBeStringOrObject");
      var mustBeStringOrArray = /* @__PURE__ */ __name((value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array", "mustBeStringOrArray");
      var mustBeStringOrUint8Array = /* @__PURE__ */ __name((value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array");
      var mustBeStringOrURL = /* @__PURE__ */ __name((value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
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
      __name(getFlag, "getFlag");
      function checkForInvalidFlags(object, keys2, where) {
        for (let key in object) {
          if (!(key in keys2)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
          }
        }
      }
      __name(checkForInvalidFlags, "checkForInvalidFlags");
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
      __name(validateInitializeOptions, "validateInitializeOptions");
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
      __name(validateMangleCache, "validateMangleCache");
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
      __name(pushLogFlags, "pushLogFlags");
      function validateStringValue(value, what, key) {
        if (typeof value !== "string") {
          throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
        }
        return value;
      }
      __name(validateStringValue, "validateStringValue");
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
        let define2 = getFlag(options, keys2, "define", mustBeObject);
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
        if (define2) {
          for (let key in define2) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${validateStringValue(define2[key], "define", key)}`);
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
      __name(pushCommonFlags, "pushCommonFlags");
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
      __name(flagsForBuildOptions, "flagsForBuildOptions");
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
      __name(flagsForTransformOptions, "flagsForTransformOptions");
      function createChannel(streamIn) {
        const requestCallbacksByKey = {};
        const closeData = { didClose: false, reason: "" };
        let responseCallbacks = {};
        let nextRequestID = 0;
        let nextBuildKey = 0;
        let stdout = new Uint8Array(16 * 1024);
        let stdoutUsed = 0;
        let readFromStdout = /* @__PURE__ */ __name((chunk) => {
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
        }, "readFromStdout");
        let afterClose = /* @__PURE__ */ __name((error) => {
          closeData.didClose = true;
          if (error)
            closeData.reason = ": " + (error.message || error);
          const text = "The service was stopped" + closeData.reason;
          for (let id in responseCallbacks) {
            responseCallbacks[id](text, null);
          }
          responseCallbacks = {};
        }, "afterClose");
        let sendRequest = /* @__PURE__ */ __name((refs, value, callback) => {
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
        }, "sendRequest");
        let sendResponse = /* @__PURE__ */ __name((id, value) => {
          if (closeData.didClose)
            throw new Error("The service is no longer running" + closeData.reason);
          streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
        }, "sendResponse");
        let handleRequest = /* @__PURE__ */ __name((id, request) => __async(this, null, function* () {
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
        }), "handleRequest");
        let isFirstPacket = true;
        let handleIncomingPacket = /* @__PURE__ */ __name((bytes) => {
          if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.16.12") {
              throw new Error(`Cannot start service: Host version "${"0.16.12"}" does not match binary version ${quote(binaryVersion)}`);
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
        }, "handleIncomingPacket");
        let buildOrServe = /* @__PURE__ */ __name(({ callName, refs, serveOptions, options, isTTY, defaultWD, callback }) => {
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
        }, "buildOrServe");
        let transform22 = /* @__PURE__ */ __name(({ callName, refs, input, options, isTTY, fs, callback }) => {
          const details = createObjectStash();
          let start = /* @__PURE__ */ __name((inputPath) => {
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
                let next = /* @__PURE__ */ __name(() => {
                  if (--outstanding === 0) {
                    let result = { warnings, code: response.code, map: response.map };
                    if ("legalComments" in response)
                      result.legalComments = response == null ? void 0 : response.legalComments;
                    if (response.mangleCache)
                      result.mangleCache = response == null ? void 0 : response.mangleCache;
                    callback(null, result);
                  }
                }, "next");
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
          }, "start");
          if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = /* @__PURE__ */ __name(() => fs.writeFile(input, next), "start");
          }
          start(null);
        }, "transform2");
        let formatMessages2 = /* @__PURE__ */ __name(({ callName, refs, messages, options, callback }) => {
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
        }, "formatMessages2");
        let analyzeMetafile2 = /* @__PURE__ */ __name(({ callName, refs, metafile, options, callback }) => {
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
        }, "analyzeMetafile2");
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
      __name(createChannel, "createChannel");
      function buildOrServeImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, serveOptions, isTTY, defaultWD, closeData, callback) {
        const details = createObjectStash();
        const logPluginError = /* @__PURE__ */ __name((e, pluginName, note, done) => {
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
        }, "logPluginError");
        const handleError = /* @__PURE__ */ __name((e, pluginName) => {
          logPluginError(e, pluginName, void 0, (error) => {
            callback(failureErrorWithLog("Build failed", [error], []), null);
          });
        }, "handleError");
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
          let copyResponseToResult = /* @__PURE__ */ __name((response, result) => {
            if (response.outputFiles)
              result.outputFiles = response.outputFiles.map(convertOutputFiles);
            if (response.metafile)
              result.metafile = JSON.parse(response.metafile);
            if (response.mangleCache)
              result.mangleCache = response.mangleCache;
            if (response.writeToStdout !== void 0)
              console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
          }, "copyResponseToResult");
          let buildResponseToResult = /* @__PURE__ */ __name((response, callback2) => {
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
                  rebuild = /* @__PURE__ */ __name(() => new Promise((resolve, reject) => {
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
                  }), "rebuild");
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
                  stop = /* @__PURE__ */ __name(() => {
                    if (isStopped)
                      return;
                    isStopped = true;
                    delete requestCallbacks["watch-rebuild"];
                    sendRequest(refs, { command: "watch-stop", key: buildKey }, () => {
                    });
                    refs.unref();
                  }, "stop");
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
          }, "buildResponseToResult");
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
        __name(buildOrServeContinue, "buildOrServeContinue");
      }
      __name(buildOrServeImpl, "buildOrServeImpl");
      var buildServeData = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, requestCallbacks, options, request) => {
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
      }, "buildServeData");
      var handlePlugins = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => __async(void 0, null, function* () {
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
            let resolve = /* @__PURE__ */ __name((path, options = {}) => {
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
            }, "resolve");
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
        let runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => done(), "runOnEndCallbacks");
        if (onEndCallbacks.length > 0) {
          runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => {
            (() => __async(void 0, null, function* () {
              for (const { name, callback, note } of onEndCallbacks) {
                try {
                  yield callback(result);
                } catch (e) {
                  result.errors.push(yield new Promise((resolve) => logPluginError(e, name, note && note(), resolve)));
                }
              }
            }))().then(done);
          }, "runOnEndCallbacks");
        }
        isSetupDone = true;
        return {
          ok: true,
          requestPlugins,
          runOnEndCallbacks
        };
      }), "handlePlugins");
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
      __name(createObjectStash, "createObjectStash");
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
      __name(extractCallerV8, "extractCallerV8");
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
      __name(extractErrorMessageV8, "extractErrorMessageV8");
      function parseStackLinesV8(streamIn, lines, ident) {
        let at = "    at ";
        if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
          for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
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
      __name(parseStackLinesV8, "parseStackLinesV8");
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
      __name(failureErrorWithLog, "failureErrorWithLog");
      function replaceDetailsInMessages(messages, stash) {
        for (const message of messages) {
          message.detail = stash.load(message.detail);
        }
        return messages;
      }
      __name(replaceDetailsInMessages, "replaceDetailsInMessages");
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
      __name(sanitizeLocation, "sanitizeLocation");
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
      __name(sanitizeMessages, "sanitizeMessages");
      function sanitizeStringArray(values2, property) {
        const result = [];
        for (const value of values2) {
          if (typeof value !== "string")
            throw new Error(`${quote(property)} must be an array of strings`);
          result.push(value);
        }
        return result;
      }
      __name(sanitizeStringArray, "sanitizeStringArray");
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
      __name(convertOutputFiles, "convertOutputFiles");
      var version = "0.16.12";
      var build = /* @__PURE__ */ __name((options) => ensureServiceIsRunning().build(options), "build");
      var serve = /* @__PURE__ */ __name(() => {
        throw new Error(`The "serve" API only works in node`);
      }, "serve");
      var transform2 = /* @__PURE__ */ __name((input, options) => ensureServiceIsRunning().transform(input, options), "transform");
      var formatMessages = /* @__PURE__ */ __name((messages, options) => ensureServiceIsRunning().formatMessages(messages, options), "formatMessages");
      var analyzeMetafile = /* @__PURE__ */ __name((metafile, options) => ensureServiceIsRunning().analyzeMetafile(metafile, options), "analyzeMetafile");
      var buildSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "buildSync" API only works in node`);
      }, "buildSync");
      var transformSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "transformSync" API only works in node`);
      }, "transformSync");
      var formatMessagesSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "formatMessagesSync" API only works in node`);
      }, "formatMessagesSync");
      var analyzeMetafileSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "analyzeMetafileSync" API only works in node`);
      }, "analyzeMetafileSync");
      var initializePromise;
      var longLivedService;
      var ensureServiceIsRunning = /* @__PURE__ */ __name(() => {
        if (longLivedService)
          return longLivedService;
        if (initializePromise)
          throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
        throw new Error('You need to call "initialize" before calling this');
      }, "ensureServiceIsRunning");
      var initialize2 = /* @__PURE__ */ __name((options) => {
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
      }, "initialize");
      var startRunningService = /* @__PURE__ */ __name((wasmURL, wasmModule, useWorker) => __async(void 0, null, function* () {
        let worker;
        if (useWorker) {
          let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.16.12"}`];\n        tryToInstantiateModule(wasm, go).then(\n          (instance) => {\n            postMessage(null);\n            go.run(instance);\n          },\n          (error) => {\n            postMessage(error);\n          }\n        );\n      };\n      function tryToInstantiateModule(wasm, go) {\n        return __async(this, null, function* () {\n          if (wasm instanceof WebAssembly.Module) {\n            return WebAssembly.instantiate(wasm, go.importObject);\n          }\n          const res = yield fetch(wasm);\n          if (!res.ok)\n            throw new Error(`Failed to download ${JSON.stringify(wasm)}`);\n          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {\n            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);\n            return result2.instance;\n          }\n          const bytes = yield res.arrayBuffer();\n          const result = yield WebAssembly.instantiate(bytes, go.importObject);\n          return result.instance;\n        });\n      }\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
          worker = new Worker(URL.createObjectURL(blob));
        } else {
          let onmessage = ((postMessage) => {
            var __async2 = /* @__PURE__ */ __name((__this, __arguments, generator) => {
              return new Promise((resolve, reject) => {
                var fulfilled = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.next(value));
                  } catch (e) {
                    reject(e);
                  }
                }, "fulfilled");
                var rejected = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.throw(value));
                  } catch (e) {
                    reject(e);
                  }
                }, "rejected");
                var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
                step((generator = generator.apply(__this, __arguments)).next());
              });
            }, "__async");
            let onmessage2;
            let globalThis2 = {};
            for (let o = self; o; o = Object.getPrototypeOf(o))
              for (let k of Object.getOwnPropertyNames(o))
                if (!(k in globalThis2))
                  Object.defineProperty(globalThis2, k, { get: () => self[k] });
            "use strict";
            (() => {
              const enosys = /* @__PURE__ */ __name(() => {
                const err = new Error("not implemented");
                err.code = "ENOSYS";
                return err;
              }, "enosys");
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
                  const setInt64 = /* @__PURE__ */ __name((addr, v) => {
                    this.mem.setUint32(addr + 0, v, true);
                    this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
                  }, "setInt64");
                  const getInt64 = /* @__PURE__ */ __name((addr) => {
                    const low = this.mem.getUint32(addr + 0, true);
                    const high = this.mem.getInt32(addr + 4, true);
                    return low + high * 4294967296;
                  }, "getInt64");
                  const loadValue = /* @__PURE__ */ __name((addr) => {
                    const f = this.mem.getFloat64(addr, true);
                    if (f === 0) {
                      return void 0;
                    }
                    if (!isNaN(f)) {
                      return f;
                    }
                    const id = this.mem.getUint32(addr, true);
                    return this._values[id];
                  }, "loadValue");
                  const storeValue = /* @__PURE__ */ __name((addr, v) => {
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
                  }, "storeValue");
                  const loadSlice = /* @__PURE__ */ __name((addr) => {
                    const array = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    return new Uint8Array(this._inst.exports.mem.buffer, array, len);
                  }, "loadSlice");
                  const loadSliceOfValues = /* @__PURE__ */ __name((addr) => {
                    const array = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    const a = new Array(len);
                    for (let i = 0; i < len; i++) {
                      a[i] = loadValue(array + i * 8);
                    }
                    return a;
                  }, "loadSliceOfValues");
                  const loadString = /* @__PURE__ */ __name((addr) => {
                    const saddr = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
                  }, "loadString");
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
                        const p2 = getInt64(sp + 16);
                        const n = this.mem.getInt32(sp + 24, true);
                        globalThis2.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p2, n));
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
                    const strPtr = /* @__PURE__ */ __name((str) => {
                      const ptr = offset;
                      const bytes = encoder.encode(str + "\0");
                      new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                      offset += bytes.length;
                      if (offset % 8 !== 0) {
                        offset += 8 - offset % 8;
                      }
                      return ptr;
                    }, "strPtr");
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
            onmessage2 = /* @__PURE__ */ __name(({ data: wasm }) => {
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
              onmessage2 = /* @__PURE__ */ __name(({ data }) => {
                if (data.length > 0) {
                  stdin.push(data);
                  if (resumeStdin)
                    resumeStdin();
                }
              }, "onmessage");
              fs.read = (fd, buffer, offset, length, position, callback) => {
                if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
                  throw new Error("Bad read");
                }
                if (stdin.length === 0) {
                  resumeStdin = /* @__PURE__ */ __name(() => fs.read(fd, buffer, offset, length, position, callback), "resumeStdin");
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
              go.argv = ["", `--service=${"0.16.12"}`];
              tryToInstantiateModule(wasm, go).then(
                (instance) => {
                  postMessage(null);
                  go.run(instance);
                },
                (error) => {
                  postMessage(error);
                }
              );
            }, "onmessage");
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
            __name(tryToInstantiateModule, "tryToInstantiateModule");
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
      }), "startRunningService");
      var browser_default = browser_exports;
    })(typeof module === "object" ? module : { set exports(x) {
      (typeof self !== "undefined" ? self : this).esbuild = x;
    } });
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
  var groups = Map2().asMutable();
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
__name(groupByFactory, "groupByFactory");
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
__name(partitionFactory, "partitionFactory");
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
  __name(Map3, "Map");
  if (KeyedCollection2)
    Map3.__proto__ = KeyedCollection2;
  Map3.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
  Map3.prototype.constructor = Map3;
  Map3.of = /* @__PURE__ */ __name(function of() {
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
  Map3.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Map {", "}");
  }, "toString");
  Map3.prototype.get = /* @__PURE__ */ __name(function get11(k, notSetValue) {
    return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
  }, "get");
  Map3.prototype.set = /* @__PURE__ */ __name(function set3(k, v) {
    return updateMap(this, k, v);
  }, "set");
  Map3.prototype.remove = /* @__PURE__ */ __name(function remove3(k) {
    return updateMap(this, k, NOT_SET);
  }, "remove");
  Map3.prototype.deleteAll = /* @__PURE__ */ __name(function deleteAll(keys2) {
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
  Map3.prototype.clear = /* @__PURE__ */ __name(function clear2() {
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
  Map3.prototype.sort = /* @__PURE__ */ __name(function sort22(comparator) {
    return OrderedMap(sortFactory(this, comparator));
  }, "sort");
  Map3.prototype.sortBy = /* @__PURE__ */ __name(function sortBy2(mapper, comparator) {
    return OrderedMap(sortFactory(this, comparator, mapper));
  }, "sortBy");
  Map3.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(map3) {
      map3.forEach(function(value, key) {
        map3.set(key, mapper.call(context, value, key, this$1$1));
      });
    });
  }, "map");
  Map3.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return new MapIterator(this, type, reverse3);
  }, "__iterator");
  Map3.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    this._root && this._root.iterate(function(entry) {
      iterations++;
      return fn(entry[1], entry[0], this$1$1);
    }, reverse3);
    return iterations;
  }, "__iterate");
  Map3.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
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
function makeList(origin2, capacity, level, root, tail, ownerID, hash2) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin2;
  list._origin = origin2;
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
  __name(OrderedMap2, "OrderedMap");
  if (Map3)
    OrderedMap2.__proto__ = Map3;
  OrderedMap2.prototype = Object.create(Map3 && Map3.prototype);
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
var Set2 = /* @__PURE__ */ function(SetCollection2) {
  function Set22(value) {
    return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
      var iter = SetCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  __name(Set22, "Set");
  if (SetCollection2)
    Set22.__proto__ = SetCollection2;
  Set22.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
  Set22.prototype.constructor = Set22;
  Set22.of = /* @__PURE__ */ __name(function of() {
    return this(arguments);
  }, "of");
  Set22.fromKeys = /* @__PURE__ */ __name(function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  }, "fromKeys");
  Set22.intersect = /* @__PURE__ */ __name(function intersect(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.intersect.apply(Set22(sets.pop()), sets) : emptySet();
  }, "intersect");
  Set22.union = /* @__PURE__ */ __name(function union(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.union.apply(Set22(sets.pop()), sets) : emptySet();
  }, "union");
  Set22.prototype.toString = /* @__PURE__ */ __name(function toString5() {
    return this.__toString("Set {", "}");
  }, "toString");
  Set22.prototype.has = /* @__PURE__ */ __name(function has5(value) {
    return this._map.has(value);
  }, "has");
  Set22.prototype.add = /* @__PURE__ */ __name(function add(value) {
    return updateSet(this, this._map.set(value, value));
  }, "add");
  Set22.prototype.remove = /* @__PURE__ */ __name(function remove3(value) {
    return updateSet(this, this._map.remove(value));
  }, "remove");
  Set22.prototype.clear = /* @__PURE__ */ __name(function clear2() {
    return updateSet(this, this._map.clear());
  }, "clear");
  Set22.prototype.map = /* @__PURE__ */ __name(function map2(mapper, context) {
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
  Set22.prototype.union = /* @__PURE__ */ __name(function union() {
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
  }, "union");
  Set22.prototype.intersect = /* @__PURE__ */ __name(function intersect() {
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
  Set22.prototype.subtract = /* @__PURE__ */ __name(function subtract() {
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
  Set22.prototype.sort = /* @__PURE__ */ __name(function sort22(comparator) {
    return OrderedSet(sortFactory(this, comparator));
  }, "sort");
  Set22.prototype.sortBy = /* @__PURE__ */ __name(function sortBy2(mapper, comparator) {
    return OrderedSet(sortFactory(this, comparator, mapper));
  }, "sortBy");
  Set22.prototype.wasAltered = /* @__PURE__ */ __name(function wasAltered3() {
    return this._map.wasAltered();
  }, "wasAltered");
  Set22.prototype.__iterate = /* @__PURE__ */ __name(function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._map.__iterate(function(k) {
      return fn(k, k, this$1$1);
    }, reverse3);
  }, "__iterate");
  Set22.prototype.__iterator = /* @__PURE__ */ __name(function __iterator2(type, reverse3) {
    return this._map.__iterator(type, reverse3);
  }, "__iterator");
  Set22.prototype.__ensureOwner = /* @__PURE__ */ __name(function __ensureOwner2(ownerID) {
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
  return Set22;
}(SetCollection);
Set2.isSet = isSet;
var SetPrototype = Set2.prototype;
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
    return Map2(this.toKeyedSeq());
  }, "toMap"),
  toObject,
  toOrderedMap: /* @__PURE__ */ __name(function toOrderedMap() {
    return OrderedMap(this.toKeyedSeq());
  }, "toOrderedMap"),
  toOrderedSet: /* @__PURE__ */ __name(function toOrderedSet() {
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  }, "toOrderedSet"),
  toSet: /* @__PURE__ */ __name(function toSet() {
    return Set2(isKeyed(this) ? this.valueSeq() : this);
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
  partition: /* @__PURE__ */ __name(function partition(predicate, context) {
    return partitionFactory(this, predicate, context);
  }, "partition"),
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
var OrderedSet = /* @__PURE__ */ function(Set22) {
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
  if (Set22)
    OrderedSet2.__proto__ = Set22;
  OrderedSet2.prototype = Object.create(Set22 && Set22.prototype);
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
}(Set2);
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
var src_default = '<!DOCTYPE html>\n<html lang="en">\n\n<head profile="http://www.w3.org/2005/10/profile">\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width" />\n  <meta name="sharedArrayBuffer" description="using cross-origin-isolation in the web browser">\n  <base href="/">\n  <link rel="shortcut icon" type="image/png" href="/favicons/chunk-chunk-fe2f7da4f9ccc2.png">\n  <title>Instant React Editor</title>\n\n  <script type="importmap"><\/script>\n  <style>\n    html,\n    body {\n      overflow: hidden;\n      margin: 0;\n      height: 100%;\n      --webkit-overflow-scrolling: touch;\n      overscroll-behavior-x: none;\n    }\n\n    q {\n      display: none;\n    }\n\n\n    @media screen and (prefers-color-scheme: dark) {\n      body {\n        background-color: #121212;\n        ;\n        color: hsl(210, 10%, 62%);\n        --text-color-normal: hsl(210, 10%, 62%);\n        --text-color-light: hsl(210, 15%, 35%);\n        --text-color-richer: hsl(210, 50%, 72%);\n        --text-color-highlight: hsl(25, 70%, 45%);\n      }\n    }\n\n\n    @media screen and (prefers-color-scheme: light) {\n      body {\n        background-color: white;\n        color: black;\n        --text-color-normal: #0a244d;\n        --text-color-light: #8cabd9;\n      }\n    }\n\n    /**reset*/\n  </style>\n</head>\n\n\n<body>\n  <div id="root"></div>\n  <!-- <script type="module">\n    import LogRocket from "/logrocket";\n\n    LogRocket.init("7bmflb/spikeland");\n  <\/script> -->\n\n</body>\n\n</html>';
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
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "framer-motion": "/motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/cache": "/emotionCache.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    react: "/reactMod.mjs",
    "react-dom": "/reactDom.mjs",
    "react-error-boundary": "/reactMod.mjs",
    "hydrate.mjs": "/hydrate.mjs"
  }
};
var importMapImports = importmap_default.imports;
function importMapReplace(codeInp, origin2, relativeUrl, importmapRep = true) {
  let returnStr = replaceAll(codeInp, `from"`, `from "`);
  const items = Object.keys(
    importMapImports
  );
  items.map((lib) => {
    const uri = new URL(importMapImports[lib], origin2).toString();
    if (importmapRep) {
      returnStr = replaceAll(returnStr, ` from "${lib}"`, ` from "${uri}"`);
    }
    returnStr = replaceAll(returnStr, ` from "/`, ` from "${origin2}/`);
  });
  returnStr.split("/::").join(origin2);
  if (!returnStr)
    return returnStr;
  const url = relativeUrl || origin2;
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
  let oldUrl;
  returnStr = returnStr.split(";").map((x) => x.indexOf("import") !== -1 ? x.trim() : x).map(
    (Y) => Y.split("\n").map((x) => {
      if (x.length === 0 || x.indexOf("import") === -1)
        return x;
      if (x.startsWith("import") && x.indexOf(`"`) !== -1 && x.indexOf(`https://`) === -1 && x.indexOf(origin2) === -1) {
        const slices = x.split(`"`);
        slices[1] = origin2 + "/" + slices[1] + "?dev&format=es2022";
        return slices.join(`"`);
      }
      if (x.indexOf("/node_process.js") !== -1 || x.indexOf("/node_buffer.js") !== -1 || x.indexOf("@babel/runtime") !== -1) {
        const slices = x.split(`"`);
        try {
          oldUrl = new URL(slices[1]);
          slices[1] = origin2 + "/npm:" + oldUrl.pathname;
        } catch {
          console.error("URL ERR", slices[1]);
        }
        return slices.join(`"`);
      }
      if (x.indexOf("/npm:/") === -1 && x.startsWith("import")) {
        const slices = x.split(`"`);
        try {
          oldUrl = new URL(slices[1], origin2);
          if (oldUrl && oldUrl.pathname.indexOf(".") === -1 && oldUrl.pathname.indexOf("/live/") !== -1) {
            slices[1] = oldUrl.toString() + "/index.js";
          }
        } catch {
          console.error("URL ERR", slices[1]);
        }
        return slices.join(`"`);
      }
      return x;
    }).join("\n")
  ).join(";");
  returnStr = returnStr.split("/npm:/npm:").join("/npm:");
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
init_define_process();
init_define_process();
var import_esbuild_wasm = __toESM2(require_browser(), 1);
init_define_process();
init_define_process();
var mod = {
  init: false,
  initialize: (origin2) => {
    if (mod.init !== false)
      return mod.init;
    return fetch(`${origin2}/files.json`).then((f) => f.json()).then(
      (k) => {
        const wasmURL = new URL(
          Object.keys(k).find((i) => i.indexOf(".wasm") !== -1 && i.indexOf("esbuild") !== -1),
          origin2
        ).toString();
        mod.init = (0, import_esbuild_wasm.initialize)({
          wasmURL
        }).then(() => mod.init = true);
        return mod.init;
      }
    );
  }
};
var initAndTransform = /* @__PURE__ */ __name(async (code, opts, origin2) => {
  const initFinished = mod.initialize(origin2);
  if (initFinished !== true)
    await initFinished;
  const ttCode = importMapReplace(
    (await (0, import_esbuild_wasm.transform)(code, {
      ...opts,
      define: { ...define, ...opts?.define ? opts.define : {} }
    })).code,
    origin2,
    origin2
  );
  const res = { code: `/*${md5(code)}*/` + ttCode };
  return res;
}, "initAndTransform");
var define = {
  "process.env.NODE_ENV": `"development"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(true),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": '"1.1.1"',
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  process: JSON.stringify({
    env: {
      NODE_ENV: `development`,
      browser: true,
      NODE_DEBUG: false,
      DEBUG: true,
      isBrowser: true
    },
    browser: true
  })
};
async function esmTransform(code, origin2) {
  const transpiled = await initAndTransform(code, {
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
  }, origin2);
  return transpiled.code;
}
__name(esmTransform, "esmTransform");
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
var sessions = {};
var hashStore = {};
var CodeSession = class {
  constructor(codeSpace, user) {
    this.cb = {};
    this.hashCodeSession = 0;
    this.created = new Date().toISOString();
    this.hashOfState = () => {
      const state = this.session.get("state");
      const hashCode4 = md5(state.transpiled);
      hashStore[hashCode4] = state;
      return hashCode4;
    };
    this.createPatchFromHashCode = (oldHash, state) => {
      const s = JSON.parse(string_(state));
      hashStore[md5(this.session.get("state").transpiled)] = this.session.get(
        "state"
      );
      let oldRec = hashStore[oldHash];
      let usedOldHash = oldHash;
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
        codeSpace: newRec.get("codeSpace"),
        reversePatch,
        patch
      };
    };
    this.patchSync = (sess, force = false) => {
      if (!force) {
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
      }
      const oldHash = md5(this.session.get("state").transpiled);
      this.session = this.session.set(
        "state",
        this.session.get("state").merge(sess)
      );
      const newHash = md5(this.session.get("state").transpiled);
      if (newHash !== oldHash) {
        queueMicrotask(() => {
          this.createPatchFromHashCode(oldHash, mST(this.room));
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
      hashStore[hashCode3(this.room)] = this.session.get("state");
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
    sessions[codeSpace] = this;
    this.room = codeSpace;
    const savedState = null;
    this.session = initSession(codeSpace, {
      ...user,
      state: savedState ? savedState : JSON.parse(string_({ ...user.state, codeSpace }))
    })();
    hashStore[md5(user.state.transpiled)] = this.session.get("state");
  }
  update() {
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
var hashCode3 = /* @__PURE__ */ __name((codeSpace) => md5(mST(codeSpace).transpiled), "hashCode");
function mST(codeSpace, p2) {
  const sessAsJs = sessions[codeSpace].session.get("state").toJSON();
  const { i, transpiled, code, html, css } = p2 ? JSON.parse(
    applyPatch(
      string_(
        sessAsJs
      ),
      p2
    )
  ) : sessAsJs;
  return { i, transpiled, code, html, css, codeSpace };
}
__name(mST, "mST");
function string_(s) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}
__name(string_, "string_");
var makePatchFrom = /* @__PURE__ */ __name((n, st) => sessions[st.codeSpace].createPatchFromHashCode(n, st), "makePatchFrom");
var startSession = /* @__PURE__ */ __name((codeSpace, u) => sessions[codeSpace] || (sessions[codeSpace] = new CodeSession(codeSpace, {
  name: u.name,
  state: { ...u.state, codeSpace }
})), "startSession");
function createPatch(oldCode, newCode) {
  return createDelta(oldCode, newCode);
}
__name(createPatch, "createPatch");

// ../code/dist/chunk-chunk-6MQOVGCJ.mjs
var require_just_once = __commonJS2({
  "../../node_modules/just-once/index.js"(exports, module) {
    init_define_process();
    module.exports = once;
    function once(fn) {
      var called, value;
      if (typeof fn !== "function") {
        throw new Error("expected a function but got " + fn);
      }
      return /* @__PURE__ */ __name(function wrap() {
        if (called) {
          return value;
        }
        called = true;
        value = fn.apply(this, arguments);
        return value;
      }, "wrap");
    }
    __name(once, "once");
  }
});
var require_text_min = __commonJS2({
  "../../node_modules/fast-text-encoding/text.min.js"(exports) {
    init_define_process();
    (function(scope) {
      "use strict";
      function B(r, e) {
        var f;
        return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
      }
      __name(B, "B");
      var w = /* @__PURE__ */ __name(function(r) {
        return Buffer.from(r);
      }, "w");
      function h(r) {
        for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0; ; ) {
          var t = e < r.length;
          if (!t || o >= f - 1) {
            var s = n.subarray(0, o), m = s;
            if (i.push(String.fromCharCode.apply(null, m)), !t)
              return i.join("");
            r = r.subarray(e), e = 0, o = 0;
          }
          var a = r[e++];
          if ((a & 128) === 0)
            n[o++] = a;
          else if ((a & 224) === 192) {
            var d = r[e++] & 63;
            n[o++] = (a & 31) << 6 | d;
          } else if ((a & 240) === 224) {
            var d = r[e++] & 63, l = r[e++] & 63;
            n[o++] = (a & 31) << 12 | d << 6 | l;
          } else if ((a & 248) === 240) {
            var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
            c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
          }
        }
      }
      __name(h, "h");
      function F(r) {
        for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f; ) {
          var t = r.charCodeAt(e++);
          if (t >= 55296 && t <= 56319) {
            if (e < f) {
              var s = r.charCodeAt(e);
              (s & 64512) === 56320 && (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
            }
            if (t >= 55296 && t <= 56319)
              continue;
          }
          if (n + 4 > o.length) {
            i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
            var m = new Uint8Array(i);
            m.set(o), o = m;
          }
          if ((t & 4294967168) === 0) {
            o[n++] = t;
            continue;
          } else if ((t & 4294965248) === 0)
            o[n++] = t >>> 6 & 31 | 192;
          else if ((t & 4294901760) === 0)
            o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
          else if ((t & 4292870144) === 0)
            o[n++] = t >>> 18 & 7 | 240, o[n++] = t >>> 12 & 63 | 128, o[n++] = t >>> 6 & 63 | 128;
          else
            continue;
          o[n++] = t & 63 | 128;
        }
        return o.slice ? o.slice(0, n) : o.subarray(0, n);
      }
      __name(F, "F");
      var u = "Failed to ", p2 = /* @__PURE__ */ __name(function(r, e, f) {
        if (r)
          throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
      }, "p");
      var x = typeof Buffer == "function" && Buffer.from;
      var A = x ? w : F;
      function v() {
        this.encoding = "utf-8";
      }
      __name(v, "v");
      v.prototype.encode = function(r, e) {
        return p2(e && e.stream, "encode", "stream"), A(r);
      };
      function U(r) {
        var e;
        try {
          var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
          e = URL.createObjectURL(f);
          var n = new XMLHttpRequest();
          return n.open("GET", e, false), n.send(), n.responseText;
        } finally {
          e && URL.revokeObjectURL(e);
        }
      }
      __name(U, "U");
      var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = ["utf-8", "utf8", "unicode-1-1-utf-8"], T = h;
      x ? T = B : O && (T = /* @__PURE__ */ __name(function(r) {
        try {
          return U(r);
        } catch (e) {
          return h(r);
        }
      }, "T"));
      var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
      function g(r, e) {
        p2(e && e.fatal, y, "fatal"), r = r || "utf-8";
        var f;
        if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f)
          throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
        this.encoding = r, this.fatal = false, this.ignoreBOM = false;
      }
      __name(g, "g");
      g.prototype.decode = function(r, e) {
        p2(e && e.stream, "decode", "stream");
        var f;
        return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
      };
      scope.TextEncoder = scope.TextEncoder || v;
      scope.TextDecoder = scope.TextDecoder || g;
    })(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : exports);
  }
});
var require_browser2 = __commonJS2({
  "../../node_modules/isomorphic-textencoder/browser.js"(exports, module) {
    init_define_process();
    require_text_min();
    module.exports = {
      encode: (string) => new TextEncoder().encode(string),
      decode: (buffer) => new TextDecoder().decode(buffer)
    };
  }
});
var require_just_debounce_it = __commonJS2({
  "../../node_modules/just-debounce-it/index.js"(exports, module) {
    init_define_process();
    module.exports = debounce;
    function debounce(fn, wait, callFirst) {
      var timeout;
      return function() {
        if (!wait) {
          return fn.apply(this, arguments);
        }
        var context = this;
        var args = arguments;
        var callNow = callFirst && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!callNow) {
            return fn.apply(context, args);
          }
        }, wait);
        if (callNow) {
          return fn.apply(this, arguments);
        }
      };
    }
    __name(debounce, "debounce");
  }
});
var require_path = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/path.js"(exports, module) {
    init_define_process();
    function normalizePath(path) {
      if (path.length === 0) {
        return ".";
      }
      let parts = splitPath(path);
      parts = parts.reduce(reducer, []);
      return joinPath(...parts);
    }
    __name(normalizePath, "normalizePath");
    function resolvePath(...paths) {
      let result = "";
      for (let path of paths) {
        if (path.startsWith("/")) {
          result = path;
        } else {
          result = normalizePath(joinPath(result, path));
        }
      }
      return result;
    }
    __name(resolvePath, "resolvePath");
    function joinPath(...parts) {
      if (parts.length === 0)
        return "";
      let path = parts.join("/");
      path = path.replace(/\/{2,}/g, "/");
      return path;
    }
    __name(joinPath, "joinPath");
    function splitPath(path) {
      if (path.length === 0)
        return [];
      if (path === "/")
        return ["/"];
      let parts = path.split("/");
      if (parts[parts.length - 1] === "") {
        parts.pop();
      }
      if (path[0] === "/") {
        parts[0] = "/";
      } else {
        if (parts[0] !== ".") {
          parts.unshift(".");
        }
      }
      return parts;
    }
    __name(splitPath, "splitPath");
    function dirname(path) {
      const last3 = path.lastIndexOf("/");
      if (last3 === -1)
        throw new Error(`Cannot get dirname of "${path}"`);
      if (last3 === 0)
        return "/";
      return path.slice(0, last3);
    }
    __name(dirname, "dirname");
    function basename(path) {
      if (path === "/")
        throw new Error(`Cannot get basename of "${path}"`);
      const last3 = path.lastIndexOf("/");
      if (last3 === -1)
        return path;
      return path.slice(last3 + 1);
    }
    __name(basename, "basename");
    function reducer(ancestors, current) {
      if (ancestors.length === 0) {
        ancestors.push(current);
        return ancestors;
      }
      if (current === ".")
        return ancestors;
      if (current === "..") {
        if (ancestors.length === 1) {
          if (ancestors[0] === "/") {
            throw new Error("Unable to normalize path - traverses above root directory");
          }
          if (ancestors[0] === ".") {
            ancestors.push(current);
            return ancestors;
          }
        }
        if (ancestors[ancestors.length - 1] === "..") {
          ancestors.push("..");
          return ancestors;
        } else {
          ancestors.pop();
          return ancestors;
        }
      }
      ancestors.push(current);
      return ancestors;
    }
    __name(reducer, "reducer");
    module.exports = {
      join: joinPath,
      normalize: normalizePath,
      split: splitPath,
      basename,
      dirname,
      resolve: resolvePath
    };
  }
});
var require_errors = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/errors.js"(exports, module) {
    init_define_process();
    function Err(name) {
      return class extends Error {
        constructor(...args) {
          super(...args);
          this.code = name;
          if (this.message) {
            this.message = name + ": " + this.message;
          } else {
            this.message = name;
          }
        }
      };
    }
    __name(Err, "Err");
    var EEXIST = Err("EEXIST");
    var ENOENT = Err("ENOENT");
    var ENOTDIR = Err("ENOTDIR");
    var ENOTEMPTY = Err("ENOTEMPTY");
    var ETIMEDOUT = Err("ETIMEDOUT");
    module.exports = { EEXIST, ENOENT, ENOTDIR, ENOTEMPTY, ETIMEDOUT };
  }
});
var require_CacheFS = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/CacheFS.js"(exports, module) {
    init_define_process();
    var path = require_path();
    var { EEXIST, ENOENT, ENOTDIR, ENOTEMPTY } = require_errors();
    var STAT = 0;
    module.exports = /* @__PURE__ */ __name(class CacheFS {
      constructor() {
      }
      _makeRoot(root = /* @__PURE__ */ new Map()) {
        root.set(STAT, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() });
        return root;
      }
      activate(superblock = null) {
        if (superblock === null) {
          this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]);
        } else if (typeof superblock === "string") {
          this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(superblock))]]);
        } else {
          this._root = superblock;
        }
      }
      get activated() {
        return !!this._root;
      }
      deactivate() {
        this._root = void 0;
      }
      size() {
        return this._countInodes(this._root.get("/")) - 1;
      }
      _countInodes(map2) {
        let count2 = 1;
        for (let [key, val] of map2) {
          if (key === STAT)
            continue;
          count2 += this._countInodes(val);
        }
        return count2;
      }
      autoinc() {
        let val = this._maxInode(this._root.get("/")) + 1;
        return val;
      }
      _maxInode(map2) {
        let max2 = map2.get(STAT).ino;
        for (let [key, val] of map2) {
          if (key === STAT)
            continue;
          max2 = Math.max(max2, this._maxInode(val));
        }
        return max2;
      }
      print(root = this._root.get("/")) {
        let str = "";
        const printTree = /* @__PURE__ */ __name((root2, indent) => {
          for (let [file, node] of root2) {
            if (file === 0)
              continue;
            let stat2 = node.get(STAT);
            let mode = stat2.mode.toString(8);
            str += `${"	".repeat(indent)}${file}	${mode}`;
            if (stat2.type === "file") {
              str += `	${stat2.size}	${stat2.mtimeMs}
`;
            } else {
              str += `
`;
              printTree(node, indent + 1);
            }
          }
        }, "printTree");
        printTree(root, 0);
        return str;
      }
      parse(print2) {
        let autoinc = 0;
        function mk(stat2) {
          const ino = ++autoinc;
          const type = stat2.length === 1 ? "dir" : "file";
          let [mode, size, mtimeMs] = stat2;
          mode = parseInt(mode, 8);
          size = size ? parseInt(size) : 0;
          mtimeMs = mtimeMs ? parseInt(mtimeMs) : Date.now();
          return /* @__PURE__ */ new Map([[STAT, { mode, type, size, mtimeMs, ino }]]);
        }
        __name(mk, "mk");
        let lines = print2.trim().split("\n");
        let _root = this._makeRoot();
        let stack = [
          { indent: -1, node: _root },
          { indent: 0, node: null }
        ];
        for (let line of lines) {
          let prefix = line.match(/^\t*/)[0];
          let indent = prefix.length;
          line = line.slice(indent);
          let [filename, ...stat2] = line.split("	");
          let node = mk(stat2);
          if (indent <= stack[stack.length - 1].indent) {
            while (indent <= stack[stack.length - 1].indent) {
              stack.pop();
            }
          }
          stack.push({ indent, node });
          let cd = stack[stack.length - 2].node;
          cd.set(filename, node);
        }
        return _root;
      }
      _lookup(filepath, follow = true) {
        let dir = this._root;
        let partialPath = "/";
        let parts = path.split(filepath);
        for (let i = 0; i < parts.length; ++i) {
          let part = parts[i];
          dir = dir.get(part);
          if (!dir)
            throw new ENOENT(filepath);
          if (follow || i < parts.length - 1) {
            const stat2 = dir.get(STAT);
            if (stat2.type === "symlink") {
              let target = path.resolve(partialPath, stat2.target);
              dir = this._lookup(target);
            }
            if (!partialPath) {
              partialPath = part;
            } else {
              partialPath = path.join(partialPath, part);
            }
          }
        }
        return dir;
      }
      mkdir(filepath, { mode }) {
        if (filepath === "/")
          throw new EEXIST();
        let dir = this._lookup(path.dirname(filepath));
        let basename = path.basename(filepath);
        if (dir.has(basename)) {
          throw new EEXIST();
        }
        let entry = /* @__PURE__ */ new Map();
        let stat2 = {
          mode,
          type: "dir",
          size: 0,
          mtimeMs: Date.now(),
          ino: this.autoinc()
        };
        entry.set(STAT, stat2);
        dir.set(basename, entry);
      }
      rmdir(filepath) {
        let dir = this._lookup(filepath);
        if (dir.get(STAT).type !== "dir")
          throw new ENOTDIR();
        if (dir.size > 1)
          throw new ENOTEMPTY();
        let parent = this._lookup(path.dirname(filepath));
        let basename = path.basename(filepath);
        parent.delete(basename);
      }
      readdir(filepath) {
        let dir = this._lookup(filepath);
        if (dir.get(STAT).type !== "dir")
          throw new ENOTDIR();
        return [...dir.keys()].filter((key) => typeof key === "string");
      }
      writeStat(filepath, size, { mode }) {
        let ino;
        try {
          let oldStat = this.stat(filepath);
          if (mode == null) {
            mode = oldStat.mode;
          }
          ino = oldStat.ino;
        } catch (err) {
        }
        if (mode == null) {
          mode = 438;
        }
        if (ino == null) {
          ino = this.autoinc();
        }
        let dir = this._lookup(path.dirname(filepath));
        let basename = path.basename(filepath);
        let stat2 = {
          mode,
          type: "file",
          size,
          mtimeMs: Date.now(),
          ino
        };
        let entry = /* @__PURE__ */ new Map();
        entry.set(STAT, stat2);
        dir.set(basename, entry);
        return stat2;
      }
      unlink(filepath) {
        let parent = this._lookup(path.dirname(filepath));
        let basename = path.basename(filepath);
        parent.delete(basename);
      }
      rename(oldFilepath, newFilepath) {
        let basename = path.basename(newFilepath);
        let entry = this._lookup(oldFilepath);
        let destDir = this._lookup(path.dirname(newFilepath));
        destDir.set(basename, entry);
        this.unlink(oldFilepath);
      }
      stat(filepath) {
        return this._lookup(filepath).get(STAT);
      }
      lstat(filepath) {
        return this._lookup(filepath, false).get(STAT);
      }
      readlink(filepath) {
        return this._lookup(filepath, false).get(STAT).target;
      }
      symlink(target, filepath) {
        let ino, mode;
        try {
          let oldStat = this.stat(filepath);
          if (mode === null) {
            mode = oldStat.mode;
          }
          ino = oldStat.ino;
        } catch (err) {
        }
        if (mode == null) {
          mode = 40960;
        }
        if (ino == null) {
          ino = this.autoinc();
        }
        let dir = this._lookup(path.dirname(filepath));
        let basename = path.basename(filepath);
        let stat2 = {
          mode,
          type: "symlink",
          target,
          size: 0,
          mtimeMs: Date.now(),
          ino
        };
        let entry = /* @__PURE__ */ new Map();
        entry.set(STAT, stat2);
        dir.set(basename, entry);
        return stat2;
      }
      _du(dir) {
        let size = 0;
        for (const [name, entry] of dir.entries()) {
          if (name === STAT) {
            size += entry.size;
          } else {
            size += this._du(entry);
          }
        }
        return size;
      }
      du(filepath) {
        let dir = this._lookup(filepath);
        return this._du(dir);
      }
    }, "CacheFS");
  }
});
var require_idb_keyval_cjs = __commonJS2({
  "../../node_modules/@isomorphic-git/idb-keyval/dist/idb-keyval-cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = class {
      constructor(dbName = "keyval-store", storeName = "keyval") {
        this.storeName = storeName;
        this._dbName = dbName;
        this._storeName = storeName;
        this._init();
      }
      _init() {
        if (this._dbp) {
          return;
        }
        this._dbp = new Promise((resolve, reject) => {
          const openreq = indexedDB.open(this._dbName);
          openreq.onerror = () => reject(openreq.error);
          openreq.onsuccess = () => resolve(openreq.result);
          openreq.onupgradeneeded = () => {
            openreq.result.createObjectStore(this._storeName);
          };
        });
      }
      _withIDBStore(type, callback) {
        this._init();
        return this._dbp.then((db) => new Promise((resolve, reject) => {
          const transaction = db.transaction(this.storeName, type);
          transaction.oncomplete = () => resolve();
          transaction.onabort = transaction.onerror = () => reject(transaction.error);
          callback(transaction.objectStore(this.storeName));
        }));
      }
      _close() {
        this._init();
        return this._dbp.then((db) => {
          db.close();
          this._dbp = void 0;
        });
      }
    };
    __name(Store, "Store");
    var store;
    function getDefaultStore() {
      if (!store)
        store = new Store();
      return store;
    }
    __name(getDefaultStore, "getDefaultStore");
    function get11(key, store2 = getDefaultStore()) {
      let req;
      return store2._withIDBStore("readwrite", (store3) => {
        req = store3.get(key);
      }).then(() => req.result);
    }
    __name(get11, "get");
    function set3(key, value, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.put(value, key);
      });
    }
    __name(set3, "set");
    function update8(key, updater, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        const req = store3.get(key);
        req.onsuccess = () => {
          store3.put(updater(req.result), key);
        };
      });
    }
    __name(update8, "update");
    function del(key, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.delete(key);
      });
    }
    __name(del, "del");
    function clear2(store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.clear();
      });
    }
    __name(clear2, "clear");
    function keys2(store2 = getDefaultStore()) {
      const keys22 = [];
      return store2._withIDBStore("readwrite", (store3) => {
        (store3.openKeyCursor || store3.openCursor).call(store3).onsuccess = function() {
          if (!this.result)
            return;
          keys22.push(this.result.key);
          this.result.continue();
        };
      }).then(() => keys22);
    }
    __name(keys2, "keys");
    function close(store2 = getDefaultStore()) {
      return store2._close();
    }
    __name(close, "close");
    exports.Store = Store;
    exports.get = get11;
    exports.set = set3;
    exports.update = update8;
    exports.del = del;
    exports.clear = clear2;
    exports.keys = keys2;
    exports.close = close;
  }
});
var require_IdbBackend = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/IdbBackend.js"(exports, module) {
    init_define_process();
    var idb = require_idb_keyval_cjs();
    module.exports = /* @__PURE__ */ __name(class IdbBackend {
      constructor(dbname, storename) {
        this._database = dbname;
        this._storename = storename;
        this._store = new idb.Store(this._database, this._storename);
      }
      saveSuperblock(superblock) {
        return idb.set("!root", superblock, this._store);
      }
      loadSuperblock() {
        return idb.get("!root", this._store);
      }
      readFile(inode) {
        return idb.get(inode, this._store);
      }
      writeFile(inode, data) {
        return idb.set(inode, data, this._store);
      }
      unlink(inode) {
        return idb.del(inode, this._store);
      }
      wipe() {
        return idb.clear(this._store);
      }
      close() {
        return idb.close(this._store);
      }
    }, "IdbBackend");
  }
});
var require_HttpBackend = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/HttpBackend.js"(exports, module) {
    init_define_process();
    module.exports = /* @__PURE__ */ __name(class HttpBackend {
      constructor(url) {
        this._url = url;
      }
      loadSuperblock() {
        return fetch(this._url + "/.superblock.txt").then((res) => res.ok ? res.text() : null);
      }
      async readFile(filepath) {
        const res = await fetch(this._url + filepath);
        if (res.status === 200) {
          return res.arrayBuffer();
        } else {
          throw new Error("ENOENT");
        }
      }
      async sizeFile(filepath) {
        const res = await fetch(this._url + filepath, { method: "HEAD" });
        if (res.status === 200) {
          return res.headers.get("content-length");
        } else {
          throw new Error("ENOENT");
        }
      }
    }, "HttpBackend");
  }
});
var require_Mutex = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/Mutex.js"(exports, module) {
    init_define_process();
    var idb = require_idb_keyval_cjs();
    var sleep = /* @__PURE__ */ __name((ms) => new Promise((r) => setTimeout(r, ms)), "sleep");
    module.exports = /* @__PURE__ */ __name(class Mutex {
      constructor(dbname, storename) {
        this._id = Math.random();
        this._database = dbname;
        this._storename = storename;
        this._store = new idb.Store(this._database, this._storename);
        this._lock = null;
      }
      async has({ margin = 2e3 } = {}) {
        if (this._lock && this._lock.holder === this._id) {
          const now = Date.now();
          if (this._lock.expires > now + margin) {
            return true;
          } else {
            return await this.renew();
          }
        } else {
          return false;
        }
      }
      async renew({ ttl = 5e3 } = {}) {
        let success;
        await idb.update("lock", (current) => {
          const now = Date.now();
          const expires = now + ttl;
          success = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        }, this._store);
        return success;
      }
      async acquire({ ttl = 5e3 } = {}) {
        let success;
        let expired;
        let doubleLock;
        await idb.update("lock", (current) => {
          const now = Date.now();
          const expires = now + ttl;
          expired = current && current.expires < now;
          success = current === void 0 || expired;
          doubleLock = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        }, this._store);
        if (doubleLock) {
          throw new Error("Mutex double-locked");
        }
        return success;
      }
      async wait({ interval = 100, limit = 6e3, ttl } = {}) {
        while (limit--) {
          if (await this.acquire({ ttl }))
            return true;
          await sleep(interval);
        }
        throw new Error("Mutex timeout");
      }
      async release({ force = false } = {}) {
        let success;
        let doubleFree;
        let someoneElseHasIt;
        await idb.update("lock", (current) => {
          success = force || current && current.holder === this._id;
          doubleFree = current === void 0;
          someoneElseHasIt = current && current.holder !== this._id;
          this._lock = success ? void 0 : current;
          return this._lock;
        }, this._store);
        await idb.close(this._store);
        if (!success && !force) {
          if (doubleFree)
            throw new Error("Mutex double-freed");
          if (someoneElseHasIt)
            throw new Error("Mutex lost ownership");
        }
        return success;
      }
    }, "Mutex");
  }
});
var require_Mutex2 = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/Mutex2.js"(exports, module) {
    init_define_process();
    module.exports = /* @__PURE__ */ __name(class Mutex {
      constructor(name) {
        this._id = Math.random();
        this._database = name;
        this._has = false;
        this._release = null;
      }
      async has() {
        return this._has;
      }
      async acquire() {
        return new Promise((resolve) => {
          navigator.locks.request(this._database + "_lock", { ifAvailable: true }, (lock) => {
            this._has = !!lock;
            resolve(!!lock);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          });
        });
      }
      async wait({ timeout = 6e5 } = {}) {
        return new Promise((resolve, reject) => {
          const controller = new AbortController();
          setTimeout(() => {
            controller.abort();
            reject(new Error("Mutex timeout"));
          }, timeout);
          navigator.locks.request(this._database + "_lock", { signal: controller.signal }, (lock) => {
            this._has = !!lock;
            resolve(!!lock);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          });
        });
      }
      async release({ force = false } = {}) {
        this._has = false;
        if (this._release) {
          this._release();
        } else if (force) {
          navigator.locks.request(this._database + "_lock", { steal: true }, (lock) => true);
        }
      }
    }, "Mutex");
  }
});
var require_DefaultBackend = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/DefaultBackend.js"(exports, module) {
    init_define_process();
    var { encode, decode } = require_browser2();
    var debounce = require_just_debounce_it();
    var CacheFS = require_CacheFS();
    var { ENOENT, ENOTEMPTY, ETIMEDOUT } = require_errors();
    var IdbBackend = require_IdbBackend();
    var HttpBackend = require_HttpBackend();
    var Mutex2 = require_Mutex();
    var Mutex22 = require_Mutex2();
    var path = require_path();
    module.exports = /* @__PURE__ */ __name(class DefaultBackend {
      constructor() {
        this.saveSuperblock = debounce(() => {
          this.flush();
        }, 500);
      }
      async init(name, {
        wipe,
        url,
        urlauto,
        fileDbName = name,
        db = null,
        fileStoreName = name + "_files",
        lockDbName = name + "_lock",
        lockStoreName = name + "_lock"
      } = {}) {
        this._name = name;
        this._idb = db || new IdbBackend(fileDbName, fileStoreName);
        this._mutex = navigator.locks ? new Mutex22(name) : new Mutex2(lockDbName, lockStoreName);
        this._cache = new CacheFS(name);
        this._opts = { wipe, url };
        this._needsWipe = !!wipe;
        if (url) {
          this._http = new HttpBackend(url);
          this._urlauto = !!urlauto;
        }
      }
      async activate() {
        if (this._cache.activated)
          return;
        if (this._needsWipe) {
          this._needsWipe = false;
          await this._idb.wipe();
          await this._mutex.release({ force: true });
        }
        if (!await this._mutex.has())
          await this._mutex.wait();
        const root = await this._idb.loadSuperblock();
        if (root) {
          this._cache.activate(root);
        } else if (this._http) {
          const text = await this._http.loadSuperblock();
          this._cache.activate(text);
          await this._saveSuperblock();
        } else {
          this._cache.activate();
        }
        if (await this._mutex.has()) {
          return;
        } else {
          throw new ETIMEDOUT();
        }
      }
      async deactivate() {
        if (await this._mutex.has()) {
          await this._saveSuperblock();
        }
        this._cache.deactivate();
        try {
          await this._mutex.release();
        } catch (e) {
          console.log(e);
        }
        await this._idb.close();
      }
      async _saveSuperblock() {
        if (this._cache.activated) {
          this._lastSavedAt = Date.now();
          await this._idb.saveSuperblock(this._cache._root);
        }
      }
      _writeStat(filepath, size, opts) {
        let dirparts = path.split(path.dirname(filepath));
        let dir = dirparts.shift();
        for (let dirpart of dirparts) {
          dir = path.join(dir, dirpart);
          try {
            this._cache.mkdir(dir, { mode: 511 });
          } catch (e) {
          }
        }
        return this._cache.writeStat(filepath, size, opts);
      }
      async readFile(filepath, opts) {
        const { encoding } = opts;
        if (encoding && encoding !== "utf8")
          throw new Error('Only "utf8" encoding is supported in readFile');
        let data = null, stat2 = null;
        try {
          stat2 = this._cache.stat(filepath);
          data = await this._idb.readFile(stat2.ino);
        } catch (e) {
          if (!this._urlauto)
            throw e;
        }
        if (!data && this._http) {
          let lstat = this._cache.lstat(filepath);
          while (lstat.type === "symlink") {
            filepath = path.resolve(path.dirname(filepath), lstat.target);
            lstat = this._cache.lstat(filepath);
          }
          data = await this._http.readFile(filepath);
        }
        if (data) {
          if (!stat2 || stat2.size != data.byteLength) {
            stat2 = await this._writeStat(filepath, data.byteLength, { mode: stat2 ? stat2.mode : 438 });
            this.saveSuperblock();
          }
          if (encoding === "utf8") {
            data = decode(data);
          } else {
            data.toString = () => decode(data);
          }
        }
        if (!stat2)
          throw new ENOENT(filepath);
        return data;
      }
      async writeFile(filepath, data, opts) {
        const { mode, encoding = "utf8" } = opts;
        if (typeof data === "string") {
          if (encoding !== "utf8") {
            throw new Error('Only "utf8" encoding is supported in writeFile');
          }
          data = encode(data);
        }
        const stat2 = await this._cache.writeStat(filepath, data.byteLength, { mode });
        await this._idb.writeFile(stat2.ino, data);
      }
      async unlink(filepath, opts) {
        const stat2 = this._cache.lstat(filepath);
        this._cache.unlink(filepath);
        if (stat2.type !== "symlink") {
          await this._idb.unlink(stat2.ino);
        }
      }
      readdir(filepath, opts) {
        return this._cache.readdir(filepath);
      }
      mkdir(filepath, opts) {
        const { mode = 511 } = opts;
        this._cache.mkdir(filepath, { mode });
      }
      rmdir(filepath, opts) {
        if (filepath === "/") {
          throw new ENOTEMPTY();
        }
        this._cache.rmdir(filepath);
      }
      rename(oldFilepath, newFilepath) {
        this._cache.rename(oldFilepath, newFilepath);
      }
      stat(filepath, opts) {
        return this._cache.stat(filepath);
      }
      lstat(filepath, opts) {
        return this._cache.lstat(filepath);
      }
      readlink(filepath, opts) {
        return this._cache.readlink(filepath);
      }
      symlink(target, filepath) {
        this._cache.symlink(target, filepath);
      }
      async backFile(filepath, opts) {
        let size = await this._http.sizeFile(filepath);
        await this._writeStat(filepath, size, opts);
      }
      du(filepath) {
        return this._cache.du(filepath);
      }
      flush() {
        return this._saveSuperblock();
      }
    }, "DefaultBackend");
  }
});
var require_Stat = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/Stat.js"(exports, module) {
    init_define_process();
    module.exports = /* @__PURE__ */ __name(class Stat {
      constructor(stats) {
        this.type = stats.type;
        this.mode = stats.mode;
        this.size = stats.size;
        this.ino = stats.ino;
        this.mtimeMs = stats.mtimeMs;
        this.ctimeMs = stats.ctimeMs || stats.mtimeMs;
        this.uid = 1;
        this.gid = 1;
        this.dev = 1;
      }
      isFile() {
        return this.type === "file";
      }
      isDirectory() {
        return this.type === "dir";
      }
      isSymbolicLink() {
        return this.type === "symlink";
      }
    }, "Stat");
  }
});
var require_PromisifiedFS = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/PromisifiedFS.js"(exports, module) {
    init_define_process();
    var DefaultBackend = require_DefaultBackend();
    var Stat = require_Stat();
    var path = require_path();
    function cleanParamsFilepathOpts(filepath, opts, ...rest2) {
      filepath = path.normalize(filepath);
      if (typeof opts === "undefined" || typeof opts === "function") {
        opts = {};
      }
      if (typeof opts === "string") {
        opts = {
          encoding: opts
        };
      }
      return [filepath, opts, ...rest2];
    }
    __name(cleanParamsFilepathOpts, "cleanParamsFilepathOpts");
    function cleanParamsFilepathDataOpts(filepath, data, opts, ...rest2) {
      filepath = path.normalize(filepath);
      if (typeof opts === "undefined" || typeof opts === "function") {
        opts = {};
      }
      if (typeof opts === "string") {
        opts = {
          encoding: opts
        };
      }
      return [filepath, data, opts, ...rest2];
    }
    __name(cleanParamsFilepathDataOpts, "cleanParamsFilepathDataOpts");
    function cleanParamsFilepathFilepath(oldFilepath, newFilepath, ...rest2) {
      return [path.normalize(oldFilepath), path.normalize(newFilepath), ...rest2];
    }
    __name(cleanParamsFilepathFilepath, "cleanParamsFilepathFilepath");
    module.exports = /* @__PURE__ */ __name(class PromisifiedFS {
      constructor(name, options = {}) {
        this.init = this.init.bind(this);
        this.readFile = this._wrap(this.readFile, cleanParamsFilepathOpts, false);
        this.writeFile = this._wrap(this.writeFile, cleanParamsFilepathDataOpts, true);
        this.unlink = this._wrap(this.unlink, cleanParamsFilepathOpts, true);
        this.readdir = this._wrap(this.readdir, cleanParamsFilepathOpts, false);
        this.mkdir = this._wrap(this.mkdir, cleanParamsFilepathOpts, true);
        this.rmdir = this._wrap(this.rmdir, cleanParamsFilepathOpts, true);
        this.rename = this._wrap(this.rename, cleanParamsFilepathFilepath, true);
        this.stat = this._wrap(this.stat, cleanParamsFilepathOpts, false);
        this.lstat = this._wrap(this.lstat, cleanParamsFilepathOpts, false);
        this.readlink = this._wrap(this.readlink, cleanParamsFilepathOpts, false);
        this.symlink = this._wrap(this.symlink, cleanParamsFilepathFilepath, true);
        this.backFile = this._wrap(this.backFile, cleanParamsFilepathOpts, true);
        this.du = this._wrap(this.du, cleanParamsFilepathOpts, false);
        this._deactivationPromise = null;
        this._deactivationTimeout = null;
        this._activationPromise = null;
        this._operations = /* @__PURE__ */ new Set();
        if (name) {
          this.init(name, options);
        }
      }
      async init(...args) {
        if (this._initPromiseResolve)
          await this._initPromise;
        this._initPromise = this._init(...args);
        return this._initPromise;
      }
      async _init(name, options = {}) {
        await this._gracefulShutdown();
        if (this._activationPromise)
          await this._deactivate();
        if (this._backend && this._backend.destroy) {
          await this._backend.destroy();
        }
        this._backend = options.backend || new DefaultBackend();
        if (this._backend.init) {
          await this._backend.init(name, options);
        }
        if (this._initPromiseResolve) {
          this._initPromiseResolve();
          this._initPromiseResolve = null;
        }
        if (!options.defer) {
          this.stat("/");
        }
      }
      async _gracefulShutdown() {
        if (this._operations.size > 0) {
          this._isShuttingDown = true;
          await new Promise((resolve) => this._gracefulShutdownResolve = resolve);
          this._isShuttingDown = false;
          this._gracefulShutdownResolve = null;
        }
      }
      _wrap(fn, paramCleaner, mutating) {
        return async (...args) => {
          args = paramCleaner(...args);
          let op = {
            name: fn.name,
            args
          };
          this._operations.add(op);
          try {
            await this._activate();
            return await fn.apply(this, args);
          } finally {
            this._operations.delete(op);
            if (mutating)
              this._backend.saveSuperblock();
            if (this._operations.size === 0) {
              if (!this._deactivationTimeout)
                clearTimeout(this._deactivationTimeout);
              this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500);
            }
          }
        };
      }
      async _activate() {
        if (!this._initPromise)
          console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`));
        await this._initPromise;
        if (this._deactivationTimeout) {
          clearTimeout(this._deactivationTimeout);
          this._deactivationTimeout = null;
        }
        if (this._deactivationPromise)
          await this._deactivationPromise;
        this._deactivationPromise = null;
        if (!this._activationPromise) {
          this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve();
        }
        await this._activationPromise;
      }
      async _deactivate() {
        if (this._activationPromise)
          await this._activationPromise;
        if (!this._deactivationPromise) {
          this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve();
        }
        this._activationPromise = null;
        if (this._gracefulShutdownResolve)
          this._gracefulShutdownResolve();
        return this._deactivationPromise;
      }
      async readFile(filepath, opts) {
        return this._backend.readFile(filepath, opts);
      }
      async writeFile(filepath, data, opts) {
        await this._backend.writeFile(filepath, data, opts);
        return null;
      }
      async unlink(filepath, opts) {
        await this._backend.unlink(filepath, opts);
        return null;
      }
      async readdir(filepath, opts) {
        return this._backend.readdir(filepath, opts);
      }
      async mkdir(filepath, opts) {
        await this._backend.mkdir(filepath, opts);
        return null;
      }
      async rmdir(filepath, opts) {
        await this._backend.rmdir(filepath, opts);
        return null;
      }
      async rename(oldFilepath, newFilepath) {
        await this._backend.rename(oldFilepath, newFilepath);
        return null;
      }
      async stat(filepath, opts) {
        const data = await this._backend.stat(filepath, opts);
        return new Stat(data);
      }
      async lstat(filepath, opts) {
        const data = await this._backend.lstat(filepath, opts);
        return new Stat(data);
      }
      async readlink(filepath, opts) {
        return this._backend.readlink(filepath, opts);
      }
      async symlink(target, filepath) {
        await this._backend.symlink(target, filepath);
        return null;
      }
      async backFile(filepath, opts) {
        await this._backend.backFile(filepath, opts);
        return null;
      }
      async du(filepath) {
        return this._backend.du(filepath);
      }
      async flush() {
        return this._backend.flush();
      }
    }, "PromisifiedFS");
  }
});
var require_src = __commonJS2({
  "../../node_modules/@isomorphic-git/lightning-fs/src/index.js"(exports, module) {
    init_define_process();
    var once = require_just_once();
    var PromisifiedFS = require_PromisifiedFS();
    function wrapCallback(opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
      }
      cb = once(cb);
      const resolve = /* @__PURE__ */ __name((...args) => cb(null, ...args), "resolve");
      return [resolve, cb];
    }
    __name(wrapCallback, "wrapCallback");
    module.exports = /* @__PURE__ */ __name(class FS {
      constructor(...args) {
        this.promises = new PromisifiedFS(...args);
        this.init = this.init.bind(this);
        this.readFile = this.readFile.bind(this);
        this.writeFile = this.writeFile.bind(this);
        this.unlink = this.unlink.bind(this);
        this.readdir = this.readdir.bind(this);
        this.mkdir = this.mkdir.bind(this);
        this.rmdir = this.rmdir.bind(this);
        this.rename = this.rename.bind(this);
        this.stat = this.stat.bind(this);
        this.lstat = this.lstat.bind(this);
        this.readlink = this.readlink.bind(this);
        this.symlink = this.symlink.bind(this);
        this.backFile = this.backFile.bind(this);
        this.du = this.du.bind(this);
        this.flush = this.flush.bind(this);
      }
      init(name, options) {
        return this.promises.init(name, options);
      }
      readFile(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readFile(filepath, opts).then(resolve).catch(reject);
      }
      writeFile(filepath, data, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.writeFile(filepath, data, opts).then(resolve).catch(reject);
      }
      unlink(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.unlink(filepath, opts).then(resolve).catch(reject);
      }
      readdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readdir(filepath, opts).then(resolve).catch(reject);
      }
      mkdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.mkdir(filepath, opts).then(resolve).catch(reject);
      }
      rmdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.rmdir(filepath, opts).then(resolve).catch(reject);
      }
      rename(oldFilepath, newFilepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.rename(oldFilepath, newFilepath).then(resolve).catch(reject);
      }
      stat(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.stat(filepath).then(resolve).catch(reject);
      }
      lstat(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.lstat(filepath).then(resolve).catch(reject);
      }
      readlink(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readlink(filepath).then(resolve).catch(reject);
      }
      symlink(target, filepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.symlink(target, filepath).then(resolve).catch(reject);
      }
      backFile(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.backFile(filepath, opts).then(resolve).catch(reject);
      }
      du(filepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.du(filepath).then(resolve).catch(reject);
      }
      flush(cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.flush().then(resolve).catch(reject);
      }
    }, "FS");
  }
});
var require_constants = __commonJS2({
  "../../node_modules/memfs/lib/constants.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.constants = void 0;
    exports.constants = {
      O_RDONLY: 0,
      O_WRONLY: 1,
      O_RDWR: 2,
      S_IFMT: 61440,
      S_IFREG: 32768,
      S_IFDIR: 16384,
      S_IFCHR: 8192,
      S_IFBLK: 24576,
      S_IFIFO: 4096,
      S_IFLNK: 40960,
      S_IFSOCK: 49152,
      O_CREAT: 64,
      O_EXCL: 128,
      O_NOCTTY: 256,
      O_TRUNC: 512,
      O_APPEND: 1024,
      O_DIRECTORY: 65536,
      O_NOATIME: 262144,
      O_NOFOLLOW: 131072,
      O_SYNC: 1052672,
      O_DIRECT: 16384,
      O_NONBLOCK: 2048,
      S_IRWXU: 448,
      S_IRUSR: 256,
      S_IWUSR: 128,
      S_IXUSR: 64,
      S_IRWXG: 56,
      S_IRGRP: 32,
      S_IWGRP: 16,
      S_IXGRP: 8,
      S_IRWXO: 7,
      S_IROTH: 4,
      S_IWOTH: 2,
      S_IXOTH: 1,
      F_OK: 0,
      R_OK: 4,
      W_OK: 2,
      X_OK: 1,
      UV_FS_SYMLINK_DIR: 1,
      UV_FS_SYMLINK_JUNCTION: 2,
      UV_FS_COPYFILE_EXCL: 1,
      UV_FS_COPYFILE_FICLONE: 2,
      UV_FS_COPYFILE_FICLONE_FORCE: 4,
      COPYFILE_EXCL: 1,
      COPYFILE_FICLONE: 2,
      COPYFILE_FICLONE_FORCE: 4
    };
  }
});
var require_getBigInt = __commonJS2({
  "../../node_modules/memfs/lib/getBigInt.js"(exports) {
    init_define_process();
    if (typeof BigInt === "function")
      exports.default = BigInt;
    else
      exports.default = /* @__PURE__ */ __name(function BigIntNotSupported() {
        throw new Error("BigInt is not supported in this environment.");
      }, "BigIntNotSupported");
  }
});
var require_Stats = __commonJS2({
  "../../node_modules/memfs/lib/Stats.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stats = void 0;
    var constants_1 = require_constants();
    var getBigInt_1 = require_getBigInt();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFBLK = constants_1.constants.S_IFBLK;
    var S_IFCHR = constants_1.constants.S_IFCHR;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var S_IFIFO = constants_1.constants.S_IFIFO;
    var S_IFSOCK = constants_1.constants.S_IFSOCK;
    var Stats = function() {
      function Stats2() {
      }
      __name(Stats2, "Stats");
      Stats2.build = function(node, bigint) {
        if (bigint === void 0) {
          bigint = false;
        }
        var stats = new Stats2();
        var uid = node.uid, gid = node.gid, atime = node.atime, mtime = node.mtime, ctime = node.ctime;
        var getStatNumber = !bigint ? function(number) {
          return number;
        } : getBigInt_1.default;
        stats.uid = getStatNumber(uid);
        stats.gid = getStatNumber(gid);
        stats.rdev = getStatNumber(0);
        stats.blksize = getStatNumber(4096);
        stats.ino = getStatNumber(node.ino);
        stats.size = getStatNumber(node.getSize());
        stats.blocks = getStatNumber(1);
        stats.atime = atime;
        stats.mtime = mtime;
        stats.ctime = ctime;
        stats.birthtime = ctime;
        stats.atimeMs = getStatNumber(atime.getTime());
        stats.mtimeMs = getStatNumber(mtime.getTime());
        var ctimeMs = getStatNumber(ctime.getTime());
        stats.ctimeMs = ctimeMs;
        stats.birthtimeMs = ctimeMs;
        stats.dev = getStatNumber(0);
        stats.mode = getStatNumber(node.mode);
        stats.nlink = getStatNumber(node.nlink);
        return stats;
      };
      Stats2.prototype._checkModeProperty = function(property) {
        return (Number(this.mode) & S_IFMT) === property;
      };
      Stats2.prototype.isDirectory = function() {
        return this._checkModeProperty(S_IFDIR);
      };
      Stats2.prototype.isFile = function() {
        return this._checkModeProperty(S_IFREG);
      };
      Stats2.prototype.isBlockDevice = function() {
        return this._checkModeProperty(S_IFBLK);
      };
      Stats2.prototype.isCharacterDevice = function() {
        return this._checkModeProperty(S_IFCHR);
      };
      Stats2.prototype.isSymbolicLink = function() {
        return this._checkModeProperty(S_IFLNK);
      };
      Stats2.prototype.isFIFO = function() {
        return this._checkModeProperty(S_IFIFO);
      };
      Stats2.prototype.isSocket = function() {
        return this._checkModeProperty(S_IFSOCK);
      };
      return Stats2;
    }();
    exports.Stats = Stats;
    exports.default = Stats;
  }
});
var require_shams = __commonJS2({
  "../../node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = /* @__PURE__ */ __name(function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    }, "hasSymbols");
  }
});
var require_shams2 = __commonJS2({
  "../../node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    init_define_process();
    var hasSymbols = require_shams();
    module.exports = /* @__PURE__ */ __name(function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
});
var require_has_symbols = __commonJS2({
  "../../node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = /* @__PURE__ */ __name(function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    }, "hasNativeSymbols");
  }
});
var require_implementation = __commonJS2({
  "../../node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    init_define_process();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice3 = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module.exports = /* @__PURE__ */ __name(function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice3.call(arguments, 1);
      var bound;
      var binder = /* @__PURE__ */ __name(function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice3.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice3.call(arguments))
          );
        }
      }, "binder");
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = /* @__PURE__ */ __name(function Empty2() {
        }, "Empty");
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    }, "bind");
  }
});
var require_function_bind = __commonJS2({
  "../../node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});
var require_src2 = __commonJS2({
  "../../node_modules/has/src/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var bind = require_function_bind();
    module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});
var require_get_intrinsic = __commonJS2({
  "../../node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = /* @__PURE__ */ __name(function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    }, "getEvalledConstructor");
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = /* @__PURE__ */ __name(function() {
      throw new $TypeError();
    }, "throwTypeError");
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = /* @__PURE__ */ __name(function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    }, "doEval");
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src2();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = /* @__PURE__ */ __name(function stringToPath2(string) {
      var first3 = $strSlice(string, 0, 1);
      var last3 = $strSlice(string, -1);
      if (first3 === "%" && last3 !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last3 === "%" && first3 !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    }, "stringToPath");
    var getBaseIntrinsic = /* @__PURE__ */ __name(function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    }, "getBaseIntrinsic");
    module.exports = /* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first3 = $strSlice(part, 0, 1);
        var last3 = $strSlice(part, -1);
        if ((first3 === '"' || first3 === "'" || first3 === "`" || (last3 === '"' || last3 === "'" || last3 === "`")) && first3 !== last3) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    }, "GetIntrinsic");
  }
});
var require_call_bind = __commonJS2({
  "../../node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = /* @__PURE__ */ __name(function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    }, "callBind");
    var applyBind = /* @__PURE__ */ __name(function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    }, "applyBind");
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});
var require_callBound = __commonJS2({
  "../../node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    init_define_process();
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = /* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    }, "callBoundIntrinsic");
  }
});
var require_is_arguments = __commonJS2({
  "../../node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var hasToStringTag = require_shams2()();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = /* @__PURE__ */ __name(function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    }, "isArguments");
    var isLegacyArguments = /* @__PURE__ */ __name(function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    }, "isArguments");
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});
var require_is_generator_function = __commonJS2({
  "../../node_modules/is-generator-function/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = require_shams2()();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = /* @__PURE__ */ __name(function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    }, "getGeneratorFunc");
    var GeneratorFunction;
    module.exports = /* @__PURE__ */ __name(function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn) === GeneratorFunction;
    }, "isGeneratorFunction");
  }
});
var require_is_callable = __commonJS2({
  "../../node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = /* @__PURE__ */ __name(function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    }, "isES6ClassFunction");
    var tryFunctionObject = /* @__PURE__ */ __name(function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    }, "tryFunctionToStr");
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = /* @__PURE__ */ __name(function isDocumentDotAll() {
      return false;
    }, "isDocumentDotAll");
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = /* @__PURE__ */ __name(function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        }, "isDocumentDotAll");
      }
    }
    var all;
    module.exports = reflectApply ? /* @__PURE__ */ __name(function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    }, "isCallable") : /* @__PURE__ */ __name(function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    }, "isCallable");
  }
});
var require_for_each = __commonJS2({
  "../../node_modules/for-each/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var forEachArray = /* @__PURE__ */ __name(function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty2.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    }, "forEachArray");
    var forEachString = /* @__PURE__ */ __name(function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    }, "forEachString");
    var forEachObject = /* @__PURE__ */ __name(function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty2.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    }, "forEachObject");
    var forEach2 = /* @__PURE__ */ __name(function forEach22(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    }, "forEach");
    module.exports = forEach2;
  }
});
var require_available_typed_arrays = __commonJS2({
  "../../node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? globalThis : globalThis;
    module.exports = /* @__PURE__ */ __name(function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    }, "availableTypedArrays");
  }
});
var require_gopd = __commonJS2({
  "../../node_modules/gopd/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});
var require_is_typed_array = __commonJS2({
  "../../node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var forEach2 = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var gOPD = require_gopd();
    var g = typeof globalThis === "undefined" ? globalThis : globalThis;
    var typedArrays = availableTypedArrays();
    var $indexOf = callBound("Array.prototype.indexOf", true) || /* @__PURE__ */ __name(function indexOf2(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }, "indexOf");
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach2(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          toStrTags[typedArray] = descriptor.get;
        }
      });
    }
    var tryTypedArrays = /* @__PURE__ */ __name(function tryAllTypedArrays(value) {
      var anyTrue = false;
      forEach2(toStrTags, function(getter, typedArray) {
        if (!anyTrue) {
          try {
            anyTrue = getter.call(value) === typedArray;
          } catch (e) {
          }
        }
      });
      return anyTrue;
    }, "tryAllTypedArrays");
    module.exports = /* @__PURE__ */ __name(function isTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag || !(Symbol.toStringTag in value)) {
        var tag = $slice($toString(value), 8, -1);
        return $indexOf(typedArrays, tag) > -1;
      }
      if (!gOPD) {
        return false;
      }
      return tryTypedArrays(value);
    }, "isTypedArray");
  }
});
var require_which_typed_array = __commonJS2({
  "../../node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var forEach2 = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? globalThis : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach2(typedArrays, function(typedArray) {
        if (typeof g[typedArray] === "function") {
          var arr = new g[typedArray]();
          if (Symbol.toStringTag in arr) {
            var proto = getPrototypeOf(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor) {
              var superProto = getPrototypeOf(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            toStrTags[typedArray] = descriptor.get;
          }
        }
      });
    }
    var tryTypedArrays = /* @__PURE__ */ __name(function tryAllTypedArrays(value) {
      var foundName = false;
      forEach2(toStrTags, function(getter, typedArray) {
        if (!foundName) {
          try {
            var name = getter.call(value);
            if (name === typedArray) {
              foundName = name;
            }
          } catch (e) {
          }
        }
      });
      return foundName;
    }, "tryAllTypedArrays");
    var isTypedArray = require_is_typed_array();
    module.exports = /* @__PURE__ */ __name(function whichTypedArray(value) {
      if (!isTypedArray(value)) {
        return false;
      }
      if (!hasToStringTag || !(Symbol.toStringTag in value)) {
        return $slice($toString(value), 8, -1);
      }
      return tryTypedArrays(value);
    }, "whichTypedArray");
  }
});
var require_types2 = __commonJS2({
  "../../node_modules/util/support/types.js"(exports) {
    "use strict";
    init_define_process();
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    __name(uncurryThis, "uncurryThis");
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    __name(checkBoxedPrimitive, "checkBoxedPrimitive");
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    __name(isPromise, "isPromise");
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    __name(isArrayBufferView, "isArrayBufferView");
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    __name(isUint8Array, "isUint8Array");
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    __name(isUint8ClampedArray, "isUint8ClampedArray");
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    __name(isUint16Array, "isUint16Array");
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    __name(isUint32Array, "isUint32Array");
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    __name(isInt8Array, "isInt8Array");
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    __name(isInt16Array, "isInt16Array");
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    __name(isInt32Array, "isInt32Array");
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    __name(isFloat32Array, "isFloat32Array");
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    __name(isFloat64Array, "isFloat64Array");
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    __name(isBigInt64Array, "isBigInt64Array");
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    __name(isBigUint64Array, "isBigUint64Array");
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    __name(isMapToString, "isMapToString");
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap2(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    __name(isMap2, "isMap");
    exports.isMap = isMap2;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    __name(isSetToString, "isSetToString");
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet2(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    __name(isSet2, "isSet");
    exports.isSet = isSet2;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    __name(isWeakMapToString, "isWeakMapToString");
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    __name(isWeakMap, "isWeakMap");
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    __name(isWeakSetToString, "isWeakSetToString");
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    __name(isWeakSet, "isWeakSet");
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    __name(isArrayBufferToString, "isArrayBufferToString");
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    __name(isArrayBuffer, "isArrayBuffer");
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    __name(isDataViewToString, "isDataViewToString");
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    __name(isDataView, "isDataView");
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    __name(isSharedArrayBufferToString, "isSharedArrayBufferToString");
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    __name(isSharedArrayBuffer, "isSharedArrayBuffer");
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    __name(isAsyncFunction, "isAsyncFunction");
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    __name(isMapIterator, "isMapIterator");
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    __name(isSetIterator, "isSetIterator");
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    __name(isGeneratorObject, "isGeneratorObject");
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    __name(isWebAssemblyCompiledModule, "isWebAssemblyCompiledModule");
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    __name(isNumberObject, "isNumberObject");
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    __name(isStringObject, "isStringObject");
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    __name(isBooleanObject, "isBooleanObject");
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    __name(isBigIntObject, "isBigIntObject");
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    __name(isSymbolObject, "isSymbolObject");
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    __name(isBoxedPrimitive, "isBoxedPrimitive");
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    __name(isAnyArrayBuffer, "isAnyArrayBuffer");
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});
var require_isBufferBrowser = __commonJS2({
  "../../node_modules/util/support/isBufferBrowser.js"(exports, module) {
    init_define_process();
    module.exports = /* @__PURE__ */ __name(function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    }, "isBuffer");
  }
});
var require_inherits_browser = __commonJS2({
  "../../node_modules/inherits/inherits_browser.js"(exports, module) {
    init_define_process();
    if (typeof Object.create === "function") {
      module.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      }, "inherits");
    } else {
      module.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = /* @__PURE__ */ __name(function() {
          }, "TempCtor");
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      }, "inherits");
    }
  }
});
var require_util = __commonJS2({
  "../../node_modules/util/util.js"(exports) {
    init_define_process();
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || /* @__PURE__ */ __name(function getOwnPropertyDescriptors2(obj) {
      var keys2 = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys2.length; i++) {
        descriptors[keys2[i]] = Object.getOwnPropertyDescriptor(obj, keys2[i]);
      }
      return descriptors;
    }, "getOwnPropertyDescriptors");
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof define_process_default !== "undefined" && define_process_default.noDeprecation === true) {
        return fn;
      }
      if (typeof define_process_default === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (define_process_default.throwDeprecation) {
            throw new Error(msg);
          } else if (define_process_default.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      __name(deprecated, "deprecated");
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (false) {
      debugEnv = false;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set3) {
      set3 = set3.toUpperCase();
      if (!debugs[set3]) {
        if (debugEnvRegex.test(set3)) {
          var pid = define_process_default.pid;
          debugs[set3] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set3, pid, msg);
          };
        } else {
          debugs[set3] = function() {
          };
        }
      }
      return debugs[set3];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    __name(inspect, "inspect");
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    __name(stylizeWithColor, "stylizeWithColor");
    function stylizeNoColor(str, styleType) {
      return str;
    }
    __name(stylizeNoColor, "stylizeNoColor");
    function arrayToHash(array) {
      var hash2 = {};
      array.forEach(function(val, idx) {
        hash2[val] = true;
      });
      return hash2;
    }
    __name(arrayToHash, "arrayToHash");
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys2 = Object.keys(value);
      var visibleKeys = arrayToHash(keys2);
      if (ctx.showHidden) {
        keys2 = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys2.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys2.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
      } else {
        output = keys2.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    __name(formatValue, "formatValue");
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    __name(formatPrimitive, "formatPrimitive");
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    __name(formatError, "formatError");
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty2(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys2.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    __name(formatArray, "formatArray");
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty2(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    __name(formatProperty, "formatProperty");
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    __name(reduceToSingleString, "reduceToSingleString");
    exports.types = require_types2();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    __name(isArray, "isArray");
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    __name(isBoolean, "isBoolean");
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    __name(isNull, "isNull");
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    __name(isNullOrUndefined, "isNullOrUndefined");
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    __name(isNumber, "isNumber");
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    __name(isString, "isString");
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    __name(isSymbol, "isSymbol");
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    __name(isUndefined, "isUndefined");
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    __name(isRegExp, "isRegExp");
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    __name(isObject, "isObject");
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    __name(isDate, "isDate");
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    __name(isError, "isError");
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    __name(isFunction, "isFunction");
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    __name(isPrimitive, "isPrimitive");
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    __name(objectToString, "objectToString");
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    __name(pad, "pad");
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    __name(timestamp, "timestamp");
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys2 = Object.keys(add);
      var i = keys2.length;
      while (i--) {
        origin[keys2[i]] = add[keys2[i]];
      }
      return origin;
    };
    function hasOwnProperty2(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    __name(hasOwnProperty2, "hasOwnProperty");
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = /* @__PURE__ */ __name(function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      __name(fn, "fn");
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    }, "promisify");
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    __name(callbackifyOnRejected, "callbackifyOnRejected");
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = /* @__PURE__ */ __name(function() {
          return maybeCb.apply(self2, arguments);
        }, "cb");
        original.apply(this, args).then(
          function(ret) {
            define_process_default.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            define_process_default.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      __name(callbackified, "callbackified");
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    __name(callbackify, "callbackify");
    exports.callbackify = callbackify;
  }
});
var require_errors2 = __commonJS2({
  "../../node_modules/assert-browserify/build/internal/errors.js"(exports, module) {
    "use strict";
    init_define_process();
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    __name(_possibleConstructorReturn, "_possibleConstructorReturn");
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    __name(_assertThisInitialized, "_assertThisInitialized");
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : /* @__PURE__ */ __name(function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, "_getPrototypeOf");
      return _getPrototypeOf(o);
    }
    __name(_getPrototypeOf, "_getPrototypeOf");
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    __name(_inherits, "_inherits");
    function _setPrototypeOf(o, p2) {
      _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p3) {
        o2.__proto__ = p3;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p2);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var codes = {};
    var assert;
    var util;
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      __name(getMessage, "getMessage");
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inherits(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          var _this;
          _classCallCheck(this, NodeError2);
          _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError2).call(this, getMessage(arg1, arg2, arg3)));
          _this.code = code;
          return _this;
        }
        __name(NodeError2, "NodeError");
        return NodeError2;
      }(Base);
      codes[code] = NodeError;
    }
    __name(createErrorType, "createErrorType");
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    __name(oneOf, "oneOf");
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    __name(startsWith, "startsWith");
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    __name(endsWith, "endsWith");
    function includes3(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    __name(includes3, "includes");
    createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      if (assert === void 0)
        assert = require_assert();
      assert(typeof name === "string", "'name' must be a string");
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes3(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(_typeof(actual));
      return msg;
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
      var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
      if (util === void 0)
        util = require_util();
      var inspected = util.inspect(value);
      if (inspected.length > 128) {
        inspected = "".concat(inspected.slice(0, 128), "...");
      }
      return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
    }, TypeError, RangeError);
    createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
      var type;
      if (value && value.constructor && value.constructor.name) {
        type = "instance of ".concat(value.constructor.name);
      } else {
        type = "type ".concat(_typeof(value));
      }
      return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
    }, TypeError);
    createErrorType("ERR_MISSING_ARGS", function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (assert === void 0)
        assert = require_assert();
      assert(args.length > 0, "At least one arg needs to be specified");
      var msg = "The ";
      var len = args.length;
      args = args.map(function(a) {
        return '"'.concat(a, '"');
      });
      switch (len) {
        case 1:
          msg += "".concat(args[0], " argument");
          break;
        case 2:
          msg += "".concat(args[0], " and ").concat(args[1], " arguments");
          break;
        default:
          msg += args.slice(0, len - 1).join(", ");
          msg += ", and ".concat(args[len - 1], " arguments");
          break;
      }
      return "".concat(msg, " must be specified");
    }, TypeError);
    module.exports.codes = codes;
  }
});
var require_assertion_error = __commonJS2({
  "../../node_modules/assert-browserify/build/internal/assert/assertion_error.js"(exports, module) {
    "use strict";
    init_define_process();
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    __name(_objectSpread, "_objectSpread");
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    __name(_createClass, "_createClass");
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    __name(_possibleConstructorReturn, "_possibleConstructorReturn");
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    __name(_assertThisInitialized, "_assertThisInitialized");
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    __name(_inherits, "_inherits");
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = /* @__PURE__ */ __name(function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2))
          return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2))
            return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        __name(Wrapper, "Wrapper");
        Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
        return _setPrototypeOf(Wrapper, Class2);
      }, "_wrapNativeSuper");
      return _wrapNativeSuper(Class);
    }
    __name(_wrapNativeSuper, "_wrapNativeSuper");
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    __name(isNativeReflectConstruct, "isNativeReflectConstruct");
    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = /* @__PURE__ */ __name(function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2)
            _setPrototypeOf(instance, Class2.prototype);
          return instance;
        }, "_construct");
      }
      return _construct.apply(null, arguments);
    }
    __name(_construct, "_construct");
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    __name(_isNativeFunction, "_isNativeFunction");
    function _setPrototypeOf(o, p2) {
      _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p3) {
        o2.__proto__ = p3;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p2);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : /* @__PURE__ */ __name(function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, "_getPrototypeOf");
      return _getPrototypeOf(o);
    }
    __name(_getPrototypeOf, "_getPrototypeOf");
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    var _require = require_util();
    var inspect = _require.inspect;
    var _require2 = require_errors2();
    var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    __name(endsWith, "endsWith");
    function repeat(str, count2) {
      count2 = Math.floor(count2);
      if (str.length == 0 || count2 == 0)
        return "";
      var maxCount = str.length * count2;
      count2 = Math.floor(Math.log(count2) / Math.log(2));
      while (count2) {
        str += str;
        count2--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    }
    __name(repeat, "repeat");
    var blue = "";
    var green = "";
    var red = "";
    var white = "";
    var kReadableOperator = {
      deepStrictEqual: "Expected values to be strictly deep-equal:",
      strictEqual: "Expected values to be strictly equal:",
      strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
      deepEqual: "Expected values to be loosely deep-equal:",
      equal: "Expected values to be loosely equal:",
      notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
      notStrictEqual: 'Expected "actual" to be strictly unequal to:',
      notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
      notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
      notEqual: 'Expected "actual" to be loosely unequal to:',
      notIdentical: "Values identical but not reference-equal:"
    };
    var kMaxShortLength = 10;
    function copyError(source) {
      var keys2 = Object.keys(source);
      var target = Object.create(Object.getPrototypeOf(source));
      keys2.forEach(function(key) {
        target[key] = source[key];
      });
      Object.defineProperty(target, "message", {
        value: source.message
      });
      return target;
    }
    __name(copyError, "copyError");
    function inspectValue(val) {
      return inspect(val, {
        compact: false,
        customInspect: false,
        depth: 1e3,
        maxArrayLength: Infinity,
        showHidden: false,
        breakLength: Infinity,
        showProxy: false,
        sorted: true,
        getters: true
      });
    }
    __name(inspectValue, "inspectValue");
    function createErrDiff(actual, expected, operator) {
      var other = "";
      var res = "";
      var lastPos = 0;
      var end = "";
      var skipped = false;
      var actualInspected = inspectValue(actual);
      var actualLines = actualInspected.split("\n");
      var expectedLines = inspectValue(expected).split("\n");
      var i = 0;
      var indicator = "";
      if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
        operator = "strictEqualObject";
      }
      if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
        var inputLength = actualLines[0].length + expectedLines[0].length;
        if (inputLength <= kMaxShortLength) {
          if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
            return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
          }
        } else if (operator !== "strictEqualObject") {
          var maxLength = define_process_default.stderr && define_process_default.stderr.isTTY ? define_process_default.stderr.columns : 80;
          if (inputLength < maxLength) {
            while (actualLines[0][i] === expectedLines[0][i]) {
              i++;
            }
            if (i > 2) {
              indicator = "\n  ".concat(repeat(" ", i), "^");
              i = 0;
            }
          }
        }
      }
      var a = actualLines[actualLines.length - 1];
      var b = expectedLines[expectedLines.length - 1];
      while (a === b) {
        if (i++ < 2) {
          end = "\n  ".concat(a).concat(end);
        } else {
          other = a;
        }
        actualLines.pop();
        expectedLines.pop();
        if (actualLines.length === 0 || expectedLines.length === 0)
          break;
        a = actualLines[actualLines.length - 1];
        b = expectedLines[expectedLines.length - 1];
      }
      var maxLines = Math.max(actualLines.length, expectedLines.length);
      if (maxLines === 0) {
        var _actualLines = actualInspected.split("\n");
        if (_actualLines.length > 30) {
          _actualLines[26] = "".concat(blue, "...").concat(white);
          while (_actualLines.length > 27) {
            _actualLines.pop();
          }
        }
        return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
      }
      if (i > 3) {
        end = "\n".concat(blue, "...").concat(white).concat(end);
        skipped = true;
      }
      if (other !== "") {
        end = "\n  ".concat(other).concat(end);
        other = "";
      }
      var printedLines = 0;
      var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
      var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
      for (i = 0; i < maxLines; i++) {
        var cur = i - lastPos;
        if (actualLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(expectedLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(expectedLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
          printedLines++;
        } else if (expectedLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(actualLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(actualLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
          printedLines++;
        } else {
          var expectedLine = expectedLines[i];
          var actualLine = actualLines[i];
          var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
          if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
            divergingLines = false;
            actualLine += ",";
          }
          if (divergingLines) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
            printedLines += 2;
          } else {
            res += other;
            other = "";
            if (cur === 1 || i === 0) {
              res += "\n  ".concat(actualLine);
              printedLines++;
            }
          }
        }
        if (printedLines > 20 && i < maxLines - 2) {
          return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
        }
      }
      return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
    }
    __name(createErrDiff, "createErrDiff");
    var AssertionError = /* @__PURE__ */ function(_Error) {
      _inherits(AssertionError2, _Error);
      function AssertionError2(options) {
        var _this;
        _classCallCheck(this, AssertionError2);
        if (_typeof(options) !== "object" || options === null) {
          throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
        var actual = options.actual, expected = options.expected;
        var limit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        if (message != null) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, String(message)));
        } else {
          if (define_process_default.stderr && define_process_default.stderr.isTTY) {
            if (define_process_default.stderr && define_process_default.stderr.getColorDepth && define_process_default.stderr.getColorDepth() !== 1) {
              blue = "\x1B[34m";
              green = "\x1B[32m";
              white = "\x1B[39m";
              red = "\x1B[31m";
            } else {
              blue = "";
              green = "";
              white = "";
              red = "";
            }
          }
          if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
            actual = copyError(actual);
            expected = copyError(expected);
          }
          if (operator === "deepStrictEqual" || operator === "strictEqual") {
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, createErrDiff(actual, expected, operator)));
          } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
            var base = kReadableOperator[operator];
            var res = inspectValue(actual).split("\n");
            if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
              base = kReadableOperator.notStrictEqualObject;
            }
            if (res.length > 30) {
              res[26] = "".concat(blue, "...").concat(white);
              while (res.length > 27) {
                res.pop();
              }
            }
            if (res.length === 1) {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, " ").concat(res[0])));
            } else {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n")));
            }
          } else {
            var _res = inspectValue(actual);
            var other = "";
            var knownOperators = kReadableOperator[operator];
            if (operator === "notDeepEqual" || operator === "notEqual") {
              _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
              if (_res.length > 1024) {
                _res = "".concat(_res.slice(0, 1021), "...");
              }
            } else {
              other = "".concat(inspectValue(expected));
              if (_res.length > 512) {
                _res = "".concat(_res.slice(0, 509), "...");
              }
              if (other.length > 512) {
                other = "".concat(other.slice(0, 509), "...");
              }
              if (operator === "deepEqual" || operator === "equal") {
                _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
              } else {
                other = " ".concat(operator, " ").concat(other);
              }
            }
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(_res).concat(other)));
          }
        }
        Error.stackTraceLimit = limit;
        _this.generatedMessage = !message;
        Object.defineProperty(_assertThisInitialized(_this), "name", {
          value: "AssertionError [ERR_ASSERTION]",
          enumerable: false,
          writable: true,
          configurable: true
        });
        _this.code = "ERR_ASSERTION";
        _this.actual = actual;
        _this.expected = expected;
        _this.operator = operator;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
        }
        _this.stack;
        _this.name = "AssertionError";
        return _possibleConstructorReturn(_this);
      }
      __name(AssertionError2, "AssertionError");
      _createClass(AssertionError2, [{
        key: "toString",
        value: /* @__PURE__ */ __name(function toString5() {
          return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
        }, "toString")
      }, {
        key: inspect.custom,
        value: /* @__PURE__ */ __name(function value(recurseTimes, ctx) {
          return inspect(this, _objectSpread({}, ctx, {
            customInspect: false,
            depth: 0
          }));
        }, "value")
      }]);
      return AssertionError2;
    }(_wrapNativeSuper(Error));
    module.exports = AssertionError;
  }
});
var require_es6_object_assign = __commonJS2({
  "../../node_modules/es6-object-assign/index.js"(exports, module) {
    "use strict";
    init_define_process();
    function assign(target, firstSource) {
      if (target === void 0 || target === null) {
        throw new TypeError("Cannot convert first argument to object");
      }
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === void 0 || nextSource === null) {
          continue;
        }
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
    __name(assign, "assign");
    function polyfill() {
      if (!Object.assign) {
        Object.defineProperty(Object, "assign", {
          enumerable: false,
          configurable: true,
          writable: true,
          value: assign
        });
      }
    }
    __name(polyfill, "polyfill");
    module.exports = {
      assign,
      polyfill
    };
  }
});
var require_isArguments = __commonJS2({
  "../../node_modules/object-keys/isArguments.js"(exports, module) {
    "use strict";
    init_define_process();
    var toStr = Object.prototype.toString;
    module.exports = /* @__PURE__ */ __name(function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    }, "isArguments");
  }
});
var require_implementation2 = __commonJS2({
  "../../node_modules/object-keys/implementation.js"(exports, module) {
    "use strict";
    init_define_process();
    var keysShim;
    if (!Object.keys) {
      has5 = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = /* @__PURE__ */ __name(function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      }, "equalsConstructorPrototype");
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has5.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = /* @__PURE__ */ __name(function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      }, "equalsConstructorPrototypeIfNotBuggy");
      keysShim = /* @__PURE__ */ __name(function keys2(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has5.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has5.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has5.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      }, "keys");
    }
    var has5;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module.exports = keysShim;
  }
});
var require_object_keys = __commonJS2({
  "../../node_modules/object-keys/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var slice3 = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? /* @__PURE__ */ __name(function keys2(o) {
      return origKeys(o);
    }, "keys") : require_implementation2();
    var originalKeys = Object.keys;
    keysShim.shim = /* @__PURE__ */ __name(function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = /* @__PURE__ */ __name(function keys2(object) {
            if (isArgs(object)) {
              return originalKeys(slice3.call(object));
            }
            return originalKeys(object);
          }, "keys");
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    }, "shimObjectKeys");
    module.exports = keysShim;
  }
});
var require_has_property_descriptors = __commonJS2({
  "../../node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasPropertyDescriptors = /* @__PURE__ */ __name(function hasPropertyDescriptors2() {
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    }, "hasPropertyDescriptors");
    hasPropertyDescriptors.hasArrayLengthDefineBug = /* @__PURE__ */ __name(function hasArrayLengthDefineBug() {
      if (!hasPropertyDescriptors()) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    }, "hasArrayLengthDefineBug");
    module.exports = hasPropertyDescriptors;
  }
});
var require_define_properties = __commonJS2({
  "../../node_modules/define-properties/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var keys2 = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat2 = Array.prototype.concat;
    var origDefineProperty = Object.defineProperty;
    var isFunction = /* @__PURE__ */ __name(function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    }, "isFunction");
    var hasPropertyDescriptors = require_has_property_descriptors()();
    var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;
    var defineProperty = /* @__PURE__ */ __name(function(object, name, value, predicate) {
      if (name in object && (!isFunction(predicate) || !predicate())) {
        return;
      }
      if (supportsDescriptors) {
        origDefineProperty(object, name, {
          configurable: true,
          enumerable: false,
          value,
          writable: true
        });
      } else {
        object[name] = value;
      }
    }, "defineProperty");
    var defineProperties = /* @__PURE__ */ __name(function(object, map2) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys2(map2);
      if (hasSymbols) {
        props = concat2.call(props, Object.getOwnPropertySymbols(map2));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map2[props[i]], predicates[props[i]]);
      }
    }, "defineProperties");
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module.exports = defineProperties;
  }
});
var require_implementation3 = __commonJS2({
  "../../node_modules/object-is/implementation.js"(exports, module) {
    "use strict";
    init_define_process();
    var numberIsNaN = /* @__PURE__ */ __name(function(value) {
      return value !== value;
    }, "numberIsNaN");
    module.exports = /* @__PURE__ */ __name(function is2(a, b) {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      }
      if (a === b) {
        return true;
      }
      if (numberIsNaN(a) && numberIsNaN(b)) {
        return true;
      }
      return false;
    }, "is");
  }
});
var require_polyfill = __commonJS2({
  "../../node_modules/object-is/polyfill.js"(exports, module) {
    "use strict";
    init_define_process();
    var implementation = require_implementation3();
    module.exports = /* @__PURE__ */ __name(function getPolyfill() {
      return typeof Object.is === "function" ? Object.is : implementation;
    }, "getPolyfill");
  }
});
var require_shim = __commonJS2({
  "../../node_modules/object-is/shim.js"(exports, module) {
    "use strict";
    init_define_process();
    var getPolyfill = require_polyfill();
    var define2 = require_define_properties();
    module.exports = /* @__PURE__ */ __name(function shimObjectIs() {
      var polyfill = getPolyfill();
      define2(Object, { is: polyfill }, {
        is: /* @__PURE__ */ __name(function testObjectIs() {
          return Object.is !== polyfill;
        }, "testObjectIs")
      });
      return polyfill;
    }, "shimObjectIs");
  }
});
var require_object_is = __commonJS2({
  "../../node_modules/object-is/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation3();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill = callBind(getPolyfill(), Object);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = polyfill;
  }
});
var require_implementation4 = __commonJS2({
  "../../node_modules/is-nan/implementation.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = /* @__PURE__ */ __name(function isNaN2(value) {
      return value !== value;
    }, "isNaN");
  }
});
var require_polyfill2 = __commonJS2({
  "../../node_modules/is-nan/polyfill.js"(exports, module) {
    "use strict";
    init_define_process();
    var implementation = require_implementation4();
    module.exports = /* @__PURE__ */ __name(function getPolyfill() {
      if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
        return Number.isNaN;
      }
      return implementation;
    }, "getPolyfill");
  }
});
var require_shim2 = __commonJS2({
  "../../node_modules/is-nan/shim.js"(exports, module) {
    "use strict";
    init_define_process();
    var define2 = require_define_properties();
    var getPolyfill = require_polyfill2();
    module.exports = /* @__PURE__ */ __name(function shimNumberIsNaN() {
      var polyfill = getPolyfill();
      define2(Number, { isNaN: polyfill }, {
        isNaN: /* @__PURE__ */ __name(function testIsNaN() {
          return Number.isNaN !== polyfill;
        }, "testIsNaN")
      });
      return polyfill;
    }, "shimNumberIsNaN");
  }
});
var require_is_nan = __commonJS2({
  "../../node_modules/is-nan/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var callBind = require_call_bind();
    var define2 = require_define_properties();
    var implementation = require_implementation4();
    var getPolyfill = require_polyfill2();
    var shim = require_shim2();
    var polyfill = callBind(getPolyfill(), Number);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = polyfill;
  }
});
var require_comparisons = __commonJS2({
  "../../node_modules/assert-browserify/build/internal/util/comparisons.js"(exports, module) {
    "use strict";
    init_define_process();
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }
    __name(_slicedToArray, "_slicedToArray");
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
    __name(_nonIterableRest, "_nonIterableRest");
    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    __name(_iterableToArrayLimit, "_iterableToArrayLimit");
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    __name(_arrayWithHoles, "_arrayWithHoles");
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    var regexFlagsSupported = /a/g.flags !== void 0;
    var arrayFromSet = /* @__PURE__ */ __name(function arrayFromSet2(set3) {
      var array = [];
      set3.forEach(function(value) {
        return array.push(value);
      });
      return array;
    }, "arrayFromSet");
    var arrayFromMap = /* @__PURE__ */ __name(function arrayFromMap2(map2) {
      var array = [];
      map2.forEach(function(value, key) {
        return array.push([key, value]);
      });
      return array;
    }, "arrayFromMap");
    var objectIs = Object.is ? Object.is : require_object_is();
    var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
      return [];
    };
    var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    __name(uncurryThis, "uncurryThis");
    var hasOwnProperty2 = uncurryThis(Object.prototype.hasOwnProperty);
    var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
    var objectToString = uncurryThis(Object.prototype.toString);
    var _require$types = require_util().types;
    var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
    var isArrayBufferView = _require$types.isArrayBufferView;
    var isDate = _require$types.isDate;
    var isMap2 = _require$types.isMap;
    var isRegExp = _require$types.isRegExp;
    var isSet2 = _require$types.isSet;
    var isNativeError = _require$types.isNativeError;
    var isBoxedPrimitive = _require$types.isBoxedPrimitive;
    var isNumberObject = _require$types.isNumberObject;
    var isStringObject = _require$types.isStringObject;
    var isBooleanObject = _require$types.isBooleanObject;
    var isBigIntObject = _require$types.isBigIntObject;
    var isSymbolObject = _require$types.isSymbolObject;
    var isFloat32Array = _require$types.isFloat32Array;
    var isFloat64Array = _require$types.isFloat64Array;
    function isNonIndex(key) {
      if (key.length === 0 || key.length > 10)
        return true;
      for (var i = 0; i < key.length; i++) {
        var code = key.charCodeAt(i);
        if (code < 48 || code > 57)
          return true;
      }
      return key.length === 10 && key >= Math.pow(2, 32);
    }
    __name(isNonIndex, "isNonIndex");
    function getOwnNonIndexProperties(value) {
      return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
    }
    __name(getOwnNonIndexProperties, "getOwnNonIndexProperties");
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    __name(compare, "compare");
    var ONLY_ENUMERABLE = void 0;
    var kStrict = true;
    var kLoose = false;
    var kNoIterator = 0;
    var kIsArray = 1;
    var kIsSet = 2;
    var kIsMap = 3;
    function areSimilarRegExps(a, b) {
      return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
    }
    __name(areSimilarRegExps, "areSimilarRegExps");
    function areSimilarFloatArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (var offset = 0; offset < a.byteLength; offset++) {
        if (a[offset] !== b[offset]) {
          return false;
        }
      }
      return true;
    }
    __name(areSimilarFloatArrays, "areSimilarFloatArrays");
    function areSimilarTypedArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
    }
    __name(areSimilarTypedArrays, "areSimilarTypedArrays");
    function areEqualArrayBuffers(buf1, buf2) {
      return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
    }
    __name(areEqualArrayBuffers, "areEqualArrayBuffers");
    function isEqualBoxedPrimitive(val1, val2) {
      if (isNumberObject(val1)) {
        return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
      }
      if (isStringObject(val1)) {
        return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
      }
      if (isBooleanObject(val1)) {
        return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
      }
      if (isBigIntObject(val1)) {
        return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
      }
      return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
    }
    __name(isEqualBoxedPrimitive, "isEqualBoxedPrimitive");
    function innerDeepEqual(val1, val2, strict, memos) {
      if (val1 === val2) {
        if (val1 !== 0)
          return true;
        return strict ? objectIs(val1, val2) : true;
      }
      if (strict) {
        if (_typeof(val1) !== "object") {
          return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
        }
        if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
          return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
          return false;
        }
      } else {
        if (val1 === null || _typeof(val1) !== "object") {
          if (val2 === null || _typeof(val2) !== "object") {
            return val1 == val2;
          }
          return false;
        }
        if (val2 === null || _typeof(val2) !== "object") {
          return false;
        }
      }
      var val1Tag = objectToString(val1);
      var val2Tag = objectToString(val2);
      if (val1Tag !== val2Tag) {
        return false;
      }
      if (Array.isArray(val1)) {
        if (val1.length !== val2.length) {
          return false;
        }
        var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
      }
      if (val1Tag === "[object Object]") {
        if (!isMap2(val1) && isMap2(val2) || !isSet2(val1) && isSet2(val2)) {
          return false;
        }
      }
      if (isDate(val1)) {
        if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
          return false;
        }
      } else if (isRegExp(val1)) {
        if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
          return false;
        }
      } else if (isNativeError(val1) || val1 instanceof Error) {
        if (val1.message !== val2.message || val1.name !== val2.name) {
          return false;
        }
      } else if (isArrayBufferView(val1)) {
        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
          if (!areSimilarFloatArrays(val1, val2)) {
            return false;
          }
        } else if (!areSimilarTypedArrays(val1, val2)) {
          return false;
        }
        var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (_keys.length !== _keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
      } else if (isSet2(val1)) {
        if (!isSet2(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsSet);
      } else if (isMap2(val1)) {
        if (!isMap2(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsMap);
      } else if (isAnyArrayBuffer(val1)) {
        if (!areEqualArrayBuffers(val1, val2)) {
          return false;
        }
      } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kNoIterator);
    }
    __name(innerDeepEqual, "innerDeepEqual");
    function getEnumerables(val, keys2) {
      return keys2.filter(function(k) {
        return propertyIsEnumerable(val, k);
      });
    }
    __name(getEnumerables, "getEnumerables");
    function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
      if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        var bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
      }
      var i = 0;
      for (; i < aKeys.length; i++) {
        if (!hasOwnProperty2(val2, aKeys[i])) {
          return false;
        }
      }
      if (strict && arguments.length === 5) {
        var symbolKeysA = objectGetOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
          var count2 = 0;
          for (i = 0; i < symbolKeysA.length; i++) {
            var key = symbolKeysA[i];
            if (propertyIsEnumerable(val1, key)) {
              if (!propertyIsEnumerable(val2, key)) {
                return false;
              }
              aKeys.push(key);
              count2++;
            } else if (propertyIsEnumerable(val2, key)) {
              return false;
            }
          }
          var symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count2) {
            return false;
          }
        } else {
          var _symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
            return false;
          }
        }
      }
      if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
        return true;
      }
      if (memos === void 0) {
        memos = {
          val1: /* @__PURE__ */ new Map(),
          val2: /* @__PURE__ */ new Map(),
          position: 0
        };
      } else {
        var val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== void 0) {
          var val2MemoB = memos.val2.get(val2);
          if (val2MemoB !== void 0) {
            return val2MemoA === val2MemoB;
          }
        }
        memos.position++;
      }
      memos.val1.set(val1, memos.position);
      memos.val2.set(val2, memos.position);
      var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
      memos.val1.delete(val1);
      memos.val2.delete(val2);
      return areEq;
    }
    __name(keyCheck, "keyCheck");
    function setHasEqualElement(set3, val1, strict, memo) {
      var setValues = arrayFromSet(set3);
      for (var i = 0; i < setValues.length; i++) {
        var val2 = setValues[i];
        if (innerDeepEqual(val1, val2, strict, memo)) {
          set3.delete(val2);
          return true;
        }
      }
      return false;
    }
    __name(setHasEqualElement, "setHasEqualElement");
    function findLooseMatchingPrimitives(prim) {
      switch (_typeof(prim)) {
        case "undefined":
          return null;
        case "object":
          return void 0;
        case "symbol":
          return false;
        case "string":
          prim = +prim;
        case "number":
          if (numberIsNaN(prim)) {
            return false;
          }
      }
      return true;
    }
    __name(findLooseMatchingPrimitives, "findLooseMatchingPrimitives");
    function setMightHaveLoosePrim(a, b, prim) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null)
        return altValue;
      return b.has(altValue) && !a.has(altValue);
    }
    __name(setMightHaveLoosePrim, "setMightHaveLoosePrim");
    function mapMightHaveLoosePrim(a, b, prim, item, memo) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      var curB = b.get(altValue);
      if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
      }
      return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
    }
    __name(mapMightHaveLoosePrim, "mapMightHaveLoosePrim");
    function setEquiv(a, b, strict, memo) {
      var set3 = null;
      var aValues = arrayFromSet(a);
      for (var i = 0; i < aValues.length; i++) {
        var val = aValues[i];
        if (_typeof(val) === "object" && val !== null) {
          if (set3 === null) {
            set3 = /* @__PURE__ */ new Set();
          }
          set3.add(val);
        } else if (!b.has(val)) {
          if (strict)
            return false;
          if (!setMightHaveLoosePrim(a, b, val)) {
            return false;
          }
          if (set3 === null) {
            set3 = /* @__PURE__ */ new Set();
          }
          set3.add(val);
        }
      }
      if (set3 !== null) {
        var bValues = arrayFromSet(b);
        for (var _i = 0; _i < bValues.length; _i++) {
          var _val = bValues[_i];
          if (_typeof(_val) === "object" && _val !== null) {
            if (!setHasEqualElement(set3, _val, strict, memo))
              return false;
          } else if (!strict && !a.has(_val) && !setHasEqualElement(set3, _val, strict, memo)) {
            return false;
          }
        }
        return set3.size === 0;
      }
      return true;
    }
    __name(setEquiv, "setEquiv");
    function mapHasEqualEntry(set3, map2, key1, item1, strict, memo) {
      var setValues = arrayFromSet(set3);
      for (var i = 0; i < setValues.length; i++) {
        var key2 = setValues[i];
        if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map2.get(key2), strict, memo)) {
          set3.delete(key2);
          return true;
        }
      }
      return false;
    }
    __name(mapHasEqualEntry, "mapHasEqualEntry");
    function mapEquiv(a, b, strict, memo) {
      var set3 = null;
      var aEntries = arrayFromMap(a);
      for (var i = 0; i < aEntries.length; i++) {
        var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
        if (_typeof(key) === "object" && key !== null) {
          if (set3 === null) {
            set3 = /* @__PURE__ */ new Set();
          }
          set3.add(key);
        } else {
          var item2 = b.get(key);
          if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
            if (strict)
              return false;
            if (!mapMightHaveLoosePrim(a, b, key, item1, memo))
              return false;
            if (set3 === null) {
              set3 = /* @__PURE__ */ new Set();
            }
            set3.add(key);
          }
        }
      }
      if (set3 !== null) {
        var bEntries = arrayFromMap(b);
        for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
          var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), key = _bEntries$_i[0], item = _bEntries$_i[1];
          if (_typeof(key) === "object" && key !== null) {
            if (!mapHasEqualEntry(set3, a, key, item, strict, memo))
              return false;
          } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set3, a, key, item, false, memo)) {
            return false;
          }
        }
        return set3.size === 0;
      }
      return true;
    }
    __name(mapEquiv, "mapEquiv");
    function objEquiv(a, b, strict, keys2, memos, iterationType) {
      var i = 0;
      if (iterationType === kIsSet) {
        if (!setEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsMap) {
        if (!mapEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsArray) {
        for (; i < a.length; i++) {
          if (hasOwnProperty2(a, i)) {
            if (!hasOwnProperty2(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
              return false;
            }
          } else if (hasOwnProperty2(b, i)) {
            return false;
          } else {
            var keysA = Object.keys(a);
            for (; i < keysA.length; i++) {
              var key = keysA[i];
              if (!hasOwnProperty2(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                return false;
              }
            }
            if (keysA.length !== Object.keys(b).length) {
              return false;
            }
            return true;
          }
        }
      }
      for (i = 0; i < keys2.length; i++) {
        var _key = keys2[i];
        if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
          return false;
        }
      }
      return true;
    }
    __name(objEquiv, "objEquiv");
    function isDeepEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kLoose);
    }
    __name(isDeepEqual, "isDeepEqual");
    function isDeepStrictEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kStrict);
    }
    __name(isDeepStrictEqual, "isDeepStrictEqual");
    module.exports = {
      isDeepEqual,
      isDeepStrictEqual
    };
  }
});
var require_assert = __commonJS2({
  "../../node_modules/assert-browserify/build/assert.js"(exports, module) {
    "use strict";
    init_define_process();
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    var _require = require_errors2();
    var _require$codes = _require.codes;
    var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
    var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var AssertionError = require_assertion_error();
    var _require2 = require_util();
    var inspect = _require2.inspect;
    var _require$types = require_util().types;
    var isPromise = _require$types.isPromise;
    var isRegExp = _require$types.isRegExp;
    var objectAssign = Object.assign ? Object.assign : require_es6_object_assign().assign;
    var objectIs = Object.is ? Object.is : require_object_is();
    var isDeepEqual;
    var isDeepStrictEqual;
    function lazyLoadComparison() {
      var comparison = require_comparisons();
      isDeepEqual = comparison.isDeepEqual;
      isDeepStrictEqual = comparison.isDeepStrictEqual;
    }
    __name(lazyLoadComparison, "lazyLoadComparison");
    var warned = false;
    var assert = module.exports = ok;
    var NO_EXCEPTION_SENTINEL = {};
    function innerFail(obj) {
      if (obj.message instanceof Error)
        throw obj.message;
      throw new AssertionError(obj);
    }
    __name(innerFail, "innerFail");
    function fail(actual, expected, message, operator, stackStartFn) {
      var argsLen = arguments.length;
      var internalMessage;
      if (argsLen === 0) {
        internalMessage = "Failed";
      } else if (argsLen === 1) {
        message = actual;
        actual = void 0;
      } else {
        if (warned === false) {
          warned = true;
          var warn = define_process_default.emitWarning ? define_process_default.emitWarning : console.warn.bind(console);
          warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
        }
        if (argsLen === 2)
          operator = "!=";
      }
      if (message instanceof Error)
        throw message;
      var errArgs = {
        actual,
        expected,
        operator: operator === void 0 ? "fail" : operator,
        stackStartFn: stackStartFn || fail
      };
      if (message !== void 0) {
        errArgs.message = message;
      }
      var err = new AssertionError(errArgs);
      if (internalMessage) {
        err.message = internalMessage;
        err.generatedMessage = true;
      }
      throw err;
    }
    __name(fail, "fail");
    assert.fail = fail;
    assert.AssertionError = AssertionError;
    function innerOk(fn, argLen, value, message) {
      if (!value) {
        var generatedMessage = false;
        if (argLen === 0) {
          generatedMessage = true;
          message = "No value argument passed to `assert.ok()`";
        } else if (message instanceof Error) {
          throw message;
        }
        var err = new AssertionError({
          actual: value,
          expected: true,
          message,
          operator: "==",
          stackStartFn: fn
        });
        err.generatedMessage = generatedMessage;
        throw err;
      }
    }
    __name(innerOk, "innerOk");
    function ok() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      innerOk.apply(void 0, [ok, args.length].concat(args));
    }
    __name(ok, "ok");
    assert.ok = ok;
    assert.equal = /* @__PURE__ */ __name(function equal(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual != expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "==",
          stackStartFn: equal
        });
      }
    }, "equal");
    assert.notEqual = /* @__PURE__ */ __name(function notEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual == expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "!=",
          stackStartFn: notEqual
        });
      }
    }, "notEqual");
    assert.deepEqual = /* @__PURE__ */ __name(function deepEqual2(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (!isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepEqual",
          stackStartFn: deepEqual2
        });
      }
    }, "deepEqual");
    assert.notDeepEqual = /* @__PURE__ */ __name(function notDeepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepEqual",
          stackStartFn: notDeepEqual
        });
      }
    }, "notDeepEqual");
    assert.deepStrictEqual = /* @__PURE__ */ __name(function deepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (!isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepStrictEqual",
          stackStartFn: deepStrictEqual
        });
      }
    }, "deepStrictEqual");
    assert.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepStrictEqual",
          stackStartFn: notDeepStrictEqual
        });
      }
    }
    __name(notDeepStrictEqual, "notDeepStrictEqual");
    assert.strictEqual = /* @__PURE__ */ __name(function strictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (!objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "strictEqual",
          stackStartFn: strictEqual
        });
      }
    }, "strictEqual");
    assert.notStrictEqual = /* @__PURE__ */ __name(function notStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notStrictEqual",
          stackStartFn: notStrictEqual
        });
      }
    }, "notStrictEqual");
    var Comparison = /* @__PURE__ */ __name(function Comparison2(obj, keys2, actual) {
      var _this = this;
      _classCallCheck(this, Comparison2);
      keys2.forEach(function(key) {
        if (key in obj) {
          if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && obj[key].test(actual[key])) {
            _this[key] = actual[key];
          } else {
            _this[key] = obj[key];
          }
        }
      });
    }, "Comparison");
    function compareExceptionKey(actual, expected, key, message, keys2, fn) {
      if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
        if (!message) {
          var a = new Comparison(actual, keys2);
          var b = new Comparison(expected, keys2, actual);
          var err = new AssertionError({
            actual: a,
            expected: b,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err.actual = actual;
          err.expected = expected;
          err.operator = fn.name;
          throw err;
        }
        innerFail({
          actual,
          expected,
          message,
          operator: fn.name,
          stackStartFn: fn
        });
      }
    }
    __name(compareExceptionKey, "compareExceptionKey");
    function expectedException(actual, expected, msg, fn) {
      if (typeof expected !== "function") {
        if (isRegExp(expected))
          return expected.test(actual);
        if (arguments.length === 2) {
          throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
        }
        if (_typeof(actual) !== "object" || actual === null) {
          var err = new AssertionError({
            actual,
            expected,
            message: msg,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err.operator = fn.name;
          throw err;
        }
        var keys2 = Object.keys(expected);
        if (expected instanceof Error) {
          keys2.push("name", "message");
        } else if (keys2.length === 0) {
          throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
        }
        if (isDeepEqual === void 0)
          lazyLoadComparison();
        keys2.forEach(function(key) {
          if (typeof actual[key] === "string" && isRegExp(expected[key]) && expected[key].test(actual[key])) {
            return;
          }
          compareExceptionKey(actual, expected, key, msg, keys2, fn);
        });
        return true;
      }
      if (expected.prototype !== void 0 && actual instanceof expected) {
        return true;
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    __name(expectedException, "expectedException");
    function getActual(fn) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
      }
      try {
        fn();
      } catch (e) {
        return e;
      }
      return NO_EXCEPTION_SENTINEL;
    }
    __name(getActual, "getActual");
    function checkIsPromise(obj) {
      return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
    }
    __name(checkIsPromise, "checkIsPromise");
    function waitForActual(promiseFn) {
      return Promise.resolve().then(function() {
        var resultPromise;
        if (typeof promiseFn === "function") {
          resultPromise = promiseFn();
          if (!checkIsPromise(resultPromise)) {
            throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
          }
        } else if (checkIsPromise(promiseFn)) {
          resultPromise = promiseFn;
        } else {
          throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
        }
        return Promise.resolve().then(function() {
          return resultPromise;
        }).then(function() {
          return NO_EXCEPTION_SENTINEL;
        }).catch(function(e) {
          return e;
        });
      });
    }
    __name(waitForActual, "waitForActual");
    function expectsError(stackStartFn, actual, error, message) {
      if (typeof error === "string") {
        if (arguments.length === 4) {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (_typeof(actual) === "object" && actual !== null) {
          if (actual.message === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
          }
        } else if (actual === error) {
          throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
        }
        message = error;
        error = void 0;
      } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
        throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
      }
      if (actual === NO_EXCEPTION_SENTINEL) {
        var details = "";
        if (error && error.name) {
          details += " (".concat(error.name, ")");
        }
        details += message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
        innerFail({
          actual: void 0,
          expected: error,
          operator: stackStartFn.name,
          message: "Missing expected ".concat(fnType).concat(details),
          stackStartFn
        });
      }
      if (error && !expectedException(actual, error, message, stackStartFn)) {
        throw actual;
      }
    }
    __name(expectsError, "expectsError");
    function expectsNoError(stackStartFn, actual, error, message) {
      if (actual === NO_EXCEPTION_SENTINEL)
        return;
      if (typeof error === "string") {
        message = error;
        error = void 0;
      }
      if (!error || expectedException(actual, error)) {
        var details = message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
        innerFail({
          actual,
          expected: error,
          operator: stackStartFn.name,
          message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
          stackStartFn
        });
      }
      throw actual;
    }
    __name(expectsNoError, "expectsNoError");
    assert.throws = /* @__PURE__ */ __name(function throws(promiseFn) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
    }, "throws");
    assert.rejects = /* @__PURE__ */ __name(function rejects(promiseFn) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return waitForActual(promiseFn).then(function(result) {
        return expectsError.apply(void 0, [rejects, result].concat(args));
      });
    }, "rejects");
    assert.doesNotThrow = /* @__PURE__ */ __name(function doesNotThrow(fn) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
    }, "doesNotThrow");
    assert.doesNotReject = /* @__PURE__ */ __name(function doesNotReject(fn) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return waitForActual(fn).then(function(result) {
        return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
      });
    }, "doesNotReject");
    assert.ifError = /* @__PURE__ */ __name(function ifError(err) {
      if (err !== null && err !== void 0) {
        var message = "ifError got unwanted exception: ";
        if (_typeof(err) === "object" && typeof err.message === "string") {
          if (err.message.length === 0 && err.constructor) {
            message += err.constructor.name;
          } else {
            message += err.message;
          }
        } else {
          message += inspect(err);
        }
        var newErr = new AssertionError({
          actual: err,
          expected: null,
          operator: "ifError",
          message,
          stackStartFn: ifError
        });
        var origStack = err.stack;
        if (typeof origStack === "string") {
          var tmp2 = origStack.split("\n");
          tmp2.shift();
          var tmp1 = newErr.stack.split("\n");
          for (var i = 0; i < tmp2.length; i++) {
            var pos = tmp1.indexOf(tmp2[i]);
            if (pos !== -1) {
              tmp1 = tmp1.slice(0, pos);
              break;
            }
          }
          newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
        }
        throw newErr;
      }
    }, "ifError");
    function strict() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      innerOk.apply(void 0, [strict, args.length].concat(args));
    }
    __name(strict, "strict");
    assert.strict = objectAssign(strict, assert, {
      equal: assert.strictEqual,
      deepEqual: assert.deepStrictEqual,
      notEqual: assert.notStrictEqual,
      notDeepEqual: assert.notDeepStrictEqual
    });
    assert.strict.strict = assert.strict;
  }
});
var require_b64 = __commonJS2({
  "../../node_modules/buffer-browserify/node_modules/base64-js/lib/b64.js"(exports) {
    init_define_process();
    var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    (function(exports2) {
      "use strict";
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var PLUS = "+".charCodeAt(0);
      var SLASH = "/".charCodeAt(0);
      var NUMBER = "0".charCodeAt(0);
      var LOWER = "a".charCodeAt(0);
      var UPPER = "A".charCodeAt(0);
      var PLUS_URL_SAFE = "-".charCodeAt(0);
      var SLASH_URL_SAFE = "_".charCodeAt(0);
      function decode(elt) {
        var code = elt.charCodeAt(0);
        if (code === PLUS || code === PLUS_URL_SAFE)
          return 62;
        if (code === SLASH || code === SLASH_URL_SAFE)
          return 63;
        if (code < NUMBER)
          return -1;
        if (code < NUMBER + 10)
          return code - NUMBER + 26 + 26;
        if (code < UPPER + 26)
          return code - UPPER;
        if (code < LOWER + 26)
          return code - LOWER + 26;
      }
      __name(decode, "decode");
      function b64ToByteArray(b64) {
        var i, j, l, tmp, placeHolders, arr;
        if (b64.length % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var len = b64.length;
        placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0;
        arr = new Arr(b64.length * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? b64.length - 4 : b64.length;
        var L = 0;
        function push(v) {
          arr[L++] = v;
        }
        __name(push, "push");
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
          push((tmp & 16711680) >> 16);
          push((tmp & 65280) >> 8);
          push(tmp & 255);
        }
        if (placeHolders === 2) {
          tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
          push(tmp & 255);
        } else if (placeHolders === 1) {
          tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
          push(tmp >> 8 & 255);
          push(tmp & 255);
        }
        return arr;
      }
      __name(b64ToByteArray, "b64ToByteArray");
      function uint8ToBase64(uint8) {
        var i, extraBytes = uint8.length % 3, output = "", temp, length;
        function encode(num) {
          return lookup.charAt(num);
        }
        __name(encode, "encode");
        function tripletToBase64(num) {
          return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(num & 63);
        }
        __name(tripletToBase64, "tripletToBase64");
        for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
          temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output += tripletToBase64(temp);
        }
        switch (extraBytes) {
          case 1:
            temp = uint8[uint8.length - 1];
            output += encode(temp >> 2);
            output += encode(temp << 4 & 63);
            output += "==";
            break;
          case 2:
            temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
            output += encode(temp >> 10);
            output += encode(temp >> 4 & 63);
            output += encode(temp << 2 & 63);
            output += "=";
            break;
        }
        return output;
      }
      __name(uint8ToBase64, "uint8ToBase64");
      exports2.toByteArray = b64ToByteArray;
      exports2.fromByteArray = uint8ToBase64;
    })(typeof exports === "undefined" ? exports.base64js = {} : exports);
  }
});
var require_buffer_ieee754 = __commonJS2({
  "../../node_modules/buffer-browserify/buffer_ieee754.js"(exports) {
    init_define_process();
    exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
      var e, m, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isBE ? 0 : nBytes - 1, d = isBE ? 1 : -1, s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
        ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
        ;
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
      var e, m, c, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isBE ? nBytes - 1 : 0, d = isBE ? -1 : 1, s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8)
        ;
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8)
        ;
      buffer[offset + i - d] |= s * 128;
    };
  }
});
var require_buffer_browserify = __commonJS2({
  "../../node_modules/buffer-browserify/index.js"(exports) {
    init_define_process();
    var assert;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = Buffer2;
    Buffer2.poolSize = 8192;
    exports.INSPECT_MAX_BYTES = 50;
    function stringtrim(str) {
      if (str.trim)
        return str.trim();
      return str.replace(/^\s+|\s+$/g, "");
    }
    __name(stringtrim, "stringtrim");
    function Buffer2(subject, encoding, offset) {
      if (!assert)
        assert = require_assert();
      if (!(this instanceof Buffer2)) {
        return new Buffer2(subject, encoding, offset);
      }
      this.parent = this;
      this.offset = 0;
      if (encoding == "base64" && typeof subject == "string") {
        subject = stringtrim(subject);
        while (subject.length % 4 != 0) {
          subject = subject + "=";
        }
      }
      var type;
      if (typeof offset === "number") {
        this.length = coerce(encoding);
        for (var i = 0; i < this.length; i++) {
          this[i] = subject.get(i + offset);
        }
      } else {
        switch (type = typeof subject) {
          case "number":
            this.length = coerce(subject);
            break;
          case "string":
            this.length = Buffer2.byteLength(subject, encoding);
            break;
          case "object":
            this.length = coerce(subject.length);
            break;
          default:
            throw new TypeError("First argument needs to be a number, array or string.");
        }
        if (isArrayIsh(subject)) {
          for (var i = 0; i < this.length; i++) {
            if (subject instanceof Buffer2) {
              this[i] = subject.readUInt8(i);
            } else {
              this[i] = (subject[i] % 256 + 256) % 256;
            }
          }
        } else if (type == "string") {
          this.length = this.write(subject, 0, encoding);
        } else if (type === "number") {
          for (var i = 0; i < this.length; i++) {
            this[i] = 0;
          }
        }
      }
    }
    __name(Buffer2, "Buffer");
    Buffer2.prototype.get = /* @__PURE__ */ __name(function get11(i) {
      if (i < 0 || i >= this.length)
        throw new Error("oob");
      return this[i];
    }, "get");
    Buffer2.prototype.set = /* @__PURE__ */ __name(function set3(i, v) {
      if (i < 0 || i >= this.length)
        throw new Error("oob");
      return this[i] = v;
    }, "set");
    Buffer2.byteLength = function(str, encoding) {
      switch (encoding || "utf8") {
        case "hex":
          return str.length / 2;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(str).length;
        case "ascii":
        case "binary":
          return str.length;
        case "base64":
          return base64ToBytes(str).length;
        default:
          throw new Error("Unknown encoding");
      }
    };
    Buffer2.prototype.utf8Write = function(string, offset, length) {
      var bytes, pos;
      return Buffer2._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length);
    };
    Buffer2.prototype.asciiWrite = function(string, offset, length) {
      var bytes, pos;
      return Buffer2._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length);
    };
    Buffer2.prototype.binaryWrite = Buffer2.prototype.asciiWrite;
    Buffer2.prototype.base64Write = function(string, offset, length) {
      var bytes, pos;
      return Buffer2._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
    };
    Buffer2.prototype.base64Slice = function(start, end) {
      var bytes = Array.prototype.slice.apply(this, arguments);
      return require_b64().fromByteArray(bytes);
    };
    Buffer2.prototype.utf8Slice = function() {
      var bytes = Array.prototype.slice.apply(this, arguments);
      var res = "";
      var tmp = "";
      var i = 0;
      while (i < bytes.length) {
        if (bytes[i] <= 127) {
          res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
          tmp = "";
        } else
          tmp += "%" + bytes[i].toString(16);
        i++;
      }
      return res + decodeUtf8Char(tmp);
    };
    Buffer2.prototype.asciiSlice = function() {
      var bytes = Array.prototype.slice.apply(this, arguments);
      var ret = "";
      for (var i = 0; i < bytes.length; i++)
        ret += String.fromCharCode(bytes[i]);
      return ret;
    };
    Buffer2.prototype.binarySlice = Buffer2.prototype.asciiSlice;
    Buffer2.prototype.inspect = function() {
      var out = [], len = this.length;
      for (var i = 0; i < len; i++) {
        out[i] = toHex(this[i]);
        if (i == exports.INSPECT_MAX_BYTES) {
          out[i + 1] = "...";
          break;
        }
      }
      return "<Buffer " + out.join(" ") + ">";
    };
    Buffer2.prototype.hexSlice = function(start, end) {
      var len = this.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      var out = "";
      for (var i = start; i < end; i++) {
        out += toHex(this[i]);
      }
      return out;
    };
    Buffer2.prototype.toString = function(encoding, start, end) {
      encoding = String(encoding || "utf8").toLowerCase();
      start = +start || 0;
      if (typeof end == "undefined")
        end = this.length;
      if (+end == start) {
        return "";
      }
      switch (encoding) {
        case "hex":
          return this.hexSlice(start, end);
        case "utf8":
        case "utf-8":
          return this.utf8Slice(start, end);
        case "ascii":
          return this.asciiSlice(start, end);
        case "binary":
          return this.binarySlice(start, end);
        case "base64":
          return this.base64Slice(start, end);
        case "ucs2":
        case "ucs-2":
          return this.ucs2Slice(start, end);
        default:
          throw new Error("Unknown encoding");
      }
    };
    Buffer2.prototype.hexWrite = function(string, offset, length) {
      offset = +offset || 0;
      var remaining = this.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = +length;
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (strLen % 2) {
        throw new Error("Invalid hex string");
      }
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; i++) {
        var b = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(b))
          throw new Error("Invalid hex string");
        this[offset + i] = b;
      }
      Buffer2._charsWritten = i * 2;
      return i;
    };
    Buffer2.prototype.write = function(string, offset, length, encoding) {
      if (isFinite(offset)) {
        if (!isFinite(length)) {
          encoding = length;
          length = void 0;
        }
      } else {
        var swap = encoding;
        encoding = offset;
        offset = length;
        length = swap;
      }
      offset = +offset || 0;
      var remaining = this.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = +length;
        if (length > remaining) {
          length = remaining;
        }
      }
      encoding = String(encoding || "utf8").toLowerCase();
      switch (encoding) {
        case "hex":
          return this.hexWrite(string, offset, length);
        case "utf8":
        case "utf-8":
          return this.utf8Write(string, offset, length);
        case "ascii":
          return this.asciiWrite(string, offset, length);
        case "binary":
          return this.binaryWrite(string, offset, length);
        case "base64":
          return this.base64Write(string, offset, length);
        case "ucs2":
        case "ucs-2":
          return this.ucs2Write(string, offset, length);
        default:
          throw new Error("Unknown encoding");
      }
    };
    function clamp(index, len, defaultValue) {
      if (typeof index !== "number")
        return defaultValue;
      index = ~~index;
      if (index >= len)
        return len;
      if (index >= 0)
        return index;
      index += len;
      if (index >= 0)
        return index;
      return 0;
    }
    __name(clamp, "clamp");
    Buffer2.prototype.slice = function(start, end) {
      var len = this.length;
      start = clamp(start, len, 0);
      end = clamp(end, len, len);
      return new Buffer2(this, end - start, +start);
    };
    Buffer2.prototype.copy = function(target, target_start, start, end) {
      var source = this;
      start || (start = 0);
      if (end === void 0 || isNaN(end)) {
        end = this.length;
      }
      target_start || (target_start = 0);
      if (end < start)
        throw new Error("sourceEnd < sourceStart");
      if (end === start)
        return 0;
      if (target.length == 0 || source.length == 0)
        return 0;
      if (target_start < 0 || target_start >= target.length) {
        throw new Error("targetStart out of bounds");
      }
      if (start < 0 || start >= source.length) {
        throw new Error("sourceStart out of bounds");
      }
      if (end < 0 || end > source.length) {
        throw new Error("sourceEnd out of bounds");
      }
      if (end > this.length) {
        end = this.length;
      }
      if (target.length - target_start < end - start) {
        end = target.length - target_start + start;
      }
      var temp = [];
      for (var i = start; i < end; i++) {
        assert.ok(typeof this[i] !== "undefined", "copying undefined buffer bytes!");
        temp.push(this[i]);
      }
      for (var i = target_start; i < target_start + temp.length; i++) {
        target[i] = temp[i - target_start];
      }
    };
    Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(value, start, end) {
      value || (value = 0);
      start || (start = 0);
      end || (end = this.length);
      if (typeof value === "string") {
        value = value.charCodeAt(0);
      }
      if (!(typeof value === "number") || isNaN(value)) {
        throw new Error("value is not a number");
      }
      if (end < start)
        throw new Error("end < start");
      if (end === start)
        return 0;
      if (this.length == 0)
        return 0;
      if (start < 0 || start >= this.length) {
        throw new Error("start out of bounds");
      }
      if (end < 0 || end > this.length) {
        throw new Error("end out of bounds");
      }
      for (var i = start; i < end; i++) {
        this[i] = value;
      }
    }, "fill");
    Buffer2.isBuffer = /* @__PURE__ */ __name(function isBuffer(b) {
      return b instanceof Buffer2;
    }, "isBuffer");
    Buffer2.concat = function(list, totalLength) {
      if (!isArray(list)) {
        throw new Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.");
      }
      if (list.length === 0) {
        return new Buffer2(0);
      } else if (list.length === 1) {
        return list[0];
      }
      if (typeof totalLength !== "number") {
        totalLength = 0;
        for (var i = 0; i < list.length; i++) {
          var buf = list[i];
          totalLength += buf.length;
        }
      }
      var buffer = new Buffer2(totalLength);
      var pos = 0;
      for (var i = 0; i < list.length; i++) {
        var buf = list[i];
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.isEncoding = function(encoding) {
      switch ((encoding + "").toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function coerce(length) {
      length = ~~Math.ceil(+length);
      return length < 0 ? 0 : length;
    }
    __name(coerce, "coerce");
    function isArray(subject) {
      return (Array.isArray || function(subject2) {
        return {}.toString.apply(subject2) == "[object Array]";
      })(subject);
    }
    __name(isArray, "isArray");
    function isArrayIsh(subject) {
      return isArray(subject) || Buffer2.isBuffer(subject) || subject && typeof subject === "object" && typeof subject.length === "number";
    }
    __name(isArrayIsh, "isArrayIsh");
    function toHex(n) {
      if (n < 16)
        return "0" + n.toString(16);
      return n.toString(16);
    }
    __name(toHex, "toHex");
    function utf8ToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; i++)
        if (str.charCodeAt(i) <= 127)
          byteArray.push(str.charCodeAt(i));
        else {
          var h = encodeURIComponent(str.charAt(i)).substr(1).split("%");
          for (var j = 0; j < h.length; j++)
            byteArray.push(parseInt(h[j], 16));
        }
      return byteArray;
    }
    __name(utf8ToBytes, "utf8ToBytes");
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; i++)
        byteArray.push(str.charCodeAt(i) & 255);
      return byteArray;
    }
    __name(asciiToBytes, "asciiToBytes");
    function base64ToBytes(str) {
      return require_b64().toByteArray(str);
    }
    __name(base64ToBytes, "base64ToBytes");
    function blitBuffer(src, dst, offset, length) {
      var pos, i = 0;
      while (i < length) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
        i++;
      }
      return i;
    }
    __name(blitBuffer, "blitBuffer");
    function decodeUtf8Char(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return String.fromCharCode(65533);
      }
    }
    __name(decodeUtf8Char, "decodeUtf8Char");
    Buffer2.prototype.readUInt8 = function(offset, noAssert) {
      var buffer = this;
      if (!noAssert) {
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      if (offset >= buffer.length)
        return;
      return buffer[offset];
    };
    function readUInt16(buffer, offset, isBigEndian, noAssert) {
      var val = 0;
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 1 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      if (offset >= buffer.length)
        return 0;
      if (isBigEndian) {
        val = buffer[offset] << 8;
        if (offset + 1 < buffer.length) {
          val |= buffer[offset + 1];
        }
      } else {
        val = buffer[offset];
        if (offset + 1 < buffer.length) {
          val |= buffer[offset + 1] << 8;
        }
      }
      return val;
    }
    __name(readUInt16, "readUInt16");
    Buffer2.prototype.readUInt16LE = function(offset, noAssert) {
      return readUInt16(this, offset, false, noAssert);
    };
    Buffer2.prototype.readUInt16BE = function(offset, noAssert) {
      return readUInt16(this, offset, true, noAssert);
    };
    function readUInt32(buffer, offset, isBigEndian, noAssert) {
      var val = 0;
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      if (offset >= buffer.length)
        return 0;
      if (isBigEndian) {
        if (offset + 1 < buffer.length)
          val = buffer[offset + 1] << 16;
        if (offset + 2 < buffer.length)
          val |= buffer[offset + 2] << 8;
        if (offset + 3 < buffer.length)
          val |= buffer[offset + 3];
        val = val + (buffer[offset] << 24 >>> 0);
      } else {
        if (offset + 2 < buffer.length)
          val = buffer[offset + 2] << 16;
        if (offset + 1 < buffer.length)
          val |= buffer[offset + 1] << 8;
        val |= buffer[offset];
        if (offset + 3 < buffer.length)
          val = val + (buffer[offset + 3] << 24 >>> 0);
      }
      return val;
    }
    __name(readUInt32, "readUInt32");
    Buffer2.prototype.readUInt32LE = function(offset, noAssert) {
      return readUInt32(this, offset, false, noAssert);
    };
    Buffer2.prototype.readUInt32BE = function(offset, noAssert) {
      return readUInt32(this, offset, true, noAssert);
    };
    Buffer2.prototype.readInt8 = function(offset, noAssert) {
      var buffer = this;
      var neg2;
      if (!noAssert) {
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      if (offset >= buffer.length)
        return;
      neg2 = buffer[offset] & 128;
      if (!neg2) {
        return buffer[offset];
      }
      return (255 - buffer[offset] + 1) * -1;
    };
    function readInt16(buffer, offset, isBigEndian, noAssert) {
      var neg2, val;
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 1 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      val = readUInt16(buffer, offset, isBigEndian, noAssert);
      neg2 = val & 32768;
      if (!neg2) {
        return val;
      }
      return (65535 - val + 1) * -1;
    }
    __name(readInt16, "readInt16");
    Buffer2.prototype.readInt16LE = function(offset, noAssert) {
      return readInt16(this, offset, false, noAssert);
    };
    Buffer2.prototype.readInt16BE = function(offset, noAssert) {
      return readInt16(this, offset, true, noAssert);
    };
    function readInt32(buffer, offset, isBigEndian, noAssert) {
      var neg2, val;
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      val = readUInt32(buffer, offset, isBigEndian, noAssert);
      neg2 = val & 2147483648;
      if (!neg2) {
        return val;
      }
      return (4294967295 - val + 1) * -1;
    }
    __name(readInt32, "readInt32");
    Buffer2.prototype.readInt32LE = function(offset, noAssert) {
      return readInt32(this, offset, false, noAssert);
    };
    Buffer2.prototype.readInt32BE = function(offset, noAssert) {
      return readInt32(this, offset, true, noAssert);
    };
    function readFloat(buffer, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      return require_buffer_ieee754().readIEEE754(
        buffer,
        offset,
        isBigEndian,
        23,
        4
      );
    }
    __name(readFloat, "readFloat");
    Buffer2.prototype.readFloatLE = function(offset, noAssert) {
      return readFloat(this, offset, false, noAssert);
    };
    Buffer2.prototype.readFloatBE = function(offset, noAssert) {
      return readFloat(this, offset, true, noAssert);
    };
    function readDouble(buffer, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset + 7 < buffer.length,
          "Trying to read beyond buffer length"
        );
      }
      return require_buffer_ieee754().readIEEE754(
        buffer,
        offset,
        isBigEndian,
        52,
        8
      );
    }
    __name(readDouble, "readDouble");
    Buffer2.prototype.readDoubleLE = function(offset, noAssert) {
      return readDouble(this, offset, false, noAssert);
    };
    Buffer2.prototype.readDoubleBE = function(offset, noAssert) {
      return readDouble(this, offset, true, noAssert);
    };
    function verifuint(value, max2) {
      assert.ok(
        typeof value == "number",
        "cannot write a non-number as a number"
      );
      assert.ok(
        value >= 0,
        "specified a negative value for writing an unsigned value"
      );
      assert.ok(value <= max2, "value is larger than maximum value for type");
      assert.ok(Math.floor(value) === value, "value has a fractional component");
    }
    __name(verifuint, "verifuint");
    Buffer2.prototype.writeUInt8 = function(value, offset, noAssert) {
      var buffer = this;
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset < buffer.length,
          "trying to write beyond buffer length"
        );
        verifuint(value, 255);
      }
      if (offset < buffer.length) {
        buffer[offset] = value;
      }
    };
    function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 1 < buffer.length,
          "trying to write beyond buffer length"
        );
        verifuint(value, 65535);
      }
      for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
        buffer[offset + i] = (value & 255 << 8 * (isBigEndian ? 1 - i : i)) >>> (isBigEndian ? 1 - i : i) * 8;
      }
    }
    __name(writeUInt16, "writeUInt16");
    Buffer2.prototype.writeUInt16LE = function(value, offset, noAssert) {
      writeUInt16(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeUInt16BE = function(value, offset, noAssert) {
      writeUInt16(this, value, offset, true, noAssert);
    };
    function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "trying to write beyond buffer length"
        );
        verifuint(value, 4294967295);
      }
      for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
        buffer[offset + i] = value >>> (isBigEndian ? 3 - i : i) * 8 & 255;
      }
    }
    __name(writeUInt32, "writeUInt32");
    Buffer2.prototype.writeUInt32LE = function(value, offset, noAssert) {
      writeUInt32(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeUInt32BE = function(value, offset, noAssert) {
      writeUInt32(this, value, offset, true, noAssert);
    };
    function verifsint(value, max2, min2) {
      assert.ok(
        typeof value == "number",
        "cannot write a non-number as a number"
      );
      assert.ok(value <= max2, "value larger than maximum allowed value");
      assert.ok(value >= min2, "value smaller than minimum allowed value");
      assert.ok(Math.floor(value) === value, "value has a fractional component");
    }
    __name(verifsint, "verifsint");
    function verifIEEE754(value, max2, min2) {
      assert.ok(
        typeof value == "number",
        "cannot write a non-number as a number"
      );
      assert.ok(value <= max2, "value larger than maximum allowed value");
      assert.ok(value >= min2, "value smaller than minimum allowed value");
    }
    __name(verifIEEE754, "verifIEEE754");
    Buffer2.prototype.writeInt8 = function(value, offset, noAssert) {
      var buffer = this;
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset < buffer.length,
          "Trying to write beyond buffer length"
        );
        verifsint(value, 127, -128);
      }
      if (value >= 0) {
        buffer.writeUInt8(value, offset, noAssert);
      } else {
        buffer.writeUInt8(255 + value + 1, offset, noAssert);
      }
    };
    function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 1 < buffer.length,
          "Trying to write beyond buffer length"
        );
        verifsint(value, 32767, -32768);
      }
      if (value >= 0) {
        writeUInt16(buffer, value, offset, isBigEndian, noAssert);
      } else {
        writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert);
      }
    }
    __name(writeInt16, "writeInt16");
    Buffer2.prototype.writeInt16LE = function(value, offset, noAssert) {
      writeInt16(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeInt16BE = function(value, offset, noAssert) {
      writeInt16(this, value, offset, true, noAssert);
    };
    function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "Trying to write beyond buffer length"
        );
        verifsint(value, 2147483647, -2147483648);
      }
      if (value >= 0) {
        writeUInt32(buffer, value, offset, isBigEndian, noAssert);
      } else {
        writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert);
      }
    }
    __name(writeInt32, "writeInt32");
    Buffer2.prototype.writeInt32LE = function(value, offset, noAssert) {
      writeInt32(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeInt32BE = function(value, offset, noAssert) {
      writeInt32(this, value, offset, true, noAssert);
    };
    function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 3 < buffer.length,
          "Trying to write beyond buffer length"
        );
        verifIEEE754(value, 34028234663852886e22, -34028234663852886e22);
      }
      require_buffer_ieee754().writeIEEE754(
        buffer,
        value,
        offset,
        isBigEndian,
        23,
        4
      );
    }
    __name(writeFloat, "writeFloat");
    Buffer2.prototype.writeFloatLE = function(value, offset, noAssert) {
      writeFloat(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function(value, offset, noAssert) {
      writeFloat(this, value, offset, true, noAssert);
    };
    function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
      if (!noAssert) {
        assert.ok(
          value !== void 0 && value !== null,
          "missing value"
        );
        assert.ok(
          typeof isBigEndian === "boolean",
          "missing or invalid endian"
        );
        assert.ok(
          offset !== void 0 && offset !== null,
          "missing offset"
        );
        assert.ok(
          offset + 7 < buffer.length,
          "Trying to write beyond buffer length"
        );
        verifIEEE754(value, 17976931348623157e292, -17976931348623157e292);
      }
      require_buffer_ieee754().writeIEEE754(
        buffer,
        value,
        offset,
        isBigEndian,
        52,
        8
      );
    }
    __name(writeDouble, "writeDouble");
    Buffer2.prototype.writeDoubleLE = function(value, offset, noAssert) {
      writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function(value, offset, noAssert) {
      writeDouble(this, value, offset, true, noAssert);
    };
  }
});
var require_buffer = __commonJS2({
  "../../node_modules/memfs/lib/internal/buffer.js"(exports) {
    "use strict";
    init_define_process();
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bufferFrom = exports.bufferAllocUnsafe = exports.Buffer = void 0;
    var buffer_1 = require_buffer_browserify();
    Object.defineProperty(exports, "Buffer", { enumerable: true, get: function() {
      return buffer_1.Buffer;
    } });
    function bufferV0P12Ponyfill(arg0) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return new (buffer_1.Buffer.bind.apply(buffer_1.Buffer, __spreadArray([void 0, arg0], args, false)))();
    }
    __name(bufferV0P12Ponyfill, "bufferV0P12Ponyfill");
    var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
    exports.bufferAllocUnsafe = bufferAllocUnsafe;
    var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
    exports.bufferFrom = bufferFrom;
  }
});
var require_errors3 = __commonJS2({
  "../../node_modules/memfs/lib/internal/errors.js"(exports) {
    "use strict";
    init_define_process();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p2 in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p2))
              d2[p2] = b2[p2];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.E = exports.AssertionError = exports.message = exports.RangeError = exports.TypeError = exports.Error = void 0;
    var assert = require_assert();
    var util = require_util();
    var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
    var messages = {};
    function makeNodeError(Base) {
      return function(_super) {
        __extends(NodeError, _super);
        function NodeError(key) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }
          var _this = _super.call(this, message(key, args)) || this;
          _this.code = key;
          _this[kCode] = key;
          _this.name = "".concat(_super.prototype.name, " [").concat(_this[kCode], "]");
          return _this;
        }
        __name(NodeError, "NodeError");
        return NodeError;
      }(Base);
    }
    __name(makeNodeError, "makeNodeError");
    var g = typeof globalThis !== "undefined" ? globalThis : globalThis;
    var AssertionError = function(_super) {
      __extends(AssertionError2, _super);
      function AssertionError2(options) {
        var _this = this;
        if (typeof options !== "object" || options === null) {
          throw new exports.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
        }
        if (options.message) {
          _this = _super.call(this, options.message) || this;
        } else {
          _this = _super.call(this, "".concat(util.inspect(options.actual).slice(0, 128), " ") + "".concat(options.operator, " ").concat(util.inspect(options.expected).slice(0, 128))) || this;
        }
        _this.generatedMessage = !options.message;
        _this.name = "AssertionError [ERR_ASSERTION]";
        _this.code = "ERR_ASSERTION";
        _this.actual = options.actual;
        _this.expected = options.expected;
        _this.operator = options.operator;
        exports.Error.captureStackTrace(_this, options.stackStartFunction);
        return _this;
      }
      __name(AssertionError2, "AssertionError");
      return AssertionError2;
    }(g.Error);
    exports.AssertionError = AssertionError;
    function message(key, args) {
      assert.strictEqual(typeof key, "string");
      var msg = messages[key];
      assert(msg, "An invalid error message key was used: ".concat(key, "."));
      var fmt;
      if (typeof msg === "function") {
        fmt = msg;
      } else {
        fmt = util.format;
        if (args === void 0 || args.length === 0)
          return msg;
        args.unshift(msg);
      }
      return String(fmt.apply(null, args));
    }
    __name(message, "message");
    exports.message = message;
    function E(sym, val) {
      messages[sym] = typeof val === "function" ? val : String(val);
    }
    __name(E, "E");
    exports.E = E;
    exports.Error = makeNodeError(g.Error);
    exports.TypeError = makeNodeError(g.TypeError);
    exports.RangeError = makeNodeError(g.RangeError);
    E("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
    E("ERR_ASSERTION", "%s");
    E("ERR_BUFFER_OUT_OF_BOUNDS", bufferOutOfBounds);
    E("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
    E("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
    E("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
    E("ERR_DNS_SET_SERVERS_FAILED", function(err, servers) {
      return 'c-ares failed to set servers: "'.concat(err, '" [').concat(servers, "]");
    });
    E("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
    E("ERR_ENCODING_NOT_SUPPORTED", function(enc) {
      return 'The "'.concat(enc, '" encoding is not supported');
    });
    E("ERR_ENCODING_INVALID_ENCODED_DATA", function(enc) {
      return "The encoded data was not valid for encoding ".concat(enc);
    });
    E("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
    E("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
    E("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
    E("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
    E("ERR_INVALID_ARG_TYPE", invalidArgType);
    E("ERR_INVALID_ARRAY_LENGTH", function(name, len, actual) {
      assert.strictEqual(typeof actual, "number");
      return 'The array "'.concat(name, '" (length ').concat(actual, ") must be of length ").concat(len, ".");
    });
    E("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
    E("ERR_INVALID_CALLBACK", "Callback must be a function");
    E("ERR_INVALID_CHAR", "Invalid character in %s");
    E("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
    E("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
    E("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
    E("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
    E("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
    E("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
    E("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "'.concat(String(value), '" is invalid for option "').concat(name, '"');
    });
    E("ERR_INVALID_OPT_VALUE_ENCODING", function(value) {
      return 'The value "'.concat(String(value), '" is invalid for option "encoding"');
    });
    E("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
    E("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
    E("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
    E("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
    E("ERR_INVALID_URL", "Invalid URL: %s");
    E("ERR_INVALID_URL_SCHEME", function(expected) {
      return "The URL must be ".concat(oneOf(expected, "scheme"));
    });
    E("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
    E("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
    E("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
    E("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
    E("ERR_MISSING_ARGS", missingArgs);
    E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    E("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
    E("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
    E("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
    E("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
    E("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
    E("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
    E("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
    E("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
    E("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
    E("ERR_SOCKET_CLOSED", "Socket is closed");
    E("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
    E("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
    E("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
    E("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
    E("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
    E("ERR_TLS_DH_PARAM_SIZE", function(size) {
      return "DH parameter size ".concat(size, " is less than 2048");
    });
    E("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
    E("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
    E("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
    E("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
    E("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
    E("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
    E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
    E("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
    E("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
    E("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
    E("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
    function invalidArgType(name, expected, actual) {
      assert(name, "name is required");
      var determiner;
      if (expected.includes("not ")) {
        determiner = "must not be";
        expected = expected.split("not ")[1];
      } else {
        determiner = "must be";
      }
      var msg;
      if (Array.isArray(name)) {
        var names = name.map(function(val) {
          return '"'.concat(val, '"');
        }).join(", ");
        msg = "The ".concat(names, " arguments ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else if (name.includes(" argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = name.includes(".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      if (arguments.length >= 3) {
        msg += ". Received type ".concat(actual !== null ? typeof actual : "null");
      }
      return msg;
    }
    __name(invalidArgType, "invalidArgType");
    function missingArgs() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      assert(args.length > 0, "At least one arg needs to be specified");
      var msg = "The ";
      var len = args.length;
      args = args.map(function(a) {
        return '"'.concat(a, '"');
      });
      switch (len) {
        case 1:
          msg += "".concat(args[0], " argument");
          break;
        case 2:
          msg += "".concat(args[0], " and ").concat(args[1], " arguments");
          break;
        default:
          msg += args.slice(0, len - 1).join(", ");
          msg += ", and ".concat(args[len - 1], " arguments");
          break;
      }
      return "".concat(msg, " must be specified");
    }
    __name(missingArgs, "missingArgs");
    function oneOf(expected, thing) {
      assert(expected, "expected is required");
      assert(typeof thing === "string", "thing is required");
      if (Array.isArray(expected)) {
        var len = expected.length;
        assert(len > 0, "At least one expected value needs to be specified");
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    __name(oneOf, "oneOf");
    function bufferOutOfBounds(name, isWriting) {
      if (isWriting) {
        return "Attempt to write outside buffer bounds";
      } else {
        return '"'.concat(name, '" is outside of buffer bounds');
      }
    }
    __name(bufferOutOfBounds, "bufferOutOfBounds");
  }
});
var require_encoding = __commonJS2({
  "../../node_modules/memfs/lib/encoding.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.strToEncoding = exports.assertEncoding = exports.ENCODING_UTF8 = void 0;
    var buffer_1 = require_buffer();
    var errors = require_errors3();
    exports.ENCODING_UTF8 = "utf8";
    function assertEncoding(encoding) {
      if (encoding && !buffer_1.Buffer.isEncoding(encoding))
        throw new errors.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
    }
    __name(assertEncoding, "assertEncoding");
    exports.assertEncoding = assertEncoding;
    function strToEncoding(str, encoding) {
      if (!encoding || encoding === exports.ENCODING_UTF8)
        return str;
      if (encoding === "buffer")
        return new buffer_1.Buffer(str);
      return new buffer_1.Buffer(str).toString(encoding);
    }
    __name(strToEncoding, "strToEncoding");
    exports.strToEncoding = strToEncoding;
  }
});
var require_Dirent = __commonJS2({
  "../../node_modules/memfs/lib/Dirent.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dirent = void 0;
    var constants_1 = require_constants();
    var encoding_1 = require_encoding();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFBLK = constants_1.constants.S_IFBLK;
    var S_IFCHR = constants_1.constants.S_IFCHR;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var S_IFIFO = constants_1.constants.S_IFIFO;
    var S_IFSOCK = constants_1.constants.S_IFSOCK;
    var Dirent = function() {
      function Dirent2() {
        this.name = "";
        this.mode = 0;
      }
      __name(Dirent2, "Dirent");
      Dirent2.build = function(link, encoding) {
        var dirent = new Dirent2();
        var mode = link.getNode().mode;
        dirent.name = (0, encoding_1.strToEncoding)(link.getName(), encoding);
        dirent.mode = mode;
        return dirent;
      };
      Dirent2.prototype._checkModeProperty = function(property) {
        return (this.mode & S_IFMT) === property;
      };
      Dirent2.prototype.isDirectory = function() {
        return this._checkModeProperty(S_IFDIR);
      };
      Dirent2.prototype.isFile = function() {
        return this._checkModeProperty(S_IFREG);
      };
      Dirent2.prototype.isBlockDevice = function() {
        return this._checkModeProperty(S_IFBLK);
      };
      Dirent2.prototype.isCharacterDevice = function() {
        return this._checkModeProperty(S_IFCHR);
      };
      Dirent2.prototype.isSymbolicLink = function() {
        return this._checkModeProperty(S_IFLNK);
      };
      Dirent2.prototype.isFIFO = function() {
        return this._checkModeProperty(S_IFIFO);
      };
      Dirent2.prototype.isSocket = function() {
        return this._checkModeProperty(S_IFSOCK);
      };
      return Dirent2;
    }();
    exports.Dirent = Dirent;
    exports.default = Dirent;
  }
});
var require_path_browserify = __commonJS2({
  "../../node_modules/path-browserify/index.js"(exports, module) {
    "use strict";
    init_define_process();
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    __name(assertPath, "assertPath");
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length)
          code = path.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path.slice(lastSlash + 1, i);
            else
              res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    __name(normalizeStringPosix, "normalizeStringPosix");
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    __name(_format, "_format");
    var posix = {
      resolve: /* @__PURE__ */ __name(function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd === void 0)
              cwd = define_process_default.cwd();
            path = cwd;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      }, "resolve"),
      normalize: /* @__PURE__ */ __name(function normalize(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
          path = ".";
        if (path.length > 0 && trailingSeparator)
          path += "/";
        if (isAbsolute)
          return "/" + path;
        return path;
      }, "normalize"),
      isAbsolute: /* @__PURE__ */ __name(function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      }, "isAbsolute"),
      join: /* @__PURE__ */ __name(function join2() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      }, "join"),
      relative: /* @__PURE__ */ __name(function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      }, "relative"),
      _makeLong: /* @__PURE__ */ __name(function _makeLong(path) {
        return path;
      }, "_makeLong"),
      dirname: /* @__PURE__ */ __name(function dirname(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path.slice(0, end);
      }, "dirname"),
      basename: /* @__PURE__ */ __name(function basename(path, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
      }, "basename"),
      extname: /* @__PURE__ */ __name(function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      }, "extname"),
      format: /* @__PURE__ */ __name(function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      }, "format"),
      parse: /* @__PURE__ */ __name(function parse(path) {
        assertPath(path);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
          return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path.slice(1, end);
            else
              ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      }, "parse"),
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});
var require_browser22 = __commonJS2({
  "../../node_modules/process/browser.js"(exports, module) {
    init_define_process();
    var process2 = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    __name(defaultSetTimout, "defaultSetTimout");
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    __name(defaultClearTimeout, "defaultClearTimeout");
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    __name(runTimeout, "runTimeout");
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    __name(runClearTimeout, "runClearTimeout");
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    __name(cleanUpNextTick, "cleanUpNextTick");
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    __name(drainQueue, "drainQueue");
    process2.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    __name(Item, "Item");
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {
    }
    __name(noop, "noop");
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function(name) {
      return [];
    };
    process2.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function() {
      return "/";
    };
    process2.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function() {
      return 0;
    };
  }
});
var require_setImmediate = __commonJS2({
  "../../node_modules/memfs/lib/setImmediate.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var _setImmediate;
    if (typeof setImmediate === "function")
      _setImmediate = setImmediate.bind(typeof globalThis !== "undefined" ? globalThis : globalThis);
    else
      _setImmediate = setTimeout.bind(typeof globalThis !== "undefined" ? globalThis : globalThis);
    exports.default = _setImmediate;
  }
});
var require_process = __commonJS2({
  "../../node_modules/memfs/lib/process.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createProcess = void 0;
    var maybeReturnProcess = /* @__PURE__ */ __name(function() {
      if (typeof define_process_default !== "undefined") {
        return define_process_default;
      }
      try {
        return require_browser22();
      } catch (_a) {
        return void 0;
      }
    }, "maybeReturnProcess");
    function createProcess() {
      var p2 = maybeReturnProcess() || {};
      if (!p2.cwd)
        p2.cwd = function() {
          return "/";
        };
      if (!p2.nextTick)
        p2.nextTick = require_setImmediate().default;
      if (!p2.emitWarning)
        p2.emitWarning = function(message, type) {
          console.warn("".concat(type).concat(type ? ": " : "").concat(message));
        };
      if (!p2.env)
        p2.env = {};
      return p2;
    }
    __name(createProcess, "createProcess");
    exports.createProcess = createProcess;
    exports.default = createProcess();
  }
});
var require_events = __commonJS2({
  "../../node_modules/events-browserify/events.js"(exports) {
    init_define_process();
    if (!define_process_default.EventEmitter)
      define_process_default.EventEmitter = function() {
      };
    var EventEmitter = exports.EventEmitter = define_process_default.EventEmitter;
    var isArray = typeof Array.isArray === "function" ? Array.isArray : function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
    var defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!this._events)
        this._events = {};
      this._events.maxListeners = n;
    };
    EventEmitter.prototype.emit = function(type) {
      if (type === "error") {
        if (!this._events || !this._events.error || isArray(this._events.error) && !this._events.error.length) {
          if (arguments[1] instanceof Error) {
            throw arguments[1];
          } else {
            throw new Error("Uncaught, unspecified 'error' event.");
          }
          return false;
        }
      }
      if (!this._events)
        return false;
      var handler = this._events[type];
      if (!handler)
        return false;
      if (typeof handler == "function") {
        switch (arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            var args = Array.prototype.slice.call(arguments, 1);
            handler.apply(this, args);
        }
        return true;
      } else if (isArray(handler)) {
        var args = Array.prototype.slice.call(arguments, 1);
        var listeners = handler.slice();
        for (var i = 0, l = listeners.length; i < l; i++) {
          listeners[i].apply(this, args);
        }
        return true;
      } else {
        return false;
      }
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      if ("function" !== typeof listener) {
        throw new Error("addListener only takes instances of Function");
      }
      if (!this._events)
        this._events = {};
      this.emit("newListener", type, listener);
      if (!this._events[type]) {
        this._events[type] = listener;
      } else if (isArray(this._events[type])) {
        if (!this._events[type].warned) {
          var m;
          if (this._events.maxListeners !== void 0) {
            m = this._events.maxListeners;
          } else {
            m = defaultMaxListeners;
          }
          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error(
              "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
              this._events[type].length
            );
            console.trace();
          }
        }
        this._events[type].push(listener);
      } else {
        this._events[type] = [this._events[type], listener];
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      var self2 = this;
      self2.on(type, /* @__PURE__ */ __name(function g() {
        self2.removeListener(type, g);
        listener.apply(this, arguments);
      }, "g"));
      return this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      if ("function" !== typeof listener) {
        throw new Error("removeListener only takes instances of Function");
      }
      if (!this._events || !this._events[type])
        return this;
      var list = this._events[type];
      if (isArray(list)) {
        var i = list.indexOf(listener);
        if (i < 0)
          return this;
        list.splice(i, 1);
        if (list.length == 0)
          delete this._events[type];
      } else if (this._events[type] === listener) {
        delete this._events[type];
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      if (type && this._events && this._events[type])
        this._events[type] = null;
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      if (!this._events)
        this._events = {};
      if (!this._events[type])
        this._events[type] = [];
      if (!isArray(this._events[type])) {
        this._events[type] = [this._events[type]];
      }
      return this._events[type];
    };
  }
});
var require_node = __commonJS2({
  "../../node_modules/memfs/lib/node.js"(exports) {
    "use strict";
    init_define_process();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p2 in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p2))
              d2[p2] = b2[p2];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.File = exports.Link = exports.Node = exports.SEP = void 0;
    var process_1 = require_process();
    var buffer_1 = require_buffer();
    var constants_1 = require_constants();
    var events_1 = require_events();
    var Stats_1 = require_Stats();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var O_APPEND = constants_1.constants.O_APPEND;
    var getuid = /* @__PURE__ */ __name(function() {
      var _a, _b;
      return (_b = (_a = process_1.default.getuid) === null || _a === void 0 ? void 0 : _a.call(process_1.default)) !== null && _b !== void 0 ? _b : 0;
    }, "getuid");
    var getgid = /* @__PURE__ */ __name(function() {
      var _a, _b;
      return (_b = (_a = process_1.default.getgid) === null || _a === void 0 ? void 0 : _a.call(process_1.default)) !== null && _b !== void 0 ? _b : 0;
    }, "getgid");
    exports.SEP = "/";
    var Node = function(_super) {
      __extends(Node2, _super);
      function Node2(ino, perm) {
        if (perm === void 0) {
          perm = 438;
        }
        var _this = _super.call(this) || this;
        _this.uid = getuid();
        _this.gid = getgid();
        _this.atime = new Date();
        _this.mtime = new Date();
        _this.ctime = new Date();
        _this.perm = 438;
        _this.mode = S_IFREG;
        _this.nlink = 1;
        _this.perm = perm;
        _this.mode |= perm;
        _this.ino = ino;
        return _this;
      }
      __name(Node2, "Node");
      Node2.prototype.getString = function(encoding) {
        if (encoding === void 0) {
          encoding = "utf8";
        }
        return this.getBuffer().toString(encoding);
      };
      Node2.prototype.setString = function(str) {
        this.buf = (0, buffer_1.bufferFrom)(str, "utf8");
        this.touch();
      };
      Node2.prototype.getBuffer = function() {
        if (!this.buf)
          this.setBuffer((0, buffer_1.bufferAllocUnsafe)(0));
        return (0, buffer_1.bufferFrom)(this.buf);
      };
      Node2.prototype.setBuffer = function(buf) {
        this.buf = (0, buffer_1.bufferFrom)(buf);
        this.touch();
      };
      Node2.prototype.getSize = function() {
        return this.buf ? this.buf.length : 0;
      };
      Node2.prototype.setModeProperty = function(property) {
        this.mode = this.mode & ~S_IFMT | property;
      };
      Node2.prototype.setIsFile = function() {
        this.setModeProperty(S_IFREG);
      };
      Node2.prototype.setIsDirectory = function() {
        this.setModeProperty(S_IFDIR);
      };
      Node2.prototype.setIsSymlink = function() {
        this.setModeProperty(S_IFLNK);
      };
      Node2.prototype.isFile = function() {
        return (this.mode & S_IFMT) === S_IFREG;
      };
      Node2.prototype.isDirectory = function() {
        return (this.mode & S_IFMT) === S_IFDIR;
      };
      Node2.prototype.isSymlink = function() {
        return (this.mode & S_IFMT) === S_IFLNK;
      };
      Node2.prototype.makeSymlink = function(steps) {
        this.symlink = steps;
        this.setIsSymlink();
      };
      Node2.prototype.write = function(buf, off, len, pos) {
        if (off === void 0) {
          off = 0;
        }
        if (len === void 0) {
          len = buf.length;
        }
        if (pos === void 0) {
          pos = 0;
        }
        if (!this.buf)
          this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        if (pos + len > this.buf.length) {
          var newBuf = (0, buffer_1.bufferAllocUnsafe)(pos + len);
          this.buf.copy(newBuf, 0, 0, this.buf.length);
          this.buf = newBuf;
        }
        buf.copy(this.buf, pos, off, off + len);
        this.touch();
        return len;
      };
      Node2.prototype.read = function(buf, off, len, pos) {
        if (off === void 0) {
          off = 0;
        }
        if (len === void 0) {
          len = buf.byteLength;
        }
        if (pos === void 0) {
          pos = 0;
        }
        if (!this.buf)
          this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        var actualLen = len;
        if (actualLen > buf.byteLength) {
          actualLen = buf.byteLength;
        }
        if (actualLen + pos > this.buf.length) {
          actualLen = this.buf.length - pos;
        }
        this.buf.copy(buf, off, pos, pos + actualLen);
        return actualLen;
      };
      Node2.prototype.truncate = function(len) {
        if (len === void 0) {
          len = 0;
        }
        if (!len)
          this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
        else {
          if (!this.buf)
            this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
          if (len <= this.buf.length) {
            this.buf = this.buf.slice(0, len);
          } else {
            var buf = (0, buffer_1.bufferAllocUnsafe)(len);
            this.buf.copy(buf);
            buf.fill(0, this.buf.length);
            this.buf = buf;
          }
        }
        this.touch();
      };
      Node2.prototype.chmod = function(perm) {
        this.perm = perm;
        this.mode = this.mode & ~511 | perm;
        this.touch();
      };
      Node2.prototype.chown = function(uid, gid) {
        this.uid = uid;
        this.gid = gid;
        this.touch();
      };
      Node2.prototype.touch = function() {
        this.mtime = new Date();
        this.emit("change", this);
      };
      Node2.prototype.canRead = function(uid, gid) {
        if (uid === void 0) {
          uid = getuid();
        }
        if (gid === void 0) {
          gid = getgid();
        }
        if (this.perm & 4) {
          return true;
        }
        if (gid === this.gid) {
          if (this.perm & 32) {
            return true;
          }
        }
        if (uid === this.uid) {
          if (this.perm & 256) {
            return true;
          }
        }
        return false;
      };
      Node2.prototype.canWrite = function(uid, gid) {
        if (uid === void 0) {
          uid = getuid();
        }
        if (gid === void 0) {
          gid = getgid();
        }
        if (this.perm & 2) {
          return true;
        }
        if (gid === this.gid) {
          if (this.perm & 16) {
            return true;
          }
        }
        if (uid === this.uid) {
          if (this.perm & 128) {
            return true;
          }
        }
        return false;
      };
      Node2.prototype.del = function() {
        this.emit("delete", this);
      };
      Node2.prototype.toJSON = function() {
        return {
          ino: this.ino,
          uid: this.uid,
          gid: this.gid,
          atime: this.atime.getTime(),
          mtime: this.mtime.getTime(),
          ctime: this.ctime.getTime(),
          perm: this.perm,
          mode: this.mode,
          nlink: this.nlink,
          symlink: this.symlink,
          data: this.getString()
        };
      };
      return Node2;
    }(events_1.EventEmitter);
    exports.Node = Node;
    var Link = function(_super) {
      __extends(Link2, _super);
      function Link2(vol, parent, name) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this._steps = [];
        _this.ino = 0;
        _this.length = 0;
        _this.vol = vol;
        _this.parent = parent;
        _this.name = name;
        _this.syncSteps();
        return _this;
      }
      __name(Link2, "Link");
      Object.defineProperty(Link2.prototype, "steps", {
        get: function() {
          return this._steps;
        },
        set: function(val) {
          this._steps = val;
          for (var _i = 0, _a = Object.values(this.children); _i < _a.length; _i++) {
            var child = _a[_i];
            child === null || child === void 0 ? void 0 : child.syncSteps();
          }
        },
        enumerable: false,
        configurable: true
      });
      Link2.prototype.setNode = function(node) {
        this.node = node;
        this.ino = node.ino;
      };
      Link2.prototype.getNode = function() {
        return this.node;
      };
      Link2.prototype.createChild = function(name, node) {
        if (node === void 0) {
          node = this.vol.createNode();
        }
        var link = new Link2(this.vol, this, name);
        link.setNode(node);
        if (node.isDirectory()) {
        }
        this.setChild(name, link);
        return link;
      };
      Link2.prototype.setChild = function(name, link) {
        if (link === void 0) {
          link = new Link2(this.vol, this, name);
        }
        this.children[name] = link;
        link.parent = this;
        this.length++;
        this.emit("child:add", link, this);
        return link;
      };
      Link2.prototype.deleteChild = function(link) {
        delete this.children[link.getName()];
        this.length--;
        this.emit("child:delete", link, this);
      };
      Link2.prototype.getChild = function(name) {
        if (Object.hasOwnProperty.call(this.children, name)) {
          return this.children[name];
        }
      };
      Link2.prototype.getPath = function() {
        return this.steps.join(exports.SEP);
      };
      Link2.prototype.getName = function() {
        return this.steps[this.steps.length - 1];
      };
      Link2.prototype.walk = function(steps, stop, i) {
        if (stop === void 0) {
          stop = steps.length;
        }
        if (i === void 0) {
          i = 0;
        }
        if (i >= steps.length)
          return this;
        if (i >= stop)
          return this;
        var step = steps[i];
        var link = this.getChild(step);
        if (!link)
          return null;
        return link.walk(steps, stop, i + 1);
      };
      Link2.prototype.toJSON = function() {
        return {
          steps: this.steps,
          ino: this.ino,
          children: Object.keys(this.children)
        };
      };
      Link2.prototype.syncSteps = function() {
        this.steps = this.parent ? this.parent.steps.concat([this.name]) : [this.name];
      };
      return Link2;
    }(events_1.EventEmitter);
    exports.Link = Link;
    var File = function() {
      function File2(link, node, flags, fd) {
        this.position = 0;
        this.link = link;
        this.node = node;
        this.flags = flags;
        this.fd = fd;
      }
      __name(File2, "File");
      File2.prototype.getString = function(encoding) {
        if (encoding === void 0) {
          encoding = "utf8";
        }
        return this.node.getString();
      };
      File2.prototype.setString = function(str) {
        this.node.setString(str);
      };
      File2.prototype.getBuffer = function() {
        return this.node.getBuffer();
      };
      File2.prototype.setBuffer = function(buf) {
        this.node.setBuffer(buf);
      };
      File2.prototype.getSize = function() {
        return this.node.getSize();
      };
      File2.prototype.truncate = function(len) {
        this.node.truncate(len);
      };
      File2.prototype.seekTo = function(position) {
        this.position = position;
      };
      File2.prototype.stats = function() {
        return Stats_1.default.build(this.node);
      };
      File2.prototype.write = function(buf, offset, length, position) {
        if (offset === void 0) {
          offset = 0;
        }
        if (length === void 0) {
          length = buf.length;
        }
        if (typeof position !== "number")
          position = this.position;
        if (this.flags & O_APPEND)
          position = this.getSize();
        var bytes = this.node.write(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
      };
      File2.prototype.read = function(buf, offset, length, position) {
        if (offset === void 0) {
          offset = 0;
        }
        if (length === void 0) {
          length = buf.byteLength;
        }
        if (typeof position !== "number")
          position = this.position;
        var bytes = this.node.read(buf, offset, length, position);
        this.position = position + bytes;
        return bytes;
      };
      File2.prototype.chmod = function(perm) {
        this.node.chmod(perm);
      };
      File2.prototype.chown = function(uid, gid) {
        this.node.chown(uid, gid);
      };
      return File2;
    }();
    exports.File = File;
  }
});
var require_setTimeoutUnref = __commonJS2({
  "../../node_modules/memfs/lib/setTimeoutUnref.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function setTimeoutUnref(callback, time, args) {
      var ref = setTimeout.apply(typeof globalThis !== "undefined" ? globalThis : globalThis, arguments);
      if (ref && typeof ref === "object" && typeof ref.unref === "function")
        ref.unref();
      return ref;
    }
    __name(setTimeoutUnref, "setTimeoutUnref");
    exports.default = setTimeoutUnref;
  }
});
var require_stream_browser = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
    init_define_process();
    module.exports = require_events().EventEmitter;
  }
});
var require_util2 = __commonJS2({
  "(disabled):../../node_modules/util/util.js"() {
    init_define_process();
  }
});
var require_buffer_list = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    init_define_process();
    function ownKeys(object, enumerableOnly) {
      var keys2 = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys2.push.apply(keys2, symbols);
      }
      return keys2;
    }
    __name(ownKeys, "ownKeys");
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    __name(_objectSpread, "_objectSpread");
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    __name(_createClass, "_createClass");
    var _require = require_buffer_browserify();
    var Buffer2 = _require.Buffer;
    var _require2 = require_util2();
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    __name(copyBuffer, "copyBuffer");
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      __name(BufferList, "BufferList");
      _createClass(BufferList, [{
        key: "push",
        value: /* @__PURE__ */ __name(function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }, "push")
      }, {
        key: "unshift",
        value: /* @__PURE__ */ __name(function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }, "unshift")
      }, {
        key: "shift",
        value: /* @__PURE__ */ __name(function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }, "shift")
      }, {
        key: "clear",
        value: /* @__PURE__ */ __name(function clear2() {
          this.head = this.tail = null;
          this.length = 0;
        }, "clear")
      }, {
        key: "join",
        value: /* @__PURE__ */ __name(function join2(s) {
          if (this.length === 0)
            return "";
          var p2 = this.head;
          var ret = "" + p2.data;
          while (p2 = p2.next) {
            ret += s + p2.data;
          }
          return ret;
        }, "join")
      }, {
        key: "concat",
        value: /* @__PURE__ */ __name(function concat2(n) {
          if (this.length === 0)
            return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p2 = this.head;
          var i = 0;
          while (p2) {
            copyBuffer(p2.data, ret, i);
            i += p2.data.length;
            p2 = p2.next;
          }
          return ret;
        }, "concat")
      }, {
        key: "consume",
        value: /* @__PURE__ */ __name(function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }, "consume")
      }, {
        key: "first",
        value: /* @__PURE__ */ __name(function first3() {
          return this.head.data;
        }, "first")
      }, {
        key: "_getString",
        value: /* @__PURE__ */ __name(function _getString(n) {
          var p2 = this.head;
          var c = 1;
          var ret = p2.data;
          n -= ret.length;
          while (p2 = p2.next) {
            var str = p2.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p2.next)
                  this.head = p2.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p2;
                p2.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }, "_getString")
      }, {
        key: "_getBuffer",
        value: /* @__PURE__ */ __name(function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p2 = this.head;
          var c = 1;
          p2.data.copy(ret);
          n -= p2.data.length;
          while (p2 = p2.next) {
            var buf = p2.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p2.next)
                  this.head = p2.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p2;
                p2.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }, "_getBuffer")
      }, {
        key: custom,
        value: /* @__PURE__ */ __name(function value(_, options) {
          return inspect(this, _objectSpread({}, options, {
            depth: 0,
            customInspect: false
          }));
        }, "value")
      }]);
      return BufferList;
    }();
  }
});
var require_destroy = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    init_define_process();
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            define_process_default.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            define_process_default.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            define_process_default.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            define_process_default.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            define_process_default.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          define_process_default.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          define_process_default.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    __name(destroy, "destroy");
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    __name(emitErrorAndCloseNT, "emitErrorAndCloseNT");
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    __name(emitCloseNT, "emitCloseNT");
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    __name(undestroy, "undestroy");
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    __name(emitErrorNT, "emitErrorNT");
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    __name(errorOrDestroy, "errorOrDestroy");
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_errors_browser = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/errors-browser.js"(exports, module) {
    "use strict";
    init_define_process();
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    __name(_inheritsLoose, "_inheritsLoose");
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      __name(getMessage, "getMessage");
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        __name(NodeError2, "NodeError");
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    __name(createErrorType, "createErrorType");
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    __name(oneOf, "oneOf");
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    __name(startsWith, "startsWith");
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    __name(endsWith, "endsWith");
    function includes3(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    __name(includes3, "includes");
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes3(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_state = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    init_define_process();
    var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    __name(highWaterMarkFrom, "highWaterMarkFrom");
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    __name(getHighWaterMark, "getHighWaterMark");
    module.exports = {
      getHighWaterMark
    };
  }
});
var require_browser3 = __commonJS2({
  "../../node_modules/util-deprecate/browser.js"(exports, module) {
    init_define_process();
    module.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      __name(deprecated, "deprecated");
      return deprecated;
    }
    __name(deprecate, "deprecate");
    function config(name) {
      try {
        if (!globalThis.localStorage)
          return false;
      } catch (_) {
        return false;
      }
      var val = globalThis.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
    __name(config, "config");
  }
});
var require_stream_writable = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    __name(CorkedRequest, "CorkedRequest");
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_browser3()
    };
    var Stream = require_stream_browser();
    var Buffer2 = require_buffer_browserify().Buffer;
    var OurUint8Array = globalThis.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    __name(_uint8ArrayToBuffer, "_uint8ArrayToBuffer");
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    __name(_isUint8Array, "_isUint8Array");
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits_browser()(Writable, Stream);
    function nop() {
    }
    __name(nop, "nop");
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    __name(WritableState, "WritableState");
    WritableState.prototype.getBuffer = /* @__PURE__ */ __name(function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    }, "getBuffer");
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(/* @__PURE__ */ __name(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "writableStateBufferGetter"), "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: /* @__PURE__ */ __name(function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable)
            return false;
          return object && object._writableState instanceof WritableState;
        }, "value")
      });
    } else {
      realHasInstance = /* @__PURE__ */ __name(function realHasInstance2(object) {
        return object instanceof this;
      }, "realHasInstance");
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream.call(this);
    }
    __name(Writable, "Writable");
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      define_process_default.nextTick(cb, er);
    }
    __name(writeAfterEnd, "writeAfterEnd");
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        define_process_default.nextTick(cb, er);
        return false;
      }
      return true;
    }
    __name(validChunk, "validChunk");
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = /* @__PURE__ */ __name(function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    }, "setDefaultEncoding");
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState && this._writableState.getBuffer();
      }, "get")
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    __name(decodeChunk, "decodeChunk");
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState.highWaterMark;
      }, "get")
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last3 = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last3) {
          last3.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    __name(writeOrBuffer, "writeOrBuffer");
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    __name(doWrite, "doWrite");
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        define_process_default.nextTick(cb, er);
        define_process_default.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    __name(onwriteError, "onwriteError");
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    __name(onwriteStateUpdate, "onwriteStateUpdate");
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          define_process_default.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    __name(onwrite, "onwrite");
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    __name(afterWrite, "afterWrite");
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    __name(onwriteDrain, "onwriteDrain");
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count2 = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count2] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count2 += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    __name(clearBuffer, "clearBuffer");
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState.length;
      }, "get")
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    __name(needFinish, "needFinish");
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    __name(callFinal, "callFinal");
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          define_process_default.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    __name(prefinish, "prefinish");
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    __name(finishMaybe, "finishMaybe");
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          define_process_default.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    __name(endWritable, "endWritable");
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    __name(onCorkedFinish, "onCorkedFinish");
    Object.defineProperty(Writable.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set3(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }, "set")
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var require_stream_duplex = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
    "use strict";
    init_define_process();
    var objectKeys = Object.keys || function(obj) {
      var keys22 = [];
      for (var key in obj) {
        keys22.push(key);
      }
      return keys22;
    };
    module.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits_browser()(Duplex, Readable);
    {
      keys2 = objectKeys(Writable.prototype);
      for (v = 0; v < keys2.length; v++) {
        method = keys2[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys2;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    __name(Duplex, "Duplex");
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState.highWaterMark;
      }, "get")
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState && this._writableState.getBuffer();
      }, "get")
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._writableState.length;
      }, "get")
    });
    function onend() {
      if (this._writableState.ended)
        return;
      define_process_default.nextTick(onEndNT, this);
    }
    __name(onend, "onend");
    function onEndNT(self2) {
      self2.end();
    }
    __name(onEndNT, "onEndNT");
    Object.defineProperty(Duplex.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set3(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }, "set")
    });
  }
});
var require_safe_buffer = __commonJS2({
  "../../node_modules/safe-buffer/index.js"(exports, module) {
    init_define_process();
    var buffer = require_buffer_browserify();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    __name(copyProps, "copyProps");
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    __name(SafeBuffer, "SafeBuffer");
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});
var require_string_decoder = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/string_decoder/lib/string_decoder.js"(exports) {
    "use strict";
    init_define_process();
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    __name(_normalizeEncoding, "_normalizeEncoding");
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    __name(normalizeEncoding, "normalizeEncoding");
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    __name(StringDecoder, "StringDecoder");
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0)
          return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length)
        return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    __name(utf8CheckByte, "utf8CheckByte");
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i)
        return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    __name(utf8CheckIncomplete, "utf8CheckIncomplete");
    function utf8CheckExtraBytes(self2, buf, p2) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    __name(utf8CheckExtraBytes, "utf8CheckExtraBytes");
    function utf8FillLast(buf) {
      var p2 = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p2);
      if (r !== void 0)
        return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p2, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p2, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    __name(utf8FillLast, "utf8FillLast");
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed)
        return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    __name(utf8Text, "utf8Text");
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + "\uFFFD";
      return r;
    }
    __name(utf8End, "utf8End");
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    __name(utf16Text, "utf16Text");
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    __name(utf16End, "utf16End");
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0)
        return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    __name(base64Text, "base64Text");
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    __name(base64End, "base64End");
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    __name(simpleWrite, "simpleWrite");
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
    __name(simpleEnd, "simpleEnd");
  }
});
var require_end_of_stream = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    init_define_process();
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    __name(once, "once");
    function noop() {
    }
    __name(noop, "noop");
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    __name(isRequest, "isRequest");
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = /* @__PURE__ */ __name(function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      }, "onlegacyfinish");
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = /* @__PURE__ */ __name(function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      }, "onfinish");
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = /* @__PURE__ */ __name(function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      }, "onend");
      var onerror = /* @__PURE__ */ __name(function onerror2(err) {
        callback.call(stream, err);
      }, "onerror");
      var onclose = /* @__PURE__ */ __name(function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      }, "onclose");
      var onrequest = /* @__PURE__ */ __name(function onrequest2() {
        stream.req.on("finish", onfinish);
      }, "onrequest");
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    __name(eos, "eos");
    module.exports = eos;
  }
});
var require_async_iterator = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
    "use strict";
    init_define_process();
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    __name(createIterResult, "createIterResult");
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    __name(readAndResolve, "readAndResolve");
    function onReadable(iter) {
      define_process_default.nextTick(readAndResolve, iter);
    }
    __name(onReadable, "onReadable");
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    __name(wrapForNext, "wrapForNext");
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: /* @__PURE__ */ __name(function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            define_process_default.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }, "next")
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", /* @__PURE__ */ __name(function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }, "_return")), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = /* @__PURE__ */ __name(function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: /* @__PURE__ */ __name(function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        }, "value"),
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    }, "createReadableStreamAsyncIterator");
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports, module) {
    init_define_process();
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require_events().EventEmitter;
    var EElistenerCount = /* @__PURE__ */ __name(function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    }, "EElistenerCount");
    var Stream = require_stream_browser();
    var Buffer2 = require_buffer_browserify().Buffer;
    var OurUint8Array = globalThis.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    __name(_uint8ArrayToBuffer, "_uint8ArrayToBuffer");
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    __name(_isUint8Array, "_isUint8Array");
    var debugUtil = require_util2();
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = /* @__PURE__ */ __name(function debug2() {
      }, "debug");
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits_browser()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    __name(prependListener, "prependListener");
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    __name(ReadableState, "ReadableState");
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    __name(Readable, "Readable");
    Object.defineProperty(Readable.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set3(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }, "set")
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    __name(readableAddChunk, "readableAddChunk");
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    __name(addChunk, "addChunk");
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    __name(chunkInvalid, "chunkInvalid");
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p2 = this._readableState.buffer.head;
      var content = "";
      while (p2 !== null) {
        content += decoder.write(p2.data);
        p2 = p2.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    __name(computeNewHighWaterMark, "computeNewHighWaterMark");
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    __name(howMuchToRead, "howMuchToRead");
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    __name(onEofChunk, "onEofChunk");
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        define_process_default.nextTick(emitReadable_, stream);
      }
    }
    __name(emitReadable, "emitReadable");
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    __name(emitReadable_, "emitReadable_");
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        define_process_default.nextTick(maybeReadMore_, stream, state);
      }
    }
    __name(maybeReadMore, "maybeReadMore");
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    __name(maybeReadMore_, "maybeReadMore_");
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== define_process_default.stdout && dest !== define_process_default.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        define_process_default.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      __name(onunpipe, "onunpipe");
      function onend() {
        debug("onend");
        dest.end();
      }
      __name(onend, "onend");
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      __name(cleanup, "cleanup");
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf2(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      __name(ondata, "ondata");
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      __name(onerror, "onerror");
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      __name(onclose, "onclose");
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      __name(onfinish, "onfinish");
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      __name(unpipe, "unpipe");
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return /* @__PURE__ */ __name(function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      }, "pipeOnDrainFunctionResult");
    }
    __name(pipeOnDrain, "pipeOnDrain");
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        }
        return this;
      }
      var index = indexOf2(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            define_process_default.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        define_process_default.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        define_process_default.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    __name(updateReadableListening, "updateReadableListening");
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    __name(nReadingNextTick, "nReadingNextTick");
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        define_process_default.nextTick(resume_, stream, state);
      }
    }
    __name(resume, "resume");
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    __name(resume_, "resume_");
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
        ;
      }
    }
    __name(flow, "flow");
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = (/* @__PURE__ */ __name(function methodWrap(method) {
            return /* @__PURE__ */ __name(function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            }, "methodWrapReturnFunction");
          }, "methodWrap"))(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._readableState.highWaterMark;
      }, "get")
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._readableState && this._readableState.buffer;
      }, "get")
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._readableState.flowing;
      }, "get"),
      set: /* @__PURE__ */ __name(function set3(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }, "set")
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get11() {
        return this._readableState.length;
      }, "get")
    });
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    __name(fromList, "fromList");
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        define_process_default.nextTick(endReadableNT, state, stream);
      }
    }
    __name(endReadable, "endReadable");
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    __name(endReadableNT, "endReadableNT");
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf2(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
    __name(indexOf2, "indexOf");
  }
});
var require_stream_transform = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Transform;
    var _require$codes = require_errors_browser().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits_browser()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    __name(afterTransform, "afterTransform");
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    __name(Transform, "Transform");
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    __name(prefinish, "prefinish");
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
    __name(done, "done");
  }
});
var require_stream_passthrough = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits_browser()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    __name(PassThrough, "PassThrough");
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});
var require_pipeline = __commonJS2({
  "../../node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    "use strict";
    init_define_process();
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    __name(once, "once");
    var _require$codes = require_errors_browser().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err)
        throw err;
    }
    __name(noop, "noop");
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    __name(isRequest, "isRequest");
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    __name(destroyer, "destroyer");
    function call(fn) {
      fn();
    }
    __name(call, "call");
    function pipe(from, to) {
      return from.pipe(to);
    }
    __name(pipe, "pipe");
    function popCallback(streams) {
      if (!streams.length)
        return noop;
      if (typeof streams[streams.length - 1] !== "function")
        return noop;
      return streams.pop();
    }
    __name(popCallback, "popCallback");
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    __name(pipeline, "pipeline");
    module.exports = pipeline;
  }
});
var require_stream_browserify = __commonJS2({
  "../../node_modules/stream-browserify/index.js"(exports, module) {
    init_define_process();
    module.exports = Stream;
    var EE = require_events().EventEmitter;
    var inherits = require_inherits_browser();
    inherits(Stream, EE);
    Stream.Readable = require_stream_readable();
    Stream.Writable = require_stream_writable();
    Stream.Duplex = require_stream_duplex();
    Stream.Transform = require_stream_transform();
    Stream.PassThrough = require_stream_passthrough();
    Stream.finished = require_end_of_stream();
    Stream.pipeline = require_pipeline();
    Stream.Stream = Stream;
    function Stream() {
      EE.call(this);
    }
    __name(Stream, "Stream");
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      __name(ondata, "ondata");
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      __name(ondrain, "ondrain");
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      __name(onend, "onend");
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      __name(onclose, "onclose");
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      __name(onerror, "onerror");
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      __name(cleanup, "cleanup");
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }
});
var require_promises = __commonJS2({
  "../../node_modules/memfs/lib/promises.js"(exports) {
    "use strict";
    init_define_process();
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileHandle = void 0;
    function promisify(vol, fn, getResult) {
      if (getResult === void 0) {
        getResult = /* @__PURE__ */ __name(function(input) {
          return input;
        }, "getResult");
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new Promise(function(resolve, reject) {
          vol[fn].bind(vol).apply(void 0, __spreadArray(__spreadArray([], args, false), [function(error, result) {
            if (error)
              return reject(error);
            return resolve(getResult(result));
          }], false));
        });
      };
    }
    __name(promisify, "promisify");
    var FileHandle = function() {
      function FileHandle2(vol, fd) {
        this.vol = vol;
        this.fd = fd;
      }
      __name(FileHandle2, "FileHandle");
      FileHandle2.prototype.appendFile = function(data, options) {
        return promisify(this.vol, "appendFile")(this.fd, data, options);
      };
      FileHandle2.prototype.chmod = function(mode) {
        return promisify(this.vol, "fchmod")(this.fd, mode);
      };
      FileHandle2.prototype.chown = function(uid, gid) {
        return promisify(this.vol, "fchown")(this.fd, uid, gid);
      };
      FileHandle2.prototype.close = function() {
        return promisify(this.vol, "close")(this.fd);
      };
      FileHandle2.prototype.datasync = function() {
        return promisify(this.vol, "fdatasync")(this.fd);
      };
      FileHandle2.prototype.read = function(buffer, offset, length, position) {
        return promisify(this.vol, "read", function(bytesRead) {
          return { bytesRead, buffer };
        })(this.fd, buffer, offset, length, position);
      };
      FileHandle2.prototype.readFile = function(options) {
        return promisify(this.vol, "readFile")(this.fd, options);
      };
      FileHandle2.prototype.stat = function(options) {
        return promisify(this.vol, "fstat")(this.fd, options);
      };
      FileHandle2.prototype.sync = function() {
        return promisify(this.vol, "fsync")(this.fd);
      };
      FileHandle2.prototype.truncate = function(len) {
        return promisify(this.vol, "ftruncate")(this.fd, len);
      };
      FileHandle2.prototype.utimes = function(atime, mtime) {
        return promisify(this.vol, "futimes")(this.fd, atime, mtime);
      };
      FileHandle2.prototype.write = function(buffer, offset, length, position) {
        return promisify(this.vol, "write", function(bytesWritten) {
          return { bytesWritten, buffer };
        })(this.fd, buffer, offset, length, position);
      };
      FileHandle2.prototype.writeFile = function(data, options) {
        return promisify(this.vol, "writeFile")(this.fd, data, options);
      };
      return FileHandle2;
    }();
    exports.FileHandle = FileHandle;
    function createPromisesApi(vol) {
      if (typeof Promise === "undefined")
        return null;
      return {
        FileHandle,
        access: function(path, mode) {
          return promisify(vol, "access")(path, mode);
        },
        appendFile: function(path, data, options) {
          return promisify(vol, "appendFile")(path instanceof FileHandle ? path.fd : path, data, options);
        },
        chmod: function(path, mode) {
          return promisify(vol, "chmod")(path, mode);
        },
        chown: function(path, uid, gid) {
          return promisify(vol, "chown")(path, uid, gid);
        },
        copyFile: function(src, dest, flags) {
          return promisify(vol, "copyFile")(src, dest, flags);
        },
        lchmod: function(path, mode) {
          return promisify(vol, "lchmod")(path, mode);
        },
        lchown: function(path, uid, gid) {
          return promisify(vol, "lchown")(path, uid, gid);
        },
        link: function(existingPath, newPath) {
          return promisify(vol, "link")(existingPath, newPath);
        },
        lstat: function(path, options) {
          return promisify(vol, "lstat")(path, options);
        },
        mkdir: function(path, options) {
          return promisify(vol, "mkdir")(path, options);
        },
        mkdtemp: function(prefix, options) {
          return promisify(vol, "mkdtemp")(prefix, options);
        },
        open: function(path, flags, mode) {
          return promisify(vol, "open", function(fd) {
            return new FileHandle(vol, fd);
          })(path, flags, mode);
        },
        readdir: function(path, options) {
          return promisify(vol, "readdir")(path, options);
        },
        readFile: function(id, options) {
          return promisify(vol, "readFile")(id instanceof FileHandle ? id.fd : id, options);
        },
        readlink: function(path, options) {
          return promisify(vol, "readlink")(path, options);
        },
        realpath: function(path, options) {
          return promisify(vol, "realpath")(path, options);
        },
        rename: function(oldPath, newPath) {
          return promisify(vol, "rename")(oldPath, newPath);
        },
        rmdir: function(path) {
          return promisify(vol, "rmdir")(path);
        },
        rm: function(path, options) {
          return promisify(vol, "rm")(path, options);
        },
        stat: function(path, options) {
          return promisify(vol, "stat")(path, options);
        },
        symlink: function(target, path, type) {
          return promisify(vol, "symlink")(target, path, type);
        },
        truncate: function(path, len) {
          return promisify(vol, "truncate")(path, len);
        },
        unlink: function(path) {
          return promisify(vol, "unlink")(path);
        },
        utimes: function(path, atime, mtime) {
          return promisify(vol, "utimes")(path, atime, mtime);
        },
        writeFile: function(id, data, options) {
          return promisify(vol, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
        }
      };
    }
    __name(createPromisesApi, "createPromisesApi");
    exports.default = createPromisesApi;
  }
});
var require_correctPath = __commonJS2({
  "../../node_modules/fs-monkey/lib/correctPath.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.unixify = unixify;
    exports.correctPath = correctPath;
    var isWin = define_process_default.platform === "win32";
    function removeTrailingSeparator(str) {
      var i = str.length - 1;
      if (i < 2) {
        return str;
      }
      while (isSeparator(str, i)) {
        i--;
      }
      return str.substr(0, i + 1);
    }
    __name(removeTrailingSeparator, "removeTrailingSeparator");
    function isSeparator(str, i) {
      var _char = str[i];
      return i > 0 && (_char === "/" || isWin && _char === "\\");
    }
    __name(isSeparator, "isSeparator");
    function normalizePath(str, stripTrailing) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      str = str.replace(/[\\\/]+/g, "/");
      if (stripTrailing !== false) {
        str = removeTrailingSeparator(str);
      }
      return str;
    }
    __name(normalizePath, "normalizePath");
    function unixify(filepath) {
      var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (isWin) {
        filepath = normalizePath(filepath, stripTrailing);
        return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
      }
      return filepath;
    }
    __name(unixify, "unixify");
    function correctPath(filepath) {
      return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
    }
    __name(correctPath, "correctPath");
  }
});
var require_volume = __commonJS2({
  "../../node_modules/memfs/lib/volume.js"(exports) {
    "use strict";
    init_define_process();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p2 in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p2))
              d2[p2] = b2[p2];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FSWatcher = exports.StatWatcher = exports.Volume = exports.toUnixTimestamp = exports.bufferToEncoding = exports.dataToBuffer = exports.dataToStr = exports.pathToSteps = exports.filenameToSteps = exports.pathToFilename = exports.flagsToNumber = exports.FLAGS = void 0;
    var pathModule = require_path_browserify();
    var node_1 = require_node();
    var Stats_1 = require_Stats();
    var Dirent_1 = require_Dirent();
    var buffer_1 = require_buffer();
    var setImmediate_1 = require_setImmediate();
    var process_1 = require_process();
    var setTimeoutUnref_1 = require_setTimeoutUnref();
    var stream_1 = require_stream_browserify();
    var constants_1 = require_constants();
    var events_1 = require_events();
    var encoding_1 = require_encoding();
    var errors = require_errors3();
    var util = require_util();
    var promises_1 = require_promises();
    var resolveCrossPlatform = pathModule.resolve;
    var O_RDONLY = constants_1.constants.O_RDONLY;
    var O_WRONLY = constants_1.constants.O_WRONLY;
    var O_RDWR = constants_1.constants.O_RDWR;
    var O_CREAT = constants_1.constants.O_CREAT;
    var O_EXCL = constants_1.constants.O_EXCL;
    var O_TRUNC = constants_1.constants.O_TRUNC;
    var O_APPEND = constants_1.constants.O_APPEND;
    var O_SYNC = constants_1.constants.O_SYNC;
    var O_DIRECTORY = constants_1.constants.O_DIRECTORY;
    var F_OK = constants_1.constants.F_OK;
    var COPYFILE_EXCL = constants_1.constants.COPYFILE_EXCL;
    var COPYFILE_FICLONE_FORCE = constants_1.constants.COPYFILE_FICLONE_FORCE;
    var _a = pathModule.posix ? pathModule.posix : pathModule;
    var sep = _a.sep;
    var relative = _a.relative;
    var join2 = _a.join;
    var dirname = _a.dirname;
    var isWin = process_1.default.platform === "win32";
    var kMinPoolSpace = 128;
    var ERRSTR = {
      PATH_STR: "path must be a string or Buffer",
      FD: "fd must be a file descriptor",
      MODE_INT: "mode must be an int",
      CB: "callback must be a function",
      UID: "uid must be an unsigned int",
      GID: "gid must be an unsigned int",
      LEN: "len must be an integer",
      ATIME: "atime must be an integer",
      MTIME: "mtime must be an integer",
      PREFIX: "filename prefix is required",
      BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
      OFFSET: "offset must be an integer",
      LENGTH: "length must be an integer",
      POSITION: "position must be an integer"
    };
    var ERRSTR_OPTS = /* @__PURE__ */ __name(function(tipeof) {
      return "Expected options to be either an object or a string, but got ".concat(tipeof, " instead");
    }, "ERRSTR_OPTS");
    var ENOENT = "ENOENT";
    var EBADF = "EBADF";
    var EINVAL = "EINVAL";
    var EPERM = "EPERM";
    var EPROTO = "EPROTO";
    var EEXIST = "EEXIST";
    var ENOTDIR = "ENOTDIR";
    var EMFILE = "EMFILE";
    var EACCES = "EACCES";
    var EISDIR = "EISDIR";
    var ENOTEMPTY = "ENOTEMPTY";
    var ENOSYS = "ENOSYS";
    var ERR_FS_EISDIR = "ERR_FS_EISDIR";
    function formatError(errorCode, func, path, path2) {
      if (func === void 0) {
        func = "";
      }
      if (path === void 0) {
        path = "";
      }
      if (path2 === void 0) {
        path2 = "";
      }
      var pathFormatted = "";
      if (path)
        pathFormatted = " '".concat(path, "'");
      if (path2)
        pathFormatted += " -> '".concat(path2, "'");
      switch (errorCode) {
        case ENOENT:
          return "ENOENT: no such file or directory, ".concat(func).concat(pathFormatted);
        case EBADF:
          return "EBADF: bad file descriptor, ".concat(func).concat(pathFormatted);
        case EINVAL:
          return "EINVAL: invalid argument, ".concat(func).concat(pathFormatted);
        case EPERM:
          return "EPERM: operation not permitted, ".concat(func).concat(pathFormatted);
        case EPROTO:
          return "EPROTO: protocol error, ".concat(func).concat(pathFormatted);
        case EEXIST:
          return "EEXIST: file already exists, ".concat(func).concat(pathFormatted);
        case ENOTDIR:
          return "ENOTDIR: not a directory, ".concat(func).concat(pathFormatted);
        case EISDIR:
          return "EISDIR: illegal operation on a directory, ".concat(func).concat(pathFormatted);
        case EACCES:
          return "EACCES: permission denied, ".concat(func).concat(pathFormatted);
        case ENOTEMPTY:
          return "ENOTEMPTY: directory not empty, ".concat(func).concat(pathFormatted);
        case EMFILE:
          return "EMFILE: too many open files, ".concat(func).concat(pathFormatted);
        case ENOSYS:
          return "ENOSYS: function not implemented, ".concat(func).concat(pathFormatted);
        case ERR_FS_EISDIR:
          return "[ERR_FS_EISDIR]: Path is a directory: ".concat(func, " returned EISDIR (is a directory) ").concat(path);
        default:
          return "".concat(errorCode, ": error occurred, ").concat(func).concat(pathFormatted);
      }
    }
    __name(formatError, "formatError");
    function createError(errorCode, func, path, path2, Constructor) {
      if (func === void 0) {
        func = "";
      }
      if (path === void 0) {
        path = "";
      }
      if (path2 === void 0) {
        path2 = "";
      }
      if (Constructor === void 0) {
        Constructor = Error;
      }
      var error = new Constructor(formatError(errorCode, func, path, path2));
      error.code = errorCode;
      return error;
    }
    __name(createError, "createError");
    var FLAGS;
    (function(FLAGS2) {
      FLAGS2[FLAGS2["r"] = O_RDONLY] = "r";
      FLAGS2[FLAGS2["r+"] = O_RDWR] = "r+";
      FLAGS2[FLAGS2["rs"] = O_RDONLY | O_SYNC] = "rs";
      FLAGS2[FLAGS2["sr"] = FLAGS2.rs] = "sr";
      FLAGS2[FLAGS2["rs+"] = O_RDWR | O_SYNC] = "rs+";
      FLAGS2[FLAGS2["sr+"] = FLAGS2["rs+"]] = "sr+";
      FLAGS2[FLAGS2["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
      FLAGS2[FLAGS2["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
      FLAGS2[FLAGS2["xw"] = FLAGS2.wx] = "xw";
      FLAGS2[FLAGS2["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
      FLAGS2[FLAGS2["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
      FLAGS2[FLAGS2["xw+"] = FLAGS2["wx+"]] = "xw+";
      FLAGS2[FLAGS2["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a";
      FLAGS2[FLAGS2["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
      FLAGS2[FLAGS2["xa"] = FLAGS2.ax] = "xa";
      FLAGS2[FLAGS2["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+";
      FLAGS2[FLAGS2["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
      FLAGS2[FLAGS2["xa+"] = FLAGS2["ax+"]] = "xa+";
    })(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
    function flagsToNumber(flags) {
      if (typeof flags === "number")
        return flags;
      if (typeof flags === "string") {
        var flagsNum = FLAGS[flags];
        if (typeof flagsNum !== "undefined")
          return flagsNum;
      }
      throw new errors.TypeError("ERR_INVALID_OPT_VALUE", "flags", flags);
    }
    __name(flagsToNumber, "flagsToNumber");
    exports.flagsToNumber = flagsToNumber;
    function getOptions(defaults, options) {
      var opts;
      if (!options)
        return defaults;
      else {
        var tipeof = typeof options;
        switch (tipeof) {
          case "string":
            opts = Object.assign({}, defaults, { encoding: options });
            break;
          case "object":
            opts = Object.assign({}, defaults, options);
            break;
          default:
            throw TypeError(ERRSTR_OPTS(tipeof));
        }
      }
      if (opts.encoding !== "buffer")
        (0, encoding_1.assertEncoding)(opts.encoding);
      return opts;
    }
    __name(getOptions, "getOptions");
    function optsGenerator(defaults) {
      return function(options) {
        return getOptions(defaults, options);
      };
    }
    __name(optsGenerator, "optsGenerator");
    function validateCallback(callback) {
      if (typeof callback !== "function")
        throw TypeError(ERRSTR.CB);
      return callback;
    }
    __name(validateCallback, "validateCallback");
    function optsAndCbGenerator(getOpts) {
      return function(options, callback) {
        return typeof options === "function" ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
      };
    }
    __name(optsAndCbGenerator, "optsAndCbGenerator");
    var optsDefaults = {
      encoding: "utf8"
    };
    var getDefaultOpts = optsGenerator(optsDefaults);
    var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
    var readFileOptsDefaults = {
      flag: "r"
    };
    var getReadFileOptions = optsGenerator(readFileOptsDefaults);
    var writeFileDefaults = {
      encoding: "utf8",
      mode: 438,
      flag: FLAGS[FLAGS.w]
    };
    var getWriteFileOptions = optsGenerator(writeFileDefaults);
    var appendFileDefaults = {
      encoding: "utf8",
      mode: 438,
      flag: FLAGS[FLAGS.a]
    };
    var getAppendFileOpts = optsGenerator(appendFileDefaults);
    var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
    var realpathDefaults = optsDefaults;
    var getRealpathOptions = optsGenerator(realpathDefaults);
    var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
    var mkdirDefaults = {
      mode: 511,
      recursive: false
    };
    var getMkdirOptions = /* @__PURE__ */ __name(function(options) {
      if (typeof options === "number")
        return Object.assign({}, mkdirDefaults, { mode: options });
      return Object.assign({}, mkdirDefaults, options);
    }, "getMkdirOptions");
    var rmdirDefaults = {
      recursive: false
    };
    var getRmdirOptions = /* @__PURE__ */ __name(function(options) {
      return Object.assign({}, rmdirDefaults, options);
    }, "getRmdirOptions");
    var getRmOpts = optsGenerator(optsDefaults);
    var getRmOptsAndCb = optsAndCbGenerator(getRmOpts);
    var readdirDefaults = {
      encoding: "utf8",
      withFileTypes: false
    };
    var getReaddirOptions = optsGenerator(readdirDefaults);
    var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
    var statDefaults = {
      bigint: false
    };
    var getStatOptions = /* @__PURE__ */ __name(function(options) {
      if (options === void 0) {
        options = {};
      }
      return Object.assign({}, statDefaults, options);
    }, "getStatOptions");
    var getStatOptsAndCb = /* @__PURE__ */ __name(function(options, callback) {
      return typeof options === "function" ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
    }, "getStatOptsAndCb");
    function getPathFromURLPosix(url) {
      if (url.hostname !== "") {
        throw new errors.TypeError("ERR_INVALID_FILE_URL_HOST", process_1.default.platform);
      }
      var pathname = url.pathname;
      for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === "%") {
          var third = pathname.codePointAt(n + 2) | 32;
          if (pathname[n + 1] === "2" && third === 102) {
            throw new errors.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
          }
        }
      }
      return decodeURIComponent(pathname);
    }
    __name(getPathFromURLPosix, "getPathFromURLPosix");
    function pathToFilename(path) {
      if (typeof path !== "string" && !buffer_1.Buffer.isBuffer(path)) {
        try {
          if (!(path instanceof __require2("url").URL))
            throw new TypeError(ERRSTR.PATH_STR);
        } catch (err) {
          throw new TypeError(ERRSTR.PATH_STR);
        }
        path = getPathFromURLPosix(path);
      }
      var pathString = String(path);
      nullCheck(pathString);
      return pathString;
    }
    __name(pathToFilename, "pathToFilename");
    exports.pathToFilename = pathToFilename;
    var resolve = /* @__PURE__ */ __name(function(filename, base) {
      if (base === void 0) {
        base = process_1.default.cwd();
      }
      return resolveCrossPlatform(base, filename);
    }, "resolve");
    if (isWin) {
      _resolve_1 = resolve;
      unixify_1 = require_correctPath().unixify;
      resolve = /* @__PURE__ */ __name(function(filename, base) {
        return unixify_1(_resolve_1(filename, base));
      }, "resolve");
    }
    var _resolve_1;
    var unixify_1;
    function filenameToSteps(filename, base) {
      var fullPath = resolve(filename, base);
      var fullPathSansSlash = fullPath.substring(1);
      if (!fullPathSansSlash)
        return [];
      return fullPathSansSlash.split(sep);
    }
    __name(filenameToSteps, "filenameToSteps");
    exports.filenameToSteps = filenameToSteps;
    function pathToSteps(path) {
      return filenameToSteps(pathToFilename(path));
    }
    __name(pathToSteps, "pathToSteps");
    exports.pathToSteps = pathToSteps;
    function dataToStr(data, encoding) {
      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }
      if (buffer_1.Buffer.isBuffer(data))
        return data.toString(encoding);
      else if (data instanceof Uint8Array)
        return (0, buffer_1.bufferFrom)(data).toString(encoding);
      else
        return String(data);
    }
    __name(dataToStr, "dataToStr");
    exports.dataToStr = dataToStr;
    function dataToBuffer(data, encoding) {
      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }
      if (buffer_1.Buffer.isBuffer(data))
        return data;
      else if (data instanceof Uint8Array)
        return (0, buffer_1.bufferFrom)(data);
      else
        return (0, buffer_1.bufferFrom)(String(data), encoding);
    }
    __name(dataToBuffer, "dataToBuffer");
    exports.dataToBuffer = dataToBuffer;
    function bufferToEncoding(buffer, encoding) {
      if (!encoding || encoding === "buffer")
        return buffer;
      else
        return buffer.toString(encoding);
    }
    __name(bufferToEncoding, "bufferToEncoding");
    exports.bufferToEncoding = bufferToEncoding;
    function nullCheck(path, callback) {
      if (("" + path).indexOf("\0") !== -1) {
        var er = new Error("Path must be a string without null bytes");
        er.code = ENOENT;
        if (typeof callback !== "function")
          throw er;
        process_1.default.nextTick(callback, er);
        return false;
      }
      return true;
    }
    __name(nullCheck, "nullCheck");
    function _modeToNumber(mode, def) {
      if (typeof mode === "number")
        return mode;
      if (typeof mode === "string")
        return parseInt(mode, 8);
      if (def)
        return modeToNumber(def);
      return void 0;
    }
    __name(_modeToNumber, "_modeToNumber");
    function modeToNumber(mode, def) {
      var result = _modeToNumber(mode, def);
      if (typeof result !== "number" || isNaN(result))
        throw new TypeError(ERRSTR.MODE_INT);
      return result;
    }
    __name(modeToNumber, "modeToNumber");
    function isFd(path) {
      return path >>> 0 === path;
    }
    __name(isFd, "isFd");
    function validateFd(fd) {
      if (!isFd(fd))
        throw TypeError(ERRSTR.FD);
    }
    __name(validateFd, "validateFd");
    function toUnixTimestamp(time) {
      if (typeof time === "string" && +time == time) {
        return +time;
      }
      if (time instanceof Date) {
        return time.getTime() / 1e3;
      }
      if (isFinite(time)) {
        if (time < 0) {
          return Date.now() / 1e3;
        }
        return time;
      }
      throw new Error("Cannot parse time: " + time);
    }
    __name(toUnixTimestamp, "toUnixTimestamp");
    exports.toUnixTimestamp = toUnixTimestamp;
    function validateUid(uid) {
      if (typeof uid !== "number")
        throw TypeError(ERRSTR.UID);
    }
    __name(validateUid, "validateUid");
    function validateGid(gid) {
      if (typeof gid !== "number")
        throw TypeError(ERRSTR.GID);
    }
    __name(validateGid, "validateGid");
    function flattenJSON(nestedJSON) {
      var flatJSON = {};
      function flatten3(pathPrefix, node) {
        for (var path in node) {
          var contentOrNode = node[path];
          var joinedPath = join2(pathPrefix, path);
          if (typeof contentOrNode === "string") {
            flatJSON[joinedPath] = contentOrNode;
          } else if (typeof contentOrNode === "object" && contentOrNode !== null && Object.keys(contentOrNode).length > 0) {
            flatten3(joinedPath, contentOrNode);
          } else {
            flatJSON[joinedPath] = null;
          }
        }
      }
      __name(flatten3, "flatten");
      flatten3("", nestedJSON);
      return flatJSON;
    }
    __name(flattenJSON, "flattenJSON");
    var Volume = function() {
      function Volume2(props) {
        if (props === void 0) {
          props = {};
        }
        this.ino = 0;
        this.inodes = {};
        this.releasedInos = [];
        this.fds = {};
        this.releasedFds = [];
        this.maxFiles = 1e4;
        this.openFiles = 0;
        this.promisesApi = (0, promises_1.default)(this);
        this.statWatchers = {};
        this.props = Object.assign({ Node: node_1.Node, Link: node_1.Link, File: node_1.File }, props);
        var root = this.createLink();
        root.setNode(this.createNode(true));
        var self2 = this;
        this.StatWatcher = function(_super) {
          __extends(StatWatcher2, _super);
          function StatWatcher2() {
            return _super.call(this, self2) || this;
          }
          __name(StatWatcher2, "StatWatcher");
          return StatWatcher2;
        }(StatWatcher);
        var _ReadStream = FsReadStream;
        this.ReadStream = function(_super) {
          __extends(class_1, _super);
          function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return _super.apply(this, __spreadArray([self2], args, false)) || this;
          }
          __name(class_1, "class_1");
          return class_1;
        }(_ReadStream);
        var _WriteStream = FsWriteStream;
        this.WriteStream = function(_super) {
          __extends(class_2, _super);
          function class_2() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return _super.apply(this, __spreadArray([self2], args, false)) || this;
          }
          __name(class_2, "class_2");
          return class_2;
        }(_WriteStream);
        this.FSWatcher = function(_super) {
          __extends(FSWatcher2, _super);
          function FSWatcher2() {
            return _super.call(this, self2) || this;
          }
          __name(FSWatcher2, "FSWatcher");
          return FSWatcher2;
        }(FSWatcher);
        this.root = root;
      }
      __name(Volume2, "Volume");
      Volume2.fromJSON = function(json, cwd) {
        var vol = new Volume2();
        vol.fromJSON(json, cwd);
        return vol;
      };
      Volume2.fromNestedJSON = function(json, cwd) {
        var vol = new Volume2();
        vol.fromNestedJSON(json, cwd);
        return vol;
      };
      Object.defineProperty(Volume2.prototype, "promises", {
        get: function() {
          if (this.promisesApi === null)
            throw new Error("Promise is not supported in this environment.");
          return this.promisesApi;
        },
        enumerable: false,
        configurable: true
      });
      Volume2.prototype.createLink = function(parent, name, isDirectory, perm) {
        if (isDirectory === void 0) {
          isDirectory = false;
        }
        if (!parent) {
          return new this.props.Link(this, null, "");
        }
        if (!name) {
          throw new Error("createLink: name cannot be empty");
        }
        return parent.createChild(name, this.createNode(isDirectory, perm));
      };
      Volume2.prototype.deleteLink = function(link) {
        var parent = link.parent;
        if (parent) {
          parent.deleteChild(link);
          return true;
        }
        return false;
      };
      Volume2.prototype.newInoNumber = function() {
        var releasedFd = this.releasedInos.pop();
        if (releasedFd)
          return releasedFd;
        else {
          this.ino = (this.ino + 1) % 4294967295;
          return this.ino;
        }
      };
      Volume2.prototype.newFdNumber = function() {
        var releasedFd = this.releasedFds.pop();
        return typeof releasedFd === "number" ? releasedFd : Volume2.fd--;
      };
      Volume2.prototype.createNode = function(isDirectory, perm) {
        if (isDirectory === void 0) {
          isDirectory = false;
        }
        var node = new this.props.Node(this.newInoNumber(), perm);
        if (isDirectory)
          node.setIsDirectory();
        this.inodes[node.ino] = node;
        return node;
      };
      Volume2.prototype.getNode = function(ino) {
        return this.inodes[ino];
      };
      Volume2.prototype.deleteNode = function(node) {
        node.del();
        delete this.inodes[node.ino];
        this.releasedInos.push(node.ino);
      };
      Volume2.prototype.genRndStr = function() {
        var str = (Math.random() + 1).toString(36).substring(2, 8);
        if (str.length === 6)
          return str;
        else
          return this.genRndStr();
      };
      Volume2.prototype.getLink = function(steps) {
        return this.root.walk(steps);
      };
      Volume2.prototype.getLinkOrThrow = function(filename, funcName) {
        var steps = filenameToSteps(filename);
        var link = this.getLink(steps);
        if (!link)
          throw createError(ENOENT, funcName, filename);
        return link;
      };
      Volume2.prototype.getResolvedLink = function(filenameOrSteps) {
        var steps = typeof filenameOrSteps === "string" ? filenameToSteps(filenameOrSteps) : filenameOrSteps;
        var link = this.root;
        var i = 0;
        while (i < steps.length) {
          var step = steps[i];
          link = link.getChild(step);
          if (!link)
            return null;
          var node = link.getNode();
          if (node.isSymlink()) {
            steps = node.symlink.concat(steps.slice(i + 1));
            link = this.root;
            i = 0;
            continue;
          }
          i++;
        }
        return link;
      };
      Volume2.prototype.getResolvedLinkOrThrow = function(filename, funcName) {
        var link = this.getResolvedLink(filename);
        if (!link)
          throw createError(ENOENT, funcName, filename);
        return link;
      };
      Volume2.prototype.resolveSymlinks = function(link) {
        return this.getResolvedLink(link.steps.slice(1));
      };
      Volume2.prototype.getLinkAsDirOrThrow = function(filename, funcName) {
        var link = this.getLinkOrThrow(filename, funcName);
        if (!link.getNode().isDirectory())
          throw createError(ENOTDIR, funcName, filename);
        return link;
      };
      Volume2.prototype.getLinkParent = function(steps) {
        return this.root.walk(steps, steps.length - 1);
      };
      Volume2.prototype.getLinkParentAsDirOrThrow = function(filenameOrSteps, funcName) {
        var steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps(filenameOrSteps);
        var link = this.getLinkParent(steps);
        if (!link)
          throw createError(ENOENT, funcName, sep + steps.join(sep));
        if (!link.getNode().isDirectory())
          throw createError(ENOTDIR, funcName, sep + steps.join(sep));
        return link;
      };
      Volume2.prototype.getFileByFd = function(fd) {
        return this.fds[String(fd)];
      };
      Volume2.prototype.getFileByFdOrThrow = function(fd, funcName) {
        if (!isFd(fd))
          throw TypeError(ERRSTR.FD);
        var file = this.getFileByFd(fd);
        if (!file)
          throw createError(EBADF, funcName);
        return file;
      };
      Volume2.prototype.wrapAsync = function(method, args, callback) {
        var _this = this;
        validateCallback(callback);
        (0, setImmediate_1.default)(function() {
          var result;
          try {
            result = method.apply(_this, args);
          } catch (err) {
            callback(err);
            return;
          }
          callback(null, result);
        });
      };
      Volume2.prototype._toJSON = function(link, json, path) {
        var _a2;
        if (link === void 0) {
          link = this.root;
        }
        if (json === void 0) {
          json = {};
        }
        var isEmpty2 = true;
        var children = link.children;
        if (link.getNode().isFile()) {
          children = (_a2 = {}, _a2[link.getName()] = link.parent.getChild(link.getName()), _a2);
          link = link.parent;
        }
        for (var name_1 in children) {
          isEmpty2 = false;
          var child = link.getChild(name_1);
          if (!child) {
            throw new Error("_toJSON: unexpected undefined");
          }
          var node = child.getNode();
          if (node.isFile()) {
            var filename = child.getPath();
            if (path)
              filename = relative(path, filename);
            json[filename] = node.getString();
          } else if (node.isDirectory()) {
            this._toJSON(child, json, path);
          }
        }
        var dirPath = link.getPath();
        if (path)
          dirPath = relative(path, dirPath);
        if (dirPath && isEmpty2) {
          json[dirPath] = null;
        }
        return json;
      };
      Volume2.prototype.toJSON = function(paths, json, isRelative) {
        if (json === void 0) {
          json = {};
        }
        if (isRelative === void 0) {
          isRelative = false;
        }
        var links = [];
        if (paths) {
          if (!(paths instanceof Array))
            paths = [paths];
          for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            var filename = pathToFilename(path);
            var link = this.getResolvedLink(filename);
            if (!link)
              continue;
            links.push(link);
          }
        } else {
          links.push(this.root);
        }
        if (!links.length)
          return json;
        for (var _a2 = 0, links_1 = links; _a2 < links_1.length; _a2++) {
          var link = links_1[_a2];
          this._toJSON(link, json, isRelative ? link.getPath() : "");
        }
        return json;
      };
      Volume2.prototype.fromJSON = function(json, cwd) {
        if (cwd === void 0) {
          cwd = process_1.default.cwd();
        }
        for (var filename in json) {
          var data = json[filename];
          filename = resolve(filename, cwd);
          if (typeof data === "string") {
            var dir = dirname(filename);
            this.mkdirpBase(dir, 511);
            this.writeFileSync(filename, data);
          } else {
            this.mkdirpBase(filename, 511);
          }
        }
      };
      Volume2.prototype.fromNestedJSON = function(json, cwd) {
        this.fromJSON(flattenJSON(json), cwd);
      };
      Volume2.prototype.reset = function() {
        this.ino = 0;
        this.inodes = {};
        this.releasedInos = [];
        this.fds = {};
        this.releasedFds = [];
        this.openFiles = 0;
        this.root = this.createLink();
        this.root.setNode(this.createNode(true));
      };
      Volume2.prototype.mountSync = function(mountpoint, json) {
        this.fromJSON(json, mountpoint);
      };
      Volume2.prototype.openLink = function(link, flagsNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) {
          resolveSymlinks = true;
        }
        if (this.openFiles >= this.maxFiles) {
          throw createError(EMFILE, "open", link.getPath());
        }
        var realLink = link;
        if (resolveSymlinks)
          realLink = this.resolveSymlinks(link);
        if (!realLink)
          throw createError(ENOENT, "open", link.getPath());
        var node = realLink.getNode();
        if (node.isDirectory()) {
          if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY)
            throw createError(EISDIR, "open", link.getPath());
        } else {
          if (flagsNum & O_DIRECTORY)
            throw createError(ENOTDIR, "open", link.getPath());
        }
        if (!(flagsNum & O_WRONLY)) {
          if (!node.canRead()) {
            throw createError(EACCES, "open", link.getPath());
          }
        }
        if (flagsNum & O_RDWR) {
        }
        var file = new this.props.File(link, node, flagsNum, this.newFdNumber());
        this.fds[file.fd] = file;
        this.openFiles++;
        if (flagsNum & O_TRUNC)
          file.truncate();
        return file;
      };
      Volume2.prototype.openFile = function(filename, flagsNum, modeNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) {
          resolveSymlinks = true;
        }
        var steps = filenameToSteps(filename);
        var link = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps);
        if (link && flagsNum & O_EXCL)
          throw createError(EEXIST, "open", filename);
        if (!link && flagsNum & O_CREAT) {
          var dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1));
          if (!dirLink)
            throw createError(ENOENT, "open", sep + steps.join(sep));
          if (flagsNum & O_CREAT && typeof modeNum === "number") {
            link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
          }
        }
        if (link)
          return this.openLink(link, flagsNum, resolveSymlinks);
        throw createError(ENOENT, "open", filename);
      };
      Volume2.prototype.openBase = function(filename, flagsNum, modeNum, resolveSymlinks) {
        if (resolveSymlinks === void 0) {
          resolveSymlinks = true;
        }
        var file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
        if (!file)
          throw createError(ENOENT, "open", filename);
        return file.fd;
      };
      Volume2.prototype.openSync = function(path, flags, mode) {
        if (mode === void 0) {
          mode = 438;
        }
        var modeNum = modeToNumber(mode);
        var fileName = pathToFilename(path);
        var flagsNum = flagsToNumber(flags);
        return this.openBase(fileName, flagsNum, modeNum);
      };
      Volume2.prototype.open = function(path, flags, a, b) {
        var mode = a;
        var callback = b;
        if (typeof a === "function") {
          mode = 438;
          callback = a;
        }
        mode = mode || 438;
        var modeNum = modeToNumber(mode);
        var fileName = pathToFilename(path);
        var flagsNum = flagsToNumber(flags);
        this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
      };
      Volume2.prototype.closeFile = function(file) {
        if (!this.fds[file.fd])
          return;
        this.openFiles--;
        delete this.fds[file.fd];
        this.releasedFds.push(file.fd);
      };
      Volume2.prototype.closeSync = function(fd) {
        validateFd(fd);
        var file = this.getFileByFdOrThrow(fd, "close");
        this.closeFile(file);
      };
      Volume2.prototype.close = function(fd, callback) {
        validateFd(fd);
        this.wrapAsync(this.closeSync, [fd], callback);
      };
      Volume2.prototype.openFileOrGetById = function(id, flagsNum, modeNum) {
        if (typeof id === "number") {
          var file = this.fds[id];
          if (!file)
            throw createError(ENOENT);
          return file;
        } else {
          return this.openFile(pathToFilename(id), flagsNum, modeNum);
        }
      };
      Volume2.prototype.readBase = function(fd, buffer, offset, length, position) {
        var file = this.getFileByFdOrThrow(fd);
        return file.read(buffer, Number(offset), Number(length), position);
      };
      Volume2.prototype.readSync = function(fd, buffer, offset, length, position) {
        validateFd(fd);
        return this.readBase(fd, buffer, offset, length, position);
      };
      Volume2.prototype.read = function(fd, buffer, offset, length, position, callback) {
        var _this = this;
        validateCallback(callback);
        if (length === 0) {
          return process_1.default.nextTick(function() {
            if (callback)
              callback(null, 0, buffer);
          });
        }
        (0, setImmediate_1.default)(function() {
          try {
            var bytes = _this.readBase(fd, buffer, offset, length, position);
            callback(null, bytes, buffer);
          } catch (err) {
            callback(err);
          }
        });
      };
      Volume2.prototype.readFileBase = function(id, flagsNum, encoding) {
        var result;
        var isUserFd = typeof id === "number";
        var userOwnsFd = isUserFd && isFd(id);
        var fd;
        if (userOwnsFd)
          fd = id;
        else {
          var filename = pathToFilename(id);
          var steps = filenameToSteps(filename);
          var link = this.getResolvedLink(steps);
          if (link) {
            var node = link.getNode();
            if (node.isDirectory())
              throw createError(EISDIR, "open", link.getPath());
          }
          fd = this.openSync(id, flagsNum);
        }
        try {
          result = bufferToEncoding(this.getFileByFdOrThrow(fd).getBuffer(), encoding);
        } finally {
          if (!userOwnsFd) {
            this.closeSync(fd);
          }
        }
        return result;
      };
      Volume2.prototype.readFileSync = function(file, options) {
        var opts = getReadFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        return this.readFileBase(file, flagsNum, opts.encoding);
      };
      Volume2.prototype.readFile = function(id, a, b) {
        var _a2 = optsAndCbGenerator(getReadFileOptions)(a, b), opts = _a2[0], callback = _a2[1];
        var flagsNum = flagsToNumber(opts.flag);
        this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
      };
      Volume2.prototype.writeBase = function(fd, buf, offset, length, position) {
        var file = this.getFileByFdOrThrow(fd, "write");
        return file.write(buf, offset, length, position);
      };
      Volume2.prototype.writeSync = function(fd, a, b, c, d) {
        validateFd(fd);
        var encoding;
        var offset;
        var length;
        var position;
        var isBuffer = typeof a !== "string";
        if (isBuffer) {
          offset = (b || 0) | 0;
          length = c;
          position = d;
        } else {
          position = b;
          encoding = c;
        }
        var buf = dataToBuffer(a, encoding);
        if (isBuffer) {
          if (typeof length === "undefined") {
            length = buf.length;
          }
        } else {
          offset = 0;
          length = buf.length;
        }
        return this.writeBase(fd, buf, offset, length, position);
      };
      Volume2.prototype.write = function(fd, a, b, c, d, e) {
        var _this = this;
        validateFd(fd);
        var offset;
        var length;
        var position;
        var encoding;
        var callback;
        var tipa = typeof a;
        var tipb = typeof b;
        var tipc = typeof c;
        var tipd = typeof d;
        if (tipa !== "string") {
          if (tipb === "function") {
            callback = b;
          } else if (tipc === "function") {
            offset = b | 0;
            callback = c;
          } else if (tipd === "function") {
            offset = b | 0;
            length = c;
            callback = d;
          } else {
            offset = b | 0;
            length = c;
            position = d;
            callback = e;
          }
        } else {
          if (tipb === "function") {
            callback = b;
          } else if (tipc === "function") {
            position = b;
            callback = c;
          } else if (tipd === "function") {
            position = b;
            encoding = c;
            callback = d;
          }
        }
        var buf = dataToBuffer(a, encoding);
        if (tipa !== "string") {
          if (typeof length === "undefined")
            length = buf.length;
        } else {
          offset = 0;
          length = buf.length;
        }
        var cb = validateCallback(callback);
        (0, setImmediate_1.default)(function() {
          try {
            var bytes = _this.writeBase(fd, buf, offset, length, position);
            if (tipa !== "string") {
              cb(null, bytes, buf);
            } else {
              cb(null, bytes, a);
            }
          } catch (err) {
            cb(err);
          }
        });
      };
      Volume2.prototype.writeFileBase = function(id, buf, flagsNum, modeNum) {
        var isUserFd = typeof id === "number";
        var fd;
        if (isUserFd)
          fd = id;
        else {
          fd = this.openBase(pathToFilename(id), flagsNum, modeNum);
        }
        var offset = 0;
        var length = buf.length;
        var position = flagsNum & O_APPEND ? void 0 : 0;
        try {
          while (length > 0) {
            var written = this.writeSync(fd, buf, offset, length, position);
            offset += written;
            length -= written;
            if (position !== void 0)
              position += written;
          }
        } finally {
          if (!isUserFd)
            this.closeSync(fd);
        }
      };
      Volume2.prototype.writeFileSync = function(id, data, options) {
        var opts = getWriteFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        var modeNum = modeToNumber(opts.mode);
        var buf = dataToBuffer(data, opts.encoding);
        this.writeFileBase(id, buf, flagsNum, modeNum);
      };
      Volume2.prototype.writeFile = function(id, data, a, b) {
        var options = a;
        var callback = b;
        if (typeof a === "function") {
          options = writeFileDefaults;
          callback = a;
        }
        var cb = validateCallback(callback);
        var opts = getWriteFileOptions(options);
        var flagsNum = flagsToNumber(opts.flag);
        var modeNum = modeToNumber(opts.mode);
        var buf = dataToBuffer(data, opts.encoding);
        this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
      };
      Volume2.prototype.linkBase = function(filename1, filename2) {
        var steps1 = filenameToSteps(filename1);
        var link1 = this.getLink(steps1);
        if (!link1)
          throw createError(ENOENT, "link", filename1, filename2);
        var steps2 = filenameToSteps(filename2);
        var dir2 = this.getLinkParent(steps2);
        if (!dir2)
          throw createError(ENOENT, "link", filename1, filename2);
        var name = steps2[steps2.length - 1];
        if (dir2.getChild(name))
          throw createError(EEXIST, "link", filename1, filename2);
        var node = link1.getNode();
        node.nlink++;
        dir2.createChild(name, node);
      };
      Volume2.prototype.copyFileBase = function(src, dest, flags) {
        var buf = this.readFileSync(src);
        if (flags & COPYFILE_EXCL) {
          if (this.existsSync(dest)) {
            throw createError(EEXIST, "copyFile", src, dest);
          }
        }
        if (flags & COPYFILE_FICLONE_FORCE) {
          throw createError(ENOSYS, "copyFile", src, dest);
        }
        this.writeFileBase(dest, buf, FLAGS.w, 438);
      };
      Volume2.prototype.copyFileSync = function(src, dest, flags) {
        var srcFilename = pathToFilename(src);
        var destFilename = pathToFilename(dest);
        return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
      };
      Volume2.prototype.copyFile = function(src, dest, a, b) {
        var srcFilename = pathToFilename(src);
        var destFilename = pathToFilename(dest);
        var flags;
        var callback;
        if (typeof a === "function") {
          flags = 0;
          callback = a;
        } else {
          flags = a;
          callback = b;
        }
        validateCallback(callback);
        this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
      };
      Volume2.prototype.linkSync = function(existingPath, newPath) {
        var existingPathFilename = pathToFilename(existingPath);
        var newPathFilename = pathToFilename(newPath);
        this.linkBase(existingPathFilename, newPathFilename);
      };
      Volume2.prototype.link = function(existingPath, newPath, callback) {
        var existingPathFilename = pathToFilename(existingPath);
        var newPathFilename = pathToFilename(newPath);
        this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
      };
      Volume2.prototype.unlinkBase = function(filename) {
        var steps = filenameToSteps(filename);
        var link = this.getLink(steps);
        if (!link)
          throw createError(ENOENT, "unlink", filename);
        if (link.length)
          throw Error("Dir not empty...");
        this.deleteLink(link);
        var node = link.getNode();
        node.nlink--;
        if (node.nlink <= 0) {
          this.deleteNode(node);
        }
      };
      Volume2.prototype.unlinkSync = function(path) {
        var filename = pathToFilename(path);
        this.unlinkBase(filename);
      };
      Volume2.prototype.unlink = function(path, callback) {
        var filename = pathToFilename(path);
        this.wrapAsync(this.unlinkBase, [filename], callback);
      };
      Volume2.prototype.symlinkBase = function(targetFilename, pathFilename) {
        var pathSteps = filenameToSteps(pathFilename);
        var dirLink = this.getLinkParent(pathSteps);
        if (!dirLink)
          throw createError(ENOENT, "symlink", targetFilename, pathFilename);
        var name = pathSteps[pathSteps.length - 1];
        if (dirLink.getChild(name))
          throw createError(EEXIST, "symlink", targetFilename, pathFilename);
        var symlink = dirLink.createChild(name);
        symlink.getNode().makeSymlink(filenameToSteps(targetFilename));
        return symlink;
      };
      Volume2.prototype.symlinkSync = function(target, path, type) {
        var targetFilename = pathToFilename(target);
        var pathFilename = pathToFilename(path);
        this.symlinkBase(targetFilename, pathFilename);
      };
      Volume2.prototype.symlink = function(target, path, a, b) {
        var callback = validateCallback(typeof a === "function" ? a : b);
        var targetFilename = pathToFilename(target);
        var pathFilename = pathToFilename(path);
        this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
      };
      Volume2.prototype.realpathBase = function(filename, encoding) {
        var steps = filenameToSteps(filename);
        var realLink = this.getResolvedLink(steps);
        if (!realLink)
          throw createError(ENOENT, "realpath", filename);
        return (0, encoding_1.strToEncoding)(realLink.getPath() || "/", encoding);
      };
      Volume2.prototype.realpathSync = function(path, options) {
        return this.realpathBase(pathToFilename(path), getRealpathOptions(options).encoding);
      };
      Volume2.prototype.realpath = function(path, a, b) {
        var _a2 = getRealpathOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
        var pathFilename = pathToFilename(path);
        this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
      };
      Volume2.prototype.lstatBase = function(filename, bigint, throwIfNoEntry) {
        if (bigint === void 0) {
          bigint = false;
        }
        if (throwIfNoEntry === void 0) {
          throwIfNoEntry = false;
        }
        var link = this.getLink(filenameToSteps(filename));
        if (link) {
          return Stats_1.default.build(link.getNode(), bigint);
        } else if (!throwIfNoEntry) {
          return void 0;
        } else {
          throw createError(ENOENT, "lstat", filename);
        }
      };
      Volume2.prototype.lstatSync = function(path, options) {
        var _a2 = getStatOptions(options), _b = _a2.throwIfNoEntry, throwIfNoEntry = _b === void 0 ? true : _b, _c = _a2.bigint, bigint = _c === void 0 ? false : _c;
        return this.lstatBase(pathToFilename(path), bigint, throwIfNoEntry);
      };
      Volume2.prototype.lstat = function(path, a, b) {
        var _a2 = getStatOptsAndCb(a, b), _b = _a2[0], _c = _b.throwIfNoEntry, throwIfNoEntry = _c === void 0 ? true : _c, _d = _b.bigint, bigint = _d === void 0 ? false : _d, callback = _a2[1];
        this.wrapAsync(this.lstatBase, [pathToFilename(path), bigint, throwIfNoEntry], callback);
      };
      Volume2.prototype.statBase = function(filename, bigint, throwIfNoEntry) {
        if (bigint === void 0) {
          bigint = false;
        }
        if (throwIfNoEntry === void 0) {
          throwIfNoEntry = true;
        }
        var link = this.getResolvedLink(filenameToSteps(filename));
        if (link) {
          return Stats_1.default.build(link.getNode(), bigint);
        } else if (!throwIfNoEntry) {
          return void 0;
        } else {
          throw createError(ENOENT, "stat", filename);
        }
      };
      Volume2.prototype.statSync = function(path, options) {
        var _a2 = getStatOptions(options), _b = _a2.bigint, bigint = _b === void 0 ? true : _b, _c = _a2.throwIfNoEntry, throwIfNoEntry = _c === void 0 ? true : _c;
        return this.statBase(pathToFilename(path), bigint, throwIfNoEntry);
      };
      Volume2.prototype.stat = function(path, a, b) {
        var _a2 = getStatOptsAndCb(a, b), _b = _a2[0], _c = _b.bigint, bigint = _c === void 0 ? false : _c, _d = _b.throwIfNoEntry, throwIfNoEntry = _d === void 0 ? true : _d, callback = _a2[1];
        this.wrapAsync(this.statBase, [pathToFilename(path), bigint, throwIfNoEntry], callback);
      };
      Volume2.prototype.fstatBase = function(fd, bigint) {
        if (bigint === void 0) {
          bigint = false;
        }
        var file = this.getFileByFd(fd);
        if (!file)
          throw createError(EBADF, "fstat");
        return Stats_1.default.build(file.node, bigint);
      };
      Volume2.prototype.fstatSync = function(fd, options) {
        return this.fstatBase(fd, getStatOptions(options).bigint);
      };
      Volume2.prototype.fstat = function(fd, a, b) {
        var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
        this.wrapAsync(this.fstatBase, [fd, opts.bigint], callback);
      };
      Volume2.prototype.renameBase = function(oldPathFilename, newPathFilename) {
        var link = this.getLink(filenameToSteps(oldPathFilename));
        if (!link)
          throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
        var newPathSteps = filenameToSteps(newPathFilename);
        var newPathDirLink = this.getLinkParent(newPathSteps);
        if (!newPathDirLink)
          throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
        var oldLinkParent = link.parent;
        if (oldLinkParent) {
          oldLinkParent.deleteChild(link);
        }
        var name = newPathSteps[newPathSteps.length - 1];
        link.name = name;
        link.steps = __spreadArray(__spreadArray([], newPathDirLink.steps, true), [name], false);
        newPathDirLink.setChild(link.getName(), link);
      };
      Volume2.prototype.renameSync = function(oldPath, newPath) {
        var oldPathFilename = pathToFilename(oldPath);
        var newPathFilename = pathToFilename(newPath);
        this.renameBase(oldPathFilename, newPathFilename);
      };
      Volume2.prototype.rename = function(oldPath, newPath, callback) {
        var oldPathFilename = pathToFilename(oldPath);
        var newPathFilename = pathToFilename(newPath);
        this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
      };
      Volume2.prototype.existsBase = function(filename) {
        return !!this.statBase(filename);
      };
      Volume2.prototype.existsSync = function(path) {
        try {
          return this.existsBase(pathToFilename(path));
        } catch (err) {
          return false;
        }
      };
      Volume2.prototype.exists = function(path, callback) {
        var _this = this;
        var filename = pathToFilename(path);
        if (typeof callback !== "function")
          throw Error(ERRSTR.CB);
        (0, setImmediate_1.default)(function() {
          try {
            callback(_this.existsBase(filename));
          } catch (err) {
            callback(false);
          }
        });
      };
      Volume2.prototype.accessBase = function(filename, mode) {
        var link = this.getLinkOrThrow(filename, "access");
      };
      Volume2.prototype.accessSync = function(path, mode) {
        if (mode === void 0) {
          mode = F_OK;
        }
        var filename = pathToFilename(path);
        mode = mode | 0;
        this.accessBase(filename, mode);
      };
      Volume2.prototype.access = function(path, a, b) {
        var mode = F_OK;
        var callback;
        if (typeof a !== "function") {
          mode = a | 0;
          callback = validateCallback(b);
        } else {
          callback = a;
        }
        var filename = pathToFilename(path);
        this.wrapAsync(this.accessBase, [filename, mode], callback);
      };
      Volume2.prototype.appendFileSync = function(id, data, options) {
        if (options === void 0) {
          options = appendFileDefaults;
        }
        var opts = getAppendFileOpts(options);
        if (!opts.flag || isFd(id))
          opts.flag = "a";
        this.writeFileSync(id, data, opts);
      };
      Volume2.prototype.appendFile = function(id, data, a, b) {
        var _a2 = getAppendFileOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
        if (!opts.flag || isFd(id))
          opts.flag = "a";
        this.writeFile(id, data, opts, callback);
      };
      Volume2.prototype.readdirBase = function(filename, options) {
        var steps = filenameToSteps(filename);
        var link = this.getResolvedLink(steps);
        if (!link)
          throw createError(ENOENT, "readdir", filename);
        var node = link.getNode();
        if (!node.isDirectory())
          throw createError(ENOTDIR, "scandir", filename);
        if (options.withFileTypes) {
          var list_1 = [];
          for (var name_2 in link.children) {
            var child = link.getChild(name_2);
            if (!child) {
              continue;
            }
            list_1.push(Dirent_1.default.build(child, options.encoding));
          }
          if (!isWin && options.encoding !== "buffer")
            list_1.sort(function(a, b) {
              if (a.name < b.name)
                return -1;
              if (a.name > b.name)
                return 1;
              return 0;
            });
          return list_1;
        }
        var list = [];
        for (var name_3 in link.children) {
          list.push((0, encoding_1.strToEncoding)(name_3, options.encoding));
        }
        if (!isWin && options.encoding !== "buffer")
          list.sort();
        return list;
      };
      Volume2.prototype.readdirSync = function(path, options) {
        var opts = getReaddirOptions(options);
        var filename = pathToFilename(path);
        return this.readdirBase(filename, opts);
      };
      Volume2.prototype.readdir = function(path, a, b) {
        var _a2 = getReaddirOptsAndCb(a, b), options = _a2[0], callback = _a2[1];
        var filename = pathToFilename(path);
        this.wrapAsync(this.readdirBase, [filename, options], callback);
      };
      Volume2.prototype.readlinkBase = function(filename, encoding) {
        var link = this.getLinkOrThrow(filename, "readlink");
        var node = link.getNode();
        if (!node.isSymlink())
          throw createError(EINVAL, "readlink", filename);
        var str = sep + node.symlink.join(sep);
        return (0, encoding_1.strToEncoding)(str, encoding);
      };
      Volume2.prototype.readlinkSync = function(path, options) {
        var opts = getDefaultOpts(options);
        var filename = pathToFilename(path);
        return this.readlinkBase(filename, opts.encoding);
      };
      Volume2.prototype.readlink = function(path, a, b) {
        var _a2 = getDefaultOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
        var filename = pathToFilename(path);
        this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
      };
      Volume2.prototype.fsyncBase = function(fd) {
        this.getFileByFdOrThrow(fd, "fsync");
      };
      Volume2.prototype.fsyncSync = function(fd) {
        this.fsyncBase(fd);
      };
      Volume2.prototype.fsync = function(fd, callback) {
        this.wrapAsync(this.fsyncBase, [fd], callback);
      };
      Volume2.prototype.fdatasyncBase = function(fd) {
        this.getFileByFdOrThrow(fd, "fdatasync");
      };
      Volume2.prototype.fdatasyncSync = function(fd) {
        this.fdatasyncBase(fd);
      };
      Volume2.prototype.fdatasync = function(fd, callback) {
        this.wrapAsync(this.fdatasyncBase, [fd], callback);
      };
      Volume2.prototype.ftruncateBase = function(fd, len) {
        var file = this.getFileByFdOrThrow(fd, "ftruncate");
        file.truncate(len);
      };
      Volume2.prototype.ftruncateSync = function(fd, len) {
        this.ftruncateBase(fd, len);
      };
      Volume2.prototype.ftruncate = function(fd, a, b) {
        var len = typeof a === "number" ? a : 0;
        var callback = validateCallback(typeof a === "number" ? b : a);
        this.wrapAsync(this.ftruncateBase, [fd, len], callback);
      };
      Volume2.prototype.truncateBase = function(path, len) {
        var fd = this.openSync(path, "r+");
        try {
          this.ftruncateSync(fd, len);
        } finally {
          this.closeSync(fd);
        }
      };
      Volume2.prototype.truncateSync = function(id, len) {
        if (isFd(id))
          return this.ftruncateSync(id, len);
        this.truncateBase(id, len);
      };
      Volume2.prototype.truncate = function(id, a, b) {
        var len = typeof a === "number" ? a : 0;
        var callback = validateCallback(typeof a === "number" ? b : a);
        if (isFd(id))
          return this.ftruncate(id, len, callback);
        this.wrapAsync(this.truncateBase, [id, len], callback);
      };
      Volume2.prototype.futimesBase = function(fd, atime, mtime) {
        var file = this.getFileByFdOrThrow(fd, "futimes");
        var node = file.node;
        node.atime = new Date(atime * 1e3);
        node.mtime = new Date(mtime * 1e3);
      };
      Volume2.prototype.futimesSync = function(fd, atime, mtime) {
        this.futimesBase(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
      };
      Volume2.prototype.futimes = function(fd, atime, mtime, callback) {
        this.wrapAsync(this.futimesBase, [fd, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
      };
      Volume2.prototype.utimesBase = function(filename, atime, mtime) {
        var fd = this.openSync(filename, "r");
        try {
          this.futimesBase(fd, atime, mtime);
        } finally {
          this.closeSync(fd);
        }
      };
      Volume2.prototype.utimesSync = function(path, atime, mtime) {
        this.utimesBase(pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime));
      };
      Volume2.prototype.utimes = function(path, atime, mtime, callback) {
        this.wrapAsync(this.utimesBase, [pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
      };
      Volume2.prototype.mkdirBase = function(filename, modeNum) {
        var steps = filenameToSteps(filename);
        if (!steps.length) {
          throw createError(EEXIST, "mkdir", filename);
        }
        var dir = this.getLinkParentAsDirOrThrow(filename, "mkdir");
        var name = steps[steps.length - 1];
        if (dir.getChild(name))
          throw createError(EEXIST, "mkdir", filename);
        dir.createChild(name, this.createNode(true, modeNum));
      };
      Volume2.prototype.mkdirpBase = function(filename, modeNum) {
        var fullPath = resolve(filename);
        var fullPathSansSlash = fullPath.substring(1);
        var steps = !fullPathSansSlash ? [] : fullPathSansSlash.split(sep);
        var link = this.root;
        var created = false;
        for (var i = 0; i < steps.length; i++) {
          var step = steps[i];
          if (!link.getNode().isDirectory())
            throw createError(ENOTDIR, "mkdir", link.getPath());
          var child = link.getChild(step);
          if (child) {
            if (child.getNode().isDirectory())
              link = child;
            else
              throw createError(ENOTDIR, "mkdir", child.getPath());
          } else {
            link = link.createChild(step, this.createNode(true, modeNum));
            created = true;
          }
        }
        return created ? fullPath : void 0;
      };
      Volume2.prototype.mkdirSync = function(path, options) {
        var opts = getMkdirOptions(options);
        var modeNum = modeToNumber(opts.mode, 511);
        var filename = pathToFilename(path);
        if (opts.recursive)
          return this.mkdirpBase(filename, modeNum);
        this.mkdirBase(filename, modeNum);
      };
      Volume2.prototype.mkdir = function(path, a, b) {
        var opts = getMkdirOptions(a);
        var callback = validateCallback(typeof a === "function" ? a : b);
        var modeNum = modeToNumber(opts.mode, 511);
        var filename = pathToFilename(path);
        if (opts.recursive)
          this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);
        else
          this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
      };
      Volume2.prototype.mkdirpSync = function(path, mode) {
        return this.mkdirSync(path, { mode, recursive: true });
      };
      Volume2.prototype.mkdirp = function(path, a, b) {
        var mode = typeof a === "function" ? void 0 : a;
        var callback = validateCallback(typeof a === "function" ? a : b);
        this.mkdir(path, { mode, recursive: true }, callback);
      };
      Volume2.prototype.mkdtempBase = function(prefix, encoding, retry) {
        if (retry === void 0) {
          retry = 5;
        }
        var filename = prefix + this.genRndStr();
        try {
          this.mkdirBase(filename, 511);
          return (0, encoding_1.strToEncoding)(filename, encoding);
        } catch (err) {
          if (err.code === EEXIST) {
            if (retry > 1)
              return this.mkdtempBase(prefix, encoding, retry - 1);
            else
              throw Error("Could not create temp dir.");
          } else
            throw err;
        }
      };
      Volume2.prototype.mkdtempSync = function(prefix, options) {
        var encoding = getDefaultOpts(options).encoding;
        if (!prefix || typeof prefix !== "string")
          throw new TypeError("filename prefix is required");
        nullCheck(prefix);
        return this.mkdtempBase(prefix, encoding);
      };
      Volume2.prototype.mkdtemp = function(prefix, a, b) {
        var _a2 = getDefaultOptsAndCb(a, b), encoding = _a2[0].encoding, callback = _a2[1];
        if (!prefix || typeof prefix !== "string")
          throw new TypeError("filename prefix is required");
        if (!nullCheck(prefix))
          return;
        this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
      };
      Volume2.prototype.rmdirBase = function(filename, options) {
        var opts = getRmdirOptions(options);
        var link = this.getLinkAsDirOrThrow(filename, "rmdir");
        if (link.length && !opts.recursive)
          throw createError(ENOTEMPTY, "rmdir", filename);
        this.deleteLink(link);
      };
      Volume2.prototype.rmdirSync = function(path, options) {
        this.rmdirBase(pathToFilename(path), options);
      };
      Volume2.prototype.rmdir = function(path, a, b) {
        var opts = getRmdirOptions(a);
        var callback = validateCallback(typeof a === "function" ? a : b);
        this.wrapAsync(this.rmdirBase, [pathToFilename(path), opts], callback);
      };
      Volume2.prototype.rmBase = function(filename, options) {
        if (options === void 0) {
          options = {};
        }
        var link = this.getResolvedLink(filename);
        if (!link) {
          if (!options.force)
            throw createError(ENOENT, "stat", filename);
          return;
        }
        if (link.getNode().isDirectory()) {
          if (!options.recursive) {
            throw createError(ERR_FS_EISDIR, "rm", filename);
          }
        }
        this.deleteLink(link);
      };
      Volume2.prototype.rmSync = function(path, options) {
        this.rmBase(pathToFilename(path), options);
      };
      Volume2.prototype.rm = function(path, a, b) {
        var _a2 = getRmOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
        this.wrapAsync(this.rmBase, [pathToFilename(path), opts], callback);
      };
      Volume2.prototype.fchmodBase = function(fd, modeNum) {
        var file = this.getFileByFdOrThrow(fd, "fchmod");
        file.chmod(modeNum);
      };
      Volume2.prototype.fchmodSync = function(fd, mode) {
        this.fchmodBase(fd, modeToNumber(mode));
      };
      Volume2.prototype.fchmod = function(fd, mode, callback) {
        this.wrapAsync(this.fchmodBase, [fd, modeToNumber(mode)], callback);
      };
      Volume2.prototype.chmodBase = function(filename, modeNum) {
        var fd = this.openSync(filename, "r");
        try {
          this.fchmodBase(fd, modeNum);
        } finally {
          this.closeSync(fd);
        }
      };
      Volume2.prototype.chmodSync = function(path, mode) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.chmodBase(filename, modeNum);
      };
      Volume2.prototype.chmod = function(path, mode, callback) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
      };
      Volume2.prototype.lchmodBase = function(filename, modeNum) {
        var fd = this.openBase(filename, O_RDWR, 0, false);
        try {
          this.fchmodBase(fd, modeNum);
        } finally {
          this.closeSync(fd);
        }
      };
      Volume2.prototype.lchmodSync = function(path, mode) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.lchmodBase(filename, modeNum);
      };
      Volume2.prototype.lchmod = function(path, mode, callback) {
        var modeNum = modeToNumber(mode);
        var filename = pathToFilename(path);
        this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
      };
      Volume2.prototype.fchownBase = function(fd, uid, gid) {
        this.getFileByFdOrThrow(fd, "fchown").chown(uid, gid);
      };
      Volume2.prototype.fchownSync = function(fd, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.fchownBase(fd, uid, gid);
      };
      Volume2.prototype.fchown = function(fd, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.fchownBase, [fd, uid, gid], callback);
      };
      Volume2.prototype.chownBase = function(filename, uid, gid) {
        var link = this.getResolvedLinkOrThrow(filename, "chown");
        var node = link.getNode();
        node.chown(uid, gid);
      };
      Volume2.prototype.chownSync = function(path, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.chownBase(pathToFilename(path), uid, gid);
      };
      Volume2.prototype.chown = function(path, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.chownBase, [pathToFilename(path), uid, gid], callback);
      };
      Volume2.prototype.lchownBase = function(filename, uid, gid) {
        this.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
      };
      Volume2.prototype.lchownSync = function(path, uid, gid) {
        validateUid(uid);
        validateGid(gid);
        this.lchownBase(pathToFilename(path), uid, gid);
      };
      Volume2.prototype.lchown = function(path, uid, gid, callback) {
        validateUid(uid);
        validateGid(gid);
        this.wrapAsync(this.lchownBase, [pathToFilename(path), uid, gid], callback);
      };
      Volume2.prototype.watchFile = function(path, a, b) {
        var filename = pathToFilename(path);
        var options = a;
        var listener = b;
        if (typeof options === "function") {
          listener = a;
          options = null;
        }
        if (typeof listener !== "function") {
          throw Error('"watchFile()" requires a listener function');
        }
        var interval = 5007;
        var persistent = true;
        if (options && typeof options === "object") {
          if (typeof options.interval === "number")
            interval = options.interval;
          if (typeof options.persistent === "boolean")
            persistent = options.persistent;
        }
        var watcher = this.statWatchers[filename];
        if (!watcher) {
          watcher = new this.StatWatcher();
          watcher.start(filename, persistent, interval);
          this.statWatchers[filename] = watcher;
        }
        watcher.addListener("change", listener);
        return watcher;
      };
      Volume2.prototype.unwatchFile = function(path, listener) {
        var filename = pathToFilename(path);
        var watcher = this.statWatchers[filename];
        if (!watcher)
          return;
        if (typeof listener === "function") {
          watcher.removeListener("change", listener);
        } else {
          watcher.removeAllListeners("change");
        }
        if (watcher.listenerCount("change") === 0) {
          watcher.stop();
          delete this.statWatchers[filename];
        }
      };
      Volume2.prototype.createReadStream = function(path, options) {
        return new this.ReadStream(path, options);
      };
      Volume2.prototype.createWriteStream = function(path, options) {
        return new this.WriteStream(path, options);
      };
      Volume2.prototype.watch = function(path, options, listener) {
        var filename = pathToFilename(path);
        var givenOptions = options;
        if (typeof options === "function") {
          listener = options;
          givenOptions = null;
        }
        var _a2 = getDefaultOpts(givenOptions), persistent = _a2.persistent, recursive = _a2.recursive, encoding = _a2.encoding;
        if (persistent === void 0)
          persistent = true;
        if (recursive === void 0)
          recursive = false;
        var watcher = new this.FSWatcher();
        watcher.start(filename, persistent, recursive, encoding);
        if (listener) {
          watcher.addListener("change", listener);
        }
        return watcher;
      };
      Volume2.fd = 2147483647;
      return Volume2;
    }();
    exports.Volume = Volume;
    function emitStop(self2) {
      self2.emit("stop");
    }
    __name(emitStop, "emitStop");
    var StatWatcher = function(_super) {
      __extends(StatWatcher2, _super);
      function StatWatcher2(vol) {
        var _this = _super.call(this) || this;
        _this.onInterval = function() {
          try {
            var stats = _this.vol.statSync(_this.filename);
            if (_this.hasChanged(stats)) {
              _this.emit("change", stats, _this.prev);
              _this.prev = stats;
            }
          } finally {
            _this.loop();
          }
        };
        _this.vol = vol;
        return _this;
      }
      __name(StatWatcher2, "StatWatcher");
      StatWatcher2.prototype.loop = function() {
        this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
      };
      StatWatcher2.prototype.hasChanged = function(stats) {
        if (stats.mtimeMs > this.prev.mtimeMs)
          return true;
        if (stats.nlink !== this.prev.nlink)
          return true;
        return false;
      };
      StatWatcher2.prototype.start = function(path, persistent, interval) {
        if (persistent === void 0) {
          persistent = true;
        }
        if (interval === void 0) {
          interval = 5007;
        }
        this.filename = pathToFilename(path);
        this.setTimeout = persistent ? setTimeout.bind(typeof globalThis !== "undefined" ? globalThis : globalThis) : setTimeoutUnref_1.default;
        this.interval = interval;
        this.prev = this.vol.statSync(this.filename);
        this.loop();
      };
      StatWatcher2.prototype.stop = function() {
        clearTimeout(this.timeoutRef);
        process_1.default.nextTick(emitStop, this);
      };
      return StatWatcher2;
    }(events_1.EventEmitter);
    exports.StatWatcher = StatWatcher;
    var pool;
    function allocNewPool(poolSize) {
      pool = (0, buffer_1.bufferAllocUnsafe)(poolSize);
      pool.used = 0;
    }
    __name(allocNewPool, "allocNewPool");
    util.inherits(FsReadStream, stream_1.Readable);
    exports.ReadStream = FsReadStream;
    function FsReadStream(vol, path, options) {
      if (!(this instanceof FsReadStream))
        return new FsReadStream(vol, path, options);
      this._vol = vol;
      options = Object.assign({}, getOptions(options, {}));
      if (options.highWaterMark === void 0)
        options.highWaterMark = 64 * 1024;
      stream_1.Readable.call(this, options);
      this.path = pathToFilename(path);
      this.fd = options.fd === void 0 ? null : options.fd;
      this.flags = options.flags === void 0 ? "r" : options.flags;
      this.mode = options.mode === void 0 ? 438 : options.mode;
      this.start = options.start;
      this.end = options.end;
      this.autoClose = options.autoClose === void 0 ? true : options.autoClose;
      this.pos = void 0;
      this.bytesRead = 0;
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw new TypeError('"start" option must be a Number');
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if (typeof this.end !== "number") {
          throw new TypeError('"end" option must be a Number');
        }
        if (this.start > this.end) {
          throw new Error('"start" option must be <= "end" option');
        }
        this.pos = this.start;
      }
      if (typeof this.fd !== "number")
        this.open();
      this.on("end", function() {
        if (this.autoClose) {
          if (this.destroy)
            this.destroy();
        }
      });
    }
    __name(FsReadStream, "FsReadStream");
    FsReadStream.prototype.open = function() {
      var self2 = this;
      this._vol.open(this.path, this.flags, this.mode, function(er, fd) {
        if (er) {
          if (self2.autoClose) {
            if (self2.destroy)
              self2.destroy();
          }
          self2.emit("error", er);
          return;
        }
        self2.fd = fd;
        self2.emit("open", fd);
        self2.read();
      });
    };
    FsReadStream.prototype._read = function(n) {
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._read(n);
        });
      }
      if (this.destroyed)
        return;
      if (!pool || pool.length - pool.used < kMinPoolSpace) {
        allocNewPool(this._readableState.highWaterMark);
      }
      var thisPool = pool;
      var toRead = Math.min(pool.length - pool.used, n);
      var start = pool.used;
      if (this.pos !== void 0)
        toRead = Math.min(this.end - this.pos + 1, toRead);
      if (toRead <= 0)
        return this.push(null);
      var self2 = this;
      this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
      if (this.pos !== void 0)
        this.pos += toRead;
      pool.used += toRead;
      function onread(er, bytesRead) {
        if (er) {
          if (self2.autoClose && self2.destroy) {
            self2.destroy();
          }
          self2.emit("error", er);
        } else {
          var b = null;
          if (bytesRead > 0) {
            self2.bytesRead += bytesRead;
            b = thisPool.slice(start, start + bytesRead);
          }
          self2.push(b);
        }
      }
      __name(onread, "onread");
    };
    FsReadStream.prototype._destroy = function(err, cb) {
      this.close(function(err2) {
        cb(err || err2);
      });
    };
    FsReadStream.prototype.close = function(cb) {
      var _this = this;
      var _a2;
      if (cb)
        this.once("close", cb);
      if (this.closed || typeof this.fd !== "number") {
        if (typeof this.fd !== "number") {
          this.once("open", closeOnOpen);
          return;
        }
        return process_1.default.nextTick(function() {
          return _this.emit("close");
        });
      }
      if (typeof ((_a2 = this._readableState) === null || _a2 === void 0 ? void 0 : _a2.closed) === "boolean") {
        this._readableState.closed = true;
      } else {
        this.closed = true;
      }
      this._vol.close(this.fd, function(er) {
        if (er)
          _this.emit("error", er);
        else
          _this.emit("close");
      });
      this.fd = null;
    };
    function closeOnOpen(fd) {
      this.close();
    }
    __name(closeOnOpen, "closeOnOpen");
    util.inherits(FsWriteStream, stream_1.Writable);
    exports.WriteStream = FsWriteStream;
    function FsWriteStream(vol, path, options) {
      if (!(this instanceof FsWriteStream))
        return new FsWriteStream(vol, path, options);
      this._vol = vol;
      options = Object.assign({}, getOptions(options, {}));
      stream_1.Writable.call(this, options);
      this.path = pathToFilename(path);
      this.fd = options.fd === void 0 ? null : options.fd;
      this.flags = options.flags === void 0 ? "w" : options.flags;
      this.mode = options.mode === void 0 ? 438 : options.mode;
      this.start = options.start;
      this.autoClose = options.autoClose === void 0 ? true : !!options.autoClose;
      this.pos = void 0;
      this.bytesWritten = 0;
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw new TypeError('"start" option must be a Number');
        }
        if (this.start < 0) {
          throw new Error('"start" must be >= zero');
        }
        this.pos = this.start;
      }
      if (options.encoding)
        this.setDefaultEncoding(options.encoding);
      if (typeof this.fd !== "number")
        this.open();
      this.once("finish", function() {
        if (this.autoClose) {
          this.close();
        }
      });
    }
    __name(FsWriteStream, "FsWriteStream");
    FsWriteStream.prototype.open = function() {
      this._vol.open(this.path, this.flags, this.mode, function(er, fd) {
        if (er) {
          if (this.autoClose && this.destroy) {
            this.destroy();
          }
          this.emit("error", er);
          return;
        }
        this.fd = fd;
        this.emit("open", fd);
      }.bind(this));
    };
    FsWriteStream.prototype._write = function(data, encoding, cb) {
      if (!(data instanceof buffer_1.Buffer || data instanceof Uint8Array))
        return this.emit("error", new Error("Invalid data"));
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._write(data, encoding, cb);
        });
      }
      var self2 = this;
      this._vol.write(this.fd, data, 0, data.length, this.pos, function(er, bytes) {
        if (er) {
          if (self2.autoClose && self2.destroy) {
            self2.destroy();
          }
          return cb(er);
        }
        self2.bytesWritten += bytes;
        cb();
      });
      if (this.pos !== void 0)
        this.pos += data.length;
    };
    FsWriteStream.prototype._writev = function(data, cb) {
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._writev(data, cb);
        });
      }
      var self2 = this;
      var len = data.length;
      var chunks = new Array(len);
      var size = 0;
      for (var i = 0; i < len; i++) {
        var chunk = data[i].chunk;
        chunks[i] = chunk;
        size += chunk.length;
      }
      var buf = buffer_1.Buffer.concat(chunks);
      this._vol.write(this.fd, buf, 0, buf.length, this.pos, function(er, bytes) {
        if (er) {
          if (self2.destroy)
            self2.destroy();
          return cb(er);
        }
        self2.bytesWritten += bytes;
        cb();
      });
      if (this.pos !== void 0)
        this.pos += size;
    };
    FsWriteStream.prototype.close = function(cb) {
      var _this = this;
      var _a2;
      if (cb)
        this.once("close", cb);
      if (this.closed || typeof this.fd !== "number") {
        if (typeof this.fd !== "number") {
          this.once("open", closeOnOpen);
          return;
        }
        return process_1.default.nextTick(function() {
          return _this.emit("close");
        });
      }
      if (typeof ((_a2 = this._writableState) === null || _a2 === void 0 ? void 0 : _a2.closed) === "boolean") {
        this._writableState.closed = true;
      } else {
        this.closed = true;
      }
      this._vol.close(this.fd, function(er) {
        if (er)
          _this.emit("error", er);
        else
          _this.emit("close");
      });
      this.fd = null;
    };
    FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
    FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
    var FSWatcher = function(_super) {
      __extends(FSWatcher2, _super);
      function FSWatcher2(vol) {
        var _this = _super.call(this) || this;
        _this._filename = "";
        _this._filenameEncoded = "";
        _this._recursive = false;
        _this._encoding = encoding_1.ENCODING_UTF8;
        _this._onNodeChange = function() {
          _this._emit("change");
        };
        _this._onParentChild = function(link) {
          if (link.getName() === _this._getName()) {
            _this._emit("rename");
          }
        };
        _this._emit = function(type) {
          _this.emit("change", type, _this._filenameEncoded);
        };
        _this._persist = function() {
          _this._timer = setTimeout(_this._persist, 1e6);
        };
        _this._vol = vol;
        return _this;
      }
      __name(FSWatcher2, "FSWatcher");
      FSWatcher2.prototype._getName = function() {
        return this._steps[this._steps.length - 1];
      };
      FSWatcher2.prototype.start = function(path, persistent, recursive, encoding) {
        if (persistent === void 0) {
          persistent = true;
        }
        if (recursive === void 0) {
          recursive = false;
        }
        if (encoding === void 0) {
          encoding = encoding_1.ENCODING_UTF8;
        }
        this._filename = pathToFilename(path);
        this._steps = filenameToSteps(this._filename);
        this._filenameEncoded = (0, encoding_1.strToEncoding)(this._filename);
        this._recursive = recursive;
        this._encoding = encoding;
        try {
          this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
        } catch (err) {
          var error = new Error("watch ".concat(this._filename, " ").concat(err.code));
          error.code = err.code;
          error.errno = err.code;
          throw error;
        }
        this._link.getNode().on("change", this._onNodeChange);
        this._link.on("child:add", this._onNodeChange);
        this._link.on("child:delete", this._onNodeChange);
        var parent = this._link.parent;
        if (parent) {
          parent.setMaxListeners(parent.getMaxListeners() + 1);
          parent.on("child:delete", this._onParentChild);
        }
        if (persistent)
          this._persist();
      };
      FSWatcher2.prototype.close = function() {
        clearTimeout(this._timer);
        this._link.getNode().removeListener("change", this._onNodeChange);
        var parent = this._link.parent;
        if (parent) {
          parent.removeListener("child:delete", this._onParentChild);
        }
      };
      return FSWatcher2;
    }(events_1.EventEmitter);
    exports.FSWatcher = FSWatcher;
  }
});
var require_lists = __commonJS2({
  "../../node_modules/fs-monkey/lib/util/lists.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fsAsyncMethods = exports.fsSyncMethods = exports.fsProps = void 0;
    var fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
    exports.fsProps = fsProps;
    var fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "createReadStream", "createWriteStream"];
    exports.fsSyncMethods = fsSyncMethods;
    var fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "watchFile", "unwatchFile", "watch"];
    exports.fsAsyncMethods = fsAsyncMethods;
  }
});
var require_lib = __commonJS2({
  "../../node_modules/memfs/lib/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p2 in s)
            if (Object.prototype.hasOwnProperty.call(s, p2))
              t[p2] = s[p2];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fs = exports.createFsFromVolume = exports.vol = exports.Volume = void 0;
    var Stats_1 = require_Stats();
    var Dirent_1 = require_Dirent();
    var volume_1 = require_volume();
    var _a = require_lists();
    var fsSyncMethods = _a.fsSyncMethods;
    var fsAsyncMethods = _a.fsAsyncMethods;
    var constants_1 = require_constants();
    var F_OK = constants_1.constants.F_OK;
    var R_OK = constants_1.constants.R_OK;
    var W_OK = constants_1.constants.W_OK;
    var X_OK = constants_1.constants.X_OK;
    exports.Volume = volume_1.Volume;
    exports.vol = new volume_1.Volume();
    function createFsFromVolume(vol) {
      var fs3 = { F_OK, R_OK, W_OK, X_OK, constants: constants_1.constants, Stats: Stats_1.default, Dirent: Dirent_1.default };
      for (var _i = 0, fsSyncMethods_1 = fsSyncMethods; _i < fsSyncMethods_1.length; _i++) {
        var method = fsSyncMethods_1[_i];
        if (typeof vol[method] === "function")
          fs3[method] = vol[method].bind(vol);
      }
      for (var _a2 = 0, fsAsyncMethods_1 = fsAsyncMethods; _a2 < fsAsyncMethods_1.length; _a2++) {
        var method = fsAsyncMethods_1[_a2];
        if (typeof vol[method] === "function")
          fs3[method] = vol[method].bind(vol);
      }
      fs3.StatWatcher = vol.StatWatcher;
      fs3.FSWatcher = vol.FSWatcher;
      fs3.WriteStream = vol.WriteStream;
      fs3.ReadStream = vol.ReadStream;
      fs3.promises = vol.promises;
      fs3._toUnixTimestamp = volume_1.toUnixTimestamp;
      return fs3;
    }
    __name(createFsFromVolume, "createFsFromVolume");
    exports.createFsFromVolume = createFsFromVolume;
    exports.fs = createFsFromVolume(exports.vol);
    module.exports = __assign(__assign({}, module.exports), exports.fs);
    module.exports.semantic = true;
  }
});
init_define_process();
var import_lightning_fs = __toESM2(require_src(), 1);
var memFS = __toESM2(require_lib(), 1);
var fsProb;
try {
  if (typeof indexedDB === "undefined")
    fsProb = memFS.fs;
  else {
    fsProb = new import_lightning_fs.default("fakeFS");
  }
} catch {
  fsProb = memFS.fs;
}
var fs2 = fsProb;
var p = fs2.promises;

// src/staticContent.mjs
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";
var files = JSON.parse(ASSET_MANIFEST);
var ASSET_HASH = md5(ASSET_MANIFEST);

// ../code/src/importmap.json
var importmap_default2 = {
  imports: {
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "framer-motion": "/motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/cache": "/emotionCache.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    react: "/reactMod.mjs",
    "react-dom": "/reactDom.mjs",
    "react-error-boundary": "/reactMod.mjs",
    "hydrate.mjs": "/hydrate.mjs"
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
              const isText2 = !!kvResp?.headers?.get("Content-Type")?.includes(
                "charset"
              );
              const kvRespCloned = kvResp.clone();
              kvResp = new Response(
                isText2 ? importMapReplace(
                  await kvRespCloned.text(),
                  url.origin,
                  request.url
                ) : kvResp.body,
                kvResp
              );
              const headers2 = new Headers(kvResp.headers);
              headers2.append("Cross-Origin-Embedder-Policy", "require-corp");
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
              request = new Request(new URL(newUrl.pathname, "https://raw.githubusercontent.com/").toString());
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
            const bodyStr = isText ? importMapReplace(
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
  return link.includes("chunk-") || chunkRegExp.test(link);
}
var chat_default = api;

// ../../node_modules/async-mutex/index.mjs
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

// ../../node_modules/avl/src/utils.js
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

// ../../node_modules/avl/src/index.js
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
      const session = await this.kv.get("session") || await env.CODE.get(env.CODE.idFromName("code-main")).fetch(
        "session.json"
      ).then((x) => x.json());
      if (!session)
        throw Error("cant get the starter session");
      this.address = await this.kv.get("address") || "";
      this.sess = session;
      this.codeSpace = session.codeSpace || "";
      if (this.sess.codeSpace) {
        this.session = startSession(
          this.codeSpace,
          { state: session, name: this.user }
        );
      }
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
      await this.kv.put("session", this.sess);
      this.session = startSession(
        this.codeSpace,
        { state: this.sess, name: this.codeSpace }
      );
      this.sessionStarted = true;
    }
    return handleErrors(request, async () => {
      const { code, transpiled, css, html, i } = mST(this.codeSpace);
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
        case "index.trans.js": {
          const trp = await esmTransform(mST(this.codeSpace).code, url.origin);
          return new Response(trp, {
            status: 200,
            headers: {
              "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(trp),
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "session.json":
        case "session": {
          if (path[1]) {
            let session = await this.kv.get(path[1]);
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
                  content_hash: md5(session),
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
          const body = JSON.stringify(mST(this.codeSpace));
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
          export const mST=${JSON.stringify(mST(this.codeSpace))};
          export const codeSpace="${this.codeSpace}";
          export const address="${this.address}";
          export const importmapReplaced=${JSON.stringify({
            js: importMapReplace(mST(this.codeSpace).transpiled, url.origin, url.origin)
          })}`;
          const content_hash = md5(body);
          return new Response(
            `
              export const mST=${JSON.stringify(mST(this.codeSpace))};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${JSON.stringify({
              js: importMapReplace(mST(this.codeSpace).transpiled, url.origin, url.origin)
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
              mST: mST(this.codeSpace),
              hashCode: hashCode3(this.codeSpace)
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
          import App from "${url.origin}/live/${codeSpace}/index.js"
        
          export default App;
          export const render =(rootEl)=>{
       
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
        </ErrorBoundary>)
        }
        ;`,
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
          const i2 = path[1] || mST(this.codeSpace).i;
          if (i2 > mST(this.codeSpace).i) {
            const started = Date.now() / 1e3;
            const body = await new Promise(
              (res, reject) => this.wait(() => {
                const now = Date.now() / 1e3;
                if (mST(this.codeSpace).i < Number(i2) && started - now < 3e3) {
                  return false;
                }
                if (mST(this.codeSpace).i < Number(i2) && started - now >= 3e3) {
                  reject(null);
                  return false;
                }
                res(mST(this.codeSpace).transpiled);
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
          if (i2 < mST(this.codeSpace).i) {
            const trp2 = importMapReplace(transpiled, url.origin, url.origin);
            return new Response(trp2, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${this.codeSpace}/index.mjs/${mST(this.codeSpace).i}`,
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
            `<div id="root"></div>`,
            `<div id="root" data-i="${i}" style="height: 100%;">
                  <style>${css}</style>
                  <div id="${this.codeSpace}-css" style="height: 100%;">
                  <div id="css" style="height: 100%;">
                  ${html}
                  </div>
                  </div>
              </div>
              <script type="module" src="./hydrate.mjs?ASSET_HASH=${ASSET_HASH}"><\/script>`
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
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "prerender": {
          const respText = src_default.replace(
            "/**reset*/",
            resetCSS
          ).replace(
            `<div id="root"></div>`,
            `   
          <div id="root"></div>
          <script type="module">
          import App from "${url.origin}/live/${this.codeSpace}/index.js"
              
              import {prerender} from "${url.origin}/render.mjs"
              
              
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
            `<div id="root"></div>`,
            `
              <div id="root" data-i="${i}" style="height: 100%;">

              <style>${css}</style>
              <div id="${this.codeSpace}-css" style="height: 100%;">
                ${html}
              </div>
              </div>
              <script type="module">

              import {render} from "${url.origin}/render.mjs";
              import App from "${url.origin}/live/${this.codeSpace}/index.js";

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
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers
          });
        }
        case "iife": {
          const startState = mST(this.codeSpace);
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
    const session = {
      name: "",
      quit: false,
      webSocket,
      blockedMessages: []
    };
    this.sessions.push(session);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(
          JSON.stringify({ name: otherSession.name })
        );
      }
    });
    const storage = await this.kv.list({ reverse: true, limit: 100 });
    const backlog = [...storage.values()];
    backlog.reverse();
    backlog.forEach((value) => {
      session.blockedMessages.push(
        typeof value === "string" ? value : JSON.stringify(value)
      );
    });
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session)
    );
    const closeOrErrorHandler = () => {
      session.quit = true;
      this.users.remove(session.name);
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
      if (data.name) {
        session.name = data.name;
        try {
          this.sessions.map((otherSession) => {
            if (otherSession === session)
              return;
            if (otherSession.name === data.name) {
              otherSession.name = "";
              otherSession.blockedMessages.map((m) => session.webSocket.send(m));
              otherSession.blockedMessages = [];
            }
          });
          if (data.hashCode) {
            if (data?.hashCode !== hashCode3(this.codeSpace)) {
              const patch = makePatchFrom(data.hashCode, mST(this.codeSpace));
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
          hashCode: hashCode3(this.codeSpace),
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
        if (data.i <= mST(this.codeSpace).i)
          return;
        if (data.patch && data.oldHash && data.newHash) {
          const oldSession = mST(this.codeSpace);
          let newSess = oldSession;
          if (md5(oldSession.transpiled) !== data.oldHash) {
            return respondWith({
              error: `old hashes not matching`
            });
          }
          try {
            const patch2 = data.patch;
            const newHash2 = data.newHash;
            newSess = mST(this.codeSpace, patch2);
            if (md5(newSess.transpiled) === newHash2) {
              if (this.session === null) {
                return respondWith({
                  error: "this.session is null!"
                });
              }
              this.session.patchSync(newSess, true);
              this.sess = newSess;
            } else {
              return respondWith({
                hashCode: md5(mST(this.codeSpace).transpiled),
                wrong: md5(mST(this.codeSpace, data.patch).transpiled)
              });
            }
          } catch (exp) {
            const err = exp || {};
            return respondWith({
              error: "unknown error- in patching" + JSON.stringify({ err }),
              exp: exp || {}
            });
          }
          try {
            this.broadcast(data);
          } catch {
            respondWith({
              "msg": "broadcast issue"
            });
          }
          await this.kv.put("session", newSess);
          const syncKV = (oldSession2, newSess2, message) => syncStorage(
            (key, value) => this.kv.put(key, value),
            (key) => this.kv.get(key),
            oldSession2,
            newSess2,
            message
          );
          const { newHash, oldHash, patch, reversePatch } = data;
          await syncKV(oldSession, newSess, {
            newHash,
            oldHash,
            codeSpace: this.codeSpace,
            patch,
            reversePatch
          });
          return respondWith({
            hashCode: hashCode3(this.codeSpace)
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
