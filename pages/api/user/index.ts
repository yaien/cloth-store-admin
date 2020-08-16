import auth from "../../../core/middlewares/auth";


export default auth(async (req, res) => {
  let user = await req.session.user.get()
  res.send(user)
})