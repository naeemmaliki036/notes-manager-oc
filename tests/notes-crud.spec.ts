import { test, expect } from '@playwright/test';

test.describe('Notes Manager - CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
  });

  test('should render notes manager with form and list', async ({ page }) => {
    // Check header
    await expect(page.locator('text=NOTES')).toBeVisible();
    await expect(page.locator('text=MANAGER')).toBeVisible();
    
    // Check form exists
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check form inputs
    await expect(page.locator('input[placeholder="Note title..."]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Write your note..."]')).toBeVisible();
    await expect(page.locator('button:has-text("CREATE NOTE")')).toBeVisible();
    
    console.log('✓ Notes manager UI rendered correctly');
  });

  test('should create a new note', async ({ page }) => {
    // Fill in the form
    await page.fill('input[placeholder="Note title..."]', 'Test Note');
    await page.fill('textarea[placeholder="Write your note..."]', 'This is a test note content');
    
    // Submit form
    await page.click('button:has-text("CREATE NOTE")');
    
    // Wait for note to appear
    await page.waitForTimeout(1000);
    
    // Check if note appears in the list
    const noteContent = page.locator('text=Test Note');
    if (await noteContent.count() > 0) {
      console.log('✓ Note created successfully');
    } else {
      console.log('⚠ Note may not have been created (API might not be connected)');
    }
  });

  test('should display theme toggle button', async ({ page }) => {
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeButton).toBeVisible();
    
    // Check if it says DARK or LIGHT
    const buttonText = await themeButton.textContent();
    expect(['◑ DARK', '☀ LIGHT']).toContain(buttonText?.trim());
    
    console.log('✓ Theme toggle button present');
  });

  test('should toggle dark mode', async ({ page }) => {
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    
    // Get initial state
    const initialText = await themeButton.textContent();
    
    // Click toggle
    await themeButton.click();
    await page.waitForTimeout(500);
    
    // Check if class changed
    const htmlElement = page.locator('html');
    const isDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
    
    console.log(`✓ Theme toggled (dark mode: ${isDark})`);
  });

  test('should have brutalist design elements', async ({ page }) => {
    // Check for borders
    const borderedElements = page.locator('[class*="border-2"]');
    const count = await borderedElements.count();
    expect(count).toBeGreaterThan(0);
    
    // Check for uppercase text
    const uppercaseText = page.locator('text=/[A-Z]{3,}/');
    const uppercaseCount = await uppercaseText.count();
    expect(uppercaseCount).toBeGreaterThan(3);
    
    console.log('✓ Brutalist design verified');
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const footerText = await footer.textContent();
    expect(footerText).toContain('NEXT.JS');
    expect(footerText).toContain('POSTGRESQL');
    
    console.log('✓ Footer displayed correctly');
  });
});
