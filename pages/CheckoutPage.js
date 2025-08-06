// pages/CheckoutPage.js
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.nameField = 'input[formcontrolname="name"]';
    this.address1Field = 'input[formcontrolname="addressLine1"]';
    this.address2Field = 'input[formcontrolname="addressLine2"]';
    this.pincodeField = 'input[formcontrolname="pincode"]';
    this.stateField = 'input[formcontrolname="state"]';
    this.finalCheckoutButton = 'xpath=/html/body/app-root/div/app-checkout/mat-card/mat-card-content/div/div[1]/mat-card-content/form/mat-card-actions/button[1]';
  }

  async fillForm(name, address1, address2, pincode, state) {
    await this.page.fill(this.nameField, name);
    await this.page.fill(this.address1Field, address1);
    await this.page.fill(this.address2Field, address2);
    await this.page.fill(this.pincodeField, pincode);
    await this.page.fill(this.stateField, state);
  }

  async placeOrder() {
    await this.page.click(this.finalCheckoutButton);
    console.log('Order placed successfully after filling the form!');
  }
}

module.exports = { CheckoutPage };
