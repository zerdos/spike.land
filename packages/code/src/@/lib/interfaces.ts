export interface Message {
  id: string;
  role: 'user' | 'system' | 'assistant';
  content: string | MessageContent[];
}

export interface MessageContent {
  type: 'text' | 'image';
  text?: string;
  source?: {
    type: 'base64';
    media_type: 'image/jpeg' | 'image/png';
    data: string;
  };
}

export interface ImageData {
  type: string;
  data: string;
}
