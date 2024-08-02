import { AIService } from '../services/AIService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AIService', () => {
  describe('processQuery', () => {
    it('should send a request to AI assistant API and return the response', async () => {
      const mockQuery = 'Hello';
      const mockCodeContext = 'console.log("Hello World");';
      const mockResponse = { data: { suggestion: 'Hi there!' } };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await AIService.processQuery(mockQuery, mockCodeContext);

      expect(result).toBe('Hi there!');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/ai-assistant',
        { query: mockQuery, codeContext: mockCodeContext }
      );
    });

    it('should return an error message if the API request fails', async () => {
      const mockQuery = 'Hello';
      const mockCodeContext = 'console.log("Hello World");';
      mockedAxios.post.mockRejectedValue(new Error('HTTP error! status: 500'));

      const result = await AIService.processQuery(mockQuery, mockCodeContext);

      expect(result).toBe('Sorry, I encountered an error while processing your request.');
    });
  });

  describe('analyzeCodeContext', () => {
    it('should return an analyzed context string', () => {
      const mockCode = 'function test() { console.log("Hello World"); }';
      const result = AIService.analyzeCodeContext(mockCode);

      expect(result).toBe('Analyzed context: function test() { console.log("Hello World"); }...');
    });
  });
});
