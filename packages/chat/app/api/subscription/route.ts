import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers.get("authorization")?.replace("Bearer ", "") ||
                     request.cookies.get("auth_token")?.value;

    if (!authToken && !request.headers.get("cookie")?.includes("auth_token")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Return demo subscription info
    // In production, this would fetch from database
    return NextResponse.json({
      success: true,
      data: {
        tier: "Free",
        credits: 10,
        features: "Basic chat, 10 messages per day",
        limit: 10,
      },
    });
  } catch (error) {
    console.error("Error fetching subscription info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscription info" },
      { status: 500 }
    );
  }
}

// Edge runtime not supported with OpenNext
// export const runtime = "edge";