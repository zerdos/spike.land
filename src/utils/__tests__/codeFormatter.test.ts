import { prettierToThrow } from '../codeFormatter';

describe('prettierToThrow', () => {
  it('should format valid code correctly', async () => {
    const input = `function test(){return "hello world";}`;
    const expected = `function test() {
  return "hello world";
}
`;
    const result = await prettierToThrow({ code: input, toThrow: false });
    expect(result).toBe(expected);
  });

  it('should throw an error when toThrow is true and code is invalid', async () => {
    const invalidCode = `function test( { return "hello world"; }`;
    await expect(prettierToThrow({ code: invalidCode, toThrow: true })).rejects.toThrow();
  });

  it('should return original code when toThrow is false and code is invalid', async () => {
    const invalidCode = `function test( { return "hello world"; }`;
    const result = await prettierToThrow({ code: invalidCode, toThrow: false });
    expect(result).toBe(invalidCode);
  });
});
