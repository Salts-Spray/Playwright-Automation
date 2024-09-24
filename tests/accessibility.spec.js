const { test, expect } = require('../axe-test'); // Import from the fixture
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo Accessibility Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('Accessibility Test: Inventory Page', async ({ page, makeAxeBuilder }, testInfo) => {
        // Analyze the entire inventory page for accessibility violations
        const accessibilityScanResults = await makeAxeBuilder().analyze();

        // Attach scan results for debugging purposes
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json',
        });

        // Assert that there are no accessibility violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Accessibility Test: Cart Page', async ({ page, makeAxeBuilder }, testInfo) => {
        // Add an item to cart and navigate to cart
        await inventoryPage.addProductsByIndices([0]);
        await inventoryPage.navigateToCart();
        await expect(page).toHaveURL(/cart\.html/);

        // Analyze the cart page for accessibility violations
        const accessibilityScanResults = await makeAxeBuilder().analyze();

        // Attach scan results for debugging purposes
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json',
        });

        // Assert that there are no accessibility violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Accessibility Test: Checkout Complete Page', async ({ page, makeAxeBuilder }, testInfo) => {
        // Add items, navigate to cart, and complete checkout
        await inventoryPage.addProductsByIndices([0, 1]);
        await inventoryPage.navigateToCart();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        // Fill checkout information
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

        // Finish checkout
        await checkoutPage.finishCheckout();
        await expect(page).toHaveURL(/checkout-complete\.html/);

        // Analyze the checkout complete page for accessibility violations
        const accessibilityScanResults = await makeAxeBuilder().analyze();

        // Attach scan results for debugging purposes
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json',
        });

        // Assert that there are no accessibility violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
