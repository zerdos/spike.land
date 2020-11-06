import * as RendererWorker from "./renderer/renderer.worker";

import { hash, unHash } from "./sha";

const { renderWorker } = ((typeof window !== "undefined") &&
  (RendererWorker as unknown as () =>
    (typeof RendererWorker))()) as typeof RendererWorker;

export const render = async (
  transformedCodeHash: string,
  defaultPropsHash: string,
) => {
  try {
    const code = await unHash(transformedCodeHash);
    const defaultProps = await unHash(defaultPropsHash);
    const renderResult = await renderWorker(code, defaultProps);
    if (typeof renderResult != "string") throw renderResult.error;
    const renderedStringHash = await hash(renderResult);

    return renderedStringHash;
  } catch (e) {
    return { error: e };
  }
};
