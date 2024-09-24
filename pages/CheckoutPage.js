// pages/CheckoutPage.js
class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
    }

    /**
     * Fills in the checkout information and proceeds.
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} postalCode
     */
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    /**
     * Checks if the checkout process is complete.
     * @returns {Promise<boolean>}
     */
    async isCheckoutComplete() {
        return await this.completeHeader.isVisible();
    }
}

module.exports = { CheckoutPage };
