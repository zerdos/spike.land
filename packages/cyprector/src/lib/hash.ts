import { PlatformData } from "@sorry-cypress/common";
import md5 from "md5";
import { v4 as uuid } from "uuid";

export const generateRunIdHash = (
  ciBuildId: string,
  sha: string,
  projectId: string,
) => {
  return md5(ciBuildId + sha + projectId);
};

// not sure how specific that should be
export const generateGroupId = (
  platform: PlatformData,
  ciBuildId: string,
): string => `${ciBuildId}`;

export const generateUUID = () => uuid();
