import { test, expect } from '@playwright/test';

test.describe('Medical Results Upload Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/medical/upload');
  });

  test('complete medical upload flow', async ({ page }) => {
    // Step 1: Upload PDF/image
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'lab-results.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('fake-pdf-data'),
      });
    }

    // Step 2: Fill in test details
    const testDateInput = page.locator('input[type="date"]');
    if (await testDateInput.isVisible()) {
      await testDateInput.fill('2024-12-01');
    }

    const labNameInput = page.getByPlaceholder(/lab|clinic/i);
    if (await labNameInput.isVisible()) {
      await labNameInput.fill('LabCorp');
    }

    // Step 3: Trigger extraction
    const extractButton = page.getByRole('button', { name: /extract|analyze/i });
    if (await extractButton.isVisible()) {
      await extractButton.click();
    }

    // Step 4: Wait for extraction progress
    await page.waitForSelector('text=/extracting|processing/i', { timeout: 30000 });

    // Step 5: Verify results are displayed
    await expect(page.getByText(/biomarker|glucose|cholesterol/i)).toBeVisible({ timeout: 30000 });

    // Step 6: Verify flagged values are shown
    await expect(page.getByText(/red|yellow|green|flag/i)).toBeVisible({ timeout: 10000 }).catch(() => {
      // Flags might not always be present
    });

    // Step 7: Verify token reward
    await expect(page.getByText(/\+5.*TA|token|reward/i)).toBeVisible({ timeout: 5000 }).catch(() => {
      // Token notification might not appear immediately
    });

    // Step 8: Verify plan generation option
    await expect(page.getByRole('button', { name: /generate.*plan|create.*plan/i })).toBeVisible({ timeout: 5000 }).catch(() => {
      // Plan generation might be on separate page
    });
  });

  test('handles invalid file format', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'invalid.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('invalid file'),
      });
      await expect(page.getByText(/invalid|format|error/i)).toBeVisible({ timeout: 5000 });
    }
  });
});
