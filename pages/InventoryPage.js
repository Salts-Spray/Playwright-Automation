class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.productSortDropdown = page.locator('.product_sort_container');
        this.products = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('button.btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    /**
     * Selects a sorting option from the dropdown.
     * @param {string} option - The value attribute of the sorting option.
     */
    async sortProducts(option) {
        await this.productSortDropdown.selectOption(option);
    }

    /**
     * Retrieves all product names on the inventory page.
     * @returns {Promise<string[]>}
     */
    async getProductNames() {
        return await this.products.locator('.inventory_item_name').allTextContents();
    }

    /**
     * Retrieves all product prices on the inventory page.
     * @returns {Promise<number[]>}
     */
    async getProductPrices() {
        const pricesText = await this.products.locator('.inventory_item_price').allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    /**
     * Adds products to the cart based on their indices.
     * @param {number[]} indices - Array of product indices to add.
     */
    async addProductsByIndices(indices) {
        for (const index of indices) {
            await this.addToCartButtons.nth(index).click();
        }
    }

    async navigateToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { InventoryPage };
