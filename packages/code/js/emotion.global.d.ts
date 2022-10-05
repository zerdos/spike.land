import type * as Emotion from '@emotion/react';

declare global {
	interface Window {
		emotionReact: typeof Emotion;
	}
}
