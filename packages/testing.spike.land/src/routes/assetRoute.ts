import type { Context } from "hono";

interface AssetResponse {
  success: boolean;
  message: string;
  path?: string;
  error?: string;
}

export const handleAssetRequest = async (ctx: Context): Promise<Response> => {
  try {
    const assetPath = ctx.req.param("assetPath");

    if (!assetPath) {
      const response: AssetResponse = {
        success: false,
        message: "Asset path is required",
        error: "MISSING_ASSET_PATH",
      };
      return ctx.json(response, 400);
    }

    // Validate asset path (basic security check)
    if (assetPath.includes("..") || !assetPath.match(/^[a-zA-Z0-9\-_/.]+$/)) {
      const response: AssetResponse = {
        success: false,
        message: "Invalid asset path",
        error: "INVALID_ASSET_PATH",
      };
      return ctx.json(response, 400);
    }

    // In a real implementation, this would serve files from a specific directory
    const response: AssetResponse = {
      success: true,
      message: "Asset found",
      path: assetPath,
    };

    return ctx.json(response, 200);
  } catch (error) {
    console.error("Asset serving error:", error);

    const response: AssetResponse = {
      success: false,
      message: "Failed to serve asset",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    };

    return ctx.json(response, 404);
  }
};
