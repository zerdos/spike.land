import { AIService } from "./services/AIService";

class AIHandler {
  constructor(private codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  async handleAIResponse(query: string, codeContext: string): Promise<string> {
    return AIService.processQuery(query, codeContext);
  }

  analyzeCodeContext(code: string): string {
    return AIService.analyzeCodeContext(code);
  }
}

export default AIHandler;
