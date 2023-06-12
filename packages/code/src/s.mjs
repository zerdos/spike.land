import {
  useEffectAsync as Y,
  useMemoAsync as Z,
} from "https://testing.spike.land/*@chengsokdara/react-hooks-async?bundle";
import { useEffect as ee, useRef as s, useState as y } from "https://testing.spike.land/reactMod.mjs";
var Q = "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
  V =
    "silenceremove=start_periods=1:stop_periods=-1:start_threshold=-30dB:stop_threshold=-30dB:start_silence=2:stop_silence=2",
  X = "https://api.openai.com/v1/audio/",
  te = {
    apiKey: "",
    autoStart: !1,
    autoTranscribe: !0,
    mode: "transcriptions",
    nonStop: !1,
    removeSilence: !1,
    stopTimeout: 5e3,
    streaming: !1,
    timeSlice: 1e3,
    onDataAvailable: void 0,
    onTranscribe: void 0,
  },
  re = { stop: void 0 },
  ae = { blob: void 0, text: void 0 },
  ne = (D) => {
    let {
      apiKey: f,
      autoStart: k,
      autoTranscribe: R,
      mode: v,
      nonStop: _,
      removeSilence: K,
      stopTimeout: M,
      streaming: h,
      timeSlice: P,
      whisperConfig: u,
      onDataAvailable: U,
      onTranscribe: b,
    } = { ...te, ...D };
    if (!f && !b) {
      throw new Error("apiKey is required if onTranscribe is not provided");
    }
    let p = s([]),
      i = s(),
      o = s(),
      r = s(),
      n = s(),
      d = s(re),
      [$, S] = y(!1),
      [j, A] = y(!1),
      [q, m] = y(!1),
      [z, l] = y(ae);
    ee(() => () => {
      p.current && (p.current = []),
        i.current && (i.current.flush(), i.current = void 0),
        r.current && (r.current.destroy(), r.current = void 0),
        w("stop"),
        o.current
        && (o.current.off("speaking", T), o.current.off("stopped_speaking", B)),
        n.current
        && (n.current.getTracks().forEach((e) => e.stop()), n.current = void 0);
    }, []),
      Y(async () => {
        k && await F();
      }, [k]);
    let H = async () => {
        await F();
      },
      I = async () => {
        await O();
      },
      L = async () => {
        await E();
      },
      F = async () => {
        try {
          if (n.current || await N(), n.current) {
            if (!r.current) {
              let {
                  default: {
                    RecordRTCPromisesHandler: t,
                    StereoAudioRecorder: a,
                  },
                } = await import(
                  "https://testing.spike.land/*recordrtc?bundle"
                ),
                c = {
                  mimeType: "audio/wav",
                  numberOfAudioChannels: 1,
                  recorderType: a,
                  sampleRate: 44100,
                  timeSlice: h ? P : void 0,
                  type: "audio",
                  ondataavailable: R && h ? J : void 0,
                };
              r.current = new t(n.current, c);
            }
            if (!i.current) {
              let { Mp3Encoder: t } = await import(
                "https://testing.spike.land/*lamejs?bundle"
              );
              i.current = new t(1, 44100, 96);
            }
            let e = await r.current.getState();
            (e === "inactive" || e === "stopped")
            && await r.current.startRecording(),
              e === "paused" && await r.current.resumeRecording(),
              _ && x("stop"),
              S(!0);
          }
        } catch {}
      },
      N = async () => {
        try {
          if (
            n.current && n.current.getTracks().forEach((e) => e.stop()),
              n.current = await navigator.mediaDevices.getUserMedia({
                audio: !0,
              }),
              !o.current
          ) {
            let { default: e } = await import(
              "https://testing.spike.land/*hark?bundle"
            );
            o.current = e(n.current, { interval: 100, play: !1 }),
              o.current.on("speaking", T),
              o.current.on("stopped_speaking", B);
          }
        } catch {}
      },
      x = (e) => {
        d.current[e] || (d.current[e] = setTimeout(E, M));
      },
      T = () => {
        A(!0), w("stop");
      },
      B = () => {
        A(!1), _ && x("stop");
      },
      O = async () => {
        try {
          r.current
            && (await r.current.getState() === "recording"
              && await r.current.pauseRecording(),
              w("stop"),
              S(!1));
        } catch {}
      },
      E = async () => {
        try {
          if (r.current) {
            let e = await r.current.getState();
            if (
              (e === "recording" || e === "paused")
              && await r.current.stopRecording(),
                W(),
                w("stop"),
                S(!1),
                R
            ) await G();
            else {
              let t = await r.current.getBlob();
              l({ blob: t });
            }
            await r.current.destroy(),
              p.current = [],
              i.current && (i.current.flush(), i.current = void 0),
              r.current = void 0;
          }
        } catch {}
      },
      W = () => {
        o.current
        && (o.current.off("speaking", T), o.current.off("stopped_speaking", B), o.current = void 0),
          n.current
          && (n.current.getTracks().forEach((e) => e.stop()), n.current = void 0);
      },
      w = (e) => {
        d.current[e] && (clearTimeout(d.current[e]), d.current[e] = void 0);
      },
      G = async () => {
        try {
          if (
            i.current && r.current && await r.current.getState() === "stopped"
          ) {
            m(!0);
            let e = await r.current.getBlob();
            if (K) {
              let { createFFmpeg: t } = await import(
                  "https://testing.spike.land/*@ffmpeg/ffmpeg?bundle"
                ),
                a = t({ mainName: "main", corePath: Q, log: !0 });
              a.isLoaded() || await a.load();
              let c = await e.arrayBuffer();
              a.FS("writeFile", "in.wav", new Uint8Array(c)),
                await a.run(
                  "-i",
                  "in.wav",
                  "-acodec",
                  "libmp3lame",
                  "-b:a",
                  "96k",
                  "-ar",
                  "44100",
                  "-af",
                  V,
                  "out.mp3",
                );
              let g = a.FS("readFile", "out.mp3");
              if (g.length <= 225) {
                a.exit(), l({ blob: e }), m(!1);
                return;
              }
              e = new Blob([g.buffer], { type: "audio/mpeg" }), a.exit();
            } else {
              let t = await e.arrayBuffer(),
                a = i.current.encodeBuffer(new Int16Array(t));
              e = new Blob([a], { type: "audio/mpeg" });
            }
            if (typeof b == "function") {
              let t = await b(e);
              l(t);
            } else {
              let t = new File([e], "speech.mp3", { type: "audio/mpeg" }),
                a = await C(t);
              l({ blob: e, text: a });
            }
            m(!1);
          }
        } catch {
          m(!1);
        }
      },
      J = async (e) => {
        try {
          if (h && r.current) {
            if (U?.(e), i.current) {
              let t = await e.arrayBuffer(),
                a = i.current.encodeBuffer(new Int16Array(t)),
                c = new Blob([a], { type: "audio/mpeg" });
              p.current.push(c);
            }
            if (await r.current.getState() === "recording") {
              let t = new Blob(p.current, { type: "audio/mpeg" }),
                a = new File([t], "speech.mp3", { type: "audio/mpeg" }),
                c = await C(a);
              c && l((g) => ({ ...g, text: c }));
            }
          }
        } catch {}
      },
      C = Z(async (e) => {
        let t = new FormData();
        t.append("file", e),
          t.append("model", "whisper-1"),
          v === "transcriptions" && t.append("language", u?.language ?? "en"),
          u?.prompt && t.append("prompt", u.prompt),
          u?.response_format && t.append("response_format", u.response_format),
          u?.temperature && t.append("temperature", `${u.temperature}`);
        let a = {};
        a["Content-Type"] = "multipart/form-data", f && (a.Authorization = `Bearer ${f}`);
        let { default: c } = await import(
          "https://testing.spike.land/*axios?bundle"
        );
        return (await c.post(X + v, t, { headers: a })).data.text;
      }, [f, v, u]);
    return {
      recording: $,
      speaking: j,
      transcribing: q,
      transcript: z,
      pauseRecording: I,
      startRecording: H,
      stopRecording: L,
    };
  },
  ce = ne;
export { ce as default, ne as useWhisper };
// # sourceMappingURL=use-whisper.bundle.mjs.map
