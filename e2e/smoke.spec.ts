import { test, expect } from '@playwright/test';

test.describe('Smoke Tests @smoke', () => {
  test('app loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main app container exists
    await expect(page.locator('body')).toBeVisible();
    
    // Check for the Monaco editor
    await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 10000 });
  });

  test('chat assistant is available @smoke', async ({ page }) => {
    await page.goto('/live/smoke-test');
    
    // Wait for the chat trigger button to be available
    const chatTrigger = page.locator('button').filter({ 
      has: page.locator('svg.lucide-bot') 
    }).first();
    
    await expect(chatTrigger).toBeVisible({ timeout: 10000 });
    
    // Click to open the chat
    await chatTrigger.click();
    
    // Verify chat drawer opens
    await expect(page.locator('[data-testid="assistant-ui-drawer"]')).toBeVisible({ timeout: 5000 });
    
    // Verify Assistant header is visible
    await expect(page.getByText('Assistant')).toBeVisible();
  });

  test('basic editor functionality works @smoke', async ({ page }) => {
    await page.goto('/live/editor-smoke');
    
    // Wait for Monaco editor to load
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    
    // Get the editor instance
    const editor = page.locator('.monaco-editor .view-lines');
    
    // Click on the editor to focus
    await editor.click();
    
    // Type some basic code
    await page.keyboard.type('console.log("Hello World");');
    
    // Verify the text appears in the editor
    await expect(page.locator('.view-line').first()).toContainText('console.log');
  });

  test('API endpoints respond correctly @smoke', async ({ page }) => {
    // Test that the messages endpoint is accessible
    const response = await page.request.get('/live/smoke-api-test/messages');
    
    // Should either return 200 with messages or 404 if room doesn't exist yet
    expect([200, 404]).toContain(response.status());
    
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('messages');
      expect(Array.isArray(data.messages)).toBe(true);
    }
  });

  test('dark mode toggle works @smoke', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    
    // Check initial theme
    const htmlElement = page.locator('html');
    const initialHasDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
    
    // Look for theme toggle button (if it exists)
    const themeToggle = page.locator('button').filter({ 
      has: page.locator('svg.lucide-sun, svg.lucide-moon') 
    }).first();
    
    if (await themeToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Click theme toggle
      await themeToggle.click();
      
      // Check that theme changed
      const afterToggleHasDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
      expect(afterToggleHasDark).not.toBe(initialHasDark);
    }
  });

  test('page navigation works @smoke', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    
    // Navigate to a live room
    await page.goto('/live/nav-test');
    
    // Should still have Monaco editor
    await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 10000 });
    
    // URL should have changed
    expect(page.url()).toContain('/live/nav-test');
  });

  test('websocket connection establishes @smoke', async ({ page }) => {
    // Monitor websocket connections
    let wsConnected = false;
    
    page.on('websocket', ws => {
      wsConnected = true;
      
      ws.on('framereceived', _frame => {
        // Log that we received data
        console.log('WebSocket frame received');
      });
    });
    
    await page.goto('/live/ws-test');
    
    // Wait a bit for WebSocket to connect
    await page.waitForTimeout(2000);
    
    // Check that WebSocket connection was established
    expect(wsConnected).toBe(true);
  });
});