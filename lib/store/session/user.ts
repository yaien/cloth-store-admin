import { AxiosInstance } from "axios";
import { User } from "../interfaces"

export default (http: AxiosInstance) => ({
  async get() {
    let res = await http.get<User>("/api/v1/user")
    return res.data
  }
})