import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDCompletePagePO {
  constructor(page) {
    this.page = page;
    this.locator_lblPageTitle = page.locator(locator['completePage']['lblPageTitle']);
    this.locator_btnBackHome = page.locator(locator['completePage']['btnBackHome']);
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_complete']);
  }

  async clickBackHome() {
    await this.locator_btnBackHome.click();
  }
}