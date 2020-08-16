export default {
  store: {
    baseUrl: process.env.CLOTH_STORE_BASE_URL,
    key: process.env.CLOTH_STORE_KEY
  },
  auth: {
    cookie: {
      name: process.env.AUTH_COOKIE_NAME || "jwt"
    }
  },
}