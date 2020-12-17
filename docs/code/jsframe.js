(() => {
  var __commonJS = (callback, module) =>
    () => {
      if (!module) {
        module = { exports: {} };
        callback(module.exports, module);
      }
      return module.exports;
    };

  // src/JSFrame.css
  var require_JSFrame = __commonJS((exports, module) => {
    module.exports =
      ".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}";
  });

  // ../../node_modules/@riversun/event-emitter/lib/event-emitter.js
  var require_event_emitter = __commonJS((exports, module) => {
    /*! event-emitter(https://github.com/riversun/event-emitter) v1.5.0 Copyright (c) 2020 riversun.org@gmail.com */
    !function (e, t) {
      typeof exports == "object" && typeof module == "object"
        ? module.exports = t()
        : typeof define == "function" && define.amd
        ? define("EventEmitter", [], t)
        : typeof exports == "object"
        ? exports.EventEmitter = t()
        : e.EventEmitter = t();
    }(exports, function () {
      return (() => {
        "use strict";
        var e = {
            561: (e2, t2, n2) => {
              function r(e3, t3) {
                return function (e4) {
                  if (Array.isArray(e4)) {
                    return e4;
                  }
                }(e3) || function (e4, t4) {
                  if (
                    typeof Symbol == "undefined" ||
                    !(Symbol.iterator in Object(e4))
                  ) {
                    return;
                  }
                  var n3 = [], r2 = true, i2 = false, o2 = void 0;
                  try {
                    for (
                      var s2, u2 = e4[Symbol.iterator]();
                      !(r2 = (s2 = u2.next()).done) &&
                      (n3.push(s2.value), !t4 || n3.length !== t4);
                      r2 = true
                    );
                  } catch (e5) {
                    i2 = true, o2 = e5;
                  } finally {
                    try {
                      r2 || u2.return == null || u2.return();
                    } finally {
                      if (i2) {
                        throw o2;
                      }
                    }
                  }
                  return n3;
                }(e3, t3) || o(e3, t3) || function () {
                  throw new TypeError(
                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                }();
              }
              function i(e3, t3) {
                var n3;
                if (
                  typeof Symbol == "undefined" || e3[Symbol.iterator] == null
                ) {
                  if (
                    Array.isArray(e3) || (n3 = o(e3)) ||
                    t3 && e3 && typeof e3.length == "number"
                  ) {
                    n3 && (e3 = n3);
                    var r2 = 0,
                      i2 = function () {
                      };
                    return {
                      s: i2,
                      n: function () {
                        return r2 >= e3.length
                          ? { done: true }
                          : { done: false, value: e3[r2++] };
                      },
                      e: function (e4) {
                        throw e4;
                      },
                      f: i2,
                    };
                  }
                  throw new TypeError(
                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                }
                var s2, u2 = true, c2 = false;
                return {
                  s: function () {
                    n3 = e3[Symbol.iterator]();
                  },
                  n: function () {
                    var e4 = n3.next();
                    return u2 = e4.done, e4;
                  },
                  e: function (e4) {
                    c2 = true, s2 = e4;
                  },
                  f: function () {
                    try {
                      u2 || n3.return == null || n3.return();
                    } finally {
                      if (c2) {
                        throw s2;
                      }
                    }
                  },
                };
              }
              function o(e3, t3) {
                if (e3) {
                  if (typeof e3 == "string") {
                    return s(e3, t3);
                  }
                  var n3 = Object.prototype.toString.call(e3).slice(8, -1);
                  return n3 === "Object" && e3.constructor &&
                    (n3 = e3.constructor.name),
                    n3 === "Map" || n3 === "Set"
                      ? Array.from(e3)
                      : n3 === "Arguments" ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3)
                      ? s(e3, t3)
                      : void 0;
                }
              }
              function s(e3, t3) {
                (t3 == null || t3 > e3.length) && (t3 = e3.length);
                for (var n3 = 0, r2 = new Array(t3); n3 < t3; n3++) {
                  r2[n3] = e3[n3];
                }
                return r2;
              }
              function u(e3, t3) {
                if (!(e3 instanceof t3)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function c(e3, t3) {
                for (var n3 = 0; n3 < t3.length; n3++) {
                  var r2 = t3[n3];
                  r2.enumerable = r2.enumerable || false,
                    r2.configurable = true,
                    "value" in r2 && (r2.writable = true),
                    Object.defineProperty(e3, r2.key, r2);
                }
              }
              function a(e3, t3, n3) {
                return t3 && c(e3.prototype, t3), n3 && c(e3, n3), e3;
              }
              n2.d(t2, { default: () => l });
              var l = function () {
                  function e3(t3) {
                    if (
                      u(this, e3),
                        this.onListeners = new Map(),
                        this.onlyListeners = new Map(),
                        t3
                    ) {
                      var n3, r2 = i(t3);
                      try {
                        for (r2.s(); !(n3 = r2.n()).done;) {
                          var o2 = n3.value, s2 = new f();
                          this.onListeners.set(o2, s2);
                        }
                      } catch (e4) {
                        r2.e(e4);
                      } finally {
                        r2.f();
                      }
                    }
                    this.childEventEmitters = [], this.onIntercepterFuncs = {};
                  }
                  return a(e3, [{
                    key: "on",
                    value: function (e4, t3) {
                      var n3 = this.onListeners.get(e4);
                      if (
                        n3 || (n3 = new f(), this.onListeners.set(e4, n3)),
                          n3.addListenerFunc(t3),
                          this.onIntercepterFuncs
                      ) {
                        for (
                          var i2 = 0,
                            o2 = Object.entries(this.onIntercepterFuncs);
                          i2 < o2.length;
                          i2++
                        ) {
                          var s2 = r(o2[i2], 2), u2 = s2[0];
                          (0, s2[1])(
                            {
                              eventType: e4,
                              func: t3,
                              onIntercepterFuncname: u2,
                            },
                          );
                        }
                      }
                    },
                  }, {
                    key: "removeListener",
                    value: function (e4, t3) {
                      var n3 = this.onListeners.get(e4);
                      n3 && n3.removeListener(t3);
                    },
                  }, {
                    key: "only",
                    value: function (e4, t3, n3) {
                      var r2 = this.onlyListeners.get(e4);
                      r2 || (r2 = new h(), this.onlyListeners.set(e4, r2)),
                        r2.putListenerFunc(t3, n3);
                    },
                  }, {
                    key: "pipe",
                    value: function (e4) {
                      this.childEventEmitters.push(e4);
                    },
                  }, {
                    key: "emit",
                    value: function (e4, t3) {
                      var n3 = this.onListeners.get(e4);
                      n3 && (t3.eventType = e4, n3.callListenerFunc(t3));
                      var r2 = this.onlyListeners.get(e4);
                      r2 && (t3.eventType = e4, r2.callListenerFunc(t3));
                      var o2, s2 = i(this.childEventEmitters);
                      try {
                        for (s2.s(); !(o2 = s2.n()).done;) {
                          o2.value.emit(e4, t3);
                        }
                      } catch (e5) {
                        s2.e(e5);
                      } finally {
                        s2.f();
                      }
                    },
                  }, {
                    key: "getAllListeners",
                    value: function () {
                      var e4 = {};
                      this.onListeners.forEach(function (t4, n4) {
                        var r3 = n4, i2 = t4.getAllListeners();
                        e4[r3] || (e4[r3] = {}), e4[r3].listeners = i2;
                      });
                      var t3, n3 = 0, r2 = i(this.childEventEmitters);
                      try {
                        for (r2.s(); !(t3 = r2.n()).done;) {
                          t3.value.onListeners.forEach(function (t4, r3) {
                            var i2 = r3, o2 = t4.getAllListeners();
                            e4[i2] || (e4[i2] = {}),
                              e4[i2].childEventEmitters ||
                              (e4[i2].childEventEmitters = []),
                              e4[i2].childEventEmitters.push(
                                { childEmitterIdx: n3, listeners: o2 },
                              );
                          }), n3++;
                        }
                      } catch (e5) {
                        r2.e(e5);
                      } finally {
                        r2.f();
                      }
                      return e4;
                    },
                  }, {
                    key: "hasListenerFuncs",
                    value: function (e4) {
                      if (this.onListeners.has(e4)) {
                        var t3 = this.onListeners.get(e4);
                        if (t3 && t3.hasListenerFunc()) {
                          return true;
                        }
                      }
                      var n3, r2 = i(this.childEventEmitters);
                      try {
                        for (r2.s(); !(n3 = r2.n()).done;) {
                          if (n3.value.hasListenerFuncs(e4)) {
                            return true;
                          }
                        }
                      } catch (e5) {
                        r2.e(e5);
                      } finally {
                        r2.f();
                      }
                      return false;
                    },
                  }, {
                    key: "clearAll",
                    value: function () {
                      var e4, t3 = i(this.onListeners.values());
                      try {
                        for (t3.s(); !(e4 = t3.n()).done;) {
                          e4.value.clearAll();
                        }
                      } catch (e5) {
                        t3.e(e5);
                      } finally {
                        t3.f();
                      }
                      this.onListeners.clear();
                      var n3, r2 = i(this.onlyListeners.values());
                      try {
                        for (r2.s(); !(n3 = r2.n()).done;) {
                          n3.value.clearAll();
                        }
                      } catch (e5) {
                        r2.e(e5);
                      } finally {
                        r2.f();
                      }
                      this.onlyListeners.clear(), this.childEventEmitters = [];
                    },
                  }, {
                    key: "addOnIntercepterFunc",
                    value: function (e4, t3) {
                      if (this.onIntercepterFuncs[e4]) {
                        throw Error(
                          'Always registered intercepter func "'.concat(
                            e4,
                            '".',
                          ),
                        );
                      }
                      this.onIntercepterFuncs[e4] = t3;
                    },
                  }, {
                    key: "removeOnIntercepterFunc",
                    value: function (e4) {
                      delete this.onIntercepterFuncs[e4];
                    },
                  }, {
                    key: "getAllOnIntercepterFuncs",
                    value: function () {
                      for (
                        var e4 = [],
                          t3 = 0,
                          n3 = Object.entries(this.onIntercepterFuncs);
                        t3 < n3.length;
                        t3++
                      ) {
                        var i2 = r(n3[t3], 2), o2 = i2[0], s2 = i2[1];
                        e4.push({ funcName: o2, func: s2 });
                      }
                      return e4;
                    },
                  }]),
                    e3;
                }(),
                f = function () {
                  function e3() {
                    u(this, e3), this.listenerFuncs = [];
                  }
                  return a(e3, [{
                    key: "clearAll",
                    value: function () {
                      this.listenerFuncs = [];
                    },
                  }, {
                    key: "getAllListeners",
                    value: function () {
                      return this.listenerFuncs;
                    },
                  }, {
                    key: "hasListenerFunc",
                    value: function () {
                      return this.listenerFuncs.length > 0;
                    },
                  }, {
                    key: "addListenerFunc",
                    value: function (e4) {
                      this.listenerFuncs.push(e4);
                    },
                  }, {
                    key: "callListenerFunc",
                    value: function (e4) {
                      var t3, n3 = i(this.listenerFuncs);
                      try {
                        for (n3.s(); !(t3 = n3.n()).done;) {
                          var r2 = t3.value;
                          if (this.typeOf(r2) !== "Function") {
                            throw Error(
                              '[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'
                                .concat(
                                  r2,
                                  '".Check args of #only method or #on method.',
                                ),
                            );
                          }
                          r2(e4);
                        }
                      } catch (e5) {
                        n3.e(e5);
                      } finally {
                        n3.f();
                      }
                    },
                  }, {
                    key: "removeListener",
                    value: function (e4) {
                      this.removeArrayItemOnce(this.listenerFuncs, e4);
                    },
                  }, {
                    key: "removeArrayItemOnce",
                    value: function (e4, t3) {
                      var n3 = e4.indexOf(t3);
                      return n3 > -1 && e4.splice(n3, 1), e4;
                    },
                  }, {
                    key: "typeOf",
                    value: function (e4) {
                      return Object.prototype.toString.call(e4).slice(8, -1);
                    },
                  }]),
                    e3;
                }(),
                h = function () {
                  function e3() {
                    u(this, e3), this.listenerFuncMap = new Map();
                  }
                  return a(e3, [{
                    key: "clearAll",
                    value: function () {
                      this.listenerFuncMap.clear();
                    },
                  }, {
                    key: "hasListenerFunc",
                    value: function (e4) {
                      return this.listenerFuncMap.has(e4);
                    },
                  }, {
                    key: "putListenerFunc",
                    value: function (e4, t3) {
                      this.listenerFuncMap.set(e4, t3);
                    },
                  }, {
                    key: "callListenerFunc",
                    value: function (e4) {
                      var t3, n3 = i(this.listenerFuncMap.values());
                      try {
                        for (n3.s(); !(t3 = n3.n()).done;) {
                          var r2 = t3.value;
                          if (this.typeOf(r2) !== "Function") {
                            throw Error(
                              '[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'
                                .concat(
                                  r2,
                                  '".Check args of #only method or #on method.',
                                ),
                            );
                          }
                          r2(e4);
                        }
                      } catch (e5) {
                        n3.e(e5);
                      } finally {
                        n3.f();
                      }
                    },
                  }, {
                    key: "typeOf",
                    value: function (e4) {
                      return Object.prototype.toString.call(e4).slice(8, -1);
                    },
                  }]),
                    e3;
                }();
            },
          },
          t = {};
        function n(r) {
          if (t[r]) {
            return t[r].exports;
          }
          var i = t[r] = { exports: {} };
          return e[r](i, i.exports, n), i.exports;
        }
        return n.d = (e2, t2) => {
          for (var r in t2) {
            n.o(t2, r) && !n.o(e2, r) &&
              Object.defineProperty(e2, r, { enumerable: true, get: t2[r] });
          }
        },
          n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2),
          n(561);
      })().default;
    });
  });

  // src/CCommon.js
  var require_CCommon = __commonJS((exports, module) => {
    CALIGN = {};
    CALIGN.LEFT_TOP = "LEFT_TOP";
    CALIGN.HCENTER_TOP = "CENTER_TOP";
    CALIGN.RIGHT_TOP = "RIGHT_TOP";
    CALIGN.LEFT_VCENTER = "LEFT_CENTER";
    CALIGN.HCENTER_VCENTER = "CENTER_CENTER";
    CALIGN.CENTER = CALIGN.HCENTER_VCENTER;
    CALIGN.RIGHT_VCENTER = "RIGHT_CENTER";
    CALIGN.LEFT_BOTTOM = "LEFT_BOTTOM";
    CALIGN.HCENTER_BOTTOM = "CENTER_BOTTOM";
    CALIGN.RIGHT_BOTTOM = "RIGHT_BOTTOM";
    module.exports = CALIGN;
  });

  // src/utils/CTimer.js
  var require_CTimer = __commonJS((exports, module) => {
    var CTimer = function () {
      function CTimer2() {
        var me = this;
        me._timerId = null;
        me._isRunning = false;
        me._timerInterval = 0;
        me._internalCallback = _internalCallback;
        me._timerMethod = null;
        function _internalCallback() {
          if (me._timerMethod) {
            me._timerMethod(me);
          }
          if (me._isRunning) {
            clearTimeout(me._timerId);
            me._timerId = setTimeout(me._internalCallback, me._timerInterval);
          }
        }
      }
      CTimer2.prototype.setCallback = function (callback_func) {
        var me = this;
        me._timerMethod = callback_func;
        return me;
      };
      CTimer2.prototype.setIntervalMillis = function (interval) {
        var me = this;
        me._timerInterval = interval;
        return me;
      };
      CTimer2.prototype.stopTimer = function () {
        var me = this;
        me._isRunning = false;
        return me;
      };
      CTimer2.prototype.startTimer = function () {
        var me = this;
        if (me._timerInterval > 0) {
          me._timerId = setTimeout(me._internalCallback, me._timerInterval);
          me._isRunning = true;
        }
        return me;
      };
      return CTimer2;
    }();
    module.exports = CTimer;
  });

  // src/utils/CSimpleLayoutAnimator.js
  var require_CSimpleLayoutAnimator = __commonJS((exports, module) => {
    var CTimer = require_CTimer();
    function CSimpleLayoutAnimator() {
      this.fps = 30;
      this.durationMillis = 200;
      this.targetFrame = null;
      this._crrAlpha = 1;
      this._toAlpha = 1;
      this._crrWidth = 0;
      this._crrHeight = 0;
      this._toWidth = 0;
      this._toHeight = 0;
      this._toX = 0;
      this._toY = 0;
      this.pinnedAnimationEnabled = false;
      this._pinX = 0;
      this._pinY = 0;
      this._pinAnchor = null;
    }
    CSimpleLayoutAnimator.prototype.set = function (ciframe) {
      var me = this;
      me.targetFrame = ciframe;
      me.fromWidth(ciframe.getWidth());
      me.fromHeight(ciframe.getHeight());
      me.toWidth(ciframe.getWidth());
      me.toHeight(ciframe.getHeight());
      var crrPos = ciframe.getPosition();
      me.fromPosition(crrPos.x, crrPos.y, crrPos.anchor);
      return me;
    };
    CSimpleLayoutAnimator.prototype.get = function () {
      var me = this;
      return me.targetFrame;
    };
    CSimpleLayoutAnimator.prototype.setDuration = function (durationMillis) {
      var me = this;
      me.durationMillis = durationMillis;
      return me;
    };
    CSimpleLayoutAnimator.prototype.setFPS = function (fps) {
      var me = this;
      me.fps = fps;
      return me;
    };
    CSimpleLayoutAnimator.prototype.fromPosition = function (x, y, anchor) {
      var me = this;
      me.pinnedAnimationEnabled = true;
      me._pinX = x;
      me._pinY = y;
      me.toPosition(x, y);
      if (anchor) {
        me._pinAnchor = anchor;
      }
      return me;
    };
    CSimpleLayoutAnimator.prototype.fromWidth = function (fromWidth) {
      var me = this;
      me._crrWidth = fromWidth;
      return me;
    };
    CSimpleLayoutAnimator.prototype.fromHeight = function (fromHeight) {
      var me = this;
      me._crrHeight = fromHeight;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toWidth = function (toWidth) {
      var me = this;
      me._toWidth = toWidth;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toHeight = function (toHeight) {
      var me = this;
      me._toHeight = toHeight;
      return me;
    };
    CSimpleLayoutAnimator.prototype.fromAlpha = function (fromAlpha) {
      var me = this;
      me._crrAlpha = fromAlpha;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toAlpha = function (toAlpha) {
      var me = this;
      me._toAlpha = toAlpha;
      return me;
    };
    CSimpleLayoutAnimator.prototype.ease = function (ease) {
      var me = this;
      me._ease = ease;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toPosition = function (x, y) {
      var me = this;
      me._toX = x;
      me._toY = y;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toX = function (x) {
      var me = this;
      me._toX = x;
      return me;
    };
    CSimpleLayoutAnimator.prototype.toY = function (t) {
      var me = this;
      me._toY = t;
      return me;
    };
    CSimpleLayoutAnimator.prototype.start = function (
      waitMillis,
      requestFocusEnabled,
    ) {
      var me = this;
      var fromWidth = me._crrWidth;
      var fromHeight = me._crrHeight;
      var fromX = me._pinX;
      var fromY = me._pinY;
      var fromAlpha = me._crrAlpha;
      return new Promise(function (resolve, reject) {
        var numOfSteps = parseInt(me.fps * (me.durationMillis / 1e3));
        if (numOfSteps == 0) {
          numOfSteps = 1;
        }
        var deltaWidth = (me._toWidth - fromWidth) / numOfSteps;
        var deltaHeight = (me._toHeight - fromHeight) / numOfSteps;
        var deltaX = (me._toX - fromX) / numOfSteps;
        var deltaY = (me._toY - fromY) / numOfSteps;
        var deltaAlpha = (me._toAlpha - fromAlpha) / numOfSteps;
        if (me._ease) {
          deltaAlpha = deltaAlpha / 1.24;
        }
        var unitMillis = me.durationMillis / numOfSteps;
        var idx = 0;
        function loop() {
          var timer = new CTimer();
          timer.setIntervalMillis(unitMillis);
          timer.setCallback(function (timer2) {
            if (idx == numOfSteps) {
              var _width = me._toWidth;
              var _height = me._toHeight;
              var _x = fromX + deltaX * idx;
              var _y = fromY + deltaY * idx;
              var _alpha = me._toAlpha;
              if (me.pinnedAnimationEnabled) {
                me.targetFrame._setPositionInternally(
                  _x,
                  _y,
                  me._pinAnchor,
                  _width,
                  _height,
                );
              }
              if (me.targetFrame.htmlElement.style) {
                me.targetFrame.htmlElement.style.opacity = _alpha;
              }
              me.targetFrame.setSize(_width, _height, true);
              me._crrWidth = _width;
              me._crrHeight = _height;
              me._pinX = _x;
              me._pinY = _y;
            }
            if (idx == numOfSteps + 1) {
              timer2.stopTimer();
              if (me.targetFrame.htmlElement.style) {
                me.targetFrame.htmlElement.style.opacity = me._toAlpha;
              }
              resolve(me);
              return;
            }
            var _width = fromWidth + deltaWidth * idx;
            var _height = fromHeight + deltaHeight * idx;
            var _x = fromX + deltaX * idx;
            var _y = fromY + deltaY * idx;
            var _alpha = fromAlpha + deltaAlpha * idx;
            if (me.pinnedAnimationEnabled) {
              me.targetFrame._setPositionInternally(
                _x,
                _y,
                me._pinAnchor,
                _width,
                _height,
              );
            }
            if (me.targetFrame.htmlElement.style) {
              me.targetFrame.htmlElement.style.opacity = _alpha;
            }
            me.targetFrame.setSize(_width, _height, true);
            if (idx == 0) {
              var wmgr = me.targetFrame.parentCanvas;
              if (wmgr) {
                var _targetFrame = wmgr.getWindow(me.targetFrame.id);
                if (_targetFrame) {
                  me.targetFrame.show({ requestFocus: requestFocusEnabled });
                } else {
                }
              }
            }
            idx++;
          });
          timer.startTimer();
        }
        if (waitMillis) {
          var waiter = new CTimer();
          waiter.setIntervalMillis(waitMillis);
          waiter.setCallback(function (_timer) {
            _timer.stopTimer();
            loop();
          });
          waiter.startTimer();
        } else {
          loop();
        }
      });
    };
    module.exports = CSimpleLayoutAnimator;
  });

  // ../../node_modules/merge-deeply/lib/merge-deeply.js
  var require_merge_deeply = __commonJS((exports, module) => {
    /*! merge-deeply v3.0.0 Copyright (c) 2019-2020 riversun.org@gmail.com */
    !function (e, r) {
      typeof exports == "object" && typeof module == "object"
        ? module.exports = r()
        : typeof define == "function" && define.amd
        ? define("mergeDeeply", [], r)
        : typeof exports == "object"
        ? exports.mergeDeeply = r()
        : e.mergeDeeply = r();
    }(exports, function () {
      return function (e) {
        var r = {};
        function t(n) {
          if (r[n]) {
            return r[n].exports;
          }
          var o = r[n] = { i: n, l: false, exports: {} };
          return e[n].call(o.exports, o, o.exports, t), o.l = true, o.exports;
        }
        return t.m = e,
          t.c = r,
          t.d = function (e2, r2, n) {
            t.o(e2, r2) ||
              Object.defineProperty(e2, r2, { enumerable: true, get: n });
          },
          t.r = function (e2) {
            typeof Symbol != "undefined" && Symbol.toStringTag &&
            Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e2, "__esModule", { value: true });
          },
          t.t = function (e2, r2) {
            if (1 & r2 && (e2 = t(e2)), 8 & r2) {
              return e2;
            }
            if (4 & r2 && typeof e2 == "object" && e2 && e2.__esModule) {
              return e2;
            }
            var n = Object.create(null);
            if (
              t.r(n),
                Object.defineProperty(
                  n,
                  "default",
                  { enumerable: true, value: e2 },
                ),
                2 & r2 && typeof e2 != "string"
            ) {
              for (var o in e2) {
                t.d(
                  n,
                  o,
                  function (r3) {
                    return e2[r3];
                  }.bind(null, o),
                );
              }
            }
            return n;
          },
          t.n = function (e2) {
            var r2 = e2 && e2.__esModule
              ? function () {
                return e2.default;
              }
              : function () {
                return e2;
              };
            return t.d(r2, "a", r2), r2;
          },
          t.o = function (e2, r2) {
            return Object.prototype.hasOwnProperty.call(e2, r2);
          },
          t.p = "/",
          t(t.s = 0);
      }([function (e, r, t) {
        e.exports = t(1);
      }, function (e, r, t) {
        "use strict";
        function n(e2, r2) {
          var t2;
          if (typeof Symbol == "undefined" || e2[Symbol.iterator] == null) {
            if (
              Array.isArray(e2) || (t2 = a(e2)) ||
              r2 && e2 && typeof e2.length == "number"
            ) {
              t2 && (e2 = t2);
              var n2 = 0,
                o2 = function () {
                };
              return {
                s: o2,
                n: function () {
                  return n2 >= e2.length
                    ? { done: true }
                    : { done: false, value: e2[n2++] };
                },
                e: function (e3) {
                  throw e3;
                },
                f: o2,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }
          var i2, u2 = true, c2 = false;
          return {
            s: function () {
              t2 = e2[Symbol.iterator]();
            },
            n: function () {
              var e3 = t2.next();
              return u2 = e3.done, e3;
            },
            e: function (e3) {
              c2 = true, i2 = e3;
            },
            f: function () {
              try {
                u2 || t2.return == null || t2.return();
              } finally {
                if (c2) {
                  throw i2;
                }
              }
            },
          };
        }
        function o(e2) {
          return function (e3) {
            if (Array.isArray(e3)) {
              return u(e3);
            }
          }(e2) || function (e3) {
            if (typeof Symbol != "undefined" && Symbol.iterator in Object(e3)) {
              return Array.from(e3);
            }
          }(e2) || a(e2) || function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }();
        }
        function i(e2, r2) {
          return function (e3) {
            if (Array.isArray(e3)) {
              return e3;
            }
          }(e2) || function (e3, r3) {
            if (
              typeof Symbol == "undefined" || !(Symbol.iterator in Object(e3))
            ) {
              return;
            }
            var t2 = [], n2 = true, o2 = false, i2 = void 0;
            try {
              for (
                var a2, u2 = e3[Symbol.iterator]();
                !(n2 = (a2 = u2.next()).done) &&
                (t2.push(a2.value), !r3 || t2.length !== r3);
                n2 = true
              );
            } catch (e4) {
              o2 = true, i2 = e4;
            } finally {
              try {
                n2 || u2.return == null || u2.return();
              } finally {
                if (o2) {
                  throw i2;
                }
              }
            }
            return t2;
          }(e2, r2) || a(e2, r2) || function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }();
        }
        function a(e2, r2) {
          if (e2) {
            if (typeof e2 == "string") {
              return u(e2, r2);
            }
            var t2 = Object.prototype.toString.call(e2).slice(8, -1);
            return t2 === "Object" && e2.constructor &&
              (t2 = e2.constructor.name),
              t2 === "Map" || t2 === "Set"
                ? Array.from(e2)
                : t2 === "Arguments" ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2)
                ? u(e2, r2)
                : void 0;
          }
        }
        function u(e2, r2) {
          (r2 == null || r2 > e2.length) && (r2 = e2.length);
          for (var t2 = 0, n2 = new Array(r2); t2 < r2; t2++) {
            n2[t2] = e2[t2];
          }
          return n2;
        }
        function c(e2) {
          return (c =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (e3) {
                return typeof e3;
              }
              : function (e3) {
                return e3 && typeof Symbol == "function" &&
                    e3.constructor === Symbol && e3 !== Symbol.prototype
                  ? "symbol"
                  : typeof e3;
              })(e2);
        }
        function f(e2, r2, t2) {
          var a2 = function (e3) {
              return e3 && c(e3) === "object" && !Array.isArray(e3);
            },
            u2 = t2 && t2.concatArray,
            l2 = t2.isCloneMode,
            y = {};
          t2 && t2.assignToObject &&
            (y = t2.assignToObject, t2.assignToObject = null);
          var s, b, p, d = null;
          if (d = y === e2 ? e2 : Object.assign(y, e2), a2(e2) && a2(r2)) {
            for (var m = 0, j = Object.entries(r2); m < j.length; m++) {
              var v = i(j[m], 2), g = v[0], h = v[1], O = e2[g];
              if (u2 && Array.isArray(h) && Array.isArray(O) && r2 !== e2) {
                d[g] = O.concat.apply(O, o(h));
              } else if (a2(h) && Object.prototype.hasOwnProperty.call(e2, g)) {
                d[g] = f(O, h, t2);
              } else {
                var A = h;
                if (l2 && Array.isArray(h)) {
                  var S, w = [], x = n(h);
                  try {
                    for (x.s(); !(S = x.n()).done;) {
                      var T = S.value, P = JSON.parse(JSON.stringify(T));
                      w.push(P);
                    }
                  } catch (e3) {
                    x.e(e3);
                  } finally {
                    x.f();
                  }
                  A = w;
                }
                Object.assign(
                  d,
                  (p = A,
                    (b = g) in (s = {})
                      ? Object.defineProperty(
                        s,
                        b,
                        {
                          value: p,
                          enumerable: true,
                          configurable: true,
                          writable: true,
                        },
                      )
                      : s[b] = p,
                    s),
                );
              }
            }
          }
          return d;
        }
        function l(e2) {
          var r2 = null, t2 = null, n2 = e2.op;
          if (!n2) {
            throw Error(
              'The initialization property "op" cannot be omitted. "merge","overwrite-merge","clone" can be specified.',
            );
          }
          var o2 = n2 === "merge",
            i2 = n2 === "clone",
            a2 = n2 === "overwrite-merge";
          if (o2) {
            if (r2 = e2.object1, t2 = e2.object2, !r2 || !t2) {
              throw Error("object1 or object2 is not specified.");
            }
          } else if (a2) {
            if (r2 = e2.object1, t2 = e2.object2, !r2 || !t2) {
              throw Error("object1 or object2 is not specified.");
            }
            if (Object.keys(t2).length === 0) {
              return null;
            }
          } else {
            if (!i2) {
              throw Error(
                'An invalid "op" property value "'.concat(
                  n2,
                  '" has been specified.',
                ),
              );
            }
            r2 = e2.object1, t2 = {};
          }
          var u2,
            c2 = Object.create(Object.getPrototypeOf(r2)),
            l2 = null,
            y = (u2 = r2, Object.getPrototypeOf(u2) !== Object.prototype);
          return o2 && y || i2
            ? (f(
              r2,
              r2,
              {
                assignToObject: c2,
                concatArray: e2 && e2.concatArray,
                isCloneMode: i2,
              },
            ),
              l2 = c2)
            : l2 = {},
            f(
              i2
                ? l2
                : r2,
              t2,
              {
                assignToObject: a2 ? r2 : l2,
                concatArray: e2 && e2.concatArray,
              },
            ),
            l2;
        }
        t.r(r),
          t.d(r, "default", function () {
            return l;
          });
      }]).default;
    });
  });

  // ../../node_modules/event-listener-helper/lib/event-listener-helper.js
  var require_event_listener_helper = __commonJS((exports, module) => {
    /*! event-listener-helper(https://github.com/riversun/event-listener-helper) v1.1.2 Copyright (c) 2020 riversun.org@gmail.com */
    !function (e, t) {
      typeof exports == "object" && typeof module == "object"
        ? module.exports = t()
        : typeof define == "function" && define.amd
        ? define("EventListenerHelper", [], t)
        : typeof exports == "object"
        ? exports.EventListenerHelper = t()
        : e.EventListenerHelper = t();
    }(exports, function () {
      return function (e) {
        var t = {};
        function n(r) {
          if (t[r]) {
            return t[r].exports;
          }
          var i = t[r] = { i: r, l: false, exports: {} };
          return e[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
        }
        return n.m = e,
          n.c = t,
          n.d = function (e2, t2, r) {
            n.o(e2, t2) ||
              Object.defineProperty(e2, t2, { enumerable: true, get: r });
          },
          n.r = function (e2) {
            typeof Symbol != "undefined" && Symbol.toStringTag &&
            Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e2, "__esModule", { value: true });
          },
          n.t = function (e2, t2) {
            if (1 & t2 && (e2 = n(e2)), 8 & t2) {
              return e2;
            }
            if (4 & t2 && typeof e2 == "object" && e2 && e2.__esModule) {
              return e2;
            }
            var r = Object.create(null);
            if (
              n.r(r),
                Object.defineProperty(
                  r,
                  "default",
                  { enumerable: true, value: e2 },
                ),
                2 & t2 && typeof e2 != "string"
            ) {
              for (var i in e2) {
                n.d(
                  r,
                  i,
                  function (t3) {
                    return e2[t3];
                  }.bind(null, i),
                );
              }
            }
            return r;
          },
          n.n = function (e2) {
            var t2 = e2 && e2.__esModule
              ? function () {
                return e2.default;
              }
              : function () {
                return e2;
              };
            return n.d(t2, "a", t2), t2;
          },
          n.o = function (e2, t2) {
            return Object.prototype.hasOwnProperty.call(e2, t2);
          },
          n.p = "/",
          n(n.s = 0);
      }([function (e, t, n) {
        e.exports = n(1);
      }, function (e, t, n) {
        "use strict";
        function r(e2) {
          return (r =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (e3) {
                return typeof e3;
              }
              : function (e3) {
                return e3 && typeof Symbol == "function" &&
                    e3.constructor === Symbol && e3 !== Symbol.prototype
                  ? "symbol"
                  : typeof e3;
              })(e2);
        }
        function i(e2, t2) {
          return function (e3) {
            if (Array.isArray(e3)) {
              return e3;
            }
          }(e2) || function (e3, t3) {
            if (
              typeof Symbol == "undefined" || !(Symbol.iterator in Object(e3))
            ) {
              return;
            }
            var n2 = [], r2 = true, i2 = false, o2 = void 0;
            try {
              for (
                var a2, s2 = e3[Symbol.iterator]();
                !(r2 = (a2 = s2.next()).done) &&
                (n2.push(a2.value), !t3 || n2.length !== t3);
                r2 = true
              );
            } catch (e4) {
              i2 = true, o2 = e4;
            } finally {
              try {
                r2 || s2.return == null || s2.return();
              } finally {
                if (i2) {
                  throw o2;
                }
              }
            }
            return n2;
          }(e2, t2) || a(e2, t2) || function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }();
        }
        function o(e2, t2) {
          var n2;
          if (typeof Symbol == "undefined" || e2[Symbol.iterator] == null) {
            if (
              Array.isArray(e2) || (n2 = a(e2)) ||
              t2 && e2 && typeof e2.length == "number"
            ) {
              n2 && (e2 = n2);
              var r2 = 0,
                i2 = function () {
                };
              return {
                s: i2,
                n: function () {
                  return r2 >= e2.length
                    ? { done: true }
                    : { done: false, value: e2[r2++] };
                },
                e: function (e3) {
                  throw e3;
                },
                f: i2,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }
          var o2, s2 = true, l2 = false;
          return {
            s: function () {
              n2 = e2[Symbol.iterator]();
            },
            n: function () {
              var e3 = n2.next();
              return s2 = e3.done, e3;
            },
            e: function (e3) {
              l2 = true, o2 = e3;
            },
            f: function () {
              try {
                s2 || n2.return == null || n2.return();
              } finally {
                if (l2) {
                  throw o2;
                }
              }
            },
          };
        }
        function a(e2, t2) {
          if (e2) {
            if (typeof e2 == "string") {
              return s(e2, t2);
            }
            var n2 = Object.prototype.toString.call(e2).slice(8, -1);
            return n2 === "Object" && e2.constructor &&
              (n2 = e2.constructor.name),
              n2 === "Map" || n2 === "Set"
                ? Array.from(e2)
                : n2 === "Arguments" ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)
                ? s(e2, t2)
                : void 0;
          }
        }
        function s(e2, t2) {
          (t2 == null || t2 > e2.length) && (t2 = e2.length);
          for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++) {
            r2[n2] = e2[n2];
          }
          return r2;
        }
        function l(e2, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            r2.enumerable = r2.enumerable || false,
              r2.configurable = true,
              "value" in r2 && (r2.writable = true),
              Object.defineProperty(e2, r2.key, r2);
          }
        }
        n.r(t),
          n.d(t, "default", function () {
            return u;
          });
        var u = function () {
          function e2() {
            !function (e3, t3) {
              if (!(e3 instanceof t3)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }(this, e2),
              this.evTargetListenersMap = new Map(),
              this.listenerNum = 0;
          }
          var t2, n2, a2;
          return t2 = e2,
            (n2 = [{
              key: "addEventListener",
              value: function (e3, t3, n3, r2) {
                var i2 = this, o2 = null;
                if (r2 && (o2 = this._cloneJson(r2)), arguments.length > 4) {
                  throw Error(
                    "Too many arguments. Number of arguments can be specified 4.",
                  );
                }
                this._checkTypeOfOptions(o2);
                var a3 = null;
                o2 && o2.listenerName && (a3 = o2.listenerName);
                var s2 = null;
                o2 && o2.once &&
                  (delete o2.once,
                    o2.callbackOnce = true,
                    s2 = function (r3) {
                      n3(r3), i2.removeEventListener(e3, t3, null, o2);
                    });
                var l2 = { listenerName: null, success: true };
                s2
                  ? e3.addEventListener(t3, s2, o2)
                  : e3.addEventListener(t3, n3, o2);
                var u2 = this.evTargetListenersMap.get(e3);
                u2 || (u2 = new Map(), this.evTargetListenersMap.set(e3, u2));
                var c = u2.get(t3);
                if (c || (c = new Map(), u2.set(t3, c)), a3 !== null) {
                  if (c.has(a3)) {
                    throw Error(
                      'The listenerName "'.concat(
                        a3,
                        '" is already used for the specified event type ',
                      ).concat(t3),
                    );
                  }
                  c.set(a3, { listener: n3, onceListener: s2, options: o2 }),
                    l2.listenerName = a3;
                } else {
                  var f = "listener-".concat(this.listenerNum);
                  o2 || (o2 = {}),
                    o2.listenerName = f,
                    c.set(f, { listener: n3, onceListener: s2, options: o2 }),
                    l2.listenerName = f,
                    this.listenerNum += 1;
                }
                return l2;
              },
            }, {
              key: "removeEventListener",
              value: function (e3, t3, n3, r2) {
                if (arguments.length < 3) {
                  throw Error("Three or four arguments are required.");
                }
                if (
                  this.typeOf(n3) !== "Function" && this.typeOf(n3) !== "Null"
                ) {
                  throw Error(
                    'Type of 3rd arg should be a "Function" or "Null".',
                  );
                }
                this._checkTypeOfOptions(r2);
                var i2 = null;
                r2 && r2.listenerName && (i2 = r2.listenerName);
                var o2 = { success: false, message: "unknown error" },
                  a3 = this.evTargetListenersMap.get(e3);
                if (!a3) {
                  return o2.message = "DOM element ".concat(e3, "(id=").concat(
                    e3.id,
                    ") doesn't have any listeners.",
                  ),
                    o2;
                }
                var s2 = a3.get(t3);
                if (!s2) {
                  return o2.message = "DOM element ".concat(e3, "(id=").concat(
                    e3.id,
                    `) doesn't have "`,
                  ).concat(t3, '" listeners.'),
                    o2;
                }
                if (i2) {
                  var l2 = s2.get(i2);
                  if (!l2) {
                    return o2.message = "DOM element ".concat(e3, "(id=")
                      .concat(e3.id, `) doesn't have "`).concat(
                        t3,
                        '" listener "',
                      ).concat(i2, '"'),
                      o2;
                  }
                  s2.delete(i2),
                    l2.options && l2.options.callbackOnce
                      ? e3.removeEventListener(t3, l2.onceListener, l2.options)
                      : e3.removeEventListener(t3, l2.listener, l2.options),
                    o2.success = true;
                } else if (!i2) {
                  if (!n3) {
                    return o2.message = "options.listenerName is not found", o2;
                  }
                  var u2 = "listener",
                    c = n3,
                    f = this._searchKeyInValueContent(s2, u2, c);
                  if (f) {
                    var v = s2.get(f), y = v.onceListener, p = v.options;
                    s2.delete(f),
                      y
                        ? e3.removeEventListener(t3, y, p)
                        : e3.removeEventListener(t3, n3, p),
                      o2.success = true;
                  } else {
                    o2.success = false,
                      o2.message =
                        "Specified listener could not be deleted from DOM element "
                          .concat(e3, "(id=").concat(
                            e3.id,
                            ").\n        Since the specified listener is not registered as an event listener,\n        it may have been registered outside of event-listener-helper.",
                          );
                  }
                }
                return o2;
              },
            }, {
              key: "getEventListeners",
              value: function (e3, t3) {
                return e3
                  ? t3
                    ? this._getEventListenersWith2Args(e3, t3)
                    : this._getEventListenersWith1Arg(e3)
                  : [];
              },
            }, {
              key: "getAllEventListeners",
              value: function () {
                var e3 = this, t3 = new Map();
                return this.evTargetListenersMap.forEach(function (n3, r2) {
                  var i2 = r2,
                    a3 = e3._getEventListenersWith1Arg(i2),
                    s2 = new Map();
                  t3.set(i2, s2);
                  var l2, u2 = o(a3);
                  try {
                    for (u2.s(); !(l2 = u2.n()).done;) {
                      var c = l2.value;
                      s2.set(c.eventType, c.listeners);
                    }
                  } catch (e4) {
                    u2.e(e4);
                  } finally {
                    u2.f();
                  }
                }),
                  t3;
              },
            }, {
              key: "_getEventListenersWith1Arg",
              value: function (e3) {
                var t3 = [], n3 = this.evTargetListenersMap.get(e3);
                if (!n3) {
                  return t3;
                }
                var r2, a3 = o(n3);
                try {
                  for (a3.s(); !(r2 = a3.n()).done;) {
                    var s2,
                      l2 = i(r2.value, 2),
                      u2 = l2[0],
                      c = l2[1],
                      f = [],
                      v = o(c.values());
                    try {
                      for (v.s(); !(s2 = v.n()).done;) {
                        var y = s2.value;
                        f.push(this._getFrozenListenerDef(y));
                      }
                    } catch (e4) {
                      v.e(e4);
                    } finally {
                      v.f();
                    }
                    f.length > 0 && t3.push({ eventType: u2, listeners: f });
                  }
                } catch (e4) {
                  a3.e(e4);
                } finally {
                  a3.f();
                }
                return t3;
              },
            }, {
              key: "_getEventListenersWith2Args",
              value: function (e3, t3) {
                if (arguments.length !== 2) {
                  throw Error("Only two arguments can be specified");
                }
                var n3 = [], r2 = this.evTargetListenersMap.get(e3);
                if (!r2) {
                  return n3;
                }
                var i2 = r2.get(t3);
                if (!i2) {
                  return n3;
                }
                var a3, s2 = o(i2.values());
                try {
                  for (s2.s(); !(a3 = s2.n()).done;) {
                    var l2 = a3.value, u2 = this._getFrozenListenerDef(l2);
                    n3.push(u2);
                  }
                } catch (e4) {
                  s2.e(e4);
                } finally {
                  s2.f();
                }
                return n3;
              },
            }, {
              key: "getEventListener",
              value: function (e3, t3, n3) {
                if (arguments.length !== 3) {
                  throw Error("Only 3 arguments can be specified");
                }
                var r2 = this.evTargetListenersMap.get(e3);
                if (!r2) {
                  return null;
                }
                var i2 = r2.get(t3);
                if (!i2) {
                  return null;
                }
                var o2 = i2.get(n3), a3 = this._getFrozenListenerDef(o2);
                return a3;
              },
            }, {
              key: "hasEventListeners",
              value: function (e3, t3) {
                if (arguments.length !== 2) {
                  throw Error("Only two arguments can be specified");
                }
                var n3 = this.evTargetListenersMap.get(e3);
                if (!n3) {
                  return false;
                }
                var r2 = n3.get(t3);
                return !(!r2 || r2.size === 0);
              },
            }, {
              key: "hasEventListener",
              value: function (e3, t3, n3) {
                if (arguments.length !== 3) {
                  throw Error("Only 3 arguments can be specified");
                }
                var r2 = this.evTargetListenersMap.get(e3);
                if (!r2) {
                  return false;
                }
                var i2 = r2.get(t3);
                if (!i2) {
                  return false;
                }
                var o2 = i2.get(n3);
                return !!o2;
              },
            }, {
              key: "_getFrozenListenerDef",
              value: function (e3) {
                if (!e3) {
                  return null;
                }
                var t3 = {}, n3 = null, r2 = e3.options;
                return r2 &&
                  (n3 = {},
                    t3.options = n3,
                    r2.capture && (n3.capture = r2.capture),
                    r2.callbackOnce && (n3.once = r2.callbackOnce),
                    r2.listenerName && (n3.listenerName = r2.listenerName)),
                  t3.listener = e3.listener,
                  Object.freeze(n3),
                  Object.freeze(t3),
                  t3;
              },
            }, {
              key: "clearAllEventListeners",
              value: function () {
                var e3, t3 = o(this.getAllEventTargets());
                try {
                  for (t3.s(); !(e3 = t3.n()).done;) {
                    var n3 = e3.value;
                    this.clearEventListeners(n3);
                  }
                } catch (e4) {
                  t3.e(e4);
                } finally {
                  t3.f();
                }
              },
            }, {
              key: "clearEventListeners",
              value: function (e3, t3) {
                if (!e3) {
                  throw Error(
                    "At least the EventTarget must be specified as an argument",
                  );
                }
                var n3 = this.getEventListeners(e3, t3);
                if (t3) {
                  if (t3) {
                    var r2, i2 = o(n3);
                    try {
                      for (i2.s(); !(r2 = i2.n()).done;) {
                        var a3 = r2.value;
                        this.removeEventListener(e3, t3, null, a3.options);
                      }
                    } catch (e4) {
                      i2.e(e4);
                    } finally {
                      i2.f();
                    }
                  }
                } else {
                  var s2, l2 = o(n3);
                  try {
                    for (l2.s(); !(s2 = l2.n()).done;) {
                      var u2, c = s2.value, f = c.eventType, v = o(c.listeners);
                      try {
                        for (v.s(); !(u2 = v.n()).done;) {
                          var y = u2.value.options;
                          this.removeEventListener(e3, f, null, y);
                        }
                      } catch (e4) {
                        v.e(e4);
                      } finally {
                        v.f();
                      }
                    }
                  } catch (e4) {
                    l2.e(e4);
                  } finally {
                    l2.f();
                  }
                }
              },
            }, {
              key: "clearEventListener",
              value: function (e3, t3, n3) {
                var r2 = this.getEventListener(e3, t3, n3);
                r2 && r2.options &&
                  this.removeEventListener(e3, t3, null, r2.options);
              },
            }, {
              key: "getAllEventTargets",
              value: function () {
                return Array.from(this.evTargetListenersMap.keys());
              },
            }, {
              key: "searchEventListenersByName",
              value: function (e3) {
                var t3, n3 = [], r2 = o(this.getAllEventTargets());
                try {
                  for (r2.s(); !(t3 = r2.n()).done;) {
                    var i2,
                      a3 = t3.value,
                      s2 = this.evTargetListenersMap.get(a3),
                      l2 = o(s2.keys());
                    try {
                      for (l2.s(); !(i2 = l2.n()).done;) {
                        var u2 = i2.value,
                          c = s2.get(u2),
                          f = this._getFrozenListenerDef(c.get(e3));
                        f && n3.push(f);
                      }
                    } catch (e4) {
                      l2.e(e4);
                    } finally {
                      l2.f();
                    }
                  }
                } catch (e4) {
                  r2.e(e4);
                } finally {
                  r2.f();
                }
                return n3;
              },
            }, {
              key: "_searchKeyInValueContent",
              value: function (e3, t3, n3) {
                var r2, a3 = o(e3);
                try {
                  for (a3.s(); !(r2 = a3.n()).done;) {
                    var s2 = i(r2.value, 2), l2 = s2[0];
                    if (s2[1][t3] === n3) {
                      return l2;
                    }
                  }
                } catch (e4) {
                  a3.e(e4);
                } finally {
                  a3.f();
                }
                return null;
              },
            }, {
              key: "_checkTypeOfOptions",
              value: function (e3) {
                if (r(e3) !== "object" && e3 !== void 0) {
                  throw typeof e3 == "boolean"
                    ? new Error(
                      "Type of boolean is not accepted as the fourth argument you specify.\n      If you want to enable useCapture, specify {capture: true} as the fourth parameter instead.",
                    )
                    : new Error(
                      "Type of ".concat(
                        r(e3),
                        " is not accepted as the fourth argument you specify.\n      If you want to specify options, specify an object like {capture: true, listenerName:'my-listener-01'}.",
                      ),
                    );
                }
              },
            }, {
              key: "_cloneJson",
              value: function (e3) {
                return JSON.parse(JSON.stringify(e3));
              },
            }, {
              key: "typeOf",
              value: function (e3) {
                return Object.prototype.toString.call(e3).slice(8, -1);
              },
            }]) && l(t2.prototype, n2),
            a2 && l(t2, a2),
            e2;
        }();
      }]).default;
    });
  });

  // src/utils/WindowEventHelper.js
  var require_WindowEventHelper = __commonJS((exports, module) => {
    "use strict";
    var CSimpleLayoutAnimator = require_CSimpleLayoutAnimator();
    var CALIGN2 = require_CCommon();
    var mergeDeeply = require_merge_deeply();
    var EventListenerHelper = require_event_listener_helper();
    function WindowEventHelper(model) {
      this.eventListenerHelper = new EventListenerHelper();
      this.windowMode = "default";
      this.styleDisplay = "flex";
      this.horizontalAlign = "left";
      this.verticalAlign = "top";
      this.keyListener = null;
      this.minimizeButton = null;
      this.maximizeButton = null;
      this.demaximizeButton = null;
      this.deminimizeButton = null;
      this.opts = model;
      this.isWindowManagerFixed = model.frame.jsFrame.isWindowManagerFixed;
      if (model.styleDisplay) {
        this.styleDisplay = model.styleDisplay;
      }
      if (model.minimizeButton) {
        this.minimizeButton = model.minimizeButton;
      }
      if (model.deminimizeButton) {
        this.deminimizeButton = model.deminimizeButton;
      }
      if (model.maximizeButton) {
        this.maximizeButton = model.maximizeButton;
      }
      if (model.demaximizeButton) {
        this.demaximizeButton = model.demaximizeButton;
      }
      if (model.hideButton) {
        this.hideButton = model.hideButton;
      }
      if (model.hideButtons) {
        this.hideButtons = model.hideButtons;
      }
      this.maximizeParam = model.maximizeParam;
      this.demaximizeParam = model.demaximizeParam;
      this.minimizeParam = model.minimizeParam;
      this.deminimizeParam = model.deminimizeParam;
      this.hideParam = model.hideParam;
      this.dehideParam = model.dehideParam;
      if (model.horizontalAlign) {
        this.horizontalAlign = model.horizontalAlign;
      }
      if (model.verticalAlign) {
        this.verticalAlign = model.verticalAlign;
      }
      this.animationEnabled = false;
      this.animationDuration = 100;
      this.frame = model.frame;
      this.hideFrameBorder = true;
      this.hideTitleBar = true;
      this.restoreKey = null;
      this.restoreDuration = null;
      this.restoreCallback = null;
      this.statsStore = {};
      if (model.animation) {
        this.animationEnabled = model.animation;
      }
      if (model.animationDuration) {
        this.animationDuration = model.animationDuration;
      }
      this.eventListeners = {};
      this.resizeListener = this.handleOnResize.bind(this);
      if (this.maximizeParam && this.maximizeParam.matchParent) {
        this.resizeListener = this.handleOnVirtualResize.bind(this);
      }
    }
    WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR = "__jsframe-mp-marker";
    WindowEventHelper.prototype.on = function (eventType, callback) {
      var me = this;
      me.eventListeners[eventType] = callback;
    };
    WindowEventHelper.prototype.doMaximize = function (model) {
      var me = this;
      if (me.windowMode === "hid") {
        throw Error(
          "[JSrame] It is not possible to change directly from the hid state to the maximized state",
        );
        return;
      }
      if (me.windowMode === "maximized" || me.windowMode === "maximizing") {
        return;
      }
      me.windowMode = "maximizing";
      var frame = me.frame;
      if (model && model.matchParent) {
        var windowManager = frame.getWindowManager();
        var parentElement = windowManager.getParentElement();
        if (!me.matchParentResizeObserver) {
          var matchParentResizeObserver = new MutationObserver(function () {
            me.resizeListener();
          });
          matchParentResizeObserver.observe(parentElement, {
            attributeFilter: [
              WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
            ],
            attributes: true,
          });
          me.matchParentResizeObserver = matchParentResizeObserver;
        }
      } else if (
        !me.eventListenerHelper.hasEventListener(
          window,
          "resize",
          "window-resize-listener",
        )
      ) {
        me.eventListenerHelper.addEventListener(
          window,
          "resize",
          me.resizeListener,
          { listenerName: "window-resize-listener" },
        );
      }
      me.saveCurrentWindowStats("maximize_mode");
      me.hideTitleBar = model ? model.fullScreen : false;
      if (me.hideTitleBar) {
        frame.hideAllVisibleFrameComponents();
      } else {
        if (me.maximizeButton) {
          frame.hideFrameComponent(me.maximizeButton);
        }
        if (me.demaximizeButton) {
          frame.showFrameComponent(me.demaximizeButton, me.styleDisplay);
        }
      }
      frame.setMovable(false);
      frame.setResizable(false);
      if (model && model.restoreKey) {
        me.restoreKey = model.restoreKey;
      }
      if (model && model.restoreDuration) {
        me.restoreDuration = model.restoreDuration;
      }
      if (model && model.restoreCallback) {
        me.restoreCallback = model.restoreCallback;
      }
      me.renderMaximizedMode({
        animation: me.animationEnabled,
        callback: model && model.callback ? model.callback : null,
        duration: model && model.duration ? model.duration : null,
        matchParent: model && model.matchParent ? model.matchParent : false,
      });
    };
    WindowEventHelper.prototype.renderMaximizedMode = function (model) {
      var me = this;
      var frame = me.frame;
      var from = me.loadWindowStats("maximize_mode");
      var _toX = 0;
      var _toY = 0;
      var _toWidth = 0;
      var _toHeight = 0;
      if (me.hideTitleBar) {
        _toX = 0;
        _toY = -from.titleBarHeight;
      }
      var parentWidth = window.innerWidth;
      var parentHeight = window.innerHeight;
      if (model.matchParent) {
        var windowManager = frame.getWindowManager();
        var parentElement = windowManager.getParentElement();
        parentWidth = parentElement.clientWidth;
        parentHeight = parentElement.clientHeight;
      }
      if (me.hideFrameBorder) {
        _toWidth = parentWidth;
        _toHeight = parentHeight + (me.hideTitleBar ? from.titleBarHeight : 0);
      } else {
        _toWidth = parentWidth - from.frameBorderWidthDefault * 2;
        _toHeight = parentHeight - from.frameBorderWidthDefault * 2 +
          (me.hideTitleBar ? from.titleBarHeight : 0);
      }
      if (me.horizontalAlign == "right") {
        _toX = -_toWidth;
      }
      if (me.verticalAlign == "bottom") {
        _toY = -_toHeight;
      }
      var funcDoRender = function (opt) {
        var disableCallback = opt && opt.disableCallback;
        frame.setPosition(_toX, _toY);
        if (me.hideFrameBorder) {
          frame.frameBorderWidthDefault = 0;
          frame.frameBorderWidthFocused = 0;
          frame.htmlElement.style.borderWidth = "0px";
        }
        frame.setSize(_toWidth, _toHeight, true);
        if (disableCallback) {
          return;
        }
        if (me.hideTitleBar) {
          if (me.restoreKey) {
            me.keyListener = function (event) {
              if (event.code === me.restoreKey) {
                me.doCommand("restore");
              }
            };
          }
          window.addEventListener("keydown", me.keyListener);
          if (frame.iframe) {
            frame.iframe.contentWindow.addEventListener(
              "keydown",
              me.keyListener,
            );
          }
        }
        me.windowMode = "maximized";
        if (model && model.callback) {
          model.callback(me.frame, { eventType: "maximized" });
        }
        if (me.eventListeners["maximized"]) {
          me.eventListeners["maximized"](me.frame, { eventType: "maximized" });
        }
      };
      if (model && model.animation) {
        me.animateFrame({
          frame,
          from,
          to: {
            left: _toX,
            top: _toY,
            width: _toWidth,
            height: _toHeight,
          },
          duration: model.duration ? model.duration : me.animationDuration,
          callback: funcDoRender,
        });
      } else {
        if (model && model.caller === "handleOnResize") {
          funcDoRender({ disableCallback: true });
        } else {
          funcDoRender();
        }
      }
    };
    WindowEventHelper.prototype.getWindowMode = function () {
      return this.windowMode;
    };
    WindowEventHelper.prototype.doDemaximize = function (model) {
      var me = this;
      var frame = me.frame;
      if (me.windowMode === "hid") {
        throw Error(
          "[JSFrame] demaximize(=recovery from maximized) cannot be performed in hid state.",
        );
        return;
      }
      if (!me.hasWindowStats("maximize_mode")) {
        return;
      }
      if (me.hideTitleBar) {
      } else {
        if (me.maximizeButton) {
          frame.showFrameComponent(me.maximizeButton, me.styleDisplay);
        }
        if (me.demaximizeButton) {
          frame.hideFrameComponent(me.demaximizeButton);
        }
      }
      me.restoreWindow({
        restorePosition: true,
        restoreMode: "maximize_mode",
        animation: me.animationEnabled,
        callback: model && model.callback ? model.callback : null,
        forceShowFrameComponents: me.animationEnabled && me.hideTitleBar,
        duration: model && model.duration ? model.duration : null,
        eventType: "demaximized",
      });
    };
    WindowEventHelper.prototype.handleOnResize = function () {
      var me = this;
      me.renderMaximizedMode({
        caller: "handleOnResize",
      });
    };
    WindowEventHelper.prototype.handleOnVirtualResize = function () {
      var me = this;
      me.renderMaximizedMode({
        caller: "handleOnResize",
        matchParent: true,
      });
    };
    WindowEventHelper.prototype.doMinimize = function (model) {
      var me = this;
      if (me.windowMode === "minimized" || me.windowMode === "minimizing") {
        return;
      }
      me.windowMode = "minimizing";
      var frame = me.frame;
      me.saveCurrentWindowStats("minimize_mode");
      frame.setResizable(false);
      me.renderMinimizedMode({
        animation: me.animationEnabled,
        callback: model && model.callback ? model.callback : null,
        duration: model && model.duration ? model.duration : null,
        toWidth: model && model.toWidth ? model.toWidth : null,
      });
    };
    WindowEventHelper.prototype.renderMinimizedMode = function (model) {
      var me = this;
      var frame = me.frame;
      var ri = me.loadWindowStats("minimize_mode");
      var from = me.getCurrentWindowStats();
      var to = me.getCurrentWindowStats();
      to.height = ri.titleBarHeight;
      if (model && model.toWidth) {
        to.width = model.toWidth;
      }
      var funcDoRender = function () {
        var forceSetSize = true;
        frame.setSize(to.width, to.height, forceSetSize);
        me.windowMode = "minimized";
        if (me.minimizeButton) {
          frame.hideFrameComponent(me.minimizeButton);
        }
        if (me.deminimizeButton) {
          frame.showFrameComponent(me.deminimizeButton, me.styleDisplay);
        }
        if (model.callback) {
          model.callback(me.frame, { eventType: "minimized" });
        }
        if (me.eventListeners["minimized"]) {
          me.eventListeners["minimized"](me.frame, { eventType: "minimized" });
        }
      };
      if (model && model.animation) {
        me.animateFrame({
          toAlpha: 1,
          duration: model.duration ? model.duration : me.animationDuration,
          frame,
          from,
          to,
          callback: funcDoRender,
        });
      } else {
        funcDoRender();
      }
    };
    WindowEventHelper.prototype.doDeminimize = function (model) {
      var me = this;
      var frame = me.frame;
      if (!me.hasWindowStats("minimize_mode")) {
        return;
      }
      if (me.minimizeButton) {
        frame.showFrameComponent(me.minimizeButton, me.styleDisplay);
      }
      if (me.deminimizeButton) {
        frame.hideFrameComponent(me.deminimizeButton);
      }
      me.restoreWindow({
        restorePosition: false,
        restoreMode: "minimize_mode",
        animation: me.animationEnabled,
        duration: model && model.duration ? model.duration : null,
        callback: model && model.callback ? model.callback : null,
        eventType: "deminimized",
      });
    };
    WindowEventHelper.prototype.doHide = function (model) {
      var me = this;
      if (me.windowMode === "hid" || me.windowMode === "hiding") {
        return;
      }
      me.windowMode = "hiding";
      var frame = me.frame;
      me.saveCurrentWindowStats("hide_mode");
      frame.setResizable(false);
      var arg = {
        animation: me.animationEnabled,
      };
      if (model) {
        mergeDeeply({ op: "overwrite-merge", object1: arg, object2: model });
      }
      me.renderHideMode(arg);
    };
    WindowEventHelper.prototype.renderHideMode = function (model) {
      var me = this;
      var frame = me.frame;
      var ri = me.loadWindowStats("hide_mode");
      var from = me.getCurrentWindowStats();
      var offset = { x: 0, y: 0 };
      var toElement = model.toElement;
      if (model.offset) {
        offset = model.offset;
      }
      var left = 0;
      var top = 0;
      {
        var align = model && model.align ? model.align : "LEFT_TOP";
        if (!align || CALIGN2.LEFT_TOP == align) {
          left = from.left;
          top = from.top;
        } else if (CALIGN2.HCENTER_TOP == align) {
          left = from.left + from.width / 2;
          top = from.top;
        } else if (CALIGN2.RIGHT_TOP == align) {
          left = from.left + from.width;
          top = from.top;
        } else if (CALIGN2.LEFT_VCENTER == align) {
          left = from.left;
          top = from.top + from.height / 2;
        } else if (CALIGN2.HCENTER_VCENTER == align) {
          left = from.left + from.width / 2;
          top = from.top + from.height / 2;
        } else if (CALIGN2.RIGHT_VCENTER == align) {
          left = from.left + from.width;
          top = from.top + from.height / 2;
        } else if (CALIGN2.LEFT_BOTTOM == align) {
          left = from.left;
          top = from.top + from.height;
        } else if (CALIGN2.HCENTER_BOTTOM == align) {
          left = from.left + from.width / 2;
          top = from.top + from.height;
        } else if (CALIGN2.RIGHT_BOTTOM == align) {
          left = from.left + from.width;
          top = from.top + from.height;
        } else if (align == "ABSOLUTE") {
          if (toElement) {
            var elementRect = toElement.getBoundingClientRect();
            if (me.isWindowManagerFixed) {
              left = elementRect.left;
              top = elementRect.top;
            } else {
              left = elementRect.left + window.pageXOffset;
              top = elementRect.top + window.pageYOffset;
            }
          } else {
            left = offset.x;
            top = offset.y;
          }
        }
      }
      var to = {
        left,
        top,
        width: 0,
        height: ri.titleBarHeight,
      };
      var funcDoRender = function () {
        var forceSetSize = true;
        frame.setSize(to.width, to.height, forceSetSize);
        me.windowMode = "hid";
        if (model && model.callback) {
          model.callback(me.frame, { eventType: "hid" });
        }
        if (me.eventListeners["hid"]) {
          me.eventListeners["hid"](me.frame, { eventType: "hid" });
        }
      };
      frame.hideAllVisibleFrameComponents();
      if (model && model.animation) {
        me.animateFrame({
          fromAlpha: model.silent ? 0 : 1,
          toAlpha: 0,
          ease: true,
          duration: model.duration ? model.duration : me.animationDuration,
          frame,
          from,
          to,
          callback: funcDoRender,
        });
      } else {
        funcDoRender();
      }
    };
    WindowEventHelper.prototype.doDehide = function (model) {
      var me = this;
      var frame = me.frame;
      if (!me.hasWindowStats("hide_mode")) {
        return;
      }
      me.restoreWindow({
        duration: model && model.duration ? model.duration : null,
        restorePosition: true,
        restoreMode: "hide_mode",
        animation: me.animationEnabled,
        forceShowFrameComponents: true,
        callback: model && model.callback ? model.callback : null,
        eventType: "dehided",
      });
    };
    WindowEventHelper.prototype.loadWindowStats = function (storeKeyName) {
      var me = this;
      return me.statsStore[storeKeyName];
    };
    WindowEventHelper.prototype.saveCurrentWindowStats = function (
      storeKeyName,
    ) {
      var me = this;
      var crrWindowStats = me.getCurrentWindowStats();
      if (me.hasWindowStats(storeKeyName)) {
        var storedStats = me.loadWindowStats(storeKeyName);
        var isWindowStatsUpdated = !me.windowStatsEquals(
          crrWindowStats,
          storedStats,
        );
        if (isWindowStatsUpdated) {
          me.statsStore[storeKeyName] = crrWindowStats;
        }
        return isWindowStatsUpdated;
      } else {
        me.statsStore[storeKeyName] = crrWindowStats;
        return true;
      }
    };
    WindowEventHelper.prototype.windowStatsEquals = function (
      windowStats1,
      windowStats2,
    ) {
      if (windowStats1 && windowStats2) {
        var result =
          JSON.stringify(windowStats1) === JSON.stringify(windowStats2);
        return result;
      } else {
        return false;
      }
    };
    WindowEventHelper.prototype.clearWindowStats = function (storeKeyName) {
      var me = this;
      me.statsStore[storeKeyName] = null;
    };
    WindowEventHelper.prototype.hasWindowStats = function (storeKeyName) {
      var me = this;
      return me.statsStore[storeKeyName];
    };
    WindowEventHelper.prototype.getCurrentWindowStats = function () {
      var me = this;
      var frame = me.frame;
      var __titleBarHeight = parseInt(frame.titleBar.style.height, 10);
      var __frameBorderWidthDefault = frame.frameBorderWidthDefault;
      var __frameBorderWidthFocused = frame.frameBorderWidthFocused;
      var __left = frame.getLeft();
      var __top = frame.getTop();
      var __width = frame.getWidth();
      var __height = frame.getHeight();
      var __resizable = frame.resizable;
      var __movable = frame.movable;
      return {
        left: __left,
        top: __top,
        width: __width,
        height: __height,
        titleBarHeight: __titleBarHeight,
        frameBorderWidthDefault: __frameBorderWidthDefault,
        frameBorderWidthFocused: __frameBorderWidthFocused,
        resizable: __resizable,
        movable: __movable,
      };
    };
    WindowEventHelper.prototype.restoreWindow = function (model) {
      var me = this;
      var frame = me.frame;
      var to = me.loadWindowStats(model.restoreMode);
      var crr = me.getCurrentWindowStats();
      frame.frameBorderWidthDefault = to.frameBorderWidthDefault;
      frame.frameBorderWidthFocused = to.frameBorderWidthFocused;
      frame.htmlElement.style.borderWidth = frame.frameBorderWidthFocused;
      var funcDoRender = function () {
        if (model && model.restorePosition == false) {
          to.left = crr.left;
          to.top = crr.top;
        }
        frame.setPosition(to.left, to.top);
        var force = true;
        frame.setSize(to.width, to.height, force);
        frame.setResizable(to.resizable);
        frame.setMovable(to.movable);
        me.clearWindowStats(model.restoreMode);
        if (me.keyListener) {
          window.removeEventListener("keydown", me.keyListener);
          if (frame.iframe) {
            frame.iframe.contentWindow.removeEventListener(
              "keydown",
              me.keyListener,
            );
          }
          me.keyListener = null;
        }
        me.windowMode = "default";
        if (model && model.forceShowFrameComponents) {
          frame.showAllVisibleFrameComponents();
        }
        frame.show();
        var eventType = "restored";
        if (model && model.eventType) {
          eventType = model.eventType;
        }
        if (model && model.callback) {
          model.callback(me.frame, { eventType });
        }
        if (me.eventListeners[eventType]) {
          me.eventListeners[eventType](me.frame, { eventType });
        }
      };
      if (model && model.animation) {
        me.animateFrame({
          duration: model.duration ? model.duration : me.animationDuration,
          frame,
          fromAlpha: 0,
          toAlpha: 1,
          from: crr,
          to,
          callback: funcDoRender,
        });
      } else {
        funcDoRender();
      }
      me.eventListenerHelper.removeEventListener(
        window,
        "resize",
        me.resizeListener,
      );
      if (me.matchParentResizeObserver) {
        me.matchParentResizeObserver.disconnect();
        me.matchParentResizeObserver = null;
      }
    };
    WindowEventHelper.prototype.animateFrame = function (model) {
      var me = this;
      var needRequestFocusAfterAnimation = false;
      var fromAlpha = !isNaN(model.fromAlpha) ? model.fromAlpha : 1;
      var from = model.from;
      var to = model.to;
      var animator = new CSimpleLayoutAnimator();
      animator.set(model.frame).setDuration(
        model.duration ? model.duration : me.animationDuration,
      ).fromPosition(from.left, from.top, "LEFT_TOP").toPosition(
        to.left,
        to.top,
        "LEFT_TOP",
      ).fromWidth(from.width).fromHeight(from.height).toWidth(to.width)
        .toHeight(to.height).fromAlpha(fromAlpha).toAlpha(
          model.toAlpha == 0 ? 0 : 1,
        ).ease(model.ease).start(0, needRequestFocusAfterAnimation).then(
          function (animatorObj) {
            model["callback"]();
          },
        );
    };
    WindowEventHelper.prototype.doCommand = function (cmd, opt) {
      var me = this;
      if (cmd === "maximize") {
        me._defaultFunctionMaximize(me.frame);
      }
      if (cmd === "demaximize") {
        me._defaultFunctionDemaximize(me.frame);
      }
      if (cmd === "restore") {
        me._defaultFunctionRestoreFromFullscreen(me.frame);
      }
      if (cmd === "minimize") {
        me._defaultFunctionMinimize(me.frame);
      }
      if (cmd === "deminimize") {
        me._defaultFunctionDeminimize(me.frame);
      }
      if (cmd === "hide") {
        me._defaultFunctionHide(me.frame);
      }
      if (cmd === "dehide") {
        me._defaultFunctionDehide(me.frame);
      }
    };
    WindowEventHelper.prototype._defaultFunctionMaximize = function (
      _frame,
      evt,
    ) {
      var me = this;
      var model = me.opts;
      var param = {
        fullScreen: model.maximizeWithoutTitleBar === true ? true : false,
        restoreKey: model.restoreKey ? model.restoreKey : "Escape",
        restoreDuration: model.restoreDuration,
      };
      if (this.maximizeParam) {
        mergeDeeply(
          {
            op: "overwrite-merge",
            object1: param,
            object2: this.maximizeParam,
          },
        );
      }
      _frame.control.doMaximize(param);
    };
    WindowEventHelper.prototype._defaultFunctionDemaximize = function (
      _frame,
      evt,
    ) {
      _frame.control.doDemaximize({});
    };
    WindowEventHelper.prototype._defaultFunctionRestoreFromFullscreen =
      function (_frame, evt) {
        var me = this;
        _frame.control.doDemaximize({
          duration: me.restoreDuration ? me.restoreDuration : null,
          callback: me.restoreCallback ? me.restoreCallback : null,
        });
      };
    WindowEventHelper.prototype._defaultFunctionMinimize = function (
      _frame,
      evt,
    ) {
      _frame.control.doMinimize(this.minimizeParam);
    };
    WindowEventHelper.prototype._defaultFunctionDeminimize = function (
      _frame,
      evt,
    ) {
      _frame.control.doDeminimize(this.deminimizeParam);
    };
    WindowEventHelper.prototype._defaultFunctionHide = function (_frame, evt) {
      var param = {
        align: "CENTER_BOTTOM",
      };
      if (this.hideParam) {
        param = this.hideParam;
      }
      _frame.control.doHide(param);
    };
    WindowEventHelper.prototype._defaultFunctionDehide = function (
      _frame,
      evt,
    ) {
      var me = this;
      _frame.control.doDehide(me.dehideParam);
    };
    WindowEventHelper.prototype.setupDefaultEvents = function () {
      var me = this;
      if (me.maximizeButton) {
        me.frame.on(
          me.maximizeButton,
          "click",
          me._defaultFunctionMaximize.bind(me),
        );
      }
      if (me.demaximizeButton) {
        me.frame.on(
          me.demaximizeButton,
          "click",
          me._defaultFunctionDemaximize.bind(me),
        );
      }
      if (me.minimizeButton) {
        me.frame.on(
          me.minimizeButton,
          "click",
          me._defaultFunctionMinimize.bind(me),
        );
      }
      if (me.deminimizeButton) {
        me.frame.on(
          me.deminimizeButton,
          "click",
          me._defaultFunctionDeminimize.bind(me),
        );
      }
      if (me.hideButton) {
        me.frame.on(me.hideButton, "click", me._defaultFunctionHide.bind(me));
      }
      if (me.hideButtons) {
        for (var key in me.hideButtons) {
          var hideButton = me.hideButtons[key];
          if (hideButton) {
            me.frame.on(hideButton, "click", me._defaultFunctionHide.bind(me));
          }
        }
      }
    };
    module.exports = WindowEventHelper;
  });

  // src/utils/Inherit.js
  var require_Inherit = __commonJS((exports, module) => {
    function inherit(subClass, baseClass) {
      function clazz() {
      }
      clazz.prototype = baseClass.prototype;
      subClass.prototype = new clazz();
      subClass.prototype.constructor = subClass;
      subClass.superConstructor = baseClass;
      subClass.superClass = baseClass.prototype;
    }
    module.exports = inherit;
  });

  // src/appearance/CButtonAppearance.js
  var require_CButtonAppearance = __commonJS((exports, module) => {
    function CTextButtonAppearance() {
      var crossMark0 = "\u274C";
      this.size = 14;
      this.width = null;
      this.height = null;
      this.borderRadius = 2;
      this.borderWidth = 0;
      this.borderColorDefault = "#aaaaaa";
      this.borderColorFocused = this.borderColorDefault;
      this.borderColorHovered = null;
      this.borderColorPressed = this.borderColorDefault;
      this.borderStyleDefault = "solid";
      this.borderStyleFocused = this.borderStyleDefault;
      this.borderStyleHovered = null;
      this.borderStylePressed = this.borderStyleDefault;
      this.backgroundBoxShadow = null;
      this.backgroundColorDefault = "transparent";
      this.backgroundColorFocused = this.backgroundColorDefault;
      this.backgroundColorHovered = null;
      this.backgroundColorPressed = this.backgroundColorDefault;
      this.caption = null;
      this.captionColorDefault = "white";
      this.captionColorFocused = this.captionColorDefault;
      this.captionColorHovered = null;
      this.captionColorPressed = this.captionColorDefault;
      this.captionShiftYpx = 0;
      this.captionFontRatio = 1;
    }
    module.exports = CTextButtonAppearance;
  });

  // src/appearance/CImageButtonAppearance.js
  var require_CImageButtonAppearance = __commonJS((exports, module) => {
    var inherit = require_Inherit();
    var CTextButtonAppearance = require_CButtonAppearance();
    inherit(CImageButtonAppearance, CTextButtonAppearance);
    function CImageButtonAppearance() {
      this.imageDefault = null;
      this.imageHovered = null;
      this.imagePressed = null;
      this.imageFocused = null;
      this.imageStore = {};
    }
    CImageButtonAppearance.prototype._setImage = function (src, width, height) {
      var me = this;
      var storedImgEle = me.imageStore[src];
      if (storedImgEle) {
        return storedImgEle;
      } else {
        var imgEle = document.createElement("img");
        imgEle.src = src;
        if (width && height) {
          var imgWidth = width;
          var imgHeight = height;
          var imgStyle = "margin:0px;padding:0px;width:" + imgWidth +
            "px;height:" + imgHeight + "px";
          imgEle.setAttribute("style", imgStyle);
        }
        me.imageStore[src] = imgEle;
        return imgEle;
      }
    };
    CImageButtonAppearance.prototype.setSrc = function (model) {
      var me = this;
      if (model.default) {
        me.imageDefault = me._setImage(
          model.default,
          model.width,
          model.height,
        );
      }
      if (model.hovered) {
        me.imageHovered = me._setImage(
          model.hovered,
          model.width,
          model.height,
        );
      }
      if (model.pressed) {
        me.imagePressed = me._setImage(
          model.pressed,
          model.width,
          model.height,
        );
      }
      if (model.focused) {
        me.imageFocused = me._setImage(
          model.focused,
          model.width,
          model.height,
        );
      }
    };
    module.exports = CImageButtonAppearance;
  });

  // src/appearance/CChildMenuAppearance.js
  var require_CChildMenuAppearance = __commonJS((exports, module) => {
    function CChildMenuAppearance(model) {
      this.childMenuHTML = "";
      this.childMenuWidth = 0;
      this.childMenuAlign = "LEFT";
      this.yOffset = 0;
      this.xOffset = 0;
    }
    module.exports = CChildMenuAppearance;
  });

  // src/appearance/CDomPartsBuilder.js
  var require_CDomPartsBuilder = __commonJS((exports, module) => {
    var mergeDeeply = require_merge_deeply();
    var CTextButtonAppearance = require_CButtonAppearance();
    var CImageButtonAppearance = require_CImageButtonAppearance();
    var CChildMenuAppearance = require_CChildMenuAppearance();
    function CDomPartsBuilder() {
    }
    CDomPartsBuilder.prototype.buildChildMenuAppearance = function (
      frameAppearance,
    ) {
      return new CChildMenuAppearance(frameAppearance);
    };
    CDomPartsBuilder.prototype.buildTextButtonAppearance = function (src) {
      if (src) {
        var result = mergeDeeply(
          { op: "clone", object1: src, concatArray: true },
        );
        return result;
      } else {
        return new CTextButtonAppearance();
      }
    };
    CDomPartsBuilder.prototype.buildImageButtonAppearance = function (src) {
      if (src) {
        var clonedImageButtonAppearance = mergeDeeply(
          { op: "clone", object1: src },
        );
        return clonedImageButtonAppearance;
      } else {
        return new CImageButtonAppearance();
      }
    };
    CDomPartsBuilder.prototype.buildButton = function (btnAppearance) {
      var me = this;
      return me.buildTextButton(btnAppearance);
    };
    CDomPartsBuilder.prototype.appendChildMenuTo = function (
      childMenuAppearance,
      parentEle,
    ) {
      var me = this;
      var ndiv = document.createElement("div");
      ndiv.classList.add("jsframe-child-menu");
      ndiv.innerHTML = childMenuAppearance.childMenuHTML;
      ndiv.style.position = "absolute";
      ndiv.style.pointerEvents = "none";
      ndiv.style.width = childMenuAppearance.childMenuWidth + "px";
      ndiv.style.display = "none";
      var posX = childMenuAppearance.xOffset;
      var posY = parseInt(parentEle.style.height, 10) +
        childMenuAppearance.yOffset + 2;
      if (childMenuAppearance.childMenuAlign === "LEFT") {
        ndiv.style.left = posX + "px";
      } else if (childMenuAppearance.childMenuAlign === "RIGHT") {
        ndiv.style.right = posX + "px";
      } else if (childMenuAppearance.childMenuAlign === "CENTER") {
        posX = -childMenuAppearance.childMenuWidth / 2 +
          parseInt(parentEle.style.height, 10) / 2;
        ndiv.style.left = posX + "px";
      }
      ndiv.style.top = posY + "px";
      ndiv.firstChild.style.pointerEvents = "auto";
      parentEle.appendChild(ndiv);
    };
    CDomPartsBuilder.prototype.buildTextButton = function (btnAppearance) {
      var size = btnAppearance.size;
      var width = size;
      var height = size;
      if (btnAppearance.width != null) {
        width = btnAppearance.width;
      }
      if (btnAppearance.height != null) {
        height = btnAppearance.height;
      }
      var divElement = document.createElement("div");
      var borderWidth = btnAppearance.borderWidth;
      var borderRadius = btnAppearance.borderRadius;
      var borderColorDefault = btnAppearance.borderColorDefault;
      var borderColorFocused = btnAppearance.borderColorFocused;
      var borderColorHovered = btnAppearance.borderColorHovered;
      var borderColorPressed = btnAppearance.borderColorPressed;
      var borderStyleDefault = btnAppearance.borderStyleDefault;
      var borderStyleFocused = btnAppearance.borderStyleFocused;
      var borderStyleHovered = btnAppearance.borderStyleHovered;
      var borderStylePressed = btnAppearance.borderStylePressed;
      var backgroundColorDefault = btnAppearance.backgroundColorDefault;
      var backgroundColorFocused = btnAppearance.backgroundColorFocused;
      var backgroundColorHovered = btnAppearance.backgroundColorHovered;
      var backgroundColorPressed = btnAppearance.backgroundColorPressed;
      var backgroundBoxShadow = btnAppearance.backgroundBoxShadow;
      var fa = btnAppearance.fa;
      var caption = btnAppearance.caption;
      var btnImageDefault = btnAppearance.imageDefault;
      var btnImageFocused = btnAppearance.imageFocused;
      var btnImageHovered = btnAppearance.imageHovered;
      var btnImagePressed = btnAppearance.imagePressed;
      if (btnImageDefault) {
        btnImageDefault.style.pointerEvents = "none";
      }
      if (btnImageFocused) {
        btnImageFocused.style.pointerEvents = "none";
      }
      if (btnImageHovered) {
        btnImageHovered.style.pointerEvents = "none";
      }
      if (btnImagePressed) {
        btnImagePressed.style.pointerEvents = "none";
      }
      var _captionColorDefault = btnAppearance.captionColorDefault;
      var captionColorFocused = btnAppearance.captionColorFocused;
      var captionColorHovered = btnAppearance.captionColorHovered;
      var captionColorPressed = btnAppearance.captionColorPressed;
      var captionShiftYpx = btnAppearance.captionShiftYpx;
      var captionFontRatio = btnAppearance.captionFontRatio;
      divElement._hasFrameFocus = false;
      divElement._isMouseDown = false;
      divElement.style.position = "absolute";
      divElement.style.top = "0px";
      divElement.style.left = "0px";
      divElement.style.width = width + "px";
      divElement.style.height = height + "px";
      if (btnAppearance.cursor) {
        divElement.style.cursor = btnAppearance.cursor;
      } else {
        divElement.style.cursor = "pointer";
      }
      divElement.style.margin = "0px";
      divElement.style.padding = "0px";
      divElement.style.boxSizing = "content-box";
      divElement.style.fontFamily = "sans-serif";
      divElement.onmousedown = function (e) {
        divElement._isMouseDown = true;
        divElement._handleFocusDrawing("onmousedown");
      };
      divElement.onmouseout = function (e) {
        divElement._isMouseDown = false;
        divElement._handleFocusDrawing("onmouseout");
      };
      divElement.onmouseover = function (e) {
        divElement._handleHoverDrawing();
      };
      divElement.onmouseup = function (e) {
        divElement._isMouseDown = false;
        divElement._handleFocusDrawing("onmouseup");
      };
      divElement._onTakeFocus = function () {
        divElement._hasFrameFocus = true;
        divElement._handleFocusDrawing("_onTakeFocus");
      };
      divElement._onReleaseFocus = function () {
        divElement._hasFrameFocus = false;
        divElement._handleFocusDrawing("_onReleaseFocus");
      };
      divElement._handleFocusDrawing = function (evtName) {
        if (divElement._hasFrameFocus) {
          if (divElement._isMouseDown) {
            divElement.style.borderColor = borderColorPressed;
            divElement.style.borderStyle = borderStylePressed;
            divElement.style.backgroundColor = backgroundColorPressed;
            divElement.style.color = captionColorPressed;
            if (btnImagePressed) {
              updateImage(btnImagePressed, divElement);
            }
          } else {
            divElement.style.borderColor = borderColorFocused;
            divElement.style.borderStyle = borderStyleFocused;
            divElement.style.backgroundColor = backgroundColorFocused;
            divElement.style.color = captionColorFocused;
            if (btnImageFocused) {
              updateImage(btnImageFocused, divElement);
            }
          }
        } else {
          if (divElement._isMouseDown) {
            divElement.style.borderColor = borderColorPressed;
            divElement.style.borderStyle = borderStylePressed;
            divElement.style.backgroundColor = backgroundColorPressed;
            divElement.style.color = captionColorPressed;
            if (btnImagePressed) {
              updateImage(btnImagePressed, divElement);
            }
          } else {
            divElement.style.borderColor = borderColorDefault;
            divElement.style.borderStyle = borderStyleDefault;
            divElement.style.backgroundColor = backgroundColorDefault;
            divElement.style.color = _captionColorDefault;
            if (btnImageDefault) {
              updateImage(btnImageDefault, divElement);
            }
          }
        }
      };
      divElement._handleHoverDrawing = function () {
        if (divElement._hasFrameFocus) {
        } else {
        }
        if (borderColorHovered) {
          divElement.style.borderColor = borderColorHovered;
        }
        if (borderStyleHovered) {
          divElement.style.borderStyle = borderStyleHovered;
        }
        if (backgroundColorHovered) {
          divElement.style.backgroundColor = backgroundColorHovered;
        }
        if (captionColorHovered) {
          divElement.style.color = captionColorHovered;
        }
        if (btnImageHovered) {
          updateImage(btnImageHovered, divElement);
        }
      };
      divElement.style.padding = "0px";
      divElement.style.textAlign = "center";
      divElement.style.fontSize = height * captionFontRatio + "px";
      divElement.style.lineHeight = height + "px";
      divElement.style.borderWidth = "1px";
      if (borderWidth != null) {
        divElement.style.borderWidth = borderWidth + "px";
      }
      if (backgroundBoxShadow != null) {
        divElement.style.boxShadow = backgroundBoxShadow;
      }
      divElement.style.borderRadius = borderRadius +
        parseInt(divElement.style.borderWidth) + "px";
      var childMode = true;
      if (childMode && btnImageDefault) {
        updateImage(btnImageDefault, divElement);
      } else if (childMode && caption) {
        var span = document.createElement("span");
        span.style.width = "100%";
        span.style.marginTop = captionShiftYpx + "px";
        span.style.display = "inline-block";
        span.style.textAlign = "center";
        span.style.fontFamily = "sans-serif";
        span.appendChild(document.createTextNode(caption));
        divElement.appendChild(span);
      } else if (childMode && fa) {
        var span = document.createElement("span");
        span.style.pointerEvents = "none";
        span.style.width = "100%";
        span.style.marginTop = captionShiftYpx + "px";
        span.style.display = "inline-block";
        span.style.textAlign = "center";
        span.style.fontFamily = "sans-serif";
        span.innerHTML = '<i class="' + fa + '"></i>';
        divElement.appendChild(span);
      } else if (!childMode && caption) {
        divElement.style.paddingTop = captionShiftYpx + "px";
        divElement.appendChild(document.createTextNode(caption));
      }
      divElement._handleFocusDrawing();
      return divElement;
    };
    function updateImage(image, parentElement) {
      var imgs = parentElement.querySelectorAll("img");
      if (parentElement.firstChild) {
        parentElement.insertBefore(image, parentElement.firstChild);
      } else {
        parentElement.appendChild(image);
      }
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (image !== img) {
          parentElement.removeChild(img);
        }
      }
    }
    module.exports = CDomPartsBuilder;
  });

  // src/appearance/CFrameComponent.js
  var require_CFrameComponent = __commonJS((exports, module) => {
    function CFrameComponent(id, htmlElement, x, y, align, extra) {
      var me = this;
      me.id = id;
      me.x = x;
      me.y = y;
      me.frame = null;
      me._focusTakingCallabck = null;
      me._focusReleasingCallabck = null;
      if (align) {
        me.frameComponentAlign = align;
      } else {
        me.frameComponentAlign = CALIGN.LEFT_TOP;
      }
      me.htmlElement = htmlElement;
      me.htmlElement.style.zIndex = 50;
      me.htmlElement.setAttribute("component-id", id);
      if (extra && extra.childMenu) {
        me.childMenu = extra.childMenu;
      } else if (htmlElement.querySelector(".jsframe-child-menu")) {
        me.childMenu = htmlElement.querySelector(".jsframe-child-menu");
      }
    }
    CFrameComponent.prototype.setFocusCallback = function (
      focusTakingCallback,
      focusReleasingCallback,
    ) {
      var me = this;
      me._focusTakingCallabck = focusTakingCallback;
      me._focusReleasingCallabck = focusReleasingCallback;
    };
    CFrameComponent.prototype.setFrame = function (frame) {
      var me = this;
      me.frame = frame;
      me.htmlElement.parentObject = frame;
      me.updateAlign();
    };
    CFrameComponent.prototype.updateAlign = function () {
      var me = this;
      var frameComponentAlign = me.frameComponentAlign;
      var frame = me.frame;
      var eleStyle = me.htmlElement.style;
      eleStyle.userSelect = "none";
      var x = me.x;
      var y = me.y;
      var frameWidth = frame.getWidth();
      var frameHeight = frame.getHeight();
      var eleStyleWidth = eleStyle.width;
      var eleStyleHeight = eleStyle.height;
      if (CALIGN.LEFT_TOP == frameComponentAlign) {
        eleStyle.left = x + "px";
        eleStyle.top = y + "px";
      } else if (CALIGN.HCENTER_TOP == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 +
          x + "px";
        eleStyle.top = y + "px";
      } else if (CALIGN.RIGHT_TOP == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) - parseInt(eleStyleWidth) + x +
          "px";
        eleStyle.top = y + "px";
      } else if (CALIGN.LEFT_VCENTER == frameComponentAlign) {
        eleStyle.left = x + "px";
        eleStyle.top = parseInt(frameHeight) / 2 -
          parseInt(eleStyleHeight) / 2 + y + "px";
      } else if (CALIGN.HCENTER_VCENTER == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 +
          x + "px";
        eleStyle.top = parseInt(frameHeight) / 2 -
          parseInt(eleStyleHeight) / 2 + y + "px";
      } else if (CALIGN.RIGHT_VCENTER == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) - parseInt(eleStyleWidth) + x +
          "px";
        eleStyle.top = parseInt(frameHeight) / 2 -
          parseInt(eleStyleHeight) / 2 + y + "px";
      } else if (CALIGN.LEFT_BOTTOM == frameComponentAlign) {
        eleStyle.left = x + "px";
        eleStyle.top = parseInt(frameHeight) - parseInt(eleStyleHeight) + y +
          "px";
      } else if (CALIGN.HCENTER_BOTTOM == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 +
          x + "px";
        eleStyle.top = parseInt(frameHeight) - parseInt(eleStyleHeight) + y +
          "px";
      } else if (CALIGN.RIGHT_BOTTOM == frameComponentAlign) {
        eleStyle.left = parseInt(frameWidth) - parseInt(eleStyleWidth) + x +
          "px";
        eleStyle.top = parseInt(frameHeight) - parseInt(eleStyleHeight) + y +
          "px";
      }
    };
    CFrameComponent.prototype.handleTakingFocus = function () {
      var me = this;
      if (me._focusTakingCallabck) {
        me._focusTakingCallabck();
      }
    };
    CFrameComponent.prototype.handleReleasingFocus = function () {
      var me = this;
      if (me._focusReleasingCallabck) {
        me._focusReleasingCallabck();
      }
    };
    module.exports = CFrameComponent;
  });

  // src/appearance/CFrameAppearance.js
  var require_CFrameAppearance = __commonJS((exports, module) => {
    var CDomPartsBuilder = require_CDomPartsBuilder();
    var CFrameComponent = require_CFrameComponent();
    function CFrameAppearance() {
      var me = this;
      this.showTitleBar = true;
      this.showCloseButton = true;
      this.titleBarCaption = "";
      this.titleBarCaptionFontSize = "12px";
      this.titleBarCaptionFontWeight = "bold";
      this.titleBarHeight = "24px";
      this.useIframe = false;
      this.useFrame = true;
      this.titleBarClassNameDefault = null;
      this.titleBarClassNameFocused = null;
      this.setUseIFrame = function (value) {
        me.useIframe = value;
        me.useFrame = !value;
        return me;
      };
      this.titleBarCaptionLeftMargin = "5px";
      this.titleBarColorDefault = null;
      this.titleBarColorFocused = null;
      this.titleBarCaptionColorDefault = "";
      this.titleBarCaptionColorFocused = "";
      this.titleBarCaptionTextShadow = "0 1px 0 rgba(255,255,255,.7)";
      this.titleBarCaptionTextAlign = "center";
      this.titleBarBorderBottomDefault = "1px solid rgba(0,0,0,0.2)";
      this.titleBarBorderBottomFocused = null;
      this.frameBorderRadius = "6px";
      this.frameBorderWidthDefault = "1px";
      this.frameBorderWidthFocused = this.frameBorderWidthDefault;
      this.frameBorderColorDefault = "rgba(1, 1, 1, 0.2)";
      this.frameBorderColorFocused = this.frameBorderColorDefault;
      this.frameBorderStyle = "solid";
      this.frameBoxShadow = "2px 3px 16px rgba(0,0,0,.6)";
      this.frameBackgroundColor = "transparent";
      this._partsBuilder = null;
      this.frameComponents = [];
      this.frameHeightAdjust = 1;
      this.resizeAreaWidth = 20;
      this.resizeAreaHeight = 20;
      this.resizeAreaOffset = 0;
      this.resizeAreaVisible = false;
      this.getFrameInnerBorderRadius = function (ref, hasFocus) {
        if (!ref) {
          return null;
        }
        if (hasFocus) {
          return {
            frameAppearance: me,
            innerBorderRadius: parseInt(ref.frameBorderRadius, 10) -
              parseInt(ref.frameBorderWidthFocused, 10) + "px",
          };
        }
        return {
          frameAppearance: me,
          innerBorderRadius: parseInt(ref.frameBorderRadius, 10) -
            parseInt(ref.frameBorderWidthDefault, 10) + "px",
        };
      };
      this.onInitialize = function () {
        if (me.showCloseButton) {
          var partsBuilder = me.getPartsBuilder(),
            crossMark0 = "\u274C",
            crossMark1 = "\u2716",
            crossMark2 = "\u274E";
          var btnAppearance = partsBuilder.buildTextButtonAppearance();
          btnAppearance.size = 14;
          btnAppearance.captionShiftYpx = 0;
          btnAppearance.captionFontRatio = 1;
          btnAppearance.borderRadius = 2;
          btnAppearance.backgroundColorPressed = "transparent";
          btnAppearance.backgroundColorDefault = "transparent";
          btnAppearance.caption = crossMark1;
          btnAppearance.captionColorDefault = "gray";
          btnAppearance.captionColorFocused = "gray";
          btnAppearance.captionColorHovered = "silver";
          btnAppearance.captionColorPressed = "black";
          btnAppearance.borderWidth = 0;
          btnAppearance.borderColorDefault = "#aaaaaa";
          btnAppearance.borderStyle = "solid";
          var closeBtnEle = partsBuilder.buildTextButton(btnAppearance);
          var eleLeft = -10;
          var eleTop = -18;
          var eleAlign = "RIGHT_TOP";
          var frameComponent = me.addFrameComponent(
            "closeButton",
            closeBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
      };
      this.onTitleBarStyleInitialize = function () {
      };
    }
    CFrameAppearance.prototype.getPartsBuilder = function () {
      var me = this;
      if (me._partsBuilder === null) {
        me._partsBuilder = new CDomPartsBuilder();
      }
      return me._partsBuilder;
    };
    CFrameAppearance.prototype.initialize = function () {
      var me = this;
      me.onInitialize();
    };
    CFrameAppearance.prototype.addFrameComponent = function (
      id,
      myDomElement,
      x,
      y,
      align,
      extra,
    ) {
      var frameComponent = new CFrameComponent(
        id,
        myDomElement,
        x,
        y,
        align,
        extra,
      );
      if (myDomElement._onTakeFocus && myDomElement._onReleaseFocus) {
        frameComponent.setFocusCallback(
          myDomElement._onTakeFocus,
          myDomElement._onReleaseFocus,
        );
      }
      this.frameComponents.push(frameComponent);
      return frameComponent;
    };
    module.exports = CFrameAppearance;
  });

  // src/presets/appearance/PresetStyleYosemite.css
  var require_PresetStyleYosemite = __commonJS((exports, module) => {
    module.exports =
      ".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n";
  });

  // src/utils/ObjectAssigner.js
  var require_ObjectAssigner = __commonJS((exports, module) => {
    var _typeof =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function (obj) {
          return typeof obj;
        }
        : function (obj) {
          return obj && typeof Symbol === "function" &&
              obj.constructor === Symbol && obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function isObject(item) {
      return item && (typeof item === "undefined"
            ? "undefined"
            : _typeof(item)) === "object" &&
        !Array.isArray(item);
    }
    function objectAssign(target) {
      for (
        var _len = arguments.length,
          sources = Array(
            _len > 1
              ? _len - 1
              : 0,
          ),
          _key = 1;
        _key < _len;
        _key++
      ) {
        sources[_key - 1] = arguments[_key];
      }
      if (!sources.length) {
        return target;
      }
      var source = sources.shift();
      if (isObject(target) && isObject(source)) {
        for (var key in source) {
          if (isObject(source[key])) {
            if (!target[key]) {
              Object.assign(target, _defineProperty({}, key, {}));
            }
            objectAssign(target[key], source[key]);
          } else {
            Object.assign(target, _defineProperty({}, key, source[key]));
          }
        }
      }
      return objectAssign.apply(void 0, [target].concat(sources));
    }
    module.exports.objectAssign = objectAssign;
  });

  // src/presets/appearance/PresetStyleYosemite.js
  var require_PresetStyleYosemite2 = __commonJS((exports, module) => {
    require_PresetStyleYosemite();
    var ObjectAssigner = require_ObjectAssigner();
    function getStyle(fApr, userParam) {
      var srcParam = {
        titleBar: {
          greenButton: "maximize",
        },
      };
      var param = srcParam;
      if (userParam) {
        ObjectAssigner.objectAssign(srcParam, userParam);
      }
      fApr.showTitleBar = true;
      fApr.showCloseButton = true;
      fApr.titleBarCaptionFontSize = "11px";
      fApr.titleBarCaptionFontWeight = "normal";
      fApr.titleBarCaptionLeftMargin = null;
      fApr.titleBarCaptionColorDefault = "#4d494d";
      fApr.titleBarCaptionColorFocused = "#4d494d";
      fApr.titleBarHeight = "26px";
      fApr.titleBarColorDefault = null;
      fApr.titleBarColorFocused = null;
      fApr.titleBarBorderBottomDefault = "1px solid #b1aeb1";
      fApr.titleBarBorderBottomFocused = fApr.titleBarBorderBottomDefault;
      fApr.frameBorderRadius = "6px";
      fApr.frameBorderWidthDefault = "1px";
      fApr.frameBorderWidthFocused = "1px";
      fApr.frameBorderColorDefault = "#acacac";
      fApr.frameBorderColorFocused = "#acacac";
      fApr.frameBorderStyle = "solid";
      fApr.frameBoxShadow = "0px 0px 20px rgba(0, 0, 0, 0.3)";
      fApr.frameBackgroundColor = "transparent";
      fApr.frameComponents = new Array();
      fApr.getTitleBarStyle = function () {
        if (fApr.focusedFrameOnly) {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-yosemite-focused",
            titleBarClassNameFocused: "jsframe-preset-style-yosemite-focused",
          };
        } else {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-yosemite-default",
            titleBarClassNameFocused: "jsframe-preset-style-yosemite-focused",
          };
        }
      };
      fApr.onInitialize = function () {
        var partsBuilder = fApr.getPartsBuilder();
        var img_data_close_hovered =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAWElEQVQoU2NkIBIwEqmOAa6wgZWlH6Sp4fefQjCNxkdRyMjAUPCf4f8CkEJGBsaE/wwME2AaUaxuYGWeD1IAUgjS0PD7byLMaaQrBLmJKKuJ9gyhYCI6HAGlFDALf9s7eQAAAABJRU5ErkJggg==";
        var img_data_maximize_hovered =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVElEQVQoU2NkIBIwoqvjixFoAIl9WvIBTMMAhkLeGP79IMnPSz46kq8QZN1/hv/2IBMYGRgMQPR/BoYLED7jQZAzwFYTrRDZLdRxI7KJRAcPrvAHAATYKgvLH0fAAAAAAElFTkSuQmCC";
        if (param.titleBar.greenButton === "fullscreen") {
          img_data_maximize_hovered =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAZElEQVQoU2NkIBIwEqmOAUWhQIKAwL8///czMDAYwAz4tOQjWA1cIUjRhwUfPqArxlDIF8N/nomF0RFdMTaF/xkYGC6gK/605KMhitV8MfwghSCAohhkAy6FKIphniIvePCFKQDzGzsLS+7n2AAAAABJRU5ErkJggg==";
        }
        var img_data_demaximize_hovered =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAiUlEQVQoU2NkwAIEogQMPiz7cAFZihGbQt4Y/v0MjIwLPy/+sAAmj1MhIwODw39GxkSYYrwKQabBFGNVyBfL1///P6MBzFrmf4yFjCCH/2X63w93C+P/C58WfypEdzvYRN5YgQTG///ng61iYDjweclHR6wKkRUTVAhTzPD/fzxeE2FWYQtskBwAKwQ7tVjAL4MAAAAASUVORK5CYII=";
        var img_data_minimize_hovered =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMUlEQVQoU2NkIBIwEqmOgUYKa7w4Ghj+M9hjdQYjw8GWbT8awFYTrZAYD9HIM8RYDQBsEAwLkq4IAgAAAABJRU5ErkJggg==";
        var img_data_1dot_transparent =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";
        var img_width = 10;
        var img_height = 10;
        var img_style = "margin:0px;padding:0px;width:" + img_width +
          "px;height:" + img_height + "px";
        var imageMaximize = document.createElement("img");
        imageMaximize.src = img_data_maximize_hovered;
        imageMaximize.setAttribute("style", img_style);
        var imageDemaximize = document.createElement("img");
        imageDemaximize.src = img_data_demaximize_hovered;
        imageDemaximize.setAttribute("style", img_style);
        var imageMinimize = document.createElement("img");
        imageMinimize.src = img_data_minimize_hovered;
        imageMinimize.setAttribute("style", img_style);
        var imageClose = document.createElement("img");
        imageClose.src = img_data_close_hovered;
        imageClose.setAttribute("style", img_style);
        var imgTransparent = document.createElement("img");
        imgTransparent.src = img_data_1dot_transparent;
        imgTransparent.setAttribute(
          "style",
          "margin:0px;padding:0px;width:6px;height:6px",
        );
        {
          var cbApr = partsBuilder.buildImageButtonAppearance();
          cbApr.imageDefault = imgTransparent;
          cbApr.imageHovered = imageClose;
          cbApr.imagePressed = imageClose;
          cbApr.imageFocused = imgTransparent;
          cbApr.size = 10;
          cbApr.borderRadius = 5;
          cbApr.borderWidth = 1;
          cbApr.borderColorDefault = "#c6c6c6";
          cbApr.borderColorFocused = "#d3524e";
          cbApr.borderColorHovered = cbApr.borderColorFocused;
          cbApr.borderColorPressed = "#e64842";
          cbApr.borderStyleDefault = "solid";
          cbApr.borderStyleFocused = cbApr.borderStyleDefault;
          cbApr.borderStyleHovered = cbApr.borderStyleDefault;
          cbApr.borderStylePressed = cbApr.borderStyleDefault;
          cbApr.backgroundColorDefault = "#d0d0d0";
          cbApr.backgroundColorFocused = "#fc615c";
          cbApr.backgroundColorHovered = cbApr.backgroundColorFocused;
          cbApr.backgroundColorPressed = cbApr.backgroundColorDefault;
          cbApr.setSrc({
            default: img_data_1dot_transparent,
            focused: img_data_1dot_transparent,
            hovered: img_data_close_hovered,
            pressed: img_data_close_hovered,
          });
          var closeBtnEle = partsBuilder.buildButton(cbApr);
          var eleLeft = 8;
          var eleTop = -19;
          var eleAlign = "LEFT_TOP";
          fApr.addFrameComponent(
            param.closeButtonName || "closeButton",
            closeBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
          var minBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
          minBtnApr.borderColorDefault = "#c6c6c6";
          minBtnApr.borderColorFocused = "#e6b347";
          minBtnApr.borderColorHovered = minBtnApr.borderColorFocused;
          minBtnApr.borderColorPressed = "#e1a12d";
          minBtnApr.backgroundColorDefault = "#d0d0d0";
          minBtnApr.backgroundColorFocused = "#fdbe40";
          minBtnApr.backgroundColorHovered = minBtnApr.backgroundColorFocused;
          minBtnApr.backgroundColorPressed = minBtnApr.backgroundColorDefault;
          minBtnApr.imageDefault = imgTransparent;
          minBtnApr.imageHovered = imageMinimize;
          minBtnApr.imagePressed = imageMinimize;
          minBtnApr.imageFocused = imgTransparent;
          var minBtnEle = partsBuilder.buildButton(minBtnApr);
          var deminimizeBtnEle = partsBuilder.buildButton(minBtnApr);
          deminimizeBtnEle.style.display = "none";
          var eleLeft = 28;
          var eleTop = -19;
          var eleAlign = "LEFT_TOP";
          fApr.addFrameComponent(
            "minimizeButton",
            minBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
          fApr.addFrameComponent(
            "deminimizeButton",
            deminimizeBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
          var maxBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
          maxBtnApr.borderColorDefault = "#c6c6c6";
          maxBtnApr.borderColorFocused = "#67b657";
          maxBtnApr.borderColorHovered = maxBtnApr.borderColorFocused;
          maxBtnApr.borderColorPressed = "#00af38";
          maxBtnApr.backgroundColorDefault = "#d0d0d0";
          maxBtnApr.backgroundColorFocused = "#34ca49";
          maxBtnApr.backgroundColorHovered = maxBtnApr.backgroundColorFocused;
          maxBtnApr.backgroundColorPressed = maxBtnApr.backgroundColorDefault;
          maxBtnApr.imageDefault = imgTransparent;
          maxBtnApr.imageHovered = imageMaximize;
          maxBtnApr.imagePressed = imageMaximize;
          maxBtnApr.imageFocused = imgTransparent;
          var zoomBtnEle = partsBuilder.buildButton(maxBtnApr);
          var demaxBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
          demaxBtnApr.borderColorDefault = "#c6c6c6";
          demaxBtnApr.borderColorFocused = "#67b657";
          demaxBtnApr.borderColorHovered = demaxBtnApr.borderColorFocused;
          demaxBtnApr.borderColorPressed = "#00af38";
          demaxBtnApr.backgroundColorDefault = "#d0d0d0";
          demaxBtnApr.backgroundColorFocused = "#34ca49";
          demaxBtnApr.backgroundColorHovered =
            demaxBtnApr.backgroundColorFocused;
          demaxBtnApr.backgroundColorPressed =
            demaxBtnApr.backgroundColorDefault;
          demaxBtnApr.imageDefault = imgTransparent;
          demaxBtnApr.imageHovered = imageDemaximize;
          demaxBtnApr.imagePressed = imageDemaximize;
          demaxBtnApr.imageFocused = imgTransparent;
          var demaxBtnEle = partsBuilder.buildButton(demaxBtnApr);
          demaxBtnEle.style.display = "none";
          var eleLeft = 48;
          var eleTop = -19;
          var eleAlign = "LEFT_TOP";
          fApr.addFrameComponent(
            "dezoomButton",
            demaxBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
          fApr.addFrameComponent(
            "zoomButton",
            zoomBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
      };
      return fApr;
    }
    module.exports.getStyle = getStyle;
  });

  // src/presets/appearance/PresetStyleRedstone.css
  var require_PresetStyleRedstone = __commonJS((exports, module) => {
    module.exports =
      ".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n";
  });

  // src/presets/appearance/PresetStyleRedstone.js
  var require_PresetStyleRedstone2 = __commonJS((exports, module) => {
    require_PresetStyleRedstone();
    function getStyle(fApr) {
      fApr.showTitleBar = true;
      fApr.showCloseButton = true;
      fApr.titleBarCaptionFontSize = "12px";
      fApr.titleBarCaptionFontWeight = "normal";
      fApr.titleBarCaptionLeftMargin = "10px";
      fApr.titleBarCaptionColorDefault = "#9b9a9b";
      fApr.titleBarCaptionColorFocused = "#4d494d";
      fApr.titleBarHeight = "30px";
      fApr.titleBarColorDefault = null;
      fApr.titleBarColorFocused = null;
      fApr.titleBarBorderBottomDefault = "solid 1px #aaaaaa";
      fApr.titleBarBorderBottomFocused = "solid 1px #1883d7";
      fApr.frameBorderRadius = "0px";
      fApr.frameBorderWidthDefault = "1px";
      fApr.frameBorderWidthFocused = "1px";
      fApr.frameBorderColorDefault = "#aaaaaa";
      fApr.frameBorderColorFocused = "#1883d7";
      fApr.frameBorderStyle = "solid";
      fApr.frameBoxShadow = null;
      fApr.frameBackgroundColor = "transparent";
      fApr.frameComponents = new Array();
      fApr.frameHeightAdjust = 0;
      fApr.getTitleBarStyle = function () {
        if (fApr.focusedFrameOnly) {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-redstone-focused",
            titleBarClassNameFocused: "jsframe-preset-style-redstone-focused",
          };
        } else {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-redstone-default",
            titleBarClassNameFocused: "jsframe-preset-style-redstone-focused",
          };
        }
      };
      fApr.onInitialize = function () {
        var partsBuilder = fApr.getPartsBuilder();
        {
          var CROSS_MARK = "\u2573";
          var cbApr = partsBuilder.buildTextButtonAppearance();
          cbApr.width = 45;
          cbApr.height = 28;
          cbApr.borderRadius = 0;
          cbApr.borderWidth = 0;
          cbApr.borderColorDefault = "#c6c6c6";
          cbApr.borderColorFocused = "#fc615c";
          cbApr.borderColorHovered = cbApr.borderColorFocused;
          cbApr.borderColorPressed = "#e64842";
          cbApr.borderStyleDefault = "solid";
          cbApr.borderStyleFocused = cbApr.borderStyleDefault;
          cbApr.borderStyleHovered = cbApr.borderStyleDefault;
          cbApr.borderStylePressed = cbApr.borderStyleDefault;
          cbApr.backgroundColorDefault = "white";
          cbApr.backgroundColorFocused = "white";
          cbApr.backgroundColorHovered = "#e81123";
          cbApr.backgroundColorPressed = "#f1707a";
          cbApr.caption = CROSS_MARK;
          cbApr.captionColorDefault = "#9b9a9b";
          cbApr.captionColorFocused = "black";
          cbApr.captionColorHovered = "white";
          cbApr.captionColorPressed = "white";
          cbApr.captionShiftYpx = 1;
          cbApr.captionFontRatio = 0.6;
          var closeBtnEle = partsBuilder.buildTextButton(cbApr);
          var eleLeft = 0;
          var eleTop = -parseInt(fApr.titleBarHeight);
          var eleAlign = "RIGHT_TOP";
          fApr.addFrameComponent(
            "closeButton",
            closeBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
        {
          var MAXIMIZE_MARK = "\u2610";
          var maxApr = partsBuilder.buildTextButtonAppearance();
          maxApr.width = 45;
          maxApr.height = 28;
          maxApr.borderRadius = 0;
          maxApr.borderWidth = 0;
          maxApr.borderColorDefault = "#c6c6c6";
          maxApr.borderColorFocused = "#fc615c";
          maxApr.borderColorHovered = maxApr.borderColorFocused;
          maxApr.borderColorPressed = "#e64842";
          maxApr.borderStyleDefault = "solid";
          maxApr.borderStyleFocused = maxApr.borderStyleDefault;
          maxApr.borderStyleHovered = maxApr.borderStyleDefault;
          maxApr.borderStylePressed = maxApr.borderStyleDefault;
          maxApr.backgroundColorDefault = "white";
          maxApr.backgroundColorFocused = "white";
          maxApr.backgroundColorHovered = "#e5e5e5";
          maxApr.backgroundColorPressed = "#cccccc";
          maxApr.caption = MAXIMIZE_MARK;
          maxApr.captionColorDefault = "#9b9a9b";
          maxApr.captionColorFocused = "black";
          maxApr.captionColorHovered = "black";
          maxApr.captionColorPressed = "black";
          maxApr.captionShiftYpx = 1;
          maxApr.captionFontRatio = 0.55;
          var maxBtnEle = partsBuilder.buildTextButton(maxApr);
          var eleLeft = -46;
          var eleTop = -parseInt(fApr.titleBarHeight);
          var eleAlign = "RIGHT_TOP";
          fApr.addFrameComponent(
            "maximizeButton",
            maxBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
        {
          var MINIMIZE_MARK = "\uFF3F";
          var minApr = partsBuilder.buildTextButtonAppearance();
          minApr.width = 45;
          minApr.height = 28;
          minApr.borderRadius = 0;
          minApr.borderWidth = 0;
          minApr.borderColorDefault = "#c6c6c6";
          minApr.borderColorFocused = "#fc615c";
          minApr.borderColorHovered = minApr.borderColorFocused;
          minApr.borderColorPressed = "#e64842";
          minApr.borderStyleDefault = "solid";
          minApr.borderStyleFocused = minApr.borderStyleDefault;
          minApr.borderStyleHovered = minApr.borderStyleDefault;
          minApr.borderStylePressed = minApr.borderStyleDefault;
          minApr.backgroundColorDefault = "white";
          minApr.backgroundColorFocused = "white";
          minApr.backgroundColorHovered = "#e5e5e5";
          minApr.backgroundColorPressed = "#cccccc";
          minApr.caption = MINIMIZE_MARK;
          minApr.captionColorDefault = "#9b9a9b";
          minApr.captionColorFocused = "black";
          minApr.captionColorHovered = "black";
          minApr.captionColorPressed = "black";
          minApr.captionShiftYpx = -2;
          minApr.captionFontRatio = 0.3;
          var minBtnEle = partsBuilder.buildTextButton(minApr);
          var eleLeft = -92;
          var eleTop = -parseInt(fApr.titleBarHeight);
          var eleAlign = "RIGHT_TOP";
          fApr.addFrameComponent(
            "minimizeButton",
            minBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
        {
          var deminApr = partsBuilder.buildTextButtonAppearance();
          deminApr.width = 45;
          deminApr.height = 28;
          deminApr.borderRadius = 0;
          deminApr.borderWidth = 0;
          deminApr.borderColorDefault = "#c6c6c6";
          deminApr.borderColorFocused = "#fc615c";
          deminApr.borderColorHovered = deminApr.borderColorFocused;
          deminApr.borderColorPressed = "#e64842";
          deminApr.borderStyleDefault = "solid";
          deminApr.borderStyleFocused = deminApr.borderStyleDefault;
          deminApr.borderStyleHovered = deminApr.borderStyleDefault;
          deminApr.borderStylePressed = deminApr.borderStyleDefault;
          deminApr.backgroundColorDefault = "white";
          deminApr.backgroundColorFocused = "white";
          deminApr.backgroundColorHovered = "#e5e5e5";
          deminApr.backgroundColorPressed = "#cccccc";
          deminApr.caption = "\u25A3";
          deminApr.captionColorDefault = "#9b9a9b";
          deminApr.captionColorFocused = "black";
          deminApr.captionColorHovered = "black";
          deminApr.captionColorPressed = "black";
          deminApr.captionShiftYpx = 1;
          deminApr.captionFontRatio = 0.6;
          var deminBtnEle = partsBuilder.buildTextButton(deminApr);
          var eleLeft = -92;
          var eleTop = -parseInt(fApr.titleBarHeight);
          var eleAlign = "RIGHT_TOP";
          deminBtnEle.style.display = "none";
          fApr.addFrameComponent(
            "deminimizeButton",
            deminBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
        {
          var RESTORE_MARK = "\u274F";
          var rbApr = partsBuilder.buildTextButtonAppearance();
          rbApr.width = 45;
          rbApr.height = 28;
          rbApr.borderRadius = 0;
          rbApr.borderWidth = 0;
          rbApr.borderColorDefault = "#c6c6c6";
          rbApr.borderColorFocused = "#fc615c";
          rbApr.borderColorHovered = rbApr.borderColorFocused;
          rbApr.borderColorPressed = "#e64842";
          rbApr.borderStyleDefault = "solid";
          rbApr.borderStyleFocused = rbApr.borderStyleDefault;
          rbApr.borderStyleHovered = rbApr.borderStyleDefault;
          rbApr.borderStylePressed = rbApr.borderStyleDefault;
          rbApr.backgroundColorDefault = "white";
          rbApr.backgroundColorFocused = "white";
          rbApr.backgroundColorHovered = "#e5e5e5";
          rbApr.backgroundColorPressed = "#cccccc";
          rbApr.caption = RESTORE_MARK;
          rbApr.captionColorDefault = "#9b9a9b";
          rbApr.captionColorFocused = "black";
          rbApr.captionColorHovered = "black";
          rbApr.captionColorPressed = "black";
          rbApr.captionShiftYpx = 1;
          rbApr.captionFontRatio = 0.55;
          var restoreBtnEle = partsBuilder.buildTextButton(rbApr);
          var eleLeft = -46;
          var eleTop = -parseInt(fApr.titleBarHeight);
          var eleAlign = "RIGHT_TOP";
          restoreBtnEle.style.display = "none";
          fApr.addFrameComponent(
            "restoreButton",
            restoreBtnEle,
            eleLeft,
            eleTop,
            eleAlign,
          );
        }
      };
      return fApr;
    }
    module.exports.getStyle = getStyle;
  });

  // src/presets/appearance/PresetStylePopup.css
  var require_PresetStylePopup = __commonJS((exports, module) => {
    module.exports =
      ".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n";
  });

  // src/presets/appearance/PresetStylePopup.js
  var require_PresetStylePopup2 = __commonJS((exports, module) => {
    require_PresetStylePopup();
    function getStyle(fApr) {
      fApr.showTitleBar = false;
      fApr.showCloseButton = true;
      fApr.titleBarCaptionFontSize = "12px";
      fApr.titleBarCaptionFontWeight = "normal";
      fApr.titleBarCaptionLeftMargin = "10px";
      fApr.titleBarCaptionColorDefault = "#4d494d";
      fApr.titleBarCaptionColorFocused = "#4d494d";
      fApr.titleBarHeight = "5px";
      fApr.titleBarColorDefault = "white";
      fApr.titleBarColorFocused = "white";
      fApr.titleBarBorderBottomDefault = null;
      fApr.titleBarBorderBottomFocused = null;
      fApr.frameBorderRadius = "6px";
      fApr.frameBorderWidthDefault = "1px";
      fApr.frameBorderWidthFocused = "1px";
      fApr.frameBorderColorDefault = "#aaaaaa";
      fApr.frameBorderColorFocused = "#aaaaaa";
      fApr.frameBorderStyle = "solid";
      fApr.frameBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";
      fApr.frameBackgroundColor = "white";
      fApr.frameComponents = new Array();
      fApr.frameHeightAdjust = 2;
      fApr.getTitleBarStyle = function () {
        if (fApr.focusedFrameOnly) {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-popup-focused",
            titleBarClassNameFocused: "jsframe-preset-style-popup-focused",
          };
        } else {
          return {
            titleBarClassNameDefault: "jsframe-preset-style-popup-default",
            titleBarClassNameFocused: "jsframe-preset-style-popup-focused",
          };
        }
      };
      fApr.onInitialize = function () {
        var partsBuilder = fApr.getPartsBuilder();
        var crossMark0 = "\u274C";
        var crossMark1 = "\u2716";
        var crossMark2 = "\u274E";
        var CROSS_MARK = crossMark1;
        var cbApr = partsBuilder.buildTextButtonAppearance();
        cbApr.width = 20;
        cbApr.height = 20;
        cbApr.borderRadius = 10;
        cbApr.borderWidth = 1;
        cbApr.borderColorDefault = "#cccccc";
        cbApr.borderColorFocused = "#cccccc";
        cbApr.borderColorHovered = "#dddddd";
        cbApr.borderColorPressed = "#eeeeee";
        cbApr.borderStyleDefault = "solid";
        cbApr.borderStyleFocused = cbApr.borderStyleDefault;
        cbApr.borderStyleHovered = cbApr.borderStyleDefault;
        cbApr.borderStylePressed = cbApr.borderStyleDefault;
        cbApr.backgroundColorDefault = "white";
        cbApr.backgroundColorFocused = "white";
        cbApr.backgroundColorHovered = "#eeeeee";
        cbApr.backgroundColorPressed = "#dddddd";
        cbApr.backgroundBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";
        cbApr.caption = CROSS_MARK;
        cbApr.captionColorDefault = "black";
        cbApr.captionColorFocused = "black";
        cbApr.captionColorHovered = "white";
        cbApr.captionColorPressed = "white";
        cbApr.captionShiftYpx = 1;
        cbApr.captionFontRatio = 0.6;
        var closeBtnEle = partsBuilder.buildTextButton(cbApr);
        var eleLeft = 10;
        var eleTop = -6 - parseInt(fApr.titleBarHeight);
        var eleAlign = "RIGHT_TOP";
        fApr.addFrameComponent(
          "closeButton",
          closeBtnEle,
          eleLeft,
          eleTop,
          eleAlign,
        );
      };
      return fApr;
    }
    module.exports.getStyle = getStyle;
  });

  // src/presets/appearance/PresetStyleToast.js
  var require_PresetStyleToast = __commonJS((exports, module) => {
    function getStyle(fApr) {
      fApr.showTitleBar = false;
      fApr.showCloseButton = true;
      fApr.titleBarCaptionFontSize = "0px";
      fApr.titleBarCaptionFontWeight = "normal";
      fApr.titleBarCaptionLeftMargin = "0px";
      fApr.titleBarCaptionColorDefault = "transparent";
      fApr.titleBarCaptionColorFocused = "transparent";
      fApr.titleBarHeight = "0px";
      fApr.titleBarColorDefault = "transparent";
      fApr.titleBarColorFocused = "transparent";
      fApr.titleBarBorderBottomDefault = null;
      fApr.titleBarBorderBottomFocused = null;
      fApr.frameBorderRadius = "10px";
      fApr.frameBorderWidthDefault = "0px";
      fApr.frameBorderWidthFocused = "0px";
      fApr.frameBorderColorDefault = "transparent";
      fApr.frameBorderColorFocused = "transparent";
      fApr.frameBorderStyle = "solid";
      fApr.frameBoxShadow = "2px 2px 15px  rgba(0, 0, 0, 0.5)";
      fApr.frameBackgroundColor = "transparent";
      fApr.frameComponents = [];
      fApr.frameHeightAdjust = 1;
      fApr.captionClor = "darkgray";
      fApr.pullUpDisabled = false;
      fApr.getTitleBarStyle = function () {
        if (fApr.focusedFrameOnly) {
          return {
            titleBarClassNameDefault: " ",
            titleBarClassNameFocused: " ",
          };
        } else {
          return {
            titleBarClassNameDefault: " ",
            titleBarClassNameFocused: " ",
          };
        }
      };
      fApr.onInitialize = function () {
        var partsBuilder = fApr.getPartsBuilder();
        var crossMark0 = "\u274C";
        var crossMark1 = "\u2716";
        var crossMark2 = "\u274E";
        var CROSS_MARK = crossMark1;
        var cbApr = partsBuilder.buildTextButtonAppearance();
        cbApr.width = 20;
        cbApr.height = 20;
        cbApr.borderRadius = 10;
        cbApr.borderWidth = 0;
        cbApr.borderColorDefault = "#cccccc";
        cbApr.borderColorFocused = "#cccccc";
        cbApr.borderColorHovered = "#dddddd";
        cbApr.borderColorPressed = "#eeeeee";
        cbApr.borderStyleDefault = "solid";
        cbApr.borderStyleFocused = cbApr.borderStyleDefault;
        cbApr.borderStyleHovered = cbApr.borderStyleDefault;
        cbApr.borderStylePressed = cbApr.borderStyleDefault;
        cbApr.backgroundColorDefault = "transparent";
        cbApr.backgroundColorFocused = "transparent";
        cbApr.backgroundColorHovered = "transparent";
        cbApr.backgroundColorPressed = "transparent";
        cbApr.backgroundBoxShadow = null;
        cbApr.caption = CROSS_MARK;
        cbApr.captionColorDefault = fApr.captionClor;
        cbApr.captionColorFocused = fApr.captionClor;
        cbApr.captionColorHovered = fApr.captionClor;
        cbApr.captionColorPressed = fApr.captionClor;
        cbApr.captionShiftYpx = 1;
        cbApr.captionFontRatio = 0.6;
        var closeBtnEle = partsBuilder.buildTextButton(cbApr);
        var eleLeft = -6;
        var eleTop = 3;
        var eleAlign = "RIGHT_TOP";
        fApr.addFrameComponent(
          "closeButton",
          closeBtnEle,
          eleLeft,
          eleTop,
          eleAlign,
        );
      };
      return fApr;
    }
    module.exports.getStyle = getStyle;
  });

  // src/presets/appearance/PresetStyleMaterial.css
  var require_PresetStyleMaterial = __commonJS((exports, module) => {
    module.exports =
      ".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n";
  });

  // src/presets/appearance/PresetStyleMaterial.js
  var require_PresetStyleMaterial2 = __commonJS((exports, module) => {
    require_PresetStyleMaterial();
    var ObjectAssigner = require_ObjectAssigner();
    function getStyle(fApr, userParam) {
      var srcParam = {
        border: {
          color: "transparent",
          width: 0,
          radius: 6,
        },
        control: {
          maximizeWithoutTitleBar: false,
          restoreKey: "Escape",
        },
        titleBar: {
          color: "white",
          background: "black",
          leftMargin: 20,
          height: 30,
          fontSize: 12,
          buttonWidth: 36,
          buttonHeight: 16,
          buttonColor: "white",
          buttons: [
            {
              fa: "fas fa-times",
              name: "closeButton",
              visible: true,
            },
            {
              fa: "far fa-window-maximize",
              name: "maximizeButton",
              visible: true,
            },
            {
              fa: "far fa-window-restore",
              name: "restoreButton",
              visible: false,
            },
            {
              fa: "far fa-window-minimize",
              name: "minimizeButton",
              visible: true,
            },
            {
              fa: "fas fa-caret-up",
              name: "deminimizeButton",
              visible: false,
            },
          ],
          buttonsOnLeft: [],
        },
      };
      var param = srcParam;
      if (userParam) {
        ObjectAssigner.objectAssign(srcParam, userParam);
      }
      fApr.showTitleBar = true;
      fApr.showCloseButton = true;
      fApr.titleBarCaptionFontSize = param.titleBar.fontSize + "px";
      fApr.titleBarCaptionFontWeight = "normal";
      fApr.titleBarCaptionLeftMargin = param.titleBar.leftMargin + "px";
      fApr.titleBarCaptionColorDefault = param.titleBar.color;
      fApr.titleBarCaptionColorFocused = param.titleBar.color;
      fApr.titleBarCaptionTextShadow = null;
      fApr.titleBarCaptionTextAlign = "left";
      fApr.titleBarHeight = param.titleBar.height + "px";
      fApr.titleBarColorDefault = param.titleBar.background;
      fApr.titleBarColorFocused = param.titleBar.background;
      fApr.titleBarBorderBottomDefault = "solid 0px #aaaaaa";
      fApr.titleBarBorderBottomFocused = "solid 0px #1883d7";
      fApr.frameBorderRadius = param.border.radius + "px";
      fApr.frameBorderWidthDefault = param.border.width + "px";
      fApr.frameBorderWidthFocused = param.border.width + "px";
      fApr.frameBorderColorDefault = param.border.color;
      fApr.frameBorderColorFocused = param.border.color;
      fApr.frameBorderStyle = "solid";
      fApr.frameBoxShadow = param.border.shadow;
      fApr.frameBackgroundColor = "transparent";
      fApr.frameComponents = new Array();
      fApr.frameHeightAdjust = 0;
      fApr.getTitleBarStyle = function () {
        if (fApr.focusedFrameOnly) {
          return {
            titleBarClassNameDefault: " ",
            titleBarClassNameFocused: " ",
          };
        } else {
          return {
            titleBarClassNameDefault: " ",
            titleBarClassNameFocused: " ",
          };
        }
      };
      fApr.onInitialize = function () {
        alignButtons(fApr, param, false);
        alignButtons(fApr, param, true);
      };
      return fApr;
    }
    function alignButtons(fApr, param, fromLeft) {
      var partsBuilder = fApr.getPartsBuilder();
      var rbtX = 0;
      var buttons;
      if (fromLeft) {
        buttons = param.titleBar.buttonsOnLeft;
      } else {
        buttons = param.titleBar.buttons;
      }
      for (var rbtIdx in buttons) {
        var rbtSrc = buttons[rbtIdx];
        var rbt = partsBuilder.buildTextButtonAppearance();
        rbt.fa = rbtSrc.fa;
        rbt.width = param.titleBar.buttonWidth;
        rbt.height = param.titleBar.buttonHeight;
        rbt.borderRadius = 0;
        rbt.borderWidth = 0;
        rbt.borderColorDefault = "#c6c6c6";
        rbt.borderColorFocused = "#fc615c";
        rbt.borderColorHovered = rbt.borderColorFocused;
        rbt.borderColorPressed = "#e64842";
        rbt.borderStyleDefault = "solid";
        rbt.borderStyleFocused = rbt.borderStyleDefault;
        rbt.borderStyleHovered = rbt.borderStyleDefault;
        rbt.borderStylePressed = rbt.borderStyleDefault;
        rbt.backgroundColorDefault = "transparent";
        rbt.backgroundColorFocused = "transparent";
        rbt.backgroundColorHovered = "transparent";
        rbt.backgroundColorPressed = "transparent";
        var colors = getSubColor(param.titleBar.buttonColor);
        rbt.captionColorDefault = param.titleBar.buttonColor;
        rbt.captionColorFocused = param.titleBar.buttonColor;
        rbt.captionColorHovered = colors.hovered;
        rbt.captionColorPressed = colors.pressed;
        rbt.captionShiftYpx = 0;
        rbt.captionFontRatio = 1;
        var rbtEle = partsBuilder.buildTextButton(rbt);
        if (rbtSrc.visible) {
          rbtEle.style.display = "flex";
        } else {
          if (fromLeft) {
            rbtX -= param.titleBar.buttonWidth;
          } else {
            rbtX += param.titleBar.buttonWidth;
          }
          rbtEle.style.display = "none";
        }
        var titleBarHeight = parseInt(fApr.titleBarHeight);
        var rbtEleLeft = rbtX;
        var rbtEleTop = -titleBarHeight + (titleBarHeight - rbt.height) / 2;
        var rbtEleAlign;
        if (fromLeft) {
          rbtEleAlign = "LEFT_TOP";
        } else {
          rbtEleAlign = "RIGHT_TOP";
        }
        var ndiv;
        if (rbtSrc.childMenuHTML) {
          ndiv = document.createElement("div");
          ndiv.id = rbtSrc.name + "_child_menu";
          ndiv.innerHTML = rbtSrc.childMenuHTML;
          ndiv.style.position = "absolute";
          ndiv.style.width = (rbtSrc.childMenuWidth
            ? rbtSrc.childMenuWidth
            : 200) + "px";
          ndiv.style.top = parseInt(rbtEle.style.top, 10) +
            parseInt(rbtEle.style.height, 10) / 2 + titleBarHeight / 2 + "px";
          ndiv.style.left = rbtEle.style.left;
          ndiv.style.display = "none";
          rbtEle.appendChild(ndiv);
        }
        fApr.addFrameComponent(
          rbtSrc.name,
          rbtEle,
          rbtEleLeft,
          rbtEleTop,
          rbtEleAlign,
          { childMenu: ndiv },
        );
        if (fromLeft) {
          rbtX += param.titleBar.buttonWidth;
        } else {
          rbtX += -param.titleBar.buttonWidth;
        }
      }
    }
    function getSubColor(color) {
      var canvas = document.createElement("canvas");
      canvas.height = 1;
      canvas.width = 1;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      var colorData = ctx.getImageData(0, 0, 1, 1).data;
      var r = colorData[0];
      var g = colorData[1];
      var b = colorData[2];
      var alpha = colorData[3] / 255;
      var alpha2 = alpha * 0.85;
      var alpha3 = alpha * 0.75;
      var ret = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
      var ret2 = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
      var ret3 = "rgb(" + r + "," + g + "," + b + "," + alpha3 + ")";
      return { src: ret, hovered: ret2, pressed: ret3 };
    }
    module.exports.getStyle = getStyle;
  });

  // src/presets/window/PresetWindowYosemite.js
  var require_PresetWindowYosemite = __commonJS((exports, module) => {
    var mergeDeeply = require_merge_deeply();
    function getPreset(param) {
      var result = {};
      result.appearanceName = "yosemite";
      result.appearanceParam = {};
      var presetParam = {};
      if (param) {
        presetParam = param;
      }
      var isFullScreen = presetParam.maximizeButtonBehavior === "fullscreen";
      var minimizeButton = presetParam.minimizeButtonBehavior === "minimize"
        ? "minimizeButton"
        : null;
      var hideButton1 = presetParam.minimizeButtonBehavior === "hide"
        ? "minimizeButton"
        : null;
      var hideButton2 = presetParam.closeButtonBehavior === "hide"
        ? "custom-close-button"
        : null;
      var windowControlParam = presetParam.control;
      var closeButtonNameByCloseButtonBehavior = hideButton2;
      var closeButtonName = presetParam.closeButtonName;
      if (isFullScreen) {
        result.appearanceParam.titleBar = {
          greenButton: "fullscreen",
        };
      }
      result.appearanceParam.closeButtonName =
        closeButtonNameByCloseButtonBehavior || closeButtonName ||
        "closeButton";
      result.setupPresetWindow = function (frame) {
        var defaultWindowControlParam = {
          maximizeButton: "zoomButton",
          maximizeParam: {
            fullScreen: isFullScreen,
            restoreKey: "Escape",
          },
          demaximizeButton: "dezoomButton",
          deminimizeButton: "deminimizeButton",
          minimizeButton,
          hideButtons: [hideButton1, hideButton2],
          hideParam: {
            align: "CENTER_CENTER",
            duration: 300,
          },
          dehideParam: {
            duration: 300,
          },
          styleDisplay: "inline",
          animation: true,
          animationDuration: 100,
        };
        if (windowControlParam) {
          mergeDeeply({
            op: "overwrite-merge",
            object1: defaultWindowControlParam,
            object2: windowControlParam,
          });
        }
        frame.setControl(defaultWindowControlParam);
      };
      return result;
    }
    module.exports.getPresetWindow = getPreset;
  });

  // src/JSFrame.js
  var require_JSFrame2 = __commonJS((exports, module) => {
    "use strict";
    require_JSFrame();
    var EventEmitter = require_event_emitter();
    var CALIGN2 = require_CCommon();
    var WindowEventHelper = require_WindowEventHelper();
    var inherit = require_Inherit();
    var CFrameAppearance = require_CFrameAppearance();
    var CDomPartsBuilder = require_CDomPartsBuilder();
    var CSimpleLayoutAnimator = require_CSimpleLayoutAnimator();
    var EventListenerHelper = require_event_listener_helper();
    var presetStyles = {
      yosemite: require_PresetStyleYosemite2(),
      redstone: require_PresetStyleRedstone2(),
      popup: require_PresetStylePopup2(),
      toast: require_PresetStyleToast(),
      material: require_PresetStyleMaterial2(),
    };
    var presetWindows = {
      yosemite: require_PresetWindowYosemite(),
    };
    var DEF = {};
    var MOUSE_ENABLED = true;
    var TOUCH_ENABLED = true;
    var TOUCH_MOVE_ONLY_WITH_ONE_FINGER = true;
    DEF.CBEAN = {};
    DEF.CBEAN.HTML_ELEMENT = "span";
    DEF.CBEAN.HTML_ELEMENT_ID_PREFIX = "htmlElement_";
    DEF.CBEAN.TYPE_NAME = "bean";
    function CBeanFrame(
      beanId,
      left,
      top,
      width,
      height,
      zindex,
      w_border_width,
      appearance,
    ) {
      var me = this;
      me.movable = true;
      me.id = beanId;
      me.property = {};
      me.extra = {};
      me.parentCanvas = null;
      me.htmlElement = null;
      me.pullUpDisabled = false;
      if (appearance) {
        me.pullUpDisabled = appearance.pullUpDisabled;
      }
      me.htmlElement = document.createElement(DEF.CBEAN.HTML_ELEMENT);
      me.htmlElement.id = DEF.CBEAN.HTML_ELEMENT_ID_PREFIX + beanId;
      me.htmlElement.style.position = "absolute";
      me.htmlElement.style.left = parseInt(left, 10) + "px";
      me.htmlElement.style.top = parseInt(top, 10) + "px";
      me.htmlElement.style.width = parseInt(width, 10) + "px";
      me.htmlElement.style.height = parseInt(height, 10) + "px";
      if (zindex !== null) {
        me.htmlElement.style.zIndex = zindex;
      }
      me.htmlElement.style.borderColor = "#000000";
      me.htmlElement.style.fontSize = "1px";
      me.htmlElement.parent = me;
      if (MOUSE_ENABLED) {
        me.htmlElement.onmousedown = me.onmouseDown;
      }
      if (TOUCH_ENABLED) {
        if ("ontouchstart" in window) {
          var funcOnTouchStart = function (evt) {
            evt.preventDefault();
            me.onmouseDown.bind(this)(evt);
          };
          me.htmlElement.ontouchstart = funcOnTouchStart;
        }
      }
      me.htmlElement.typeName = DEF.CBEAN.TYPE_NAME;
      me.htmlElement.usage = "nothing";
      me.htmlElement.isRangeLimited = false;
      me.htmlElement.argX = 1;
      me.htmlElement.argY = 1;
      me.externalAreaClickedListener = null;
      me.onMoveListener = null;
    }
    CBeanFrame.prototype.getWindowType = function () {
      return "CBeanFrame";
    };
    CBeanFrame.prototype.setOnMoveListener = function (listener) {
      var me = this;
      me.onMoveListener = listener;
    };
    CBeanFrame.prototype._onMove = function (e) {
      var me = this;
      if (me.onMoveListener) {
        me.onMoveListener(e);
      }
    };
    CBeanFrame.prototype.setMovable = function (enabled) {
      var me = this;
      if (enabled) {
        me.htmlElement.argX = 1;
        me.htmlElement.argY = 1;
      } else {
        me.htmlElement.argX = 0;
        me.htmlElement.argY = 0;
      }
      me.movable = enabled;
      return me;
    };
    CBeanFrame.prototype.setParentCanvas = function (parentCanvas) {
      var me = this;
      me.parentCanvas = parentCanvas;
      me.htmlElement.parentCanvas = me.parentCanvas;
      return me;
    };
    CBeanFrame.prototype.setOnExternalAreaClickedListener = function (
      listener,
    ) {
      var me = this;
      me.externalAreaClickedListener = listener;
      return me;
    };
    CBeanFrame.prototype.onBodyClicked = function (e) {
      var me = this;
      var clickX = e.pageX;
      var clickY = e.pageY;
      var left = parseInt(me.htmlElement.style.left);
      var top = parseInt(me.htmlElement.style.top);
      var width = parseInt(me.htmlElement.style.width);
      var height = parseInt(me.htmlElement.style.height);
      if (
        left < clickX && clickX < left + width && top < clickY &&
        clickY < top + height
      ) {
      } else {
        if (me.externalAreaClickedListener) {
          me.externalAreaClickedListener();
        }
      }
    };
    CBeanFrame.prototype.onmouseDown = function (evt) {
      var refHtmlElement = this;
      var e = evt;
      if (TOUCH_ENABLED) {
        if (evt.type === "touchstart") {
          var changedTouches = evt.changedTouches;
          if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
            var touches = evt.touches;
            if (touches.length === 1) {
              e = changedTouches[0];
            } else {
              return true;
            }
          } else {
            e = changedTouches[0];
          }
        }
      }
      var refCBeanFrame = refHtmlElement.parent;
      if (e.button == 0 || evt.type === "touchstart") {
        if (refCBeanFrame.pullUpDisabled) {
          return false;
        } else {
          refHtmlElement.parentCanvas.currentObject = refHtmlElement;
          refHtmlElement.parentCanvas.pullUp(refCBeanFrame.id);
        }
      } else if (e.button == 2) {
        return false;
      }
      if (refHtmlElement.parentCanvas.currentObject) {
        refHtmlElement.parentCanvas.offsetX = e.pageX -
          parseInt(refHtmlElement.parentCanvas.currentObject.style.left, 10);
        refHtmlElement.parentCanvas.offsetY = e.pageY -
          parseInt(refHtmlElement.parentCanvas.currentObject.style.top, 10);
      }
      return false;
    };
    DEF.CANVAS = {};
    DEF.CANVAS.HTML_ELEMENT = "div";
    DEF.CANVAS.WIDTH_ADJUST_20180722 = 2;
    DEF.CANVAS.HEIGHT_ADJUST_20180722 = 3;
    function CCanvas(parentElement, canvasId, left, top, width, height) {
      function EventData() {
        this.x = 0;
        this.y = 0;
        this.screenX = 0;
        this.screenY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isMoved = false;
        this.targetTypeName = null;
        this.targetUsage = null;
        this.targetObject = null;
      }
      var me = this;
      me.enablePullUp = true;
      me.currentObject = null;
      me.onTopObject = null;
      me.offsetX = 0;
      me.offsetY = 0;
      me.mouseDownSource = null;
      me.id = canvasId;
      me.canvasElement = null;
      me.parentElement = parentElement;
      me.beanList = new Array();
      me.beanIdName = {};
      me.beanNameId = {};
      me.eventData = new EventData();
      me.baseZIndex = 0;
      me.setBaseZIndex = function (baseZIndex) {
        me.baseZIndex = baseZIndex;
      };
      me.getBaseZIndex = function () {
        return me.baseZIndex;
      };
      me.canvasElement = document.createElement(DEF.CANVAS.HTML_ELEMENT);
      me.canvasElement.style.zIndex = 2e3;
      me.canvasElement.id = me.id;
      me.canvasElement.style.boxSizing = "border-box";
      me.canvasElement.style.position = "absolute";
      me.canvasElement.style.left = parseInt(left) + "px";
      me.canvasElement.style.top = parseInt(top) + "px";
      me.canvasElement.style.width = parseInt(width) +
        DEF.CANVAS.WIDTH_ADJUST_20180722 + "px";
      me.canvasElement.style.height = parseInt(height) +
        DEF.CANVAS.HEIGHT_ADJUST_20180722 + "px";
      me.canvasElement.style.backgroundColor = "transparent";
      me.canvasElement.style.borderStyle = "none";
      me.canvasElement.style.margin = "0px";
      me.canvasElement.style.borderWidth = "0px";
      me.canvasElement.style.borderColor = "transparent";
      me.parentElement.appendChild(me.canvasElement);
    }
    CCanvas.prototype.mouseMove = function (evt) {
      var me = this;
      var e = evt;
      if (TOUCH_ENABLED) {
        if (evt.type === "touchmove") {
          var changedTouches = evt.changedTouches;
          if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
            var touches = evt.touches;
            if (touches.length === 1) {
              e = changedTouches[0];
            } else {
              return true;
            }
          } else {
            e = changedTouches[0];
          }
        }
      }
      if (me.currentObject) {
        me.eventData.targetTypeName = me.currentObject.typeName;
        me.eventData.targetUsage = me.currentObject.usage;
        me.eventData.targetObject = me.currentObject;
        var newObjLeftPx = e.pageX - me.offsetX;
        var newObjTopPx = e.pageY - me.offsetY;
        var absoluteMouseX = e.pageX;
        var absoluteMouseY = e.pageY;
        var oldObjLeftPx = me.currentObject.style.left;
        var oldObjTopPx = me.currentObject.style.top;
        var tmpLeft = parseInt(newObjLeftPx, 10);
        var tmpTop = parseInt(newObjTopPx, 10);
        var tmpRight = tmpLeft + parseInt(me.currentObject.style.width, 10);
        var tmpBottom = tmpTop + parseInt(me.currentObject.style.height, 10);
        var styleWidth = parseInt(me.canvasElement.style.width, 10);
        var styleHeight = parseInt(me.canvasElement.style.height, 10);
        var deltaX = 0;
        var deltaY = 0;
        if (
          me.currentObject.isRangeLimited == true &&
          (tmpLeft <= 0 || tmpRight > styleWidth || tmpTop <= 0 ||
            tmpBottom > styleHeight)
        ) {
          deltaX = 0;
          deltaY = 0;
        } else {
          deltaX = parseInt(newObjLeftPx, 10) - parseInt(oldObjLeftPx, 10);
          deltaY = parseInt(newObjTopPx, 10) - parseInt(oldObjTopPx, 10);
          me.currentObject.style.left = parseInt(me.currentObject.style.left) +
            deltaX * me.currentObject.argX + "px";
          me.currentObject.style.top = parseInt(me.currentObject.style.top) +
            deltaY * me.currentObject.argY + "px";
          var parentObject = me.currentObject.parent;
          if (parentObject && parentObject._onMove) {
            parentObject._onMove();
          }
        }
        me.eventData.deltaX = deltaX;
        me.eventData.deltaY = deltaY;
        return me.eventData;
      }
      return null;
    };
    CCanvas.prototype.mouseUp = function (e) {
      var me = this;
      me.currentObject = null;
      me.mouseDownSource = null;
    };
    CCanvas.prototype.pullUp = function (targetBeanId) {
      var me = this;
      var tmpBeanArray = [];
      var beanList = me.beanList;
      for (var i in beanList) {
        tmpBeanArray.push(beanList[i]);
      }
      var targetBean = beanList[targetBeanId];
      if (me.enablePullUp) {
        me.pullUpSort(targetBean, tmpBeanArray, me.baseZIndex);
      }
      me.onTopObject = targetBean;
    };
    CCanvas.prototype.pullUpSort = function (
      pullupObject,
      objectArray,
      baseIndex,
    ) {
      var me = this;
      pullupObject.htmlElement.style.zIndex = objectArray.length + baseIndex;
      objectArray.sort(function (b, a) {
        return -parseInt(b.htmlElement.style.zIndex, 10) +
          parseInt(a.htmlElement.style.zIndex, 10);
      });
      for (var i in objectArray) {
        objectArray[i].htmlElement.style.zIndex = objectArray.length - 1 - i +
          baseIndex;
      }
    };
    CCanvas.prototype.removeBean = function (beanId) {
      var me = this;
      var beanList = me.beanList;
      var targetBean = beanList[beanId];
      me.canvasElement.removeChild(targetBean.htmlElement);
      delete beanList[beanId];
    };
    CCanvas.prototype.addBean = function (bean) {
      var me = this;
      var beanList = me.beanList;
      var beanIdName = me.beanIdName;
      var beanNameId = me.beanNameId;
      beanList[bean.id] = bean;
      if (bean.property.name) {
        beanNameId[bean.property.name] = bean.id;
        beanIdName[bean.id] = bean.property.name;
      }
      var num = 0;
      for (var j in beanList) {
        num++;
      }
      bean.htmlElement.style.zIndex = num + me.baseZIndex;
      bean.setParentCanvas(me);
      this.canvasElement.appendChild(bean.htmlElement);
    };
    CCanvas.prototype.getParentElement = function () {
      var me = this;
      return me.parentElement;
    };
    DEF.CFRAME = {};
    DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR = "transparent";
    DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX =
      "window__modal_window_background_";
    inherit(CFrame, CBeanFrame);
    function CFrame(
      windowId,
      w_left,
      w_top,
      w_width,
      w_height,
      zindex,
      w_border_width,
      appearance,
    ) {
      var me = this;
      CFrame.superConstructor.call(
        this,
        windowId,
        w_left,
        w_top,
        w_width,
        w_height,
        zindex,
        w_border_width,
        appearance,
      );
      me.anchor = CALIGN2.LEFT_TOP;
      me.showTitleBar = appearance.showTitleBar;
      me.canvasNetHeight = null;
      me.canvasNetWidth = null;
      me.frameHeightAdjust = appearance.frameHeightAdjust;
      me.frameComponentMap = {};
      me.canvas = null;
      me.myCanvasId = null;
      me.floatingButton = null;
      me.titleBarClassNameDefault = "jsframe-titlebar-default";
      me.titleBarClassNameFocused = "jsframe-titlebar-focused";
      me.titleBarHeight = appearance.titleBarHeight;
      me.titleBarCaption = appearance.titleBarCaption;
      me.titleBarCaptionLeftMargin = appearance.titleBarCaptionLeftMargin;
      me.titleBarCaptionFontSize = appearance.titleBarCaptionFontSize;
      me.titleBarCaptionFontWeight = appearance.titleBarCaptionFontWeight;
      me.titleBarBorderBottomDefault = appearance.titleBarBorderBottomDefault;
      me.titleBarBorderBottomFocused = appearance.titleBarBorderBottomFocused;
      me.titleBarCaptionTextShadow = appearance.titleBarCaptionTextShadow;
      me.titleBarCaptionTextAlign = appearance.titleBarCaptionTextAlign;
      me.titleAdjustWidth = 2;
      me.windowId = windowId;
      me.exBorderWidth = 0;
      me.myCanvasId = windowId + "_canvas";
      var appIcon = document.createElement("img");
      appIcon.src = "";
      appIcon.style.position = "absolute";
      appIcon.style.left = "2px";
      appIcon.style.top = "2px";
      appIcon.style.width = "16px";
      appIcon.style.height = "16px";
      appIcon.style.visibility = "hidden";
      me.titleBar = document.createElement("div");
      me.titleBar.className = "jsframetitlebar";
      if (me.showTitleBar) {
        me.titleBar.id = windowId + "_title";
        me.titleBar.style.position = "absolute";
        me.titleBar.style.boxSizing = "border-box";
        me.titleBar.style.top = "0px";
        me.titleBar.style.left = "0px";
        me.titleBar.style.width = w_width - me.titleAdjustWidth +
          DEF.CANVAS.WIDTH_ADJUST_20180722 + "px";
        me.titleBar.style.userSelect = "none";
        if (me.titleBarHeight) {
          var titleBarAdjust = 0;
          if (me.titleBarBorderBottomDefault) {
            titleBarAdjust = 0;
          }
          me.titleBar.style.height = parseInt(me.titleBarHeight, 10) + 0 + "px";
        }
        if (me.titleBarColorDefault) {
          me.titleBar.style.background = me.titleBarColorDefault;
        }
        me.titleBar.style.zIndex = 0;
        me.titleBar.style.color = me.titleBarCaptionColorDefault;
        me.titleBar.style.fontSize = me.titleBarCaptionFontSize;
        me.titleBar.style.fontWeight = me.titleBarCaptionFontWeight;
        me.titleBar.style.textShadow = me.titleBarCaptionTextShadow;
        me.titleBar.style.textAlign = me.titleBarCaptionTextAlign;
        me.titleBar.style.lineHeight = me.titleBar.style.height;
        me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
        me.titleBar.style.overflow = "hidden";
        var titleBarText = document.createTextNode("");
        var titleBarTextSpan = document.createElement("span");
        titleBarTextSpan.id = me.id + "_titleBarText";
        if (me.titleBarCaptionLeftMargin != null) {
          titleBarTextSpan.style.position = "absolute";
          titleBarTextSpan.style.left =
            parseInt(me.titleBarCaptionLeftMargin, 10) + "px";
        } else {
          titleBarTextSpan.style.position = "absolute";
          titleBarTextSpan.style.left = "0px";
          titleBarTextSpan.style.right = "0px";
        }
        titleBarTextSpan.style.top = "0px";
        titleBarTextSpan.appendChild(titleBarText);
        me.titleBar.appendChild(titleBarTextSpan);
      }
      me.htmlElement.appendChild(me.titleBar);
      var canvasMoreHeight = parseInt(me.titleBarHeight, 10) - titleBarAdjust;
      var canvasMoreSpacing = parseInt(me.titleAdjustWidth, 10);
      if (me.showTitleBar) {
      } else {
        canvasMoreHeight = 0;
        canvasMoreSpacing = 0;
        titleBarAdjust = 0;
      }
      me.canvasNetWidth = w_width - canvasMoreSpacing;
      me.canvasNetHeight = w_height - canvasMoreHeight - canvasMoreSpacing - 1 -
        titleBarAdjust + me.frameHeightAdjust;
      me.htmlElement.style.cursor = "move";
      me.canvas = new CCanvas(
        me.htmlElement,
        me.myCanvasId,
        0,
        canvasMoreHeight,
        w_width - canvasMoreSpacing,
        w_height - canvasMoreHeight - canvasMoreSpacing,
      );
      me.canvas.enablePullUp = false;
      me.canvas.canvasElement.style.backgroundColor =
        DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR;
      me.canvas.canvasElement.style.cursor = "default";
      if (MOUSE_ENABLED) {
        me.canvas.canvasElement.onmousedown = me.canvasMouseDown;
      }
      if (TOUCH_ENABLED) {
        if ("ontouchstart" in window) {
          var funcOnTouchStart = function (evt) {
            var touchStartEvent = evt.changedTouches[0];
            me.canvasMouseDown.bind(this)(touchStartEvent);
          };
          me.canvas.canvasElement.ontouchstart = funcOnTouchStart;
        }
      }
      me.canvas.canvasElement.parentCFrame = me;
      var tmpCanvasWidth = parseInt(me.canvas.canvasElement.style.width, 10);
      var tmpCanvasHeight = parseInt(me.canvas.canvasElement.style.height, 10);
      var markerWidth = appearance.resizeAreaWidth;
      var markerHeight = appearance.resizeAreaHeight;
      var edgeMargin = appearance.resizeAreaOffset;
      var markerZIndex = 0;
      var colorRD, colorDD, colorRR;
      if (appearance.resizeAreaVisible) {
        colorRD = "rgba(255, 0, 0, 0.5)";
        colorDD = "rgba(0, 0, 255, 0.5)";
        colorRR = "rgba(0, 255, 0, 0.5)";
      }
      var markerRD = new CMarkerWindow(
        me.myCanvasId + "_RD",
        tmpCanvasWidth + edgeMargin,
        tmpCanvasHeight + edgeMargin,
        markerWidth,
        markerHeight,
        markerZIndex,
        "RD",
        colorRD,
      );
      markerRD.htmlElement.style.cursor = "se-resize";
      markerRD.htmlElement.argX = 0;
      markerRD.htmlElement.argY = 0;
      var markerDD = new CMarkerWindow(
        me.myCanvasId + "_DD",
        0,
        tmpCanvasHeight + edgeMargin,
        tmpCanvasWidth + edgeMargin,
        markerHeight,
        markerZIndex,
        "DD",
        colorDD,
      );
      markerDD.htmlElement.style.cursor = "n-resize";
      markerDD.htmlElement.argX = 0;
      markerDD.htmlElement.argY = 0;
      var markerRR = new CMarkerWindow(
        me.myCanvasId + "_RR",
        tmpCanvasWidth + edgeMargin,
        0,
        markerWidth,
        tmpCanvasHeight + edgeMargin,
        markerZIndex,
        "RR",
        colorRR,
      );
      markerRR.htmlElement.style.cursor = "w-resize";
      markerRR.htmlElement.argY = 0;
      markerRR.htmlElement.argX = 0;
      me.canvas.addBean(markerRD);
      me.canvas.addBean(markerDD);
      me.canvas.addBean(markerRR);
      me.removeMarkers = function () {
        me.canvas.removeBean(markerRD.id);
        me.canvas.removeBean(markerDD.id);
        me.canvas.removeBean(markerRR.id);
        me.htmlElement.style.cursor = "default";
      };
      me.removeMarkers2 = function () {
        me.canvas.removeBean(markerRD.id);
        me.canvas.removeBean(markerDD.id);
        me.canvas.removeBean(markerRR.id);
      };
      me.enableMarkers = function (enabled) {
        if (enabled) {
          markerRD.htmlElement.style.display = "flex";
          markerDD.htmlElement.style.display = "flex";
          markerRR.htmlElement.style.display = "flex";
          markerRD.htmlElement.style.cursor = "se-resize";
          markerDD.htmlElement.style.cursor = "n-resize";
          markerRR.htmlElement.style.cursor = "w-resize";
        } else {
          markerRD.htmlElement.style.display = "none";
          markerDD.htmlElement.style.display = "none";
          markerRR.htmlElement.style.display = "none";
        }
      };
      for (var idx in appearance.frameComponents) {
        var frameComponent = appearance.frameComponents[idx];
        frameComponent.setFrame(me);
        if (frameComponent.id == "closeButton") {
          frameComponent.htmlElement.onclick = me.close;
        }
        var frameComponentHasChildMenu = frameComponent.htmlElement
          .querySelector(".jsframe-child-menu");
        if (frameComponentHasChildMenu) {
          me.eventListenerHelper.addEventListener(
            frameComponent.htmlElement,
            "click",
            function (e) {
              var frameComponentId = e.target.getAttribute("component-id");
              me.hideFrameComponentChildMenus(
                { exceptFrameComponentId: frameComponentId },
              );
              if (frameComponentId) {
                var frameComponentHtmlElement = me.getFrameComponentElement(
                  frameComponentId,
                );
                var frameComponentChildMenu = frameComponentHtmlElement
                  .querySelector(".jsframe-child-menu");
                if (frameComponentChildMenu) {
                  if (frameComponentChildMenu.style.display == "table") {
                    frameComponentChildMenu.style.display = "none";
                  } else {
                    frameComponentChildMenu.style.display = "table";
                  }
                } else {
                  console.error(
                    "frameComponent child menu isnt found. frameComponentId=" +
                      frameComponentId,
                  );
                }
              }
            },
            { listenerName: "frame-component_child-menu-listener" },
          );
        }
        me.addFrameComponent(frameComponent);
      }
      me.htmlElement.style.backgroundColor = "transparent";
      me.htmlElement.oncontextmenu = this.contextMenu;
      var caribVal = 0;
      me.caribValue = caribVal;
      if (me.exBorderWidth) {
        me.htmlElement.style.borderWidth = me.exBorderWidth + "px";
      }
      me.htmlElement.style.width = parseInt(me.htmlElement.style.width, 10) -
        caribVal + "px";
      me.htmlElement.style.height = parseInt(me.htmlElement.style.height, 10) -
        caribVal + 1 + "px";
      me.htmlElement.typeName = "cwindow";
      me.htmlElement.overflow = "auto";
      me.htmlElement.style.boxSizing = "content-box";
      if (appearance.frameBorderStyle) {
        me.htmlElement.style.borderStyle = appearance.frameBorderStyle;
      }
      if (appearance.frameBoxShadow) {
        me.htmlElement.style.boxShadow = appearance.frameBoxShadow;
      }
      if (parseInt(appearance.frameBorderWidthDefault, 10) >= 0) {
        me.htmlElement.style.borderWidth = appearance.frameBorderWidthDefault;
        me.htmlElement.style.borderColor = appearance.frameBorderColorDefault;
      }
      if (parseInt(appearance.frameBorderRadius, 10) >= 0) {
        me.htmlElement.style.borderRadius = appearance.frameBorderRadius;
      }
      me.onCloseFrameListener = null;
    }
    CFrame.prototype.setTitleBarClassName = function (
      classNameForDefault,
      classNameForFocused,
    ) {
      var me = this;
      if (classNameForDefault) {
        me.titleBarClassNameDefault = classNameForDefault;
        me.titleBarClassNameFocused = classNameForDefault;
      }
      if (classNameForFocused) {
        me.titleBarClassNameFocused = classNameForFocused;
      }
      return me;
    };
    CFrame.prototype.addFrameComponent = function (frameComponent) {
      var me = this;
      me.frameComponentMap[frameComponent.id] = frameComponent;
      me.canvas.canvasElement.appendChild(frameComponent.htmlElement);
      return me;
    };
    CFrame.prototype.getFrameComponentElement = function (id) {
      var me = this;
      if (me.frameComponentMap[id]) {
        return me.frameComponentMap[id].htmlElement;
      } else {
        return null;
      }
    };
    CFrame.prototype.removeFrameComponentById = function (frameComponentId) {
      var me = this;
      var frameComponent = me.frameComponentMap[frameComponentId];
      me.canvas.canvasElement.removeChild(frameComponent.htmlElement);
      delete me.frameComponentMap[frameComponentId];
    };
    CFrame.prototype.showFrameComponent = function (frameComponentId, display) {
      var me = this;
      var comp = me.getFrameComponentElement(frameComponentId);
      if (comp) {
        if (display) {
          comp.style.display = display;
        } else {
          comp.style.display = "flex";
        }
      }
      return me;
    };
    CFrame.prototype.hideFrameComponent = function (frameComponentId) {
      var me = this;
      var comp = me.getFrameComponentElement(frameComponentId);
      if (comp) {
        comp.style.display = "none";
      }
      return me;
    };
    CFrame.prototype.hideAllVisibleFrameComponents = function () {
      var me = this;
      var compMap = me.frameComponentMap;
      for (var key in compMap) {
        if (compMap.hasOwnProperty(key)) {
          var comp = compMap[key].htmlElement;
          if (comp.style.display === "none") {
            comp._alreadyNone = true;
          }
          comp.style.display = "none";
        }
      }
    };
    CFrame.prototype.showAllVisibleFrameComponents = function () {
      var me = this;
      var compMap = me.frameComponentMap;
      for (var key in compMap) {
        if (compMap.hasOwnProperty(key)) {
          var comp = compMap[key].htmlElement;
          if (comp._alreadyNone) {
            comp._alreadyNone = null;
          } else {
            comp.style.display = "flex";
          }
        }
      }
    };
    CFrame.prototype.hideFrameComponentChildMenus = function (opt) {
      var me = this;
      var compMap = me.frameComponentMap;
      for (var frameComponentId in compMap) {
        if (compMap.hasOwnProperty(frameComponentId)) {
          if (opt && opt.exceptFrameComponentId) {
            if (frameComponentId === opt.exceptFrameComponentId) {
              continue;
            }
          }
          var comp = compMap[frameComponentId];
          if (comp.childMenu) {
            comp.childMenu.style.display = "none";
          }
        }
      }
    };
    CFrame.prototype.setTitle = function (str) {
      var me = this;
      me.title = str;
      if (me.showTitleBar) {
        var textNode = document.createTextNode(str);
        me.titleBar.firstChild.replaceChild(
          textNode,
          me.titleBar.firstChild.firstChild,
        );
      }
      return me;
    };
    CFrame.prototype.resize = function (
      deltaLeft,
      deltaTop,
      deltaWidth,
      deltaHeight,
    ) {
      var me = this;
      var tmpLeft = parseInt(me.htmlElement.style.left, 10);
      var tmpTop = parseInt(me.htmlElement.style.top, 10);
      var tmpWidth = parseInt(me.htmlElement.style.width, 10);
      var tmpHeight = parseInt(me.htmlElement.style.height, 10);
      me.htmlElement.style.left = parseInt(tmpLeft + deltaLeft, 10) + "px";
      me.htmlElement.style.top = parseInt(tmpTop + deltaTop, 10) + "px";
      me.htmlElement.style.width = parseInt(tmpWidth + deltaWidth, 10) + "px";
      me.htmlElement.style.height = parseInt(tmpHeight + deltaHeight, 10) +
        "px";
      var tmpCanvasWidth = parseInt(me.canvas.canvasElement.style.width, 10);
      var tmpCanvasHeight = parseInt(me.canvas.canvasElement.style.height, 10);
      me.canvas.canvasElement.style.width = tmpCanvasWidth + deltaWidth + "px";
      me.canvas.canvasElement.style.height = tmpCanvasHeight + deltaHeight +
        "px";
      if (me.showTitleBar) {
        me.titleBar.style.width = tmpCanvasWidth + deltaWidth + "px";
      } else {
      }
      for (var beanName in me.canvas.beanList) {
        var tmpBean = me.canvas.beanList[beanName];
        if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
          if (tmpBean.htmlElement.usage == "RD") {
            tmpBean.htmlElement.style.left =
              parseInt(tmpBean.htmlElement.style.left, 10) + deltaWidth + "px";
            tmpBean.htmlElement.style.top =
              parseInt(tmpBean.htmlElement.style.top, 10) + deltaHeight + "px";
          } else if (tmpBean.htmlElement.usage == "DD") {
            tmpBean.htmlElement.style.width =
              parseInt(tmpBean.htmlElement.style.width, 10) + deltaWidth + "px";
            tmpBean.htmlElement.style.top =
              parseInt(tmpBean.htmlElement.style.top, 10) + deltaHeight + "px";
          } else if (tmpBean.htmlElement.usage == "RR") {
            tmpBean.htmlElement.style.left =
              parseInt(tmpBean.htmlElement.style.left, 10) + deltaWidth + "px";
            tmpBean.htmlElement.style.height =
              parseInt(tmpBean.htmlElement.style.height, 10) + deltaHeight +
              "px";
          }
        }
      }
    };
    CFrame.prototype.canvasMouseDown = function (e) {
      var me = this;
      if (this.parentCFrame.parentCanvas.mouseDownSource == null) {
        this.parentCFrame.parentCanvas.mouseDownSource = "childcanvas";
      }
    };
    CFrame.prototype.mouseUp = function (e) {
      this.canvas.mouseUp(e);
    };
    CFrame.prototype.close = function (e) {
      var me = this;
      var parentCanvas = this.parentObject.parentCanvas;
      var cframeObj = this.parentObject;
      console.log(
        'CFrame#close "' + cframeObj.title + "(@" + cframeObj.getName() +
          ')" @' + cframeObj.windowId,
      );
      var windowId = cframeObj.id;
      cframeObj.closeInternally(e, parentCanvas, windowId);
    };
    CFrame.prototype.closeFrame = function (e) {
      var me = this;
      console.log(
        'CFrame#closeFrame "' + me.title + "(" + me.getName() + ')" @' +
          me.windowId,
      );
      var parentCanvas = this.parentCanvas;
      me.closeInternally(e, parentCanvas, me.windowId);
    };
    CFrame.prototype.closeInternally = function (e, parentCanvas, windowId) {
      var me = this;
      if (!parentCanvas) {
        console.error("Window(" + windowId + ") may have been closed");
        return;
      }
      parentCanvas.removeBean(windowId);
      if (me.modalBackgroundWindowId) {
        parentCanvas.removeBean(me.modalBackgroundWindowId);
        me.modalBackgroundWindowId = null;
      }
      if (me.onCloseFrameListener) {
        me.onCloseFrameListener(me);
      }
    };
    CFrame.prototype.setOnCloseFrameListener = function (listener) {
      var me = this;
      me.onCloseFrameListener = listener;
    };
    CFrame.prototype.contextMenu = function () {
      var contextMenuSource = "CFrame";
      return false;
    };
    CFrame.prototype.setTitleBarTextColor = function (str) {
      var me = this;
      me.titleBar.style.color = str;
    };
    CFrame.prototype.setPosition = function (x, y, anchor) {
      var me = this;
      var frameWidth = me.getWidth();
      var frameHeight = me.getHeight();
      me._setPositionInternally(x, y, anchor, frameWidth, frameHeight);
      return me;
    };
    CFrame.prototype._setPositionInternally = function (
      x,
      y,
      anchor,
      frameWidth,
      frameHeight,
    ) {
      var me = this;
      if (anchor) {
        me.anchor = anchor;
      }
      if (!anchor || CALIGN2.LEFT_TOP == anchor) {
        me.htmlElement.style.left = x + "px";
        me.htmlElement.style.top = y + "px";
      } else if (CALIGN2.HCENTER_TOP == anchor) {
        me.htmlElement.style.left = -frameWidth / 2 + x + "px";
        me.htmlElement.style.top = y + "px";
      } else if (CALIGN2.RIGHT_TOP == anchor) {
        me.htmlElement.style.left = -frameWidth + x + "px";
        me.htmlElement.style.top = y + "px";
      } else if (CALIGN2.LEFT_VCENTER == anchor) {
        me.htmlElement.style.left = x + "px";
        me.htmlElement.style.top = -frameHeight / 2 + y + "px";
      } else if (CALIGN2.HCENTER_VCENTER == anchor) {
        me.htmlElement.style.left = -frameWidth / 2 + x + "px";
        me.htmlElement.style.top = -frameHeight / 2 + y + "px";
      } else if (CALIGN2.RIGHT_VCENTER == anchor) {
        me.htmlElement.style.left = -frameWidth + x + "px";
        me.htmlElement.style.top = -frameHeight / 2 + y + "px";
      } else if (CALIGN2.LEFT_BOTTOM == anchor) {
        me.htmlElement.style.left = x + "px";
        me.htmlElement.style.top = -frameHeight + y + "px";
      } else if (CALIGN2.HCENTER_BOTTOM == anchor) {
        me.htmlElement.style.left = -frameWidth / 2 + x + "px";
        me.htmlElement.style.top = -frameHeight + y + "px";
      } else if (CALIGN2.RIGHT_BOTTOM == anchor) {
        me.htmlElement.style.left = -frameWidth + x + "px";
        me.htmlElement.style.top = -frameHeight + y + "px";
      }
    };
    CFrame.prototype.getPosition = function () {
      var me = this;
      var frameWidth = me.getWidth();
      var frameHeight = me.getHeight();
      var x;
      var y;
      var anchor = me.anchor;
      if (!anchor || CALIGN2.LEFT_TOP == anchor) {
        x = parseInt(me.htmlElement.style.left, 10);
        y = parseInt(me.htmlElement.style.top, 10);
      } else if (CALIGN2.HCENTER_TOP == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
        y = parseInt(me.htmlElement.style.top, 10);
      } else if (CALIGN2.RIGHT_TOP == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
        y = parseInt(me.htmlElement.style.top, 10);
      } else if (CALIGN2.LEFT_VCENTER == anchor) {
        x = parseInt(me.htmlElement.style.left, 10);
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
      } else if (CALIGN2.HCENTER_VCENTER == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
      } else if (CALIGN2.RIGHT_VCENTER == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
      } else if (CALIGN2.LEFT_BOTTOM == anchor) {
        x = parseInt(me.htmlElement.style.left, 10);
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
      } else if (CALIGN2.HCENTER_BOTTOM == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
      } else if (CALIGN2.RIGHT_BOTTOM == anchor) {
        x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
        y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
      }
      return { x, y, anchor };
    };
    CFrame.prototype.getLeft = function () {
      var me = this;
      return parseInt(me.htmlElement.style.left, 10);
    };
    CFrame.prototype.getTop = function () {
      var me = this;
      return parseInt(me.htmlElement.style.top, 10);
    };
    CFrame.prototype.getWidth = function () {
      var me = this;
      return parseInt(me.htmlElement.style.width, 10);
    };
    CFrame.prototype.getHeight = function () {
      var me = this;
      return parseInt(me.htmlElement.style.height, 10);
    };
    CFrame.prototype.getSize = function () {
      var me = this;
      return { width: me.getWidth(), height: me.getHeight() };
    };
    CFrame.prototype.setSize = function (width, height, force) {
      var me = this;
      var byUser = true;
      if (force) {
        byUser = false;
      }
      me.resize(0, 0, width - me.getWidth(), height - me.getHeight(), byUser);
      return me;
    };
    CFrame.prototype.getWindowId = function () {
      var me = this;
      return me.windowId;
    };
    CFrame.prototype.getName = function () {
      var me = this;
      return me.property.name;
    };
    CFrame.prototype.setName = function (name) {
      var me = this;
      me.property.name = name;
    };
    inherit(CIfFrame, CFrame);
    function CIfFrame(windowId, left, top, width, height, appearance) {
      var wleft = left;
      var wtop = top;
      var wwidth = width;
      var wheight = height;
      var zindex = appearance.zindex;
      var wborderwidth = null;
      var me = this;
      this.jsFrame = null;
      this.control = null;
      this.minFrameWidth = 128;
      this.minWindowHeight = 32;
      this.eventListenerHelper = new EventListenerHelper();
      this.overrayTransparentScreenEnabled = false;
      this.overrayTransparentScreenOnResize = true;
      this.titleBarColorFocused = appearance.titleBarColorFocused;
      this.titleBarColorDefault = appearance.titleBarColorDefault;
      this.titleBarCaptionColorDefault = appearance.titleBarCaptionColorDefault;
      this.titleBarCaptionColorFocused = appearance.titleBarCaptionColorFocused;
      CIfFrame.superConstructor.call(
        me,
        windowId,
        wleft,
        wtop,
        wwidth,
        wheight,
        zindex,
        wborderwidth,
        appearance,
      );
      me.frameBorderColorDefault = appearance.frameBorderColorDefault;
      me.frameBorderColorFocused = appearance.frameBorderColorFocused;
      me.frameBorderWidthDefault = appearance.frameBorderWidthDefault;
      me.frameBorderWidthFocused = appearance.frameBorderWidthFocused;
      me.iframe = null;
      me.ifDelta = 0;
      me.resizable = true;
      me.onMouseMoveOnIframe = null;
      me.onMouseUpOnIframe = null;
      me._hasFocus = false;
      me._hasFocusTime = 0;
      me.htmlElement.typeName = "cifwindow";
      var exIframeName = "riversun_" + windowId;
      me.dframe = document.createElement("div");
      me.iframe = document.createElement("iframe");
      me.iframe.name = exIframeName;
      me.iframe.id = exIframeName;
      me.iframe.frameBorder = "0";
      me.iframe.zIndex = -1;
      me.iframe.allowTransparency = "true";
      me.iframe.width = me.canvasNetWidth - me.ifDelta + 0;
      me.iframe.height = me.canvasNetHeight - me.ifDelta + 0;
      me.showTitleBar = appearance.showTitleBar;
      me.getFrameInnerBorderRadius = appearance.getFrameInnerBorderRadius;
      me.frameBorderRadius = appearance.frameBorderRadius;
      me.adjustFrameBorderRadius();
      me.useIframe = false;
      me.canvas.canvasElement.appendChild(me.iframe);
      me.canvas.canvasElement.appendChild(me.dframe);
      this.setUseIframe = function (useIframe) {
        me.useIframe = useIframe;
        me.iframe.style.visibility = "hidden";
        me.iframe.style.position = "absolute";
        me.iframe.style.left = "0px";
        me.iframe.style.top = "0px";
        me.iframe.style.width = "100%";
        me.iframe.style.height = "100%";
        me.dframe.style.visibility = "hidden";
        me.dframe.style.position = "absolute";
        me.dframe.style.left = "0px";
        me.dframe.style.boxSizing = "content-box";
        me.dframe.style.top = "0px";
        me.dframe.style.width = "100%";
        me.dframe.style.height = "100%";
        me.dframe.style.backgroundColor = "white";
        if (useIframe) {
          me.iframe.style.visibility = "visible";
          me.dframe.style.visibility = "hidden";
        } else {
          me.iframe.style.visibility = "hidden";
          me.dframe.style.visibility = "visible";
        }
      };
      me.setUseIframe(appearance.useIframe);
      if (
        me.overrayTransparentScreenEnabled ||
        me.overrayTransparentScreenOnResize
      ) {
        me.transparence = document.createElement("span");
        me.transparence.style.position = "absolute";
        me.transparence.style.left = "0px";
        me.transparence.style.top = "0px";
        me.transparence.style.width = "0px";
        me.transparence.style.height = "0px";
        me.transparence.style.zIndex = 4;
        me.transparence.style.borderWidth = "0px";
        me.transparence.style.borderColor = "#ff00ee";
        me.transparence.style.borderStyle = "none";
        me.transparence.style.cursor = "default";
        me.transparence.style.pointerEvents = "none";
        me.canvas.canvasElement.style.backgroundColor =
          appearance.frameBackgroundColor;
        me.canvas.canvasElement.appendChild(me.transparence);
      }
      me.eventEmitter = new EventEmitter();
      me.appearance = appearance;
    }
    CIfFrame.prototype.getFrameView = function () {
      var me = this;
      return me.dframe;
    };
    CIfFrame.prototype.getFrameAppearance = function () {
      var me = this;
      return me.appearance;
    };
    CIfFrame.prototype.setHTML = function (html) {
      var me = this;
      me.dframe.innerHTML = html;
    };
    CIfFrame.prototype.setFrameInFrame = function (enabled) {
      var me = this;
      var contentsEle = me.dframe ? me.dframe.firstChild : null;
      if (contentsEle) {
        if (!Date.now) {
          Date.now = function now() {
            return new Date().getTime();
          };
        }
        if (enabled) {
          me.eventEmitter.only("resize", "fif-listener", function () {
            contentsEle.setAttribute(
              WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
              Date.now(),
            );
          });
        } else {
          contentsEle.removeAttribute(
            WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
          );
          me.eventEmitter.only("resize", "fif-listener", function () {
          });
        }
      }
    };
    CIfFrame.prototype.$ = function (q) {
      var me = this;
      if (me.useIframe) {
        var docInIframe = me.iframe.contentWindow.document;
        return docInIframe.querySelector(q);
      } else {
        return me.dframe.querySelector(q);
      }
    };
    CIfFrame.prototype.on = function (id, eventType, callbackFunc) {
      var me = this;
      var component = me.getFrameComponentElement(id);
      if (component) {
        me.eventListenerHelper.addEventListener(
          component,
          eventType,
          function (e) {
            callbackFunc(me, e, {
              type: "frameComponent",
              id,
              eventType,
            });
          },
          { listenerName: "frame-component-listener" },
        );
      }
      if (id === "frame" || id === "window") {
        if (eventType === "move" && !me.eventEmitter.hasListenerFuncs("move")) {
          me.setOnMoveListener(function (e) {
            me.eventEmitter.emit("move", me._getCurrentSizePos());
          });
        }
        me.eventEmitter.on(eventType, callbackFunc);
      }
      var domElement = me.$(id);
      if (domElement) {
        if (
          me.eventListenerHelper.hasEventListener(
            domElement,
            eventType,
            "frame-dom-listener",
          )
        ) {
          me.eventListenerHelper.removeEventListener(
            domElement,
            eventType,
            null,
            { listenerName: "frame-dom-listener" },
          );
        }
        me.eventListenerHelper.addEventListener(
          domElement,
          eventType,
          function (e) {
            callbackFunc(me, e, {
              type: "dom",
              id,
              eventType,
            });
          },
          { listenerName: "frame-dom-listener" },
        );
      }
      if (!domElement) {
        var domElementOnCanvasElement = me.canvas.canvasElement.querySelector(
          id,
        );
        if (domElementOnCanvasElement) {
          domElementOnCanvasElement.addEventListener(eventType, function (e) {
            callbackFunc(me, e, {
              type: "dom",
              id,
              eventType,
            });
          });
        }
      }
    };
    CIfFrame.prototype.adjustFrameBorderRadius = function () {
      var me = this;
      if (parseInt(me.frameBorderRadius, 10) > 0) {
        var borderData = me.getFrameInnerBorderRadius(me, me._hasFocus);
        var frameAppearance = borderData.frameAppearance;
        var innerBorderRadius = borderData.innerBorderRadius;
        var titleBarHeight = parseInt(frameAppearance.titleBarHeight, 10);
        if (me.showTitleBar) {
          me.canvas.canvasElement.style.borderBottomRightRadius =
            innerBorderRadius;
          me.canvas.canvasElement.style.borderBottomLeftRadius =
            innerBorderRadius;
          me.iframe.style.borderBottomRightRadius = innerBorderRadius;
          me.iframe.style.borderBottomLeftRadius = innerBorderRadius;
          me.titleBar.style.borderTopLeftRadius = innerBorderRadius;
          me.titleBar.style.borderTopRightRadius = innerBorderRadius;
        } else {
          me.canvas.canvasElement.style.borderRadius = innerBorderRadius;
          me.iframe.style.borderRadius = innerBorderRadius;
        }
        if (me.dframe) {
          if (titleBarHeight === 0) {
            if (!me.dframe.style.borderTopRightRadius) {
              me.dframe.style.borderTopRightRadius = innerBorderRadius;
            }
            if (!me.dframe.style.borderTopLeftRadius) {
              me.dframe.style.borderTopLeftRadius = innerBorderRadius;
            }
          }
          me.dframe.style.borderBottomRightRadius = innerBorderRadius;
          me.dframe.style.borderBottomLeftRadius = innerBorderRadius;
        }
      }
    };
    CIfFrame.prototype.handleReleasingFocus = function (e) {
      var me = this;
      var focused = me._hasFocus;
      me._hasFocus = false;
      me.titleBar.className = me.titleBarClassNameDefault;
      if (me.titleBarColorDefault) {
        me.titleBar.style.background = me.titleBarColorDefault;
      }
      me.titleBar.style.color = me.titleBarCaptionColorDefault;
      if (me.frameBorderColorDefault) {
        me.htmlElement.style.borderColor = me.frameBorderColorDefault;
      }
      if (me.frameBorderWidthDefault) {
        me.htmlElement.style.borderWidth = me.frameBorderWidthDefault;
        me.adjustFrameBorderRadius();
      }
      if (me.htmlElement.typeName == "cifwindow") {
        if (me.overrayTransparentScreenEnabled) {
          me.transparence.style.width = parseInt(me.iframe.width, 10) + "px";
          me.transparence.style.height = parseInt(me.iframe.height, 10) + "px";
        }
      }
      for (var frameComponentId in me.frameComponentMap) {
        var frameComponent = me.frameComponentMap[frameComponentId];
        frameComponent.handleReleasingFocus();
      }
      if (me.titleBarBorderBottomDefault) {
        me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
      }
      if (focused) {
        me.eventEmitter.emit("blur", { target: me });
      }
      return me;
    };
    CIfFrame.prototype.handleTakingFocus = function (e) {
      var me = this;
      var focused = me._hasFocus;
      me._hasFocus = true;
      me._hasFocus = Date.now();
      if (me.overrayTransparentScreenEnabled) {
        me.transparence.style.width = "0px";
        me.transparence.style.height = "0px";
      }
      me.titleBar.className = me.titleBarClassNameFocused;
      if (me.titleBarColorFocused) {
        me.titleBar.style.background = me.titleBarColorFocused;
      }
      me.titleBar.style.color = me.titleBarCaptionColorFocused;
      if (me.frameBorderColorFocused) {
        me.htmlElement.style.borderColor = me.frameBorderColorFocused;
      }
      if (me.frameBorderWidthFocused) {
        me.htmlElement.style.borderWidth = me.frameBorderWidthFocused;
        me.adjustFrameBorderRadius();
      }
      if (me.titleBarBorderBottomFocused) {
        me.titleBar.style.borderBottom = me.titleBarBorderBottomFocused;
      }
      for (var frameComponentId in me.frameComponentMap) {
        var frameComponent = me.frameComponentMap[frameComponentId];
        frameComponent.handleTakingFocus();
      }
      if (!focused) {
        me.eventEmitter.emit("focus", { target: me });
      }
      return me;
    };
    CFrame.prototype.show = function (model) {
      var me = this;
      me.htmlElement.style.display = "flex";
      if (model && model.requestFocus == false) {
      } else {
        me.requestFocus();
      }
      return me;
    };
    CFrame.prototype.showModal = function (onCloseListener) {
      var me = this;
      var appearance = new CFrameAppearance();
      appearance.showTitleBar = true;
      appearance.showCloseButton = false;
      appearance.frameBorderRadius = "0px";
      appearance.frameBorderStyle = "none";
      appearance.frameBorderWidthDefault = "0px";
      appearance.frameBorderWidthFocused = "0px";
      appearance.frameBoxShadow = null;
      appearance.frameBackgroundColor = "transparent";
      appearance.frameComponents = [];
      appearance.frameHeightAdjust = 0;
      appearance.titleBarHeight = "0px";
      appearance.titleBarBorderBottomFocused = null;
      appearance.titleBarCaptionLeftMargin = "0px";
      appearance.onInitialize = function () {
      };
      appearance.pullUpDisabled = true;
      var windowManager = me.parentCanvas;
      var modalBackgroundWindowId =
        DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX + me.id;
      var modalBackgroundFrame = new CIfFrame(
        modalBackgroundWindowId,
        0,
        0,
        1,
        1,
        appearance,
      );
      modalBackgroundFrame.setSize(window.innerWidth, window.innerHeight, true);
      modalBackgroundFrame.setResizable(false);
      window.addEventListener("resize", function () {
        modalBackgroundFrame.setSize(
          window.innerWidth,
          window.innerHeight,
          true,
        );
      });
      me.modalBackgroundWindowId = modalBackgroundWindowId;
      modalBackgroundFrame.hide();
      windowManager.addWindow(modalBackgroundFrame);
      modalBackgroundFrame.setTitle("").getFrameView().innerHTML =
        '<div class="jsframe-modal-window-background"></div>';
      modalBackgroundFrame.getFrameView().style.backgroundColor =
        "rgba(0,0,0,0.0)";
      modalBackgroundFrame.show();
      me.show();
      if (onCloseListener) {
        me.setOnCloseFrameListener(onCloseListener);
      }
    };
    CFrame.prototype.getWindowManager = function () {
      var me = this;
      return me.parentCanvas;
    };
    CIfFrame.prototype.hide = function () {
      var me = this;
      me.htmlElement.style.display = "none";
      return me;
    };
    CIfFrame.prototype.onmouseDown = function (e) {
      var refHtmlElement = this;
      document.body.ondrag = function () {
        return false;
      };
      refHtmlElement.decorator = CFrame.prototype.onmouseDown;
      refHtmlElement.decorator(e);
      var refCIfFrame = refHtmlElement.parent;
      var refCWindowManager = refHtmlElement.parentCanvas;
      for (var windowId in refCWindowManager.beanList) {
        var objCIfFrame = refCWindowManager.beanList[windowId];
        if (windowId == refCIfFrame.getWindowId()) {
        } else {
          objCIfFrame.handleReleasingFocus();
        }
      }
      refCIfFrame.handleTakingFocus();
    };
    CIfFrame.prototype.mouseUp = function (e) {
      var refCIfFrame = this;
      if (
        refCIfFrame.overrayTransparentScreenEnabled ||
        refCIfFrame.overrayTransparentScreenOnResize
      ) {
        if (refCIfFrame.parentCanvas.onTopObject == refCIfFrame) {
          refCIfFrame.transparence.style.width = "0px";
          refCIfFrame.transparence.style.height = "0px";
        } else {
          if (refCIfFrame.overrayTransparentScreenEnabled) {
            refCIfFrame.transparence.style.width =
              parseInt(refCIfFrame.iframe.width) + "px";
            refCIfFrame.transparence.style.height =
              parseInt(refCIfFrame.iframe.height) + "px";
          }
        }
      }
      refCIfFrame.decorator = CFrame.prototype.mouseUp;
      refCIfFrame.decorator(e);
      document.body.ondrag = null;
      document.body.onselectstart = null;
      refCIfFrame.transparence.style.pointerEvents = "none";
    };
    CIfFrame.prototype.setMinFrameSize = function (width, height) {
      var me = this;
      me.minFrameWidth = width;
      me.minWindowHeight = height;
    };
    CIfFrame.prototype.resize = function (
      deltaLeft,
      deltaTop,
      deltaWidth,
      deltaHeight,
      byUser,
    ) {
      var refCIfFrame = this;
      if (!refCIfFrame.resizable && byUser) {
        return null;
      }
      var prevSize = refCIfFrame.getSize();
      var tmpLeft = parseInt(refCIfFrame.htmlElement.style.left, 10);
      var tmpTop = parseInt(refCIfFrame.htmlElement.style.top, 10);
      var tmpWidth = parseInt(refCIfFrame.htmlElement.style.width, 10);
      var tmpHeight = parseInt(refCIfFrame.htmlElement.style.height, 10);
      if (
        byUser &&
        tmpWidth + deltaWidth < refCIfFrame.minFrameWidth & deltaWidth < 0
      ) {
        refCIfFrame.htmlElement.style.width = tmpWidth + "px";
        deltaWidth = 0;
      }
      if (
        byUser &&
        tmpHeight + deltaHeight < refCIfFrame.minWindowHeight & deltaHeight < 0
      ) {
        refCIfFrame.htmlElement.style.height = tmpHeight + "px";
        deltaHeight = 0;
      }
      refCIfFrame.htmlElement.style.left = tmpLeft + deltaLeft + "px";
      refCIfFrame.htmlElement.style.top = tmpTop + deltaTop + "px";
      refCIfFrame.htmlElement.style.width = tmpWidth + deltaWidth + "px";
      refCIfFrame.htmlElement.style.height = tmpHeight + deltaHeight + "px";
      var tmpCanvasWidth = parseInt(
        refCIfFrame.canvas.canvasElement.style.width,
        10,
      );
      var tmpCanvasHeight = parseInt(
        refCIfFrame.canvas.canvasElement.style.height,
        10,
      );
      refCIfFrame.canvas.canvasElement.style.width = tmpCanvasWidth +
        deltaWidth + "px";
      refCIfFrame.canvas.canvasElement.style.height = tmpCanvasHeight +
        deltaHeight + "px";
      refCIfFrame.titleBar.style.width = tmpCanvasWidth - refCIfFrame.ifDelta +
        deltaWidth + 0 + "px";
      refCIfFrame.iframe.width = tmpCanvasWidth - refCIfFrame.ifDelta +
        deltaWidth + 0 + "px";
      refCIfFrame.iframe.height = tmpCanvasHeight - refCIfFrame.ifDelta +
        deltaHeight + refCIfFrame.frameHeightAdjust + "px";
      if (
        refCIfFrame.overrayTransparentScreenEnabled ||
        refCIfFrame.overrayTransparentScreenOnResize
      ) {
        refCIfFrame.transparence.style.width =
          parseInt(refCIfFrame.iframe.width) + "px";
        refCIfFrame.transparence.style.height =
          parseInt(refCIfFrame.iframe.height) + "px";
      }
      for (var frameComponentId in refCIfFrame.frameComponentMap) {
        var frameComponent = refCIfFrame.frameComponentMap[frameComponentId];
        frameComponent.updateAlign();
      }
      for (var beanName in refCIfFrame.canvas.beanList) {
        var tmpBean = refCIfFrame.canvas.beanList[beanName];
        if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
          if (tmpBean.htmlElement.usage == "RD") {
            tmpBean.htmlElement.style.left =
              parseInt(tmpBean.htmlElement.style.left) + deltaWidth + "px";
            tmpBean.htmlElement.style.top =
              parseInt(tmpBean.htmlElement.style.top) + deltaHeight + "px";
          } else if (tmpBean.htmlElement.usage == "DD") {
            tmpBean.htmlElement.style.width =
              parseInt(tmpBean.htmlElement.style.width) + deltaWidth + "px";
            tmpBean.htmlElement.style.top =
              parseInt(tmpBean.htmlElement.style.top) + deltaHeight + "px";
          } else if (tmpBean.htmlElement.usage == "RR") {
            tmpBean.htmlElement.style.left =
              parseInt(tmpBean.htmlElement.style.left) + deltaWidth + "px";
            tmpBean.htmlElement.style.height =
              parseInt(tmpBean.htmlElement.style.height) + deltaHeight + "px";
          }
        }
      }
      var crrSize = refCIfFrame.getSize();
      if (
        prevSize.width !== crrSize.width || prevSize.height !== crrSize.height
      ) {
        refCIfFrame.eventEmitter.emit(
          "resize",
          refCIfFrame._getCurrentSizePos(),
        );
      }
    };
    CIfFrame.prototype._getCurrentSizePos = function () {
      var me = this;
      var crrSize = me.getSize();
      var crrPos = me.getPosition();
      return { target: me, pos: crrPos, size: crrSize };
    };
    CIfFrame.prototype.resizeDirect = function (width, height, byUser) {
      var refCIfFrame = this;
      if (!refCIfFrame.resizable && byUser) {
        return null;
      }
      refCIfFrame.htmlElement.style.width = width + "px";
      refCIfFrame.htmlElement.style.height = height + "px";
      var tmpCanvasWidth = parseInt(
        refCIfFrame.canvas.canvasElement.style.width,
      );
      var tmpCanvasHeight = parseInt(
        refCIfFrame.canvas.canvasElement.style.height,
      );
      refCIfFrame.canvas.canvasElement.style.width = width + "px";
      refCIfFrame.canvas.canvasElement.style.height = height -
        refCIfFrame.titleBar.style.height + "px";
      refCIfFrame.titleBar.style.width = width - refCIfFrame.ifDelta + "px";
      refCIfFrame.iframe.width = width - refCIfFrame.ifDelta + "px";
      refCIfFrame.iframe.height = height - refCIfFrame.ifDelta +
        refCIfFrame.frameHeightAdjust + "px";
      if (
        refCIfFrame.overrayTransparentScreenEnabled ||
        refCIfFrame.overrayTransparentScreenOnResize
      ) {
        refCIfFrame.transparence.style.width =
          parseInt(refCIfFrame.iframe.width) + "px";
        refCIfFrame.transparence.style.height =
          parseInt(refCIfFrame.iframe.height) + "px";
      }
      for (var frameComponentId in refCIfFrame.frameComponentMap) {
        var frameComponent = refCIfFrame.frameComponentMap[frameComponentId];
        frameComponent.updateAlign();
      }
      for (var beanName in refCIfFrame.canvas.beanList) {
        var tmpBean = refCIfFrame.canvas.beanList[beanName];
        if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
          if (tmpBean.htmlElement.usage == "RD") {
            tmpBean.htmlElement.style.left = width + "px";
            tmpBean.htmlElement.style.top = height + "px";
          } else if (tmpBean.htmlElement.usage == "DD") {
            tmpBean.htmlElement.style.width = width + "px";
            tmpBean.htmlElement.style.top = height + "px";
          } else if (tmpBean.htmlElement.usage == "RR") {
            tmpBean.htmlElement.style.left = width + "px";
            tmpBean.htmlElement.style.height = height + "px";
          }
        }
      }
    };
    CIfFrame.prototype.requestFocus = function () {
      var me = this;
      var beanList = me.parentCanvas.beanList;
      for (var windowId in beanList) {
        var tmpIfWindow = beanList[windowId];
        if (windowId == me.getWindowId()) {
          tmpIfWindow.handleTakingFocus();
        } else {
          tmpIfWindow.handleReleasingFocus();
        }
      }
      me.parentCanvas.pullUp(me.id);
    };
    CIfFrame.prototype.setUrl = function (url) {
      var me = this;
      return new Promise(function (resolve, reject) {
        if (url) {
          me.setUseIframe(true);
        } else {
          me.setUseIframe(false);
          resolve();
        }
        me.iframe.src = url;
        me.iframe.onload = function () {
          var funcOnMouseMove = function (e) {
            var clientX = e.pageX;
            var clientY = e.pageY;
            if (TOUCH_ENABLED) {
              if (e.type === "touchmove") {
                var changedTouches = e.changedTouches;
                if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
                  var touches = e.touches;
                  if (touches.length === 1) {
                    clientX = changedTouches[0].pageX;
                    clientY = changedTouches[0].pageY;
                  } else {
                    return true;
                  }
                } else {
                  clientX = changedTouches[0].pageX;
                  clientY = changedTouches[0].pageY;
                }
              }
            }
            var frameLeft = me.getLeft();
            var frameTop = me.getTop();
            var eventFromIframe = document.createEvent("MouseEvents");
            eventFromIframe.initMouseEvent(
              "mousemove",
              true,
              false,
              window,
              e.detail,
              e.screenX,
              e.screenY,
              clientX + frameLeft,
              clientY + frameTop,
              e.ctrlKey,
              e.altKey,
              e.shiftKey,
              e.metaKey,
              e.button,
              null,
            );
            me.parentCanvas.windowMouseMove(eventFromIframe);
            if (me.onMouseMoveOnIframe) {
              me.onMouseMoveOnIframe(eventFromIframe);
            }
          };
          me.iframe.contentWindow.document.onmousemove = funcOnMouseMove;
          me.iframe.contentWindow.document.ontouchmove = funcOnMouseMove;
          var funcOnMouseUp = function (e) {
            var clientX = e.pageX;
            var clientY = e.pageY;
            if (TOUCH_ENABLED) {
              if (e.type === "touchend") {
                var changedTouches = e.changedTouches;
                clientX = changedTouches[0].pageX;
                clientY = changedTouches[0].pageY;
              }
            }
            var frameLeft = me.getLeft();
            var frameTop = me.getTop();
            var eventFromIframe = document.createEvent("MouseEvents");
            eventFromIframe.initMouseEvent(
              "mouseup",
              true,
              false,
              window,
              e.detail,
              e.screenX,
              e.screenY,
              clientX + frameLeft,
              clientY + frameTop,
              e.ctrlKey,
              e.altKey,
              e.shiftKey,
              e.metaKey,
              e.button,
              null,
            );
            me.parentCanvas.windowMouseUp(eventFromIframe);
            if (me.onMouseUpOnIframe) {
              me.onMouseUpOnIframe(eventFromIframe);
            }
          };
          me.iframe.contentWindow.document.onmouseup = funcOnMouseUp;
          me.iframe.contentWindow.document.ontouchend = funcOnMouseUp;
          resolve(me, me.iframe.contentWindow.document);
        };
      });
    };
    CIfFrame.prototype.getIfDocument = function () {
      var me = this;
      return me.iframe.contentWindow.document;
    };
    CIfFrame.prototype.setScrolling = function (str) {
      var me = this;
      me.iframe.scrolling = str;
    };
    CIfFrame.prototype.getScrolling = function (str) {
      var me = this;
      return me.iframe.scrolling;
    };
    CIfFrame.prototype.setResizable = function (enabled) {
      var me = this;
      me.resizable = enabled;
      me.enableMarkers(enabled);
      return me;
    };
    CIfFrame.prototype.setControl = function (model) {
      var me = this;
      if (model) {
        model.frame = me;
        me.control = me.jsFrame.createWindowEventHelper(model);
        me.control.setupDefaultEvents();
      }
    };
    inherit(CWindowManager, CCanvas);
    function CWindowManager(parentElement, canvasId, left, top, width, height) {
      CWindowManager.superConstructor.call(
        this,
        parentElement,
        canvasId,
        left,
        top,
        width,
        height,
      );
      var me = this;
      document.addEventListener("click", function (evt) {
        for (var windowId in me.beanList) {
          var beanFrame = me.beanList[windowId];
          beanFrame.onBodyClicked(evt);
        }
      });
    }
    CWindowManager.prototype.getWindow = function (windowId) {
      var me = this;
      return me.beanList[windowId];
    };
    CWindowManager.prototype.addWindow = function (window2) {
      var me = this;
      var windowId = window2.getWindowId();
      var name = window2.getName();
      me.beanIdName[windowId] = name;
      me.beanNameId[name] = windowId;
      me.addBean(window2);
    };
    CWindowManager.prototype.containsWindowName = function (name) {
      var me = this;
      var windowId = me.beanNameId[name];
      if (windowId) {
        return true;
      }
      return false;
    };
    CWindowManager.prototype.getWindowByName = function (name) {
      var me = this;
      var windowId = me.beanNameId[name];
      if (windowId) {
        return me.getWindow(windowId);
      } else {
        return null;
      }
    };
    CWindowManager.prototype.windowMouseMove = function (e) {
      var me = this;
      if (me.currentObject == null) {
        return null;
      }
      var childWindowMoved = false;
      var beanList = me.beanList;
      for (var windowId in beanList) {
        var targetWindow = beanList[windowId];
        var eventData = targetWindow.canvas.mouseMove(e);
        childWindowMoved = childWindowMoved | eventData != null;
        if (eventData != null) {
          if (eventData.targetTypeName == "cmarkerwindow") {
            var targetObject = eventData.targetObject;
            targetWindow.transparence.style.pointerEvents = "auto";
            if (targetObject.usage == "RD") {
              targetWindow.resize(
                0,
                0,
                eventData.deltaX,
                eventData.deltaY,
                true,
              );
            } else if (targetObject.usage == "DD") {
              targetWindow.resize(0, 0, 0, eventData.deltaY, true);
            } else if (targetObject.usage == "RR") {
              targetWindow.resize(0, 0, eventData.deltaX, 0, true);
            }
          }
        }
      }
      if (!childWindowMoved && this.mouseDownSource != "childcanvas") {
        me.mouseMove(e);
      }
    };
    CWindowManager.prototype.windowMouseUp = function (e) {
      var me = this;
      me.mouseUp(e);
      var beanList = me.beanList;
      for (var windowId in beanList) {
        var objWindow = beanList[windowId];
        objWindow.mouseUp(e);
      }
    };
    CWindowManager.prototype.removeBean = function (windowId) {
      var me = this;
      var beanList = me.beanList;
      var targetBean = beanList[windowId];
      if (targetBean == null) {
        return;
      }
      var removeTargetBeanHasFocus = targetBean._hasFocus;
      me.canvasElement.removeChild(targetBean.htmlElement);
      delete beanList[windowId];
      var beanName = me.beanIdName[windowId];
      if (beanName) {
        delete me.beanIdName[windowId];
        delete me.beanNameId[beanName];
      }
      var maxFocusTime = 0;
      var lastFocusedFrame = null;
      if (removeTargetBeanHasFocus) {
        for (var windowId in beanList) {
          var frame = beanList[windowId];
          if (maxFocusTime <= frame._hasFocusTime && !frame.pullUpDisabled) {
            maxFocusTime = frame._hasFocusTime;
            lastFocusedFrame = frame;
          }
        }
        if (lastFocusedFrame) {
          lastFocusedFrame.requestFocus();
        }
      }
      targetBean.parentCanvas = null;
    };
    inherit(CMarkerWindow, CBeanFrame);
    function CMarkerWindow(
      windowId,
      left,
      top,
      width,
      height,
      zindex,
      usage,
      color,
    ) {
      var me = this;
      CMarkerWindow.superConstructor.call(
        this,
        windowId,
        left,
        top,
        width,
        height,
        zindex,
        usage,
      );
      me.htmlElement.typeName = "cmarkerwindow";
      me.htmlElement.usage = usage;
      me.htmlElement.isRangeLimited = false;
      me.htmlElement.style.borderStyle = "none";
      me.htmlElement.style.zIndex = 1;
      if (color) {
        me.htmlElement.style.background = color;
      }
      me.getWindowType = function () {
        return "CMarkerWindow";
      };
    }
    function JSFrame(model) {
      var me = this;
      var parentElement = null;
      me.isWindowManagerFixed = true;
      if (model && model.fixed == false) {
        me.isWindowManagerFixed = false;
      }
      if (model && model.parentElement) {
        parentElement = model.parentElement;
      }
      me.hAlign = "left";
      me.vAlign = "top";
      if (model && model.horizontalAlign) {
        me.hAlign = model.horizontalAlign;
      }
      if (model && model.verticalAlign) {
        me.vAlign = model.verticalAlign;
      }
      me.pullToRefresh = false;
      if (model && typeof model.pullToRefresh === "boolean") {
        me.pullToRefresh = model.pullToRefresh;
      }
      me.touchActionManipulation = true;
      if (model && typeof model.touchActionManipulation === "boolean") {
        me.touchActionManipulation = model.touchActionManipulation;
      }
      if (!parentElement) {
        if (me.isWindowManagerFixed) {
          var topParentDiv = document.createElement("div");
          topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
          topParentDiv.setAttribute(
            "style",
            "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
              ":0px;margin:0px;padding:0px;",
          );
          document.body.appendChild(topParentDiv);
          parentElement = topParentDiv;
        } else {
          var topParentDiv = document.createElement("div");
          topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
          topParentDiv.setAttribute(
            "style",
            "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
              ":0px;margin:0px;padding:0px;",
          );
          document.body.appendChild(topParentDiv);
          parentElement = topParentDiv;
        }
      } else {
        if (me.isWindowManagerFixed) {
          var topParentDiv = document.createElement("div");
          topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
          topParentDiv.setAttribute(
            "style",
            "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
              ":0px;margin:0px;padding:0px;",
          );
          parentElement.appendChild(topParentDiv);
        } else {
          var topParentDiv = document.createElement("div");
          topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
          topParentDiv.setAttribute(
            "style",
            "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
              ":0px;margin:0px;padding:0px;",
          );
          parentElement.appendChild(topParentDiv);
        }
      }
      if (MOUSE_ENABLED) {
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("mousemove", mouseMove);
      }
      if (TOUCH_ENABLED) {
        if ("ontouchend" in window) {
          var funcOnTouchEnd = function (evt) {
            mouseUp.bind(this)(evt);
          };
          document.addEventListener("touchend", funcOnTouchEnd);
        }
        if ("ontouchmove" in window) {
          if (me.touchActionManipulation) {
            me.doEnableTouchActionManipulation();
          }
          if (!me.pullToRefresh) {
            me.doDisablePullToRefresh();
          }
          var funcOnTouchMove = function (evt) {
            evt.preventDefault();
            mouseMove.bind(this)(evt);
          };
          document.addEventListener("touchmove", funcOnTouchMove);
        }
      }
      me.windowManager = new CWindowManager(
        parentElement,
        "windowManager_" + me.generateUUID(),
        0,
        0,
        0,
        0,
      );
      me.domPartsBuilder = null;
      function mouseUp(e) {
        me.windowManager.windowMouseUp(e);
      }
      function mouseMove(e) {
        me.windowManager.windowMouseMove(e);
      }
    }
    JSFrame.prototype.doEnableTouchActionManipulation = function () {
      var bodyStyle = document.documentElement.getAttribute("style");
      if (!bodyStyle) {
        bodyStyle = "";
      } else {
        if (!bodyStyle.endsWith(";")) {
          bodyStyle += ";";
        }
      }
      if (bodyStyle.indexOf("touch-action") === -1) {
        bodyStyle +=
          "-ms-touch-action: manipulation;touch-action: manipulation;";
        document.documentElement.setAttribute("style", bodyStyle);
      }
    };
    JSFrame.prototype.doDisablePullToRefresh = function () {
      var bodyStyle = document.body.getAttribute("style");
      if (!bodyStyle) {
        bodyStyle = "";
      } else {
        if (!bodyStyle.endsWith(";")) {
          bodyStyle += ";";
        }
      }
      if (bodyStyle.indexOf("overscroll-behavior-y") === -1) {
        bodyStyle += "overscroll-behavior-y: contain;";
        document.body.setAttribute("style", bodyStyle);
      }
    };
    JSFrame.prototype.getDomPartsBuilder = function () {
      var me = this;
      if (!me.domPartsBuilder) {
        me.domPartsBuilder = new CDomPartsBuilder();
      }
      return me.domPartsBuilder;
    };
    JSFrame.prototype.create = function (model) {
      var me = this;
      var properties = {};
      properties.name = model.name;
      var title = model.title;
      var left = model.left;
      var top = model.top;
      var width = model.width;
      var height = model.height;
      var appearance = model.appearance;
      var presetWindowName = model.preset;
      var presetWindowParam = model.presetParam;
      var appearanceName = model.appearanceName;
      var appearanceParam = model.appearanceParam;
      var style = model.style;
      var minWidth = model.minWidth;
      var minHeight = model.minHeight;
      var html = model.html;
      var resizable = model.resizable;
      var movable = model.movable;
      var url = model.url;
      var urlLoaded = model.urlLoaded;
      var presetParam = model.presetParam;
      var presetWindow;
      if (presetWindowName) {
        var presetWindowObj = this.getPresetWindow(presetWindowName);
        presetWindow = presetWindowObj.getPresetWindow(presetParam);
        appearance = this.createPresetStyle(
          presetWindow.appearanceName,
          { appearanceParam: presetWindow.appearanceParam },
        );
      } else if (appearanceName) {
        appearance = this.createPresetStyle(
          appearanceName,
          { appearanceParam },
        );
      }
      if (model.clientHeight) {
        var windowTitleBarHeight = parseInt(appearance.titleBarHeight || 0) -
          appearance.frameHeightAdjust;
        height = model.clientHeight + windowTitleBarHeight;
      }
      var frame = this.createFrame(
        left,
        top,
        width,
        height,
        appearance,
        properties,
      );
      if (title) {
        frame.setTitle(title);
      }
      if (html) {
        frame.setHTML(html);
      }
      if (url) {
        var urlPromise = frame.setUrl(url);
        if (urlLoaded) {
          urlPromise.then(urlLoaded);
        }
      }
      if (resizable == false) {
        frame.setResizable(false);
      }
      if (movable == false) {
        frame.setMovable(false);
      }
      if (minWidth && minHeight) {
        frame.minFrameWidth = minWidth;
      }
      if (minHeight) {
        frame.minWindowHeight = minHeight;
        if (model.clientHeight) {
          frame.minWindowHeight = minHeight + windowTitleBarHeight;
        }
      }
      if (style) {
        var frameView = frame.getFrameView();
        for (var name in style) {
          if (style.hasOwnProperty(name)) {
            frameView.style[name] = style[name];
          }
        }
      }
      if (presetWindow) {
        presetWindow.setupPresetWindow(frame);
      }
      return frame;
    };
    JSFrame.prototype.createFrame = function (
      left,
      top,
      width,
      height,
      appearance,
      properties,
    ) {
      var me = this;
      if (!appearance) {
        appearance = me.createFrameAppearance();
      }
      appearance.initialize();
      var windowId = "window_" + me.generateUUID();
      if (!left) {
        left = 0;
      }
      if (!top) {
        top = 0;
      }
      if (!width) {
        width = 128;
      }
      if (!height) {
        height = 128;
      }
      var frame = new CIfFrame(windowId, left, top, width, height, appearance);
      frame.jsFrame = me;
      if (properties && properties.name) {
        frame.setName(properties.name);
      }
      frame.hide();
      me.windowManager.addWindow(frame);
      if (appearance.getTitleBarStyle) {
        var titleBarStyle = appearance.getTitleBarStyle();
        if (titleBarStyle) {
          frame.setTitleBarClassName(
            titleBarStyle.titleBarClassNameDefault,
            titleBarStyle.titleBarClassNameFocused,
          );
        }
      } else if (
        appearance.titleBarClassNameDefault &&
        appearance.titleBarClassNameFocused
      ) {
        frame.setTitleBarClassName(
          appearance.titleBarClassNameDefault,
          appearance.titleBarClassNameFocused,
        );
      } else if (appearance.titleBarClassNameDefault) {
        frame.setTitleBarClassName(
          appearance.titleBarClassNameDefault,
          appearance.titleBarClassNameDefault,
        );
      }
      return frame;
    };
    JSFrame.prototype.containsWindowName = function (windowName) {
      var me = this;
      return me.windowManager.containsWindowName(windowName);
    };
    JSFrame.prototype.getWindowByName = function (windowName) {
      var me = this;
      return me.windowManager.getWindowByName(windowName);
    };
    JSFrame.prototype.generateUUID = function () {
      var unixTime = Date.now();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (unixTime + Math.random() * 16) % 16 | 0;
          unixTime = Math.floor(unixTime / 16);
          return (c == "x" ? r : r & 3 | 8).toString(16);
        },
      );
      return uuid;
    };
    JSFrame.prototype.createFrameAppearance = function () {
      return new CFrameAppearance();
    };
    JSFrame.prototype.createAnimator = function () {
      return new CSimpleLayoutAnimator();
    };
    JSFrame.prototype.createWindowEventHelper = function (model) {
      var me = this;
      if (!model) {
        model = {};
      }
      model.verticalAlign = me.vAlign;
      model.horizontalAlign = me.hAlign;
      var wndEventHelper = new WindowEventHelper(model);
      return wndEventHelper;
    };
    JSFrame.prototype.getPresetWindow = function (presetName, param) {
      if (presetWindows[presetName]) {
        var presetObj = presetWindows[presetName];
        return presetObj;
      } else {
        return null;
      }
    };
    JSFrame.prototype.createPresetStyle = function (presetName, param) {
      var me = this;
      var apr = me.createFrameAppearance();
      if (param && param.focusedFrameOnly) {
        apr.focusedFrameOnly = param.focusedFrameOnly;
      }
      if (presetStyles[presetName]) {
        var styleObj = presetStyles[presetName];
        var appearanceParam = null;
        if (param && param.appearanceParam) {
          appearanceParam = param.appearanceParam;
        }
        return styleObj.getStyle(apr, appearanceParam);
      }
      console.error(
        '[JSFrame] Preset appearance "' + presetName + '" not found.',
      );
      return apr;
    };
    JSFrame.prototype.showToast = function (model) {
      if (!model) {
        return;
      }
      var me = this;
      var toastHeight = 60;
      var toastWidth = 260;
      var openCloseDurationMs = 300;
      var stayDurationMs = 1e3;
      var startY = window.innerHeight - 10 - toastHeight / 2;
      var endY = window.innerHeight - 20 - toastHeight / 2;
      var myHtml = "";
      var showButton = false;
      var style = {
        borderRadius: "10px",
        background: "rgba(0,0,0,0.8)",
      };
      if (model.style) {
        style = model.style;
      }
      if (model.height) {
        toastHeight = model.height;
      }
      if (model.width) {
        toastWidth = model.width;
      }
      if (model.duration) {
        stayDurationMs = model.duration;
      }
      if (model.align) {
        if (model.align == "top") {
          startY = 10 + toastHeight / 2;
          endY = 20 + toastHeight / 2;
        } else if (model.align == "center") {
          startY = window.innerHeight / 2;
          endY = window.innerHeight / 2;
        } else {
        }
      }
      if (model.html) {
        myHtml = model.html;
      }
      if (model.text) {
        myHtml = model.text;
      }
      if (model.closeButton == true) {
        showButton = true;
      } else {
        showButton = false;
      }
      var apr = me.createPresetStyle("toast");
      if (style.borderRadius) {
        apr.frameBorderRadius = style.borderRadius;
      }
      if (model.closeButtonColor) {
        apr.captionClor = model.closeButtonColor;
      }
      var frame = me.create({
        name: "toast_" + me.generateUUID(),
        width: toastWidth,
        height: toastHeight,
        movable: false,
        resizable: false,
        appearance: apr,
        style,
        html:
          '<div id="my_element" style="box-sizing:border-box;display: flex;justify-content: center;align-items: center;padding:10px;font-size:16px;color:darkgray;height:' +
          toastHeight + 'px">' + myHtml + "</div>",
      });
      if (showButton) {
      } else {
        frame.hideFrameComponent("closeButton");
      }
      var requestFocusAfterAnimation = false;
      var startX = window.innerWidth / 2;
      if (me.hAlign == "right") {
        startX = -startX;
      }
      if (me.vAlign == "bottom") {
        startY = startY - window.innerHeight;
        endY = endY - window.innerHeight;
      }
      var animator = me.createAnimator();
      animator.set(frame).setDuration(openCloseDurationMs).fromPosition(
        startX,
        startY,
        "CENTER_CENTER",
      ).toPosition(startX, endY, "CENTER_CENTER").toAlpha(1).fromAlpha(0).start(
        0,
        requestFocusAfterAnimation,
      ).then(function (animatorObj) {
        return animatorObj.setDuration(openCloseDurationMs).fromPosition(
          startX,
          endY,
          "CENTER_CENTER",
        ).toPosition(startX, startY, "CENTER_CENTER").fromAlpha(1).toAlpha(0.5)
          .start(stayDurationMs, requestFocusAfterAnimation);
      }).then(function (animatorObj) {
        var _frame = animatorObj.get();
        _frame.closeFrame();
      });
    };
    Object.freeze(DEF);
    module.exports = JSFrame;
  });
  require_JSFrame2();
})();
