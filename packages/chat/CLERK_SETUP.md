# Clerk Authentication Setup Guide

This guide explains how to set up Clerk authentication for the Chat package.

## Prerequisites

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new Clerk application
3. Get your publishable and secret keys

## Environment Variables

Copy `.env.example` to `.env` and fill in your Clerk credentials:

```bash
cp .env.example .env
```

Update the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

## Clerk Dashboard Configuration

### 1. Sign-in/Sign-up Options

In your Clerk dashboard, configure:

- **User Management → Sign-in Options**: Enable email and/or social providers
- **User Management → Sign-up Options**: Enable email verification if desired
- **Customization → Branding**: Customize the appearance to match your app

### 2. Webhooks (Optional)

If you want real-time user sync:

1. Go to **Webhooks** in your Clerk dashboard
2. Add endpoint: `https://your-app-domain.workers.dev/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Copy the webhook signing secret to your environment variables

### 3. Domain Configuration

For production deployments:

1. Go to **Domains** in your Clerk dashboard
2. Add your production domain
3. Update CORS settings if needed

## Features Included

### Frontend Authentication

- **Sign In/Sign Up Components**: Modal-based authentication flows
- **User Button**: Dropdown with user info and sign-out option
- **Auth Hook**: `useAuth()` hook for managing authentication state
- **Protected Routes**: Automatic redirect to sign-in for unauthenticated users

### Backend Integration

- **Token Verification**: All API routes verify Clerk JWT tokens
- **User Management**: Automatic user creation/updates via webhooks
- **Session Management**: Secure session handling with proper token validation

### Authentication Flow

1. **Landing Page**: Shows sign-in/sign-up options
2. **Clerk Modals**: Handle the actual authentication process
3. **Auto-Sync**: User data synced to local database
4. **Protected Access**: API routes require valid authentication
5. **Graceful Signout**: Clean session termination

## Usage Examples

### Check Authentication Status

```typescript
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { isSignedIn, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  return <div>Welcome, {user?.firstName}!</div>;
}
```

### Make Authenticated API Calls

```typescript
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { getAuthHeaders } = useAuth();

  const callAPI = async () => {
    const headers = await getAuthHeaders();
    const response = await fetch("/api/protected-endpoint", {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  };
}
```

### Manual Authentication

```typescript
import { auth } from "./lib/clerk";

// Open sign-in modal
auth.openSignIn();

// Open sign-up modal
auth.openSignUp();

// Sign out
await auth.signOut();

// Get current user
const user = auth.getCurrentUser();
```

## Development Mode

For development, you can still use the demo mode by clicking "Start Chatting (Demo)" on the landing page. This bypasses Clerk authentication for testing purposes.

## Testing

The authentication system includes:

- Mock responses for testing
- Demo mode for development
- Fallback handling for failed authentication
- Proper error boundaries

## Troubleshooting

### Common Issues

1. **"No authentication token available"**
   - Check your VITE_CLERK_PUBLISHABLE_KEY is set correctly
   - Ensure Clerk is properly initialized

2. **CORS errors**
   - Add your domain to Clerk's allowed origins
   - Check CORS headers in the worker configuration

3. **Webhook failures**
   - Verify webhook URL is correct
   - Check webhook signing secret
   - Ensure your worker is deployed and accessible

### Debug Mode

Set these environment variables for debugging:

```env
DEBUG_ANTHROPIC_PROXY=true
DEBUG_CLERK_AUTH=true
```

## Security Notes

- Never expose your secret key in frontend code
- Use HTTPS in production
- Regularly rotate your Clerk keys
- Monitor authentication logs for suspicious activity
- Keep Clerk SDK updated to latest version

## Support

For Clerk-specific issues, check:
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Community](https://clerk.com/community)
- [Clerk Support](https://clerk.com/support)

For application-specific issues, check the main README.md file.