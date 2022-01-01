"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var path = require("path");
var io = require("orbit-db-io");

// Creates a DB manifest file and saves it in IPFS
var createDBManifest = function () {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(
      function _callee(ipfs, name, type, accessControllerAddress, options) {
        var manifest;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  manifest = (0, _assign2.default)(
                    {
                      name: name,
                      type: type,
                      accessController: (path.posix || path).join(
                        "/ipfs",
                        accessControllerAddress,
                      ),
                    },
                    // meta field is only added to manifest if options.meta is defined
                    options.meta !== undefined ? { meta: options.meta } : {},
                  );
                  return _context.abrupt(
                    "return",
                    io.write(
                      ipfs,
                      options.format || "dag-cbor",
                      manifest,
                      options,
                    ),
                  );

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          },
          _callee,
          undefined,
        );
      },
    ),
  );

  return function createDBManifest(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = createDBManifest;
