/**
 * E2E Test: Complete Proof-of-Health User Journey
 */

import { test, expect } from '@playwright/test';

test.describe('Proof-of-Health User Journey', () => {
  test('complete flow: log biomarkers → generate proof → mint badge', async ({
    page,
  }) => {
    // 1. User logs biomarkers (via wearable sync)
    await page.goto('/dashboard');
    // Mock wearable sync...

    // 2. Generate weekly Merkle root
    await page.goto('/proof-of-health');
    await page.click('text=Generate Weekly Merkle Root');
    await expect(page.locator('text=Proof Generated')).toBeVisible();

    // 3. Submit to blockchain
    await page.click('text=Submit to Blockchain');
    await expect(page.locator('text=Transaction')).toBeVisible();

    // 4. Verify badge appears
    await page.goto('/badges');
    await expect(page.locator('[data-testid="badge-card"]')).toBeVisible();
  });

  test('protocol commitment → streak tracking → badge unlock', async ({
    page,
  }) => {
    // 1. Create daily commitment
    await page.goto('/protocols/commitment');
    await page.fill('textarea', 'meditation, cold plunge');
    await page.click('text=Commit to Protocol');

    // 2. Reveal commitment
    await page.click('text=Reveal Commitment');
    await expect(page.locator('text=Commitment revealed')).toBeVisible();

    // 3. Check streak
    await expect(page.locator('text=Current Streak')).toBeVisible();

    // 4. After 30 days, badge should unlock
    // (Would need to mock time progression)
  });
});













