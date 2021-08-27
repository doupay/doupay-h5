const CryptoJS = require('crypto-js');  //引用AES源码js    
const key = CryptoJS.enc.Hex.parse("3537623262653536316335373338653963363132316532356463643430633539");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Hex.parse('30313245333435363738394142434445');   //十六位十六进制数作为密钥偏移量

//加密方法
export function Encrypt(word){
  let srcs = word;
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString();
}
//解密方法
export function Decrypt(word){
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}