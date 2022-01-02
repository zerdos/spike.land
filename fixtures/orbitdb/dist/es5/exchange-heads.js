"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Channel = require("ipfs-pubsub-1on1");

var Logger = require("logplease");
var logger = Logger.create("exchange-heads", { color: Logger.Colors.Yellow });
Logger.setLogLevel("ERROR");

var getHeadsForDatabase = function () {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee(store) {
      var localHeads, remoteHeads;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (store && store._cache) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", []);

              case 2:
                _context.next = 4;
                return store._cache.get(store.localHeadsPath);

              case 4:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 7;
                  break;
                }

                _context.t0 = [];

              case 7:
                localHeads = _context.t0;
                _context.next = 10;
                return store._cache.get(store.remoteHeadsPath);

              case 10:
                _context.t1 = _context.sent;

                if (_context.t1) {
                  _context.next = 13;
                  break;
                }

                _context.t1 = [];

              case 13:
                remoteHeads = _context.t1;
                return _context.abrupt(
                  "return",
                  [].concat(
                    (0, _toConsumableArray3.default)(localHeads),
                    (0, _toConsumableArray3.default)(remoteHeads),
                  ),
                );

              case 15:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
      );
    }),
  );

  return function getHeadsForDatabase(_x) {
    return _ref.apply(this, arguments);
  };
}();

var exchangeHeads = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(
      function _callee2(
        ipfs,
        address,
        peer,
        getStore,
        getDirectConnection,
        onMessage,
        onChannelCreated,
      ) {
        var _handleMessage, channel, heads;

        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _handleMessage = function _handleMessage(message) {
                    var msg = JSON.parse(Buffer.from(message.data).toString());
                    var address = msg.address,
                      heads = msg.heads;

                    onMessage(address, heads);
                  };

                  channel = getDirectConnection(peer);

                  if (channel) {
                    _context2.next = 16;
                    break;
                  }

                  _context2.prev = 3;

                  logger.debug("Create a channel to " + peer);
                  _context2.next = 7;
                  return Channel.open(ipfs, peer);

                case 7:
                  channel = _context2.sent;

                  channel.on("message", _handleMessage);
                  logger.debug("Channel created to " + peer);
                  onChannelCreated(channel);
                  _context2.next = 16;
                  break;

                case 13:
                  _context2.prev = 13;
                  _context2.t0 = _context2["catch"](3);

                  logger.error(_context2.t0);

                case 16:
                  _context2.next = 18;
                  return channel.connect();

                case 18:
                  logger.debug("Connected to " + peer);

                  // Send the heads if we have any
                  _context2.next = 21;
                  return getHeadsForDatabase(getStore(address));

                case 21:
                  heads = _context2.sent;

                  logger.debug(
                    "Send latest heads of '" + address + "':\n",
                    (0, _stringify2.default)(
                      heads.map(function (e) {
                        return e.hash;
                      }),
                      null,
                      2,
                    ),
                  );

                  if (!heads) {
                    _context2.next = 26;
                    break;
                  }

                  _context2.next = 26;
                  return channel.send(
                    (0, _stringify2.default)({
                      address: address,
                      heads: heads,
                    }),
                  );

                case 26:
                  return _context2.abrupt("return", channel);

                case 27:
                case "end":
                  return _context2.stop();
              }
            }
          },
          _callee2,
          undefined,
          [[3, 13]],
        );
      },
    ),
  );

  return function exchangeHeads(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = exchangeHeads;
