export type Options = {
    nonce?: string | undefined;
    stylisPlugins?: StylisPlugin[] | undefined;
    key: string;
    container?: HTMLElement | undefined;
    speedy?: boolean | undefined;
    prepend?: boolean | undefined;
};
export default createCache;
import { StylisPlugin } from "./types";
declare function createCache(options: Options): EmotionCache;
import { EmotionCache } from "../../../node_modules/@emotion/utils/types";
