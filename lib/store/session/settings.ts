import { AxiosInstance } from "axios"
import { Cloudinary } from "../interfaces"

export default (http: AxiosInstance) => ({
  async cloudinary() {
    const res = await http.get<Cloudinary>("/api/v1/config/cloudinary")
    return res.data
  },
})
