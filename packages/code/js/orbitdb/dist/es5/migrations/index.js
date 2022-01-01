"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var run = function () {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(
      function _callee(OrbitDB, options, dbAddress) {
        var i;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  i = 0;

                case 1:
                  if (!(i < migrations.length)) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 4;
                  return migrations[i](OrbitDB, options, dbAddress);

                case 4:
                  i++;
                  _context.next = 1;
                  break;

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          },
          _callee,
          this,
        );
      },
    ),
  );

  return function run(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var from021To022 = require("./0.21-0.22");

var migrations = [from021To022];

module.exports = { run: run };
