import { readFile } from "node:fs/promises";
import { importMapReplace } from "../importmap-utils";
import { prettierJs } from "../prettier";
import { join } from 'path';
import { transpile } from "../transpile";
import { decode } from "@webassemblyjs/wasm-parser";
import { readFileSync } from "fs";

const binary = readFileSync(join(__dirname, "../../../../../../node_modules/esbuild-wasm/esbuild.wasm"));

const decoderOpts = {};
const ast = decode(binary, decoderOpts);

// import { Card } from    "../../../../dist/@/components/ui/card.mjs";
// import {wasmFile} from "../../../../dist/esbuildWASM.mjs";
// import * as Utils from "node:util";
// import encodeUfs8 from "encode-utf8";


describe('tsxToMjs', () => {
  beforeAll(async () => {
    // Object.assign(global, Utils);
    // Object.assign(global, {encodeUTF8: encodeUfs8});
  });

  afterAll(async () => {
    // await cleanup();
  });

  // Test just the card component to ensure basic functionality works
  it('should convert card.tsx to ESM', async () => {
    const input = await readFile(join(__dirname, '../../components/ui/card.tsx'), 'utf-8');
    const expectedOutput = await readFile(join(__dirname, '../../../../dist/@/components/ui/card.mjs'), 'utf-8');

    // expect(input).toBeTruthy();
    const output = await transpile({code: input, originToUse: "", wasmModule: ast}) as string;
    
    expect(output).toBeTruthy();
    expect(typeof output).toBe('string');
    
    const prettifiedOutput = await prettierJs({code: importMapReplace(output), toThrow: true});
    const prettifiedExpectedOutput = await prettierJs({code: expectedOutput, toThrow: true});
      
    expect(prettifiedOutput).toBe(prettifiedExpectedOutput);
  });
});
