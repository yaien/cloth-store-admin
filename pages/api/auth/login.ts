import handler from "../../../core/middlewares/handler";
import store from "../../../core/store";
import Cookies from "cookies"
import env from "../../../core/env";



export default handler(async (req, res) => {
  let session = await store.login(req.body)
  let user = await session.user.get()
  let cookies = new Cookies(req, res)
  cookies.set(env.auth.cookie.name, session.auth.access_token)
  res.send(user)
})