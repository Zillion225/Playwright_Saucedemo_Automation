import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDCommonPO {
  constructor(page) {
    this.page = page;
    this.locator_btnIconCart = page.locator(locator['common']['btnIconCart']);
    this.locator_lblCartBadge = page.locator(locator['common']['lblCartBadge']);
  }

  async gotoCart() {
    await this.locator_btnIconCart.click();
  }

  async getTotalItemOnCart() {
    let res = 0;
    let textNumber = await this.locator_lblCartBadge.innerText();
    try {
      res = parseInt(textNumber);
    } catch (err) {
      console.log(err)
    }
    return res;
  }
}