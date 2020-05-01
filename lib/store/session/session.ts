import axios from "axios"
import items from "./items"
import user from "./user"
import settings from "./settings"
import { Auth, Config } from "../interfaces"

export default ({ auth, config }: SessionOptions) => {
  const http = axios.create({
    baseURL: config.baseUrl,
    headers: {
      Authorization: "Bearer " + auth.access_token,
    },
  })

  return {
    auth,
    config,
    items: items(http),
    user: user(http),
    settings: settings(http),
  }
}

export interface SessionOptions {
  auth: Auth
  config: Config
}
