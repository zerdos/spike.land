import { createClerkClient } from "@clerk/backend";
import type { Code } from "../chatRoom";

export class AuthRoutes {
  constructor(private code: Code) {}

  async handleMyCode(request: Request): Promise<Response> {
    const { CLERK_SECRET_KEY: secretKey } = this.code.getEnv();
    const publishableKey = "pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ";

    const clerkClient = createClerkClient({
      secretKey,
      publishableKey,
    });
    const { isSignedIn } = await clerkClient.authenticateRequest(request, {
      jwtKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp3A1CStTaorSWlsiSscH
gi2ERdl1KfVsBhvuCIYHlhCowyYgvQhCpQwMD2nkley8WS+Iw8XC8s9yU0S31ONr
mK8zh7e7X/QoCrwQ7SapqTsrg3ryJXWrVeAmG+F4kNvmS6xvyoI+czgzR3gCmE+f
2Ge2cJ6fUQ1hh1jvVUXBdEe8TwRM8zZrlxKJkks3zDjvaPJkJvBqO9Qc52k9i5Sy
0+NnG2ZXuO1Iz7IVB9ow9PkUK/R9+lyB5jASkF2Z8SRksaqJDV+ycEYMd87sO73H
gPWHBSgqBcFixJbT0vLhddwwoqx1pYlnEPlU07NNQHi2JNOQoxsUXJAj/3+w5z6V
hQIDAQAB
-----END PUBLIC KEY-----
`,
    });

    return new Response(JSON.stringify({ isSignedIn }), { status: 200 });
  }
}