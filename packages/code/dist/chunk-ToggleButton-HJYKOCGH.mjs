import {
  ButtonBase_default
} from "./chunk-chunk-WECAZSTB.mjs";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  alpha,
  capitalize_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  styled_default,
  useThemeProps
} from "./chunk-chunk-F27OWLYR.mjs";
import "./chunk-chunk-VCE43CAW.mjs";
import {
  require_clsx,
  require_prop_types
} from "./chunk-chunk-JN55TS27.mjs";
import "./chunk-chunk-NRK2N2RS.mjs";
import {
  require_jsx_runtime
} from "./chunk-chunk-7DH4XB4M.mjs";
import "./chunk-chunk-DKLIUXI6.mjs";
import "./chunk-chunk-TKBKOKNA.mjs";
import {
  require_react
} from "./chunk-chunk-IGJHLPB6.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-BSQL4JKA.mjs";

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/ToggleButton/index.js
init_define_process();

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/ToggleButton/ToggleButton.js
init_define_process();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_clsx = __toESM(require_clsx());

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/styles/index.js
init_define_process();

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/ToggleButton/toggleButtonClasses.js
init_define_process();
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
__name(getToggleButtonUtilityClass, "getToggleButtonUtilityClass");
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge"]);
var toggleButtonClasses_default = toggleButtonClasses;

// ../../.yarn/__virtual__/@mui-material-virtual-92fdf247ea/0/global/cache/@mui-material-npm-5.10.14-8d1f74b3b3-9.zip/node_modules/@mui/material/esm/ToggleButton/ToggleButton.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];
var useUtilityClasses = /* @__PURE__ */ __name((ownerState) => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize_default(size)}`, color]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
}, "useUtilityClasses");
var ToggleButtonRoot = styled_default(ButtonBase_default, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`size${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  let selectedColor = ownerState.color === "standard" ? theme.palette.text.primary : theme.palette[ownerState.color].main;
  let selectedColorChannel;
  if (theme.vars) {
    selectedColor = ownerState.color === "standard" ? theme.vars.palette.text.primary : theme.vars.palette[ownerState.color].main;
    selectedColorChannel = ownerState.color === "standard" ? theme.vars.palette.text.primaryChannel : theme.vars.palette[ownerState.color].mainChannel;
  }
  return _extends({}, theme.typography.button, {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    color: (theme.vars || theme).palette.action.active
  }, ownerState.fullWidth && {
    width: "100%"
  }, {
    [`&.${toggleButtonClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${toggleButtonClasses_default.selected}`]: {
      color: selectedColor,
      backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(selectedColor, theme.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, ownerState.size === "small" && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = /* @__PURE__ */ React.forwardRef(/* @__PURE__ */ __name(function ToggleButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToggleButton"
  });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const handleChange = /* @__PURE__ */ __name((event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  }, "handleChange");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButtonRoot, _extends({
    className: (0, import_clsx.default)(classes.root, className),
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    ownerState,
    "aria-pressed": selected
  }, other, {
    children
  }));
}, "ToggleButton"));
true ? ToggleButton.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  disabled: import_prop_types.default.bool,
  disableFocusRipple: import_prop_types.default.bool,
  disableRipple: import_prop_types.default.bool,
  fullWidth: import_prop_types.default.bool,
  onChange: import_prop_types.default.func,
  onClick: import_prop_types.default.func,
  selected: import_prop_types.default.bool,
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  value: import_prop_types.default.any.isRequired
} : void 0;
var ToggleButton_default = ToggleButton;
export {
  ToggleButton_default as default,
  getToggleButtonUtilityClass,
  toggleButtonClasses_default as toggleButtonClasses
};
