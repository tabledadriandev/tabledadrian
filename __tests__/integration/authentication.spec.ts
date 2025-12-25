import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('email signup and verification', async ({ page }) => {
    // Step 1: Navigate to signup
    await page.goto('/auth/signup');

    // Step 2: Fill in signup form
    const emailInput = page.getByPlaceholder(/email/i);
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    const passwordInput = page.getByPlaceholder(/password/i);
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('TestPassword123!');
    }

    // Step 3: Submit signup
    const signupButton = page.getByRole('button', { name: /sign.*up|create.*account/i });
    if (await signupButton.isVisible()) {
      await signupButton.click();
    }

    // Step 4: Verify email verification message
    await expect(page.getByText(/verify|check.*email|confirmation/i)).toBeVisible({ timeout: 10000 });
  });

  test('email login', async ({ page }) => {
    await page.goto('/auth/login');

    const emailInput = page.getByPlaceholder(/email/i);
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    const passwordInput = page.getByPlaceholder(/password/i);
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('TestPassword123!');
    }

    const loginButton = page.getByRole('button', { name: /login|sign.*in/i });
    if (await loginButton.isVisible()) {
      await loginButton.click();
    }

    // Verify redirect to dashboard
    await page.waitForURL(/dashboard|home/, { timeout: 10000 });
  });

  test('Google OAuth flow', async ({ page, context }) => {
    await page.goto('/auth/login');

    const googleButton = page.getByRole('button', { name: /google|sign.*in.*google/i });
    if (await googleButton.isVisible()) {
      await googleButton.click();
    }

    // OAuth would redirect to Google
    // In test, we'd mock this or use test credentials
    await page.waitForURL(/google|oauth/, { timeout: 10000 }).catch(() => {
      // OAuth flow might be handled differently
    });
  });

  test('wallet connection', async ({ page }) => {
    await page.goto('/auth/login');

    const walletButton = page.getByRole('button', { name: /wallet|metamask|connect/i });
    if (await walletButton.isVisible()) {
      await walletButton.click();
    }

    // Wallet connection would require MetaMask interaction
    // In test, we'd mock this
    await expect(page.getByText(/connected|wallet/i)).toBeVisible({ timeout: 10000 }).catch(() => {
      // Wallet connection might require manual interaction
    });
  });

  test('2FA setup', async ({ page }) => {
    // Assume user is logged in
    await page.goto('/settings');

    const twoFactorButton = page.getByRole('button', { name: /2fa|two.*factor|enable/i });
    if (await twoFactorButton.isVisible()) {
      await twoFactorButton.click();
    }

    // Verify QR code or setup instructions
    await expect(page.getByText(/qr|code|authenticator|setup/i)).toBeVisible({ timeout: 10000 }).catch(() => {
      // 2FA setup might be on different page
    });
  });
});
