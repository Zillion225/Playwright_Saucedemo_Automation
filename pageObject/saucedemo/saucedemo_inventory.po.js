import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDInventoryPO {
  constructor(page) {
    this.page = page;
    this.locator_lblPageTitle = page.locator(locator['inventoryPage']['lblPageTitle']);
    this.baseLocator_btnAddToCartByProductName = locator['inventoryPage']['btnAddToCartByProductName'];
    this.baseLocator_btnRemoveToCartByProductName = locator['inventoryPage']['btnRemoveToCartByProductName'];
    this.baseLocator_btnToCartByProductName = locator['inventoryPage']['btnToCartByProductName'];
    this.baseLocator_lblProductPriceByProductName = locator['inventoryPage']['lblProductPriceByProductName'];
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_inventory']);
  }

  async clickAddToCartByProductName(productName) {
    let locator = this.baseLocator_btnAddToCartByProductName.replaceAll('{{product_name}}', productName);
    await this.page.locator(locator).click();
  }

  async clickRemoveToCartByProductName(productName) {
    let locator = this.baseLocator_btnRemoveToCartByProductName.replaceAll('{{product_name}}', productName);
    await this.page.locator(locator).click();
  }

  async clickButtonToCartByProductName(productName) {
    let locator = this.baseLocator_btnToCartByProductName.replaceAll('{{product_name}}', productName);
    await this.page.locator(locator).click();
  }

  async getProductPriceByProductName(productName) {
    let locator = this.baseLocator_lblProductPriceByProductName.replaceAll('{{product_name}}', productName);
    let priceText = await this.page.locator(locator).innerText();
    const cleanPrice = CommonUtility.extractNumber(priceText);
    return parseFloat(cleanPrice);
  }
}