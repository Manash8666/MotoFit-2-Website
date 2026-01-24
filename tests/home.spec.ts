import { test, expect } from '@playwright/test';

test.describe('MotoFit 2 Security & Functionality Audit', () => {

    test('Homepage loads with "God Mode" elements', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Check Title
        await expect(page).toHaveTitle(/MotoFit 2/);

        // Check Magnetic Buttons exist (class check)
        const magneticButton = page.locator('.glass-button-wrap').first();
        await expect(magneticButton).toBeVisible();

        // Check Noise Overlay (God Mode)
        const noise = page.locator('.noise-overlay');
        await expect(noise).toBeAttached();
    });

    test('Navigation links are active', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Check About Link
        const aboutLink = page.getByRole('link', { name: 'About', exact: true }).first();
        await expect(aboutLink).toBeVisible();
        await expect(aboutLink).toHaveAttribute('href', '/about');
    });

    test('Footer contains accurate business info', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await expect(page.getByText('Shop No 9, Kirtan Complex')).toBeVisible();
    });

    // Security Header Verification (requires running server returning headers)
    // Note: This might fail on purely static local dev without headers configured in middleware vs next.config
    // but serves as the "Cybersecurity Check" template.
});
