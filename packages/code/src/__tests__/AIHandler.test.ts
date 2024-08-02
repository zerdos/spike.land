import { AIHandler } from '../services/AIHandler';
import { AIService } from '../services/AIService';

jest.mock('../services/AIService');

describe('AIHandler', () => {
  let aiHandler: AIHandler;
  const testCodeSpace = 'test-code-space';

  beforeEach(() => {
    jest.clearAllMocks();
    aiHandler = new AIHandler(testCodeSpace);
  });

  it('should handle AI response', async () => {
    const query = 'Hello';
    const codeContext = 'console.log("Hello World");';
    const expectedResponse = 'AI response';
    
    (AIService.processQuery as jest.Mock).mockResolvedValue(expectedResponse);

    const result = await aiHandler.handleAIResponse(query, codeContext);

    expect(AIService.processQuery).toHaveBeenCalledWith(query, codeContext);
    expect(result).toBe(expectedResponse);
  });

  it('should analyze code context', () => {
    const code = 'function example() { console.log("Hello World"); }';
    const expectedAnalysis = 'Analyzed context: function example() { console.log("Hello World"); }...';

    (AIService.analyzeCodeContext as jest.Mock).mockReturnValue(expectedAnalysis);

    const result = aiHandler.analyzeCodeContext(code);

    expect(AIService.analyzeCodeContext).toHaveBeenCalledWith(code);
    expect(result).toBe(expectedAnalysis);
  });
});
