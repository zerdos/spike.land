import { css } from "@emotion/react";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { QRButton } from "./Qr";
import { Terminal } from 'xterm';
// import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { SerializeAddon } from "xterm-addon-serialize";
const serializeAddon = new SerializeAddon();
const searchAddon = new SearchAddon();
const fitAddon = new FitAddon();
const origConsole = console.log;

var terminal = new Terminal();

terminal.loadAddon(serializeAddon);

terminal.loadAddon(searchAddon);

// terminal.loadAddon(new WebLinksAddon());
terminal.loadAddon(fitAddon);
Object.assign(globalThis, {terminal})
// Import { useSpring, a } from '@react-spring/web'

import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";

import { Phone, Share, Tablet, Tv } from "./icons";
import { sendChannel, startVideo } from "ws";

const breakPoints = [680, 768, 1920];
const breakPointHeights = [1137, 1024, 1080];

const sizes = [10, 25, 50, 75, 100];

const bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${
  Math.random() * 128 + 64
}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;

type DraggableWindowProps = {
  // OnRestore: (() => void);
  hashCode: number;
  position?: string;
  room: string;
  children: JSX.Element;
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  {
    children,
    // OnRestore,
    room,
    // HashCode,
  },
) => {
  const [scaleRange, changeScaleRange] = useState(100);

  const startPositions = { bottom: 0, right: 0 };

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scale = scaleRange / 100;

  // UseEffect(()=> {

  //   ref.current?.appendChild(document.getElementById("root")!)

  // }
  //   , [ref]);

 const terminalRef =  useRef(null);



 useEffect(() => {
  if (!terminalRef?.current) return;

  globalThis.terminal.ON = ()=>{


  console.log = (...data) => {
    const prData =  data.map(d=>JSONstringify(d))
    terminal.writeln(prData.join(", ").slice(0, 360));
    origConsole(...prData);
  }
 return ()=> console.log = origConsole;
}

  terminal.open(terminalRef.current)
  fitAddon.fit();
 }, [terminalRef]);

  useEffect(() => {
    const reveal = async () => {
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2,
      });

      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }

      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(100);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(100);
      }

      setPositions({
        bottom: 20,
        right: 20,
      });
    };

    reveal();
    // SetTimeout(reveal, 200);
  }, []);

  const c = window.getComputedStyle(
    document.body,
    null,
  ).getPropertyValue("background-color")
    .slice(4, -1).split(",")
    .slice(0, 3)
    .map((x) => Number(x) || "0").join(",");

  const [bgCV, setBG] = useState(c);

  useEffect(() => {
    setInterval(() => {
      const c = window.getComputedStyle(
        document.body,
        null,
      ).getPropertyValue("background-color")
        .slice(4, -1).split(",")
        .slice(0, 3)
        .map((x) => Number(x) || "0").join(",");
 
      if (c !== bgCV) setBG(c);
    }, 1000 / 2);
  }, []);

  const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));

  useEffect(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);

  return (
    <LayoutGroup>
    
      <motion.div
        transition={{ delay: 0, duration: 0.4 }}
        initial={{
          top: 0,
          padding: 0,
          right: 0,
          borderRadius: 0,
        }}
        animate={{
          top: bottom,
          padding: 8,
          right,
          borderRadius: 16,
        }}
        css={css`
            touch-action: pinch-zoom;
            background-color: ${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `}
        drag={true}
        dragMomentum={false}
        dragConstraints={{
          left: 0,
          right: width - 20 - width / 6,
          bottom: innerHeight,
        }}
        dragElastic={0.5}
      >
        <div
          css={css` 
              display: flex;
              
                `}
        >
          <div
            css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
          >
            <motion.div
              transition={{ delay: 0, duration: 0.4 }}
              initial={{ height: 0, width: 0 }}
              animate={{ height: "auto", width: "auto" }}
            >
              <ToggleButtonGroup
                value={scaleRange}
                size="small"
                exclusive
                onChange={(_e: unknown, newScale: number) => {
                  newScale && changeScaleRange(newScale);
                }}
              >
                {sizes.map((size, ind) => (
                  <ToggleButton
                    key={ind}
                    value={size}
                  >
                    <span
                      css={css`
                       color: ${
                        size === scaleRange
                          ? "rgba(255,255,255,.8)"
                          : "rgba(0,0,0,.3)"
                      };
                       `}
                    >
                      {size}%
                    </span>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </motion.div>
            {/* <span>{width}*{height}</span> */}

            <motion.div
              transition={{ delay: 0, duration: 0.4 }}
              initial={{
                width: window.innerWidth,
                height: window.innerHeight,
                borderRadius: 0,
                // Opacity: isFullScreen ? 1 : 0.7,
              }}
              animate={{
                width: width * scale / devicePixelRatio,
                height: height * scale / devicePixelRatio,
                borderRadius: 8,
                // Opacity: isFullScreen ? 1 : 0.7,
              }}
              css={css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `}
            >
              <motion.div
                transition={{ delay: 0, duration: 0.4 }}
                initial={{
                  width: window.innerWidth,
                  height: window.innerHeight,
                  background: "rgba(0,0,0, 1)",
                  scale: 1,
                }}
                animate={{
                  background: "rgba(" + bgCV + ", 0.5)",
                  transformOrigin: "0px 0px",
                  width: width / devicePixelRatio,
                  height: height / devicePixelRatio,
                  scale: scaleRange / 100,
                }}
                data-test-id="z-body"
                css={css`
                  overflow:overlay;
                  overflow-y: hidden;
              `}
              >
                {children}
              </motion.div>
              <div  ref={terminalRef} css={css`
              height: 200px;
              width: ${width / devicePixelRatio}px;
              bottom: 70px;
            opacity: 0.5;
    background: rgba(84,24,24,.8);
    position: absolute;
              `} id="terminal" />
            </motion.div>
            <motion.div
              transition={{ delay: 0, duration: 0.4 }}
            >
              <ToggleButtonGroup
                value={width}
                size="small"
                exclusive
                onChange={(_e: unknown, newSize: number) => {
                  if (newSize) {
                    setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                    setWidth(newSize);
                  }
                }}
              >
                {breakPoints.map((size, ind) => (
                  <ToggleButton
                    key={ind}
                    value={size}
                  >
                    {size === 680
                      ? (
                        <span
                          css={css`
                        color: ${
                            width === 680
                              ? "rgba(255,255,255,.8)"
                              : "rgba(0,0,0,.3)"
                          };
                        `}
                        >
                          <Phone />
                        </span>
                      )
                      : (size === 768
                        ? (
                          <span
                            css={css`
                        color: ${
                              width === 768
                                ? "rgba(255,255,255,.8)"
                                : "rgba(0,0,0,.3)"
                            };
                        `}
                          >
                            <Tablet />
                          </span>
                        )
                        : (
                          <span
                            css={css`
                        color: ${
                              width === 1920
                                ? "rgba(255,255,255,.8)"
                                : "rgba(0,0,0,.3)"
                            };
                      `}
                          >
                            <Tv />
                          </span>
                        ))}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </motion.div>
          </div>

          <motion.div
            transition={{ delay: 0, duration: 0.4 }}
            initial={{ height: 0, width: 0 }}
            animate={{ height: "100%", width: "auto" }}
          >
            <div
              css={css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `}
            >
              <Fab
                key="fullscreen"
                onClick={() => {
                  document.querySelector("#root")?.requestFullscreen();
                }}
              >
                <span
                  css={css`
                font-size: 20pt;
              `}
                >
                  <FullscreenIcon key="fs" />
                </span>
              </Fab>

              <QRButton
                url={location.origin + `/live/${room}/public`}
              />

              {
                /* <Fab
                key="video"
                onClick={() => open(`/live/${room}/public`)}
              >
                <Share />
              </Fab> */
              }

              {false && (
                <>
                  <video
                    ref={videoRef}
                    onClick={() => startVideo(videoRef.current!)}
                    playsInline={true}
                    autoPlay={true}
                  >
                  </video>
                  {clients.map((k, index) => (
                    <video
                      id={`video-${k}`}
                      key={index}
                      ref={videoRef}
                      playsInline={true}
                      autoPlay={true}
                    >
                    </video>
                  ))}
                </>
              )}
              <Fab
                key="Share"
                onClick={() => open(`/live/${room}/public`)}
              >
                <Share />
              </Fab>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
};

function JSONstringify(json) {
  if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, '\t');
  }

  // var 
  //     arr = [],
  //     _string = 'color:green',
  //     _number = 'color:darkorange',
  //     _boolean = 'color:blue',
  //     _null = 'color:magenta',
  //     _key = 'color:red';

  // json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
  //     var style = _number;
  //     if (/^"/.test(match)) {
  //         if (/:$/.test(match)) {
  //             style = _key;
  //         } else {
  //             style = _string;
  //         }
  //     } else if (/true|false/.test(match)) {
  //         style = _boolean;
  //     } else if (/null/.test(match)) {
  //         style = _null;
  //     }
  //     arr.push(style);
  //     arr.push('');
  //     return '%c' + match + '%c';
  // });

  // arr.unshift(json);
  // console.log.apply(console, arr);
  return json;
}

export default DraggableWindow;
// JSON.prune
// two additional optional parameters :
//   - the maximal depth (default : 6)
//   - the maximal length of arrays (default : 50)
// You can also pass an "options" object.
// examples :
//   var json = JSON.prune(window)
//   var arr = Array.apply(0,Array(1000)); var json = JSON.prune(arr, 4, 20)
//   var json = JSON.prune(window.location, {inheritedProperties:true})
// Web site : http://dystroy.org/JSON.prune/
// JSON.prune on github : https://github.com/Canop/JSON.prune
// This was discussed here : http://stackoverflow.com/q/13861254/263525
// The code is based on Douglas Crockford's code : https://github.com/douglascrockford/JSON-js/blob/master/json2.js
// No effort was done to support old browsers. JSON.prune will fail on IE8.

	var DEFAULT_MAX_DEPTH = 6;
	var DEFAULT_ARRAY_MAX_LENGTH = 50;
	var DEFAULT_PRUNED_VALUE = '"-pruned-"';
	var seen; // Same variable used for all stringifications
	var iterator; // either forEachEnumerableOwnProperty, forEachEnumerableProperty or forEachProperty

	// iterates on enumerable own properties (default behavior)
	var forEachEnumerableOwnProperty = function(obj, callback) {
		for (var k in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, k)) callback(k);
		}
	};
	// iterates on enumerable properties
	var forEachEnumerableProperty = function(obj, callback) {
		for (var k in obj) callback(k);
	};
	// iterates on properties, even non enumerable and inherited ones
	// This is dangerous
	var forEachProperty = function(obj, callback, excluded) {
		if (obj==null) return;
		excluded = excluded || {};
		Object.getOwnPropertyNames(obj).forEach(function(k){
			if (!excluded[k]) {
				callback(k);
				excluded[k] = true;
			}
		});
		forEachProperty(Object.getPrototypeOf(obj), callback, excluded);
	};

	Object.defineProperty(Date.prototype, "toPrunedJSON", {value:Date.prototype.toJSON});

	var	cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		meta = {	// table of character substitutions
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		};

	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
			var c = meta[a];
			return typeof c === 'string'
				? c
				: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}


	var prune = function (value, depthDecr, arrayMaxLength) {
		var prunedString = DEFAULT_PRUNED_VALUE;
		var replacer;
		if (typeof depthDecr == "object") {
			var options = depthDecr;
			depthDecr = options.depthDecr;
			arrayMaxLength = options.arrayMaxLength;
			iterator = options.iterator || forEachEnumerableOwnProperty;
			if (options.allProperties) iterator = forEachProperty;
			else if (options.inheritedProperties) iterator = forEachEnumerableProperty
			if ("prunedString" in options) {
				prunedString = options.prunedString;
			}
			if (options.replacer) {
				replacer = options.replacer;
			}
		} else {
			iterator = forEachEnumerableOwnProperty;
		}
		seen = [];
		depthDecr = depthDecr || DEFAULT_MAX_DEPTH;
		arrayMaxLength = arrayMaxLength || DEFAULT_ARRAY_MAX_LENGTH;
		function str(key, holder, depthDecr) {
			var i, k, v, length, partial, value = holder[key];

			if (value && typeof value === 'object' && typeof value.toPrunedJSON === 'function') {
				value = value.toPrunedJSON(key);
			}
			if (value && typeof value.toJSON === 'function') {
				value = value.toJSON();
			}

			switch (typeof value) {
			case 'string':
				return quote(value);
			case 'number':
				return isFinite(value) ? String(value) : 'null';
			case 'boolean':
				return String(value);
      case 'object':
				if (value===null) {
					return 'null';
				}
				if (depthDecr<=0 || seen.indexOf(value)!==-1) {
					if (replacer) {
						var replacement = replacer(value, prunedString, true);
						return replacement===undefined ? undefined : ''+replacement;
					}
					return prunedString;
				}
				seen.push(value);
				partial = [];
				if (Object.prototype.toString.apply(value) === '[object Array]') {
					length = Math.min(value.length, arrayMaxLength);
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value, depthDecr-1) || 'null';
					}
					v = '[' + partial.join(',') + ']';
					if (replacer && value.length>arrayMaxLength) return replacer(value, v, false);
					return v;
				}
				if (value instanceof RegExp) {
					return quote(value.toString());
				}
				iterator(value, function(k) {
					try {
						v = str(k, value, depthDecr-1);
						if (v) partial.push(quote(k) + ':' + v);
					} catch (e) {
						// this try/catch due to forbidden accessors on some objects
					}
				});
				return '{' + partial.join(',') + '}';
			case 'function':
			case 'undefined':
				return replacer ? replacer(value, undefined, false) : undefined;
			}
		}
		return str('', {'': value}, depthDecr);
	};


