import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDCartPO {
  constructor(page) {
    this.page = page;
    this.locator_lblPageTitle = page.locator(locator['cartPage']['lblPageTitle']);
    this.locator_lblAllProductOnCart = page.locator(locator['cartPage']['lblAllProductOnCart'])
    this.locator_btnCheckout = page.locator(locator['cartPage']['btnCheckout'])
    this.locator_btnContinueShopping = page.locator(locator['cartPage']['btnContinueShopping'])
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_cart']);
  }

  async clickCheckout() {
    await this.locator_btnCheckout.click();
  }

  async clickContinueShopping() {
    await this.locator_btnContinueShopping.click();
  }

  async getAllProductOnCart() {
    let allProducts = await this.locator_lblAllProductOnCart.allTextContents();
    return allProducts.map(product => product.trim());
  }
}