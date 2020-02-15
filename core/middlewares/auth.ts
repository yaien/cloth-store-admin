import handler from "./handler";
import store from "../store"
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../lib/store";
import env from "../env";



export interface NextAuthRequest extends NextApiRequest {
  session: Session
}

export type AuthHandler = (req: NextAuthRequest, res: NextApiResponse) => Promise<void>

export default (next: AuthHandler) => handler(async (req, res) => {
  let access_token = req.cookies[env.auth.cookie.name]
  let session = store.session({ access_token })
  let authReq = Object.assign(req, { session })
  await next(authReq, res)
})