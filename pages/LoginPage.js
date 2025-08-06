
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = 'button:has-text("Login")';
    this.usernameField = 'input[formcontrolname="username"]';
    this.passwordField = 'input[formcontrolname="password"]';
    this.submitButton = this.page.locator('mat-card-actions').getByRole('button', { name: 'Login' });
    this.loggedInUser = 'xpath=/html/body/app-root/app-nav-bar/mat-toolbar/mat-toolbar-row/div[3]/a[1]/span[2]/span';
  }

  async goto() {
    await this.page.goto('https://bookcart.azurewebsites.net/', { timeout: 60000 });
  }

  /**
   * Login with username and password
   * @param {string} username 
   * @param {string} password 
   */
  async login(username, password) {
    console.log(`Logging in as ${username}`);
    await this.page.click(this.loginButton);
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();

    // ✅ No assertion here - control goes back to test file to verify login
  }
}

module.exports = { LoginPage };
