// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 2,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    expect: {
        toHaveScreenshot: {
            threshold: 0.05, // 5% tolerance
            // stylePath: './tests/screenshot.css', // Optional: apply custom styles
        },
    },
});
