var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_polka = __toESM(require("polka"));
var import_sirv = __toESM(require("sirv"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
const { PORT = 3001 } = process.env;
(0, import_polka.default)().use(
  (0, import_sirv.default)(import_path.default.resolve(__dirname, ".."), {
    dev: true,
    setHeaders: (res) => res.setHeader("AMP-Access-Control-Allow-Source-Origin", `http://localhost:${PORT}`)
  })
).use(
  (0, import_sirv.default)(import_path.default.resolve(__dirname), {
    dev: true,
    setHeaders: (res) => res.setHeader("AMP-Access-Control-Allow-Source-Origin", `http://localhost:${PORT}`)
  })
).get("/health", (req, res) => {
  res.end("OK");
}).get("/slow/*", (req, res) => {
  const reqPath = req.path.substring("/slow/".length);
  const file = import_fs.default.readFileSync(import_path.default.resolve(__dirname, reqPath));
  setTimeout(() => res.end(file), 6e3);
}).listen(PORT, (_) => {
  console.log(`> Running on http://localhost:${PORT}`);
});
