import React from 'react';
import CryptoJS from 'crypto-js';

// Encrypt
export const encryptFunction = (plaintext) => {
  var encrypted = CryptoJS.AES.encrypt(plaintext, 'secret key 123').toString();
  return encrypted;
};

// Decrypt
export const decryptFunction = (ciphertext) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
