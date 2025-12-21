import type { StorageService } from "../services/storageService";
import { DEFAULT_CORS_HEADERS } from "../types/aiRoutes";

export class GetHandler {
  constructor(private storageService: StorageService) {}

  async handle(codeSpace: string): Promise<Response> {
    const requestBody = await this.storageService.loadRequestBody(codeSpace);

    if (requestBody) {
      return new Response(JSON.stringify(requestBody), {
        status: 200,
        headers: DEFAULT_CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ messages: [] }), {
      status: 200,
      headers: DEFAULT_CORS_HEADERS,
    });
  }
}
