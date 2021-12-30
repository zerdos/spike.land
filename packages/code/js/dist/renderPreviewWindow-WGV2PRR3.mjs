import "./chunk-42U43NKG.mjs";

// js/dist/renderPreviewWindow.mjs
import { jsx as jsx3 } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
import { css as css2, jsx as jsx2 } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
import React2 from "https://unpkg.com/@spike.land/esm@0.4.33/dist/react.mjs";
import { lazy, Suspense, useEffect, useRef, useState } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/react.mjs";
import { css, jsx } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
import { motion } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/framer-motion.mjs";
import React from "https://unpkg.com/@spike.land/esm@0.4.33/dist/react.mjs";
import { QRious } from "https://ga.jspm.io/npm:@spike.land/qrious@0.4.65/dist/QRious.mjs";
import { motion as motion2 } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/framer-motion.mjs";
function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
var e = window.emotionReact;
var { ThemeContext: n } = e;
var { jsx: a } = e;
var { keyframes: m } = e;
var { withEmotionCache: i } = e;
var e1 = window.React;
var { createContext: t1 } = e1;
var { useDebugValue: o1 } = e1;
var { useState: s1 } = e1;
var { useId: n1 } = e1;
var { useRef: c1 } = e1;
var { useContext: r1 } = e1;
var { useEffect: p1 } = e1;
var { useLayoutEffect: x1 } = e1;
var { useReducer: a1 } = e1;
var { useCallback: u } = e1;
var { forwardRef: l1 } = e1;
var { createElement: f } = e1;
var { createFactory: m1 } = e1;
var { createRef: d } = e1;
var { Fragment: i1 } = e1;
var { Component: R } = e1;
var { Suspense: C } = e1;
var { isValidElement: E } = e1;
var { memo: y } = e1;
var { useImperativeHandle: w } = e1;
var { Children: b } = e1;
var { lazy: g } = e1;
var { isLazy: z } = e1;
var { useMemo: F } = e1;
var { cloneElement: I } = e1;
var L = e1;
var mod = {
  Children: b,
  Component: R,
  Fragment: i1,
  Suspense: C,
  cloneElement: I,
  createContext: t1,
  createElement: f,
  createFactory: m1,
  createRef: d,
  default: L,
  forwardRef: l1,
  isLazy: z,
  isValidElement: E,
  lazy: g,
  memo: y,
  useCallback: u,
  useContext: r1,
  useDebugValue: o1,
  useEffect: p1,
  useId: n1,
  useImperativeHandle: w,
  useLayoutEffect: x1,
  useMemo: F,
  useReducer: a1,
  useRef: c1,
  useState: s1
};
function _setPrototypeOf(t11, e11) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(t7, e7) {
    t7.__proto__ = e7;
    return t7;
  };
  return _setPrototypeOf(t11, e11);
}
function _inheritsLoose(o6, e8) {
  o6.prototype = Object.create(e8.prototype);
  o6.prototype.constructor = o6;
  _setPrototypeOf(o6, e8);
}
var e2 = window.React;
var { createContext: t2 } = e2;
var { useDebugValue: o2 } = e2;
var { useState: s2 } = e2;
var { useId: n2 } = e2;
var { useRef: c2 } = e2;
var { useContext: r2 } = e2;
var { useEffect: p2 } = e2;
var { useLayoutEffect: x2 } = e2;
var { useReducer: a2 } = e2;
var { useCallback: u1 } = e2;
var { forwardRef: l2 } = e2;
var { createElement: f1 } = e2;
var { createFactory: m2 } = e2;
var { createRef: d1 } = e2;
var { Fragment: i2 } = e2;
var { Component: R1 } = e2;
var { Suspense: C1 } = e2;
var { isValidElement: E1 } = e2;
var { memo: y1 } = e2;
var { useImperativeHandle: w1 } = e2;
var { Children: b1 } = e2;
var { lazy: g1 } = e2;
var { isLazy: z1 } = e2;
var { useMemo: F1 } = e2;
var { cloneElement: I1 } = e2;
var L1 = e2;
var mod1 = {
  Children: b1,
  Component: R1,
  Fragment: i2,
  Suspense: C1,
  cloneElement: I1,
  createContext: t2,
  createElement: f1,
  createFactory: m2,
  createRef: d1,
  default: L1,
  forwardRef: l2,
  isLazy: z1,
  isValidElement: E1,
  lazy: g1,
  memo: y1,
  useCallback: u1,
  useContext: r2,
  useDebugValue: o2,
  useEffect: p2,
  useId: n2,
  useImperativeHandle: w1,
  useLayoutEffect: x2,
  useMemo: F1,
  useReducer: a2,
  useRef: c2,
  useState: s2
};
var _ = {};
var a3 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
_ = a3;
var r3 = _;
var t3 = {};
var i3 = r3;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
t3 = function() {
  function shim(e3, t, n6, r, s, m7) {
    if (m7 !== i3) {
      var o7 = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      o7.name = "Invariant Violation";
      throw o7;
    }
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var e12 = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  e12.PropTypes = e12;
  return e12;
};
var n3 = t3;
var r4 = {};
r4 = n3();
var s3 = r4;
function _objectWithoutPropertiesLoose(e9, t8) {
  if (e9 == null)
    return {};
  var o8 = {};
  var r7 = Object.keys(e9);
  var i6, n7;
  for (n7 = 0; n7 < r7.length; n7++) {
    i6 = r7[n7];
    t8.indexOf(i6) >= 0 || (o8[i6] = e9[i6]);
  }
  return o8;
}
var t4 = window.ReactDOM;
var c3 = t4;
var e4 = L1.createContext(null);
var s4 = {
  disabled: false
};
var a4 = true ? s3.oneOfType([
  s3.number,
  s3.shape({
    enter: s3.number,
    exit: s3.number,
    appear: s3.number
  }).isRequired
]) : null;
var u2 = true ? s3.oneOfType([
  s3.string,
  s3.shape({
    enter: s3.string,
    exit: s3.string,
    active: s3.string
  }),
  s3.shape({
    enter: s3.string,
    enterDone: s3.string,
    enterActive: s3.string,
    exit: s3.string,
    exitDone: s3.string,
    exitActive: s3.string
  })
]) : null;
var p3 = "unmounted";
var l3 = "exited";
var c4 = "entering";
var f2 = "entered";
var d2 = "exiting";
var E2 = function(n11) {
  _inheritsLoose(Transition, n11);
  function Transition(t12, e13) {
    var i11;
    i11 = n11.call(this, t12, e13) || this;
    var o11 = e13;
    var r11 = o11 && !o11.isMounting ? t12.enter : t12.appear;
    var s11;
    i11.appearStatus = null;
    if (t12.in) {
      if (r11) {
        s11 = l3;
        i11.appearStatus = c4;
      } else
        s11 = f2;
    } else
      s11 = t12.unmountOnExit || t12.mountOnEnter ? p3 : l3;
    i11.state = {
      status: s11
    };
    i11.nextCallback = null;
    return i11;
  }
  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(t21, e21) {
    var n21 = t21.in;
    return n21 && e21.status === p3 ? {
      status: l3
    } : null;
  };
  var a11 = Transition.prototype;
  a11.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  a11.componentDidUpdate = function componentDidUpdate(t31) {
    var e31 = null;
    if (t31 !== this.props) {
      var n31 = this.state.status;
      this.props.in ? n31 !== c4 && n31 !== f2 && (e31 = c4) : n31 !== c4 && n31 !== f2 || (e31 = d2);
    }
    this.updateStatus(false, e31);
  };
  a11.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  a11.getTimeouts = function getTimeouts() {
    var t41 = this.props.timeout;
    var e41, n42, i21;
    e41 = n42 = i21 = t41;
    if (t41 != null && typeof t41 !== "number") {
      e41 = t41.exit;
      n42 = t41.enter;
      i21 = t41.appear !== void 0 ? t41.appear : n42;
    }
    return {
      exit: e41,
      enter: n42,
      appear: i21
    };
  };
  a11.updateStatus = function updateStatus(t52, e52) {
    t52 === void 0 && (t52 = false);
    if (e52 !== null) {
      this.cancelNextCallback();
      e52 === c4 ? this.performEnter(t52) : this.performExit();
    } else {
      this.props.unmountOnExit && this.state.status === l3 && this.setState({
        status: p3
      });
    }
  };
  a11.performEnter = function performEnter(t62) {
    var e6 = this;
    var n52 = this.props.enter;
    var i31 = this.context ? this.context.isMounting : t62;
    var r21 = this.props.nodeRef ? [
      i31
    ] : [
      c3.findDOMNode(this),
      i31
    ], a21 = r21[0], u11 = r21[1];
    var p11 = this.getTimeouts();
    var l11 = i31 ? p11.appear : p11.enter;
    if (!t62 && !n52 || s4.disabled) {
      this.safeSetState({
        status: f2
      }, function() {
        e6.props.onEntered(a21);
      });
    } else {
      this.props.onEnter(a21, u11);
      this.safeSetState({
        status: c4
      }, function() {
        e6.props.onEntering(a21, u11);
        e6.onTransitionEnd(l11, function() {
          e6.safeSetState({
            status: f2
          }, function() {
            e6.props.onEntered(a21, u11);
          });
        });
      });
    }
  };
  a11.performExit = function performExit() {
    var t7 = this;
    var e7 = this.props.exit;
    var n6 = this.getTimeouts();
    var i42 = this.props.nodeRef ? void 0 : c3.findDOMNode(this);
    if (e7 && !s4.disabled) {
      this.props.onExit(i42);
      this.safeSetState({
        status: d2
      }, function() {
        t7.props.onExiting(i42);
        t7.onTransitionEnd(n6.exit, function() {
          t7.safeSetState({
            status: l3
          }, function() {
            t7.props.onExited(i42);
          });
        });
      });
    } else {
      this.safeSetState({
        status: l3
      }, function() {
        t7.props.onExited(i42);
      });
    }
  };
  a11.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  a11.safeSetState = function safeSetState(t8, e8) {
    e8 = this.setNextCallback(e8);
    this.setState(t8, e8);
  };
  a11.setNextCallback = function setNextCallback(t9) {
    var e9 = this;
    var n7 = true;
    this.nextCallback = function(i5) {
      if (n7) {
        n7 = false;
        e9.nextCallback = null;
        t9(i5);
      }
    };
    this.nextCallback.cancel = function() {
      n7 = false;
    };
    return this.nextCallback;
  };
  a11.onTransitionEnd = function onTransitionEnd(t10, e10) {
    this.setNextCallback(e10);
    var n8 = this.props.nodeRef ? this.props.nodeRef.current : c3.findDOMNode(this);
    var i6 = t10 == null && !this.props.addEndListener;
    if (n8 && !i6) {
      if (this.props.addEndListener) {
        var r31 = this.props.nodeRef ? [
          this.nextCallback
        ] : [
          n8,
          this.nextCallback
        ], s21 = r31[0], a31 = r31[1];
        this.props.addEndListener(s21, a31);
      }
      t10 != null && setTimeout(this.nextCallback, t10);
    } else
      setTimeout(this.nextCallback, 0);
  };
  a11.render = function render() {
    var e11 = this.state.status;
    if (e11 === p3)
      return null;
    var n9 = this.props, o21 = n9.children, s31 = (n9.in, n9.mountOnEnter, n9.unmountOnExit, n9.appear, n9.enter, n9.exit, n9.timeout, n9.addEndListener, n9.onEnter, n9.onEntering, n9.onEntered, n9.onExit, n9.onExiting, n9.onExited, n9.nodeRef, _objectWithoutPropertiesLoose(n9, [
      "children",
      "in",
      "mountOnEnter",
      "unmountOnExit",
      "appear",
      "enter",
      "exit",
      "timeout",
      "addEndListener",
      "onEnter",
      "onEntering",
      "onEntered",
      "onExit",
      "onExiting",
      "onExited",
      "nodeRef"
    ]));
    return L1.createElement(e4.Provider, {
      value: null
    }, typeof o21 === "function" ? o21(e11, s31) : L1.cloneElement(L1.Children.only(o21), s31));
  };
  return Transition;
}(L1.Component);
E2.contextType = e4;
E2.propTypes = true ? {
  nodeRef: s3.shape({
    current: typeof Element === "undefined" ? s3.any : function(t11, e12, i7, o31, r41, s41) {
      var a41 = t11[e12];
      return s3.instanceOf(a41 && "ownerDocument" in a41 ? a41.ownerDocument.defaultView.Element : Element)(t11, e12, i7, o31, r41, s41);
    }
  }),
  children: s3.oneOfType([
    s3.func.isRequired,
    s3.element.isRequired
  ]).isRequired,
  in: s3.bool,
  mountOnEnter: s3.bool,
  unmountOnExit: s3.bool,
  appear: s3.bool,
  enter: s3.bool,
  exit: s3.bool,
  timeout: function timeout(t12) {
    var e13 = a4;
    t12.addEndListener || (e13 = e13.isRequired);
    for (var n10 = arguments.length, i8 = new Array(n10 > 1 ? n10 - 1 : 0), o42 = 1; o42 < n10; o42++) {
      i8[o42 - 1] = arguments[o42];
    }
    return e13.apply(void 0, [
      t12
    ].concat(i8));
  },
  addEndListener: s3.func,
  onEnter: s3.func,
  onEntering: s3.func,
  onEntered: s3.func,
  onExit: s3.func,
  onExiting: s3.func,
  onExited: s3.func
} : {};
function noop() {
}
E2.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
E2.UNMOUNTED = p3;
E2.EXITED = l3;
E2.ENTERING = c4;
E2.ENTERED = f2;
E2.EXITING = d2;
function _extends() {
  _extends = Object.assign || function(e10) {
    for (var t9 = 1; t9 < arguments.length; t9++) {
      var n8 = arguments[t9];
      for (var r8 in n8) {
        Object.prototype.hasOwnProperty.call(n8, r8) && (e10[r8] = n8[r8]);
      }
    }
    return e10;
  };
  return _extends.apply(this, arguments);
}
function hasClass(s9, a8) {
  return s9.classList ? !!a8 && s9.classList.contains(a8) : (" " + (s9.className.baseVal || s9.className) + " ").indexOf(" " + a8 + " ") !== -1;
}
function addClass(a9, l9) {
  a9.classList ? a9.classList.add(l9) : hasClass(a9, l9) || (typeof a9.className === "string" ? a9.className = a9.className + " " + l9 : a9.setAttribute("class", (a9.className && a9.className.baseVal || "") + " " + l9));
}
function replaceClassName(s10, e14) {
  return s10.replace(new RegExp("(^|\\s)" + e14 + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(s12, e15) {
  s12.classList ? s12.classList.remove(e15) : typeof s12.className === "string" ? s12.className = replaceClassName(s12.className, e15) : s12.setAttribute("class", replaceClassName(s12.className && s12.className.baseVal || "", e15));
}
function _assertThisInitialized(e16) {
  if (e16 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e16;
}
var l4 = function addClass1(e17, s13) {
  return e17 && s13 && s13.split(" ").forEach(function(s22) {
    return addClass(e17, s22);
  });
};
var m3 = function removeClass1(e22, s32) {
  return e22 && s32 && s32.split(" ").forEach(function(s42) {
    return removeClass(e22, s42);
  });
};
var d3 = function(n12) {
  _inheritsLoose(CSSTransition, n12);
  function CSSTransition() {
    var e32;
    for (var s52 = arguments.length, r12 = new Array(s52), t22 = 0; t22 < s52; t22++) {
      r12[t22] = arguments[t22];
    }
    e32 = n12.call.apply(n12, [
      this
    ].concat(r12)) || this;
    e32.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };
    e32.onEnter = function(s62, r22) {
      var n22 = e32.resolveArguments(s62, r22), t32 = n22[0], o12 = n22[1];
      e32.removeClasses(t32, "exit");
      e32.addClass(t32, o12 ? "appear" : "enter", "base");
      e32.props.onEnter && e32.props.onEnter(s62, r22);
    };
    e32.onEntering = function(s72, r32) {
      var n32 = e32.resolveArguments(s72, r32), t42 = n32[0], o22 = n32[1];
      var a12 = o22 ? "appear" : "enter";
      e32.addClass(t42, a12, "active");
      e32.props.onEntering && e32.props.onEntering(s72, r32);
    };
    e32.onEntered = function(s8, r42) {
      var n42 = e32.resolveArguments(s8, r42), t52 = n42[0], o32 = n42[1];
      var a22 = o32 ? "appear" : "enter";
      e32.removeClasses(t52, a22);
      e32.addClass(t52, a22, "done");
      e32.props.onEntered && e32.props.onEntered(s8, r42);
    };
    e32.onExit = function(s9) {
      var r52 = e32.resolveArguments(s9), n52 = r52[0];
      e32.removeClasses(n52, "appear");
      e32.removeClasses(n52, "enter");
      e32.addClass(n52, "exit", "base");
      e32.props.onExit && e32.props.onExit(s9);
    };
    e32.onExiting = function(s10) {
      var r6 = e32.resolveArguments(s10), n6 = r6[0];
      e32.addClass(n6, "exit", "active");
      e32.props.onExiting && e32.props.onExiting(s10);
    };
    e32.onExited = function(s11) {
      var r7 = e32.resolveArguments(s11), n7 = r7[0];
      e32.removeClasses(n7, "exit");
      e32.addClass(n7, "exit", "done");
      e32.props.onExited && e32.props.onExited(s11);
    };
    e32.resolveArguments = function(s12, r8) {
      return e32.props.nodeRef ? [
        e32.props.nodeRef.current,
        s12
      ] : [
        s12,
        r8
      ];
    };
    e32.getClassNames = function(s13) {
      var r9 = e32.props.classNames;
      var n8 = typeof r9 === "string";
      var t62 = n8 && r9 ? r9 + "-" : "";
      var o42 = n8 ? "" + t62 + s13 : r9[s13];
      var a32 = n8 ? o42 + "-active" : r9[s13 + "Active"];
      var i12 = n8 ? o42 + "-done" : r9[s13 + "Done"];
      return {
        baseClassName: o42,
        activeClassName: a32,
        doneClassName: i12
      };
    };
    return e32;
  }
  var t13 = CSSTransition.prototype;
  t13.addClass = function addClass2(e42, s14, r10) {
    var n9 = this.getClassNames(s14)[r10 + "ClassName"];
    var t7 = this.getClassNames("enter"), o5 = t7.doneClassName;
    s14 === "appear" && r10 === "done" && o5 && (n9 += " " + o5);
    r10 === "active" && e42 && e42.scrollTop;
    if (n9) {
      this.appliedClasses[s14][r10] = n9;
      l4(e42, n9);
    }
  };
  t13.removeClasses = function removeClasses(e52, s) {
    var r11 = this.appliedClasses[s], n10 = r11.base, t8 = r11.active, o6 = r11.done;
    this.appliedClasses[s] = {};
    n10 && m3(e52, n10);
    t8 && m3(e52, t8);
    o6 && m3(e52, o6);
  };
  t13.render = function render() {
    var r12 = this.props, n11 = (r12.classNames, _objectWithoutPropertiesLoose(r12, [
      "classNames"
    ]));
    return L1.createElement(E2, _extends({}, n11, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };
  return CSSTransition;
}(L1.Component);
d3.defaultProps = {
  classNames: ""
};
d3.propTypes = true ? _extends({}, E2.propTypes, {
  classNames: u2,
  onEnter: s3.func,
  onEntering: s3.func,
  onEntered: s3.func,
  onExit: s3.func,
  onExiting: s3.func,
  onExited: s3.func
}) : {};
function getChildMapping(e18, t14) {
  var n13 = function mapper(e23) {
    return t14 && E1(e23) ? t14(e23) : e23;
  };
  var r13 = Object.create(null);
  e18 && b1.map(e18, function(e33) {
    return e33;
  }).forEach(function(e43) {
    r13[e43.key] = n13(e43);
  });
  return r13;
}
function mergeChildMappings(e52, t23) {
  e52 = e52 || {};
  t23 = t23 || {};
  function getValueForKey(n33) {
    return n33 in t23 ? t23[n33] : e52[n33];
  }
  var n23 = Object.create(null);
  var r23 = [];
  for (var i13 in e52) {
    if (i13 in t23) {
      if (r23.length) {
        n23[i13] = r23;
        r23 = [];
      }
    } else
      r23.push(i13);
  }
  var o13;
  var a13 = {};
  for (var p12 in t23) {
    if (n23[p12]) {
      for (o13 = 0; o13 < n23[p12].length; o13++) {
        var l12 = n23[p12][o13];
        a13[n23[p12][o13]] = getValueForKey(l12);
      }
    }
    a13[p12] = getValueForKey(p12);
  }
  for (o13 = 0; o13 < r23.length; o13++) {
    a13[r23[o13]] = getValueForKey(r23[o13]);
  }
  return a13;
}
function getProp(e6, t, n42) {
  return n42[t] != null ? n42[t] : e6.props[t];
}
function getInitialChildMapping(e7, t33) {
  return getChildMapping(e7.children, function(n52) {
    return I1(n52, {
      onExited: t33.bind(null, n52),
      in: true,
      appear: getProp(n52, "appear", e7),
      enter: getProp(n52, "enter", e7),
      exit: getProp(n52, "exit", e7)
    });
  });
}
function getNextChildMapping(e8, t43, n6) {
  var r33 = getChildMapping(e8.children);
  var i22 = mergeChildMappings(t43, r33);
  Object.keys(i22).forEach(function(o23) {
    var p21 = i22[o23];
    if (E1(p21)) {
      var u12 = o23 in t43;
      var c11 = o23 in r33;
      var s14 = t43[o23];
      var d11 = E1(s14) && !s14.props.in;
      !c11 || u12 && !d11 ? c11 || !u12 || d11 ? c11 && u12 && E1(s14) && (i22[o23] = I1(p21, {
        onExited: n6.bind(null, p21),
        in: s14.props.in,
        exit: getProp(p21, "exit", e8),
        enter: getProp(p21, "enter", e8)
      })) : i22[o23] = I1(p21, {
        in: false
      }) : i22[o23] = I1(p21, {
        onExited: n6.bind(null, p21),
        in: true,
        exit: getProp(p21, "exit", e8),
        enter: getProp(p21, "enter", e8)
      });
    }
  });
  return i22;
}
var c5 = Object.values || function(e9) {
  return Object.keys(e9).map(function(t) {
    return e9[t];
  });
};
var s5 = {
  component: "div",
  childFactory: function childFactory(e10) {
    return e10;
  }
};
var d4 = function(i32) {
  _inheritsLoose(TransitionGroup, i32);
  function TransitionGroup(e11, t52) {
    var r43;
    r43 = i32.call(this, e11, t52) || this;
    var o33 = r43.handleExited.bind(_assertThisInitialized(r43));
    r43.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: o33,
      firstRender: true
    };
    return r43;
  }
  var a23 = TransitionGroup.prototype;
  a23.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  a23.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(e12, t62) {
    var n7 = t62.children, r52 = t62.handleExited, i42 = t62.firstRender;
    return {
      children: i42 ? getInitialChildMapping(e12, r52) : getNextChildMapping(e12, n7, r52),
      firstRender: false
    };
  };
  a23.handleExited = function handleExited(e13, n8) {
    var r6 = getChildMapping(this.props.children);
    if (!(e13.key in r6)) {
      e13.props.onExited && e13.props.onExited(n8);
      this.mounted && this.setState(function(n9) {
        var r7 = _extends({}, n9.children);
        delete r7[e13.key];
        return {
          children: r7
        };
      });
    }
  };
  a23.render = function render() {
    var t7 = this.props, n10 = t7.component, r8 = t7.childFactory, i5 = _objectWithoutPropertiesLoose(t7, [
      "component",
      "childFactory"
    ]);
    var a33 = this.state.contextValue;
    var p31 = c5(this.state.children).map(r8);
    delete i5.appear;
    delete i5.enter;
    delete i5.exit;
    return n10 === null ? L1.createElement(e4.Provider, {
      value: a33
    }, p31) : L1.createElement(e4.Provider, {
      value: a33
    }, L1.createElement(n10, i5, p31));
  };
  return TransitionGroup;
}(L1.Component);
d4.propTypes = true ? {
  component: s3.any,
  children: s3.node,
  appear: s3.bool,
  enter: s3.bool,
  exit: s3.bool,
  childFactory: s3.func
} : {};
d4.defaultProps = s5;
var l5 = function(r14) {
  _inheritsLoose(ReplaceTransition, r14);
  function ReplaceTransition() {
    var e19;
    for (var n14 = arguments.length, t15 = new Array(n14), i14 = 0; i14 < n14; i14++) {
      t15[i14] = arguments[i14];
    }
    e19 = r14.call.apply(r14, [
      this
    ].concat(t15)) || this;
    e19.handleEnter = function() {
      for (var n24 = arguments.length, r24 = new Array(n24), t24 = 0; t24 < n24; t24++) {
        r24[t24] = arguments[t24];
      }
      return e19.handleLifecycle("onEnter", 0, r24);
    };
    e19.handleEntering = function() {
      for (var n34 = arguments.length, r34 = new Array(n34), t34 = 0; t34 < n34; t34++) {
        r34[t34] = arguments[t34];
      }
      return e19.handleLifecycle("onEntering", 0, r34);
    };
    e19.handleEntered = function() {
      for (var n42 = arguments.length, r44 = new Array(n42), t44 = 0; t44 < n42; t44++) {
        r44[t44] = arguments[t44];
      }
      return e19.handleLifecycle("onEntered", 0, r44);
    };
    e19.handleExit = function() {
      for (var n52 = arguments.length, r52 = new Array(n52), t52 = 0; t52 < n52; t52++) {
        r52[t52] = arguments[t52];
      }
      return e19.handleLifecycle("onExit", 1, r52);
    };
    e19.handleExiting = function() {
      for (var n6 = arguments.length, r6 = new Array(n6), t62 = 0; t62 < n6; t62++) {
        r6[t62] = arguments[t62];
      }
      return e19.handleLifecycle("onExiting", 1, r6);
    };
    e19.handleExited = function() {
      for (var n7 = arguments.length, r7 = new Array(n7), t7 = 0; t7 < n7; t7++) {
        r7[t7] = arguments[t7];
      }
      return e19.handleLifecycle("onExited", 1, r7);
    };
    return e19;
  }
  var l13 = ReplaceTransition.prototype;
  l13.handleLifecycle = function handleLifecycle(e3, n6, r8) {
    var o14;
    var l21 = this.props.children;
    var a10 = L1.Children.toArray(l21)[n6];
    a10.props[e3] && (o14 = a10.props)[e3].apply(o14, r8);
    if (this.props[e3]) {
      var d8 = a10.props.nodeRef ? void 0 : c3.findDOMNode(this);
      this.props[e3](d8);
    }
  };
  l13.render = function render() {
    var n8 = this.props, r9 = n8.children, i23 = n8.in, l31 = _objectWithoutPropertiesLoose(n8, [
      "children",
      "in"
    ]);
    var a14 = L1.Children.toArray(r9), d9 = a14[0], h1 = a14[1];
    delete l31.onEnter;
    delete l31.onEntering;
    delete l31.onEntered;
    delete l31.onExit;
    delete l31.onExiting;
    delete l31.onExited;
    return L1.createElement(d4, l31, i23 ? L1.cloneElement(d9, {
      key: "first",
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered
    }) : L1.cloneElement(h1, {
      key: "second",
      onEnter: this.handleExit,
      onEntering: this.handleExiting,
      onEntered: this.handleExited
    }));
  };
  return ReplaceTransition;
}(L1.Component);
l5.propTypes = true ? {
  in: s3.bool.isRequired,
  children: function children(e24, n9) {
    return L1.Children.count(e24[n9]) !== 2 ? new Error('"' + n9 + '" must be exactly two transition components.') : null;
  }
} : {};
var s6;
var u3;
function areChildrenDifferent(e110, n15) {
  return e110 !== n15 && (!L1.isValidElement(e110) || !L1.isValidElement(n15) || e110.key == null || e110.key !== n15.key);
}
var l6 = {
  out: "out-in",
  in: "in-out"
};
var p4 = function callHook(e25, t, n25) {
  return function() {
    var r15;
    e25.props[t] && (r15 = e25.props)[t].apply(r15, arguments);
    n25();
  };
};
var m4 = (s6 = {}, s6[l6.out] = function(e34) {
  var n35 = e34.current, o15 = e34.changeState;
  return L1.cloneElement(n35, {
    in: false,
    onExited: p4(n35, "onExited", function() {
      o15(c4, null);
    })
  });
}, s6[l6.in] = function(e44) {
  var n42 = e44.current, o24 = e44.changeState, i15 = e44.children;
  return [
    n42,
    L1.cloneElement(i15, {
      in: true,
      onEntered: p4(i15, "onEntered", function() {
        o24(c4);
      })
    })
  ];
}, s6);
var d5 = (u3 = {}, u3[l6.out] = function(e52) {
  var n52 = e52.children, r25 = e52.changeState;
  return L1.cloneElement(n52, {
    in: true,
    onEntered: p4(n52, "onEntered", function() {
      r25(f2, L1.cloneElement(n52, {
        in: true
      }));
    })
  });
}, u3[l6.in] = function(e6) {
  var n6 = e6.current, r35 = e6.children, i24 = e6.changeState;
  return [
    L1.cloneElement(n6, {
      in: false,
      onExited: p4(n6, "onExited", function() {
        i24(f2, L1.cloneElement(r35, {
          in: true
        }));
      })
    }),
    L1.cloneElement(r35, {
      in: true
    })
  ];
}, u3);
var f3 = function(n7) {
  _inheritsLoose(SwitchTransition, n7);
  function SwitchTransition() {
    var e7;
    for (var t16 = arguments.length, r45 = new Array(t16), i33 = 0; i33 < t16; i33++) {
      r45[i33] = arguments[i33];
    }
    e7 = n7.call.apply(n7, [
      this
    ].concat(r45)) || this;
    e7.state = {
      status: f2,
      current: null
    };
    e7.appeared = false;
    e7.changeState = function(t25, n8) {
      n8 === void 0 && (n8 = e7.state.current);
      e7.setState({
        status: t25,
        current: n8
      });
    };
    return e7;
  }
  var s15 = SwitchTransition.prototype;
  s15.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };
  SwitchTransition.getDerivedStateFromProps = function getDerivedStateFromProps(e8, n9) {
    return e8.children == null ? {
      current: null
    } : n9.status === c4 && e8.mode === l6.in ? {
      status: c4
    } : n9.current && areChildrenDifferent(n9.current, e8.children) ? {
      status: d2
    } : {
      current: L1.cloneElement(e8.children, {
        in: true
      })
    };
  };
  s15.render = function render() {
    var e9 = this.props, n10 = e9.children, s = e9.mode, u13 = this.state, c7 = u13.status, l14 = u13.current;
    var p13 = {
      children: n10,
      current: l14,
      changeState: this.changeState,
      status: c7
    };
    var f11;
    switch (c7) {
      case c4:
        f11 = d5[s](p13);
        break;
      case d2:
        f11 = m4[s](p13);
        break;
      case f2:
        f11 = l14;
    }
    return L1.createElement(e4.Provider, {
      value: {
        isMounting: !this.appeared
      }
    }, f11);
  };
  return SwitchTransition;
}(L1.Component);
f3.propTypes = true ? {
  mode: s3.oneOf([
    l6.in,
    l6.out
  ]),
  children: s3.oneOfType([
    s3.element.isRequired
  ])
} : {};
f3.defaultProps = {
  mode: l6.out
};
var r5 = {};
var e5 = Object.getOwnPropertySymbols;
var t5 = Object.prototype.hasOwnProperty;
var n4 = Object.prototype.propertyIsEnumerable;
function toObject(r16) {
  if (r16 === null || r16 === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(r16);
}
function shouldUseNative() {
  try {
    if (!Object.assign)
      return false;
    var r26 = new String("abc");
    r26[5] = "de";
    if (Object.getOwnPropertyNames(r26)[0] === "5")
      return false;
    var e111 = {};
    for (var t17 = 0; t17 < 10; t17++) {
      e111["_" + String.fromCharCode(t17)] = t17;
    }
    var n16 = Object.getOwnPropertyNames(e111).map(function(r) {
      return e111[r];
    });
    if (n16.join("") !== "0123456789")
      return false;
    var a15 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(r36) {
      a15[r36] = r36;
    });
    return Object.keys(Object.assign({}, a15)).join("") === "abcdefghijklmnopqrst";
  } catch (r) {
    return false;
  }
}
r5 = shouldUseNative() ? Object.assign : function(r46, a7) {
  var o9;
  var c8 = toObject(r46);
  var i7;
  for (var s16 = 1; s16 < arguments.length; s16++) {
    o9 = Object(arguments[s16]);
    for (var f6 in o9)
      t5.call(o9, f6) && (c8[f6] = o9[f6]);
    if (e5) {
      i7 = e5(o9);
      for (var l10 = 0; l10 < i7.length; l10++) {
        n4.call(o9, i7[l10]) && (c8[i7[l10]] = o9[i7[l10]]);
      }
    }
  }
  return c8;
};
var a5 = r5;
var mod2 = {
  default: a5
};
"default" in mod2 ? mod2.default : mod2;
var o4 = "default" in mod1 ? mod1.default : mod1;
var a6 = {};
var f4 = o4;
var n5 = 60103;
a6.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  s7 = Symbol.for;
  n5 = s7("react.element");
  a6.Fragment = s7("react.fragment");
}
var s7;
var l7 = Object.prototype.hasOwnProperty;
var _1 = f4.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
var i4 = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function q(r17, e112, t18) {
  var o16, a16 = {}, f12 = null, s17 = null;
  t18 !== void 0 && (f12 = "" + t18);
  e112.key !== void 0 && (f12 = "" + e112.key);
  e112.ref !== void 0 && (s17 = e112.ref);
  for (o16 in e112) {
    l7.call(e112, o16) && !i4.hasOwnProperty(o16) && (a16[o16] = e112[o16]);
  }
  if (r17 && r17.defaultProps) {
    for (o16 in e112 = r17.defaultProps, e112) {
      a16[o16] === void 0 && (a16[o16] = e112[o16]);
    }
  }
  return {
    $$typeof: n5,
    type: r17,
    key: f12,
    ref: s17,
    props: a16,
    _owner: _1.current
  };
}
a6.jsx = q;
a6.jsxs = q;
var u4 = a6.Fragment;
var p5 = a6.jsx;
var y2 = a6.jsxs;
var t6 = window.ReactIs;
function P1(e20, t10) {
  if (e20 == null)
    return {};
  var o10 = {}, r9 = Object.keys(e20), n9, s18;
  for (s18 = 0; s18 < r9.length; s18++) {
    n9 = r9[s18], !(t10.indexOf(n9) >= 0) && (o10[n9] = e20[n9]);
  }
  return o10;
}
function m6() {
  return m6 = Object.assign || function(e26) {
    for (var t19 = 1; t19 < arguments.length; t19++) {
      var o17 = arguments[t19];
      for (var r10 in o17) {
        Object.prototype.hasOwnProperty.call(o17, r10) && (e26[r10] = o17[r10]);
      }
    }
    return e26;
  }, m6.apply(this, arguments);
}
function ao(e27) {
  var t20, o18, r18 = "";
  if (typeof e27 == "string" || typeof e27 == "number")
    r18 += e27;
  else if (typeof e27 == "object") {
    if (Array.isArray(e27)) {
      for (t20 = 0; t20 < e27.length; t20++) {
        e27[t20] && (o18 = ao(e27[t20])) && (r18 && (r18 += " "), r18 += o18);
      }
    } else
      for (t20 in e27)
        e27[t20] && (r18 && (r18 += " "), r18 += t20);
  }
  return r18;
}
function O() {
  for (var e28 = 0, t26, o19, r19 = ""; e28 < arguments.length; ) {
    (t26 = arguments[e28++]) && (o19 = ao(t26)) && (r19 && (r19 += " "), r19 += o19);
  }
  return r19;
}
function Ie(e29) {
  return e29 !== null && typeof e29 == "object" && e29.constructor === Object;
}
function A(e30, t27, o20 = {
  clone: true
}) {
  let r20 = o20.clone ? m6({}, e30) : e30;
  return Ie(e30) && Ie(t27) && Object.keys(t27).forEach((n10) => {
    n10 !== "__proto__" && (Ie(t27[n10]) && n10 in e30 && Ie(e30[n10]) ? r20[n10] = A(e30[n10], t27[n10], o20) : r20[n10] = t27[n10]);
  }), r20;
}
function J(e35) {
  let t28 = "https://mui.com/production-error/?code=" + e35;
  for (let o25 = 1; o25 < arguments.length; o25 += 1) {
    t28 += "&args[]=" + encodeURIComponent(arguments[o25]);
  }
  return "Minified MUI error #" + e35 + "; visit " + t28 + " for the full message.";
}
function Q(e36) {
  if (typeof e36 != "string")
    throw new Error(J(7));
  return e36.charAt(0).toUpperCase() + e36.slice(1);
}
function Ae(e37, t29) {
  typeof e37 == "function" ? e37(t29) : e37 && (e37.current = t29);
}
var qr = typeof window != "undefined" ? mod.useLayoutEffect : mod.useEffect;
var po = qr;
function Ue(e38) {
  let t30 = mod.useRef(e38);
  return po(() => {
    t30.current = e38;
  }), mod.useCallback((...o26) => (0, t30.current)(...o26), []);
}
function De(e39, t35) {
  return mod.useMemo(() => e39 == null && t35 == null ? null : (o27) => {
    Ae(e39, o27), Ae(t35, o27);
  }, [
    e39,
    t35
  ]);
}
var Fe = true;
var st = false;
var co;
var Xr = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function Jr(e40) {
  let { type: t, tagName: o28 } = e40;
  return !!(o28 === "INPUT" && Xr[t] && !e40.readOnly || o28 === "TEXTAREA" && !e40.readOnly || e40.isContentEditable);
}
function Qr(e45) {
  e45.metaKey || e45.altKey || e45.ctrlKey || (Fe = true);
}
function it() {
  Fe = false;
}
function Zr() {
  this.visibilityState === "hidden" && st && (Fe = true);
}
function en(e46) {
  e46.addEventListener("keydown", Qr, true), e46.addEventListener("mousedown", it, true), e46.addEventListener("pointerdown", it, true), e46.addEventListener("touchstart", it, true), e46.addEventListener("visibilitychange", Zr, true);
}
function tn(e47) {
  let { target: t36 } = e47;
  try {
    return t36.matches(":focus-visible");
  } catch {
  }
  return Fe || Jr(t36);
}
function We() {
  let e48 = mod.useCallback((n17) => {
    n17 != null && en(n17.ownerDocument);
  }, []), t37 = mod.useRef(false);
  function o29() {
    return t37.current ? (st = true, window.clearTimeout(co), co = window.setTimeout(() => {
      st = false;
    }, 100), t37.current = false, true) : false;
  }
  function r27(n18) {
    return tn(n18) ? (t37.current = true, true) : false;
  }
  return {
    isFocusVisibleRef: t37,
    onFocus: r27,
    onBlur: o29,
    ref: e48
  };
}
function ve(e49, t38) {
  let o30 = m6({}, t38);
  return Object.keys(e49).forEach((r) => {
    o30[r] === void 0 && (o30[r] = e49[r]);
  }), o30;
}
function U(e50, t39, o34) {
  let r28 = {};
  return Object.keys(e50).forEach((n6) => {
    r28[n6] = e50[n6].reduce((s19, i8) => (i8 && (o34 && o34[i8] && s19.push(o34[i8]), s19.push(t39(i8))), s19), []).join(" ");
  }), r28;
}
var uo = (e51) => e51;
var on = () => {
  let e52 = uo;
  return {
    configure(t40) {
      e52 = t40;
    },
    generate(t45) {
      return e52(t45);
    },
    reset() {
      e52 = uo;
    }
  };
};
var rn = on();
var fo = rn;
var nn = {
  active: "Mui-active",
  checked: "Mui-checked",
  completed: "Mui-completed",
  disabled: "Mui-disabled",
  error: "Mui-error",
  expanded: "Mui-expanded",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  selected: "Mui-selected"
};
function $(e53, t46) {
  return nn[t46] || `${fo.generate(e53)}-${t46}`;
}
function B(e54, t47) {
  let o35 = {};
  return t47.forEach((r29) => {
    o35[r29] = $(e54, r29);
  }), o35;
}
function sn(e55) {
  var t48 = Object.create(null);
  return function(o36) {
    return t48[o36] === void 0 && (t48[o36] = e55(o36)), t48[o36];
  };
}
var Ge = sn;
var an = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var pn = Ge(function(e56) {
  return an.test(e56) || e56.charCodeAt(0) === 111 && e56.charCodeAt(1) === 110 && e56.charCodeAt(2) < 91;
});
var mo = pn;
var ln = true;
function ho(e57, t49, o37) {
  var r30 = "";
  return o37.split(" ").forEach(function(n19) {
    e57[n19] !== void 0 ? t49.push(e57[n19] + ";") : r30 += n19 + " ";
  }), r30;
}
var yo = function(t50, o38, r37) {
  var n20 = t50.key + "-" + o38.name;
  if ((r37 === false || ln === false) && t50.registered[n20] === void 0 && (t50.registered[n20] = o38.styles), t50.inserted[o38.name] === void 0) {
    var s20 = o38;
    do {
      t50.insert(o38 === s20 ? "." + n20 : "", s20, t50.sheet, true);
      s20 = s20.next;
    } while (s20 !== void 0);
  }
};
function cn(e58) {
  for (var t51 = 0, o39, r38 = 0, n26 = e58.length; n26 >= 4; ++r38, n26 -= 4) {
    o39 = e58.charCodeAt(r38) & 255 | (e58.charCodeAt(++r38) & 255) << 8 | (e58.charCodeAt(++r38) & 255) << 16 | (e58.charCodeAt(++r38) & 255) << 24, o39 = (o39 & 65535) * 1540483477 + ((o39 >>> 16) * 59797 << 16), o39 ^= o39 >>> 24, t51 = (o39 & 65535) * 1540483477 + ((o39 >>> 16) * 59797 << 16) ^ (t51 & 65535) * 1540483477 + ((t51 >>> 16) * 59797 << 16);
  }
  switch (n26) {
    case 3:
      t51 ^= (e58.charCodeAt(r38 + 2) & 255) << 16;
    case 2:
      t51 ^= (e58.charCodeAt(r38 + 1) & 255) << 8;
    case 1:
      t51 ^= e58.charCodeAt(r38) & 255, t51 = (t51 & 65535) * 1540483477 + ((t51 >>> 16) * 59797 << 16);
  }
  return t51 ^= t51 >>> 13, t51 = (t51 & 65535) * 1540483477 + ((t51 >>> 16) * 59797 << 16), ((t51 ^ t51 >>> 15) >>> 0).toString(36);
}
var go = cn;
var un = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var xo = un;
var dn = /[A-Z]|^ms/g;
var fn = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var bo = function(t52) {
  return t52.charCodeAt(1) === 45;
};
var vo = function(t53) {
  return t53 != null && typeof t53 != "boolean";
};
var at = Ge(function(e59) {
  return bo(e59) ? e59 : e59.replace(dn, "-$&").toLowerCase();
});
var To = function(t54, o40) {
  switch (t54) {
    case "animation":
    case "animationName":
      if (typeof o40 == "string") {
        return o40.replace(fn, function(r, n27, s23) {
          return Z = {
            name: n27,
            styles: s23,
            next: Z
          }, n27;
        });
      }
  }
  return xo[t54] !== 1 && !bo(t54) && typeof o40 == "number" && o40 !== 0 ? o40 + "px" : o40;
};
function Ee(e60, t55, o41) {
  if (o41 == null)
    return "";
  if (o41.__emotion_styles !== void 0)
    return o41;
  switch (typeof o41) {
    case "boolean":
      return "";
    case "object": {
      if (o41.anim === 1) {
        return Z = {
          name: o41.name,
          styles: o41.styles,
          next: Z
        }, o41.name;
      }
      if (o41.styles !== void 0) {
        var r39 = o41.next;
        if (r39 !== void 0) {
          for (; r39 !== void 0; ) {
            Z = {
              name: r39.name,
              styles: r39.styles,
              next: Z
            }, r39 = r39.next;
          }
        }
        var n28 = o41.styles + ";";
        return n28;
      }
      return mn(e60, t55, o41);
    }
    case "function": {
      if (e60 !== void 0) {
        var s24 = Z, i9 = o41(e60);
        return Z = s24, Ee(e60, t55, i9);
      }
      break;
    }
    case "string":
      break;
  }
  if (t55 == null)
    return o41;
  var u6 = t55[o41];
  return u6 !== void 0 ? u6 : o41;
}
function mn(e61, t56, o42) {
  var r40 = "";
  if (Array.isArray(o42)) {
    for (var n29 = 0; n29 < o42.length; n29++) {
      r40 += Ee(e61, t56, o42[n29]) + ";";
    }
  } else {
    for (var s25 in o42) {
      var i10 = o42[s25];
      if (typeof i10 != "object") {
        t56 != null && t56[i10] !== void 0 ? r40 += s25 + "{" + t56[i10] + "}" : vo(i10) && (r40 += at(s25) + ":" + To(s25, i10) + ";");
      } else if (Array.isArray(i10) && typeof i10[0] == "string" && (t56 == null || t56[i10[0]] === void 0)) {
        for (var l15 = 0; l15 < i10.length; l15++) {
          vo(i10[l15]) && (r40 += at(s25) + ":" + To(s25, i10[l15]) + ";");
        }
      } else {
        var p7 = Ee(e61, t56, i10);
        switch (s25) {
          case "animation":
          case "animationName": {
            r40 += at(s25) + ":" + p7 + ";";
            break;
          }
          default:
            r40 += s25 + "{" + p7 + "}";
        }
      }
    }
  }
  return r40;
}
var Po = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var Z;
var Co = function(t57, o43, r47) {
  if (t57.length === 1 && typeof t57[0] == "object" && t57[0] !== null && t57[0].styles !== void 0) {
    return t57[0];
  }
  var n30 = true, s26 = "";
  Z = void 0;
  var i16 = t57[0];
  i16 == null || i16.raw === void 0 ? (n30 = false, s26 += Ee(r47, o43, i16)) : s26 += i16[0];
  for (var l16 = 1; l16 < t57.length; l16++) {
    s26 += Ee(r47, o43, t57[l16]), n30 && (s26 += i16[l16]);
  }
  Po.lastIndex = 0;
  for (var u7 = "", c9; (c9 = Po.exec(s26)) !== null; )
    u7 += "-" + c9[1];
  var a17 = go(s26) + u7;
  return {
    name: a17,
    styles: s26,
    next: Z
  };
};
var bn = mo;
var vn = function(t58) {
  return t58 !== "theme";
};
var Ro = function(t59) {
  return typeof t59 == "string" && t59.charCodeAt(0) > 96 ? bn : vn;
};
var Eo = function(t60, o44, r48) {
  var n36;
  if (o44) {
    var s27 = o44.shouldForwardProp;
    n36 = t60.__emotion_forwardProp && s27 ? function(i17) {
      return t60.__emotion_forwardProp(i17) && s27(i17);
    } : s27;
  }
  return typeof n36 != "function" && r48 && (n36 = t60.__emotion_forwardProp), n36;
};
var Tn = function() {
  return null;
};
var Pn = function e62(t61, o45) {
  var r49 = t61.__emotion_real === t61, n37 = r49 && t61.__emotion_base || t61, s28, i18;
  o45 !== void 0 && (s28 = o45.label, i18 = o45.target);
  var l17 = Eo(t61, o45, r49), p8 = l17 || Ro(n37), u8 = !p8("as");
  return function() {
    var c10 = arguments, a18 = r49 && t61.__emotion_styles !== void 0 ? t61.__emotion_styles.slice(0) : [];
    if (s28 !== void 0 && a18.push("label:" + s28 + ";"), c10[0] == null || c10[0].raw === void 0) {
      a18.push.apply(a18, c10);
    } else {
      a18.push(c10[0][0]);
      for (var h2 = c10.length, g3 = 1; g3 < h2; g3++) {
        a18.push(c10[g3], c10[0][g3]);
      }
    }
    var y4 = i(function(f7, C3, k) {
      var E4 = u8 && f7.as || n37, x4 = "", v1 = [], R3 = f7;
      if (f7.theme == null) {
        R3 = {};
        for (var S in f7)
          R3[S] = f7[S];
        R3.theme = r1(n);
      }
      typeof f7.className == "string" ? x4 = ho(C3.registered, v1, f7.className) : f7.className != null && (x4 = f7.className + " ");
      var W = Co(a18.concat(v1), C3.registered, R3), T = yo(C3, W, typeof E4 == "string");
      x4 += C3.key + "-" + W.name, i18 !== void 0 && (x4 += " " + i18);
      var M1 = u8 && l17 === void 0 ? Ro(E4) : p8, w3 = {};
      for (var V in f7)
        u8 && V === "as" || M1(V) && (w3[V] = f7[V]);
      w3.className = x4, w3.ref = k;
      var K = f(E4, w3), Y = f(Tn, null);
      return f(i1, null, Y, K);
    });
    return y4.displayName = s28 !== void 0 ? s28 : "Styled(" + (typeof n37 == "string" ? n37 : n37.displayName || n37.name || "Component") + ")", y4.defaultProps = t61.defaultProps, y4.__emotion_real = y4, y4.__emotion_base = n37, y4.__emotion_styles = a18, y4.__emotion_forwardProp = l17, Object.defineProperty(y4, "toString", {
      value: function() {
        return "." + i18;
      }
    }), y4.withComponent = function(f8, C4) {
      return e62(f8, m6({}, o45, C4, {
        shouldForwardProp: Eo(y4, C4, true)
      })).apply(void 0, a18);
    }, y4;
  };
};
var So = Pn;
var Cn = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var lt = So.bind();
Cn.forEach(function(e63) {
  lt[e63] = lt(e63);
});
var Oo = lt;
function ct(e64, t62) {
  return Oo(e64, t62);
}
function Rn(e65, t63) {
  return t63 ? A(e65, t63, {
    clone: false
  }) : e65;
}
var ne = Rn;
var Ke = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
var _o = {
  keys: [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  up: (e3) => `@media (min-width:${Ke[e3]}px)`
};
function L3(e66, t64, o46) {
  let r50 = e66.theme || {};
  if (Array.isArray(t64)) {
    let s = r50.breakpoints || _o;
    return t64.reduce((i19, l, p) => (i19[s.up(s.keys[p])] = o46(t64[p]), i19), {});
  }
  if (typeof t64 == "object") {
    let s29 = r50.breakpoints || _o;
    return Object.keys(t64).reduce((i20, l18) => {
      if (Object.keys(s29.values || Ke).indexOf(l18) !== -1) {
        let p = s29.up(l18);
        i20[p] = o46(t64[l18], l18);
      } else {
        let p = l18;
        i20[p] = t64[p];
      }
      return i20;
    }, {});
  }
  return o46(t64);
}
function No(e67 = {}) {
  var t65;
  return (e67 == null || (t65 = e67.keys) == null ? void 0 : t65.reduce((r51, n38) => {
    let s = e67.up(n38);
    return r51[s] = {}, r51;
  }, {})) || {};
}
function wo(e68, t66) {
  return e68.reduce((o47, r) => {
    let n39 = o47[r];
    return (!n39 || Object.keys(n39).length === 0) && delete o47[r], o47;
  }, t66);
}
function He(e69, t67) {
  return !t67 || typeof t67 != "string" ? null : t67.split(".").reduce((o48, r) => o48 && o48[r] ? o48[r] : null, e69);
}
function zo(e70, t68, o49, r52 = o49) {
  let n40;
  return typeof e70 == "function" ? n40 = e70(o49) : Array.isArray(e70) ? n40 = e70[o49] || r52 : n40 = He(e70, o49) || r52, t68 && (n40 = t68(n40)), n40;
}
function En(e71) {
  let {
    prop: t69,
    cssProperty: o50 = e71.prop,
    themeKey: r53,
    transform: n41
  } = e71, s30 = (i25) => {
    if (i25[t69] == null)
      return null;
    let l19 = i25[t69], p9 = i25.theme, u9 = He(p9, r53) || {};
    return L3(i25, l19, (a19) => {
      let h3 = zo(u9, n41, a19);
      return a19 === h3 && typeof a19 == "string" && (h3 = zo(u9, n41, `${t69}${a19 === "default" ? "" : Q(a19)}`, a19)), o50 === false ? h3 : {
        [o50]: h3
      };
    });
  };
  return s30.propTypes = {}, s30.filterProps = [
    t69
  ], s30;
}
var d7 = En;
function Sn(...e72) {
  let t70 = e72.reduce((r54, n42) => (n42.filterProps.forEach((s) => {
    r54[s] = n42;
  }), r54), {}), o51 = (r55) => Object.keys(r55).reduce((n43, s) => t70[s] ? ne(n43, t70[s](r55)) : n43, {});
  return o51.propTypes = {}, o51.filterProps = e72.reduce((r56, n44) => r56.concat(n44.filterProps), []), o51;
}
var j = Sn;
function ut(e73) {
  let t71 = {};
  return (o52) => (t71[o52] === void 0 && (t71[o52] = e73(o52)), t71[o52]);
}
var On = {
  m: "margin",
  p: "padding"
};
var kn = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: [
    "Left",
    "Right"
  ],
  y: [
    "Top",
    "Bottom"
  ]
};
var Mo = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var _n = ut((e74) => {
  if (e74.length > 2) {
    if (Mo[e74])
      e74 = Mo[e74];
    else {
      return [
        e74
      ];
    }
  }
  let [t, o] = e74.split(""), r57 = On[t], n45 = kn[o] || "";
  return Array.isArray(n45) ? n45.map((s33) => r57 + s33) : [
    r57 + n45
  ];
});
var dt = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "marginInline",
  "marginInlineStart",
  "marginInlineEnd",
  "marginBlock",
  "marginBlockStart",
  "marginBlockEnd"
];
var ft = [
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
  "paddingInline",
  "paddingInlineStart",
  "paddingInlineEnd",
  "paddingBlock",
  "paddingBlockStart",
  "paddingBlockEnd"
];
var $o = [
  ...dt,
  ...ft
];
function ce(e75, t72, o53, r) {
  let n46 = He(e75, t72) || o53;
  return typeof n46 == "number" ? (s34) => typeof s34 == "string" ? s34 : n46 * s34 : Array.isArray(n46) ? (s35) => typeof s35 == "string" ? s35 : n46[s35] : typeof n46 == "function" ? n46 : () => {
  };
}
function mt(e76) {
  return ce(e76, "spacing", 8, "spacing");
}
function ue(e77, t73) {
  if (typeof t73 == "string" || t73 == null)
    return t73;
  let o54 = Math.abs(t73), r58 = e77(o54);
  return t73 >= 0 ? r58 : typeof r58 == "number" ? -r58 : `-${r58}`;
}
function Nn(e78, t74) {
  return (o55) => e78.reduce((r59, n6) => (r59[n6] = ue(t74, o55), r59), {});
}
function wn(e79, t75, o56, r60) {
  if (t75.indexOf(o56) === -1)
    return null;
  let n47 = _n(o56), s36 = Nn(n47, r60), i26 = e79[o56];
  return L3(e79, i26, s36);
}
function ht(e80, t76) {
  let o57 = mt(e80.theme);
  return Object.keys(e80).map((r61) => wn(e80, t76, r61, o57)).reduce(ne, {});
}
function Bo(e81) {
  return ht(e81, dt);
}
Bo.propTypes = {};
Bo.filterProps = dt;
function Io(e82) {
  return ht(e82, ft);
}
Io.propTypes = {};
Io.filterProps = ft;
function yt(e83) {
  return ht(e83, $o);
}
yt.propTypes = {};
yt.filterProps = $o;
var gt = yt;
function Se(e84) {
  return typeof e84 != "number" ? e84 : `${e84}px solid`;
}
var zn = d7({
  prop: "border",
  themeKey: "borders",
  transform: Se
});
var Mn = d7({
  prop: "borderTop",
  themeKey: "borders",
  transform: Se
});
var $n = d7({
  prop: "borderRight",
  themeKey: "borders",
  transform: Se
});
var Bn = d7({
  prop: "borderBottom",
  themeKey: "borders",
  transform: Se
});
var In = d7({
  prop: "borderLeft",
  themeKey: "borders",
  transform: Se
});
var An = d7({
  prop: "borderColor",
  themeKey: "palette"
});
var jn = d7({
  prop: "borderTopColor",
  themeKey: "palette"
});
var Vn = d7({
  prop: "borderRightColor",
  themeKey: "palette"
});
var Un = d7({
  prop: "borderBottomColor",
  themeKey: "palette"
});
var Dn = d7({
  prop: "borderLeftColor",
  themeKey: "palette"
});
var xt = (e85) => {
  if (e85.borderRadius !== void 0 && e85.borderRadius !== null) {
    let t77 = ce(e85.theme, "shape.borderRadius", 4, "borderRadius"), o58 = (r62) => ({
      borderRadius: ue(t77, r62)
    });
    return L3(e85, e85.borderRadius, o58);
  }
  return null;
};
xt.propTypes = {};
xt.filterProps = [
  "borderRadius"
];
var Ln = j(zn, Mn, $n, Bn, In, An, jn, Vn, Un, Dn, xt);
var bt = Ln;
var Fn = d7({
  prop: "displayPrint",
  cssProperty: false,
  transform: (e86) => ({
    "@media print": {
      display: e86
    }
  })
});
var Wn = d7({
  prop: "display"
});
var Gn = d7({
  prop: "overflow"
});
var Kn = d7({
  prop: "textOverflow"
});
var Hn = d7({
  prop: "visibility"
});
var Yn = d7({
  prop: "whiteSpace"
});
var vt = j(Fn, Wn, Gn, Kn, Hn, Yn);
var qn = d7({
  prop: "flexBasis"
});
var Xn = d7({
  prop: "flexDirection"
});
var Jn = d7({
  prop: "flexWrap"
});
var Qn = d7({
  prop: "justifyContent"
});
var Zn = d7({
  prop: "alignItems"
});
var es = d7({
  prop: "alignContent"
});
var ts = d7({
  prop: "order"
});
var os = d7({
  prop: "flex"
});
var rs = d7({
  prop: "flexGrow"
});
var ns = d7({
  prop: "flexShrink"
});
var ss = d7({
  prop: "alignSelf"
});
var is = d7({
  prop: "justifyItems"
});
var as = d7({
  prop: "justifySelf"
});
var ps = j(qn, Xn, Jn, Qn, Zn, es, ts, os, rs, ns, ss, is, as);
var Tt = ps;
var Pt = (e87) => {
  if (e87.gap !== void 0 && e87.gap !== null) {
    let t78 = ce(e87.theme, "spacing", 8, "gap"), o59 = (r63) => ({
      gap: ue(t78, r63)
    });
    return L3(e87, e87.gap, o59);
  }
  return null;
};
Pt.propTypes = {};
Pt.filterProps = [
  "gap"
];
var Ct = (e88) => {
  if (e88.columnGap !== void 0 && e88.columnGap !== null) {
    let t79 = ce(e88.theme, "spacing", 8, "columnGap"), o60 = (r64) => ({
      columnGap: ue(t79, r64)
    });
    return L3(e88, e88.columnGap, o60);
  }
  return null;
};
Ct.propTypes = {};
Ct.filterProps = [
  "columnGap"
];
var Rt = (e89) => {
  if (e89.rowGap !== void 0 && e89.rowGap !== null) {
    let t80 = ce(e89.theme, "spacing", 8, "rowGap"), o61 = (r65) => ({
      rowGap: ue(t80, r65)
    });
    return L3(e89, e89.rowGap, o61);
  }
  return null;
};
Rt.propTypes = {};
Rt.filterProps = [
  "rowGap"
];
var ls = d7({
  prop: "gridColumn"
});
var cs = d7({
  prop: "gridRow"
});
var us = d7({
  prop: "gridAutoFlow"
});
var ds = d7({
  prop: "gridAutoColumns"
});
var fs = d7({
  prop: "gridAutoRows"
});
var ms = d7({
  prop: "gridTemplateColumns"
});
var hs = d7({
  prop: "gridTemplateRows"
});
var ys = d7({
  prop: "gridTemplateAreas"
});
var gs = d7({
  prop: "gridArea"
});
var xs = j(Pt, Ct, Rt, ls, cs, us, ds, fs, ms, hs, ys, gs);
var Et = xs;
var bs = d7({
  prop: "color",
  themeKey: "palette"
});
var vs = d7({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var Ts = d7({
  prop: "backgroundColor",
  themeKey: "palette"
});
var Ps = j(bs, vs, Ts);
var St = Ps;
var Cs = d7({
  prop: "position"
});
var Rs = d7({
  prop: "zIndex",
  themeKey: "zIndex"
});
var Es = d7({
  prop: "top"
});
var Ss = d7({
  prop: "right"
});
var Os = d7({
  prop: "bottom"
});
var ks = d7({
  prop: "left"
});
var Ot = j(Cs, Rs, Es, Ss, Os, ks);
var _s = d7({
  prop: "boxShadow",
  themeKey: "shadows"
});
var kt = _s;
function se(e90) {
  return e90 <= 1 && e90 !== 0 ? `${e90 * 100}%` : e90;
}
var Ns = d7({
  prop: "width",
  transform: se
});
var Ao = (e91) => {
  if (e91.maxWidth !== void 0 && e91.maxWidth !== null) {
    let t81 = (o62) => {
      var r66, n48, s37;
      return {
        maxWidth: ((r66 = e91.theme) == null || (n48 = r66.breakpoints) == null || (s37 = n48.values) == null ? void 0 : s37[o62]) || Ke[o62] || se(o62)
      };
    };
    return L3(e91, e91.maxWidth, t81);
  }
  return null;
};
Ao.filterProps = [
  "maxWidth"
];
var ws = d7({
  prop: "minWidth",
  transform: se
});
var zs = d7({
  prop: "height",
  transform: se
});
var Ms = d7({
  prop: "maxHeight",
  transform: se
});
var $s = d7({
  prop: "minHeight",
  transform: se
});
var ac = d7({
  prop: "size",
  cssProperty: "width",
  transform: se
});
var pc = d7({
  prop: "size",
  cssProperty: "height",
  transform: se
});
var Bs = d7({
  prop: "boxSizing"
});
var Is = j(Ns, Ao, ws, zs, Ms, $s, Bs);
var _t = Is;
var As = d7({
  prop: "fontFamily",
  themeKey: "typography"
});
var js = d7({
  prop: "fontSize",
  themeKey: "typography"
});
var Vs = d7({
  prop: "fontStyle",
  themeKey: "typography"
});
var Us = d7({
  prop: "fontWeight",
  themeKey: "typography"
});
var Ds = d7({
  prop: "letterSpacing"
});
var Ls = d7({
  prop: "lineHeight"
});
var Fs = d7({
  prop: "textAlign"
});
var Ws = d7({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var Gs = j(Ws, As, js, Vs, Us, Ds, Ls, Fs);
var Nt = Gs;
var jo = {
  borders: bt.filterProps,
  display: vt.filterProps,
  flexbox: Tt.filterProps,
  grid: Et.filterProps,
  positions: Ot.filterProps,
  palette: St.filterProps,
  shadows: kt.filterProps,
  sizing: _t.filterProps,
  spacing: gt.filterProps,
  typography: Nt.filterProps
};
var Ks = {
  borders: bt,
  display: vt,
  flexbox: Tt,
  grid: Et,
  positions: Ot,
  palette: St,
  shadows: kt,
  sizing: _t,
  spacing: gt,
  typography: Nt
};
var wt = Object.keys(jo).reduce((e92, t) => (jo[t].forEach((o) => {
  e92[o] = Ks[t];
}), e92), {});
function Hs(e93, t82, o63) {
  let r67 = {
    [e93]: t82,
    theme: o63
  }, n49 = wt[e93];
  return n49 ? n49(r67) : {
    [e93]: t82
  };
}
var zt = Hs;
function Ys(...e94) {
  let t83 = e94.reduce((r68, n50) => r68.concat(Object.keys(n50)), []), o64 = new Set(t83);
  return e94.every((r69) => o64.size === Object.keys(r69).length);
}
function qs(e95, t84) {
  return typeof e95 == "function" ? e95(t84) : e95;
}
function Mt(e96) {
  let { sx: t85, theme: o65 = {} } = e96 || {};
  if (!t85)
    return null;
  function r70(n51) {
    let s38 = n51;
    if (typeof n51 == "function")
      s38 = n51(o65);
    else if (typeof n51 != "object")
      return n51;
    let i27 = No(o65.breakpoints), l20 = Object.keys(i27), p10 = i27;
    return Object.keys(s38).forEach((u10) => {
      let c12 = qs(s38[u10], o65);
      if (c12 != null) {
        if (typeof c12 == "object") {
          if (wt[u10])
            p10 = ne(p10, zt(u10, c12, o65));
          else {
            let a20 = L3({
              theme: o65
            }, c12, (h4) => ({
              [u10]: h4
            }));
            Ys(a20, c12) ? p10[u10] = Mt({
              sx: c12,
              theme: o65
            }) : p10 = ne(p10, a20);
          }
        } else
          p10 = ne(p10, zt(u10, c12, o65));
      }
    }), wo(l20, p10);
  }
  return Array.isArray(t85) ? t85.map(r70) : r70(t85);
}
Mt.filterProps = [
  "sx"
];
var $t = Mt;
var Xs = [
  "values",
  "unit",
  "step"
];
function Bt(e97) {
  let {
    values: t86 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit: o66 = "px",
    step: r71 = 5
  } = e97, n52 = P1(e97, Xs), s39 = Object.keys(t86);
  function i28(a24) {
    return `@media (min-width:${typeof t86[a24] == "number" ? t86[a24] : a24}${o66})`;
  }
  function l22(a25) {
    return `@media (max-width:${(typeof t86[a25] == "number" ? t86[a25] : a25) - r71 / 100}${o66})`;
  }
  function p14(a26, h5) {
    let g4 = s39.indexOf(h5);
    return `@media (min-width:${typeof t86[a26] == "number" ? t86[a26] : a26}${o66}) and (max-width:${(g4 !== -1 && typeof t86[s39[g4]] == "number" ? t86[s39[g4]] : h5) - r71 / 100}${o66})`;
  }
  function u14(a27) {
    return s39.indexOf(a27) + 1 < s39.length ? p14(a27, s39[s39.indexOf(a27) + 1]) : i28(a27);
  }
  function c13(a28) {
    let h6 = s39.indexOf(a28);
    return h6 === 0 ? i28(s39[1]) : h6 === s39.length - 1 ? l22(s39[h6]) : p14(a28, s39[s39.indexOf(a28) + 1]).replace("@media", "@media not all and");
  }
  return m6({
    keys: s39,
    values: t86,
    up: i28,
    down: l22,
    between: p14,
    only: u14,
    not: c13,
    unit: o66
  }, n52);
}
var Js = {
  borderRadius: 4
};
var Vo = Js;
function It(e98 = 8) {
  if (e98.mui)
    return e98;
  let t87 = mt({
    spacing: e98
  }), o67 = (...r72) => (r72.length === 0 ? [
    1
  ] : r72).map((s40) => {
    let i29 = t87(s40);
    return typeof i29 == "number" ? `${i29}px` : i29;
  }).join(" ");
  return o67.mui = true, o67;
}
var Qs = [
  "breakpoints",
  "palette",
  "spacing",
  "shape"
];
function Zs(e99 = {}, ...t88) {
  let {
    breakpoints: o68 = {},
    palette: r73 = {},
    spacing: n53,
    shape: s43 = {}
  } = e99, i30 = P1(e99, Qs), l23 = Bt(o68), p15 = It(n53), u15 = A({
    breakpoints: l23,
    direction: "ltr",
    components: {},
    palette: m6({
      mode: "light"
    }, r73),
    spacing: p15,
    shape: m6({}, Vo, s43)
  }, i30);
  return u15 = t88.reduce((c14, a29) => A(c14, a29), u15), u15;
}
var ie = Zs;
var ei = mod.createContext(null);
var Do = ei;
function Oe() {
  return mod.useContext(Do);
}
function ti(e100) {
  return Object.keys(e100).length === 0;
}
function oi(e101 = null) {
  let t89 = Oe();
  return !t89 || ti(t89) ? e101 : t89;
}
var Lo = oi;
var ri = ie();
function ni(e102 = ri) {
  return Lo(e102);
}
var Fo = ni;
var si = [
  "variant"
];
function Wo(e103) {
  return e103.length === 0;
}
function Ye(e104) {
  let { variant: t90 } = e104, o69 = P1(e104, si), r74 = t90 || "";
  return Object.keys(o69).sort().forEach((n54) => {
    n54 === "color" ? r74 += Wo(r74) ? e104[n54] : Q(e104[n54]) : r74 += `${Wo(r74) ? n54 : Q(n54)}${Q(e104[n54].toString())}`;
  }), r74;
}
var ii = [
  "name",
  "slot",
  "skipVariantsResolver",
  "skipSx",
  "overridesResolver"
];
var ai = [
  "theme"
];
var pi = [
  "theme"
];
function ke(e105) {
  return Object.keys(e105).length === 0;
}
var li = (e3, t91) => t91.components && t91.components[e3] && t91.components[e3].styleOverrides ? t91.components[e3].styleOverrides : null;
var ci = (e3, t92) => {
  let o70 = [];
  t92 && t92.components && t92.components[e3] && t92.components[e3].variants && (o70 = t92.components[e3].variants);
  let r75 = {};
  return o70.forEach((n55) => {
    let s = Ye(n55.props);
    r75[s] = n55.style;
  }), r75;
};
var ui = (e106, t93, o71, r) => {
  var n56, s44;
  let { ownerState: i34 = {} } = e106, l24 = [], p16 = o71 == null || (n56 = o71.components) == null || (s44 = n56[r]) == null ? void 0 : s44.variants;
  return p16 && p16.forEach((u16) => {
    let c15 = true;
    Object.keys(u16.props).forEach((a7) => {
      i34[a7] !== u16.props[a7] && e106[a7] !== u16.props[a7] && (c15 = false);
    }), c15 && l24.push(t93[Ye(u16.props)]);
  }), l24;
};
function _e(e107) {
  return e107 !== "ownerState" && e107 !== "theme" && e107 !== "sx" && e107 !== "as";
}
var di = ie();
function qe(e108 = {}) {
  let {
    defaultTheme: t94 = di,
    rootShouldForwardProp: o72 = _e,
    slotShouldForwardProp: r76 = _e
  } = e108;
  return (n57, s45 = {}) => {
    let {
      name: i35,
      slot: l25,
      skipVariantsResolver: p17,
      skipSx: u17,
      overridesResolver: c16
    } = s45, a30 = P1(s45, ii), h7 = p17 !== void 0 ? p17 : l25 && l25 !== "Root" || false, g5 = u17 || false, y5, f9 = _e;
    l25 === "Root" ? f9 = o72 : l25 && (f9 = r76);
    let C5 = ct(n57, m6({
      shouldForwardProp: f9,
      label: y5
    }, a30));
    return (E5, ...x5) => {
      let v2 = x5 ? x5.map((T) => typeof T == "function" && T.__emotion_real !== T ? (M2) => {
        let { theme: w4 } = M2, V = P1(M2, ai);
        return T(m6({
          theme: ke(w4) ? t94 : w4
        }, V));
      } : T) : [], R4 = E5;
      i35 && c16 && v2.push((T) => {
        let M3 = ke(T.theme) ? t94 : T.theme, w5 = li(i35, M3);
        return w5 ? c16(T, w5) : null;
      }), i35 && !h7 && v2.push((T) => {
        let M4 = ke(T.theme) ? t94 : T.theme;
        return ui(T, ci(i35, M4), M4, i35);
      }), g5 || v2.push((T) => {
        let M5 = ke(T.theme) ? t94 : T.theme;
        return $t(m6({}, T, {
          theme: M5
        }));
      });
      let S1 = v2.length - x5.length;
      if (Array.isArray(E5) && S1 > 0) {
        let T = new Array(S1).fill("");
        R4 = [
          ...E5,
          ...T
        ], R4.raw = [
          ...E5.raw,
          ...T
        ];
      } else {
        typeof E5 == "function" && (R4 = (T) => {
          let { theme: M6 } = T, w6 = P1(T, pi);
          return E5(m6({
            theme: ke(M6) ? t94 : M6
          }, w6));
        });
      }
      return C5(R4, ...v2);
    };
  };
}
function Xe(e109) {
  let { theme: t95, name: o, props: r77 } = e109;
  return !t95 || !t95.components || !t95.components[o] || !t95.components[o].defaultProps ? r77 : ve(t95.components[o].defaultProps, r77);
}
function Ne({ props: e113, name: t96, defaultTheme: o73 }) {
  let r78 = Fo(o73);
  return Xe({
    theme: r78,
    name: t96,
    props: e113
  });
}
function jt(e114, t97 = 0, o74 = 1) {
  return Math.min(Math.max(t97, e114), o74);
}
function Go(e115) {
  e115 = e115.substr(1);
  let t98 = new RegExp(`.{1,${e115.length >= 6 ? 2 : 1}}`, "g"), o75 = e115.match(t98);
  return o75 && o75[0].length === 1 && (o75 = o75.map((r79) => r79 + r79)), o75 ? `rgb${o75.length === 4 ? "a" : ""}(${o75.map((r80, n58) => n58 < 3 ? parseInt(r80, 16) : Math.round(parseInt(r80, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ae(e116) {
  if (e116.type)
    return e116;
  if (e116.charAt(0) === "#")
    return ae(Go(e116));
  let t99 = e116.indexOf("("), o76 = e116.substring(0, t99);
  if ([
    "rgb",
    "rgba",
    "hsl",
    "hsla",
    "color"
  ].indexOf(o76) === -1) {
    throw new Error(J(9, e116));
  }
  let r81 = e116.substring(t99 + 1, e116.length - 1), n59;
  if (o76 === "color") {
    if (r81 = r81.split(" "), n59 = r81.shift(), r81.length === 4 && r81[3].charAt(0) === "/" && (r81[3] = r81[3].substr(1)), [
      "srgb",
      "display-p3",
      "a98-rgb",
      "prophoto-rgb",
      "rec-2020"
    ].indexOf(n59) === -1) {
      throw new Error(J(10, n59));
    }
  } else
    r81 = r81.split(",");
  return r81 = r81.map((s46) => parseFloat(s46)), {
    type: o76,
    values: r81,
    colorSpace: n59
  };
}
function we(e117) {
  let { type: t100, colorSpace: o77 } = e117, { values: r82 } = e117;
  return t100.indexOf("rgb") !== -1 ? r82 = r82.map((n60, s47) => s47 < 3 ? parseInt(n60, 10) : n60) : t100.indexOf("hsl") !== -1 && (r82[1] = `${r82[1]}%`, r82[2] = `${r82[2]}%`), t100.indexOf("color") !== -1 ? r82 = `${o77} ${r82.join(" ")}` : r82 = `${r82.join(", ")}`, `${t100}(${r82})`;
}
function Ko(e118) {
  e118 = ae(e118);
  let { values: t101 } = e118, o78 = t101[0], r83 = t101[1] / 100, n61 = t101[2] / 100, s48 = r83 * Math.min(n61, 1 - n61), i36 = (u18, c17 = (u18 + o78 / 30) % 12) => n61 - s48 * Math.max(Math.min(c17 - 3, 9 - c17, 1), -1), l26 = "rgb", p18 = [
    Math.round(i36(0) * 255),
    Math.round(i36(8) * 255),
    Math.round(i36(4) * 255)
  ];
  return e118.type === "hsla" && (l26 += "a", p18.push(t101[3])), we({
    type: l26,
    values: p18
  });
}
function Vt(e119) {
  e119 = ae(e119);
  let t102 = e119.type === "hsl" ? ae(Ko(e119)).values : e119.values;
  return t102 = t102.map((o79) => (e119.type !== "color" && (o79 /= 255), o79 <= 0.03928 ? o79 / 12.92 : ((o79 + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t102[0] + 0.7152 * t102[1] + 0.0722 * t102[2]).toFixed(3));
}
function Ut(e120, t103) {
  let o80 = Vt(e120), r84 = Vt(t103);
  return (Math.max(o80, r84) + 0.05) / (Math.min(o80, r84) + 0.05);
}
function H(e121, t104) {
  return e121 = ae(e121), t104 = jt(t104), (e121.type === "rgb" || e121.type === "hsl") && (e121.type += "a"), e121.type === "color" ? e121.values[3] = `/${t104}` : e121.values[3] = t104, we(e121);
}
function Dt(e122, t105) {
  if (e122 = ae(e122), t105 = jt(t105), e122.type.indexOf("hsl") !== -1) {
    e122.values[2] *= 1 - t105;
  } else if (e122.type.indexOf("rgb") !== -1 || e122.type.indexOf("color") !== -1) {
    for (let o81 = 0; o81 < 3; o81 += 1)
      e122.values[o81] *= 1 - t105;
  }
  return we(e122);
}
function Lt(e123, t106) {
  if (e123 = ae(e123), t106 = jt(t106), e123.type.indexOf("hsl") !== -1) {
    e123.values[2] += (100 - e123.values[2]) * t106;
  } else if (e123.type.indexOf("rgb") !== -1) {
    for (let o82 = 0; o82 < 3; o82 += 1) {
      e123.values[o82] += (255 - e123.values[o82]) * t106;
    }
  } else if (e123.type.indexOf("color") !== -1) {
    for (let o110 = 0; o110 < 3; o110 += 1) {
      e123.values[o110] += (1 - e123.values[o110]) * t106;
    }
  }
  return we(e123);
}
function Ft(e124, t, o83) {
  return m6({
    toolbar: {
      minHeight: 56,
      [`${e124.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [e124.up("sm")]: {
        minHeight: 64
      }
    }
  }, o83);
}
var fi = {
  black: "#000",
  white: "#fff"
};
var Pe = fi;
var mi = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var Ho = mi;
var hi = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var de = hi;
var yi = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var fe = yi;
var gi = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var Ce = gi;
var xi = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var me = xi;
var bi = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var he = bi;
var vi = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var ye = vi;
var Ti = [
  "mode",
  "contrastThreshold",
  "tonalOffset"
];
var Yo = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: Pe.white,
    default: Pe.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var Wt = {
  text: {
    primary: Pe.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: Pe.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function qo(e125, t107, o84, r85) {
  let n62 = r85.light || r85, s49 = r85.dark || r85 * 1.5;
  e125[t107] || (e125.hasOwnProperty(o84) ? e125[t107] = e125[o84] : t107 === "light" ? e125.light = Lt(e125.main, n62) : t107 === "dark" && (e125.dark = Dt(e125.main, s49)));
}
function Pi(e126 = "light") {
  return e126 === "dark" ? {
    main: me[200],
    light: me[50],
    dark: me[400]
  } : {
    main: me[700],
    light: me[400],
    dark: me[800]
  };
}
function Ci(e127 = "light") {
  return e127 === "dark" ? {
    main: de[200],
    light: de[50],
    dark: de[400]
  } : {
    main: de[500],
    light: de[300],
    dark: de[700]
  };
}
function Ri(e128 = "light") {
  return e128 === "dark" ? {
    main: fe[500],
    light: fe[300],
    dark: fe[700]
  } : {
    main: fe[700],
    light: fe[400],
    dark: fe[800]
  };
}
function Ei(e129 = "light") {
  return e129 === "dark" ? {
    main: he[400],
    light: he[300],
    dark: he[700]
  } : {
    main: he[700],
    light: he[500],
    dark: he[900]
  };
}
function Si(e130 = "light") {
  return e130 === "dark" ? {
    main: ye[400],
    light: ye[300],
    dark: ye[700]
  } : {
    main: ye[800],
    light: ye[500],
    dark: ye[900]
  };
}
function Oi(e131 = "light") {
  return e131 === "dark" ? {
    main: Ce[400],
    light: Ce[300],
    dark: Ce[700]
  } : {
    main: "#ed6c02",
    light: Ce[500],
    dark: Ce[900]
  };
}
function Gt(e132) {
  let {
    mode: t108 = "light",
    contrastThreshold: o85 = 3,
    tonalOffset: r86 = 0.2
  } = e132, n63 = P1(e132, Ti), s50 = e132.primary || Pi(t108), i37 = e132.secondary || Ci(t108), l27 = e132.error || Ri(t108), p19 = e132.info || Ei(t108), u19 = e132.success || Si(t108), c18 = e132.warning || Oi(t108);
  function a34(f10) {
    return Ut(f10, Wt.text.primary) >= o85 ? Wt.text.primary : Yo.text.primary;
  }
  let h8 = ({
    color: f13,
    name: C6,
    mainShade: k = 500,
    lightShade: E6 = 300,
    darkShade: x6 = 700
  }) => {
    if (f13 = m6({}, f13), !f13.main && f13[k] && (f13.main = f13[k]), !f13.hasOwnProperty("main")) {
      throw new Error(J(11, C6 ? ` (${C6})` : "", k));
    }
    if (typeof f13.main != "string") {
      throw new Error(J(12, C6 ? ` (${C6})` : "", JSON.stringify(f13.main)));
    }
    return qo(f13, "light", E6, r86), qo(f13, "dark", x6, r86), f13.contrastText || (f13.contrastText = a34(f13.main)), f13;
  }, g6 = {
    dark: Wt,
    light: Yo
  };
  return A(m6({
    common: Pe,
    mode: t108,
    primary: h8({
      color: s50,
      name: "primary"
    }),
    secondary: h8({
      color: i37,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: h8({
      color: l27,
      name: "error"
    }),
    warning: h8({
      color: c18,
      name: "warning"
    }),
    info: h8({
      color: p19,
      name: "info"
    }),
    success: h8({
      color: u19,
      name: "success"
    }),
    grey: Ho,
    contrastThreshold: o85,
    getContrastText: a34,
    augmentColor: h8,
    tonalOffset: r86
  }, g6[t108]), n63);
}
var ki = [
  "fontFamily",
  "fontSize",
  "fontWeightLight",
  "fontWeightRegular",
  "fontWeightMedium",
  "fontWeightBold",
  "htmlFontSize",
  "allVariants",
  "pxToRem"
];
function _i(e133) {
  return Math.round(e133 * 1e5) / 1e5;
}
var Xo = {
  textTransform: "uppercase"
};
var Jo = '"Roboto", "Helvetica", "Arial", sans-serif';
function Kt(e134, t109) {
  let o86 = typeof t109 == "function" ? t109(e134) : t109, {
    fontFamily: r87 = Jo,
    fontSize: n64 = 14,
    fontWeightLight: s51 = 300,
    fontWeightRegular: i38 = 400,
    fontWeightMedium: l28 = 500,
    fontWeightBold: p20 = 700,
    htmlFontSize: u20 = 16,
    allVariants: c19,
    pxToRem: a35
  } = o86, h9 = P1(o86, ki), g7 = n64 / 14, y6 = a35 || ((k) => `${k / u20 * g7}rem`), f14 = (k, E7, x7, v3, R5) => m6({
    fontFamily: r87,
    fontWeight: k,
    fontSize: y6(E7),
    lineHeight: x7
  }, r87 === Jo ? {
    letterSpacing: `${_i(v3 / E7)}em`
  } : {}, R5, c19), C7 = {
    h1: f14(s51, 96, 1.167, -1.5),
    h2: f14(s51, 60, 1.2, -0.5),
    h3: f14(i38, 48, 1.167, 0),
    h4: f14(i38, 34, 1.235, 0.25),
    h5: f14(i38, 24, 1.334, 0),
    h6: f14(l28, 20, 1.6, 0.15),
    subtitle1: f14(i38, 16, 1.75, 0.15),
    subtitle2: f14(l28, 14, 1.57, 0.1),
    body1: f14(i38, 16, 1.5, 0.15),
    body2: f14(i38, 14, 1.43, 0.15),
    button: f14(l28, 14, 1.75, 0.4, Xo),
    caption: f14(i38, 12, 1.66, 0.4),
    overline: f14(i38, 12, 2.66, 1, Xo)
  };
  return A(m6({
    htmlFontSize: u20,
    pxToRem: y6,
    fontFamily: r87,
    fontSize: n64,
    fontWeightLight: s51,
    fontWeightRegular: i38,
    fontWeightMedium: l28,
    fontWeightBold: p20
  }, C7), h9, {
    clone: false
  });
}
var Ni = 0.2;
var wi = 0.14;
var zi = 0.12;
function N(...e135) {
  return [
    `${e135[0]}px ${e135[1]}px ${e135[2]}px ${e135[3]}px rgba(0,0,0,${Ni})`,
    `${e135[4]}px ${e135[5]}px ${e135[6]}px ${e135[7]}px rgba(0,0,0,${wi})`,
    `${e135[8]}px ${e135[9]}px ${e135[10]}px ${e135[11]}px rgba(0,0,0,${zi})`
  ].join(",");
}
var Mi = [
  "none",
  N(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  N(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  N(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  N(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  N(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  N(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  N(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  N(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  N(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  N(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  N(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  N(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  N(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  N(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  N(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  N(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  N(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  N(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  N(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  N(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  N(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  N(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  N(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  N(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
];
var Qo = Mi;
var $i = [
  "duration",
  "easing",
  "delay"
];
var Bi = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var Ii = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function Zo(e136) {
  return `${Math.round(e136)}ms`;
}
function Ai(e137) {
  if (!e137)
    return 0;
  let t110 = e137 / 36;
  return Math.round((4 + 15 * t110 ** 0.25 + t110 / 5) * 10);
}
function Ht(e138) {
  let t111 = m6({}, Bi, e138.easing), o87 = m6({}, Ii, e138.duration);
  return m6({
    getAutoHeightDuration: Ai,
    create: (n65 = [
      "all"
    ], s52 = {}) => {
      let {
        duration: i39 = o87.standard,
        easing: l29 = t111.easeInOut,
        delay: p22 = 0
      } = s52, u5 = P1(s52, $i);
      return (Array.isArray(n65) ? n65 : [
        n65
      ]).map((c20) => `${c20} ${typeof i39 == "string" ? i39 : Zo(i39)} ${l29} ${typeof p22 == "string" ? p22 : Zo(p22)}`).join(",");
    }
  }, e138, {
    easing: t111,
    duration: o87
  });
}
var ji = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var er = ji;
var Vi = [
  "breakpoints",
  "mixins",
  "spacing",
  "palette",
  "transitions",
  "typography",
  "shape"
];
function Ui(e139 = {}, ...t112) {
  let {
    mixins: o88 = {},
    palette: r88 = {},
    transitions: n66 = {},
    typography: s53 = {}
  } = e139, i40 = P1(e139, Vi), l30 = Gt(r88), p23 = ie(e139), u21 = A(p23, {
    mixins: Ft(p23.breakpoints, p23.spacing, o88),
    palette: l30,
    shadows: Qo.slice(),
    typography: Kt(l30, s53),
    transitions: Ht(n66),
    zIndex: m6({}, er)
  });
  return u21 = A(u21, i40), u21 = t112.reduce((c21, a36) => A(c21, a36), u21), u21;
}
var tr = Ui;
var Di = tr();
var Je = Di;
var Yt = (e140) => _e(e140) && e140 !== "classes";
var Li = qe({
  defaultTheme: Je,
  rootShouldForwardProp: Yt
});
var I2 = Li;
function D({ props: e141, name: t113 }) {
  return Ne({
    props: e141,
    name: t113,
    defaultTheme: Je
  });
}
var qt = De;
var ze = Ue;
var or = We;
function Fi(e142) {
  let {
    className: t114,
    classes: o89,
    pulsate: r89 = false,
    rippleX: n67,
    rippleY: s54,
    rippleSize: i41,
    in: l32,
    onExited: p24,
    timeout: u22
  } = e142, [c22, a37] = mod.useState(false), h10 = O(t114, o89.ripple, o89.rippleVisible, r89 && o89.ripplePulsate), g8 = {
    width: i41,
    height: i41,
    top: -(i41 / 2) + s54,
    left: -(i41 / 2) + n67
  }, y7 = O(o89.child, c22 && o89.childLeaving, r89 && o89.childPulsate);
  return !l32 && !c22 && a37(true), mod.useEffect(() => {
    if (!l32 && p24 != null) {
      let f15 = setTimeout(p24, u22);
      return () => {
        clearTimeout(f15);
      };
    }
  }, [
    p24,
    l32,
    u22
  ]), p5("span", {
    className: h10,
    style: g8,
    children: p5("span", {
      className: y7
    })
  });
}
var nr = Fi;
var Wi = B("MuiTouchRipple", [
  "root",
  "ripple",
  "rippleVisible",
  "ripplePulsate",
  "child",
  "childLeaving",
  "childPulsate"
]);
var G = Wi;
var Gi = [
  "center",
  "classes",
  "className"
];
var Ze = (e143) => e143;
var sr;
var ir;
var ar;
var pr;
var Jt = 550;
var Hi = 80;
var Yi = m(sr || (sr = Ze`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
var qi = m(ir || (ir = Ze`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
var Xi = m(ar || (ar = Ze`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
var Ji = I2("span", {
  name: "MuiTouchRipple",
  slot: "Root",
  skipSx: true
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var Qi = I2(nr, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(pr || (pr = Ze`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), G.rippleVisible, Yi, Jt, ({ theme: e144 }) => e144.transitions.easing.easeInOut, G.ripplePulsate, ({ theme: e145 }) => e145.transitions.duration.shorter, G.child, G.childLeaving, qi, Jt, ({ theme: e146 }) => e146.transitions.easing.easeInOut, G.childPulsate, Xi, ({ theme: e147 }) => e147.transitions.easing.easeInOut);
var Zi = mod.forwardRef(function(t115, o90) {
  let r90 = D({
    props: t115,
    name: "MuiTouchRipple"
  }), { center: n68 = false, classes: s55 = {}, className: i42 } = r90, l33 = P1(r90, Gi), [p25, u23] = mod.useState([]), c23 = mod.useRef(0), a38 = mod.useRef(null);
  mod.useEffect(() => {
    a38.current && (a38.current(), a38.current = null);
  }, [
    p25
  ]);
  let h11 = mod.useRef(false), g9 = mod.useRef(null), y8 = mod.useRef(null), f16 = mod.useRef(null);
  mod.useEffect(() => () => {
    clearTimeout(g9.current);
  }, []);
  let C8 = mod.useCallback((v4) => {
    let { pulsate: R6, rippleX: S2, rippleY: W, rippleSize: T, cb: M7 } = v4;
    u23((w7) => [
      ...w7,
      p5(Qi, {
        classes: {
          ripple: O(s55.ripple, G.ripple),
          rippleVisible: O(s55.rippleVisible, G.rippleVisible),
          ripplePulsate: O(s55.ripplePulsate, G.ripplePulsate),
          child: O(s55.child, G.child),
          childLeaving: O(s55.childLeaving, G.childLeaving),
          childPulsate: O(s55.childPulsate, G.childPulsate)
        },
        timeout: Jt,
        pulsate: R6,
        rippleX: S2,
        rippleY: W,
        rippleSize: T
      }, c23.current)
    ]), c23.current += 1, a38.current = M7;
  }, [
    s55
  ]), k = mod.useCallback((v5 = {}, R7 = {}, S3) => {
    let {
      pulsate: W = false,
      center: T = n68 || R7.pulsate,
      fakeElement: M8 = false
    } = R7;
    if (v5.type === "mousedown" && h11.current) {
      h11.current = false;
      return;
    }
    v5.type === "touchstart" && (h11.current = true);
    let w8 = M8 ? null : f16.current, V = w8 ? w8.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }, K, Y, q1;
    if (T || v5.clientX === 0 && v5.clientY === 0 || !v5.clientX && !v5.touches) {
      K = Math.round(V.width / 2), Y = Math.round(V.height / 2);
    } else {
      let { clientX: te, clientY: oe } = v5.touches ? v5.touches[0] : v5;
      K = Math.round(te - V.left), Y = Math.round(oe - V.top);
    }
    if (T) {
      q1 = Math.sqrt((2 * V.width ** 2 + V.height ** 2) / 3), q1 % 2 === 0 && (q1 += 1);
    } else {
      let te = Math.max(Math.abs((w8 ? w8.clientWidth : 0) - K), K) * 2 + 2, oe = Math.max(Math.abs((w8 ? w8.clientHeight : 0) - Y), Y) * 2 + 2;
      q1 = Math.sqrt(te ** 2 + oe ** 2);
    }
    v5.touches ? y8.current === null && (y8.current = () => {
      C8({
        pulsate: W,
        rippleX: K,
        rippleY: Y,
        rippleSize: q1,
        cb: S3
      });
    }, g9.current = setTimeout(() => {
      y8.current && (y8.current(), y8.current = null);
    }, Hi)) : C8({
      pulsate: W,
      rippleX: K,
      rippleY: Y,
      rippleSize: q1,
      cb: S3
    });
  }, [
    n68,
    C8
  ]), E8 = mod.useCallback(() => {
    k({}, {
      pulsate: true
    });
  }, [
    k
  ]), x8 = mod.useCallback((v6, R8) => {
    if (clearTimeout(g9.current), v6.type === "touchend" && y8.current) {
      y8.current(), y8.current = null, g9.current = setTimeout(() => {
        x8(v6, R8);
      });
      return;
    }
    y8.current = null, u23((S4) => S4.length > 0 ? S4.slice(1) : S4), a38.current = R8;
  }, []);
  return mod.useImperativeHandle(o90, () => ({
    pulsate: E8,
    start: k,
    stop: x8
  }), [
    E8,
    k,
    x8
  ]), p5(Ji, m6({
    className: O(s55.root, G.root, i42),
    ref: f16
  }, l33, {
    children: p5(d4, {
      component: null,
      exit: true,
      children: p25
    })
  }));
});
var lr = Zi;
function cr(e148) {
  return $("MuiButtonBase", e148);
}
var ea = B("MuiButtonBase", [
  "root",
  "disabled",
  "focusVisible"
]);
var ur = ea;
var ta = [
  "action",
  "centerRipple",
  "children",
  "className",
  "component",
  "disabled",
  "disableRipple",
  "disableTouchRipple",
  "focusRipple",
  "focusVisibleClassName",
  "LinkComponent",
  "onBlur",
  "onClick",
  "onContextMenu",
  "onDragLeave",
  "onFocus",
  "onFocusVisible",
  "onKeyDown",
  "onKeyUp",
  "onMouseDown",
  "onMouseLeave",
  "onMouseUp",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "tabIndex",
  "TouchRippleProps",
  "type"
];
var na = (e149) => {
  let {
    disabled: t116,
    focusVisible: o91,
    focusVisibleClassName: r91,
    classes: n69
  } = e149, i43 = U({
    root: [
      "root",
      t116 && "disabled",
      o91 && "focusVisible"
    ]
  }, cr, n69);
  return o91 && r91 && (i43.root += ` ${r91}`), i43;
};
var sa = I2("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e3, t117) => t117.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${ur.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ia = mod.forwardRef(function(t118, o92) {
  let r92 = D({
    props: t118,
    name: "MuiButtonBase"
  }), {
    action: n70,
    centerRipple: s56 = false,
    children: i44,
    className: l34,
    component: p26 = "button",
    disabled: u24 = false,
    disableRipple: c24 = false,
    disableTouchRipple: a39 = false,
    focusRipple: h12 = false,
    LinkComponent: g10 = "a",
    onBlur: y9,
    onClick: f17,
    onContextMenu: C9,
    onDragLeave: k,
    onFocus: E9,
    onFocusVisible: x9,
    onKeyDown: v7,
    onKeyUp: R9,
    onMouseDown: S5,
    onMouseLeave: W,
    onMouseUp: T,
    onTouchEnd: M9,
    onTouchMove: w9,
    onTouchStart: V,
    tabIndex: K = 0,
    TouchRippleProps: Y,
    type: q2
  } = r92, te = P1(r92, ta), oe = mod.useRef(null), X = mod.useRef(null), { isFocusVisibleRef: ro, onFocus: Or, onBlur: kr, ref: _r } = or(), [le, $e] = mod.useState(false);
  u24 && le && $e(false), mod.useImperativeHandle(n70, () => ({
    focusVisible: () => {
      $e(true), oe.current.focus();
    }
  }), []), mod.useEffect(() => {
    le && h12 && !c24 && X.current.pulsate();
  }, [
    c24,
    h12,
    le
  ]);
  function re(b2, so, Yr = a39) {
    return ze((io) => (so && so(io), !Yr && X.current && X.current[b2](io), true));
  }
  let Nr = re("start", S5), wr = re("stop", C9), zr = re("stop", k), Mr = re("stop", T), $r = re("stop", (b2) => {
    le && b2.preventDefault(), W && W(b2);
  }), Br = re("start", V), Ir = re("stop", M9), Ar = re("stop", w9), jr = re("stop", (b3) => {
    kr(b3), ro.current === false && $e(false), y9 && y9(b3);
  }, false), Vr = ze((b4) => {
    oe.current || (oe.current = b4.currentTarget), Or(b4), ro.current === true && ($e(true), x9 && x9(b4)), E9 && E9(b4);
  }), rt = () => {
    let b5 = oe.current;
    return p26 && p26 !== "button" && !(b5.tagName === "A" && b5.href);
  }, nt = mod.useRef(false), Ur = ze((b6) => {
    h12 && !nt.current && le && X.current && b6.key === " " && (nt.current = true, X.current.stop(b6, () => {
      X.current.start(b6);
    })), b6.target === b6.currentTarget && rt() && b6.key === " " && b6.preventDefault(), v7 && v7(b6), b6.target === b6.currentTarget && rt() && b6.key === "Enter" && !u24 && (b6.preventDefault(), f17 && f17(b6));
  }), Dr = ze((b7) => {
    h12 && b7.key === " " && X.current && le && !b7.defaultPrevented && (nt.current = false, X.current.stop(b7, () => {
      X.current.pulsate(b7);
    })), R9 && R9(b7), f17 && b7.target === b7.currentTarget && rt() && b7.key === " " && !b7.defaultPrevented && f17(b7);
  }), Be = p26;
  Be === "button" && (te.href || te.to) && (Be = g10);
  let Re = {};
  Be === "button" ? (Re.type = q2 === void 0 ? "button" : q2, Re.disabled = u24) : (!te.href && !te.to && (Re.role = "button"), u24 && (Re["aria-disabled"] = u24));
  let Lr = qt(_r, oe), Fr = qt(o92, Lr), [Wr, Gr] = mod.useState(false);
  mod.useEffect(() => {
    Gr(true);
  }, []);
  let Kr = Wr && !c24 && !u24, no = m6({}, r92, {
    centerRipple: s56,
    component: p26,
    disabled: u24,
    disableRipple: c24,
    disableTouchRipple: a39,
    focusRipple: h12,
    tabIndex: K,
    focusVisible: le
  }), Hr = na(no);
  return y2(sa, m6({
    as: Be,
    className: O(Hr.root, l34),
    ownerState: no,
    onBlur: jr,
    onClick: f17,
    onContextMenu: wr,
    onFocus: Vr,
    onKeyDown: Ur,
    onKeyUp: Dr,
    onMouseDown: Nr,
    onMouseLeave: $r,
    onMouseUp: Mr,
    onDragLeave: zr,
    onTouchEnd: Ir,
    onTouchMove: Ar,
    onTouchStart: Br,
    ref: Fr,
    tabIndex: u24 ? -1 : K,
    type: q2
  }, Re, te, {
    children: [
      i44,
      Kr ? p5(lr, m6({
        ref: X,
        center: s56
      }, Y)) : null
    ]
  }));
});
var ge = ia;
var _2 = Q;
function dr(e150) {
  return $("MuiFab", e150);
}
var aa = B("MuiFab", [
  "root",
  "primary",
  "secondary",
  "extended",
  "circular",
  "focusVisible",
  "disabled",
  "colorInherit",
  "sizeSmall",
  "sizeMedium",
  "sizeLarge"
]);
var Qt = aa;
var pa = [
  "children",
  "className",
  "color",
  "component",
  "disabled",
  "disableFocusRipple",
  "focusVisibleClassName",
  "size",
  "variant"
];
var ca = (e151) => {
  let { color: t119, variant: o93, classes: r93, size: n71 } = e151, s57 = {
    root: [
      "root",
      o93,
      `size${_2(n71)}`,
      t119 === "inherit" && "colorInherit",
      t119 === "primary" && "primary",
      t119 === "secondary" && "secondary"
    ]
  };
  return U(s57, dr, r93);
};
var ua = I2(ge, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (e152, t120) => {
    let { ownerState: o94 } = e152;
    return [
      t120.root,
      t120[o94.variant],
      t120[`size${_2(o94.size)}`],
      o94.color === "inherit" && t120.colorInherit,
      o94.color === "primary" && t120.primary,
      o94.color === "secondary" && t120.secondary
    ];
  }
})(({ theme: e153, ownerState: t121 }) => m6({}, e153.typography.button, {
  minHeight: 36,
  transition: e153.transitions.create([
    "background-color",
    "box-shadow",
    "border-color"
  ], {
    duration: e153.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: e153.shadows[6],
  "&:active": {
    boxShadow: e153.shadows[12]
  },
  color: e153.palette.getContrastText(e153.palette.grey[300]),
  backgroundColor: e153.palette.grey[300],
  "&:hover": {
    backgroundColor: e153.palette.grey.A100,
    "@media (hover: none)": {
      backgroundColor: e153.palette.grey[300]
    },
    textDecoration: "none"
  },
  [`&.${Qt.focusVisible}`]: {
    boxShadow: e153.shadows[6]
  },
  [`&.${Qt.disabled}`]: {
    color: e153.palette.action.disabled,
    boxShadow: e153.shadows[0],
    backgroundColor: e153.palette.action.disabledBackground
  }
}, t121.size === "small" && {
  width: 40,
  height: 40
}, t121.size === "medium" && {
  width: 48,
  height: 48
}, t121.variant === "extended" && {
  borderRadius: 48 / 2,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, t121.variant === "extended" && t121.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, t121.variant === "extended" && t121.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, t121.color === "inherit" && {
  color: "inherit"
}), ({ theme: e154, ownerState: t122 }) => m6({}, t122.color === "primary" && {
  color: e154.palette.primary.contrastText,
  backgroundColor: e154.palette.primary.main,
  "&:hover": {
    backgroundColor: e154.palette.primary.dark,
    "@media (hover: none)": {
      backgroundColor: e154.palette.primary.main
    }
  }
}, t122.color === "secondary" && {
  color: e154.palette.secondary.contrastText,
  backgroundColor: e154.palette.secondary.main,
  "&:hover": {
    backgroundColor: e154.palette.secondary.dark,
    "@media (hover: none)": {
      backgroundColor: e154.palette.secondary.main
    }
  }
}));
var da = l1(function(t123, o95) {
  let r94 = D({
    props: t123,
    name: "MuiFab"
  }), {
    children: n72,
    className: s58,
    color: i45 = "default",
    component: l35 = "button",
    disabled: p27 = false,
    disableFocusRipple: u25 = false,
    focusVisibleClassName: c25,
    size: a40 = "large",
    variant: h13 = "circular"
  } = r94, g11 = P1(r94, pa), y10 = m6({}, r94, {
    color: i45,
    component: l35,
    disabled: p27,
    disableFocusRipple: u25,
    size: a40,
    variant: h13
  }), f18 = ca(y10);
  return p5(ua, m6({
    className: O(f18.root, s58),
    component: l35,
    disabled: p27,
    focusRipple: !u25,
    focusVisibleClassName: O(f18.focusVisible, c25),
    ownerState: y10,
    ref: o95
  }, g11, {
    children: n72
  }));
});
var Zt = da;
function mr(e155) {
  return $("MuiButton", e155);
}
var fa = B("MuiButton", [
  "root",
  "text",
  "textInherit",
  "textPrimary",
  "textSecondary",
  "outlined",
  "outlinedInherit",
  "outlinedPrimary",
  "outlinedSecondary",
  "contained",
  "containedInherit",
  "containedPrimary",
  "containedSecondary",
  "disableElevation",
  "focusVisible",
  "disabled",
  "colorInherit",
  "textSizeSmall",
  "textSizeMedium",
  "textSizeLarge",
  "outlinedSizeSmall",
  "outlinedSizeMedium",
  "outlinedSizeLarge",
  "containedSizeSmall",
  "containedSizeMedium",
  "containedSizeLarge",
  "sizeMedium",
  "sizeSmall",
  "sizeLarge",
  "fullWidth",
  "startIcon",
  "endIcon",
  "iconSizeSmall",
  "iconSizeMedium",
  "iconSizeLarge"
]);
var Me = fa;
var ma = mod.createContext({});
var yr = ma;
var ha = [
  "children",
  "color",
  "component",
  "className",
  "disabled",
  "disableElevation",
  "disableFocusRipple",
  "endIcon",
  "focusVisibleClassName",
  "fullWidth",
  "size",
  "startIcon",
  "type",
  "variant"
];
var ga = (e156) => {
  let {
    color: t124,
    disableElevation: o96,
    fullWidth: r95,
    size: n73,
    variant: s59,
    classes: i46
  } = e156, l36 = {
    root: [
      "root",
      s59,
      `${s59}${_2(t124)}`,
      `size${_2(n73)}`,
      `${s59}Size${_2(n73)}`,
      t124 === "inherit" && "colorInherit",
      o96 && "disableElevation",
      r95 && "fullWidth"
    ],
    label: [
      "label"
    ],
    startIcon: [
      "startIcon",
      `iconSize${_2(n73)}`
    ],
    endIcon: [
      "endIcon",
      `iconSize${_2(n73)}`
    ]
  }, p28 = U(l36, mr, i46);
  return m6({}, i46, p28);
};
var xr = (e157) => m6({}, e157.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, e157.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, e157.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
var xa = I2(ge, {
  shouldForwardProp: (e158) => Yt(e158) || e158 === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e159, t125) => {
    let { ownerState: o97 } = e159;
    return [
      t125.root,
      t125[o97.variant],
      t125[`${o97.variant}${_2(o97.color)}`],
      t125[`size${_2(o97.size)}`],
      t125[`${o97.variant}Size${_2(o97.size)}`],
      o97.color === "inherit" && t125.colorInherit,
      o97.disableElevation && t125.disableElevation,
      o97.fullWidth && t125.fullWidth
    ];
  }
})(({ theme: e160, ownerState: t126 }) => m6({}, e160.typography.button, {
  minWidth: 64,
  padding: "6px 16px",
  borderRadius: e160.shape.borderRadius,
  transition: e160.transitions.create([
    "background-color",
    "box-shadow",
    "border-color",
    "color"
  ], {
    duration: e160.transitions.duration.short
  }),
  "&:hover": m6({
    textDecoration: "none",
    backgroundColor: H(e160.palette.text.primary, e160.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t126.variant === "text" && t126.color !== "inherit" && {
    backgroundColor: H(e160.palette[t126.color].main, e160.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t126.variant === "outlined" && t126.color !== "inherit" && {
    border: `1px solid ${e160.palette[t126.color].main}`,
    backgroundColor: H(e160.palette[t126.color].main, e160.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t126.variant === "contained" && {
    backgroundColor: e160.palette.grey.A100,
    boxShadow: e160.shadows[4],
    "@media (hover: none)": {
      boxShadow: e160.shadows[2],
      backgroundColor: e160.palette.grey[300]
    }
  }, t126.variant === "contained" && t126.color !== "inherit" && {
    backgroundColor: e160.palette[t126.color].dark,
    "@media (hover: none)": {
      backgroundColor: e160.palette[t126.color].main
    }
  }),
  "&:active": m6({}, t126.variant === "contained" && {
    boxShadow: e160.shadows[8]
  }),
  [`&.${Me.focusVisible}`]: m6({}, t126.variant === "contained" && {
    boxShadow: e160.shadows[6]
  }),
  [`&.${Me.disabled}`]: m6({
    color: e160.palette.action.disabled
  }, t126.variant === "outlined" && {
    border: `1px solid ${e160.palette.action.disabledBackground}`
  }, t126.variant === "outlined" && t126.color === "secondary" && {
    border: `1px solid ${e160.palette.action.disabled}`
  }, t126.variant === "contained" && {
    color: e160.palette.action.disabled,
    boxShadow: e160.shadows[0],
    backgroundColor: e160.palette.action.disabledBackground
  })
}, t126.variant === "text" && {
  padding: "6px 8px"
}, t126.variant === "text" && t126.color !== "inherit" && {
  color: e160.palette[t126.color].main
}, t126.variant === "outlined" && {
  padding: "5px 15px",
  border: `1px solid ${e160.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
}, t126.variant === "outlined" && t126.color !== "inherit" && {
  color: e160.palette[t126.color].main,
  border: `1px solid ${H(e160.palette[t126.color].main, 0.5)}`
}, t126.variant === "contained" && {
  color: e160.palette.getContrastText(e160.palette.grey[300]),
  backgroundColor: e160.palette.grey[300],
  boxShadow: e160.shadows[2]
}, t126.variant === "contained" && t126.color !== "inherit" && {
  color: e160.palette[t126.color].contrastText,
  backgroundColor: e160.palette[t126.color].main
}, t126.color === "inherit" && {
  color: "inherit",
  borderColor: "currentColor"
}, t126.size === "small" && t126.variant === "text" && {
  padding: "4px 5px",
  fontSize: e160.typography.pxToRem(13)
}, t126.size === "large" && t126.variant === "text" && {
  padding: "8px 11px",
  fontSize: e160.typography.pxToRem(15)
}, t126.size === "small" && t126.variant === "outlined" && {
  padding: "3px 9px",
  fontSize: e160.typography.pxToRem(13)
}, t126.size === "large" && t126.variant === "outlined" && {
  padding: "7px 21px",
  fontSize: e160.typography.pxToRem(15)
}, t126.size === "small" && t126.variant === "contained" && {
  padding: "4px 10px",
  fontSize: e160.typography.pxToRem(13)
}, t126.size === "large" && t126.variant === "contained" && {
  padding: "8px 22px",
  fontSize: e160.typography.pxToRem(15)
}, t126.fullWidth && {
  width: "100%"
}), ({ ownerState: e161 }) => e161.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${Me.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${Me.disabled}`]: {
    boxShadow: "none"
  }
});
var ba = I2("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e162, t127) => {
    let { ownerState: o } = e162;
    return [
      t127.startIcon,
      t127[`iconSize${_2(o.size)}`]
    ];
  }
})(({ ownerState: e163 }) => m6({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, e163.size === "small" && {
  marginLeft: -2
}, xr(e163)));
var va = I2("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e164, t128) => {
    let { ownerState: o } = e164;
    return [
      t128.endIcon,
      t128[`iconSize${_2(o.size)}`]
    ];
  }
})(({ ownerState: e165 }) => m6({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, e165.size === "small" && {
  marginRight: -2
}, xr(e165)));
var Ta = mod.forwardRef(function(t129, o98) {
  let r96 = mod.useContext(yr), n74 = ve(r96, t129), s60 = D({
    props: n74,
    name: "MuiButton"
  }), {
    children: i47,
    color: l37 = "primary",
    component: p29 = "button",
    className: u26,
    disabled: c26 = false,
    disableElevation: a42 = false,
    disableFocusRipple: h14 = false,
    endIcon: g12,
    focusVisibleClassName: y11,
    fullWidth: f19 = false,
    size: C10 = "medium",
    startIcon: k,
    type: E10,
    variant: x10 = "text"
  } = s60, v8 = P1(s60, ha), R10 = m6({}, s60, {
    color: l37,
    component: p29,
    disabled: c26,
    disableElevation: a42,
    disableFocusRipple: h14,
    fullWidth: f19,
    size: C10,
    type: E10,
    variant: x10
  }), S6 = ga(R10), W = k && p5(ba, {
    className: S6.startIcon,
    ownerState: R10,
    children: k
  }), T = g12 && p5(va, {
    className: S6.endIcon,
    ownerState: R10,
    children: g12
  });
  return y2(xa, m6({
    ownerState: R10,
    className: O(u26, r96.className),
    component: p29,
    disabled: c26,
    focusRipple: !h14,
    focusVisibleClassName: O(S6.focusVisible, y11),
    ref: o98,
    type: E10
  }, v8, {
    classes: S6,
    children: [
      W,
      i47,
      T
    ]
  }));
});
var eo = Ta;
function br(e166) {
  return $("MuiToggleButton", e166);
}
var Pa = B("MuiToggleButton", [
  "root",
  "disabled",
  "selected",
  "standard",
  "primary",
  "secondary",
  "sizeSmall",
  "sizeMedium",
  "sizeLarge"
]);
var to = Pa;
var Ca = [
  "children",
  "className",
  "color",
  "disabled",
  "disableFocusRipple",
  "fullWidth",
  "onChange",
  "onClick",
  "selected",
  "size",
  "value"
];
var Ea = (e167) => {
  let {
    classes: t130,
    fullWidth: o99,
    selected: r97,
    disabled: n75,
    size: s61,
    color: i48
  } = e167, l38 = {
    root: [
      "root",
      r97 && "selected",
      n75 && "disabled",
      o99 && "fullWidth",
      `size${_2(s61)}`,
      i48
    ]
  };
  return U(l38, br, t130);
};
var Sa = I2(ge, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (e168, t131) => {
    let { ownerState: o } = e168;
    return [
      t131.root,
      t131[`size${_2(o.size)}`]
    ];
  }
})(({ theme: e169, ownerState: t132 }) => {
  let o100 = t132.color === "standard" ? e169.palette.text.primary : e169.palette[t132.color].main;
  return m6({}, e169.typography.button, {
    borderRadius: e169.shape.borderRadius,
    padding: 11,
    border: `1px solid ${e169.palette.divider}`,
    color: e169.palette.action.active
  }, t132.fullWidth && {
    width: "100%"
  }, {
    [`&.${to.disabled}`]: {
      color: e169.palette.action.disabled,
      border: `1px solid ${e169.palette.action.disabledBackground}`
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: H(e169.palette.text.primary, e169.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${to.selected}`]: {
      color: o100,
      backgroundColor: H(o100, e169.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: H(o100, e169.palette.action.selectedOpacity + e169.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: H(o100, e169.palette.action.selectedOpacity)
        }
      }
    }
  }, t132.size === "small" && {
    padding: 7,
    fontSize: e169.typography.pxToRem(13)
  }, t132.size === "large" && {
    padding: 15,
    fontSize: e169.typography.pxToRem(15)
  });
});
var Oa = mod.forwardRef(function(t133, o101) {
  let r98 = D({
    props: t133,
    name: "MuiToggleButton"
  }), {
    children: n76,
    className: s62,
    color: i49 = "standard",
    disabled: l39 = false,
    disableFocusRipple: p30 = false,
    fullWidth: u27 = false,
    onChange: c27,
    onClick: a43,
    selected: h15,
    size: g13 = "medium",
    value: y12
  } = r98, f20 = P1(r98, Ca), C11 = m6({}, r98, {
    color: i49,
    disabled: l39,
    disableFocusRipple: p30,
    fullWidth: u27,
    size: g13
  }), k = Ea(C11), E11 = (x11) => {
    a43 && (a43(x11, y12), x11.defaultPrevented) || c27 && c27(x11, y12);
  };
  return p5(Sa, m6({
    className: O(k.root, s62),
    disabled: l39,
    focusRipple: !p30,
    ref: o101,
    onClick: E11,
    onChange: c27,
    value: y12,
    ownerState: C11,
    "aria-pressed": h15
  }, f20, {
    children: n76
  }));
});
var Tr = Oa;
function oo(e170, t134) {
  return t134 === void 0 || e170 === void 0 ? false : Array.isArray(t134) ? t134.indexOf(e170) >= 0 : e170 === t134;
}
function Pr(e171) {
  return $("MuiToggleButtonGroup", e171);
}
var ka = B("MuiToggleButtonGroup", [
  "root",
  "selected",
  "vertical",
  "disabled",
  "grouped",
  "groupedHorizontal",
  "groupedVertical"
]);
var ee = ka;
var _a = [
  "children",
  "className",
  "color",
  "disabled",
  "exclusive",
  "fullWidth",
  "onChange",
  "orientation",
  "size",
  "value"
];
var wa = (e172) => {
  let { classes: t135, orientation: o102, fullWidth: r99, disabled: n77 } = e172, s63 = {
    root: [
      "root",
      o102 === "vertical" && "vertical",
      r99 && "fullWidth"
    ],
    grouped: [
      "grouped",
      `grouped${_2(o102)}`,
      n77 && "disabled"
    ]
  };
  return U(s63, Pr, t135);
};
var za = I2("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (e173, t136) => {
    let { ownerState: o103 } = e173;
    return [
      {
        [`& .${ee.grouped}`]: t136.grouped
      },
      {
        [`& .${ee.grouped}`]: t136[`grouped${_2(o103.orientation)}`]
      },
      t136.root,
      o103.orientation === "vertical" && t136.vertical,
      o103.fullWidth && t136.fullWidth
    ];
  }
})(({ ownerState: e174, theme: t137 }) => m6({
  display: "inline-flex",
  borderRadius: t137.shape.borderRadius
}, e174.orientation === "vertical" && {
  flexDirection: "column"
}, e174.fullWidth && {
  width: "100%"
}, {
  [`& .${ee.grouped}`]: m6({}, e174.orientation === "horizontal" ? {
    "&:not(:first-of-type)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-of-type)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${ee.selected} + .${ee.grouped}.${ee.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    "&:not(:first-of-type)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-of-type)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${ee.selected} + .${ee.grouped}.${ee.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var Ma = mod.forwardRef(function(t138, o104) {
  let r100 = D({
    props: t138,
    name: "MuiToggleButtonGroup"
  }), {
    children: n78,
    className: s64,
    color: i50 = "standard",
    disabled: l40 = false,
    exclusive: p32 = false,
    fullWidth: u28 = false,
    onChange: c28,
    orientation: a44 = "horizontal",
    size: h16 = "medium",
    value: g14
  } = r100, y13 = P1(r100, _a), f21 = m6({}, r100, {
    disabled: l40,
    fullWidth: u28,
    orientation: a44,
    size: h16
  }), C12 = wa(f21), k = (x12, v9) => {
    if (!c28)
      return;
    let R11 = g14 && g14.indexOf(v9), S7;
    g14 && R11 >= 0 ? (S7 = g14.slice(), S7.splice(R11, 1)) : S7 = g14 ? g14.concat(v9) : [
      v9
    ], c28(x12, S7);
  }, E12 = (x13, v10) => {
    !c28 || c28(x13, g14 === v10 ? null : v10);
  };
  return p5(za, m6({
    role: "group",
    className: O(C12.root, s64),
    ref: o104,
    ownerState: f21
  }, y13, {
    children: mod.Children.map(n78, (x14) => mod.isValidElement(x14) ? mod.cloneElement(x14, {
      className: O(C12.grouped, x14.props.className),
      onChange: p32 ? E12 : k,
      selected: x14.props.selected === void 0 ? oo(x14.props.value, g14) : x14.props.selected,
      size: x14.props.size || h16,
      fullWidth: u28,
      color: x14.props.color || i50,
      disabled: x14.props.disabled || l40
    }) : null)
  }));
});
var Cr = Ma;
function Rr(e175) {
  return $("MuiSvgIcon", e175);
}
B("MuiSvgIcon", [
  "root",
  "colorPrimary",
  "colorSecondary",
  "colorAction",
  "colorError",
  "colorDisabled",
  "fontSizeInherit",
  "fontSizeSmall",
  "fontSizeMedium",
  "fontSizeLarge"
]);
var $a = [
  "children",
  "className",
  "color",
  "component",
  "fontSize",
  "htmlColor",
  "titleAccess",
  "viewBox"
];
var Aa = (e176) => {
  let { color: t139, fontSize: o105, classes: r101 } = e176, n79 = {
    root: [
      "root",
      t139 !== "inherit" && `color${_2(t139)}`,
      `fontSize${_2(o105)}`
    ]
  };
  return U(n79, Rr, r101);
};
var ja = I2("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e177, t140) => {
    let { ownerState: o106 } = e177;
    return [
      t140.root,
      o106.color !== "inherit" && t140[`color${_2(o106.color)}`],
      t140[`fontSize${_2(o106.fontSize)}`]
    ];
  }
})(({ theme: e178, ownerState: t }) => {
  var o107, r102;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: e178.transitions.create("fill", {
      duration: e178.transitions.duration.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: e178.typography.pxToRem(20),
      medium: e178.typography.pxToRem(24),
      large: e178.typography.pxToRem(35)
    }[t.fontSize],
    color: (o107 = (r102 = e178.palette[t.color]) == null ? void 0 : r102.main) != null ? o107 : {
      action: e178.palette.action.active,
      disabled: e178.palette.action.disabled,
      inherit: void 0
    }[t.color]
  };
});
var Sr = mod.forwardRef(function(t141, o108) {
  let r103 = D({
    props: t141,
    name: "MuiSvgIcon"
  }), {
    children: n80,
    className: s65,
    color: i51 = "inherit",
    component: l41 = "svg",
    fontSize: p33 = "medium",
    htmlColor: u29,
    titleAccess: c29,
    viewBox: a45 = "0 0 24 24"
  } = r103, h17 = P1(r103, $a), g15 = m6({}, r103, {
    color: i51,
    component: l41,
    fontSize: p33,
    viewBox: a45
  }), y14 = Aa(g15);
  return y2(ja, m6({
    as: l41,
    className: O(y14.root, s65),
    ownerState: g15,
    focusable: "false",
    viewBox: a45,
    color: u29,
    "aria-hidden": c29 ? void 0 : true,
    role: c29 ? "img" : void 0,
    ref: o108
  }, h17, {
    children: [
      n80,
      c29 ? p5("title", {
        children: c29
      }) : null
    ]
  }));
});
Sr.muiName = "SvgIcon";
var tt = Sr;
function xe(e179, t142) {
  let o109 = (r104, n81) => p5(tt, m6({
    "data-testid": `${t142}Icon`,
    ref: n81
  }, r104, {
    children: e179
  }));
  return o109.muiName = tt.muiName, mod.memo(mod.forwardRef(o109));
}
var Sh = xe(a("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");
var Oh = ({ onClick: e180, children: t143 }) => a(eo, {
  variant: "contained",
  color: "primary",
  onClick: e180
}, t143);
var kh = xe(a("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");
var _h = xe(a("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");
var Nh = xe(a("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");
var wh = ({ onClick: e181, children: t144 }) => a(Zt, {
  variant: "extended",
  color: "primary",
  onClick: e181
}, t144);
var zh = xe(a("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");
var QR = ({ url }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const load = () => {
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url
      };
      const qr2 = new QRious(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return /* @__PURE__ */ jsx(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e3) => {
      setQR(!showQR);
    },
    css: css`
                margin-bottom: 12px;
              `
  }, showQR ? /* @__PURE__ */ jsx(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx(wh, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx(zh, null)));
};
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var LazySpikeLandComponent = ({ name, cssText, html }) => {
  const Sanyi = lazy(() => generator(name));
  return /* @__PURE__ */ jsx2(Suspense, {
    fallback: /* @__PURE__ */ jsx2("div", {
      css: css2`
      height: 100%;
      ${cssText}
    `,
      dangerouslySetInnerHTML: { __html: html }
    })
  }, /* @__PURE__ */ jsx2(Sanyi, null));
  function generator(name2) {
    return import(`https://code.spike.land/api/room/${name2}/js`);
  }
};
var DraggableWindow = ({ onShare, onRestore, position, session, keepFullScreen, room }) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  const [childArray, setChild] = useState([
    /* @__PURE__ */ jsx2(LazySpikeLandComponent, {
      name: room,
      cssText: session.css,
      html: session.html
    })
  ]);
  const startPositions = { bottom: -40, right: -132 };
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef(null);
  const zbody = useRef(null);
  const child = childArray[childArray.length - 1];
  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newErr = session.errorText;
        setErrorText(newErr);
        setIsStable(false);
        await wait(1500);
        if (session.errorText === newErr) {
          setIsStable(true);
        }
      }
      if (qrUrl !== session.url)
        setQRUrl(session.url);
    }, 200);
    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);
  useEffect(() => {
    const reveal = async () => {
      const { bottom: bottom2, right: right2 } = startPositions;
      if (keepFullScreen)
        return;
      await wait(1200);
      while (!window || !window.monaco)
        await wait(300);
      setFullScreen(false);
      changeScaleRange(50);
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth < 1200) {
        changeScaleRange(75);
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
      } else if (window.innerWidth < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      } else if (window.innerWidth < 2500) {
        setWidth(breakPoints[2]);
        setHeight(breakPointHeights[2]);
        changeScaleRange(100);
      } else if (window.innerWidth > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(150);
      }
      await wait(200);
      setPositions({
        bottom: 20,
        right: 20
      });
    };
    reveal();
  }, []);
  return /* @__PURE__ */ jsx2(React2.StrictMode, null, /* @__PURE__ */ jsx2(motion2.div, {
    ref,
    initial: { bottom: startPositions.bottom, right: startPositions.right },
    animate: {
      bottom,
      right
    },
    css: css2`
            background-color:rgba(192 ,192, 192, 0.3);
            backdrop-filter: blur(15px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: width - 20 - width / 6,
      bottom: innerHeight - 100
    },
    dragMomentum: false,
    drag: !isFullScreen
  }, /* @__PURE__ */ jsx2("div", {
    css: css2` 
              display: flex;
              
                `
  }, /* @__PURE__ */ jsx2("div", {
    css: css2`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx2(Cr, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e2, newScale) => newScale && changeScaleRange(newScale)
  }, sizes.map((size) => /* @__PURE__ */ jsx2(Tr, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx2("span", {
    css: css2`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx2(motion2.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale / devicePixelRatio,
      maxHeight: height * scale / devicePixelRatio,
      borderRadius: isFullScreen ? 0 : 8
    },
    css: css2`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `
  }, errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx2("pre", {
    css: css2`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `
  }, isStable && errorText && errorText.trim(), isStable && errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx2("div", {
    css: css2`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx2(Oh, {
    onClick: () => {
      onRestore();
      setErrorText("");
    }
  }, "Restore"))), /* @__PURE__ */ jsx2(motion2.div, {
    initial: {
      transformOrigin: "0px 0px",
      width: window.innerWidth / devicePixelRatio,
      height: window.innerHeight / devicePixelRatio,
      scale: scaleRange / 100
    },
    animate: {
      transformOrigin: "0px 0px",
      width: width / devicePixelRatio,
      height: height / devicePixelRatio,
      scale: scaleRange / 100
    },
    css: css2`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? /* @__PURE__ */ jsx2("div", {
    css: `${session.css}`,
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx2("div", {
    id: "zbody",
    key: session.i,
    ref: zbody,
    css: css2`
                        height: 100%;
                      `
  }, child))), /* @__PURE__ */ jsx2(Cr, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e2, newSize) => {
      if (newSize) {
        setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
        setWidth(newSize);
      }
    }
  }, breakPoints.map((size) => /* @__PURE__ */ jsx2(Tr, {
    key: size,
    value: size
  }, size === 680 ? /* @__PURE__ */ jsx2(Sh, {
    css: css2`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 768 ? /* @__PURE__ */ jsx2(_h, {
    css: css2`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx2(Nh, {
    css: css2`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx2("div", {
    css: css2`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx2(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx2(wh, {
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx2(kh, null)), /* @__PURE__ */ jsx2(LazySpikeLandComponent, {
    name: "sanyi",
    cssText: "",
    html: ""
  })))));
};
function createMarkup(__html) {
  return { __html };
}
var renderPreviewWindow = async (session, room, keepFullScreen) => {
  const target = document.createElement("div");
  const editor = document.getElementById("shadowEditor");
  editor.style.opacity = "0";
  const { createRoot } = await import("https://unpkg.com/@spike.land/esm@0.4.33/dist/react-dom.mjs");
  const root = createRoot(target, {});
  root.render(/* @__PURE__ */ jsx3(DraggableWindow, {
    onShare: () => open(`https://code.spike.land/api/room/${room}/public`),
    onRestore: () => {
      const model = session.editor.getModel();
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute",
    session,
    keepFullScreen,
    room
  }));
  target.style.opacity = "0";
  document.body.appendChild(target);
  await wait(400);
  target.style.display = "block";
  target.style.opacity = "1";
  document.getElementById("root").remove();
  document.body.style.backgroundImage = `url("/assets/synthwave.webp")`;
  editor.style.opacity = "1";
  editor.style.display = "block";
};
export {
  renderPreviewWindow
};
//# sourceMappingURL=renderPreviewWindow-WGV2PRR3.mjs.map
