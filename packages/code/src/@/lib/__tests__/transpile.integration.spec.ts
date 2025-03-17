import { readFile } from "node:fs/promises";
import { importMapReplace } from "../importmap-utils";
import { prettierJs } from "../prettier";
import { join } from 'path';
import { transpile } from "../transpile";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('tsxToMjs', () => {
  // Skip this test for now since it requires browser environment
  it.skip('should convert card.tsx to ESM', async () => {
    const input = await readFile(join(__dirname, '../../components/ui/card.tsx'), 'utf-8');
    const expectedOutput = await readFile(join(__dirname, '../../../../dist/@/components/ui/card.mjs'), 'utf-8');

    const output = await transpile({code: input, originToUse: "/base"}) as string;
    
    expect(output).toBeTruthy();
    expect(typeof output).toBe('string');
    
    const prettifiedOutput = await prettierJs({code: importMapReplace(output), toThrow: true});
    const prettifiedExpectedOutput = await prettierJs({code: expectedOutput, toThrow: true});
      
    expect(prettifiedOutput).toBe(prettifiedExpectedOutput);
  });
});
