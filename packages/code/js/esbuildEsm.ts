// Import { Mutex } from "async-mutex";

// import "core-js/proposals/string-replace-all-stage-4";

import {initialize, transform} from 'esbuild-wasm';

// Import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false;
// Const mutex = new Mutex();
const esbuild = {
	transform, // : mutex.runExclusive(() => transform),
};

export const init = async () => {
	try {
		if (initFinished === true) {
			return esbuild;
		}

		// @ts-expect-error
		const wasmURL = (await import('esbuild-wasm/esbuild.wasm'))
			.default as unknown as string;

		initFinished = initFinished || new Promise<boolean>(resolve => {
			initialize(
				{
					wasmURL: new URL(wasmURL, location.origin).toString(),
				},
			).then(() => {
				resolve(true);
			});
		});

		if (await initFinished) {
			return esbuild;
		}

		throw new Error('esbuild couldn\'t initialize');
	} catch {
		throw new Error('esbuild couldn\'t initialize');
	} finally {
		if (await initFinished) {
			return esbuild;
		}

		throw new Error('esbuild couldn\'t initialize');
	}
};
