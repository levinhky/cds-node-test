const crypto = require("crypto");

class MiniAppEncryption {
  static MINI_APP_CHARACTER_RANDOM_KEY =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  static MINI_APP_KEY_LENGTH = 16;
  static MINI_APP_KEY_LIMIT_LENGTH = 32; // 256 bits = 32 bytes
  static MINI_APP_KEY_ITERATIONS = 65536;

  constructor() {
    throw new Error("MiniAppEncryption Utility class. Do not instantiate!");
  }

  static generateKeyMiniApp() {
    let result = "";
    for (let i = 0; i < this.MINI_APP_KEY_LENGTH; i++) {
      const index = Math.floor(
        Math.random() * this.MINI_APP_CHARACTER_RANDOM_KEY.length
      );
      result += this.MINI_APP_CHARACTER_RANDOM_KEY.charAt(index);
    }
    return result;
  }

  static encryptMiniApp(miniAppKey, miniAppCode, data) {
    try {
      const iv = this.generateRandomIvWithSeed(miniAppCode);
      const key = this.getSecretKeyMiniApp(miniAppKey, miniAppCode);

      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
      let encrypted = cipher.update(data, "utf8", "base64");
      encrypted += cipher.final("base64");

      return encrypted;
    } catch (err) {
      console.warn(`EncryptMiniApp error: [${err.message}]`);
      return "";
    }
  }

  static decryptMiniApp(miniAppKey, miniAppCode, encryptedData) {
    try {
      const iv = this.generateRandomIvWithSeed(miniAppCode);
      const key = this.getSecretKeyMiniApp(miniAppKey, miniAppCode);

      const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
      let decrypted = decipher.update(encryptedData, "base64", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    } catch (err) {
      console.warn(`DecryptMiniApp error: [${err.message}]`);
      return "";
    }
  }

  static getSecretKeyMiniApp(miniAppKey, miniAppCode) {
    return crypto.pbkdf2Sync(
      miniAppKey,
      Buffer.from(miniAppCode, "utf8"),
      this.MINI_APP_KEY_ITERATIONS,
      this.MINI_APP_KEY_LIMIT_LENGTH,
      "sha256"
    );
  }

  static generateRandomIvWithSeed(miniAppCode) {
    const hash = crypto.createHash("sha1").update(miniAppCode).digest(); // SHA1PRNG-like
    return Buffer.from(hash.subarray(0, 16)); // 16 bytes for AES-256 CBC
  }
}

module.exports = MiniAppEncryption;
