// First failing test - should not update session if code is the same
// The test expects setCode to return the same code, but it's returning false
expect(result).toBe(sameCode);

// Second failing test - should return current code if processing fails
// The test expects setCode to return the current code on failure, but it's returning false
expect(result).toBe(currentCode); 