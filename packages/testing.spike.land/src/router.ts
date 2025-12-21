import { Hono } from "hono";
import { cacheMiddleware } from "./middlewares/cacheMiddleware";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { handleApiRequest } from "./routes/apiRoute";
import { handleAssetRequest } from "./routes/assetRoute";
import { handleAuthRequest } from "./routes/authRoute";
import { handleEditorRequest } from "./routes/editorRoute";

const app = new Hono();

// Apply shared middleware
app.use(loggingMiddleware);
app.use(cacheMiddleware);

// Setup route modules
app.get("/assets/*", handleAssetRequest);
app.get("/editor/*", handleEditorRequest);
app.get("/api/*", handleApiRequest);
app.get("/auth/*", handleAuthRequest);

export default app;
