import axios from 'axios';

class AIService {
  static async processQuery(query: string, codeContext: string): Promise<string> {
    try {
      const response = await axios.post('/api/ai-assistant', { query, codeContext });
      return response.data.suggestion;
    } catch (error) {
      console.error('Error processing AI query:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  static analyzeCodeContext(code: string): string {
    // Implement code analysis logic here
    return `Analyzed context: ${code.substring(0, 100)}...`;
  }
}

export default AIService;
