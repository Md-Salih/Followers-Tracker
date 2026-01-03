import CryptoJS from 'crypto-js';
import { config } from '../config';

export function encrypt(text: string): string {
  try {
    const ciphertext = CryptoJS.AES.encrypt(text, config.encryption.key).toString();
    return ciphertext;
  } catch (error) {
    throw new Error('Encryption failed');
  }
}

export function decrypt(ciphertext: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, config.encryption.key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    throw new Error('Decryption failed');
  }
}
