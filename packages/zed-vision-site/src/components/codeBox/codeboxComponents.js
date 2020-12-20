"use strict";
exports.__esModule = true;
exports.ResultComponent = exports.HtmlPlayer = void 0;
var framer_motion_1 = require("framer-motion");
var React = require("react");
var styledCodeBoxComps_tsx_1 = require("./styledCodeBoxComps.tsx");
var HtmlPlayer = function (_a) {
    var content = _a.content, onEvent = _a.onEvent;
    return React.createElement(React.Fragment, null,
        React.createElement(styledCodeBoxComps_tsx_1.ResultBoxContainer, { onClick: function (e) {
                var clickEvent = e.target.getAttribute("data-onclick");
                if (clickEvent) {
                    onEvent(clickEvent);
                }
            }, dangerouslySetInnerHTML: { __html: String(content) } }));
};
exports.HtmlPlayer = HtmlPlayer;
var ResultComponent = function (_a) {
    // const x = useMotionValue(0);
    var _b = _a.height, height = _b === void 0 ? "100%" : _b, _c = _a.width, width = _c === void 0 ? "100%" : _c, transformed = _a.transformed, onEvent = _a.onEvent, events = _a.events;
    // const background = useTransform(
    //   x,
    //   [0, 300, 600],
    //   ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
    // );
    // const [{ xxx, yyy }, setIndexToShow] = React.useSta\te({ xxx: 0, yyy: 0 });
    var _d = React.useState({
        content: transformed[0].rendered[transformed[0].rendered.length - 1] ||
            "<p></p>"
    }), content = _d[0].content, setContent = _d[1];
    React.useEffect(function () {
        setContent({
            content: transformed[0].rendered[transformed[0].rendered.length - 1] ||
                "<p></p>"
        });
    }, [transformed[0].renderedHash]);
    if (transformed[0].rendered.length === 0) {
        return React.createElement("p", null,
            "loading ",
            transformed[0].renderedHash);
    }
    // function _html(x: number, y: number) {
    //   // console.log(rendered );
    //   return transformed[Number(x)] &&
    //       transformed[Number(x)].rendered[Number(y)] || "<p>uu</p>";
    // }transformed[Number(x)].rendered[Number(y)];
    var divLength = 1000 / (events.length + 1);
    // const transCopy = [...transformed].map((t)=>{t.rendered=[...t.rendered].reverse(); return t;});
    return (React.createElement("div", { style: {
            position: "relative",
            textAlign: "right",
            width: width
        } },
        transformed.map(function (t, k) {
            return React.createElement("div", { key: t.renderedHash + k },
                "ss ",
                t.renderedHash,
                "ss",
                events.map(function (event, renderContentKey) {
                    return React.createElement("div", { onMouseEnter: function () {
                            return setContent({ content: t.rendered[renderContentKey] });
                        }, style: {
                            display: "inline-block",
                            textAlign: "center",
                            borderLeft: "1px solid red",
                            height: "20px",
                            width: divLength
                        }, key: t.renderedHash + renderContentKey }, event);
                }));
        }),
        React.createElement(framer_motion_1.motion.div
        // layout
        , { 
            // layout
            drag: true, dragElastic: 0.5, dragMomentum: false, dragListener: true, 
            // onDrag={(event) => {
            //   const e = event as unknown as { layerX: number; layerY: number };
            //   // const htmlArray = new Array(100).fill(100);
            //   //console.log(event.layerY );
            //   const indexMaxY = transformed[0].rendered.length;
            //   let newIndexY = Math.floor(
            //     (indexMaxY * (e.layerY + 220)) / 200,
            //   );
            //   // console.log(event.layerY, newIndexY );
            //   if (newIndexc0 = 0;
            //   }
            //   if (newIndexY >= indexMaxY) {
            //     newIndexY = indexMaxY - 1;
            //   }
            //   const indexMax = transformed.length;
            //   let newIndex = Math.floor(
            //     (indexMax * (e.layerX + 909)) / 1000,
            //   );
            //   if (newIndex < 0) {
            //     // setIndexToShow({ yyy: newIndexY, xxx: 0 });
            //   }
            //   if (newIndex > indexMax) {
            //     // setIndexToShow({ yyy: newIndexY, xxx: indexMaxY });
            //     return;
            //   }
            //   setIndexToShow({ yyy: newIndexY, xxx: newIndex });
            // }}
            style: { position: "absolute", top: -220, right: 40 } },
            React.createElement(styledCodeBoxComps_tsx_1.ResultBox, null,
                React.createElement(exports.HtmlPlayer, { key: content, content: content, onEvent: onEvent })))));
};
exports.ResultComponent = ResultComponent;
