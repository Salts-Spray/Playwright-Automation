// tests/functional.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo Functional Tests', () => {
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

    test('Verify the sorting order displayed for Z-A on the “All Items” page', async ({ page }) => {
        await inventoryPage.sortProducts('za'); // Value for Z to A

        const productNames = await inventoryPage.getProductNames();
        const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(productNames).toEqual(sortedNames);
    });

    test('Verify the price order (high-low) displayed on the “All Items” page', async ({ page }) => {
        await inventoryPage.sortProducts('hilo'); // Value for High to Low

        const productPrices = await inventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sortedPrices);
    });

    test('Add multiple items to the cart and validate the checkout journey', async ({ page }) => {
        // Add first and second products to the cart
        await inventoryPage.addProductsByIndices([0, 1]);

        // Navigate to cart
        await inventoryPage.navigateToCart();
        await expect(page).toHaveURL(/cart\.html/);

        // Proceed to checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        // Fill checkout information
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

        // Finish checkout
        await checkoutPage.finishCheckout();
        await expect(page).toHaveURL(/checkout-complete\.html/);
        const isComplete = await checkoutPage.isCheckoutComplete();
        expect(isComplete).toBeTruthy();
    });
});
