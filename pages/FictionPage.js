// pages/FictionPage.js
class FictionPage {
  constructor(page) {
    this.page = page;
    this.fictionCategory = 'xpath=/html/body/app-root/div/app-home/div/div[1]/div/app-book-filter/mat-list/mat-list-item[3]';
    this.firstBook = 'xpath=/html/body/app-root/div/app-home/div/div[2]/div/div[1]/app-book-card/mat-card/mat-card-content/div/a/strong';
    this.addToCartButton = 'xpath=/html/body/app-root/div/app-book-details/mat-card/mat-card-content/div[2]/div/app-addtocart/button/span[3]';
  }

  async selectFictionBook() {
    await this.page.click(this.fictionCategory);
    await this.page.click(this.firstBook);
    
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }
}

module.exports = { FictionPage };
