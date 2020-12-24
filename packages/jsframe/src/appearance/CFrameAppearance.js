import CDomPartsBuilder from "./CDomPartsBuilder.js";
import CFrameComponent from "./CFrameComponent.js";

/**
 * CFrameAppearance class<br>
 * Appearance Model Class for Frame
 *
 */
function CFrameAppearance() {
  var me = {};

  me.showTitleBar = true;
  me.showCloseButton = true;
  me.titleBarCaption = "";
  me.titleBarCaptionFontSize = "12px";
  me.titleBarCaptionFontWeight = "bold";
  me.titleBarHeight = "24px";
  me.useIframe = false;
  me.useFrame = true;

  me.titleBarClassNameDefault = null;
  me.titleBarClassNameFocused = null;

  me.setUseIFrame = function (value) {
    me.useIframe = value;
    me.useFrame = !value;
    return me;
  };

  /**
   * The position from the left side of the caption. If this value is null, caption will be centered.
   */
  me.titleBarCaptionLeftMargin = "5px";

  me.titleBarColorDefault = null;
  me.titleBarColorFocused = null;
  me.titleBarCaptionColorDefault = "";
  me.titleBarCaptionColorFocused = "";
  me.titleBarCaptionTextShadow = "0 1px 0 rgba(255,255,255,.7)";
  me.titleBarCaptionTextAlign = "center";

  me.titleBarBorderBottomDefault = "1px solid rgba(0,0,0,0.2)";
  me.titleBarBorderBottomFocused = null;

  me.frameBorderRadius = "6px";

  me.frameBorderWidthDefault = "1px";
  me.frameBorderWidthFocused = me.frameBorderWidthDefault;

  me.frameBorderColorDefault = "rgba(1, 1, 1, 0.2)";
  me.frameBorderColorFocused = me.frameBorderColorDefault;

  me.frameBorderStyle = "solid";
  me.frameBoxShadow = "2px 3px 16px rgba(0,0,0,.6)";
  me.frameBackgroundColor = "transparent";

  me._partsBuilder = null;

  me.frameComponents = [];

  me.frameHeightAdjust = 1;

  me.resizeAreaWidth = 20;
  me.resizeAreaHeight = 20;
  me.resizeAreaOffset = 0;
  me.resizeAreaVisible = false;

  me.getFrameInnerBorderRadius = function (ref, hasFocus) {
    if (!ref) {
      return null;
    }
    if (hasFocus) {
      return {
        frameAppearance: me,
        innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
          parseInt(ref.frameBorderWidthFocused, 10)) + "px",
      };
    }
    return {
      frameAppearance: me,
      innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
        parseInt(ref.frameBorderWidthDefault, 10)) + "px",
    };
  };

  me.onInitialize = function () {
    //Add close button if needed
    if (me.showCloseButton) {
      var partsBuilder = me.getPartsBuilder(),
        crossMark0 = "\u274c",
        crossMark1 = "\u2716",
        crossMark2 = "\u274e";

      var btnAppearance = partsBuilder.buildTextButtonAppearance();

      btnAppearance.size = 14;
      btnAppearance.captionShiftYpx = 0;
      btnAppearance.captionFontRatio = 1.0;
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

      //closeButton is a special name
      var frameComponent = me.addFrameComponent(
        "closeButton",
        closeBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );
    }
  };

  me.onTitleBarStyleInitialize = function () {
  };
}

CFrameAppearance.getPartsBuilder = function () {
  if (me._partsBuilder === null) {
    me._partsBuilder = new CDomPartsBuilder();
  }
  return me._partsBuilder;
};
CFrameAppearance.initialize = function () {
  var me = this;
  me.onInitialize();
};

/**
 *  Add FrameComponent into frame
 *  FrameComponent is attached to Frame and it moves with Frame.
 *
 * @param id
 * @param myDomElement DOM element.
 * @param x  Relative x coodinate from the snap position specified by alignment
 * @param y  Relative y coodinate from the snap position specified by alignment
 * @param align 'LEFT_TOP' 'CENTER_TOP' 'RIGHT_TOP' 'LEFT_CENTER' 'CENTER_CENTER' 'RIGHT_CENTER' 'LEFT_BOTTOM' 'CENTER_BOTTOM' 'RIGHT_BOTTOM'
 * @returns {CFrameComponent}
 *
 */
CFrameAppearance.addFrameComponent = function (
  id,
  myDomElement,
  x,
  y,
  align,
  extra,
) {
  //(id, frame, htmlElement, x, y, align)
  var frameComponent = new CFrameComponent(
    id,
    myDomElement,
    x,
    y,
    align,
    extra,
  );

  if (myDomElement._onTakeFocus && myDomElement._onReleaseFocus) {
    //if this DOM element has special method for focus
    //set focus callback
    frameComponent.setFocusCallback(
      myDomElement._onTakeFocus,
      myDomElement._onReleaseFocus,
    );
  }

  me.frameComponents.push(frameComponent);

  return frameComponent;
};

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 *  End of CFrameAppearance class
 */
export default CFrameAppearance;
