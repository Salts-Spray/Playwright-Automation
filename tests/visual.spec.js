const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo Visual Tests', () => {
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
        await loginPage.login('standard_user', 'secret_sauce'); // Using a standard test user
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('Visual Test: Inventory Page', async ({ page, browserName }) => {
        // Take a screenshot with a threshold
        await expect(page).toHaveScreenshot(`inventory-page-${browserName}.png`);
    });

    test('Visual Test: Cart Page', async ({ page, browserName }) => {
        // Add an item to cart and navigate to cart
        await inventoryPage.addProductsByIndices([0]);
        await inventoryPage.navigateToCart();
        await expect(page).toHaveURL(/cart\.html/);

        // Take a screenshot with a threshold
        await expect(page).toHaveScreenshot(`cart-page-${browserName}.png`);
    });

    test('Visual Test: Checkout Complete Page', async ({ page, browserName }) => {
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

        // Take a screenshot with a threshold
        await expect(page).toHaveScreenshot(`checkout-complete-page-${browserName}.png`);
    });
});
