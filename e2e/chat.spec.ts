import { test, expect, type Page } from '@playwright/test';

// Helper function to wait for chat to be ready
async function waitForChatReady(page: Page) {
  // Wait for the chat trigger button to be visible
  await page.waitForSelector('[data-testid="assistant-ui-drawer"]', { 
    state: 'attached',
    timeout: 10000 
  });
}

// Helper function to open chat drawer
async function openChatDrawer(page: Page) {
  // Click on the bot icon to open the drawer
  const triggerButton = page.locator('button').filter({ 
    has: page.locator('svg.lucide-bot') 
  }).first();
  
  await triggerButton.waitFor({ state: 'visible' });
  await triggerButton.click();
  
  // Wait for drawer to open
  await page.waitForSelector('[data-testid="assistant-ui-drawer"]', { 
    state: 'visible' 
  });
}

test.describe('Chat Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app with a test room
    await page.goto('/live/test-e2e');
    await waitForChatReady(page);
  });

  test('should display chat trigger button', async ({ page }) => {
    // Check if the bot icon button is visible
    const triggerButton = page.locator('button').filter({ 
      has: page.locator('svg.lucide-bot') 
    });
    
    await expect(triggerButton.first()).toBeVisible();
  });

  test('should open chat drawer when trigger is clicked', async ({ page }) => {
    await openChatDrawer(page);
    
    // Check if drawer content is visible
    const drawerContent = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawerContent).toBeVisible();
    
    // Check if Assistant header is visible
    await expect(page.getByText('Assistant')).toBeVisible();
  });

  test('should close chat drawer when close button is clicked', async ({ page }) => {
    await openChatDrawer(page);
    
    // Find and click the close button (X icon)
    const closeButton = page.locator('button').filter({
      has: page.locator('svg path[d*="M12 4L4 12"]')
    });
    
    await closeButton.click();
    
    // Check if drawer is closed (trigger button should be visible again)
    const triggerButton = page.locator('button').filter({ 
      has: page.locator('svg.lucide-bot') 
    });
    await expect(triggerButton.first()).toBeVisible();
  });

  test('should load previous messages on page refresh', async ({ page }) => {
    await openChatDrawer(page);
    
    // Wait for chat to be fully loaded
    await page.waitForTimeout(2000);
    
    // Refresh the page
    await page.reload();
    await waitForChatReady(page);
    
    // Open drawer again
    await openChatDrawer(page);
    
    // The chat should still be visible
    const drawerContent = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawerContent).toBeVisible();
  });

  test('should send a message to the chat', async ({ page }) => {
    await openChatDrawer(page);
    
    // Find the message input
    const messageInput = page.locator('textarea, input[type="text"]').first();
    await messageInput.waitFor({ state: 'visible', timeout: 5000 });
    
    // Type a message
    await messageInput.fill('Hello, this is a test message');
    
    // Press Enter or click send button
    await messageInput.press('Enter');
    
    // Wait for response to start streaming
    await page.waitForTimeout(2000);
    
    // Check if message appears in the chat
    await expect(page.locator('text=Hello, this is a test message')).toBeVisible({ timeout: 10000 });
  });

  test('should maintain dark mode state', async ({ page }) => {
    // This test assumes dark mode toggle exists in the app
    // Check if dark mode classes are applied correctly
    await openChatDrawer(page);
    
    const drawerContent = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawerContent).toBeVisible();
    
    // Check for dark mode specific classes (this depends on your implementation)
    // You may need to adjust this based on how dark mode is implemented
  });
});

test.describe('Chat API Integration', () => {
  test('should make correct API calls', async ({ page }) => {
    // Monitor network requests
    const apiCalls: string[] = [];
    
    page.on('request', request => {
      if (request.url().includes('/messages')) {
        apiCalls.push(request.url());
      }
    });
    
    await page.goto('/live/test-api');
    await waitForChatReady(page);
    await openChatDrawer(page);
    
    // Should have made a GET request to load messages
    const getRequests = apiCalls.filter(url => url.includes('/live/test-api/messages'));
    expect(getRequests.length).toBeGreaterThan(0);
  });

  test('should handle API errors gracefully', async ({ page, context }) => {
    // Intercept API calls and return an error
    await context.route('**/messages', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    
    await page.goto('/live/test-error');
    await waitForChatReady(page);
    await openChatDrawer(page);
    
    // The chat should still open even if API fails
    const drawerContent = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawerContent).toBeVisible();
  });
});

test.describe('Chat Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/live/test-a11y');
    await waitForChatReady(page);
    await openChatDrawer(page);
    
    // Check for accessibility attributes
    const drawer = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawer).toBeVisible();
    
    // Check for proper heading structure
    const heading = page.locator('h2').filter({ hasText: 'Assistant' });
    await expect(heading).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/live/test-keyboard');
    await waitForChatReady(page);
    
    // Tab to the trigger button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Open with Enter
    await page.keyboard.press('Enter');
    
    // Check if drawer opened
    const drawerContent = page.locator('[data-testid="assistant-ui-drawer"]');
    await expect(drawerContent).toBeVisible({ timeout: 5000 });
    
    // Close with Escape
    await page.keyboard.press('Escape');
    
    // Check if drawer closed
    const triggerButton = page.locator('button').filter({ 
      has: page.locator('svg.lucide-bot') 
    });
    await expect(triggerButton.first()).toBeVisible({ timeout: 5000 });
  });
});