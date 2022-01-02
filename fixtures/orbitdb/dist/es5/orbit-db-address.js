"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var path = require("path");

var _require = require("multiformats/cid"),
  CID = _require.CID;

var notEmpty = function notEmpty(e) {
  return e !== "" && e !== " ";
};

var OrbitDBAddress = function () {
  function OrbitDBAddress(root, path) {
    (0, _classCallCheck3.default)(this, OrbitDBAddress);

    this.root = root;
    this.path = path;
  }

  (0, _createClass3.default)(OrbitDBAddress, [{
    key: "toString",
    value: function toString() {
      return OrbitDBAddress.join(this.root, this.path);
    },
  }], [{
    key: "isValid",
    value: function isValid(address) {
      address = address.toString().replace(/\\/g, "/");

      var containsProtocolPrefix = function containsProtocolPrefix(e, i) {
        return !((i === 0 || i === 1) &&
          address.toString().indexOf("/orbit") === 0 && e === "orbitdb");
      };

      var parts = address.toString().split("/").filter(containsProtocolPrefix)
        .filter(notEmpty);

      var accessControllerHash = void 0;

      var validateHash = function validateHash(hash) {
        var prefixes = ["zd", "Qm", "ba", "k5"];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = (0, _getIterator3.default)(prefixes), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var p = _step.value;

            if (hash.indexOf(p) > -1) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      };

      try {
        accessControllerHash = validateHash(parts[0])
          ? CID.parse(parts[0]).toString()
          : null;
      } catch (e) {
        return false;
      }

      return accessControllerHash !== null;
    },
  }, {
    key: "parse",
    value: function parse(address) {
      if (!address) {
        throw new Error("Not a valid OrbitDB address: " + address);
      }

      if (!OrbitDBAddress.isValid(address)) {
        throw new Error("Not a valid OrbitDB address: " + address);
      }

      address = address.toString().replace(/\\/g, "/");

      var parts = address.toString().split("/").filter(function (e, i) {
        return !((i === 0 || i === 1) &&
          address.toString().indexOf("/orbit") === 0 && e === "orbitdb");
      }).filter(function (e) {
        return e !== "" && e !== " ";
      });

      return new OrbitDBAddress(
        parts[0],
        parts.slice(1, parts.length).join("/"),
      );
    },
  }, {
    key: "join",
    value: function join() {
      var _ref;

      for (
        var _len = arguments.length, paths = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        paths[_key] = arguments[_key];
      }

      return (_ref = path.posix || path).join.apply(
        _ref,
        ["/orbitdb"].concat(paths),
      );
    },
  }]);
  return OrbitDBAddress;
}();

module.exports = OrbitDBAddress;
