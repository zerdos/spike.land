import {
  _objectWithoutPropertiesLoose,
  capitalize_default,
  clsx_m_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_prop_types,
  require_react_is,
  styled_default,
  useThemeProps
} from "./chunk-chunk-JF3YJOVO.mjs";
import {
  jsx
} from "./chunk-chunk-36ULYVH4.mjs";
import {
  _extends
} from "./chunk-chunk-SWFTZAWX.mjs";
import "./chunk-chunk-FHQ7KILY.mjs";
import "./chunk-chunk-BB6QYXFC.mjs";
import {
  Children,
  cloneElement,
  forwardRef,
  init_react,
  isValidElement
} from "./chunk-chunk-CFF2OAWW.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// ../../.yarn/__virtual__/@mui-material-virtual-4b7f49800f/0/global/cache/@mui-material-npm-5.10.10-cdf27a4b5b-9.zip/node_modules/@mui/material/esm/ToggleButtonGroup/index.js
init_define_process();

// ../../.yarn/__virtual__/@mui-material-virtual-4b7f49800f/0/global/cache/@mui-material-npm-5.10.10-cdf27a4b5b-9.zip/node_modules/@mui/material/esm/ToggleButtonGroup/ToggleButtonGroup.js
init_define_process();
init_react();
var import_react_is = __toESM(require_react_is());
var import_prop_types = __toESM(require_prop_types());

// ../../.yarn/__virtual__/@mui-material-virtual-4b7f49800f/0/global/cache/@mui-material-npm-5.10.10-cdf27a4b5b-9.zip/node_modules/@mui/material/esm/ToggleButtonGroup/isValueSelected.js
init_define_process();
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }
  return value === candidate;
}

// ../../.yarn/__virtual__/@mui-material-virtual-4b7f49800f/0/global/cache/@mui-material-npm-5.10.10-cdf27a4b5b-9.zip/node_modules/@mui/material/esm/ToggleButtonGroup/toggleButtonGroupClasses.js
init_define_process();
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "vertical", "disabled", "grouped", "groupedHorizontal", "groupedVertical"]);
var toggleButtonGroupClasses_default = toggleButtonGroupClasses;

// ../../.yarn/__virtual__/@mui-material-virtual-4b7f49800f/0/global/cache/@mui-material-npm-5.10.10-cdf27a4b5b-9.zip/node_modules/@mui/material/esm/ToggleButtonGroup/ToggleButtonGroup.js
var _excluded = ["children", "className", "color", "disabled", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    fullWidth,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation === "vertical" && "vertical", fullWidth && "fullWidth"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, disabled && "disabled"]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = styled_default("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles.grouped
    }, {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.orientation)}`]
    }, styles.root, ownerState.orientation === "vertical" && styles.vertical, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  ownerState,
  theme
}) => _extends({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, ownerState.fullWidth && {
  width: "100%"
}, {
  [`& .${toggleButtonGroupClasses_default.grouped}`]: _extends({}, ownerState.orientation === "horizontal" ? {
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
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
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
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var ToggleButtonGroup = forwardRef(function ToggleButtonGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    disabled,
    fullWidth,
    orientation,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  };
  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  };
  return jsx(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return null;
      }
      if (true) {
        if ((0, import_react_is.isFragment)(child)) {
          console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      return cloneElement(child, {
        className: clsx_m_default(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === void 0 ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth,
        color: child.props.color || color,
        disabled: child.props.disabled || disabled
      });
    })
  }));
});
true ? ToggleButtonGroup.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  disabled: import_prop_types.default.bool,
  exclusive: import_prop_types.default.bool,
  fullWidth: import_prop_types.default.bool,
  onChange: import_prop_types.default.func,
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  value: import_prop_types.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;
export {
  ToggleButtonGroup_default as default,
  getToggleButtonGroupUtilityClass,
  toggleButtonGroupClasses_default as toggleButtonGroupClasses
};
