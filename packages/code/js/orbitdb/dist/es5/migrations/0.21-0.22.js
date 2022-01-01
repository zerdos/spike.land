"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var migrate = function () {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(
      function _callee(OrbitDB, options, dbAddress) {
        var oldCache,
          oldStore,
          addr,
          _localHeads,
          keyRoot,
          migrationKeys,
          i,
          key,
          val;

        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  oldCache = OrbitDB.caches[options.directory]
                    ? OrbitDB.caches[options.directory].cache
                    : null;
                  oldStore = void 0;

                  if (oldCache) {
                    _context.next = 10;
                    break;
                  }

                  addr = (path.posix || path).join(
                    OrbitDB.directory,
                    dbAddress.root,
                    dbAddress.path,
                  );

                  if (!(fs && fs.existsSync && !fs.existsSync(addr))) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt("return");

                case 6:
                  _context.next = 8;
                  return OrbitDB.storage.createStore(addr);

                case 8:
                  oldStore = _context.sent;

                  oldCache = new Cache(oldStore);

                case 10:
                  _context.next = 12;
                  return oldCache.get("_localHeads");

                case 12:
                  _localHeads = _context.sent;

                  if (_localHeads) {
                    _context.next = 15;
                    break;
                  }

                  return _context.abrupt("return");

                case 15:
                  keyRoot = dbAddress.toString();

                  logger.debug("Attempting to migrate from old cache location");
                  migrationKeys = [
                    "_remoteHeads",
                    "_localHeads",
                    "snapshot",
                    "queue",
                  ];
                  _context.t0 = _regenerator2.default.keys(migrationKeys);

                case 19:
                  if ((_context.t1 = _context.t0()).done) {
                    _context.next = 36;
                    break;
                  }

                  i = _context.t1.value;
                  _context.prev = 21;
                  key = path.join(keyRoot, migrationKeys[i]);
                  _context.next = 25;
                  return oldCache.get(migrationKeys[i]);

                case 25:
                  val = _context.sent;

                  if (!val) {
                    _context.next = 29;
                    break;
                  }

                  _context.next = 29;
                  return options.cache.set(key, val);

                case 29:
                  _context.next = 34;
                  break;

                case 31:
                  _context.prev = 31;
                  _context.t2 = _context["catch"](21);

                  logger.debug(_context.t2.message);

                case 34:
                  _context.next = 19;
                  break;

                case 36:
                  _context.next = 38;
                  return options.cache.set(
                    path.join(keyRoot, "_manifest"),
                    dbAddress.root,
                  );

                case 38:
                  if (!oldStore) {
                    _context.next = 41;
                    break;
                  }

                  _context.next = 41;
                  return oldStore.close();

                case 41:
                case "end":
                  return _context.stop();
              }
            }
          },
          _callee,
          this,
          [[21, 31]],
        );
      },
    ),
  );

  return function migrate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var path = require("path");
var fs = require("../fs-shim");

var Cache = require("orbit-db-cache");

var Logger = require("logplease");
var logger = Logger.create("orbit-db");
Logger.setLogLevel("ERROR");

module.exports = migrate;
