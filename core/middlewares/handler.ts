import { NextApiRequest, NextApiResponse } from "next";



export type NextHandler = (req: NextApiRequest, res: NextApiResponse) => any

export default (next: NextHandler): NextHandler => {
  return async (req, res) => {
    try {
      await next(req, res)
    } catch (error) {
      if(error.response) {
        return res.status(error.response.status).send(error.response.body)
      }
      console.error(error)
      return res.status(500).send({ error: error.message })
    }
  }
  
}