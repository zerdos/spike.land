import type RecordRTC from "@/external/record-rtc";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseDictationOptions {
  silenceThreshold?: number;
  maxSilenceDuration?: number;
}

export function useDictation(
  defaultValue: string = "",
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
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
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
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError(
        "Unable to access the microphone. Please check your permissions.",
      );
    }
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

    try {
      const apiResponse = await sendData("/api/openai", {
        "record.wav": new File([audioBlob], "record.wav", {
          type: "audio/wav",
        }),
        model: "whisper-1",
      });

      if (!apiResponse.ok) {
        throw new Error(
          `Whisper API responded with status: ${apiResponse.status}`,
        );
      }

      const text = (await apiResponse.text())
        .replace(/^"|"$/g, "")
        .replace(/\\n/g, "\n")
        .trim();

      setMessage((prevMessage) => prevMessage + " " + text);
    } catch (error) {
      console.error("Error in audio processing:", error);
      setError(`An error occurred: ${(error as Error).message}`);
    }
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

    let silenceStart = performance.now();
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
        if (performance.now() - silenceStart > maxSilenceDuration) {
          stoppedRecording = true;
          stopRecording();
        }
      } else {
        silenceStart = performance.now();
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

  try {
    const resp = await Promise.race([
      fetch(url, { method: "POST", body: formData }),
      fetch("/api/whisper", { method: "POST", body: formData }),
    ]);
    if (!resp.ok) {
      return await fetch("/api/whisper", { method: "POST", body: formData });
    }
    return resp;
  } catch {
    const resp = await fetch("/api/whisper", {
      method: "POST",
      body: formData,
    });
    if (resp.ok) return resp;
    return await fetch(url, { method: "POST", body: formData });
  }
}
