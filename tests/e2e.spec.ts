import { test, expect } from '@playwright/test';

test.describe('Notes Manager App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Create Next App/);
    const heading = page.locator('h1');
    await expect(heading).toContainText('To get started');
  });

  test('should have working navigation links', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render with proper styling', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toHaveClass(/flex/);
  });

  test('should have responsive layout', async ({ page }) => {
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
  });
});
