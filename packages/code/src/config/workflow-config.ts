// Model configuration
export const MODEL_NAME = "claude-sonnet-4-20250514";
export const MODEL_MAX_TOKENS = 7096;
export const MODEL_TEMPERATURE = 0;

// Code modification thresholds
export const DEFAULT_RETURN_MODIFIED_CODE = false; // Default to not returning full code to save tokens
export const SMALL_FILE_THRESHOLD = 1024; // Files smaller than 1KB will always return full code
export const COMPLEX_CHANGE_THRESHOLD = 500; // Changes larger than 500 chars are considered complex
export const SIGNIFICANT_CHANGE_RATIO = 0.2; // Changes affecting more than 20% of file are significant
export const COMPRESSION_THRESHOLD = 10240; // Files larger than 10KB will use compression

// API configuration
export const ANTHROPIC_API_CONFIG = {
  apiKey: "DUMMY_API_KEY", // To be replaced with actual key in production
  streaming: false,
  temperature: MODEL_TEMPERATURE,
  maxTokens: MODEL_MAX_TOKENS,
  getApiUrl: (origin: string) => `${origin}/api/anthropic`,
};
