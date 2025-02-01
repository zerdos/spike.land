import { Hono } from 'hono';
import { loggingMiddleware } from './middlewares/loggingMiddleware';
import { cacheMiddleware } from './middlewares/cacheMiddleware';
import { handleAssetRequest } from './routes/assetRoute';
import { handleEditorRequest } from './routes/editorRoute';
import { handleApiRequest } from './routes/apiRoute';
import { handleAuthRequest } from './routes/authRoute';

const app = new Hono();

// Apply shared middleware
app.use(loggingMiddleware);
app.use(cacheMiddleware);

// Setup route modules
app.get('/assets/*', handleAssetRequest);
app.get('/editor/*', handleEditorRequest);
app.get('/api/*', handleApiRequest);
app.get('/auth/*', handleAuthRequest);

export default app;
