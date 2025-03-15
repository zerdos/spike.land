import { readFile } from "node:fs/promises";
import { importMapReplace } from "../importmap-utils";
import { prettierJs } from "../prettier";
import {join} from 'path';

import { tsxToMjs
 } from "../tsx-to-esm";
describe('tsxToMjs', () => {
    it('should convert a simple JSX file to ESM', async () => {
      const input = await readFile(join(__dirname,  '../../components/ui/card.tsx'), 'utf-8');
      const expectedOutput = await readFile(join(__dirname,  '../../../../dist/@/components/ui/card.mjs'), 'utf-8');

      const output = tsxToMjs(input);
      
      const prettifiedOutput = await prettierJs({code: importMapReplace(output), toThrow: true});
      const prettifiedExpectedOutput = await prettierJs({code: expectedOutput, toThrow: true});

        
      expect((prettifiedOutput)).toBe(prettifiedExpectedOutput);
    });
});