import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDCheckoutOverviewPO {
  constructor(page) {
    this.page = page;
    this.locator_lblPageTitle = page.locator(locator['checkoutOverviewPage']['lblPageTitle']);
    this.locator_btnFinish = page.locator(locator['checkoutOverviewPage']['btnFinish']);
    this.locator_btnCancel = page.locator(locator['checkoutOverviewPage']['btnCancel']);
    this.lblTotalPriceItem = page.locator(locator['checkoutOverviewPage']['lblTotalPriceItem']);
    this.locator_lblAllProductOnCart = page.locator(locator['cartPage']['lblAllProductOnCart'])
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_checkoutOverview']);
  }

  async clickFinishButton() {
    await this.locator_btnFinish.click();
  }

  async getAllProductOnCart() {
    let allProducts = await this.locator_lblAllProductOnCart.allTextContents();
    return allProducts.map(product => product.trim());
  }

  async getTotalPriceItem() {
    let priceText = await this.lblTotalPriceItem.innerText();
    let cleanPrice = CommonUtility.extractNumber(priceText);
    return Number(cleanPrice);
  }
}