import { tryCatch } from "@/lib/try-catch";
import { useState } from "react";
import type { FC } from "react";

export const TextToSpeech: FC = () => {
  const [text, setText] = useState("");
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
          model: "tts-1",
          voice: "alloy",
          input: text,
        }),
      });

      if (!response || !response.ok) {
        throw new Error("Speech generation failed");
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new window.AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      return arrayBuffer;
    })();

    const { data: audioData, error } = await tryCatch<ArrayBuffer>(
      audioPromise,
    );

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Text to Speech</h1>
      <textarea
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-200"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to be spoken!!!"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSpeak}
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? "Generating..." : "Generate Speech"}
      </button>
      {isAudioReady && (
        <div className="mt-4">
          <p className="text-green-500 mb-2">
            Audio generated successfully! Click play to listen.
          </p>
          <audio
            controls
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

TextToSpeech.displayName = "TextToSpeech";

export default TextToSpeech;
