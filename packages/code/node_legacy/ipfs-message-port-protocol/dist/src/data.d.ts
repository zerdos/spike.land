export declare type JSONObject = {
  [key: string]: JSONValue;
};
export declare type JSONArray = Array<JSONValue>;
export declare type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONArray
  | JSONObject;
export declare type Encoded<_Data, Representation> = Representation;
export declare type StringEncoded<T> = Encoded<T, string>;
export declare type UnixFSTime = {
  secs: number;
  nsecs: number;
};
export declare type LooseUnixFSTime = {
  secs: number;
  nsecs?: number;
};
export declare type HRTime = [number, number];
export declare type Time = Date | LooseUnixFSTime | HRTime;
export declare type Mode = string | number;
export declare type HashAlg = string;
export declare type FileType = "directory" | "file";
export declare type CIDVersion = 0 | 1;
export declare type Result<X, T> = {
  ok: true;
  value: T;
} | {
  ok: false;
  error: X;
};
export declare type EncodedError = {
  message: string;
  name: string;
  stack: string;
};
//# sourceMappingURL=data.d.ts.map
