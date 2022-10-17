import type { EmotionCache } from "@emotion/utils"
import type {FC} from "react"


declare global {


       const apps: {[key: string]: FC<{appId: string}>};
       const eCaches: {[key: string]: EmotionCache};


}