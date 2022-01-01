"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var path = require("path");
var Store = require("orbit-db-store");
var EventStore = require("orbit-db-eventstore");
var FeedStore = require("orbit-db-feedstore");
var KeyValueStore = require("orbit-db-kvstore");
var CounterStore = require("orbit-db-counterstore");
var DocumentStore = require("orbit-db-docstore");
var Pubsub = require("orbit-db-pubsub");
var Cache = require("orbit-db-cache");
var Keystore = require("orbit-db-keystore");
var Identities = require("orbit-db-identity-provider");
var AccessControllers = require("orbit-db-access-controllers");
var OrbitDBAddress = require("./orbit-db-address");
var createDBManifest = require("./db-manifest");
var exchangeHeads = require("./exchange-heads");

var _require = require("./utils"),
  isDefined = _require.isDefined,
  io = _require.io;

var Storage = require("orbit-db-storage-adapter");
var migrations = require("./migrations");

var Logger = require("logplease");
var logger = Logger.create("orbit-db");
Logger.setLogLevel("ERROR");

// Mapping for 'database type' -> Class
var databaseTypes = {
  counter: CounterStore,
  eventlog: EventStore,
  feed: FeedStore,
  docstore: DocumentStore,
  keyvalue: KeyValueStore,
};

var defaultTimeout = 30000; // 30 seconds

var OrbitDB = function () {
  function OrbitDB(ipfs, identity) {
    var options = arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : {};
    (0, _classCallCheck3.default)(this, OrbitDB);

    if (!isDefined(ipfs)) {
      throw new Error(
        "IPFS is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance",
      );
    }

    if (!isDefined(identity)) {
      throw new Error(
        "identity is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance",
      );
    }

    this._ipfs = ipfs;
    this.identity = identity;
    this.id = options.peerId;
    this._pubsub = !options.offline
      ? new (options.broker ? options.broker : Pubsub)(this._ipfs, this.id)
      : null;
    this.directory = options.directory || "./orbitdb";
    this.storage = options.storage;
    this._directConnections = {};

    this.caches = {};
    this.caches[this.directory] = {
      cache: options.cache,
      handlers: new _set2.default(),
    };
    this.keystore = options.keystore;
    this.stores = {};

    // AccessControllers module can be passed in to enable
    // testing with orbit-db-access-controller
    AccessControllers = options.AccessControllers || AccessControllers;
  }

  (0, _createClass3.default)(OrbitDB, [{
    key: "feed",

    /* Databases */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    options = (0, _assign2.default)({
                      create: true,
                      type: "feed",
                    }, options);
                    return _context.abrupt(
                      "return",
                      this.open(address, options),
                    );

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            },
            _callee,
            this,
          );
        }),
      );

      function feed(_x3) {
        return _ref.apply(this, arguments);
      }

      return feed;
    }(),
  }, {
    key: "log",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee2(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    options = (0, _assign2.default)({
                      create: true,
                      type: "eventlog",
                    }, options);
                    return _context2.abrupt(
                      "return",
                      this.open(address, options),
                    );

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            },
            _callee2,
            this,
          );
        }),
      );

      function log(_x5) {
        return _ref2.apply(this, arguments);
      }

      return log;
    }(),
  }, {
    key: "eventlog",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee3(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt(
                      "return",
                      this.log(address, options),
                    );

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            },
            _callee3,
            this,
          );
        }),
      );

      function eventlog(_x7) {
        return _ref3.apply(this, arguments);
      }

      return eventlog;
    }(),
  }, {
    key: "keyvalue",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee4(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    options = (0, _assign2.default)({
                      create: true,
                      type: "keyvalue",
                    }, options);
                    return _context4.abrupt(
                      "return",
                      this.open(address, options),
                    );

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            },
            _callee4,
            this,
          );
        }),
      );

      function keyvalue(_x9) {
        return _ref4.apply(this, arguments);
      }

      return keyvalue;
    }(),
  }, {
    key: "kvstore",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee5(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt(
                      "return",
                      this.keyvalue(address, options),
                    );

                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }
            },
            _callee5,
            this,
          );
        }),
      );

      function kvstore(_x11) {
        return _ref5.apply(this, arguments);
      }

      return kvstore;
    }(),
  }, {
    key: "counter",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee6(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    options = (0, _assign2.default)({
                      create: true,
                      type: "counter",
                    }, options);
                    return _context6.abrupt(
                      "return",
                      this.open(address, options),
                    );

                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            },
            _callee6,
            this,
          );
        }),
      );

      function counter(_x13) {
        return _ref6.apply(this, arguments);
      }

      return counter;
    }(),
  }, {
    key: "docs",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee7(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    options = (0, _assign2.default)({
                      create: true,
                      type: "docstore",
                    }, options);
                    return _context7.abrupt(
                      "return",
                      this.open(address, options),
                    );

                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }
            },
            _callee7,
            this,
          );
        }),
      );

      function docs(_x15) {
        return _ref7.apply(this, arguments);
      }

      return docs;
    }(),
  }, {
    key: "docstore",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee8(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          return _regenerator2.default.wrap(
            function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    return _context8.abrupt(
                      "return",
                      this.docs(address, options),
                    );

                  case 1:
                  case "end":
                    return _context8.stop();
                }
              }
            },
            _callee8,
            this,
          );
        }),
      );

      function docstore(_x17) {
        return _ref8.apply(this, arguments);
      }

      return docstore;
    }(),
  }, {
    key: "disconnect",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee9() {
          var _this = this;

          var removeDirectConnect,
            databases,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            db,
            caches,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            directory;

          return _regenerator2.default.wrap(
            function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    // Close a direct connection and remove it from internal state
                    removeDirectConnect = function removeDirectConnect(e) {
                      _this._directConnections[e].close();
                      delete _this._directConnections[e];
                    };

                    // Close all direct connections to peers

                    (0, _keys2.default)(this._directConnections).forEach(
                      removeDirectConnect,
                    );

                    // Disconnect from pubsub

                    if (!this._pubsub) {
                      _context9.next = 5;
                      break;
                    }

                    _context9.next = 5;
                    return this._pubsub.disconnect();

                  case 5:
                    _context9.next = 7;
                    return this.keystore.close();

                  case 7:
                    // Close all open databases
                    databases = (0, _values2.default)(this.stores);
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context9.prev = 11;
                    _iterator = (0, _getIterator3.default)(databases);

                  case 13:
                    if (
                      _iteratorNormalCompletion =
                        (_step = _iterator.next()).done
                    ) {
                      _context9.next = 21;
                      break;
                    }

                    db = _step.value;
                    _context9.next = 17;
                    return db.close();

                  case 17:
                    delete this.stores[db.address.toString()];

                  case 18:
                    _iteratorNormalCompletion = true;
                    _context9.next = 13;
                    break;

                  case 21:
                    _context9.next = 27;
                    break;

                  case 23:
                    _context9.prev = 23;
                    _context9.t0 = _context9["catch"](11);
                    _didIteratorError = true;
                    _iteratorError = _context9.t0;

                  case 27:
                    _context9.prev = 27;
                    _context9.prev = 28;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }

                  case 30:
                    _context9.prev = 30;

                    if (!_didIteratorError) {
                      _context9.next = 33;
                      break;
                    }

                    throw _iteratorError;

                  case 33:
                    return _context9.finish(30);

                  case 34:
                    return _context9.finish(27);

                  case 35:
                    caches = (0, _keys2.default)(this.caches);
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context9.prev = 39;
                    _iterator2 = (0, _getIterator3.default)(caches);

                  case 41:
                    if (
                      _iteratorNormalCompletion2 =
                        (_step2 = _iterator2.next()).done
                    ) {
                      _context9.next = 49;
                      break;
                    }

                    directory = _step2.value;
                    _context9.next = 45;
                    return this.caches[directory].cache.close();

                  case 45:
                    delete this.caches[directory];

                  case 46:
                    _iteratorNormalCompletion2 = true;
                    _context9.next = 41;
                    break;

                  case 49:
                    _context9.next = 55;
                    break;

                  case 51:
                    _context9.prev = 51;
                    _context9.t1 = _context9["catch"](39);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context9.t1;

                  case 55:
                    _context9.prev = 55;
                    _context9.prev = 56;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }

                  case 58:
                    _context9.prev = 58;

                    if (!_didIteratorError2) {
                      _context9.next = 61;
                      break;
                    }

                    throw _iteratorError2;

                  case 61:
                    return _context9.finish(58);

                  case 62:
                    return _context9.finish(55);

                  case 63:
                    // Remove all databases from the state
                    this.stores = {};

                  case 64:
                  case "end":
                    return _context9.stop();
                }
              }
            },
            _callee9,
            this,
            [[11, 23, 27, 35], [28, , 30, 34], [39, 51, 55, 63], [
              56,
              ,
              58,
              62,
            ]],
          );
        }),
      );

      function disconnect() {
        return _ref9.apply(this, arguments);
      }

      return disconnect;
    }(),
    // Alias for disconnect()
  }, {
    key: "stop",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee10() {
          return _regenerator2.default.wrap(
            function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return this.disconnect();

                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }
            },
            _callee10,
            this,
          );
        }),
      );

      function stop() {
        return _ref10.apply(this, arguments);
      }

      return stop;
    }(),
  }, {
    key: "_createCache",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee11(path) {
          var cacheStorage;
          return _regenerator2.default.wrap(
            function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return this.storage.createStore(path);

                  case 2:
                    cacheStorage = _context11.sent;
                    return _context11.abrupt("return", new Cache(cacheStorage));

                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }
            },
            _callee11,
            this,
          );
        }),
      );

      function _createCache(_x18) {
        return _ref11.apply(this, arguments);
      }

      return _createCache;
    }(),
    /* Private methods */
  }, {
    key: "_createStore",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee12(type, address, options) {
            var Store, accessController, opts, identity, store, addr;
            return _regenerator2.default.wrap(
              function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      // Get the type -> class mapping
                      Store = databaseTypes[type];

                      if (Store) {
                        _context12.next = 3;
                        break;
                      }

                      throw new Error("Invalid database type '" + type + "'");

                    case 3:
                      accessController = void 0;

                      if (!options.accessControllerAddress) {
                        _context12.next = 8;
                        break;
                      }

                      _context12.next = 7;
                      return AccessControllers.resolve(
                        this,
                        options.accessControllerAddress,
                        options.accessController,
                      );

                    case 7:
                      accessController = _context12.sent;

                    case 8:
                      opts = (0, _assign2.default)(
                        { replicate: true },
                        options,
                        {
                          accessController: accessController,
                          cache: options.cache,
                          onClose: this._onClose.bind(this),
                          onDrop: this._onDrop.bind(this),
                          onLoad: this._onLoad.bind(this),
                        },
                      );
                      identity = options.identity || this.identity;
                      store = new Store(this._ipfs, identity, address, opts);

                      store.events.on("write", this._onWrite.bind(this));

                      // ID of the store is the address as a string
                      addr = address.toString();

                      this.stores[addr] = store;

                      // Subscribe to pubsub to get updates from peers,
                      // this is what hooks us into the message propagation layer
                      // and the p2p network

                      if (!(opts.replicate && this._pubsub)) {
                        _context12.next = 17;
                        break;
                      }

                      _context12.next = 17;
                      return this._pubsub.subscribe(
                        addr,
                        this._onMessage.bind(this),
                        this._onPeerConnected.bind(this),
                      );

                    case 17:
                      return _context12.abrupt("return", store);

                    case 18:
                    case "end":
                      return _context12.stop();
                  }
                }
              },
              _callee12,
              this,
            );
          },
        ),
      );

      function _createStore(_x19, _x20, _x21) {
        return _ref12.apply(this, arguments);
      }

      return _createStore;
    }(),
    // Callback for local writes to the database. We the update to pubsub.
  }, {
    key: "_onWrite",
    value: function _onWrite(address, entry, heads) {
      if (!heads) throw new Error("'heads' not defined");
      if (this._pubsub) this._pubsub.publish(address, heads);
    },
    // Callback for receiving a message from the network
  }, {
    key: "_onMessage",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee13(address, heads, peer) {
            var store;
            return _regenerator2.default.wrap(
              function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      store = this.stores[address];
                      _context13.prev = 1;

                      logger.debug(
                        "Received " + heads.length + " heads for '" + address +
                          "':\n",
                        (0, _stringify2.default)(
                          heads.map(function (e) {
                            return e.hash;
                          }),
                          null,
                          2,
                        ),
                      );

                      if (!(store && heads)) {
                        _context13.next = 8;
                        break;
                      }

                      if (!(heads.length > 0)) {
                        _context13.next = 7;
                        break;
                      }

                      _context13.next = 7;
                      return store.sync(heads);

                    case 7:
                      store.events.emit("peer.exchanged", peer, address, heads);

                    case 8:
                      _context13.next = 13;
                      break;

                    case 10:
                      _context13.prev = 10;
                      _context13.t0 = _context13["catch"](1);

                      logger.error(_context13.t0);

                    case 13:
                    case "end":
                      return _context13.stop();
                  }
                }
              },
              _callee13,
              this,
              [[1, 10]],
            );
          },
        ),
      );

      function _onMessage(_x22, _x23, _x24) {
        return _ref13.apply(this, arguments);
      }

      return _onMessage;
    }(),
    // Callback for when a peer connected to a database
  }, {
    key: "_onPeerConnected",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee14(address, peer) {
            var _this2 = this;

            var getStore, getDirectConnection, onChannelCreated, onMessage;
            return _regenerator2.default.wrap(
              function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      logger.debug(
                        "New peer '" + peer + "' connected to '" + address +
                          "'",
                      );

                      getStore = function getStore(address) {
                        return _this2.stores[address];
                      };

                      getDirectConnection = function getDirectConnection(peer) {
                        return _this2._directConnections[peer];
                      };

                      onChannelCreated = function onChannelCreated(channel) {
                        _this2._directConnections[channel._receiverID] =
                          channel;
                      };

                      onMessage = function onMessage(address, heads) {
                        return _this2._onMessage(address, heads, peer);
                      };

                      _context14.next = 7;
                      return exchangeHeads(
                        this._ipfs,
                        address,
                        peer,
                        getStore,
                        getDirectConnection,
                        onMessage,
                        onChannelCreated,
                      );

                    case 7:
                      if (getStore(address)) {
                        getStore(address).events.emit("peer", peer);
                      }

                    case 8:
                    case "end":
                      return _context14.stop();
                  }
                }
              },
              _callee14,
              this,
            );
          },
        ),
      );

      function _onPeerConnected(_x25, _x26) {
        return _ref14.apply(this, arguments);
      }

      return _onPeerConnected;
    }(),
    // Callback when database was closed
  }, {
    key: "_onClose",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee15(db) {
          var address, dir, cache;
          return _regenerator2.default.wrap(
            function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    address = db.address.toString();

                    logger.debug("Close " + address);

                    // Unsubscribe from pubsub

                    if (!this._pubsub) {
                      _context15.next = 5;
                      break;
                    }

                    _context15.next = 5;
                    return this._pubsub.unsubscribe(address);

                  case 5:
                    dir = db && db.options.directory
                      ? db.options.directory
                      : this.directory;
                    cache = this.caches[dir];

                    if (!(cache && cache.handlers.has(address))) {
                      _context15.next = 12;
                      break;
                    }

                    cache.handlers.delete(address);

                    if (cache.handlers.size) {
                      _context15.next = 12;
                      break;
                    }

                    _context15.next = 12;
                    return cache.cache.close();

                  case 12:
                    delete this.stores[address];

                  case 13:
                  case "end":
                    return _context15.stop();
                }
              }
            },
            _callee15,
            this,
          );
        }),
      );

      function _onClose(_x27) {
        return _ref15.apply(this, arguments);
      }

      return _onClose;
    }(),
  }, {
    key: "_onDrop",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee16(db) {
          var address, dir;
          return _regenerator2.default.wrap(
            function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    address = db.address.toString();
                    dir = db && db.options.directory
                      ? db.options.directory
                      : this.directory;
                    _context16.next = 4;
                    return this._requestCache(address, dir, db._cache);

                  case 4:
                  case "end":
                    return _context16.stop();
                }
              }
            },
            _callee16,
            this,
          );
        }),
      );

      function _onDrop(_x28) {
        return _ref16.apply(this, arguments);
      }

      return _onDrop;
    }(),
  }, {
    key: "_onLoad",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee17(db) {
          var address, dir;
          return _regenerator2.default.wrap(
            function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    address = db.address.toString();
                    dir = db && db.options.directory
                      ? db.options.directory
                      : this.directory;
                    _context17.next = 4;
                    return this._requestCache(address, dir, db._cache);

                  case 4:
                    this.stores[address] = db;

                  case 5:
                  case "end":
                    return _context17.stop();
                }
              }
            },
            _callee17,
            this,
          );
        }),
      );

      function _onLoad(_x29) {
        return _ref17.apply(this, arguments);
      }

      return _onLoad;
    }(),
  }, {
    key: "_determineAddress",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee18(name, type) {
            var options = arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : {};
            var accessControllerAddress, manifestHash;
            return _regenerator2.default.wrap(
              function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      if (OrbitDB.isValidType(type)) {
                        _context18.next = 2;
                        break;
                      }

                      throw new Error("Invalid database type '" + type + "'");

                    case 2:
                      if (!OrbitDBAddress.isValid(name)) {
                        _context18.next = 4;
                        break;
                      }

                      throw new Error(
                        "Given database name is an address. Please give only the name of the database!",
                      );

                    case 4:
                      // Create an AccessController, use IPFS AC as the default
                      options.accessController = (0, _assign2.default)({}, {
                        name: name,
                        type: "ipfs",
                      }, options.accessController);
                      _context18.next = 7;
                      return AccessControllers.create(
                        this,
                        options.accessController.type,
                        options.accessController || {},
                      );

                    case 7:
                      accessControllerAddress = _context18.sent;
                      _context18.next = 10;
                      return createDBManifest(
                        this._ipfs,
                        name,
                        type,
                        accessControllerAddress,
                        options,
                      );

                    case 10:
                      manifestHash = _context18.sent;
                      return _context18.abrupt(
                        "return",
                        OrbitDBAddress.parse(
                          OrbitDBAddress.join(manifestHash, name),
                        ),
                      );

                    case 12:
                    case "end":
                      return _context18.stop();
                  }
                }
              },
              _callee18,
              this,
            );
          },
        ),
      );

      function _determineAddress(_x31, _x32) {
        return _ref18.apply(this, arguments);
      }

      return _determineAddress;
    }(),
    /* Create and Open databases */

    /*
      options = {
        accessController: { write: [] } // array of keys that can write to this database
        overwrite: false, // whether we should overwrite the existing database if it exists
      }
    */
  }, {
    key: "create",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee19(name, type) {
            var options = arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : {};
            var dbAddress, haveDB;
            return _regenerator2.default.wrap(
              function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      logger.debug("create()");

                      logger.debug(
                        "Creating database '" + name + "' as " + type,
                      );

                      // Create the database address
                      _context19.next = 4;
                      return this._determineAddress(name, type, options);

                    case 4:
                      dbAddress = _context19.sent;
                      _context19.next = 7;
                      return this._requestCache(
                        dbAddress.toString(),
                        options.directory,
                      );

                    case 7:
                      options.cache = _context19.sent;
                      _context19.next = 10;
                      return this._haveLocalData(options.cache, dbAddress);

                    case 10:
                      haveDB = _context19.sent;

                      if (!(haveDB && !options.overwrite)) {
                        _context19.next = 13;
                        break;
                      }

                      throw new Error(
                        "Database '" + dbAddress + "' already exists!",
                      );

                    case 13:
                      _context19.next = 15;
                      return this._migrate(options, dbAddress);

                    case 15:
                      _context19.next = 17;
                      return this._addManifestToCache(options.cache, dbAddress);

                    case 17:
                      logger.debug("Created database '" + dbAddress + "'");

                      // Open the database
                      return _context19.abrupt(
                        "return",
                        this.open(dbAddress, options),
                      );

                    case 19:
                    case "end":
                      return _context19.stop();
                  }
                }
              },
              _callee19,
              this,
            );
          },
        ),
      );

      function create(_x34, _x35) {
        return _ref19.apply(this, arguments);
      }

      return create;
    }(),
  }, {
    key: "determineAddress",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee20(name, type) {
            var options = arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : {};
            var opts;
            return _regenerator2.default.wrap(
              function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      opts = (0, _assign2.default)(
                        {},
                        { onlyHash: true },
                        options,
                      );
                      return _context20.abrupt(
                        "return",
                        this._determineAddress(name, type, opts),
                      );

                    case 2:
                    case "end":
                      return _context20.stop();
                  }
                }
              },
              _callee20,
              this,
            );
          },
        ),
      );

      function determineAddress(_x37, _x38) {
        return _ref20.apply(this, arguments);
      }

      return determineAddress;
    }(),
  }, {
    key: "_requestCache",
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee21(address, directory, existingCache) {
            var dir, newCache, cache;
            return _regenerator2.default.wrap(
              function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      dir = directory || this.directory;

                      if (this.caches[dir]) {
                        _context21.next = 9;
                        break;
                      }

                      _context21.t0 = existingCache;

                      if (_context21.t0) {
                        _context21.next = 7;
                        break;
                      }

                      _context21.next = 6;
                      return this._createCache(dir);

                    case 6:
                      _context21.t0 = _context21.sent;

                    case 7:
                      newCache = _context21.t0;

                      this.caches[dir] = {
                        cache: newCache,
                        handlers: new _set2.default(),
                      };

                    case 9:
                      this.caches[dir].handlers.add(address);
                      cache = this.caches[dir].cache;

                      // "Wake up" the caches if they need it

                      if (!cache) {
                        _context21.next = 14;
                        break;
                      }

                      _context21.next = 14;
                      return cache.open();

                    case 14:
                      return _context21.abrupt("return", cache);

                    case 15:
                    case "end":
                      return _context21.stop();
                  }
                }
              },
              _callee21,
              this,
            );
          },
        ),
      );

      function _requestCache(_x39, _x40, _x41) {
        return _ref21.apply(this, arguments);
      }

      return _requestCache;
    }(),
    /*
        options = {
          localOnly: false // if set to true, throws an error if database can't be found locally
          create: false // whether to create the database
          type: TODO
          overwrite: TODO
         }
     */
  }, {
    key: "open",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee22(address) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
          var dbAddress, haveDB, manifest;
          return _regenerator2.default.wrap(
            function _callee22$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    logger.debug("open()");

                    options = (0, _assign2.default)({
                      localOnly: false,
                      create: false,
                    }, options);
                    logger.debug("Open database '" + address + "'");

                    // If address is just the name of database, check the options to crate the database

                    if (OrbitDBAddress.isValid(address)) {
                      _context22.next = 15;
                      break;
                    }

                    if (options.create) {
                      _context22.next = 8;
                      break;
                    }

                    throw new Error(
                      "'options.create' set to 'false'. If you want to create a database, set 'options.create' to 'true'.",
                    );

                  case 8:
                    if (!(options.create && !options.type)) {
                      _context22.next = 12;
                      break;
                    }

                    throw new Error(
                      "Database type not provided! Provide a type with 'options.type' (" +
                        OrbitDB.databaseTypes.join("|") + ")",
                    );

                  case 12:
                    logger.warn(
                      "Not a valid OrbitDB address '" + address +
                        "', creating the database",
                    );
                    options.overwrite = options.overwrite
                      ? options.overwrite
                      : true;
                    return _context22.abrupt(
                      "return",
                      this.create(address, options.type, options),
                    );

                  case 15:
                    // Parse the database address
                    dbAddress = OrbitDBAddress.parse(address);

                    // If database is already open, return early by returning the instance
                    // if (this.stores[dbAddress]) {
                    //   return this.stores[dbAddress]
                    // }

                    _context22.next = 18;
                    return this._requestCache(
                      dbAddress.toString(),
                      options.directory,
                    );

                  case 18:
                    options.cache = _context22.sent;
                    _context22.next = 21;
                    return this._haveLocalData(options.cache, dbAddress);

                  case 21:
                    haveDB = _context22.sent;

                    logger.debug(
                      (haveDB ? "Found" : "Didn't find") +
                        (" database '" + dbAddress + "'"),
                    );

                    // If we want to try and open the database local-only, throw an error
                    // if we don't have the database locally

                    if (!(options.localOnly && !haveDB)) {
                      _context22.next = 26;
                      break;
                    }

                    logger.warn("Database '" + dbAddress + "' doesn't exist!");
                    throw new Error(
                      "Database '" + dbAddress + "' doesn't exist!",
                    );

                  case 26:
                    logger.debug("Loading Manifest for '" + dbAddress + "'");

                    // Get the database manifest from IPFS
                    _context22.next = 29;
                    return io.read(this._ipfs, dbAddress.root, {
                      timeout: options.timeout || defaultTimeout,
                    });

                  case 29:
                    manifest = _context22.sent;

                    logger.debug(
                      "Manifest for '" + dbAddress + "':\n" +
                        (0, _stringify2.default)(manifest, null, 2),
                    );

                    if (manifest.name !== dbAddress.path) {
                      logger.warn(
                        "Manifest name '" + manifest.name +
                          "' and path name '" + dbAddress.path +
                          "' do not match",
                      );
                    }

                    // Make sure the type from the manifest matches the type that was given as an option

                    if (!(options.type && manifest.type !== options.type)) {
                      _context22.next = 34;
                      break;
                    }

                    throw new Error(
                      "Database '" + dbAddress + "' is type '" + manifest.type +
                        "' but was opened as '" + options.type + "'",
                    );

                  case 34:
                    _context22.next = 36;
                    return this._addManifestToCache(options.cache, dbAddress);

                  case 36:
                    // Open the the database
                    options = (0, _assign2.default)({}, options, {
                      accessControllerAddress: manifest.accessController,
                      meta: manifest.meta,
                    });
                    return _context22.abrupt(
                      "return",
                      this._createStore(
                        options.type || manifest.type,
                        dbAddress,
                        options,
                      ),
                    );

                  case 38:
                  case "end":
                    return _context22.stop();
                }
              }
            },
            _callee22,
            this,
          );
        }),
      );

      function open(_x43) {
        return _ref22.apply(this, arguments);
      }

      return open;
    }(),
    // Save the database locally
  }, {
    key: "_addManifestToCache",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee23(cache, dbAddress) {
            return _regenerator2.default.wrap(
              function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.next = 2;
                      return cache.set(
                        path.join(dbAddress.toString(), "_manifest"),
                        dbAddress.root,
                      );

                    case 2:
                      logger.debug(
                        "Saved manifest to IPFS as '" + dbAddress.root + "'",
                      );

                    case 3:
                    case "end":
                      return _context23.stop();
                  }
                }
              },
              _callee23,
              this,
            );
          },
        ),
      );

      function _addManifestToCache(_x44, _x45) {
        return _ref23.apply(this, arguments);
      }

      return _addManifestToCache;
    }(),
    /**
     * Check if we have the database, or part of it, saved locally
     * @param  {[Cache]} cache [The OrbitDBCache instance containing the local data]
     * @param  {[OrbitDBAddress]} dbAddress [Address of the database to check]
     * @return {[Boolean]} [Returns true if we have cached the db locally, false if not]
     */
  }, {
    key: "_haveLocalData",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee24(cache, dbAddress) {
            var addr, data;
            return _regenerator2.default.wrap(
              function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      if (cache) {
                        _context24.next = 2;
                        break;
                      }

                      return _context24.abrupt("return", false);

                    case 2:
                      addr = dbAddress.toString();
                      _context24.next = 5;
                      return cache.get(path.join(addr, "_manifest"));

                    case 5:
                      data = _context24.sent;
                      return _context24.abrupt(
                        "return",
                        data !== undefined && data !== null,
                      );

                    case 7:
                    case "end":
                      return _context24.stop();
                  }
                }
              },
              _callee24,
              this,
            );
          },
        ),
      );

      function _haveLocalData(_x46, _x47) {
        return _ref24.apply(this, arguments);
      }

      return _haveLocalData;
    }(),
    /**
     * Runs all migrations inside the src/migration folder
     * @param Object options  Options to pass into the migration
     * @param OrbitDBAddress dbAddress Address of database in OrbitDBAddress format
     */
  }, {
    key: "_migrate",
    value: function () {
      var _ref25 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(
          function _callee25(options, dbAddress) {
            return _regenerator2.default.wrap(
              function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return migrations.run(this, options, dbAddress);

                    case 2:
                    case "end":
                      return _context25.stop();
                  }
                }
              },
              _callee25,
              this,
            );
          },
        ),
      );

      function _migrate(_x48, _x49) {
        return _ref25.apply(this, arguments);
      }

      return _migrate;
    }(),
    /**
     * Returns supported database types as an Array of strings
     * Eg. [ 'counter', 'eventlog', 'feed', 'docstore', 'keyvalue']
     * @return {[Array]} [Supported database types]
     */
  }, {
    key: "cache",
    get: function get() {
      return this.caches[this.directory].cache;
    },
  }], [{
    key: "createInstance",
    value: function () {
      var _ref26 = (0, _asyncToGenerator3.default)(
        /*#__PURE__*/ _regenerator2.default.mark(function _callee26(ipfs) {
          var options = arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

          var _ref27,
            id,
            storageOptions,
            keystorePath,
            keyStorage,
            cachePath,
            cacheStorage,
            finalOptions;

          return _regenerator2.default.wrap(
            function _callee26$(_context26) {
              while (1) {
                switch (_context26.prev = _context26.next) {
                  case 0:
                    if (isDefined(ipfs)) {
                      _context26.next = 2;
                      break;
                    }

                    throw new Error(
                      "IPFS is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance",
                    );

                  case 2:
                    if (options.offline === undefined) {
                      options.offline = false;
                    }

                    if (!(options.offline && !options.id)) {
                      _context26.next = 5;
                      break;
                    }

                    throw new Error(
                      "Offline mode requires passing an `id` in the options",
                    );

                  case 5:
                    if (!(options.id || options.offline)) {
                      _context26.next = 9;
                      break;
                    }

                    _context26.t0 = { id: options.id };
                    _context26.next = 12;
                    break;

                  case 9:
                    _context26.next = 11;
                    return ipfs.id();

                  case 11:
                    _context26.t0 = _context26.sent;

                  case 12:
                    _ref27 = _context26.t0;
                    id = _ref27.id;

                    if (!options.directory) {
                      options.directory = "./orbitdb";
                    }

                    if (!options.storage) {
                      storageOptions = {};

                      // Create default `level` store

                      options.storage = Storage(null, storageOptions);
                    }

                    if (
                      options.identity && options.identity.provider.keystore
                    ) {
                      options.keystore = options.identity.provider.keystore;
                    }

                    if (options.keystore) {
                      _context26.next = 23;
                      break;
                    }

                    keystorePath = path.join(
                      options.directory,
                      id,
                      "/keystore",
                    );
                    _context26.next = 21;
                    return options.storage.createStore(keystorePath);

                  case 21:
                    keyStorage = _context26.sent;

                    options.keystore = new Keystore(keyStorage);

                  case 23:
                    if (options.identity) {
                      _context26.next = 27;
                      break;
                    }

                    _context26.next = 26;
                    return Identities.createIdentity({
                      id: id,
                      keystore: options.keystore,
                    });

                  case 26:
                    options.identity = _context26.sent;

                  case 27:
                    if (options.cache) {
                      _context26.next = 33;
                      break;
                    }

                    cachePath = path.join(options.directory, id, "/cache");
                    _context26.next = 31;
                    return options.storage.createStore(cachePath);

                  case 31:
                    cacheStorage = _context26.sent;

                    options.cache = new Cache(cacheStorage);

                  case 33:
                    finalOptions = (0, _assign2.default)({}, options, {
                      peerId: id,
                    });
                    return _context26.abrupt(
                      "return",
                      new OrbitDB(ipfs, options.identity, finalOptions),
                    );

                  case 35:
                  case "end":
                    return _context26.stop();
                }
              }
            },
            _callee26,
            this,
          );
        }),
      );

      function createInstance(_x51) {
        return _ref26.apply(this, arguments);
      }

      return createInstance;
    }(),
  }, {
    key: "isValidType",
    value: function isValidType(type) {
      return (0, _keys2.default)(databaseTypes).includes(type);
    },
  }, {
    key: "addDatabaseType",
    value: function addDatabaseType(type, store) {
      if (databaseTypes[type]) throw new Error("Type already exists: " + type);
      databaseTypes[type] = store;
    },
  }, {
    key: "getDatabaseTypes",
    value: function getDatabaseTypes() {
      return databaseTypes;
    },
  }, {
    key: "isValidAddress",
    value: function isValidAddress(address) {
      return OrbitDBAddress.isValid(address);
    },
  }, {
    key: "parseAddress",
    value: function parseAddress(address) {
      return OrbitDBAddress.parse(address);
    },
  }, {
    key: "Pubsub",
    get: function get() {
      return Pubsub;
    },
  }, {
    key: "Cache",
    get: function get() {
      return Cache;
    },
  }, {
    key: "Keystore",
    get: function get() {
      return Keystore;
    },
  }, {
    key: "Identities",
    get: function get() {
      return Identities;
    },
  }, {
    key: "AccessControllers",
    get: function get() {
      return AccessControllers;
    },
  }, {
    key: "Storage",
    get: function get() {
      return Storage;
    },
  }, {
    key: "OrbitDBAddress",
    get: function get() {
      return OrbitDBAddress;
    },
  }, {
    key: "Store",
    get: function get() {
      return Store;
    },
  }, {
    key: "EventStore",
    get: function get() {
      return EventStore;
    },
  }, {
    key: "FeedStore",
    get: function get() {
      return FeedStore;
    },
  }, {
    key: "KeyValueStore",
    get: function get() {
      return KeyValueStore;
    },
  }, {
    key: "CounterStore",
    get: function get() {
      return CounterStore;
    },
  }, {
    key: "DocumentStore",
    get: function get() {
      return DocumentStore;
    },
  }, {
    key: "databaseTypes",
    get: function get() {
      return (0, _keys2.default)(databaseTypes);
    },
  }]);
  return OrbitDB;
}();

OrbitDB.prototype.AccessControllers = AccessControllers;
OrbitDB.prototype.Identities = Identities;
OrbitDB.prototype.Keystore = Keystore;

module.exports = OrbitDB;
