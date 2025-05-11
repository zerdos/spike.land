import { tryCatch } from "@/lib/try-catch";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownWithReadAloudProps {
  children: string;
  className?: string;
}

const MarkdownWithReadAloud: React.FC<MarkdownWithReadAloudProps> = (
  { children, className },
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isAudioReady, setIsAudioReady] = useState(false);

  const handleSpeak = async () => {
    setIsLoading(true);

    const audioPromise = (async () => {
      const response = await fetch("/api/openai/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1-hd",
          voice: "alloy",
          input: children,
        }),
      });

      if (!response || !response.ok) {
        throw new Error("Speech generation failed");
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new window.AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(
        arrayBuffer as ArrayBuffer,
      );
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      return arrayBuffer;
    })();

    const { data: audioData, error } = await tryCatch<ArrayBuffer>(audioPromise);

    if (error) {
      console.error("Error generating speech:", error);
      alert("Failed to generate or play audio. Please try again.");
    } else if (audioData) {
      setAudioUrl(
        URL.createObjectURL(new Blob([audioData], { type: "audio/mpeg" })),
      );
      setIsAudioReady(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={className}>
      <ReactMarkdown>{children}</ReactMarkdown>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 mt-4"
        onClick={handleSpeak}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Read Aloud"}
      </button>
      {isAudioReady && (
        <div className="mt-4">
          <p className="text-green-500 mb-2">
            Audio generated successfully! Click play to listen.
          </p>
          <audio
            controls
            autoPlay={true}
            src={audioUrl}
            className="w-full"
            onPlay={() => {
              const audioContext = new AudioContext();
              audioContext.resume();
            }}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MarkdownWithReadAloud;
