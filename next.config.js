const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  env: {
    CLOTH_STORE_BASE_URL: process.env.CLOTH_STORE_BASE_URL,
    CLOTH_STORE_KEY: process.env.CLOTH_STORE_KEY,
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME
  }
}