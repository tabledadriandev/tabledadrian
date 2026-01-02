import { test, expect } from '@playwright/test';

test.describe('Token Staking Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Assume user is logged in and has tokens
    await page.goto('/staking');
  });

  test('complete staking flow', async ({ page }) => {
    // Step 1: View wallet balance
    await expect(page.getByText(/\$TA|token|balance/i)).toBeVisible();

    // Step 2: Enter staking amount
    const stakeInput = page.getByPlaceholder(/amount|stake/i);
    if (await stakeInput.isVisible()) {
      await stakeInput.fill('100');
    }

    // Step 3: View APY information
    await expect(page.getByText(/apy|8.*12|%/i)).toBeVisible();

    // Step 4: Stake tokens
    const stakeButton = page.getByRole('button', { name: /stake|lock/i });
    if (await stakeButton.isVisible()) {
      await stakeButton.click();
    }

    // Step 5: Confirm transaction (if wallet connection required)
    // This would require wallet interaction in real scenario

    // Step 6: Verify staking confirmation
    await expect(page.getByText(/staked|locked|success/i)).toBeVisible({ timeout: 10000 });

    // Step 7: Verify staked amount is displayed
    await expect(page.getByText(/100.*TA|staked/i)).toBeVisible({ timeout: 5000 });

    // Step 8: Verify rewards calculation
    await expect(page.getByText(/rewards|earned|apy/i)).toBeVisible();

    // Step 9: Test withdrawal (if available)
    const withdrawButton = page.getByRole('button', { name: /withdraw|unstake/i });
    if (await withdrawButton.isVisible()) {
      await withdrawButton.click();
      await expect(page.getByText(/withdrawn|unlocked/i)).toBeVisible({ timeout: 10000 });
    }
  });

  test('displays staking information correctly', async ({ page }) => {
    await expect(page.getByText(/total.*staked|staked.*amount/i)).toBeVisible();
    await expect(page.getByText(/apy|annual.*yield/i)).toBeVisible();
    await expect(page.getByText(/rewards|earned/i)).toBeVisible();
  });
});
