import type RecordRTC from "@/external/record-rtc";
import { useCallback, useEffect, useRef, useState } from "react";
import { tryCatch } from "@/lib/try-catch";

interface UseDictationOptions {
  silenceThreshold?: number;
  maxSilenceDuration?: number;
}

export function useDictation(
  defaultValue = "",
  options: UseDictationOptions = {},
) {
  const [message, setMessage] = useState(defaultValue);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<RecordRTC | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const {
    silenceThreshold = 0.02,
    maxSilenceDuration = 1500,
  } = options;

  const startRecording = useCallback(async () => {
    setError("");
    const streamPromise = navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });

    const { data: stream, error: streamError } = await tryCatch(streamPromise);

    if (streamError) {
      console.error("Error accessing microphone:", streamError);
      setError(
        "Unable to access the microphone. Please check your permissions.",
      );
      return;
    }
    if (!stream) {
      setError("Failed to get media stream.");
      return;
    }

    mediaStreamRef.current = stream;

    const RecordRTCC = (await import("@/external/record-rtc")).default;

    const recorder = new RecordRTCC(stream, {
      type: "audio",
      mimeType: "audio/wav",
      recorderType: RecordRTCC.StereoAudioRecorder,
      numberOfAudioChannels: 1,
      desiredSampRate: 16000,
      bufferSize: 16384,
    });
    mediaRecorderRef.current = recorder;

    recorder.startRecording();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsRecording(false);
      return new Promise<void>((resolve) => {
        mediaRecorderRef.current?.stopRecording(async () => {
          const blob = mediaRecorderRef.current?.getBlob();
          mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
          setIsProcessing(true);
          if (blob) {
            await processAudio(blob);
          } else {
            setError("Recording failed. Please try again.");
          }
          setIsProcessing(false);
          resolve();
        });
      });
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob) => {
    if (!audioBlob || audioBlob.size === 0) {
      setError("No audio recorded. Please try again.");
      return;
    }

    const { data: apiResponse, error: sendError } = await tryCatch(
      sendData("/api/openai", {
        "record.wav": new File([audioBlob], "record.wav", {
          type: "audio/wav",
        }),
        model: "whisper-1",
      }),
    );

    if (sendError) {
      console.error("Error sending audio data:", sendError);
      setError(`An error occurred: ${(sendError as Error).message}`);
      return;
    }

    if (!apiResponse) {
      setError("No response from API.");
      return;
    }

    if (!apiResponse.ok) {
      setError(`Whisper API responded with status: ${apiResponse.status}`);
      return;
    }

    const { data: text, error: textError } = await tryCatch(apiResponse.text());

    if (textError) {
      console.error("Error reading API response text:", textError);
      setError(`An error occurred while reading response: ${(textError as Error).message}`);
      return;
    }
    if (text === null || text === undefined) {
       setError("Empty response from API.");
       return;
    }


    setMessage((prevMessage) => prevMessage + " " + text.replace(/^"|"$/g, "").replace(/\\n/g, "\n").trim());
  };

  useEffect(() => {
    let lastKeyTime = 0;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const currentTime = new Date().getTime();
        if (currentTime - lastKeyTime <= 200) {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }
        lastKeyTime = currentTime;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => {
    if (!isRecording) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    if (!mediaStreamRef.current) return;
    const microphone = audioContext.createMediaStreamSource(
      mediaStreamRef.current,
    );
    microphone.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    let silenceStart = Date.now();
    let stoppedRecording = false;

    const checkSilence = () => {
      if (!isRecording || stoppedRecording) return;
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const normalized = dataArray[i] / 128 - 1;
        sum += normalized * normalized;
      }
      const rms = Math.sqrt(sum / bufferLength);
      if (rms < silenceThreshold) {
        if (Date.now() - silenceStart > maxSilenceDuration) {
          stoppedRecording = true;
          stopRecording();
        }
      } else {
        silenceStart = Date.now();
      }
      requestAnimationFrame(checkSilence);
    };

    requestAnimationFrame(checkSilence);

    return () => {
      audioContext.close();
    };
  }, [isRecording, stopRecording, silenceThreshold, maxSilenceDuration]);

  return [message, setMessage, { isRecording, isProcessing, error }] as const;
}

async function sendData(url: string, data: Record<string, File | string>) {
  const formData = new FormData();

  for (const name in data) {
    formData.append(name, data[name]);
  }

  const primaryFetch = fetch(url, { method: "POST", body: formData });
  const fallbackFetch = fetch("/api/whisper", { method: "POST", body: formData });

  const { data: primaryResp, error: primaryError } = await tryCatch(primaryFetch);

  if (primaryResp && primaryResp.ok) {
    return primaryResp;
  }

  // If primary fetch failed or was not ok, try fallback
  console.warn("Primary fetch failed or not ok, trying fallback:", primaryError || primaryResp?.status);
  const { data: fallbackResp, error: fallbackError } = await tryCatch(fallbackFetch);

  if (fallbackResp && fallbackResp.ok) {
    return fallbackResp;
  }

  // If fallback also failed or was not ok, re-throw the primary error or a new one
  if (primaryError) throw primaryError;
  if (fallbackError) throw fallbackError;
  throw new Error("Both primary and fallback fetches failed or returned non-ok status.");
}
