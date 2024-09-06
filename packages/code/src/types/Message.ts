export interface Message {
  id: string;
  role: 'user' | 'system' | 'assistant';
  content: string;
}