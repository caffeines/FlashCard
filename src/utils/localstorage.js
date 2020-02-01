/* eslint-disable */
import Crypto from 'simple-crypto-js';

const secretKey = '@asjdaVerySevretKeyLOLabnsj%6778329sljadadja';
const crypto = new Crypto(secretKey);

export default class LocalStorage {
  addItem(key, item) {
    let stringifyItem = item;
    if (typeof item !== 'string') {
      stringifyItem = JSON.stringify(item);
    }
    try {
      const chiperText = crypto.encrypt(stringifyItem);
      localStorage.setItem(`${key}`, chiperText);
      return chiperText;
    } catch (ex) {
      return null;
    }
  }
  getItem(key) {
    if (localStorage) {
      const item = localStorage.getItem(`${key}`);
      try {
        return crypto.decrypt(item);
      } catch (ex) {
        return null;
      }
    }
  }
  removeAll() {
    localStorage.clear();
  }
  removeItem(item) {
    localStorage(item);
  }
}
