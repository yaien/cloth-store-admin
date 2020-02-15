import handler from "../../../core/middlewares/handler";
import Cookies from "cookies";
import env from "../../../core/env";


export default handler((req, res) => {
  let cookies = new Cookies(req, res)
  cookies.set(env.auth.cookie.name)
  res.end()
})