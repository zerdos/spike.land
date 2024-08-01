import { Message } from "../types/Message";

export class LocalStorageService {
  private codeSpace: string;

  constructor(codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  loadMessages(): Message[] {
    return JSON.parse(
      localStorage.getItem(`chatMessages-${this.codeSpace}`) ?? "[]",
    ) as Message[];
  }

  saveAIInteraction(input: string, response: string): void {
    const interactions = JSON.parse(localStorage.getItem(`aiInteractions-${this.codeSpace}`) ?? "[]");
    interactions.push({ input, response, timestamp: Date.now() });
    localStorage.setItem(`aiInteractions-${this.codeSpace}`, JSON.stringify(interactions));
  }
}
