import type Env from "../env";
import type { PostRequestBody } from "../types/aiRoutes";

export class StorageService {
  constructor(private env: Env) {}

  async loadRequestBody(codeSpace: string): Promise<PostRequestBody | null> {
    const bodyKey = `request_body_${codeSpace}`;
    try {
      const bodyObject = await this.env.R2.get(bodyKey);
      if (bodyObject) {
        const body = JSON.parse(await bodyObject.text()) as PostRequestBody;
        return body;
      }
    } catch (e) {
      console.error(`Failed to load request body from R2 (${bodyKey}):`, e);
    }
    return null;
  }

  async saveRequestBody(
    codeSpace: string,
    body: PostRequestBody,
  ): Promise<void> {
    const bodyKey = `request_body_${codeSpace}`;
    try {
      await this.env.R2.put(bodyKey, JSON.stringify(body));
      console.log(
        `[Storage Service] Saved request body with ${body.messages.length} messages to R2`,
      );
    } catch (e) {
      console.error(`Failed to save request body to R2 (${bodyKey}):`, e);
      throw e;
    }
  }
}
