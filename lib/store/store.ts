import axios from "axios";
import auth from "./public/auth";
import items from "./public/items";
import { Config, Root, Auth } from "./interfaces";
import session from "./session";

export default function store(config: Config) {
  const root: Root = {
    http: axios.create({ baseURL: config.baseUrl }),
    config,
  };

  return {
    items: items(root.http),
    session: (auth: Auth) => session({ auth, config }),
    ...auth(root),
  };
}
