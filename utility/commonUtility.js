import { expect, page } from '@playwright/test';
import * as fs from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

export class CommonUtility {
  static loadYamlData(filePath) {
    const fullPath = path.resolve(filePath);
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return yaml.parse(fileContents);
    } catch (error) {
      console.error(`Failed to read or parse YAML file at ${fullPath}:`, error);
      throw error;
    }
  }

  static extractNumber(inputText) {
    return inputText.trim().replace(/[^0-9.]/g, '');
  }

  static calculateTotal(numericList) {
    if (!Array.isArray(numericList)) return 0;

    return numericList.reduce((accumulator, currentValue) => {
      const value = Number(currentValue) || 0;
      return accumulator + value;
    }, 0);
  }

  static getAllElementsByXPath(path) {
    const nodes = [];
    const result = document.evaluate(
      path,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0; i < result.snapshotLength; i++) {
      nodes.push(result.snapshotItem(i));
    }

    return nodes;
  }

}