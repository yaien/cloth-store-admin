import { AxiosInstance } from "axios"
import { Item } from "../interfaces"

export default (http: AxiosInstance) => ({
  async list() {
    let res = await http.get<Item[]>("/api/v1/public/items")
    return res.data
  },
  async get(slug: string) {
    let res = await http.get<Item>("/api/v1/public/items/" + slug)
    return res.data
  }
})