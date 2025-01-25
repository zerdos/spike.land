import type { ReactNode } from "react";

declare module "/Wrapper.mjs";
declare module "*.html?raw" {
  const content: string;
  export default content;
}

declare module "/live/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}
declare module "/*";

declare let URL: {
  new(url: string | URL, base?: string | URL): URL;
  prototype: URL;
  canParse(url: string | URL, base?: string): boolean;
  createObjectURL(obj: Blob | MediaSource): string;
  revokeObjectURL(url: string): void;
};
declare let VI_TEST: string;

declare global {
  interface Window {
    URL: typeof URL;
  }
}

/////////////////////////////
/// WebCodecs APIs
/////////////////////////////

// type AlphaOption = "discard" | "keep";
type AudioSampleFormat =
  | "f32"
  | "f32-planar"
  | "s16"
  | "s16-planar"
  | "s32"
  | "s32-planar"
  | "u8"
  | "u8-planar";

interface AudioDataCopyToOptions {
  format?: AudioSampleFormat | undefined;
  frameCount?: number | undefined;
  frameOffset?: number | undefined;
  planeIndex: number;
}

interface AudioDataInit {
  data: AllowSharedBufferSource;
  format: AudioSampleFormat;
  numberOfChannels: number;
  numberOfFrames: number;
  sampleRate: number;
  timestamp: number;
}

interface AudioData {
  readonly duration: number;
  readonly format: AudioSampleFormat;
  readonly numberOfChannels: number;
  readonly numberOfFrames: number;
  readonly sampleRate: number;
  readonly timestamp: number;
  allocationSize(options: AudioDataCopyToOptions): number;
  clone(): AudioData;
  close(): void;
  copyTo(
    destination: AllowSharedBufferSource,
    options: AudioDataCopyToOptions,
  ): void;
}

declare const AudioData: {
  prototype: AudioData;
  new(init: AudioDataInit): AudioData;
};

interface AudioDataOutputCallback {
  (output: AudioData): void;
}
