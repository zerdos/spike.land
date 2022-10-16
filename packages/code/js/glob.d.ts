import type { EmotionCache } from "@emotion/utils"
import type {FC} from "react"


declare global {

    interface globalThis {
        apps: {[key: string]: FC<{appId: string}>};
        eCaches: {[key: string]: EmotionCache};
    }


}