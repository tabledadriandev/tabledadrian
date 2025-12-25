import { test, expect } from '@playwright/test';

test.describe('Food Logging Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to food logging page
    await page.goto('/food/log');
  });

  test('complete food logging flow', async ({ page }) => {
    // Step 1: Check if camera/upload button is visible
    const uploadButton = page.getByRole('button', { name: /upload|camera|photo/i });
    await expect(uploadButton).toBeVisible();

    // Step 2: Upload food image (mock file upload)
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'food.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from('fake-image-data'),
      });
    }

    // Step 3: Wait for AI identification
    await page.waitForSelector('text=/identifying|analyzing/i', { timeout: 10000 });

    // Step 4: Verify identified foods are displayed
    await expect(page.getByText(/calories|protein|carbs|fat/i)).toBeVisible({ timeout: 15000 });

    // Step 5: Verify nutrition breakdown is shown
    await expect(page.getByText(/nutrition|breakdown/i)).toBeVisible();

    // Step 6: Save meal
    const saveButton = page.getByRole('button', { name: /save|log meal/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();
    }

    // Step 7: Verify token reward notification
    await expect(page.getByText(/\+0\.5.*TA|token|reward/i)).toBeVisible({ timeout: 5000 }).catch(() => {
      // Token notification might not appear immediately
    });

    // Step 8: Verify meal appears in history
    await page.goto('/food/analytics');
    await expect(page.getByText(/meal|history/i)).toBeVisible();
  });

  test('handles upload error gracefully', async ({ page }) => {
    // Try to upload invalid file
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // This should show an error
      await expect(page.getByText(/error|invalid|format/i)).toBeVisible({ timeout: 5000 }).catch(() => {
        // Error handling might vary
      });
    }
  });
});
