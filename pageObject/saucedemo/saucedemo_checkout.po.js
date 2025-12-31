import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDCheckoutPO {
  constructor(page) {
    this.page = page;
    this.locator_lblPageTitle = page.locator(locator['checkoutPage']['lblPageTitle']);
    this.locator_txtFirstname = page.locator(locator['checkoutPage']['txtFirstname']);
    this.locator_txtLastname = page.locator(locator['checkoutPage']['txtLastname']);
    this.locator_txtZipcode = page.locator(locator['checkoutPage']['txtZipcode']);
    this.locator_btnContinue = page.locator(locator['checkoutPage']['btnContinue']);
    this.locator_btnCancel = page.locator(locator['checkoutPage']['btnCancel']);
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_checkout']);
  }

  async clickContinueButton() {
    await this.locator_btnContinue.click();
  }

  async fillForm(inputData, submit = false) {
    let zipcode = inputData.zipcode;
    await this.locator_txtFirstname.fill(inputData.firstname);
    await this.locator_txtLastname.fill(inputData.lastname);
    if (typeof (inputData.zipcode) !== 'string')
      zipcode = inputData.zipcode.toString();
    await this.locator_txtZipcode.fill(zipcode);
    if (submit)
      await this.clickContinueButton();
  }
}