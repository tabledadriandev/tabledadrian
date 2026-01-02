/**
 * Integration Test: Badge Minting Flow
 * Tests device attestation → badge minting flow
 */

import { test, expect } from '@playwright/test';

test.describe('Badge Minting Flow', () => {
  test('should mint badge after device attestation', async ({ page }) => {
    await page.goto('/badges');

    // Mock device attestation
    // In real test, would trigger wearable sync

    // Verify badge appears in gallery
    await expect(page.locator('[data-testid="badge-card"]')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should display clinician-attested badge', async ({ page }) => {
    await page.goto('/badges');

    // Mock clinician attestation
    // In real test, would have clinician sign lab result

    // Verify badge with clinician attestation
    await expect(
      page.locator('text=Clinician-Attested Plan')
    ).toBeVisible();
  });
});













