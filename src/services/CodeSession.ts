async setCode(code: string): Promise<string | false> {
  // Get the current code
  const currentCode = await this.getCode();
  
  // If the new code is the same as the current code, return the current code
  if (code === currentCode) {
    return currentCode;
  }
  
  try {
    // Process the code
    const processedCode = await this.processCode(code);
    
    // Update the code in storage
    await this.storage.setItem(this.codeKey, processedCode);
    
    // Return the processed code
    return processedCode;
  } catch (error) {
    console.error("Error processing code:", error);
    // Return the current code on failure
    return currentCode;
  }
} 