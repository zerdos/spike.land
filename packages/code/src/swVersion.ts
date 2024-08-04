import * as SW from "@src/swVersion";

export const swVersion : string =  (SW && SW.swVersion) || "localTests";
