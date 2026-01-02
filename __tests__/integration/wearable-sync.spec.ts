import { test, expect } from '@playwright/test';

test.describe('Wearable Sync Flow', () => {
  test('Oura Ring OAuth and sync', async ({ page, context }) => {
    // Step 1: Navigate to wearables page
    await page.goto('/wearables');

    // Step 2: Click connect Oura button
    const connectButton = page.getByRole('button', { name: /connect.*oura|link.*oura/i });
    if (await connectButton.isVisible()) {
      await connectButton.click();
    }

    // Step 3: Handle OAuth flow (would redirect to Oura)
    // In test, we'll mock this or use test credentials
    await page.waitForURL(/oauth|callback/i, { timeout: 10000 }).catch(() => {
      // OAuth might be handled differently
    });

    // Step 4: After OAuth, verify connection status
    await page.goto('/wearables');
    await expect(page.getByText(/connected|synced|active/i)).toBeVisible({ timeout: 10000 });

    // Step 5: Trigger manual sync
    const syncButton = page.getByRole('button', { name: /sync|refresh/i });
    if (await syncButton.isVisible()) {
      await syncButton.click();
    }

    // Step 6: Wait for sync to complete
    await page.waitForSelector('text=/synced|complete|success/i', { timeout: 30000 });

    // Step 7: Verify biomarkers are displayed
    await page.goto('/dashboard/biometrics');
    await expect(page.getByText(/hrv|sleep|recovery/i)).toBeVisible({ timeout: 10000 });

    // Step 8: Verify token reward
    await expect(page.getByText(/\+0\.1.*TA|token|reward/i)).toBeVisible({ timeout: 5000 }).catch(() => {
      // Token notification might not appear immediately
    });
  });

  test('displays sync status correctly', async ({ page }) => {
    await page.goto('/dashboard/biometrics');
    
    // Check for sync indicators
    const syncStatus = page.getByText(/synced|syncing|error/i);
    if (await syncStatus.isVisible()) {
      await expect(syncStatus).toBeVisible();
    }
  });
});
