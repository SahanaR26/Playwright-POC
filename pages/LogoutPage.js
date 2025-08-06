// pages/LogoutPage.js
class LogoutPage {
  constructor(page) {
    this.page = page;
    this.userMenu = 'xpath=/html/body/app-root/app-nav-bar/mat-toolbar/mat-toolbar-row/div[3]/a[1]/span[2]/span';
  }

  async logout() {
    await this.page.click(this.userMenu);
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
}

module.exports = { LogoutPage };
