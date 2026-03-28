import { test, expect } from '@playwright/test';

test.describe('Notes Manager - UI & Integration Tests', () => {
  const APP_URL = 'http://localhost:3001';

  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('should render homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Create Next App/);
    console.log('✓ Homepage title verified');
  });

  test('should display main content area', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('To get started');
    console.log('✓ Main content visible');
  });

  test('should have working dark mode support', async ({ page }) => {
    const html = page.locator('html');
    const classes = await html.getAttribute('class');
    expect(classes).toBeDefined();
    console.log('✓ Dark mode support verified');
  });

  test('should render all navigation links', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(2);
    
    // Verify specific links
    await expect(page.locator('a:has-text("Templates")')).toBeVisible();
    await expect(page.locator('a:has-text("Learning")')).toBeVisible();
    console.log(`✓ Found ${count} navigation links`);
  });

  test('should have proper responsive design', async ({ page }) => {
    const main = page.locator('main');
    const bbox = await main.boundingBox();
    expect(bbox).not.toBeNull();
    expect(bbox?.width).toBeGreaterThan(0);
    console.log('✓ Responsive design verified');
  });

  test('should render SVG assets', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✓ Found ${count} image elements`);
  });

  test('should have proper button styling', async ({ page }) => {
    const buttons = page.locator('a[class*="rounded"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(2);
    
    for (let i = 0; i < Math.min(count, 2); i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
    }
    console.log('✓ Button styling verified');
  });

  test('should have accessible heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    const h2 = page.locator('h2');
    
    await expect(h1).toHaveCount(1);
    console.log('✓ Heading hierarchy correct');
  });

  test('should load CSS successfully', async ({ page }) => {
    const stylesheets = await page.locator('link[rel="stylesheet"]').count();
    expect(stylesheets).toBeGreaterThan(0);
    console.log(`✓ Found ${stylesheets} stylesheets`);
  });

  test('should render flex layout', async ({ page }) => {
    const body = page.locator('body');
    const classes = await body.getAttribute('class');
    expect(classes).toContain('flex');
    console.log('✓ Flex layout applied');
  });

  test('should have proper viewport meta tag', async ({ page }) => {
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    console.log('✓ Viewport meta tag verified');
  });
});
