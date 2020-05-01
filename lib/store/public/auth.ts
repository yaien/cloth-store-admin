import session from "../session/session"
import { Credentials, Auth, Root } from "../interfaces"

export default ({ config, http }: Root) => ({
  async login(credentials: Credentials) {
    let res = await http.post<Auth>("/api/v1/auth/token", {
      grant_type: "password",
      username: credentials.email,
      password: credentials.password,
      client_id: config.key,
    })
    return session({ auth: res.data, config })
  },
})
