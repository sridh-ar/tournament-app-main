const cryptoJs = require("crypto-js");
// const { query } = require("../database/service");

const key = "i am makin the tournament application";
const user = "sai@gmail.com";
const password = "Sai@123";

async function validateUser(userName, pass) {
  if (userName === user && pass === password) {
    const encrypted = cryptoJs.AES.encrypt(
      `${userName}-${pass}`,
      key
    ).toString();
    // const decrypted = cryptoJs.AES.decrypt(encrypted, key).toString(
    //   cryptoJs.enc.Utf8
    // );
    return encrypted;
  }
  return null;
}

async function validateToken() {
  const authKey = localStorage.getItem("aauutthh");
  if (!authKey) return null;
  const decrypted = cryptoJs.AES.decrypt(authKey, key)
    .toString(cryptoJs.enc.Utf8)
    .split("-");
  if (decrypted[0] === user && decrypted[1] === password) {
    return authKey;
  }
  return null;
}

module.exports = { validateUser, validateToken };
