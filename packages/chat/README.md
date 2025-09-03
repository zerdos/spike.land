# Chat Application with AI Assistant

A comprehensive chat application with AI assistant functionality built on Cloudflare's infrastructure.

## Features

- **AI-Powered Chat**: Multiple AI models including Llama 2, Mistral, CodeLlama, and more
- **Real-time Communication**: WebSocket support via Cloudflare Durable Objects
- **Authentication**: Clerk integration for user management
- **Payments**: Stripe integration for subscriptions and credits
- **File Attachments**: R2 storage for file uploads
- **Database**: D1 SQLite for persistent data storage
- **Queue Processing**: Cloudflare Queues for async tasks

## Architecture

### Backend (Cloudflare Workers)
- REST API endpoints for conversations and messages
- WebSocket handling via Durable Objects
- AI integration with Cloudflare AI models
- Webhook handlers for Clerk and Stripe

### Database Schema (D1)
- Users with subscription tiers and credits
- Conversations with AI model selection
- Messages with token tracking
- Attachments stored in R2

### Real-time Features
- WebSocket connections for live chat
- Typing indicators
- Presence detection
- Message broadcasting

## Setup

1. Install dependencies:
```bash
cd packages/chat
npm install
```

2. Configure environment variables in `wrangler.toml`:
- Update database ID
- Set Clerk keys
- Configure Stripe keys
- Set R2 bucket details

3. Initialize the database:
```bash
wrangler d1 execute spike-chat-db --file=src/db/schema.sql
```

4. Deploy to Cloudflare:
```bash
npm run deploy
```

## API Endpoints

### Conversations
- `GET /api/conversations` - List all conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation with messages
- `DELETE /api/conversations/:id` - Delete conversation
- `PUT /api/conversations/:id` - Update conversation title

### Messages
- `POST /api/messages` - Send message and get AI response
- `GET /api/messages/:conversationId` - Get messages for conversation
- `POST /api/messages/:messageId/regenerate` - Regenerate AI response

### User & Subscription
- `GET /api/user/profile` - Get user profile
- `POST /api/subscription/create` - Create Stripe checkout session
- `POST /api/subscription/manage` - Access customer portal

### Webhooks
- `POST /api/webhooks/clerk` - Clerk webhook handler
- `POST /api/webhooks/stripe` - Stripe webhook handler

### WebSocket
- `ws://[domain]/ws/:conversationId` - WebSocket connection for real-time chat

## Subscription Tiers

- **Free**: 10 messages/month
- **Pro**: $10/month - 500 messages
- **Business**: $29/month - unlimited messages

## Credit System

Alternative pay-as-you-go model:
- $5 = 100 credits
- 1 message = 1 credit

## Development

```bash
# Run development server
npm run dev

# Type checking
npm run types:check

# Run tests
npm test

# Format code
npm run fmt

# Lint code
npm run lint
```

## Frontend Integration

The frontend components in `/frontend` provide:
- Chat interface with message display
- Conversation list management
- WebSocket hooks for real-time updates
- API client for backend communication

## Security

- JWT token verification via Clerk
- Webhook signature validation
- Content moderation with AI
- CORS headers configured
- Rate limiting via Cloudflare