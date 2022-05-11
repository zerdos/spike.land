import type {ReactNode} from "react"


declare module "https://spike.land/live/code-main/js" {
  const returnFn: ()=> ReactNode
  export default returnFn;
}