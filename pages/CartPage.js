// pages/CartPage.js
const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = 'xpath=/html/body/app-root/app-nav-bar/mat-toolbar/mat-toolbar-row/div[3]/button[2]/mat-icon';
    this.cartItemTitle = 'mat-card-title';
    this.checkoutButton = 'xpath=/html/body/app-root/div/app-shoppingcart/mat-card/mat-card-content[2]/td[6]/button/span[4]';
  }

  async openCart() {
    await this.page.click(this.cartIcon);
    await expect(this.page.locator(this.cartItemTitle)).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = { CartPage };
