import { AxiosInstance } from "axios";
import { Item } from "../interfaces";

export default (http: AxiosInstance) => ({
  async list() {
    let res = await http.get<Item[]>("/api/v1/items");
    return res.data;
  },
  async create(item: Partial<Item>) {
    let res = await http.post<Item>("/api/v1/items", item);
    return res.data;
  },
  async get(id: string) {
    let res = await http.get<Item>("/api/v1/items/" + id);
    return res.data;
  },
  async update(id: string, item: Partial<Item>) {
    let res = await http.put<Item>("/api/v1/items/" + id, item);
    return res.data;
  },
});
