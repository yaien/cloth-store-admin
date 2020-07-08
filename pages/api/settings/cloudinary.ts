import auth from "../../../core/middlewares/auth";
import store from "../../../core/store";

export default auth(async (req, res) => {
  const settings = await store.settings.cloudinary();
  res.send(settings);
});
