import {
  _extends,
  _objectWithoutPropertiesLoose,
  composeClasses,
  elementTypeAcceptingRef_default,
  generateUtilityClass,
  generateUtilityClasses,
  import_react,
  refType_default,
  styled_default,
  useEventCallback,
  useForkRef,
  useIsFocusVisible,
  useThemeProps
} from "./chunk-chunk-VC3Z5FDC.mjs";
import {
  require_clsx,
  require_prop_types
} from "./chunk-chunk-WXF4QHVQ.mjs";
import {
  require_jsx_runtime
} from "./chunk-chunk-FJRKYGWZ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
init_define_process();
var React5 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
var import_clsx3 = __toESM(require_clsx());

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/utils/useForkRef.js
init_define_process();
var useForkRef_default = useForkRef;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/utils/useEventCallback.js
init_define_process();
var useEventCallback_default = useEventCallback;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/utils/useIsFocusVisible.js
init_define_process();
var useIsFocusVisible_default = useIsFocusVisible;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
init_define_process();
var React4 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/index.js
init_define_process();

// ../../.yarn/global/cache/@babel-runtime-npm-7.20.1-8f9256f2ed-9.zip/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
init_define_process();

// ../../.yarn/global/cache/@babel-runtime-npm-7.20.1-8f9256f2ed-9.zip/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
init_define_process();
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  }, "_setPrototypeOf");
  return _setPrototypeOf(o, p);
}
__name(_setPrototypeOf, "_setPrototypeOf");

// ../../.yarn/global/cache/@babel-runtime-npm-7.20.1-8f9256f2ed-9.zip/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
__name(_inheritsLoose, "_inheritsLoose");

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/TransitionGroupContext.js
init_define_process();
var import_react2 = __toESM(require_react());
var TransitionGroupContext_default = import_react2.default.createContext(null);

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/TransitionGroup.js
init_define_process();

// ../../.yarn/global/cache/@babel-runtime-npm-7.20.1-8f9256f2ed-9.zip/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
init_define_process();
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
__name(_assertThisInitialized, "_assertThisInitialized");

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types = __toESM(require_prop_types());
var import_react4 = __toESM(require_react());

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/utils/ChildMapping.js
init_define_process();
var import_react3 = __toESM(require_react());
function getChildMapping(children, mapFn) {
  var mapper = /* @__PURE__ */ __name(function mapper2(child) {
    return mapFn && (0, import_react3.isValidElement)(child) ? mapFn(child) : child;
  }, "mapper");
  var result = /* @__PURE__ */ Object.create(null);
  if (children)
    import_react3.Children.map(children, function(c) {
      return c;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
__name(getChildMapping, "getChildMapping");
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  __name(getValueForKey, "getValueForKey");
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
__name(mergeChildMappings, "mergeChildMappings");
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
__name(getProp, "getProp");
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return (0, import_react3.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
__name(getInitialChildMapping, "getInitialChildMapping");
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!(0, import_react3.isValidElement)(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = (0, import_react3.isValidElement)(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = (0, import_react3.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = (0, import_react3.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0, import_react3.isValidElement)(prevChild)) {
      children[key] = (0, import_react3.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
__name(getNextChildMapping, "getNextChildMapping");

// ../../.yarn/__virtual__/react-transition-group-virtual-9e43d08d83/0/global/cache/react-transition-group-npm-4.4.5-98ea4ef96e-9.zip/node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: /* @__PURE__ */ __name(function childFactory(child) {
    return child;
  }, "childFactory")
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  __name(TransitionGroup2, "TransitionGroup");
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = /* @__PURE__ */ __name(function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  }, "componentDidMount");
  _proto.componentWillUnmount = /* @__PURE__ */ __name(function componentWillUnmount() {
    this.mounted = false;
  }, "componentWillUnmount");
  TransitionGroup2.getDerivedStateFromProps = /* @__PURE__ */ __name(function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  }, "getDerivedStateFromProps");
  _proto.handleExited = /* @__PURE__ */ __name(function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  }, "handleExited");
  _proto.render = /* @__PURE__ */ __name(function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ import_react4.default.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ import_react4.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ import_react4.default.createElement(Component, props, children));
  }, "render");
  return TransitionGroup2;
}(import_react4.default.Component);
TransitionGroup.propTypes = true ? {
  component: import_prop_types.default.any,
  children: import_prop_types.default.node,
  appear: import_prop_types.default.bool,
  enter: import_prop_types.default.bool,
  exit: import_prop_types.default.bool,
  childFactory: import_prop_types.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
var import_clsx2 = __toESM(require_clsx());

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/Ripple.js
init_define_process();
var React3 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var import_clsx = __toESM(require_clsx());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React3.useState(false);
  const rippleClassName = (0, import_clsx.default)(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = (0, import_clsx.default)(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React3.useEffect(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
      className: childClassName
    })
  });
}
__name(Ripple, "Ripple");
true ? Ripple.propTypes = {
  classes: import_prop_types2.default.object.isRequired,
  className: import_prop_types2.default.string,
  in: import_prop_types2.default.bool,
  onExited: import_prop_types2.default.func,
  pulsate: import_prop_types2.default.bool,
  rippleSize: import_prop_types2.default.number,
  rippleX: import_prop_types2.default.number,
  rippleY: import_prop_types2.default.number,
  timeout: import_prop_types2.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/touchRippleClasses.js
init_define_process();
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["center", "classes", "className"];
var _ = /* @__PURE__ */ __name((t) => t, "_");
var _t;
var _t2;
var _t3;
var _t4;
var DURATION = 550;
var DELAY_RIPPLE = 80;
var enterKeyframe = (0, import_react.keyframes)(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
var exitKeyframe = (0, import_react.keyframes)(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
var pulsateKeyframe = (0, import_react.keyframes)(_t3 || (_t3 = _`
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
var TouchRippleRoot = styled_default("span", {
  name: "MuiTouchRipple",
  slot: "Root"
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
var TouchRippleRipple = styled_default(Ripple_default, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4 || (_t4 = _`
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
`), touchRippleClasses_default.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses_default.child, touchRippleClasses_default.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
var TouchRipple = /* @__PURE__ */ React4.forwardRef(/* @__PURE__ */ __name(function TouchRipple2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const [ripples, setRipples] = React4.useState([]);
  const nextKey = React4.useRef(0);
  const rippleCallback = React4.useRef(null);
  React4.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React4.useRef(false);
  const startTimer = React4.useRef(null);
  const startTimerCommit = React4.useRef(null);
  const container = React4.useRef(null);
  React4.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React4.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TouchRippleRipple, {
      classes: {
        ripple: (0, import_clsx2.default)(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: (0, import_clsx2.default)(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: (0, import_clsx2.default)(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: (0, import_clsx2.default)(classes.child, touchRippleClasses_default.child),
        childLeaving: (0, import_clsx2.default)(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: (0, import_clsx2.default)(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = React4.useCallback((event = {}, options = {}, cb = () => {
  }) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
    } = options;
    if ((event == null ? void 0 : event.type) === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if ((event == null ? void 0 : event.type) === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event != null && event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = React4.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React4.useCallback((event, cb) => {
    clearTimeout(startTimer.current);
    if ((event == null ? void 0 : event.type) === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  React4.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TouchRippleRoot, _extends({
    className: (0, import_clsx2.default)(touchRippleClasses_default.root, classes.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
}, "TouchRipple"));
true ? TouchRipple.propTypes = {
  center: import_prop_types3.default.bool,
  classes: import_prop_types3.default.object,
  className: import_prop_types3.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/buttonBaseClasses.js
init_define_process();
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
__name(getButtonBaseUtilityClass, "getButtonBaseUtilityClass");
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded2 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];
var useUtilityClasses = /* @__PURE__ */ __name((ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
}, "useUtilityClasses");
var ButtonBaseRoot = styled_default("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
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
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = /* @__PURE__ */ React5.forwardRef(/* @__PURE__ */ __name(function ButtonBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const buttonRef = React5.useRef(null);
  const rippleRef = React5.useRef(null);
  const handleRippleRef = useForkRef_default(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = React5.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React5.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = React5.useState(false);
  React5.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  React5.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback_default((event) => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  __name(useRippleHandler, "useRippleHandler");
  const handleMouseDown = useRippleHandler("start", onMouseDown);
  const handleContextMenu = useRippleHandler("stop", onContextMenu);
  const handleDragLeave = useRippleHandler("stop", onDragLeave);
  const handleMouseUp = useRippleHandler("stop", onMouseUp);
  const handleMouseLeave = useRippleHandler("stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler("start", onTouchStart);
  const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  const handleTouchMove = useRippleHandler("stop", onTouchMove);
  const handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback_default((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = /* @__PURE__ */ __name(() => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  }, "isNonNativeButton");
  const keydownRef = React5.useRef(false);
  const handleKeyDown = useEventCallback_default((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback_default((event) => {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleRef = useForkRef_default(ref, focusVisibleRef, buttonRef);
  if (true) {
    React5.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join("\n"));
      }
    }, [enableTouchRipple]);
  }
  const ownerState = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: (0, import_clsx3.default)(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TouchRipple_default, _extends({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
}, "ButtonBase"));
true ? ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types4.default.bool,
  children: import_prop_types4.default.node,
  classes: import_prop_types4.default.object,
  className: import_prop_types4.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types4.default.bool,
  disableRipple: import_prop_types4.default.bool,
  disableTouchRipple: import_prop_types4.default.bool,
  focusRipple: import_prop_types4.default.bool,
  focusVisibleClassName: import_prop_types4.default.string,
  href: import_prop_types4.default.any,
  LinkComponent: import_prop_types4.default.elementType,
  onBlur: import_prop_types4.default.func,
  onClick: import_prop_types4.default.func,
  onContextMenu: import_prop_types4.default.func,
  onDragLeave: import_prop_types4.default.func,
  onFocus: import_prop_types4.default.func,
  onFocusVisible: import_prop_types4.default.func,
  onKeyDown: import_prop_types4.default.func,
  onKeyUp: import_prop_types4.default.func,
  onMouseDown: import_prop_types4.default.func,
  onMouseLeave: import_prop_types4.default.func,
  onMouseUp: import_prop_types4.default.func,
  onTouchEnd: import_prop_types4.default.func,
  onTouchMove: import_prop_types4.default.func,
  onTouchStart: import_prop_types4.default.func,
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object]),
  tabIndex: import_prop_types4.default.number,
  TouchRippleProps: import_prop_types4.default.object,
  touchRippleRef: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.shape({
    current: import_prop_types4.default.shape({
      pulsate: import_prop_types4.default.func.isRequired,
      start: import_prop_types4.default.func.isRequired,
      stop: import_prop_types4.default.func.isRequired
    })
  })]),
  type: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["button", "reset", "submit"]), import_prop_types4.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// ../../.yarn/__virtual__/@mui-material-virtual-7740427ec6/0/global/cache/@mui-material-npm-5.10.15-e9edb11545-9.zip/node_modules/@mui/material/esm/ButtonBase/index.js
init_define_process();

export {
  ButtonBase_default
};
