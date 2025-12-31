import { expect, page } from '@playwright/test';
import { CommonUtility } from '../../utility/commonUtility'

var { settings } = CommonUtility.loadYamlData('settings/web.yaml');
var { locator_saucedemo: locator } = CommonUtility.loadYamlData('locator/saucedemo/locator.yaml');

export class SDLoginPO {
  constructor(page) {
    this.page = page;
    this.locator_txtUsername = page.locator(locator['loginPage']['txtUsername']);
    this.locator_txtPassword = page.locator(locator['loginPage']['txtPassword']);
    this.locator_btnLogin = page.locator(locator['loginPage']['btnLogin']);
    this.locator_pnlAllUserList = page.locator(locator['loginPage']['pnlAllUsername'])
    this.locator_pnlPasswordList = page.locator(locator['loginPage']['pnlPassword'])
    this.locator_pnlErrorMsg = page.locator(locator['loginPage']['pnlErrorMsg'])
  }

  async goto() {
    await this.page.goto(settings['url']['saucedemo_login']);
  }

  async login(user) {
    await this.locator_txtUsername.fill(user.username);
    await this.locator_txtPassword.fill(user.password);
    await this.locator_btnLogin.click();
  }

  async getAllUsers() {
    const allTexts = await this.locator_pnlAllUserList.allInnerTexts();
    let textList = [];
    if (allTexts && allTexts.length > 0) {
      textList = allTexts[0].split('\n').filter(Boolean);
      // remove 1st element 'h4 Accepted usernames are'
      textList.splice(0, 1);
    }
    return textList;
  }

  async getPassword() {
    const allTexts = await this.locator_pnlPasswordList.allInnerTexts();
    let textList = [];
    if (allTexts && allTexts.length > 0) {
      textList = allTexts[0].split('\n').filter(Boolean);
      // remove 1st element 'h4 Password for all users'
      textList.splice(0, 1);
    }
    return textList;
  }

  async getErrorMessage() {
    return await this.locator_pnlErrorMsg.innerText();
  }
}