
// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pages/LoginPage');
// const { FictionPage } = require('../pages/FictionPage');
// const { CartPage } = require('../pages/CartPage');
// const { CheckoutPage } = require('../pages/CheckoutPage');
// const { LogoutPage } = require('../pages/LogoutPage');
// const { checkoutDetails } = require('../utils/testdata.js');
// const { readExcelData } = require('../utils/excelReader.js');
// const path = require('path');

// // ✅ Read login credentials from Excel
// const excelPath = path.resolve(__dirname, '../utils/loginData.xlsx');
// const credentials = readExcelData(excelPath, 'Sheet1');

// test.describe('BookCart E2E Flow - Login from Excel', () => {
//   credentials.forEach((user) => {
//     test(`BookCart E2E test for user: ${user.username}`, async ({ page }) => {
//       const loginPage = new LoginPage(page);
//       const fictionPage = new FictionPage(page);
//       const cartPage = new CartPage(page);
//       const checkoutPage = new CheckoutPage(page);
//       const logoutPage = new LogoutPage(page);

//       console.log(`Starting BookCart E2E for ${user.username}`);

//       // Step 1: Open website
//       await loginPage.goto();
//       await loginPage.login(user.username, user.password);

      
//       let isLoggedIn = false;

// try {
//   const isLoggedIn = await page.locator(loginPage.loggedInUser).isVisible({ timeout: 5000 });

//   if (user.expected === 'success') {
//     console.log(`Login successful for ${user.username}`);
//   } else {
//     throw new Error(`Login should have failed for ${user.username}, but it succeeded.`);
//   }

// } catch (e) {
//   if (user.expected === 'failure') {
//     console.log(`Login correctly failed for ${user.username}`);
//     return;
//   } else {
//     throw new Error(`Login should have succeeded for ${user.username}, but it failed.`);
//   }
// }


//       // Step 3: Select Fiction Book
//       await fictionPage.selectFictionBook();
//       await fictionPage.addToCart();

//       // Step 4: Go to Cart
//       await cartPage.openCart();
//       await cartPage.proceedToCheckout();

//       // Step 5: Fill Checkout Form (from testdata.js)
//       await checkoutPage.fillForm(
//         checkoutDetails.name,
//         checkoutDetails.addressLine1,
//         checkoutDetails.addressLine2,
//         checkoutDetails.pincode,
//         checkoutDetails.state
//       );

//       // Step 6: Place order
//       await checkoutPage.placeOrder();

//       // Step 7: Logout
//       await logoutPage.logout();

//       console.log(`Completed BookCart E2E for ${user.username}`);
//     });
//   });
// });



// tests/bookcartE2E.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { FictionPage } = require('../pages/FictionPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { LogoutPage } = require('../pages/LogoutPage');
const { checkoutDetails } = require('../utils/testdata.js');
const { readExcelData } = require('../utils/excelReader.js');
const path = require('path');

// ✅ Move Excel reading logic inside test.describe block
test.describe('BookCart E2E Flow - Login from Excel', () => {
  const excelPath = path.resolve(__dirname, '../utils/loginData.xlsx');
  const credentials = readExcelData(excelPath, 'Sheet1');

  for (const user of credentials) {
    test(`BookCart E2E test for user: ${user.username}`, async ({ page }) => {
      test.setTimeout(60000);
      const loginPage = new LoginPage(page);
      const fictionPage = new FictionPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const logoutPage = new LogoutPage(page);

      console.log(`Starting BookCart E2E for ${user.username}`);

      // Step 1: Open website and login
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      try {
        const isVisible = await page.locator(loginPage.loggedInUser).isVisible({ timeout: 5000 });

        if (user.expected === 'success') {
          console.log(`Login successful for ${user.username}`);
        } else {
          throw new Error(`Login should have failed for ${user.username}, but it succeeded.`);
        }
      } catch (e) {
        if (user.expected === 'failure') {
          console.log(`Login correctly failed for ${user.username}`);
          return; // End test early if login fails as expected
        } else {
          throw new Error(`Login should have succeeded for ${user.username}, but it failed.`);
        }
      }

      // Step 2: Select Fiction Book
      await fictionPage.selectFictionBook();
      await fictionPage.addToCart();

      // Step 3: Go to Cart
      await cartPage.openCart();
      await cartPage.proceedToCheckout();

      // Step 4: Fill Checkout Form
      await checkoutPage.fillForm(
        checkoutDetails.name,
        checkoutDetails.addressLine1,
        checkoutDetails.addressLine2,
        checkoutDetails.pincode,
        checkoutDetails.state
      );

      // Step 5: Place Order
      await checkoutPage.placeOrder();

      // Step 6: Logout
      await logoutPage.logout();

      console.log(`Completed BookCart E2E for ${user.username}`);
    });
  }
});
