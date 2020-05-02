import { AxiosInstance } from "axios";
import { CloudinarySettings } from "../interfaces";

export default (http: AxiosInstance) => ({
  async cloudinary() {
    const res = await http.get<CloudinarySettings>("/api/v1/config/cloudinary");
    return res.data;
  },
});
