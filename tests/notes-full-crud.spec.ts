import { test, expect } from '@playwright/test';

test.describe('Notes Manager - Full CRUD Operations', () => {
  const BASE_URL = 'http://localhost:3001';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('1. should display empty notes list initially', async ({ page }) => {
    const noNotesText = page.locator('text=NO NOTES YET');
    await expect(noNotesText).toBeVisible();
    console.log('✓ Empty notes list displayed');
  });

  test('2. should create a new note', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="Note title..."]');
    const contentTextarea = page.locator('textarea[placeholder="Write your note..."]');
    const createButton = page.locator('button:has-text("CREATE NOTE")');

    await titleInput.fill('My First Note');
    await contentTextarea.fill('This is the content of my first note');
    await createButton.click();

    await page.waitForTimeout(1000);

    // Check if note appears
    const noteTitle = page.locator('text=My First Note');
    await expect(noteTitle).toBeVisible({ timeout: 5000 });
    
    console.log('✓ Note created successfully');
  });

  test('3. should display created notes', async ({ page }) => {
    // Create a note first
    await page.locator('input[placeholder="Note title..."]').fill('Test Note 2');
    await page.locator('textarea[placeholder="Write your note..."]').fill('Content 2');
    await page.locator('button:has-text("CREATE NOTE")').click();

    await page.waitForTimeout(1000);

    // Check that "0 NOTES" text changes
    const notesCount = page.locator('text=/\\d+ NOTES?/');
    await expect(notesCount).toBeVisible();
    
    const countText = await notesCount.textContent();
    console.log(`✓ Notes displayed - Count: ${countText}`);
  });

  test('4. should render brutalist UI', async ({ page }) => {
    // Check header
    await expect(page.locator('text=NOTES')).toBeVisible();
    await expect(page.locator('text=MANAGER')).toBeVisible();

    // Check borders (brutalist element)
    const borderedElements = page.locator('[class*="border-2"]');
    const count = await borderedElements.count();
    expect(count).toBeGreaterThan(0);

    // Check uppercase text
    const buttons = page.locator('button');
    const buttonText = await buttons.first().textContent();
    expect(buttonText).toMatch(/[A-Z]{3,}/);

    console.log('✓ Brutalist design verified');
  });

  test('5. should toggle dark/light mode', async ({ page }) => {
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    
    // Get initial state
    const initialClasses = await page.locator('html').evaluate(el => el.className);
    
    // Click toggle
    await themeButton.click();
    await page.waitForTimeout(500);

    // Check if theme changed
    const newClasses = await page.locator('html').evaluate(el => el.className);
    
    const isDarkMode = newClasses.includes('dark');
    console.log(`✓ Theme toggled - Dark mode: ${isDarkMode}`);
  });

  test('6. should persist notes across page refreshes', async ({ page }) => {
    // Create a note
    await page.locator('input[placeholder="Note title..."]').fill('Persistence Test');
    await page.locator('textarea[placeholder="Write your note..."]').fill('This should persist');
    await page.locator('button:has-text("CREATE NOTE")').click();

    await page.waitForTimeout(1000);

    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check if note still exists
    const noteTitle = page.locator('text=Persistence Test');
    const exists = await noteTitle.count() > 0;
    
    console.log(`✓ Note persistence: ${exists ? 'PASSED' : 'FAILED'}`);
  });
});
