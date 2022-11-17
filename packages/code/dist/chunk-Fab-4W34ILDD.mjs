import {
  ButtonBase_default
} from "./chunk-chunk-ZJE77ZVJ.mjs";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  capitalize_default,
  clsx_m_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_prop_types,
  rootShouldForwardProp,
  styled_default,
  useThemeProps
} from "./chunk-chunk-G3JZ6CCL.mjs";
import "./chunk-chunk-XWHONTWC.mjs";
import {
  require_jsx_runtime
} from "./chunk-chunk-PWA6B3OH.mjs";
import "./chunk-chunk-C5ER3KLC.mjs";
import "./chunk-chunk-MA6EPZM6.mjs";
import {
  forwardRef,
  init_reactMod
} from "./chunk-chunk-22ENMEQX.mjs";
import "./chunk-chunk-3QY34HKG.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-4FHARZBR.mjs";

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/Fab/index.js
init_define_process();

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/Fab/Fab.js
init_define_process();
init_reactMod();
var import_prop_types = __toESM(require_prop_types());

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/Fab/fabClasses.js
init_define_process();
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
__name(getFabUtilityClass, "getFabUtilityClass");
var fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge", "info", "error", "warning", "success"]);
var fabClasses_default = fabClasses;

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/Fab/Fab.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
var useUtilityClasses = /* @__PURE__ */ __name((ownerState) => {
  const {
    color,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color === "inherit" ? "colorInherit" : color]
  };
  const composedClasses = composeClasses(slots, getFabUtilityClass, classes);
  return _extends({}, classes, composedClasses);
}, "useUtilityClasses");
var FabRoot = styled_default(ButtonBase_default, {
  name: "MuiFab",
  slot: "Root",
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, styles[capitalize_default(ownerState.size)], styles[ownerState.color]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$getCon, _theme$palette;
  return _extends({}, theme.typography.button, {
    minHeight: 36,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: "50%",
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    "&:active": {
      boxShadow: (theme.vars || theme).shadows[12]
    },
    color: theme.vars ? theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    "&:hover": {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      "@media (hover: none)": {
        backgroundColor: (theme.vars || theme).palette.grey[300]
      },
      textDecoration: "none"
    },
    [`&.${fabClasses_default.focusVisible}`]: {
      boxShadow: (theme.vars || theme).shadows[6]
    },
    [`&.${fabClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    }
  }, ownerState.size === "small" && {
    width: 40,
    height: 40
  }, ownerState.size === "medium" && {
    width: 48,
    height: 48
  }, ownerState.variant === "extended" && {
    borderRadius: 48 / 2,
    padding: "0 16px",
    width: "auto",
    minHeight: "auto",
    minWidth: 48,
    height: 48
  }, ownerState.variant === "extended" && ownerState.size === "small" && {
    width: "auto",
    padding: "0 8px",
    borderRadius: 34 / 2,
    minWidth: 34,
    height: 34
  }, ownerState.variant === "extended" && ownerState.size === "medium" && {
    width: "auto",
    padding: "0 16px",
    borderRadius: 40 / 2,
    minWidth: 40,
    height: 40
  }, ownerState.color === "inherit" && {
    color: "inherit"
  });
}, ({
  theme,
  ownerState
}) => _extends({}, ownerState.color !== "inherit" && ownerState.color !== "default" && (theme.vars || theme).palette[ownerState.color] != null && {
  color: (theme.vars || theme).palette[ownerState.color].contrastText,
  backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
  "&:hover": {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
    "@media (hover: none)": {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].main
    }
  }
}));
var Fab = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function Fab2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children,
    className,
    color = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FabRoot, _extends({
    className: clsx_m_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other, {
    classes,
    children
  }));
}, "Fab"));
true ? Fab.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "error", "info", "inherit", "primary", "secondary", "success", "warning"]), import_prop_types.default.string]),
  component: import_prop_types.default.elementType,
  disabled: import_prop_types.default.bool,
  disableFocusRipple: import_prop_types.default.bool,
  disableRipple: import_prop_types.default.bool,
  focusVisibleClassName: import_prop_types.default.string,
  href: import_prop_types.default.string,
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["circular", "extended"]), import_prop_types.default.string])
} : void 0;
var Fab_default = Fab;
export {
  Fab_default as default,
  fabClasses_default as fabClasses,
  getFabUtilityClass
};
