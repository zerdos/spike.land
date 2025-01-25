import {createDiff, applyDiff} from '@/lib/text-diff';
import {it, describe, expect} from 'vitest';


describe('createDiff', () => {
  it('should create a diff', () => {
    const original = {code: "a", transpiled: "@",
      messages: [],
      html: "html", css: "css", codeSpace: "codeSpace"};

    const revision = {code: "b", transpiled: "@" ,
      messages: [],
      html: "html", css: "css", codeSpace: "codeSpace"};
    const diff = createDiff(original, revision);

    const originalCopy = {...original};
    const reconstructed = applyDiff(originalCopy, diff);

    expect(originalCopy).toEqual(reconstructed);
  });
});