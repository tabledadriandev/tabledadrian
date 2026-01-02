/**
 * Integration Test: Merkle Root Submission Flow
 * Tests end-to-end flow: generate → submit → verify
 */

import { test, expect } from '@playwright/test';

test.describe('Merkle Proof Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/proof-of-health');
    // Add auth setup here
  });

  test('should generate weekly Merkle root', async ({ page }) => {
    // Navigate to proof-of-health page
    await page.goto('/proof-of-health');

    // Click generate button
    await page.click('text=Generate Weekly Merkle Root');

    // Wait for proof generation
    await expect(page.locator('text=Proof Generated')).toBeVisible({
      timeout: 10000,
    });

    // Verify Merkle root is displayed
    const rootElement = page.locator('[data-testid="merkle-root"]');
    await expect(rootElement).toBeVisible();
  });

  test('should submit Merkle root to blockchain', async ({ page }) => {
    // Generate proof first
    await page.goto('/proof-of-health');
    await page.click('text=Generate Weekly Merkle Root');
    await page.waitForSelector('text=Proof Generated');

    // Click submit button
    await page.click('text=Submit to Blockchain');

    // Verify transaction hash is displayed
    await expect(page.locator('text=Transaction')).toBeVisible({
      timeout: 30000,
    });
  });
});













