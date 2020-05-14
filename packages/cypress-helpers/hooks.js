import { cleanupStyles } from "./cleanupStyles";
import { renderTestingPlatform } from "./renderTestingPlatform";

const { before, beforeEach } = this;
before(() => {
  const { cy } = this;
  return renderTestingPlatform(cy);
});
beforeEach(() => {
  const { cy } = this;
  return cleanupStyles(cy);
});
