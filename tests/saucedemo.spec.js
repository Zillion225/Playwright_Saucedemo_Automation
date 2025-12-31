import { test, expect } from '@playwright/test';
import { CommonUtility } from '../utility/commonUtility.js'
import { SDCommonPO } from '../pageObject/saucedemo/saucedemo_common.po.js';
import { SDLoginPO } from '../pageObject/saucedemo/saucedemo_login.po.js';
import { SDInventoryPO } from '../pageObject/saucedemo/saucedemo_inventory.po.js';
import { SDCartPO } from '../pageObject/saucedemo/saucedemo_cart.po.js';
import { SDCheckoutPO } from '../pageObject/saucedemo/saucedemo_checkout.po.js';
import { SDCheckoutOverviewPO } from '../pageObject/saucedemo/saucedemo_checkoutOverview.po.js';
import { SDCompletePagePO } from '../pageObject/saucedemo/saucedemo_complete.po.js';
var { testdata } = CommonUtility.loadYamlData('data/testData/saucedemo_testdata.yaml');

test('Ensure all user on credentials panel can login (Except lock user)', async ({ page }) => {
  let loginPO = new SDLoginPO(page);
  const exceptionUser = ['locked_out_user'];

  await test.step('Visit website', async () => {
    await loginPO.goto();
  });
  // get all user on login_credentials panel
  let allUsers = [];
  let allPassword = [];
  await test.step('Retrieve username and password that display on screen.', async () => {
    allUsers = await loginPO.getAllUsers();
    allPassword = await loginPO.getPassword();
  });

  for (let user of allUsers) {
    if (exceptionUser.indexOf(user) > -1)
      continue;
    const userObj = {
      username: user,
      password: allPassword[0]
    }
    await test.step(`Login with username: ${user}.`, async () => {
      await loginPO.login(userObj);
    });

    await test.step(`Check is on inventory page.`, async () => {
      await expect(page.url()).toContain('/inventory.html')
    });

    await test.step(`Go back to login page.`, async () => {
      await loginPO.goto();
    });
  }
});

test('Check lock_user', async ({ page }) => {
  let loginPO = new SDLoginPO(page);
  const lockUser = testdata['users']['lockUser'];
  const lockUsername = lockUser['username']

  await test.step('Visit website.', async () => {
    await loginPO.goto();
  });

  await test.step(`Login with username: ${lockUsername}.`, async () => {
    await loginPO.login(lockUser);
  });

  await test.step(`Expect error message is display correctly.`, async () => {
    await expect(await loginPO.getErrorMessage()).toContain(lockUser['error_message']);
  });
});

const usersToTest = [
  { type: 'standardUser', data: testdata['users']['standardUser'] },
  { type: 'performanceGlitchUser', data: testdata['users']['performanceGlitchUser'] },
  { type: 'visualUser', data: testdata['users']['visualUser'] },
  { type: 'problemUser', data: testdata['users']['problemUser'] },
  { type: 'errorUser', data: testdata['users']['errorUser'] }
];

test.describe('Complete checkout', () => {
  for (const userEntry of usersToTest) {
    test(`Complete Checkout with '${userEntry.type}'`, async ({ page }) => {
      const loginPO = new SDLoginPO(page);
      const inventoryPO = new SDInventoryPO(page);
      const commonPO = new SDCommonPO(page);
      const cartPO = new SDCartPO(page);
      const checkoutPO = new SDCheckoutPO(page);
      const overviewPO = new SDCheckoutOverviewPO(page);
      const completePO = new SDCompletePagePO(page);
      const addProducts = testdata['testSelectItem']['group1'];
      const checkoutInfo = testdata['checkoutInfo']['info1'];
      const user = userEntry['data'];

      await test.step('Visit website.', async () => {
        await loginPO.goto();
      });

      await test.step(`Login with username: ${user['username']}.`, async () => {
        await loginPO.login(user);
      });

      await test.step(`Check inventory page is display`, async () => {
        await expect(inventoryPO.locator_lblPageTitle).toBeVisible();
      });

      let itemPriceList = [];
      await test.step(`Add item to cart`, async () => {
        for (let productName of addProducts) {
          let productPrice = await inventoryPO.getProductPriceByProductName(productName);
          await inventoryPO.clickAddToCartByProductName(productName);
          itemPriceList.push(productPrice);
        }
      });

      await test.step(`Check number item on cart should be '${addProducts.length}'`, async () => {
        let totalItemCount = await commonPO.getTotalItemOnCart();
        await expect(totalItemCount).toBe(addProducts.length);
      });

      await test.step(`Go to cart`, async () => {
        await commonPO.gotoCart();
      });

      await test.step(`Check cart page is display`, async () => {
        await expect(cartPO.locator_lblPageTitle).toBeVisible();
      });

      await test.step(`Check all item on cart`, async () => {
        let allProductList = await cartPO.getAllProductOnCart();
        for (let item of addProducts) {
          await expect(allProductList).toContain(item);
        }
      });

      await test.step(`Go to checkout`, async () => {
        await cartPO.clickCheckout();
      });

      await test.step(`Check Checkout page is display`, async () => {
        await expect(checkoutPO.locator_lblPageTitle).toBeVisible();
      });

      await test.step(`Fill checkout form and submit`, async () => {
        await checkoutPO.fillForm(checkoutInfo, true);
      });

      await test.step(`Check Checkout overview page is display`, async () => {
        await expect(overviewPO.locator_lblPageTitle).toBeVisible();
      });

      await test.step(`Check all item on checkout page`, async () => {
        let allProductList = await overviewPO.getAllProductOnCart();
        for (let item of addProducts) {
          await expect(allProductList).toContain(item);
        }
      });

      let totalPriceOnCart = CommonUtility.calculateTotal(itemPriceList);
      await test.step(`Check total price should be '${totalPriceOnCart}'`, async () => {
        let totalPriceOnPage = await overviewPO.getTotalPriceItem();
        await expect(totalPriceOnPage).toBe(totalPriceOnCart);
      });

      await test.step(`Click finish button`, async () => {
        await overviewPO.clickFinishButton();
      });

      await test.step(`Check Complete page is display`, async () => {
        await expect(completePO.locator_lblPageTitle).toBeVisible();
      });

      await test.step(`Click Back Home`, async () => {
        await completePO.clickBackHome();
      });

      await test.step(`Check inventory page is display`, async () => {
        await expect(inventoryPO.locator_lblPageTitle).toBeVisible();
      });
    });
  }
});